<script lang="ts" context="module">
const hasEthereum = !!ethereum
</script>

<script lang="ts">
async function connect() {}
</script>

hasEthereum : {hasEthereum}

{#if hasEthereum}
  <button on:click="{connect}">Connect</button>
{/if}
