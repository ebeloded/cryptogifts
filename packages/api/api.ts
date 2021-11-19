export const api = {
  hello() {
    console.log('api world')
    return 'world'
  },
}

type API = typeof api

export type { API }
