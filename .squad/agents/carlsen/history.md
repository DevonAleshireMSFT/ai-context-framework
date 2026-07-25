# Project Context

- **Owner:** Devon Aleshire
- **Project:** AI Context Framework — an enterprise standards, templates, and governance system for structuring and maintaining AI context (`.ai/` directories) across software repos. Three-tier model: enterprise standards (this repo) / project `.ai/` / developer-local `.ai_local/`.
- **Stack:** Markdown, GitHub Pages docs site, GitHub Actions (planned CI validation), `.template` files, repo registry.
- **Created:** 2026-07-25

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->
- Core invariant: authoritative (committed source-of-truth) and working memory (derived, ephemeral) must never be merged.
- Templates live in `templates/` with `.template` extension; never edit them in-place for a project — copy into the adopter repo.
- `org/` holds enterprise-wide standards; changes require Architecture Team review.
- `registry.md` must be updated when a repo adopts or retires the framework.
