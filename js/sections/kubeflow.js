import kf from '../data/kubeflow.js';
import { html, card, iconTile, sectionHeader, statusLabel, button, stats } from '../components/ui.js';

export default {
  id: 'kubeflow',
  nav: { group: 'What we enable', label: 'Kubeflow', icon: 'hybrid-cloud' },
  render() {
    const max = Math.max(...kf.contributors.map((c) => c.commits), 1);
    return html`${sectionHeader({ eyebrow: 'Open source', title: 'Kubeflow: the same platform, upstream.', description: kf.intro })}
      ${stats(kf.stats)}
      <div class="mo-split mo-reveal">
        <div>
          <h3 class="mo-subhead">Top Red Hat contributors</h3>
          <div class="mo-bars">${kf.contributors.map((c) => html`<div class="mo-bars__row">
            <span class="mo-bars__name">${c.name}</span>
            <span class="mo-bars__track"><span class="mo-bars__fill" style="--w:${(c.commits / max) * 100}%"></span></span>
            <span class="mo-bars__value">${c.commits.toLocaleString('en')}</span></div>`)}</div>
          ${kf.insightsUrl ? html`<div style="margin-top:12px">${button('View on LFX Insights', { href: kf.insightsUrl, variant: 'link', ic: 'external-link', external: true })}</div>` : ''}
        </div>
        <div>
          <h3 class="mo-subhead">Modules we brought upstream</h3>
          <div class="mo-grid mo-grid--2">${kf.projects.map((p) => card({ secondary: true, compact: true,
            header: html`<div class="mo-card-top" style="width:100%">${iconTile(p.icon, { size: 'sm' })}${statusLabel(p.status)}</div>`,
            body: html`<h3 class="mo-tile-title">${p.name}</h3><p class="mo-card-desc">${p.description}</p>`,
            footer: p.repo ? html`<a href="${p.repo}" target="_blank" rel="noopener">Repository ›</a>` : '' }))}</div>
        </div>
      </div>`;
  },
};
