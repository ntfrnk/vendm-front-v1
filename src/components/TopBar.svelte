<script>
	export let text = '';
</script>

<div class=" bg-slate-200 p-3 mt-4 rounded flex justify-between items-center">
	{#if $$slots.left}
		<div>
			<slot name="left" />
		</div>
	{/if}
	{#if $$slots.center}
		<div>
			<slot name="center" />
		</div>
	{/if}
	{#if $$slots.right}
		<div>
			<slot name="right" />
		</div>
	{/if}
</div>