---
layout: default
title: Getting Started
nav_order: 2
permalink: /getting-started
---

# Getting Started
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

Adopting the AI Context Framework for a project repository takes about 30 minutes for the initial setup. The framework grows incrementally — a partially populated `.ai/` directory is better than none.

**Prerequisites:** A Git repository and a team willing to treat AI context as a shared, maintained artifact.

---

## Step 1 — Copy the Templates

Clone or fork [this repository](https://github.com/DevonAleshireMSFT/ai-context-framework), then copy the templates into your project repo's `.ai/` directory, removing the `.template` extension:

| Template | Destination |
|----------|------------|
| `templates/context.md.template` | `.ai/context.md` |
| `templates/domain.md.template` | `.ai/domain.md` |
| `templates/data-model.md.template` | `.ai/data-model.md` |
| `templates/security.md.template` | `.ai/security.md` |
| `templates/pipelines.md.template` | `.ai/pipelines.md` |
| `templates/debt.md.template` | `.ai/debt.md` |
| `templates/onboarding.md.template` | `.ai/onboarding.md` |
| `templates/bootstrap-prompt.md.template` | `.ai/bootstrap-prompt.md` |
| `templates/adr.md.template` | `.ai/decisions/adr-001-[title].md` |

Create the `decisions/` subdirectory:

```bash
mkdir .ai/decisions
```

---

## Step 2 — Update .gitignore

Add `.ai_local/` to your project's `.gitignore`. This is non-negotiable — personal working memory must never be committed.

```
# AI Context Framework — personal context, never commit
.ai_local/
```

---

## Step 3 — Create Your Personal Context Directory

Create `.ai_local/` locally on your machine. This is your developer working memory — sprint notes, AI session summaries, scratch ideas. It is never committed.

```bash
mkdir .ai_local
mkdir .ai_local/session-summaries
```

Suggested starting files inside `.ai_local/`:

| File | Purpose |
|------|---------|
| `working-notes.md` | Sprint notes, reminders, temporary context |
| `scratch.md` | Experimental ideas, local troubleshooting |
| `session-summaries/` | AI conversation summaries |

---

## Step 4 — Fill in context.md First

`context.md` is the **primary bootstrap document**. It is the first file an AI reads. Before any other file, get this one right.

At minimum, answer these questions in `context.md`:

- What is this project?
- What platform does it run on?
- What is the current state?
- What rules must always be followed?
- What are the known gotchas?

Replace every `[placeholder]` value in the YAML frontmatter and each section. Keep this file under 500 lines — link to the detail files rather than embedding everything.

```markdown
---
project: My Project
schema-prefix: abc_
platform: Power Platform / Dataverse
cloud: Azure Commercial
context-version: 1.0.0
last-updated: 2026-05-12
---

## What This Is
...

## Key Rules
- All new tables use the abc_ prefix
- Never rename legacy_table — it exists in production
...
```

---

## Step 5 — Fill in the Remaining Files

Work through each file. Prioritize in this order:

1. **`context.md`** — required before any AI-assisted work
2. **`data-model.md`** — required if schema work is in scope
3. **`security.md`** — required if access control is in scope
4. **`domain.md`**, **`pipelines.md`**, **`debt.md`** — fill incrementally as you go

Every file uses YAML frontmatter for machine-readable metadata. Update the `last-updated` date whenever you change a file.

---

## Step 6 — Add the PR Checklist

Copy [`.github/PULL_REQUEST_TEMPLATE.md`](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/.github/PULL_REQUEST_TEMPLATE.md) into your repo's `.github/` directory. This checklist appears on every PR and prompts developers to update AI context when the system changes.

---

## Step 7 — Register Your Repository

Add an entry to [`registry.md`](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/registry.md) in the enterprise framework repo. This lets the architecture team track adoption and identify stale repositories.

---

## Step 8 — Use the Bootstrap Prompt

At the start of each AI session, open `.ai/bootstrap-prompt.md` and paste the prompt into your AI assistant. The assistant will confirm it has read your context before answering any questions.

---

## What to Do When Things Change

AI context is only valuable if it stays current. Use the event-driven model:

| When this happens | Update this file |
|------------------|-----------------|
| Schema change | `data-model.md` |
| Security role change | `security.md` |
| Architecture decision made | New ADR in `decisions/` |
| Technical debt identified | `debt.md` |
| Pipeline changes | `pipelines.md` |
| New domain term adopted | `domain.md` |

See [Governance](governance) for the full ownership and maintenance model.
