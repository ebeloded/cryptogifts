<script lang="ts">
import cs from 'clsx'
let _class = ''
export { _class as class }
export let href: string
</script>

<a
  href="{href}"
  class="{cs('font-medium text-green-600 hover:text-green-500', _class)}">
  <slot />
</a>
