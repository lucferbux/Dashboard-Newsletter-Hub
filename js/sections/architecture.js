import arch from '../data/architecture.js';
import { html, card, sectionHeader, tabs, mountTabs, label, descriptionList, iconTile, jiraLinks } from '../components/ui.js';
import modules from '../data/modules.js';
import { federation, mountFederation } from '../viz/federation.js';

const OWNER = { pewter: ['blue', 'Our team'], platform: ['grey', 'Platform'], components: ['grey', 'Feature teams'], openshift: ['grey', 'OpenShift'], future: ['grey', 'Next'] };

function layerList(list, containers = []) {
  const ic = { pod: 'container', container: 'container', deployment: 'application', service: 'network', cr: 'template' };
  return html`<div class="mo-layers">${list.map((l) => {
    const [tone, who] = OWNER[l.owner] ?? ['grey', ''];
    const inside = containers.filter((c) => c.layer === l.id);
    return html`<div class="mo-layer ${l.owner === 'pewter' ? 'mo-layer--pewter' : ''}" style="--c: var(--mo-${tone})">
      <div><div class="mo-layer__name">${l.name}${who ? label(who, { compact: true, color: tone }) : ''}</div>${l.note ? html`<div class="mo-card-desc">${l.note}</div>` : ''}</div>
      <div>
        <div class="mo-layer__items">${(l.items ?? []).map((i, k) => html`<span title="${(l.itemNotes?.[k] ?? l.itemNotes?.[i] ?? '').replace(/"/g, '&quot;')}">${label(i, { compact: true })}</span>`)}</div>
        ${inside.length ? html`<div class="mo-grid mo-grid--2" style="margin-top:${l.items?.length ? '10px' : '0'};gap:8px">${inside.map((c) => html`<div class="mo-row" style="flex-wrap:nowrap;align-items:flex-start">${iconTile(ic[c.kind] ?? 'container', { size: 'sm' })}<div><strong>${c.name}</strong>${c.port ? html` <span class="mo-muted" style="font-size:12px">:${c.port}</span>` : ''}<div class="mo-card-desc">${c.description ?? ''}</div></div></div>`)}</div>` : ''}
      </div>
    </div>`;
  })}</div>`;
}

function diagram(d) {
  return html`<div class="mo-subhead">${d.title}</div>${d.intro ? html`<p class="mo-card-desc" style="margin-bottom:12px;max-width:80ch">${d.intro}</p>` : ''}
    ${d.layers?.length ? layerList(d.layers) : ''}
    ${d.cards?.length ? html`<div class="mo-grid mo-grid--3" style="margin-top:12px">${d.cards.map((c) => card({ compact: true, secondary: true, title: c.title, body: html`<p class="mo-card-desc">${c.description}</p>` }))}</div>` : ''}`;
}

function tab(t) {
  const placed = new Set(t.layers.map((l) => l.id));
  const loose = (t.containers ?? []).filter((c) => !placed.has(c.layer));
  return html`<p class="mo-section-header__desc" style="margin:16px 0">${t.intro ?? ''}</p>
    ${layerList(t.layers, t.containers)}
    ${loose.length ? html`<div class="mo-subhead">What runs on the cluster</div>${layerList([{ id: '_', name: 'Pods', owner: 'pewter', items: [] }], loose.map((c) => ({ ...c, layer: '_' })))}` : ''}
    ${(t.diagrams ?? []).map(diagram)}
    ${t.facts?.length ? html`<div class="mo-subhead">Key facts</div>${descriptionList(t.facts.map((f) => [f.label, f.value]), { horizontal: true })}` : ''}
    ${t.jira?.length ? html`<div style="margin-top:16px">${jiraLinks(t.jira)}</div>` : ''}`;
}

export default {
  id: 'architecture',
  nav: { group: 'How it is built', label: 'Architecture', icon: 'topology' },
  render() {
    const items = arch.map((t) => ({ label: t.label, content: tab(t) }));
    return html`${sectionHeader({ eyebrow: 'Architecture', title: 'Modules, composed at runtime.', description: 'Every feature is its own module, with its own pod and Go BFF. The Dashboard Operator decides which ones run and writes <code>federation-config</code>; the host loads them when the page opens. Try it.' })}
      <div class="mo-reveal">${federation(modules.filter((m) => m.bff !== 'none'), { initiallyOff: ['autorag', 'data-connect-hub'] })}</div>
      <h3 class="mo-subhead" style="margin-top:48px">One platform, three surfaces</h3>
      ${tabs('arch', items)}`;
  },
  mount(el) {
    mountTabs(el);
    mountFederation(el, modules.filter((m) => m.bff !== 'none'));
  },
};
