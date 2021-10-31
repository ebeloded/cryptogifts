declare global {
  interface Window {
    ethereum?: import('eip1193-provider').default
  }
}

import { ethers } from 'ethers'
import { Payable__factory } from './contracts'

const PAYABLE_ADDRESS = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'

const provider = () => new ethers.providers.JsonRpcProvider()
const signer = () => {
  const wallet = new ethers.Wallet(
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    provider(),
  )
  console.log({ wallet })
  return wallet
}

export const contract = (sign: boolean = false) => {
  const s = sign ? signer() : provider()
  return Payable__factory.connect(PAYABLE_ADDRESS, s)
}

export const getBalance = async () => {
  return provider().getBalance(PAYABLE_ADDRESS)
}
