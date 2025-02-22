---
title: ReaderStreamOption.ts
nav_order: 47
parent: Modules
---

## ReaderStreamOption overview

ReaderStreamEither is an Option of ReaderStream, allowing for you to represent your application over
time with Stream, with support for Optionality through Option, and dependency injection from Reader.

Added in v0.9.2

---

<h2 class="text-delta">Table of contents</h2>

- [Combinator](#combinator)
  - [alt](#alt)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apFirstW](#apfirstw)
  - [apS](#aps)
  - [apSW](#apsw)
  - [apSecond](#apsecond)
  - [apSecondW](#apsecondw)
  - [apT](#apt)
  - [apTW](#aptw)
  - [apW](#apw)
  - [askAndProvide](#askandprovide)
  - [askAndUse](#askanduse)
  - [chain](#chain)
  - [chainEnvK](#chainenvk)
  - [chainFirstEnvK](#chainfirstenvk)
  - [chainFirstReaderStreamK](#chainfirstreaderstreamk)
  - [chainFirstResumeK](#chainfirstresumek)
  - [chainFirstStreamK](#chainfirststreamk)
  - [chainNullableK](#chainnullablek)
  - [chainOptionK](#chainoptionk)
  - [chainReaderK](#chainreaderk)
  - [chainReaderStreamK](#chainreaderstreamk)
  - [chainRec](#chainrec)
  - [chainResumeK](#chainresumek)
  - [chainStreamK](#chainstreamk)
  - [chainW](#chainw)
  - [map](#map)
  - [provideAll](#provideall)
  - [provideAllWith](#provideallwith)
  - [provideAllWithEnv](#provideallwithenv)
  - [provideAllWithReaderStream](#provideallwithreaderstream)
  - [provideSome](#providesome)
  - [provideSomeWith](#providesomewith)
  - [provideSomeWithEnv](#providesomewithenv)
  - [provideSomeWithReaderStream](#providesomewithreaderstream)
  - [useAll](#useall)
  - [useAllWith](#useallwith)
  - [useAllWithEnv](#useallwithenv)
  - [useAllWithReaderStream](#useallwithreaderstream)
  - [useSome](#usesome)
  - [useSomeWith](#usesomewith)
  - [useSomeWithEnv](#usesomewithenv)
  - [useSomeWithReaderStream](#usesomewithreaderstream)
- [Constructor](#constructor)
  - [ask](#ask)
  - [asks](#asks)
  - [fromEither](#fromeither)
  - [fromEnv](#fromenv)
  - [fromEnvK](#fromenvk)
  - [fromIO](#fromio)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
  - [fromOptionK](#fromoptionk)
  - [fromPredicate](#frompredicate)
  - [fromReader](#fromreader)
  - [fromReaderK](#fromreaderk)
  - [fromReaderStream](#fromreaderstream)
  - [fromReaderStreamK](#fromreaderstreamk)
  - [fromResume](#fromresume)
  - [fromResumeK](#fromresumek)
  - [fromStream](#fromstream)
  - [fromStreamK](#fromstreamk)
  - [fromTask](#fromtask)
  - [some](#some)
  - [zero](#zero)
- [Deconstructor](#deconstructor)
  - [getOrElse](#getorelse)
  - [getOrElseE](#getorelsee)
  - [getOrElseEW](#getorelseew)
  - [getOrElseW](#getorelsew)
  - [match](#match)
  - [matchE](#matche)
- [Instance](#instance)
  - [Alt](#alt)
  - [Alternative](#alternative)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Chain](#chain)
  - [ChainRec](#chainrec)
  - [FromEnv](#fromenv)
  - [FromIO](#fromio)
  - [FromReader](#fromreader)
  - [FromReaderStream](#fromreaderstream)
  - [FromResume](#fromresume)
  - [FromStream](#fromstream)
  - [FromTask](#fromtask)
  - [Functor](#functor)
  - [Monad](#monad)
  - [MonadRec](#monadrec)
  - [Pointed](#pointed)
  - [Provide](#provide)
  - [ProvideAll](#provideall)
  - [ProvideSome](#providesome)
  - [UseAll](#useall)
  - [UseSome](#usesome)
- [Model](#model)
  - [ReaderStreamOption (interface)](#readerstreamoption-interface)
- [URI](#uri)
  - [URI](#uri-1)
  - [URI (type alias)](#uri-type-alias)

---

# Combinator

## alt

**Signature**

```ts
export declare const alt: <E, A>(
  second: Lazy<RS.ReaderStream<E, O.Option<A>>>,
) => (first: RS.ReaderStream<E, O.Option<A>>) => RS.ReaderStream<E, O.Option<A>>
```

Added in v0.9.2

## ap

**Signature**

```ts
export declare const ap: <E, A>(
  fa: RS.ReaderStream<E, O.Option<A>>,
) => <B>(fab: RS.ReaderStream<E, O.Option<(a: A) => B>>) => RS.ReaderStream<E, O.Option<B>>
```

Added in v0.9.2

## apFirst

**Signature**

```ts
export declare const apFirst: <E, B>(
  second: ReaderStreamOption<E, B>,
) => <A>(first: ReaderStreamOption<E, A>) => ReaderStreamOption<E, A>
```

Added in v0.11.0

## apFirstW

**Signature**

```ts
export declare const apFirstW: <E1, B>(
  second: ReaderStreamOption<E1, B>,
) => <E2, A>(first: ReaderStreamOption<E2, A>) => ReaderStreamOption<E1 & E2, A>
```

Added in v0.11.0

## apS

**Signature**

```ts
export declare const apS: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderStreamOption<E, B>,
) => (
  fa: ReaderStreamOption<E, A>,
) => ReaderStreamOption<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.11.0

## apSW

**Signature**

```ts
export declare const apSW: <N extends string, A, E1, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderStreamOption<E1, B>,
) => <E2>(
  fa: ReaderStreamOption<E2, A>,
) => ReaderStreamOption<E1 & E2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.11.0

## apSecond

**Signature**

```ts
export declare const apSecond: <E, B>(
  second: ReaderStreamOption<E, B>,
) => <A>(first: ReaderStreamOption<E, A>) => ReaderStreamOption<E, B>
```

Added in v0.11.0

## apSecondW

**Signature**

```ts
export declare const apSecondW: <E1, B>(
  second: ReaderStreamOption<E1, B>,
) => <E2, A>(first: ReaderStreamOption<E2, A>) => ReaderStreamOption<E1 & E2, B>
```

Added in v0.11.0

## apT

**Signature**

```ts
export declare const apT: <E, B>(
  fb: ReaderStreamOption<E, B>,
) => <A>(fas: ReaderStreamOption<E, A>) => ReaderStreamOption<E, readonly [...A, B]>
```

Added in v0.11.0

## apTW

**Signature**

```ts
export declare const apTW: <E1, B>(
  fb: ReaderStreamOption<E1, B>,
) => <E2, A extends readonly unknown[]>(
  fas: ReaderStreamOption<E2, A>,
) => ReaderStreamOption<E1 & E2, readonly [...A, B]>
```

Added in v0.11.0

## apW

**Signature**

```ts
export declare const apW: <E1, A>(
  fa: RS.ReaderStream<E1, O.Option<A>>,
) => <E2, B>(
  fab: RS.ReaderStream<E2, O.Option<(a: A) => B>>,
) => RS.ReaderStream<E1 & E2, O.Option<B>>
```

Added in v0.11.0

## askAndProvide

**Signature**

```ts
export declare const askAndProvide: <E, B>(
  hkt: ReaderStreamOption<E, B>,
) => ReaderStreamOption<E, ReaderStreamOption<unknown, B>>
```

Added in v0.9.2

## askAndUse

**Signature**

```ts
export declare const askAndUse: <E, B>(
  hkt: ReaderStreamOption<E, B>,
) => ReaderStreamOption<E, ReaderStreamOption<unknown, B>>
```

Added in v0.9.2

## chain

**Signature**

```ts
export declare const chain: <A, E, B>(
  f: (a: A) => RS.ReaderStream<E, O.Option<B>>,
) => (ma: RS.ReaderStream<E, O.Option<A>>) => RS.ReaderStream<E, O.Option<B>>
```

Added in v0.9.2

## chainEnvK

**Signature**

```ts
export declare const chainEnvK: <A, R1, B>(
  f: (value: A) => Env<R1, B>,
) => <R2>(hkt: ReaderStreamOption<R2, A>) => ReaderStreamOption<R1 & R2, B>
```

Added in v0.9.2

## chainFirstEnvK

**Signature**

```ts
export declare const chainFirstEnvK: <A, R1, B>(
  f: (value: A) => Env<R1, B>,
) => <R2>(hkt: ReaderStreamOption<R2, A>) => ReaderStreamOption<R1 & R2, A>
```

Added in v0.9.2

## chainFirstReaderStreamK

**Signature**

```ts
export declare const chainFirstReaderStreamK: <A, R1, B>(
  f: (value: A) => RS.ReaderStream<R1, B>,
) => <R2>(hkt: ReaderStreamOption<R2, A>) => ReaderStreamOption<R1 & R2, A>
```

Added in v0.13.9

## chainFirstResumeK

**Signature**

```ts
export declare const chainFirstResumeK: <A, B>(
  f: (value: A) => Resume<B>,
) => <E>(hkt: ReaderStreamOption<E, A>) => ReaderStreamOption<E, A>
```

Added in v0.9.2

## chainFirstStreamK

**Signature**

```ts
export declare const chainFirstStreamK: <A, B>(
  f: (value: A) => Stream<B>,
) => <E>(hkt: ReaderStreamOption<E, A>) => ReaderStreamOption<E, A>
```

Added in v0.9.2

## chainNullableK

**Signature**

```ts
export declare const chainNullableK: <A, B>(
  f: (a: A) => B | null | undefined,
) => <E>(ma: RS.ReaderStream<E, O.Option<A>>) => RS.ReaderStream<E, O.Option<NonNullable<B>>>
```

Added in v0.9.2

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <A, B>(
  f: (a: A) => O.Option<B>,
) => <E>(ma: RS.ReaderStream<E, O.Option<A>>) => RS.ReaderStream<E, O.Option<B>>
```

Added in v0.9.2

## chainReaderK

**Signature**

```ts
export declare const chainReaderK: <A, R, B>(
  f: (a: A) => Reader<R, B>,
) => (ma: ReaderStreamOption<R, A>) => ReaderStreamOption<R, B>
```

Added in v0.9.2

## chainReaderStreamK

**Signature**

```ts
export declare const chainReaderStreamK: <A, R1, B>(
  f: (value: A) => RS.ReaderStream<R1, B>,
) => <R2>(hkt: ReaderStreamOption<R2, A>) => ReaderStreamOption<R1 & R2, B>
```

Added in v0.13.9

## chainRec

**Signature**

```ts
export declare const chainRec: <A, E, B>(
  f: (value: A) => ReaderStreamOption<E, Ei.Either<A, B>>,
) => (value: A) => ReaderStreamOption<E, B>
```

Added in v0.9.2

## chainResumeK

**Signature**

```ts
export declare const chainResumeK: <A, B>(
  f: (value: A) => Resume<B>,
) => <E>(hkt: ReaderStreamOption<E, A>) => ReaderStreamOption<E, B>
```

Added in v0.9.2

## chainStreamK

**Signature**

```ts
export declare const chainStreamK: <A, B>(
  f: (value: A) => Stream<B>,
) => <E>(hkt: ReaderStreamOption<E, A>) => ReaderStreamOption<E, B>
```

Added in v0.9.2

## chainW

**Signature**

```ts
export declare const chainW: <A, E1, B>(
  f: (a: A) => RS.ReaderStream<E1, O.Option<B>>,
) => <E2>(ma: RS.ReaderStream<E2, O.Option<A>>) => RS.ReaderStream<E1 & E2, O.Option<B>>
```

Added in v0.13.9

## map

**Signature**

```ts
export declare const map: <A, B>(
  f: (a: A) => B,
) => <E>(fa: RS.ReaderStream<E, O.Option<A>>) => RS.ReaderStream<E, O.Option<B>>
```

Added in v0.9.2

## provideAll

**Signature**

```ts
export declare const provideAll: <A>(
  provided: A,
) => <B>(hkt: ReaderStreamOption<Partial<A>, B>) => ReaderStreamOption<unknown, B>
```

Added in v0.9.2

## provideAllWith

**Signature**

```ts
export declare const provideAllWith: <R, A>(
  provider: ReaderStreamOption<R, A>,
) => <B>(hkt: ReaderStreamOption<A, B>) => ReaderStreamOption<R, B>
```

Added in v0.9.2

## provideAllWithEnv

**Signature**

```ts
export declare const provideAllWithEnv: <E, A>(
  env: Env<E, A>,
) => <B>(hkt: ReaderStreamOption<A, B>) => ReaderStreamOption<E, B>
```

Added in v0.13.9

## provideAllWithReaderStream

**Signature**

```ts
export declare const provideAllWithReaderStream: <E, A>(
  stream: RS.ReaderStream<E, A>,
) => <B>(hkt: ReaderStreamOption<A, B>) => ReaderStreamOption<E, B>
```

Added in v0.13.9

## provideSome

**Signature**

```ts
export declare const provideSome: <A>(
  provided: A,
) => <B, C>(hkt: ReaderStreamOption<A & B, C>) => ReaderStreamOption<B, C>
```

Added in v0.9.2

## provideSomeWith

**Signature**

```ts
export declare const provideSomeWith: <E1, A>(
  provider: ReaderStreamOption<E1, A>,
) => P.Provider2<'@typed/fp/ReaderStreamOption', A, E1>
```

Added in v0.9.2

## provideSomeWithEnv

**Signature**

```ts
export declare const provideSomeWithEnv: <E, A>(
  env: Env<E, A>,
) => P.Provider2<'@typed/fp/ReaderStreamOption', A, E>
```

Added in v0.13.9

## provideSomeWithReaderStream

**Signature**

```ts
export declare const provideSomeWithReaderStream: <E, A>(
  stream: RS.ReaderStream<E, A>,
) => P.Provider2<'@typed/fp/ReaderStreamOption', A, E>
```

Added in v0.13.9

## useAll

**Signature**

```ts
export declare const useAll: <A>(
  provided: A,
) => <B>(hkt: ReaderStreamOption<Partial<A>, B>) => ReaderStreamOption<unknown, B>
```

Added in v0.9.2

## useAllWith

**Signature**

```ts
export declare const useAllWith: <R, A>(
  provider: ReaderStreamOption<R, A>,
) => <B>(hkt: ReaderStreamOption<A, B>) => ReaderStreamOption<R, B>
```

Added in v0.9.2

## useAllWithEnv

**Signature**

```ts
export declare const useAllWithEnv: <E, A>(
  env: Env<E, A>,
) => <B>(hkt: ReaderStreamOption<A, B>) => ReaderStreamOption<E, B>
```

Added in v0.13.9

## useAllWithReaderStream

**Signature**

```ts
export declare const useAllWithReaderStream: <E, A>(
  stream: RS.ReaderStream<E, A>,
) => <B>(hkt: ReaderStreamOption<A, B>) => ReaderStreamOption<E, B>
```

Added in v0.13.9

## useSome

**Signature**

```ts
export declare const useSome: <A>(
  provided: A,
) => <B, C>(hkt: ReaderStreamOption<A & B, C>) => ReaderStreamOption<B, C>
```

Added in v0.9.2

## useSomeWith

**Signature**

```ts
export declare const useSomeWith: <E1, A>(
  provider: ReaderStreamOption<E1, A>,
) => P.Provider2<'@typed/fp/ReaderStreamOption', A, E1>
```

Added in v0.9.2

## useSomeWithEnv

**Signature**

```ts
export declare const useSomeWithEnv: <E, A>(
  env: Env<E, A>,
) => P.Provider2<'@typed/fp/ReaderStreamOption', A, E>
```

Added in v0.13.9

## useSomeWithReaderStream

**Signature**

```ts
export declare const useSomeWithReaderStream: <E, A>(
  stream: RS.ReaderStream<E, A>,
) => P.Provider2<'@typed/fp/ReaderStreamOption', A, E>
```

Added in v0.13.9

# Constructor

## ask

**Signature**

```ts
export declare const ask: <R>() => ReaderStreamOption<R, R>
```

Added in v0.9.2

## asks

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => ReaderStreamOption<R, A>
```

Added in v0.9.2

## fromEither

**Signature**

```ts
export declare const fromEither: <A, E>(e: Ei.Either<unknown, A>) => RS.ReaderStream<E, O.Option<A>>
```

Added in v0.9.2

## fromEnv

**Signature**

```ts
export declare const fromEnv: NaturalTransformation22<
  '@typed/fp/Env',
  '@typed/fp/ReaderStreamOption'
>
```

Added in v0.9.2

## fromEnvK

**Signature**

```ts
export declare const fromEnvK: <A, R, B>(
  f: (...args: A) => Env<R, B>,
) => (...args: A) => ReaderStreamOption<R, B>
```

Added in v0.9.2

## fromIO

**Signature**

```ts
export declare const fromIO: NaturalTransformation12<'IO', '@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## fromNullable

**Signature**

```ts
export declare const fromNullable: <A, E>(a: A) => RS.ReaderStream<E, O.Option<NonNullable<A>>>
```

Added in v0.9.2

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <A, B>(
  f: (...a: A) => B | null | undefined,
) => <E>(...a: A) => RS.ReaderStream<E, O.Option<NonNullable<B>>>
```

Added in v0.9.2

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <A, B>(
  f: (...a: A) => O.Option<B>,
) => <E>(...a: A) => RS.ReaderStream<E, O.Option<B>>
```

Added in v0.9.2

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <A, B>(refinement: Refinement<A, B>): <E>(a: A) => RS.ReaderStream<E, O.Option<B>>
  <A>(predicate: Predicate<A>): <E, B>(b: B) => RS.ReaderStream<E, O.Option<B>>
}
```

Added in v0.9.2

## fromReader

**Signature**

```ts
export declare const fromReader: NaturalTransformation22<'Reader', '@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## fromReaderK

**Signature**

```ts
export declare const fromReaderK: <A, R, B>(
  f: (...a: A) => Reader<R, B>,
) => (...a: A) => ReaderStreamOption<R, B>
```

Added in v0.9.2

## fromReaderStream

**Signature**

```ts
export declare const fromReaderStream: <E, A>(
  ma: RS.ReaderStream<E, A>,
) => RS.ReaderStream<E, O.Option<A>>
```

Added in v0.9.2

## fromReaderStreamK

**Signature**

```ts
export declare const fromReaderStreamK: <A, R, B>(
  f: (...args: A) => RS.ReaderStream<R, B>,
) => (...args: A) => ReaderStreamOption<R, B>
```

Added in v0.13.9

## fromResume

**Signature**

```ts
export declare const fromResume: NaturalTransformation12<
  '@typed/fp/Resume',
  '@typed/fp/ReaderStreamOption'
>
```

Added in v0.9.2

## fromResumeK

**Signature**

```ts
export declare const fromResumeK: <A, B>(
  f: (...args: A) => Resume<B>,
) => <E>(...args: A) => ReaderStreamOption<E, B>
```

Added in v0.9.2

## fromStream

**Signature**

```ts
export declare const fromStream: NaturalTransformation12<
  '@most/core/Stream',
  '@typed/fp/ReaderStreamOption'
>
```

Added in v0.9.2

## fromStreamK

**Signature**

```ts
export declare const fromStreamK: <A, B>(
  f: (...args: A) => Stream<B>,
) => <E>(...args: A) => ReaderStreamOption<E, B>
```

Added in v0.9.2

## fromTask

**Signature**

```ts
export declare const fromTask: NaturalTransformation12<'Task', '@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## some

**Signature**

```ts
export declare const some: <A, E>(a: A) => RS.ReaderStream<E, O.Option<A>>
```

Added in v0.9.2

## zero

**Signature**

```ts
export declare const zero: <E, A>() => RS.ReaderStream<E, O.Option<A>>
```

Added in v0.9.2

# Deconstructor

## getOrElse

**Signature**

```ts
export declare const getOrElse: <A>(
  onNone: Lazy<A>,
) => <E>(fa: RS.ReaderStream<E, O.Option<A>>) => RS.ReaderStream<E, A>
```

Added in v0.9.2

## getOrElseE

**Signature**

```ts
export declare const getOrElseE: <E, A>(
  onNone: Lazy<RS.ReaderStream<E, A>>,
) => (fa: RS.ReaderStream<E, O.Option<A>>) => RS.ReaderStream<E, A>
```

Added in v0.9.2

## getOrElseEW

**Signature**

```ts
export declare const getOrElseEW: <E1, A>(
  onNone: Lazy<RS.ReaderStream<E1, A>>,
) => <E2>(fa: RS.ReaderStream<E2, O.Option<A>>) => RS.ReaderStream<E1 & E2, A>
```

Added in v0.9.2

## getOrElseW

**Signature**

```ts
export declare const getOrElseW: <A>(
  onNone: Lazy<A>,
) => <E, B>(fa: RS.ReaderStream<E, O.Option<B>>) => RS.ReaderStream<E, A | B>
```

Added in v0.9.2

## match

**Signature**

```ts
export declare const match: <B, A>(
  onNone: () => B,
  onSome: (a: A) => B,
) => <E>(ma: RS.ReaderStream<E, O.Option<A>>) => RS.ReaderStream<E, B>
```

Added in v0.9.2

## matchE

**Signature**

```ts
export declare const matchE: <E, B, A>(
  onNone: () => RS.ReaderStream<E, B>,
  onSome: (a: A) => RS.ReaderStream<E, B>,
) => (ma: RS.ReaderStream<E, O.Option<A>>) => RS.ReaderStream<E, B>
```

Added in v0.9.2

# Instance

## Alt

**Signature**

```ts
export declare const Alt: Alt2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## Alternative

**Signature**

```ts
export declare const Alternative: Alternative2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## Apply

**Signature**

```ts
export declare const Apply: Ap.Apply2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## Chain

**Signature**

```ts
export declare const Chain: Chain2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## ChainRec

**Signature**

```ts
export declare const ChainRec: ChainRec2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## FromEnv

**Signature**

```ts
export declare const FromEnv: FE.FromEnv2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## FromReader

**Signature**

```ts
export declare const FromReader: FR.FromReader2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## FromReaderStream

**Signature**

```ts
export declare const FromReaderStream: FRS.FromReaderStream2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.13.9

## FromResume

**Signature**

```ts
export declare const FromResume: FRe.FromResume2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## FromStream

**Signature**

```ts
export declare const FromStream: FS.FromStream2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## FromTask

**Signature**

```ts
export declare const FromTask: FromTask2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## Monad

**Signature**

```ts
export declare const Monad: Monad2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## MonadRec

**Signature**

```ts
export declare const MonadRec: MonadRec2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## Provide

**Signature**

```ts
export declare const Provide: P.Provide2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## ProvideAll

**Signature**

```ts
export declare const ProvideAll: P.ProvideAll2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## ProvideSome

**Signature**

```ts
export declare const ProvideSome: P.ProvideSome2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## UseAll

**Signature**

```ts
export declare const UseAll: P.UseAll2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

## UseSome

**Signature**

```ts
export declare const UseSome: P.UseSome2<'@typed/fp/ReaderStreamOption'>
```

Added in v0.9.2

# Model

## ReaderStreamOption (interface)

**Signature**

```ts
export interface ReaderStreamOption<E, A> extends RS.ReaderStream<E, O.Option<A>> {}
```

Added in v0.9.2

# URI

## URI

**Signature**

```ts
export declare const URI: '@typed/fp/ReaderStreamOption'
```

Added in v0.9.2

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.9.2
