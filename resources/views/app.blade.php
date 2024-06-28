<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
        <style>
            body {
                background-color: rgb(3 7 18 / 0.1);
            }
            body.dark {
                background-color: rgb(3 7 18 / 0.9);
            }
        </style>
    </head>
    <body class="font-sans antialiased">
        @inertia
        <script>
            function setInitialTheme() {
                const darkMode = localStorage.getItem('darkMode') === 'true';
                if (darkMode) {
                    document.body.classList.add('dark');
                    document.body.classList.remove('light');
                } else {
                    document.body.classList.add('light');
                    document.body.classList.remove('dark');
                }
            }
        </script>
    </body>
</html>
