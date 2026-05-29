import { useState, useMemo } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ToolPageLayout from '@/Components/ToolPageLayout';
import { TOOL_SEO } from '@/config/toolSeo';
import { Info } from 'lucide-react';

const STOP = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','by','from','is','was','are','were','be','been','being','have','has','had','do','does','did','will','would','could','should','may','might','that','this','these','those','it','its','i','you','he','she','we','they','not','as','if','so','up','out','about','into','than','can','all','also','just','there','what','when','who','how','which','where','after','before','then','now','any','each','even','most','other','some','such','no','only','same','own','while','both','few','over','again','further','once','here']);

function analyze(text) {
    const words = (text.toLowerCase().match(/\b[a-z]{3,}\b/g) || []);
    const total = words.length;
    if (!total) return { total: 0, sentences: 0, keywords: [] };
    const freq = {};
    words.forEach(w => { if (!STOP.has(w)) freq[w] = (freq[w] || 0) + 1; });
    const keywords = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 40).map(([word, count]) => ({ word, count, density: ((count / total) * 100).toFixed(2) }));
    const sentences = (text.match(/[.!?]+/g) || []).length;
    return { total, sentences, keywords };
}

export default function KeywordDensityPage() {
    const [text, setText] = useState('');
    const [filter, setFilter] = useState('');
    const result = useMemo(() => analyze(text), [text]);

    const suggestions = useMemo(() => {
        const s = [];
        if (!result.keywords.length) return s;
        const top = result.keywords[0];
        if (parseFloat(top.density) > 3) s.push({ type: 'warning', msg: `"${top.word}" appears ${top.count}× (${top.density}%) — reduce it to avoid keyword stuffing.` });
        if (result.total < 300 && result.total > 0) s.push({ type: 'info', msg: 'Content is under 300 words. Aim for 600+ words for better Google rankings.' });
        if (result.total >= 1000) s.push({ type: 'success', msg: 'Great content length! Long-form articles (1000+ words) tend to rank better.' });
        if (result.total >= 300 && parseFloat(result.keywords[0]?.density) <= 3) s.push({ type: 'success', msg: 'Keyword density looks natural — good for avoiding over-optimization penalties.' });
        return s;
    }, [result]);

    const filtered = filter ? result.keywords.filter(k => k.word.includes(filter.toLowerCase())) : result.keywords;

    return (
        <AppLayout>
            <ToolPageLayout
                {...TOOL_SEO.keywordDensity}
                title="Free Keyword Density Checker"
                description="Paste your content to analyze keyword frequency, density percentages, and word count. Get smart suggestions to optimize text for SEO without keyword stuffing."
                breadcrumb="Keyword Density Checker"
                howTo={[
                    { title: 'Paste Your Content', desc: 'Copy your article, blog post, or any web page text and paste it into the text area below.' },
                    { title: 'Analyze Instantly', desc: 'The tool automatically calculates word count, keyword frequency, and density percentage for every significant word.' },
                    { title: 'Review Suggestions', desc: 'Read the NLP-based suggestions to identify over-used keywords or content that needs more depth.' },
                ]}
                faqs={[
                    { q: 'What is keyword density?', a: 'Keyword density is the percentage of times a keyword appears in your content compared to the total word count. Formula: (keyword count ÷ total words) × 100.' },
                    { q: 'What is the ideal keyword density for SEO?', a: 'There is no single perfect number, but most SEO experts recommend keeping your primary keyword between 0.5% and 2.5%. Going above 3–4% risks being flagged for keyword stuffing.' },
                    { q: 'What is keyword stuffing?', a: "Keyword stuffing is the practice of overloading a page with keywords to manipulate rankings. Google penalizes this. Focus on natural, reader-friendly writing instead." },
                    { q: 'Why does the tool skip short words?', a: 'Words under 3 characters and common stop words (the, and, a, etc.) are filtered out because they are not meaningful for SEO analysis.' },
                    { q: 'Can I check keyword density for a specific keyword?', a: 'Yes — use the filter box above the results table to search for any specific keyword and see its frequency and density.' },
                ]}
                relatedTools={[
                    { name: 'SERP Preview Tool', href: '/serp-preview-tool', desc: 'Preview how your optimized title and description look in Google.' },
                    { name: 'SEO Audit Tool', href: '/seo-audit-tool', desc: 'Run a full SEO audit after optimizing your content.' },
                    { name: 'URL Slug Generator', href: '/url-slug-generator', desc: 'Generate a clean URL slug for your content.' },
                ]}
            >
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-200 p-7">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Paste Your Content</label>
                        <textarea rows={12} value={text} onChange={e => setText(e.target.value)}
                            placeholder="Paste your article, blog post, or any web page content here…"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono" />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        {[{ label: 'Total Words', val: result.total }, { label: 'Unique Keywords', val: result.keywords.length }, { label: 'Sentences', val: result.sentences }].map(s => (
                            <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-5 text-center">
                                <div className="text-3xl font-extrabold text-gray-900">{s.val}</div>
                                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Suggestions */}
                    {suggestions.map((s, i) => (
                        <div key={i} className={`flex items-start gap-3 px-5 py-4 rounded-2xl border text-sm ${s.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' : s.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-blue-50 border-blue-200 text-blue-800'}`}>
                            <Info className="w-4 h-4 mt-0.5 shrink-0" />{s.msg}
                        </div>
                    ))}

                    {/* Table */}
                    {result.keywords.length > 0 && (
                        <div className="bg-white rounded-2xl border border-gray-200 p-7 space-y-5">
                            <div className="flex items-center justify-between gap-4">
                                <h2 className="font-bold text-gray-900">Keyword Frequency Analysis</h2>
                                <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Filter keywords…"
                                    className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-44" />
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="text-left py-2 px-3 text-xs font-bold text-gray-400 uppercase tracking-wide">#</th>
                                            <th className="text-left py-2 px-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Keyword</th>
                                            <th className="text-right py-2 px-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Count</th>
                                            <th className="text-right py-2 px-3 text-xs font-bold text-gray-400 uppercase tracking-wide">Density</th>
                                            <th className="py-2 px-3 text-xs font-bold text-gray-400 uppercase tracking-wide w-32">Visual</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filtered.map((k, i) => {
                                            const d = parseFloat(k.density);
                                            const tone = d > 3 ? 'text-red-600' : d >= 1 ? 'text-green-700' : 'text-gray-500';
                                            return (
                                                <tr key={k.word} className="hover:bg-gray-50">
                                                    <td className="py-2.5 px-3 text-gray-400 text-xs">{i + 1}</td>
                                                    <td className="py-2.5 px-3 font-mono font-semibold text-gray-800">{k.word}</td>
                                                    <td className="py-2.5 px-3 text-right text-gray-600">{k.count}</td>
                                                    <td className={`py-2.5 px-3 text-right font-bold ${tone}`}>{k.density}%</td>
                                                    <td className="py-2.5 px-3 w-32">
                                                        <div className="h-1.5 bg-gray-100 rounded-full">
                                                            <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${Math.min(d * 25, 100)}%` }} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </ToolPageLayout>
        </AppLayout>
    );
}
