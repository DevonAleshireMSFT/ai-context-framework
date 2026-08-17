# Dependency Inventory

**Generated:** 2026-08-16
**Sources:** `package.json`, `docs/Gemfile`, `docs/_config.yml`, `.github/workflows/`, `bin/`, `scripts/`

---

## Node.js / npm (package.json)

| Field | Value |
|-------|-------|
| Package name | `@devonaleshiremsft/ai-context` |
| Version | `0.1.0` |
| Type | ESM (`"type": "module"`) |
| Private | `true` (not published to npm registry) |
| Node requirement | `>=18` |
| Binary | `ai-context` → `./bin/ai-context.mjs` |

### Production Dependencies

**None.** The CLI and scripts use only Node built-in modules.

### Development Dependencies

**None declared in `package.json`.** Tests run with native `node --test` (no Jest, Mocha, etc.).

### npm Scripts

| Script | Command |
|--------|---------|
| `validate:ai-context` | `node scripts/validate-ai-context.mjs` |
| `check:drift` | `node scripts/check-drift.mjs` |
| `check:links` | `node scripts/check-links.mjs` |
| `validate:registry` | `node scripts/validate-registry.mjs` |
| `validate` | `validate:ai-context && check:links` |
| `test` | `node --test` |

### Distribution

- **Primary:** `npm i -g github:DevonAleshireMSFT/ai-context-framework` (git install, ADR-0003)
- **Alternative `npx`:** `npx github:DevonAleshireMSFT/ai-context-framework <command>`
- **npm feed:** Deferred to backlog (ADR-0002 superseded by ADR-0003)
- **Tarball:** Deferred to backlog

---

## Ruby / GitHub Pages (docs/Gemfile + docs/_config.yml)

| Gem | Version constraint | Purpose |
|-----|--------------------|---------|
| `jekyll` | `~> 4.3` | Static site generator |
| `just-the-docs` | `~> 0.10` | Jekyll theme for documentation sites |
| `jekyll-seo-tag` | unversioned (plugin) | SEO metadata generation |

**Ruby version for CI:** `3.3` (set in pages.yml workflow)

**Jekyll config:**
- `baseurl`: `/ai-context-framework`
- `url`: `https://DevonAleshireMSFT.github.io`
- `theme`: `just-the-docs`
- `plugins`: `jekyll-seo-tag`

---

## GitHub Actions / Workflows

### `.github/workflows/pages.yml` — Deploy GitHub Pages

| Dependency | Version / Detail |
|------------|-----------------|
| `actions/checkout` | `@v4` |
| `ruby/setup-ruby` | `@v1` — Ruby 3.3 |
| GitHub Pages environment | `github-pages` environment |
| `actions/configure-pages` | (used for Pages config) |
| `actions/upload-pages-artifact` | (used for artifact upload) |
| `actions/deploy-pages` | (used for deployment) |
| Trigger | Push to `main`, `workflow_dispatch` |
| Permissions | `contents: read`, `pages: write`, `id-token: write` |
| Node env | `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` |

### `.github/workflows/ai-context-conformance.yml` — Blocking Conformance Gate

| Dependency | Version / Detail |
|------------|-----------------|
| `actions/checkout` | `@v4` |
| Runner | `ubuntu-latest` |
| Node version | Not pinned separately — uses repo's Node >=18 assumption |
| Trigger | PRs to `main` (paths: `.ai/**`, `templates/**`, `org/**`, `docs/**`, `examples/**`, `registry.md`, `README.md`, `CONTRIBUTING.md`, `scripts/**`, `package.json`, etc.) |
| Permissions | `contents: read` |

### `.github/workflows/ai-context-staleness.yml` — Staleness Review

| Dependency | Detail |
|------------|--------|
| Trigger | Weekly schedule (cron) |
| Purpose | Opens a GitHub issue if `.ai/context.md` is stale past review cadence |

### Squad Workflows

| Workflow | Purpose |
|----------|---------|
| `squad-heartbeat.yml` | Periodic Squad health check |
| `squad-issue-assign.yml` | Auto-assign issues to squad members |
| `squad-triage.yml` | Issue triage automation |
| `sync-squad-labels.yml` | Synchronize repository labels |

---

## Build / Test Tools

| Tool | Version / Source | Purpose |
|------|-----------------|---------|
| Node.js | `>=18` (engines field) | Runtime for CLI, scripts, and tests |
| `node --test` | Built-in (Node >=18) | Native test runner — no framework needed |
| Ruby | `3.3` (workflow pinned) | GitHub Pages docs build only |
| Jekyll | `~> 4.3` | Docs site build only |

---

## Optional: Azure AI Search Example

| Dependency | Detail |
|------------|--------|
| `examples/azure-ai-search/ingest-ai-context.mjs` | Ingestion script |
| Azure AI Search SDK | **Not bundled.** The example script imports `@azure/search-documents` — adopters must install this in their own project. Not a framework dependency. |
| `examples/azure-ai-search/index-schema.json` | Schema definition (no runtime dependency) |

---

## Dependency Risk Summary

| Category | Risk | Notes |
|----------|------|-------|
| Production npm deps | **None** | Zero-dependency design — low risk |
| Dev npm deps | **None** | Native test runner — low risk |
| Ruby / Jekyll | Low | Docs build only; well-maintained; version-pinned |
| GitHub Actions | Low | All using major-version pins (v4, v1) |
| Node runtime | Low | >=18 is broadly supported LTS |
| Azure AI Search SDK | Not applicable | Example only; not distributed with framework |
