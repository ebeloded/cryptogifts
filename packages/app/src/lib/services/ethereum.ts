export type { CryptoGifts, GiftStruct } from '@cryptogifts/ethereum'

import { browser } from '$app/env'
import { PRIVATE_KEY } from '$lib/env'
import { connectEthereum } from '@cryptogifts/ethereum'
export { utils } from '@cryptogifts/ethereum'

export const {
  address$,
  block$,
  contract$,
  network$,
  user$,
  getFeeData,
  changeNetwork,
  connectAccount,
} = browser ? connectEthereum(PRIVATE_KEY) : ({} as any)
