// Screens of the real products, rebuilt with PatternFly markup. Navigation, titles, descriptions, tabs, columns and
// labels are the ones in odh-dashboard (packages/*/extensions.ts and the page components); rows are illustrative.
import { html, rhIcon, label } from './lib.js';
import { fa, btn, status, switchCtl, select, textInput, searchInput, pageHeader, table, tr, toggleTabs, catCard } from './console.js';

const preview = (t) => `<span class="pf-v6-c-label pf-m-orange pf-m-outline pf-m-compact" style="margin-inline-start:6px"><span class="pf-v6-c-label__content"><span class="pf-v6-c-label__text">${t}</span></span></span>`;

/* ---------- Navigation ---------- */
export const RHOAI_NAV = [
  { id: 'home', label: 'Home', icon: 'HomeNav' },
  { id: 'projects', label: 'Projects', icon: 'ProjectsNav' },
  { id: 'aihub', label: 'AI hub', icon: 'AiHubNav', items: [{ id: 'models', label: 'Models' }, { id: 'mcp', label: 'MCP servers' }, { id: 'agents', label: `Agents${preview('Dev Preview')}` }] },
  { id: 'genai', label: 'Gen AI studio', icon: 'GenAiStudioNav', items: [{ id: 'playground', label: 'Playground' }, { id: 'endpoints', label: 'AI asset endpoints' }, { id: 'apikeys', label: 'API keys' }, { id: 'autorag', label: 'AutoRAG' }, { id: 'prompts', label: 'Prompts' }] },
  { id: 'develop', label: 'Develop & train', icon: 'DevelopAndTrainNav', items: [{ id: 'pipelines', label: 'Pipelines' }, { id: 'evaluations', label: `Evaluations${preview('Tech Preview')}` }, { id: 'jobs', label: 'Jobs' }, { id: 'automl', label: 'AutoML' }, { id: 'experiments', label: 'Experiments' }] },
  { id: 'observe', label: 'Observe & monitor', icon: 'ObserveAndMonitorNav', items: [{ id: 'metrics', label: 'Metrics' }, { id: 'traces', label: 'Agent traces' }] },
  { id: 'learning', label: 'Learning resources', icon: 'LearningResourcesNav' },
  { id: 'applications', label: 'Applications', icon: 'ApplicationsNav', items: [{ id: 'enabled', label: 'Enabled' }, { id: 'explore', label: 'Explore' }] },
  { id: 'settings', label: 'Settings', icon: 'SettingsNav', items: [{ id: 'hwprofiles', label: 'Hardware profiles' }, { id: 'deploysettings', label: 'Model deployment settings' }, { id: 'users', label: 'User management' }, { id: 'governance', label: 'MaaS governance' }] },
];

export const PORTAL_NAV = [
  { id: 'endpoints', label: 'AI asset endpoints', icon: 'AiAssetEndpoints' },
  { id: 'apikeys', label: 'API keys', icon: 'ApiKeysAndSubscriptions' },
  { id: 'observability', label: 'Observability dashboard', icon: 'ObserveAndMonitorNav' },
];

export const XKS_NAV = [
  { id: 'models', label: 'Models', icon: 'AiHubNav' },
  { id: 'deployments', label: 'Deployments', icon: 'DeployedModel' },
];

/* ---------- AI hub ---------- */
const validated = `<span class="pf-v6-c-label pf-m-outline pf-m-success pf-m-compact"><span class="pf-v6-c-label__content"><span class="pf-v6-c-label__icon">${fa('ok')}</span><span class="pf-v6-c-label__text">Validated</span></span></span>`;
const out = (t) => label(t, '', { compact: true }).replace('pf-v6-c-label ', 'pf-v6-c-label pf-m-outline ');
export const MODELS = [
  { id: 'granite', logo: 'G', color: '#0f62fe', name: 'granite-3.3-8b-instruct', by: 'IBM', desc: 'A long-context instruct model tuned for reasoning, RAG and tool use in enterprise applications.', tasks: ['Text generation', 'Tool calling'], v: true },
  { id: 'llama', logo: 'M', color: '#0668e1', name: 'Llama-3.3-70B-Instruct', by: 'Meta', desc: 'Multilingual instruct model with strong reasoning, quantized and validated on OpenShift AI.', tasks: ['Text generation'], v: true },
  { id: 'mistral', logo: 'M', color: '#fa520f', name: 'Mistral-Small-3.1-24B', by: 'Mistral AI', desc: 'Compact model with vision and function calling, for low-latency assistants.', tasks: ['Image-text-to-text', 'Tool calling'], v: true },
  { id: 'qwen', logo: 'Q', color: '#615ced', name: 'Qwen3-32B', by: 'Alibaba Cloud', desc: 'Dense reasoning model with thinking and non-thinking modes and agent capabilities.', tasks: ['Text generation', 'Tool calling'] },
  { id: 'embed', logo: 'G', color: '#0f62fe', name: 'granite-embedding-278m', by: 'IBM', desc: 'Multilingual embedding model for retrieval and semantic search.', tasks: ['Text embedding'], v: true },
  { id: 'gemma', logo: 'G', color: '#1a73e8', name: 'gemma-3-27b-it', by: 'Google', desc: 'Multimodal open model with a 128K context window.', tasks: ['Image-text-to-text'] },
];
export const catalog = (hot = '') => html`${pageHeader('AiHubNav', 'Models', '', '#e0f0ff')}
  ${toggleTabs(['Catalog', 'Registry', 'Runtime library', 'Deployments'], 'Catalog')}
  <p class="ph-desc" style="margin-top:0">Discover models that are available for your organization to register, deploy, and customize.</p>
  <div class="tb">${searchInput('Search')}${select('Task')}${select('Provider')}${select('Hardware type')}<span class="tb__spacer"></span>${switchCtl(true, 'Validated models only')}</div>
  <div class="cat-grid">${MODELS.map((m) => catCard({ id: m.id, logo: m.logo, color: m.color, name: m.name, by: m.by, desc: m.desc, labels: [m.v ? validated : '', out(m.by), ...m.tasks.map(out)] }))}</div>`.replace(`data-card="${hot}"`, `data-card="${hot}" style="box-shadow:0 0 0 2px #0066cc"`);

export const mcpCatalog = () => html`${pageHeader('McpCatalog', 'MCP Catalog', 'Browse and deploy MCP servers provided by Red Hat partners and other providers.', '#e0f0ff')}
  <div class="tb">${searchInput('Search')}${select('Deployment mode')}${select('Security & Verification')}</div>
  <div class="cat-grid">${[
    ['GH', '#24292f', 'GitHub', 'GitHub', 'Read repositories, open issues and pull requests from your agents.', ['Remote', 'Verified source', 'Secure endpoint']],
    ['K8', '#326ce5', 'Kubernetes', 'Red Hat', 'Inspect and operate cluster resources with read-only or scoped tools.', ['Local to cluster', 'Read only tools', 'Red Hat partner']],
    ['SN', '#62d84e', 'ServiceNow', 'ServiceNow', 'Create and update incidents and change requests.', ['Remote', 'Red Hat partner', 'SAST']],
  ].map(([logo, color, name, by, desc, labels]) => catCard({ logo, color, name, by, desc, labels: labels.map(out) }))}</div>`;

/* ---------- Deploy wizard ---------- */
const WIZ = ['Preconfigure deployment', 'Model details', 'Model deployment', 'Advanced settings', 'Review'];
const fg = (lbl, control, helper = '') => `<div class="pf-v6-c-form__group"><div class="pf-v6-c-form__group-label"><label class="pf-v6-c-form__label"><span class="pf-v6-c-form__label-text">${lbl}</span></label></div><div class="pf-v6-c-form__group-control">${control}${helper ? `<div class="pf-v6-c-form__helper-text"><div class="pf-v6-c-helper-text"><div class="pf-v6-c-helper-text__item"><span class="pf-v6-c-helper-text__item-text">${helper}</span></div></div></div>` : ''}</div></div>`;
const check = (on, text, desc = '', attrs = '') => `<div class="pf-v6-c-check" ${attrs}><input class="pf-v6-c-check__input" type="checkbox" ${on ? 'checked' : ''} tabindex="-1"><label class="pf-v6-c-check__label">${text}</label>${desc ? `<span class="pf-v6-c-check__description">${desc}</span>` : ''}</div>`;
const radio = (on, text, desc = '') => `<div class="pf-v6-c-radio"><input class="pf-v6-c-radio__input" type="radio" ${on ? 'checked' : ''} tabindex="-1"><label class="pf-v6-c-radio__label">${text}</label>${desc ? `<span class="pf-v6-c-radio__description">${desc}</span>` : ''}</div>`;
const STEP_BODY = [
  () => fg('Project', select('fraud-detection')),
  () => fg('Model location', select('URI') + '<div style="height:10px"></div>' + select('oci://registry.redhat.io/rhelai1/modelcar-granite-3-3-8b-instruct:1.5')) + fg('Model type', select('Generative AI model (Example, LLM)')),
  () => fg('Model deployment name', textInput('granite-3-3-8b-instruct')) + fg('Hardware profile', select('NVIDIA L40S · 1 GPU · 24 GiB'), 'Compatible with 2 deployment resources') +
    fg('Deployment resource', select(`vLLM NVIDIA GPU ServingRuntime for KServe&nbsp;${label('Compatible with hardware profile', 'blue')}`)) +
    fg('Deployment method', `<div style="display:flex;gap:24px">${radio(false, 'KServe')}${radio(true, 'LLM-D', 'Distributed inference with intelligent routing')}</div>`) + fg('Replicas', textInput('2')),
  () => fg('Model capabilities', `<div class="msg-tools">${label('Tool calling', 'blue')} ${label('Reasoning', 'blue')}</div>`, 'Pre-filled from the catalog: <span class="code-chip">--enable-auto-tool-choice --tool-call-parser granite</span>') +
    fg('Availability', check(true, 'Gen AI studio', 'Model endpoints are accessible from the <b>AI asset endpoints</b> page, which makes the model available on the <b>Playground</b> page.')) +
    fg('', `${radio(false, 'Project members', 'Available within the UI to users with access to this project.')}${radio(true, 'Subscribed users', 'Available as a service (MaaS) to users with an admin-assigned subscription and authorization policy.')}`) +
    fg('Model access', check(true, 'Make model deployment available through an external route')) + fg('Token authentication', check(true, 'Require token authentication')),
  () => `<dl class="pf-v6-c-description-list pf-m-horizontal">${[['Model location', 'URI · oci://…/granite-3-3-8b-instruct'], ['Hardware profile', 'NVIDIA L40S'], ['Deployment resource', 'vLLM NVIDIA GPU ServingRuntime'], ['Deployment method', 'LLM-D · 2 replicas'], ['Model capabilities', 'Tool calling, Reasoning'], ['MaaS endpoint', 'Yes'], ['Token authentication', 'Required']].map(([t, d]) => `<div class="pf-v6-c-description-list__group"><dt class="pf-v6-c-description-list__term"><span class="pf-v6-c-description-list__text">${t}</span></dt><dd class="pf-v6-c-description-list__description"><div class="pf-v6-c-description-list__text">${d}</div></dd></div>`).join('')}</dl>`,
];
export const deployWizard = (step = 1) => html`<h1 style="font:500 24px var(--pf-t--global--font--family--heading);margin:0">Deploy a model</h1><p class="ph-desc" style="margin-top:4px">Configure deployment options for this model version.</p>
  <div class="wiz"><nav class="wiz__nav"><ol class="wiz-steps">${WIZ.map((st, i) => `<li class="wiz-step ${i === step ? 'is-current' : ''} ${i < step ? 'is-done' : ''}"><span class="wiz-step__n">${i + 1}</span><span class="wiz-step__t">${st}</span></li>`)}</ol></nav>
  <div class="wiz__body"><form class="pf-v6-c-form" onsubmit="return false">${STEP_BODY[step]()}</form>
  <div class="wiz__foot">${btn('Back', 'secondary')}${btn(step === 4 ? 'Deploy model' : 'Next', 'primary', 'data-wiz-next')}${btn('Cancel', 'link')}</div></div></div>`;

/* ---------- Deployments ---------- */
const DEPLOY_COLS = ['Model deployment name', 'Project', 'Deployment resource', 'Inference endpoints', 'Hardware profile', 'Status'];
export const DEPLOY_ROWS = [
  ['<b>llama-3-3-70b</b>', 'support-assistant', 'vLLM · LLM-D', '<a>Internal and external</a>', 'NVIDIA H100 × 4', status('ok', 'Ready')],
  ['<b>granite-embedding</b>', 'rag-research', 'vLLM CPU', '<a>Internal</a>', 'CPU · 8 GiB', status('ok', 'Ready')],
  ['<b>fraud-xgboost</b>', 'fraud-detection', 'OpenVINO Model Server', '<a>Internal</a>', 'CPU · 4 GiB', status('off', 'Stopped')],
];
export const deployments = (extra = null) => html`${pageHeader('DeployedModel', 'Model deployments', 'View and manage the health and performance of deployed models.', '#f0e6ff')}
  ${toggleTabs(['Internal models', 'External models'], 'Internal models')}
  <div class="tb">${searchInput('Filter by name')}${select('All projects')}<span class="tb__spacer"></span>${btn('Deploy model')}</div>
  ${table(DEPLOY_COLS, [], { attrs: 'data-deploy-table' }).replace('<tbody class="pf-v6-c-table__tbody">', `<tbody class="pf-v6-c-table__tbody">${extra ? tr(extra, 'is-new') : ''}${DEPLOY_ROWS.map((r) => tr(r)).join('')}`)}`;
export const newDeployRow = (st) => ['<b>granite-3-3-8b-instruct</b>', 'fraud-detection', 'vLLM · LLM-D', st === 'ok' ? '<a>Internal and external</a>' : '—', 'NVIDIA L40S', st === 'ok' ? status('ok', 'Ready') : status('run', 'Starting')];

/* ---------- Gen AI studio ---------- */
export const aiAssets = () => html`${pageHeader('AiAssetEndpoints', 'AI asset endpoints', 'Browse endpoints for models and MCP servers that are available as AI assets.', '#ffe9e0')}
  ${toggleTabs(['Models', 'MCP servers', 'Vector stores', 'Agents'], 'Models')}
  ${table(['Model', 'Use case', 'Capabilities', 'Status', 'Access details', 'Playground'], [
    ['<b>granite-3-3-8b-instruct</b><span class="sub">fraud-detection</span>', 'Chat assistant', `${label('Tool calling', 'blue')}`, status('ok', 'Ready'), '<a>View</a>', btn('Try in playground', 'secondary')],
    ['<b>llama-3-3-70b</b><span class="sub">support-assistant</span>', 'Summarization', `${label('Long context', 'blue')}`, status('ok', 'Ready'), '<a>View</a>', btn('Try in playground', 'secondary')],
    ['<b>gpt-4o</b><span class="sub">External · MaaS</span>', 'General', `${label('Vision', 'blue')}`, status('ok', 'Ready'), '<a>View</a>', btn('Try in playground', 'secondary')],
  ])}`;

const avatar = (me) => me
  ? `<span class="pf-chatbot__message-avatar" style="width:32px;height:32px;border-radius:50%;background:#0066cc;color:#fff;display:grid;place-items:center;font:600 13px var(--pf-t--global--font--family--heading);flex:none">AG</span>`
  : `<img class="pf-chatbot__message-avatar" src="assets/UI_icon-Red_Hat-Chatbot-Avatar.svg" alt="" style="width:32px;height:32px;flex:none">`;
export const message = (me, name, body, extra = '') => html`<section class="pf-chatbot__message ${me ? 'pf-chatbot__message--user' : ''}" style="display:flex;gap:12px;margin:10px 0">${avatar(me)}
  <div class="pf-chatbot__message-contents"><div class="pf-chatbot__message-meta"><span class="pf-chatbot__message-name">${name}</span></div>
  <div class="pf-chatbot__message-response">${extra}<div class="pf-chatbot__message-text" data-msg-text>${body}</div></div></div></section>`;
export const playground = ({ messages = '', tab = 'MCP' } = {}) => html`<div class="pg" style="margin:-24px;height:calc(100% + 48px)">
  <div class="pg__chat">
    <div class="pg__head"><b style="font:500 20px var(--pf-t--global--font--family--heading)">Playground</b><span class="tb__spacer"></span>${select('granite-3-3-8b-instruct')}
      ${[rhIcon('RhUiControls', { size: 16 }), fa('plus'), rhIcon('Build', { size: 16 }), rhIcon('SettingsNav', { size: 16 })].map((i) => `<button class="pf-v6-c-button pf-m-plain" tabindex="-1">${i}</button>`).join('')}</div>
    <div class="pg__msgs" data-msgs>${messages || html`<div style="margin:auto;text-align:center"><h2 style="font:500 28px var(--pf-t--global--font--family--heading);margin:0">Hello, Ana</h2><p style="color:var(--pf-t--global--text--color--subtle)">Before you begin chatting, you can change the model, edit the system prompt, adjust model parameters to fit your specific use case.</p></div>`}</div>
    <div class="pg__bar"><div class="bar-input"><span data-typing-box>Send a message…</span><span class="send">${fa('send')}</span></div><p style="text-align:center;font-size:12px;color:var(--pf-t--global--text--color--subtle);margin:8px 0 0">This chatbot uses AI. Check for mistakes.</p></div>
  </div>
  <aside class="pg__side">
    ${toggleTabs(['Model', 'Prompt', 'RAG', 'MCP', 'Guardrails'], tab)}
    ${tab === 'MCP' ? html`<div class="tool-card">${rhIcon('McpCatalog', { size: 18 })}<div><b>github</b><div style="font-size:12px;color:var(--pf-t--global--text--color--subtle)">12 tools · Authorized</div></div>${switchCtl(true)}</div>
      <div class="tool-card">${rhIcon('McpCatalog', { size: 18 })}<div><b>servicenow</b><div style="font-size:12px;color:var(--pf-t--global--text--color--subtle)">8 tools · Authorized</div></div>${switchCtl(true)}</div>
      <div class="tool-card">${rhIcon('McpCatalog', { size: 18 })}<div><b>kubernetes</b><div style="font-size:12px;color:var(--pf-t--global--text--color--subtle)">Needs authorization</div></div>${switchCtl(false)}</div>
      <p style="font-weight:600;margin:10px 0 0;font-size:14px">RAG</p>
      <div class="tool-card">${fa('paperclip')}<div><b>runbook.pdf</b><div style="font-size:12px;color:var(--pf-t--global--text--color--subtle)">Use uploaded documents · 412 chunks</div></div>${switchCtl(true)}</div>`
    : html`${fg('Model', select('granite-3-3-8b-instruct'))}${fg('Temperature: 0 - 2', '<div class="mbar__track"><div class="mbar__fill" style="width:35%"></div></div>')}${fg('', switchCtl(true, 'Streaming'))}`}
  </aside></div>`;

/* ---------- Develop & train ---------- */
export const evaluations = (done = false) => html`${pageHeader('ModelEvaluation', 'Evaluations', 'Start and manage evaluation runs for models, agents, and datasets.', '#e7f6ea')}
  ${toggleTabs(['Gallery', 'Benchmark collections', 'Runs'], 'Runs')}
  <div class="tb">${searchInput('Filter by name')}<span class="tb__spacer"></span>${btn('Start evaluation run')}</div>
  ${table(['Name', 'Job status', 'Evaluation', 'Evaluated', 'Date', 'Result'], [
    ['<b>granite-tool-use</b>', done ? status('ok', 'Complete') : status('run', 'Running'), 'Tool use · BFCL', 'granite-3-3-8b-instruct', 'Oct 24', done ? '<b>88.4%</b>' : '—'],
    ['<b>rag-faithfulness</b>', done ? status('ok', 'Complete') : status('run', 'Running'), 'Your collection · 3 benchmarks', 'support-rag-v2', 'Oct 24', done ? '<b>0.86</b>' : '—'],
    ['<b>safety-baseline</b>', status('ok', 'Complete'), 'Safety · curated', 'llama-3-3-70b', 'Oct 22', '<b>94.0%</b>'],
    ['<b>mmlu-pro</b>', status('ok', 'Complete'), 'Knowledge · MMLU-Pro', 'llama-3-3-70b', 'Oct 21', '<b>71.2%</b>'],
  ])}`;

export const autorag = () => html`${pageHeader('Autorag', 'AutoRAG', 'Automatically test and tune retrieval, indexing, and model settings to improve Retrieval-Augmented Generation (RAG) response quality.', '#fff4cc')}
  <div class="stat-cards">${[['12', 'patterns evaluated'], ['0.86', 'best faithfulness'], ['3', 'models compared'], ['41 min', 'run time']].map(([v, l]) => `<div class="pf-v6-c-card pf-m-compact"><div class="pf-v6-c-card__body"><b>${v}</b><span>${l}</span></div></div>`).join('')}</div>
  ${table(['Rank', 'Pattern name', 'Model name', 'faithfulness', 'answer_correctness', 'context_correctness'], [
    [`<b>1</b> ${label('Best', 'green')}`, '<b>hybrid-rerank-512</b>', 'granite-3-3-8b-instruct', '0.86', '0.81', '0.90'],
    ['2', 'dense-1024-overlap', 'llama-3-3-70b', '0.83', '0.79', '0.86'],
    ['3', 'dense-512', 'granite-3-3-8b-instruct', '0.80', '0.74', '0.83'],
    ['4', 'bm25-baseline', 'granite-3-3-8b-instruct', '0.71', '0.66', '0.72'],
  ])}`;

export const automl = () => html`${pageHeader('Automl', 'AutoML', 'Automatically configure and optimize your machine learning workflows.', '#fff4cc')}
  ${table(['Rank', 'Model name', 'Accuracy', 'Balanced Accuracy', 'Log Loss'], [
    [`<b>1</b> ${label('Best', 'green')}`, '<b>LightGBM · tuned</b>', '0.962', '0.948', '0.118'],
    ['2', 'XGBoost', '0.957', '0.941', '0.131'], ['3', 'RandomForest', '0.944', '0.920', '0.164'],
  ])}`;

export const workbenches = () => html`${pageHeader('ProjectsNav', 'Fraud detection', '', '#fff0db')}
  ${toggleTabs(['Overview', 'Workbenches', 'Pipelines', 'Deployments', 'Cluster storage', 'Connections', 'Permissions'], 'Workbenches')}
  ${table(['Name', 'Workbench image', 'Hardware profile', 'Status', ''], [
    ['<b>fraud-features</b>', 'Jupyter | PyTorch | CUDA | Python 3.12', 'NVIDIA A100', status('ok', 'Running'), switchCtl(true)],
    ['<b>rag-prototype</b>', 'Code Server | Data Science | CPU', 'Small · CPU', status('off', 'Stopped'), switchCtl(false)],
    ['<b>kfp-authoring</b>', 'Jupyter | Data Science | CPU', 'Small · CPU', status('ok', 'Running'), switchCtl(true)],
  ])}`;

export const hardwareProfiles = () => html`${pageHeader('HardwareProfile', 'Hardware profiles', 'Manage hardware profiles for your organization. Administrators can use hardware profiles to determine resource allocation strategies for specific workloads.', '#e0f0ff')}
  ${table(['Name', 'Workload type', 'Enabled', 'Last modified'], [
    ['<b>NVIDIA H100</b><span class="sub">4 GPUs · queue team-research</span>', 'Model serving', switchCtl(true), 'Oct 20'],
    ['<b>NVIDIA L40S</b><span class="sub">1 GPU · 24 GiB</span>', 'Model serving, Workbench', switchCtl(true), 'Oct 18'],
    ['<b>NVIDIA A100</b><span class="sub">1 GPU · queue team-a</span>', 'Workbench, Training', switchCtl(true), 'Oct 12'],
    ['<b>Small · CPU</b><span class="sub">2 CPU · 8 GiB</span>', 'All', switchCtl(true), 'Sep 30'],
  ])}`;

/* ---------- MaaS ---------- */
const copyField = (t) => `<div class="fake-select" style="background:var(--pf-t--global--background--color--secondary--default,#f2f2f2)"><span class="code-chip" style="background:none;padding:0">${t}</span>${fa('copy')}</div>`;
export const apiKeys = (fresh = false) => html`${pageHeader('ApiKeysAndSubscriptions', 'API keys', '', '#fde8e8')}
  ${toggleTabs(['API keys', 'Subscriptions'], 'API keys')}
  <div class="tb">${searchInput('Filter by name')}<span class="tb__spacer"></span>${btn('Create API key', 'primary', 'data-create-key')}</div>
  ${table(['Name', 'Status', 'Subscription', 'Owner', 'Last used', 'Expires'], [
    ...(fresh ? [] : []),
    ['<b>support-bot-prod</b>', status('ok', 'Active'), 'Standard', 'ana.garcia', '2 min ago', 'in 89 days'],
    ['<b>notebook-dev</b>', status('warn', 'Expiring'), 'Free', 'ana.garcia', 'yesterday', 'in 6 days'],
    ['<b>batch-summaries</b>', status('ok', 'Active'), 'Premium', 'ana.garcia', '1 h ago', 'in 30 days'],
  ], { attrs: 'data-keys-table' })}`;
export const keyRow = () => tr(['<b>fraud-agent</b>', status('ok', 'Active'), 'Standard', 'ana.garcia', 'never', 'in 90 days'], 'is-new');
export const saveKeyModal = () => html`<div class="pf-v6-c-backdrop" style="position:absolute;inset:0;display:grid;place-items:center;z-index:4">
  <div class="pf-v6-c-modal-box pf-m-md" role="dialog" style="max-width:620px"><header class="pf-v6-c-modal-box__header"><h1 class="pf-v6-c-modal-box__title"><span class="pf-v6-c-modal-box__title-text">Save your API key</span></h1></header>
  <div class="pf-v6-c-modal-box__body"><div class="pf-v6-c-alert pf-m-inline pf-m-warning pf-m-plain" style="margin-bottom:14px"><p class="pf-v6-c-alert__title">This is the only time the key is shown.</p></div>
  ${fg('API key', copyField('sk-maas-•••••••••••••••••••••Q7f2'))}${fg('Base URL', copyField('https://maas.apps.cluster.example.com/v1'))}${fg('Model ID', copyField('granite-3-3-8b-instruct'))}
  ${fg('Usage example', `<pre class="code-chip" style="display:block;padding:10px;white-space:pre;margin:0">curl $BASE_URL/chat/completions \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d '{"model":"granite-3-3-8b-instruct","messages":[…]}'</pre>`)}</div>
  <footer class="pf-v6-c-modal-box__footer">${btn('Close')}</footer></div></div>`;

export const governance = () => html`${pageHeader('ApiKeysAndSubscriptions', 'MaaS governance', 'Manage subscriptions and authorization policies that control access to models through the Models-as-a-Service (MaaS) gateway.', '#fde8e8')}
  ${toggleTabs(['Overview', 'Subscriptions', 'Authorization policies'], 'Subscriptions')}
  <div class="tb">${searchInput('Filter by name')}<span class="tb__spacer"></span>${btn('Create subscription')}</div>
  ${table(['Subscription', 'Status', 'Groups', 'Models', 'Token limits'], [
    ['<b>Free</b>', status('ok', 'Active'), 'all-developers', '2', '50K / day · 5 req/min'],
    ['<b>Standard</b>', status('ok', 'Active'), 'app-teams', '4', '2M / day · 60 req/min'],
    ['<b>Premium</b>', status('ok', 'Active'), 'prod-services', '6', 'Unlimited · 600 req/min'],
  ])}`;

export const externalModels = () => html`${pageHeader('ApiKeysAndSubscriptions', 'External models', 'Hosted providers behind the same keys, limits and audit.', '#fde8e8')}
  ${table(['Model', 'Provider references', 'Status'], [
    ['<b>gpt-4o</b>', 'openai-prod', status('ok', 'Ready')],
    ['<b>claude-sonnet</b>', 'bedrock-eu', status('ok', 'Ready')],
  ])}`;

export const portalEndpoints = () => html`${pageHeader('AiAssetEndpoints', 'AI asset endpoints', 'Models your subscriptions give you access to.', '#ffe9e0')}
  ${table(['Model', 'Use case', 'Capabilities', 'Status', 'Access details'], [
    ['<b>granite-3-3-8b-instruct</b>', 'Chat assistant', label('Tool calling', 'blue'), status('ok', 'Ready'), '<a>View</a>'],
    ['<b>llama-3-3-70b</b>', 'Summarization', label('Long context', 'blue'), status('ok', 'Ready'), '<a>View</a>'],
    ['<b>granite-embedding-278m</b>', 'Retrieval', label('Embeddings', 'blue'), status('ok', 'Ready'), '<a>View</a>'],
    ['<b>gpt-4o</b>', 'General', label('Vision', 'blue'), status('ok', 'Ready'), '<a>View</a>'],
  ])}`;

export const usageDashboard = () => html`${pageHeader('ObserveAndMonitorNav', 'Observability dashboard', 'Token usage for your API keys this month.', '#e0f0ff')}
  <div class="stat-cards">${[['13.3M', 'tokens this month'], ['41K', 'requests'], ['0.9 s', 'median latency'], ['0.2%', 'rate-limited']].map(([v, l]) => `<div class="pf-v6-c-card pf-m-compact"><div class="pf-v6-c-card__body"><b>${v}</b><span>${l}</span></div></div>`).join('')}</div>
  <div class="pf-v6-c-card"><div class="pf-v6-c-card__title"><h2 class="pf-v6-c-card__title-text">Tokens by model</h2></div><div class="pf-v6-c-card__body">
  ${[['granite-3-3-8b', 64, '6.4M'], ['llama-3-3-70b', 38, '3.8M'], ['granite-embedding', 22, '2.2M'], ['gpt-4o', 9, '0.9M']].map(([k, v, l]) => `<div class="mbar"><span>${k}</span><div class="mbar__track"><div class="mbar__fill" data-w="${v}"></div></div><b>${l}</b></div>`).join('')}</div></div>`;

/* ---------- xKS ---------- */
export const xksDeployForm = (v = {}) => html`<h1 style="font:500 24px var(--pf-t--global--font--family--heading);margin:0 0 18px">Deploy a model</h1>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
  <form class="pf-v6-c-form" onsubmit="return false">${fg('Name', textInput(v.name ?? '', 'data-f="name"'))}${fg('Model URI', textInput(v.uri ?? '', 'data-f="uri"'))}${fg('Replicas', textInput(v.rep ?? '1', 'data-f="rep"'))}${fg('GPUs per replica', textInput(v.gpu ?? '1', 'data-f="gpu"'))}${fg('Memory', textInput(v.mem ?? '24Gi', 'data-f="mem"'))}
  <div style="display:flex;gap:12px;margin-top:8px">${btn('Deploy', 'primary', 'data-xks-deploy')}${btn('Cancel', 'link')}</div></form>
  <div class="pf-v6-c-card pf-m-compact"><div class="pf-v6-c-card__title"><h2 class="pf-v6-c-card__title-text">YAML preview</h2></div><div class="pf-v6-c-card__body"><pre class="code-chip" style="display:block;white-space:pre;padding:12px;margin:0;line-height:1.6" data-yaml>${xksYaml(v)}</pre></div></div></div>`;
export const xksYaml = (v = {}) => `apiVersion: serving.kserve.io/v1alpha1
kind: LLMInferenceService
metadata:
  name: ${v.name || '…'}
  namespace: ai-serving
spec:
  model:
    uri: ${v.uri || '…'}
  replicas: ${v.rep ?? 1}
  template:
    containers:
    - resources:
        limits:
          nvidia.com/gpu: ${v.gpu ?? 1}
          memory: ${v.mem ?? '24Gi'}
  router:
    scheduler: {}`;

export const xksDeployments = (extra = null) => html`${pageHeader('DeployedModel', 'Deployments', 'LLMs served with KServe and llm-d on this cluster.', '#f0e6ff')}
  <div class="tb">${searchInput('Filter by name')}${select('Namespace: ai-serving')}<span class="tb__spacer"></span>${btn('Deploy model')}</div>
  ${table(['Name', 'Model', 'Replicas', 'Hardware', 'Endpoint', 'Status'], [
    ['<b>granite-chat</b>', 'granite-3.3-8b-instruct', '2', 'Standard_NC24ads_A100_v4', '<a>Copy URL</a>', status('ok', 'Ready')],
    ['<b>llama-70b</b>', 'Llama-3.3-70B-Instruct', '4', 'Standard_ND96isr_H100_v5', '<a>Copy URL</a>', status('ok', 'Ready')],
    ['<b>embeddings</b>', 'granite-embedding-278m', '1', 'CPU', '<a>Copy URL</a>', status('ok', 'Ready')],
  ]).replace('<tbody class="pf-v6-c-table__tbody">', `<tbody class="pf-v6-c-table__tbody">${extra ? tr(extra, 'is-new') : ''}`)}`;
export const xksNewRow = (ok) => ['<b>qwen3-chat</b>', 'Qwen3-32B', '2', 'Standard_NC24ads_A100_v4', ok ? '<a>Copy URL</a>' : '—', ok ? status('ok', 'Ready') : status('run', 'Starting')];

export { fg, check, radio };
