# Project Context

- **Owner:** Devon Aleshire
- **Project:** AI Context Framework — an enterprise standards, templates, and governance system for structuring and maintaining AI context (`.ai/` directories) across software repos. Three-tier model: enterprise standards (this repo) / project `.ai/` / developer-local `.ai_local/`.
- **Stack:** Markdown, GitHub Pages docs site, GitHub Actions (planned CI validation), `.template` files, repo registry.
- **Created:** 2026-07-25

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->
- Roadmap gaps: automation tooling (CI validation, staleness detection) and Azure AI Search / RAG integration guidance are not yet built.
- Automation should be config-driven so adopter repos opt in without forking scripts.
