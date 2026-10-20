import integrations from '../data/integrations.js';
import { html, card, iconTile, sectionHeader, label } from '../components/ui.js';

export default {
  id: 'integrations',
  nav: { group: 'What we enable', label: 'Integrations', icon: 'plug' },
  render() {
    return html`${sectionHeader({ eyebrow: 'Integrations', title: 'Third-party products, native in RHOAI.', description: 'External products plug into the same modular architecture, through a proxy or a dedicated BFF, and render inside the dashboard.' })}
      <div class="mo-grid mo-grid--2">
        ${integrations.map((x, i) => card({
          secondary: true, cls: 'mo-reveal', attrs: `style="--i:${i}"`,
          header: html`<div class="mo-card-top" style="width:100%">${iconTile(x.icon)}${label(x.pattern, { compact: true, ic: 'route' })}</div>`,
          body: html`<h3 class="mo-tile-title">${x.name}</h3><p class="mo-card-desc">${x.description}</p>`,
          footer: x.links?.length ? html`<div class="mo-row">${x.links.map((l) => html`<a href="${l.href}" target="_blank" rel="noopener">${l.label} ›</a>`)}</div>` : '',
        }))}
      </div>`;
  },
};
