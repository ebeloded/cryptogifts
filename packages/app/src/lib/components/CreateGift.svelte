<script lang="ts">
import {
  Button,
  Card,
  Checkbox,
  FormInputLabel,
  TextInput,
} from '$lib/elements'
import { networkStore, providerStore } from '$lib/stores'
import type { CryptoGifts } from '@cryptogifts/ethereum/contracts'
import { ethers, Signer, utils } from 'ethers'
import { nanoid } from 'nanoid'

import { onMount } from 'svelte'

export let contract: CryptoGifts
export let signer: Signer

const form = {
  value: '',
  key: '',
  network: '',
}

// const giftTypes = [
//   {
//     label: 'ETH',
//     value: 'eth',
//   },
//   {
//     label: 'Fungible Tokens (ERC-20)',
//     value: 'erc20',
//   },
//   {
//     label: 'NFTs (ERC-721)',
//     value: 'erc721',
//   },
// ]

async function addGift() {
  console.log('addGift', form)
  const key = nanoid()
  const requiredGas = await contract.getRequiredGas()
  const hashHashKey = utils.keccak256(utils.keccak256(utils.toUtf8Bytes(key)))
  const giftValue = utils.parseEther(String(form.value))
  const value = giftValue.add(requiredGas)

  const { gasPrice, maxFeePerGas, maxPriorityFeePerGas } =
    await signer.getFeeData()
  console.log({
    gasPrice: utils.formatEther(gasPrice),
    maxFeePerGas: utils.formatEther(maxFeePerGas),
    maxPriorityFeePerGas: utils.formatEther(maxPriorityFeePerGas),
  })

  console.log({
    key,
    hashHashKey,
    requiredGas,
    giftValue,
    value,
  })

  contract
    .putETH(hashHashKey, giftValue, {
      value,
    })
    .then(
      (result) => {
        console.log({ result })

        result.wait(1).then(() => {
          console.log('done')
        })
      },
      (err) => {
        console.log({ err })
      },
    )
}
let balance
const getBalance = async () => {
  balance = await signer.getBalance().then(ethers.utils.formatEther)
}
onMount(() => {
  getBalance()
})

// let selectedGift = []
</script>

<Card>
  <form on:submit|preventDefault="{addGift}">
    <fieldset class="space-y-6">
      <!-- <div>
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
      </div> -->

      <div>
        <TextInput
          label="Gift Amount"
          hint="You have {balance} ETH"
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
