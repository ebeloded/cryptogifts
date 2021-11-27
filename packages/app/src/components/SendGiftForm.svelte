<script lang="ts">
import { encodeGift } from '$lib/services/cryptogifts'
import { Network } from '$lib/types'
import copy from 'copy-to-clipboard'

export let key: string
export let chainId: number

let form = {
  message: '',
}

let giftCode = ''

$: link = giftCode ? location.origin + `/gifts/redeem#${giftCode}` : ''

async function sendGiftCard() {
  giftCode = await encodeGift({
    m: form.message,
    k: key,
    c: chainId,
    n: Network.ethereum,
  })
}
let copied = false
function copyToClipboard() {
  copied = copy(link)
  setTimeout(() => {
    copied = false
  }, 1000)
}
</script>

{#if giftCode}
  <div>
    <h2 class="card-title text-center">Your Gift Link</h2>
    <fieldset class="space-y-6">
      <div class="form-control">
        <label class="label" for="link">
          <span class="label-text">Copy the link</span>
        </label>
        <textarea
          id="link"
          class="textarea textarea-bordered select-all"
          readonly
          rows="3"
          value={link}
          on:click={copyToClipboard}
        />
      </div>

      <div>
        <button class="btn btn-outline w-full" on:click={copyToClipboard}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </fieldset>
  </div>
{:else}
  <div>
    <h2 class="card-title text-center">Create the Gift Code</h2>
    <form on:submit|preventDefault={sendGiftCard}>
      <fieldset class="space-y-6">
        <div class="form-control">
          <label for="message" class="label">
            <span class="label-text">Add personal message</span>
          </label>
          <textarea
            class="textarea textarea-bordered"
            bind:value={form.message}
          />
        </div>

        <div>
          <button type="submit" class="btn btn-outline w-full">
            Generate Link
          </button>
        </div>
      </fieldset>
    </form>
  </div>
{/if}
