export type { Cryptogifts, GiftStruct } from '@cryptogifts/ethereum'

import { browser } from '$app/env'
import { DEV_MODE } from '$lib/env'
import { chains, connectEthereum } from '@cryptogifts/ethereum'

import { privateKey } from './localStorage'

export { utils, chains } from '@cryptogifts/ethereum'

const PK = DEV_MODE ? privateKey.get() : void 0

export const getChainName = (chainId: number): string =>
  chains.get(chainId)?.chainName ?? 'Unknown'

export const METAMASK_URL =
  'https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn'

export const {
  address$,
  block$,
  contract$,
  network$,
  user$,
  getGift$,
  getFeeData,
  changeNetwork,
  connectAccount,
} = browser ? connectEthereum(PK) : ({} as ReturnType<typeof connectEthereum>)
