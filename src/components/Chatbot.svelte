<script>
    import ButtonText from './ButtonText.svelte'
	import Input from './forms/Input.svelte';
	import Modal from './Modal.svelte';
    import Spinner from './Spinner.svelte'
	const { VITE_API_CHATGPT_KEY, VITE_API_CHATGPT_URL, VITE_API_CHATGPT_MODEL } = import.meta.env;

	export let show = false;
	export let toggle;

	let prompt = "";
	let result = "";
	let loading = false;
	let help = [
		'Sinónimos de la palabra circunscripción',
		'La palabra "solo" lleva acento?',
		'Qué es un dromedario?',
		'5 nombres de perros',
		'Cómo puedo escribir las comillas literarias',
	];

	const reset = () => {
		result = '';
	}

	const handlePrompt = async () => {
		loading = true;
		result = ''

		const body = {
			prompt: prompt,
			max_tokens: 1024,
			temperature: 0.7,
			model: VITE_API_CHATGPT_MODEL,
		};
		const response = await fetch(VITE_API_CHATGPT_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${VITE_API_CHATGPT_KEY}`,
			},
			body: JSON.stringify(body),
		});

		const resp = await response.json()

		if(resp.error){
			result = `<div class="text-red-700">
						<h5 class="text-[1.2rem] mb-3">
							Error: ${resp.error.code}
						</h5>
						<div>${resp.error.message}</div>
					</div>`;
			loading = false;
		} else {
			result = resp.choices[0].text;
			loading = false;
			prompt = '';
		}
	}
</script>

<button on:click={toggle} class="fixed right-0 bottom-24 pl-4 pr-3 pt-2 pb-1 rounded-l-full transition-all duration-300 shadow-xl bg-lime-600/80 text-white hover:bg-lime-400">
	<span class="material-icons m-0 p-0">lightbulb</span>
</button>

<Modal show={show} toggle={toggle}>

	<div slot="title" class="title flex justify-between">
		<h4 class="text-2xl font-bold uppercase text-slate-500">
			Asistente de consultas (ChatGPT)
		</h4>
	</div>

	<form on:submit|preventDefault={handlePrompt}>
		<div class="pt-2 pb-8">
			<div class="flex flex-col pb-4">
				<label for="" class="mb-0.5 font-bold text-base text-slate-600">Escribe una pregunta o consulta:</label>
				<Input bind:value={prompt} classes="h-12" />
				<span class="text-gray-400 text-[.9rem]">
					<strong>Prueba algo como:</strong> 
					<em>{help[Math.floor(Math.random() * help.length)]}</em>
				</span>
			</div>

			<div class="flex gap-2">
				<ButtonText type="submit" variant="" text="Generar respuesta" />
				{#if result && result !== ''}
					<ButtonText variant="danger" size="sm" text="Borrar respuesta" click={reset} />
				{/if}
				<ButtonText variant="light" text="Cerrar asistente" click={toggle} />
			</div>
		</div>
	</form>

	{#if !loading}
		{#if result && result !== ''}
			<div class="border rounded px-6 py-5 mb-5">
				<div class="">
					{@html result}
				</div>
			</div>
		{/if}
	{:else}
		<div class="flex justify-center items-center flex-col h-24">
			<div class="mb-1">Generando respuesta...</div>
			<Spinner />
		</div>
	{/if}

</Modal>