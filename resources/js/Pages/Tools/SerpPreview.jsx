import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ToolPageLayout from '@/Components/ToolPageLayout';
import { Monitor, Smartphone } from 'lucide-react';

function pxWidth(text, fs) { return text.length * fs * 0.55; }

function PixelBar({ label, value, max }) {
    const pct = Math.min((value / max) * 100, 100);
    const over = value > max;
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
                <span>{label}</span>
                <span className={over ? 'text-red-600 font-semibold' : ''}>~{Math.round(value)}px / {max}px {over ? '⚠ May truncate' : '✓'}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${over ? 'bg-red-500' : 'bg-indigo-500'}`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}

function DesktopResult({ title, url, desc }) {
    const t = title || 'Your Page Title Goes Here — Site Name';
    const u = url || 'https://example.com/your-page';
    const d = desc || 'Your meta description appears here. Write something that makes users want to click through to your page from the search results.';
    const domain = (() => { try { return new URL(u.startsWith('http') ? u : 'https://' + u).hostname; } catch { return u; } })();
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-7">
            <div className="flex items-center gap-2 mb-5">
                <Monitor className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Desktop Preview</span>
            </div>
            <div className="max-w-xl font-sans space-y-1 border border-gray-100 rounded-xl p-5 bg-white">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-gray-200 text-[9px] flex items-center justify-center font-bold text-gray-500">{domain.charAt(0).toUpperCase()}</div>
                    <span className="truncate text-xs">{u.replace(/^https?:\/\//, '').split('?')[0]}</span>
                </div>
                <div className="text-[#1a0dab] text-xl leading-snug hover:underline cursor-pointer">{t.slice(0, 70)}</div>
                <div className="text-sm text-[#4d5156] leading-relaxed">{d.slice(0, 160)}</div>
            </div>
        </div>
    );
}

function MobileResult({ title, url, desc }) {
    const t = title || 'Your Page Title';
    const u = url || 'https://example.com/page';
    const d = desc || 'Your meta description preview on mobile devices.';
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-7">
            <div className="flex items-center gap-2 mb-5">
                <Smartphone className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Mobile Preview</span>
            </div>
            <div className="max-w-xs font-sans border border-gray-100 rounded-xl p-4 bg-white mx-auto space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <div className="w-4 h-4 rounded-full bg-gray-200 text-[8px] flex items-center justify-center text-gray-500 font-bold">G</div>
                    <span className="truncate">{u.replace(/^https?:\/\//, '').slice(0, 35)}</span>
                </div>
                <div className="text-[#1a0dab] text-base font-medium leading-snug hover:underline cursor-pointer">{t.slice(0, 60)}</div>
                <div className="text-xs text-[#4d5156] leading-relaxed">{d.slice(0, 120)}</div>
            </div>
        </div>
    );
}

export default function SerpPreviewPage() {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [desc, setDesc] = useState('');
    const [view, setView] = useState('both');

    return (
        <AppLayout>
            <ToolPageLayout
                seoTitle="Free SERP Preview Tool — See How Your Page Looks in Google"
                seoDescription="Preview Google search results free on SeoKitHub (SEO Kit Hub). Check title and meta description pixel widths on desktop and mobile before you publish."
                seoKeywords="serp preview tool, google search preview, serp simulator, meta title preview, seo preview tool free, google snippet preview, search result preview tool, seo snippet generator, title tag preview, meta description preview, mobile serp preview, desktop serp preview, how will my page look in google, google result simulator, seo title length checker"
                title="Free SERP Preview Tool"
                description="See exactly how your page title and meta description appear in Google search results — on both desktop and mobile. Check pixel widths to make sure nothing gets cut off."
                breadcrumb="SERP Preview Tool"
                howTo={[
                    { title: 'Enter Your Page Details', desc: 'Fill in your page title, URL, and meta description. The preview updates in real time as you type.' },
                    { title: 'Check Pixel Widths', desc: 'Google uses pixel width (not character count) to determine truncation. Aim for under 600px for titles and 920px for descriptions.' },
                    { title: 'Switch Desktop / Mobile', desc: 'Toggle between desktop and mobile views to see how your snippet looks on different devices.' },
                ]}
                faqs={[
                    { q: 'How does Google decide what title to show?', a: "Google may rewrite your title tag if it's too long, too short, or doesn't match the page content. Keep titles between 50–60 characters and make them descriptive." },
                    { q: 'What is the pixel limit for meta titles?', a: 'Google truncates titles at approximately 600px width. Since font sizes vary, the safest limit is around 55–60 characters for most fonts.' },
                    { q: 'What is the pixel limit for meta descriptions?', a: 'Descriptions are truncated at approximately 920px on desktop, which is roughly 155–160 characters. Mobile descriptions are shorter — around 120 characters.' },
                    { q: 'Does Google always show my meta description?', a: "No — Google may rewrite or replace your description with text from the page if it's more relevant to the query. Write a clear, keyword-rich description as a strong default." },
                ]}
                relatedTools={[
                    { name: 'SEO Audit Tool', href: '/seo-audit-tool', desc: 'Run a full SEO audit on the page you are previewing.' },
                    { name: 'URL Slug Generator', href: '/url-slug-generator', desc: 'Create the SEO-friendly URL to use in this preview.' },
                    { name: 'Schema Markup Generator', href: '/schema-markup-generator', desc: 'Add structured data for rich results in the SERP.' },
                ]}
            >
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-200 p-7 space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Page Title</label>
                            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Best Running Shoes 2026 — Expert Reviews & Top Picks"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            <div className="mt-2"><PixelBar label="Title pixel width" value={pxWidth(title, 20)} max={600} /></div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Page URL</label>
                            <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/best-running-shoes"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Description</label>
                            <textarea rows={3} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Write a compelling description that makes people want to click…"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
                            <div className="mt-2"><PixelBar label="Description pixel width" value={pxWidth(desc, 14)} max={920} /></div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {[{k:'both',l:'Both'},{k:'desktop',l:'Desktop',icon:Monitor},{k:'mobile',l:'Mobile',icon:Smartphone}].map(v => (
                            <button key={v.k} onClick={() => setView(v.k)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${view === v.k ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
                                {v.icon && <v.icon className="w-3.5 h-3.5" />}{v.l}
                            </button>
                        ))}
                    </div>

                    <div className={`grid gap-6 ${view === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'max-w-2xl'}`}>
                        {(view === 'both' || view === 'desktop') && <DesktopResult title={title} url={url} desc={desc} />}
                        {(view === 'both' || view === 'mobile') && <MobileResult title={title} url={url} desc={desc} />}
                    </div>
                </div>
            </ToolPageLayout>
        </AppLayout>
    );
}
