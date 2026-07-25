---
layout: default
title: Governance
nav_order: 4
permalink: /governance
---

# Governance
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Why AI Context Needs Governance

AI context documents face a specific failure mode that standard code review doesn't catch: **context drift**.

Context drift occurs when a `.ai/` document accurately described the system at the time it was written, but the system has since changed and the document has not been updated. The document looks valid — it has no syntax errors, no broken tests — but it now gives an AI assistant incorrect information.

The result is an AI that confidently applies stale conventions, references renamed tables, or ignores new security constraints. The failure is silent until something breaks.

Governance solves context drift through **ownership** and **event-driven update triggers**.

---

## Ownership Model

Every AI context document has a designated owner by **role**, not by person. Role-based ownership survives team changes.

| Document | Owner Role | Review Cadence |
|----------|-----------|----------------|
| `context.md` | Tech Lead / Architect | Every sprint |
| `data-model.md` | Schema Owner | Schema changes |
| `security.md` | Security Owner | Role changes |
| `debt.md` | Tech Lead | Sprint planning |
| `pipelines.md` | DevOps Owner | Pipeline changes |
| `domain.md` | Domain Expert | Domain changes |
| `onboarding.md` | Tech Lead | Major milestones |
| `.ai/adr/NNNN-title.md` | Decision maker + Tech Lead | At decision time |

Owners are responsible for keeping their documents current, reviewing PRs that affect their domain, and triggering updates when the system changes.

---

## Event-Driven Update Triggers

AI context is updated when the corresponding event occurs — not on a fixed schedule alone. Fixed schedules are a backstop, not the primary mechanism.

| Event | Required Action |
|-------|----------------|
| Table or column added, removed, or renamed | Update `data-model.md` |
| Security role or group changed | Update `security.md` |
| Product decision made | Create or update Product ADR in `.ai/adr/` |
| Technical debt identified or resolved | Update `debt.md` |
| Pipeline or deployment process changed | Update `pipelines.md` |
| New domain term adopted or redefined | Update `domain.md` |
| New developer joins | Review `onboarding.md` |
| Major milestone or release | Update `context.md` current state |

---

## Product ADR Review Path

Product decisions live in `.ai/adr/NNNN-title.md`. They are durable project knowledge, not Squad working memory.

1. Draft the ADR from `templates/adr.md.template`.
2. Review it with the decision maker, Tech Lead, and any listed reviewers.
3. Merge it with the code or documentation change that depends on it.
4. If Squad is present, record only a link from `.squad/decisions.md`; do not restate the ADR.

---

## PR Checklist

Every pull request that changes a system governed by a `.ai/` document must include the AI Context Checklist. The checklist is included in the PR template:

```markdown
## AI Context Checklist
- [ ] data-model.md updated (if schema changed)
- [ ] security.md updated (if roles changed)
- [ ] Product ADR created in `.ai/adr/` (if product decision made)
- [ ] Squad decisions link to Product ADRs only; no product decision duplicated
- [ ] debt.md updated (if debt added or resolved)
- [ ] pipelines.md updated (if pipeline changed)
- [ ] No credentials, secrets, or PII introduced
```

A PR that changes schema without updating `data-model.md` is incomplete. The AI Context Checklist makes this visible at review time rather than after the fact.

---

## Staleness Policy

A document is **stale** if:
- The `last-updated` frontmatter date is more than two sprints old, **and**
- The governed system has changed since that date

Stale documents are flagged at sprint planning and assigned to the document owner for that sprint. Documents that remain stale for two consecutive sprints are escalated to the Tech Lead.

---

## What Never Belongs in AI Context

This is a hard boundary. Violations are a security risk, not a governance inconvenience.

- Credentials, API keys, or tokens
- Database connection strings
- Personally Identifiable Information (PII)
- Environment variable values
- Personal commentary about team members

If any of these appear in a `.ai/` file — even as examples — they must be removed immediately and the commit history reviewed.

---

## Enterprise Standards Changes

Changes to Tier 1 (the enterprise framework repo itself) follow a higher bar:

1. Submit a PR with the proposed change and written rationale
2. Architecture Team review required
3. All registered repository owners are notified
4. A migration period is provided if existing Tier 2 documents are affected

This ensures that changes to shared standards don't silently break teams who have already adopted the framework.

The authoritative review workflow for `org/`, registry, template-contract, and framework Product ADR changes is defined in [`org/governance.md`](../org/governance.md#review-workflow-for-org-standards).

---

## Risks and Mitigations

| Risk | Mitigation |
|------|-----------|
| Context drift | Event-driven ownership + PR checklist |
| AI docs replace authoritative docs | Strict authoritative/working-memory axis separation |
| Personal notes accidentally committed | `.gitignore` + pre-commit hooks |
| Context exceeds LLM token limits | Keep bootstrap docs under 500 lines; link to detail files |
| Sensitive data in AI context | Governance review + hard boundary rule |
| Ownership ambiguity after team change | Role-based ownership, not person-based |
