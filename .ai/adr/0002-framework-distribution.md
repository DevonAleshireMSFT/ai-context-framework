---
adr: 0002
title: Framework distribution through an npm CLI with enterprise fallback
status: accepted
date: 2026-07-26
deciders: Carlsen (Framework Architect)
reviewers: Polgar (QA)
applies-to: scripts, templates, package.json, consumer repos
supersedes: null
superseded-by: null
---

# ADR-0002: Framework distribution through an npm CLI with enterprise fallback
## Decision

Distribute the AI Context Framework primarily as a zero-runtime-dependency scoped Node package, `@devonaleshiremsft/ai-context`, invoked with `npx @devonaleshiremsft/ai-context`. The package will expose an `ai-context` bin for the CLI subcommands, with enterprise fallback paths that resolve the same pinned package artifact from configured private registries or checked-in tarballs.

## Context

The current adoption model is manual: adopters copy templates, scripts, PR checklist content, and Copilot instructions from this repository into their project repositories. That is simple to understand but does not scale once the framework has versioned tooling, conformance checks, and managed update behavior.

Issues #23 and #24 need a durable distribution decision before implementation. Versioning and drift detection need a source of truth for what version of the framework a consumer has installed. The planned CLI should use `npx @devonaleshiremsft/ai-context update`; the unscoped public npm name `ai-context` is already taken by another package and is therefore rejected. The npm-primary path remains correct only if enterprise adopters can still operate through private registries, pinned artifacts, and disconnected environments.

The framework tooling is already ESM, targets Node >=18, and has zero runtime dependencies. The distribution mechanism should preserve that shape so consumer repositories do not inherit dependency risk just to manage AI context files.

Updates also have a strict content boundary. Consumer-owned `.ai/**` content is durable project knowledge and must never be overwritten by framework updates. The framework may manage only the tooling layer: scripts, shared helper modules, conformance workflow, PR template, and template source files. Copilot and Squad integration needs special care because `.github/copilot-instructions.md` may already contain Squad coordinator content; framework updates must merge or prompt, not clobber.

## Rationale

An npm CLI is the cleanest primary distribution channel because it gives the framework a standard versioned artifact, a natural `init/update/check` command surface, and a low-friction entry point for developers who already have Node available for the validator. `npx @devonaleshiremsft/ai-context update` will compare a consumer repo's installed framework stamp with the package version, apply idempotent tooling updates, and report drift without requiring the consumer to vendor this repository.

The key risk with npm is enterprise reach. Some adopters cannot call the public npm registry from CI or developer machines. That does not require rejecting npm as the package format. The framework can publish a package that is also mirrored to private registries or stored as a pinned tarball in an approved internal location. Private registry use will require `.npmrc` or equivalent registry configuration; offline tarball use changes the package spec passed to `npx`, for example `npx ./ai-context-<version>.tgz update`. The CLI subcommand surface will remain the same, while package installation and resolution are environment-specific.

Vendoring approaches make provenance visible in Git but make update mechanics harder. Git subtrees and submodules expose the entire framework repository inside consumers, blur the Tier 1/Tier 2 boundary, and force Git-specific workflows onto adopters. A copy/update script is useful as a fallback wrapper, but as the primary channel it would re-create a custom package manager without solving version discovery, command UX, or cross-platform policy cleanly.

## Consequences

**Positive:**
- Adopters will get one CLI subcommand surface: `ai-context init`, `ai-context update`, and `ai-context check`, exposed by the `@devonaleshiremsft/ai-context` package bin.
- Issue #23 can model drift against an explicit framework package version instead of file-copy folklore.
- Issue #24 can implement the scoped `npx @devonaleshiremsft/ai-context update` path without changing the epic direction.
- The framework keeps its current ESM, Node >=18, zero-runtime-dependency posture.
- Enterprise adopters can mirror the same package artifact to a private registry or approved artifact store instead of learning a separate update mechanism.

**Negative / trade-offs:**
- The framework must now treat package metadata, release notes, and CLI compatibility as product surface.
- Air-gapped use still needs an enterprise-controlled mirroring or tarball process.
- Update code must implement safe merge behavior instead of simple overwrite semantics.
- Consumers without Node >=18 cannot use the managed tooling path until they meet the runtime floor.

**Constraints introduced:**
- Tooling files managed by the framework must carry a machine-readable framework-version stamp for issue #23 drift detection.
- `ai-context update` must be idempotent and must never write, delete, or rewrite consumer-owned `.ai/**` files.
- The managed update scope is limited to tooling-layer assets: `scripts/`, shared helper modules, conformance workflow, PR template, template source files, and package metadata required by the CLI.
- Updates to `.github/copilot-instructions.md` must preserve existing Squad coordinator content; the CLI must merge compatible framework blocks or leave a manual action instead of overwriting the file.
- The CLI must support public npm, private npm registry, and pinned/offline package artifact execution by keeping the `init/update/check` subcommands identical while allowing environment-specific package specs and registry resolution.
- The package must remain ESM, require Node >=18, and avoid runtime dependencies unless a later ADR accepts the dependency risk.
- `ai-context check` must be safe for CI and report drift without mutating the working tree.

## Alternatives considered

| Alternative | Outcome | Reason |
|-------------|---------|--------|
| npm package distributed via `npx @devonaleshiremsft/ai-context` | Accepted | Best fit for versioned releases, `init/update/check` UX, CI checks, and the existing Node >=18 ESM tooling model; the unscoped `ai-context` name is taken, so a controlled scoped package is required, and enterprise needs are handled by configured private registry or pinned artifact fallback. |
| git subtree / submodule vendoring | Rejected | Makes updates Git-specific, vendors too much Tier 1 repository surface into consumers, complicates contributor workflows, and increases the chance of consumers editing framework-managed files directly. |
| copy/update script from a pinned tag | Rejected as primary; retained as possible wrapper/fallback | Simple for disconnected environments but weak for version discovery, cross-platform UX, drift checks, and policy; if used, it should invoke or install the same packaged CLI artifact rather than become a second implementation. |
| GitHub release archive only | Rejected | Useful for provenance but too coarse as the primary interface; consumers still need a command runner and safe merge logic, which returns the design to a CLI. |

## Review path

- Drafted by: Carlsen (Framework Architect)
- Reviewed by: Polgar (QA)
- Approval record: Issue #22; blocks issues #23 and #24

## References

- `docs/getting-started.md`
- `docs/architecture.md`
- `templates/adr.md.template`
- `scripts/validate-ai-context.mjs`
- Issue #22: Framework Distribution ADR
- Issue #23: Versioning and drift detection
- Issue #24: `npx @devonaleshiremsft/ai-context` CLI
