<script>
  let { data } = $props();
  const p = data.profile;
</script>

<h1>Mijn profiel</h1>
{#if p}
  <p>Naam: {p.display_name}</p>
  {#if p.avatar_url}<img src={p.avatar_url} alt="avatar" width="96"/>{/if}
{:else}
  <p>Nog geen profielgegevens.</p>
{/if}