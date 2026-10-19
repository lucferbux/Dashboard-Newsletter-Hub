export default {
  team: 'Dashboard Platform Team',
  short: 'Pewter',
  description: 'Dashboard Platform Team - Building the Foundation for Red Hat OpenShift AI',
  hero: {
    eyebrow: 'Dashboard Enabling Team',
    title: 'Building the Foundation for RHOAI',
    highlight: 'Foundation',
    subtitle: 'The platform team powering RHOAI Dashboard — owning Modular Architecture, the Dashboard Operator, Distributions, Core BFF, Manifests, Frontend &amp; Platform Support, and Onboarding. Enabling 10+ teams to ship independently.',
    ctas: [
      { label: 'See Our Impact', href: '#metrics', variant: 'primary' },
      { label: 'View on GitHub', href: 'https://github.com/opendatahub-io/odh-dashboard', variant: 'secondary', icon: 'github' },
    ],
  },
  stats: [
    { value: '7', label: 'Ownership Areas' },
    { value: '10+', label: 'Teams Enabled' },
    // TODO verify: the hero said 14+ federated modules; the metrics section says 15+.
    { value: '15+', label: 'Federated Modules' },
    { value: '5', label: 'Engineers' },
  ],
  // Section headings and subtitles as they appear on the page.
  sections: {
    about: { title: 'What is Dashboard Platform?', subtitle: 'The Platform Engineering team within Red Hat OpenShift AI Dashboard' },
    metrics: { title: 'Our Impact', subtitle: 'Enabling teams to deliver faster' },
    modules: { title: 'Enabling RHOAI Features', subtitle: 'Full modular architecture modules powering core RHOAI capabilities' },
    integrations: { title: 'External Integrations', subtitle: 'Our modular architecture enables seamless third-party integration via proxy patterns' },
    kubeflow: { title: 'Kubeflow — Same Platform, Open Source', subtitle: 'The same features as RHOAI, with a Material UI theme for bare Kubernetes. We support module teams contributing upstream and champion PatternFly themed as MUI.' },
    architecture: { title: 'Architecture Overview', subtitle: 'One platform, three surfaces — RHOAI/ODH, the MaaS Portal, and xKS' },
    timeline: { title: 'Our Journey', subtitle: 'Key milestones in building the modular platform — grouped by era, tap a phase to expand' },
    initiatives: { title: 'Current Initiatives', subtitle: 'What we\'re working on now' },
    value: { title: 'Strategic Value', subtitle: 'Why our platform matters — going deeper on OpenShift, and reaching beyond it' },
  },
  links: {
    github: 'https://github.com/opendatahub-io/odh-dashboard',
    slack: '#wg-dashboard-platform',
    modArchLibrary: 'https://github.com/opendatahub-io/mod-arch-library',
    modelRegistry: 'https://github.com/kubeflow/model-registry',
    ambientCode: 'https://github.com/ambient-code',
  },
  footer: [
    { label: 'GitHub', href: 'https://github.com/opendatahub-io/odh-dashboard' },
    { label: 'mod-arch-library', href: 'https://github.com/opendatahub-io/mod-arch-library' },
    { label: 'Model Registry', href: 'https://github.com/kubeflow/model-registry' },
    { label: 'Ambient Code', href: 'https://github.com/ambient-code' },
    { label: 'AI-Readiness', href: 'https://redhat.atlassian.net/browse/RHOAIENG-51627' },
  ],
  footerNote: 'Red Hat OpenShift AI',
};
