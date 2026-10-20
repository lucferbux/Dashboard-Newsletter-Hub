import areas from '../data/areas.js';
import { html, card, iconTile, sectionHeader, jiraLinks } from '../components/ui.js';

// Bento rhythm for 7 areas: two wide, three narrow, two wide (6-column grid).
const SPAN = [3, 3, 2, 2, 2, 3, 3];

export default {
  id: 'about',
  nav: { group: 'Overview', label: 'What we own', icon: 'cubes' },
  render() {
    return html`${sectionHeader({ eyebrow: 'What we own', title: 'Seven areas, one platform.', description: 'The platform engineering team inside the RHOAI Dashboard: the architecture, runtime and tooling every feature team builds on.' })}
      <div class="mo-bento">
        ${areas.map((a, i) => card({
          secondary: true,
          cls: 'mo-reveal',
          attrs: `style="--span:${SPAN[i % SPAN.length]};--i:${i}"`,
          header: iconTile(a.icon),
          body: html`<h3 class="mo-tile-title">${a.title}</h3><p class="mo-card-desc">${a.summary}</p>
            ${a.points?.length ? html`<ul class="mo-points">${a.points.map((p) => html`<li>${p}</li>`)}</ul>` : ''}`,
          footer: a.jira?.length ? jiraLinks(a.jira) : '',
        }))}
      </div>`;
  },
};
