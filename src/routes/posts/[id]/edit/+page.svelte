<script lang="ts">
	import { CheckIcon, XIcon } from 'lucide-svelte';
	import Tiptap from '../../../../components/editor/tiptap.svelte';
	import PostImageUploader from '../../../../components/post-image-uploader.svelte';
	import type { PageProps } from '../$types';

	const { data }: PageProps = $props();

	type UploadState = 'idle' | 'uploading' | 'success' | 'error';

	let uploadStateData = $state<{ type: UploadState; message?: string }>({ type: 'idle' });

	let uploadedPostId = $state<string | null>(null);

	let title = $derived(data.post.title);

	let content = $derived(data.post.content);

	let poster = $state<File | null>(null);

	const handlePost = () => {
		uploadStateData = { type: 'uploading', message: 'Uploading...' };

		const formData = new FormData();
		if (poster) formData.append('poster', poster);
		if (title.trim()) formData.append('content', content);
		if (content.trim()) formData.append('title', title);

		fetch(`/api/posts/${data.post.id}`, {
			method: 'PATCH',
			body: formData
		})
			.then((response) => response.json())
			.then(({ data }) => {
				console.log(data);
				uploadStateData = { type: 'success', message: data.message };
				uploadedPostId = data.id;
			})
			.catch((error) => {
				console.error(error);
				uploadStateData = {
					type: 'error',
					message: (error as Error)?.message || 'An error occurred while creating the post'
				};
			});
	};
</script>

<main class="mx-auto flex h-svh w-full max-w-250 flex-col">
	<nav class="flex w-full items-center justify-between p-4">
		<a
			href="/"
			type="button"
			class="flex items-center gap-2 rounded-full bg-primary/20 px-6 py-2 text-primary"
		>
			Cancel
			<XIcon />
		</a>

		<button
			onclick={handlePost}
			class="flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-base"
		>
			Save Changes
			<CheckIcon />
		</button>
	</nav>

	<section class="overflow-auto">
		<div class="mt-8 flex flex-1 flex-col items-center justify-center gap-4">
			<textarea
				bind:value={title}
				rows="2"
				placeholder="Title"
				class="w-full max-w-200 resize-none text-center text-[32px] font-extrabold text-foreground outline-none md:text-[64px]"
			></textarea>

			<PostImageUploader
				initialFile={data.post.poster}
				onImageChange={(image) => (poster = image)}
			/>
		</div>
		<div class="mt-8 flex max-h-100 flex-col px-4 md:mt-16">
			<Tiptap value={content} onChange={(v) => (content = v)} />
		</div>
	</section>
</main>

{#if uploadStateData.type !== 'idle'}
	<div
		class="fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-black/50 p-4"
	>
		<div
			class="flex w-full max-w-100 flex-col items-center justify-center gap-4 rounded-lg bg-white p-8"
		>
			{#if uploadStateData.type === 'uploading'}
				<p>Uploading...</p>
			{:else if uploadStateData.type === 'success'}
				<p>Success!</p>
				<a href={`/posts/${uploadedPostId}`} class="rounded-full bg-primary px-6 py-2 text-base">
					View Post
				</a>
			{:else if uploadStateData.type === 'error'}
				<p>Error: {uploadStateData.message}</p>
				<button onclick={handlePost} class="rounded-full bg-primary px-6 py-2 text-base">
					Retry
				</button>
				<button
					onclick={() => (uploadStateData = { type: 'idle' })}
					class="rounded-full bg-primary/20 px-6 py-2 text-primary"
				>
					Close
				</button>
			{/if}
		</div>
	</div>
{/if}
