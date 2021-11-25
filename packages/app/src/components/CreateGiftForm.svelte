<!-- @component
Allows creating the gift
-->
<script lang="ts">
import { createGiftOfETH, encodeGift } from '$lib/services/cryptogifts'

import type { CryptoGifts } from '$lib/services/ethereum'
import { createEventDispatcher } from 'svelte'

export let contract: CryptoGifts
export let user: any
export let network: any

const dispatch = createEventDispatcher<{ created: any }>()

const form = {
  value: '',
  message: '',
}

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

<create-gift-form class="block">
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
          />
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
        <button type="submit" class="btn w-full btn-primary">
          Create Gift
        </button>
      </div>
    </fieldset>
  </form>
</create-gift-form>
