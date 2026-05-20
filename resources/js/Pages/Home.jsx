import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    Code2, Bot, Globe, AlignLeft,
    Eye, Braces, Image, ArrowRight, Zap,
    Shield, Clock, Star, ShieldCheck, Link2, BarChart2
} from 'lucide-react';

const tools = [
    {
        name: 'Schema Markup Generator',
        desc: 'Generate valid JSON-LD structured data for FAQ, Product, Article and Organization schemas.',
        href: '/schema-markup-generator',
        icon: Code2,
        badge: null,
        color: 'blue',
    },
    {
        name: 'Robots.txt Generator',
        desc: 'Build robots.txt with crawl rules, user-agents, sitemap references and crawl-delay settings.',
        href: '/robots-txt-generator',
        icon: Bot,
        badge: null,
        color: 'slate',
    },
    {
        name: 'XML Sitemap Generator',
        desc: 'Create a sitemap.xml with priority, frequency and last-modified. Supports bulk URL import.',
        href: '/xml-sitemap-generator',
        icon: Globe,
        badge: null,
        color: 'cyan',
    },
    {
        name: 'Keyword Density Checker',
        desc: 'Analyze keyword frequency and density with NLP-powered suggestions to avoid over-optimization.',
        href: '/keyword-density-checker',
        icon: AlignLeft,
        badge: null,
        color: 'emerald',
    },
    {
        name: 'SERP Preview Tool',
        desc: 'Preview how your page looks in Google on both desktop and mobile with pixel-width meters.',
        href: '/serp-preview-tool',
        icon: Eye,
        badge: null,
        color: 'orange',
    },
    {
        name: 'JSON Formatter & Validator',
        desc: 'Beautify, minify and validate JSON data instantly in the browser. Nothing sent to servers.',
        href: '/json-formatter',
        icon: Braces,
        badge: null,
        color: 'amber',
    },
    {
        name: 'Image Compressor',
        desc: 'Compress JPG, PNG and WebP images in the browser. Drag & drop — files never leave your device.',
        href: '/image-compressor',
        icon: Image,
        badge: null,
        color: 'teal',
    },
    {
        name: 'SEO Audit Tool',
        desc: 'Full on-page SEO analysis — title, meta, headings, schema, SSL, speed and 17 more checks.',
        href: '/seo-audit-tool',
        icon: ShieldCheck,
        badge: 'NEW',
        color: 'green',
    },
    {
        name: 'Backlink Checker',
        desc: 'Domain link analysis — check HTTPS, sitemap, robots.txt and discover free backlink data sources.',
        href: '/backlink-checker',
        icon: Link2,
        badge: 'NEW',
        color: 'rose',
    },
    {
        name: 'URL Slug Generator',
        desc: 'Convert any title into a clean SEO-friendly URL slug. Customize separator, stop words and length.',
        href: '/url-slug-generator',
        icon: BarChart2,
        badge: 'NEW',
        color: 'fuchsia',
    },
];

const colorMap = {
    indigo: 'bg-indigo-100 text-indigo-600',
    violet: 'bg-violet-100 text-violet-600',
    blue: 'bg-blue-100 text-blue-600',
    slate: 'bg-slate-100 text-slate-600',
    cyan: 'bg-cyan-100 text-cyan-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    orange: 'bg-orange-100 text-orange-600',
    amber: 'bg-amber-100 text-amber-600',
    green: 'bg-green-100 text-green-600',
    rose: 'bg-rose-100 text-rose-600',
    fuchsia: 'bg-fuchsia-100 text-fuchsia-600',
    pink: 'bg-pink-100 text-pink-600',
    teal: 'bg-teal-100 text-teal-600',
};

const stats = [
    { value: '10+', label: 'Free Tools' },
    { value: '3', label: 'AI-Powered' },
    { value: '100%', label: 'Browser-based' },
    { value: '0', label: 'Sign-up needed' },
];

const features = [
    { icon: Zap, title: 'Instant Results', desc: 'Every tool runs directly in your browser — no waiting, no loading spinners.' },
    { icon: Shield, title: 'Privacy First', desc: 'Your data never leaves your device. No tracking, no data collection.' },
    { icon: Clock, title: 'Always Free', desc: 'All 10 tools are completely free — no AI costs, no hidden limits, no paywalls.' },
];

export default function Home() {
    return (
        <AppLayout>
            <Head>
                <title>SeoKitHub — 10 Free SEO Tools. No Sign-up, No Limits.</title>
                <meta name="description" content="SeoKitHub gives you 10 free SEO tools: website audit, schema markup generator, robots.txt builder, XML sitemap, SERP preview, keyword checker and more. No sign-up required." />
                <meta name="keywords" content="seokithub, free seo tools, free seo toolkit, seo tools for marketers, seo tools no login, free online seo tools 2026, website seo audit tool, schema markup generator, robots txt generator, xml sitemap generator, serp preview tool, keyword density checker, json formatter, image compressor, url slug generator, backlink checker free, seo tools for small business, seo tools for bloggers" />
            </Head>

            {/* Hero */}
            <section className="bg-gradient-to-b from-indigo-50 to-white pt-20 pb-24 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                        <Star className="w-3.5 h-3.5" /> 10 Free SEO & Developer Tools
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
                        <span className="text-indigo-600">SeoKitHub</span> — The Free<br />SEO Toolkit for Marketers
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Audit your site, check backlinks, generate schema markup, sitemaps, robots.txt and more — 100% free, no AI costs, no login, no limits. All tools run directly in your browser.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/seo-audit-tool"
                            className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-indigo-700 transition-colors text-sm">
                            Run Free SEO Audit <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/schema-markup-generator"
                            className="inline-flex items-center gap-2 bg-white text-gray-700 font-semibold px-6 py-3.5 rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors text-sm">
                            Schema Markup Generator
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
                        {stats.map(s => (
                            <div key={s.label} className="text-center">
                                <div className="text-3xl font-extrabold text-gray-900">{s.value}</div>
                                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">All Free SEO Tools</h2>
                    <p className="text-gray-500 text-lg">Everything you need to optimize your website — from content to technical SEO.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {tools.map(tool => (
                        <Link key={tool.href} href={tool.href}
                            className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col gap-4">
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorMap[tool.color]}`}>
                                    <tool.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors leading-snug">
                                            {tool.name}
                                        </h3>
                                        {tool.badge && (
                                            <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ${tool.badge === 'NEW' ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700'}`}>
                                                {tool.badge === 'NEW' ? '🔥 NEW' : tool.badge}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed flex-1">{tool.desc}</p>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:gap-2 transition-all">
                                Use Free Tool <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="bg-gray-50 border-y border-gray-200 py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Use SeoKitHub?</h2>
                    <p className="text-gray-500 text-lg">Simple, fast, and 100% free — no account needed.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map(f => (
                            <div key={f.title} className="bg-white rounded-2xl border border-gray-200 p-7">
                                <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center mb-5">
                                    <f.icon className="w-5 h-5 text-indigo-600" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-3xl mx-auto px-4 py-24 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Optimizing for Free</h2>
                <p className="text-gray-500 text-lg mb-8">Pick any tool below — no login, no credit card, no limits.</p>
                <div className="flex flex-wrap justify-center gap-3">
                    <Link href="/seo-audit-tool"
                        className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm">
                        SEO Audit Tool
                    </Link>
                    <Link href="/schema-markup-generator"
                        className="bg-white text-gray-700 font-semibold px-6 py-3 rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors text-sm">
                        Schema Generator
                    </Link>
                    <Link href="/robots-txt-generator"
                        className="bg-white text-gray-700 font-semibold px-6 py-3 rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors text-sm">
                        Robots.txt Generator
                    </Link>
                </div>
            </section>
        </AppLayout>
    );
}
