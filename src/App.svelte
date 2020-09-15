<script>
	import Router from 'svelte-spa-router';
	import Home from './pages/Home.svelte';
	import NavBar from './component/navbar.svelte'
	const routes = {
		'/': Home,
	}
</script>

<header>
	<NavBar {NavBar} />
</header>
<main>
	<Router {routes} />
	
</main>
<footer>
</footer>