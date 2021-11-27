<!--
  1. show create gift form
  2. when gift is created


-->
<script lang="ts">
import {
  CreateGiftForm,
  InstallOrConnectGuard,
  SendGiftForm,
} from '$components'
import { scale } from 'svelte/transition'
import { contract$, network$, user$ } from '$lib/services/ethereum'

$: loading = $user$ === undefined

let createdGift: any = null
function onGiftCreated(giftDetails: any) {
  createdGift = giftDetails
}
</script>

<div
  class="-mt-16 min-h-screen flex justify-center items-center py-12 px-6 lg:px-8"
>
  {#if loading}
    Loading...
  {:else}
    <InstallOrConnectGuard>
      {#if $contract$}
        <div class="mx-auto w-full max-w-md" in:scale={{ start: 0.9 }}>
          <div
            class="block bg-base-100 p-10 rounded-2xl relative overflow-hidden shadow-2xl"
          >
            {#if createdGift}
              <SendGiftForm
                key={createdGift.key}
                chainId={createdGift.chainId}
              />
            {:else}
              <CreateGiftForm
                contract={$contract$}
                network={$network$}
                user={$user$}
                on:created={({ detail }) => onGiftCreated(detail)}
              />
            {/if}
          </div>
        </div>
      {/if}
    </InstallOrConnectGuard>
  {/if}
</div>
<slot />
