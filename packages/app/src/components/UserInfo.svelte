<script lang="ts">
export let user: any
const { balance$ } = user
</script>

<pre>{JSON.stringify(user.address, null, 2)} {$balance$}</pre>
