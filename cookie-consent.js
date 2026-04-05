(function() {
  'use strict';

  // Check if consent already given
  var consent = localStorage.getItem('ggc_cookie_consent');
  if (consent) return;

  // Create banner DOM
  var banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Consentimiento de cookies');
  banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:9998;background:rgba(12,10,29,0.95);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,0.06);transform:translateY(100%);transition:transform 0.5s cubic-bezier(0.4,0,0.2,1)';

  banner.innerHTML = '<div style="max-width:1200px;margin:0 auto;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">'
    + '<div style="flex:1;min-width:280px">'
    + '<p style="font-family:\'DM Sans\',system-ui,sans-serif;color:#e0e0e0;font-size:14px;line-height:1.5;margin:0">'
    + 'Usamos cookies para mejorar tu experiencia y analizar el tr\u00e1fico. '
    + '<a href="/cookies" style="color:#8B5CF6;text-decoration:underline;transition:color 0.2s" onmouseover="this.style.color=\'#A78BFA\'" onmouseout="this.style.color=\'#8B5CF6\'">M\u00e1s informaci\u00f3n</a>'
    + '</p>'
    + '</div>'
    + '<div style="display:flex;gap:8px;flex-wrap:wrap">'
    + '<button id="cookie-reject" style="font-family:\'DM Sans\',system-ui,sans-serif;font-size:14px;font-weight:600;padding:10px 20px;border-radius:9999px;border:1px solid rgba(139,92,246,0.4);background:transparent;color:#e0e0e0;cursor:pointer;transition:all 0.3s ease;white-space:nowrap">Solo necesarias</button>'
    + '<button id="cookie-accept" style="font-family:\'DM Sans\',system-ui,sans-serif;font-size:14px;font-weight:600;padding:10px 20px;border-radius:9999px;border:none;background:linear-gradient(135deg,#3B82F6,#8B5CF6,#EC4899);color:#fff;cursor:pointer;transition:all 0.3s ease;white-space:nowrap">Aceptar todas</button>'
    + '</div>'
    + '</div>';

  document.body.appendChild(banner);

  // Slide-up entrance after a brief delay
  setTimeout(function() {
    banner.style.transform = 'translateY(0)';
  }, 800);

  // Hover effects
  var rejectBtn = document.getElementById('cookie-reject');
  var acceptBtn = document.getElementById('cookie-accept');

  rejectBtn.addEventListener('mouseenter', function() {
    this.style.borderColor = '#8B5CF6';
    this.style.background = 'rgba(139,92,246,0.1)';
    this.style.color = '#fff';
  });
  rejectBtn.addEventListener('mouseleave', function() {
    this.style.borderColor = 'rgba(139,92,246,0.4)';
    this.style.background = 'transparent';
    this.style.color = '#e0e0e0';
  });

  acceptBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-1px)';
    this.style.boxShadow = '0 0 24px rgba(139,92,246,0.3)';
  });
  acceptBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = 'none';
  });

  // Dismiss with slide-down animation
  function dismissBanner() {
    banner.style.transform = 'translateY(100%)';
    setTimeout(function() { banner.remove(); }, 500);
  }

  // Button handlers
  acceptBtn.addEventListener('click', function() {
    localStorage.setItem('ggc_cookie_consent', 'all');
    dismissBanner();
    if (window.dataLayer) {
      window.dataLayer.push({'event': 'consent_update', 'consent': 'all'});
    }
  });

  rejectBtn.addEventListener('click', function() {
    localStorage.setItem('ggc_cookie_consent', 'necessary');
    dismissBanner();
    if (window.dataLayer) {
      window.dataLayer.push({'event': 'consent_update', 'consent': 'necessary'});
    }
  });
})();
