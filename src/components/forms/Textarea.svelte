<script>
	export let placeholder = '';
	export let value = '';
	export let classes = '';
	export let rows = '4';
</script>

<textarea 
	placeholder="{placeholder}" 
	class="text-gray-600 border w-full border-gray-300 focus:border-gray-400 rounded py-2 px-3 focus-visible:!outline-0 {classes}" 
	rows="{rows}"
	bind:value={value}
></textarea>