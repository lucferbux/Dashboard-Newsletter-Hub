// Red Hat OpenShift AI — the main product page. Screens are the real console rebuilt with PatternFly (js/screens.js),
// animated by js/scenes.js.
import { html, icon, rhIcon, $, $$, mountScrolly, mountSeg, toggleGroup, label, reduced } from '../lib.js';
import { consoleWindow, go } from '../console.js';
import * as S from '../screens.js';
import * as Sc from '../scenes.js';
import { productsQuad, platformSection, mountPlatform } from '../shared.js';

const STEPS = [
  { k: 'Find', t: 'Start from the right model.', p: 'The AI hub catalog knows what every model can do — text generation, tool calling, vision, embeddings — and which ones Red Hat has validated on your hardware. MCP servers live in a governed catalog next to them.', scene: Sc.find, feat: [['AI hub'], ['Model catalog'], ['MCP servers']] },
  { k: 'Deploy', t: 'One wizard. Every runtime.', p: 'Pick hardware, a serving runtime and KServe or llm-d for distributed inference. Tool-calling arguments come pre-filled from the catalog, and one checkbox publishes the model through Models-as-a-Service.', scene: Sc.deploy, feat: [['Model serving'], ['llm-d'], ['Hardware profiles']] },
  { k: 'Share', t: 'Every model, a product.', p: 'Models and MCP servers become AI asset endpoints. Teams get API keys with subscriptions and token limits; you keep one place to govern them.', scene: Sc.share, feat: [['AI asset endpoints'], ['Models-as-a-Service']] },
  { k: 'Build', t: 'From a chat to an agent.', p: 'The Gen AI studio Playground lets you try models with your documents and MCP tools, compare them side by side, and take the generated code to your application.', scene: Sc.build, feat: [['Gen AI studio', 'green'], ['MCP'], ['RAG'], ['Guardrails']] },
  { k: 'Evaluate', t: 'Know before you ship.', p: 'EvalHub runs curated benchmark collections and your own, follows every run live, and keeps the results next to the model.', scene: Sc.evaluate, feat: [['Evaluations', 'orange']] },
  { k: 'Automate', t: 'Let the platform find the best answer.', p: 'AutoRAG tries retrieval patterns on your documents and ranks them; AutoML does the same for tabular data. Deploy the winner, or save it as a notebook.', scene: Sc.automate, feat: [['AutoRAG', 'green'], ['AutoML', 'green']] },
];

const PERSONAS = {
  ds: { name: 'Data scientist', icon: 'Experiment', current: 'projects', screen: S.workbenches,
    can: ['Open a GPU workbench in seconds, with your connections ready.', 'Turn notebooks into pipelines and track every run in experiments.', 'Let AutoML find a model and register it.'] },
  ai: { name: 'AI engineer', icon: 'ModelConnectionRocket', current: 'models', screen: () => S.deployments(),
    can: ['Pick a model by what it can do, not by its name.', 'Deploy it with KServe or llm-d from one wizard.', 'Prove it with evaluations before anyone depends on it.'] },
  agent: { name: 'Agent developer', icon: 'AiChatbot', current: 'playground', screen: () => S.playground({ tab: 'MCP' }),
    can: ['Prototype with documents and MCP tools in the Playground.', 'Compare models side by side on the same prompt.', 'Call governed models with your own API key.'] },
  admin: { name: 'Platform admin', icon: 'Permissions', current: 'hwprofiles', screen: S.hardwareProfiles,
    can: ['Enable only the features your teams need — nothing else runs.', 'Share GPUs fairly with hardware profiles and queues.', 'Govern models, MCP servers and access with MaaS subscriptions.'] },
};

// Features → the DataScienceCluster components they need (gates from the operator's module registry).
// pod: false = the feature runs inside the console, without a backend pod of its own.
const MODS = [
  { id: 'genAi', name: 'Gen AI Studio', d: 'Playground and AI asset endpoints', comps: [], on: true },
  { id: 'maas', name: 'Models-as-a-Service', d: 'Subscriptions, API keys, quotas', comps: ['aigateway.modelsAsAService'], on: true },
  { id: 'modelRegistry', name: 'AI Hub', d: 'Model catalog, registry, MCP servers', comps: ['aiHub'], on: true },
  { id: 'modelServing', name: 'Model serving', d: 'vLLM, NIM and llm-d deployments', comps: ['kserve'], on: true, pod: false },
  { id: 'evalHub', name: 'EvalHub', d: 'Needs TrustyAI', comps: ['trustyai'], on: false },
  { id: 'autorag', name: 'AutoRAG', d: 'Needs pipelines · brings Gen AI Studio', comps: ['aipipelines'], needs: ['genAi'], on: false },
  { id: 'automl', name: 'AutoML', d: 'Needs pipelines', comps: ['aipipelines'], on: false },
  { id: 'notebooks', name: 'Workbenches', d: 'Notebooks and IDEs on GPUs', comps: ['workbenches'], on: false },
  { id: 'mlflow', name: 'MLflow', d: 'Needs the MLflow operator', comps: ['mlflowoperator'], on: false },
];
const COMPS = ['aiHub', 'kserve', 'aigateway.modelsAsAService', 'aipipelines', 'trustyai', 'workbenches', 'mlflowoperator'];
export default {
  id: 'rhoai', label: 'OpenShift AI', title: 'Red Hat OpenShift AI', icon: 'AiExperience',
  render() {
    return html`
<section class="hero"><div class="wrap">
  <div class="hero__copy">
    <p class="eyebrow reveal">Red Hat OpenShift AI</p>
    <h1 class="h-hero reveal" style="--i:1">Your AI platform.<br><span class="grad">Every step, one place.</span></h1>
    <p class="lead reveal" style="--i:2">Find a model, deploy it, share it, build on it, measure it and automate it — on the hybrid cloud you already run, with only the features you choose.</p>
    <div class="cta reveal" style="--i:3"><a href="#journey">See how it works</a><a href="#configure">Make it yours</a></div>
  </div>
  <div class="hero__visual reveal" style="--i:4">${consoleWindow({ nav: S.RHOAI_NAV, current: 'models', body: S.catalog(), id: 'hero-console', cls: 'console--tall' })}</div>
</div></section>

<section class="section" id="journey"><div class="wrap">
  <div class="center"><p class="eyebrow reveal">One path</p><h2 class="h1 reveal">From “which model?”<br>to production.</h2>
  <p class="lead reveal">Six steps that used to need six tools. Scroll, and watch the console do them.</p></div>
  <div class="scrolly" data-scrolly>
    <div class="scrolly__steps">${STEPS.map((s, i) => html`<div class="scrolly__step"><span class="scrolly__num">0${i + 1} · ${s.k}</span><h3>${s.t}</h3><p>${s.p}</p><div class="feat">${s.feat.map(([f, c]) => label(f, c ?? '', { compact: false }))}</div></div>`)}</div>
    <div class="scrolly__stage"><div><div class="progress">${STEPS.map(() => '<i></i>').join('')}</div>${consoleWindow({ nav: S.RHOAI_NAV, current: 'models', body: S.catalog(), id: 'journey-console' })}</div></div>
  </div>
</div></section>

<section class="section tile-bg"><div class="wrap center">
  <p class="eyebrow reveal">Made for every role</p><h2 class="h1 reveal">The same platform.<br>Your view of it.</h2>
  ${toggleGroup('data-persona-seg', Object.entries(PERSONAS).map(([k, p]) => [k, p.name, p.icon]), 'ds', 'reveal')}
  <div class="split reveal">
    <div data-persona-copy></div>
    <div>${consoleWindow({ nav: S.RHOAI_NAV, current: 'projects', body: S.workbenches(), id: 'persona-console', cls: 'console--short' })}</div>
  </div>
</div></section>

<section class="section stage" id="configure"><div class="wrap">
  <div class="center"><p class="eyebrow reveal">Modular by design</p><h2 class="h1 reveal">Deploy only<br><span class="grad">what you need.</span></h2>
  <p class="lead reveal">Every feature is its own module, most with their own backend and their own pod. Switch features on and off; the Dashboard operator reconciles the cluster to match — nothing else runs, nothing else to patch.</p></div>
  <div class="config reveal">
    <div class="config__list">${MODS.map((m) => html`<div class="config__row"><label class="pf-v6-c-switch" for="mod-${m.id}"><input class="pf-v6-c-switch__input" type="checkbox" id="mod-${m.id}" data-mod="${m.id}" ${m.on ? 'checked' : ''}><span class="pf-v6-c-switch__toggle"></span><span class="pf-v6-c-switch__label"><span class="toggle__t">${m.name}</span><span class="toggle__d">${m.d}</span></span></label></div>`)}</div>
    <div class="cluster">
      <div class="cluster__head"><span>cluster · redhat-ods-applications</span><span data-reconcile>${label('Reconciled', 'green')}</span></div>
      <div class="cluster__cr" data-cr></div>
      <div class="pods" data-pods></div>
      <div class="cluster__foot"><div class="meter"><b data-m-mods>0</b><span>features enabled</span></div><div class="meter"><b data-m-pods>0</b><span>pods running</span></div><div class="meter"><b data-m-nav>0</b><span>components the operator manages</span></div></div>
    </div>
  </div>
  <p class="center muted reveal" style="margin-top:22px;font-size:13px">Simplified view of the DataScienceCluster the operator reconciles. Gates as in the operator: AutoRAG and AutoML need pipelines, EvalHub needs TrustyAI.</p>
</div></section>

<section class="section"><div class="wrap">
  <div class="center"><p class="eyebrow reveal">Ready for production</p><h2 class="h1 reveal">Secure by default.<br><span class="muted">Boring to upgrade.</span></h2></div>
  <div class="bento">
    <div class="card card--4 reveal"><p class="card__k">Ready for OpenShift 5</p><h3 class="card__title">Closed by default, open where it should be.</h3><p class="card__text">Every console module ships its own least-privilege network policy and follows the cluster's TLS profile, so the Dashboard is ready for the next OpenShift.</p></div>
    <div class="card card--2 reveal" style="--i:1"><p class="card__k">Least privilege</p><p class="card__big">1:1</p><p class="card__text">One pod, one service account, one role per feature.</p></div>
    <div class="card card--2 reveal" style="--i:2"><p class="card__k">Tested on every change</p><h3 class="card__title">Three layers before anything merges.</h3><p class="card__text">Integration, platform-contract conformance and a real-cluster install.</p></div>
    <div class="card card--2 reveal" style="--i:3"><p class="card__k">Isolation</p><h3 class="card__title">One feature fails. The rest keep working.</h3><p class="card__text">A failing module is marked Degraded; the console and every other module stay up.</p></div>
    <div class="card card--2 reveal" style="--i:4"><p class="card__k">Supply chain</p><h3 class="card__title">Small, distroless images.</h3><p class="card__text">Go backends in minimal images, scanned for vulnerabilities on every pull request.</p></div>
  </div>
  <div class="stats">
    <div class="stat reveal"><div class="stat__v">14</div><div class="stat__l">feature modules on one platform</div></div>
    <div class="stat reveal" style="--i:1"><div class="stat__v">3</div><div class="stat__l">capabilities GA in 3.6: Gen AI studio, AutoML, AutoRAG</div></div>
    <div class="stat reveal" style="--i:2"><div class="stat__v">4</div><div class="stat__l">products from one codebase</div></div>
    <div class="stat reveal" style="--i:3"><div class="stat__v">16</div><div class="stat__l">platform components you switch on or off</div></div>
  </div>
</div></section>

${platformSection('rhoai')}
${productsQuad('rhoai')}`;
  },

  mount(root) {
    const stop = [];
    // Journey: each step plays its scene in the sticky console
    const jw = $('#journey-console', root), bars = $$('.progress i', root), jp = Sc.player(jw);
    stop.push(mountScrolly($('[data-scrolly]', root), (i) => {
      bars.forEach((b, k) => b.classList.toggle('is-on', k <= i));
      jp.play(STEPS[i].scene);
    }), () => jp.stop());

    // Hero: the console plays the whole path on a loop, starting once visible
    const hw = $('#hero-console', root), hp = Sc.player(hw);
    if (!reduced()) {
      const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { io.disconnect(); hp.play((w, live) => Sc.loop(w, live, [Sc.find, Sc.deploy, Sc.build, Sc.evaluate])); } }, { threshold: .3 });
      io.observe(hw); stop.push(() => { io.disconnect(); hp.stop(); });
    }

    // Personas
    const pw = $('#persona-console', root), copy = $('[data-persona-copy]', root);
    const persona = (id) => {
      const p = PERSONAS[id];
      copy.innerHTML = html`<span class="quad__icon">${rhIcon(p.icon, { size: 26, color: '#ee0000' })}</span><h3 class="h2" style="margin-top:18px">${p.name}</h3>
        <ul class="can">${p.can.map((c) => `<li>${icon('check', { size: 20, color: '#3d7317', stroke: 2 })}<span>${c}</span></li>`)}</ul>`;
      go(pw, { current: p.current, body: p.screen() });
    };
    mountSeg($('[data-persona-seg]', root), persona); persona('ds');

    stop.push(mountConfigurator(root));
    mountPlatform(root, 'rhoai');
    return () => stop.forEach((f) => f?.());
  },
};

function mountConfigurator(root) {
  const state = Object.fromEntries(MODS.map((m) => [m.id, m.on]));
  const cr = $('[data-cr]', root), pods = $('[data-pods]', root), rec = $('[data-reconcile]', root);
  let timer;
  const settle = (msg) => {
    rec.innerHTML = label(msg, 'orange');
    clearTimeout(timer);
    timer = setTimeout(() => { rec.innerHTML = label('Reconciled', 'green'); $$('.is-reconciling', pods).forEach((p) => { p.classList.remove('is-reconciling'); $('.pod__state', p).textContent = 'Running'; }); }, 1400);
  };
  const draw = (fresh = []) => {
    const on = MODS.filter((m) => state[m.id]);
    const need = new Set(on.flatMap((m) => m.comps));
    const comp = (c) => { const [k, sub] = c.split('.'); const v = need.has(c) ? '<span class="v">Managed</span>' : null;
      return sub ? (v ? `    <span class="k">${k}</span>:\n      <span class="k">${sub}</span>: ${v}` : `    <span class="off">${k}.${sub}: Removed</span>`)
        : (v ? `    <span class="k">${k}</span>: ${v}` : `    <span class="off">${k}: Removed</span>`); };
    cr.innerHTML = `<span class="k">apiVersion</span>: datasciencecluster.opendatahub.io/v3\n<span class="k">kind</span>: DataScienceCluster\n<span class="k">spec</span>:\n  <span class="k">components</span>:\n    <span class="k">dashboard</span>: <span class="v">Managed</span>\n` + COMPS.map(comp).join('\n');
    const withPod = on.filter((m) => m.pod !== false);
    pods.innerHTML = `<div class="pod pod--core"><b>Dashboard</b><span>shell · Core BFF</span><div class="pod__state">Running</div></div>`
      + withPod.map((m) => `<div class="pod ${fresh.includes(m.id) ? 'is-reconciling' : ''}"><b>${m.name}</b><span>own UI · own BFF</span><div class="pod__state">${fresh.includes(m.id) ? 'Reconciling' : 'Running'}</div></div>`).join('');
    $('[data-m-mods]', root).textContent = on.length;
    $('[data-m-pods]', root).textContent = withPod.length + 1;
    $('[data-m-nav]', root).textContent = need.size + 1;
    $$('[data-mod]', root).forEach((b) => { if (b.matches('input')) b.checked = state[b.dataset.mod]; });
  };
  $$('input[data-mod]', root).forEach((b) => b.addEventListener('change', () => {
    const id = b.dataset.mod, m = MODS.find((x) => x.id === id), fresh = [];
    state[id] = !state[id];
    if (state[id]) { fresh.push(id); (m.needs ?? []).forEach((n) => { if (!state[n]) { state[n] = true; fresh.push(n); } }); }
    else MODS.filter((x) => x.needs?.includes(id) && state[x.id]).forEach((x) => { state[x.id] = false; });
    draw(fresh); settle(state[id] ? 'Reconciling' : 'Removing');
  }));
  draw();
  return () => clearTimeout(timer);
}
