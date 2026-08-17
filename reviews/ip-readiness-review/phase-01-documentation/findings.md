# Phase 01 — Documentation Audit: Findings

**Phase Status:** In Progress → Complete
**Phase Lead:** Capablanca (Templates & Documentation)
**Started:** 2026-08-16T23:55:31-07:00
**Completed:** 2026-08-17 (this session)

---

## Purpose

Audit all human-readable documentation in the repository for accuracy, completeness, consistency, and IP readiness. Sources include README files, docs site pages, `org/` standards, templates, CONTRIBUTING, and GitHub-specific docs.

---

## Scope Covered

| Document / Path | Reviewed | Notes |
|-----------------|----------|-------|
| `README.md` | ✅ | Fully read |
| `docs/index.md` | ✅ | Fully read |
| `docs/getting-started.md` | ✅ | Fully read |
| `docs/architecture.md` | ✅ | Fully read — pre-existing dirty change at baseline |
| `docs/automation.md` | ✅ | Fully read |
| `docs/cli.md` | ✅ | Fully read |
| `docs/copilot-integration.md` | ✅ | Fully read |
| `docs/governance.md` | ✅ | Fully read |
| `docs/implementations.md` | ✅ | Fully read |
| `docs/rag-integration.md` | ✅ | Fully read |
| `docs/ngAIO-project-understanding.md` | ✅ | Partial read (untracked; first 120 lines) |
| `docs/_config.yml` | — | Not read; config file, not user-facing content |
| `docs/Gemfile` | — | Build config; not user-facing content |
| `org/standards.md` | ✅ | Fully read |
| `org/governance.md` | ✅ | Fully read |
| `org/glossary.md` | ✅ | Fully read |
| `org/platform.md` | — | Listed; not read in detail (no blocking signals from other docs) |
| `.ai/context.md` | ✅ | Fully read — pre-existing dirty change at baseline |
| `.ai/adr/0001-ai-squad-boundary.md` | ✅ | Fully read |
| `.ai/adr/0002-framework-distribution.md` | — | Sampled via ADR inventory |
| `.ai/adr/0003-git-install-primary-distribution.md` | ✅ | Fully read |
| `templates/setup-prompt.md.template` | ✅ | Fully read — pre-existing dirty change at baseline |
| `templates/context.md.template` | — | Not read; scope limited to product docs |
| `CONTRIBUTING.md` | ✅ | Fully read |
| `.github/PULL_REQUEST_TEMPLATE.md` | — | Pre-existing dirty change; reviewed only for consistency |
| `.github/copilot-instructions.md` | ✅ | Fully read — pre-existing dirty change at baseline |
| `registry.md` | ✅ | Fully read |
| `package.json` | ✅ | Fully read |
| `examples/azure-ai-search/README.md` | — | Not read in Phase 1; Phase 6 / DX scope |

---

## Validation Results

| Check | Command | Result |
|-------|---------|--------|
| AI context conformance | `node scripts/validate-ai-context.mjs` | ✅ 0 ERROR, 0 WARNING |
| Markdown link check | `node scripts/check-links.mjs` | ✅ 17 files, 85 links, 0 warnings, 0 errors |

---

## Findings

### F-01 — `registry.md` adoption date placeholder (Medium)

**Category:** Completeness gap / accuracy
**Severity:** Medium
**Evidence:** `registry.md` table row for `ai-context-framework` shows `YYYY-MM-DD` as adoption date.
**`.ai/context.md` also notes:** `⏳ registry.md still carries a YYYY-MM-DD adoption date for this repo`
**Impact:** Minor IP hygiene gap — the framework's own registry is incomplete; signals the repo is not fully self-governed.
**Action:** Replace `YYYY-MM-DD` with the actual adoption date. Earliest reliable anchor is ADR-0001 (2026-07-25). Requires product owner confirmation of the actual intended adoption date before applying. **Deferred to human decision — recorded in decision-inventory.md.**

---

### F-02 — nav_order conflict in Jekyll site: `docs/cli.md` and `docs/rag-integration.md` both use `nav_order: 8` (Low)

**Category:** Consistency issue
**Severity:** Low
**Evidence:**
- `docs/cli.md` front matter: `nav_order: 8`
- `docs/rag-integration.md` front matter: `nav_order: 8`

**Impact:** Duplicate nav_order values in Just the Docs / Jekyll cause non-deterministic ordering of these two pages in site navigation. Visitor experience is unpredictable; one page may shadow the other.
**Action:** Change `docs/rag-integration.md` `nav_order` from `8` to `9`. The existing sequence is 1–7 (index through automation), then CLI at 8; RAG Integration is logically appended. **Safe correction — applied in Phase 1.**

---

### F-03 — `docs/automation.md` cites superseded ADR-0002 as authority for versioning scheme without noting supersession (Low)

**Category:** Consistency issue / stale reference
**Severity:** Low
**Evidence:** `docs/automation.md`, Versioning & Drift Detection section:
> "The framework uses two versions, following [ADR-0002](...)"

ADR-0002 is superseded by ADR-0003 (accepted 2026-08-12). The versioning scheme (FRAMEWORK_VERSION + SCHEMA_VERSION) is a carry-forward provision from ADR-0002 that explicitly survives supersession, per both ADR-0002 body and ADR-0003 body. However, citing a superseded ADR as the governing document without a supersession note is misleading for new adopters.
**Action:** Update the prose to note ADR-0002 is superseded by ADR-0003, and that the versioning scheme carries forward. Link to ADR-0003 for the current distribution decision. **Safe correction — applied in Phase 1.**

---

### F-04 — `docs/getting-started.md` references only superseded ADR-0002 in the "Updating the framework" section (Low)

**Category:** Stale reference
**Severity:** Low
**Evidence:** `docs/getting-started.md`, "Updating the framework" section:
> "See the [CLI reference](cli) and [ADR-0002](...)"

This reference should include ADR-0003 as the current accepted ADR for distribution, or replace the ADR-0002 link with ADR-0003.
**Action:** Replace the ADR-0002 reference with ADR-0003 in this context. The update command is governed by the current distribution channel (ADR-0003), not ADR-0002. **Safe correction — applied in Phase 1.**

---

### F-05 — `docs/ngAIO-project-understanding.md` is an untracked file in the published `docs/` directory with no Jekyll front matter (Medium)

**Category:** Completeness gap / IP hygiene
**Severity:** Medium
**Evidence:**
- File is untracked (`git status` baseline), pre-existing before this review
- File is in `docs/` which is the GitHub Pages publish root
- File has no Jekyll YAML front matter (first line is `# ngAIO Project...`)
- `check-links.mjs` scans and checks it (1 link) — so it is live in the link-check scope
- Content is an internal "Project Understanding & Readiness Assessment" document (analogous to this IP review; covers framework scope, evidence, and limitations)
- Audience appears to be internal review / IP submission prep, not public adopters

**Impact:**
- Without front matter, Jekyll/Just-the-Docs may or may not include it in the published site. It is not linked from site navigation, but is discoverable via the published URL.
- The document contains candid internal assessment language (limitations, gaps, "not yet demonstrated") that may not be appropriate for a public documentation site in its current form.
- Being untracked means it is not under source control for this branch.

**Action:** This requires human decision: (a) move/rename out of `docs/` if it is internal only, (b) add front matter and link it if it is intentionally public, or (c) `.gitignore` it if it should remain a local working file. **Deferred to human decision — recorded in decision-inventory.md.** No Phase 1 safe correction applicable.

---

### F-06 — `.ai/context.md` carries 8 `<!-- PROPOSED: confirm -->` annotations on Key Rules and Known Gotchas (High — human decision required)

**Category:** Completeness / IP hygiene
**Severity:** High
**Evidence:** `.ai/context.md`, Key Rules section (4 items marked) and Known Gotchas section (5 items marked). These were placed by the AI Setup Assistant per the setup-prompt.md.template design: inferred rules/gotchas are marked `PROPOSED` until the product owner confirms them.
**Impact:** High IP risk — if these rules are unconfirmed, the AI context file's Key Rules and Known Gotchas sections are partially unverified. Any AI assistant reading this file will treat them as proposed, not confirmed rules. For IP submission, unresolved `PROPOSED` annotations signal incompleteness in the core product context.
**Action:** Product owner (Devon Aleshire) must review and confirm or amend each `PROPOSED` annotation. This is a human decision — each item requires intent confirmation. **Deferred to human decision — recorded in decision-inventory.md.** Phase 2 should resolve these with owner input.

---

### F-07 — Pre-existing dirty change: `docs/architecture.md` (Note — content reviewed, consistent)

**Category:** Note
**Severity:** None (observation)
**Evidence:** `docs/architecture.md` was pre-existing modified at baseline. Content reviewed in Phase 1: the document is fully consistent with ADR-0001, ADR-0003, and `.ai/context.md`. The `.ai/` vs `.squad/` boundary table and three-tier model are accurate. No contradictions found.
**Action:** No action required. Record as reviewed.

---

### F-08 — Pre-existing dirty change: `templates/setup-prompt.md.template` (Note — content reviewed, consistent)

**Category:** Note
**Severity:** None (observation)
**Evidence:** `templates/setup-prompt.md.template` was pre-existing modified at baseline. Content reviewed in Phase 1: the template accurately describes the AI Setup Assistant behavior, boundary rules, and Squad detection logic. All references to git-install commands are consistent with ADR-0003. `PROPOSED: confirm` marker instructions align with `.ai/context.md` design.
**Action:** No action required. Record as reviewed.

---

### F-09 — Pre-existing dirty change: `.github/copilot-instructions.md` (Note — content reviewed, consistent)

**Category:** Note
**Severity:** None (observation)
**Evidence:** `.github/copilot-instructions.md` was pre-existing modified at baseline. Content reviewed: Squad instructions precede the managed block; managed block is accurate and consistent with `templates/copilot-instructions.md.template`. Squad/product-ADR boundary statement is correct.
**Action:** No action required. Record as reviewed.

---

### F-10 — `docs/governance.md` references `org/governance.md` via absolute URL but `CONTRIBUTING.md` uses relative path (Note — minor inconsistency, no broken links)

**Category:** Style consistency
**Severity:** Info only
**Evidence:** `docs/governance.md` links to `org/governance.md` via absolute GitHub URL (correct — cross-publish-root from docs/ must use absolute URL per Known Gotchas). `CONTRIBUTING.md` uses relative path `org/governance.md` (correct — CONTRIBUTING.md is at repo root, not in docs/). Both are correct for their respective contexts.
**Action:** No action required. Documented for completeness.

---

## Summary

| Finding | Category | Severity | Phase 1 Action |
|---------|----------|----------|----------------|
| F-01: registry.md adoption date placeholder | Completeness | Medium | Deferred — needs owner confirmation |
| F-02: nav_order conflict (cli.md / rag-integration.md) | Consistency | Low | ✅ Applied |
| F-03: automation.md cites superseded ADR-0002 | Stale reference | Low | ✅ Applied |
| F-04: getting-started.md references ADR-0002 for update | Stale reference | Low | ✅ Applied |
| F-05: ngAIO doc untracked in docs/, no front matter | IP hygiene | Medium | Deferred — needs owner decision |
| F-06: `.ai/context.md` PROPOSED annotations unconfirmed | IP hygiene | High | Deferred — needs owner confirmation |
| F-07: docs/architecture.md dirty change (reviewed) | Note | None | No action |
| F-08: templates/setup-prompt dirty change (reviewed) | Note | None | No action |
| F-09: copilot-instructions dirty change (reviewed) | Note | None | No action |
| F-10: link style consistency note | Style | Info | No action |

**Total findings:** 10
**Applied corrections:** 3 (F-02, F-03, F-04)
**Deferred to human decision:** 3 (F-01, F-05, F-06)
**Notes / No action:** 4 (F-07, F-08, F-09, F-10)
