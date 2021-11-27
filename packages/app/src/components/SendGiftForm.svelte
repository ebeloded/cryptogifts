<script lang="ts">
import { encodeGift } from '$lib/services/cryptogifts'
import { Network } from '$lib/types'
import copy from 'copy-to-clipboard'

export let giftCode: string

$: link = giftCode ? location.origin + `/gifts/redeem#${giftCode}` : ''

let copied = false
function copyToClipboard() {
  copied = copy(link)
  setTimeout(() => {
    copied = false
  }, 1000)
}
</script>

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
