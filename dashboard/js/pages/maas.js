// Models-as-a-Service — deployed models as a governed, self-service product. The portal and admin screens are the real
// MaaS Portal and OpenShift AI pages rebuilt with PatternFly (js/screens.js).
import { html, icon, rhIcon, curve, travel, $, $$, mountSeg, toggleGroup, sleep, reduced } from '../lib.js';
import { consoleWindow, go } from '../console.js';
import * as S from '../screens.js';
import * as Sc from '../scenes.js';
import { productsQuad, platformSection, mountPlatform } from '../shared.js';

const PORTAL = { url: 'maas.apps.cluster.example.com/maas-portal', nav: S.PORTAL_NAV, logo: 'assets/red-hat-ai-light.svg' };

async function portalBrowse(win, live) { await go(win, { current: 'endpoints', body: S.portalEndpoints() }); }
async function portalKey(win, live) {
  await go(win, { current: 'apikeys', body: S.apiKeys() });
  await sleep(1000);
  const b = $('[data-create-key]', win); b?.classList.add('is-pressed'); await sleep(400); b?.classList.remove('is-pressed');
  if (!live()) return;
  $('[data-keys-table] tbody', win).insertAdjacentHTML('afterbegin', S.keyRow());
  await sleep(500);
  const main = $('.pf-v6-c-page__main-container', win); main.style.position = 'relative';
  if (live()) main.insertAdjacentHTML('beforeend', S.saveKeyModal());
  await sleep(2600);
  $('.pf-v6-c-backdrop', win)?.remove();
}
async function portalUsage(win, live) {
  await go(win, { current: 'observability', body: S.usageDashboard() });
  await sleep(120);
  $$('.mbar__fill', win).forEach((f) => { f.style.width = `${f.dataset.w}%`; });
}

const ROLES = {
  dev: { name: 'Application developer', icon: 'Build', win: { ...PORTAL, current: 'apikeys' }, screen: () => S.apiKeys(), scene: portalKey,
    can: ['Sign in with your company identity — no OpenShift account.', 'See only the models your subscriptions allow.', 'Create a key and call an OpenAI-compatible API.'] },
  lead: { name: 'Team lead', icon: 'ObserveAndMonitorNav', win: { ...PORTAL, current: 'observability' }, screen: S.usageDashboard, scene: portalUsage,
    can: ['See what each key spends, by model.', 'Spot rate-limited applications before users do.', 'Bring the numbers to chargeback and capacity planning.'] },
  admin: { name: 'Platform admin', icon: 'Permissions', win: { nav: S.RHOAI_NAV, current: 'governance' }, screen: S.governance,
    can: ['Publish a deployed model to subscribers with one choice in the deploy wizard.', 'Create subscriptions and authorization policies with token limits per group.', 'Bring external providers under the same keys, limits and audit.'] },
};

const TIERS = { free: { rpm: 5, label: 'Free', lat: 1.9 }, standard: { rpm: 60, label: 'Standard', lat: 0.9 }, premium: { rpm: 600, label: 'Premium', lat: 0.6 } };
const HOPS = [
  { id: 'app', t: 'Your app', s: 'API key' },
  { id: 'gw', t: 'MaaS gateway', s: 'One URL for all models' },
  { id: 'auth', t: 'Authorino', s: 'Key → subscription' },
  { id: 'limit', t: 'Limitador', s: 'Rate · tokens · tier' },
  { id: 'llmd', t: 'llm-d', s: 'Smart routing' },
  { id: 'model', t: 'Model', s: 'granite-3.3-8b' },
];

function flowSvg() {
  const W = 1040, H = 200, w = 148, h = 64, gap = (W - HOPS.length * w) / (HOPS.length - 1), y = 60;
  let s = '';
  HOPS.forEach((n, i) => {
    const x = i * (w + gap);
    if (i) s += `<path class="link" data-hop-link="${i}" d="${curve(x - gap, y + h / 2, x, y + h / 2)}"/>`;
    s += `<g class="node" data-hop="${n.id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16"/><text class="node__t" x="${x + w / 2}" y="${y + 28}" text-anchor="middle">${n.t}</text><text class="node__s" x="${x + w / 2}" y="${y + 46}" text-anchor="middle">${n.s}</text></g>`;
  });
  s += `<text class="node__s" data-verdict x="${W / 2}" y="${y + h + 50}" text-anchor="middle" style="font-size:14px"></text>`;
  return `<svg class="diagram" viewBox="0 0 ${W} ${H}" data-flow>${s}</svg>`;
}

export default {
  id: 'maas', label: 'MaaS', title: 'Models-as-a-Service', icon: 'ApiKeysAndSubscriptions',
  render() {
    return html`
<section class="hero"><div class="wrap">
  <div class="hero__copy">
    <p class="eyebrow reveal">Models-as-a-Service</p>
    <h1 class="h-hero reveal" style="--i:1">Every model,<br><span class="grad">a product.</span></h1>
    <p class="lead reveal" style="--i:2">Publish the models you run — and the ones you rent — behind one API, with keys, subscriptions and token limits. Teams help themselves in the MaaS Portal. You stay in control of every GPU.</p>
    <div class="cta reveal" style="--i:3"><a href="#flow">Follow a request</a><a href="#roles">See the portal</a></div>
  </div>
  <div class="hero__visual reveal" style="--i:4">${consoleWindow({ ...PORTAL, current: 'endpoints', body: S.portalEndpoints(), id: 'portal-console' })}</div>
</div></section>

<section class="section stage" id="flow"><div class="wrap">
  <div class="center"><p class="eyebrow reveal">Under the hood</p><h2 class="h1 reveal">One request.<br><span class="grad">Six stops. Milliseconds.</span></h2>
  <p class="lead reveal">Pick a tier and send requests. Watch Authorino check the key, Limitador apply the subscription's limits and llm-d pick the best replica. The user's own token never reaches the model.</p>
  ${toggleGroup('data-tier-seg', Object.entries(TIERS).map(([k, t]) => [k, t.label]), 'standard', 'reveal')}</div>
  <div class="reveal" style="margin-top:48px">${flowSvg()}</div>
  <div class="center reveal"><button class="pf-v6-c-button pf-m-primary pf-m-display-lg" data-send><span class="pf-v6-c-button__text">Send 10 requests</span></button></div>
  <div class="stats" style="margin-top:56px">
    <div class="stat"><div class="stat__v" data-ok>0</div><div class="stat__l">served</div></div>
    <div class="stat"><div class="stat__v" data-limited>0</div><div class="stat__l">held back by the tier's limit</div></div>
    <div class="stat"><div class="stat__v" data-lat>—</div><div class="stat__l">typical latency</div></div>
    <div class="stat"><div class="stat__v" data-rpm>60</div><div class="stat__l">requests per minute allowed</div></div>
  </div>
</div></section>

<section class="section tile-bg" id="roles"><div class="wrap center">
  <p class="eyebrow reveal">Self-service</p><h2 class="h1 reveal">A portal for the people<br>who build with models.</h2>
  <p class="lead reveal">The MaaS Portal is a lean web app served on the gateway's own address, behind your company sign-in. Developers never need an OpenShift account; admins govern everything from OpenShift AI.</p>
  ${toggleGroup('data-role-seg', Object.entries(ROLES).map(([k, r]) => [k, r.name, r.icon]), 'dev', 'reveal')}
  <div class="split reveal"><div data-role-copy></div><div data-role-window></div></div>
</div></section>

<section class="section"><div class="wrap">
  <div class="center"><p class="eyebrow reveal">Why it matters</p><h2 class="h1 reveal">GPUs are expensive.<br><span class="muted">Share them like it.</span></h2></div>
  <div class="bento">
    <div class="card card--4 reveal"><p class="card__k">One front door</p><h3 class="card__title">Your models and hosted ones, behind the same key.</h3><p class="card__text">An OpenAI-compatible endpoint for everything you publish — self-hosted on vLLM and llm-d, or external providers — with one set of rules.</p></div>
    <div class="card card--2 reveal" style="--i:1"><p class="card__k">Fair by design</p><p class="card__big">Tiers</p><p class="card__text">Rate limits and token budgets per subscription and group.</p></div>
    <div class="card card--2 reveal" style="--i:2"><p class="card__k">No cluster accounts</p><h3 class="card__title">Your identity provider, nothing else.</h3><p class="card__text">Developers sign in to the portal with company SSO.</p></div>
    <div class="card card--2 reveal" style="--i:3"><p class="card__k">Know the cost</p><h3 class="card__title">Usage per key, model and team.</h3><p class="card__text">The data you need for chargeback and capacity planning.</p></div>
    <div class="card card--2 reveal" style="--i:4"><p class="card__k">Grows into AI Grid</p><h3 class="card__title">The same APIs, across many sites.</h3><p class="card__text">AI Grid builds on MaaS to serve tenants across clusters.</p></div>
  </div>
</div></section>

${platformSection('maas')}
${productsQuad('maas')}`;
  },

  mount(root) {
    let alive = true, tier = 'standard';
    const svg = $('[data-flow]', root), verdict = $('[data-verdict]', root);
    const counters = { ok: 0, limited: 0 };
    const set = (k, v) => { $(`[data-${k}]`, root).textContent = v; };
    mountSeg($('[data-tier-seg]', root), (v) => { tier = v; counters.ok = counters.limited = 0; set('ok', 0); set('limited', 0); set('lat', '—'); set('rpm', TIERS[v].rpm); verdict.textContent = ''; });

    const hop = (id, on) => $(`[data-hop="${id}"]`, svg)?.classList.toggle('is-hot', on);
    const one = async (n) => {
      const allowed = n < TIERS[tier].rpm;
      const links = $$('[data-hop-link]', svg);
      hop('app', true);
      for (let i = 0; i < links.length && alive; i++) {
        links[i].classList.add('is-hot'); hop(HOPS[i + 1].id, true);
        await travel(svg, links[i], { dur: 260 });
        links[i].classList.remove('is-hot');
        if (HOPS[i + 1].id === 'limit' && !allowed) {
          counters.limited++; set('limited', counters.limited);
          verdict.textContent = `429 · ${TIERS[tier].label} allows ${TIERS[tier].rpm} requests per minute — upgrade the subscription or wait`;
          verdict.style.fill = '#ff9f0a'; HOPS.forEach((h) => hop(h.id, false)); return;
        }
      }
      counters.ok++; set('ok', counters.ok); set('lat', `${TIERS[tier].lat} s`);
      verdict.textContent = `200 · answered by replica ${1 + (n % 3)} of granite-3.3-8b`; verdict.style.fill = '#7ee787';
      HOPS.forEach((h) => hop(h.id, false));
    };
    const btn = $('[data-send]', root);
    btn.addEventListener('click', async () => {
      btn.disabled = true; counters.ok = counters.limited = 0; set('ok', 0); set('limited', 0);
      for (let n = 0; n < 10 && alive; n++) { one(n); await sleep(220); }
      await sleep(1800); btn.disabled = false;
    });

    const copy = $('[data-role-copy]', root), slot = $('[data-role-window]', root);
    let rp = null;
    const role = (id) => {
      const r = ROLES[id];
      copy.innerHTML = html`<span class="quad__icon">${rhIcon(r.icon, { size: 26, color: '#ee0000' })}</span><h3 class="h2" style="margin-top:18px">${r.name}</h3>
        <ul class="can">${r.can.map((c) => `<li>${icon('check', { size: 20, color: '#3d7317', stroke: 2 })}<span>${c}</span></li>`)}</ul>`;
      rp?.stop();
      slot.innerHTML = consoleWindow({ ...r.win, body: r.screen(), cls: 'console--short' });
      rp = Sc.player($('.console', slot));
      if (r.scene) rp.play(r.scene);
    };
    mountSeg($('[data-role-seg]', root), role); role('dev');

    // Hero: the portal plays browse → create a key → usage
    const hp = Sc.player($('#portal-console', root));
    hp.play((w, live) => Sc.loop(w, live, [portalBrowse, portalKey, portalUsage], 2600));

    mountPlatform(root, 'maas');
    return () => { alive = false; hp.stop(); rp?.stop(); };
  },
};
