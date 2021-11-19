<script lang="ts">
import { onMount } from 'svelte'
import { api } from '$lib/services/api'

onMount(async () => {
  const result = await api.hello()

  console.log({ result })
})
</script>

<slot />
