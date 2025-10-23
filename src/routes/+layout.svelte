<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
 	let { children, data } = $props();
</script>
{#if data.user}
	<p>aangemeld</p>
  {:else}
  <p>niet aangemeld</p>
{/if}
<nav>
	 <a href="/">root</a> | <a href="/auth/register">auth</a> | <a href="/test">test</a>
</nav>
<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


{@render children?.()}



