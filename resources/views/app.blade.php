<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @if ($pageSeo ?? null)
            <title>{{ $pageSeo['title'] }}</title>
            <meta name="description" content="{{ $pageSeo['description'] }}">
            <meta name="keywords" content="{{ $pageSeo['keywords'] }}">
            <meta name="author" content="{{ config('seo_pages.site_name', 'SeoKitHub') }}">
            <meta name="publisher" content="{{ config('seo_pages.site_name', 'SeoKitHub') }}">
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
            <link rel="canonical" href="{{ $pageSeo['canonical'] }}">
            <meta property="og:type" content="website">
            <meta property="og:site_name" content="{{ config('seo_pages.site_name', 'SeoKitHub') }}">
            <meta property="og:title" content="{{ $pageSeo['og_title'] }}">
            <meta property="og:description" content="{{ $pageSeo['description'] }}">
            <meta property="og:url" content="{{ $pageSeo['canonical'] }}">
            <meta property="og:image" content="{{ config('seo_pages.og_image') }}">
            <meta property="og:locale" content="en_US">
            <meta name="twitter:card" content="summary">
            <meta name="twitter:title" content="{{ $pageSeo['og_title'] }}">
            <meta name="twitter:description" content="{{ $pageSeo['description'] }}">
            <meta name="twitter:image" content="{{ config('seo_pages.og_image') }}">
        @else
            <title inertia>{{ config('app.name', 'SeoKitHub') }}</title>
        @endif
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml" title="{{ config('app.name', 'SeoKitHub') }}">
        <link rel="manifest" href="{{ asset('site.webmanifest') }}">
        <meta name="theme-color" content="#4f46e5">
        <meta name="application-name" content="{{ config('app.name', 'SeoKitHub') }}">
        <meta name="apple-mobile-web-app-title" content="{{ config('app.name', 'SeoKitHub') }}">
        <meta name="google-site-verification" content="71f54e2e4dccff20" />
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        @inertiaHead
    </head>
    <body class="antialiased bg-gray-50 text-gray-900">
        @inertia
    </body>
</html>
