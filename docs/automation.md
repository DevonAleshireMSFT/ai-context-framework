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
| `scripts/check-drift.mjs` | `npm run check:drift` | Compares the consumer repo's framework stamp with this package's current framework and schema versions. | Advisory by default: exits 0 even when drift is found. Use `node scripts/check-drift.mjs --strict` to exit non-zero on drift. |
| `scripts/check-links.mjs` | `npm run check:links` | Markdown links and anchors in `docs/**/*.md`, `org/*.md`, `registry.md`, `CONTRIBUTING.md`, and `README.md`, including directory links, GitHub-style heading slugs, and GitHub Pages publish-root safety. | Exits non-zero when a local link, external-format link, anchor, or Pages publish-root link cannot be resolved safely. |
| `scripts/validate-registry.mjs` | `npm run validate:registry` | The `registry.md` "Registered Repositories" table: seven columns, Mode and Status values parsed from the document, and ISO adoption dates. | Exits non-zero when the table shape, enum values, or dates are invalid. |
| `scripts/check-staleness.mjs` | `node scripts/check-staleness.mjs --ci` | `.ai/context.md` freshness based on its `review-cadence`, mapped to a maximum allowed age. Supports `--ci` and `--json` modes. | In `--ci` mode, exits non-zero when context is overdue; `--json` emits machine-readable results. |
| Aggregate validation | `npm run validate` | Runs AI Context validation followed by Markdown link checking. | Exits non-zero if either included check fails. |

---

## Versioning & Drift Detection

The framework uses two versions, following [ADR-0002](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/.ai/adr/0002-framework-distribution.md):

- `FRAMEWORK_VERSION` is the tooling/package version. `package.json` is the release source of truth, and `scripts/lib/version.mjs` reads it so scripts and future CLI stamps use the same value.
- `SCHEMA_VERSION` is the `.ai/` content contract version enforced by the validator. It starts at `1.0.0`.

Managed consumer repositories will carry a framework stamp at the repository root:

```json
{
  "frameworkVersion": "0.1.0",
  "schemaVersion": "1.0.0"
}
```

The stamp file is `.ai-context.json`. The `init` and `update` commands write and maintain it; the drift check only reads it and never mutates the working tree.

Run drift detection with:

```bash
npm run check:drift
node scripts/check-drift.mjs --strict
```

Drift semantics:

- No `.ai-context.json`: informational "unmanaged / pre-CLI install" notice; exit 0.
- Stamp older than `FRAMEWORK_VERSION`: warning with installed/latest versions and an update hint.
- Stamp equal to current framework and schema: OK.
- Stamp newer than this package: informational notice, useful when a consumer repo is ahead of local tooling.
- Stamp `schemaVersion` older than `SCHEMA_VERSION`: warning with a migration pointer.

Schema compatibility follows ADR-0002 and is evaluated at `MAJOR.MINOR` granularity. Patch differences are backward-compatible clarifications and do not trigger schema drift warnings. A prerelease of the same `MAJOR.MINOR` (for example, `1.0.0-alpha` when the validator schema is `1.0.0`) is treated as older than the released schema and produces a warning; a newer `MAJOR.MINOR` warns that tooling may be behind.

`check:drift` is CI-safe and non-mutating. It exits 0 by default even when warnings are present so existing adopters are not broken by advisory drift. Teams that want a hard gate can pass `--strict`, which exits non-zero when warning-level drift is detected.

The validator prints its framework and schema versions in the output header. A `.ai/context.md` may optionally declare `schema-version`; absent means current/compatible for backward compatibility. Schema drift is reported as warnings, not errors.

---

## GitHub Actions workflows

Two workflows can be copied into adopter repositories.

**AI Context Conformance** lives at `.github/workflows/ai-context-conformance.yml`. It runs on pull requests that touch `.ai/`, `templates/`, `org/`, scripts, workflows, or other framework-controlled documentation. The blocking job validates `.ai/`, checks Markdown links, and runs the unit tests. A separate informational job runs stricter checks with `--strict`; it reports findings without blocking the PR. The workflow only needs read access to repository contents.

For repositories with a Jekyll site at `docs/_config.yml`, `check-links.mjs` treats `docs/` as the GitHub Pages publish root. Relative links inside `docs/` must stay under `docs/`; links to out-of-site files such as `.ai/`, `.github/`, or `org/` must use absolute `https://github.com/<owner>/<repo>/blob/<branch>/<path>` URLs so the published site does not 404.

Because AI Context Conformance is a required check, its [`paths:` filter](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/.github/workflows/ai-context-conformance.yml) must include every content directory that should be gated; otherwise matching PRs can silently skip the workflow and wait forever on the required status. The filter now covers `.ai/`, `templates/`, `org/`, `scripts/`, `docs/`, `examples/`, and key root documentation so content PRs receive the `BLOCKING - Conformance gate` result.

**AI Context Staleness** lives at `.github/workflows/ai-context-staleness.yml`. It runs on a weekly schedule and by manual dispatch. When `.ai/context.md` is overdue, it opens or updates one de-duplicated "📅 Context Review Due" issue instead of creating repeated reminders. The workflow needs read access to repository contents and write access to issues.

---

## Enabling automation in an adopter repo

Use the CLI instead of copying files by hand:

```bash
npm i -g github:DevonAleshireMSFT/ai-context-framework
ai-context init
ai-context check
```

`init` installs the managed scripts, conformance workflow, PR template, `.ai-context.json` stamp, and `.gitignore` entry. `update` refreshes those managed tooling files later without touching `.ai/**`. See the [CLI reference](cli) for the manifest, flags, exit codes, and migration path from manual copy.

Manual copy is now a fallback only for environments that cannot execute the packaged CLI or an approved mirrored tarball.

---

## Optional Squad integration

This automation works without Squad and protects the durable `.ai/` layer: freshness, conformance, links, and registry quality. If [Squad](https://github.com/bradygaster/squad#squad) is installed separately, Squad continues to manage its AI-team workflow state in `.squad/`; the boundary is described in [Architecture](architecture) and maintained through [Governance](governance).
