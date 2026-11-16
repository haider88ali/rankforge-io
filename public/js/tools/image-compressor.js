(function () {
    'use strict';

    var app = document.getElementById('imgc-app');
    if (!app) return;

    var qualityInput = document.getElementById('imgc-quality');
    var qualityLabel = document.getElementById('imgc-quality-label');
    var maxPxInput = document.getElementById('imgc-maxpx');
    var maxPxLabel = document.getElementById('imgc-maxpx-label');
    var dropzone = document.getElementById('imgc-dropzone');
    var fileInput = document.getElementById('imgc-file-input');
    var cardsEl = document.getElementById('imgc-cards');
    var savingsEl = document.getElementById('imgc-savings');
    var savingsCountEl = document.getElementById('imgc-savings-count');
    var savingsBytesEl = document.getElementById('imgc-savings-bytes');
    var downloadAllBtn = document.getElementById('imgc-download-all');

    var items = []; // { id, file, previewUrl, status, outBlob, outUrl }

    function fmt(b) {
        if (!b) return '0 B';
        if (b < 1024) return b + ' B';
        if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
        return (b / 1048576).toFixed(2) + ' MB';
    }

    function escapeHtml(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    qualityInput.addEventListener('input', function () {
        qualityLabel.textContent = qualityInput.value + '%';
    });
    maxPxInput.addEventListener('input', function () {
        maxPxLabel.textContent = maxPxInput.value + 'px';
    });

    function compressImage(file, maxPx, quality) {
        return new Promise(function (resolve, reject) {
            var img = new Image();
            var reader = new FileReader();
            reader.onload = function (e) {
                img.onload = function () {
                    var w = img.width, h = img.height;
                    if (w > maxPx || h > maxPx) {
                        if (w > h) { h = Math.round(h * (maxPx / w)); w = maxPx; }
                        else { w = Math.round(w * (maxPx / h)); h = maxPx; }
                    }
                    var canvas = document.createElement('canvas');
                    canvas.width = w;
                    canvas.height = h;
                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, w, h);
                    var outType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
                    canvas.toBlob(function (blob) {
                        if (!blob) return reject(new Error('Compression failed'));
                        resolve(blob);
                    }, outType, quality / 100);
                };
                img.onerror = function () { reject(new Error('Could not load image')); };
                img.src = e.target.result;
            };
            reader.onerror = function () { reject(new Error('Could not read file')); };
            reader.readAsDataURL(file);
        });
    }

    function renderCards() {
        cardsEl.innerHTML = items.map(function (item) {
            var savings = item.status === 'done' ? Math.round((1 - item.outBlob.size / item.file.size) * 100) : 0;
            var body = '';
            if (item.status === 'compressing') {
                body = '<div class="flex items-center gap-2 text-xs text-indigo-600">⏳ Compressing…</div>';
            } else if (item.status === 'done') {
                body = '<div class="space-y-2">' +
                    '<div class="h-1.5 bg-gray-100 rounded-full"><div class="h-full bg-green-500 rounded-full" style="width:' + savings + '%"></div></div>' +
                    '<a href="' + item.outUrl + '" download="compressed_' + escapeHtml(item.file.name) + '" class="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors">⬇ Download</a>' +
                    '</div>';
            } else if (item.status === 'error') {
                body = '<div class="text-xs text-red-500">Compression failed.</div>';
            }
            var sizeLine = item.status === 'done'
                ? '<div class="flex items-center gap-2 mt-1.5 text-xs">' +
                  '<span class="text-gray-400 line-through">' + fmt(item.file.size) + '</span>' +
                  '<span class="font-bold text-green-600">' + fmt(item.outBlob.size) + '</span>' +
                  '<span class="bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">-' + savings + '%</span></div>'
                : '';
            return '<div class="bg-white rounded-2xl border border-gray-200 p-5 space-y-4" data-item-id="' + item.id + '">' +
                '<div class="flex gap-3">' +
                '<div class="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0"><img src="' + item.previewUrl + '" class="w-full h-full object-cover" alt=""></div>' +
                '<div class="flex-1 min-w-0">' +
                '<p class="text-sm font-semibold text-gray-900 truncate">' + escapeHtml(item.file.name) + '</p>' +
                '<p class="text-xs text-gray-400 uppercase mt-0.5">' + escapeHtml(item.file.type.split('/')[1] || '') + '</p>' +
                sizeLine +
                '</div>' +
                '<button type="button" data-remove-item="' + item.id + '" class="text-gray-300 hover:text-gray-500 shrink-0">✕</button>' +
                '</div>' + body + '</div>';
        }).join('');
    }

    function renderSavings() {
        var done = items.filter(function (i) { return i.status === 'done'; });
        if (done.length === 0) { savingsEl.classList.add('hidden'); return; }
        savingsEl.classList.remove('hidden');
        savingsCountEl.textContent = done.length;
        var saved = done.reduce(function (a, f) { return a + (f.file.size - f.outBlob.size); }, 0);
        savingsBytesEl.textContent = fmt(saved);
        if (done.length > 1) downloadAllBtn.classList.remove('hidden');
        else downloadAllBtn.classList.add('hidden');
    }

    function renderAll() { renderCards(); renderSavings(); }

    function addFiles(fileList) {
        var valid = Array.prototype.filter.call(fileList, function (f) {
            return ['image/jpeg', 'image/png', 'image/webp'].indexOf(f.type) !== -1;
        });
        var quality = +qualityInput.value;
        var maxPx = +maxPxInput.value;

        valid.forEach(function (file) {
            var item = {
                id: Math.random().toString(36).slice(2),
                file: file,
                previewUrl: URL.createObjectURL(file),
                status: 'compressing',
                outBlob: null,
                outUrl: null,
            };
            items.push(item);
            renderAll();

            compressImage(file, maxPx, quality)
                .then(function (blob) {
                    item.outBlob = blob;
                    item.outUrl = URL.createObjectURL(blob);
                    item.status = 'done';
                    renderAll();
                })
                .catch(function () {
                    item.status = 'error';
                    renderAll();
                });
        });
    }

    dropzone.addEventListener('click', function () { fileInput.click(); });
    dropzone.addEventListener('dragover', function (e) { e.preventDefault(); dropzone.classList.add('border-indigo-400', 'bg-indigo-50'); });
    dropzone.addEventListener('dragleave', function () { dropzone.classList.remove('border-indigo-400', 'bg-indigo-50'); });
    dropzone.addEventListener('drop', function (e) {
        e.preventDefault();
        dropzone.classList.remove('border-indigo-400', 'bg-indigo-50');
        addFiles(e.dataTransfer.files);
    });
    fileInput.addEventListener('change', function (e) { addFiles(e.target.files); });

    cardsEl.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-remove-item]');
        if (!btn) return;
        var id = btn.dataset.removeItem;
        items = items.filter(function (i) { return i.id !== id; });
        renderAll();
    });

    downloadAllBtn.addEventListener('click', function () {
        items.filter(function (i) { return i.status === 'done'; }).forEach(function (f) {
            var a = document.createElement('a');
            a.href = f.outUrl;
            a.download = 'compressed_' + f.file.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    });
})();
