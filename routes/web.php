<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SeoAuditController;
use App\Http\Controllers\BacklinkController;

Route::get('/', fn () => view('pages.home'));

// Trust pages
Route::get('/about',          fn () => view('pages.about'));
Route::get('/privacy-policy', fn () => view('pages.privacy'));
Route::get('/contact',        fn () => view('pages.contact'));

// Tool API endpoints (zero AI cost)
Route::post('/api/seo/audit',       [SeoAuditController::class, 'audit']);
Route::post('/api/backlinks/check', [BacklinkController::class, 'check']);

// SEO Tools
Route::get('/serp-preview-tool',       fn () => view('pages.tools.serp-preview'));
Route::get('/keyword-density-checker', fn () => view('pages.tools.keyword-density'));

// Technical SEO
Route::get('/schema-markup-generator', fn () => view('pages.tools.schema-markup'));
Route::get('/robots-txt-generator',    fn () => view('pages.tools.robots-txt'));
Route::get('/xml-sitemap-generator',   fn () => view('pages.tools.xml-sitemap'));

// Content & Dev
Route::get('/json-formatter',   fn () => view('pages.tools.json-formatter'));
Route::get('/image-compressor', fn () => view('pages.tools.image-compressor'));

// New tools
Route::get('/seo-audit-tool',     fn () => view('pages.tools.seo-audit'));
Route::get('/backlink-checker',   fn () => view('pages.tools.backlink-checker'));
Route::get('/url-slug-generator', fn () => view('pages.tools.url-slug-generator'));

// Auto-generated sitemap.xml for Google Search Console
Route::get('/sitemap.xml', function () {
    $base = config('app.url');

    // lastmod is derived from each page's actual source file modification time,
    // instead of always reporting "today" (which misleads crawlers about freshness).
    $lastmod = fn (string $resourcePath) => file_exists(resource_path($resourcePath))
        ? date('Y-m-d', filemtime(resource_path($resourcePath)))
        : now()->toDateString();

    $urls = [
        ['loc' => $base,                              'priority' => '1.0', 'changefreq' => 'weekly',  'file' => 'views/pages/home.blade.php'],
        ['loc' => $base . '/schema-markup-generator', 'priority' => '0.9', 'changefreq' => 'monthly', 'file' => 'views/pages/tools/schema-markup.blade.php'],
        ['loc' => $base . '/seo-audit-tool',          'priority' => '0.9', 'changefreq' => 'monthly', 'file' => 'views/pages/tools/seo-audit.blade.php'],
        ['loc' => $base . '/backlink-checker',        'priority' => '0.9', 'changefreq' => 'monthly', 'file' => 'views/pages/tools/backlink-checker.blade.php'],
        ['loc' => $base . '/robots-txt-generator',    'priority' => '0.8', 'changefreq' => 'monthly', 'file' => 'views/pages/tools/robots-txt.blade.php'],
        ['loc' => $base . '/xml-sitemap-generator',   'priority' => '0.8', 'changefreq' => 'monthly', 'file' => 'views/pages/tools/xml-sitemap.blade.php'],
        ['loc' => $base . '/keyword-density-checker', 'priority' => '0.8', 'changefreq' => 'monthly', 'file' => 'views/pages/tools/keyword-density.blade.php'],
        ['loc' => $base . '/serp-preview-tool',       'priority' => '0.8', 'changefreq' => 'monthly', 'file' => 'views/pages/tools/serp-preview.blade.php'],
        ['loc' => $base . '/url-slug-generator',      'priority' => '0.8', 'changefreq' => 'monthly', 'file' => 'views/pages/tools/url-slug-generator.blade.php'],
        ['loc' => $base . '/json-formatter',          'priority' => '0.7', 'changefreq' => 'monthly', 'file' => 'views/pages/tools/json-formatter.blade.php'],
        ['loc' => $base . '/image-compressor',        'priority' => '0.7', 'changefreq' => 'monthly', 'file' => 'views/pages/tools/image-compressor.blade.php'],
        ['loc' => $base . '/about',                   'priority' => '0.5', 'changefreq' => 'yearly',  'file' => 'views/pages/about.blade.php'],
        ['loc' => $base . '/privacy-policy',          'priority' => '0.3', 'changefreq' => 'yearly',  'file' => 'views/pages/privacy.blade.php'],
        ['loc' => $base . '/contact',                 'priority' => '0.3', 'changefreq' => 'yearly',  'file' => 'views/pages/contact.blade.php'],
    ];

    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL;
    foreach ($urls as $url) {
        $xml .= "  <url>\n";
        $xml .= "    <loc>{$url['loc']}</loc>\n";
        $xml .= "    <lastmod>{$lastmod($url['file'])}</lastmod>\n";
        $xml .= "    <changefreq>{$url['changefreq']}</changefreq>\n";
        $xml .= "    <priority>{$url['priority']}</priority>\n";
        $xml .= "  </url>\n";
    }
    $xml .= '</urlset>';

    return response($xml, 200)->header('Content-Type', 'application/xml');
});
