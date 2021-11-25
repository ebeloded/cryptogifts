<script lang="ts">
import { browser } from '$app/env'
import { user$, contract$, network$ } from '$lib/services/ethereum'
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
          <RedeemGift
            gift={gift}
            contract={$contract$}
            user={$user$}
            network={$network$}
          />
        {:catch}
          <p>The code isn't right</p>
        {/await}
      {:else}
        <CodeForm on:submit={({ detail }) => ($hashStore = detail)} />
      {/if}
    {/if}
  </div>
</div>
