# Security Inventory — Baseline

**Generated:** 2026-08-16
**Stage:** Baseline / Discovery
**Note:** This is a surface-level baseline. Deeper per-surface findings will be recorded in [phase-05-security/findings.md](../phase-05-security/findings.md) and [phase-05-security/risk-register.md](../phase-05-security/risk-register.md) during Phase 05.

---

## Purpose

Identify all security-relevant surfaces in the repository at baseline so Phase 05 has a complete scope to review.

---

## Surface Inventory

### 1. Secret and Credential Hygiene

| Surface | Applicability | Baseline status |
|---------|--------------|-----------------|
| `.gitignore` secret exclusions | **High** | `.env`, `.env.*`, `*.env`, `secrets.*`, `*.secrets`, `credentials.*`, `*.credentials` are all gitignored. Appears comprehensive at baseline. |
| Committed secrets | **High** | No secrets observed in tracked files during discovery. No `.env` files tracked. |
| `org/standards.md` secret rules | **High** | Document exists; content not fully read at baseline. Phase 05 should verify rules are complete. |
| `README.md` "What never belongs in AI context" section | **Medium** | Referenced in `org/standards.md` per `.ai/context.md`. Content not fully verified at baseline. |
| `examples/azure-ai-search/` API key handling | **High** | Example uses Azure AI Search. Phase 05 must verify the example does not include or instruct committing API keys. |

### 2. CI/CD Pipeline Security

| Surface | Applicability | Baseline status |
|---------|--------------|-----------------|
| Workflow permissions | **High** | `pages.yml`: `contents: read`, `pages: write`, `id-token: write`. `ai-context-conformance.yml`: `contents: read`. Scoped appropriately at first glance. |
| Pinned action versions | **Medium** | `actions/checkout@v4`, `ruby/setup-ruby@v1` — major-version pinned (not commit-SHA pinned). Phase 05 should assess risk level. |
| FORCE_JAVASCRIPT_ACTIONS_TO_NODE24 | **Low** | Environment variable in pages.yml. No security concern identified at baseline. |
| Squad workflow permissions | **Medium** | Squad workflows (`squad-heartbeat.yml`, etc.) have write-capable permissions for issue management. Phase 05 should verify they are scoped correctly. |
| `workflow_dispatch` exposure | **Low** | Both `pages.yml` and `ai-context-conformance.yml` allow manual trigger. Standard practice; no concern at baseline. |

### 3. CLI and Script Security

| Surface | Applicability | Baseline status |
|---------|--------------|-----------------|
| `bin/ai-context.mjs` file write behavior | **High** | CLI writes to `.ai/` and `.github/copilot-instructions.md` (managed block). Phase 05 must verify: no path traversal, no write outside intended locations, no shell injection. |
| `scripts/` network access | **Medium** | Scripts are described as dependency-free and local. Phase 05 should confirm no outbound network calls. |
| `scripts/` file read scope | **Medium** | Scripts read `.ai/`, `docs/`, `registry.md`. Phase 05 should verify they do not read outside the repository. |
| No `eval` / dynamic code execution | **Medium** | Phase 05 should confirm absence of `eval` or dynamic `import()` with user-controlled paths. |

### 4. Data and PII

| Surface | Applicability | Baseline status |
|---------|--------------|-----------------|
| PII in committed files | **High** | No PII observed in discovery. `.squad/` agent histories contain internal work logs — Phase 05 should confirm no PII. |
| Tier-3 `.ai_local/` gitignore | **High** | Gitignored by convention. The `.gitignore` entry exists. Developer-local personal context is never committed. |
| `registry.md` | **Medium** | Contains repository names and adoption dates. No PII expected. |

### 5. GitHub Configuration

| Surface | Applicability | Baseline status |
|---------|--------------|-----------------|
| Branch protection | **High** | Not verified at baseline (requires GitHub API / settings access). Phase 03/05 must verify `main` has protection rules. |
| CODEOWNERS | **Medium** | `.github/CODEOWNERS` exists. Content not read at baseline. Phase 03 should verify coverage. |
| Repository visibility | **Medium** | Assumed public (GitHub Pages is published). Phase 05 should confirm intended visibility. |
| Dependabot | **Low** | No Dependabot config observed at baseline. With zero production deps, risk is low. Phase 05 should note. |

### 6. Supply Chain

| Surface | Applicability | Baseline status |
|---------|--------------|-----------------|
| Zero production npm dependencies | **Low risk** | No `node_modules` or production deps. Eliminates most supply chain risk. |
| GitHub Actions supply chain | **Medium** | Uses `actions/checkout@v4`, `ruby/setup-ruby@v1`. Not commit-SHA pinned. Phase 05 should assess. |
| Jekyll gems supply chain | **Low** | Well-known gems (`jekyll`, `just-the-docs`, `jekyll-seo-tag`). Phase 05 should verify no unusual transitive deps. |

---

## Summary

| Category | Surface count | Phase 05 review priority |
|----------|--------------|--------------------------|
| Secret hygiene | 5 | High |
| CI/CD pipeline | 5 | High |
| CLI / script security | 4 | High |
| Data / PII | 4 | Medium |
| GitHub config | 5 | Medium |
| Supply chain | 3 | Low-Medium |

**Deeper review pending Phase 05.**
