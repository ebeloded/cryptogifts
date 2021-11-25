<script lang="ts">
export let code: string
</script>

<div class="card shadow-lg compact side bg-base-200 p-10">
  <fieldset class="space-y-6">
    <div>
      <textarea
        value={code}
        class="textarea select-all w-full h-24 textarea-lg"
        readonly
      />
    </div>
    <div>
      <button class="btn btn-primary w-full">Copy</button>
    </div>
  </fieldset>
</div>
