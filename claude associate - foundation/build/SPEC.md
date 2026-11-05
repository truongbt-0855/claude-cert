# SPEC: viết một domain cho notes CCAO-F

Notes ôn thi **Claude Certified Associate – Foundations (CCAO-F)**, giống hệt cách trình bày của notes CCAR-F
(`../../claude architect - foundation/claude-architect-foundations-notes-drillpark.html`). Mỗi domain là một file
fragment HTML + một file quiz JSON. `assemble-notes.js` ghép tất cả vào trang cuối.

Người đọc: một người Việt đang ôn thi, đã quen Claude ở mức dùng hằng ngày, đọc tiếng Anh được nhưng học bằng
tiếng Việt nhanh hơn. Họ đã ôn CCAR-F (bản Architect, thiên về API/agent) nên **đừng dạy lại API, tool_use,
Agent SDK, Claude Code**. Đề Associate dành cho người dùng app Claude và Projects trong công việc văn phòng.

## 1. File phải nộp

| File | Nội dung |
|---|---|
| `build/d{N}.html` | Đúng một `<section class="domain" id="d{N}" data-domain="{N}">…</section>` |
| `build/quiz-d{N}.json` | Mảng 10–12 câu quiz cuối domain (mục 6) |

Không `<script>`, không `<style>`, không `onclick=`, không ảnh ngoài. SVG inline được phép nếu thật sự giúp hiểu
(dùng class `.flow` như notes CCAR-F), không bắt buộc.

Tự kiểm bằng: `node "claude associate - foundation/build/check-fragments.js" d{N}` cho tới khi sạch lỗi.

## 2. Khung một domain

```html
<section class="domain" id="d3" data-domain="3">
  <div class="dhead"><h2>Domain 3 · Product and Model Selection</h2><p class="dsub">12% · 1 bài nền tảng + 4 bài · ~60 phút</p><div class="dprog"><div class="wb"><i></i></div><span></span></div><button class="tog" type="button">Thu gọn</button></div>
  <div class="dbody">
<div class="dintro">
  <p>Domain chiếm bao nhiêu %, ≈ bao nhiêu câu trên 60.</p>
  <p>Cả domain xoay quanh ranh giới / câu hỏi nào (một câu in đậm).</p>
  <p>Đọc bài Nền tảng trước. Cuối mỗi bài có “Khi đi thi”: chọn đáp án trước rồi mới xem giải thích.</p>
</div>
<article class="lesson" id="l-3-0" …>…bài Nền tảng…</article>
<article class="lesson" id="l-3-1" …>…</article>
…
<section class="summary" id="sum-d3"><h3>Tổng kết Domain 3</h3><ul>…6–10 dòng…</ul></section>
<section class="cheat" id="cheat-d3"><h3>Cheatsheet Domain 3</h3>…bảng…<h4>Tên và con số phải thuộc</h4><ul class="names">…</ul></section>
  <div class="quiz" data-course="d3"></div>
  </div>
</section>
```

Thời lượng trong `dsub` = tổng `data-min` các bài.

## 3. Bài Nền tảng `l-{N}-0`

Dựng từ con số 0 những khái niệm cả domain dùng, theo thứ tự “cái này là gì → gồm những phần nào → chạy thế nào →
một ví dụ thật”. Header `<span class="ts">Nền tảng</span>`. Có:

- 4–7 mục `<h4>` đánh số, có `div.defs` định nghĩa, có ít nhất một bảng so sánh.
- Mục cuối “Bản đồ Domain N”: bảng mỗi bài của domain đụng vào phần nào.
- `<h4>Tự kiểm tra</h4>` + `<p class="need">` + 3 `details.chk` (câu tiếng Anh, `span.vi` nghĩa, `span.ans` đáp).
- `div.remember`, `div.src`, `label.done`.

## 4. Bài theo task statement `l-{N}-{k}`

```html
<article class="lesson" id="l-3-2" data-domain="3" data-ts="3.2" data-min="12">
  <header class="lh"><span class="ts">TS 3.2</span><h3>Tiêu đề tiếng Việt, nói thẳng bài dạy gì</h3><span class="rt">~12 phút</span></header>
  <p class="need">Cần biết trước: … <a href="#l-3-0">bài Nền tảng</a>.</p>
  <div class="defs"><b>Khái niệm của bài</b><dl>
    <dt>Thuật ngữ (English term)</dt><dd>Định nghĩa tiếng Việt, dễ hiểu, một hai câu.</dd>
  </dl></div>
  <h4>…cơ chế, có ví dụ cụ thể…</h4> <p>…</p> <ul>…</ul> <div class="tw"><table>…</table></div>
  <div class="story"><b>Tình huống.</b> Một ca công việc thật: ai, làm gì, sai ở đâu.</div>
  <div class="vs"><div class="bad"><b>Tệ</b><ul><li>…</li></ul></div><div class="good"><b>Tốt</b><ul><li>…</li></ul></div></div>
  <!-- tùy chọn: div.note, div.trap (<b>Bẫy:</b> …) -->
  <h4>Khi đi thi</h4>
  <p class="need">Bài này thường ra 2 dạng câu hỏi. Đọc đề, <b>chọn một đáp án trước</b>; phần giải thích chỉ hiện ra sau khi bạn chọn.</p>
  …2 (tối đa 3) div.qcase theo mục 5…
  <div class="more"><b>Biết thêm</b><ul>
    <li><b>Một ý in đậm, một dòng.</b> Giải thích thường ngay sau.</li>
  </ul></div>
  <div class="rule">Quy tắc: một câu, cái phải làm.</div>
  <div class="remember"><b>Nhớ nhanh</b><ul><li>…3–4 dòng…</li></ul></div>
  <div class="src">Đọc thêm: <a href="https://support.claude.com/…">Tên bài</a> · <a href="…">…</a></div>
  <label class="done"><input type="checkbox" data-lesson="l-3-2"> Đã học bài này</label>
</article>
```

Thứ tự bắt buộc: `defs` trước mọi thứ khác (trừ `p.need`). `Khi đi thi` sau phần dạy. `label.done` cuối cùng.
Độ dài: 8–15 phút đọc, khoảng 110–200 dòng HTML. Cụ thể, có ví dụ thật (email khách, báo cáo quý, file Excel,
chính sách nhân sự…), không chung chung.

## 5. Câu hỏi “Khi đi thi” (`div.qcase`)

```html
<div class="qcase" data-answer="C">
  <h5 class="sub">Dạng 1: tên ngắn của dạng câu</h5>
  <span class="lbl">Đề sẽ viết kiểu này</span>
  <div class="qtext">
    <span class="en">“English question, giọng đề thật: một ca công việc cụ thể, rồi hỏi most appropriate / best first step / most likely cause.”</span>
    <span class="vi">Dịch: bản tiếng Việt đầy đủ.</span>
  </div>
  <span class="lbl">Bạn chọn đáp án nào?</span>
  <div class="qopts">
    <button type="button" class="qopt" data-k="A"><b class="k">A.</b><span class="body"><span class="en">“…”</span><span class="vi">…</span></span></button>
    <button type="button" class="qopt" data-k="B">…</button>
    <button type="button" class="qopt" data-k="C">…</button>
    <button type="button" class="qopt" data-k="D">…</button>
  </div>
  <p class="qfb" hidden></p>
  <div class="qexp" hidden>
    <span class="lbl">Phân tích đề</span>
    <ul>
      <li><b>Đề kể:</b> tình huống, gọn.</li>
      <li><b>Chỗ khó:</b> ràng buộc làm câu này khó (vd “trước khi gửi cho khách”, “policy cấm…”). Có ví dụ nhỏ nếu cần.</li>
      <li><b>Đề hỏi:</b> thực sự hỏi gì (bước đầu tiên? nguyên nhân? cách phù hợp nhất?).</li>
    </ul>
    <span class="lbl">Cần biết để chọn</span>
    <ol>
      <li>Kiến thức nền số 1 (từ bài học).</li>
      <li>Kiến thức nền số 2.</li>
    </ol>
    <span class="lbl">Từng đáp án</span>
    <ul class="verdict">
      <li><b>A sai.</b> A giả định gì / làm gì, gãy ở đâu so với (ý 1) và yêu cầu của đề. Lý do nó hấp dẫn nói luôn ở đây.</li>
      <li><b>B sai.</b> …</li>
      <li class="ok"><b>C đúng.</b> Vì sao, dựa vào (ý 1, 2).</li>
      <li><b>D sai.</b> …</li>
    </ul>
    <button type="button" class="qreset">Làm lại câu này</button>
  </div>
</div>
```

- Đúng 4 phương án A–D, `data-answer` là một chữ. Verdict liệt kê theo thứ tự A, B, C, D; đúng một `li.ok`, trùng `data-answer`.
- **Không có** “Mẹo”, “tip”, `div.qtip`, mục “bẫy” riêng trong qcase. Lý do một đáp án sai mà hấp dẫn nằm trong dòng verdict của nó.
- Rải đáp án đúng đều A/B/C/D trong cả domain; không để đáp án đúng luôn dài nhất.
- Phương án sai phải hợp lý (cái người làm thật hay chọn nhầm): tin Claude tự chấm độ tự tin, gửi luôn cho nhanh, dùng
  model đắt nhất cho chắc, bỏ hẳn việc, làm quá tay, vá triệu chứng.
- Câu hỏi tự viết, **không chép** câu của certsafari hay nguồn khác. Không trùng 3 câu mẫu của guide.

## 6. Quiz cuối domain (`build/quiz-d{N}.json`)

```json
[
  {"q": "English question…", "o": ["…", "…", "…", "…"], "a": 1, "e": "Giải thích tiếng Việt, nêu bài: Bài 3.2: …"},
  {"q": "… (Choose TWO.)", "o": ["…", "…", "…", "…", "…"], "a": [0, 3], "e": "…"}
]
```

- 10–12 câu, phủ mọi bài của domain, khác các câu `qcase`. 2 câu “Choose TWO” với 5 phương án, `a` là mảng 2 chỉ số.
- `a` của câu một đáp án là số 0–3. Trang tự đảo thứ tự phương án, nên đừng viết “Both A and B”.
- `e` tiếng Việt, 1–3 câu: vì sao đúng, đáp án hấp dẫn nhất sai ở đâu.

## 7. Giọng văn (bắt buộc)

- Dạy bằng **tiếng Việt** tự nhiên, như đồng nghiệp giải thích, câu ngắn. Không văn dịch: tránh “Điều này có nghĩa là”,
  “một cách + tính từ”, “việc + động từ” nối nhau, “nhằm mục đích”, “tiến hành”.
- Từ tiếng Anh chỉ giữ cho tên tính năng/sản phẩm (Projects, Research, artifact, connector) và thuật ngữ đề dùng
  (hallucination, prompt). Lần đầu gặp thì có nghĩa tiếng Việt ngay bên cạnh.
- **Mọi câu tiếng Anh** (đề, phương án, trích docs) đều có bản tiếng Việt ngay cạnh.
- Mỗi ý một dòng. Danh sách thì xuống dòng (`<ul>`), không nối bằng dấu chấm phẩy trong một đoạn.
- Định nghĩa trước, rồi mới cơ chế, tình huống, bẫy.
- Không dùng chữ “stem”, “distractor”, “đáp án nhiễu”. Nói “đề kể”, “đáp án bẫy”.
- Không có khối “Mẹo”/“tip” ở bất kỳ đâu.
- Không dùng dấu gạch dài (—) để nối ý; dùng dấu chấm, dấu phẩy hoặc dấu hai chấm.

## 8. Nguồn và độ chính xác

1. **Exam guide** (`nguon/ccao-f-exam-guide.pdf`): mục tiêu của domain và 3 câu mẫu. Khi thi trả lời theo guide.
2. **`nguon/facts-sheet.md`**: nguồn chung cho mọi sự thật về sản phẩm (tính năng, gói, model, giới hạn, dữ liệu,
   chính sách, khung AI Fluency 4D). Đọc hết trước khi viết. Không tự bịa con số. Nếu docs chính thức nói khác
   facts sheet, theo docs chính thức và ghi rõ trong báo cáo cuối.
3. **Bài certsafari của task statement** (link trong prompt): đọc đầy đủ để biết phủ những điểm nào. Mọi điểm quyết
   định và bẫy trong bài của họ phải có mặt trong bài mình (phần dạy, Tệ/Tốt hoặc Biết thêm). Viết lại bằng lời mình.
4. Guide nói một kiểu, docs hiện tại nói kiểu khác: dạy theo guide, ghi chỗ khác trong “Biết thêm”
   (“Guide v1.0 gọi là…; app hiện tại gọi là…; khi thi chọn theo guide”).

Link trong `div.src` và trong bài chỉ được trỏ tới: `support.claude.com`, `claude.com`, `www.anthropic.com`,
`anthropic.com`, `docs.claude.com`, `platform.claude.com`, `anthropic.skilljar.com`, `anthropic-partners.skilljar.com`,
`academy.claude.com`, `privacy.claude.com`, `code.claude.com`.
Link nội bộ `#l-…`, `#cheat-d…` được phép. Không link certsafari trong bài.

## 9. Ranh giới giữa các domain (link sang, đừng dạy lại)

| Domain | Lo phần | Không lo |
|---|---|---|
| D1 Prompting | cấu trúc prompt, chia việc, lặp prompt, chiến lược theo loại việc | chọn tính năng, Projects |
| D2 Evaluation | đúng/đủ, hallucination, bias, fact-check, khi nào cần người duyệt, sửa cho người đọc, chọn định dạng output | data nhạy cảm (D6) |
| D3 Product & Model | chọn chat/Projects/Research/artifact, Haiku/Sonnet/Opus, model theo chi phí-tốc độ-chất lượng, giới hạn context, khi nào mở chat mới/tóm tắt/lưu | cấu hình Project chi tiết (D5) |
| D4 Workflow | phân tích yêu cầu, research/kế hoạch/tối ưu quy trình, thiết kế giải pháp, đưa Claude vào quy trình (augment vs redesign, delegation), nói với stakeholder | sửa prompt kém (D7) |
| D5 Configuration | cấu hình Project (instructions + knowledge), file và connector, viết instructions cấp hệ thống, bảo trì cập nhật | chọn Project hay chat (D3) |
| D6 Governance | dùng được/không được, dữ liệu nhạy cảm, quy định, chính sách tổ chức, đạo đức (trách nhiệm, công khai, phụ thuộc, bias) | kỹ thuật kiểm output (D2) |
| D7 Troubleshooting | chẩn đoán output kém (prompt / knowledge / hội thoại / model / lập luận), chỉnh theo phản hồi, tối ưu quy trình về usage và hiệu quả | dạy lại cấu trúc prompt (D1) |

Bài nền tảng của domain khác: `#l-1-0` … `#l-7-0`. Bài khác: `#l-{N}-{k}`.
