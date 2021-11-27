<script lang="ts">
import { getFeeData, network$ } from '$lib/services/ethereum'
import { map } from 'ramda'
import { utils } from 'ethers'
</script>

{#key $network$}
  <div class="fixed left-0 bottom-0 p-4">
    {#await getFeeData() then data}
      <pre>
      {JSON.stringify(map(v=>v?utils.formatUnits(v,'gwei'):'',data), null, 2)}
    </pre>
    {/await}
  </div>
{/key}
