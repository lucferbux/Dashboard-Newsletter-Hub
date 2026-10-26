// Four products, one page each. The hash (#rhoai, #maas, #xks, #aigrid) selects the tab; each page module exports
// { id, label, render(), mount(root) → cleanup }.
import { $, $$, mountReveals, rhIcon } from './lib.js';
import rhoai from './pages/rhoai.js';
import maas from './pages/maas.js';
import xks from './pages/xks.js';
import aigrid from './pages/aigrid.js';

const PAGES = [rhoai, maas, xks, aigrid];
const app = $('#app');
const tabs = $('#tabs');
let cleanup = [];

tabs.innerHTML = PAGES.map((p) => `<li class="pf-v6-c-tabs__item" role="presentation"><button class="pf-v6-c-tabs__link" role="tab" data-id="${p.id}" aria-selected="false">
  <span class="pf-v6-c-tabs__item-icon">${rhIcon(p.icon, { size: 16 })}</span><span class="pf-v6-c-tabs__item-text">${p.label}</span></button></li>`).join('');
tabs.addEventListener('click', (e) => { const b = e.target.closest('[data-id]'); if (b) go(b.dataset.id); });
document.addEventListener('click', (e) => {
  const a = e.target.closest('[data-go]');
  if (a) { e.preventDefault(); go(a.dataset.go); return; }
  // In-page links (#journey, #configure…) scroll within the current tab; only product ids change tab.
  const link = e.target.closest('a[href^="#"]');
  const id = link?.getAttribute('href').slice(1);
  if (id && !PAGES.some((p) => p.id === id)) { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
});
addEventListener('hashchange', () => { const id = location.hash.slice(1); if (PAGES.some((p) => p.id === id)) show(id); });

function go(id) { if (location.hash.slice(1) !== id) location.hash = id; else show(id); }

function show(id) {
  const page = PAGES.find((p) => p.id === id) ?? PAGES[0];
  cleanup.forEach((f) => f?.()); cleanup = [];
  $$('[data-id]', tabs).forEach((t) => { const on = t.dataset.id === page.id; t.setAttribute('aria-selected', String(on)); t.parentElement.classList.toggle('pf-m-current', on); });
  document.title = `${page.title} — Red Hat OpenShift AI`;
  app.style.opacity = 0;
  requestAnimationFrame(() => {
    app.innerHTML = page.render();
    scrollTo({ top: 0, behavior: 'instant' });
    cleanup.push(mountReveals(app), page.mount?.(app));
    requestAnimationFrame(() => { app.style.transition = 'opacity .5s cubic-bezier(.2,.8,.2,1)'; app.style.opacity = 1; });
  });
}

show(location.hash.slice(1) || 'rhoai');
