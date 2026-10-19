#!/usr/bin/env node
// Validates js/data/*.js before you commit: every file loads, icons exist in js/icons.js, statuses and
// tones are known values, Jira keys look like KEY-123, dates are YYYY-MM-DD, and every section's
// data import resolves. Run: node tools/check.mjs
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { ICONS } = await import(pathToFileURL(join(root, 'js/icons.js')));
const STATUS = ['delivered', 'live', 'in-progress', 'at-risk', 'planned', 'exploring', 'coming-soon'];
const TONES = ['blue', 'green', 'orange', 'red', 'purple', 'teal', 'yellow', 'grey'];
const errors = [];

function walk(v, path, file) {
  if (Array.isArray(v)) return v.forEach((x, i) => walk(x, `${path}[${i}]`, file));
  if (!v || typeof v !== 'object') return;
  for (const [k, x] of Object.entries(v)) {
    const p = `${path}.${k}`;
    if (k === 'icon' && typeof x === 'string' && !ICONS[x]) errors.push(`${file}: ${p} — unknown icon "${x}" (add it to tools/icons.txt and run node tools/build-icons.mjs)`);
    if (k === 'status' && typeof x === 'string' && !STATUS.includes(x)) errors.push(`${file}: ${p} — status "${x}" is not one of ${STATUS.join(', ')}`);
    if (k === 'tone' && typeof x === 'string' && !TONES.includes(x)) errors.push(`${file}: ${p} — tone "${x}" is not one of ${TONES.join(', ')}`);
    if (k === 'jira' && Array.isArray(x)) x.forEach((j) => /^[A-Z][A-Z0-9]+-\d+$/.test(j) || errors.push(`${file}: ${p} — "${j}" is not a Jira key`));
    if (['date', 'ga'].includes(k) && typeof x === 'string' && /^\d{4}-/.test(x) && !/^\d{4}-\d{2}-\d{2}$/.test(x)) errors.push(`${file}: ${p} — use YYYY-MM-DD`);
    walk(x, p, file);
  }
}

const dataDir = join(root, 'js/data');
for (const f of readdirSync(dataDir).filter((f) => f.endsWith('.js'))) {
  try { walk((await import(pathToFileURL(join(dataDir, f)))).default, f.replace('.js', ''), f); }
  catch (e) { errors.push(`${f}: does not load — ${e.message}`); }
}

// Section icons and data imports
const secDir = join(root, 'js/sections');
for (const f of readdirSync(secDir).filter((f) => f.endsWith('.js') && f !== 'index.js')) {
  const src = readFileSync(join(secDir, f), 'utf8');
  const nav = /icon:\s*'([^']+)'/.exec(src);
  if (nav && !ICONS[nav[1]]) errors.push(`sections/${f}: nav icon "${nav[1]}" unknown`);
  for (const [, d] of src.matchAll(/from '\.\.\/data\/([^']+)'/g)) if (!readdirSync(dataDir).includes(d)) errors.push(`sections/${f}: imports missing data/${d}`);
}
const index = readFileSync(join(secDir, 'index.js'), 'utf8');
for (const f of readdirSync(secDir).filter((f) => f.endsWith('.js') && f !== 'index.js')) if (!index.includes(`'./${f}'`)) errors.push(`sections/${f} is not registered in sections/index.js`);

if (errors.length) { console.error(`✗ ${errors.length} problem(s):\n` + errors.map((e) => '  - ' + e).join('\n')); process.exit(1); }
console.log('✓ data, icons and sections are consistent');
