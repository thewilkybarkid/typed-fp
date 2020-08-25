import { deepEqualsEq } from '@typed/fp/common'
import { doEffect, Effect, Pure } from '@typed/fp/Effect'
import { Fn } from '@typed/fp/lambda'
import { OpEnv } from '@typed/fp/Op'
import { Eq } from 'fp-ts/es6/Eq'
import { getEq } from 'fp-ts/es6/ReadonlyArray'

import { useRef, UseRefOp } from './useRef'

const pureTrue = Pure.of(true)

export const useMemo = <A extends readonly any[], B>(
  f: Fn<A, B>,
  deps: A,
  eq: Eq<A> = getEq(deepEqualsEq),
): Effect<OpEnv<UseRefOp>, B> =>
  doEffect(function* () {
    const firstRunRef = yield* useRef(pureTrue)
    const depsRef = yield* useRef(Pure.of(deps))
    const valueRef = yield* useRef(Pure.fromIO(() => f(...deps)))

    if (firstRunRef.current) {
      firstRunRef.current = false

      return valueRef.current
    }

    const changed = !eq.equals(depsRef.current, deps)

    if (changed) {
      depsRef.current = deps
      valueRef.current = f(...deps)
    }

    return valueRef.current
  })
