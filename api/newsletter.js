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
  const GHL_KEY = process.env.GHL_API_KEY;
  const GHL_LOC = process.env.GHL_LOCATION_ID;
  const fecha = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });

  try {
    // 1. Create/update contact in GHL with tag web-newsletter.
    //    This triggers the GHL Workflow that handles the full 5-email drip sequence via Resend.
    if (GHL_KEY && GHL_LOC) {
      const searchRes = await fetch(
        `https://services.leadconnectorhq.com/contacts/search/duplicate?locationId=${GHL_LOC}&email=${encodeURIComponent(email)}`,
        { headers: { 'Authorization': `Bearer ${GHL_KEY}`, 'Version': '2021-07-28' } }
      );
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
            firstName: nombre || '',
            tags: ['web-newsletter'],
            source: 'GGC Web'
          })
        });
      }
    }

    // 2. Notify Xavi via email
    if (RESEND_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'GGC Web <xavi@globalgrowth.consulting>',
          to: NOTIFY_EMAIL,
          subject: `📩 Nuevo suscriptor newsletter: ${email}`,
          html: `<p><strong>Nuevo suscriptor newsletter:</strong></p><ul><li><strong>Email:</strong> ${email}</li><li><strong>Nombre:</strong> ${nombre || '—'}</li><li><strong>Fuente:</strong> ${source || '—'}</li><li><strong>Página:</strong> ${page || '—'}</li><li><strong>Fecha:</strong> ${fecha}</li></ul><p style="color:#666;font-size:12px">El workflow de bienvenida se ha disparado en GHL automáticamente.</p>`
        })
      });
    }

    // 3. Notify via Discord
    if (DISCORD_WEBHOOK) {
      await fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: '📩 Nuevo suscriptor newsletter',
            color: 0x1a1a1a,
            fields: [
              { name: 'Email', value: email, inline: true },
              { name: 'Nombre', value: nombre || '—', inline: true },
              { name: 'Fuente', value: source || '—', inline: true },
              { name: 'Página', value: page || '—', inline: false }
            ],
            footer: { text: 'Workflow GHL disparado — 5 emails en cola' },
            timestamp: new Date().toISOString()
          }]
        })
      }).catch(() => {});
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Newsletter error:', err);
    return res.status(500).json({ error: 'Error processing subscription' });
  }
}
