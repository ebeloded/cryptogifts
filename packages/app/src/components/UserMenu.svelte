<script lang="ts">
import { formatAddress, getChainName, network$ } from '$lib/services/ethereum'

import UserBalance from './UserBalance.svelte'

export let user: any
const { balance$ } = user
</script>

<div class="px-2 mx-2">
  <div class="">
    <button class="btn btn-ghost btn-xs">
      ⛓ {getChainName($network$.chainId)}
    </button>
    <button class="btn btn-ghost btn-xs">
      <UserBalance balance={$balance$} />
      <span class="px-2">|</span>
      <span class="text-accent">
        {user.name || formatAddress(user.address)}
      </span>
    </button>
  </div>
</div>
