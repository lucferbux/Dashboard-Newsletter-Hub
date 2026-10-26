// Red Hat AI Inference on any Kubernetes (xKS) — the same experience outside OpenShift.
import { label, html, curve, travel, $, $$, mountSeg, setSeg, toggleGroup, sleep, reduced } from '../lib.js';
import { consoleWindow } from '../console.js';
import * as S from '../screens.js';
import * as Sc from '../scenes.js';
import { productsQuad, platformSection, mountPlatform } from '../shared.js';

const PLATFORMS = {
  ocp: { name: 'OpenShift', win: { url: 'rhoai-dashboard.apps.ocp.example.com', nav: S.RHOAI_NAV, current: 'models' }, screen: () => S.deployments(),
    rows: [['Sign-in', 'OpenShift OAuth'], ['Routing', 'OpenShift Route'], ['TLS', 'Service CA'], ['Install', 'OLM · one pod per feature'], ['Backend', 'Core BFF']] },
  aks: { name: 'Azure AKS', win: { url: 'ai.aks.example.com', nav: S.XKS_NAV, current: 'deployments', logo: 'assets/red-hat-ai-light.svg', user: 'ana@contoso.com' }, screen: S.xksDeployments,
    rows: [['Sign-in', 'Microsoft Entra ID (OIDC)'], ['Routing', 'Gateway API · HTTPRoute'], ['TLS', 'cert-manager'], ['Install', 'Helm · one container'], ['Backend', 'Core BFF + kube-rbac-proxy']] },
};

const BUILDS = [
  { id: 'rhoai', t: 'OpenShift AI', s: 'Every module' },
  { id: 'maas', t: 'MaaS Portal', s: 'Self-service' },
  { id: 'xks', t: 'Red Hat AI on AKS', s: 'Single container' },
  { id: 'aigrid', t: 'AI Grid', s: 'Tenant portal' },
];
function buildSvg() {
  const W = 1040, H = 360, sx = 40, sy = H / 2 - 36, bx = 380, tx = 760;
  let s = `<g class="node"><rect x="${sx}" y="${sy}" width="200" height="72" rx="18"/><text class="node__t" x="${sx + 100}" y="${sy + 32}" text-anchor="middle">One commit</text><text class="node__s" x="${sx + 100}" y="${sy + 51}" text-anchor="middle">odh-dashboard monorepo</text></g>`;
  s += `<path class="link" data-b0 d="M${sx + 200},${H / 2} L${bx},${H / 2}"/>`;
  s += `<g class="node is-hot"><rect x="${bx}" y="${sy}" width="220" height="72" rx="18"/><text class="node__t" x="${bx + 110}" y="${sy + 32}" text-anchor="middle">Shared tests &amp; build</text><text class="node__s" x="${bx + 110}" y="${sy + 51}" text-anchor="middle">Same code, four packages</text></g>`;
  BUILDS.forEach((b, i) => {
    const y = 30 + i * 82;
    s += `<path class="link" data-bl="${i}" d="${curve(bx + 220, H / 2, tx, y + 28)}"/>`;
    s += `<g class="node" data-build="${b.id}"><rect x="${tx}" y="${y}" width="240" height="56" rx="14"/><text class="node__t" x="${tx + 18}" y="${y + 25}">${b.t}</text><text class="node__s" x="${tx + 18}" y="${y + 43}">${b.s}</text></g>`;
  });
  return `<svg class="diagram" viewBox="0 0 ${W} ${H}" data-build-svg>${s}</svg>`;
}

export default {
  id: 'xks', label: 'xKS', title: 'Red Hat AI on any Kubernetes', icon: 'RhUiCluster',
  render() {
    return html`
<section class="hero"><div class="wrap center">
  <p class="eyebrow reveal">Red Hat AI Inference · xKS ${label('Technology Preview', 'orange')}</p>
  <h1 class="h-hero reveal" style="--i:1">Your cloud's Kubernetes.<br><span class="grad">Our AI experience.</span></h1>
  <p class="lead reveal" style="--i:2" >Serve models on Azure AKS with the same catalog, the same deployment wizard and the same views your OpenShift teams use. No second product to learn, no fork to maintain.</p>
  ${toggleGroup('data-plat-seg', Object.entries(PLATFORMS).map(([k, p]) => [k, p.name, k === 'aks' ? 'RhUiCluster' : 'AiExperience']), 'aks', 'reveal')}
  <div class="reveal" style="--i:4;max-width:900px;margin:44px auto 0" data-plat-window></div>
</div></section>

<section class="section tile-bg"><div class="wrap">
  <div class="center"><p class="eyebrow reveal">What changes</p><h2 class="h1 reveal">Different plumbing.<br><span class="muted">Same product.</span></h2>
  <p class="lead reveal">Only the parts that touch the platform change. Switch platforms above, or here, and watch which ones.</p>
  ${toggleGroup('data-plat-seg2', Object.entries(PLATFORMS).map(([k, p]) => [k, p.name, k === 'aks' ? 'RhUiCluster' : 'AiExperience']), 'aks', 'reveal')}</div>
  <div class="bento" data-plumbing style="margin-top:44px"></div>
</div></section>

<section class="section stage"><div class="wrap">
  <div class="center"><p class="eyebrow reveal">Built once</p><h2 class="h1 reveal">One commit.<br><span class="grad">Every platform.</span></h2>
  <p class="lead reveal">Every product is built from the same codebase and tested together, so a fix lands everywhere at once.</p></div>
  <div class="reveal" style="margin-top:44px">${buildSvg()}</div>
  <div class="center reveal"><button class="pf-v6-c-button pf-m-primary pf-m-display-lg" data-ship><span class="pf-v6-c-button__text">Ship a fix</span></button></div>
</div></section>

<section class="section"><div class="wrap">
  <div class="center"><p class="eyebrow reveal">Made to fit</p><h2 class="h1 reveal">Light enough to drop in.</h2></div>
  <div class="bento">
    <div class="card card--4 reveal"><p class="card__k">One container</p><h3 class="card__title">The whole interface, one small image.</h3><p class="card__text">The web app and its Go backend ship together in a single distroless container, with kube-rbac-proxy in front. Nothing else to run.</p></div>
    <div class="card card--2 reveal" style="--i:1"><p class="card__k">Your identity</p><h3 class="card__title">Entra ID, out of the box.</h3><p class="card__text">Standard OIDC, so users sign in the way they already do.</p></div>
    <div class="card card--3 reveal" style="--i:2"><p class="card__k">Kubernetes-native</p><h3 class="card__title">Gateway API and cert-manager.</h3><p class="card__text">The routing and certificates your platform team already trusts.</p></div>
    <div class="card card--3 reveal" style="--i:3"><p class="card__k">One Helm chart</p><h3 class="card__title">No OLM, no OpenShift.</h3><p class="card__text">The operator runs in inference mode and reconciles the Gateway API, LeaderWorkerSet and Istio pieces for your cloud.</p></div>
  </div>
</div></section>

${platformSection('xks')}
${productsQuad('xks')}`;
  },

  mount(root) {
    let alive = true;
    const win = $('[data-plat-window]', root), plumbing = $('[data-plumbing]', root);
    const segs = [$('[data-plat-seg]', root), $('[data-plat-seg2]', root)];
    let last = null, xp = null;
    const pick = (id) => {
      const p = PLATFORMS[id], prev = last && PLATFORMS[last];
      win.innerHTML = consoleWindow({ ...p.win, body: p.screen() });
      xp?.stop(); xp = Sc.player($('.console', win));
      if (id === 'aks') xp.play((w, live) => Sc.loop(w, live, [Sc.xksDeploy], 3000));
      plumbing.innerHTML = p.rows.map(([k, v], i) => {
        const changed = prev && prev.rows[i][1] !== v;
        return `<div class="card card--2 ${changed ? 'is-changed' : ''}" style="min-height:0;${changed ? 'box-shadow:inset 0 0 0 2px #ee0000' : ''}"><p class="card__k">${k}</p><h3 class="card__title" style="font-size:22px">${v}</h3></div>`;
      }).join('') + `<div class="card card--2" style="min-height:0"><p class="card__k">Everything else</p><h3 class="card__title" style="font-size:22px">Identical</h3></div>`;
      segs.forEach((s) => setSeg(s, id));
      last = id;
    };
    segs.forEach((s) => mountSeg(s, pick));
    pick('aks');

    const svg = $('[data-build-svg]', root), btn = $('[data-ship]', root);
    const ship = async () => {
      btn.disabled = true;
      const l0 = $('[data-b0]', svg); l0.classList.add('is-hot'); await travel(svg, l0, { dur: 700 }); l0.classList.remove('is-hot');
      await Promise.all($$('[data-bl]', svg).map(async (l, i) => {
        await sleep(i * 90); l.classList.add('is-hot'); await travel(svg, l, { dur: 800 });
        $(`[data-build="${BUILDS[i].id}"]`, svg).classList.add('is-hot');
      }));
      await sleep(1600);
      $$('[data-bl], [data-build]', svg).forEach((e) => e.classList.remove('is-hot'));
      btn.disabled = false;
    };
    btn.addEventListener('click', ship);
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting && alive && !reduced()) { ship(); io.disconnect(); } }, { threshold: .6 });
    io.observe(svg);

    mountPlatform(root, 'xks');
    return () => { alive = false; io.disconnect(); xp?.stop(); };
  },
};
