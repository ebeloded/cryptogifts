<script lang="ts">
import { browser } from '$app/env'
import { user$, contract$, network$ } from '$lib/services/ethereum'
import { ConnectWalletButton, GetWalletButton } from '$components'

import { changeNetwork, getChainName, chains } from '$lib/services/ethereum'
import { CodeForm, RedeemGift } from '$components'
import { decodeGiftCode } from '$lib/services/cryptogifts'
import { hashStore } from '$lib/stores'

$: code = $hashStore

$: loading = $user$ === undefined
</script>

<div class="-mt-16 min-h-screen flex justify-center items-center">
  <div class="mx-auto w-full max-w-md">
    {#if browser}
      {#if loading}
        <div class="text-center">Loading...</div>
      {/if}
      {#if code}
        {#await decodeGiftCode(code) then gift}
          {#if $network$}
            <!-- Has wallet -->
            {#if $user$}
              <h2 class="card-title text-center">Here is your gift card!</h2>
              <!-- Authenticated -->
              {#if gift.c === $network$.chainId}
                <!-- On correct chain -->
                <RedeemGift
                  giftMeta={gift}
                  contract={$contract$}
                  user={$user$}
                />
              {:else}
                <p>
                  Your gift is on <strong>{getChainName(gift.c)}</strong>
                  , while you are on
                  <strong>{getChainName($network$.chainId)}</strong>
                </p>
                <div>
                  {#await Promise.resolve(chains.get(gift.c)) then chainInfo}
                    {#if chainInfo}
                      <button on:click={() => changeNetwork(chainInfo)}>
                        Switch to {getChainName(gift.c)}
                      </button>
                    {:else}
                      Unrecognized chain
                    {/if}
                  {/await}
                </div>
              {/if}
            {:else if $user$ === null}
              <p>To see what's inside, connect your wallet</p>
              <ConnectWalletButton />
            {/if}
          {:else if $network$ === null}
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

<slot />
