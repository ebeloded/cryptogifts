<!-- @component

  CreateGift component allows creating gift cards. The user chooses gift type (ETH, ERC20, ERC721), gift amount, and message.

-->
<script lang="ts">
import type { CryptoGifts } from '$lib/services/ethereum'
import { nanoid } from 'nanoid'

export let contract: CryptoGifts
export let user: any
export let network: any

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

async function addGift() {
  try {
  } catch (error) {}
}
const { balance$ } = user
</script>

<div class="card shadow-lg compact side bg-base-200 p-10">
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
            type="number"
            required
            placeholder="amount"
            class="input input-lg "
          />
        </div>
        <div>{$balance$}</div>
      </div>
      <div class="form-control">
        <label for="gift-message" class="label">
          <span class="label-text">Personal Message</span>
        </label>
        <textarea
          id="gift-message"
          class="textarea h-24 textarea-lg "
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
  {JSON.stringify(network, null, 2)}
</div>
