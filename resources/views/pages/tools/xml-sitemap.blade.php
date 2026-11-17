@extends('layouts.app')

@section('content')
    <x-tool-page
        title="Free XML Sitemap Generator"
        seoTitle="Free XML Sitemap Generator – No Sign Up"
        seoDescription="Generate sitemap.xml free online — no sign up. Add URLs, set priority & changefreq, then submit to Google Search Console in minutes."
        breadcrumb="XML Sitemap Generator"
        :howTo="[
            ['title' => 'Add Your URLs', 'desc' => 'Enter each page URL one by one, or use the bulk import to paste multiple URLs at once.'],
            ['title' => 'Set Priority & Frequency', 'desc' => 'Configure the crawl priority (0.1–1.0) and how often each page changes to guide search engine crawlers.'],
            ['title' => 'Download & Submit', 'desc' => 'Download your sitemap.xml and upload it to your server root. Then submit it in Google Search Console.'],
        ]"
        :faqs="[
            ['q' => 'Where does sitemap.xml go?', 'a' => 'Upload to your site root at yourdomain.com/sitemap.xml.'],
            ['q' => 'How do I submit it to Google?', 'a' => 'Google Search Console → Sitemaps → enter sitemap.xml → Submit.'],
            ['q' => 'What does priority mean?', 'a' => 'Relative importance (0.1–1.0). Homepage is usually 1.0. It doesn\'t directly affect rankings.'],
            ['q' => 'How many URLs can I add?', 'a' => 'No limit in our tool. Google accepts up to 50,000 URLs per sitemap file.'],
        ]"
        :relatedTools="[
            ['name' => 'Robots.txt Generator', 'href' => '/robots-txt-generator', 'desc' => 'Add your sitemap URL to your robots.txt file.'],
            ['name' => 'Schema Markup Generator', 'href' => '/schema-markup-generator', 'desc' => 'Add structured data to your pages after indexing.'],
            ['name' => 'SEO Audit Tool', 'href' => '/seo-audit-tool', 'desc' => 'Audit the pages you are adding to your sitemap.'],
        ]"
        :seoContent="[
            ['heading' => 'Why You Need an XML Sitemap', 'paragraphs' => [
                'An XML sitemap lists all important pages on your website and helps search engines discover and index them faster. While Google can crawl sites without a sitemap, having one is especially important for new websites, large sites, and pages with few internal links.',
                'SeoKitHub\'s XML sitemap generator creates a standards-compliant sitemap.xml file you can upload to your server root and submit to Google Search Console and Bing Webmaster Tools. Pair it with <a href=\'/schema-markup-generator\'>schema markup on your pages</a> and <a href=\'/robots-txt-generator\'>control over what Google crawls</a> for a complete technical setup.',
            ]],
            ['heading' => 'How to Submit Your Sitemap to Google', 'paragraphs' => [
                'After generating and uploading sitemap.xml to your website, open Google Search Console → Sitemaps → enter the URL (e.g. https://yoursite.com/sitemap.xml) → Submit. Google will begin crawling the listed URLs, usually within a few days for new sites.',
            ]],
        ]"
    >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" id="sitemap-app">
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <h2 class="font-bold text-gray-900">URLs <span class="text-gray-400 font-normal">(<span id="sitemap-url-count">2</span>)</span></h2>
                    <button type="button" id="sitemap-toggle-bulk" class="flex items-center gap-1.5 text-sm text-indigo-600 hover:underline">⭱ Bulk import</button>
                </div>

                <div id="sitemap-bulk-box" class="hidden bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-3">
                    <p class="text-sm font-medium text-blue-800">Paste one URL per line</p>
                    <textarea id="sitemap-bulk-text" rows="5" placeholder="https://example.com/page-1&#10;https://example.com/page-2" class="w-full border border-blue-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"></textarea>
                    <div class="flex gap-2">
                        <button type="button" id="sitemap-import-bulk" class="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700">Import URLs</button>
                        <button type="button" id="sitemap-cancel-bulk" class="px-4 py-2 bg-white text-gray-600 text-sm rounded-lg border border-gray-200">Cancel</button>
                    </div>
                </div>

                <div class="space-y-3 max-h-[520px] overflow-y-auto pr-1" id="sitemap-url-list"></div>

                <button type="button" id="sitemap-add-url" class="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl p-4 text-sm text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors">+ Add URL</button>
            </div>

            <div class="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 lg:sticky lg:top-24 self-start">
                <div class="flex justify-between items-center">
                    <h2 class="font-bold text-gray-900">sitemap.xml</h2>
                    <span class="text-xs text-gray-400"><span id="sitemap-output-count">2</span> URLs</span>
                </div>
                <pre id="sitemap-output" class="bg-gray-50 rounded-xl p-4 text-xs font-mono text-gray-700 overflow-auto max-h-[480px] leading-relaxed"></pre>
                <div class="flex gap-2">
                    <button type="button" data-copy-target="#sitemap-output" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">Copy</button>
                    <button type="button" data-download-target="#sitemap-output" data-download-name="sitemap.xml" data-download-type="application/xml" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">Download .xml</button>
                </div>
            </div>
        </div>
    </x-tool-page>
@endsection

@push('scripts')
    <script src="{{ asset('js/tools/xml-sitemap.js') }}" defer></script>
@endpush
