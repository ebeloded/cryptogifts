<!--
  1. show create gift form
  2. when gift is created


-->
<script lang="ts">
import { CreateGiftForm, InstallOrConnectGuard } from '$components'
import { scale } from 'svelte/transition'
import { contract$, network$, user$ } from '$lib/services/ethereum'
import { goto } from '$app/navigation'
$: loading = $user$ === undefined
</script>

<div
  class="-mt-16 min-h-screen flex justify-center items-center py-12 px-6 lg:px-8"
>
  {#if loading}
    Loading...
  {:else}
    <InstallOrConnectGuard>
      <div class="mx-auto w-full max-w-md" in:scale={{ start: 0.9 }}>
        <CreateGiftForm
          contract={$contract$}
          network={$network$}
          user={$user$}
          on:created={({ detail }) => goto(`/gifts/${detail}`)}
        />
      </div>
    </InstallOrConnectGuard>
  {/if}
</div>
<slot />
