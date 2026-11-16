@props([
    'seoTitle' => null,
    'seoDescription' => null,
    'title',
    'description' => null,
    'breadcrumb' => null,
    'howTo' => [],
    'faqs' => [],
    'relatedTools' => [],
    'seoContent' => [],
])

@php
    $baseUrl = rtrim(config('seo_pages.base_url', config('app.url')), '/');
    $siteName = config('seo_pages.site_name', 'SeoKitHub');
    $displayTitle = $seoTitle ?: $title;
    $h1Title = $title ?: $seoTitle;
    $displayDescription = $seoDescription ?: $description;
    $pageUrl = $baseUrl . request()->getPathInfo();

    $schemas = [];

    $schemas[] = [
        '@context' => 'https://schema.org',
        '@type' => 'WebPage',
        'name' => $displayTitle,
        'description' => $displayDescription,
        'url' => $pageUrl,
        'publisher' => [
            '@type' => 'Organization',
            'name' => $siteName,
            'alternateName' => ['SEO Kit Hub', 'Seo Kit Hub', 'SEO Kit', 'Seo Kit'],
            'url' => $baseUrl,
            'logo' => ['@type' => 'ImageObject', 'url' => $baseUrl . '/favicon.svg'],
        ],
        'breadcrumb' => [
            '@type' => 'BreadcrumbList',
            'itemListElement' => [
                ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => $baseUrl],
                ['@type' => 'ListItem', 'position' => 2, 'name' => 'Tools', 'item' => $baseUrl . '/'],
                ['@type' => 'ListItem', 'position' => 3, 'name' => $breadcrumb ?: $title, 'item' => $pageUrl],
            ],
        ],
    ];

    $schemas[] = [
        '@context' => 'https://schema.org',
        '@type' => 'SoftwareApplication',
        'name' => $displayTitle,
        'url' => $pageUrl,
        'applicationCategory' => 'WebApplication',
        'operatingSystem' => 'Any',
        'offers' => ['@type' => 'Offer', 'price' => '0', 'priceCurrency' => 'USD'],
        'description' => $displayDescription,
        'publisher' => [
            '@type' => 'Organization',
            'name' => $siteName,
            'alternateName' => ['SEO Kit Hub', 'Seo Kit Hub', 'SEO Kit', 'Seo Kit'],
            'url' => $baseUrl,
        ],
    ];

    if (!empty($faqs)) {
        $schemas[] = [
            '@context' => 'https://schema.org',
            '@type' => 'FAQPage',
            'mainEntity' => array_map(fn ($faq) => [
                '@type' => 'Question',
                'name' => $faq['q'],
                'acceptedAnswer' => ['@type' => 'Answer', 'text' => $faq['a']],
            ], $faqs),
        ];
    }
@endphp

@push('schema')
    @foreach ($schemas as $schema)
        <script type="application/ld+json">{!! json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>
    @endforeach
@endpush

{{-- Hero --}}
<section class="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100 pt-10 pb-12 px-4">
    <div class="max-w-5xl mx-auto">
        <nav class="flex items-center gap-1.5 text-xs text-gray-400 mb-6" aria-label="Breadcrumb">
            <a href="{{ url('/') }}" class="hover:text-indigo-600 transition-colors">Home</a>
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6"/></svg>
            <a href="{{ url('/') }}" class="hover:text-indigo-600 transition-colors">Tools</a>
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6"/></svg>
            <span class="text-gray-700 font-medium">{{ $breadcrumb ?: $title }}</span>
        </nav>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{{ $h1Title }}</h1>
        <p class="text-lg text-gray-500 max-w-2xl leading-relaxed">{{ $displayDescription }}</p>
    </div>
</section>

{{-- Tool area --}}
<section class="max-w-5xl mx-auto px-4 sm:px-6 py-12">
    {{ $slot }}
</section>

{{-- SEO content --}}
@if (!empty($seoContent))
    <section class="bg-white border-y border-gray-100 py-16 px-4">
        <div class="max-w-3xl mx-auto">
            @foreach ($seoContent as $i => $block)
                <article class="{{ $i > 0 ? 'mt-10 pt-10 border-t border-gray-100' : '' }}">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">{{ $block['heading'] }}</h2>
                    @foreach ($block['paragraphs'] ?? [] as $p)
                        <p class="text-sm text-gray-600 leading-relaxed mb-4">{{ $p }}</p>
                    @endforeach
                    @if (!empty($block['list']))
                        <ul class="text-sm text-gray-600 leading-relaxed space-y-2 list-disc pl-5 mb-4">
                            @foreach ($block['list'] as $item)
                                <li>{{ $item }}</li>
                            @endforeach
                        </ul>
                    @endif
                </article>
            @endforeach
        </div>
    </section>
@endif

{{-- How to use --}}
@if (!empty($howTo))
    <section class="bg-gray-50 border-y border-gray-100 py-16 px-4">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">How to Use the {{ $title }}</h2>
            <p class="text-gray-500 mb-8">Follow these simple steps to get the best results.</p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
                @foreach ($howTo as $i => $step)
                    <div class="bg-white rounded-xl border border-gray-200 p-6">
                        <div class="w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold flex items-center justify-center mb-4">{{ $i + 1 }}</div>
                        <h3 class="font-semibold text-gray-900 mb-2">{{ $step['title'] }}</h3>
                        <p class="text-sm text-gray-500 leading-relaxed">{{ $step['desc'] }}</p>
                    </div>
                @endforeach
            </div>
        </div>
    </section>
@endif

{{-- FAQ --}}
@if (!empty($faqs))
    <section class="max-w-3xl mx-auto px-4 py-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
        <p class="text-gray-500 mb-8 text-sm">These questions are also eligible to appear as <strong>Google rich results</strong> thanks to FAQ schema markup.</p>
        <div class="space-y-3">
            @foreach ($faqs as $faq)
                <details class="group border border-gray-200 rounded-xl overflow-hidden">
                    <summary class="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer font-medium text-gray-900 text-sm hover:bg-gray-50 transition-colors list-none">
                        {{ $faq['q'] }}
                        <svg class="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6"/></svg>
                    </summary>
                    <div class="px-6 pb-5 pt-2 text-sm text-gray-600 leading-relaxed border-t border-gray-100">{{ $faq['a'] }}</div>
                </details>
            @endforeach
        </div>
        <div class="mt-6 flex items-center gap-2 text-xs text-gray-400 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <svg class="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span class="text-green-700 font-medium">FAQ Schema (JSON-LD) is active on this page</span>
            <span class="text-gray-400">— These FAQs are eligible for Google rich results.</span>
        </div>
    </section>
@endif

{{-- Related tools --}}
@if (!empty($relatedTools))
    <section class="bg-gray-50 border-t border-gray-100 py-16 px-4">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Related Free SEO Tools</h2>
            <p class="text-gray-500 mb-8 text-sm">More tools from SeoKitHub to help you rank higher.</p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                @foreach ($relatedTools as $tool)
                    <a href="{{ url($tool['href']) }}" class="group bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-sm transition-all">
                        <h3 class="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors mb-1">{{ $tool['name'] }}</h3>
                        <p class="text-xs text-gray-500 leading-relaxed mb-3">{{ $tool['desc'] }}</p>
                        <span class="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600">Open Tool →</span>
                    </a>
                @endforeach
            </div>
        </div>
    </section>
@endif
