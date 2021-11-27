<!-- @component
Allows creating the gift
-->
<script lang="ts">
import { UserBalance } from '$components'
import c from 'clsx'

import {
  createGiftOfETH,
  createGiftOfEthObservable,
  encodeGift,
  getExtraFeeValue,
} from '$lib/services/cryptogifts'

import { Cryptogifts, getChainName, utils } from '$lib/services/ethereum'
import { BigNumber, chains } from '@cryptogifts/ethereum'
import { Observable, tap } from 'rxjs'
import { createEventDispatcher, onMount } from 'svelte'
import { fade } from 'svelte/transition'

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
  try {
    return balance.gt(utils.parseEther(value).add(extraFeeValue))
  } catch {
    return false
  }
}

$: amountValid = form.value ? isValueValid(form.value) : true

let giftCreation$: null | Observable<any> = null

function addGift() {
  giftCreation$ = createGiftOfEthObservable(
    contract,
    network.chainId,
    utils.parseEther(String(form.value)),
  ).pipe(
    tap({
      next(giftCreation) {
        console.log({ giftCreation })
        if (giftCreation.contractReceipt) {
          dispatch('created', giftCreation)
        }
      },
      complete() {
        console.log('done')
      },
    }),
  )
}
</script>

<div>
  <h2 class="card-title text-center">Create Gift</h2>
  <form on:submit|preventDefault={addGift}>
    <fieldset class="space-y-6">
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
          type="text"
          required
          placeholder="in ETH"
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
            The transfer value will include this extra fee to allow gift
            transfer the gift to the recipient
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={!form.value || !amountValid}
          class="btn btn-outline w-full"
        >
          Submit
        </button>
      </div>
    </fieldset>
  </form>
  {#if giftCreation$}
    <div
      in:fade
      class="absolute inset-0 flex flex-col bg-base-100/70 backdrop-blur-sm items-center justify-center"
    >
      <span class="animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="52"
          height="52"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-gift"
        >
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      </span>
      <div>
        <div class="mt-10">
          <ul class="text-center space-y-4">
            <li
              class={c({
                'opacity-50': $giftCreation$.step < 1,
                'text-success': $giftCreation$.step >= 1,
              })}
            >
              Generating gift code
            </li>
            <li
              class={c({
                'opacity-50': $giftCreation$.step < 2,
                'text-success': $giftCreation$.step >= 3,
              })}
            >
              Sending value to the contract
            </li>
            <li
              class={c({
                'opacity-50': $giftCreation$.step < 3,
                'text-success': $giftCreation$.step >= 4,
              })}
            >
              Awaiting first confirmation
            </li>
          </ul>
        </div>
      </div>
    </div>
  {/if}
</div>
