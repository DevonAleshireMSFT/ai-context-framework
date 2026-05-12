---
layout: default
title: GitHub Copilot Integration
nav_order: 5
permalink: /copilot-integration
---

# GitHub Copilot Integration
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The AI Context Framework works with GitHub Copilot Pro today — no extension, no plugin, no additional tooling required. The integration is a single committed file that makes every Copilot Chat session in your repository context-aware automatically.

---

## What is `copilot-instructions.md`?

GitHub Copilot supports a special file at `.github/copilot-instructions.md`. When this file exists in a repository, **Copilot reads it automatically at the start of every chat session** in that repo.

This means:
- Every developer gets the same grounded context
- No one has to paste a prompt or remember to load files
- Naming conventions, schema rules, and security constraints apply from the first message
- Copilot confirms its context before answering the first question

This is the highest-leverage integration point in the framework. One file, committed once, changes the quality of every AI-assisted interaction in your repo.

---

## Setup

**Step 1 — Copy the template**

Copy [`templates/copilot-instructions.md.template`](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/templates/copilot-instructions.md.template) to `.github/copilot-instructions.md` in your project repository. Remove the `.template` extension.

**Step 2 — Customize for your project**

Replace the placeholder values with your project's specifics. The key sections to update:

- The reference to your `schema-prefix` from `context.md` frontmatter
- Any project-specific rules that must always apply
- The table of topic-to-file mappings

Keep it concise — Copilot reads the full file on every session.

**Step 3 — Commit it**

Commit `.github/copilot-instructions.md` to your main branch. Copilot picks it up immediately. No restart or configuration change required.

---

## How It Works in Practice

### Session Start — Copilot Confirms Context

When a developer opens a new Copilot Chat session and sends their first message, Copilot responds with a context confirmation before answering:

> I've read `.ai/context.md`. This is the **Invoice Tracker** project on Power Platform / Dataverse.
>
> Key rules in effect:
> - All new schema uses the `inv_` prefix
> - The `legacy_invoice` table must not be renamed post go-live
>
> How can I help?

This confirmation happens automatically — in every session, for every developer on the team.

---

### Example: Naming Convention Enforcement

**Without the framework:**

> **Developer:** Create a table for tracking returned items.
>
> **Copilot:** Here's a schema for a `Returns` table with columns `ReturnId`, `InvoiceId`, `ReturnDate`...

**With the framework (context in `copilot-instructions.md`):**

> **Developer:** Create a table for tracking returned items.
>
> **Copilot:** Following the `inv_` prefix convention from `.ai/context.md`, here's a schema for `inv_return` with columns `inv_returnid`, `inv_invoiceid`, `inv_returndate`...

The developer didn't mention the convention. Copilot applied it because it was already loaded.

---

### Example: Security Constraint Awareness

> **Developer:** Should this new report view be accessible to all users?
>
> **Copilot:** Based on `.ai/security.md`, read access to financial data is restricted to the `Finance` and `Admin` roles. A report view for returned items should be restricted to those roles — I'd recommend not exposing it to `Contributor` or `Reader`.

---

### Example: Protecting Deprecated Schema

> **Developer:** Can we rename `legacy_invoice` to `inv_invoice` to match the convention?
>
> **Copilot:** I can't recommend that. Per `.ai/context.md` Known Gotchas, `legacy_invoice` exists in production and cannot be renamed post go-live due to downstream integrations. The convention applies to new schema only.

---

## Using `#file` References in Copilot Chat

For deeper context on specific topics, reference `.ai/` files directly in the chat input. This loads the file into the conversation context alongside your message.

**Schema and naming questions:**
```
#file:.ai/data-model.md I need to add a relationship between hardware and location. What tables should I link?
```

**Security questions:**
```
#file:.ai/security.md Is Contributor sufficient for this new canvas app, or should it be restricted to Admin?
```

**Understanding past decisions:**
```
#file:.ai/decisions/adr-001-naming.md Why do we use inv_ instead of invoice_?
```

**Checking current priorities:**
```
#file:.ai/context.md What are the active priorities for this sprint?
```

---

## What This Replaces and What It Doesn't

| Scenario | Recommended Approach |
|----------|---------------------|
| Copilot Chat in VS Code | `copilot-instructions.md` handles automatically |
| New Copilot Chat session | Context confirmed automatically from instructions file |
| Deep schema work | Add `#file:.ai/data-model.md` to your message |
| Other AI tools (ChatGPT, Claude, etc.) | Use `bootstrap-prompt.md` manually |
| Enforcing rules at commit time | Pre-commit hooks + PR checklist |

`copilot-instructions.md` does not replace `.ai/context.md` — it points Copilot *to* `context.md`. The context lives in the `.ai/` files; the instructions file tells Copilot how to use them.

---

## Keeping `copilot-instructions.md` Current

The instructions file is governed the same way as other `.ai/` documents — it has an owner (Tech Lead) and is updated when the rules it references change.

If a Key Rule changes in `context.md`, update `copilot-instructions.md` in the same PR.

It is covered by the PR AI Context Checklist under the `context.md` updated item.
