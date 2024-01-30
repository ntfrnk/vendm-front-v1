<script>
	export let placeholder = '';
	export let value = '';
	export let classes = '';
	export let handleKeyUp;
</script>

<input 
	type="text" 
	placeholder="{placeholder}" 
	class="text-gray-600 border border-gray-300 focus:border-gray-400 h-9 rounded px-3 focus-visible:!outline-0 {classes}" 
	bind:value={value}
	on:keyup={handleKeyUp}
/>