---
title: "QK-Wanda: Coupling Queries and Keys for Unstructured Pruning"
authors:
  - Ivan Ilin
  - Peter Richtárik
publishDate: 2026-10-01
year: 2026
venue: arXiv
publicationType: Preprint
status: Preprint
summary: Couples query and key pruning through the reconstruction of their dot products. Closed-form deletion scores extend Wanda with opposite-projection activation energies and a shared QK budget, reducing reconstruction error without gradients or updates to retained weights.
featured: true
paperUrl: https://arxiv.org/abs/2610.01554
arxivUrl: https://arxiv.org/abs/2610.01554
codeUrl: https://github.com/vectozavr/qk-wanda
projectUrl: /projects/qk-wanda/
bibtex: |-
  @misc{ilin2026qkwanda,
    title={{QK-Wanda}: Coupling Queries and Keys for Unstructured Pruning},
    author={Ilin, Ivan and Richt{\'a}rik, Peter},
    year={2026},
    eprint={2610.01554},
    archivePrefix={arXiv},
    primaryClass={cs.LG},
    doi={10.48550/arXiv.2610.01554},
    url={https://arxiv.org/abs/2610.01554}
  }
tags:
  - LLM pruning
  - Attention
  - Model compression
---

This arXiv preprint studies query–key interactions as a pruning criterion, with an accompanying open-source implementation.
