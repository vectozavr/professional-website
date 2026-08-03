---
title: VoiceCut
shortSummary: An open-source, local-first tool for automatically editing recorded speech.
status: Active
category: Open Source / Audio Processing
topics:
  - Audio processing
  - Speech editing
  - Open source
featured: true
githubUrl: https://github.com/vectozavr/voicecut
demoUrl: https://vectozavr.github.io/voicecut/
image: ../../assets/projects/voicecut-pipeline.webp
imageAlt: VoiceCut pipeline from source audio through planning, grounding, alignment, and final rendering
imageFit: contain
metricsRepository: vectozavr/voicecut
relatedPublications: []
---

VoiceCut helps remove failed takes, repeated phrases, false starts, and unwanted breaths from recorded audio and video. Its goal is to preserve natural speech while reducing the repetitive manual work involved in selecting good takes and cleaning narration.

The project is open source and local-first. Source media, transcription, alignment, boundary resolution, and rendering stay on the local machine. Its recommended planning workflow can send transcript text and identifiers—not audio or video—to a configured cloud model, while experimental local planners are also available. VoiceCut does not synthesize replacement speech; it edits selected occurrences from the original recording.

VoiceCut is currently described as beta software. The repository is the source of truth for its current scope, setup instructions, and limitations.
