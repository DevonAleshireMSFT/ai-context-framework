# Phase 05 — Security Review: Changes

**Phase Status:** Complete
**Reviewed by:** Tal (Automation & Tooling Engineer)
**Date:** 2026-08-17

---

## Changes Made

| File | Change type | Description | Date | Author |
|------|-------------|-------------|------|--------|
| `.mcp.json` | Security hardening (SEC-01 remediation) | Pinned `@bradygaster/squad-cli@insider` → `@bradygaster/squad-cli@0.11.0` (exact verified version; eliminates mutable dist-tag attack surface). Resolves SEC-01 HIGH vulnerability. Kept `-y` flag for noninteractive MCP startup (acceptable with immutable version). | 2026-08-17 | Tal |
| `reviews/ip-readiness-review/phase-05-security/findings.md` | Updated | Populated findings table with SEC-01 (HIGH), SEC-02 (MEDIUM), SEC-H01 and SEC-H02 (hardening), N/A categories, and organizational approvals. | 2026-08-17 | Tal |
| `reviews/ip-readiness-review/phase-05-security/risk-register.md` | Updated | Populated risk register with SEC-R01 through SEC-R04 with severity, probability, impact, mitigation, and status. | 2026-08-17 | Tal |
| `.github/workflows/ai-context-conformance.yml` | Security hardening | Pinned `actions/checkout@v4` → SHA and `actions/setup-node@v4` → SHA (both jobs). | 2026-08-17 | Tal |
| `.github/workflows/ai-context-staleness.yml` | Security hardening | Pinned `actions/checkout@v4`, `actions/setup-node@v4`, `actions/github-script@v7` → SHAs. | 2026-08-17 | Tal |
| `.github/workflows/pages.yml` | Security hardening | Pinned `actions/checkout@v4`, `ruby/setup-ruby@v1`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4` → SHAs. | 2026-08-17 | Tal |
| `.github/workflows/squad-heartbeat.yml` | Security hardening + documentation | Pinned `actions/checkout@v4`, `actions/github-script@v7` (×2) → SHAs. Added inline comment documenting `COPILOT_ASSIGN_TOKEN` fallback behavior (SEC-H01). | 2026-08-17 | Tal |
| `.github/workflows/squad-issue-assign.yml` | Security hardening | Pinned `actions/checkout@v4`, `actions/github-script@v7` (×2) → SHAs. | 2026-08-17 | Tal |
| `.github/workflows/squad-triage.yml` | Security hardening | Pinned `actions/checkout@v4`, `actions/github-script@v7` → SHAs. | 2026-08-17 | Tal |
| `.github/workflows/sync-squad-labels.yml` | Security hardening | Pinned `actions/checkout@v4`, `actions/github-script@v7` → SHAs. | 2026-08-17 | Tal |
| `.github/dependabot.yml` | New | Created Dependabot config for `github-actions` ecosystem to maintain SHA pins with weekly PRs. | 2026-08-17 | Tal |

---

## Non-Changes (Blockers / Deferred)

None. All identified blockers remediated.

---

## Previous Non-Changes (Now Remediated)

| File | Previous blocker | Resolution | Date |
|------|------------------|-----------|------|
| `.mcp.json` | `@bradygaster/squad-cli@insider` dist-tag returns 404 from npm registry. Cannot verify intended version from project evidence. Pinning deferred to Phase 10 organizational decision (ORG-01 / ORG-02). | **RESOLVED:** Fact-checked verified `@bradygaster/squad-cli@0.11.0` exists on npm registry with `state-mcp` command. Pinned exact version (eliminates mutable tag risk). Residual organizational approval (ORG-02) carries to Phase 10. | 2026-08-17 |

---

## SHA Pin Reference

| Action | Tag | Pinned SHA |
|--------|-----|------------|
| `actions/checkout` | v4 | `11d5960a326750d5838078e36cf38b85af677262` |
| `actions/setup-node` | v4 | `49933ea5288caeca8642d1e84afbd3f7d6820020` |
| `actions/github-script` | v7 | `f28e40c7f34bde8b3046d885e986cb6290c5673b` |
| `ruby/setup-ruby` | v1 (branch HEAD) | `95ef2b042f9d7a56d8268cba8559e2842e2ad01b` |
| `actions/configure-pages` | v5 | `983d7736d9b0ae728b81ab479565c72886d7745b` |
| `actions/upload-pages-artifact` | v3 | `56afc609e74202658d3ffba0e8f6dda462b719fa` |
| `actions/deploy-pages` | v4 | `d6db90164ac5ed86f2b6aed7e0febac5b3c0c03e` |

> **Note on `ruby/setup-ruby@v1`:** The `v1` reference resolves as a branch (not a tag) in this repository. The SHA pinned is the verified branch HEAD at review time (2026-08-17), corresponding to the latest v1.x release line. Dependabot will propose SHA updates when new v1.x releases are tagged.
