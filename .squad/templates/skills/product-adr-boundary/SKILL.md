---
name: "product-adr-boundary"
description: "Enforce the boundary between product ADRs and Squad execution decisions"
domain: "governance"
confidence: "high"
source: "manual"
---

## Context

An adopter repository may use both `.ai/` product context and Squad team context. Product architecture decisions belong in `.ai/adr/`; Squad decisions belong in `.squad/decisions.md`. Agents MUST avoid duplicate decision ledgers: `.squad/decisions.md` may link to a product ADR and record the Squad execution consequence, but it MUST NOT restate the product decision, rationale, constraints, consequences, or alternatives.

## Patterns

### Decision Boundary Test

Before recording any decision, classify it:

- **Product decision → `.ai/adr/NNNN-title.md`**
  - Defines WHAT the product/repository architecture is.
  - Explains WHY a design, standard, or constraint exists.
  - Establishes load-bearing technical constraints, context contracts, templates, schemas, lifecycle rules, or compatibility requirements.
  - Would still matter if Squad were replaced by a different agent/team system.
- **Team/process decision → `.squad/decisions.md`**
  - Defines WHO handles work, HOW Squad routes tasks, or WHEN ceremonies happen.
  - Records session, coordination, reviewer, escalation, or agent operating rules.
  - Only matters to Squad execution and team workflow.

If a decision contains both, split it: write the product decision as an ADR, then record only the Squad consequence in `.squad/decisions.md`.

### Product ADR Capture

When the decision is a product decision:

1. Create or update an ADR under `.ai/adr/NNNN-title.md`.
2. Use a stable four-digit sequence and kebab-case title, for example `.ai/adr/0007-context-registry-schema.md`.
3. Use the adopter repo's ADR template if one exists. If not, use the minimal sections:
   - `# NNNN Title`
   - `Date`
   - `Status`
   - `Context`
   - `Decision`
   - `Consequences`
4. Do not also restate the ADR in `.squad/decisions.md`.

### Squad Decision Link Format

When `.squad/decisions.md` needs to mention a product decision, use only a relative link from `.squad/decisions.md` to the ADR:

```markdown
See [ADR NNNN: Title](../.ai/adr/NNNN-title.md).
Squad consequence: {only the routing/process/session implication}.
```

The link target MUST be `../.ai/adr/NNNN-title.md`.

## Examples

**DO: link to the ADR and record only Squad execution consequence**

```markdown
### 2026-07-25T01:08:38-07:00: Context registry adoption
See [ADR 0007: Context registry schema](../.ai/adr/0007-context-registry-schema.md).
Squad consequence: Tooling owns CI validation for registry freshness and schema conformance.
```

**DON'T: restate the product decision in Squad decisions**

```markdown
### 2026-07-25T01:08:38-07:00: Context registry adoption
We chose a registry schema because the product needs durable discovery,
tool-agnostic context lookup, freshness metadata, and compatibility guarantees...
```

## Anti-Patterns

- ❌ Copying ADR rationale, constraints, consequences, or alternatives into `.squad/decisions.md`.
- ❌ Recording product architecture decisions only in `.squad/decisions.md`.
- ❌ Linking to `.ai/adr/` with an absolute path or repository-specific URL.
- ❌ Using `.squad/decisions.md` as the source of truth for product standards.
- ❌ Combining product architecture and Squad routing into one unsplit decision entry.
