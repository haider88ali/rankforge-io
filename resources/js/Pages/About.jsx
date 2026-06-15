import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import StaticPageLayout from '@/Components/StaticPageLayout';

export default function About() {
    return (
        <AppLayout>
            <StaticPageLayout
                title="About SeoKitHub – Free SEO Tools Online No Sign Up"
                description="SeoKitHub is a free online SEO toolkit with 10 tools for marketers, bloggers & developers — no account, no limits, no AI costs. Learn about our mission."
                breadcrumb="About"
                path="/about"
            >
                <h2>What is SeoKitHub?</h2>
                <p>
                    SeoKitHub is a collection of 10 free SEO and developer tools that help you optimize websites for search engines.
                    Every tool is free to use with no account required — whether you need a backlink checker, SEO audit, schema markup generator,
                    or XML sitemap builder.
                </p>

                <h2>Why we built it</h2>
                <p>
                    Most SEO tools lock basic features behind paid plans or force you to create an account.
                    We built SeoKitHub to give everyone access to professional-grade SEO utilities without paywalls or sign-up friction.
                </p>

                <h2>How our tools work</h2>
                <ul>
                    <li><strong>Browser-based tools</strong> — JSON formatter, image compressor, keyword density, and more run entirely in your browser. Your data never leaves your device.</li>
                    <li><strong>Server-side analysis</strong> — SEO audit and backlink checker run lightweight server checks on public URLs only.</li>
                    <li><strong>No tracking</strong> — we don't sell your data or require personal information to use any tool.</li>
                </ul>

                <h2>Who it's for</h2>
                <p>
                    SeoKitHub is used by SEO professionals, content marketers, bloggers, freelancers, agencies, and web developers
                    who need fast, reliable tools without subscription costs.
                </p>

                <h2>Explore our tools</h2>
                <p>
                    <Link href="/">Browse all 10 free SEO tools</Link> or start with our most popular:
                    {' '}<Link href="/backlink-checker">Backlink Checker</Link>,{' '}
                    <Link href="/seo-audit-tool">SEO Audit</Link>, and{' '}
                    <Link href="/schema-markup-generator">Schema Markup Generator</Link>.
                </p>
            </StaticPageLayout>
        </AppLayout>
    );
}
