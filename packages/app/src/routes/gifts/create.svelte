<!--
  1. show create gift form
  2. when gift is created


-->
<script lang="ts">
import { CreateGiftForm } from '$components'

import { network$ } from '$lib/services/ethereum'
</script>

<div class="min-h-screen flex justify-center items-center">
  <CreateGiftForm />
</div>
