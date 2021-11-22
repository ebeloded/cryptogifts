<script lang="ts">
import { decodeGift } from '$lib/services/cryptogifts'
import { createEventDispatcher } from 'svelte'
const dispatch = createEventDispatcher<{ submit: any }>()

let code: string
let gift: any = null
let error: string | null = null

$: try {
  gift = code ? decodeGift(code) : null
  error = null
} catch (e) {
  gift = null
  error = 'Bad Code'
}

const formatMessage = (s: string) => {
  return s.replace(/\n/g, '<br />')
}

function redeemGift() {
  console.log({ gift })
  dispatch('submit', gift)
  // extract key
  // call backend with hash of the key
  // if success, show success message
}
</script>

<div class="card shadow-lg compact side bg-base-200 p-10">
  <form on:submit|preventDefault={redeemGift}>
    <fieldset class="space-y-6 flex flex-col">
      <div>
        <textarea
          placeholder="Paste code in here"
          bind:value={code}
          class="textarea select-all w-full h-24 textarea-lg"
        />
      </div>
      {#if gift}
        <div>{@html formatMessage(gift.m)}</div>
      {:else if error}
        <pre>Error: {error}</pre>
      {/if}

      <div>
        <button type="submit" disabled={!gift} class="btn btn-outline w-full">
          Redeem
        </button>
      </div>
    </fieldset>
  </form>
</div>
