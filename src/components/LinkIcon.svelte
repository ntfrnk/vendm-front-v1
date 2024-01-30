<script>
	import { url } from '@roxi/routify';
	import Icon from './Icon.svelte';
	
	export let text;
	export let link;
	export let click;
	export let icon;
	export let target = '';
</script>

{#if !click || click === ''}
	<a href="{$url(link)}" target="{target}" class="flex items-center gap-1 hover:bg-cyan-950 px-3 py-2 transition-all duration-300 rounded">
		<Icon name="{icon}" />
		{text}
	</a>
{:else}
	<button on:click={click} class="flex items-center gap-1 hover:bg-cyan-950 px-3 py-2 transition-all duration-300 rounded">
		<Icon name="{icon}" />
		{text}
	</button>
{/if}