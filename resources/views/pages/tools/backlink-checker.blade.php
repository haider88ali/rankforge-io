@extends('layouts.app')

@section('content')
    <x-tool-page
        title="Free Backlink Checker – Analyze Any Domain"
        seoTitle="Free Backlink Checker – No Sign Up Required"
        seoDescription="Check any domain's SEO health free — no sign up. Verify HTTPS, sitemap, robots.txt &amp; meta tags instantly. Domain analysis tool, no account required."
        breadcrumb="Backlink Checker"
        :howTo="[
            ['title' => 'Enter a Domain', 'desc' => 'Type any domain name (e.g. example.com) — no need to include https://.'],
            ['title' => 'View Domain Signals', 'desc' => 'We check HTTPS, title, meta description, robots.txt, sitemap, and indexed URL count.'],
            ['title' => 'Find Backlink Data', 'desc' => 'Use the direct links to free tools like Ahrefs Free, Moz Link Explorer and Majestic to see actual backlinks.'],
        ]"
        :faqs="[
            ['q' => 'Why don\'t I see exact backlink counts?', 'a' => 'Full backlink databases cost millions to build. We check domain health signals and link you to free tools (Ahrefs, Moz, Search Console) for actual backlink data.'],
            ['q' => 'Do I need to type https://?', 'a' => 'No — just enter the domain, like example.com.'],
            ['q' => 'What does this tool check?', 'a' => 'HTTPS, title tag, meta description, robots.txt, XML sitemap, and indexed page count.'],
            ['q' => 'Is it free? Do I need an account?', 'a' => 'Yes, 100% free. No sign up required.'],
        ]"
        :relatedTools="[
            ['name' => 'SEO Audit Tool', 'href' => '/seo-audit-tool', 'desc' => 'Run a full on-page SEO analysis on any URL.'],
            ['name' => 'XML Sitemap Generator', 'href' => '/xml-sitemap-generator', 'desc' => 'Create a sitemap to help Google index your pages.'],
            ['name' => 'Schema Markup Generator', 'href' => '/schema-markup-generator', 'desc' => 'Add structured data to improve your search presence.'],
        ]"
        :seoContent="[
            ['heading' => 'What Is a Backlink Checker?', 'paragraphs' => [
                'A backlink checker is an SEO tool that helps you discover which websites link to a domain. Backlinks are one of Google\'s strongest ranking signals — the more high-quality sites that link to you, the better your chances of ranking on page one.',
                'SeoKitHub\'s free backlink checker lets you analyze any domain instantly. Enter a website URL and we check critical SEO health signals — SSL/HTTPS, robots.txt, XML sitemap, meta tags, and indexed page count — then point you to trusted free sources for full backlink data.',
            ]],
            ['heading' => 'Why Check Backlinks for SEO?', 'paragraphs' => [
                'Monitoring backlinks helps you understand your link profile, spot toxic links, track competitor strategies, and find new link-building opportunities. Whether you run a blog, e-commerce store, or agency client site, regular backlink checks should be part of your SEO workflow.',
            ], 'list' => [
                'Discover who links to your website and your competitors',
                'Verify domain health signals that affect crawlability and rankings',
                'Find free backlink data from Ahrefs, Moz, and Majestic',
                'No account, no credit card — 100% free on SeoKitHub',
            ]],
        ]"
    >
        <div id="backlink-app" class="space-y-6">
            <div class="bg-white rounded-2xl border border-gray-200 p-7">
                <label class="block text-sm font-semibold text-gray-700 mb-3">Domain Name</label>
                <div class="flex gap-3">
                    <div class="flex-1 flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
                        <span class="px-3 text-sm text-gray-400 bg-gray-50 border-r border-gray-300 py-3 shrink-0">https://</span>
                        <input id="backlink-domain" type="text" placeholder="example.com" class="flex-1 px-4 py-3 text-sm focus:outline-none">
                    </div>
                    <button id="backlink-run" type="button"
                        class="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap">
                        <span id="backlink-run-label">Analyze Domain</span>
                    </button>
                </div>
                <p id="backlink-error" class="mt-3 text-sm text-red-600 hidden"></p>
            </div>

            <div id="backlink-results" class="space-y-6 hidden">
                <div class="bg-white rounded-2xl border border-gray-200 p-7">
                    <h2 class="font-bold text-gray-900 mb-5">Domain Health Signals — <span id="backlink-domain-label" class="text-indigo-600"></span></h2>
                    <div id="backlink-signals" class="grid grid-cols-1 sm:grid-cols-2 gap-3"></div>
                </div>

                <div class="bg-white rounded-2xl border border-gray-200 p-7">
                    <h2 class="font-bold text-gray-900 mb-2">Free Backlink Data Sources</h2>
                    <p class="text-sm text-gray-500 mb-5">Click any tool below to see actual backlink data for <strong id="backlink-domain-label2"></strong>.</p>
                    <div id="backlink-opportunities" class="space-y-3"></div>
                </div>

                <div class="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <div class="flex items-start gap-3">
                        <span class="text-blue-500 shrink-0 mt-0.5">ℹ</span>
                        <div>
                            <h3 class="font-semibold text-blue-900 mb-2">Best Free Option: Google Search Console</h3>
                            <p class="text-sm text-blue-700 leading-relaxed">
                                For your <strong>own website</strong>, Google Search Console is completely free and shows all your backlinks directly from Google's index — no limits, no cost.
                                Go to <strong>Search Console → Links → Top linking sites</strong>.
                            </p>
                            <a href="https://search.google.com/search-console/" target="_blank" rel="noopener"
                                class="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-blue-600 hover:underline">
                                Open Google Search Console →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </x-tool-page>
@endsection

@push('scripts')
    <script src="{{ asset('js/tools/backlink-checker.js') }}" defer></script>
@endpush
