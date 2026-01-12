<script lang="ts">
	import type { PageProps } from './$types';
	import Background from '../../../components/background.svelte';
	import { GithubIcon, PencilIcon, TwitterIcon } from 'lucide-svelte';
	import { formatDate, getTimeOfDay, randomTheme } from '$lib';
	import { onMount } from 'svelte';
	import { siteState } from '$lib/store.svelte';
	import Footer from '../../../components/footer.svelte';
	import { page } from '$app/state';

	let { data }: PageProps = $props();

	const b = 0;

	let hasScrolled = $state(false);

	let hasScrolledToBottom = $state(false);

	const handleScroll = (e: UIEvent) => {
		const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement;

		hasScrolled = scrollTop > 100;

		hasScrolledToBottom = scrollTop >= scrollHeight;

		console.log(scrollHeight - clientHeight, scrollTop);

		if (scrollTop >= scrollHeight - clientHeight) {
			siteState.footerHidden = false;
		} else {
			siteState.footerHidden = true;
		}
	};

	onMount(() => {
		siteState.footerHidden = true;

		return () => (siteState.footerHidden = false);
	});
</script>

<svelte:head>
	<title>etd_blog | {data.post.title}</title>
	<meta name="description" content="Personal Blog for emmathedeveloper" />

	<meta name="og:url" content={page.url.origin} />
	<meta name="og:title" content={data.post.title} />
	<meta name="og:description" content="Personal Blog for emmathedeveloper" />
	<meta name="og:type" content="website" />
	<meta name="og:image" content={page.url.origin + `/backgrounds/${getTimeOfDay()}`} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={page.url.host}/>
	<meta property="twitter:url" content={page.url.origin} />
	<meta name="twitter:title" content={data.post.title} />
	<meta name="twitter:description" content="Personal Blog for emmathedeveloper" />
	<meta
		name="twitter:image"
		content={page.url.origin + `/backgrounds/${getTimeOfDay()}`}
	/>
</svelte:head>

<main class="relative h-svh w-full">
	<Background class="size-full" />
	<section
		class:bg-white={hasScrolled}
		onscroll={handleScroll}
		class="absolute inset-0 z-10 h-svh w-full overflow-scroll transition-colors duration-700"
	>
		<div class="mx-auto mt-50 min-h-svh w-full max-w-250 rounded-t-4xl bg-white">
			<header class="flex w-full items-center justify-between px-6 py-2">
				<a href="/" class="font-instrument text-[32px]">etd_blog</a>

				<a href={`/posts/${data.post.id}/edit`} class="text-primary">
					<PencilIcon />
				</a>

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
				<span class="rounded-full px-8 py-2 font-instrument text-[16px] text-primary md:text-[24px]"
					>{formatDate(data.post.createdAt)}</span
				>

				<h1 class="w-full max-w-200 text-center text-[32px] font-extrabold md:text-[64px]">
					{data.post.title}
				</h1>

				<div class="aspect-video h-40 overflow-hidden rounded-4xl sm:h-60 md:h-75">
					<img src={data.post.poster} alt="hero" class="size-full object-cover" />
				</div>
			</div>

			<div
				class="tiptap mt-4 w-full border-t border-t-primary px-4 py-16 md:mt-16 md:px-8 lg:px-16"
			>
				{@html data.post.content}
			</div>
		</div>
		<Footer />
	</section>
</main>
