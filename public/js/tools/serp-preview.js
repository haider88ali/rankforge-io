(function () {
    'use strict';

    var app = document.getElementById('serp-app');
    if (!app) return;

    var titleEl = document.getElementById('serp-title');
    var urlEl = document.getElementById('serp-url');
    var descEl = document.getElementById('serp-desc');
    var view = 'both';

    function pxWidth(text, fs) { return text.length * fs * 0.55; }

    function pixelBar(containerId, label, value, max) {
        var pct = Math.min((value / max) * 100, 100);
        var over = value > max;
        document.getElementById(containerId).innerHTML =
            '<div class="space-y-1">' +
            '<div class="flex justify-between text-xs text-gray-500">' +
            '<span>' + label + '</span>' +
            '<span class="' + (over ? 'text-red-600 font-semibold' : '') + '">~' + Math.round(value) + 'px / ' + max + 'px ' + (over ? '⚠ May truncate' : '✓') + '</span>' +
            '</div>' +
            '<div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">' +
            '<div class="h-full rounded-full transition-all ' + (over ? 'bg-red-500' : 'bg-indigo-500') + '" style="width:' + pct + '%"></div>' +
            '</div></div>';
    }

    function domainOf(u) {
        try { return new URL(u.indexOf('http') === 0 ? u : 'https://' + u).hostname; } catch (e) { return u; }
    }

    function render() {
        var title = titleEl.value;
        var url = urlEl.value;
        var desc = descEl.value;

        pixelBar('serp-title-bar', 'Title pixel width', pxWidth(title, 20), 600);
        pixelBar('serp-desc-bar', 'Description pixel width', pxWidth(desc, 14), 920);

        var t = title || 'Your Page Title Goes Here — Site Name';
        var u = url || 'https://example.com/your-page';
        var d = desc || 'Your meta description appears here. Write something that makes users want to click through to your page from the search results.';
        var domain = domainOf(u);

        document.getElementById('serp-desktop-favicon').textContent = domain.charAt(0).toUpperCase();
        document.getElementById('serp-desktop-url').textContent = u.replace(/^https?:\/\//, '').split('?')[0];
        document.getElementById('serp-desktop-title').textContent = t.slice(0, 70);
        document.getElementById('serp-desktop-desc').textContent = d.slice(0, 160);

        var t2 = title || 'Your Page Title';
        var u2 = url || 'https://example.com/page';
        var d2 = desc || 'Your meta description preview on mobile devices.';
        document.getElementById('serp-mobile-url').textContent = u2.replace(/^https?:\/\//, '').slice(0, 35);
        document.getElementById('serp-mobile-title').textContent = t2.slice(0, 60);
        document.getElementById('serp-mobile-desc').textContent = d2.slice(0, 120);

        document.getElementById('serp-desktop-result').classList.toggle('hidden', view === 'mobile');
        document.getElementById('serp-mobile-result').classList.toggle('hidden', view === 'desktop');
        document.getElementById('serp-results').classList.toggle('lg:grid-cols-2', view === 'both');
        document.getElementById('serp-results').classList.toggle('max-w-2xl', view !== 'both');
    }

    document.querySelectorAll('.serp-view-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            view = btn.dataset.serpView;
            document.querySelectorAll('.serp-view-btn').forEach(function (b) {
                var active = b === btn;
                b.classList.toggle('bg-indigo-600', active);
                b.classList.toggle('text-white', active);
                b.classList.toggle('bg-white', !active);
                b.classList.toggle('text-gray-600', !active);
                b.classList.toggle('border', !active);
                b.classList.toggle('border-gray-200', !active);
            });
            render();
        });
    });

    [titleEl, urlEl, descEl].forEach(function (el) { el.addEventListener('input', render); });
    render();
})();
