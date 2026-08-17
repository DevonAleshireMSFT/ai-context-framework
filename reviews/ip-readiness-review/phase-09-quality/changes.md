# Phase 09 — Quality: Changes

**Phase Status:** Complete
**Author:** Tal (Automation & Tooling Engineer)
**Date:** 2026-08-17
**Branch:** squad/ip-readiness-review

---

## Changes Made

### F-09-01 — Permalink normalization: `docs/responsible-ai.md`

**Before:**
```yaml
permalink: /responsible-ai/
```
**After:**
```yaml
permalink: /responsible-ai
```

**README.md links updated** (2 occurrences of trailing slash removed):
- Line 424: `...responsible-ai/` → `...responsible-ai`
- Line 473: `...responsible-ai/` → `...responsible-ai`

---

### F-09-02 — nav_order gap removal and Known Implementations repositioning

**Before → After:**

| File | Before | After |
|------|--------|-------|
| `docs/automation.md` | `nav_order: 7` | `nav_order: 6` |
| `docs/cli.md` | `nav_order: 8` | `nav_order: 7` |
| `docs/rag-integration.md` | `nav_order: 9` | `nav_order: 8` |
| `docs/responsible-ai.md` | `nav_order: 11` | `nav_order: 9` |
| `docs/implementations.md` | `nav_order: 10` | `nav_order: 10` (unchanged) |

Result: nav_order values 1–10 are now contiguous; no gaps; `implementations.md` is last.

---

### F-09-03 — Workflow fallback token: `.github/workflows/squad-issue-assign.yml`

**Before:**
```yaml
      - name: Assign @copilot coding agent
        if: github.event.label.name == 'squad:copilot'
        uses: actions/github-script@f28e40c7f34bde8b3046d885e986cb6290c5673b # v7
        with:
          github-token: ${{ secrets.COPILOT_ASSIGN_TOKEN }}
```

**After:**
```yaml
      # COPILOT_ASSIGN_TOKEN is a fine-grained PAT with issues:write scope required to trigger
      # the coding agent. Falls back to GITHUB_TOKEN, which may receive 403/422 on agent
      # assignment but must not fail unrelated issue routing.
      - name: Assign @copilot coding agent
        if: github.event.label.name == 'squad:copilot'
        continue-on-error: true
        uses: actions/github-script@f28e40c7f34bde8b3046d885e986cb6290c5673b # v7
        with:
          github-token: ${{ secrets.COPILOT_ASSIGN_TOKEN || secrets.GITHUB_TOKEN }}
```

SHA pin preserved: `f28e40c7f34bde8b3046d885e986cb6290c5673b`
Permissions unchanged: `issues: write`, `contents: read`

---

## Validation Results (Post-Change)

| Check | Result |
|-------|--------|
| `node --test` | ✅ 50/50 pass, 0 fail |
| `node scripts/check-links.mjs` | ✅ 17 files, 99 links, 0 errors, 0 warnings |
| nav_order contiguous | ✅ 1–10 with no gaps |
| nav_order unique | ✅ all unique |
| YAML syntax — squad-issue-assign.yml | ✅ valid |
| All workflow `uses:` SHA-pinned | ✅ preserved |
| `responsible-ai` permalink consistent | ✅ `/responsible-ai` matches site convention |

---

## Change Log

| File | Change type | Description | Date | Author |
|------|-------------|-------------|------|--------|
| `docs/responsible-ai.md` | Front matter | Permalink `/responsible-ai/` → `/responsible-ai` (no trailing slash) | 2026-08-17 | Tal |
| `docs/responsible-ai.md` | Front matter | nav_order 11 → 9 | 2026-08-17 | Tal |
| `README.md` | Link update | Remove trailing slash from responsible-ai URLs (×2) | 2026-08-17 | Tal |
| `docs/automation.md` | Front matter | nav_order 7 → 6 | 2026-08-17 | Tal |
| `docs/cli.md` | Front matter | nav_order 8 → 7 | 2026-08-17 | Tal |
| `docs/rag-integration.md` | Front matter | nav_order 9 → 8 | 2026-08-17 | Tal |
| `.github/workflows/squad-issue-assign.yml` | Workflow | Add `|| secrets.GITHUB_TOKEN` fallback, `continue-on-error: true`, explanatory comment | 2026-08-17 | Tal |
| `reviews/.../phase-09-quality/findings.md` | Review artifact | Populated from Polgar assessment | 2026-08-17 | Tal |
| `reviews/.../phase-09-quality/quality-report.md` | Review artifact | Populated quality report | 2026-08-17 | Tal |
| `reviews/.../phase-09-quality/changes.md` | Review artifact | This file | 2026-08-17 | Tal |
| `reviews/.../review-status.md` | Status | Phase 09 marked Complete; Phase 10 next action set | 2026-08-17 | Tal |
