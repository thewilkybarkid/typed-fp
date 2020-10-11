import { WhenIdleEnv } from '@typed/fp/dom/exports'
import { raf, RafEnv } from '@typed/fp/dom/raf'
import { Effect, EnvOf } from '@typed/fp/Effect/Effect'
import { doEffect } from '@typed/fp/Effect/exports'
import { FiberEnv, forkPaused, proceedAll } from '@typed/fp/fibers/exports'

import { getHookEnv, HookEnv, runWithHooks } from '../core/exports'
import { Patch, patch } from './Patch'
import { respondToRemoveEvents } from './respondToRemoveEvents'
import { respondToRunningEvents } from './respondToRunningEvents'
import { respondToUpdateEvents } from './respondToUpdateEvents'
import { updatedEnvs } from './sharedRefs/UpdatedEnvs'
import { effectsWorker } from './workers/effectsWorker'
import { renderWorker } from './workers/renderWorker'
import { whenIdleWorker } from './workers/whenIdleWorker'

export function patchOnRaf<E extends HookEnv, A, B>(
  main: Effect<E, A>,
  initial: B,
): Effect<E & PatchOnRafEnv<A, B>, never> {
  const eff = doEffect(function* () {
    const env = yield* getHookEnv
    const renderFiber = yield* forkPaused(whenIdleWorker(renderWorker))
    const effectsFiber = yield* forkPaused(whenIdleWorker(effectsWorker))

    yield* respondToRemoveEvents
    yield* respondToRunningEvents
    yield* respondToUpdateEvents

    let previous = yield* patch(initial, yield* runWithHooks(env, main))

    while (true) {
      yield* raf

      const updated = yield* updatedEnvs.has(env.id)

      if (updated) {
        previous = yield* patch(previous, yield* runWithHooks(env, main))
      }

      // Run any queued effects and do any patching that can happen while idle
      yield* proceedAll(effectsFiber, renderFiber)
    }
  })

  return eff
}

export type PatchOnRafEnv<A, B> = FiberEnv &
  RafEnv &
  WhenIdleEnv &
  Patch<B, A> &
  EnvOf<typeof respondToRemoveEvents> &
  EnvOf<typeof respondToRunningEvents> &
  EnvOf<typeof respondToUpdateEvents> &
  EnvOf<ReturnType<typeof runWithHooks>> &
  EnvOf<typeof effectsWorker> &
  EnvOf<typeof renderWorker>
