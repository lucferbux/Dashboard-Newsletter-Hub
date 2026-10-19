// Renders the page from js/sections/index.js inside a PatternFly 6 page shell (masthead, grouped
// sidebar nav, main sections), and wires theme switching, the sidebar toggle, scroll-spy and reveals.
import sections from './sections/index.js';
import site from './data/site.js';
import { html, icon, button } from './components/ui.js';

const $ = (s, r = document) => r.querySelector(s);

/* ---------- Masthead ---------- */
const THEMES = [
  { id: 'light', label: 'Light', icon: 'light-mode' },
  { id: 'dark', label: 'Dark', icon: 'dark-mode' },
  { id: 'felt', label: 'Felt (3.7 preview)', icon: 'enhancement' },
];
function currentTheme() {
  const h = document.documentElement.classList;
  return h.contains('pf-v6-theme-felt') ? 'felt' : h.contains('pf-v6-theme-dark') ? 'dark' : 'light';
}
$('#masthead').innerHTML = html`
  <div class="pf-v6-c-masthead__main">
    <span class="pf-v6-c-masthead__toggle">
      <button class="pf-v6-c-button pf-m-plain" type="button" aria-label="Toggle navigation" aria-expanded="true" id="nav-toggle"><span class="pf-v6-c-button__icon">${icon('menu-bars')}</span></button>
    </span>
    <div class="pf-v6-c-masthead__brand">
      <a class="pf-v6-c-masthead__logo mo-brand" href="#hero">
        <span class="mo-brand__mark">${icon('cubes')}</span>
        <span class="mo-brand__text"><span class="mo-brand__product">Red Hat OpenShift AI</span><span class="mo-brand__team">${site.team}</span></span>
      </a>
    </div>
  </div>
  <div class="pf-v6-c-masthead__content">
    <div class="pf-v6-c-toolbar pf-m-static"><div class="pf-v6-c-toolbar__content"><div class="pf-v6-c-toolbar__content-section" style="justify-content:flex-end;gap:8px;width:100%">
      <div class="pf-v6-c-toggle-group" role="group" aria-label="Theme" id="theme-group">
        ${THEMES.map((t) => html`<div class="pf-v6-c-toggle-group__item"><button type="button" class="pf-v6-c-toggle-group__button" data-theme="${t.id}" aria-label="${t.label} theme" title="${t.label}"><span class="pf-v6-c-toggle-group__icon">${icon(t.icon)}</span></button></div>`)}
      </div>
      ${button('GitHub', { href: site.links.github, variant: 'plain', ic: 'github', external: true })}
    </div></div></div>
  </div>`;

function paintTheme() {
  const t = currentTheme();
  document.querySelectorAll('#theme-group button').forEach((b) => { const on = b.dataset.theme === t; b.classList.toggle('pf-m-selected', on); b.setAttribute('aria-pressed', String(on)); });
}
$('#theme-group').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-theme]');
  if (!b) return;
  const t = b.dataset.theme;
  document.documentElement.classList.toggle('pf-v6-theme-dark', t === 'dark');
  document.documentElement.classList.toggle('pf-v6-theme-felt', t === 'felt');
  try { localStorage.setItem('mo-theme', t); } catch { /* private mode */ }
  paintTheme();
});
paintTheme();

/* ---------- Sidebar nav (grouped, with icons — like the RHOAI nav) ---------- */
const groups = [...new Set(sections.map((s) => s.nav.group))];
$('#sidebar').innerHTML = html`<div class="pf-v6-c-page__sidebar-main"><div class="pf-v6-c-page__sidebar-body">
  <nav class="pf-v6-c-nav" aria-label="Sections">
    ${groups.map((g) => html`<section class="pf-v6-c-nav__section" aria-labelledby="nav-${g.replace(/\W+/g, '-')}">
      <h2 class="pf-v6-c-nav__section-title" id="nav-${g.replace(/\W+/g, '-')}">${g}</h2>
      <ul class="pf-v6-c-nav__list" role="list">
        ${sections.filter((s) => s.nav.group === g).map((s) => html`<li class="pf-v6-c-nav__item"><a href="#${s.id}" class="pf-v6-c-nav__link" data-nav="${s.id}">
          <span class="pf-v6-c-nav__link-icon">${icon(s.nav.icon)}</span><span class="pf-v6-c-nav__link-text">${s.nav.label}</span></a></li>`)}
      </ul></section>`)}
  </nav></div></div>`;

const sidebar = $('#sidebar');
const toggle = $('#nav-toggle');
const mobile = () => matchMedia('(max-width: 1199px)').matches;
function setNav(open) {
  sidebar.classList.toggle('pf-m-expanded', open);
  sidebar.classList.toggle('pf-m-collapsed', !open);
  toggle.setAttribute('aria-expanded', String(open));
}
setNav(!mobile());
matchMedia('(max-width: 1199px)').addEventListener('change', (e) => setNav(!e.matches));
toggle.addEventListener('click', () => setNav(!sidebar.classList.contains('pf-m-expanded')));
sidebar.addEventListener('click', (e) => { if (e.target.closest('a') && mobile()) setNav(false); });

/* ---------- Main: one PatternFly page section per data section, plus the footer ---------- */
$('#main').innerHTML = sections.map((s, i) => html`<section class="pf-v6-c-page__main-section mo-section ${i % 2 && i ? 'pf-m-secondary' : ''}" id="${s.id}" aria-label="${s.nav.label}">
    <div class="pf-v6-c-page__main-body"><div class="mo-wrap">${s.render()}</div></div></section>`).join('') + html`
  <section class="pf-v6-c-page__main-section mo-section"><div class="pf-v6-c-page__main-body"><div class="mo-wrap mo-footer">
    <div class="mo-brand"><span class="mo-brand__mark">${icon('cubes')}</span><span class="mo-brand__text"><span class="mo-brand__product">${site.team}</span><span class="mo-brand__team">${site.footerNote ?? 'Red Hat OpenShift AI'}</span></span></div>
    <nav aria-label="Footer">${site.footer.map((f) => html`<a href="${f.href}" target="_blank" rel="noopener">${f.label}</a>`)}</nav>
  </div></div></section>`;

sections.forEach((s) => { try { s.mount?.($('#' + s.id)); } catch (e) { console.error('mount failed:', s.id, e); } });

/* ---------- Scroll-spy for the nav ---------- */
const links = new Map([...document.querySelectorAll('[data-nav]')].map((a) => [a.dataset.nav, a]));
const spy = new IntersectionObserver((entries) => {
  entries.filter((e) => e.isIntersecting).forEach((e) => {
    links.forEach((a, id) => { const on = id === e.target.id; a.classList.toggle('pf-m-current', on); on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'); });
  });
}, { rootMargin: '-35% 0px -60% 0px' });
sections.forEach((s) => spy.observe($('#' + s.id)));

/* ---------- Reveal on scroll (progressive: content is visible if this never runs) ---------- */
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const reveals = document.querySelectorAll('.mo-reveal');
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('mo-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -5% 0px' });
  reveals.forEach((r) => {
    if (r.getBoundingClientRect().top < innerHeight) r.classList.add('mo-in');
    io.observe(r);
  });
  document.documentElement.classList.add('mo-reveal-ready');
  // Safety net: never leave anything hidden (fast scrolls, screenshots, printing).
  setTimeout(() => reveals.forEach((r) => r.classList.add('mo-in')), 4000);
}
