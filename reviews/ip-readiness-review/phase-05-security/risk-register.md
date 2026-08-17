# Phase 05 — Security Review: Risk Register

**Phase Status:** Complete
**Reviewed by:** Tal (Automation & Tooling Engineer)
**Date:** 2026-08-17

---

## Purpose

Document identified security risks with severity, likelihood, and recommended mitigations.

---

## Risk Register

| ID | Finding | Severity | Probability | Impact | Recommendation | Status |
|----|---------|----------|-------------|--------|----------------|--------|
| SEC-R01 | `.mcp.json` used `@bradygaster/squad-cli@insider`; the `insider` dist-tag does not exist on npm (404). When it existed, any version published under that mutable dist-tag could be resolved without verification. `-y` flag suppresses the interactive consent prompt, auto-accepting whatever package resolves. A publisher compromise or dist-tag hijack would execute arbitrary code in the developer's environment at MCP server startup. | HIGH | Eliminated (dist-tag non-existent) | HIGH (arbitrary code execution in developer environment) | **REMEDIATED:** Pinned to exact verified version `@bradygaster/squad-cli@0.11.0` (confirmed in npm registry). Immutable version pin eliminates mutable dist-tag attack surface. **Residual risk:** Package provenance/OSS governance approval outstanding (Phase 10, ORG-02). See findings SEC-01. | ✅ Remediated |
| SEC-R02 | All 7 GitHub workflows used mutable `@v4` / `@v7` / `@v1` / `@v5` / `@v3` action tags. A force-push to an action tag in the upstream repo (or a supply-chain compromise of the action publisher) would execute attacker-controlled code in CI with the permissions granted to the workflow step. | MEDIUM | Low (force-push to major-version tag is unusual for major actions; upstream compromise is rare but possible) | HIGH (code execution with workflow permissions; pages workflow has `id-token:write` enabling OIDC token issuance) | Pin all `uses:` to verified 40-character commit SHAs with version comments. **Remediated.** | ✅ Remediated |
| SEC-R03 | `COPILOT_ASSIGN_TOKEN` fallback to `GITHUB_TOKEN` in `squad-heartbeat.yml` was undocumented. If `COPILOT_ASSIGN_TOKEN` is absent the workflow silently uses a different permission scope, which may cause the Copilot assignment API call to fail or succeed with unexpected permissions. | LOW | High (secret may not be configured in all forks or new installs) | LOW (assignment step fails gracefully with a caught exception) | Document fallback behavior inline. **Remediated.** | ✅ Remediated |
| SEC-R04 | `ai-context-staleness.yml` writes `staleness.json` to the runner workspace and reads it back in a subsequent step. The file is not deleted after use. In a shared runner environment this is a low-probability information disclosure (workflow output data visible to subsequent jobs that access the runner). Self-hosted runners are not used; GitHub-hosted runners are ephemeral per job. | LOW | Very Low (ephemeral GitHub-hosted runners; data discarded after job) | LOW (no sensitive data; staleness metadata only) | Not exploitable in current setup. Future improvement: use workflow output variables instead of a temp file. No action taken. | 📋 Noted |
