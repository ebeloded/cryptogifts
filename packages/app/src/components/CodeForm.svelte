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

<div class="card shadow-lg compact side bg-base-100 p-10 min-w-md">
  <form on:submit|preventDefault={redeemGift}>
    <fieldset class="space-y-6 flex flex-col">
      <div class="form-control">
        <label for="code" class="label">
          <span class="label-text">Enter your gift code</span>
        </label>
        <textarea
          id="code"
          placeholder="Paste code in here"
          bind:value={code}
          class="textarea textarea-bordered w-full h-24 textarea-lg"
        />
        {#if error}
          <label class="label" for="code">
            <div class="label-text-alt text-error">
              {error}
            </div>
          </label>
        {/if}
      </div>

      <div>
        <button type="submit" disabled={!gift} class="btn btn-outline w-full">
          Redeem
        </button>
      </div>
    </fieldset>
  </form>
</div>
