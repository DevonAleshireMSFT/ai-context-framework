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

## Prerequisites

Before running the CLI, confirm the following are installed and configured:

| Requirement | Minimum | Notes |
|-------------|---------|-------|
| **Node.js** | 18 or newer | `node --version` to check. [Download](https://nodejs.org/) |
| **npm** | Bundled with Node | `npm --version` to check |
| **Git** | Any modern version | Required for cloning and for the git-install mechanism |
| **GitHub authentication** | SSH key or PAT | `npm i -g github:<owner>/<repo>` installs directly from GitHub. npm reuses your existing Git credential (SSH key, HTTPS PAT via `git config credential.helper`, or GITHUB_TOKEN in CI). No separate configuration is needed if `git clone https://github.com/<owner>/<repo>` already works on your machine. |

The framework itself has **no third-party runtime dependencies** — once installed, the CLI and all validators use only Node built-ins.

---

## Minimum Viable Setup

The smallest useful configuration is the slim default. Start here, in under 10 minutes (target). Squad is not a prerequisite; AI Context can be installed in a repository with or without it.

**1. Run the CLI in your repo**

```bash
npm i -g github:DevonAleshireMSFT/ai-context-framework
ai-context init
```

> Prefer a one-off run? Use `npx github:DevonAleshireMSFT/ai-context-framework init` instead of installing globally.

This creates the slim default, installs the managed validation tooling, adds `.ai_local/` to `.gitignore`, and writes the framework stamp.

> Publishing note: `@devonaleshiremsft/ai-context` is unpublished, so `npx @devonaleshiremsft/ai-context` does not work — use the git-install command above. An npm feed is a deferred channel on the [roadmap backlog](https://github.com/DevonAleshireMSFT/ai-context-framework#roadmap); see [ADR-0003](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/.ai/adr/0003-git-install-primary-distribution.md).

**2. Fill in `.ai/context.md`**

Open `.ai/context.md` and replace placeholders:
- Project name and platform
- Key Rules (naming conventions, things that must never change)
- Known Gotchas

> **Recommended:** Use the AI Setup Assistant instead of filling in templates manually. See [AI Setup Assistant](#ai-setup-assistant) below.

**3. Create product ADRs when decisions exist**

The CLI creates `.ai/adr/`. Product decisions live in `.ai/adr/NNNN-title.md`. Repos using Squad still record product decisions here; Squad links only.

**4. Review Copilot auto-context**

The CLI seeds `.github/copilot-instructions.md` if it does not exist. If your repo already has Squad or other instructions, both `ai-context init` and `ai-context update` preserve them and manage only a delimited framework block. The command reports whether it detected Squad; without Squad, it does not create or require `.squad/`.

That's it. Open Copilot Chat — it will confirm it has read your project context before answering.

### Optional Squad integration

[Squad](https://github.com/bradygaster/squad#squad) provides persistent AI agent teams and is installed separately. AI Context detects a Squad CLI project when `.squad/team.md` or `.github/agents/squad.agent.md` exists. In that mode, `.ai/` remains the durable product context and `.squad/` remains Squad-owned working state. See the [architecture boundary](architecture#with-and-without-squad) for the two modes.

### Updating the framework

Use the CLI (installed via git, above):

```bash
ai-context update
ai-context check
```

`update` refreshes framework-managed tooling without overwriting consumer-owned `.ai/**` content. See the [CLI reference](cli) and [ADR-0003](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/.ai/adr/0003-git-install-primary-distribution.md) (the current accepted distribution ADR, which supersedes [ADR-0002](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/.ai/adr/0002-framework-distribution.md)).

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
   - the AI Context managed block in `.github/copilot-instructions.md`, preserving content outside the block

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

Adopting the full framework for a project repository targets about 30 minutes, depending on project complexity. The framework grows incrementally — a partially populated `.ai/` directory is better than none.

**Prerequisites:** Node.js 18 or newer, npm, and git. See [Prerequisites](#prerequisites) above for details. A Git repository and a clear understanding of what your project does are required before filling in context files.

---

## Step 1 — Copy the Templates

> Preferred path: install the CLI (`npm i -g github:DevonAleshireMSFT/ai-context-framework`) and run `ai-context init`, or run it once with `npx github:DevonAleshireMSFT/ai-context-framework init`. Use this manual copy section only as a fallback for environments that cannot execute the packaged CLI.

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

```gitignore
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

If `.github/copilot-instructions.md` does not exist, copy [`templates/copilot-instructions.md.template`](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/templates/copilot-instructions.md.template) there. If it already exists, preserve its content and add the template inside the AI Context managed block instead of replacing the file. Customize the placeholders. Copilot reads this file automatically in every chat session — no manual prompt needed.

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

---

## Troubleshooting

### `npm i -g github:...` fails with a credentials error

The git-install mechanism downloads directly from GitHub. If npm cannot access the repository, it is a GitHub authentication issue:

1. **Check git credentials:** Run `git clone https://github.com/DevonAleshireMSFT/ai-context-framework.git` in a temporary directory. If that fails, configure your GitHub credentials first (SSH key or HTTPS PAT via `git config credential.helper`).
2. **Check SSH:** If you use SSH for GitHub, ensure `ssh -T git@github.com` succeeds.
3. **Corporate proxy or firewall:** If you are behind a corporate proxy, configure `npm config set https-proxy` or use the tarball distribution method when it becomes available (see [roadmap](https://github.com/DevonAleshireMSFT/ai-context-framework#roadmap)).

### `ai-context: command not found` after `npm i -g`

After a global npm install, the `ai-context` binary may not be on your PATH immediately:

1. **Reload your terminal** (close and reopen the shell window).
2. **Check the global bin path:** Run `npm bin -g` to find where npm places global binaries. Confirm that directory is in your `PATH`.
3. **Windows note:** On Windows, you may need to restart the terminal or use `npx` for the first invocation.

### `ai-context check` reports errors on a fresh scaffold

This is expected. After `ai-context init`, the generated `.ai/context.md` contains unfilled placeholder values. The `check` command validates that fields like `project`, `platform`, and `last-updated` contain real values — not the `[placeholder]` strings from the template.

**Resolution:** Fill in `.ai/context.md` (replace every `[placeholder]` value), then run `ai-context check` again. The errors will resolve once the required frontmatter fields contain real values.

### `ai-context check` reports schema drift on a managed repo

If `check` reports that the installed framework version is older than the latest:

```bash
ai-context update
ai-context check
```

`update` refreshes all managed tooling files to the current framework version without touching `.ai/**`.

### The PR template does not appear on new pull requests

Confirm `.github/PULL_REQUEST_TEMPLATE.md` is committed to the default branch (usually `main`). GitHub only reads the PR template from the default branch. If the file exists in a feature branch but not in `main`, it will not appear on new PRs.
