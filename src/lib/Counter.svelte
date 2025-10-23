<script>
  export let start = 0;
  let count = start;
</script>

<button on:click={() => count++}>
  Telling: {count}
</button>