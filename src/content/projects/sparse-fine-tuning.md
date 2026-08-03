---
title: Sparse Fine-Tuning
shortSummary: Methods for adapting language models by updating only a small, carefully selected subset of parameters.
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

Sparse fine-tuning adapts a language model by training only a small, carefully selected subset of parameters while leaving the rest fixed. The aim is to reduce the memory and computation required for adaptation without treating every model weight as equally important.

This project connects activation-aware parameter selection with sparse optimization. The public Super-Tuning codebase and accompanying preprint contain the verified implementation and research details; no private experimental results are presented here.
