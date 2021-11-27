<script lang="ts">
import { GiftCard } from '$components'
import { Cryptogifts, getGift$ } from '$lib/services/ethereum'
import type { RedeemableGift } from '$lib/types'
import {
  BigNumber,
  hashHash,
  hash,
  utils,
  GiftStatus,
} from '@cryptogifts/ethereum'
import { fade } from 'svelte/transition'
import {
  getBalanceNecessaryToRedeem,
  redeemGift,
} from '$lib/services/cryptogifts'

import type { Wallet } from 'ethers'
import { api } from '$lib/services/api'
import type { Observable } from 'rxjs'

export let giftMeta: RedeemableGift
export let contract: Cryptogifts
export let user: {
  balance$: Observable<BigNumber | undefined | null>
  signer: Wallet
}

const { balance$, signer } = user

$: gift$ = getGift$(hashHash(giftMeta.k))
$: gift = $gift$

let requestingTransferFee = false

async function requestTransferFee() {
  requestingTransferFee = true
  const keyHash = hash(giftMeta.k)
  const signature = await signer.signMessage(keyHash)

  const result = await api.requestTransferFee({
    keyHash,
    signature,
    chainId: giftMeta.c,
  })
  requestingTransferFee = false
}

let redeeming = false
$: if (redeeming && $gift$?.status === GiftStatus.REDEEMED) {
  redeeming = false
}
async function triggerRedeemGift() {
  redeeming = true
  await redeemGift(contract, giftMeta.k)
}
</script>

<!-- On the right chain -->

{#if gift}
  <div class="space-y-6">
    <div class="px-10">
      <GiftCard gift={gift}>
        {#if redeeming || requestingTransferFee}
          <div
            in:fade
            class="absolute inset-0 flex flex-col bg-base-100/70 backdrop-blur-sm items-center justify-center"
          >
            Processing request...
          </div>
        {/if}
      </GiftCard>
    </div>
    <div class="text-center">
      {#if gift.status === GiftStatus.PENDING && !requestingTransferFee && !redeeming}
        {#if $balance$ !== void 0 && $balance$ !== null}
          {#await getBalanceNecessaryToRedeem(contract) then necessaryBalance}
            {#if $balance$.gte(necessaryBalance)}
              <button class="btn" on:click={triggerRedeemGift}>
                Redeem Gift
              </button>
            {:else}
              <p class="my-4">
                You don't have ETH in your wallet to redeem the gift yet.
              </p>
              <button class="btn" on:click={requestTransferFee}>
                Request Transfer Fee
              </button>
            {/if}
          {/await}
        {/if}
      {:else if gift.status === GiftStatus.REDEEMED}
        <p>This gift has been redeemed</p>
      {/if}
    </div>
  </div>
{/if}
