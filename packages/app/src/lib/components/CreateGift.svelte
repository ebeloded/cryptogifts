<script lang="ts">
import {
  Button,
  Card,
  Checkbox,
  FormInputLabel,
  TextInput,
} from '$lib/elements'
import { CryptoGifts, getFeeData } from '$lib/services/ethereum'
import { utils } from '@cryptogifts/ethereum'
import { nanoid } from 'nanoid'

import { onMount } from 'svelte'

export let contract: CryptoGifts
export let user: any
export let network: any
$: console.log({ contract })
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
  const { gasPrice, maxFeePerGas, maxPriorityFeePerGas } = await getFeeData()
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
const { balance$ } = user
</script>

<div class="card p-10">
  <form on:submit|preventDefault="{addGift}">
    <fieldset class="space-y-6">
      <div>
        <div class="form-control">
          <label for="gift-amount" class="label">
            <span class="label-text">Gift Amount</span>
          </label>
          <input
            id="gift-amount"
            bind:value="{form.value}"
            type="number"
            required
            placeholder="amount"
            class="input input-bordered" />
        </div>
      </div>
      <div>
        <button type="submit" class="btn w-full btn-primary">Add Gift</button>
      </div>
    </fieldset>
  </form>
</div>
<p>Network: {JSON.stringify(network, null, 2)}</p>
