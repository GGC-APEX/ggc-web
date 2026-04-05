export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, nombre, source, page } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email required' });

  const RESEND_KEY = process.env.RESEND_API_KEY;
  const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'xavi.fortuna@globalgrowth.consulting';
  const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;
  const fecha = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });

  try {
    // 1. Welcome email to subscriber
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Xavi Fortuna <xavi@globalgrowth.consulting>',
        to: email,
        reply_to: 'xavi.fortuna@globalgrowth.consulting',
        subject: 'Bienvenido — 1 insight semanal sobre infraestructura comercial B2B',
        html: `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;color:#333;line-height:1.7;font-size:15px">
          <p>${nombre ? `Hola ${nombre},` : 'Hola,'}</p>
          <p>Gracias por suscribirte. Cada semana recibirás un insight práctico sobre infraestructura comercial B2B.</p>
          <p>Sin relleno, sin teoría — solo lo que funciona después de +627 empresas.</p>
          <p style="margin:24px 0"><strong>Para empezar, te recomiendo:</strong></p>
          <ul style="padding-left:20px">
            <li style="margin-bottom:8px"><a href="https://globalgrowth.consulting/blog/infraestructura-vs-herramientas" style="color:#8B5CF6">Por qué necesitas infraestructura, no más herramientas</a></li>
            <li><a href="https://globalgrowth.consulting/blog/3-razones-no-crecen" style="color:#8B5CF6">Las 3 razones por las que las empresas B2B no crecen</a></li>
          </ul>
          <p style="margin:28px 0"><a href="https://globalgrowth.consulting/agendar" style="display:inline-block;padding:14px 28px;background:#8B5CF6;color:white;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px">Agendar sesión de diagnóstico</a></p>
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
        subject: `📩 Nuevo suscriptor newsletter: ${email}`,
        html: `<p><strong>Nuevo suscriptor newsletter:</strong></p><ul><li><strong>Email:</strong> ${email}</li><li><strong>Nombre:</strong> ${nombre || '—'}</li><li><strong>Fuente:</strong> ${source || '—'}</li><li><strong>Página:</strong> ${page || '—'}</li><li><strong>Fecha:</strong> ${fecha}</li></ul>`
      })
    });

    // 3. Create/update contact in GHL with tags
    const GHL_KEY = process.env.GHL_API_KEY;
    const GHL_LOC = process.env.GHL_LOCATION_ID;
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
          body: JSON.stringify({ tags: ['web-newsletter'], source: 'GGC Web' })
        });
      } else {
        await fetch('https://services.leadconnectorhq.com/contacts/', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${GHL_KEY}`, 'Content-Type': 'application/json', 'Version': '2021-07-28' },
          body: JSON.stringify({
            locationId: GHL_LOC,
            email,
            name: nombre || '',
            tags: ['web-newsletter'],
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
            title: '📩 Nuevo suscriptor newsletter',
            color: 0x8B5CF6,
            fields: [
              { name: 'Email', value: email, inline: true },
              { name: 'Nombre', value: nombre || '—', inline: true },
              { name: 'Fuente', value: source || '—', inline: true },
              { name: 'Página', value: page || '—', inline: false }
            ],
            timestamp: new Date().toISOString()
          }]
        })
      }).catch(() => {});
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Newsletter error:', err);
    return res.status(500).json({ error: 'Error sending email' });
  }
}
