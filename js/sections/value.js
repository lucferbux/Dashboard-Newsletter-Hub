import value from '../data/value.js';
import { html, card, iconTile, sectionHeader } from '../components/ui.js';

const TONES = ['blue', 'purple', 'green'];

export default {
  id: 'value',
  nav: { group: 'What is next', label: 'Strategic value', icon: 'star' },
  render() {
    return html`${sectionHeader({ ic: 'star', tone: 'yellow', title: 'Strategic value', description: 'Why a platform team pays off for RHOAI.' })}
      <div class="mo-grid mo-grid--3">${value.map((v, i) => card({ cls: 'mo-card--accent mo-reveal', attrs: `style="--c: var(--mo-${TONES[i % 3]})"`,
        header: iconTile(v.icon, { tone: TONES[i % 3], size: 'lg' }),
        body: html`<div class="mo-card-name mo-card-name--plain" style="font-size:20px">${v.title}</div><p class="mo-card-desc">${v.description}</p>
          ${v.points?.length ? html`<ul class="mo-points">${v.points.map((p) => html`<li>${p}</li>`)}</ul>` : ''}` }))}</div>`;
  },
};
