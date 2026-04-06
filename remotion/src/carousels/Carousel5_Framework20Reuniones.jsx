import React from 'react';
import { theme } from '../theme.js';
import { SlideBase } from '../components/SlideBase.jsx';

const TOTAL = 8;
const { purple, purpleLight, cyan, pink, white, gray400, gray600 } = theme.colors;

export const F5Slide1 = () => (
  <SlideBase slideNumber={1} totalSlides={TOTAL}>
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      padding: '80px 80px 40px', textAlign: 'center',
    }}>
      {/* Watermark */}
      <div style={{
        fontSize: 200, fontWeight: 900, color: purple, lineHeight: 1,
        opacity: 0.07, position: 'absolute', bottom: 90, right: -20,
      }}>20</div>

      {/* Tag */}
      <div style={{
        fontSize: 18, fontWeight: 700, letterSpacing: 5, color: cyan,
        textTransform: 'uppercase', marginBottom: 40,
        background: 'rgba(34,211,238,0.08)', padding: '8px 24px',
        borderRadius: 4, border: '1px solid rgba(34,211,238,0.25)',
      }}>
        627+ implementaciones · Manual
      </div>

      <div style={{ fontSize: 72, fontWeight: 900, color: white, lineHeight: 1.1, marginBottom: 40, maxWidth: 840 }}>
        <span style={{ color: cyan }}>20 reuniones</span> cualificadas
        <br />a la semana.
        <br />Sin estar encima{' '}
        <span style={{ color: purple }}>las 24 horas</span>.
      </div>

      <div style={{ fontSize: 28, color: gray400, lineHeight: 1.5, maxWidth: 680 }}>
        No es magia. Son{' '}
        <span style={{ color: white, fontWeight: 700 }}>5 infraestructuras</span> instaladas en orden.
      </div>

      <div style={{
        position: 'absolute', bottom: 100, left: '50%', transform: 'translateX(-50%)',
        fontSize: 22, fontWeight: 600, color: gray400,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        El manual <span style={{ color: cyan }}>→</span>
      </div>
    </div>
  </SlideBase>
);

export const F5Slide2 = () => (
  <SlideBase slideNumber={2} totalSlides={TOTAL}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '70px 80px 40px' }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: '#EF4444', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 20 }}>EL ERROR MÁS CARO</div>
      <div style={{ fontSize: 46, fontWeight: 900, color: white, marginBottom: 40, lineHeight: 1.2 }}>Por qué falla el 90%<br />de la prospección B2B</div>

      {/* Wrong pitch box */}
      <div style={{
        background: 'rgba(239,68,68,0.06)',
        border: '1px solid rgba(239,68,68,0.25)',
        borderRadius: 16,
        padding: '32px 40px',
        marginBottom: 40,
        fontSize: 26, color: gray400, fontStyle: 'italic',
      }}>
        "¿Qué hacéis?"<br /><br />
        "Bueno... ayudamos a empresas B2B a crecer, con un enfoque estratégico y operativo, dependiendo del caso y del tamaño..."
      </div>

      <div style={{ fontSize: 30, fontWeight: 700, color: white, marginBottom: 20 }}>
        Eso no es una oferta. <span style={{ color: '#EF4444' }}>Es una improvisación.</span>
      </div>

      <div style={{
        background: 'rgba(139,92,246,0.08)',
        border: '1px solid rgba(139,92,246,0.25)',
        borderRadius: 12, padding: '24px 32px', flex: 1,
        display: 'flex', alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: purpleLight, letterSpacing: 3, marginBottom: 12 }}>LA REGLA</div>
          <div style={{ fontSize: 28, color: white, lineHeight: 1.4 }}>
            Tu oferta tiene que ser una{' '}
            <span style={{ color: cyan }}>transformación</span>,
            no una lista de servicios.
          </div>
        </div>
      </div>
    </div>
  </SlideBase>
);

const InfraSlide = ({ num, title, slideNum, children }) => (
  <SlideBase slideNumber={slideNum} totalSlides={TOTAL}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '70px 80px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40 }}>
        <div style={{
          width: 88, height: 88, borderRadius: '50%',
          background: `linear-gradient(135deg, ${purple}, ${cyan})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 44, fontWeight: 900, color: white, flexShrink: 0,
        }}>{num}</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: cyan, letterSpacing: 4, textTransform: 'uppercase' }}>INFRAESTRUCTURA {num}</div>
          <div style={{ fontSize: 48, fontWeight: 900, color: white, lineHeight: 1 }}>{title}</div>
        </div>
      </div>
      <div style={{
        width: 80, height: 3,
        background: `linear-gradient(90deg, ${purple}, ${cyan})`,
        marginBottom: 40, borderRadius: 2,
      }} />
      {children}
    </div>
  </SlideBase>
);

export const F5Slide3 = () => (
  <InfraSlide num={1} title="Empaquetado de Oferta" slideNum={3}>
    {/* Formula */}
    <div style={{
      background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)',
      borderRadius: 12, padding: '20px 32px', marginBottom: 32,
      fontSize: 26, color: purpleLight, textAlign: 'center', fontStyle: 'italic',
    }}>
      [Transformación] para [ICP específico] en [tiempo concreto]
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
      <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: '20px 24px' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#EF4444', letterSpacing: 2, marginBottom: 12 }}>❌ NO FUNCIONA</div>
        <div style={{ fontSize: 20, color: gray400 }}>"Ofrecemos consultoría comercial B2B con enfoque estratégico"</div>
      </div>
      <div style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 12, padding: '20px 24px' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: cyan, letterSpacing: 2, marginBottom: 12 }}>✓ SÍ FUNCIONA</div>
        <div style={{ fontSize: 20, color: white }}>"Pasas de 5 a 20 reuniones cualificadas por semana en 8 semanas"</div>
      </div>
    </div>

    <div style={{ display: 'flex', gap: 16 }}>
      {['Industria concreta', 'Tamaño empresa', 'Cargo decisor', 'Problema específico'].map((item, i) => (
        <div key={i} style={{
          flex: 1, background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.2)',
          borderRadius: 8, padding: '12px 14px', textAlign: 'center',
          fontSize: 18, color: cyan, fontWeight: 600,
        }}>{item}</div>
      ))}
    </div>

    <div style={{ fontSize: 24, color: gray400, marginTop: 28, fontStyle: 'italic', textAlign: 'center' }}>
      Si no tienes esto claro, todo lo que construyas encima va a fallar.
    </div>
  </InfraSlide>
);

export const F5Slide4 = () => (
  <InfraSlide num={2} title="Lista de Alta Precisión" slideNum={4}>
    <div style={{ fontSize: 26, fontWeight: 700, color: purpleLight, textAlign: 'center', marginBottom: 40 }}>
      No es cantidad. Es <span style={{ color: cyan }}>precisión</span>.
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, flex: 1, justifyContent: 'center' }}>
      {[
        { label: '10.000 contactos genéricos', width: '100%', note: '' },
        { label: '2.000 empresas que encajan', width: '70%', note: '↓ ICP firmográfico' },
        { label: '600 con el stack correcto', width: '44%', note: '↓ ICP tecnográfico' },
        { label: '300 cuentas activas ahora', width: '28%', note: '↓ señales timing' },
      ].map((row, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <div style={{ fontSize: 18, color: cyan, padding: '8px 0', textAlign: 'center', opacity: 0.7 }}>{row.note}</div>
          )}
          <div style={{
            width: row.width,
            background: i === 3
              ? `linear-gradient(90deg, rgba(139,92,246,0.2), rgba(34,211,238,0.1))`
              : 'rgba(255,255,255,0.04)',
            border: i === 3
              ? `2px solid ${purple}`
              : '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10, padding: '16px 24px',
            fontSize: i === 3 ? 28 : 24,
            fontWeight: i === 3 ? 700 : 400,
            color: i === 3 ? purpleLight : gray400,
            textAlign: 'center',
          }}>
            {row.label}
          </div>
        </React.Fragment>
      ))}
    </div>
  </InfraSlide>
);

export const F5Slide5 = () => (
  <InfraSlide num={3} title="Secuencia Multicanal" slideNum={5}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
      {[
        { day: 'Día 1', action: 'Email personalizado', note: 'con trigger específico' },
        { day: 'Día 3', action: 'LinkedIn connection', note: '+ nota contextual' },
        { day: 'Día 6', action: 'Llamada corta', note: '30 seg., sin pitch' },
        { day: 'Día 9', action: 'Email 2', note: 'caso de éxito relevante' },
        { day: 'Día 12', action: 'LinkedIn DM', note: 'mensaje directo' },
        { day: 'Día 17', action: 'Email final', note: 'break-up' },
      ].map((step, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 72, fontSize: 18, fontWeight: 700, color: cyan, textAlign: 'right', flexShrink: 0 }}>{step.day}</div>
          <div style={{ width: 2, height: 36, background: 'rgba(34,211,238,0.3)', flexShrink: 0 }} />
          <div style={{
            flex: 1, background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 8, padding: '12px 20px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: white }}>{step.action}</span>
            <span style={{ fontSize: 18, color: gray400 }}>{step.note}</span>
          </div>
        </div>
      ))}
    </div>

    <div style={{
      marginTop: 24, display: 'flex', gap: 20,
    }}>
      <div style={{ flex: 1, background: 'rgba(139,92,246,0.1)', border: `1px solid rgba(139,92,246,0.3)`, borderRadius: 10, padding: '16px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 36, fontWeight: 900, color: purpleLight }}>8-12%</div>
        <div style={{ fontSize: 16, color: gray400 }}>Multicanal</div>
      </div>
      <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '16px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 36, fontWeight: 900, color: gray600 }}>1-2%</div>
        <div style={{ fontSize: 16, color: gray400 }}>Canal único</div>
      </div>
    </div>
  </InfraSlide>
);

export const F5Slide6 = () => (
  <InfraSlide num={4} title="Cualificación Activa" slideNum={6}>
    <div style={{ fontSize: 24, color: gray400, marginBottom: 32 }}>
      Una reunión con quien no puede comprar no es una oportunidad. Es tiempo perdido.
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, flex: 1 }}>
      {[
        { label: 'BUDGET', q: '¿Tiene presupuesto?' },
        { label: 'AUTHORITY', q: '¿Decide o influye?' },
        { label: 'NEED', q: '¿Tiene el problema?' },
        { label: 'TIMING', q: '¿Lo reconoce como urgente?' },
      ].map((item, i) => (
        <div key={i} style={{
          background: 'rgba(139,92,246,0.06)',
          border: '1px solid rgba(139,92,246,0.2)',
          borderRadius: 12, padding: '28px 24px',
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: cyan, letterSpacing: 4 }}>{item.label}</div>
          <div style={{ fontSize: 26, fontWeight: 600, color: white, lineHeight: 1.3 }}>{item.q}</div>
        </div>
      ))}
    </div>
    <div style={{ fontSize: 22, color: gray400, marginTop: 28, textAlign: 'center', fontStyle: 'italic' }}>
      Si no puedes responder estas 4 antes de la reunión,{' '}
      <span style={{ color: white }}>la reunión no está bien cualificada</span>.
    </div>
  </InfraSlide>
);

export const F5Slide7 = () => (
  <InfraSlide num={5} title="Loop de Datos" slideNum={7}>
    {/* Cycle */}
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      gap: 0, marginBottom: 40, flexWrap: 'wrap',
    }}>
      {['Ejecutar', 'Medir', 'Analizar', 'Optimizar'].map((step, i) => (
        <React.Fragment key={i}>
          <div style={{
            background: `linear-gradient(135deg, rgba(139,92,246,0.15), rgba(34,211,238,0.08))`,
            border: '1px solid rgba(139,92,246,0.3)',
            borderRadius: 10, padding: '16px 24px',
            fontSize: 22, fontWeight: 700, color: purpleLight,
            textAlign: 'center',
          }}>{step}</div>
          {i < 3 && <div style={{ fontSize: 24, color: cyan, padding: '0 8px' }}>→</div>}
        </React.Fragment>
      ))}
      <div style={{ fontSize: 24, color: cyan, padding: '0 8px' }}>↰</div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
      {[
        { m: 'CPR', freq: 'Semana' },
        { m: 'Tasa respuesta por canal', freq: 'Semana' },
        { m: 'Conversión reunión → propuesta', freq: 'Mes' },
        { m: 'Ciclo de venta', freq: 'Mes' },
      ].map((row, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 10, padding: '18px 28px',
        }}>
          <span style={{ fontSize: 24, color: white }}>{row.m}</span>
          <span style={{
            fontSize: 18, fontWeight: 700, color: cyan,
            background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)',
            borderRadius: 4, padding: '4px 14px', letterSpacing: 2,
          }}>Cada {row.freq}</span>
        </div>
      ))}
    </div>

    <div style={{ fontSize: 22, color: gray400, marginTop: 24, textAlign: 'center', fontStyle: 'italic' }}>
      Sin esta infraestructura, las otras 4 degradan.{' '}
      <span style={{ color: white }}>Con ella, mejoran solas.</span>
    </div>
  </InfraSlide>
);

export const F5Slide8 = () => (
  <SlideBase slideNumber={8} totalSlides={TOTAL} hideFooter>
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      padding: '60px 80px', textAlign: 'center',
      background: `radial-gradient(ellipse at center, rgba(139,92,246,0.1) 0%, transparent 70%)`,
    }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: cyan, letterSpacing: 5, marginBottom: 30 }}>
        LAS 5 INFRAESTRUCTURAS
      </div>

      {/* Stack visual */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 700, marginBottom: 40 }}>
        {[
          { n: 5, label: 'Loop de Datos', width: '100%' },
          { n: 4, label: 'Cualificación Activa', width: '88%' },
          { n: 3, label: 'Secuencia Multicanal', width: '76%' },
          { n: 2, label: 'Lista de Precisión', width: '88%' },
          { n: 1, label: 'Empaquetado de Oferta', width: '100%', highlight: true },
        ].map((layer, i) => (
          <div key={i} style={{
            width: layer.width, margin: '0 auto',
            background: layer.highlight
              ? `linear-gradient(90deg, rgba(139,92,246,0.2), rgba(34,211,238,0.1))`
              : 'rgba(255,255,255,0.04)',
            border: layer.highlight ? `2px solid ${purple}` : '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10, padding: '14px 24px',
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: layer.highlight ? `linear-gradient(135deg, ${purple}, ${cyan})` : 'rgba(139,92,246,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 900, color: white, flexShrink: 0,
            }}>{layer.n}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: layer.highlight ? purpleLight : white }}>
              {layer.label}
            </div>
            {layer.highlight && (
              <div style={{ marginLeft: 'auto', fontSize: 16, color: cyan, fontWeight: 600 }}>← EMPIEZA AQUÍ</div>
            )}
          </div>
        ))}
      </div>

      <div style={{ fontSize: 26, color: gray400, marginBottom: 50, maxWidth: 600 }}>
        Saltarse una es como construir el segundo piso sin cimientos.
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${purple}, ${cyan})`,
        color: white, fontSize: 24, fontWeight: 800,
        padding: '20px 50px', borderRadius: 8, letterSpacing: 2, marginBottom: 30,
      }}>
        🔗 ENLACE EN BIO
      </div>
      <div style={{ fontSize: 20, color: gray400 }}>globalgrowth.consulting/agendar</div>

      <div style={{
        position: 'absolute', bottom: 40,
        display: 'flex', alignItems: 'center', gap: 30,
      }}>
        <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: 3, color: white, opacity: 0.9 }}>GLOBAL GROWTH CONSULTING</span>
        <span style={{ color: gray600 }}>·</span>
        <span style={{ fontSize: 20, color: cyan }}>@sir.fortuna</span>
      </div>
    </div>
  </SlideBase>
);
