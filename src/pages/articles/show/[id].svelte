<script>
    import { params } from '@roxi/routify'
	import { getArticle } from '../../../services/articles.service.js';
	import { ArticleInterface } from '../../../interfaces/ArticleInterface.js';
	import Heading from '../../../components/Heading.svelte';
	import ButtonTextIcon from '../../../components/ButtonTextIcon.svelte';
    import { textFormatter } from '../../../helpers/functions.js'

	$: id = $params.id;

    let article = ArticleInterface();
    let compare = false;

	const setArticle = async (id) => {
		let response = await getArticle(id, {load: 'project.user,original.original_article'});
		if(response.code === 200){
			article = response.item;
		}
	}

    const toogleCompare = () => {
        compare = !compare;
    }

	$: setArticle(id);
</script>

<Heading text="{article.title}" pretitle="{article?.project?.name}" author="{article?.project?.user?.name} {article?.project?.user?.lastname}">
    <div slot="right" class="flex gap-3">
        <ButtonTextIcon link="/articles/{article.project_id}" text="Volver" icon="west" variant="light" />
        <ButtonTextIcon click={toogleCompare} text="{compare ? 'Terminar comparación' : 'Comparar con el original'}" icon="vertical_split" variant="secondary" />
        <ButtonTextIcon link="/articles/edit/{article.id}" text="Editar" icon="edit" />
    </div>
</Heading>

<span class="hidden text-[1.15rem] pb-[1.1rem] leading-[1.7rem] grid-cols-2 grid-cols-1 text-xl text-2xl text-3xl text-4xl text-5xl"></span>

<div class="grid grid-cols-{compare ? '2' : '1'} gap-4">
    <div class="border border-slate-300 rounded p-8 mt-6 text-justify {compare ? '' : 'hidden'}">
        {@html textFormatter(article?.original?.original_article?.content ?? '')}
    </div>
    <div class="border border-slate-300 rounded p-8 mt-6 text-justify">
        {@html textFormatter(article.content)}
    </div>
</div>