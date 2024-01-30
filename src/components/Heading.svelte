<script>
	export let text = '';
	export let pretitle = '';
	export let author = '';
</script>

<div>
	{#if pretitle && pretitle.length > 0}
		<div class="mb-1.5 text-[0.9rem]">
			<span class="text-white bg-cyan-700 inline-block px-2.5 py-0.5 mb-1 font-bold">
				{pretitle}
			</span>
			{#if author && author.length > 0}
				<span class="text-white bg-cyan-500 inline-block px-2.5 py-0.5 mb-1 font-bold">
					Por {author}
				</span>
			{/if}
		</div>
	{/if}
	<div class="border-b-4 pb-2 flex justify-between">
		<h1 class="text-4xl font-roboto font-semibold text-cyan-800">{text}</h1>
		{#if $$slots.center}
			<div class="text-red-400">
				<slot name="center" />
			</div>
		{/if}
		{#if $$slots.right}
			<div class="text-blue-400">
				<slot name="right" />
			</div>
		{/if}
	</div>
</div>