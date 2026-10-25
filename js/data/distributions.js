// From the Distribution Matrix (Strategic Value section). `status` is inferred from the
// badge: GA → 'live', TP → GA → 'in-progress'. The badge text is kept as the last cell.
export default {
  intro: 'The dashboard is no longer "the RHOAI console on OpenShift" — it\'s a family of packaged products built from one codebase and selected by the operator. The Go <strong>Core BFF</strong> is the shared backend behind all of them: it already runs the RHAII/xKS and MaaS Portal distributions, and in RHOAI it is being promoted from a side container to the main backend as Fastify is deprecated.',
  columns: ['Packaging', 'Packages', 'Backend', 'Platform', 'Auth', 'Maturity'],
  rows: [
    {
      name: 'RHOAI Dashboard',
      icon: 'platform',
      status: 'live',
      cells: ['Single-container (converging)', 'All packages', 'Fastify + Core BFF side container → Core BFF', 'OpenShift', 'OAuth / BYO-OIDC', 'GA'],
      jira: ['RHOAIENG-83693', 'RHOAIENG-83695'],
    },
    {
      name: 'RHAII / xKS',
      icon: 'kubernetes-service',
      status: 'in-progress',
      cells: ['Single-container', 'model-serving + kserve', 'Core BFF', 'Azure AKS', 'Entra ID (OIDC)', 'TP → GA'],
      jira: ['RHAISTRAT-2252', 'RHAISTRAT-1722', 'RHOAIENG-65252'],
    },
    {
      name: 'MaaS Portal',
      icon: 'tenant',
      // Feature complete for 3.6 and already live, ahead of the 3.6 GA release (Lucas, 25 Oct 2026).
      status: 'live',
      cells: ['Frontend-only (BFF reuse)', 'maas + gen-ai', 'Core BFF', 'OpenShift', 'Auth-agnostic', 'Live · 3.6'],
      jira: ['RHAISTRAT-1545', 'RHAISTRAT-2272'],
    },
  ],
};
