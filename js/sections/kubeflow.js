import kf from '../data/kubeflow.js';
import { html, card, iconTile, sectionHeader, statusLabel, button } from '../components/ui.js';

export default {
  id: 'kubeflow',
  nav: { group: 'What we enable', label: 'Kubeflow', icon: 'hybrid-cloud' },
  render() {
    const max = Math.max(...kf.contributors.map((c) => c.commits), 1);
    return html`${sectionHeader({ ic: 'hybrid-cloud', tone: 'green', title: 'Kubeflow — same platform, open source', description: kf.intro })}
      <div class="mo-grid mo-grid--3">
        ${kf.stats.map((s) => card({ cls: 'mo-reveal', body: html`<div class="mo-metric__value" style="--c: var(--mo-green)">${s.value}</div><div class="mo-metric__label">${s.label}</div><div class="mo-card-desc">${s.description ?? ''}</div>` }))}
      </div>
      <div class="mo-subhead">Top Red Hat contributors</div>
      ${card({ body: html`<div class="mo-grid" style="gap:10px">${kf.contributors.map((c) => html`<div class="mo-row" style="flex-wrap:nowrap"><span style="width:160px;font-weight:600">${c.name}</span>
          <div style="flex:1" class="pf-v6-c-progress pf-m-sm pf-m-success"><div class="pf-v6-c-progress__bar" role="progressbar" aria-valuenow="${c.commits}" aria-valuemax="${max}" aria-label="${c.name} commits"><div class="pf-v6-c-progress__indicator" style="width:${(c.commits / max) * 100}%"></div></div></div>
          <span class="mo-muted" style="width:110px;text-align:right;font-size:13px">${c.commits.toLocaleString('en')} commits</span></div>`)}</div>`,
        footer: kf.insightsUrl ? button('View on LFX Insights', { href: kf.insightsUrl, variant: 'link', ic: 'external-link', external: true }) : '' })}
      <div class="mo-subhead">Modules we brought upstream</div>
      <div class="mo-grid mo-grid--4">
        ${kf.projects.map((p) => card({ cls: 'mo-reveal', header: html`<div class="mo-card-top" style="width:100%">${iconTile(p.icon, { tone: 'green', size: 'sm' })}${statusLabel(p.status)}</div>`,
          body: html`<div class="mo-card-name mo-card-name--plain">${p.name}</div><p class="mo-card-desc">${p.description}</p>`,
          footer: p.repo ? html`<a href="${p.repo}" target="_blank" rel="noopener">Repository →</a>` : '' }))}
      </div>`;
  },
};
