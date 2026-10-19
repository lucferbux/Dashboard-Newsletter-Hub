import metrics from '../data/metrics.js';
import { html, card, iconTile, sectionHeader, label } from '../components/ui.js';

export default {
  id: 'metrics',
  nav: { group: 'Overview', label: 'Impact', icon: 'trend-up' },
  render() {
    const max = Math.max(...metrics.cards.map((m) => (m.suffix === '%' ? 0 : m.value)), 1);
    return html`${sectionHeader({ ic: 'trend-up', tone: 'green', title: 'Our impact', description: 'What the platform makes possible for the teams building on it.' })}
      <div class="mo-grid mo-grid--4">
        ${metrics.cards.map((m) => {
          const tone = m.tone ?? 'blue';
          const pct = m.suffix === '%' ? m.value : (m.value / max) * 100;
          return card({
            cls: 'mo-reveal', attrs: `style="--c: var(--mo-${tone})"`,
            body: html`<div class="mo-metric">${iconTile(m.icon ?? 'trend-up', { tone, size: 'sm' })}<div>
              <div class="mo-metric__value"><span data-count="${m.value}">${m.value}</span>${m.suffix ?? ''}</div>
              <div class="mo-metric__label">${m.label}</div>
              <div class="mo-card-desc">${m.description ?? ''}</div></div></div>
              <div class="mo-metric__bar"><span data-bar="${pct}"></span></div>`,
          });
        })}
      </div>
      ${metrics.pills?.length ? html`<div class="mo-row" style="margin-top:16px">${metrics.pills.map((p) => label(html`<strong>${p.value}</strong>&nbsp;${p.label}`, { color: 'blue', outline: true }))}</div>` : ''}`;
  },
  mount(el) {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      el.querySelectorAll('[data-bar]').forEach((b) => (b.style.width = `${b.dataset.bar}%`));
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      el.querySelectorAll('[data-count]').forEach((n) => {
        const to = Number(n.dataset.count);
        const t0 = performance.now();
        const step = (t) => { const k = Math.min(1, (t - t0) / 1100); n.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.3 });
    io.observe(el);
  },
};
