<script>
    import ButtonIcon from "./ButtonIcon.svelte"

	export let show = false;
	export let size = 'default';
	export let toggle;
</script>

<div class="fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-start z-10 {show ? '' : 'hidden'}">
	<div class="px-8 bg-white w-[700px] max-h-[75%] pt-12 mt-48 relative {size === 'default' ? '' : size}">
		<div class="absolute top-[5px] right-[5px] text-slate-300 hover:text-slate-400">
			<ButtonIcon variant="light" size="sm" icon="close" classes="text-[2rem]" click={toggle} />
		</div>
		{#if $$slots.title}
			<div class="mb-4 pb-2 border-b-[6px] border-slate-200">
				<slot name="title"></slot>
				{#if $$slots.subtitle}
					<slot name="subtitle"></slot>
				{/if}
			</div>
		{/if}
		<slot />
	</div>
</div>