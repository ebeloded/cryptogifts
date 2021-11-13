import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import ls from 'safe-ls'

export const lsStore = (key: string): Writable<any> => {
  const storage = ls(key)
  console.log('inside lsStore', storage.get())
  const { set, update, subscribe } = writable(storage.get())

  return {
    set: (value: any) =>
      Promise.resolve(set(value)).then(() => storage.set(value)),
    update,
    subscribe,
  }
}

export default lsStore
