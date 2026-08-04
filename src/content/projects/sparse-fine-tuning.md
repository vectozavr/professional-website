---
title: Super-Tuning for LLMs
shortSummary: We introduce Super, which selects a sparse trainable support using activation-aware pruning scores, and Supra, a matched-budget sparse-plus-LoRA adapter.
year: 2026
status: Research project
category: Research / Efficient Adaptation
topics:
  - Sparse fine-tuning
  - Efficient adaptation
  - LLM pruning
featured: true
githubUrl: https://github.com/vectozavr/SuperTuning
paperUrl: https://arxiv.org/abs/2607.09287
image: ../../assets/projects/sparse-fine-tuning.webp
imageAlt: Comparison of a sparse adapter with a low-rank adapter for fine-tuning
imageFit: contain
metricsRepository: vectozavr/SuperTuning
relatedPublications:
  - super-tuning
---

**Super** repurposes Wanda-style activation-weighted magnitude scores from pruning to choose a small, fixed set of trainable weights for parameter-efficient fine-tuning. **Supra** combines this sparse update with LoRA while preserving a matched trainable-parameter budget.

In the paper’s single-seed Math17K experiments on Llama-3.2-1B and Meta-Llama-3-8B, the strongest Super and Supra variants achieved the highest average accuracy among the tested schedule-selected adapter configurations. The results suggest that pruning-inspired orderings can provide useful fixed sparse supports for adaptation, especially when combined with low-rank adapters.
