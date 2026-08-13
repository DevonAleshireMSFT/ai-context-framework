---
layout: default
title: Azure AI Search / RAG
nav_order: 8
permalink: /rag-integration
---

# Azure AI Search / RAG
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

Indexing `.ai/` into Azure AI Search lets RAG-based assistants ground answers in the same durable product context that `.github/copilot-instructions.md` provides interactively. This is useful for custom copilots, Azure OpenAI On Your Data experiences, and agentic applications that need repository context without asking a developer to paste it into every session.

The search index is a read model over committed AI context. Source control remains the source of truth.

---

## What to index

Only the committed Tier-2 `.ai/` layer is index-eligible.

| Source | Why it's valuable in RAG |
|--------|--------------------------|
| `.ai/context.md` | Provides the project overview, current state, key rules, and links to deeper context. |
| `.ai/adr/*.md` | Captures durable decisions, status, rationale, and constraints that assistants should respect. |
| Other committed `.ai/*.md` docs | Adds governed domain, schema, security, pipeline, or debt context when a repository opts into those files. |

---

## Ingestion pattern

A minimal ingestion pipeline should:

1. Enumerate committed Markdown files under `.ai/**/*.md`.
2. Split YAML front matter from the Markdown body.
3. Map front-matter keys into index fields such as `title`, `owner`, `context-version`, `last-updated`, `applies-to`, and ADR `status`.
4. Chunk the body into search-sized passages that retain `sourcePath` and metadata.
5. Push documents to an Azure AI Search index with `mergeOrUpload`.

Keep the index fresh by re-running ingestion after merges to `main`, and by using the same staleness cadence described in [Governance](governance#staleness-policy). Azure AI Search is the serving index; `.ai/` remains the reviewed source.

---

## Example

The reference example lives in `examples/azure-ai-search/`:

- `examples/azure-ai-search/index-schema.json` defines a small text index for `.ai/` Markdown chunks.
- `examples/azure-ai-search/ingest-ai-context.mjs` walks `.ai/**/*.md`, parses front matter, chunks content, and pushes documents when Azure Search environment variables are set.
- `examples/azure-ai-search/README.md` explains local usage.

Key schema fields:

```json
{
  "name": "ai-context",
  "fields": [
    { "name": "id", "type": "Edm.String", "key": true, "filterable": true },
    { "name": "title", "type": "Edm.String", "searchable": true, "filterable": true },
    { "name": "content", "type": "Edm.String", "searchable": true },
    { "name": "owner", "type": "Edm.String", "filterable": true },
    { "name": "contextVersion", "type": "Edm.String", "filterable": true },
    { "name": "lastUpdated", "type": "Edm.DateTimeOffset", "filterable": true, "sortable": true },
    { "name": "appliesTo", "type": "Collection(Edm.String)", "filterable": true },
    { "name": "adrStatus", "type": "Edm.String", "filterable": true },
    { "name": "sourcePath", "type": "Edm.String", "filterable": true }
  ]
}
```

Key push shape:

```js
await fetch(`${endpoint}/indexes/${indexName}/docs/index?api-version=2024-07-01`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'api-key': apiKey
  },
  body: JSON.stringify({
    value: docs.map((doc) => ({ '@search.action': 'mergeOrUpload', ...doc }))
  })
});
```

---

## Governance: what may be indexed vs. what stays local

Only committed `.ai/` content may be indexed. Tier-3 `.ai_local/` is never indexed, never committed, and never leaves the developer's machine; see the [Tier-3 contract in Architecture](architecture#tier-3-ai-local).

Do not index credentials, tokens, connection strings, secrets, or PII. Treat the index as another copy of the governed source documents: respect the same ownership, review, and update triggers described in [Governance](governance) and [enterprise governance](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/org/governance.md).

---

## Optional Squad integration

RAG indexing requires only the durable `.ai/` layer. It does not require or index Squad. If [Squad](https://github.com/bradygaster/squad#squad) is installed separately, `.squad/` working state stays outside the index. This preserves the boundary described in [Architecture](architecture#ai-and-squad-boundary) and governed by [Governance](governance#product-adr-review-path): product context and ADRs live in `.ai/`, while Squad process state stays in `.squad/`.
