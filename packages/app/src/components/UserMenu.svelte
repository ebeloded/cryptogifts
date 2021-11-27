<script lang="ts">
import { formatAddress, getChainName, network$ } from '$lib/services/ethereum'

import UserBalance from './UserBalance.svelte'

export let user: any
const { balance$ } = user
</script>

<div class="px-2 mx-2">
  <a href="/gifts" class="btn btn-ghost btn-xs no-animation">My Gifts</a>
  <button class="btn btn-ghost btn-xs no-animation">
    ⛓ {getChainName($network$.chainId)}
  </button>
  <button class="btn btn-ghost btn-xs no-animation">
    <UserBalance balance={$balance$} />
    <span class="px-2">|</span>
    <span class="text-accent">
      {user.name || formatAddress(user.address)}
    </span>
  </button>
</div>
