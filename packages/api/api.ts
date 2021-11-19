export const api = {
  hello() {
    console.log('api world')
  },
}

type API = typeof api

export type { API }
