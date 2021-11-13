<script lang="ts">
import { userStore } from '$lib/stores'
$: address = $userStore?.address
</script>

<pre>
  {address}
</pre>
