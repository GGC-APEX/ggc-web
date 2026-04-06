#!/usr/bin/env node
/**
 * GGC Instagram Carousels — Render All Slides
 *
 * Renders all carousel slides as PNG stills (1080×1350px).
 * Output: content-input/instagram/carousels/<carousel>/renders/
 *
 * Usage:
 *   npm run render:all              # render all 5 carousels
 *   npm run render:all -- --c 1     # render only carousel 1
 *   npm run render:all -- --c 4,5   # render carousels 4 and 5
 */

import { execSync } from 'child_process';
import { mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CONTENT_ROOT = resolve(ROOT, '..', 'content-input', 'instagram', 'carousels');
const ENTRY = resolve(ROOT, 'src', 'index.jsx');

// All slides grouped by carousel
const CAROUSELS = [
  {
    id: 1,
    folder: '5-capas-infraestructura',
    slides: [
      { id: 'C1-S1-Hook', file: 's1-hook' },
      { id: 'C1-S2-Capa1', file: 's2-Capa1' },
      { id: 'C1-S3-Capa2', file: 's3-Capa2' },
      { id: 'C1-S4-Capa3', file: 's4-Capa3' },
      { id: 'C1-S5-Capa4', file: 's5-Capa4' },
      { id: 'C1-S6-Capa5', file: 's6-Capa5' },
      { id: 'C1-S7-Stack', file: 's7-Stack' },
      { id: 'C1-S8-CTA', file: 's8-CTA' },
    ],
  },
  {
    id: 2,
    folder: '7-metricas-b2b',
    slides: [
      { id: 'C2-S1-Hook', file: 's1-hook' },
      { id: 'C2-S2-CPR', file: 's2-CPR' },
      { id: 'C2-S3-Conversion', file: 's3-Conversion' },
      { id: 'C2-S4-Velocidad', file: 's4-Velocidad' },
      { id: 'C2-S5-Embudo', file: 's5-Embudo' },
      { id: 'C2-S6-LTV-CAC', file: 's6-LTV-CAC' },
      { id: 'C2-S7-Dashboard', file: 's7-Dashboard' },
      { id: 'C2-S8-CTA', file: 's8-CTA' },
    ],
  },
  {
    id: 3,
    folder: 'icp-4-dimensiones',
    slides: [
      { id: 'C3-S1-Hook', file: 's1-hook' },
      { id: 'C3-S2-Problema', file: 's2-Problema' },
      { id: 'C3-S3-Firmografico', file: 's3-Firmografico' },
      { id: 'C3-S4-Tecnografico', file: 's4-Tecnografico' },
      { id: 'C3-S5-Comportamental', file: 's5-Comportamental' },
      { id: 'C3-S6-Timing', file: 's6-Timing' },
      { id: 'C3-S7-Resultado', file: 's7-Resultado' },
      { id: 'C3-S8-CTA', file: 's8-CTA' },
    ],
  },
  {
    id: 4,
    folder: 'benchmarks-prospeccion-2026',
    slides: [
      { id: 'C4-S1-Hook', file: 's1-hook' },
      { id: 'C4-S2-Problema', file: 's2-Problema' },
      { id: 'C4-S3-Metricas', file: 's3-Metricas' },
      { id: 'C4-S4-Email', file: 's4-Email' },
      { id: 'C4-S5-LinkedIn', file: 's5-LinkedIn' },
      { id: 'C4-S6-Multicanal', file: 's6-Multicanal' },
      { id: 'C4-S7-CPR', file: 's7-CPR' },
      { id: 'C4-S8-CTA', file: 's8-CTA' },
    ],
  },
  {
    id: 5,
    folder: 'framework-20-reuniones',
    slides: [
      { id: 'C5-S1-Hook', file: 's1-hook' },
      { id: 'C5-S2-Error', file: 's2-Error' },
      { id: 'C5-S3-Oferta', file: 's3-Oferta' },
      { id: 'C5-S4-Lista', file: 's4-Lista' },
      { id: 'C5-S5-Secuencia', file: 's5-Secuencia' },
      { id: 'C5-S6-Cualificacion', file: 's6-Cualificacion' },
      { id: 'C5-S7-Datos', file: 's7-Datos' },
      { id: 'C5-S8-Stack', file: 's8-Stack' },
    ],
  },
];

// Parse CLI args: --c 1 or --c 4,5
const args = process.argv.slice(2);
let targetCarousels = null;
const cIdx = args.indexOf('--c');
if (cIdx !== -1 && args[cIdx + 1]) {
  targetCarousels = args[cIdx + 1].split(',').map(Number);
}

const toRender = targetCarousels
  ? CAROUSELS.filter((c) => targetCarousels.includes(c.id))
  : CAROUSELS;

if (toRender.length === 0) {
  console.error('No carousels matched. Check --c argument.');
  process.exit(1);
}

console.log(`\nRendering ${toRender.length} carousel(s)...\n`);

let totalSlides = 0;
let errors = 0;

for (const carousel of toRender) {
  const outDir = resolve(CONTENT_ROOT, carousel.folder, 'renders');
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  console.log(`\n📎 Carousel ${carousel.id}: ${carousel.folder} (${carousel.slides.length} slides)`);

  for (const slide of carousel.slides) {
    const outFile = resolve(outDir, `${slide.file}.png`);
    const cmd = [
      'npx', 'remotion', 'still',
      `"${ENTRY}"`,
      slide.id,
      `"${outFile}"`,
      '--props', '{}',
    ].join(' ');

    try {
      process.stdout.write(`  ${slide.id}... `);
      execSync(cmd, { cwd: ROOT, stdio: 'pipe' });
      console.log(`✓ ${slide.file}.png`);
      totalSlides++;
    } catch (err) {
      console.error(`✗ FAILED: ${err.message.split('\n')[0]}`);
      errors++;
    }
  }
}

console.log(`\n✅ Done. ${totalSlides} slide(s) rendered.${errors > 0 ? ` ⚠️  ${errors} error(s).` : ''}`);
console.log(`Output: content-input/instagram/carousels/<carousel>/renders/\n`);
