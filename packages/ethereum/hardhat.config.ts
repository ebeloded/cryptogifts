import 'dotenv/config'
import { HardhatUserConfig } from 'hardhat/config'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import './tasks'

const accounts =
  process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []

const config: HardhatUserConfig =
  // https://hardhat.org/config/
  {
    solidity: '0.8.7',
    defaultNetwork: 'hardhat',
    networks: {
      localhost: {},
      hardhat: {},
      ropsten: {
        url: process.env.ROPSTEN_URL,
        accounts,
      },
      rinkeby: {
        url: process.env.RINKEBY_URL,
        accounts,
      },
      kovan: {
        url: process.env.KOVAN_URL,
        accounts,
      },
      fujiAvalanche: {
        url: 'https://api.avax-test.network/ext/bc/C/rpc',
        gasPrice: 225000000000,
        chainId: 43113,
        accounts,
      },
    },
    gasReporter: {
      enabled: process.env.REPORT_GAS !== undefined,
      currency: 'USD',
    },
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY,
    },
    paths: {
      sources: 'contracts',
    },
    typechain: {
      outDir: 'contracts-ts',
    },
  }

export default config
