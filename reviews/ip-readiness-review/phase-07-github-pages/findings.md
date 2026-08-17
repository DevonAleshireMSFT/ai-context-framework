# Phase 07 — GitHub Pages: Findings

**Phase Status:** Complete
**Revised by:** Tal (Automation & Tooling Engineer) — Phase 7 independent revision after Polgar REJECT verdict.
**Reviewer lockout:** Capablanca may not contribute to this revision.

---

## Purpose

Audit the published GitHub Pages documentation site for quality, accuracy, navigation, accessibility, and IP readiness.

---

## Scope

- `docs/` — all published pages
- `docs/_config.yml` — Jekyll/Just the Docs configuration
- `docs/Gemfile` — Pages gem dependencies
- `.github/workflows/pages.yml` — Pages deployment workflow
- Live site: https://devonaleshiremsft.github.io/ai-context-framework/

---

## Findings

### F-07-01 — BLOCKING: Internal assessment exposed on public GitHub Pages

| Field | Value |
|-------|-------|
| ID | F-07-01 |
| Severity | **CRITICAL / BLOCKING** |
| Status | **RESOLVED** (artifact moved by this revision) |
| File | `docs/ngAIO-project-understanding.md` (pre-move) |
| New location | `reviews/ip-readiness-review/artifacts/ngAIO-project-understanding.md` |

**Evidence:** `docs/ngAIO-project-understanding.md` is an untracked file (pre-existing at baseline) with no Jekyll front matter (`layout`, `title`, `nav_order`, `permalink`). Despite missing front matter, Jekyll/Just the Docs will serve any `.md` file in `docs/` at a reachable public URL. Just the Docs' default behavior uses the filename as the URL slug, making this document accessible at an unannounced path such as `/ai-context-framework/ngaio-project-understanding` or `/ai-context-framework/ngAIO-project-understanding`. The file contains the full internal ngAIO readiness deliberation: scoring rationale, weaknesses, recommendation details, and internal risk assessment. This is pre-publication IP sensitivity material that must not be accessible on the public Pages site.

**Root cause:** The file was placed in `docs/` without front matter and without a `published: false` guard, and without registering it in the site nav. It would appear at a publicly reachable URL once the Pages workflow runs.

**Polgar verdict:** REJECT — required independent revision to move the file completely out of `docs/`.

**Resolution:** Moved to `reviews/ip-readiness-review/artifacts/ngAIO-project-understanding.md`. Content preserved exactly. No relative links existed in the file; all links are absolute GitHub URLs. The file is now an internal review artifact, not Pages content.

---

### F-07-02 — MEDIUM: `implementations.md` permalink has trailing slash causing nav inconsistency

| Field | Value |
|-------|-------|
| ID | F-07-02 |
| Severity | **MEDIUM** |
| Status | **RESOLVED** |
| File | `docs/implementations.md` |

**Evidence:** All other `docs/*.md` permalinks omit the trailing slash (e.g., `/getting-started`, `/governance`, `/architecture`). `implementations.md` used `permalink: /implementations/` (with trailing slash), creating a nav inconsistency. Just the Docs generates breadcrumbs and active-link detection based on URL equality; the trailing slash discrepancy can cause active-link highlighting to fail on some deployments.

**Resolution:** Normalized to `permalink: /implementations` (no trailing slash). Verified against all other doc pages — no conflict.

---

### F-07-03 — MEDIUM: `implementations.md` nav_order (6) places it between Copilot Integration (5) and Automation (7), disrupting conceptual flow

| Field | Value |
|-------|-------|
| ID | F-07-03 |
| Severity | **MEDIUM** |
| Status | **RESOLVED** |
| File | `docs/implementations.md` |

**Evidence:** The navigation order at baseline was: Home (1), Getting Started (2), Architecture (3), Governance (4), Copilot Integration (5), Known Implementations (6), Automation (7), CLI (8), RAG Integration (9). Placing Known Implementations between Copilot Integration and Automation breaks the conceptual flow of operational reference documentation. Implementations is supplementary discovery content, not a core reference.

**Nav order at baseline:**

| nav_order | Title |
|-----------|-------|
| 1 | Home |
| 2 | Getting Started |
| 3 | Architecture |
| 4 | Governance |
| 5 | Copilot Integration |
| 6 | Known Implementations ← misplaced |
| 7 | Automation |
| 8 | CLI |
| 9 | RAG Integration |

**Resolution:** Changed `nav_order` to `10` — after RAG Integration, at the end of the nav. Remaining nav_orders (1–9) are unchanged; no duplicates introduced.

---

### F-07-04 — LOW: Plain code fence in `getting-started.md` Step 2 lacks language tag

| Field | Value |
|-------|-------|
| ID | F-07-04 |
| Severity | **LOW** |
| Status | **RESOLVED** |
| File | `docs/getting-started.md` |

**Evidence:** The `.gitignore` snippet in "Step 2 — Update .gitignore" uses a plain triple-backtick fence with no language identifier. All other code fences in the page declare a language (`bash`, `markdown`). The missing tag means the renderer applies no syntax highlighting and screen reader tooling receives no language semantics.

**Resolution:** Added `gitignore` language tag: ` ```gitignore `.

---

### F-07-05 — LOW: `aux_links_new_tab: true` triggers unannounced new-tab behavior

| Field | Value |
|-------|-------|
| ID | F-07-05 |
| Severity | **LOW** |
| Status | **RESOLVED** |
| File | `docs/_config.yml` |

**Evidence:** `aux_links_new_tab: true` causes the "View on GitHub" and "Optional: Squad AI teams" auxiliary links in the site header to open in a new browser tab without any accessible announcement. WCAG 2.1 SC 3.2.2 (On Input) and G200 guidance indicate that opening a new window without warning can disorient users, particularly those using screen readers. Just the Docs (≤0.10) does not add `(opens in a new tab)` text or an ARIA label when this setting is true. The theme does not provide an accessible announcement mechanism for this behavior.

**Resolution:** Set `aux_links_new_tab: false`. Users navigate the GitHub link in the same tab; standard browser back-navigation returns them to the site.

---

### F-07-06 — Observation: Mermaid diagrams — browser verification required; accessible descriptions must remain

| Field | Value |
|-------|-------|
| ID | F-07-06 |
| Severity | **Observation / No Action** |
| Status | **Documented — Human verification required** |
| File | `docs/architecture.md` |

**Evidence:** `docs/architecture.md` contains Mermaid diagram blocks added during Phase 04. Just the Docs does not bundle a Mermaid rendering engine. Diagrams may render as raw code blocks in the published site unless a CDN script or plugin is added. Phase 04 added accessible text descriptions alongside each diagram; these must be preserved regardless of rendering behavior.

**No action taken:** Adding a remote CDN script or unpinned browser dependency for Mermaid is out of scope for this phase (as per task constraints). A human reviewer must confirm browser rendering on the live site and verify that accessible descriptions remain visible whether or not Mermaid renders.

---

### F-07-07 — Observation: Governance page PR checklist heading is `##` — correct level

| Field | Value |
|-------|-------|
| ID | F-07-07 |
| Severity | **Observation / No Action** |
| Status | **No change required** |
| File | `docs/governance.md` |

**Evidence:** Polgar noted a potential governance checklist heading hierarchy issue. Audit confirms `## PR Checklist` is at `h2` level, consistent with all other top-level sections on the page (Ownership Model, Event-Driven Update Triggers, Product ADR Review Path, etc.). The heading is semantically correct and not subordinate to another section. No hierarchy violation exists.

---

### F-07-08 — Observation: Dark-mode and search behavior — no evidence of issues; no change

| Field | Value |
|-------|-------|
| ID | F-07-08 |
| Severity | **Observation / No Action** |
| Status | **No change introduced** |

**Evidence:** No dark-mode or search behavior evidence was found in the baseline. No change introduced per task constraints — dark-mode and search behavior changes require evidence of a problem before modification.

---

## Accessibility Assessment

| Area | Finding | Severity | Resolved? |
|------|---------|----------|-----------|
| Unannounced new-tab (aux_links) | F-07-05 | LOW | ✅ Yes |
| Missing language tag (code fence) | F-07-04 | LOW | ✅ Yes |
| Mermaid rendering (accessible descriptions present) | F-07-06 | Observation | Human verification required |
| Nav heading hierarchy (governance) | F-07-07 | Observation | No issue found |
| Just the Docs skip-nav, keyboard nav, ARIA | Baseline: theme provides these | — | No gaps found |
| Images | No images in docs/ | — | N/A |

---

## Navigation Map (post-fix)

| nav_order | Title | Permalink | Notes |
|-----------|-------|-----------|-------|
| 1 | Home | `/ai-context-framework/` | `layout: home` |
| 2 | Getting Started | `/getting-started` | |
| 3 | Architecture | `/architecture` | |
| 4 | Governance | `/governance` | |
| 5 | Copilot Integration | `/copilot-integration` | |
| 6 | Automation | `/automation` | |
| 7 | CLI | `/cli` | |
| 8 | RAG Integration | `/rag-integration` | |
| 9 | *(was Automation — see note)* | | |
| 10 | Known Implementations | `/implementations` | Moved to end; supplementary content |

> **Note:** The original nav_orders 7 (Automation) and 8 (CLI) and 9 (RAG Integration) are unchanged. Known Implementations moved from 6 → 10. No nav_order conflicts remain.

---

## Human Visual-Review Needs

The following items require human visual confirmation on the live site before Phase 7 can be considered fully verified:

1. **Mermaid diagrams** — confirm whether diagrams in `docs/architecture.md` render as Mermaid or as raw code blocks. Verify accessible text descriptions remain visible in both cases.
2. **Navigation order** — confirm Known Implementations appears last in the published site nav after the move to nav_order 10.
3. **aux_links behavior** — confirm "View on GitHub" and "Optional: Squad AI teams" links no longer open in a new tab.
4. **Color contrast** — spot-check the live site for sufficient contrast (WCAG AA minimum 4.5:1 for body text).
5. **Keyboard navigation** — confirm tab order and skip-nav link function on the live site.
