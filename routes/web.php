<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Response;
use Inertia\Inertia;
use App\Http\Controllers\SeoAuditController;
use App\Http\Controllers\BacklinkController;

Route::get('/', fn() => Inertia::render('Home'));

// Trust pages
Route::get('/about',           fn() => Inertia::render('About'));
Route::get('/privacy-policy', fn() => Inertia::render('Privacy'));
Route::get('/contact',         fn() => Inertia::render('Contact'));

// Tool API endpoints (zero AI cost)
Route::post('/api/seo/audit',       [SeoAuditController::class, 'audit']);
Route::post('/api/backlinks/check', [BacklinkController::class, 'check']);

// SEO Tools
Route::get('/serp-preview-tool',       fn() => Inertia::render('Tools/SerpPreview'));
Route::get('/keyword-density-checker', fn() => Inertia::render('Tools/KeywordDensity'));

// Technical SEO
Route::get('/schema-markup-generator', fn() => Inertia::render('Tools/SchemaMarkup'));
Route::get('/robots-txt-generator',    fn() => Inertia::render('Tools/RobotsTxt'));
Route::get('/xml-sitemap-generator',   fn() => Inertia::render('Tools/XmlSitemap'));

// Content & Dev
Route::get('/json-formatter',    fn() => Inertia::render('Tools/JsonFormatter'));
Route::get('/image-compressor',  fn() => Inertia::render('Tools/ImageCompressor'));

// New tools
Route::get('/seo-audit-tool',             fn() => Inertia::render('Tools/SeoAudit'));
Route::get('/backlink-checker',           fn() => Inertia::render('Tools/BacklinkChecker'));
Route::get('/url-slug-generator',         fn() => Inertia::render('Tools/UrlSlugGenerator'));

// Auto-generated sitemap.xml for Google Search Console
Route::get('/sitemap.xml', function () {
    $base = config('app.url');
    $today = now()->toDateString();

    $urls = [
        ['loc' => $base,                                  'priority' => '1.0', 'changefreq' => 'weekly'],
        ['loc' => $base . '/schema-markup-generator',    'priority' => '0.9', 'changefreq' => 'monthly'],
        ['loc' => $base . '/seo-audit-tool',             'priority' => '0.9', 'changefreq' => 'monthly'],
        ['loc' => $base . '/backlink-checker',           'priority' => '0.9', 'changefreq' => 'monthly'],
        ['loc' => $base . '/robots-txt-generator',       'priority' => '0.8', 'changefreq' => 'monthly'],
        ['loc' => $base . '/xml-sitemap-generator',      'priority' => '0.8', 'changefreq' => 'monthly'],
        ['loc' => $base . '/keyword-density-checker',    'priority' => '0.8', 'changefreq' => 'monthly'],
        ['loc' => $base . '/serp-preview-tool',          'priority' => '0.8', 'changefreq' => 'monthly'],
        ['loc' => $base . '/url-slug-generator',         'priority' => '0.8', 'changefreq' => 'monthly'],
        ['loc' => $base . '/json-formatter',             'priority' => '0.7', 'changefreq' => 'monthly'],
        ['loc' => $base . '/image-compressor',           'priority' => '0.7', 'changefreq' => 'monthly'],
        ['loc' => $base . '/about',                      'priority' => '0.5', 'changefreq' => 'yearly'],
        ['loc' => $base . '/privacy-policy',             'priority' => '0.3', 'changefreq' => 'yearly'],
        ['loc' => $base . '/contact',                    'priority' => '0.3', 'changefreq' => 'yearly'],
    ];

    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL;
    foreach ($urls as $url) {
        $xml .= "  <url>\n";
        $xml .= "    <loc>{$url['loc']}</loc>\n";
        $xml .= "    <lastmod>{$today}</lastmod>\n";
        $xml .= "    <changefreq>{$url['changefreq']}</changefreq>\n";
        $xml .= "    <priority>{$url['priority']}</priority>\n";
        $xml .= "  </url>\n";
    }
    $xml .= '</urlset>';

    return response($xml, 200)->header('Content-Type', 'application/xml');
});
