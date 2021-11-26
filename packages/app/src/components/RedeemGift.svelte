<script lang="ts">
import { GiftCard } from '$components'
import type { CryptoGifts } from '$lib/services/ethereum'
import type { RedeemableGift } from '$lib/types'
import { BigNumber, hash, utils } from '@cryptogifts/ethereum'
import type { Observable } from 'rxjs'
import type { Signer } from 'ethers'
import { api } from '$lib/services/api'

export let gift: RedeemableGift
export let contract: CryptoGifts
export let user: { balance$: Observable<BigNumber>; signer: Signer }
export let network: any

const { balance$, signer } = user
$: console.log({ balance$: $balance$ })

async function getBalanceNecessaryToRedeem() {
  return utils.parseUnits('0.1', 'ether')
}

let requestingTransfer
async function requestTransferFee() {
  // const addr = utils.verifyMessage('', signature)
  const keyHash = hash(gift.k)
  const signature = await signer.signMessage(keyHash)
  console.log({ signature, keyHash })
  const result = await api.requestTransferFee(keyHash, signature)
}
</script>

<!-- On the right chain -->
<GiftCard gift={gift} contract={contract} />
{#if $balance$ !== void 0}
  {#await getBalanceNecessaryToRedeem() then necessaryBalance}
    {#if $balance$.gte(necessaryBalance)}
      <button class="btn">Redeem Gift</button>
    {:else}
      <p>You don't have ETH in your account to redeem the gift yet.</p>
      <p />
      <button class="btn" on:click={requestTransferFee}>
        Request Transfer Fee
      </button>
    {/if}
  {/await}
{/if}
