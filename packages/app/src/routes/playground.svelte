<script lang="ts" context="module">
</script>

<script lang="ts">
import { onMount } from 'svelte'
import detectEthereumProvider from '@metamask/detect-provider'
import WalletLink from 'walletlink'

// import { ethers } from 'ethers'
import { browser } from '$app/env'

let network = null
// const provider: ethers.providers.Web3Provider =
//   browser && new ethers.providers.Web3Provider(window.ethereum, 'any')

async function login() {
  if (window.ethereum) {
    // await window.ethereum.enable()
    // const eth_requestAccounts = await window.ethereum.request({
    //   method: 'eth_requestAccounts',
    // })
    // const eth_requestAccounts = await provider.send('eth_requestAccounts', [])
    // console.log({ eth_requestAccounts })
    // const signer = provider.getSigner()
    // console.log('address', await signer.getAddress(), await signer.getBalance())
  }

  // signer.signMessage('hello')
  // console.log({ signer })
}
onMount(async () => {
  detectEthereumProvider().then(
    (v) => {
      console.log({ v })
    },
    (err) => {
      console.log({ err })
    },
  )
  // if (false) {
  //   provider.on('block', (block) => {
  //     console.log({ block })
  //   })
  //   const eth_accounts = await window.ethereum.request({
  //     method: 'eth_accounts',
  //   })
  //   console.log({ eth_accounts })
  //   const listedAccounts = await provider.listAccounts()
  //   console.log({ listedAccounts })
  //   // this returns the provider, or null if it wasn't detected
  //   const detectedProvider = await detectEthereumProvider()
  //   console.log({ detectedProvider })
  //   // const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  //   network = await provider.getNetwork()
  //   console.log({ network })
  //   window.ethereum.on('accountsChanged', function (accounts) {
  //     // Time to reload your interface with accounts[0]!
  //     console.log('on:accountsChanged', accounts)
  //   })
  //   provider.on('accountsChanged', function (accounts) {
  //     // Time to reload your interface with accounts[0]!
  //     console.log('provider.on:accountsChanged', accounts)
  //   })
  //   window.ethereum.on('chainChanged', function (chainId) {
  //     console.log('chainChanged', chainId)
  //   })
  //   provider.on('chainChanged', function (accounts) {
  //     // Time to reload your interface with accounts[0]!
  //     console.log('provider.on:chainChanged', accounts)
  //   })
  //   provider.on('network', (newNetwork, oldNetwork) => {
  //     network = newNetwork
  //     console.log('on:network', { newNetwork, oldNetwork })
  //     // When a Provider makes its initial connection, it emits a "network"
  //     // event with a null oldNetwork along with the newNetwork. So, if the
  //     // oldNetwork exists, it represents a changing network
  //     if (oldNetwork) {
  //       // window.location.reload()
  //     }
  //   })
  // }
})
</script>

<button
  on:click="{login}"
  type="button"
  class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
  Login
</button>

<pre>
{JSON.stringify(network, null, 2)}
</pre>
<slot />
