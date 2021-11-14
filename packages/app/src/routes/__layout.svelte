<script lang="ts" context="module">
import '$lib/init'
import '$lib/styles/tailwind.css'
</script>

<script lang="ts">
import { Navbar } from '$lib/components'
</script>

<Navbar />

<slot />
