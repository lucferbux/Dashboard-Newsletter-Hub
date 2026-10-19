export default {
  intro: 'The same features as RHOAI, with a Material UI theme for bare Kubernetes. We support module teams contributing upstream and champion PatternFly themed as MUI.',
  stats: [
    { value: 'PatternFly', label: 'MUI Theme Accepted', description: 'PatternFly themed as MUI accepted as valid upstream library' },
    { value: '1,700+', label: 'Contributions', description: 'Red Hat team contributions to Kubeflow' },
    { value: 'Top 3', label: 'Contributors', description: 'In Kubeflow project (past year)' },
  ],
  contributors: [
    { name: 'Eder Ignatowicz', commits: 1239 },
    { name: 'Lucas Fernandez', commits: 434 },
    { name: 'Jenny', commits: 61 },
  ],
  insightsUrl: 'https://insights.linuxfoundation.org/project/kubeflow/contributors',
  projects: [
    {
      name: 'Model Registry',
      icon: 'registry',
      status: 'live',
      description: 'Complete UI for ML model versioning, metadata tracking, and lifecycle management with Go BFF.',
      repo: 'https://github.com/kubeflow/model-registry',
    },
    {
      name: 'Model Catalog',
      icon: 'catalog',
      status: 'live',
      description: 'Curated model discovery with filters, performance benchmarks, and one-click deployment.',
      repo: 'https://github.com/kubeflow/model-registry',
    },
    {
      name: 'MCP Catalog',
      icon: 'mcp-server',
      status: 'coming-soon',
      description: 'MCP server integration for AI models, enabling standardized agent interactions. In development.',
    },
    {
      name: 'Notebooks',
      icon: 'develop-and-train',
      status: 'live',
      description: 'Jupyter workbench management with hardware profiles, connections, and lifecycle tracking.',
      repo: 'https://github.com/kubeflow/kubeflow',
    },
  ],
};
