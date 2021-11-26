<script lang="ts">
import { browser } from '$app/env'
import { user$, contract$, network$ } from '$lib/services/ethereum'
import { ConnectWalletButton, GetWalletButton } from '$components'

import {
  chains,
  changeNetwork,
  CryptoGifts,
  getChainName,
} from '$lib/services/ethereum'
import { CodeForm, RedeemGift } from '$components'
import { decodeGiftCode } from '$lib/services/cryptogifts'
import { hashStore } from '$lib/stores'

$: code = $hashStore
</script>

<div class="min-h-screen flex justify-center items-center">
  <div>
    {#if browser}
      {#if code}
        {#await decodeGiftCode(code) then gift}
          <p>You've got a gift card. How exciting!</p>
          {#if $network$}
            <!-- Has wallet -->
            {#if $user$}
              <!-- Authenticated -->
              {#if gift.c === $network$.chainId}
                <!-- On correct chain -->
                <RedeemGift
                  gift={gift}
                  contract={$contract$}
                  user={$user$}
                  network={$network$}
                />
              {:else}
                <p>
                  Your gift is on <strong>{getChainName(gift.c)}</strong>
                  , while you are on
                  <strong>{getChainName($network$.chainId)}</strong>
                </p>
                <div>
                  <button on:click={() => changeNetwork(chains.get(gift.c))}>
                    Switch to {getChainName(gift.c)}
                  </button>
                </div>
              {/if}
            {:else if $user$ === null}
              <p>To see what's inside, connect your wallet</p>
              <ConnectWalletButton />
            {/if}
          {:else}
            <p>
              To see what's inside and to redeem your gift card, you'll need a
              crypto wallet (<GetWalletButton class="link"
                >Metamask</GetWalletButton
              >). Please come back when you have the wallet installed.
            </p>
          {/if}
        {:catch}
          <p>The code isn't right</p>
        {/await}
      {:else}
        <CodeForm on:submit={({ detail }) => ($hashStore = detail)} />
      {/if}
    {/if}
  </div>
</div>
