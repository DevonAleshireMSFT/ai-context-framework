# Phase 07 — GitHub Pages: Site Improvements

**Phase Status:** Complete
**Revised by:** Tal (Automation & Tooling Engineer)

---

## Purpose

Document recommended improvements to the GitHub Pages documentation site.

---

## Site Improvements

| ID | Page / area | Issue | Recommendation | Priority | Owner |
|----|-------------|-------|---------------|----------|-------|
| SI-07-01 | `docs/ngAIO-project-understanding.md` | Internal IP readiness assessment exposed in Pages source with no front matter guard | Move to `reviews/ip-readiness-review/artifacts/` (internal review artifact only) | **CRITICAL** | Tal (done) |
| SI-07-02 | `docs/implementations.md` | Trailing slash on permalink (`/implementations/`) inconsistent with all other pages | Normalize to `/implementations` (no trailing slash) | MEDIUM | Tal (done) |
| SI-07-03 | `docs/implementations.md` | nav_order 6 places page between Copilot Integration and Automation, breaking conceptual flow | Move to nav_order 10 (end of nav, after RAG Integration) | MEDIUM | Tal (done) |
| SI-07-04 | `docs/getting-started.md` Step 2 | Plain code fence lacks language tag; no syntax highlighting or language semantics | Add `gitignore` language tag to the `.gitignore` snippet | LOW | Tal (done) |
| SI-07-05 | `docs/_config.yml` | `aux_links_new_tab: true` opens header links in a new tab without accessible announcement | Set `aux_links_new_tab: false` | LOW | Tal (done) |
| SI-07-06 | `docs/architecture.md` | Mermaid rendering unconfirmed on live Pages site (theme does not bundle Mermaid) | Human reviewer must confirm rendering; accessible descriptions must remain | Observation | Human required |
| SI-07-07 | Live site | Color contrast not verified against WCAG AA | Spot-check live site for 4.5:1 minimum contrast on body text | LOW | Human required |
| SI-07-08 | Live site | Keyboard navigation and skip-nav not verified | Tab through live site to confirm skip-nav and focus order | LOW | Human required |

---

## Improvements Applied in This Phase

| ID | Status | Files Changed |
|----|--------|---------------|
| SI-07-01 | ✅ Applied | `docs/ngAIO-project-understanding.md` → `reviews/ip-readiness-review/artifacts/ngAIO-project-understanding.md` |
| SI-07-02 | ✅ Applied | `docs/implementations.md` (permalink) |
| SI-07-03 | ✅ Applied | `docs/implementations.md` (nav_order) |
| SI-07-04 | ✅ Applied | `docs/getting-started.md` (code fence language tag) |
| SI-07-05 | ✅ Applied | `docs/_config.yml` (aux_links_new_tab) |
| SI-07-06 | ⏳ Human verification | No code change — requires live site review |
| SI-07-07 | ⏳ Human verification | No code change — requires live site review |
| SI-07-08 | ⏳ Human verification | No code change — requires live site review |
