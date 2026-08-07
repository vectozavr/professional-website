---
title: Efficient LLM pruning at the KAUST Graduate Seminar
description: A recording of my department-wide Computer Science Graduate Seminar talk on efficient pruning of large language models.
publishDate: 2025-04-17
tags:
  - Talks
  - LLM pruning
  - KAUST
draft: false
---

On April 14, I gave a department-wide talk in the KAUST Computer Science Graduate Seminar: **“Efficient Pruning of LLMs.”** You can watch the recording below or [open it on YouTube](https://www.youtube.com/watch?v=K25rVdQ-gBc&t=1892s).

<div class="article-video-frame">
  <iframe
    class="article-video"
    src="https://www.youtube-nocookie.com/embed/K25rVdQ-gBc?start=1892"
    title="Efficient Pruning of LLMs — KAUST Computer Science Graduate Seminar recording"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>

I wanted the talk to build the subject from first principles. Large language models contain enormous linear layers, so pruning naturally starts with a simple idea: remove weights that look unimportant. The difficulty is deciding what “unimportant” means and what to do after a weight disappears.

The presentation follows a progression from magnitude pruning to activation-aware scores and then to second-order reconstruction. Magnitude sees only a weight’s value. Activation-aware methods also look at the feature that the weight multiplies. Second-order methods go further: they model correlations between features and use the surviving weights to compensate for a deletion.

That progression leads to my current work on **Thanos**. Its central step handles several selected weights together inside a block, solving a small constrained reconstruction problem before passing the resulting update into the still-active part of the layer. I used the layer-output reconstruction objective as the backbone of the talk because it gives all of these methods a common language.

Preparing a seminar for a broad Computer Science audience is different from presenting only to researchers already working on model compression. Every piece of notation has to earn its place, and the motivation has to survive even if a viewer skips the derivation. The recording preserves that version of the story; the [Thanos project page](/projects/thanos/) contains the technical details and figures.
