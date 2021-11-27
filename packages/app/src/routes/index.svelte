<section class="hero h-screen -mt-16">
  <div class="text-center hero-content">
    <div class="w-2/3">
      <h1 class="my-5 text-6xl font-bold leading-normal tracking-wide">
        Send crypto to friends without wallets
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

<section id="fetures" class="h-screen">Features</section>
<section id="how" class="h-screen">How it works</section>
<section id="faq" class="h-screen">
  <h2>FAQ</h2>
  <p>Can I revoke the gift card?</p>
  <p>Is this safe? Won't you steal my money?</p>
</section>
<section id="roadmap">Roadmap</section>
<section id="under-the-hood">Under the hood</section>
<slot />

<style>
</style>
