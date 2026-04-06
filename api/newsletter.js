import fs from 'fs';
import path from 'path';

// Email subjects for the 5-part drip sequence
const SUBJECTS = [
  'Bienvenido. Aquí empieza todo.',
  'El problema que nadie quiere admitir',
  'Lo que instalamos en tu empresa (y por qué se llama APEX OS)',
  '627 clientes. Lo que aprendimos.',
  '¿Seguimos hablando en persona?'
];

// Template filenames (in content-input/newsletter/ghl-templates/)
const TEMPLATES = [
  'email-01-newsletter.html',
  'email-02-problema.html',
  'email-03-apex-os.html',
  'email-04-casos.html',
  'email-05-cta.html'
];

// Business-day delays in days for each email (0 = immediate)
const DELAYS_BUSINESS_DAYS = [0, 2, 4, 6, 8];

/**
 * Returns whether DST is active for CET (Europe/Madrid) on a given UTC date.
 * DST runs from last Sunday of March to last Sunday of October.
 */
function isCETSummer(date) {
  const y = date.getUTCFullYear();
  const lastSunMarch = new Date(Date.UTC(y, 2, 31));
  lastSunMarch.setUTCDate(31 - lastSunMarch.getUTCDay());
  const lastSunOct = new Date(Date.UTC(y, 9, 31));
  lastSunOct.setUTCDate(31 - lastSunOct.getUTCDay());
  return date >= lastSunMarch && date < lastSunOct;
}

/**
 * Given a date, advance it by N business days (Mon–Fri), then set it to
 * 10:00 CET. If N === 0, return the current time so the email is sent immediately.
 */
function scheduleAt(businessDays) {
  if (businessDays === 0) return undefined; // send immediately

  let date = new Date();
  let added = 0;
  while (added < businessDays) {
    date.setUTCDate(date.getUTCDate() + 1);
    const dow = date.getUTCDay(); // 0=Sun, 6=Sat
    if (dow !== 0 && dow !== 6) added++;
  }

  // Set time to 10:00 CET (UTC+1 or UTC+2 depending on DST)
  const cetOffset = isCETSummer(date) ? 2 : 1;
  date.setUTCHours(10 - cetOffset, 0, 0, 0);

  return date.toISOString();
}

/**
 * Send one email via Resend, optionally scheduled.
 */
async function sendEmail(resendKey, { to, subject, html, scheduledAt: when }) {
  const body = {
    from: 'Xavi Fortuna <xavi@globalgrowth.consulting>',
    to,
    subject,
    html,
  };
  if (when) body.scheduledAt = when;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return res.ok;
}

/**
 * Schedule the full 5-email drip sequence via Resend for a newsletter subscriber.
 */
async function scheduleDripSequence(resendKey, { email, nombre }) {
  const templateDir = path.join(process.cwd(), 'content-input', 'newsletter', 'ghl-templates');
  const unsubscribeUrl = `https://globalgrowth.consulting/api/unsubscribe?email=${encodeURIComponent(email)}`;
  const firstName = nombre ? nombre.split(' ')[0] : 'amigo';

  const results = [];
  for (let i = 0; i < 5; i++) {
    const templatePath = path.join(templateDir, TEMPLATES[i]);
    let html = fs.readFileSync(templatePath, 'utf-8');

    html = html.replace(/\{\{contact\.first_name\}\}/g, firstName);
    html = html.replace(/\{\{unsubscribe_link\}\}/g, unsubscribeUrl);

    const when = scheduleAt(DELAYS_BUSINESS_DAYS[i]);
    const ok = await sendEmail(resendKey, {
      to: email,
      subject: SUBJECTS[i],
      html,
      scheduledAt: when
    });
    results.push({ email: i + 1, scheduled: when || 'immediate', ok });
  }
  return results;
}

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
    // 1. Create/update contact in GHL for CRM tracking
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

    // 2. Schedule 5-email drip sequence via Resend (no GHL Workflow needed)
    if (RESEND_KEY) {
      await scheduleDripSequence(RESEND_KEY, { email, nombre });
    }

    // 3. Notify Xavi via email
    if (RESEND_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'GGC Web <xavi@globalgrowth.consulting>',
          to: NOTIFY_EMAIL,
          subject: `📩 Nuevo suscriptor newsletter: ${email}`,
          html: `<p><strong>Nuevo suscriptor newsletter:</strong></p><ul><li><strong>Email:</strong> ${email}</li><li><strong>Nombre:</strong> ${nombre || '—'}</li><li><strong>Fuente:</strong> ${source || '—'}</li><li><strong>Página:</strong> ${page || '—'}</li><li><strong>Fecha:</strong> ${fecha}</li></ul><p style="color:#666;font-size:12px">Secuencia drip de 5 emails programada vía Resend (días 0, 2, 4, 6, 8 laborables a las 10:00 CET).</p>`
        })
      });
    }

    // 4. Notify via Discord
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
            footer: { text: 'Secuencia drip Resend — 5 emails programados (días 0, 2, 4, 6, 8 laborables)' },
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
