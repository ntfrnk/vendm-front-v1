<script>
	import { url } from '@roxi/routify'
	import Header from '../components/Header.svelte'
    import Chatbot from '../components/Chatbot.svelte'

	let showChatbot = false;

    const toggleChatbot = () => {
		showChatbot = !showChatbot;
	}

	/* $: {
		let user = localStorage.getItem('author_user')

		console.log($url())

		if (user === null) {
			console.log('No hay login')
		} else {
			console.log('Sí hay login')
		}
	} */
</script>

<Header />

<div class="container mx-auto py-10">
  <slot />
</div>

<Chatbot show={showChatbot} toggle={toggleChatbot} />
