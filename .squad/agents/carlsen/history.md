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
- 2026-07-25T02:22:07-07:00: Delivered issue #5 in PR #10 with dependency-free `.ai/` template conformance validation.
- 2026-07-25T02:22:07-07:00: Delivered issue #9 in PR #17 documenting the Tier-3 `.ai_local/` contract; also opened ADR bugfix PR #11.

- 2026-07-25T13:48:45-07:00: Contributed the standards recommendation that Tier-3 personal context remain in sibling .ai_local/, not nested .ai/local/, to preserve the framework boundary and avoid accidental .ai/** inclusion.

📌 Team update (2026-07-26T00:04:33-07:00): Overnight epic produced stacked PRs #25 → #26 → #27. Durable learnings: verify npm package names before naming ADRs/tooling; schema drift compatibility must compare MAJOR.MINOR explicitly, treating patch as compatible and current-line prerelease as warning; CLI updates must preserve adopter-owned `.ai/**` content and only modify manifest-managed files or bounded merge blocks.
