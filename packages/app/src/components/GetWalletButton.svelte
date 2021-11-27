<script lang="ts">
import { METAMASK_URL } from '$lib/services/ethereum'
let _class = ''
export { _class as class }
</script>

<a class={_class || 'btn btn-ghost'} href={METAMASK_URL} target="_blank">
  <slot>Install Metamask</slot>
</a>
