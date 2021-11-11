<script lang="ts">
import cs from 'clsx'
let _class = ''
export { _class as class }
import FormInputLabel from './FormInputLabel.svelte'
import FormInputHint from './FormInputHint.svelte'

export let label: string = ''
export let hint: string = ''
export let error = false
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label>
  {#if label}
    <FormInputLabel>
      {label}
    </FormInputLabel>
  {/if}

  <slot
    class="{cs(
      'block w-full px-3 py-2 border rounded-lg shadow-sm sm:text-sm',
      'focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500',
      'disabled:opacity-50 disabled:cursor-default',
      error
        ? 'border-red-300 text-red-900 placeholder-red-300'
        : 'border-gray-300 placeholder-gray-400',
      _class,
    )}" />

  {#if hint}
    <FormInputHint error="{error}">{hint}</FormInputHint>
  {/if}
</label>
