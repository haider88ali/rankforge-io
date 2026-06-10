import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ToolPageLayout from '@/Components/ToolPageLayout';
import { TOOL_SEO } from '@/config/toolSeo';
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
                {...TOOL_SEO.seoAudit}
                breadcrumb="SEO Audit Tool"
                howTo={[
                    { title: 'Enter Any URL', desc: 'Type or paste the full URL of the page you want to audit (e.g. https://example.com/page).' },
                    { title: 'Run the Audit', desc: 'Our tool fetches the page and analyzes 17 SEO factors across On-Page, Technical, Social, Content and Performance.' },
                    { title: 'Fix the Issues', desc: 'Review each check — passes, warnings and failures — and prioritize fixing the red items first.' },
                ]}
                faqs={[
                    { q: 'What does the audit check?', a: '17 on-page and technical factors — title, meta, headings, SSL, schema, robots.txt, sitemap, and server response time.' },
                    { q: 'How is the SEO score calculated?', a: 'Percentage of checks passed. 80+ is strong, 50–79 needs work, below 50 has critical issues.' },
                    { q: 'Can I audit a competitor\'s site?', a: 'Yes — enter any publicly accessible URL.' },
                    { q: 'Is this the same as PageSpeed Insights?', a: 'No. We check on-page SEO factors. PageSpeed measures load performance and Core Web Vitals.' },
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
