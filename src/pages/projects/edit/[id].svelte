<script>
	import ButtonText from './../../../components/ButtonText.svelte';
	import { getProject, updateProject } from './../../../services/projects.service.js';
	import { ProjectInterface, ProjectErrorInterface } from '../../../interfaces/ProjectInterface.js';
	import Editor from '../../../components/Editor.svelte';
	import Heading from '../../../components/Heading.svelte';
	import ButtonTextIcon from '../../../components/ButtonTextIcon.svelte';
    import Input from '../../../components/forms/Input.svelte'
    import { saveProject } from '../../../services/projects.service'
    import { goto } from '@roxi/routify'
	import { params } from '@roxi/routify'
    import Loading from '../../../components/Loading.svelte'

	$: id = $params.id;

	let form;
    let project = ProjectInterface();
    let errors = ProjectErrorInterface();
	let loading = true;

	const setProject = async (id) => {
		let response = await getProject(id);
		if(response.code === 200){
			project = ProjectInterface(response.item);
			loading = false;
		}
	}

	const submitForm = () => {
		form.dispatchEvent(new Event('submit'));
	}

    const handleEditProject = async () => {
		loading = true;
		project = ProjectInterface({...project, user_id: 3});
		let response = await updateProject(project, id);
		if(response.code == 200){
			$goto('/');
		} else {
			errors = response.errors;
			loading = false;
		}
	}

	$: setProject(id);
</script>

<Loading show={loading} />

<Heading text="Editar proyecto">
    <div slot="right" class="flex gap-3">
        <ButtonTextIcon link="/" text="Volver a proyectos" icon="west" variant="light" />
		<ButtonTextIcon text="Guardar cambios" icon="save" click={submitForm} />
    </div>
</Heading>

<div class="bg-slate-100 border border-slate-300 rounded p-8 mt-6">

	<form bind:this={form} on:submit|preventDefault={handleEditProject}>
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
			<ButtonTextIcon text="Guardar cambios" icon="save" />
			<ButtonText link="/" text="Cancelar y volver" variant="light" />
		</div>
	</form>

</div>