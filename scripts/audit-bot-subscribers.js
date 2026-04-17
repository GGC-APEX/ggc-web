#!/usr/bin/env node
// Audit GHL contacts with web-newsletter / web-leadmagnet tags and flag
// likely bot entries. Writes a CSV to scripts/bots-review.csv for manual
// review — nothing is deleted automatically.
//
// Usage:
//   GHL_API_KEY=... GHL_LOCATION_ID=... node scripts/audit-bot-subscribers.js
//
// Or with a local .env.local (auto-loaded if present):
//   node scripts/audit-bot-subscribers.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  normalizeEmail,
  isDisposable,
  isSuspiciousName
} from '../api/_bot-guard.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');

// Best-effort load of .env.local without adding a dependency.
function loadDotenv() {
  const candidates = ['.env.local', '.env'];
  for (const name of candidates) {
    const p = path.join(REPO_ROOT, name);
    if (!fs.existsSync(p)) continue;
    const content = fs.readFileSync(p, 'utf-8');
    for (const line of content.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (!m) continue;
      const [, k, v] = m;
      if (process.env[k]) continue;
      process.env[k] = v.replace(/^["']|["']$/g, '');
    }
  }
}
loadDotenv();

const GHL_KEY = process.env.GHL_API_KEY;
const GHL_LOC = process.env.GHL_LOCATION_ID;

if (!GHL_KEY || !GHL_LOC) {
  console.error('Missing GHL_API_KEY or GHL_LOCATION_ID. Pull via: vercel env pull .env.local');
  process.exit(1);
}

async function searchPage(tag, page) {
  // GHL v2 search endpoint — filter contacts by tag, paginate.
  const res = await fetch('https://services.leadconnectorhq.com/contacts/search', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GHL_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    },
    body: JSON.stringify({
      locationId: GHL_LOC,
      pageLimit: 100,
      page,
      filters: [{ field: 'tags', operator: 'contains', value: tag }]
    })
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL search failed (${res.status}): ${text}`);
  }
  return res.json();
}

async function fetchAllByTag(tag) {
  const all = [];
  let page = 1;
  while (true) {
    const data = await searchPage(tag, page);
    const contacts = data.contacts || [];
    if (contacts.length === 0) break;
    all.push(...contacts);
    if (contacts.length < 100) break;
    page++;
    if (page > 200) { console.warn('Safety stop at page 200'); break; } // 20k contacts hard cap
  }
  return all;
}

function flagContact(c, normCounts) {
  const reasons = [];
  const email = c.email || '';
  const name = [c.firstName, c.lastName].filter(Boolean).join(' ').trim() || c.contactName || '';

  const norm = normalizeEmail(email);
  if (norm && normCounts[norm] > 1) reasons.push(`gmail-variant(${normCounts[norm]}x)`);
  if (isDisposable(email)) reasons.push('disposable');
  if (isSuspiciousName(name)) reasons.push('random-name');
  if (isSuspiciousName(c.firstName || '')) reasons.push('random-firstname');

  return { email, name, norm, reasons };
}

function csvEscape(v) {
  const s = String(v == null ? '' : v);
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

async function main() {
  console.log('Fetching GHL contacts with tags web-newsletter + web-leadmagnet...');
  const [newsletter, leadmagnet] = await Promise.all([
    fetchAllByTag('web-newsletter'),
    fetchAllByTag('web-leadmagnet')
  ]);

  // Merge by id to avoid double-counting contacts with both tags.
  const byId = new Map();
  for (const c of [...newsletter, ...leadmagnet]) {
    if (c.id) byId.set(c.id, c);
  }
  const contacts = [...byId.values()];
  console.log(`Total unique contacts: ${contacts.length} (newsletter=${newsletter.length}, leadmagnet=${leadmagnet.length})`);

  // Count normalized-email duplicates (Gmail dot-variants -> same bucket).
  const normCounts = {};
  for (const c of contacts) {
    const n = normalizeEmail(c.email || '');
    if (!n) continue;
    normCounts[n] = (normCounts[n] || 0) + 1;
  }

  const rows = [];
  const stats = { disposable: 0, randomName: 0, gmailVariant: 0, flagged: 0 };

  for (const c of contacts) {
    const flagged = flagContact(c, normCounts);
    if (flagged.reasons.length === 0) continue;

    stats.flagged++;
    if (flagged.reasons.some(r => r.startsWith('gmail-variant'))) stats.gmailVariant++;
    if (flagged.reasons.includes('disposable')) stats.disposable++;
    if (flagged.reasons.some(r => r.startsWith('random'))) stats.randomName++;

    rows.push({
      ghl_id: c.id,
      email: flagged.email,
      email_normalized: flagged.norm,
      name: flagged.name,
      tags: (c.tags || []).join('|'),
      date_added: c.dateAdded || '',
      reasons: flagged.reasons.join('; ')
    });
  }

  // Sort: gmail-variants first (highest-signal bots), then random names.
  rows.sort((a, b) => {
    const score = r => (r.reasons.includes('gmail-variant') ? 0 : 1) + (r.reasons.includes('random-name') ? 0 : 1);
    return score(a) - score(b);
  });

  const csvPath = path.join(__dirname, 'bots-review.csv');
  const header = ['ghl_id', 'email', 'email_normalized', 'name', 'tags', 'date_added', 'reasons'];
  const csv = [header.join(',')].concat(
    rows.map(r => header.map(h => csvEscape(r[h])).join(','))
  ).join('\n');
  fs.writeFileSync(csvPath, csv);

  console.log('\n=== Audit summary ===');
  console.log(`Total contacts reviewed: ${contacts.length}`);
  console.log(`Flagged suspicious:      ${stats.flagged}`);
  console.log(`  - Gmail dot-variants:  ${stats.gmailVariant}`);
  console.log(`  - Random names:        ${stats.randomName}`);
  console.log(`  - Disposable domains:  ${stats.disposable}`);
  console.log(`\nCSV written to: ${csvPath}`);
  console.log('No contacts deleted. Review the CSV, then delete in GHL UI.');
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
