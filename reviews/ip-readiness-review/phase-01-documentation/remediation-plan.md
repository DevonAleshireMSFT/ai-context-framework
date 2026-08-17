# Phase 01 — Documentation Audit: Remediation Plan

**Phase Status:** Complete
**Depends on:** findings.md
**Completed:** 2026-08-17

---

## Purpose

Translate findings from the documentation audit into a prioritized remediation plan with ownership, effort estimates, and phase assignments.

---

## Remediation Plan

| ID | Finding | Description | Priority | Disposition | Phase |
|----|---------|-------------|----------|-------------|-------|
| REM-01-01 | F-02 | Fix nav_order conflict: `docs/rag-integration.md` from `8` to `9` | Low | ✅ Applied Phase 1 | Phase 01 |
| REM-01-02 | F-03 | Add supersession note to `docs/automation.md` Versioning section (ADR-0002 → ADR-0003) | Low | ✅ Applied Phase 1 | Phase 01 |
| REM-01-03 | F-04 | Replace ADR-0002 ref with ADR-0003 in `docs/getting-started.md` "Updating the framework" | Low | ✅ Applied Phase 1 | Phase 01 |
| REM-01-04 | F-01 | Replace `YYYY-MM-DD` placeholder in `registry.md` with actual adoption date | Medium | Deferred — requires owner confirmation of date | Human decision |
| REM-01-05 | F-05 | Resolve status of `docs/ngAIO-project-understanding.md` (untracked; in published docs/; no front matter) | Medium | Deferred — requires owner decision: keep public, move, or gitignore | Human decision |
| REM-01-06 | F-06 | Confirm or amend all 8 `<!-- PROPOSED: confirm -->` annotations in `.ai/context.md` | High | Deferred — requires product owner (Devon Aleshire) confirmation | Phase 02 / Owner |

---

## Deferred Decision Summary

Three items require human decision before Phase 1 corrections can be completed. These are tracked in `artifacts/decision-inventory.md`.

| Decision | Owner | Blocker for |
|----------|-------|-------------|
| registry.md adoption date for this repo | Devon Aleshire | REM-01-04 |
| ngAIO doc disposition (public/private/gitignore) | Devon Aleshire | REM-01-05 |
| Confirm PROPOSED annotations in `.ai/context.md` | Devon Aleshire | REM-01-06 |

---

## Phase 2 Handoff

Phase 2 (Documentation Rewrite) should pick up:
- REM-01-06: PROPOSED annotation resolution requires product owner input before rewriting context.md
- Any broader rewrite needs should wait on F-06 resolution to avoid rewriting unconfirmed content

Phase 3 (Repository Hygiene) should pick up:
- REM-01-05: ngAIO file disposition (tracked vs untracked, docs/ vs gitignore)
