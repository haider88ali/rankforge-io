@extends('layouts.app')

@section('content')
    <x-tool-page
        title="Free Image Compressor – No Upload Required"
        seoTitle="Free Image Compressor – No Upload Required"
        seoDescription="Compress JPG, PNG &amp; WebP free — no upload to servers, no sign up. Drag &amp; drop, adjust quality &amp; download smaller files instantly. 100% private."
        breadcrumb="Image Compressor"
        :howTo="[
            ['title' => 'Drag & Drop Your Images', 'desc' => 'Drop your JPG, PNG, or WebP files onto the upload zone, or click to browse and select files.'],
            ['title' => 'Adjust Quality & Size', 'desc' => 'Use the quality slider (10-100%) and max dimension setting to control the compression level.'],
            ['title' => 'Download Compressed Files', 'desc' => 'Click Download on each image or use Download All to save all compressed files at once.'],
        ]"
        :faqs="[
            ['q' => 'Are images uploaded to your server?', 'a' => 'No — compression runs entirely in your browser. Images stay on your device.'],
            ['q' => 'What formats are supported?', 'a' => 'JPG, PNG, and WebP. GIF and SVG are not supported.'],
            ['q' => 'What quality setting should I use?', 'a' => '70-80% for web use. Lower for thumbnails, 85-90% for hero images.'],
            ['q' => 'Can I compress multiple images at once?', 'a' => 'Yes — drag and drop or select multiple files at once.'],
        ]"
        :relatedTools="[
            ['name' => 'SEO Audit Tool', 'href' => '/seo-audit-tool', 'desc' => 'Check the full SEO health of the page where you use these images.'],
            ['name' => 'JSON Formatter', 'href' => '/json-formatter', 'desc' => 'Format and validate JSON data in your browser.'],
            ['name' => 'XML Sitemap Generator', 'href' => '/xml-sitemap-generator', 'desc' => 'Add your image pages to a sitemap for Google.'],
        ]"
        :seoContent="[
            ['heading' => 'Why Image Compression Matters for SEO', 'paragraphs' => [
                'Page speed is a confirmed Google ranking factor, and images are often the largest files on a webpage. Compressing images before upload can reduce page load time by 50-80% without visible quality loss — improving Core Web Vitals scores and search rankings.',
                'SeoKitHub\'s image compressor runs entirely in your browser using the Canvas API. Drag and drop JPG, PNG, or WebP files, adjust quality, and download compressed versions instantly. No server upload means your images stay private.',
            ]],
        ]"
    >
        <div id="imgc-app" class="space-y-6">
            <div class="bg-white rounded-2xl border border-gray-200 p-7 grid grid-cols-1 sm:grid-cols-2 gap-7">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-3">Quality: <span id="imgc-quality-label" class="text-indigo-600">80%</span></label>
                    <input type="range" id="imgc-quality" min="10" max="100" value="80" class="w-full accent-indigo-600">
                    <div class="flex justify-between text-xs text-gray-400 mt-2"><span>Smaller file</span><span>Better quality</span></div>
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-3">Max Dimension: <span id="imgc-maxpx-label" class="text-indigo-600">1920px</span></label>
                    <input type="range" id="imgc-maxpx" min="320" max="4096" step="64" value="1920" class="w-full accent-indigo-600">
                    <div class="flex justify-between text-xs text-gray-400 mt-2"><span>320px</span><span>4096px</span></div>
                </div>
            </div>

            <div id="imgc-dropzone"
                class="border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all border-gray-200 hover:border-indigo-300 hover:bg-gray-50">
                <div class="w-12 h-12 text-gray-300 mx-auto mb-4 text-4xl">⬆</div>
                <p class="text-gray-700 font-semibold text-lg mb-1">Drag &amp; drop images here</p>
                <p class="text-sm text-gray-400">or click to browse — JPG, PNG, WebP supported</p>
                <input id="imgc-file-input" type="file" multiple accept="image/jpeg,image/png,image/webp" class="hidden">
            </div>

            <div id="imgc-savings" class="hidden flex items-center justify-between bg-green-50 border border-green-200 rounded-2xl px-6 py-4">
                <div class="text-sm text-green-800 font-medium">
                    <strong id="imgc-savings-count">0</strong> images compressed — saved <strong id="imgc-savings-bytes">0 B</strong> total
                </div>
                <button id="imgc-download-all" type="button" class="hidden flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors">
                    ⬇ Download All
                </button>
            </div>

            <div id="imgc-cards" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"></div>
        </div>
    </x-tool-page>
@endsection

@push('scripts')
    <script src="{{ asset('js/tools/image-compressor.js') }}" defer></script>
@endpush
