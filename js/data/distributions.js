// From the Distribution Matrix (Strategic Value section). `status` is inferred from the
// badge: GA → 'live', TP → GA → 'in-progress'. The badge text is kept as the last cell.
export default {
  intro: 'The dashboard is no longer "the RHOAI console on OpenShift" — it\'s a family of packaged products built from one codebase and selected by the operator.',
  columns: ['Packaging', 'Packages', 'Platform', 'Auth', 'Maturity'],
  rows: [
    {
      name: 'RHOAI Dashboard',
      icon: 'platform',
      status: 'live',
      cells: ['Single-container (converging)', 'All packages', 'OpenShift', 'OAuth / BYO-OIDC', 'GA'],
    },
    {
      name: 'Core BFF',
      icon: 'server-stack',
      status: 'live',
      cells: ['Single-container', 'Host platform APIs', 'OpenShift', 'OAuth / BYO-OIDC', 'GA · 3.5'],
    },
    {
      name: 'RHAII / xKS',
      icon: 'kubernetes-service',
      status: 'in-progress',
      cells: ['Single-container', 'model-serving + kserve', 'Azure AKS', 'Entra ID (OIDC)', 'TP → GA'],
      jira: ['RHAISTRAT-2252', 'RHAISTRAT-1722', 'RHOAIENG-65252'],
    },
    {
      name: 'MaaS Portal',
      icon: 'tenant',
      // TODO verify: the matrix says TP → GA, while the 3.6 release marks the MaaS Portal GA-ready / delivered.
      status: 'in-progress',
      cells: ['Frontend-only (BFF reuse)', 'maas + gen-ai', 'OpenShift', 'Auth-agnostic', 'TP → GA'],
      jira: ['RHAISTRAT-1545', 'RHAISTRAT-2272'],
    },
  ],
};
