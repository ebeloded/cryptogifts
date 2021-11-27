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
      define: {
        'process.env': process.env,
      },
      resolve: {
        alias: {
          $components: resolve('./src/components'),
          $services: resolve('./src/services'),
          $lib: resolve('./src/lib'),
        },
      },
      ssr: {
        external: ['firebase/app', 'firebase/analytics', 'firebase/functions'],
      },
      optimizeDeps: {
        exclude: [
          'clsx',
          'firebase/firestore',
          'firebase/auth',
          'firebase/functions',
          'firebase/app',
          'ramda',
          'rxjs',
          'rxjs/operators',
        ],
      },
    },
  },
}

export default config
