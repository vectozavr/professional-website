---
title: "Super-Tuning: From Activation-Aware Pruning to Sparse Fine-Tuning"
authors:
  - Ivan Ilin
  - Philip Zmushko
  - Peter Richtárik
year: 2026
venue: arXiv
publicationType: Preprint
status: Preprint
summary: Repurposes activation-aware pruning scores to choose a small, fixed set of LLM weights for fine-tuning. A hybrid version adds LoRA without increasing the trainable-parameter budget, offering a memory-efficient adaptation strategy that performed strongly on arithmetic tasks.
featured: false
paperUrl: https://arxiv.org/abs/2607.09287
arxivUrl: https://arxiv.org/abs/2607.09287
codeUrl: https://github.com/vectozavr/SuperTuning
projectUrl: /projects/sparse-fine-tuning/
bibtex: |-
  @article{ilin2026supertuning,
    title={Super-Tuning: From Activation-Aware Pruning to Sparse Fine-Tuning},
    author={Ilin, Ivan and Zmushko, Philip and Richt{\'a}rik, Peter},
    journal={arXiv preprint arXiv:2607.09287},
    year={2026}
  }
tags:
  - Sparse fine-tuning
  - LLM pruning
  - Efficient adaptation
---

This preprint studies a path from activation-aware pruning to sparse fine-tuning, with an accompanying open-source implementation.
