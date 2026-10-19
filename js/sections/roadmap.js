import roadmap from '../data/roadmap.js';
import { html, card, iconTile, sectionHeader, statusLabel, label, jiraLinks, icon } from '../components/ui.js';

const OWNER = { pewter: ['purple', 'Led by our team'], oversight: ['teal', 'Planned & overseen by us'], shared: ['blue', 'Enabled by our platform'] };

export default {
  id: 'roadmap',
  nav: { group: 'What is next', label: `RHOAI ${roadmap.release} exploration`, icon: 'lab' },
  render() {
    return html`${sectionHeader({ ic: 'lab', tone: 'purple', eyebrow: 'Exploring', title: `Toward RHOAI ${roadmap.release}`, description: roadmap.disclaimer })}
      <div class="mo-grid mo-grid--2">
        ${roadmap.themes.map((t) => {
          const [tone, who] = OWNER[t.owner] ?? ['grey', ''];
          return card({ cls: 'mo-card--accent mo-reveal', attrs: `id="roadmap-${t.id}" style="--c: var(--mo-${t.tone})"`,
            header: html`<div class="mo-card-top" style="width:100%">${iconTile(t.icon, { tone: t.tone, size: 'lg' })}<div class="mo-row" style="justify-content:flex-end">${who ? label(who, { compact: true, color: tone }) : ''}</div></div>`,
            body: html`<div class="mo-card-name mo-card-name--plain" style="font-size:20px">${t.title}</div><p class="mo-card-desc">${t.summary}</p>
              <div style="margin-top:14px">${t.items.map((i) => html`<div class="mo-roadmap-item"><div>${statusLabel(i.status)}</div><div><div>${i.title}</div>${i.description ? html`<div class="mo-card-desc">${i.description}</div>` : ''}${i.jira?.length ? jiraLinks(i.jira) : ''}</div></div>`)}</div>`,
            footer: t.jira?.length ? html`<span class="mo-muted" style="font-size:13px">Parent: </span>${jiraLinks(t.jira)}` : '' });
        })}
      </div>`;
  },
};
