<script lang="ts">
import c from 'clsx'
import { InstallOrConnectGuard, UserMenu } from '.'
import { user$ } from '$lib/services/ethereum'

let y = 0

$: scrolled = y > 20
</script>

<svelte:window bind:scrollY={y} />

<header
  class={c(
    'sticky navbar inset-x-0 top-0 h-16 z-20',
    scrolled && 'bg-base-100/70 backdrop-blur-sm',
  )}
>
  <div class="flex-none px-2 mx-2">
    <a
      href="/"
      class="text-2xl font-bold tracking-wider "
      style="font-family:'Mountains of Christmas', cursive;"
    >
      🎁 Cryptogifts
    </a>
  </div>
  <div class="flex-1 px-2 mx-2">
    <div class="items-stretch hidden lg:flex">
      <a
        href="/#how-it-works"
        class="btn btn-ghost btn-sm rounded-btn no-animation"
      >
        How It Works
      </a>
      <a
        href="/#features"
        class="btn btn-ghost btn-sm rounded-btn no-animation"
      >
        Features
      </a>
      <a href="/#faq" class="btn btn-ghost btn-sm rounded-btn no-animation">
        FAQ
      </a>
      <!-- <a
        href="/#source-code"
        class="btn btn-ghost btn-sm rounded-btn no-animation"
      >
        Source Code
      </a> -->
    </div>
  </div>
  <div class="flex-none">
    <InstallOrConnectGuard>
      {#if $user$}
        <UserMenu user={$user$} />
      {/if}
    </InstallOrConnectGuard>
  </div>
</header>
