<script lang="ts">
import {
  Button,
  Card,
  Checkbox,
  FormInputLabel,
  TextInput,
} from '$lib/elements'
import { networkStore } from '$lib/stores'

import { contract } from '@cryptogifts/ethereum'
import ConnectWalletButton from './ConnectWalletButton.svelte'

const form = {
  value: '',
  key: '',
  network: '',
}

const giftTypes = [
  {
    label: 'ETH',
    value: 'eth',
  },
  {
    label: 'Fungible Tokens (ERC-20)',
    value: 'erc20',
  },
  {
    label: 'NFTs (ERC-721)',
    value: 'erc721',
  },
]

function addGift() {
  console.log('addGift')
  // contract(true)
  //   .putETH(key, amount, {
  //     value,
  //   })
  //   .catch((error) => {
  //     console.log({ error })
  //   })
  //   .then((result) => {
  //     console.log({ result })
  //   })
}

let selectedGift = []
</script>

<Card>
  <form on:submit|preventDefault="{addGift}">
    <fieldset class="space-y-6">
      <div>
        <FormInputLabel>Select Gift Type:</FormInputLabel>
        <ul class="grid gap-2 my-2">
          {#each giftTypes as giftType}
            <li>
              <Checkbox
                bind:group="{selectedGift}"
                disabled="{giftType.value !== 'eth'}"
                label="{giftType.label}"
                value="{giftType.value}"
                name="giftTypes" />
            </li>
          {/each}
        </ul>
      </div>

      <div>
        <TextInput
          label="Gift Amount"
          hint="Hello"
          bind:value="{form.value}"
          type="number"
          placeholder="Gift Amount"
          required />
      </div>
      <div>
        <Button submit block>Add Gift</Button>
      </div>
    </fieldset>
  </form>
</Card>
<p>Network: {JSON.stringify($networkStore, null, 2)}</p>
