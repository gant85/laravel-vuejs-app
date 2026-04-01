<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Showcase Application') }}</title>

        <!-- Scripts -->
        @routes
        @vite(['resources/js/app.ts'])
        @inertiaHead
        <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
