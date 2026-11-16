(function () {
    'use strict';

    var app = document.getElementById('sitemap-app');
    if (!app) return;

    var FREQS = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
    var PRIORITIES = ['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1'];

    var urls = [
        { loc: 'https://example.com/', changefreq: 'daily', priority: '1.0', lastmod: '' },
        { loc: 'https://example.com/about', changefreq: 'monthly', priority: '0.8', lastmod: '' },
    ];

    var listEl = document.getElementById('sitemap-url-list');
    var outputEl = document.getElementById('sitemap-output');
    var countEl = document.getElementById('sitemap-url-count');
    var outputCountEl = document.getElementById('sitemap-output-count');

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function buildSitemap() {
        var today = new Date().toISOString().split('T')[0];
        var entries = urls.filter(function (u) { return u.loc; }).map(function (u) {
            return '  <url>\n    <loc>' + u.loc + '</loc>\n    <lastmod>' + (u.lastmod || today) + '</lastmod>\n    <changefreq>' + (u.changefreq || 'weekly') + '</changefreq>\n    <priority>' + (u.priority || '0.5') + '</priority>\n  </url>';
        }).join('\n');
        return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + entries + '\n</urlset>';
    }

    function renderList() {
        listEl.innerHTML = urls.map(function (url, i) {
            var freqOptions = FREQS.map(function (f) { return '<option value="' + f + '"' + (url.changefreq === f ? ' selected' : '') + '>' + f + '</option>'; }).join('');
            var prioOptions = PRIORITIES.map(function (p) { return '<option value="' + p + '"' + (url.priority === p ? ' selected' : '') + '>' + p + '</option>'; }).join('');
            return '<div class="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">' +
                '<div class="flex justify-between items-center">' +
                '<span class="text-xs font-semibold text-gray-400">URL #' + (i + 1) + '</span>' +
                '<button type="button" data-remove-url="' + i + '" class="text-gray-300 hover:text-red-400">✕</button>' +
                '</div>' +
                '<input data-loc="' + i + '" value="' + escapeHtml(url.loc) + '" placeholder="https://example.com/page" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">' +
                '<div class="grid grid-cols-3 gap-2">' +
                '<div><label class="block text-xs text-gray-500 mb-1">Frequency</label><select data-changefreq="' + i + '" class="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">' + freqOptions + '</select></div>' +
                '<div><label class="block text-xs text-gray-500 mb-1">Priority</label><select data-priority="' + i + '" class="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">' + prioOptions + '</select></div>' +
                '<div><label class="block text-xs text-gray-500 mb-1">Last Modified</label><input type="date" data-lastmod="' + i + '" value="' + url.lastmod + '" class="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"></div>' +
                '</div></div>';
        }).join('');
    }

    function renderOutput() {
        outputEl.textContent = buildSitemap();
        var count = urls.filter(function (u) { return u.loc; }).length;
        countEl.textContent = count;
        outputCountEl.textContent = count;
    }

    function renderAll() { renderList(); renderOutput(); }

    listEl.addEventListener('input', function (e) {
        var t = e.target;
        if (t.dataset.loc !== undefined) urls[+t.dataset.loc].loc = t.value;
        else if (t.dataset.lastmod !== undefined) urls[+t.dataset.lastmod].lastmod = t.value;
        else return;
        renderOutput();
    });

    listEl.addEventListener('change', function (e) {
        var t = e.target;
        if (t.dataset.changefreq !== undefined) urls[+t.dataset.changefreq].changefreq = t.value;
        else if (t.dataset.priority !== undefined) urls[+t.dataset.priority].priority = t.value;
        else return;
        renderOutput();
    });

    listEl.addEventListener('click', function (e) {
        var remove = e.target.closest('[data-remove-url]');
        if (remove) {
            urls.splice(+remove.dataset.removeUrl, 1);
            renderAll();
        }
    });

    document.getElementById('sitemap-add-url').addEventListener('click', function () {
        urls.push({ loc: '', changefreq: 'weekly', priority: '0.5', lastmod: '' });
        renderAll();
    });

    var bulkBox = document.getElementById('sitemap-bulk-box');
    var bulkText = document.getElementById('sitemap-bulk-text');
    document.getElementById('sitemap-toggle-bulk').addEventListener('click', function () {
        bulkBox.classList.toggle('hidden');
    });
    document.getElementById('sitemap-cancel-bulk').addEventListener('click', function () {
        bulkBox.classList.add('hidden');
    });
    document.getElementById('sitemap-import-bulk').addEventListener('click', function () {
        var lines = bulkText.value.split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
        lines.forEach(function (loc) { urls.push({ loc: loc, changefreq: 'weekly', priority: '0.5', lastmod: '' }); });
        bulkText.value = '';
        bulkBox.classList.add('hidden');
        renderAll();
    });

    renderAll();
})();
