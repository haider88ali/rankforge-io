<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class BacklinkController extends Controller
{
    public function check(Request $request): JsonResponse
    {
        $request->validate(['domain' => 'required|string|max:200']);

        $raw    = trim($request->input('domain'));
        $raw    = preg_replace('#^https?://#i', '', $raw);
        $domain = strtolower(explode('/', $raw)[0]);

        if (!$domain || !str_contains($domain, '.')) {
            return response()->json(['error' => 'Please enter a valid domain (e.g. example.com)'], 422);
        }

        $results = [];

        // ── 1. Open PageRank (free public API, no key needed for basic check) ─
        try {
            $pr = Http::timeout(8)->get("https://openpagerank.com/api/v1.0/getPageRank", [
                'domains[0]' => $domain,
            ], );
            // openpagerank requires a key — we skip gracefully if unavailable
        } catch (\Exception) {}

        // ── 2. Check robots.txt ────────────────────────────────────────────────
        $robotsOk  = false;
        $sitemapUrl = '';
        try {
            $robots = Http::timeout(5)->get("https://{$domain}/robots.txt");
            if ($robots->ok()) {
                $robotsOk = true;
                if (preg_match('/Sitemap:\s*(\S+)/i', $robots->body(), $m)) {
                    $sitemapUrl = $m[1];
                }
            }
        } catch (\Exception) {
            try {
                $robots = Http::timeout(5)->get("http://{$domain}/robots.txt");
                if ($robots->ok()) {
                    $robotsOk = true;
                    if (preg_match('/Sitemap:\s*(\S+)/i', $robots->body(), $m)) {
                        $sitemapUrl = $m[1];
                    }
                }
            } catch (\Exception) {}
        }

        // ── 3. Check if sitemap exists & count URLs ───────────────────────────
        $sitemapUrlCount = 0;
        $checkedSitemap  = $sitemapUrl ?: "https://{$domain}/sitemap.xml";
        try {
            $sm = Http::timeout(8)->get($checkedSitemap);
            if ($sm->ok()) {
                $sitemapUrlCount = substr_count($sm->body(), '<loc>');
            }
        } catch (\Exception) {}

        // ── 4. Homepage meta check ────────────────────────────────────────────
        $hasTitle    = false;
        $hasMetaDesc = false;
        $isHttps     = false;
        $title       = '';
        try {
            $home = Http::timeout(8)
                ->withHeaders(['User-Agent' => 'SeoKitHub/1.0'])
                ->get("https://{$domain}");
            if ($home->ok()) {
                $isHttps = true;
                $html    = $home->body();
                if (preg_match('/<title[^>]*>(.*?)<\/title>/is', $html, $m)) {
                    $hasTitle = true;
                    $title    = strip_tags(trim($m[1]));
                }
                $hasMetaDesc = (bool) preg_match('/<meta[^>]+name=["\']description["\'][^>]+>/i', $html);
            }
        } catch (\Exception) {
            try {
                $home = Http::timeout(8)->get("http://{$domain}");
                if ($home->ok()) {
                    $html = $home->body();
                    if (preg_match('/<title[^>]*>(.*?)<\/title>/is', $html, $m)) {
                        $hasTitle = true;
                        $title    = strip_tags(trim($m[1]));
                    }
                    $hasMetaDesc = (bool) preg_match('/<meta[^>]+name=["\']description["\'][^>]+>/i', $html);
                }
            } catch (\Exception) {}
        }

        // ── 5. Check common backlink sources (do they reference this domain?) ─
        $sources = [
            ['name' => 'Wikipedia',    'url' => "https://en.wikipedia.org/w/index.php?search={$domain}"],
            ['name' => 'GitHub',       'url' => "https://github.com/search?q={$domain}&type=repositories"],
            ['name' => 'Reddit',       'url' => "https://www.reddit.com/search/?q={$domain}"],
            ['name' => 'ProductHunt',  'url' => "https://www.producthunt.com/search?q={$domain}"],
        ];

        // ── 6. Build domain health signals ───────────────────────────────────
        $signals = [
            ['label' => 'Domain',              'value' => $domain,                                           'status' => 'info'],
            ['label' => 'HTTPS',               'value' => $isHttps ? 'Enabled ✓' : 'Not detected',          'status' => $isHttps ? 'pass' : 'fail'],
            ['label' => 'Homepage Title',      'value' => $hasTitle ? ($title ?: 'Found ✓') : 'Missing',    'status' => $hasTitle ? 'pass' : 'fail'],
            ['label' => 'Meta Description',    'value' => $hasMetaDesc ? 'Found ✓' : 'Missing',             'status' => $hasMetaDesc ? 'pass' : 'warning'],
            ['label' => 'robots.txt',          'value' => $robotsOk ? 'Found ✓' : 'Not found',              'status' => $robotsOk ? 'pass' : 'warning'],
            ['label' => 'Sitemap',             'value' => $sitemapUrl ?: ($sitemapUrlCount > 0 ? $checkedSitemap : 'Not found'), 'status' => $sitemapUrlCount > 0 ? 'pass' : 'warning'],
            ['label' => 'Sitemap URL Count',   'value' => $sitemapUrlCount > 0 ? number_format($sitemapUrlCount) . ' URLs indexed' : 'N/A', 'status' => $sitemapUrlCount > 0 ? 'pass' : 'info'],
        ];

        // ── 7. Backlink opportunity sources ──────────────────────────────────
        $opportunities = [
            ['source' => 'Google Search', 'query' => "link:{$domain}", 'tip' => 'See who Google knows links to you', 'url' => "https://www.google.com/search?q=link%3A{$domain}"],
            ['source' => 'Bing Webmaster', 'query' => "inboundlinks:{$domain}", 'tip' => 'Bing shows backlinks in Webmaster Tools', 'url' => "https://www.bing.com/webmaster/"],
            ['source' => 'Ahrefs Free', 'query' => $domain, 'tip' => 'Free backlink checker (limited)', 'url' => "https://ahrefs.com/backlink-checker/?input={$domain}"],
            ['source' => 'Moz Link Explorer', 'query' => $domain, 'tip' => '10 free queries/month', 'url' => "https://moz.com/link-explorer?site={$domain}"],
            ['source' => 'Majestic SEO', 'query' => $domain, 'tip' => 'Trust Flow & Citation Flow metrics', 'url' => "https://majestic.com/reports/site-explorer?IndexDataSource=F&oq={$domain}&q={$domain}"],
        ];

        return response()->json([
            'domain'        => $domain,
            'isHttps'       => $isHttps,
            'title'         => $title,
            'signals'       => $signals,
            'sources'       => $sources,
            'opportunities' => $opportunities,
            'sitemapUrl'    => $sitemapUrl,
            'sitemapCount'  => $sitemapUrlCount,
        ]);
    }
}
