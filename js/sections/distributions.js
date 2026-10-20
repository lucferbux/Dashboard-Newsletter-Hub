import dist from '../data/distributions.js';
import { html, sectionHeader, statusLabel, jiraLinks, icon } from '../components/ui.js';
import { fanout, mountFanout } from '../viz/fanout.js';

export default {
  id: 'distributions',
  nav: { group: 'How it is built', label: 'Distributions', icon: 'distribute' },
  render() {
    return html`${sectionHeader({ eyebrow: 'Distributions', title: 'One codebase, several products.', description: dist.intro })}
      <div class="mo-reveal">${fanout(dist)}</div>
      ${html`<details class="mo-details mo-reveal"><summary>Compare all distributions</summary>
      <div class="mo-table-wrap"><table class="pf-v6-c-table pf-m-grid-md pf-m-compact" role="grid">
        <thead class="pf-v6-c-table__thead"><tr class="pf-v6-c-table__tr"><th class="pf-v6-c-table__th" scope="col">Distribution</th>${dist.columns.map((c) => html`<th class="pf-v6-c-table__th" scope="col">${c}</th>`)}<th class="pf-v6-c-table__th" scope="col">Status</th></tr></thead>
        <tbody class="pf-v6-c-table__tbody">${dist.rows.map((r) => html`<tr class="pf-v6-c-table__tr">
          <td class="pf-v6-c-table__td" data-label="Distribution"><span class="mo-row" style="flex-wrap:nowrap">${r.icon ? icon(r.icon) : ''}<strong>${r.name}</strong></span>${r.jira?.length ? html`<div>${jiraLinks(r.jira)}</div>` : ''}</td>
          ${r.cells.map((c, i) => html`<td class="pf-v6-c-table__td" data-label="${dist.columns[i]}">${c}</td>`)}
          <td class="pf-v6-c-table__td" data-label="Status">${statusLabel(r.status)}</td></tr>`)}</tbody>
      </table></div></details>`}`;
  },
  mount(el) { mountFanout(el, dist); },
};
