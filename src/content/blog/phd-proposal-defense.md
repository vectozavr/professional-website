---
title: I passed my PhD proposal defense
description: My proposal connects LLM pruning, sparse fine-tuning, and pipeline-parallel optimization into one research program.
publishDate: 2026-07-22
tags:
  - Research
  - Milestone
  - KAUST
draft: false
---

Today I passed my PhD proposal defense at KAUST and advanced to PhD candidacy.

My proposal committee was chaired by [Peter Richtárik](https://richtarik.org); its other members were [Suhaib Fahmy](https://cemse.kaust.edu.sa/profiles/suhaib-fahmy), [Rolf Krause](https://r-krause.kaust.edu.sa/), and [Panos Kalnis](https://kalnis.org/).

You can watch the full proposal-defense recording below or [open it on YouTube](https://youtu.be/3tJKmB5Ijkg).

<div class="article-video-frame">
  <iframe
    class="article-video"
    src="https://www.youtube-nocookie.com/embed/3tJKmB5Ijkg"
    title="Efficient Optimization and Compression Methods for LLMs — PhD Proposal Defense at KAUST"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>

The proposal is titled **“Efficient Optimization and Compression Methods for Large Language Models.”** It brings together three lines of work that initially looked like separate efficiency problems:

1. [Thanos](/projects/thanos/) studies post-training pruning, using block-wise second-order reconstruction to remove weights while updating the surviving ones.
2. [Super and Supra](/projects/sparse-fine-tuning/) use pruning-inspired scores to choose a fixed sparse set of trainable weights, with Supra combining that sparse update with LoRA under a matched parameter budget.
3. [Randomized PipeDream](/projects/pipeline-parallelism-theory/) studies the optimization behavior of pipeline-parallel training and the structured delays created by a PipeDream-style schedule.

The connection is the cost of working with large models at three different stages. Pruning targets inference and storage. Sparse and low-rank updates target adaptation. Pipeline parallelism becomes necessary when training itself no longer fits comfortably on one accelerator.

Putting these projects into one proposal forced me to state what the research program is really about. The common theme is not a single compression technique; it is the interaction between model structure and optimization. Efficiency improvements become more useful when the algorithm reflects where computation, memory, and delay actually come from.

Passing the proposal is an important checkpoint, but it is still a checkpoint. The next stage is to strengthen the empirical evidence, extend the theory, and make the accompanying implementations easier to reproduce and use.
