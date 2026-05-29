/** Enhanced SEO metadata + on-page content for each tool page */

export const TOOL_SEO = {
    backlinkChecker: {
        seoTitle: 'Free Backlink Checker — Check Backlinks & Search Links (No Sign-up)',
        seoDescription: 'Free backlink checker by SeoKitHub. Search backlinks, check backlink profile, analyze HTTPS, sitemap & robots.txt for any domain. 100% free — no login, instant results.',
        seoKeywords: 'backlink checker, backlink search, check backlink, check backlinks, backlink checker free, free backlink checker, backlink search tool, search backlinks, search backlinks free, find backlinks, backlink lookup, backlink analyzer, check website backlinks, domain backlink checker, inbound link checker, link profile checker, backlink checker online, backlink checker no sign up, free backlink tool, domain link analysis, check backlinks to my site, backlink checker tool, website backlink checker',
        seoContent: [
            {
                heading: 'What Is a Backlink Checker?',
                paragraphs: [
                    'A backlink checker is an SEO tool that helps you discover which websites link to a domain. Backlinks are one of Google\'s strongest ranking signals — the more high-quality sites that link to you, the better your chances of ranking on page one.',
                    'SeoKitHub\'s free backlink checker lets you analyze any domain instantly. Enter a website URL and we check critical SEO health signals — SSL/HTTPS, robots.txt, XML sitemap, meta tags, and indexed page count — then point you to trusted free sources for full backlink data.',
                ],
            },
            {
                heading: 'Why Check Backlinks for SEO?',
                paragraphs: [
                    'Monitoring backlinks helps you understand your link profile, spot toxic links, track competitor strategies, and find new link-building opportunities. Whether you run a blog, e-commerce store, or agency client site, regular backlink checks should be part of your SEO workflow.',
                ],
                list: [
                    'Discover who links to your website and your competitors',
                    'Verify domain health signals that affect crawlability and rankings',
                    'Find free backlink data from Ahrefs, Moz, and Majestic',
                    'No account, no credit card — 100% free on SeoKitHub',
                ],
            },
            {
                heading: 'How to Use This Backlink Search Tool',
                paragraphs: [
                    'Type any domain (e.g. example.com) into the checker above and click Analyze Domain. Review the health signals report, then use the linked free tools to see actual backlink counts and referring domains. For your own site, Google Search Console provides the most complete free backlink data directly from Google.',
                ],
            },
        ],
    },

    seoAudit: {
        seoTitle: 'Free SEO Audit Tool — Website SEO Checker & Score (Instant Report)',
        seoDescription: 'Run a free website SEO audit in seconds. Check title tags, meta descriptions, H1, schema, SSL, robots.txt & 17 SEO factors. Get an SEO score — no sign-up required.',
        seoKeywords: 'seo audit tool, website seo audit, free seo audit, seo checker, seo analysis tool, website seo checker, on page seo audit, seo score checker, free seo checker, check seo of website, seo audit report, technical seo audit, full seo audit free, seo health check, website audit tool free, page seo analyzer, seo audit online, site seo checker, seo audit tool free, website seo analysis',
        seoContent: [
            {
                heading: 'What Does Our SEO Audit Tool Check?',
                paragraphs: [
                    'Our free website SEO audit analyzes 17 on-page and technical SEO factors across six categories: On-Page SEO, Technical SEO, Social & Sharing, Content Quality, Crawlability, and Performance. You get a clear pass/warning/fail report plus an overall SEO score out of 100.',
                    'Enter any public URL — your own site, a client project, or a competitor page — and receive actionable insights within seconds. No login required.',
                ],
            },
            {
                heading: 'Why Run a Free SEO Audit?',
                paragraphs: ['Regular SEO audits catch issues before they hurt rankings. Common problems our tool finds include missing meta descriptions, duplicate title tags, broken heading structure, missing schema markup, slow server response times, and blocked crawl paths in robots.txt.'],
                list: [
                    'Title tag and meta description optimization',
                    'H1/H2 heading structure analysis',
                    'HTTPS, viewport, and canonical tag checks',
                    'Open Graph and Twitter Card validation',
                    'Structured data and robots.txt detection',
                ],
            },
        ],
    },

    schemaMarkup: {
        seoTitle: 'Free Schema Markup Generator — JSON-LD Structured Data Tool',
        seoDescription: 'Generate valid JSON-LD schema markup free. Create FAQ, Product, Article & Organization schema for Google rich results. Copy, download — no login needed.',
        seoKeywords: 'schema markup generator, json-ld generator, structured data generator, schema generator free, faq schema generator, product schema markup, article schema generator, organization schema, rich snippets generator, schema.org tool, google structured data, json ld creator, add schema markup, structured data tool free, seo schema generator, rich results tool, schema markup tool online, json ld schema generator, google rich snippets, structured data markup',
        seoContent: [
            {
                heading: 'What Is Schema Markup?',
                paragraphs: [
                    'Schema markup (structured data) is code you add to your website to help search engines understand your content. When implemented correctly using JSON-LD format, it can earn rich results in Google — FAQ dropdowns, product ratings, article cards, and organization knowledge panels.',
                    'SeoKitHub\'s schema markup generator creates valid JSON-LD you can copy and paste into your site\'s <head> or before </body>. Supports FAQ, Product, Article, and Organization schema types.',
                ],
            },
            {
                heading: 'Why Use Structured Data for SEO?',
                paragraphs: ['Rich results stand out in search results and typically earn higher click-through rates. FAQ schema can expand your listing to take more SERP space. Product schema shows price and availability. Article schema helps Google classify blog content correctly.'],
            },
        ],
    },

    robotsTxt: {
        seoTitle: 'Free Robots.txt Generator — Create robots.txt File Online',
        seoDescription: 'Build a valid robots.txt file free. Set user-agent rules, disallow paths, add sitemap URL & crawl-delay. Copy or download instantly — no sign-up.',
        seoKeywords: 'robots txt generator, robots.txt generator, create robots txt, robots txt file generator, robots.txt builder, generate robots.txt, robots txt maker, robots txt creator, robots txt tool free, how to create robots.txt, robots txt disallow, robots txt sitemap, robots txt allow, robots txt user agent, crawl rules generator, robots txt best practices, block bots robots txt, seo robots txt, website robots file',
        seoContent: [
            {
                heading: 'What Is a robots.txt File?',
                paragraphs: [
                    'A robots.txt file tells search engine crawlers which pages they can and cannot access on your website. It lives at yourdomain.com/robots.txt and is one of the first files Googlebot requests when crawling a site.',
                    'Our free robots.txt generator helps you create a properly formatted file with user-agent rules, allow/disallow directives, sitemap references, and optional crawl-delay settings — without writing syntax by hand.',
                ],
            },
            {
                heading: 'Robots.txt Best Practices',
                paragraphs: ['Always include your XML sitemap URL in robots.txt. Block admin panels, duplicate content, and internal search result pages. Never use robots.txt to hide sensitive data — use authentication instead. Test your file after publishing using Google Search Console\'s robots.txt tester.'],
            },
        ],
    },

    xmlSitemap: {
        seoTitle: 'Free XML Sitemap Generator — Create sitemap.xml for Google',
        seoDescription: 'Create a valid XML sitemap free. Add URLs, set priority & changefreq, download sitemap.xml and submit to Google Search Console. No plugin needed.',
        seoKeywords: 'xml sitemap generator, sitemap generator, sitemap.xml generator, create sitemap, free sitemap generator, google sitemap generator, xml sitemap creator, sitemap maker, website sitemap builder, generate sitemap xml, sitemap for seo, submit sitemap to google, sitemap tool free, sitemap generator online, create sitemap.xml, xml sitemap tool, sitemap builder free, google sitemap xml',
        seoContent: [
            {
                heading: 'Why You Need an XML Sitemap',
                paragraphs: [
                    'An XML sitemap lists all important pages on your website and helps search engines discover and index them faster. While Google can crawl sites without a sitemap, having one is especially important for new websites, large sites, and pages with few internal links.',
                    'SeoKitHub\'s XML sitemap generator creates a standards-compliant sitemap.xml file you can upload to your server root and submit to Google Search Console and Bing Webmaster Tools.',
                ],
            },
            {
                heading: 'How to Submit Your Sitemap to Google',
                paragraphs: ['After generating and uploading sitemap.xml to your website, open Google Search Console → Sitemaps → enter the URL (e.g. https://yoursite.com/sitemap.xml) → Submit. Google will begin crawling the listed URLs, usually within a few days for new sites.'],
            },
        ],
    },

    serpPreview: {
        seoTitle: 'Free SERP Preview Tool — Google Search Result Simulator',
        seoDescription: 'Preview how your page looks in Google search results. Check title & meta description length on desktop and mobile before publishing. Free, instant, no login.',
        seoKeywords: 'serp preview tool, serp simulator, google serp preview, search result preview, google snippet preview, serp preview free, meta title preview, meta description preview, google search preview tool, seo snippet preview, title tag preview, serp checker, google result preview, mobile serp preview, desktop serp preview, seo title length checker, serp mockup tool',
        seoContent: [
            {
                heading: 'Why Preview Your SERP Snippet?',
                paragraphs: [
                    'Your title tag and meta description are the first things searchers see in Google results. If your title is too long, Google truncates it with "..." — losing important keywords. If your description is weak, searchers scroll past to competitors.',
                    'Our SERP preview tool shows exactly how your listing will appear on desktop and mobile, with pixel-width meters so you know if your title and description fit within Google\'s display limits.',
                ],
            },
        ],
    },

    keywordDensity: {
        seoTitle: 'Free Keyword Density Checker — Analyze Keyword Frequency in Text',
        seoDescription: 'Check keyword density and word frequency free. Analyze content for over-optimization, get keyword percentages & suggestions. No sign-up, runs in browser.',
        seoKeywords: 'keyword density checker, keyword density tool, keyword frequency checker, check keyword density, keyword density analyzer, keyword stuffing checker, keyword percentage tool, content keyword analyzer, seo keyword density, keyword count tool, word frequency counter, keyword prominence checker, text keyword analyzer, keyword density calculator free, seo content analyzer',
        seoContent: [
            {
                heading: 'What Is Keyword Density?',
                paragraphs: [
                    'Keyword density is the percentage of times a target keyword appears in your content relative to total word count. While Google no longer uses a fixed ideal density, analyzing keyword frequency helps you avoid over-optimization (keyword stuffing) and ensure your primary topic is clear to both readers and search engines.',
                    'SeoKitHub\'s keyword density checker analyzes your text, shows top keywords by frequency, calculates density percentages, and flags potential stuffing issues.',
                ],
            },
        ],
    },

    urlSlugGenerator: {
        seoTitle: 'Free URL Slug Generator — SEO-Friendly Permalink Tool',
        seoDescription: 'Convert titles to clean SEO-friendly URL slugs free. Remove stop words, set separator & max length. Preview full URL instantly — no login.',
        seoKeywords: 'url slug generator, slug generator, seo url generator, permalink generator, seo friendly url, url slug maker, convert title to url, clean url generator, blog post slug generator, wordpress slug generator, url converter free, seo permalink tool, post slug generator, url friendly slug, remove stop words url',
        seoContent: [
            {
                heading: 'Why SEO-Friendly URL Slugs Matter',
                paragraphs: [
                    'URL slugs are the readable part of a web address (e.g. /free-backlink-checker). Clean, keyword-rich slugs help users understand page content before clicking and give search engines a clear signal about page topic. Avoid long strings of numbers, special characters, and unnecessary stop words.',
                    'Our URL slug generator converts any title into a clean, lowercase, hyphenated slug optimized for SEO — with options to remove stop words and limit length.',
                ],
            },
        ],
    },

    jsonFormatter: {
        seoTitle: 'Free JSON Formatter & Validator — Beautify JSON Online',
        seoDescription: 'Format, beautify, minify & validate JSON free in your browser. Fix syntax errors instantly — nothing sent to any server. No sign-up.',
        seoKeywords: 'json formatter, json validator, json beautifier, json formatter online, format json, validate json, json pretty print, json minifier, json lint, json checker, beautify json online, json editor, fix json errors, json parser, json viewer free, json syntax checker, minify json, json formatter free',
        seoContent: [
            {
                heading: 'JSON Formatter for Developers & SEOs',
                paragraphs: [
                    'JSON (JavaScript Object Notation) is used everywhere in web development — API responses, schema markup, configuration files, and structured data. Our JSON formatter beautifies messy JSON into readable indented format, validates syntax, minifies for production, and highlights errors with line numbers.',
                    'Everything runs in your browser. Your data never leaves your device — ideal for sensitive API keys or client data.',
                ],
            },
        ],
    },

    imageCompressor: {
        seoTitle: 'Free Image Compressor — Compress JPG, PNG & WebP Online',
        seoDescription: 'Compress images free in your browser. Reduce JPG, PNG & WebP file size without uploading to servers. Drag & drop, adjust quality, download instantly.',
        seoKeywords: 'image compressor, compress image online, image compressor free, reduce image size, jpg compressor, png compressor, webp compressor, image optimizer, compress photo online, reduce file size image, image compression tool, shrink image, compress image without losing quality, bulk image compressor, browser image compressor, seo image optimization',
        seoContent: [
            {
                heading: 'Why Image Compression Matters for SEO',
                paragraphs: [
                    'Page speed is a confirmed Google ranking factor, and images are often the largest files on a webpage. Compressing images before upload can reduce page load time by 50–80% without visible quality loss — improving Core Web Vitals scores and search rankings.',
                    'SeoKitHub\'s image compressor runs entirely in your browser using WebAssembly. Drag and drop JPG, PNG, or WebP files, adjust quality, and download compressed versions instantly. No server upload means your images stay private.',
                ],
            },
        ],
    },
};
