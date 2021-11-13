<script lang="ts">
import clsx, { ClassValue } from 'clsx'
let _class: ClassValue = ''
export { _class as class }

export let // props
  submit: boolean = false,
  disabled = false,
  loading: boolean = false,
  block: boolean = false,
  style: 'primary' | 'secondary' | 'white' = 'primary',
  size: 'x-small' | 'small' | 'medium' | 'large' | 'x-large' = 'medium',
  href: string | undefined = undefined

const getClasses = () =>
  clsx(
    { 'w-full': block },
    'shadow-inner',
    'tracking-wider inline-flex justify-center py-2 px-4 border border-blue-600 rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 select-none',
    'hover:outline-none hover:ring-2 hover:ring-blue-500/30 hover:border-blue-700',
    'focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-700',
    'active:ring-4',
    'disabled:opacity-50 disabled:cursor-default disabled:ring-0',
    _class,
  )
</script>

{#if href}
  <a href="{href}" class="{getClasses()}"><slot /></a>
{:else}
  <button
    on:click
    type="{submit ? 'submit' : 'button'}"
    disabled="{disabled || loading}"
    data-style="{style}"
    data-size="{size}"
    data-loading="{loading}"
    class="{getClasses()}">
    <slot />
  </button>
{/if}
