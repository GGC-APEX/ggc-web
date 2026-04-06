# MASTER — Todas las Secuencias de Email GGC

> **Documento de referencia único.** Todas las secuencias activas o en producción.
> Última actualización: 2026-04-06 (LM Download añadida)

---

## Mapa de secuencias

```
Lead entra al funnel
       │
       ├── Via NEWSLETTER (alta en blog)
       │         └── SECUENCIA 1: Welcome (5 emails, días 1-8)
       │                   └── si no agenda → SECUENCIA 2: Consideración (3 emails, días 16-34)
       │                                               └── CTA: agendar demo
       │
       ├── Via LEAD MAGNET (descarga recurso)
       │         └── SECUENCIA LM: Lead Magnet Download (4 emails, días 0-3) ✅
       │                   — Hormozi-style: entrega → diagnóstico → caso real → CTA agendar
       │                   └── si agenda → suprimir LM sequence, activar Pre-Demo
       │                   └── si no agenda → SECUENCIA 2: Consideración (días 16-34)
       │
       └── AGENDA DEMO (trigger: booking confirmado)
                 └── SECUENCIA 3: Pre-Demo (4 emails + SMS, 0h-2h antes de la demo)
                           └── DESPUÉS: secuencia post-demo (pendiente de producción)
```

---

## SECUENCIA 1 — Welcome Sequence
**Trigger:** Alta en newsletter O descarga de lead magnet
**Objetivo:** Presentar a Xavi, el problema del CEO-vendedor, APEX OS, resultados → CTA agendar
**Total:** 5 emails en 8 días

| Email | Timing | Subject (A) | Archivo |
|-------|--------|-------------|---------|
| 1 | Inmediato | Aquí tienes lo que pediste + algo más | `welcome-sequence/email-01-bienvenida.md` |
| 2 | Día 2 | El problema que nadie quiere admitir | `welcome-sequence/email-02-problema.md` |
| 3 | Día 4 | Lo que instalamos en tu empresa (y por qué se llama APEX OS) | `welcome-sequence/email-03-apex-os.md` |
| 4 | Día 6 | 627 clientes. Lo que aprendimos. | `welcome-sequence/email-04-casos-resultados.md` |
| 5 | Día 8 | ¿Seguimos hablando en persona? | `welcome-sequence/email-05-cta-agendar.md` |

**Templates GHL producidos:** `ghl-templates/email-01-bienvenida.html`, `email-02-problema.html`, etc.

---

## SECUENCIA 2 — Consideración (Nurturing post-welcome, pre-booking)
**Trigger:** Lead completó welcome sequence pero no agendó demo
**Objetivo:** Mantener presencia, atacar objeciones, guiar hacia la decisión de agendar
**Total:** 3 emails en ~18 días (días 16, 24, 34 desde la suscripción)

> ⚠️ NOTA: Esta secuencia se llama internamente "fase2-nurturing". NO es la secuencia pre-demo.
> Es la secuencia de calentamiento ANTES de que el lead decida agendar.

| Email | Timing | Subject (A) | Archivo |
|-------|--------|-------------|---------|
| 1 | Día 16 | Lo que pasó cuando dejó de ser el único que cerraba | `fase2-nurturing/email-01.md` |
| 2 | Día 24 | Lo que nos dicen antes de agendar (y lo que hay detrás) | `fase2-nurturing/email-02.md` |
| 3 | Día 34 | Por qué pagamos solo si tú cobras | `fase2-nurturing/email-03.md` |

**CTAs progresivos:**
- Email 1 → artículo blog (soft CTA)
- Email 2 → scorecard dependencia CEO (MOFU)
- Email 3 → calculadora ROI + agendar (BOFU)

---

## SECUENCIA LM — Lead Magnet Download (Hormozi-style)
**Trigger:** Descarga de cualquier lead magnet
**Objetivo:** Hormozi-style: de "acabo de descargar algo útil" → "quiero una llamada con Xavi"
**Total:** 4 emails en 72h (días 0, 1, 2, 3)

> ✅ Secuencia producida — 2026-04-06

| Email | Timing | Subject (A) | Archivo |
|-------|--------|-------------|---------|
| 1 | Inmediato | [Nombre], aquí está tu [LM] — y algo más | `lead-magnet-sequence/email-01-entrega.md` |
| 2 | +24h | Cómo usar lo que descargaste (y qué te dice de tu empresa) | `lead-magnet-sequence/email-02-diagnostico.md` |
| 3 | +48h | Lo que pasó cuando dejó de ignorar ese número | `lead-magnet-sequence/email-03-caso-real.md` |
| 4 | +72h | Una pregunta directa antes de que acabe esta semana | `lead-magnet-sequence/email-04-cta-agendar.md` |

**Variables dinámicas GHL:** `[nombre del LM]`, `[enlace al LM]`
**Supresión:** Si el lead agenda (tag `pre-demo`) → pausar esta secuencia y activar Pre-Demo

---

## SECUENCIA 3 — Pre-Demo (post-booking, antes de la llamada)
**Trigger:** Lead agenda demo (booking confirmado en GHL/Calendly)
**Objetivo:** Confirmar, construir credibilidad, reducir no-shows, que lleguen predispuestos
**Total:** 4 emails en 0h-2h antes de la demo

> ✅ Esta es la secuencia que el board llama "nurturing pre-demo":
> emails enviados DESPUÉS de agendar y ANTES de la demo.
> Equivalente a C06 de APEX OS: "Secuencias pre-reunión (email/SMS) — 3-5 mensajes"

| Email | Timing | Subject (A) | Archivo |
|-------|--------|-------------|---------|
| 1 | Inmediato (booking) | Confirmado. Nos vemos el [día] a las [hora] | `pre-demo-sequence/email-01-confirmacion.md` |
| 2 | +24h | Antes de que nos veamos — contexto rápido | `pre-demo-sequence/email-02-credibilidad.md` |
| 3 | +48h (día anterior) | Un caso real antes de la llamada | `pre-demo-sequence/email-03-caso-real.md` |
| 4 | 2h antes de la demo | Hoy a las [hora] — te espero | `pre-demo-sequence/email-04-recordatorio.md` |

**SMS opcional (email 4):** template incluido en el archivo `email-04-recordatorio.md`

---

## SECUENCIAS PENDIENTES DE PRODUCCIÓN

| Secuencia | Descripción | Prioridad |
|-----------|-------------|-----------|
| Post-Demo Follow-Up | 4-6 emails tras la demo (V05 APEX OS) — para leads que no cierran en llamada | Alta |

---

## Nomenclatura en GHL

| Secuencia | Tag GHL | Workflow |
|-----------|---------|----------|
| Welcome (newsletter) | `web-newsletter` | Welcome Sequence — Newsletter |
| Welcome (lead magnet) | `web-leadmagnet` + `lm-{recurso}` | Welcome Sequence — LM |
| Consideración | `fase2-nurturing` | Consideration Sequence |
| Pre-Demo | `pre-demo` | Pre-Demo Sequence (C06) |

---

## Nota sobre supresión de secuencias

Cuando un lead agenda demo:
- GHL debe pausar/suprimir la Secuencia 2 (Consideración) si está activa
- Activar automáticamente la Secuencia 3 (Pre-Demo)
- Esto requiere configuración de workflow en GHL (tarea técnica pendiente — escalar al CTO)
