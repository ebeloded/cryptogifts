import preprocess from 'svelte-preprocess'
import adapterStatic from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    floc: true,
    adapter: adapterStatic(),
  },
}

export default config
