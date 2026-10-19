import site from '../data/site.js';
import { html, button, label } from '../components/ui.js';
import { mountScene } from '../scenes/mount.js';

export default {
  id: 'hero',
  nav: { group: 'Overview', label: 'Home', icon: 'home' },
  render() {
    const h = site.hero;
    const title = h.highlight ? h.title.replace(h.highlight, `<em>${h.highlight}</em>`) : h.title;
    return html`<div class="mo-hero">
      <div class="mo-hero__text">
        ${label(h.eyebrow ?? site.team, { color: 'blue', ic: 'cubes' })}
        <h1 class="mo-hero__title">${title}</h1>
        <p class="mo-hero__subtitle">${h.subtitle}</p>
        <div class="mo-hero__ctas">${(h.ctas ?? []).map((c) => button(c.label, { href: c.href, variant: c.variant ?? 'primary', ic: c.icon, external: /^https?:/.test(c.href) }))}</div>
      </div>
      <div class="mo-hero__stage" data-scene="platform-stack"></div>
      <div class="mo-hero__stats">${site.stats.map((s) => html`<div class="mo-hero__stat"><div class="mo-hero__stat-value">${s.value}</div><div class="mo-hero__stat-label">${s.label}</div></div>`)}</div>
    </div>`;
  },
  mount(el) {
    el.querySelectorAll('[data-scene]').forEach(mountScene);
  },
};
