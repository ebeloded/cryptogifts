<script lang="ts" context="module">
import '$lib/init'
import '$lib/styles/tailwind.css'
</script>

<script lang="ts">
// import { Navbar } from '$lib/components'
import { connectEthereum } from '@cryptogifts/ethereum'
const ethereum = connectEthereum()
const { network$, account$ } = ethereum
console.log({ ethereum })
</script>

<!-- <Navbar /> -->
<pre>

  network: {JSON.stringify($network$, null, 2)}
  account: {JSON.stringify($account$, null, 2)}
</pre>
<slot />
