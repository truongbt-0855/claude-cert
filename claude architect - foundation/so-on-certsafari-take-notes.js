// Take note của Sổ ôn: ghi chú tổng hợp theo chủ đề, giải thích nghĩa và lúc nào chọn, lúc nào loại.
// TAKE_NOTES: { id, title, date, subs, sections: [{ h, tone?: "ok"|"bad", p?, items }], refs }.
// items: chuỗi HTML, hoặc { t: chuỗi HTML, qs: ["de1-q50", ...] } khi cần ô số câu liên quan (bấm để nhảy tới câu).
// Lệnh kiểm báo lỗi nếu qs trỏ tới câu không có trong sổ. s = { entries, idOf, chip(x, label) }
function renderTakeNotes(el, s) {
  var byId = {};
  s.entries.forEach(function (x) { byId[s.idOf(x)] = x; });
  function chips(qs) {
    var html = (qs || []).map(function (id) { var x = byId[id]; return x ? s.chip(x, "Đ" + x.de + "·" + x.n) : ""; }).join("");
    return html ? '<span class="chips">' + html + "</span>" : "";
  }
  function item(it) { return typeof it === "string" ? "<li>" + it + "</li>" : "<li>" + it.t + chips(it.qs) + "</li>"; }
  function section(sec) {
    return '<section class="tn-sec' + (sec.tone ? " " + sec.tone : "") + '"><h4>' + sec.h + "</h4>" +
      (sec.p ? "<p>" + sec.p + "</p>" : "") + "<ul>" + sec.items.map(item).join("") + "</ul></section>";
  }
  el.innerHTML = "<h2>Take note</h2>" +
    '<p class="muted">Ghi chú tổng hợp các ý hay nhầm khi làm đề: nghĩa của từng thứ, và lúc nào chọn, lúc nào loại.</p>' +
    TAKE_NOTES.map(function (n) {
      var refs = (n.refs || []).map(function (r) { return '<li><a href="' + r.href + '" target="_blank" rel="noopener">' + r.label + "</a></li>"; }).join("");
      return '<article class="tn" id="note-' + n.id + '"><h3>' + n.title + '</h3><p class="muted">' + n.date + " · bài " + n.subs + "</p>" +
        n.sections.map(section).join("") + (refs ? '<section class="tn-sec"><h4>Đọc lại</h4><ul class="refs">' + refs + "</ul></section>" : "") + "</article>";
    }).join("");
}

var TAKE_NOTES = [
  {
    id: "confidence-score", title: "Model tự chấm confidence, và các loại score", date: "05/11/2026", subs: "5.5 · 5.2 · 4.1 · 4.6",
    sections: [
      { h: "Hai thứ này khác gì nhau", items: [
        "<b>Confidence tự báo:</b> model tự chấm câu trả lời của <i>chính nó</i> đúng tới đâu, ví dụ <code>0.92</code>, “8/10”, “high confidence” (rất tự tin).",
        "Đề viết “rate its confidence” (tự chấm độ tin), “self-rated confidence score” (điểm tự tin do model tự chấm), hay “only report findings you are confident about” (chỉ báo cái mày chắc): cùng một thứ, đều là model tự chấm mình.",
        "Con số đó chưa đối chiếu với kết quả thật. “0.9” không có nghĩa là đúng 90%. Model hay tự tin đúng ở chỗ nó sai.",
        "<b>Score khác:</b> đo một thứ bên ngoài model, không đo “tao đúng không”. Sentiment (khách bực tới đâu), relevance (liên quan tới đâu), credibility (nguồn đáng tin tới đâu), severity (nặng tới đâu), urgency (gấp tới đâu).",
        "Sentiment đo tâm trạng, không đo độ khó. Khách bực vì phí trùng là ca dễ. Khách lịch sự xin ngoại lệ policy là ca khó.",
        "<b>Hiệu chuẩn (calibration):</b> đối chiếu điểm với đúng/sai thật trên bộ mẫu người đã gán đáp án (labeled validation set), để biết mỗi mức điểm thực sự đúng bao nhiêu phần trăm.",
        "Đúng hay sai không nằm ở chữ “confidence” hay “score”, mà ở hai câu: con số được giao <b>việc gì</b>, và nó <b>đã hiệu chuẩn</b> chưa."
      ] },
      { h: "Khi nào chọn, khi nào loại", items: [
        "<b>Chọn</b> phương án có confidence khi đủ ba điều:<ul><li>con số dùng để sắp ưu tiên gửi người review, không phải chặn, quyết thay, hay bù thông tin thiếu;</li><li>đã hiệu chuẩn trên mẫu có nhãn, tốt nhất chia theo loại tài liệu và trường;</li><li>mịn đúng mức (từng trường, từng finding), báo hết rồi lọc sau. Có instance độc lập chấm thì càng tốt.</li></ul>",
        "<b>Loại</b> khi:<ul><li>đề đòi bảo đảm (“never”, “guarantee”, “must”: không bao giờ, bảo đảm, bắt buộc): phải chặn bằng code như hook hay rút tool, confidence chỉ là xác suất;</li><li>lỗi gốc là thiếu tiêu chí, ví dụ, dữ liệu, dữ kiện hay thứ tự: tự chấm không bù được cái còn thiếu;</li><li>cần review độc lập: tự chấm trong cùng phiên mang đúng điểm mù của phiên đó;</li><li>con số chưa hiệu chuẩn, hoặc được “chữa” bằng trung bình nhiều lần chạy, tự phê bình, dặn “chấm dè dặt hơn”.</li></ul>",
        "<b>Sentiment và score khác:</b> không bao giờ làm cò chuyển người. Chỉ đúng khi là dữ liệu đi kèm đúng việc của nó, như relevance score trong bản ghi gọn."
      ] }
    ],
    refs: [
      { label: "Bài Nền tảng D5: định nghĩa Self-reported confidence, Calibration, bảng hiệu chuẩn minh họa", href: NOTES + "#l-5-0" },
      { label: "Bài 5.2: escalate theo tiêu chí viết ra, không theo sentiment hay confidence tự báo", href: NOTES + "#l-5-2" },
      { label: "Bài 5.5: hiệu chuẩn confidence, chia theo loại tài liệu và trường, lấy mẫu review", href: NOTES + "#l-5-5" },
      { label: "Bài 4.1: “only high-confidence” không thay được tiêu chí rõ", href: NOTES + "#l-4-1" },
      { label: "Bài 4.6: đừng để model tự chấm bài mình, review độc lập", href: NOTES + "#l-4-6" }
    ]
  },
  {
    id: "tools-commands", title: "Tool và lệnh hay ra: Glob, Grep, Read, Edit, tool_choice, CLI, slash", date: "07/11/2026", subs: "2.5 · 2.3 · 1.7 · 3.6 · 3.4 · 5.4",
    sections: [
      { h: "Tool có sẵn: tool nào làm việc gì", items: [
        "<b>Glob:</b> tìm file theo <b>tên, đường dẫn</b>, ví dụ <code>**/*.handler.ts</code>, <code>config/**/*.{yaml,json}</code>. Không nhìn vào nội dung file.",
        "<b>Grep:</b> tìm theo <b>nội dung</b> trong file: tên hàm, tên biến, chỗ gọi hàm. Dùng regex của ripgrep, nên ký tự đặc biệt phải escape, ví dụ <code>interface\\{\\}</code>. Lọc loại file bằng tham số glob hoặc type.",
        "<b>Read:</b> đọc một file. File quá to thì đọc từng đoạn bằng <code>offset</code> (dòng bắt đầu) và <code>limit</code> (số dòng).",
        "<b>Edit:</b> thay <code>old_string</code> bằng <code>new_string</code>. <code>old_string</code> phải khớp <b>đúng một chỗ</b>, từng ký tự, kể cả thụt lề. Muốn thay mọi chỗ khớp thì <code>replace_all: true</code>.",
        "<b>Write:</b> ghi đè <b>cả file</b>. Đưa vào một dòng thì file chỉ còn đúng dòng đó.",
        "<b>Bash:</b> chạy lệnh shell (npm, git, curl…). Làm được nhiều nhất nên hay là chỗ cần chặn.",
        "<b>WebFetch:</b> tải một trang web. Chặn WebFetch mà Bash còn mở thì <code>curl</code> vẫn tải được.",
        "<b>Agent</b> (tên cũ <b>Task</b>): tạo subagent. Coordinator muốn giao việc thì <code>Agent</code> phải có trong <code>allowedTools</code>. Transcript bản SDK cũ ghi tên <code>Task</code>, bản mới ghi <code>Agent</code>.",
        "<b>Explore:</b> subagent có sẵn, chỉ đọc và tìm, chạy trong context riêng rồi trả về bản tóm tắt. Không tự nạp CLAUDE.md, và vẫn tính vào usage.",
        "<b>AskUserQuestion:</b> hỏi lại người dùng. Muốn agent phỏng vấn trước khi làm thì phải có tool này. Subagent không hỏi người dùng được, nên phỏng vấn phải ở phiên chính."
      ] },
      { h: "Glob, Grep, Read, Edit, Write: đề hay hỏi gì", items: [
        "Tìm file theo tên thì Glob. Tìm chỗ trong code nhắc tới X thì Grep.",
        "Lần theo luồng code: Grep tìm điểm vào, Read đúng file đó, rồi đi theo import sang file kế. Không đọc hết <code>src/</code>, đầy context.",
        "Hàm được re-export dưới tên khác (alias): Read file export để lấy đủ các tên, rồi Grep từng tên.",
        "Grep chỉ ra một hàm bọc (wrapper): Grep tiếp tên wrapper để tìm chỗ gọi nó.",
        "Biết sẵn vài tên cần tìm: coordinator tự Grep từng tên. Sinh một subagent cho mỗi tên thì chậm và chỉ nhận về bản tóm tắt mơ hồ.",
        "Edit báo khớp nhiều chỗ: thêm dòng xung quanh vào <code>old_string</code> tới khi chỉ khớp một chỗ.",
        "Edit báo không khớp: Read lại file, chép đúng từng ký tự, kể cả thụt lề.",
        "Edit hết cách (nhiều khối giống hệt, thêm ngữ cảnh vẫn trùng): Read cả file, sửa trong nội dung, rồi Write lại toàn bộ.",
        "Sửa một dòng trong file ghi chú: dùng Edit. Write với một dòng sẽ xóa mất phần còn lại."
      ] },
      { h: "Phân quyền tool", items: [
        "<code>tools: [\"Read\", \"Grep\"]</code> trong AgentDefinition là danh sách cho phép (allowlist): subagent chỉ có đúng các tool này. Reviewer chỉ đọc thì không cho Edit, Write.",
        "Agent có tool nào sẽ dùng tool đó, nên chỉ cho đúng những tool vai trò cần.",
        "<code>disallowedTools</code> (frontmatter skill: <code>disallowed-tools</code>): gỡ hẳn tool khỏi danh sách được gọi, ví dụ <code>mcp__github__*</code>.",
        "<code>allowed-tools</code> trong frontmatter skill: chỉ <b>bỏ bước hỏi quyền</b> khi skill chạy. Tool ngoài danh sách vẫn gọi được, chỉ là phải hỏi.",
        "Quyền Bash nên có phạm vi, ví dụ <code>Bash(npm run *)</code>. Có dấu cách trước <code>*</code> mới tách từ: <code>Bash(npm run migrate*)</code> khớp luôn <code>migrate-cleanup</code>.",
        "Lệnh nối bằng <code>&amp;&amp;</code>: từng phần được xét quyền riêng.",
        "Subagent kế thừa deny rule của agent cha.",
        "Cần <b>bảo đảm</b> một lệnh không bao giờ chạy (push lên main, <code>terraform apply</code>, gọi host production): hook <code>PreToolUse</code> khớp Bash rồi từ chối. Dòng dặn trong CLAUDE.md hay system prompt không bảo đảm được."
      ] },
      { h: "tool_choice (Messages API)", items: [
        "<code>auto</code>: Claude tự quyết, có thể trả lời bằng text mà không gọi tool. Đây là mặc định.",
        "<code>any</code>: bắt buộc gọi một tool, Claude tự chọn tool nào. Hợp khi có nhiều schema mà tài liệu không có nhãn loại.",
        "<code>{\"type\": \"tool\", \"name\": \"X\"}</code>: ép gọi đúng tool X. Hợp khi bước đầu bắt buộc phải là X (lấy metadata, xác minh khách).",
        "<code>none</code>: không cho gọi tool.",
        "Đã ép tool thì không có đoạn text suy luận đứng trước lời gọi.",
        "Ép tool cùng extended thinking thì lỗi 400. Thinking chỉ đi với <code>auto</code> hoặc <code>none</code>.",
        "Muốn đúng một lời gọi: thêm <code>disable_parallel_tool_use: true</code> vào object <code>tool_choice</code>.",
        "Lượt đầu đã ép thì lượt sau trả về <code>auto</code>, không thì Claude cứ gọi lại tool đã ép.",
        "Lấy kết quả ở block có <code>type: \"tool_use\"</code>, đọc <code>input</code>. Không <code>JSON.parse</code> phần text.",
        "Đã <code>any</code> mà vẫn chọn nhầm tool: sửa description từng tool, nói rõ khi nào dùng cái nào."
      ] },
      { h: "CLI claude: chạy trong CI và mở lại phiên", items: [
        "<code>claude -p \"...\"</code> (print mode): chạy không tương tác, in kết quả rồi thoát. CI thiếu <code>-p</code> thì treo tới hết timeout. Dữ liệu pipe vào stdin tối đa 10MB.",
        "<code>--output-format json</code>: trả về JSON có <code>session_id</code> và <code>result</code>. Giữ <code>session_id</code> để lượt sau resume đúng phiên.",
        "<code>--json-schema</code>: kết quả đúng schema, nằm ở trường <code>structured_output</code>. Chỉ nhận khi <code>subtype</code> là <code>success</code> <b>và</b> có <code>structured_output</code>.",
        "<code>--resume &lt;id hoặc tên&gt;</code>: mở lại đúng phiên đó. Không truyền gì thì hiện danh sách để chọn.",
        "<code>--continue</code>: mở phiên <b>gần nhất</b> trong thư mục. Sai khi có phiên khác chạy xen vào giữa.",
        "<code>--name X</code>: đặt tên phiên để sau này <code>--resume X</code>.",
        "<code>--fork-session</code> (SDK: <code>fork_session</code>): rẽ nhánh từ phiên cũ thành phiên mới, phiên gốc giữ nguyên. Dùng để thử hai hướng từ cùng một điểm. Fork không hoàn tác việc đã làm thật, ví dụ refund đã chuyển.",
        "<code>--no-session-persistence</code>: không lưu transcript, nên không resume được.",
        "<code>--permission-mode plan</code>: chỉ lập kế hoạch, không sửa file. <code>acceptEdits</code>: tự duyệt việc sửa file, lệnh shell khác vẫn hỏi.",
        "<code>--bare</code>: chạy tối giản, không nạp CLAUDE.md, hook, skill, MCP. CI bỏ qua tiêu chí viết trong CLAUDE.md thì bỏ cờ này.",
        "<code>claude mcp reset-project-choices</code>: lỡ từ chối MCP server trong <code>.mcp.json</code> thì chạy lệnh này để được hỏi duyệt lại."
      ] },
      { h: "Lệnh slash trong phiên", items: [
        "<code>/compact</code> (kèm dặn chỗ cần giữ): tóm tắt hội thoại khi context gần đầy mà việc sau <b>vẫn cần</b> kết luận cũ. Tóm tắt hay rơi chi tiết (con số, file:dòng); muốn giữ thì ghi ra file scratchpad.",
        "<code>/clear</code>: xóa trắng context khi việc mới <b>không liên quan</b> việc cũ.",
        "<code>/fork</code>: rẽ nhánh hội thoại ngay trong terminal, nhánh cũ giữ nguyên.",
        "<code>/resume X</code>: chuyển sang một phiên đã lưu.",
        "<code>/rewind</code>: quay hội thoại và code về một điểm trước đó.",
        "<code>/context</code>: xem cái gì đang chiếm context, gồm file memory và rule đã nạp.",
        "<code>/memory</code>: xem và mở các file CLAUDE.md đang được nạp."
      ] },
      { h: "Plan mode hay làm thẳng", items: [
        "<b>Plan mode:</b> Claude chỉ đọc và đề xuất kế hoạch, chưa sửa gì. Hợp khi sửa nhiều file, có nhiều cách làm, hoặc code chưa quen.",
        "<b>Làm thẳng (direct execution):</b> đã biết chính xác sửa gì, gói trong một file.",
        "Kế hoạch đã duyệt thì làm thẳng, không lập kế hoạch lại cho từng file. Kế hoạch sai một bước thì từ chối kèm góp ý để Claude sửa.",
        "Kết quả tìm kiếm làm đầy context: giao Explore. Khám phá nhiều lượt, lượt sau dựa vào lượt trước: subagent general-purpose, vì resume được."
      ] },
      { h: "Khi nào chọn, khi nào loại", items: [
        "<b>Chọn</b> khi:<ul><li>tool khớp đúng việc: tên file thì Glob, nội dung thì Grep, sửa một chỗ thì Edit;</li><li>đi từng bước: Grep tìm chỗ, Read đúng file, đi theo import;</li><li>cần bảo đảm thì dùng cơ chế cứng: hook <code>PreToolUse</code>, rút tool khỏi danh sách, <code>tool_choice</code> ép tool;</li><li>tool của subagent khớp đúng vai trò.</li></ul>",
        "<b>Loại</b> khi:<ul><li>đọc hết mọi file, hoặc sinh subagent cho từng việc tìm nhỏ;</li><li>dặn bằng lời thay cho cơ chế cứng khi đề đòi bảo đảm;</li><li>viết hoa dặn “CRITICAL”, “MUST” (cực kỳ quan trọng, bắt buộc): model dùng tool cả khi không cần, nên sửa bằng lời bình thường nói rõ khi nào dùng;</li><li>nhầm <code>allowed-tools</code> (bỏ hỏi quyền) với <code>disallowed-tools</code> (gỡ tool);</li><li>nhầm <code>--continue</code> (phiên gần nhất) với <code>--resume</code> (đúng phiên chỉ định);</li><li>nhầm <code>/compact</code> (giữ kết luận) với <code>/clear</code> (xóa trắng).</li></ul>"
      ] }
    ],
    refs: [
      { label: "Bài 2.5: chọn built-in tool đúng việc", href: NOTES + "#l-2-5" },
      { label: "Bài 2.3: chia tool cho agent và tool_choice", href: NOTES + "#l-2-3" },
      { label: "Bài 1.7: phiên làm việc, resume, fork", href: NOTES + "#l-1-7" },
      { label: "Bài 3.6: đưa Claude Code vào CI/CD", href: NOTES + "#l-3-6" },
      { label: "Bài 3.4: plan mode hay làm thẳng", href: NOTES + "#l-3-4" },
      { label: "Bài 5.4: quản lý context khi khám phá codebase lớn", href: NOTES + "#l-5-4" }
    ]
  }
];
