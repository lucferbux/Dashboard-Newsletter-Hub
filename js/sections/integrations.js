import integrations from '../data/integrations.js';
import { html, card, iconTile, sectionHeader, label } from '../components/ui.js';

export default {
  id: 'integrations',
  nav: { group: 'What we enable', label: 'Integrations', icon: 'plug' },
  render() {
    return html`${sectionHeader({ ic: 'plug', tone: 'teal', title: 'External integrations', description: 'Third-party products plug into the same modular architecture — through a proxy or a dedicated BFF — and render natively inside RHOAI.' })}
      <div class="mo-grid mo-grid--2">
        ${integrations.map((x) => card({
          cls: 'mo-reveal',
          header: html`<div class="mo-card-top" style="width:100%">${iconTile(x.icon, { tone: 'teal' })}${label(x.pattern, { compact: true, color: 'teal', ic: 'route' })}</div>`,
          body: html`<div class="mo-card-name mo-card-name--plain">${x.name}</div><p class="mo-card-desc">${x.description}</p>`,
          footer: x.links?.length ? html`<div class="mo-row">${x.links.map((l) => html`<a href="${l.href}" target="_blank" rel="noopener">${l.label} →</a>`)}</div>` : '',
        }))}
      </div>`;
  },
};
