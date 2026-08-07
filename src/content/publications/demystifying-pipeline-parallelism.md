---
title: "Demystifying Pipeline Parallelism: First Theory for PipeDream"
authors:
  - Ivan Ilin
  - Peter Richtárik
year: 2026
venue: arXiv
publicationType: Preprint
status: Preprint
summary: Analyzes PipeDream, a way to train models by splitting their layers across multiple devices. It proves when this pipeline approach converges and shows how outdated updates worsen as more stages are added, clarifying when pipeline parallelism will scale well.
featured: true
paperUrl: https://arxiv.org/abs/2606.03498
arxivUrl: https://arxiv.org/abs/2606.03498
codeUrl: https://github.com/vectozavr/randomized-pipedream
projectUrl: /projects/pipeline-parallelism-theory/
bibtex: |-
  @article{randomizedpipedream2026,
    title={Demystifying Pipeline Parallelism: First Theory for PipeDream},
    author={Ilin, Ivan and Richt{\'a}rik, Peter},
    journal={arXiv preprint arXiv:2606.03498},
    year={2026}
  }
tags:
  - Pipeline parallelism
  - Distributed optimization
  - Delayed updates
---

This preprint develops a theoretical framework for randomized PipeDream-style pipeline parallelism, focusing on convergence in the presence of pipeline delays.
