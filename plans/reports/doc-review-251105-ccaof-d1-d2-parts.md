---
failed: 2
warnings: 5
result: FAIL
---
## Checklist Verdicts

| Rule | Verdict | Note |
|---|---|---|
| R1 Product truth | PASS | d1, d2, p0, p8: artifact "Artifacts tab in sidebar", "typically over 15 lines", "Edit an earlier message to create a different version of the chat" (support.claude.com 9487310); help-center quotes "newly-hired contractor", "look correct but are very mistaken", "scrutinize any high-stakes advice" (7996853, 8525154) all found on the live pages. Sample questions in p8 match guide verbatim. |
| R2 No fabricated specifics | FAIL | 2 Critical (p0 scoring rule for multi-response items; d2 2.6 attributes a claim to the structured-outputs docs that the page does not make). See Critical Issues. |
| R3 Answer key | PASS | All 3+2+2+3+2+2 d1 qcases, 2+3+2+2+2+2 d2 qcases (check: d1 1.1 x3, 1.2 x2, 1.3 x2, 1.4 x2; d2 2.1 x2, 2.2 x3, 2.3 x2, 2.4 x2, 2.5 x3, 2.6 x2), 3 p8 qcases, 12 d1 quiz, 12 d2 quiz, 5 p0 quiz items: my independent pick matched the key in every case. Writer doubts (a) and (b) adjudicated below (keys hold; two Warnings). |
| R4 Guide frame | PASS | p8 8.3 teaches guide wording first then current name; d1/d2 call Research "guide gọi là research mode", Code Execution/"Create and edit files" given in that order. No exam answer depends on a renamed term. |
| R5 Cross-domain consistency | PASS | d1/d2/p0/p8 vs d3–d7, p9: Research = paid plans + web search (d3, d4 agree); artifact tab / "15 dòng" (d3 agrees); "Tên và mô tả Project không hiện cho Claude" (d3, d5 agree); Can view / Can edit (d3, d5 agree); incognito not in Project (d6); knowledge cutoff 6/2026 (d3, d4, d7 agree); high-risk review needs qualified person + disclosure (d6 agrees with d2 2.4 note); Owner enables first (d3). No contradiction found. |
| R6 Translation | PASS | Every en/vi pair read; no dropped or added constraint found in d1, d2, p8. p0 has no English question text beyond quiz (quiz JSON is English only by design). |
| R7 Definition first | PASS | Terms (token, markdown, grounding, XML tag, Discernment, Deployment Diligence, rubric) are defined inline or in the lesson's defs block before use. |
| R8 Scope | PASS (with Warning) | d1 teaches only app-usable techniques (XML tags typed in chat, examples, quotes-first); "temperature" mentioned only to exclude it. d2 2.6 mentions structured outputs/API in two sentences (see Warning 4). |

Verified counts: qcase count per file from my own read (no command run; counts above are from reading each lesson). Quiz item counts from `cat build/quiz-d1.json`, `quiz-d2.json`, `quiz-p0.json` (12, 12, 5 items).

## Critical Issues

### claude associate - foundation/build/p0.html
1. [R2] l-0-1 "Thông tin đề" — artifact: "Chọn thiếu hay thừa là sai cả câu." — source `nguon/ccao-f-exam-guide.pdf` section 5: "each item states how many responses to select"; the guide says nothing on partial credit or penalty. Search: `python fitz text of all 11 pages for "partial", "all correct", "select all", "credit"` → no match. Fix: `Câu nhiều đáp án ghi rõ chọn mấy. Chọn thiếu hay thừa là sai cả câu.` → `Câu nhiều đáp án ghi rõ chọn mấy. Guide không nói cách tính điểm cho loại câu này, nên chọn đúng số đáp án đề yêu cầu.`

### claude associate - foundation/build/d2.html
2. [R2] l-2-6 "Đúng khuôn chưa phải đúng nội dung" — artifact: "Docs của structured outputs cũng chỉ hứa định dạng, không hứa giá trị đúng." — source `https://platform.claude.com/docs/en/build-with-claude/structured-outputs`: "Structured outputs guarantee schema-compliant responses through constrained decoding"; the page (first 100k of 106k chars read) never states that values may be inaccurate (search for accuracy/correctness statement: NOT FOUND). The idea is a sound inference but is attributed to a doc that does not say it, and it drags an API feature into app notes. Fix: `Docs của structured outputs cũng chỉ hứa định dạng, không hứa giá trị đúng.` → `Khuôn chỉ cho biết hình dạng của output, không cho biết giá trị bên trong có đúng không.` (also acceptable: drop the link `…/structured-outputs` from that lesson's "Đọc thêm" line).

## Warnings

1. p0 l-0-1 note "Ngoài 30 mục tiêu": says "Memory, Skills, Code Execution … Ba cái sau không có tên trong mục tiêu nào". Guide D3 objective 4: "Understand and manage context limitations and memory considerations", and p8 8.3 itself lists "memory considerations" as guide wording. Memory is touched by an objective. Suggested: `Ba cái sau không có tên trong mục tiêu nào` → `Skills và Code Execution không có tên trong mục tiêu nào (Memory chỉ xuất hiện ở D3 qua cụm “memory considerations”)`.
2. p0 l-0-1: "Scaled score … Anthropic không công bố cách quy đổi." Guide section 9 gives only the 100–1,000 range and cut score 720; it neither says nor denies publication of the conversion. Unsupported absence claim. Also "Câu Associate ngắn hơn CCAR-F nên thường dư giờ" and the CCAR-F comparison row ("Bốc 4 trong 6 kịch bản") are not in the guide (not checked, see Not Verified). Suggest dropping or labelling as "ước chừng".
3. d2 l-2-4 qcase "Dạng 2" (writer doubt a): key C holds. Option B ("summary of a supplier contract's termination clauses… decide whether to exit") fails under 2.4 signals (contract terms + decision depends on it). But lesson 2.1 table lists "tóm tắt tài liệu bạn đưa" as lower-risk, so a reader can see B as defensible. Strengthen B in the stem: `…that the team will use to decide whether to exit the contract.` → `…that the team will use to decide whether to exit the contract early, which may trigger penalty fees.` (vi: `…rút khỏi hợp đồng sớm, có thể phát sinh phí phạt.`). Not Critical: C is clearly the only low-stakes, internal, reversible output.
4. d2 l-2-6: structured outputs is named as an API feature in two sentences plus a docs link. R8 allows one line "escalate to developers"; trim to that (the Critical fix above already shortens it).
5. d2 l-2-6 qcase "Dạng 1" (writer doubt b): key B holds; C is wrong. The verdict for C ("Artifact dành cho người sẽ sửa và dùng lại. Gộp thêm mục đích … làm lạc mất nơi nhận chính") is a weaker reason than the real one: a "polished report" is narrative and cannot be imported into a four-column template. Suggested verdict text: `<b>C sai.</b> Báo cáo trau chuốt là văn cho người đọc, không phải các dòng đúng bốn cột mà hệ thống nhập cần (ý 1, 2). Hấp dẫn vì artifact nghe chuyên nghiệp và chia sẻ được.`

## Not Verified

- p0 comparison table row "CCAR-F … Bốc 4 trong 6 kịch bản cố định, mỗi kịch bản ~15 câu", "Domain 5": from a different guide, outside this review's sources.
- d1/d2 claim "Claude chỉ hành động được qua công cụ đã được kết nối" (d2 2.2 trap): consistent with facts section C11 but no official sentence stated it verbatim.
- Research citations behaviour, Free-plan context size: not used in d1/d2.
- Pdf pages 1–7 were read via `pdftotext` (the Read tool's PDF renderer was unavailable); pages 8–11 also read for p0's score/renewal facts, which match.
- Doc quotes in d1 (all 12 phrases from best-practices and reduce-hallucinations pages, define-success criteria list) were confirmed on the live pages; the "Provide clear success criteria / verify across multiple sources" quotes come from the research section of the best-practices page and were found.
