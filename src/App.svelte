<script>
	import Router from 'svelte-spa-router';
	import Home from './pages/Home.svelte';

	const routes = {
		'/': Home,
	}
</script>

<header>
</header>
<main>
	<Router {routes} />
</main>
<footer>
</footer>