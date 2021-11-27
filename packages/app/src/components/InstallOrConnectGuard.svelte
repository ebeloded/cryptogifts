<script lang="ts">
import { ConnectWalletButton, UserMenu, GetWalletButton } from '.'
import { user$, address$, network$ } from '$lib/services/ethereum'
</script>

{#if $network$}
  {#if $address$}
    <slot />
  {:else if $address$ === null}
    <ConnectWalletButton />
  {:else}
    Loading...
  {/if}
{:else if $network$ === null}
  <GetWalletButton />
{/if}
