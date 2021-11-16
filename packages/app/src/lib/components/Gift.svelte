<script lang="ts">
import type { GiftStruct } from '@cryptogifts/ethereum'
import { utils } from '@cryptogifts/ethereum'

export let gift: GiftStruct
$: console.log({ value: utils.formatEther(gift.giftValue) })
</script>

Gift:
<pre>
{JSON.stringify(gift, null, 2)}
</pre>
