<?php

/**
 * Server-side SEO meta for Google crawlers (initial HTML).
 * Mirrors resources/js/config/toolSeo.js + seo.js
 */

$defaultKeywords = 'free seo tools, seo toolkit, seokithub';

$appendKeywords = fn (string $keywords) => $keywords . ', ' . $defaultKeywords;

return [
    'site_name' => 'SeoKitHub',
    'base_url'  => env('APP_URL', 'https://seokithub.com'),
    'og_image'  => rtrim(env('APP_URL', 'https://seokithub.com'), '/') . '/og-image.png',

    'pages' => [
        '/' => [
            'title'       => 'Free SEO Tools Online – Backlink Checker, Audit & More',
            'description' => '10 free SEO tools — backlink checker, website audit, schema markup, sitemap & robots.txt generator. No sign up, no limits. Start optimizing now.',
            'keywords'    => $appendKeywords('seo tools, backlink checker, seo audit tool, schema markup generator, sitemap generator, robots txt generator'),
        ],

        '/backlink-checker' => [
            'title'       => 'Backlink Checker – Free Tool to Analyze Any Website\'s Backlinks',
            'description' => 'Analyze any website\'s backlinks free — no sign up. Instant domain health report with HTTPS, sitemap & robots.txt checks. Enter a URL and get results in seconds.',
            'keywords'    => $appendKeywords('backlink checker, check backlinks, backlink analyzer, link profile checker'),
        ],

        '/seo-audit-tool' => [
            'title'       => 'SEO Audit Tool – Free Website Checker with Instant Score',
            'description' => 'Run a free SEO audit on any URL — no sign up. Checks 17 factors: title, meta, H1, schema, SSL & more. Get your SEO score report in seconds.',
            'keywords'    => $appendKeywords('seo audit tool, website seo audit, seo checker, technical seo audit'),
        ],

        '/schema-markup-generator' => [
            'title'       => 'Schema Markup Generator – Free JSON-LD for Rich Results',
            'description' => 'Create FAQ, Product, Article & Organization schema markup free. Valid JSON-LD ready to copy — earn rich results in Google search. No login required.',
            'keywords'    => $appendKeywords('schema markup generator, json-ld generator, structured data generator, rich snippets'),
        ],

        '/robots-txt-generator' => [
            'title'       => 'Robots.txt Generator – Create & Download Your File Free',
            'description' => 'Build a robots.txt file in seconds — free, no sign up. Set allow/disallow rules, add your sitemap URL & crawl-delay. Copy or download instantly.',
            'keywords'    => $appendKeywords('robots.txt generator, crawl rules generator, robots txt builder'),
        ],

        '/xml-sitemap-generator' => [
            'title'       => 'XML Sitemap Generator – Free Tool to Submit to Google',
            'description' => 'Generate sitemap.xml free — no sign up, no limits. Add URLs, set priority & changefreq, then download and submit to Google Search Console.',
            'keywords'    => $appendKeywords('xml sitemap generator, sitemap.xml generator, submit sitemap to google'),
        ],

        '/serp-preview-tool' => [
            'title'       => 'SERP Preview Tool – See Exactly How You Look on Google',
            'description' => 'Preview your Google search snippet before publishing. Check title & meta description length on desktop and mobile. Free, instant — no login.',
            'keywords'    => $appendKeywords('serp preview tool, serp simulator, google snippet preview'),
        ],

        '/keyword-density-checker' => [
            'title'       => 'Keyword Density Checker – Free Content Analysis Tool',
            'description' => 'Check keyword density and word frequency free in your browser. Spot over-optimization, see top keywords & percentages. No sign up required.',
            'keywords'    => $appendKeywords('keyword density checker, keyword frequency checker, keyword stuffing checker'),
        ],

        '/url-slug-generator' => [
            'title'       => 'URL Slug Generator – Create SEO-Friendly Links Free',
            'description' => 'Turn any title into a clean, SEO-friendly URL slug free. Remove stop words, set separator & length. Preview your full URL instantly — no login.',
            'keywords'    => $appendKeywords('url slug generator, permalink generator, seo friendly url'),
        ],

        '/json-formatter' => [
            'title'       => 'JSON Formatter – Beautify & Validate JSON Online Free',
            'description' => 'Format, beautify, minify & validate JSON free in your browser. Fix syntax errors with line numbers — your data never leaves your device.',
            'keywords'    => $appendKeywords('json formatter, json validator, json beautifier'),
        ],

        '/image-compressor' => [
            'title'       => 'Image Compressor – Reduce JPG, PNG & WebP Size Free',
            'description' => 'Compress JPG, PNG & WebP images free in your browser — no upload to servers. Drag & drop, adjust quality, download smaller files instantly.',
            'keywords'    => $appendKeywords('image compressor, compress image online, image optimizer'),
        ],

        '/about' => [
            'title'       => 'About SeoKitHub – Free Online SEO Tools',
            'description' => 'SeoKitHub offers 10 free SEO tools for marketers and developers — backlink checker, SEO audit, schema markup, sitemap generator and more. No sign up required.',
            'keywords'    => $appendKeywords('about seokithub'),
        ],

        '/privacy-policy' => [
            'title'       => 'Privacy Policy – SeoKitHub',
            'description' => 'SeoKitHub privacy policy. Browser tools keep your data on your device. No accounts, no ad tracking, minimal server logs.',
            'keywords'    => 'seokithub privacy policy, data policy',
        ],

        '/contact' => [
            'title'       => 'Contact SeoKitHub – Feedback & Support',
            'description' => 'Contact SeoKitHub for feedback, bug reports, feature requests, or partnership inquiries.',
            'keywords'    => 'contact seokithub, seokithub support',
        ],
    ],
];
