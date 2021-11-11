<script lang="ts">
import cs from 'clsx'
export let group: any[] = []
export let checked: boolean = false
export let name: string = ''
export let value: string = ''
export let label: string = ''
export let disabled: boolean = false

function updateChekbox(group: string[]) {
  checked = group.indexOf(value) >= 0
}

function updateGroup(checked: boolean) {
  const index = group.indexOf(value)

  if (checked) {
    if (index < 0) {
      group = [...group, value]
    }
  } else {
    if (index >= 0) {
      group = [...group.slice(0, index), ...group.slice(index + 1)]
    }
  }
}

$: updateChekbox(group)
$: updateGroup(checked)
</script>

<label class="{cs('flex items-center')}" class:opacity-50="{disabled}">
  <input
    bind:checked
    disabled="{disabled}"
    name="{name}"
    value="{value}"
    type="checkbox"
    class="h-4 w-4 text-blue-600 border-gray-300 rounded peer focus:ring-blue-600/0 focus:ring-2" />
  {#if label}
    <div
      class="{cs(
        'select-none ml-2 block sm:text-sm text-gray-800',
        disabled ? 'pointer-events-none' : 'cursor-pointer',
      )}">
      {label}
    </div>
  {/if}
</label>
