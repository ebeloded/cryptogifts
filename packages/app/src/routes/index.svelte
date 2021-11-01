<script lang="ts">
import { onMount } from 'svelte'

let balance: any = 0
let key = 'unique-key'
let amount: number = 0

function updateBalance() {
  import('@cryptogifts/ethereum')
    .then(({ getBalance }) => getBalance())
    .then((v) => (balance = v))
}

async function stash() {
  const { contract } = await import('@cryptogifts/ethereum')
  try {
    await contract(true).stashETH(key, amount, { value: amount })
  } catch (e) {
    console.log(e.error)
  }
}

async function get() {
  const { contract } = await import('@cryptogifts/ethereum')

  const stashed = await contract().get(key)
  console.log({ stashed: stashed.toNumber() })
}

onMount(() => {
  updateBalance()
})
</script>

Balance: {balance}

<input placeholder="key" type="text" bind:value="{key}" />
<input type="number" bind:value="{amount}" />
<button on:click="{stash}">Stash</button>

<hr />

<button on:click="{get}">Get</button>
