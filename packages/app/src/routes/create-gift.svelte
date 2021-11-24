<script lang="ts" context="module">
import type { Load } from '@sveltejs/kit'

const wait = (t: number) => new Promise((resolve) => setTimeout(resolve, t))

export const load: Load = async () => {
  await wait(3000)
  return {}
}
</script>

<script lang="ts">
import { CreateGift, ConnectWalletButton, GiftCode } from '$lib/components'
import { user$, contract$, network$ } from '$lib/services/ethereum'
import { scale } from 'svelte/transition'

let encodedGift: string

function handleGift(gift: string) {
  encodedGift = gift
}
</script>

<slot />

<div class="h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 class="mt-6 text-center text-5xl font-bold">Create Gift</h2>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    {#if $user$}
      {#if encodedGift}
        <GiftCode code={encodedGift} />
      {:else}
        <div in:scale={{ start: 0.9 }}>
          <CreateGift
            contract={$contract$}
            user={$user$}
            network={$network$}
            on:created={({ detail }) => handleGift(detail)}
          />
        </div>
      {/if}
    {:else if $user$ === null}
      <ConnectWalletButton />
    {:else}
      Loading...
    {/if}
  </div>
</div>
