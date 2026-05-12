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

## Two Axes

Every document in your system lives somewhere on this axis:

```
Authoritative  ←————————————————→  Working Memory
(code, schema, ADRs)               (AI context, session notes)
```

**Authoritative** documents are the source of truth. They are committed, reviewed, and governed like production code. Examples: your database schema, your codebase, your official architecture diagrams.

**Working Memory** documents are derived from authoritative sources. They are optimized for AI consumption, not human governance. Examples: `.ai/context.md`, `.ai/data-model.md`, session summaries.

The strict rule: **AI context is always on the right side of this axis.** The moment a team starts treating `.ai/context.md` as the source of truth for their schema, the system has failed.

---

## Three Tiers

The framework organizes AI context into three tiers with different scopes, owners, and locations.

### Tier 1 — Enterprise Context

**Scope:** Organization-wide  
**Owner:** Architecture / Governance team  
**Location:** Centralized repository (this repo)  
**Contents:** Standards, templates, governance model, enterprise glossary, repository registry

This is the foundation. All project repositories inherit from Tier 1. Changes to Tier 1 require Architecture Team review.

### Tier 2 — Project Context

**Scope:** Per-repository  
**Owner:** Tech Lead + domain owners  
**Location:** `.ai/` directory, committed to source control  
**Contents:** Project context, domain terminology, schema, security, decisions, debt, pipelines

This is where the day-to-day AI context lives. It is team-owned, reviewed in PRs, and updated on event-driven triggers.

### Tier 3 — Personal Context

**Scope:** Per-developer  
**Owner:** Individual developer  
**Location:** `.ai_local/` directory, gitignored, never committed  
**Contents:** Sprint notes, AI session summaries, scratch ideas, local troubleshooting

This is ephemeral working memory. It is never shared and never committed. Each developer maintains their own personal context independently.

---

## Federation Model

The framework scales across an enterprise through federation:

```
Tier 1: ai-context-framework/     ← enterprise standards (centralized)
              ↓
Tier 2: solution-repo-A/.ai/      ← project context (per repo)
         solution-repo-B/.ai/
         solution-repo-C/.ai/
              ↓
Tier 3: .ai_local/                ← personal context (per developer, gitignored)
```

Each project repository:
- Adopts the templates from the enterprise repo
- Maintains its own `.ai/` independently
- Registers in the enterprise `registry.md`
- Follows the standards from `org/standards.md`

Changes to project context do not require enterprise repo PRs. Changes to enterprise standards affect all projects and require Architecture Team review.

---

## Per-Repository Structure

When a project repo adopts this framework, it gains this structure:

```
/
├── .ai/                          # Tier 2 — committed, team-owned
│   ├── context.md                # Primary AI bootstrap — read first
│   ├── domain.md                 # Domain terminology
│   ├── data-model.md             # Schema and naming conventions
│   ├── security.md               # Security roles and constraints
│   ├── pipelines.md              # ALM and deployment standards
│   ├── debt.md                   # Technical debt register
│   ├── onboarding.md             # Developer onboarding guide
│   ├── bootstrap-prompt.md       # AI session startup prompt
│   └── decisions/
│       └── adr-001-*.md          # Architecture Decision Records
│
├── .ai_local/                    # Tier 3 — gitignored, never committed
│   ├── working-notes.md
│   ├── scratch.md
│   └── session-summaries/
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

ADRs use YAML frontmatter so they are machine-readable and indexable. They are stored in `.ai/decisions/adr-NNN-title.md` with sequential zero-padded numbering.

ADRs are **never deleted** — superseded ADRs are marked with `status: superseded` and a reference to the new ADR.
