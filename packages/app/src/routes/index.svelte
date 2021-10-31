<script lang="ts">
import { setGreeting, fetchGreeting } from '@cryptogifts/ethereum'
let greeting: string | undefined = undefined
let newGreeting = ''
async function getGreeting() {
  greeting = await fetchGreeting()
}
</script>

<button>RequestAccount</button>
<button on:click="{getGreeting}">getGreeting</button>
<pre>
{greeting}
</pre>
<input bind:value="{newGreeting}" />
<button
  on:click="{() => {
    setGreeting(newGreeting)
  }}">
  SetGreeting
</button>
