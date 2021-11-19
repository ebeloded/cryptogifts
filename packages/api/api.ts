export const api = {
  async hello() {
    console.log('api world')
    return 'world'
  },
}

type API = typeof api

export type { API }
