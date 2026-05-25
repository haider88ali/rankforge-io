import { Head, usePage } from '@inertiajs/react';
import { BASE_URL, SITE_NAME, SITE_TAGLINE, OG_IMAGE, DEFAULT_KEYWORDS } from '@/config/seo';

export default function SeoHead({
    title,
    description,
    keywords = '',
    path,
    type = 'website',
}) {
    const { url } = usePage();
    const pagePath = path ?? url;
    const canonicalUrl = pagePath === '/' ? BASE_URL : `${BASE_URL}${pagePath}`;
    const ogTitle = `${title} — ${SITE_NAME}`;
    const allKeywords = keywords
        ? `${keywords}, ${DEFAULT_KEYWORDS}`
        : DEFAULT_KEYWORDS;

    return (
        <Head>
            <title>{title}</title>
            <meta head-key="description" name="description" content={description} />
            <meta head-key="keywords" name="keywords" content={allKeywords} />
            <meta head-key="author" name="author" content={SITE_NAME} />
            <meta head-key="publisher" name="publisher" content={SITE_NAME} />
            <meta head-key="robots" name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <link head-key="canonical" rel="canonical" href={canonicalUrl} />

            {/* Open Graph */}
            <meta head-key="og:type" property="og:type" content={type} />
            <meta head-key="og:site_name" property="og:site_name" content={SITE_NAME} />
            <meta head-key="og:title" property="og:title" content={ogTitle} />
            <meta head-key="og:description" property="og:description" content={description} />
            <meta head-key="og:url" property="og:url" content={canonicalUrl} />
            <meta head-key="og:image" property="og:image" content={OG_IMAGE} />
            <meta head-key="og:locale" property="og:locale" content="en_US" />

            {/* Twitter Card */}
            <meta head-key="twitter:card" name="twitter:card" content="summary" />
            <meta head-key="twitter:title" name="twitter:title" content={ogTitle} />
            <meta head-key="twitter:description" name="twitter:description" content={description} />
            <meta head-key="twitter:image" name="twitter:image" content={OG_IMAGE} />
        </Head>
    );
}

export { BASE_URL, SITE_NAME, SITE_TAGLINE };
