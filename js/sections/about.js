import areas from '../data/areas.js';
import { html, card, iconTile, sectionHeader, jiraLinks } from '../components/ui.js';

const TONES = ['blue', 'purple', 'teal', 'orange', 'green', 'red', 'yellow'];

export default {
  id: 'about',
  nav: { group: 'Overview', label: 'What we own', icon: 'cubes' },
  render() {
    return html`${sectionHeader({ ic: 'cubes', title: 'What the Dashboard Platform team owns', description: 'The platform engineering team inside the RHOAI Dashboard: the architecture, runtime and tooling every feature team builds on.' })}
      <div class="mo-grid mo-grid--3">
        ${areas.map((a, i) => card({
          cls: 'mo-card--accent mo-reveal',
          attrs: `style="--c: var(--mo-${TONES[i % TONES.length]})"`,
          header: iconTile(a.icon, { tone: TONES[i % TONES.length] }),
          body: html`<div class="mo-card-name mo-card-name--plain">${a.title}</div><p class="mo-card-desc">${a.summary}</p>
            ${a.points?.length ? html`<ul class="mo-points">${a.points.map((p) => html`<li>${p}</li>`)}</ul>` : ''}`,
          footer: a.jira?.length ? jiraLinks(a.jira) : '',
        }))}
      </div>`;
  },
};
