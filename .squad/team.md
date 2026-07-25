# Squad Team

> ai-context-framework

## Coordinator

| Name | Role | Notes |
|------|------|-------|
| Fischer | Coordinator | Routes work, enforces handoffs and reviewer gates. |

## Members

| Name | Role | Charter | Status |
|------|------|---------|--------|
| Carlsen | Lead / Framework Architect | .squad/agents/carlsen/charter.md | 🏗️ Lead |
| Kasparov | Standards & Governance | .squad/agents/kasparov/charter.md | 📐 Standards |
| Capablanca | Templates & Documentation | .squad/agents/capablanca/charter.md | 📝 Docs |
| Tal | Automation & Tooling Engineer | .squad/agents/tal/charter.md | ⚙️ Tooling |
| Polgar | Quality & Validation (Reviewer) | .squad/agents/polgar/charter.md | 🧪 QA |
| Scribe | Session Logger | .squad/agents/scribe/charter.md | 📋 Scribe |
| Ralph | Work Monitor | .squad/agents/ralph/charter.md | 🔄 Monitor |
| Rai | RAI Reviewer | .squad/agents/Rai/charter.md | 🛡️ RAI |
| Fact Checker | Fact Checker | .squad/agents/fact-checker/charter.md | 🔍 Verifier |

## Coding Agent

<!-- copilot-auto-assign: false -->

| Name | Role | Charter | Status |
|------|------|---------|--------|
| @copilot | Coding Agent | — | 🤖 Coding Agent |

### Capabilities

**🟢 Good fit — auto-route when enabled:**
- Bug fixes with clear reproduction steps
- Test coverage (adding missing tests, fixing flaky tests)
- Lint/format fixes and code style cleanup
- Dependency updates and version bumps
- Small isolated features with clear specs
- Boilerplate/scaffolding generation
- Documentation fixes and README updates

**🟡 Needs review — route to @copilot but flag for squad member PR review:**
- Medium features with clear specs and acceptance criteria
- Refactoring with existing test coverage
- API endpoint additions following established patterns
- Migration scripts with well-defined schemas

**🔴 Not suitable — route to squad member instead:**
- Architecture decisions and system design
- Multi-system integration requiring coordination
- Ambiguous requirements needing clarification
- Security-critical changes (auth, encryption, access control)
- Performance-critical paths requiring benchmarking
- Changes requiring cross-team discussion

## Project Context

- **Project:** ai-context-framework
- **Owner:** Devon Aleshire
- **Naming theme:** Famous chess grandmasters (user-directed)
- **Created:** 2026-07-25
