import { Effect } from '@typed/fp/Effect/exports'
import { callOp, createOp, Op } from '@typed/fp/Op/exports'

import { Ref } from '../../model/exports'

export const USE_REF = Symbol('@typed/fp/hooks/UseRef')
export type USE_REF = typeof USE_REF

export interface UseRefOp extends Op<USE_REF, <E, A>(initial: Effect<E, A>) => Effect<E, Ref<A>>> {}

export const UseRefOp = createOp<UseRefOp>(USE_REF)

export const useRef = callOp(UseRefOp)

declare module '@typed/fp/Op/exports' {
  export interface Ops<Env> {
    [USE_REF]: {
      <A>(): Effect<Env, Ref<A | undefined>>
      <E, A>(initial: Effect<E, A>): Effect<Env & E, Ref<A>>
    }
  }
}
