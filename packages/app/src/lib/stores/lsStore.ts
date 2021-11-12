import { writable, Writable } from 'svelte/store'
import ls from 'safe-ls'

export const lsStore = (key: string): Writable<any> => {
  const storage = ls(key)
  const { set, subscribe, update } = writable(storage.get())

  const unsubscribe = subscribe((value) => storage.set(value))

  return {
    subscribe,
    set,
    update,
  }
}

export default lsStore
