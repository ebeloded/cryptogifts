export type { CryptoGifts, GiftStruct } from '@cryptogifts/ethereum'

import { browser } from '$app/env'
import { DEV_MODE } from '$lib/env'

import { connectEthereum } from '@cryptogifts/ethereum'
import { privateKey } from './localStorage'
export { utils } from '@cryptogifts/ethereum'

const PK = DEV_MODE ? privateKey.get() : void 0

export const {
  address$,
  block$,
  contract$,
  network$,
  user$,
  getFeeData,
  changeNetwork,
  connectAccount,
} = browser ? connectEthereum(PK) : ({} as any)
