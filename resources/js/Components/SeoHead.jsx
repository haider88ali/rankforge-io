import { useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { BASE_URL, SITE_NAME, SITE_TAGLINE, OG_IMAGE, DEFAULT_KEYWORDS } from '@/config/seo';

function setMeta(selector, attr, attrVal, content) {
    let el = document.querySelector(selector);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, attrVal);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

export default function SeoHead({
    title,
    description,
    keywords = '',
    path,
    type = 'website',
}) {
    const { url } = usePage();
    const pagePath = (path ?? url).split('?')[0];
    const canonicalUrl = pagePath === '/' ? BASE_URL : `${BASE_URL}${pagePath}`;
    const fullTitle = `${title} — ${SITE_NAME}`;
    const allKeywords = keywords
        ? `${keywords}, ${DEFAULT_KEYWORDS}`
        : DEFAULT_KEYWORDS;

    // On every SPA navigation, Inertia does NOT re-run the blade template,
    // so server-rendered head tags go stale. This useEffect directly updates
    // all critical DOM head nodes whenever the page changes.
    useEffect(() => {
        // Title
        document.title = fullTitle;

        // Standard meta
        setMeta('meta[name="description"]',  'name',     'description', description);
        setMeta('meta[name="keywords"]',      'name',     'keywords',    allKeywords);
        setMeta('meta[name="robots"]',        'name',     'robots',      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

        // Open Graph
        setMeta('meta[property="og:title"]',       'property', 'og:title',       fullTitle);
        setMeta('meta[property="og:description"]', 'property', 'og:description', description);
        setMeta('meta[property="og:url"]',         'property', 'og:url',         canonicalUrl);
        setMeta('meta[property="og:type"]',        'property', 'og:type',        type);

        // Twitter
        setMeta('meta[name="twitter:title"]',       'name', 'twitter:title',       fullTitle);
        setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

        // Canonical
        let link = document.querySelector('link[rel="canonical"]');
        if (!link) {
            link = document.createElement('link');
            link.rel = 'canonical';
            document.head.appendChild(link);
        }
        link.href = canonicalUrl;
    }, [fullTitle, description, canonicalUrl, allKeywords, type]);

    // <Head> handles the initial server-side render pass and non-JS crawlers.
    return (
        <Head>
            <title>{title}</title>
            <meta head-key="description"   name="description"  content={description} />
            <meta head-key="keywords"      name="keywords"     content={allKeywords} />
            <meta head-key="author"        name="author"       content={SITE_NAME} />
            <meta head-key="publisher"     name="publisher"    content={SITE_NAME} />
            <meta head-key="robots"        name="robots"       content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

            <meta head-key="og:type"        property="og:type"        content={type} />
            <meta head-key="og:site_name"   property="og:site_name"   content={SITE_NAME} />
            <meta head-key="og:title"       property="og:title"       content={fullTitle} />
            <meta head-key="og:description" property="og:description" content={description} />
            <meta head-key="og:url"         property="og:url"         content={canonicalUrl} />
            <meta head-key="og:image"       property="og:image"       content={OG_IMAGE} />
            <meta head-key="og:locale"      property="og:locale"      content="en_US" />

            <meta head-key="twitter:card"        name="twitter:card"        content="summary" />
            <meta head-key="twitter:title"       name="twitter:title"       content={fullTitle} />
            <meta head-key="twitter:description" name="twitter:description" content={description} />
            <meta head-key="twitter:image"       name="twitter:image"       content={OG_IMAGE} />
        </Head>
    );
}

export { BASE_URL, SITE_NAME, SITE_TAGLINE };
