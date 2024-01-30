<script>
	import { ProjectInterface, ProjectErrorInterface } from './../../interfaces/ProjectInterface.js';
	import Editor from './../../components/Editor.svelte';
	import Heading from '../../components/Heading.svelte';
	import ButtonTextIcon from '../../components/ButtonTextIcon.svelte';
    import Input from '../../components/forms/Input.svelte'
    import { saveProject } from '../../services/projects.service'
    import { goto } from '@roxi/routify'
    import ButtonText from '../../components/ButtonText.svelte'

    let form;
    let project = ProjectInterface();
    let errors = ProjectErrorInterface();

    const submitForm = () => {
        form.dispatchEvent(new Event('submit'));
    }

    const handleCreateProject = async () => {
		project = ProjectInterface({...project, user_id: 3});
		let response = await saveProject(project);
		if(response.code == 200){
			$goto('/');
		} else {
			errors = response.errors;
		}
	}
</script>

<Heading text="Crear nuevo proyecto">
    <div slot="right" class="flex gap-3">
        <ButtonTextIcon link="/" text="Volver a proyectos" icon="west" variant="light" />
        <ButtonTextIcon text="Guardar proyecto" icon="save" click={submitForm} />
    </div>
</Heading>

<div class="bg-slate-100 border border-slate-300 rounded p-8 mt-6">
    
    <form bind:this={form} on:submit|preventDefault={handleCreateProject}>
        <div class="mb-3">
            <label for="" class="font-bold text-[0.85rem] text-gray-600 mb-1 uppercase block">Nombre del proyecto:</label>
            <Input classes="w-full h-[3.3rem] text-lg" bind:value={project.name} placeholder="Nombre del proyecto..." />
            {#if errors.name}
                <span class="text-red-500 px-3">{errors.name[0]}</span>
            {/if}
        </div>
        <div class="mt-5 mb-3">
            <Editor bind:value={project.description} height="400" />
        </div>
        <div class="mt-5 mb-3 flex gap-2">
            <ButtonTextIcon text="Guardar nuevo proyecto" icon="save" />
            <ButtonText link="/" text="Cancelar y volver" variant="light" />
        </div>
    </form>

</div>