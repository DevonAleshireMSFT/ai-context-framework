# Platform-Specific Guidance

**Owner:** Architecture Team  
**Review Cadence:** When platform stack changes  
**Applies to:** All teams using this framework

---

## Purpose

This document provides platform-specific guidance for implementing AI context. It supplements the general standards in [standards.md](standards.md) with guidance tailored to specific platforms and tooling stacks.

---

## Microsoft Power Platform / Dataverse

### Schema Context

When documenting Dataverse schema in `data-model.md`:

- Record the **logical name** (e.g., `stk_hardware`), **display name**, and **table type** (Standard, Activity, Virtual).
- Note the **publisher prefix** for all custom tables and columns.
- Flag tables that are **excluded from source control** (e.g., configuration tables with environment-specific data).
- Record **relationships** with relationship type (1:N, N:N) and lookup column names.

### Naming Conventions

Always document the active publisher prefix in `context.md`:

```markdown
## Key Rules
- All new schema uses prefix `stk_`
- Legacy prefix `mnpoc_` must never be renamed post go-live
- Configuration tables are excluded from solution packaging
```

### PAC CLI Integration

For teams using the Power Platform CLI (`pac`):

- Record the solution names managed in source control.
- Note which solutions are unpacked vs. managed.
- Automation opportunity: generate schema snapshots from `pac solution list` and `pac env who`.

---

## Azure DevOps

### Pipeline Context

When documenting pipelines in `pipelines.md`:

- Record pipeline names, YAML file locations, and the environments they target.
- Document approval gates and their approvers (by role, not person).
- Note any pipeline variables that reference Key Vault or variable groups (names only — never values).

### Wiki Integration

Opportunity: sync `.ai/` documents to Azure DevOps Wiki using pipeline automation, making context discoverable to non-developer team members.

---

## GitHub

### PR Template

Place the AI Context Checklist in `.github/PULL_REQUEST_TEMPLATE.md`. See the template in this repository's [`.github/PULL_REQUEST_TEMPLATE.md`](../.github/PULL_REQUEST_TEMPLATE.md).

### Pre-Commit Hooks

Recommended pre-commit hook to block accidental `.ai_local/` commits:

```yaml
# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: no-ai-local
        name: Block .ai_local/ commits
        entry: bash -c 'git diff --cached --name-only | grep -q "^\.ai_local/" && echo "ERROR: .ai_local/ must not be committed" && exit 1 || exit 0'
        language: system
        pass_filenames: false
```

---

## Azure AI Search (RAG — Long-Term)

For teams implementing Retrieval-Augmented Generation:

- `.ai/` documents are structured for AI Search indexing.
- YAML frontmatter fields map to index fields (`project`, `last-updated`, `owner`).
- Keep documents under 500 lines to fit within typical chunking strategies.
- ADRs are ideal RAG candidates due to their structured, self-contained format.

---

## VS Code / GitHub Copilot

### Context Loading

Recommended pattern for loading context at the start of a Copilot session:

1. Open `bootstrap-prompt.md` in the chat context.
2. Reference `.ai/context.md` explicitly at session start.
3. Pin domain-specific files (`data-model.md`, `security.md`) when working in those areas.

### Workspace Settings

Consider adding `.ai/` to VS Code workspace trusted folders and excluding `.ai_local/` from source control visibility in settings:

```json
{
  "files.exclude": {
    ".ai_local/": true
  }
}
```

Note: `files.exclude` hides from the file explorer but does not substitute for `.gitignore`.
