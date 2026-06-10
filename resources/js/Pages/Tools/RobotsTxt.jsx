import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ToolPageLayout from '@/Components/ToolPageLayout';
import { TOOL_SEO } from '@/config/toolSeo';
import CopyButton from '@/Components/CopyButton';
import { Download, Plus, Trash2 } from 'lucide-react';

const BOTS = ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider', 'YandexBot', 'GPTBot'];

function buildRobots(rules, sitemaps, crawlDelay) {
    const lines = [];
    rules.forEach(r => {
        lines.push(`User-agent: ${r.agent || '*'}`);
        r.disallow.filter(Boolean).forEach(d => lines.push(`Disallow: ${d}`));
        r.allow.filter(Boolean).forEach(a => lines.push(`Allow: ${a}`));
        if (crawlDelay) lines.push(`Crawl-delay: ${crawlDelay}`);
        lines.push('');
    });
    sitemaps.filter(Boolean).forEach(s => lines.push(`Sitemap: ${s}`));
    return lines.join('\n').trim();
}

export default function RobotsTxtPage() {
    const [rules, setRules] = useState([{ agent: '*', disallow: ['/admin/', '/private/'], allow: ['/'] }]);
    const [sitemaps, setSitemaps] = useState(['https://example.com/sitemap.xml']);
    const [crawlDelay, setCrawlDelay] = useState('');
    const output = buildRobots(rules, sitemaps, crawlDelay);

    const download = () => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([output], { type: 'text/plain' }));
        a.download = 'robots.txt'; a.click();
    };

    const updateRule = (i, field, value) => setRules(rules.map((r, j) => j === i ? { ...r, [field]: value } : r));
    const updateList = (ri, field, idx, val) => setRules(rules.map((r, j) => j !== ri ? r : { ...r, [field]: r[field].map((v, k) => k === idx ? val : v) }));
    const addToList = (ri, field) => setRules(rules.map((r, j) => j === ri ? { ...r, [field]: [...r[field], ''] } : r));
    const removeFromList = (ri, field, idx) => setRules(rules.map((r, j) => j === ri ? { ...r, [field]: r[field].filter((_, k) => k !== idx) } : r));

    return (
        <AppLayout>
            <ToolPageLayout
                {...TOOL_SEO.robotsTxt}
                breadcrumb="Robots.txt Generator"
                howTo={[
                    { title: 'Configure User-Agent Rules', desc: 'Choose which bots to target (all bots with * or specific ones like Googlebot). Add the paths you want to disallow or allow.' },
                    { title: 'Add Your Sitemap', desc: 'Enter your sitemap.xml URL so search engines can easily find and index all your pages.' },
                    { title: 'Download & Upload', desc: 'Copy the generated robots.txt or download it. Upload the file to your website root directory (e.g. https://example.com/robots.txt).' },
                ]}
                faqs={[
                    { q: 'Where do I upload robots.txt?', a: 'Your website root — it must be at yourdomain.com/robots.txt.' },
                    { q: 'Does Disallow remove pages from Google?', a: 'No — it blocks crawling only. Use a noindex tag or Search Console to remove indexed pages.' },
                    { q: 'Should I include my sitemap URL?', a: 'Yes — add Sitemap: https://yourdomain.com/sitemap.xml at the bottom of the file.' },
                    { q: 'What\'s the difference between Allow and Disallow?', a: 'Disallow blocks paths from crawlers. Allow explicitly permits paths within a blocked section.' },
                ]}
                relatedTools={[
                    { name: 'XML Sitemap Generator', href: '/xml-sitemap-generator', desc: 'Create a sitemap.xml to reference in your robots.txt.' },
                    { name: 'Schema Markup Generator', href: '/schema-markup-generator', desc: 'Add structured data to help search engines understand your pages.' },
                    { name: 'Keyword Density Checker', href: '/keyword-density-checker', desc: 'Analyze your content for keyword optimization.' },
                ]}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-5">
                        {rules.map((rule, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="font-bold text-gray-900 text-sm">Crawl Rule #{i + 1}</h2>
                                    {rules.length > 1 && <button onClick={() => setRules(rules.filter((_, j) => j !== i))}><Trash2 className="w-4 h-4 text-gray-300 hover:text-red-400" /></button>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">User-agent</label>
                                    <div className="flex gap-2">
                                        <input value={rule.agent} onChange={e => updateRule(i, 'agent', e.target.value)} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                        <select onChange={e => updateRule(i, 'agent', e.target.value)} className="border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-600">
                                            <option value="">Pick bot</option>
                                            {BOTS.map(b => <option key={b} value={b}>{b}</option>)}
                                        </select>
                                    </div>
                                </div>
                                {['disallow', 'allow'].map(field => (
                                    <div key={field}>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1.5 capitalize">{field}</label>
                                        {rule[field].map((val, k) => (
                                            <div key={k} className="flex gap-2 mb-2">
                                                <input value={val} placeholder="/path/" onChange={e => updateList(i, field, k, e.target.value)} className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                                <button onClick={() => removeFromList(i, field, k)}><Trash2 className="w-3.5 h-3.5 text-gray-300 hover:text-red-400" /></button>
                                            </div>
                                        ))}
                                        <button onClick={() => addToList(i, field)} className="text-xs text-indigo-600 hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Add {field} rule</button>
                                    </div>
                                ))}
                            </div>
                        ))}

                        <button onClick={() => setRules([...rules, { agent: '*', disallow: [''], allow: [] }])}
                            className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl p-4 text-sm text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors">
                            <Plus className="w-4 h-4" /> Add User-agent Rule
                        </button>

                        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
                            <h2 className="font-bold text-gray-900 text-sm">Sitemaps</h2>
                            {sitemaps.map((s, i) => (
                                <div key={i} className="flex gap-2">
                                    <input value={s} placeholder="https://example.com/sitemap.xml" onChange={e => setSitemaps(sitemaps.map((v, j) => j === i ? e.target.value : v))} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    {sitemaps.length > 1 && <button onClick={() => setSitemaps(sitemaps.filter((_, j) => j !== i))}><Trash2 className="w-3.5 h-3.5 text-gray-300 hover:text-red-400" /></button>}
                                </div>
                            ))}
                            <button onClick={() => setSitemaps([...sitemaps, ''])} className="text-xs text-indigo-600 hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Add sitemap</button>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Crawl-delay (seconds, optional)</label>
                            <input type="number" value={crawlDelay} onChange={e => setCrawlDelay(e.target.value)} placeholder="e.g. 10" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 lg:sticky lg:top-24 self-start">
                        <h2 className="font-bold text-gray-900">robots.txt Output</h2>
                        <pre className="bg-gray-50 rounded-xl p-4 text-xs font-mono text-gray-700 overflow-auto max-h-[500px] leading-relaxed whitespace-pre-wrap">
                            {output || '# Output appears here'}
                        </pre>
                        <div className="flex gap-2">
                            <CopyButton text={output} />
                            <button onClick={download} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
                                <Download className="w-3.5 h-3.5" /> Download
                            </button>
                        </div>
                    </div>
                </div>
            </ToolPageLayout>
        </AppLayout>
    );
}
