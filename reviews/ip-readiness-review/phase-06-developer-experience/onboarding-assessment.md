# Phase 06 — Developer Experience: Onboarding Assessment

**Phase Status:** Complete
**Reviewer:** Capablanca (Templates & Documentation)
**Date:** 2026-08-17
**Baseline context:** See [artifacts/accessibility-report.md](../artifacts/accessibility-report.md)

---

## Purpose

Evaluate the end-to-end onboarding path for new adopters, from discovery to first working `.ai/` directory.

---

## Assessment

Simulation performed on 2026-08-17 using the CLI binary directly (`node bin/ai-context.mjs`) against a fresh empty directory. Node 18+ available.

---

## 1. First-Contact (README, GitHub Pages Home)

**Rating: Good**

- README opens with a clear problem statement and one-liner value proposition.
- The `.ai/` vs `.squad/` boundary table is well-placed for a reader who might already use Squad.
- Audience segmentation (solo / small team / enterprise) is scannable and useful.
- **Friction:** "under 10 minutes" is stated as fact, not a target. No Node/npm prerequisite visible before the quick-start commands. A developer without npm installed will encounter a failure before the first command succeeds.
- **Evidence:** No `Node >=18` mention appears in README quick-start section (confirmed by grep).

## 2. Getting-Started Flow (docs/getting-started.md)

**Rating: Good with gaps**

- Minimum Viable Setup is clearly separated from Full Setup — progressive disclosure works.
- AI Setup Assistant section is a compelling shortcut and well-explained.
- "Publishing note" (git-install vs. npm) is correctly placed and accurate.
- **Friction 1:** No Prerequisites section. First `npm i -g` command appears without any statement of required toolchain (Node >=18, npm, git, GitHub credential for git-install).
- **Friction 2:** Full Setup "Prerequisites" states only "A Git repository and a willingness..." — omits all tool requirements.
- **Friction 3:** Getting-started step 3 in init next-steps says "Run `ai-context check`" — but on a fresh scaffold `check` immediately reports 3 ERRORs (unfilled placeholders). No docs context that this is expected before filling in context.md.
- **Friction 4:** No Troubleshooting section. Three predictable failure modes have no recovery path in docs.

## 3. CLI Experience (`ai-context init`, `update`, `check`)

**Rating: Excellent**

- `init` output is structured, reports counts (created/updated/skipped), prints squad detection status, and provides three concrete next steps.
- `check` errors are precise: reports exact field, exact file, and exact rule violated.
- `update --dry-run` correctly lists unchanged/preserved/manual-actions — no surprises.
- `--help` is complete and matches the CLI reference documentation exactly.
- `--version` prints both framework and schema versions.
- **Verified behavior:** Copilot managed block installed by `init`, confirmed loaded by Copilot.
- **Minor friction:** `init` next-steps say "run `ai-context check` to validate" — the check on unfilled template reports 3 ERRORs, which is correct but undocumented as expected behavior.

## 4. Template Discoverability and Quality

**Rating: Good**

- All templates use consistent `[square bracket]` placeholder convention.
- `context.md` template is well-structured: frontmatter, boundary section, what-this-is, current-state, rules, gotchas.
- `setup-prompt.md.template` is installed to `.github/prompts/ai-context-setup.prompt.md` by `init` — the shortcut is discoverable via next-steps output.
- `adr.md.template` is in place and the naming convention is documented.
- **Gap:** No template for `troubleshooting.md` or `TROUBLESHOOTING.md` — not a blocker, but noted.

## 5. CI/CD Integration Path

**Rating: Excellent**

- `ai-context-conformance.yml` installed by `init`. Blocking + informational jobs are well-designed.
- `ai-context-staleness.yml` available for weekly scheduling.
- All action references SHA-pinned (Phase 05 finding SEC-02 remediated).
- `npm run validate` produces clean output; `node --test` passes 50/50.

## 6. Error Message Quality

**Rating: Good**

- `check` errors name the exact field and expected format (e.g., `last-updated must be YYYY-MM-DD or a full ISO-8601 datetime`).
- `init` correctly skips existing files and reports them as `skipped`.
- Unknown flag errors are clear: `ERROR: Unknown flag: --foo`.
- **Gap:** No doc guidance on what to do when `check` reports errors on a fresh scaffold.

## 7. Accessibility of Documentation

**Rating: Good**
(See [accessibility-report.md](../artifacts/accessibility-report.md) for baseline.)

- Tables are simple and scannable.
- Code blocks are fenced and labeled.
- Architecture diagrams have alt text (Phase 04 remediation).
- Heading hierarchy is consistent in all docs pages.

## 8. Time-to-First-Success Estimate

- **Minimum viable setup (CLI path):** 3–10 minutes target, assuming Node/npm/git installed and GitHub auth configured. Actual time depends on placeholder fill-in effort.
- **Full setup:** 20–45 minutes target, depending on project complexity.
- **Gap:** These are targets, not measured benchmarks. Docs should qualify them explicitly.

## 9. Gaps and Recommendations

| Gap | Severity | Recommendation |
|-----|----------|----------------|
| Missing Prerequisites section | MEDIUM | Add to `docs/getting-started.md` before Minimum Viable Setup |
| No Troubleshooting section | MEDIUM | Add to `docs/getting-started.md` at end |
| Setup time unqualified | LOW | Add "(target)" qualifier in README and getting-started |
| check errors on fresh init undocumented | LOW | Add init next-steps note; addressed in Troubleshooting section |
| CONTRIBUTING.md missing drift/staleness scripts | LOW | Extend validation table in CONTRIBUTING.md |
| git-install GitHub auth not mentioned | MEDIUM | Covered by Prerequisites addition |
