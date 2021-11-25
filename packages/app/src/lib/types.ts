import type { Chain } from '@cryptogifts/ethereum'

export enum Network {
  ethereum = 'ETH',
  solana = 'SOL',
}

export interface RedeemableGiftEthereum {
  n: Network.ethereum
  c: Chain
  k: string // gift key
  m: string // message
}

export type RedeemableGift = RedeemableGiftEthereum
