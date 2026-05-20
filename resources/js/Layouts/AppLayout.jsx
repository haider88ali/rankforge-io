import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Zap, Menu, X, ChevronDown, Code2, Bot, Globe, AlignLeft, Eye, Braces, Image, ArrowRight, ShieldCheck, Link2, BarChart2 } from 'lucide-react';

const megaMenu = [
    {
        category: 'SEO Tools',
        items: [
            { name: 'SERP Preview Tool',       href: '/serp-preview-tool',      icon: Eye,        desc: 'Preview Google search results' },
            { name: 'Keyword Density Checker', href: '/keyword-density-checker', icon: AlignLeft,  desc: 'Analyze keyword frequency' },
        ],
    },
    {
        category: 'Technical SEO',
        items: [
            { name: 'Schema Markup Generator', href: '/schema-markup-generator', icon: Code2,  desc: 'JSON-LD structured data' },
            { name: 'Robots.txt Generator',    href: '/robots-txt-generator',    icon: Bot,    desc: 'Control search crawlers' },
            { name: 'XML Sitemap Generator',   href: '/xml-sitemap-generator',   icon: Globe,  desc: 'Build sitemap.xml files' },
        ],
    },
    {
        category: 'Content & Dev',
        items: [
            { name: 'JSON Formatter',    href: '/json-formatter',   icon: Braces, desc: 'Beautify & validate JSON' },
            { name: 'Image Compressor',  href: '/image-compressor', icon: Image,  desc: 'Compress JPG, PNG, WebP' },
        ],
    },
    {
        category: 'Analysis Tools',
        items: [
            { name: 'SEO Audit Tool',      href: '/seo-audit-tool',      icon: ShieldCheck, desc: 'Full on-page SEO analysis' },
            { name: 'Backlink Checker',    href: '/backlink-checker',    icon: Link2,       desc: 'Domain link analysis' },
            { name: 'URL Slug Generator',  href: '/url-slug-generator',  icon: BarChart2,   desc: 'SEO-friendly URL slugs' },
        ],
    },
];

// Featured tools shown directly in the nav bar
const featuredNav = [
    { name: 'SEO Audit',        href: '/seo-audit-tool' },
    { name: 'Schema Generator', href: '/schema-markup-generator' },
    { name: 'Robots.txt',       href: '/robots-txt-generator' },
    { name: 'JSON Formatter',   href: '/json-formatter' },
    { name: 'Image Compressor', href: '/image-compressor' },
];

export default function AppLayout({ children }) {
    const [toolsOpen, setToolsOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { url } = usePage();

    const isActive = (href) => url === href || url.startsWith(href);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* ── Announcement bar ── */}
            <div className="bg-indigo-600 text-white text-xs font-medium text-center py-2 px-4">
                ⚡ SeoKitHub — 10 free SEO & developer tools, no AI costs, no account required.&nbsp;
                <Link href="/" className="underline underline-offset-2 hover:no-underline">Explore all tools →</Link>
            </div>

            {/* ── Header ── */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 gap-6">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2.5 shrink-0">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
                            </div>
                            <span className="font-bold text-gray-900 text-[17px] tracking-tight">
                                SeoKit<span className="text-indigo-600">Hub</span>
                            </span>
                        </Link>

                        {/* ── Desktop nav ── */}
                        <nav className="hidden lg:flex items-center gap-1 flex-1">

                            {/* All Tools mega-menu trigger */}
                            <div className="relative"
                                onMouseEnter={() => setToolsOpen(true)}
                                onMouseLeave={() => setToolsOpen(false)}
                            >
                                <button className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${toolsOpen ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                                    All Tools
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${toolsOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Mega menu */}
                                {toolsOpen && (
                                    <div className="absolute top-full left-0 mt-1 w-[700px] bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
                                        <div className="grid grid-cols-3 gap-0 divide-x divide-gray-100">
                                            {megaMenu.map(group => (
                                                <div key={group.category} className="p-5">
                                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">{group.category}</p>
                                                    <ul className="space-y-0.5">
                                                        {group.items.map(item => (
                                                            <li key={item.href}>
                                                                <Link href={item.href}
                                                                    className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-indigo-50 group transition-colors">
                                                                    <div className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                                                                        <item.icon className="w-3.5 h-3.5 text-gray-500 group-hover:text-indigo-600 transition-colors" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-gray-800 group-hover:text-indigo-600 leading-tight transition-colors">{item.name}</p>
                                                                        <p className="text-xs text-gray-400 mt-0.5 leading-tight">{item.desc}</p>
                                                                    </div>
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                        {/* Footer */}
                                        <div className="bg-gray-50 border-t border-gray-100 px-5 py-3 flex items-center justify-between">
                                            <span className="text-xs text-gray-400">SeoKitHub — 10 free tools, no signup required</span>
                                            <Link href="/" className="text-xs font-semibold text-indigo-600 flex items-center gap-1 hover:underline">
                                                View all <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Divider */}
                            <div className="w-px h-4 bg-gray-200 mx-1" />

                            {/* 3 featured tool links */}
                            {featuredNav.map(item => (
                                <Link key={item.href} href={item.href}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${isActive(item.href) ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Right CTA */}
                        <div className="hidden lg:flex items-center gap-3 shrink-0">
                            <Link href="/"
                                className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
                                All Tools
                            </Link>
                            <Link href="/seo-audit-tool"
                                className="inline-flex items-center gap-1.5 bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                                Try Free <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Mobile hamburger */}
                        <button className="lg:hidden p-1 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors ml-auto" onClick={() => setMobileOpen(!mobileOpen)}>
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* ── Mobile nav drawer ── */}
                {mobileOpen && (
                    <div className="lg:hidden bg-white border-t border-gray-100">
                        <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
                            {/* Featured tools */}
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Popular</p>
                                {featuredNav.map(item => (
                                    <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            {megaMenu.map(group => (
                                <div key={group.category}>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">{group.category}</p>
                                    {group.items.map(item => (
                                        <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                                            <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                                                <item.icon className="w-3.5 h-3.5 text-gray-500" />
                                            </div>
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            ))}

                            <div className="pt-2 border-t border-gray-100">
                                <Link href="/seo-audit-tool" onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white font-semibold text-sm py-3 rounded-xl hover:bg-indigo-700 transition-colors">
                                    Try Free Tools <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* ── Page content ── */}
            <main className="flex-1">
                {children}
            </main>

            {/* ── Footer ── */}
            <footer className="bg-gray-950 text-gray-400 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
                        {/* Brand col — spans 2 */}
                        <div className="lg:col-span-2">
                            <Link href="/" className="flex items-center gap-2.5 mb-4">
                                <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
                                    <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
                                </div>
                                <span className="font-bold text-white text-xl tracking-tight">SeoKit<span className="text-indigo-400">Hub</span></span>
                            </Link>
                            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                                SeoKitHub gives you 10 free SEO & developer tools. No AI costs, no account, no limits. Everything runs in your browser.
                            </p>
                            <div className="flex items-center gap-2 mt-5">
                                <span className="text-xs bg-indigo-900/60 text-indigo-300 font-medium px-2.5 py-1 rounded-full">100% Free</span>
                                <span className="text-xs bg-gray-800 text-gray-400 font-medium px-2.5 py-1 rounded-full">No Sign-up</span>
                                <span className="text-xs bg-gray-800 text-gray-400 font-medium px-2.5 py-1 rounded-full">Browser-Based</span>
                            </div>
                        </div>

                        {/* SEO Tools */}
                        <div>
                            <h3 className="text-white font-semibold text-sm mb-5">SEO Tools</h3>
                            <ul className="space-y-3 text-sm">
                                <li><Link href="/serp-preview-tool" className="hover:text-white transition-colors">SERP Preview Tool</Link></li>
                                <li><Link href="/keyword-density-checker" className="hover:text-white transition-colors">Keyword Density Checker</Link></li>
                                <li><Link href="/seo-audit-tool" className="hover:text-white transition-colors">SEO Audit Tool</Link></li>
                                <li><Link href="/backlink-checker" className="hover:text-white transition-colors">Backlink Checker</Link></li>
                            </ul>
                        </div>

                        {/* Technical */}
                        <div>
                            <h3 className="text-white font-semibold text-sm mb-5">Technical SEO</h3>
                            <ul className="space-y-3 text-sm">
                                <li><Link href="/schema-markup-generator" className="hover:text-white transition-colors">Schema Markup Generator</Link></li>
                                <li><Link href="/robots-txt-generator" className="hover:text-white transition-colors">Robots.txt Generator</Link></li>
                                <li><Link href="/xml-sitemap-generator" className="hover:text-white transition-colors">XML Sitemap Generator</Link></li>
                            </ul>
                        </div>

                        {/* Content & Dev */}
                        <div>
                            <h3 className="text-white font-semibold text-sm mb-5">Content & Dev</h3>
                            <ul className="space-y-3 text-sm">
                                <li><Link href="/json-formatter" className="hover:text-white transition-colors">JSON Formatter</Link></li>
                                <li><Link href="/image-compressor" className="hover:text-white transition-colors">Image Compressor</Link></li>
                                <li><Link href="/url-slug-generator" className="hover:text-white transition-colors">URL Slug Generator</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
                        <p>© 2026 SeoKitHub — All rights reserved.</p>
                        <p>Built for marketers, writers & developers.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
