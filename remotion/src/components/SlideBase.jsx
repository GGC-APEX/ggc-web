import React from 'react';
import { Img, staticFile } from 'remotion';
import { theme, slideBase } from '../theme.js';

// Subtle grid pattern background
const GridPattern = () => (
  <svg
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.03 }}
    viewBox="0 0 1080 1350"
    preserveAspectRatio="none"
  >
    {Array.from({ length: 30 }, (_, i) => (
      <line key={`v${i}`} x1={i * 36} y1="0" x2={i * 36} y2="1350" stroke="white" strokeWidth="1" />
    ))}
    {Array.from({ length: 38 }, (_, i) => (
      <line key={`h${i}`} x1="0" y1={i * 36} x2="1080" y2={i * 36} stroke="white" strokeWidth="1" />
    ))}
  </svg>
);

// Radial glow — purple/cyan brand feel
const BackgroundGlow = () => (
  <div style={{
    position: 'absolute',
    top: -200,
    left: -200,
    width: 800,
    height: 800,
    borderRadius: '50%',
    background: `radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)`,
    pointerEvents: 'none',
  }} />
);

// Top accent bar with brand gradient
const TopBar = () => (
  <div style={{
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${theme.colors.purple}, ${theme.colors.cyan}, ${theme.colors.pink})`,
  }} />
);

// Bottom branding footer with logo
const Footer = () => (
  <div style={{
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: 80,
    background: 'rgba(12,10,29,0.95)',
    borderTop: `1px solid rgba(139,92,246,0.2)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 60px',
  }}>
    {/* Logo + brand name */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Img
        src={staticFile('logo.png')}
        style={{ height: 36, width: 'auto', objectFit: 'contain' }}
      />
      <span style={{
        fontSize: 20,
        fontWeight: 800,
        letterSpacing: 2,
        color: theme.colors.white,
        opacity: 0.9,
      }}>
        GLOBAL GROWTH CONSULTING
      </span>
    </div>
    <span style={{
      fontSize: 20,
      fontWeight: 600,
      color: theme.colors.cyan,
      opacity: 0.8,
    }}>
      @sir.fortuna
    </span>
  </div>
);

// Slide number badge
const SlideBadge = ({ current, total }) => (
  <div style={{
    position: 'absolute',
    top: 40,
    right: 60,
    background: 'rgba(139,92,246,0.15)',
    border: `1px solid rgba(139,92,246,0.4)`,
    borderRadius: 6,
    padding: '6px 16px',
    fontSize: 20,
    fontWeight: 700,
    color: theme.colors.purpleLight,
    letterSpacing: 2,
  }}>
    {current}/{total}
  </div>
);

export const SlideBase = ({ children, slideNumber, totalSlides, hideFooter = false }) => (
  <div style={slideBase}>
    <GridPattern />
    <BackgroundGlow />
    <TopBar />
    {slideNumber && totalSlides && (
      <SlideBadge current={slideNumber} total={totalSlides} />
    )}
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingBottom: hideFooter ? 0 : 80 }}>
      {children}
    </div>
    {!hideFooter && <Footer />}
  </div>
);
