import site from '../data/site.js';
import { html, button, stats } from '../components/ui.js';
import { stack, mountStack } from '../viz/stack.js';

export default {
  id: 'hero',
  nav: { group: 'Overview', label: 'Home', icon: 'home' },
  render() {
    const h = site.hero;
    const title = h.highlight ? h.title.replace(h.highlight, `<em>${h.highlight}</em>`) : h.title;
    return html`<div class="mo-hero">
      <div class="mo-hero__text">
        <p class="mo-hero__eyebrow">${h.eyebrow}</p>
        <h1 class="mo-hero__title">${title}</h1>
        <p class="mo-hero__subtitle">${h.subtitle}</p>
        <div class="mo-hero__ctas">${(h.ctas ?? []).map((c) => button(c.label, { href: c.href, variant: c.variant ?? 'primary', ic: c.icon, external: /^https?:/.test(c.href) }))}</div>
      </div>
      <div class="mo-hero__visual">${stack(site.stack)}</div>
    </div>
    ${stats(site.stats)}`;
  },
  mount(el) { mountStack(el, site.stack); },
};
