import { ask, doEffect } from '@typed/fp/Effect/exports'
import { createUuid } from '@typed/fp/Uuid/exports'
import { some } from 'fp-ts/Option'

import { hookRequirementsIso } from '../domain/exports'
import { HookEvent, HookEventType } from './events'
import { createHookEnvironment, HookEnv } from './HookEnvironment'

export function createGetKeyedEnv(sendEvent: (event: HookEvent) => void) {
  return (key: unknown) =>
    doEffect(function* () {
      const { hookEnvironment } = yield* ask<HookEnv>()

      if (!hookEnvironment.children.has(key)) {
        const id = yield* createUuid
        const keyed = createHookEnvironment(id, some(hookEnvironment))

        sendEvent({ type: HookEventType.CreatedEnvironment, hookEnvironment: keyed })

        hookEnvironment.children.set(key, keyed)
      }

      return hookRequirementsIso.wrap(hookEnvironment.children.get(key)!)
    })
}
