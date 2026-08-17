# Changelog

All notable changes to the AI Context Framework will be documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

**Note on release history:** As of 2026-08-17, this project has not yet established a formal versioned release history with git tags. The `package.json` declares version `0.1.0` and distribution is via git install (`github:DevonAleshireMSFT/ai-context-framework`). A `CHANGELOG.md` is being introduced now as a readiness artifact; historical entries below reflect the commit log rather than tagged releases. Formal semantic versioning and tagged releases are roadmap items.

---

## [Unreleased]

### Added
- `SECURITY.md` — vulnerability reporting policy, supported versions, scope
- `SUPPORT.md` — community support channels, scope of support, what is not supported
- `CHANGELOG.md` — this file; release history placeholder
- `docs/responsible-ai.md` — responsible AI guidance for the framework and adopters: human review requirement, model limitations, output accountability, fairness guidance, privacy/PII, RAG/retrieval considerations
- Squad optional: `ai-context init` and `ai-context update` detect and preserve `.squad/` without requiring it; report `squad: detected` or `squad: not detected (optional)`
- Setup prompt template (`templates/setup-prompt.md.template`) — Copilot agent mode prompt for generating `.ai/` files
- GitHub Actions: all `uses:` references SHA-pinned (supply chain hardening, Phase 05)
- Mermaid architecture diagrams with accessible text descriptions in `docs/architecture.md`
- Validation scripts: `check-drift.mjs`, `check-staleness.mjs`, `check-links.mjs`
- Staleness CI workflow with issue-creation integration
- `docs/` Pages site: Getting Started, CLI, Architecture, Automation, Copilot Integration, Governance, Implementations, RAG Integration

### Changed
- `copilot-instructions.md.template` updated: AI output is explicitly a draft requiring human review; Copilot is "instructed to" not "will"; model limitation notice added
- README: behavioral examples qualified as illustrative; known limitations section added; Copilot compliance language softened to "instructed to … and typically does so"
- `.github/copilot-instructions.md` managed-block updated to match template
- All 7 GitHub Actions workflows: action SHA-pinned (supply chain hardening)
- `.mcp.json`: `@bradygaster/squad-cli` dist-tag `insider` replaced with pinned `@0.11.0` (SEC-01)
- `docs/implementations.md`: permalink normalized (trailing slash removed)
- `docs/getting-started.md`: prerequisites section added
- `docs/_config.yml`: `aux_links_new_tab: false`; nav_order corrections

### Fixed
- `.gitignore`: added `*.tgz` exclusion (prevents accidental `npm pack` artifact commit)
- `package.json`: `"license": "MIT"` field added for machine-readable license identification
- `docs/ngAIO-project-understanding.md`: moved from Pages-published `docs/` to internal review artifact path; was publicly accessible at Pages URL without nav link

### Removed
- `PROPOSED: confirm` annotations in `.ai/context.md` (confirmed against implementation and accepted ADRs in Phase 02)

---

## Prior Development

Commits on the `main` branch and the `squad/ip-readiness-review` branch represent iterative development. Key commit milestones (not tagged releases):

| Commit | Message |
|--------|---------|
| `9a84378` | fix: make Squad integration optional (#46) |
| `b3ae13c` | docs: align distribution references with ADR-0003 (#45) |
| `3745491` | docs(adr): reconcile distribution decision with git-install reality (#43) |
| `da4b98f` | chore: normalize line endings via .gitattributes (#41) |
| `8099026` | docs: use git install instead of unpublished npx package (#39) |
| `90804fe` | fix(cli): merge managed block into existing copilot-instructions on init (#38) |
| `8afda91` | feat(setup): codebase-first first-pass context agent + init next-steps (#37) |
