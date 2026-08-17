# Phase 10 — Final: Outstanding Decisions

**Phase Status:** Complete
**Date:** 2026-08-17

---

## Purpose

Enumerate decisions that remain unresolved at the conclusion of the review and require human approval.

---

## Resolved Decisions (Applied in Phase 10)

| ID | Decision | Resolution | Phase Applied |
|----|----------|------------|---------------|
| P10-DEC-02 | Registry adoption date placeholder | Set to `2026-05-12` per commit `53bcd99` (fact-checked) | Phase 10 |
| P10-DEC-03 | CODEOWNERS coverage expansion | Applied — 14 paths covering `/bin/`, `/scripts/`, `/.github/workflows/`, `/docs/`, `/README.md`, `/LICENSE`, `/.gitignore`, `/.gitattributes`, `/.github/CODEOWNERS` using existing `@DevonAleshireMSFT` | Phase 10 |

---

## Outstanding Decisions

| ID | Decision Needed | Category | Why It Matters | Options | Recommended Option | Required Approver | Status |
|----|----------------|----------|----------------|---------|-------------------|-------------------|--------|
| P10-DEC-01 | Disposition of `reviews/ip-readiness-review/artifacts/ngAIO-project-understanding.md` | IP / Content sensitivity | Contains internal ngAIO deliberation. Repository is public. File has been moved from `docs/` (no longer Pages-exposed) and gitignored to prevent accidental commit. Must decide whether to permanently delete, keep local-only, or sanitize for public commit. | (A) Keep gitignored / local-only — no action needed now. (B) Delete from disk entirely. (C) Sanitize and commit publicly. | **(A) Keep gitignored / local-only** — preserves reference value with zero public exposure risk. | Devon Aleshire | ⏳ Pending |
| ORG-02 | Package provenance / OSS governance approval for `@bradygaster/squad-cli@0.11.0` in `.mcp.json` | Security / Legal | `.mcp.json` references a third-party npm package executed as an MCP server. Version is pinned (immutable), verified to exist on npm, and contains the expected `state-mcp` command. However, organizational OSS governance has not formally approved this dependency. This cannot be self-approved by the review team. | (A) Obtain organizational approval and document in `dependency-inventory.md`. (B) Remove `.mcp.json` from committed tree (move to developer-local config). | **(A) Obtain organizational approval** — the package is already pinned and functional. | Organizational legal / security team | ⏳ Pending |
| HVC-01 | Live Pages Mermaid rendering verification | Accessibility | `docs/architecture.md` contains Mermaid diagram blocks. Automated checks confirm valid syntax, but live rendering on GitHub Pages requires human visual check to confirm diagrams render or degrade gracefully. Accessible text descriptions are present as fallback. | (A) Verify on live site and record. (B) Accept text descriptions as sufficient fallback. | **(A) Verify on live site** | Devon Aleshire | ⏳ Pending |
| HVC-02 | WCAG AA color contrast verification | Accessibility | Just the Docs theme is WCAG AA compliant by default, but custom configuration or content could introduce contrast issues. Requires human spot-check on live site. | (A) Spot-check live site and record. (B) Accept theme defaults as sufficient. | **(A) Spot-check live site** | Devon Aleshire | ⏳ Pending |
| HVC-03 | Keyboard navigation verification | Accessibility | Skip-nav link and tab order require human verification on the live GitHub Pages site. | (A) Test on live site and record. (B) Accept theme defaults as sufficient. | **(A) Test on live site** | Devon Aleshire | ⏳ Pending |

---

## Decision Impact on IP Readiness

| Decision | Blocks IP Submission? | Rationale |
|----------|----------------------|-----------|
| P10-DEC-01 (ngAIO disposition) | No | File is gitignored; zero public exposure. Disposition is a housekeeping decision. |
| ORG-02 (package provenance) | **Yes (organizational)** | OSS governance approval is a standard organizational gate. Technical risk is mitigated by version pinning. |
| HVC-01–03 (visual checks) | No (advisory) | Automated checks pass; human verification is best practice, not a blocker. |
