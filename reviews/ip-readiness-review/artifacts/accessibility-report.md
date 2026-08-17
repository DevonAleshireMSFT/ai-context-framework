# Accessibility Report — Baseline

**Generated:** 2026-08-16
**Stage:** Baseline / Discovery
**Phase responsibility:** Accessibility findings will be developed in Phase 06 (Developer Experience) and Phase 07 (GitHub Pages). This document establishes scope, method, and baseline evidence only.

---

## Scope

This accessibility review covers:
1. **GitHub Pages documentation site** (`docs/` → https://devonaleshiremsft.github.io/ai-context-framework/) — HTML rendering, navigation, headings, links, color contrast, and keyboard accessibility of the published site.
2. **CLI accessibility** — error messages, output format, and any color/formatting assumptions.
3. **Diagrams and images** — alt text and accessible descriptions (see [architecture-diagrams.md](architecture-diagrams.md)).

This review does **not** cover:
- Screen reader compatibility of GitHub's UI itself (out of scope).
- Accessibility of `.squad/` team execution files (not product-facing).

---

## Method

Phase 06/07 will use the following approach:
1. Manual review of Markdown source for structural heading hierarchy, link text quality, and table accessibility.
2. Review of Just the Docs theme for known accessibility characteristics.
3. Assessment of CLI output for color-only communication and screen reader considerations.
4. Review of any images or diagrams added during earlier phases.

Automated accessibility tools (e.g., axe, WAVE) may be used during Phase 07 for the live site.

---

## Baseline Evidence

| Area | Baseline observation |
|------|---------------------|
| HTML theme | Just the Docs (`~> 0.10`) — known accessibility-conscious theme with skip-to-content, keyboard nav, and ARIA support. No specific accessibility audit performed at baseline. |
| Heading structure | `docs/` files use standard Markdown `#`, `##`, `###` headings. Hierarchy appears reasonable at baseline; full audit pending Phase 06. |
| Markdown tables | Tables use standard Markdown format. Rendered HTML includes `<thead>` and `<tbody>` — accessible to screen readers. |
| Links | `docs/` contains internal relative links and absolute GitHub links. `check-links.mjs` validates links but does not check link text quality. |
| Images | No images found in `docs/` at baseline — no alt-text gaps to report. |
| Mermaid diagrams | None present — no diagram accessibility issues at baseline. |
| CLI output | `bin/ai-context.mjs` not fully reviewed at baseline. Phase 06 will assess color/formatting assumptions. |
| Color contrast | Not assessed at baseline. Phase 07 will assess live site. |

---

## Phase 07 Findings

| Area | Finding | Severity | Status |
|------|---------|----------|--------|
| Unannounced new-tab (aux_links) | `aux_links_new_tab: true` → fixed to `false` | LOW | ✅ Resolved |
| Code fence language semantics | `.gitignore` fence lacked language tag → added `gitignore` | LOW | ✅ Resolved |
| Mermaid diagrams | Just the Docs does not bundle Mermaid; diagrams may not render; accessible descriptions present | Observation | Human verification required |
| Nav heading hierarchy | `## PR Checklist` in governance.md is correct `h2` level — no issue | Observation | No action required |
| Color contrast | Not assessed (live site check required) | LOW | Human verification required |
| Keyboard nav / skip-nav | Not assessed (live site check required) | LOW | Human verification required |

**Status:** Pending Phase 07 human visual-review items (Mermaid, color contrast, keyboard nav). All blocking and code issues resolved.
