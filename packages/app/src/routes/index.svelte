<script lang="ts">
import { Button, Checkbox, Select } from '$lib/elements'
import { networkStore, accountStore, userStore } from '$lib/stores'

$: {
  console.log('networkStore', $networkStore)
  console.log('accountStore', $accountStore)
  console.log('userStore', $userStore)
}
</script>

<pre>
  {JSON.stringify($networkStore, null, 2)}
</pre>
<pre>
  {JSON.stringify($userStore, null, 2)}
</pre>
<slot />

<section>
  <h1>Send crypto cards to people without wallets</h1>
  <div class="text-center">
    <Button href="/create-gift">Create Gift</Button>
  </div>
  <p>
    Have gift code? Redeem it <a href="/redeem-gift">here</a>
  </p>
</section>

<section id="fetures">Features</section>
<section id="how">How it works</section>
<section id="faq">
  <h2>FAQ</h2>
  <p>Can I revoke the gift card?</p>
  <p>Is this safe? Won't you steal my money?</p>
</section>
<section id="roadmap">Roadmap</section>
<section id="under-the-hood">Under the hood</section>
