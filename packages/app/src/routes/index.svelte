<script lang="ts">
import { Button, Checkbox, Select } from '$lib/elements'
</script>

<slot />
<header>
  <a>Crypto Gifts</a>
  <Button>Connect Wallet</Button>
</header>

<section>
  <h1>Send crypto cards to people without wallets</h1>
  <Button>Create Gift</Button>
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
