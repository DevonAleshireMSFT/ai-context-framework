---
layout: default
title: CLI Reference
nav_order: 8
permalink: /cli
---

# CLI Reference
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

The AI Context Framework is distributed as the zero-runtime-dependency Node CLI described by [ADR-0002](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/.ai/adr/0002-framework-distribution.md).

> Publishing note: `package.json` is still `"private": true` while the framework is pre-publish. Releasing the npm package flips that flag but keeps the scoped package name `@devonaleshiremsft/ai-context` and bin command `ai-context`.

## Install / invoke

```bash
npx @devonaleshiremsft/ai-context init
npx @devonaleshiremsft/ai-context update
npx @devonaleshiremsft/ai-context check
```

Enterprise mirrors and offline tarballs use the same subcommands:

```bash
npx ./ai-context-0.1.0.tgz update
```

## Commands

### `ai-context init`

Scaffolds a consumer repository safely:

- creates `.ai/context.md` from `templates/context.md.template` only when absent
- creates `.ai/adr/`
- installs managed tooling files
- installs `.github/workflows/ai-context-conformance.yml`
- installs `.github/PULL_REQUEST_TEMPLATE.md`
- seeds `.github/copilot-instructions.md` only when absent
- appends `.ai_local/` to `.gitignore` if missing
- writes `.ai-context.json`

Existing files are skipped, never clobbered.

### `ai-context update`

Refreshes only the managed tooling layer to the current framework version. It never writes, deletes, or rewrites `.ai/**`.

Flags:

- `--dry-run` reports planned changes without writing anything.
- `--strict` exits non-zero when schema drift or manual actions remain.

### `ai-context check`

Runs the `.ai/` validator and drift check. It is CI-safe and non-mutating.

Flags:

- `--strict` exits non-zero on warning-level framework/schema drift.

## Shared flags

| Flag | Applies to | Purpose |
|------|------------|---------|
| `--cwd <path>` | all commands | Run against a consumer repo root other than the current directory. |
| `--help` | CLI | Print usage. |
| `--version` | CLI | Print framework and schema versions. |

## Exit codes

| Command | Exit code 0 | Exit code 1 |
|---------|-------------|-------------|
| `init` | Scaffold completed or existing files were skipped safely. | Invalid arguments or file-system error. |
| `update` | Update completed; advisory warnings may be present. | Invalid arguments, file-system error, or `--strict` with schema drift/manual actions. |
| `check` | No validation errors; drift is advisory unless strict. | Validation errors, invalid arguments, file-system error, or `--strict` with drift. |

## Managed-file manifest

The CLI has one manifest used by both `init` and `update`:

- `scripts/check-drift.mjs`
- `scripts/check-links.mjs`
- `scripts/check-staleness.mjs`
- `scripts/validate-ai-context.mjs`
- `scripts/validate-registry.mjs`
- `scripts/lib/*.mjs`
- `.github/workflows/ai-context-conformance.yml`
- `.github/PULL_REQUEST_TEMPLATE.md`

Template source files are seed inputs for `init`; they are not overwritten by `update`. Consumer-owned `.ai/**` and existing `.github/copilot-instructions.md` content are never part of the overwrite manifest.

## Copilot instructions merge

`update` preserves existing `.github/copilot-instructions.md` content, including Squad coordinator instructions. It adds or replaces only the delimited framework block:

```markdown
<!-- BEGIN AI CONTEXT FRAMEWORK MANAGED BLOCK -->
...
<!-- END AI CONTEXT FRAMEWORK MANAGED BLOCK -->
```

## Upgrade guide

Run:

```bash
npx @devonaleshiremsft/ai-context update
npx @devonaleshiremsft/ai-context check
```

Review the report. If schema drift is reported, read the release notes or migration guidance for the target schema before changing `.ai/**` content manually.

## Migration from manual copy

For repositories that previously copied files by hand:

1. Run `npx @devonaleshiremsft/ai-context update`.
2. The CLI treats a missing `.ai-context.json` as unmanaged and adopts the repo by installing managed tooling and writing the stamp.
3. Review the report for preserved files and any manual actions.
4. Run `npx @devonaleshiremsft/ai-context check`.

This replaces the old manual copy process for tooling updates. Manual fallback remains available only for environments that cannot execute Node/npm artifacts.
