# GHL Workflow: Pre-Demo Sequence (Booking Trigger)

> **Propósito:** Cuando un lead confirma una demo, suprimir la Secuencia 2 (Consideración)
> y activar la Secuencia 3 (Pre-Demo) con los 4 emails en los timings correctos.
> Última actualización: 2026-04-06

---

## Resumen del workflow

**Nombre:** `Pre-Demo Sequence — Booking Trigger`
**Trigger:** Appointment/Booking confirmado en GHL

```
Booking confirmado
       │
       ├─ REMOVE tag: fase2-nurturing   (suprime Secuencia 2)
       ├─ REMOVE from workflow: Consideration Sequence (si activo)
       │
       ├─ ADD tag: pre-demo
       │
       ├─ Email 1 → inmediato
       ├─ Wait 24h
       ├─ Email 2 → credibilidad
       ├─ Wait 24h  (= 48h desde booking)
       ├─ Email 3 → caso real
       ├─ Wait hasta 2h antes de {{appointment.start_date_time}}
       └─ Email 4 + SMS (opcional) → recordatorio
```

---

## Paso a paso en GHL

### 1. Crear el Workflow

- **Ir a:** Automation → Workflows → New Workflow
- **Nombre:** `Pre-Demo Sequence — Booking Trigger`
- **Trigger:** Customer Booked Appointment
  - Filtrar por: Calendar = tu calendario GGC (el de Xavi Fortuna)
  - Status = Confirmed

### 2. Acción 1 — Suprimir Secuencia 2

Añadir acción **"Remove from Workflow"**:
- Workflow: `Consideration Sequence` (Secuencia 2 / fase2-nurturing)
- Esto detiene los emails de nurturing si el lead estaba en esa secuencia

Añadir acción **"Remove Tag"**:
- Tag: `fase2-nurturing`

### 3. Acción 2 — Marcar como Pre-Demo

Añadir acción **"Add Tag"**:
- Tag: `pre-demo`

### 4. Email 1 — Confirmación (INMEDIATO)

Añadir acción **"Send Email"**:
- **Subject:** `Confirmado. Nos vemos el {{appointment.start_date_time}}`
- **From:** Xavi Fortuna `<xavi@globalgrowth.consulting>`
- **Template:** `pre-demo-email-01-confirmacion.html`
- **Delay:** 0 minutos (inmediato)

### 5. Wait 24 horas

Añadir acción **"Wait"**:
- Duration: 1 day (24 hours)

### 6. Email 2 — Credibilidad (+24h)

Añadir acción **"Send Email"**:
- **Subject:** `Antes de que nos veamos — contexto rápido`
- **From:** Xavi Fortuna `<xavi@globalgrowth.consulting>`
- **Template:** `pre-demo-email-02-credibilidad.html`

### 7. Wait 24 horas

Añadir acción **"Wait"**:
- Duration: 1 day (24 hours)

### 8. Email 3 — Caso Real (+48h)

Añadir acción **"Send Email"**:
- **Subject:** `Un caso real antes de la llamada`
- **From:** Xavi Fortuna `<xavi@globalgrowth.consulting>`
- **Template:** `pre-demo-email-03-caso-real.html`

### 9. Wait hasta 2h antes de la demo

Añadir acción **"Wait Until"**:
- Wait until: `2 hours before appointment start time`
- Usar la opción de GHL "Wait until event" con el appointment time

> ⚠️ **Nota:** Asegurarse de que el timing de Email 3 no solape con Email 4. Si el booking es
> el mismo día, GHL debe saltar el Email 3 automáticamente o añadir condición de
> "if appointment is more than 4h away".

### 10. Email 4 — Recordatorio (2h antes)

Añadir acción **"Send Email"**:
- **Subject:** `Hoy a las {{appointment.start_time}} — te espero`
- **From:** Xavi Fortuna `<xavi@globalgrowth.consulting>`
- **Template:** `pre-demo-email-04-recordatorio.html`

### 11. SMS Opcional (2h antes, mismo trigger)

Si el contacto tiene número de móvil, añadir acción **"Send SMS"** justo después del Email 4:
- **Condición previa:** If `{{contact.phone}}` is not empty
- **Mensaje:**
  ```
  Hola {{contact.first_name}}, nos vemos en 2h. Enlace: {{appointment.meeting_link}} — Xavi GGC
  ```

---

## Variables GHL utilizadas

| Variable | Descripción |
|----------|-------------|
| `{{contact.first_name}}` | Nombre del lead |
| `{{appointment.start_date_time}}` | Fecha y hora completa de la demo |
| `{{appointment.start_time}}` | Solo la hora de la demo |
| `{{appointment.meeting_link}}` | Enlace dinámico a la videollamada |
| `{{contact.phone}}` | Teléfono móvil (para SMS opcional) |
| `{{unsubscribe_link}}` | Link de baja (requerido legalmente) |

---

## Archivos de plantilla HTML

Todos en `content-input/newsletter/ghl-templates/`:

| Email | Archivo HTML |
|-------|-------------|
| Email 1 — Confirmación | `pre-demo-email-01-confirmacion.html` |
| Email 2 — Credibilidad | `pre-demo-email-02-credibilidad.html` |
| Email 3 — Caso Real | `pre-demo-email-03-caso-real.html` |
| Email 4 — Recordatorio | `pre-demo-email-04-recordatorio.html` |

---

## Casos edge a considerar

1. **Booking mismo día de la demo:** El Email 3 (caso real, +48h) no debe enviarse si ya ha pasado la demo. Añadir condición: `if appointment start time > now + 4h`.
2. **Lead ya tiene tag `pre-demo`:** Si el lead ha agendado antes (y canceló/reprogramó), el workflow podría duplicar emails. Añadir condición al inicio: `if tag pre-demo exists → skip to update appointment time only`.
3. **Cancelación de cita:** Crear un workflow separado para `Appointment Cancelled` que añada tag `demo-cancelada` y reactive la Secuencia 2 si el lead no ha cerrado.
4. **No-show:** Workflow post-demo separado (secuencia pendiente de producción).

---

## Activación

Una vez configurado:
1. Publicar el workflow (estado: Active)
2. Hacer un test con un booking real de prueba
3. Verificar que el tag `fase2-nurturing` se elimina del contacto de prueba
4. Verificar que los 4 emails llegan en los timings correctos
