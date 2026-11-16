(function () {
    'use strict';

    var app = document.getElementById('schema-app');
    if (!app) return;

    var state = {
        type: 'FAQ',
        faqs: [{ q: '', a: '' }],
        product: { name: '', description: '', brand: '', price: '', currency: 'USD', image: '', rating: '', reviewCount: '' },
        article: { headline: '', description: '', author: '', datePublished: '', dateModified: '', image: '', publisher: '', publisherLogo: '' },
        org: { name: '', url: '', logo: '', description: '', phone: '', social: '' },
    };

    var formTitle = document.getElementById('schema-form-title');
    var faqWrap = document.getElementById('schema-form-faq');
    var outputEl = document.getElementById('schema-output');
    var validBadge = document.getElementById('schema-valid-badge');

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function buildFAQ(faqs) {
        return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.filter(function (f) { return f.q && f.a; }).map(function (f) {
            return { '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } };
        }) };
    }
    function buildProduct(p) {
        var out = { '@context': 'https://schema.org', '@type': 'Product', name: p.name || 'Product Name', description: p.description || '', image: p.image || '', brand: { '@type': 'Brand', name: p.brand || '' }, offers: { '@type': 'Offer', priceCurrency: p.currency || 'USD', price: p.price || '0', availability: 'https://schema.org/InStock' } };
        if (p.rating) out.aggregateRating = { '@type': 'AggregateRating', ratingValue: p.rating, reviewCount: p.reviewCount || '1' };
        return out;
    }
    function buildArticle(a) {
        var today = new Date().toISOString().split('T')[0];
        return { '@context': 'https://schema.org', '@type': 'Article', headline: a.headline || '', description: a.description || '', author: { '@type': 'Person', name: a.author || '' }, datePublished: a.datePublished || today, dateModified: a.dateModified || today, image: a.image || '', publisher: { '@type': 'Organization', name: a.publisher || '', logo: { '@type': 'ImageObject', url: a.publisherLogo || '' } } };
    }
    function buildOrg(o) {
        return { '@context': 'https://schema.org', '@type': 'Organization', name: o.name || '', url: o.url || '', logo: o.logo || '', description: o.description || '', contactPoint: { '@type': 'ContactPoint', telephone: o.phone || '', contactType: 'customer service' }, sameAs: o.social ? o.social.split('\n').filter(Boolean) : [] };
    }

    function currentSchema() {
        if (state.type === 'FAQ') return buildFAQ(state.faqs);
        if (state.type === 'Product') return buildProduct(state.product);
        if (state.type === 'Article') return buildArticle(state.article);
        return buildOrg(state.org);
    }

    function renderFaqForm() {
        faqWrap.innerHTML = state.faqs.map(function (faq, i) {
            return '<div class="border border-gray-100 rounded-xl p-4 space-y-2.5">' +
                '<div class="flex justify-between items-center">' +
                '<span class="text-xs font-semibold text-gray-400">Q&amp;A #' + (i + 1) + '</span>' +
                (state.faqs.length > 1 ? '<button type="button" data-remove-faq="' + i + '" class="text-gray-300 hover:text-red-400">✕</button>' : '') +
                '</div>' +
                '<input placeholder="Question" data-faq="' + i + '" data-faq-field="q" value="' + escapeHtml(faq.q) + '" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">' +
                '<textarea rows="2" placeholder="Answer" data-faq="' + i + '" data-faq-field="a" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none">' + escapeHtml(faq.a) + '</textarea>' +
                '</div>';
        }).join('') + '<button type="button" id="schema-add-faq" class="text-sm text-indigo-600 hover:underline flex items-center gap-1">+ Add Q&amp;A</button>';

        document.getElementById('schema-add-faq').addEventListener('click', function () {
            state.faqs.push({ q: '', a: '' });
            renderFaqForm();
        });
    }

    faqWrap.addEventListener('input', function (e) {
        var t = e.target;
        if (t.matches('[data-faq]')) {
            state.faqs[+t.dataset.faq][t.dataset.faqField] = t.value;
            renderOutput();
        }
    });
    faqWrap.addEventListener('click', function (e) {
        var remove = e.target.closest('[data-remove-faq]');
        if (remove) {
            state.faqs.splice(+remove.dataset.removeFaq, 1);
            renderFaqForm();
            renderOutput();
        }
    });

    // Generic field binder for product/article/org (data-field="group.key")
    app.addEventListener('input', function (e) {
        var t = e.target;
        var field = t.getAttribute('data-field');
        if (!field) return;
        var parts = field.split('.');
        state[parts[0]][parts[1]] = t.value;
        renderOutput();
    });

    function renderOutput() {
        var schema = currentSchema();
        var json = JSON.stringify(schema, null, 2);
        var snippet = '<script type="application/ld+json">\n' + json + '\n<\/script>';
        outputEl.textContent = snippet;

        var valid = true;
        if (!schema['@context'] || !schema['@type']) valid = false;

        validBadge.textContent = valid ? '✓ Valid Schema' : '✕ Incomplete';
        validBadge.className = 'flex items-center gap-1.5 text-xs font-semibold ' + (valid ? 'text-green-600' : 'text-red-500');
    }

    document.querySelectorAll('.schema-type-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            state.type = btn.dataset.schemaType;
            document.querySelectorAll('.schema-type-btn').forEach(function (b) {
                var active = b === btn;
                b.classList.toggle('bg-indigo-600', active);
                b.classList.toggle('text-white', active);
                b.classList.toggle('bg-gray-100', !active);
                b.classList.toggle('text-gray-600', !active);
            });
            formTitle.textContent = state.type + ' Details';
            ['faq', 'product', 'article', 'organization'].forEach(function (key) {
                document.getElementById('schema-form-' + key).classList.toggle('hidden', key !== (state.type === 'FAQ' ? 'faq' : state.type.toLowerCase()));
            });
            renderOutput();
        });
    });

    renderFaqForm();
    renderOutput();
})();
