import * as AD from 'fp-ts/Alt'
import * as Alternative_ from 'fp-ts/Alternative'
import * as App from 'fp-ts/Applicative'
import * as Ap from 'fp-ts/Apply'
import * as Ch from 'fp-ts/Chain'
import { Either, isRight } from 'fp-ts/Either'
import { Eq } from 'fp-ts/Eq'
import { constant, constFalse, flow, identity, Lazy, pipe } from 'fp-ts/function'
import * as F from 'fp-ts/Functor'
import { Monad1 } from 'fp-ts/Monad'
import { Monoid } from 'fp-ts/Monoid'
import * as O from 'fp-ts/Option'
import { Pointed1 } from 'fp-ts/Pointed'
import { Predicate } from 'fp-ts/Predicate'
import { Semigroup } from 'fp-ts/Semigroup'
import { Show } from 'fp-ts/Show'

import { deepEqualsEq } from './Eq'

export type Data<A> = NoData | Loading | Refresh<A> | Replete<A>

export type Value<A> = [A] extends [Data<infer R>] ? R : never

export const isNoData = <A>(data: Data<A>): data is NoData => data._tag === 'NoData'

export const isLoading = <A>(data: Data<A>): data is Loading => data._tag === 'Loading'

export const isRefresh = <A>(data: Data<A>): data is Refresh<A> => data._tag === 'Refresh'

export const isReplete = <A>(data: Data<A>): data is Replete<A> => data._tag === 'Replete'

export const hasValue = <A>(data: Data<A>): data is Refresh<A> | Replete<A> =>
  isRefresh(data) || isReplete(data)

export interface NoData {
  readonly _tag: 'NoData'
}

export const NoData: NoData = { _tag: 'NoData' }

export interface Loading {
  readonly _tag: 'Loading'
  readonly progress: O.Option<Progress>
}

export const Loading = (progress: O.Option<Progress> = O.none): Loading => ({
  _tag: 'Loading',
  progress,
})

export interface Progress {
  readonly loaded: number
  readonly total: O.Option<number>
}

export const Progress = (loaded: number, total: O.Option<number> = O.none): Progress => ({
  loaded,
  total,
})

Progress.show = (p: Progress): string =>
  pipe(
    p.total,
    O.matchW(
      () => `${p.loaded}`,
      () => `${p.loaded}/${p.total}`,
    ),
  )

Progress.equals = (s: Progress) => (f: Progress) => deepEqualsEq.equals(s)(f)

Progress.concat =
  (s: Progress) =>
  (f: Progress): Progress =>
    pipe(
      O.Do,
      O.apS('sTotal', s.total),
      O.apS('fTotal', f.total),
      O.map(({ sTotal, fTotal }) => Progress(f.loaded + s.loaded, O.some(fTotal + sTotal))),
      O.getOrElse(() => Progress(f.loaded + s.loaded)),
    )

export interface Refresh<A> {
  readonly _tag: 'Refresh'
  readonly value: A
  readonly progress: O.Option<Progress>
}

export const Refresh = <A>(value: A, progress: O.Option<Progress> = O.none): Refresh<A> => ({
  _tag: 'Refresh',
  value,
  progress,
})

export interface Replete<A> {
  readonly _tag: 'Replete'
  readonly value: A
}

export const Replete = <A>(value: A): Replete<A> => ({ _tag: 'Replete', value })

export const matchW =
  <A, B, C, D, E>(
    onNoData: () => A,
    onLoading: (progress: O.Option<Progress>) => B,
    onRefresh: (value: C, progress: O.Option<Progress>) => D,
    onReplete: (value: C) => E,
  ) =>
  (data: Data<C>): A | B | D | E => {
    switch (data._tag) {
      case 'NoData':
        return onNoData()
      case 'Loading':
        return onLoading(data.progress)
      case 'Refresh':
        return onRefresh(data.value, data.progress)
      case 'Replete':
        return onReplete(data.value)
    }
  }

export const match3W =
  <A, B, C, D>(
    onNoData: () => A,
    onLoading: (progress: O.Option<Progress>) => B,
    onRefreshOrReplete: (value: C) => D,
  ) =>
  (data: Data<C>): A | B | D => {
    switch (data._tag) {
      case 'NoData':
        return onNoData()
      case 'Loading':
        return onLoading(data.progress)
      case 'Refresh':
      case 'Replete':
        return onRefreshOrReplete(data.value)
    }
  }

export const match: <A, B>(
  onNoData: () => A,
  onLoading: () => A,
  onRefresh: (value: B) => A,
  onReplete: (value: B) => A,
) => (data: Data<B>) => A = matchW

export const toLoading = <A>(data: Data<A>): Data<A> =>
  pipe(data, matchW(Loading, Loading, Refresh, Refresh))

export const fromNullable = <A>(a: A | null | undefined): Data<A> =>
  a === null || a === undefined ? NoData : Replete(a)

export const getShow = <A>(S: Show<A>): Show<Data<A>> => ({
  show: matchW(
    constant('NoData'),
    O.matchW(
      () => `Loading`,
      (p) => `Loading(${Progress.show(p)})`,
    ),
    (v, p) =>
      pipe(
        p,
        O.matchW(
          () => `Refresh(${S.show(v)})`,
          (p) => `Refresh(${S.show(v)}, ${Progress.show(p)})`,
        ),
      ),
    (v) => `Replete(${S.show(v)})`,
  ),
})

export const getEq = <A>(S: Eq<A>): Eq<Data<A>> => {
  const OptionProgressEq = O.getEq(Progress)

  return {
    equals: (a) => (b) =>
      pipe(
        a,
        matchW(
          () => isNoData(b),
          (p) => isLoading(b) && OptionProgressEq.equals(p)(b.progress),
          (a, p) => isRefresh(b) && S.equals(a)(b.value) && OptionProgressEq.equals(p)(b.progress),
          (a) => isReplete(b) && S.equals(a)(b.value),
        ),
      ),
  }
}

export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Data<A>> => {
  const OptionProgressSemigroup = O.getMonoid(Progress)

  return {
    concat:
      (secondD: Data<A>) =>
      (firstD: Data<A>): Data<A> =>
        pipe(
          firstD,
          matchW(
            constant(secondD), // Empty value
            (fp) =>
              pipe(
                secondD,
                matchW(
                  constant(firstD),
                  constant(firstD),
                  (second, sp) => Refresh(second, OptionProgressSemigroup.concat(sp)(fp)),
                  Refresh,
                ),
              ),
            (first, fp) =>
              pipe(
                secondD,
                matchW(
                  constant(firstD),
                  constant(firstD),
                  (second, sp) =>
                    Refresh(pipe(first, S.concat(second)), OptionProgressSemigroup.concat(sp)(fp)),
                  (second) => Refresh(pipe(first, S.concat(second)), fp),
                ),
              ),
            (first) =>
              pipe(
                secondD,
                matchW(
                  constant(firstD),
                  (sp) => Refresh(first, sp),
                  (second, sp) => Refresh(pipe(first, S.concat(second)), sp),
                  (second) => Replete(pipe(first, S.concat(second))),
                ),
              ),
          ),
        ),
  }
}

export const getMonoid = <A>(S: Semigroup<A>): Monoid<Data<A>> => ({
  ...getSemigroup(S),
  empty: NoData,
})

export const getOrElse =
  <A>(onInitial: () => A, onPending: () => A) =>
  (ma: Data<A>): A =>
    match<A, A>(onInitial, onPending, identity, identity)(ma)

export const elem =
  <A>(E: Eq<A>) =>
  (a: A) =>
  (ma: Data<A>): boolean =>
    match3W(constFalse, constFalse, E.equals(a))(ma)

export const exists =
  <A>(predicate: Predicate<A>) =>
  (ma: Data<A>): boolean =>
    pipe(ma, match3W(constFalse, constFalse, predicate))

export const of = <A>(value: A): Data<A> => Replete(value)

export const map =
  <A, B>(f: (value: A) => B) =>
  (data: Data<A>): Data<B> =>
    pipe(
      data,
      matchW(constant(NoData), Loading, (a, p) => Refresh(f(a), p), flow(f, Replete)),
    )

export const chain =
  <A, B>(f: (value: A) => Data<B>) =>
  (data: Data<A>): Data<B> =>
    pipe(data, matchW(constant(NoData), Loading, f, f))

export const URI = '@typed/fp/Data'
export type URI = typeof URI

declare module 'fp-ts/HKT' {
  export interface URItoKind<A> {
    [URI]: Data<A>
  }
}

export const Pointed: Pointed1<URI> = {
  of,
}

export const Functor: F.Functor1<URI> = {
  map,
}

export const bindTo = F.bindTo(Functor)
export const flap = F.flap(Functor)
export const tupled = F.tupled(Functor)

export const Chain: Ch.Chain1<URI> = {
  ...Functor,
  chain,
}

export const ap = Ch.ap(Chain)
export const bind = Ch.bind(Chain)
export const chainFirst = Ch.chainFirst(Chain)

export const Apply: Ap.Apply1<URI> = {
  ...Functor,
  ap,
}

export const apFirst = Ap.apFirst(Apply)
export const apS = Ap.apS(Apply)
export const apSecond = Ap.apSecond(Apply)
export const apT = Ap.apT(Apply)
export const getApplySemigroup = Ap.getApplySemigroup(Apply)

export const Applicative: App.Applicative1<URI> = {
  ...Apply,
  ...Pointed,
}

export const getApplicativeMonoid = App.getApplicativeMonoid(Applicative)

export const Monad: Monad1<URI> = {
  ...Chain,
  ...Pointed,
}

export const chainRec =
  <A, B>(f: (value: A) => Data<Either<A, B>>) =>
  (value: A): Data<B> => {
    let data = f(value)

    while (!isNoData(data) && !isLoading(data)) {
      if (isRight(data.value)) {
        return Replete(data.value.right)
      }

      data = f(data.value.left)
    }

    return data
  }

export const alt =
  <A>(f: Lazy<Data<A>>) =>
  <B>(b: Data<B>): Data<A | B> =>
    pipe(b, matchW(f, f, Refresh, Replete))

export const Alt: AD.Alt1<URI> = {
  ...Functor,
  alt,
}

export const altAll = AD.altAll(Alt)

export const zero = <A>(): Data<A> => NoData

export const Alternative: Alternative_.Alternative1<URI> = {
  ...Alt,
  zero,
}

export const fromOption = <A>(option: O.Option<A>): Data<A> =>
  pipe(
    option,
    O.matchW(() => NoData, Replete),
  )

export const toOption = <A>(data: Data<A>): O.Option<A> =>
  pipe(
    data,
    matchW(
      () => O.none,
      () => O.none,
      O.some,
      O.some,
    ),
  )

// TODO
// Foldable
// Traversable
// Compactable
// Filterable
