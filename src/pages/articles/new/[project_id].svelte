<script>
    import { goto, params } from '@roxi/routify'
	import { saveArticle } from '../../../services/articles.service.js';
	import { ArticleErrorInterface, ArticleInterface } from '../../../interfaces/ArticleInterface.js';
    import { getProject } from '../../../services/projects.service'
	import Heading from '../../../components/Heading.svelte';
	import ButtonTextIcon from '../../../components/ButtonTextIcon.svelte';
    import ButtonText from '../../../components/ButtonText.svelte'
	import Select from './../../../components/forms/Select.svelte';
    import Input from '../../../components/forms/Input.svelte'
	import Editor from '../../../components/Editor.svelte';

	$: project_id = $params.project_id;

    let form;
	let project = {};
    let article = ArticleInterface();
    let errors = ArticleErrorInterface();

    const submitForm = () => {
        form.dispatchEvent(new Event('submit'));
    }

    const handleCreateArticle = async () => {
		article = ArticleInterface({
            ...article, 
            user_id: 3, 
            project_id: project.id
        });
        if(article.chapter_id === 0 || article.chapter_id === null){
            delete article.chapter_id;
        }
        console.log(article);
		let response = await saveArticle(article);
		if(response.code == 200){
			$goto(`/articles/${project.id}`);
		} else {
			errors = response.errors;
		}
	}

	const setProject = async (project_id) => {
		let response = await getProject(project_id, {load: 'chapters'});
		if(response.code === 200){
			project = response.item;
		}
	}

	$: setProject(project_id);
</script>

<Heading text="Crear nuevo escrito">
    <div slot="right" class="flex gap-3">
        <ButtonTextIcon link="/articles/{project.id}" text="Volver al listado" icon="west" variant="light" />
        <ButtonTextIcon text="Guardar escrito" icon="save" click={submitForm} />
    </div>
</Heading>

<div class="bg-slate-100 border border-slate-300 rounded p-8 mt-6">

    <form bind:this={form} on:submit|preventDefault={handleCreateArticle}>
        <div class="mb-3 grid grid-cols-2 gap-5">
            <div>
                <label for="" class="font-bold text-[0.85rem] text-gray-600 mb-1 uppercase block">Título del escrito:</label>
                <Input classes="w-full h-[3.3rem] text-lg" bind:value={article.title} placeholder="Título del escrito..." />
                {#if errors.title}
                    <span class="text-red-500 px-3">{errors.title}</span>
                {/if}
            </div>
            <div>
                <label for="" class="font-bold text-[0.85rem] text-gray-600 mb-1 uppercase block">Capítulo / filtro:</label>
                <Select items={project.chapters} value={0} classes="h-[3.3rem] text-lg" />
                {#if errors.chapter_id}
                    <span class="text-red-500 px-3">{errors.chapter_id}</span>
                {/if}
            </div>
        </div>
        <div class="mt-5 mb-3">
            <Editor bind:value={article.content} height="500" />
        </div>
        <div class="mt-5 mb-3 flex gap-2">
            <ButtonTextIcon text="Guardar nuevo escrito" icon="save" />
            <ButtonText link="/articles/{project.id}" text="Cancelar y volver" variant="light" />
        </div>
    </form>

</div>