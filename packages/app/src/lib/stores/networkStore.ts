import { writable, readable, derived } from 'svelte/store'
import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'

import { browser } from '$app/env'

type Network = {}

const NoEthereumProviderError = () => new Error('No Ethereum provider found')

export const providerPromise = browser
  ? detectEthereumProvider({
      silent: true,
      timeout: 1000,
    }).then((ethereum: import('eip1193-provider').default | null) => {
      if (!ethereum) throw NoEthereumProviderError
      return {
        ethereum,
        provider: new ethers.providers.Web3Provider(ethereum, 'any'),
      }
    })
  : Promise.reject(NoEthereumProviderError())

function createNetworkStore() {
  console.log('createNetworkStore')
  const { set, subscribe } = writable<Network | null | undefined>(void 0)

  providerPromise.then(
    ({ provider }) => {
      provider.getNetwork().then(set)
      provider.on('network', set)
    },
    () => set(null),
  )

  return {
    subscribe,
  }
}

export const networkStore = createNetworkStore()
