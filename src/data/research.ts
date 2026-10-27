export const researchAreas = [
  {
    title: 'Model Compression',
    description:
      'Pruning and quantization methods that make large models smaller while preserving their quality.',
    href: '/research/#model-compression',
  },
  {
    title: 'AI Agent Collaboration',
    description:
      'Convergence theory for teams of AI agents that each improve their own part of a shared solution.',
    href: '/research/#agent-collaboration',
  },
  {
    title: 'Pipeline Parallelism',
    description:
      'Optimization and convergence analysis for training models across pipeline stages with delayed updates.',
    href: '/research/#pipeline-parallelism',
  },
  {
    title: 'Sparse Fine-Tuning',
    description:
      'Training a small, carefully selected subset of model parameters efficiently.',
    href: '/research/#sparse-fine-tuning',
  },
] as const;
