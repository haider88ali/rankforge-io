(function () {
    'use strict';

    var textEl = document.getElementById('kd-text');
    if (!textEl) return;

    var STOP = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'is', 'was', 'are', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'that', 'this', 'these', 'those', 'it', 'its', 'i', 'you', 'he', 'she', 'we', 'they', 'not', 'as', 'if', 'so', 'up', 'out', 'about', 'into', 'than', 'can', 'all', 'also', 'just', 'there', 'what', 'when', 'who', 'how', 'which', 'where', 'after', 'before', 'then', 'now', 'any', 'each', 'even', 'most', 'other', 'some', 'such', 'no', 'only', 'same', 'own', 'while', 'both', 'few', 'over', 'again', 'further', 'once', 'here']);

    var filterEl = document.getElementById('kd-filter');
    var totalEl = document.getElementById('kd-total');
    var uniqueEl = document.getElementById('kd-unique');
    var sentencesEl = document.getElementById('kd-sentences');
    var suggestionsEl = document.getElementById('kd-suggestions');
    var tableWrap = document.getElementById('kd-table-wrap');
    var tbody = document.getElementById('kd-tbody');

    var lastKeywords = [];

    function analyze(text) {
        var words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
        var total = words.length;
        if (!total) return { total: 0, sentences: 0, keywords: [] };
        var freq = {};
        words.forEach(function (w) { if (!STOP.has(w)) freq[w] = (freq[w] || 0) + 1; });
        var keywords = Object.entries(freq)
            .sort(function (a, b) { return b[1] - a[1]; })
            .slice(0, 40)
            .map(function (e) { return { word: e[0], count: e[1], density: ((e[1] / total) * 100).toFixed(2) }; });
        var sentences = (text.match(/[.!?]+/g) || []).length;
        return { total: total, sentences: sentences, keywords: keywords };
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function renderSuggestions(result) {
        var s = [];
        if (result.keywords.length) {
            var top = result.keywords[0];
            var topDensity = parseFloat(top.density);
            if (topDensity > 3) s.push({ type: 'warning', msg: '"' + top.word + '" appears ' + top.count + '× (' + top.density + '%) — reduce it to avoid keyword stuffing.' });
            if (result.total < 300 && result.total > 0) s.push({ type: 'info', msg: 'Content is under 300 words. Aim for 600+ words for better Google rankings.' });
            if (result.total >= 1000) s.push({ type: 'success', msg: 'Great content length! Long-form articles (1000+ words) tend to rank better.' });
            if (result.total >= 300 && topDensity <= 3) s.push({ type: 'success', msg: 'Keyword density looks natural — good for avoiding over-optimization penalties.' });
        }
        suggestionsEl.innerHTML = s.map(function (item) {
            var classes = item.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800'
                : item.type === 'success' ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-blue-50 border-blue-200 text-blue-800';
            return '<div class="flex items-start gap-3 px-5 py-4 rounded-2xl border text-sm ' + classes + '">ⓘ ' + escapeHtml(item.msg) + '</div>';
        }).join('');
    }

    function renderTable(keywords) {
        var filterVal = filterEl.value.trim().toLowerCase();
        var filtered = filterVal ? keywords.filter(function (k) { return k.word.indexOf(filterVal) !== -1; }) : keywords;

        if (!keywords.length) {
            tableWrap.classList.add('hidden');
            return;
        }
        tableWrap.classList.remove('hidden');

        tbody.innerHTML = filtered.map(function (k, i) {
            var d = parseFloat(k.density);
            var tone = d > 3 ? 'text-red-600' : d >= 1 ? 'text-green-700' : 'text-gray-500';
            var barWidth = Math.min(d * 25, 100);
            return '<tr class="hover:bg-gray-50">' +
                '<td class="py-2.5 px-3 text-gray-400 text-xs">' + (i + 1) + '</td>' +
                '<td class="py-2.5 px-3 font-mono font-semibold text-gray-800">' + escapeHtml(k.word) + '</td>' +
                '<td class="py-2.5 px-3 text-right text-gray-600">' + k.count + '</td>' +
                '<td class="py-2.5 px-3 text-right font-bold ' + tone + '">' + k.density + '%</td>' +
                '<td class="py-2.5 px-3 w-32"><div class="h-1.5 bg-gray-100 rounded-full"><div class="h-full bg-indigo-400 rounded-full" style="width:' + barWidth + '%"></div></div></td>' +
                '</tr>';
        }).join('');
    }

    function update() {
        var result = analyze(textEl.value);
        lastKeywords = result.keywords;
        totalEl.textContent = result.total;
        uniqueEl.textContent = result.keywords.length;
        sentencesEl.textContent = result.sentences;
        renderSuggestions(result);
        renderTable(lastKeywords);
    }

    textEl.addEventListener('input', update);
    filterEl.addEventListener('input', function () { renderTable(lastKeywords); });

    update();
})();
