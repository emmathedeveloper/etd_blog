<script lang="ts">
	import './layout.css';
	import '@fontsource/instrument-serif';
	// Supports weights 200-800
	import '@fontsource-variable/bricolage-grotesque';
	import favicon from '$lib/assets/favicon.png';
	import { onMount } from 'svelte';
	import { getTimeOfDay } from '$lib';
	
	let { children } = $props();

	onMount(() => {
		document.documentElement.setAttribute('data-theme', getTimeOfDay());
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>etd_blog</title>
</svelte:head>
{@render children()}
