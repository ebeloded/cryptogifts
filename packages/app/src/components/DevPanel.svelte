<script lang="ts">
import { browser } from '$app/env'

import { privateKey } from '$lib/services/localStorage'

let value = privateKey.get()

const getAccounts = () =>
  import('@cryptogifts/ethereum/hardhat-accounts.json').then((v) => [
    ...v.default.slice(0, 5),
    {
      private_key:
        '0142b61bb71c9442ddf0f4ef185bcafdbe62467d5c58bf5dfcd36b46b9ee84c7',
      address: '0x6928916Bf1d314f402afcbe7323388f773D5bB10',
    },
  ])

$: if (privateKey.get() !== value) {
  value ? privateKey.set(value) : privateKey.delete()
  location.reload()
}
</script>

<div class="fixed bottom-0 inset-x-0 flex justify-center p-2">
  {#await getAccounts() then accounts}
    <select class="select-bordered" bind:value>
      <option value={void 0}>None</option>
      {#each accounts as account, i}
        <option value={account.private_key}>
          {i + 1} - {account.address}
        </option>
      {/each}
    </select>
  {/await}
</div>
