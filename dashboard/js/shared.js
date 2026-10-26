// Pieces every tab shares: the four-product switcher and the interactive platform map
// (14 feature modules → Core BFF + Dashboard operator → four products).
import { html, rhIcon, curve, $, $$, mountSeg, toggleGroup } from './lib.js';

export const PRODUCTS = [
  { id: 'rhoai', name: 'OpenShift AI', icon: 'AiExperience', line: 'The complete AI platform on OpenShift, from notebook to agent.' },
  { id: 'maas', name: 'Models-as-a-Service', icon: 'ApiKeysAndSubscriptions', line: 'Turn deployed models into a governed, self-service product.' },
  { id: 'xks', name: 'Red Hat AI on any Kubernetes', icon: 'RhUiCluster', line: 'Serve models with the same experience on Azure AKS and beyond.' },
  { id: 'aigrid', name: 'AI Grid', icon: 'Global', line: 'One front door for inference across sites, clusters and tenants.' },
];

export function productsQuad(current) {
  return html`<section class="section tile-bg"><div class="wrap center">
    <p class="eyebrow reveal">One platform</p>
    <h2 class="h1 reveal">Four ways to run AI.<br><span class="muted">One codebase underneath.</span></h2>
    <div class="quad">${PRODUCTS.map((p, i) => html`<button class="quad__item reveal" style="--i:${i}" data-go="${p.id}" ${p.id === current ? 'aria-current="page"' : ''}>
      <span class="quad__tile quad__tile--${p.id}">${rhIcon(p.icon, { size: 24, color: '#fff' })}</span>
      <b class="quad__name">${p.name}</b><span class="quad__line">${p.line}</span>
      <span class="quad__more">${p.id === current ? 'You are here' : 'Explore'}</span></button>`)}</div>
  </div></section>`;
}

/* ---------- The platform map ---------- */
const MODULES = [
  ['registry', 'AI Hub · registry & catalogs'], ['genai', 'Gen AI Studio'], ['maas', 'MaaS'], ['serving', 'Model serving'],
  ['eval', 'EvalHub'], ['automl', 'AutoML'], ['autorag', 'AutoRAG'], ['mlflow', 'MLflow'],
  ['mlflowe', 'MLflow (embedded)'], ['agentops', 'Agent Ops'], ['nb', 'Workbenches'], ['datareg', 'Data Registry'],
  ['dch', 'Data Connect Hub'], ['obs', 'Observability'],
];
const TARGETS = {
  rhoai: { name: 'OpenShift AI', sub: 'Full console · OpenShift', mods: MODULES.map((m) => m[0]),
    note: 'Every module the customer enables, each in its own pod, behind the cluster\'s sign-in. The Dashboard operator deploys only what is switched on.' },
  maas: { name: 'MaaS Portal', sub: 'Self-service · OpenShift', mods: ['maas', 'genai', 'obs'],
    note: 'A lean build: the portal shell plus the MaaS, Gen AI and observability modules, served by Core BFF on a path of the gateway. Users never need an OpenShift account.' },
  xks: { name: 'RHAII on xKS', sub: 'Single container · AKS', mods: ['serving'],
    note: 'One self-contained Go container: the shell served by Core BFF, with KServe and llm-d serving. Helm install, Gateway API routing, cert-manager TLS and your OIDC provider — no OpenShift needed.' },
  aigrid: { name: 'AI Grid', sub: 'Multi-cluster · tenants', mods: ['maas', 'genai'],
    note: 'Tenants get the MaaS Portal in Grid mode, talking to MaaS APIs only; providers get a console for clusters, organisations, models and monitoring. Technology Preview direction.' },
};

export function platformSection(focus = 'rhoai') {
  const W = 1040, H = 520, mx = 24, mw = 196, my0 = 12, mh = 30, mg = 6;
  const cx = 470, cy = H / 2, px = 790, pw = 226;
  const ty = (i) => 70 + i * 120;
  const modY = (i) => my0 + i * (mh + mg);
  let svg = '';
  MODULES.forEach(([id, name], i) => {
    const y = modY(i);
    svg += `<path class="link" data-mod-link="${id}" d="${curve(mx + mw, y + mh / 2, cx - 115, cy)}"/>`;
    svg += `<g class="node" data-mod="${id}"><rect x="${mx}" y="${y}" width="${mw}" height="${mh}" rx="${mh / 2}"/><text class="node__s" x="${mx + 16}" y="${y + 19}">${name}</text></g>`;
  });
  Object.entries(TARGETS).forEach(([id, t], i) => {
    svg += `<path class="link" data-target-link="${id}" d="${curve(cx + 115, cy, px, ty(i) + 28)}"/>`;
    svg += `<g class="node" data-target="${id}" style="cursor:pointer"><rect x="${px}" y="${ty(i)}" width="${pw}" height="56" rx="14"/>
      <text class="node__t" x="${px + 18}" y="${ty(i) + 25}">${t.name}</text><text class="node__s" x="${px + 18}" y="${ty(i) + 43}">${t.sub}</text></g>`;
  });
  svg += `<g class="node is-hot"><rect x="${cx - 115}" y="${cy - 40}" width="230" height="80" rx="18"/>
      <text class="node__t" x="${cx}" y="${cy - 6}" text-anchor="middle">Core BFF</text><text class="node__s" x="${cx}" y="${cy + 14}" text-anchor="middle">One Go backend for every product</text></g>
    <g class="node"><rect x="${cx - 90}" y="${cy - 150}" width="180" height="58" rx="14"/>
      <text class="node__t" x="${cx}" y="${cy - 118}" text-anchor="middle">Dashboard operator</text><text class="node__s" x="${cx}" y="${cy - 101}" text-anchor="middle">Deploys only what is on</text></g>
    <path class="link" d="M${cx},${cy - 92} L${cx},${cy - 40}" stroke-dasharray="3 4"/>
    <g class="node"><rect x="${cx - 90}" y="${cy + 92}" width="180" height="58" rx="14"/>
      <text class="node__t" x="${cx}" y="${cy + 124}" text-anchor="middle">odh-dashboard</text><text class="node__s" x="${cx}" y="${cy + 141}" text-anchor="middle">One codebase, no forks</text></g>
    <path class="link" d="M${cx},${cy + 40} L${cx},${cy + 92}" stroke-dasharray="3 4"/>`;
  return html`<section class="section" id="platform-map"><div class="wrap">
    <div class="center"><p class="eyebrow reveal">The platform underneath</p>
      <h2 class="h1 reveal">Modular by design.</h2>
      <p class="lead reveal">Every feature is an independent module, most with their own backend and their own pod. One operator deploys what you need; one Go backend serves every product we build from the same code.</p>
      ${toggleGroup('data-platform-seg', Object.entries(TARGETS).map(([id, t]) => [id, t.name]), focus, 'reveal')}
    </div>
    <div class="reveal" style="margin-top:40px"><svg class="diagram" viewBox="0 0 ${W} ${H}" data-platform-svg>${svg}</svg></div>
    <p class="center lead reveal" data-platform-note style="max-width:60ch;font-size:19px"></p>
  </div></section>`;
}

export function mountPlatform(root, focus = 'rhoai') {
  const svg = $('[data-platform-svg]', root);
  if (!svg) return;
  const note = $('[data-platform-note]', root);
  const pick = (id) => {
    const t = TARGETS[id];
    $$('[data-mod]', svg).forEach((g) => g.classList.toggle('is-hot', t.mods.includes(g.dataset.mod)));
    $$('[data-mod-link]', svg).forEach((l) => l.classList.toggle('is-hot', t.mods.includes(l.dataset.modLink)));
    $$('[data-target]', svg).forEach((g) => g.classList.toggle('is-hot', g.dataset.target === id));
    $$('[data-target-link]', svg).forEach((l) => l.classList.toggle('is-hot', l.dataset.targetLink === id));
    note.textContent = t.note;
  };
  mountSeg($('[data-platform-seg]', root), pick);
  svg.addEventListener('click', (e) => { const g = e.target.closest('[data-target]'); if (!g) return; const b = $(`[data-platform-seg] [data-v="${g.dataset.target}"]`, root); b?.click(); });
  pick(focus);
}
