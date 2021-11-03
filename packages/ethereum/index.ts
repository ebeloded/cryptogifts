declare global {
  interface Window {
    ethereum?: import('eip1193-provider').default
  }
}

import { ethers, utils } from 'ethers'
import { CryptoGifts__factory } from './contracts'
import addresses from './contracts/addresses.json'
import accounts from './hardhat-accounts.json'

const ADDRESS = addresses.localhost.Cryptogift
export const provider = () => new ethers.providers.JsonRpcProvider()
const signer = () => {
  return new ethers.Wallet(accounts[0].private_key, provider())
}

export const contract = (sign: boolean = false) => {
  console.log({ ADDRESS })
  const s = sign ? signer() : provider()
  return CryptoGifts__factory.connect(ADDRESS, s)
}

export const getBalance = async () => {
  return provider().getBalance(ADDRESS)
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
