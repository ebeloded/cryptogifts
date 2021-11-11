<script lang="ts">
import FormInput from './FormInput.svelte'

import cs from 'clsx'
import { autofocus } from '$lib/actions'
import { createAnimationTriggerAction } from 'svelte-trigger-action'

let _class = ''
export { _class as class }
export let focus: boolean = false
export let value: string | number
export let type: 'text' | 'number' | 'password' | 'email' | 'url' | 'tel' =
  'text'
export let error = false
export let pattern: RegExp = /.*/
export let label = ''
export let hint = ''
export let preventInvalidInput = false
export let title: undefined | string = undefined
export let prependText: undefined | string = undefined
export let appendText: undefined | string = undefined
export let required: undefined | true = undefined
export let readonly: undefined | true = undefined
export let disabled = false
export let maxlength: undefined | number = undefined
export let minlength: undefined | number = undefined
export let spellcheck: undefined | boolean = undefined
export let autocomplete:
  | 'name'
  | 'current-password'
  | 'new-password'
  | 'email'
  | 'off' = 'off'
export let placeholder: string | undefined = undefined
export let name: string | undefined = undefined
export let id: string | undefined = undefined

$: attrs = {
  id,
  name,
  title,
  placeholder,
  type,
  spellcheck,
  minlength,
  maxlength,
  disabled,
  readonly,
  required,
  autocomplete,
}

const castValue = (v: string): number | string => (type !== 'number' ? v : +v)

const { triggerAnimation, animationAction } =
  createAnimationTriggerAction('shake')

function validateInput(key: string) {
  const isValid = pattern.test(key)
  if (!isValid) {
    triggerAnimation()
  }

  return isValid
}
</script>

<FormInput
  label="{label}"
  hint="{hint}"
  error="{error}"
  let:class="{inputClass}">
  <div class="{cs('relative')}" use:animationAction>
    {#if prependText}
      <div
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span class="text-gray-500 sm:text-sm">{prependText}</span>
      </div>
    {/if}
    <input
      use:autofocus="{focus}"
      class="{cs(inputClass, _class)}"
      value="{value}"
      on:keypress="{(e) =>
        validateInput(e.key) || (preventInvalidInput && e.preventDefault())}"
      on:input="{(e) => (value = castValue(e.currentTarget.value))}"
      {...attrs} />
    {#if appendText}
      <div
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span class="text-gray-500 sm:text-sm">{appendText}</span>
      </div>
    {/if}
  </div>
</FormInput>
