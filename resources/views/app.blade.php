<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title inertia>{{ config('app.name', 'SeoKitHub') }}</title>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml" title="{{ config('app.name', 'SeoKitHub') }}">
        <link rel="manifest" href="{{ asset('site.webmanifest') }}">
        <meta name="theme-color" content="#4f46e5">
        <meta name="application-name" content="{{ config('app.name', 'SeoKitHub') }}">
        <meta name="apple-mobile-web-app-title" content="{{ config('app.name', 'SeoKitHub') }}">
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        @inertiaHead
    </head>
    <body class="antialiased bg-gray-50 text-gray-900">
        @inertia
    </body>
</html>
