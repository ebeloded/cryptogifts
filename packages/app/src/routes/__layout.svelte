<script lang="ts" context="module">
import '$lib/init'
import '$lib/styles/tailwind.css'
</script>

<script lang="ts">
import { Navbar, DevPanel } from '$components'
import { DEV_MODE } from '$lib/env'
import { browser } from '$app/env'
</script>

<div class="">
  <Navbar />
  <slot />

  {#if DEV_MODE && browser}
    <DevPanel />
  {/if}
</div>
