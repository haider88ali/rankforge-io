# RankForge — Deployment Guide

## Recommended Hosting Platforms

| Platform | Best For | Cost |
|---|---|---|
| **Railway** | Easiest Laravel deploy | Free tier / $5/mo |
| **Render** | Simple, Git-connected | Free tier / $7/mo |
| **DigitalOcean App Platform** | Reliable, scalable | $12/mo |
| **Forge + VPS (DigitalOcean/Hetzner)** | Full control | $6/mo VPS + $12/mo Forge |
| **Shared cPanel Hosting** | Budget option | $3–10/mo |

---

## Pre-Deploy Checklist

### 1. Environment File
Copy `.env.production.example` → `.env` on the server and fill in:
- [ ] `APP_KEY` — run `php artisan key:generate`
- [ ] `APP_URL` — set to `https://rankforge.io`
- [ ] `APP_DEBUG=false`
- [ ] `APP_ENV=production`

### 2. Build Assets
```bash
npm install
npm run build
```

### 3. Laravel Optimization Commands (run on server)
```bash
composer install --no-dev --optimize-autoloader
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan storage:link
```

### 4. File Permissions
```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

### 5. Web Server (Nginx config)
Point document root to `/public` and add:
```nginx
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```

---

## Deploy to Railway (Recommended — Easiest)

1. Push code to GitHub
2. Go to railway.app → New Project → Deploy from GitHub repo
3. Add environment variables from `.env.production.example`
4. Railway auto-detects PHP/Laravel and deploys
5. Add custom domain `rankforge.io` in Railway settings

---

## Deploy to Shared Hosting (cPanel)

1. Run `npm run build` locally
2. Upload ALL files via FTP (including `public/build/`)
3. Point document root to `/public` folder
4. Create `.env` from `.env.production.example`
5. Run via SSH: `php artisan key:generate && php artisan config:cache`

---

## Post-Deploy SEO Steps

1. **Submit sitemap** — Go to Google Search Console → Sitemaps → Submit `https://rankforge.io/sitemap.xml`
2. **Request indexing** — In GSC, use URL Inspection to request indexing for each tool page
3. **Verify rich results** — Test any tool page at https://search.google.com/test/rich-results
4. **Set up Bing** — Submit to Bing Webmaster Tools too

---

## What's Already Production-Ready ✅

- [x] All assets compiled with Vite (public/build/)
- [x] SEO-friendly URLs for all 10 tools
- [x] Unique meta title + description on every page
- [x] FAQ JSON-LD schema on every tool page
- [x] WebPage + SoftwareApplication schema on every page
- [x] BreadcrumbList schema on every page
- [x] Mobile responsive design
- [x] No database required (all tools run in browser)
- [x] No API keys required

## What You May Want to Add Later

- [ ] OpenAI API key for real AI generation (AI tools currently use mock data)
- [ ] Google Analytics / Plausible for traffic tracking
- [ ] A sitemap route (`/sitemap.xml`) via Laravel
