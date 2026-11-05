// Sổ ôn certsafari, Đề 6. Trang so-on-certsafari.html nạp file này trước script render.
// Mỗi câu một phần tử, xếp theo n. Các trường:
//   de, n, total     số đề trong sổ; số thứ tự câu trong đề gốc; tổng số câu của đề gốc
//   sub, subName     task statement của guide (vd "3.2") và tên bài bằng tiếng Việt
//   scen             (tùy chọn) scenario của câu, khóa trong SCENARIOS của trang (vd "S2")
//   first            (tùy chọn) đáp án user chọn lần đầu trên đề gốc
//   answer           đáp án đúng, đã kiểm bằng notes ôn thi hoặc docs chính thức; câu chọn hai viết "BD" (xếp tăng dần)
//   dispute          (tùy chọn) khi đáp án gốc của đề khác answer: vì sao sổ chọn khác
//   ask, opts[].gist tiếng Anh, viết lại bằng lời riêng (không chép nguyên văn); ask chỉ gồm phần QUESTION, scenario nằm ở khung riêng
//   scene, asks, facts, opts[].why, refs[].label  tiếng Việt
//   refs[].href      NOTES + "#<id có trong notes>"
DE[6] = "Udemy · Practice Test 3 · 60 câu · 04/11/2026";
ENTRIES.push(
  {
    de: 6, n: 1, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code", scen: "S1",
    answer: "B",
    ask: "An engineer is prototyping a <code>mock_refund_ledger</code> MCP server to exercise refund edge cases. The server is unstable, must stay out of the repository, and should be available only to that engineer, across all of their local projects. Where should it be configured?",
    scene: [
      "Một kỹ sư đang thử một MCP server giả lập sổ hoàn tiền (<code>mock_refund_ledger</code>) để test các ca hoàn tiền khó.",
      "Server còn chập chờn. Đề đặt ba điều kiện: không vào repo, chỉ mình người đó thấy, và dùng được ở mọi project trên máy người đó.",
      "Chỗ khó: <code>~/.claude/settings.json</code> và <code>~/.claude.json</code> tên gần giống nhau, cùng nằm trong thư mục home, nhưng chỉ một file giữ cấu hình MCP."
    ],
    asks: [
      "Cấu hình server này ở đâu?",
      "Tức là: chọn chỗ vừa cá nhân, vừa áp cho mọi repo của người đó, vừa đúng là nơi Claude Code đọc cấu hình MCP.",
      "Soi từng phương án ba câu: Claude Code có đọc MCP server từ chỗ đó không? Ai thấy server? Server có mặt ở những repo nào?"
    ],
    facts: [
      "Claude Code chỉ đọc cấu hình MCP server từ hai file: <code>.mcp.json</code> ở gốc repo và <code>~/.claude.json</code> trong thư mục home.",
      "Ba scope MCP. Local: mặc định của <code>claude mcp add</code>, lưu ở <code>~/.claude.json</code> dưới mục của một project, chỉ bạn thấy, chỉ ở repo đó. Project: <code>.mcp.json</code>, commit vào git, cả team có. User: cũng ở <code>~/.claude.json</code>, chỉ bạn thấy, có ở mọi repo trên máy.",
      "<code>~/.claude/settings.json</code> là file settings của user: theme, model mặc định, luật permission riêng. Docs tách nó khỏi <code>~/.claude.json</code>, file Claude Code tự ghi để giữ thông tin tài khoản, cấu hình MCP server và trạng thái từng project.",
      "CLAUDE.md là chỉ dẫn và ngữ cảnh cho Claude. Nó không kết nối được MCP server nào."
    ],
    opts: [
      { k: "A", gist: "Declare it in <code>~/.claude/settings.json</code>, the user settings file that governs how Claude Code behaves.",
        why: [
          "Sai file: <code>~/.claude/settings.json</code> giữ settings (permission, model, theme), không phải nơi Claude Code đọc MCP server (ý 1, ý 3).",
          "Khai server ở đây thì Claude Code không nạp nó, kỹ sư không có server để test.",
          "Dễ bị cuốn vì file này đúng là của riêng user và áp cho mọi project, khớp hai điều kiện. Nhưng tên gần giống không làm nó thành file cấu hình MCP. File đúng là <code>~/.claude.json</code>, không có <code>/settings</code>."
        ] },
      { k: "B", gist: "Register it in the user-scoped <code>~/.claude.json</code> file, so it stays private to that engineer's machine.",
        why: [
          "User scope ghi server vào <code>~/.claude.json</code> (ý 2). File này không thuộc repo, nên không bao giờ bị commit.",
          "Chỉ tài khoản của kỹ sư đó trên máy đó thấy server, và server có ở mọi project của họ. Đủ cả ba điều kiện.",
          "Lệnh: <code>claude mcp add --scope user …</code>. Quên <code>--scope</code> thì server rơi vào local, chỉ có ở một repo."
        ] },
      { k: "C", gist: "Add it to the project's <code>.mcp.json</code> file, so everyone who pulls the repository gets it.",
        why: [
          "Chạy được, nhưng phạm điều kiện: <code>.mcp.json</code> commit vào git, ai pull repo cũng có (ý 2).",
          "Một server chập chờn đến tay cả team, đồng đội còn bị hỏi duyệt server trước khi dùng. Server cũng chỉ có ở repo này, không theo kỹ sư sang project khác."
        ] },
      { k: "D", gist: "Describe the server's tools in the project <code>CLAUDE.md</code>, so the agent knows which calls are available.",
        why: [
          "Sai cơ chế: CLAUDE.md chỉ là chữ hướng dẫn, không kết nối server (ý 4). Agent đọc được tên tool nhưng không gọi được.",
          "CLAUDE.md của project cũng commit vào repo, trái điều kiện “stay out of the repository” (không vào repo)."
        ] }
    ],
    refs: [
      { label: "Bài 2.4: bảng ba scope local, project, user và nơi lưu từng scope", href: NOTES + "#l-2-4" },
      { label: "Docs “Settings files and precedence”: ~/.claude/settings.json là settings của user, còn ~/.claude.json là file Claude Code tự ghi, giữ cấu hình MCP server", href: "https://code.claude.com/docs/en/settings" }
    ]
  },
  {
    de: 6, n: 2, total: 60, sub: "5.5", subName: "Review người và hiệu chuẩn confidence", scen: "S1",
    answer: "C",
    ask: "The agent pulls charge amounts, order numbers and dispute reasons out of billing emails, and outputs a confidence value for each field. Overall accuracy on a labeled validation set is 97%, so the team plans to stop reviewing high-confidence outputs. What should they do first?",
    scene: [
      "Agent đọc email billing, trích ba trường: số tiền bị tính, mã đơn, lý do khiếu nại. Mỗi trường kèm một điểm confidence (độ tự tin) do model tự báo.",
      "Trên bộ validation đã gán nhãn, accuracy tổng là 97%. Team định bỏ review người cho mọi output có confidence cao.",
      "Chỗ khó: 97% là con số gộp của ba trường và nhiều loại yêu cầu. Nó có thể che một nhóm nhỏ sai rất nhiều, ví dụ lý do khiếu nại lấy từ email bị chuyển tiếp nhiều lần."
    ],
    asks: [
      "Việc đầu tiên team nên làm là gì?",
      "Tức là: trước khi bỏ review, cần bằng chứng gì để biết chỗ nào thật sự an toàn để tự động.",
      "Soi từng phương án: nó đo accuracy thật trên bộ có nhãn, theo từng phân khúc? Hay chỉ chỉnh lại con số confidence mà model tự báo?"
    ],
    facts: [
      "Accuracy gộp (aggregate accuracy) có thể che một phân khúc làm kém. Guide 5.5 đòi đo accuracy theo loại tài liệu và theo trường trước khi tự động hóa, và chỉ tự động phần đã ổn định ở mọi phân khúc.",
      "Confidence do model tự báo chưa được hiệu chuẩn: model nói 0.9 không có nghĩa là đúng 90%. Hiệu chuẩn (calibration) là đối chiếu điểm đó với đúng/sai thật trên bộ có nhãn.",
      "Bộ có nhãn (labeled validation set) là dữ liệu đã có đáp án đúng do người gán. Trong đề, đây là nguồn duy nhất cho biết model đúng hay sai thật.",
      "Ngưỡng route sang người phải hiệu chuẩn riêng theo loại tài liệu và theo trường, không dùng một ngưỡng chung."
    ],
    opts: [
      { k: "A", gist: "Add a system prompt instruction telling the model to give lower confidence when it is uncertain.",
        why: [
          "Sai ở giả định: lời dặn không làm điểm confidence được hiệu chuẩn (ý 2). Model sai mà vẫn tự tin thì vẫn báo điểm cao.",
          "Không đo gì cả, nên team vẫn không biết phân khúc nào đang sai (ý 1)."
        ] },
      { k: "B", gist: "Have a second model call re-rate each extraction's confidence, and trust the values the two calls agree on.",
        why: [
          "Hai lần tự chấm vẫn là tự chấm. Hai điểm khớp nhau không phải bằng chứng là đúng, vì chưa ai so với nhãn thật (ý 2, ý 3).",
          "Tốn thêm một lần gọi cho mỗi output, mà câu hỏi “phân khúc nào đang sai” vẫn bỏ ngỏ."
        ] },
      { k: "C", gist: "Measure accuracy separately by request type and by field, and automate only the segments whose results are stable.",
        why: [
          "Cắt bộ có nhãn theo loại yêu cầu và theo trường, đo accuracy từng phần (ý 1, ý 3). Phân khúc nào yếu thì lộ ra ngay, không còn bị con số 97% che.",
          "Chỉ bỏ review ở phân khúc có số liệu chứng minh ổn định. Đúng điều guide 5.5 đòi trước khi tự động hóa.",
          "Đây là việc phải làm trước. Các bước sau, như đặt ngưỡng riêng cho từng trường (ý 4) hay lấy mẫu stratified cho phần tự động, đều dựa trên số liệu này."
        ] },
      { k: "D", gist: "Raise the automation threshold to a stricter confidence cutoff for every field before removing any review.",
        why: [
          "Sai ở giả định: một ngưỡng chung coi điểm confidence có cùng nghĩa ở mọi trường. Điểm chưa hiệu chuẩn thì không có gì bảo đảm điều đó (ý 2, ý 4).",
          "Ngưỡng chặt hơn chỉ làm phần tự động nhỏ lại. Phân khúc đang sai vẫn không lộ ra, và vẫn lọt qua ngưỡng nếu model tự tin sai.",
          "Dễ bị cuốn vì “stricter” (chặt hơn) nghe an toàn. Nhưng nó vẫn tin vào điểm tự báo, mà chưa ai đo điểm đó đúng tới đâu."
        ] }
    ],
    refs: [
      { label: "Bài 5.5, mục “Chuyện gì đang xảy ra”: số gộp che phân khúc kém, đo accuracy theo loại tài liệu × trường trước khi bớt review", href: NOTES + "#l-5-5" },
      { label: "Cheatsheet D5: dòng “97% accuracy tổng, muốn bỏ review cho high-confidence”", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 6, n: 3, total: 60, sub: "1.1", subName: "Vòng lặp agent", scen: "S1",
    answer: "A",
    ask: "Order-status questions are always resolved with <code>get_customer</code> followed by <code>lookup_order</code>, and the team wants those answers consistent and cheap. Returns and billing disputes, by contrast, vary widely in the steps they need. How should the team structure these two kinds of work?",
    scene: [
      "Agent support có hai loại việc rất khác nhau.",
      "Hỏi trạng thái đơn: lần nào cũng đúng hai bước, <code>get_customer</code> rồi <code>lookup_order</code>. Team muốn câu trả lời ổn định và rẻ.",
      "Trả hàng và khiếu nại billing: mỗi ca một kiểu. Bước sau tùy kết quả bước trước: tra thêm một đơn, hoàn một phần, hay escalate.",
      "Chỗ khó: các phương án sai hoặc ép một kiểu cho cả hai loại việc, hoặc dùng sai một cơ chế để ép thứ tự gọi tool."
    ],
    asks: [
      "Team nên tổ chức hai loại việc này thế nào?",
      "Tức là: việc nào biết trước các bước thì để code vạch đường, việc nào bước sau tùy kết quả thì để Claude tự chọn.",
      "Soi từng phương án: loại việc cố định có chạy đúng thứ tự mọi lần không? Loại việc mơ hồ có còn được Claude tự chọn bước không?"
    ],
    facts: [
      "Workflow: code vạch sẵn đường đi, tool chạy theo thứ tự cố định, Claude chỉ có mặt ở vài bước (ví dụ viết câu trả lời). Việc biết trước các bước thì workflow rẻ và dễ kiểm soát hơn.",
      "Agent: Claude tự quyết gọi tool nào, theo thứ tự nào, khi nào xong, dựa trên kết quả vừa thấy. Guide gọi đây là model-driven decision-making, đối lập với decision tree hard-code (cây quyết định viết chết trong code). Hợp với việc mơ hồ, mỗi ca một kiểu.",
      "Lời dặn trong system prompt là chỉ dẫn: Claude thường làm theo, nhưng đó là xác suất, không phải bảo đảm.",
      "Trần số vòng (<code>maxTurns</code> trong Agent SDK) chỉ là dây an toàn chống chạy mãi. Chạm trần là bất thường, SDK trả về <code>error_max_turns</code>, không phải “xong”."
    ],
    opts: [
      { k: "A", gist: "Run status questions through a predefined code path that calls the two tools in order, and keep the model-driven loop for returns and disputes.",
        why: [
          "Hỏi trạng thái đơn là việc biết trước các bước, nên cho code chạy thẳng hai tool rồi đưa kết quả cho Claude viết câu trả lời (ý 1). Lần nào cũng cùng một đường, không tốn lượt suy luận để chọn tool.",
          "Trả hàng và khiếu nại vẫn ở trong vòng lặp agent, Claude tự chọn bước tiếp theo kết quả vừa có (ý 2).",
          "Chọn kiểu theo từng loại việc, không ép một kiểu cho tất cả. Vừa đạt “consistent and inexpensive” (ổn định, rẻ), vừa giữ linh hoạt ở chỗ cần."
        ] },
      { k: "B", gist: "Set <code>max_turns</code> to two for status questions, so the loop is forced to stop once <code>lookup_order</code> has returned.",
        why: [
          "Sai công cụ: trần số vòng chỉ giới hạn số lượt, không chỉ định tool nào chạy hay chạy theo thứ tự nào (ý 4).",
          "Claude vẫn có thể gọi sai tool trong hai lượt đó. Chạm trần thì SDK trả về <code>error_max_turns</code>, một kết quả lỗi chứ không phải câu trả lời xong."
        ] },
      { k: "C", gist: "Build a hard-coded decision tree for every request category, so every tool sequence is predictable and can be reviewed before deployment.",
        why: [
          "Hợp với hỏi trạng thái đơn, nhưng sai với trả hàng và khiếu nại: đề nói các ca này “vary widely” (khác nhau rất nhiều) về số bước.",
          "Cây quyết định viết chết không đổi theo điều vừa phát hiện (ý 2). Ca nào cây không lường trước thì agent kẹt hoặc đi sai nhánh.",
          "Dễ bị cuốn vì “predictable and reviewable” (đoán trước được, duyệt trước được) nghe rất an toàn. Nhưng nó bỏ mất sự linh hoạt đúng ở chỗ đề cần."
        ] },
      { k: "D", gist: "Keep every request in the model-driven loop and add a system prompt rule telling Claude to call the two tools in order for status questions.",
        why: [
          "Lời dặn chỉ làm Claude <i>thường</i> gọi đúng thứ tự, không bảo đảm (ý 3). Đề đòi “consistent” (ổn định).",
          "Mỗi lượt vẫn phải trả tiền cho Claude suy luận chọn tool, dù các bước đã biết trước. Trái mục tiêu “inexpensive” (rẻ)."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D1, mục 3 “Agent là gì”: bảng workflow và agent, việc biết trước các bước thì workflow rẻ và dễ kiểm soát hơn", href: NOTES + "#l-1-0" },
      { label: "Bài 1.1, mục “Ba cách dừng sai”: trần số vòng chỉ là dây an toàn, chạm trần là error_max_turns", href: NOTES + "#l-1-1" }
    ]
  },
  {
    de: 6, n: 4, total: 60, sub: "1.3", subName: "Gọi subagent, truyền context", scen: "S1",
    answer: "AD",
    ask: "The team is adding a billing-dispute investigation subagent through an <code>AgentDefinition</code>. The subagent must gather evidence but never issue refunds, and the coordinator must delegate to it reliably. Which two configuration choices achieve this? (Choose two.)",
    scene: [
      "Team thêm một subagent điều tra khiếu nại billing, khai bằng <code>AgentDefinition</code>.",
      "Hai yêu cầu. Một: subagent chỉ gom bằng chứng, “never issue refunds” (không bao giờ được hoàn tiền). Hai: coordinator phải giao việc cho nó một cách đáng tin.",
      "Chỗ khó: mỗi yêu cầu do một trường khác nhau lo. Phương án sai thì giao yêu cầu cho nhầm trường, hoặc bỏ mất trường cần thiết."
    ],
    asks: [
      "Hai lựa chọn cấu hình nào đạt cả hai yêu cầu?",
      "Tức là: một cách để <code>process_refund</code> không thể bị gọi, và một cách để coordinator biết khi nào giao việc cho subagent này.",
      "Soi từng phương án: nó lo yêu cầu nào, và lo bằng cơ chế chắc chắn hay chỉ bằng lời dặn?"
    ],
    facts: [
      "<code>AgentDefinition</code> có hai trường bắt buộc. <code>description</code> nói khi nào nên dùng subagent này. <code>prompt</code> là system prompt của subagent, định vai trò và cách làm.",
      "Claude tự quyết khi nào gọi subagent bằng cách so việc đang làm với <code>description</code> của từng subagent. Docs dặn viết description rõ, cụ thể để Claude khớp đúng việc.",
      "<code>tools</code> là danh sách cho phép (allowlist). Khai thì subagent chỉ có đúng các tool đó, tool không có trong danh sách thì không tồn tại trong phiên của subagent. Bỏ trống <code>tools</code> thì subagent nhận mọi tool dành cho subagent.",
      "Lời dặn trong prompt là chỉ dẫn: Claude thường theo nhưng không bảo đảm. Hành động dính tới tiền thì cần chặn bằng cấu hình hoặc code."
    ],
    opts: [
      { k: "A", gist: "Set the subagent's <code>tools</code> allowlist to <code>get_customer</code> and <code>lookup_order</code>, so <code>process_refund</code> is absent from its session.",
        why: [
          "Lo yêu cầu “never issue refunds”. Allowlist chỉ có hai tool tra cứu, nên <code>process_refund</code> không có trong phiên của subagent (ý 3).",
          "Không có tool thì không gọi được. Đây là chặn bằng cấu hình, không trông vào việc model nhớ lời dặn (ý 4)."
        ] },
      { k: "B", gist: "Write in the subagent's <code>prompt</code> that it must never call <code>process_refund</code>, and leave <code>tools</code> unset so it inherits every tool.",
        why: [
          "Bỏ trống <code>tools</code> thì subagent nhận đủ mọi tool, kể cả <code>process_refund</code> (ý 3).",
          "Lúc đó chỉ còn một câu trong prompt chắn giữa subagent và lệnh hoàn tiền. Đó là xác suất (ý 4), không đạt chữ “never” (không bao giờ).",
          "Dễ bị cuốn vì câu cấm viết rõ ràng, lại đặt đúng chỗ system prompt. Nhưng viết rõ tới đâu vẫn là lời dặn, trong khi cách chặn chắc chắn có sẵn ở trường <code>tools</code>."
        ] },
      { k: "C", gist: "Leave out the <code>description</code> field, because the coordinator already passes the dispute details in the prompt it sends when spawning the subagent.",
        why: [
          "Sai ở giả định: <code>description</code> là trường bắt buộc, và nó làm việc khác với lời giao việc (ý 1).",
          "Lời giao việc chỉ tới tay subagent <i>sau khi</i> nó đã được chọn. Còn chọn subagent nào thì Claude dựa vào <code>description</code> (ý 2). Bỏ nó là bỏ đúng thứ giúp giao việc đáng tin."
        ] },
      { k: "D", gist: "Write a <code>description</code> that states exactly when billing-dispute investigation should be delegated, since the coordinator decides delegation from it.",
        why: [
          "Lo yêu cầu “delegate reliably” (giao việc đáng tin). Claude so việc đang làm với <code>description</code> để chọn subagent (ý 2).",
          "Description nói rõ “gặp khiếu nại billing thì giao cho tôi” giúp coordinator khớp đúng ca. Description mơ hồ thì lúc giao lúc không."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, “Khái niệm của bài”: AgentDefinition gồm description (khi nào gọi), prompt, tools", href: NOTES + "#l-1-3" },
      { label: "Bài 1.3, ô “Đã sửa 02/11”: tools của subagent là danh sách cho phép, chỉ thu hẹp, bỏ trống là dùng hết", href: NOTES + "#fix-10" },
      { label: "Docs “Subagents in the SDK”: bảng AgentDefinition, mục Automatic invocation và Tool restrictions", href: "https://code.claude.com/docs/en/agent-sdk/subagents" }
    ]
  },
  {
    de: 6, n: 5, total: 60, sub: "1.3", subName: "Gọi subagent, truyền context", scen: "S1",
    answer: "B",
    ask: "After many turns working through a billing dispute that spans three orders, the main agent hands the drafting of the final resolution to a specialized subagent, which must work from the complete conversation so far. Which delegation approach achieves this?",
    scene: [
      "Agent chính đã qua nhiều lượt gỡ một khiếu nại billing dính tới ba đơn hàng.",
      "Giờ nó giao việc soạn bản giải quyết cuối cho một subagent chuyên viết. Subagent đó phải làm từ “the complete conversation so far” (toàn bộ hội thoại tới giờ).",
      "Chỗ khó: subagent thường khởi động trống. Các phương án sai đều dựa vào một đường truyền context không có thật."
    ],
    asks: [
      "Cách giao việc nào làm được điều đó?",
      "Tức là: cơ chế nào cho subagent bắt đầu với nguyên văn hội thoại của agent chính, không phải bản tóm tắt.",
      "Soi từng phương án: lúc khởi động, subagent thật sự nhận được gì?"
    ],
    facts: [
      "Subagent thường (không phải fork) khởi động với context mới. Nó nhận system prompt của nó, lời giao việc, CLAUDE.md của project và định nghĩa tool. Nó không nhận lịch sử hội thoại, kết quả tool hay system prompt của agent cha. Thứ duy nhất agent cha truyền xuống là chuỗi lời giao việc.",
      "Fork là subagent sao chép hội thoại tới lúc đó thay vì khởi động mới. Claude tạo fork bằng cách gọi tool Agent (tên cũ: Task) với <code>subagent_type: \"fork\"</code>.",
      "Resume trong Agent SDK là việc của ứng dụng: truyền session ID vào tùy chọn <code>resume</code> khi gọi <code>query()</code>, để nối tiếp một phiên (hay một subagent đã chạy trước) với lịch sử của chính nó.",
      "<code>/compact</code> (nén) thay lịch sử của phiên đang chạy bằng một bản tóm tắt. Nó chỉ đổi context của chính agent đó."
    ],
    opts: [
      { k: "A", gist: "Put the main agent's session ID in the delegation prompt, so the subagent resumes that conversation by itself.",
        why: [
          "Sai ở giả định: resume là tùy chọn ứng dụng đặt khi gọi <code>query()</code>, không phải thứ subagent tự làm khi đọc thấy một ID (ý 3).",
          "Session ID tới tay subagent chỉ là một chuỗi chữ trong lời giao việc. Subagent vẫn khởi động mới, không có lượt nào của vụ khiếu nại (ý 1)."
        ] },
      { k: "B", gist: "Spawn the drafting subagent as a fork, so it starts with a copy of the main agent's conversation so far.",
        why: [
          "Fork sao chép hội thoại của agent chính tới lúc đó (ý 2). Subagent soạn thảo bắt đầu với nguyên văn mọi lượt của vụ khiếu nại, đúng chữ “complete conversation” (toàn bộ hội thoại).",
          "Cái giá: fork không còn context sạch như subagent thường, nó mang theo cả lịch sử dài của agent chính. Ở đây đáng trả, vì đề đòi toàn bộ hội thoại. Việc thường thì viết đủ dữ kiện vào lời giao việc là đủ."
        ] },
      { k: "C", gist: "Trigger context compaction in the main agent first, so the resulting summary carries over into the new subagent.",
        why: [
          "Sai ở giả định: compact chỉ đổi context của chính agent chính (ý 4). Subagent thường vẫn khởi động mới, chỉ có lời giao việc (ý 1).",
          "Kể cả nếu bản tóm tắt tới được subagent, đó vẫn là tóm tắt, không phải toàn bộ hội thoại đề đòi."
        ] },
      { k: "D", gist: "Spawn a standard subagent and rely on it sharing the main agent's session history automatically.",
        why: [
          "Sai ở giả định: subagent thường không thấy lịch sử hay kết quả tool của agent cha (ý 1). Chạy chung một phiên không có nghĩa là chung context.",
          "Subagent soạn thảo bắt đầu mà không biết gì về ba đơn hàng, ngoài những gì lời giao việc ghi.",
          "Dễ bị cuốn vì subagent chạy ngay trong phiên của agent chính, nghe như phải thấy hết. Nhưng mỗi subagent thường có context riêng. Muốn mang hội thoại theo thì phải là fork."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Chuyện gì đang xảy ra”: subagent bắt đầu với trang giấy trắng, chỉ biết những gì lời giao việc ghi", href: NOTES + "#l-1-3" },
      { label: "Docs “Subagents in the SDK”, mục What subagents inherit và Forked subagents", href: "https://code.claude.com/docs/en/agent-sdk/subagents" }
    ]
  },
  {
    de: 6, n: 6, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S1",
    answer: "BC",
    ask: "Yesterday a Claude Code session audited the escalation logic across this agent's repository. Since then, a teammate changed two policy files and committed them with git, outside Claude Code. Which two approaches let today's work continue without re-exploring everything? (Choose two.)",
    scene: [
      "Hôm qua một phiên Claude Code đã soát logic escalate trong repo của agent.",
      "Sau đó một đồng nghiệp sửa hai file chính sách (policy) rồi commit bằng git, ngoài Claude Code.",
      "Chỗ khó: phiên hôm qua vẫn giữ nội dung cũ của hai file đó trong lịch sử. Phần còn lại của bản soát thì vẫn đúng."
    ],
    asks: [
      "Hai cách nào cho phép làm tiếp hôm nay mà không phải khám phá lại toàn bộ?",
      "Tức là: giữ được những gì hôm qua đã tìm ra, và chỉ thay phần đã cũ là hai file vừa đổi.",
      "Soi từng phương án hai câu: có còn mang nội dung cũ của hai file không? Có bắt đọc lại cả repo không?"
    ],
    facts: [
      "Resume (<code>--continue</code>, <code>--resume</code>) nạp lại lịch sử đã lưu: message, tool call và kết quả tool. Đó là bản ghi cũ, không phải ảnh chụp ổ đĩa lúc này. File đọc hôm qua quay lại đúng như hôm qua.",
      "Resume thì phải nói rõ file nào đã đổi, để Claude đọc lại đúng các file đó thay vì khám phá lại cả repo.",
      "Viết <code>@đường/dẫn</code> trong tin nhắn thì Claude Code đưa nội dung hiện tại của file vào hội thoại ngay lượt đó.",
      "Phiên mới kèm bản tóm tắt có cấu trúc (phát hiện chính, file quan trọng, quyết định đã chốt) là cách thay cho resume. Nó không mang theo kết quả tool đã cũ."
    ],
    opts: [
      { k: "A", gist: "Start a fresh session and have Claude re-explore the entire repository, so no stale findings carry over.",
        why: [
          "Chạy được, không còn gì cũ. Nhưng đây chính là “full re-exploration” (khám phá lại toàn bộ) mà đề muốn tránh.",
          "Chỉ hai file đổi, vậy mà bỏ cả một ngày phân tích còn đúng, đọc lại cả repo và đổ đầy context."
        ] },
      { k: "B", gist: "Resume the session and reference the two rewritten files with <code>@</code>, so Claude reads their current contents before continuing.",
        why: [
          "Resume giữ lại toàn bộ bản soát hôm qua (ý 1). Phần còn đúng không phải làm lại.",
          "<code>@</code> hai file đưa nội dung mới vào hội thoại (ý 3), thay đúng chỗ đã cũ. Đây chính là cách “nói rõ file nào đã đổi” (ý 2)."
        ] },
      { k: "C", gist: "Start a fresh session seeded with a structured summary of yesterday's findings and the names of the two rewritten files.",
        why: [
          "Phiên mới không mang kết quả tool cũ nào, nên không còn nội dung cũ của hai file (ý 4).",
          "Bản tóm tắt giữ lại các phát hiện hôm qua. Tên hai file cho Claude biết chỉ cần đọc lại đúng hai file đó, không phải khám phá lại cả repo.",
          "Chọn B hay C tùy phần cũ nhiều hay ít. Phần lớn còn đúng thì resume rồi chỉ file. Nhiều thứ đã cũ thì phiên mới kèm tóm tắt."
        ] },
      { k: "D", gist: "Resume with <code>claude --continue</code> and carry on, since resuming reloads the latest contents of every file read earlier.",
        why: [
          "Sai ở giả định: resume nạp lại bản ghi hội thoại, không đọc lại ổ đĩa (ý 1). Hai file chính sách vẫn mang nội dung hôm qua.",
          "Bản soát sẽ suy luận trên luật escalate đã bị sửa, có thể kết luận về những quy định không còn tồn tại.",
          "Dễ bị cuốn vì <code>--continue</code> đúng là lệnh nối lại phiên. Nhưng nối phiên là nối lịch sử, không phải làm mới file."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Ba cách nối lại công việc”: resume và nói rõ file nào đã đổi, hoặc phiên mới kèm tóm tắt", href: NOTES + "#l-1-7" },
      { label: "Docs “Manage sessions”, mục What a resumed session restores: lịch sử gồm message, tool call và kết quả", href: "https://code.claude.com/docs/en/sessions" },
      { label: "Docs “Common workflows”, mục Reference files and directories: @ đưa nội dung file vào hội thoại", href: "https://code.claude.com/docs/en/common-workflows" }
    ]
  },
  {
    de: 6, n: 7, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S1",
    answer: "AB",
    ask: "The team wants to test a revised escalation prompt on a recorded billing-dispute session. In that session the agent called <code>process_refund</code> against production, and a real refund went out. The revised prompt may re-run turns that call tools. When they resume that session with <code>fork_session</code> enabled, which two actions should they plan for? (Choose two.)",
    scene: [
      "Team muốn thử prompt escalate mới trên một phiên khiếu nại billing đã ghi lại.",
      "Trong phiên đó, agent đã gọi <code>process_refund</code> lên production. Tiền đã thật sự được hoàn.",
      "Họ sẽ resume phiên đó với <code>fork_session</code> bật. Prompt mới có thể chạy lại những lượt có gọi tool.",
      "Chỗ khó: fork sao chép hội thoại. Phải tách bạch cái gì được sao chép, cái gì không."
    ],
    asks: [
      "Khi resume phiên đó có bật <code>fork_session</code>, team nên lo trước hai việc nào?",
      "Tức là: hiểu fork làm gì với lịch sử và không làm gì với thế giới bên ngoài, rồi chọn hai việc cần chuẩn bị.",
      "Soi từng phương án: điều nó giả định về fork có đúng không?"
    ],
    facts: [
      "Phiên (session) lưu hội thoại: prompt, mọi tool call, mọi kết quả tool, mọi câu trả lời. Docs ghi rõ: phiên lưu hội thoại, không lưu ổ đĩa.",
      "Fork tạo một phiên mới bắt đầu bằng bản sao lịch sử của phiên gốc, rồi đi riêng từ đó. Fork có session ID riêng. Phiên gốc giữ nguyên và vẫn resume được bằng ID cũ.",
      "Fork chỉ tách nhánh hội thoại. Docs ghi: fork mà sửa file thì thay đổi đó là thật, phiên nào dùng chung thư mục cũng thấy. Cùng lẽ đó, một lệnh hoàn tiền đã chạy qua tool không bị rút lại.",
      "File phiên nằm trên đĩa. Phiên đã kết thúc vẫn resume hay fork được sau này, miễn file phiên còn trên máy đang chạy."
    ],
    opts: [
      { k: "A", gist: "Run the fork against a staging backend, because forking does not reverse a refund that was already processed.",
        why: [
          "Fork sao chép bản ghi “đã gọi <code>process_refund</code>”, nhưng không đụng tới backend (ý 1, ý 3). Tiền đã hoàn vẫn là đã hoàn.",
          "Prompt mới có thể chạy lại các lượt gọi tool. Fork vẫn trỏ vào production thì có thể hoàn tiền thêm lần nữa. Cho fork chạy với backend staging là cách cô lập các hành động ghi."
        ] },
      { k: "B", gist: "Keep the original session ID on record, so production can still resume that session after the fork is created.",
        why: [
          "Fork có session ID riêng, phiên gốc không bị sửa (ý 2). Bản ghi production vẫn nguyên và resume được bằng ID cũ.",
          "Giữ ID gốc để sau còn quay lại đúng phiên thật, tách bạch với các lần thử prompt mới."
        ] },
      { k: "C", gist: "Review the production transcript afterward for the fork's new turns, since both sessions share one history.",
        why: [
          "Sai ở giả định: hai phiên chỉ chung lịch sử tới điểm fork, sau đó đi riêng (ý 2).",
          "Lượt mới của fork ghi vào transcript của fork. Phiên production không có gì mới để xem.",
          "Dễ bị cuốn vì fork bắt đầu bằng đúng lịch sử của phiên gốc, nghe như hai phiên còn nối với nhau. Nhưng đó là bản sao, không phải dùng chung."
        ] },
      { k: "D", gist: "Create the fork before the original session ends, since a finished session can no longer be branched.",
        why: [
          "Sai ở giả định: phiên là file trên đĩa, không phải process đang chạy (ý 4). Phiên kết thúc từ lâu vẫn fork được, miễn file phiên còn trên máy.",
          "Không có hạn chót nào gắn với lúc phiên gốc kết thúc."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, “Khái niệm của bài”: fork sao chép lịch sử rồi đi tiếp độc lập, phiên gốc không bị đụng tới", href: NOTES + "#l-1-7" },
      { label: "Docs Agent SDK “Work with sessions”, mục Fork to explore alternatives: fork chỉ tách nhánh hội thoại, không tách ổ đĩa", href: "https://code.claude.com/docs/en/agent-sdk/sessions" }
    ]
  },
  {
    de: 6, n: 8, total: 60, sub: "2.1", subName: "Thiết kế tool: description rõ, ranh giới rõ", scen: "S1",
    answer: "BC",
    ask: "Production logs show that <code>lookup_order</code> often receives a customer's email address as its identifier, and that when it returns no matches the agent tells customers the order system is down. Which two changes most directly fix these behaviors? (Choose two.)",
    scene: [
      "Log production cho thấy hai hành vi sai của agent support quanh <code>lookup_order</code>.",
      "Một: tool hay nhận địa chỉ email của khách làm mã định danh, trong khi nó cần mã đơn.",
      "Hai: tool trả về không có kết quả nào khớp, agent lại nói với khách là hệ thống đơn hàng đang sập.",
      "Chỗ khó: hai lỗi khác nhau, nên cần hai thay đổi, mỗi thay đổi sửa đúng gốc của một lỗi."
    ],
    asks: [
      "Hai thay đổi nào sửa thẳng nhất hai hành vi này?",
      "Tức là: cho Claude biết tool nhận input dạng gì, và kết quả rỗng nghĩa là gì.",
      "Soi từng phương án: nó sửa lỗi nào, và sửa ở chỗ Claude thật sự đọc khi gọi tool hay ở chỗ khác?"
    ],
    facts: [
      "Claude chọn tool và dựng tham số chỉ từ <code>name</code>, <code>description</code>, <code>input_schema</code>. Guide gọi description là cơ chế chính để chọn tool.",
      "Description tốt trả lời bốn câu: input định dạng gì (ORD-12345 hay email?), ví dụ query nào thì dùng, edge case (trường hợp biên), và ranh giới với tool khác.",
      "Kết quả rỗng hợp lệ (truy cập được, query chạy đúng, không có gì khớp) khác lỗi truy cập (timeout, dịch vụ không phản hồi). Kết quả rỗng không phải lỗi.",
      "Retry chỉ có nghĩa với lỗi tạm thời như timeout. Query đúng mà không có gì khớp thì thử lại bao nhiêu lần cũng rỗng."
    ],
    opts: [
      { k: "A", gist: "Add a system prompt rule reminding the agent to pass only valid order identifiers to <code>lookup_order</code>.",
        why: [
          "Đặt sai chỗ: lúc gọi tool, Claude đọc description và schema của tool (ý 1). Một câu chung trong system prompt không nói mã đơn trông thế nào, nên “valid” (hợp lệ) vẫn phải đoán.",
          "Không đụng tới lỗi thứ hai: agent vẫn hiểu kết quả rỗng là hệ thống sập."
        ] },
      { k: "B", gist: "Document the identifier format <code>lookup_order</code> accepts, with an example value such as an order number like <code>ORD-48213</code>.",
        why: [
          "Sửa lỗi một. Input định dạng gì là câu đầu tiên description phải trả lời (ý 2).",
          "Có mẫu <code>ORD-48213</code> thì email không còn là tham số hợp lý. Claude không truyền nhầm nữa, thiếu mã đơn thì hỏi khách."
        ] },
      { k: "C", gist: "Explain that an empty result means no matching order exists, not that the service is down.",
        why: [
          "Sửa lỗi hai. Kết quả rỗng là edge case description phải nói rõ (ý 2): query chạy đúng, chỉ là không có đơn nào khớp (ý 3).",
          "Biết vậy thì agent trả lời đúng: báo không tìm thấy đơn và hỏi lại mã đơn, thay vì nói hệ thống sập."
        ] },
      { k: "D", gist: "Configure the agent to retry <code>lookup_order</code> with backoff whenever it returns an empty result.",
        why: [
          "Sai ở giả định: coi kết quả rỗng hợp lệ như lỗi tạm thời (ý 3). Đây chính là sự nhầm lẫn đang gây ra lỗi hai.",
          "Query đúng mà không khớp thì thử lại vẫn rỗng (ý 4). Tốn thêm lượt gọi, khách chờ lâu hơn, còn lỗi một vẫn nguyên.",
          "Dễ bị cuốn vì retry kèm backoff (chờ tăng dần) là cách xử lý chuẩn. Nhưng chuẩn cho timeout, không cho “không có gì khớp”."
        ] }
    ],
    refs: [
      { label: "Bài 2.1, mục “Chuyện gì đang xảy ra”: description tốt nói input định dạng gì, ví dụ, edge case, ranh giới", href: NOTES + "#l-2-1" },
      { label: "Bài 2.2: kết quả rỗng hợp lệ khác lỗi truy cập, hai thứ phải trả về khác nhau", href: NOTES + "#l-2-2" }
    ]
  },
  {
    de: 6, n: 9, total: 60, sub: "2.3", subName: "Chia tool cho agent và tool_choice", scen: "S1",
    answer: "D",
    ask: "The team split the support agent into subagents, and the subagent that explains statement charges was given the full four-tool set. Logs show it calling <code>process_refund</code> unprompted while describing fees. Which change most directly prevents this?",
    scene: [
      "Team tách agent support thành các subagent. Subagent giải thích các khoản phí trên sao kê được cấp đủ bốn tool.",
      "Log cho thấy nó tự gọi <code>process_refund</code> “unprompted” (không ai yêu cầu) ngay lúc đang giải thích phí.",
      "Chỗ khó: vai của subagent là giải thích, nhưng trong tay nó vẫn có tool hoàn tiền. Khách phàn nàn về một khoản phí thì cuộc trò chuyện trông rất giống ca hoàn tiền."
    ],
    asks: [
      "Thay đổi nào chặn chuyện này thẳng nhất?",
      "Tức là: làm sao để subagent này <b>không thể</b> hoàn tiền, chứ không chỉ là ít khi hoàn tiền.",
      "Soi từng phương án: sửa xong, <code>process_refund</code> còn trong tay subagent không?"
    ],
    facts: [
      "Scoped tool access (least privilege): mỗi agent chỉ được cấp đúng những tool vai trò của nó cần.",
      "Agent có tool ngoài vai trò thì sẽ dùng, thường là dùng sai (guide bài 2.3). Ít tool hơn, ranh giới rõ hơn thì chọn tool cũng đáng tin hơn.",
      "Trường <code>tools</code> của subagent là danh sách cho phép. Tool không có trong danh sách thì subagent không gọi được.",
      "System prompt là chỉ dẫn: Claude thường theo nhưng không bảo đảm. Confidence do model tự báo cũng không phải cổng chặn đáng tin."
    ],
    opts: [
      { k: "A", gist: "Have the charge-explanation subagent rate its confidence before each <code>process_refund</code> call and skip the low-confidence ones.",
        why: [
          "Sai ở giả định: subagent này không bao giờ được hoàn tiền, nên chẳng có ca “high-confidence” nào đáng giữ. Thêm bước tự chấm là thêm phán đoán vào chỗ không cần phán đoán.",
          "Điểm tự báo không phải cổng chặn đáng tin (ý 4). Model tự tin sai thì lệnh hoàn tiền vẫn chạy."
        ] },
      { k: "B", gist: "Add a <code>select_tool</code> helper that the charge-explanation subagent calls first to decide which backend tool applies.",
        why: [
          "Thêm một bước chọn để chữa lỗi chọn. Helper vẫn có thể trả về <code>process_refund</code>, vì tool đó vẫn trong tầm tay.",
          "Phức tạp hơn mà không bớt đi quyền nào. Lỗi chỉ dời sang chỗ khác."
        ] },
      { k: "C", gist: "Add a system prompt rule stating that the charge-explanation subagent must never call <code>process_refund</code> on its own.",
        why: [
          "Lời dặn là xác suất (ý 4). Tool vẫn nằm đó, description của nó vẫn mời gọi dùng mỗi khi khách nói tới tiền.",
          "Với hành động chuyển tiền, để quyền lại rồi xin model đừng dùng là cơ chế yếu hơn hẳn việc bỏ quyền đi.",
          "Dễ bị cuốn vì “must never” (không bao giờ được) nghe dứt khoát. Nhưng chữ mạnh tới đâu vẫn là chỉ dẫn, không phải luật cứng."
        ] },
      { k: "D", gist: "Remove <code>process_refund</code> from the charge-explanation subagent, leaving it only <code>get_customer</code> and <code>lookup_order</code>.",
        why: [
          "Đúng least privilege (ý 1): vai giải thích phí chỉ cần tra khách và tra đơn.",
          "Bỏ tool khỏi danh sách thì subagent không thể gọi nó nữa (ý 3). Lệnh hoàn tiền ngoài ý muốn thành không thể xảy ra, không chỉ là hiếm.",
          "Bộ tool nhỏ hơn cũng giúp subagent chọn đúng giữa các tool còn lại (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 2.3, mục “Chuyện gì đang xảy ra”: agent có tool ngoài vai trò thì sẽ dùng sai, giới hạn tool theo vai trò", href: NOTES + "#l-2-3" },
      { label: "Bài 1.3, ô “Đã sửa 02/11”: tools của subagent là danh sách cho phép, chỉ thu hẹp", href: NOTES + "#fix-10" }
    ]
  },
  {
    de: 6, n: 10, total: 60, sub: "2.5", subName: "Chọn built-in tool đúng việc", scen: "S1",
    answer: "B",
    ask: "The agent keeps each ticket's verified facts in a notes file. After <code>lookup_order</code> returns the real order total, the agent corrects the <code>refund_amount</code> line by calling Write with only that line, and the rest of the notes disappears. Which tool usage fixes this?",
    scene: [
      "Agent ghi các dữ kiện đã kiểm của mỗi ticket vào một file ghi chú.",
      "<code>lookup_order</code> trả về tổng tiền thật của đơn. Agent sửa dòng <code>refund_amount</code> bằng cách gọi Write, chỉ truyền đúng dòng đó.",
      "Kết quả: cả file chỉ còn một dòng, mọi ghi chú khác biến mất. Ví dụ minh họa:<pre><code>Trước:\ncustomer_id: C-1042\norder_id: ORD-48213\nrefund_amount: 59.00\n\nSau lệnh Write:\nrefund_amount: 64.50</code></pre>"
    ],
    asks: [
      "Dùng tool thế nào thì hết lỗi này?",
      "Tức là: chọn tool sửa đúng một dòng trong file đã có, giữ nguyên phần còn lại.",
      "Soi từng phương án: sau khi sửa, file còn đủ ghi chú không, và còn giá trị cũ nằm lẫn không?"
    ],
    facts: [
      "Write ghi toàn bộ file: tạo file mới, hoặc ghi đè file cũ bằng đúng nội dung được truyền vào. Nó không nối thêm, không gộp với nội dung đang có.",
      "Edit sửa có đích: tìm <code>old_string</code> đúng nguyên văn, thay bằng <code>new_string</code>, phần còn lại của file giữ nguyên. <code>old_string</code> phải xuất hiện đúng một lần trong file.",
      "Write không ghi được file chưa Read, nên đường lui khi Edit không dùng được là Read rồi Write cả file đã sửa. Read trước không đổi cách Write chạy: Write vẫn ghi đè cả file.",
      "Bash dành cho việc tool chuyên dụng không làm được, như chạy test hay chạy git."
    ],
    opts: [
      { k: "A", gist: "Add a system prompt rule telling the agent to include the complete notes content in every Write call.",
        why: [
          "Chạy được nếu model chép lại đúng từng dòng ở mọi lần sửa. Nhưng đó là trông vào lời dặn: lần nào chép sót một dòng là mất dòng đó.",
          "Mỗi lần sửa một con số lại phải gửi cả file, tốn token cho phần không đổi. Trong khi đã có sẵn tool để sửa một phần (ý 2)."
        ] },
      { k: "B", gist: "Call Edit with the stale <code>refund_amount</code> line as <code>old_string</code> and the corrected line as <code>new_string</code>.",
        why: [
          "Edit thay đúng dòng cũ bằng dòng mới, mọi ghi chú khác giữ nguyên (ý 2).",
          "Dòng <code>refund_amount</code> cũ chỉ có một trong file, nên khớp đúng một chỗ. Sửa một dòng trong file đã có là đúng việc của Edit."
        ] },
      { k: "C", gist: "Use Bash to append the corrected line to the end of the notes file with a shell redirect.",
        why: [
          "Nối thêm thì dòng cũ vẫn còn. File có hai dòng <code>refund_amount</code> khác số nhau, lần sau agent đọc lại không biết số nào đúng.",
          "Còn bỏ qua tool chuyên dụng để dùng Bash cho việc Edit làm được (ý 4)."
        ] },
      { k: "D", gist: "Call Read on the notes file before Write, so that Write can merge the corrected line into the existing content.",
        why: [
          "Sai ở giả định: Write không bao giờ gộp, nó luôn ghi đè bằng đúng nội dung được truyền (ý 1).",
          "Read trước chỉ thỏa điều kiện để Write được ghi (ý 3). Truyền một dòng thì file vẫn chỉ còn một dòng.",
          "Dễ bị cuốn vì “Read rồi Write” đúng là đường lui notes dạy khi Edit không khớp duy nhất. Nhưng đường lui đó đòi Write cả file đã sửa, không phải một dòng."
        ] }
    ],
    refs: [
      { label: "Bài 2.5, mục “Mỗi tool một việc”: Edit sửa có đích bằng khớp text duy nhất, Write ghi toàn bộ file", href: NOTES + "#l-2-5" },
      { label: "Bài 2.5, ô “Đã sửa 01/11” và mục Biết thêm: Edit khớp nhiều chỗ thì kéo dài old_string, không được thì Read + Write. Write phải đưa đủ nội dung", href: NOTES + "#fix-3" }
    ]
  },
  {
    de: 6, n: 11, total: 60, sub: "5.6", subName: "Giữ nguồn và xử lý mâu thuẫn khi tổng hợp", scen: "S1",
    answer: "C",
    ask: "The agent hands billing dispute investigation to subagents that cover order records, billing history, and refund policy. Its escalation handoffs state conclusions such as “eligible for a refund under policy” without saying which record or policy clause backs each one, so reviewers redo every lookup. What is the structural fix?",
    scene: [
      "Agent giao việc điều tra tranh chấp thanh toán cho các subagent: một con xem hồ sơ đơn hàng, một con xem lịch sử thanh toán, một con xem chính sách hoàn tiền.",
      "Gói bàn giao (handoff) lên người duyệt chỉ ghi kết luận, ví dụ “eligible for a refund under policy” (đủ điều kiện hoàn tiền theo chính sách). Không nói hồ sơ nào hay điều khoản nào làm căn cứ.",
      "Hậu quả: người duyệt không kiểm được kết luận, phải tự tra lại mọi thứ agent đã tra.",
      "Chỗ khó: ba phương án sai đều thêm thứ gì đó vào handoff (danh sách nguồn, nguồn đoán sau, điểm tự tin). Chỉ một cách giữ được mối nối giữa từng kết luận với nguồn sinh ra nó."
    ],
    asks: [
      "Cách sửa về cấu trúc là gì?",
      "Tức là: làm sao để mỗi kết luận tới tay người duyệt đã kèm đúng nguồn của nó, để họ kiểm luôn, khỏi tra lại.",
      "Soi từng phương án: nguồn gắn vào từng kết luận hay đứng chung một chỗ? Ai gắn, lúc nào: subagent lúc vừa tìm ra, hay bước sau đoán lại?"
    ],
    facts: [
      "Provenance là nguồn gốc của một claim (khẳng định): hồ sơ nào, điều khoản nào. Attribution là ghi nguồn đó ngay cạnh claim.",
      "Attribution hay mất ở bước tóm tắt: agent nén kết quả mà không giữ mối nối claim → nguồn thì nguồn rơi. Rơi rồi thì bước sau không dựng lại chính xác được.",
      "Cách chữa của guide là claim–source mapping có cấu trúc: subagent trả từng claim kèm nguồn, các bước phía sau giữ nguyên và gộp các cặp đó, không viết lại thành văn xuôi trơn.",
      "Bibliography (danh mục nguồn chung ở cuối) không phải provenance: nó không nói claim nào dựa vào nguồn nào. Điểm tự tin model tự chấm cũng không thay được nguồn, vì model có thể tự tin mà sai."
    ],
    opts: [
      { k: "A", gist: "Have each subagent end its summary with a complete list of every tool it called and every policy document it read.",
        why: [
          "Sai ở chỗ nguồn đứng chung một danh sách, không gắn vào kết luận nào. Đây là bibliography, không phải attribution (ý 4).",
          "Người duyệt thấy “đã đọc hồ sơ X, chính sách Y”, nhưng không biết kết luận “đủ điều kiện hoàn tiền” dựa vào dòng nào. Vẫn phải tra lại để nối, đúng việc đề muốn bỏ.",
          "Dễ bị cuốn vì danh sách đầy đủ trông minh bạch. Nhưng đầy đủ mà không nối được claim với nguồn thì vẫn không kiểm được."
        ] },
      { k: "B", gist: "Have the handoff step attach the most likely supporting record or policy clause to each conclusion before passing it to the reviewer.",
        why: [
          "Sai ở chỗ gắn nguồn sau khi nguồn đã rơi (ý 2). Bước handoff không biết subagent thật sự dựa vào đâu, chỉ đoán cái “most likely” (nhiều khả năng nhất).",
          "Đoán sai thì kết luận mang một trích dẫn trông đáng tin mà sai. Trong tranh chấp tiền bạc, vậy còn tệ hơn để trống.",
          "Dễ bị cuốn vì kết quả trông y hệt C: mỗi kết luận một nguồn. Nhưng ở C nguồn là thứ subagent đã dùng, ở B là thứ đoán lại."
        ] },
      { k: "C", gist: "Have each subagent return its findings paired with the record or policy clause behind each one, and keep those pairs intact in the handoff.",
        why: [
          "Subagent là bên duy nhất biết mình dựa vào hồ sơ nào, điều khoản nào. Nó gắn nguồn ngay lúc tìm ra kết luận (ý 1).",
          "Coordinator và bước handoff giữ nguyên các cặp kết luận–nguồn, không viết lại thành văn xuôi (ý 3). Nguồn không rơi ở bước nén (ý 2).",
          "Người duyệt nhận từng kết luận kèm chỗ để kiểm. Đồng ý hay bác thì nhìn thẳng vào nguồn đó, không phải điều tra lại."
        ] },
      { k: "D", gist: "Have the agent give each conclusion a numeric confidence score so reviewers know which ones need independent checking.",
        why: [
          "Sai ở giả định: điểm tự tin model tự chấm không đáng tin, model có thể tự tin mà sai (ý 4).",
          "Kể cả điểm có chuẩn, nó cũng không chỉ ra hồ sơ hay điều khoản nào. Người duyệt biết câu nào nên kiểm, nhưng vẫn phải tự tra lại từ đầu."
        ] }
    ],
    refs: [
      { label: "Bài 5.6, mục “Chuyện gì đang xảy ra”: attribution mất trong bước tóm tắt; claim–source mapping phải được giữ và gộp qua mọi agent", href: NOTES + "#l-5-6" },
      { label: "Cheatsheet D5: dòng “Báo cáo mất nguồn sau synthesis” → claim–source mapping có cấu trúc, bảo toàn qua mọi bước", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 6, n: 12, total: 60, sub: "5.1", subName: "Giữ thông tin quan trọng trong hội thoại dài", scen: "S1",
    answer: "B",
    ask: "A customer discusses two open orders in a single session. After compaction partway through, the summary reads “damaged item confirmed, return eligible, $62.40 refund agreed,” and the agent then calls <code>process_refund</code> on the wrong order. Which change would best prevent this failure?",
    scene: [
      "Một khách có hai đơn đang mở, nói về cả hai trong cùng một phiên.",
      "Giữa phiên, lịch sử bị compact (tóm tắt phần cũ cho gọn). Bản tóm tắt còn: “damaged item confirmed, return eligible, $62.40 refund agreed” (đã xác nhận hàng hỏng, đủ điều kiện đổi trả, đã chốt hoàn $62.40).",
      "Sau đó agent gọi <code>process_refund</code> cho nhầm đơn.",
      "Chỗ khó: dữ kiện vẫn còn đủ, con số cũng đúng. Thứ rơi mất là dữ kiện nào thuộc đơn nào. Ví dụ minh họa:<pre><code>Trước compact:  lookup_order(đơn 1) → hàng hỏng, $62.40\n                lookup_order(đơn 2) → ...\nSau compact:    \"damaged item confirmed, return eligible,\n                 $62.40 refund agreed\"   ← của đơn nào?</code></pre>"
    ],
    asks: [
      "Thay đổi nào ngăn lỗi này hiệu quả nhất?",
      "Tức là: sau compact, agent vẫn phải biết từng dữ kiện thuộc đơn nào, để gọi refund đúng đơn.",
      "Soi từng phương án: mối nối dữ kiện → đơn có còn sau compact không? Không còn thì kiểm, hỏi lại hay chấm điểm cũng chỉ là đoán."
    ],
    facts: [
      "Compaction thay phần lịch sử cũ bằng bản tóm tắt. Từ đó model chỉ còn bản tóm tắt: cái gì không có trong đó thì với model coi như chưa từng có.",
      "Tóm tắt là nén có mất mát. Thứ mất trước tiên là chi tiết chính xác như mã đơn, và việc dữ kiện nào lấy từ kết quả tool nào. Muốn bản tóm tắt giữ thứ gì thì phải dặn rõ.",
      "Guide 5.1: phiên có nhiều issue thì giữ dữ liệu có cấu trúc riêng cho từng issue (mã đơn, số tiền, trạng thái). Cách chắc nhất là case facts block theo từng đơn, nằm ngoài phần bị tóm tắt.",
      "Confidence tự chấm lệch so với độ đúng thật. Ở đây agent gọi nhầm đơn mà không hề do dự."
    ],
    opts: [
      { k: "A", gist: "Raise the compaction threshold so the summary gets written later, after the agent has finished talking through both refunds.",
        why: [
          "Sai ở chỗ chỉ dời thời điểm. Tóm muộn hơn thì bản tóm tắt vẫn bỏ mối nối dữ kiện → đơn như cũ (ý 2).",
          "Đề cho thấy lúc compact chạy, việc điều tra đã xong: hàng hỏng đã xác nhận, số tiền đã chốt. Tóm lúc nào thì bản tóm tắt cũng mất đúng chỗ đó.",
          "Dễ bị cuốn vì nghe như compact sớm quá nên mất. Nhưng gốc lỗi là bản tóm tắt giữ gì, không phải tóm lúc nào."
        ] },
      { k: "B", gist: "Require the compaction summary to keep each retained fact tied to its order ID and to the <code>lookup_order</code> result it came from.",
        why: [
          "Sửa đúng chỗ rơi: mỗi dữ kiện trong bản tóm tắt đi kèm mã đơn và kết quả <code>lookup_order</code> sinh ra nó (ý 2).",
          "Sau compact agent vẫn đọc được “$62.40 thuộc đơn nào”, nên gọi <code>process_refund</code> đúng đơn. Đúng ý guide: phiên nhiều issue thì giữ dữ liệu riêng theo từng issue (ý 3).",
          "Cách chắc hơn nữa là đưa dữ kiện từng đơn ra case facts block nằm ngoài phần bị tóm (ý 3). Đề không đưa phương án đó; trong bốn cái, B là cái duy nhất giữ lại mối nối."
        ] },
      { k: "C", gist: "Have the agent score its confidence in the order match and escalate to a human whenever the score falls under a threshold.",
        why: [
          "Sai ở giả định: confidence tự chấm không đáng tin (ý 4). Agent vừa gọi nhầm đơn mà không do dự, tức là nó đang tự tin.",
          "Có chuyển người thì người đó cũng phải tra lại từ đầu, vì bản tóm tắt không còn nói dữ kiện nào của đơn nào (ý 1)."
        ] },
      { k: "D", gist: "Add a system prompt rule that the agent must confirm which order a refund belongs to before it calls <code>process_refund</code>.",
        why: [
          "Là chốt chặn phía sau, không vá chỗ mất. Muốn xác nhận thì agent phải đối chiếu với cái gì đó, mà bản tóm tắt không còn nói dữ kiện nào của đơn nào (ý 1).",
          "Agent sẽ xác nhận dựa trên đoán, hoặc bắt khách kể lại thứ đã kể. Lời dặn trong prompt cũng chỉ là xác suất.",
          "Dễ bị cuốn vì nghe an toàn: kiểm trước khi làm. Nhưng thiếu dữ kiện để kiểm thì kiểm cũng không chặn được lỗi."
        ] }
    ],
    refs: [
      { label: "Bài 5.1, mục “Bộ kỹ thuật đi kèm”: phiên nhiều issue thì giữ dữ liệu có cấu trúc riêng cho từng issue (mã đơn, số tiền, trạng thái)", href: NOTES + "#l-5-1" },
      { label: "Cheatsheet D5: dòng “Hội thoại dài, lượt cũ được tóm tắt, agent nhầm số tiền/ngày/mã đơn” → case facts block", href: NOTES + "#cheat-d5" },
      { label: "Bài 5.4, mục “Biết thêm”: “/compact focus on” kèm chủ đề thì bản tóm tắt giữ thứ bạn chọn", href: NOTES + "#l-5-4" }
    ]
  },
  {
    de: 6, n: 13, total: 60, sub: "1.5", subName: "Hook của Agent SDK: chặn tool call và chuẩn hóa dữ liệu", scen: "S1",
    answer: "AC",
    ask: "A <code>PreToolUse</code> hook already denies <code>process_refund</code> calls above the policy cap. The team is adding two more hooks: one logs every refund attempt for audit, the other approves promotional refunds. Neither new hook may be able to weaken the cap. Which two decisions keep the cap enforced? (Choose two.)",
    scene: [
      "Đã có một hook <code>PreToolUse</code> chặn (deny) mọi lệnh <code>process_refund</code> vượt mức trần (cap) của chính sách.",
      "Team thêm hai hook: một hook ghi log mọi lần thử hoàn tiền để kiểm toán, một hook duyệt (allow) hoàn tiền khuyến mãi.",
      "Yêu cầu: không hook mới nào được làm yếu mức trần.",
      "Chỗ khó: hook khuyến mãi trả allow có thể rơi đúng vào lệnh vượt trần mà hook cũ trả deny. Phải biết hai quyết định trái nhau thì cái nào thắng, và hook ghi log có đụng được tới quyết định không."
    ],
    asks: [
      "Hai quyết định nào giữ cho mức trần vẫn được thi hành?",
      "Tức là: một điều cho thấy hook cũ vẫn thắng dù có hook allow mới, và một cách gắn hook ghi log để nó không thể đụng tới quyết định cho chạy hay không.",
      "Soi từng phương án: nó chạy trước hay sau khi refund thực thi, và là code thi hành chắc chắn hay chỉ là lời dặn?"
    ],
    facts: [
      "<code>PreToolUse</code> chạy trước khi tool thực thi, trả quyết định qua <code>permissionDecision</code>: <code>allow</code>, <code>ask</code>, <code>deny</code>, <code>defer</code>. Hook là code nên chắc chắn (deterministic); system prompt là lời dặn nên chỉ là xác suất.",
      "Nhiều hook cùng khớp một tool call thì chạy song song, và cái chặt nhất thắng: <code>deny</code> &gt; <code>defer</code> &gt; <code>ask</code> &gt; <code>allow</code>. Một hook trả <code>deny</code> là đủ chặn, đăng ký trước hay sau không quan trọng.",
      "Hook có thể trả output async (<code>async: true</code>): agent chạy tiếp ngay, không chờ hook xong. Docs ghi output async không chặn, không sửa, không chèn context được vào thao tác, chỉ dùng cho việc phụ như ghi log, đo đếm, thông báo.",
      "<code>PostToolUse</code> chạy sau khi tool đã chạy xong. Nó sửa được kết quả Claude đọc, nhưng không làm việc đã chạy biến mất."
    ],
    opts: [
      { k: "A", gist: "Leave the cap hook unchanged; a second hook returning <code>allow</code> cannot override its <code>deny</code>.",
        why: [
          "Lệnh vượt trần: hook cũ trả <code>deny</code>, hook khuyến mãi trả <code>allow</code>. Cái chặt nhất thắng, nên <code>deny</code> thắng (ý 2).",
          "Hook chạy song song, đăng ký trước hay sau cũng vậy. Không cần sửa gì ở hook cũ."
        ] },
      { k: "B", gist: "Move the cap check into a <code>PostToolUse</code> hook so it can look at the completed refund result too.",
        why: [
          "Sai thời điểm: <code>PostToolUse</code> chạy khi refund đã chạy xong (ý 4). Hook thấy vượt trần thì tiền đã đi rồi.",
          "Còn làm yếu mức trần: bỏ chốt chặn phía trước, thay bằng một chỗ chỉ xem lại sau.",
          "Dễ bị cuốn vì “xem được cả kết quả” nghe như kiểm kỹ hơn. Nhưng mức trần cần chặn trước khi chạy, không phải soát sau."
        ] },
      { k: "C", gist: "Build the audit logging as an async hook, because async output cannot change the permission decision.",
        why: [
          "Ghi log là việc phụ, đúng loại việc docs dành cho output async (ý 3).",
          "Hook async trả về ngay, agent chạy tiếp; output của nó không chặn, không sửa, không cho phép được gì. Hook log không thể làm yếu mức trần, hook cũ vẫn là chốt chặn duy nhất."
        ] },
      { k: "D", gist: "State the cap in the system prompt so the promotional hook never receives an over-limit refund call.",
        why: [
          "Sai ở giả định: lời dặn trong system prompt là xác suất (ý 1). Phần lớn lần Claude làm theo, không phải mọi lần.",
          "Lệnh vượt trần có tới hook hay không giờ phụ thuộc Claude có nghe lời không. Vậy là đổi chốt chặn bằng code thành lời dặn, đúng thứ hook sinh ra để thay.",
          "Dễ bị cuốn vì nghe như thêm một lớp bảo vệ. Nhưng đề hỏi cái gì giữ mức trần, và chỉ code mới giữ chắc."
        ] }
    ],
    refs: [
      { label: "Bài 1.5, ô “Đã sửa 02/11”: bốn quyết định của PreToolUse; nhiều hook thì cái chặt nhất thắng", href: NOTES + "#fix-11" },
      { label: "Bài 1.5: hook là deterministic, prompt là probabilistic; PreToolUse chạy trước tool, PostToolUse chạy sau", href: NOTES + "#l-1-5" },
      { label: "Docs Agent SDK hooks, mục “Asynchronous output”: output async không chặn, không sửa, không chèn context; chỉ cho ghi log, đo đếm, thông báo", href: "https://code.claude.com/docs/en/agent-sdk/hooks" }
    ]
  },
  {
    de: 6, n: 14, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S1",
    answer: "B",
    ask: "The agent paused a return case to wait for a damage photo, and the customer sends it twenty minutes later. Identity and the order were already verified, nothing changed in the backend records, and the agent runs on a shared host that serves many customers' sessions. How should the agent pick the case back up?",
    scene: [
      "Agent đang xử lý một ca đổi trả thì tạm dừng, chờ khách gửi ảnh chụp hàng hỏng. 20 phút sau khách gửi.",
      "Danh tính khách và đơn hàng đã xác minh xong. Dữ liệu ở backend không đổi gì.",
      "Agent chạy trên một máy dùng chung, phục vụ phiên của nhiều khách cùng lúc.",
      "Chỗ khó: hai câu hỏi lồng nhau. Lịch sử cũ còn đáng tin để dùng lại không? Nếu dùng lại thì lấy đúng phiên của khách này bằng cách nào, khi trên máy còn nhiều phiên khác."
    ],
    asks: [
      "Agent nên tiếp tục ca này thế nào?",
      "Tức là: mở lại đúng phiên của khách này, giữ mọi thứ đã xác minh, không làm lại việc cũ, không vớ nhầm phiên của khách khác.",
      "Soi từng phương án: nó có dùng lại lịch sử còn đúng không, và nó chỉ ra phiên bằng gì (ID, phiên gần nhất, hay dán tay)?"
    ],
    facts: [
      "Phiên (session) là toàn bộ hội thoại: prompt, mọi tool call, mọi kết quả tool. SDK tự lưu xuống đĩa, mỗi phiên có ID riêng. Resume là mở lại phiên đó và làm tiếp với đủ context cũ.",
      "Resume khi phần lớn những gì agent biết vẫn còn đúng. Khi kết quả tool cũ đã lỗi thời (dữ liệu bên ngoài đã đổi) thì mới mở phiên mới kèm bản tóm tắt có cấu trúc.",
      "<code>continue</code> mở phiên gần nhất trong thư mục hiện tại. <code>resume</code> nhận một session ID cụ thể. Docs ghi app nhiều người dùng (mỗi người một phiên) thì cần resume theo ID.",
      "Trường <code>session_id</code> có trên mọi result message, thành công hay lỗi. App lưu ID đó theo từng ca để lần sau resume."
    ],
    opts: [
      { k: "A", gist: "Open a new session and have the agent call <code>get_customer</code> and <code>lookup_order</code> again to rebuild the case.",
        why: [
          "Phiên mới hợp khi kết quả tool cũ đã lỗi thời (ý 2). Ở đây không: backend không đổi, mới 20 phút.",
          "Gọi lại tool là làm lại việc đã xong: thêm độ trễ, thêm tool call, khách phải chờ thêm. Phần lập luận về ca đổi trả cũng mất."
        ] },
      { k: "B", gist: "Resume that customer's session using the session ID saved from the earlier result message.",
        why: [
          "Lịch sử cũ còn đúng (ý 2): khách đã xác minh, đơn đã tra, backend không đổi. Resume giữ lại hết, agent làm tiếp ngay với ảnh vừa nhận.",
          "ID chỉ đúng một phiên (ý 3). App đã lưu <code>session_id</code> từ result message lần trước (ý 4), nên mở đúng phiên của khách này, không đụng phiên của khách khác trên máy."
        ] },
      { k: "C", gist: "Use <code>continue</code> to reopen the host's most recent session so the latest context carries over.",
        why: [
          "Sai ở giả định: <code>continue</code> mở phiên gần nhất trong thư mục, không biết phiên nào của ai (ý 3).",
          "Máy phục vụ nhiều khách, nên trong 20 phút đó phiên gần nhất rất có thể là của người khác. Agent sẽ xử lý ảnh với hồ sơ của khách khác.",
          "Dễ bị cuốn vì đúng hướng: dùng lại lịch sử cũ. Nhưng <code>continue</code> chỉ an toàn khi máy chạy đúng một hội thoại tại một thời điểm."
        ] },
      { k: "D", gist: "Open a new session and paste the whole earlier transcript into its first prompt as context.",
        why: [
          "Tự dựng lại bằng tay thứ SDK đã lưu sẵn trên đĩa (ý 1). Dán nguyên văn còn kéo theo cả các kết quả tool dài dòng, tốn context.",
          "Không được gì hơn resume, lại dễ sót hoặc lệch so với phiên gốc."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Ba cách nối lại công việc”: resume khi phần lớn còn đúng; phiên mới + tóm tắt khi kết quả tool đã lỗi thời", href: NOTES + "#l-1-7" },
      { label: "Cheatsheet D1: dòng “Job CI tiếp nhầm phiên của người khác” → --resume thay cho --continue", href: NOTES + "#cheat-d1" },
      { label: "Docs Agent SDK “Work with sessions”: continue lấy phiên gần nhất trong thư mục; resume theo ID cho app nhiều người dùng; session_id có trên mọi result message", href: "https://code.claude.com/docs/en/agent-sdk/sessions" }
    ]
  },
  {
    de: 6, n: 15, total: 60, sub: "5.2", subName: "Escalate và xử lý chỗ mơ hồ", scen: "S1",
    answer: "A",
    ask: "Logs show the agent calling <code>escalate_to_human</code> as soon as a customer writes something like “this is ridiculous,” even on routine returns it could finish on its own, which pushes first-contact resolution far below target. The tool's description currently says: “Use when the customer seems upset or dissatisfied.” What should the team change first?",
    scene: [
      "Log cho thấy: khách vừa viết kiểu “this is ridiculous” (vô lý thật) là agent gọi <code>escalate_to_human</code> ngay.",
      "Kể cả ca đổi trả thường, agent tự làm xong được. Tỉ lệ giải quyết ngay lần đầu (first-contact resolution) tụt xa dưới mục tiêu.",
      "Description hiện tại của tool: “Use when the customer seems upset or dissatisfied” (dùng khi khách có vẻ bực hoặc không hài lòng).",
      "Chỗ khó: agent không làm trái lời dặn. Nó làm đúng y như description bảo."
    ],
    asks: [
      "Team nên đổi gì trước tiên?",
      "Tức là: sửa chỗ gốc khiến agent coi khách bực là lý do chuyển người, bằng cách rẻ nhất.",
      "Soi từng phương án: nó có còn để tâm trạng khách quyết định chuyển người không, và có sửa đúng cái description đang dạy sai không?"
    ],
    facts: [
      "Model quyết định gọi tool chủ yếu dựa vào description của tool. Tool bị gọi sai thì sửa description trước, mọi thứ khác sau.",
      "Guide chỉ có 3 trigger escalate: khách yêu cầu gặp người thật; policy không có hoặc mơ hồ (policy gap); agent không thể tiến triển. Khách bực mà ca nằm trong policy thì ghi nhận cảm xúc rồi giải quyết; khách nhắc lại đòi gặp người thì mới chuyển.",
      "Sentiment (mức tiêu cực trong lời khách) đo tâm trạng, không đo độ khó của ca. Confidence model tự chấm thì hiệu chuẩn kém. Cả hai đều là thước đo thay thế không đáng tin cho việc escalate.",
      "Hook dùng khi cần bảo đảm chắc chắn một bước không bị bỏ qua. Lỗi do description dạy sai thì sửa description, không cần dựng thêm cổng chặn."
    ],
    opts: [
      { k: "A", gist: "Rewrite the <code>escalate_to_human</code> description so that frustration alone is not a trigger, but an explicit request for a human is.",
        why: [
          "Sửa đúng gốc: description đang bảo agent chuyển người khi khách bực (ý 1). Viết lại theo đúng trigger: khách đòi gặp người, policy gap, không tiến triển được (ý 2).",
          "Khách chỉ than thì agent ghi nhận rồi tự xử ca đổi trả, tỉ lệ giải quyết ngay lần đầu lên lại. Không thêm hạ tầng nào, nên là thay đổi rẻ nhất để làm trước."
        ] },
      { k: "B", gist: "Put a sentiment classifier in front of the agent and call <code>escalate_to_human</code> only when the negativity score crosses a tuned threshold.",
        why: [
          "Giữ nguyên ý sai: vẫn để tâm trạng khách quyết định chuyển người, chỉ thêm một con số (ý 3).",
          "Khách bực về một ca đổi trả thường vẫn là ca agent tự xử được. Chỉnh ngưỡng kiểu gì cũng không biến mức bực thành độ khó của ca.",
          "Dễ bị cuốn vì nghe khoa học hơn: đo hẳn hoi, có ngưỡng tinh chỉnh. Nhưng đo sai thứ thì đo kỹ đến mấy cũng sai."
        ] },
      { k: "C", gist: "Add a <code>PreToolUse</code> hook that blocks <code>escalate_to_human</code> unless the customer's latest message includes the word “human” or “manager”.",
        why: [
          "Cổng theo từ khóa quá giòn. Khách đòi gặp người theo đủ kiểu nói, còn policy gap hay không tiến triển được thì chẳng chứa từ nào trong đó (ý 2). Hook sẽ chặn cả ca phải chuyển.",
          "Description sai vẫn còn, agent vẫn với lấy tool mỗi lần khách bực. Hook dành cho chỗ cần bảo đảm chắc chắn, còn đây là lời dặn sai cần sửa (ý 4)."
        ] },
      { k: "D", gist: "Have the agent rate its confidence in resolving the issue and call <code>escalate_to_human</code> only when that rating drops below a cutoff.",
        why: [
          "Sai ở giả định: confidence tự chấm hiệu chuẩn kém (ý 3). Model có thể tự tin ở ca khó và lưỡng lự ở ca dễ.",
          "Description sai vẫn giữ nguyên. Chỉ là thay một thước đo không đáng tin bằng một thước đo không đáng tin khác."
        ] }
    ],
    refs: [
      { label: "Bài 5.2, mục “Đã sửa 01/11”: ba trigger escalate; khách bực mà ca giải quyết được thì ghi nhận rồi đề xuất, chỉ chuyển khi khách nhắc lại", href: NOTES + "#fix-9" },
      { label: "Cheatsheet D5: dòng “Khách bực nhưng vấn đề trong policy” và dòng “Đề xuất sentiment analysis hoặc confidence 1–10 để escalate”", href: NOTES + "#cheat-d5" },
      { label: "Bài 2.1, mục “Biết thêm” và Quy tắc: model chọn tool bằng description; tool bị gọi sai thì sửa description trước", href: NOTES + "#l-2-1" }
    ]
  },
  {
    de: 6, n: 16, total: 60, sub: "3.1", subName: "Cấp của CLAUDE.md và chia sẻ cho team", scen: "S4",
    answer: "B",
    ask: "In this team's monorepo, the root CLAUDE.md holds TypeScript rules shared by every package. Only the legacy billing package needs additional conventions for its custom ORM. Where should those billing-only conventions live?",
    scene: [
      "Monorepo có CLAUDE.md ở gốc, chứa quy tắc TypeScript chung cho mọi package.",
      "Riêng package billing (code cũ) cần thêm quy ước cho ORM tự viết của nó. ORM là lớp code ánh xạ bảng database thành object.",
      "Chỗ khó: quy ước chỉ dùng trong một thư mục. Phải đặt sao cho có mặt khi sửa billing, không chiếm context khi làm package khác, mà cả team vẫn nhận được."
    ],
    asks: [
      "Quy ước riêng của billing nên đặt ở đâu?",
      "Tức là: chọn chỗ vừa đi theo git cho cả team, vừa chỉ nạp khi Claude đụng tới code billing, mà không phải chép lại phần chung.",
      "Soi từng phương án: file nạp lúc nào, ai thấy, và có phải giữ hai bản của cùng một thứ không?"
    ],
    facts: [
      "CLAUDE.md có ba cấp: user (<code>~/.claude/CLAUDE.md</code>, của riêng một người, không đi theo git), project (gốc repo, cả team), directory (CLAUDE.md trong thư mục con).",
      "Lúc khởi động, Claude Code nạp CLAUDE.md ở thư mục đang đứng và mọi thư mục cha. CLAUDE.md thư mục con chỉ nạp khi Claude đọc hoặc sửa file trong thư mục đó.",
      "Các cấp cộng dồn vào context, không cấp nào đè cấp nào. File thư mục con chỉ cần ghi phần thêm, phần chung đã có ở file gốc.",
      "CLAUDE.md gốc nạp ở mọi phiên. File càng dài thì Claude bám từng chỉ dẫn càng kém."
    ],
    opts: [
      { k: "A", gist: "Add them to the root CLAUDE.md under a dedicated billing heading, so no context is ever missed.",
        why: [
          "Chạy được, nhưng quy ước ORM nạp vào mọi phiên, kể cả khi chỉ làm package khác (ý 4).",
          "File gốc dài thêm thì quy tắc TypeScript chung cũng bị bám kém đi. Quy ước của một thư mục thì để ở thư mục đó (ý 2).",
          "Dễ bị cuốn vì “no context is ever missed” (không bao giờ sót) nghe an toàn. Nhưng CLAUDE.md thư mục con cũng không sót: nó tự nạp đúng lúc Claude đụng tới billing."
        ] },
      { k: "B", gist: "Add them in a CLAUDE.md inside the billing package directory, next to the root file.",
        why: [
          "File nằm trong repo nên cả team có. Nó chỉ nạp khi Claude đọc hoặc sửa file trong billing (ý 2), làm package khác thì không tốn context.",
          "Nó cộng thêm vào file gốc, không thay (ý 3). Khi sửa billing, Claude có cả quy tắc TypeScript chung lẫn quy ước ORM."
        ] },
      { k: "C", gist: "Add them to every developer's <code>~/.claude/CLAUDE.md</code> so the rules follow them into the billing code.",
        why: [
          "Sai cấp: file cấp user là của riêng từng người, không đi theo git (ý 1). Ai quên thêm, hay người mới vào team, thì không có quy ước.",
          "File này còn áp cho mọi project trên máy người đó, nên quy ước ORM của billing đi theo họ sang cả project không liên quan."
        ] },
      { k: "D", gist: "Place a copy of the root CLAUDE.md in the billing directory with the extra rules appended at the end.",
        why: [
          "Không cần chép: các cấp cộng dồn, phần chung đã nạp từ file gốc (ý 3).",
          "Chép thì quy tắc TypeScript vào context hai lần khi sửa billing. Tệ hơn là có hai bản phải sửa cùng nhau; đổi chuẩn chung mà quên bản billing thì hai bên lệch nhau."
        ] }
    ],
    refs: [
      { label: "Bài 3.1, mục “Chuyện gì đang xảy ra”: bảng ba cấp user / project / directory, cấp nào ai thấy", href: NOTES + "#l-3-1" },
      { label: "Bài 3.0: các file cộng dồn, không file nào đè file nào; CLAUDE.md thư mục con chỉ nạp khi cần", href: NOTES + "#l-3-0" },
      { label: "Cheatsheet D3: dòng “CLAUDE.md của packages/api không được áp khi mở từ gốc monorepo” → thư mục con nạp lười", href: NOTES + "#cheat-d3" }
    ]
  },
  {
    de: 6, n: 17, total: 60, sub: "2.1", subName: "Thiết kế tool: description rõ, ranh giới rõ", scen: "S4",
    answer: "D",
    ask: "To keep the agent from answering repository questions from memory, this team put “CRITICAL: You MUST run Grep before responding to ANY question” in the system prompt. Now Grep runs even on follow-ups like “say that more simply.” What should the team change?",
    scene: [
      "Team muốn agent thôi trả lời câu hỏi về repo theo trí nhớ, nên thêm vào system prompt: “CRITICAL: You MUST run Grep before responding to ANY question” (CỰC KỲ QUAN TRỌNG: BẮT BUỘC chạy Grep trước khi trả lời BẤT KỲ câu hỏi nào).",
      "Giờ Grep chạy cả với câu nối tiếp kiểu “say that more simply” (nói đơn giản hơn đi), là câu chẳng cần tra gì.",
      "Chỗ khó: lời dặn viết quá mạnh làm agent gọi tool thừa (overtrigger). Cần sửa sao cho hỏi về code thì vẫn tra, còn câu nói chuyện thì trả lời luôn."
    ],
    asks: [
      "Team nên đổi gì?",
      "Tức là: trả lại cho agent quyền tự phán đoán khi nào cần Grep, mà vẫn giữ ý “hỏi về code thì phải tra”.",
      "Soi từng phương án: nó bớt ép hay ép thêm, và có sinh thêm thứ phải bảo trì không?"
    ],
    facts: [
      "Với <code>tool_choice</code> mặc định là <code>auto</code>, Claude tự quyết từng lượt có gọi tool hay trả lời thẳng. Lời trong system prompt đẩy quyết định đó nghiêng về phía nào.",
      "Docs prompting best practices: model mới nghe system prompt kỹ hơn, nên lời dặn viết mạnh để chống gọi tool thiếu giờ lại gây gọi thừa. Cách sửa là viết dịu lại: thay “CRITICAL: You MUST use this tool when...” bằng “Use this tool when...”.",
      "Notes bài 2.1 cũng dặn: đừng ra lệnh bằng MUST / CRITICAL trong description, vì nó khiến model gọi tool thừa. Hãy mô tả điều kiện dùng.",
      "<code>tool_choice: {\"type\": \"any\"}</code> bắt Claude gọi một tool ở mọi lượt, không trả text thuần. Nó dùng để ép có tool call, không để bớt."
    ],
    opts: [
      { k: "A", gist: "Keep the directive and append an exception list naming every kind of follow-up that should skip Grep.",
        why: [
          "Giữ nguyên gốc lỗi: câu lệnh viết quá mạnh vẫn còn đó (ý 2). Danh sách ngoại lệ chỉ vá từng triệu chứng.",
          "Kiểu câu nói chuyện thì vô số. Gặp kiểu mới lại phải thêm một dòng, danh sách cứ dài ra mà không bao giờ đủ."
        ] },
      { k: "B", gist: "Set <code>tool_choice</code> to <code>any</code> so the API, not the prompt wording, decides on each turn whether Grep is called.",
        why: [
          "Sai ở giả định: <code>any</code> không “quyết” gì cả. Nó bắt Claude gọi một tool ở mọi lượt (ý 4).",
          "Câu “nói đơn giản hơn đi” vẫn phải gọi tool. Lỗi gọi thừa còn bị khóa chặt hơn, đúng ngược điều team cần.",
          "Dễ bị cuốn vì nghe như giao cho cơ chế của API thay cho lời dặn mập mờ. Nhưng cơ chế đó chỉ ép có tool call, không ép bớt."
        ] },
      { k: "C", gist: "Add a <code>PreToolUse</code> hook that classifies each user message and blocks Grep on conversational turns.",
        why: [
          "Dựng cả bộ phân loại lẫn hook chỉ để chặn đúng cái system prompt đang đòi. Lỗi nằm ở câu chữ, sửa câu chữ là xong (ý 2).",
          "Thêm một chỗ có thể sai: bộ phân loại nhầm thì chặn luôn cả lần tra code đúng."
        ] },
      { k: "D", gist: "Tone the directive down to plain wording such as “Use Grep when a question is about code in this repository.”",
        why: [
          "Sửa đúng gốc: bỏ CRITICAL, MUST, ANY, thay bằng câu mô tả khi nào dùng, đúng cách docs khuyên (ý 2, ý 3).",
          "Hỏi về code trong repo thì agent vẫn tra Grep. Câu nói chuyện như “nói đơn giản hơn” thì trả lời luôn từ context, vì <code>auto</code> để Claude tự quyết (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 2.1, mục “Biết thêm”: đừng ra lệnh bằng MUST / CRITICAL, hãy mô tả điều kiện dùng tool", href: NOTES + "#l-2-1" },
      { label: "Bài 2.3: tool_choice auto / any / forced; any bắt buộc gọi một tool", href: NOTES + "#l-2-3" },
      { label: "Docs Prompting best practices: lời dặn viết mạnh làm model mới gọi tool thừa; đổi “CRITICAL: You MUST use this tool when...” thành “Use this tool when...”", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
    ]
  },
  {
    de: 6, n: 18, total: 60, sub: "3.6", subName: "Đưa Claude Code vào CI/CD", scen: "S4",
    answer: "A",
    ask: "Every night this team runs Claude Code in print mode to list legacy modules, and a dashboard reads the output. The dashboard's parser breaks now and then because the answer is sometimes prose and sometimes loosely formatted JSON. Which change fixes this most reliably?",
    scene: [
      "Mỗi đêm team chạy Claude Code ở print mode (<code>claude -p</code>, chạy không tương tác) để liệt kê các module cũ. Một dashboard đọc output đó.",
      "Thỉnh thoảng parser (bộ đọc) của dashboard hỏng, vì câu trả lời lúc là văn xuôi, lúc là JSON viết lỏng lẻo.",
      "Chỗ khó: job chạy không ai trông, nên output phải đúng hình mọi lần, không phải phần lớn lần."
    ],
    asks: [
      "Thay đổi nào sửa chuyện này chắc chắn nhất?",
      "Tức là: làm sao để câu trả lời được kiểm theo schema trước khi tới tay dashboard, thay vì trông vào model tự viết đúng.",
      "Soi từng phương án: có cái gì kiểm câu trả lời theo schema không, hay vẫn là chữ model tự viết?"
    ],
    facts: [
      "<code>--output-format</code> có ba giá trị: <code>text</code> (mặc định), <code>json</code>, <code>stream-json</code>. Với <code>json</code>, output là một vỏ JSON chứa metadata (session ID, chi phí…), câu trả lời dạng chữ nằm ở trường <code>result</code>.",
      "Vỏ JSON đó không ràng buộc nội dung câu trả lời. Chữ trong <code>result</code> là thứ model tự viết, văn xuôi hay JSON lỏng đều có thể.",
      "Thêm <code>--json-schema</code> cùng <code>--output-format json</code> thì câu trả lời phải theo schema, dữ liệu nằm ở trường <code>structured_output</code>. Script đọc trường đó thay vì bóc chữ.",
      "Lời dặn trong prompt (“trả đúng JSON”) chỉ tăng xác suất, không bảo đảm."
    ],
    opts: [
      { k: "A", gist: "Add <code>--json-schema</code> with the dashboard schema to the <code>--output-format json</code> run and read <code>structured_output</code>.",
        why: [
          "Schema giờ do CLI kiểm, không trông vào lời dặn (ý 3). Câu trả lời ra đúng hình dashboard cần, nằm ở <code>structured_output</code>.",
          "Dashboard đọc thẳng trường đó, khỏi đoán văn xuôi hay JSON. Đúng thứ một job chạy đêm không người trông cần.",
          "Docs còn dặn: kiểm trường <code>structured_output</code> có mặt trước khi dùng, vì một lần chạy có thể kết thúc mà không ra structured output."
        ] },
      { k: "B", gist: "Wrap the run in a retry loop that calls the same command again until its output parses cleanly.",
        why: [
          "Vá triệu chứng: lần chạy lại không bị ràng buộc gì hơn lần trước (ý 2), chỉ cầu may lần sau đúng.",
          "Mỗi lần thử là một lần chạy agent trọn vẹn, tốn tiền và thời gian. Mà không biết phải thử mấy lần.",
          "Dễ bị cuốn vì chạy lại vài lần thường là được, nhìn như đã sửa. Nhưng CLI có sẵn cách kiểm schema, dùng nó thì khỏi phải thử lại."
        ] },
      { k: "C", gist: "Add a prompt instruction saying the answer must be valid JSON that matches the dashboard schema exactly.",
        why: [
          "Lời dặn chỉ tăng xác suất (ý 4). Đây đúng là tình trạng đang có: phần lớn lần đúng, thỉnh thoảng hỏng.",
          "Đã có cơ chế kiểm schema trước khi trả về thì đừng dựa vào lời dặn cho một job chạy không người trông."
        ] },
      { k: "D", gist: "Keep <code>--output-format json</code> alone and parse whatever JSON the model wrote inside the <code>result</code> text field.",
        why: [
          "Sai ở giả định: vỏ JSON không ràng buộc câu trả lời (ý 2). Trong <code>result</code> vẫn là chữ model tự viết.",
          "Văn xuôi hay JSON lỏng vẫn lọt vào <code>result</code>, dashboard vẫn hỏng thỉnh thoảng như cũ.",
          "Dễ bị cuốn vì có chữ “json” trong cờ, nghe như output đã là JSON. Vỏ đúng là JSON, còn ruột thì không."
        ] }
    ],
    refs: [
      { label: "Bài 3.6, mục “Biết thêm”: với --output-format json câu trả lời ở .result; có --json-schema thì dữ liệu ở .structured_output", href: NOTES + "#l-3-6" },
      { label: "Cheatsheet D3: dòng “Cần JSON để đăng inline PR comment” → --output-format json --json-schema", href: NOTES + "#cheat-d3" },
      { label: "Docs “Run Claude Code programmatically”, mục Get structured output: --json-schema, trường structured_output, kiểm trường có mặt trước khi dùng", href: "https://code.claude.com/docs/en/headless" }
    ]
  },
  {
    de: 6, n: 19, total: 60, sub: "3.6", subName: "Đưa Claude Code vào CI/CD", scen: "S4",
    answer: "CD",
    ask: "This team's pipeline script runs <code>claude -p</code> to review each pull request and has to parse every finding (file, line, severity, message) before posting it as an inline comment. Which two practices make the output reliably machine-parseable? (Choose two.)",
    scene: [
      "Pipeline chạy <code>claude -p</code> review từng pull request.",
      "Script phải đọc được từng finding (phát hiện) gồm file, dòng, mức độ, lời nhắn, rồi đăng thành comment inline đúng chỗ.",
      "Chỗ khó: cần hai thứ ăn khớp nhau. Một thứ bắt câu trả lời theo schema, một thứ là đọc đúng chỗ chứa dữ liệu đã kiểm."
    ],
    asks: [
      "Hai cách làm nào giúp output chắc chắn máy đọc được?",
      "Tức là: một cờ để câu trả lời được kiểm theo schema, và một cách đọc lấy đúng phần dữ liệu đã kiểm đó.",
      "Soi từng phương án: nó có thật sự kiểm schema không, và script đọc dữ liệu đã kiểm hay chữ model tự viết?"
    ],
    facts: [
      "Với <code>--output-format json</code>, CLI trả một vỏ JSON: câu trả lời dạng chữ nằm ở <code>result</code>, kèm <code>session_id</code> và metadata. Vỏ đó không kiểm câu trả lời theo schema nào.",
      "Thêm <code>--json-schema</code> thì Claude Code kiểm câu trả lời cuối theo schema và đặt dữ liệu đã kiểm vào trường <code>structured_output</code>. Docs đọc trường này bằng <code>jq '.structured_output'</code>.",
      "Agent vẫn review như thường (đọc file, xem diff); chỉ câu trả lời cuối phải khớp schema. Schema bảo đảm hình dạng (đủ trường, đúng kiểu), không bảo đảm nhận xét đúng.",
      "Lời dặn “chỉ trả JSON” trong prompt là xác suất, không phải bảo đảm."
    ],
    opts: [
      { k: "A", gist: "Tell the prompt to reply only with valid JSON and count on <code>--output-format json</code> alone to enforce the findings schema.",
        why: [
          "Sai ở giả định: <code>--output-format json</code> chỉ bọc vỏ, không kiểm schema (ý 1). Lời dặn trong prompt cũng chỉ là xác suất (ý 4).",
          "Finding vẫn có lúc thiếu trường hay sai hình, script đăng comment lúc được lúc hỏng.",
          "Dễ bị cuốn vì hai thứ cộng lại nghe như đủ: prompt đòi JSON, cờ ra JSON. Nhưng chẳng thứ nào kiểm schema."
        ] },
      { k: "B", gist: "Wrap the command in a retry loop that reruns the review until the <code>result</code> text parses as valid findings JSON.",
        why: [
          "Chạy lại cả lượt review tới khi chữ tình cờ parse được: chậm, tốn tiền, mà parse được chưa chắc đã đủ trường cần.",
          "Kiểm schema đã có sẵn khi dùng <code>--json-schema</code> (ý 2). Tự viết vòng lặp quanh trường chữ là làm lại một cơ chế yếu hơn."
        ] },
      { k: "C", gist: "Read the <code>structured_output</code> field of the JSON envelope instead of parsing the prose in <code>result</code>.",
        why: [
          "Có schema thì dữ liệu đã kiểm nằm ở <code>structured_output</code> (ý 2). Đây là chỗ script nên đọc.",
          "<code>result</code> vẫn là chữ model viết. Bóc từ đó là quay lại đúng cái giòn mà schema sinh ra để bỏ.",
          "Đi đôi với D: có <code>--json-schema</code> thì mới có <code>structured_output</code>."
        ] },
      { k: "D", gist: "Pass the findings schema with <code>--json-schema</code> alongside <code>--output-format json</code> so the run returns validated structured output.",
        why: [
          "<code>--json-schema</code> là cái làm Claude Code kiểm câu trả lời cuối theo schema (ý 2). Thiếu nó thì vỏ JSON chỉ bọc chữ tự do (ý 1).",
          "Agent vẫn review đầy đủ trước, chỉ câu trả lời cuối phải khớp schema (ý 3). Finding ra đủ file, dòng, mức độ, lời nhắn để đăng comment."
        ] }
    ],
    refs: [
      { label: "Bài 3.6: --output-format json + --json-schema để đăng finding thành inline comment; dữ liệu ở .structured_output", href: NOTES + "#l-3-6" },
      { label: "Cheatsheet D3: dòng “Cần JSON để đăng inline PR comment”", href: NOTES + "#cheat-d3" },
      { label: "Docs “Run Claude Code programmatically”, mục Get structured output: ví dụ jq '.structured_output'", href: "https://code.claude.com/docs/en/headless" }
    ]
  },
  {
    de: 6, n: 20, total: 60, sub: "3.2", subName: "Slash command và skill", scen: "S4",
    answer: "B",
    ask: "The team's <code>/verify-build</code> skill ends by running <code>npm run build</code> and <code>npm run lint</code> on freshly generated boilerplate. Developers get a permission prompt for each command, yet the team refuses to pre-approve arbitrary shell commands. What should they configure?",
    scene: [
      "Skill <code>/verify-build</code> của team chạy hai lệnh cuối: <code>npm run build</code> và <code>npm run lint</code>, trên code khung (boilerplate) vừa sinh ra.",
      "Lệnh nào cũng hiện hộp hỏi quyền, dev phải bấm duyệt.",
      "Chỗ khó: team “refuses to pre-approve arbitrary shell commands” (không chịu duyệt sẵn lệnh shell tùy ý). Phải bớt hỏi đúng hai lệnh này mà không mở cửa cho mọi lệnh."
    ],
    asks: [
      "Team nên cấu hình gì?",
      "Tức là: duyệt sẵn đúng các lệnh npm script, chỉ trong lúc skill chạy, còn lệnh shell khác vẫn phải hỏi.",
      "Soi từng phương án: nó duyệt rộng tới đâu (một mẫu lệnh hay mọi lệnh Bash), trong phạm vi nào (lượt gọi skill hay cả phiên), và có phải cấu hình được thi hành không?"
    ],
    facts: [
      "Frontmatter <code>allowed-tools</code> của skill là danh sách tool được duyệt sẵn: Claude dùng không hỏi quyền trong lượt gọi skill, gửi tin nhắn tiếp là hết. Tool không có trong danh sách vẫn gọi được, theo quyền thường.",
      "<code>allowed-tools</code> dùng cùng cú pháp với permission rule: <code>Tool</code> hoặc <code>Tool(mẫu)</code>. <code>Bash(npm run *)</code> chỉ khớp lệnh bắt đầu bằng <code>npm run</code>. Viết <code>Bash</code> trơn là khớp mọi lệnh shell.",
      "Allow rule trong <code>permissions.allow</code> của settings áp cho cả phiên, mọi prompt, mọi skill.",
      "Quyền do Claude Code thi hành, không do model. Chữ viết trong SKILL.md hay CLAUDE.md không cấp hay bỏ quyền được."
    ],
    opts: [
      { k: "A", gist: "Write in the SKILL.md body that only npm scripts may run and that no prompt is needed.",
        why: [
          "Sai ở giả định: hộp hỏi quyền do Claude Code bật, không phải model (ý 4). Chữ trong thân skill không tắt được nó.",
          "Lời dặn có thể khiến Claude chỉ chọn lệnh npm, nhưng lệnh nào vẫn bị hỏi như cũ."
        ] },
      { k: "B", gist: "Add <code>allowed-tools</code> to the skill frontmatter with a scoped entry like <code>Bash(npm run *)</code>.",
        why: [
          "<code>Bash(npm run *)</code> khớp cả <code>npm run build</code> lẫn <code>npm run lint</code> (ý 2), nên hai lệnh chạy không hỏi.",
          "Chỉ trong lượt gọi skill (ý 1). Lệnh shell khác, kể cả trong lúc skill chạy, vẫn hỏi như thường. Đúng mức team chịu được."
        ] },
      { k: "C", gist: "Put <code>Bash</code> in <code>permissions.allow</code> in the project's <code>.claude/settings.json</code> so builds never prompt.",
        why: [
          "Rộng cả hai chiều: áp cho cả phiên, mọi prompt, mọi skill (ý 3), và <code>Bash</code> trơn là mọi lệnh shell (ý 2).",
          "Đúng thứ team từ chối: duyệt sẵn lệnh shell tùy ý, lại còn ở mọi nơi trong repo."
        ] },
      { k: "D", gist: "Add a bare <code>Bash</code> entry to the skill's <code>allowed-tools</code> so the commands run without prompting.",
        why: [
          "Đúng chỗ, sai mẫu: <code>Bash</code> trơn duyệt sẵn mọi lệnh shell Claude chạy trong lượt skill (ý 2), không riêng hai lệnh npm.",
          "Đó chính là duyệt sẵn lệnh shell tùy ý mà team không chịu.",
          "Dễ bị cuốn vì nó gói trong skill, nghe như đã hẹp. Nhưng chỉ hẹp về thời gian; về lệnh thì vẫn mở hết."
        ] }
    ],
    refs: [
      { label: "Bài 3.2: allowed-tools là danh sách tool duyệt sẵn trong lượt skill chạy (docs); bỏ hẳn tool thì dùng disallowed-tools", href: NOTES + "#l-3-2" },
      { label: "Bài 3.2, mục “Biết thêm”, ô “Đã sửa 03/11”: rule Bash theo mẫu; lệnh ghép thì từng lệnh con xét riêng", href: NOTES + "#fix-26" },
      { label: "Docs Skills, mục Pre-approve tools for a skill: allowed-tools duyệt sẵn trong lượt gọi skill, không giới hạn tool khác", href: "https://code.claude.com/docs/en/skills" }
    ]
  },
  {
    de: 6, n: 21, total: 60, sub: "3.2", subName: "Slash command và skill", scen: "S4",
    answer: "D",
    ask: "The team's <code>/scaffold-module</code> skill needs two inputs, a module path and a target language, yet engineers often run the command with nothing after it and get generic output. Which change to the skill's <code>SKILL.md</code> frontmatter best addresses this?",
    scene: [
      "Team có skill <code>/scaffold-module</code> (dựng khung một module mới). Skill cần hai tham số: đường dẫn module và ngôn ngữ đích.",
      "Kỹ sư hay gõ lệnh trơn, không kèm gì phía sau, nên nhận về output chung chung.",
      "Chỗ khó: cả bốn phương án đều là trường frontmatter có thật. Phải biết mỗi trường lo chuyện gì: output đổ về đâu, skill được dùng tool nào, ai được gọi skill, hay người gõ biết cần đưa gì."
    ],
    asks: [
      "Đổi gì trong frontmatter của <code>SKILL.md</code> là hợp nhất?",
      "Tức là: lỗi nằm ở phía input. Người gõ lệnh không biết, hoặc quên, rằng skill cần đường dẫn module và ngôn ngữ.",
      "Soi từng phương án: trường đó có cho người đang gõ lệnh thấy skill cần tham số gì không?"
    ],
    facts: [
      "<code>argument-hint</code> là dòng gợi ý hiện trong ô autocomplete lúc gõ lệnh, cho biết lệnh nhận tham số gì, vd <code>[module-path] [language]</code>. Nó chỉ gợi ý: không bắt buộc nhập, không kiểm tra giá trị.",
      "<code>context: fork</code> cho skill chạy trong một subagent riêng. Output dài nằm lại bên đó, phiên chính chỉ nhận kết quả gọn.",
      "<code>allowed-tools</code> giới hạn tool skill được dùng khi chạy (theo guide). Docs hiện tại nói rõ hơn: đây là danh sách tool được duyệt sẵn, không hỏi quyền.",
      "<code>disable-model-invocation: true</code> chặn Claude tự kích hoạt skill. Chỉ người gõ lệnh mới chạy được."
    ],
    opts: [
      { k: "A", gist: "Set <code>context: fork</code> so the skill runs in a separate subagent and hands back only its result.",
        why: [
          "Trường có thật nhưng lo chuyện khác: output đổ về đâu (ý 2).",
          "Kỹ sư gõ <code>/scaffold-module</code> trơn thì skill vẫn không có đường dẫn, không có ngôn ngữ, vẫn ra output chung chung. Chỉ khác là chạy trong subagent."
        ] },
      { k: "B", gist: "Limit <code>allowed-tools</code> to Read and Write so the skill cannot drift into other operations.",
        why: [
          "Sai chỗ: <code>allowed-tools</code> là ranh giới về tool, không phải gợi ý input (ý 3).",
          "Bớt tool không làm người gõ biết phải đưa đường dẫn module và ngôn ngữ."
        ] },
      { k: "C", gist: "Set <code>disable-model-invocation: true</code> so only an engineer typing the command can start the skill.",
        why: [
          "Trường này quyết định <i>ai</i> được khởi động skill, không nói skill cần <i>tham số gì</i> (ý 4).",
          "Đằng nào kỹ sư cũng đang tự gõ lệnh. Bật trường này xong họ vẫn gõ trơn như cũ.",
          "Dễ bị cuốn vì đề kể chuyện kỹ sư gõ lệnh, nghe đúng chủ đề “ai gọi skill”. Nhưng lỗi là gõ thiếu tham số, không phải ai được gọi."
        ] },
      { k: "D", gist: "Add an <code>argument-hint</code> entry so the expected arguments appear while the command is being autocompleted.",
        why: [
          "Đúng trường: docs ghi <code>argument-hint</code> là “hint shown during autocomplete to indicate expected arguments” (gợi ý hiện lúc autocomplete, cho biết lệnh nhận tham số gì) (ý 1).",
          "Khai <code>argument-hint: [module-path] [language]</code> thì vừa gõ <code>/scaffold-module</code> là thấy hai tham số cần đưa. Đúng lúc người gõ cần biết.",
          "Nó chỉ gợi ý, không chặn khi vẫn gõ trơn. Nhưng đề hỏi cách “best addresses” (hợp nhất), và trong bốn trường chỉ có trường này nhắm vào phía input."
        ] }
    ],
    refs: [
      { label: "Bài 3.2, ô “Đã sửa 01/11” về argument-hint: gợi ý hiện trong autocomplete, không bắt buộc", href: NOTES + "#fix-4b" },
      { label: "Cheatsheet D3: dòng “Cho người gõ lệnh biết skill nhận tham số gì” → argument-hint; context: fork và allowed-tools ở hai dòng trên", href: NOTES + "#cheat-d3" },
      { label: "Docs Skills, bảng frontmatter: argument-hint, context, allowed-tools, disable-model-invocation", href: "https://code.claude.com/docs/en/skills" }
    ]
  },
  {
    de: 6, n: 22, total: 60, sub: "3.2", subName: "Slash command và skill", scen: "S4",
    answer: "C",
    ask: "A developer on this team created a <code>/legacy-map</code> command that outlines the structure of an unfamiliar module. It runs on the developer's own machine, but teammates who pull the repository cannot use it. The file is at <code>~/.claude/commands/legacy-map.md</code>. What should the developer do?",
    scene: [
      "Developer viết lệnh <code>/legacy-map</code>: tóm tắt cấu trúc một module lạ.",
      "Máy họ chạy được. Đồng đội pull repo về thì không gọi được lệnh này.",
      "Dữ kiện quyết định: file nằm ở <code>~/.claude/commands/legacy-map.md</code>, tức trong thư mục home của developer, không nằm trong repo."
    ],
    asks: [
      "Developer nên làm gì?",
      "Tức là: đưa lệnh về đúng chỗ để nó đi theo git tới máy mọi người, ai pull cũng có.",
      "Soi từng phương án: làm xong, lệnh có nằm trong repo không, và có còn là một slash command gọi được không?"
    ],
    facts: [
      "Slash command là một file Markdown. Tên file thành tên lệnh: <code>legacy-map.md</code> → <code>/legacy-map</code>.",
      "Chỗ đặt file quyết định cấp của lệnh. <code>.claude/commands/</code> trong repo là bản project, commit vào git, ai pull cũng có. <code>~/.claude/commands/</code> là bản cá nhân, git không bao giờ thấy.",
      "Skill cũng chia hai cấp y vậy: <code>.claude/skills/&lt;tên&gt;/SKILL.md</code> (project) và <code>~/.claude/skills/</code> (cá nhân).",
      "CLAUDE.md là chỉ dẫn nạp ở mọi phiên. Nó không tạo ra slash command nào."
    ],
    opts: [
      { k: "A", gist: "Have every teammate copy the file into the <code>~/.claude/commands/</code> folder on their own machine.",
        why: [
          "Chạy được hôm nay, nhưng vẫn là bản cá nhân nằm trên từng máy (ý 2).",
          "Sửa lệnh một lần là phải gửi lại cho từng người chép tay. Các bản lệch nhau dần, người mới vào thì không có."
        ] },
      { k: "B", gist: "Paste the command's prompt into the project <code>CLAUDE.md</code> so it is loaded in every session.",
        why: [
          "CLAUDE.md có đi theo git, nhưng nó không định nghĩa slash command (ý 4). Đồng đội vẫn không có <code>/legacy-map</code> để gõ.",
          "Thêm nữa, một workflow lâu lâu mới dùng giờ chiếm context ở mọi phiên."
        ] },
      { k: "C", gist: "Move the file into the repository's <code>.claude/commands/</code> folder and commit it with the project.",
        why: [
          "Đúng chỗ của lệnh project: <code>.claude/commands/</code> trong repo, đi theo git (ý 2).",
          "Commit xong, ai pull cũng có file, mở Claude Code là gõ được <code>/legacy-map</code> (ý 1). Sửa một chỗ, cả team cùng nhận."
        ] },
      { k: "D", gist: "Turn the file into a skill at <code>~/.claude/skills/legacy-map/SKILL.md</code> to adopt the current format.",
        why: [
          "Đổi định dạng mà không đổi cấp: <code>~/.claude/skills/</code> vẫn nằm trong home, vẫn là bản cá nhân (ý 3).",
          "Kết quả y như hiện tại: chỉ developer gọi được <code>/legacy-map</code>.",
          "Dễ bị cuốn vì skill đúng là định dạng docs khuyên dùng cho việc mới. Nhưng lỗi ở đây là chỗ đặt file, không phải định dạng. Muốn chuyển sang skill thì đặt ở <code>.claude/skills/</code> trong repo."
        ] }
    ],
    refs: [
      { label: "Bài 3.2, mục “Chuyện gì đang xảy ra”: bảng chỗ đặt slash command và skill, bản project và bản cá nhân", href: NOTES + "#l-3-2" },
      { label: "Cheatsheet D3: dòng “Slash command cho mọi người khi clone” → .claude/commands/ trong repo", href: NOTES + "#cheat-d3" }
    ]
  },
  {
    de: 6, n: 23, total: 60, sub: "3.5", subName: "Tinh chỉnh lặp: ví dụ input/output, test trước, interview", scen: "S4",
    answer: "A",
    ask: "To fix null handling in a migration script, a developer gave the agent three sample rows together with their expected outputs. The fix that comes back uses explicit conditionals that check for exactly those three values. What should the developer do next?",
    scene: [
      "Developer nhờ agent sửa cách script migration xử lý <code>null</code>, kèm ba dòng dữ liệu mẫu và output mong đợi của từng dòng.",
      "Bản sửa trả về chỉ kiểm đúng ba giá trị đó, mỗi giá trị một nhánh <code>if</code>. Ví dụ minh họa (giá trị đặt ra để thấy hình dạng):<pre><code>if (row.id === 101) return \"N/A\";\nif (row.id === 102) return 0;\nif (row.id === 103) return \"\";</code></pre>",
      "Chỗ khó: cả ba dòng mẫu đều chạy đúng. Code không sai với những gì nó được thấy. Nó sai ở chỗ coi ba dòng mẫu là toàn bộ bài toán, nên gặp dòng thứ tư là hỏng."
    ],
    asks: [
      "Developer nên làm gì tiếp?",
      "Tức là: làm sao cho agent hiểu ba dòng mẫu chỉ minh họa một quy tắc chung, và viết code theo quy tắc đó.",
      "Soi từng phương án: nó có sửa cách agent hiểu vai trò của ví dụ không, hay vẫn để agent đi khớp từng giá trị?"
    ],
    facts: [
      "Ví dụ input/output là cách tốt để nói về edge case (trường hợp biên) như <code>null</code>: đưa đúng dòng gây lỗi kèm kết quả mong đợi.",
      "Docs Anthropic ghi Claude có lúc “focus too heavily on making tests pass” (quá chú tâm cho test chạy qua) thay vì viết lời giải tổng quát. Cách chữa docs đưa ra: xin lời giải “works correctly for all valid inputs, not just the test cases” (đúng với mọi input hợp lệ, không chỉ các ca test) và “Do not hard-code values” (không gắn cứng giá trị).",
      "Cùng chỗ đó docs nói: “Tests are there to verify correctness, not to define the solution” (test để kiểm lời giải đúng hay sai, không phải để định nghĩa lời giải). Ba dòng mẫu nên đóng đúng vai đó.",
      "Confidence model tự chấm hiệu chuẩn kém: bản sửa chạy qua mọi ví dụ nó thấy thì dễ tự chấm cao. Gửi lại y prompt cũ thì thường ra y kiểu cũ."
    ],
    opts: [
      { k: "A", gist: "Request a general solution that works for every valid input, and treat the three sample rows only as checks.",
        why: [
          "Đúng cách docs chỉ: nói rõ ví dụ chỉ để kiểm, còn yêu cầu là một quy tắc chung xử lý <code>null</code> cho mọi input hợp lệ (ý 2, ý 3).",
          "Agent viết lại theo quy tắc, rồi chạy ba dòng mẫu như test để xác nhận. Dòng thứ tư hay dòng thứ một nghìn cũng đi qua cùng quy tắc đó.",
          "Vẫn giữ được cái lợi của ví dụ (ý 1): ba dòng mẫu vẫn là bài kiểm, chỉ thôi làm đặc tả."
        ] },
      { k: "B", gist: "Send the request again with firmer wording that the fix must handle nulls correctly in every case.",
        why: [
          "Sai chỗ sửa: agent tin là mình đã xử lý đúng mọi ca, vì mọi ca nó được thấy đều chạy đúng.",
          "Nói mạnh hơn chữ “correctly” (cho đúng) không đổi cách agent hiểu ví dụ. Nó vẫn coi ba dòng là toàn bộ đề, nên dễ ra lại các nhánh <code>if</code> cũ.",
          "Dễ bị cuốn vì nghe như siết yêu cầu. Nhưng cái thiếu không phải độ nhấn mạnh, mà là câu nói rõ ví dụ chỉ minh họa một quy tắc chung (ý 2)."
        ] },
      { k: "C", gist: "Ask the agent to score its confidence that the fix generalizes, and resend the request when the score is low.",
        why: [
          "Sai ở giả định: confidence tự chấm không đáng tin (ý 4). Bản sửa chạy qua cả ba ví dụ thì nhiều khả năng tự chấm cao, không bao giờ bị gửi lại.",
          "Có gửi lại thì prompt vẫn y cũ, agent vẫn đi khớp ví dụ."
        ] },
      { k: "D", gist: "Keep adding sample rows until every value the production data might hold is covered.",
        why: [
          "Giữ nguyên cách hiểu sai: agent thêm một nhánh <code>if</code> cho mỗi dòng mẫu mới.",
          "Dữ liệu production không liệt kê trước được. Dòng đầu tiên chưa có trong mẫu là code hỏng."
        ] }
    ],
    refs: [
      { label: "Bài 3.5, mục “Chuyện gì đang xảy ra”: bảng bốn kỹ thuật, dòng edge case null trong migration → test case có input/expected", href: NOTES + "#l-3-5" },
      { label: "Docs Prompting best practices, mục “Avoid focusing on passing tests and hardcoding”: xin lời giải tổng quát, test chỉ để kiểm", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
    ]
  },
  {
    de: 6, n: 24, total: 60, sub: "3.3", subName: "Rule theo đường dẫn trong .claude/rules", scen: "S4",
    answer: "D",
    ask: "A team keeps its legacy-module conventions in a <code>.claude/rules/</code> file whose frontmatter is <code>paths: [\"src/legacy/**/*\"]</code>. In a new session, before any file has been opened, Claude cannot describe those conventions when asked. The team wants them in context from launch in every session. What should they change?",
    scene: [
      "Team để quy ước cho module legacy (code cũ) trong một rule ở <code>.claude/rules/</code>, frontmatter là <code>paths: [\"src/legacy/**/*\"]</code>.",
      "Mở phiên mới, chưa mở file nào, hỏi Claude về quy ước đó thì nó không nói được.",
      "Team muốn quy ước có trong context ngay lúc mở phiên, ở mọi phiên.",
      "Chỗ khó: rule không hỏng. Nó đang làm đúng việc của nó là chờ đụng file khớp mới nạp. Điều team muốn lại ngược với thiết kế đó."
    ],
    asks: [
      "Team nên đổi gì?",
      "Tức là: biến một rule nạp có điều kiện thành rule nạp ngay lúc mở phiên.",
      "Soi từng phương án: đổi xong, rule còn chờ đụng file khớp mới nạp không?"
    ],
    facts: [
      "Rule có <code>paths</code> chỉ nạp khi Claude dùng Read, Write hoặc Edit trên file khớp glob (hoặc xem một file khớp bằng lệnh Bash kiểu <code>cat</code>). Chưa đụng file nào thì quy ước chưa có trong context.",
      "Rule không có <code>paths</code> nạp ngay lúc mở phiên, y như CLAUDE.md. Đổi lại, nó chiếm context ở mọi phiên.",
      "Claude Code tìm mọi file <code>.md</code> trong <code>.claude/rules/</code>, kể cả trong thư mục con. Thư mục con chỉ để sắp xếp, không đổi lúc nạp.",
      "Glob kiểu <code>src/**/*</code> khớp mọi file dưới <code>src/</code>, không cần ghi đuôi file. <code>/memory</code> liệt kê các file memory (CLAUDE.md…) để mở ra sửa, không có bước “đăng ký” rule nào."
    ],
    opts: [
      { k: "A", gist: "Move the rule into a <code>.claude/rules/legacy/</code> subfolder so it is picked up at launch.",
        why: [
          "Sai ở giả định: rule đã được tìm thấy rồi, nằm ở đâu trong <code>.claude/rules/</code> cũng vậy (ý 3).",
          "Còn <code>paths</code> thì vẫn chờ đụng file trong <code>src/legacy/</code> mới nạp (ý 1). Đổi chỗ file không đổi lúc nạp.",
          "Dễ bị cuốn vì tưởng rule chưa được tìm thấy. Nhưng vấn đề là lúc nạp, không phải có tìm thấy hay không."
        ] },
      { k: "B", gist: "Add file extensions to the glob, on the theory that a bare directory pattern matches no files.",
        why: [
          "Sai ở giả định: <code>src/legacy/**/*</code> khớp mọi file dưới thư mục đó (ý 4). Đuôi file chỉ cần khi muốn nhắm riêng một loại file.",
          "Thêm đuôi xong rule vẫn có <code>paths</code>, vẫn chỉ nạp khi đụng file khớp (ý 1). Phiên mới hỏi trước khi mở file thì vẫn trống."
        ] },
      { k: "C", gist: "Tell engineers to run <code>/memory</code> at the start of every session to register the rule file.",
        why: [
          "Sai công cụ: <code>/memory</code> để xem và mở file memory ra sửa, không đăng ký hay bật rule nào (ý 4).",
          "Rule không cần ai đăng ký: không có <code>paths</code> thì nạp lúc mở phiên, có <code>paths</code> thì nạp khi đụng file khớp (ý 1, ý 2). Thêm một việc tay mà không đổi được gì."
        ] },
      { k: "D", gist: "Delete the <code>paths</code> field from the rule so it loads at launch like a rule without a scope.",
        why: [
          "Bỏ <code>paths</code> thì rule thành rule không điều kiện, nạp ngay lúc mở phiên như CLAUDE.md (ý 2). Hỏi trước khi mở file nào cũng có quy ước.",
          "Cái giá: quy ước legacy chiếm context ở mọi phiên, kể cả phiên không đụng code legacy. Đề đòi “in every session” (ở mọi phiên), nên chấp nhận giá đó là đúng."
        ] }
    ],
    refs: [
      { label: "Bài 3.3, khung định nghĩa “Rule” và “paths”: rule không gắn điều kiện nạp mỗi phiên, có paths thì chỉ nạp khi đụng file khớp", href: NOTES + "#l-3-3" },
      { label: "Docs “How Claude remembers your project”, mục Path-specific rules: rule có paths nạp khi Claude dùng Read, Write, Edit trên file khớp; rule không có paths nạp lúc mở phiên", href: "https://code.claude.com/docs/en/memory" }
    ]
  },
  {
    de: 6, n: 25, total: 60, sub: "1.4", subName: "Workflow nhiều bước có cổng chặn và bàn giao", scen: "S4",
    answer: "A",
    ask: "While automating a dependency upgrade across 40 services, the agent gets stuck on one legacy module and needs a decision from the engineer who owns it. That engineer has no access to the agent's session. What should the handoff to the engineer include?",
    scene: [
      "Agent đang tự động nâng cấp dependency (thư viện phụ thuộc) cho 40 service.",
      "Kẹt ở một module legacy: phải có quyết định của kỹ sư phụ trách module đó mới đi tiếp được.",
      "Chỗ khó: kỹ sư đó “cannot see the agent's session” (không xem được phiên của agent). Mọi thứ agent đã điều tra chỉ nằm trong lịch sử hội thoại của nó."
    ],
    asks: [
      "Gói bàn giao cho kỹ sư nên có gì?",
      "Tức là: người nhận chỉ có đúng những gì agent viết vào gói. Gói phải đủ để họ quyết định ngay, không phải điều tra lại.",
      "Soi từng phương án: đọc xong gói, kỹ sư có biết module nào, hỏng gì, vì sao, nên làm gì không? Có phải tự lục đống dữ liệu thô không?"
    ],
    facts: [
      "Handoff (gói bàn giao) đi kèm khi agent chuyển việc cho người. Người nhận không đọc được hội thoại của agent, nên gói phải tự đủ.",
      "Guide yêu cầu structured handoff (bàn giao có cấu trúc): định danh (bài 1.4 dùng mã khách, ở đây là module), vấn đề, nguyên nhân gốc, dữ kiện cụ thể, việc đã làm, và đề xuất xử lý.",
      "Gói thiếu thì người nhận phải làm lại từ đầu. Gói chỉ là đống output thô thì người nhận phải tự rút kết luận, cũng là làm lại.",
      "Confidence model tự chấm hiệu chuẩn kém. Nó nói agent thấy ca này thế nào, không nói ca này là gì."
    ],
    opts: [
      { k: "A", gist: "A structured summary that names the module, states the root cause found so far, gives the failing error, and proposes a fix.",
        why: [
          "Đúng structured handoff (ý 2): module nào, nguyên nhân gốc tới giờ, lỗi cụ thể đang fail, và đề xuất sửa.",
          "Kỹ sư không xem được phiên vẫn hiểu đủ (ý 1). Họ chỉ cần duyệt hoặc đổi đề xuất, không phải điều tra lại."
        ] },
      { k: "B", gist: "Every raw output from all the Grep, Read, and Bash calls the agent made, so no evidence is missing.",
        why: [
          "Đủ bằng chứng nhưng không có kết luận (ý 3). Kỹ sư phải tự lục lại để tìm ra điều agent đã biết.",
          "Phiên càng dài thì đống output càng to, mà phần lớn chẳng dính gì tới quyết định cần hỏi.",
          "Dễ bị cuốn vì nghe minh bạch: “no evidence is left out” (không sót bằng chứng nào). Nhưng bàn giao là chuyển kết luận. Bằng chứng chỉ cần phần đỡ cho kết luận."
        ] },
      { k: "C", gist: "An urgency score and the agent's own confidence rating in its analysis, so the engineer can triage the case.",
        why: [
          "Sai thứ được chuyển: điểm khẩn và confidence nói agent thấy ca này ra sao, không nói ca này là gì (ý 4).",
          "Không có module, nguyên nhân, lỗi, đề xuất thì kỹ sư vẫn không làm gì được."
        ] },
      { k: "D", gist: "Just the module name and a brief issue label, so the engineer investigates free of the agent's bias.",
        why: [
          "Bỏ đi cả cuộc điều tra agent đã làm (ý 3). Kỹ sư phải tự tìm lại nguyên nhân gốc và lỗi từ đầu.",
          "Gói bàn giao để chuyển phát hiện, không phải để giấu. Kỹ sư muốn xét độc lập thì vẫn tự kiểm được đề xuất trong gói A."
        ] }
    ],
    refs: [
      { label: "Bài 1.4, mục “Khi phải chuyển cho người thật”: người nhận không đọc được hội thoại, gói bàn giao phải tự đủ", href: NOTES + "#l-1-4" },
      { label: "Cheatsheet D1: dòng “Chuyển ca xong nhân viên phải hỏi lại từ đầu” → gói bàn giao có nguyên nhân gốc và đề xuất", href: NOTES + "#cheat-d1" }
    ]
  },
  {
    de: 6, n: 26, total: 60, sub: "3.1", subName: "Cấp của CLAUDE.md và chia sẻ cho team", scen: "S4",
    answer: "C",
    ask: "The billing maintainers put <code>@standards/billing.md</code> into <code>packages/billing/CLAUDE.md</code> to pull in a shared file from the <code>standards/</code> folder at the repository root, but <code>/memory</code> shows that the standards file never loads. How should they fix the import while keeping it limited to their package?",
    scene: [
      "Monorepo có thư mục <code>standards/</code> ở gốc, chứa các file chuẩn dùng chung.",
      "Maintainer (người phụ trách) package billing viết <code>@standards/billing.md</code> trong <code>packages/billing/CLAUDE.md</code>. File chuẩn không bao giờ được nạp.",
      "Chỗ khó: đường dẫn tương đối được tính từ đâu. Ví dụ minh họa:<pre><code>repo/\n  standards/billing.md          ← file cần import\n  packages/billing/CLAUDE.md    ← chứa @standards/billing.md\n\nTính từ packages/billing/:\n  packages/billing/standards/billing.md   ← không có file này</code></pre>",
      "Đề còn đòi giữ import trong phạm vi package billing, không lan sang package khác."
    ],
    asks: [
      "Sửa import thế nào mà vẫn chỉ package billing nạp chuẩn này?",
      "Tức là: viết lại đường dẫn cho trỏ đúng file, và để import nằm nguyên trong CLAUDE.md của billing.",
      "Soi từng phương án: đường dẫn có trỏ đúng file không, và chuẩn billing có tràn sang package khác không?"
    ],
    facts: [
      "<code>@path</code> trong CLAUDE.md kéo nội dung một file khác vào, nạp cùng lúc với CLAUDE.md chứa nó. Dùng được cả đường dẫn tương đối lẫn tuyệt đối.",
      "Docs ghi: đường dẫn tương đối “resolve relative to the file containing the import, not the working directory” (tính từ file chứa import, không tính từ thư mục làm việc).",
      "CLAUDE.md gốc nạp ở mọi phiên trong repo. Thứ gì để ở đó cũng vào context của mọi package.",
      "Đường dẫn có dấu cách thì đặt dấu <code>\\</code> trước mỗi dấu cách. Đường dẫn bọc trong ngoặc kép thì không được import luôn."
    ],
    opts: [
      { k: "A", gist: "Always launch Claude Code from the repository root so the import resolves against that folder.",
        why: [
          "Sai ở giả định: đường dẫn tương đối không tính theo thư mục mở phiên (ý 2).",
          "Mở từ gốc hay từ package thì <code>@standards/billing.md</code> vẫn tính từ <code>packages/billing/</code>, vẫn trỏ vào file không có."
        ] },
      { k: "B", gist: "Put the import in the root <code>CLAUDE.md</code> instead, where <code>@standards/billing.md</code> resolves correctly.",
        why: [
          "Đặt ở gốc thì đường dẫn đúng là trỏ trúng file.",
          "Nhưng CLAUDE.md gốc nạp ở mọi phiên (ý 3). Chuẩn billing vào context của mọi package, trái yêu cầu “keeping it limited to their package” (giữ trong phạm vi package của họ).",
          "Dễ bị cuốn vì import chạy được ngay. Nhưng nó sửa được nửa đầu đề, phá mất nửa sau."
        ] },
      { k: "C", gist: "Rewrite the path relative to the package's <code>CLAUDE.md</code>, for example <code>@../../standards/billing.md</code>.",
        why: [
          "Tính từ <code>packages/billing/</code>, lên hai cấp là tới gốc repo, rồi vào <code>standards/billing.md</code>. Trỏ đúng file (ý 2).",
          "Import vẫn nằm trong CLAUDE.md của billing, nên chuẩn billing chỉ đi theo CLAUDE.md đó. Đạt cả hai yêu cầu.",
          "Dùng đường dẫn tuyệt đối cũng được (ý 1), nhưng đề chỉ đưa cách tương đối."
        ] },
      { k: "D", gist: "Wrap the path in double quotes so Claude Code treats the full path as one import token.",
        why: [
          "Sai ở giả định: bọc ngoặc kép thì đường dẫn không được import luôn (ý 4). Làm hỏng thêm chứ không sửa được.",
          "Đường dẫn này cũng không có dấu cách. Lỗi nằm ở chỗ tính đường dẫn, không phải ở cách tách chữ."
        ] }
    ],
    refs: [
      { label: "Bài 3.1, mục “Khi file bắt đầu phình to”: @import để mỗi package kéo đúng chuẩn mình cần", href: NOTES + "#l-3-1" },
      { label: "Docs “How Claude remembers your project”, mục Import additional files: đường dẫn tương đối tính từ file chứa import; dấu cách thì thêm \\; bọc ngoặc kép thì không import", href: "https://code.claude.com/docs/en/memory" }
    ]
  },
  {
    de: 6, n: 27, total: 60, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool", scen: "S4",
    answer: "A",
    ask: "The <code>find_references</code> tool on this system's MCP code-index server returns an empty list both when a symbol truly has no callers and when the index is in the middle of a rebuild. As a result, the agent retries symbols that really have no callers, and during a rebuild it wrongly concludes that a symbol is unused. Which change to the tool fixes this?",
    scene: [
      "Server MCP đánh chỉ mục code có tool <code>find_references</code> (tìm mọi chỗ gọi một symbol).",
      "Hai chuyện khác nhau ra cùng một kết quả: symbol thật sự không ai gọi, và chỉ mục đang build lại. Ví dụ minh họa:<pre><code>không ai gọi        → []\nchỉ mục đang build  → []</code></pre>",
      "Agent sai theo cả hai chiều: retry khi symbol thật sự không có ai gọi, và kết luận “không dùng” khi chỉ mục đang build lại."
    ],
    asks: [
      "Đổi tool thế nào để hết cả hai lỗi?",
      "Tức là: tool phải cho agent thấy “tìm rồi, không có” khác với “chưa tìm được”.",
      "Soi từng phương án: nhìn một lần trả về, agent có biết nên chấp nhận hay nên thử lại không?"
    ],
    facts: [
      "Access failure (không truy cập được): chưa biết có dữ liệu hay không, vd timeout, chỉ mục đang build lại. Valid empty result (kết quả rỗng hợp lệ): query chạy xong, thật sự không có gì khớp. Hai ca phải trả về khác nhau.",
      "Mảng rỗng không phải lỗi. Lỗi cũng không được trả về như mảng rỗng.",
      "Tool MCP báo thất bại bằng cờ <code>isError: true</code> trong kết quả tool. Guide muốn lỗi có cấu trúc: <code>errorCategory</code> (vd transient, tức lỗi tạm thời), <code>isRetryable</code>, và một câu mô tả dễ hiểu.",
      "Agent quyết bước tiếp dựa trên kết quả của đúng lần gọi đó. Kết quả không mang thông tin để phân biệt thì prompt hay log cũng không bù được."
    ],
    opts: [
      { k: "A", gist: "Return a successful empty list when nothing matches, and an error flagged transient and retryable when the index is unavailable.",
        why: [
          "Tách đúng hai ca (ý 1, ý 2). Không ai gọi: kết quả thành công, danh sách rỗng. Chỉ mục đang build: lỗi <code>isError</code>, loại transient, <code>isRetryable: true</code> (ý 3).",
          "Agent đọc là biết: rỗng thành công thì chấp nhận, thôi retry. Lỗi tạm thời thì chờ rồi thử lại, không kết luận symbol không dùng. Hết cả hai lỗi."
        ] },
      { k: "B", gist: "Keep returning an empty list in both cases, but write the index state to server logs so the team can review bad conclusions.",
        why: [
          "Log chỉ giúp người xem lại sau. Lúc quyết định, agent vẫn nhận danh sách rỗng như cũ (ý 4), nên cả hai lỗi vẫn còn.",
          "Trả rỗng khi chỉ mục không dùng được là giấu lỗi (ý 2): biến một lần hỏng thành thông tin sai."
        ] },
      { k: "C", gist: "Add a system-prompt rule telling the agent to retry any empty result three times before treating the symbol as unreferenced.",
        why: [
          "Sai tầng: kết quả tool không có gì để phân biệt, nên lời dặn trong prompt cũng không giúp agent phân biệt được (ý 4).",
          "Symbol thật sự không ai gọi thì lần nào cũng tốn ba lần gọi. Chỉ mục build lâu hơn ba lượt thì agent vẫn kết luận sai.",
          "Dễ bị cuốn vì retry nghe an toàn. Nhưng hai ca vẫn chung một tín hiệu, chỉ là tốn kém hơn."
        ] },
      { k: "D", gist: "Return a retryable error in both cases so the agent always tries once more before deciding the symbol is unused.",
        why: [
          "Gắn nhãn lỗi cho một câu trả lời đúng (ý 2). Mọi symbol không ai gọi đều bị retry phí.",
          "Agent vẫn không biết chỉ mục có dùng được không. Chỉ mục build lâu thì lần thử thêm vẫn ra cùng kết quả, và agent vẫn có thể kết luận sai."
        ] }
    ],
    refs: [
      { label: "Bài 2.2, cuối mục “Lỗi trong hệ nhiều agent”: access failure và empty result hợp lệ phải trả về khác nhau", href: NOTES + "#l-2-2" },
      { label: "Cheatsheet D2: dòng “Search trả mảng rỗng”: rỗng không phải lỗi, timeout không được giả làm rỗng", href: NOTES + "#cheat-d2" },
      { label: "Spec MCP 2025-11-25, mục Error Handling: lỗi thực thi tool trả trong kết quả với isError: true", href: "https://modelcontextprotocol.io/specification/2025-11-25/server/tools#error-handling" }
    ]
  },
  {
    de: 6, n: 28, total: 60, sub: "1.3", subName: "Gọi subagent, truyền context", scen: "S4",
    answer: "C",
    ask: "The coordinator hands off legacy-codebase exploration with a prompt listing exact steps: glob <code>src</code> for every file, grep each import, then read the files in order. On repositories with unusual layouts, the subagents follow this script word for word and miss the real architecture. How should the coordinator prompt be revised?",
    scene: [
      "Coordinator giao việc khám phá codebase legacy cho subagent bằng một quy trình cứng: glob mọi file trong <code>src</code>, grep từng import, rồi đọc file theo thứ tự.",
      "Gặp repo có cấu trúc lạ, subagent vẫn làm đúng từng bước, và bỏ sót kiến trúc thật.",
      "Chỗ khó: subagent không làm sai lời dặn. Lỗi nằm ở chính lời dặn: nó bảo subagent <i>làm thế nào</i>, trong khi cách làm đúng lại tùy từng repo."
    ],
    asks: [
      "Sửa prompt của coordinator thế nào?",
      "Tức là: lời giao việc phải để subagent tự chọn đường điều tra theo repo nó gặp, mà vẫn biết thế nào là kết quả đạt.",
      "Soi từng phương án: còn giữ quy trình cứng không, hay chỉ thêm lượt, thêm budget cho cùng quy trình đó?"
    ],
    facts: [
      "Lời giao việc là thông tin duy nhất subagent nhận về việc cần làm. Subagent làm đúng những gì được viết.",
      "Notes bài 1.3: lời giao việc nên nêu mục tiêu và tiêu chí chất lượng (cần gì, thế nào là đạt), không viết quy trình từng bước. Quy trình cứng làm subagent không xoay xở được khi gặp tình huống bất ngờ.",
      "Docs prompting: viết bước đánh số khi “the order or completeness of steps matters” (thứ tự hay sự đầy đủ của các bước là quan trọng). Việc cần suy luận thì “Prefer general instructions over prescriptive steps” (ưu tiên chỉ dẫn chung hơn các bước định sẵn). Việc nghiên cứu thì nêu rõ tiêu chí thành công.",
      "Retry giúp với lỗi tạm thời. Gửi lại y lời giao việc cũ thì ra y kết quả cũ."
    ],
    opts: [
      { k: "A", gist: "Have the coordinator resend the same instructions whenever a subagent's summary comes back incomplete.",
        why: [
          "Sai ở giả định: lỗi không phải tạm thời (ý 4). Cùng quy trình thì ra cùng chỗ sót, lại tốn thêm token.",
          "Repo có cấu trúc lạ thì vẫn lạ ở lần chạy thứ hai."
        ] },
      { k: "B", gist: "Add numbered steps for each repository layout seen so far, so the procedure covers every known structure.",
        why: [
          "Vẫn là quy trình cứng, chỉ dài hơn (ý 2). Nó phủ các cấu trúc đã gặp; repo lạ tiếp theo lại hỏng y vậy.",
          "Bước đánh số hợp khi thứ tự hay sự đầy đủ của các bước là quan trọng (ý 3). Khám phá codebase thì bước nào đúng còn tùy thứ tìm thấy giữa chừng.",
          "Dễ bị cuốn vì trông kỹ lưỡng, nhắm thẳng chỗ hỏng. Nhưng càng thêm bước càng trói subagent chặt hơn."
        ] },
      { k: "C", gist: "State the exploration goal and the quality bar, and let each subagent pick its own investigation path.",
        why: [
          "Đúng cách giao việc: nêu mục tiêu và tiêu chí đạt (ý 2). Ví dụ: tìm các entry point (điểm vào), lần theo luồng phụ thuộc chính, mỗi khẳng định kèm đường dẫn file.",
          "Subagent tự chọn dùng Glob, Grep, Read thế nào cho hợp cấu trúc repo nó gặp. Tiêu chí đạt vẫn cho coordinator kiểm được kết quả."
        ] },
      { k: "D", gist: "Increase each subagent's turn and context budget so it can complete the scripted procedure on bigger repositories.",
        why: [
          "Sai chỗ sửa: lỗi ở lời dặn, không ở giới hạn tài nguyên (ý 1).",
          "Budget lớn hơn chỉ cho subagent làm quy trình sai được lâu hơn, đọc thêm file không liên quan, vẫn sót kiến trúc."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Chạy song song”: lời giao việc nêu mục tiêu và tiêu chí chất lượng, không viết quy trình từng bước", href: NOTES + "#l-1-3" },
      { label: "Docs Prompting best practices: bước đánh số khi thứ tự quan trọng; “Prefer general instructions over prescriptive steps”; nêu tiêu chí thành công cho việc nghiên cứu", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
    ]
  },
  {
    de: 6, n: 29, total: 60, sub: "3.3", subName: "Rule theo đường dẫn trong .claude/rules", scen: "S4",
    answer: "D",
    ask: "A team adds <code>.claude/rules/terraform.md</code> with YAML frontmatter <code>paths: [\"terraform/**/*\"]</code>. In a new session, before any file is opened, Claude does not apply the Terraform conventions when asked about them. The team wants the conventions available from the very first message. What should they do?",
    scene: [
      "Team thêm rule <code>.claude/rules/terraform.md</code>, frontmatter là <code>paths: [\"terraform/**/*\"]</code>.",
      "Phiên mới, chưa mở file nào, hỏi về quy ước Terraform thì Claude không áp dụng.",
      "Team muốn quy ước có ngay từ tin nhắn đầu tiên.",
      "Chỗ khó: ba phương án sai đều đoán rule đang hỏng (glob sai, cú pháp sai, viết chưa đủ mạnh). Thật ra rule chạy đúng: có <code>paths</code> thì chờ đụng file khớp mới nạp."
    ],
    asks: [
      "Team nên làm gì?",
      "Tức là: cho quy ước nạp ngay lúc mở phiên, không chờ Claude đụng file Terraform.",
      "Soi từng phương án: đổi xong, rule còn <code>paths</code> không? Còn thì vẫn nạp lười."
    ],
    facts: [
      "Rule có <code>paths</code> chỉ nạp khi Claude dùng Read, Write hoặc Edit trên file khớp (hoặc xem một file khớp bằng <code>cat</code>, <code>head</code>). Rule không có <code>paths</code> nạp lúc mở phiên, y như CLAUDE.md.",
      "Glob trong rule project tính từ thư mục chứa <code>.claude</code> (gốc project), không tính từ chỗ đặt file rule. <code>terraform/**/*</code> đã đúng.",
      "<code>paths</code> nhận cả danh sách YAML lẫn chuỗi ngăn bằng dấu phẩy. Cả hai đều parse được.",
      "IMPORTANT hay in hoa chỉ làm câu nổi hơn khi nó đã nằm trong context. Rule chưa nạp thì Claude không thấy chữ nào của nó."
    ],
    opts: [
      { k: "A", gist: "Change the glob to <code>../../terraform/**/*</code> so it resolves relative to where the rule file sits.",
        why: [
          "Sai ở giả định: glob không tính từ chỗ đặt file rule mà từ gốc project (ý 2). Thêm <code>../../</code> là trỏ ra ngoài repo.",
          "Rule vẫn có <code>paths</code>, nên vẫn chờ đụng file khớp mới nạp (ý 1).",
          "Dễ bị cuốn vì <code>@import</code> trong CLAUDE.md đúng là tính đường dẫn từ file chứa nó. Nhưng glob trong <code>paths</code> của rule theo luật khác."
        ] },
      { k: "B", gist: "Add a line to the rule marking the conventions IMPORTANT so Claude gives them priority.",
        why: [
          "Nhấn mạnh chỉ có tác dụng với chữ đã nằm trong context (ý 4).",
          "Trước khi đụng file Terraform thì rule chưa nạp (ý 1). Viết mạnh tới đâu, tin nhắn đầu tiên vẫn không có quy ước."
        ] },
      { k: "C", gist: "Change the <code>paths</code> value from a YAML list to a comma-separated string so it parses.",
        why: [
          "Sai ở giả định: dạng danh sách đang dùng đã parse được (ý 3).",
          "Đổi cú pháp xong rule vẫn có <code>paths</code>, vẫn nạp lười (ý 1)."
        ] },
      { k: "D", gist: "Remove the <code>paths</code> frontmatter so the rule loads unconditionally when the session starts.",
        why: [
          "Bỏ <code>paths</code> thì rule nạp lúc mở phiên như CLAUDE.md (ý 1). Tin nhắn đầu tiên đã có quy ước Terraform.",
          "Cái giá: quy ước chiếm context cả ở phiên không đụng Terraform. Đề đòi có từ đầu nên chấp nhận giá đó. Chuyển nội dung vào CLAUDE.md gốc cũng ra cùng kết quả."
        ] }
    ],
    refs: [
      { label: "Bài 3.3, khung định nghĩa “Rule” và “paths”; ví dụ paths: [\"terraform/**/*\"] cho IaC", href: NOTES + "#l-3-3" },
      { label: "Docs “How Claude remembers your project”, mục Path-specific rules: lúc nạp, gốc tính glob, paths nhận danh sách YAML hoặc chuỗi ngăn dấu phẩy", href: "https://code.claude.com/docs/en/memory" }
    ]
  },
  {
    de: 6, n: 30, total: 60, sub: "3.4", subName: "Plan mode hay làm thẳng", scen: "S4",
    answer: "B",
    ask: "An engineer asks the agent to map every cross-module dependency in a legacy monolith ahead of a refactor. Grep and Read output floods the main conversation, and the context is nearly used up before the design discussion even starts. How should the discovery phase be run?",
    scene: [
      "Kỹ sư nhờ agent vẽ hết các phụ thuộc giữa các module trong một monolith legacy, trước khi refactor.",
      "Kết quả Grep và Read đổ thẳng vào hội thoại chính. Chưa tới phần bàn thiết kế mà context đã gần cạn.",
      "Chỗ khó: pha khám phá cần đọc rất nhiều, còn pha thiết kế sau đó lại cần context chung. Phải giữ được cả hai."
    ],
    asks: [
      "Nên chạy pha khám phá thế nào?",
      "Tức là: cho việc đọc chạy ở chỗ khác, kết quả thô không vào context chính, chỉ bản tóm tắt vào thôi.",
      "Soi từng phương án: output Grep, Read rốt cuộc có nằm trong hội thoại chính không? Nó chặn từ đầu hay dọn sau?"
    ],
    facts: [
      "Kết quả tool nằm trong lịch sử của phiên đã gọi tool đó. Grep, Read chạy trong phiên chính thì output nằm trong context chính.",
      "Explore subagent: subagent có sẵn trong Claude Code, chỉ được đọc. Nó khám phá trong context riêng rồi chỉ gửi về bản tóm tắt.",
      "Plan mode: chế độ chỉ đọc, chặn sửa file cho tới khi kế hoạch được duyệt. Nó chạy ngay trong phiên chính, không tách context.",
      "<code>/compact</code> nén lịch sử phiên thành bản tóm tắt. Nén khi đã ngập là chữa sau, và bản tóm tắt có thể rụng chi tiết như đường dẫn, con số."
    ],
    opts: [
      { k: "A", gist: "Run <code>/compact</code> over and over during discovery so the growing search output keeps getting summarized.",
        why: [
          "Chữa sau: output đã vào context chính rồi mới nén (ý 1, ý 4).",
          "Mỗi lần nén có thể rụng đường dẫn file, đúng thứ một bản đồ phụ thuộc cần giữ."
        ] },
      { k: "B", gist: "Hand discovery to the Explore subagent and bring only its summary back into the main conversation.",
        why: [
          "Explore subagent đọc trong context riêng, chỉ đọc, không sửa gì (ý 2). Hàng trăm kết quả Grep, Read nằm lại bên đó.",
          "Hội thoại chính chỉ nhận bản tóm tắt phụ thuộc, còn chỗ cho bàn thiết kế và làm refactor sau đó. Đúng quy tắc “khám phá dài → giao Explore subagent”."
        ] },
      { k: "C", gist: "Switch the investigation into plan mode so the read-only exploration produces less output.",
        why: [
          "Sai ở giả định: plan mode chỉ chặn sửa file, không làm output ít đi, cũng không tách context (ý 3).",
          "Mọi kết quả Grep, Read vẫn đổ vào hội thoại chính, context đầy nhanh y như cũ.",
          "Dễ bị cuốn vì plan mode cũng “chỉ đọc” như Explore subagent. Nhưng chỉ đọc khác với có context riêng."
        ] },
      { k: "D", gist: "Open a new session for each module and copy the findings forward by hand from one session to the next.",
        why: [
          "Mỗi phiên nhỏ thật, nhưng bức tranh phụ thuộc <i>giữa</i> các module bị cắt vụn. Đó lại đúng là thứ đề cần.",
          "Chép tay giữa các phiên dễ rơi chi tiết, và pha thiết kế không có context chung. Subagent cho được sự tách biệt mà không phải cắt vụn công việc."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, mục “Khi pha khám phá quá dài”: Explore subagent đọc trong context riêng, chỉ gửi về tóm tắt", href: NOTES + "#l-3-4" },
      { label: "Cheatsheet D3: dòng “Khám phá dài làm cạn context” → Explore subagent", href: NOTES + "#cheat-d3" },
      { label: "Bài 5.4, mục “Biết thêm”: compact sau khi ngập không bằng giao việc đi từ đầu", href: NOTES + "#l-5-4" }
    ]
  },
  {
    de: 6, n: 31, total: 60, sub: "3.4", subName: "Plan mode hay làm thẳng", scen: "S4",
    answer: "D",
    ask: "A developer on this team now opens every Claude Code task in plan mode out of habit. The next task is correcting the misspelled name of a helper function that is defined and called only inside one file. How should the developer handle this task?",
    scene: [
      "Một dev trong team quen tay: việc gì cũng mở Claude Code bằng plan mode trước.",
      "Việc tiếp theo: sửa tên một hàm helper (hàm phụ trợ) bị viết sai chính tả. Hàm được khai báo và được gọi trong cùng một file.",
      "Chỗ khó: cả bốn phương án đều là công cụ thật của Claude Code, phương án nào cũng nghe cẩn thận. Phải soi xem việc này có cần tới công cụ đó không."
    ],
    asks: [
      "Dev nên làm việc này thế nào?",
      "Tức là: việc nhỏ, gói trong một file, chỉ có một cách làm thì nên plan trước hay làm thẳng.",
      "Soi từng phương án: công cụ đó giải quyết vấn đề gì, và việc đổi tên này có vấn đề đó không?"
    ],
    facts: [
      "Plan mode là chế độ chỉ đọc: Claude đọc code, khám phá, viết kế hoạch, không sửa file cho tới khi bạn duyệt. Đáng dùng khi thay đổi lớn nhiều file, có nhiều cách làm hợp lệ, hoặc phải quyết kiến trúc.",
      "Direct execution (làm thẳng) hợp với thay đổi nhỏ, một file, phạm vi rõ, chỉ một cách làm hiển nhiên.",
      "Explore subagent là subagent có sẵn, chỉ được đọc. Nó khám phá codebase trong context riêng rồi gửi về bản tóm tắt, dùng cho pha khám phá dài để output đọc file không làm đầy phiên chính.",
      "Fork phiên (<code>--fork-session</code>, hay <code>/branch</code> trong phiên) tách nhánh từ cùng một bản phân tích để thử hai hướng khác nhau, mỗi nhánh đi độc lập."
    ],
    opts: [
      { k: "A", gist: "Fork the session into two branches so candidate names can be compared before settling on one.",
        why: [
          "Fork dùng khi có hai hướng làm thật sự khác nhau, đáng đem ra so (ý 4).",
          "Sửa lỗi chính tả chỉ có một đáp số: tên viết đúng. Không có hai hướng nào để so, tách nhánh chỉ thêm việc."
        ] },
      { k: "B", gist: "Hand the rename to an Explore subagent so its search output stays out of the main context.",
        why: [
          "Explore subagent dùng để cách ly output khám phá dài (ý 3). Tìm một hàm trong một file gần như không sinh output nào, nên không có gì để cách ly.",
          "Explore subagent lại chỉ được đọc (ý 3). Giao cho nó thì vẫn chưa ai sửa tên, chỉ thêm một bước chậm."
        ] },
      { k: "C", gist: "Enter plan mode so Claude maps every reference before proposing the rename for approval.",
        why: [
          "Plan mode đáng dùng khi việc lớn, nhiều cách làm, hoặc code lạ (ý 1). Đổi tên trong một file không có điều nào.",
          "Thêm pha chỉ đọc và một bước duyệt kế hoạch là thêm một vòng qua lại, không giảm rủi ro nào.",
          "Dễ bị cuốn vì đó đúng là thói quen của dev, lại nghe như cẩn thận: dò hết chỗ gọi trước. Nhưng chọn plan mode là theo độ lớn và số cách làm của việc, không theo thói quen."
        ] },
      { k: "D", gist: "Carry out the rename directly, since the change is fully scoped and needs no exploration first.",
        why: [
          "Đổi tên một hàm trong một file: thay đổi nhỏ, phạm vi rõ, một cách làm hiển nhiên. Đúng ca làm thẳng (ý 2).",
          "Claude đọc file, sửa chỗ khai báo và các chỗ gọi là xong. Không có quyết định thiết kế nào cần duyệt trước."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, mục “Chuyện gì đang xảy ra”: bảng chọn plan mode hay làm thẳng (thay đổi nhỏ, một file thì làm thẳng); Explore subagent cho pha khám phá dài", href: NOTES + "#l-3-4" },
      { label: "Bài 1.7: fork tách nhánh từ cùng một gốc để so hai hướng", href: NOTES + "#l-1-7" }
    ]
  },
  {
    de: 6, n: 32, total: 60, sub: "1.4", subName: "Workflow nhiều bước có cổng chặn và bàn giao", scen: "S3",
    answer: "C",
    ask: "In roughly 8% of runs, the coordinator spawns the report-generation subagent before the synthesis subagent has returned its cited findings, even though the system prompt says synthesis must come first. Those reports go out without citations. Which change guarantees the required order?",
    scene: [
      "Thứ tự đúng: synthesis subagent (agent tổng hợp) trả về findings có trích nguồn trước, rồi mới tới report subagent (agent viết báo cáo).",
      "System prompt của coordinator đã dặn đúng thứ tự đó.",
      "Vậy mà khoảng 8% số lần chạy, coordinator gọi report subagent khi synthesis chưa trả về. Báo cáo ra không có trích nguồn.",
      "Chỗ khó: đề hỏi “guarantees” (bảo đảm). Lời dặn đã có mà vẫn lọt 8%, nên phải đổi loại cơ chế, không phải dặn kỹ hơn."
    ],
    asks: [
      "Thay đổi nào bảo đảm đúng thứ tự?",
      "Tức là: cần cơ chế làm cho việc gọi report subagent quá sớm không thể xảy ra, coordinator quyết gì cũng vậy.",
      "Soi từng phương án: nó là prompt (xác suất) hay code (chắc chắn)? Nó chặn trước lúc spawn, hay chỉ làm gì đó sau khi đã spawn?"
    ],
    facts: [
      "Ghi quy tắc vào prompt (system prompt, ví dụ mẫu few-shot, chữ in đậm) là prompt-based guidance: tỉ lệ sai giảm được nhưng không về 0. Muốn bảo đảm thì phải programmatic enforcement, tức đặt quy tắc vào code.",
      "Prerequisite gate (cổng điều kiện trước): khóa bước B cho tới khi bước A đã xong. Ở đây là khóa việc spawn report subagent cho tới khi đã có output của synthesis.",
      "Coordinator tạo subagent bằng cách gọi tool Task (docs mới gọi là <code>Agent</code>). Lần spawn đó là một tool call như mọi tool call khác, nên hook nhìn thấy được.",
      "Hook <code>PreToolUse</code> chạy trước khi tool thực thi. Nó trả <code>permissionDecision: \"deny\"</code> kèm lý do thì tool call không chạy, và Claude nhận lý do đó để đi bước khác."
    ],
    opts: [
      { k: "A", gist: "Have the report-generation subagent score its confidence that the citations are complete before it returns.",
        why: [
          "Không đụng tới thời điểm spawn. Report subagent vẫn bị gọi sớm như cũ.",
          "Synthesis chưa chạy thì không có trích nguồn nào để chấm. Điểm tự chấm cũng chỉ là thêm một phán đoán xác suất của model (ý 1)."
        ] },
      { k: "B", gist: "Add few-shot examples to the coordinator prompt that show synthesis finishing before report generation starts.",
        why: [
          "Ví dụ mẫu là kỹ thuật thật, có thể kéo 8% xuống thấp hơn. Nhưng vẫn là prompt, nên không về 0 (ý 1).",
          "Đề đòi “guarantees” (bảo đảm), nên “sai ít hơn” vẫn chưa đạt. Thỉnh thoảng vẫn có báo cáo không trích nguồn.",
          "Dễ bị cuốn vì ví dụ mẫu đúng là cách làm output ổn định hơn. Nhưng ổn định hơn vẫn là xác suất. Thứ tự bắt buộc thì cần cổng chặn bằng code."
        ] },
      { k: "C", gist: "Add a <code>PreToolUse</code> hook that rejects <code>Task</code> calls for the report generator until synthesis output exists.",
        why: [
          "Lần spawn report subagent là một tool call Task (ý 3). Hook <code>PreToolUse</code> chạy trước khi nó thực thi, thấy chưa có output synthesis thì trả deny (ý 4).",
          "Đây đúng là prerequisite gate (ý 2): bước viết báo cáo bị khóa cho tới khi synthesis xong. Coordinator quyết gì thì report subagent cũng không chạy sớm được.",
          "Coordinator nhận lý do từ chối, chờ synthesis trả về rồi mới gọi lại."
        ] },
      { k: "D", gist: "Rewrite the ordering rule in bold at the very top of the coordinator's system prompt.",
        why: [
          "In đậm, đưa lên đầu chỉ làm câu đó nổi hơn các câu khác. Vẫn là prompt, vẫn là xác suất (ý 1).",
          "Đề đã cho thấy: quy tắc có sẵn trong prompt mà vẫn bị bỏ qua 8% số lần. Viết mạnh hơn có thể giảm con số đó, không đưa được nó về 0."
        ] }
    ],
    refs: [
      { label: "Bài 1.4: prompt-based guidance và programmatic enforcement, prerequisite gate", href: NOTES + "#l-1-4" },
      { label: "Bài 1.5: PreToolUse chạy trước tool, từ chối kèm lý do", href: NOTES + "#l-1-5" },
      { label: "Docs Agent SDK Hooks: PreToolUse trả deny để chặn tool call; matcher theo tên tool, có cả Agent (tool tạo subagent)", href: "https://code.claude.com/docs/en/agent-sdk/hooks" }
    ]
  },
  {
    de: 6, n: 33, total: 60, sub: "1.2", subName: "Điều phối coordinator–subagent", scen: "S3",
    answer: "B",
    ask: "Logs show the coordinator spawning the document analysis subagent on almost every request, including web-only questions where no documents were supplied. The subagent's description reads “Analyzes content and extracts key findings.” Which change most directly stops this unneeded delegation?",
    scene: [
      "Document analysis subagent (agent phân tích tài liệu người dùng đưa vào) bị gọi ở gần như mọi request.",
      "Kể cả câu hỏi chỉ cần tìm web, không có tài liệu nào được đưa vào.",
      "Description của subagent này: “Analyzes content and extracts key findings” (phân tích nội dung và rút ra các ý chính).",
      "Chỗ khó: câu description đó khớp với gần như mọi việc research. Câu hỏi nào mà chẳng có “content” (nội dung) để phân tích."
    ],
    asks: [
      "Thay đổi nào sửa thẳng nhất chuyện giao việc thừa?",
      "Tức là: tìm chỗ coordinator đọc để quyết có gọi subagent hay không, và sửa đúng chỗ đó.",
      "Soi từng phương án: nó có đổi thông tin coordinator dùng để chọn không, hay chỉ đổi chuyện xảy ra sau khi subagent đã được gọi?"
    ],
    facts: [
      "<code>AgentDefinition</code> là “hồ sơ” khai một loại subagent: <code>description</code> nói khi nào nên gọi nó, <code>prompt</code> là system prompt riêng, <code>tools</code> là các tool nó được dùng.",
      "Claude tự quyết khi nào gọi subagent, dựa vào việc cần làm và <code>description</code> của từng subagent. Docs dặn viết description rõ, cụ thể để Claude khớp đúng việc.",
      "Coordinator tốt chọn subagent theo từng câu hỏi (dynamic selection, chọn động): câu hỏi chỉ cần tìm web thì không phải chạy mọi subagent. Bài 1.2 xếp “câu hỏi nào cũng chạy đủ subagent theo thứ tự cố định” vào cột tệ.",
      "<code>tools</code> giới hạn subagent được làm gì khi đã chạy. Nó không quyết subagent có được gọi hay không."
    ],
    opts: [
      { k: "A", gist: "Add a system prompt instruction telling the coordinator to avoid spawning subagents it doesn't need.",
        why: [
          "Coordinator vốn đã cố chỉ gọi subagent cần thiết. Cái nó thiếu là căn cứ để biết khi nào phân tích tài liệu là cần (ý 2).",
          "Dặn chung “đừng gọi thừa” không cho nó căn cứ đó. Description vẫn khớp mọi việc, nên nó vẫn thấy subagent này là cần.",
          "Dễ bị cuốn vì lời dặn nhắm đúng triệu chứng. Nhưng nó không sửa chỗ coordinator đọc để chọn."
        ] },
      { k: "B", gist: "Rewrite the subagent's description to say it applies only when source documents have been supplied.",
        why: [
          "Coordinator quyết gọi subagent nào bằng cách đọc description (ý 2). Description mơ hồ khớp mọi request, nên subagent bị gọi tràn lan.",
          "Viết rõ điều kiện “chỉ khi có tài liệu nguồn được đưa vào” là cho coordinator đúng tín hiệu nó cần. Câu hỏi chỉ tìm web thì nó bỏ qua subagent này.",
          "Sửa đúng gốc, công sức nhỏ nhất. Giống cách sửa tool bị gọi nhầm: sửa description trước."
        ] },
      { k: "C", gist: "Restrict the document analysis subagent's tools to Read and Grep so its unnecessary runs cost less.",
        why: [
          "<code>tools</code> chỉ giới hạn việc subagent làm khi đã chạy (ý 4). Nó không đổi chuyện coordinator có gọi subagent hay không.",
          "Subagent vẫn bị gọi ở mọi câu hỏi chỉ cần web, vẫn tốn lượt gọi API và context riêng. Lần chạy thừa vẫn còn nguyên."
        ] },
      { k: "D", gist: "Hard-code the pipeline so the document analysis subagent always runs once web search has finished.",
        why: [
          "Đây đúng mẫu bài 1.2 xếp vào cột tệ: câu hỏi nào cũng chạy đủ subagent theo thứ tự cố định (ý 3).",
          "Coordinator mất luôn khả năng chọn theo từng câu hỏi. Phân tích tài liệu vẫn chạy ở mọi request, nên việc thừa log chỉ ra không mất đi, còn thành chắc chắn xảy ra."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, mục “Chuyện gì đang xảy ra”: coordinator chọn subagent theo câu hỏi (dynamic selection); khung Tệ: chạy đủ subagent theo thứ tự cố định", href: NOTES + "#l-1-2" },
      { label: "Bài 1.3, khung định nghĩa AgentDefinition: description cho biết khi nào nên gọi subagent", href: NOTES + "#l-1-3" },
      { label: "Docs Subagents in the SDK, mục Automatic invocation: Claude tự gọi subagent dựa vào description", href: "https://code.claude.com/docs/en/agent-sdk/subagents" }
    ]
  },
  {
    de: 6, n: 34, total: 60, sub: "1.5", subName: "Hook của Agent SDK: chặn tool call và chuẩn hóa dữ liệu", scen: "S3",
    answer: "B",
    ask: "The team's licensing agreement forbids pulling content from a fixed list of restricted domains. Every subagent retrieves web content only through one fetch tool, and every subagent prompt states the rule, yet audits still find restricted-domain fetches in about 3% of research runs. Which change guarantees compliance?",
    scene: [
      "Hợp đồng license (giấy phép dùng nội dung) cấm lấy nội dung từ một danh sách domain cố định.",
      "Mọi subagent chỉ lấy nội dung web qua đúng một fetch tool (tool tải trang). Prompt của subagent nào cũng ghi rõ luật cấm.",
      "Vậy mà kiểm tra vẫn thấy khoảng 3% lần chạy có fetch vào domain bị cấm.",
      "Chỗ khó: vi phạm xảy ra ngay lúc fetch chạy. Đề hỏi “guarantees” (bảo đảm), nên cơ chế phải chặn trước khi tool chạy, không phải phát hiện sau."
    ],
    asks: [
      "Thay đổi nào bảo đảm tuân thủ?",
      "Tức là: làm sao cho lời gọi fetch vào domain cấm không bao giờ chạy, subagent định làm gì cũng vậy.",
      "Soi từng phương án hai câu: nó chạy trước hay sau lúc fetch? Nó do code thi hành hay dựa vào model tự giác?"
    ],
    facts: [
      "Hook là code Agent SDK tự gọi ở những thời điểm cố định trong vòng lặp. Claude không biết hook tồn tại và không bỏ qua được. Hook là deterministic (chắc chắn), prompt là probabilistic (xác suất).",
      "Hook <code>PreToolUse</code> chạy sau khi Claude xin gọi tool, trước khi tool chạy. Nó đọc tên tool và tham số (ở đây là URL), trả <code>deny</code> kèm lý do thì tool không chạy, và Claude nhận lý do đó để chọn nguồn khác.",
      "Hook <code>PostToolUse</code> chạy sau khi tool đã trả kết quả. Hợp với chuẩn hóa kết quả, ghi log; không chặn được lời gọi đã chạy.",
      "Hook chỉ chạy cho tool khớp matcher. Docs nhắc: hook gắn cho Write và Edit sẽ không chạy khi Claude ghi file bằng Bash. Đề nói fetch tool là đường lấy nội dung duy nhất, nên hook trên đúng tool đó là phủ hết."
    ],
    opts: [
      { k: "A", gist: "Have the synthesis subagent rate its confidence that each source is permitted and discard the uncertain ones.",
        why: [
          "Sai thời điểm: synthesis chạy sau khi fetch đã xong. Nội dung cấm đã bị tải về, hợp đồng đã bị vi phạm.",
          "Điểm tự chấm cũng chỉ là thêm một phán đoán xác suất, chồng lên đúng loại phán đoán đang lọt 3% (ý 1)."
        ] },
      { k: "B", gist: "Register a <code>PreToolUse</code> hook on the fetch tool that denies any call aimed at a restricted domain.",
        why: [
          "Hook chạy trước khi fetch thực thi (ý 2). Đọc URL, thấy domain nằm trong danh sách cấm thì trả deny, lời gọi không bao giờ chạy.",
          "Hook là code do SDK thi hành mọi lần (ý 1), nên subagent quên luật cũng không fetch được. Fetch tool là đường duy nhất (ý 4), nên chặn ở đó là chặn hết.",
          "Subagent nhận lý do từ chối rồi tìm nguồn khác."
        ] },
      { k: "C", gist: "Move the restricted-domain list to the top of every subagent prompt and label it mandatory.",
        why: [
          "Vẫn là prompt (ý 1). Đưa lên đầu, ghi “bắt buộc” có thể giảm 3%, không đưa nó về 0.",
          "Đề đã cho thấy luật nằm trong mọi prompt mà vẫn lọt. Nghĩa vụ pháp lý cần cơ chế không phụ thuộc chuyện model có chọn làm theo hay không."
        ] },
      { k: "D", gist: "Add a <code>PostToolUse</code> hook that logs every fetch from a restricted domain for later audit review.",
        why: [
          "Sai thời điểm: <code>PostToolUse</code> chạy khi fetch đã trả kết quả (ý 3). Hook thấy được thì nội dung cấm đã về rồi.",
          "Ghi log giúp thấy vi phạm rõ hơn, không ngăn được vi phạm. Đề đòi ngăn.",
          "Dễ bị cuốn vì có chữ “hook”, trông như chặn bằng code. Nhưng muốn chặn thì hook phải chạy trước tool."
        ] }
    ],
    refs: [
      { label: "Bài 1.5: hook là deterministic, prompt là probabilistic; PreToolUse chạy trước tool, PostToolUse chạy sau", href: NOTES + "#l-1-5" },
      { label: "Docs Agent SDK Hooks: PreToolUse trả deny kèm permissionDecisionReason; matcher chỉ phủ đúng tool nó khớp", href: "https://code.claude.com/docs/en/agent-sdk/hooks" }
    ]
  },
  {
    de: 6, n: 35, total: 60, sub: "5.6", subName: "Giữ nguồn và xử lý mâu thuẫn khi tổng hợp", scen: "S3",
    answer: "C",
    ask: "Human reviewers spot-checking the final reports find that every citation gives only a document title, so verifying one claim drawn from a 200-page filing means reading the entire document. Reviewers are rejecting reports they can't verify. Which change makes each claim verifiable?",
    scene: [
      "Người review kiểm ngẫu nhiên báo cáo cuối. Trích nguồn nào cũng chỉ có tên tài liệu.",
      "Muốn kiểm một claim (khẳng định cụ thể) lấy từ một hồ sơ 200 trang thì phải đọc cả 200 trang. Reviewer trả về các báo cáo không kiểm được.",
      "Chỗ khó: trong hệ này chỉ document analysis subagent đọc tài liệu gốc. Synthesis và report chỉ nhận những gì được chuyển tiếp."
    ],
    asks: [
      "Thay đổi nào làm cho từng claim kiểm được?",
      "Tức là: vị trí của claim trong tài liệu (trang, mục) phải có mặt trong báo cáo, và phải là vị trí thật.",
      "Soi từng phương án: ai ghi vị trí, agent đó có đọc tài liệu không, và ghi vào lúc nào?"
    ],
    facts: [
      "Claim–source mapping: mỗi claim đi kèm nguồn, trích đoạn (excerpt) và thông tin về nguồn. Nó phải đi theo claim qua mọi agent, không được viết lại thành văn xuôi trơn.",
      "Khi chuyển kết quả giữa các agent, tách nội dung (claim, trích đoạn) khỏi metadata (tên tài liệu, số trang, ngày). Ví dụ ở bài 1.3: subagent phân tích PDF trả về <code>{claim, document, page, excerpt}</code>.",
      "Subagent chỉ thấy lời giao việc, không thấy tài liệu agent khác đã đọc. Agent không đọc tài liệu gốc thì không biết claim nằm ở trang nào.",
      "Lost in the middle: với input rất dài, model chú ý phần đầu và phần cuối tốt hơn, phần giữa dễ bị bỏ sót."
    ],
    opts: [
      { k: "A", gist: "Tell the report generator to put the most plausible page number beside each document title it cites.",
        why: [
          "Report generator chưa từng đọc tài liệu gốc (ý 3). Số trang nó thêm vào là đoán, nhưng trông y như trích nguồn đã kiểm.",
          "Reviewer lật tới trang đó không thấy claim, mất công hơn cả trích nguồn chỉ có tên. Gặp một lần như vậy là họ mất tin vào mọi trích nguồn khác.",
          "Dễ bị cuốn vì rẻ nhất: một dòng dặn là có ngay số trang. Nhưng số trang bịa còn tệ hơn không có số trang."
        ] },
      { k: "B", gist: "Have the coordinator re-run the document analysis subagent to locate the passage whenever a reviewer questions a citation.",
        why: [
          "Chạy được, nhưng chỉ sửa sau khi báo cáo đã bị trả về. Mỗi trích nguồn bị hỏi lại tốn thêm một lần xử lý tài liệu dài.",
          "Vị trí của claim vốn có sẵn lúc subagent đọc tài liệu lần đầu. Ghi lại ngay lúc đó rẻ hơn nhiều so với đi tìm lại mỗi lần bị hỏi."
        ] },
      { k: "C", gist: "Require the document analysis subagent to return every finding with a quoted excerpt and its page or section location.",
        why: [
          "Document analysis subagent là agent duy nhất đọc tài liệu gốc, nên là chỗ duy nhất ghi được vị trí thật, mà ghi lại rẻ (ý 3).",
          "Trích đoạn và trang/mục thành trường trong output có cấu trúc (ý 2). Chúng đi theo claim qua synthesis và report như dữ liệu, không phải dựng lại về sau (ý 1).",
          "Reviewer mở đúng trang, đọc đúng đoạn trích là kiểm xong một claim."
        ] },
      { k: "D", gist: "Pass the full text of every source document into the synthesis subagent's context so it can cite exact pages.",
        why: [
          "Đổ cả tài liệu vào synthesis là đưa lại đúng đống nội dung dài mà việc chia subagent sinh ra để cách ly.",
          "Synthesis vẫn phải tự dò lại vị trí, thay vì nhận vị trí từ agent đã đọc. Nhiều tài liệu dài thì phần giữa dễ bị bỏ sót (ý 4), nên kém tin cậy hơn chứ không chính xác hơn."
        ] }
    ],
    refs: [
      { label: "Bài 5.6: claim–source mapping, mỗi claim kèm nguồn và trích đoạn, giữ qua mọi agent", href: NOTES + "#l-5-6" },
      { label: "Bài 1.3, mục “Truyền kết quả thế nào để không mất nguồn”: tách nội dung và metadata (tên tài liệu, số trang); ví dụ {claim, document, page, excerpt}", href: NOTES + "#l-1-3" }
    ]
  },
  {
    de: 6, n: 36, total: 60, sub: "5.3", subName: "Báo lỗi giữa các agent", scen: "S3",
    answer: "C",
    ask: "In this system, the document analysis subagent's search completed successfully but found no matching passages. The coordinator re-ran the identical query three times and then labeled the topic “source unavailable” in the report. How should the coordinator handle a successful subagent result that contains no matches?",
    scene: [
      "Document analysis subagent tìm trong tài liệu: lệnh tìm chạy thành công, nhưng không có đoạn nào khớp.",
      "Coordinator chạy lại đúng query đó ba lần, rồi ghi chủ đề này là “source unavailable” (nguồn không truy cập được) trong báo cáo.",
      "Chỗ khó: coordinator đã gộp hai chuyện khác nhau. “Tìm được, nhưng không có gì” là một câu trả lời. “Không tìm được” mới là lỗi."
    ],
    asks: [
      "Coordinator nên xử lý một kết quả thành công mà rỗng thế nào?",
      "Tức là: kết quả rỗng hợp lệ thì làm gì tiếp, và báo cáo phải ghi sao cho đúng.",
      "Soi từng phương án: nó coi kết quả rỗng là lỗi hay là câu trả lời? Báo cáo cuối có nói đúng chuyện đã xảy ra không?"
    ],
    facts: [
      "Access failure: không truy cập được nguồn (timeout, lỗi 503), chưa biết nguồn có dữ liệu hay không, nên cần quyết định retry. Valid empty result: truy cập thành công và nguồn thật sự không có kết quả. Đó là câu trả lời hợp lệ, không phải lỗi.",
      "Tool lỗi thì báo bằng tín hiệu lỗi rõ ràng, ví dụ <code>tool_result</code> kèm <code>is_error: true</code>. Kết quả rỗng không có cờ lỗi là kết quả thành công.",
      "Gộp hai thứ đó làm một thì coordinator retry vô ích chỗ rỗng hợp lệ, và bỏ qua lỗi thật ở chỗ khác.",
      "Coverage annotation: báo cáo cuối ghi mảng nào đủ nguồn, mảng nào thiếu và thiếu vì sao. Ghi như vậy trung thực hơn một đoạn văn trôi chảy giấu lỗ hổng."
    ],
    opts: [
      { k: "A", gist: "Retry the same query with exponential backoff, since zero findings usually signals a transient backend access problem.",
        why: [
          "Sai ở giả định: kết quả rỗng không phải dấu hiệu lỗi truy cập (ý 1). Lỗi thật có tín hiệu lỗi đi kèm (ý 2), còn lần này lệnh tìm báo thành công.",
          "Backoff (chờ tăng dần rồi thử lại) đúng cho lỗi tạm thời. Áp vào một query đã có câu trả lời thì chỉ tốn lượt, kết quả vẫn rỗng y như cũ.",
          "Dễ bị cuốn vì retry nghe như chăm chỉ. Nhưng đó gần như đúng việc coordinator trong đề đã làm, và nó dẫn tới báo cáo ghi sai là “nguồn không truy cập được”."
        ] },
      { k: "B", gist: "Suppress the empty result and have the synthesis agent leave that topic out, so the report keeps only supported sections.",
        why: [
          "Giấu lỗ hổng: người đọc không biết mảng này đã được tìm mà không có nguồn. Báo cáo trông đủ mà thật ra thiếu.",
          "Trái với coverage annotation (ý 4): mảng thiếu nguồn phải được ghi ra kèm lý do, không bị xóa khỏi báo cáo."
        ] },
      { k: "C", gist: "Treat the empty result as a confirmed finding, then either broaden the query or note the coverage gap in the report.",
        why: [
          "Lệnh tìm chạy thành công mà không khớp gì là một câu trả lời: kho tài liệu không có đoạn nào khớp query này (ý 1).",
          "Từ đó coordinator có hai bước hợp lý: đổi cách hỏi (query rộng hơn hoặc diễn đạt khác) để tìm tiếp, hoặc ghi rõ lỗ hổng vào báo cáo (ý 4). Không chạy lại một query đã biết kết quả."
        ] },
      { k: "D", gist: "Ask the subagent to rate its confidence that the corpus truly contains nothing, and retry whenever that confidence is low.",
        why: [
          "Lệnh tìm đã trả lời dứt khoát: thành công, không khớp (ý 2). Điểm tự tin của model không đổi được chuyện đó.",
          "Thêm một phán đoán xác suất chồng lên một kết quả đã chắc chắn. Điểm thấp lại dẫn về retry query cũ, rơi đúng vào lỗi của phương án A."
        ] }
    ],
    refs: [
      { label: "Bài 5.3, mục “Empty không phải là lỗi”: valid empty khác access failure; báo cáo cuối có coverage annotation", href: NOTES + "#l-5-3" },
      { label: "Bài 2.2: access failure và empty result hợp lệ phải trả về khác nhau", href: NOTES + "#l-2-2" }
    ]
  },
  {
    de: 6, n: 37, total: 60, sub: "1.2", subName: "Điều phối coordinator–subagent", scen: "S3",
    answer: "A",
    ask: "Reports from this system sometimes come out incomplete, and the team cannot tell what the synthesis subagent actually received. A developer proposes giving the document analysis subagent a peer-messaging tool so it can pass findings straight to synthesis. Which design should the team adopt?",
    scene: [
      "Báo cáo của hệ research thỉnh thoảng ra thiếu nội dung.",
      "Team không biết synthesis subagent thật ra đã nhận được những gì.",
      "Một dev đề xuất: cho document analysis subagent một tool nhắn tin ngang hàng (peer messaging), để nó gửi findings thẳng cho synthesis.",
      "Chỗ khó: đề xuất nghe như nhanh hơn, bớt một chặng. Nhưng chặng bị bớt lại chính là chỗ nhìn thấy được thông tin đi đâu."
    ],
    asks: [
      "Team nên chọn thiết kế nào?",
      "Tức là: muốn biết synthesis nhận gì và xử lý được chỗ thiếu, thì thông tin giữa các subagent nên đi đường nào.",
      "Soi từng phương án: còn một chỗ nào nhìn thấy và kiểm được dữ liệu trước khi synthesis bắt đầu không?"
    ],
    facts: [
      "Hub-and-spoke (trục và nan hoa): coordinator là trục, subagent là nan hoa. Coordinator giao việc, subagent trả kết quả về coordinator, lỗi cũng báo về coordinator. Subagent không nói chuyện trực tiếp với nhau.",
      "Lợi ích của trục: nhìn một chỗ là thấy hết, xử lý lỗi một kiểu, biết thông tin chảy đi đâu. Bài 1.2 xếp “subagent gửi kết quả thẳng cho nhau cho nhanh” vào cột tệ.",
      "Subagent (không phải fork) bắt đầu với context mới, chỉ nhận lời giao việc trong lần gọi tool tạo nó. Khi xong, chỉ câu trả lời cuối của nó quay về agent cha.",
      "Tách subagent để mỗi agent có context riêng, nhiệm vụ hẹp, chỉ dẫn riêng. Một agent ôm cả nội dung tài liệu dài lẫn việc tổng hợp thì context đầy, sự chú ý bị loãng."
    ],
    opts: [
      { k: "A", gist: "Keep the coordinator as the sole relay, passing each subagent's final report into the synthesis prompt.",
        why: [
          "Đúng hub-and-spoke (ý 1). Kết quả của document analysis về coordinator (ý 3), và coordinator quyết đưa gì vào lời giao việc cho synthesis.",
          "Mọi thứ đi qua một chỗ, nên team đọc lời giao việc là biết synthesis nhận gì. Coordinator cũng xử lý được chỗ thiếu trước khi synthesis bắt đầu, ví dụ ghi một mảng bị timeout là lỗ hổng nguồn (ý 2)."
        ] },
      { k: "B", gist: "Merge document analysis and synthesis into a single subagent so no handoff between agents is needed.",
        why: [
          "Bớt được chặng bàn giao, nhưng mất luôn lý do tách subagent: context riêng và chỉ dẫn riêng (ý 4).",
          "Chuyện “không biết synthesis nhận gì” không được sửa, chỉ bị chôn vào bên trong một agent to hơn."
        ] },
      { k: "C", gist: "Grant the peer-messaging tool, but have each subagent append every message it sends to a shared log file.",
        why: [
          "Log chung chỉ giúp xem lại sau khi đã chạy xong. Coordinator vẫn không kiểm, chuẩn hóa hay giữ lại được findings trước khi synthesis bắt đầu.",
          "Lại phải tự dựng một cơ chế ghi chép để có lại thứ mà đường đi qua coordinator đã có sẵn (ý 2). Xử lý lỗi vẫn rải rác ở từng subagent.",
          "Dễ bị cuốn vì nó trông như giải đúng triệu chứng “không biết synthesis nhận gì”. Nhưng thấy được sau khi chạy không bằng kiểm được trước khi chạy."
        ] },
      { k: "D", gist: "Grant the peer-messaging tool and have the coordinator receive only the synthesis subagent's final report.",
        why: [
          "Đây đúng kiểu subagent gửi thẳng cho nhau mà bài 1.2 xếp vào cột tệ (ý 2).",
          "Chặng từ document analysis sang synthesis biến khỏi tầm nhìn của coordinator. Kết quả thiếu, timeout, finding bị bỏ đều đi ngang qua mà không chỗ nào bắt được."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, mục “Chuyện gì đang xảy ra”: hub-and-spoke, subagent không nói chuyện trực tiếp; khung Tệ: subagent gửi kết quả thẳng cho nhau", href: NOTES + "#l-1-2" },
      { label: "Docs Subagents in the SDK, mục What subagents inherit: subagent chỉ nhận prompt của lần gọi, chỉ câu trả lời cuối quay về agent cha", href: "https://code.claude.com/docs/en/agent-sdk/subagents" }
    ]
  },
  {
    de: 6, n: 38, total: 60, sub: "1.1", subName: "Vòng lặp agent", scen: "S3",
    answer: "C",
    ask: "The team wrote a custom Messages API loop for the report-generation subagent that ends when the assistant's text contains the phrase “Final report complete”. Some runs stop early because a mid-task section summary happens to use that phrase. What should determine loop termination instead?",
    scene: [
      "Team tự viết vòng lặp agent trên Messages API cho report subagent.",
      "Vòng lặp dừng khi text của Claude có cụm “Final report complete” (báo cáo cuối đã xong).",
      "Có lần Claude viết đúng cụm đó trong đoạn tóm tắt sau một section, giữa chừng. Vòng lặp dừng, báo cáo mới xong một phần.",
      "Chỗ khó: lỗi không nằm ở chọn cụm từ nào. Lỗi nằm ở chuyện đọc chữ Claude viết để quyết định dừng."
    ],
    asks: [
      "Thứ gì nên quyết định lúc vòng lặp kết thúc?",
      "Tức là: tín hiệu dừng đúng của vòng lặp agent là gì.",
      "Soi từng phương án: tín hiệu đó do API đặt (máy đọc được, chắc chắn) hay suy ra từ chữ và số vòng?"
    ],
    facts: [
      "<code>stop_reason</code> có trong mọi response của Messages API, cho biết vì sao Claude ngừng sinh chữ ở lần trả lời đó. Giá trị do API đặt, không phụ thuộc Claude viết gì trong text.",
      "<code>tool_use</code>: Claude xin gọi tool và đang chờ kết quả, nên chạy tool rồi lặp tiếp. <code>end_turn</code>: Claude đã trả lời xong, nên dừng.",
      "Bài 1.1 gọi tên ba cách dừng sai: đọc chữ trong text (“DONE”, “Task completed”); thấy có block text là coi như xong; lấy trần số vòng làm điều kiện dừng chính.",
      "Một response có thể chứa cả block text lẫn block <code>tool_use</code>, ví dụ Claude nói một câu rồi xin gọi tool. Trần số vòng (như <code>maxTurns</code>) chỉ là dây an toàn: chạm trần là bất thường (Agent SDK trả <code>error_max_turns</code>), không phải xong."
    ],
    opts: [
      { k: "A", gist: "Require a more distinctive sentinel phrase in the system prompt and match it with a stricter regular expression.",
        why: [
          "Cụm từ hiếm hơn, regex chặt hơn thì vẫn là đọc chữ để đoán đã xong chưa (ý 3). Chỉ giảm khả năng trùng, không đổi loại cơ chế.",
          "Claude vẫn có thể quên viết cụm đó, viết khác đi, hoặc nhắc lại nó giữa chừng. Vòng lặp vẫn có lúc dừng sai hoặc không dừng.",
          "Dễ bị cuốn vì nhắm thẳng vào triệu chứng: cụm từ bị trùng thì đổi cụm từ. Nhưng text là lời Claude kể cho người đọc, không phải tín hiệu điều khiển."
        ] },
      { k: "B", gist: "End the loop as soon as any response includes a text block next to its tool calls.",
        why: [
          "Text đi chung với <code>tool_use</code> trong một response là chuyện bình thường (ý 4). Đây là cách dừng sai thứ hai bài 1.1 gọi tên (ý 3).",
          "Dừng ở đó là bỏ dở các tool call Claude đang xin. Báo cáo còn cụt hơn bây giờ."
        ] },
      { k: "C", gist: "Keep looping while <code>stop_reason</code> is <code>\"tool_use\"</code> and stop when the response returns <code>\"end_turn\"</code>.",
        why: [
          "<code>stop_reason</code> là tín hiệu có cấu trúc API đặt sẵn để điều khiển vòng lặp (ý 1). <code>tool_use</code> thì chạy tool rồi gọi lại, <code>end_turn</code> thì dừng (ý 2).",
          "Quyết định dừng không còn dính gì tới chữ Claude viết. Đoạn tóm tắt giữa chừng nhắc cụm nào cũng không làm vòng lặp dừng sớm được."
        ] },
      { k: "D", gist: "Cap the loop at a fixed number of iterations and treat reaching the cap as the signal that the work is done.",
        why: [
          "Đây là cách dừng sai thứ ba (ý 3). Trần số vòng là dây an toàn chống chạy mãi, không định nghĩa “xong” (ý 4).",
          "Báo cáo cần nhiều bước hơn trần thì bị cắt ngang, báo cáo xong sớm thì phí vòng. Chạm trần cũng không nói gì về chuyện Claude đã làm xong chưa."
        ] }
    ],
    refs: [
      { label: "Bài 1.1, mục “Ba cách dừng sai mà guide gọi tên”: đọc chữ trong text, thấy block text, lấy trần vòng làm điều kiện dừng", href: NOTES + "#l-1-1" },
      { label: "Cheatsheet D1: vòng lặp dừng khi thấy chữ “done” thì sửa bằng stop_reason; trần vòng chỉ là dây an toàn", href: NOTES + "#cheat-d1" }
    ]
  },
  {
    de: 6, n: 39, total: 60, sub: "2.5", subName: "Chọn built-in tool đúng việc", scen: "S3",
    answer: "D",
    ask: "Asked to find every code path in this system's codebase that performs a web search, Claude Code Greps for <code>SearchClient.search</code> and gets a single match, inside a wrapper function named <code>run_search</code> in <code>search/wrapper.py</code>. What should it do next?",
    scene: [
      "Claude Code được nhờ tìm mọi đường code trong codebase của hệ research có gọi web search.",
      "Nó Grep <code>SearchClient.search</code> và chỉ thấy một chỗ khớp, nằm trong hàm wrapper (hàm bọc) <code>run_search</code> ở <code>search/wrapper.py</code>.",
      "Chỗ khó: một kết quả Grep trông như câu trả lời. Nhưng chỗ đó chỉ là hàm bọc; các agent thật sự tìm web là những chỗ gọi <code>run_search</code>, và Grep chưa thấy chúng. Ví dụ minh họa:<pre><code># search/wrapper.py\ndef run_search(query):\n    return SearchClient.search(query)\n\n# agents/web_agent.py  (file giả định)\nresults = run_search(topic)</code></pre>"
    ],
    asks: [
      "Bước tiếp theo nên làm gì?",
      "Tức là: một kết quả nằm trong hàm bọc thì lần tiếp thế nào cho đủ mọi chỗ thật sự tìm web, mà không đổ cả codebase vào context.",
      "Soi từng phương án: nó có lần tới chỗ gọi hàm bọc không, và tốn bao nhiêu context?"
    ],
    facts: [
      "Grep tìm chữ bên trong file, ví dụ mọi chỗ gọi một hàm. Read đọc toàn bộ một file đã xác định.",
      "Khám phá tăng dần: Grep tìm điểm vào, Read đúng file đó, theo lời gọi để lần luồng, Grep tiếp khi cần. Bài 2.5 xếp “Read toàn bộ thư mục để hiểu tổng thể” vào cột tệ.",
      "Hàm đi qua wrapper (hàm hoặc module bọc lại) thì nơi dùng gọi tên của wrapper. Grep mỗi tên gốc sẽ sót những chỗ đó, phải Grep tiếp tên wrapper.",
      "Subagent hợp với pha khám phá dài, cần cách ly output. Một lần Grep tên hàm không có output dài nào để cách ly."
    ],
    opts: [
      { k: "A", gist: "Report that web search happens in exactly one place, since Grep returned only one match.",
        why: [
          "Sai ở giả định: chỗ khớp duy nhất nằm trong hàm bọc, không phải nơi dùng tìm web (ý 3).",
          "Mọi chỗ gọi <code>run_search</code> cũng là đường code tìm web. Dừng ở đây là trả lời sai mà nghe rất chắc.",
          "Dễ bị cuốn vì Grep chạy đúng, kết quả rõ ràng. Nhưng Grep chỉ trả lời “chữ này nằm đâu”, không trả lời “ai dùng nó”."
        ] },
      { k: "B", gist: "Read every file under <code>agents/</code> so no caller of the search client is missed.",
        why: [
          "Đúng cột tệ của bài 2.5: Read cả thư mục (ý 2). Context đầy những file không liên quan tới tìm web.",
          "Vẫn không chắc đủ: chỗ gọi <code>run_search</code> có thể nằm ngoài <code>agents/</code>. Grep tên wrapper vừa rẻ hơn vừa phủ cả codebase."
        ] },
      { k: "C", gist: "Spawn one subagent per top-level directory to search for callers in parallel.",
        why: [
          "Một lần Grep tên hàm là xong việc, không có output dài nào cần cách ly (ý 4).",
          "Chia cho nhiều subagent chỉ thêm việc điều phối, kết quả lại bị rải ra nhiều context rồi phải gom lại."
        ] },
      { k: "D", gist: "Grep for <code>run_search</code> to find the wrapper's callers, then Read those files to carry the trace forward.",
        why: [
          "Chỗ khớp duy nhất là hàm bọc, nên chỗ gọi thật nằm cách một lớp (ý 3). Grep <code>run_search</code> ra đúng các file gọi nó.",
          "Read từng file đó để xem nó dùng thế nào, có bọc thêm lớp nào không, rồi Grep tiếp nếu cần. Đúng vòng khám phá tăng dần (ý 2), chỉ nạp file liên quan."
        ] }
    ],
    refs: [
      { label: "Bài 2.5, mục “Khám phá tăng dần, không đọc hết”: Grep → Read → Grep tiếp; gặp wrapper thì Grep tiếp tên của wrapper", href: NOTES + "#l-2-5" },
      { label: "Bài 3.4, mục “Khi pha khám phá quá dài”: subagent dùng để cách ly output khám phá dài", href: NOTES + "#l-3-4" }
    ]
  },
  {
    de: 6, n: 40, total: 60, sub: "2.5", subName: "Chọn built-in tool đúng việc", scen: "S3",
    answer: "D",
    ask: "The report generator subagent needs to fix one citation block in a generated Markdown report. Edit fails because the block appears in five identical sections, and anchors extended with surrounding lines still match more than once. What should the subagent do next?",
    scene: [
      "Report subagent cần sửa một khối trích nguồn trong file báo cáo Markdown nó vừa tạo.",
      "Edit báo lỗi: khối đó xuất hiện y hệt ở năm section.",
      "Đã thử kéo dài <code>old_string</code> thêm các dòng xung quanh, vẫn khớp hơn một chỗ, vì các dòng xung quanh cũng giống hệt nhau.",
      "Chỗ khó: cách chữa quen thuộc cho lỗi khớp nhiều chỗ đã thử mà không được. Phải biết bước lui tiếp theo."
    ],
    asks: [
      "Subagent nên làm gì tiếp?",
      "Tức là: khi Edit không thể có anchor duy nhất, sửa đúng một khối bằng cách nào mà không đụng bốn khối kia.",
      "Soi từng phương án: nó có sửa đúng một chỗ không, và có dùng đúng tool cho việc này không?"
    ],
    facts: [
      "Edit tìm <code>old_string</code> đúng nguyên văn, và đoạn đó phải xuất hiện đúng một lần trong file. Khớp từ hai chỗ trở lên thì Edit báo lỗi, không sửa gì. Bật <code>replace_all</code> thì Edit sửa mọi chỗ khớp.",
      "Edit khớp nhiều chỗ: kéo dài <code>old_string</code> cho thành duy nhất; không làm được thì Read + Write. Guide ghi thẳng: Edit thất bại vì khớp nhiều chỗ thì lui về Read + Write.",
      "Write ghi đè cả file nên phải đưa đủ nội dung, và không ghi được file chưa Read. Vì vậy đường lui luôn là Read trước, Write sau.",
      "Đọc, tìm, sửa file thì dùng tool chuyên dụng (Read, Grep, Glob, Edit, Write). Bash dành cho việc chạy lệnh như test, git."
    ],
    opts: [
      { k: "A", gist: "Call Edit again with <code>replace_all</code> set to true so the uniqueness requirement stops applying.",
        why: [
          "Chạy được, Edit không báo lỗi nữa. Nhưng <code>replace_all</code> sửa cả năm khối (ý 1).",
          "Đề cần sửa đúng một khối. Bốn section đang đúng bị đổi theo, báo cáo sai thêm bốn chỗ.",
          "Dễ bị cuốn vì nó gỡ đúng cái lỗi Edit vừa báo. Nhưng gỡ bằng cách sửa luôn những chỗ không được đụng."
        ] },
      { k: "B", gist: "Retry the identical Edit call a few times with backoff in case the match failure is transient.",
        why: [
          "Khớp nhiều chỗ là do nội dung file, không phải lỗi tạm thời. Cùng <code>old_string</code>, cùng file thì lần nào cũng khớp năm chỗ (ý 1).",
          "Retry chỉ tốn lượt. Bài 2.5 xếp “Edit lặp lại khi text không duy nhất” vào cột tệ."
        ] },
      { k: "C", gist: "Switch to Bash and patch the targeted lines of the report with a <code>sed</code> command.",
        why: [
          "Có thể sửa được file, nhưng <code>sed</code> vẫn phải tự chỉ ra một khối giữa năm khối y hệt. Đó đúng là cái khó Edit vừa gặp.",
          "Bỏ tool sửa file chuyên dụng để dùng lệnh Bash là đi vòng (ý 4)."
        ] },
      { k: "D", gist: "Read the whole file, apply the change within that content, then Write the complete updated file.",
        why: [
          "Đúng bước lui notes và guide ghi: Edit không có anchor duy nhất thì Read + Write (ý 2).",
          "Read lấy đủ nội dung, subagent sửa đúng khối cần sửa trong bản đó, rồi Write ghi đè cả file (ý 3). Không cần chuỗi khớp duy nhất nữa, bốn khối kia giữ nguyên.",
          "Cái giá là cả file đi qua context hai lần, nên chỉ dùng khi Edit thật sự không làm được."
        ] }
    ],
    refs: [
      { label: "Bài 2.5, mục “Đã sửa 01/11”: Edit khớp nhiều chỗ thì kéo dài old_string, không được thì Read + Write", href: NOTES + "#fix-3" },
      { label: "Bài 2.5: bảng tool (Write là đường lui khi Edit không có anchor duy nhất) và khung Tệ / Tốt", href: NOTES + "#l-2-5" }
    ]
  },
  {
    de: 6, n: 41, total: 60, sub: "1.3", subName: "Gọi subagent, truyền context", scen: "S3",
    answer: "D",
    ask: "After the web search subagent returns 25 sources, the coordinator spawns the document analysis subagent (a regular subagent, not a fork) with the prompt “analyze the documents found in the previous step.” The analysis subagent replies that it was given no documents. How should the coordinator repair this handoff?",
    scene: [
      "Search subagent trả về 25 nguồn. Coordinator gọi tiếp subagent phân tích tài liệu với lời giao việc “analyze the documents found in the previous step” (phân tích các tài liệu tìm được ở bước trước).",
      "Subagent phân tích trả lời: không ai đưa tài liệu nào cho nó.",
      "Chỗ khó: đề nói rõ đây là subagent thường, “not a fork” (không phải fork). Với subagent thường, cụm “bước trước” không trỏ tới đâu cả, vì nó chưa từng thấy bước trước."
    ],
    asks: [
      "Coordinator nên sửa chỗ bàn giao này thế nào?",
      "Tức là: làm sao để 25 nguồn kia thật sự nằm trong context của subagent phân tích.",
      "Soi từng phương án: nó đưa dữ liệu qua đúng kênh subagent nhận được, hay chỉ đổi lời dặn?"
    ],
    facts: [
      "Subagent thường (không phải fork) khởi động với context mới. Nó không nhận lịch sử hội thoại, cũng không nhận kết quả tool của coordinator.",
      "Thứ duy nhất coordinator truyền sang là chuỗi prompt của lời gọi tool Agent (guide gọi là Task). Docs dặn: file, lỗi, quyết định nào subagent cần thì viết thẳng vào prompt đó.",
      "Chỉ fork mới sao chép hội thoại tới thời điểm gọi. Đề đã loại trường hợp này.",
      "<code>initialPrompt</code> trong <code>AgentDefinition</code> chỉ tự gửi làm lượt user đầu tiên khi agent đó chạy làm agent chính. Gọi nó như subagent thì trường này bị bỏ qua."
    ],
    opts: [
      { k: "A", gist: "Add a line to the analysis subagent's system prompt telling it to go through the coordinator's earlier tool results before it starts.",
        why: [
          "Sai ở giả định: subagent không thấy kết quả tool của coordinator (ý 1). Dặn nó “xem lại” thứ nó không có thì cũng như không.",
          "Chạy lại, nó vẫn báo không có tài liệu nào.",
          "Dễ bị cuốn vì system prompt nghe như chỗ cấu hình mạnh nhất của subagent. Nhưng system prompt chỉ đổi cách nó làm việc, không thêm dữ liệu vào context."
        ] },
      { k: "B", gist: "Re-send the delegation with firmer wording that insists the subagent find the documents identified in the previous phase.",
        why: [
          "Sai ở chẩn đoán: subagent không lười, cũng không cãi lời. Nó thật sự không có tài liệu (ý 1).",
          "Viết mạnh hơn chỉ đổi giọng, không đổi nội dung. Prompt mới vẫn không chứa nguồn nào (ý 2), nên kết quả y như cũ."
        ] },
      { k: "C", gist: "Put the search findings into the analysis subagent's <code>initialPrompt</code> so they load automatically whenever it is invoked.",
        why: [
          "Sai ở giả định: <code>initialPrompt</code> bị bỏ qua khi agent được gọi như subagent (ý 4). Nó chỉ chạy khi agent đó là agent chính.",
          "Kết quả search vẫn không tới được subagent phân tích.",
          "Dễ bị cuốn vì <code>initialPrompt</code> là trường có thật và tên nghe như “nạp sẵn lúc gọi”. Nhưng nó không phải kênh bàn giao cho subagent."
        ] },
      { k: "D", gist: "Condense what the search phase found and include the source list directly in the prompt that spawns the analysis subagent.",
        why: [
          "Đúng kênh duy nhất: prompt của lời gọi Agent là thứ coordinator truyền được sang subagent (ý 2).",
          "Tóm các phát hiện chính rồi đặt danh sách 25 nguồn ngay trong prompt. Subagent mở ra là có tài liệu để phân tích, không phải đoán “bước trước” là gì.",
          "Danh sách nguồn nên tách riêng phần nội dung và phần thông tin nguồn (URL, tên tài liệu), như bài 1.3 dặn, để báo cáo cuối còn ghi được nguồn."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Chuyện gì đang xảy ra”: subagent bắt đầu với trang giấy trắng, phải dán kết quả vào lời giao việc", href: NOTES + "#l-1-3" },
      { label: "Docs “Subagents in the SDK”, mục What subagents inherit và bảng AgentDefinition (dòng initialPrompt)", href: "https://code.claude.com/docs/en/agent-sdk/subagents" }
    ]
  },
  {
    de: 6, n: 42, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S3",
    answer: "BD",
    ask: "A developer paused an Agent SDK session in which the agent had worked out how the synthesis subagent assembles citations. Since then, most of the source files it analyzed have been refactored. Which two approaches keep the continued work from relying on stale analysis? (Choose two.)",
    scene: [
      "Developer tạm dừng một phiên Agent SDK. Trong phiên đó agent đã lần ra cách synthesis subagent ghép citation (trích dẫn nguồn).",
      "Từ lúc dừng tới giờ, phần lớn file nguồn agent đã đọc bị refactor.",
      "Chỗ khó: phiên lưu nguyên những gì agent đã đọc. Mở lại phiên thì agent vẫn thấy nội dung file trước refactor và tin là đúng, vì nhìn từ trong lịch sử không có gì báo là đã đổi."
    ],
    asks: [
      "Hai cách nào giúp phần việc tiếp theo không dựa vào phân tích đã lỗi thời?",
      "Tức là: hoặc báo cho agent biết file nào đã đổi để nó đọc lại, hoặc bỏ lịch sử cũ mà vẫn giữ được kết luận còn dùng được.",
      "Soi từng phương án: nó có đưa thông tin “file nào đã đổi” vào context không, hay trông vào agent tự nhận ra?"
    ],
    facts: [
      "Session lưu hội thoại: prompt, tool call, kết quả tool, câu trả lời. Docs ghi rõ session lưu hội thoại, không lưu hệ thống file. Resume nạp lại đúng nội dung file lúc agent đọc, không đọc lại từ đĩa.",
      "Kết quả tool lỗi thời (stale) thì agent không biết, vẫn tin là đúng. Quy tắc bài 1.7: ngữ cảnh còn đúng thì resume và nói rõ cái gì đã đổi. Phần lớn đã lỗi thời thì mở phiên mới kèm bản tóm tắt có cấu trúc.",
      "Hook <code>SessionStart</code> chạy khi phiên bắt đầu và cả khi resume. Docs ghi nó dùng để nạp ngữ cảnh như “recent changes to your codebase” (các thay đổi gần đây trong codebase). Text hook trả trong <code>additionalContext</code> vào context của Claude trước prompt đầu tiên.",
      "Context do hook chèn giữa phiên (vd <code>PostToolUse</code>) được phát lại y nguyên khi resume, không chạy lại. Riêng <code>SessionStart</code> chạy lại lúc resume, nên lấy được danh sách file mới nhất."
    ],
    opts: [
      { k: "A", gist: "Resume the session and ask the agent to score its confidence in the earlier analysis before it carries on.",
        why: [
          "Sai ở chỗ thiếu dữ kiện: agent không có cách biết file đã bị refactor nếu không ai báo và nó không đọc lại (ý 1).",
          "Tự chấm trên nền lịch sử cũ thì nó vẫn thấy bằng chứng cũ rất cụ thể, nên vẫn có thể chấm cao. Thêm một bước mà không thêm thông tin nào.",
          "Dễ bị cuốn vì nghe như cẩn thận. Nhưng confidence tự báo là thước đo không đáng tin, không thay được việc đọc lại code."
        ] },
      { k: "B", gist: "Register a <code>SessionStart</code> hook that, on resume, injects the list of recently changed files into the agent's context.",
        why: [
          "Hook chạy lại đúng lúc resume (ý 4) và đưa danh sách file đã đổi vào context qua <code>additionalContext</code> (ý 3).",
          "Ngay từ lượt đầu agent thấy file nào đã đổi, nên biết phần phân tích nào phải đọc lại. Đây là bản tự động của lời dặn “resume và nói rõ cái gì đã đổi” (ý 2).",
          "Trong Agent SDK, TypeScript đăng ký <code>SessionStart</code> làm callback được. Python chưa có callback này, phải khai làm shell hook trong file settings."
        ] },
      { k: "C", gist: "Resume the session unchanged, because the agent's earlier file reads are refreshed from disk automatically when it loads.",
        why: [
          "Bịa tính năng: resume không đọc lại file nào. Lịch sử nạp lại y nguyên, kể cả nội dung file trước refactor (ý 1).",
          "Agent sẽ suy luận rất tự tin trên code không còn tồn tại, đúng điều đề muốn tránh."
        ] },
      { k: "D", gist: "Start a new session seeded with a structured summary of earlier findings and a note of which files were refactored.",
        why: [
          "Phần lớn file đã đổi, nên phần lớn kết quả tool trong phiên cũ đã lỗi thời. Đây đúng ca bài 1.7 chốt: mở phiên mới kèm bản tóm tắt có cấu trúc (ý 2).",
          "Phiên mới không mang theo nội dung file cũ. Kết luận còn dùng được đi theo bản tóm tắt, còn mọi khẳng định về code hiện tại thì lấy từ lần đọc mới.",
          "Ghi chú file nào đã refactor cho agent biết chỗ nào phải đọc lại trước."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Ba cách nối lại công việc”: resume khi ngữ cảnh còn đúng, phiên mới kèm tóm tắt khi kết quả tool đã lỗi thời", href: NOTES + "#l-1-7" },
      { label: "Docs hooks, mục SessionStart: chạy cả khi resume, dùng để nạp các thay đổi gần đây; mục Add context for Claude: hook giữa phiên được phát lại, SessionStart chạy lại", href: "https://code.claude.com/docs/en/hooks" },
      { label: "Docs “Work with sessions”: session lưu hội thoại, không lưu hệ thống file", href: "https://code.claude.com/docs/en/agent-sdk/sessions" }
    ]
  },
  {
    de: 6, n: 43, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code", scen: "S3",
    answer: "CD",
    ask: "The synthesis subagent has an MCP tool <code>query_findings</code> that returns findings with source attribution from the shared store, but its description says only “Queries findings” and documents no parameters. The subagent greps the raw scratchpad files instead. Which two changes fix this most directly? (Choose two.)",
    scene: [
      "Synthesis subagent có tool MCP <code>query_findings</code>: lấy các phát hiện từ kho chung, mỗi phát hiện kèm nguồn.",
      "Description của tool chỉ có hai chữ “Queries findings” (truy vấn phát hiện), không nói tham số nào.",
      "Subagent bỏ qua nó, tự Grep các file scratchpad thô.",
      "Chỗ khó: Grep vẫn chạy được, nên subagent không “hỏng”. Nó chỉ đi đường kém hơn vì không hiểu tool MCP dùng thế nào."
    ],
    asks: [
      "Hai thay đổi nào sửa thẳng nhất?",
      "Tức là: làm cho tool MCP thành lựa chọn model hiểu được, và bỏ đường vòng mà vai này không cần.",
      "Soi từng phương án: nó đụng vào thứ model dựa vào để chọn tool (định nghĩa tool, danh sách tool), hay chỉ là lời dặn, thứ tự?"
    ],
    facts: [
      "Model chọn tool chỉ dựa vào <code>name</code>, <code>description</code>, <code>input_schema</code>. Docs Define tools: description chi tiết là “by far the most important factor” (yếu tố quan trọng nhất, bỏ xa các yếu tố khác) với hiệu quả của tool.",
      "Description tốt nói rõ tool làm gì, khi nào dùng, input định dạng gì, kèm ví dụ query. Bài 2.4: agent thích Grep hơn tool MCP là vì description của tool MCP sơ sài.",
      "Scoped tool access (bài 2.3): mỗi agent chỉ cầm tool đúng vai. Docs Agent SDK: tool không có trong <code>tools</code> của subagent thì không có trong phiên của nó. Vai synthesis là tổng hợp phát hiện đã có nguồn, không phải lục file thô.",
      "Model không thấy thứ tự hay trọng số của tool trong mảng. Đưa tool lên đầu không làm nó được ưu tiên."
    ],
    opts: [
      { k: "A", gist: "Add a sweeping system prompt rule telling the subagent to always prefer MCP tools over built-in ones.",
        why: [
          "Sai ở chỗ chữa ngọn: tool MCP vẫn chỉ có hai chữ, model vẫn không biết gọi nó thế nào (ý 1, ý 2).",
          "Luật “always” (luôn luôn) cũng quá rộng: nó đẩy model sang tool MCP cả lúc built-in mới đúng việc. Và nó vẫn chỉ là lời dặn, model có thể không theo."
        ] },
      { k: "B", gist: "Reorder the tool definitions so <code>query_findings</code> comes before Grep in the list sent to the model.",
        why: [
          "Bịa cơ chế: thứ tự trong mảng không phải thứ model dùng để chọn tool (ý 4).",
          "Đổi chỗ xong, model vẫn thấy một tool MCP mơ hồ đứng cạnh một Grep nó hiểu rõ, và vẫn chọn Grep."
        ] },
      { k: "C", gist: "Remove Grep from the synthesis subagent's tool list so it keeps only tools that fit its role.",
        why: [
          "Đúng scoped tool access (ý 3): vai synthesis không cần lục file thô, nên Grep là tool ngoài vai.",
          "Bỏ Grep khỏi danh sách thì đường vòng biến mất hẳn. Chắc chắn, không phụ thuộc model có nghe lời hay không.",
          "Dễ bị loại nhầm vì bài 2.4 dặn “không tắt Grep”. Câu đó nói về agent vẫn cần Grep cho việc khác, tắt đi là hỏng việc khác. Ở đây chỉ cắt tool của một subagent theo đúng vai, các agent khác vẫn có Grep."
        ] },
      { k: "D", gist: "Extend the description with the expected format of the query parameter and example queries the tool should handle.",
        why: [
          "Sửa đúng thứ model đọc để chọn tool (ý 1). Có định dạng tham số và ví dụ query, model biết một lời gọi hợp lệ trông thế nào và loại câu hỏi nào nên dùng tool này (ý 2).",
          "Tool MCP từ một cánh cửa không nhãn thành lựa chọn rõ nhất cho việc lấy phát hiện kèm nguồn."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, mục “Vì sao agent thích Grep hơn MCP tool”: description sơ sài là gốc", href: NOTES + "#l-2-4" },
      { label: "Bài 2.3, mục “Chuyện gì đang xảy ra”: scoped tool access, synthesis agent chỉ cầm tool đúng vai", href: NOTES + "#l-2-3" },
      { label: "Docs Define tools, mục Best practices for tool definitions", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools" }
    ]
  },
  {
    de: 6, n: 44, total: 60, sub: "2.1", subName: "Thiết kế tool: description rõ, ranh giới rõ", scen: "S3",
    answer: "CD",
    ask: "The coordinator chooses between two summarizing tools: <code>summarize_source</code>, run by the web search agent, and <code>summarize_document</code>, run by the document agent. Both carry the identical description “summarizes a source and returns key points.” Requests to summarize uploaded whitepapers often end up at <code>summarize_source</code>. Which two changes resolve the misrouting most directly? (Choose two.)",
    scene: [
      "Coordinator có hai tool tóm tắt: <code>summarize_source</code> do agent tìm web chạy, <code>summarize_document</code> do agent tài liệu chạy.",
      "Description của hai tool giống nhau từng chữ: “summarizes a source and returns key points” (tóm tắt một nguồn và trả về các ý chính). Tên cũng chỉ khác nhau một danh từ chung chung.",
      "Kết quả: yêu cầu tóm tắt whitepaper do người dùng tải lên hay bị chuyển nhầm sang <code>summarize_source</code>."
    ],
    asks: [
      "Hai thay đổi nào sửa việc chuyển nhầm thẳng nhất?",
      "Tức là: cho coordinator một dấu hiệu để phân biệt hai tool ngay lúc nó đọc định nghĩa tool.",
      "Soi từng phương án: nó sửa chính định nghĩa tool (tên, description), hay dựng thêm thứ khác đắp lên trên?"
    ],
    facts: [
      "Claude chọn tool bằng <code>name</code>, <code>description</code>, <code>input_schema</code>. Hai tool mô tả giống nhau là description chồng lấn (overlap): model không có gì để phân biệt, nên đoán.",
      "Cách guide sửa chồng lấn: đổi tên cho đúng chức năng, rồi viết lại description nói rõ mỗi tool nhận loại input nào, khi nào dùng nó thay vì tool kia.",
      "Docs Define tools: description nên nói cả khi nào dùng và khi nào không dùng. Tên tool nên mang tên dịch vụ hay nguồn (vd <code>github_list_prs</code>) để việc chọn không mơ hồ.",
      "Thứ tự sửa chọn nhầm tool trong bài 2.1: description trước, rồi ví dụ, rồi tách hay gộp tool, lớp định tuyến (routing layer) là bước cuối."
    ],
    opts: [
      { k: "A", gist: "Put few-shot routing examples in the coordinator prompt that show uploaded files going to the document agent.",
        why: [
          "Chữa ngọn: hai định nghĩa tool vẫn y hệt nhau (ý 1). Ví dụ mẫu chỉ nắn xác suất.",
          "Ví dụ nằm trong prompt nên tốn token ở mọi request, và bài 2.1 xếp nó sau bước sửa description (ý 4).",
          "Dễ bị cuốn vì few-shot là kỹ thuật thật và có giúp. Nhưng đề hỏi “most directly” (thẳng nhất), mà gốc lỗi nằm ở tên và description."
        ] },
      { k: "B", gist: "Insert a pre-routing classifier that inspects each request for file references before the coordinator delegates.",
        why: [
          "Làm quá: dựng thêm một thành phần để bù cho lỗi của định nghĩa tool, thay vì sửa định nghĩa (ý 4).",
          "Classifier lại thành một thứ phải bảo trì, phải chỉnh, và gãy khi người dùng diễn đạt khác những gì nó dò."
        ] },
      { k: "C", gist: "Rename the web search agent's tool to <code>summarize_web_page</code> so its name no longer mirrors the document tool.",
        why: [
          "Đổi tên cho đúng nguồn là cách guide sửa chồng lấn (ý 2). Tên mới nói ngay tool này dành cho trang web.",
          "Coordinator có thêm một dấu hiệu đọc được ngay trong định nghĩa tool: whitepaper tải lên không phải trang web (ý 3)."
        ] },
      { k: "D", gist: "Rewrite both descriptions to say when each one applies, for example pages fetched from a URL versus files the user uploaded.",
        why: [
          "Sửa đúng thứ model đọc để chọn (ý 1). Mỗi description nói rõ khi nào dùng, khi nào không: một bên cho trang lấy từ URL, một bên cho file người dùng tải lên (ý 3).",
          "Yêu cầu tóm tắt whitepaper tải lên giờ khớp rõ với <code>summarize_document</code>, hết đoán."
        ] }
    ],
    refs: [
      { label: "Bài 2.1, mục “Hai bẫy nữa trong cùng chủ đề”: description chồng lấn thì đổi tên và viết lại", href: NOTES + "#l-2-1" },
      { label: "Docs Define tools, mục Best practices: description nói khi nào dùng và không dùng; tên tool mang tên dịch vụ hay nguồn", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools" }
    ]
  },
  {
    de: 6, n: 45, total: 60, sub: "5.4", subName: "Quản lý context khi khám phá codebase lớn", scen: "S3",
    answer: "D",
    ask: "Research runs last several hours. When the coordinator process crashes partway, the restarted run repeats web searches that had already completed and discards partial document analysis. Which design lets the coordinator continue from where the run stopped?",
    scene: [
      "Mỗi lượt research chạy vài giờ.",
      "Process của coordinator crash giữa chừng. Chạy lại thì các lượt search web đã xong bị làm lại, phần phân tích tài liệu đang dở bị bỏ.",
      "Chỗ khó: thứ mất khi crash là tiến độ của cả pipeline (pha nào xong, mỗi agent tìm được gì), không chỉ là lịch sử chat của coordinator."
    ],
    asks: [
      "Thiết kế nào cho coordinator chạy tiếp đúng chỗ đã dừng?",
      "Tức là: tiến độ của từng agent phải nằm ở chỗ sống qua được crash, và coordinator phải đưa được nó vào prompt của các agent chạy tiếp.",
      "Soi từng phương án: sau crash còn lại gì trên đĩa, và subagent chạy tiếp có nhận được kết quả cũ không?"
    ],
    facts: [
      "Sau crash, mọi thứ trong bộ nhớ mất hết. Chỉ còn thứ đã ghi ra đĩa có chủ đích.",
      "Guide gọi cách chữa là structured state persistence (lưu trạng thái có cấu trúc): mỗi agent export state ra vị trí biết trước, coordinator giữ một manifest. Manifest là file (thường là JSON) ghi pha nào xong, pha nào còn, file state của từng agent nằm đâu. Chạy lại thì coordinator đọc manifest và đưa kết quả vào prompt từng agent.",
      "Session của Agent SDK lưu hội thoại của một agent, không lưu tiến độ của pipeline. Subagent không thừa hưởng hội thoại của coordinator, thứ nó nhận chỉ là chuỗi prompt lúc được gọi.",
      "Docs Sessions (mục chạy tiếp trên máy khác) cũng khuyên: lưu kết quả cần dùng (phân tích, quyết định) thành state của ứng dụng rồi đưa vào prompt một phiên mới, thường bền hơn trông vào resume."
    ],
    opts: [
      { k: "A", gist: "Wrap the whole pipeline in automatic retry with backoff, so a crashed run restarts itself from the beginning without an operator.",
        why: [
          "Sai ở chỗ chữa nhầm loại lỗi: retry kèm backoff (chờ tăng dần rồi thử lại) dành cho lỗi tạm thời của một tool, ví dụ search bị timeout.",
          "Ở đây cả process chết. Chạy lại từ đầu chỉ tự động hóa đúng chuyện đề kể: search đã xong lại chạy lại, phân tích dở lại bị bỏ (ý 1)."
        ] },
      { k: "B", gist: "On restart, resume the coordinator's saved session so every subagent automatically continues from the last tool result it recorded.",
        why: [
          "Sai ở giả định: session của coordinator là hội thoại của coordinator, không phải tiến độ của pipeline (ý 3).",
          "Subagent không nằm trong hội thoại đó và không thừa hưởng nó. Resume coordinator không khôi phục phần phân tích dở của agent tài liệu, cũng không tự đưa kết quả search sang pha sau.",
          "Dễ bị cuốn vì SDK đúng là lưu session xuống đĩa và resume được. Nhưng “every subagent automatically continues” (mọi subagent tự chạy tiếp) là chuyện không có. Muốn resume một subagent phải tự làm: resume đúng session, ghi agent ID vào prompt, khai lại đúng định nghĩa agent đó."
        ] },
      { k: "C", gist: "Give each subagent a larger context budget so a single long pass can finish the whole pipeline before any crash interrupts it.",
        why: [
          "Sai ở chỗ nhầm hai chuyện: context lớn quyết định một hội thoại chứa được bao nhiêu, không quyết định thứ gì sống sót khi process chết.",
          "Mọi tiến độ vẫn nằm trong bộ nhớ. Crash lúc nào là mất sạch lúc đó (ý 1)."
        ] },
      { k: "D", gist: "Export each subagent's structured state to a known location, and load it as a manifest the coordinator feeds into later subagent prompts.",
        why: [
          "Đúng structured state persistence của guide (ý 2). State của từng agent (ví dụ: pha nào xong, tìm được gì, nguồn ở đâu, chỗ nào còn thiếu) nằm trên đĩa, sống qua crash (ý 1).",
          "Chạy lại, coordinator đọc manifest, thấy search đã xong, phân tích đang dở. Nó bỏ qua pha đã xong và đưa kết quả search vào prompt của agent chạy tiếp (ý 3), không ai phải làm lại từ đầu."
        ] }
    ],
    refs: [
      { label: "Bài 5.4, mục “Bốn công cụ, mỗi cái một việc” (đoạn crash, ví dụ manifest.json) và “Khi đi thi” dạng 2", href: NOTES + "#l-5-4" },
      { label: "Docs “Work with sessions”, mục Resume across hosts: lưu kết quả thành state của ứng dụng, đưa vào prompt phiên mới", href: "https://code.claude.com/docs/en/agent-sdk/sessions" }
    ]
  },
  {
    de: 6, n: 46, total: 60, sub: "1.2", subName: "Điều phối coordinator–subagent", scen: "S3",
    answer: "B",
    ask: "For broad topics such as “autonomous vehicle regulation”, the system's reports consistently cover only United States federal rules. Coordinator logs show it created three subtasks, all within that one area. Which change fixes this coverage gap most directly?",
    scene: [
      "Hệ research nhận đề tài rộng như “autonomous vehicle regulation” (luật về xe tự lái).",
      "Báo cáo lần nào cũng chỉ nói luật liên bang Mỹ. Các vùng, các nước khác không có.",
      "Log của coordinator: nó chia đề tài thành ba việc con, cả ba đều nằm trong luật liên bang Mỹ.",
      "Chỗ khó: mọi subagent đều làm đúng việc được giao. Không agent nào “hỏng”, nên dễ đi sửa nhầm chỗ."
    ],
    asks: [
      "Thay đổi nào sửa thẳng nhất lỗ hổng độ phủ này?",
      "Tức là: tìm đúng chỗ phạm vi bị thu hẹp, rồi sửa ở đó.",
      "Soi từng phương án: nó sửa ở bước chia việc, hay ở một agent làm sau, vốn chỉ nhận được những gì đã chia?"
    ],
    facts: [
      "Hệ hub-and-spoke (trục và nan hoa): coordinator chia việc, giao việc, gom kết quả. Subagent chỉ biết đúng việc con coordinator viết vào lời giao việc.",
      "Narrow decomposition (chia việc quá hẹp): các việc con gộp lại không phủ hết câu hỏi. Lỗi nằm ở người giao việc, không ở người làm.",
      "Cách guide sửa: chia phạm vi (partition scope) để các mảng gộp lại phủ đủ câu hỏi và không chồng nhau. Thêm vòng tinh chỉnh (iterative refinement): coordinator thấy mảng nào mỏng thì giao tìm thêm."
    ],
    opts: [
      { k: "A", gist: "Tell the synthesis subagent to write extra sections for any regions missing from the gathered findings.",
        why: [
          "Sai chỗ: synthesis chỉ làm trên những gì coordinator đưa sang. Không agent nào tìm về các vùng khác, nên không có phát hiện nào để tổng hợp (ý 1).",
          "Bắt nó viết thêm thì nó chỉ còn kiến thức chung để viết: nội dung không có nguồn, không qua research, đi ngược mục đích của hệ.",
          "Dễ bị cuốn vì báo cáo thiếu thì sửa chỗ viết báo cáo nghe hợp lý. Nhưng bài 1.2 ghi đúng chuyện này vào cột “Tệ”: báo cáo thiếu mảng mà đi sửa synthesis agent."
        ] },
      { k: "B", gist: "Revise the coordinator prompt so it maps the topic's full scope into distinct subtasks before delegating.",
        why: [
          "Sửa đúng chỗ lỗi sinh ra: bước chia việc của coordinator (ý 2).",
          "Coordinator vạch hết phạm vi trước (ví dụ: liên bang Mỹ, cấp bang, EU, châu Á), rồi chia thành các việc con riêng, gộp lại phủ đủ câu hỏi (ý 3). Mảng nào cũng có agent tìm, nên báo cáo có đủ.",
          "Log là manh mối: agent làm sau đều đúng việc, chỉ phạm vi bị thiếu. Vậy lỗi nằm ở chỗ chia."
        ] },
      { k: "C", gist: "Raise the web search subagent's result limit so each assigned query returns more sources.",
        why: [
          "Sai chỗ: search agent làm đúng việc được giao. Thêm kết quả cho mỗi query chỉ đào sâu hơn ba việc con đều về luật liên bang Mỹ.",
          "Không query nào hỏi về vùng khác, nên thêm bao nhiêu nguồn cũng vẫn thiếu đúng những vùng đó (ý 1)."
        ] },
      { k: "D", gist: "Move the synthesis subagent to a model with a larger context window so it can retain every finding.",
        why: [
          "Sai chẩn đoán: synthesis không làm rơi phát hiện nào. Phát hiện về vùng khác chưa từng được tạo ra.",
          "Context lớn hơn chữa chuyện mất thông tin lúc gom, một kiểu lỗi khác hẳn chia việc quá hẹp (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, mục “Lỗi trong tình huống nằm ở đâu”: narrow decomposition, chia phạm vi và tinh chỉnh nhiều vòng", href: NOTES + "#l-1-2" }
    ]
  },
  {
    de: 6, n: 47, total: 60, sub: "5.1", subName: "Giữ thông tin quan trọng trong hội thoại dài", scen: "S6",
    answer: "BC",
    ask: "Within one session, the extraction agent calls a vendor lookup tool for every invoice. Each call returns more than 40 fields, while extraction needs only three. Accuracy has dropped by the twelfth invoice. Which two changes address this? (Choose two.)",
    scene: [
      "Agent trích xuất gọi tool tra nhà cung cấp (vendor lookup) cho từng hóa đơn trong cùng một phiên.",
      "Mỗi lần gọi trả về hơn 40 trường. Việc trích xuất chỉ cần 3.",
      "Tới hóa đơn thứ 12 thì độ chính xác tụt.",
      "Chỗ khó: kết quả tool đã nối vào hội thoại thì nằm luôn ở đó, request sau nào cũng gửi lại. 12 hóa đơn là 12 bản ghi hơn 40 trường chồng lên nhau trong context."
    ],
    asks: [
      "Hai thay đổi nào xử lý được chuyện này?",
      "Tức là: bớt được lượng dữ liệu thừa thật sự nằm trong context, không phải chỉ bớt tiền hay dặn model bỏ qua.",
      "Soi từng phương án: làm xong thì số token thừa trong context có giảm không?"
    ],
    facts: [
      "API không có trạng thái: mỗi request mang theo cả hội thoại, kể cả mọi <code>tool_result</code> đã nối vào. Docs Manage tool context: định nghĩa tool và <code>tool_result</code> tích lũy đều chiếm context window.",
      "Trim tool output: cắt kết quả tool chỉ còn các trường cần, bằng code hoặc hook (vd <code>PostToolUse</code>), trước khi nối vào <code>messages</code>. Docs Define tools: tool chỉ nên trả thông tin “high-signal” (có giá trị cao), response phình to làm phí context.",
      "Context editing phía server, chiến lược <code>clear_tool_uses_20250919</code>: prompt vượt ngưỡng đã đặt thì API xóa các tool result cũ nhất, thay bằng placeholder (chỗ giữ chỗ), giữ lại vài kết quả gần nhất. Client vẫn giữ đủ lịch sử.",
      "Prompt caching (<code>cache_control</code>) không làm giảm số token trong context. Nó chỉ giảm tiền trả cho các token lặp lại."
    ],
    opts: [
      { k: "A", gist: "Add a system prompt instruction telling the model to ignore any vendor fields that do not matter for extraction.",
        why: [
          "Sai ở chỗ dặn chứ không bớt: hơn 40 trường vẫn nằm trong context ở mọi lượt (ý 1), vẫn chiếm token và vẫn tranh sự chú ý của model.",
          "Độ chính xác tụt vì thứ đang nằm trong context, không phải vì model không biết trường nào quan trọng."
        ] },
      { k: "B", gist: "Trim the vendor lookup response to only the fields the extraction step uses before it enters the context.",
        why: [
          "Đúng trim tool output (ý 2): code hoặc hook lọc mỗi bản ghi còn 3 trường cần, trước khi nối vào hội thoại.",
          "Chặn phần thừa từ gốc: 12 hóa đơn là 12 × 3 trường thay vì 12 × hơn 40."
        ] },
      { k: "C", gist: "Turn on server-side context editing so older tool results are cleared once a configured token threshold is exceeded.",
        why: [
          "Context editing xóa các tool result cũ khi prompt vượt ngưỡng, thay bằng placeholder (ý 3). Bản ghi của các hóa đơn đã xong thôi chiếm chỗ.",
          "Kết quả gần nhất vẫn được giữ, nên hóa đơn đang làm không mất dữ liệu.",
          "Hai cách bổ sung nhau: trim bớt thứ đi vào, context editing giới hạn thứ ở lại."
        ] },
      { k: "D", gist: "Mark the vendor lookup results with <code>cache_control</code> so the repeated fields stop counting against the context window.",
        why: [
          "Bịa tác dụng: cache không làm giảm số token trong context (ý 4). Nội dung đã cache vẫn chiếm đủ chỗ trong context window.",
          "Bản ghi vẫn chồng lên nhau, độ chính xác vẫn tụt y như cũ, chỉ là rẻ hơn.",
          "Dễ bị cuốn vì caching đúng là công cụ cho token lặp lại. Nhưng nó xử lý tiền, không xử lý chỗ."
        ] }
    ],
    refs: [
      { label: "Bài 5.1, mục “Bộ kỹ thuật đi kèm” (trim tool output) và “Biết thêm” (cache không làm nhỏ context, context editing clear_tool_uses_20250919)", href: NOTES + "#l-5-1" },
      { label: "Docs “Manage tool context”: prompt caching không giảm token trong context, context editing xóa tool_result cũ", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/manage-tool-context" },
      { label: "Docs “Context editing”: ngưỡng trigger, keep, placeholder", href: "https://platform.claude.com/docs/en/build-with-claude/context-editing" }
    ]
  },
  {
    de: 6, n: 48, total: 60, sub: "4.6", subName: "Review độc lập và review nhiều lượt", scen: "S6",
    answer: "C",
    ask: "Here the extraction call also rates its own confidence for each field. Fields later found to be wrong receive confidence above 0.9 as often as correct ones, so almost nothing gets routed to reviewers. What change makes the confidence signal usable for routing?",
    scene: [
      "Lần gọi trích xuất tự chấm confidence (độ tự tin) cho từng trường nó trích ra.",
      "Trường về sau hóa ra sai cũng được chấm trên 0.9, thường y như trường đúng.",
      "Vì vậy gần như không trường nào được chuyển sang người review.",
      "Chỗ khó: con số không phân biệt được đúng với sai. Vấn đề nằm ở người chấm, không ở ngưỡng."
    ],
    asks: [
      "Thay đổi nào làm cho confidence dùng được để route (chuyển cho người xem)?",
      "Tức là: tạo ra một điểm số khác nhau giữa trường đúng và trường sai.",
      "Soi từng phương án: điểm vẫn do chính lần sinh ra giá trị tự chấm, hay do một bên độc lập chấm dựa trên bằng chứng?"
    ],
    facts: [
      "Self-review: chính lần vừa sinh ra kết quả tự kiểm lại. Nó vẫn giữ lý do lúc làm, nên hay bênh quyết định của mình.",
      "Instance độc lập: một lần gọi mới, context sạch, không thấy reasoning lúc sinh. Guide: nó bắt lỗi tinh vi tốt hơn self-review.",
      "Confidence tự báo của LLM hiệu chuẩn kém: hay tự tin cả ở chỗ sai. Muốn chốt ngưỡng route thì phải so confidence với bộ dữ liệu có đáp án (labeled validation set, bài 5.5).",
      "Docs Reduce hallucinations: sau khi có kết quả, bắt Claude tìm câu trích nguyên văn trong tài liệu ủng hộ từng khẳng định. Không tìm được thì rút khẳng định đó lại."
    ],
    opts: [
      { k: "A", gist: "Have the extraction call critique its own draft and revise each confidence value before returning the result.",
        why: [
          "Vẫn là self-review trong cùng một lần gọi (ý 1). Lý do đã dẫn tới giá trị sai vẫn còn đó, nên nó dễ xác nhận lại chứ không lật lại.",
          "Confidence sau khi “tự phê bình” vẫn là con số tự chấm, lệch như cũ (ý 3).",
          "Dễ bị cuốn vì nghe như thêm một lớp kiểm tra. Nhưng người kiểm vẫn là người làm."
        ] },
      { k: "B", gist: "Run the extraction three times and average the three confidence values reported for each field.",
        why: [
          "Lấy trung bình giảm nhiễu giữa các lần chạy, nhưng không sửa được độ lệch có hệ thống: lần nào cũng chấm cao cho trường sai (ý 3).",
          "Ba con số chưa hiệu chuẩn cộng lại chia ba vẫn chưa hiệu chuẩn, mà tốn gấp ba.",
          "Đừng nhầm với Best-of-N trong docs Reduce hallucinations: cách đó so giá trị trích ra giữa các lần chạy, chỗ lệch nhau là dấu hiệu bịa. B chỉ lấy trung bình con số tự chấm."
        ] },
      { k: "C", gist: "Run a separate verification pass in a fresh instance that checks each field against the source and assigns the confidence.",
        why: [
          "Bên chấm là instance độc lập, không mang reasoning của lần trích (ý 2), nên không có quyết định nào để bênh.",
          "Với mỗi trường, nó phải tìm được chỗ trong tài liệu gốc ủng hộ giá trị (ý 4). Có bằng chứng thì điểm cao, không có thì điểm thấp. Điểm vì vậy khác nhau giữa trường đúng và trường sai, đúng thứ bước route cần.",
          "Điểm này vẫn nên đối chiếu với bộ dữ liệu có đáp án trước khi chốt ngưỡng (ý 3)."
        ] },
      { k: "D", gist: "Lower the routing threshold so that any field under 0.95 confidence is sent to a human reviewer.",
        why: [
          "Sai chỗ: dời ngưỡng không làm con số có thêm thông tin. Trường đúng và trường sai cùng nằm trên 0.9, ngưỡng nào cũng không tách được chúng.",
          "Kết quả chỉ là người review thấy nhiều hay ít hơn, không phải thấy đúng chỗ cần xem."
        ] }
    ],
    refs: [
      { label: "Bài 4.6: self-review với instance độc lập; confidence ở lượt kiểm chứng để route cho người", href: NOTES + "#l-4-6" },
      { label: "Bài 5.5, mục “Chuyện gì đang xảy ra”: confidence tự báo chưa hiệu chuẩn, phải so với labeled validation set", href: NOTES + "#l-5-5" },
      { label: "Docs “Reduce hallucinations”, mục Verify with citations và Best-of-N verification", href: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations" }
    ]
  },
  {
    de: 6, n: 49, total: 60, sub: "2.3", subName: "Chia tool cho agent và tool_choice", scen: "S6",
    answer: "D",
    ask: "The team sets <code>tool_choice</code> to force <code>extract_metadata</code> on the first request, then sends back its <code>tool_result</code>. Every follow-up response calls <code>extract_metadata</code> again, and the enrichment tools never run. The request configuration is identical on every turn. What change fixes this while keeping extraction guaranteed to run first?",
    scene: [
      "Team đặt <code>tool_choice</code> ép gọi <code>extract_metadata</code> ở request đầu, rồi gửi lại <code>tool_result</code> của nó.",
      "Từ đó, response nào cũng gọi lại <code>extract_metadata</code>. Các tool enrichment (làm giàu dữ liệu) không bao giờ chạy.",
      "Manh mối: cấu hình request “identical on every turn” (giống hệt nhau ở mọi lượt), tức request nào cũng còn ép <code>extract_metadata</code>.",
      "Chỗ khó: phải gỡ vòng lặp mà vẫn giữ được bảo đảm trích metadata chạy trước."
    ],
    asks: [
      "Đổi gì để hết vòng lặp mà extraction vẫn chắc chắn chạy trước?",
      "Tức là: giữ ép tool ở request đầu, nới <code>tool_choice</code> ở các request sau.",
      "Soi từng phương án theo hai điều: lượt sau có gọi được enrichment không, lượt đầu còn bảo đảm <code>extract_metadata</code> không?"
    ],
    facts: [
      "<code>tool_choice</code> là tham số của từng request, không phải của cả hội thoại. Request nào mang <code>{\"type\": \"tool\", \"name\": \"extract_metadata\"}</code> thì response đó bắt buộc gọi <code>extract_metadata</code>.",
      "Khi ép tool (<code>any</code> hoặc <code>tool</code>), API prefill (điền sẵn) lượt assistant để buộc có tool call. Lời dặn trong prompt không đè được ràng buộc này.",
      "<code>auto</code>: Claude tự chọn gọi tool nào, hoặc trả text. <code>any</code>: bắt buộc gọi một tool, Claude chọn tool nào.",
      "Guide dùng chính ví dụ này: ép <code>extract_metadata</code> ở lượt đầu, các bước enrichment xử lý ở lượt sau."
    ],
    opts: [
      { k: "A", gist: "Add a system prompt instruction telling Claude to move on to enrichment once metadata exists.",
        why: [
          "Sai ở thứ bậc: ép tool là ràng buộc ở tầng API, prompt không đè được (ý 2). Request còn ép <code>extract_metadata</code> thì Claude vẫn phải gọi nó.",
          "Dễ bị cuốn vì nghe đúng ý: nói cho model biết bước tiếp theo. Nhưng model không có quyền làm khác cấu hình request."
        ] },
      { k: "B", gist: "Retry the follow-up request with error feedback whenever no enrichment tool gets called.",
        why: [
          "Sai chẩn đoán: model không mắc lỗi. Nó làm đúng điều cấu hình bắt (ý 1).",
          "Gửi lại cùng cấu hình thì lần nào cũng ra cùng kết quả. Retry kèm lỗi dành cho lỗi trích xuất, lỗi định dạng (bài 4.4), không gỡ được ràng buộc <code>tool_choice</code>."
        ] },
      { k: "C", gist: "Switch every request, including the first, to <code>tool_choice</code> <code>any</code> instead.",
        why: [
          "Lượt sau thì ổn: <code>any</code> cho Claude chọn tool enrichment (ý 3).",
          "Nhưng lượt đầu mất bảo đảm: với <code>any</code>, Claude có thể gọi một tool enrichment trước khi có metadata. Trái đúng điều đề giữ: “keeping extraction guaranteed first” (vẫn bảo đảm extraction chạy trước)."
        ] },
      { k: "D", gist: "Set <code>tool_choice</code> back to <code>auto</code> on the follow-up requests that carry the extraction result.",
        why: [
          "Request đầu vẫn ép <code>extract_metadata</code>, nên bảo đảm chạy trước còn nguyên (ý 1, ý 4).",
          "Các request sau đổi sang <code>auto</code>: hết bị ép, Claude chọn được tool enrichment hoặc trả lời cuối (ý 3). Vòng lặp hết.",
          "Lượt sau dùng <code>any</code> cũng được nếu lượt nào cũng phải có tool call. Mấu chốt là chỉ ép ở request cần bảo đảm thứ tự."
        ] }
    ],
    refs: [
      { label: "Bài 2.3: bảng tool_choice, dòng extract_metadata chạy trước enrichment", href: NOTES + "#l-2-3" },
      { label: "Bài 4.3, mục “Biết thêm”: ép tool thì API prefill lượt assistant", href: NOTES + "#l-4-3" },
      { label: "Docs Define tools, mục Forcing tool use", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools" }
    ]
  },
  {
    de: 6, n: 50, total: 60, sub: "4.4", subName: "Validate, retry kèm lỗi và vòng phản hồi", scen: "S6",
    answer: "A",
    ask: "After the team moved invoice extraction to a tool with an <code>input_schema</code>, parse failures went away. Finance still finds totals that do not match the line items, and vendor names placed in the customer field. What should the team add?",
    scene: [
      "Team chuyển việc trích hóa đơn sang một tool có <code>input_schema</code>. Lỗi parse (JSON không đọc được) hết hẳn.",
      "Nhưng phòng tài chính vẫn thấy hai loại lỗi: tổng tiền không khớp các dòng hàng, và tên nhà cung cấp nằm ở trường khách hàng.",
      "Chỗ khó: JSON giờ đúng hình dạng, nên dễ nghĩ phải siết schema thêm. Nhưng hai lỗi này nằm ở nội dung, không ở hình dạng."
    ],
    asks: [
      "Team nên thêm gì?",
      "Tức là: một bước bắt được lỗi ngữ nghĩa (thứ schema không thấy) và sửa được nó.",
      "Soi từng phương án: nó kiểm hình dạng hay kiểm nội dung, và kiểm bằng code hay chỉ dặn model?"
    ],
    facts: [
      "Tool + <code>input_schema</code> (thêm <code>strict: true</code> càng chắc) bảo đảm cú pháp: JSON đọc được, đúng kiểu, đủ trường bắt buộc. Nó không bảo đảm ngữ nghĩa: tổng có bằng các dòng cộng lại không, giá trị có nằm đúng trường không.",
      "Lỗi ngữ nghĩa bắt bằng validator: code của app chạy ngay sau khi nhận JSON, kiểm theo luật nghiệp vụ (tổng khớp dòng hàng, trường chứa đúng loại thông tin).",
      "Retry-with-error-feedback (gọi lại kèm lỗi): request sau gửi kèm hóa đơn gốc, JSON vừa trả và câu lỗi cụ thể. Cách này sửa được lỗi đọc nhầm, đặt nhầm trường. Thông tin vắng trong tài liệu nguồn thì retry vô ích: để null hoặc chuyển người.",
      "Trường required mà tài liệu không có thông tin thì model dễ bịa cho đủ."
    ],
    opts: [
      { k: "A", gist: "Validate each extraction in code against business rules such as totals reconciling with line items, then retry with the specific error.",
        why: [
          "Đúng cặp validator + retry kèm lỗi (ý 2, ý 3). Code cộng các dòng hàng rồi so với tổng, kiểm trường khách hàng có đúng là khách không. Sai thì gọi lại kèm hóa đơn gốc và câu lỗi cụ thể.",
          "Hai lỗi của đề là đọc nhầm, đặt nhầm khi thông tin có trong hóa đơn, nên gọi lại kèm lỗi sửa được. Hóa đơn tự nó mâu thuẫn hay thiếu thông tin thì gắn cờ, đưa người xem."
        ] },
      { k: "B", gist: "Mark every field in the input schema as required so the model cannot leave the total unresolved.",
        why: [
          "Sai chẩn đoán: tổng đã có mặt, chỉ là không khớp các dòng. Required chữa chuyện thiếu trường, mà ở đây không thiếu trường nào.",
          "Còn tệ hơn: hóa đơn nào thật sự không có thông tin thì model bị đẩy tới chỗ bịa cho đủ (ý 4)."
        ] },
      { k: "C", gist: "Set <code>strict: true</code> on the extraction tool definition so the input schema is enforced during sampling.",
        why: [
          "Chạy được, nhưng chỉ siết thêm thứ đã ổn: hình dạng (ý 1). JSON đã đúng hình dạng từ trước.",
          "Tổng sai mà vẫn là số, tên nhà cung cấp mà vẫn là chuỗi, nên strict vẫn cho qua.",
          "Dễ bị cuốn vì <code>strict: true</code> là bảo đảm mạnh nhất của schema. Nhưng nó bảo đảm hình dạng, không bảo đảm đúng sai."
        ] },
      { k: "D", gist: "Add a system prompt instruction telling the model to re-check its arithmetic and field placement before calling the tool.",
        why: [
          "Có thể làm lỗi ít đi, nhưng không kiểm được gì. Model vẫn có thể trả một tool call đúng hình dạng với tổng không khớp.",
          "Dữ liệu tài chính cần một bước kiểm chắc chắn bằng code (ý 2), không phải lời dặn theo xác suất."
        ] }
    ],
    refs: [
      { label: "Bài 4.4: validator bắt lỗi ngữ nghĩa, gọi lại kèm hóa đơn gốc, JSON cũ và câu lỗi; khi nào gọi lại vô ích", href: NOTES + "#l-4-4" },
      { label: "Bài 4.3, mục “Chuyện gì đang xảy ra”: schema chỉ bắt cú pháp, không bắt ngữ nghĩa", href: NOTES + "#l-4-3" }
    ]
  },
  {
    de: 6, n: 51, total: 60, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema", scen: "S6",
    answer: "B",
    ask: "A contract extraction tool has <code>\"strict\": true</code>, and its <code>input_schema</code> declares every field as a required string. For contracts with no termination clause, the <code>tool_use</code> input still carries a believable termination date that never appears in the document. Which change best prevents this?",
    scene: [
      "Tool trích xuất hợp đồng bật <code>strict: true</code>. <code>input_schema</code> khai mọi trường là chuỗi required (bắt buộc có).",
      "Hợp đồng không có điều khoản chấm dứt (termination clause) thì <code>tool_use.input</code> vẫn có một ngày chấm dứt nghe hợp lý, mà tài liệu không hề ghi.",
      "Chỗ khó: strict bảo đảm output khớp schema, mà schema lại đòi hợp đồng nào cũng có ngày chấm dứt. Ví dụ minh họa:<pre><code>schema:    termination_date: { type: \"string\" }   // required\nhợp đồng:  không có điều khoản chấm dứt\noutput:    { \"termination_date\": \"2027-06-30\" }   // bịa</code></pre>"
    ],
    asks: [
      "Thay đổi nào chặn được ngày bịa này tốt nhất?",
      "Tức là: cho model một cách hợp lệ để nói “tài liệu không có”, thay vì buộc nó phải điền.",
      "Soi từng phương án: nó gỡ áp lực phải điền ngay trong schema, hay chỉ dặn thêm, gọi lại, chấm điểm sau khi đã bịa?"
    ],
    facts: [
      "Trường required mà tài liệu không có thông tin thì model bịa cho đủ. Guide: trường có thể vắng thì để optional hoặc nullable. Nullable là trường có mặt nhưng được mang <code>null</code>, viết <code>type: [\"string\", \"null\"]</code>.",
      "<code>strict: true</code> ép tham số Claude điền phải khớp schema tuyệt đối: đủ trường required, đúng kiểu. Schema đòi chuỗi thì chỉ chuỗi mới hợp lệ.",
      "Lời dặn trong prompt chỉ là xác suất. Schema đang bắt điền thì lời dặn thua.",
      "Retry kèm lỗi sửa được lỗi định dạng và lỗi trích xuất. Thông tin vắng ở tài liệu nguồn thì gọi lại bao nhiêu lần cũng không moi ra được."
    ],
    opts: [
      { k: "A", gist: "Add a validation-retry loop that returns the suspicious date to the model with an error message asking it to check again.",
        why: [
          "Sai ở giả định: retry chỉ có ích khi thông tin có trong tài liệu mà model viết sai (ý 4). Hợp đồng không có điều khoản chấm dứt, đọc lại bao nhiêu lần cũng không ra ngày nào.",
          "Schema vẫn bắt điền chuỗi (ý 2), nên mỗi lượt gọi lại ra một ngày bịa khác. Tốn thêm lượt mà gốc vẫn nguyên."
        ] },
      { k: "B", gist: "Make the termination date field nullable, so the model can legitimately return null when the clause is missing.",
        why: [
          "Sửa đúng gốc: schema đang nói hợp đồng nào cũng có ngày chấm dứt. Cho trường nhận <code>null</code> (<code>type: [\"string\", \"null\"]</code>) là cho model một câu trả lời trung thực mà vẫn hợp lệ (ý 1).",
          "Strict vẫn bật, output vẫn khớp schema (ý 2). Chỉ là giờ <code>null</code> cũng khớp, nên model không bị dồn vào thế phải bịa.",
          "Code phía sau gặp <code>null</code> thì xử lý rõ ràng, thay vì nhận một ngày nghe hợp lý mà sai."
        ] },
      { k: "C", gist: "Add a required confidence score next to the date so downstream systems can drop values the model rates as low confidence.",
        why: [
          "Ngày bịa vẫn được sinh ra. Phương án này chỉ nhờ model tự chấm cái nó vừa bịa, mà confidence tự báo chưa hiệu chuẩn: 0.9 không có nghĩa là đúng 90%.",
          "Còn thêm một trường required nữa: model phải điền điểm cho mọi hợp đồng, áp lực phải điền ngày vẫn y nguyên (ý 1)."
        ] },
      { k: "D", gist: "Add a system prompt instruction telling the model never to invent a date that the document does not explicitly state.",
        why: [
          "Lời dặn và schema kéo hai hướng ngược nhau. Strict ép trường phải là chuỗi ở mọi lần gọi (ý 2), còn lời dặn chỉ là xác suất (ý 3). Model không có cách nào vừa nghe lời vừa hợp lệ.",
          "Dễ bị cuốn vì “never invent” (không bao giờ được bịa) nói đúng điều team muốn. Nhưng thứ ép model bịa nằm ở schema, nên phải sửa ở schema."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, mục “Thiết kế schema để model không bịa” và “Khi đi thi” Dạng 2: trường có thể vắng thì để nullable", href: NOTES + "#l-4-3" },
      { label: "Bài 4.4, mục “Chuyện gì đang xảy ra”: retry vô ích khi thông tin vắng ở nguồn", href: NOTES + "#l-4-4" }
    ]
  },
  {
    de: 6, n: 52, total: 60, sub: "5.5", subName: "Review người và hiệu chuẩn confidence", scen: "S6",
    answer: "C",
    ask: "On the team's labeled validation set, overall extraction accuracy is 97%, and leadership wants to stop sending every extraction to human review. What should the team do before cutting review coverage?",
    scene: [
      "Trên bộ validation có nhãn (labeled validation set: tài liệu đã có đáp án đúng do người gán), độ chính xác trích xuất tổng là 97%.",
      "Lãnh đạo muốn thôi đưa mọi extraction qua người review.",
      "Chỗ khó: 97% là trung bình trên mọi loại tài liệu và mọi trường. Ví dụ minh họa:<pre><code>hóa đơn chuẩn (90% khối lượng):    99% đúng\nhợp đồng scan cũ (10% khối lượng): 80% đúng\ntổng:                              ~97%</code></pre>"
    ],
    asks: [
      "Trước khi bớt review, team phải làm gì?",
      "Tức là: kiểm xem 97% có đúng ở mọi nhóm tài liệu và mọi trường không, hay chỉ đẹp ở mức trung bình.",
      "Soi từng phương án: nó đo độ chính xác thật theo từng phân khúc, hay dựa vào con số tổng, kiểm hình dạng, hoặc điểm model tự chấm?"
    ],
    facts: [
      "Aggregate accuracy (độ chính xác tổng) có thể che một phân khúc làm kém. Guide 5.5: trước khi tự động hóa, phân tích accuracy theo loại tài liệu và theo trường, và chỉ tự động hóa phần đã ổn định ở mọi phân khúc.",
      "Lấy mẫu ngẫu nhiên đơn thuần chọn theo tỉ lệ khối lượng, nên gần như không chạm tới loại tài liệu hiếm. Stratified random sampling (chia theo tầng rồi lấy mẫu trong từng tầng) mới chắc nhóm nhỏ được kiểm.",
      "Schema validation chỉ kiểm cú pháp: JSON hợp lệ, đủ trường, đúng kiểu. Nó không kiểm giá trị có đúng với tài liệu không.",
      "Confidence model tự báo chưa hiệu chuẩn: 0.9 không có nghĩa là đúng 90%. Phải đối chiếu với bộ có nhãn trước khi dùng nó để định tuyến."
    ],
    opts: [
      { k: "A", gist: "Audit a small, uniformly random sample of production extractions, since overall accuracy is already high.",
        why: [
          "Sai ở giả định: coi con số tổng là đáng tin, trong khi chính nó là thứ cần kiểm (ý 1).",
          "Mẫu nhỏ chọn đều theo khối lượng gần như toàn tài liệu phổ biến (ý 2). Loại hiếm sai nhiều có thể không góp mẫu nào, lỗi vẫn lặng lẽ đi qua."
        ] },
      { k: "B", gist: "Turn on strict schema validation so any output that fails the JSON schema is routed to review automatically.",
        why: [
          "Sai thước đo: schema chỉ bảo đảm hình dạng (ý 3). Bản ghi đúng schema vẫn có thể sai số tiền, sai ngày.",
          "Đẩy output hỏng schema sang người là việc nên làm, nhưng nó không cho biết phân khúc nào đủ chính xác để bớt review."
        ] },
      { k: "C", gist: "Break the validation results down by document type and by field to confirm accuracy holds in every segment.",
        why: [
          "Đúng bước guide đòi trước khi tự động hóa (ý 1): tách 97% thành bảng loại tài liệu × trường, xem chỗ nào ổn định thật, chỗ nào kém.",
          "Đo trên bộ có nhãn sẵn có, nên là độ chính xác thật chứ không phải điểm tự chấm.",
          "Phân khúc nào tự qua ngưỡng mới bớt review. Phần đã tự động hóa thì sau đó vẫn lấy mẫu phân tầng định kỳ để bắt kiểu lỗi mới (ý 2)."
        ] },
      { k: "D", gist: "Have the model rate its own confidence for each document and skip review whenever it reports high confidence.",
        why: [
          "Sai thước đo: confidence tự báo chưa hiệu chuẩn (ý 4). Model sai ở loại tài liệu khó thường vẫn tự tin hoàn toàn.",
          "Bỏ qua luôn bước đo theo phân khúc (ý 1). Điểm confidence chỉ dùng được sau khi đã hiệu chuẩn bằng bộ có nhãn và đã biết phân khúc nào ổn.",
          "Dễ bị cuốn vì trông giống cách “route theo confidence” của bài 5.5. Nhưng ở đây điểm chưa hiệu chuẩn, lại tính cho cả tài liệu chứ không cho từng trường."
        ] }
    ],
    refs: [
      { label: "Bài 5.5, mục “Chuyện gì đang xảy ra”: 97% tổng che phân khúc kém, phân tích theo loại tài liệu × trường trước khi tự động hóa", href: NOTES + "#l-5-5" },
      { label: "Cheatsheet D5: dòng “97% accuracy tổng, muốn bỏ review cho high-confidence”", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 6, n: 53, total: 60, sub: "1.6", subName: "Chia việc lớn", scen: "S6",
    answer: "A",
    ask: "The system extracts a whole twelve-document loan packet in a single call. Some documents yield detailed fields while others yield almost none, and the applicant's income comes back with conflicting values across documents. How should the extraction be restructured?",
    scene: [
      "Hệ thống trích cả bộ hồ sơ vay 12 tài liệu trong một lần gọi.",
      "Có tài liệu trích ra rất chi tiết, có tài liệu gần như trống. Thu nhập của người vay ra các giá trị mâu thuẫn nhau giữa các tài liệu.",
      "Chỗ khó: lần gọi vẫn chạy xong, tức cả bộ vừa context. Vấn đề không phải chỗ chứa, mà là một lượt phải ôm quá nhiều tài liệu và không có bước nào so các tài liệu với nhau."
    ],
    asks: [
      "Nên tổ chức lại việc trích xuất thế nào?",
      "Tức là: làm sao cho tài liệu nào cũng được đọc kỹ như nhau, và có một chỗ riêng để đối chiếu thu nhập giữa các tài liệu.",
      "Soi từng phương án: nó đổi cấu trúc lượt gọi, hay chỉ nới chỗ chứa, gọi lại, chạy lặp lấy phần chung?"
    ],
    facts: [
      "Attention dilution (loãng chú ý): nhồi quá nhiều thứ vào một lần gọi thì chú ý của model bị dàn mỏng, chỗ được làm kỹ, chỗ qua loa.",
      "Cách guide chỉ: chia thành lượt riêng cho từng phần, mỗi lượt tập trung, rồi một lượt tích hợp riêng làm việc xuyên phần. Bài 1.6 dạy cách này với review PR từng file; trích nhiều tài liệu cũng chia y như vậy.",
      "Context window lớn hơn không chữa loãng chú ý: nó chứa được nhiều hơn, không chú ý tốt hơn.",
      "Retry kèm lỗi validation sửa lỗi định dạng và cấu trúc. Output đúng schema mà nông hay mâu thuẫn thì không có câu lỗi schema nào để gửi lại."
    ],
    opts: [
      { k: "A", gist: "Extract each document in its own focused pass, then run a separate pass that reconciles values across documents.",
        why: [
          "Mỗi tài liệu một lượt riêng nên tài liệu nào cũng được đọc cùng độ sâu (ý 1, ý 2). Hết cảnh chỗ chi tiết chỗ trống.",
          "Lượt đối chiếu riêng chỉ có một việc: so giá trị giữa các tài liệu. Thu nhập lệch nhau được nêu ra, ví dụ bật cờ <code>conflict_detected</code>, thay vì lặng lẽ ra hai số."
        ] },
      { k: "B", gist: "Move to a model with a larger context window so the entire packet fits comfortably in one pass.",
        why: [
          "Lần gọi đã chạy xong, nên cả bộ vốn vừa context. Context lớn hơn chỉ đổi sức chứa, không làm lượt đó chú ý đều hơn (ý 3).",
          "Vẫn không có bước nào so thu nhập giữa các tài liệu.",
          "Dễ bị cuốn vì “12 tài liệu một lần” nghe như quá tải. Nhưng “model to hơn, context lớn hơn” gần như luôn là phương án không chạm nguyên nhân."
        ] },
      { k: "C", gist: "Add a validation-retry loop that sends schema validation errors back to the model for self-correction.",
        why: [
          "Sai loại lỗi: retry kèm lỗi validation dành cho lỗi định dạng, cấu trúc (ý 4). Ở đây vấn đề là độ sâu không đều và giá trị mâu thuẫn.",
          "Không câu lỗi schema nào mô tả được “tài liệu này đọc quá nông”. Gọi lại cùng một lượt ôm 12 tài liệu thì vẫn loãng như cũ."
        ] },
      { k: "D", gist: "Run the full-packet extraction three times and keep only values that agree in at least two runs.",
        why: [
          "Lặp lại một lượt bị loãng không làm lượt nào kỹ hơn (ý 1). Giá trị thật chỉ hiện ở một lần chạy bị luật đồng thuận loại mất.",
          "Còn che luôn chỗ thu nhập mâu thuẫn: giữ số xuất hiện nhiều hơn thay vì báo ra cho bước sau xử lý. Tốn gấp ba."
        ] }
    ],
    refs: [
      { label: "Bài 1.6: attention dilution, chia lượt từng phần rồi một lượt tích hợp; context to hơn không chữa được", href: NOTES + "#l-1-6" },
      { label: "Bài “8 luật chọn đáp án”, luật 3 và 7: nghi ngờ context lớn hơn, chia nhỏ để chống loãng chú ý", href: NOTES + "#l-0-3" },
      { label: "Bài 4.4, mục “Cho schema tự lộ chỗ sai”: trường conflict_detected cho ca nguồn tự mâu thuẫn", href: NOTES + "#l-4-4" }
    ]
  },
  {
    de: 6, n: 54, total: 60, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema", scen: "S6",
    answer: "A",
    ask: "The team's invoice extraction tool already has an <code>input_schema</code>, and every result is checked in code afterward. The schema declares amounts as numbers, <code>line_items</code> as an array, and <code>vendor_name</code> as required. The team plans to set <code>\"strict\": true</code> on the tool and remove that validation step. Which check must still stay in application code?",
    scene: [
      "Tool trích hóa đơn đã có <code>input_schema</code>: số tiền là number, <code>line_items</code> (các dòng hàng) là mảng, <code>vendor_name</code> (tên nhà cung cấp) là required. Kết quả nào cũng qua một bước kiểm bằng code.",
      "Team định bật <code>strict: true</code> rồi xóa luôn bước kiểm đó.",
      "Chỗ khó: strict lo được một phần việc của bước kiểm, không phải tất cả. Phải tách thứ strict bảo đảm khỏi thứ nó không biết. Ví dụ minh họa một bản ghi đúng schema mà sai:<pre><code>{ \"invoice_date\": \"2024-02-01\",\n  \"due_date\":     \"2024-01-05\" }   // hạn trả sớm hơn ngày hóa đơn</code></pre>"
    ],
    asks: [
      "Check nào vẫn phải giữ trong code của app?",
      "Tức là: trong bốn lỗi, lỗi nào strict không chặn được.",
      "Soi từng phương án: đó là lỗi hình dạng (sai kiểu, sai mảng, thiếu trường) hay lỗi nghĩa (giá trị đúng kiểu nhưng nằm sai chỗ)?"
    ],
    facts: [
      "Có hai lớp đúng. Cú pháp: JSON hợp lệ, đủ trường required, đúng kiểu, mảng đúng là mảng. Ngữ nghĩa: giá trị có đúng nghĩa tên trường không. Schema chỉ lo lớp thứ nhất.",
      "<code>strict: true</code> compile schema thành grammar, nên <code>input</code> trong block <code>tool_use</code> luôn khớp <code>input_schema</code>: đủ trường required, đúng kiểu. Docs ghi: không có strict thì Claude có thể trả sai kiểu (<code>\"2\"</code> thay vì <code>2</code>) hoặc bỏ sót trường required.",
      "Hai ngày đổi chỗ cho nhau vẫn là hai chuỗi ngày hợp lệ, đúng kiểu, đúng tên trường: lỗi ngữ nghĩa. Bắt nó là việc của validator, đoạn code của app chạy sau khi nhận JSON."
    ],
    opts: [
      { k: "A", gist: "Keep a code check that flags invoice and due dates that have been swapped between their two fields.",
        why: [
          "Hai ngày đổi chỗ vẫn là hai chuỗi ngày đúng kiểu, nằm đúng tên trường. Schema thỏa, strict không có gì để chặn (ý 1, ý 3).",
          "Chỉ code mới biết luật như “hạn trả không được sớm hơn ngày hóa đơn”. Xóa bước kiểm này thì bản ghi sai nghĩa đi thẳng xuống hệ thống sau.",
          "Bắt được lỗi thì gửi lại tài liệu, JSON vừa trả và câu lỗi cụ thể để Claude sửa (retry kèm lỗi, bài 4.4)."
        ] },
      { k: "B", gist: "Keep a code check that flags <code>line_items</code> arriving as a single object rather than an array.",
        why: [
          "Đây là lỗi hình dạng: schema khai mảng mà nhận object. Strict bảo đảm input khớp cấu trúc đã khai (ý 2), nên lỗi này hết khi bật strict.",
          "Giữ check này cũng không hại, nhưng đề hỏi check nào “must still” (vẫn phải) giữ. Cái này bỏ được."
        ] },
      { k: "C", gist: "Keep a code check that flags the required <code>vendor_name</code> field being missing from the tool call input.",
        why: [
          "Thiếu trường required là vi phạm schema. Strict bảo đảm trường required luôn có mặt (ý 2).",
          "Dễ bị cuốn vì thiếu tên nhà cung cấp nghe như lỗi nặng nhất. Nhưng nặng không có nghĩa strict không chặn được: đây đúng loại lỗi strict sinh ra để chặn."
        ] },
      { k: "D", gist: "Keep a code check that flags monetary amounts arriving as strings such as <code>\"42.10\"</code>.",
        why: [
          "Chuỗi ở chỗ khai number là sai kiểu. Không có strict thì lỗi này có xảy ra; có strict thì input bị ép đúng kiểu ngay lúc sinh (ý 2).",
          "Nên check này về hưu được, cùng với check mảng và check trường thiếu."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, khung “Cú pháp vs ngữ nghĩa” và ô “Bẫy ngược”: schema chặt chỉ lo hình dạng", href: NOTES + "#l-4-3" },
      { label: "Bài 4.4, mục “Bối cảnh”: bật strict thì chắc đúng kiểu và đủ trường, nhưng vẫn cần validator kiểm nội dung", href: NOTES + "#l-4-4" },
      { label: "Docs Strict tool use: không có strict thì có thể sai kiểu hoặc thiếu trường required; có strict thì input luôn khớp input_schema", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/strict-tool-use" }
    ]
  },
  {
    de: 6, n: 55, total: 60, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema", scen: "S6",
    answer: "CD",
    ask: "The extraction tool uses a strict JSON schema. Source documents write percentages and amounts in different styles, for example “5%” or “0.05”, and “$1,200” or “1200 USD”. A developer proposes handling this entirely with the <code>minimum</code> and <code>maximum</code> schema keywords. Which TWO approaches should the team use instead? (Select TWO.)",
    scene: [
      "Tool trích xuất dùng JSON schema strict.",
      "Tài liệu nguồn viết phần trăm và số tiền nhiều kiểu: “5%” hay “0.05”, “$1,200” hay “1200 USD”.",
      "Một dev đề xuất xử lý chuyện này hoàn toàn bằng từ khóa <code>minimum</code> và <code>maximum</code> trong schema.",
      "Chỗ khó: bài toán thật là chuẩn hóa (đưa nhiều cách viết về một dạng), không phải chặn giá trị ngoài khoảng. Đề bắt chọn hai cách thay thế, mỗi cách lo một nửa."
    ],
    asks: [
      "Team nên dùng hai cách nào thay cho đề xuất đó?",
      "Tức là: cái gì dạy được model quy đổi “5%” thành 0.05, và cái gì bắt được giá trị đúng kiểu mà chưa chuẩn hóa.",
      "Soi từng phương án: API có làm được điều phương án giả định không, và nó lo hình dạng hay lo nghĩa?"
    ],
    facts: [
      "Schema strict chỉ ép hình dạng: đúng kiểu, đủ trường. Nó không biết “5%” và “0.05” là một. Quy tắc chuẩn hóa (normalization rules) phải viết trong prompt, đặt cạnh schema.",
      "Structured outputs không hỗ trợ ràng buộc số như <code>minimum</code>, <code>maximum</code>, <code>multipleOf</code>. Gửi thẳng lên API thì bị lỗi 400. SDK helper có thể gỡ chúng khỏi schema, chép vào description của trường, rồi tự kiểm response ở phía code.",
      "Output khớp schema vẫn có thể sai nghĩa, ví dụ phần trăm trả 50 thay vì 0.5. Lỗi ngữ nghĩa phải bắt bằng validator trong code sau khi nhận JSON.",
      "Required chỉ bảo đảm trường có mặt, không nói gì về định dạng giá trị. Trường required mà tài liệu không có thì model bịa cho đủ."
    ],
    opts: [
      { k: "A", gist: "Mark the percentage and currency fields as required in the schema so the model is pushed into the canonical form.",
        why: [
          "Sai ở giả định: required chỉ bảo đảm trường có mặt (ý 4), không ép giá trị về dạng chuẩn nào. “$1,200” vẫn ra đủ kiểu như cũ.",
          "Còn thêm hại: tài liệu không có phần trăm hay số tiền thì model phải bịa một giá trị cho đủ (ý 4)."
        ] },
      { k: "B", gist: "Add <code>minimum</code> and <code>maximum</code> keywords to the schema so the API rejects any value outside the expected range.",
        why: [
          "Sai ở giả định: API structured outputs không chạy ràng buộc số. Gửi thẳng thì request bị lỗi 400 (ý 2). Qua SDK helper thì ràng buộc bị gỡ ra, chép vào description, và việc kiểm diễn ra trong code của mày, không phải ở API.",
          "Kể cả kiểm được khoảng, nó cũng không quy đổi gì. Khoảng 0 tới 100 thì cả 5 lẫn 0.05 đều lọt, schema không biết đâu là dạng team muốn.",
          "Dễ bị cuốn vì <code>minimum</code>, <code>maximum</code> là từ khóa có thật của JSON Schema. Nhưng có trong JSON Schema không có nghĩa structured outputs hỗ trợ."
        ] },
      { k: "C", gist: "Validate the parsed values in code afterward, because a schema-conformant response can still hold un-normalized numbers.",
        why: [
          "Output khớp schema vẫn có thể chưa chuẩn hóa: phần trăm trả 50 thay vì 0.5 vẫn là number hợp lệ (ý 3).",
          "Validator trong code bắt được ca đó. Bắt được thì gửi lại tài liệu, JSON vừa trả và câu lỗi cụ thể để Claude sửa.",
          "Việc kiểm khoảng mà dev muốn giao cho <code>minimum</code>, <code>maximum</code> cũng nằm đúng ở đây (ý 2)."
        ] },
      { k: "D", gist: "Write the percentage and currency normalization rules into the prompt or the field descriptions instead of schema keywords.",
        why: [
          "Quy đổi “5%” thành 0.05, “$1,200” thành số tiền kèm mã tiền tệ là chỉ dẫn về nghĩa, schema không diễn đạt được (ý 1).",
          "Prompt và description của trường là chỗ model đọc khi điền. Notes gọi đây là normalization rules đi kèm schema chặt.",
          "C và D bổ sung cho nhau: D giúp model điền đúng ngay từ đầu, C bắt phần còn lọt."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, mục “Thiết kế schema để model không bịa”: quy tắc chuẩn hóa đi kèm schema chặt, vì schema không biết hai cách viết là một", href: NOTES + "#l-4-3" },
      { label: "Bài 4.2, khung “Khái niệm của bài”: quy tắc chuẩn hóa (normalization rules) và ví dụ khối normalization_rules", href: NOTES + "#l-4-2" },
      { label: "Docs Structured outputs, mục JSON Schema limitations: minimum, maximum, multipleOf không được hỗ trợ, gửi lên thì lỗi 400; SDK gỡ ràng buộc vào description", href: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs" }
    ]
  },
  {
    de: 6, n: 56, total: 60, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema", scen: "S6",
    answer: "B",
    ask: "Audits show that when a receipt has no purchase order number, the extraction still returns a believable one. The tool schema declares <code>purchase_order_number</code> as a required string. Which change best prevents these fabricated values?",
    scene: [
      "Kiểm toán thấy: biên lai không có số đơn đặt hàng (purchase order number) thì extraction vẫn trả về một số trông hợp lệ.",
      "Schema của tool khai <code>purchase_order_number</code> là chuỗi required.",
      "Chỗ khó: model không cố tình sai. Schema đòi biên lai nào cũng có số này, nên khi tài liệu không có, cách duy nhất để hợp lệ là bịa."
    ],
    asks: [
      "Đổi gì để chặn các giá trị bịa này tốt nhất?",
      "Tức là: cho model một đường hợp lệ để báo “không có”, và nói rõ khi nào phải đi đường đó.",
      "Soi từng phương án: nó bỏ được yêu cầu phải điền trong schema, hay giữ nguyên schema rồi dặn, gọi lại, chấm điểm?"
    ],
    facts: [
      "Trường required mà tài liệu không có thông tin thì model bịa cho đủ. Guide: trường có thể vắng thì để optional hoặc nullable (<code>type: [\"string\", \"null\"]</code>), kèm chỉ dẫn trong prompt rằng giá trị vắng phải là <code>null</code>.",
      "Lời dặn trong prompt không thắng được schema: trường vẫn required thì model vẫn phải điền gì đó.",
      "Retry kèm lỗi vô ích khi thông tin vắng ở nguồn: lượt nào cũng gặp cùng một yêu cầu không làm được, nên lại đoán.",
      "Confidence model tự báo chưa hiệu chuẩn. Thêm điểm không chặn được việc bịa, chỉ gắn thêm một con số chưa chắc đúng."
    ],
    opts: [
      { k: "A", gist: "Add a self-rated confidence score next to each required field so downstream code can drop low-confidence values.",
        why: [
          "Không chặn bịa: schema vẫn bắt điền, số bịa vẫn ra, chỉ có thêm điểm đi kèm (ý 4).",
          "Điểm tự báo chưa hiệu chuẩn, nên số bịa mà được chấm cao vẫn lọt xuống hệ thống sau."
        ] },
      { k: "B", gist: "Make the fields that may be missing nullable in the schema, and instruct Claude to return null when a document lacks them.",
        why: [
          "Sửa gốc ở schema: chuỗi hoặc <code>null</code> cho model một cách hợp lệ để báo vắng (ý 1).",
          "Chỉ dẫn đi kèm nói rõ khi nào dùng <code>null</code>: tài liệu không có bằng chứng. Lần này lời dặn và schema cùng một hướng, không còn kéo nhau.",
          "Phương án nói đúng “fields that may be missing” (các trường có thể vắng): chỉ những trường đó, không phải mọi trường."
        ] },
      { k: "C", gist: "Keep every field required and add a system prompt instruction forbidding Claude from inventing values it cannot find.",
        why: [
          "Prompt và schema mâu thuẫn trực tiếp: schema vẫn đòi chuỗi cho mọi trường required, model không có cách nào vừa nghe lời vừa hợp lệ (ý 2).",
          "Dễ bị cuốn vì nó có đúng nửa sau của B (dặn đừng bịa). Nhưng thiếu nửa đầu thì lời dặn không có đường nào để làm theo."
        ] },
      { k: "D", gist: "Leave the schema unchanged and add a validation-retry loop that sends the fabricated value back with the original document.",
        why: [
          "Biên lai không có số đơn hàng, đọc lại bao nhiêu lần cũng không thấy (ý 3). Schema vẫn bắt điền, nên mỗi lượt lại ra một số đoán khác.",
          "Validator cũng khó biết số nào là bịa: số bịa trông hợp lệ thì qua luôn."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, “Khi đi thi” Dạng 2: trường required bị bịa thì cho nullable và dặn trả null khi vắng", href: NOTES + "#l-4-3" },
      { label: "Bài 4.4, mục “Chuyện gì đang xảy ra”: retry vô ích khi thông tin vắng ở nguồn", href: NOTES + "#l-4-4" }
    ]
  },
  {
    de: 6, n: 57, total: 60, sub: "4.2", subName: "Few-shot cho output ổn định", scen: "S6",
    answer: "D",
    ask: "When the system finds conflicting values, it emits a discrepancy flag. Every flag passes schema validation, but the contents vary: <code>location</code> is sometimes a page reference and sometimes a paraphrase, and <code>suggested_resolution</code> ranges from a concrete correction to “verify this”. Detailed field descriptions in the prompt have not helped. Which change most reliably makes the flags consistent?",
    scene: [
      "Gặp giá trị mâu thuẫn, hệ thống xuất một cờ báo lệch (discrepancy flag).",
      "Cờ nào cũng qua schema validation. Nhưng nội dung mỗi cờ một kiểu: <code>location</code> lúc là số trang, lúc là một câu diễn giải; <code>suggested_resolution</code> (cách xử lý đề xuất) lúc là chỗ sửa cụ thể, lúc chỉ là “verify this” (kiểm lại cái này).",
      "Chỗ khó: prompt đã mô tả từng trường rất kỹ mà vẫn vậy. Hình dạng đúng hết, chỉ cách viết nội dung không đều. Ví dụ minh họa:<pre><code>cờ 1: { \"location\": \"page 3, Line Items table, row 4\",\n        \"suggested_resolution\": \"use 1,420.00 from the totals box\" }\ncờ 2: { \"location\": \"somewhere near the totals\",\n        \"suggested_resolution\": \"verify this\" }</code></pre>"
    ],
    asks: [
      "Đổi gì để cờ ra đều nhau chắc nhất?",
      "Tức là: mô tả bằng lời đã kỹ mà vẫn lệch, thì phải cho model thứ gì khác lời mô tả.",
      "Soi từng phương án: nó cho model thấy một cờ viết đúng trông thế nào, hay chỉ gọi lại, lọc bớt, nói mạnh hơn?"
    ],
    facts: [
      "Schema lo hình dạng (đủ trường, đúng kiểu), không lo nội dung trong trường có theo quy ước của team không.",
      "Guide: khi chỉ dẫn chi tiết vẫn cho kết quả không nhất quán, few-shot (vài ví dụ mẫu input → output trong prompt) là kỹ thuật hiệu quả nhất. Một ví dụ đầy đủ đáng giá hơn ba đoạn mô tả, vì model bắt chước hình dạng rất tốt.",
      "Guide khuyên 2–4 ví dụ nhắm đúng ca mơ hồ, bọc trong thẻ <code>&lt;example&gt;</code>, kèm lý do để model khái quát sang ca mới.",
      "Viết mạnh hơn chỉ làm câu nổi hơn, không thêm thông tin. Retry hợp khi validator chỉ ra được lỗi cụ thể. Confidence tự báo hiệu chuẩn kém."
    ],
    opts: [
      { k: "A", gist: "Retry each extraction up to three times and keep the response whose flags look the most complete.",
        why: [
          "Cờ đã qua validation, nên không có câu lỗi cụ thể nào để gửi lại (ý 4). Gọi lại cùng prompt chỉ ra thêm vài biến thể của cùng sự lệch.",
          "“Look the most complete” (trông đầy đủ nhất) lại là một phán đoán mơ hồ nữa. Tốn gấp ba mà gốc vẫn nguyên."
        ] },
      { k: "B", gist: "Ask the model to rate its confidence in each flag so later steps can discard vaguely written ones.",
        why: [
          "Đo nhầm thứ: confidence là độ tin của model rằng có lệch thật, không phải cờ có viết đúng quy ước không (ý 4).",
          "Lọc theo điểm còn bỏ mất những chỗ lệch thật, trong khi các cờ còn lại vẫn mỗi cờ một kiểu."
        ] },
      { k: "C", gist: "Rewrite the field descriptions in stronger wording, saying every flag must follow the specification exactly.",
        why: [
          "Mô tả đã chi tiết. Viết mạnh hơn chỉ nhấn mạnh, không thêm thông tin nào về một số trang hay một cách sửa cụ thể trông ra sao (ý 4).",
          "Model vẫn phải tự hiểu lời mô tả, nên mỗi lần vẫn hiểu một kiểu.",
          "Dễ bị cuốn vì nghe như sửa đúng bệnh “không theo đặc tả”. Nhưng bệnh là lời mô tả để model tự suy diễn, mà nói to hơn không bớt chỗ suy diễn."
        ] },
      { k: "D", gist: "Add two to four few-shot examples of complete flags that show the exact content expected in each field.",
        why: [
          "Đúng bước tiếp theo sau mô tả: chỉ dẫn kỹ mà vẫn lệch thì cho ví dụ (ý 2). Một cờ mẫu có <code>location</code> là “page 3, Line Items table, row 4” cho thấy quy ước ngay, khỏi phải diễn giải.",
          "2–4 ví dụ sát ca thật, phủ cả ca mơ hồ (lệch trong bảng hay trong đoạn văn, sửa được ngay hay cần người xem), đúng số guide khuyên (ý 3).",
          "Ví dụ đi cùng mô tả trường, không thay nó. Schema vẫn lo hình dạng, ví dụ lo nội dung (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 4.2, mục “Bốn chỗ few-shot phát huy”: format output, một ví dụ đầy đủ đáng giá hơn ba đoạn mô tả", href: NOTES + "#l-4-2" },
      { label: "Bài 4.3, khung “Cú pháp vs ngữ nghĩa”: schema chỉ lo hình dạng", href: NOTES + "#l-4-3" }
    ]
  },
  {
    de: 6, n: 58, total: 60, sub: "4.5", subName: "Xử lý theo lô (Batch)", scen: "S6",
    answer: "C",
    ask: "The system sent 5,000 documents as one overnight batch. 4,900 requests succeeded, and 100 errored with <code>invalid_request_error</code> because those documents exceeded the model's context limit. What is the best way to recover the failed extractions?",
    scene: [
      "Hệ thống gửi 5.000 tài liệu trong một batch qua đêm.",
      "4.900 request thành công. 100 request lỗi <code>invalid_request_error</code>, vì tài liệu vượt giới hạn context của model.",
      "Chỗ khó: phải làm hai việc. Tìm đúng 100 tài liệu lỗi trong file kết quả, và sửa request trước khi gửi lại, vì lỗi nằm ở chính request."
    ],
    asks: [
      "Cách tốt nhất để lấy lại 100 extraction lỗi là gì?",
      "Tức là: nhận diện đúng tài liệu lỗi, đổi request cho vừa context, và chỉ gửi lại phần đó.",
      "Soi từng phương án: nó tìm tài liệu lỗi bằng gì, và request gửi lại có khác request cũ không?"
    ],
    facts: [
      "Mỗi request trong batch mang một <code>custom_id</code> do mày đặt. Kết quả không về theo thứ tự gửi, nên ghép kết quả với tài liệu bằng <code>custom_id</code>, không bằng vị trí dòng.",
      "Mỗi dòng trong file kết quả <code>.jsonl</code> có result type <code>succeeded</code>, <code>errored</code>, <code>canceled</code> hoặc <code>expired</code>. Batch <code>ended</code> không có nghĩa mọi request đều thành công.",
      "Docs: request <code>errored</code> do <code>invalid_request_error</code> thì phải sửa request trước khi gửi lại. Tài liệu vượt context là input quá dài, sửa bằng chunking (cắt tài liệu thành nhiều phần, mỗi phần một request). <code>max_tokens</code> là giới hạn output, không đụng tới input.",
      "Batch có request lỗi: dùng <code>custom_id</code> lọc phần lỗi, chunk chúng rồi nộp riêng trong một batch mới. Không nộp lại cả lô."
    ],
    opts: [
      { k: "A", gist: "Retry only the failed documents through synchronous calls with a larger <code>max_tokens</code> value so they fit.",
        why: [
          "Sai ở giả định: <code>max_tokens</code> chặn độ dài output, còn lỗi ở đây là input quá dài (ý 3). Tăng nó lên thì tài liệu vẫn vượt context, request vẫn lỗi.",
          "Chuyển sang gọi thường còn mất phần giảm 50% của batch mà không giải quyết được gì.",
          "Dễ bị cuốn vì “cho thêm chỗ” nghe như đúng bệnh “không vừa”. Nhưng chỗ không vừa là đầu vào, không phải đầu ra."
        ] },
      { k: "B", gist: "Find the failed documents by their line position in the results file and resubmit them unchanged.",
        why: [
          "Sai cách tìm: kết quả không về theo thứ tự gửi, nên dòng thứ N chưa chắc là tài liệu thứ N (ý 1). Gửi lại có thể trúng tài liệu đã thành công.",
          "Kể cả tìm đúng, gửi lại y nguyên thì tài liệu vẫn vượt context, lỗi lặp lại (ý 3)."
        ] },
      { k: "C", gist: "Collect the errored <code>custom_id</code> values, split those documents into chunks, and submit only them in a new batch.",
        why: [
          "Lọc theo <code>custom_id</code> và result type <code>errored</code> ra đúng 100 tài liệu (ý 1, ý 2). 4.900 kết quả tốt giữ nguyên.",
          "Chunk từng tài liệu cho vừa context là sửa đúng chỗ gây lỗi (ý 3). Request mới khác request cũ, nên lần này chạy được.",
          "Nộp riêng một batch mới chỉ chứa phần đó, vẫn được giá batch (ý 4)."
        ] },
      { k: "D", gist: "Resubmit the whole original batch unchanged so the failed documents get another processing attempt.",
        why: [
          "Request y nguyên thì 100 tài liệu vẫn vượt context, lỗi y như cũ (ý 3).",
          "Còn trả tiền lại cho 4.900 tài liệu đã có kết quả tốt. Notes ghi thẳng: đừng nộp lại cả lô (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Khi batch có request lỗi” và “Khi đi thi”: lọc theo custom_id, chunk, chỉ nộp lại phần lỗi; max_tokens là giới hạn output", href: NOTES + "#l-4-5" },
      { label: "Cheatsheet D4: dòng “Batch ended nhưng thiếu kết quả”: đọc result type từng dòng", href: NOTES + "#cheat-d4" },
      { label: "Docs Batch processing: kết quả có thể không theo thứ tự, ghép bằng custom_id; invalid_request_error thì sửa request trước khi gửi lại", href: "https://platform.claude.com/docs/en/build-with-claude/batch-processing" }
    ]
  },
  {
    de: 6, n: 59, total: 60, sub: "1.6", subName: "Chia việc lớn", scen: "S6",
    answer: "B",
    ask: "Each 18-section application bundle is extracted in a single request, with a forced extraction tool and explicit normalization rules. Bank statements early in a bundle are extracted thoroughly, while identical statements near the end come back sparse and unnormalized, yet every output validates against the schema. How should the team restructure the extraction?",
    scene: [
      "Mỗi bộ hồ sơ 18 phần được trích trong một request, có tool trích xuất bị ép gọi và quy tắc chuẩn hóa viết rõ.",
      "Sao kê ngân hàng ở đầu bộ được trích kỹ. Sao kê y hệt ở cuối bộ thì thưa thớt, chưa chuẩn hóa. Output nào cũng qua schema.",
      "Chỗ khó: cùng loại phần, cùng schema, cùng quy tắc, chỉ khác vị trí trong bộ. Chất lượng đi theo vị trí chứ không theo nội dung."
    ],
    asks: [
      "Team nên tổ chức lại việc trích xuất thế nào?",
      "Tức là: làm sao cho phần ở cuối bộ được xử lý kỹ như phần ở đầu.",
      "Soi từng phương án: nó chạm vào chuyện một lượt ôm 18 phần, hay sửa thứ đang chạy tốt (quy tắc, schema, chỗ chứa output)?"
    ],
    facts: [
      "Attention dilution (loãng chú ý): nhồi quá nhiều thứ vào một lần gọi thì chú ý bị dàn mỏng, phần đầu kỹ, phần sau qua loa.",
      "Cách guide chỉ: chia thành lượt riêng cho từng phần, độ sâu đồng đều, rồi một lượt tích hợp riêng cho việc xuyên phần (khớp tổng, so số tài khoản giữa các sao kê).",
      "Hết <code>max_tokens</code> thì response dừng với <code>stop_reason: \"max_tokens\"</code> và output có thể không hoàn chỉnh. Khác hẳn ca output xong, qua schema mà chỉ nông.",
      "Trường required mà model chưa đọc kỹ, hay tài liệu không có, thì nó điền đại cho đủ. Required ép trường có mặt, không ép model đọc kỹ."
    ],
    opts: [
      { k: "A", gist: "Rewrite the normalization rules in stronger, more emphatic wording so the model applies them to every section.",
        why: [
          "Phần đầu bộ đã được chuẩn hóa đúng, tức model hiểu quy tắc. Vấn đề không phải hiểu, mà là chú ý tới phần cuối (ý 1).",
          "Viết mạnh hơn không làm lượt đó bớt ôm 18 phần, nên phần cuối vẫn qua loa.",
          "Dễ bị cuốn vì triệu chứng có chữ “unnormalized” (chưa chuẩn hóa), nghe như lỗi của quy tắc. Nhưng cùng quy tắc đó ở đầu bộ thì chạy đúng."
        ] },
      { k: "B", gist: "Extract each section in its own focused pass, then run a separate integration pass for cross-section checks.",
        why: [
          "Manh mối quyết định: cùng loại phần mà tốt hay kém chỉ tùy vị trí trong bộ. Đó là dấu hiệu loãng chú ý (ý 1).",
          "Mỗi phần một lượt riêng thì phần nào cũng được đọc cùng độ sâu, quy tắc chuẩn hóa áp đều. Lượt tích hợp riêng lo khớp tổng, so số tài khoản, nêu chỗ mâu thuẫn (ý 2).",
          "Tốn thêm lượt gọi, đổi lại chất lượng đều ở mọi phần."
        ] },
      { k: "C", gist: "Raise <code>max_tokens</code> so the model has enough output budget to fully extract the final sections of the bundle.",
        why: [
          "Hết chỗ output thì đã thấy <code>stop_reason: \"max_tokens\"</code> hoặc output bị cụt (ý 3). Ở đây response nào cũng xong và qua schema.",
          "Phần cuối có được xử lý, chỉ xử lý nông. Thêm chỗ output không làm lượt đó chú ý đều hơn."
        ] },
      { k: "D", gist: "Make every field in the schema required so the model cannot return sparse data for the later sections.",
        why: [
          "Required ép trường có mặt, không ép model đọc kỹ (ý 4). Phần cuối chưa đọc kỹ thì giờ sẽ bị điền đại cho đủ.",
          "Mất luôn đường trả <code>null</code> trung thực cho chỗ tài liệu thật sự không có. Còn vị trí, thứ đang quyết định chất lượng, thì không đổi."
        ] }
    ],
    refs: [
      { label: "Bài 1.6: attention dilution, phần đầu kỹ phần sau qua loa; chia lượt từng phần rồi một lượt tích hợp", href: NOTES + "#l-1-6" },
      { label: "Bài 4.6, mục “Cách sửa”: lượt từng file độ sâu đồng đều, lượt tích hợp cho việc xuyên file", href: NOTES + "#l-4-6" },
      { label: "Bài 4.3, mục “Chuyện gì đang xảy ra”: stop_reason max_tokens thì output có thể không hoàn chỉnh", href: NOTES + "#l-4-3" }
    ]
  },
  {
    de: 6, n: 60, total: 60, sub: "4.4", subName: "Validate, retry kèm lỗi và vòng phản hồi", scen: "S6",
    answer: "A",
    ask: "The pipeline retries failed extractions by sending back the document, the previous output and the validation error. For invoices with no purchase order number, every retry returns a different believable-looking number. Which change best fixes this?",
    scene: [
      "Pipeline gọi lại khi extraction lỗi: gửi lại tài liệu, output lần trước và câu lỗi validation. Đây là retry kèm lỗi làm đúng cách.",
      "Với hóa đơn không in số đơn đặt hàng (purchase order number), mỗi lần gọi lại ra một số khác, số nào cũng trông hợp lệ.",
      "Chỗ khó: vòng retry không sai, nhưng ca này nằm ngoài thứ retry sửa được. Số đổi mỗi lần là dấu hiệu model đang đoán. Ví dụ minh họa:<pre><code>lượt 1: \"PO-48213\"\nlượt 2: \"PO-50977\"\nlượt 3: \"PO-47120\"   // hóa đơn không in số nào</code></pre>"
    ],
    asks: [
      "Đổi gì để sửa chuyện này tốt nhất?",
      "Tức là: thông tin không có trong tài liệu, thì để model báo vắng thế nào, và ai lo đi lấy giá trị đó.",
      "Soi từng phương án: nó thừa nhận thông tin vắng ở nguồn, hay vẫn ép model ra một con số bằng cách khác?"
    ],
    facts: [
      "Retry kèm lỗi sửa được lỗi định dạng và lỗi trích xuất, khi thông tin có trong tài liệu. Thông tin vắng ở nguồn thì gọi lại bao nhiêu lần cũng không moi ra được.",
      "Khi đó <code>null</code> là đáp án đúng, không phải lỗi. Việc cần làm là đưa thêm tài liệu có thông tin hoặc chuyển người.",
      "Trường required mà tài liệu không có thì model bịa cho đủ. Trường có thể vắng thì để nullable (<code>type: [\"string\", \"null\"]</code>).",
      "Chạy nhiều lần rồi lấy số xuất hiện nhiều nhất không tạo ra bằng chứng: các số đoán trùng nhau vẫn là đoán."
    ],
    opts: [
      { k: "A", gist: "Make the field nullable and route documents that lack the value to a separate handling path.",
        why: [
          "Nullable cho model một cách trung thực để báo “hóa đơn không có số này” (ý 3). Hết bịa.",
          "Hóa đơn ra <code>null</code> đi sang luồng riêng lấy được giá trị: tra hệ thống đặt hàng, xin thêm tài liệu, hoặc đưa người (ý 2). Thiếu thông tin thành việc đi tìm, không còn là việc gọi lại."
        ] },
      { k: "B", gist: "Define the extraction as a tool with the field marked required so the model has to fill it in.",
        why: [
          "Ngược chiều: required chính là thứ đang ép model bịa (ý 3). Schema bảo đảm trường có mặt, không bảo đảm giá trị lấy từ đâu.",
          "Dễ bị cuốn vì “tool + schema” là cách quen để có output tin cậy. Nhưng tin cậy về hình dạng, còn chỗ hỏng ở đây là giá trị không có nguồn."
        ] },
      { k: "C", gist: "Run the extraction three times for these invoices and keep whichever number appears most often.",
        why: [
          "Ba lần đoán ba số khác nhau thì không có số nào nhiều nhất. Hai lần trùng thì vẫn là đoán, nhưng được đưa xuống như dữ liệu thật (ý 4).",
          "Tài liệu không có số đơn hàng, chạy bao nhiêu lần cũng vậy (ý 1)."
        ] },
      { k: "D", gist: "Raise the retry limit from two to five attempts so the model has more chances to correct itself.",
        why: [
          "Thêm lượt chỉ có ích khi đáp án nằm trong tài liệu mà model xử lý sai (ý 1). Ở đây không có gì để sửa cho đúng.",
          "Số đổi mỗi lần là dấu hiệu đang bịa. Năm lượt chỉ cho năm số bịa, tốn thêm token."
        ] }
    ],
    refs: [
      { label: "Bài 4.4, mục “Chuyện gì đang xảy ra”: retry có ích với lỗi trích xuất, vô ích khi nguồn không có thông tin; khi đó để null, đưa thêm tài liệu hoặc chuyển người", href: NOTES + "#l-4-4" },
      { label: "Bài 4.3, mục “Thiết kế schema để model không bịa”: trường có thể vắng thì để nullable", href: NOTES + "#l-4-3" }
    ]
  }
);
