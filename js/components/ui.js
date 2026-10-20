// PatternFly 6 building blocks as HTML-string helpers. Every section is composed from these, so the
// whole site keeps the RHOAI look. Markup follows https://www.patternfly.org (pf-v6-c-* classes).
import { icon } from '../icons.js';

export const esc = (s = '') => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const html = (strings, ...vals) => strings.reduce((a, s, i) => a + s + (i < vals.length ? [].concat(vals[i] ?? '').join('') : ''), '');

/* ---------- Status ---------- */
export const STATUS = {
  delivered: { label: 'Delivered', color: 'green', icon: 'check-circle-fill' },
  live: { label: 'Live', color: 'green', icon: 'check-circle-fill' },
  'in-progress': { label: 'In progress', color: 'blue', icon: 'in-progress' },
  'at-risk': { label: 'At risk', color: 'orange', icon: 'warning' },
  planned: { label: 'Planned', color: 'grey', icon: 'pending' },
  exploring: { label: 'Exploring', color: 'purple', icon: 'lab' },
  'coming-soon': { label: 'Coming soon', color: 'orange', icon: 'hourglass' },
};

/* ---------- Label ---------- */
export function label(text, { color = 'grey', ic, compact = false, filled = false, outline = false } = {}) {
  const mods = [color !== 'grey' && `pf-m-${color}`, compact && 'pf-m-compact', filled && 'pf-m-filled', outline && 'pf-m-outline'].filter(Boolean).join(' ');
  return html`<span class="pf-v6-c-label ${mods}"><span class="pf-v6-c-label__content">${ic ? html`<span class="pf-v6-c-label__icon">${icon(ic)}</span>` : ''}<span class="pf-v6-c-label__text">${text}</span></span></span>`;
}
export function statusLabel(status, { compact = true } = {}) {
  const s = STATUS[status] ?? STATUS.planned;
  return label(s.label, { color: s.color, ic: s.icon, compact });
}

/* ---------- Jira links ---------- */
export const jiraUrl = (k) => `https://redhat.atlassian.net/browse/${k}`;
export function jiraLinks(keys = []) {
  if (!keys?.length) return '';
  return html`<span class="mo-jira">${keys.map((k) => html`<a class="mo-jira__link" href="${jiraUrl(k)}" target="_blank" rel="noopener">${esc(k)}</a>`)}</span>`;
}

/* ---------- Icon chip ---------- */
// One quiet style everywhere: the glyph in PatternFly blue on a soft chip. (`tone` is accepted for
// backwards compatibility and ignored — colour-coding sections made the page noisy.)
export function iconTile(name, { size = 'md', round = true } = {}) {
  return html`<span class="mo-tile mo-tile--${size} ${round ? 'mo-tile--round' : ''}">${icon(name)}</span>`;
}

/* ---------- Buttons ---------- */
export function button(text, { href, variant = 'primary', ic, attrs = '', external = false } = {}) {
  const inner = html`${ic ? html`<span class="pf-v6-c-button__icon pf-m-start">${icon(ic)}</span>` : ''}<span class="pf-v6-c-button__text">${text}</span>`;
  const cls = `pf-v6-c-button pf-m-${variant}`;
  return href
    ? html`<a class="${cls}" href="${href}" ${external ? 'target="_blank" rel="noopener"' : ''} ${attrs}>${inner}</a>`
    : html`<button class="${cls}" type="button" ${attrs}>${inner}</button>`;
}

/* ---------- Card ---------- */
// secondary: PatternFly's filled card (grey, no border) — the bento tile used across the site.
export function card({ title, titleHtml, body = '', footer = '', header = '', cls = '', attrs = '', compact = false, plain = false, secondary = false, id = '' }) {
  return html`<div class="pf-v6-c-card ${compact ? 'pf-m-compact' : ''} ${plain ? 'pf-m-plain' : ''} ${secondary ? 'pf-m-secondary' : ''} ${cls}" ${id ? `id="${id}"` : ''} ${attrs}>
    ${header || title || titleHtml ? html`<div class="pf-v6-c-card__header">${header}${title || titleHtml ? html`<div class="pf-v6-c-card__title"><h3 class="pf-v6-c-card__title-text">${titleHtml ?? esc(title)}</h3></div>` : ''}</div>` : ''}
    ${body ? html`<div class="pf-v6-c-card__body">${body}</div>` : ''}
    ${footer ? html`<div class="pf-v6-c-card__footer">${footer}</div>` : ''}
  </div>`;
}

/* ---------- Section header: eyebrow (blue), title, one paragraph ---------- */
export function sectionHeader({ ic, title, description, eyebrow }) {
  return html`<header class="mo-section-header mo-reveal">
    ${eyebrow || ic ? html`<div class="mo-eyebrow">${ic ? icon(ic) : ''}${eyebrow ?? ''}</div>` : ''}
    <h2 class="mo-section-title">${title}</h2>
    ${description ? html`<p class="mo-section-header__desc">${description}</p>` : ''}
  </header>`;
}

/* ---------- Big numbers on a hairline row (the newsletter's stats) ---------- */
export function stats(items) {
  return html`<div class="mo-stats mo-reveal">${items.map((s, i) => html`<div class="mo-stats__item" style="--i:${i}">
    <div class="mo-stats__bar"></div>
    <div class="mo-stats__value">${typeof s.value === 'number' ? html`<span data-count="${s.value}">${s.value}</span>` : s.value}${s.suffix ?? ''}</div>
    <div class="mo-stats__label">${s.label}</div>${s.description ? html`<div class="mo-stats__desc">${s.description}</div>` : ''}
  </div>`)}</div>`;
}

/* ---------- Tabs (wired by mountTabs) ---------- */
export function tabs(id, items, { box = false, active = 0 } = {}) {
  return html`<div class="mo-tabs" data-tabs="${id}">
    <div class="pf-v6-c-tabs ${box ? 'pf-m-box' : ''}" role="region">
      <ul class="pf-v6-c-tabs__list" role="tablist">
        ${items.map((t, i) => html`<li class="pf-v6-c-tabs__item ${i === active ? 'pf-m-current' : ''}" role="presentation">
          <button type="button" class="pf-v6-c-tabs__link" role="tab" id="${id}-tab-${i}" aria-controls="${id}-panel-${i}" aria-selected="${i === active}" data-tab="${i}">
            ${t.icon ? html`<span class="pf-v6-c-tabs__item-icon">${icon(t.icon)}</span>` : ''}<span class="pf-v6-c-tabs__item-text">${t.label}</span>
          </button></li>`)}
      </ul>
    </div>
    ${items.map((t, i) => html`<section class="pf-v6-c-tab-content mo-tab-panel" role="tabpanel" id="${id}-panel-${i}" aria-labelledby="${id}-tab-${i}" ${i === active ? '' : 'hidden'}>${t.content}</section>`)}
  </div>`;
}
export function mountTabs(root) {
  root.querySelectorAll('[data-tabs]').forEach((t) => {
    if (t.dataset.mounted) return;
    t.dataset.mounted = '1';
    t.addEventListener('click', (e) => {
      const b = e.target.closest('[data-tab]');
      if (!b || !t.contains(b) || b.closest('[data-tabs]') !== t) return;
      const i = Number(b.dataset.tab);
      t.querySelectorAll(':scope > .pf-v6-c-tabs .pf-v6-c-tabs__item').forEach((li, k) => {
        li.classList.toggle('pf-m-current', k === i);
        li.querySelector('button').setAttribute('aria-selected', String(k === i));
      });
      t.querySelectorAll(':scope > .mo-tab-panel').forEach((p, k) => (p.hidden = k !== i));
      t.dispatchEvent(new CustomEvent('tabchange', { detail: i, bubbles: true }));
    });
  });
}

/* ---------- Progress bar ---------- */
export function progress(value, { title = '', measure = true, variant = '', size = '' } = {}) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return html`<div class="pf-v6-c-progress ${variant ? `pf-m-${variant}` : ''} ${size ? `pf-m-${size}` : ''}">
    ${title ? html`<div class="pf-v6-c-progress__description">${title}</div>` : ''}
    ${measure ? html`<div class="pf-v6-c-progress__status"><span class="pf-v6-c-progress__measure">${v}%</span></div>` : ''}
    <div class="pf-v6-c-progress__bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${v}"><div class="pf-v6-c-progress__indicator" style="width:${v}%"></div></div>
  </div>`;
}

/* ---------- Progress stepper (release ticks, journey) ---------- */
export function stepper(steps, { center = true } = {}) {
  // steps: [{ title, description, status: 'success'|'current'|'pending'|'warning' }]
  const ic = { success: 'check-circle-fill', current: 'in-progress', pending: 'pending', warning: 'warning' };
  return html`<ol class="pf-v6-c-progress-stepper ${center ? 'pf-m-center' : ''}">
    ${steps.map((s) => html`<li class="pf-v6-c-progress-stepper__step pf-m-${s.status === 'current' ? 'current pf-m-info' : s.status}" ${s.status === 'current' ? 'aria-current="step"' : ''}>
      <div class="pf-v6-c-progress-stepper__step-connector"><span class="pf-v6-c-progress-stepper__step-icon">${icon(ic[s.status] ?? 'pending')}</span></div>
      <div class="pf-v6-c-progress-stepper__step-main">
        <div class="pf-v6-c-progress-stepper__step-title">${s.title}</div>
        ${s.description ? html`<div class="pf-v6-c-progress-stepper__step-description">${s.description}</div>` : ''}
      </div>
    </li>`)}
  </ol>`;
}

/* ---------- Description list ---------- */
export function descriptionList(pairs, { horizontal = false } = {}) {
  return html`<dl class="pf-v6-c-description-list ${horizontal ? 'pf-m-horizontal' : ''} pf-m-compact">
    ${pairs.map(([k, v]) => html`<div class="pf-v6-c-description-list__group"><dt class="pf-v6-c-description-list__term"><span class="pf-v6-c-description-list__text">${k}</span></dt><dd class="pf-v6-c-description-list__description"><div class="pf-v6-c-description-list__text">${v}</div></dd></div>`)}
  </dl>`;
}

/* ---------- Expandable section ---------- */
export function expandable(toggleText, content, { open = false } = {}) {
  return html`<div class="pf-v6-c-expandable-section ${open ? 'pf-m-expanded' : ''}" data-expandable>
    <div class="pf-v6-c-expandable-section__toggle">
      <button type="button" class="pf-v6-c-button pf-m-link" aria-expanded="${open}">
        <span class="pf-v6-c-button__icon pf-m-start"><span class="pf-v6-c-expandable-section__toggle-icon">${icon('caret-right')}</span></span>
        <span class="pf-v6-c-button__text">${toggleText}</span>
      </button>
    </div>
    <div class="pf-v6-c-expandable-section__content" ${open ? '' : 'hidden'}>${content}</div>
  </div>`;
}
export function mountExpandables(root) {
  root.querySelectorAll('[data-expandable]').forEach((x) => {
    if (x.dataset.mounted) return;
    x.dataset.mounted = '1';
    const b = x.querySelector('.pf-v6-c-expandable-section__toggle button');
    b.addEventListener('click', () => {
      const open = !x.classList.contains('pf-m-expanded');
      x.classList.toggle('pf-m-expanded', open);
      b.setAttribute('aria-expanded', String(open));
      x.querySelector('.pf-v6-c-expandable-section__content').hidden = !open;
    });
  });
}

/* ---------- Toggle group (filters) ---------- */
export function toggleGroup(name, options, active) {
  return html`<div class="pf-v6-c-toggle-group" role="group" data-toggle-group="${name}">
    ${options.map((o) => html`<div class="pf-v6-c-toggle-group__item"><button type="button" class="pf-v6-c-toggle-group__button ${o.value === active ? 'pf-m-selected' : ''}" aria-pressed="${o.value === active}" data-value="${o.value}">
      ${o.icon ? html`<span class="pf-v6-c-toggle-group__icon">${icon(o.icon)}</span>` : ''}<span class="pf-v6-c-toggle-group__text">${o.label}</span></button></div>`)}
  </div>`;
}
export function onToggleGroup(root, name, fn) {
  const g = root.querySelector(`[data-toggle-group="${name}"]`);
  g?.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-value]');
    if (!b) return;
    g.querySelectorAll('button').forEach((x) => { x.classList.toggle('pf-m-selected', x === b); x.setAttribute('aria-pressed', String(x === b)); });
    fn(b.dataset.value);
  });
}

export { icon };
