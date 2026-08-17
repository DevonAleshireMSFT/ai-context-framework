# Phase 07 — GitHub Pages: Changes

**Phase Status:** Complete
**Revised by:** Tal (Automation & Tooling Engineer) — independent revision after Polgar REJECT verdict.
**Reviewer lockout:** Capablanca may not contribute to this revision.

---

## Changes Made

| File | Change type | Description | Date | Author |
|------|-------------|-------------|------|--------|
| `docs/ngAIO-project-understanding.md` | **Move (blocking)** | Moved out of `docs/` to `reviews/ip-readiness-review/artifacts/ngAIO-project-understanding.md`. Content preserved exactly. No relative links existed; all links are absolute GitHub URLs. Eliminates public Pages exposure of internal IP readiness deliberation. | 2026-08-17 | Tal |
| `reviews/ip-readiness-review/artifacts/ngAIO-project-understanding.md` | **Create (artifact)** | New location for the ngAIO internal review artifact. Marked as internal review artifact, not Pages content. | 2026-08-17 | Tal |
| `docs/implementations.md` | **Fix** | Normalized `permalink: /implementations/` → `permalink: /implementations` (no trailing slash). Moved `nav_order: 6` → `nav_order: 10` to place Known Implementations after all operational/reference docs. | 2026-08-17 | Tal |
| `docs/getting-started.md` | **Fix** | Added `gitignore` language tag to the plain code fence in Step 2 (.gitignore snippet). | 2026-08-17 | Tal |
| `docs/_config.yml` | **Fix** | Changed `aux_links_new_tab: true` → `aux_links_new_tab: false` to prevent unannounced new-tab behavior. | 2026-08-17 | Tal |
| `reviews/ip-readiness-review/phase-07-github-pages/findings.md` | **Populate** | Recorded all Phase 07 findings with evidence, severity, accessibility assessment, nav map, and human visual-review needs. | 2026-08-17 | Tal |
| `reviews/ip-readiness-review/phase-07-github-pages/site-improvements.md` | **Populate** | Recorded full improvements table with priority, owner, and status for each item. | 2026-08-17 | Tal |
| `reviews/ip-readiness-review/artifacts/accessibility-report.md` | **Update** | Recorded Phase 07 accessibility findings and human verification items. | 2026-08-17 | Tal |
| `reviews/ip-readiness-review/artifacts/document-inventory.md` | **Update** | Updated ngAIO document-inventory entry to reflect move from `docs/` to `reviews/ip-readiness-review/artifacts/`. | 2026-08-17 | Tal |
| `reviews/ip-readiness-review/README.md` | **Update** | Added ngAIO artifact to Phase 07 artifact inventory; updated phase status to Complete. | 2026-08-17 | Tal |
| `reviews/ip-readiness-review/review-status.md` | **Update** | Phase 07 marked Complete; Phase 08 next action set. | 2026-08-17 | Tal |

---

## Validation

| Check | Result |
|-------|--------|
| `docs/ngAIO-project-understanding.md` absent from Pages source | ✅ File removed from `docs/` |
| `reviews/ip-readiness-review/artifacts/ngAIO-project-understanding.md` present | ✅ File at new location, content preserved |
| No relative links broken by move | ✅ File had no relative links |
| `docs/implementations.md` permalink no trailing slash | ✅ |
| `docs/implementations.md` nav_order unique (10) | ✅ No conflict with 1–9 |
| `docs/getting-started.md` gitignore fence has language tag | ✅ |
| `docs/_config.yml` aux_links_new_tab false | ✅ |
| No source logic / workflows / tests / package metadata / templates modified | ✅ |
| No new CDN scripts or unpinned browser dependencies added | ✅ |
| No dark-mode or search behavior changed | ✅ |

---

## Human Verification Required

1. **Mermaid diagrams** — confirm `docs/architecture.md` Mermaid blocks render (or fail gracefully) on live site; verify accessible text descriptions remain visible.
2. **Navigation order** — confirm Known Implementations appears last in the published site nav.
3. **aux_links behavior** — confirm header links open in same tab.
4. **Color contrast** — spot-check WCAG AA 4.5:1 on live site.
5. **Keyboard navigation** — confirm skip-nav and tab order on live site.
