declare global {
  interface Window {
    ethereum?: import('eip1193-provider').default
  }
}

import type { ethers } from 'ethers'
import { CryptoGifts__factory } from './contracts'
import addresses from './contracts/addresses.json'

const ADDRESS = addresses.localhost.Cryptogift

export const getContract = (
  signerOrProvider: ethers.Signer | ethers.providers.Provider,
) => {
  console.log('getting contract', { ADDRESS, signerOrProvider })
  return CryptoGifts__factory.connect(ADDRESS, signerOrProvider)
}

// export const get = async (key: string) => {
//   const data = Cryptogift__factory.createInterface().encodeFunctionData('get', [
//     key,
//   ])
//   console.log({ data })
//   const nonce = await provider().getTransactionCount(signer().address)
//   console.log({ nonce })
//   const transaction = await signer().signTransaction({
//     data,
//     to: ADDRESS,
//     nonce,
//     gasPrice: 209628361,
//     gasLimit: 121592,
//   })
//   console.log({ transaction })

//   const response = await provider().sendTransaction(transaction)
//   console.log({ response })
// }
