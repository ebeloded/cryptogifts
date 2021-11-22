<!-- @component
1. Enter redeem code, validate, "Show Inside"
2. Connect a wallet
3. Sign a message
-->
<script lang="ts" context="module">
</script>

<script lang="ts">
import { browser } from '$app/env'
import { contract$, network$, user$ } from '$lib/services/ethereum'

import { GetGiftFromCode, RedeemGift } from '$lib/components'

let gift: any = null

function processGift(g: any) {
  gift = g
}
</script>

<div class="h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 class="mt-6 text-center text-5xl font-bold">Redeem Gift</h2>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    {#if gift}
      <RedeemGift
        gift={gift}
        contract={$contract$}
        network={$network$}
        user={$user$}
      />
    {:else}
      <GetGiftFromCode on:submit={(e) => processGift(e.detail)} />
    {/if}
  </div>
</div>
<slot />
