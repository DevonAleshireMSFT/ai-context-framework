# Security Policy

## Supported Versions

The AI Context Framework is currently at **v0.x** (pre-release). Only the latest commit on `main` is actively maintained. No backport or patch releases are made for earlier revisions.

| Version | Supported |
|---------|-----------|
| `0.x` (current `main`) | ✅ Supported |
| Earlier revisions | ❌ Not supported |

No production service is operated by this project. The framework provides files, templates, CLI tooling (no network listener), and documentation — it does not run as a server or process end-user data.

## Scope

This security policy covers:
- The CLI (`bin/ai-context.mjs`) and validation scripts under `scripts/`
- Template files distributed to adopter repositories
- GitHub Actions workflows in `.github/workflows/`
- Documentation published via GitHub Pages

This policy does **not** cover:
- The behavior or security of GitHub Copilot or any other AI model — those are external products governed by their respective providers
- Security of repositories that adopt this framework (adopters are responsible for their own configurations)
- Third-party packages referenced in `.mcp.json` (see `SUPPORT.md` for organizational approval status)

## Reporting a Vulnerability

Please use **[GitHub private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing/privately-reporting-a-security-vulnerability)** to report vulnerabilities privately.

Do not open a public issue for security-sensitive reports. GitHub's private reporting mechanism creates a draft security advisory that is only visible to repository maintainers.

**We cannot commit to a specific response SLA.** This is an open-source project maintained on a best-effort basis. We will acknowledge and assess reports as capacity allows.

## Out of Scope

The following are intentionally out of scope for this policy:
- Framework guidance that an adopter chooses to follow or not follow
- Security posture of adopter repositories
- AI model output accuracy or compliance
