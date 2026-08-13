---
adr: 0003
title: Git install is the current primary distribution channel
status: accepted
date: 2026-08-12
deciders: Devon Aleshire (PM), Carlsen (Framework Architect)
reviewers: Capablanca (Docs), Polgar (QA)
applies-to: README.md, docs/getting-started.md, docs/cli.md, docs/automation.md, consumer repos
supersedes: 0002-framework-distribution.md
superseded-by: null
---

# ADR-0003: Git install is the current primary distribution channel

> Path: `.ai/adr/0003-git-install-primary-distribution.md`

---

## Decision

Distribute the AI Context Framework CLI primarily through **git install** —
`npm i -g github:DevonAleshireMSFT/ai-context-framework` or
`npx github:DevonAleshireMSFT/ai-context-framework <command>`. The npm-feed publish
(`@devonaleshiremsft/ai-context`) and the pinned/offline tarball (`npm pack`) channels
described in ADR-0002 are **deferred to the backlog**, not the current primary path. The
`init` / `update` / `check` subcommand surface and the zero-runtime-dependency, ESM,
Node >=18 posture are unchanged.

---

## Context

ADR-0002 accepted npm — `npx @devonaleshiremsft/ai-context` — as the primary distribution
channel, with private-registry and tarball fallbacks for enterprise reach. That decision was
sound in principle but was never realized: the package is marked `"private": true` and was
never published to any reachable registry. Adopters who followed the documented `npx` command
hit a hard `npm error 404 — package not found`, because the scoped name resolves against no
feed the adopter can read.

Git install, by contrast, works today with no publish step: the CLI has zero runtime
dependencies and no build step, so npm can resolve and run it directly from the GitHub
repository. PR #39 migrated every install instruction in `README.md`, `docs/getting-started.md`,
`docs/cli.md`, and `docs/automation.md` to the git-install commands, and moved the npm-feed and
tarball channels into the README Roadmap backlog.

This left a drift: the documentation now describes git install, while ADR-0002 still records npm
as the accepted primary channel. The framework's core promise is that `.ai/` is the durable
source of truth; an ADR that contradicts the shipped docs breaks that promise. This ADR
reconciles the record with reality.

---

## Rationale

Git install is chosen as the current primary channel because it is the only channel that works
for adopters **now**, with no publishing infrastructure, credentials, or feed configuration.
The framework's zero-dependency, no-build shape is exactly what makes `npx github:...` and
`npm i -g github:...` resolve cleanly, so nothing about the package needs to change to support it.

The npm-feed and tarball channels are not rejected — they remain valid future work with real
adopter value (org-wide `npm i -g` and air-gapped installs, respectively). They are deferred
because each requires infrastructure that does not yet exist: a reachable registry the package is
actually published to, or an approved artifact store for pinned tarballs. Recording them as
backlog rather than accepted decision keeps the decision record honest about what an adopter can
do today.

This ADR supersedes ADR-0002 rather than amending it because the *primary channel* — the single
most load-bearing claim in 0002 — has changed. The subcommand surface, safe-merge update
semantics, `.ai/**` write protections, and enterprise-reach requirement from 0002 all still hold;
only the default installation path is replaced.

---

## Consequences

**Positive:**
- The decision record now matches the shipped install docs; no adopter following an ADR-blessed
  command will hit the 404.
- Git install requires zero publishing infrastructure, so the framework is installable today.
- The deferred npm-feed and tarball channels are captured as explicit backlog with clear adopter
  value, not lost.

**Negative / trade-offs:**
- Git install pins adopters to a GitHub ref rather than a semver-resolved package version, so
  drift detection against a published framework version is weaker until a feed exists.
- Org-wide `npm i -g @devonaleshiremsft/ai-context` and air-gapped tarball installs remain
  unavailable until the deferred channels are built.
- Adopters behind a proxy that blocks GitHub git/tarball fetches need the deferred channels before
  they can install.

**Constraints introduced:**
- Install instructions in `README.md`, `docs/getting-started.md`, `docs/cli.md`, and
  `docs/automation.md` must use the git-install commands until a deferred channel is promoted by a
  future ADR.
- Promoting the npm-feed or tarball channel to primary requires a new ADR that supersedes this one;
  do not silently re-point the docs at an unpublished package again.
- The `init` / `update` / `check` subcommand surface and the zero-runtime-dependency, ESM,
  Node >=18 posture from ADR-0002 remain in force.

---

## Alternatives considered

| Alternative | Outcome | Reason |
|-------------|---------|--------|
| Publish `@devonaleshiremsft/ai-context` to public npm and keep ADR-0002 as-is | Rejected | The unscoped name is taken and the scoped package was never published; publishing now is real infrastructure work, not a documentation reconciliation. It stays on the backlog. |
| Amend ADR-0002 in place instead of superseding it | Rejected | The primary channel — the central decision of 0002 — changed; the ADR log should preserve the original decision and record the change as a distinct, dated supersession. |
| Leave docs on git install and ADR-0002 on npm (accept the drift) | Rejected | A decision record that contradicts the shipped docs breaks the framework's own source-of-truth guarantee and is exactly the drift the conformance gate exists to prevent. |
| Ship a checked-in copy/update script as the primary channel | Rejected | ADR-0002 already rejected this as the primary path; git install gives the same zero-publish benefit while keeping the packaged CLI as the single implementation. |

---

## Review path

- Drafted by: Carlsen (Framework Architect)
- Reviewed by: Capablanca (Docs), Polgar (QA)
- Approval record: Issue #42; follows PR #39 (git-install docs migration); supersedes ADR-0002 (Issue #22)

---

## References

- `.ai/adr/0002-framework-distribution.md` — superseded by this ADR
- `README.md` — Roadmap backlog (npm feed + tarball channels)
- `docs/getting-started.md`
- `docs/cli.md`
- `docs/automation.md`
- Issue #42: Reconcile ADR-0002 with git-install reality
- PR #39: Replace unpublished npx install command with working git install
