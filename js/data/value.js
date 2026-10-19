export default [
  {
    title: 'For Feature Teams',
    icon: 'users',
    description: 'Build and ship a module without waiting on anyone else.',
    points: [
      'Ship independently without blocking other teams',
      'Own your module end-to-end — a federated remote plus its own Go BFF',
      'Shared foundations via mod-arch-library (core, shared, kubeflow)',
      'Quality confidence with automated gates and conformance tests',
      'Two deployment modes — sidecar for dev, standalone for production',
      'Operator-managed lifecycle with per-module health and fault isolation',
      'Automated onboarding — new modules in ~4 hours via Claude Code skills',
    ],
  },
  {
    title: 'For the Organization',
    icon: 'enterprise',
    description: 'One platform layer, many products, faster delivery.',
    points: [
      'Faster delivery with parallel development across 10+ teams',
      'One codebase, many products — no forks across OpenShift and xKS',
      'Seven ownership areas covering the full platform layer',
      'Community contribution via an upstream-first approach to Kubeflow',
      'Dashboard Operator enabling independent release cycles',
      'A signed-off operator E2E quality gate (3.6)',
      'OCP 5.0 NetworkPolicies and TLS compliance built in',
    ],
  },
  {
    title: 'For Customers',
    icon: 'user-check',
    description: 'The same reliable, secure experience wherever RHOAI runs.',
    points: [
      'Same platform experience across OpenShift and any Kubernetes (xKS)',
      'Self-service Models-as-a-Service via the MaaS Portal',
      'Reliability with per-module fault isolation',
      'Built-in observability via Perses dashboards',
      'Secure by default — least-privilege NetworkPolicies and TLS',
      'Operator-managed upgrades with zero downtime',
      'Advanced ML capabilities via AutoML, AutoRAG, Eval-Hub',
    ],
  },
];
