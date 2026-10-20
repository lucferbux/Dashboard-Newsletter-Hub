// Extensions to the schema (all optional):
//   release.title          heading as shown on the page
//   ticks[].title / .description   what landed at each drop
//   highlights[].tags      the badge chips under each card ('33 issues closed', 'Multi-team')
//   release.stats          [{ value, label, description }] headline strip (3.6 "What 3.6 Delivered")
//   release.unlocks        { intro, items: [{ title, icon, description }] } — "What This Unlocks"
//   release.improvements   { intro, items: [{ label, before, after }] } — "Operational Improvements"
//   release.partners       { intro, items: [{ name, role, description }] } — "Multi-Team Enablement"
export default [
  {
    version: '3.5',
    status: 'delivered',
    ga: '2026-08-25',
    title: 'RHOAI 3.5 · Independent pods',
    theme: 'From modular modules to deployment independence',
    summary: 'Coordinated initiatives transforming how the Dashboard deploys, scales, and evolves.',
    ticks: [
      { name: 'EA1', date: '2026-06-16', status: 'delivered', title: 'Conditional Module Enablement', description: 'Modules can be individually enabled/disabled at runtime based on feature flags and DSC components.' },
      { name: 'EA2', date: '2026-07-14', status: 'delivered', title: 'Operator Integration + CRD', description: 'Dashboard Module Operator managing current topology with full CRD design, Go controller, and handler registration.' },
      // TODO verify: "All 7 BFF modules" here vs "10 modules deployed" on the Independent Pod Deployments card.
      { name: 'GA', date: '2026-08-25', status: 'delivered', title: 'Independent Pods + Migration', description: 'All 7 BFF modules in their own deployments with independent lifecycle. Zero-downtime migration from operator-managed to module-managed.' },
    ],
    highlights: [
      {
        title: 'Dashboard Module Controller',
        area: 'operator',
        status: 'delivered',
        icon: 'operator',
        description: 'The Dashboard now runs its own <strong>standalone Kubernetes operator</strong> with a Custom Resource Definition. Manifest changes deploy same-day through Dashboard CI/CD instead of waiting 1-2 weeks for operator release cycles. The operator self-heals — configuration drift is auto-corrected. Shipped in RHOAI 3.5 GA.',
        tags: ['33 issues closed'],
        jira: ['RHOAIENG-60566'],
      },
      {
        title: 'Independent Pod Deployments',
        area: 'modular-architecture',
        status: 'delivered',
        icon: 'container',
        description: 'Each module backend now runs in its <strong>own independent deployment</strong> with dedicated scaling, permissions, and failure isolation. A crash in one module no longer takes down the entire Dashboard. Each module scales on its own load and gets least-privilege security permissions. Shipped in RHOAI 3.5 GA.',
        tags: ['10 modules deployed'],
        jira: ['RHOAIENG-38191'],
      },
      {
        title: 'Go BFF Foundation (Phase 0)',
        area: 'core-bff',
        status: 'in-progress',
        icon: 'server-stack',
        description: 'A common Go backend-for-frontend co-built with <strong>Crimson and partner teams</strong>. Shared authentication, Kubernetes client infrastructure, and security middleware. Begins the migration from Fastify (Node.js) to unified Go — 57 stories across 8 phases.',
        tags: ['8 issues', 'Multi-team'],
        jira: ['RHOAIENG-60028'],
      },
      {
        title: 'AI-Automated Module &amp; Konflux Onboarding',
        area: 'onboarding',
        status: 'delivered',
        icon: 'rocket',
        description: 'Claude Code skills that compress module onboarding from <strong>5 working days to ~4 hours</strong>. <strong>/module-onboarding</strong> scaffolds a new federated module end-to-end (frontend, BFF, port allocation, host registration, build verification). <strong>/konflux-onboarding</strong> handles the full CI/CD pipeline setup: Jira epic cloning, Dockerfiles, Tekton pipelines, manifest overlays, and OpenShift CI across upstream and downstream. Any engineer on any team can onboard a module and its build pipeline by running two commands.',
        tags: ['6 skills', '6 modules onboarded'],
        jira: ['RHOAIENG-37060'],
      },
      {
        title: 'AI-Embedded PR Review Lifecycle',
        area: 'frontend-platform',
        status: 'in-progress',
        icon: 'robot',
        description: 'AI agents embedded into the PR review workflow as active participants. Building on the agentic development harness from 3.4, the <strong>/preflight skill</strong> runs conformance checks, convention enforcement, and architectural validation before human reviewers engage. Reduces PR cycle time so reviewers focus on design and business logic.',
        tags: ['Follow-up: Agentic Harness', 'w/ Crimson'],
        jira: ['RHOAIENG-57547'],
      },
    ],
    unlocks: {
      intro: 'These initiatives are stages of a single platform evolution. Combined, they enable capabilities the organization has been waiting on.',
      items: [
        // TODO verify: the page says "xKC" here; elsewhere it is "xKS".
        { title: 'New Environments', icon: 'hybrid-cloud', description: 'Platform providers for environments outside RHOAI/ODH — starting with xKS (non-OpenShift Kubernetes). The dashboard is no longer locked to a single platform.' },
        { title: 'Clusterless Development', icon: 'code', description: 'Real local development with just the app shell, main BFF, and the modules you need — no cluster required. Dramatically faster development cycles.' },
        { title: 'Component Onboarding', icon: 'users', description: 'External teams can onboard new modules without waiting on the Platform team. The operator and CRD handle deployment, scaling, and lifecycle automatically.' },
        { title: 'Module Tech Previews', icon: 'secured', description: 'Ship modules in preview mode, enable/disable them per environment via CRD configuration. New modules can be tested in production without risk to the core dashboard.' },
      ],
    },
    improvements: {
      intro: 'Measurable before-and-after improvements across key operational metrics',
      items: [
        { label: 'Deploy Time', before: '1-2 weeks', after: 'Same day' },
        { label: 'Failure Blast Radius', before: 'Full outage', after: '1 module' },
        { label: 'Recovery (MTTR)', before: '~2 min (all)', after: '~30s' },
        { label: 'Module Onboarding', before: '5 working days', after: '~4 hours' },
      ],
    },
    partners: {
      // TODO verify: "5+ teams" here vs "10+ teams enabled" elsewhere (different scope?).
      intro: '5 engineers accelerating 5+ teams',
      items: [
        { name: 'Platform', role: 'Owner', description: 'Core BFF, Operator, Distributions' },
        { name: 'Crimson', role: 'Co-builder', description: 'Shared auth &amp; K8s client' },
        { name: 'Connections', role: 'Consumer', description: 'S3/URI/OCI testing' },
        { name: 'Purple-scrum', role: 'Consumer', description: 'FileExplorer/S3 browser' },
        { name: 'Operator Team', role: 'Provider', description: 'Operator framework' },
      ],
    },
  },
  {
    version: '3.6',
    // Code freeze reached; stays in-progress until GA ships on 18 Nov. Highlights = work landed for 3.6.
    status: 'in-progress',
    ga: '2026-11-18',
    title: 'RHOAI 3.6 · Production hardening',
    theme: 'Hardening the modular architecture for production at scale',
    summary: 'From a Tech Preview portal to GA-ready self-service, a fully tested operator, and a federated platform. <strong>Code freeze reached</strong> — the release is stabilizing for GA on 18 Nov, while 3.7 planning starts.',
    progress: { done: 2, total: 3, label: 'Code freeze · EA1 and EA2 shipped, GA on 18 Nov' },
    ticks: [
      { name: 'EA1', date: '2026-09-23', status: 'delivered', title: 'MaaS Portal Foundations', description: 'Consumer portal onboarded as an independently managed DSC submodule with operand manifests, App Picker entry, and the portal Core-BFF image.' },
      { name: 'EA2', date: '2026-10-14', status: 'delivered', title: 'Portal Self-Service + Operator E2E', description: 'Path-based routing, logout/sign-in return flow, governance views, and navigation polish land for the portal; the Dashboard Operator gains its envtest, conformance, and real-cluster E2E suites.' },
      { name: 'GA', date: '2026-11-18', status: 'planned', title: 'Production Hardening', description: 'MaaS Portal GA with observability, operator cache redesign (OOM fix), operand NetworkPolicies, TLS-Scanner CI, model-serving federation, and Core BFF xKS readiness.' },
    ],
    highlights: [
      {
        title: 'Community plugins, a first step',
        area: 'modular-architecture',
        status: 'delivered',
        icon: 'puzzle-piece',
        description: 'A first step towards letting partners and the community add pages to the dashboard: a minimal registration contract, an early foundation rather than a supported plugin ecosystem. A plugin is registered in one ConfigMap entry; the Dashboard Operator validates each entry on its own, merges it into <code>federation-config</code> next to the built-in modules and serves it under <code>/community-plugins/&lt;name&gt;/</code>. A bad entry is skipped without affecting anything else.',
        tags: ['Early foundation'],
        jira: ['RHAISTRAT-2430'],
      },
      {
        title: 'Ready for OpenShift 5',
        area: 'platform',
        status: 'delivered',
        icon: 'secured',
        description: 'OpenShift 5 changes four defaults and each was a release gate for 3.6. The dashboard now ships <strong>least-privilege network policies for every operand</strong> (default-deny), follows the <strong>cluster TLS profile</strong> in the operator and all ten BFFs with a TLS scanner in CI, keeps sign-in working under <strong>external OIDC</strong>, and detects operators through both OLM v0 and <strong>OLM v1</strong>.',
        tags: ['4 OCP 5 gates cleared'],
        jira: ['RHOAIENG-93714', 'RHOAIENG-75339', 'RHOAIENG-95173', 'RHOAIENG-93083'],
      },
      {
        title: 'MaaS Portal — GA-Ready',
        area: 'distributions',
        status: 'delivered',
        icon: 'tenant',
        description: 'The <strong>Models as a Service</strong> consumer portal graduated from Tech Preview to a GA-ready, self-service experience: path-based routing on a shared Gateway, full operand manifests, an independently managed DSC submodule, an observability dashboard, governance for administrators, and production branding. Renamed from "MaaS Consumer Portal" to <strong>MaaS Portal</strong>.',
        tags: ['14+ stories delivered'],
        jira: ['RHAISTRAT-1545'],
      },
      {
        title: 'Dashboard Operator E2E Testing',
        area: 'operator',
        status: 'delivered',
        icon: 'check-circle',
        description: 'Test coverage for the standalone operator across three layers: an <strong>envtest</strong> integration foundation, platform-contract conformance tests, and <strong>real-cluster E2E</strong> running in CI/CD. The operator now ships with a signed-off quality gate — no more untested reconciliation paths.',
        tags: ['4 epics'],
        jira: ['RHOAIENG-83682'],
      },
      {
        title: 'Operator Cache Redesign (OOM Fix)',
        area: 'operator',
        status: 'delivered',
        icon: 'speedometer',
        description: 'Re-architected the operator\'s caching to be <strong>inventory-driven</strong>, resolving the out-of-memory failures that appeared at scale. The operator now stays within predictable memory bounds as the number of managed modules grows.',
        tags: ['Scaling remediation'],
        jira: ['RHOAIENG-98536'],
      },
      {
        title: 'model-serving Module Federation',
        area: 'modular-architecture',
        status: 'delivered',
        icon: 'module',
        description: 'Federated <strong>model-serving</strong> as a Module Federation remote with <strong>zero <code>@odh-dashboard/internal</code> imports</strong> — shared types and components extracted to independent packages. The template for federating every remaining plugin.',
        tags: ['Zero internal imports'],
        jira: ['RHOAIENG-79873'],
      },
      {
        title: 'Operand NetworkPolicies &amp; TLS Compliance',
        area: 'manifests',
        status: 'delivered',
        icon: 'security',
        description: 'Shipped <strong>least-privilege NetworkPolicies</strong> for all AI Core Dashboard operands (OCP 5.0 readiness) and added a <strong>TLS-Scanner CI step</strong> to the upstream E2E pipelines — closing the security and compliance gaps ahead of GA.',
        tags: ['OCP 5.0 + TLS'],
        jira: ['RHOAIENG-93714', 'RHOAIENG-95815'],
      },
      {
        title: 'Core BFF xKS Readiness',
        area: 'core-bff',
        status: 'delivered',
        icon: 'server-stack',
        description: 'Hardened the Go Core BFF for <strong>RHAII on non-OpenShift Kubernetes (xKS)</strong> — portal BFF modules, container image, and access-token forwarding for federated authorize entries. The backbone for running the dashboard outside OpenShift.',
        tags: ['xKS production readiness'],
        jira: ['RHOAIENG-79874'],
      },
    ],
    stats: {
      // TODO verify: "Three EA drops into GA", but only EA1 and EA2 are listed before GA.
      intro: 'Three EA drops into GA — the modular platform moving from "it works" to "it\'s production-hardened"',
      items: [
        { value: 'GA', label: 'MaaS Portal', description: 'Tech Preview → self-service GA' },
        { value: 'E2E', label: 'Operator Tested', description: 'envtest + conformance + real-cluster CI' },
        { value: '0', label: 'Internal Imports', description: 'model-serving fully federated' },
        { value: 'xKS', label: 'Core BFF Ready', description: 'RHAII on non-OpenShift K8s' },
      ],
    },
    unlocks: {
      intro: '3.6 turns the modular platform from "it works" into "it\'s production-hardened" — opening up new consumers, environments, and guarantees.',
      items: [
        { title: 'Self-Service MaaS', icon: 'key', description: 'Consumers with no OpenShift account can discover their granted model endpoints and manage their own API keys through a dedicated portal.' },
        { title: 'Signed-Off Operator', icon: 'check-circle', description: 'The Dashboard Operator ships with an envtest foundation, platform-contract conformance, and real-cluster E2E in CI — no more untested reconciliation paths.' },
        { title: 'Federation Template', icon: 'template', description: 'model-serving federated with <strong>zero</strong> <code>@odh-dashboard/internal</code> imports — the proven pattern for federating every remaining plugin.' },
        { title: 'Production Compliance', icon: 'secured', description: 'Least-privilege NetworkPolicies for every operand and a TLS-Scanner CI step close the OCP 5.0 security and portability gaps ahead of GA.' },
      ],
    },
    improvements: {
      intro: 'Measurable before-and-after improvements from the 3.6 hardening work',
      items: [
        { label: 'Operator Testing', before: 'Untested paths', after: 'E2E in CI' },
        { label: 'Operator Memory', before: 'OOM at scale', after: 'Bounded' },
        { label: 'model-serving Imports', before: 'internal imports', after: '0' },
        { label: 'Operand Security', before: 'No NetworkPolicies', after: 'Least-privilege' },
      ],
    },
    partners: {
      intro: 'A platform release delivered with partners across the stack',
      items: [
        { name: 'Platform', role: 'Owner', description: 'MaaS Portal, Operator, Distributions' },
        { name: 'MaaS Backend', role: 'Provider', description: 'Kuadrant gateway (Authorino / Limitador)' },
        { name: 'model-serving', role: 'Consumer', description: 'Federated as a Module Federation remote' },
        { name: 'QE / E2E', role: 'Partner', description: 'Real-cluster operator CI pipeline' },
        { name: 'Security / OCP', role: 'Consumer', description: 'NetworkPolicies + TLS compliance' },
      ],
    },
  },
];
