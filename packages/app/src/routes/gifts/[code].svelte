<script lang="ts">
import { decodeGiftCode } from '$lib/services/cryptogifts'
import { GiftCard } from '$components'
import { browser } from '$app/env'
import { page } from '$app/stores'

let { code } = $page.params
</script>

{#if browser}
  <GiftCard gift={decodeGiftCode(code)} />
{/if}

<!-- View Created Gift -->
here the user will be able to send the gift to the friend, copy link or code
