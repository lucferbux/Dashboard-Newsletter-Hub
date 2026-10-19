// Hero diorama: the RHOAI stack as five slabs; the Dashboard layer (ours) glows. Click a slab or a chip.
import { createStage, block, label, overlay, palette, glide, THREE } from './kit.js';

const LAYERS = [
  { id: 'openshift', name: 'OpenShift', tone: 'red', chips: ['OLM', 'Gateway API', 'OAuth / OIDC', 'RBAC'], text: 'The substrate: operators install through OLM, traffic flows through Routes and the Gateway API, and OAuth/OIDC plus RBAC decide who can do what.' },
  { id: 'platform', name: 'RHOAI platform', tone: 'orange', chips: ['Operator', 'DSC / DSCI', 'Gateway', 'Auth proxy'], text: 'The RHOAI operator reconciles every component from the DataScienceCluster; one platform gateway authenticates every request.' },
  { id: 'components', name: 'Components', tone: 'blue', chips: ['KServe', 'llm-d', 'MaaS', 'Registry', 'Pipelines', 'Workbenches'], text: 'Serving, Models-as-a-Service, model registry, pipelines, workbenches, evaluation, training — each owned by its feature team.' },
  { id: 'dashboard', name: 'Dashboard · our team', tone: 'purple', ours: true, chips: ['Module Federation', 'Go BFFs', 'Core BFF', 'Dashboard Operator'], text: 'Our layer: the modular host that loads every feature team\'s module at runtime, the Go BFFs behind them and the operator that deploys it all — so 10+ teams ship independently.' },
  { id: 'surfaces', name: 'Distributions', tone: 'teal', chips: ['RHOAI', 'MaaS Portal', 'xKS'], text: 'The same code packaged three ways: the full RHOAI dashboard on OpenShift, the MaaS Consumer Portal, and RHAII on any Kubernetes (xKS).' },
];

export default function platformStack(el) {
  const c = palette();
  const stage = createStage(el, { camera: [13, 9.5, 14.5], target: [0, 2.9, 0], autoRotate: true });
  const ui = overlay(el);
  const W = 7, D = 4.4, H = 0.34;
  let focus = 'dashboard';
  const slabs = [];

  LAYERS.forEach((l, i) => {
    const g = new THREE.Group();
    const color = c[l.tone];
    const slab = block([W, H, D], color, { radius: 0.14, emissive: l.ours ? 0.18 : 0 });
    g.add(slab);
    const cols = Math.min(l.chips.length, 3);
    l.chips.forEach((name, k) => {
      const row = Math.floor(k / cols), col = k % cols;
      const n = Math.min(cols, l.chips.length - row * cols);
      const x = (col - (n - 1) / 2) * 2.1, z = -0.85 + row * 1.5;
      const chip = block([1.75, 0.26, 0.9], c.bg, { radius: 0.07 });
      chip.position.set(x, H / 2 + 0.14, z);
      g.add(chip);
      const lb = label(name, color, { small: true });
      lb.position.set(x, H / 2 + 0.5, z);
      lb.visible = false;
      chip.userData.label = lb;
      g.add(lb);
    });
    const name = label(l.name, color);
    name.position.set(W / 2 + 0.3, 0, D / 2 - 0.3);
    g.add(name);
    stage.scene.add(g);
    stage.pickable(g, { onClick: () => select(l.id) });
    const move = glide(stage, g, 5);
    slabs.push({ l, g, move, name, slab });
  });

  const chips = {};
  LAYERS.slice().reverse().forEach((l) => {
    chips[l.id] = ui.chip(l.name.replace(' · our team', ''), { color: c[l.tone], onClick: () => select(l.id) });
  });

  function select(id) {
    focus = id;
    slabs.forEach(({ l, g, move, name, slab }, i) => {
      const on = l.id === id;
      move(0, i * 1.15 + (on ? 0.45 : 0), 0);
      slab.material.opacity = on ? 1 : 0.55;
      slab.material.transparent = !on;
      name.element.classList.toggle('mo-stage__label--muted', !on);
      g.children.forEach((ch) => { if (ch.userData.label) ch.userData.label.visible = on; });
    });
    Object.entries(chips).forEach(([k, b]) => b.setAttribute('aria-pressed', String(k === id)));
    const l = LAYERS.find((x) => x.id === id);
    ui.show(l.name, l.text, c[l.tone]);
  }
  select(focus);
  return stage;
}
