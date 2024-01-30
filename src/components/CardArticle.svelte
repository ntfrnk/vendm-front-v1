<script>
	import { url } from "@roxi/routify";
    import ButtonIcon from "./ButtonIcon.svelte"
	
	export let item;
	export let destroy;
	export let download;
	export let duplicate;
	export let check;
</script>

<article class="h-44 bg-white shadow-xl border border-gray-300 rounded p-4 relative">
	<h3 class="text-[1.4rem] leading-tight text-gray-700 font-semibold line-clamp-2" title="{item?.title}">{item?.title}</h3>
	<div class="absolute bottom-[4rem] flex gap-1">
		<a href="/" on:click|preventDefault={() => check(item, 'ortography')} class="{item?.checks?.ortography ? 'text-green-500' : 'text-gray-300'}" title="Corrección ortográfica: ">
			<span class="material-icons text-[1.3rem]">spellcheck</span>
		</a>
		<a href="/" on:click|preventDefault={() => check(item, 'grammar')} class="{item?.checks?.grammar ? 'text-green-500' : 'text-gray-300'}" title="Corrección gramatical: ">
			<span class="material-icons text-[1.3rem]">playlist_add_check</span>
		</a>
		<a href="/" on:click|preventDefault={() => check(item, 'review')} class="{item?.checks?.review ? 'text-green-500' : 'text-gray-300'}" title="Estado de aprobación: ">
			<span class="material-icons text-[1.3rem]">task_alt</span>
		</a>
	</div>
	<div class="absolute bottom-4 flex justify-between items-center w-full pe-8">
		<div class="flex gap-1">
			<ButtonIcon link="{$url('/articles/edit/:id', { id: item.id })}" icon="edit" title="Editar datos del escrito" />
			<ButtonIcon link="{$url('/articles/show/:id', { id: item.id })}" icon="description" title="Modo de lectura" />
			<ButtonIcon click={() => duplicate(item)} icon="content_copy" variant="secondary" title="Duplicar escrito" />
		</div>
		<div class="flex gap-1">
			<ButtonIcon click={() => download(item.id)} variant="success" icon="download" title="Descargar PDF" />
			<ButtonIcon icon="delete" variant="danger" title="Eliminar este escrito" click={() => destroy(item.id)} />
		</div>
	</div>
</article>