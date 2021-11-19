<script lang="ts">
import { decodeGift } from '$lib/services/cryptogifts'

let code: string
let gift: any
let error: any = null
$: if (code) {
  try {
    gift = decodeGift(code)
    error = null
  } catch (e) {
    gift = null
    error = e
  }
}
function redeemGift() {
  const gift = decodeGift(code)

  // extract key
  // call backend with hash of the key
  // if success, show success message
}
</script>

<div class="card shadow-lg compact side bg-base-200 p-10">
  <form on:submit|preventDefault={redeemGift}>
    <fieldset class="space-y-6">
      <div>
        <textarea
          placeholder="Paste code in here"
          bind:value={code}
          class="textarea select-all w-full h-24 textarea-lg"
        />
      </div>
      {#if gift}
        <pre>{JSON.stringify(gift, null, 2)}</pre>
      {:else if error}
        <pre>{JSON.stringify(error, null, 2)}</pre>
      {/if}
      <div>
        <button type="submit" class="btn btn-primary w-full">Redeem</button>
      </div>
    </fieldset>
  </form>
</div>
