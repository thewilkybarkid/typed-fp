import { Effect, effectSeq } from '@typed/fp/Effect/exports'
import { Contravariant2 } from 'fp-ts/Contravariant'
import { flow, Predicate } from 'fp-ts/function'
import { Monoid } from 'fp-ts/Monoid'
import { pipeable } from 'fp-ts/pipeable'
import { getLoggerM } from 'logging-ts'
import { LoggerIO } from 'logging-ts/es6/IO'

const loggerM = getLoggerM(effectSeq)

export const URI = '@typed/fp/logging/LoggerEffect'
export type URI = typeof URI

export interface LoggerEffect<E, A> {
  (a: A): Effect<E, void>
}

declare module 'fp-ts/HKT' {
  interface URItoKind2<E, A> {
    [URI]: LoggerEffect<E, A>
  }
}

export const filter: <E, A>(
  logger: LoggerEffect<E, A>,
  predicate: Predicate<A>,
) => LoggerEffect<E, A> = loggerM.filter

export const getMonoid: <E, A>() => Monoid<LoggerEffect<E, A>> = loggerM.getMonoid

export const loggerEffect: Contravariant2<URI> = {
  URI,
  contramap: loggerM.contramap,
}

export const { contramap } = pipeable(loggerEffect)

export function fromLoggerIO<A>(loggerIO: LoggerIO<A>): LoggerEffect<{}, A> {
  return flow(loggerIO, Effect.fromIO)
}
