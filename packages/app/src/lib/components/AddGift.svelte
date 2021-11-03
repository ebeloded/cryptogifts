<script lang="ts">
import { contract } from '@cryptogifts/ethereum'

let amount = 0
let value = 0
let key = 'key'

function addGift() {
  contract(true)
    .putETH(key, amount, {
      value,
    })
    .catch((error) => {
      console.log({ error })
    })
    .then((result) => {
      console.log({ result })
    })
}
</script>

<form on:submit|preventDefault="{addGift}">
  Key: <input bind:value="{key}" />
  <br />

  Value:
  <input type="number" bind:value />
  <br />
  Gift Amount:
  <input type="number" bind:value="{amount}" />
  <br />

  <button type="submit">Add Gift</button>
</form>
