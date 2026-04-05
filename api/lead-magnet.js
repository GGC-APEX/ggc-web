export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, nombre, empresa, source, page } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email required' });

  const RESEND_KEY = process.env.RESEND_API_KEY;
  const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'xavi.fortuna@globalgrowth.consulting';
  const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;
  const fecha = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
  const resourceUrl = page && page.startsWith('http') ? page : `https://globalgrowth.consulting/${page || ''}`;

  try {
    // 1. Resource email to lead
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Xavi Fortuna <xavi@globalgrowth.consulting>',
        to: email,
        reply_to: 'xavi.fortuna@globalgrowth.consulting',
        subject: `Tu recurso está listo — ${source || 'Global Growth Consulting'}`,
        html: `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;color:#333;line-height:1.7;font-size:15px">
          <p>${nombre ? `Hola ${nombre},` : 'Hola,'}</p>
          <p>Gracias por tu interés. Aquí tienes tu recurso:</p>
          <div style="margin:24px 0;padding:20px;background:#f8f8f8;border-radius:8px;border-left:4px solid #8B5CF6">
            <strong style="font-size:16px">${source || 'Recurso GGC'}</strong><br>
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
