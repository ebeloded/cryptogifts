<script lang="ts">
export let id: string
</script>

<section id={id} class="flex flex-col justify-center items-center py-32">
  {#if $$slots.header}
    <h2
      class="my-5 text-3xl leading-normal sm:text-5xl sm:leading-normal lg:text-6xl lg:leading-normal font-bold tracking-wide"
    >
      <slot name="header" />
    </h2>
  {/if}

  <div class="max-w-xl space-y-4 p-4">
    <slot />
  </div>
</section>
