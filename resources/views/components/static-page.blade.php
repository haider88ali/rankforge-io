@props(['title', 'description', 'breadcrumb'])

<section class="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100 pt-10 pb-12 px-4">
    <div class="max-w-3xl mx-auto">
        <nav class="flex items-center gap-1.5 text-xs text-gray-400 mb-6" aria-label="Breadcrumb">
            <a href="{{ url('/') }}" class="hover:text-indigo-600 transition-colors">Home</a>
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6"/></svg>
            <span class="text-gray-700 font-medium">{{ $breadcrumb }}</span>
        </nav>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{{ $title }}</h1>
        <p class="text-lg text-gray-500 leading-relaxed">{{ $description }}</p>
    </div>
</section>
<section class="max-w-3xl mx-auto px-4 py-14">
    <div class="prose prose-gray prose-sm max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-a:text-indigo-600">
        {{ $slot }}
    </div>
</section>
