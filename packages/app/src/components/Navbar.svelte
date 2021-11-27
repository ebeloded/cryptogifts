<script lang="ts">
import { ConnectWalletButton, UserInfo, GetWalletButton } from '.'
import { user$, address$, network$ } from '$lib/services/ethereum'
</script>

<header class="sticky navbar inset-x-0 top-0 h-16">
  <div class="flex-none px-2 mx-2">
    <a
      href="/"
      class="text-2xl font-bold tracking-wider "
      style="font-family:'Mountains of Christmas', cursive;"
    >
      🎁 Cryptogifts
    </a>
  </div>
  <div class="flex-1 px-2 mx-2">
    <div class="items-stretch hidden lg:flex">
      <a href="/#how-it-works" class="btn btn-ghost btn-sm rounded-btn">
        How It Works
      </a>
      <a href="/#features" class="btn btn-ghost btn-sm rounded-btn">Features</a>
      <a href="/#features" class="btn btn-ghost btn-sm rounded-btn">FAQ</a>
      <a href="/#source-code" class="btn btn-ghost btn-sm rounded-btn">
        Source Code
      </a>
    </div>
  </div>
  <div class="flex-none">
    {#if $network$}
      {#if $address$}
        {#if $user$}
          <UserInfo user={$user$} />
        {/if}
      {:else if $address$ === null}
        <ConnectWalletButton>Connect Wallet</ConnectWalletButton>
      {:else}
        Loading...
      {/if}
    {:else if $network$ === null}
      <GetWalletButton>Install Metamask</GetWalletButton>
    {/if}
  </div>
</header>
