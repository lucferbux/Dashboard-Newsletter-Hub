// Release explorer: one tab per RHOAI release (from data/releases.js) plus the next release in
// exploration (from data/roadmap.js). Ticks render as a PatternFly progress stepper.
import releases from '../data/releases.js';
import roadmap from '../data/roadmap.js';
import { html, card, iconTile, sectionHeader, statusLabel, label, jiraLinks, tabs, mountTabs, stepper, progress, icon } from '../components/ui.js';

const fmt = (d) => (d ? new Date(d + 'T12:00:00').toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric' }) : '');

function releasePanel(r) {
  const ticks = r.ticks ?? [];
  const done = ticks.filter((t) => t.status === 'delivered').length;
  const firstOpen = ticks.findIndex((t) => t.status !== 'delivered');
  const steps = ticks.map((t, i) => ({
    title: html`${t.name} · ${fmt(t.date)}`,
    description: t.title ?? '',
    status: t.status === 'delivered' ? 'success' : i === firstOpen ? 'current' : 'pending',
  }));
  const pct = r.progress ? (r.progress.done / r.progress.total) * 100 : ticks.length ? (done / ticks.length) * 100 : r.status === 'delivered' ? 100 : 0;
  const areas = [...new Set((r.highlights ?? []).map((h) => h.area).filter(Boolean))];
  return html`
    <div class="mo-release-head">
      <div>
        <div class="mo-row">${statusLabel(r.status, { compact: false })}${r.ga ? label(`GA ${fmt(r.ga)}`, { ic: 'calendar', compact: false }) : ''}</div>
        <h3 class="pf-v6-c-title pf-m-xl" style="margin-top:12px">${r.title ?? `RHOAI ${r.version}`}</h3>
        ${r.theme ? html`<div class="mo-eyebrow" style="margin-top:4px">${r.theme}</div>` : ''}
        <p class="mo-card-desc" style="margin-top:8px;font-size:15px">${r.summary ?? ''}</p>
      </div>
      <div>${progress(pct, { title: r.progress?.label ?? `${done} of ${ticks.length || 1} release milestones shipped`, variant: pct >= 100 ? 'success' : '' })}</div>
    </div>
    ${steps.length ? stepper(steps) : ''}
    ${(r.ticks ?? []).some((t) => t.description) ? html`<div class="mo-grid mo-grid--3" style="margin-top:16px">${ticks.map((t) => card({ compact: true, cls: 'mo-reveal',
        header: html`<div class="mo-card-top" style="width:100%"><strong>${t.name}</strong>${statusLabel(t.status)}</div>`,
        body: html`<div class="mo-card-name mo-card-name--plain" style="margin-top:0;font-size:15px">${t.title ?? ''}</div><p class="mo-card-desc">${t.description ?? ''}</p>` }))}</div>` : ''}
    ${r.highlights?.length ? html`<div class="mo-subhead">Highlights</div>
      ${areas.length > 1 ? html`<div class="mo-row" style="margin-bottom:12px" data-area-filter>${['all', ...areas].map((a) => html`<button type="button" class="mo-chip" aria-pressed="${a === 'all'}" data-area="${a}">${a === 'all' ? 'All areas' : a.replace(/-/g, ' ')}</button>`)}</div>` : ''}
      <div class="mo-grid mo-grid--2">${r.highlights.map((h, i) => card({ secondary: true, cls: 'mo-reveal', attrs: `data-area="${h.area ?? ''}" style="--i:${i % 4}"`,
        header: html`<div class="mo-card-top" style="width:100%">${iconTile(h.icon ?? 'star')}${statusLabel(h.status)}</div>`,
        body: html`<div class="mo-highlight-area" style="margin-top:12px">${(h.area ?? '').replace(/-/g, ' ')}</div><div class="mo-card-name mo-card-name--plain" style="margin-top:2px">${h.title}</div><p class="mo-card-desc">${h.description}</p>`,
        footer: html`<div class="mo-row">${(h.tags ?? []).map((t) => label(t, { compact: true, color: 'blue' }))}</div>${h.jira?.length ? html`<div style="margin-top:8px">${jiraLinks(h.jira)}</div>` : ''}` }))}</div>` : ''}
    ${r.unlocks?.items?.length ? html`<div class="mo-subhead">What it unlocks</div>${r.unlocks.intro ? html`<p class="mo-card-desc" style="margin-bottom:12px">${r.unlocks.intro}</p>` : ''}
      <div class="mo-grid mo-grid--4">${r.unlocks.items.map((u) => card({ compact: true, secondary: true, cls: 'mo-reveal', header: iconTile(u.icon ?? 'star', { size: 'sm' }), body: html`<strong>${u.title}</strong><p class="mo-card-desc">${u.description}</p>` }))}</div>` : ''}
    ${r.improvements?.items?.length ? html`<div class="mo-subhead">Before → after</div>${r.improvements.intro ? html`<p class="mo-card-desc" style="margin-bottom:12px">${r.improvements.intro}</p>` : ''}
      <div class="mo-table-wrap"><table class="pf-v6-c-table pf-m-grid-md pf-m-compact"><thead class="pf-v6-c-table__thead"><tr class="pf-v6-c-table__tr"><th class="pf-v6-c-table__th">Aspect</th><th class="pf-v6-c-table__th">Before</th><th class="pf-v6-c-table__th">After</th></tr></thead>
      <tbody class="pf-v6-c-table__tbody">${r.improvements.items.map((x) => html`<tr class="pf-v6-c-table__tr"><td class="pf-v6-c-table__td" data-label="Aspect"><strong>${x.label}</strong></td><td class="pf-v6-c-table__td mo-muted" data-label="Before">${x.before}</td><td class="pf-v6-c-table__td" data-label="After"><span style="color:var(--pf-t--global--color--status--success--default)">${icon('check-circle-fill')}</span> ${x.after}</td></tr>`)}</tbody></table></div>` : ''}
    ${r.partners?.items?.length ? html`<div class="mo-subhead">Teams we enabled</div>${r.partners.intro ? html`<p class="mo-card-desc" style="margin-bottom:12px">${r.partners.intro}</p>` : ''}
      <div class="mo-grid mo-grid--3">${r.partners.items.map((p) => card({ compact: true, secondary: true, cls: 'mo-reveal', header: html`<div class="mo-row">${iconTile('users', { size: 'sm' })}<strong>${p.name}</strong></div>`, body: html`${p.role ? html`<div class="mo-highlight-area">${p.role}</div>` : ''}<p class="mo-card-desc">${p.description ?? ''}</p>` }))}</div>` : ''}`;
}

function nextPanel() {
  return html`<div class="pf-v6-c-alert pf-m-info pf-m-inline" style="margin:20px 0"><div class="pf-v6-c-alert__icon">${icon('information')}</div><p class="pf-v6-c-alert__title">${roadmap.disclaimer}</p></div>
    <div class="mo-grid mo-grid--3">${roadmap.themes.map((t, i) => card({ secondary: true, cls: 'mo-reveal', attrs: `style="--i:${i % 3}"`,
      header: html`<div class="mo-card-top" style="width:100%">${iconTile(t.icon)}${statusLabel('exploring')}</div>`,
      body: html`<div class="mo-card-name mo-card-name--plain">${t.title}</div><p class="mo-card-desc">${t.summary}</p>`,
      footer: html`<a href="#roadmap">${t.items.length} candidates →</a>` }))}</div>`;
}

export default {
  id: 'releases',
  nav: { group: 'Releases', label: 'Release explorer', icon: 'package' },
  render() {
    const items = releases.map((r) => ({ label: `RHOAI ${r.version}`, content: releasePanel(r) }));
    items.push({ label: `RHOAI ${roadmap.release} · exploring`, icon: 'lab', content: nextPanel() });
    const current = Math.max(0, releases.findIndex((r) => r.status === 'in-progress'));
    return html`${sectionHeader({ eyebrow: 'Releases', title: 'What each release delivered.', description: 'Milestones from early access to GA, the highlights by area, and what they made possible.' })}
      ${tabs('releases', items, { active: releases[current]?.status === 'in-progress' ? current : releases.length - 1 })}`;
  },
  mount(el) {
    mountTabs(el);
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-area-filter] [data-area]');
      if (!b) return;
      const panel = b.closest('.mo-tab-panel');
      panel.querySelectorAll('[data-area-filter] [data-area]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      panel.querySelectorAll('.pf-v6-c-card[data-area]').forEach((c) => (c.hidden = b.dataset.area !== 'all' && c.dataset.area !== b.dataset.area));
    });
  },
};
