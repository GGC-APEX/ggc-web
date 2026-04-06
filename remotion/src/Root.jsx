import React from 'react';
import { Still } from 'remotion';
import { theme } from './theme.js';

// Carousel 1: Las 5 Capas
import { Slide1, Slide2, Slide3, Slide4, Slide5Real, Slide6, Slide7, Slide8 } from './carousels/Carousel1_5Capas.jsx';
// Carousel 2: Las 7 Métricas
import { M2Slide1, M2Slide2, M2Slide3, M2Slide4, M2Slide5, M2Slide6, M2Slide7, M2Slide8 } from './carousels/Carousel2_7Metricas.jsx';
// Carousel 3: ICP 4 Dimensiones
import { I3Slide1, I3Slide2, I3Slide3, I3Slide4, I3Slide5, I3Slide6, I3Slide7, I3Slide8 } from './carousels/Carousel3_ICP4Dimensiones.jsx';
// Carousel 4: Benchmarks Prospección 2026
import { B4Slide1, B4Slide2, B4Slide3, B4Slide4, B4Slide5, B4Slide6, B4Slide7, B4Slide8 } from './carousels/Carousel4_BenchmarksProspeccion.jsx';
// Carousel 5: Framework 20 Reuniones
import { F5Slide1, F5Slide2, F5Slide3, F5Slide4, F5Slide5, F5Slide6, F5Slide7, F5Slide8 } from './carousels/Carousel5_Framework20Reuniones.jsx';

const { width, height } = theme.slide;

const allCarousels = [
  // C1: Las 5 Capas de Infraestructura Comercial B2B
  { id: 'C1-S1-Hook', component: Slide1 },
  { id: 'C1-S2-Capa1', component: Slide2 },
  { id: 'C1-S3-Capa2', component: Slide3 },
  { id: 'C1-S4-Capa3', component: Slide4 },
  { id: 'C1-S5-Capa4', component: Slide5Real },
  { id: 'C1-S6-Capa5', component: Slide6 },
  { id: 'C1-S7-Stack', component: Slide7 },
  { id: 'C1-S8-CTA', component: Slide8 },

  // C2: Las 7 Métricas que Predicen el Crecimiento
  { id: 'C2-S1-Hook', component: M2Slide1 },
  { id: 'C2-S2-CPR', component: M2Slide2 },
  { id: 'C2-S3-Conversion', component: M2Slide3 },
  { id: 'C2-S4-Velocidad', component: M2Slide4 },
  { id: 'C2-S5-Embudo', component: M2Slide5 },
  { id: 'C2-S6-LTV-CAC', component: M2Slide6 },
  { id: 'C2-S7-Dashboard', component: M2Slide7 },
  { id: 'C2-S8-CTA', component: M2Slide8 },

  // C3: ICP en 4 Dimensiones
  { id: 'C3-S1-Hook', component: I3Slide1 },
  { id: 'C3-S2-Problema', component: I3Slide2 },
  { id: 'C3-S3-Firmografico', component: I3Slide3 },
  { id: 'C3-S4-Tecnografico', component: I3Slide4 },
  { id: 'C3-S5-Comportamental', component: I3Slide5 },
  { id: 'C3-S6-Timing', component: I3Slide6 },
  { id: 'C3-S7-Resultado', component: I3Slide7 },
  { id: 'C3-S8-CTA', component: I3Slide8 },

  // C4: Benchmarks Prospección España 2026
  { id: 'C4-S1-Hook', component: B4Slide1 },
  { id: 'C4-S2-Problema', component: B4Slide2 },
  { id: 'C4-S3-Metricas', component: B4Slide3 },
  { id: 'C4-S4-Email', component: B4Slide4 },
  { id: 'C4-S5-LinkedIn', component: B4Slide5 },
  { id: 'C4-S6-Multicanal', component: B4Slide6 },
  { id: 'C4-S7-CPR', component: B4Slide7 },
  { id: 'C4-S8-CTA', component: B4Slide8 },

  // C5: Framework 20 Reuniones/Semana
  { id: 'C5-S1-Hook', component: F5Slide1 },
  { id: 'C5-S2-Error', component: F5Slide2 },
  { id: 'C5-S3-Oferta', component: F5Slide3 },
  { id: 'C5-S4-Lista', component: F5Slide4 },
  { id: 'C5-S5-Secuencia', component: F5Slide5 },
  { id: 'C5-S6-Cualificacion', component: F5Slide6 },
  { id: 'C5-S7-Datos', component: F5Slide7 },
  { id: 'C5-S8-Stack', component: F5Slide8 },
];

export const RemotionRoot = () => (
  <>
    {allCarousels.map(({ id, component: Component }) => (
      <Still
        key={id}
        id={id}
        component={Component}
        width={width}
        height={height}
      />
    ))}
  </>
);
