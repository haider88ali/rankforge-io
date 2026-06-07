import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ToolPageLayout from '@/Components/ToolPageLayout';
import { TOOL_SEO } from '@/config/toolSeo';
import CopyButton from '@/Components/CopyButton';
import { Download, Plus, Trash2, CheckCircle2, XCircle } from 'lucide-react';

const TYPES = ['FAQ', 'Product', 'Article', 'Organization'];

function buildFAQ(faqs) {
    return { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.filter(f => f.q && f.a).map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) };
}
function buildProduct(p) {
    return { "@context": "https://schema.org", "@type": "Product", "name": p.name || "Product Name", "description": p.description || "", "image": p.image || "", "brand": { "@type": "Brand", "name": p.brand || "" }, "offers": { "@type": "Offer", "priceCurrency": p.currency || "USD", "price": p.price || "0", "availability": "https://schema.org/InStock" }, ...(p.rating ? { "aggregateRating": { "@type": "AggregateRating", "ratingValue": p.rating, "reviewCount": p.reviewCount || "1" } } : {}) };
}
function buildArticle(a) {
    return { "@context": "https://schema.org", "@type": "Article", "headline": a.headline || "", "description": a.description || "", "author": { "@type": "Person", "name": a.author || "" }, "datePublished": a.datePublished || new Date().toISOString().split('T')[0], "dateModified": a.dateModified || new Date().toISOString().split('T')[0], "image": a.image || "", "publisher": { "@type": "Organization", "name": a.publisher || "", "logo": { "@type": "ImageObject", "url": a.publisherLogo || "" } } };
}
function buildOrg(o) {
    return { "@context": "https://schema.org", "@type": "Organization", "name": o.name || "", "url": o.url || "", "logo": o.logo || "", "description": o.description || "", "contactPoint": { "@type": "ContactPoint", "telephone": o.phone || "", "contactType": "customer service" }, "sameAs": o.social ? o.social.split('\n').filter(Boolean) : [] };
}

const Field = ({ label, value, onChange, placeholder, type = 'text', rows }) => (
    <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
        {rows
            ? <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
            : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        }
    </div>
);

export default function SchemaMarkupPage() {
    const [type, setType] = useState('FAQ');
    const [faqs, setFaqs] = useState([{ q: '', a: '' }]);
    const [product, setProduct] = useState({ name: '', description: '', brand: '', price: '', currency: 'USD', image: '', rating: '', reviewCount: '' });
    const [article, setArticle] = useState({ headline: '', description: '', author: '', datePublished: '', dateModified: '', image: '', publisher: '', publisherLogo: '' });
    const [org, setOrg] = useState({ name: '', url: '', logo: '', description: '', phone: '', social: '' });

    const schema = type === 'FAQ' ? buildFAQ(faqs) : type === 'Product' ? buildProduct(product) : type === 'Article' ? buildArticle(article) : buildOrg(org);
    const json = JSON.stringify(schema, null, 2);
    const snippet = `<script type="application/ld+json">\n${json}\n</script>`;
    let valid = true;
    try { JSON.parse(json); if (!schema['@context'] || !schema['@type']) valid = false; } catch { valid = false; }

    const download = () => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([snippet], { type: 'text/html' }));
        a.download = 'schema.html'; a.click();
    };

    return (
        <AppLayout>
            <ToolPageLayout
                {...TOOL_SEO.schemaMarkup}
                title="Free Schema Markup Generator"
                description="Generate valid JSON-LD structured data for FAQ, Product, Article, and Organization schemas. Copy the code and paste into your HTML to unlock Google rich results."
                breadcrumb="Schema Markup Generator"
                howTo={[
                    { title: 'Choose Schema Type', desc: 'Select the type of schema that matches your page — FAQ, Product, Article, or Organization.' },
                    { title: 'Fill in the Details', desc: 'Complete the form fields with your page data. The JSON-LD output updates live as you type.' },
                    { title: 'Copy & Paste into HTML', desc: 'Copy the generated script tag and paste it inside the <head> of your HTML page.' },
                ]}
                faqs={[
                    { q: 'Where do I paste the generated code?', a: 'Add the script tag inside your page\'s <head> or before </body>.' },
                    { q: 'Which schema type should I pick?', a: 'FAQ for Q&A pages, Product for shop items, Article for blog posts, Organization for your homepage.' },
                    { q: 'Is the output valid JSON-LD?', a: 'Yes — copy the code and test it in Google\'s Rich Results Test.' },
                    { q: 'Does schema improve rankings?', a: 'Not directly, but rich results (stars, FAQs) can boost click-through rates.' },
                ]}
                relatedTools={[
                    { name: 'Robots.txt Generator', href: '/robots-txt-generator', desc: 'Control how search engines crawl your site.' },
                    { name: 'XML Sitemap Generator', href: '/xml-sitemap-generator', desc: 'Create a sitemap.xml to help Google index your pages.' },
                    { name: 'SERP Preview Tool', href: '/serp-preview-tool', desc: 'Preview how your rich results look in Google.' },
                ]}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Form */}
                    <div className="space-y-5">
                        {/* Type selector */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Schema Type</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {TYPES.map(t => (
                                    <button key={t} onClick={() => setType(t)}
                                        className={`py-2.5 rounded-xl text-sm font-semibold transition-colors ${type === t ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                            <h2 className="font-bold text-gray-900">{type} Details</h2>

                            {type === 'FAQ' && (
                                <div className="space-y-3">
                                    {faqs.map((faq, i) => (
                                        <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-2.5">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-semibold text-gray-400">Q&A #{i + 1}</span>
                                                {faqs.length > 1 && <button onClick={() => setFaqs(faqs.filter((_, j) => j !== i))}><Trash2 className="w-3.5 h-3.5 text-gray-300 hover:text-red-400" /></button>}
                                            </div>
                                            <input placeholder="Question" value={faq.q} onChange={e => setFaqs(faqs.map((f, j) => j === i ? { ...f, q: e.target.value } : f))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                            <textarea rows={2} placeholder="Answer" value={faq.a} onChange={e => setFaqs(faqs.map((f, j) => j === i ? { ...f, a: e.target.value } : f))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
                                        </div>
                                    ))}
                                    <button onClick={() => setFaqs([...faqs, { q: '', a: '' }])} className="text-sm text-indigo-600 hover:underline flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add Q&A</button>
                                </div>
                            )}

                            {type === 'Product' && (
                                <div className="space-y-3">
                                    <Field label="Product Name" value={product.name} onChange={v => setProduct({ ...product, name: v })} placeholder="iPhone 15 Pro" />
                                    <Field label="Description" value={product.description} onChange={v => setProduct({ ...product, description: v })} placeholder="Product description..." rows={2} />
                                    <div className="grid grid-cols-2 gap-3">
                                        <Field label="Brand" value={product.brand} onChange={v => setProduct({ ...product, brand: v })} placeholder="Apple" />
                                        <Field label="Price" value={product.price} onChange={v => setProduct({ ...product, price: v })} placeholder="999" />
                                        <Field label="Currency" value={product.currency} onChange={v => setProduct({ ...product, currency: v })} placeholder="USD" />
                                        <Field label="Rating (1-5)" value={product.rating} onChange={v => setProduct({ ...product, rating: v })} placeholder="4.8" />
                                    </div>
                                    <Field label="Image URL" value={product.image} onChange={v => setProduct({ ...product, image: v })} placeholder="https://..." />
                                </div>
                            )}

                            {type === 'Article' && (
                                <div className="space-y-3">
                                    <Field label="Headline" value={article.headline} onChange={v => setArticle({ ...article, headline: v })} placeholder="Article title..." />
                                    <Field label="Description" value={article.description} onChange={v => setArticle({ ...article, description: v })} rows={2} placeholder="Brief description..." />
                                    <div className="grid grid-cols-2 gap-3">
                                        <Field label="Author" value={article.author} onChange={v => setArticle({ ...article, author: v })} placeholder="John Doe" />
                                        <Field label="Publisher" value={article.publisher} onChange={v => setArticle({ ...article, publisher: v })} placeholder="My Blog" />
                                        <Field label="Date Published" value={article.datePublished} onChange={v => setArticle({ ...article, datePublished: v })} type="date" />
                                        <Field label="Date Modified" value={article.dateModified} onChange={v => setArticle({ ...article, dateModified: v })} type="date" />
                                    </div>
                                    <Field label="Image URL" value={article.image} onChange={v => setArticle({ ...article, image: v })} placeholder="https://..." />
                                </div>
                            )}

                            {type === 'Organization' && (
                                <div className="space-y-3">
                                    <Field label="Organization Name" value={org.name} onChange={v => setOrg({ ...org, name: v })} placeholder="Acme Corp" />
                                    <Field label="Website" value={org.url} onChange={v => setOrg({ ...org, url: v })} placeholder="https://acme.com" />
                                    <Field label="Logo URL" value={org.logo} onChange={v => setOrg({ ...org, logo: v })} placeholder="https://acme.com/logo.png" />
                                    <Field label="Description" value={org.description} onChange={v => setOrg({ ...org, description: v })} rows={2} placeholder="What we do..." />
                                    <Field label="Phone" value={org.phone} onChange={v => setOrg({ ...org, phone: v })} placeholder="+1-800-000-0000" />
                                    <Field label="Social Profiles (one per line)" value={org.social} onChange={v => setOrg({ ...org, social: v })} rows={3} placeholder={"https://twitter.com/acme\nhttps://linkedin.com/in/acme"} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Output */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 lg:sticky lg:top-24 self-start">
                        <div className="flex items-center justify-between">
                            <h2 className="font-bold text-gray-900">JSON-LD Output</h2>
                            <span className={`flex items-center gap-1.5 text-xs font-semibold ${valid ? 'text-green-600' : 'text-red-500'}`}>
                                {valid ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                {valid ? 'Valid Schema' : 'Incomplete'}
                            </span>
                        </div>
                        <pre className="bg-gray-50 rounded-xl p-4 text-xs font-mono text-gray-700 overflow-auto max-h-96 leading-relaxed whitespace-pre-wrap">
                            {snippet}
                        </pre>
                        <div className="flex gap-2">
                            <CopyButton text={snippet} />
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
