# Governance and Ownership Model

**Owner:** Architecture Team  
**Review Cadence:** Quarterly  
**Applies to:** All repositories registered in [registry.md](../registry.md)

---

## Tier Model

| Tier | Scope | Owner | Location |
|------|-------|-------|----------|
| Tier 1 — Enterprise | Org-wide standards, glossary, governance | Architecture Team | This repository |
| Tier 2 — Project | Repository-specific context, decisions, schema | Tech Lead + domain owners | `.ai/` in each project repo |
| Tier 3 — Personal | Developer working memory | Individual developer | `.ai_local/` (gitignored) |

---

## Document Ownership

Every Tier-2 document has a designated owner by role. Ownership is by role, not by person, to survive team changes.

| Document | Owner Role | Review Cadence |
|----------|-----------|----------------|
| `context.md` | Tech Lead / Architect | Every sprint |
| `data-model.md` | Schema Owner | Schema changes |
| `security.md` | Security Owner | Role changes |
| `debt.md` | Tech Lead | Sprint planning |
| `pipelines.md` | DevOps Owner | Pipeline changes |
| `domain.md` | Domain Expert | Domain changes |
| `onboarding.md` | Tech Lead | Major milestones |
| `decisions/adr-*.md` | Decision maker + Tech Lead | At decision time |

Owners are responsible for:
1. Keeping the document current
2. Reviewing PRs that affect governed systems
3. Triggering updates when the system changes

---

## Event-Driven Update Triggers

AI context must be updated when the corresponding event occurs. Do not wait for a scheduled review.

| Event | Required Action |
|-------|----------------|
| Schema change (add/remove/rename table or column) | Update `data-model.md` |
| Security role or group change | Update `security.md` |
| Architecture decision made | Create new ADR in `decisions/` |
| Technical debt identified or resolved | Update `debt.md` |
| Pipeline or deployment process change | Update `pipelines.md` |
| New domain term adopted or redefined | Update `domain.md` |
| New developer joins the team | Review `onboarding.md` |
| Major milestone or release | Update `context.md` current state |

---

## PR Governance

Every pull request that affects a system governed by a `.ai/` document must:

1. Include the AI Context Checklist in the PR description.
2. Update all relevant `.ai/` documents in the same PR (or open a tracked follow-up issue immediately).
3. Receive approval from the document owner.

The AI Context Checklist:

```markdown
## AI Context Checklist
- [ ] `data-model.md` updated (if schema changed)
- [ ] `security.md` updated (if roles changed)
- [ ] ADR created (if architecture decision made)
- [ ] `debt.md` updated (if debt added or resolved)
- [ ] `pipelines.md` updated (if pipeline changed)
- [ ] No credentials, secrets, or PII introduced
```

---

## Staleness Policy

A document is stale if:
- The `last-updated` frontmatter date is more than two sprints old, **and**
- The governed system has changed since that date.

**Stale document handling:**
1. Flag during sprint planning.
2. Assign update to document owner.
3. Update before end of sprint.
4. Documents that remain stale for two consecutive sprints are escalated to the Tech Lead.

---

## Enterprise Standards Governance

Changes to Tier-1 standards (this repository) require:
1. Proposal submitted as a PR with rationale.
2. Review by the Architecture Team.
3. Notification to all Tier-2 owners via the registry.
4. A migration period if changes affect existing Tier-2 documents.

---

## Onboarding New Repositories

When a new project repository adopts this framework:

1. Tech Lead copies templates from [`templates/`](../templates/).
2. Tech Lead populates `.ai/context.md` as the bootstrap document.
3. Tech Lead registers the repo in [`registry.md`](../registry.md).
4. Team adds `.ai_local/` to `.gitignore`.
5. Team adds the PR template to `.github/PULL_REQUEST_TEMPLATE.md`.
6. Status is set to `Bootstrapped` until all core files are populated.

---

## Offboarding / Archival

When a repository is retired:

1. Tech Lead updates registry status to `Archived`.
2. `.ai/` documents are preserved in source control for historical reference.
3. A final `context.md` entry is added noting the archival date and reason.
