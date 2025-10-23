<script>
  let { form } = $props();
</script>

<form method="POST">
  <input name="email" />
  <button name="test" value="1">Test action</button>
</form>

{#if form?.success}<p>Action reached!</p>{/if}