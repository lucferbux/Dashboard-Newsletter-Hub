// AI Grid — one front door for inference across sites, clusters and tenants (Technology Preview direction).
import { html, rhIcon, label, curve, travel, $, $$, mountSeg, toggleGroup, sleep, reduced } from '../lib.js';
import { consoleWindow, pageHeader, table, status } from '../console.js';
import * as S from '../screens.js';
import { productsQuad, platformSection, mountPlatform } from '../shared.js';

const W = 1040, H = 460;
const DOOR = { x: 520, y: 70 };
const SITES = [
  { id: 'mad', name: 'Madrid · on-prem', x: 300, y: 250, gpus: 'H100 × 32' },
  { id: 'fra', name: 'Frankfurt · cloud', x: 470, y: 330, gpus: 'L40S × 48' },
  { id: 'vir', name: 'Virginia · cloud', x: 150, y: 370, gpus: 'H100 × 64' },
  { id: 'sgp', name: 'Singapore · edge', x: 820, y: 300, gpus: 'L4 × 16' },
  { id: 'par', name: 'Paris · sovereign', x: 640, y: 390, gpus: 'H200 × 24' },
];
const TENANTS = {
  bank: { name: 'Acme Bank', sites: ['mad', 'fra', 'par'], note: 'EU-only policy: requests never leave European sites.' },
  retail: { name: 'Northwind Retail', sites: ['vir', 'fra', 'sgp', 'mad'], note: 'Global footprint: the least-loaded site wins.' },
  lab: { name: 'Research Lab', sites: ['par', 'sgp'], note: 'Dedicated capacity: only the sites in its plan.' },
};

function mapSvg() {
  let s = '';
  for (let y = 20; y < H; y += 16) for (let x = 12; x < W; x += 16) {
    const d = Math.hypot((x - W / 2) / (W / 2), (y - H / 2) / (H / 1.6));
    const n = Math.sin(x * 0.021) * Math.cos(y * 0.034) + Math.sin((x + y) * 0.011);
    if (d < 1 && n > -0.35) s += `<circle class="map-dot" cx="${x}" cy="${y}" r="1.6" style="opacity:${(1 - d * 0.8).toFixed(2)}"/>`;
  }
  SITES.forEach((t) => { s += `<path class="link" data-site-link="${t.id}" d="${curve(DOOR.x, DOOR.y + 26, t.x, t.y - 8).replace(/C([\d.]+),([\d.]+)/, `C${DOOR.x},${(DOOR.y + t.y) / 2}`)}" stroke-dasharray="2 5"/>`; });
  SITES.forEach((t) => {
    s += `<g class="site" data-site="${t.id}"><circle class="site__ring" cx="${t.x}" cy="${t.y}" r="12"/><circle class="site__core" cx="${t.x}" cy="${t.y}" r="5"/>
      <text class="site__label" x="${t.x + 14}" y="${t.y - 4}">${t.name}</text><text class="site__load" x="${t.x + 14}" y="${t.y + 12}" data-load="${t.id}">—</text></g>`;
  });
  s += `<g class="node is-hot"><rect x="${DOOR.x - 110}" y="${DOOR.y - 28}" width="220" height="56" rx="16"/><text class="node__t" x="${DOOR.x}" y="${DOOR.y - 3}" text-anchor="middle">AI Grid front door</text><text class="node__s" x="${DOOR.x}" y="${DOOR.y + 15}" text-anchor="middle">One endpoint · smart routing</text></g>`;
  return `<svg class="diagram" viewBox="0 0 ${W} ${H}" data-map>${s}</svg>`;
}

const gridLogo = 'assets/red-hat-ai-light.svg';
const PLANES = [
  { k: 'Provider console', icon: 'SettingsNav', t: 'Run the grid.', p: 'Add clusters across sites, create organisations, publish models to them and watch capacity — from one place.',
    win: { url: 'grid.example.com/provider', logo: gridLogo, user: 'grid-admin', current: 'clusters', nav: [{ id: 'clusters', label: 'Clusters', icon: 'RhUiCluster' }, { id: 'orgs', label: 'Organizations', icon: 'Group' }, { id: 'models', label: 'Models', icon: 'AiHubNav' }, { id: 'mon', label: 'Monitoring', icon: 'ObserveAndMonitorNav' }] },
    body: () => html`${pageHeader('RhUiCluster', 'Clusters', 'Inference sites connected to this grid.', '#e0f0ff')}${table(['Cluster', 'Location', 'Accelerators', 'Load', 'Status'], SITES.map((s, i) => [`<b>${s.id}-01</b>`, s.name, s.gpus, `${[46, 45, 61, 38, 53][i]}%`, status('ok', 'Healthy')]))}` },
  { k: 'Tenant portal', icon: 'Group', t: 'Use the grid.', p: 'Each organisation gets the MaaS Portal in Grid mode: its model endpoints, its keys, its usage. It never sees a cluster.',
    win: { url: 'acme.grid.example.com', logo: gridLogo, user: 'dev@acmebank.example', current: 'endpoints', nav: [{ id: 'endpoints', label: 'Models endpoints', icon: 'AiAssetEndpoints' }, { id: 'apikeys', label: 'API keys', icon: 'ApiKeysAndSubscriptions' }, { id: 'observability', label: 'Observability dashboard', icon: 'ObserveAndMonitorNav' }] },
    body: () => html`${pageHeader('AiAssetEndpoints', 'Models endpoints', 'Acme Bank · EU-only plan', '#ffe9e0')}${table(['Model', 'Capabilities', 'Served from', 'Status'], [['<b>granite-3-3-8b-instruct</b>', label('Tool calling', 'blue'), 'Madrid, Frankfurt, Paris', status('ok', 'Ready')], ['<b>llama-3-3-70b</b>', label('Long context', 'blue'), 'Frankfurt, Paris', status('ok', 'Ready')]])}` },
  { k: 'Inference sites', icon: 'ModelServer', t: 'Power the grid.', p: 'Each site is an OpenShift AI cluster serving models with llm-d. Add a site and the grid starts routing to it.',
    win: { url: 'rhoai-dashboard.apps.mad.example.com', nav: S.RHOAI_NAV, current: 'models' },
    body: () => S.deployments() },
];

const STEPS = [
  { t: 'One cluster', p: 'Models-as-a-Service turns the models on one OpenShift AI cluster into a governed product.', n: 'MaaS · available' },
  { t: 'Many clusters', p: 'AI Grid connects many clusters — on-prem, cloud, edge — behind one front door.', n: 'AI Grid · Technology Preview' },
  { t: 'Many tenants', p: 'Organisations get isolated portals, keys, usage and monitoring on shared capacity.', n: 'AI Grid · Technology Preview' },
];

export default {
  id: 'aigrid', label: 'AI Grid', title: 'AI Grid', icon: 'Global',
  render() {
    return html`
<section class="hero stage"><div class="wrap center">
  <p class="eyebrow reveal">AI Grid ${label('Technology Preview', 'orange')}</p>
  <h1 class="h-hero reveal" style="--i:1">All your GPUs.<br><span class="grad">One front door.</span></h1>
  <p class="lead reveal" style="--i:2">AI Grid turns clusters across data centres, clouds and the edge into one inference service — and lets you offer it to many organisations, each isolated and in control.</p>
  ${toggleGroup('data-tenant-seg', Object.entries(TENANTS).map(([k, t]) => [k, t.name, 'Group']), 'bank', 'reveal')}
  <div class="map-wrap reveal" style="--i:4">${mapSvg()}</div>
  <p class="lead" data-tenant-note style="font-size:17px;margin-top:8px"></p>
  <div style="margin-top:22px"><button class="pf-v6-c-button pf-m-primary pf-m-display-lg" data-route><span class="pf-v6-c-button__text">Send requests</span></button></div>
  <div class="legend"><span><b style="color:#ee0000">●</b> site in the tenant's plan</span><span><b style="color:#ee0000;opacity:.3">●</b> other sites</span><span>load updates live</span></div>
</div></section>

<section class="section"><div class="wrap">
  <div class="center"><p class="eyebrow reveal">Three planes</p><h2 class="h1 reveal">One grid.<br><span class="muted">Three points of view.</span></h2></div>
  <div style="display:grid;gap:56px;margin-top:64px">${PLANES.map((p, i) => html`
    <div class="split ${i % 2 ? 'split--flip' : ''} reveal">
      <div class="split__copy"><span class="quad__icon">${rhIcon(p.icon, { size: 26, color: '#ee0000' })}</span><p class="eyebrow" style="margin-top:18px">${p.k} ${i < 2 ? label('Technology Preview', 'orange') : ''}</p><h3 class="h2">${p.t}</h3><p class="lead" style="font-size:19px">${p.p}</p></div>
      <div class="split__visual">${consoleWindow({ ...p.win, body: p.body(), cls: 'console--short' })}</div>
    </div>`)}</div>
</div></section>

<section class="section tile-bg"><div class="wrap">
  <div class="center"><p class="eyebrow reveal">Built in, not bolted on</p><h2 class="h1 reveal">Shared capacity.<br>Private everything else.</h2></div>
  <div class="bento">
    <div class="card card--3 reveal"><p class="card__k">Organisations</p><h3 class="card__title">Each tenant, its own world.</h3><p class="card__text">Identity organisations keep users, keys and models apart — one sign-in per tenant.</p></div>
    <div class="card card--3 reveal" style="--i:1"><p class="card__k">Placement</p><h3 class="card__title">Data stays where it must.</h3><p class="card__text">Route only to the sites a tenant's plan allows: by region, by sovereignty, by hardware.</p></div>
    <div class="card card--3 reveal" style="--i:2"><p class="card__k">Smart routing</p><h3 class="card__title">The least-busy GPU answers.</h3><p class="card__text">The MaaS gateway and llm-d send each request where it will be served fastest.</p></div>
    <div class="card card--3 reveal" style="--i:3"><p class="card__k">Observability</p><h3 class="card__title">Every tenant sees only its own metrics.</h3><p class="card__text">Logs and metrics from all sites, filtered per organisation.</p></div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <div class="center"><p class="eyebrow reveal">The road</p><h2 class="h1 reveal">The evolution of<br><span class="grad">Models-as-a-Service.</span></h2>
  <p class="lead reveal">AI Grid builds on the same APIs and the same portal, so what teams learn on one cluster carries over to the grid.</p></div>
  <div class="bento" style="margin-top:44px">${STEPS.map((s, i) => html`<div class="card card--2 reveal" style="--i:${i}"><p class="card__k">0${i + 1}</p><h3 class="card__title">${s.t}</h3><p class="card__text">${s.p}</p><div class="card__visual">${label(s.n, i ? 'orange' : 'green')}</div></div>`)}</div>
  <p class="center muted reveal" style="margin-top:28px;font-size:13px">AI Grid is a Technology Preview direction; its APIs are in preview and can change.</p>
</div></section>

${platformSection('aigrid')}
${productsQuad('aigrid')}`;
  },

  mount(root) {
    let alive = true, tenant = 'bank';
    const svg = $('[data-map]', root), note = $('[data-tenant-note]', root);
    const load = Object.fromEntries(SITES.map((s, i) => [s.id, 30 + ((i * 17) % 40)]));
    const paint = () => {
      const allowed = TENANTS[tenant].sites;
      SITES.forEach((s) => {
        const g = $(`[data-site="${s.id}"]`, svg), on = allowed.includes(s.id);
        g.style.opacity = on ? 1 : 0.28;
        $(`[data-site-link="${s.id}"]`, svg).classList.toggle('is-hot', false);
        $(`[data-load="${s.id}"]`, svg).textContent = `${s.gpus} · ${Math.round(load[s.id])}% busy`;
      });
    };
    mountSeg($('[data-tenant-seg]', root), (v) => { tenant = v; note.textContent = TENANTS[v].note; paint(); });
    note.textContent = TENANTS[tenant].note; paint();

    // Background load drifts so the routing choice changes over time
    const drift = setInterval(() => { SITES.forEach((s) => { load[s.id] = Math.max(8, Math.min(95, load[s.id] + (Math.random() - 0.5) * 14)); }); paint(); }, 1500);

    const route = async () => {
      const allowed = TENANTS[tenant].sites;
      const best = allowed.reduce((a, b) => (load[a] <= load[b] ? a : b));
      const l = $(`[data-site-link="${best}"]`, svg);
      l.classList.add('is-hot');
      await travel(svg, l, { dur: 900 });
      load[best] = Math.min(95, load[best] + 6); paint();
    };
    const btn = $('[data-route]', root);
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      for (let i = 0; i < 8 && alive; i++) { route(); await sleep(260); }
      await sleep(900); btn.disabled = false;
    });
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting && !reduced()) { btn.click(); io.disconnect(); } }, { threshold: .5 });
    io.observe(svg);

    mountPlatform(root, 'aigrid');
    return () => { alive = false; clearInterval(drift); io.disconnect(); };
  },
};
