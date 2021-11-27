<script lang="ts">
import { contract$ } from '$lib/services/ethereum'
import { GiftCard } from '$components'
</script>

<div class="min-h-screen p-20 mx-auto">
  {#if $contract$}
    {#await $contract$.getMyGifts()}
      <!-- $contract$. is pending -->
      loading
    {:then gifts}
      <!-- $contract$. was fulfilled -->
      <div class="grid grid-cols-3 gap-4">
        {#each gifts as gift}
          <div>
            <GiftCard gift={gift} />
          </div>
        {/each}
      </div>
    {/await}
  {/if}
</div>
