# GGC Web — globalgrowth.consulting

## Proyecto
Web corporativa de Global Growth Consulting.
URL live: globalgrowth.consulting
Stack actual: HTML estático + Tailwind CDN + JS vanilla
Deploy: Vercel via GitHub push

## Objetivo de esta sesión
Rediseñar la web completa con nivel premium y añadir funcionalidades nuevas:
1. Rediseño visual completo (dark, premium, animaciones)
2. Sección de blog con sistema de artículos
3. Captura de email para newsletter
4. Webhook de Make para publicación automática de contenido

## La empresa
- Global Growth Consulting (GGC)
- CEO: Xavi Fortuna
- Servicio: APEX OS™ — infraestructura comercial B2B permanente
- No somos agencia. Instalamos sistemas que quedan en propiedad del cliente
- Modelo: success-based (cobramos vinculado a resultados)
- Target: agencias, consultorías, firmas de servicios profesionales B2B
- Track record: 627+ clientes, ~1.5M€ revenue
- Contacto: soporte@globalgrowth.consulting
- Dirección: Moll de Lleida, Bloque 2 Oficina N/O, 43002, Tarragona
- LinkedIn: linkedin.com/in/xavierfortuna/
- Instagram: instagram.com/sir.fortuna/
- Calendario: globalgrowth.consulting/agendar

## Voz y tono
- Directo, frases cortas, sin corporate speak
- Como un CEO que ha estado en las trincheras
- Opiniones claras, datos concretos
- Tuteo profesional, español peninsular
- NUNCA usar: "en el mundo actual", "sin duda", "es importante destacar"

## Diseño deseado
- Paleta oscura: fondo negro/gris oscuro, acentos dorado/ámbar, texto blanco
- Tipografía que transmita autoridad
- Animaciones en scroll (fade-in, counters, parallax sutil)
- Mobile-first, Core Web Vitals optimizados
- Referentes: web de Linear, Vercel, Stripe — premium, limpia, con personalidad

## Páginas necesarias
- index.html — landing principal
- blog.html — listado de artículos
- blog/[slug].html — template de artículo individual
- newsletter.html — landing de captura de email (o integrada en blog)
- agendar.html — ya existe
- aviso-legal.html — ya existe
- cookies.html — ya existe
- privacidad.html — ya existe

## Reglas técnicas
- Un archivo HTML por página, todo autocontenido
- Tailwind via CDN
- JS vanilla (no React, no build tools)
- Los artículos del blog se generan como HTML estático
- Meta tags, Open Graph y schema markup en cada página
- SEO optimizado

## NO tocar
- Archivos fuera de ~/ggc-web/
