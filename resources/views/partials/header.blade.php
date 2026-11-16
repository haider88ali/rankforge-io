@php
    $megaMenu = [
        'SEO Tools' => [
            ['name' => 'SERP Preview Tool', 'href' => '/serp-preview-tool', 'desc' => 'Preview Google search results'],
            ['name' => 'Keyword Density Checker', 'href' => '/keyword-density-checker', 'desc' => 'Analyze keyword frequency'],
        ],
        'Technical SEO' => [
            ['name' => 'Schema Markup Generator', 'href' => '/schema-markup-generator', 'desc' => 'JSON-LD structured data'],
            ['name' => 'Robots.txt Generator', 'href' => '/robots-txt-generator', 'desc' => 'Control search crawlers'],
            ['name' => 'XML Sitemap Generator', 'href' => '/xml-sitemap-generator', 'desc' => 'Build sitemap.xml files'],
        ],
        'Content & Dev' => [
            ['name' => 'JSON Formatter', 'href' => '/json-formatter', 'desc' => 'Beautify & validate JSON'],
            ['name' => 'Image Compressor', 'href' => '/image-compressor', 'desc' => 'Compress JPG, PNG, WebP'],
        ],
        'Analysis Tools' => [
            ['name' => 'SEO Audit Tool', 'href' => '/seo-audit-tool', 'desc' => 'Full on-page SEO analysis'],
            ['name' => 'Backlink Checker', 'href' => '/backlink-checker', 'desc' => 'Domain link analysis'],
            ['name' => 'URL Slug Generator', 'href' => '/url-slug-generator', 'desc' => 'SEO-friendly URL slugs'],
        ],
    ];

    $featuredNav = [
        ['name' => 'SEO Audit', 'href' => '/seo-audit-tool'],
        ['name' => 'Schema Generator', 'href' => '/schema-markup-generator'],
        ['name' => 'Backlink Checker', 'href' => '/backlink-checker'],
        ['name' => 'JSON Formatter', 'href' => '/json-formatter'],
        ['name' => 'Image Compressor', 'href' => '/image-compressor'],
    ];

    $currentPath = request()->getPathInfo();
    $isActive = fn (string $href) => $currentPath === $href || str_starts_with($currentPath, $href);
@endphp

<div class="bg-indigo-600 text-white text-xs font-medium text-center py-2 px-4">
    ⚡ SeoKitHub — 10 free SEO & developer tools, no AI costs, no account required.&nbsp;
    <a href="{{ url('/') }}" class="underline underline-offset-2 hover:no-underline">Explore all tools →</a>
</div>

<header class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 gap-6">

            <a href="{{ url('/') }}" class="flex items-center gap-2.5 shrink-0">
                <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <span class="font-bold text-gray-900 text-[17px] tracking-tight">SeoKit<span class="text-indigo-600">Hub</span></span>
            </a>

            {{-- Desktop nav --}}
            <nav class="hidden lg:flex items-center gap-1 flex-1">
                <div class="relative" data-mega-menu>
                    <button type="button" class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors" data-mega-trigger aria-expanded="false">
                        All Tools
                        <svg class="w-3.5 h-3.5 transition-transform duration-150" data-mega-chevron viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6"/></svg>
                    </button>

                    <div class="absolute top-full left-0 mt-1 w-[700px] bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden hidden" data-mega-panel>
                        <div class="grid grid-cols-3 gap-0 divide-x divide-gray-100">
                            @foreach ($megaMenu as $category => $items)
                                <div class="p-5">
                                    <p class="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">{{ $category }}</p>
                                    <ul class="space-y-0.5">
                                        @foreach ($items as $item)
                                            <li>
                                                <a href="{{ url($item['href']) }}" class="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-indigo-50 group transition-colors">
                                                    <div class="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5 transition-colors"></div>
                                                    <div>
                                                        <p class="text-sm font-medium text-gray-800 group-hover:text-indigo-600 leading-tight transition-colors">{{ $item['name'] }}</p>
                                                        <p class="text-xs text-gray-400 mt-0.5 leading-tight">{{ $item['desc'] }}</p>
                                                    </div>
                                                </a>
                                            </li>
                                        @endforeach
                                    </ul>
                                </div>
                            @endforeach
                        </div>
                        <div class="bg-gray-50 border-t border-gray-100 px-5 py-3 flex items-center justify-between">
                            <span class="text-xs text-gray-400">SeoKitHub — 10 free tools, no signup required</span>
                            <a href="{{ url('/') }}" class="text-xs font-semibold text-indigo-600 flex items-center gap-1 hover:underline">View all →</a>
                        </div>
                    </div>
                </div>

                <div class="w-px h-4 bg-gray-200 mx-1"></div>

                @foreach ($featuredNav as $item)
                    <a href="{{ url($item['href']) }}" class="px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap {{ $isActive($item['href']) ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' }}">
                        {{ $item['name'] }}
                    </a>
                @endforeach
            </nav>

            <div class="hidden lg:flex items-center gap-3 shrink-0">
                <a href="{{ url('/') }}" class="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">All Tools</a>
                <a href="{{ url('/seo-audit-tool') }}" class="inline-flex items-center gap-1.5 bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    Try Free
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-7 7 7-7 7"/></svg>
                </a>
            </div>

            <button type="button" class="lg:hidden p-1 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors ml-auto" data-mobile-trigger aria-expanded="false">
                <svg class="w-5 h-5" data-mobile-icon-open viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
                <svg class="w-5 h-5 hidden" data-mobile-icon-close viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
            </button>
        </div>
    </div>

    {{-- Mobile nav drawer --}}
    <div class="lg:hidden bg-white border-t border-gray-100 hidden" data-mobile-panel>
        <div class="max-w-7xl mx-auto px-4 py-4 space-y-4">
            <div>
                <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Popular</p>
                @foreach ($featuredNav as $item)
                    <a href="{{ url($item['href']) }}" class="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                        {{ $item['name'] }}
                    </a>
                @endforeach
            </div>

            @foreach ($megaMenu as $category => $items)
                <div>
                    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">{{ $category }}</p>
                    @foreach ($items as $item)
                        <a href="{{ url($item['href']) }}" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                            <span class="w-6 h-6 rounded-lg bg-gray-100 inline-block shrink-0"></span>
                            {{ $item['name'] }}
                        </a>
                    @endforeach
                </div>
            @endforeach

            <div class="pt-2 border-t border-gray-100">
                <a href="{{ url('/seo-audit-tool') }}" class="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white font-semibold text-sm py-3 rounded-xl hover:bg-indigo-700 transition-colors">
                    Try Free Tools
                </a>
            </div>
        </div>
    </div>
</header>
