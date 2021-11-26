import type { BigNumber } from 'ethers'

export interface FeeData {
  maxFeePerGas: null | BigNumber
  maxPriorityFeePerGas: null | BigNumber
  gasPrice: null | BigNumber
}

export type ChainInfo = {
  chainId: string
  blockExplorerUrls?: string[]
  chainName?: string
  iconUrls?: string[]
  nativeCurrency?: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls?: string[]
}
