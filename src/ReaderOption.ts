/**
 * ReaderOption is an OptionT of fp-ts/Reader
 * @since 0.9.2
 */
import * as Alt_ from 'fp-ts/Alt'
import { Alternative2 } from 'fp-ts/Alternative'
import { Applicative2 } from 'fp-ts/Applicative'
import * as Ap from 'fp-ts/Apply'
import * as CH from 'fp-ts/Chain'
import { ChainRec2 } from 'fp-ts/ChainRec'
import * as Ei from 'fp-ts/Either'
import { FromIO2 } from 'fp-ts/FromIO'
import * as FR from 'fp-ts/FromReader'
import { FromReader2 } from 'fp-ts/FromReader'
import { flow, Lazy, pipe } from 'fp-ts/function'
import { Functor2 } from 'fp-ts/Functor'
import { Monad2 } from 'fp-ts/Monad'
import * as O from 'fp-ts/Option'
import * as OT from 'fp-ts/OptionT'
import { Pointed2 } from 'fp-ts/Pointed'

import { MonadRec2 } from './MonadRec'
import { Provide2, ProvideAll2, ProvideSome2, UseAll2, UseSome2 } from './Provide'
import * as R from './Reader'

/**
 * @since 0.9.2
 * @category Model
 */
export interface ReaderOption<E, A> extends R.Reader<E, O.Option<A>> {}

/**
 * @since 0.9.2
 * @category Combinator
 */
export const alt = OT.alt(R.Monad)
/**
 * @since 0.9.2
 * @category Combinator
 */
export const altW = OT.alt(R.Monad) as <E1, A>(
  second: Lazy<ReaderOption<E1, A>>,
) => <E2, B>(first: ReaderOption<E2, B>) => ReaderOption<E1 & E2, A | B>
/**
 * @since 0.9.2
 * @category Combinator
 */
export const ap = OT.ap(R.Apply)
/**
 * @since 0.9.2
 * @category Combinator
 */
export const chain = OT.chain(R.Monad)
/**
 * @since 0.9.2
 * @category Combinator
 */
export const chainNullableK = OT.chainNullableK(R.Monad)
/**
 * @since 0.9.2
 * @category Combinator
 */
export const chainOptionK = OT.chainOptionK(R.Monad)
/**
 * @since 0.9.2
 * @category Constructor
 */
export const fromEither = OT.fromEither(R.Monad)
/**
 * @since 0.9.2
 * @category Constructor
 */
export const fromReader = OT.fromF(R.Monad)
/**
 * @since 0.9.2
 * @category Constructor
 */
export const fromNullable = OT.fromNullable(R.Pointed)
/**
 * @since 0.9.2
 * @category Constructor
 */
export const fromNullableK = OT.fromNullableK(R.Pointed)
/**
 * @since 0.9.2
 * @category Constructor
 */
export const fromOptionK = OT.fromOptionK(R.Pointed)
/**
 * @since 0.9.2
 * @category Constructor
 */
export const fromPredicate = OT.fromPredicate(R.Pointed)
/**
 * @since 0.9.2
 * @category Deconstructor
 */
export const getOrElse = OT.getOrElse(R.Functor)

/**
 * @since 0.13.0
 * @category Deconstructor
 */
export const getOrElseW = getOrElse as <A>(
  onNone: Lazy<A>,
) => <E, B>(fa: R.Reader<E, O.Option<B>>) => R.Reader<E, A | B>

/**
 * @since 0.9.2
 * @category Deconsructor
 */
export const getOrElseE = OT.getOrElseE(R.Monad)
/**
 * @since 0.9.2
 * @category Deconstructor
 */
export const getOrElseEW = OT.getOrElseE(R.Monad) as <E1, A>(
  onNone: Lazy<R.Reader<E1, A>>,
) => <E2, B>(fa: ReaderOption<E2, B>) => R.Reader<E1 & E2, A | B>
/**
 * @since 0.9.2
 * @category Combinator
 */
export const map = OT.map(R.Functor)
/**
 * @since 0.9.2
 * @category Deconstructor
 */
export const match = OT.match(R.Functor)
/**
 * @since 0.9.2
 * @category Deconstructor
 */
export const matchE = OT.matchE(R.Chain)

/**
 * @since 0.13.0
 * @category Deconstructor
 */
export const matchEW = matchE as <E1, B, A, E2, C>(
  onNone: () => R.Reader<E1, B>,
  onSome: (a: A) => R.Reader<E2, C>,
) => <E3>(ma: R.Reader<E3, O.Option<A>>) => R.Reader<E1 & E2 & E3, B | C>

/**
 * @since 0.9.2
 * @category Constructor
 */
export const some = OT.some(R.Pointed)
/**
 * @since 0.9.2
 * @category Constructor
 */
export const zero = OT.zero(R.Pointed)

/**
 * @since 0.9.2
 * @category URI
 */
export const URI = '@typed/fp/ReaderOption'
/**
 * @since 0.9.2
 * @category URI
 */
export type URI = typeof URI

declare module 'fp-ts/HKT' {
  export interface URItoKind2<E, A> {
    [URI]: ReaderOption<E, A>
  }
}

declare module './HKT' {
  export interface URItoVariance {
    [URI]: V<E, Contravariant>
  }
}

/**
 * @since 0.9.2
 * @category Instance
 */
export const Pointed: Pointed2<URI> = {
  of: flow(O.some, R.of),
}

/**
 * @since 0.9.2
 * @category Instance
 */
export const Functor: Functor2<URI> = {
  map,
}

/**
 * @since 0.9.2
 * @category Instance
 */
export const Apply: Ap.Apply2<URI> = {
  ...Functor,
  ap,
}

/**
 * @since 0.12.2
 * @category Constructor
 */
export const apFirst = Ap.apFirst(Apply)

/**
 * @since 0.12.2
 * @category Constructor
 */
export const apFirstW = apFirst as <E1, B>(
  second: ReaderOption<E1, B>,
) => <E2, A>(first: ReaderOption<E2, A>) => ReaderOption<E1 & E2, A>

/**
 * @since 0.12.2
 * @category Constructor
 */
export const apS = Ap.apS(Apply)

/**
 * @since 0.12.2
 * @category Constructor
 */
export const apSW = apS as <N extends string, A, E1, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderOption<E1, B>,
) => <E2>(
  fa: ReaderOption<E2, A>,
) => ReaderOption<E1 & E2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>

/**
 * @since 0.12.2
 * @category Constructor
 */
export const apSecond = Ap.apSecond(Apply)

/**
 * @since 0.12.2
 * @category Constructor
 */
export const apSecondW = apSecond as <E1, B>(
  second: ReaderOption<E1, B>,
) => <E2, A>(first: ReaderOption<E2, A>) => ReaderOption<E1 & E2, B>

/**
 * @since 0.12.2
 * @category Constructor
 */
export const apT = Ap.apT(Apply)

/**
 * @since 0.12.2
 * @category Constructor
 */
export const apTW = apT as <E1, B>(
  fb: ReaderOption<E1, B>,
) => <E2, A extends readonly unknown[]>(
  fas: ReaderOption<E2, A>,
) => ReaderOption<E1 & E2, readonly [...A, B]>

/**
 * @since 0.12.2
 * @category Typeclass Instance
 */
export const getApplySemigroup = Ap.getApplySemigroup(Apply)

/**
 * @since 0.9.2
 * @category Instance
 */
export const Applicative: Applicative2<URI> = {
  ...Apply,
  ...Pointed,
}

/**
 * @since 0.9.2
 * @category Instance
 */
export const Chain: CH.Chain2<URI> = {
  ...Functor,
  chain,
}

/**
 * @since 0.12.2
 * @category Constructor
 */
export const bind = CH.bind(Chain)

/**
 * @since 0.12.2
 * @category Constructor
 */
export const chainFirst = CH.chainFirst(Chain)

/**
 * @since 0.9.2
 * @category Combinator
 */
export const chainRec =
  <A, E, B>(f: (value: A) => ReaderOption<E, Ei.Either<A, B>>) =>
  (value: A): ReaderOption<E, B> =>
    pipe(
      value,
      R.chainRec((a) =>
        pipe(
          a,
          f,
          R.map((oe) => {
            if (O.isNone(oe)) {
              return Ei.right(oe)
            }

            return pipe(oe.value, Ei.map(O.some))
          }),
        ),
      ),
    )

/**
 * @since 0.9.2
 * @category Instance
 */
export const ChainRec: ChainRec2<URI> = {
  chainRec,
}

/**
 * @since 0.9.2
 * @category Instance
 */
export const Monad: Monad2<URI> = {
  ...Chain,
  ...Pointed,
}

/**
 * @since 0.9.2
 * @category Instance
 */
export const MonadRec: MonadRec2<URI> = {
  ...Monad,
  chainRec,
}

/**
 * @since 0.9.2
 * @category Instance
 */
export const Alt: Alt_.Alt2<URI> = {
  ...Functor,
  alt,
}

/**
 * @since 0.12.2
 * @category Constructor
 */
export const altAll = Alt_.altAll(Alt)

/**
 * @since 0.9.2
 * @category Instance
 */
export const Alternative: Alternative2<URI> = {
  ...Alt,
  zero,
}

/**
 * @since 0.9.2
 * @category Instance
 */
export const FromIO: FromIO2<URI> = {
  fromIO: fromReader,
}

/**
 * @since 0.9.2
 * @category Constructor
 */
export const fromIO = FromIO.fromIO

/**
 * @since 0.9.2
 * @category Instance
 */
export const FromReader: FromReader2<URI> = {
  fromReader,
}

/**
 * @since 0.9.2
 * @category Instance
 */
export const UseSome: UseSome2<URI> = {
  useSome: R.useSome,
}

/**
 * @since 0.9.2
 * @category Instance
 */
export const UseAll: UseAll2<URI> = {
  useAll: R.useAll,
}

/**
 * @since 0.9.2
 * @category Instance
 */
export const ProvideSome: ProvideSome2<URI> = {
  provideSome: R.provideSome,
}

/**
 * @since 0.9.2
 * @category Instance
 */
export const ProvideAll: ProvideAll2<URI> = {
  provideAll: R.provideAll,
}

/**
 * @since 0.9.2
 * @category Instance
 */
export const Provide: Provide2<URI> = {
  ...UseAll,
  ...UseSome,
  ...ProvideSome,
  ...ProvideAll,
}

/**
 * @since 0.9.2
 * @category Constructor
 */
export const ask = FR.ask(FromReader)
/**
 * @since 0.9.2
 * @category Constructor
 */
export const asks = FR.asks(FromReader)
/**
 * @since 0.9.2
 * @category Combinator
 */
export const chainReaderK = FR.chainReaderK(FromReader, Chain)
/**
 * @since 0.9.2
 * @category Combinator
 */
export const chainFirstReaderK = FR.chainFirstReaderK(FromReader, Chain)
/**
 * @since 0.9.2
 * @category Constructor
 */
export const fromReaderK = FR.fromReaderK(FromReader)
/**
 * @since 0.9.2
 * @category Combinator
 */
export const local =
  <A, B>(f: (a: A) => B) =>
  <C>(ro: ReaderOption<B, C>): ReaderOption<A, C> =>
  (a) =>
    ro(f(a))
