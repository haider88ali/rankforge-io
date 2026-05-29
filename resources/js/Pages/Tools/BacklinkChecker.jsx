import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ToolPageLayout from '@/Components/ToolPageLayout';
import { TOOL_SEO } from '@/config/toolSeo';
import { Search, Loader2, CheckCircle2, XCircle, AlertTriangle, ExternalLink, Info } from 'lucide-react';

const STATUS = {
    pass:    { icon: CheckCircle2,  color: 'text-green-600' },
    warning: { icon: AlertTriangle, color: 'text-amber-500' },
    fail:    { icon: XCircle,       color: 'text-red-500' },
    info:    { icon: Info,          color: 'text-blue-500' },
};

export default function BacklinkCheckerPage() {
    const [domain, setDomain] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const check = async () => {
        if (!domain.trim()) return;
        setLoading(true); setError(''); setResult(null);
        try {
            const res = await fetch('/api/backlinks/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '' },
                body: JSON.stringify({ domain: domain.trim() }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Check failed');
            setResult(data);
        } catch (e) { setError(e.message); }
        finally { setLoading(false); }
    };

    return (
        <AppLayout>
            <ToolPageLayout
                {...TOOL_SEO.backlinkChecker}
                title="Free Backlink Checker — Check Backlinks for Any Website"
                description="Search and check backlinks for any domain. Analyze HTTPS, sitemap, robots.txt, and indexed pages — then access free backlink data from Ahrefs, Moz & Majestic. No signup."
                breadcrumb="Backlink Checker"
                howTo={[
                    { title: 'Enter a Domain', desc: 'Type any domain name (e.g. example.com) — no need to include https://.' },
                    { title: 'View Domain Signals', desc: 'We check HTTPS, title, meta description, robots.txt, sitemap, and indexed URL count.' },
                    { title: 'Find Backlink Data', desc: 'Use the direct links to free tools like Ahrefs Free, Moz Link Explorer and Majestic to see actual backlinks.' },
                ]}
                faqs={[
                    { q: 'Why can\'t I see exact backlink counts for free?', a: "Real backlink databases require crawling billions of pages continuously. Tools like Ahrefs and Moz spend millions building these databases — that's why they charge. We show you free access points to these tools." },
                    { q: 'What domain signals do you check?', a: 'We check: HTTPS/SSL status, homepage title tag, meta description presence, robots.txt file, XML sitemap existence, and the number of URLs indexed in the sitemap.' },
                    { q: 'Which free backlink tools are the best?', a: 'Ahrefs free backlink checker gives 100 backlinks per domain. Moz Link Explorer gives 10 free queries/month. Majestic gives limited free data. Google Search Console (for your own site) gives full backlink data for free.' },
                    { q: 'How can I build backlinks to my site?', a: 'Top strategies: guest posting, creating linkable assets (tools, guides, data studies), submitting to directories, getting mentioned in industry roundups, and earning links through HARO (Help A Reporter Out).' },
                ]}
                relatedTools={[
                    { name: 'SEO Audit Tool', href: '/seo-audit-tool', desc: 'Run a full on-page SEO analysis on any URL.' },
                    { name: 'XML Sitemap Generator', href: '/xml-sitemap-generator', desc: 'Create a sitemap to help Google index your pages.' },
                    { name: 'Schema Markup Generator', href: '/schema-markup-generator', desc: 'Add structured data to improve your search presence.' },
                ]}
            >
                <div className="space-y-6">
                    {/* Input */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-7">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Domain Name</label>
                        <div className="flex gap-3">
                            <div className="flex-1 flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
                                <span className="px-3 text-sm text-gray-400 bg-gray-50 border-r border-gray-300 py-3 shrink-0">https://</span>
                                <input value={domain} onChange={e => setDomain(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && check()}
                                    placeholder="example.com"
                                    className="flex-1 px-4 py-3 text-sm focus:outline-none" />
                            </div>
                            <button onClick={check} disabled={!domain.trim() || loading}
                                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap">
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                                {loading ? 'Checking…' : 'Analyze Domain'}
                            </button>
                        </div>
                        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
                    </div>

                    {result && (
                        <div className="space-y-6">
                            {/* Domain signals */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-7">
                                <h2 className="font-bold text-gray-900 mb-5">Domain Health Signals — <span className="text-indigo-600">{result.domain}</span></h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {result.signals.map((s, i) => {
                                        const cfg = STATUS[s.status] || STATUS.info;
                                        const Icon = cfg.icon;
                                        return (
                                            <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${cfg.color}`} />
                                                <div className="min-w-0">
                                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{s.label}</p>
                                                    <p className="text-sm font-medium text-gray-800 mt-0.5 truncate">{s.value}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Backlink data sources */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-7">
                                <h2 className="font-bold text-gray-900 mb-2">Free Backlink Data Sources</h2>
                                <p className="text-sm text-gray-500 mb-5">Click any tool below to see actual backlink data for <strong>{result.domain}</strong>.</p>
                                <div className="space-y-3">
                                    {result.opportunities.map((op, i) => (
                                        <a key={i} href={op.url} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center justify-between gap-4 p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-colors group">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600">{op.source}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{op.tip}</p>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 shrink-0" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Tip */}
                            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                                <div className="flex items-start gap-3">
                                    <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-blue-900 mb-2">Best Free Option: Google Search Console</h3>
                                        <p className="text-sm text-blue-700 leading-relaxed">
                                            For your <strong>own website</strong>, Google Search Console is completely free and shows all your backlinks directly from Google's index — no limits, no cost.
                                            Go to <strong>Search Console → Links → Top linking sites</strong>.
                                        </p>
                                        <a href="https://search.google.com/search-console/" target="_blank" rel="noopener"
                                            className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-blue-600 hover:underline">
                                            Open Google Search Console <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </ToolPageLayout>
        </AppLayout>
    );
}
