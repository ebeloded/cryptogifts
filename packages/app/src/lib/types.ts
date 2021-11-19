import type { EthereumNetwork } from '@cryptogifts/ethereum'

export enum Chain {
  ethereum = 'ETH',
  solana = 'SOL',
}

export interface RedeemableGiftEthereum {
  c: Chain.ethereum
  n: EthereumNetwork
  k: string // gift key
  m: string // message
}

export type RedeemableGift = RedeemableGiftEthereum
