<script lang="ts">
	import { Editor } from '@tiptap/core';
	import BubbleMenu from '@tiptap/extension-bubble-menu';
	import StarterKit from '@tiptap/starter-kit';
	import { onDestroy, onMount, setContext } from 'svelte';

	const { children } = $props();
</script>

{@render children()}
