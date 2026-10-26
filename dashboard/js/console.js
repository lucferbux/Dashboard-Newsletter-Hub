// The product screens, rebuilt with PatternFly 6 markup: the console chrome (masthead, sidebar nav, main container) and
// the building blocks the pages use (page header, toolbar, table, catalog card, wizard, status). Structure and labels
// follow odh-dashboard; data is illustrative.
import { html, rhIcon, label, $, $$ } from './lib.js';

/* ---------- Small PatternFly pieces ---------- */
const FA = {
  // Font Awesome / PatternFly icons used by the console (from @patternfly/react-icons)
  bell: ['0 0 448 512', 'M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z'],
  grid: ['0 0 512 512', 'M149.333 56v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zm181.334 240v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm32-240v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24zm-32 80V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm-205.334 56H24c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm386.667-56H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm0 160H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zM181.333 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24z'],
  help: ['0 0 512 512', 'M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z'],
  caret: ['0 0 320 512', 'M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'],
  search: ['0 0 512 512', 'M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'],
  ok: ['0 0 512 512', 'M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z'],
  warn: ['0 0 576 512', 'M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 24.028c18.467-32.009 64.72-31.951 83.154 0l239.94 416.985zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z'],
  spin: ['0 0 512 512', 'M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z'],
  off: ['0 0 512 512', 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z'],
  lock: ['0 0 448 512', 'M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z'],
  send: ['0 0 512 512', 'M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z'],
  plus: ['0 0 448 512', 'M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z'],
  copy: ['0 0 448 512', 'M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z'],
  kebab: ['0 0 192 512', 'M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z'],
  sun: ['0 0 512 512', 'M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z'],
  moon: ['0 0 512 512', 'M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z'],
  angle: ['0 0 20 20', 'M18.71 5.29a.996.996 0 0 0-1.41 0l-7.29 7.29-7.3-7.29a.987.987 0 0 0-1.41-.02.987.987 0 0 0-.02 1.41l.02.02 7.65 7.65c.29.29.68.44 1.06.44s.77-.15 1.06-.44l7.65-7.65a.996.996 0 0 0 0-1.41Z'],
  hamburger: ['0 0 10 10', 'M1,1 L9,1 M1,5 L9,5 M1,9 L9,9'],
  paperclip: ['0 0 448 512', 'M43.246 466.142c-58.43-60.289-57.341-157.511 1.386-217.581L254.392 34c44.316-45.332 116.351-45.336 160.671 0 43.89 44.894 43.943 117.329 0 162.276L232.214 383.128c-29.855 30.537-78.633 30.111-107.982-.998-28.275-29.97-27.368-77.473 1.452-106.953l143.743-146.835c6.182-6.314 16.312-6.422 22.626-.241l22.861 22.379c6.315 6.182 6.422 16.312.241 22.626L171.427 319.927c-4.932 5.045-5.236 13.428-.648 18.292 4.372 4.634 11.245 4.711 15.688.165l182.849-186.851c19.613-20.062 19.613-52.725-.011-72.798-19.189-19.627-49.957-19.637-69.154 0L90.39 293.295c-34.763 35.56-35.299 93.12-1.191 128.313 34.01 35.093 88.985 35.137 123.058.286l172.06-175.999c6.177-6.319 16.307-6.433 22.626-.256l22.877 22.364c6.319 6.177 6.434 16.307.256 22.626l-172.06 175.998c-59.576 60.938-155.943 60.216-214.77-.485z'],
};
export const fa = (n, { size, cls = '' } = {}) => {
  const [vb, d] = FA[n];
  const stroke = n === 'hamburger' ? ' fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"' : ' fill="currentColor"';
  return `<svg class="pf-v6-svg ${cls}" viewBox="${vb}" width="${size ?? '1em'}" height="${size ?? '1em'}"${stroke} aria-hidden="true"><path d="${d}"/></svg>`;
};

export const btn = (text, kind = 'primary', extra = '') => `<button type="button" class="pf-v6-c-button pf-m-${kind}" ${extra}><span class="pf-v6-c-button__text">${text}</span></button>`;
export const status = (kind, text) => `<span class="st st--${kind}">${fa({ ok: 'ok', warn: 'warn', run: 'spin', off: 'off' }[kind])}${text}</span>`;
export const switchCtl = (on, lbl = '', attrs = '') => `<label class="pf-v6-c-switch" ${attrs}><input class="pf-v6-c-switch__input" type="checkbox" ${on ? 'checked' : ''} tabindex="-1"><span class="pf-v6-c-switch__toggle"></span>${lbl ? `<span class="pf-v6-c-switch__label">${lbl}</span>` : ''}</label>`;
export const select = (text, attrs = '') => `<div class="fake-select" ${attrs}><span data-select-text>${text}</span>${fa('caret')}</div>`;
export const textInput = (text, attrs = '') => `<div class="fake-select" ${attrs}><span data-select-text>${text}</span></div>`;
export const searchInput = (ph) => `<div class="pf-v6-c-text-input-group"><div class="pf-v6-c-text-input-group__main pf-m-icon"><span class="pf-v6-c-text-input-group__text"><span class="pf-v6-c-text-input-group__icon">${fa('search')}</span><input class="pf-v6-c-text-input-group__text-input" placeholder="${ph}" tabindex="-1"></span></div></div>`;

/** Page header: icon in a tinted circle, title, then description. */
export const pageHeader = (iconName, title, desc = '', bg = '#ece6ff') => html`<div class="ph"><span class="ph__icon" style="--ph-bg:${bg}">${rhIcon(iconName, { size: 22 })}</span><h1>${title}</h1></div>${desc ? `<p class="ph-desc">${desc}</p>` : ''}`;

export const table = (cols, rows, { compact = true, attrs = '' } = {}) => html`<table class="pf-v6-c-table pf-m-grid-md ${compact ? 'pf-m-compact' : ''}" role="grid" ${attrs}>
  <thead class="pf-v6-c-table__thead"><tr class="pf-v6-c-table__tr">${cols.map((c) => `<th class="pf-v6-c-table__th" scope="col">${c}</th>`)}<th class="pf-v6-c-table__th"></th></tr></thead>
  <tbody class="pf-v6-c-table__tbody">${rows.map((r) => tr(r))}</tbody></table>`;
export const tr = (r, cls = '') => `<tr class="pf-v6-c-table__tr ${cls}">${r.map((c) => `<td class="pf-v6-c-table__td">${c}</td>`).join('')}<td class="pf-v6-c-table__td pf-v6-c-table__action"><button class="pf-v6-c-menu-toggle pf-m-plain" tabindex="-1">${fa('kebab')}</button></td></tr>`;

export const toggleTabs = (items, current) => html`<div class="pf-v6-c-tabs ph-tabs"><ul class="pf-v6-c-tabs__list">${items.map((t) => `<li class="pf-v6-c-tabs__item ${t === current ? 'pf-m-current' : ''}"><button class="pf-v6-c-tabs__link" tabindex="-1"><span class="pf-v6-c-tabs__item-text">${t}</span></button></li>`)}</ul></div>`;

/** Catalog card (AI hub models, MCP servers, MaaS models). */
export const catCard = ({ logo, color = '#151515', name, by, desc, labels = [], id = '' }) => html`<div class="pf-v6-c-card pf-m-compact cat-card" ${id ? `data-card="${id}"` : ''}>
  <div class="pf-v6-c-card__header"><div class="pf-v6-c-card__header-main cat-head"><span class="cat-logo" style="background:${color}">${logo}</span>
  <div><div class="pf-v6-c-card__title"><h2 class="pf-v6-c-card__title-text">${name}</h2></div><div style="font-size:13px;color:var(--pf-t--global--text--color--subtle)">${by}</div></div></div></div>
  <div class="pf-v6-c-card__body"><p>${desc}</p><div class="cat-labels">${labels.join('')}</div></div></div>`;

/* ---------- The console chrome ---------- */
// nav: [{ id, label, icon } | { id, label, icon, items: [{ id, label }] }]
export function consoleWindow({ url = 'rhoai-dashboard.apps.cluster.example.com', nav, current = '', expanded = [], body = '', id = '', cls = '', logo = 'assets/rhoai-logo.svg', user = 'ana.garcia', sidebar = true }) {
  return html`<div class="console ${cls}" ${id ? `id="${id}"` : ''}>
  <div class="console__bar"><i></i><i></i><i></i><div class="console__url">${fa('lock')}${url}</div></div>
  <div class="console__page pf-v6-c-page">
    <header class="pf-v6-c-masthead">
      <div class="pf-v6-c-masthead__main">
        <span class="pf-v6-c-masthead__toggle"><button class="pf-v6-c-button pf-m-plain pf-m-hamburger" tabindex="-1"><span class="pf-v6-c-button__icon">${fa('hamburger', { size: '18px' })}</span></button></span>
        <div class="pf-v6-c-masthead__brand"><span class="pf-v6-c-masthead__logo"><img src="${logo}" alt=""></span></div>
      </div>
      <div class="pf-v6-c-masthead__content"><div class="masthead-tools">
        <button class="pf-v6-c-button pf-m-plain" tabindex="-1">${fa('bell')}</button>
        <button class="pf-v6-c-button pf-m-plain" tabindex="-1">${fa('grid')}</button>
        <button class="pf-v6-c-button pf-m-plain" tabindex="-1">${fa('help')}</button>
        <div class="pf-v6-c-toggle-group"><div class="pf-v6-c-toggle-group__item"><button class="pf-v6-c-toggle-group__button pf-m-selected" tabindex="-1"><span class="pf-v6-c-toggle-group__icon">${fa('sun')}</span></button></div><div class="pf-v6-c-toggle-group__item"><button class="pf-v6-c-toggle-group__button" tabindex="-1"><span class="pf-v6-c-toggle-group__icon">${fa('moon')}</span></button></div></div>
        <span class="masthead-user">${user} ${fa('caret')}</span>
      </div></div>
    </header>
    ${sidebar ? html`<div class="pf-v6-c-page__sidebar pf-m-expanded"><div class="pf-v6-c-page__sidebar-main"><div class="pf-v6-c-page__sidebar-body">
      <nav class="pf-v6-c-nav" aria-label="Console"><ul class="pf-v6-c-nav__list" role="list" data-nav-root>${nav.map((n) => navItem(n, current, expanded))}</ul></nav>
    </div></div></div>` : ''}
    <div class="pf-v6-c-page__main-container pf-m-fill"><main class="pf-v6-c-page__main"><section class="pf-v6-c-page__main-section" data-pane>${body}</section></main></div>
  </div>
</div>`;
}

const navLabel = (n) => html`<span class="nav-row">${n.icon ? rhIcon(n.icon, { size: 14 }).replace('<svg', '<svg class="nav-ic"') : ''}<span>${n.label}</span></span>`;
function navItem(n, current, expanded) {
  if (!n.items) return `<li class="pf-v6-c-nav__item"><a class="pf-v6-c-nav__link ${current === n.id ? 'pf-m-current' : ''}" data-nav="${n.id}">${navLabel(n)}</a></li>`;
  const open = expanded.includes(n.id) || n.items.some((i) => i.id === current);
  return html`<li class="pf-v6-c-nav__item ${open ? 'pf-m-expanded' : ''}" data-nav-group="${n.id}"><button class="pf-v6-c-nav__link" aria-expanded="${open}" tabindex="-1"><span class="pf-v6-c-nav__link-text">${navLabel(n)}</span><span class="pf-v6-c-nav__toggle"><span class="pf-v6-c-nav__toggle-icon">${fa('angle')}</span></span></button>
    <section class="pf-v6-c-nav__subnav" ${open ? '' : 'hidden'}><ul class="pf-v6-c-nav__list" role="list">${n.items.map((i) => `<li class="pf-v6-c-nav__item"><a class="pf-v6-c-nav__link ${current === i.id ? 'pf-m-current' : ''}" data-nav="${i.id}">${i.label}</a></li>`)}</ul></section></li>`;
}

/** Point the console at another screen: highlight the nav item, open its group, swap the main section with a fade. */
export function go(win, { current, body, instant = false }) {
  $$('.pf-v6-c-backdrop', win).forEach((m) => m.remove()); // a modal never survives a change of screen
  $$('[data-nav]', win).forEach((a) => a.classList.toggle('pf-m-current', a.dataset.nav === current));
  $$('[data-nav-group]', win).forEach((g) => {
    const open = !!$(`[data-nav="${current}"]`, g);
    if (!open) return;
    g.classList.add('pf-m-expanded'); $('button', g).setAttribute('aria-expanded', 'true'); $('.pf-v6-c-nav__subnav', g).hidden = false;
  });
  if (body == null) return Promise.resolve();
  const pane = $('[data-pane]', win);
  if (instant) { pane.innerHTML = body; return Promise.resolve(); }
  pane.classList.add('is-swapping');
  return new Promise((r) => setTimeout(() => { pane.innerHTML = body; pane.classList.remove('is-swapping'); r(); }, 300));
}

export { label };
