<script lang="ts">
import { connectAccount } from '$lib/services/ethereum'

let requestInProgress = false
const connectWallet = async () => {
  try {
    requestInProgress = true
    await connectAccount()
  } catch {}
  requestInProgress = false
}
</script>

<button class="btn" on:click={connectWallet}>
  <slot>Connect Wallet</slot>
</button>
