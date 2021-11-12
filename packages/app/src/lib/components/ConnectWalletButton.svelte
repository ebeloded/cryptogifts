<script lang="ts">
import Button from '$lib/elements/Button.svelte'
import { accountStore } from '$lib/stores'
let requestInProgress = false
const connectWallet = async () => {
  try {
    requestInProgress = true
    await accountStore.requestAccount()
  } catch {}
  requestInProgress = false
}
</script>

RequestInProgress: {requestInProgress}
<Button on:click="{connectWallet}"><slot>Connect Wallet</slot></Button>
