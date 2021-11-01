<script lang="ts">
import { onMount } from 'svelte'

let balance: any = 0
onMount(() => {
  import('@cryptogifts/ethereum')
    .then(({ getBalance }) => getBalance())
    .then((v) => (balance = v))
})
</script>

{balance}
