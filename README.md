# AI Context Framework

Stop explaining your codebase to AI from scratch every session. Structure your project knowledge once — every AI session starts informed.

**[Documentation Site →](https://devonaleshiremsft.github.io/ai-context-framework/)**

---

## What This Is

A `.ai/` directory in your repo. A few Markdown files. A committed file that makes GitHub Copilot context-aware automatically.

That's the minimum. The framework scales from a solo developer to a team to an enterprise — but it starts with one repo and one developer in under 10 minutes (target, assuming prerequisites installed).

AI context is a **first-class engineering artifact** — not an afterthought. This framework defines how to structure, govern, and maintain it so that every AI-assisted interaction is grounded in accurate, current knowledge.

---

## `.ai/` vs `.squad/` Boundary

AI Context does **not** require Squad. It works by itself in any repository. If a project also uses [Squad](https://github.com/bradygaster/squad#squad), the two tools remain independent and use these boundaries:

| Question | `.ai/` | `.squad/` |
|----------|-------|-----------|
| Answers | WHAT the product is and WHY constraints exist | HOW the AI team works, decided, and did the work |
| Audience | Anyone — human or AI — modifying the code | The AI team and PM |
| Lifespan | Durable, reviewed product knowledge; portable without Squad | Working log and team process state |
| Decisions = | Product ADRs in `.ai/adr/NNNN-title.md` | Links to ADRs; never restates product decisions |

Duplication rule: `.squad/decisions.md` links to product ADRs instead of copying their decision, rationale, consequences, or alternatives.

---

## Who This Is For

| You are... | What you get |
|-----------|-------------|
| **Solo developer** using Copilot or another AI | A `.ai/` context directory that makes every session project-aware — no repeated explaining |
| **Small team** collaborating on one repo | Shared, committed AI context that keeps everyone's Copilot grounded in the same knowledge |
| **Larger org** with multiple repos | A federated governance model with enterprise-wide standards and a repo registry |

Start with solo or small team. Add federation when you need it.

---

## Minimum Viable Setup — 10 Minutes (target)

The slim default is three durable files/paths:

```
.ai/
├── context.md              # Product overview, rules, and links
└── adr/                    # Product ADRs: NNNN-title.md
.github/
└── copilot-instructions.md # Tells Copilot how to use .ai/
```

**Prerequisites:** Node.js 18 or newer, npm, and git. The git-install mechanism (`github:Owner/Repo`) uses your existing GitHub credentials (SSH key or PAT). See the [Getting Started prerequisites](https://devonaleshiremsft.github.io/ai-context-framework/getting-started#prerequisites) for details.

**1. Run the CLI**

Install the CLI globally from the framework repository, then run it from inside your project:

```bash
npm i -g github:DevonAleshireMSFT/ai-context-framework
ai-context init
```

Or run it once without installing:

```bash
npx github:DevonAleshireMSFT/ai-context-framework init
```

This creates the slim default and installs the managed validation/update tooling.

> The CLI has no third-party dependencies and no build step, so npm installs it directly from Git. For private-repo access, npm reuses your existing GitHub credentials (SSH key or PAT).

**2. Fill in `.ai/context.md`**

Open `.ai/context.md` and fill in:
- Project purpose and platform
- Key product rules and constraints
- Where durable detail lives

**3. Create product ADRs when decisions exist**

The CLI creates `.ai/adr/`. Product decisions use `.ai/adr/NNNN-title.md`.

**4. Review Copilot auto-context**

The CLI seeds `.github/copilot-instructions.md` if absent, and if the file already exists it preserves your content and merges in only a delimited framework block — on both `init` and `update`.

> **Tip — let Copilot fill it in for you:** Copy [`templates/setup-prompt.md.template`](templates/setup-prompt.md.template) → `.github/prompts/ai-context-setup.prompt.md` and run it in GitHub Copilot agent mode (`/ai-context-setup`).

Optional files such as `data-model.md`, `security.md`, `domain.md`, `pipelines.md`, `debt.md`, `onboarding.md`, and `bootstrap-prompt.md` are added only when needed.

Update framework-managed tooling later with:

```bash
ai-context update
ai-context check
```

### Using with Squad

[Squad](https://github.com/bradygaster/squad#squad) adds persistent AI agent teams to a project; it is optional and installed separately. Both `ai-context init` and `ai-context update` detect an existing Squad project from `.squad/team.md` or `.github/agents/squad.agent.md`, preserve all Squad files, and report `squad: detected`. Without those artifacts, they report `squad: not detected (optional)` and never create `.squad/`.

Squad does not replace `.ai/`. Keep durable product knowledge and Product ADRs in `.ai/`; keep AI-team working logs in `.squad/`. Squad decisions link to `.ai/adr/` instead of restating product decisions.

---

## Per-Repository Structure

When adopting this framework in a project repository, start slim:

```
/
├── .ai/                          # Durable product context — committed
│   ├── context.md                # Primary AI bootstrap — read first
│   └── adr/                      # Product Architecture Decision Records
│       ├── 0001-*.md
│       └── 0002-*.md
│
├── .github/
│   └── copilot-instructions.md   # Automatic Copilot context
│
└── .ai_local/                    # Optional personal context — gitignored
```

Add detail files only when they earn their place:

| Optional file | Use when |
|---------------|----------|
| `.ai/data-model.md` | Schema or data contracts need durable AI-readable context |
| `.ai/security.md` | Roles, permissions, or sensitive-data constraints affect work |
| `.ai/domain.md` | Domain terms are non-obvious |
| `.ai/pipelines.md` | Build, release, or environment rules affect AI-assisted changes |
| `.ai/debt.md` | Legacy debt register only; prefer issues or, when present, Squad work tracking |
| `.ai/onboarding.md` | Legacy onboarding guide only; prefer existing docs or, when present, Squad support |
| `.ai/bootstrap-prompt.md` | Legacy manual prompt for non-Copilot tools |

---

## This Repository Structure

> This is the structure of the enterprise framework repo itself — relevant when you are setting up centralized AI context governance across multiple repositories. If you are on a single repo, you only need the files from [`templates/`](templates/).

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
│   ├── setup-prompt.md.template      # AI setup assistant — generates the slim default
│   ├── context.md.template
│   ├── domain.md.template
│   ├── data-model.md.template
│   ├── security.md.template
│   ├── pipelines.md.template
│   ├── debt.md.template
│   ├── onboarding.md.template
│   ├── bootstrap-prompt.md.template
│   ├── copilot-instructions.md.template
│   └── adr.md.template
│
└── .ai/                          # AI context for this framework repo itself
    └── context.md
```

---

## Full Setup

### For a New Project Repository

**Step 1 — Copy and rename the templates**

Copy the slim default first. Add optional detail templates only when the project needs them:

> **Recommended shortcut:** Instead of filling these in manually, use the [AI Setup Assistant](#minimum-viable-setup--10-minutes-target). Copy `templates/setup-prompt.md.template` → `.github/prompts/ai-context-setup.prompt.md`, run it in Copilot agent mode, and let Copilot generate the files from your answers.

```
templates/setup-prompt.md.template     →  .github/prompts/ai-context-setup.prompt.md (optional assistant)
templates/context.md.template          →  .ai/context.md
templates/adr.md.template              →  .ai/adr/0001-[title].md
templates/copilot-instructions.md.template → .github/copilot-instructions.md

Optional when needed:
templates/domain.md.template           →  .ai/domain.md
templates/data-model.md.template       →  .ai/data-model.md
templates/security.md.template         →  .ai/security.md
templates/pipelines.md.template        →  .ai/pipelines.md
templates/debt.md.template             →  .ai/debt.md (optional/legacy)
templates/onboarding.md.template       →  .ai/onboarding.md (optional/legacy)
templates/bootstrap-prompt.md.template →  .ai/bootstrap-prompt.md (optional/legacy)
```

Create the `adr/` subdirectory:

```bash
mkdir .ai/adr
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
4. `domain.md` and `pipelines.md` — fill as needed
5. `debt.md`, `onboarding.md`, and `bootstrap-prompt.md` — optional/legacy; prefer issues or Squad working state when Squad is present

**Step 6 — Register your repo** *(optional — for multi-repo federation)*

If you are using this framework across multiple repositories, add an entry to [`registry.md`](registry.md) to track adoption. Skip this if you are on a single repo.

**Step 7 — Add the PR checklist to your repo**

Copy [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md) into your repo's `.github/` directory.

**Step 8 — Set up GitHub Copilot integration**

If `.github/copilot-instructions.md` does not exist, copy [`templates/copilot-instructions.md.template`](templates/copilot-instructions.md.template) there (remove the `.template` extension). If it already exists, preserve its content and add the template inside the AI Context managed block instead of replacing the file. Customize the placeholders for your project. Copilot reads this file automatically in every chat session — no manual prompt needed.

See [GitHub Copilot Integration](#github-copilot-integration) below for full details and examples.

**Step 9 — Use the bootstrap prompt for other AI tools**

For AI assistants other than Copilot (ChatGPT, Claude, etc.), use `.ai/bootstrap-prompt.md` only if you need a manual prompt. It is optional/legacy; prefer tool-native instructions when available.

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

When a developer opens a new Copilot Chat session, Copilot is instructed to confirm it has read `.ai/context.md`. A typical response looks like:

> I've read `.ai/context.md`. This is the **Invoice Tracker** project on Power Platform / Dataverse.
> Key rules in effect:
> - All new schema uses the `inv_` prefix
> - The `legacy_invoice` table must not be renamed post go-live
>
> How can I help?

*This is an illustrative example. Copilot is a probabilistic model and may not follow all instructions in every response. Treat AI output as a draft; apply human review before using it in production.*

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
#file:.ai/adr/0001-naming.md Why do we use the inv_ prefix instead of invoice_?
```

### Example: Copilot respecting a naming rule

Without the framework:
> **Developer:** Add a table for tracking returned items.
> **Copilot:** Here's a schema for a `Returns` table with columns `ReturnId`, `InvoiceId`...

With the framework (context in `copilot-instructions.md`):
> **Developer:** Add a table for tracking returned items.
> **Copilot:** Following the `inv_` prefix convention from `.ai/context.md`, here's a schema for `inv_return` with columns `inv_returnid`, `inv_invoiceid`...

*This is an illustrative example of the intended behavior. Copilot is instructed to apply naming conventions and typically does so when context is clear, but it is a probabilistic model and cannot guarantee compliance in every response. Review AI output before using it.*

### What `copilot-instructions.md` does not replace

- It does not replace `.ai/context.md` or `.ai/adr/` — the instructions file points Copilot to them; it doesn't duplicate them.
- It does not require the optional/legacy bootstrap prompt for non-Copilot AI tools.
- It does not enforce rules at commit time — use pre-commit hooks and PR checklists for that.

---

## Shared Context Ownership Model

| Document | Owner | Review Cadence |
|----------|-------|----------------|
| `context.md` | You (or whoever leads the project) | Every sprint |
| `.ai/adr/NNNN-title.md` | Decision maker + Tech Lead | At decision time |
| `data-model.md` | Whoever changes the schema | Schema changes |
| `security.md` | Whoever manages access | Role changes |
| `debt.md` | You (or the tech lead) | Sprint planning |
| `pipelines.md` | Whoever manages deployments | Pipeline changes |
| `domain.md` | Whoever knows the domain best | Domain changes |

## Event-Driven Update Triggers

| Event | Required Update |
|-------|----------------|
| Schema change | `data-model.md` |
| Security role change | `security.md` |
| Product decision made | New Product ADR in `.ai/adr/` |
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
- Distribute the CLI as a versioned tarball (`npm pack`) for air-gapped/locked-down environments
- Publish the CLI to an internal npm feed so `npm i -g @devonaleshiremsft/ai-context` works org-wide

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

## Known Limitations

| Limitation | Detail |
|-----------|--------|
| AI instruction compliance is not guaranteed | Copilot and other AI assistants are probabilistic models. They are instructed to follow your `.ai/context.md` rules and typically do so, but may not in every response. Always review AI output. |
| v0.x stability posture | This framework is pre-release (`0.1.0`). APIs, file formats, and behaviors may change before a stable release. |
| Context window constraints | Very large `.ai/` files may exceed an AI model's context window. Keep `context.md` under 500 lines and link to detail files. |
| No runtime enforcement | The framework provides documentation structure and CI validation. It does not enforce rules at code execution time. |
| No compliance certification | This framework does not certify or guarantee compliance with any privacy, security, or AI governance regulation. |

See [docs/responsible-ai.md](https://devonaleshiremsft.github.io/ai-context-framework/responsible-ai) for full responsible AI guidance.

---

## Reading Order

If you are new to this framework, read in this order:

1. **This file** — start here
2. [`templates/context.md.template`](templates/context.md.template) — the primary bootstrap document; fill this in first
3. [`templates/copilot-instructions.md.template`](templates/copilot-instructions.md.template) — set up Copilot integration
4. [`org/standards.md`](org/standards.md) — authoring standards when you need them
5. [`org/governance.md`](org/governance.md) — ownership and maintenance model for teams
6. [`org/platform.md`](org/platform.md) — platform-specific guidance for your stack

---

## Advanced: Multi-Repository Federation

When you have multiple project repositories and want consistent AI context standards across all of them, this repo becomes your **Tier 1** — the centralized source of standards and templates that all project repos inherit from.

```
Tier 1: ai-context-framework/     ← enterprise standards (this repo)
              ↓
Tier 2: solution-repo-A/.ai/      ← project context (per repo, committed)
         solution-repo-B/.ai/
         solution-repo-C/.ai/
              ↓
Tier 3: .ai_local/                ← personal context (per developer, gitignored)
```

**When you need this:**
- Multiple teams adopting the framework independently
- You want consistent naming and governance standards across projects
- You need a central registry of adopted repositories

**When you don't:**
- One repo, one team, or just getting started

For federation setup, see [`org/governance.md`](org/governance.md).

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for full contribution guidelines.

Changes to `org/` (enterprise standards) require Architecture Team review. Template changes require at least one peer review from an existing adopter.

For security issues, see [SECURITY.md](SECURITY.md). For support scope and community channels, see [SUPPORT.md](SUPPORT.md). For responsible AI guidance, see [docs/responsible-ai.md](https://devonaleshiremsft.github.io/ai-context-framework/responsible-ai).
