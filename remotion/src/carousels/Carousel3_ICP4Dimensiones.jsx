import React from 'react';
import { theme } from '../theme.js';
import { SlideBase } from '../components/SlideBase.jsx';

const TOTAL = 8;
const { purple, purpleLight, cyan, pink, white, gray400, gray600 } = theme.colors;

export const I3Slide1 = () => (
  <SlideBase slideNumber={1} totalSlides={TOTAL}>
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      padding: '80px 80px 40px', textAlign: 'center',
    }}>
      {/* Big watermark */}
      <div style={{
        fontSize: 200, fontWeight: 900, color: cyan, lineHeight: 1,
        opacity: 0.07, position: 'absolute', bottom: 90, right: 20,
      }}>4D</div>

      {/* Tag */}
      <div style={{
        fontSize: 18, fontWeight: 700, letterSpacing: 5, color: cyan,
        textTransform: 'uppercase', marginBottom: 40,
        background: 'rgba(34,211,238,0.08)', padding: '8px 24px',
        borderRadius: 4, border: '1px solid rgba(34,211,238,0.25)',
      }}>
        ICP Avanzado B2B
      </div>

      {/* Headline */}
      <div style={{
        fontSize: 64, fontWeight: 900, lineHeight: 1.1,
        color: white, marginBottom: 40, maxWidth: 840,
      }}>
        De <span style={{ color: purple }}>10.000 contactos</span> genéricos
        <br />a <span style={{ color: cyan }}>380 cuentas</span> con nombre y apellidos.
      </div>

      {/* Big stat */}
      <div style={{
        fontSize: 120, fontWeight: 900, color: purpleLight,
        lineHeight: 1, marginBottom: 16,
      }}>9.2%</div>
      <div style={{ fontSize: 26, color: gray400, maxWidth: 600, lineHeight: 1.5 }}>
        de respuesta en el primer mes.
        <br />La diferencia no fue el copy. Fue la profundidad del ICP.
      </div>

      <div style={{
        position: 'absolute', bottom: 100, left: '50%', transform: 'translateX(-50%)',
        fontSize: 22, fontWeight: 600, color: gray400,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        Las 4 dimensiones <span style={{ color: cyan }}>→</span>
      </div>
    </div>
  </SlideBase>
);

export const I3Slide2 = () => (
  <SlideBase slideNumber={2} totalSlides={TOTAL}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '70px 80px 40px' }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: '#EF4444', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 20 }}>EL ERROR COMÚN</div>
      <div style={{ fontSize: 50, fontWeight: 900, color: white, marginBottom: 50, lineHeight: 1.2 }}>El ICP que usa el 90%<br />de empresas B2B:</div>

      {/* Wrong ICP box */}
      <div style={{
        background: 'rgba(239,68,68,0.06)',
        border: '1px solid rgba(239,68,68,0.25)',
        borderRadius: 16,
        padding: '32px 40px',
        marginBottom: 40,
        fontFamily: 'monospace',
      }}>
        <div style={{ fontSize: 26, color: gray400, marginBottom: 12 }}>Sector: Agencias de marketing</div>
        <div style={{ fontSize: 26, color: gray400 }}>Tamaño: 20-100 empleados</div>
      </div>

      <div style={{ fontSize: 30, fontWeight: 700, color: white, marginBottom: 32 }}>
        Esto es un filtro. <span style={{ color: '#EF4444' }}>No es un ICP.</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: 1 }}>
        {[
          '50.000 empresas que "podrían" encajar',
          'El 98% no está lista para comprarte ahora mismo',
          'Listas enormes, respuestas escasas',
        ].map((txt, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <span style={{ fontSize: 24, color: '#EF4444', flexShrink: 0, marginTop: 2 }}>❌</span>
            <span style={{ fontSize: 28, color: gray400 }}>{txt}</span>
          </div>
        ))}
      </div>
    </div>
  </SlideBase>
);

const DimSlide = ({ num, title, slideNum, children }) => (
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
          <div style={{ fontSize: 16, fontWeight: 700, color: cyan, letterSpacing: 4, textTransform: 'uppercase' }}>DIMENSIÓN {num}</div>
          <div style={{ fontSize: 56, fontWeight: 900, color: white, lineHeight: 1 }}>{title}</div>
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

export const I3Slide3 = () => (
  <DimSlide num={1} title="Firmográfico" slideNum={3}>
    <div style={{ fontSize: 24, color: gray400, marginBottom: 32 }}>El filtro de entrada — elimina al 80% de tu lista</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
      {['Sector específico', 'Tamaño (facturación o empleados)', 'Geografía', 'Modelo de negocio'].map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(139,92,246,0.15)', border: `1px solid rgba(139,92,246,0.35)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700, color: purpleLight, flexShrink: 0,
          }}>{i + 1}</div>
          <span style={{ fontSize: 28, color: white }}>{item}</span>
        </div>
      ))}
    </div>
    <div style={{
      background: 'rgba(139,92,246,0.08)',
      border: '1px solid rgba(139,92,246,0.25)',
      borderRadius: 12,
      padding: '24px 32px',
      fontSize: 24,
      color: gray400,
      fontStyle: 'italic',
    }}>
      Ejemplo real: "Agencias de marketing B2B entre 15 y 80 empleados,{' '}
      <span style={{ color: white }}>con sede en España, que venden a empresas de +50M€"</span>
    </div>
  </DimSlide>
);

export const I3Slide4 = () => (
  <DimSlide num={2} title="Tecnográfico" slideNum={4}>
    <div style={{ fontSize: 24, color: gray400, marginBottom: 32 }}>
      El stack tecnológico dice más sobre sus problemas que cualquier descripción de sector.
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
      {[
        { signal: 'HubSpot activo sin automatizaciones', pain: 'Proceso manual → dolor real' },
        { signal: 'LinkedIn SN sin secuencias', pain: 'Outreach ineficiente' },
        { signal: 'Notion sin CRM real', pain: 'Caos de datos' },
      ].map((row, i) => (
        <div key={i} style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12,
          padding: '20px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}>
          <div style={{ flex: 1, fontSize: 24, color: white, fontWeight: 600 }}>{row.signal}</div>
          <span style={{ color: cyan, fontSize: 20 }}>→</span>
          <div style={{ flex: 1, fontSize: 22, color: cyan, fontStyle: 'italic' }}>{row.pain}</div>
        </div>
      ))}
    </div>
    <div style={{ fontSize: 26, color: gray400, marginTop: 32, textAlign: 'center', fontStyle: 'italic' }}>
      Cada herramienta que tienen (o que les falta) es una señal.
    </div>
  </DimSlide>
);

export const I3Slide5 = () => (
  <DimSlide num={3} title="Comportamental" slideNum={5}>
    <div style={{ fontSize: 24, color: gray400, marginBottom: 32 }}>Preguntas que debes poder responder:</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: 1 }}>
      {[
        '¿Quién decide la compra?',
        '¿Cuánto dura su ciclo de venta típico?',
        '¿Qué objeciones aparecen siempre?',
        '¿Cómo compran — comité, top-down, bottom-up?',
      ].map((q, i) => (
        <div key={i} style={{
          background: 'rgba(139,92,246,0.07)',
          border: '1px solid rgba(139,92,246,0.2)',
          borderRadius: 10,
          padding: '20px 28px',
          fontSize: 26, color: white, fontWeight: 500,
        }}>
          {q}
        </div>
      ))}
    </div>
    <div style={{
      marginTop: 32, background: 'rgba(34,211,238,0.06)',
      border: '1px solid rgba(34,211,238,0.2)', borderRadius: 12,
      padding: '20px 28px', fontSize: 24, color: gray400, textAlign: 'center', fontStyle: 'italic',
    }}>
      Si no sabes a quién hablas realmente,{' '}
      <span style={{ color: white }}>hablas con todos y no convences a ninguno</span>.
    </div>
  </DimSlide>
);

export const I3Slide6 = () => (
  <DimSlide num={4} title="Señales de Timing" slideNum={6}>
    <div style={{ fontSize: 24, color: gray400, marginBottom: 32 }}>
      La misma empresa puede ser perfecta hoy y equivocada en 6 meses. Las señales te dicen cuándo actuar.
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: 1 }}>
      {[
        { icon: '📢', text: 'Abrieron una nueva línea de servicios' },
        { icon: '👤', text: 'Contrataron un director comercial' },
        { icon: '💰', text: 'Anunciaron una ronda de financiación' },
        { icon: '🌍', text: 'Expansión a nuevo mercado o geografía' },
        { icon: '🔄', text: 'Cambio de liderazgo (nuevo CEO/CSO)' },
      ].map((row, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 24,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 10, padding: '16px 24px',
        }}>
          <span style={{ fontSize: 30 }}>{row.icon}</span>
          <span style={{ fontSize: 26, color: white }}>{row.text}</span>
        </div>
      ))}
    </div>
  </DimSlide>
);

export const I3Slide7 = () => (
  <SlideBase slideNumber={7} totalSlides={TOTAL}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '60px 80px 40px' }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: cyan, letterSpacing: 4, textAlign: 'center', marginBottom: 12 }}>RESULTADO</div>
      <div style={{ fontSize: 50, fontWeight: 900, color: white, textAlign: 'center', marginBottom: 40 }}>Con las 4 dimensiones</div>
      <div style={{
        width: 80, height: 3,
        background: `linear-gradient(90deg, ${purple}, ${cyan})`,
        margin: '0 auto 40px', borderRadius: 2,
      }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, flex: 1 }}>
        {[
          { before: '10.000 contactos', after: '380 cuentas', label: 'Lista' },
          { before: 'Tasa respuesta 1-2%', after: 'Tasa respuesta 9.2%', label: 'Respuesta' },
          { before: 'CPR €300-500', after: 'CPR €75-150', label: 'Coste/Reunión' },
          { before: 'Mensaje genérico', after: 'Mensaje específico', label: 'Copy' },
          { before: 'Outreach a ciegas', after: 'Timing perfecto', label: 'Timing' },
        ].map((row, i) => (
          <div key={i} style={{
            background: i % 2 === 0 ? 'rgba(139,92,246,0.06)' : 'rgba(34,211,238,0.04)',
            border: `1px solid rgba(${i % 2 === 0 ? '139,92,246' : '34,211,238'},0.2)`,
            borderRadius: 12, padding: '20px 24px',
            gridColumn: i === 4 ? '1 / -1' : 'auto',
          }}>
            <div style={{ fontSize: 14, color: gray400, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>{row.label}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20, color: gray600, textDecoration: 'line-through' }}>{row.before}</span>
              <span style={{ color: cyan }}>→</span>
              <span style={{ fontSize: 20, fontWeight: 700, color: purpleLight }}>{row.after}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 30, textAlign: 'center',
        fontSize: 48, fontWeight: 900, color: purple,
      }}>
        3x más conversión
      </div>
    </div>
  </SlideBase>
);

export const I3Slide8 = () => (
  <SlideBase slideNumber={8} totalSlides={TOTAL} hideFooter>
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      padding: '80px', textAlign: 'center',
      background: `radial-gradient(ellipse at center, rgba(139,92,246,0.1) 0%, transparent 70%)`,
    }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: cyan, letterSpacing: 5, marginBottom: 40 }}>
        DIAGNÓSTICO ICP GRATUITO
      </div>
      <div style={{ fontSize: 64, fontWeight: 900, color: white, lineHeight: 1.1, marginBottom: 40, maxWidth: 840 }}>
        Tu ICP tiene <span style={{ color: purple }}>2 dimensiones</span>.
        <br />El de tus competidores
        <br />que están ganando, <span style={{ color: cyan }}>4</span>.
      </div>
      <div style={{ fontSize: 28, color: gray400, marginBottom: 80, maxWidth: 700, lineHeight: 1.5 }}>
        Te ayudamos a construir tu ICP en 4 dimensiones y la lista de 300-500 cuentas de alto valor.
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
