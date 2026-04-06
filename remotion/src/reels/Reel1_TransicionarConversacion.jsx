import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
} from 'remotion';
import { theme } from '../theme.js';

const { purple, purpleLight, cyan, pink, white, gray400 } = theme.colors;
const BG = '#0C0A1D';

// Spring helper
function useSpring(frame, delay = 0, config = {}) {
  const { fps } = useVideoConfig();
  return spring({
    fps,
    frame: Math.max(0, frame - delay),
    config: { damping: 14, stiffness: 100, mass: 1, ...config },
  });
}

// Fade-in + slide-up animation
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

// Big watermark number
function WatermarkNum({ num, color }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: -60,
      right: -20,
      fontSize: 480,
      fontWeight: 900,
      color,
      opacity: 0.055,
      lineHeight: 1,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      userSelect: 'none',
      pointerEvents: 'none',
    }}>
      {num}
    </div>
  );
}

// Progress bar at top
function ProgressBar({ frame, totalFrames }) {
  const pct = interpolate(frame, [0, totalFrames], [0, 100], { extrapolateRight: 'clamp' });
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: 6,
      background: 'rgba(255,255,255,0.08)',
    }}>
      <div style={{
        width: `${pct}%`,
        height: '100%',
        background: `linear-gradient(90deg, ${purple}, ${cyan})`,
        transition: 'width 0.1s linear',
      }} />
    </div>
  );
}

// Section screens
// HOOK: 0-60 (2s)
// BEAT1: 60-180 (4s)
// BEAT2: 180-330 (5s)
// BEAT3: 330-480 (5s)
// CTA:   480-600 (4s)

export const Reel1_TransicionarConversacion = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Which section are we in?
  const inHook  = frame < 60;
  const inBeat1 = frame >= 60 && frame < 180;
  const inBeat2 = frame >= 180 && frame < 330;
  const inBeat3 = frame >= 330 && frame < 480;
  const inCta   = frame >= 480;

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

      {/* GGC badge top */}
      <div style={{
        position: 'absolute',
        top: 60,
        left: 60,
        fontSize: 22,
        fontWeight: 700,
        color: cyan,
        letterSpacing: 4,
        textTransform: 'uppercase',
        opacity: 0.8,
      }}>
        GGC
      </div>

      {/* ——— HOOK ——— */}
      {inHook && (
        <div style={{ textAlign: 'center', padding: '0 80px' }}>
          <AnimText frame={frame} delay={0} size={80} color={white}>
            La mayoría de conversaciones B2B
          </AnimText>
          <AnimText frame={frame} delay={8} size={90} color={purple} style={{ marginTop: 20 }}>
            mueren aquí.
          </AnimText>
          <AnimText frame={frame} delay={20} size={40} color={gray400} style={{ marginTop: 40, fontWeight: 400 }}>
            Y no es el producto. Es el timing.
          </AnimText>
        </div>
      )}

      {/* ——— BEAT 1 ——— */}
      {inBeat1 && (
        <div style={{ padding: '0 80px', width: '100%' }}>
          <WatermarkNum num="1" color={purple} />
          {/* Step label */}
          <AnimText frame={frame} delay={60} size={22} color={purple} style={{
            letterSpacing: 4, textTransform: 'uppercase', marginBottom: 40,
            background: 'rgba(139,92,246,0.12)', padding: '8px 24px', borderRadius: 4,
            display: 'inline-block', border: `1px solid rgba(139,92,246,0.3)`,
          }}>
            Paso 1 de 3
          </AnimText>
          <AnimText frame={frame} delay={68} size={66} color={white} style={{ marginBottom: 28 }}>
            El error:
          </AnimText>
          <AnimText frame={frame} delay={76} size={44} color={gray400} style={{ fontWeight: 500, lineHeight: 1.4 }}>
            Hablar de tu producto antes de que el cliente vea el problema.
          </AnimText>
          <AnimText frame={frame} delay={90} size={40} color={white} style={{ marginTop: 40, fontWeight: 700, lineHeight: 1.4 }}>
            La gente no compra cuando{' '}
            <span style={{ color: purple }}>tú quieres</span>.<br />
            Compra cuando{' '}
            <span style={{ color: cyan }}>ve el coste de no actuar</span>.
          </AnimText>
        </div>
      )}

      {/* ——— BEAT 2 ——— */}
      {inBeat2 && (
        <div style={{ padding: '0 80px', width: '100%' }}>
          <WatermarkNum num="2" color={cyan} />
          <AnimText frame={frame} delay={180} size={22} color={cyan} style={{
            letterSpacing: 4, textTransform: 'uppercase', marginBottom: 40,
            background: 'rgba(34,211,238,0.1)', padding: '8px 24px', borderRadius: 4,
            display: 'inline-block', border: `1px solid rgba(34,211,238,0.25)`,
          }}>
            Paso 2 de 3
          </AnimText>
          <AnimText frame={frame} delay={188} size={66} color={white} style={{ marginBottom: 28 }}>
            El puente:
          </AnimText>
          <AnimText frame={frame} delay={196} size={40} color={gray400} style={{ fontWeight: 400, lineHeight: 1.5 }}>
            Haz la pregunta que cambia el marco.
          </AnimText>
          <AnimText frame={frame} delay={210} size={46} color={white} style={{
            marginTop: 40, fontWeight: 700, lineHeight: 1.5,
            background: 'rgba(139,92,246,0.1)', padding: '32px 40px', borderRadius: 12,
            border: `1px solid rgba(139,92,246,0.2)`,
          }}>
            "¿Cuántas reuniones cualificadas generáis al mes?"
          </AnimText>
          <AnimText frame={frame} delay={230} size={40} color={cyan} style={{ marginTop: 32, fontWeight: 600, lineHeight: 1.5 }}>
            "¿Y cuántas necesitáis para crecer a la velocidad que queréis?"
          </AnimText>
        </div>
      )}

      {/* ——— BEAT 3 ——— */}
      {inBeat3 && (
        <div style={{ padding: '0 80px', width: '100%' }}>
          <WatermarkNum num="3" color={pink} />
          <AnimText frame={frame} delay={330} size={22} color={pink} style={{
            letterSpacing: 4, textTransform: 'uppercase', marginBottom: 40,
            background: 'rgba(236,72,153,0.1)', padding: '8px 24px', borderRadius: 4,
            display: 'inline-block', border: `1px solid rgba(236,72,153,0.25)`,
          }}>
            Paso 3 de 3
          </AnimText>
          <AnimText frame={frame} delay={338} size={66} color={white} style={{ marginBottom: 28 }}>
            El cierre suave:
          </AnimText>
          <AnimText frame={frame} delay={346} size={40} color={gray400} style={{ fontWeight: 400 }}>
            No vendas. Propón.
          </AnimText>
          <AnimText frame={frame} delay={360} size={44} color={white} style={{
            marginTop: 40, fontWeight: 600, lineHeight: 1.6,
            background: 'rgba(236,72,153,0.08)', padding: '32px 40px', borderRadius: 12,
            border: `1px solid rgba(236,72,153,0.2)`,
          }}>
            "Tengo algo que podría ser exactamente lo que necesitas.{' '}
            <span style={{ color: pink }}>¿Vale la pena que lo veamos en 20 minutos?</span>"
          </AnimText>
        </div>
      )}

      {/* ——— CTA ——— */}
      {inCta && (
        <div style={{ textAlign: 'center', padding: '0 80px' }}>
          <AnimText frame={frame} delay={480} size={28} color={cyan} style={{
            letterSpacing: 3, textTransform: 'uppercase', marginBottom: 48,
          }}>
            Global Growth Consulting
          </AnimText>
          <AnimText frame={frame} delay={488} size={90} color={white} style={{ fontWeight: 900, lineHeight: 1.1 }}>
            627+
          </AnimText>
          <AnimText frame={frame} delay={496} size={44} color={gray400} style={{ fontWeight: 500, marginTop: 8 }}>
            empresas ya usan el sistema.
          </AnimText>
          <AnimText frame={frame} delay={510} size={42} color={white} style={{
            marginTop: 60, fontWeight: 700,
            background: `linear-gradient(90deg, ${purple}, ${cyan})`,
            padding: '24px 48px', borderRadius: 12,
            display: 'inline-block',
          }}>
            → Enlace en bio
          </AnimText>
        </div>
      )}
    </div>
  );
};
