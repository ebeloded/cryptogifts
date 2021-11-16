<script lang="ts">
import { CreateGift, ConnectWalletButton } from '$lib/components'
import { user$, contract$, network$ } from '$lib/services/ethereum'
import { scale } from 'svelte/transition'
</script>

<slot />

<div class="h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 class="mt-6 text-center text-5xl font-bold">Create Gift</h2>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    {#if $user$}
      <div in:scale="{{ start: 0.9 }}">
        <CreateGift
          contract="{$contract$}"
          user="{$user$}"
          network="{$network$}" />
      </div>
    {:else if $user$ === null}
      <ConnectWalletButton />
    {:else}
      Loading...
    {/if}
  </div>
</div>
