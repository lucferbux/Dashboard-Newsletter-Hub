export default {
  cards: [
    { value: 10, suffix: '+', label: 'Teams Enabled', description: 'Feature teams developing independently', icon: 'users', tone: 'blue' },
    // TODO verify: the hero said 14+ federated modules; this section says 15+.
    { value: 15, suffix: '+', label: 'Federated Modules', description: 'Modular architecture modules and external integrations', icon: 'module', tone: 'purple' },
    { value: 10, label: 'Modules Shipped', description: 'Deployed as independent pods in production', icon: 'container', tone: 'green' },
    { value: 100, suffix: '%', label: 'Module Coverage', description: 'All modules have AI Harness, Quality Gates and deployment in place', icon: 'check-circle', tone: 'teal' },
  ],
  pills: [
    { value: 'Turbo', label: 'Monorepo' },
    { value: 'xKS', label: 'Distribution' },
    { value: '25', label: 'Packages' },
    { value: 'Operator', label: 'Managed' },
  ],
};
