# Project Context

- **Owner:** Devon Aleshire
- **Project:** AI Context Framework — an enterprise standards, templates, and governance system for structuring and maintaining AI context (`.ai/` directories) across software repos. Three-tier model: enterprise standards (this repo) / project `.ai/` / developer-local `.ai_local/`.
- **Stack:** Markdown, GitHub Pages docs site, GitHub Actions (planned CI validation), `.template` files, repo registry.
- **Created:** 2026-07-25

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->
- `org/` standards changes require Architecture Team review — governance is not optional.
- `registry.md` is the source of truth for which repos have adopted/retired the framework.
- Terminology must stay consistent with `org/glossary.md`.
- 2026-07-25T01:38:26-07:00: Revised `.squad/decisions.md`, `templates/context.md.template`, and `.ai/adr/0001-ai-squad-boundary.md` to clear Polgar's boundary-refactor block.
