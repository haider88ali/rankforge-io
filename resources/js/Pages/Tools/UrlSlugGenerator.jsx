import { Head } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ToolPageLayout from '@/Components/ToolPageLayout';
import CopyButton from '@/Components/CopyButton';
import { Link2 } from 'lucide-react';

const STOP_WORDS = new Set(['a','an','the','and','or','but','in','on','at','to','for','of','with','by','from','is','was','are','were','be','this','that','it','its','as','so','if','not','do','does','did','will','would','could','should']);

function toSlug(text, opts) {
    let s = text.trim();
    if (!s) return '';

    // Replace accented chars
    s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // Lowercase
    s = s.toLowerCase();
    // Remove stop words if requested
    if (opts.removeStopWords) {
        s = s.split(/\s+/).filter(w => !STOP_WORDS.has(w)).join(' ');
    }
    // Replace special chars with separator
    s = s.replace(/[&+]/g, `${opts.separator}and${opts.separator}`);
    s = s.replace(/[^a-z0-9\s-_]/g, '');
    // Replace spaces and multiple separators
    s = s.replace(/[\s_-]+/g, opts.separator);
    // Trim separator from ends
    s = s.replace(new RegExp(`^${opts.separator}+|${opts.separator}+$`, 'g'), '');

    if (opts.maxLength) {
        // Truncate at word boundary
        if (s.length > opts.maxLength) {
            s = s.slice(0, opts.maxLength);
            const lastSep = s.lastIndexOf(opts.separator);
            if (lastSep > 0) s = s.slice(0, lastSep);
        }
    }

    return s;
}

const EXAMPLES = [
    'How to Write a Meta Description That Gets Clicks',
    'Top 10 SEO Tools for Small Business in 2026',
    'What Is Schema Markup & Why Does It Matter?',
    'The Complete Guide to Robots.txt Files',
];

export default function UrlSlugGeneratorPage() {
    const [input, setInput] = useState('');
    const [baseUrl, setBaseUrl] = useState('https://rankforge.io/blog/');
    const [separator, setSeparator] = useState('-');
    const [removeStopWords, setRemoveStopWords] = useState(false);
    const [maxLength, setMaxLength] = useState(60);

    const slug = useMemo(() => toSlug(input, { separator, removeStopWords, maxLength }), [input, separator, removeStopWords, maxLength]);
    const fullUrl = `${baseUrl.replace(/\/$/, '')}/${slug}`;

    const slugScore = useMemo(() => {
        if (!slug) return null;
        let score = 0;
        if (slug.length >= 20 && slug.length <= 60) score += 35;
        else if (slug.length > 0) score += 15;
        if (!slug.includes('_')) score += 15;                         // uses hyphens not underscores
        if (slug === slug.toLowerCase()) score += 20;                 // all lowercase
        if (!/\d{4,}/.test(slug)) score += 10;                       // no long numbers
        if (slug.split('-').length >= 2 && slug.split('-').length <= 8) score += 20; // good word count
        return Math.min(score, 100);
    }, [slug]);

    return (
        <AppLayout>
            <Head>
                <title>Free URL Slug Generator — Create SEO-Friendly URL Slugs</title>
                <meta name="description" content="Convert any title or text into a clean, SEO-friendly URL slug instantly. Customize separator, remove stop words, set max length, and preview the full URL. 100% free." />
                <meta name="keywords" content="url slug generator, seo friendly url generator, slug generator, permalink generator, url converter free, convert title to url, url slug creator, clean url generator, wordpress slug generator, blog post url generator, seo url maker, remove stop words from url, url generator from text, post name generator, url friendly text converter" />
            </Head>

            <ToolPageLayout
                title="Free URL Slug Generator"
                description="Convert any page title or text into a clean, SEO-friendly URL slug in one click. Customize the separator, remove stop words, set a max length, and preview the full URL before you use it."
                breadcrumb="URL Slug Generator"
                howTo={[
                    { title: 'Enter Your Page Title', desc: 'Type or paste your blog post title, page title, or any text you want to turn into a URL slug.' },
                    { title: 'Customize the Options', desc: 'Choose your separator (hyphen or underscore), toggle stop word removal, and set a max character length.' },
                    { title: 'Copy the Slug or Full URL', desc: 'Copy the slug alone or the full URL with your base domain. Use it in your CMS, WordPress, or any website.' },
                ]}
                faqs={[
                    { q: 'What is a URL slug?', a: 'A URL slug is the part of a URL that identifies a specific page in a human-readable way. For example, in https://example.com/seo-tips, the slug is "seo-tips".' },
                    { q: 'Should I use hyphens or underscores in URLs?', a: 'Always use hyphens. Google treats hyphens as word separators, so "seo-tips" is read as "seo tips". Underscores ("seo_tips") are treated as one word and hurt readability and SEO.' },
                    { q: 'Should I remove stop words from URLs?', a: "Stop words like 'the', 'and', 'of' generally don't add SEO value to URLs. Removing them makes URLs shorter and cleaner. However, if removing them changes the meaning, keep them." },
                    { q: 'How long should a URL slug be?', a: 'Aim for 3–5 words, ideally under 60 characters. Shorter slugs are easier to share, remember, and rank. Include your main keyword at the start.' },
                    { q: 'Do URL slugs affect SEO?', a: 'Yes. Clean, keyword-rich URL slugs are a minor but real ranking factor. They also improve click-through rates as users can read what the page is about directly from the URL.' },
                ]}
                relatedTools={[
                    { name: 'SERP Preview Tool', href: '/serp-preview-tool', desc: 'Preview how your URL and title look in Google.' },
                    { name: 'SEO Audit Tool', href: '/seo-audit-tool', desc: 'Audit the page you are building the slug for.' },
                    { name: 'SERP Preview Tool', href: '/serp-preview-tool', desc: 'Preview how your URL, title and description look in Google.' },
                ]}
            >
                <div className="space-y-6">
                    {/* Input */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-7 space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Page Title / Text <span className="text-red-400">*</span></label>
                            <input value={input} onChange={e => setInput(e.target.value)}
                                placeholder="e.g. How to Write a Meta Description That Gets Clicks"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            <div className="flex flex-wrap gap-2 mt-3">
                                <span className="text-xs text-gray-400">Examples:</span>
                                {EXAMPLES.map(ex => (
                                    <button key={ex} onClick={() => setInput(ex)}
                                        className="text-xs text-indigo-600 hover:underline truncate max-w-[200px]">{ex}</button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Base URL (optional)</label>
                            <input value={baseUrl} onChange={e => setBaseUrl(e.target.value)}
                                placeholder="https://yourdomain.com/blog/"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2 border-t border-gray-100">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-2">Separator</label>
                                <div className="flex gap-2">
                                    {[{ val: '-', label: 'Hyphen  -' }, { val: '_', label: 'Underscore _' }].map(opt => (
                                        <button key={opt.val} onClick={() => setSeparator(opt.val)}
                                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${separator === opt.val ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                                {separator === '_' && <p className="text-xs text-amber-600 mt-1">⚠ Google recommends hyphens over underscores.</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-2">Remove Stop Words</label>
                                <button onClick={() => setRemoveStopWords(!removeStopWords)}
                                    className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${removeStopWords ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                    {removeStopWords ? 'On (the, and, of…)' : 'Off — keep all words'}
                                </button>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-2">Max Length: {maxLength} chars</label>
                                <input type="range" min={20} max={120} value={maxLength} onChange={e => setMaxLength(+e.target.value)}
                                    className="w-full accent-indigo-600 mt-2" />
                                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>20</span><span>120</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Output */}
                    {slug && (
                        <div className="space-y-4">
                            {/* Slug */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-7 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-bold text-gray-900">Generated Slug</h2>
                                    {slugScore !== null && (
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${slugScore >= 80 ? 'bg-green-100 text-green-700' : slugScore >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                                            SEO Score: {slugScore}/100
                                        </span>
                                    )}
                                </div>

                                <div className="bg-gray-50 rounded-xl border border-gray-200 px-5 py-4 flex items-center justify-between gap-4">
                                    <code className="text-indigo-700 font-mono font-semibold text-lg break-all">{slug}</code>
                                    <CopyButton text={slug} />
                                </div>

                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span className={slug.length > 60 ? 'text-amber-600 font-medium' : ''}>{slug.length} characters</span>
                                    <span>·</span>
                                    <span>{slug.split(separator).filter(Boolean).length} words</span>
                                </div>
                            </div>

                            {/* Full URL preview */}
                            <div className="bg-white rounded-2xl border border-indigo-200 p-7 space-y-4">
                                <div className="flex items-center gap-2">
                                    <Link2 className="w-4 h-4 text-indigo-500" />
                                    <h2 className="font-bold text-gray-900">Full URL Preview</h2>
                                </div>
                                <div className="bg-indigo-50 rounded-xl border border-indigo-100 px-5 py-4 flex items-center justify-between gap-4">
                                    <code className="text-indigo-800 font-mono text-sm break-all">{fullUrl}</code>
                                    <CopyButton text={fullUrl} />
                                </div>
                            </div>

                            {/* Tips */}
                            {slugScore < 80 && (
                                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800 space-y-1">
                                    <p className="font-semibold">Improve your slug:</p>
                                    {slug.length > 60 && <p>• Slug is over 60 characters. Enable "Remove Stop Words" or shorten the title.</p>}
                                    {slug.split(separator).length > 8 && <p>• Too many words. Aim for 3–5 words in the slug.</p>}
                                    {separator === '_' && <p>• Switch to hyphens (-) instead of underscores for better SEO.</p>}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </ToolPageLayout>
        </AppLayout>
    );
}
