// Module Federation simulator: switch modules on and off and watch what the Dashboard Operator does —
// the module appears in (or leaves) the dashboard navigation, and federation-config changes. Dependencies are
// resolved like the operator's dependency pass (e.g. AutoRAG needs GenAI Studio). Data: js/data/modules.js.
import { html, esc, icon } from '../components/ui.js';

const navLabel = (m) => m.navLabel ?? m.name.replace(/\s*\(.*\)\s*/, '').replace(/ BFF$/, '');
const remoteName = (id) => id.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

export function federation(modules, { initiallyOff = [] } = {}) {
  const on = new Set(modules.filter((m) => !initiallyOff.includes(m.id)).map((m) => m.id));
  return html`<div class="mo-fed" data-fed data-on="${[...on].join(',')}">
    <div class="mo-fed__controls">
      <div class="mo-fed__head"><span>Modules</span><span class="mo-muted" data-fed-count></span></div>
      <ul class="mo-fed__list">${modules.map((m) => html`<li>
        <label class="pf-v6-c-switch pf-m-reverse mo-fed__switch" for="fed-${m.id}">
          <input class="pf-v6-c-switch__input" type="checkbox" id="fed-${m.id}" data-id="${m.id}" ${on.has(m.id) ? 'checked' : ''}>
          <span class="pf-v6-c-switch__toggle"><span class="pf-v6-c-switch__toggle-icon">${icon('check')}</span></span>
          <span class="pf-v6-c-switch__label">${esc(navLabel(m))}</span>
        </label></li>`)}</ul>
    </div>
    <div class="mo-fed__stage">
      <div class="mo-fed__window" aria-hidden="true">
        <div class="mo-fed__bar"><span></span><span></span><span></span><em>Red Hat OpenShift AI</em></div>
        <div class="mo-fed__body">
          <nav class="mo-fed__nav"><div class="mo-fed__nav-item is-static">Home</div><div class="mo-fed__nav-item is-static">Projects</div><div data-fed-nav></div></nav>
          <div class="mo-fed__page"><div class="mo-fed__ph mo-fed__ph--title"></div><div class="mo-fed__ph"></div><div class="mo-fed__ph mo-fed__ph--short"></div>
            <div class="mo-fed__cards"><div></div><div></div><div></div></div></div>
        </div>
      </div>
      <div class="mo-fed__note" data-fed-note aria-live="polite"></div>
      <pre class="mo-fed__code" aria-label="Generated federation-config (simplified)"><code data-fed-code></code></pre>
    </div>
  </div>`;
}

export function mountFederation(root, modules) {
  const el = root.querySelector('[data-fed]');
  if (!el) return;
  const byId = Object.fromEntries(modules.map((m) => [m.id, m]));
  const on = new Set(el.dataset.on.split(',').filter(Boolean));
  const nav = el.querySelector('[data-fed-nav]');
  const code = el.querySelector('[data-fed-code]');
  const note = el.querySelector('[data-fed-note]');
  const count = el.querySelector('[data-fed-count]');

  function render(changed, verb) {
    // nav: keep existing nodes so additions/removals animate
    const want = modules.filter((m) => on.has(m.id)).map((m) => m.id);
    nav.querySelectorAll('[data-nav-id]').forEach((n) => {
      if (!on.has(n.dataset.navId)) { n.classList.add('is-leaving'); setTimeout(() => n.remove(), 260); }
    });
    want.forEach((id, i) => {
      if (nav.querySelector(`[data-nav-id="${id}"]:not(.is-leaving)`)) return;
      const n = document.createElement('div');
      n.className = 'mo-fed__nav-item is-entering';
      n.dataset.navId = id;
      n.textContent = navLabel(byId[id]);
      const next = want.slice(i + 1).map((x) => nav.querySelector(`[data-nav-id="${x}"]:not(.is-leaving)`)).find(Boolean);
      nav.insertBefore(n, next ?? null);
      requestAnimationFrame(() => requestAnimationFrame(() => n.classList.remove('is-entering')));
      if (changed?.includes(id)) n.classList.add('is-flash');
    });
    code.innerHTML = want.map((id) => {
      const flash = changed?.includes(id) && verb === 'on' ? ' class="is-flash"' : '';
      return `<span${flash}>{ "name": "${remoteName(id)}", "remoteEntry": "/_mf/${remoteName(id)}/remoteEntry.js", "proxy": "/${id}/api" }</span>`;
    }).join(',\n');
    count.textContent = `${want.length} of ${modules.length} on`;
    el.querySelectorAll('input[data-id]').forEach((i) => (i.checked = on.has(i.dataset.id)));
  }

  el.addEventListener('change', (e) => {
    const id = e.target.dataset.id;
    if (!id) return;
    const changed = [id];
    let msg;
    if (e.target.checked) {
      on.add(id);
      const deps = (byId[id].dependsOn ?? []).filter((d) => !on.has(d));
      deps.forEach((d) => { on.add(d); changed.push(d); });
      msg = deps.length
        ? `<strong>${navLabel(byId[id])}</strong> needs ${deps.map((d) => navLabel(byId[d])).join(', ')}, so the operator enabled it too.`
        : `The operator created the <code>${id}</code> Deployment, added it to <code>federation-config</code> and rolled the dashboard.`;
      render(changed, 'on');
    } else {
      on.delete(id);
      const dependents = modules.filter((m) => on.has(m.id) && (m.dependsOn ?? []).includes(id));
      dependents.forEach((m) => { on.delete(m.id); changed.push(m.id); });
      msg = dependents.length
        ? `${dependents.map((m) => `<strong>${navLabel(m)}</strong>`).join(', ')} depended on <strong>${navLabel(byId[id])}</strong>, so it was removed as well.`
        : `The operator removed the <code>${id}</code> Deployment; its pages left the dashboard. Nothing else restarted.`;
      render(changed, 'off');
    }
    note.innerHTML = msg;
  });
  render();
  note.innerHTML = 'Each switch is a module the Dashboard Operator can deploy. Try turning <strong>AutoRAG</strong> on or <strong>GenAI Studio</strong> off.';
}
