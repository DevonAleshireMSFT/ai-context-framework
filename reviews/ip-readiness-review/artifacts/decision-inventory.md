# Decision Inventory — Decisions Requiring Human Approval

**Generated:** 2026-08-16
**Stage:** Final
**Method:** Review of `.ai/context.md`, ADRs, `.squad/decisions.md` references, and overall repository state.

---

## Purpose

This inventory records decisions that required human or organizational approval during the review and their final disposition.

---

## Decision Table

| ID | Decision required | Source | Owner | Blocking phase | Status |
|----|-------------------|--------|-------|----------------|--------|
| DEC-001 | Confirm or reject the `PROPOSED: confirm` annotations in `.ai/context.md`. | `.ai/context.md` | Devon Aleshire (PM) + Architecture Team | Phase 02 | **Resolved — all seven remaining annotations were verified against implementation, tests, or accepted ADRs and removed.** |
| DEC-002 | Determine the framework repository's adoption date. | `registry.md`, commit `53bcd99` | Devon Aleshire (PM) | Phase 10 | **Resolved — `2026-05-12`, when the live `.ai/context.md` was committed in the initial scaffold.** |
| DEC-003 | Confirm that the updated architecture documentation matches implementation. | `docs/architecture.md` | Devon Aleshire (PM) + Carlsen | Phase 04 | **Resolved — architecture assessment found the three-tier model and CLI boundaries consistent with implementation.** |
| DEC-004 | Determine whether `.ai-context.json` is a tracked project artifact. | `.ai-context.json`, CLI implementation | Devon Aleshire (PM) | Phase 03 | **Resolved — it is the framework/schema installation stamp and is included in this change set.** |
| DEC-005 | Determine the disposition of the internal ngAIO assessment. | `reviews/ip-readiness-review/artifacts/ngAIO-project-understanding.md` | Devon Aleshire (PM) | Phase 10 | **Outstanding — removed from the Pages source and specifically gitignored; decide whether to retain locally or move to an approved private artifact store.** |
| DEC-006 | Determine whether npm publication is part of the current release scope. | `package.json`, ADR-0003 | Devon Aleshire (PM) | Phase 08 | **Resolved for this release — `private: true` remains consistent with ADR-0003; npm and tarball channels remain backlog work.** |
| ORG-02 | Approve `@bradygaster/squad-cli@0.11.0` through the applicable organizational OSS/provenance process. | `.mcp.json`, Phase 05 security review | Organizational security/legal owner | Before broad organizational distribution | **Outstanding organizational approval; technical version drift was remediated with an exact pin.** |

---

## Notes

- Decisions already captured as accepted ADRs are not repeated here; see [adr-inventory.md](adr-inventory.md).
- Final outstanding items are also summarized in [Phase 10 outstanding decisions](../phase-10-final/outstanding-decisions.md).
