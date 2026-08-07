---
title: Presenting Thanos at KAUST Rising Stars in AI
description: I presented a poster on block-wise LLM pruning at the 2025 KAUST Rising Stars in AI Symposium.
publishDate: 2025-04-10
tags:
  - Talks
  - LLM pruning
  - KAUST
draft: false
---

This week I presented **“Thanos: A Block-wise Pruning Algorithm for Efficient Large Language Model Compression”** at the [KAUST Rising Stars in AI Symposium 2025](https://cemse.kaust.edu.sa/events/by-type/2025/04/07/rising-stars-ai-symposium-2025). The four-day symposium brought together talks, discussions, and poster sessions across a wide range of current AI research.

My poster focused on one question: after several weights are removed from a layer, how should the surviving weights move together to preserve its output?

This framing is important because pruning is often introduced only as a ranking problem. A score chooses which weights appear least important, but selecting a mask is only half of the task. Once those weights are fixed at zero, the remaining coordinates can compensate for the change. Thanos uses second-order information and manageable column blocks to couple those updates rather than treating every deletion independently.

The poster format was particularly useful for this project. A full derivation can hide the basic idea under notation; a poster has to make the flow visible in a few steps: choose a group, solve the local constrained reconstruction problem, and propagate the compensation into the active part of the layer. The short conversations around the poster also made it clear which parts of the explanation needed a better visual treatment.

The [Thanos preprint](https://arxiv.org/abs/2504.05346) is now available, and I am continuing to develop the implementation and presentation of the method. I have also collected the main ideas and figures on the [project page](/projects/thanos/).
