(function () {
    'use strict';

    var input = document.getElementById('json-input');
    if (!input) return;

    var SAMPLE = '{\n  "name": "SeoKitHub",\n  "version": "2.0",\n  "tools": [\n    { "id": 1, "name": "Meta Description Generator", "ai": true },\n    { "id": 2, "name": "Schema Markup Generator", "ai": false }\n  ],\n  "free": true,\n  "signupRequired": false\n}';

    var charCount = document.getElementById('json-char-count');
    var validBadge = document.getElementById('json-valid-badge');
    var errorBox = document.getElementById('json-error');
    var outputPre = document.getElementById('json-output');
    var outputPlaceholder = document.getElementById('json-output-placeholder');
    var outputActions = document.getElementById('json-output-actions');
    var indent = 2;
    var lastOutput = '';

    function setIndent(n) {
        indent = n;
        document.querySelectorAll('.json-indent-btn').forEach(function (btn) {
            var active = +btn.dataset.indent === n;
            btn.classList.toggle('bg-indigo-100', active);
            btn.classList.toggle('text-indigo-700', active);
            btn.classList.toggle('bg-gray-100', !active);
            btn.classList.toggle('text-gray-600', !active);
        });
    }

    function updateValidBadge() {
        var val = input.value.trim();
        if (!val) { validBadge.classList.add('hidden'); return; }
        var isValid = true;
        try { JSON.parse(val); } catch (e) { isValid = false; }
        validBadge.classList.remove('hidden');
        validBadge.className = 'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ' +
            (isValid ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200');
        validBadge.textContent = isValid ? '✓ Valid JSON' : '✕ Invalid JSON — click Validate for details';
    }

    function setOutput(text, kind) {
        lastOutput = text;
        if (!text) {
            outputPre.classList.add('hidden');
            outputPlaceholder.classList.remove('hidden');
            outputActions.innerHTML = '';
            return;
        }
        outputPlaceholder.classList.add('hidden');
        outputPre.classList.remove('hidden');
        outputPre.textContent = text;
        outputPre.className = kind === 'success'
            ? 'text-green-700 text-base font-bold'
            : 'text-gray-700 whitespace-pre-wrap';

        if (kind === 'json') {
            outputActions.innerHTML =
                '<button type="button" data-copy-target="#json-output" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">Copy</button>' +
                '<button type="button" id="json-download" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">.json</button>';
            document.getElementById('json-download').addEventListener('click', function () {
                var a = document.createElement('a');
                a.href = URL.createObjectURL(new Blob([lastOutput], { type: 'application/json' }));
                a.download = 'formatted.json';
                a.click();
                URL.revokeObjectURL(a.href);
            });
            // re-wire the generic copy handler for the freshly injected button
            outputActions.querySelector('[data-copy-target]').addEventListener('click', function (e) {
                navigator.clipboard.writeText(lastOutput);
                var btn = e.currentTarget;
                var orig = btn.textContent;
                btn.textContent = 'Copied!';
                setTimeout(function () { btn.textContent = orig; }, 2000);
            });
        } else {
            outputActions.innerHTML = '';
        }
    }

    function setError(msg) {
        if (!msg) { errorBox.classList.add('hidden'); errorBox.innerHTML = ''; return; }
        errorBox.classList.remove('hidden');
        errorBox.innerHTML = '<strong>JSON Error:</strong> ' + msg.replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; });
    }

    function run(action) {
        setError('');
        setOutput('', null);
        var val = input.value;
        if (!val.trim()) { setError('Please paste some JSON first.'); return; }
        try {
            var parsed = JSON.parse(val);
            if (action === 'beautify') setOutput(JSON.stringify(parsed, null, indent), 'json');
            else if (action === 'minify') setOutput(JSON.stringify(parsed), 'json');
            else setOutput('✓ Valid JSON — no errors found!', 'success');
        } catch (e) {
            setError(e.message);
        }
    }

    input.addEventListener('input', function () {
        charCount.textContent = input.value.length.toLocaleString();
        setOutput('', null);
        setError('');
        updateValidBadge();
    });

    document.getElementById('json-beautify').addEventListener('click', function () { run('beautify'); });
    document.getElementById('json-minify').addEventListener('click', function () { run('minify'); });
    document.getElementById('json-validate').addEventListener('click', function () { run('validate'); });
    document.querySelectorAll('.json-indent-btn').forEach(function (btn) {
        btn.addEventListener('click', function () { setIndent(+btn.dataset.indent); });
    });
    document.getElementById('json-sample').addEventListener('click', function () {
        input.value = SAMPLE;
        input.dispatchEvent(new Event('input'));
    });
    document.getElementById('json-clear').addEventListener('click', function () {
        input.value = '';
        input.dispatchEvent(new Event('input'));
    });

    setIndent(2);
})();
