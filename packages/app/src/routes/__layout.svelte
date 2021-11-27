<script lang="ts" context="module">
import '$lib/init'
import '$lib/styles/tailwind.css'
</script>

<script lang="ts">
import { Navbar, DevPanel, FeeData, Particles } from '$components'
import { DEV_MODE } from '$lib/env'
import { browser } from '$app/env'
import { onMount } from 'svelte'
import { pingPong } from '$lib/init'

onMount(() => {
  pingPong()
})
</script>

<div class="bg">
  <Navbar />
  <div>
    <slot />
  </div>

  {#if DEV_MODE && browser}
    <DevPanel />
  {/if}
</div>
<Particles />

<style global>
.bg {
  background-image: radial-gradient(
      41.81% 41.81% at 65% 33%,
      rgba(89, 3, 127, 0.7) 0%,
      rgba(22, 18, 18, 0) 100%
    ),
    radial-gradient(
      41.81% 41.81% at 31% 50%,
      rgba(255, 24, 27, 0.7) 0%,
      rgba(22, 18, 18, 0.7) 100%
    ),
    radial-gradient(
      41.81% 41.81% at 57% 63%,
      rgba(193, 1, 120, 0.6) 0%,
      rgba(22, 18, 18, 0.1) 100%
    );

  background-size: 2000px 1500px;
  background-repeat: no-repeat;
  background-position: top center;
}
</style>
