import React from 'react';
import { theme } from '../theme.js';
import { SlideBase } from '../components/SlideBase.jsx';

const TOTAL = 8;
const { purple, purpleLight, cyan, pink, white, gray400, gray600 } = theme.colors;

export const B4Slide1 = () => (
  <SlideBase slideNumber={1} totalSlides={TOTAL}>
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      padding: '80px 80px 40px', textAlign: 'center',
    }}>
      {/* Credibility tag */}
      <div style={{
        fontSize: 18, fontWeight: 700, letterSpacing: 4, color: cyan,
        textTransform: 'uppercase', marginBottom: 40,
        background: 'rgba(34,211,238,0.08)', padding: '8px 24px',
        borderRadius: 4, border: '1px solid rgba(34,211,238,0.25)',
      }}>
        627 empresas analizadas · España 2026
      </div>

      <div style={{ fontSize: 56, fontWeight: 900, color: white, lineHeight: 1.1, marginBottom: 40, maxWidth: 840 }}>
        Las tasas de respuesta en email frío han caído un{' '}
        <span style={{ color: '#EF4444' }}>60%</span> en 2 años.
      </div>

      <div style={{ fontSize: 28, color: gray400, lineHeight: 1.5, maxWidth: 720, marginBottom: 60 }}>
        Pero algunos equipos están consiguiendo un{' '}
        <span style={{ color: purpleLight, fontWeight: 700 }}>22.3% de respuesta multicanal</span>.
        <br /><br />
        Estos son los benchmarks reales del mercado B2B español en 2026.
      </div>

      <div style={{
        position: 'absolute', bottom: 100, left: '50%', transform: 'translateX(-50%)',
        fontSize: 22, fontWeight: 600, color: gray400,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        Datos reales <span style={{ color: cyan }}>→</span>
      </div>
    </div>
  </SlideBase>
);

export const B4Slide2 = () => (
  <SlideBase slideNumber={2} totalSlides={TOTAL}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '70px 80px 40px' }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: '#EF4444', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 20 }}>EL PROBLEMA</div>
      <div style={{ fontSize: 46, fontWeight: 900, color: white, marginBottom: 50, lineHeight: 1.2 }}>Los benchmarks que usas<br />son inútiles</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
        {[
          { n: 1, title: 'Miden empresas americanas', desc: 'ciclos y patrones distintos al mercado español' },
          { n: 2, title: 'Son datos de 2023', desc: 'el email frío ha caído un 60% en 2 años' },
          { n: 3, title: 'Miden la mediocridad promedio', desc: 'no te dicen dónde deberías estar tú' },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12, padding: '24px 32px',
            display: 'flex', gap: 20,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 900, color: '#EF4444', flexShrink: 0,
            }}>{item.n}</div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 700, color: white, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 22, color: gray400 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 24, color: gray400, marginTop: 32, fontStyle: 'italic', textAlign: 'center' }}>
        Los datos importan. Pero tienen que ser{' '}
        <span style={{ color: white }}>los datos correctos</span>.
      </div>
    </div>
  </SlideBase>
);

export const B4Slide3 = () => (
  <SlideBase slideNumber={3} totalSlides={TOTAL}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '70px 80px 40px' }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: cyan, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 20 }}>ANTES DE LOS NÚMEROS</div>
      <div style={{ fontSize: 50, fontWeight: 900, color: white, marginBottom: 50, lineHeight: 1.2 }}>¿Qué medir?</div>
      <div style={{
        width: 80, height: 3,
        background: `linear-gradient(90deg, ${purple}, ${cyan})`,
        marginBottom: 40, borderRadius: 2,
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
        {[
          { n: 1, title: 'Tasa de respuesta', desc: '% de contactados que responden (cualquier respuesta)' },
          { n: 2, title: 'Conversión a reunión', desc: 'De los que responden, cuántos generan reunión cualificada' },
          { n: 3, title: 'Reunión → Propuesta', desc: 'Cuántas reuniones generan oportunidad real' },
          { n: 4, title: 'CPR — Coste por Reunión', desc: '(tiempo + herramientas + salario) / reuniones generadas' },
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 20,
            background: 'rgba(139,92,246,0.06)',
            border: '1px solid rgba(139,92,246,0.2)',
            borderRadius: 10, padding: '20px 24px',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: `linear-gradient(135deg, ${purple}, ${cyan})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 900, color: white, flexShrink: 0,
            }}>{item.n}</div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 700, color: white }}>{item.title}</div>
              <div style={{ fontSize: 20, color: gray400 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 24, color: gray400, marginTop: 32, fontStyle: 'italic', textAlign: 'center' }}>
        Con métricas 1 y 4 ya sabes si tu sistema funciona.
      </div>
    </div>
  </SlideBase>
);

const ChannelBenchmarkSlide = ({ slideNum, channel, bars }) => (
  <SlideBase slideNumber={slideNum} totalSlides={TOTAL}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '70px 80px 40px' }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: cyan, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12 }}>BENCHMARKS ESPAÑA 2026</div>
      <div style={{ fontSize: 60, fontWeight: 900, color: white, marginBottom: 50, lineHeight: 1 }}>{channel}</div>
      <div style={{
        width: 80, height: 3,
        background: `linear-gradient(90deg, ${purple}, ${cyan})`,
        marginBottom: 50, borderRadius: 2,
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, flex: 1, justifyContent: 'center' }}>
        {bars.map((row, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 22, color: i === 0 ? white : gray400, fontWeight: i === 0 ? 700 : 400 }}>{row.label}</span>
              <span style={{ fontSize: 36, fontWeight: 900, color: i === 0 ? purpleLight : i === 1 ? cyan : gray600 }}>{row.value}</span>
            </div>
            <div style={{ height: 20, background: 'rgba(255,255,255,0.06)', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: row.pct,
                background: i === 0
                  ? `linear-gradient(90deg, ${purple}, ${cyan})`
                  : i === 1 ? cyan : gray600,
                borderRadius: 10,
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </SlideBase>
);

export const B4Slide4 = () => (
  <ChannelBenchmarkSlide
    slideNum={4}
    channel="Email Frío"
    bars={[
      { label: 'Top performers (sistema + personalización)', value: '12-18%', pct: '85%' },
      { label: 'Media del mercado', value: '3-5%', pct: '28%' },
      { label: 'Envíos masivos genéricos', value: '0.5-1%', pct: '6%' },
    ]}
  />
);

export const B4Slide5 = () => (
  <ChannelBenchmarkSlide
    slideNum={5}
    channel="LinkedIn"
    bars={[
      { label: 'InMail personalizado con trigger', value: '15-25%', pct: '90%' },
      { label: 'Connection request con nota', value: '8-12%', pct: '52%' },
      { label: 'InMail genérico masivo', value: '2-4%', pct: '18%' },
    ]}
  />
);

export const B4Slide6 = () => (
  <SlideBase slideNumber={6} totalSlides={TOTAL}>
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      padding: '70px 80px 40px', textAlign: 'center',
    }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: cyan, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 40 }}>
        OUTREACH MULTICANAL — EL BENCHMARK REAL
      </div>

      {/* Big number */}
      <div style={{
        fontSize: 180, fontWeight: 900,
        background: `linear-gradient(135deg, ${purple}, ${cyan})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: 1, marginBottom: 16,
      }}>22.3%</div>
      <div style={{ fontSize: 30, color: gray400, marginBottom: 60 }}>Tasa de respuesta top performers multicanal</div>

      {/* Comparativa */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: '100%' }}>
        <div style={{
          background: 'rgba(139,92,246,0.1)', border: `1px solid rgba(139,92,246,0.3)`,
          borderRadius: 16, padding: '32px 24px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: purpleLight, letterSpacing: 3, marginBottom: 12 }}>TOP PERFORMERS</div>
          <div style={{ fontSize: 56, fontWeight: 900, color: purpleLight }}>22.3%</div>
          <div style={{ fontSize: 18, color: gray400, marginTop: 8 }}>GGC clientes</div>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16, padding: '32px 24px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: gray400, letterSpacing: 3, marginBottom: 12 }}>MEDIA MERCADO</div>
          <div style={{ fontSize: 56, fontWeight: 900, color: gray600 }}>4-6%</div>
          <div style={{ fontSize: 18, color: gray400, marginTop: 8 }}>España B2B</div>
        </div>
      </div>

      <div style={{ fontSize: 24, color: gray400, marginTop: 40, fontStyle: 'italic' }}>
        La diferencia: secuencias con contexto real,{' '}
        <span style={{ color: white }}>no copiar-pegar en 3 canales</span>.
      </div>
    </div>
  </SlideBase>
);

export const B4Slide7 = () => (
  <SlideBase slideNumber={7} totalSlides={TOTAL}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '60px 80px 40px' }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: cyan, letterSpacing: 4, textAlign: 'center', marginBottom: 12 }}>LOS NÚMEROS QUE PREDICEN TU P&L</div>
      <div style={{ fontSize: 46, fontWeight: 900, color: white, textAlign: 'center', marginBottom: 40 }}>CPR y Ciclo de Venta</div>
      <div style={{
        width: 80, height: 3,
        background: `linear-gradient(90deg, ${purple}, ${cyan})`,
        margin: '0 auto 40px', borderRadius: 2,
      }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 40 }}>
        {[
          { label: 'CPR con sistema', value: '€75-150', sub: 'vs €300-500', color: purpleLight },
          { label: 'Ciclo GGC', value: '38 días', sub: '', color: cyan },
          { label: 'vs. Sector', value: '90+ días', sub: '', color: gray600 },
        ].map((item, i) => (
          <div key={i} style={{
            background: i < 2 ? 'rgba(139,92,246,0.08)' : 'rgba(255,255,255,0.03)',
            border: `1px solid rgba(${i < 2 ? '139,92,246' : '255,255,255'},${i < 2 ? '0.25' : '0.07'})`,
            borderRadius: 12, padding: '24px 20px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 15, color: gray400, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>{item.label}</div>
            <div style={{ fontSize: 40, fontWeight: 900, color: item.color }}>{item.value}</div>
            {item.sub && <div style={{ fontSize: 16, color: gray600, marginTop: 6 }}>{item.sub}</div>}
          </div>
        ))}
      </div>

      {/* Calculation */}
      <div style={{
        background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.2)',
        borderRadius: 16, padding: '28px 36px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 22, color: gray400 }}>20 reuniones/mes × CPR €400</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: gray600 }}>= 96.000€/año</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 22, color: white }}>20 reuniones/mes × CPR €120</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: purpleLight }}>= 28.800€/año</div>
        </div>
        <div style={{ height: 2, background: 'rgba(139,92,246,0.3)', marginBottom: 16 }} />
        <div style={{ fontSize: 28, fontWeight: 700, textAlign: 'center' }}>
          <span style={{ color: cyan }}>Diferencia: 67.200€/año</span>
          <span style={{ color: gray400, fontWeight: 400, fontSize: 22 }}> — suficiente para otro comercial</span>
        </div>
      </div>
    </div>
  </SlideBase>
);

export const B4Slide8 = () => (
  <SlideBase slideNumber={8} totalSlides={TOTAL} hideFooter>
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      padding: '80px', textAlign: 'center',
      background: `radial-gradient(ellipse at center, rgba(139,92,246,0.1) 0%, transparent 70%)`,
    }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: cyan, letterSpacing: 5, marginBottom: 40 }}>
        BENCHMARK GRATUITO
      </div>
      <div style={{ fontSize: 62, fontWeight: 900, color: white, lineHeight: 1.1, marginBottom: 40, maxWidth: 840 }}>
        ¿Dónde estás tú respecto a estos{' '}
        <span style={{ color: purple }}>benchmarks</span>?
      </div>
      <div style={{ fontSize: 26, color: gray400, marginBottom: 80, maxWidth: 700, lineHeight: 1.5 }}>
        Si tu CPR supera €200 o tu tasa de respuesta está por debajo del 5%,
        hay margen de mejora concreto. Te lo mostramos con datos de tu operación.
      </div>
      <div style={{
        background: `linear-gradient(135deg, ${purple}, ${cyan})`,
        color: white, fontSize: 28, fontWeight: 800,
        padding: '24px 60px', borderRadius: 8, letterSpacing: 2, marginBottom: 40,
      }}>
        🔗 ENLACE EN BIO
      </div>
      <div style={{ fontSize: 20, color: gray400 }}>627 empresas analizadas · globalgrowth.consulting</div>
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
