import type { Chain } from './enums'
import type { ChainInfo } from './types'

export const chains = new Map<Chain, ChainInfo>([
  [1, { chainId: '0x1', chainName: 'Mainnet', rpcUrls: [''] }],
  [3, { chainId: '0x3', chainName: 'Ropsten' }],
  [4, { chainId: '0x4', chainName: 'Rinkeby' }],
  [42, { chainId: '0x2A', chainName: 'Kovan' }],
  [
    31337,
    {
      chainId: '0x7A69',
      chainName: 'Localhost',
      rpcUrls: ['http://localhost:8545'],
    },
  ],
])
