/**
 * EWEB content loader – optionally load CMS content from /content/*.json
 * Use data-content="key" or data-content-json="filename" for dynamic injection.
 * Example: <span data-content="hero_heading" data-content-json="settings">fallback</span>
 */
(function () {
  var cache = {};

  function loadJSON(path) {
    if (cache[path]) return Promise.resolve(cache[path]);
    return fetch(path)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (data) cache[path] = data;
        return data;
      })
      .catch(function () { return null; });
  }

  function applyContent() {
    var els = document.querySelectorAll('[data-content][data-content-json]');
    els.forEach(function (el) {
      var key = el.getAttribute('data-content');
      var file = el.getAttribute('data-content-json');
      var path = '/content/' + file + '.json';
      loadJSON(path).then(function (data) {
        if (data && data[key] != null) el.textContent = data[key];
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyContent);
  } else {
    applyContent();
  }

  window.EWEB = window.EWEB || {};
  window.EWEB.loadContent = loadJSON;
  window.EWEB.applyContent = applyContent;
})();
