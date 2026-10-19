import arch from '../data/architecture.js';
import { html, card, sectionHeader, tabs, mountTabs, label, descriptionList, iconTile, jiraLinks } from '../components/ui.js';
import { mountScene } from '../scenes/mount.js';

const OWNER = { pewter: ['purple', 'Our team'], platform: ['orange', 'Platform'], components: ['blue', 'Feature teams'], openshift: ['red', 'OpenShift'], future: ['teal', 'Next'] };

function layerList(list, containers = []) {
  const ic = { pod: 'container', container: 'container', deployment: 'application', service: 'network', cr: 'template' };
  return html`<div class="mo-layers">${list.map((l) => {
    const [tone, who] = OWNER[l.owner] ?? ['grey', ''];
    const inside = containers.filter((c) => c.layer === l.id);
    return html`<div class="mo-layer ${l.owner === 'pewter' ? 'mo-layer--pewter' : ''}" style="--c: var(--mo-${tone})">
      <div><div class="mo-layer__name">${l.name}${who ? label(who, { compact: true, color: tone }) : ''}</div>${l.note ? html`<div class="mo-card-desc">${l.note}</div>` : ''}</div>
      <div>
        <div class="mo-layer__items">${(l.items ?? []).map((i, k) => html`<span title="${(l.itemNotes?.[k] ?? l.itemNotes?.[i] ?? '').replace(/"/g, '&quot;')}">${label(i, { compact: true })}</span>`)}</div>
        ${inside.length ? html`<div class="mo-grid mo-grid--2" style="margin-top:${l.items?.length ? '10px' : '0'};gap:8px">${inside.map((c) => html`<div class="mo-row" style="flex-wrap:nowrap;align-items:flex-start">${iconTile(ic[c.kind] ?? 'container', { tone, size: 'sm' })}<div><strong>${c.name}</strong>${c.port ? html` <span class="mo-muted" style="font-size:12px">:${c.port}</span>` : ''}<div class="mo-card-desc">${c.description ?? ''}</div></div></div>`)}</div>` : ''}
      </div>
    </div>`;
  })}</div>`;
}

function diagram(d) {
  return html`<div class="mo-subhead">${d.title}</div>${d.intro ? html`<p class="mo-card-desc" style="margin-bottom:12px;max-width:80ch">${d.intro}</p>` : ''}
    ${d.layers?.length ? layerList(d.layers) : ''}
    ${d.cards?.length ? html`<div class="mo-grid mo-grid--3" style="margin-top:12px">${d.cards.map((c) => card({ compact: true, title: c.title, body: html`<p class="mo-card-desc">${c.description}</p>` }))}</div>` : ''}`;
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
    items.push({ label: 'Module Federation in 3D', icon: 'cubes', content: html`<p class="mo-section-header__desc" style="margin:16px 0">How a module reaches the screen: its pod serves a remote bundle and a Go BFF, the operator writes federation-config, and the host shell docks the module's pages at runtime.</p><div class="mo-diorama" data-scene="module-federation"></div>` });
    return html`${sectionHeader({ ic: 'topology', tone: 'blue', title: 'Architecture', description: 'One platform, three surfaces. Pick a surface to see its layers — ours are highlighted — or open the 3D model of Module Federation.' })}
      ${tabs('arch', items)}`;
  },
  mount(el) {
    mountTabs(el);
    // The 3D tab mounts its scene only when opened.
    el.addEventListener('tabchange', () => el.querySelectorAll('.mo-tab-panel:not([hidden]) [data-scene]:not([data-mounted])').forEach((s) => { s.dataset.mounted = '1'; mountScene(s); }));
  },
};
