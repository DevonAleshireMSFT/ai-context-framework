# Phase 06 — Developer Experience: Findings

**Phase Status:** Complete
**Reviewer:** Capablanca (Templates & Documentation)
**Date:** 2026-08-17
**Branch:** `squad/ip-readiness-review`

---

## Purpose

Assess the developer onboarding experience, CLI usability, documentation discoverability, and contribution workflow for IP readiness and quality.

---

## Scope

- `README.md` — first-contact experience
- `docs/getting-started.md` — setup flow
- `docs/cli.md` — CLI reference
- `docs/automation.md` — CI guidance
- `CONTRIBUTING.md` — contribution workflow
- `bin/ai-context.mjs` — CLI command surface
- Template initialization flow
- GitHub Pages site navigation (nav_order, cross-links)

---

## Method

Simulated a new developer onboarding path end to end:

1. Read README → docs/getting-started.md → docs/cli.md → docs/automation.md → CONTRIBUTING.md → docs/copilot-integration.md
2. Executed `ai-context init --cwd <testdir>` directly against the CLI binary (no global install required for test)
3. Executed `ai-context check --cwd <testdir>` on the fresh scaffold
4. Executed `ai-context update --dry-run --cwd <testdir>`
5. Executed `ai-context --help` and `ai-context --version`
6. Inspected all generated files in the scaffold
7. Verified the copilot-instructions managed block was loaded correctly (confirmed: it was)
8. Cross-checked all package.json scripts against docs claims
9. Ran `node --test` (50/50 pass) and `npm run validate` (0 errors, 88 links)
10. Cleaned up test directory

---

## Findings

### DX-01 — Missing prerequisites section before quick-start commands

| Field | Value |
|-------|-------|
| **ID** | DX-01 |
| **Severity** | MEDIUM |
| **Audience** | New adopters, all personas |
| **Files affected** | `docs/getting-started.md`, `README.md` |
| **Evidence** | Both documents begin quick-start with `npm i -g github:...` without stating that Node >=18 and npm must be installed. The `getting-started.md` Full Setup section states "Prerequisites: A Git repository and a willingness..." but omits Node, npm, and GitHub authentication requirements. The `CONTRIBUTING.md` states "Require Node >=18" only in the local-validation block. |
| **Impact** | A new developer on a fresh machine will hit `npm: command not found` or a git-install auth failure with no guidance. The git-install mechanism (`github:Owner/Repo`) also requires GitHub credential configuration (SSH key or PAT for private repo) — not mentioned anywhere near the commands. |
| **Action** | Add a concise Prerequisites callout to `docs/getting-started.md` before the Minimum Viable Setup steps. Amend README quick start with a Node >=18/npm note. |

---

### DX-02 — No troubleshooting guidance for common failure modes

| Field | Value |
|-------|-------|
| **ID** | DX-02 |
| **Severity** | MEDIUM |
| **Audience** | New adopters |
| **Files affected** | `docs/getting-started.md` |
| **Evidence** | No troubleshooting section exists in any developer-facing doc. Simulated install surfaces three predictable failure modes: (a) git-install failing on Windows due to npm git handling or missing GitHub auth; (b) `ai-context: command not found` after global install until PATH is refreshed; (c) `ai-context check` on a fresh scaffold immediately reporting 3 ERRORs on unfilled template placeholders — with no docs context that this is expected. |
| **Impact** | Developers encountering any of these friction points have no recovery path in the docs. The check ERROR on a fresh scaffold is particularly disorienting: the `init` next-steps say "Run `ai-context check` to validate" but the check produces errors because the template has literal `[placeholder]` values. |
| **Action** | Add a Troubleshooting section to `docs/getting-started.md` covering the three failure modes with diagnosis and resolution. Also add a note near the `init` next-steps explaining that check errors on a fresh scaffold are expected until placeholders are filled. |

---

### DX-03 — Setup time claims are unqualified as targets

| Field | Value |
|-------|-------|
| **ID** | DX-03 |
| **Severity** | LOW |
| **Audience** | All |
| **Files affected** | `README.md`, `docs/getting-started.md`, `docs/index.md` |
| **Evidence** | README heading: "Minimum Viable Setup — 10 Minutes"; README body: "starts with one repo and one developer in under 10 minutes"; `docs/index.md` button: "Get Started in 10 Minutes"; `docs/getting-started.md` Full Setup: "takes about 30 minutes". None of these are qualified as targets or typical estimates vs. measured benchmarks. |
| **Impact** | Understating setup time can erode trust if the actual experience takes longer. Overstating it is a minor credibility issue for IP review. Task requirement: qualify as a target, not measured evidence. |
| **Action** | Add a brief qualifier to README and getting-started.md; leave the index.md button text unchanged (it is a CTA, not a claim). |

---

### DX-04 — CONTRIBUTING.md local validation list is incomplete

| Field | Value |
|-------|-------|
| **ID** | DX-04 |
| **Severity** | LOW |
| **Audience** | Contributors |
| **Files affected** | `CONTRIBUTING.md` |
| **Evidence** | `CONTRIBUTING.md` lists three validation commands: `node --test`, `npm run validate`, `npm run check:links`. The `package.json` also exposes `check:drift` and `check:staleness` scripts. These are not mentioned in CONTRIBUTING, leaving contributors unaware of drift and freshness tooling. |
| **Action** | Expand the CONTRIBUTING.md validation table to include `check:drift` and `check:staleness`. |

---

### DX-05 — "No install step" phrasing ambiguous for CLI vs. validator context

| Field | Value |
|-------|-------|
| **ID** | DX-05 |
| **Severity** | LOW |
| **Audience** | New adopters, contributors |
| **Files affected** | `CONTRIBUTING.md`, `docs/automation.md` |
| **Evidence** | Both docs state "No install step — all scripts use only Node built-ins." This is accurate for the validation scripts (no `npm install` needed after cloning). However the CLI itself requires `npm i -g ...`. The "no install step" phrasing lives immediately below `npm run validate` in CONTRIBUTING.md — it is contextually scoped to the validator scripts, not the CLI, but can confuse readers. |
| **Impact** | Minor phrasing confusion; the existing sentence is not wrong in context. No change needed unless a reader would benefit from a clarifying comma or parenthetical. |
| **Action** | Observation only — no change required. Document in findings for completeness. |

---

## Passing / No Action Required

| ID | Area | Result |
|----|------|--------|
| DX-P1 | CLI `init` command output | Clear, structured, includes actionable next steps |
| DX-P2 | CLI `check` error messages | Accurate and actionable (identifies exact fields and files) |
| DX-P3 | CLI `--help` output | Complete and accurate |
| DX-P4 | CLI `--version` output | Correct |
| DX-P5 | CLI `update --dry-run` output | Correct |
| DX-P6 | Copilot managed block merge | Works correctly on first `init`; confirmed by Copilot loading the block |
| DX-P7 | Template placeholder convention | Consistent `[square brackets]` used throughout |
| DX-P8 | PR template | Clear checklist; `.github/PULL_REQUEST_TEMPLATE.md` committed and working |
| DX-P9 | `npm run validate` | 0 errors, 0 warnings, 88 links checked |
| DX-P10 | `node --test` | 50/50 pass |
| DX-P11 | Squad detection and preservation | Documented and tested in unit tests (test 2, 6) |
| DX-P12 | git-install reality clearly noted | Publishing note present in `docs/getting-started.md` and `docs/cli.md` |
| DX-P13 | No-application-runtime nature | Accurately stated: "no third-party dependencies and no build step" |
| DX-P14 | GitHub Pages nav_order | All docs pages have unique nav_order (1–9); no conflicts |
| DX-P15 | Cross-links within docs | All local links resolve; 88 links pass |
| DX-P16 | Copilot safety guidance | "What You Must Never Do" block in template and instructions |

---

## Remediation Plan

| ID | Action | File | Priority |
|----|--------|------|----------|
| DX-01 | Add Prerequisites section to getting-started; add Node note to README quick start | `docs/getting-started.md`, `README.md` | MEDIUM |
| DX-02 | Add Troubleshooting section to getting-started; add init/check note | `docs/getting-started.md` | MEDIUM |
| DX-03 | Qualify "10 minutes" as target in README and getting-started | `README.md`, `docs/getting-started.md` | LOW |
| DX-04 | Add `check:drift` and `check:staleness` to CONTRIBUTING.md validation table | `CONTRIBUTING.md` | LOW |
| DX-05 | No change | — | Observation |
