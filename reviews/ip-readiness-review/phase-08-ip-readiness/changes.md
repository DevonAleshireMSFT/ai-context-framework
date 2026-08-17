# Phase 08 — IP Readiness: Changes

**Phase Status:** Complete
**Reviewed by:** Kasparov (Standards & Governance)
**Date:** 2026-08-17

---

## Changes Made

| File | Change type | Description | Date |
|------|-------------|-------------|------|
| `SECURITY.md` | Created | Security policy: supported versions, scope, GitHub private vulnerability reporting, no invented email/SLA/compliance claim | 2026-08-17 |
| `SUPPORT.md` | Created | Community best-effort support scope, channels, no SLA, framework vs. adopter implementation distinction | 2026-08-17 |
| `CHANGELOG.md` | Created | Unreleased structure; formal release history not yet established (no tags); historical commit summary | 2026-08-17 |
| `docs/responsible-ai.md` | Created | Human review requirement, model limitations disclosure, output accountability, fairness/representational guidance, privacy/PII, RAG/retrieval considerations, no compliance guarantee; nav_order: 11 | 2026-08-17 |
| `README.md` | Modified | Qualified behavioral examples as illustrative with RAI disclaimers; added Known Limitations section; added Contributing links to SECURITY/SUPPORT/RAI docs | 2026-08-17 |
| `templates/copilot-instructions.md.template` | Modified | Added "AI Output and Human Review" section: draft requirement, probabilistic model disclosure, "instructed to" framing | 2026-08-17 |
| `reviews/ip-readiness-review/phase-08-ip-readiness/findings.md` | Updated | Populated with 12 findings | 2026-08-17 |
| `reviews/ip-readiness-review/phase-08-ip-readiness/ip-gaps.md` | Updated | Populated with 11 gaps; all remediated or deferred with rationale; claims-not-made table | 2026-08-17 |
| `reviews/ip-readiness-review/artifacts/responsible-ai-review.md` | Updated | Full Phase 08 evidence, pre/post-remediation assessment, GREEN verdict | 2026-08-17 |
| `reviews/ip-readiness-review/artifacts/document-inventory.md` | Updated | Added SECURITY.md, SUPPORT.md, CHANGELOG.md, docs/responsible-ai.md entries | 2026-08-17 |

---

## Changes Deliberately Not Made

| File | Reason |
|------|--------|
| `LICENSE` | MIT license preserved; copyright holder/year unchanged; no trademark claims added |
| `package.json` | `private: true` preserved; no npm publish permission implied; version unchanged |
| `registry.md` | `YYYY-MM-DD` adoption date not changed; deferred to P10-DEC-02 |
| `.squad/*` | Team execution state; out of write scope |
| Any source logic / workflow / test | Out of write scope for this phase |
