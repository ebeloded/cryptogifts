<!-- shows information about the gift -->
<script lang="ts">
import { GiftStruct, utils } from '$lib/services/ethereum'

export let gift: GiftStruct
$: console.log({ gift })
const STATUSES = ['None', 'Pending', 'Redeemed']
const GIFT_TYPES = ['ETH', 'ERC20', 'ERC721']
</script>

<div
  class="bg-base-100 rounded-xl border-1 border-primary relative"
  style="padding-top: 61.8%"
>
  <div class="absolute inset-4 font-mono text-sm">
    <div>Type: {GIFT_TYPES[Number(gift.giftType)]}</div>
    <div class="absolute bottom-0 left-0">
      <div>Value: {utils.formatEther(gift.giftValue)} ETH</div>
      <div>
        For Fees: {utils.formatUnits(gift.giftGas, 'gwei')} gwei
      </div>
    </div>
    <div class="absolute top-0 right-0">{STATUSES[Number(gift.status)]}</div>
  </div>
</div>
