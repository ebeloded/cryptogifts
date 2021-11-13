import { derived, writable } from 'svelte/store'
import { accountStore, networkStore } from '.'
import { providerPromise } from './networkStore'
import { utils } from 'ethers'
import { getContract } from '@cryptogifts/ethereum'

interface User {
  ensName: string
  address: string
  balance: any
  network: any
  contract: any
  signer: any
}

export const userStore = derived<any, User>(
  [accountStore, networkStore],
  ([account, network], set) => {
    if (account && network) {
      console.log('updateUserStore')
      providerPromise.then(async ({ provider }) => {
        const signer = provider.getSigner(0)
        const [address, ensName, balance] = await Promise.all([
          signer.getAddress(),
          provider.lookupAddress(account).catch(() => null),
          signer.getBalance().then(utils.formatEther),
        ])
        set({
          address,
          ensName,
          balance,
          network,
          signer,
          contract: getContract(signer),
        })
      })
    } else {
      set(null)
    }
  },
)
