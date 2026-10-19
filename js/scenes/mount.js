// Lazy 3D: three.js and the scene code load only when the container comes near the viewport,
// and the scene is rebuilt when the theme changes so its colours follow PatternFly tokens.
const scenes = {
  'platform-stack': () => import('./platform-stack.js'),
  'module-federation': () => import('./module-federation.js'),
  distributions: () => import('./distributions.js'),
};

function webglOK() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
}

export function mountScene(el) {
  const load = scenes[el.dataset.scene];
  if (!load) return console.warn('Unknown scene', el.dataset.scene);
  if (!webglOK()) { el.innerHTML = '<div class="mo-stage__fallback">3D view needs WebGL, which is turned off in this browser.</div>'; return; }
  let stage = null;
  const start = async () => {
    stage?.dispose();
    el.innerHTML = '';
    try { stage = (await load()).default(el); }
    catch (e) { console.error(e); el.innerHTML = '<div class="mo-stage__fallback">The 3D view could not load.</div>'; }
  };
  const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); start(); } }, { rootMargin: '300px' });
  io.observe(el);
  new MutationObserver(() => stage && start()).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}
