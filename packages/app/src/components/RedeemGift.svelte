<script lang="ts">
import { ConnectWalletButton, GetWalletButton } from '$components'

import {
  chains,
  changeNetwork,
  CryptoGifts,
  getChainName,
  METAMASK_URL,
} from '$lib/services/ethereum'
import type { RedeemableGift } from '$lib/types'

export let gift: RedeemableGift
export let contract: CryptoGifts
export let user: any
export let network: any
</script>

<p>You've got a gift card. How exciting!</p>
{#if network}
  {#if user}
    {#if gift.c === network.chainId}
      On the right chainId
      <br />

      Your gift is on {getChainName(gift.c)}, while you are on {getChainName(
        network.chainId,
      )}
    {:else}
      <p>
        Your gift is on <strong>{getChainName(gift.c)}</strong>
        , while you are on
        <strong>{getChainName(network.chainId)}</strong>
      </p>
      <div>
        <button on:click={() => changeNetwork(chains.get(gift.c))}>
          Switch to {getChainName(gift.c)}
        </button>
      </div>
    {/if}
  {:else if user === null}
    <p>To see what's inside, connect your wallet</p>
    <ConnectWalletButton />
  {/if}
{:else}
  <p>
    To see what's inside and to redeem your gift card, you'll need a crypto
    wallet (<GetWalletButton class="link">Metamask</GetWalletButton>). Please
    come back when you have the wallet installed.
  </p>
{/if}
<pre>
{JSON.stringify({gift, network}, null, 2)}
</pre>
