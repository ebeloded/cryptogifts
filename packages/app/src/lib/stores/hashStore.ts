import type { Writable } from 'svelte/store'

const hash = () =>
  typeof window !== 'undefined'
    ? {
        isAvailable: true,
        get: () => window.location.hash.slice(1),
        set: (v: string) => (window.location.hash = v),
      }
    : {
        isAvailable: false,
        get: () => '',
        set: () => void 0,
      }

const createHashStore = (): Writable<string> => {
  const { get, set, isAvailable } = hash()

  return {
    subscribe(run) {
      const onChange = () => run(get())
      onChange()
      isAvailable && window.addEventListener('hashchange', onChange, false)
      return () =>
        isAvailable && window.removeEventListener('hashchange', onChange)
    },
    set,
    update: (fn) => set(fn(get())),
  }
}

export const hashStore = createHashStore()

export default hashStore
