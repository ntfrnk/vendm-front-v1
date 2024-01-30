<script>
	import { url } from '@roxi/routify';
	
	export let text;
	export let link;
	export let target = '';
</script>

<a href="{$url(link)}" target="{target}">{text}</a>