(function () {
    'use strict';

    var app = document.getElementById('slug-app');
    if (!app) return;

    var STOP_WORDS = new Set(['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'is', 'was', 'are', 'were', 'be', 'this', 'that', 'it', 'its', 'as', 'so', 'if', 'not', 'do', 'does', 'did', 'will', 'would', 'could', 'should']);

    var inputEl = document.getElementById('slug-input');
    var baseUrlEl = document.getElementById('slug-base-url');
    var maxLenEl = document.getElementById('slug-maxlen');
    var maxLenLabel = document.getElementById('slug-maxlen-label');
    var stopwordsBtn = document.getElementById('slug-stopwords-btn');

    var separator = '-';
    var removeStopWords = false;

    function toSlug(text, opts) {
        var s = text.trim();
        if (!s) return '';
        s = s.normalize('NFD').replace(/[̀-ͯ]/g, '');
        s = s.toLowerCase();
        if (opts.removeStopWords) {
            s = s.split(/\s+/).filter(function (w) { return !STOP_WORDS.has(w); }).join(' ');
        }
        var sep = opts.separator;
        s = s.replace(/[&+]/g, sep + 'and' + sep);
        s = s.replace(/[^a-z0-9\s\-_]/g, '');
        s = s.replace(/[\s_-]+/g, sep);
        var escSep = sep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        s = s.replace(new RegExp('^' + escSep + '+|' + escSep + '+$', 'g'), '');
        if (opts.maxLength && s.length > opts.maxLength) {
            s = s.slice(0, opts.maxLength);
            var lastSep = s.lastIndexOf(sep);
            if (lastSep > 0) s = s.slice(0, lastSep);
        }
        return s;
    }

    function slugScoreOf(slug) {
        if (!slug) return null;
        var score = 0;
        if (slug.length >= 20 && slug.length <= 60) score += 35;
        else if (slug.length > 0) score += 15;
        if (slug.indexOf('_') === -1) score += 15;
        if (slug === slug.toLowerCase()) score += 20;
        if (!/\d{4,}/.test(slug)) score += 10;
        var wc = slug.split('-').filter(Boolean).length;
        if (wc >= 2 && wc <= 8) score += 20;
        return Math.min(score, 100);
    }

    function render() {
        var maxLength = +maxLenEl.value;
        maxLenLabel.textContent = maxLength;
        var slug = toSlug(inputEl.value, { separator: separator, removeStopWords: removeStopWords, maxLength: maxLength });
        var baseUrl = baseUrlEl.value;
        var fullUrl = baseUrl.replace(/\/$/, '') + '/' + slug;

        var outputWrap = document.getElementById('slug-output');
        if (!slug) { outputWrap.classList.add('hidden'); return; }
        outputWrap.classList.remove('hidden');

        var score = slugScoreOf(slug);
        var badge = document.getElementById('slug-score-badge');
        badge.textContent = 'SEO Score: ' + score + '/100';
        badge.className = 'text-xs font-bold px-2.5 py-1 rounded-lg ' +
            (score >= 80 ? 'bg-green-100 text-green-700' : score >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700');

        document.getElementById('slug-value').textContent = slug;
        document.getElementById('slug-full-url').textContent = fullUrl;
        document.getElementById('slug-char-count').textContent = slug.length + ' characters';
        document.getElementById('slug-char-count').className = slug.length > 60 ? 'text-amber-600 font-medium' : '';
        document.getElementById('slug-word-count').textContent = slug.split(separator).filter(Boolean).length + ' words';

        var tipsBox = document.getElementById('slug-tips');
        var tipsList = document.getElementById('slug-tips-list');
        var tips = [];
        if (score < 80) {
            if (slug.length > 60) tips.push('• Slug is over 60 characters. Enable "Remove Stop Words" or shorten the title.');
            if (slug.split(separator).length > 8) tips.push('• Too many words. Aim for 3–5 words in the slug.');
            if (separator === '_') tips.push('• Switch to hyphens (-) instead of underscores for better SEO.');
        }
        if (tips.length) {
            tipsBox.classList.remove('hidden');
            tipsList.innerHTML = tips.map(function (t) { return '<p>' + t + '</p>'; }).join('');
        } else {
            tipsBox.classList.add('hidden');
        }
    }

    document.querySelectorAll('.slug-example').forEach(function (btn) {
        btn.addEventListener('click', function () {
            inputEl.value = btn.textContent;
            render();
        });
    });

    document.querySelectorAll('.slug-sep-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            separator = btn.dataset.separator;
            document.querySelectorAll('.slug-sep-btn').forEach(function (b) {
                var active = b === btn;
                b.classList.toggle('bg-indigo-600', active);
                b.classList.toggle('text-white', active);
                b.classList.toggle('bg-gray-100', !active);
                b.classList.toggle('text-gray-600', !active);
            });
            document.getElementById('slug-sep-warning').classList.toggle('hidden', separator !== '_');
            render();
        });
    });

    stopwordsBtn.addEventListener('click', function () {
        removeStopWords = !removeStopWords;
        stopwordsBtn.textContent = removeStopWords ? 'On (the, and, of…)' : 'Off — keep all words';
        stopwordsBtn.classList.toggle('bg-indigo-600', removeStopWords);
        stopwordsBtn.classList.toggle('text-white', removeStopWords);
        stopwordsBtn.classList.toggle('bg-gray-100', !removeStopWords);
        stopwordsBtn.classList.toggle('text-gray-600', !removeStopWords);
        render();
    });

    [inputEl, baseUrlEl, maxLenEl].forEach(function (el) { el.addEventListener('input', render); });
    render();
})();
