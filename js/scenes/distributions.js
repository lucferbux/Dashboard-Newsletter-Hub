// Distributions diorama: one monorepo, three products. Pick a surface and watch what gets built and
// where it lands: RHOAI on OpenShift, the MaaS Consumer Portal, or RHAII on any Kubernetes (xKS).
import { createStage, block, cylinder, label, overlay, palette, flow, ground, sphere, THREE } from './kit.js';

const SURFACES = [
  { id: 'rhoai', name: 'RHOAI on OpenShift', tone: 'red', pos: [-6, 0, 3.5],
    text: 'The full dashboard: every enabled module, the Core BFF and the Dashboard Operator, installed by OLM next to the RHOAI operator. Users sign in with OpenShift OAuth or the cluster\'s OIDC.' },
  { id: 'maas', name: 'MaaS Consumer Portal', tone: 'teal', pos: [0, 0, -6],
    text: 'A consumer-only surface from the same code: model endpoints, API keys, subscriptions and the playground — for people who just call models. 3.7 explores it as the AI Grid tenant UI.' },
  { id: 'xks', name: 'RHAII on xKS', tone: 'orange', pos: [6, 0, 3.5],
    text: 'RHAII on non-OpenShift Kubernetes (AKS first): model deployment UI installed by a Helm chart, operator-managed operands and a Core BFF that does not assume OpenShift APIs.' },
];

export default function distributions(el) {
  const c = palette();
  const stage = createStage(el, { camera: [11, 9.5, 13.5], target: [0, 1, 0], autoRotate: true });
  const ui = overlay(el);
  stage.scene.add(ground(11, c.bg));

  // The monorepo in the middle: a stack of packages.
  const repo = new THREE.Group();
  ['frontend', 'packages', 'BFFs', 'manifests'].forEach((n, i) => {
    const b = block([2.8, 0.42, 2.2], i % 2 ? c.purple : c.blue, { radius: 0.1 });
    b.position.y = 0.25 + i * 0.5;
    repo.add(b);
  });
  const rl = label('odh-dashboard monorepo', c.brand);
  rl.position.set(0, 2.6, 0);
  repo.add(rl);
  stage.scene.add(repo);
  stage.pickable(repo, { onClick: () => ui.show('One monorepo', 'Frontend packages, Go BFFs and kustomize manifests live together. A distribution is a declarative selection of them — no forks.', c.brand) });

  const flows = {};
  const groups = {};
  SURFACES.forEach((s) => {
    const color = c[s.tone];
    const g = new THREE.Group();
    g.position.set(...s.pos);
    const base = block([3.6, 0.35, 2.8], c.bg2, { radius: 0.14 });
    base.position.y = 0.18;
    g.add(base);
    // the pods that land on this surface
    const pods = s.id === 'rhoai' ? 6 : s.id === 'maas' ? 2 : 3;
    for (let k = 0; k < pods; k++) {
      const p = block([0.6, 0.6, 0.6], color);
      p.position.set(-1.2 + (k % 3) * 1.2, 0.68 + Math.floor(k / 3) * 0.7, -0.5 + Math.floor(k / 3) * 0.1);
      g.add(p);
    }
    if (s.id === 'maas') {
      const u = sphere(0.32, color);
      u.position.set(1.1, 0.75, 0.6);
      g.add(u);
    }
    if (s.id === 'xks') {
      const helm = cylinder(0.35, 0.35, 0.5, c.orange);
      helm.position.set(1.2, 0.6, 0.7);
      g.add(helm);
    }
    const l = label(s.name, color);
    l.position.set(0, 2.2, 0);
    g.add(l);
    stage.scene.add(g);
    stage.pickable(g, { onClick: () => select(s.id) });
    groups[s.id] = { g, l };
    const mid = [s.pos[0] * 0.5, 2.4, s.pos[2] * 0.5];
    flows[s.id] = flow(stage, [[0, 2.2, 0], mid, [s.pos[0], 1.2, s.pos[2]]], color, { count: 3, size: 0.09 });
    stage.scene.add(flows[s.id]);
  });

  const chips = {};
  ui.text('Build for:');
  SURFACES.forEach((s) => (chips[s.id] = ui.chip(s.name, { color: c[s.tone], onClick: () => select(s.id) })));

  function select(id) {
    SURFACES.forEach((s) => {
      const on = s.id === id;
      flows[s.id].set({ running: on });
      groups[s.id].l.element.classList.toggle('mo-stage__label--muted', !on);
      chips[s.id].setAttribute('aria-pressed', String(on));
    });
    const s = SURFACES.find((x) => x.id === id);
    ui.show(s.name, s.text, c[s.tone]);
  }
  select('rhoai');
  return stage;
}
