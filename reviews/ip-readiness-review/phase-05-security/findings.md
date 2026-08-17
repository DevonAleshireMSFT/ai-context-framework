# Phase 05 — Security Review: Findings

**Phase Status:** Complete
**Reviewed by:** Tal (Automation & Tooling Engineer)
**Date:** 2026-08-17
**Security review input:** Mandatory independent security-review agent audit
**Baseline context:** See [artifacts/security-inventory.md](../artifacts/security-inventory.md)
**Risk register:** See [risk-register.md](./risk-register.md)

---

## Summary

| Category | Count |
|----------|-------|
| Vulnerabilities (HIGH) | 1 |
| Vulnerabilities (MEDIUM) | 1 |
| Hardening observations | 2 |
| N/A (not applicable) | 6 |
| Organizational approvals pending (Phase 10) | 2 |

---

## Findings

| ID | Finding | Severity | Surface | Recommendation | Status |
|----|---------|----------|---------|----------------|--------|
| SEC-01 | `.mcp.json` referenced `@bradygaster/squad-cli@insider`; the `insider` dist-tag does not exist on the npm registry (returns 404), and mutable dist-tags allow any publisher to substitute a malicious package at update time, creating developer supply-chain RCE exposure. `-y` auto-consents without version verification. | HIGH | `.mcp.json` | **REMEDIATED:** Pinned to exact verified version `@bradygaster/squad-cli@0.11.0` (confirmed in npm registry with `dist-tags`; `state-mcp` command exists in package.json bin field). Package provenance approval outstanding (Phase 10, ORG-02). See risk-register SEC-R01. | ✅ Remediated |
| SEC-02 | All 7 GitHub workflows use mutable action major-version tags (e.g., `actions/checkout@v4`). A compromised or force-pushed tag resolves to attacker-controlled code at workflow execution time. | MEDIUM | `.github/workflows/*.yml` | Pin every `uses:` to a verified 40-character commit SHA with readable version comment. **Remediated in this phase** for all 7 workflows. | ✅ Remediated |
| SEC-H01 | `COPILOT_ASSIGN_TOKEN` secret fallback behavior in `squad-heartbeat.yml` is undocumented. Fallback to `GITHUB_TOKEN` means Copilot assignment uses a different permission scope than intended if the PAT is absent. | HARDENING | `squad-heartbeat.yml` | Document the fallback token behavior inline in the workflow. **Remediated in this phase.** | ✅ Remediated |
| SEC-H02 | `ai-context-staleness.yml` writes output to a temp file (`staleness.json`) in the runner workspace and reads it back via `github-script`. The file is not explicitly deleted. This is a low-priority operational observation, not an exploitable vulnerability in the current context. | HARDENING | `ai-context-staleness.yml` | Low priority. No action taken in this phase. Can be hardened in a future CI hygiene pass by writing directly to a workflow output variable. | 📋 Noted, no action |

---

## N/A Findings (no vulnerability)

| ID | Surface | Reason |
|----|---------|--------|
| N/A-01 | Auth / authorization | No server, no API, no authentication surface in this repository. |
| N/A-02 | Command injection | Scripts use no shell interpolation of user-controlled data; no `exec`/`spawn` with external input. |
| N/A-03 | SSRF / CSRF | No server component. Not applicable. |
| N/A-04 | Cryptographic issues | No cryptography in scope. Not applicable. |
| N/A-05 | PR trigger escalation | All squad/CI workflows use `pull_request`, not `pull_request_target`. No fork-privilege escalation risk. |
| N/A-06 | Workflow permissions | Permissions are purpose-scoped: CI reads contents; staleness writes issues; pages writes pages+id-token; squad workflows write issues. No over-broad permissions found. |

---

## Organizational Approvals (pending Phase 10)

| ID | Item | Decision needed |
|----|------|-----------------|
| ORG-02 | `.mcp.json` package provenance | Organizational legal/security approval for `@bradygaster/squad-cli@0.11.0` in the developer toolchain. |
