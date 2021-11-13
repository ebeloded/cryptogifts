<script lang="ts" context="module">
import '$lib/init'
import '$lib/styles/tailwind.css'
</script>

<script lang="ts">
import { networkStore, accountStore, userStore } from '$lib/stores'
import { ConnectWalletButton, UserInfo } from '$lib/components'
</script>

<header>
  <a href="/">Crypto Gifts</a>
  {#if $accountStore}
    <UserInfo />
  {:else if $accountStore === null}
    <ConnectWalletButton>Connect Wallet</ConnectWalletButton>
  {:else}
    Loading...
  {/if}
</header>

<slot />
