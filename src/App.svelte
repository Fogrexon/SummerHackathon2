<script>
	import Router from 'svelte-spa-router';
	import NavBar from './components/NavBar.svelte';
	import Home from './pages/Home.svelte';
	import Apitest from './pages/Apitest.svelte';
	import Current from './pages/Current.svelte';
	import TopPage from './pages/TopPage.svelte';

	const routes = {
	  '/': TopPage,
	  '/api': Apitest,
	  '/current': Current,
	  '/about': Home,
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