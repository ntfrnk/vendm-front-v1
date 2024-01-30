<script>
	import { url } from '@roxi/routify';
	
	export let text = '';
	export let icon = '';
	export let link = '';
	export let click = '';
	export let size = 'normal';
	export let variant = 'author';
	export let title = '';

	size = size === '' ? 'normal' : size;
	variant = variant === '' ? 'author' : variant;
	link = link === '' ? false : link;
	click = click === '' ? false : click;

	export const variants = {
		author: 'bg-cyan-700 hover:bg-cyan-800 text-white',
		light: 'bg-slate-200 hover:bg-slate-300 text-slate-700',
		primary: 'bg-sky-700 hover:bg-sky-800 text-white',
		secondary: 'bg-slate-500 hover:bg-slate-600 text-white',
		success: 'bg-emerald-600 hover:bg-emerald-700 text-white',
		info: 'bg-sky-500 hover:bg-sky-600 text-white',
		warning: 'bg-amber-500 hover:bg-amber-600 text-white',
		danger: 'bg-red-700 hover:bg-red-800 text-white',
	};

	export const sizes = {
		normal: 'px-3 pt-1.5 pb-1',
		sm: 'px-3 pt-1 pb-1',
		lg: 'px-4 py-2.5',
	};

	export const text_sizes = {
		normal: 'text-[1rem]',
		sm: 'text-[0.95rem]',
		lg: 'text-[1.1rem]',
	};

	export const icon_sizes = {
		normal: 'text-[1.3rem]',
		sm: 'text-[1.1rem]',
		lg: 'text-[1.4rem]',
	};
</script>

{#if link}
	<a href="{$url(link)}" class="rounded transition-all duration-300 flex gap-1 items-center {sizes[size]} {variants[variant]}" title="{title}">
		<span class="material-icons {icon_sizes[size]}">{icon}</span>
		<span class="mr-1 {text_sizes[size]}">{text}</span>
	</a>
{:else}
	<button on:click={click} class="rounded transition-all duration-300 flex gap-1 items-center {sizes[size]} {variants[variant]}" title="{title}">
		<span class="material-icons {icon_sizes[size]}">{icon}</span>
		<span class="mr-1 {text_sizes[size]}">{text}</span>
	</button>
{/if}