<script>
	import { getUser } from './../services/users.service.js';
    import CardProject from '../components/CardProject.svelte'
    import Heading from '../components/Heading.svelte';
    import TopBar from '../components/TopBar.svelte'
    import Input from '../components/forms/Input.svelte'
    import Spinner from '../components/Spinner.svelte'
    import Loading from '../components/Loading.svelte'

    let keyword;
    let items = [];
    let loading = true;

    const setProjects = async () => {
        let response = await getUser({load: 'shared.project'});
        if(response.code === 200){
            items = response.item.shared;
            loading = false;
        }
    }

    const handleSearch = () => {

    }

    $: setProjects();
</script>

<span class="hidden gap-2"></span>

<Loading show={loading} />

<Heading text="Proyectos compartidos conmigo">
    <div slot="right" class="flex gap-3">
        <Input bind:value={keyword} handleKeyUp={handleSearch} placeholder="Buscar en proyectos compartidos..." classes="w-96" />
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
        <CardProject item={item.project} shared={true} />
    {/each}
</div>