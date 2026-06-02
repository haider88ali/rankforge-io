<?php

/**
 * Server-side SEO meta for Google crawlers (initial HTML).
 * Mirrors resources/js/config/toolSeo.js + seo.js
 */

$defaultKeywords = 'seo tool, seo tools, free seo tool, free seo tools, seo tools online, online seo tools, seo tools free, best free seo tools, seo tools no sign up, seo kit, free seo kit, seo kit tools, seo kit online, seo kit free, seo toolkit, seo, free seo, seo online, seo checker, seo analysis, seo optimization, seokithub, seo kit hub, seo kit hub free tools, seokit hub';

$appendKeywords = fn (string $keywords) => $keywords . ', ' . $defaultKeywords;

return [
    'site_name' => 'SeoKitHub',
    'base_url'  => env('APP_URL', 'https://seokithub.com'),
    'og_image'  => rtrim(env('APP_URL', 'https://seokithub.com'), '/') . '/public/favicon.svg',

    'pages' => [
        '/' => [
            'title'       => 'SeoKitHub — 10 Free SEO Tools Online (No Sign-up)',
            'description' => 'Free SEO tools & SEO kit online — backlink checker, SEO audit, schema markup, sitemap generator, robots.txt & more. 100% free, no login. Start optimizing now.',
            'keywords'    => 'seo tools, free seo tools, seo tool, free seo tool, seo tools online, online seo tools, seo kit, free seo kit, seo kit tools, backlink checker, seo audit tool, schema markup generator, sitemap generator, robots txt generator, seokithub, seo kit hub, seo tools no sign up, best free seo tools, seo tools for website, seo tools for marketers, ' . $defaultKeywords,
        ],

        '/backlink-checker' => [
            'title'       => 'Free Backlink Checker Online — No Sign Up, Check Any Domain',
            'description' => 'Free backlink checker online with no sign up. Check backlinks, search link profile, and analyze HTTPS, sitemap & robots.txt for any website. 100% free — instant results.',
            'keywords'    => $appendKeywords('backlink checker, backlink search, check backlink, check backlinks, backlink checker free, free backlink checker, backlink search tool, search backlinks, search backlinks free, find backlinks, backlink lookup, backlink analyzer, check website backlinks, domain backlink checker, inbound link checker, link profile checker, backlink checker online, backlink checker no sign up, free backlink tool, domain link analysis, check backlinks to my site, backlink checker tool, website backlink checker'),
        ],

        '/seo-audit-tool' => [
            'title'       => 'Free Website SEO Audit Tool Online — Instant Score Report',
            'description' => 'Free website SEO audit tool online — no sign up. Check title tags, meta, H1, schema, SSL, robots.txt & 17 factors. Get an instant SEO score report for any URL.',
            'keywords'    => $appendKeywords('seo audit tool, website seo audit, free seo audit, seo checker, seo analysis tool, website seo checker, on page seo audit, seo score checker, free seo checker, check seo of website, seo audit report, technical seo audit, full seo audit free, seo health check, website audit tool free, page seo analyzer, seo audit online, site seo checker, seo audit tool free, website seo analysis'),
        ],

        '/schema-markup-generator' => [
            'title'       => 'Free JSON-LD Generator Online — FAQ, Product & Article Schema',
            'description' => 'Free JSON-LD generator online with no login. Create FAQ, Product, Article & Organization schema markup for Google rich results. Copy or download instantly.',
            'keywords'    => $appendKeywords('schema markup generator, json-ld generator, structured data generator, schema generator free, faq schema generator, product schema markup, article schema generator, organization schema, rich snippets generator, schema.org tool, google structured data, json ld creator, add schema markup, structured data tool free, seo schema generator, rich results tool, schema markup tool online, json ld schema generator, google rich snippets, structured data markup'),
        ],

        '/robots-txt-generator' => [
            'title'       => 'Free Robots.txt Generator Online — Create & Download Instantly',
            'description' => 'Free robots.txt generator online — no sign up. Build user-agent rules, disallow paths, add sitemap URL & crawl-delay. Copy or download robots.txt instantly.',
            'keywords'    => $appendKeywords('robots txt generator, robots.txt generator, create robots txt, robots txt file generator, robots.txt builder, generate robots.txt, robots txt maker, robots txt creator, robots txt tool free, how to create robots.txt, robots txt disallow, robots txt sitemap, robots txt allow, robots txt user agent, crawl rules generator, robots txt best practices, block bots robots txt, seo robots txt, website robots file'),
        ],

        '/xml-sitemap-generator' => [
            'title'       => 'Free XML Sitemap Generator Online — No Sign Up Required',
            'description' => 'Free XML sitemap generator online — no sign up, no limits. Add URLs, set priority & changefreq, download sitemap.xml and submit to Google Search Console.',
            'keywords'    => $appendKeywords('xml sitemap generator, sitemap generator, sitemap.xml generator, create sitemap, free sitemap generator, google sitemap generator, xml sitemap creator, sitemap maker, website sitemap builder, generate sitemap xml, sitemap for seo, submit sitemap to google, sitemap tool free, sitemap generator online, create sitemap.xml, xml sitemap tool, sitemap builder free, google sitemap xml'),
        ],

        '/serp-preview-tool' => [
            'title'       => 'Free SERP Preview Tool — Google Search Result Simulator',
            'description' => 'Preview how your page looks in Google search results. Check title & meta description length on desktop and mobile before publishing. Free, instant, no login.',
            'keywords'    => $appendKeywords('serp preview tool, serp simulator, google serp preview, search result preview, google snippet preview, serp preview free, meta title preview, meta description preview, google search preview tool, seo snippet preview, title tag preview, serp checker, google result preview, mobile serp preview, desktop serp preview, seo title length checker, serp mockup tool'),
        ],

        '/keyword-density-checker' => [
            'title'       => 'Free Keyword Density Checker — Analyze Keyword Frequency in Text',
            'description' => 'Check keyword density and word frequency free. Analyze content for over-optimization, get keyword percentages & suggestions. No sign-up, runs in browser.',
            'keywords'    => $appendKeywords('keyword density checker, keyword density tool, keyword frequency checker, check keyword density, keyword density analyzer, keyword stuffing checker, keyword percentage tool, content keyword analyzer, seo keyword density, keyword count tool, word frequency counter, keyword prominence checker, text keyword analyzer, keyword density calculator free, seo content analyzer'),
        ],

        '/url-slug-generator' => [
            'title'       => 'Free URL Slug Generator — SEO-Friendly Permalink Tool',
            'description' => 'Convert titles to clean SEO-friendly URL slugs free. Remove stop words, set separator & max length. Preview full URL instantly — no login.',
            'keywords'    => $appendKeywords('url slug generator, slug generator, seo url generator, permalink generator, seo friendly url, url slug maker, convert title to url, clean url generator, blog post slug generator, wordpress slug generator, url converter free, seo permalink tool, post slug generator, url friendly slug, remove stop words url'),
        ],

        '/json-formatter' => [
            'title'       => 'Free JSON Formatter & Validator — Beautify JSON Online',
            'description' => 'Format, beautify, minify & validate JSON free in your browser. Fix syntax errors instantly — nothing sent to any server. No sign-up.',
            'keywords'    => $appendKeywords('json formatter, json validator, json beautifier, json formatter online, format json, validate json, json pretty print, json minifier, json lint, json checker, beautify json online, json editor, fix json errors, json parser, json viewer free, json syntax checker, minify json, json formatter free'),
        ],

        '/image-compressor' => [
            'title'       => 'Free Image Compressor — Compress JPG, PNG & WebP Online',
            'description' => 'Compress images free in your browser. Reduce JPG, PNG & WebP file size without uploading to servers. Drag & drop, adjust quality, download instantly.',
            'keywords'    => $appendKeywords('image compressor, compress image online, image compressor free, reduce image size, jpg compressor, png compressor, webp compressor, image optimizer, compress photo online, reduce file size image, image compression tool, shrink image, compress image without losing quality, bulk image compressor, browser image compressor, seo image optimization'),
        ],
    ],
];
