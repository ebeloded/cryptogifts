<script lang="ts">
import { Button, Checkbox, Select } from '$lib/elements'
import {
  providerStore,
  networkStore,
  accountStore,
  userStore,
} from '$lib/stores'
</script>

<section class="hero">
  <div class="text-center hero-content">
    <div class="w-2/3">
      <h1 class="mb-5 text-6xl font-bold leading-normal">
        Send crypto gifts to people without wallets
      </h1>

      <a class="btn btn-primary btn-lg px-10" href="/create-gift">
        Create a Gift
      </a>
      <p class="mt-5">
        Got a gift code? <a class="link" href="/redeem-gift">Redeem here</a>
      </p>
    </div>
  </div>
</section>
<!--
<section id="fetures">Features</section>
<section id="how">How it works</section>
<section id="faq">
  <h2>FAQ</h2>
  <p>Can I revoke the gift card?</p>
  <p>Is this safe? Won't you steal my money?</p>
</section>
<section id="roadmap">Roadmap</section>
<section id="under-the-hood">Under the hood</section> -->
<slot />
