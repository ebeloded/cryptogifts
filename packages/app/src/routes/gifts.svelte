<script lang="ts">
import { contract$, user$ } from '$lib/services/ethereum'
import { Gift } from '$lib/components'

$: console.log({ contract: $contract$ })
$: console.log({ user: $user$ })
</script>

{#if $contract$}
  {#await $contract$.getMyGifts()}
    <!-- $contract$. is pending -->
    loading
  {:then gifts}
    <!-- $contract$. was fulfilled -->
    {#each gifts as gift}
      <Gift gift="{gift}" />
    {/each}
  {:catch error}
    <pre>{JSON.stringify(error, null, 2)}</pre>
    <!-- $contract$. was rejected -->
  {/await}
{/if}
List my gifts - available only when a wallet is connected
