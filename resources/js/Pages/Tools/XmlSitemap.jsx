import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ToolPageLayout from '@/Components/ToolPageLayout';
import CopyButton from '@/Components/CopyButton';
import { Download, Plus, Trash2, Upload } from 'lucide-react';

const FREQS = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];

function buildSitemap(urls) {
    const today = new Date().toISOString().split('T')[0];
    const entries = urls.filter(u => u.loc).map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod || today}</lastmod>\n    <changefreq>${u.changefreq || 'weekly'}</changefreq>\n    <priority>${u.priority || '0.5'}</priority>\n  </url>`).join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
}

export default function XmlSitemapPage() {
    const [urls, setUrls] = useState([
        { loc: 'https://example.com/', changefreq: 'daily', priority: '1.0', lastmod: '' },
        { loc: 'https://example.com/about', changefreq: 'monthly', priority: '0.8', lastmod: '' },
    ]);
    const [bulk, setBulk] = useState('');
    const [showBulk, setShowBulk] = useState(false);

    const importBulk = () => {
        const lines = bulk.split('\n').map(l => l.trim()).filter(Boolean);
        setUrls([...urls, ...lines.map(loc => ({ loc, changefreq: 'weekly', priority: '0.5', lastmod: '' }))]);
        setBulk(''); setShowBulk(false);
    };

    const output = buildSitemap(urls);
    const download = () => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([output], { type: 'application/xml' }));
        a.download = 'sitemap.xml'; a.click();
    };

    return (
        <AppLayout>
            <Head>
                <title>Free XML Sitemap Generator — Create sitemap.xml Online</title>
                <meta name="description" content="Generate a valid XML sitemap for your website for free. Add URLs, set priority and change frequency, then download your sitemap.xml and submit it to Google Search Console." />
                <meta name="keywords" content="xml sitemap generator, sitemap.xml generator, create sitemap, free sitemap generator, google sitemap tool, xml sitemap creator online, how to create sitemap.xml, sitemap generator free no limit, submit sitemap to google, sitemap for seo, website sitemap builder, sitemap generator without plugin, wordpress sitemap alternative, html sitemap vs xml sitemap, sitemap priority settings" />
            </Head>

            <ToolPageLayout
                title="Free XML Sitemap Generator"
                description="Create a valid sitemap.xml file for your website. Add your URLs, configure priorities and update frequencies, then download and submit to Google Search Console — completely free."
                breadcrumb="XML Sitemap Generator"
                howTo={[
                    { title: 'Add Your URLs', desc: 'Enter each page URL one by one, or use the bulk import to paste multiple URLs at once.' },
                    { title: 'Set Priority & Frequency', desc: 'Configure the crawl priority (0.1–1.0) and how often each page changes to guide search engine crawlers.' },
                    { title: 'Download & Submit', desc: 'Download your sitemap.xml and upload it to your server root. Then submit it in Google Search Console.' },
                ]}
                faqs={[
                    { q: 'What is an XML sitemap?', a: 'An XML sitemap is a file that lists all the important URLs on your website. It helps search engines like Google discover and index your pages faster and more efficiently.' },
                    { q: 'Where do I put my sitemap.xml?', a: 'Upload sitemap.xml to your website root so it is accessible at https://yourdomain.com/sitemap.xml. Then add a reference to it in your robots.txt file.' },
                    { q: 'How do I submit my sitemap to Google?', a: 'Go to Google Search Console → Sitemaps → Enter your sitemap URL → Click Submit. Google will then start crawling your URLs.' },
                    { q: 'What is sitemap priority?', a: 'Priority (0.1–1.0) tells search engines how important a URL is relative to other pages on your site. Your homepage is typically 1.0. It does not directly affect rankings.' },
                    { q: 'How often should I update my sitemap?', a: 'Update your sitemap whenever you add, remove, or significantly update pages. Most CMS platforms like WordPress can auto-generate and update your sitemap.' },
                ]}
                relatedTools={[
                    { name: 'Robots.txt Generator', href: '/robots-txt-generator', desc: 'Add your sitemap URL to your robots.txt file.' },
                    { name: 'Schema Markup Generator', href: '/schema-markup-generator', desc: 'Add structured data to your pages after indexing.' },
                    { name: 'SEO Audit Tool', href: '/seo-audit-tool', desc: 'Audit the pages you are adding to your sitemap.' },
                ]}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="font-bold text-gray-900">URLs <span className="text-gray-400 font-normal">({urls.filter(u => u.loc).length})</span></h2>
                            <button onClick={() => setShowBulk(!showBulk)} className="flex items-center gap-1.5 text-sm text-indigo-600 hover:underline">
                                <Upload className="w-3.5 h-3.5" /> Bulk import
                            </button>
                        </div>

                        {showBulk && (
                            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-3">
                                <p className="text-sm font-medium text-blue-800">Paste one URL per line</p>
                                <textarea rows={5} value={bulk} onChange={e => setBulk(e.target.value)} placeholder={"https://example.com/page-1\nhttps://example.com/page-2"} className="w-full border border-blue-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
                                <div className="flex gap-2">
                                    <button onClick={importBulk} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700">Import URLs</button>
                                    <button onClick={() => setShowBulk(false)} className="px-4 py-2 bg-white text-gray-600 text-sm rounded-lg border border-gray-200">Cancel</button>
                                </div>
                            </div>
                        )}

                        <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                            {urls.map((url, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-semibold text-gray-400">URL #{i + 1}</span>
                                        <button onClick={() => setUrls(urls.filter((_, j) => j !== i))}><Trash2 className="w-3.5 h-3.5 text-gray-300 hover:text-red-400" /></button>
                                    </div>
                                    <input value={url.loc} onChange={e => setUrls(urls.map((u, j) => j === i ? { ...u, loc: e.target.value } : u))} placeholder="https://example.com/page" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    <div className="grid grid-cols-3 gap-2">
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Frequency</label>
                                            <select value={url.changefreq} onChange={e => setUrls(urls.map((u, j) => j === i ? { ...u, changefreq: e.target.value } : u))} className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                                                {FREQS.map(f => <option key={f} value={f}>{f}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Priority</label>
                                            <select value={url.priority} onChange={e => setUrls(urls.map((u, j) => j === i ? { ...u, priority: e.target.value } : u))} className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                                                {['1.0','0.9','0.8','0.7','0.6','0.5','0.4','0.3','0.2','0.1'].map(p => <option key={p} value={p}>{p}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Last Modified</label>
                                            <input type="date" value={url.lastmod} onChange={e => setUrls(urls.map((u, j) => j === i ? { ...u, lastmod: e.target.value } : u))} className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button onClick={() => setUrls([...urls, { loc: '', changefreq: 'weekly', priority: '0.5', lastmod: '' }])}
                            className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl p-4 text-sm text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors">
                            <Plus className="w-4 h-4" /> Add URL
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 lg:sticky lg:top-24 self-start">
                        <div className="flex justify-between items-center">
                            <h2 className="font-bold text-gray-900">sitemap.xml</h2>
                            <span className="text-xs text-gray-400">{urls.filter(u => u.loc).length} URLs</span>
                        </div>
                        <pre className="bg-gray-50 rounded-xl p-4 text-xs font-mono text-gray-700 overflow-auto max-h-[480px] leading-relaxed">{output}</pre>
                        <div className="flex gap-2">
                            <CopyButton text={output} />
                            <button onClick={download} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
                                <Download className="w-3.5 h-3.5" /> Download .xml
                            </button>
                        </div>
                    </div>
                </div>
            </ToolPageLayout>
        </AppLayout>
    );
}
