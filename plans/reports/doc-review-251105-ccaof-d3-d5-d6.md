---
failed: 0
warnings: 4
result: PASS
---
## Checklist Verdicts

Applies to all six artifacts (d3.html, quiz-d3.json, d5.html, quiz-d5.json, d6.html, quiz-d6.json) unless noted.

| Rule | Verdict | Note |
|---|---|---|
| R1 Product truth | PASS | Every specific claim checked against facts sheet or an official page (WebFetch, 2026-11-05). Writer doubts (a)-(g) all CONFIRMED, see below. 2 claims only partly supported, listed as Warnings. |
| R2 No fabricated specifics | PASS | Items the facts sheet marks UNCONFIRMED are not taught as settled: Research duration, RAG threshold, Free window size, consumer training default, 500MB chat-file size, Fable ZDR, Styles menu path. Numbers not in the sheet were each found on an official page (see Verified below). |
| R3 Answer key | PASS | 22 qcases (count of `data-answer` qcase markers in my text conversion: d3 8, d5 6, d6 8) and 36 quiz items (`node` over the 3 JSON files: 12+12+12) re-judged. Each keyed answer is the single best answer; verdict lines give correct reasons. |
| R4 Guide frame | PASS | Guide vocab leads: "research mode", Haiku/Sonnet/Opus, "system-level instructions", "Code Execution", "memory considerations"; current names added once in parentheses or in "Biet them". No exam answer depends on the newer name. |
| R5 Cross-domain consistency | PASS | Grepped d1,d2,d4,d7,p0,p8,p9: effort-before-tier (d7 l.86, p8 l.74), Research = paid + web search + Opus 5.5 (d4, d7), memory/incognito (p8 l.365), instructions=rules/knowledge=reference (p8 l.102, d7 l.658), connectors per user permission (d1 l.57), Create and edit files (d2 l.1764, p8 l.363), anonymize before upload (p0, p8). No contradiction. |
| R6 Translation | PASS | Every qcase question/option has a Vietnamese rendering beside it; spot-checked all 22 qcase stems and options in d3/d5/d6, no dropped or added constraint. |
| R7 Definition first | PASS | Terms are glossed at first use or linked (RAG, Owner, Primary Owner, Compliance API, BAA via bai 6.2, Development Partner Program). |
| R8 Scope | PASS | No API / SDK / Claude Code / MCP-server building taught. API docs are quoted only for relative price and effort guidance; custom remote MCP connector is taught as an app feature. |

Writer doubts adjudicated (all CONFIRMED, no fix needed):
- (a) Team/Enterprise connectors only in private projects: `https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities` -> "Connectors are only available in private projects." Also Drive-in-projects: `.../10166901-use-google-workspace-connectors` -> "The Google Drive connector is only available when adding to Files in private projects."
- (b) Org instructions beat personal; order vs project instructions unstated: `.../14546867-organization-preferences-for-enterprise-plans` -> "When both are set, organization instructions take precedence." and 3,000 characters, "up to an hour", Owners and Primary Owners on Team and Enterprise, "Organization settings > Organization and access", "may not follow either one reliably". Personalization article `.../10185728-...` says nothing on project vs personal ranking, so d5 l.58 is right to leave it open.
- (c) Dependency on code execution: artifacts -> `.../9487310-...` "Artifacts require Cloud code execution and file creation"; Skills -> `.../12512176-what-are-skills` "This feature requires code execution to be enabled."; auto-summarize -> `.../8606394-...` "Code execution must be enabled for automatic context management to work." XLSX is from the sheet (C10).
- (d) No domain-specialized tier: academy tutorial describes tiers by task/speed/usage ("Opus is a large reasoning specialist"); platform overview gives "Description" per tier by workload, none by subject. Claim holds.
- (e) ZDR not for Team/Enterprise chat: `https://privacy.claude.com/en/articles/8956058-zero-data-retention` -> "the only products to which zero data retention applies are eligible Anthropic APIs" (plus Commercial-key products and Claude Code for Enterprise); request via Sales, per-organization. Page does not name Team/Enterprise chat, but "only" wording supports d6 l.350.
- (f) Incognito kept 30 days, in Team/Enterprise exports: `.../12260368-use-incognito-chats` -> "retained for either 30 days (default)", "Incognito chats are included in organizational data exports available to account Owners", "included in the Compliance API".
- (g) HIPAA-ready only Enterprise, not Team: `.../13296973-hipaa-ready-enterprise-plans` -> "available for Enterprise plans only", "Team plans and individual plans (Free, Pro, Max, and Ultra) can't enable HIPAA", "Only the Primary Owner of the organization can accept the BAA", "can't be reversed from organization settings". d6 l.282-284 matches.

Other numbers verified on official pages: 555k words per 1M tokens (platform overview "roughly 555k words"); Opus-on-Haiku-task quote (academy tutorial); Haiku 5.5 description, "start with Claude Opus 5.5 for most workloads" (platform overview); "Tuning effort is often a better lever", evaluation-set quotes (choosing-a-model); context rot quote (anthropic.com engineering post); "you can't increase the fixed context window size" and "Try starting a new conversation" (11647753); tab "Artifacts" in sidebar (9487310); Free max 5 projects, name/description invisible, archive keeps members, delete needs unarchive + "Yes, delete", archived projects listed at bottom (9519177 + search); Can view/Can edit wording, group sharing Enterprise beta (9519189); Gmail metadata only, Access blocked steps, 15 minutes (10166901); connector request defaults Team on / Enterprise off, Always allow/Needs approval/Blocked (11176164); Claude in Chrome "Automatically approve" default, "Manually approve", "strongly advise against" financial/legal/medical, "remain responsible" (12902428); AUP section names, 11 high-risk areas without media, minors "under the age of 18 ... regardless of jurisdiction", "wholly favorable" exception, agent clause (anthropic.com/legal/aup); effective 12 Nov and hardware wording (anthropic.com/news/2026-usage-policy-update); "we encourage our users not to use our products and services to process personal data", controller wording (privacy 7996885); four sensitive categories, small number of personnel (8325621). Domain weights 12/12/15 and D2 21% (pdftotext of guide) support "hon 1/3" in d6 intro.

## Critical Issues
### claude associate - foundation/build/d3.html
None
### claude associate - foundation/build/quiz-d3.json
None
### claude associate - foundation/build/d5.html
None
### claude associate - foundation/build/quiz-d5.json
None
### claude associate - foundation/build/d6.html
None
### claude associate - foundation/build/quiz-d6.json
None

## Warnings
1. [R2] d5.html, section 4 table, row Style — artifact: "Docs nêu các kiểu có sẵn Normal, Concise, Formal, Explanatory" — source `nguon/facts-sheet.md` C5: "page itself not fetchable; secondary, treat as medium confidence"; `https://support.claude.com/en/articles/10181068-configuring-and-using-styles` returned 404 and the personalization article does not mention Styles. Preset names are not confirmed on an official page. Suggested: "Docs nêu các kiểu có sẵn Normal, Concise, Formal, Explanatory" -> "Anthropic có các kiểu có sẵn (như Normal, Concise, Formal, Explanatory, theo thông báo về Styles) và kiểu tự tạo từ mẫu viết của bạn". Not an exam key.
2. [R1] d5.html, "Biet them" 5.1 and 5.4 / cheatsheet — artifact: "Người Can edit gỡ được thành viên trong menu Share → Remove access" — `https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects`: "The project creator can click on the member's current role and select "Remove access."" while `.../9519189-project-visibility-and-sharing` says "A project member with "Can edit" permissions can open the project's "Share" menu." The two official pages differ on who may remove. quiz-d5 Q12 ("project editor") and d5 l.481 depend on it but stay safe either way. Suggested: add "(trang Create and manage projects ghi người tạo project làm được; trang Project visibility ghi cả người Can edit)" or say "người có quyền sửa hoặc người tạo project".
3. [R2] d5.html, section 4 — artifact: "Chỗ nào tổ chức không nói tới thì instructions của từng người vẫn áp." — not found as a sentence on `.../14546867-organization-preferences-for-enterprise-plans` (it states only precedence "When both are set"). Reasonable inference, but presented as "Docs nói rõ". Suggested: "Docs nói rõ một thứ tự: ... Chỗ nào ..." -> end the "Docs nói rõ" sentence after the precedence rule, and mark the remainder as suy ra ("hiểu theo nghĩa thông thường").
4. [R2] d5.html, "Biet them" 5.1 — artifact: "Gắn sao cho project để nó hiện ở thanh bên trái." — facts sheet C1 only says "star projects for quick access"; "left sidebar" is not stated. Suggested: "để nó hiện ở thanh bên trái" -> "để truy cập nhanh".

## Not Verified
- Chat-file size cap (500MB vs 30MB): sheet CONFLICT; lessons correctly avoid teaching either number.
- d5 "Add from Google Drive" menu path in chat ("+" -> Add from Google Drive): not found in fetched text of 10166901 summary; behavior (sync, private projects only) verified, exact menu label not.
- d6 l.227 qualifier "Nơi luật cho phép" for the wholly-favorable exception: AUP summary confirms the exception and the "partial approval" rule; the "where law allows" wording not seen verbatim.
- d3 l.14 "Một tài khoản dùng được trên cả ba bản": no official sentence read; low risk.
- Exam content may be refreshed around 7 Dec 2026 (sheet A2, UNCONFIRMED); Usage Policy text effective 12 Nov 2026 was read from the new version.
- WebFetch returns model-summarised text, so quotes above are as reported by the fetcher; the Chrome "Automatically approve" default belongs to the Cowork side panel per the article, d6 states it as the Chrome default (consistent with the article's wording).

Report path: C:\Users\bui.tuan.truong\Downloads\Projects\Certificate\plans\reports\doc-review-251105-ccaof-d3-d5-d6.md — failed: 0, warnings: 4
