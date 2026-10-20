import metrics from '../data/metrics.js';
import { html, sectionHeader, label, stats } from '../components/ui.js';

export default {
  id: 'metrics',
  nav: { group: 'Overview', label: 'Impact', icon: 'trend-up' },
  render() {
    return html`${sectionHeader({ eyebrow: 'Impact', title: 'What the platform makes possible.', description: 'Numbers from the teams building on it.' })}
      ${stats(metrics.cards.map((m) => ({ value: m.value, suffix: m.suffix, label: m.label, description: m.description })))}
      ${metrics.pills?.length ? html`<div class="mo-row mo-reveal" style="margin-top:20px">${metrics.pills.map((p) => label(html`<strong>${p.value}</strong>&nbsp;${p.label}`, { outline: true }))}</div>` : ''}`;
  },
};
