<script lang="ts">
import cs from 'clsx'
export let error = false
</script>

<p class="{cs('mt-1 mx-1 text-xs', error ? 'text-red-600' : 'text-gray-500')}">
  <slot />
</p>
