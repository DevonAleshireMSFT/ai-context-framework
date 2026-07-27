# Squad Decisions

## Active Decisions

## Governance

- All meaningful Squad process changes require team consensus
- Record team/process decisions here
- Link to Product ADRs such as [ADR-0001](../.ai/adr/0001-ai-squad-boundary.md); do not restate product decisions, rationale, consequences, or alternatives
- Keep history focused on work, decisions focused on execution consequences

### 2026-07-25T01:08:38-07:00: AI Context Framework / Squad boundary (consolidated)
**By:** Carlsen, Fact Checker, Kasparov
**What:** Adopted the `.ai/` ⇄ `.squad/` boundary and applied it across framework docs, templates, routing, and skills. See [ADR-0001](../.ai/adr/0001-ai-squad-boundary.md).

### 2026-07-25: Tier-3 personal context stays a sibling `.ai_local/`, not `.ai/local/`
**By:** Fischer (Coordinator), on team recommendation from Carlsen (standards) + Tal (tooling)
**What:** Personal/local context lives in a top-level sibling directory `.ai_local/` — it is NOT nested under `.ai/` as `.ai/local/`.
**Why:** A sibling is automatically excluded from every `.ai/**` glob the framework relies on:
- RAG indexer `examples/azure-ai-search/ingest-ai-context.mjs` walks `.ai/**/*.md` (lines ~18-27, 128-129) and would otherwise index personal content.
- The conformance CI path filter and `git add .ai/` staging would sweep it in.
Nesting under `.ai/` would force an explicit exclude in the indexer, the CI filter, `.gitignore`, and every future `.ai/**` scanner. The sibling keeps personal context invisible to tooling by default (secure/private-by-default). See `docs/architecture.md` Tier-3 (`tier-3--personal-context`).


### 2026-07-26T00:04:33-07:00: Framework distribution execution contract (consolidated)
**By:** Carlsen, Kasparov, Polgar, Fact Checker
**What:** Framework distribution product details live in [ADR-0002](../.ai/adr/0002-framework-distribution.md). For team execution, use the scoped package name `@devonaleshiremsft/ai-context` after Fact Checker found the unscoped `ai-context` npm name was taken.
**Why:** Linking the ADR keeps product rationale in one source of truth, while recording the collision lesson and scoped-name execution contract for future tooling and review work.

### 2026-07-26T00:04:33-07:00: Schema compatibility contract for drift checks
**By:** Tal, Polgar, Kasparov
**What:** Schema compatibility is governed by explicit `MAJOR.MINOR` comparison: patch releases are compatible, prereleases of the current major/minor warn, and incompatible major/minor drift is reported distinctly.
**Why:** Polgar caught that the original schema comparison ignored patch/prerelease behavior; the revised contract makes validator warnings predictable for release and update automation.

### 2026-07-26T00:04:33-07:00: CLI managed-vs-owned file contract
**By:** Tal, Polgar, Fact Checker
**What:** The CLI treats project `.ai/**` content as adopter-owned and preserves it byte-for-byte. Only manifest-managed framework files are initialized or updated; `.github/copilot-instructions.md` is merged through a bounded BEGIN/END block, `--dry-run` is non-mutating, `--strict` controls check behavior, and `.ai-context.json` records the installed stamp.
**Why:** This contract lets automation update framework scaffolding without overwriting local project context, making `init`, `update`, and `check` safe and idempotent.
