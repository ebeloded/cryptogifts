export type { CryptoGifts, GiftStruct } from '@cryptogifts/ethereum'

import { browser } from '$app/env'
import { DEV_MODE } from '$lib/env'

import { Chain, connectEthereum } from '@cryptogifts/ethereum'
import type { ChainInfo } from '@cryptogifts/ethereum'
import { privateKey } from './localStorage'
export { utils } from '@cryptogifts/ethereum'

const PK = DEV_MODE ? privateKey.get() : void 0

export const chains = new Map<Chain, ChainInfo>([
  [1, { chainId: '0x1', chainName: 'Mainnet', rpcUrls: [''] }],
  [3, { chainId: '0x3', chainName: 'Ropsten' }],
  [4, { chainId: '0x4', chainName: 'Rinkeby' }],
  [42, { chainId: '0x2A', chainName: 'Kovan' }],
  [
    31337,
    {
      chainId: '0x7A69',
      chainName: 'Hardhat',
      rpcUrls: ['http://localhost:8545'],
    },
  ],
])

export const getChainName = (chainId: number): string => {
  const chain = chains.get(chainId)
  return chain ? chain.chainName : 'Unknown'
}

export const METAMASK_URL =
  'https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn'
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
