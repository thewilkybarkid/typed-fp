import { chain, fromIO } from '@fp/Env'
import { Arity1 } from '@fp/function'
import { createRef, getRef, setRef } from '@fp/Ref'
import { EqStrict } from 'fp-ts/Eq'
import { flow, pipe } from 'fp-ts/function'
import { getEq } from 'fp-ts/ReadonlyMap'

import { Fiber, withFiberRefs } from '../Fiber'
import { FiberId } from '../FiberId'

export const FiberChildren = createRef(
  fromIO((): ReadonlyMap<FiberId, Fiber<any>> => new Map()),
  undefined,
  getEq(EqStrict, EqStrict),
)

export const getFiberChildren = pipe(FiberChildren, getRef, withFiberRefs)

export const setFiberChildren = (fibers: ReadonlyMap<FiberId, Fiber<any>>) =>
  pipe(FiberChildren, setRef(fibers), withFiberRefs)

export const modifyFiberChildren = (
  f: Arity1<ReadonlyMap<FiberId, Fiber<any>>, ReadonlyMap<FiberId, Fiber<any>>>,
) => pipe(getFiberChildren, chain(flow(f, setFiberChildren)))

export const addChild = (fiber: Fiber<any>) =>
  modifyFiberChildren((map) => new Map([...map, [fiber.id, fiber]]))

export const removeChild = (fiber: Fiber<any>) =>
  modifyFiberChildren((map) => new Map([...map].filter((x) => x[0] !== fiber.id)))
