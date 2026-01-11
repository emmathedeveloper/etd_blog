<script lang="ts">
	import './layout.css';
	import '@fontsource/instrument-serif';
	// Supports weights 200-800
	import '@fontsource-variable/bricolage-grotesque';
	import favicon from '$lib/assets/favicon.png';
	import { onMount } from 'svelte';
	import { getTimeOfDay } from '$lib';
	import { GithubIcon, TwitterIcon } from 'lucide-svelte';

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

<header class="flex w-full items-center justify-between px-6 py-2 bg-primary text-base">
	<a href="/" class="font-instrument text-[32px]">etd_blog</a>

	<span>copyright@2026</span>
	
	<div class="flex items-center justify-between gap-8">
		<a target="_blank" href="https://github.com/emmathedeveloper">
			<GithubIcon />
		</a>
		<a target="_blank" href="https://x.com/emmathedev">
			<TwitterIcon />
		</a>
	</div>
</header>
