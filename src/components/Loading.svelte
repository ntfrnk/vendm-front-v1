<script>
    import Spinner from "./Spinner.svelte"

	export let show = false;
</script>

<div class="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-white/90 z-10 {show ? '' : 'hidden'}">
	<Spinner size="lg" />
</div>