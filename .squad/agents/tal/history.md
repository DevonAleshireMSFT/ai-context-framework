# Project Context

- **Owner:** Devon Aleshire
- **Project:** AI Context Framework — an enterprise standards, templates, and governance system for structuring and maintaining AI context (`.ai/` directories) across software repos. Three-tier model: enterprise standards (this repo) / project `.ai/` / developer-local `.ai_local/`.
- **Stack:** Markdown, GitHub Pages docs site, GitHub Actions (planned CI validation), `.template` files, repo registry.
- **Created:** 2026-07-25

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->
- Roadmap gaps: automation tooling (CI validation, staleness detection) and Azure AI Search / RAG integration guidance are not yet built.
- Automation should be config-driven so adopter repos opt in without forking scripts.
- 2026-07-25T02:22:07-07:00: Delivered issue #3 in PR #19 by adding Azure AI Search / RAG guidance and an `examples/azure-ai-search/` ingestion example.
- 2026-07-25T02:22:07-07:00: Delivered issues #1 and #2 in PRs #13 and #14, establishing conformance CI plus staleness review automation.

- 2026-07-25T13:48:45-07:00: Contributed the tooling recommendation that Tier-3 personal context remain in sibling .ai_local/, not nested .ai/local/, so conformance filters, staging, and RAG scanners stay private-by-default.
