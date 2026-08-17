# Phase 03 — Repository Hygiene: Recommendations

**Phase Status:** Complete
**Completed by:** Tal (Automation & Tooling Engineer)
**Date:** 2026-08-17

---

## Summary

Two safe improvements were implemented in this phase. Six recommendations are deferred to
human decision or a later phase (especially Phase 08 — IP Readiness, which governs the
npm publish channel).

---

## Implemented Recommendations

| ID | Category | Recommendation | Priority | Effort | Status |
|----|----------|---------------|----------|--------|--------|
| R-01a | `.gitignore` hygiene | Add `*.tgz` to `.gitignore` to prevent accidental tarball commits | High | Trivial | ✅ Implemented |
| R-01b | Package metadata | Add `"license": "MIT"` to `package.json` to align npm metadata with the existing `LICENSE` file | Low | Trivial | ✅ Implemented |

---

## Deferred Recommendations

| ID | Category | Recommendation | Priority | Effort | Risk | Owner | Blocks |
|----|----------|---------------|----------|--------|------|-------|--------|
| R-02 | CODEOWNERS | Extend `.github/CODEOWNERS` to cover `bin/`, `scripts/`, `docs/`, root files (`README.md`, `CONTRIBUTING.md`, `package.json`, `LICENSE`, `.gitignore`, `.gitattributes`), and `.github/workflows/`. Currently only `/org/`, `/registry.md`, `/templates/`, `/.ai/adr/` have required reviewers. | Medium | Low | Low | Architecture Team / Devon | Phase 08 |
| R-03 | Distribution surface | Create `.npmignore` to exclude internal paths (`reviews/`, `.copilot/`, `.mcp.json`, `.squad/log/`) from the npm publish surface before `"private": true` is removed. `.gitignore` currently governs git install filtering; `.npmignore` must be audited carefully to not break the git install path. | High (when npm publish is activated) | Medium | Medium | Architecture Team | Phase 08 (npm publish activation) |
| R-04 | Untracked files | Stage and commit `.ai-context.json` and `.github/prompts/ai-context-setup.prompt.md` — both are confirmed intentional tracked artifacts (see F-01, F-02 in findings.md). | High | Trivial | None | Devon (human commit) | Phase 04 drift check |
| R-05 | Package metadata | Add `"description"`, `"keywords"`, `"repository"`, `"homepage"`, and `"bugs"` fields to `package.json` for improved `npm info` output. Defer description/keywords content to a product naming decision. | Low | Low | Low | Devon / Carlsen | Phase 08 |
| R-06 | Unresolved decisions | Resolve P10-DEC-01 (`docs/ngAIO-project-understanding.md` — track, move, or delete) and P10-DEC-02 (`registry.md` adoption date). Both feed into Phase 08 IP Readiness and Phase 10 final summary. | Medium | Low | None | Devon | Phase 08, Phase 10 |
| R-07 | Distribution surface | Investigate whether `reviews/ip-readiness-review/` (internal IP review artifacts, ~100 kB) should be excluded from consumer git-install distribution. These are not framework content but will be installed by consumers until a `.npmignore` or branch strategy resolves this. | Low | Medium | Low | Devon / Carlsen | Phase 08 |
