import timeline from '../data/timeline.js';
import { html, card, sectionHeader, statusLabel, label, jiraLinks, expandable, mountExpandables, icon } from '../components/ui.js';


export default {
  id: 'timeline',
  nav: { group: 'Releases', label: 'Our journey', icon: 'history' },
  render() {
    const total = timeline.reduce((a, p) => a + p.milestones.length, 0);
    return html`${sectionHeader({ eyebrow: 'Our journey', title: 'How we got here.', description: `${timeline.length} phases and ${total} milestones — from the first Kubeflow contributions to a platform that ships RHOAI's modules.` })}
      <div class="mo-journey">
        ${timeline.map((p, i) => {
          const tone = 'blue';
          const last = i === timeline.length - 1;
          return html`<div class="mo-journey__phase mo-reveal ${last ? 'is-current' : ''}">
            <span class="mo-journey__dot">${icon(last ? 'in-progress' : 'check')}</span>
            ${card({
              secondary: true,
              header: html`<div style="width:100%"><div class="mo-row"><span class="mo-eyebrow" style="margin:0">${p.period}</span>${label(`${p.milestones.length} milestones`, { compact: true })}${p.badge ? label(p.badge, { compact: true, color: 'green' }) : ''}</div>
                <h3 class="pf-v6-c-title pf-m-lg" style="margin-top:6px">${p.title}</h3></div>`,
              body: html`<p class="mo-card-desc">${p.summary}</p>
                ${expandable('Show milestones', html`<div class="mo-milestones">${p.milestones.map((m) => html`<div class="mo-milestone">
                  <div class="mo-milestone__date">${m.date}</div>
                  <div><div class="mo-row"><span class="mo-milestone__title">${m.title}</span>${m.status && m.status !== 'delivered' ? statusLabel(m.status) : ''}${m.tag ? label(m.tag, { compact: true }) : ''}</div>
                  <div class="mo-card-desc">${m.description ?? ''}</div>${m.jira?.length ? jiraLinks(m.jira) : ''}</div></div>`)}</div>`, { open: !!p.open || last })}`,
            })}
          </div>`;
        })}
      </div>`;
  },
  mount(el) { mountExpandables(el); },
};
