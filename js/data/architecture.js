// Extensions to the schema (all optional):
//   tab.jira               keys listed under the tab
//   tab.diagrams           further stacks shown under the main one: [{ id, title, intro?, layers, cards? }]
//   layer.itemNotes        { item: tooltip } for the chips of a layer
//   container.layer        id of the layer (in `layers` or a diagram) the container sits in
//   container.port         port label shown on the container
//   container.kind         adds 'container' (a container inside a pod)
//   diagram.cards          [{ title, description }] for card-style diagrams (Gateway Sharding)
export default [
  {
    id: 'rhoai',
    label: 'ODH / RHOAI',
    intro: 'RHOAI is a productized, operator-managed AI/ML platform layered on OpenShift and built from the upstream Open Data Hub (ODH) distribution — one codebase and one operator, shipped as overlays rather than forks. The Dashboard is the unifying console that spans every layer of the stack.',
    layers: [
      { id: 'distributions', name: 'Distributions &amp; Future', items: ['xKS', 'MaaS Portal', 'Gateway Sharding', 'BYO-OIDC'] },
      { id: 'dashboard', name: 'Dashboard — Pewter', owner: 'pewter', items: ['Module Federation host', 'per-module Go BFFs', 'Core BFF', 'Dashboard Operator', 'manifests'] },
      { id: 'components', name: 'Components', owner: 'components', items: ['KServe / model serving', 'AI Gateway + MaaS', 'Gen AI', 'Model Registry', 'Pipelines', 'Workbenches', 'TrustyAI'] },
      { id: 'platform', name: 'RHOAI Platform', owner: 'platform', items: ['opendatahub-operator / rhods-operator', 'DataScienceCluster (DSC / DSCI)', 'platform networking &amp; auth'] },
      { id: 'openshift', name: 'OpenShift', owner: 'openshift', items: ['OLM', 'Gateway API / Routes', 'OAuth / OIDC', 'RBAC', 'NetworkPolicies', 'TLS'] },
    ],
    diagrams: [
      {
        id: 'modular',
        title: 'Dashboard layer — Modular Architecture',
        layers: [
          { id: 'operator', name: 'Dashboard Operator', owner: 'pewter', items: [], note: 'Kubernetes controller — lifecycle, upgrades, health, reconciliation' },
          { id: 'main-pod', name: 'Main Dashboard Pod', owner: 'pewter', items: [] },
          {
            id: 'module-pods',
            name: 'Module Pods (Independent Lifecycle)',
            owner: 'components',
            items: ['Model Registry', 'GenAI Studio', 'MaaS', 'AI Catalog', 'MCP Catalog', 'AutoML', 'AutoRAG', 'Eval-Hub', 'MLflow', 'Agent Ops', 'Data Registry', 'Notebooks v2'],
            itemNotes: {
              'Model Registry': 'Model versioning &amp; lifecycle · Go BFF :8043',
              'GenAI Studio': 'AI experimentation workspace · Go BFF :8143',
              MaaS: 'Models as a Service · Go BFF :8243',
              'AI Catalog': 'Model discovery &amp; deployment · Go BFF',
              'MCP Catalog': 'MCP server discovery · part of model-registry BFF',
              AutoML: 'Automated ML generation · Go BFF :8643',
              AutoRAG: 'RAG optimization · Go BFF :8743',
              'Eval-Hub': 'Evaluation orchestration · Go BFF :8543',
              MLflow: 'MLflow integration · mlflow-go SDK :8343',
              'Agent Ops': 'AI agent deployments · Go BFF :8843',
              'Data Registry': 'Data asset registration · Iceberg REST Catalog',
              'Notebooks v2': 'Next-gen notebooks · upstream Kubeflow module',
            },
          },
          {
            id: 'external',
            name: 'External Integrations (Proxy-based)',
            items: ['Perses', 'MLflow UI'],
            itemNotes: {
              Perses: 'Observability dashboards · proxy to Perses service',
              'MLflow UI': 'Experiment tracking · iframe embedding + proxy',
            },
          },
          { id: 'k8s', name: 'Kubernetes / OpenShift', owner: 'openshift', items: [], note: 'CRDs, operators, and platform resources' },
        ],
      },
    ],
    containers: [
      { name: 'Fastify', kind: 'container', layer: 'main-pod', port: ':8080', description: 'Node.js backend — serves React frontend and legacy BFF API' },
      { name: 'kube-rbac-proxy', kind: 'container', layer: 'main-pod', port: ':8443', description: 'Authentication gateway — OpenShift auth, TLS termination' },
      { name: 'Core BFF (Go)', kind: 'container', layer: 'main-pod', port: ':8943', description: 'Go backend replacing Fastify — auth, config, status, proxies' },
    ],
    facts: [
      { label: 'Module Federation', value: 'Webpack 5 micro-frontends sharing code at runtime' },
      { label: 'Type-Safe Contracts', value: 'OpenAPI specs with generated TypeScript and Go code' },
      { label: 'Two Deployment Modes', value: 'Sidecar (single pod, 11 containers) or Standalone (independent pods per module)' },
      { label: 'Operator-Managed Lifecycle', value: 'Self-healing reconciliation, zero-downtime upgrades, per-module health status' },
    ],
  },
  {
    id: 'maas',
    label: 'MaaS Portal',
    intro: 'The MaaS Portal is a frontend-only odh-dashboard distribution — it bundles only the <code>maas</code> and <code>gen-ai</code> packages — giving Models-as-a-Service consumers (application developers with no OpenShift accounts) self-service access to their granted endpoints and API keys. The Dashboard Operator deploys it via a <code>consumerPortal</code> flag on the existing Dashboard CR — no second CR, no net-new product behavior.',
    layers: [
      { id: 'consumer', name: 'MaaS Consumer', items: [], note: 'Application developer / external user — no OpenShift account' },
      { id: 'gateway', name: 'data-science-gateway', owner: 'platform', items: [], note: 'Auth-agnostic — inherits BYO-OIDC or OpenShift auth; the portal engineers no auth of its own' },
      { id: 'portal', name: 'MaaS Portal Distribution', owner: 'pewter', items: [] },
      {
        id: 'module-bffs',
        name: 'Module BFFs',
        owner: 'components',
        items: ['maas BFF', 'gen-ai BFF'],
        itemNotes: {
          'maas BFF': '<code>/maas/api/*</code> — granted endpoints &amp; self-service API keys',
          'gen-ai BFF': '<code>/gen-ai/api/*</code> — inherited Gen AI surfaces',
        },
      },
    ],
    containers: [
      { name: 'React Shell', kind: 'container', layer: 'portal', description: 'Static Rspack build — maas + gen-ai packages only, no App Picker' },
      { name: 'Core BFF', kind: 'container', layer: 'portal', port: 'MaaS mode', description: 'Go reverse proxy reusing the core-bff proxy factory (MaaS mode)' },
    ],
    diagrams: [
      {
        id: 'data-plane',
        title: 'MaaS data plane (machine-to-machine)',
        intro: 'The browser session above is a separate plane from the programmatic inference path. Consumers call model endpoints with OpenAI-compatible <code>sk-oai-*</code> keys, authenticated and rate-limited by the MaaS gateway independently of the portal UI.',
        layers: [
          { id: 'kuadrant', name: 'MaaS Gateway — Kuadrant', items: ['Authorino (JWT / sk-oai-* API keys)', 'Limitador (rate limiting)'] },
          { id: 'serving', name: 'KServe / Model Serving', owner: 'components', items: [], note: 'The inference endpoints consumers call programmatically' },
        ],
      },
      {
        id: 'sharding',
        title: 'Gateway Sharding — per-zone OIDC',
        intro: 'The portal itself is auth-agnostic; true per-zone OIDC isolation comes from <strong>Gateway Sharding</strong>. One cluster can expose surfaces through more than one network zone (e.g. a corporate-internal zone and a DMZ), each with its own hostname, IngressController, and independent authentication — without abandoning the single managed Gateway.',
        layers: [],
        cards: [
          { title: 'One Managed Gateway', description: 'A single <code>default-gateway</code> and one shared Envoy. Sharding is additive via <code>additionalIngresses[]</code> — no <code>additionalGateways</code>.' },
          { title: 'Zone A — Internal', description: 'Own hostname + IngressController + a distinct OIDC <code>clientID</code>/secret (or a distinct OAuthClient in OpenShift-auth mode).' },
          { title: 'Zone B — DMZ', description: 'Its own hostname, IngressController, and OIDC client. Port-scoped auth dispatch keeps each zone\'s sessions separate.' },
        ],
      },
    ],
    jira: ['RHAISTRAT-1545', 'RHAISTRAT-2272'],
  },
  {
    id: 'xks',
    label: 'xKS',
    intro: 'xKS is RHOAI/RHAII running on <strong>any non-OpenShift Kubernetes</strong> — GA target Azure AKS with Entra ID (OIDC). It ships as a single-container distribution (<code>model-serving</code> + <code>kserve</code>) in which the Go Core BFF is the sole backend, filling in for the Fastify pass-through that does not exist off OpenShift.',
    layers: [
      { id: 'user', name: 'User', items: [], note: 'Signs in against the customer identity provider' },
      { id: 'auth', name: 'kube-auth-proxy', owner: 'platform', items: [], note: 'OIDC → Azure Entra ID' },
      { id: 'rhaii', name: 'RHAII Distribution (single container)', owner: 'pewter', items: [] },
      { id: 'k8s', name: 'Kubernetes API → KServe / llm-d', owner: 'components', items: [], note: 'LLMInferenceService model deployments on AKS' },
    ],
    containers: [
      { name: 'App Shell', kind: 'container', layer: 'rhaii', description: 'React app shell served directly by the Go Core BFF' },
      { name: 'Core BFF (Go)', kind: 'container', layer: 'rhaii', description: 'Go — the sole backend; <code>/api/*</code> drives LLMInferenceService CRUD' },
      { name: 'kube-rbac-proxy', kind: 'container', layer: 'rhaii', description: 'TokenReview / SubjectAccessReview against the Kubernetes API' },
    ],
    facts: [
      { label: 'Single Codebase', value: 'RHOAI and RHAII are produced from one commit at HEAD — no forks.' },
      { label: 'Helm / CCM Install', value: 'No OLM or DSC off OpenShift — the RHAI operator ships bundles as Helm charts via the Cloud Controller Manager.' },
      { label: 'Pluggable Gateway', value: 'A configurable GatewayConfig replaces hardcoded OpenShift constants and adds a Gateway-API ingress mode.' },
      { label: 'Uniform Identity Contract', value: 'Every component sees the same identity headers regardless of platform.' },
    ],
    jira: ['RHAISTRAT-2252', 'RHAISTRAT-1722', 'RHOAIENG-65252'],
  },
];
