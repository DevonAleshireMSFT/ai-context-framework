---
project: AI Context Framework
platform: Documentation / GitHub
context-version: 1.0.0
last-updated: 2026-07-25T02:22:07-07:00
owner: Architecture Team
review-cadence: quarterly
---

# AI Context Framework — AI Context

> This is the AI context for the `ai-context-framework` repository itself. An AI assistant working in this repository should read this file first.

---

## What This Is

This repository is an enterprise framework for governing how AI context is created, maintained, and used across software development projects. It is not a software product — it is a standards, templates, and governance system.

---

## Current State

- ✅ Core three-tier architecture defined
- ✅ Per-repository `.ai/` template files created
- ✅ Enterprise governance model documented
- ✅ PR checklist template created
- ⏳ Automation tooling (CI validation, staleness detection)
- 🔲 Azure AI Search / RAG integration guidance

---

## Architecture Summary

The framework defines three tiers of AI context:
- **Tier 1 (this repo):** Enterprise-wide standards, governance, templates, and registry.
- **Tier 2 (project repos):** Repository-specific context committed as `.ai/` in each repo.
- **Tier 3 (developer local):** Personal working memory in `.ai_local/`, never committed; see the [Tier 3 contract](../docs/architecture.md#tier-3-ai-local).

The two axes are **authoritative** (committed source-of-truth) vs. **working memory** (derived, ephemeral). These must never be merged.

---

## Key Rules

- Templates live in `templates/` — copy them into project repos; do not edit them in-place for a project.
- The `org/` directory contains enterprise-wide standards — changes require Architecture Team review.
- `registry.md` must be updated when a repository adopts or retires the framework.
- All template files use the `.template` extension to distinguish them from live documents.
- This repo's own `.ai/` is Tier-2 context for the framework repo itself.
- `.ai/` records durable product knowledge and ADRs; `.squad/` records Squad working memory. `.squad/decisions.md` must link to product ADRs, not restate them.

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
