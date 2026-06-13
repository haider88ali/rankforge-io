import { Link } from '@inertiajs/react';
import { Mail, MessageSquare, Bug } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import StaticPageLayout from '@/Components/StaticPageLayout';

const CONTACT_EMAIL = 'ali88haider8875@gmail.com';

export default function Contact() {
    return (
        <AppLayout>
            <StaticPageLayout
                title="Contact SeoKitHub – Free SEO Tools Support"
                description="Get in touch with SeoKitHub for feedback, bug reports, or partnership inquiries. We're here to help with our free SEO tools."
                breadcrumb="Contact"
            >
                <p>
                    We'd love to hear from you. Whether you found a bug, have a feature idea, or want to list SeoKitHub on your directory — reach out anytime.
                </p>

                <div className="not-prose grid gap-4 my-8">
                    <a href={`mailto:${CONTACT_EMAIL}`}
                        className="flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-2xl hover:border-indigo-200 hover:shadow-sm transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                            <Mail className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">Email us</p>
                            <p className="text-sm text-gray-500 mt-0.5">{CONTACT_EMAIL}</p>
                        </div>
                    </a>

                    <div className="flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-2xl">
                        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                            <MessageSquare className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">Feature requests</p>
                            <p className="text-sm text-gray-500 mt-0.5">Tell us which SEO tool you'd like us to build next.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-2xl">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                            <Bug className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">Bug reports</p>
                            <p className="text-sm text-gray-500 mt-0.5">Include the tool name, URL tested, and what went wrong.</p>
                        </div>
                    </div>
                </div>

                <h2>Before you write</h2>
                <p>
                    SeoKitHub tools are free and require no account. For SEO audit or backlink checker issues, include the exact URL or domain you tested.
                    For browser tools, note your browser name and version.
                </p>

                <p>
                    See also: <Link href="/about">About SeoKitHub</Link> · <Link href="/privacy-policy">Privacy Policy</Link>
                </p>
            </StaticPageLayout>
        </AppLayout>
    );
}
