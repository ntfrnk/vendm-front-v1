<script>
	import { ProjectInterface } from './../../../interfaces/ProjectInterface.js';
    import { goto, params } from '@roxi/routify'
	import { getArticle, updateArticle } from '../../../services/articles.service.js';
	import { ArticleErrorInterface, ArticleInterface } from '../../../interfaces/ArticleInterface.js';
	import Select from './../../../components/forms/Select.svelte';
	import Editor from '../../../components/Editor.svelte';
	import Heading from '../../../components/Heading.svelte';
	import ButtonTextIcon from '../../../components/ButtonTextIcon.svelte';
    import Input from '../../../components/forms/Input.svelte'
    import ButtonText from '../../../components/ButtonText.svelte'

	$: id = $params.id;

    let form;
	let project = {};
    let article = ArticleInterface();
	let chapters = [];
    let errors = ArticleErrorInterface();

    const submitForm = () => {
        form.dispatchEvent(new Event('submit'));
    }

    const handleEditArticle = async () => {
		article = ArticleInterface({...article, user_id: 3, project_id: project.id});
        if(article.chapter_id === 0 || article.chapter_id === null){
            delete article.chapter_id;
        }
		let response = await updateArticle(article, article.id);
		if(response.code == 200){
			$goto(`/articles/${project.id}`);
		} else {
			errors = response.errors;
		}
	}

	const setArticle = async (id) => {
		let response = await getArticle(id, {load: 'project.chapters'});
		if(response.code === 200){
			article = ArticleInterface(response.item);
            project = ProjectInterface(response.item.project);
			chapters = response.item.project.chapters;
		}
	}

	$: setArticle(id);
</script>

<Heading text="Crear nuevo escrito">
    <div slot="right" class="flex gap-3">
        <ButtonTextIcon link="/articles/{article.project_id}" text="Volver al listado" icon="west" variant="light" />
        <ButtonTextIcon text="Guardar escrito" icon="save" click={submitForm} />
    </div>
</Heading>

<div class="bg-slate-100 border border-slate-300 rounded p-8 mt-6">

    <form bind:this={form} on:submit|preventDefault={handleEditArticle}>
        <div class="mb-3 grid grid-cols-2 gap-5">
            <div>
                <label for="" class="font-bold text-[0.85rem] text-gray-600 mb-1 uppercase block">Título del escrito:</label>
                <Input classes="w-full h-[3.3rem] text-lg" bind:value={article.title} placeholder="Título del escrito..." />
                {#if errors.title}
                    <span class="text-red-500 px-3">{errors.title[0]}</span>
                {/if}
            </div>
            <div>
                <label for="" class="font-bold text-[0.85rem] text-gray-600 mb-1 uppercase block">Capítulo / filtro:</label>
                <Select items={chapters} value={article.chapter_id} classes="h-[3.3rem] text-lg" />
                {#if errors.title}
                    <span class="text-red-500 px-3">{errors.title[0]}</span>
                {/if}
            </div>
        </div>
        <div class="mt-5 mb-3">
            <Editor bind:value={article.content} height="500" />
        </div>
        <div class="mt-5 mb-3 flex gap-2">
            <ButtonTextIcon text="Guardar nuevo escrito" icon="save" />
            <ButtonText link="/articles/{article.project_id}" text="Cancelar y volver" variant="light" />
        </div>
    </form>

</div>