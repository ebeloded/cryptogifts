<script lang="ts">
import { BigNumber, utils } from 'ethers'

export let balance: undefined | BigNumber

$: formattedBalance =
  balance === undefined ? '' : Number(utils.formatEther(balance)).toFixed(5)
</script>

<span class="text-warning">{formattedBalance} ETH</span>
