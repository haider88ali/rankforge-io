@extends('layouts.app')

@section('content')
    <x-tool-page
        title="Free JSON Formatter & Validator"
        seoTitle="Free JSON Formatter & Validator – No Login"
        seoDescription="Format, beautify, minify & validate JSON free — no signup. Fix syntax errors with line numbers. Data stays in your browser, never uploaded."
        breadcrumb="JSON Formatter"
        :howTo="[
            ['title' => 'Paste Your JSON', 'desc' => 'Paste raw, minified, or malformed JSON into the input editor on the left.'],
            ['title' => 'Choose an Action', 'desc' => 'Click Beautify to format with indentation, Minify to compress it, or Validate to check for errors.'],
            ['title' => 'Copy or Download', 'desc' => 'Copy the formatted result to clipboard or download it as a .json file.'],
        ]"
        :faqs="[
            ['q' => 'Is my data sent to a server?', 'a' => 'No — everything runs in your browser. Your JSON never leaves your device.'],
            ['q' => 'Beautify vs minify — what\'s the difference?', 'a' => 'Beautify adds spacing for readability. Minify removes whitespace for smaller file size.'],
            ['q' => 'Why is my JSON invalid?', 'a' => 'Common fixes: use double quotes, remove trailing commas, match all brackets.'],
            ['q' => 'Can I validate JSON-LD schema here?', 'a' => 'Yes — paste your schema markup and click Validate or Beautify.'],
        ]"
        :relatedTools="[
            ['name' => 'Schema Markup Generator', 'href' => '/schema-markup-generator', 'desc' => 'Generate JSON-LD structured data for your pages.'],
            ['name' => 'Robots.txt Generator', 'href' => '/robots-txt-generator', 'desc' => 'Build your robots.txt file with our free tool.'],
            ['name' => 'Image Compressor', 'href' => '/image-compressor', 'desc' => 'Compress images in the browser — no upload needed.'],
        ]"
        :seoContent="[
            ['heading' => 'JSON Formatter for Developers & SEOs', 'paragraphs' => [
                'JSON (JavaScript Object Notation) is used everywhere in web development — API responses, schema markup, configuration files, and structured data. Our JSON formatter beautifies messy JSON into readable indented format, validates syntax, minifies for production, and highlights errors with line numbers.',
                'Everything runs in your browser. Your data never leaves your device — ideal for sensitive API keys or client data. If you\'re cleaning up a page\'s assets, <a href=\'/image-compressor\'>compress your images too</a> while you\'re at it.',
            ]],
        ]"
    >
        <div class="space-y-5" id="json-app">
            <div class="flex flex-wrap items-center gap-3">
                <button type="button" id="json-beautify" class="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">Beautify</button>
                <button type="button" id="json-minify" class="flex items-center gap-1.5 px-4 py-2.5 bg-gray-800 text-white text-sm font-semibold rounded-xl hover:bg-gray-900 transition-colors">Minify</button>
                <button type="button" id="json-validate" class="flex items-center gap-1.5 px-4 py-2.5 bg-white text-gray-700 text-sm font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">Validate</button>
                <div class="flex items-center gap-2 pl-2 border-l border-gray-200">
                    <span class="text-sm text-gray-500">Indent:</span>
                    <button type="button" data-indent="2" class="json-indent-btn w-8 h-8 rounded-lg text-sm font-semibold bg-indigo-100 text-indigo-700">2</button>
                    <button type="button" data-indent="4" class="json-indent-btn w-8 h-8 rounded-lg text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200">4</button>
                </div>
                <div class="ml-auto flex gap-3">
                    <button type="button" id="json-sample" class="text-sm text-indigo-600 hover:underline">Load sample</button>
                    <button type="button" id="json-clear" class="text-sm text-gray-400 hover:underline">Clear</button>
                </div>
            </div>

            <div id="json-valid-badge" class="hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"></div>
            <div id="json-error" class="hidden bg-red-50 border border-red-200 rounded-2xl px-5 py-4 text-sm text-red-700"></div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div class="space-y-2">
                    <div class="flex justify-between items-center">
                        <label class="text-sm font-semibold text-gray-700">Input JSON</label>
                        <span class="text-xs text-gray-400"><span id="json-char-count">0</span> chars</span>
                    </div>
                    <textarea id="json-input" placeholder="Paste your JSON here…

{
  &quot;key&quot;: &quot;value&quot;
}" rows="22" spellcheck="false" class="w-full border border-gray-300 rounded-2xl px-4 py-3 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none bg-gray-50"></textarea>
                </div>

                <div class="space-y-2">
                    <div class="flex justify-between items-center">
                        <label class="text-sm font-semibold text-gray-700">Output</label>
                        <div class="flex gap-2" id="json-output-actions"></div>
                    </div>
                    <div id="json-output-box" class="rounded-2xl border border-gray-300 px-4 py-3 text-xs font-mono overflow-auto resize-none bg-gray-50 min-h-[35.5rem]">
                        <span class="text-gray-400" id="json-output-placeholder">Output appears here after you click an action…</span>
                        <pre id="json-output" class="hidden text-gray-700 whitespace-pre-wrap"></pre>
                    </div>
                </div>
            </div>
        </div>
    </x-tool-page>
@endsection

@push('scripts')
    <script src="{{ asset('js/tools/json-formatter.js') }}" defer></script>
@endpush
