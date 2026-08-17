---
adr: 0004
title: Use SemVer tags, GitHub Releases, and a canonical changelog
status: accepted
date: 2026-08-17
deciders: Devon Aleshire (Repository Owner)
reviewers: Architecture Team
applies-to: package.json, CHANGELOG.md, docs/releases.md, GitHub Releases, release tags
supersedes: null
superseded-by: null
---

# ADR-0004: Use SemVer Tags, GitHub Releases, and a Canonical Changelog

> Path: `.ai/adr/0004-release-lifecycle-and-notes.md`

---

## Decision

Release the AI Context Framework with Semantic Versioning tags, GitHub Releases, a canonical
`CHANGELOG.md`, and a customer-facing `docs/releases.md` index. Releases require explicit
repository-owner approval and are installed from an immutable version tag.

---

## Context

The repository declares package version `0.1.0` and maintains an `[Unreleased]` changelog, but it
has no formal tags or GitHub Releases. ADR-0003 establishes Git install as the working
distribution channel. Installing from an unqualified branch is convenient for development but
does not give adopters an immutable, auditable release reference.

Release information also serves different audiences. Maintainers need a complete categorized
change ledger, while adopters need concise outcomes, compatibility notes, upgrade instructions,
and known limitations. One artifact cannot serve both needs well without a defined hierarchy.

---

## Rationale

Semantic Versioning communicates compatibility. An annotated `vX.Y.Z` tag gives Git-based
distribution an immutable release reference without requiring an npm registry. GitHub Releases
provide a discoverable delivery record and downloadable source artifacts. `CHANGELOG.md` remains
the detailed source of truth, while the Pages release-notes index gives adopters a concise,
customer-facing entry point.

Keeping release creation subject to explicit owner approval prevents documentation changes or
automation from publishing a release unintentionally.

---

## Consequences

**Positive:**
- Adopters can install or execute a known version from an immutable Git tag.
- Maintainers have one canonical, reviewable change ledger.
- GitHub and Pages provide complementary technical and customer-facing release views.
- Compatibility, upgrade guidance, and known limitations become part of every release decision.

**Negative / trade-offs:**
- Maintainers must keep the package version, tag, changelog, GitHub Release, and Pages summary in
  sync.
- Pre-1.0 releases require especially clear breaking-change notices because compatibility is
  still evolving.
- Release publication remains a deliberate manual approval step.

**Constraints introduced:**
- `CHANGELOG.md` is the canonical detailed release history. Changes accumulate under
  `[Unreleased]` and move to a dated version section during release preparation.
- Release tags use `vMAJOR.MINOR.PATCH` and must match the version in `package.json`.
- Stable installation guidance uses a tag, for example
  `npx github:DevonAleshireMSFT/ai-context-framework#v0.1.0 init`.
- Every GitHub Release summarizes customer value, installation and upgrade steps, compatibility,
  breaking changes, known limitations, and links to the full changelog.
- `docs/releases.md` identifies the latest stable version and links to GitHub Releases and the
  canonical changelog.
- Before 1.0, patch versions are fixes and documentation corrections; minor versions are new
  backward-compatible capabilities. Any breaking template, schema, CLI, or managed-file change
  must be prominently identified, even when SemVer permits it in a pre-1.0 minor release.
- No workflow may publish a tag or GitHub Release without explicit repository-owner approval.

---

## Alternatives considered

| Alternative | Outcome | Reason |
|-------------|---------|--------|
| Use only GitHub-generated release notes | Rejected | Generated notes do not reliably explain compatibility, migrations, known limitations, or customer value. |
| Use only `CHANGELOG.md` | Rejected | It lacks GitHub release discoverability and an immutable release landing page for adopters. |
| Publish every merge automatically | Rejected | The repository owner requires an explicit release approval gate, and not every merge is release-worthy. |
| Wait for npm publication before versioning | Rejected | Git tags provide immutable releases for the current Git-based distribution channel today. |

---

## Review path

- Drafted by: GitHub Copilot
- Reviewed by: Repository owner
- Approval record: Owner approval in the 2026-08-17 Copilot session

---

## References

- `.ai/adr/0003-git-install-primary-distribution.md`
- `CHANGELOG.md`
- `docs/releases.md`
- [Semantic Versioning 2.0.0](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
