<script lang="ts">
import { TestContract } from '$lib/components'
import { Button, Checkbox, Select } from '$lib/elements'
import {
  providerStore,
  networkStore,
  accountStore,
  userStore,
} from '$lib/stores'
</script>

<slot />

<section>
  <h1>Send crypto to people without crypto</h1>
  <div class="text-center">
    <Button href="/create-gift">Create Gift</Button>
  </div>
  <p>
    Have gift code? Redeem it <a href="/redeem-gift">here</a>
  </p>
</section>

{#if $providerStore}
  <TestContract contract="{$providerStore.contract}" />
{/if}

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
