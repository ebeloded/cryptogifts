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
import type { Observable } from 'rxjs'
import type { Signer, Wallet } from 'ethers'
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

async function getBalanceNecessaryToRedeem() {
  // TODO: implement correct balance estimation
  return utils.parseUnits('0.1', 'ether')
}

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

async function getGift() {
  try {
    const giftInfo = await contract.get(hashHash(giftMeta.k))
    console.log({ giftInfo })
    return giftInfo
  } catch (err) {
    console.log('couldnt load gift details', err)
  }
}
</script>

<!-- On the right chain -->

{#if gift}
  <pre>gift status: {gift.status}</pre>
  <GiftCard gift={gift} />

  {#if gift.status === GiftStatus.PENDING}
    {#if $balance$ !== void 0 && $balance$ !== null}
      {#await getBalanceNecessaryToRedeem() then necessaryBalance}
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
