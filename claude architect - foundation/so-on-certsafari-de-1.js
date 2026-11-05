// Sổ ôn certsafari, Đề 1. Trang so-on-certsafari.html nạp file này trước script render.
// Mỗi câu một phần tử, xếp theo n. Các trường:
//   de, n, total     số đề trong sổ; số thứ tự câu trong đề gốc; tổng số câu của đề gốc
//   sub, subName     task statement của guide (vd "3.2") và tên bài bằng tiếng Việt
//   first            (tùy chọn) đáp án user chọn lần đầu trên đề gốc
//   answer           đáp án đúng, đã kiểm bằng notes ôn thi hoặc docs chính thức
//   dispute          (tùy chọn) khi đáp án gốc của đề khác answer: vì sao sổ chọn khác
//   ask, opts[].gist tiếng Anh, viết lại bằng lời riêng (không chép nguyên văn)
//   opts[].why, trap, tip, refs[].label  tiếng Việt
//   refs[].href      NOTES + "#<id có trong notes>"
DE[1] = "Review · Question bank · 50 câu · 01/11/2026";
ENTRIES.push(
  {
    de: 1, n: 1, total: 50, sub: "3.2", subName: "Slash command và skill",
    first: "D", answer: "D",
    ask: "Every release, a developer re-pastes the same 8-step deployment checklist into the conversation, and a copy of those steps keeps expanding inside the project's <code>CLAUDE.md</code>. Claude should have the procedure on hand for release work, but it should not occupy context in sessions and turns that have nothing to do with releasing. Which approach fits?",
    scene: [
      "Mỗi lần release, dev lại dán cùng một checklist deploy 8 bước vào hội thoại. Một bản sao các bước đó cứ phình dần trong <code>CLAUDE.md</code>.",
      "Muốn: Claude có sẵn quy trình này khi làm việc release.",
      "Chỗ khó: quy trình không được chiếm context ở những phiên, những lượt không dính gì tới release. Có sẵn khi cần, nhưng không nạp sẵn."
    ],
    asks: [
      "Cách nào hợp nhất?",
      "Tức là: cất quy trình ở đâu để nó chỉ vào context khi đang làm release, lúc khác gần như không tốn gì.",
      "Soi từng phương án: 8 bước được nạp lúc nào, mọi phiên hay chỉ khi cần?"
    ],
    facts: [
      "Skill là một thư mục chứa <code>SKILL.md</code>. Đầu phiên Claude chỉ thấy <code>description</code> của skill; nội dung đầy đủ chỉ nạp khi gọi <code>/tên-skill</code> hoặc khi việc đang làm khớp với mô tả.",
      "<code>CLAUDE.md</code> nạp ở mọi phiên. File kéo vào bằng <code>@import</code> cũng nạp lúc khởi động và cộng thẳng vào context, không nạp lười.",
      "Hook <code>SessionStart</code> chạy mỗi lần phiên bắt đầu, phiên nào cũng chạy; thứ nó in ra đi vào context của phiên.",
      "Subagent là agent con: nhận một việc, làm trong context riêng rồi trả kết quả về. Nó là người làm việc, không phải chỗ cất tài liệu để tra."
    ],
    opts: [
      { k: "A", gist: "Define a <code>deploy-release</code> subagent in <code>.claude/agents/</code> that holds the checklist, and let Claude hand release work to it.",
        why: [
          "Sai công cụ: subagent dùng để giao một việc cho agent khác làm rồi trả kết quả (ý 4), không phải chỗ cất quy trình cho Claude tra khi cần.",
          "Đề cần chính Claude có sẵn quy trình lúc làm release, không cần đẩy cả việc release sang một agent khác."
        ] },
      { k: "B", gist: "Register a <code>SessionStart</code> hook in <code>settings.json</code> that prints the checklist whenever a session begins.",
        why: [
          "Hook <code>SessionStart</code> chạy ở mọi phiên (ý 3), nên checklist đổ vào context cả khi phiên chẳng dính gì tới deploy.",
          "Đúng cái đề muốn tránh: tốn context ở những phiên không liên quan release."
        ] },
      { k: "C", gist: "Keep a short summary in <code>CLAUDE.md</code> and <code>@import</code> the full steps from <code>docs/deploy-checklist.md</code>.",
        why: [
          "Sai ở giả định: tách ra file riêng không có nghĩa là chỉ nạp khi cần. File <code>@import</code> vẫn nạp lúc khởi động, cộng thẳng vào context (ý 2).",
          "Kết quả: phiên nào cũng gánh đủ 8 bước, y như để thẳng trong <code>CLAUDE.md</code>.",
          "Dễ bị cuốn vì <code>CLAUDE.md</code> trông đã gọn, chỉ còn bản tóm tắt. Nhưng gọn trên mặt file thôi, context vẫn nạp đủ."
        ] },
      { k: "D", gist: "Package the checklist as a <code>deploy-checklist</code> skill under <code>.claude/skills/</code>.",
        why: [
          "Đóng gói thành skill: đầu phiên Claude chỉ thấy dòng <code>description</code>. 8 bước chỉ nạp khi gõ <code>/deploy-checklist</code> hoặc khi việc đang làm khớp mô tả (ý 1).",
          "Phiên làm release có đủ quy trình; phiên không liên quan chỉ tốn một dòng mô tả. Thỏa cả hai vế đề đòi.",
          "Notes chia đúng như vậy: <code>CLAUDE.md</code> cho chuẩn áp dụng mọi lúc, skill cho workflow gọi theo việc."
        ] }
    ],
    refs: [
      { label: "Bài 3.2, mục “Skill hay CLAUDE.md?” (định nghĩa skill ở khung khái niệm đầu bài)", href: NOTES + "#l-3-2" },
      { label: "Bài 3.1, mục “Biết thêm”: “@import không làm nhỏ context”", href: NOTES + "#l-3-1" }
    ]
  },
  {
    de: 1, n: 2, total: 50, sub: "5.2", subName: "Escalate và xử lý chỗ mơ hồ",
    first: "D", answer: "A",
    ask: "A SaaS support agent drafts a reply to a customer asking about a prorated charge, and tags the draft with a self-rated confidence of 45%. Its lookup step fetched the customer's plan terms and invoice lines, and the billing tool's deterministic proration function, run on those records, returns exactly the amount in the draft. Nothing in the data is missing or contradictory, the customer has not asked for a person, and the written policy covers this case. Should the low confidence score make the agent escalate?",
    scene: [
      "Agent hỗ trợ khách của một SaaS soạn câu trả lời cho khách hỏi về khoản phí tính theo tỉ lệ thời gian dùng (prorated charge), và tự chấm bản nháp 45% tự tin.",
      "Nhưng câu trả lời đã được kiểm: bước tra cứu lấy đúng điều khoản gói và các dòng hóa đơn của khách; hàm tính proration của tool billing chạy bằng code trên đúng dữ liệu đó, ra đúng số tiền trong bản nháp.",
      "Thêm nữa: dữ liệu không thiếu, không mâu thuẫn; khách không đòi gặp người; policy có viết cho ca này.",
      "Chỗ khó: con số 45% nghe thấp, dễ khiến nghĩ là phải chuyển người."
    ],
    asks: [
      "Điểm tự tin thấp có nên làm agent escalate (chuyển sang người thật) không?",
      "Tức là: quyết định escalate dựa vào gì, điểm model tự chấm hay các điều kiện guide đặt ra?",
      "Hai phương án nói “có”, hai nói “không”. Với hai cái nói “không”, soi tiếp lý do có đúng không."
    ],
    facts: [
      "Guide có đúng 3 trigger escalate: khách yêu cầu gặp người thật; policy không có hoặc mơ hồ (policy gap); agent không thể tiến triển sau vài lần thử hợp lý.",
      "Self-reported confidence là điểm model tự chấm cho câu trả lời của mình, chưa đối chiếu với kết quả thật. Nó hiệu chuẩn kém: hay tự tin cao ở chỗ sai và ngược lại.",
      "Hiệu chuẩn (calibration) là đối chiếu điểm với đúng/sai thật trên bộ mẫu đã có đáp án, để biết mỗi mức điểm thực sự đúng bao nhiêu phần trăm. Chưa hiệu chuẩn thì “45%” không có nghĩa là đúng 45% số lần.",
      "Hàm chạy bằng code (deterministic: cùng input luôn ra cùng kết quả) cho ra đúng con số trong bản nháp nghĩa là câu trả lời đã được kiểm bằng một đường khác, không dựa vào cảm giác của model."
    ],
    opts: [
      { k: "A", gist: "No. Send the answer: it has been checked against the records, and a self-rated score says little about how hard a case is.",
        why: [
          "Soát 3 trigger (ý 1): khách không đòi người, policy có bao phủ, agent không bị kẹt. Không trigger nào bật.",
          "Con số đã được hàm tính bằng code xác nhận (ý 4). Điểm 45% là model tự chấm, chưa hiệu chuẩn (ý 2), không đủ để lật lại một kết quả đã kiểm.",
          "Vậy gửi câu trả lời, và gửi vì đúng lý do: đã kiểm với hồ sơ, không có trigger nào."
        ] },
      { k: "B", gist: "Yes. A low score suggests the policy documents or the account data are ambiguous, so a human should look.",
        why: [
          "Sai ở giả định: điểm tự tin không đo độ mơ hồ của dữ liệu (ý 2). “Mơ hồ” ở đây chỉ là đoán ra từ con số 45%.",
          "Đề đã nói dữ liệu không thiếu, không mâu thuẫn, policy có viết cho ca này. Không có policy gap (ý 1), nên chuyển người là escalate thừa."
        ] },
      { k: "C", gist: "Yes. A score under 50% means the draft is more likely wrong than right.",
        why: [
          "Sai ở giả định: coi 45% như xác suất đã hiệu chuẩn, tức model nói 45% thì đúng 45% số lần (ý 3). Điểm tự báo của LLM không như vậy (ý 2).",
          "Con số trong bản nháp lại đã được hàm tính bằng code ra khớp (ý 4), nên “dễ sai hơn đúng” trái với chính dữ kiện đề cho."
        ] },
      { k: "D", gist: "No. Proration follows fixed rules, so confidence thresholds do not apply to this topic.",
        why: [
          "Đúng hành động (gửi luôn) nhưng sai lý do. Guide không có luật “chủ đề tính theo quy tắc cố định thì miễn ngưỡng tự tin”; lý do thật là câu trả lời đã kiểm và không trigger nào bật (ý 1, ý 4).",
          "Theo lý do của D, một ca proration mà hóa đơn lệch với điều khoản gói vẫn được gửi luôn. Ca đó dữ liệu mâu thuẫn, phải xem lại, nên lý do này dẫn tới quyết định sai.",
          "Dễ bị cuốn vì D cùng hành động với đáp án đúng, lý do nghe cũng xuôi. Nhưng certsafari hay cho hai phương án cùng hành động, chỉ khác lý do; chấm ở lý do."
        ] }
    ],
    refs: [
      { label: "Bài 5.2, mục “Ba tình huống hay bị nhầm khi escalate” (3 trigger của guide)", href: NOTES + "#fix-9" },
      { label: "Bài 5.2, mục “Chuyện gì đang xảy ra”: vì sao không lấy confidence tự báo làm ngưỡng", href: NOTES + "#l-5-2" },
      { label: "Bài Nền tảng D5, mục 4 “Ai quyết định: escalate, review, và điểm tự tin” (hiệu chuẩn)", href: NOTES + "#l-5-0" }
    ]
  },
  {
    de: 1, n: 3, total: 50, sub: "2.3", subName: "Chia tool cho agent và tool_choice",
    first: "C", answer: "A",
    ask: "An agent that analyzes legal documents has one tool, <code>retrieve_clause</code>, which takes a byte-offset range and returns that slice of text from any uploaded file. The model often uses it to pull text that is unrelated or that cuts a clause in half. The team wants a replacement that can only ever hand back complete, well-defined clauses. Which redesign follows the practice of swapping a generic tool for a constrained one?",
    scene: [
      "Agent phân tích tài liệu pháp lý chỉ có một tool <code>retrieve_clause</code>: nhận một khoảng byte offset (vị trí byte đầu và cuối) và trả về đúng đoạn chữ đó từ bất kỳ file nào đã tải lên.",
      "Model hay dùng nó lấy ra đoạn không liên quan, hoặc đoạn cắt đôi một điều khoản.",
      "Chỗ khó: tool thay thế phải “only ever” (lúc nào cũng chỉ) trả về điều khoản trọn vẹn, xác định rõ. “Thường thì đúng” là chưa đủ."
    ],
    asks: [
      "Thiết kế lại thế nào cho đúng kiểu “thay tool generic (làm gì cũng được) bằng tool có ràng buộc”?",
      "Tức là: đổi chính tool sao cho model không còn cách nào xin ra một đoạn cắt dở, thay vì dặn model cẩn thận hơn hay để ai đó kiểm sau.",
      "Soi từng phương án: sau khi đổi, model còn truyền được offset tùy ý không?"
    ],
    facts: [
      "Tool hẹp (constrained tool) chỉ làm đúng một việc nhỏ và kiểm input chặt. Ví dụ của guide 2.3: <code>fetch_url</code> (tải bất cứ gì) → <code>load_document</code> (chỉ nhận URL tài liệu hợp lệ). Ít tự do hơn, ít sai hơn.",
      "Quy tắc bắt buộc thì chặn bằng code, không nhờ prompt, vì prompt luôn có tỉ lệ fail khác 0. Chữ như “only ever”, “must”, “every time” trong đề là dấu hiệu.",
      "Luật chọn đáp án của notes: loại trước đáp án “to hơn” (thêm tầng, thêm model mà không chạm chỗ gây lỗi), rồi chọn cái sửa đúng gốc với ít công sức nhất."
    ],
    opts: [
      { k: "A", gist: "Replace it with <code>get_clause_by_id</code>, which accepts only a clause ID from an index built by parsing the documents in advance, and returns that clause.",
        why: [
          "Đúng kiểu <code>fetch_url</code> → <code>load_document</code> (ý 1): tool mới không nhận offset nữa, chỉ nhận ID có trong index mà code đã tách sẵn một lần lúc nạp file.",
          "ID sai thì tool báo lỗi, ID đúng thì luôn ra trọn một điều khoản. Model không có cách nào xin một đoạn cắt dở.",
          "Lỗi bị chặn ngay ở input của tool, không trông vào việc model cẩn thận (ý 2). Nên thỏa được “only ever”."
        ] },
      { k: "B", gist: "Keep <code>retrieve_clause</code> and add a <code>list_sections</code> tool that returns where each section starts, so the model can pass those offsets in.",
        why: [
          "Tool generic vẫn còn nguyên, vẫn nhận offset bất kỳ. <code>list_sections</code> chỉ gợi ý điểm bắt đầu; model vẫn có thể truyền offset khác hoặc chọn sai điểm kết thúc.",
          "Thêm một tool và một lượt gọi mà vẫn không bảo đảm “chỉ trả điều khoản trọn vẹn” (ý 2)."
        ] },
      { k: "C", gist: "Put a reviewer subagent around <code>retrieve_clause</code> that checks each returned slice and asks for another call when it splits a clause.",
        why: [
          "Sửa sau thay vì chặn trước: tool vẫn cho xin đoạn sai, chỉ có người đi sau dọn. Mỗi đoạn lỗi tốn thêm một lần kiểm và một lượt gọi lại, tăng token lẫn độ trễ.",
          "Reviewer cũng là LLM nên vẫn có thể bỏ sót, không đạt “only ever”. Đề hỏi thiết kế lại tool, mà C không đổi tool.",
          "Dễ bị cuốn vì thêm subagent kiểm duyệt nghe chắc ăn. Nhưng đó là đáp án “to hơn” (ý 3): thêm một tầng thay vì sửa đúng chỗ gây lỗi."
        ] },
      { k: "D", gist: "Rewrite the <code>retrieve_clause</code> description to say offsets must sit on clause boundaries, and add worked examples of correct boundaries.",
        why: [
          "Chỉ là lời dặn trong description, tool vẫn chấp nhận mọi offset. Model làm theo được phần lớn số lần, không phải lần nào cũng vậy (ý 2).",
          "Đề cần “only ever”, nên phải chặn bằng cấu trúc của tool chứ không bằng lời."
        ] }
    ],
    refs: [
      { label: "Bài 2.3, mục “Chuyện gì đang xảy ra”: thay fetch_url bằng load_document", href: NOTES + "#l-2-3" },
      { label: "Mở đầu, “8 luật chọn đáp án”: loại đáp án “to hơn”, bắt buộc thì code", href: NOTES + "#l-0-3" },
      { label: "Bài 1.4 “Quy tắc bắt buộc thì đừng nhờ prompt”: vì sao D chưa đủ", href: NOTES + "#l-1-4" }
    ]
  },
  {
    de: 1, n: 4, total: 50, sub: "1.1", subName: "Vòng lặp agent",
    first: "B", answer: "D",
    ask: "An architect writes their own agent loop on top of the Messages API for a data-cleanup job. The first response comes back with <code>stop_reason: \"tool_use\"</code> and a <code>tool_use</code> block asking to run a tool that lists files. What must the loop do next so the agent can keep working?",
    scene: [
      "Một kiến trúc sư tự viết vòng lặp agent trên Messages API cho việc dọn dữ liệu.",
      "Response đầu tiên về với <code>stop_reason: \"tool_use\"</code> và một block <code>tool_use</code> xin chạy tool liệt kê file. Ví dụ minh họa (tên tool tự đặt):<pre><code>stop_reason: \"tool_use\"\ncontent: [\n  { type: \"tool_use\", id: \"tu_1\", name: \"list_files\", input: { ... } }\n]</code></pre>",
      "Chỗ khó: cả 4 phương án đều “chạy tool rồi gửi lại”, chỉ khác 3 chi tiết: kết quả viết thành loại block nào, đặt ở vai nào, có gửi lại lượt <code>tool_use</code> không."
    ],
    asks: [
      "Vòng lặp phải làm gì tiếp để agent làm tiếp được?",
      "Tức là: request vòng 2 phải trông thế nào để API nhận và Claude hiểu được kết quả tool.",
      "Soi 3 chi tiết ở mỗi phương án: loại block, vai (role), có giữ lượt <code>tool_use</code> không. Chỉ một tổ hợp đúng cả 3."
    ],
    facts: [
      "Messages API không có trí nhớ (stateless): mỗi lần gọi phải gửi lại toàn bộ lịch sử trong <code>messages</code>, kể cả message <code>assistant</code> chứa block <code>tool_use</code>.",
      "Kết quả tool gửi lại bằng block <code>tool_result</code>, mang <code>tool_use_id</code> trùng với <code>id</code> của lời xin. Text thường không ghép được với lời xin nào.",
      "API chỉ có hai vai: <code>assistant</code> là những gì Claude viết, <code>user</code> là mọi thứ đi vào từ bên ngoài. Kết quả tool do code của mày tạo, nên nằm trong message <code>role: \"user\"</code>.",
      "<code>tool_result</code> mà không có lượt <code>tool_use</code> tương ứng để khớp thì API trả lỗi 400."
    ],
    opts: [
      { k: "A", gist: "Run the tool, write its output as a plain text block that mentions the <code>tool_use_id</code>, put it in an <code>assistant</code> message, and resend the history including the <code>tool_use</code> turn.",
        why: [
          "Sai loại block: text thường không phải <code>tool_result</code>, API không ghép được kết quả với lời xin (ý 2). Claude chỉ thấy một đoạn chữ.",
          "Sai vai: đặt ở <code>assistant</code> là giả làm Claude tự nói (ý 3). Chỉ đúng mỗi phần giữ lượt <code>tool_use</code>."
        ] },
      { k: "B", gist: "Run the tool, write its output as a <code>tool_result</code> block with the matching <code>tool_use_id</code>, put it in an <code>assistant</code> message, and resend the history without the <code>tool_use</code> turn.",
        why: [
          "Đúng loại block, nhưng sai vai: <code>tool_result</code> phải ở vai <code>user</code> vì do code tạo, không phải Claude viết (ý 3).",
          "Bỏ lượt <code>tool_use</code> thì <code>tool_result</code> không còn lời xin nào để khớp, API trả lỗi 400 (ý 1, ý 4).",
          "Dễ bị cuốn vì có đúng block <code>tool_result</code> kèm <code>tool_use_id</code>, trông gần đúng nhất. Nhưng 4 phương án là tổ hợp của 3 lựa chọn, B chỉ đúng 1 trong 3."
        ] },
      { k: "C", gist: "Run the tool, write its output as a plain text block that mentions the <code>tool_use_id</code>, put it in a <code>user</code> message, and resend the history without the <code>tool_use</code> turn.",
        why: [
          "Đúng vai <code>user</code> (ý 3), sai 2 chỗ còn lại.",
          "Dùng text thường thay cho <code>tool_result</code> (ý 2), và bỏ lượt <code>tool_use</code> nên không còn lời xin để ghép (ý 1, ý 4)."
        ] },
      { k: "D", gist: "Run the tool, write its output as a <code>tool_result</code> block with the matching <code>tool_use_id</code>, put it in a <code>user</code> message, and resend the history including the <code>tool_use</code> turn.",
        why: [
          "Đúng cả 3: block <code>tool_result</code> mang <code>tool_use_id</code> khớp (ý 2); nằm trong message <code>role: \"user\"</code> (ý 3); lịch sử gửi lại có nguyên văn message <code>assistant</code> chứa <code>tool_use</code> (ý 1).",
          "Thứ tự vòng 2: user (yêu cầu) → assistant (<code>tool_use</code>) → user (<code>tool_result</code>). Claude thấy mình đã xin gì, kết quả ra sao, rồi chọn bước tiếp."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D1, mục 5 “Chạy thử một ca thật, từng vòng”: messages vòng 2 và sơ đồ tuần tự", href: NOTES + "#seq-1-0" },
      { label: "Bài Nền tảng D1, đoạn “Vì sao tool_result nằm ở vai user?”", href: NOTES + "#l-1-0" },
      { label: "Bài 1.1 “Vòng lặp agent: khi nào chạy tiếp, khi nào dừng”", href: NOTES + "#l-1-1" }
    ]
  },
  {
    de: 1, n: 5, total: 50, sub: "5.1", subName: "Giữ thông tin quan trọng trong hội thoại dài",
    first: "B", answer: "B",
    ask: "A sales assistant calls a CRM lookup tool that returns about 60 fields for every contact, including internal lead-scoring data, campaign tags and audit timestamps. Writing the follow-up email needs only four of them: name, company, deal stage and date of last contact. After ten lookups, raw contact records take up most of the context. What should the assistant do?",
    scene: [
      "Trợ lý bán hàng gọi tool tra CRM. Mỗi contact trả về khoảng 60 trường, gồm dữ liệu chấm điểm lead nội bộ, tag chiến dịch, mốc thời gian audit.",
      "Viết email follow-up chỉ cần 4 trường: tên, công ty, giai đoạn deal, ngày liên hệ gần nhất.",
      "Chỗ khó: sau 10 lần tra, bản ghi thô chiếm gần hết context. Phải giảm context mà vẫn giữ đủ 4 trường cần."
    ],
    asks: [
      "Trợ lý nên làm gì?",
      "Tức là: bỏ phần thừa nào, ở bước nào, mà không mất 4 trường email cần.",
      "Soi từng phương án: làm xong thì context còn bao nhiêu trường thừa, 4 trường cần có còn không?"
    ],
    facts: [
      "Trim tool output: cắt kết quả tool chỉ còn các trường cần, bằng code hoặc hook (ví dụ <code>PostToolUse</code>), trước khi nối vào <code>messages</code>.",
      "Chỗ cắt đúng là trước khi kết quả vào context: thứ đã nối vào <code>messages</code> sẽ được gửi lại ở mọi lần gọi sau.",
      "Phần thừa nằm ở số trường, không ở cách viết. Đổi JSON sang CSV chỉ bớt dấu ngoặc và tên key, số trường vẫn vậy."
    ],
    opts: [
      { k: "A", gist: "Throw away each raw record as soon as the lookup returns, and call the CRM again whenever the email needs a field.",
        why: [
          "Context gọn thật, nhưng 4 trường cần bị vứt cùng phần thừa.",
          "Mỗi lần viết email lại phải gọi CRM cho chính dữ liệu vừa có, tốn thêm lượt gọi và độ trễ. Cách đúng là giữ phần cần, chỉ bỏ phần thừa (ý 1)."
        ] },
      { k: "B", gist: "Cut every lookup result down to the four fields the email uses, and drop the rest before it reaches the context.",
        why: [
          "Đây là trim tool output của guide 5.1 (ý 1): code hoặc hook <code>PostToolUse</code> lọc mỗi kết quả còn 4 trường, trước khi nối vào <code>messages</code> (ý 2).",
          "10 contact × 4 trường thay vì 10 × 60. Phần thừa không bao giờ vào context, 4 trường email cần còn nguyên."
        ] },
      { k: "C", gist: "Ask the CRM tool for a denser format such as CSV, still with all 60 fields per contact.",
        why: [
          "Sai ở giả định: đổi định dạng chỉ bớt dấu ngoặc và tên key, cả 60 trường vẫn vào context (ý 3).",
          "Gốc vấn đề là 56 trường thừa mỗi contact. Sau 10 lần tra, context vẫn đầy gần như cũ.",
          "Dễ bị cuốn vì “denser format” (định dạng gọn hơn) nghe như tối ưu context. Nhưng nó chỉ nén cách viết, không bớt được trường thừa nào."
        ] },
      { k: "D", gist: "Keep every contact's full 60-field record in context, and remove the oldest records when the window is almost full.",
        why: [
          "Vẫn giữ 56 trường thừa mỗi contact. Đến khi gần đầy thì xóa contact cũ, mất luôn 4 trường cần của contact đó.",
          "Bỏ nhầm thứ: bỏ dữ liệu cần, giữ dữ liệu thừa. Ngược hẳn với trim (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 5.1, mục “Bộ kỹ thuật đi kèm” (trim tool output) và câu luyện “40 fields, only 5 needed”", href: NOTES + "#l-5-1" },
      { label: "Bài Nền tảng D5: định nghĩa Trim và bảng được/mất", href: NOTES + "#l-5-0" },
      { label: "Bài 5.1, khối “Trong dự án DrillPark”", href: NOTES + "#proj-5-1" }
    ]
  },
  {
    de: 1, n: 6, total: 50, sub: "1.3", subName: "Gọi subagent, truyền context",
    first: "C", answer: "C",
    ask: "A team is building a <code>doc-reviewer</code> subagent. It must be able to read documentation and comment on it, but it must never be able to change a file, not even by accident. The coordinator has Read, Edit, Write, Grep and Glob. How should doc-reviewer's <code>AgentDefinition</code> be set up so this is guaranteed?",
    scene: [
      "Team dựng subagent <code>doc-reviewer</code>: đọc tài liệu và góp ý.",
      "Chỗ khó: nó “must never” (tuyệt đối không được) sửa file, kể cả vô tình. Đề đòi “guaranteed” (bảo đảm), không phải “thường thì không”.",
      "Coordinator đang có Read, Edit, Write, Grep, Glob."
    ],
    asks: [
      "Cấu hình <code>AgentDefinition</code> của doc-reviewer thế nào để bảo đảm điều đó?",
      "Tức là: đặt ràng buộc ở đâu để doc-reviewer không thể gọi Edit hay Write, mà coordinator vẫn giữ nguyên tool của nó.",
      "Soi từng phương án: ràng buộc nằm ở cấu hình hay ở lời dặn? Đặt lên đúng agent không?"
    ],
    facts: [
      "Trường <code>tools</code> trong AgentDefinition là danh sách cho phép: subagent chỉ gọi được tool có trong danh sách.",
      "Bỏ trống <code>tools</code> thì subagent được dùng toàn bộ tool của agent cha. Mặc định là rộng, không phải rỗng.",
      "Quy tắc bắt buộc thì chặn bằng cấu hình hoặc code, không nhờ prompt, vì prompt luôn có tỉ lệ fail khác 0.",
      "<code>description</code> của subagent để coordinator biết khi nào nên gọi nó; nó không chặn tool nào."
    ],
    opts: [
      { k: "A", gist: "Give doc-reviewer the same tools as the coordinator, and use its <code>description</code> to say it is meant to be read-only.",
        why: [
          "Có đủ Edit và Write thì doc-reviewer vẫn sửa được file.",
          "<code>description</code> chỉ giúp coordinator biết khi nào gọi subagent này (ý 4). Ghi “read-only” ở đó là lời dặn, không phải bảo đảm (ý 3)."
        ] },
      { k: "B", gist: "Narrow the coordinator's own <code>allowedTools</code> to <code>[\"Read\", \"Grep\"]</code> while the review runs, so neither agent can reach Edit or Write.",
        why: [
          "Chặn được, nhưng chặn nhầm agent: coordinator mất luôn Edit và Write mà việc khác của nó có thể cần, lại phải nhớ mở lại sau khi review xong.",
          "Ràng buộc của doc-reviewer thì đặt ở định nghĩa của doc-reviewer (ý 1)."
        ] },
      { k: "C", gist: "Set <code>tools: [\"Read\", \"Grep\"]</code> on the doc-reviewer definition, so it gets only those read tools whatever the coordinator has.",
        why: [
          "<code>tools: [\"Read\", \"Grep\"]</code> là danh sách cho phép (ý 1): Edit và Write không có trong đó thì doc-reviewer không gọi được, coordinator có gì cũng vậy.",
          "Ràng buộc nằm ở cấu hình nên chắc chắn, không phụ thuộc model có nghe lời hay không (ý 3). Coordinator vẫn giữ đủ tool của mình."
        ] },
      { k: "D", gist: "Leave <code>tools</code> unset on doc-reviewer, and tell it in its <code>prompt</code> never to call Edit or Write.",
        why: [
          "Hai lỗi chồng nhau. Bỏ trống <code>tools</code> thì doc-reviewer được dùng toàn bộ tool của cha, kể cả Edit và Write (ý 2).",
          "Sau đó chỉ dặn bằng prompt, mà prompt không bảo đảm 100% (ý 3). Đề đòi “guaranteed”.",
          "Dễ bị cuốn vì “không khai tools” nghe như “không cấp tool”. Nhưng bỏ trống lại là cấp hết."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Biết thêm”: bỏ trống tools thì dùng hết tool của agent cha", href: NOTES + "#l-1-3" },
      { label: "Bài 1.4 “Quy tắc bắt buộc thì đừng nhờ prompt”: vì sao A và D không đủ", href: NOTES + "#l-1-4" },
      { label: "Cheatsheet D1: dòng “Subagent không khai tools mà gọi được mọi tool”", href: NOTES + "#cheat-d1" }
    ]
  },
  {
    de: 1, n: 7, total: 50, sub: "1.1", subName: "Vòng lặp agent",
    first: "C", answer: "C",
    ask: "While debugging an agent loop, a developer sees that on the third iteration Claude asks for the same file-read tool with the same arguments it used on the first, as though it never got the earlier result. The code that builds the history appends only the assistant's text blocks, never the <code>tool_use</code> or <code>tool_result</code> blocks. What most likely causes the repeated call?",
    scene: [
      "Đang debug một vòng lặp agent: ở vòng 3, Claude xin lại đúng tool đọc file, đúng tham số như vòng 1, như thể chưa từng nhận kết quả.",
      "Code dựng lịch sử chỉ nối các block text của assistant, không bao giờ nối block <code>tool_use</code> hay <code>tool_result</code>. Ví dụ minh họa lịch sử gửi ở vòng 3:<pre><code>user:      \"...yêu cầu ban đầu...\"\nassistant: \"Để tôi đọc file cấu hình.\"   ← chỉ có text\n(không có tool_use, không có tool_result chứa nội dung file)</code></pre>",
      "Chỗ khó: các phương án sai đều đưa nguyên nhân nghe rất kỹ thuật (system prompt, cache, cờ lỗi)."
    ],
    asks: [
      "Nguyên nhân khả dĩ nhất của lần gọi lặp là gì?",
      "Tức là: vì sao Claude không “nhớ” là mình đã đọc file?",
      "Soi từng phương án: nguyên nhân đó có giải thích được việc Claude không thấy kết quả đọc file không, và có khớp với dữ kiện về code dựng lịch sử không?"
    ],
    facts: [
      "Messages API không có trí nhớ: Claude chỉ biết những gì nằm trong <code>messages</code> của lần gọi đó. <code>messages</code> là bộ nhớ duy nhất của nó.",
      "Sau mỗi vòng có gọi tool, code phải nối cả response của Claude (có block <code>tool_use</code>) lẫn <code>tool_result</code> vào <code>messages</code>.",
      "Prompt caching chỉ làm rẻ và nhanh hơn phần đầu request lặp lại giữa các lần gọi. Cache hết hạn thì request vẫn gửi đủ nội dung, chỉ bị xử lý lại với giá đầy đủ; cache không xóa gì khỏi context.",
      "Tool lỗi vẫn trả <code>tool_result</code> kèm <code>is_error: true</code> và nội dung lỗi; Claude đọc lỗi rồi sửa tham số hoặc giải thích cho người dùng."
    ],
    opts: [
      { k: "A", gist: "The system prompt never tells Claude to reuse earlier tool output, so it calls the file-read tool again instead.",
        why: [
          "Claude không cần ai dặn mới dùng lại kết quả nó đã thấy. Vấn đề là nó chưa hề thấy kết quả (ý 1).",
          "Thêm câu dặn vào system prompt cũng không làm nội dung file hiện ra trong <code>messages</code>."
        ] },
      { k: "B", gist: "The prompt cache expired between iterations, which evicted the earlier tool exchange from the context.",
        why: [
          "Sai ở giả định: cache không quyết định Claude thấy gì (ý 3). Context là đúng những gì code gửi trong <code>messages</code> (ý 1).",
          "Ở đây nội dung file chưa từng được gửi lại, nên cache còn hạn hay hết hạn thì Claude cũng không thấy nó.",
          "Dễ bị cuốn vì “cache expired, context evicted” (cache hết hạn, context bị đẩy ra) nghe rất kỹ thuật. Nhưng cache hết hạn chỉ làm đắt hơn, không xóa gì khỏi context."
        ] },
      { k: "C", gist: "The file contents from the first read were never sent back in <code>messages</code>, so Claude has no sign that the read happened.",
        why: [
          "Code chỉ nối text của assistant, nên lượt <code>tool_use</code> và <code>tool_result</code> chứa nội dung file không bao giờ được gửi lại (ý 2).",
          "API không nhớ gì (ý 1): nhìn lịch sử, Claude thấy mình chưa đọc file, nên xin đọc lại với đúng tham số cũ."
        ] },
      { k: "D", gist: "The first tool result was marked <code>is_error</code>, so Claude treated the read as failed and retried it.",
        why: [
          "Đề không có dấu hiệu lỗi nào. Code không gửi <code>tool_result</code> thì cờ <code>is_error</code> nằm trong đó cũng không tới được Claude.",
          "Kể cả khi tool lỗi thật, Claude thường đọc nội dung lỗi rồi sửa tham số (ý 4), không gửi lại y hệt."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D1, mục 5 “Chạy thử một ca thật, từng vòng”: messages vòng 2 phải có gì", href: NOTES + "#seq-1-0" },
      { label: "Bài 1.1: tool lỗi vẫn trả tool_result kèm is_error (vì sao D không khớp)", href: NOTES + "#l-1-1" }
    ]
  },
  {
    de: 1, n: 8, total: 50, sub: "1.6", subName: "Chia việc lớn",
    first: "B", answer: "B",
    ask: "An agent must refactor a shared authentication module. An unknown number of other modules import it, in a codebase whose size is also unknown. The refactor is only safe once you know how far the change reaches, and that cannot be known without searching the codebase first. How should the work be broken down?",
    scene: [
      "Agent phải refactor (sửa cấu trúc code) một module xác thực dùng chung.",
      "Không biết bao nhiêu module khác import nó, cũng không biết codebase to cỡ nào.",
      "Chỗ khó: refactor chỉ an toàn khi biết thay đổi lan tới đâu, mà điều đó chỉ biết được sau khi tìm trong codebase."
    ],
    asks: [
      "Nên chia việc thế nào?",
      "Tức là: chưa biết trước các bước thì chia kiểu gì để phạm vi do dữ liệu thật quyết định.",
      "Soi từng phương án: việc con được định ra trước hay sau khi tìm? Dựa trên tìm thật hay đoán?"
    ],
    facts: [
      "Prompt chaining: chuỗi bước định sẵn trong code, output bước trước là input bước sau. Hợp với việc biết trước các bước, ví dụ review PR: mỗi file một lượt, rồi một lượt tích hợp.",
      "Dynamic adaptive decomposition (chia việc thích ứng): bước sau chưa biết trước. Agent làm bước khám phá, nhìn kết quả rồi mới quyết định bước sau, và sửa kế hoạch khi phát hiện điều mới.",
      "Việc mở trên code chưa rành thì bắt đầu bằng vẽ bản đồ: module nào import module nào, chỗ nào nhiều nơi gọi tới, rồi mới lập kế hoạch.",
      "Luật chọn đáp án của notes: loại trước đáp án dựa vào cảm giác của model."
    ],
    opts: [
      { k: "A", gist: "Split the codebase into fixed per-directory subtasks up front, each updating its own imports of the module, and merge the results at the end.",
        why: [
          "Chia theo thư mục khi chưa biết ai import module là chia mù: bước định sẵn (ý 1) áp cho một việc chưa biết trước được.",
          "Thư mục không dùng module thì phí công; chỗ import gián tiếp (qua module khác re-export, tức xuất lại) dễ bị sót.",
          "Dễ bị cuốn vì chia song song theo thư mục trông gọn và nhanh. Nhưng đó là chia theo cấu trúc thư mục, không theo phạm vi ảnh hưởng thật."
        ] },
      { k: "B", gist: "Start with a search subtask that finds every module importing the auth module, then create one refactor subtask per caller the search returns.",
        why: [
          "Đây là dynamic adaptive decomposition (ý 2): bước đầu là khám phá, tìm mọi module import module xác thực (ý 3).",
          "Rồi mới sinh mỗi chỗ gọi một việc con refactor từ kết quả tìm được. Số việc con và phạm vi do dữ liệu thật quyết định, đúng điều đề đòi: hiểu phạm vi trước khi sửa."
        ] },
      { k: "C", gist: "Run a fixed edit → test → deploy pipeline on the auth module, then add review subtasks for whichever callers the failing tests reveal.",
        why: [
          "Sửa trước rồi mới biết ảnh hưởng, ngược với yêu cầu hiểu phạm vi trước khi sửa. Một pipeline cố định (ý 1) cho việc chưa biết trước.",
          "Chỗ gọi nào không có test thì không lộ ra; còn lúc test fail thì code đã đổi, có khi đã deploy."
        ] },
      { k: "D", gist: "Have the model guess the affected callers from the module's name and a quick look at its docs, then size the subtasks to that guess.",
        why: [
          "Đoán phạm vi từ tên module và tài liệu là dựa vào cảm giác của model (ý 4), không tìm thật trong code.",
          "Đề đã nói phạm vi chỉ biết được sau khi tìm. Đoán thiếu thì sót chỗ gọi, refactor làm hỏng chúng."
        ] }
    ],
    refs: [
      { label: "Bài 1.6: prompt chaining và dynamic adaptive decomposition", href: NOTES + "#l-1-6" },
      { label: "Bài 1.6, khối “Trong dự án DrillPark”", href: NOTES + "#proj-1-6" }
    ]
  },
  {
    de: 1, n: 9, total: 50, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema",
    first: "A", answer: "A",
    ask: "A team building a resume parser wants to be certain that candidate data is extracted through a <code>parse_resume</code> tool on this turn. They also want to know whether Claude can write out its reasoning about unclear resume sections before making that call. Which <code>tool_choice</code> guarantees the <code>parse_resume</code> call, and what do Anthropic's docs say about text before a forced tool call?",
    scene: [
      "Team làm bộ đọc CV (resume parser) muốn chắc chắn dữ liệu ứng viên được trích qua tool <code>parse_resume</code> ngay ở lượt này.",
      "Họ cũng muốn biết Claude có viết ra suy luận về những đoạn CV mơ hồ trước khi gọi tool được không.",
      "Chỗ khó: đề hỏi hai vế cùng lúc, và hai vế kéo nhau. Bảo đảm gọi tool thì mất gì?"
    ],
    asks: [
      "<code>tool_choice</code> nào bảo đảm gọi <code>parse_resume</code>, và docs của Anthropic nói gì về text đứng trước lệnh gọi tool bị ép?",
      "Tức là: chọn giá trị ép đúng một tool, và biết cái giá của việc ép.",
      "Soi cả hai vế ở mỗi phương án: có bảo đảm gọi đúng <code>parse_resume</code> không? Câu về text trước tool call có đúng docs không?"
    ],
    facts: [
      "<code>tool_choice</code> có 4 giá trị: <code>auto</code> (tự quyết gọi tool hay trả text, mặc định); <code>any</code> (bắt buộc gọi một tool, Claude chọn tool nào); <code>{\"type\": \"tool\", \"name\": …}</code> (bắt buộc gọi đúng tool đó); <code>none</code> (không được gọi tool nào).",
      "Ép tool bằng <code>any</code> hoặc <code>tool</code> thì API prefill (điền sẵn) lượt assistant, nên response mở đầu ngay bằng <code>tool_use</code>: không có câu giải thích trước, kể cả khi prompt yêu cầu.",
      "Muốn Claude bình luận trước khi gọi tool thì phải dùng <code>auto</code>, và mất bảo đảm là có gọi tool. Lời dặn trong prompt chỉ tăng khả năng, không bảo đảm."
    ],
    opts: [
      { k: "A", gist: "<code>{\"type\": \"tool\", \"name\": \"parse_resume\"}</code>. It is the documented way to force that one tool; the cost is that a forced call comes with no natural-language text in front of it.",
        why: [
          "<code>{\"type\": \"tool\", \"name\": \"parse_resume\"}</code> ép Claude gọi đúng tool đó (ý 1).",
          "Cái giá: API prefill lượt assistant, response mở đầu ngay bằng <code>tool_use</code>, không có text trước (ý 2). Bảo đảm gọi tool và có suy luận bằng text trước tool call: chỉ được chọn một.",
          "Biết thêm: notes ghi docs hiện tại có vài model mới (Opus 5.5, Sonnet 5.5, Fable 5.1, Mythos 5.1) trả lỗi 400 với <code>any</code>/<code>tool</code>. Đề theo guide vẫn chấm ép tool là cách bảo đảm."
        ] },
      { k: "B", gist: "<code>{\"type\": \"any\"}</code>. It lets Claude mix free commentary with the forced tool call in the same response.",
        why: [
          "Sai hai chỗ. <code>any</code> ép gọi <i>một</i> tool nào đó (ý 1); có nhiều tool thì không chắc là <code>parse_resume</code>.",
          "Và <code>any</code> cũng bị prefill như <code>tool</code> (ý 2), nên không có text trước tool call như B nói."
        ] },
      { k: "C", gist: "<code>{\"type\": \"none\"}</code>, so Claude can reason in text and decide for itself whether to call <code>parse_resume</code> afterwards.",
        why: [
          "<code>none</code> là cấm gọi tool (ý 1): Claude chỉ trả text, không thể gọi <code>parse_resume</code> ở lượt này.",
          "Ngược hẳn yêu cầu bảo đảm gọi tool."
        ] },
      { k: "D", gist: "<code>{\"type\": \"auto\"}</code>, plus a line in the user message telling Claude to use <code>parse_resume</code> and to share its reasoning as text.",
        why: [
          "<code>auto</code> cho phép text trước tool call, nhưng Claude tự quyết có gọi tool hay không (ý 3).",
          "Lời dặn trong user message chỉ tăng khả năng, không bảo đảm. Đề đòi “guarantee” (bảo đảm).",
          "Dễ bị cuốn vì vừa có text vừa có lời dặn gọi tool, trông như được cả đôi. Nhưng <code>auto</code> không bảo đảm gọi tool, mà đề hỏi cấu hình bảo đảm."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, mục “Biết thêm”: ép tool thì response mở đầu bằng tool_use, không có text trước", href: NOTES + "#l-4-3" },
      { label: "Bài Nền tảng D4, mục 3: tool, tool_use và tool_choice", href: NOTES + "#l-4-0" },
      { label: "Cheatsheet D2: 4 giá trị tool_choice, model mới trả 400 với any/tool", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 1, n: 10, total: 50, sub: "4.2", subName: "Few-shot cho output ổn định",
    first: "D", answer: "C",
    ask: "A research-summary tool extracts source citations from academic papers. Some papers cite inline in the body, for example “(Smith, 2019)”; others use only superscript numbers that point into a numbered bibliography. Citations from inline papers come out right, but for bibliography papers the tool often returns an empty citation list. What should be added to the prompt?",
    scene: [
      "Tool tóm tắt nghiên cứu trích nguồn trích dẫn từ bài báo khoa học. Có hai kiểu trích dẫn. Ví dụ minh họa:<pre><code>Kiểu inline:  ... đã được chứng minh (Smith, 2019).\n\nKiểu số mũ:   ... đã được chứng minh¹.\n              Tài liệu tham khảo\n              1. Smith, J. (2019). ...</code></pre>",
      "Bài kiểu inline thì trích đúng. Bài kiểu số mũ trỏ vào bibliography (danh mục tài liệu đánh số) thì tool hay trả danh sách trích dẫn rỗng.",
      "Chỗ khó: thông tin có trong bài, chỉ nằm ở cấu trúc khác. Model đọc được kiểu này mà hỏng kiểu kia."
    ],
    asks: [
      "Nên thêm gì vào prompt?",
      "Tức là: dạy model đọc kiểu trích dẫn bằng số mũ, cụ thể là bước nối số mũ với mục tương ứng trong bibliography.",
      "Soi từng phương án: nó chỉ cho model cách làm bước nối đó, hay chỉ mô tả, xóa dấu vết, hoặc ép hình dạng output?"
    ],
    facts: [
      "Few-shot là đặt vài ví dụ mẫu input → output vào prompt để Claude bắt chước. Khi mô tả chi tiết vẫn cho kết quả không nhất quán, guide nói few-shot là kỹ thuật hiệu quả nhất.",
      "Một chỗ few-shot phát huy là “varied document structures” (cấu trúc tài liệu đa dạng), ví dụ paper trích dẫn inline và paper dùng bibliography. Loại ví dụ này sửa ca trả rỗng hoặc null dù thông tin có trong tài liệu.",
      "Schema chỉ bảo đảm hình dạng và kiểu dữ liệu, không bảo đảm nghĩa. Ép trường phải có giá trị khi tài liệu không cho model đủ manh mối thì model bịa cho đủ; bài 4.3 dùng nullable để tránh."
    ],
    opts: [
      { k: "A", gist: "An instruction stating that papers cite either inline or through superscript numbers that point to a numbered bibliography.",
        why: [
          "Chỉ báo “có hai kiểu” mà không chỉ cách làm. Model không thiếu thông tin rằng có kiểu số mũ; nó thiếu bước nối số mũ với mục trong bibliography.",
          "Mô tả bằng lời chính là thứ đang có mà vẫn lệch (ý 1)."
        ] },
      { k: "B", gist: "A preprocessing step that strips superscript markers from each paper before the model reads it.",
        why: [
          "Xóa số mũ là xóa luôn dấu vết duy nhất nối câu trong bài với nguồn.",
          "Model càng không biết câu nào trích nguồn nào, tức là làm tệ hơn."
        ] },
      { k: "C", gist: "One worked example for each citation style, including how a superscript number is matched to its bibliography entry.",
        why: [
          "Đúng ca “varied document structures” (ý 2): mỗi kiểu trích dẫn một ví dụ.",
          "Model đã làm đúng kiểu inline, chỉ hỏng ở bước nối số mũ ¹ với mục 1 trong bibliography. Ví dụ chỉ thẳng bước đó, nên sửa đúng chỗ trả rỗng (ý 1)."
        ] },
      { k: "D", gist: "A JSON output schema that requires a citations array with at least one entry per paper.",
        why: [
          "Schema quy định hình dạng output, không dạy cách tìm trích dẫn trong bài (ý 3).",
          "Bắt mảng có ít nhất 1 phần tử thì model, vẫn không biết lấy từ đâu, sẽ bịa hoặc điền đại cho đủ. Đổi “rỗng” thành “bịa”, tệ hơn.",
          "Dễ bị cuốn vì “schema bắt buộc” nghe như chặn lỗi bằng cấu trúc (luật “bắt buộc thì code”). Nhưng lỗi ở đây là model không biết cách đọc, không phải output sai hình dạng."
        ] }
    ],
    refs: [
      { label: "Bài 4.2, mục “Bốn chỗ few-shot phát huy” (inline và bibliography) và “Khi đi thi”, Dạng 1", href: NOTES + "#l-4-2" },
      { label: "Bài 4.3: trường required ép model bịa, dùng nullable (vì sao D làm tệ hơn)", href: NOTES + "#l-4-3" }
    ]
  },
  {
    de: 1, n: 11, total: 50, sub: "4.5", subName: "Xử lý theo lô (Batch)",
    first: "B", answer: "B",
    ask: "A developer is putting together a batch of translation requests. Each request needs an identifier that the Message Batches API will accept and that can later be used to match each result to its request. Which identifier is valid?",
    scene: [
      "Dev gom một lô yêu cầu dịch để gửi qua Message Batches API.",
      "Mỗi request cần một mã định danh (<code>custom_id</code>). Mã phải được API chấp nhận, và sau này dùng để ghép từng kết quả với đúng request của nó.",
      "Chỗ khó: bốn mã đều kèm một lý do nghe hợp lý (dễ tách đoạn, dễ đọc, dễ lần lại khi audit). Thứ thật sự khác nhau chỉ là ký tự nằm trong mã."
    ],
    asks: [
      "Mã nào hợp lệ?",
      "Tức là: mã nào qua được luật định dạng của <code>custom_id</code>.",
      "Soi từng mã theo luật ký tự và độ dài (ý 3). Lý do đi kèm nghe hay đến đâu cũng không tính, vì API không đọc lý do."
    ],
    facts: [
      "Message Batches API nhận cả lô request một lần và xử lý bất đồng bộ: không đứng chờ, quay lại lấy kết quả sau. Đổi lại giá rẻ 50%.",
      "Kết quả không về theo thứ tự gửi. Muốn biết kết quả nào thuộc request nào thì ghép bằng <code>custom_id</code> do mình đặt.",
      "<code>custom_id</code> dài 1–64 ký tự, chỉ gồm chữ cái, chữ số, <code>-</code> và <code>_</code> (regex <code>^[a-zA-Z0-9_-]{1,64}$</code>), và không được trùng trong cùng một lô."
    ],
    opts: [
      { k: "A", gist: "<code>doc#2026#report#final#v2</code>: a distinct punctuation mark between segments makes the boundaries unambiguous.",
        why: [
          "Sai ở ký tự: <code>#</code> không nằm trong tập cho phép (ý 3).",
          "API từ chối mã này ngay khi nhận lô. “Ranh giới rõ” không cứu được, vì API chỉ kiểm tập ký tự, không xét mã dễ tách hay khó tách."
        ] },
      { k: "B", gist: "<code>doc-2026-report_final</code>: it uses only letters, digits, hyphens and underscores, and is under 64 characters.",
        why: [
          "Mã chỉ có chữ cái, chữ số, <code>-</code> và <code>_</code>, dài 21 ký tự, nằm trong khoảng 1–64 (ý 3). API nhận.",
          "Kết quả về không theo thứ tự (ý 2), nên chính mã này là thứ nối bản dịch với đúng tài liệu gốc. Chỉ cần giữ cho mỗi mã không trùng trong lô."
        ] },
      { k: "C", gist: "<code>doc 2026 report final v2</code>: spaces between segments keep it easy to read in a long results file.",
        why: [
          "Sai ở ký tự: khoảng trắng không nằm trong tập cho phép (ý 3).",
          "API từ chối mã. “Dễ đọc trong file kết quả dài” là chuyện của người đọc bằng mắt, không phải tiêu chí của API."
        ] },
      { k: "D", gist: "<code>doc/2026/report:final</code>: a date plus a colon-separated section label makes the request easy to trace in a later audit.",
        why: [
          "Sai ở ký tự: <code>/</code> và <code>:</code> đều không được phép (ý 3), nên API từ chối.",
          "Muốn mang ngày hay đường dẫn vào mã thì đổi sang dạng an toàn trước, ví dụ <code>doc_2026_report-final</code>. Cần thêm thông tin cho audit thì giữ một bảng tra riêng theo <code>custom_id</code>.",
          "Dễ bị cuốn vì “easy to trace in a later audit” (dễ lần lại khi audit) nghe như việc kiến trúc sư phải lo. Nhưng đề hỏi mã nào API nhận, không hỏi mã nào tiện. Cả ba phương án sai đều kèm một lý do nghe hay kiểu này."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Biết thêm”: luật ký tự của custom_id, kèm ví dụ mã pass và mã fail", href: NOTES + "#l-4-5" },
      { label: "Bài Nền tảng D4, mục Batch: kết quả không về theo thứ tự, phải ghép theo custom_id", href: NOTES + "#l-4-0" }
    ]
  },
  {
    de: 1, n: 12, total: 50, sub: "3.2", subName: "Slash command và skill",
    first: "A", answer: "A",
    ask: "A developer adds a <code>/lint-report</code> skill and it works in their own Claude Code sessions. A teammate pulls the latest commit and says the skill does not exist. The developer confirms the file was never staged in any commit. What is the most likely cause?",
    scene: [
      "Dev thêm skill <code>/lint-report</code>, chạy tốt trong các phiên Claude Code của chính mình.",
      "Đồng đội pull commit mới nhất về thì báo không có skill đó.",
      "Dữ kiện chốt: dev xác nhận file skill chưa từng được stage (đưa vào danh sách chờ commit) ở commit nào."
    ],
    asks: [
      "Nguyên nhân khả dĩ nhất là gì?",
      "Tức là: file skill nằm ở đâu thì vừa chạy được trên máy dev, vừa không bao giờ lọt vào git?",
      "Phương án đúng phải giải thích được cả hai: chạy được ở máy mình, và “never staged” (chưa từng stage). Phương án nào kèm một điều kiện không có thật thì loại."
    ],
    facts: [
      "Skill có hai chỗ đặt. Bản project: <code>.claude/skills/&lt;tên&gt;/SKILL.md</code>, nằm trong repo, commit lên thì cả team có. Bản cá nhân: <code>~/.claude/skills/</code>, nằm trong thư mục home, chỉ mình bạn dùng, ở mọi project.",
      "Slash command chia y như vậy: <code>.claude/commands/</code> trong repo cho cả team, <code>~/.claude/commands/</code> cho riêng bạn.",
      "Câu để nhớ: trong repo và đã commit = cả team; trong <code>~/.claude/</code> = chỉ bạn. Skill là file trên đĩa, Claude Code đọc thẳng từ các thư mục đó."
    ],
    opts: [
      { k: "A", gist: "The skill was saved at <code>~/.claude/skills/lint-report/SKILL.md</code>, which is outside the repository and never under version control.",
        why: [
          "<code>~/.claude/skills/</code> là chỗ của skill cá nhân, nằm trong thư mục home, ngoài repo (ý 1). Nên skill chạy được trên máy dev.",
          "Git không thấy file ngoài repo nên không thể stage, khớp đúng dữ kiện “never staged”. Đồng đội pull bao nhiêu lần cũng không có.",
          "Muốn cả team dùng thì chuyển sang <code>.claude/skills/lint-report/SKILL.md</code> trong repo rồi commit."
        ] },
      { k: "B", gist: "The skill was saved at <code>.claude/commands/lint-report.md</code>, and sharing commands with teammates needs a separate enterprise license.",
        why: [
          "Bịa tính năng: chia sẻ command không cần license nào. <code>.claude/commands/</code> trong repo đi theo git là cả team có (ý 2).",
          "Nếu file thật nằm ở đây mà đồng đội không thấy thì gốc là chưa commit, không phải license."
        ] },
      { k: "C", gist: "The skill was saved at <code>.claude/skills/lint-report/SKILL.md</code>, but the teammate must restart their machine before new skills show up.",
        why: [
          "Đường dẫn đúng là chỗ đặt skill của project (ý 1), nhưng đổ lỗi sai: không có chuyện phải khởi động lại máy mới thấy skill mới.",
          "File nằm ở đây mà đồng đội không thấy thì gốc là chưa commit. Restart máy không mang được file chưa commit tới máy đồng đội.",
          "Dễ bị cuốn vì đường dẫn trong C đúng là chỗ đặt skill cho team. Nhưng phần lý do (restart máy) là bịa, và một đường dẫn đúng không cứu được lý do sai."
        ] },
      { k: "D", gist: "The skill was saved in the right place, but skills only become available after the project's CI pipeline has passed once.",
        why: [
          "Bịa tính năng: skill là file trên đĩa, Claude Code đọc thẳng khi chạy (ý 3), không có bước nào chờ CI.",
          "File chưa vào commit nào thì CI có pass bao nhiêu lần cũng không mang nó tới máy đồng đội."
        ] }
    ],
    refs: [
      { label: "Bài 3.2: bảng chỗ đặt slash command và skill, bản project và bản cá nhân", href: NOTES + "#l-3-2" },
      { label: "Bài Nền tảng D3, mục 4 “Bản đồ thư mục .claude/”: trong repo = cả team, trong ~/.claude/ = chỉ bạn", href: NOTES + "#l-3-0" },
      { label: "Bài 3.1: cùng kiểu “cá nhân hay project” với CLAUDE.md", href: NOTES + "#l-3-1" }
    ]
  },
  {
    de: 1, n: 13, total: 50, sub: "5.4", subName: "Quản lý context khi khám phá codebase lớn",
    first: "D", answer: "D",
    ask: "An architect is about to launch a new subagent to look into the caching layer, but suspects a similar investigation already happened earlier in the exploration. What should they check first to avoid exploring the same ground twice?",
    scene: [
      "Kiến trúc sư đang khám phá một codebase lớn qua nhiều pha, sắp giao cho một subagent mới đi tìm hiểu caching layer (lớp cache).",
      "Chỗ khó: họ ngờ việc tương tự đã làm ở một pha trước, nhưng không chắc. Chạy lại thì tốn công, còn kiểm thì phải chọn nguồn nào đáng tin."
    ],
    asks: [
      "Nên kiểm tra gì trước, để khỏi khám phá lại chỗ đã khám phá?",
      "Tức là: nguồn nào ghi lại đáng tin những gì phiên này đã điều tra, kể cả khi phiên đã dài?",
      "Tiêu chí: nguồn đó ghi đúng việc “đã điều tra gì”, không mất khi context bị nén, và kiểm được <b>trước</b> khi chạy subagent."
    ],
    facts: [
      "Context degradation (context xuống cấp): phiên khám phá dài làm context đầy output, phát hiện cũ bị đẩy xa hoặc bị nén mất. Model bắt đầu trả lời bằng kiến thức chung.",
      "Scratchpad file: file agent tự ghi findings (điều đã tìm ra) và đọc lại khi cần. File nằm trên đĩa nên không mất khi context bị nén.",
      "Manifest: file (thường là JSON) coordinator giữ, ghi pha hiện tại, pha nào xong, pha nào còn, và chỗ để file state của từng agent."
    ],
    opts: [
      { k: "A", gist: "The repository's git history, looking for commits that touched the caching layer as a sign it was already covered.",
        why: [
          "Sai nguồn: git history ghi ai đã sửa code, không ghi agent đã điều tra gì trong phiên này.",
          "Có commit chạm caching layer không có nghĩa là đã khảo sát nó. Ngược lại, đã khảo sát kỹ mà không sửa dòng nào thì git cũng không có dấu vết."
        ] },
      { k: "B", gist: "The main agent's recollection of the session's findings, asking it to recall any mention of the caching layer.",
        why: [
          "Sai nguồn: trí nhớ của main agent chính là thứ kém tin cậy nhất trong phiên dài (ý 1).",
          "Main agent có thể trả lời “chưa” dù đã điều tra, vì chi tiết đã bị nén mất, hoặc trả lời chung chung kiểu “thường thì…”.",
          "Dễ bị cuốn vì hỏi main agent nghe nhanh và tự nhiên. Nhưng bài 5.4 dạy ghi findings ra file chính vì không tin được trí nhớ này."
        ] },
      { k: "C", gist: "Nothing yet: launch the subagent, then compare its report with the main agent's summary to spot overlap.",
        why: [
          "Chạy xong mới so là đã tốn đúng cái công đề muốn tránh: subagent đã khám phá lại rồi.",
          "Đây là kiểm sau, không phải kiểm trước. Đem so với bản tóm tắt của main agent thì còn dựa vào nguồn kém tin cậy (ý 1)."
        ] },
      { k: "D", gist: "The manifest and scratchpad entries written during earlier phases, looking for notes on the caching layer.",
        why: [
          "Scratchpad và manifest là chỗ các pha trước ghi findings và trạng thái ra đĩa (ý 2, ý 3).",
          "File không mất khi context bị nén, nên đây là nguồn đáng tin nhất để biết caching layer đã được điều tra chưa.",
          "Đọc vài file cũng rẻ hơn nhiều so với chạy lại một subagent."
        ] }
    ],
    refs: [
      { label: "Bài 5.4: định nghĩa context degradation, scratchpad file và manifest", href: NOTES + "#l-5-4" },
      { label: "Bài 5.4, khối “Trong dự án DrillPark”", href: NOTES + "#proj-5-4" }
    ]
  },
  {
    de: 1, n: 14, total: 50, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool",
    first: "B", answer: "B",
    ask: "Before launch, a team reviews an MCP tool's error contract. When the caller leaves out the required <code>customer_id</code> argument, the tool returns <code>isError: true</code> plus custom fields <code>errorCategory: \"validation\"</code> and <code>isRetryable: true</code>. Their reasoning: the agent might supply the ID correctly on a later attempt in the same conversation. What is the main flaw in this retry guidance?",
    scene: [
      "Team rà hợp đồng lỗi (error contract: tool báo lỗi gồm những trường gì) của một MCP tool trước khi ra mắt.",
      "Khi bên gọi quên tham số bắt buộc <code>customer_id</code>, tool trả lỗi như sau. Ví dụ minh họa, đúng các trường đề nêu:<pre><code>{ \"isError\": true,\n  \"errorCategory\": \"validation\",\n  \"isRetryable\": true }</code></pre>",
      "Lý do của team: trong cùng cuộc hội thoại, lần sau agent có thể điền đúng ID."
    ],
    asks: [
      "Chỗ sai chính trong hướng dẫn retry này là gì?",
      "Tức là: với lỗi thiếu <code>customer_id</code>, cờ <code>isRetryable</code> nên đặt thế nào, và lý do “agent có thể sửa lần sau” sai ở đâu.",
      "Để ý chữ “main flaw” (chỗ sai chính): có phương án nêu một điều đúng về dữ kiện nhưng không phải chỗ sai của hướng dẫn retry."
    ],
    facts: [
      "<code>isRetryable</code> trả lời một câu: gửi lại y nguyên request đó thì có thành công không? Có thì <code>true</code> (timeout, 503). Không thì <code>false</code>, kể cả khi agent có thể sửa input rồi gọi lại.",
      "Guide dùng bốn <code>errorCategory</code>: transient (tạm thời, như timeout, 503), validation (input sai, thiếu trường), business (vi phạm luật nghiệp vụ), permission (không có quyền). Chỉ transient là retry được; validation thì agent phải sửa input.",
      "MCP chỉ có cờ <code>isError: true</code> để báo tool thất bại. Guide muốn thêm lỗi có cấu trúc: <code>errorCategory</code>, <code>isRetryable</code> và một câu mô tả dễ hiểu, trả trong nội dung lỗi cho agent đọc.",
      "Input sai là lỗi thực thi: trả trong result với <code>isError: true</code> để model đọc lỗi rồi tự sửa tham số."
    ],
    opts: [
      { k: "A", gist: "<code>isError</code> should be <code>false</code>: the tool can still return something when <code>customer_id</code> is missing, so the call technically succeeded.",
        why: [
          "Sai ở giả định: thiếu tham số bắt buộc thì tool không làm được việc, đó là lỗi thật, phải báo bằng <code>isError: true</code> (ý 4).",
          "Đặt <code>false</code> là giấu lỗi: agent tưởng đã thành công rồi đi tiếp với kết quả rỗng hoặc sai, và không có lý do gì để sửa tham số."
        ] },
      { k: "B", gist: "<code>isRetryable</code> should be <code>false</code>: a missing required argument means the request itself is malformed, so resending it unchanged cannot succeed. The agent must fix the input first, and <code>true</code> wrongly suggests a plain resend will work.",
        why: [
          "Áp phép thử (ý 1): gửi lại y hệt request thì vẫn thiếu <code>customer_id</code>, vẫn lỗi. Vậy <code>isRetryable</code> phải là <code>false</code>.",
          "“Agent có thể sửa rồi gọi lại” là sửa input, không phải thử lại. Đó đúng là cách xử lý lỗi validation (ý 2), và <code>errorCategory: \"validation\"</code> của team đã đúng.",
          "Để <code>true</code> thì agent hiểu là cứ gửi lại y nguyên, nên có thể lặp lại đúng lỗi đó mà không sửa gì."
        ] },
      { k: "C", gist: "The contract uses fields outside the MCP spec. MCP only defines <code>isError</code>; there is no standard <code>errorCategory</code> or <code>isRetryable</code>, so clients may ignore them and miss the recovery guidance.",
        why: [
          "Nửa đầu đúng về dữ kiện: MCP chỉ chuẩn hóa <code>isError</code> (ý 3).",
          "Nhưng guide khuyên dùng chính các trường này, đặt trong nội dung lỗi. Agent là LLM đọc nội dung lỗi, nên trường không cần có trong spec mới có tác dụng. Đây không phải lỗi, càng không phải lỗi chính.",
          "Dễ bị cuốn vì câu “spec không có errorCategory, isRetryable” đúng và nghe rất chuyên môn. Nhưng đề hỏi chỗ sai chính trong hướng dẫn retry, mà C không đụng tới chuyện retry."
        ] },
      { k: "D", gist: "<code>errorCategory</code> should be <code>\"transient\"</code> rather than <code>\"validation\"</code>, because the agent can fix it later, which makes it a temporary condition.",
        why: [
          "Sai ở định nghĩa: transient là lỗi tạm thời phía hệ thống (timeout, 503), chờ rồi gửi lại y hệt là được (ý 2).",
          "Thiếu tham số không tự hết. Đổi sang transient còn khiến agent retry vô ích nhiều hơn, vì nó tưởng chỉ cần chờ."
        ] }
    ],
    dispute: "Đề gốc chấm B, sổ giữ B. Câu này viết theo phép thử của notes: “retry” là gửi lại y nguyên request, nên lỗi validation là <code>false</code>. Cờ <code>isRetryable</code> do team tự đặt, spec MCP chỉ có <code>isError</code>, docs không định nghĩa nó. Đề Udemy (Đề 5 câu 51, Đề 8 câu 17 và 25) hiểu “retry” là gọi lại tool sau khi sửa input, nên ghép validation với <code>true</code>; theo cách hiểu đó thì hướng dẫn của team trong câu này không sai. Gặp câu hỏi thẳng về cờ này cho lỗi validation thì theo phép thử của notes: <code>false</code>.",
    refs: [
      { label: "Bài 2.2, mục “Đã sửa 04/11”: isRetryable không có định nghĩa chính thức; notes và đề Udemy hiểu khác nhau ở lỗi validation", href: NOTES + "#fix-29" },
      { label: "Bài 2.2: bảng errorCategory → isRetryable, và mục “Biết thêm”: phép thử isRetryable", href: NOTES + "#l-2-2" },
      { label: "Cheatsheet D2: dòng “Lỗi này nên đặt isRetryable gì?”", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 1, n: 15, total: 50, sub: "4.5", subName: "Xử lý theo lô (Batch)",
    first: "D", answer: "D",
    ask: "A nightly ingestion job must classify 150,000 scanned invoices in one run using the Message Batches API. Given the platform's per-batch limits, what does the team need to plan for?",
    scene: [
      "Job chạy đêm phải phân loại 150.000 hóa đơn scan trong một lần chạy, dùng Message Batches API.",
      "Chỗ khó: đề hỏi thẳng giới hạn của mỗi batch. Ba phương án sai đều đưa ra một con số hay điều kiện nghe như thật, nên phải nhớ số thật mới loại được."
    ],
    asks: [
      "Xét giới hạn mỗi batch của nền tảng, team cần chuẩn bị gì?",
      "Tức là: 150.000 request có vừa một batch không, và nếu không thì chia ra sao.",
      "Soi từng con số trong phương án với số thật (ý 1, ý 2). Con số bịa thì loại."
    ],
    facts: [
      "Mỗi batch tối đa 100.000 request hoặc 256 MB, chạm giới hạn nào trước thì tính giới hạn đó.",
      "Gửi quá 256 MB thì bị lỗi 413. Batch không tính vào rate limit (giới hạn tốc độ) của Messages API thường.",
      "Batch rẻ hơn 50%, xong trong tối đa 24 giờ, không cam kết thời gian. Hợp với việc không cần kết quả ngay như job đêm."
    ],
    opts: [
      { k: "A", gist: "Split the invoices into batches of exactly 1,000, since that is the most the API accepts per batch for any kind of data.",
        why: [
          "Bịa con số: không có giới hạn 1.000 request mỗi batch. Giới hạn thật là 100.000 request hoặc 256 MB (ý 1).",
          "Chạy được, nhưng phải nộp và theo dõi 150 batch thay vì 2, tốn công quản lý vô ích.",
          "Dễ bị cuốn vì 1.000 nghe như một con số giới hạn quen thuộc. Nhưng đề kiểm đúng số thật, và cả A, B, C đều bịa một con số hoặc điều kiện."
        ] },
      { k: "B", gist: "Send all 150,000 in one batch: the Batches API has no request limit and only caps the size of each response.",
        why: [
          "Bịa điều kiện: batch có trần 100.000 request (ý 1), không phải “no request limit” (không giới hạn số request).",
          "Gửi 150.000 trong một batch sẽ bị từ chối. Payload quá 256 MB thì còn gặp lỗi 413 (ý 2)."
        ] },
      { k: "C", gist: "Use the synchronous Messages API instead, because batches are capped at 500 requests per hour and cannot finish 150,000 overnight.",
        why: [
          "Bịa giới hạn: không có “500 requests per hour” (500 request mỗi giờ). Batch còn không tính vào rate limit của Messages API thường (ý 2).",
          "Đổi sang API đồng bộ thì mất mức giảm 50% (ý 3), cho một job chạy đêm vốn không cần kết quả ngay."
        ] },
      { k: "D", gist: "Split them into at least 2 batch submissions, because one batch holds at most 100,000 requests or 256 MB in total, whichever is reached first; more batches may be needed if the payload passes 256 MB.",
        why: [
          "150.000 ÷ 100.000 = 1,5, nên cần ít nhất 2 batch (ý 1).",
          "Hóa đơn scan (ảnh, PDF) nặng, nên có thể chạm 256 MB trước khi đủ 100.000 request. Khi đó phải chia nhỏ hơn nữa, và D đã tính trước chuyện này."
        ] }
    ],
    refs: [
      { label: "Bài 4.5: giới hạn mỗi batch 100.000 request hoặc 256 MB; mục “Biết thêm”: lỗi 413, Batch không ăn rate limit", href: NOTES + "#l-4-5" },
      { label: "Cheatsheet D4: dòng tổng hợp các con số của Message Batches API", href: NOTES + "#cheat-d4" }
    ]
  },
  {
    de: 1, n: 16, total: 50, sub: "2.1", subName: "Thiết kế tool: description rõ, ranh giới rõ",
    first: "B", answer: "C",
    ask: "An update tool is described only as \"Updates a customer record with given fields.\" The model keeps sending field names the schema does not have, and it is unclear whether it may send just some of the fields. Which gap in the tool's documentation causes this?",
    scene: [
      "Một tool cập nhật chỉ có đúng một dòng description: “Updates a customer record with given fields.” (Cập nhật hồ sơ khách với các trường được đưa vào.)",
      "Triệu chứng 1: model cứ gửi tên trường mà schema không có.",
      "Triệu chứng 2: không rõ có được gửi chỉ một phần các trường hay không."
    ],
    asks: [
      "Lỗ hổng nào trong tài liệu của tool gây ra chuyện này?",
      "Tức là: description thiếu gì mà model phải đoán tên trường, và không biết có được cập nhật một phần hay không.",
      "Phương án đúng phải giải thích được cả hai triệu chứng, và phải chỉ ra chỗ thiếu của tài liệu (“documentation gap”), không phải chuyện khác."
    ],
    facts: [
      "Claude chọn và gọi tool chỉ dựa vào <code>name</code>, <code>description</code>, <code>input_schema</code>. Thứ tự tool trong mảng không phải căn cứ.",
      "Description là cơ chế chính để model hiểu tool. Description tốt trả lời bốn câu: nhận input định dạng gì, ví dụ query nào thì dùng, edge case (ca biên), và ranh giới hành vi.",
      "Bắt một trường thành bắt buộc trong khi model không có thông tin cho nó thì model sẽ bịa giá trị cho đủ (bài 4.3)."
    ],
    opts: [
      { k: "A", gist: "The tool sits after the read-only tools in the list, so the model ranks it lower and fills in fields the schema does not define.",
        why: [
          "Bịa cơ chế: model không “xếp hạng thấp” một tool vì nó đứng sau. Thứ tự trong danh sách không phải thứ model dựa vào (ý 1).",
          "A cũng không giải thích được vì sao model bịa tên trường, hay vì sao không rõ có được cập nhật một phần."
        ] },
      { k: "B", gist: "Optional fields confuse the model, so the description should demand the complete set of fields on every call.",
        why: [
          "Sai chẩn đoán: trường optional không phải vấn đề, thứ thiếu là tài liệu.",
          "Ép gửi đủ mọi trường còn tệ hơn: trường nào model không biết giá trị thì nó bịa cho đủ (ý 3). Với tool cập nhật, giá trị bịa sẽ ghi đè dữ liệu thật của khách.",
          "Dễ bị cuốn vì B nghe như một bài học về schema. Nhưng nó đi ngược bài 4.3, và đề hỏi “documentation gap” (lỗ hổng tài liệu), nên đáp án phải chỉ ra description thiếu gì."
        ] },
      { k: "C", gist: "The description names no valid fields and never says whether a partial set is allowed, so the model guesses inputs the schema then rejects.",
        why: [
          "Description một dòng thiếu đúng hai trong bốn câu guide đòi (ý 2): input nhận gì (trường nào hợp lệ, định dạng ra sao) và ranh giới hành vi (gửi một phần có được không, trường không gửi thì giữ nguyên hay bị xóa).",
          "Không có hướng dẫn thì model đoán, nên bịa ra tên trường. Một chỗ thiếu giải thích được cả hai triệu chứng.",
          "Sửa: liệt kê trường hợp lệ và ghi rõ có hỗ trợ partial update (cập nhật một phần) không."
        ] },
      { k: "D", gist: "The schema uses camelCase while the model prefers snake_case, so it sends field names the schema does not define.",
        why: [
          "Bịa cơ chế: model không có “thói quen snake_case” lấn át schema.",
          "D cũng không giải thích được nửa sau của triệu chứng: không rõ có được cập nhật một phần hay không. Đó là thiếu tài liệu, không phải lệch kiểu đặt tên."
        ] }
    ],
    refs: [
      { label: "Bài 2.1: description tốt trả lời 4 câu (input, ví dụ, edge case, ranh giới)", href: NOTES + "#l-2-1" },
      { label: "Bài Nền tảng D2: Claude chọn tool chỉ dựa vào name, description, input_schema", href: NOTES + "#l-2-0" },
      { label: "Bài 4.3: trường required khiến model bịa giá trị cho đủ", href: NOTES + "#l-4-3" }
    ]
  },
  {
    de: 1, n: 17, total: 50, sub: "5.5", subName: "Review người và hiệu chuẩn confidence",
    first: "D", answer: "A",
    ask: "A team keeps sampling high-confidence extractions for human review, stratified across five document types. Volumes are very uneven: one type is 70% of daily traffic and the other four are about 7.5% each. If samples are drawn strictly in proportion to volume, what risk does that create, and how should the sampling plan handle it?",
    scene: [
      "Team vẫn lấy mẫu các extraction (kết quả trích xuất) high-confidence cho người review, chia tầng theo 5 loại tài liệu.",
      "Khối lượng rất lệch: một loại chiếm 70% lưu lượng mỗi ngày, bốn loại còn lại mỗi loại khoảng 7,5%.",
      "Chỗ khó: lấy mẫu đúng theo tỉ lệ khối lượng thì loại nhỏ gần như không có mẫu. Ví dụ minh họa:<pre><code>Review 100 mẫu/ngày\nLoại lớn (70%)      → 70 mẫu\nMỗi loại nhỏ (7,5%) → khoảng 7 mẫu</code></pre>"
    ],
    asks: [
      "Lấy mẫu đúng theo tỉ lệ khối lượng thì gây rủi ro gì, và kế hoạch lấy mẫu nên xử lý thế nào?",
      "Tức là: chỉ ra đúng rủi ro của <b>cách lấy mẫu</b>, rồi sửa ở chính cách lấy mẫu.",
      "Phương án đúng phải trúng cả hai nửa: rủi ro nêu đúng, và cách sửa nhắm đúng rủi ro đó."
    ],
    facts: [
      "Stratified random sampling (lấy mẫu ngẫu nhiên phân tầng): chia dữ liệu theo tầng như loại tài liệu, rồi lấy mẫu ngẫu nhiên trong từng tầng, để nhóm nhỏ cũng chắc chắn được kiểm tra.",
      "Với phần đã tự động hóa, lấy mẫu định kỳ để đo error rate (tỉ lệ lỗi) thật và bắt pattern lỗi mới khi dữ liệu đầu vào thay đổi.",
      "Số tổng hợp che phân khúc kém: phải đo accuracy theo từng loại tài liệu, không chỉ nhìn một con số chung."
    ],
    opts: [
      { k: "A", gist: "The four small types get too few reviewed extractions to show a rising error rate, so the plan should guarantee a minimum sample count per document type.",
        why: [
          "Rủi ro nêu đúng: theo tỉ lệ thì mỗi loại nhỏ chỉ có khoảng 7 mẫu một ngày. Ví dụ lỗi của một loại nhỏ tăng từ 2% lên 10%, thì 7 mẫu vẫn chưa chắc lộ ra được một lỗi.",
          "Đặt sàn số mẫu tối thiểu cho mỗi loại thì loại nào cũng được theo dõi, loại lớn vẫn đủ mẫu.",
          "Đây đúng là lý do phải phân tầng (ý 1): nhóm nhỏ cũng chắc chắn được kiểm tra."
        ] },
      { k: "B", gist: "The dominant type's results drown out the small types in the overall error rate, so the plan should report accuracy per document type instead of one blended number.",
        why: [
          "Báo cáo accuracy theo từng loại là việc đúng (ý 3). Nhưng nó sửa cách <b>báo cáo</b>, không sửa cách <b>lấy mẫu</b>.",
          "Loại nhỏ vẫn chỉ có khoảng 7 mẫu mỗi ngày. Tách riêng ra thì error rate của nó vẫn quá ít dữ liệu để tin.",
          "Dễ bị cuốn vì B là một thực hành đúng của bài 5.5. Nhưng đề hỏi rủi ro của việc lấy mẫu theo tỉ lệ, còn B trả lời một câu hỏi khác."
        ] },
      { k: "C", gist: "The dominant type eats most of the review budget, so the plan should stop sampling it once its error rate looks stable and give that effort to the small types.",
        why: [
          "Ngừng lấy mẫu loại chiếm 70% lưu lượng là bỏ giám sát phần lớn hệ thống.",
          "Lấy mẫu định kỳ còn để bắt pattern lỗi mới khi đầu vào thay đổi (ý 2). “Trông ổn định hôm nay” không có nghĩa là ổn mãi."
        ] },
      { k: "D", gist: "The dominant type takes up most reviewer time on high-confidence items, so the plan should cap the total daily sample at a fixed size and keep the draw proportional.",
        why: [
          "Rủi ro nêu sai: review mẫu high-confidence chính là mục đích của việc lấy mẫu (ý 2), không phải phí thời gian reviewer.",
          "Cách sửa còn làm tệ hơn: giữ tỉ lệ mà đặt trần tổng số mẫu thì mỗi loại nhỏ càng ít mẫu, đúng chỗ đang thiếu.",
          "Dễ bị cuốn vì giới hạn ngân sách review nghe rất thực tế. Nhưng D vẫn “keep the draw proportional” (giữ lấy mẫu theo tỉ lệ), tức giữ nguyên gốc vấn đề."
        ] }
    ],
    refs: [
      { label: "Bài 5.5: “Vì sao phải stratified” và định nghĩa stratified random sampling", href: NOTES + "#l-5-5" },
      { label: "Bài Nền tảng D5, mục 4: hiệu chuẩn confidence", href: NOTES + "#l-5-0" }
    ]
  },
  {
    de: 1, n: 18, total: 50, sub: "2.3", subName: "Phân tool cho agent và cấu hình tool_choice",
    first: "C", answer: "D",
    ask: "A pipeline has three agents: intake, processing, and delivery. Now and then the intake agent needs to look up processing status, which is normally a processing-agent job. Under the principle of scoped tool access with a few limited cross-role tools, what should the architect do?",
    scene: [
      "Pipeline có ba agent: intake (tiếp nhận), processing (xử lý), delivery (giao kết quả).",
      "Thỉnh thoảng intake cần tra trạng thái xử lý, vốn là việc của processing agent.",
      "Đề cho sẵn nguyên tắc: scoped tool access (mỗi agent chỉ có tool đúng vai trò), kèm một vài tool liên vai trò có giới hạn."
    ],
    asks: [
      "Kiến trúc sư nên làm gì?",
      "Tức là: cho intake tra được trạng thái, mà không phá nguyên tắc chỉ cấp đúng tool cần dùng.",
      "Soi hai điều: nhu cầu của intake có được đáp ứng không, và intake có bị cấp thừa quyền không."
    ],
    facts: [
      "Scoped tool access, còn gọi là least privilege: mỗi agent chỉ được cấp tool đúng vai trò, cấp ít quyền nhất đủ để làm việc.",
      "Agent có tool ngoài vai trò thì sẽ dùng, thường là dùng sai. Nhiều tool cũng làm chọn sai nhiều hơn: guide so 18 tool với 4–5 tool.",
      "Ngoại lệ đúng: nhu cầu ngoài vai trò mà lặp lại thì cấp một tool hẹp (chỉ làm đúng một việc nhỏ), như <code>verify_fact</code> cho synthesis agent. Phần việc sâu vẫn ở agent chuyên trách.",
      "Prompt là hướng dẫn, model làm theo có xác suất. Muốn chắc chắn thì chặn bằng code, ở đây là không cấp tool."
    ],
    opts: [
      { k: "A", gist: "Add a second <code>check_status</code> tool to the processing agent so status lookups stay in that role, and leave the intake agent with only its own tools.",
        why: [
          "Thêm tool nhầm chỗ: nhu cầu nằm ở intake, mà tool lại cấp cho processing agent.",
          "Intake vẫn không tự tra được trạng thái. Ranh giới vai trò được giữ cứng nhắc, còn việc cần làm thì chưa giải quyết."
        ] },
      { k: "B", gist: "Drop status checking from the intake workflow and redesign the pipeline so intake never needs processing state.",
        why: [
          "Quá tay: bỏ một nhu cầu có thật rồi thiết kế lại cả pipeline.",
          "Nguyên tắc trong đề đã cho phép vài tool liên vai trò có giới hạn (ý 3), nên không cần xóa nhu cầu đi."
        ] },
      { k: "C", gist: "Hand the intake agent the processing agent's whole tool set, with a strict system prompt telling it to only check status.",
        why: [
          "Cấp quá quyền: intake nhận cả bộ tool của processing, trái least privilege (ý 1). Có tool thì nó sẽ dùng, và dùng sai (ý 2).",
          "Thêm cả bộ tool còn làm tăng số lựa chọn mỗi lượt, nên chọn sai nhiều hơn (ý 2).",
          "Dễ bị cuốn vì “strict system prompt” (system prompt chặt) nghe như đã có kiểm soát. Nhưng prompt chỉ là hướng dẫn (ý 4): tool đã cấp thì model gọi được. Muốn chặn chắc thì đừng cấp tool."
        ] },
      { k: "D", gist: "Give the intake agent one narrow <code>check_status</code> tool for that occasional need, and keep the deeper processing operations only in the processing agent's tool set.",
        why: [
          "Đúng mẫu <code>verify_fact</code> của bài 2.3 (ý 3): cần một việc ngoài vai trò thì cấp đúng một tool hẹp cho việc đó.",
          "Intake tra được trạng thái, còn các thao tác xử lý sâu vẫn chỉ nằm ở processing agent. Nhu cầu được đáp ứng mà vẫn giữ least privilege (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 2.3: scoped tool access và ngoại lệ tool hẹp verify_fact", href: NOTES + "#l-2-3" },
      { label: "Cheatsheet D2: dòng “Synthesis agent cần fact-check vặt”", href: NOTES + "#cheat-d2" },
      { label: "Bài 1.4: prompt là hướng dẫn, muốn chắc chắn thì chặn bằng code", href: NOTES + "#l-1-4" }
    ]
  },
  {
    de: 1, n: 19, total: 50, sub: "4.1", subName: "Prompt có tiêu chí rõ để giảm false positive",
    first: "C", answer: "C",
    ask: "A team added \"only report issues you are confident about\" to a noisy review category, and precision did not improve. The architect now wants to redefine what the category covers instead of tweaking the confidence wording again. Which redesign takes the right lesson from that failed attempt?",
    scene: [
      "Một category (loại vấn đề) của bot review đang báo nhiễu, nhiều false positive (báo nhầm).",
      "Team đã thêm câu “only report issues you are confident about” (chỉ báo vấn đề nào chắc chắn). Precision (trong các finding đã báo, bao nhiêu phần trăm là đúng) không tăng.",
      "Giờ kiến trúc sư muốn định nghĩa lại category gồm những gì, thay vì sửa câu chữ về độ chắc chắn thêm lần nữa."
    ],
    asks: [
      "Cách thiết kế lại nào rút đúng bài học từ lần thất bại trước?",
      "Tức là: lần trước hỏng vì đâu, và cách mới có bỏ được đúng cái gốc đó không.",
      "Phương án nào còn giữ bộ lọc “chắc chắn” dưới một hình thức khác là chưa học được gì."
    ],
    facts: [
      "Câu kiểu “chỉ báo khi chắc chắn” bắt Claude tự chấm độ chắc của mình. Con số tự chấm đó lệch xa độ đúng thật, nên làm bộ lọc chính thì không đáng tin.",
      "Những từ như “conservative”, “confident” không có định nghĩa. Claude không biết với team này cái gì đáng báo, nên số finding gần như không đổi.",
      "Cách sửa guide gọi là explicit categorical criteria (tiêu chí theo loại): liệt kê loại phải báo và loại phải bỏ qua. Claude làm tốt việc xếp một chỗ vào loại có sẵn, làm kém việc đoán một ngưỡng mơ hồ."
    ],
    opts: [
      { k: "A", gist: "Move the confidence line from the system prompt into the user message so the model gives it more weight when choosing what to report.",
        why: [
          "Đổi chỗ đặt câu không đổi nội dung câu. “Chắc chắn” vẫn không có định nghĩa (ý 2).",
          "Câu nằm ở system hay user thì model vẫn không có gì để đối chiếu, nên precision vẫn đứng yên."
        ] },
      { k: "B", gist: "Keep the confidence line and add a numeric threshold, say 80 percent, so each finding is checked against a concrete number before it is reported.",
        why: [
          "Con số 80% trông cụ thể, nhưng thứ được đem so vẫn là confidence do model tự chấm (ý 1).",
          "Con số tự chấm đó lệch xa độ đúng thật, nên thêm ngưỡng chỉ làm cái thước sai trông chính xác hơn.",
          "Dễ bị cuốn vì có con số thì nghe như đã đo được. Nhưng B vẫn giữ nguyên bộ lọc confidence, đúng cái vừa thất bại."
        ] },
      { k: "C", gist: "Spell out which issue types belong to the category and which neighbouring types to skip, so the model decides by matching each finding against that list.",
        why: [
          "Đúng explicit categorical criteria (ý 3): liệt kê loại vấn đề thuộc category và loại gần giống phải bỏ qua.",
          "Lần trước hỏng vì câu lệnh không định nghĩa “cái gì đáng báo” (ý 2). Có danh sách thì model chỉ việc xếp từng finding vào loại có sẵn.",
          "C bỏ hẳn bộ lọc confidence, đúng với ý “redefine what the category covers” (định nghĩa lại category gồm những gì) mà đề nói."
        ] },
      { k: "D", gist: "Repeat the confidence instruction more forcefully, for example with key words in capitals, so the model treats it as a hard limit.",
        why: [
          "Nói to hơn một câu mơ hồ thì nó vẫn mơ hồ (ý 2). Model vẫn không biết “chắc chắn” là gì với team này.",
          "Viết hoa, nhấn mạnh còn có thể khiến model làm quá tay ở chỗ khác."
        ] }
    ],
    refs: [
      { label: "Bài 4.1: vì sao “be conservative” không sửa được và mẫu REPORT / SKIP", href: NOTES + "#l-4-1" },
      { label: "Cheatsheet D4: dòng “False positive cao, đã thêm be conservative không đỡ”", href: NOTES + "#cheat-d4" }
    ]
  },
  {
    de: 1, n: 20, total: 50, sub: "1.5", subName: "Hook của Agent SDK: chặn tool call và chuẩn hóa dữ liệu",
    first: "D", answer: "D",
    ask: "Two PostToolUse hooks are registered on the same <code>query_database</code> tool. One cuts long result sets down to a fixed number of rows; the other rewrites embedded timestamps as ISO 8601. The model should end up seeing a result that is both trimmed and normalized. What should the architect check about how the two hooks combine?",
    scene: [
      "Hai hook PostToolUse cùng gắn vào tool <code>query_database</code>. Hook 1 cắt bảng kết quả dài xuống một số dòng cố định. Hook 2 đổi mọi timestamp trong kết quả sang ISO 8601.",
      "Yêu cầu: model phải thấy kết quả vừa được cắt, vừa được chuẩn hóa.",
      "Chỗ khó: mỗi hook tự trả về một bản kết quả mới. Ví dụ minh họa chỗ có thể hỏng:<pre><code>Kết quả gốc:                5.000 dòng, timestamp dạng số\nHook 1 trả về:              50 dòng, timestamp dạng số\nHook 2 nhận bản gốc, trả về: 5.000 dòng, ISO 8601\n→ model chỉ thấy một trong hai bản</code></pre>"
    ],
    asks: [
      "Kiến trúc sư cần kiểm tra gì về cách hai hook kết hợp?",
      "Tức là: hai lần sửa có cộng dồn được không, nghĩa là hook 2 có làm việc trên bản hook 1 đã sửa hay trên bản gốc.",
      "Soi từng phương án: thứ nó bảo kiểm có thật sự quyết định dữ liệu đi từ hook này sang hook kia không."
    ],
    facts: [
      "PostToolUse chạy sau khi tool trả kết quả, trước khi kết quả được nối vào <code>messages</code> cho Claude đọc. Dùng để sửa hoặc chuẩn hóa kết quả.",
      "<code>updatedToolOutput</code> thay hẳn kết quả tool, không cộng thêm. <code>additionalContext</code> mới là chỉ nối thêm ghi chú.",
      "Nhiều hook trên cùng một sự kiện chạy song song, không theo thứ tự cố định. Đừng viết hook này phụ thuộc kết quả hook kia.",
      "<code>tool_use_id</code> là mã của một lần Claude xin gọi tool, dùng để ghép <code>tool_result</code> với đúng lời xin đó."
    ],
    opts: [
      { k: "A", gist: "Whether the callbacks are named so the truncation hook sorts alphabetically first, since that decides whether the SDK passes the first result into the second hook or runs each on the original response.",
        why: [
          "Bịa cơ chế: tên callback không quyết định dữ liệu đi giữa các hook. Không có chuyện SDK xếp hook theo bảng chữ cái rồi nối kết quả.",
          "Hook trên cùng sự kiện còn không chạy theo thứ tự cố định (ý 3), nên đặt tên kiểu gì cũng không biến hai hook thành một chuỗi."
        ] },
      { k: "B", gist: "Whether both hooks share the same HookMatcher timeout, since that decides whether the SDK keeps a slower hook's changes or drops them after the faster one returns.",
        why: [
          "Gán sai vai trò: timeout chỉ là thời gian tối đa một hook được chạy trước khi bị hủy.",
          "Nó không quyết định kết quả của hai hook có cộng dồn hay không. Hai hook cùng timeout vẫn có thể ghi đè nhau (ý 2)."
        ] },
      { k: "C", gist: "Whether both hooks get the same <code>tool_use_id</code>, since that decides whether the second hook treats the first hook's edit as part of the same response or ignores it.",
        why: [
          "Gán sai vai trò: hai hook chạy cho cùng một lần gọi tool thì đương nhiên nhận cùng <code>tool_use_id</code> (ý 4).",
          "ID này chỉ cho biết đây là lần gọi nào. Nó không quyết định hook sau có thấy bản hook trước đã sửa hay không.",
          "Dễ bị cuốn vì <code>tool_use_id</code> đúng là thứ nối các mảnh của một lần gọi tool. Nhưng A, B, C đều lấy một thuộc tính có thật (tên callback, timeout, ID) rồi gán cho nó một vai trò nó không có."
        ] },
      { k: "D", gist: "Whether the second PostToolUse hook receives the first hook's <code>updatedToolOutput</code> as input rather than the original response, since that decides whether the model sees both edits or just one.",
        why: [
          "<code>updatedToolOutput</code> thay hẳn kết quả tool (ý 2). Nếu hook 2 nhận bản gốc, nó trả về bản đã chuẩn hóa nhưng chưa cắt, ghi đè lên việc cắt. Model chỉ thấy một trong hai thay đổi.",
          "Hook cùng sự kiện không bảo đảm chạy nối nhau (ý 3), nên đây đúng là chỗ phải kiểm: dữ liệu có đi từ hook 1 sang hook 2 không.",
          "Kiểm ra là không nối thì đừng để hook này phụ thuộc hook kia, ví dụ gộp việc cắt và chuẩn hóa vào một hook."
        ] }
    ],
    refs: [
      { label: "Bài 1.5, mục “Biết thêm”: updatedToolOutput thay hẳn kết quả, additionalContext chỉ nối thêm", href: NOTES + "#l-1-5" },
      { label: "Bài 1.4, mục “Biết thêm”: nhiều hook trên cùng một sự kiện chạy song song, đừng để hook này phụ thuộc hook kia", href: NOTES + "#l-1-4" },
      { label: "Cheatsheet D1: dòng Hook (PreToolUse, PostToolUse, updatedToolOutput)", href: NOTES + "#cheat-d1" }
    ]
  },
  {
    de: 1, n: 21, total: 50, sub: "4.5", subName: "Xử lý theo lô (Batch)",
    first: "A", answer: "B",
    ask: "Every week a compliance team checks all 15,000 vendor contracts and has to publish a findings report two business days after the run starts. Because each cycle covers the full catalog, cost per document is a real concern. How should this recurring job be set up?",
    scene: [
      "Mỗi tuần team compliance (tuân thủ) rà lại toàn bộ 15.000 hợp đồng nhà cung cấp.",
      "Báo cáo phải ra trong 2 ngày làm việc kể từ lúc bắt đầu chạy. Không ai ngồi chờ từng kết quả.",
      "Chỗ khó: tuần nào cũng chạy lại cả kho, nên chi phí mỗi tài liệu là chuyện thật. Đề nhấn mạnh đúng điểm này."
    ],
    asks: [
      "Job định kỳ này nên dựng thế nào?",
      "Tức là: chọn cách rẻ nhất cho mỗi tài liệu mà vẫn chắc chắn xong trước hạn 2 ngày làm việc.",
      "Soi từng phương án hai điều: thời gian xấu nhất có lọt hạn không, và có lấy được mức giảm giá của Batch không."
    ],
    facts: [
      "Message Batches API rẻ hơn 50% so với gọi Messages API thường (đồng bộ). Mức giảm áp cho mọi usage và cộng dồn được với prompt caching.",
      "Đổi lại, một batch có thể mất tới 24 giờ và không có cam kết thời gian (SLA). Đa số xong trong một giờ, nhưng “đa số” không phải cam kết.",
      "Một batch chứa tối đa 100.000 request hoặc 256 MB. Request và kết quả ghép nhau bằng <code>custom_id</code>.",
      "Batch hợp với việc không ai đang ngồi chờ (báo cáo chạy đêm). Việc có người chờ (pre-merge check) thì giữ gọi đồng bộ."
    ],
    opts: [
      { k: "A", gist: "Split the contracts into Message Batches of 1,000 requests and submit them one after another, starting each batch only after the previous one has ended, then build the report.",
        why: [
          "Sai ở chỗ nối đuôi: mỗi batch có thể mất tới 24 giờ (ý 2). Chờ batch trước xong mới gửi batch sau thì xấu nhất là 15 × 24 giờ, tức 15 ngày, vượt xa hạn 2 ngày làm việc.",
          "Mà cũng chẳng cần chia: 15.000 request nằm gọn trong giới hạn 100.000 của một batch (ý 3). Nếu buộc phải chia (ví dụ vượt 256 MB) thì gửi các batch <b>cùng lúc</b>, không gửi lần lượt.",
          "Dễ bị cuốn vì chia nhỏ trông cẩn thận, lại vẫn dùng Batch nên vẫn rẻ. Nhưng chia nhỏ không sai, nối đuôi mới sai: nó biến 24 giờ thành 15 × 24 giờ."
        ] },
      { k: "B", gist: "Put all 15,000 contracts into a single Message Batch when the run starts, collect the results once it has ended, and build the report from them.",
        why: [
          "Một batch duy nhất là đủ: 15.000 request dưới giới hạn 100.000 (ý 3).",
          "Xấu nhất batch mất 24 giờ (ý 2), vẫn ngắn hơn hạn 2 ngày làm việc. Không ai ngồi chờ từng kết quả nên chậm cũng không sao (ý 4).",
          "Mọi request đều được giảm 50% (ý 1), đúng điều đề nhấn mạnh là chi phí mỗi tài liệu."
        ] },
      { k: "C", gist: "Call the synchronous Messages API from a pool of parallel workers, gather the responses as they come back, and build the report.",
        why: [
          "Nhiều worker gọi đồng bộ song song thì nhanh, nhưng trả giá đầy đủ cho cả 15.000 request, mất mức giảm 50% (ý 1).",
          "Lại phải tự lo rate limit và retry. Đề không cần kết quả ngay (ý 4), nên đây là trả tiền cho tốc độ không ai dùng."
        ] },
      { k: "D", gist: "Call the synchronous Messages API once per contract with the review rubric cached, then build the report from the responses.",
        why: [
          "Prompt caching chỉ giảm giá phần rubric lặp lại ở đầu prompt. Nội dung từng hợp đồng và output vẫn tính giá đầy đủ.",
          "Batch giảm 50% cho <b>mọi</b> usage và còn cộng dồn được với caching (ý 1). Nên caching không thay được batch, nó chỉ cộng thêm vào batch."
        ] }
    ],
    refs: [
      { label: "Bài 4.5: Batch rẻ 50%, tối đa 24 giờ, giới hạn 100.000 request / 256 MB, cộng dồn với prompt caching", href: NOTES + "#l-4-5" },
      { label: "Cheatsheet D4: các dòng về Batch (pre-merge vs báo cáo đêm, nhịp submit)", href: NOTES + "#cheat-d4" }
    ]
  },
  {
    de: 1, n: 22, total: 50, sub: "3.5", subName: "Tinh chỉnh lặp: ví dụ input/output, test trước, interview",
    first: "D", answer: "D",
    ask: "A team lead asks Claude Code to build a CSV-to-JSON converter. The rules for mapping columns to fields are hard to put precisely into words, because the exact behavior for empty cells, commas inside quotes and repeated header names matters. What is the best way to set up an iteration loop before any code is written?",
    scene: [
      "Trưởng nhóm nhờ Claude Code viết bộ chuyển CSV sang JSON.",
      "Chỗ khó: quy tắc ghép cột vào field khó nói chính xác bằng lời. Các ca ô trống, dấu phẩy nằm trong ngoặc kép, header (tên cột) bị trùng đều phải xử lý đúng từng chi tiết.",
      "Ví dụ minh họa một dòng khó:<pre><code>id,name,city,note\n7,Lan,\"Hue, VN\",</code></pre>Dấu phẩy trong <code>\"Hue, VN\"</code> không phải dấu ngăn cột, còn cột <code>note</code> thì trống. Tả bằng lời hai chỗ này phải ra JSON thế nào rất dễ lệch."
    ],
    asks: [
      "Trước khi viết code, nên dựng vòng lặp tinh chỉnh thế nào cho tốt nhất?",
      "Tức là: đưa Claude thứ gì để nó hiểu đúng một quy tắc khó nói bằng lời, và để mỗi vòng sửa có cái cố định mà so.",
      "Soi từng phương án: quy tắc do ai quyết (team, thư viện, hay Claude tự đoán), và có mục tiêu cố định để kiểm không."
    ],
    facts: [
      "Mô tả bằng văn xuôi có nhiều cách hiểu, viết càng dài càng nhiều cách hiểu. Bài 3.5 xếp triệu chứng “bị hiểu mỗi lần một kiểu” vào kỹ thuật ví dụ input → output.",
      "Ví dụ input/output là cặp “dữ liệu vào → kết quả mong muốn”: cho Claude <i>thấy</i> phép biến đổi thay vì tả nó. Cho 2–3 cặp cụ thể.",
      "Test-driven iteration là viết test trước, “xong” nghĩa là test xanh. Test chỉ có giá trị khi kết quả mong đợi (expected) do người nắm quy tắc đặt ra.",
      "Edge case (trường hợp biên) như ô trống, giá trị null là chỗ code hay hỏng nhất. Cách xử lý là đưa đúng dòng dữ liệu đó kèm kết quả mong đợi, không mô tả chung chung."
    ],
    opts: [
      { k: "A", gist: "Tell Claude to build on a popular CSV parsing library and keep that library's default behavior for empty cells and quoted commas, then review the result.",
        why: [
          "Giao quyết định cho mặc định của thư viện. Mặc định đó chưa chắc khớp quy tắc của team: ô trống thành <code>null</code>, <code>\"\"</code> hay bỏ field?",
          "Header trùng thì vẫn chưa ai nói phải xử lý thế nào. Không có cặp mẫu nào làm mục tiêu cố định (ý 2), nên “review kết quả” chỉ là nhìn rồi đoán."
        ] },
      { k: "B", gist: "Write a detailed prose spec of how empty cells, quoted commas and repeated headers map to JSON fields, give it to Claude, and reword the spec after reviewing the output.",
        why: [
          "Đề đã nói rõ quy tắc này <b>khó diễn đạt bằng lời</b>. Văn xuôi dài hơn chỉ thêm cách hiểu (ý 1).",
          "Mỗi vòng lại phải đoán nên sửa câu chữ nào, và Claude lần nào cũng có thể hiểu khác. Đây đúng cột “Tệ” của bài 3.5: viết lại mô tả, dài gấp đôi."
        ] },
      { k: "C", gist: "Have Claude write the converter and its own unit tests, working out the expected output for each tricky case from the prompt, and loop until the tests pass.",
        why: [
          "Nghe giống test trước, nhưng expected lại do Claude tự suy từ chính cái prompt mơ hồ (ý 3).",
          "Code và test cùng hiểu sai một kiểu thì test vẫn xanh. Vòng “sửa tới khi xanh” không chứng minh được gì về quy tắc của team.",
          "Dễ bị cuốn vì test-driven iteration cũng là kỹ thuật của bài 3.5, lại có chữ “test” nghe chắc chắn. Nhưng expected ở đây không đến từ người nắm quy tắc, nên test chỉ kiểm Claude có đồng ý với chính nó không."
        ] },
      { k: "D", gist: "Write a few sample input rows with the exact JSON each must produce, including one row with an empty cell and one with a quoted comma, and give them to Claude before it writes the converter.",
        why: [
          "Cặp “dòng CSV → JSON chính xác” cho Claude thấy quy tắc thay vì đọc mô tả (ý 2), đúng thuốc cho triệu chứng “khó nói bằng lời” (ý 1).",
          "Có cả dòng ô trống và dòng dấu phẩy trong ngoặc kép, tức là phủ đúng các edge case đề lo (ý 4).",
          "Các cặp này còn là mục tiêu cố định: Claude viết code theo nó, và mỗi vòng sửa đều so lại được với nó."
        ] }
    ],
    refs: [
      { label: "Bài 3.5: bảng chọn kỹ thuật (ví dụ I/O, test trước, interview)", href: NOTES + "#l-3-5" },
      { label: "Cheatsheet D3: dòng “Mô tả bằng lời bị hiểu lệch → 2–3 ví dụ input/output”", href: NOTES + "#cheat-d3" }
    ]
  },
  {
    de: 1, n: 23, total: 50, sub: "5.1", subName: "Giữ thông tin quan trọng trong context dài",
    first: "B", answer: "B",
    ask: "Three market-research subagents each return a total-addressable-market figure for the same industry, but none says when its source was published or how the figure was estimated. The synthesis step cannot tell whether the numbers are comparable or which is newest, and the final report quotes an outdated one. Which output requirement on the subagents would have prevented this?",
    scene: [
      "Ba subagent nghiên cứu thị trường, mỗi con trả một con số TAM (total addressable market: tổng quy mô thị trường) cho cùng một ngành.",
      "Không con số nào ghi nguồn xuất bản năm nào, hay ước tính bằng cách nào.",
      "Hậu quả: bước synthesis (tổng hợp) không biết ba số có so được với nhau không, số nào mới nhất, và báo cáo cuối trích nhầm một số cũ."
    ],
    asks: [
      "Bắt subagent trả thêm gì thì đã tránh được chuyện này?",
      "Tức là: synthesis đang thiếu đúng hai thông tin: số nào mới nhất, và ba số có cùng cách tính để so không. Phương án đúng phải lấp cả hai."
    ],
    facts: [
      "Trong hệ nhiều agent, guide bắt subagent kèm metadata (ngày, vị trí nguồn, phương pháp) trong output có cấu trúc.",
      "Hai số “mâu thuẫn” rất hay chỉ là hai năm khác nhau. Không có ngày xuất bản hay ngày thu thập dữ liệu, synthesis sẽ nhầm chênh lệch thời gian thành mâu thuẫn, hoặc ngược lại.",
      "Agent phía sau có ngân sách context hẹp thì agent phía trước nên trả dữ liệu có cấu trúc (key facts, citation), không trả cả bài văn kèm chuỗi suy luận."
    ],
    opts: [
      { k: "A", gist: "Each subagent returns the publisher's name and a credibility rating for the source along with its figure.",
        why: [
          "Biết <i>ai</i> xuất bản và có uy tín không, nhưng vẫn không biết <i>khi nào</i> và <i>ước tính thế nào</i>, đúng hai thứ synthesis đang thiếu (ý 1).",
          "Hai nguồn đều uy tín mà khác năm thì synthesis vẫn trích nhầm số cũ (ý 2). Điểm uy tín lại do chính subagent tự chấm.",
          "Dễ bị cuốn vì cả bốn phương án đều “kèm thêm gì đó cạnh con số”, và tên nguồn kèm độ uy tín nghe rất giống ghi nguồn gốc. Nhưng đề nêu rõ hai điều synthesis không biết: so được không, cái nào mới nhất. Tên nguồn không trả lời điều nào."
        ] },
      { k: "B", gist: "Each subagent returns the year its source was published and the estimation method along with its figure.",
        why: [
          "Năm xuất bản cho biết số nào mới nhất, nên synthesis không trích nhầm số cũ (ý 2).",
          "Phương pháp ước tính cho biết ba con số có cùng cách tính, có so với nhau được không.",
          "Đây đúng là metadata guide bắt subagent kèm trong output có cấu trúc (ý 1)."
        ] },
      { k: "C", gist: "Each subagent returns a confidence score based on how many sources agree with its figure.",
        why: [
          "Nhiều nguồn đồng ý không có nghĩa là số đó mới. Ba trang cùng chép lại một báo cáo cũ thì vẫn “đồng ý” với nhau (ý 2).",
          "Điểm này cũng không nói gì về phương pháp, nên câu “ba số có so được không” vẫn bỏ ngỏ."
        ] },
      { k: "D", gist: "Each subagent returns the search queries it ran and the results it looked at along with its figure.",
        why: [
          "Đây là nhật ký quá trình tìm kiếm, không phải thông tin về nguồn. Ngày và phương pháp chưa chắc có trong đó.",
          "Nó còn làm phình context của bước synthesis, trái lời dặn trả dữ liệu có cấu trúc thay vì cả chuỗi làm việc (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 5.1, mục “Bộ kỹ thuật đi kèm”: subagent kèm metadata (ngày, nguồn, phương pháp) trong output có cấu trúc", href: NOTES + "#l-5-1" },
      { label: "Bài 5.6: bắt buộc ngày xuất bản để không nhầm khác năm thành mâu thuẫn", href: NOTES + "#l-5-6" },
      { label: "Cheatsheet D5: dòng “Hai thống kê bị coi là mâu thuẫn nhưng khác năm”", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 1, n: 24, total: 50, sub: "1.4", subName: "Workflow nhiều bước có cổng chặn và bàn giao",
    first: "D", answer: "D",
    ask: "A support agent has two tools, <code>get_customer</code> and <code>process_refund</code>. Its system prompt says: “Always call get_customer and confirm the identity before calling process_refund.” In testing, the agent sometimes calls <code>process_refund</code> first when the ticket reads like an urgent complaint. The architect needs the order to hold every single time, not just usually. What should they build?",
    scene: [
      "Agent hỗ trợ khách có hai tool: <code>get_customer</code> (tra khách) và <code>process_refund</code> (hoàn tiền).",
      "System prompt đã dặn: luôn gọi <code>get_customer</code> và xác minh danh tính trước khi gọi <code>process_refund</code>.",
      "Chỗ khó: khi test, gặp ticket viết kiểu khiếu nại khẩn cấp, agent thỉnh thoảng gọi <code>process_refund</code> trước. Kiến trúc sư cần thứ tự đó giữ “every single time” (mọi lần), không phải “usually” (thường thì đúng)."
    ],
    asks: [
      "Nên dựng cái gì?",
      "Tức là: cần cơ chế bảo đảm không bao giờ hoàn tiền khi chưa xác minh, model quyết gì cũng vậy.",
      "Soi từng phương án: nó là prompt (xác suất) hay code (chắc chắn)? Nếu là code, nó có chạy đúng lúc và gắn đúng tool cần chặn không?"
    ],
    facts: [
      "Ghi policy vào prompt (system prompt, ví dụ mẫu few-shot, chữ in hoa) là prompt-based guidance: tỉ lệ sai giảm được nhưng không bao giờ về 0. Muốn bảo đảm thì phải programmatic enforcement, tức ghi policy vào code.",
      "Prerequisite gate (cổng điều kiện trước): khóa tool B cho đến khi tool A đã chạy thành công. Ví dụ: khóa <code>process_refund</code> cho đến khi <code>get_customer</code> trả về khách đã xác minh.",
      "Hook <code>PreToolUse</code> chạy trước khi tool thực thi, quyết định cho qua hay từ chối kèm lý do. Hook <code>PostToolUse</code> chạy sau khi tool đã chạy xong, dùng để sửa hoặc chuẩn hóa kết quả.",
      "Temperature chỉnh độ ngẫu nhiên của chữ. Temperature 0 làm output ít ngẫu nhiên hơn, không biến chỉ dẫn thành luật."
    ],
    opts: [
      { k: "A", gist: "A PostToolUse hook on <code>get_customer</code> that adds a reminder to the context to confirm identity before <code>process_refund</code> is called.",
        why: [
          "Hook này là <code>PostToolUse</code> gắn vào <code>get_customer</code>, nên chỉ chạy <b>sau khi</b> <code>get_customer</code> đã được gọi (ý 3). Lỗi lại xảy ra đúng lúc agent bỏ qua <code>get_customer</code>, nên hook không bao giờ chạy.",
          "Kể cả khi chạy, nó chỉ thêm một câu nhắc vào context, tức vẫn là prompt (ý 1).",
          "Dễ bị cuốn vì có chữ “hook”, trông như chặn bằng code, và notes cũng dùng <code>PostToolUse</code> của <code>get_customer</code> để <i>ghi lại</i> mã khách đã xác minh. Nhưng việc chặn phải nằm ở <code>PreToolUse</code> của <code>process_refund</code>, tool cần khóa, chứ không ở tool bị bỏ qua."
        ] },
      { k: "B", gist: "Few-shot examples in the system prompt showing urgent complaint tickets where <code>get_customer</code> runs and identity is confirmed before <code>process_refund</code>.",
        why: [
          "Ví dụ mẫu giúp tỉ lệ sai giảm, nhưng vẫn là prompt nên không về 0 (ý 1).",
          "Đề đòi “every single time” (mọi lần), nên “sai ít hơn” vẫn chưa đạt."
        ] },
      { k: "C", gist: "Set temperature to 0 and move the ordering rule to the first line of the system prompt, before the tool descriptions.",
        why: [
          "Temperature 0 chỉ làm output ít ngẫu nhiên hơn với <i>cùng</i> một input, không biến prompt thành luật (ý 4). Ticket viết kiểu khẩn cấp là input khác, model vẫn có thể chọn sai.",
          "Đưa quy tắc lên dòng đầu cũng chỉ là đổi chỗ câu chữ, vẫn là prompt (ý 1)."
        ] },
      { k: "D", gist: "A PreToolUse hook on <code>process_refund</code> that looks in session state for a verified customer ID and returns <code>permissionDecision: \"deny\"</code> if there isn't one.",
        why: [
          "Hook chạy <b>trước</b> khi <code>process_refund</code> thực thi (ý 3). Code tìm mã khách đã xác minh trong session state (trạng thái phiên), không có thì trả <code>deny</code>.",
          "Model quyết gì, ticket viết kiểu gì thì refund cũng không chạy được khi chưa xác minh. Đây đúng là prerequisite gate (ý 2), bảo đảm bằng code chứ không bằng xác suất (ý 1).",
          "Claude nhận lý do từ chối, tự gọi <code>get_customer</code> rồi mới đi tiếp."
        ] }
    ],
    refs: [
      { label: "Bài 1.4: prompt-based guidance và programmatic enforcement, prerequisite gate", href: NOTES + "#l-1-4" },
      { label: "Bài 1.5: PreToolUse chạy trước tool và trả về allow / ask / deny, PostToolUse chạy sau", href: NOTES + "#l-1-5" },
      { label: "Cheatsheet D1: dòng hook và prerequisite gate", href: NOTES + "#cheat-d1" }
    ]
  },
  {
    de: 1, n: 25, total: 50, sub: "5.5", subName: "Review người và hiệu chuẩn confidence",
    first: "D", answer: "D",
    ask: "An onboarding pipeline pulls identity fields out of submitted documents, and a calibrated confidence threshold decides which extractions skip human review. The company then switches to a new document scanner whose images are slightly lower resolution than before. From a review-workflow design standpoint, what is the right response to this change?",
    scene: [
      "Pipeline onboarding (nhận khách mới) trích các trường danh tính từ giấy tờ khách nộp.",
      "Một ngưỡng confidence đã hiệu chuẩn quyết định extraction nào được bỏ qua bước review người.",
      "Chỗ khó: công ty đổi sang máy quét mới, ảnh có độ phân giải thấp hơn trước “một chút”. Chưa ai biết ngưỡng cũ còn đúng hay không."
    ],
    asks: [
      "Xét về thiết kế quy trình review, phản ứng đúng với thay đổi này là gì?",
      "Tức là: đầu vào vừa đổi, làm sao biết ngưỡng cũ còn đáng tin trước khi tiếp tục dùng nó để cho extraction đi thẳng không qua người.",
      "Soi từng phương án: nó quyết dựa trên số đo đúng/sai thật (có nhãn), hay dựa trên đoán, lưu lượng, hoặc tỉ lệ review?"
    ],
    facts: [
      "Calibration (hiệu chuẩn): đối chiếu điểm confidence với đúng/sai thật trên một labeled validation set (bộ mẫu có đáp án do người gán), để biết mỗi mức điểm thật sự đúng bao nhiêu phần trăm.",
      "Confidence chưa hiệu chuẩn không nói lên độ đúng: 0.9 không có nghĩa là đúng 90%. Ngưỡng route chỉ dùng được sau khi so với kết quả thật.",
      "Đổi gì cũng phải hiệu chuẩn lại: đổi prompt, model hay mix tài liệu đều làm ngưỡng cũ hết đúng. Chỉnh ngưỡng mù, không có số đo, chỉ dời vấn đề đi chỗ khác.",
      "Năng lực reviewer có hạn. Route theo confidence là để đưa người vào đúng chỗ rủi ro cao, không phải đẩy hết cho người."
    ],
    opts: [
      { k: "A", gist: "Route every extraction from the new scanner to human review and drop the threshold for that scanner permanently, for as long as it keeps producing lower-resolution images.",
        why: [
          "Chưa đo gì đã kết luận ngưỡng vô dụng với máy quét mới. Ảnh chỉ kém “một chút”, ngưỡng cũ có thể vẫn đúng hoặc chỉ cần chỉnh nhẹ. Việc cần làm là hiệu chuẩn lại (ý 3), không phải bỏ ngưỡng.",
          "Đẩy hết cho người thì hàng review phình ra mãi, đúng thứ mà route theo confidence sinh ra để tránh (ý 4)."
        ] },
      { k: "B", gist: "Lower the threshold by a fixed offset for the new scanner's documents, so they skip review at about the same rate as before even though the lower-resolution images pull scores down.",
        why: [
          "Hạ ngưỡng để giữ nguyên tỉ lệ bỏ qua review là chỉnh theo lưu lượng, không theo độ chính xác.",
          "Điểm thấp đi có thể vì model đọc ảnh mờ kém thật. Khi đó hạ ngưỡng là thả thêm extraction sai đi thẳng, không qua người.",
          "Con số bù “cố định” cũng chọn bừa, không có dữ liệu có nhãn nào đứng sau (ý 1). Đây đúng là chỉnh ngưỡng mù (ý 3)."
        ] },
      { k: "C", gist: "Keep the current threshold and track the share of extractions sent to human review over the following weeks, adjusting it only if that share moves noticeably from its baseline.",
        why: [
          "Tỉ lệ bị đưa sang người chỉ cho biết điểm confidence phân bố thế nào, không cho biết extraction đúng hay sai (ý 2). Muốn biết ngưỡng còn đúng không thì phải so với đáp án có nhãn (ý 1).",
          "Ảnh mờ có thể làm model sai mà vẫn tự tin cao: tỉ lệ review đứng yên trong khi lỗi lọt qua ngưỡng tăng lên. Chờ vài tuần cũng là để lỗi chạy thật rồi mới biết.",
          "Dễ bị cuốn vì nghe thận trọng, lại có số liệu theo dõi. Nhưng con số đó đo điểm confidence, không đo đúng sai."
        ] },
      { k: "D", gist: "Collect a labeled sample of documents from the new scanner, measure extraction accuracy at each confidence level, then keep or adjust the threshold based on that sample before relying on it.",
        why: [
          "Máy quét mới đổi chất lượng ảnh, tức là đổi đầu vào, nên ngưỡng cũ chưa chắc còn đúng (ý 3).",
          "Lấy mẫu có nhãn từ máy mới, đo accuracy theo từng mức confidence: đó chính là hiệu chuẩn (ý 1).",
          "Có số đo rồi mới giữ hay chỉnh ngưỡng, và làm xong trước khi dựa vào nó để bỏ qua review."
        ] }
    ],
    refs: [
      { label: "Bài 5.5, mục “Biết thêm”: “Đổi gì cũng phải hiệu chuẩn lại” (đổi prompt, model, mix tài liệu)", href: NOTES + "#l-5-5" },
      { label: "Bài Nền tảng D5, mục 4: hiệu chuẩn confidence là gì", href: NOTES + "#l-5-0" },
      { label: "Cheatsheet D5: dòng “Confidence: per-field threshold, hiệu chuẩn lại khi đổi…”", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 1, n: 26, total: 50, sub: "3.1", subName: "Cấp của CLAUDE.md và chia sẻ cho team",
    first: "B", answer: "B",
    ask: "A team has used Claude Code for six months, and every long-time teammate says Claude reliably follows the team's commit-message format and test-running conventions. A new engineer does a fresh clone, and in their sessions Claude ignores those conventions completely. The committed CLAUDE.md is present but empty, and the repository has no other instruction files. What most likely explains why the conventions reach the long-time teammates but not the new engineer?",
    scene: [
      "Team dùng Claude Code đã 6 tháng. Người cũ nào cũng thấy Claude theo đúng quy ước viết commit message và cách chạy test của team.",
      "Một kỹ sư mới clone repo về, Claude trong phiên của họ bỏ qua hết các quy ước đó.",
      "Dữ kiện chốt: CLAUDE.md đã commit trong repo có mặt nhưng rỗng, và repo không có file chỉ dẫn nào khác."
    ],
    asks: [
      "Vì sao quy ước tới được người cũ mà không tới người mới?",
      "Tức là: quy ước đang nằm ở đâu mà máy người cũ có, còn bản clone mới thì không.",
      "Soi từng phương án với dữ kiện “present but empty” (có file nhưng rỗng): phương án nào còn đứng được?"
    ],
    facts: [
      "CLAUDE.md có ba cấp. User: <code>~/.claude/CLAUDE.md</code>, chỉ mình người đó thấy, không đi theo git. Project: <code>./CLAUDE.md</code> hoặc <code>./.claude/CLAUDE.md</code>, ai clone cũng có. Directory: CLAUDE.md trong thư mục con.",
      "Lúc khởi động, Claude Code tự nạp CLAUDE.md ở thư mục làm việc và các thư mục cha, không cần chạy lệnh gì trước.",
      "<code>@import</code> kéo nội dung file khác vào CLAUDE.md. Chỉ import file nằm ngoài project mới cần người dùng duyệt.",
      "<code>/init</code> quét codebase để tạo CLAUDE.md khởi đầu. Có file rồi thì nó đề xuất sửa, không ghi đè."
    ],
    opts: [
      { k: "A", gist: "The project CLAUDE.md pulls the rules in through @-imports that each user must approve once, so the new engineer's session skips them.",
        why: [
          "Sai với dữ kiện: CLAUDE.md của project đang rỗng, tức là không có dòng <code>@import</code> nào cả.",
          "Hộp duyệt import có thật, nhưng chỉ hiện với import trỏ ra ngoài project (ý 3). Không có import thì không có gì để duyệt hay bỏ qua.",
          "Dễ bị cuốn vì <code>@import</code> và hộp duyệt đều là tính năng thật nên nghe hợp lý. Nhưng đề đã chốt file rỗng. Bám vào “present but empty” là loại được A, C, D cùng lúc."
        ] },
      { k: "B", gist: "The rules sit in each teammate's personal <code>~/.claude/CLAUDE.md</code>, outside the repository, so cloning never brings them to the new engineer's machine.",
        why: [
          "Cấp user <code>~/.claude/CLAUDE.md</code> nằm trong thư mục home, chỉ áp cho chính người đó, git không bao giờ mang theo (ý 1).",
          "File project thì rỗng, repo không có file chỉ dẫn nào khác, nên chỗ duy nhất còn chứa quy ước là máy của từng người cũ.",
          "Người mới clone chỉ nhận code, không nhận file trong home của ai. Hành vi khác nhau giữa hai máy gần như luôn là chuyện đặt sai cấp."
        ] },
      { k: "C", gist: "A <code>.gitignore</code> entry covers CLAUDE.md files, so the new engineer's clone never receives the project file and Claude Code starts with no repository rules.",
        why: [
          "Mâu thuẫn với đề: CLAUDE.md đã commit có mặt trong repo, chỉ là rỗng. Kể cả nhận được thì file rỗng cũng không chứa quy ước nào.",
          "<code>.gitignore</code> cũng không giải thích được vì sao máy người cũ vẫn có quy ước."
        ] },
      { k: "D", gist: "Claude Code loads a project CLAUDE.md only after <code>/init</code> has been run in the clone, so the new engineer's committed copy goes unread.",
        why: [
          "Bịa cơ chế: Claude Code tự nạp CLAUDE.md lúc khởi động, không cần chạy gì trước (ý 2).",
          "<code>/init</code> chỉ quét codebase để tạo bản nháp CLAUDE.md (ý 4). Mà file đang rỗng, có đọc cũng không có quy ước nào."
        ] }
    ],
    refs: [
      { label: "Bài 3.1, mục “Chuyện gì đang xảy ra”: bảng ba cấp CLAUDE.md và ai thấy cấp nào", href: NOTES + "#l-3-1" },
      { label: "Bài 3.1, mục “Biết thêm”: chỉ import file ngoài project mới cần duyệt; CLAUDE.md nạp lúc khởi động; <code>/init</code> làm gì", href: NOTES + "#fix-14" },
      { label: "Bài Nền tảng D3: phạm vi user / project / local và bản đồ thư mục", href: NOTES + "#l-3-0" }
    ]
  },
  {
    de: 1, n: 27, total: 50, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới",
    first: "D", answer: "D",
    ask: "A team finished a shared analysis of a monolith's test suite in one session. They now want to compare two independent refactoring strategies (<code>extract-service</code> and <code>strangler-fig</code>), both starting from that same analyzed baseline, without either exploration contaminating the other or the original session. What is the most appropriate mechanism?",
    scene: [
      "Team đã phân tích xong bộ test của một monolith (ứng dụng nguyên khối) trong một phiên.",
      "Giờ họ muốn thử hai chiến lược refactor độc lập, <code>extract-service</code> và <code>strangler-fig</code>, cả hai cùng xuất phát từ bản phân tích đó.",
      "Chỗ khó: hai hướng không được lẫn vào nhau, và phiên gốc cũng không được bị đụng tới. Ví dụ minh họa hình dạng cần có:<pre><code>phiên phân tích (giữ nguyên)\n ├─ nhánh 1: extract-service\n └─ nhánh 2: strangler-fig</code></pre>"
    ],
    asks: [
      "Cơ chế nào hợp nhất?",
      "Tức là: cần hai phiên mới, mỗi phiên mang sẵn toàn bộ bản phân tích, chạy độc lập, không ghi ngược vào phiên gốc.",
      "Soi từng phương án ba điều: có giữ được bản phân tích không, hai nhánh có tách nhau không, phiên gốc có còn nguyên không."
    ],
    facts: [
      "Resume (<code>--resume</code>) mở lại đúng phiên cũ, nạp lại lịch sử và ghi tiếp vào chính phiên đó.",
      "Fork (dòng lệnh: <code>--fork-session</code>, Agent SDK: <code>fork_session</code>) sao chép lịch sử phiên sang một phiên mới rồi đi tiếp độc lập. Phiên gốc không bị đụng tới.",
      "<code>/rewind</code> lùi lại trong cùng phiên: chọn một prompt đã gửi rồi khôi phục code, hội thoại hoặc cả hai về lúc đó. <code>/branch</code> mới là bản tách nhánh dùng ngay trong phiên, tương đương <code>--fork-session</code>.",
      "So sánh hai hướng bằng hai phiên trắng, mỗi phiên phân tích lại từ đầu, notes xếp vào cột “Tệ”."
    ],
    opts: [
      { k: "A", gist: "After running the first strategy, use <code>/rewind</code> to go back to the analysis checkpoint, so the second run gets the same context.",
        why: [
          "<code>/rewind</code> quay lui <b>trong cùng một phiên</b> (ý 3). Chiến lược 1 phải chạy ngay trên phiên gốc, tức là phiên gốc bị đụng vào, đúng điều đề cấm.",
          "Lùi xong thì chiến lược 1 cũng không còn là một nhánh nằm song song để so sánh. Muốn rẽ nhánh mà giữ phiên gốc nguyên vẹn thì dùng <code>--fork-session</code> hoặc <code>/branch</code>."
        ] },
      { k: "B", gist: "Resume the analysis with <code>--resume</code> once per strategy, so each run has the full analysis context from that point.",
        why: [
          "<code>--resume</code> mở lại <b>đúng phiên cũ</b> và ghi tiếp vào đó, không tạo phiên mới (ý 1).",
          "Đến lần resume thứ hai, phiên đó đã chứa cả chiến lược 1. Chiến lược 2 xuất phát từ gốc cộng chiến lược 1, không còn là gốc sạch, và phiên phân tích gốc cũng bị ghi thêm.",
          "Dễ bị cuốn vì resume đúng là mang theo toàn bộ bản phân tích nên trông như đủ. Nhưng B và D chỉ khác nhau một cờ <code>--fork-session</code>, và cờ đó là cả câu hỏi."
        ] },
      { k: "C", gist: "Start a new session per strategy and rerun the test-suite analysis in each, so each run has its own fresh context.",
        why: [
          "Hai nhánh tách biệt thật, nhưng phải phân tích lại từ đầu hai lần, tốn thời gian và token (ý 4).",
          "Hai lần phân tích chưa chắc ra cùng kết quả, nên hai chiến lược không còn xuất phát từ <b>cùng một</b> gốc như đề đòi."
        ] },
      { k: "D", gist: "Resume the analysis with <code>--resume --fork-session</code> once per strategy, so each run becomes its own new session from that point.",
        why: [
          "Mỗi lần <code>--resume --fork-session</code> sao chép lịch sử phiên phân tích sang một phiên mới có ID riêng (ý 2). Làm hai lần là có hai nhánh, cả hai mang sẵn bản phân tích đã xong.",
          "Nhánh này không ghi vào nhánh kia, cũng không ghi vào phiên gốc: thỏa cả ba điều đề đòi."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Ba cách nối lại công việc”: resume, fork, phiên mới kèm tóm tắt", href: NOTES + "#l-1-7" },
      { label: "Cheatsheet D1: dòng “So sánh hai hướng từ cùng một bản phân tích” → fork_session", href: NOTES + "#cheat-d1" },
      { label: "Bài 1.7, ô “Đã sửa 02/11”: <code>/rewind</code> lùi trong cùng phiên, <code>/branch</code> tách sang phiên mới", href: NOTES + "#fix-12" }
    ]
  },
  {
    de: 1, n: 28, total: 50, sub: "4.4", subName: "Validate, retry kèm lỗi và vòng phản hồi",
    first: "D", answer: "B",
    ask: "For several months, a code-review assistant has emitted structured findings that carry a <code>detected_pattern</code> field, and the team groups dismissal rates by that field's value. They find that findings tagged <code>detected_pattern</code> “decorator-wrapped test fixture” are dismissed more than 90% of the time. What is the main value this feedback loop provides?",
    scene: [
      "Vài tháng nay, trợ lý review code trả finding (phát hiện) có cấu trúc. Mỗi finding có trường <code>detected_pattern</code>: cấu trúc code đã kích hoạt nó.",
      "Team gom tỉ lệ dismiss (dev bỏ qua finding) theo giá trị của trường này.",
      "Kết quả: finding gắn “decorator-wrapped test fixture” (test fixture bọc trong decorator) bị dismiss hơn 90%."
    ],
    asks: [
      "Vòng phản hồi này mang lại giá trị chính gì?",
      "Tức là: dữ liệu dismiss gom theo <code>detected_pattern</code> cho team biết điều gì, và họ nên sửa ở đâu.",
      "Soi từng phương án: kết luận của nó có khớp với cách dữ liệu được gom (theo pattern) không?"
    ],
    facts: [
      "Guide bảo thêm <code>detected_pattern</code> vào finding “to enable analysis of false positive patterns when developers dismiss findings” (để phân tích pattern gây false positive, tức báo nhầm, khi dev dismiss).",
      "Gom finding bị dismiss theo trường này là thấy ngay pattern nào bị bỏ nhiều, biết phải sửa tiêu chí nào. Một loại finding báo sai nhiều thì sửa riêng tiêu chí của nó, có thể tắt tạm trong lúc sửa.",
      "Severity trộn mọi construct (cấu trúc code) vào một tier, lý do dismiss chỉ nói vì sao bị bỏ. Chỉ <code>detected_pattern</code> gom được theo thứ sửa được trong prompt.",
      "JSON Schema chỉ chắc cú pháp, không chắc nội dung đúng. Lỗi định dạng (thiếu trường, sai kiểu) thì code validate bắt ngay lúc parse."
    ],
    opts: [
      { k: "A", gist: "It shows the findings schema is producing malformed output for fixtures, so the team should patch the schema before the next release.",
        why: [
          "Dismiss là dev đọc xong và thấy finding không đáng, tức là nội dung sai, không phải định dạng sai.",
          "Output hỏng (thiếu trường, sai kiểu) thì code validate bắt ngay lúc parse, không cần đợi vài tháng gom tỉ lệ dismiss (ý 4). Finding vẫn gắn được nhãn <code>detected_pattern</code> đều đặn thì schema đang chạy tốt."
        ] },
      { k: "B", gist: "It shows one code construct is triggering false alarms, so the team can tune or suppress the detection rule for that construct.",
        why: [
          "Đây đúng là lý do guide bảo thêm <code>detected_pattern</code>: phân tích pattern gây false positive khi dev dismiss (ý 1).",
          "Gom theo trường này thì thấy đúng một construct bị bỏ hơn 90%. Team sửa hoặc tắt riêng tiêu chí bắt construct đó, các tiêu chí khác giữ nguyên (ý 2).",
          "Đó là vòng phản hồi: dữ liệu dismiss quay về sửa tiêu chí của reviewer."
        ] },
      { k: "C", gist: "It shows reviewers dismiss most low-severity findings, so the team can auto-close that severity tier without developer review.",
        why: [
          "Dữ liệu được gom theo <code>detected_pattern</code>, không theo severity, nên nó không nói gì về tier low (ý 3).",
          "Biết “low bị dismiss nhiều” cũng không chỉ ra phải sửa tiêu chí nào. Tự đóng cả một tier còn giấu luôn những finding đúng nằm trong tier đó."
        ] },
      { k: "D", gist: "It shows developers dismiss findings without reading them, so the team should require a written reason for each dismissal.",
        why: [
          "Dev bỏ qua mà không đọc thì tỉ lệ dismiss sẽ cao đều ở mọi pattern. Ở đây dismiss dồn vào đúng một pattern, nghĩa là dev có đọc và phân biệt được finding đúng với finding sai.",
          "Gốc lỗi là tiêu chí phát hiện báo quá tay (ý 2). Bắt ghi lý do không sửa được tiêu chí đó, và lý do dạng chữ tự do cũng khó gom nhóm hơn <code>detected_pattern</code> đã có (ý 3).",
          "Dễ bị cuốn vì dismiss nhiều nghe như chuyện con người, nên “bắt ghi lý do” có vẻ là siết kỷ luật hợp lý. Nhưng lỗi nằm ở tiêu chí của bot, không ở người review."
        ] }
    ],
    refs: [
      { label: "Bài 4.4, mục “Cùng ý ở hệ thống B: thêm trường để phân tích finding bị dismiss”", href: NOTES + "#l-4-4" },
      { label: "Bài 4.1: false positive dồn vào một category thì sửa tiêu chí của category đó, tắt tạm trong lúc sửa", href: NOTES + "#l-4-1" },
      { label: "Cheatsheet D4: dòng “Dev dismiss nhiều, muốn phân tích có hệ thống” → detected_pattern", href: NOTES + "#cheat-d4" }
    ]
  },
  {
    de: 1, n: 29, total: 50, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool",
    first: "A", answer: "A",
    ask: "An MCP tool <code>charge_card</code> receives a call whose amount field is the string <code>\"$45.00\"</code> instead of the numeric type its input schema specifies. Under the MCP specification's error-handling model, how is this malformed-argument failure reported, and how does that compare with the tool later reporting a declined charge?",
    scene: [
      "MCP tool <code>charge_card</code> (trừ tiền thẻ) nhận lời gọi có trường amount là chuỗi <code>\"$45.00\"</code>, trong khi input schema của tool đòi kiểu số.",
      "Đề kèm ca thứ hai để so: tool chạy xong nhưng thẻ bị từ chối (declined charge).",
      "Chỗ khó: một ca nghe như lỗi kỹ thuật (tham số sai kiểu), một ca là lỗi nghiệp vụ, nên dễ tưởng hai ca phải đi hai kênh khác nhau."
    ],
    asks: [
      "Theo mô hình xử lý lỗi của spec MCP, lỗi tham số sai kiểu này được báo thế nào, và so với lúc tool báo thẻ bị từ chối thì sao?",
      "Tức là: mỗi ca đi kênh nào, lỗi giao thức JSON-RPC hay lỗi thực thi trả trong kết quả tool với <code>isError: true</code>?",
      "Mỗi phương án có hai vế, phải đúng cả hai."
    ],
    facts: [
      "MCP có hai kênh lỗi. Lỗi giao thức JSON-RPC dành cho tool không tồn tại, request sai khung <code>tools/call</code> (<code>CallToolRequest</code>), server lỗi.",
      "Lỗi thực thi (Tool Execution Error) trả ngay trong kết quả tool với <code>isError: true</code>: input sai (kể cả sai định dạng hay vượt khoảng cho phép), dịch vụ phía sau hỏng, lỗi nghiệp vụ.",
      "Spec 2025-06-18 còn xếp tham số sai vào lỗi giao thức. Từ bản 2025-11-25, lỗi kiểm tra input chuyển sang lỗi thực thi, bản 2026-07-28 giữ nguyên.",
      "Spec ghi client SHOULD (nên) đưa lỗi thực thi cho model để nó tự sửa, còn lỗi giao thức thì chỉ MAY (có thể). Muốn model đọc được lỗi thì trả qua <code>isError</code>."
    ],
    opts: [
      { k: "A", gist: "The <code>\"$45.00\"</code> amount is returned as an input-validation Tool Execution Error in the tool result with <code>isError: true</code>, and the declined charge is returned as a business-logic Tool Execution Error in the tool result with <code>isError: true</code>.",
        why: [
          "Chuỗi <code>\"$45.00\"</code> là input sai định dạng: request vẫn đúng khung, chỉ giá trị một tham số sai kiểu. Spec hiện hành xếp loại này vào lỗi thực thi, trả bằng <code>isError: true</code> (ý 2, ý 3).",
          "Thẻ bị từ chối là lỗi nghiệp vụ: tool đã chạy, chỉ là kết quả không như ý. Cũng đi kênh <code>isError: true</code> (ý 2).",
          "Hai ca chung một kênh vì lỗi ở kênh này đến tay model: nó đọc, tự sửa tham số rồi gọi lại, hoặc quyết bước tiếp (ý 4)."
        ] },
      { k: "B", gist: "The <code>\"$45.00\"</code> amount is returned as a JSON-RPC protocol error with code -32602 (Invalid params) from argument validation, and the declined charge is returned as a JSON-RPC protocol error with a server-defined code.",
        why: [
          "Sai cả hai vế. Lỗi giao thức chỉ dành cho tool không tồn tại, request sai khung, server lỗi (ý 1). Mã -32602 trong spec là ví dụ cho “Unknown tool” (tool không tồn tại).",
          "Thẻ bị từ chối là tool đã chạy xong và trả kết quả nghiệp vụ, càng không phải lỗi giao thức. Đẩy cả hai sang JSON-RPC là lấy mất của model cơ hội đọc lỗi rồi sửa (ý 4)."
        ] },
      { k: "C", gist: "The <code>\"$45.00\"</code> amount is returned as an input-validation Tool Execution Error in the tool result with <code>isError: true</code>, and the declined charge is returned as a JSON-RPC protocol error with a server-defined code.",
        why: [
          "Vế đầu đúng, vế sau sai. Thẻ bị từ chối là lỗi nghiệp vụ: request hợp lệ, tool đã chạy, nên đi kênh <code>isError: true</code> (ý 2).",
          "Đẩy nó sang lỗi JSON-RPC thì model chưa chắc thấy lý do từ chối (ý 4), trong khi nó cần lý do đó để quyết bước tiếp: báo khách, đổi thẻ."
        ] },
      { k: "D", gist: "The <code>\"$45.00\"</code> amount is returned as a JSON-RPC protocol error raised by schema validation before the tool runs, and the declined charge is returned as a business-logic Tool Execution Error in the tool result with <code>isError: true</code>.",
        why: [
          "Vế sau đúng, vế đầu sai. Lỗi giao thức là khi bản thân request hỏng, không khớp khung <code>CallToolRequest</code> (ý 1). Ở đây request đúng khung, chỉ giá trị một tham số sai kiểu so với input schema của tool, nên là lỗi kiểm tra input, trả bằng <code>isError: true</code> (ý 2).",
          "Trả lỗi giao thức thì model khó tự sửa, vì client chỉ “có thể” (MAY) đưa nó cho model (ý 4).",
          "Dễ bị cuốn vì “schema validation before the tool runs” (kiểm schema trước khi tool chạy) nghe rất kỹ thuật, lại khớp spec bản cũ 2025-06-18. Nhưng từ bản 2025-11-25, sai định dạng hay ngoài khoảng giá trị là lỗi thực thi (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 2.2, ô “Đã sửa 02/11”: hai kênh lỗi MCP, input sai trả isError, model chắc chắn thấy kênh này", href: NOTES + "#fix-13" },
      { label: "Cheatsheet D2: dòng “Input sai: ném protocol error hay trả isError?”", href: NOTES + "#cheat-d2" },
      { label: "Spec MCP 2025-11-25, mục Error Handling: Protocol Errors và Tool Execution Errors", href: "https://modelcontextprotocol.io/specification/2025-11-25/server/tools#error-handling" }
    ]
  },
  {
    de: 1, n: 30, total: 50, sub: "3.2", subName: "Slash command và skill",
    first: "C", answer: "C",
    ask: "A platform team wants a <code>/release-notes</code> slash command that every engineer on the repository receives automatically after <code>git pull</code>, so nobody has to install it by hand. Where should the team save the command file?",
    scene: [
      "Team platform muốn có lệnh <code>/release-notes</code> (soạn ghi chú phát hành).",
      "Yêu cầu: mọi kỹ sư trong repo tự có lệnh này sau khi <code>git pull</code>, không ai phải cài tay.",
      "Chỗ khó: các phương án khác nhau ở hai điều. Một là thư mục đặt file (Claude Code có đọc command từ đó không). Hai là cấp (project đi theo git, hay cá nhân nằm trong home)."
    ],
    asks: [
      "Team nên lưu file lệnh ở đâu?",
      "Tức là: chỗ nào vừa được Claude Code đọc làm slash command, vừa đi theo git tới máy mọi người."
    ],
    facts: [
      "Slash command là một file Markdown. Gõ lệnh thì nội dung file được gửi cho Claude như một prompt. Tên file thành tên lệnh: <code>review.md</code> → <code>/review</code>.",
      "Bản project (cả team) đặt ở <code>.claude/commands/</code> trong repo, commit vào git. Bản cá nhân đặt ở <code>~/.claude/commands/</code>, chỉ mình người đó có.",
      "Skill cũng có hai cấp: <code>.claude/skills/&lt;tên&gt;/SKILL.md</code> (project) và <code>~/.claude/skills/</code> (cá nhân).",
      "File nằm trong thư mục home thì không bao giờ đi theo repo."
    ],
    opts: [
      { k: "A", gist: "Save <code>docs/commands/release-notes.md</code> in the project repository, then commit and push it to the main branch so the other engineers get it on their next pull.",
        why: [
          "File có đi theo git thật, nhưng <code>docs/commands/</code> chỉ là một thư mục tài liệu bình thường. Claude Code không đọc command từ đó (ý 2), nên ai pull về cũng không có lệnh <code>/release-notes</code>.",
          "Dễ bị cuốn vì có commit, có push, có pull, đủ các bước chia sẻ qua git nên trông rất giống C. Nhưng sai thư mục: command của project phải nằm đúng ở <code>.claude/commands/</code>."
        ] },
      { k: "B", gist: "Save <code>~/.claude/skills/release-notes/SKILL.md</code> on the team lead's machine, then let Claude load it whenever the lead opens the team's repository.",
        why: [
          "<code>~/.claude/skills/</code> là skill cá nhân, nằm trong home của trưởng nhóm, ngoài repo (ý 3, ý 4).",
          "Chỉ phiên của trưởng nhóm thấy nó, git không mang sang máy ai khác. Đề đòi mọi kỹ sư tự có sau khi pull, nên bị loại ngay."
        ] },
      { k: "C", gist: "Save <code>.claude/commands/release-notes.md</code> in the project repository, then commit and push it to the main branch so the other engineers get it on their next pull.",
        why: [
          "Slash command cấp project được đọc từ <code>.claude/commands/</code> trong repo, tên file thành tên lệnh: <code>release-notes.md</code> → <code>/release-notes</code> (ý 1, ý 2).",
          "Commit và push xong thì ai <code>git pull</code> cũng nhận file, mở Claude Code là có lệnh, không cần cài thêm gì."
        ] },
      { k: "D", gist: "Save <code>~/.claude/commands/release-notes.md</code> on the team lead's machine, then post the file in the team channel for the other engineers to add to their own setups.",
        why: [
          "Đây chính là cách cài tay mà đề muốn bỏ. <code>~/.claude/commands/</code> là bản cá nhân, mỗi người phải tự chép vào máy mình (ý 2).",
          "Người mới vào phải xin lại file, sửa một lần thì mỗi máy một bản, lệch nhau dần."
        ] }
    ],
    refs: [
      { label: "Bài 3.2: bảng chỗ đặt slash command và skill, bản project và bản cá nhân", href: NOTES + "#l-3-2" },
      { label: "Cheatsheet D3: dòng “Slash command cho mọi người khi clone” → .claude/commands/", href: NOTES + "#cheat-d3" }
    ]
  },
  {
    de: 1, n: 31, total: 50, sub: "5.5", subName: "Review người và hiệu chuẩn confidence",
    first: "D", answer: "B",
    ask: "Reviewers can manually check only 8% of the extractions a Claude-based intake pipeline produces each day. The extractions vary in model-reported confidence, and some source documents give contradictory values for the same field on different pages. How should the team decide which extractions get human review?",
    scene: [
      "Pipeline dùng Claude trích xuất dữ liệu từ tài liệu nhập vào, mỗi ngày ra rất nhiều extraction (kết quả trích xuất).",
      "Chỗ khó: người review chỉ kiểm tay được 8% số đó. Phải chọn 8% nào cho đáng.",
      "Đề cho sẵn hai tín hiệu: điểm confidence model tự báo cho từng extraction, và một số tài liệu nguồn ghi giá trị khác nhau cho cùng một trường ở các trang khác nhau."
    ],
    asks: [
      "Team nên chọn extraction nào để người review?",
      "Tức là: chia 8% ngân sách review thế nào để bắt được nhiều lỗi nhất, mà vẫn biết phần không được review đang sai bao nhiêu.",
      "Soi từng phương án hai điều: có dồn người vào chỗ dễ sai không? Có chừa một phần để đo phần được cho qua không?"
    ],
    facts: [
      "Năng lực reviewer có hạn. Routing (chia ca cho người) là để đưa người vào đúng chỗ rủi ro cao: confidence thấp, nguồn mâu thuẫn, loại tài liệu chưa được chứng minh.",
      "Tài liệu tự mâu thuẫn thì lỗi nằm ở tờ giấy, không ở Claude. Đưa người xem, chạy lại vô ích.",
      "Phần tự động cho qua vẫn phải lấy mẫu ngẫu nhiên định kỳ để đo error rate (tỉ lệ sai) thật và bắt pattern lỗi mới. Stratified sampling (chia tầng rồi lấy mẫu trong từng tầng) giúp nhóm nhỏ cũng được kiểm.",
      "Confidence model tự báo chưa hiệu chuẩn thì “0.9” không có nghĩa là đúng 90%. Chạy model nhiều lần chỉ giảm nhiễu, không cho biết kết quả nào sai."
    ],
    opts: [
      { k: "A", gist: "Review extractions from the longest documents first and work down to shorter ones until the 8% budget runs out, using page count as a proxy for contradictory values across pages.",
        why: [
          "Sai ở chỗ đoán gián tiếp: đề đã cho biết thẳng tài liệu nào mâu thuẫn giữa các trang, A lại đi đoán bằng số trang. Tài liệu dài chưa chắc mâu thuẫn, tài liệu ngắn vẫn có thể mâu thuẫn.",
          "A còn bỏ hẳn điểm confidence, nên ca confidence thấp nằm trong tài liệu ngắn không ai xem (trái ý 1).",
          "Ngân sách tiêu hết vào tài liệu dài, không còn mẫu nào cho phần còn lại, nên không biết phần được cho qua đang sai bao nhiêu (ý 3)."
        ] },
      { k: "B", gist: "Review the extractions with the lowest model-reported confidence and those with conflicting values across pages first, then fill the remaining slots with a small random sample of the rest.",
        why: [
          "Dồn người vào đúng hai nhóm rủi ro cao mà đề cho sẵn tín hiệu: confidence thấp và tài liệu tự mâu thuẫn (ý 1, ý 2).",
          "Chỗ trống còn lại lấy mẫu ngẫu nhiên nhỏ trên phần được cho qua (ý 3). Mẫu này đo error rate thật, kiểm xem điểm confidence còn đáng tin không (ý 4), và bắt pattern lỗi mới mà confidence bỏ sót.",
          "Vừa bắt nhiều lỗi nhất trong 8%, vừa biết phần tự động đang chạy tốt tới đâu: đúng điều đề đòi."
        ] },
      { k: "C", gist: "Review a random 8% sample of the day's extractions, drawn from each document type so every format is covered, without regard to confidence score or whether a document's pages disagree.",
        why: [
          "Lấy mẫu phân tầng theo loại tài liệu là việc đúng, nhưng là để <b>canh</b> phần đã cho qua (ý 3), không phải cách chia toàn bộ ngân sách review.",
          "Bỏ qua confidence và chuyện trang mâu thuẫn thì phần lớn 8% rơi vào extraction vốn đã đúng.",
          "Ca dễ sai nhất chỉ được xem nếu tình cờ lọt vào mẫu (trái ý 1)."
        ] },
      { k: "D", gist: "Review the highest-confidence extractions first because they reach downstream systems most often, and send the lower-confidence ones through a second model extraction pass instead of a reviewer.",
        why: [
          "Ngược hẳn routing theo rủi ro: confidence cao là chỗ ít khả năng sai nhất, dồn người vào đó là phí 8% (ý 1).",
          "Ca confidence thấp, đúng chỗ cần người, lại giao cho model trích lần nữa. Chạy lại chỉ giảm nhiễu, không cho biết cái nào sai (ý 4). Tài liệu tự mâu thuẫn thì chạy lại bao nhiêu lần cũng vẫn mâu thuẫn (ý 2).",
          "Dễ bị cuốn vì lý do “they reach downstream systems most often” (chúng đi xuống hệ thống phía sau nhiều nhất) nghe như ưu tiên theo mức ảnh hưởng. Nhưng review là để bắt lỗi, mà lỗi nằm nhiều nhất ở confidence thấp và tài liệu mâu thuẫn."
        ] }
    ],
    refs: [
      { label: "Bài 5.5, mục “Chuyện gì đang xảy ra” và khung Tốt: route confidence thấp và tài liệu mâu thuẫn cho người, lấy mẫu phần tự động", href: NOTES + "#l-5-5" },
      { label: "Bài 5.5, mục “Vì sao phải stratified”: năng lực reviewer có hạn, đưa người vào chỗ rủi ro cao", href: NOTES + "#l-5-5" },
      { label: "Bài Nền tảng D5, mục 4: hiệu chuẩn confidence, vì sao “0.9” chưa chắc đúng 90%", href: NOTES + "#l-5-0" }
    ]
  },
  {
    de: 1, n: 32, total: 50, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema",
    first: "D", answer: "A",
    ask: "A developer is comparing two ways to pull structured data from a corpus of messy scanned documents. One asks Claude in the prompt to “return only a JSON object in this format”. The other defines a tool whose <code>input_schema</code> describes that format, enables <code>strict: true</code> on it, and reads the result from the <code>tool_use</code> block. Both run on the same scans. What should the developer expect about which approach <i>guarantees</i> schema-compliant output?",
    scene: [
      "Dev so hai cách lấy dữ liệu có cấu trúc từ một đống bản scan lộn xộn.",
      "Cách 1: dặn trong prompt “return only a JSON object in this format” (chỉ trả về một object JSON theo mẫu này).",
      "Cách 2: định nghĩa tool có <code>input_schema</code> mô tả đúng mẫu đó, bật <code>strict: true</code>, rồi đọc kết quả từ block <code>tool_use</code>.",
      "Chỗ khó: scan nhiễu dễ làm người ta nghĩ không cách nào bảo đảm được gì, hoặc nghĩ tool cứng nhắc hơn prompt."
    ],
    asks: [
      "Cách nào <i>bảo đảm</i> output khớp schema?",
      "Tức là: cách nào khớp schema nhờ cơ chế của API, không nhờ model tự giác viết đúng.",
      "Tách hai chuyện: hình dạng JSON (đúng kiểu, đủ trường) và nội dung đúng sự thật. Đề chỉ hỏi chuyện thứ nhất."
    ],
    facts: [
      "Xin JSON trong prompt thì model vẫn đang viết văn, chỉ là văn trông giống JSON. Nó có thể thêm câu dẫn, bọc markdown fence, thiếu trường. Mọi lời dặn “JSON only” đều là xác suất.",
      "Tool bật <code>strict: true</code>: API compile schema thành grammar (bộ luật cú pháp) rồi ràng buộc ngay lúc sinh từng token, docs gọi là grammar-constrained sampling. Input Claude điền vào tool luôn đúng kiểu, đủ trường bắt buộc.",
      "Schema chỉ lo cú pháp (hình dạng), không lo ngữ nghĩa (nội dung có đúng sự thật không). Đọc nhầm số, đặt giá trị nhầm trường là lỗi ngữ nghĩa, phải bắt bằng validator (bài 4.4).",
      "Trường bắt buộc mà tài liệu không có thì model sẽ bịa cho đủ. Guide bảo để những trường có thể vắng là nullable, hoặc thêm enum <code>\"unclear\"</code> cho ca mơ hồ."
    ],
    opts: [
      { k: "A", gist: "Strict tool use reliably returns input that matches the <code>input_schema</code>, because the API constrains generation on the server side. A prompt-only JSON request depends on the model formatting correctly, so it can still come back with broken syntax or missing fields.",
        why: [
          "Strict ràng buộc ngay lúc sinh: token nào làm lệch schema thì không được sinh ra (ý 2). Nên <code>tool_use.input</code> luôn đúng kiểu, đủ trường bắt buộc, scan nhiễu cỡ nào cũng vậy.",
          "Dặn JSON trong prompt thì vẫn là xác suất (ý 1). Scan càng nhiễu càng dễ có câu dẫn, thiếu trường, sai kiểu.",
          "Đúng chữ “guarantees” (bảo đảm) của đề: chỉ cách có ràng buộc phía API mới bảo đảm được hình dạng."
        ] },
      { k: "B", gist: "Both approaches return schema-matching output at about the same rate. A precise format description in the prompt steers the model as firmly as an <code>input_schema</code>, and strict mode simply adds a validation pass over the finished output.",
        why: [
          "Sai giả định thứ nhất: mô tả format trong prompt chỉ là lời dặn, khớp hay không vẫn là xác suất (ý 1). <code>input_schema</code> kèm strict mới là ràng buộc cứng.",
          "Sai giả định thứ hai: strict không phải bước kiểm sau khi sinh xong. Nó ràng buộc ngay lúc sinh (ý 2), nên output không lệch schema được từ đầu."
        ] },
      { k: "C", gist: "Neither approach can guarantee schema-matching output on noisy scans, since OCR errors corrupt the extracted structure. Strict mode checks the tool definition rather than the output, so a JSON-repair step is still needed after both.",
        why: [
          "Lẫn hai loại lỗi. OCR đọc nhầm làm <i>giá trị</i> sai, đó là lỗi ngữ nghĩa (ý 3). Còn <i>hình dạng</i> JSON thì strict vẫn bảo đảm, đầu vào nhiễu cỡ nào cũng vậy (ý 2).",
          "Strict ràng buộc chính input Claude điền vào tool, không chỉ kiểm định nghĩa tool. Nên không cần bước sửa JSON.",
          "Cái thật sự cần thêm là validator kiểm nội dung (bài 4.4), không phải bước sửa cú pháp."
        ] },
      { k: "D", gist: "Prompt-only JSON is the more reliable option on noisy scans, because a tool call has to fill every <code>input_schema</code> field from unclear text, while strict mode only rejects a nonconforming response after it is generated instead of shaping it.",
        why: [
          "Ngược thực tế: prompt-only không có gì bảo đảm (ý 1), scan nhiễu chỉ làm nó lệch format nhiều hơn. Còn strict không loại response sau khi sinh, nó định hình từng token ngay lúc sinh (ý 2).",
          "“Phải điền mọi trường từ chữ mờ” là chuyện thiết kế schema: cho trường nullable hoặc enum <code>\"unclear\"</code> để Claude khỏi bịa (ý 4). Không phải lý do bỏ tool.",
          "Dễ bị cuốn vì “strict chỉ loại response sau khi sinh” nghe quen, nhiều thư viện validate kiểu đó, còn “phải điền mọi trường” làm tool nghe cứng nhắc hơn prompt. Nhưng strict ràng buộc lúc sinh chứ không lọc sau."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, mục “Chuyện gì đang xảy ra” và “Biết thêm”: dặn JSON trong prompt chỉ là xác suất, strict compile schema thành grammar", href: NOTES + "#l-4-3" },
      { label: "Bài Nền tảng D4, ô “Đã sửa 01/11” và bảng hai cách lấy JSON: không bật strict thì vẫn có thể sai kiểu, thiếu trường", href: NOTES + "#fix-6" },
      { label: "Docs Strict tool use: strict ràng buộc việc sinh token theo schema (grammar-constrained sampling)", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/strict-tool-use" }
    ]
  },
  {
    de: 1, n: 33, total: 50, sub: "5.6", subName: "Giữ nguồn và xử lý mâu thuẫn khi tổng hợp",
    first: "C", answer: "D",
    ask: "A synthesis agent is finishing a report that merges two subagent outputs: structured findings about a software library's API surface, and a narrative summary of how the developer community feels about that library. In the current draft, the API findings are written out as flowing prose paragraphs. Which change would improve this section?",
    scene: [
      "Synthesis agent (agent tổng hợp) đang hoàn thiện một báo cáo, gộp output của hai subagent.",
      "Một bên là findings có cấu trúc về API surface (các method, tham số thư viện đưa ra cho người dùng). Bên kia là bản tóm tắt dạng kể chuyện về cảm nhận của cộng đồng dev với thư viện đó.",
      "Chỗ khó: trong bản nháp, phần API đang được viết thành các đoạn văn xuôi liền mạch."
    ],
    asks: [
      "Đổi gì để phần này tốt hơn?",
      "Tức là: mỗi loại nội dung nên trình bày dưới dạng nào trong báo cáo.",
      "Soi từng phương án: phần API có thành dạng tra được không, phần cảm nhận có giữ được sắc thái không."
    ],
    facts: [
      "Guide 5.6: render theo loại nội dung. Dữ liệu tài chính thành bảng, tin tức thành văn xuôi, phát hiện kỹ thuật thành danh sách có cấu trúc.",
      "Ép mọi nội dung về một format làm mất thông tin và khó đọc.",
      "API findings là các sự thật rời rạc (method, tham số, hành vi), người đọc cần tra từng mục. Cảm nhận cộng đồng là nội dung định tính, cần văn xuôi để giữ sắc thái."
    ],
    opts: [
      { k: "A", gist: "Keep the API findings as prose, naming the key methods inline, and work the sentiment summary into the same narrative.",
        why: [
          "Giữ nguyên chỗ đang dở: API vẫn là văn xuôi, muốn tra một method phải đọc cả đoạn (trái ý 1).",
          "Gộp luôn phần cảm nhận vào cùng mạch văn còn tệ hơn: sự thật kỹ thuật và ý kiến từ hai subagent trộn vào nhau, khó biết câu nào là loại nào (ý 3)."
        ] },
      { k: "B", gist: "Turn the sentiment summary into a bulleted list of recurring themes and quotes, and leave the API findings as flowing prose.",
        why: [
          "Đổi format ngược chiều: phần cần sửa là API findings, B lại để nguyên văn xuôi (trái ý 1).",
          "Phần cảm nhận cộng đồng hợp văn xuôi hơn (ý 3), B lại cắt nó thành gạch đầu dòng, mất sắc thái."
        ] },
      { k: "C", gist: "Put the API findings and the sentiment summary together in one shared table, with columns for finding type and source subagent.",
        why: [
          "Bảng hợp với dữ liệu có cấu trúc, nhưng một bảng chung là ép mọi nội dung về một format, đúng điều guide dặn tránh (ý 2).",
          "Phần cảm nhận cộng đồng bị nhét vào từng ô, mất sắc thái (ý 3). Hai loại nội dung cần hai format khác nhau.",
          "Dễ bị cuốn vì cột “source subagent” (subagent nguồn) trông như giữ được nguồn, mà giữ nguồn là chủ đề chính của 5.6. Nhưng câu này hỏi cách trình bày, không hỏi chuyện giữ nguồn."
        ] },
      { k: "D", gist: "Present the API findings as a structured list of methods and parameters, and keep the sentiment summary as narrative prose.",
        why: [
          "Render theo loại nội dung, đúng guide 5.6 (ý 1): phát hiện kỹ thuật thành danh sách có cấu trúc, nội dung định tính giữ văn xuôi.",
          "API thành danh sách method và tham số thì người đọc tra nhanh từng mục. Cảm nhận cộng đồng giữ văn xuôi nên còn nguyên sắc thái (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 5.6, mục “Ngày tháng và cách trình bày”: render theo loại nội dung, đừng ép tất cả về một format", href: NOTES + "#l-5-6" },
      { label: "Cheatsheet D5: dòng “Báo cáo ép mọi nội dung thành một format” → bảng cho tài chính, văn xuôi cho tin tức, danh sách cho kỹ thuật", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 1, n: 34, total: 50, sub: "1.2", subName: "Điều phối coordinator–subagent",
    first: "C", answer: "C",
    ask: "A market-research assistant's coordinator receives the broad request “analyze the competitive landscape for electric vehicle charging networks”. It splits the request into narrow subtasks such as “find charger connector types” and “list charging speeds”, and hands each one to its own subagent. The final synthesized report has nothing at all on pricing models, regulatory incentives, or the major competitors. What went wrong?",
    scene: [
      "Coordinator (agent điều phối) của một trợ lý nghiên cứu thị trường nhận đề tài rộng: “analyze the competitive landscape for electric vehicle charging networks” (phân tích bức tranh cạnh tranh của các mạng sạc xe điện).",
      "Nó chia thành vài việc con hẹp như “find charger connector types” (tìm các loại đầu sạc), “list charging speeds” (liệt kê tốc độ sạc), mỗi việc giao cho một subagent.",
      "Chỗ khó: báo cáo cuối không có chữ nào về mô hình giá, ưu đãi theo chính sách, hay các đối thủ lớn. Không phải mỏng, mà vắng hẳn."
    ],
    asks: [
      "Sai ở đâu?",
      "Tức là: vì sao cả mấy mảng lớn vắng mặt hoàn toàn, dù các subagent đều chạy xong.",
      "Soi từng phương án: nó giải thích được mảng <b>vắng hẳn</b>, hay chỉ giải thích được mảng <b>mỏng</b>?"
    ],
    facts: [
      "Mỗi subagent làm đúng việc được giao, không tự đi tìm mảng ngoài phạm vi. Báo cáo chỉ phản ánh được những việc đã giao.",
      "Narrow decomposition (chia việc quá hẹp): coordinator chia đề tài thành các mảng mà gộp lại không phủ hết câu hỏi. Đây là lỗi của người giao việc.",
      "Sửa bằng partition scope (chia phạm vi phủ đủ câu hỏi, không chồng nhau) cộng iterative refinement (đọc bản tổng hợp, mảng nào thiếu thì giao tìm thêm).",
      "Notes xếp “báo cáo thiếu mảng thì đi sửa synthesis agent” vào cột Tệ."
    ],
    opts: [
      { k: "A", gist: "Several subagents researched connector types in parallel, so the coordinator used up its budget before the remaining areas were covered.",
        why: [
          "Đề không kể chuyện trùng việc hay hết ngân sách. Mỗi việc con giao cho một subagent riêng.",
          "Trong danh sách việc con không hề có giá, chính sách hay đối thủ (ý 2). Ngân sách dư bao nhiêu thì mấy mảng đó vẫn không ai tìm, vì chưa từng được giao (ý 1)."
        ] },
      { k: "B", gist: "The coordinator started synthesizing before the last subagents reported back, so the report was built from partial findings.",
        why: [
          "Tổng hợp sớm thì các mảng <i>đã giao</i> sẽ thiếu hoặc mỏng. Nhưng giá, chính sách, đối thủ chưa bao giờ có trong kế hoạch, nên chờ đủ kết quả cũng không có (ý 1).",
          "Đề cũng không có dấu hiệu nào về thời điểm tổng hợp.",
          "Dễ bị cuốn vì báo cáo thiếu thì dễ nghĩ ngay tới bước tổng hợp. Nhưng đó đúng là thói quen notes xếp vào cột Tệ (ý 4). Mảng chưa từng được giao thì phải nhìn lại cách coordinator chia việc."
        ] },
      { k: "C", gist: "The coordinator broke the topic into a few detailed technical areas, so the rest of the landscape never had a subagent assigned to it.",
        why: [
          "Đây là narrow decomposition (ý 2): coordinator biến một đề tài rộng thành vài việc con kỹ thuật chi tiết, gộp lại không phủ hết câu hỏi.",
          "Subagent làm đúng việc được giao, nên báo cáo chỉ có những mảng đã giao (ý 1). Lỗi nằm ở người giao việc, không ở người làm.",
          "Sửa bằng chia phạm vi phủ đủ đề tài, cộng vòng đọc bản tổng hợp để tìm mảng còn thiếu (ý 3)."
        ] },
      { k: "D", gist: "The subagents had only limited access to external search tools, so what they found on their assigned areas came back thin.",
        why: [
          "Thiếu tool thì kết quả của mảng được giao sẽ mỏng. Đề lại kể mảng vắng mặt hoàn toàn.",
          "Chính D cũng nói “on their assigned areas” (trên mảng được giao). Mảng không được giao thì tool tốt cỡ nào cũng không ai tìm (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, mục “Lỗi trong tình huống nằm ở đâu”: narrow decomposition, chia phạm vi và tinh chỉnh nhiều vòng", href: NOTES + "#l-1-2" },
      { label: "Cheatsheet D1: dòng “Subagent đều xong, báo cáo vẫn thiếu mảng” → coordinator chia việc quá hẹp", href: NOTES + "#cheat-d1" }
    ]
  },
  {
    de: 1, n: 35, total: 50, sub: "1.4", subName: "Workflow nhiều bước có cổng chặn và bàn giao",
    first: "C", answer: "C",
    ask: "An agent gets two kinds of requests from customers whose identity has not been verified yet: viewing their order history with sensitive fields masked (read-only, low risk), and issuing a refund (moves money, cannot be undone). The architect wants to put a PreToolUse hook on both tools, but return a different permission decision depending on the risk. Before identity is verified, which pair of <code>permissionDecision</code> values fits the two cases best?",
    scene: [
      "Agent nhận hai loại yêu cầu từ khách chưa xác minh danh tính.",
      "Loại 1: xem lịch sử đơn hàng, các trường nhạy cảm đã che (chỉ đọc, rủi ro thấp). Loại 2: hoàn tiền (chuyển tiền, không đảo ngược được).",
      "Architect muốn đặt hook PreToolUse trên cả hai tool, nhưng trả quyết định quyền khác nhau theo mức rủi ro."
    ],
    asks: [
      "Trước khi xác minh danh tính, cặp giá trị <code>permissionDecision</code> nào hợp nhất cho hai ca?",
      "Tức là: mức kiểm soát của mỗi tool phải tương xứng với rủi ro của chính nó.",
      "Soi cả hai nửa của mỗi cặp: nửa nào chặn thừa chỗ rủi ro thấp, nửa nào thả lỏng chỗ rủi ro cao."
    ],
    facts: [
      "PreToolUse chạy sau khi Claude xin gọi tool, <b>trước khi tool chạy</b>. Lúc đó chưa có gì xảy ra.",
      "PreToolUse trả một trong bốn quyết định: <code>allow</code> (cho chạy), <code>ask</code> (dừng lại hỏi người), <code>deny</code> (từ chối), <code>defer</code> (hoãn). Đề thường chỉ hỏi ba cái đầu.",
      "Docs Agent SDK có sẵn ví dụ tự cho qua tool chỉ đọc bằng <code>allow</code>, và liệt kê việc “require human approval for sensitive actions” (bắt người duyệt hành động nhạy cảm)."
    ],
    opts: [
      { k: "A", gist: "<code>\"deny\"</code> for both the masked order-history lookup and the refund, since every unverified request should be handled the same way whatever the tool is.",
        why: [
          "Đề đòi quyết định khác nhau theo rủi ro, A lại xử lý như nhau.",
          "Chặn luôn việc xem lịch sử đơn đã che dữ liệu là chặn thừa: thao tác chỉ đọc, dữ liệu nhạy cảm đã che, rủi ro thấp (ý 3). Khách chưa xác minh thì không làm được gì cả."
        ] },
      { k: "B", gist: "<code>\"allow\"</code> for both the masked order-history lookup and the refund, since neither action can realistically be undone once the workflow has reached the hook.",
        why: [
          "Lý do sai từ gốc: PreToolUse chạy <b>trước</b> khi tool thực thi (ý 1), lúc đó chưa có gì để mà “cannot be undone” (không đảo ngược được). Chặn trước chính là việc của PreToolUse.",
          "Hệ quả: refund chạy luôn khi chưa xác minh danh tính, tức bỏ hẳn cổng chặn ở đúng chỗ tiền đi ra."
        ] },
      { k: "C", gist: "<code>\"ask\"</code> for the refund and <code>\"allow\"</code> for the masked order-history lookup: the irreversible refund needs a human to confirm it first, while the masked read-only lookup is low risk and can go through automatically.",
        why: [
          "Mức kiểm soát tăng theo rủi ro. Xem lịch sử đơn chỉ đọc, dữ liệu đã che thì <code>allow</code>, đúng kiểu docs tự cho qua tool chỉ đọc (ý 3).",
          "Refund đụng tới tiền và không đảo ngược được thì <code>ask</code>: dừng lại chờ người duyệt rồi mới chạy (ý 2). Đúng việc docs gọi là bắt người duyệt hành động nhạy cảm.",
          "Cả hai nửa đều khớp điều đề đòi: quyết định khác nhau, tương xứng với rủi ro."
        ] },
      { k: "D", gist: "<code>\"ask\"</code> for the masked order-history lookup and <code>\"deny\"</code> for the refund, since the reversible read can tolerate a manual check while the irreversible refund should not go ahead at all.",
        why: [
          "Nửa sau không sai: chặn refund khi chưa xác minh chính là cổng chặn của câu 24.",
          "Nửa đầu mới sai: bắt người duyệt một thao tác chỉ đọc, dữ liệu đã che là tốn công người ở chỗ không có rủi ro. Gọi việc đọc là “reversible” (đảo ngược được) cũng lệch: đọc không thay đổi gì nên chẳng có gì để đảo ngược.",
          "Dễ bị cuốn vì <code>deny</code> cho refund nghe an toàn nhất, lại giống đáp án câu 24. Nhưng phải xét cả hai nửa của cặp: D đặt kiểm soát thủ công vào đúng chỗ rủi ro thấp nhất."
        ] }
    ],
    refs: [
      { label: "Bài 1.5, ô “Đã sửa 02/11”: PreToolUse trả về allow / ask / deny / defer", href: NOTES + "#fix-11" },
      { label: "Bài 1.4: cổng chặn bằng code trước hành động tài chính", href: NOTES + "#l-1-4" },
      { label: "Docs Agent SDK hooks: tự cho qua tool chỉ đọc bằng allow, bắt người duyệt hành động nhạy cảm", href: "https://code.claude.com/docs/en/agent-sdk/hooks" }
    ]
  },
  {
    de: 1, n: 36, total: 50, sub: "1.3", subName: "Gọi subagent, truyền context",
    first: "B", answer: "D",
    ask: "A subagent named “test-runner” is defined with its tools set to <code>[\"Bash\", \"Read\", \"Grep\"]</code>. The coordinator that spawns it has a deny rule in <code>settings.local.json</code> that blocks Bash. When the coordinator hands a task to test-runner, will the subagent be able to run Bash commands?",
    scene: [
      "Subagent tên “test-runner” khai <code>tools</code> là <code>[\"Bash\", \"Read\", \"Grep\"]</code>.",
      "Coordinator gọi nó có luật deny chặn Bash trong <code>settings.local.json</code>.",
      "Chỗ khó: một bên ghi Bash (danh sách tool của subagent), một bên cấm Bash (settings của bên gọi). Phải biết bên nào thắng."
    ],
    asks: [
      "Khi coordinator giao việc cho test-runner, subagent có chạy được lệnh Bash không?",
      "Tức là: luật deny trong settings có áp cho subagent không, và field <code>tools</code> có mở lại được tool đã bị deny không.",
      "Soi cả kết luận (Yes/No) lẫn lý do: có phương án kết luận đúng mà lý do bịa."
    ],
    facts: [
      "Luật <code>permissions.deny</code> trong settings (kể cả <code>settings.local.json</code>) áp cho cả hội thoại chính lẫn subagent.",
      "Field <code>tools</code> của subagent chỉ thu hẹp: chọn trong số tool hội thoại chính đang có, không mở thêm quyền.",
      "Claude Code xét luật theo thứ tự deny → ask → allow, nên deny luôn thắng.",
      "Subagent không cần Task trong <code>tools</code> mới dùng được tool khác. Chỉ khi nó muốn tự tạo subagent con thì mới phải liệt kê tool đó (bản mới tên <code>Agent</code>)."
    ],
    opts: [
      { k: "A", gist: "Yes. Deny rules apply only to the coordinator's own session, so the subagent's Bash calls go through normally.",
        why: [
          "Sai ở giả định: luật deny không chỉ áp cho phiên của coordinator. Docs Claude Code ghi nó “applies to the main conversation and to subagents” (áp cho cả hội thoại chính lẫn subagent) (ý 1).",
          "Subagent chạy trong cùng phiên Claude Code, chịu cùng bộ luật quyền. Mọi lệnh Bash của test-runner đều bị chặn."
        ] },
      { k: "B", gist: "No. A subagent's tools list only takes effect once Task is also listed in it, so Bash stays unavailable to test-runner.",
        why: [
          "Kết luận “No” đúng, lý do bịa. Task (bản mới gọi là <code>Agent</code>) là tool để tạo subagent, test-runner không cần nó mới dùng được Bash, Read, Grep (ý 4).",
          "Bash bị chặn là vì luật deny áp xuống subagent (ý 1), không phải vì thiếu Task.",
          "Dễ bị cuốn vì kết luận đúng, và lý do nghe quen: bài 1.3 có luật “coordinator cần Task trong allowedTools”. Nhưng luật đó áp cho bên <b>gọi</b> subagent, không phải điều kiện để subagent dùng tool của chính nó."
        ] },
      { k: "C", gist: "Yes. The subagent's tools list grants Bash, and that grant overrides the coordinator's deny rule.",
        why: [
          "Sai ở giả định: <code>tools</code> là allowlist (danh sách được dùng) để <b>thu hẹp</b> bộ tool subagent nhận từ hội thoại chính, không phải giấy phép vượt luật deny (ý 2).",
          "Luật xét theo thứ tự deny → ask → allow nên deny luôn thắng (ý 3). Ghi Bash trong <code>tools</code> không mở lại được nó."
        ] },
      { k: "D", gist: "No. The subagent inherits the coordinator's deny rules from <code>settings.local.json</code>, so its Bash calls are blocked.",
        why: [
          "Luật <code>permissions.deny</code> trong <code>settings.local.json</code> áp cho cả subagent (ý 1).",
          "Field <code>tools</code> chỉ chọn ra một phần trong số tool đang được phép, không mở lại tool đã bị deny (ý 2). Nên test-runner liệt kê Bash bao nhiêu thì Bash vẫn bị chặn."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, ô “Đã sửa 02/11”: tools chỉ thu hẹp, luật deny áp cho cả subagent, subagent không cần Task", href: NOTES + "#fix-10" },
      { label: "Bài Nền tảng D3: thứ bắt buộc phải chặn thì đặt luật deny trong settings", href: NOTES + "#l-3-0" },
      { label: "Docs Subagents: luật deny trong settings áp cho cả subagent, tools chỉ thu hẹp bộ tool", href: "https://code.claude.com/docs/en/sub-agents" }
    ]
  },
  {
    de: 1, n: 37, total: 50, sub: "4.6", subName: "Review độc lập và review nhiều lượt",
    first: "C", answer: "C",
    ask: "An architect wants generated code to get an independent review. To save on setup, they resume the same subagent session that just finished writing the code and ask it to review its own diff. Does this count as an independent review instance?",
    scene: [
      "Architect muốn code sinh ra được review độc lập.",
      "Để đỡ công dựng lại, họ resume (mở lại) chính phiên subagent vừa viết code xong, rồi bảo nó review diff của chính nó."
    ],
    asks: [
      "Như vậy có tính là một instance review độc lập không?",
      "Tức là: “độc lập” là tách khỏi cái gì, và phiên được resume còn mang theo những gì."
    ],
    facts: [
      "Subagent được resume giữ “full conversation history, including all previous tool calls, results, and reasoning” (toàn bộ lịch sử, kể cả tool call, kết quả và lập luận trước đó).",
      "Lượt resume giữ nguyên bộ tool của lần chạy đầu.",
      "Model vừa sinh code vẫn giữ lý do lúc viết. Nó đã “tin” cách làm đó đúng, nên khi tự review hay bảo vệ quyết định của mình.",
      "Instance độc lập: một lần gọi hay session mới, context sạch, không thấy reasoning lúc sinh code. Guide 4.6: nó bắt lỗi tinh vi tốt hơn self-review (tự review)."
    ],
    opts: [
      { k: "A", gist: "Yes. The new review prompt sent on resume replaces the generation instructions, so the review pass works only from the diff it is handed.",
        why: [
          "Sai ở giả định: resume không thay gì cả, nó nối tiếp (ý 1).",
          "Prompt review chỉ là một tin nhắn mới nằm sau toàn bộ quá trình sinh code. Reviewer vẫn thấy hết lập luận lúc viết, nên không hề “chỉ làm từ diff”."
        ] },
      { k: "B", gist: "No. A resumed session comes back without its file-read and shell tools, so the reviewer could not inspect the diff it was asked to check.",
        why: [
          "Kết luận “No” đúng, lý do bịa. Lượt resume giữ nguyên bộ tool của lần chạy đầu (ý 2), nên reviewer vẫn đọc được diff.",
          "Vấn đề không nằm ở tool mà ở context nó mang theo (ý 1, ý 3)."
        ] },
      { k: "C", gist: "No. A resumed session brings back its earlier messages, tool calls and reasoning, so the reviewer carries the author's assumptions into the check.",
        why: [
          "Resume khôi phục toàn bộ context lúc sinh code (ý 1). Reviewer là cùng model với cùng lập luận, nên hay bảo vệ quyết định của mình (ý 3).",
          "Độc lập nghĩa là context sạch, không thấy reasoning lúc viết (ý 4). Muốn vậy thì tạo subagent mới, đừng resume."
        ] },
      { k: "D", gist: "Yes. A resumed subagent runs in its own context window, separate from the parent session, so the review is isolated from the architect's conversation.",
        why: [
          "Vế đầu đúng: subagent chạy trong context riêng, tách khỏi phiên cha. Nhưng vế đó trả lời lệch câu hỏi.",
          "Review độc lập cần tách khỏi context của <b>người viết code</b>, tức chính subagent đó (ý 4). Context riêng của subagent này chính là context lúc nó viết code (ý 1).",
          "Dễ bị cuốn vì “own context window” (context window riêng) là sự thật về subagent nên nghe chắc. Nhưng đề hỏi độc lập với ai: review trong context đó vẫn là tự chấm bài mình."
        ] }
    ],
    refs: [
      { label: "Bài 4.6, mục “Chuyện gì đang xảy ra”: model vừa sinh code vẫn giữ lý do lúc viết, instance độc lập thắng self-review", href: NOTES + "#l-4-6" },
      { label: "Cheatsheet D4: dòng “Reviewer độc lập bằng cách resume session của subagent vừa sinh code” → sai", href: NOTES + "#cheat-d4" },
      { label: "Docs Subagents: subagent được resume giữ toàn bộ lịch sử, tool call, kết quả và reasoning", href: "https://code.claude.com/docs/en/sub-agents" }
    ]
  },
  {
    de: 1, n: 38, total: 50, sub: "3.2", subName: "Slash command và skill",
    first: "D", answer: "D",
    ask: "A large compliance reference document that is rarely needed has been pasted into <code>CLAUDE.md</code>. The team notices that every session now starts with a noticeably bigger context footprint, even on days when nobody touches compliance. Assume that once a skill's body is loaded, it stays in context for the rest of that session. Which change cuts the typical per-session cost the most while keeping the reference available when it is actually needed?",
    scene: [
      "Một tài liệu tham chiếu compliance (tuân thủ quy định) rất dài, ít khi cần, bị dán thẳng vào <code>CLAUDE.md</code>.",
      "Giờ phiên nào mở ra cũng tốn thêm nhiều context, kể cả hôm không ai đụng tới compliance.",
      "Đề cho một giả định: thân skill đã nạp thì ở lại trong context tới hết phiên."
    ],
    asks: [
      "Đổi gì để giảm nhiều nhất chi phí <b>thường ngày</b> của mỗi phiên, mà lúc cần vẫn có tài liệu?",
      "Tức là: đặt tài liệu ở chỗ nào để phiên không cần thì không nạp, phiên cần thì vẫn nạp được.",
      "Bốn phương án cùng hứa “Claude applies the reference when a task involves compliance” (Claude dùng tài liệu khi việc có dính compliance). Chỉ cần soi một điều: mỗi chỗ đặt được nạp lúc nào."
    ],
    facts: [
      "<code>CLAUDE.md</code> ở mọi cấp, kể cả <code>~/.claude/CLAUDE.md</code>, nạp vào context đầu mỗi phiên. File cấp user không đi theo git.",
      "Rule trong <code>.claude/rules/</code> không có <code>paths</code> thì nạp mỗi phiên, y như CLAUDE.md. Chỉ rule có <code>paths</code> mới nạp có điều kiện, khi Claude đọc hoặc sửa file khớp glob.",
      "File được <code>@import</code> nạp lúc khởi động và cộng thẳng vào context. <code>@import</code> giúp sắp xếp file, không làm nhỏ context.",
      "Skill: đầu phiên Claude chỉ thấy tên và <code>description</code>. Nội dung đầy đủ của <code>SKILL.md</code> chỉ nạp khi skill được gọi hoặc việc đang làm khớp mô tả."
    ],
    opts: [
      { k: "A", gist: "Move the document into the user-level <code>~/.claude/CLAUDE.md</code> and remove it from the project's <code>CLAUDE.md</code>, so the main file stays short and Claude applies the reference when a task involves compliance.",
        why: [
          "Chỉ đổi chỗ, không đổi cách nạp: <code>~/.claude/CLAUDE.md</code> vẫn nạp mọi phiên (ý 1), nên chi phí không giảm.",
          "Còn tệ hơn: nó theo người đó sang mọi project, còn đồng đội clone repo thì mất tài liệu vì file cấp user không nằm trong git."
        ] },
      { k: "B", gist: "Move the document into a dedicated rules file at <code>.claude/rules/compliance.md</code> and remove it from <code>CLAUDE.md</code>, so the main file stays short and Claude applies the reference when a task involves compliance.",
        why: [
          "Rule không có <code>paths</code> nạp ngay lúc khởi động, docs ghi “with the same priority as <code>.claude/CLAUDE.md</code>” (ngang với CLAUDE.md) (ý 2). Tách file mà không gắn điều kiện thì phiên nào cũng vẫn gánh.",
          "Tài liệu compliance cũng không gắn với loại file nào để đặt <code>paths</code>.",
          "Dễ bị cuốn vì <code>.claude/rules/</code> nghe như cơ chế nạp có điều kiện của bài 3.3. Nhưng chỉ rule có <code>paths</code> mới nạp có điều kiện."
        ] },
      { k: "C", gist: "Move the document into <code>docs/CLAUDE_compliance.md</code> and add an <code>@docs/CLAUDE_compliance.md</code> import to <code>CLAUDE.md</code>, so the main file stays short and Claude applies the reference when a task involves compliance.",
        why: [
          "File được <code>@import</code> nạp cùng lúc với CLAUDE.md gọi nó, tức là lúc khởi động (ý 3).",
          "File chính ngắn đi nhưng context mỗi phiên vẫn y như cũ. Giống phương án <code>@import</code> ở câu 1."
        ] },
      { k: "D", gist: "Move the document into a skill at <code>.claude/skills/compliance-reference/SKILL.md</code> and remove it from <code>CLAUDE.md</code>, so the main file stays short and Claude applies the reference when a task involves compliance.",
        why: [
          "Đầu phiên Claude chỉ thấy tên và <code>description</code> của skill. Toàn bộ <code>SKILL.md</code> chỉ nạp khi gọi skill hoặc khi việc đang làm khớp mô tả (ý 4).",
          "Phiên không đụng compliance thì chỉ tốn vài dòng mô tả, phiên cần thì vẫn có đủ tài liệu.",
          "Ngày cần dùng thì tốn ngang CLAUDE.md, vì thân skill ở lại tới hết phiên như đề giả định. Nhưng đề hỏi chi phí <b>thường ngày</b>."
        ] }
    ],
    refs: [
      { label: "Bài 3.2, mục “Skill hay CLAUDE.md?”: skill chỉ nạp khi cần", href: NOTES + "#l-3-2" },
      { label: "Bài 3.3, khung khái niệm: rule không gắn điều kiện thì nạp mỗi phiên, y như CLAUDE.md", href: NOTES + "#l-3-3" },
      { label: "Bài 3.1, mục “Biết thêm”: “@import không làm nhỏ context”", href: NOTES + "#l-3-1" }
    ]
  },
  {
    de: 1, n: 39, total: 50, sub: "1.2", subName: "Điều phối coordinator–subagent",
    first: "D", answer: "D",
    ask: "A coordinator combines results from its search and analysis subagents into a synthesis report on “emerging risks in supply chain cybersecurity”. The report covers ransomware in depth but says nothing about third-party vendor risk, which was part of the original scope. What should the coordinator do next?",
    scene: [
      "Coordinator gộp kết quả của các subagent tìm kiếm và phân tích thành báo cáo tổng hợp về “emerging risks in supply chain cybersecurity” (rủi ro mới nổi trong an ninh mạng chuỗi cung ứng).",
      "Báo cáo viết rất sâu về ransomware nhưng không có gì về third-party vendor risk (rủi ro từ nhà cung cấp bên thứ ba).",
      "Chỗ khó: mảng vendor risk nằm trong phạm vi ban đầu, và phần ransomware đã làm tốt."
    ],
    asks: [
      "Coordinator nên làm gì tiếp?",
      "Tức là: lấp mảng còn thiếu thế nào cho đúng chỗ, không phí phần đã tốt.",
      "Soi từng phương án: có quay lại bước tìm để có dữ liệu cho mảng thiếu không, và có giữ được phần ransomware không."
    ],
    facts: [
      "Iterative refinement (tinh chỉnh nhiều vòng): coordinator đọc bản tổng hợp, thấy mảng nào thiếu thì giao tìm thêm đúng mảng đó, rồi tổng hợp lại. Lặp đến khi đủ.",
      "Synthesis agent chỉ viết được từ findings nó nhận. Notes xếp “báo cáo thiếu mảng thì đi sửa synthesis agent” vào cột Tệ."
    ],
    opts: [
      { k: "A", gist: "Publish the report with a note that third-party vendor risk is deferred to a follow-up run, then close the task.",
        why: [
          "Giao một báo cáo thiếu phần đã nằm trong phạm vi ban đầu. Ghi chú “deferred” (hoãn lại) chỉ thừa nhận lỗ hổng chứ không lấp.",
          "Coordinator có đủ công cụ để lấp ngay trong lần chạy này: giao tìm thêm rồi tổng hợp lại (ý 1)."
        ] },
      { k: "B", gist: "Throw away the report and the subagent results, then restart the whole pipeline with a broader brief that names vendor risk.",
        why: [
          "Lấp được mảng thiếu, nhưng phí: phần ransomware đã tốt bị vứt đi để làm lại từ đầu.",
          "Chỉ cần giao tìm thêm đúng mảng còn thiếu (ý 1)."
        ] },
      { k: "C", gist: "Re-run the synthesis subagent on the same findings with vendor risk as a required section, then review the draft.",
        why: [
          "Findings hiện có không chứa gì về vendor risk, nên synthesis chạy lại cũng không có dữ liệu để viết (ý 2).",
          "Ép thêm mục bắt buộc thì nó chỉ viết mỏng hoặc bịa. Thiếu dữ liệu thì phải quay lại bước tìm, không phải bước viết.",
          "Dễ bị cuốn vì chỉ chạy lại synthesis nghe rẻ và nhanh. Nhưng chưa ai tìm về vendor risk thì không có findings để viết."
        ] },
      { k: "D", gist: "Check the report for missing topics, then send the search and analysis subagents a vendor-risk query and re-run synthesis.",
        why: [
          "Đúng vòng iterative refinement của guide 1.2 (ý 1): đọc bản tổng hợp, thấy mảng thiếu, giao search và analysis tìm đúng mảng đó, rồi chạy synthesis lại với kết quả mới.",
          "Lấp đúng chỗ thiếu bằng dữ liệu thật, giữ nguyên phần ransomware đã có."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, mục “Lỗi trong tình huống nằm ở đâu”: iterative refinement, tìm chỗ thiếu rồi giao tìm thêm", href: NOTES + "#l-1-2" },
      { label: "Cheatsheet D1: báo cáo thiếu mảng → chia phạm vi và vòng tìm chỗ thiếu", href: NOTES + "#cheat-d1" }
    ]
  },
  {
    de: 1, n: 40, total: 50, sub: "3.3", subName: "Rule theo đường dẫn trong .claude/rules",
    first: "B", answer: "C",
    ask: "A developer has a personal rule at <code>~/.claude/rules/formatting.md</code> and the team's project rule at <code>./.claude/rules/formatting.md</code>. Neither file has a <code>paths</code> field, so both load unconditionally, and they give conflicting formatting guidance. According to the Claude Code memory docs, how should the developer understand the load order and how the conflict gets resolved?",
    scene: [
      "Dev có rule cá nhân ở <code>~/.claude/rules/formatting.md</code>, team có rule project ở <code>./.claude/rules/formatting.md</code>.",
      "Cả hai không có <code>paths</code>, nên đều nạp vô điều kiện.",
      "Chỗ khó: hai file trùng tên, và chỉ dẫn format trong đó trái nhau."
    ],
    asks: [
      "Theo docs memory của Claude Code, thứ tự nạp thế nào, và mâu thuẫn được giải quyết ra sao?",
      "Tức là: bên nào nạp trước, và nạp trước hay sau có quyết định bên nào thắng không.",
      "Soi từng phương án hai vế: thứ tự nạp, rồi kết luận về ưu tiên."
    ],
    facts: [
      "Rule cấp user nạp trước rule project, nên rule project nằm sau trong context.",
      "Không bộ nào đè bộ nào: hai rule mâu thuẫn thì Claude có thể theo bên nào cũng được. Nạp sau chỉ là nằm sau, không phải được ưu tiên.",
      "CLAUDE.md và rule ở các cấp cộng dồn vào context, không cấp nào đè cấp nào.",
      "Đừng lẫn với skill trùng tên (chỉ một bản thắng) hay settings (project đè user)."
    ],
    opts: [
      { k: "A", gist: "User-level rules load first and project rules after them, but a project file with the same name replaces the personal one, so only the project <code>formatting.md</code> enters context.",
        why: [
          "Vế đầu đúng. Vế sau sai: rule không thay nhau theo tên file, cả hai file đều nạp vào context (ý 3).",
          "Cơ chế “trùng tên thì một bản thắng” là của skill, không phải của rule (ý 4)."
        ] },
      { k: "B", gist: "User-level rules load first and project rules after them, and the project file takes precedence on a conflict because project scope is more specific than personal scope.",
        why: [
          "Vế đầu đúng, vế sau sai. Docs ghi: “Neither set overrides the other: if a user rule and a project rule conflict, Claude may follow either one” (không bộ nào đè bộ nào, mâu thuẫn thì Claude có thể theo bên nào cũng được) (ý 2).",
          "Nạp sau chỉ là nằm sau trong context, không phải được ưu tiên.",
          "Dễ bị cuốn vì “cụ thể hơn thì thắng” là trực giác quen từ CSS và từ settings của Claude Code, nơi project đè user (ý 4). Nhưng rule là chỉ dẫn nằm trong context, không phải cấu hình: các cấp cộng dồn, không cấp nào đè cấp nào (ý 3)."
        ] },
      { k: "C", gist: "User-level rules load first and project rules after them, but neither set takes precedence over the other, so on a conflict Claude may end up following either file.",
        why: [
          "Đúng như docs memory: rule cấp user nạp trước rule project, nên rule project nằm sau trong context (ý 1).",
          "Thứ tự nạp chỉ quyết định vị trí, không quyết định ưu tiên (ý 2). Mâu thuẫn thì Claude có thể theo file nào cũng được, nên cách chắc là sửa cho hai file thống nhất."
        ] },
      { k: "D", gist: "Project rules load first and user-level rules after them, so the personal file sits later in context and wins over the team's file on a conflict.",
        why: [
          "Sai thứ tự: docs ghi user nạp trước, project nạp sau (ý 1).",
          "Sai cả kết luận: file nào nằm sau thì cũng không thắng (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 3.1, mục “Biết thêm”: các cấp cộng dồn, không cấp nào đè cấp nào", href: NOTES + "#l-3-1" },
      { label: "Bài 3.3, ô “Đã sửa 02/11”: rule user nạp trước rule project, không bên nào đè bên nào", href: NOTES + "#fix-15" },
      { label: "Docs Memory: rule cấp user nạp trước rule project, không bộ nào đè bộ nào", href: "https://code.claude.com/docs/en/memory" }
    ]
  },
  {
    de: 1, n: 41, total: 50, sub: "3.2", subName: "Slash command và skill",
    first: "D", answer: "A",
    ask: "A developer writes a <code>/fix-issue</code> skill that expects an issue number as input, as in <code>/fix-issue 482</code>. Teammates who invoke it without a number are left unsure what to supply. Which frontmatter field should the developer add to <code>SKILL.md</code> so the autocomplete menu shows teammates what to type?",
    scene: [
      "Developer viết skill <code>/fix-issue</code>, cần một số issue làm tham số, ví dụ <code>/fix-issue 482</code>.",
      "Đồng đội gõ lệnh mà không biết phải đưa gì vào. Đề muốn gợi ý hiện ngay trong menu autocomplete (menu gợi ý bật ra khi đang gõ lệnh).",
      "Chỗ khó: cả bốn phương án đều là trường frontmatter có thật. Phải biết mỗi trường phục vụ ai: người gõ lệnh, Claude, hay thân skill."
    ],
    asks: [
      "Thêm trường frontmatter nào vào <code>SKILL.md</code> để menu autocomplete cho đồng đội thấy cần gõ gì?",
      "Tức là: trường nào hiện ra cho <b>người đang gõ lệnh</b>, ngay sau tên lệnh, báo rằng lệnh cần một số issue.",
      "Soi từng phương án: trường đó phục vụ ai, và có hiện gợi ý tham số trong autocomplete không."
    ],
    facts: [
      "<code>argument-hint</code> là dòng gợi ý hiện trong ô autocomplete lúc gõ lệnh, cho biết lệnh nhận tham số gì. Nó chỉ gợi ý: không bắt buộc nhập, không kiểm tra giá trị.",
      "<code>arguments</code> đặt tên cho tham số theo vị trí, ví dụ <code>arguments: [issue, branch]</code>, để thân skill dùng <code>$issue</code>. Không khai thì thân skill nhận tham số qua <code>$ARGUMENTS</code>.",
      "<code>description</code> là mô tả Claude đọc để quyết định khi nào tự dùng skill. Đầu phiên Claude chỉ thấy mô tả này.",
      "<code>disable-model-invocation: true</code> chặn Claude tự kích hoạt skill. Chỉ người gõ lệnh mới chạy được."
    ],
    opts: [
      { k: "A", gist: "<code>argument-hint: [issue-number]</code>, which displays a placeholder after the command name while teammates are typing it.",
        why: [
          "Đúng trường: docs ghi <code>argument-hint</code> là “hint shown during autocomplete to indicate expected arguments” (gợi ý hiện lúc autocomplete, cho biết lệnh nhận tham số gì) (ý 1).",
          "Khai <code>argument-hint: [issue-number]</code> thì gõ <code>/fix-issue</code> là thấy <code>[issue-number]</code> ngay sau tên lệnh. Đồng đội biết phải gõ số issue.",
          "Nó chỉ là gợi ý: không bắt buộc nhập, không kiểm tra giá trị, không đổi cách skill chạy. Đề cũng chỉ đòi gợi ý."
        ] },
      { k: "B", gist: "<code>disable-model-invocation: true</code>, which stops Claude from launching the skill on its own so only teammates can run it.",
        why: [
          "Trường có thật nhưng làm việc khác: chặn Claude tự nạp skill, chỉ người gõ <code>/fix-issue</code> mới chạy được (ý 4).",
          "Nó không hiện gì về tham số trong menu autocomplete. Đồng đội gõ lệnh vẫn không biết phải đưa số issue."
        ] },
      { k: "C", gist: "<code>description: Fixes a GitHub issue by number</code>, which sets the summary Claude matches requests against when picking skills.",
        why: [
          "Sai đối tượng: <code>description</code> viết cho Claude đọc để chọn skill (ý 3).",
          "Nó nói skill làm gì, không phải gợi ý tham số đặt sau tên lệnh lúc đang gõ."
        ] },
      { k: "D", gist: "<code>arguments: issue-number</code>, which names the positional argument so the skill body can substitute it as <code>$issue-number</code>.",
        why: [
          "Trường có thật nhưng phục vụ thân skill, không phục vụ người gõ. Nó đặt tên cho tham số theo vị trí, để trong <code>SKILL.md</code> viết <code>$tên</code> thay cho <code>$0</code> (ý 2).",
          "Menu autocomplete không hiện gì từ trường này, đồng đội vẫn không biết phải gõ gì.",
          "Dễ bị cuốn vì <code>arguments</code> là trường thật, lại có chữ “argument” giống đề. Nhưng nó chỉ đặt tên để thân skill thay tham số vào. Thứ hiện ra cho người đang gõ lệnh là <code>argument-hint</code>."
        ] }
    ],
    refs: [
      { label: "Bài 3.2, ô “Đã sửa 01/11” về argument-hint: gợi ý hiện trong autocomplete, không bắt buộc", href: NOTES + "#fix-4b" },
      { label: "Bài 3.2, mục “Biết thêm”: tham số qua $ARGUMENTS, hoặc khai arguments rồi dùng $tên", href: NOTES + "#l-3-2" },
      { label: "Docs Skills, bảng frontmatter: argument-hint và arguments", href: "https://code.claude.com/docs/en/skills" }
    ]
  },
  {
    de: 1, n: 42, total: 50, sub: "3.6", subName: "Đưa Claude Code vào CI/CD",
    first: "C", answer: "B",
    ask: "A build script pipes a large build-error log into Claude to get a root-cause explanation: <code>cat build-error.txt | claude -p 'explain the root cause' &gt; output.txt</code>. On one especially verbose failure, the job exits at once with an error and no explanation is written. Given how Claude Code handles piped stdin, what is the most likely cause?",
    scene: [
      "Script build pipe (đẩy qua đường ống) cả file log lỗi vào Claude để xin giải thích nguyên nhân gốc: <code>cat build-error.txt | claude -p 'explain the root cause' &gt; output.txt</code>.",
      "Lệnh này chạy được với các log khác. Chỉ hỏng ở một lần log “especially verbose” (dài bất thường): job thoát ngay, báo lỗi, không có lời giải thích nào.",
      "Chỗ khó: phương án nào cũng đưa ra một lý do nghe kỹ thuật, có tên cờ thật. Phải tìm thứ duy nhất khác giữa lần hỏng và các lần chạy được."
    ],
    asks: [
      "Dựa vào cách Claude Code xử lý stdin được pipe vào, nguyên nhân khả dĩ nhất là gì?",
      "Tức là: cơ chế nào làm <code>claude -p</code> thoát ngay khi input quá lớn, mà các log bình thường vẫn chạy?",
      "Soi từng phương án theo hai dấu hiệu của đề: hỏng <b>ngay</b> (chưa chạy vòng nào), và chỉ hỏng khi log <b>dài bất thường</b>."
    ],
    facts: [
      "Stdin pipe vào <code>claude -p</code> tối đa 10MB. Vượt mức đó Claude Code báo lỗi và thoát với mã khác 0, không xử lý input.",
      "Log quá lớn thì ghi ra file rồi đưa đường dẫn file vào prompt, thay vì pipe.",
      "Text nhiều dòng pipe vào <code>-p</code> chạy bình thường, không cần cờ gì. <code>--input-format stream-json</code> là để gửi message dạng JSON có cấu trúc.",
      "<code>--max-turns</code> là cờ mình tự đặt để giới hạn số vòng agent chạy. Lệnh trong đề không đặt cờ này."
    ],
    opts: [
      { k: "A", gist: "The run hit the default <code>--max-turns</code> limit for <code>-p</code> mode, so Claude Code exited with an error instead of answering the prompt.",
        why: [
          "Sai ở giả định: <code>--max-turns</code> là cờ tự đặt, lệnh trong đề không có (ý 4).",
          "Kể cả khi chạm giới hạn, đó là chuyện xảy ra sau khi Claude đã chạy vài vòng, không phải thoát ngay lúc vừa nhận input.",
          "Lỗi chỉ xảy ra với log dài bất thường, nên phải nghĩ tới kích thước input chứ không phải số vòng."
        ] },
      { k: "B", gist: "The log exceeded the 10MB cap on piped stdin, so Claude Code exited with an error instead of processing the input.",
        why: [
          "Docs ghi: “Piped stdin is capped at 10MB” (stdin pipe vào tối đa 10MB). Vượt mức đó CLI báo lỗi và thoát với mã khác 0, không xử lý input (ý 1).",
          "Khớp đủ hai dấu hiệu của đề: hỏng ngay lúc nhận input, và chỉ hỏng ở log dài bất thường.",
          "Cách xử lý: ghi log ra file rồi đưa đường dẫn vào prompt (ý 2)."
        ] },
      { k: "C", gist: "The piped log spanned multiple lines, which requires <code>--input-format stream-json</code>, so Claude Code exited with an error instead of reading the input.",
        why: [
          "Sai ở giả định: text nhiều dòng pipe vào <code>-p</code> chạy bình thường. <code>--input-format stream-json</code> là để gửi message JSON có cấu trúc (ý 3).",
          "Log build nào cũng nhiều dòng, mà cùng lệnh này vẫn chạy với các log khác. Số dòng không phải thứ khác ở lần hỏng.",
          "Dễ bị cuốn vì “nhiều dòng cần stream-json” nghe kỹ thuật và có tên cờ thật. Nhưng thứ duy nhất khác ở lần hỏng là độ lớn, nên phải nghĩ tới giới hạn 10MB."
        ] },
      { k: "D", gist: "The log contained non-UTF-8 bytes, which <code>-p</code> mode rejects, so Claude Code exited with an error instead of parsing the input.",
        why: [
          "Bịa cơ chế: docs không nói <code>-p</code> từ chối byte ngoài UTF-8 (bảng mã ký tự).",
          "Đề cũng nhấn vào độ dài (“especially verbose”, dài bất thường), không phải ký tự lạ."
        ] }
    ],
    refs: [
      { label: "Bài 3.6, ô “Đã sửa 02/11”: stdin pipe vào tối đa 10MB, lớn hơn thì ghi ra file", href: NOTES + "#fix-16" },
      { label: "Bài 3.6: chạy Claude Code trong CI bằng <code>-p</code>", href: NOTES + "#l-3-6" },
      { label: "Docs Run Claude Code programmatically, mục “Pipe data through Claude”: giới hạn 10MB", href: "https://code.claude.com/docs/en/headless" }
    ]
  },
  {
    de: 1, n: 43, total: 50, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema",
    first: "A", answer: "A",
    ask: "A contract-review tool extracts a <code>governing_law</code> field saying which jurisdiction's law governs a contract. Some contracts state it outright, some point ambiguously at two jurisdictions, and some never mention it. The current enum lists only specific jurisdiction names, so the model is forced to guess in the ambiguous cases. How should the schema be revised?",
    scene: [
      "Công cụ review hợp đồng trích trường <code>governing_law</code>: hợp đồng chịu luật của nơi (vùng tài phán) nào.",
      "Hợp đồng có ba kiểu: ghi rõ một nơi, trỏ mơ hồ tới hai nơi, hoặc không nhắc gì.",
      "Chỗ khó: enum (danh sách giá trị được phép) hiện chỉ có tên các nơi cụ thể, không có ô nào cho ca mơ hồ. Ví dụ minh họa:<pre><code>governing_law: { type: \"string\",\n  enum: [\"Vietnam\", \"Japan\", \"Singapore\"] }</code></pre>",
      "Gặp ca mơ hồ hoặc không nhắc, model buộc phải chọn bừa một nơi trong danh sách."
    ],
    asks: [
      "Sửa schema thế nào?",
      "Tức là: cho model một cách ghi đúng sự thật ở ca mơ hồ và ca không nhắc, mà vẫn giữ tên nơi cụ thể ở ca ghi rõ.",
      "Soi từng phương án: có thêm lối thoát cho ca mơ hồ không, và có làm mất thông tin ở ca ghi rõ không."
    ],
    facts: [
      "Trường bắt buộc mà tài liệu không có thông tin rõ thì model sẽ bịa cho đủ. Với enum, bịa nghĩa là chọn bừa một giá trị trong danh sách.",
      "Guide 4.3: enum phải có lối thoát. Thêm <code>\"unclear\"</code> cho ca mơ hồ, và <code>\"other\"</code> kèm trường <code>detail</code> cho ca ngoài danh sách.",
      "<code>tool_choice</code> ép model gọi tool, nên output luôn đúng cấu trúc. Nó không đổi danh sách giá trị enum cho phép. Schema chỉ bắt cú pháp, không bắt ngữ nghĩa."
    ],
    opts: [
      { k: "A", gist: "Add an <code>\"unclear\"</code> value to the <code>governing_law</code> enum, so the model can return it when a contract names no single jurisdiction.",
        why: [
          "Đúng cách của guide 4.3: enum có lối thoát cho ca mơ hồ (ý 2).",
          "Hợp đồng trỏ hai nơi hoặc không nhắc tới thì ghi <code>\"unclear\"</code>, đúng sự thật, model khỏi chọn bừa (ý 1). Hợp đồng ghi rõ vẫn giữ tên nơi cụ thể.",
          "Code phía sau lọc được các ca <code>\"unclear\"</code> để đưa người xem."
        ] },
      { k: "B", gist: "Replace the <code>governing_law</code> enum with a boolean <code>jurisdiction_mentioned</code>, so the model reports whether the text names a jurisdiction.",
        why: [
          "Sửa một chỗ, hỏng chỗ khác. Boolean chỉ nói có nhắc hay không, mất luôn tên nơi cụ thể ở những hợp đồng ghi rõ.",
          "Ca trỏ hai nơi cũng không biết nên ghi true hay false: có nhắc, nhưng không chốt được nơi nào."
        ] },
      { k: "C", gist: "Set <code>tool_choice</code> to force the extraction tool call, so the model returns a structured <code>governing_law</code> value for every contract.",
        why: [
          "Sai chỗ: ép gọi tool chỉ bảo đảm output đúng cấu trúc, không đổi danh sách giá trị enum (ý 3).",
          "Enum vẫn không có giá trị cho ca mơ hồ hay không nhắc, nên model vẫn phải chọn một nơi cụ thể (ý 1). Đúng vấn đề đề kể, còn nguyên.",
          "Dễ bị cuốn vì <code>tool_choice</code> là kiến thức đúng của bài 4.3. Nhưng nó lo chuyện có gọi tool hay không, còn vấn đề nằm ở danh sách giá trị của enum."
        ] },
      { k: "D", gist: "Pair every jurisdiction in the <code>governing_law</code> enum with an <code>\"ambiguous_\"</code> variant, so the model can flag the one it leans toward.",
        why: [
          "Enum phình gấp đôi mà vẫn bắt model nghiêng về một nơi. Ca trỏ hai nơi thì “nghiêng về” vẫn là đoán.",
          "Ca không nhắc tới thì không có biến thể nào đúng. Một giá trị <code>\"unclear\"</code> làm việc này gọn hơn (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, mục “Thiết kế schema để model không bịa”: nullable, enum thêm “unclear” và “other” + detail", href: NOTES + "#l-4-3" },
      { label: "Bài Nền tảng D4, bảng từ khóa JSON Schema: enum thêm “other” và “unclear” cho ca ngoài danh sách", href: NOTES + "#l-4-0" },
      { label: "Cheatsheet D4: dòng “Category ngoài danh sách, ca mơ hồ”", href: NOTES + "#cheat-d4" }
    ]
  },
  {
    de: 1, n: 44, total: 50, sub: "2.4", subName: "Gắn MCP server vào Claude Code",
    first: "D", answer: "A",
    ask: "An agent connected to a large issue tracker spends many search-tool calls just finding out which issues exist before it can work on any of them. The team wants to cut this exploratory overhead. Which MCP capability addresses the problem directly?",
    scene: [
      "Agent nối với một issue tracker lớn qua MCP.",
      "Trước khi làm được issue nào, nó tốn nhiều lượt gọi tool search chỉ để biết có những issue nào.",
      "Chỗ khó: vấn đề là số lượt gọi thăm dò (“exploratory”, mò xem có gì), không phải mỗi lượt chạy chậm hay bị lỗi."
    ],
    asks: [
      "Năng lực MCP nào giải quyết thẳng vấn đề này?",
      "Tức là: làm sao để agent thấy ngay có những issue nào, mà không phải gọi tool để mò.",
      "Soi từng phương án: làm xong rồi, agent còn phải gọi tool mới biết “có gì” không?"
    ],
    facts: [
      "MCP server phơi ra ba thứ: tools, resources, prompts. Tools cho hành động, resources cho dữ liệu tham khảo.",
      "MCP resources dùng để phơi catalog nội dung (danh sách issue, cây tài liệu, schema DB) cho agent thấy ngay, không cần lượt gọi tool thăm dò.",
      "Transport chỉ là đường host nói chuyện với server: stdio cho process chạy trên máy, HTTP cho server từ xa.",
      "Mỗi tool thêm vào là thêm một lựa chọn model phải cân nhắc ở mọi lượt. Nhiều tool thì độ tin cậy chọn tool giảm (bài 2.3)."
    ],
    opts: [
      { k: "A", gist: "Expose a catalog of issue summaries as an MCP resource on the issue-tracker server, so the agent reads what exists in one step and then picks the issue to work on.",
        why: [
          "Đúng việc của MCP resources: phơi catalog tóm tắt issue cho agent đọc (ý 2).",
          "Agent đọc catalog một bước là thấy có những gì, rồi chọn issue để làm. Chuỗi tool call thăm dò biến mất.",
          "Đúng ranh giới: biết “có gì” là dữ liệu tham khảo, nên dùng resource. Thao tác trên issue là hành động, mới dùng tool (ý 1)."
        ] },
      { k: "B", gist: "Raise the tool-call timeout on the issue-tracker server so each query has time to return a bigger result set and the agent sees more of the backlog per call.",
        why: [
          "Sai ở giả định: đề không kể lỗi timeout. Vấn đề là số lượt gọi thăm dò, không phải mỗi lượt chạy chậm.",
          "Cho query thêm thời gian thì agent vẫn phải gọi tool mới biết có gì, chỉ là mỗi lượt trả về nhiều hơn."
        ] },
      { k: "C", gist: "Move the issue-tracker server from stdio to streamable HTTP transport to lower per-query latency, so the agent finishes gathering information in fewer calls.",
        why: [
          "Sai ở giả định: transport chỉ quyết định server chạy ở đâu và nói chuyện với host bằng gì (ý 3). Nó không đổi số lượt gọi.",
          "Mỗi lượt có nhanh hơn thì agent vẫn chưa biết có issue nào, vẫn phải gọi thăm dò y như cũ."
        ] },
      { k: "D", gist: "Add dedicated query tools to the issue-tracker server, such as filters by status, label, and assignee, so the agent targets specific issues instead of searching broadly.",
        why: [
          "Tool lọc giúp khi agent đã biết mình cần tìm gì. Nhưng mỗi lần lọc vẫn là một tool call, và agent vẫn không có cái nhìn tổng thể từ đầu.",
          "Danh sách tool còn dài thêm, mà nhiều tool thì chọn sai nhiều hơn (ý 4).",
          "Dễ bị cuốn vì tool lọc nghe như giúp agent tìm trúng hơn nên bớt lượt gọi. Nhưng câu agent đang hỏi là “có những issue nào”, không phải “tìm issue có nhãn X”. Muốn thấy có gì mà khỏi gọi tool thì phải đưa dữ liệu ra thành resource."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, mục “Resource: để agent thấy có gì mà không phải mò”", href: NOTES + "#l-2-4" },
      { label: "Cheatsheet D2: dòng “Agent gọi tool liệt kê nhiều lần để biết có dữ liệu gì”", href: NOTES + "#cheat-d2" },
      { label: "Spec MCP, trang Resources", href: "https://modelcontextprotocol.io/specification/2026-07-28/server/resources" }
    ]
  },
  {
    de: 1, n: 45, total: 50, sub: "2.3", subName: "Phân tool cho agent và cấu hình tool_choice",
    first: "D", answer: "D",
    ask: "A code-review subagent was first limited to Read, Grep, and Glob so it could inspect code without changing anything. During a refactor, an engineer also gave it Bash and a <code>deploy_service</code> tool because they “might come in handy.” Soon after, the reviewer starts calling <code>deploy_service</code> in the middle of reviews, on branches nobody has approved. What principle explains this, and what is the right fix?",
    scene: [
      "Subagent review code lúc đầu chỉ có Read, Grep, Glob: đọc và soi code, không sửa gì.",
      "Trong một đợt refactor, kỹ sư cấp thêm Bash và tool <code>deploy_service</code> vì “might come in handy” (biết đâu có lúc cần).",
      "Không lâu sau, reviewer gọi <code>deploy_service</code> ngay giữa lúc review, trên các branch chưa ai duyệt."
    ],
    asks: [
      "Nguyên tắc nào giải thích chuyện này, và sửa thế nào cho đúng?",
      "Tức là: vì sao reviewer lại đi deploy, và cách nào làm nó <b>không thể</b> deploy nữa, chứ không chỉ là “ít khi” deploy.",
      "Soi từng phương án: sửa xong, reviewer còn cầm tool nào ngoài vai trò không, và chặn bằng cấu hình hay chỉ bằng lời dặn."
    ],
    facts: [
      "Least privilege (scoped tool access): mỗi agent chỉ được cấp đúng những tool vai trò của nó cần.",
      "Agent có tool ngoài vai trò thì sẽ dùng, thường là dùng sai (guide bài 2.3).",
      "System prompt và description của tool chỉ là chỉ dẫn, không phải luật cứng. Claude thường theo, nhưng không phải lúc nào cũng theo.",
      "Trường <code>tools</code> của subagent là danh sách cho phép, chỉ thu hẹp bộ tool. Tool không có trong danh sách thì subagent không gọi được."
    ],
    opts: [
      { k: "A", gist: "Add a firm line to the reviewer's system prompt saying deployment is not its job, and keep all five tools so Bash stays available for inspection; the instruction then governs what it calls.",
        why: [
          "Sai ở chỗ trông vào lời dặn: system prompt chỉ là chỉ dẫn, model có thể không theo (ý 3).",
          "Tool còn trong danh sách thì model vẫn gọi được, sự cố có thể lặp lại (ý 2). Giữ Bash cũng là giữ một cửa rất rộng: Bash chạy được lệnh bất kỳ, kể cả lệnh deploy."
        ] },
      { k: "B", gist: "Tighten JSON schema validation on <code>deploy_service</code>, for example a required branch field and parameter format checks, so malformed deploy requests are rejected; the reviewer keeps Bash and its other tools.",
        why: [
          "Sửa sai chỗ: lệnh deploy trong đề không hề sai định dạng. Nó hợp lệ, chỉ là reviewer không được phép deploy.",
          "Schema chặt hơn chỉ chặn request viết sai. Request viết đúng trên branch chưa duyệt vẫn chạy, và reviewer vẫn còn Bash."
        ] },
      { k: "C", gist: "Remove Bash but keep <code>deploy_service</code>, and rewrite its description to say it is only for approved branches so the model can tell when to call it; the reviewer keeps Read, Grep, and Glob.",
        why: [
          "Mới làm được một nửa. Bỏ Bash là đúng, nhưng giữ <code>deploy_service</code> thì reviewer vẫn cầm một tool ngoài vai trò (ý 2).",
          "Description cũng chỉ là chỉ dẫn như system prompt, không chặn được gì (ý 3). Mà kể cả branch đã duyệt thì deploy cũng không phải việc của reviewer.",
          "Dễ bị cuốn vì bỏ Bash trông như đã thu quyền, còn viết lại description nghe đúng bài “mô tả tool cho rõ”. Nhưng description chỉ giúp model chọn tool, không cấm nó gọi. Gốc sự cố là reviewer không nên có tool deploy."
        ] },
      { k: "D", gist: "Take Bash and <code>deploy_service</code> out of the reviewer's tool list and keep only Read, Grep, and Glob, because an agent tends to use whatever tools it has, so its tool set should match what the role needs.",
        why: [
          "Đúng nguyên tắc least privilege của bài 2.3 (ý 1): agent có tool ngoài vai trò thì sẽ dùng (ý 2), nên bộ tool phải khớp vai trò.",
          "Bỏ hai tool khỏi danh sách thì reviewer không thể gọi chúng nữa (ý 4). Chắc chắn, không trông vào việc model nghe lời.",
          "Read, Grep, Glob đủ cho việc đọc và soi code, nên reviewer không mất gì nó cần."
        ] }
    ],
    refs: [
      { label: "Bài 2.3: agent có tool ngoài vai trò thì sẽ dùng sai, giới hạn tool theo vai trò", href: NOTES + "#l-2-3" },
      { label: "Bài 1.3, ô “Đã sửa 02/11”: trường tools của subagent là danh sách cho phép, chỉ thu hẹp", href: NOTES + "#fix-10" },
      { label: "Bài 1.4: prompt là hướng dẫn, muốn chắc chắn thì chặn bằng code", href: NOTES + "#l-1-4" }
    ]
  },
  {
    de: 1, n: 46, total: 50, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới",
    first: "C", answer: "C",
    ask: "An earlier session spent many turns reading and cross-referencing a large data-pipeline codebase. The pipeline has since been heavily refactored, so most of that session's tool results are now stale. The architect already saved the session's final conclusions in a structured summary (progress notes or a summary document) and needs only those conclusions, not the intermediate tool calls, for the next phase. Which way of continuing is more reliable?",
    scene: [
      "Một phiên trước đã tốn nhiều lượt đọc và đối chiếu một codebase pipeline dữ liệu lớn.",
      "Sau đó pipeline bị refactor nhiều, nên phần lớn kết quả tool trong phiên đó đã “stale” (lỗi thời).",
      "Kết luận cuối của phiên đã được lưu sẵn thành bản tóm tắt có cấu trúc. Pha sau chỉ cần các kết luận đó, không cần các tool call trung gian."
    ],
    asks: [
      "Làm tiếp theo cách nào đáng tin hơn?",
      "Tức là: vào pha sau với context không còn kết quả tool cũ, mà vẫn giữ được các kết luận đã chốt.",
      "Soi từng phương án theo hai điều: có kéo theo kết quả tool lỗi thời không, và có mang theo bản tóm tắt không."
    ],
    facts: [
      "Resume mở lại phiên cũ, nạp lại toàn bộ lịch sử, gồm cả kết quả tool. Fork tạo phiên mới bằng cách sao chép lịch sử đó rồi đi tiếp độc lập.",
      "Kết quả tool lỗi thời phản ánh trạng thái cũ của code. Agent không biết nó đã cũ, vẫn tin là đúng.",
      "Guide: khi phần lớn kết quả tool cũ đã lỗi thời, mở phiên mới kèm bản tóm tắt có cấu trúc (phát hiện chính, file quan trọng, quyết định đã chốt) đáng tin hơn resume.",
      "<code>/clear</code> xóa sạch context. Nó dành cho việc khác hẳn, không dùng để làm tiếp việc đang dở."
    ],
    opts: [
      { k: "A", gist: "Fork the earlier session, keeping its history as context, and carry on with the next phase.",
        why: [
          "Sai ở chỗ fork sao chép nguyên lịch sử sang phiên mới (ý 1), tức là sao chép luôn các kết quả tool lỗi thời.",
          "Agent ở nhánh mới vẫn suy luận trên code cũ (ý 2). Fork để rẽ hai hướng từ cùng một gốc, không phải để bỏ dữ liệu cũ."
        ] },
      { k: "B", gist: "Resume the earlier session, keeping its cached tool results as context, and carry on with the next phase.",
        why: [
          "Resume nạp lại cả lịch sử (ý 1), gồm những kết quả tool phản ánh pipeline trước khi refactor.",
          "Agent không biết chúng đã cũ nên vẫn tin, và kết luận sai (ý 2). Resume chỉ hợp khi phần lớn kết quả cũ còn đúng."
        ] },
      { k: "C", gist: "Open a new session seeded with the saved structured summary, and carry on with the next phase.",
        why: [
          "Đúng cách thứ ba của bài 1.7 (ý 3): phiên mới bắt đầu với context trống, bản tóm tắt có cấu trúc mang vào đúng những kết luận pha sau cần.",
          "Kết luận đã lưu sẵn nên không mất gì. Kết quả tool cũ không lọt vào context, nên agent không suy luận trên code cũ."
        ] },
      { k: "D", gist: "Resume the earlier session, run <code>/clear</code> first, then continue the next phase working from the repository.",
        why: [
          "<code>/clear</code> xóa sạch context (ý 4), nên resume rồi clear chẳng khác gì mở một phiên trống.",
          "Phương án này lại không đưa bản tóm tắt vào. Agent mất luôn các kết luận đã chốt và phải dò lại repo từ đầu.",
          "Dễ bị cuốn vì <code>/clear</code> đúng là bỏ được kết quả cũ, nghe như đã xử lý chuyện lỗi thời. Nhưng nó bỏ luôn phần cần giữ. Đề cần context sạch cộng đúng phần kết luận, và chỉ C làm được cả hai."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Ba cách nối lại công việc”: cách 3, phiên mới kèm bản tóm tắt khi kết quả tool đã lỗi thời", href: NOTES + "#l-1-7" },
      { label: "Cheatsheet D1: dòng “Kết quả tool cũ đã lỗi thời”", href: NOTES + "#cheat-d1" },
      { label: "Bài 5.4: /clear dành cho việc khác hẳn, không dùng để làm tiếp việc đang dở", href: NOTES + "#l-5-4" }
    ]
  },
  {
    de: 1, n: 47, total: 50, sub: "1.2", subName: "Điều phối coordinator–subagent",
    first: "A", answer: "A",
    ask: "Two subagents separately research the year a well-known historical event happened. One returns 1969 and the other 1970, each citing a different source. In an orchestrator–subagent design, how should the orchestrator deal with this disagreement before giving the final answer?",
    scene: [
      "Hai subagent cùng tìm năm xảy ra một sự kiện lịch sử nổi tiếng, mỗi con làm riêng.",
      "Một con trả 1969, con kia trả 1970. Mỗi con trích một nguồn khác nhau.",
      "Chỗ khó: cả hai đều có nguồn, orchestrator (agent điều phối, tức coordinator) không có thêm bằng chứng nào để biết bên nào đúng."
    ],
    asks: [
      "Trong thiết kế orchestrator–subagent, orchestrator xử lý chỗ vênh này thế nào trước khi trả lời?",
      "Tức là: hai kết quả có nguồn mà mâu thuẫn nhau thì coordinator giữ mâu thuẫn lại, hay tự dẹp nó đi?",
      "Soi từng phương án: câu trả lời cuối còn cho thấy mâu thuẫn và nguồn của mỗi bên không."
    ],
    facts: [
      "Hub-and-spoke (trục và nan hoa): coordinator giao việc và gom kết quả. Subagent trả kết quả về coordinator, không nói chuyện trực tiếp với nhau.",
      "Hai nguồn uy tín đưa hai giá trị khác nhau: không tự chọn, không lấy trung bình, không chọn nguồn mới hơn. Giữ cả hai kèm nguồn và ghi chú là đang mâu thuẫn (conflict annotation).",
      "Mỗi claim (khẳng định) phải đi kèm nguồn tới tận kết quả cuối. Nguồn rơi mất thì kết quả trông chắc chắn mà không ai kiểm được."
    ],
    opts: [
      { k: "A", gist: "Show the user both years, each with the source its subagent cited, and explain how the two reports differ in year and in source.",
        why: [
          "Đúng cách xử lý mâu thuẫn của bài 5.6 (ý 2): giữ cả hai năm, mỗi năm kèm nguồn, nói rõ hai bên khác nhau ở đâu.",
          "Hai bên đều có trích dẫn, coordinator không có căn cứ để chọn. Đưa cả hai kèm nguồn thì người dùng tự đánh giá được (ý 3), thay vì nhận một kết luận không ai chứng minh."
        ] },
      { k: "B", gist: "Take the year from whichever subagent answered first and present it as the answer, with that subagent's source attached.",
        why: [
          "Sai ở tiêu chí chọn: ai trả về trước chỉ phụ thuộc tốc độ chạy, không nói gì về độ đúng.",
          "Cách này lặng lẽ giấu một nguồn đáng tin ngang bằng (trái ý 2). Người dùng nhận một con số trông chắc chắn mà không biết đang có tranh cãi."
        ] },
      { k: "C", gist: "Mark the research step as failed and return an error to the user instead of an answer, treating the conflicting results as invalid.",
        why: [
          "Sai ở chỗ coi mâu thuẫn là lỗi. Hai subagent đều làm xong việc và có nguồn, đó là kết quả hợp lệ.",
          "Vứt cả hai đi là bỏ phí kết quả. Người dùng không nhận được gì để tự đánh giá."
        ] },
      { k: "D", gist: "Let the two subagents swap findings directly and agree on one year, then report that year to the orchestrator to present.",
        why: [
          "Phá kiểu hub-and-spoke (ý 1): subagent không nói chuyện trực tiếp với nhau, mọi thứ đi qua coordinator.",
          "Hai bên “thỏa thuận” mà không có bằng chứng mới thì vẫn chỉ là chọn một năm (trái ý 2). Mâu thuẫn bị giấu trước khi tới coordinator, nên coordinator và người dùng không biết nó từng có.",
          "Dễ bị cuốn vì để hai agent tự đối chiếu nghe như làm kỹ hơn. Nhưng nó biến mâu thuẫn thành một kết luận trông chắc chắn mà không ai kiểm được."
        ] }
    ],
    refs: [
      { label: "Bài 5.6: số liệu mâu thuẫn giữa hai nguồn thì ghi cả hai kèm nguồn, không tự chọn", href: NOTES + "#l-5-6" },
      { label: "Bài 1.2: hub-and-spoke, subagent không nói chuyện trực tiếp với nhau", href: NOTES + "#l-1-2" },
      { label: "Cheatsheet D5: dòng “Hai nguồn uy tín, hai con số khác nhau”", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 1, n: 48, total: 50, sub: "4.5", subName: "Xử lý theo lô (Batch)",
    first: "C", answer: "C",
    ask: "A support team is building a live chat assistant that has to reply to customers while they are still in the conversation, typing. An engineer suggests sending every chat turn through the Message Batches API to lower token costs. Which assessment of this proposal is most accurate?",
    scene: [
      "Team support làm trợ lý chat trực tiếp: phải trả lời khách ngay lúc khách còn đang gõ, đang chờ.",
      "Một kỹ sư đề xuất gửi mọi lượt chat qua Message Batches API để giảm chi phí token.",
      "Chỗ khó: hai phương án nói “không hợp”, hai phương án nói “hợp”, và lý do nào cũng có phần nghe có căn cứ. Phải xét cả kết luận lẫn lý do."
    ],
    asks: [
      "Đánh giá nào về đề xuất này chính xác nhất?",
      "Tức là: Batches có hợp với việc có người đang ngồi chờ từng câu trả lời không, và vì sao.",
      "Phương án đúng phải đúng cả kết luận lẫn lý do."
    ],
    facts: [
      "Message Batches API: gửi cả lô request một lần, Anthropic xử lý bất đồng bộ (bạn không đứng chờ, quay lại lấy kết quả sau). Giá rẻ 50% so với gọi thường.",
      "Batch không hứa thời gian: tối đa 24 giờ, không có SLA latency (cam kết độ trễ). Docs nói đa số batch xong trong một giờ, nhưng “đa số” không phải cam kết.",
      "Giảm giá 50% của batch cộng dồn được với prompt caching. Caching chỉ làm phần prefix lặp lại (đoạn đầu prompt giống nhau) rẻ hơn, không đổi cách lô được xử lý.",
      "Batch chỉ hợp với việc không ai đang chờ, như báo cáo chạy đêm. Việc có người ngồi chờ thì giữ gọi thường (realtime)."
    ],
    opts: [
      { k: "A", gist: "Unsuitable, because batch requests are priced at a per-token premium over synchronous calls, so short chat turns would cost more, not less.",
        why: [
          "Kết luận “không hợp” thì đúng, nhưng lý do bịa ngược giá: Batches rẻ hơn 50% so với giá chuẩn, không đắt hơn (ý 1).",
          "Đề hỏi đánh giá chính xác nhất, nên phải đúng cả lý do. Phương án này rớt ở đó."
        ] },
      { k: "B", gist: "Suitable, because prompt caching can be used together with batches, which brings replies down to a few seconds once the shared prefix is cached.",
        why: [
          "Vế đầu đúng: giảm giá của batch cộng dồn được với prompt caching (ý 3).",
          "Nhưng caching không biến batch thành gọi đồng bộ. Lô vẫn xử lý bất đồng bộ, có thể tới 24 giờ, không ai hứa vài giây (ý 2)."
        ] },
      { k: "C", gist: "Unsuitable, because batches run asynchronously with no guaranteed turnaround, so a reply could take hours when the customer needs it within seconds.",
        why: [
          "Đúng cả kết luận lẫn lý do: batch xử lý bất đồng bộ, tối đa 24 giờ, không cam kết thời gian (ý 1, ý 2).",
          "Khách đang gõ và chờ từng câu trả lời thì không chờ được như vậy. Rẻ 50% chỉ đáng đổi với việc không ai đứng chờ (ý 4)."
        ] },
      { k: "D", gist: "Suitable, because most batches finish within an hour, which is fine for a chat reply, and the discount lowers the cost per turn.",
        why: [
          "Docs đúng là nói đa số batch xong dưới một giờ, nhưng “đa số” không phải cam kết (ý 2).",
          "Kể cả đúng một giờ thì vẫn quá lâu với khách đang chờ trả lời trong vài giây.",
          "Dễ bị cuốn vì hai vế đều có căn cứ thật (đa số batch xong dưới một giờ, giảm giá 50%). Nhưng chat cần trả lời trong vài giây, và batch còn không hứa mốc thời gian nào."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Chuyện gì đang xảy ra”: batch rẻ 50%, tối đa 24 giờ, không cam kết thời gian", href: NOTES + "#l-4-5" },
      { label: "Bài Nền tảng D4, mục 7 “Khi không ai đứng chờ: Message Batches API”", href: NOTES + "#l-4-0" },
      { label: "Cheatsheet D4: dòng “Pre-merge chặn + báo cáo đêm, sếp muốn Batch cả hai”", href: NOTES + "#cheat-d4" }
    ]
  },
  {
    de: 1, n: 49, total: 50, sub: "3.6", subName: "Đưa Claude Code vào CI/CD",
    first: "D", answer: "D",
    ask: "A GitHub Actions PR-review workflow starts a review, and later in the same job it has to ask a follow-up question through a second <code>claude -p</code> call. The follow-up must explicitly target the same conversation, because several reviews may be running at once on different PRs in parallel jobs. What is the correct approach?",
    scene: [
      "Workflow GitHub Actions review PR: bắt đầu một review, rồi cũng trong job đó phải hỏi thêm một câu bằng lần gọi <code>claude -p</code> thứ hai.",
      "Câu hỏi thêm phải “explicitly” (chỉ đích danh) nhắm đúng hội thoại của lần gọi đầu.",
      "Chỗ khó: nhiều review chạy cùng lúc trên các PR khác nhau, ở các job song song. Cách nào chọn phiên theo kiểu “cái gần nhất” đều có thể lấy nhầm."
    ],
    asks: [
      "Cách làm đúng là gì?",
      "Tức là: lần gọi thứ hai phải nối vào <b>đúng</b> phiên của lần gọi thứ nhất, chọn theo định danh chứ không theo may rủi.",
      "Soi từng phương án: có nối vào phiên cũ không, và chọn phiên bằng gì (ID, thời điểm, hay dựng lại bằng tay)."
    ],
    facts: [
      "Chạy <code>claude -p</code> với <code>--output-format json</code> thì kết quả có trường <code>session_id</code>. Đưa ID đó vào <code>--resume</code> ở lần sau là nạp đúng phiên ấy.",
      "<code>--continue</code> mở phiên gần nhất trong thư mục hiện tại, chọn theo thời điểm. Nhiều người hoặc nhiều job dùng chung một máy thì dễ tiếp nhầm phiên.",
      "<code>--no-session-persistence</code> tắt việc lưu phiên ra đĩa. Docs CLI ghi phiên khi đó “cannot be resumed” (không resume được)."
    ],
    opts: [
      { k: "A", gist: "Add <code>--no-session-persistence</code> to both calls so each job's session stays isolated from reviews running in other jobs.",
        why: [
          "Cờ có thật nhưng làm ngược điều cần: nó tắt việc lưu phiên, phiên “cannot be resumed” (ý 3).",
          "Lần gọi thứ hai khi đó không còn phiên nào để nối vào. Cô lập kiểu này là cô lập luôn khỏi chính lần gọi đầu."
        ] },
      { k: "B", gist: "Send the first call's full prompt plus its review output again in the second call, so the follow-up starts from the same context.",
        why: [
          "Không nối vào phiên cũ, mà dựng lại một bản sao bằng tay. Bản sao chỉ có prompt và output cuối, mất các tool call và file đã đọc giữa chừng.",
          "Lại tốn token gửi lại, trong khi Claude Code có sẵn cách nối đúng phiên bằng ID (ý 1)."
        ] },
      { k: "C", gist: "Add <code>--continue</code> to the second call so it reopens the most recently updated stored conversation and continues from its transcript.",
        why: [
          "<code>--continue</code> chọn phiên gần nhất theo thời điểm, không theo ID (ý 2). Nhiều review chạy cùng lúc thì “gần nhất” có thể là phiên của PR khác.",
          "Đề còn đòi “explicitly” (chỉ đích danh), mà cờ này không chỉ đích danh phiên nào.",
          "Dễ bị cuốn vì <code>--continue</code> ngắn gọn và đúng là nối lại hội thoại. Nhưng nó lấy phiên “gần nhất”, không phải phiên mày chỉ định. Đề cài sẵn hai dữ kiện để loại nó: “explicitly” và nhiều review chạy song song."
        ] },
      { k: "D", gist: "Read <code>session_id</code> from the first call's <code>--output-format json</code> output and pass it to the second call with <code>--resume</code>, loading that transcript.",
        why: [
          "Lần đầu chạy với <code>--output-format json</code> thì kết quả có <code>session_id</code>. Đưa ID đó vào <code>--resume</code> ở lần thứ hai là nạp đúng phiên ấy (ý 1).",
          "Phiên được chọn theo ID chứ không theo thời gian, nên review chạy song song không thể bị lấy nhầm. Đúng chữ “explicitly” đề đòi."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Biết thêm”: --continue khác --resume, lấy session_id từ --output-format json", href: NOTES + "#l-1-7" },
      { label: "Bài 3.6, mục “Biết thêm”: session_id trong output dùng cho --resume ở lần chạy sau", href: NOTES + "#l-3-6" },
      { label: "Docs CLI reference: bảng cờ --continue, --resume, --no-session-persistence", href: "https://code.claude.com/docs/en/cli-reference" }
    ]
  },
  {
    de: 1, n: 50, total: 50, sub: "5.5", subName: "Review người và hiệu chuẩn confidence",
    first: "A", answer: "A",
    ask: "An architect has Claude return a confidence score from 0 to 1 for every extracted field in a structured JSON response. Before these scores are used to decide which fields can skip human review, what should the architect do to make them trustworthy for routing?",
    scene: [
      "Architect cho Claude trả về điểm confidence (độ tự tin) từ 0 tới 1 cho từng trường trích xuất trong JSON.",
      "Định dùng điểm này để quyết trường nào được bỏ qua bước người review.",
      "Chỗ khó: điểm do model tự chấm. Chưa ai biết điểm 0.9 thật sự đúng bao nhiêu phần trăm."
    ],
    asks: [
      "Trước khi dùng điểm để route (chia luồng: tự duyệt hay đưa người), architect phải làm gì để điểm đáng tin?",
      "Tức là: làm sao biết mỗi mức điểm thật sự đúng bao nhiêu, rồi đặt ngưỡng dựa trên con số đo được.",
      "Soi từng phương án: có so điểm với đáp án đúng đã biết không. Không so thì ngưỡng vẫn là đoán."
    ],
    facts: [
      "Self-reported confidence là điểm model tự chấm, chưa đối chiếu với kết quả thật. Điểm 0.9 không có nghĩa là đúng 90%.",
      "Calibration (hiệu chuẩn): so điểm confidence với đúng/sai thật trên một labeled validation set (bộ mẫu đã có đáp án do người gán), để biết mỗi mức điểm thật sự đúng bao nhiêu phần trăm.",
      "Ngưỡng route đặt ở chỗ accuracy (tỉ lệ đúng) đo được đạt mức sai chấp nhận được. Thực tế còn tách theo loại tài liệu và theo trường."
    ],
    opts: [
      { k: "A", gist: "Check, on a labeled validation set of past documents, how often fields at each score level are actually correct, then put the cut-off where the measured accuracy reaches the target.",
        why: [
          "Đúng quy trình hiệu chuẩn của bài 5.5 (ý 2): chạy trên bộ mẫu đã có đáp án mới biết mỗi mức điểm thật sự đúng bao nhiêu.",
          "Đặt ngưỡng ở chỗ accuracy đo được đạt mục tiêu thì ngưỡng mới có căn cứ (ý 3), chứ không dựa vào con số model tự báo (ý 1)."
        ] },
      { k: "B", gist: "Swap the 0-to-1 numbers for high, medium, and low labels defined in the prompt, then let fields labeled high skip review and send the rest to reviewers.",
        why: [
          "Đổi thang đo chứ không giải quyết chuyện chưa kiểm. “High” vẫn là model tự chấm, chưa hề so với đáp án thật (ý 1).",
          "Ba nhãn còn thô hơn thang 0–1, càng khó đặt ngưỡng."
        ] },
      { k: "C", gist: "Put worked examples of well-scored fields in the prompt so the model's numbers follow a consistent scale, then pick the cut-off from a quick look at a few sample outputs.",
        why: [
          "Few-shot (ví dụ mẫu trong prompt) làm con số đều tay hơn, nhưng đều không có nghĩa là đúng.",
          "Nhìn lướt vài output cũng không so điểm với đáp án đã kiểm (ý 2), nên ngưỡng vẫn là đoán."
        ] },
      { k: "D", gist: "Run the extraction several separate times per document, average each field's scores, and set the cut-off on the averaged value to smooth out run-to-run variation.",
        why: [
          "Trung bình nhiều lần giảm nhiễu giữa các lần chạy, nhưng không cho biết điểm khớp tỉ lệ đúng thật tới đâu (ý 2).",
          "Model tự tin sai một cách ổn định thì trung bình vẫn tự tin sai. Tốn gấp mấy lần chi phí mà vẫn chưa hiệu chuẩn.",
          "Dễ bị cuốn vì chạy nhiều lần lấy trung bình nghe có phương pháp thống kê. Nhưng nó chỉ làm con số ổn định hơn, không so với đáp án đúng. Hiệu chuẩn bắt buộc phải có bộ mẫu đã gán nhãn."
        ] }
    ],
    refs: [
      { label: "Bài 5.5, mục “Chuyện gì đang xảy ra” và dạng 2 của “Khi đi thi”: đặt ngưỡng từ labeled validation set", href: NOTES + "#l-5-5" },
      { label: "Bài Nền tảng D5, mục 4: hiệu chuẩn confidence là gì, bảng ví dụ theo dải điểm", href: NOTES + "#l-5-0" },
      { label: "Cheatsheet D5: dòng “Model xuất confidence, muốn đặt ngưỡng route”", href: NOTES + "#cheat-d5" }
    ]
  }
);
