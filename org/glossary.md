# Enterprise Glossary

**Owner:** Architecture Team  
**Review Cadence:** When new enterprise-wide terms are adopted  
**Applies to:** All repositories registered in the registry

---

## Purpose

This glossary defines terms used across AI context documents in this enterprise. Project-level terminology belongs in the project's `.ai/domain.md`. Enterprise-level terms that apply across multiple projects belong here.

---

## Framework Terms

| Term | Definition |
|------|-----------|
| **AI Context** | Structured documentation written to be consumed by AI assistants. Derived from authoritative sources; not itself authoritative. |
| **Tier-1 Context** | Enterprise-wide AI context maintained in this centralized repository. |
| **Tier-2 Context** | Project-specific AI context maintained in a repository's `.ai/` directory. |
| **Tier-3 Context** | Developer-personal working memory maintained locally in `.ai_local/` and never committed. |
| **Bootstrap Document** | The `context.md` file. The first file an AI reads to orient itself to a project. |
| **ADR** | Architecture Decision Record. A structured document capturing what was decided, why, and what was rejected. |
| **Context Drift** | The condition where AI context documents no longer accurately reflect the current state of the system they describe. |
| **Authoritative Source** | The canonical, committed record of a fact — code, schema, official documentation. AI context is derived from, not a replacement for, authoritative sources. |
| **Working Memory** | Temporary, personal, developer-owned context stored in `.ai_local/`. Never committed. |
| **Schema Owner** | The role responsible for maintaining `data-model.md` and reviewing schema-related PRs. |
| **Staleness** | The state of a `.ai/` document whose `last-updated` date is more than two sprints old and whose governed system has changed. |

---

## Add Enterprise Terms Here

Add terms that apply across multiple project repositories. For project-specific terminology, use the project's `.ai/domain.md`.

| Term | Definition |
|------|-----------|
| *(add terms here)* | |
