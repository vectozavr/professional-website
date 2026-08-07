---
title: Our TRACE project received a KAUST sTRG
description: A USD 100,000 Small Translational Research Grant will support TRACE, a project for turning textbooks into verified, interactive courses.
publishDate: 2026-06-01
tags:
  - Projects
  - Grant
  - KAUST
draft: false
---

Our proposal for **TRACE — Transforming Textbooks into Verified, Interactive Courses using Retrieval-Augmented Generation** — has received a KAUST Small Translational Research Grant.

The award provides **USD 100,000** for the period from July 2026 through June 2027. I was the primary author of the proposal, and [Peter Richtárik](https://richtarik.org) is the lead principal investigator. The project team includes me, [Laurent Condat](https://lcondat.github.io), and [Yury Demidovich](https://www.linkedin.com/in/yuradem/).

## Why TRACE

Textbooks contain carefully organized and reviewed knowledge, but their usual PDF form is not easy to turn into an interactive learning experience. A student may want an explanation at a different level, a prerequisite recap, a worked example, or an exercise tied to a particular section. A generative model can produce all of those things, but a plausible answer is not enough for education.

TRACE starts from a stricter requirement: generated course material should remain connected to the source from which it was built. In this context, “verified” should not mean that a model merely sounds confident. It should mean that explanations, questions, and answers can be checked against extracted textbook content with clear provenance.

## From a proposal to a prototype

The first implementation problems are already concrete. Mathematical books have formulas, tables, figures, footnotes, and cross-references that ordinary text extraction can damage. Retrieval units need enough context to remain meaningful, while every unit must still point back to its page and location in the source. Generated material then needs validation that is separate from generation itself.

The grant gives us room to build and evaluate this as a system rather than leave it as a promising workflow on paper. Over the coming year, the goal is to move from reliable textbook ingestion to a prototype course experience whose outputs are useful, inspectable, and grounded in the original material.
