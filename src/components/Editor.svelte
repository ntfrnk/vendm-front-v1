<script>
	import Editor from '@tinymce/tinymce-svelte';

	export let value;
	export let height = 600;

	const settings = {
		height: height,
		menubar: false,
		plugins: [
			'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
			'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
			'insertdatetime', 'media', 'table', 'preview', 'searchreplace', 'hr'
		],
		toolbar: 'code | cut copy paste | bold italic underline | link anchor | bullist numlist blockquote hr | blocks | fullscreen | wordcount | searchreplace',
		content_style: 'body { font-family: Calibri, Open Sans, Roboto; font-weight: 500; font-size: 20px; color: #333; }'
	};
</script>

<Editor conf={settings} bind:value={value} />