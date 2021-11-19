<script lang="ts">
import { onMount } from 'svelte'

onMount(async () => {
  const result = await import('$lib/services/api').then(({ api }) =>
    api.hello(),
  )
  console.log({ result })
})
</script>
