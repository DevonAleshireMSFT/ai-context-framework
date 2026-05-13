---
layout: home
title: Home
nav_order: 1
permalink: /
---

# AI Context Framework
{: .fs-9 }

Stop explaining your codebase to AI from scratch every session. Structure your project knowledge once — every AI session starts informed.
{: .fs-6 .fw-300 }

[Get Started in 10 Minutes](getting-started#minimum-viable-setup){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[View on GitHub](https://github.com/DevonAleshireMSFT/ai-context-framework){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## Who This Is For

| You are... | What you get |
|-----------|-------------|
| **Solo developer** using Copilot or another AI | A `.ai/` context directory that makes every session project-aware — no repeated explaining |
| **Small team** collaborating on one repo | Shared, committed AI context that keeps everyone's Copilot grounded in the same knowledge |
| **Larger org** with multiple repos | A federated governance model with enterprise-wide standards and a repo registry |

Start with solo or small team. Add federation when you need it.

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

A `.ai/` directory in your repo. A few Markdown files. A committed file that makes GitHub Copilot context-aware automatically.

That's the minimum. The framework scales from a solo developer to a team to an enterprise — but it starts with one repo and one developer in under 10 minutes.

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

**Works immediately — solo or team**
One developer can set this up in 10 minutes. A team gets consistent, grounded Copilot behavior from the first session.

**Sessions that start informed, not blank**
Copilot reads your project context automatically on every session via `.github/copilot-instructions.md` — no manual prompting required.

**Context that evolves with the codebase**
AI context is updated on the same triggers as the code it describes — schema changes, security changes, architecture decisions — not left to drift.

**Scales to an enterprise**
A federated model lets you maintain enterprise-wide standards in one place while each project repo owns its specific context.

**Platform-agnostic**
Works with any AI assistant, any language, any platform. The framework is a set of Markdown files and governance practices — not a tool dependency.

---

## What You Get Out of the Box

| Artifact | Purpose |
|----------|---------|
| `templates/context.md.template` | Primary AI bootstrap document — fill this in first |
| `templates/copilot-instructions.md.template` | Auto-loads context into every Copilot session |
| `templates/data-model.md.template` | Schema and naming convention registry |
| `templates/security.md.template` | Security roles and AI constraints |
| `templates/domain.md.template` | Domain terminology dictionary |
| `templates/adr.md.template` | Architecture Decision Records |
| `templates/debt.md.template` | Technical debt register |
| `templates/bootstrap-prompt.md.template` | AI session startup prompt for non-Copilot tools |
| `org/governance.md` | Ownership model and update triggers |
| `org/standards.md` | Authoring standards and quality checklist |
| `.github/PULL_REQUEST_TEMPLATE.md` | PR checklist for AI context maintenance |

---

## Ready to Start?

[Get Started in 10 Minutes →](getting-started#minimum-viable-setup){: .btn .btn-primary .fs-5 }
