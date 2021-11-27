<!-- @component
Allows creating the gift
-->
<script lang="ts">
import { UserBalance } from '$components'

import { createGiftOfETH, encodeGift } from '$lib/services/cryptogifts'

import type { Cryptogifts } from '$lib/services/ethereum'
import { createEventDispatcher } from 'svelte'

export let contract: Cryptogifts
export let network: any
export let user: any

const { balance$ } = user

$: balance = $balance$

const dispatch = createEventDispatcher<{ created: any }>()

const form = {
  value: '',
  message: '',
}

const isValueValid = (value: string) => {
  return value
}

$: amountInvalid = true

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
</script>

<create-gift-form class="block bg-base-100 p-10 rounded-2xl">
  <form on:submit|preventDefault={addGift}>
    <fieldset class="space-y-6">
      <div>
        <div class="form-control">
          <label for="gift-amount" class="label">
            <span class="label-text">Gift Amount</span>
          </label>
          <input
            id="gift-amount"
            bind:value={form.value}
            type="text"
            required
            placeholder="amount"
            class="input input-lg input-bordered"
            class:input-error={amountInvalid}
          />
          <label class="label" for="gift-amount">
            <div class="label-text-alt">
              Your current balance is: <UserBalance balance={balance} />
            </div>
          </label>
        </div>
      </div>
      <div class="form-control">
        <label for="gift-message" class="label">
          <span class="label-text">Personal Message</span>
        </label>
        <textarea
          id="gift-message"
          bind:value={form.message}
          class="textarea h-24 textarea-lg textarea-bordered"
          placeholder=""
        />
      </div>
      <div>
        <button type="submit" class="btn btn-outline w-full">
          Create Gift
        </button>
      </div>
    </fieldset>
  </form>
</create-gift-form>
