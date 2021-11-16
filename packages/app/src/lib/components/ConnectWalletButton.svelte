<script lang="ts">
import Button from '$lib/elements/Button.svelte'
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

RequestInProgress: {requestInProgress}
<Button on:click="{connectWallet}"><slot>Connect Wallet</slot></Button>
