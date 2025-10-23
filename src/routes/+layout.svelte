<script lang="ts">
	  import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
 	let { children, data } = $props();
</script>
{#if data.user}
	  <form method="POST" action="/auth?/logout">
    <button name="logout" value="1">Logout</button>
  </form>
  {:else}
  <p><a href="/auth">inloggen</a></p>
{/if}
<nav>
	 <a href="/">naar homo</a> __ <a href="/profile">profiel</a> __ <a href="/games">gaymes</a>
</nav>
<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


{@render children?.()}



