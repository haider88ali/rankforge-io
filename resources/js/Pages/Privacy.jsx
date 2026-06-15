import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import StaticPageLayout from '@/Components/StaticPageLayout';

export default function Privacy() {
    return (
        <AppLayout>
            <StaticPageLayout
                title="Privacy Policy"
                description="How SeoKitHub handles your data — browser-based tools, minimal server logs, no account required."
                breadcrumb="Privacy Policy"
                path="/privacy-policy"
            >
                <p><em>Last updated: June 2026</em></p>

                <h2>Overview</h2>
                <p>
                    SeoKitHub ("we", "us") operates seokithub.com. This policy explains what data we collect when you use our website and free tools.
                </p>

                <h2>Browser-based tools</h2>
                <p>
                    Tools such as the JSON formatter, image compressor, keyword density checker, URL slug generator, SERP preview,
                    schema markup generator, robots.txt generator, and XML sitemap generator process data entirely in your browser.
                    <strong> We do not receive, store, or transmit the content you enter in these tools.</strong>
                </p>

                <h2>Server-side tools</h2>
                <p>
                    The SEO audit and backlink checker send the URL or domain you enter to our server so we can fetch and analyze the public page.
                    We do not store audit results or domain queries beyond what is needed to complete your request.
                    We do not collect personal information through these tools.
                </p>

                <h2>Log data</h2>
                <p>
                    Like most websites, our hosting provider may log standard server data such as IP address, browser type, pages visited, and timestamps.
                    This is used for security and performance only.
                </p>

                <h2>Cookies</h2>
                <p>
                    SeoKitHub uses essential cookies for session and CSRF protection required by our framework.
                    We do not use advertising or third-party tracking cookies.
                </p>

                <h2>Third-party links</h2>
                <p>
                    Some tools link to external services (e.g. Ahrefs, Moz, Google Search Console).
                    We are not responsible for the privacy practices of those third-party sites.
                </p>

                <h2>Children</h2>
                <p>
                    SeoKitHub is not directed at children under 13. We do not knowingly collect personal information from children.
                </p>

                <h2>Changes</h2>
                <p>
                    We may update this policy from time to time. Changes will be posted on this page with an updated date.
                </p>

                <h2>Contact</h2>
                <p>
                    Questions about this policy? Visit our <Link href="/contact">Contact page</Link>.
                </p>
            </StaticPageLayout>
        </AppLayout>
    );
}
