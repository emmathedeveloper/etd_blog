<script lang="ts">
	import { GithubIcon, TwitterIcon, ArrowRightIcon, ArrowDownIcon } from 'lucide-svelte';
	import Background from '../../background.svelte';
	import { formatDate } from '$lib';

	let { post }: { post: any } = $props();
</script>

<Background class="relative flex flex-col pb-50">
	<header class="flex w-full items-center justify-between px-6 py-2">
		<a href="/" class="font-instrument text-[32px]">etd_blog</a>

		<div class="flex items-center justify-between gap-8">
			<a target="_blank" href="https://github.com/emmathedeveloper">
				<GithubIcon />
			</a>
			<a target="_blank" href="https://x.com/emmathedev">
				<TwitterIcon />
			</a>
		</div>
	</header>

	<div class="flex flex-1 flex-col items-center justify-center gap-4">
		<span class="p-2 font-instrument text-[16px] md:text-[24px]"
			>latest - {formatDate(post.createdAt)}</span
		>

		<h1 class="w-full max-w-200 text-center text-[32px] font-extrabold md:text-[64px]">
			{post.title}
		</h1>

		<div class="aspect-video h-50 overflow-hidden rounded-4xl md:h-75">
			<img src={post.poster} alt="hero" class="size-full object-cover" />
		</div>

		<div class="flex items-center justify-center">
			<a
				href={`posts/${post.id}`}
				class="flex items-center gap-2 rounded-full bg-base px-8 py-2 text-primary"
			>
				Read Now
				<ArrowRightIcon />
			</a>
		</div>

		<a
			href="#"
			class="absolute right-2 bottom-2 flex size-10 animate-bounce items-center justify-center gap-2 rounded-full bg-base text-primary"
		>
			<ArrowDownIcon />
		</a>
	</div>
</Background>
