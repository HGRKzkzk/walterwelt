<script>
    import Counter from "$lib/Counter.svelte";

let naam = '';
  let count = 0;
  function increment() {
    count += 1;
  }
</script>

<h1>Hallo Svelte</h1>
<button on:click={increment}>Kliks: {count}</button>
<input bind:value={naam}>{naam}



<Counter start={5} />
<Counter start={1} />
