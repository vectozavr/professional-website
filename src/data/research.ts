export const researchAreas = [
  {
    title: 'LLM Pruning',
    description:
      'Methods for removing redundant model parameters while preserving model quality.',
    href: '/research/#pruning',
  },
  {
    title: 'Sparse Fine-Tuning',
    description:
      'Training a small, carefully selected subset of model parameters efficiently.',
    href: '/research/#sparse-fine-tuning',
  },
  {
    title: 'Quantization',
    description:
      'Reducing model precision and memory requirements while controlling quality degradation.',
    href: '/research/#quantization',
  },
  {
    title: 'Pipeline Parallelism',
    description:
      'Optimization and convergence analysis for training models across pipeline stages with delayed updates.',
    href: '/research/#pipeline-parallelism',
  },
] as const;
