import value from '../data/value.js';
import { html, card, iconTile, sectionHeader } from '../components/ui.js';


export default {
  id: 'value',
  nav: { group: 'What is next', label: 'Strategic value', icon: 'star' },
  render() {
    return html`${sectionHeader({ eyebrow: 'Strategic value', title: 'Why a platform team pays off.', description: 'What RHOAI gets from having one team own the foundation.' })}
      <div class="mo-grid mo-grid--3">${value.map((v, i) => card({ secondary: true, cls: 'mo-reveal', attrs: `style="--i:${i}"`,
        header: iconTile(v.icon),
        body: html`<h3 class="mo-tile-title mo-tile-title--lg">${v.title}</h3><p class="mo-card-desc">${v.description}</p>
          ${v.points?.length ? html`<ul class="mo-points">${v.points.map((p) => html`<li>${p}</li>`)}</ul>` : ''}` }))}</div>`;
  },
};
