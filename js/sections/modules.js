// The module catalog — modelled on the RHOAI "AI hub › Models › Catalog" page: filters on the left,
// a search box and a toggle group on top, cards with an icon tile, status label and description.
import modules from '../data/modules.js';
import { html, card, iconTile, sectionHeader, statusLabel, label, jiraLinks, toggleGroup, onToggleGroup, icon } from '../components/ui.js';

const CATEGORY = {
  'gen-ai': 'Gen AI', 'model-lifecycle': 'Model lifecycle', automl: 'AutoML & AutoRAG', data: 'Data', agents: 'Agents & MCP',
  observability: 'Observability', workbenches: 'Workbenches', platform: 'Platform',
};
const BFF = { go: 'Go BFF', core: 'Core BFF', proxy: 'Proxy', none: 'No BFF' };
const TONE = { 'gen-ai': 'purple', 'model-lifecycle': 'blue', automl: 'teal', data: 'orange', agents: 'green', observability: 'yellow', workbenches: 'red', platform: 'grey' };

function moduleCard(m) {
  const tone = TONE[m.category] ?? 'blue';
  return card({
    cls: 'mo-module',
    attrs: `data-category="${m.category}" data-bff="${m.bff ?? 'none'}" data-status="${m.status}" data-search="${(m.name + ' ' + m.description).toLowerCase().replace(/<[^>]+>/g, '').replace(/"/g, '')}"`,
    header: html`<div class="mo-card-top" style="width:100%">${iconTile(m.icon, { tone })}${statusLabel(m.status)}</div>`,
    body: html`<div class="mo-card-name">${m.repo ? html`<a href="${m.repo}" target="_blank" rel="noopener">${m.name}</a>` : m.name}</div><p class="mo-card-desc">${m.description}</p>`,
    footer: html`<div class="mo-row">${label(CATEGORY[m.category] ?? m.category, { compact: true })}${m.bff ? label(BFF[m.bff] ?? m.bff, { compact: true, color: 'blue', ic: 'server-stack' }) : ''}${m.release ? label(`Since ${m.release}`, { compact: true, outline: true }) : ''}</div>${m.jira?.length ? html`<div style="margin-top:8px">${jiraLinks(m.jira)}</div>` : ''}`,
  });
}

export default {
  id: 'modules',
  nav: { group: 'What we enable', label: 'Module catalog', icon: 'catalog' },
  render() {
    const cats = [...new Set(modules.map((m) => m.category))];
    const count = (k, v) => modules.filter((m) => m[k] === v).length;
    return html`${sectionHeader({ ic: 'catalog', tone: 'purple', title: 'RHOAI features on the modular architecture', description: `${modules.length} feature modules ship on the platform we own — each with its own team, pod and release cadence. Filter them like the RHOAI catalog.` })}
      <div class="mo-catalog">
        <aside class="mo-catalog__filters" aria-label="Filters">
          <div><div class="mo-catalog__filter-title">Category</div>
            ${cats.map((c) => html`<label class="mo-catalog__check"><input type="checkbox" value="${c}" data-filter="category"> ${CATEGORY[c] ?? c}<span class="mo-catalog__count">${count('category', c)}</span></label>`)}
          </div>
          <div><div class="mo-catalog__filter-title">Backend</div>
            ${[...new Set(modules.map((m) => m.bff ?? 'none'))].map((b) => html`<label class="mo-catalog__check"><input type="checkbox" value="${b}" data-filter="bff"> ${BFF[b] ?? b}<span class="mo-catalog__count">${modules.filter((m) => (m.bff ?? 'none') === b).length}</span></label>`)}
          </div>
        </aside>
        <div>
          <div class="mo-catalog__toolbar">
            <div class="pf-v6-c-text-input-group mo-catalog__search"><div class="pf-v6-c-text-input-group__main pf-m-icon">
              <span class="pf-v6-c-text-input-group__text"><span class="pf-v6-c-text-input-group__icon">${icon('search')}</span>
              <input class="pf-v6-c-text-input-group__text-input" type="search" placeholder="Filter by name or description" aria-label="Filter modules" data-search-input></span>
            </div></div>
            ${toggleGroup('status', [{ value: 'all', label: 'All modules' }, { value: 'live', label: 'Shipped' }, { value: 'upcoming', label: 'In progress' }], 'all')}
          </div>
          <div class="mo-grid mo-grid--3" data-grid>${modules.map(moduleCard)}</div>
          <div class="mo-catalog__empty" data-empty hidden>No modules match these filters.</div>
        </div>
      </div>`;
  },
  mount(el) {
    let status = 'all';
    const apply = () => {
      const q = el.querySelector('[data-search-input]').value.trim().toLowerCase();
      const sel = (k) => [...el.querySelectorAll(`[data-filter="${k}"]:checked`)].map((i) => i.value);
      const cats = sel('category'), bffs = sel('bff');
      let shown = 0;
      el.querySelectorAll('.mo-module').forEach((c) => {
        const d = c.dataset;
        const shipped = ['live', 'delivered'].includes(d.status);
        const ok = (!q || d.search.includes(q)) && (!cats.length || cats.includes(d.category)) && (!bffs.length || bffs.includes(d.bff))
          && (status === 'all' || (status === 'live' ? shipped : !shipped));
        c.hidden = !ok;
        shown += ok;
      });
      el.querySelector('[data-empty]').hidden = shown > 0;
    };
    el.addEventListener('input', apply);
    el.addEventListener('change', apply);
    onToggleGroup(el, 'status', (v) => { status = v; apply(); });
  },
};
