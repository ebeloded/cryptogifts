<script lang="ts" context="module">
import '$lib/init'
import '$lib/styles/tailwind.css'
</script>

<script lang="ts">
import { networkStore, accountStore, userStore } from '$lib/stores'
import ConnectWalletButton from '$lib/components/ConnectWalletButton.svelte'
</script>

<header>
  <a href="/">Crypto Gifts</a>
  {#if $accountStore}
    {$accountStore}
  {:else}
    <ConnectWalletButton>Connect Wallet</ConnectWalletButton>
  {/if}
</header>

<slot />
