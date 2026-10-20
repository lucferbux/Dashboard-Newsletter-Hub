// "One codebase, many products": an SVG fan-out from the monorepo to each distribution. Select a product to
// trace its path (the line draws itself) and read what it packages. Data: js/data/distributions.js.
import { html, esc, statusLabel, jiraLinks, descriptionList } from '../components/ui.js';

const W = 640, H = 300;

export function fanout(dist) {
  const rows = dist.rows;
  const sy = H / 2, sw = 190, tx = W - 220;
  const ty = (i) => 36 + i * ((H - 72) / Math.max(1, rows.length - 1));
  const paths = rows.map((r, i) => `<path class="mo-fan__path" data-i="${i}" pathLength="1" d="M${sw},${sy} C${sw + 90},${sy} ${tx - 100},${ty(i)} ${tx - 12},${ty(i)}"/>`).join('');
  const targets = rows.map((r, i) => `<g class="mo-fan__target" data-i="${i}" tabindex="0" role="button" aria-label="${esc(r.name)}">
      <rect x="${tx}" y="${ty(i) - 24}" width="208" height="48" rx="12"/>
      <circle class="mo-fan__dot" cx="${tx - 6}" cy="${ty(i)}" r="4"/>
      <text class="mo-fan__name" x="${tx + 16}" y="${ty(i) - 3}">${esc(r.name)}</text>
      <text class="mo-fan__sub" x="${tx + 16}" y="${ty(i) + 13}">${esc(r.cells[2] ?? '')}</text>
    </g>`).join('');
  return html`<div class="mo-fan" data-fan>
    <svg viewBox="0 0 ${W} ${H}" class="mo-fan__svg" role="group" aria-label="One monorepo, packaged as several products">
      ${paths}
      <g class="mo-fan__source"><rect x="1" y="${sy - 34}" width="${sw}" height="68" rx="14"/>
        <text class="mo-fan__name" x="22" y="${sy - 4}">odh-dashboard</text><text class="mo-fan__sub" x="22" y="${sy + 14}">One monorepo · modules · BFFs</text></g>
      ${targets}
    </svg>
    <div class="mo-fan__detail" data-fan-detail aria-live="polite"></div>
  </div>`;
}

export function mountFanout(root, dist) {
  const el = root.querySelector('[data-fan]');
  if (!el) return;
  const detail = el.querySelector('[data-fan-detail]');
  const select = (i) => {
    el.querySelectorAll('[data-i]').forEach((n) => n.classList.toggle('is-active', Number(n.dataset.i) === i));
    const r = dist.rows[i];
    detail.innerHTML = html`<div class="mo-row" style="justify-content:space-between"><h3 class="pf-v6-c-title pf-m-lg">${r.name}</h3>${statusLabel(r.status, { compact: false })}</div>
      ${descriptionList(dist.columns.map((c, k) => [c, r.cells[k] ?? '—']), { horizontal: true })}
      ${r.jira?.length ? html`<div style="margin-top:12px">${jiraLinks(r.jira)}</div>` : ''}`;
  };
  el.addEventListener('click', (e) => { const g = e.target.closest('.mo-fan__target'); if (g) select(Number(g.dataset.i)); });
  el.addEventListener('keydown', (e) => { const g = e.target.closest('.mo-fan__target'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); select(Number(g.dataset.i)); } });
  select(Math.max(0, dist.rows.findIndex((r) => /maas/i.test(r.name))));
  new IntersectionObserver(([e], io) => { if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect(); } }, { threshold: 0.25 }).observe(el);
}
