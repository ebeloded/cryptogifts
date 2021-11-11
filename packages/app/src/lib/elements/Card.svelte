<script lang="ts">
import cs from 'clsx'
import type { ClassValue } from 'clsx'
let _class: ClassValue = ''
export { _class as class }
</script>

<div class="{cs('bg-white py-8 shadow sm:rounded-lg px-10', _class)}">
  <slot />
</div>
