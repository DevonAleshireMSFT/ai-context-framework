# AI Context Framework — Repository Registry

Track which project repositories have adopted this framework. Update this file when onboarding or offboarding a repository.

---

## Registry Format

Each entry records:
- **Repository** — name and link
- **Adoption date** — when `.ai/` was initialized
- **Tier-2 owner** — the tech lead responsible for `.ai/` in that repo
- **Status** — current adoption status
- **Notes** — any deviations or special configuration

---

## Registered Repositories

| Repository | Adoption Date | Tier-2 Owner | Status | Notes |
|------------|---------------|--------------|--------|-------|
| *(this repo)* `ai-context-framework` | YYYY-MM-DD | Architecture Team | Active | Enterprise standards repo |

---

## Adoption Statuses

| Status | Meaning |
|--------|---------|
| `Active` | `.ai/` is current, governed, and maintained |
| `Bootstrapped` | `.ai/` created but not yet fully populated |
| `Stale` | `.ai/` exists but has not been updated in 2+ sprints |
| `Archived` | Repository is retired; context preserved for reference |

---

## Registering a New Repository

1. Add an entry to the table above.
2. Copy templates from [`templates/`](templates/) into the repo's `.ai/` directory.
3. Assign a Tier-2 owner.
4. Set status to `Bootstrapped`.
5. Open a PR against this registry.
