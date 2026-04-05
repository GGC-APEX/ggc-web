(function() {
  'use strict';

  // Don't show if already shown this session or already submitted a form
  if (sessionStorage.getItem('ggc_exit_shown')) return;
  if (localStorage.getItem('ggc_lead_captured')) return;

  var shown = false;
  var enabled = false;

  // Wait at least 5 seconds before enabling
  setTimeout(function() { enabled = true; }, 5000);

  function showPopup() {
    if (shown || !enabled) return;
    shown = true;
    sessionStorage.setItem('ggc_exit_shown', '1');

    // Create overlay
    var overlay = document.createElement('div');
    overlay.id = 'exit-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Diagnostica tu infraestructura comercial');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9997;display:flex;align-items:center;justify-content:center;padding:24px;opacity:0;transition:opacity 0.4s ease';
    overlay.innerHTML = ''
      // Backdrop
      + '<div style="position:absolute;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)"></div>'
      // Card
      + '<div id="exit-card" style="position:relative;width:100%;max-width:480px;background:#151331;border-radius:20px;overflow:hidden;transform:scale(0.9);transition:transform 0.4s cubic-bezier(0.4,0,0.2,1);box-shadow:0 25px 60px rgba(0,0,0,0.5),0 0 40px rgba(139,92,246,0.08)">'
        // Gradient border (top + sides simulation via pseudo in inline)
        + '<div style="position:absolute;inset:0;border-radius:20px;padding:1px;background:linear-gradient(135deg,rgba(34,211,238,0.2),rgba(59,130,246,0.15),rgba(139,92,246,0.2),rgba(236,72,153,0.15));-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none"></div>'
        // Gradient line top
        + '<div style="height:2px;background:linear-gradient(90deg,#3B82F6,#8B5CF6,#EC4899);opacity:0.8"></div>'
        // Close button
        + '<button id="exit-close" aria-label="Cerrar" style="position:absolute;top:16px;right:16px;width:32px;height:32px;border-radius:50%;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:#9ca3af;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;line-height:1;font-family:system-ui">\u2715</button>'
        // Content
        + '<div style="padding:40px 32px 36px">'
          + '<p style="font-family:\'DM Sans\',system-ui,sans-serif;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;background:linear-gradient(90deg,#8B5CF6,#EC4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 12px">Antes de irte</p>'
          + '<h3 style="font-family:\'Playfair Display\',serif;font-size:24px;font-weight:700;color:#fff;margin:0 0 8px;line-height:1.3">Diagnostica tu infraestructura comercial en 5 minutos</h3>'
          + '<p style="font-family:\'DM Sans\',system-ui,sans-serif;font-size:15px;color:#9ca3af;margin:0 0 24px;line-height:1.5">Descubre qu\u00e9 le falta a tu sistema de ventas B2B. Gratis.</p>'
          // Form
          + '<form id="exit-form">'
            + '<input type="email" name="email" placeholder="Tu email profesional" required autocomplete="email" style="width:100%;padding:14px 16px;border-radius:12px;border:1px solid rgba(255,255,255,0.1);background:#0C0A1D;color:#fff;font-family:\'DM Sans\',system-ui,sans-serif;font-size:15px;outline:none;transition:border-color 0.3s;margin-bottom:12px;box-sizing:border-box" onfocus="this.style.borderColor=\'#8B5CF6\'" onblur="this.style.borderColor=\'rgba(255,255,255,0.1)\'">'
            + '<button type="submit" style="width:100%;padding:14px 24px;border-radius:9999px;border:none;background:linear-gradient(135deg,#3B82F6,#8B5CF6,#EC4899);color:#fff;font-family:\'DM Sans\',system-ui,sans-serif;font-size:15px;font-weight:600;cursor:pointer;transition:all 0.3s;position:relative;overflow:hidden" onmouseenter="this.style.transform=\'translateY(-1px)\';this.style.boxShadow=\'0 0 30px rgba(139,92,246,0.3)\'" onmouseleave="this.style.transform=\'translateY(0)\';this.style.boxShadow=\'none\'">Quiero el diagn\u00f3stico</button>'
          + '</form>'
          // Success message
          + '<div id="exit-success" style="display:none;text-align:center;padding:20px 0">'
            + '<div style="width:48px;height:48px;border-radius:50%;background:rgba(34,197,94,0.15);display:flex;align-items:center;justify-content:center;margin:0 auto 12px">'
              + '<svg width="24" height="24" fill="none" stroke="#22C55E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
            + '</div>'
            + '<p style="font-family:\'DM Sans\',system-ui,sans-serif;font-size:16px;font-weight:600;color:#fff;margin:0 0 4px">Revisa tu email en 2 minutos.</p>'
            + '<p style="font-family:\'DM Sans\',system-ui,sans-serif;font-size:14px;color:#9ca3af;margin:0">Te enviamos el diagn\u00f3stico ahora mismo.</p>'
          + '</div>'
        + '</div>'
      + '</div>';

    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        overlay.style.opacity = '1';
        document.getElementById('exit-card').style.transform = 'scale(1)';
      });
    });

    // Focus the email input for accessibility
    setTimeout(function() {
      var emailInput = overlay.querySelector('input[type="email"]');
      if (emailInput) emailInput.focus();
    }, 500);

    // Close handlers
    var closeBtn = document.getElementById('exit-close');

    closeBtn.addEventListener('mouseenter', function() {
      this.style.borderColor = 'rgba(255,255,255,0.2)';
      this.style.background = 'rgba(255,255,255,0.1)';
      this.style.color = '#fff';
    });
    closeBtn.addEventListener('mouseleave', function() {
      this.style.borderColor = 'rgba(255,255,255,0.1)';
      this.style.background = 'rgba(255,255,255,0.05)';
      this.style.color = '#9ca3af';
    });

    function closePopup() {
      overlay.style.opacity = '0';
      document.getElementById('exit-card').style.transform = 'scale(0.9)';
      setTimeout(function() { overlay.remove(); }, 400);
    }

    closeBtn.addEventListener('click', closePopup);

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay || e.target === overlay.firstElementChild) closePopup();
    });

    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape') {
        closePopup();
        document.removeEventListener('keydown', handler);
      }
    });

    // Form handler
    document.getElementById('exit-form').addEventListener('submit', function(e) {
      e.preventDefault();
      var form = this;
      var email = form.email.value;
      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Enviando...';
      btn.disabled = true;
      btn.style.opacity = '0.7';

      var webhookUrl = (window.GGC_CONFIG && window.GGC_CONFIG.webhooks && window.GGC_CONFIG.webhooks.leadMagnet)
        ? window.GGC_CONFIG.webhooks.leadMagnet
        : 'https://hook.eu2.make.com/PLACEHOLDER_LEADMAGNET';

      fetch(webhookUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          source: 'exit-intent',
          page: window.location.pathname,
          timestamp: new Date().toISOString()
        })
      }).then(function() {
        form.style.display = 'none';
        document.getElementById('exit-success').style.display = 'block';
        localStorage.setItem('ggc_lead_captured', '1');
        if (window.dataLayer) {
          window.dataLayer.push({'event': 'exit_intent_converted', 'email_source': 'exit-intent'});
        }
      }).catch(function() {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = '1';
      });
    });

    // GTM event
    if (window.dataLayer) {
      window.dataLayer.push({'event': 'exit_intent_shown'});
    }
  }

  // Desktop: mouse leaves viewport top
  document.addEventListener('mouseout', function(e) {
    if (e.clientY < 5 && !e.relatedTarget) {
      showPopup();
    }
  });
})();
