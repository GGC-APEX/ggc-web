import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';
import { theme } from '../theme.js';

const { purple, cyan, pink, white, gray400 } = theme.colors;
const BG = '#0C0A1D';

// Fade + slide-up
function AnimText({ frame, delay, children, style = {}, color = white, size = 52 }) {
  const progress = interpolate(frame, [delay, delay + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const y = interpolate(progress, [0, 1], [40, 0]);
  return (
    <div style={{
      opacity: progress,
      transform: `translateY(${y}px)`,
      color,
      fontSize: size,
      fontWeight: 900,
      lineHeight: 1.15,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      ...style,
    }}>
      {children}
    </div>
  );
}

// Progress bar
function ProgressBar({ frame, totalFrames }) {
  const pct = interpolate(frame, [0, totalFrames], [0, 100], { extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 6, background: 'rgba(255,255,255,0.08)' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${purple}, ${cyan}, ${pink})` }} />
    </div>
  );
}

// Phase card
function PhaseCard({ frame, delay, phase, title, lines, accent }) {
  const progress = interpolate(frame, [delay, delay + 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.2)),
  });
  return (
    <div style={{
      opacity: progress,
      transform: `translateY(${interpolate(progress, [0, 1], [50, 0])}px)`,
      background: `rgba(${accent === purple ? '139,92,246' : accent === cyan ? '34,211,238' : '236,72,153'},0.08)`,
      border: `1px solid rgba(${accent === purple ? '139,92,246' : accent === cyan ? '34,211,238' : '236,72,153'},0.25)`,
      borderRadius: 16,
      padding: '32px 40px',
      marginBottom: 24,
    }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: accent, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>
        {phase}
      </div>
      <div style={{ fontSize: 48, fontWeight: 900, color: white, marginBottom: 16 }}>{title}</div>
      {lines.map((line, i) => (
        <div key={i} style={{ fontSize: 34, fontWeight: 500, color: gray400, lineHeight: 1.6 }}>
          {line}
        </div>
      ))}
    </div>
  );
}

// Timeline:
// HOOK:   0-60   (2s)
// BEAT1:  60-210 (5s)
// BEAT2:  210-390 (6s)
// BEAT3:  390-600 (7s)
// CTA:    600-750 (5s)

export const Reel2_ProtocoloPrimerosMill = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const inHook  = frame < 60;
  const inBeat1 = frame >= 60  && frame < 210;
  const inBeat2 = frame >= 210 && frame < 390;
  const inBeat3 = frame >= 390 && frame < 600;
  const inCta   = frame >= 600;

  return (
    <div style={{
      width: 1080,
      height: 1920,
      background: BG,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <ProgressBar frame={frame} totalFrames={durationInFrames} />

      {/* GGC badge */}
      <div style={{
        position: 'absolute', top: 60, left: 60,
        fontSize: 22, fontWeight: 700, color: cyan, letterSpacing: 4,
        textTransform: 'uppercase', opacity: 0.8,
      }}>
        GGC
      </div>

      {/* ——— HOOK ——— */}
      {inHook && (
        <div style={{ textAlign: 'center', padding: '0 80px' }}>
          <AnimText frame={frame} delay={0} size={200} color={white} style={{ fontWeight: 900, lineHeight: 1 }}>
            25
          </AnimText>
          <AnimText frame={frame} delay={6} size={52} color={cyan} style={{ marginTop: -20, fontWeight: 700, letterSpacing: 2 }}>
            meses.
          </AnimText>
          <AnimText frame={frame} delay={16} size={44} color={gray400} style={{ marginTop: 36, fontWeight: 400, lineHeight: 1.5 }}>
            De cero a tu primer millón.
            <br />
            <span style={{ color: white, fontWeight: 700 }}>Si sigues el protocolo.</span>
          </AnimText>
        </div>
      )}

      {/* ——— BEAT 1: Validación ——— */}
      {inBeat1 && (
        <div style={{ padding: '0 60px', width: '100%' }}>
          {/* Watermark */}
          <div style={{
            position: 'absolute', bottom: -40, right: -20,
            fontSize: 420, fontWeight: 900, color: purple, opacity: 0.05, lineHeight: 1,
          }}>1</div>

          <AnimText frame={frame} delay={60} size={30} color={gray400} style={{ fontWeight: 500, marginBottom: 40, letterSpacing: 2 }}>
            EL PROTOCOLO — 3 FASES
          </AnimText>

          <PhaseCard
            frame={frame}
            delay={70}
            phase="FASE 1 · Meses 1-3"
            title="Validación"
            lines={[
              'No construyas nada sin tenerlo vendido.',
              '3 clientes de pago = validado.',
              'Sin eso: es un hobby.',
            ]}
            accent={purple}
          />
        </div>
      )}

      {/* ——— BEAT 2: Infraestructura ——— */}
      {inBeat2 && (
        <div style={{ padding: '0 60px', width: '100%' }}>
          <div style={{
            position: 'absolute', bottom: -40, right: -20,
            fontSize: 420, fontWeight: 900, color: cyan, opacity: 0.05, lineHeight: 1,
          }}>2</div>

          <PhaseCard
            frame={frame}
            delay={210}
            phase="FASE 2 · Meses 4-12"
            title="Infraestructura"
            lines={[
              'El sistema que genera reuniones mientras duermes:',
            ]}
            accent={cyan}
          />

          {[
            ['—', 'ICP definido', 210 + 30],
            ['—', 'Secuencia de contacto', 210 + 45],
            ['—', 'Demo optimizada', 210 + 60],
            ['—', 'Cierre documentado', 210 + 75],
          ].map(([bullet, text, d], i) => {
            const p = interpolate(frame, [d, d + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
            return (
              <div key={i} style={{
                opacity: p,
                transform: `translateX(${interpolate(p, [0, 1], [-30, 0])}px)`,
                display: 'flex', alignItems: 'center', gap: 20,
                marginBottom: 20, marginLeft: 20,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: cyan, flexShrink: 0 }} />
                <div style={{ fontSize: 40, fontWeight: 600, color: white }}>{text}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* ——— BEAT 3: Escala ——— */}
      {inBeat3 && (
        <div style={{ padding: '0 60px', width: '100%' }}>
          <div style={{
            position: 'absolute', bottom: -40, right: -20,
            fontSize: 420, fontWeight: 900, color: pink, opacity: 0.05, lineHeight: 1,
          }}>3</div>

          <PhaseCard
            frame={frame}
            delay={390}
            phase="FASE 3 · Meses 13-25"
            title="Escala"
            lines={['Con infraestructura, escalar es predecible.']}
            accent={pink}
          />

          <AnimText frame={frame} delay={430} size={120} color={white} style={{ textAlign: 'center', fontWeight: 900, lineHeight: 1 }}>
            627+
          </AnimText>
          <AnimText frame={frame} delay={438} size={40} color={gray400} style={{ textAlign: 'center', fontWeight: 500, marginTop: -10 }}>
            empresas tienen el sistema
          </AnimText>

          <AnimText frame={frame} delay={455} size={52} color={cyan} style={{ textAlign: 'center', fontWeight: 800, marginTop: 32 }}>
            +34% reuniones
          </AnimText>
          <AnimText frame={frame} delay={463} size={36} color={gray400} style={{ textAlign: 'center', fontWeight: 400 }}>
            de media en 90 días
          </AnimText>
        </div>
      )}

      {/* ——— CTA ——— */}
      {inCta && (
        <div style={{ textAlign: 'center', padding: '0 80px' }}>
          <AnimText frame={frame} delay={600} size={28} color={cyan} style={{ letterSpacing: 3, textTransform: 'uppercase', marginBottom: 48 }}>
            Global Growth Consulting
          </AnimText>
          <AnimText frame={frame} delay={608} size={62} color={white} style={{ fontWeight: 900, lineHeight: 1.2 }}>
            ¿Quieres el protocolo completo?
          </AnimText>
          <AnimText frame={frame} delay={622} size={44} color={gray400} style={{ marginTop: 24, fontWeight: 400 }}>
            Es gratis. Sin trampa.
          </AnimText>
          <AnimText frame={frame} delay={636} size={44} color={white} style={{
            marginTop: 64, fontWeight: 700,
            background: `linear-gradient(90deg, ${purple}, ${pink})`,
            padding: '28px 56px', borderRadius: 12, display: 'inline-block',
          }}>
            → Enlace en bio
          </AnimText>
        </div>
      )}
    </div>
  );
};
