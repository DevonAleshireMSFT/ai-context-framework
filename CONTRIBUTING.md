# Contributing to the AI Context Framework

Thank you for contributing. This framework is a living system — contributions that improve clarity, governance, or real-world applicability are always welcome.

---

## Types of Contributions

| Type | Description |
|------|------------|
| **Template improvement** | Improve or extend a file in `templates/` |
| **Standard refinement** | Refine authoring standards in `org/standards.md` |
| **Governance update** | Update ownership models or trigger tables in `org/governance.md` |
| **Platform guidance** | Add platform-specific guidance in `org/platform.md` |
| **Glossary expansion** | Add enterprise-wide terms to `org/glossary.md` |
| **Bug fix** | Fix broken links, typos, or incorrect instructions |

---

## Before You Start

1. **Check existing issues or PRs** — avoid duplicating in-flight work.
2. **For significant changes**, open an issue first to discuss the proposal before investing time in a PR.
3. **Template changes** affect every team that adopts this framework — treat them conservatively. Prefer additive changes over restructuring.

---

## Contribution Guidelines

### All Contributions

- Follow the authoring standards in [`org/standards.md`](org/standards.md).
- Use YAML frontmatter in any `.ai/` or template file you create or modify.
- Use ISO 8601 dates (`YYYY-MM-DD`).
- Use relative links within the repository.
- Never include credentials, secrets, PII, or connection strings — even as examples.

### Template Contributions

- Templates use the `.template` extension. Do not remove it.
- All placeholder values must be wrapped in `[square brackets]`.
- Templates must be generic enough to apply across platforms and industries.
- Include enough structure that a new adopter knows exactly what to fill in.
- If a section is optional, mark it clearly.

### Standard and Governance Contributions

- Changes to `org/standards.md` or `org/governance.md` have broad impact. Explain the rationale clearly in your PR description.
- Governance changes should include the before/after behavior, not just the new rule.

### ADR Contributions

If your contribution involves an architectural decision about this framework itself:
- Create an ADR in `.ai/decisions/` following [`templates/adr.md.template`](templates/adr.md.template).
- Reference the ADR in your PR description.

---

## Pull Request Process

1. **Fork** the repository and create a branch from `main`.
2. **Make your changes** following the guidelines above.
3. **Complete the PR checklist** in the PR description (see [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md)).
4. **Request review** from at least one maintainer.
5. PRs to `org/` require review from the Architecture Team or a designated maintainer.
6. PRs to `templates/` require at least one review from an existing framework adopter.

---

## What We Will Not Merge

- Changes that add platform-specific content to generic templates (use `org/platform.md` instead)
- Examples containing real credentials, connection strings, or PII
- Restructuring that breaks backward compatibility without a migration path and ADR
- Changes that blur the boundary between authoritative documentation and AI working memory

---

## Reporting Issues

Open a GitHub Issue describing:
- What the problem is
- Which file(s) are affected
- What the correct behavior or content should be

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
