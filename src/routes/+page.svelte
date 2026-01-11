<script lang="ts">
    import type { PageProps } from './$types';
    import { formatDate } from '$lib';
	import { ArrowRightIcon } from 'lucide-svelte';
	import Hero from '../components/sections/landing/hero.svelte';
	
	let { data } : PageProps = $props()
</script>

<Hero post={data.posts[0]} />

{#each data.posts.slice(1) as post , i}
    <section
        class={`min-h-svh py-10 px-4 ${i == 0 ? 'bg-linear-to-b from-gradient-start via-background via-30% to-background' : 'bg-background'}`}>
       	<div class="flex flex-1 flex-col items-center justify-center gap-4">
    		<span class="py-2 px-8 font-instrument text-[16px] md:text-[24px] bg-primary/20 text-primary rounded-full">{formatDate(post.createdAt)}</span>
    
    		<h1 class="w-full max-w-200 text-center text-[32px] font-extrabold md:text-[64px]">
    			{post.title}
    		</h1>
    
    		<div class="aspect-video h-50 md:h-75 overflow-hidden rounded-4xl">
    			<img src={post.poster} alt="hero" class="size-full object-cover" />
    		</div>
    
    		<div class="flex items-center justify-center">
    			<a
    				href={`/posts/${post.id}`}
    				class="flex items-center gap-2 rounded-full px-8 py-2 text-primary bg-primary/20"
    			>
    				Read Now
    				<ArrowRightIcon />
    			</a>
    		</div>
    	</div>
    </section>
{/each}