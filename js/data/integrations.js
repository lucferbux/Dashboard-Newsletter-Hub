export default [
  {
    name: 'Perses',
    icon: 'monitoring',
    pattern: 'Proxy service, no BFF',
    release: '3.4 EA1',
    description: 'The observability package proxies to the <code>data-science-perses</code> Kubernetes service, rendering Perses dashboards natively within RHOAI for real-time metrics on model serving, GPU utilization, and inference latency.',
  },
  {
    name: 'MLflow',
    icon: 'lab',
    pattern: 'Dedicated BFF + iframe embedding',
    release: '3.4 EA1',
    description: 'The MLflow BFF uses the mlflow-go SDK for programmatic access, enabling experiment tracking, prompt registry, and workspace isolation. Other BFFs (Eval-Hub, AutoML, AutoRAG) interact with MLflow through this service.',
    links: [{ label: 'mlflow-go SDK', href: 'https://github.com/opendatahub-io/mlflow-go' }],
  },
];
