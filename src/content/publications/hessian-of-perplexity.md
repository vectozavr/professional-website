---
title: "Hessian of Perplexity for Large Language Models by PyTorch autograd (Open Source)"
authors:
  - Ivan Ilin
year: 2025
venue: arXiv
publicationType: Technical report
status: Preprint
summary: Shows how to use PyTorch's automatic differentiation to compute selected pieces of an LLM's Hessian—the matrix describing local curvature—and estimate its full diagonal. The open-source implementation makes second-order analysis practical without storing the impossibly large full matrix.
featured: false
paperUrl: https://arxiv.org/abs/2504.04520
arxivUrl: https://arxiv.org/abs/2504.04520
codeUrl: https://github.com/vectozavr/llm-hessian
bibtex: |-
  @article{ilin2025hessian,
    title={Hessian of Perplexity for Large Language Models by PyTorch autograd (Open Source)},
    author={Ilin, Ivan},
    journal={arXiv preprint arXiv:2504.04520},
    year={2025},
    doi={10.48550/arXiv.2504.04520},
    url={https://arxiv.org/abs/2504.04520}
  }
tags:
  - LLM Hessian
  - PyTorch autograd
  - Second-order methods
---

This technical report explains how to compute selected portions of an LLM Hessian and estimate its full diagonal with vector-Hessian products in PyTorch.
