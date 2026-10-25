// The eight ownership areas named in the hero. Summaries come from the About cards
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
    summary: 'The Go backend for every distribution — auth, config, status and proxies. It is already the backend of the RHAII/xKS and MaaS Portal distributions; in RHOAI it runs as a side container today and is being promoted to the main backend as Fastify is deprecated.',
    jira: ['RHOAIENG-60028', 'RHOAIENG-83695'],
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
  {
    id: 'engineering-system',
    title: 'Engineering System &amp; Security',
    icon: 'secured',
    summary: 'The system every dashboard team ships through: one monorepo, its CI and test infrastructure, release sign-off, agentic pull-request review and automated vulnerability defence. It keeps a dozen teams merging into one repository fast and safely.',
    points: [
      'Agentic PR review on Fullsend for every pull request, with CodeRabbit behind one review comment; a person always decides',
      'Dependabot with auto-merge and govulncheck on every PR for Go and JavaScript; image health graded for every dashboard image',
      'CI and E2E clusters, release test matrices and sign-off for every early-access drop',
    ],
    jira: ['RHOAIENG-82121', 'RHOAIENG-57870'],
  },
];
