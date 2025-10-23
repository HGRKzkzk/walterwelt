<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
    import { testje } from '$lib/ding';

	let { children } = $props();
</script>

<nav>
	 <a href="/">Home</a> | <a href="/test">Over</a>
</nav>
<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>



{@render children?.()}



