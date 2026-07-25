# Project Context

- **Owner:** Devon Aleshire
- **Project:** AI Context Framework — an enterprise standards, templates, and governance system for structuring and maintaining AI context (`.ai/` directories) across software repos. Three-tier model: enterprise standards (this repo) / project `.ai/` / developer-local `.ai_local/`.
- **Stack:** Markdown, GitHub Pages docs site, GitHub Actions (planned CI validation), `.template` files, repo registry.
- **Created:** 2026-07-25

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->
- Authoritative docs (`org/`, `registry.md`) must have zero broken links — they are the standard others are held to.
- Validation checks defined here should feed Tal's future CI automation.
📌 Team update (2026-07-25T01:08:38-07:00): Boundary refactor planned — `.ai/` will remain slim durable product context while Squad owns team execution; docs and validation work will follow.
- 2026-07-25T01:38:26-07:00: Approved the `.ai/` ↔ `.squad/` boundary refactor on re-review after Kasparov's fixes.
- 2026-07-25T02:22:07-07:00: Reviewed issue #4 work in PR #12 and participated in reviewer-lockout flow for the overnight run.
