<script lang="ts">
import { Button, Card, TextInput } from '$lib/elements'

import { contract } from '@cryptogifts/ethereum'

const form = {
  value: '',
  key: '',
  network: '',
}
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
</script>

<Card>
  <form on:submit|preventDefault="{addGift}">
    <fieldset class="space-y-6">
      <div>
        <TextInput
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
<p>Network: Ethereum Mainnet</p>
