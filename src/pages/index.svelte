<script>
	import { swAlert, swConfirm } from './../helpers/sweet-alert.js';
    import { getProjects, deleteProject } from '../services/projects.service';
    import ButtonTextIcon from '../components/ButtonTextIcon.svelte'
    import CardProject from '../components/CardProject.svelte'
    import Heading from '../components/Heading.svelte';
    import Input from '../components/forms/Input.svelte'
    import TopBar from '../components/TopBar.svelte'
    import Loading from '../components/Loading.svelte'

    let keyword = '';
    let items = [];
    let items_all = [];
    let loading = true;

    const setProjects = async () => {
        let response = await getProjects({take: 100, ordering: 'name,asc'});
        if(response.code === 200){
            items = response.items;
            items_all = response.items;
            loading = false;
        }
    }

    const handleSearch = () => {
        items = items_all.filter(item => item.name.toLowerCase().includes(keyword.toLocaleLowerCase()));
    }

    const handleDelete = async (id) => {
        loading = true;
        let resp = await swConfirm({
			title: '¿Estás seguro?',
			icon: 'warning',
		});
		if(resp){
			let resp = await deleteProject(id);
			if(resp.code === 200){
				swAlert({
					icon: 'success',
					title: '¡Listo!',
					text: 'El proyecto se eliminó correctamente.',
					showCancelButton: false,
					timer: 3000
				});
			}
            setProjects();
            loading = false;
		}
    }

    $: setProjects();
</script>

<span class="hidden gap-2"></span>

<Loading show={loading} />

<Heading text="Mis proyectos literarios">
    <div slot="right" class="flex gap-3">
        <ButtonTextIcon text="Crear nuevo proyecto" link="/projects/new" icon="add_circle" variant="primary" />
    </div>
</Heading>

<TopBar>
    <div slot="left"></div>
    <div slot="right">
        <Input classes="w-96" bind:value={keyword} handleKeyUp={handleSearch} placeholder="Buscar un proyecto..." />
    </div>
</TopBar>

<div class="grid grid-cols-4 gap-5 my-8">
    {#each items as item}
        <CardProject item={item} destroy={handleDelete} />
    {/each}
</div>