<script lang="ts">
import { utils } from '@cryptogifts/ethereum'

export let user: any
const { balance$ } = user

$: balance = $balance$ === undefined ? '' : utils.formatEther($balance$)
</script>

<pre>{user.address} {balance}</pre>
