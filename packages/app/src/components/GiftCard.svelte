<!-- shows information about the gift -->
<script lang="ts">
import {
  formatAddress,
  GiftStruct,
  utils,
  lookupAddress,
} from '$lib/services/ethereum'
import { GiftStatus } from '@cryptogifts/ethereum'

export let gift: GiftStruct

const STATUSES = ['None', 'Pending', 'Redeemed']
const GIFT_TYPES = ['ETH', 'ERC20', 'ERC721']
</script>

<gift-card
  class="block bg-base-100 rounded-xl ring-1 ring-accent/20 relative shadow-lg overflow-hidden"
  style="padding-top: 61.8%;"
>
  <img
    alt="eth"
    src="/eth-diamond-rainbow.png"
    class="absolute -right-5 -bottom-5 opacity-50"
    width="100"
  />
  <div class="absolute inset-4 font-mono text-sm">
    <div class="text-primary">Type: {GIFT_TYPES[Number(gift.giftType)]}</div>
    <div class="absolute bottom-0 left-0">
      <div>
        From:
        {#await lookupAddress(gift.sender) then senderName}
          {senderName || formatAddress(gift.sender)}
        {/await}
      </div>
      <div class="text-info">
        Value: {utils.formatEther(gift.giftValue)} ETH
      </div>
      <div class="text-warning">
        For Fees: {utils.formatUnits(gift.giftGas, 'gwei')} gwei
      </div>
    </div>
    <div class="absolute top-0 right-0 text-right">
      <div>
        {STATUSES[Number(gift.status)]}
      </div>

      {#if gift.status === GiftStatus.REDEEMED}
        <div class="text-right">
          {#await lookupAddress(gift.redeemer) then redeemerName}
            {redeemerName || formatAddress(gift.redeemer)}
          {/await}
        </div>
      {/if}
    </div>
  </div>

  <slot />
</gift-card>
