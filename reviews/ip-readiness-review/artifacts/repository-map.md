# Repository Map

**Generated:** 2026-08-16 (updated Phase 03: 2026-08-17)
**Method:** Full directory traversal (3 levels); `.git` internals excluded; secrets/`.env` excluded.

---

## Repository Root

`DevonAleshireMSFT/ai-context-framework`
**Type:** Framework / standards repository — not a deployable application.
**Purpose:** Enterprise framework for governing how AI context is created, maintained, and used across software development projects. Provides templates, standards, CLI tooling, and validation scripts for teams to adopt a consistent `.ai/` context convention.

---

## Folder Inventory

### `.ai/` — Tier-2 Product Context (Durable)

**Purpose:** This repository's own AI context. Durable product knowledge (WHAT the product is and WHY constraints exist). Not to be confused with the templates in `templates/` that adopters copy.

| Path | Content |
|------|---------|
| `.ai/context.md` | Primary product context: architecture, key rules, known gotchas, ADR table. **Pre-existing dirty change at baseline.** |
| `.ai/adr/0001-ai-squad-boundary.md` | ADR: `.ai/` vs `.squad/` boundary |
| `.ai/adr/0002-framework-distribution.md` | ADR: npm CLI distribution (superseded) |
| `.ai/adr/0003-git-install-primary-distribution.md` | ADR: git install as primary channel (accepted) |

**Ownership:** Architecture Team. Changes require Architecture Team review.

---

### `.github/` — GitHub Configuration and CI

**Purpose:** Repository automation, CI/CD workflows, GitHub Copilot instructions, PR templates, and code ownership.

| Path | Content |
|------|---------|
| `.github/CODEOWNERS` | Code ownership assignments |
| `.github/copilot-instructions.md` | GitHub Copilot workspace instructions (managed block). **Pre-existing dirty change at baseline.** |
| `.github/PULL_REQUEST_TEMPLATE.md` | PR checklist template. **Pre-existing dirty change at baseline.** |
| `.github/agents/squad.agent.md` | Squad coordinator agent definition |
| `.github/prompts/` | Copilot prompt files — **Phase 03 resolved: should be tracked; seeded by `ai-context init` from `templates/setup-prompt.md.template`** |
| `.github/skills/` | Squad skill files (active repo copies) |
| `.github/workflows/ai-context-conformance.yml` | Blocking CI: validates `.ai/` conformance on PRs |
| `.github/workflows/ai-context-staleness.yml` | Weekly: opens issue if context is stale |
| `.github/workflows/pages.yml` | Publishes `docs/` to GitHub Pages |
| `.github/workflows/squad-heartbeat.yml` | Squad: periodic health check |
| `.github/workflows/squad-issue-assign.yml` | Squad: auto-assign issues |
| `.github/workflows/squad-triage.yml` | Squad: triage automation |
| `.github/workflows/sync-squad-labels.yml` | Squad: label synchronization |

**Ownership:** Architecture Team / Squad. Workflow changes require review.

---

### `.squad/` — AI Team Execution State (Non-Product)

**Purpose:** Squad working state — how the AI team was routed, what decisions were made during work sessions, team identity. This is NOT product documentation. It is runtime state for the Squad AI team framework.

| Category | Paths |
|----------|-------|
| Team roster and routing | `team.md`, `routing.md`, `ceremonies.md`, `config.json` |
| Agent charters | `agents/{name}/charter.md` |
| Agent histories | `agents/{name}/history.md` — **pre-existing dirty changes at baseline; not product docs; not inventoried in detail** |
| Decisions | `decisions.md`, `decisions/archive/`, `decisions/inbox/` (gitignored) |
| Identity | `identity/now.md` (pre-existing dirty), `identity/wisdom.md` |
| Casting | `casting/policy.json`, `casting/registry.json` |
| Fact-checker | `fact-checker/audit-trail.md`, `fact-checker/policy.md` |
| RAI | `rai/audit-trail.md`, `rai/policy.md` |
| Log / orchestration-log | gitignored runtime output |
| Memory | partially gitignored runtime state |
| Templates | `templates/` — Squad template library (not product templates) |
| Plugins | `plugins/` |

**Ownership:** AI team (Squad). Not subject to Architecture Team product review. Not product IP.

---

### `bin/` — CLI Entry Point

**Purpose:** Dependency-free Node.js CLI (`ai-context init`, `update`, `check`). Published as the `ai-context` binary.

| Path | Content |
|------|---------|
| `bin/ai-context.mjs` | Single-file CLI; uses only Node built-ins; Node >=18 |

**Classification:** Source / Distribution tooling.
**Ownership:** Architecture Team.

---

### `docs/` — GitHub Pages Documentation Site

**Purpose:** Published documentation site (Jekyll / Just the Docs) at https://devonaleshiremsft.github.io/ai-context-framework/. All user-facing guidance lives here.

| Path | Content |
|------|---------|
| `docs/index.md` | Site home page |
| `docs/getting-started.md` | Quickstart guide |
| `docs/cli.md` | CLI reference |
| `docs/architecture.md` | Three-tier model. **Pre-existing dirty change at baseline.** |
| `docs/automation.md` | CI, validation, staleness automation |
| `docs/copilot-integration.md` | Copilot-specific integration guidance |
| `docs/governance.md` | Governance model for multi-repo use |
| `docs/implementations.md` | Implementation examples/patterns |
| `docs/rag-integration.md` | RAG / AI Search integration guidance |
| `docs/_config.yml` | Jekyll site config (Just the Docs theme) |
| `docs/Gemfile` | Ruby gem dependencies for Pages build |
| `docs/ngAIO-project-understanding.md` | **Untracked at baseline — pre-existing.** |

**Classification:** Documentation / Published site.
**Ownership:** Architecture Team + Capablanca (Docs).

---

### `examples/` — Reference Integrations

**Purpose:** Concrete reference implementations for adopters.

| Path | Content |
|------|---------|
| `examples/azure-ai-search/README.md` | Azure AI Search integration guide |
| `examples/azure-ai-search/index-schema.json` | Search index schema |
| `examples/azure-ai-search/ingest-ai-context.mjs` | Ingestion script |

**Classification:** Examples / Reference.
**Ownership:** Architecture Team.

---

### `org/` — Enterprise-Wide Standards

**Purpose:** Tier-1 enterprise standards. Changes require Architecture Team review.

| Path | Content |
|------|---------|
| `org/standards.md` | Core standards (front matter, file naming, secret/PII rules) |
| `org/governance.md` | Governance model |
| `org/platform.md` | Platform guidance |
| `org/glossary.md` | Enterprise vocabulary |

**Classification:** Standards / Governance.
**Ownership:** Architecture Team (changes require review).

---

### `scripts/` — Validation Tooling

**Purpose:** Dependency-free Node.js scripts for validation and drift detection.

| Path | Content |
|------|---------|
| `scripts/validate-ai-context.mjs` | `.ai/` conformance validator. **Pre-existing dirty change.** |
| `scripts/validate-registry.mjs` | `registry.md` validator. **Pre-existing dirty change.** |
| `scripts/check-drift.mjs` | Version drift detector. **Pre-existing dirty change.** |
| `scripts/check-links.mjs` | Link validator. **Pre-existing dirty change.** |
| `scripts/check-staleness.mjs` | Staleness checker. **Pre-existing dirty change.** |
| `scripts/lib/frontmatter.mjs` | Frontmatter parser library. **Pre-existing dirty change.** |
| `scripts/lib/version.mjs` | Version utilities. **Pre-existing dirty change.** |
| `scripts/lib/cli-operations.mjs` | Shared CLI operations |
| `scripts/__tests__/` | Test suite (native `node --test`) |

**Classification:** Source / Tooling.
**Ownership:** Architecture Team.

---

### `templates/` — Adopter Templates

**Purpose:** Files adopters copy into their own repos. All use `.template` extension.

| Path | Content |
|------|---------|
| `templates/context.md.template` | Primary `.ai/context.md` template |
| `templates/adr.md.template` | ADR template |
| `templates/data-model.md.template` | Optional data model template |
| `templates/domain.md.template` | Optional domain glossary template |
| `templates/security.md.template` | Optional security template |
| `templates/pipelines.md.template` | Optional pipelines template |
| `templates/onboarding.md.template` | Optional onboarding template |
| `templates/debt.md.template` | Optional tech debt template |
| `templates/ai_local-readme.md.template` | Tier-3 local README |
| `templates/copilot-instructions.md.template` | Copilot instructions template (managed block) |
| `templates/bootstrap-prompt.md.template` | Bootstrap prompt for new repos |
| `templates/setup-prompt.md.template` | Setup prompt. **Pre-existing dirty change.** |

**Classification:** Templates.
**Ownership:** Architecture Team. Do not edit in-place for a specific project.

---

### Root-Level Files

| Path | Classification | Notes |
|------|---------------|-------|
| `README.md` | Documentation | Main landing page |
| `CONTRIBUTING.md` | Governance | Contribution guidelines |
| `LICENSE` | Legal | License file |
| `registry.md` | Governance | Repository adoption registry; this repository's adoption date is recorded as `2026-05-12` |
| `package.json` | Build / Distribution | `private: true`; no production deps; defines CLI binary and scripts |
| `.gitignore` | Configuration | Excludes Tier-3 personal context, secrets, OS artifacts, Squad runtime state |
| `.gitattributes` | Configuration | Git merge drivers and diff settings |
| `.mcp.json` | Configuration | MCP server configuration for Squad tooling |
| `.copilot/` | Configuration | Copilot agent configuration |
| `.ai-context.json` | **Untracked at baseline** — pre-existing |

---

## Ownership Boundaries

| Boundary | Owner | Change policy |
|----------|-------|--------------|
| `org/` | Architecture Team | Changes require Architecture Team review |
| `.ai/` | Architecture Team | Durable product knowledge; quarterly review cadence |
| `templates/` | Architecture Team | Do not edit for individual projects |
| `bin/`, `scripts/` | Architecture Team | Must remain dependency-free, build-free |
| `docs/` | Architecture Team + Capablanca | Published site; links outside `docs/` require absolute URLs |
| `.squad/` | AI Team (Squad) | Not product IP; not subject to Architecture Team review |
| `.github/workflows/` | Architecture Team | CI changes require review |

---

## Content Classification Summary

| Category | Folders / Files |
|----------|----------------|
| Source | `bin/`, `scripts/` |
| Documentation | `docs/`, `README.md`, `CONTRIBUTING.md` |
| Workflows / CI | `.github/workflows/` |
| Templates | `templates/` |
| Examples | `examples/` |
| Standards | `org/` |
| Product context (Tier 2) | `.ai/` |
| Team execution state (non-product) | `.squad/` |
| Configuration | `.github/`, `.gitignore`, `.gitattributes`, `.mcp.json`, `.copilot/`, `package.json` |
| Generated | None — this repo produces no build artifacts |
| Ignored | `.ai_local/`, `scripts/__tests__/.fixture-*/`, Squad runtime logs |
