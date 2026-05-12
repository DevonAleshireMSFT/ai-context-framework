# AI Context Framework

A governed, scalable, AI-platform-agnostic framework for preserving institutional engineering knowledge across developers, repositories, AI tools, and time.

---

## Core Concept

AI context is a **first-class engineering artifact** — not an afterthought.

This framework defines how teams structure, govern, and maintain AI context so that every AI-assisted interaction is grounded in accurate, current, team-owned knowledge.

---

## Architecture Overview

### Three Tiers

| Tier | Scope | Ownership | Location |
|------|-------|-----------|----------|
| **Tier 1 — Enterprise** | Org-wide standards and glossary | Architecture / Governance team | Centralized repo (this repo) |
| **Tier 2 — Project** | Per-repository context, decisions, schema | Tech Lead + domain owners | `.ai/` in each repo (committed) |
| **Tier 3 — Personal** | Developer working memory | Individual developer | `.ai_local/` in each repo (gitignored) |

### Two Axes

```
Authoritative  ←————————————————→  Working Memory
(README, ADRs, schema)             (AI docs, session notes, summaries)
```

**Never merge these axes.** Authoritative documentation lives in committed source control. AI context documents are derived from authoritative sources — not replacements for them.

---

## Federation Model

```
ai-context-enterprise/   ← this repo
        ↓
solution-repo-A/.ai/
solution-repo-B/.ai/
solution-repo-C/.ai/
```

Each project repository adopts the standards from this enterprise repo and maintains its own `.ai/` directory independently.

---

## Per-Repository Structure

When adopting this framework in a project repository, create this structure:

```
/
├── .ai/                          # AI context — committed, team-owned
│   ├── context.md                # Primary AI bootstrap — read first
│   ├── domain.md                 # Domain terminology
│   ├── data-model.md             # Schema inventory and relationships
│   ├── security.md               # Security roles, groups, and constraints
│   ├── pipelines.md              # ALM and pipeline standards
│   ├── debt.md                   # Technical debt register
│   ├── onboarding.md             # Developer onboarding guide
│   ├── bootstrap-prompt.md       # AI session startup prompt
│   └── decisions/
│       ├── adr-001-*.md          # Architecture Decision Records
│       └── adr-002-*.md
│
├── .ai_local/                    # Personal context — gitignored, never committed
│   ├── working-notes.md          # Sprint notes and reminders
│   ├── scratch.md                # Experimental ideas and local troubleshooting
│   └── session-summaries/        # AI conversation summaries
│
├── .github/
│   ├── copilot-instructions.md   # Automatic Copilot context — no manual prompt needed
│   └── PULL_REQUEST_TEMPLATE.md  # PR checklist
│
└── .gitignore                    # Must include .ai_local/
```

---

## This Repository Structure

```
ai-context-framework/
├── README.md                     # This file
├── registry.md                   # Register of adopted repositories
├── .gitignore
│
├── org/                          # Enterprise-wide standards
│   ├── standards.md              # AI context authoring standards
│   ├── platform.md               # Platform-specific guidance
│   ├── governance.md             # Ownership and maintenance model
│   └── glossary.md               # Enterprise-wide terminology
│
├── templates/                    # Copy these into your project repos
│   ├── context.md.template
│   ├── domain.md.template
│   ├── data-model.md.template
│   ├── security.md.template
│   ├── pipelines.md.template
│   ├── debt.md.template
│   ├── onboarding.md.template
│   ├── bootstrap-prompt.md.template
│   └── adr.md.template
│
└── .ai/                          # AI context for this framework repo itself
    └── context.md
```

---

## Quick Start

### For a New Project Repository

**Step 1 — Copy and rename the templates**

Copy all files from [`templates/`](templates/) into your repo's `.ai/` directory, removing the `.template` extension:

```
templates/context.md.template       →  .ai/context.md
templates/domain.md.template        →  .ai/domain.md
templates/data-model.md.template    →  .ai/data-model.md
templates/security.md.template      →  .ai/security.md
templates/pipelines.md.template     →  .ai/pipelines.md
templates/debt.md.template          →  .ai/debt.md
templates/onboarding.md.template    →  .ai/onboarding.md
templates/bootstrap-prompt.md.template → .ai/bootstrap-prompt.md
templates/adr.md.template           →  .ai/decisions/adr-001-[title].md
```

Create the `decisions/` subdirectory:

```bash
mkdir .ai/decisions
```

**Step 2 — Update `.gitignore`**

Add `.ai_local/` to your project's `.gitignore`:

```
.ai_local/
```

**Step 3 — Create your personal context directory locally**

This directory is never committed. Create it on your machine:

```bash
mkdir .ai_local
mkdir .ai_local/session-summaries
```

**Step 4 — Fill in `context.md` first**

`context.md` is the primary bootstrap document — the first file an AI reads when you start a session. At minimum, answer:

- What is this project?
- What is the current state?
- What rules must be followed?

Replace all `[placeholder]` values in the YAML frontmatter and each section. Keep this file under 500 lines; link to the detail files rather than embedding everything.

**Step 5 — Fill in the remaining `.ai/` files**

Work through each file. Not every file needs to be complete before you start — a partially populated `.ai/` is better than none. Prioritize:

1. `context.md` — required before any AI-assisted work
2. `data-model.md` — required if schema work is in scope
3. `security.md` — required if access control is in scope
4. `domain.md`, `pipelines.md`, `debt.md` — fill as you go

**Step 6 — Register your repo**

Add an entry to [`registry.md`](registry.md) in this enterprise repo.

**Step 7 — Add the PR checklist to your repo**

Copy [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md) into your repo's `.github/` directory.

**Step 8 — Set up GitHub Copilot integration**

Copy [`templates/copilot-instructions.md.template`](templates/copilot-instructions.md.template) to `.github/copilot-instructions.md` in your repo (remove the `.template` extension). Customize the placeholders for your project. Copilot reads this file automatically in every chat session — no manual prompt needed.

See [GitHub Copilot Integration](#github-copilot-integration) below for full details and examples.

**Step 9 — Use the bootstrap prompt for other AI tools**

For AI assistants other than Copilot (ChatGPT, Claude, etc.), open `.ai/bootstrap-prompt.md` and paste the prompt at the start of each session. This orients the assistant to your project before you ask your first question.

---

## GitHub Copilot Integration

This framework works with GitHub Copilot Pro out of the box — no extension required.

### What is `copilot-instructions.md`?

GitHub Copilot supports a special file at `.github/copilot-instructions.md` that is **automatically injected into every Copilot Chat session** in your repository. Every developer who opens Copilot Chat in that repo gets the same grounded context — without pasting a prompt, without remembering to load files, without any manual setup.

This is the most powerful integration point in the framework. One file, committed once, makes every Copilot session in your repo context-aware.

### Setup

1. Copy [`templates/copilot-instructions.md.template`](templates/copilot-instructions.md.template) to `.github/copilot-instructions.md` in your project repo.
2. Remove the `.template` extension.
3. Replace the placeholder values for your project.
4. Commit it. Copilot picks it up immediately — no restart required.

### What it does

The `copilot-instructions.md` file:
- Tells Copilot to read `.ai/context.md` before every response
- Enforces your naming conventions and key rules
- Directs Copilot to the right file for schema, security, and domain questions
- Defines hard boundaries — what Copilot must never do in your codebase
- Asks Copilot to confirm its context at the start of each session

### Example: Copilot confirming context

When a developer opens a new Copilot Chat session, Copilot will respond to the first message with something like:

> I've read `.ai/context.md`. This is the **Invoice Tracker** project on Power Platform / Dataverse.
> Key rules in effect:
> - All new schema uses the `inv_` prefix
> - The `legacy_invoice` table must not be renamed post go-live
>
> How can I help?

That confirmation happens before any code is generated — in every session, for every developer.

### Example: `#file` references in Copilot Chat

For deeper context on specific topics, reference `.ai/` files directly in the chat:

```
#file:.ai/context.md What naming convention should I use for this new table?
```
```
#file:.ai/data-model.md I need to add a relationship between hardware and location. What are the existing tables I should link to?
```
```
#file:.ai/security.md Should this new view be restricted to the Admin role or is Contributor sufficient?
```
```
#file:.ai/decisions/adr-001-naming.md Why do we use the inv_ prefix instead of invoice_?
```

### Example: Copilot respecting a naming rule

Without the framework:
> **Developer:** Add a table for tracking returned items.
> **Copilot:** Here's a schema for a `Returns` table with columns `ReturnId`, `InvoiceId`...

With the framework (context in `copilot-instructions.md`):
> **Developer:** Add a table for tracking returned items.
> **Copilot:** Following the `inv_` prefix convention from `.ai/context.md`, here's a schema for `inv_return` with columns `inv_returnid`, `inv_invoiceid`...

### What `copilot-instructions.md` does not replace

- It does not replace `.ai/context.md` — the instructions file points Copilot *to* context.md; it doesn't duplicate it.
- It does not replace the bootstrap prompt for non-Copilot AI tools.
- It does not enforce rules at commit time — use pre-commit hooks and PR checklists for that.

---

## Shared Context Ownership Model

| Document | Owner | Review Cadence |
|----------|-------|----------------|
| `context.md` | Tech Lead / Architect | Every sprint |
| `data-model.md` | Schema Owner | Schema changes |
| `security.md` | Security Owner | Role changes |
| `debt.md` | Tech Lead | Sprint planning |
| `pipelines.md` | DevOps Owner | Pipeline changes |
| `domain.md` | Domain Expert | Domain changes |

## Event-Driven Update Triggers

| Event | Required Update |
|-------|----------------|
| Schema change | `data-model.md` |
| Security role change | `security.md` |
| Architecture decision made | New ADR in `decisions/` |
| Technical debt identified | `debt.md` |
| Pipeline change | `pipelines.md` |
| New domain term adopted | `domain.md` |

---

## What Never Belongs in AI Context

- Credentials or secrets
- Connection strings
- Personally Identifiable Information (PII)
- Environment variable values
- Personal commentary about teammates

---

## Governance Risks and Mitigations

| Risk | Mitigation |
|------|-----------|
| Context drift | PR checklist + event-driven ownership |
| AI docs replace authoritative docs | Maintain strict authoritative/working-memory separation |
| Personal notes accidentally committed | `.gitignore` + pre-commit hooks |
| Context exceeds LLM token limits | Keep bootstrap docs concise; link to detail files |
| Sensitive data exposure | Governance review standards |

---

## Roadmap

### Near-Term
- PR template enforcement
- `.gitignore` validation in CI
- Context freshness validation in pipelines

### Medium-Term
- Generate schema snapshots from CLI tools
- Auto-generate release summaries
- Sync `.ai/` docs to wiki systems

### Long-Term
- Azure AI Search / RAG integration
- Vector database indexing
- Cross-repository knowledge graphs
- Semantic versioning for AI context

---

## Reading Order

If you are new to this framework, read in this order:

1. **This file** — architecture overview and quick start
2. [`org/governance.md`](org/governance.md) — ownership model and update triggers
3. [`org/standards.md`](org/standards.md) — authoring standards and quality checklist
4. [`templates/context.md.template`](templates/context.md.template) — the primary bootstrap document template
5. [`org/platform.md`](org/platform.md) — platform-specific guidance for your stack

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for full contribution guidelines.

Changes to `org/` (enterprise standards) require Architecture Team review. Template changes require at least one peer review from an existing adopter.
