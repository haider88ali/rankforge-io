@extends('layouts.app')

@section('content')
    <x-tool-page
        seoTitle="Free SEO Audit Tool – Check 17 Factors Free"
    seoDescription="Free on-page SEO audit — no sign up. Checks title, meta, H1, schema, SSL &amp; 12 more factors. Get your instant SEO score report for any URL."
    title="Free Website SEO Audit Tool"
    description="Enter any URL and get an instant SEO score based on 17 on-page and technical checks."
    breadcrumb="SEO Audit Tool"
    :howTo="[
        ['title' => 'Enter Any URL', 'desc' => 'Type or paste the full URL of the page you want to audit (e.g. https://example.com/page).'],
        ['title' => 'Run the Audit', 'desc' => 'Our tool fetches the page and analyzes 17 SEO factors across On-Page, Technical, Social, Content and Performance.'],
        ['title' => 'Fix the Issues', 'desc' => 'Review each check — passes, warnings and failures — and prioritize fixing the red items first.'],
    ]"
    :faqs="[
        ['q' => 'What does the audit check?', 'a' => '17 on-page and technical factors — title, meta, headings, SSL, schema, robots.txt, sitemap, and server response time.'],
        ['q' => 'How is the SEO score calculated?', 'a' => 'Percentage of checks passed. 80+ is strong, 50-79 needs work, below 50 has critical issues.'],
        ['q' => 'Can I audit a competitor\'s site?', 'a' => 'Yes — enter any publicly accessible URL.'],
        ['q' => 'Is this the same as PageSpeed Insights?', 'a' => 'No. We check on-page SEO factors. PageSpeed measures load performance and Core Web Vitals.'],
    ]"
    :relatedTools="[
        ['name' => 'Schema Markup Generator', 'href' => '/schema-markup-generator', 'desc' => 'Fix missing structured data found in your audit.'],
        ['name' => 'Keyword Density Checker', 'href' => '/keyword-density-checker', 'desc' => 'Analyze keyword usage on your audited page.'],
        ['name' => 'Robots.txt Generator', 'href' => '/robots-txt-generator', 'desc' => 'Create a proper robots.txt if your audit flagged it.'],
    ]"
    :seoContent="[
        [
            'heading' => 'What Does Our SEO Audit Tool Check?',
            'paragraphs' => [
                'Our free website SEO audit analyzes 17 on-page and technical SEO factors across six categories: On-Page SEO, Technical SEO, Social & Sharing, Content Quality, Crawlability, and Performance. You get a clear pass/warning/fail report plus an overall SEO score out of 100.',
                'Enter any public URL — your own site, a client project, or a competitor page — and receive actionable insights within seconds. No login required. Once your on-page checks are clean, <a href=\'/backlink-checker\'>check your backlink profile</a> or <a href=\'/serp-preview-tool\'>preview your Google snippet</a> to round out the picture.',
            ],
        ],
        [
            'heading' => 'Why Run a Free SEO Audit?',
            'paragraphs' => ['Regular SEO audits catch issues before they hurt rankings. Common problems our tool finds include missing meta descriptions, duplicate title tags, broken heading structure, missing schema markup, slow server response times, and blocked crawl paths in robots.txt. Head <a href=\'/\'>back to all free SEO tools</a> to keep optimizing.'],
            'list' => [
                'Title tag and meta description optimization',
                'H1/H2 heading structure analysis',
                'HTTPS, viewport, and canonical tag checks',
                'Open Graph and Twitter Card validation',
                'Structured data and robots.txt detection',
            ],
        ],
    ]"
>
    <div id="seo-audit-app" class="space-y-6">
        <div class="bg-white rounded-2xl border border-gray-200 p-7">
            <label class="block text-sm font-semibold text-gray-700 mb-3">Website URL to Audit</label>
            <div class="flex gap-3">
                <input id="seo-audit-url" type="text" placeholder="https://example.com"
                    class="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <button id="seo-audit-run" type="button"
                    class="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap">
                    <span id="seo-audit-run-label">Run SEO Audit</span>
                </button>
            </div>
            <p id="seo-audit-error" class="mt-3 text-sm text-red-600 hidden"></p>
        </div>

        <div id="seo-audit-results" class="space-y-6 hidden">
            <div class="bg-white rounded-2xl border border-gray-200 p-8">
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-8 items-center">
                    <div class="sm:col-span-1">
                        <div class="relative w-36 h-36 mx-auto">
                            <svg class="w-full h-full -rotate-90" viewBox="0 0 128 128">
                                <circle cx="64" cy="64" r="54" fill="none" stroke="#f3f4f6" stroke-width="12"></circle>
                                <circle id="seo-audit-score-ring" cx="64" cy="64" r="54" fill="none" stroke="#22c55e" stroke-width="12" stroke-dasharray="0 339" stroke-linecap="round" style="transition: stroke-dasharray 1s ease"></circle>
                            </svg>
                            <div class="absolute inset-0 flex flex-col items-center justify-center">
                                <span id="seo-audit-score" class="text-4xl font-extrabold text-gray-900">0</span>
                                <span class="text-xs text-gray-400 font-medium">/ 100</span>
                            </div>
                        </div>
                        <p class="text-center mt-3 text-sm font-semibold text-gray-600">SEO Score</p>
                    </div>
                    <div class="sm:col-span-3 grid grid-cols-3 gap-4">
                        <div class="text-center bg-green-50 rounded-2xl p-5 border border-green-100">
                            <div id="seo-audit-pass" class="text-4xl font-extrabold text-green-600">0</div>
                            <div class="text-sm text-green-700 font-medium mt-1">Passed</div>
                        </div>
                        <div class="text-center bg-amber-50 rounded-2xl p-5 border border-amber-100">
                            <div id="seo-audit-warning" class="text-4xl font-extrabold text-amber-500">0</div>
                            <div class="text-sm text-amber-700 font-medium mt-1">Warnings</div>
                        </div>
                        <div class="text-center bg-red-50 rounded-2xl p-5 border border-red-100">
                            <div id="seo-audit-fail" class="text-4xl font-extrabold text-red-500">0</div>
                            <div class="text-sm text-red-700 font-medium mt-1">Failed</div>
                        </div>
                    </div>
                </div>
                <div id="seo-audit-meta" class="mt-6 pt-5 border-t border-gray-100 flex flex-wrap gap-4 text-xs text-gray-500"></div>
            </div>

            <div id="seo-audit-tabs" class="flex flex-wrap gap-2"></div>
            <div id="seo-audit-checks" class="space-y-3"></div>
        </div>
    </div>
    </x-tool-page>
@endsection

@push('scripts')
    <script src="{{ asset('js/tools/seo-audit.js') }}" defer></script>
@endpush
