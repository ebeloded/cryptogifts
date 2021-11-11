import { browser } from '$app/env'

if (browser && window?.ethereum) {
  //@ts-ignore
  window.ethereum.autoRefreshOnNetworkChange = false
}

export {}
