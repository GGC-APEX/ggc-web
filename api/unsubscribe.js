export default async function handler(req, res) {
  const email = req.query?.email || req.body?.email;
  if (!email) return res.status(400).send('Email requerido.');

  const GHL_KEY = process.env.GHL_API_KEY;
  const GHL_LOC = process.env.GHL_LOCATION_ID;

  try {
    if (GHL_KEY && GHL_LOC) {
      // Find contact in GHL
      const searchRes = await fetch(
        `https://services.leadconnectorhq.com/contacts/search/duplicate?locationId=${GHL_LOC}&email=${encodeURIComponent(email)}`,
        { headers: { 'Authorization': `Bearer ${GHL_KEY}`, 'Version': '2021-07-28' } }
      );
      const searchData = await searchRes.json();
      const contactId = searchData?.contact?.id;

      if (contactId) {
        // Remove web-newsletter tag
        await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${GHL_KEY}`,
            'Content-Type': 'application/json',
            'Version': '2021-07-28'
          },
          body: JSON.stringify({ removeFromDnD: false, source: 'GGC Web Unsubscribe' })
        });
      }
    }

    // Return a simple confirmation page
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dado de baja — GGC</title>
<style>
  body { margin: 0; background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif;
         display: flex; align-items: center; justify-content: center; min-height: 100vh; }
  .box { max-width: 480px; padding: 48px 32px; text-align: center; }
  h1 { font-size: 24px; font-weight: 700; margin: 0 0 16px; }
  p { color: #888; line-height: 1.7; margin: 0 0 32px; }
  a { color: #fff; font-weight: 600; text-decoration: none; border-bottom: 1px solid #444; }
</style>
</head>
<body>
<div class="box">
  <h1>Dado de baja correctamente.</h1>
  <p>Has sido eliminado de la lista de newsletter de Global Growth Consulting.<br>No recibirás más emails de esta secuencia.</p>
  <a href="https://globalgrowth.consulting">Volver a la web</a>
</div>
</body>
</html>`);
  } catch (err) {
    console.error('Unsubscribe error:', err);
    return res.status(500).send('Error al procesar la baja. Escríbenos a soporte@globalgrowth.consulting.');
  }
}
