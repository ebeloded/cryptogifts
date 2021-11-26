<!-- shows information about the gift -->
<script lang="ts">
import type { CryptoGifts } from '$lib/services/ethereum'
import type { RedeemableGift } from '$lib/types'
import { hashHash } from '@cryptogifts/ethereum'

export let gift: RedeemableGift
export let contract: CryptoGifts

async function getGift() {
  try {
    const giftInfo = await contract.get(hashHash(gift.k))
    console.log({ giftInfo })
    return giftInfo
  } catch (err) {
    console.log('couldnt load gift details', err)
  }
}
</script>

Gift Card Start
<pre>
{JSON.stringify(gift, null, 2)}
</pre>

{#await getGift()}
  loading...
{:then giftInfo}
  <pre>{JSON.stringify(giftInfo, null, 2)}</pre>
{/await}

Gift Card End
