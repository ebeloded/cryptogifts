<script lang="ts">
import { ConnectWalletButton, UserInfo } from '.'
import { user$, address$ } from '$lib/services/ethereum'
</script>

<div class="h-16">
  <header class="navbar fixed inset-x-0 top-0 h-16">
    <div class="flex-none px-2 mx-2">
      <a href="/" class="text-lg font-bold">🎁 Crypto Gifts</a>
    </div>
    <div class="flex-1 px-2 mx-2">
      <div class="items-stretch hidden lg:flex">
        <a href="/" class="btn btn-ghost btn-sm rounded-btn">Home</a>
        <a href="/" class="btn btn-ghost btn-sm rounded-btn">Portfolio</a>
        <a href="/" class="btn btn-ghost btn-sm rounded-btn">About</a>
        <a href="/" class="btn btn-ghost btn-sm rounded-btn">Contact</a>
      </div>
    </div>
    <div class="flex-none">
      {#if $address$}
        {#if $user$}
          <UserInfo user={$user$} />
        {/if}
      {:else if $address$ === null}
        <ConnectWalletButton>Connect Wallet</ConnectWalletButton>
      {:else}
        Loading...
      {/if}
    </div>
  </header>
</div>
