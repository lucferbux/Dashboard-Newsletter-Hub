// The RHOAI stack as an isometric SVG (hero). Pure 2D: no WebGL, themed by CSS classes (see .mo-iso in site.css),
// so light/dark/Felt work. Hover or focus a layer to lift it; click or press Enter to read about it.
import { html, esc } from '../components/ui.js';

const W = 560, H = 360, CX = 210, BASE = 268;
const SX = 170, SZ = 128, T = 12, GAP = 40;
const iso = (x, y, z) => [CX + (x - z) * 0.866, BASE + (x + z) * 0.5 - y];
const pts = (a) => a.map((p) => p.map((n) => n.toFixed(1)).join(',')).join(' ');

/** layers: bottom → top [{ id, name, text, ours? }] */
export function stackSvg(layers) {
  const groups = layers.map((l, i) => {
    const y = i * GAP;
    const x0 = -SX / 2, x1 = SX / 2, z0 = -SZ / 2, z1 = SZ / 2;
    const top = [iso(x0, y + T, z0), iso(x1, y + T, z0), iso(x1, y + T, z1), iso(x0, y + T, z1)];
    const front = [iso(x0, y, z1), iso(x1, y, z1), iso(x1, y + T, z1), iso(x0, y + T, z1)];
    const side = [iso(x1, y, z0), iso(x1, y, z1), iso(x1, y + T, z1), iso(x1, y + T, z0)];
    const mods = l.ours ? [0, 1, 2, 3].map((k) => {
      const bx = -66 + k * 34, bz = -16, by = y + T, s = 24, h = 8;
      return `<g class="mo-iso__module" style="--d:${k * 60}ms"><polygon class="mo-iso__mf" points="${pts([iso(bx, by, bz + s), iso(bx + s, by, bz + s), iso(bx + s, by + h, bz + s), iso(bx, by + h, bz + s)])}"/>
        <polygon class="mo-iso__ms" points="${pts([iso(bx + s, by, bz), iso(bx + s, by, bz + s), iso(bx + s, by + h, bz + s), iso(bx + s, by + h, bz)])}"/>
        <polygon class="mo-iso__mt" points="${pts([iso(bx, by + h, bz), iso(bx + s, by + h, bz), iso(bx + s, by + h, bz + s), iso(bx, by + h, bz + s)])}"/></g>`;
    }).join('') : '';
    const [ax, ay] = iso(x1, y + T / 2, 0);
    const lx = W - 168;
    return `<g class="mo-iso__layer ${l.ours ? 'is-ours' : ''}" data-layer="${l.id}" tabindex="0" role="button" aria-label="${esc(l.name)}" style="--i:${i}">
      <g class="mo-iso__slab"><polygon class="mo-iso__front" points="${pts(front)}"/><polygon class="mo-iso__side" points="${pts(side)}"/><polygon class="mo-iso__top" points="${pts(top)}"/>${mods}</g>
      <line class="mo-iso__leader" x1="${ax + 6}" y1="${ay}" x2="${lx - 10}" y2="${ay}"/><circle class="mo-iso__dot" cx="${ax + 6}" cy="${ay}" r="2.5"/>
      <text class="mo-iso__label" x="${lx}" y="${ay + 4}">${esc(l.name)}</text>
    </g>`;
  }).join('');
  return `<svg class="mo-iso" viewBox="0 0 ${W} ${H}" role="group" aria-label="The RHOAI stack, bottom to top">
    <defs><radialGradient id="mo-iso-halo"><stop offset="0" class="mo-iso__halo-a"/><stop offset="1" class="mo-iso__halo-b"/></radialGradient>
      <filter id="mo-iso-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="16"/></filter></defs>
    <circle cx="${CX}" cy="${BASE - 86}" r="180" fill="url(#mo-iso-halo)"/>
    <ellipse class="mo-iso__shadow" cx="${CX}" cy="${BASE + 34}" rx="170" ry="34" filter="url(#mo-iso-blur)"/>
    ${groups}</svg>`;
}

export function stack(layers) {
  const ours = layers.find((l) => l.ours) ?? layers[0];
  return html`<figure class="mo-stack" data-stack>
    ${stackSvg(layers)}
    <figcaption class="mo-stack__caption" aria-live="polite"><strong>${ours.name}.</strong> ${ours.text}</figcaption>
  </figure>`;
}

export function mountStack(root, layers) {
  const fig = root.querySelector('[data-stack]');
  if (!fig) return;
  const cap = fig.querySelector('.mo-stack__caption');
  const select = (id) => {
    const l = layers.find((x) => x.id === id);
    fig.querySelectorAll('.mo-iso__layer').forEach((g) => g.classList.toggle('is-selected', g.dataset.layer === id));
    cap.innerHTML = `<strong>${l.name}.</strong> ${l.text}`;
  };
  select((layers.find((l) => l.ours) ?? layers[0]).id);
  fig.addEventListener('click', (e) => { const g = e.target.closest('.mo-iso__layer'); if (g) select(g.dataset.layer); });
  fig.addEventListener('keydown', (e) => { const g = e.target.closest('.mo-iso__layer'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); select(g.dataset.layer); } });
  // Settle-in animation once, when visible.
  new IntersectionObserver(([e], io) => { if (e.isIntersecting) { fig.classList.add('is-in'); io.disconnect(); } }, { threshold: 0.3 }).observe(fig);
}
