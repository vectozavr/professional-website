---
title: Thanos
shortSummary: A method for pruning large language models using second-order information and coordinated weight compensation.
year: 2025
status: Preprint
category: Research / LLM Pruning
topics:
  - LLM pruning
  - Second-order optimization
  - Structured sparsity
featured: true
githubUrl: https://github.com/vectozavr/thanos
paperUrl: https://arxiv.org/abs/2504.05346
image: ../../assets/projects/thanos.webp
imageAlt: Diagram of coordinated weight pruning and compensation in a model weight matrix
imageFit: contain
youtubeVideoId: k4nUw3siA-I
metricsRepository: vectozavr/thanos
relatedPublications:
  - thanos
---

Thanos studies how multiple weights can be removed while compensating for their joint effect on a layer's output. Instead of treating each removed weight in isolation, the method uses Hessian-derived second-order information to coordinate weight updates.

The project explores efficient, block-wise layer optimization for both unstructured and structured sparsity. It is presented here as an active research project; no publication status or benchmark claims are implied.
