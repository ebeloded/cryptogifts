<script lang="ts">
import { ConnectWalletButton, UserInfo } from '.'
import { networkStore, accountStore, userStore } from '$lib/stores'
// Only import what you need!
import { GiftIcon } from 'svelte-feather-icons'
</script>

<header class="navbar">
  <div class="flex-none px-2 mx-2">
    <a href="/" class="text-lg font-bold">🎁 Crypto Gifts</a>
  </div>
  <div class="flex-1 px-2 mx-2">
    <div class="items-stretch hidden lg:flex">
      <a class="btn btn-ghost btn-sm rounded-btn">Home</a>
      <a class="btn btn-ghost btn-sm rounded-btn">Portfolio</a>
      <a class="btn btn-ghost btn-sm rounded-btn">About</a>
      <a class="btn btn-ghost btn-sm rounded-btn">Contact</a>
    </div>
  </div>
  <div class="flex-none">
    {#if $accountStore}
      <UserInfo />
    {:else if $accountStore === null}
      <ConnectWalletButton>Connect Wallet</ConnectWalletButton>
    {:else}
      Loading...
    {/if}
    <button class="btn btn-square btn-ghost text-gray-500">
      <GiftIcon class="w-6 h-6 stroke-current" />
    </button>
  </div>
</header>
