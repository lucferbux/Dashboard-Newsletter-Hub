// Animated walkthroughs that play inside a console window. Each scene takes the window and a `live()` check, so a
// newer scene (or leaving the page) stops the one that is playing.
import { $, $$, sleep, reduced, label } from './lib.js';
import { go } from './console.js';
import * as S from './screens.js';

const press = async (el, live) => { if (!el || !live()) return; el.classList.add('is-pressed'); await sleep(420); el?.classList.remove('is-pressed'); };

/** A runner: play(sceneFn) cancels whatever was playing in that window. */
export function player(win) {
  let token = 0;
  return {
    play(scene) { const t = ++token; const live = () => t === token && win.isConnected; return scene(win, live); },
    stop() { token++; },
  };
}

export async function find(win, live) {
  await go(win, { current: 'models', body: S.catalog() });
  for (const id of ['mistral', 'llama', 'granite']) {
    if (!live()) return;
    $$('[data-card]', win).forEach((c) => c.classList.toggle('is-hot', c.dataset.card === id));
    await sleep(reduced() ? 0 : 900);
  }
}

export async function deploy(win, live) {
  for (let s = 1; s <= 4; s++) {
    if (!live()) return;
    await go(win, { current: 'models', body: S.deployWizard(s), instant: s > 1 });
    await sleep(reduced() ? 0 : 1500);
    await press($('[data-wiz-next]', win), live);
  }
  if (!live()) return;
  await go(win, { current: 'models', body: S.deployments(S.newDeployRow('run')) });
  await sleep(2200);
  if (!live()) return;
  await go(win, { current: 'models', body: S.deployments(S.newDeployRow('ok')), instant: true });
}

export async function share(win, live) {
  await go(win, { current: 'endpoints', body: S.aiAssets() });
  await sleep(1800);
  if (!live()) return;
  await go(win, { current: 'apikeys', body: S.apiKeys() });
  await sleep(900);
  await press($('[data-create-key]', win), live);
  if (!live()) return;
  $('[data-keys-table] tbody', win).insertAdjacentHTML('afterbegin', S.keyRow());
  const main = $('.pf-v6-c-page__main-container', win);
  main.style.position = 'relative';
  await sleep(500);
  if (live()) main.insertAdjacentHTML('beforeend', S.saveKeyModal());
  await sleep(3200);
  if (live()) $('.pf-v6-c-backdrop', win)?.remove(); // "Close"
}

const USER_Q = 'Summarise the open incidents in our runbook and file a ticket for the worst one.';
const ANSWER = 'There are three open incidents. The most severe is GPU queue starvation on cluster east-2: workbenches waited up to 40 minutes for an A100. I filed issue #412 in the platform repo with the timeline and a link to the runbook section.';
export async function build(win, live) {
  await go(win, { current: 'playground', body: S.playground() });
  const box = $('[data-typing-box]', win);
  if (!reduced()) for (let i = 1; i <= USER_Q.length && live(); i += 2) { box.textContent = USER_Q.slice(0, i); await sleep(22); }
  if (!live()) return;
  box.textContent = 'Send a message…';
  const msgs = $('[data-msgs]', win);
  msgs.innerHTML = S.message(true, 'You', USER_Q);
  await sleep(600);
  if (!live()) return;
  msgs.insertAdjacentHTML('beforeend', S.message(false, 'granite-3-3-8b-instruct', '', `<div class="msg-tools" data-tools></div>`));
  const tools = $('[data-tools]', win), text = $$('[data-msg-text]', win).pop();
  for (const t of ['runbook.pdf · 3 passages', 'github · create_issue']) { if (!live()) return; tools.insertAdjacentHTML('beforeend', label(t, 'purple')); await sleep(700); }
  text.classList.add('typing-caret');
  if (!reduced()) for (let i = 1; i <= ANSWER.length && live(); i += 3) { text.textContent = ANSWER.slice(0, i); await sleep(16); }
  text.textContent = ANSWER; text.classList.remove('typing-caret');
}

export async function evaluate(win, live) {
  await go(win, { current: 'evaluations', body: S.evaluations(false) });
  await sleep(2600);
  if (live()) await go(win, { current: 'evaluations', body: S.evaluations(true), instant: true });
}

export async function automate(win, live) {
  await go(win, { current: 'autorag', body: S.autorag() });
}

/** Loop a list of scenes forever (hero windows). */
export async function loop(win, live, scenes, pause = 2200) {
  for (let i = 0; live(); i = (i + 1) % scenes.length) {
    await scenes[i](win, live);
    await sleep(reduced() ? 4000 : pause);
  }
}

/** xKS: fill the deploy form (the YAML follows), deploy, watch it come up. */
export async function xksDeploy(win, live) {
  const v = {};
  await go(win, { current: 'deployments', body: S.xksDeployForm(v) });
  for (const [k, val] of [['name', 'qwen3-chat'], ['uri', 'hf://Qwen/Qwen3-32B'], ['rep', '2'], ['gpu', '2'], ['mem', '64Gi']]) {
    const f = $(`[data-f="${k}"]`, win); if (!f || !live()) return;
    f.classList.add('is-typing'); const t = $('[data-select-text]', f);
    for (let i = 1; i <= val.length && live(); i++) { t.textContent = val.slice(0, i); v[k] = val.slice(0, i); $('[data-yaml]', win).textContent = S.xksYaml(v); await sleep(reduced() ? 0 : 45); }
    f.classList.remove('is-typing'); await sleep(250);
  }
  await sleep(600);
  await press($('[data-xks-deploy]', win), live);
  if (!live()) return;
  await go(win, { current: 'deployments', body: S.xksDeployments(S.xksNewRow(false)) });
  await sleep(2400);
  if (live()) await go(win, { current: 'deployments', body: S.xksDeployments(S.xksNewRow(true)), instant: true });
}
