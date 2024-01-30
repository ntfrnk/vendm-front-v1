<script>
	export let value = 0;
	export let items = [];
	export let width = 'w-full';
	export let classes = '';
</script>

<select 
	bind:value={value} 
	class="text-gray-600 border border-gray-300 focus:border-gray-400 h-9 rounded px-3 focus-visible:!outline-0 {width} {classes}"
>
	<option value={0}>Seleccionar</option>
	{#each items as item}
		<option value={item.id}>{item.name}</option>
	{/each}
</select>