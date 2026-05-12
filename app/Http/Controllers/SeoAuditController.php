<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use DOMDocument;
use DOMXPath;

class SeoAuditController extends Controller
{
    public function audit(Request $request): JsonResponse
    {
        $request->validate(['url' => 'required|url|max:500']);

        $url = $request->input('url');
        if (!str_starts_with($url, 'http')) {
            $url = 'https://' . $url;
        }

        $start = microtime(true);

        try {
            $response = Http::timeout(15)
                ->withHeaders(['User-Agent' => 'RankForge-SEO-Audit/1.0 (+https://rankforge.io)'])
                ->get($url);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Could not reach the URL. Check it is publicly accessible.'], 422);
        }

        $loadTime = round((microtime(true) - $start) * 1000);
        $html     = $response->body();
        $status   = $response->status();

        // Parse HTML with DOMDocument (suppress warnings for malformed HTML)
        libxml_use_internal_errors(true);
        $dom = new DOMDocument();
        $dom->loadHTML('<?xml encoding="utf-8" ?>' . $html, LIBXML_NOERROR);
        libxml_clear_errors();
        $xpath = new DOMXPath($dom);

        // ── Extract elements ──────────────────────────────────────────────────

        // Title
        $titleNodes = $xpath->query('//title');
        $title      = $titleNodes->length > 0 ? trim($titleNodes->item(0)->textContent) : '';

        // Meta description
        $metaDesc     = '';
        $metaNodes    = $xpath->query('//meta[@name="description"]/@content');
        if ($metaNodes->length > 0) $metaDesc = trim($metaNodes->item(0)->textContent);

        // Meta robots
        $metaRobots = '';
        $robotNodes = $xpath->query('//meta[@name="robots"]/@content');
        if ($robotNodes->length > 0) $metaRobots = trim($robotNodes->item(0)->textContent);

        // Canonical
        $canonical     = '';
        $canonicalNode = $xpath->query('//link[@rel="canonical"]/@href');
        if ($canonicalNode->length > 0) $canonical = trim($canonicalNode->item(0)->textContent);

        // H1 tags
        $h1Nodes = $xpath->query('//h1');
        $h1s     = [];
        foreach ($h1Nodes as $node) {
            $h1s[] = trim($node->textContent);
        }

        // H2 tags
        $h2Nodes = $xpath->query('//h2');
        $h2Count = $h2Nodes->length;

        // Images without alt
        $imgNodes   = $xpath->query('//img');
        $totalImgs  = $imgNodes->length;
        $noAltImgs  = 0;
        foreach ($imgNodes as $img) {
            $alt = $img->getAttribute('alt');
            if (trim($alt) === '') $noAltImgs++;
        }

        // Open Graph
        $ogTitle = $ogDesc = $ogImage = '';
        foreach ($xpath->query('//meta[starts-with(@property,"og:")]') as $og) {
            $prop = $og->getAttribute('property');
            $val  = $og->getAttribute('content');
            if ($prop === 'og:title')       $ogTitle = $val;
            if ($prop === 'og:description') $ogDesc  = $val;
            if ($prop === 'og:image')       $ogImage = $val;
        }

        // Twitter Card
        $twitterCard = '';
        $twNode = $xpath->query('//meta[@name="twitter:card"]/@content');
        if ($twNode->length > 0) $twitterCard = $twNode->item(0)->textContent;

        // Schema markup
        $schemaNodes = $xpath->query('//script[@type="application/ld+json"]');
        $hasSchema   = $schemaNodes->length > 0;

        // Word count (strip tags)
        $text      = strip_tags($html);
        $text      = preg_replace('/\s+/', ' ', $text);
        $wordCount = str_word_count(trim($text));

        // SSL
        $isHttps = str_starts_with($url, 'https://');

        // Viewport
        $viewportNode = $xpath->query('//meta[@name="viewport"]/@content');
        $hasViewport  = $viewportNode->length > 0;

        // Lang attribute
        $htmlNode = $xpath->query('//html/@lang');
        $langAttr = $htmlNode->length > 0 ? $htmlNode->item(0)->textContent : '';

        // Check robots.txt
        $parsedUrl  = parse_url($url);
        $baseUrl    = $parsedUrl['scheme'] . '://' . $parsedUrl['host'];
        $robotsOk   = false;
        $sitemapOk  = false;
        try {
            $robotsRes = Http::timeout(5)->get($baseUrl . '/robots.txt');
            $robotsOk  = $robotsRes->ok();
            if ($robotsOk) {
                $sitemapOk = str_contains(strtolower($robotsRes->body()), 'sitemap');
            }
        } catch (\Exception) {}

        // ── Build scored audit items ──────────────────────────────────────────

        $checks = [
            // Title
            [
                'category' => 'On-Page SEO',
                'name'     => 'Title Tag',
                'status'   => !$title ? 'fail' : (strlen($title) < 30 || strlen($title) > 65 ? 'warning' : 'pass'),
                'value'    => $title ?: 'Missing',
                'detail'   => !$title
                    ? 'No title tag found. This is critical for SEO.'
                    : (strlen($title) < 30
                        ? 'Title is too short (' . strlen($title) . ' chars). Aim for 50–60 characters.'
                        : (strlen($title) > 65
                            ? 'Title is too long (' . strlen($title) . ' chars). May get truncated in Google.'
                            : 'Title length is optimal (' . strlen($title) . ' chars). ✓')),
            ],
            // Meta Description
            [
                'category' => 'On-Page SEO',
                'name'     => 'Meta Description',
                'status'   => !$metaDesc ? 'fail' : (strlen($metaDesc) < 70 || strlen($metaDesc) > 165 ? 'warning' : 'pass'),
                'value'    => $metaDesc ?: 'Missing',
                'detail'   => !$metaDesc
                    ? 'No meta description. Google may auto-generate one, often poorly.'
                    : (strlen($metaDesc) < 70
                        ? 'Too short (' . strlen($metaDesc) . ' chars). Aim for 120–160 characters.'
                        : (strlen($metaDesc) > 165
                            ? 'Too long (' . strlen($metaDesc) . ' chars). Will be truncated in SERPs.'
                            : 'Meta description length is optimal. ✓')),
            ],
            // H1
            [
                'category' => 'On-Page SEO',
                'name'     => 'H1 Tag',
                'status'   => count($h1s) === 0 ? 'fail' : (count($h1s) > 1 ? 'warning' : 'pass'),
                'value'    => count($h1s) === 0 ? 'Missing' : implode(', ', array_slice($h1s, 0, 2)),
                'detail'   => count($h1s) === 0
                    ? 'No H1 tag found. Every page should have exactly one H1.'
                    : (count($h1s) > 1
                        ? count($h1s) . ' H1 tags found. Use only one H1 per page.'
                        : 'One H1 tag found. ✓'),
            ],
            // H2
            [
                'category' => 'On-Page SEO',
                'name'     => 'H2 Headings',
                'status'   => $h2Count === 0 ? 'warning' : 'pass',
                'value'    => $h2Count . ' H2 tags',
                'detail'   => $h2Count === 0
                    ? 'No H2 headings. Use H2s to structure your content for readers and search engines.'
                    : $h2Count . ' H2 headings found — good content structure. ✓',
            ],
            // Images
            [
                'category' => 'On-Page SEO',
                'name'     => 'Image Alt Text',
                'status'   => $noAltImgs > 0 ? ($noAltImgs > 3 ? 'fail' : 'warning') : 'pass',
                'value'    => "{$noAltImgs} of {$totalImgs} images missing alt text",
                'detail'   => $noAltImgs === 0
                    ? 'All images have alt text. ✓'
                    : "{$noAltImgs} image(s) are missing alt attributes. Alt text is important for accessibility and image SEO.",
            ],
            // Canonical
            [
                'category' => 'Technical SEO',
                'name'     => 'Canonical URL',
                'status'   => !$canonical ? 'warning' : 'pass',
                'value'    => $canonical ?: 'Not set',
                'detail'   => !$canonical
                    ? 'No canonical tag. Recommended to prevent duplicate content issues.'
                    : 'Canonical tag found: ' . $canonical . ' ✓',
            ],
            // Robots meta
            [
                'category' => 'Technical SEO',
                'name'     => 'Meta Robots',
                'status'   => str_contains(strtolower($metaRobots), 'noindex') ? 'fail' : 'pass',
                'value'    => $metaRobots ?: 'Not set (defaults to index, follow)',
                'detail'   => str_contains(strtolower($metaRobots), 'noindex')
                    ? '⚠ Page has noindex — it will NOT appear in Google search results!'
                    : 'Page is indexable. ✓',
            ],
            // SSL
            [
                'category' => 'Technical SEO',
                'name'     => 'HTTPS / SSL',
                'status'   => $isHttps ? 'pass' : 'fail',
                'value'    => $isHttps ? 'HTTPS enabled' : 'HTTP only',
                'detail'   => $isHttps
                    ? 'Site uses HTTPS. Google uses SSL as a ranking factor. ✓'
                    : 'Site is not using HTTPS. This is a ranking signal — switch to HTTPS immediately.',
            ],
            // Mobile
            [
                'category' => 'Technical SEO',
                'name'     => 'Mobile Viewport',
                'status'   => $hasViewport ? 'pass' : 'fail',
                'value'    => $hasViewport ? 'Viewport meta tag present' : 'Missing',
                'detail'   => $hasViewport
                    ? 'Viewport meta tag found — mobile-friendly. ✓'
                    : 'No viewport meta tag. Page may not display correctly on mobile devices.',
            ],
            // Schema
            [
                'category' => 'Technical SEO',
                'name'     => 'Structured Data',
                'status'   => $hasSchema ? 'pass' : 'warning',
                'value'    => $hasSchema ? 'JSON-LD schema found' : 'No schema markup',
                'detail'   => $hasSchema
                    ? 'Structured data (JSON-LD) found. Eligible for Google rich results. ✓'
                    : 'No schema markup found. Adding it can unlock rich results in Google.',
            ],
            // Open Graph
            [
                'category' => 'Social & Sharing',
                'name'     => 'Open Graph Tags',
                'status'   => !$ogTitle ? 'warning' : 'pass',
                'value'    => $ogTitle ?: 'Not set',
                'detail'   => !$ogTitle
                    ? 'No Open Graph tags. Your page may not display well when shared on Facebook or LinkedIn.'
                    : 'Open Graph tags found. Social sharing will be optimized. ✓',
            ],
            // Twitter Card
            [
                'category' => 'Social & Sharing',
                'name'     => 'Twitter Card',
                'status'   => !$twitterCard ? 'warning' : 'pass',
                'value'    => $twitterCard ?: 'Not set',
                'detail'   => !$twitterCard
                    ? 'No Twitter Card meta tag. Tweets linking to your page will not show a preview image.'
                    : 'Twitter Card found: ' . $twitterCard . ' ✓',
            ],
            // Word count
            [
                'category' => 'Content',
                'name'     => 'Word Count',
                'status'   => $wordCount < 300 ? 'warning' : ($wordCount >= 600 ? 'pass' : 'warning'),
                'value'    => number_format($wordCount) . ' words',
                'detail'   => $wordCount < 300
                    ? 'Very thin content (' . number_format($wordCount) . ' words). Google prefers pages with 600+ words.'
                    : ($wordCount >= 1000
                        ? 'Excellent content length (' . number_format($wordCount) . ' words). ✓'
                        : 'Content length is acceptable. Aim for 1,000+ words for competitive topics.'),
            ],
            // Language
            [
                'category' => 'Content',
                'name'     => 'HTML Lang Attribute',
                'status'   => !$langAttr ? 'warning' : 'pass',
                'value'    => $langAttr ?: 'Not set',
                'detail'   => !$langAttr
                    ? 'No lang attribute on <html>. Add lang="en" (or your language) for accessibility.'
                    : 'Language attribute set to "' . $langAttr . '". ✓',
            ],
            // Robots.txt
            [
                'category' => 'Crawlability',
                'name'     => 'robots.txt',
                'status'   => $robotsOk ? 'pass' : 'warning',
                'value'    => $robotsOk ? 'Found at ' . $baseUrl . '/robots.txt' : 'Not found',
                'detail'   => $robotsOk
                    ? 'robots.txt file found. ✓'
                    : 'No robots.txt found. Create one to guide search engine crawlers.',
            ],
            // Sitemap in robots
            [
                'category' => 'Crawlability',
                'name'     => 'Sitemap Reference',
                'status'   => $sitemapOk ? 'pass' : 'warning',
                'value'    => $sitemapOk ? 'Sitemap referenced in robots.txt' : 'Not referenced',
                'detail'   => $sitemapOk
                    ? 'Sitemap URL is referenced in robots.txt. ✓'
                    : 'Add a Sitemap: line to your robots.txt for better crawl coverage.',
            ],
            // Load time
            [
                'category' => 'Performance',
                'name'     => 'Page Load Time',
                'status'   => $loadTime < 2000 ? 'pass' : ($loadTime < 4000 ? 'warning' : 'fail'),
                'value'    => $loadTime . 'ms (server response)',
                'detail'   => $loadTime < 2000
                    ? 'Fast server response time (' . $loadTime . 'ms). ✓'
                    : ($loadTime < 4000
                        ? 'Moderate response time (' . $loadTime . 'ms). Aim for under 2 seconds.'
                        : 'Slow server response (' . $loadTime . 'ms). This impacts Core Web Vitals and rankings.'),
            ],
        ];

        $pass    = count(array_filter($checks, fn($c) => $c['status'] === 'pass'));
        $warning = count(array_filter($checks, fn($c) => $c['status'] === 'warning'));
        $fail    = count(array_filter($checks, fn($c) => $c['status'] === 'fail'));
        $score   = (int) round(($pass / count($checks)) * 100);

        return response()->json([
            'url'        => $url,
            'score'      => $score,
            'pass'       => $pass,
            'warning'    => $warning,
            'fail'       => $fail,
            'checks'     => $checks,
            'loadTime'   => $loadTime,
            'wordCount'  => $wordCount,
            'httpStatus' => $status,
        ]);
    }
}
