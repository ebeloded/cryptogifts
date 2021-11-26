import { proxyObjectCall } from 'object-call-utils'
import { functions, httpsCallable } from './firebase/functions'
import type { API } from '@cryptogifts/functions'

const panic = (err: string) => {
  throw new Error(err)
}
export const api = proxyObjectCall<API>((path, args) =>
  httpsCallable(
    functions,
    'api',
  )([path, args])
    .then((res) => res.data as any)
    .then(({ ok, error }) => (error ? panic(error) : ok)),
)
