import roadmap from '../data/roadmap.js';
import { html, card, iconTile, sectionHeader, statusLabel, label, jiraLinks, icon } from '../components/ui.js';

const OWNER = { pewter: ['blue', 'Led by our team'], oversight: ['purple', 'Planned & overseen by us'], shared: ['grey', 'Enabled by our platform'] };

export default {
  id: 'roadmap',
  nav: { group: 'What is next', label: `RHOAI ${roadmap.release} exploration`, icon: 'lab' },
  render() {
    return html`${sectionHeader({ eyebrow: `Exploring for ${roadmap.release}`, title: 'What comes next.', description: roadmap.disclaimer })}
      <div class="mo-grid mo-grid--2">
        ${roadmap.themes.map((t) => {
          const [tone, who] = OWNER[t.owner] ?? ['grey', ''];
          return card({ secondary: true, cls: 'mo-reveal', attrs: `id="roadmap-${t.id}"`,
            header: html`<div class="mo-card-top" style="width:100%">${iconTile(t.icon)}<div class="mo-row" style="justify-content:flex-end">${who ? label(who, { compact: true, color: tone }) : ''}</div></div>`,
            body: html`<h3 class="mo-tile-title mo-tile-title--lg">${t.title}</h3><p class="mo-card-desc">${t.summary}</p>
              <div style="margin-top:14px">${t.items.map((i) => html`<div class="mo-roadmap-item"><div>${statusLabel(i.status)}</div><div><div>${i.title}</div>${i.description ? html`<div class="mo-card-desc">${i.description}</div>` : ''}${i.jira?.length ? jiraLinks(i.jira) : ''}</div></div>`)}</div>`,
            footer: t.jira?.length ? html`<span class="mo-muted" style="font-size:13px">Parent: </span>${jiraLinks(t.jira)}` : '' });
        })}
      </div>`;
  },
};
