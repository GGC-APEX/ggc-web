// Client-side bot guard. Works with api/_bot-guard.js on the server.
// - Captures page-load timestamp
// - Injects an off-screen honeypot input into the DOM
// - Intercepts fetch() to attach _ts and _hp to any POST hitting our form APIs
// This keeps the legacy form handlers untouched — they keep building their
// own JSON bodies; we just enrich them on the way out.

(function () {
  'use strict';

  var PAGE_LOAD_TS = Date.now();
  var HP_ID = '_ggc_hp_field';
  var TRACKED_PATHS = ['/api/lead-magnet', '/api/newsletter'];

  function injectHoneypot() {
    if (document.getElementById(HP_ID)) return;
    var hp = document.createElement('input');
    hp.type = 'text';
    hp.name = 'website_url'; // Tempting-looking name for naive bots
    hp.id = HP_ID;
    hp.autocomplete = 'off';
    hp.tabIndex = -1;
    hp.setAttribute('aria-hidden', 'true');
    hp.value = '';
    hp.style.cssText = 'position:absolute!important;left:-9999px!important;top:-9999px!important;width:1px!important;height:1px!important;opacity:0!important;pointer-events:none!important';
    (document.body || document.documentElement).appendChild(hp);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHoneypot);
  } else {
    injectHoneypot();
  }

  function isTrackedUrl(url) {
    if (typeof url !== 'string') return false;
    for (var i = 0; i < TRACKED_PATHS.length; i++) {
      var p = TRACKED_PATHS[i];
      if (url === p || url.indexOf(p + '?') === 0 || url.indexOf(p) !== -1) return true;
    }
    return false;
  }

  function readHpValue() {
    var el = document.getElementById(HP_ID);
    return el && el.value ? el.value : '';
  }

  var originalFetch = window.fetch;
  if (typeof originalFetch !== 'function') return;

  window.fetch = function (input, init) {
    try {
      var url = typeof input === 'string' ? input : (input && input.url);
      if (isTrackedUrl(url) && init && init.body && typeof init.body === 'string') {
        var body = JSON.parse(init.body);
        if (body && typeof body === 'object') {
          body._ts = String(PAGE_LOAD_TS);
          // Honeypot: if the invisible field was filled, the server will silently drop.
          var hp = readHpValue();
          if (hp) body._hp = hp;
          init.body = JSON.stringify(body);
        }
      }
    } catch (e) { /* fall through — never break real requests */ }
    return originalFetch.apply(this, arguments);
  };
})();
