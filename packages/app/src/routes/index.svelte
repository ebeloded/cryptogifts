<script lang="ts">
import { contract, getBalance } from '@cryptogifts/ethereum'
console.log(contract())

let balance: any = 0

let depositValue = 0

function deposit() {
  contract(true).deposit({
    value: depositValue,
  })
}
</script>

Owner:
{#await contract().owner() then owner}
  {owner}
{/await}

<pre>
  balance: {balance}

</pre>

<button
  on:click="{() => {
    getBalance().then((v) => (balance = v))
  }}">
  GetBalance
</button>

<input type="number" bind:value="{depositValue}" />

<button on:click="{deposit}">Deposit</button>
