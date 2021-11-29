<script lang="ts">
import { prefetchRoutes } from '$app/navigation'
import { LandingSection } from '$components'

import { onMount } from 'svelte'

onMount(() => {
  prefetchRoutes(['/gifts/create', '/gifts/redeem', '/gifts'])
})
</script>

<div>
  <section class="hero h-screen -mt-16">
    <div class="text-center hero-content">
      <div class="w-2/3">
        <h1
          class="my-5 text-3xl leading-normal sm:text-5xl sm:leading-normal lg:text-6xl lg:leading-normal font-bold tracking-wide"
        >
          Send crypto gifts to friends without wallets
        </h1>
        <p class="my-5 text-lg tracking-wide">
          Make a gift that gets better with time
        </p>
        <div class="my-5">
          <a
            sveltekit:prefetch
            class="btn px-10 btn-lg tracking-wide"
            href="/gifts/create"
          >
            Create a Gift
          </a>
        </div>
        <p class="my-5">
          Got a gift code? <a
            sveltekit:prefetch
            class="link"
            href="/gifts/redeem"
          >
            Redeem here
          </a>
        </p>
      </div>
    </div>
  </section>
  <LandingSection id="how-it-works">
    <svelte:fragment slot="header">How it works</svelte:fragment>
    <p>
      Cryptogifts allows sending crypto to people without knowing their wallet
      address.
    </p>
    <p>
      In the app you can create a gift card sending the gift value to the
      contract, plus some extra to cover the fees that would be needed to cover
      the costs of redeeming the gift. You get a link with a code in return,
      containing the gift key and information about the chain where the gift is
      stored. With this link a person can request funds to make a transfer if
      their wallet is empty, or redeem the gift when having sufficient funds to
      make the contract call.
    </p>
  </LandingSection>
  <LandingSection id="features">
    <svelte:fragment slot="header">Features</svelte:fragment>

    <p>The app currently only supports Metamask wallet.</p>

    <p>The contract is deployed to the following testnets:</p>

    <ul class="list-disc mx-4">
      <li>Rinkeby</li>
      <li>Ropsten</li>
      <li>Kovan</li>
      <li>Avalance Fiji</li>
    </ul>
  </LandingSection>
</div>

<slot />

<style>
</style>
