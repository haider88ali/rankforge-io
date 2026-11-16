/**
 * Shared vanilla-JS behavior for SeoKitHub — no framework, no build step required.
 * Replaces the interactivity that used to live in AppLayout.jsx (Inertia/React).
 */
(function () {
    'use strict';

    // ---- Desktop mega menu (hover) ----
    document.querySelectorAll('[data-mega-menu]').forEach(function (menu) {
        var panel = menu.querySelector('[data-mega-panel]');
        var trigger = menu.querySelector('[data-mega-trigger]');
        var chevron = menu.querySelector('[data-mega-chevron]');
        if (!panel || !trigger) return;

        var open = function () {
            panel.classList.remove('hidden');
            trigger.setAttribute('aria-expanded', 'true');
            trigger.classList.add('text-indigo-600', 'bg-indigo-50');
            if (chevron) chevron.classList.add('rotate-180');
        };
        var close = function () {
            panel.classList.add('hidden');
            trigger.setAttribute('aria-expanded', 'false');
            trigger.classList.remove('text-indigo-600', 'bg-indigo-50');
            if (chevron) chevron.classList.remove('rotate-180');
        };

        menu.addEventListener('mouseenter', open);
        menu.addEventListener('mouseleave', close);
        trigger.addEventListener('click', function () {
            panel.classList.contains('hidden') ? open() : close();
        });
    });

    // ---- Mobile nav drawer ----
    var mobileTrigger = document.querySelector('[data-mobile-trigger]');
    var mobilePanel = document.querySelector('[data-mobile-panel]');
    if (mobileTrigger && mobilePanel) {
        var iconOpen = mobileTrigger.querySelector('[data-mobile-icon-open]');
        var iconClose = mobileTrigger.querySelector('[data-mobile-icon-close]');
        mobileTrigger.addEventListener('click', function () {
            var nowHidden = mobilePanel.classList.toggle('hidden');
            mobileTrigger.setAttribute('aria-expanded', String(!nowHidden));
            if (iconOpen) iconOpen.classList.toggle('hidden', !nowHidden);
            if (iconClose) iconClose.classList.toggle('hidden', nowHidden);
        });
    }

    // ---- Copy-to-clipboard buttons ----
    // Usage: <button data-copy-target="#outputEl">Copy</button>
    document.querySelectorAll('[data-copy-target]').forEach(function (btn) {
        var defaultLabel = btn.innerHTML;
        btn.addEventListener('click', function () {
            var target = document.querySelector(btn.getAttribute('data-copy-target'));
            if (!target) return;
            var text = 'value' in target ? target.value : target.textContent;
            navigator.clipboard.writeText(text).then(function () {
                btn.innerHTML = '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7"/></svg> Copied!';
                btn.classList.add('bg-green-100', 'text-green-700');
                btn.classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
                setTimeout(function () {
                    btn.innerHTML = defaultLabel;
                    btn.classList.remove('bg-green-100', 'text-green-700');
                    btn.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
                }, 2000);
            });
        });
    });

    // ---- Download-as-file buttons ----
    // Usage: <button data-download-target="#outputEl" data-download-name="robots.txt" data-download-type="text/plain">Download</button>
    document.querySelectorAll('[data-download-target]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var target = document.querySelector(btn.getAttribute('data-download-target'));
            if (!target) return;
            var text = 'value' in target ? target.value : target.textContent;
            var type = btn.getAttribute('data-download-type') || 'text/plain';
            var name = btn.getAttribute('data-download-name') || 'download.txt';
            var a = document.createElement('a');
            a.href = URL.createObjectURL(new Blob([text], { type: type }));
            a.download = name;
            a.click();
            URL.revokeObjectURL(a.href);
        });
    });
})();
