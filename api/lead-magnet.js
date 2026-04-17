import { botGuard } from './_bot-guard.js';

export default async function handler(req, res) {
  const guard = botGuard(req, res);
  if (!guard.allow) return; // response already sent

  const { nombre, empresa, source, page, resourceSlug } = req.body || {};
  const email = guard.normalizedEmail;

  const RESEND_KEY = process.env.RESEND_API_KEY;
  const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'xavi.fortuna@globalgrowth.consulting';
  const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;
  const fecha = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });

  // Lead magnet catalog: slug → display name
  // Keyed by the lead-magnets/ filename (without .html)
  const LEAD_MAGNETS = {
    'auditoria-pipeline-inflado': 'Auditoría: 10 Señales de Pipeline Inflado',
    'calculadora-coste-oportunidad-ceo': 'Calculadora: El Coste de Oportunidad del CEO que Vende',
    'calculadora-coste-reunion': 'Calculadora: Coste Real por Reunión Cualificada',
    'calculadora-costes-ceo-pipeline': 'Calculadora: ¿Cuánto le Cuesta a tu Empresa que Seas Tú el Pipeline?',
    'calculadora-framework-apex': 'Calculadora: ¿Cuántas Reuniones Puede Generar tu Infraestructura Comercial?',
    'calculadora-roi-infraestructura': 'Calculadora ROI: Infraestructura vs Fee de Agencia',
    'case-study-2-a-18-reuniones': 'Case Study: De 2 a 18 Reuniones/Semana en 45 Días',
    'checklist-infraestructura-b2b': 'Checklist: 12 Componentes de una Infraestructura Comercial B2B',
    'checklist-marketing-vs-infraestructura': 'Checklist: ¿Necesitas Marketing o Infraestructura?',
    'checklist-que-automatizar': 'Checklist: Qué Automatizar y Qué No en Ventas B2B',
    'comparativa-agencia-vs-infraestructura': 'Comparativa: Modelo Agencia vs Modelo Infraestructura',
    'crm-pipeline-checklist-ceos-b2b': 'CRM & Pipeline Checklist para CEOs B2B — 27 Puntos',
    'dashboard-7-metricas-outbound': 'Dashboard: Las 7 Métricas que Importan en Outbound B2B',
    'dashboard-kpis-infraestructura': 'Dashboard de KPIs de Infraestructura Comercial B2B',
    'diagnostico-5-factores-fracaso': 'Diagnóstico: Los 5 Factores que Hacen Fracasar Proyectos Comerciales B2B',
    'diagnostico-cuellos-botella': 'Diagnóstico: Los 3 Cuellos de Botella del Crecimiento B2B',
    'framework-icp-scoring': 'Framework: ICP Scoring Matrix',
    'glosario-revenue-infrastructure': 'Glosario: Revenue Infrastructure — 25 Términos Clave',
    'guia-prompts-ia-prospeccion': 'Guía: 7 Prompts de IA para Prospección B2B',
    'guia-prompts-investigacion-cuenta': '15 Prompts de IA para Investigar Cuentas B2B en 2 Minutos',
    'infografia-5-capas-apex': 'Las 5 Capas de APEX OS — Infografía Interactiva',
    'informe-benchmarks-prospeccion-b2b': 'Informe: Benchmarks de Prospección B2B en España 2026',
    'listas-zombi-lm': 'Checklist: Auditoría de Listas B2B — 20 Señales de Datos Muertos',
    'mapa-dependencias-criticas': 'Mapa de Dependencias Críticas en tu Proceso Comercial',
    'pipeline-audit-scorecard': 'Pipeline Audit Scorecard — 8 Dimensiones',
    'plantilla-icp-4-dimensiones': 'Plantilla: ICP en 4 Dimensiones con Sistema de Scoring',
    'plantilla-secuencia-linkedin': 'Plantilla: Secuencia LinkedIn B2B en 5 Pasos',
    'plantilla-workflow-seguimiento-ia': 'Workflow de Seguimiento Automatizado con IA',
    'roadmap-escalado-comercial-b2b': 'Roadmap: Las 4 Fases de Escalado Comercial B2B',
    'roi-calculator-apex-os': 'ROI Calculator — Infraestructura Comercial B2B con APEX OS',
    'scorecard-dependencia-ceo': 'Test: ¿Tu Empresa Depende de Ti para Vender?',
    'scorecard-modelo-consultoria': 'Scorecard: ¿Tu Modelo de Consultoría Tiene Fecha de Caducidad?',
    'scorecard-preparacion-delegar-ventas': 'Scorecard: ¿Estás Preparado para Delegar Ventas?',
    'swipe-file-emails-frios': 'Swipe File: 12 Emails Fríos B2B con >40% Open Rate',
    'template-outbound-multicanal': 'Plantilla: Secuencia de Outbound Multicanal de 21 Días',
    'test-crecimiento-vs-momentum': 'Test: ¿Tienes Crecimiento o Momentum?',
    'tutorial-stack-enriquecimiento': 'Stack de Enriquecimiento de Datos B2B: Tutorial Completo',
    'workflow-multicanal-14-dias': 'Workflow: Secuencia Multicanal de 14 Días',
  };

  // Exit-intent has custom copy (no page field)
  const EXIT_INTENT = {
    name: 'Checklist: 12 Componentes de Infraestructura Comercial B2B',
    url: 'https://globalgrowth.consulting/lead-magnets/checklist-infraestructura-b2b',
    subject: 'Tu diagnóstico de infraestructura comercial está listo',
    intro: 'Has dado el primer paso para dejar de improvisar en ventas. Aquí tienes el checklist con los 12 componentes que necesita tu infraestructura comercial B2B.',
  };

  // Resolve the lead magnet slug from the page field (e.g. "lead-magnets/checklist-infraestructura-b2b" → "checklist-infraestructura-b2b")
  const lmSlug = page ? page.replace(/^lead-magnets\//, '').replace(/\.html$/, '') : '';
  const isExitIntent = source === 'exit-intent';

  let resourceName, resourceUrl, emailSubject, emailIntro;

  if (isExitIntent) {
    resourceName = EXIT_INTENT.name;
    resourceUrl = EXIT_INTENT.url;
    emailSubject = EXIT_INTENT.subject;
    emailIntro = EXIT_INTENT.intro;
  } else if (lmSlug && LEAD_MAGNETS[lmSlug]) {
    resourceName = LEAD_MAGNETS[lmSlug];
    resourceUrl = `https://globalgrowth.consulting/lead-magnets/${lmSlug}`;
    emailSubject = `Tu recurso está listo — ${resourceName}`;
    emailIntro = `Gracias por tu interés. Aquí tienes tu recurso:`;
  } else {
    resourceName = source || 'Recurso GGC';
    resourceUrl = page && page.startsWith('http') ? page : `https://globalgrowth.consulting/${page || ''}`;
    emailSubject = `Tu recurso está listo — Global Growth Consulting`;
    emailIntro = 'Gracias por tu interés. Aquí tienes tu recurso:';
  }

  try {
    // 1. Resource email to lead
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Xavi Fortuna <xavi@globalgrowth.consulting>',
        to: email,
        reply_to: 'xavi.fortuna@globalgrowth.consulting',
        subject: emailSubject,
        html: `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;color:#333;line-height:1.7;font-size:15px">
          <p>${nombre ? `Hola ${nombre},` : 'Hola,'}</p>
          <p>${emailIntro}</p>
          <div style="margin:24px 0;padding:20px;background:#f8f8f8;border-radius:8px;border-left:4px solid #8B5CF6">
            <strong style="font-size:16px">${resourceName}</strong><br>
            <a href="${resourceUrl}" style="color:#8B5CF6;font-weight:bold;font-size:15px;margin-top:8px;display:inline-block">Acceder al recurso →</a>
          </div>
          <p>Si después de revisarlo quieres ver cómo aplicar esto en tu empresa, reserva 15 minutos conmigo:</p>
          <p style="margin:24px 0"><a href="https://globalgrowth.consulting/agendar" style="display:inline-block;padding:14px 28px;background:#8B5CF6;color:white;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px">Agendar sesión de diagnóstico</a></p>
          <p style="margin-top:32px;padding-top:16px;border-top:1px solid #eee;color:#999;font-size:13px">— Xavi Fortuna<br>CEO & Head of Growth<br>Global Growth Consulting</p>
        </div>`
      })
    });

    // 2. Notify Xavi via email
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'GGC Web <xavi@globalgrowth.consulting>',
        to: NOTIFY_EMAIL,
        subject: `📥 Nuevo lead magnet: ${email}`,
        html: `<p><strong>Nuevo lead magnet descargado:</strong></p><ul><li><strong>Email:</strong> ${email}</li><li><strong>Nombre:</strong> ${nombre || '—'}</li><li><strong>Empresa:</strong> ${empresa || '—'}</li><li><strong>Recurso:</strong> ${source || '—'}</li><li><strong>Página:</strong> ${page || '—'}</li><li><strong>Fecha:</strong> ${fecha}</li></ul>`
      })
    });

    // 3. Create/update contact in GHL with tags
    const GHL_KEY = process.env.GHL_API_KEY;
    const GHL_LOC = process.env.GHL_LOCATION_ID;
    const slugTag = source ? source.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 50) : 'recurso';
    if (GHL_KEY && GHL_LOC) {
      const searchRes = await fetch(`https://services.leadconnectorhq.com/contacts/search/duplicate?locationId=${GHL_LOC}&email=${encodeURIComponent(email)}`, {
        headers: { 'Authorization': `Bearer ${GHL_KEY}`, 'Version': '2021-07-28' }
      });
      const searchData = await searchRes.json();
      const existingId = searchData?.contact?.id;

      if (existingId) {
        await fetch(`https://services.leadconnectorhq.com/contacts/${existingId}`, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${GHL_KEY}`, 'Content-Type': 'application/json', 'Version': '2021-07-28' },
          body: JSON.stringify({ tags: ['web-leadmagnet', `lm-${slugTag}`], source: 'GGC Web', companyName: empresa || '' })
        });
      } else {
        await fetch('https://services.leadconnectorhq.com/contacts/', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${GHL_KEY}`, 'Content-Type': 'application/json', 'Version': '2021-07-28' },
          body: JSON.stringify({
            locationId: GHL_LOC,
            email,
            name: nombre || '',
            companyName: empresa || '',
            tags: ['web-leadmagnet', `lm-${slugTag}`],
            source: 'GGC Web'
          })
        });
      }
    }

    // 4. Notify via Discord
    if (DISCORD_WEBHOOK) {
      await fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: '📥 Nuevo lead magnet descargado',
            color: 0x8B5CF6,
            fields: [
              { name: 'Email', value: email, inline: true },
              { name: 'Nombre', value: nombre || '—', inline: true },
              { name: 'Empresa', value: empresa || '—', inline: true },
              { name: 'Recurso', value: source || '—', inline: false },
              { name: 'Página', value: page || '—', inline: false }
            ],
            timestamp: new Date().toISOString()
          }]
        })
      }).catch(() => {});
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Lead magnet error:', err);
    return res.status(500).json({ error: 'Error sending email' });
  }
}
