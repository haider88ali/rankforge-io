@extends('layouts.app')

@section('content')
    <x-tool-page
        title="Free Schema Markup Generator"
        seoTitle="Free Schema Markup Generator – No Login"
        seoDescription="Generate valid JSON-LD schema markup free — no signup. Create FAQ, Product, Article & Organization structured data for Google rich results instantly."
        breadcrumb="Schema Markup Generator"
        :howTo="[
            ['title' => 'Choose Schema Type', 'desc' => 'Select the type of schema that matches your page — FAQ, Product, Article, or Organization.'],
            ['title' => 'Fill in the Details', 'desc' => 'Complete the form fields with your page data. The JSON-LD output updates live as you type.'],
            ['title' => 'Copy & Paste into HTML', 'desc' => 'Copy the generated script tag and paste it inside the <head> of your HTML page.'],
        ]"
        :faqs="[
            ['q' => 'Where do I paste the generated code?', 'a' => 'Add the script tag inside your page\'s <head> or before </body>.'],
            ['q' => 'Which schema type should I pick?', 'a' => 'FAQ for Q&A pages, Product for shop items, Article for blog posts, Organization for your homepage.'],
            ['q' => 'Is the output valid JSON-LD?', 'a' => 'Yes — copy the code and test it in Google\'s Rich Results Test.'],
            ['q' => 'Does schema improve rankings?', 'a' => 'Not directly, but rich results (stars, FAQs) can boost click-through rates.'],
        ]"
        :relatedTools="[
            ['name' => 'Robots.txt Generator', 'href' => '/robots-txt-generator', 'desc' => 'Control how search engines crawl your site.'],
            ['name' => 'XML Sitemap Generator', 'href' => '/xml-sitemap-generator', 'desc' => 'Create a sitemap.xml to help Google index your pages.'],
            ['name' => 'SERP Preview Tool', 'href' => '/serp-preview-tool', 'desc' => 'Preview how your rich results look in Google.'],
        ]"
        :seoContent="[
            ['heading' => 'What Is Schema Markup?', 'paragraphs' => [
                'Schema markup (structured data) is code you add to your website to help search engines understand your content. When implemented correctly using JSON-LD format, it can earn rich results in Google — FAQ dropdowns, product ratings, article cards, and organization knowledge panels.',
                'SeoKitHub\'s schema markup generator creates valid JSON-LD you can copy and paste into your site\'s <head> or before </body>. Supports FAQ, Product, Article, and Organization schema types.',
            ]],
            ['heading' => 'Why Use Structured Data for SEO?', 'paragraphs' => [
                'Rich results stand out in search results and typically earn higher click-through rates. FAQ schema can expand your listing to take more SERP space. Product schema shows price and availability. Article schema helps Google classify blog content correctly.',
            ]],
        ]"
    >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" id="schema-app">
            <div class="space-y-5">
                <div class="bg-white rounded-2xl border border-gray-200 p-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-3">Schema Type</label>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <button type="button" data-schema-type="FAQ" class="schema-type-btn py-2.5 rounded-xl text-sm font-semibold transition-colors bg-indigo-600 text-white">FAQ</button>
                        <button type="button" data-schema-type="Product" class="schema-type-btn py-2.5 rounded-xl text-sm font-semibold transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200">Product</button>
                        <button type="button" data-schema-type="Article" class="schema-type-btn py-2.5 rounded-xl text-sm font-semibold transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200">Article</button>
                        <button type="button" data-schema-type="Organization" class="schema-type-btn py-2.5 rounded-xl text-sm font-semibold transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200">Organization</button>
                    </div>
                </div>

                <div class="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                    <h2 class="font-bold text-gray-900" id="schema-form-title">FAQ Details</h2>
                    <div id="schema-form-faq" class="space-y-3"></div>

                    <div id="schema-form-product" class="space-y-3 hidden">
                        <div><label class="block text-xs font-semibold text-gray-600 mb-1.5">Product Name</label><input data-field="product.name" placeholder="iPhone 15 Pro" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></div>
                        <div><label class="block text-xs font-semibold text-gray-600 mb-1.5">Description</label><textarea rows="2" data-field="product.description" placeholder="Product description..." class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"></textarea></div>
                        <div class="grid grid-cols-2 gap-3">
                            <div><label class="block text-xs font-semibold text-gray-600 mb-1.5">Brand</label><input data-field="product.brand" placeholder="Apple" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></div>
                            <div><label class="block text-xs font-semibold text-gray-600 mb-1.5">Price</label><input data-field="product.price" placeholder="999" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></div>
                            <div><label class="block text-xs font-semibold text-gray-600 mb-1.5">Currency</label><input data-field="product.currency" placeholder="USD" value="USD" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></div>
                            <div><label class="block text-xs font-semibold text-gray-600 mb-1.5">Rating (1-5)</label><input data-field="product.rating" placeholder="4.8" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></div>
                        </div>
                        <div><label class="block text-xs font-semibold text-gray-600 mb-1.5">Image URL</label><input data-field="product.image" placeholder="https://..." class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></div>
                    </div>

                    <div id="schema-form-article" class="space-y-3 hidden">
                        <div><label class="block text-xs font-semibold text-gray-600 mb-1.5">Headline</label><input data-field="article.headline" placeholder="Article title..." class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></div>
                        <div><label class="block text-xs font-semibold text-gray-600 mb-1.5">Description</label><textarea rows="2" data-field="article.description" placeholder="Brief description..." class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"></textarea></div>
                        <div class="grid grid-cols-2 gap-3">
                            <div><label class="block text-xs font-semibold text-gray-600 mb-1.5">Author</label><input data-field="article.author" placeholder="John Doe" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></div>
                            <div><label class="block text-xs font-semibold text-gray-600 mb-1.5">Publisher</label><input data-field="article.publisher" placeholder="My Blog" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></div>
                            <div><label class="block text-xs font-semibold text-gray-600 mb-1.5">Date Published</label><input type="date" data-field="article.datePublished" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></div>
                            <div><label class="block text-xs font-semibold text-gray-600 mb-1.5">Date Modified</label><input type="date" data-field="article.dateModified" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></div>
                        </div>
                        <div><label class="block text-xs font-semibold text-gray-600 mb-1.5">Image URL</label><input data-field="article.image" placeholder="https://..." class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></div>
                    </div>

                    <div id="schema-form-organization" class="space-y-3 hidden">
                        <div><label class="block text-xs font-semibold text-gray-600 mb-1.5">Organization Name</label><input data-field="org.name" placeholder="Acme Corp" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></div>
                        <div><label class="block text-xs font-semibold text-gray-600 mb-1.5">Website</label><input data-field="org.url" placeholder="https://acme.com" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></div>
                        <div><label class="block text-xs font-semibold text-gray-600 mb-1.5">Logo URL</label><input data-field="org.logo" placeholder="https://acme.com/logo.png" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></div>
                        <div><label class="block text-xs font-semibold text-gray-600 mb-1.5">Description</label><textarea rows="2" data-field="org.description" placeholder="What we do..." class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"></textarea></div>
                        <div><label class="block text-xs font-semibold text-gray-600 mb-1.5">Phone</label><input data-field="org.phone" placeholder="+1-800-000-0000" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></div>
                        <div><label class="block text-xs font-semibold text-gray-600 mb-1.5">Social Profiles (one per line)</label><textarea rows="3" data-field="org.social" placeholder="https://twitter.com/acme&#10;https://linkedin.com/in/acme" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"></textarea></div>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 lg:sticky lg:top-24 self-start">
                <div class="flex items-center justify-between">
                    <h2 class="font-bold text-gray-900">JSON-LD Output</h2>
                    <span id="schema-valid-badge" class="flex items-center gap-1.5 text-xs font-semibold text-green-600">✓ Valid Schema</span>
                </div>
                <pre id="schema-output" class="bg-gray-50 rounded-xl p-4 text-xs font-mono text-gray-700 overflow-auto max-h-96 leading-relaxed whitespace-pre-wrap"></pre>
                <div class="flex gap-2">
                    <button type="button" data-copy-target="#schema-output" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">Copy</button>
                    <button type="button" data-download-target="#schema-output" data-download-name="schema.html" data-download-type="text/html" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">Download</button>
                </div>
            </div>
        </div>
    </x-tool-page>
@endsection

@push('scripts')
    <script src="{{ asset('js/tools/schema-markup.js') }}" defer></script>
@endpush
