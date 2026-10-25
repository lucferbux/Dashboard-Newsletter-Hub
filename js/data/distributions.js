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
      // TODO verify: the matrix says TP → GA, while the 3.6 release marks the MaaS Portal GA-ready / delivered.
      status: 'in-progress',
      cells: ['Frontend-only (BFF reuse)', 'maas + gen-ai', 'Core BFF', 'OpenShift', 'Auth-agnostic', 'TP → GA'],
      jira: ['RHAISTRAT-1545', 'RHAISTRAT-2272'],
    },
  ],
};
