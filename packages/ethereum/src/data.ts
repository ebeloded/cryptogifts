import type { Chain } from './enums'
import type { ChainInfo } from './types'

export const chains = new Map<Chain, ChainInfo>([
  [1, { chainId: '0x1', chainName: 'Mainnet', rpcUrls: [''] }],
  [
    3,
    {
      chainId: '0x3',
      chainName: 'Ropsten',
      rpcUrls: [process.env.ROPSTEN_URL!],
    },
  ],
  [
    4,
    {
      chainId: '0x4',
      chainName: 'Rinkeby',
      rpcUrls: [process.env.RINKEBY_URL!],
    },
  ],
  [
    42,
    {
      chainId: '0x2A',
      chainName: 'Kovan',
      rpcUrls: [process.env.KOVAN_URL!],
    },
  ],
  [
    31337,
    {
      chainId: '0x7A69',
      chainName: 'Localhost',
      rpcUrls: ['http://localhost:8545'],
    },
  ],
])
