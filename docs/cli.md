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

The AI Context Framework is distributed as a zero-runtime-dependency Node CLI. Git install is the current primary distribution channel, per [ADR-0003](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/.ai/adr/0003-git-install-primary-distribution.md) (which supersedes the npm-primary channel in [ADR-0002](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/.ai/adr/0002-framework-distribution.md)).

> Publishing note: `package.json` is `"private": true` and the scoped package `@devonaleshiremsft/ai-context` is unpublished, so `npx @devonaleshiremsft/ai-context` does **not** work. Use the git-install commands below. Publishing to an npm feed is a deferred channel on the [roadmap backlog](https://github.com/DevonAleshireMSFT/ai-context-framework#roadmap).

## Install / invoke

Install the CLI globally from the framework repository, then run the commands from inside your project:

```bash
npm i -g github:DevonAleshireMSFT/ai-context-framework
ai-context init
ai-context update
ai-context check
```

Or invoke a single command without installing:

```bash
npx github:DevonAleshireMSFT/ai-context-framework init
```

Enterprise mirrors and offline tarballs are **deferred channels** ([roadmap backlog](https://github.com/DevonAleshireMSFT/ai-context-framework#roadmap)). When published, they will use the same subcommands — for example a pinned tarball:

```bash
npx ./ai-context-0.1.0.tgz update
```

## Commands

### `ai-context init`

Scaffolds a consumer repository safely:

- detects whether the repository already uses Squad CLI, without requiring or installing Squad
- creates `.ai/context.md` from `templates/context.md.template` only when absent
- creates `.ai/adr/`
- installs managed tooling files
- installs `.github/workflows/ai-context-conformance.yml`
- installs `.github/PULL_REQUEST_TEMPLATE.md`
- seeds `.github/copilot-instructions.md`, merging a delimited framework block into any existing file without clobbering its content
- appends `.ai_local/` to `.gitignore` if missing
- writes `.ai-context.json`

Existing files are skipped, never clobbered.

For both `init` and `update`, Squad detection checks for `.squad/team.md` or `.github/agents/squad.agent.md`. Each command prints `squad: detected` when either artifact exists, otherwise `squad: not detected (optional)`. Detection is informational: both commands preserve Squad-owned files, and AI Context never installs, creates, or removes `.squad/`.

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

Both `init` and `update` preserve existing `.github/copilot-instructions.md` content, including Squad coordinator instructions. They add or replace only the delimited framework block:

```markdown
<!-- BEGIN AI CONTEXT FRAMEWORK MANAGED BLOCK -->
...
<!-- END AI CONTEXT FRAMEWORK MANAGED BLOCK -->
```

## Upgrade guide

Run:

```bash
ai-context update
ai-context check
```

Review the report. If schema drift is reported, read the release notes or migration guidance for the target schema before changing `.ai/**` content manually.

## Migration from manual copy

For repositories that previously copied files by hand:

1. Run `ai-context update`.
2. The CLI treats a missing `.ai-context.json` as unmanaged and adopts the repo by installing managed tooling and writing the stamp.
3. Review the report for preserved files and any manual actions.
4. Run `ai-context check`.

This replaces the old manual copy process for tooling updates. Manual fallback remains available only for environments that cannot execute Node/npm artifacts.
