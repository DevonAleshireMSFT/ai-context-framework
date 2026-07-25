# Governance and Ownership Model

**Owner:** Architecture Team  
**Review Cadence:** Quarterly  
**Applies to:** All repositories registered in [registry.md](../registry.md)

---

## Tier Model

| Tier | Scope | Owner | Location |
|------|-------|-------|----------|
| Tier 1 — Enterprise | Org-wide standards, glossary, governance | Architecture Team | This repository |
| Tier 2 — Project | Repository-specific context, Product ADRs, schema | Tech Lead + domain owners | `.ai/` in each project repo |
| Tier 3 — Personal | Developer working memory | Individual developer | `.ai_local/` (gitignored) |

---

## Document Ownership

Every Tier-2 document has a designated owner by role. Ownership is by role, not by person, to survive team changes.

| Document | Owner Role | Review Cadence |
|----------|-----------|----------------|
| `context.md` | Tech Lead / Architect | Regular ownership review |
| `data-model.md` | Schema Owner | Schema changes |
| `security.md` | Security Owner | Role changes |
| `pipelines.md` | DevOps Owner | Pipeline changes |
| `domain.md` | Domain Expert | Domain changes |
| `adr/NNNN-title.md` | Decision owner + Tech Lead / Architect | At decision time |

Optional repository-local documents, such as `debt.md` or `onboarding.md`, may define owners locally. They are not part of the default governed `.ai/` surface.

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
| Product or architecture decision made | Create a Product ADR in `.ai/adr/NNNN-title.md` |
| Pipeline or deployment process change | Update `pipelines.md` |
| New domain term adopted or redefined | Update `domain.md` |
| Major milestone or release | Update `context.md` current state |

---

## Decision Routing

Decisions must be recorded in the correct system. Product knowledge and Squad working memory must not fork.

| Decision Type | Record In | Review Path |
|---------------|-----------|-------------|
| Product or architecture decision | Product ADR in `.ai/adr/NNNN-title.md` | Decision owner + Tech Lead / Architect |
| Team or process decision | `.squad/decisions.md` | Squad owner or affected team lead |
| Squad execution consequence of a Product ADR | Link from `.squad/decisions.md` to the Product ADR | Squad owner; no duplicate architecture review unless the ADR changes |
| Change to the `.ai/` / `.squad/` boundary or any `org/` standard governing that boundary | Tier-1 PR in this repository | Architecture Team |

Product ADRs MUST be reviewed by the decision owner and the Tech Lead or Architect responsible for the affected product area. `.squad/decisions.md` MUST NOT restate or summarize a Product ADR; it may only link to the ADR and record Squad execution consequences.

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
- [ ] Product ADR created in `.ai/adr/` (if product or architecture decision made)
- [ ] `pipelines.md` updated (if pipeline changed)
- [ ] No credentials, secrets, or PII introduced
```

---

## Staleness Policy

A document is stale if:
- The `last-updated` frontmatter date is more than two review cycles old, **and**
- The governed system has changed since that date.

**Stale document handling:**
1. Flag during the next regular planning or ownership review.
2. Assign update to document owner.
3. Update before the next review cycle closes.
4. Documents that remain stale for two consecutive review cycles are escalated to the Tech Lead.

---

## Review Workflow for `org/` Standards

Tier-1 standards are enterprise-authoritative. Changes to these paths MUST follow this workflow:
- `org/**`
- `registry.md` schema, mode, and status tables
- `templates/**` contracts
- `.ai/adr/**` Product ADRs for this framework's load-bearing standards decisions

Architecture Team review is required through CODEOWNERS, with at least one Architecture Team approval before merge.

| Change Class | Rule | Review Path |
|--------------|------|-------------|
| Editorial or typo fix | MAY fast-track, but still requires one Architecture Team approval. | CODEOWNERS review |
| Additive standard | MUST explain the new guidance and its affected adopters. | CODEOWNERS review |
| Breaking standard change | MUST include a PR migration note when renaming or removing a required field, contract, mode, status, or boundary rule. Significant, load-bearing standards decisions SHOULD be considered for a Product ADR under [`.ai/adr/`](../.ai/adr/) instead of being recorded only in Squad working memory. | CODEOWNERS review + migration note + ADR consideration |

The merge process is:
1. Open a PR with the proposed change and rationale.
2. Let CI conformance checks run, including the AI Context Conformance workflow from #1 and the validators from #4, #5, and #6 when present.
3. Obtain CODEOWNERS approval from the Architecture Team.
4. Merge only after review and required checks pass.

Hotfixes MAY merge before approval only to restore a broken standard or release path. The PR or follow-up issue MUST log the waiver reason, and Architecture Team post-hoc review MUST occur after the emergency merge.

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
