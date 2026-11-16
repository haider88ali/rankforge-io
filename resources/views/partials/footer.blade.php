<footer class="bg-gray-950 text-gray-400 mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
            <div class="lg:col-span-2">
                <a href="{{ url('/') }}" class="flex items-center gap-2.5 mb-4">
                    <div class="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    </div>
                    <span class="font-bold text-white text-xl tracking-tight">SeoKit<span class="text-indigo-400">Hub</span></span>
                </a>
                <p class="text-sm text-gray-500 leading-relaxed max-w-xs">
                    SeoKitHub gives you 10 free SEO & developer tools. No AI costs, no account, no limits. Everything runs in your browser.
                </p>
                <div class="flex items-center gap-2 mt-5">
                    <span class="text-xs bg-indigo-900/60 text-indigo-300 font-medium px-2.5 py-1 rounded-full">100% Free</span>
                    <span class="text-xs bg-gray-800 text-gray-400 font-medium px-2.5 py-1 rounded-full">No Sign-up</span>
                    <span class="text-xs bg-gray-800 text-gray-400 font-medium px-2.5 py-1 rounded-full">Browser-Based</span>
                </div>
            </div>

            <div>
                <h3 class="text-white font-semibold text-sm mb-5">SEO Tools</h3>
                <ul class="space-y-3 text-sm">
                    <li><a href="{{ url('/serp-preview-tool') }}" class="hover:text-white transition-colors">SERP Preview Tool</a></li>
                    <li><a href="{{ url('/keyword-density-checker') }}" class="hover:text-white transition-colors">Keyword Density Checker</a></li>
                    <li><a href="{{ url('/seo-audit-tool') }}" class="hover:text-white transition-colors">SEO Audit Tool</a></li>
                    <li><a href="{{ url('/backlink-checker') }}" class="hover:text-white transition-colors">Backlink Checker</a></li>
                </ul>
            </div>

            <div>
                <h3 class="text-white font-semibold text-sm mb-5">Technical SEO</h3>
                <ul class="space-y-3 text-sm">
                    <li><a href="{{ url('/schema-markup-generator') }}" class="hover:text-white transition-colors">Schema Markup Generator</a></li>
                    <li><a href="{{ url('/robots-txt-generator') }}" class="hover:text-white transition-colors">Robots.txt Generator</a></li>
                    <li><a href="{{ url('/xml-sitemap-generator') }}" class="hover:text-white transition-colors">XML Sitemap Generator</a></li>
                </ul>
            </div>

            <div>
                <h3 class="text-white font-semibold text-sm mb-5">Content & Dev</h3>
                <ul class="space-y-3 text-sm">
                    <li><a href="{{ url('/json-formatter') }}" class="hover:text-white transition-colors">JSON Formatter</a></li>
                    <li><a href="{{ url('/image-compressor') }}" class="hover:text-white transition-colors">Image Compressor</a></li>
                    <li><a href="{{ url('/url-slug-generator') }}" class="hover:text-white transition-colors">URL Slug Generator</a></li>
                </ul>
            </div>

            <div>
                <h3 class="text-white font-semibold text-sm mb-5">Company</h3>
                <ul class="space-y-3 text-sm">
                    <li><a href="{{ url('/about') }}" class="hover:text-white transition-colors">About</a></li>
                    <li><a href="{{ url('/privacy-policy') }}" class="hover:text-white transition-colors">Privacy Policy</a></li>
                    <li><a href="{{ url('/contact') }}" class="hover:text-white transition-colors">Contact</a></li>
                </ul>
            </div>
        </div>

        <div class="border-t border-gray-800 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
            <p>© 2026 SeoKitHub — All rights reserved.</p>
            <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                <a href="{{ url('/about') }}" class="hover:text-gray-400 transition-colors">About</a>
                <a href="{{ url('/privacy-policy') }}" class="hover:text-gray-400 transition-colors">Privacy Policy</a>
                <a href="{{ url('/contact') }}" class="hover:text-gray-400 transition-colors">Contact</a>
            </div>
        </div>
    </div>
</footer>
