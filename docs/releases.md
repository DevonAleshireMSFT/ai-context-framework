---
layout: default
title: Release Notes
nav_order: 9
permalink: /releases
---

# Release Notes
{: .no_toc }

<div class="ai-disclaimer">
<strong>AI-Assisted Content</strong> — This framework was developed with assistance from GitHub Copilot. Content has been reviewed by human maintainers, but may contain errors or become outdated. Validate all guidance against your organization's requirements, current authoritative documentation, security and compliance policies, and applicable laws before implementation. AI-generated output produced using this framework requires human review. This project does not constitute official Microsoft, government, legal, security, or compliance guidance. Use is at your own risk. <a href="responsible-ai">Read the full Responsible AI guidance.</a>
</div>

## Release status

The project has not yet published its first formal versioned release. The package currently
declares version `0.1.0`; changes being prepared for that release remain under
[`Unreleased`](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/CHANGELOG.md#unreleased)
until the repository owner approves a tag and GitHub Release.

## Installing a released version

After `v0.1.0` is published, pin the Git-based install to that immutable tag:

```bash
npm i -g github:DevonAleshireMSFT/ai-context-framework#v0.1.0
ai-context init
```

Or run the tagged version once without a global install:

```bash
npx github:DevonAleshireMSFT/ai-context-framework#v0.1.0 init
```

Unqualified installs from the repository follow the current branch and are intended for
evaluation or development, not reproducible production adoption.

## Where release information lives

| Artifact | Purpose |
|----------|---------|
| [GitHub Releases](https://github.com/DevonAleshireMSFT/ai-context-framework/releases) | Approved release summaries, source artifacts, installation, upgrades, compatibility, and known limitations |
| [`CHANGELOG.md`](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/CHANGELOG.md) | Canonical detailed history organized by Added, Changed, Fixed, Removed, Security, and Breaking Changes |
| This page | Customer-facing latest-version status and links to approved release records |
| [`package.json`](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/package.json) | Framework version used by tooling and release tags |

## Versioning policy

The project follows [Semantic Versioning](https://semver.org/):

- **Patch** (`0.1.1`) — fixes and documentation corrections without intentional contract changes.
- **Minor** (`0.2.0`) — new backward-compatible commands, templates, or capabilities.
- **Major** (`1.0.0`) — a stable public contract or an incompatible change after 1.0.

Before 1.0, any breaking template, schema, CLI, or managed-file behavior is called out
prominently in the release notes, even when represented by a minor version.

## Release checklist

1. Confirm the intended version and compatibility impact.
2. Move completed entries from `[Unreleased]` into `## [X.Y.Z] - YYYY-MM-DD`.
3. Update `package.json` and generated framework-version references together.
4. Run the full test, strict validation, link, registry, drift, staleness, and Pages build checks.
5. Review installation, upgrade, breaking-change, security, and known-limitation notes.
6. Obtain explicit repository-owner approval.
7. Create an annotated `vX.Y.Z` tag and GitHub Release from the approved `main` commit.
8. Update this page to identify and summarize the latest stable release.

The complete decision is recorded in
[ADR-0004](https://github.com/DevonAleshireMSFT/ai-context-framework/blob/main/.ai/adr/0004-release-lifecycle-and-notes.md).
