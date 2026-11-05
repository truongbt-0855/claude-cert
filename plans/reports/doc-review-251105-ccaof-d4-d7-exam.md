---
failed: 1
warnings: 8
result: FAIL
---
## Checklist Verdicts
| Rule | Verdict | Note |
|---|---|---|
| R1 Product truth | PASS (d4, d7, p9); FAIL (hero) | 4D framework matches facts sheet section F word for word (4 definitions, 12 sub-skills, 3 modes, Description-Discernment loop; no unofficial Delegation-Diligence loop taught). Usage-limit claims in d7 match the help-center usage page (fetched). Retake / 12-month / 5-year / 14-day appeal match FAQ and policies pages (fetched). Cowork steps and plans match the help-center Cowork page. Hero "≈ 70–75% câu đúng" has no source. |
| R2 No fabricated specifics | FAIL (1 Critical, hero) | See Critical. Third-party numbers in p9 are partly unverifiable (Warnings). |
| R3 Answer key | PASS | Decided each item before reading the key. All 12 d4 qcase, 12 quiz-d4, 12 d7 qcase+quiz, 4 quiz-p9 keys agree with mine. Doubt (a): 7.2 Dạng 3 key A is right (see Warnings). Multi-answer keys d4 Q4/Q10 [0,3] and d7 Q5 [0,2], Q10 [1,4] are correct. |
| R4 Guide frame | PASS | Haiku/Sonnet/Opus vocabulary plus one line for Fable; "research mode" named; "Create and edit files" not contradicted. |
| R5 Cross-domain consistency | PASS with Warnings | Effort before tier is the same as d3. Research needs web search and paid plan, consistent. Instructions are rules / knowledge is reference, consistent with d5. Disclosure gap in d4 (Warning 6). hero, p9 and p8 report 24 h and 48 h both ways. |
| R6 Translation | PASS | Every EN stem and option in d4/d7 has a faithful VI line; no dropped constraint found. |
| R7 Definition first | PASS | 4D, three modes, augment vs redesign, lever, session limit are defined before use. |
| R8 Scope | PASS | Claude Code "Plan mode" and `temperature` appear as one-line "Biết thêm" notes only. |

## Critical Issues
### claude associate - foundation/build/hero-and-roadmap.html
1. [R2] hero fact tile — artifact: "720/1000</b><span>điểm đậu · ≈ 70–75% câu đúng" — source `nguon/ccao-f-exam-guide.pdf` section 9: "the cut score is 720" (scaled 100–1,000; the guide does not map it to a percent-correct; `grep -rn "70–75\|70-75" nguon/facts-sheet.md` → no match). A learner reads the cut as "pass with ≈ 70% correct", which is not an official fact. Fix: `điểm đậu · ≈ 70–75% câu đúng` → `điểm đậu · thang 100–1.000, không phải % câu đúng`.

### claude associate - foundation/build/d4.html
None.

### claude associate - foundation/build/d7.html
None.

### claude associate - foundation/build/p9.html
None.

### Quiz files (quiz-d4.json, quiz-d7.json, quiz-p9.json)
None.

## Warnings
claude associate - foundation/build/d4.html
1. [R1, priority 1, 4D] Framework text is accurate. One presentational risk: the table column "Hay gặp ở" and the "Câu tự hỏi" column are writer-made and sit in the same table as the official sub-skills. The intro line 40 does flag the last column as inference, but the "Câu tự hỏi" column is not flagged. Suggest: add "(cột 3 và 4 là cách diễn đạt của notes, không phải bảng chính thức)".
2. [R1/R2, doubt d] Lesson 4.3 — artifact: "Năm câu hỏi khi đánh giá" (correctness, quality, fit, experience, responsibility) and "Vòng plan → verify → judge → refine". Neither appears in facts sheet F nor in the AI Fluency PDFs (`grep -n "correctness\|Verify → Judge" nguon/facts-sheet.md` → only unrelated hits). The text does not claim Anthropic wrote them, but the cheatsheet lists "Plan → Verify → Judge → Refine" under "Tên và con số phải thuộc" next to official names. Fix: in 4.3 before the list add "Năm câu hỏi dưới đây là cách chia của notes này, không phải thuật ngữ thi"; in the cheatsheet `<b>Làm giải pháp:</b> Plan → Verify → Judge → Refine.` → `<b>Làm giải pháp (cách gọi của notes, không phải thuật ngữ chính thức):</b> Plan → Verify → Judge → Refine.` No exam answer depends on them (the keyed answers C/A in 4.3 stand on feedback specificity and escalation).
3. [R1, doubt c] Lesson 4.4 Dạng 1 — key B stands (A removes the signer, C is Claude checking Claude, D abandons). But the lesson hands "đối chiếu" (reconcile figures) to Claude while 4.1 and 4.5 say exact calculation is a Claude weakness ("phép tính chính xác" → run code). Fix in B's verdict or in "Cần biết" ý 1: add "đối chiếu số liệu thì cho Claude chạy code và đánh dấu dòng lệch, người kiểm dòng bị đánh dấu". Not Critical: the human sign-off keeps B the single best answer.
4. [R2] Lesson 4.4 Cowork — artifact: "Trong lúc chạy, Claude hiện lập luận và bạn có thể chen vào chỉnh hướng" and "Bước 4 là điểm duyệt trước khi việc bắt đầu". Help-center Cowork page: "Review Claude's approach, then let it run"; it says plan approval is not a required gate and approval frequency depends on mode (Manual / Auto / Skip). The "chen vào chỉnh hướng" sentence is not in the facts sheet or the fetched page. Fix: `Bước 4 là điểm duyệt trước khi việc bắt đầu` → `Bước 4 là chỗ bạn xem cách Claude định làm trước khi cho chạy (mức hỏi xin duyệt từng hành động còn tùy chế độ Manual, Auto hay Skip)`; delete the "chen vào chỉnh hướng" clause.
5. [R5] Lesson 4.0 section 4 and 4.4 — artifact: "Usage Policy bắt người có chuyên môn duyệt" for high-risk recommendations; facts sheet E4 also requires telling affected individuals that AI was used. Fix: append "và phải cho người bị ảnh hưởng biết có dùng AI".
6. [R3 minor] quiz-d4 Q2 stem says she tells colleagues which sections Claude drafted "and which figures she checked herself"; the second half is Deployment Diligence wording. Key B stays best (the stem is about informing others), but trim: "...which sections Claude drafted." removes the overlap.

claude associate - foundation/build/d7.html
7. [R1, doubt b] Lesson 7.2 — artifact: "Hướng dẫn cho người dùng app cũng vậy: mặc định dùng Sonnet" — the apps tutorial (facts D2) says default to Sonnet and use Opus/Fable when Sonnet struggled; it does not say "effort before tier". Only the API docs say "tuning effort is often a better lever than switching models". The effort-first order itself is supported and matches d3, and quiz-d7 Q9 is worded "According to Anthropic's model guidance" with no rival "stronger model" option, so the key is safe. Fix: `Hướng dẫn cho người dùng app cũng vậy: mặc định dùng Sonnet; Opus hay Fable ... để dành cho lúc Sonnet không làm nổi.` → `Hướng dẫn cho người dùng app nói thêm: mặc định dùng Sonnet; Opus hay Fable ... để dành cho lúc Sonnet không làm nổi. Hai lời khuyên không mâu thuẫn: thử effort trên model đang dùng trước, vẫn chưa đạt thì lên tầng.`
8. [R3, doubt a] 7.2 Dạng 3 — key A is correct: the facts sheet says instructions apply to all chats in a Project and knowledge is reference material, and d5 line 131 says the same. Option D is not equally defensible; with RAG a large Project retrieves only relevant pieces, so a rule in a file is not always applied. No change needed. Small improvement: D's verdict could add "knowledge là tài liệu tham khảo, không phải nơi đặt luật" so the reason matches d5 vocabulary.

claude associate - foundation/build/p9.html
9. [R2] Lesson 9.1 third-party figures — artifact: "docs tính tới 14/10/2026" and "thi mô phỏng 60 câu / 120 phút". certsafari page (fetched): "35 free sample questions from our bank of 757+", "Updated August 2026", and gives no timing or question count for the simulation. 35 and 757 are confirmed; the 14/10/2026 date and the 60/120 format are not. Tutorials Dojo "20 câu", "~$15" and Udemy "360 câu" were not checked. Fix: delete `(docs tính tới 14/10/2026)` or replace with `(trang ghi "Updated August 2026")`; `thi mô phỏng 60 câu / 120 phút` → `chế độ thi mô phỏng`.
10. [R2] Lesson 9.1 — artifact: "Không có khóa riêng cho D5 và D7" — facts sheet A4: the mapping is the writer's inference and marked **UNCONFIRMED**. Fix: `Không có khóa riêng cho D5 và D7.` → `Theo suy luận của notes, không khóa nào dành riêng cho D5 và D7.`

## Not Verified
- Tutorials Dojo ("20 câu", "~$15") and Udemy ("6 practice tests / 360 câu") figures in p9: third-party pages not opened.
- certsafari "30 bài học có checkpoint" and the 14/10/2026 date: page fetched, not confirmed.
- d4 4.1 SMART four properties ("Specific, Measurable, Achievable, Relevant") on platform.claude.com define-success: not re-opened; consistent with facts G and common docs wording.
- 4D PDFs: could not be read through the fetcher (binary PDF); 4D wording was checked against facts sheet section F, which quotes the one-pager and the cheat sheet.
- Cowork "mọi cuộc chat đều nhận được việc Cowork" and plan list: confirmed on the help-center page; the facts sheet itself is silent.
- The 24 h vs 48 h cancel conflict is reported both ways in hero, p9 and p8 and matches guide section 10 (24 h) and the FAQ and policies pages (48 h, fetched). Not counted as a finding.
- Late-arrival wording in p9 ("đến trễ quá giờ cho phép"): from guide section 11; the policies page is silent on it.

**Status:** DONE
Report: C:\Users\bui.tuan.truong\Downloads\Projects\Certificate\plans\reports\doc-review-251105-ccaof-d4-d7-exam.md — failed: 1, warnings: 10
