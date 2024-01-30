<script>
	import { saveCollaborator, deleteCollaborator } from './../../services/projects.service.js';
	import { url, params } from '@roxi/routify';
	import { donwloadArticle, setCheckArticle, duplicateArticle, deleteArticle } from './../../services/articles.service.js';
	import { storeChapter, getChaptersByProject, updateChapter, deleteChapter, donwloadChapter } from './../../services/chapters.service.js';
	import { getUsers } from './../../services/users.service.js';
	import { getChapterGlobal, sortByOrdering, setChapterGlobal } from './../../helpers/functions.js';
    import { getProject } from '../../services/projects.service.js'
    import { swAlert, swConfirm } from '../../helpers/sweet-alert'
    import { ChecksInterface } from '../../interfaces/ArticleInterface.js'
	import Modal from '../../components/Modal.svelte';
	import CardArticle from './../../components/CardArticle.svelte';
	import Heading from '../../components/Heading.svelte';
	import ButtonTextIcon from '../../components/ButtonTextIcon.svelte';
	import Input from '../../components/forms/Input.svelte'
    import TopBar from '../../components/TopBar.svelte'
    import ButtonText from '../../components/ButtonText.svelte'
    import ButtonIcon from '../../components/ButtonIcon.svelte'
    import Textarea from '../../components/forms/Textarea.svelte'
    import Loading from '../../components/Loading.svelte'

	// REACTIVE VARIABLES -----------------------------------------------------

	$: project_id = $params.project_id;
	$: chapter = 0;

	// NON REACTIVE VARIABLES -------------------------------------------------

	let keyword = '';
	let chapters = [];
	let project = {name: ''};
	let items = [];
	let items_all = [];
	let collaborators = [];
	let collaborator = {
		user_id: 0,
		project_id: 0,
	};
	let collaboratorErrors;
	let users = [];
	let showChapters = false;
	let showCollaboratorsModal = false;
	let showDuplicateModal = false;
	let search = '';
	let show = {
		chapterList: true,
		chapterNew: false,
		chapterEdit: false
	};
	let collaboratorsModal = {
		list: true,
		create: false
	};
	let new_chapter = {
		name: '', 
		description: '',
		ordering: 0
	};
	let edit_chapter = {
		name: '', 
		description: '',
		ordering: 0
	};
	let duplicate = {
		project_id: 0,
		article_id: 0,
		chapter_id: 0,
		reason: ''
	};
	let duplicate_error = '';
	let loading = {
		project: true,
		chapters: true,
		articles: true
	};

	// PROJECT INITIALIZE -----------------------------------------------------

	const setProject = async (project_id) => {
		let current_chapter = getChapterGlobal(project_id);
		let response = await getProject(project_id, {load: 'collaborators.user,articles,chapters,articles.checks,collaborators'});
		if(response.code === 200){
			project = response.item;
			collaborators = response.item.collaborators;
			items = response.item.articles.sort((a,b) => a.ordering - b.ordering);
			items_all = response.item.articles;
			chapters = sortByOrdering(response.item.chapters);
			setUsers();
			if(current_chapter){
				chapter = current_chapter;
				setChapter(current_chapter);
			}
			loading = {...loading, project: false, articles: false, chapters: false};
		}
	}

	// CHAPTERS INITIALIZE ----------------------------------------------------

	const getChapters = async (id) => {
		let response = await getChaptersByProject(id);
		if(response.code === 200){
			chapters = sortByOrdering(response.items);
			loading = {...loading, chapters: false};
		}
	}

	const setChapter = (chapter_id) => {
		if(chapter_id !== 0){
			setChapterGlobal(project.id, chapter_id);
			items = items_all.filter(item => {
				return item.chapter_id === chapter_id;
			});
		} else {
			setChapterGlobal(project.id, 0);
			items = items_all;
		}
	}

	// SEARCHING ARTICLES -----------------------------------------------------

	const handleSearch = () => {
		let current_chapter = getChapterGlobal(project.id);
		if(keyword.length > 0){
			if(current_chapter === 0){
				items = items_all.filter(item => item.title.toLowerCase().includes(keyword.toLocaleLowerCase()));
			} else {
				setChapter(current_chapter);
				items = items.filter(item => item.title.toLowerCase().includes(keyword.toLocaleLowerCase()));
			}
		} else {
			setChapter(current_chapter);
			if(current_chapter === 0){
				items = items_all;
			} else {
				items = items_all.filter(item => item.chapter_id === current_chapter);
			}
		}
	}

	// DELETING ARTICLES ------------------------------------------------------

	const handleDeleteArticle = async (id_article) => {
		let resp = await swConfirm({
			title: '¿Estás seguro?',
			text: 'Si eliminas este escrito no podrás recuperarlo.',
			icon: 'warning',
		});
		if(resp){
			loading.project = true;
			let resp = await deleteArticle(id_article);
			if(resp.code === 200){
				await setProject(project_id);
				swAlert({
					icon: 'success',
					title: '¡Listo!',
					text: 'El escrito se eliminó correctamente.',
					showCancelButton: false,
					timer: 3000
				});
				loading.project = false;
			}
		}
	}

	// CHECKS FOR ARTICLES ----------------------------------------------------

	const handleCheck = async (article, action) => {
		loading.project = true;
		let checks = ChecksInterface(article.checks);
		checks = {...checks, article_id: article.id};
		checks[action] = checks[action] === 1 ? 0 : 1;
		const response = await setCheckArticle(checks);
		if(response.code === 200){
			setProject(project_id);
			loading.project = false;
		}
	}

	// DUPLICATE ARTICLES -----------------------------------------------------

	const toggleDuplicateModal = (item = {}) => {
		if(item.id !== undefined){
			duplicate = {...duplicate, article_id: item.id, project_id: item.project_id, chapter_id: item.chapter_id};
		} else {
			duplicate = {project_id: 0, chapter_id: 0, article_id: 0, reason: ''};
		}
		showDuplicateModal = !showDuplicateModal;
	}

	const handleDuplicate = async () => {
		loading.project = true;
		if(duplicate.reason.length > 0){
			duplicate_error = '';
			const resp = await duplicateArticle(duplicate);
			if(resp.code === 200){
				await setProject(project_id);
				toggleDuplicateModal();
				swAlert({
					icon: 'success',
					title: '¡Listo!',
					text: 'El escrito se duplicó correctamente.',
					showCancelButton: false,
					timer: 3000
				});
				loading.project = false;
			}
		} else {
			duplicate_error = 'Debes indicar un motivo o asunto.'
			loading.project = false;
		}
	}

	// CHAPTERS / FILTERS -----------------------------------------------------

	const toggleModalFilters = () => {
		toggleModal('chapterList');
		showChapters = !showChapters;
	}

	const toggleModal = (view) => {
		show = {
			chapterList: false,
			chapterNew: false,
			chapterEdit: false
		};
		show[view] = true;
	}

	const handleStoreChapter = async () => {
		loading.project = true;
		new_chapter = {...new_chapter, project_id: project.id};
		const resp = await storeChapter(new_chapter);
		if(resp.code === 200){
			await getChapters(project.id);
			toggleModal('chapterList');
			loading.project = false;
		}
	}

	const editChapterInit = (chapter) => {
		edit_chapter = {...edit_chapter, ...chapter};
		toggleModal('chapterEdit');
	}

	const handleEditChapter = async () => {
		loading.project = true;
		const resp = await updateChapter(edit_chapter, edit_chapter.id);
		if(resp.code === 200){
			await getChapters(project.id);
			toggleModal('chapterList');
			loading.project = false;
		}
	}

	const handleDeleteChapter = async (chapter) => {
		loading.project = true;
		const resp = await deleteChapter(chapter.id);
		if(resp.code === 200){
			await getChapters(project.id);
			toggleModal('chapterList');
			loading.project = false;
		}
	}

	// DOWNLOADS --------------------------------------------------------------

	const handleDownload = async () => {
		loading.project = true;
		let response = await donwloadChapter(chapter);
		if(response.code === 200){
			swAlert({
				icon: 'success',
				text: `
					<p><strong>¡El archivo está listo para la descarga!</strong></p>
					<p class="pt-2">
						<a href="${response.item.file}" class="bg-emerald-600 text-white p-2 inline-flex rounded items-center text-[1rem] gap-1" target="_blank" download>
							<span class="material-icons text-[1.2rem]">file_download</span> 
							<span class="me-1">Descargar archivo</span>
						</a>
					</p>`,
				showCancelButton: false,
				showConfirmButton: true,
				showCloseButton: false,
				confirmButtonText: 'Ok, listo!',
				allowOutsideClick: true,
				closeButtonAriaLabel: 'Finalizar',
				timer: 0
			});
			loading.project = false;
		}
	}

	const handleSingleDownload = async (article_id) => {
		loading.project = true;
		let response = await donwloadArticle(article_id);
		if(response.code === 200){
			swAlert({
				icon: 'success',
				text: `
					<p><strong>¡El archivo está listo para la descarga!</strong></p>
					<p class="pt-2">
						<a href="${response.item.file}" class="bg-emerald-600 text-white p-2 inline-flex rounded items-center text-[1rem] gap-1" target="_blank" download>
							<span class="material-icons text-[1.2rem]">file_download</span> 
							<span class="me-1">Descargar archivo</span>
						</a>
					</p>`,
				showCancelButton: false,
				showConfirmButton: true,
				showCloseButton: false,
				confirmButtonText: 'Ok, listo!',
				allowOutsideClick: true,
				closeButtonAriaLabel: 'Finalizar',
				timer: 0
			});
			loading.project = false;
		}
	}


	// COLLABORATORS ----------------------------------------------------------

	const toggleCollaboratorsModal = () => {
		showCollaboratorsModal = !showCollaboratorsModal;
	}

	const toggleCollaboratorsModalActions = (view) => {
		collaboratorsModal = {
			list: false,
			create: false,
		};
		collaboratorsModal[view] = true;
	}

	const handleNewCollaborator = async () => {
		collaborator = {
			...collaborator,
			project_id: project_id
		};
		let response = await saveCollaborator(collaborator);
		if(response.code === 200){
			setProject(project_id);
			collaborator = {
				user_id: 0,
				project_id: 0,
			};
			toggleCollaboratorsModalActions('list');
		} else {
			collaboratorErrors = response.errors
		}
	}

	const setUsers = async () => {
		let response = await getUsers();
		let collaborators_ids = collaborators.map(item => item.user_id);
		users = response.items.filter(item => {
			if(item.id !== project.user_id && !collaborators_ids.includes(item.id)){
				item.disable = 0;
				item.role = '';
			} else {
				item.disable = 1
				item.role = item.id !== project.user_id ? 'Colaborador' : 'Autor';
			}
			return item;
		});
	}

	const handleDeleteCollaborator = async (id) => {
		let resp = await swConfirm({
			title: '¿Estás seguro?',
			text: 'Estás a punto de eliminar a este colaborador del proyecto.',
			icon: 'warning',
		});
		if(resp){
			loading.project = true;
			let resp = await deleteCollaborator(id);
			if(resp.code === 200){
				setProject(project_id);
				swAlert({
					icon: 'success',
					title: '¡Listo!',
					text: 'El colaborador se eliminó correctamente.',
					showCancelButton: false,
					timer: 3000
				});
				loading.project = false;
			}
		}
	}


	// ON MOUNT ---------------------------------------------------------------

	$: setChapter(chapter);
	$: setProject(project_id);
</script>

<span class="hidden !gap-2"></span>

<Loading show={loading.articles || loading.chapters || loading.project} />

<Heading text="{project.name}">
    <div slot="right" class="flex gap-3">
		<ButtonTextIcon link="/" text="Volver a proyectos" icon="west" variant="light" />
        <ButtonTextIcon text="Crear nuevo escrito" link={$url('/articles/new/:project_id', {project_id: project.id})} icon="add_circle" variant="primary" />
    </div>
</Heading>

<TopBar>
	<div slot="left" class="flex gap-3 items-center">
		<div>Filtrar: </div>
		<div>
			<select bind:value={chapter} class="w-56 text-gray-600 border border-gray-300 focus:border-gray-400 h-9 rounded px-3 focus-visible:!outline-0">
				<option value={0}>Todos</option>
				{#each chapters as chapter}
					<option value="{chapter.id}">{chapter.name}</option>
				{/each}
			</select>
		</div>
		<div>
			<ButtonText text="Gestionar filtros" click={toggleModalFilters} variant="light" classes="font-semibold" />
		</div>
	</div>
	<div slot="center">
		<ButtonText text="Ver colaboradores" click={toggleCollaboratorsModal} variant="author" />
	</div>
    <div slot="right">
        <Input classes="w-96" bind:value={keyword} handleKeyUp={handleSearch} placeholder="Buscar un escrito..." />
    </div>
</TopBar>

<div class="grid grid-cols-4 gap-5 my-8">
	{#each items as item(item.id)}
		<CardArticle 
			item={item} 
			destroy={handleDeleteArticle} 
			check={handleCheck} 
			download={handleSingleDownload} 
			duplicate={toggleDuplicateModal} 
		/>
	{/each}
</div>

<Modal show={showChapters} toggle={toggleModalFilters}>
	<div slot="title" class="title flex justify-between">
		<h4 class="text-2xl font-bold uppercase text-slate-500">
			Gestionar filtros
		</h4>
		{#if show.chapterList}
			<ButtonTextIcon text="Nuevo filtro" size="sm" variant="primary" icon="add" click={() => toggleModal('chapterNew')} />
		{/if}
	</div>
	<div class="{show.chapterList ? '' : 'hidden'}">
		<div class="w-full pb-12">
			<div class="flex justify-between h-12 border-b-2 items-center font-bold uppercase text-base">
				<div>Nombre</div>
				<div class="ar">Opciones</div>
			</div>
			{#each chapters as chapter(chapter.id)}
				<div class="flex justify-between w-full h-12 border-b-2 items-center">
					<div>{chapter.name}</div>
					<div>
						<div class="ar">
							<ButtonIcon size="sm" icon="edit" click={() => editChapterInit(chapter)} />
							<ButtonIcon size="sm" icon="delete" variant="danger" click={() => handleDeleteChapter(chapter)} />
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="{show.chapterNew ? '' : 'hidden'}">
		<form on:submit|preventDefault={handleStoreChapter}>
			<div class="pt-4 pb-8">
				<div class="flex flex-col pb-4">
					<label for="" class="mb-0.5 font-bold text-base text-slate-600">Nombre para el separador:</label>
					<Input bind:value={new_chapter.name} classes="h-12" />
				</div>
				<div class="flex flex-col">
					<label for="" class="mb-0.5 font-bold text-base text-slate-600">Descripción (opcional):</label>
					<Textarea bind:value={new_chapter.description} />
				</div>
				<div class="flex pt-4 gap-2">
					<ButtonText type="submit" variant="" text="Guardar separador" />
					<ButtonText variant="light" text="Cancelar" click={() => toggleModal('chapterList')} />
				</div>
			</div>
		</form>
	</div>
	<div class="{show.chapterEdit ? '' : 'hidden'}">
		<form on:submit|preventDefault={handleEditChapter}>
			<div class="pt-4 pb-8">
				<div class="flex flex-col pb-4">
					<label for="" class="mb-0.5 font-bold text-base text-slate-600">Nombre para el separador:</label>
					<Input bind:value={edit_chapter.name} classes="h-12" />
				</div>
				<div class="flex flex-col pb-4">
					<label for="" class="mb-0.5 font-bold text-base text-slate-600">Descripción (opcional):</label>
					<Textarea bind:value={edit_chapter.description} />
				</div>
				<div class="flex gap-2">
					<ButtonText type="submit" variant="" text="Guardar cambios" />
					<ButtonText variant="light" text="Cancelar" click={() => toggleModal('chapterList')} />
				</div>
			</div>
		</form>
	</div>
</Modal>

<Modal show={showDuplicateModal} toggle={toggleDuplicateModal}>
	<div slot="title" class="title flex justify-between">
		<h4 class="text-2xl font-bold uppercase text-slate-500">
			Duplicar escrito
		</h4>
	</div>
	<div class="">
		<form on:submit|preventDefault={handleDuplicate}>
			<div class="pt-2 pb-8">
				<div class="flex flex-col pb-4">
					<label for="" class="mb-0.5 font-bold text-base text-slate-600">Motivo de la duplicación:</label>
					<Input bind:value={duplicate.reason} classes="h-12" />
					{#if duplicate_error !== ''}
						<span class="invalid-feedback d-block">{duplicate_error}</span>
					{/if}
				</div>
				<div class="flex flex-col pb-5">
					<label for="" class="mb-0.5 font-bold text-base text-slate-600">Cambiar capítulo / filtro:</label>
					<select bind:value={duplicate.chapter_id} class="w-full text-gray-600 border border-gray-300 focus:border-gray-400 h-9 rounded px-3 focus-visible:!outline-0">
						<option value={0}>Seleccionar</option>
						{#each chapters as chapter}
							<option value={chapter.id}>{chapter.name}</option>
						{/each}
					</select>

				</div>
				<div class="flex gap-2">
					<ButtonText type="submit" variant="" text="Duplicar escrito" />
					<ButtonText variant="light" text="Cancelar" click={toggleDuplicateModal} />
				</div>
			</div>
		</form>
	</div>
</Modal>

<Modal show={showCollaboratorsModal} toggle={toggleCollaboratorsModal}>
	<div slot="title" class="title flex justify-between">
		<h4 class="text-2xl font-bold uppercase text-slate-500">
			Gestionar colaboradores
		</h4>
		{#if collaboratorsModal.list}
			<ButtonTextIcon text="Nuevo colaborador" size="sm" variant="primary" icon="add" click={() => toggleCollaboratorsModalActions('create')} />
		{/if}
	</div>
	<div class="{collaboratorsModal.list ? '' : 'hidden'}">
		<div class="w-full pb-12">
			{#if collaborators.length !== 0}
				<div class="flex justify-between h-12 border-b-2 items-center font-bold uppercase text-base">
					<div>Nombre</div>
					<div class="ar">Opciones</div>
				</div>
				{#each collaborators as collaborator}
					<div class="flex justify-between w-full h-12 border-b-2 items-center">
						<div>
							{collaborator?.user?.name} {collaborator?.user?.lastname}
						</div>
						<div>
							<div class="ar">
								<ButtonIcon size="sm" icon="delete" variant="danger" click={() => handleDeleteCollaborator(collaborator.id)} />
							</div>
						</div>
					</div>
				{/each}
			{:else}
				<div class="flex justify-center items-center flex-col pt-12 pb-16 border rounded text-gray-400 text-[1.1rem] italic">
					<span class="material-icons text-[3.5rem] mb-2">sentiment_neutral</span>
					Aún no hay colaboradores en este proyecto
				</div>
			{/if}
		</div>
	</div>
	<div class="{collaboratorsModal.create ? '' : 'hidden'}">
		<form on:submit|preventDefault={handleNewCollaborator}>
			<div class="pt-2 pb-8">
				<div class="flex flex-col pb-5">
					<label for="" class="mb-0.5 font-bold text-base text-slate-600">Elige un usuario:</label>
					<select bind:value={collaborator.user_id} class="w-full text-gray-600 border border-gray-300 focus:border-gray-400 h-9 rounded px-3 focus-visible:!outline-0">
						<option value={0}>Seleccionar</option>
						{#each users as user}
							{#if user.disable === 1}
								<option value={user.id} class="text-gray-400 italic bg-gray-100" disabled>
									{user.name} {user.lastname} ({user.email}) [{user.role}]
								</option>
							{:else}
								<option value={user.id}>{user.name} {user.lastname} ({user.email})</option>
							{/if}
						{/each}
					</select>
					{#if collaboratorErrors?.user_id}
						<span class="text-red-600 block text-[0.9rem]">{collaboratorErrors.user_id[0]}</span>
					{/if}
				</div>
				<div class="flex gap-2">
					<ButtonText type="submit" variant="" text="Añadir nuevo colaborador" />
					<ButtonText variant="light" text="Cancelar" click={() => toggleCollaboratorsModalActions('list')} />
				</div>
			</div>
		</form>
	</div>
</Modal>