@extends('layouts.app')

@php
    $baseUrl = rtrim(config('seo_pages.base_url', config('app.url')), '/');
    $siteName = config('seo_pages.site_name', 'SeoKitHub');

    $tools = [
        ['name' => 'Schema Markup Generator', 'desc' => 'Generate valid JSON-LD structured data for FAQ, Product, Article and Organization schemas.', 'href' => '/schema-markup-generator', 'badge' => null, 'color' => 'bg-blue-100 text-blue-600'],
        ['name' => 'Robots.txt Generator', 'desc' => 'Build robots.txt with crawl rules, user-agents, sitemap references and crawl-delay settings.', 'href' => '/robots-txt-generator', 'badge' => null, 'color' => 'bg-slate-100 text-slate-600'],
        ['name' => 'XML Sitemap Generator', 'desc' => 'Create a sitemap.xml with priority, frequency and last-modified. Supports bulk URL import.', 'href' => '/xml-sitemap-generator', 'badge' => null, 'color' => 'bg-cyan-100 text-cyan-600'],
        ['name' => 'Keyword Density Checker', 'desc' => 'Analyze keyword frequency and density with NLP-powered suggestions to avoid over-optimization.', 'href' => '/keyword-density-checker', 'badge' => null, 'color' => 'bg-emerald-100 text-emerald-600'],
        ['name' => 'SERP Preview Tool', 'desc' => 'Preview how your page looks in Google on both desktop and mobile with pixel-width meters.', 'href' => '/serp-preview-tool', 'badge' => null, 'color' => 'bg-orange-100 text-orange-600'],
        ['name' => 'JSON Formatter & Validator', 'desc' => 'Beautify, minify and validate JSON data instantly in the browser. Nothing sent to servers.', 'href' => '/json-formatter', 'badge' => null, 'color' => 'bg-amber-100 text-amber-600'],
        ['name' => 'Image Compressor', 'desc' => 'Compress JPG, PNG and WebP images in the browser. Drag & drop — files never leave your device.', 'href' => '/image-compressor', 'badge' => null, 'color' => 'bg-teal-100 text-teal-600'],
        ['name' => 'SEO Audit Tool', 'desc' => 'Full on-page SEO analysis — title, meta, headings, schema, SSL, speed and 17 more checks.', 'href' => '/seo-audit-tool', 'badge' => 'NEW', 'color' => 'bg-green-100 text-green-600'],
        ['name' => 'Backlink Checker', 'desc' => 'Domain link analysis — check HTTPS, sitemap, robots.txt and discover free backlink data sources.', 'href' => '/backlink-checker', 'badge' => 'NEW', 'color' => 'bg-rose-100 text-rose-600'],
        ['name' => 'URL Slug Generator', 'desc' => 'Convert any title into a clean SEO-friendly URL slug. Customize separator, stop words and length.', 'href' => '/url-slug-generator', 'badge' => 'NEW', 'color' => 'bg-fuchsia-100 text-fuchsia-600'],
    ];

    $stats = [['value' => '10+', 'label' => 'Free Tools'], ['value' => '100%', 'label' => 'Free Forever'], ['value' => '100%', 'label' => 'Browser-based'], ['value' => '0', 'label' => 'Sign-up needed']];

    $features = [
        ['title' => 'Instant Results', 'desc' => 'Every tool runs directly in your browser — no waiting, no loading spinners.'],
        ['title' => 'Privacy First', 'desc' => 'Your data never leaves your device. No tracking, no data collection.'],
        ['title' => 'Always Free', 'desc' => 'All 10 tools are completely free — no AI costs, no hidden limits, no paywalls.'],
    ];

    $homeSchemas = [
        ['@context' => 'https://schema.org', '@type' => 'Organization', 'name' => $siteName, 'alternateName' => ['SEO Kit Hub', 'Seo Kit Hub', 'SEO Kit', 'Seo Kit', 'seokithub'], 'url' => $baseUrl, 'logo' => $baseUrl . '/favicon.svg', 'description' => 'SeoKitHub (SEO Kit Hub) is a free online toolkit with 10 SEO and developer tools — audit, schema, sitemap, robots.txt, and more.'],
        ['@context' => 'https://schema.org', '@type' => 'WebSite', 'name' => $siteName, 'alternateName' => ['SEO Kit Hub', 'Seo Kit Hub', 'SEO Kit', 'Seo Kit'], 'url' => $baseUrl, 'description' => 'Free SEO tools hub — website audit, schema markup, sitemap generator, SERP preview, and more. No login required.', 'publisher' => ['@type' => 'Organization', 'name' => $siteName, 'url' => $baseUrl]],
        ['@context' => 'https://schema.org', '@type' => 'WebPage', 'name' => 'SeoKitHub — Free SEO Kit Hub with 10 SEO Tools', 'description' => 'SeoKitHub (SEO Kit Hub) offers 10 free SEO tools for marketers, bloggers, and developers. No sign-up, no limits.', 'url' => $baseUrl, 'isPartOf' => ['@type' => 'WebSite', 'name' => $siteName, 'url' => $baseUrl]],
    ];
@endphp

@push('schema')
    @foreach ($homeSchemas as $schema)
        <script type="application/ld+json">{!! json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>
    @endforeach
@endpush

@section('content')
    {{-- Hero --}}
    <section class="bg-gradient-to-b from-indigo-50 to-white pt-20 pb-24 px-4">
        <div class="max-w-4xl mx-auto text-center">
            <div class="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                ★ 10 Free SEO & Developer Tools
            </div>
            <h1 class="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
                <span class="text-indigo-600">SeoKitHub</span> — Your Free<br>SEO Kit Hub for Marketers
            </h1>
            <p class="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                SeoKitHub (SEO Kit Hub) gives you 10 free tools — audit your site, check backlinks, generate schema markup, sitemaps, robots.txt and more. 100% free, no login, no limits. All tools run in your browser.
            </p>
            <div class="flex flex-wrap justify-center gap-3">
                <a href="{{ url('/seo-audit-tool') }}" class="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-indigo-700 transition-colors text-sm">Run Free SEO Audit →</a>
                <a href="{{ url('/schema-markup-generator') }}" class="inline-flex items-center gap-2 bg-white text-gray-700 font-semibold px-6 py-3.5 rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors text-sm">Schema Markup Generator</a>
            </div>

            <div class="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
                @foreach ($stats as $s)
                    <div class="text-center">
                        <div class="text-3xl font-extrabold text-gray-900">{{ $s['value'] }}</div>
                        <div class="text-sm text-gray-500 mt-1">{{ $s['label'] }}</div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- Tools Grid --}}
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-3">All Free SEO Tools</h2>
            <p class="text-gray-500 text-lg">Everything you need to optimize your website — from content to technical SEO.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            @foreach ($tools as $tool)
                <a href="{{ url($tool['href']) }}" class="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col gap-4">
                    <div class="flex items-start gap-4">
                        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 {{ $tool['color'] }}"></div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 flex-wrap">
                                <h3 class="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors leading-snug">{{ $tool['name'] }}</h3>
                                @if ($tool['badge'])
                                    <span class="text-[11px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide bg-green-100 text-green-700">NEW</span>
                                @endif
                            </div>
                        </div>
                    </div>
                    <p class="text-sm text-gray-500 leading-relaxed flex-1">{{ $tool['desc'] }}</p>
                    <span class="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:gap-2 transition-all">Use Free Tool →</span>
                </a>
            @endforeach
        </div>
    </section>

    {{-- Features --}}
    <section class="bg-gray-50 border-y border-gray-200 py-20 px-4">
        <div class="max-w-5xl mx-auto">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-900 mb-3">Why Use SeoKitHub?</h2>
                <p class="text-gray-500 text-lg">Simple, fast, and 100% free — no account needed.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                @foreach ($features as $f)
                    <div class="bg-white rounded-2xl border border-gray-200 p-7">
                        <div class="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center mb-5"></div>
                        <h3 class="font-bold text-gray-900 mb-2">{{ $f['title'] }}</h3>
                        <p class="text-sm text-gray-500 leading-relaxed">{{ $f['desc'] }}</p>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- SEO content --}}
    <section class="bg-white border-t border-gray-200 py-20 px-4">
        <div class="max-w-3xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Free SEO Tools & SEO Kit for Every Marketer</h2>
            <p class="text-sm text-gray-600 leading-relaxed mb-4">
                SeoKitHub is a free online SEO toolkit with 10 professional-grade tools — no account, no credit card, no limits. Whether you need a backlink checker, website SEO audit, schema markup generator, XML sitemap builder, or SERP preview tool, everything runs instantly in your browser or via lightweight server-side analysis.
            </p>
            <p class="text-sm text-gray-600 leading-relaxed mb-4">
                Our SEO tools help marketers, bloggers, agencies, and developers optimize websites for Google search. Use the free backlink checker to search and analyze inbound links, run a full SEO audit to find on-page issues, generate JSON-LD structured data for rich results, and create robots.txt and sitemap.xml files to improve crawlability.
            </p>
            <h3 class="text-lg font-bold text-gray-900 mb-3 mt-8">Why Choose SeoKitHub?</h3>
            <ul class="text-sm text-gray-600 leading-relaxed space-y-2 list-disc pl-5">
                <li>10 free SEO tools covering audits, backlinks, schema, sitemaps, and content optimization</li>
                <li>No sign-up required — start using any tool immediately</li>
                <li>Privacy-first — browser tools never upload your data to servers</li>
                <li>Built for speed — instant results with no waiting or API costs</li>
            </ul>
        </div>
    </section>

    {{-- CTA --}}
    <section class="max-w-3xl mx-auto px-4 py-24 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Start Optimizing for Free</h2>
        <p class="text-gray-500 text-lg mb-8">Pick any tool below — no login, no credit card, no limits.</p>
        <div class="flex flex-wrap justify-center gap-3">
            <a href="{{ url('/seo-audit-tool') }}" class="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm">SEO Audit Tool</a>
            <a href="{{ url('/schema-markup-generator') }}" class="bg-white text-gray-700 font-semibold px-6 py-3 rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors text-sm">Schema Generator</a>
            <a href="{{ url('/robots-txt-generator') }}" class="bg-white text-gray-700 font-semibold px-6 py-3 rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors text-sm">Robots.txt Generator</a>
        </div>
    </section>
@endsection
