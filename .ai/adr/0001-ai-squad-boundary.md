---
adr: 0001
title: The .ai/ and .squad/ boundary
status: accepted
date: 2026-07-25
deciders: Devon Aleshire (PM), Carlsen (Architect)
reviewers: Kasparov (Standards), Fact Checker
applies-to: ai-context-framework and adopter repos using Squad
supersedes:
superseded-by:
---

# ADR-0001: The .ai/ and .squad/ boundary
## Decision

Keep `.ai/` and `.squad/` as complementary surfaces. `.ai/` is durable product knowledge: the WHAT and WHY that should survive across sessions, agents, and tools. `.squad/` is Squad's AI-team working log: the HOW, who-decided, what-was-done, routing, charters, ceremonies, session state, and execution/process decisions.

Product architecture decisions are recorded as ADRs under `.ai/adr/` using four-digit, zero-padded filenames such as `0001-ai-squad-boundary.md`. `.squad/decisions.md` must not restate a product decision; it may link to the product ADR and record only the Squad execution consequence.

## Context

The AI Context Framework predates Squad and provides a tool-agnostic `.ai/` contract for durable repository and enterprise context. Squad, from `bradygaster/squad`, adds an AI team operating model with rosters, charters, routing, ceremonies, working memory, and session logs under `.squad/`.

Without a clear boundary, the two surfaces can become duplicate decision ledgers. Duplicate ledgers drift, and drift pressures the project toward either folding the framework into Squad or making Squad restate durable product context. The approved direction is complement, not kill: keep a slim `.ai/` surface and let Squad own the team operating layer.

## Rationale

The core invariant is that durable source-of-truth memory and working/session memory never merge. `.ai/` must remain useful to any assistant, tool, or adopter repository whether or not Squad is installed. `.squad/` should remain optimized for Squad's team mechanics and execution history.

This preserves the framework's three-tier model while allowing Squad to improve collaboration around it. ADRs give product decisions a stable home. Squad decisions stay lightweight by linking to ADRs instead of copying their decision, rationale, consequences, or alternatives.

## Consequences

- `.ai/` remains the durable product knowledge surface for repository context and architecture decisions.
- `.ai/adr/` is the product ADR home.
- `.squad/` owns routing, charters, ceremonies, session state, execution logs, and Squad process decisions.
- `.squad/decisions.md` records team/process decisions and links to product ADRs; it must not restate product decisions.
- Default `.ai/` stays slim; `debt.md` and `onboarding.md` are cut from the default surface.
- Adopter repositories can use the `.ai/` contract without Squad, and Squad-enabled repos can add `.squad/` without replacing `.ai/`.

## Alternatives considered

- Fold the framework entirely into `.squad/`: rejected because it would make durable product context depend on Squad and weaken tool-agnostic adoption.
- Keep duplicate decision records in `.ai/` and `.squad/`: rejected because duplicated product decisions drift.
- Alternative ADR path `.ai/decisions/adr-NNN-*.md` (rejected): the `.ai/adr/NNNN-title.md` convention was chosen instead for clarity and to avoid collision with the `.squad/decisions.md` name.
- Expand default `.ai/` with `debt.md` and `onboarding.md`: rejected to keep the default product surface slim.

## Review path

Carlsen proposed the boundary, Kasparov reviewed the standards implications, Fact Checker reviewed for consistency, and Devon Aleshire approved execution on 2026-07-25T01:08:38-07:00.

## References

- `bradygaster/squad`
- `../context.md`
- `../../.squad/decisions.md`
