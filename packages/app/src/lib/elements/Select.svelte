<script lang="ts">
import cs from 'clsx'
import { prop } from 'ramda'
import FormInput from './FormInput.svelte'
let _class = ''
export { _class as class }

export let itemValue: (option: any) => string = prop('value')
export let itemText: (option: any) => string = prop('text')
export let label: string = ''
export let hint: string = ''
export let placeholder: string = ''
export let name: string = ''
export let value: string | undefined = undefined

export let options: Array<any>

// TODO: implement grouping with <optgroup> element
</script>

<FormInput label="{label}" hint="{hint}" let:class="{inputClass}">
  <select
    bind:value
    placeholder="{placeholder}"
    name="{name}"
    required
    class="{cs(inputClass, _class)}">
    {#each options as option}
      <option value="{itemValue(option)}">
        <slot name="item">
          {itemText(option)}
        </slot>
      </option>
    {/each}
  </select>
</FormInput>
