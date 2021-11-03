<script lang="ts">
import { contract, provider, getBalance } from '@cryptogifts/ethereum'
import { readable } from 'svelte/store'
import AddGift from '$lib/components/AddGift.svelte'
import { onMount } from 'svelte'

const contractBalance = readable(0, (set) => {
  const p = provider()
  const setBalance = () => {
    getBalance().then((balance) => {
      set(balance.toNumber())
    })
  }
  p.on('block', setBalance)
  return () => {
    p.off('block', setBalance)
  }
})

onMount(async () => {
  console.log(await contract().gifts('key'))
})
</script>

<pre>
Contract balance: {$contractBalance}
</pre>

<hr />

<AddGift />

<hr />
