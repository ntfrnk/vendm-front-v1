<script>
    import ButtonIcon from "./ButtonIcon.svelte"
	
	export let item;
	export let destroy;
	export let shared = false;
</script>

<article class="h-40 bg-white shadow-xl border border-gray-300 rounded p-4 relative">
	<h3 class="text-[1.4rem] leading-tight text-gray-700 font-semibold">{item?.name}</h3>
	<div class="absolute bottom-4 flex gap-1">
		<ButtonIcon link="/articles/{item.id}" icon="description" title="Gestionar escritos" />
		{#if !shared}
			<ButtonIcon link="/projects/edit/{item.id}" icon="edit" title="Editar datos del proyecto" />
		{/if}
		{#if destroy}
			<ButtonIcon icon="delete" variant="danger" title="Eliminar este proyecto" click={() => destroy(item.id)} />
		{/if}
	</div>
</article>