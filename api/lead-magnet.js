export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, nombre, empresa, source, page } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email required' });

  const RESEND_KEY = process.env.RESEND_API_KEY;
  const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'xavi.fortuna@globalgrowth.consulting';

  // Map page to full URL for the resource link
  const resourceUrl = page && page.startsWith('http') ? page : `https://globalgrowth.consulting/${page || ''}`;

  try {
    // 1. Send resource email to lead
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Xavi Fortuna <xavi@globalgrowth.consulting>',
        to: email,
        reply_to: 'xavi.fortuna@globalgrowth.consulting',
        subject: `Tu recurso está listo — ${source || 'Global Growth Consulting'}`,
        html: `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#333;line-height:1.7">
          <p style="font-size:16px">${nombre ? `Hola ${nombre},` : 'Hola,'}</p>
          <p>Gracias por tu interés. Aquí tienes tu recurso:</p>
          <div style="margin:24px 0;padding:20px;background:#f8f8f8;border-radius:8px;border-left:4px solid #8B5CF6">
            <strong>${source || 'Recurso GGC'}</strong><br>
            <a href="${resourceUrl}" style="color:#8B5CF6;font-weight:bold;font-size:15px">Acceder al recurso →</a>
          </div>
          <p>Si después de revisarlo quieres ver cómo aplicar esto en tu empresa, reserva 15 minutos conmigo:</p>
          <p style="margin:24px 0"><a href="https://globalgrowth.consulting/agendar" style="display:inline-block;padding:14px 28px;background:#8B5CF6;color:white;border-radius:8px;text-decoration:none;font-weight:bold">Agendar sesión de diagnóstico</a></p>
          <p style="margin-top:32px;padding-top:16px;border-top:1px solid #eee;color:#999;font-size:13px">— Xavi Fortuna<br>CEO & Head of Growth<br>Global Growth Consulting</p>
        </div>`
      })
    });

    // 2. Notify Xavi
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'GGC Web <xavi@globalgrowth.consulting>',
        to: NOTIFY_EMAIL,
        subject: `📥 Nuevo lead magnet: ${email}`,
        html: `<p><strong>Nuevo lead magnet descargado:</strong></p>
          <ul>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Nombre:</strong> ${nombre || '—'}</li>
            <li><strong>Empresa:</strong> ${empresa || '—'}</li>
            <li><strong>Recurso:</strong> ${source || '—'}</li>
            <li><strong>Página:</strong> ${page || '—'}</li>
            <li><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}</li>
          </ul>`
      })
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Lead magnet error:', err);
    return res.status(500).json({ error: 'Error sending email' });
  }
}
