import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ToolPageLayout from '@/Components/ToolPageLayout';
import { Search, Loader2, CheckCircle2, XCircle, AlertTriangle, ExternalLink } from 'lucide-react';

const STATUS = {
    pass:    { icon: CheckCircle2,   color: 'text-green-600',  bg: 'bg-green-50 border-green-200',   label: 'Pass' },
    warning: { icon: AlertTriangle,  color: 'text-amber-600',  bg: 'bg-amber-50 border-amber-200',   label: 'Warning' },
    fail:    { icon: XCircle,        color: 'text-red-600',    bg: 'bg-red-50 border-red-200',       label: 'Fail' },
};

function ScoreRing({ score }) {
    const color = score >= 80 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';
    const r = 54, c = 2 * Math.PI * r;
    const dash = (score / 100) * c;
    return (
        <div className="relative w-36 h-36 mx-auto">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r={r} fill="none" stroke="#f3f4f6" strokeWidth="12" />
                <circle cx="64" cy="64" r={r} fill="none" stroke={color} strokeWidth="12"
                    strokeDasharray={`${dash} ${c}`} strokeLinecap="round" style={{ transition: 'stroke-dasharray 1s ease' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-gray-900">{score}</span>
                <span className="text-xs text-gray-400 font-medium">/ 100</span>
            </div>
        </div>
    );
}

function CheckRow({ check }) {
    const s = STATUS[check.status];
    const Icon = s.icon;
    return (
        <div className={`flex items-start gap-3 p-4 rounded-xl border ${s.bg}`}>
            <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${s.color}`} />
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-900">{check.name}</span>
                    <span className={`text-[11px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded ${s.color} ${s.bg} border ${s.bg.split(' ')[1]}`}>
                        {s.label}
                    </span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{check.detail}</p>
                {check.value && check.value !== check.detail && (
                    <p className="text-xs text-gray-400 mt-0.5 font-mono truncate">{check.value}</p>
                )}
            </div>
        </div>
    );
}

const CATEGORIES = ['On-Page SEO', 'Technical SEO', 'Social & Sharing', 'Content', 'Crawlability', 'Performance'];

export default function SeoAuditPage() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const audit = async () => {
        if (!url.trim()) return;
        setLoading(true); setError(''); setResult(null);
        try {
            const res = await fetch('/api/seo/audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '' },
                body: JSON.stringify({ url: url.trim() }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Audit failed');
            setResult(data);
            setActiveTab('all');
        } catch (e) { setError(e.message); }
        finally { setLoading(false); }
    };

    const checks = result?.checks || [];
    const visibleChecks = activeTab === 'all' ? checks : checks.filter(c => c.category === activeTab);

    return (
        <AppLayout>
            <ToolPageLayout
                seoTitle="Free Website SEO Audit Tool — Full On-Page SEO Analysis"
                seoDescription="Run a free full SEO audit on any website with SeoKitHub (SEO Kit Hub). Check title tags, meta descriptions, H1 headings, schema markup, robots.txt, SSL, Open Graph and 17 more factors instantly."
                seoKeywords="website seo audit tool, free seo checker, seo analysis tool, on page seo audit, seo score checker free, full seo audit, technical seo audit tool, free website audit, check seo of website, seo audit report free, on page seo checker, page seo score, free seo report generator, seo checker tool online, website health check seo"
                title="Free Website SEO Audit Tool"
                description="Enter any URL to get a full on-page SEO analysis — title tags, meta descriptions, headings, schema markup, Open Graph, robots.txt, SSL, performance and more. 100% free, no login."
                breadcrumb="SEO Audit Tool"
                howTo={[
                    { title: 'Enter Any URL', desc: 'Type or paste the full URL of the page you want to audit (e.g. https://example.com/page).' },
                    { title: 'Run the Audit', desc: 'Our tool fetches the page and analyzes 17 SEO factors across On-Page, Technical, Social, Content and Performance.' },
                    { title: 'Fix the Issues', desc: 'Review each check — passes, warnings and failures — and prioritize fixing the red items first.' },
                ]}
                faqs={[
                    { q: 'What does the SEO audit tool check?', a: 'We analyze 17 factors including title tag, meta description, H1/H2 headings, image alt text, canonical URL, meta robots, HTTPS, mobile viewport, structured data, Open Graph, Twitter Card, word count, HTML lang attribute, robots.txt, sitemap, and server response time.' },
                    { q: 'Is this tool free?', a: 'Yes, 100% free. No account, no limits, no cost. Enter any URL and get a full SEO report instantly.' },
                    { q: 'How is the SEO score calculated?', a: 'The score is based on the percentage of checks that pass. A score of 80+ is excellent, 50-79 is good with room to improve, and below 50 means critical issues need fixing.' },
                    { q: 'Can I audit any website, not just mine?', a: 'Yes, you can audit any publicly accessible website. This is useful for competitor analysis or checking client sites.' },
                    { q: 'Why is my page load time different from PageSpeed Insights?', a: "Our tool measures raw server response time (TTFB) from our server. Google PageSpeed measures full page load including all assets in the browser. Use Google PageSpeed Insights for Core Web Vitals measurement." },
                ]}
                relatedTools={[
                    { name: 'Schema Markup Generator', href: '/schema-markup-generator', desc: 'Fix missing structured data found in your audit.' },
                    { name: 'Keyword Density Checker', href: '/keyword-density-checker', desc: 'Analyze keyword usage on your audited page.' },
                    { name: 'Robots.txt Generator', href: '/robots-txt-generator', desc: 'Create a proper robots.txt if your audit flagged it.' },
                ]}
            >
                <div className="space-y-6">
                    {/* Input */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-7">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Website URL to Audit</label>
                        <div className="flex gap-3">
                            <input value={url} onChange={e => setUrl(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && audit()}
                                placeholder="https://example.com"
                                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            <button onClick={audit} disabled={!url.trim() || loading}
                                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap">
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                                {loading ? 'Auditing…' : 'Run SEO Audit'}
                            </button>
                        </div>
                        {error && <p className="mt-3 text-sm text-red-600 flex items-center gap-1.5"><XCircle className="w-4 h-4" />{error}</p>}
                    </div>

                    {/* Results */}
                    {result && (
                        <div className="space-y-6">
                            {/* Score + summary */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-8">
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 items-center">
                                    <div className="sm:col-span-1">
                                        <ScoreRing score={result.score} />
                                        <p className="text-center mt-3 text-sm font-semibold text-gray-600">SEO Score</p>
                                    </div>
                                    <div className="sm:col-span-3 grid grid-cols-3 gap-4">
                                        <div className="text-center bg-green-50 rounded-2xl p-5 border border-green-100">
                                            <div className="text-4xl font-extrabold text-green-600">{result.pass}</div>
                                            <div className="text-sm text-green-700 font-medium mt-1">Passed</div>
                                        </div>
                                        <div className="text-center bg-amber-50 rounded-2xl p-5 border border-amber-100">
                                            <div className="text-4xl font-extrabold text-amber-500">{result.warning}</div>
                                            <div className="text-sm text-amber-700 font-medium mt-1">Warnings</div>
                                        </div>
                                        <div className="text-center bg-red-50 rounded-2xl p-5 border border-red-100">
                                            <div className="text-4xl font-extrabold text-red-500">{result.fail}</div>
                                            <div className="text-sm text-red-700 font-medium mt-1">Failed</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-5 border-t border-gray-100 flex flex-wrap gap-4 text-xs text-gray-500">
                                    <span>URL: <a href={result.url} target="_blank" rel="noopener" className="text-indigo-600 hover:underline inline-flex items-center gap-0.5">{result.url}<ExternalLink className="w-3 h-3" /></a></span>
                                    <span>HTTP Status: <strong className={result.httpStatus === 200 ? 'text-green-600' : 'text-red-600'}>{result.httpStatus}</strong></span>
                                    <span>Response Time: <strong>{result.loadTime}ms</strong></span>
                                    <span>Word Count: <strong>{result.wordCount?.toLocaleString()}</strong></span>
                                </div>
                            </div>

                            {/* Category tabs */}
                            <div className="flex flex-wrap gap-2">
                                {['all', ...CATEGORIES].map(cat => (
                                    <button key={cat} onClick={() => setActiveTab(cat)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${activeTab === cat ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
                                        {cat === 'all' ? `All (${checks.length})` : `${cat} (${checks.filter(c => c.category === cat).length})`}
                                    </button>
                                ))}
                            </div>

                            {/* Checks list */}
                            <div className="space-y-3">
                                {visibleChecks.map((check, i) => <CheckRow key={i} check={check} />)}
                            </div>
                        </div>
                    )}
                </div>
            </ToolPageLayout>
        </AppLayout>
    );
}
