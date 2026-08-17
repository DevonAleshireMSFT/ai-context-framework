---
project: AI Context Framework
platform: Markdown standards + dependency-free Node.js (>=18) CLI on GitHub
cloud: GitHub (GitHub Pages hosts the docs site; no application runtime)
context-version: 1.1.0
last-updated: 2026-08-13T15:02:00-07:00
owner: Architecture Team
review-cadence: quarterly
---

# AI Context Framework — AI Context

> This is the AI context for the `ai-context-framework` repository itself. An AI assistant working in this repository should read this file first.

---

## Boundary

- `.ai/` is durable product knowledge: WHAT this product is and WHY constraints exist.
- Product decisions live in `.ai/adr/NNNN-title.md`.
- This repository also uses Squad, so `.squad/` is AI-team working state: HOW work was routed, decided, and done.
- `.squad/decisions.md` links to Product ADRs; it does not restate them. AI Context does not require Squad.

---

## What This Is

This repository is an enterprise framework for governing how AI context is created, maintained, and used across software development projects. It is not a software product — it is a standards, templates, and governance system.

---

## Current State

- ✅ Core three-tier architecture defined
- ✅ Per-repository `.ai/` template files created
- ✅ Enterprise governance model documented
- ✅ PR checklist template created
- ✅ `ai-context` CLI (`init` / `update` / `check`) in `bin/`, dependency-free and build-free
- ✅ Validation tooling in `scripts/`: `.ai/` conformance, doc links, version drift, staleness, registry
- ✅ CI: blocking conformance gate on pull requests, plus a weekly staleness review issue
- ✅ Docs site published from `docs/` via GitHub Pages
- ✅ Azure AI Search / RAG guidance with a reference ingestion example in `examples/azure-ai-search/`
- 📦 Distribution: git install is the current primary channel ([ADR-0003](adr/0003-git-install-primary-distribution.md)); npm feed + tarball deferred to backlog
- ✅ `registry.md` adoption date recorded as `2026-05-12`

---

## Architecture Summary

The framework defines three tiers of AI context:
- **Tier 1 (this repo):** Enterprise-wide standards, governance, templates, and registry.
- **Tier 2 (project repos):** Repository-specific context committed as `.ai/` in each repo.
- **Tier 3 (developer local):** Personal working memory in `.ai_local/`, never committed; see the [Tier 3 contract](../docs/architecture.md#tier-3-ai-local).

The two axes are **authoritative** (committed source-of-truth) vs. **working memory** (derived, ephemeral). These must never be merged.

The repository layout mirrors those tiers: `org/` holds enterprise standards, `templates/` holds the files adopters copy, `bin/` and `scripts/` hold the distribution and validation tooling, `docs/` is the published site, `examples/` holds reference integrations, and `.github/workflows/` enforces conformance.

---

## Key Rules

- Templates live in `templates/` — copy them into project repos; do not edit them in-place for a project.
- The `org/` directory contains enterprise-wide standards — changes require Architecture Team review.
- `registry.md` must be updated when a repository adopts or retires the framework.
- All template files use the `.template` extension to distinguish them from live documents.
- This repo's own `.ai/` is Tier-2 context for the framework repo itself.
- `.ai/` records durable product knowledge and ADRs; `.squad/` records Squad working memory. `.squad/decisions.md` must link to product ADRs, not restate them.
- Framework tooling stays dependency-free and build-free: `bin/` and `scripts/` use only Node built-ins on Node >= 18, and tests run with `node --test`.
- Squad is detected, never installed: framework tooling and prompts must not create, remove, or rewrite Squad-owned files.

---

## Known Gotchas

> Non-obvious constraints that will cause errors if ignored.

- `ai-context update` rewrites every file in the CLI's managed manifest and the delimited block in `.github/copilot-instructions.md` from the packaged templates. Change `templates/copilot-instructions.md.template`; edits made directly inside the managed block are reverted on the next update.
- ADR front matter `adr:` must be an unquoted four-digit number matching the filename prefix — the conformance parser does not strip quotes.
- `docs/` is the GitHub Pages publish root. Relative links from `docs/**` that resolve outside `docs/` fail `check-links.mjs`; link to repository-root files with absolute `https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/...` URLs.
- `check-links.mjs` does not scan `.ai/**`, so links in this file are not covered by CI — verify them by hand when editing.
- Tier-3 personal context is the sibling `.ai_local/`, never `.ai/local/`; nesting it would pull personal notes into every `.ai/**` glob (RAG ingestion, CI path filters, staging).

---

## Product Decisions

Product ADRs live in `.ai/adr/` using the path format `.ai/adr/NNNN-title.md`.

| ADR | Decision | Status |
|-----|----------|--------|
| [`0001-ai-squad-boundary.md`](adr/0001-ai-squad-boundary.md) | `.ai/` holds durable product knowledge and ADRs; `.squad/` holds AI-team working state and links to ADRs instead of restating them | accepted |
| [`0002-framework-distribution.md`](adr/0002-framework-distribution.md) | npm CLI distribution with enterprise fallback; its subcommand surface, safe-merge update semantics, and `.ai/**` write protections remain in force | superseded |
| [`0003-git-install-primary-distribution.md`](adr/0003-git-install-primary-distribution.md) | Git install is the current primary distribution channel; npm feed and tarball are deferred | accepted |

---

## Where to Look

| Topic | File |
|-------|------|
| Framework standards | [org/standards.md](../org/standards.md) |
| Governance model | [org/governance.md](../org/governance.md) |
| Platform guidance | [org/platform.md](../org/platform.md) |
| Enterprise glossary | [org/glossary.md](../org/glossary.md) |
| Repo registry | [registry.md](../registry.md) |
| Product ADRs | [adr/](adr/) |
| All templates | [templates/](../templates/) |
| Tier model and boundaries | [docs/architecture.md](../docs/architecture.md) |
| CLI usage | [docs/cli.md](../docs/cli.md) |
| CI, validation, and staleness automation | [docs/automation.md](../docs/automation.md) |
| Contribution workflow | [CONTRIBUTING.md](../CONTRIBUTING.md) |

Optional `.ai/` detail files are deliberately not used in this repository — the durable equivalent already lives elsewhere:

| Optional file | Not created because |
|---------------|---------------------|
| `domain.md` | Framework vocabulary is maintained in [org/glossary.md](../org/glossary.md) |
| `data-model.md` | The only schemas are the front-matter and ADR contracts in [org/standards.md](../org/standards.md) and the schema version rules in `scripts/lib/version.mjs` |
| `security.md` | No application runtime, roles, or data store; secret and PII rules live in [org/standards.md](../org/standards.md) and [README](../README.md#what-never-belongs-in-ai-context) |
| `pipelines.md` | CI, validation, and release behavior are documented in [docs/automation.md](../docs/automation.md) |
