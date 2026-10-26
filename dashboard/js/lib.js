// Small shared helpers: templating, scroll reveals, scrollytelling, PatternFly controls and icons.
import { RH_ICONS } from './rh-icons.js';
export const html = (s, ...v) => s.reduce((a, str, i) => a + str + (i < v.length ? (Array.isArray(v[i]) ? v[i].join('') : v[i] ?? '') : ''), '');
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
export const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Fade-up elements with .reveal when they enter the viewport. */
export function mountReveals(root) {
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { threshold: .15, rootMargin: '0px 0px -8% 0px' });
  $$('.reveal', root).forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/** Scrollytelling: the step nearest the middle of the screen becomes active; onStep(i) updates the sticky stage. */
export function mountScrolly(root, onStep) {
  const steps = $$('.scrolly__step', root);
  let current = -1;
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      const i = steps.indexOf(e.target);
      if (i === current) return;
      current = i;
      steps.forEach((s, k) => s.classList.toggle('is-active', k === i));
      onStep(i);
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  steps.forEach((s) => io.observe(s));
  onStep(0); steps[0]?.classList.add('is-active'); current = 0;
  return () => io.disconnect();
}

/** PatternFly toggle group: items [[value, label, iconName?]]; attr names the group for mountSeg. */
export const toggleGroup = (attr, items, current, cls = '') => html`<div class="pf-v6-c-toggle-group seg ${cls}" ${attr}>${items.map(([v, label, ic]) => html`<div class="pf-v6-c-toggle-group__item"><button type="button" class="pf-v6-c-toggle-group__button ${v === current ? 'pf-m-selected' : ''}" aria-pressed="${v === current}" data-v="${v}">${ic ? `<span class="pf-v6-c-toggle-group__icon">${rhIcon(ic, { size: 14 })}</span>` : ''}<span class="pf-v6-c-toggle-group__text">${label}</span></button></div>`)}</div>`;

/** Select a value in a toggle group (or any group of button[data-v]) without firing its handler. */
export const setSeg = (el, v) => $$('button[data-v]', el).forEach((x) => { const on = x.dataset.v === v; x.setAttribute('aria-pressed', String(on)); x.classList.toggle('pf-m-selected', on); });

/** Toggle group behaviour: calls onPick(value). */
export function mountSeg(el, onPick) {
  el.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-v]');
    if (!b) return;
    setSeg(el, b.dataset.v);
    onPick(b.dataset.v);
  });
}

/** PatternFly label: color is one of green, orange, blue, purple, red, grey (default). */
export const label = (text, color = '', { compact = true, icon: ic } = {}) =>
  `<span class="pf-v6-c-label ${color ? `pf-m-${color}` : ''} ${compact ? 'pf-m-compact' : ''}"><span class="pf-v6-c-label__content">${ic ? `<span class="pf-v6-c-label__icon">${ic}</span>` : ''}<span class="pf-v6-c-label__text">${text}</span></span></span>`;

/** A maturity label for GA / Technology Preview / Developer Preview / New. */
export const maturity = (m) => ({ GA: label('Generally available', 'green'), TP: label('Technology Preview', 'orange'), DP: label('Developer Preview', 'purple'), New: label('New', 'blue') })[m] ?? label(m);

/* ---------- Line icons (24px grid, 1.6 stroke) ---------- */
const P = {
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6',
  flask: 'M9 3h6M10 3v6L5 19a1.5 1.5 0 001.3 2h11.4A1.5 1.5 0 0019 19l-5-10V3M7.5 15h9',
  code: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
  agent: 'M12 3a4 4 0 014 4v2a4 4 0 01-8 0V7a4 4 0 014-4zM5 21a7 7 0 0114 0M9 8h.01M15 8h.01',
  shield: 'M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z M9 12l2 2 4-4',
  gear: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.6 1.6 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.6 1.6 0 00-2.7 1.1V21a2 2 0 11-4 0v-.1A1.6 1.6 0 009 19.4a1.6 1.6 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.6 1.6 0 00-1.1-2.7H3a2 2 0 110-4h.1A1.6 1.6 0 004.6 9a1.6 1.6 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.6 1.6 0 001.8.3H9a1.6 1.6 0 001-1.5V3a2 2 0 114 0v.1a1.6 1.6 0 001 1.5 1.6 1.6 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.6 1.6 0 00-.3 1.8V9a1.6 1.6 0 001.5 1H21a2 2 0 110 4h-.1a1.6 1.6 0 00-1.5 1z',
  key: 'M15 7a4 4 0 11-3.5 6L5 19.5V22H2v-3l6.5-6.5A4 4 0 0115 7zM16 8h.01',
  cloud: 'M7 18a5 5 0 01-.5-10 6 6 0 0111.4 1.5A4.5 4.5 0 0118 18z',
  grid: 'M12 2l9 5v10l-9 5-9-5V7zM12 2v20M3 7l9 5 9-5',
  globe: 'M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z',
  layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  search: 'M11 18a7 7 0 100-14 7 7 0 000 14zM21 21l-5-5',
  rocket: 'M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M14 4c3-1 6-1 6-1s0 3-1 6l-6 6-5-5zM9 10H5l-2 3 4 1M14 15v4l-3 2-1-4',
  check: 'M5 12l5 5 9-10',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  module: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  route: 'M6 19a2 2 0 100-4 2 2 0 000 4zM18 9a2 2 0 100-4 2 2 0 000 4zM6 15V9a4 4 0 014-4h6M18 9v6a4 4 0 01-4 4H8',
  lock: 'M6 11h12v10H6zM8 11V7a4 4 0 018 0v4',
};
export const icon = (name, { size = 24, color = 'currentColor', stroke = 1.6 } = {}) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[name] ?? P.spark}"/></svg>`;

/** Icons from the dashboard itself (frontend/public/images/icons), 32px grid. */
export const rhIcon = (name, { size = 24, color = 'currentColor' } = {}) => {
  const i = RH_ICONS[name.endsWith('Icon') ? name : `${name}Icon`];
  if (!i) return icon('spark', { size, color });
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${i.w} ${i.h}" fill="${color}" aria-hidden="true"><path d="${i.d}"/></svg>`;
};

/** A smooth path between two points (horizontal-first cubic). */
export const curve = (x1, y1, x2, y2) => `M${x1},${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}`;

/** Animate a dot along an SVG path element; resolves when done. */
export function travel(svg, pathEl, { dur = 900, cls = 'packet', r = 5 } = {}) {
  return new Promise((resolve) => {
    if (reduced()) return resolve();
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('r', r); dot.setAttribute('class', cls);
    svg.appendChild(dot);
    const len = pathEl.getTotalLength(), t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      const p = pathEl.getPointAtLength(e * len);
      dot.setAttribute('cx', p.x); dot.setAttribute('cy', p.y);
      if (k < 1) requestAnimationFrame(step); else { dot.remove(); resolve(); }
    };
    requestAnimationFrame(step);
  });
}
