import React from 'react';
import { theme } from '../theme.js';
import { SlideBase } from '../components/SlideBase.jsx';

const TOTAL = 8;
const { purple, purpleLight, cyan, pink, white, gray400, gray600 } = theme.colors;

// Slide 1 — Hook
export const Slide1 = () => (
  <SlideBase slideNumber={1} totalSlides={TOTAL}>
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '80px 80px 40px',
      textAlign: 'center',
    }}>
      {/* Big watermark number */}
      <div style={{
        fontSize: 260,
        fontWeight: 900,
        color: purple,
        lineHeight: 1,
        letterSpacing: -8,
        opacity: 0.08,
        position: 'absolute',
        bottom: 100,
        right: 40,
      }}>5</div>

      {/* Tag */}
      <div style={{
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: 5,
        color: cyan,
        textTransform: 'uppercase',
        marginBottom: 40,
        background: 'rgba(34,211,238,0.08)',
        padding: '8px 24px',
        borderRadius: 4,
        border: `1px solid rgba(34,211,238,0.25)`,
      }}>
        Infraestructura Comercial B2B
      </div>

      {/* Main headline */}
      <div style={{
        fontSize: 72,
        fontWeight: 900,
        lineHeight: 1.1,
        color: white,
        marginBottom: 40,
        maxWidth: 840,
      }}>
        La mayoría de equipos B2B tienen{' '}
        <span style={{ color: purple }}>herramientas</span>.
        <br />
        No tienen{' '}
        <span style={{
          color: white,
          textDecoration: `underline ${cyan}`,
          textDecorationThickness: 4,
        }}>sistema</span>.
      </div>

      {/* Subheadline */}
      <div style={{
        fontSize: 30,
        fontWeight: 400,
        color: gray400,
        lineHeight: 1.5,
        maxWidth: 700,
      }}>
        Las empresas que generan reuniones predecibles tienen{' '}
        <span style={{ color: white, fontWeight: 700 }}>5 capas integradas</span>.
        ¿Cuántas tienes?
      </div>

      {/* Swipe CTA */}
      <div style={{
        position: 'absolute',
        bottom: 100,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 22,
        fontWeight: 600,
        color: gray400,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        Desliza para ver las 5 capas
        <span style={{ color: cyan }}>→</span>
      </div>
    </div>
  </SlideBase>
);

// Reusable layer slide
const LayerSlide = ({ layerNum, title, bullets, stat, statLabel }) => (
  <SlideBase slideNumber={layerNum + 1} totalSlides={TOTAL}>
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '70px 80px 40px',
    }}>
      {/* Layer badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        marginBottom: 50,
      }}>
        <div style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${purple}, ${cyan})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
          fontWeight: 900,
          color: white,
          flexShrink: 0,
        }}>
          {layerNum}
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, color: cyan, letterSpacing: 4, textTransform: 'uppercase' }}>
            CAPA {layerNum}
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: white, lineHeight: 1 }}>
            {title}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        width: 80, height: 3,
        background: `linear-gradient(90deg, ${purple}, ${cyan})`,
        marginBottom: 50,
        borderRadius: 2,
      }} />

      {/* Bullets */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, flex: 1 }}>
        {bullets.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 4,
              background: 'rgba(139,92,246,0.12)',
              border: `1px solid rgba(139,92,246,0.35)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              fontWeight: 700,
              color: purpleLight,
              flexShrink: 0,
              marginTop: 2,
            }}>
              {i + 1}
            </div>
            <div style={{ fontSize: 30, color: white, lineHeight: 1.3, fontWeight: 500 }}>
              {b}
            </div>
          </div>
        ))}
      </div>

      {/* Stat box */}
      {stat && (
        <div style={{
          marginTop: 50,
          background: 'rgba(139,92,246,0.07)',
          border: `1px solid rgba(139,92,246,0.3)`,
          borderRadius: 12,
          padding: '28px 36px',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
        }}>
          <div style={{ fontSize: 72, fontWeight: 900, color: purple, lineHeight: 1 }}>
            {stat}
          </div>
          <div style={{ fontSize: 26, color: gray400, fontWeight: 400 }}>
            {statLabel}
          </div>
        </div>
      )}
    </div>
  </SlideBase>
);

export const Slide2 = () => (
  <LayerSlide
    layerNum={1}
    title="ICP y Targeting"
    bullets={[
      'Firmográfico — sector, tamaño, geografía',
      'Tecnográfico — stack, herramientas, madurez',
      'Comportamental — cómo compran, quién decide',
      'Señales de timing — contrataciones, rondas, expansión',
    ]}
    stat="3x"
    statLabel="más conversión con ICP en 4 dimensiones"
  />
);

export const Slide3 = () => (
  <SlideBase slideNumber={3} totalSlides={TOTAL}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '70px 80px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 50 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: `linear-gradient(135deg, ${purple}, ${cyan})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32, fontWeight: 900, color: white,
        }}>2</div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, color: cyan, letterSpacing: 4, textTransform: 'uppercase' }}>CAPA 2</div>
          <div style={{ fontSize: 52, fontWeight: 900, color: white, lineHeight: 1 }}>Contenido y Posicionamiento</div>
        </div>
      </div>
      <div style={{
        width: 80, height: 3,
        background: `linear-gradient(90deg, ${purple}, ${cyan})`,
        marginBottom: 50, borderRadius: 2,
      }} />

      {/* Before/After */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, flex: 1 }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12,
          padding: 36,
        }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#EF4444', letterSpacing: 3, marginBottom: 30 }}>❌ SIN CONTENIDO</div>
          {['"¿Quién es este?"', 'Objeción en frío', 'Sin contexto', 'Ciclo largo'].map((t, i) => (
            <div key={i} style={{ fontSize: 26, color: gray400, marginBottom: 20, lineHeight: 1.3 }}>{t}</div>
          ))}
        </div>
        <div style={{
          background: 'rgba(139,92,246,0.05)',
          border: `1px solid rgba(139,92,246,0.2)`,
          borderRadius: 12,
          padding: 36,
        }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: purpleLight, letterSpacing: 3, marginBottom: 30 }}>✓ CON CONTENIDO</div>
          {['Llegan con contexto', 'Conversación templada', 'Autoridad establecida', 'Ciclo acelerado'].map((t, i) => (
            <div key={i} style={{ fontSize: 26, color: white, marginBottom: 20, lineHeight: 1.3 }}>{t}</div>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: 40,
        fontSize: 28,
        color: gray400,
        fontStyle: 'italic',
        textAlign: 'center',
      }}>
        El contenido cualifica <span style={{ color: white }}>antes</span> de que hables con nadie.
      </div>
    </div>
  </SlideBase>
);

export const Slide4 = () => (
  <SlideBase slideNumber={4} totalSlides={TOTAL}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '70px 80px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 50 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: `linear-gradient(135deg, ${purple}, ${cyan})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32, fontWeight: 900, color: white,
        }}>3</div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, color: cyan, letterSpacing: 4, textTransform: 'uppercase' }}>CAPA 3</div>
          <div style={{ fontSize: 52, fontWeight: 900, color: white, lineHeight: 1 }}>Outbound Multicanal</div>
        </div>
      </div>
      <div style={{
        width: 80, height: 3,
        background: `linear-gradient(90deg, ${purple}, ${cyan})`,
        marginBottom: 50, borderRadius: 2,
      }} />

      {/* Sequence timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
        {[
          { day: 'Día 1', channel: 'Email personalizado', note: 'Con trigger específico' },
          { day: 'Día 3', channel: 'LinkedIn', note: 'Connection + nota contextual' },
          { day: 'Día 6', channel: 'Llamada corta', note: '30 seg, sin pitch' },
          { day: 'Día 9', channel: 'Email 2', note: 'Caso de éxito relevante' },
          { day: 'Día 12', channel: 'LinkedIn DM', note: 'Mensaje directo' },
        ].map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{
              width: 90, fontSize: 18, fontWeight: 700, color: cyan, textAlign: 'right', flexShrink: 0,
            }}>{step.day}</div>
            <div style={{ width: 2, height: 40, background: 'rgba(34,211,238,0.3)', flexShrink: 0 }} />
            <div style={{
              flex: 1,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              padding: '16px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: 26, fontWeight: 700, color: white }}>{step.channel}</span>
              <span style={{ fontSize: 20, color: gray400 }}>{step.note}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 30,
        background: 'rgba(139,92,246,0.07)',
        border: `1px solid rgba(139,92,246,0.25)`,
        borderRadius: 12,
        padding: '20px 36px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 52, fontWeight: 900, color: purple }}>8-12%</div>
          <div style={{ fontSize: 20, color: gray400 }}>Multicanal personalizado</div>
        </div>
        <div style={{ width: 1, height: 60, background: 'rgba(139,92,246,0.3)' }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 52, fontWeight: 900, color: gray600 }}>1-2%</div>
          <div style={{ fontSize: 20, color: gray400 }}>Masivo genérico</div>
        </div>
      </div>
    </div>
  </SlideBase>
);

export const Slide5Real = () => (
  <SlideBase slideNumber={5} totalSlides={TOTAL}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '70px 80px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 50 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: `linear-gradient(135deg, ${purple}, ${cyan})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32, fontWeight: 900, color: white,
        }}>4</div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, color: cyan, letterSpacing: 4, textTransform: 'uppercase' }}>CAPA 4</div>
          <div style={{ fontSize: 52, fontWeight: 900, color: white, lineHeight: 1 }}>Cualificación</div>
        </div>
      </div>
      <div style={{
        width: 80, height: 3,
        background: `linear-gradient(90deg, ${purple}, ${cyan})`,
        marginBottom: 50, borderRadius: 2,
      }} />

      <div style={{ fontSize: 28, color: gray400, marginBottom: 50, fontWeight: 400 }}>
        Una reunión con alguien que no puede comprar no es una oportunidad. Es tiempo perdido.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, flex: 1 }}>
        {[
          { label: 'BUDGET', q: '¿Tiene presupuesto real?' },
          { label: 'AUTHORITY', q: '¿Decide o influye?' },
          { label: 'NEED', q: '¿Tiene el problema?' },
          { label: 'TIMING', q: '¿Lo reconoce como urgente?' },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'rgba(139,92,246,0.06)',
            border: `1px solid rgba(139,92,246,0.2)`,
            borderRadius: 12,
            padding: '36px 30px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: purpleLight, letterSpacing: 4 }}>{item.label}</div>
            <div style={{ fontSize: 30, fontWeight: 600, color: white, lineHeight: 1.3 }}>{item.q}</div>
          </div>
        ))}
      </div>
    </div>
  </SlideBase>
);

export const Slide6 = () => (
  <SlideBase slideNumber={6} totalSlides={TOTAL}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '70px 80px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 50 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: `linear-gradient(135deg, ${purple}, ${cyan})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32, fontWeight: 900, color: white,
        }}>5</div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, color: cyan, letterSpacing: 4, textTransform: 'uppercase' }}>CAPA 5</div>
          <div style={{ fontSize: 52, fontWeight: 900, color: white, lineHeight: 1 }}>Datos y Optimización</div>
        </div>
      </div>
      <div style={{
        width: 80, height: 3,
        background: `linear-gradient(90deg, ${purple}, ${cyan})`,
        marginBottom: 50, borderRadius: 2,
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
        {[
          { metric: 'CPR', withSystem: '€75–150', withoutSystem: '€300–500', label: 'Coste por Reunión' },
          { metric: 'RESPUESTA', withSystem: '8–12%', withoutSystem: '1–2%', label: 'Tasa de respuesta' },
          { metric: 'CICLO', withSystem: '38 días', withoutSystem: '90+ días', label: 'Ciclo de venta' },
        ].map((row, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            overflow: 'hidden',
          }}>
            <div style={{ width: 150, padding: '24px 20px', background: 'rgba(139,92,246,0.1)', textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: purpleLight, letterSpacing: 2 }}>{row.metric}</div>
              <div style={{ fontSize: 14, color: gray400, marginTop: 4 }}>{row.label}</div>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'space-around', padding: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 40, fontWeight: 900, color: cyan }}>{row.withSystem}</div>
                <div style={{ fontSize: 16, color: gray400, marginTop: 4 }}>Con sistema</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 40, fontWeight: 900, color: gray600 }}>{row.withoutSystem}</div>
                <div style={{ fontSize: 16, color: gray400, marginTop: 4 }}>Sin sistema</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </SlideBase>
);

export const Slide7 = () => {
  const layers = [
    { num: 5, label: 'Datos y Optimización', width: '100%' },
    { num: 4, label: 'Cualificación', width: '88%' },
    { num: 3, label: 'Outbound Multicanal', width: '76%' },
    { num: 2, label: 'Contenido y Posicionamiento', width: '88%' },
    { num: 1, label: 'ICP y Targeting', width: '100%', highlight: true },
  ];

  return (
    <SlideBase slideNumber={7} totalSlides={TOTAL}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '70px 80px 40px', justifyContent: 'center' }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: cyan, letterSpacing: 4, textAlign: 'center', marginBottom: 16 }}>LAS 5 CAPAS</div>
        <div style={{ fontSize: 54, fontWeight: 900, color: white, textAlign: 'center', marginBottom: 60 }}>El orden no es opcional</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          {layers.map((layer, i) => (
            <div key={i} style={{
              width: layer.width,
              background: layer.highlight
                ? `linear-gradient(90deg, rgba(139,92,246,0.2), rgba(34,211,238,0.1))`
                : 'rgba(255,255,255,0.04)',
              border: layer.highlight
                ? `2px solid ${purple}`
                : '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              padding: '24px 40px',
              display: 'flex',
              alignItems: 'center',
              gap: 24,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: layer.highlight
                  ? `linear-gradient(135deg, ${purple}, ${cyan})`
                  : 'rgba(139,92,246,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, fontWeight: 900,
                color: white,
                flexShrink: 0,
              }}>{layer.num}</div>
              <div style={{
                fontSize: 30, fontWeight: 700,
                color: layer.highlight ? purpleLight : white,
              }}>{layer.label}</div>
              {layer.highlight && (
                <div style={{ marginLeft: 'auto', fontSize: 18, color: cyan, fontWeight: 600 }}>← EMPIEZA AQUÍ</div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 50, fontSize: 26, color: gray400, textAlign: 'center' }}>
          Sin capa 1, todo lo demás falla. <span style={{ color: white }}>¿Cuántas tienes?</span>
        </div>
      </div>
    </SlideBase>
  );
};

export const Slide8 = () => (
  <SlideBase slideNumber={8} totalSlides={TOTAL} hideFooter>
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      padding: '80px',
      textAlign: 'center',
      background: `radial-gradient(ellipse at center, rgba(139,92,246,0.1) 0%, transparent 70%)`,
    }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: cyan, letterSpacing: 5, marginBottom: 40 }}>
        DIAGNÓSTICO GRATUITO
      </div>

      <div style={{ fontSize: 72, fontWeight: 900, color: white, lineHeight: 1.1, marginBottom: 40, maxWidth: 840 }}>
        ¿Tienes las 5 capas o solo{' '}
        <span style={{ color: purple }}>herramientas sueltas</span>?
      </div>

      <div style={{ fontSize: 30, color: gray400, marginBottom: 80, maxWidth: 700 }}>
        Te ayudamos a instalarlas en 8 semanas.
        Sin depender de contactos o rachas buenas.
      </div>

      {/* CTA button */}
      <div style={{
        background: `linear-gradient(135deg, ${purple}, ${cyan})`,
        color: white,
        fontSize: 28,
        fontWeight: 800,
        padding: '24px 60px',
        borderRadius: 8,
        letterSpacing: 2,
        marginBottom: 40,
      }}>
        🔗 ENLACE EN BIO
      </div>

      <div style={{ fontSize: 22, color: gray400 }}>
        globalgrowth.consulting/agendar
      </div>

      {/* Footer branding */}
      <div style={{
        position: 'absolute',
        bottom: 50,
        display: 'flex',
        alignItems: 'center',
        gap: 30,
      }}>
        <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: 3, color: white, opacity: 0.9 }}>GLOBAL GROWTH CONSULTING</span>
        <span style={{ color: gray600 }}>·</span>
        <span style={{ fontSize: 22, color: cyan }}>@sir.fortuna</span>
      </div>
    </div>
  </SlideBase>
);
