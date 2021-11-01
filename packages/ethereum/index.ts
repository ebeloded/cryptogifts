declare global {
  interface Window {
    ethereum?: import('eip1193-provider').default
  }
}

import { ethers } from 'ethers'
import { Cryptogift__factory } from './contracts'
import addresses from './contracts/addresses.json'
import accounts from './hardhat-accounts.json'

const ADDRESS = addresses.localhost.Cryptogift
const provider = () => new ethers.providers.JsonRpcProvider()
const signer = () => {
  return new ethers.Wallet(accounts[0].private_key, provider())
}

export const contract = (sign: boolean = false) => {
  const s = sign ? signer() : provider()
  return Cryptogift__factory.connect(ADDRESS, s)
}

export const getBalance = async () => {
  return provider().getBalance(ADDRESS)
}
