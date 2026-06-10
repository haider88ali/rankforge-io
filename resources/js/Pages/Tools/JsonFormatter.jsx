import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ToolPageLayout from '@/Components/ToolPageLayout';
import { TOOL_SEO } from '@/config/toolSeo';
import CopyButton from '@/Components/CopyButton';
import { CheckCircle2, XCircle, Minimize2, Maximize2, Download } from 'lucide-react';

const SAMPLE = `{
  "name": "SeoKitHub",
  "version": "2.0",
  "tools": [
    { "id": 1, "name": "Meta Description Generator", "ai": true },
    { "id": 2, "name": "Schema Markup Generator", "ai": false }
  ],
  "free": true,
  "signupRequired": false
}`;

export default function JsonFormatterPage() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [indent, setIndent] = useState(2);

    const run = (action) => {
        setError(''); setOutput('');
        if (!input.trim()) { setError('Please paste some JSON first.'); return; }
        try {
            const parsed = JSON.parse(input);
            if (action === 'beautify') setOutput(JSON.stringify(parsed, null, indent));
            else if (action === 'minify') setOutput(JSON.stringify(parsed));
            else setOutput('✓ Valid JSON — no errors found!');
        } catch (e) {
            setError(e.message);
        }
    };

    const isValid = !input.trim() ? null : (() => { try { JSON.parse(input); return true; } catch { return false; } })();

    const download = () => {
        if (!output || output.startsWith('✓')) return;
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([output], { type: 'application/json' }));
        a.download = 'formatted.json'; a.click();
    };

    return (
        <AppLayout>
            <ToolPageLayout
                {...TOOL_SEO.jsonFormatter}
                breadcrumb="JSON Formatter"
                howTo={[
                    { title: 'Paste Your JSON', desc: 'Paste raw, minified, or malformed JSON into the input editor on the left.' },
                    { title: 'Choose an Action', desc: 'Click Beautify to format with indentation, Minify to compress it, or Validate to check for errors.' },
                    { title: 'Copy or Download', desc: 'Copy the formatted result to clipboard or download it as a .json file.' },
                ]}
                faqs={[
                    { q: 'Is my data sent to a server?', a: 'No — everything runs in your browser. Your JSON never leaves your device.' },
                    { q: 'Beautify vs minify — what\'s the difference?', a: 'Beautify adds spacing for readability. Minify removes whitespace for smaller file size.' },
                    { q: 'Why is my JSON invalid?', a: 'Common fixes: use double quotes, remove trailing commas, match all brackets.' },
                    { q: 'Can I validate JSON-LD schema here?', a: 'Yes — paste your schema markup and click Validate or Beautify.' },
                ]}
                relatedTools={[
                    { name: 'Schema Markup Generator', href: '/schema-markup-generator', desc: 'Generate JSON-LD structured data for your pages.' },
                    { name: 'Robots.txt Generator', href: '/robots-txt-generator', desc: 'Build your robots.txt file with our free tool.' },
                    { name: 'Image Compressor', href: '/image-compressor', desc: 'Compress images in the browser — no upload needed.' },
                ]}
            >
                <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                        <button onClick={() => run('beautify')} className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                            <Maximize2 className="w-4 h-4" /> Beautify
                        </button>
                        <button onClick={() => run('minify')} className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-800 text-white text-sm font-semibold rounded-xl hover:bg-gray-900 transition-colors">
                            <Minimize2 className="w-4 h-4" /> Minify
                        </button>
                        <button onClick={() => run('validate')} className="flex items-center gap-1.5 px-4 py-2.5 bg-white text-gray-700 text-sm font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                            <CheckCircle2 className="w-4 h-4" /> Validate
                        </button>
                        <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                            <span className="text-sm text-gray-500">Indent:</span>
                            {[2, 4].map(n => <button key={n} onClick={() => setIndent(n)} className={`w-8 h-8 rounded-lg text-sm font-semibold ${indent === n ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{n}</button>)}
                        </div>
                        <div className="ml-auto flex gap-3">
                            <button onClick={() => setInput(SAMPLE)} className="text-sm text-indigo-600 hover:underline">Load sample</button>
                            <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="text-sm text-gray-400 hover:underline">Clear</button>
                        </div>
                    </div>

                    {input.trim() && (
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${isValid ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                            {isValid ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                            {isValid ? 'Valid JSON' : 'Invalid JSON — click Validate for details'}
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 text-sm text-red-700">
                            <strong>JSON Error:</strong> {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-gray-700">Input JSON</label>
                                <span className="text-xs text-gray-400">{input.length.toLocaleString()} chars</span>
                            </div>
                            <textarea value={input} onChange={e => { setInput(e.target.value); setOutput(''); setError(''); }}
                                placeholder={'Paste your JSON here…\n\n{\n  "key": "value"\n}'}
                                rows={22} spellCheck={false}
                                className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none bg-gray-50" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-gray-700">Output</label>
                                <div className="flex gap-2">
                                    {output && !output.startsWith('✓') && <><CopyButton text={output} /><button onClick={download} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"><Download className="w-3.5 h-3.5" /> .json</button></>}
                                </div>
                            </div>
                            <div className={`rounded-2xl border px-4 py-3 text-xs font-mono overflow-auto resize-none bg-gray-50 min-h-[calc(22*1.6rem+1.5rem)] ${error ? 'border-red-200' : output?.startsWith('✓') ? 'border-green-200' : 'border-gray-300'}`}>
                                {output
                                    ? <pre className={output.startsWith('✓') ? 'text-green-700 text-base font-bold' : 'text-gray-700 whitespace-pre-wrap'}>{output}</pre>
                                    : <span className="text-gray-400">Output appears here after you click an action…</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </ToolPageLayout>
        </AppLayout>
    );
}
