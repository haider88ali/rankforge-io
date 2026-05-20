import { Link, usePage } from '@inertiajs/react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import JsonLd from '@/Components/JsonLd';

const BASE_URL = 'https://seokithub.com';

function buildSchemas({ title, description, breadcrumb, faqs, url }) {
    const pageUrl = `${BASE_URL}${url}`;
    const schemas = [];

    // 1. WebPage schema
    schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description: description,
        url: pageUrl,
        publisher: {
            '@type': 'Organization',
            name: 'SeoKitHub',
            url: BASE_URL,
            logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/logo.png`,
            },
        },
        breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                { '@type': 'ListItem', position: 2, name: 'Tools', item: `${BASE_URL}/` },
                { '@type': 'ListItem', position: 3, name: breadcrumb || title, item: pageUrl },
            ],
        },
    });

    // 2. SoftwareApplication schema (marks as a free web tool)
    schemas.push({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: title,
        url: pageUrl,
        applicationCategory: 'WebApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description: description,
        publisher: {
            '@type': 'Organization',
            name: 'SeoKitHub',
            url: BASE_URL,
        },
    });

    // 3. FAQPage schema (only if FAQs provided)
    if (faqs && faqs.length > 0) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.a,
                },
            })),
        });
    }

    return schemas;
}

export default function ToolPageLayout({
    title,
    description,
    breadcrumb,
    children,
    howTo = [],
    faqs = [],
    relatedTools = [],
}) {
    const { url } = usePage();
    const schemas = buildSchemas({ title, description, breadcrumb, faqs, url });

    return (
        <>
            {/* Inject all JSON-LD schemas */}
            <JsonLd schemas={schemas} />

            {/* Page hero */}
            <section className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100 pt-10 pb-12 px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/" className="hover:text-indigo-600 transition-colors">Tools</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-gray-700 font-medium">{breadcrumb || title}</span>
                    </nav>

                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                        {title}
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">{description}</p>
                </div>
            </section>

            {/* Tool area */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
                {children}
            </section>

            {/* How to use */}
            {howTo.length > 0 && (
                <section className="bg-gray-50 border-y border-gray-100 py-16 px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">How to Use the {title}</h2>
                        <p className="text-gray-500 mb-8">Follow these simple steps to get the best results.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            {howTo.map((step, i) => (
                                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold flex items-center justify-center mb-4">
                                        {i + 1}
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ — also renders as rich result in Google */}
            {faqs.length > 0 && (
                <section className="max-w-3xl mx-auto px-4 py-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
                    <p className="text-gray-500 mb-8 text-sm">
                        These questions are also eligible to appear as <strong>Google rich results</strong> thanks to FAQ schema markup.
                    </p>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
                                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer font-medium text-gray-900 text-sm hover:bg-gray-50 transition-colors list-none">
                                    {faq.q}
                                    <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0" />
                                </summary>
                                <div className="px-6 pb-5 pt-2 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>

                    {/* Schema badge */}
                    <div className="mt-6 flex items-center gap-2 text-xs text-gray-400 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                        <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-green-700 font-medium">FAQ Schema (JSON-LD) is active on this page</span>
                        <span className="text-gray-400">— These FAQs are eligible for Google rich results.</span>
                    </div>
                </section>
            )}

            {/* Related tools */}
            {relatedTools.length > 0 && (
                <section className="bg-gray-50 border-t border-gray-100 py-16 px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Related Free SEO Tools</h2>
                        <p className="text-gray-500 mb-8 text-sm">More tools from SeoKitHub to help you rank higher.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {relatedTools.map(tool => (
                                <Link key={tool.href} href={tool.href}
                                    className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-sm transition-all">
                                    <h3 className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors mb-1">{tool.name}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed mb-3">{tool.desc}</p>
                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600">
                                        Open Tool <ArrowRight className="w-3 h-3" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
