<!-- shows information about the gift -->
<script lang="ts">
import type { GiftStruct } from '$lib/services/ethereum'

import type { RedeemableGift } from '$lib/types'

export let gift: GiftStruct
</script>

Gift Card Start
<pre>
{JSON.stringify(gift, null, 2)}
</pre>

Gift Card End
