(function () {
    'use strict';

    var app = document.getElementById('seo-audit-app');
    if (!app) return;

    var CATEGORIES = ['On-Page SEO', 'Technical SEO', 'Social & Sharing', 'Content', 'Crawlability', 'Performance'];
    var STATUS = {
        pass: { color: 'text-green-600', bg: 'bg-green-50 border-green-200', label: 'Pass' },
        warning: { color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', label: 'Warning' },
        fail: { color: 'text-red-600', bg: 'bg-red-50 border-red-200', label: 'Fail' },
    };

    var urlInput = document.getElementById('seo-audit-url');
    var runBtn = document.getElementById('seo-audit-run');
    var runLabel = document.getElementById('seo-audit-run-label');
    var errorEl = document.getElementById('seo-audit-error');
    var resultsEl = document.getElementById('seo-audit-results');
    var tabsEl = document.getElementById('seo-audit-tabs');
    var checksEl = document.getElementById('seo-audit-checks');

    var result = null;
    var activeTab = 'all';

    function escapeHtml(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function csrfToken() {
        var meta = document.querySelector('meta[name="csrf-token"]');
        return meta ? meta.content : '';
    }

    function setScoreRing(score) {
        var color = score >= 80 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';
        var r = 54, c = 2 * Math.PI * r;
        var dash = (score / 100) * c;
        var ring = document.getElementById('seo-audit-score-ring');
        ring.setAttribute('stroke', color);
        ring.setAttribute('stroke-dasharray', dash + ' ' + c);
        document.getElementById('seo-audit-score').textContent = score;
    }

    function renderTabs() {
        var checks = (result && result.checks) || [];
        var tabs = ['all'].concat(CATEGORIES);
        tabsEl.innerHTML = tabs.map(function (cat) {
            var count = cat === 'all' ? checks.length : checks.filter(function (c) { return c.category === cat; }).length;
            var active = activeTab === cat;
            return '<button type="button" data-tab="' + escapeHtml(cat) + '" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ' +
                (active ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50') + '">' +
                (cat === 'all' ? 'All (' + count + ')' : escapeHtml(cat) + ' (' + count + ')') + '</button>';
        }).join('');
    }

    function renderChecks() {
        var checks = (result && result.checks) || [];
        var visible = activeTab === 'all' ? checks : checks.filter(function (c) { return c.category === activeTab; });
        checksEl.innerHTML = visible.map(function (check) {
            var s = STATUS[check.status] || STATUS.fail;
            var valueLine = (check.value && check.value !== check.detail)
                ? '<p class="text-xs text-gray-400 mt-0.5 font-mono truncate">' + escapeHtml(check.value) + '</p>' : '';
            return '<div class="flex items-start gap-3 p-4 rounded-xl border ' + s.bg + '">' +
                '<span class="w-4 h-4 mt-0.5 shrink-0 ' + s.color + '">●</span>' +
                '<div class="flex-1 min-w-0">' +
                '<div class="flex items-center gap-2 flex-wrap">' +
                '<span class="text-sm font-semibold text-gray-900">' + escapeHtml(check.name) + '</span>' +
                '<span class="text-[11px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded ' + s.color + ' border">' + s.label + '</span>' +
                '</div>' +
                '<p class="text-xs text-gray-600 mt-0.5 leading-relaxed">' + escapeHtml(check.detail) + '</p>' +
                valueLine +
                '</div></div>';
        }).join('');
    }

    function renderResults() {
        if (!result) { resultsEl.classList.add('hidden'); return; }
        resultsEl.classList.remove('hidden');
        setScoreRing(result.score || 0);
        document.getElementById('seo-audit-pass').textContent = result.pass || 0;
        document.getElementById('seo-audit-warning').textContent = result.warning || 0;
        document.getElementById('seo-audit-fail').textContent = result.fail || 0;

        var statusColor = result.httpStatus === 200 ? 'text-green-600' : 'text-red-600';
        document.getElementById('seo-audit-meta').innerHTML =
            '<span>URL: <a href="' + escapeHtml(result.url) + '" target="_blank" rel="noopener" class="text-indigo-600 hover:underline">' + escapeHtml(result.url) + '</a></span>' +
            '<span>HTTP Status: <strong class="' + statusColor + '">' + escapeHtml(result.httpStatus) + '</strong></span>' +
            '<span>Response Time: <strong>' + escapeHtml(result.loadTime) + 'ms</strong></span>' +
            '<span>Word Count: <strong>' + (result.wordCount != null ? Number(result.wordCount).toLocaleString() : '') + '</strong></span>';

        renderTabs();
        renderChecks();
    }

    tabsEl.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-tab]');
        if (!btn) return;
        activeTab = btn.dataset.tab;
        renderTabs();
        renderChecks();
    });

    function showError(msg) {
        errorEl.textContent = msg;
        errorEl.classList.remove('hidden');
    }

    function runAudit() {
        var url = urlInput.value.trim();
        if (!url) return;
        errorEl.classList.add('hidden');
        resultsEl.classList.add('hidden');
        runBtn.disabled = true;
        runLabel.textContent = 'Auditing…';

        fetch('/api/seo/audit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken() },
            body: JSON.stringify({ url: url }),
        })
            .then(function (res) {
                return res.json().then(function (data) {
                    if (!res.ok) throw new Error(data.error || 'Audit failed');
                    return data;
                });
            })
            .then(function (data) {
                result = data;
                activeTab = 'all';
                renderResults();
            })
            .catch(function (e) { showError(e.message); })
            .finally(function () {
                runBtn.disabled = false;
                runLabel.textContent = 'Run SEO Audit';
            });
    }

    runBtn.addEventListener('click', runAudit);
    urlInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') runAudit(); });
})();
