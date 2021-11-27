<!-- @component
Allows creating the gift
-->
<script lang="ts">
import { UserBalance } from '$components'

import {
  createGiftOfETH,
  encodeGift,
  getExtraFeeValue,
} from '$lib/services/cryptogifts'

import { Cryptogifts, getChainName, utils } from '$lib/services/ethereum'
import { BigNumber, chains } from '@cryptogifts/ethereum'
import { createEventDispatcher, onMount } from 'svelte'

export let contract: Cryptogifts
export let network: any
export let user: any

const { balance$ } = user

let extraFeeValue = BigNumber.from(0)

onMount(async () => {
  extraFeeValue = await getExtraFeeValue(contract)
})

$: balance = $balance$

const dispatch = createEventDispatcher<{ created: any }>()

const form = {
  value: '',
  message: '',
}

const isValueValid = (value: string) => {
  return balance.gt(utils.parseEther(value).add(extraFeeValue))
}

$: amountValid = form.value ? isValueValid(String(form.value)) : true

async function addGift() {
  try {
    const gift = await createGiftOfETH(
      contract,
      network.chainId,
      form.message,
      form.value,
    )
    const giftCode = await encodeGift(gift)

    dispatch('created', giftCode)
  } catch (error) {
    console.log({ error })
  }
}

// $: selectedChain = network.chainId

// console.log({ chains })
</script>

<create-gift-form class="block bg-base-100 p-10 rounded-2xl">
  <form on:submit|preventDefault={addGift}>
    <fieldset class="space-y-6">
      <!-- <div class="form-control">
        <label for="network-select" class="label">
          <span class="label-text">Network</span>
        </label>
        <select id="network-select" class="select select-bordered">
          <option value="">Rinkeby</option>
        </select>
      </div> -->
      <div class="form-control">
        <label for="gift-amount" class="label">
          <span class="label-text">Asset Type</span>
        </label>

        <div class="tabs tabs-boxed">
          <button class="btn-sm tab tab-active no-animation px-5">ETH</button>
          <div data-tip="Not supported yet " class="tooltip tooltip-bottom">
            <button class="btn-sm tab px-5 no-animation" disabled>
              ERC-20
            </button>
          </div>
          <div data-tip="Not supported yet" class="tooltip  tooltip-bottom">
            <button class="btn-sm tab px-5 no-animation" disabled>
              ERC-721
            </button>
          </div>
        </div>
      </div>
      <div class="form-control">
        <label for="gift-amount" class="label">
          <span class="label-text">Gift Amount</span>
        </label>
        <input
          id="gift-amount"
          bind:value={form.value}
          type="number"
          required
          placeholder="in ether"
          class="input input-bordered"
          class:input-error={!amountValid}
        />
        <label class="label" for="gift-amount">
          <div class="label-text-alt">
            Your current balance on {getChainName(network.chainId)} is:
            <UserBalance balance={balance} />
          </div>
        </label>
      </div>

      <div class="form-control">
        <div for="gift-amount" class="label">
          <span class="label-text">
            Extra gas fee:
            {#if extraFeeValue}
              <UserBalance balance={extraFeeValue} />
            {/if}
          </span>
        </div>
        <div class="label">
          <div class="label-text-alt">
            The total transfer value will include this extra fee required to
            allow the gift transfer the gift to the recipient
          </div>
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={!form.value || !amountValid}
          class="btn btn-outline w-full"
        >
          Create Gift Card
        </button>
      </div>
    </fieldset>
  </form>
</create-gift-form>
