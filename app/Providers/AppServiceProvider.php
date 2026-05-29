<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        View::composer('app', function ($view) {
            $path = request()->path();
            $key = $path === '' ? '/' : '/' . $path;
            $pages = config('seo_pages.pages', []);
            $base = rtrim(config('seo_pages.base_url', config('app.url')), '/');

            $pageSeo = $pages[$key] ?? null;

            if ($pageSeo) {
                $pageSeo['canonical'] = $key === '/' ? $base : $base . $key;
                $pageSeo['og_title'] = $pageSeo['title'] . ' — ' . config('seo_pages.site_name', 'SeoKitHub');
            }

            $view->with('pageSeo', $pageSeo);
        });
    }
}
