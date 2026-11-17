@extends('layouts.app')

@section('content')
    <x-tool-page
        title="Free Robots.txt Generator"
        seoTitle="Free Robots.txt Generator – No Sign Up"
        seoDescription="Create a robots.txt file free — no sign up. Set allow/disallow rules, add sitemap URL & crawl-delay. Copy or download your file instantly."
        breadcrumb="Robots.txt Generator"
        :howTo="[
            ['title' => 'Configure User-Agent Rules', 'desc' => 'Choose which bots to target (all bots with * or specific ones like Googlebot). Add the paths you want to disallow or allow.'],
            ['title' => 'Add Your Sitemap', 'desc' => 'Enter your sitemap.xml URL so search engines can easily find and index all your pages.'],
            ['title' => 'Download & Upload', 'desc' => 'Copy the generated robots.txt or download it. Upload the file to your website root directory (e.g. https://example.com/robots.txt).'],
        ]"
        :faqs="[
            ['q' => 'Where do I upload robots.txt?', 'a' => 'Your website root — it must be at yourdomain.com/robots.txt.'],
            ['q' => 'Does Disallow remove pages from Google?', 'a' => 'No — it blocks crawling only. Use a noindex tag or Search Console to remove indexed pages.'],
            ['q' => 'Should I include my sitemap URL?', 'a' => 'Yes — add Sitemap: https://yourdomain.com/sitemap.xml at the bottom of the file.'],
            ['q' => 'What\'s the difference between Allow and Disallow?', 'a' => 'Disallow blocks paths from crawlers. Allow explicitly permits paths within a blocked section.'],
        ]"
        :relatedTools="[
            ['name' => 'XML Sitemap Generator', 'href' => '/xml-sitemap-generator', 'desc' => 'Create a sitemap.xml to reference in your robots.txt.'],
            ['name' => 'Schema Markup Generator', 'href' => '/schema-markup-generator', 'desc' => 'Add structured data to help search engines understand your pages.'],
            ['name' => 'Keyword Density Checker', 'href' => '/keyword-density-checker', 'desc' => 'Analyze your content for keyword optimization.'],
        ]"
        :seoContent="[
            ['heading' => 'What Is a robots.txt File?', 'paragraphs' => [
                'A robots.txt file tells search engine crawlers which pages they can and cannot access on your website. It lives at yourdomain.com/robots.txt and is one of the first files Googlebot requests when crawling a site.',
                'Our free robots.txt generator helps you create a properly formatted file with user-agent rules, allow/disallow directives, sitemap references, and optional crawl-delay settings — without writing syntax by hand.',
            ]],
            ['heading' => 'Robots.txt Best Practices', 'paragraphs' => [
                'Always include your XML sitemap URL in robots.txt. Block admin panels, duplicate content, and internal search result pages. Never use robots.txt to hide sensitive data — use authentication instead. Test your file after publishing using Google Search Console\'s robots.txt tester. Once it\'s live, <a href=\'/xml-sitemap-generator\'>generate an XML sitemap</a> to reference in it, or <a href=\'/schema-markup-generator\'>add schema markup to your pages</a> next.',
            ]],
        ]"
    >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" id="robots-app">
            <div class="space-y-5">
                <div id="robots-rules"></div>

                <button type="button" id="robots-add-rule" class="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl p-4 text-sm text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors">
                    + Add User-agent Rule
                </button>

                <div class="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
                    <h2 class="font-bold text-gray-900 text-sm">Sitemaps</h2>
                    <div id="robots-sitemaps"></div>
                    <button type="button" id="robots-add-sitemap" class="text-xs text-indigo-600 hover:underline flex items-center gap-1">+ Add sitemap</button>
                </div>

                <div class="bg-white rounded-2xl border border-gray-200 p-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Crawl-delay (seconds, optional)</label>
                    <input type="number" id="robots-crawl-delay" placeholder="e.g. 10" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                </div>
            </div>

            <div class="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 lg:sticky lg:top-24 self-start">
                <h2 class="font-bold text-gray-900">robots.txt Output</h2>
                <pre id="robots-output" class="bg-gray-50 rounded-xl p-4 text-xs font-mono text-gray-700 overflow-auto max-h-[500px] leading-relaxed whitespace-pre-wrap"># Output appears here</pre>
                <div class="flex gap-2">
                    <button type="button" data-copy-target="#robots-output" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">Copy</button>
                    <button type="button" data-download-target="#robots-output" data-download-name="robots.txt" data-download-type="text/plain" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">Download</button>
                </div>
            </div>
        </div>
    </x-tool-page>
@endsection

@push('scripts')
    <script src="{{ asset('js/tools/robots-txt.js') }}" defer></script>
@endpush
