# Azure AI Search example

This directory supports the [Azure AI Search / RAG guidance](../../docs/rag-integration.md).

## Files

- `index-schema.json` — minimal Azure AI Search index schema for committed `.ai/` Markdown chunks.
- `ingest-ai-context.mjs` — reference Node.js ingestion script using only built-in modules.

## Run

Create the index in Azure AI Search using `index-schema.json`, then run the ingestion example from the repository root:

```powershell
$env:AZURE_SEARCH_ENDPOINT = "https://<service-name>.search.windows.net"
$env:AZURE_SEARCH_API_KEY = "<admin-or-indexing-key>"
$env:AZURE_SEARCH_INDEX = "ai-context"
node examples\azure-ai-search\ingest-ai-context.mjs
```

If `AZURE_SEARCH_ENDPOINT` or `AZURE_SEARCH_API_KEY` is not set, the script prints sample documents instead of pushing them.

## Governance boundary

The example walks only committed `.ai/**/*.md` files. Do not index `.ai_local/`, secrets, credentials, connection strings, environment values, or PII.
