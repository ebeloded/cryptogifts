<script lang="ts">
import { Button, TextInput } from '$lib/elements'
import { userStore } from '$lib/stores'
import type { CryptoGifts } from '@cryptogifts/ethereum/contracts'

export let contract: CryptoGifts

let value = ''
let hash: string | undefined

async function hashString() {
  hash = await contract.hashString(value)
}
</script>

<TextInput bind:value />

<Button on:click="{hashString}">Hash</Button>

<pre>
hash: {hash}
</pre>
