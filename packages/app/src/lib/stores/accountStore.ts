import { readable, writable } from 'svelte/store'
import { providerPromise } from './networkStore'

function createAccountStore() {
  console.log('createAccountStore')
  const { set, subscribe } = writable(void 0)

  const updateAccounts = ([account]) => set(account)

  providerPromise.then(({ provider, ethereum }) => {
    provider.send('eth_accounts', []).then(updateAccounts)

    ethereum.on('accountsChanged', updateAccounts)
  })

  return {
    subscribe,

    requestAccount: () =>
      providerPromise.then(({ provider }) =>
        provider.send('eth_requestAccounts', []),
      ),
  }
}

export const accountStore = createAccountStore()
