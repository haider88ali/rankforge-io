(function () {
    'use strict';

    var app = document.getElementById('backlink-app');
    if (!app) return;

    var STATUS_COLOR = { pass: 'text-green-600', warning: 'text-amber-500', fail: 'text-red-500', info: 'text-blue-500' };
    var STATUS_ICON = { pass: '✓', warning: '!', fail: '✕', info: 'i' };

    var domainInput = document.getElementById('backlink-domain');
    var runBtn = document.getElementById('backlink-run');
    var runLabel = document.getElementById('backlink-run-label');
    var errorEl = document.getElementById('backlink-error');
    var resultsEl = document.getElementById('backlink-results');
    var signalsEl = document.getElementById('backlink-signals');
    var opportunitiesEl = document.getElementById('backlink-opportunities');

    function escapeHtml(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function csrfToken() {
        var meta = document.querySelector('meta[name="csrf-token"]');
        return meta ? meta.content : '';
    }

    function showError(msg) {
        errorEl.textContent = msg;
        errorEl.classList.remove('hidden');
    }

    function renderResults(result) {
        resultsEl.classList.remove('hidden');
        document.getElementById('backlink-domain-label').textContent = result.domain;
        document.getElementById('backlink-domain-label2').textContent = result.domain;

        signalsEl.innerHTML = (result.signals || []).map(function (s) {
            var color = STATUS_COLOR[s.status] || STATUS_COLOR.info;
            var icon = STATUS_ICON[s.status] || STATUS_ICON.info;
            return '<div class="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">' +
                '<span class="w-4 h-4 mt-0.5 shrink-0 ' + color + ' font-bold">' + icon + '</span>' +
                '<div class="min-w-0">' +
                '<p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">' + escapeHtml(s.label) + '</p>' +
                '<p class="text-sm font-medium text-gray-800 mt-0.5 truncate">' + escapeHtml(s.value) + '</p>' +
                '</div></div>';
        }).join('');

        opportunitiesEl.innerHTML = (result.opportunities || []).map(function (op) {
            return '<a href="' + escapeHtml(op.url) + '" target="_blank" rel="noopener noreferrer" ' +
                'class="flex items-center justify-between gap-4 p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-colors group">' +
                '<div><p class="text-sm font-semibold text-gray-900 group-hover:text-indigo-600">' + escapeHtml(op.source) + '</p>' +
                '<p class="text-xs text-gray-400 mt-0.5">' + escapeHtml(op.tip) + '</p></div>' +
                '<span class="text-gray-400 group-hover:text-indigo-500 shrink-0">↗</span></a>';
        }).join('');
    }

    function runCheck() {
        var domain = domainInput.value.trim();
        if (!domain) return;
        errorEl.classList.add('hidden');
        resultsEl.classList.add('hidden');
        runBtn.disabled = true;
        runLabel.textContent = 'Checking…';

        fetch('/api/backlinks/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken() },
            body: JSON.stringify({ domain: domain }),
        })
            .then(function (res) {
                return res.json().then(function (data) {
                    if (!res.ok) throw new Error(data.error || 'Check failed');
                    return data;
                });
            })
            .then(renderResults)
            .catch(function (e) { showError(e.message); })
            .finally(function () {
                runBtn.disabled = false;
                runLabel.textContent = 'Analyze Domain';
            });
    }

    runBtn.addEventListener('click', runCheck);
    domainInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') runCheck(); });
})();
