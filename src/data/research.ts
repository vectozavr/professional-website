export const researchAreas = [
  {
    title: 'LLM Pruning',
    description:
      'Methods for removing redundant model parameters while preserving model quality.',
    number: '01',
    href: '/research/#pruning',
  },
  {
    title: 'Sparse Fine-Tuning',
    description:
      'Training a small, carefully selected subset of model parameters efficiently.',
    number: '02',
    href: '/research/#sparse-fine-tuning',
  },
  {
    title: 'Quantization',
    description:
      'Reducing model precision and memory requirements while controlling quality degradation.',
    number: '03',
    href: '/research/#quantization',
  },
  {
    title: 'Pipeline Parallelism',
    description:
      'Optimization and convergence analysis for training models across pipeline stages with delayed updates.',
    number: '04',
    href: '/research/#pipeline-parallelism',
  },
] as const;
