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

