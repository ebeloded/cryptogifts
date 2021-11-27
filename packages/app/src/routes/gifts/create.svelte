<!--
  1. show create gift form
  2. when gift is created


-->
<script lang="ts">
import { CreateGiftForm, ConnectWalletButton } from '$components'
import { scale } from 'svelte/transition'
import { user$, contract$, network$ } from '$lib/services/ethereum'
import { goto } from '$app/navigation'
</script>

<div class="-mt-16 min-h-screen flex justify-center items-center">
  <div>
    {#if $user$}
      <div in:scale={{ start: 0.9 }}>
        <CreateGiftForm
          contract={$contract$}
          network={$network$}
          on:created={({ detail: code }) => goto(`/gifts/${code}`)}
        />
      </div>
    {:else if $user$ === null}
      <ConnectWalletButton />
    {:else}
      Loading...
    {/if}
  </div>
</div>
<slot />
