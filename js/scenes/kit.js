// Small three.js kit shared by every diorama: themed colours from PatternFly tokens, a stage with
// orbit controls and DOM labels, hover/click picking, packets moving along paths, and a render loop
// that only runs while the stage is on screen.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export { THREE };
export const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Read a CSS custom property as a hex colour (PatternFly tokens follow the active theme). */
export function token(name) {
  const probe = document.createElement('span');
  probe.style.color = `var(${name})`;
  document.body.appendChild(probe);
  const c = getComputedStyle(probe).color;
  probe.remove();
  return new THREE.Color(c).getStyle();
}
export const palette = () => ({
  blue: token('--mo-blue'), purple: token('--mo-purple'), teal: token('--mo-teal'), green: token('--mo-green'),
  orange: token('--mo-orange'), yellow: token('--mo-yellow'), red: token('--mo-red'), grey: token('--mo-grey'),
  brand: token('--mo-brand'), text: token('--mo-text'), subtle: token('--mo-subtle'), border: token('--mo-border'),
  bg: token('--mo-bg'), bg2: token('--mo-bg-2'),
});

export function webglOK() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
}

/**
 * Create a stage inside `el`. Returns helpers; call `stage.dispose()` to tear down.
 * opts: { camera:[x,y,z], target:[x,y,z], fov, autoRotate }
 */
export function createStage(el, { camera = [9, 7, 11], target = [0, 1, 0], fov = 36, autoRotate = false } = {}) {
  el.classList.add('mo-stage');
  const w = () => el.clientWidth || 600;
  const h = () => el.clientHeight || 400;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(w(), h());
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  el.appendChild(renderer.domElement);

  const labels = new CSS2DRenderer();
  labels.setSize(w(), h());
  Object.assign(labels.domElement.style, { position: 'absolute', inset: '0', pointerEvents: 'none' });
  el.appendChild(labels.domElement);

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(fov, w() / h(), 0.1, 200);
  cam.position.set(...camera);

  scene.add(new THREE.AmbientLight(0xffffff, 1.6));
  const sun = new THREE.DirectionalLight(0xffffff, 2.2);
  sun.position.set(6, 12, 8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -14, right: 14, top: 14, bottom: -14 });
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0xffffff, 0.6);
  fill.position.set(-8, 4, -6);
  scene.add(fill);

  const controls = new OrbitControls(cam, renderer.domElement);
  controls.target.set(...target);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.minPolarAngle = 0.35;
  controls.maxPolarAngle = 1.35;
  controls.autoRotate = autoRotate && !reduced();
  controls.autoRotateSpeed = 0.5;
  controls.enableDamping = true;
  controls.addEventListener('start', () => (controls.autoRotate = false));

  // ---- picking ----
  const ray = new THREE.Raycaster();
  const ptr = new THREE.Vector2();
  const pickables = [];
  let hovered = null;
  function pick(ev) {
    const r = renderer.domElement.getBoundingClientRect();
    ptr.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, cam);
    const hit = ray.intersectObjects(pickables, true)[0];
    let o = hit?.object;
    while (o && !o.userData.pick) o = o.parent;
    return o ?? null;
  }
  renderer.domElement.addEventListener('pointermove', (ev) => {
    const o = pick(ev);
    if (o === hovered) return;
    hovered?.userData.onHover?.(false);
    hovered = o;
    o?.userData.onHover?.(true);
    renderer.domElement.style.cursor = o ? 'pointer' : '';
  });
  let down = null;
  renderer.domElement.addEventListener('pointerdown', (ev) => (down = [ev.clientX, ev.clientY]));
  renderer.domElement.addEventListener('pointerup', (ev) => {
    if (!down || Math.hypot(ev.clientX - down[0], ev.clientY - down[1]) > 5) return;
    pick(ev)?.userData.onClick?.();
  });

  // ---- loop (only while visible) ----
  const tickers = new Set();
  const clock = new THREE.Clock();
  let visible = false;
  let raf = 0;
  function frame() {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    tickers.forEach((f) => f(dt));
    controls.update();
    renderer.render(scene, cam);
    labels.render(scene, cam);
  }
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) { clock.getDelta(); frame(); }
    if (!visible && raf) { cancelAnimationFrame(raf); raf = 0; }
  });
  io.observe(el);
  const ro = new ResizeObserver(() => {
    cam.aspect = w() / h();
    cam.updateProjectionMatrix();
    renderer.setSize(w(), h());
    labels.setSize(w(), h());
  });
  ro.observe(el);

  return {
    scene, camera: cam, controls, el,
    onTick(fn) { tickers.add(fn); return () => tickers.delete(fn); },
    pickable(obj, { onClick, onHover } = {}) {
      obj.userData.pick = true;
      obj.userData.onClick = onClick;
      obj.userData.onHover = onHover;
      pickables.push(obj);
      return obj;
    },
    dispose() {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      renderer.dispose();
      el.innerHTML = '';
    },
  };
}

/* ---------- primitives ---------- */
export function block(size, color, { radius = 0.08, opacity = 1, emissive = 0 } = {}) {
  const geo = new RoundedBoxGeometry(size[0], size[1], size[2], 3, Math.min(radius, Math.min(...size) / 2.1));
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.05, transparent: opacity < 1, opacity, emissive: color, emissiveIntensity: emissive });
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}
export function cylinder(rTop, rBottom, height, color, { segments = 48, opacity = 1 } = {}) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBottom, height, segments),
    new THREE.MeshStandardMaterial({ color, roughness: 0.45, transparent: opacity < 1, opacity, emissive: color, emissiveIntensity: 0.1 }));
  m.castShadow = true;
  return m;
}
export function sphere(r, color, emissive = 0.2) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 32), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: emissive }));
  m.castShadow = true;
  return m;
}
export function ground(radius, color, y = -0.01) {
  const m = new THREE.Mesh(new THREE.CircleGeometry(radius, 72), new THREE.MeshStandardMaterial({ color, roughness: 1, transparent: true, opacity: 0.7 }));
  m.rotation.x = -Math.PI / 2;
  m.position.y = y;
  m.receiveShadow = true;
  return m;
}

/** DOM label pinned in 3D. Returns the CSS2DObject; `.element` is the div. */
export function label(text, color, { small = false, muted = false } = {}) {
  const d = document.createElement('div');
  d.className = `mo-stage__label ${muted ? 'mo-stage__label--muted' : ''}`;
  d.style.setProperty('--c', color);
  if (small) d.style.fontSize = '10px';
  d.textContent = text;
  return new CSS2DObject(d);
}

/** A curve through points, drawn as a dashed line, with `count` glowing packets travelling along it. */
export function flow(stage, points, color, { count = 3, speed = 0.22, size = 0.08, dashed = true, opacity = 0.65 } = {}) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)), false, 'catmullrom', 0.2);
  const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(64));
  const mat = dashed
    ? new THREE.LineDashedMaterial({ color, dashSize: 0.18, gapSize: 0.12, transparent: true, opacity })
    : new THREE.LineBasicMaterial({ color, transparent: true, opacity });
  const line = new THREE.Line(geo, mat);
  if (dashed) line.computeLineDistances();
  const group = new THREE.Group();
  group.add(line);
  const dots = Array.from({ length: count }, () => {
    const s = sphere(size, color, 0.9);
    s.castShadow = false;
    group.add(s);
    return s;
  });
  let t = Math.random();
  const state = { running: true, stopAt: null };
  const off = stage.onTick((dt) => {
    if (state.running && !reduced()) t = (t + dt * speed) % 1;
    dots.forEach((d, i) => {
      const u = (t + i / count) % 1;
      const show = state.running && (state.stopAt == null || u < state.stopAt);
      d.visible = show;
      if (show) d.position.copy(curve.getPointAt(u));
    });
  });
  return Object.assign(group, {
    set(opts) { Object.assign(state, opts); line.material.opacity = state.running ? opacity : opacity * 0.3; },
    remove() { off(); group.parent?.remove(group); },
  });
}

/** Smoothly move an object toward a target position every frame. */
export function glide(stage, obj, speed = 6) {
  const target = obj.position.clone();
  stage.onTick((dt) => {
    if (reduced()) obj.position.copy(target);
    else obj.position.lerp(target, Math.min(1, dt * speed));
  });
  return (x, y, z) => target.set(x, y, z);
}

/** Overlay panel + chip controls helpers (DOM). */
export function overlay(el) {
  const controls = document.createElement('div');
  controls.className = 'mo-stage__controls';
  const panel = document.createElement('div');
  panel.className = 'mo-stage__panel';
  const hint = document.createElement('div');
  hint.className = 'mo-stage__hint';
  hint.textContent = 'Drag to rotate · click a piece';
  el.append(controls, panel, hint);
  return {
    chip(text, { pressed = false, color, onClick } = {}) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'mo-chip';
      b.textContent = text;
      b.setAttribute('aria-pressed', String(pressed));
      if (color) b.style.setProperty('--c', color);
      b.addEventListener('click', onClick);
      controls.appendChild(b);
      return b;
    },
    text(t) { const s = document.createElement('span'); s.className = 'mo-chip'; s.style.cursor = 'default'; s.textContent = t; controls.appendChild(s); },
    show(title, body, color) {
      panel.style.setProperty('--c', color ?? '');
      panel.innerHTML = `<h4>${title}</h4><p>${body}</p>`;
    },
  };
}
