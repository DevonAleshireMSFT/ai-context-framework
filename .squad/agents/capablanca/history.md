# Project Context

- **Owner:** Devon Aleshire
- **Project:** AI Context Framework — an enterprise standards, templates, and governance system for structuring and maintaining AI context (`.ai/` directories) across software repos. Three-tier model: enterprise standards (this repo) / project `.ai/` / developer-local `.ai_local/`.
- **Stack:** Markdown, GitHub Pages docs site, GitHub Actions (planned CI validation), `.template` files, repo registry.
- **Created:** 2026-07-25

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->
- All template files use the `.template` extension to distinguish them from live documents.
- The framework's promise is a working `.ai/` setup in under 10 minutes — protect that path.
- Docs site: https://devonaleshiremsft.github.io/ai-context-framework/
📌 Team update (2026-07-25T01:08:38-07:00): Boundary refactor planned — `.ai/` will remain slim durable product context while Squad owns team execution; docs and validation work will follow.
- 2026-07-25T02:22:07-07:00: Delivered issue #8 in PR #18 by adding the Automation & CI docs page and docs index pointer.
- 2026-07-25T02:22:07-07:00: Delivered issue #7 in PR #16 with the org standards review workflow and scoped CODEOWNERS.
