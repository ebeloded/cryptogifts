<script lang="ts">
import cs from 'clsx'
import type { ClassValue } from 'clsx'

let _class: ClassValue = ''
export { _class as class }

export let submit: boolean = false
export let disabled = false
export let loading: boolean = false
export let block: boolean = false
export let style: 'primary' | 'secondary' | 'white' = 'primary'
export let size: 'x-small' | 'small' | 'medium' | 'large' | 'x-large' = 'medium'
</script>

<button
  type="{submit ? 'submit' : 'button'}"
  disabled="{disabled || loading}"
  data-style="{style}"
  data-size="{size}"
  data-loading="{loading}"
  style="text-shadow: 0 1px 1px rgba(0,0,0,0.1);"
  class="{cs(
    { 'w-full': block },
    'shadow-inner',
    'tracking-wider flex justify-center py-2 px-4 border border-blue-600 rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 select-none',
    'hover:outline-none hover:ring-2 hover:ring-blue-500/30 hover:border-blue-700',
    'focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-700',
    'active:ring-4',
    'disabled:opacity-50 disabled:cursor-default disabled:ring-0',
    _class,
  )}">
  <slot />
</button>
