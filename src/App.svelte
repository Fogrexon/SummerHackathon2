<script>
	import Router from 'svelte-spa-router';
	import Home from './pages/Home.svelte';
	import Apitest from './pages/Apitest.svelte';

	const routes = {
	  '/': Home,
	  '/api': Apitest,
	};
</script>

<header>
</header>
<main>
	<Router {routes} />
</main>
<footer>
</footer>