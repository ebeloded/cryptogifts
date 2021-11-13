<script lang="ts">
import { Button, TextInput } from '$lib/elements'
import { userStore } from '$lib/stores'
import type { CryptoGifts } from '@cryptogifts/ethereum/contracts'
import { ethers } from 'ethers'

export let contract: CryptoGifts

let value = ''
let hash: string | undefined

async function testFun() {
  hash = await contract.getRequiredGas().then(ethers.utils.formatEther)
}
</script>

<TextInput bind:value />

<Button on:click="{testFun}">Hash</Button>

<pre>
hash: {hash}
</pre>
