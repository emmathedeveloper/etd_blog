<script>
	import { siteState } from "$lib/store.svelte";
	import { GithubIcon, TwitterIcon } from "lucide-svelte";

</script>


<footer 
    class:opacity-0={siteState.footerHidden}
    class="flex w-full items-center justify-between px-6 py-2 bg-primary text-base transition-opacity opacity-100">
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
</footer>