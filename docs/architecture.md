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

This is your personal working memory. It is never shared and never committed. Keep it as messy as you need.

### Tier 1 — Enterprise Standards *(optional, multi-repo)*

**Scope:** Organization-wide  
**Owner:** Architecture / Governance team  
**Location:** Centralized repository (this repo)  
**Contents:** Standards, templates, governance model, enterprise glossary, repository registry

This tier is only needed when multiple project repositories adopt the framework and you want consistent standards across all of them. Changes to Tier 1 affect all downstream projects.

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
