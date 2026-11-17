@extends('layouts.app')

@section('content')
    <x-tool-page
        title="Free URL Slug Generator"
        seoTitle="Free URL Slug Generator – SEO-Friendly URLs"
        seoDescription="Convert any title to a clean SEO-friendly URL slug free — no account needed. Remove stop words, set separator & preview your full URL instantly."
        breadcrumb="URL Slug Generator"
        :howTo="[
            ['title' => 'Enter Your Page Title', 'desc' => 'Type or paste your blog post title, page title, or any text you want to turn into a URL slug.'],
            ['title' => 'Customize the Options', 'desc' => 'Choose your separator (hyphen or underscore), toggle stop word removal, and set a max character length.'],
            ['title' => 'Copy the Slug or Full URL', 'desc' => 'Copy the slug alone or the full URL with your base domain. Use it in your CMS, WordPress, or any website.'],
        ]"
        :faqs="[
            ['q' => 'Hyphens or underscores?', 'a' => 'Use hyphens. Google reads them as spaces. Underscores don\'t.'],
            ['q' => 'Should I remove stop words?', 'a' => 'Usually yes — shorter URLs are cleaner. Keep them if meaning changes.'],
            ['q' => 'How long should a slug be?', 'a' => '3–5 words, under 60 characters. Put your main keyword first.'],
            ['q' => 'What characters are allowed?', 'a' => 'Lowercase letters, numbers, and hyphens only. Special characters are removed automatically.'],
        ]"
        :relatedTools="[
            ['name' => 'SERP Preview Tool', 'href' => '/serp-preview-tool', 'desc' => 'Preview how your URL and title look in Google.'],
            ['name' => 'SEO Audit Tool', 'href' => '/seo-audit-tool', 'desc' => 'Audit the page you are building the slug for.'],
            ['name' => 'Schema Markup Generator', 'href' => '/schema-markup-generator', 'desc' => 'Add structured data for rich results in the SERP.'],
        ]"
        :seoContent="[
            ['heading' => 'Why SEO-Friendly URL Slugs Matter', 'paragraphs' => [
                'URL slugs are the readable part of a web address (e.g. /free-backlink-checker). Clean, keyword-rich slugs help users understand page content before clicking and give search engines a clear signal about page topic. Avoid long strings of numbers, special characters, and unnecessary stop words.',
                'Our URL slug generator converts any title into a clean, lowercase, hyphenated slug optimized for SEO — with options to remove stop words and limit length. Before you publish, <a href=\'/keyword-density-checker\'>check keyword density on the page</a> the slug belongs to.',
            ]],
        ]"
    >
        <div class="space-y-6" id="slug-app">
            <div class="bg-white rounded-2xl border border-gray-200 p-7 space-y-5">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Page Title / Text <span class="text-red-400">*</span></label>
                    <input id="slug-input" placeholder="e.g. How to Write a Meta Description That Gets Clicks" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <div class="flex flex-wrap gap-2 mt-3">
                        <span class="text-xs text-gray-400">Examples:</span>
                        <button type="button" class="slug-example text-xs text-indigo-600 hover:underline truncate max-w-[200px]">How to Write a Meta Description That Gets Clicks</button>
                        <button type="button" class="slug-example text-xs text-indigo-600 hover:underline truncate max-w-[200px]">Top 10 SEO Tools for Small Business in 2026</button>
                        <button type="button" class="slug-example text-xs text-indigo-600 hover:underline truncate max-w-[200px]">What Is Schema Markup & Why Does It Matter?</button>
                        <button type="button" class="slug-example text-xs text-indigo-600 hover:underline truncate max-w-[200px]">The Complete Guide to Robots.txt Files</button>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Base URL (optional)</label>
                    <input id="slug-base-url" value="https://seokithub.com/blog/" placeholder="https://yourdomain.com/blog/" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2 border-t border-gray-100">
                    <div>
                        <label class="block text-xs font-semibold text-gray-600 mb-2">Separator</label>
                        <div class="flex gap-2">
                            <button type="button" data-separator="-" class="slug-sep-btn flex-1 py-2 rounded-lg text-sm font-medium transition-colors bg-indigo-600 text-white">Hyphen &nbsp;-</button>
                            <button type="button" data-separator="_" class="slug-sep-btn flex-1 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200">Underscore _</button>
                        </div>
                        <p id="slug-sep-warning" class="text-xs text-amber-600 mt-1 hidden">⚠ Google recommends hyphens over underscores.</p>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-gray-600 mb-2">Remove Stop Words</label>
                        <button type="button" id="slug-stopwords-btn" class="w-full py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200">Off — keep all words</button>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-gray-600 mb-2">Max Length: <span id="slug-maxlen-label">60</span> chars</label>
                        <input type="range" id="slug-maxlen" min="20" max="120" value="60" class="w-full accent-indigo-600 mt-2">
                        <div class="flex justify-between text-xs text-gray-400 mt-1"><span>20</span><span>120</span></div>
                    </div>
                </div>
            </div>

            <div id="slug-output" class="space-y-4 hidden">
                <div class="bg-white rounded-2xl border border-gray-200 p-7 space-y-4">
                    <div class="flex items-center justify-between">
                        <h2 class="font-bold text-gray-900">Generated Slug</h2>
                        <span id="slug-score-badge" class="text-xs font-bold px-2.5 py-1 rounded-lg"></span>
                    </div>
                    <div class="bg-gray-50 rounded-xl border border-gray-200 px-5 py-4 flex items-center justify-between gap-4">
                        <code id="slug-value" class="text-indigo-700 font-mono font-semibold text-lg break-all"></code>
                        <button type="button" data-copy-target="#slug-value" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 shrink-0">Copy</button>
                    </div>
                    <div class="flex items-center gap-2 text-xs text-gray-500">
                        <span id="slug-char-count"></span><span>·</span><span id="slug-word-count"></span>
                    </div>
                </div>

                <div class="bg-white rounded-2xl border border-indigo-200 p-7 space-y-4">
                    <div class="flex items-center gap-2">
                        <h2 class="font-bold text-gray-900">🔗 Full URL Preview</h2>
                    </div>
                    <div class="bg-indigo-50 rounded-xl border border-indigo-100 px-5 py-4 flex items-center justify-between gap-4">
                        <code id="slug-full-url" class="text-indigo-800 font-mono text-sm break-all"></code>
                        <button type="button" data-copy-target="#slug-full-url" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 shrink-0">Copy</button>
                    </div>
                </div>

                <div id="slug-tips" class="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800 space-y-1 hidden">
                    <p class="font-semibold">Improve your slug:</p>
                    <div id="slug-tips-list"></div>
                </div>
            </div>
        </div>
    </x-tool-page>
@endsection

@push('scripts')
    <script src="{{ asset('js/tools/url-slug-generator.js') }}" defer></script>
@endpush
