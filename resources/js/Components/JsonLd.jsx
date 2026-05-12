import { useEffect } from 'react';

/**
 * Injects one or more JSON-LD <script> tags into <head> and removes them on unmount.
 * Pass an array of schema objects via the `schemas` prop.
 */
export default function JsonLd({ schemas = [] }) {
    useEffect(() => {
        const tags = schemas.map((schema) => {
            const el = document.createElement('script');
            el.type = 'application/ld+json';
            el.textContent = JSON.stringify(schema);
            document.head.appendChild(el);
            return el;
        });

        return () => {
            tags.forEach(el => {
                if (el.parentNode) el.parentNode.removeChild(el);
            });
        };
    }, [JSON.stringify(schemas)]);

    return null;
}
