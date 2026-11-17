@extends('layouts.app')

@section('content')
    <x-tool-page
        title="Free Keyword Density Checker"
        seoTitle="Free Keyword Density Checker – No Sign Up"
        seoDescription="Check keyword density & word frequency free — no sign up. Spot keyword stuffing, see top keywords & percentages. Analyze your content instantly."
        breadcrumb="Keyword Density Checker"
        :howTo="[
            ['title' => 'Paste Your Content', 'desc' => 'Copy your article, blog post, or any web page text and paste it into the text area below.'],
            ['title' => 'Analyze Instantly', 'desc' => 'The tool automatically calculates word count, keyword frequency, and density percentage for every significant word.'],
            ['title' => 'Review Suggestions', 'desc' => 'Read the NLP-based suggestions to identify over-used keywords or content that needs more depth.'],
        ]"
        :faqs="[
            ['q' => 'What\'s a good keyword density?', 'a' => 'Aim for 0.5–2.5% for your main keyword. Above 3–4% may look like stuffing.'],
            ['q' => 'Why are some words missing?', 'a' => 'Stop words (the, and, is) and words under 3 characters are filtered out.'],
            ['q' => 'Can I search for one keyword?', 'a' => 'Yes — use the filter box above the results table.'],
            ['q' => 'Does keyword density still matter?', 'a' => 'Less than before. Use this tool to catch over-optimization, not to hit a magic number.'],
        ]"
        :relatedTools="[
            ['name' => 'SERP Preview Tool', 'href' => '/serp-preview-tool', 'desc' => 'Preview how your optimized title and description look in Google.'],
            ['name' => 'SEO Audit Tool', 'href' => '/seo-audit-tool', 'desc' => 'Run a full SEO audit after optimizing your content.'],
            ['name' => 'URL Slug Generator', 'href' => '/url-slug-generator', 'desc' => 'Generate a clean URL slug for your content.'],
        ]"
        :seoContent="[
            ['heading' => 'What Is Keyword Density?', 'paragraphs' => [
                'Keyword density is the percentage of times a target keyword appears in your content relative to total word count. While Google no longer uses a fixed ideal density, analyzing keyword frequency helps you avoid over-optimization (keyword stuffing) and ensure your primary topic is clear to both readers and search engines.',
                'SeoKitHub\'s keyword density checker analyzes your text, shows top keywords by frequency, calculates density percentages, and flags potential stuffing issues. Once your content is balanced, <a href=\'/url-slug-generator\'>clean up your URL slug</a> to match.',
            ]],
        ]"
    >
        <div class="space-y-6" id="kd-app">
            <div class="bg-white rounded-2xl border border-gray-200 p-7">
                <label class="block text-sm font-semibold text-gray-700 mb-3">Paste Your Content</label>
                <textarea id="kd-text" rows="12" placeholder="Paste your article, blog post, or any web page content here…" class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono"></textarea>
            </div>

            <div class="grid grid-cols-3 gap-4">
                <div class="bg-white rounded-2xl border border-gray-200 p-5 text-center">
                    <div class="text-3xl font-extrabold text-gray-900" id="kd-total">0</div>
                    <div class="text-sm text-gray-500 mt-1">Total Words</div>
                </div>
                <div class="bg-white rounded-2xl border border-gray-200 p-5 text-center">
                    <div class="text-3xl font-extrabold text-gray-900" id="kd-unique">0</div>
                    <div class="text-sm text-gray-500 mt-1">Unique Keywords</div>
                </div>
                <div class="bg-white rounded-2xl border border-gray-200 p-5 text-center">
                    <div class="text-3xl font-extrabold text-gray-900" id="kd-sentences">0</div>
                    <div class="text-sm text-gray-500 mt-1">Sentences</div>
                </div>
            </div>

            <div id="kd-suggestions" class="space-y-3"></div>

            <div id="kd-table-wrap" class="hidden bg-white rounded-2xl border border-gray-200 p-7 space-y-5">
                <div class="flex items-center justify-between gap-4">
                    <h2 class="font-bold text-gray-900">Keyword Frequency Analysis</h2>
                    <input id="kd-filter" placeholder="Filter keywords…" class="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-44">
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b border-gray-100">
                                <th class="text-left py-2 px-3 text-xs font-bold text-gray-400 uppercase tracking-wide">#</th>
                                <th class="text-left py-2 px-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Keyword</th>
                                <th class="text-right py-2 px-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Count</th>
                                <th class="text-right py-2 px-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Density</th>
                                <th class="py-2 px-3 text-xs font-bold text-gray-400 uppercase tracking-wide w-32">Visual</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-50" id="kd-tbody"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </x-tool-page>
@endsection

@push('scripts')
    <script src="{{ asset('js/tools/keyword-density.js') }}" defer></script>
@endpush
