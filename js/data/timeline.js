// Extensions: milestone.status ('delivered' | 'planned') where the page marks it
// (Shipped / Completed / Delivered / Planned); phase.open for the phase expanded by default.
export default [
  {
    id: 'foundations',
    period: '2024 Q3 – 2025 Q2',
    title: 'Foundations',
    summary: 'Red Hat enters the Kubeflow community, lands Webpack Module Federation, and ships mod-arch-library and the Turbo monorepo — the groundwork for a modular dashboard.',
    milestones: [
      { date: '2024 Q3', title: 'Kubeflow Contribution Begins', description: 'Red Hat started contributing to Kubeflow, establishing our presence in the open source community.' },
      { date: '2024 Q4', title: 'PatternFly MUI Theme Upstream', description: 'Championed the acceptance of PatternFly themed as MUI as a valid component library upstream in Kubeflow.' },
      { date: '2025 Q1', title: 'Model Registry Shipped to Kubeflow', tag: 'Kubeflow 1.10', description: 'Delivered the complete Model Registry UI to Kubeflow with an MUI theming layer, integrated as a native component in the Kubeflow Central Dashboard.' },
      { date: '2025 Q2', title: 'Module Federation Adoption', description: 'Implemented Webpack Module Federation in ODH Dashboard, establishing the micro-frontend architecture.' },
      { date: '2025 Q2', title: 'mod-arch-library v1.0', description: 'Released the shared library with core utilities, UI components, and theming for ODH, RHOAI, and Kubeflow.' },
      { date: '2025 Q2', title: 'Turbo Monorepo Transformation', description: 'Converted to a Turbo-powered monorepo with shared ESLint, TypeScript, and Jest configurations.' },
    ],
  },
  {
    id: 'modules-in-rhoai',
    period: '2025 Q3 – 2026 Q1',
    title: 'Modular Modules in RHOAI',
    summary: 'Model Registry &amp; Catalog, Gen AI, MaaS, Perses, and MLflow onboard as federated modules — each on its own Go BFF SDK, atop an agentic-ready monorepo.',
    milestones: [
      { date: '2025 Q3', title: 'Model Registry &amp; Model Catalog in RHOAI', tag: 'RHOAI 2.25', description: 'Onboarded Model Registry and Model Catalog as the first modular architecture modules in RHOAI, proving the federated module pattern at scale.' },
      { date: '2025 Q3', title: 'QE Infrastructure', description: 'Deployed the GitHub Actions e2e pipeline, PR cluster infrastructure, nightly AI test analysis, and the Bodies of Water release strategy.' },
      { date: '2025 Q4', title: 'Gen AI Deployment', tag: 'RHOAI 3.0', description: 'First full modular architecture module deployed to production with complete BFF implementation.' },
      { date: '2026 Q1', title: 'MaaS (Models as a Service)', tag: 'RHOAI 3.3', description: 'Delivered the MaaS module with API-based access to AI models through standardized endpoints, with built-in rate limiting and governance. Foundation for the MaaS Consumer Portal distribution.' },
      { date: '2026 Q1', title: 'Perses Integration', tag: 'RHOAI 3.4 EA1', description: 'Observability dashboards integrated via proxy service architecture for real-time ML workload monitoring.' },
      { date: '2026 Q1', title: 'MLflow Integration', tag: 'RHOAI 3.4 EA1', description: 'Integrated MLflow via iframe embedding with a brand new BFF SDK, enabling experiment tracking and ML lifecycle management within RHOAI Dashboard.' },
      { date: '2026 Q1', title: 'Golang BFF SDK', description: 'New SDK for Golang enabling streamlined Backend for Frontend development across all modules.' },
      { date: '2026 Q1', title: 'Agentic-Ready Monorepo', description: 'Built the agentic harness for the dashboard — CLAUDE.md files, rules, structured workflows, and AI-friendly code patterns across 25 packages. Agentic score improved from 53% to 92%.' },
    ],
  },
  {
    id: 'rhoai-3-4',
    period: 'May 2026',
    title: 'RHOAI 3.4 GA + AI Tooling',
    summary: 'Four new federated modules ship to production, and AI-assisted development becomes standard across the team.',
    milestones: [
      { date: 'May 2026', status: 'delivered', title: 'RHOAI 3.4 GA Release', tag: 'RHOAI 3.4 GA', description: 'Shipped four new federated modules to production: AutoML, AutoRAG, Eval-Hub, and MLflow BFF. All fully integrated with the modular architecture and Go BFF backends.' },
      { date: '2026 Q1-Q2', status: 'delivered', title: 'AI Process &amp; Tooling', description: 'Standardized AI-assisted development across the team: AI PR Reviews (Christian Vogt), AI Triage automation, Ambient Code Platform adoption, CLAUDE.md files and structured SDLC workflows across 25 packages.', jira: ['RHOAIENG-50135'] },
    ],
  },
  {
    id: 'operator-pods',
    period: 'Q2 – Aug 2026 · RHOAI 3.5 GA',
    title: 'Operator &amp; Independent Pods',
    summary: 'The Dashboard gains its own standalone operator, every module backend moves to an independent pod, and quality gates land — the biggest architectural shift yet.',
    milestones: [
      { date: '2026 Q2', status: 'delivered', title: 'Main BFF Architecture (Stage 0)', description: 'Collaborating with <strong>partner teams</strong> to establish Stage 0 of the Main BFF — a unified backend-for-frontend layer for the host dashboard. Lays the foundation for migrating host-level API calls from the frontend to a centralized Go BFF.' },
      // TODO verify: dated July 2026, but 3.5 GA is 25 Aug 2026; overlaps with the August milestone below.
      { date: 'July 2026', status: 'delivered', title: 'Dashboard Module Controller &amp; Independent Pod Deployments', tag: 'RHOAI 3.5 GA', description: 'The Dashboard now runs its own standalone Kubernetes operator and every module backend deploys as an independent pod. Full lifecycle ownership, fault isolation, and per-module scaling — the biggest architectural shift since the project started.', jira: ['RHOAIENG-60566', 'RHOAIENG-38191'] },
      { date: '2026 Q2', status: 'delivered', title: 'Quality Gates &amp; Auto Dependencies', description: 'Automated quality checks as build gates for all modular architecture modules (Anthony Coughlin), and automated dependency update pipelines to reduce maintenance burden (Jenny Montrose).', jira: ['RHOAIENG-48869'] },
      { date: 'August 2026', status: 'delivered', title: 'Dashboard Operator &amp; Independent Pods', tag: 'RHOAI 3.5 GA', description: 'Shipped the standalone Kubernetes operator and independent pod deployments for all module backends. Full lifecycle ownership, fault isolation, and per-module scaling. Enables xKS (non-OpenShift Kubernetes) distribution support.' },
    ],
  },
  {
    id: 'platform-team',
    period: 'August 2026 →',
    title: 'Platform Team &amp; Roadmap',
    summary: 'A reorg consolidates platform work under the Dashboard Platform Team; the Core BFF promotion pipeline and Dashboard CR migration chart the path to xKS.',
    milestones: [
      // TODO verify: "Six ownership areas" here vs 7 in the hero and Strategic Value.
      { date: 'August 2026', title: 'Team Reorg — Platform Team Formation', description: 'Organizational reorg consolidates all platform work under a dedicated team — the Dashboard Platform Team. Six ownership areas formalized: Core BFF, Dashboard Operator, Distributions, Modular Architecture, Manifests, and Onboarding.' },
      { date: '2026 Q3-Q4', status: 'planned', title: 'Core BFF Promotion Pipeline', description: 'Three-stage sequential initiative: auth simplification → route audit → Fastify deprecation. Unifies the backend on Go and unlocks clusterless development mode re-add.', jira: ['RHOAIENG-83693', 'RHOAIENG-83694', 'RHOAIENG-83695'] },
      // TODO verify: still "Planned", though operator E2E and the MaaS Portal are marked delivered in 3.6.
      { date: '2026 Q3-Q4', status: 'planned', title: 'Dashboard CR &amp; Operator Hardening', description: 'Migrate from DSCI/DSC/OLM reads to Dashboard CR as source of truth, enabling xKS portability. Comprehensive E2E testing for the operator. xKS distribution hardening and MaaS Consumer Portal delivery.' },
    ],
  },
  {
    id: 'production-hardening',
    period: 'November 2026 · RHOAI 3.6 GA',
    title: 'Production Hardening',
    badge: 'Latest',
    open: true,
    summary: 'MaaS Portal GA, a fully tested operator, model-serving federation, and NetworkPolicy/TLS compliance harden the platform for scale.',
    milestones: [
      // TODO verify: marked "Delivered", but 3.6 GA is 18 Nov 2026.
      { date: 'November 2026', status: 'delivered', title: 'MaaS Portal GA &amp; Production Hardening', tag: 'RHOAI 3.6 GA', description: 'MaaS Portal reached GA as a self-service experience; the Dashboard Operator gained full E2E coverage and an inventory-driven cache redesign; model-serving was federated with zero internal imports; and operand NetworkPolicies, TLS-Scanner CI, and Core BFF xKS readiness closed the security and portability gaps.', jira: ['RHAISTRAT-1545', 'RHOAIENG-83682'] },
    ],
  },
];
