<script>
    import logo from '../assets/logo.svg';
    import LinkIcon from '../components/LinkIcon.svelte'
</script>

<header class="bg-cyan-900 h-24 flex items-center">
    <div class="container mx-auto flex items-center justify-between">
        <div class="">
            <img src="{logo}" class=" h-11" alt="Author v3" />
        </div>
        <nav class="flex gap-1 text-white">
            <LinkIcon text="Mis proyectos" link="/" icon="snippet_folder" />
            <LinkIcon text="Compartidos" link="/shared" icon="folder_shared" />
            <LinkIcon text="Configuración" link="/settings" icon="settings" />
            <LinkIcon text="Cerrar sesión" link="/close" icon="logout" />
        </nav>
    </div>
</header>