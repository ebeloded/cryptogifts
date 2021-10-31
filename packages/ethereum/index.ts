declare global {
  interface Window {
    ethereum?: import('eip1193-provider').default
  }
}

import { utils, ethers } from 'ethers'
import { abi } from './artifacts/src/Greeter.sol/Greeter.json'
import { Greeter } from './contracts'

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

export async function requestAccount() {
  await window.ethereum.request({ method: 'eth_requestAccounts' })
}

// call the smart contract, read the current greeting value
export async function fetchGreeting() {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi,
      provider,
    ) as Greeter

    return await contract.greet()
  }
}

// call the smart contract, send an update
export async function setGreeting(greeting: string) {
  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)
    const transaction = await contract.setGreeting(greeting)
    await transaction.wait()
    fetchGreeting()
  }
}
