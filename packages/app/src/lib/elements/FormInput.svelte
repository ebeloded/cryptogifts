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
<div class="form-control">
  {#if label}
    <FormInputLabel>
      {label}
    </FormInputLabel>
  {/if}

  <slot
    class="{cs(
      'input w-full',
      error
        ? 'border-red-300 text-red-900 placeholder-red-300'
        : 'border-gray-300 placeholder-gray-400',
      _class,
    )}" />

  {#if hint}
    <FormInputHint error="{error}">{hint}</FormInputHint>
  {/if}
</div>
