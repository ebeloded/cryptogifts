<!-- shows information about the gift -->
<script lang="ts">
import type { RedeemableGift } from '$lib/types'

export let gift: RedeemableGift
// $: console.log({ value: utils.formatEther(gift.giftValue) })
</script>

Gift:
<pre>
{JSON.stringify(gift, null, 2)}
</pre>
