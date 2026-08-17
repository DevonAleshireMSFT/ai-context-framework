# Phase 03 — Repository Hygiene: Findings

**Phase Status:** Complete
**Completed by:** Tal (Automation & Tooling Engineer)
**Date:** 2026-08-17

---

## Scope

Repository structure, naming consistency, generated/ignored file hygiene, package organization
and metadata, template/sample/test organization, accidental publish surfaces, distribution
assumptions, and disposition of pre-existing untracked files.

---

## Validation Results

All checks run prior to any changes. Results were verified again after changes.

| Check | Before | After |
|-------|--------|-------|
| `node --test` | ✅ 50 pass, 0 fail | ✅ 50 pass, 0 fail |
| `validate:ai-context` | ✅ 0 ERROR, 0 WARNING | ✅ 0 ERROR, 0 WARNING |
| `check:drift` | ✅ current (0.1.0 / 1.0.0) | ✅ current (0.1.0 / 1.0.0) |
| `validate:registry` | ⚠️ 1 WARNING (YYYY-MM-DD placeholder) | ⚠️ 1 WARNING (unchanged — human decision) |
| `check:links` | ✅ 17 files, 88 links, 0 errors | ✅ 17 files, 88 links, 0 errors |
| `npm pack --dry-run` | See F-05 | See F-05 (no changes to pack surface in this phase) |

---

## Findings

### F-01 — `.ai-context.json` Disposition (RESOLVED)

**Severity:** Informational — untracked file, disposition resolved by code evidence
**Prior reference:** DEC-004, P10-DEC-01 from Phase 02

The file `.ai-context.json` (untracked, `?? .ai-context.json` in `git status`) is the CLI
**stamp file**, created by the `init` and `update` commands. Evidence:

- `scripts/lib/cli-operations.mjs` line 7: `export const STAMP_FILE = '.ai-context.json';`
- `writeStamp()` writes `{ frameworkVersion, schemaVersion }` to this path in the consumer repo root.
- `scripts/__tests__/ai-context-cli.test.mjs` asserts `init` creates `.ai-context.json` with the correct version stamp.
- The framework repo self-hosts (it is itself a consumer of the CLI). Running `ai-context init` on this repo produces `.ai-context.json`.
- Current content: `{"frameworkVersion": "0.1.0", "schemaVersion": "1.0.0"}` — matches `package.json`.

**Disposition:** **Should be tracked.** The stamp file documents the installed framework version; it is an intentional tracked artifact in consumer repos. There is no reason to gitignore it.

**Action:** Stage and commit `.ai-context.json`. Authorized per this review but requires a
human commit (outside review write authorization which is write-only).

---

### F-02 — `.github/prompts/ai-context-setup.prompt.md` Disposition (RESOLVED)

**Severity:** Informational — untracked directory/file, disposition resolved by code evidence

The directory `.github/prompts/` and file `.github/prompts/ai-context-setup.prompt.md`
are untracked (`?? .github/prompts/`). Evidence:

- `INIT_SEEDS` in `cli-operations.mjs`: `{ source: 'templates/setup-prompt.md.template', target: '.github/prompts/ai-context-setup.prompt.md' }` — `initCommand` copies the setup prompt template to `.github/prompts/`.
- The framework repo ran `ai-context init` against itself, creating this file.
- Confirmed same content as `templates/setup-prompt.md.template`.

**Disposition:** **Should be tracked.** `.github/prompts/ai-context-setup.prompt.md` is the
deployed, Copilot-usable artifact (appears in VS Code Copilot as `/ai-context-setup`).
`templates/setup-prompt.md.template` is the seeding source for consumers. Both should be
tracked; if they diverge, that's a drift concern.

**Note:** The `update` command does not manage `.github/prompts/ai-context-setup.prompt.md`
(it is seeded by `init` only, not listed in `MANAGED_FILE_MANIFEST`). This is intentional —
the prompt is copy-if-absent, consumer-customizable.

**Action:** Stage and commit `.github/prompts/ai-context-setup.prompt.md`. Requires human commit.

---

### F-03 — `docs/ngAIO-project-understanding.md` Disposition (DEFERRED — per Phase 02 P10-DEC-01)

**Severity:** Informational — untracked file, deferred to human decision
**Prior reference:** P10-DEC-01 from Phase 02

File is untracked (35.8 kB). `npm pack --dry-run` confirms it would be included in any
npm publish or as part of git install. Phase 02 deferred this to human review; task
constraints forbid moving or deleting it. Outstanding decision maintained (see Phase 10).

---

### F-04 — `registry.md` YYYY-MM-DD Adoption Date Placeholder (DEFERRED — per Phase 02 P10-DEC-02)

**Severity:** ⚠️ WARNING (reported by `validate:registry`)
**Prior reference:** P10-DEC-02 from Phase 02

The registry entry for `ai-context-framework` uses `YYYY-MM-DD` as the adoption date.
The validator emits a warning. This is a human judgment call — the team must decide when
the framework itself was formally "adopted." Outstanding decision maintained (see Phase 10).

---

### F-05 — Accidental npm Publish Surface (Informational — blocked by `"private": true`)

**Severity:** Medium (no immediate risk — `"private": true` prevents accidental publish)

`npm pack --dry-run` reveals 283 files (1.4 MB unpacked) that would be included if
`"private": true` were removed. Notable inclusions with distribution concerns:

| Path | Size | Concern |
|------|------|---------|
| `.squad/` (full tree) | ~250 kB | Team working state; not framework distribution content |
| `reviews/ip-readiness-review/` | ~100 kB | Internal IP review documents |
| `.ai/adr/*.md` | ~18 kB | Framework's own ADRs — intentional |
| `.copilot/mcp-config.json` | 223 B | Developer tooling config |
| `.mcp.json` | 232 B | Developer tooling config |
| `docs/ngAIO-project-understanding.md` | 35.8 kB | Untracked; unresolved disposition |

**Context from ADRs:** ADR-0003 (accepted) states git install is the current primary
distribution channel and npm publish is "deferred to the backlog." The `"private": true`
flag enforces this. No `.npmignore` exists.

**Git install behavior:** When installed via `npm i -g github:DevonAleshireMSFT/ai-context-framework`,
npm applies `.gitignore` rules (since no `.npmignore` exists). `.squad/log/`, `.squad/.scratch/`,
and other runtime-state paths are excluded by `.gitignore`. `.squad/agents/`, `.squad/templates/`,
`reviews/`, `.ai/`, and `docs/` are all included.

**Assessment:** For the current git-install distribution model, including `.squad/agents/` and
`.squad/templates/` is intentional (Squad companion content). Including `reviews/` is likely
unintentional. An `.npmignore` should be created before `"private": true` is removed or the
npm publish channel is activated. Recommend tracking this in Phase 10.

---

### F-06 — `.gitignore` Missing `*.tgz` Entry (FIXED)

**Severity:** Low — cosmetic hygiene

Running `npm pack` (without `--dry-run`) creates a `*.tgz` tarball at the repository root
(e.g., `devonaleshiremsft-ai-context-0.1.0.tgz`). No `.gitignore` entry covers `*.tgz`
files; such a tarball would appear as an untracked file.

**Fix applied:** Added `*.tgz` to `.gitignore` (see changes.md).

---

### F-07 — `package.json` Missing `"license"` Metadata Field (FIXED)

**Severity:** Low — cosmetic/metadata gap

`package.json` does not declare a `"license"` field. The `LICENSE` file is MIT and is
explicitly referenced in `README.md`. Adding `"license": "MIT"` to `package.json` aligns
npm metadata with the existing LICENSE file — consistent with accepted ADRs and no
documented functionality change.

**Fix applied:** Added `"license": "MIT"` to `package.json` (see changes.md).

---

### F-08 — CODEOWNERS Coverage Gap (Recommendation Only)

**Severity:** Low

`.github/CODEOWNERS` covers: `/org/`, `/registry.md`, `/templates/`, `/.ai/adr/`.
Not covered: `bin/`, `scripts/`, `docs/`, root files (`README.md`, `CONTRIBUTING.md`,
`package.json`, `LICENSE`, `.gitignore`, `.gitattributes`), `.github/workflows/`,
`.github/CODEOWNERS` itself.

The uncovered paths include the CLI binary, all scripts, and all documentation that were
rewritten in Phase 02. This means PRs modifying these paths have no required reviewer.

**Recommendation:** Extend CODEOWNERS — see recommendations.md R-02. Not implemented in
this phase (CODEOWNERS policy is a human organizational decision).

---

### F-09 — `reviews/` Directory in Distribution Surface (Recommendation Only)

**Severity:** Low (no current consumer impact — git install is primary channel)

The `reviews/ip-readiness-review/` directory (~40+ files, ~100 kB) is committed/tracked
and would be included in a git install. Consumers receive internal IP review artifacts
that are not part of the framework distribution.

**Recommendation:** Exclude `reviews/` from npm distribution via `.npmignore` (R-03).
Not implemented — requires coordination with ADR-0003 npm-publish activation.

---

### F-10 — Folder/Naming Consistency (Observation)

**Severity:** Informational — no action required

Repository folder structure is consistent with naming conventions:
- `bin/` — CLI entry points (kebab-case `.mjs` files)
- `scripts/` — tooling scripts with `__tests__/` and `lib/` sub-organization
- `templates/` — lowercase kebab-case `.md.template` and `.mjs` files
- `examples/` — one example (`azure-ai-search/`) with `README.md`
- `org/` — enterprise standards documents (kebab-case `.md`)
- `docs/` — documentation site (Jekyll, kebab-case `.md`)
- `.ai/` — framework context and ADRs
- `.github/` — GitHub-standard paths (workflows, agents, skills, prompts)
- `.squad/` — Squad AI team working state

No naming inconsistencies found. `docs/ngAIO-project-understanding.md` uses mixed case
but is untracked/deferred (F-03); not in scope.

---

### F-11 — `package.json` Missing `"description"` and `"repository"` Fields (Recommendation Only)

**Severity:** Low — cosmetic npm metadata

`package.json` has no `description`, `keywords`, `repository`, `homepage`, or `bugs` fields.
These improve `npm info` output and are standard practice. Not implemented — adding
`description` and `keywords` involves product naming decisions outside Phase 03 scope.

---

### F-12 — Workflow Coverage Is Appropriate (Observation)

**Severity:** Informational — no action required

`.github/workflows/` contains 7 workflows:
- `ai-context-conformance.yml` — PR conformance gating
- `ai-context-staleness.yml` — periodic staleness check
- `pages.yml` — GitHub Pages deployment
- `squad-heartbeat.yml`, `squad-issue-assign.yml`, `squad-triage.yml`, `sync-squad-labels.yml` — Squad CI

All are consistent with the framework's stated purpose and Squad-companion role. No orphaned
or redundant workflows detected.
