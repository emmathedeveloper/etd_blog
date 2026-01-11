<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Editor } from '@tiptap/core';
	import BubbleMenu from '@tiptap/extension-bubble-menu';
	import StarterKit from '@tiptap/starter-kit';

	const { onChange, value = '<h1>New Post</h1>' } : {
		onChange?: (value: string) => void;
		value?: string;
	} = $props();

	let editorState = $state<{ editor: Editor | null }>({ editor: null });

	let element = $state();

	let bubbleMenu = $state<HTMLElement>();

	onMount(() => {
		editorState.editor = new Editor({
			element: element as any,
			extensions: [
				StarterKit,
				BubbleMenu.configure({
					element: bubbleMenu
				})
			],
			content: value,
			onTransaction: ({ editor }) => {
				// Increment the state signal to force a re-render
				editorState = { editor };
			},
			onUpdate(props) {
				onChange?.(props.editor.getHTML());
			}
		});
	});

	onDestroy(() => {
		editorState.editor?.destroy();
	});
</script>

<div class="[&>.tiptap]:outline-none" bind:this={element}></div>

{#if editorState?.editor}
	<div class="flex items-center gap-2 py-4 w-full">
		<button
			type="button"
			onclick={() => editorState.editor?.chain().focus().toggleHeading({ level: 1 }).run()}
			class:bg-primary={editorState.editor?.isActive('heading', { level: 1 })}
			class:text-base={editorState.editor?.isActive('heading', { level: 1 })}
			class="rounded p-2"
		>
			H1
		</button>
		<button
			type="button"
			onclick={() => editorState.editor?.chain().focus().toggleHeading({ level: 2 }).run()}
			class:bg-primary={editorState.editor?.isActive('heading', { level: 2 })}
			class:text-base={editorState.editor?.isActive('heading', { level: 2 })}
			class="rounded p-2"
		>
			H2
		</button>
		<button
			type="button"
			onclick={() => editorState.editor?.chain().focus().toggleHeading({ level: 3 }).run()}
			class:bg-primary={editorState.editor?.isActive('heading', { level: 3 })}
			class:text-base={editorState.editor?.isActive('heading', { level: 3 })}
			class="rounded p-2"
		>
			H3
		</button>
		<button
			type="button"
			onclick={() => editorState.editor?.chain().focus().setParagraph().run()}
			class:bg-primary={editorState.editor?.isActive('paragraph')}
			class:text-base={editorState.editor?.isActive('paragraph')}
			class="rounded p-2"
		>
			P
		</button>
	</div>
{/if}

<style>
	button.active {
		background: black;
		color: white;
	}
</style>
