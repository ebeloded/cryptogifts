import { derived, writable } from 'svelte/store'
import { accountStore, networkStore } from '.'
import { providerPromise } from './networkStore'

interface User {
  ensName: string
  address: string
  balance: any
}

const uStore = derived(
  [accountStore, networkStore],
  ([account, network], set) => {
    if (account && network) {
      providerPromise.then(async ({ provider }) => {
        set({
          address: account,
          ensName: await provider.lookupAddress(account),
          balance: await provider.getBalance(account),
        })
      })
    } else {
      set(null)
    }
  },
)

export const userStore = uStore //createUserStore()
