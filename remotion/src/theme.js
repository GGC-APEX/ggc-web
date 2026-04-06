// GGC Design System — Instagram Carousels
// Brand palette: purple/cyan/pink — matches globalgrowth.consulting
export const theme = {
  colors: {
    bg: '#0C0A1D',           // brand dark background
    bgCard: '#12102A',        // slightly lighter
    bgElevated: '#1A1832',    // elevated cards
    purple: '#8B5CF6',        // brand primary
    purpleLight: '#A78BFA',   // lighter purple
    purpleDark: '#6D28D9',    // darker purple
    cyan: '#22D3EE',          // brand secondary
    cyanDark: '#0891B2',      // darker cyan
    pink: '#EC4899',          // brand accent
    pinkDark: '#DB2777',      // darker pink
    blue: '#3B82F6',          // brand blue
    white: '#FFFFFF',
    gray400: '#9CA3AF',
    gray600: '#4B5563',
    gray800: '#1F2937',
    // Aliases for backward compat in carousels (will be remapped)
    accent: '#8B5CF6',
  },
  fonts: {
    heading: 'system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif',
  },
  slide: {
    width: 1080,
    height: 1350, // 4:5 ratio
  },
};

export const slideBase = {
  width: theme.slide.width,
  height: theme.slide.height,
  backgroundColor: theme.colors.bg,
  fontFamily: theme.fonts.heading,
  color: theme.colors.white,
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
};
