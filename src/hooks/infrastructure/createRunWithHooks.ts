import { doEffect, Effect, use } from '@typed/fp/Effect/exports'
import { Uuid } from '@typed/fp/Uuid/exports'
import { pipe } from 'fp-ts/function'

import { HookRequirements, hookRequirementsIso } from '../domain/exports'
import { INITIAL_ENV_INDEX } from './constants'
import { HookEvent, HookEventType } from './events'
import { HookEnv, HookEnvironment } from './HookEnvironment'

export function createRunWithHooks(
  hookPositions: Map<Uuid, number>,
  sendEvent: (event: HookEvent) => void,
) {
  return <E, A>(eff: Effect<E & HookEnv, A>, hookRequirements: HookRequirements): Effect<E, A> =>
    doEffect(function* () {
      // TODO: possibly validate this is really the case?
      const hookEnvironment = hookRequirementsIso.unwrap(hookRequirements) as HookEnvironment

      sendEvent({
        type: HookEventType.RunningEnvironment,
        hookEnvironment,
      })

      hookPositions.set(hookEnvironment.id, INITIAL_ENV_INDEX)

      const value = yield* pipe(eff, use({ hookEnvironment })) as Effect<E, A>

      return value
    })
}
