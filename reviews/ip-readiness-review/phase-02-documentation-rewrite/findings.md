# Phase 02 — Documentation Rewrite: Findings

**Phase Status:** Complete
**Phase Lead:** Capablanca (Templates & Documentation)
**Started:** 2026-08-17
**Completed:** 2026-08-17

---

## Purpose

Define audiences, duplication problems, discoverability issues, quick-start/extensibility/security/architecture/onboarding gaps, and exact planned rewrites. Verify PROPOSED annotations. Apply evidence-based focused rewrites.

---

## Evidence Sources

- Phase 01 findings.md, remediation-plan.md, changes.md
- All docs site pages (`docs/**`), README.md, CONTRIBUTING.md, org/, templates/
- `.ai/context.md`, `.ai/adr/0001`–`0003`
- Source: `bin/ai-context.mjs`, `scripts/lib/frontmatter.mjs`, `scripts/validate-ai-context.mjs`, `package.json`
- Existing ngAIO assessment (`docs/ngAIO-project-understanding.md`, untracked)
- Baseline inventory: `artifacts/document-inventory.md`, `artifacts/decision-inventory.md`

---

## Audience Analysis

| Audience | Primary entry point | Key needs |
|----------|--------------------|-----------|
| **Solo developer / new adopter** | README → `docs/getting-started.md` | Quick install command, what files are created, how to fill in `context.md` |
| **Team lead / enterprise evaluator** | docs site home → architecture → governance | Architecture clarity, governance model, enterprise-readiness signals |
| **IP reviewer** | README, `.ai/context.md`, ADRs | Complete, unambiguous rules (no PROPOSED), confirmed constraints, clear IP boundaries |
| **Contributor / maintainer** | CONTRIBUTING.md | Local dev setup, test/validate commands, PR process |
| **Framework integrator** | `docs/automation.md`, `docs/cli.md` | Managed manifest, CLI flags, CI workflow setup |

---

## Duplication Assessment

| Duplication | Documents involved | Assessment |
|-------------|-------------------|------------|
| Quick-start steps | README.md "Minimum Viable Setup" ↔ `docs/getting-started.md` | Acceptable — README is the GitHub entry point, docs site is the published reference. README should remain self-contained. No rewrite needed. |
| `.ai/` vs `.squad/` boundary table | README, `docs/index.md`, `docs/architecture.md` | Acceptable — each context has a distinct audience. Tables differ in depth. No rewrite needed. |
| Copilot instructions setup | README "GitHub Copilot Integration" ↔ `docs/copilot-integration.md` | Acceptable — README gives a summary; the dedicated page goes deeper. No rewrite needed. |
| Governance model | `docs/governance.md` ↔ `org/governance.md` | Acceptable — `docs/governance.md` is the published adopter guide; `org/governance.md` is the Tier-1 enterprise standard. Content is complementary, not duplicate. No rewrite needed. |

---

## Discoverability Issues

| Issue | Severity | Planned action |
|-------|----------|----------------|
| `docs/index.md` "Ready to Start?" button links to getting-started but shows no install command on home page | Low | Add one-line install command to the CTA section |
| `docs/architecture.md` managed-block section does not cross-link to `docs/copilot-integration.md` | Low | Add inline cross-link |
| `CONTRIBUTING.md` has no local dev/validate instructions — contributors must infer from `package.json` | Medium | Add "Local Validation" step to "Before You Start" |

---

## Quick-Start / Onboarding Gap

The minimum viable path (README → `docs/getting-started.md`) is clear and well-structured. The AI Setup Assistant section is present. The CLI install command is prominent. **No structural gap** in the primary onboarding path.

Minor gap: `CONTRIBUTING.md` — new contributors cannot discover test commands without reading `package.json`. Addressed in F-P2-02 below.

---

## Extensibility Guidance

`docs/architecture.md` "Extensibility: Extension Points and Boundaries" section is comprehensive. It covers what adopters own, what `ai-context update` refreshes, CLI extension limits, and the invariant table. **No gap.**

---

## Security Guidance

"What Never Belongs in AI Context" appears in README, `docs/governance.md`, and `org/standards.md`. The `.ai/security.md` template is listed as optional with a clear use case. **No gap.**

---

## Architecture Explanation

`docs/architecture.md` is well-structured: core principle, `.ai/`/`.squad/` boundary, two-axes model, three-tier model, Tier 3 contract, extensibility, multi-repo federation, `context.md` bootstrap, ADR conventions. **No structural gap.** Minor cross-link gap in managed-block section (F-P2-04 below).

---

## Findings

### F-P2-01 — 7 `<!-- PROPOSED: confirm -->` annotations in `.ai/context.md` confirmed and removed (High → Resolved)

**Category:** IP hygiene / accuracy
**Severity:** High (before confirmation)
**Evidence and confirmation per annotation:**

| # | Location | Rule | Evidence | Decision |
|---|----------|------|----------|----------|
| 1 | Key Rules | Framework tooling stays dependency-free; `bin/` and `scripts/` use only Node built-ins on Node >= 18; tests run with `node --test` | `package.json`: no `dependencies` or `devDependencies`; `"test": "node --test"`; `bin/ai-context.mjs` imports only `node:path` and `node:url`; `scripts/lib/*.mjs` uses only built-ins | **Confirmed — objectively implemented** |
| 2 | Key Rules | Squad is detected, never installed; framework tooling and prompts must not create, remove, or rewrite Squad-owned files | ADR-0001 (accepted 2026-07-25) governs this boundary explicitly; CLI init/update preserve Squad-owned files; detection is read-only (checks for `.squad/team.md` or `.github/agents/squad.agent.md`) | **Confirmed — governed by accepted ADR-0001; implemented** |
| 3 | Known Gotchas | `ai-context update` rewrites every file in the managed manifest and the delimited block in `.github/copilot-instructions.md` from packaged templates | ADR-0003 (accepted 2026-08-12): "safe-merge update semantics … remain in force"; `docs/cli.md` documents the managed-file manifest and the Copilot instructions merge behavior explicitly | **Confirmed — governed by accepted ADR-0003; implemented** |
| 4 | Known Gotchas | ADR front matter `adr:` must be an unquoted four-digit number — the conformance parser does not strip quotes | `scripts/lib/frontmatter.mjs` is a custom line-by-line parser (not YAML): `value = line.slice(separatorIndex + 1).trim()`. A quoted value like `adr: "0001"` yields `data.adr = '"0001"'`, which fails the regex `/^\d{4}$/` in `validate-ai-context.mjs` line 160. The parser deliberately does not strip YAML string-quote characters. | **Confirmed — objectively implemented** |
| 5 | Known Gotchas | `docs/` is the GitHub Pages publish root; relative links from `docs/**` that resolve outside `docs/` fail `check-links.mjs` | `docs/automation.md`: "For repositories with a Jekyll site at `docs/_config.yml`, `check-links.mjs` treats `docs/` as the GitHub Pages publish root." Confirmed by `check-links.mjs` source behavior and validation results. | **Confirmed — objectively implemented** |
| 6 | Known Gotchas | `check-links.mjs` does not scan `.ai/**`, so links in this file are not covered by CI | `docs/automation.md` validator table: scope is `docs/**/*.md`, `org/*.md`, `registry.md`, `CONTRIBUTING.md`, and `README.md` — no `.ai/**` listed | **Confirmed — objectively implemented** |
| 7 | Known Gotchas | Tier-3 personal context is the sibling `.ai_local/`, never `.ai/local/`; nesting would pull personal notes into every `.ai/**` glob | All docs, CLI `init`, `.gitignore` entry, `docs/architecture.md` "Tier 3" section consistently use `.ai_local/`; the `.github/workflows/ai-context-conformance.yml` path filter covers `.ai/` without `.ai_local/` | **Confirmed — objectively implemented** |

**Action:** All 7 annotations removed in Phase 2. No annotation was a true unresolved product choice — each is objectively implemented and/or governed by an accepted ADR.

---

### F-P2-02 — `CONTRIBUTING.md` missing local validation and test instructions (Medium → Applied)

**Category:** Onboarding gap
**Severity:** Medium
**Evidence:** `CONTRIBUTING.md` "Before You Start" section lists 3 steps (check issues, open issue for significant changes, be conservative with templates) but has no mention of local test/validate commands. Contributors and IP reviewers must read `package.json` to discover `node --test`, `npm run validate`, and `npm run check:links`. The validation suite is a key IP readiness signal.
**Action:** Add a "Local validation before opening a PR" step under "Before You Start."

---

### F-P2-03 — `docs/index.md` "Ready to Start?" CTA lacks install command (Low → Applied)

**Category:** Discoverability / evaluator quick-start
**Severity:** Low
**Evidence:** `docs/index.md` ends with a `[Get Started →]` button but no install command appears on the home page itself. An evaluator viewing the docs site sees the value proposition but must navigate to a second page to find the first command. One visible install line on the home page reduces friction for evaluators.
**Action:** Add the install command (one code block) to the "Ready to Start?" CTA section.

---

### F-P2-04 — `docs/architecture.md` managed-block section missing cross-link to Copilot Integration (Low → Applied)

**Category:** Cross-link / discoverability
**Severity:** Low
**Evidence:** The "What adopters own and can extend" section under Extensibility describes the `.github/copilot-instructions.md` managed-block boundary in detail but does not reference the `docs/copilot-integration.md` page where the full setup and behavior are documented.
**Action:** Add an inline cross-link from the managed-block description to the [Copilot Integration](copilot-integration) page.

---

### F-P2-05 — `docs/ngAIO-project-understanding.md` disposition remains outstanding (Medium — no change)

**Category:** IP hygiene (deferred)
**Severity:** Medium
**Evidence:** File is untracked, has no Jekyll front matter, is not in site navigation, and contains internal assessment language. Phase 1 flagged as F-05 (DEC-005 in decision-inventory.md).
**Action per task instructions:** Do not relocate or delete. Published navigation does not expose it accidentally (no front matter = Jekyll does not add it to nav; it is not linked from any nav page). Record as outstanding Phase 10 decision. No Phase 2 change applied. See Phase 10 outstanding decision below.

---

## Phase 10 Outstanding Decisions

The following decisions cannot be resolved without product owner input and must be surfaced in Phase 10:

| ID | Decision | Evidence | Impact |
|----|----------|----------|--------|
| P10-DEC-01 (was DEC-005) | Disposition of `docs/ngAIO-project-understanding.md` (untracked, no front matter, internal assessment content, in published docs/ root) | Phase 1 F-05; task instruction to not move/delete | Published URL is reachable directly even without nav; file is not under source control; internal assessment language is public-facing if URL is discovered |
| P10-DEC-02 (was DEC-001 / DEC-002) | `registry.md` adoption date placeholder `YYYY-MM-DD` | Phase 1 F-01 | Minor IP hygiene gap; earliest anchor is ADR-0001 2026-07-25 |

---

## Summary

| Finding | Severity | Status |
|---------|----------|--------|
| F-P2-01: 7 PROPOSED annotations — all confirmed | High → Resolved | ✅ Applied (annotations removed) |
| F-P2-02: CONTRIBUTING.md missing local validation | Medium | ✅ Applied |
| F-P2-03: docs/index.md CTA missing install command | Low | ✅ Applied |
| F-P2-04: docs/architecture.md missing cross-link | Low | ✅ Applied |
| F-P2-05: ngAIO disposition outstanding | Medium | Deferred — Phase 10 |
