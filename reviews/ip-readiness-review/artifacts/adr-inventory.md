# ADR Inventory

**Generated:** 2026-08-16
**Source:** `.ai/adr/` directory
**ADR count:** 3

---

## ADR-0001: The .ai/ and .squad/ Boundary

| Field | Value |
|-------|-------|
| File | `.ai/adr/0001-ai-squad-boundary.md` |
| Status | **accepted** |
| Date | 2026-07-25 |
| Deciders | Devon Aleshire (PM), Carlsen (Architect) |
| Reviewers | Kasparov (Standards), Fact Checker |
| Applies to | ai-context-framework and adopter repos using Squad |
| Supersedes | — |
| Superseded by | — |

**Summary:** Establishes that `.ai/` holds durable product knowledge (WHAT and WHY) and `.squad/` holds AI-team working state (HOW, routing, logs). Product architecture decisions live as ADRs under `.ai/adr/`. `.squad/decisions.md` must link to product ADRs and must not restate them. The two surfaces are complementary; `.ai/` must work without Squad.

**Impact:**
- Governs all AI context file placement decisions in the framework and in adopter repos.
- Adopters using Squad must follow the same boundary.
- Changes to either surface's scope require a new ADR.

**Documentation consistency:**
- `.ai/context.md` accurately references this ADR and its consequences.
- `README.md` has a dedicated `.ai/ vs .squad/` boundary table — consistent.
- `docs/architecture.md` covers tier model; ADR-0001 is complementary — no known conflict (note: pre-existing dirty change; verify in Phase 01/04).

**Implementation consistency:**
- The boundary is implemented: `.ai/` contains only product context and ADRs; `.squad/` contains team state.
- `.squad/decisions.md` links rather than restates — consistent with ADR.

## Phase 1 Results

**Completed:** 2026-08-17
**Auditor:** Capablanca

| ADR | Phase 1 finding | Action |
|-----|-----------------|--------|
| ADR-0001 | Accurate and consistent in all docs. No contradictions found. | None |
| ADR-0002 | `docs/automation.md` cited ADR-0002 as governing without noting supersession. `docs/getting-started.md` linked only ADR-0002 for update guidance. | Both corrected (CH-02, CH-03) |
| ADR-0003 | All primary install/update instructions use git install per ADR-0003. Consistent across README, getting-started, cli, automation. | None |

---

## Recommended action: No action required. Verify `docs/architecture.md` dirty change does not conflict in Phase 04.

---

## ADR-0002: Framework Distribution through npm CLI with Enterprise Fallback

| Field | Value |
|-------|-------|
| File | `.ai/adr/0002-framework-distribution.md` |
| Status | **superseded** |
| Date | 2026-07-26 |
| Deciders | Carlsen (Framework Architect) |
| Reviewers | Polgar (QA) |
| Applies to | scripts, templates, package.json, consumer repos |
| Supersedes | — |
| Superseded by | `0003-git-install-primary-distribution.md` |

**Summary:** Originally decided to distribute the CLI primarily as a scoped npm package (`@devonaleshiremsft/ai-context`). The npm-primary channel was never published. The subcommand surface (`init`/`update`/`check`), safe-merge update semantics, and `.ai/**` write protections defined here **remain in force** despite supersession.

**Impact:**
- The npm feed and tarball paths are deferred to backlog.
- The CLI subcommand surface and zero-runtime-dependency posture carry forward through ADR-0003.

**Documentation consistency:**
- ADR body contains a supersession notice pointing to ADR-0003.
- `package.json` still has `"name": "@devonaleshiremsft/ai-context"` and `"private": true` — consistent with deferred npm publish.

**Implementation consistency:**
- npm package is not published — consistent with superseded status.
- Subcommand surface and zero-dep posture are implemented — consistent with carry-forward provisions.

**Recommended action:** Verify during Phase 04 that no documentation still presents npm install as the primary path. The `docs/` dirty state for `docs/architecture.md` (pre-existing) may be relevant.

---

## ADR-0003: Git Install is the Current Primary Distribution Channel

| Field | Value |
|-------|-------|
| File | `.ai/adr/0003-git-install-primary-distribution.md` |
| Status | **accepted** |
| Date | 2026-08-12 |
| Deciders | Devon Aleshire (PM), Carlsen (Framework Architect) |
| Reviewers | Capablanca (Docs), Polgar (QA) |
| Applies to | README.md, docs/getting-started.md, docs/cli.md, docs/automation.md, consumer repos |
| Supersedes | `0002-framework-distribution.md` |
| Superseded by | — |

**Summary:** Git install (`npm i -g github:DevonAleshireMSFT/ai-context-framework` or `npx github:...`) is the current primary distribution channel. npm feed publish and tarball packaging are deferred to backlog. The `init`/`update`/`check` subcommand surface, zero-runtime-dependency, ESM, Node >=18 posture are unchanged from ADR-0002.

**Impact:**
- All consumer-facing documentation must present git install as the primary path.
- npm publish workflow should not exist or should be clearly deferred.
- `package.json` stays `private: true`.

**Documentation consistency:**
- `README.md` presents git install — appears consistent (verify exact command in Phase 01).
- `docs/getting-started.md` — requires Phase 01 verification.
- `docs/cli.md` — requires Phase 01 verification.
- `docs/automation.md` — requires Phase 01 verification.

**Implementation consistency:**
- `package.json` has `"private": true` — consistent.
- No npm publish workflow found in `.github/workflows/` — consistent.

**Recommended action:** Phase 01 should audit all `applies-to` docs to confirm they present git install as primary. Note: `registry.md` still has `YYYY-MM-DD` placeholder for this repo — unrelated but flagged.

---

## Gap Analysis

| Gap | Severity | Notes |
|-----|----------|-------|
| `registry.md` adoption date placeholder (`YYYY-MM-DD`) for this repo | Low | Not ADR-related but noted here for Phase 03 |
| `.ai/context.md` has multiple `PROPOSED: confirm` annotations | Medium | Several key rules are marked proposed — require confirmation before IP submission. Phase 01 action. |
| `docs/architecture.md` pre-existing dirty change | Unknown | Content unknown at baseline — Phase 04 must assess. |

---

## Summary Table

| ADR | Title | Status | IP Submission Risk |
|-----|-------|--------|--------------------|
| 0001 | .ai/.squad boundary | Accepted | Low — well-documented and implemented |
| 0002 | npm CLI distribution | Superseded | Low — correctly superseded; carry-forward provisions explicit |
| 0003 | Git install primary | Accepted | Medium — verify docs consistency in Phase 01 |
