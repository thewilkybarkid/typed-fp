import {
  MonadReader,
  MonadReader2,
  MonadReader3,
  MonadReader3C,
  MonadReader4,
} from '@typed/fp/MonadReader'
import { WidenI } from '@typed/fp/Widen'
import { pipe } from 'fp-ts/dist/function'
import { HKT2, Kind2, Kind3, Kind4, URIS2, URIS3, URIS4 } from 'fp-ts/dist/HKT'

import { GetKV, getKV, GetKV2, GetKV3, GetKV3C } from './getKV'
import { KV, KV2, KV3, KV4 } from './KV'
import { SetKV, setKV, SetKV2, SetKV3, SetKV3C } from './setKV'

export function modifyKV<F extends URIS2>(
  M: MonadReader2<F>,
): <A>(
  f: (value: A) => A,
) => <K, E>(kv: KV2<F, K, E, A>) => Kind2<F, WidenI<E | SetKV2<F> | GetKV2<F>>, A>

export function modifyKV<F extends URIS3>(
  M: MonadReader3<F>,
): <A>(
  f: (value: A) => A,
) => <K, R, E>(kv: KV3<F, K, R, E, A>) => Kind3<F, WidenI<R | SetKV3<F> | GetKV3<F>>, E, A>

export function modifyKV<F extends URIS3, E>(
  M: MonadReader3C<F, E>,
): <A>(
  f: (value: A) => A,
) => <K, R>(kv: KV3<F, K, R, E, A>) => Kind3<F, WidenI<R | SetKV3C<F, E> | GetKV3C<F, E>>, E, A>

export function modifyKV<F extends URIS4>(
  M: MonadReader4<F>,
): <A>(
  f: (value: A) => A,
) => <K, S, R, E>(kv: KV4<F, K, S, R, E, A>) => Kind4<F, S, WidenI<R | SetKV<F> | GetKV<F>>, E, A>

export function modifyKV<F>(
  M: MonadReader<F>,
): <A>(
  f: (value: A) => A,
) => <K, E, A>(kv: KV<F, K, E, A>) => HKT2<F, WidenI<E | SetKV<F> | GetKV<F>>, A>

export function modifyKV<F>(M: MonadReader<F>) {
  const get = getKV(M)
  const set = setKV(M)

  return <A>(f: (value: A) => A) => <K, E>(kv: KV<F, K, E, A>) =>
    pipe(
      kv,
      get,
      M.chain((a) => pipe(kv, set(f(a)) as any)),
    ) as HKT2<F, WidenI<E | SetKV<F> | GetKV<F>>, A>
}
