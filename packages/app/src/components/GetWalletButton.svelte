<script lang="ts">
import { METAMASK_URL } from '$lib/services/ethereum'
let _class = ''
export { _class as class }
</script>

<a class={_class || 'btn'} href={METAMASK_URL} target="_blank">
  <slot>Get Metamask</slot>
</a>
