# AI Context Framework — Repository Registry

Track which project repositories have adopted this framework. Update this file when onboarding or offboarding a repository.

---

## Registry Format

Each entry records:
- **Repository** — name and link
- **Adoption date** — when `.ai/` was initialized
- **Tier-2 owner** — the tech lead responsible for `.ai/` in that repo
- **Mode** — `standalone` or `squad-companion`
- **Status** — current adoption status
- **Squad boundary enforcement** — optional note when `.ai/` / `.squad/` boundary checks are active
- **Notes** — any deviations or special configuration

Existing adopters remain valid when registry fields are added. Populate new fields during the next registry touch unless Architecture Team directs an immediate migration.

---

## Registered Repositories

| Repository | Adoption Date | Tier-2 Owner | Mode | Status | Squad Boundary Enforcement | Notes |
|------------|---------------|--------------|------|--------|----------------------------|-------|
| *(this repo)* `ai-context-framework` | 2026-05-12 | Architecture Team | `squad-companion` | Active | Active | Enterprise standards repo |

---

## Adoption Statuses

| Status | Meaning |
|--------|---------|
| `Active` | `.ai/` is current, governed, and maintained |
| `Bootstrapped` | `.ai/` created but not yet fully populated |
| `Stale` | `.ai/` exists but has not been updated in 2+ review cycles |
| `Archived` | Repository is retired; context preserved for reference |

---

## Adoption Modes

| Mode | Meaning |
|------|---------|
| `standalone` | Repository uses `.ai/` context without a committed `.squad/` companion workflow |
| `squad-companion` | Repository uses `.ai/` context with `.squad/` as the AI-team working log |

---

## Registering a New Repository

1. Add an entry to the table above.
2. Copy templates from [`templates/`](templates/) into the repo's `.ai/` directory.
3. Assign a Tier-2 owner.
4. Set `Mode` to `standalone` or `squad-companion`.
5. Set status to `Bootstrapped`.
6. Note whether Squad boundary enforcement is active, if applicable.
7. Open a PR against this registry.

Changes to the registry schema or adoption mode definitions require Architecture Team review.
