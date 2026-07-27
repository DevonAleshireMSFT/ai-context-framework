---
layout: default
title: Architecture
nav_order: 3
permalink: /architecture
---

# Architecture
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Core Principle

AI context documents are derived from authoritative sources — not replacements for them.

The authoritative record of your system lives in committed code, schema definitions, and official documentation. AI context summarizes and links to those sources so that an AI assistant can consume a reliable, grounded snapshot of the system at the start of a session.

These two things must never be merged. When they are, AI context starts competing with authoritative docs — and loses, because it becomes stale faster.

---

## `.ai/` and `.squad/` Boundary

The framework separates durable product knowledge from AI-team working state.

| Question | `.ai/` | `.squad/` |
|----------|-------|-----------|
| Answers | WHAT the product is and WHY constraints exist | HOW the AI team works, decided, and did the work |
| Audience | Anyone — human or AI — modifying the code | The AI team and PM |
| Lifespan | Durable, reviewed product knowledge; portable without Squad | Working log and team process state |
| Decisions = | Product ADRs in `.ai/adr/NNNN-title.md` | Links to ADRs; never restates product decisions |

Product ADRs in `.ai/adr/` are authoritative for decisions they record. `.squad/decisions.md` may link to them and record Squad execution consequences, but it must not duplicate the product decision.

---

## Two Axes

Every document in your system lives somewhere on this axis:

```
Authoritative  ←————————————————→  Working Memory
(code, schema, Product ADRs)       (AI context summaries, session notes)
```

**Authoritative** documents are the source of truth. They are committed, reviewed, and governed like production code. Examples: your database schema, your codebase, your official architecture diagrams.

**Working Memory** documents are derived from authoritative sources. They are optimized for AI consumption, not human governance. Examples: `.ai/context.md`, `.ai/data-model.md`, session summaries.

The strict rule: **AI context summaries are on the right side of this axis.** Product ADRs in `.ai/adr/` are the exception: they are authoritative for the decisions they record. The moment a team starts treating `.ai/context.md` as the source of truth for schema, the system has failed.

---

## Three Tiers

The framework organizes AI context into three tiers. For a solo developer or small team, you only use Tier 2 and Tier 3. Tier 1 is optional and only relevant when managing AI context governance across multiple repositories.

### Tier 2 — Project Context *(start here)*

**Scope:** Per-repository  
**Owner:** You, or whoever leads the project  
**Location:** `.ai/` directory, committed to source control  
**Contents:** Project context, Product ADRs, and optional detail files such as domain, schema, security, and pipelines

This is where the day-to-day AI context lives. It is committed, reviewed in PRs, and updated when the system changes. A solo developer has full ownership of this tier.

### Tier 3 — Personal Context

**Scope:** Per-developer  
**Owner:** Individual developer  
**Location:** `.ai_local/` directory, gitignored, never committed  
**Contents:** Sprint notes, AI session summaries, scratch ideas, local troubleshooting

This is your personal working memory. It is never shared and never committed. See the [Tier 3 contract](#tier-3-ai-local) for boundaries and lifecycle.

### Tier 1 — Enterprise Standards *(optional, multi-repo)*

**Scope:** Organization-wide  
**Owner:** Architecture / Governance team  
**Location:** Centralized repository (this repo)  
**Contents:** Standards, templates, governance model, enterprise glossary, repository registry

This tier is only needed when multiple project repositories adopt the framework and you want consistent standards across all of them. Changes to Tier 1 affect all downstream projects.

Tier 1 tooling has its own `FRAMEWORK_VERSION`, while the Tier 2 `.ai/` frontmatter contract has a `SCHEMA_VERSION`. Consumer repositories keep their Tier 2 content durable and project-owned; the framework-managed `.ai-context.json` stamp records only installed tooling/schema versions for drift checks, per [ADR-0002](../.ai/adr/0002-framework-distribution.md).

---

## Tier 3: `.ai_local/` — Developer-Local Working Memory
{: #tier-3-ai-local }

Tier 3 is private, per-developer scratch context that a local AI assistant may read to understand the developer's current working state. It can contain personal notes, in-progress investigation notes, local environment quirks, throwaway prompts, and other disposable context that should not become shared project knowledge.

`.ai_local/` is never committed, never shared, and never authoritative.

### What belongs here

- Personal working notes and scratch hypotheses.
- In-progress investigation notes that are not ready for the team.
- Local environment quirks, non-secret machine setup notes, and workflow preferences.
- Throwaway prompts, AI session notes, and temporary summaries.

### What does not belong here

- Authoritative standards or enterprise policy. Those belong in Tier 1 `org/`.
- Durable project context or product decisions. Product ADRs belong in `.ai/adr/`.
- Squad team decisions, routing, ceremonies, or execution logs. Those belong in `.squad/`; see [ADR-0001](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/.ai/adr/0001-ai-squad-boundary.md).
- Secrets, credentials, tokens, connection strings, private keys, or other sensitive values.

### Relationship to other memory surfaces

| Surface | Audience | Lifespan | Sharing model | Source control |
|---------|----------|----------|---------------|----------------|
| Tier 1 `org/` | Enterprise and adopter repositories | Long-lived standards | Shared across repositories | Committed |
| Tier 2 `.ai/` | Humans and AI assistants working on one repository | Durable project knowledge; Product ADRs are authoritative for their decisions | Shared within the project | Committed |
| Tier 3 `.ai_local/` | One developer and their local assistant | Disposable working memory | Private to one machine/developer | Gitignored |
| `.squad/` | Squad AI team and PM | Shared AI-team working log and process state | Shared with the repository's Squad workflow | Partially committed; runtime state gitignored |

The `.ai/` and `.squad/` boundary is defined in [ADR-0001](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/.ai/adr/0001-ai-squad-boundary.md). Tier 3 is separate from both: it is developer-private working memory, not shared product context and not shared Squad state.

### Lifecycle and precedence

Developers may create `.ai_local/` ad hoc when they need it. It is gitignored by design, safe to delete at any time, and must never be required for another developer, CI job, AI agent, or shared workflow to complete work.

When guidance conflicts, precedence is:

1. Tier 1 `org/`
2. Tier 2 `.ai/`
3. Tier 3 `.ai_local/`

Tier 3 may specialize authoritative guidance for one developer's local workflow, but it must never override enterprise standards, project context, or Product ADRs.

### Secret handling

`.ai_local/` is local, but it is still not a secret store. Do not write secrets, credentials, tokens, connection strings, private keys, or other sensitive values into it. Use approved secret-management mechanisms and checked-in examples such as `.env.example` for schema guidance.

---

## Advanced: Multi-Repository Federation

When you have multiple project repositories, the framework scales through federation. This repo becomes the centralized Tier 1 that all project repos inherit from.

```
Tier 1: ai-context-framework/     ← enterprise standards (centralized)
              ↓
Tier 2: solution-repo-A/.ai/      ← project context (per repo)
         solution-repo-B/.ai/
         solution-repo-C/.ai/
              ↓
Tier 3: .ai_local/                ← personal context (per developer, gitignored)
```

Each project repository adopts the templates, maintains its own `.ai/` independently, and registers in `registry.md`. Changes to project context do not require enterprise repo PRs. Changes to enterprise standards affect all projects.

**Only set this up when you need it.** A single repo works perfectly with just Tier 2 and Tier 3.

---

## Per-Repository Structure

When a project repo adopts this framework, it gains this structure:

```
/
├── .ai/                          # Committed, team-owned AI context
│   ├── context.md                # Primary AI bootstrap — read first
│   ├── adr/                      # Product Architecture Decision Records
│   │   └── 0001-*.md
│   └── ...                       # Optional detail files when needed
│
├── .ai_local/                    # Personal context — gitignored, never committed
│   ├── working-notes.md
│   ├── scratch.md
│   └── session-summaries/
│
├── .github/
│   ├── copilot-instructions.md   # Auto-loads context into every Copilot session
│   └── PULL_REQUEST_TEMPLATE.md  # PR checklist
│
└── .gitignore                    # Must include .ai_local/
```

---

## The context.md Bootstrap Document

`context.md` is the most important file in the framework. It is the first file an AI reads when starting a session. If only one file is maintained, this is it.

It must answer:
- What is this project?
- What is the current state?
- What rules must always be followed?
- What are the non-obvious constraints (gotchas)?
- Where do I find more detail?

It must stay **under 500 lines** — detailed information belongs in the linked detail files, not embedded in the bootstrap document.

---

## Architecture Decision Records

ADRs are a key artifact of this framework. Every significant architectural decision gets its own record:

- What was decided
- Why it was decided
- What context existed at the time
- What was rejected and why
- What constraints the decision introduces going forward

ADRs use YAML frontmatter so they are machine-readable and indexable. They are stored in `.ai/adr/NNNN-title.md` with four-digit sequential numbering.

ADRs are **never deleted** — superseded ADRs are marked with `status: superseded` and a reference to the new ADR.
