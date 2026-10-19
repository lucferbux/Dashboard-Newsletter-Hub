// The seven ownership areas named in the hero. Summaries come from the About cards
// (Modular Architecture, Dashboard Operator, Platform Operations, Distributions & Support)
// and, for the areas without a card, from facts stated elsewhere on the page.
export default [
  {
    id: 'modular-architecture',
    title: 'Modular Architecture',
    icon: 'module',
    summary: 'We built a micro-frontend platform using Webpack Module Federation, enabling 10+ teams to develop and deploy independently. Each module ships as its own pod with dedicated scaling and failure isolation.',
    points: [
      'Webpack 5 micro-frontends sharing code at runtime',
      'Type-safe contracts: OpenAPI specs with generated TypeScript and Go code',
      'Shared foundations via mod-arch-library (core, shared, kubeflow)',
    ],
  },
  {
    id: 'operator',
    title: 'Dashboard Operator',
    icon: 'operator',
    summary: 'A standalone Kubernetes operator that manages the full lifecycle: deployments, upgrades, health monitoring, and cleanup — independent of the central ODH Operator. Supports both sidecar and standalone deployment modes.',
    points: [
      'Self-healing reconciliation, zero-downtime upgrades, per-module health status',
      'Sidecar (single pod, 11 containers) or Standalone (independent pods per module)',
    ],
    jira: ['RHOAIENG-60566'],
  },
  {
    id: 'distributions',
    title: 'Distributions',
    icon: 'distribute',
    summary: 'Multiple deployment targets — OpenShift (RHOAI), bare Kubernetes via xKS (AKS, EKS, CoreWeave), and the MaaS Consumer Portal.',
    href: '#architecture',
  },
  {
    id: 'core-bff',
    title: 'Core BFF',
    icon: 'server-stack',
    summary: 'The Go backend replacing Fastify — auth, config, status, and proxies. The sole backend in the xKS distribution, and reused in MaaS mode by the MaaS Portal.',
    jira: ['RHOAIENG-60028'],
  },
  {
    id: 'manifests',
    title: 'Manifests &amp; Platform Operations',
    icon: 'package',
    summary: 'Manifest deployment, release management, quality gates enforcement, and CI/CD automation. Every module has AI Harness, quality gates, and automated deployment pipelines in place.',
  },
  {
    id: 'frontend-platform',
    title: 'Frontend &amp; Platform Support',
    icon: 'controls',
    summary: 'The shared frontend foundations module teams build on: mod-arch-library, the Turbo monorepo (25 packages), and an agentic-ready codebase.',
  },
  {
    id: 'onboarding',
    title: 'Onboarding',
    icon: 'rocket',
    summary: 'Onboarding and tooling support for module teams. Claude Code skills (<strong>/module-onboarding</strong>, <strong>/konflux-onboarding</strong>) bring a new module and its build pipeline online in ~4 hours instead of 5 working days.',
    jira: ['RHOAIENG-37060'],
  },
];
