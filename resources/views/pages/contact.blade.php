@extends('layouts.app')

@php $contactEmail = 'ali88haider8875@gmail.com'; @endphp

@section('content')
    <x-static-page
        title="Contact SeoKitHub – Free SEO Tools Support"
        description="Get in touch with SeoKitHub for feedback, bug reports, or partnership inquiries. We're here to help with our free SEO tools."
        breadcrumb="Contact"
    >
        <p>We'd love to hear from you. Whether you found a bug, have a feature idea, or want to list SeoKitHub on your directory — reach out anytime.</p>

        <div class="not-prose grid gap-4 my-8">
            <a href="mailto:{{ $contactEmail }}" class="flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-2xl hover:border-indigo-200 hover:shadow-sm transition-all group">
                <div class="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0"></div>
                <div>
                    <p class="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">Email us</p>
                    <p class="text-sm text-gray-500 mt-0.5">{{ $contactEmail }}</p>
                </div>
            </a>

            <div class="flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-2xl">
                <div class="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0"></div>
                <div>
                    <p class="font-semibold text-gray-900">Feature requests</p>
                    <p class="text-sm text-gray-500 mt-0.5">Tell us which SEO tool you'd like us to build next.</p>
                </div>
            </div>

            <div class="flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-2xl">
                <div class="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0"></div>
                <div>
                    <p class="font-semibold text-gray-900">Bug reports</p>
                    <p class="text-sm text-gray-500 mt-0.5">Include the tool name, URL tested, and what went wrong.</p>
                </div>
            </div>
        </div>

        <h2>Before you write</h2>
        <p>
            SeoKitHub tools are free and require no account. For SEO audit or backlink checker issues, include the exact URL or domain you tested.
            For browser tools, note your browser name and version.
        </p>

        <p>See also: <a href="{{ url('/about') }}">About SeoKitHub</a> · <a href="{{ url('/privacy-policy') }}">Privacy Policy</a></p>
    </x-static-page>
@endsection
