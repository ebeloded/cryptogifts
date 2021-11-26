import { browser } from '$app/env'
import { DEV_MODE } from './env'
import { api } from './services/api'
import {
  functions,
  connectFunctionsEmulator,
} from './services/firebase/functions'

if (browser && window?.ethereum) {
  //@ts-ignore
  window.ethereum.autoRefreshOnNetworkChange = false // silence warning in Brave
}

export async function pingPong() {
  console.time('PING')
  await api.ping()
  console.timeEnd('PING')
}

if (browser) {
  if (DEV_MODE) {
    connectFunctionsEmulator(functions, 'localhost', 5001)
  }
}

export {}
