@extends('layouts.app')

@section('content')
    <x-tool-page
        title="Free SERP Preview Tool"
        seoTitle="Free SERP Preview Tool – No Login Required"
        seoDescription="Preview how your page looks on Google before publishing. Check title & meta description width on desktop & mobile. Free SERP simulator, no sign up."
        breadcrumb="SERP Preview Tool"
        :howTo="[
            ['title' => 'Enter Your Page Details', 'desc' => 'Fill in your page title, URL, and meta description. The preview updates in real time as you type.'],
            ['title' => 'Check Pixel Widths', 'desc' => 'Google uses pixel width (not character count) to determine truncation. Aim for under 600px for titles and 920px for descriptions.'],
            ['title' => 'Switch Desktop / Mobile', 'desc' => 'Toggle between desktop and mobile views to see how your snippet looks on different devices.'],
        ]"
        :faqs="[
            ['q' => 'Why does Google truncate my title?', 'a' => 'Titles over ~600px wide get cut off. Keep titles under 55–60 characters.'],
            ['q' => 'What\'s the max description length?', 'a' => '~155 characters on desktop, ~120 on mobile before truncation.'],
            ['q' => 'Will Google always show my description?', 'a' => 'Not always — Google may rewrite it based on the search query.'],
            ['q' => 'Does this match real Google results?', 'a' => 'It\'s an approximation. Actual display varies by device and query.'],
        ]"
        :relatedTools="[
            ['name' => 'SEO Audit Tool', 'href' => '/seo-audit-tool', 'desc' => 'Run a full SEO audit on the page you are previewing.'],
            ['name' => 'URL Slug Generator', 'href' => '/url-slug-generator', 'desc' => 'Create the SEO-friendly URL to use in this preview.'],
            ['name' => 'Schema Markup Generator', 'href' => '/schema-markup-generator', 'desc' => 'Add structured data for rich results in the SERP.'],
        ]"
        :seoContent="[
            ['heading' => 'Why Preview Your SERP Snippet?', 'paragraphs' => [
                'Your title tag and meta description are the first things searchers see in Google results. If your title is too long, Google truncates it with an ellipsis (…) — losing important keywords. If your description is weak, searchers scroll past to competitors.',
                'Our SERP preview tool shows exactly how your listing will appear on desktop and mobile, with pixel-width meters so you know if your title and description fit within Google\'s display limits. Once your snippet looks right, <a href=\'/seo-audit-tool\'>audit the rest of your on-page SEO</a> or <a href=\'/backlink-checker\'>check who\'s linking to this page</a>.',
            ]],
        ]"
    >
        <div class="space-y-6" id="serp-app">
            <div class="bg-white rounded-2xl border border-gray-200 p-7 space-y-5">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Page Title</label>
                    <input id="serp-title" placeholder="e.g. Best Running Shoes 2026 — Expert Reviews & Top Picks" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <div class="mt-2" id="serp-title-bar"></div>
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Page URL</label>
                    <input id="serp-url" placeholder="https://example.com/best-running-shoes" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Meta Description</label>
                    <textarea id="serp-desc" rows="3" placeholder="Write a compelling description that makes people want to click…" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"></textarea>
                    <div class="mt-2" id="serp-desc-bar"></div>
                </div>
            </div>

            <div class="flex gap-2">
                <button type="button" data-serp-view="both" class="serp-view-btn flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors bg-indigo-600 text-white">Both</button>
                <button type="button" data-serp-view="desktop" class="serp-view-btn flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors bg-white text-gray-600 border border-gray-200 hover:bg-gray-50">Desktop</button>
                <button type="button" data-serp-view="mobile" class="serp-view-btn flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors bg-white text-gray-600 border border-gray-200 hover:bg-gray-50">Mobile</button>
            </div>

            <div id="serp-results" class="grid gap-6 grid-cols-1 lg:grid-cols-2">
                <div class="bg-white rounded-2xl border border-gray-200 p-7" id="serp-desktop-result">
                    <div class="flex items-center gap-2 mb-5">
                        <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide">🖥 Desktop Preview</span>
                    </div>
                    <div class="max-w-xl font-sans space-y-1 border border-gray-100 rounded-xl p-5 bg-white">
                        <div class="flex items-center gap-2 text-sm text-gray-600">
                            <div id="serp-desktop-favicon" class="w-5 h-5 rounded-full bg-gray-200 text-[9px] flex items-center justify-center font-bold text-gray-500">E</div>
                            <span class="truncate text-xs" id="serp-desktop-url">example.com/your-page</span>
                        </div>
                        <div class="text-[#1a0dab] text-xl leading-snug hover:underline cursor-pointer" id="serp-desktop-title">Your Page Title Goes Here — Site Name</div>
                        <div class="text-sm text-[#4d5156] leading-relaxed" id="serp-desktop-desc">Your meta description appears here. Write something that makes users want to click through to your page from the search results.</div>
                    </div>
                </div>
                <div class="bg-white rounded-2xl border border-gray-200 p-7" id="serp-mobile-result">
                    <div class="flex items-center gap-2 mb-5">
                        <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide">📱 Mobile Preview</span>
                    </div>
                    <div class="max-w-xs font-sans border border-gray-100 rounded-xl p-4 bg-white mx-auto space-y-1">
                        <div class="flex items-center gap-1.5 text-xs text-gray-500">
                            <div class="w-4 h-4 rounded-full bg-gray-200 text-[8px] flex items-center justify-center text-gray-500 font-bold">G</div>
                            <span class="truncate" id="serp-mobile-url">example.com/page</span>
                        </div>
                        <div class="text-[#1a0dab] text-base font-medium leading-snug hover:underline cursor-pointer" id="serp-mobile-title">Your Page Title</div>
                        <div class="text-xs text-[#4d5156] leading-relaxed" id="serp-mobile-desc">Your meta description preview on mobile devices.</div>
                    </div>
                </div>
            </div>
        </div>
    </x-tool-page>
@endsection

@push('scripts')
    <script src="{{ asset('js/tools/serp-preview.js') }}" defer></script>
@endpush
