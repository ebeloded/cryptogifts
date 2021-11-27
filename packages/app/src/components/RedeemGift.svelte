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
import { getBalanceNecessaryToRedeem } from '$lib/services/cryptogifts'

import type { Observable } from 'rxjs'
import type { Wallet } from 'ethers'
import { api } from '$lib/services/api'

export let giftMeta: RedeemableGift
export let contract: Cryptogifts
export let user: {
  balance$: Observable<BigNumber | undefined | null>
  signer: Wallet
}

const { balance$, signer } = user

$: gift$ = getGift$(hashHash(giftMeta.k))
$: gift = $gift$

async function requestTransferFee() {
  const keyHash = hash(giftMeta.k)
  const signature = await signer.signMessage(keyHash)

  const result = await api.requestTransferFee({
    keyHash,
    signature,
    chainId: giftMeta.c,
  })

  console.log({ result })
}

async function redeemGift() {
  console.log('redeem gift')
  await contract.redeemGift(giftMeta.k).catch((err) => {
    console.log({ err })
  })
}
</script>

<!-- On the right chain -->

{#if gift}
  <pre>gift status: {gift.status}</pre>
  <GiftCard gift={gift} />

  {#if gift.status === GiftStatus.PENDING}
    {#if $balance$ !== void 0 && $balance$ !== null}
      {#await getBalanceNecessaryToRedeem(contract) then necessaryBalance}
        {#if $balance$.gte(necessaryBalance)}
          <button class="btn" on:click={redeemGift}>Redeem Gift</button>
        {:else}
          <p>You don't have ETH in your account to redeem the gift yet.</p>
          <p />
          <button class="btn" on:click={requestTransferFee}>
            Request Transfer Fee
          </button>
        {/if}
      {/await}
    {/if}
  {:else if gift.status === GiftStatus.REDEEMED}
    <p>This gift has been redeemed.</p>
  {:else if gift.status === GiftStatus.REVOKED}
    <p>This gift has been revoked.</p>
  {/if}
{/if}
