/**
 * Test endpoint: sends the full 5-email drip sequence to a given address
 * with 5-minute intervals instead of 2-day intervals.
 *
 * Usage: POST /api/newsletter-test
 * Body: { "email": "admin@globelusters.com", "nombre": "Xavi", "key": "<TEST_KEY>" }
 *
 * Or GET: /api/newsletter-test?email=admin@globelusters.com&nombre=Xavi&key=<TEST_KEY>
 *
 * Protected by NEWSLETTER_TEST_KEY env var (set in Vercel). Falls back to "ggctest2026" if unset.
 */

import fs from 'fs';
import path from 'path';

const SUBJECTS = [
  '[TEST 1/5] Bienvenido. Aquí empieza todo.',
  '[TEST 2/5] El problema que nadie quiere admitir',
  '[TEST 3/5] Lo que instalamos en tu empresa (y por qué se llama APEX OS)',
  '[TEST 4/5] 627 clientes. Lo que aprendimos.',
  '[TEST 5/5] ¿Seguimos hablando en persona?'
];

const TEMPLATES = [
  'email-01-newsletter.html',
  'email-02-problema.html',
  'email-03-apex-os.html',
  'email-04-casos.html',
  'email-05-cta.html'
];

// Minutes from now for each email
const DELAY_MINUTES = [0, 5, 10, 15, 20];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Accept GET or POST
  const params = req.method === 'GET' ? req.query : (req.body || {});
  const { email, nombre, key } = params;

  // Auth check
  const expectedKey = process.env.NEWSLETTER_TEST_KEY || 'ggctest2026';
  if (key !== expectedKey) {
    return res.status(401).json({ error: 'Clave incorrecta.' });
  }

  if (!email) return res.status(400).json({ error: 'Email requerido.' });

  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) return res.status(500).json({ error: 'RESEND_API_KEY no configurada.' });

  const templateDir = path.join(process.cwd(), 'content-input', 'newsletter', 'ghl-templates');
  const unsubscribeUrl = `https://globalgrowth.consulting/api/unsubscribe?email=${encodeURIComponent(email)}`;
  const firstName = nombre ? nombre.split(' ')[0] : 'Xavi';

  const results = [];
  const now = new Date();

  for (let i = 0; i < 5; i++) {
    const templatePath = path.join(templateDir, TEMPLATES[i]);
    let html = fs.readFileSync(templatePath, 'utf-8');

    html = html.replace(/\{\{contact\.first_name\}\}/g, firstName);
    html = html.replace(/\{\{unsubscribe_link\}\}/g, unsubscribeUrl);

    // Calculate scheduled time
    const sendAt = new Date(now.getTime() + DELAY_MINUTES[i] * 60 * 1000);

    const body = {
      from: 'Xavi Fortuna <xavi@globalgrowth.consulting>',
      reply_to: 'xavi.fortuna@globalgrowth.consulting',
      to: email,
      subject: SUBJECTS[i],
      html,
    };

    // Only add scheduledAt for emails after the first (or if delay > 0)
    if (DELAY_MINUTES[i] > 0) {
      body.scheduledAt = sendAt.toISOString();
    }

    const apiRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const apiData = await apiRes.json();
    results.push({
      email: i + 1,
      subject: SUBJECTS[i],
      scheduledAt: body.scheduledAt || 'immediate',
      ok: apiRes.ok,
      resendId: apiData?.id,
      error: apiData?.name || null
    });
  }

  const allOk = results.every(r => r.ok);

  return res.status(allOk ? 200 : 207).json({
    ok: allOk,
    to: email,
    message: allOk
      ? `5 emails programados. Email 1 inmediato, luego uno cada 5 min hasta los 20 min.`
      : `Algunos emails fallaron. Revisa los detalles.`,
    schedule: results.map(r => ({
      [`email_${r.email}`]: {
        subject: r.subject,
        scheduledAt: r.scheduledAt,
        ok: r.ok,
        id: r.resendId,
        error: r.error
      }
    }))
  });
}
