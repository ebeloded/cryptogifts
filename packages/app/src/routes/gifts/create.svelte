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
import { Network } from '$lib/types'
import { encodeGift } from '$lib/services/cryptogifts'

$: loading = $user$ === undefined
let giftCode: string = ''
async function onGiftCreated({ key, chainId }: any) {
  giftCode = await encodeGift({
    m: '',
    k: key,
    c: chainId,
    n: Network.ethereum,
  })
}
</script>

<div
  class="-mt-16 min-h-screen flex justify-center items-center py-12 px-6 lg:px-8"
>
  {#if loading}
    Loading...
  {:else}
    <InstallOrConnectGuard>
      {#if $user$ && $contract$}
        <div class="mx-auto w-full max-w-md" in:scale={{ start: 0.9 }}>
          <div
            class="block bg-base-100 p-10 rounded-2xl relative overflow-hidden shadow-2xl"
          >
            {#if giftCode}
              <SendGiftForm giftCode={giftCode} />
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
