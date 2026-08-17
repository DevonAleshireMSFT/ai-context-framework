# Project Context

- **Owner:** Devon Aleshire
- **Project:** AI Context Framework — an enterprise standards, templates, and governance system for structuring and maintaining AI context (`.ai/` directories) across software repos. Three-tier model: enterprise standards (this repo) / project `.ai/` / developer-local `.ai_local/`.
- **Stack:** Markdown, GitHub Pages docs site, GitHub Actions (planned CI validation), `.template` files, repo registry.
- **Created:** 2026-07-25

## Learnings

<!-- Append new learnings below. Each entry is something lasting about the project. -->
- All template files use the `.template` extension to distinguish them from live documents.
- The framework's promise is a working `.ai/` setup in under 10 minutes — protect that path.
- Docs site: https://devonaleshiremsft.github.io/ai-context-framework/
📌 Team update (2026-07-25T01:08:38-07:00): Boundary refactor planned — `.ai/` will remain slim durable product context while Squad owns team execution; docs and validation work will follow.
- 2026-07-25T02:22:07-07:00: Delivered issue #8 in PR #18 by adding the Automation & CI docs page and docs index pointer.
- 2026-07-25T02:22:07-07:00: Delivered issue #7 in PR #16 with the org standards review workflow and scoped CODEOWNERS.
- 2026-07-27T10:40:00-07:00: Fixed GitHub Pages 404s and escaping docs links in PR #28 (fd1c251), then fixed issue #29 by correcting the PR-template ADR path in PR #32 (fdd7ebd).
- 2026-08-13T16:41:12-07:00: Enhanced `templates\setup-prompt.md.template` with scope/safety, dirty-worktree protection, idempotency, evidence-grounding, collision-safe ADR numbering, and measurable validation. Durable learning: copy-if-absent artifacts (e.g., `.github/prompts/ai-context-setup.prompt.md`) are initialized once and **not** auto-synchronized to template changes — this preserves adopter customizations across template updates and avoids clobbering local context.

📌 Team update (2026-08-16T18:03:16.379-07:00): ngAIO submission assessment — documentation revision and readiness scoring. Hardened claims, corrected readiness to 3.3/5. Strongest gap identified: independent pilot/adoption evidence. Recommendation updated to: Submit after **targeted** remediation.
