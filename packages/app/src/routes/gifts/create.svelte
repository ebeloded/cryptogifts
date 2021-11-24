<!--
  1. show create gift form
  2. when gift is created


-->
<script lang="ts">
import { network$ } from '$lib/services/ethereum'
</script>

<CreateGiftForm network={$network$} on:submit={createGift} />
