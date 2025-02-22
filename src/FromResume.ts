/**
 * FromEnv is a Typeclass which represents the Natural Transformation from a Resume into another
 * effect.
 *
 * @since 0.9.2
 */
import { Chain, Chain1, Chain2, Chain3, Chain4, chainFirst } from 'fp-ts/Chain'
import { flow } from 'fp-ts/function'
import { HKT, URIS, URIS2, URIS3, URIS4 } from 'fp-ts/HKT'
import {
  NaturalTransformation11,
  NaturalTransformation12,
  NaturalTransformation12C,
  NaturalTransformation13,
  NaturalTransformation13C,
  NaturalTransformation14,
} from 'fp-ts/NaturalTransformation'

import { Hkt } from './HKT'
import * as R from './Resume'

/**
 * @since 0.9.2
 * @category Typeclass
 */
export type FromResume<F> = {
  readonly URI?: F
  readonly fromResume: <A>(resume: R.Resume<A>) => HKT<F, A>
}

/**
 * @since 0.9.2
 * @category Typeclass
 */
export type FromResume1<F extends URIS> = {
  readonly URI?: F
  readonly fromResume: NaturalTransformation11<R.URI, F>
}

/**
 * @since 0.9.2
 * @category Typeclass
 */
export type FromResume2<F extends URIS2> = {
  readonly URI?: F
  readonly fromResume: NaturalTransformation12<R.URI, F>
}

/**
 * @since 0.9.2
 * @category Typeclass
 */
export type FromResume2C<F extends URIS2, E> = {
  readonly URI?: F
  readonly fromResume: NaturalTransformation12C<R.URI, F, E>
}

/**
 * @since 0.9.2
 * @category Typeclass
 */
export type FromResume3<F extends URIS3> = {
  readonly URI?: F
  readonly fromResume: NaturalTransformation13<R.URI, F>
}

/**
 * @since 0.9.2
 * @category Typeclass
 */
export type FromResume3C<F extends URIS3, E> = {
  readonly URI?: F
  readonly fromResume: NaturalTransformation13C<R.URI, F, E>
}

/**
 * @since 0.9.2
 * @category Typeclass
 */
export type FromResume4<F extends URIS4> = {
  readonly URI?: F
  readonly fromResume: NaturalTransformation14<R.URI, F>
}

/**
 * @since 0.9.2
 * @category Constructor
 */
export function fromResumeK<F extends URIS>(
  F: FromResume1<F>,
): <A extends readonly any[], B>(f: (...args: A) => R.Resume<B>) => (...args: A) => Hkt<F, [B]>

export function fromResumeK<F extends URIS2>(
  F: FromResume2<F>,
): <A extends readonly any[], B>(
  f: (...args: A) => R.Resume<B>,
) => <E>(...args: A) => Hkt<F, [E, B]>

export function fromResumeK<F extends URIS3>(
  F: FromResume3<F>,
): <A extends readonly any[], B>(
  f: (...args: A) => R.Resume<B>,
) => <R, E>(...args: A) => Hkt<F, [R, E, B]>

export function fromResumeK<F extends URIS4>(
  F: FromResume4<F>,
): <A extends readonly any[], B>(
  f: (...args: A) => R.Resume<B>,
) => <S, R, E>(...args: A) => Hkt<F, [S, R, E, B]>

export function fromResumeK<F>(
  F: FromResume<F>,
): <A extends readonly any[], B>(f: (...args: A) => R.Resume<B>) => (...args: A) => Hkt<F, [B]>

export function fromResumeK<F>(F: FromResume<F>) {
  return <A extends readonly any[], B>(f: (...args: A) => R.Resume<B>) =>
    (...args: A): HKT<F, B> =>
      F.fromResume(f(...args))
}

/**
 * @since 0.9.2
 * @category Combinator
 */
export function chainResumeK<F extends URIS>(
  F: FromResume1<F>,
  C: Chain1<F>,
): <A, B>(f: (value: A) => R.Resume<B>) => (hkt: Hkt<F, [A]>) => Hkt<F, [B]>

export function chainResumeK<F extends URIS2>(
  F: FromResume2<F>,
  C: Chain2<F>,
): <A, B>(f: (value: A) => R.Resume<B>) => <E>(hkt: Hkt<F, [E, A]>) => Hkt<F, [E, B]>

export function chainResumeK<F extends URIS3>(
  F: FromResume3<F>,
  C: Chain3<F>,
): <A, B>(f: (value: A) => R.Resume<B>) => <R, E>(hkt: Hkt<F, [R, E, A]>) => Hkt<F, [R, E, B]>

export function chainResumeK<F extends URIS4>(
  F: FromResume4<F>,
  C: Chain4<F>,
): <A, B>(
  f: (value: A) => R.Resume<B>,
) => <S, R, E>(hkt: Hkt<F, [S, R, E, A]>) => Hkt<F, [S, R, E, B]>

export function chainResumeK<F>(
  F: FromResume<F>,
  C: Chain<F>,
): <A, B>(f: (value: A) => R.Resume<B>) => (hkt: Hkt<F, [A]>) => Hkt<F, [B]>

export function chainResumeK<F>(
  F: FromResume<F>,
  C: Chain<F>,
): <A, B>(f: (value: A) => R.Resume<B>) => (hkt: HKT<F, A>) => HKT<F, B> {
  return (f) => C.chain(flow(f, F.fromResume))
}

/**
 * @since 0.9.2
 * @category Combinator
 */
export function chainFirstResumeK<F extends URIS>(
  F: FromResume1<F>,
  C: Chain1<F>,
): <A, B>(f: (value: A) => R.Resume<B>) => (hkt: Hkt<F, [A]>) => Hkt<F, [A]>

export function chainFirstResumeK<F extends URIS2>(
  F: FromResume2<F>,
  C: Chain2<F>,
): <A, B>(f: (value: A) => R.Resume<B>) => <E>(hkt: Hkt<F, [E, A]>) => Hkt<F, [E, A]>

export function chainFirstResumeK<F extends URIS3>(
  F: FromResume3<F>,
  C: Chain3<F>,
): <A, B>(f: (value: A) => R.Resume<B>) => <R, E>(hkt: Hkt<F, [R, E, A]>) => Hkt<F, [R, E, A]>

export function chainFirstResumeK<F extends URIS4>(
  F: FromResume4<F>,
  C: Chain4<F>,
): <A, B>(
  f: (value: A) => R.Resume<B>,
) => <S, R, E>(hkt: Hkt<F, [S, R, E, A]>) => Hkt<F, [S, R, E, A]>

export function chainFirstResumeK<F>(
  F: FromResume<F>,
  C: Chain<F>,
): <A, B>(f: (value: A) => R.Resume<B>) => (hkt: Hkt<F, [A]>) => Hkt<F, [A]>

export function chainFirstResumeK<F>(
  F: FromResume<F>,
  C: Chain<F>,
): <A, B>(f: (value: A) => R.Resume<B>) => (hkt: HKT<F, A>) => HKT<F, A> {
  const chainF = chainFirst(C)

  return (f) => chainF(flow(f, F.fromResume))
}
