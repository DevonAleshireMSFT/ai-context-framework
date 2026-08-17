# Phase 08 — IP Readiness: IP Gaps

**Phase Status:** Complete — all gaps remediated or deferred with rationale
**Reviewed by:** Kasparov (Standards & Governance)
**Date:** 2026-08-17

---

## Purpose

Enumerate all identified IP gaps with severity and recommended resolution.

---

## Gap Table

| ID | Category | Description | Severity | Resolution | Status |
|----|----------|-------------|----------|------------|--------|
| GAP-01 | Security statement | `SECURITY.md` absent — no vulnerability reporting channel, no supported-versions policy | MEDIUM | Created `SECURITY.md` at repository root | ✅ Remediated |
| GAP-02 | Support / ownership | `SUPPORT.md` absent — no community support statement, no issue/discussion channel documented | MEDIUM | Created `SUPPORT.md` at repository root | ✅ Remediated |
| GAP-03 | Changelog / versioning | `CHANGELOG.md` absent — no release history, no formal tags | LOW | Created `CHANGELOG.md` with Unreleased structure; documents that formal release history is not yet established | ✅ Remediated |
| GAP-04 | RAI — AI output is draft | No explicit statement that AI output requires human review | HIGH | Added to `docs/responsible-ai.md` and README; updated `templates/copilot-instructions.md.template` | ✅ Remediated |
| GAP-05 | RAI — model limitations | No disclosure that Copilot may not comply with all instructions | HIGH | Added to `docs/responsible-ai.md` and README | ✅ Remediated |
| GAP-06 | RAI — output accountability | No statement on who is accountable for AI-generated content | HIGH | Added to `docs/responsible-ai.md` | ✅ Remediated |
| GAP-07 | RAI — fairness / representational guidance | No guidance for adopters on bias/representational concerns in AI context | MEDIUM | Added to `docs/responsible-ai.md` | ✅ Remediated |
| GAP-08 | RAI — marketing language | README behavioral examples imply guaranteed Copilot compliance | MEDIUM | Qualified example language in README; added "typically" / "instructed to" qualifiers | ✅ Remediated |
| GAP-09 | Known limitations | No user-facing known limitations section | LOW | Integrated into `docs/responsible-ai.md` and README Known Limitations section | ✅ Remediated |
| GAP-10 | Registry date | `registry.md` adoption date is `YYYY-MM-DD` | Advisory | Deferred to Phase 10 (P10-DEC-02) | ⏳ Deferred |
| GAP-11 | Package provenance | `.mcp.json` package provenance approval outstanding | Advisory | Deferred to Phase 10 (ORG-02) | ⏳ Deferred |

---

## Claims Deliberately Not Made

The following claims were considered and deliberately NOT made in any remediation artifact:

| Claim | Reason |
|-------|--------|
| Compliance with any named regulation (GDPR, HIPAA, SOC 2, etc.) | No legal basis; framework is not a compliance product |
| Guaranteed AI instruction following | Models do not guarantee compliance; "instructed to" is the correct phrasing |
| Guaranteed accuracy of AI output | Not asserted; human review required |
| Security certification or approval | Not obtained; disclosure of reporting path only |
| SLA or response-time commitment | No support team; community best-effort only |
| Email security contact | No verified security contact email exists; GitHub private vulnerability reporting referenced only |
| Trademark claims on Copilot, GitHub, Azure | Third-party trademarks; no claims made |

---

## Outstanding Approvals Required

| ID | Item | Required approver |
|----|------|------------------|
| P10-DEC-02 | Registry adoption date | Devon Aleshire (repo owner) |
| ORG-02 | `.mcp.json` package provenance | Organizational legal/security |
| P10-DEC-01 | ngAIO artifact disposition | Devon Aleshire |
| P10-DEC-03 | CODEOWNERS coverage | Devon Aleshire / Architecture Team |
