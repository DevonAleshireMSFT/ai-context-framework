---
layout: home
title: Home
nav_order: 1
permalink: /
---

# AI Context Framework
{: .fs-9 }

Stop explaining your codebase to AI from scratch every session.
{: .fs-6 .fw-300 }

[Get Started](getting-started){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[View on GitHub](https://github.com/DevonAleshireMSFT/ai-context-framework){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## The Problem

Every AI-assisted development session starts the same way: you re-explain the project, the naming conventions, the deprecated tables that can't be renamed, the security constraints, the current priorities. Then you hope the AI doesn't make a mistake because it doesn't actually know your system.

This is not a limitation of the AI. It is a **missing engineering practice**.

**Without structured AI context:**
- Every session starts cold — the AI has no memory of your team's decisions
- Different developers give AI different context, producing inconsistent results
- AI ignores naming conventions it was never told about
- AI confidently renames a table that can't be renamed post go-live
- No one knows if the AI context, if it exists at all, is still accurate

---

## The Solution

The AI Context Framework is a set of standards, templates, and governance patterns for creating and maintaining **AI context as a first-class engineering artifact**.

Instead of improvising at the start of every session, your team maintains a structured `.ai/` directory committed to source control — a permanent, governed, team-owned knowledge base that any AI assistant can consume at the start of any session.

```
.ai/
├── context.md          ← what this project is, its rules, its current state
├── data-model.md       ← schema, naming conventions, deprecated tables
├── security.md         ← roles, access patterns, what AI must never do
├── domain.md           ← the language your team actually uses
├── decisions/          ← why decisions were made, what was rejected
└── ...
```

---

## Key Benefits

**Consistency across the team**
Every developer uses the same grounded context. AI behavior is consistent because the foundation is consistent.

**Sessions that start informed, not blank**
Paste the bootstrap prompt, attach `context.md`, and the AI knows your project before you ask your first question.

**Context that evolves with the codebase**
AI context is updated on the same triggers as the code it describes — schema changes, security changes, architecture decisions — not left to drift.

**Scales from one repo to an enterprise**
A federated model lets you maintain enterprise-wide standards in one place while each project repo owns its specific context.

**Platform-agnostic**
Works with any AI assistant, any language, any platform. The framework is a set of Markdown files and governance practices — not a tool dependency.

---

## How It Works

The framework is organized around **three tiers** and **two axes**.

The three tiers separate enterprise-wide standards from project-specific context from personal working memory. The two axes separate authoritative source-of-truth documentation from AI working memory derived from it.

These are never mixed.

[Learn more about the architecture →](architecture)

---

## What Teams Get Out of the Box

| Artifact | Purpose |
|----------|---------|
| `templates/context.md.template` | Primary AI bootstrap document |
| `templates/data-model.md.template` | Schema and naming convention registry |
| `templates/security.md.template` | Security roles and AI constraints |
| `templates/domain.md.template` | Domain terminology dictionary |
| `templates/adr.md.template` | Architecture Decision Records |
| `templates/debt.md.template` | Technical debt register |
| `templates/bootstrap-prompt.md.template` | AI session startup prompt |
| `org/governance.md` | Ownership model and update triggers |
| `org/standards.md` | Authoring standards and quality checklist |
| `.github/PULL_REQUEST_TEMPLATE.md` | PR checklist for AI context maintenance |

---

## Ready to Start?

[Get Started →](getting-started){: .btn .btn-primary .fs-5 }
