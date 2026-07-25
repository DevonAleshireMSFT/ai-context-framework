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

## Minimum Viable Setup

The smallest useful configuration is the slim default. Start here.

**1. Create `.ai/context.md` in your repo**

Copy [`templates/context.md.template`](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/templates/context.md.template) → `.ai/context.md` and fill in:
- Project name and platform
- Key Rules (naming conventions, things that must never change)
- Known Gotchas

> **Recommended:** Use the AI Setup Assistant instead of filling in templates manually. See [AI Setup Assistant](#ai-setup-assistant) below.

**2. Create `.ai/adr/`**

```bash
mkdir .ai/adr
```

Product decisions live in `.ai/adr/NNNN-title.md`. Repos using Squad still record product decisions here; Squad links only.

**3. Set up Copilot auto-context**

Copy [`templates/copilot-instructions.md.template`](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/templates/copilot-instructions.md.template) → `.github/copilot-instructions.md` and replace the project name and prefix placeholders.

That's it. Open Copilot Chat — it will confirm it has read your project context before answering.

> **Want the full setup?** Continue reading for the complete guide — schema docs, security context, decision records, and more.

---

## AI Setup Assistant

Instead of filling in templates manually, use the AI Setup Assistant prompt to let Copilot interview you and generate all your `.ai/` files automatically.

### How it works

1. Copy [`templates/setup-prompt.md.template`](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/templates/setup-prompt.md.template) into your project repo as `.github/prompts/ai-context-setup.prompt.md` (remove the `.template` extension).

2. In VS Code, open GitHub Copilot Chat in **agent mode**.

3. Type `/ai-context-setup` to invoke the prompt (or open the file and use **Run prompt**).

4. Copilot asks a focused set of questions about your project — purpose, platform, durable rules, constraints, and any initial product decisions. Answer them all in one message.

5. Copilot generates and **writes** the following files directly into your repository:
   - `.ai/context.md`
   - `.ai/adr/`
   - `.github/copilot-instructions.md`

   It creates optional detail files only when your answers show they are needed.

6. Copilot lists what it created, flags any sections that need your attention, and tells you what to do next.

### After the assistant runs

- Review each generated file and correct any inaccuracies.
- Fill in any `<!-- TODO: fill in -->` sections.
- Commit the `.ai/` directory and `.github/copilot-instructions.md`.
- Open a new Copilot Chat session to verify context loads correctly — Copilot should confirm your project name and key rules before answering your first question.

### Requirements

- GitHub Copilot with agent mode enabled (VS Code)
- The `.github/prompts/` directory is the standard location for VS Code Copilot prompt files

---

## Full Setup

### Overview

Adopting the full framework for a project repository takes about 30 minutes. The framework grows incrementally — a partially populated `.ai/` directory is better than none.

**Prerequisites:** A Git repository and a willingness to treat AI context as a maintained artifact.

---

## Step 1 — Copy the Templates

Copy the templates from the [AI Context Framework repository](https://github.com/DevonAleshireMSFT/ai-context-framework) into your project repo's `.ai/` directory, removing the `.template` extension:

> **Recommended shortcut:** Use the [AI Setup Assistant](#ai-setup-assistant) above instead. It generates all files from a single interview session.

| Template | Destination |
|----------|------------|
| `templates/context.md.template` | `.ai/context.md` |
| `templates/domain.md.template` | `.ai/domain.md` |
| `templates/data-model.md.template` | `.ai/data-model.md` |
| `templates/security.md.template` | `.ai/security.md` |
| `templates/pipelines.md.template` | `.ai/pipelines.md` |
| `templates/adr.md.template` | `.ai/adr/0001-[title].md` |
| `templates/debt.md.template` | Optional/legacy: `.ai/debt.md` |
| `templates/onboarding.md.template` | Optional/legacy: `.ai/onboarding.md` |
| `templates/bootstrap-prompt.md.template` | Optional/legacy: `.ai/bootstrap-prompt.md` |

Create the `adr/` subdirectory:

```bash
mkdir .ai/adr
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
4. **`domain.md`** and **`pipelines.md`** — fill incrementally as needed
5. **`debt.md`**, **`onboarding.md`**, and **`bootstrap-prompt.md`** — optional/legacy; prefer issues and Squad working state when Squad is present

Every file uses YAML frontmatter for machine-readable metadata. Update the `last-updated` date whenever you change a file.

---

## Step 6 — Add the PR Checklist

Copy [`.github/PULL_REQUEST_TEMPLATE.md`](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/.github/PULL_REQUEST_TEMPLATE.md) into your repo's `.github/` directory. This checklist appears on every PR and prompts developers to update AI context when the system changes.

---

## Step 7 — Register Your Repository *(optional — multi-repo federation)*

If you are using this framework across multiple repositories, add an entry to [`registry.md`](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/registry.md) to track adoption. Skip this if you are on a single repo.

---

## Step 8 — Set Up Copilot Auto-Context

Copy [`templates/copilot-instructions.md.template`](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/templates/copilot-instructions.md.template) to `.github/copilot-instructions.md` in your repo. Customize the placeholders. Copilot reads this file automatically in every chat session — no manual prompt needed.

See the [GitHub Copilot Integration](copilot-integration) page for full details and examples.

---

## Step 9 — Use the Bootstrap Prompt for Other AI Tools

For AI assistants other than Copilot (ChatGPT, Claude, etc.), open `.ai/bootstrap-prompt.md` and paste the prompt at the start of each session.

---

## What to Do When Things Change

AI context is only valuable if it stays current. Use the event-driven model:

| When this happens | Update this file |
|------------------|-----------------|
| Schema change | `data-model.md` |
| Security role change | `security.md` |
| Product decision made | New Product ADR in `.ai/adr/` |
| Technical debt identified | `debt.md` |
| Pipeline changes | `pipelines.md` |
| New domain term adopted | `domain.md` |

See [Governance](governance) for the full ownership and maintenance model.
