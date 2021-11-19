<script lang="ts">
import { browser } from '$app/env'

import { privateKey } from '$lib/services/localStorage'

let value = privateKey.get()

const getAccounts = () =>
  import('@cryptogifts/ethereum/hardhat-accounts.json').then((v) => v.default)

$: if (privateKey.get() !== value) {
  value ? privateKey.set(value) : privateKey.delete()
  location.reload()
}
</script>

<div class="fixed bottom-0 inset-x-0 flex justify-center p-2">
  {#await getAccounts() then accounts}
    <select class="select select-bordered" bind:value>
      <option value={void 0}>None</option>
      {#each accounts.slice(0, 4) as account, i}
        <option value={account.private_key}>
          {i + 1} - {account.address}
        </option>
      {/each}
    </select>
  {/await}
</div>
