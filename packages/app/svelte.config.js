import preprocess from 'svelte-preprocess'
import adapterStatic from '@sveltejs/adapter-static'
import { resolve } from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    floc: true,
    adapter: adapterStatic({
      fallback: '200.html',
    }),
    vite: {
      resolve: {
        alias: {
          $components: resolve('./src/components'),
          $services: resolve('./src/services'),
          $lib: resolve('./src/lib'),
        },
      },
    },
  },
}

export default config
