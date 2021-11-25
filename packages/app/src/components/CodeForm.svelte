<script lang="ts">
import { decodeGiftCode } from '$lib/services/cryptogifts'
import { createEventDispatcher } from 'svelte'
const dispatch = createEventDispatcher<{ submit: any }>()

let code: string
let gift: any = null
let error: string | null = null

$: if (code) {
  decodeGiftCode(code).then(
    (g) => (gift = g),
    () => (error = 'Incorrect code format'),
  )
} else {
  gift = null
  error = null
}

// const formatMessage = (s: string) => {
//   return s.replace(/\n/g, '<br />')
// }

function redeemGift() {
  dispatch('submit', code)
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
      {#if error}
        {error}
      {/if}

      <div>
        <button type="submit" disabled={!gift} class="btn btn-outline w-full">
          Redeem
        </button>
      </div>
    </fieldset>
  </form>
</div>
