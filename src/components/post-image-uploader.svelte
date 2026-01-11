<script lang="ts">
	import { LaptopMinimalIcon, PencilIcon, UploadCloudIcon } from 'lucide-svelte';

	const { onImageChange }: { onImageChange?: (file: File | null) => void } = $props();

	let inputEl = $state<HTMLInputElement | null>(null);

	let selectedFile = $state<File | null>(null);

	let displayUrl = $state<string | null>(null);

	async function uploadFile(event: Event) {
		const input = event.target as HTMLInputElement;
		if (!input.files?.length) return;

		const formData = new FormData();
		formData.append('file', input.files[0]);

		const res = await fetch('/api/upload', {
			method: 'POST',
			body: formData
		});

		const data = await res.json();
		console.log(data);
	}

	const handleFileChange = async (event: Event) => {
		try {
			const input = event.target as HTMLInputElement;
			if (!input.files?.length) return;

			const file = input.files[0];
			const base64 = await toBase64(file);

			selectedFile = file;
			displayUrl = base64 as string;
			
			onImageChange?.(file);
		} catch (e) {
			console.error(e);
		}
	};

	const toBase64 = async (file: File) => {
		return new Promise<string | null | ArrayBuffer>((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	};
</script>

<div
	class:py-4={!displayUrl}
	class="relative flex aspect-video h-40 flex-col items-center justify-center gap-4 overflow-hidden rounded-4xl border border-dashed border-primary sm:h-60 md:h-75"
>
	{#if displayUrl}
		<img src={displayUrl} alt="hero" class="size-full object-cover" />
		<button
			onclick={() => inputEl?.click()}
			class="absolute right-2 bottom-2 z-10 flex size-10 items-center justify-center gap-2 rounded-full bg-base text-primary"
		>
			<PencilIcon />
		</button>
	{:else}
		<UploadCloudIcon class="size-20" />
		<p>Drag and Drop</p>
		<p>OR</p>
		<button
			onclick={() => inputEl?.click()}
			class="flex items-center gap-2 rounded-full bg-primary/20 px-6 py-2 text-primary"
		>
			choose from computer
			<LaptopMinimalIcon />
		</button>
	{/if}
	<input class="hidden" type="file" bind:this={inputEl} onchange={handleFileChange} />
</div>
