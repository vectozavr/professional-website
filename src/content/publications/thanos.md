---
title: "Thanos: A Block-wise Pruning Algorithm for Efficient Large Language Model Compression"
authors:
  - Ivan Ilin
  - Peter Richtárik
year: 2025
venue: arXiv
publicationType: Preprint
status: Preprint
summary: Prunes LLM weights in blocks, using second-order information about how weights interact to compensate for removals and adaptive masks to revise earlier choices. It supports flexible and hardware-friendly sparsity patterns, reducing model size while preserving accuracy.
featured: true
paperUrl: https://arxiv.org/abs/2504.05346
arxivUrl: https://arxiv.org/abs/2504.05346
codeUrl: https://github.com/vectozavr/thanos
projectUrl: /projects/thanos/
bibtex: |-
  @article{ilin2025thanos,
    title={Thanos: A Block-wise Pruning Algorithm for Efficient Large Language Model Compression},
    author={Ilin, Ivan and Richt{\'a}rik, Peter},
    journal={arXiv preprint arXiv:2504.05346},
    year={2025}
  }
tags:
  - LLM pruning
  - Second-order optimization
  - Structured sparsity
---

This preprint presents a block-wise pruning method that uses second-order information to coordinate compensation when multiple weights are removed.
