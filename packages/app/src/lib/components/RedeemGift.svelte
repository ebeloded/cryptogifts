<script lang="ts">
export let gift: any
export let contract: any
export let user: any
export let network: any
</script>

{JSON.stringify({ network }, null, 2)}
<!-- {JSON.stringify({ user }, null, 2)} -->
<!-- {JSON.stringify({ contract }, null, 2)} -->
{JSON.stringify({ gift }, null, 2)}

{#if gift.n !== network.chainId}{/if}
