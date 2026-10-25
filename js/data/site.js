export default {
  team: 'Dashboard Platform Team',
  short: 'Pewter',
  description: 'Dashboard Platform Team - Building the Foundation for Red Hat OpenShift AI',
  hero: {
    eyebrow: 'Dashboard Platform · Red Hat OpenShift AI',
    title: 'The platform behind the RHOAI dashboard.',
    highlight: 'platform',
    subtitle: 'We own the architecture, runtime and tooling the RHOAI dashboard is built on: the modular architecture, the Dashboard Operator, the Core BFF, distributions, manifests and onboarding. More than ten teams ship their features on it.',
    ctas: [
      { label: 'What we shipped in 3.6', href: '#releases', variant: 'primary' },
      { label: 'View on GitHub', href: 'https://github.com/opendatahub-io/odh-dashboard', variant: 'secondary', icon: 'github' },
    ],
  },
  // The hero's isometric stack, bottom → top. `ours` marks our layer (drawn in blue).
  stack: [
    { id: 'openshift', name: 'OpenShift', text: 'The substrate. Operators install through OLM, traffic flows through the Gateway API, and OAuth or OIDC plus RBAC decide who can do what.' },
    { id: 'platform', name: 'RHOAI platform', text: 'The RHOAI operator reconciles every component from the DataScienceCluster, and one platform gateway authenticates every request.' },
    { id: 'components', name: 'Components', text: 'Serving, Models-as-a-Service, model registry, pipelines, workbenches, evaluation and training, each owned by its feature team.' },
    { id: 'dashboard', name: 'Dashboard platform', ours: true, text: 'Our layer. The modular host that loads every team\'s module at runtime, the Go BFFs behind them and the operator that deploys them, so more than ten teams ship into one console.' },
    { id: 'distributions', name: 'Distributions', text: 'The same code, packaged three ways: the full RHOAI dashboard, the MaaS Portal and RHAII on any Kubernetes.' },
  ],
  stats: [
    { value: '8', label: 'Areas we own' },
    { value: '10+', label: 'Teams building on it' },
    { value: '14', label: 'Feature modules' },
    { value: '100%', label: 'PRs reviewed by an agent' },
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
