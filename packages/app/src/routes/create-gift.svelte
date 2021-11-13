<script lang="ts">
import { accountStore, userStore } from '$lib/stores'
import { CreateGift, ConnectWalletButton } from '$lib/components'
import { scale } from 'svelte/transition'
</script>

<slot />

<div class="h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Create Gift
    </h2>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    {#if $userStore}
      <div in:scale="{{ start: 0.9 }}">
        <CreateGift
          contract="{$userStore.contract}"
          signer="{$userStore.signer}" />
      </div>
    {:else if $accountStore === null}
      <ConnectWalletButton />
    {:else}
      Loading...
    {/if}
  </div>
</div>
