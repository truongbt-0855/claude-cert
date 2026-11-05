# Review checklist: CCAO-F study notes fragments

Artifacts are HTML fragments of a Vietnamese study guide for the exam "Claude Certified Associate – Foundations"
(guide v1.0, July 2026). Format/voice contract: `build/SPEC.md`. Product facts: `nguon/facts-sheet.md`.
Objectives and sample questions: `nguon/ccao-f-exam-guide.pdf` pages 4–7. The mechanical format is already
checked by `build/check-fragments.js` (passes for every fragment) — do not re-check markup.

Give every rule a verdict per artifact.

| # | Rule | Severity if failed |
|---|---|---|
| R1 | **Product truth.** Every claim about Claude plans, features, limits, menu names, model tiers, data handling, retention, admin controls or the Usage Policy matches the facts sheet or an official page (support.claude.com, privacy.claude.com, claude.com, anthropic.com, platform.claude.com, academy.claude.com, anthropic-partners.skilljar.com). Open the official page when the facts sheet marks the item UNCONFIRMED/CONFLICT or is silent. | Critical |
| R2 | **No fabricated specifics.** No number, limit, menu path, feature name or policy clause that neither the facts sheet nor a cited official page supports. A fact marked UNCONFIRMED in the sheet must not be taught as settled. | Critical |
| R3 | **Answer key.** For every `div.qcase` (key = `data-answer`) and every quiz item in the matching `quiz-*.json` (key = `a`, 0-based index into `o`): the keyed answer is the single best answer under the exam guide's logic, no other option is equally defensible, and each verdict line says correctly why its option is wrong or right. | Critical |
| R4 | **Guide frame.** Where guide v1.0 and current docs differ (facts sheet section H), the lesson teaches the guide's vocabulary as the exam answer and mentions the current name, not the reverse. | Critical if an exam answer depends on it, else Warning |
| R5 | **Cross-domain consistency.** These shared facts read the same in every artifact you review: model tiers and when to move up (effort before tier); Research needs web search and paid plan; memory/incognito behavior and retention; Project knowledge vs instructions ("instructions are rules, knowledge is reference"); permission levels (Can view / Can edit); connector access follows the asking user's permissions; who enables connectors on Team/Enterprise; code execution / "Create and edit files" dependencies; high-risk use cases need qualified human review + disclosure; anonymize before upload. Note any contradiction with another fragment (`build/d1.html` … `build/d7.html`, `build/p0.html`, `build/p8.html`, `build/p9.html`). | Critical |
| R6 | **Translation.** Every English question, option and quote has a Vietnamese rendering beside it, and the rendering is faithful (no added or dropped constraint). | Critical if meaning changes, else Warning |
| R7 | **Definition first.** No term is used before it is defined in that lesson or in a lesson it links to. | Warning |
| R8 | **Scope.** The notes do not teach the API, Agent SDK, Claude Code or MCP server building as exam content (a one-line "escalate to developers" mention is fine). | Warning |

Not findings: wording taste, sentence rhythm, ordering, formatting, lesson length.

Output: write the report to the path given in your prompt, in the doc-reviewer default format, and for every
Critical finding give the fix as exact replacement text (old snippet → new snippet) so a fixer can apply it
without re-researching.
