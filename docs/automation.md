---
layout: default
title: Automation & CI
nav_order: 7
permalink: /automation
---

# Automation & CI
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

The AI Context Framework ships dependency-free validators and GitHub Actions so `.ai/` conformance, documentation link integrity, registry hygiene, and context freshness can be enforced automatically.

Everything is built with Node.js built-ins. Use Node 18 or newer; no third-party packages and no `npm install` step are required.

---

## Validators

Run these locally before opening a PR, or from CI in an adopter repository.

| Script | Command | What it checks | Exit behavior |
|--------|---------|----------------|---------------|
| `scripts/validate-ai-context.mjs` | `npm run validate:ai-context` | `.ai/context.md` and `.ai/adr/NNNN-*.md` front matter matches the template contracts: required fields, semantic versions, ISO dates, allowed `review-cadence` values, and ADR number/filename agreement. | Exits non-zero when required files, fields, values, or ADR numbering are invalid. |
| `scripts/check-links.mjs` | `npm run check:links` | Markdown links and anchors in `org/*.md`, `registry.md`, `CONTRIBUTING.md`, and `README.md`, including directory links and GitHub-style heading slugs. | Exits non-zero when a local link, external-format link, or anchor cannot be resolved. |
| `scripts/validate-registry.mjs` | `npm run validate:registry` | The `registry.md` "Registered Repositories" table: seven columns, Mode and Status values parsed from the document, and ISO adoption dates. | Exits non-zero when the table shape, enum values, or dates are invalid. |
| `scripts/check-staleness.mjs` | `node scripts/check-staleness.mjs --ci` | `.ai/context.md` freshness based on its `review-cadence`, mapped to a maximum allowed age. Supports `--ci` and `--json` modes. | In `--ci` mode, exits non-zero when context is overdue; `--json` emits machine-readable results. |
| Aggregate validation | `npm run validate` | Runs the conformance validators together for the standard local and CI quality gate. | Exits non-zero if any included validator fails. |

---

## GitHub Actions workflows

Two workflows can be copied into adopter repositories.

**AI Context Conformance** lives at `.github/workflows/ai-context-conformance.yml`. It runs on pull requests that touch `.ai/`, `templates/`, `org/`, scripts, workflows, or other framework-controlled documentation. The blocking job validates `.ai/`, checks Markdown links, and runs the unit tests. A separate informational job runs stricter checks with `--strict`; it reports findings without blocking the PR. The workflow only needs read access to repository contents.

Because AI Context Conformance is a required check, its [`paths:` filter](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/.github/workflows/ai-context-conformance.yml) must include every content directory that should be gated; otherwise matching PRs can silently skip the workflow and wait forever on the required status. The filter now covers `.ai/`, `templates/`, `org/`, `scripts/`, `docs/`, `examples/`, and key root documentation so content PRs receive the `BLOCKING - Conformance gate` result.

**AI Context Staleness** lives at `.github/workflows/ai-context-staleness.yml`. It runs on a weekly schedule and by manual dispatch. When `.ai/context.md` is overdue, it opens or updates one de-duplicated "📅 Context Review Due" issue instead of creating repeated reminders. The workflow needs read access to repository contents and write access to issues.

---

## Enabling automation in an adopter repo

1. Copy `scripts/` into the adopter repository.
2. Copy the relevant `package.json` scripts: `validate:ai-context`, `check:links`, `validate:registry`, and `validate`.
3. Copy `.github/workflows/ai-context-conformance.yml` and `.github/workflows/ai-context-staleness.yml`.
4. Ensure `.ai/context.md` front matter is populated, especially `review-cadence` and review dates.
5. Open a PR that touches `.ai/` or framework docs; the conformance workflow will run automatically.

---

## How this complements Squad

This automation protects the durable `.ai/` layer: freshness, conformance, links, and registry quality. Squad manages AI-team workflow state in `.squad/`; the boundary is described in [Architecture](architecture) and maintained through [Governance](governance).
