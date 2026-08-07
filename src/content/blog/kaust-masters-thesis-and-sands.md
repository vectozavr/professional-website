---
title: From my KAUST master’s thesis to a SANDS seminar
description: I completed my master’s work on efficient LLM pruning and presented the Thanos project at the KAUST SANDS seminar.
publishDate: 2024-11-26
tags:
  - Research
  - LLM pruning
  - KAUST
draft: false
---

This month I completed my master’s research in Computer Science at KAUST. The thesis, [*Efficient and Fast Pruning of Large Language Models*](https://repository.kaust.edu.sa/items/2b0d935b-4ce3-4cf7-aab3-e5b3352fa515), is now available through the KAUST repository with a permanent DOI.

My thesis committee was chaired by [Peter Richtárik](https://richtarik.org); its other members were [Marco Canini](https://mcanini.github.io/), [Panagiotis Kalnis](https://kalnis.org/), and [Mikhail Moshkov](https://cemse.kaust.edu.sa/profiles/mikhail-moshkov).

The work asks a practical question: how can we remove parameters from a large language model without treating every weight as an isolated number? Magnitude pruning is fast, but it ignores both the activations that pass through a layer and the way surviving weights can compensate for removed ones. My thesis studies increasingly informed alternatives, from activation-aware scores to second-order reconstruction.

That line of work led to **Thanos**, a block-wise approach to pruning. Instead of deleting one weight and repairing the layer one coordinate at a time, Thanos handles a selected group of weights together and uses second-order information to coordinate the update. The goal is to make richer reconstruction steps manageable at the scale of transformer layers.

Today I presented this project in the [KAUST SANDS seminar series](https://sands.kaust.edu.sa/seminars/2024-11-26-Ivan-Ilin/). A seminar and a thesis require different explanations: the thesis preserves the derivations and experiments, while the talk has to expose the central idea quickly enough for a broader systems-and-algorithms audience. You can watch the recording below or [open it on YouTube](https://www.youtube.com/watch?v=OwYVbJch-bc).

<div class="article-video-frame">
  <iframe
    class="article-video"
    src="https://www.youtube-nocookie.com/embed/OwYVbJch-bc"
    title="Efficient and Fast Pruning of Large Language Models — KAUST SANDS seminar recording"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>

This is not the end of the project. It is a useful checkpoint: the thesis records the path that led to the method, and the seminar helped turn that path into a clearer research story.
