import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import SeoHead from '@/Components/SeoHead';

export default function StaticPageLayout({ title, description, breadcrumb, path, children }) {
    return (
        <>
            <SeoHead title={title} description={description} path={path} />
            <section className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100 pt-10 pb-12 px-4">
                <div className="max-w-3xl mx-auto">
                    <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-gray-700 font-medium">{breadcrumb}</span>
                    </nav>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{title}</h1>
                    <p className="text-lg text-gray-500 leading-relaxed">{description}</p>
                </div>
            </section>
            <section className="max-w-3xl mx-auto px-4 py-14">
                <div className="prose prose-gray prose-sm max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-a:text-indigo-600">
                    {children}
                </div>
            </section>
        </>
    );
}
