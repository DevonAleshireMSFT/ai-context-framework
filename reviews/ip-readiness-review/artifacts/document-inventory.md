# Document Inventory

**Generated:** 2026-08-16
**Method:** Directory traversal + content sampling during baseline discovery.
**Note on `.squad/`:** Squad agent histories are intentionally excluded from detail inventory. `.squad/` is AI team execution state, not product documentation. Only paths, categories, and purposes are listed.

---

## Category: README Files

| Path | Purpose | Notes |
|------|---------|-------|
| `README.md` | Main repository landing page — product overview, audience, quick setup, governance | Primary first-contact document |
| `examples/azure-ai-search/README.md` | Azure AI Search integration guide | Example-specific docs |

---

## Category: Docs Site (GitHub Pages)

All files under `docs/` are published via GitHub Pages at https://devonaleshiremsft.github.io/ai-context-framework/

| Path | Purpose | Notes |
|------|---------|-------|
| `docs/index.md` | Site home page | Jekyll front matter: `layout: home` |
| `docs/getting-started.md` | Quickstart guide for new adopters | Core user journey doc |
| `docs/cli.md` | CLI reference (`init`, `update`, `check`) | Covers `bin/ai-context.mjs` |
| `docs/architecture.md` | Three-tier model, Tier boundaries, authoritative vs. working memory axes | **Pre-existing dirty change at baseline** |
| `docs/automation.md` | CI, validation scripts, staleness automation | Covers `.github/workflows/` |
| `docs/copilot-integration.md` | GitHub Copilot-specific integration guidance | Covers `.github/copilot-instructions.md` |
| `docs/governance.md` | Multi-repo governance model, enterprise adoption | Tier-1 context |
| `docs/implementations.md` | Implementation patterns and examples | Cross-reference to examples/ |
| `docs/rag-integration.md` | RAG / Azure AI Search integration guidance | Cross-reference to examples/azure-ai-search/ |
| `docs/responsible-ai.md` | Responsible AI guidance: human review, model limitations, accountability, fairness, privacy, RAG, no compliance claim | **Created Phase 08** (nav_order: 9, permalink: `/responsible-ai`) |
| `docs/_config.yml` | Jekyll / Just the Docs theme configuration | Not user-facing content |
| `docs/Gemfile` | Ruby gem dependencies for GitHub Pages build | Build configuration |
| `docs/ngAIO-project-understanding.md` | **Untracked at baseline — pre-existing. MOVED in Phase 07.** Internal project understanding / readiness assessment document. No Jekyll front matter. Was in published docs/ root. Not linked from site nav. **Phase 07: BLOCKING — exposed as public Pages URL. Moved to `reviews/ip-readiness-review/artifacts/ngAIO-project-understanding.md` (internal review artifact, not Pages content).** |

---

## Category: Architecture

| Path | Purpose | Notes |
|------|---------|-------|
| `docs/architecture.md` | Canonical three-tier architecture definition | See docs site above |
| `.ai/context.md` (Architecture Summary) | Condensed architecture summary for AI context | Pre-existing dirty change |

---

## Category: Product ADRs

| Path | Purpose | Notes |
|------|---------|-------|
| `.ai/adr/0001-ai-squad-boundary.md` | Defines `.ai/` vs `.squad/` boundary | Accepted |
| `.ai/adr/0002-framework-distribution.md` | npm CLI distribution approach | Superseded by 0003 |
| `.ai/adr/0003-git-install-primary-distribution.md` | Git install as primary channel | Accepted |

---

## Category: AI / Product Context (`.ai/`)

| Path | Purpose | Notes |
|------|---------|-------|
| `.ai/context.md` | Durable product context: what/why/rules/gotchas/ADRs | Pre-existing dirty change; contains `PROPOSED` annotations |
| `.ai/adr/` | Product ADR directory | See ADR category above |

Optional `.ai/` files (domain.md, data-model.md, security.md, pipelines.md) are intentionally omitted — equivalent content lives in `org/` and `docs/`.

---

## Category: Templates / Prompts

| Path | Purpose | Notes |
|------|---------|-------|
| `templates/context.md.template` | Primary `.ai/context.md` template for adopters | Core distribution artifact |
| `templates/adr.md.template` | ADR template | Adopter use |
| `templates/data-model.md.template` | Optional data model template | |
| `templates/domain.md.template` | Optional domain glossary template | |
| `templates/security.md.template` | Optional security template | |
| `templates/pipelines.md.template` | Optional pipelines template | |
| `templates/onboarding.md.template` | Optional onboarding template | |
| `templates/debt.md.template` | Optional tech debt template | |
| `templates/ai_local-readme.md.template` | Tier-3 local README template | |
| `templates/copilot-instructions.md.template` | Copilot instructions template (managed block) | Rewritten by `ai-context update` |
| `templates/bootstrap-prompt.md.template` | Bootstrap prompt for new repos | |
| `templates/setup-prompt.md.template` | Setup prompt | Pre-existing dirty change |
| `.github/prompts/ai-context-setup.prompt.md` | Copilot prompt file | Listed; untracked at baseline |

---

## Category: Governance / Standards

| Path | Purpose | Notes |
|------|---------|-------|
| `org/standards.md` | Core standards: front matter, file naming, secret/PII rules | Architecture Team owned; requires review for changes |
| `org/governance.md` | Enterprise governance model | Architecture Team owned |
| `org/platform.md` | Platform guidance | Architecture Team owned |
| `org/glossary.md` | Enterprise vocabulary / glossary | Architecture Team owned |
| `registry.md` | Repository adoption registry | Adoption date recorded as `2026-05-12`; registry validation passes |

---

## Category: Contribution / Release / Support

| Path | Purpose | Notes |
|------|---------|-------|
| `CONTRIBUTING.md` | Contribution workflow, standards, Squad integration | Governance |
| `SECURITY.md` | Security policy: supported versions, vulnerability reporting, scope | Created Phase 08 |
| `SUPPORT.md` | Support scope: community best-effort, channels, what is not supported | Created Phase 08 |
| `CHANGELOG.md` | Release history: Unreleased structure; formal tags not yet established | Created Phase 08 |

---

## Category: GitHub Docs

| Path | Purpose | Notes |
|------|---------|-------|
| `.github/PULL_REQUEST_TEMPLATE.md` | PR checklist | Pre-existing dirty change |
| `.github/copilot-instructions.md` | Copilot workspace instructions (managed block) | Pre-existing dirty change; rewritten by `ai-context update` |
| `.github/CODEOWNERS` | Code ownership | Configuration |

---

## Category: `.squad/` — AI Team Execution State

**This is NOT product documentation.** `.squad/` is Squad working state: how the AI team was routed, what work was done, team identity and configuration. It is portable team process state, not IP.

| Path | Category | Purpose |
|------|----------|---------|
| `.squad/team.md` | Team roster | Agent capabilities and routing |
| `.squad/routing.md` | Routing rules | Work assignment logic |
| `.squad/decisions.md` | Decision log | Links to product ADRs; does not restate them |
| `.squad/ceremonies.md` | Ceremonies | Team rituals and cadence |
| `.squad/agents/{name}/charter.md` | Agent charters | Individual agent capabilities |
| `.squad/agents/{name}/history.md` | Agent histories | **Pre-existing dirty changes; not inventoried in detail** |
| `.squad/casting/` | Casting | Agent identity registry |
| `.squad/fact-checker/` | Fact-checker state | Policy and audit trail |
| `.squad/rai/` | RAI state | Policy and audit trail |
| `.squad/identity/` | Identity | `now.md` (pre-existing dirty), `wisdom.md` |
| `.squad/log/`, `.squad/orchestration-log/` | Logs | Gitignored runtime output |
| `.squad/memory/` | Memory | Partially gitignored runtime state |
| `.squad/templates/` | Squad templates | Internal Squad template library |

---

## Summary Counts

| Category | Document count |
|----------|---------------|
| README files | 2 |
| Docs site pages | 9 + 2 config |
| Architecture | 1 (+ context.md reference) |
| Product ADRs | 3 |
| AI/Product context | 1 (+3 ADRs counted above) |
| Templates / Prompts | 13 |
| Governance / Standards | 5 |
| Contribution / Release | 1 |
| GitHub docs | 3 |
| `.squad/` (team state, paths only) | ~15 categories |
| **Total product documents** | **~38** |
