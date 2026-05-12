import { Head } from '@inertiajs/react';
import { useState, useRef, useCallback } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ToolPageLayout from '@/Components/ToolPageLayout';
import { Upload, Download, X, Loader2, Image as Img } from 'lucide-react';
import imageCompression from 'browser-image-compression';

const fmt = b => !b ? '0 B' : b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(2)} MB`;

export default function ImageCompressorPage() {
    const [files, setFiles] = useState([]);
    const [quality, setQuality] = useState(80);
    const [maxPx, setMaxPx] = useState(1920);
    const [dragging, setDragging] = useState(false);
    const ref = useRef();

    const compress = useCallback(async (file, id) => {
        setFiles(p => p.map(f => f.id === id ? { ...f, status: 'compressing' } : f));
        try {
            const out = await imageCompression(file, { maxSizeMB: 10, maxWidthOrHeight: maxPx, useWebWorker: true, initialQuality: quality / 100 });
            const url = URL.createObjectURL(out);
            setFiles(p => p.map(f => f.id === id ? { ...f, status: 'done', out, url } : f));
        } catch {
            setFiles(p => p.map(f => f.id === id ? { ...f, status: 'error' } : f));
        }
    }, [quality, maxPx]);

    const addFiles = useCallback(list => {
        const valid = Array.from(list).filter(f => ['image/jpeg', 'image/png', 'image/webp'].includes(f.type));
        const items = valid.map(file => ({ id: Math.random().toString(36).slice(2), file, preview: URL.createObjectURL(file), status: 'pending', out: null, url: null }));
        setFiles(p => [...p, ...items]);
        items.forEach(it => compress(it.file, it.id));
    }, [compress]);

    const onDrop = useCallback(e => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }, [addFiles]);
    const remove = id => setFiles(p => p.filter(f => f.id !== id));
    const done = files.filter(f => f.status === 'done');
    const saved = done.reduce((a, f) => a + (f.file.size - f.out.size), 0);

    return (
        <AppLayout>
            <Head>
                <title>Free Online Image Compressor — Compress JPG, PNG & WebP in Browser</title>
                <meta name="description" content="Compress JPG, PNG and WebP images for free directly in your browser. Drag and drop your images, adjust quality, and download compressed files instantly. No upload, no server." />
                <meta name="keywords" content="image compressor, compress image online free, jpg compressor, png compressor, webp compressor, reduce image size online, image size reducer, compress photo online, reduce image file size, image optimizer free, bulk image compressor, compress image without losing quality, online image compression tool, shrink image file size, image compressor no watermark, browser image compressor" />
            </Head>

            <ToolPageLayout
                title="Free Online Image Compressor"
                description="Compress JPG, PNG, and WebP images directly in your browser — no upload needed, no server processing. Adjust quality and max dimensions, then download your optimized images instantly."
                breadcrumb="Image Compressor"
                howTo={[
                    { title: 'Drag & Drop Your Images', desc: 'Drop your JPG, PNG, or WebP files onto the upload zone, or click to browse and select files.' },
                    { title: 'Adjust Quality & Size', desc: 'Use the quality slider (10–100%) and max dimension setting to control the compression level.' },
                    { title: 'Download Compressed Files', desc: 'Click Download on each image or use Download All to save all compressed files at once.' },
                ]}
                faqs={[
                    { q: 'Are my images uploaded to a server?', a: 'No. All compression happens entirely in your browser using JavaScript (WebAssembly). Your images never leave your device.' },
                    { q: 'What image formats are supported?', a: 'JPG/JPEG, PNG, and WebP are supported. GIF and SVG are not supported for compression.' },
                    { q: 'What quality setting should I use?', a: 'For web images, 70–80% quality is a good balance between file size and visual quality. For thumbnails, 60% is fine. For print or hero images, use 85–90%.' },
                    { q: 'Why should I compress images for my website?', a: 'Large images are one of the biggest causes of slow page load times. Compressing images can improve Core Web Vitals (LCP), reduce bounce rates, and help SEO rankings.' },
                    { q: 'Can I compress multiple images at once?', a: 'Yes — drop multiple files at once or select multiple files using your file browser. Each image is compressed independently.' },
                ]}
                relatedTools={[
                    { name: 'SEO Audit Tool', href: '/seo-audit-tool', desc: 'Check the full SEO health of the page where you use these images.' },
                    { name: 'JSON Formatter', href: '/json-formatter', desc: 'Format and validate JSON data in your browser.' },
                    { name: 'XML Sitemap Generator', href: '/xml-sitemap-generator', desc: 'Add your image pages to a sitemap for Google.' },
                ]}
            >
                <div className="space-y-6">
                    {/* Settings */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-7 grid grid-cols-1 sm:grid-cols-2 gap-7">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Quality: <span className="text-indigo-600">{quality}%</span></label>
                            <input type="range" min={10} max={100} value={quality} onChange={e => setQuality(+e.target.value)} className="w-full accent-indigo-600" />
                            <div className="flex justify-between text-xs text-gray-400 mt-2"><span>Smaller file</span><span>Better quality</span></div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Max Dimension: <span className="text-indigo-600">{maxPx}px</span></label>
                            <input type="range" min={320} max={4096} step={64} value={maxPx} onChange={e => setMaxPx(+e.target.value)} className="w-full accent-indigo-600" />
                            <div className="flex justify-between text-xs text-gray-400 mt-2"><span>320px</span><span>4096px</span></div>
                        </div>
                    </div>

                    {/* Drop zone */}
                    <div onDrop={onDrop} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onClick={() => ref.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all ${dragging ? 'border-indigo-400 bg-indigo-50 scale-[1.01]' : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'}`}>
                        <Upload className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-700 font-semibold text-lg mb-1">Drag & drop images here</p>
                        <p className="text-sm text-gray-400">or click to browse — JPG, PNG, WebP supported</p>
                        <input ref={ref} type="file" multiple accept="image/jpeg,image/png,image/webp" className="hidden" onChange={e => addFiles(e.target.files)} />
                    </div>

                    {/* Savings bar */}
                    {done.length > 0 && (
                        <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-2xl px-6 py-4">
                            <div className="text-sm text-green-800 font-medium">
                                <strong>{done.length}</strong> image{done.length > 1 ? 's' : ''} compressed — saved <strong>{fmt(saved)}</strong> total
                            </div>
                            {done.length > 1 && (
                                <button onClick={() => done.forEach(f => { const a = document.createElement('a'); a.href = f.url; a.download = `compressed_${f.file.name}`; a.click(); })}
                                    className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors">
                                    <Download className="w-4 h-4" /> Download All
                                </button>
                            )}
                        </div>
                    )}

                    {/* Cards */}
                    {files.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {files.map(item => {
                                const savings = item.status === 'done' ? Math.round((1 - item.out.size / item.file.size) * 100) : 0;
                                return (
                                    <div key={item.id} className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
                                        <div className="flex gap-3">
                                            <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                                                {item.preview ? <img src={item.preview} className="w-full h-full object-cover" alt="" /> : <Img className="w-6 h-6 text-gray-300 m-auto mt-4" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{item.file.name}</p>
                                                <p className="text-xs text-gray-400 uppercase mt-0.5">{item.file.type.split('/')[1]}</p>
                                                {item.status === 'done' && (
                                                    <div className="flex items-center gap-2 mt-1.5 text-xs">
                                                        <span className="text-gray-400 line-through">{fmt(item.file.size)}</span>
                                                        <span className="font-bold text-green-600">{fmt(item.out.size)}</span>
                                                        <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">-{savings}%</span>
                                                    </div>
                                                )}
                                            </div>
                                            <button onClick={() => remove(item.id)} className="text-gray-300 hover:text-gray-500 shrink-0"><X className="w-4 h-4" /></button>
                                        </div>

                                        {item.status === 'compressing' && (
                                            <div className="flex items-center gap-2 text-xs text-indigo-600"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Compressing…</div>
                                        )}

                                        {item.status === 'done' && (
                                            <div className="space-y-2">
                                                <div className="h-1.5 bg-gray-100 rounded-full"><div className="h-full bg-green-500 rounded-full" style={{ width: `${savings}%` }} /></div>
                                                <a href={item.url} download={`compressed_${item.file.name}`}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                                                    <Download className="w-3.5 h-3.5" /> Download
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </ToolPageLayout>
        </AppLayout>
    );
}
