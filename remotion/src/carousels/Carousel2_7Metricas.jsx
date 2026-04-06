import React from 'react';
import { theme } from '../theme.js';
import { SlideBase } from '../components/SlideBase.jsx';

const TOTAL = 8;
const { purple, purpleLight, cyan, pink, white, gray400, gray600 } = theme.colors;

const accentBox = (color = purple) => ({
  background: `rgba(${color === cyan ? '34,211,238' : '139,92,246'},0.08)`,
  border: `1px solid rgba(${color === cyan ? '34,211,238' : '139,92,246'},0.25)`,
  borderRadius: 12,
  padding: '24px 32px',
});

export const M2Slide1 = () => (
  <SlideBase slideNumber={1} totalSlides={TOTAL}>
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      padding: '80px 80px 40px', textAlign: 'center',
    }}>
      {/* Big watermark */}
      <div style={{
        fontSize: 260, fontWeight: 900, color: purple, lineHeight: 1,
        letterSpacing: -8, opacity: 0.08, position: 'absolute', bottom: 100, right: 30,
      }}>7</div>

      {/* Tag */}
      <div style={{
        fontSize: 18, fontWeight: 700, letterSpacing: 5, color: cyan,
        textTransform: 'uppercase', marginBottom: 40,
        background: 'rgba(34,211,238,0.08)', padding: '8px 24px',
        borderRadius: 4, border: '1px solid rgba(34,211,238,0.25)',
      }}>
        Métricas Comerciales B2B
      </div>

      {/* Headline */}
      <div style={{
        fontSize: 68, fontWeight: 900, lineHeight: 1.1,
        color: white, marginBottom: 40, maxWidth: 840,
      }}>
        <span style={{ color: purple }}>"¿Cuántos emails</span>
        <br />enviaste este mes?"
      </div>

      <div style={{
        fontSize: 32, fontWeight: 400, color: gray400, lineHeight: 1.5, maxWidth: 720,
      }}>
        Eso <span style={{ color: white, fontWeight: 700 }}>no</span> es una métrica comercial.
        Es una métrica de actividad.
        <br /><br />
        Las <span style={{ color: purpleLight, fontWeight: 700 }}>7 métricas que sí predicen</span> si vas a cerrar el trimestre.
      </div>

      <div style={{
        position: 'absolute', bottom: 100, left: '50%', transform: 'translateX(-50%)',
        fontSize: 22, fontWeight: 600, color: gray400,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        Desliza
        <span style={{ color: cyan }}>→</span>
      </div>
    </div>
  </SlideBase>
);

const MetricSlide = ({ num, title, content }) => (
  <SlideBase slideNumber={num + 1} totalSlides={TOTAL}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '70px 80px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 50 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: `linear-gradient(135deg, ${purple}, ${cyan})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32, fontWeight: 900, color: white, flexShrink: 0,
        }}>{num}</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: cyan, letterSpacing: 4, textTransform: 'uppercase' }}>MÉTRICA {num}</div>
          <div style={{ fontSize: 46, fontWeight: 900, color: white, lineHeight: 1.1 }}>{title}</div>
        </div>
      </div>
      <div style={{
        width: 80, height: 3,
        background: `linear-gradient(90deg, ${purple}, ${cyan})`,
        marginBottom: 50, borderRadius: 2,
      }} />
      {content}
    </div>
  </SlideBase>
);

export const M2Slide2 = () => (
  <MetricSlide num={1} title="Coste por Reunión (CPR)">
    {/* Formula */}
    <div style={{
      ...accentBox(),
      marginBottom: 40, textAlign: 'center',
    }}>
      <div style={{ fontSize: 26, color: gray400, marginBottom: 16 }}>Gasto comercial total del mes</div>
      <div style={{ width: '80%', height: 2, background: purpleLight, margin: '0 auto 16px' }} />
      <div style={{ fontSize: 26, color: white, fontWeight: 700, marginBottom: 16 }}>Reuniones cualificadas generadas</div>
      <div style={{ fontSize: 20, color: cyan, letterSpacing: 2, marginTop: 8 }}>= CPR</div>
    </div>

    {/* Benchmarks */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
      <div style={{ background: 'rgba(139,92,246,0.1)', border: `1px solid rgba(139,92,246,0.3)`, borderRadius: 12, padding: '28px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: cyan, letterSpacing: 3, marginBottom: 16 }}>✓ CON SISTEMA</div>
        <div style={{ fontSize: 56, fontWeight: 900, color: purpleLight }}>€75–150</div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '28px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#EF4444', letterSpacing: 3, marginBottom: 16 }}>❌ SIN SISTEMA</div>
        <div style={{ fontSize: 56, fontWeight: 900, color: gray600 }}>€300–500</div>
      </div>
    </div>

    <div style={{ fontSize: 28, color: gray400, fontStyle: 'italic', textAlign: 'center' }}>
      20 reuniones/mes → diferencia de{' '}
      <span style={{ color: white, fontWeight: 700 }}>72.000€/año</span>.
      <br />Eso es el salario completo de un comercial.
    </div>
  </MetricSlide>
);

export const M2Slide3 = () => (
  <MetricSlide num={2} title="Conversión Outreach → Reunión">
    {/* Bars */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, flex: 1, justifyContent: 'center' }}>
      {[
        { label: 'Multicanal personalizado', pct: 10, value: '8-12%', color: purple },
        { label: 'Masivo genérico', pct: 1.5, value: '1-2%', color: gray600 },
      ].map((row, i) => (
        <div key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 26, fontWeight: 600, color: white }}>{row.label}</span>
            <span style={{ fontSize: 36, fontWeight: 900, color: row.color }}>{row.value}</span>
          </div>
          <div style={{ height: 24, background: 'rgba(255,255,255,0.06)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${(row.pct / 12) * 100}%`,
              background: row.color === purple
                ? `linear-gradient(90deg, ${purple}, ${cyan})`
                : gray600,
              borderRadius: 12,
            }} />
          </div>
        </div>
      ))}
    </div>

    <div style={{
      marginTop: 50,
      ...accentBox(),
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 30, fontWeight: 700, color: purpleLight }}>
        Del 2% al 10% = <span style={{ color: white }}>5x más reuniones</span>
      </div>
      <div style={{ fontSize: 22, color: gray400, marginTop: 12 }}>con el mismo volumen de contactos</div>
    </div>
  </MetricSlide>
);

export const M2Slide4 = () => (
  <MetricSlide num={3} title="Velocidad de Pipeline">
    {/* Timeline */}
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16, padding: '0 20px' }}>
        {['Lead', 'Reunión', 'Propuesta', 'Negoc.', 'Cierre'].map((step, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: i === 4
                ? `linear-gradient(135deg, ${purple}, ${cyan})`
                : 'rgba(139,92,246,0.15)',
              border: `2px solid rgba(139,92,246,0.4)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 900, color: white, margin: '0 auto 12px',
            }}>{i + 1}</div>
            <div style={{ fontSize: 20, color: i === 4 ? purpleLight : gray400, fontWeight: 600 }}>{step}</div>
          </div>
        ))}
      </div>
      <div style={{ height: 4, background: `linear-gradient(90deg, ${purple}, ${cyan})`, borderRadius: 2, margin: '8px 48px 32px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '0 20px' }}>
        {['Día 1', 'Día 3', 'Día 10', 'Día 21', 'Día 38'].map((d, i) => (
          <div key={i} style={{ fontSize: 20, color: i === 4 ? cyan : gray400, fontWeight: i === 4 ? 700 : 400, textAlign: 'center' }}>{d}</div>
        ))}
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 40 }}>
      <div style={{ ...accentBox(), textAlign: 'center' }}>
        <div style={{ fontSize: 18, color: cyan, fontWeight: 700, marginBottom: 8, letterSpacing: 2 }}>CICLO GGC</div>
        <div style={{ fontSize: 64, fontWeight: 900, color: purpleLight }}>38d</div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 18, color: gray400, fontWeight: 700, marginBottom: 8, letterSpacing: 2 }}>MEDIA SECTOR</div>
        <div style={{ fontSize: 64, fontWeight: 900, color: gray600 }}>90+d</div>
      </div>
    </div>
  </MetricSlide>
);

export const M2Slide5 = () => (
  <MetricSlide num={4} title="El Embudo Real">
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      {[
        { label: '100 contactados', pct: '100%', color: purple },
        { label: '10 reuniones (10%)', pct: '65%', color: purpleLight },
        { label: '6 propuestas (60%)', pct: '44%', color: cyan },
        { label: '2-3 cierres (40%)', pct: '28%', color: pink },
      ].map((step, i) => (
        <div key={i} style={{
          width: step.pct,
          background: `rgba(${step.color === purple ? '139,92,246' : step.color === purpleLight ? '167,139,250' : step.color === cyan ? '34,211,238' : '236,72,153'},0.12)`,
          border: `1px solid rgba(${step.color === purple ? '139,92,246' : step.color === purpleLight ? '167,139,250' : step.color === cyan ? '34,211,238' : '236,72,153'},0.35)`,
          borderRadius: 10,
          padding: '20px 32px',
          textAlign: 'center',
          transition: 'all 0.3s',
        }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: step.color }}>{step.label}</span>
        </div>
      ))}
    </div>
    <div style={{ fontSize: 26, color: gray400, textAlign: 'center', marginTop: 32, fontStyle: 'italic' }}>
      Si no mides cada salto, <span style={{ color: white }}>no sabes dónde se rompe</span> tu embudo.
    </div>
  </MetricSlide>
);

export const M2Slide6 = () => (
  <MetricSlide num={6} title="LTV y CAC — el ratio">
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}>
      {[
        { ratio: 'LTV / CAC > 3', label: 'Negocio sano', good: true },
        { ratio: 'LTV / CAC < 1', label: 'Estás perdiendo dinero en cada cliente', good: false },
      ].map((row, i) => (
        <div key={i} style={{
          background: row.good ? 'rgba(139,92,246,0.08)' : 'rgba(255,255,255,0.03)',
          border: row.good ? `1px solid rgba(139,92,246,0.3)` : '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          padding: '32px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: 32,
        }}>
          <div style={{ fontSize: 42, fontWeight: 900, color: row.good ? purpleLight : gray600, flexShrink: 0 }}>{row.ratio}</div>
          <div style={{ width: 2, height: 50, background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />
          <div style={{ fontSize: 28, color: row.good ? white : gray400, fontWeight: 600 }}>{row.label}</div>
        </div>
      ))}

      <div style={{
        background: 'rgba(34,211,238,0.06)',
        border: '1px solid rgba(34,211,238,0.2)',
        borderRadius: 12,
        padding: '24px 32px',
        fontSize: 26,
        color: gray400,
        fontStyle: 'italic',
        textAlign: 'center',
      }}>
        Muchos equipos optimizan el CAC pero nunca miran el LTV.
        <br />
        <span style={{ color: white }}>Es como ir de dieta sin subirse a la báscula.</span>
      </div>
    </div>
  </MetricSlide>
);

export const M2Slide7 = () => (
  <SlideBase slideNumber={7} totalSlides={TOTAL}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '60px 80px 40px' }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: cyan, letterSpacing: 4, textAlign: 'center', marginBottom: 12 }}>DASHBOARD COMERCIAL B2B</div>
      <div style={{ fontSize: 50, fontWeight: 900, color: white, textAlign: 'center', marginBottom: 40 }}>Tus 7 métricas</div>
      <div style={{
        width: 80, height: 3,
        background: `linear-gradient(90deg, ${purple}, ${cyan})`,
        margin: '0 auto 40px', borderRadius: 2,
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
        {[
          { n: 1, m: 'CPR (Coste por Reunión)' },
          { n: 2, m: 'Conversión Outreach → Reunión' },
          { n: 3, m: 'Velocidad de Pipeline' },
          { n: 4, m: 'Reunión → Propuesta' },
          { n: 5, m: 'Propuesta → Cierre' },
          { n: 6, m: 'LTV (Lifetime Value)' },
          { n: 7, m: 'CAC (Coste de Adquisición)' },
        ].map((row, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 10,
            padding: '18px 28px',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(139,92,246,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 900, color: purpleLight, flexShrink: 0,
            }}>{row.n}</div>
            <div style={{ fontSize: 26, color: white, flex: 1 }}>{row.m}</div>
            <div style={{ width: 24, height: 24, border: `2px solid rgba(139,92,246,0.4)`, borderRadius: 4, flexShrink: 0 }} />
          </div>
        ))}
      </div>

      <div style={{ fontSize: 24, color: gray400, textAlign: 'center', marginTop: 30, fontStyle: 'italic' }}>
        Si marcas menos de 5, <span style={{ color: white }}>estás volando a ciegas</span>.
      </div>
    </div>
  </SlideBase>
);

export const M2Slide8 = () => (
  <SlideBase slideNumber={8} totalSlides={TOTAL} hideFooter>
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      padding: '80px', textAlign: 'center',
      background: `radial-gradient(ellipse at center, rgba(139,92,246,0.1) 0%, transparent 70%)`,
    }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: cyan, letterSpacing: 5, marginBottom: 40 }}>
        DIAGNÓSTICO GRATUITO
      </div>
      <div style={{ fontSize: 68, fontWeight: 900, color: white, lineHeight: 1.1, marginBottom: 40, maxWidth: 840 }}>
        Deja de medir <span style={{ color: purple }}>actividad</span>.
        <br />Mide <span style={{ color: cyan }}>resultados</span>.
      </div>
      <div style={{ fontSize: 28, color: gray400, marginBottom: 80, maxWidth: 700, lineHeight: 1.5 }}>
        Te mostramos cómo instalar el dashboard comercial B2B
        que usamos en 627+ empresas.
      </div>
      <div style={{
        background: `linear-gradient(135deg, ${purple}, ${cyan})`,
        color: white, fontSize: 28, fontWeight: 800,
        padding: '24px 60px', borderRadius: 8, letterSpacing: 2, marginBottom: 40,
      }}>
        🔗 ENLACE EN BIO
      </div>
      <div style={{ fontSize: 22, color: gray400 }}>globalgrowth.consulting/agendar</div>
      <div style={{
        position: 'absolute', bottom: 50,
        display: 'flex', alignItems: 'center', gap: 30,
      }}>
        <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: 3, color: white, opacity: 0.9 }}>GLOBAL GROWTH CONSULTING</span>
        <span style={{ color: gray600 }}>·</span>
        <span style={{ fontSize: 22, color: cyan }}>@sir.fortuna</span>
      </div>
    </div>
  </SlideBase>
);
