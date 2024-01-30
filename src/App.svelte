<script>
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";
  import './global.css';
</script>

<svelte:head>
  <title>Author v3 - Writing Manager</title>
</svelte:head>

<Router {routes} />