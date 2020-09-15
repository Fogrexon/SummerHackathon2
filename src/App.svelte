<script>
	import Router from 'svelte-spa-router';
	import NavBar from './components/NavBar.svelte';
	import Home from './pages/Home.svelte';
	import Apitest from './pages/Apitest.svelte';
	import Current from './pages/Current.svelte';

	const routes = {
	  '/': Home,
	  '/api': Apitest,
	  '/current': Current,
	};
</script>

<header>
	<NavBar />
</header>
<main>
	<Router {routes} />
	
</main>
<footer>
</footer>