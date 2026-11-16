(function () {
    'use strict';

    var BOTS = ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider', 'YandexBot', 'GPTBot'];

    var state = {
        rules: [{ agent: '*', disallow: ['/admin/', '/private/'], allow: ['/'] }],
        sitemaps: ['https://example.com/sitemap.xml'],
        crawlDelay: '',
    };

    var rulesEl = document.getElementById('robots-rules');
    var sitemapsEl = document.getElementById('robots-sitemaps');
    var outputEl = document.getElementById('robots-output');
    var crawlDelayEl = document.getElementById('robots-crawl-delay');
    if (!rulesEl) return; // not on this page

    function buildOutput() {
        var lines = [];
        state.rules.forEach(function (r) {
            lines.push('User-agent: ' + (r.agent || '*'));
            r.disallow.filter(Boolean).forEach(function (d) { lines.push('Disallow: ' + d); });
            r.allow.filter(Boolean).forEach(function (a) { lines.push('Allow: ' + a); });
            if (state.crawlDelay) lines.push('Crawl-delay: ' + state.crawlDelay);
            lines.push('');
        });
        state.sitemaps.filter(Boolean).forEach(function (s) { lines.push('Sitemap: ' + s); });
        return lines.join('\n').trim();
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function renderRules() {
        rulesEl.innerHTML = state.rules.map(function (rule, i) {
            var botOptions = BOTS.map(function (b) { return '<option value="' + b + '">' + b + '</option>'; }).join('');
            var fields = ['disallow', 'allow'].map(function (field) {
                var rows = rule[field].map(function (val, k) {
                    return '<div class="flex gap-2 mb-2">' +
                        '<input value="' + escapeHtml(val) + '" placeholder="/path/" data-rule="' + i + '" data-field="' + field + '" data-idx="' + k + '" class="list-input flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">' +
                        '<button type="button" data-remove-item data-rule="' + i + '" data-field="' + field + '" data-idx="' + k + '" class="text-gray-300 hover:text-red-400">✕</button>' +
                        '</div>';
                }).join('');
                return '<div>' +
                    '<label class="block text-xs font-semibold text-gray-600 mb-1.5 capitalize">' + field + '</label>' +
                    rows +
                    '<button type="button" data-add-item data-rule="' + i + '" data-field="' + field + '" class="text-xs text-indigo-600 hover:underline flex items-center gap-1">+ Add ' + field + ' rule</button>' +
                    '</div>';
            }).join('');

            return '<div class="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">' +
                '<div class="flex justify-between items-center">' +
                '<h2 class="font-bold text-gray-900 text-sm">Crawl Rule #' + (i + 1) + '</h2>' +
                (state.rules.length > 1 ? '<button type="button" data-remove-rule="' + i + '" class="text-gray-300 hover:text-red-400">✕</button>' : '') +
                '</div>' +
                '<div>' +
                '<label class="block text-xs font-semibold text-gray-600 mb-1.5">User-agent</label>' +
                '<div class="flex gap-2">' +
                '<input value="' + escapeHtml(rule.agent) + '" data-agent="' + i + '" class="agent-input flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">' +
                '<select data-agent-select="' + i + '" class="border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-600">' +
                '<option value="">Pick bot</option>' + botOptions +
                '</select>' +
                '</div>' +
                '</div>' +
                fields +
                '</div>';
        }).join('');
    }

    function renderSitemaps() {
        sitemapsEl.innerHTML = state.sitemaps.map(function (s, i) {
            return '<div class="flex gap-2">' +
                '<input value="' + escapeHtml(s) + '" placeholder="https://example.com/sitemap.xml" data-sitemap="' + i + '" class="sitemap-input flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">' +
                (state.sitemaps.length > 1 ? '<button type="button" data-remove-sitemap="' + i + '" class="text-gray-300 hover:text-red-400">✕</button>' : '') +
                '</div>';
        }).join('');
    }

    function renderOutput() {
        outputEl.textContent = buildOutput() || '# Output appears here';
    }

    function renderAll() {
        renderRules();
        renderSitemaps();
        renderOutput();
    }

    rulesEl.addEventListener('input', function (e) {
        var t = e.target;
        if (t.matches('.agent-input')) {
            state.rules[+t.dataset.agent].agent = t.value;
            renderOutput();
        } else if (t.matches('.list-input')) {
            state.rules[+t.dataset.rule][t.dataset.field][+t.dataset.idx] = t.value;
            renderOutput();
        }
    });

    rulesEl.addEventListener('change', function (e) {
        var t = e.target;
        if (t.matches('[data-agent-select]')) {
            if (t.value) {
                state.rules[+t.dataset.agentSelect].agent = t.value;
                renderAll();
            }
        }
    });

    rulesEl.addEventListener('click', function (e) {
        var remove = e.target.closest('[data-remove-item]');
        var add = e.target.closest('[data-add-item]');
        var removeRule = e.target.closest('[data-remove-rule]');
        if (remove) {
            var r = +remove.dataset.rule, f = remove.dataset.field, idx = +remove.dataset.idx;
            state.rules[r][f].splice(idx, 1);
            renderAll();
        } else if (add) {
            var r2 = +add.dataset.rule, f2 = add.dataset.field;
            state.rules[r2][f2].push('');
            renderAll();
        } else if (removeRule) {
            state.rules.splice(+removeRule.dataset.removeRule, 1);
            renderAll();
        }
    });

    document.getElementById('robots-add-rule').addEventListener('click', function () {
        state.rules.push({ agent: '*', disallow: [''], allow: [] });
        renderAll();
    });

    sitemapsEl.addEventListener('input', function (e) {
        if (e.target.matches('.sitemap-input')) {
            state.sitemaps[+e.target.dataset.sitemap] = e.target.value;
            renderOutput();
        }
    });

    sitemapsEl.addEventListener('click', function (e) {
        var remove = e.target.closest('[data-remove-sitemap]');
        if (remove) {
            state.sitemaps.splice(+remove.dataset.removeSitemap, 1);
            renderAll();
        }
    });

    document.getElementById('robots-add-sitemap').addEventListener('click', function () {
        state.sitemaps.push('');
        renderAll();
    });

    crawlDelayEl.addEventListener('input', function () {
        state.crawlDelay = crawlDelayEl.value;
        renderOutput();
    });

    renderAll();
})();
