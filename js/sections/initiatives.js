import initiatives from '../data/initiatives.js';
import { html, sectionHeader, statusLabel, jiraUrl, label } from '../components/ui.js';

export default {
  id: 'initiatives',
  nav: { group: 'What is next', label: 'Initiatives', icon: 'flag' },
  render() {
    return html`${sectionHeader({ eyebrow: 'Initiatives', title: 'In flight now.', description: 'Strategies and initiatives we own or drive, straight from Jira.' })}
      <div class="mo-table-wrap"><table class="pf-v6-c-table pf-m-grid-lg" role="grid">
        <thead class="pf-v6-c-table__thead"><tr class="pf-v6-c-table__tr">
          <th class="pf-v6-c-table__th" scope="col">Initiative</th><th class="pf-v6-c-table__th" scope="col">Area</th><th class="pf-v6-c-table__th" scope="col">Status</th></tr></thead>
        <tbody class="pf-v6-c-table__tbody">${initiatives.map((x) => html`<tr class="pf-v6-c-table__tr">
          <td class="pf-v6-c-table__td" data-label="Initiative"><div><a href="${jiraUrl(x.key)}" target="_blank" rel="noopener" class="mo-jira__link">${x.key}</a>${x.release ? ' ' + label(x.release, { compact: true, outline: true }) : ''}</div>
            <div style="font-weight:600;margin-top:2px">${x.title}</div><div class="mo-card-desc">${x.description ?? ''}</div></td>
          <td class="pf-v6-c-table__td" data-label="Area">${label(x.area ?? '—', { compact: true })}</td>
          <td class="pf-v6-c-table__td" data-label="Status">${statusLabel(x.status)}</td></tr>`)}</tbody></table></div>`;
  },
};
