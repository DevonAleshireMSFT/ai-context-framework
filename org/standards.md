# AI Context Authoring Standards

**Owner:** Architecture Team  
**Review Cadence:** Quarterly or when standards change  
**Applies to:** All Tier-2 `.ai/` directories across the enterprise

---

## Purpose

These standards ensure that AI context documents are consistent, trustworthy, and maintainable across all repositories. Every team adopting this framework must follow these standards.

---

## Core Principles

### 1. AI Context Is Derived, Not Authoritative

AI context documents summarize and link to authoritative sources. They are **never** the source of truth. The source of truth lives in:
- Committed code
- Schema definitions
- Architecture Decision Records
- Official documentation

### 2. Keep It Bootstrappable

The `context.md` file must be concise enough that an AI can consume it at the start of a session without hitting token limits. Aim for **under 500 lines**. Link to detail files rather than embedding everything.

### 3. Write for the AI, Not the Human

AI context is optimized for machine consumption. Use structured formats, consistent headings, and explicit labels. Avoid prose where a table or list suffices.

### 4. Currency Over Completeness

A short, current document is more valuable than a comprehensive, stale one. Prefer frequent small updates over infrequent large ones.

---

## File Format Standards

### YAML Frontmatter

Every `.ai/` file must begin with YAML frontmatter:

```yaml
---
file: [filename]
project: [project name]
owner: [role, not person name]
last-updated: YYYY-MM-DD
review-cadence: [sprint | schema-changes | role-changes | as-needed]
---
```

**Rationale:** Frontmatter enables machine-readable indexing, staleness detection, and automation.

### Headings

Use `##` for top-level sections within a file. Reserve `#` for the document title only.

### Tables

Use Markdown tables for structured data (schema fields, roles, ownership). Do not use prose where a table suffices.

### Links

Use relative links to reference other `.ai/` files:
```markdown
See [data-model.md](data-model.md) for schema details.
```

### Dates

Always use ISO 8601 format: `YYYY-MM-DD`.

---

## Content Standards

### What Belongs in `.ai/`

- Architecture decisions and their rationale
- Naming conventions and schema rules
- Domain terminology
- Security constraints and access patterns
- Known gotchas and non-obvious constraints
- Current state and active priorities
- Links to authoritative sources

### What Never Belongs in `.ai/`

- Credentials, secrets, or connection strings
- Personally Identifiable Information (PII)
- Environment variable values
- Personal commentary about individuals
- Speculative or aspirational content presented as fact

---

## Update Standards

### Trigger-Based Updates

AI context must be updated when the corresponding system changes — not on a fixed schedule alone. See [governance.md](governance.md) for the full trigger table.

### PR Requirements

Every PR that changes code governed by an `.ai/` file must include the AI Context Checklist in its description. See the PR template.

### Staleness Policy

A `.ai/` document is considered stale if:
- The `last-updated` date is more than two sprints old, **and**
- The governed system has changed since that date

Stale documents must be flagged and updated before the next sprint planning session.

---

## Naming Conventions

| File | Purpose |
|------|---------|
| `context.md` | Primary AI bootstrap — always read first |
| `domain.md` | Domain terminology and definitions |
| `data-model.md` | Schema, tables, relationships |
| `security.md` | Roles, groups, access patterns |
| `pipelines.md` | ALM, CI/CD, deployment standards |
| `debt.md` | Technical debt register |
| `onboarding.md` | Developer onboarding guide |
| `bootstrap-prompt.md` | AI session startup prompt |
| `decisions/adr-NNN-title.md` | Architecture Decision Records |

ADR numbering must be sequential with zero-padded three-digit numbers (e.g., `adr-001`, `adr-042`).

---

## Quality Checklist

Before merging any change to `.ai/`:

- [ ] YAML frontmatter is present and `last-updated` is current
- [ ] Content reflects the current state of the system
- [ ] No credentials, secrets, or PII are present
- [ ] Links to other `.ai/` files are relative and valid
- [ ] Tables are used where prose would be less clear
- [ ] Document is under 500 lines (or justified exception noted)
