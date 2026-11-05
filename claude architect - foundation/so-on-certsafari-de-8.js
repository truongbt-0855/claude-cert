// Sổ ôn certsafari, Đề 8. Trang so-on-certsafari.html nạp file này trước script render.
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
DE[8] = "Udemy · Practice Test 5 · 60 câu · 04/11/2026";
ENTRIES.push(
  {
    de: 8, n: 1, total: 60, sub: "2.1", subName: "Thiết kế tool: description rõ, ranh giới rõ", scen: "S4",
    answer: "C",
    ask: "One line was added to the agent's system prompt: “Always search thoroughly before answering.” Since then, for codebase questions it used to answer correctly with Grep, the agent calls the MCP tool <code>search_wiki</code> instead. What is the most direct fix?",
    scene: [
      "Agent có Grep (tìm trong code) và tool MCP <code>search_wiki</code> (tìm trong wiki). Trước giờ câu hỏi về code thì nó chọn đúng Grep.",
      "Team thêm đúng một dòng vào system prompt: “Always search thoroughly before answering” (luôn tìm kỹ trước khi trả lời). Từ đó câu hỏi về code cũng bị đẩy sang <code>search_wiki</code>.",
      "Chỗ khó: description của hai tool không hề đổi. Thứ duy nhất đổi là dòng prompt, và trong dòng đó có chữ “search”, trùng với tên tool <code>search_wiki</code>."
    ],
    asks: [
      "Cách sửa trực tiếp nhất là gì?",
      "Tức là: sửa đúng chỗ vừa gây ra lỗi, không vá ở chỗ khác.",
      "Soi từng phương án: nó đụng tới dòng prompt mới thêm, hay đi vá description, kiến trúc, hook?"
    ],
    facts: [
      "Claude chọn tool dựa vào <code>name</code> và <code>description</code> của tool, cùng với chỉ dẫn trong system prompt. Description là cơ chế chính.",
      "System prompt cũng ảnh hưởng: một câu chứa từ khóa có thể tạo liên tưởng ngoài ý muốn và đè lên description tốt. Description tốt mà vẫn gọi nhầm thì rà system prompt tìm chỉ dẫn nhạy từ khóa.",
      "Mở rộng description (thêm ranh giới: dùng khi nào, không dùng khi nào) là cách sửa khi description mơ hồ hoặc chồng lấn nhau.",
      "Hook <code>PreToolUse</code> chạy khi Claude đã xin gọi tool, trước lúc tool chạy. Nó chặn được lần gọi đó, nhưng không làm Claude chọn đúng tool ngay từ đầu."
    ],
    opts: [
      { k: "A", gist: "Lengthen the <code>search_wiki</code> description with boundary wording: it covers wiki pages, not source code, so the model can tell it apart from Grep.",
        why: [
          "Sai chỗ sửa: description không phải nguyên nhân. Với đúng các description này, agent đã chọn đúng trước khi có dòng prompt mới (ý 1, ý 3).",
          "Thêm ranh giới thì description phải gồng lên chống lại một chỉ dẫn vẫn đang đẩy model về phía “search” (ý 2). Có thể đỡ một phần, nhưng gốc vẫn còn đó.",
          "Dễ bị cuốn vì mở rộng description là cách sửa chuẩn của bài 2.1 khi gọi nhầm tool. Nhưng cách đó dành cho description mơ hồ. Đề kể rõ mốc thời gian: lỗi bắt đầu từ dòng prompt."
        ] },
      { k: "B", gist: "Move <code>search_wiki</code> into a dedicated documentation subagent, leaving the main agent only the built-in tools for codebase questions.",
        why: [
          "Đổi cả kiến trúc để né một câu prompt. Quá tay so với một lỗi câu chữ.",
          "Agent chính mất luôn khả năng tra wiki, thứ trước đó vẫn chạy đúng. Còn dòng prompt gây lỗi thì vẫn nằm nguyên."
        ] },
      { k: "C", gist: "Reword the added line in neutral terms, without the word “search”, so the instruction stops pointing toward the wiki tool.",
        why: [
          "Sửa đúng gốc: chữ “search” trong chỉ dẫn trùng với tên <code>search_wiki</code>, nên model coi gọi tool đó là cách làm theo lời dặn (ý 2).",
          "Viết lại trung tính, ví dụ “examine the relevant code before answering” (xem kỹ phần code liên quan trước khi trả lời), là hết trùng từ khóa. Các description vốn đủ để chọn đúng sẽ lại có tác dụng (ý 1).",
          "Đây là cách trực tiếp nhất: sửa một dòng, đúng dòng vừa gây ra lỗi."
        ] },
      { k: "D", gist: "Add a <code>PreToolUse</code> hook that denies <code>search_wiki</code> whenever the request mentions code, so Grep handles those questions.",
        why: [
          "Chặn sau khi model đã chọn sai (ý 4). Lựa chọn vẫn lệch: agent vẫn thử gọi <code>search_wiki</code>, bị từ chối, rồi mới quay sang cách khác. Tốn thêm lượt.",
          "Lọc theo chuyện câu hỏi “có nhắc tới code không” rất dễ hỏng: câu hỏi wiki về một chủ đề code cũng bị chặn oan.",
          "Dễ bị cuốn vì hook là cơ chế chắc chắn. Nhưng hook hợp để bắt buộc một luật. Đây là lỗi chọn tool do câu chữ, sửa câu chữ là xong."
        ] }
    ],
    refs: [
      { label: "Bài 2.1, mục “Hai bẫy nữa trong cùng chủ đề”: system prompt nhạy từ khóa có thể đè lên description tốt", href: NOTES + "#l-2-1" },
      { label: "Cheatsheet D2: dòng “Description tốt nhưng vẫn misroute” → rà system prompt tìm chỉ dẫn nhạy từ khóa", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 8, n: 2, total: 60, sub: "1.1", subName: "Vòng lặp agent", scen: "S4",
    answer: "B",
    ask: "In a single turn the agent requests several Grep and Read calls, one Write call, and a Bash call that tests the file Write creates. Your dispatcher runs every requested call concurrently, so Bash sometimes starts before Write has finished. The code searches must stay parallel for speed. What should you change?",
    scene: [
      "Trong một lượt, Claude xin gọi cùng lúc: vài Grep, vài Read, một Write (tạo file), và một Bash (chạy test trên chính file Write tạo ra).",
      "Dispatcher (đoạn code của app nhận các lời xin rồi chạy tool) chạy tất cả cùng lúc. Có lần Bash chạy khi Write chưa ghi xong, test chạy trên file chưa có.",
      "Chỗ khó: các lần tìm code phải giữ song song cho nhanh. Không được chữa bằng cách bắt mọi thứ chạy lần lượt."
    ],
    asks: [
      "Nên đổi gì?",
      "Tức là: Bash phải chạy sau khi Write xong, còn Grep và Read vẫn chạy cùng lúc.",
      "Soi từng phương án: nó có bảo đảm thứ tự Write rồi mới Bash ở mọi lần không, và có giữ được song song cho phần tìm kiếm không?"
    ],
    facts: [
      "Claude chỉ đặt nhiều block <code>tool_use</code> trong một response. Code của app mới là bên chạy tool. API không quy định thứ tự: chạy cùng lúc, lần lượt theo thứ tự xuất hiện, hay trộn hai cách là do app chọn.",
      "Docs khuyên: thao tác độc lập, chỉ đọc thì chạy song song cho nhanh. Tool có tác dụng phụ (ghi file, đổi dữ liệu), dùng chung trạng thái hay cần thứ tự thì nên chạy lần lượt.",
      "<code>disable_parallel_tool_use: true</code> đặt trong <code>tool_choice</code> kiểu <code>auto</code> làm Claude gọi tối đa một tool mỗi response.",
      "<code>strict: true</code> trên định nghĩa tool bảo đảm input Claude điền khớp đúng schema. Nó không quyết định tool chạy lúc nào."
    ],
    opts: [
      { k: "A", gist: "Set <code>tool_choice</code> to <code>auto</code> with <code>disable_parallel_tool_use</code>, so each assistant response contains at most one tool call.",
        why: [
          "Chạy được: Write và Bash không bao giờ chung một lượt nữa (ý 3).",
          "Nhưng mọi lượt chỉ còn một tool call, kể cả Grep và Read. Phần tìm kiếm thành lần lượt, trái ràng buộc “must stay parallel” (phải giữ song song).",
          "Dễ bị cuốn vì đây là cờ thật và chặn đúng chuyện tranh nhau chạy. Nhưng nó bỏ song song của cả lô chỉ để sửa một chỗ phụ thuộc."
        ] },
      { k: "B", gist: "Keep the read-only calls concurrent in the dispatcher, but run Write and Bash one at a time, in the order they were requested.",
        why: [
          "Đúng chỗ: thứ tự chạy là việc của dispatcher, tức code của mày (ý 1).",
          "Chia theo loại tool như docs khuyên: Grep, Read chỉ đọc nên chạy song song. Write có tác dụng phụ, Bash phụ thuộc kết quả Write, nên chạy lần lượt (ý 2).",
          "Write xong mới tới Bash, lần nào cũng vậy. Phần tìm kiếm vẫn nhanh như cũ. Mỗi <code>tool_use</code> vẫn nhận <code>tool_result</code> riêng theo <code>tool_use_id</code> như bình thường."
        ] },
      { k: "C", gist: "Enable strict mode on the Write and Bash tool schemas so every call is validated before the dispatcher executes it.",
        why: [
          "Sai cơ chế: strict kiểm hình dạng input, không xếp lịch chạy (ý 4).",
          "Một lệnh Bash hoàn toàn hợp lệ vẫn có thể chạy trước khi Write ghi xong file. Chuyện tranh nhau chạy vẫn còn nguyên."
        ] },
      { k: "D", gist: "Add a system prompt rule telling Claude to request Write in one turn and the Bash test in the following turn.",
        why: [
          "Lời dặn trong prompt là xác suất: phần lớn lần Claude tách hai lượt, nhưng vẫn có lần gộp chung.",
          "Lỗi này vốn chỉ thỉnh thoảng mới xảy ra, nên càng khó bắt. Thứ tự phải đúng mọi lần thì đặt trong code dispatcher (ý 1), không đặt trong lời dặn."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, Khái niệm “Chạy song song”: nhiều block tool_use trong một response, code của app chạy chúng", href: NOTES + "#l-1-3" },
      { label: "Bài 1.4, mục “Biết thêm”: tra cứu chạy song song được, thao tác làm đổi dữ liệu thì làm lần lượt", href: NOTES + "#l-1-4" },
      { label: "Docs Parallel tool use, mục Execution semantics: API không quy định thứ tự; tool có tác dụng phụ nên chạy lần lượt", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use" }
    ]
  },
  {
    de: 8, n: 3, total: 60, sub: "1.2", subName: "Điều phối coordinator–subagent", scen: "S4",
    answer: "C",
    ask: "A coordinator launches three exploration subagents in parallel, and their assistant messages come through interleaved in the SDK message stream. While the run is still in progress, engineers need to tell which subagent produced each streamed message. Which mechanism should they use?",
    scene: [
      "Coordinator tạo ba subagent khám phá code, chạy song song.",
      "Message của ba subagent đổ chung về một luồng message của SDK, xen kẽ nhau.",
      "Kỹ sư cần biết mỗi message là của subagent nào, ngay lúc đang chạy, không đợi chạy xong.",
      "Chỗ khó: các phương án đều là cơ chế có thật. Phải lọc theo hai điều: gắn nguồn cho từng message, và làm được trong lúc đang chạy."
    ],
    asks: [
      "Dùng cơ chế nào?",
      "Tức là: một thứ có sẵn trên từng message, cho biết nó đến từ subagent nào, đọc được ngay khi message tới.",
      "Soi từng phương án: nó gắn nguồn cho từng message hay chỉ cho cả lần giao việc? Có dùng được lúc đang chạy không? Có chắc chắn không, hay dựa vào model tự viết?"
    ],
    facts: [
      "Claude gọi subagent qua tool Agent. Mỗi lần gọi hiện trong luồng message là một block <code>tool_use</code> có <code>name</code> là <code>\"Agent\"</code> và một <code>id</code> riêng. Bản cũ đặt tên tool này là <code>\"Task\"</code>.",
      "Message phát ra từ bên trong context của một subagent có trường <code>parent_tool_use_id</code>. Giá trị này trùng <code>id</code> của block <code>tool_use</code> đã tạo ra subagent đó.",
      "Hook <code>SubagentStop</code> chạy khi một subagent xong việc. Input của nó có <code>agent_id</code> và <code>agent_transcript_path</code> (đường dẫn transcript của subagent).",
      "Tool <code>SendMessage</code> cho một agent nhắn tin tới các agent có tên khác đang chạy trong phiên."
    ],
    opts: [
      { k: "A", gist: "Register a <code>SubagentStop</code> hook that logs each subagent's completion and transcript details, so every delegation and its result is recorded.",
        why: [
          "Cơ chế có thật, nhưng sai thời điểm: hook chỉ chạy khi subagent đã xong (ý 3).",
          "Nó ghi được lần giao việc nào kết thúc và transcript nằm đâu. Nó không gắn nguồn cho từng message đang chảy về lúc subagent còn làm, mà đề đòi đúng điều đó.",
          "Dễ bị cuốn vì đây là cách theo dõi subagent mà docs có nêu. Nhưng nó trả lời câu “subagent nào xong, kết quả ở đâu”, không phải câu “message này của ai”."
        ] },
      { k: "B", gist: "Add a rule to each subagent's system prompt telling it to start every response with its own agent name.",
        why: [
          "Dựa vào model tự viết nhãn. Lời dặn là xác suất: có lúc quên, có lúc viết lệch, nhất là khi chạy dài.",
          "Gắn nguồn để debug nên lấy từ metadata có cấu trúc mà SDK đã gắn sẵn (ý 2), không lấy từ chữ model có thể viết hoặc không."
        ] },
      { k: "C", gist: "Match each streamed message's <code>parent_tool_use_id</code> to the Agent <code>tool_use</code> block that spawned the subagent, so every message maps to its source.",
        why: [
          "Đây là cơ chế SDK làm ra cho đúng việc này. Mỗi lần coordinator gọi tool Agent có một <code>id</code> (ý 1). Mọi message từ bên trong subagent đó mang <code>parent_tool_use_id</code> trùng <code>id</code> ấy (ý 2).",
          "Giữ một bảng: <code>id</code> nào là subagent nào. Message tới, đọc <code>parent_tool_use_id</code> là biết ngay của ai, kể cả khi ba luồng xen kẽ.",
          "Có cấu trúc, đọc được ngay khi message tới, không phải sửa prompt, không phải chờ subagent xong."
        ] },
      { k: "D", gist: "Give each subagent the <code>SendMessage</code> tool so it sends its findings to the main agent as a labeled message rather than a plain report.",
        why: [
          "Sai việc: <code>SendMessage</code> là để các agent có tên nhắn cho nhau (ý 4). Nó không gắn nhãn cho các message thường mà subagent phát ra trong lúc làm.",
          "Còn thêm một kênh nhắn ngang giữa các agent mà hệ thống không cần. Mục tiêu chỉ là nhận ra nguồn của các message đã có sẵn trong luồng."
        ] }
    ],
    refs: [
      { label: "Bài 1.2: hub-and-spoke, mọi thứ đi qua coordinator, subagent chạy trong context riêng", href: NOTES + "#l-1-2" },
      { label: "Docs Subagents in the SDK, mục Detect subagent invocation: tool_use tên Agent, message bên trong subagent mang parent_tool_use_id", href: "https://code.claude.com/docs/en/agent-sdk/subagents" },
      { label: "Docs Agent SDK hooks, mục Track subagent activity: SubagentStop chạy khi subagent xong, có agent_id và agent_transcript_path", href: "https://code.claude.com/docs/en/agent-sdk/hooks" }
    ]
  },
  {
    de: 8, n: 4, total: 60, sub: "2.5", subName: "Chọn built-in tool đúng việc", scen: "S4",
    answer: "AD",
    ask: "An agent has to trace calls to <code>validate_order</code> in a monorepo full of unrelated JavaScript files. The function is defined in a generated Python file that is too large for a single Read call. Which TWO techniques keep the exploration incremental? (Select TWO.)",
    scene: [
      "Agent phải lần theo các chỗ gọi hàm <code>validate_order</code> trong một monorepo.",
      "Repo đầy file JavaScript không liên quan. Hàm được định nghĩa trong một file Python sinh tự động, to tới mức một lần Read không đọc hết.",
      "Chỗ khó: có hai trở ngại khác nhau. Một là nhiễu (quá nhiều file JS). Hai là file đích quá to. Mỗi đáp án đúng gỡ một trở ngại."
    ],
    asks: [
      "Hai kỹ thuật nào giữ cho việc khám phá đi từng bước (incremental)?",
      "Tức là: mỗi bước chỉ nạp phần liên quan. Tìm hẹp, rồi đọc hẹp.",
      "Soi từng phương án: nó có tìm theo nội dung không? Nó có làm được với file quá to không?"
    ],
    facts: [
      "Grep tìm chữ bên trong file. Thu hẹp phạm vi được bằng tham số <code>glob</code> (vd <code>**/*.py</code>) hoặc <code>type</code> (theo ngôn ngữ, vd <code>py</code>). Glob thì chỉ tìm theo tên và đường dẫn file, không nhìn nội dung.",
      "Read mặc định trả tối đa 25.000 token mỗi lần, và từ chối đọc nguyên file text trên 256 KB. File to hơn thì đọc từng trang bằng <code>offset</code> (dòng bắt đầu) và <code>limit</code> (số dòng).",
      "Grep mặc định ở chế độ <code>files_with_matches</code>: chỉ trả đường dẫn file. Chế độ <code>content</code> trả dòng khớp kèm số dòng.",
      "Khám phá tăng dần: Grep tìm chỗ liên quan, Read đúng chỗ đó, theo import sang file kế, Grep tiếp khi cần. Mỗi bước chỉ nạp thứ liên quan."
    ],
    opts: [
      { k: "A", gist: "Restrict Grep to Python files with a glob or type filter, so the matches skip the unrelated JavaScript.",
        why: [
          "Gỡ trở ngại thứ nhất: nhiễu. <code>glob</code> hoặc <code>type</code> giới hạn Grep vào file Python (ý 1).",
          "Hàng nghìn file JS không liên quan không lọt vào kết quả, nên không tốn context cho những chỗ agent sẽ không bao giờ theo."
        ] },
      { k: "B", gist: "Run Grep in <code>files_with_matches</code> mode to list the relevant paths, then load each matched file with one full Read call.",
        why: [
          "Nửa đầu ổn: liệt kê file có khớp là bước mở đầu hợp lý (ý 3).",
          "Nửa sau gãy: đề nói file định nghĩa quá to cho một lần Read. Read cả file đó thì chỉ nhận trang đầu kèm thông báo chưa đọc hết, hoặc bị từ chối (ý 2).",
          "Dễ bị cuốn vì “Grep rồi Read” đúng là vòng khám phá tăng dần (ý 4). Nhưng đọc nguyên cả file không phải đọc hẹp, và với file này thì không làm nổi."
        ] },
      { k: "C", gist: "List candidate files with a Glob pattern on validation module names, then Read those files to find the call sites.",
        why: [
          "Sai công cụ: Glob chỉ khớp tên file, không nhìn nội dung (ý 1).",
          "Chỗ gọi <code>validate_order</code> có thể nằm trong file có tên chẳng dính gì tới “validation”. Lọc theo tên thì sót chỗ gọi. Tìm chỗ dùng một hàm là tìm nội dung, việc của Grep."
        ] },
      { k: "D", gist: "Read the oversized definition file in pages using <code>offset</code> and <code>limit</code>, starting from the lines where Grep found matches.",
        why: [
          "Gỡ trở ngại thứ hai: file quá to. Docs dặn đúng cách này: đọc từng trang bằng <code>offset</code> và <code>limit</code> (ý 2).",
          "Bắt đầu từ dòng Grep đã tìm ra (Grep chế độ <code>content</code> trả kèm số dòng, ý 3), nên chỉ đọc những đoạn của file sinh tự động có liên quan tới việc lần theo.",
          "A tìm hẹp, D đọc hẹp: hai nửa của cùng một cách khám phá tăng dần (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 2.5, mục “Khám phá tăng dần, không đọc hết”: Grep tìm chỗ liên quan → Read đúng chỗ → theo import", href: NOTES + "#l-2-5" },
      { label: "Docs Tools reference, mục Grep tool behavior (glob, type, output mode) và Read tool behavior › Large files (25.000 token, offset/limit)", href: "https://code.claude.com/docs/en/tools-reference" }
    ]
  },
  {
    de: 8, n: 5, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S4",
    answer: "BC",
    ask: "On an office workstation, an engineer named an investigation session <code>api-trace</code>. During that session the agent also wrote findings to an uncommitted scratch file. Which two steps let the engineer continue that session on a laptop that has a clone of the repository? (Select TWO.)",
    scene: [
      "Kỹ sư làm một phiên điều tra trên máy bàn ở công ty, đặt tên phiên là <code>api-trace</code>.",
      "Trong phiên, agent còn ghi kết quả ra một scratch file (file nháp) chưa commit.",
      "Giờ kỹ sư muốn làm tiếp phiên đó trên laptop. Laptop có bản clone của repo.",
      "Chỗ khó: có hai thứ phải mang sang, và chúng đi hai đường khác nhau. Một là lịch sử hội thoại. Hai là file nháp nằm trên đĩa."
    ],
    asks: [
      "Hai bước nào giúp làm tiếp phiên đó trên laptop?",
      "Tức là: đưa được lịch sử phiên sang laptop, và đưa được file nháp sang laptop.",
      "Soi từng phương án: nó mang thứ nào sang, và nó có thật sự tới được laptop không?"
    ],
    facts: [
      "Claude Code lưu mỗi phiên thành một file transcript <code>.jsonl</code> trên chính máy đã chạy, trong <code>~/.claude/projects/</code>. Tên phiên chỉ là nhãn gắn vào file ấy, phiên không tự đồng bộ sang máy khác.",
      "Muốn resume trên máy khác: chép file <code>.jsonl</code> vào một thư mục dưới <code>~/.claude/projects/</code> của máy mới, rồi mới resume.",
      "Phiên lưu hội thoại (prompt, tool call, kết quả tool, câu trả lời), không lưu hệ thống file. File agent ghi ra vẫn chỉ nằm trên đĩa của máy cũ.",
      "<code>--continue</code> mở phiên gần nhất trong thư mục hiện tại, trên máy hiện tại. <code>--resume &lt;tên hoặc ID&gt;</code> mở đúng phiên chỉ định, nhưng file phiên phải có trên máy đó."
    ],
    opts: [
      { k: "A", gist: "Run <code>claude --continue</code> inside the cloned repository on the laptop.",
        why: [
          "Sai ở giả định: <code>--continue</code> chỉ tìm phiên gần nhất trên chính laptop (ý 4). Phiên <code>api-trace</code> chưa từng chạy ở đó.",
          "Kết quả là mở một phiên khác trên laptop, hoặc báo không có phiên nào để tiếp. Không tới được phiên cần tìm."
        ] },
      { k: "B", gist: "Copy the session's <code>.jsonl</code> transcript into the laptop's local session storage, then run <code>claude --resume api-trace</code> there.",
        why: [
          "Lo phần lịch sử hội thoại. File phiên chỉ có trên máy bàn (ý 1), nên phải chép nó vào chỗ lưu phiên của laptop trước (ý 2).",
          "Có file rồi thì <code>--resume api-trace</code> tìm ra đúng phiên theo tên và nạp lại toàn bộ lịch sử."
        ] },
      { k: "C", gist: "Bring the scratch file over to the laptop through git or an ordinary file transfer.",
        why: [
          "Lo phần file trên đĩa. Phiên không chứa nội dung file (ý 3), nên file nháp chưa commit không tự đi theo transcript.",
          "Thiếu bước này thì transcript nhắc tới một file không có trên laptop. Agent tưởng còn kết quả cũ để đọc lại mà đọc không ra.",
          "B và C là hai nửa: B mang hội thoại, C mang file."
        ] },
      { k: "D", gist: "Run <code>claude --resume api-trace</code> on the laptop with no other step, letting the signed-in account resolve the session name.",
        why: [
          "Sai ở giả định: phiên không đồng bộ qua tài khoản. Tên phiên chỉ tìm ra được trên máy có file transcript (ý 1).",
          "Trên laptop chưa có file đó, nên lệnh không tìm thấy phiên <code>api-trace</code>.",
          "Dễ bị cuốn vì <code>--resume &lt;tên&gt;</code> đúng là lệnh mở lại phiên có tên. Nhưng nó chỉ chạy được trên máy đã lưu phiên. Đây là nửa sau của B, thiếu nửa đầu."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Biết thêm”: --continue khác --resume; file phiên chỉ nằm trên máy đã chạy", href: NOTES + "#l-1-7" },
      { label: "Docs Agent SDK sessions, mục Resume across hosts: chép file .jsonl sang ~/.claude/projects/ của máy mới; phiên lưu hội thoại, không lưu hệ thống file", href: "https://code.claude.com/docs/en/agent-sdk/sessions" }
    ]
  },
  {
    de: 8, n: 6, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code", scen: "S4",
    answer: "C",
    ask: "An engineer dismissed the approval prompt for the project-scoped servers in the committed <code>.mcp.json</code>. Those servers' tools no longer show up in that engineer's interactive Claude Code sessions, though teammates see them. The team wants every engineer to use the shared server definitions. What should the engineer do?",
    scene: [
      "Repo có <code>.mcp.json</code> đã commit, khai các MCP server dùng chung cho team (scope project).",
      "Một kỹ sư đã gạt đi (dismiss) hộp hỏi duyệt các server này. Từ đó, trong phiên tương tác của người này không có tool nào của các server đó. Đồng đội thì vẫn thấy đủ.",
      "Team muốn mọi người dùng chung đúng bộ định nghĩa server trong repo.",
      "Chỗ khó: cấu hình không sai, vì đồng đội vẫn dùng được. Thứ khác nhau nằm ở lựa chọn riêng của người này."
    ],
    asks: [
      "Kỹ sư nên làm gì?",
      "Tức là: xóa lựa chọn “không duyệt” mà Claude Code đã nhớ cho người này, rồi duyệt lại, không đụng tới cấu hình chung.",
      "Soi từng phương án: nó có đụng vào lựa chọn duyệt đã lưu không? Nó có giữ người này trên đúng file <code>.mcp.json</code> chung không?"
    ],
    facts: [
      "Server trong <code>.mcp.json</code> chạy lệnh trên máy mình, nên trong phiên tương tác Claude Code hỏi từng người có bật không, và nhớ câu trả lời. Chưa duyệt thì server chưa kết nối.",
      "<code>claude mcp reset-project-choices</code> xóa các lựa chọn duyệt hay từ chối đã lưu cho project. Phiên sau, hộp hỏi duyệt hiện lại.",
      "Server khai trong <code>~/.claude.json</code> (scope user) là cấu hình riêng của một người, không đi theo repo.",
      "<code>claude mcp add --scope project</code> ghi server vào <code>.mcp.json</code> để cả team dùng. Lệnh này chỉ ghi file cấu hình."
    ],
    opts: [
      { k: "A", gist: "Run <code>claude mcp add --scope project</code> again for each server so the entries in <code>.mcp.json</code> are rewritten.",
        why: [
          "Sửa nhầm chỗ: các entry trong <code>.mcp.json</code> vốn đúng, đồng đội vẫn dùng được (ý 4).",
          "Ghi lại y hệt cấu hình cũ không xóa lựa chọn từ chối mà Claude Code đã nhớ cho người này (ý 1). Tool vẫn không hiện."
        ] },
      { k: "B", gist: "Export the servers' tokens under new variable names, because Claude Code reads some credential variables as empty.",
        why: [
          "Sai chẩn đoán: nếu lỗi nằm ở biến chứa token thì cả team dùng chung <code>.mcp.json</code> đều hỏng. Đồng đội vẫn thấy tool, nên lỗi không nằm ở cấu hình.",
          "Đề đã kể rõ nguyên nhân: người này gạt hộp hỏi duyệt."
        ] },
      { k: "C", gist: "Run <code>claude mcp reset-project-choices</code>, then approve the project-scoped servers when prompted again.",
        why: [
          "Đúng gốc: Claude Code đã nhớ lựa chọn từ chối của người này (ý 1). Reset thì hộp hỏi duyệt hiện lại ở phiên sau (ý 2).",
          "Duyệt xong là kết nối lại đúng các server khai trong <code>.mcp.json</code> chung. Về sau team sửa file đó thì người này cũng nhận được, không phải làm gì thêm."
        ] },
      { k: "D", gist: "Copy the server definitions into <code>~/.claude.json</code> at user scope so they load without project approval.",
        why: [
          "Chạy được: server scope user không phải qua hộp hỏi duyệt của project.",
          "Nhưng đó là bản sao riêng (ý 3). Team đổi <code>.mcp.json</code> thì bản này lệch dần. Trái mục tiêu “every engineer to use the shared server definitions” (mọi người dùng chung một bộ định nghĩa).",
          "Dễ bị cuốn vì nó né được hộp hỏi duyệt. Nhưng né không phải sửa: lựa chọn từ chối vẫn còn đó, và giờ có hai bộ cấu hình."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, mục “Biết thêm” (đã sửa 03/11): server .mcp.json phải được từng người duyệt; reset-project-choices để được hỏi lại", href: NOTES + "#fix-22" },
      { label: "Bài 2.4: ba scope MCP, --scope project cho team, ~/.claude.json cho cá nhân", href: NOTES + "#l-2-4" },
      { label: "Docs Connect Claude Code to tools via MCP: hỏi duyệt server project trong phiên tương tác, lệnh reset-project-choices", href: "https://code.claude.com/docs/en/mcp" }
    ]
  },
  {
    de: 8, n: 7, total: 60, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool", scen: "S4",
    answer: "D",
    ask: "When the MCP tool <code>get_project_metadata</code> fails, it returns the text “Operation failed” with <code>isError</code> set to true. Logs show most failures happen because the agent passes a repository name where the tool expects a numeric project ID. The agent retries the identical call, then gives up. What is the correct fix?",
    scene: [
      "Tool MCP <code>get_project_metadata</code> lỗi thì trả đúng một câu “Operation failed” (thao tác thất bại), kèm <code>isError: true</code>.",
      "Log cho thấy phần lớn lỗi là do agent truyền tên repo, trong khi tool cần project ID dạng số.",
      "Agent gọi lại y hệt, rồi bỏ cuộc.",
      "Chỗ khó: cờ lỗi đã bật sẵn. Agent biết là hỏng, chỉ không biết hỏng vì sao, nên không biết phải sửa gì."
    ],
    asks: [
      "Cách sửa đúng là gì?",
      "Tức là: cho agent đủ thông tin để tự đổi tham số và gọi lại thành công.",
      "Soi từng phương án: sau khi đổi, agent có biết mình truyền sai gì và phải truyền gì không?"
    ],
    facts: [
      "Agent chọn bước tiếp theo dựa vào nội dung tool result. “Operation failed” không chứa thông tin: không biết lỗi tạm thời hay vĩnh viễn, do mình gửi sai hay do luật.",
      "Cờ <code>isError: true</code> chỉ nói “hỏng”. Nội dung lỗi phải nói rõ loại lỗi và mô tả dễ hiểu. Lỗi input sai (validation) thì agent phải sửa input rồi gọi lại. Gửi lại y nguyên thì không bao giờ thành công.",
      "MCP có hai kênh lỗi. Lỗi giao thức JSON-RPC dành cho request hỏng khung hay server sập. Lỗi thực thi, gồm cả input sai, trả trong tool result với <code>isError: true</code>. Spec ghi client nên đưa lỗi thực thi cho model để nó tự sửa.",
      "Retry có backoff (chờ lâu dần giữa các lần thử) hợp với lỗi tạm thời như timeout, 503."
    ],
    opts: [
      { k: "A", gist: "Turn the failure into a JSON-RPC protocol error instead of a tool result, so the host application can deal with it.",
        why: [
          "Sai kênh: input sai là lỗi thực thi, thuộc kênh <code>isError</code> mà model đọc để tự sửa (ý 3).",
          "Đẩy sang lỗi giao thức là đưa lỗi ra khỏi chỗ model chắc chắn thấy. Agent càng khó tự sửa hơn, chứ không dễ hơn."
        ] },
      { k: "B", gist: "Return each failure with the MCP <code>isError</code> flag set, so the agent recognizes the response as an error rather than tool output.",
        why: [
          "Đề nói tool đã trả <code>isError: true</code> rồi. Phương án này không đổi gì.",
          "Agent đã biết là hỏng. Thứ thiếu là lý do, và cờ không chứa lý do (ý 2).",
          "Dễ bị cuốn vì đặt cờ lỗi đúng là việc nên làm. Nhưng đọc kỹ đề: cờ đã có sẵn."
        ] },
      { k: "C", gist: "Retry transient failures inside the MCP server with backoff, and return only the failures that remain after retrying.",
        why: [
          "Sai loại lỗi: retry có backoff dành cho lỗi tạm thời (ý 4). Log cho thấy lỗi chủ yếu là input sai kiểu.",
          "Gửi lại đúng tham số sai thì lần nào cũng hỏng. Server chỉ đốt thêm mấy lần thử, rồi vẫn trả “Operation failed” như cũ."
        ] },
      { k: "D", gist: "Rewrite the error message to say what caused the failure and which input format the tool expects, so the agent can correct its call.",
        why: [
          "Sửa đúng thứ thiếu: nội dung lỗi (ý 1, ý 2).",
          "Ví dụ: “Invalid identifier: expected a numeric project ID” (định danh sai, cần project ID dạng số). Agent đọc là biết mình truyền tên repo sai chỗ, đổi sang ID số rồi gọi lại.",
          "Lỗi vẫn đi kênh <code>isError</code>, đúng kênh model đọc (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 2.2, mục “Chuyện gì đang xảy ra”: “Operation failed” không chứa thông tin; lỗi validation thì sửa input rồi gọi lại", href: NOTES + "#l-2-2" },
      { label: "Bài 2.2, ô “Đã sửa 02/11”: hai kênh lỗi MCP, input sai trả qua isError để model tự sửa", href: NOTES + "#fix-13" },
      { label: "Cheatsheet D2: dòng “Tool trả Operation failed cho mọi lỗi”", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 8, n: 8, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S4",
    answer: "A",
    ask: "An Agent SDK session holds a completed diagnosis of a recurring billing-sync incident. The backend records that diagnosis examined have not changed since. The team wants to try two remediation playbooks, each starting from that diagnosis, without either run seeing the other's steps. How should each run be launched?",
    scene: [
      "Một phiên Agent SDK đã chẩn đoán xong một sự cố billing-sync (đồng bộ thanh toán) hay tái diễn.",
      "Dữ liệu backend mà bản chẩn đoán đã xem vẫn chưa đổi. Tức là kết quả tool trong phiên vẫn còn đúng.",
      "Team muốn thử hai playbook (kịch bản xử lý), cái nào cũng xuất phát từ bản chẩn đoán đó. Lượt chạy này không được thấy các bước của lượt kia."
    ],
    asks: [
      "Mỗi lượt chạy nên khởi động thế nào?",
      "Tức là: hai phiên riêng, phiên nào cũng có trọn bản chẩn đoán, không phiên nào ghi vào lịch sử của phiên kia.",
      "Soi từng phương án: bản chẩn đoán có được giữ trọn không? Hai lượt có ghi chung một transcript không?"
    ],
    facts: [
      "Resume mở lại đúng phiên cũ và ghi lượt mới vào chính phiên đó.",
      "Fork (đặt <code>resume</code> kèm <code>fork_session=True</code> ở Python, <code>forkSession: true</code> ở TypeScript) tạo phiên mới bắt đầu từ bản sao lịch sử phiên gốc. Fork có ID riêng, phiên gốc giữ nguyên.",
      "Fork tách nhánh hội thoại, không tách hệ thống file. Git worktree (một bản checkout riêng trên nhánh riêng) thì ngược lại: tách file, không tách hội thoại.",
      "Phiên mới kèm bản tóm tắt là cách dành cho lúc phần lớn kết quả tool cũ đã lỗi thời. Bản tóm tắt là bản rút gọn, dễ rơi chi tiết."
    ],
    opts: [
      { k: "A", gist: "Launch each playbook run with the diagnosis session's ID as <code>resume</code> and <code>fork_session</code> set to true, so each run writes to its own new session ID.",
        why: [
          "Mỗi lần resume kèm <code>fork_session</code> tạo một phiên mới mang trọn bản chẩn đoán (ý 2). Làm hai lần là có hai nhánh cùng gốc.",
          "Mỗi nhánh có ID riêng, bước của playbook này không lọt sang playbook kia. Phiên chẩn đoán gốc vẫn sạch, muốn fork thêm lần nữa cũng được.",
          "Dữ liệu chưa đổi nên giữ nguyên bản chẩn đoán là đúng, không có gì lỗi thời cần bỏ."
        ] },
      { k: "B", gist: "Launch both playbook runs with the diagnosis session's ID as <code>resume</code> and <code>fork_session</code> left false, so both reuse the saved diagnosis history.",
        why: [
          "Thiếu fork: resume ghi tiếp vào chính phiên chẩn đoán (ý 1).",
          "Lượt thứ hai mở lại một phiên đã chứa các bước của playbook thứ nhất. Hai lượt nhiễm lẫn nhau, mất luôn cái gốc sạch."
        ] },
      { k: "C", gist: "Run each playbook in its own git worktree while resuming the same diagnosis session ID, so the separate file trees keep the runs apart.",
        why: [
          "Sai thứ cần tách: worktree tách file, không tách hội thoại (ý 3).",
          "Cả hai lượt vẫn resume cùng một ID, ghi chung một transcript. Playbook này vẫn thấy bước của playbook kia.",
          "Dễ bị cuốn vì worktree đúng là cách cách ly khi chạy song song. Nhưng nó cách ly file sửa, còn đề cần cách ly lịch sử."
        ] },
      { k: "D", gist: "Launch each playbook run as a fresh session seeded with a structured summary of the diagnosis, so neither run carries outdated tool results.",
        why: [
          "Sai tình huống: cách này dành cho lúc kết quả tool cũ đã lỗi thời (ý 4). Đề nói rõ dữ liệu backend chưa đổi.",
          "Hai nhánh tách nhau thật, nhưng bản tóm tắt làm rơi chi tiết của bản chẩn đoán. Fork mang trọn chi tiết sang cả hai nhánh mà không tốn thêm gì."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Ba cách nối lại công việc”: resume, fork, phiên mới kèm tóm tắt", href: NOTES + "#l-1-7" },
      { label: "Cheatsheet D1: dòng “So sánh hai hướng từ cùng một bản phân tích” → fork_session", href: NOTES + "#cheat-d1" },
      { label: "Docs Agent SDK sessions, mục Fork to explore alternatives: fork có ID riêng, phiên gốc giữ nguyên; fork tách hội thoại, không tách file", href: "https://code.claude.com/docs/en/agent-sdk/sessions" }
    ]
  },
  {
    de: 8, n: 9, total: 60, sub: "3.6", subName: "Đưa Claude Code vào CI/CD", scen: "S4",
    answer: "A",
    ask: "A script runs <code>claude -p</code> with <code>--output-format json</code> to inventory legacy modules. The JSON it gets back holds only prose in its <code>result</code> field, and the dashboard rejects any data that deviates from the inventory schema. Which change fixes this?",
    scene: [
      "Một script chạy <code>claude -p</code> kèm <code>--output-format json</code> để kiểm kê các module cũ.",
      "JSON trả về chỉ có đoạn văn xuôi trong trường <code>result</code>.",
      "Dashboard từ chối mọi dữ liệu lệch schema kiểm kê. Lệch một lần là hỏng một lần.",
      "Chỗ khó: output đã là JSON rồi, sao vẫn hỏng? Vì JSON ở đây chỉ là cái vỏ bọc ngoài câu trả lời."
    ],
    asks: [
      "Đổi gì để sửa?",
      "Tức là: câu trả lời phải đúng schema kiểm kê ở mọi lần chạy, chứ không chỉ được bọc trong JSON.",
      "Soi từng phương án: nó ép nội dung theo schema, hay chỉ đổi cách in, hay chỉ dặn model?"
    ],
    facts: [
      "<code>--output-format json</code> chỉ đổi cái vỏ: CLI in ra một object JSON, câu trả lời nằm trong <code>.result</code>, kèm metadata như <code>session_id</code>. Nội dung trong <code>.result</code> vẫn là chữ model tự viết.",
      "<code>--json-schema</code> bắt kết quả phải theo đúng cấu trúc JSON do mình khai. Có nó thì dữ liệu nằm ở <code>.structured_output</code>.",
      "<code>--output-format stream-json</code> chỉ đổi cách in: stream từng sự kiện dạng JSON. Nó không kiểm nội dung theo schema nào.",
      "CLAUDE.md và lời dặn trong prompt là chỉ dẫn: Claude làm theo phần lớn thời gian, nhưng vẫn là xác suất."
    ],
    opts: [
      { k: "A", gist: "Add <code>--json-schema</code> with the inventory schema and read the validated data from the <code>structured_output</code> field.",
        why: [
          "Đúng cơ chế: <code>--json-schema</code> ép kết quả theo schema kiểm kê, dữ liệu nằm ở <code>.structured_output</code> (ý 2).",
          "Script đọc thẳng trường đó đưa vào dashboard, không phải bóc JSON ra từ văn xuôi.",
          "Đi cùng <code>--output-format json</code> đang có: vỏ JSON vẫn giữ, chỉ thêm phần ruột đúng schema."
        ] },
      { k: "B", gist: "Put the inventory schema in the project <code>CLAUDE.md</code> so every CI invocation loads it as shared context.",
        why: [
          "CLAUDE.md là chỉ dẫn, không phải bước kiểm (ý 4). Model hiểu schema hơn, nhưng <code>.result</code> vẫn là chữ model tự viết (ý 1).",
          "Vẫn có lần lệch, và dashboard từ chối đúng những lần đó."
        ] },
      { k: "C", gist: "Switch to <code>--output-format stream-json</code> so the pipeline receives each event as parseable JSON.",
        why: [
          "Sai việc: stream-json dành cho ai cần theo dõi từng sự kiện lúc đang chạy (ý 3).",
          "Mỗi sự kiện parse được, nhưng câu trả lời cuối vẫn không bị ép theo schema. Dashboard vẫn hỏng."
        ] },
      { k: "D", gist: "Add schema instructions and an example output to the prompt, then parse the JSON out of the <code>result</code> field.",
        why: [
          "Lời dặn và ví dụ mẫu tăng tỷ lệ ra đúng dạng, nhưng không bảo đảm (ý 4).",
          "<code>.result</code> vẫn là chữ tự do (ý 1). Có lần model thêm câu dẫn hay đổi tên trường, bóc JSON ra là hỏng hoặc lệch schema.",
          "Dễ bị cuốn vì cách này chạy đúng phần lớn số lần. Nhưng dashboard từ chối mọi lần lệch, còn CLI đã có sẵn cách ép."
        ] }
    ],
    refs: [
      { label: "Bài 3.6, mục “Biết thêm”: đọc output đúng trường, .result hay .structured_output khi có --json-schema", href: NOTES + "#l-3-6" },
      { label: "Cheatsheet D3: dòng “Cần JSON để đăng inline PR comment” → --output-format json --json-schema", href: NOTES + "#cheat-d3" },
      { label: "Docs Run Claude Code programmatically: --json-schema và trường structured_output", href: "https://code.claude.com/docs/en/headless" }
    ]
  },
  {
    de: 8, n: 10, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S4",
    answer: "C",
    ask: "Early in a long session Claude read <code>src/api/schema.ts</code>, and you agreed on handler conventions that are still valid. A teammate's git merge then changed that file on disk. Claude keeps generating handlers that match the old schema fields. What should the engineer do next?",
    scene: [
      "Đầu một phiên dài, Claude đã Read <code>src/api/schema.ts</code>. Hai bên cũng đã chốt quy ước viết handler, quy ước đó vẫn đúng.",
      "Sau đó đồng đội merge git, file <code>schema.ts</code> trên đĩa đổi.",
      "Claude vẫn sinh handler theo các trường của schema cũ.",
      "Chỗ khó: chỉ một file lỗi thời, phần còn lại của phiên vẫn đúng. Cách sửa phải vừa tay: làm mới đúng file đó, giữ phần còn lại."
    ],
    asks: [
      "Kỹ sư nên làm gì tiếp?",
      "Tức là: đưa nội dung hiện tại của <code>schema.ts</code> vào context, không vứt các quy ước đã chốt.",
      "Soi từng phương án: sau bước đó, Claude có chắc chắn thấy bản mới của file không? Phần còn đúng của phiên có giữ được không?"
    ],
    facts: [
      "Kết quả Read là một tool result tĩnh nằm trong lịch sử. File trên đĩa đổi thì bản đã đọc trong context không tự cập nhật. Notes gọi đây là kết quả tool lỗi thời (stale), và đề kể rõ hậu quả: Claude vẫn sinh code theo bản cũ.",
      "Chỉ vài file đổi thì giữ phiên, nói rõ file nào đã đổi để Claude đọc lại đúng file đó. Phần lớn kết quả tool đã lỗi thời mới mở phiên mới kèm bản tóm tắt.",
      "Gõ <code>@đường/dẫn</code> trong prompt thì Claude Code đưa nội dung hiện tại của file vào hội thoại, khi file vừa giới hạn của Read (mặc định 25.000 token).",
      "<code>/compact</code> thay hội thoại bằng bản tóm tắt, rồi đọc lại tối đa năm file đã đọc hoặc sửa, ưu tiên file đổi gần nhất. File trên 5.000 token chỉ còn đường dẫn, không có nội dung."
    ],
    opts: [
      { k: "A", gist: "Start a new session seeded with a summary of the agreed conventions, because the session's earlier file reads are now stale.",
        why: [
          "Sai mức độ: phiên mới kèm tóm tắt dành cho lúc phần lớn kết quả tool đã lỗi thời (ý 2). Ở đây chỉ một file đổi, quy ước vẫn đúng.",
          "Bỏ cả một phiên còn đúng gần hết để sửa một file là trả giá quá đắt. Bản tóm tắt còn làm rơi chi tiết của các quy ước đã chốt."
        ] },
      { k: "B", gist: "Run <code>/compact</code> before the next request so the stale schema read is compressed out of context before new code is generated.",
        why: [
          "Compact là công cụ giảm kích thước context, không phải công cụ làm mới file. Bản tóm tắt vẫn có thể mang các trường schema cũ.",
          "Sau compact, Claude Code có đọc lại vài file gần đây (ý 4), nhưng không bảo đảm file này được nạp đủ nội dung: file to chỉ còn đường dẫn.",
          "Dễ bị cuốn vì nghe như “dọn cái cũ đi” là xong. Nhưng nén cái cũ lại không đưa được cái mới vào."
        ] },
      { k: "C", gist: "Mention <code>src/api/schema.ts</code> with an @ reference in the next prompt so Claude reads the current file from disk before generating.",
        why: [
          "Đúng cách notes dặn: nói rõ file nào đã đổi để Claude đọc lại đúng file đó (ý 2).",
          "<code>@src/api/schema.ts</code> đưa nội dung hiện tại của file vào hội thoại (ý 3). Handler tiếp theo sinh theo schema mới, không theo bản cũ còn nằm trong lịch sử (ý 1).",
          "Một lần đọc, đúng một file. Các quy ước đã chốt vẫn nằm nguyên trong phiên."
        ] },
      { k: "D", gist: "Open the rewind menu and restore a checkpoint from before the schema change, then send the generation request again.",
        why: [
          "Sai cơ chế: checkpoint chỉ theo dõi file Claude sửa bằng tool sửa file của nó. Thay đổi đến từ git merge nằm ngoài Claude Code, rewind không thấy.",
          "Lùi hội thoại về trước cũng không đưa được nội dung schema mới vào context. Claude vẫn không biết file đã đổi."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Ba cách nối lại công việc”: code đổi một phần thì nói rõ file nào đã đổi để agent đọc lại", href: NOTES + "#l-1-7" },
      { label: "Bài 1.7, ô “Đã sửa 02/11”: checkpoint chỉ theo dõi file Claude sửa bằng tool sửa file", href: NOTES + "#fix-12" },
      { label: "Docs Common workflows, mục Reference files and directories: @ đưa nội dung file vào hội thoại", href: "https://code.claude.com/docs/en/common-workflows" },
      { label: "Docs Explore the context window, mục What survives compaction: đọc lại tối đa năm file, file trên 5.000 token chỉ còn đường dẫn", href: "https://code.claude.com/docs/en/context-window" }
    ]
  },
  {
    de: 8, n: 11, total: 60, sub: "1.6", subName: "Chia việc lớn", scen: "S4",
    answer: "D",
    ask: "The codebase overview feature always launches the same five subagents in parallel, each assigned to a typical web service area. When engineers run it on new kinds of repositories, several subagents come back with nothing while the parts that actually matter are never investigated. What should the team change?",
    scene: [
      "Tính năng tổng quan codebase lúc nào cũng bật đúng năm subagent chạy song song. Mỗi subagent lo một vùng quen thuộc của một web service.",
      "Engineer đem nó chạy trên những loại repo mới. Kết quả: vài subagent không tìm thấy gì, còn những phần quan trọng thì không ai điều tra.",
      "Chỗ khó: năm việc con được chia sẵn trước khi nhìn repo. Repo mới không khớp khuôn đó, và loại repo mới thì cứ xuất hiện thêm."
    ],
    asks: [
      "Team nên đổi gì?",
      "Tức là: việc con phải được chia theo chính repo đang xem, không theo một danh sách soạn trước.",
      "Soi từng phương án: nó còn giữ danh sách việc con cố định không, dù là danh sách dài hơn, chia theo loại, hay chạy lần lượt?"
    ],
    facts: [
      "Parallelization (chạy song song): các việc con độc lập, biết trước, chạy cùng lúc rồi gộp kết quả. Chỉ hợp khi liệt kê được việc con trước khi chạy.",
      "Routing (định tuyến): phân loại đầu vào rồi gửi sang nhánh chuyên xử lý loại đó. Hợp khi đầu vào chia thành vài loại rõ ràng, ổn định.",
      "Orchestrator-workers (điều phối và thợ): một model chia việc lúc chạy, giao cho các worker rồi tổng hợp. Dùng khi không đoán trước được cần những việc con nào.",
      "Coordinator chọn subagent theo từng đầu vào, không phải lần nào cũng chạy đủ bộ. Guide gọi là dynamic selection (chọn động)."
    ],
    opts: [
      { k: "A", gist: "Add more fixed subagents for other common kinds of codebase and run the whole enlarged set in parallel on every repository.",
        why: [
          "Vẫn là danh sách việc con soạn trước, chỉ dài hơn (ý 1). Loại repo mới vẫn xuất hiện, nên vẫn có vùng không ai xem.",
          "Còn tốn hơn: repo nào cũng chạy cả bộ, kể cả những subagent chắc chắn không tìm thấy gì. Đúng kiểu “lần nào cũng chạy đủ bộ” (ý 4).",
          "Dễ bị cuốn vì nghe như vá đúng chỗ thiếu. Nhưng đây là chạy đua với độ đa dạng của repo, và không bao giờ đuổi kịp."
        ] },
      { k: "B", gist: "Insert a routing step that classifies each repository as a known type and then runs the subagent set predefined for that type.",
        why: [
          "Routing là mẫu thật, nhưng nó cần các loại đầu vào ổn định, biết trước (ý 2).",
          "Đề nói loại repo mới cứ xuất hiện. Mỗi loại mới lại cần một bộ subagent soạn tay, nên bảng phân loại luôn đi sau thực tế.",
          "Dễ bị cuốn vì có thêm một bước “thông minh” trước khi chạy. Nhưng việc con vẫn tra từ danh mục, không suy ra từ repo."
        ] },
      { k: "C", gist: "Run the five subagents one after another so each can read the previous one's findings before it starts.",
        why: [
          "Đổi thứ tự chạy, không đổi việc gì được chạy. Vẫn đúng năm vùng web service cũ, nên phần quan trọng vẫn không ai đụng.",
          "Còn chậm hơn: năm việc độc lập bị xếp hàng, mất cái lợi của chạy song song (ý 1)."
        ] },
      { k: "D", gist: "Have a coordinator examine each repository first and decide, from what it finds, which investigation subagents to launch.",
        why: [
          "Đây là orchestrator-workers (ý 3): coordinator nhìn repo trước, rồi mới chia việc con theo cái nó thấy.",
          "Repo cần vùng nào thì chỉ bật subagent cho vùng đó (ý 4). Không có subagent chạy không, không có vùng quan trọng bị bỏ.",
          "Cái giá là thêm một bước coordinator khảo sát repo trước khi giao việc. Đáng, vì ở đây việc con không thể liệt kê trước."
        ] }
    ],
    refs: [
      { label: "Bài 1.6, mục “Biết thêm” (đã sửa 02/11): năm mẫu workflow; orchestrator-workers cho việc không đoán trước được việc con", href: NOTES + "#fix-17" },
      { label: "Bài 1.2, mục “Chuyện gì đang xảy ra”: coordinator chọn subagent theo từng câu hỏi (dynamic selection)", href: NOTES + "#l-1-2" },
      { label: "Anthropic, Building effective agents: parallelization, routing, orchestrator-workers", href: "https://www.anthropic.com/engineering/building-effective-agents" }
    ]
  },
  {
    de: 8, n: 12, total: 60, sub: "3.3", subName: "Rule theo đường dẫn trong .claude/rules", scen: "S4",
    answer: "D",
    ask: "Terraform files are spread across many directories of the codebase: <code>infra/</code>, <code>modules/</code>, and a <code>terraform/</code> folder inside each service. The team wants the Terraform conventions to load automatically, but only while the agent is editing those files. What should the team create?",
    scene: [
      "File Terraform (code hạ tầng) nằm rải rác: <code>infra/</code>, <code>modules/</code>, và một thư mục <code>terraform/</code> trong từng service.",
      "Team muốn quy ước Terraform tự nạp, nhưng chỉ khi agent đang sửa đúng mấy file đó. Làm việc khác thì quy ước không chiếm context.",
      "Chỗ khó: file nằm ở nhiều thư mục, không gom một chỗ. Cách nào gắn với một thư mục sẽ phải nhân bản ra nhiều nơi."
    ],
    asks: [
      "Team nên tạo cái gì?",
      "Tức là: một chỗ đặt quy ước vừa tự nạp, vừa chỉ nạp khi đụng file Terraform, ở bất kỳ thư mục nào.",
      "Soi từng phương án theo hai câu: nạp lúc nào (mọi phiên, khi có người gọi, hay khi đụng file khớp)? Một bản có phủ được mọi thư mục không?"
    ],
    facts: [
      "Rule trong <code>.claude/rules/</code> có frontmatter <code>paths</code> (danh sách glob) chỉ nạp khi Claude đọc hoặc sửa file khớp glob. Khớp theo tên file, không theo thư mục, nên một glob như <code>**/*.tf</code> phủ file ở mọi chỗ.",
      "CLAUDE.md gốc nạp ở mọi phiên. CLAUDE.md theo thư mục bị buộc vào thư mục của nó: file rải nhiều thư mục thì phải đặt nhiều bản và giữ chúng giống nhau.",
      "Skill chỉ nạp nội dung khi được dùng: người gõ <code>/tên-skill</code>, hoặc Claude thấy việc khớp mô tả của skill. Nó không gắn với file đang sửa."
    ],
    opts: [
      { k: "A", gist: "Add a Terraform section to the root <code>CLAUDE.md</code> so the conventions are available to every session from the start.",
        why: [
          "Sai ở lúc nạp: CLAUDE.md gốc nạp ở mọi phiên (ý 2). Phiên chỉ sửa CSS cũng gánh quy ước Terraform.",
          "Trái thẳng yêu cầu “only when” (chỉ khi) agent sửa file Terraform."
        ] },
      { k: "B", gist: "Put a directory-level <code>CLAUDE.md</code> in every folder that holds Terraform files so the conventions load per directory.",
        why: [
          "Chạy được: CLAUDE.md theo thư mục là cơ chế thật. Nhưng nó buộc vào từng thư mục (ý 2).",
          "File Terraform nằm ở <code>infra/</code>, <code>modules/</code> và trong mọi service, nên phải chép cùng một nội dung ra nhiều bản rồi giữ chúng khớp nhau. Service mới thêm vào là dễ quên.",
          "Dễ bị cuốn vì nó cũng nạp có điều kiện. Nhưng điều kiện là thư mục, còn đề cần điều kiện là loại file."
        ] },
      { k: "C", gist: "Create a skill in <code>.claude/skills/</code> that engineers invoke whenever they begin Terraform work.",
        why: [
          "Sai ở chữ “automatically” (tự động): skill chỉ nạp khi được dùng (ý 3), ở đây là engineer phải nhớ gọi.",
          "Phiên nào quên gọi thì quy ước vắng mặt hoàn toàn. Quy ước phải áp cho mọi lần sửa file lại thành tùy người nhớ."
        ] },
      { k: "D", gist: "Add a rule file under <code>.claude/rules/</code> whose YAML frontmatter has a <code>paths</code> glob matching every Terraform file.",
        why: [
          "Rule có <code>paths</code> chỉ nạp khi Claude đọc hoặc sửa file khớp glob (ý 1). Làm việc khác thì quy ước không nằm trong context.",
          "Một file, một glob (ví dụ <code>**/*.tf</code>) phủ file Terraform ở mọi thư mục, kể cả service mới. Không phải chép nhiều bản.",
          "Thỏa cả hai điều đề đòi: tự nạp, và chỉ nạp khi đụng file Terraform."
        ] }
    ],
    refs: [
      { label: "Bài 3.3: rule có paths nạp theo tên file, không theo thư mục; CLAUDE.md theo thư mục bị buộc vào thư mục", href: NOTES + "#l-3-3" },
      { label: "Bài 3.2, khung định nghĩa “Skill”: đầu phiên chỉ có mô tả, nội dung nạp khi skill được dùng", href: NOTES + "#l-3-2" },
      { label: "Docs “How Claude remembers your project”, mục rules: rule có paths chỉ nạp khi Claude làm việc với file khớp", href: "https://code.claude.com/docs/en/memory" }
    ]
  },
  {
    de: 8, n: 13, total: 60, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool", scen: "S4",
    answer: "D",
    ask: "An MCP tool that calls an internal code-search API sometimes times out, even though the tool name and the arguments in the call are valid. The agent needs to see every timeout so it can fall back to Grep. How should the server report the failure?",
    scene: [
      "Một MCP tool gọi API tìm code nội bộ. Thỉnh thoảng API đó timeout (quá thời gian chờ).",
      "Tên tool và tham số của lệnh gọi đều hợp lệ. Chỗ hỏng là dịch vụ phía sau.",
      "Agent cần thấy từng lần timeout để chuyển sang Grep (tool tìm nội dung có sẵn).",
      "Chỗ khó: MCP có hai kênh lỗi. Chọn sai kênh, hoặc giấu lỗi, thì agent không biết để đổi hướng."
    ],
    asks: [
      "Server nên trả lỗi này thế nào?",
      "Tức là: chọn kênh lỗi mà model chắc chắn đọc được, và cho model nhận ra đó là lỗi chứ không phải kết quả.",
      "Soi từng phương án: lỗi đi kênh nào, và model có phân biệt được “timeout” với “tìm xong, không có gì” không?"
    ],
    facts: [
      "MCP có hai kênh lỗi. Lỗi giao thức JSON-RPC dành cho tool không tồn tại, request sai schema của <code>tools/call</code>, server sập. Spec chỉ ghi client MAY (có thể) đưa lỗi này cho model.",
      "Lỗi thực thi (tool chạy mà hỏng: input sai, dịch vụ phía sau hỏng, vi phạm policy) trả trong kết quả tool với <code>isError: true</code>. Spec ghi client SHOULD (nên) đưa loại này cho model để nó tự xử.",
      "Timeout là access failure (không truy cập được), khác valid empty result (tìm xong, thật sự không khớp gì). Trả timeout như kết quả rỗng là giấu lỗi."
    ],
    opts: [
      { k: "A", gist: "Return a successful result whose text holds a JSON object with an <code>error</code> field for the agent to parse.",
        why: [
          "Có thông tin lỗi, nhưng gói trong một kết quả thành công. Model phải tự suy ra “đây là lỗi” từ chữ trong nội dung.",
          "Cờ <code>isError</code> mới là tín hiệu lỗi chuẩn của MCP (ý 2). Bỏ cờ là bỏ cách chắc nhất để model biết lần gọi đã hỏng.",
          "Dễ bị cuốn vì có JSON lỗi, nghe giống lỗi có cấu trúc mà guide khen. Nhưng các trường đó phải đi kèm <code>isError: true</code>, không thay cho nó."
        ] },
      { k: "B", gist: "Retry the upstream call inside the server, and once the retries are used up, return an empty successful result.",
        why: [
          "Retry tại chỗ với lỗi tạm thời là hợp lý. Chỗ sai là sau đó trả rỗng như thể thành công.",
          "Agent thấy rỗng thì tưởng tìm xong, không có gì khớp (ý 3). Nó không biết đã có timeout, nên không chuyển sang Grep, đúng điều đề muốn tránh."
        ] },
      { k: "C", gist: "Have the <code>tools/call</code> handler return a JSON-RPC error response with an error code and a message describing the timeout.",
        why: [
          "Sai kênh: lỗi giao thức dành cho tool không tồn tại, request sai schema, server sập (ý 1). Đề nói rõ tên tool và tham số hợp lệ.",
          "Spec không bảo đảm client đưa lỗi giao thức cho model. Agent có thể không thấy timeout, nên không biết để đổi sang Grep.",
          "Dễ bị cuốn vì JSON-RPC error có mã lỗi, nghe chính quy. Nhưng nó dành cho request hỏng, không phải cho tool đã chạy rồi gặp dịch vụ phía sau hỏng."
        ] },
      { k: "D", gist: "Return a tool result with <code>isError</code> set to true and a message that describes the timeout.",
        why: [
          "Timeout của dịch vụ phía sau là lỗi thực thi, đi đúng kênh <code>isError: true</code> (ý 2). Kết quả này vào context cho model đọc.",
          "Model thấy cờ lỗi và câu mô tả, nên biết đây là timeout chứ không phải rỗng (ý 3). Rồi nó tự chọn bước tiếp: thử lại, đổi query, hoặc chuyển sang Grep."
        ] }
    ],
    refs: [
      { label: "Bài 2.2, mục “Đã sửa 02/11”: MCP có hai kênh lỗi; model chắc chắn thấy kênh isError", href: NOTES + "#fix-13" },
      { label: "Bài 2.2, đoạn “Lỗi trong hệ nhiều agent”: access failure khác empty result hợp lệ; timeout không được trả như mảng rỗng", href: NOTES + "#l-2-2" },
      { label: "MCP spec 2026-07-28, Tools: Error Handling, hai kênh lỗi", href: "https://modelcontextprotocol.io/specification/2026-07-28/server/tools" }
    ]
  },
  {
    de: 8, n: 14, total: 60, sub: "1.5", subName: "Hook của Agent SDK: chặn tool call và chuẩn hóa dữ liệu", scen: "S4",
    answer: "C",
    ask: "As part of its automation work, the agent runs maintenance scripts through Bash. A system prompt rule says never to run commands against the production database host, yet logs show the agent occasionally does. The agent still needs Bash for its daily work on the dev database. What should the team implement?",
    scene: [
      "Agent chạy các script bảo trì qua Bash.",
      "System prompt có luật: không bao giờ chạy lệnh nhắm vào host database production (môi trường thật). Vậy mà log cho thấy thỉnh thoảng agent vẫn chạy.",
      "Chỗ khó: không cắt Bash được, vì việc hằng ngày trên database dev vẫn cần Bash. Phải chặn đúng lệnh nhắm vào production, để yên các lệnh khác."
    ],
    asks: [
      "Team nên làm gì?",
      "Tức là: một cách chặn chắc chắn, chặn trước khi lệnh chạy, và chỉ chặn lệnh nhắm vào production.",
      "Soi từng phương án theo ba câu: chạy trước hay sau lệnh? Do code thi hành hay trông vào Claude? Có giữ được Bash cho việc dev không?"
    ],
    facts: [
      "Chỉ dẫn trong system prompt là xác suất: Claude thường làm theo, nhưng tỉ lệ sai không về 0. Viết mạnh hơn, đặt lên đầu, thêm few-shot chỉ làm tỉ lệ sai giảm.",
      "Hook <code>PreToolUse</code> là code chạy sau khi Claude soạn xong tham số tool, trước khi tool chạy. Nó đọc lệnh Bash sắp chạy và trả <code>permissionDecision: \"deny\"</code> để chặn. Hook chạy mọi lần, không phụ thuộc Claude nhớ hay muốn.",
      "Hook <code>PostToolUse</code> chạy sau khi tool đã chạy xong. Hợp với việc làm sau (chuẩn hóa kết quả, đưa phản hồi cho Claude), không chặn được lệnh đã chạy.",
      "<code>disallowedTools</code> cấm hẳn cả một tool, không lọc theo nội dung lệnh."
    ],
    opts: [
      { k: "A", gist: "List Bash in the agent's <code>disallowedTools</code> so it cannot run any shell command at all.",
        why: [
          "Chặn được vi phạm, nhưng chặn luôn mọi lệnh Bash (ý 4).",
          "Đề nói agent vẫn cần Bash cho việc hằng ngày trên database dev. Cắt Bash là phá việc chính của agent.",
          "Dễ bị cuốn vì đây là cơ chế cấm thật, chắc chắn như code. Nhưng nó quá thô: đề cần lọc theo lệnh, không cần tắt cả tool."
        ] },
      { k: "B", gist: "Add a <code>PostToolUse</code> hook that scans each Bash result for the production host and reports violations back to the model.",
        why: [
          "Sai thời điểm: <code>PostToolUse</code> chạy khi lệnh đã chạy xong (ý 3). Hook thấy thì lệnh đã đụng vào production rồi.",
          "Báo cho model chỉ giúp nó biết mình vừa làm sai, không rút lại được lệnh.",
          "Dễ bị cuốn vì có chữ “hook”, trông như kiểm bằng code. Nhưng muốn chặn thì hook phải chạy <b>trước</b> lệnh."
        ] },
      { k: "C", gist: "Add a <code>PreToolUse</code> hook that inspects every Bash command and denies any call that references the production host.",
        why: [
          "<code>PreToolUse</code> chạy trước khi lệnh Bash thực thi (ý 2). Lệnh nào nhắc tới host production thì hook trả deny, lệnh không bao giờ chạy.",
          "Đây là code, chạy mọi lần, nên chặn được cả khi Claude bỏ qua luật trong prompt (ý 1).",
          "Chỉ chặn lệnh nhắm vào production. Lệnh trên database dev vẫn chạy bình thường, nên agent giữ được Bash cho việc hằng ngày."
        ] },
      { k: "D", gist: "Move the rule to the top of the system prompt and add few-shot examples showing the agent refusing production-host commands.",
        why: [
          "Vẫn là chỉ dẫn (ý 1). Đặt lên đầu và thêm ví dụ giúp Claude làm theo nhiều hơn, nhưng không thành bảo đảm.",
          "Log đã cho thấy luật viết rõ vẫn lọt. Chạy nhầm lệnh vào database production là hậu quả thật, nên cần chặn bằng code."
        ] }
    ],
    refs: [
      { label: "Bài 1.5: hook là deterministic, prompt là probabilistic; PreToolUse chạy trước tool, PostToolUse chạy sau", href: NOTES + "#l-1-5" },
      { label: "Bài 1.4, mục “Chuyện gì đang xảy ra”: prompt mạnh hơn, thêm few-shot chỉ làm tỉ lệ sai giảm, không về 0", href: NOTES + "#l-1-4" },
      { label: "Docs Hooks: PreToolUse chạy trước tool, chặn bằng permissionDecision deny", href: "https://code.claude.com/docs/en/hooks" }
    ]
  },
  {
    de: 8, n: 15, total: 60, sub: "1.4", subName: "Workflow nhiều bước có cổng chặn và bàn giao", scen: "S4",
    answer: "A",
    ask: "While tracing a bug in a legacy module, the agent gets stuck and has to escalate to an on-call engineer. On-call engineers work from a ticket queue and have no access to the agent's sessions. What should the escalation ticket contain?",
    scene: [
      "Agent đang lần theo một bug trong module cũ (legacy) thì bí, phải escalate (chuyển ca) cho engineer trực (on-call).",
      "Engineer trực làm việc từ hàng đợi ticket và không vào được các phiên của agent.",
      "Chỗ khó: ticket là kênh duy nhất. Thứ gì agent không viết vào ticket thì engineer không có."
    ],
    asks: [
      "Ticket escalate nên chứa gì?",
      "Tức là: một gói bàn giao tự đủ, đọc xong là engineer làm tiếp được từ chỗ agent dừng, không phải điều tra lại.",
      "Soi từng phương án: người nhận có mở được thứ đó không, và đó là kết luận đã chắt lọc hay dữ liệu thô?"
    ],
    facts: [
      "Escalate là chuyển ca từ agent sang người. Handoff là gói thông tin đi kèm. Người nhận không đọc được hội thoại của agent, nên gói phải tự đủ: vấn đề, nguyên nhân gốc tìm được, việc đã làm, lý do chuyển, đề xuất xử lý.",
      "<code>claude --resume &lt;tên phiên&gt;</code> mở lại một phiên cũ với đủ lịch sử. Chỉ dùng được khi người mở truy cập được phiên đó.",
      "Gói bàn giao cần kết luận đã chắt lọc. Đẩy nguyên dữ liệu thô sang thì người nhận phải làm lại phần phân tích."
    ],
    opts: [
      { k: "A", gist: "Have the agent write a self-contained summary: the task goal, root-cause findings so far, each fix attempted with its outcome, and a recommended next step.",
        why: [
          "Đúng gói bàn giao tự đủ (ý 1). Ticket mang đủ trạng thái của ca, không dựa vào thứ engineer không mở được.",
          "Engineer biết agent đang làm gì, đã tìm ra gì, đã thử gì và kết quả ra sao, nên làm tiếp từ chỗ agent dừng.",
          "Có đề xuất bước tiếp, nhưng engineer vẫn tự soi lại được kết luận của agent."
        ] },
      { k: "B", gist: "Put the agent's session name in the ticket so the engineer can run <code>claude --resume</code> and read the whole investigation directly.",
        why: [
          "Resume là cơ chế thật (ý 2), nhưng đề nói rõ engineer trực không vào được phiên của agent.",
          "Một con trỏ tới thứ người nhận không mở được thì không chuyển được gì. Engineer cầm ticket mà vẫn trắng tay.",
          "Dễ bị cuốn vì resume cho đủ context nhất. Nhưng chỉ khi hai bên dùng chung phiên, mà đề đã loại trừ."
        ] },
      { k: "C", gist: "Include only the original task description and the failing error message so the engineer forms a fresh view, not shaped by the agent's analysis.",
        why: [
          "Vứt hết những gì agent đã điều tra. Engineer phải lần lại từ đầu, kể cả những hướng agent đã thử và đã loại.",
          "Muốn nhìn độc lập thì engineer đọc kết luận rồi soi lại. Không cần bị giấu kết luận mới nhìn độc lập được."
        ] },
      { k: "D", gist: "Attach the complete raw output of every Read, Grep, and Bash call from the investigation so the engineer sees all the gathered evidence.",
        why: [
          "Dữ liệu thô chưa phải kết luận (ý 3). Engineer phải tự lọc ra nguyên nhân gốc và những cách sửa đã thử.",
          "Tức là làm lại đúng phần agent đã làm xong. Escalate một ca đang dở mà bắt người nhận làm lại thì mất ý nghĩa.",
          "Dễ bị cuốn vì “đưa hết cho chắc” nghe an toàn. Nhưng nhiều hơn không làm gói đủ hơn, chỉ làm nó khó đọc."
        ] }
    ],
    refs: [
      { label: "Bài 1.4, mục “Khi phải chuyển cho người thật”: structured handoff, gói bàn giao tự đủ", href: NOTES + "#l-1-4" },
      { label: "Bài 1.7: --resume mở lại phiên có tên với đủ lịch sử", href: NOTES + "#l-1-7" }
    ]
  },
  {
    de: 8, n: 16, total: 60, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool", scen: "S1",
    answer: "D",
    ask: "<code>process_refund</code> turns down a refund because the item was a final sale, under a policy that allows no exceptions. The MCP result has <code>isError: true</code> plus the team's own metadata: <code>retriable: false</code> and a plain-language summary of the policy. How should the agent handle this denial?",
    scene: [
      "<code>process_refund</code> từ chối hoàn tiền vì món hàng bán theo diện final sale (đã mua là không trả lại). Policy này không có ngoại lệ.",
      "Kết quả MCP có <code>isError: true</code>, kèm metadata team tự thêm: <code>retriable: false</code> và một đoạn giải thích policy bằng lời dễ hiểu.",
      "Chỗ khó: thấy lỗi thì dễ nghĩ phải thử lại hoặc đẩy lên người. Nhưng đây là lỗi nghiệp vụ, policy đã chốt, không ai đổi được kết quả."
    ],
    asks: [
      "Agent nên xử lý lần từ chối này thế nào?",
      "Tức là: đọc đúng loại lỗi rồi chọn bước tiếp hợp với loại đó.",
      "Soi từng phương án: nó có đổi được kết quả không, và có làm ca kéo dài vô ích không?"
    ],
    facts: [
      "Lỗi business (nghiệp vụ): request hợp lệ nhưng policy không cho. Gửi lại y hệt hay đổi cách diễn đạt cũng không thành công. Cách xử: giải thích dễ hiểu cho khách, đề xuất phương án khác nếu có.",
      "MCP chỉ chuẩn hóa cờ <code>isError</code>. <code>retriable</code> và đoạn giải thích là trường team tự đặt trong nội dung kết quả, để agent biết loại lỗi và biết nói gì với khách.",
      "Guide chỉ có 3 trigger escalate: khách yêu cầu gặp người, policy không có hoặc mơ hồ (policy gap), agent không thể tiến triển.",
      "First-contact resolution (FCR): tỉ lệ ca xong ngay trong lần liên hệ đầu. Escalate thừa làm FCR giảm."
    ],
    opts: [
      { k: "A", gist: "Call <code>escalate_to_human</code> with the full denial details so a human reviewer can decide whether an exception applies.",
        why: [
          "Không khớp trigger nào (ý 3): khách chưa đòi gặp người, policy rõ ràng, agent cũng không bí.",
          "Policy không có ngoại lệ, nên người duyệt cũng không đổi được kết quả. Chỉ thêm việc cho người và làm FCR giảm (ý 4).",
          "Dễ bị cuốn vì escalate nghe an toàn. Nhưng escalate dành cho ca agent không xử được, không phải cho mọi lần bị từ chối."
        ] },
      { k: "B", gist: "Ask the customer whether they would like a human to review the denial before sharing the policy explanation.",
        why: [
          "Gợi ý xem lại làm khách tưởng còn cửa ngoại lệ, trong khi policy đã chốt là không có.",
          "Giữ lại lời giải thích mà kết quả tool đã đưa sẵn, làm ca kéo dài thêm một lượt vô ích (ý 4)."
        ] },
      { k: "C", gist: "Adjust the request parameters and call <code>process_refund</code> once more, in case the wording of the first request caused the denial.",
        why: [
          "Sai ở giả định: coi lỗi nghiệp vụ như lỗi input (validation). Đổi tham số chỉ giúp khi input sai (ý 1).",
          "<code>retriable: false</code> đã nói không đổi input nào làm lần gọi thành công. Gọi lại chỉ tốn một lượt và nhận đúng lần từ chối cũ."
        ] },
      { k: "D", gist: "Pass the plain-language policy summary to the customer as the resolution and make no further <code>process_refund</code> calls.",
        why: [
          "Đúng cách xử lỗi business (ý 1): giải thích cho khách bằng chính đoạn tóm tắt team soạn sẵn cho việc này (ý 2).",
          "Không gọi lại, vì <code>retriable: false</code>. Ca xong ngay trong lần liên hệ này, giữ được FCR (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 2.2: bảng bốn errorCategory; lỗi business thì giải thích thân thiện, có ví dụ kèm customerMessage", href: NOTES + "#l-2-2" },
      { label: "Bài 5.2, mục “Ba tình huống hay bị nhầm khi escalate” (đã sửa 01/11): chỉ 3 trigger escalate", href: NOTES + "#fix-9" }
    ]
  },
  {
    de: 8, n: 17, total: 60, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool", scen: "S1",
    answer: "A",
    ask: "On some refunds, the backend rejects <code>order_date</code> values such as <code>03/31/2026</code> because it expects <code>2026-03-31</code>. <code>process_refund</code> reports <code>errorCategory: \"validation\"</code>, <code>isRetryable: true</code>, and the message “Invalid input”. The agent resends the same payload three times, then escalates. The tool's <code>input_schema</code> declares <code>order_date</code> as a plain string. Which change lets the agent correct these calls on its own?",
    scene: [
      "Backend từ chối <code>order_date</code> dạng <code>03/31/2026</code>, vì nó chỉ nhận <code>2026-03-31</code>.",
      "<code>process_refund</code> báo lỗi như sau. Ví dụ minh họa, đúng các trường đề nêu:<pre><code>{ \"errorCategory\": \"validation\",\n  \"isRetryable\": true,\n  \"message\": \"Invalid input\" }</code></pre>",
      "Agent gửi lại y nguyên payload ba lần, rồi escalate. Ca lẽ ra tự xử được lại đi tới người.",
      "Chỗ khó: <code>input_schema</code> chỉ khai <code>order_date</code> là chuỗi, nên <code>03/31/2026</code> vẫn hợp lệ theo schema. Luật định dạng chỉ nằm ở backend."
    ],
    asks: [
      "Đổi gì thì agent tự sửa được những lần gọi này?",
      "Tức là: agent đang thiếu thông tin gì để sửa input, và phương án nào đưa đúng thông tin đó.",
      "Soi từng phương án: sau khi đổi, agent có biết sửa trường nào, sửa thành gì không?"
    ],
    facts: [
      "Docs Messages API khuyên viết lỗi có tính chỉ dẫn: nói rõ hỏng ở đâu và Claude nên thử gì tiếp, thay vì câu chung chung như “failed”. Có thông tin đó, Claude tự sửa được mà không phải đoán.",
      "Lỗi có cấu trúc theo guide có ba thứ: <code>errorCategory</code> (loại lỗi), <code>isRetryable</code>, và câu mô tả dễ hiểu. Category cho biết hướng xử (validation thì sửa input), câu mô tả cho biết sửa gì.",
      "<code>strict: true</code> trên định nghĩa tool bảo đảm input Claude sinh ra khớp <code>input_schema</code>. Luật nào không có trong schema thì nó không biết.",
      "Transient (lỗi tạm thời) nghĩa là gửi lại y hệt có thể thành công, như timeout hay 503."
    ],
    opts: [
      { k: "A", gist: "Expand the error message to name the failing field and the expected format, while keeping <code>errorCategory: \"validation\"</code> and <code>isRetryable: true</code>.",
        why: [
          "Đúng chỗ thiếu: category đã nói phải sửa input, nhưng “Invalid input” không nói sửa gì (ý 2). Câu như “order_date must be YYYY-MM-DD, got 03/31/2026” cho agent đủ thông tin để đổi giá trị.",
          "Đây đúng là lỗi có tính chỉ dẫn mà docs khuyên (ý 1). Lần gọi sau agent gửi <code>2026-03-31</code> và thành công, không phải escalate.",
          "Riêng cờ <code>isRetryable: true</code>: theo phép thử của notes, lỗi validation nên là <code>false</code>. Cờ này không phải chỗ chặn agent tự sửa, xem ghi chú đáp án gốc."
        ] },
      { k: "B", gist: "Set <code>strict: true</code> on the tool definition so every input Claude generates for <code>process_refund</code> has to conform to the declared <code>input_schema</code>.",
        why: [
          "Bật được, nhưng không bắt được lỗi này (ý 3). Schema chỉ khai <code>order_date</code> là chuỗi, mà <code>03/31/2026</code> là chuỗi hợp lệ.",
          "Luật định dạng chỉ có ở backend. <code>strict</code> không biết tới nó, và cũng không làm câu “Invalid input” rõ hơn.",
          "Dễ bị cuốn vì <code>strict: true</code> nghe như cách bảo đảm input đúng. Nhưng nó chỉ bảo đảm khớp schema đã khai, không hơn."
        ] },
      { k: "C", gist: "Set <code>isRetryable</code> to false so the agent stops repeating the failing call and hands the request to a human after the first rejection.",
        why: [
          "Đổi cờ không thêm thông tin gì: “Invalid input” vẫn không nói sửa trường nào, sửa thành gì (ý 2).",
          "Phương án còn nêu rõ hệ quả: agent chuyển cho người ngay sau lần từ chối đầu. Lỗi chỉ cần đổi định dạng ngày mà lại đẩy lên người, trái với “on its own” (tự nó sửa).",
          "Dễ bị cuốn vì theo phép thử của notes, <code>false</code> đúng là cờ hợp với lỗi validation. Nhưng đề hỏi cách để agent tự sửa, mà sửa cờ không cho agent biết phải sửa gì."
        ] },
      { k: "D", gist: "Change <code>errorCategory</code> to <code>\"transient\"</code> so the agent's standard backoff-and-retry handling takes over until the backend accepts the call.",
        why: [
          "Sai loại lỗi: transient là gửi lại y hệt có thể thành công (ý 4). Backend từ chối giá trị này mọi lần.",
          "Agent sẽ gửi lại y nguyên, chờ giãn dần giữa các lần, đúng hành vi đang hỏng, chỉ chậm hơn. Còn mất luôn tín hiệu “phải sửa input”."
        ] }
    ],
    dispute: "Đề gốc chấm A, sổ giữ A. Đề gốc ghép lỗi validation với <code>isRetryable: true</code>, vì hiểu “retry” là gọi lại tool sau khi sửa input. Notes hiểu “retry” là gửi lại y nguyên request, nên lỗi validation là <code>false</code> (câu 14 Đề 1 viết theo cách này). Cờ này do team tự đặt, spec MCP chỉ có <code>isError</code>, docs không định nghĩa nó, nên không bên nào sai docs. A đúng nhờ loại lỗi và câu mô tả nói rõ phải sửa gì, không nhờ cờ.",
    refs: [
      { label: "Bài 2.2, mục “Đã sửa 04/11”: isRetryable không có định nghĩa chính thức; notes và đề Udemy hiểu khác nhau ở lỗi validation", href: NOTES + "#fix-29" },
      { label: "Bài 2.2: errorCategory, isRetryable; mục “Biết thêm”: phép thử isRetryable", href: NOTES + "#l-2-2" },
      { label: "Bài 4.3, khung định nghĩa “strict: true”: buộc tham số khớp schema", href: NOTES + "#l-4-3" },
      { label: "Docs “Handle tool calls”, mục Handling errors with is_error: viết lỗi có tính chỉ dẫn; Claude thử lại 2–3 lần với chỗ đã sửa", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls" }
    ]
  },
  {
    de: 8, n: 18, total: 60, sub: "5.2", subName: "Escalate và xử lý chỗ mơ hồ", scen: "S1",
    answer: "B",
    ask: "Transcripts reveal two problems. First, whenever a customer sounds angry, the agent escalates in-scope duplicate-charge complaints that it could resolve itself. Second, when a customer writes “connect me to a person,” the agent runs several lookups before escalating. Which system prompt policy handles both situations correctly?",
    scene: [
      "Đọc transcript (bản ghi hội thoại) thấy hai vấn đề ngược chiều nhau.",
      "Vấn đề 1: khách bị trừ tiền hai lần, ca nằm trong phạm vi agent tự xử được. Nhưng hễ khách nghe có vẻ bực là agent đẩy lên người.",
      "Vấn đề 2: khách viết “connect me to a person” (cho tôi nói chuyện với người). Agent vẫn chạy vài lượt tra cứu rồi mới escalate.",
      "Chỗ khó: một bên escalate thừa, một bên escalate chậm. Một policy phải sửa được cả hai chiều."
    ],
    asks: [
      "Policy nào trong system prompt xử đúng cả hai tình huống?",
      "Tức là: escalate theo điều khách thật sự muốn và theo việc ca có vượt khả năng không, không theo cảm xúc.",
      "Soi từng phương án: khách bực mà ca dễ thì nó làm gì? Khách đòi gặp người thì nó chuyển ngay hay tra cứu trước?"
    ],
    facts: [
      "Guide chỉ có 3 trigger escalate: (1) khách yêu cầu gặp người; (2) policy không có hoặc mơ hồ; (3) agent không thể tiến triển. Khách bực mà chưa đòi người không phải trigger.",
      "Khách yêu cầu gặp người rõ ràng thì escalate ngay, không điều tra trước.",
      "Sentiment analysis (chấm mức tiêu cực trong lời khách) đo tâm trạng, không đo độ khó của ca.",
      "First-contact resolution (FCR): tỉ lệ ca xong ngay trong lần liên hệ đầu. Escalate thừa làm FCR giảm."
    ],
    opts: [
      { k: "A", gist: "Escalate any message whose sentiment score crosses a frustration threshold, so upset customers reach a human without a failed resolution attempt first.",
        why: [
          "Lấy cảm xúc làm trigger (ý 3). Đúng cái lỗi transcript đang cho thấy, giờ còn được tự động hóa.",
          "Ca trừ tiền hai lần dễ xử vẫn bị đẩy lên người, FCR tiếp tục giảm (ý 4). Vấn đề 2 cũng không được đụng tới."
        ] },
      { k: "B", gist: "Resolve angry but in-scope complaints after acknowledging the frustration, and escalate at once, with no lookups, when a customer explicitly asks for a human.",
        why: [
          "Vấn đề 1: khách bực không phải trigger (ý 1). Agent ghi nhận sự bực bội rồi tự hoàn tiền ca nằm trong policy, giữ được FCR (ý 4).",
          "Vấn đề 2: đòi gặp người là trigger số 1, nên escalate ngay, không tra cứu trước (ý 2).",
          "Một policy sửa cả hai chiều: cảm xúc không đẩy ca lên, yêu cầu rõ ràng thì không bị trì hoãn."
        ] },
      { k: "C", gist: "Make one resolution attempt in every case, explicit human requests included, and escalate only if that attempt fails, so first-contact resolution stays high.",
        why: [
          "Đúng với ca khách bực, nhưng sai với ca đòi gặp người: khách đã nói rõ, agent vẫn cố tự xử (ý 2).",
          "Làm trái lời khách thì mất lòng tin, kể cả khi lần thử thành công. Vấn đề 2 không được sửa, còn bị viết thành luật.",
          "Dễ bị cuốn vì nghe như bảo vệ FCR. Nhưng không thể đổi FCR bằng việc phớt lờ yêu cầu rõ ràng của khách."
        ] },
      { k: "D", gist: "Resolve angry in-scope complaints autonomously, and on explicit human requests first gather order details so the human receives a complete case file.",
        why: [
          "Vế đầu đúng. Vế sau lặp lại đúng vấn đề 2: tra cứu trước khi chuyển, trong khi khách đã đòi gặp người (ý 2).",
          "Gói bàn giao dựng từ những gì agent đã biết, không phải từ lượt tra cứu mới mà khách không cần.",
          "Dễ bị cuốn vì gói bàn giao đầy đủ là điều guide khen (bài 1.4). Nhưng nó không được làm chậm lần chuyển khách đã yêu cầu."
        ] }
    ],
    refs: [
      { label: "Bài 5.2, mục “Ba tình huống hay bị nhầm khi escalate” (đã sửa 01/11): 3 trigger; khách đòi gặp người thì chuyển ngay", href: NOTES + "#fix-9" },
      { label: "Bài 5.2, mục “Chuyện gì đang xảy ra”: sentiment đo tâm trạng, không đo độ khó của ca", href: NOTES + "#l-5-2" }
    ]
  },
  {
    de: 8, n: 19, total: 60, sub: "2.5", subName: "Chọn built-in tool đúng việc", scen: "S1",
    answer: "AB",
    ask: "A developer needs the agent to do two things: locate the refund-policy rule files, saved as <code>.yaml</code> or <code>.json</code> at varying depths under <code>config/policies</code>, and find where the handler code mentions <code>escalate_to_human</code>. Which TWO tool calls accomplish this? (Choose two.)",
    scene: [
      "Developer cần agent làm hai việc.",
      "Việc 1: tìm các file rule của refund policy, đuôi <code>.yaml</code> hoặc <code>.json</code>, nằm ở nhiều độ sâu khác nhau dưới <code>config/policies</code>.",
      "Việc 2: tìm chỗ code handler nhắc tới <code>escalate_to_human</code>.",
      "Chỗ khó: việc 1 tìm theo tên file, việc 2 tìm theo chữ bên trong file, nên hai việc hai tool. Thêm nữa, file nằm nhiều cấp, nên pattern phải đi xuyên thư mục con."
    ],
    asks: [
      "Hai lệnh gọi tool nào làm được hai việc này?",
      "Tức là: một lệnh Glob đúng pattern cho việc 1, một lệnh Grep cho việc 2.",
      "Soi từng phương án: tool đó tìm tên file hay nội dung? Pattern có xuống được các thư mục con không?"
    ],
    facts: [
      "Glob tìm đường dẫn file theo pattern tên. Grep tìm nội dung bên trong file. Đang tìm chữ trong file thì Grep, đang tìm tên file thì Glob.",
      "Trong glob, <code>*</code> chỉ khớp trong một cấp thư mục, <code>**</code> khớp qua mọi cấp. <code>{yaml,json}</code> khớp một trong các đuôi.",
      "Docs Claude Code có ví dụ: <code>**/*.js</code> khớp file <code>.js</code> ở mọi độ sâu, <code>*.{json,yaml}</code> khớp file <code>.json</code> và <code>.yaml</code> trong thư mục hiện tại."
    ],
    opts: [
      { k: "A", gist: "Call Glob with the pattern <code>config/policies/**/*.{yaml,json}</code> so both extensions match at any depth.",
        why: [
          "Đúng việc 1. Glob tìm theo tên file (ý 1), <code>**</code> đi xuống mọi cấp, <code>{yaml,json}</code> lấy cả hai đuôi trong một lần gọi (ý 2).",
          "Docs có đúng hai mảnh ghép này trong ví dụ (ý 3). Glob trả tối đa 100 file; chạm trần thì Claude thấy cờ bị cắt và thu hẹp pattern."
        ] },
      { k: "B", gist: "Call Grep with the pattern <code>escalate_to_human</code>, searching file contents across the handler code.",
        why: [
          "Đúng việc 2. Tìm chỗ code nhắc tới một cái tên là tìm nội dung, việc của Grep (ý 1).",
          "Grep trả về những chỗ chuỗi đó xuất hiện, đúng thứ developer cần."
        ] },
      { k: "C", gist: "Call Glob with the pattern <code>config/policies/*.{yaml,json}</code>, which covers both extensions in a single call.",
        why: [
          "Cú pháp đúng, nhóm <code>{yaml,json}</code> lấy được cả hai đuôi. Chỗ hỏng là <code>*</code> chỉ khớp trong một cấp (ý 2).",
          "File nằm ở nhiều độ sâu, nên file trong thư mục con của <code>config/policies</code> bị bỏ sót mà không có lỗi gì báo.",
          "Dễ bị cuốn vì nó gần giống A, chỉ thiếu <code>**/</code>. Nhưng chính chỗ thiếu đó làm hỏng việc 1."
        ] },
      { k: "D", gist: "Call Glob with the pattern <code>escalate_to_human</code> so that it returns the files containing that call.",
        why: [
          "Sai tool: Glob chỉ khớp tên và đường dẫn, không đọc nội dung file (ý 1).",
          "Lệnh này chỉ tìm được file có đường dẫn khớp đúng <code>escalate_to_human</code>, gần như chắc chắn không có. Chỗ code gọi hàm thì không thấy."
        ] }
    ],
    refs: [
      { label: "Bài 2.5, bảng “Mỗi tool một việc”: Grep tìm nội dung, Glob tìm đường dẫn file", href: NOTES + "#l-2-5" },
      { label: "Bài 3.3, khung định nghĩa “Glob”: * một cấp, ** mọi cấp, {ts,tsx} một trong các đuôi", href: NOTES + "#l-3-3" },
      { label: "Docs Claude Code “Tools reference”, mục Glob tool behavior: ví dụ pattern, trần 100 file", href: "https://code.claude.com/docs/en/tools-reference" }
    ]
  },
  {
    de: 8, n: 20, total: 60, sub: "1.1", subName: "Vòng lặp agent", scen: "S1",
    answer: "AD",
    ask: "A team's harness calls the Messages API directly and executes the agent's tools itself, without using the Agent SDK. Which two designs correctly decide when the tool loop continues and when it stops? (Choose two.)",
    scene: [
      "Harness (khung chạy agent) của team gọi thẳng Messages API và tự chạy tool. Không dùng Agent SDK.",
      "Đề hỏi điều kiện để vòng lặp gọi tiếp hay dừng.",
      "Chỗ khó: các phương án mượn cơ chế thật nhưng đặt sai chỗ. Có cái chỉ có trong Agent SDK, có cái chỉ dành cho tool chạy phía server."
    ],
    asks: [
      "Hai thiết kế nào quyết đúng lúc nào lặp tiếp, lúc nào dừng?",
      "Tức là: harness gọi thẳng Messages API thật sự nhận được tín hiệu nào, và đọc tín hiệu đó thế nào.",
      "Soi từng phương án: tín hiệu đó có xuất hiện khi không dùng SDK không? Đọc nó có đúng nghĩa không?"
    ],
    facts: [
      "Mọi response của Messages API có <code>stop_reason</code>. <code>tool_use</code>: Claude xin gọi tool, harness chạy tool, gửi <code>tool_result</code>, gọi API lại. <code>end_turn</code>: Claude trả lời xong, dừng.",
      "<code>pause_turn</code>: tool chạy phía server Anthropic (như web search) tạm dừng giữa chừng. Cách xử: gửi lại nguyên content để nó chạy tiếp. Tool phía client đến với <code>stop_reason: \"tool_use\"</code>.",
      "Trần số vòng là dây an toàn, không phải điều kiện dừng chính. Chạm trần là chưa xong việc, phải xử như lỗi. Agent SDK trả <code>ResultMessage</code> có subtype <code>error_max_turns</code> khi chạm <code>max_turns</code>.",
      "<code>ResultMessage</code> là message Agent SDK phát ra khi vòng lặp của SDK kết thúc, chứa kết quả cuối, token usage, chi phí. Gọi thẳng Messages API thì không có message này."
    ],
    opts: [
      { k: "A", gist: "Apply a turn cap as a safety limit, and treat a run that hits it as a failed run to recover from rather than a completed answer.",
        why: [
          "Trần số vòng chặn agent chạy mất kiểm soát, nhưng chạm trần là chưa xong việc (ý 3). Xử như lỗi: báo lên, escalate, hoặc chạy lại theo cách khác.",
          "Agent SDK cũng phân biệt y vậy: chạm <code>max_turns</code> thì trả <code>error_max_turns</code>, không trả thành công. Harness tự viết giữ đúng tinh thần đó."
        ] },
      { k: "B", gist: "Iterate over the returned messages and end the loop when a <code>ResultMessage</code> arrives, reading the final answer and token usage from it.",
        why: [
          "Sai chỗ: <code>ResultMessage</code> chỉ có trong Agent SDK (ý 4). Đề nói harness gọi thẳng Messages API, không dùng SDK.",
          "Message đó không bao giờ tới, nên vòng lặp không có lúc dừng.",
          "Dễ bị cuốn vì đây đúng là cách dừng khi dùng Agent SDK. Nhưng đề đã loại SDK ngay câu đầu."
        ] },
      { k: "C", gist: "After a response whose <code>stop_reason</code> is <code>pause_turn</code>, continue by running the tools Claude requested and returning a <code>tool_result</code> block for each.",
        why: [
          "Sai cách xử: <code>pause_turn</code> thuộc về tool phía server, cách tiếp là gửi lại nguyên content của assistant (ý 2). Không có tool nào để harness tự chạy.",
          "Tool phía client của harness đến với <code>tool_use</code>, không phải <code>pause_turn</code>. Gửi <code>tool_result</code> ở đây là đọc sai giao thức.",
          "Dễ bị cuốn vì “gặp pause_turn thì chạy tiếp” là đúng. Sai ở cách chạy tiếp."
        ] },
      { k: "D", gist: "Check <code>stop_reason</code> after every call: send <code>tool_result</code> blocks back while it is <code>tool_use</code>, and end the loop on <code>end_turn</code>.",
        why: [
          "Đúng vòng lặp chuẩn của Messages API (ý 1): <code>tool_use</code> thì chạy tool, gửi kết quả, gọi lại; <code>end_turn</code> thì dừng và đưa câu trả lời cho người dùng.",
          "Dựa vào trường có cấu trúc do API đặt, không đọc chữ trong text, nên quyết định dừng ổn định qua mọi lần chạy."
        ] }
    ],
    refs: [
      { label: "Bài 1.1: bảng giá trị stop_reason; mục “Ba cách dừng sai”: trần số vòng chỉ là dây an toàn", href: NOTES + "#l-1-1" },
      { label: "Bài 1.1, mục “Đã sửa 01/11”: pause_turn thì gửi nguyên response lại để Claude chạy tiếp", href: NOTES + "#fix-1" },
      { label: "Docs Agent SDK “How the agent loop works”: ResultMessage đánh dấu hết vòng lặp của SDK; chạm max_turns trả error_max_turns", href: "https://code.claude.com/docs/en/agent-sdk/agent-loop" }
    ]
  },
  {
    de: 8, n: 21, total: 60, sub: "1.3", subName: "Gọi subagent, truyền context", scen: "S1",
    answer: "B",
    ask: "The main agent's system prompt has a rule that every finding about a billing record must include the record's creation date. Still, the research subagent it spawns for billing disputes keeps returning findings with no dates, and the agent ends up treating outdated fee schedules as current. What should you change?",
    scene: [
      "System prompt của agent chính có luật: mọi kết quả tra cứu về hồ sơ thanh toán phải kèm ngày tạo hồ sơ.",
      "Agent chính spawn (tạo) một research subagent để tra các vụ tranh chấp thanh toán. Subagent này vẫn trả kết quả không có ngày.",
      "Hậu quả: biểu phí cũ và biểu phí hiện hành trông như nhau, nên agent đem biểu phí cũ ra dùng như đang còn hiệu lực.",
      "Chỗ khó: luật đã viết rồi, chỉ là viết ở chỗ subagent không đọc."
    ],
    asks: [
      "Nên đổi gì?",
      "Tức là: luật “kèm ngày tạo” phải nằm ở đâu thì subagent mới thật sự thấy và làm theo.",
      "Soi từng phương án: thứ nó thêm vào có nằm trong context của subagent không, và có mang về đúng ngày tạo hồ sơ không?"
    ],
    facts: [
      "Subagent khởi động với context mới. Nó không nhận lịch sử hội thoại, kết quả tool, hay system prompt của agent cha.",
      "Subagent nhận hai lớp prompt. Lớp một là <code>prompt</code> trong <code>AgentDefinition</code> (hồ sơ khai báo một loại subagent), cố định, đóng vai system prompt riêng của nó. Lớp hai là lời giao việc của từng lần gọi. Thứ lần nào cũng cần thì đặt ở lớp một.",
      "Muốn tách dữ liệu cũ với dữ liệu mới thì mỗi kết quả phải mang ngày của chính dữ liệu đó (ngày tạo, ngày xuất bản, ngày thu thập). Giờ chạy tra cứu không nói gì về tuổi của dữ liệu.",
      "Trường required (bắt buộc có) mà nguồn không có dữ liệu thì model sẽ bịa cho đủ."
    ],
    opts: [
      { k: "A", gist: "Move the date rule to the very top of the main agent's system prompt and mark it IMPORTANT, so it keeps its priority as the context grows.",
        why: [
          "Sai ở giả định: system prompt của agent chính không chép xuống subagent (ý 1). Đưa lên đầu hay thêm IMPORTANT thì luật vẫn nằm ở chỗ subagent không đọc.",
          "Subagent vẫn trả kết quả không ngày, agent vẫn nhầm biểu phí cũ.",
          "Dễ bị cuốn vì luật bị chìm khi context dài là chuyện có thật với agent chính. Nhưng ở đây luật không yếu, luật đặt sai chỗ."
        ] },
      { k: "B", gist: "Put the date requirement into the subagent's own prompt in its <code>AgentDefinition</code>, because the subagent does not see the parent's system prompt.",
        why: [
          "Đặt luật vào lớp một (ý 2): <code>prompt</code> trong <code>AgentDefinition</code> là system prompt riêng của subagent, nạp ở mọi lần gọi.",
          "Lần tra nào cũng cần ngày tạo, nên đây là chỗ đúng. Subagent thấy luật ngay từ đầu, không phụ thuộc agent chính có nhớ dặn trong từng lời giao việc hay không.",
          "Kết quả về có ngày tạo, agent tách được biểu phí cũ với biểu phí hiện hành (ý 3)."
        ] },
      { k: "C", gist: "Add a required date field to a JSON schema that validates the main agent's final reply to the customer, so replies missing dates are rejected.",
        why: [
          "Sai chỗ: schema kiểm câu trả lời cuối, tức là sau khi ngày đã mất. Subagent vẫn không gửi ngày lên (ý 1).",
          "Câu trả lời cuối hoặc bị từ chối mãi, hoặc model bịa một ngày nghe hợp lý cho đủ trường required (ý 4). Ngày bịa còn tệ hơn không có ngày."
        ] },
      { k: "D", gist: "Add a <code>PostToolUse</code> hook that stamps every subagent result with the current timestamp before it enters the main agent's context.",
        why: [
          "Hook đóng dấu được, và chạy chắc chắn. Nhưng nó đóng giờ chạy tra cứu, không phải ngày tạo hồ sơ (ý 3).",
          "Biểu phí năm ngoái tra hôm nay cũng mang dấu hôm nay. Agent vẫn không biết cái nào cũ, nên vẫn nhầm."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Biết thêm”: subagent nhận hai lớp prompt, thứ lần nào cũng cần thì đặt ở prompt của AgentDefinition", href: NOTES + "#l-1-3" },
      { label: "Bài 5.6: subagent phải kèm ngày xuất bản / ngày thu thập trong output; giờ chạy không thay được", href: NOTES + "#l-5-6" },
      { label: "Docs Subagents in the SDK, mục What subagents inherit: subagent nhận prompt riêng và lời giao việc, không nhận lịch sử hay system prompt của bên gọi", href: "https://code.claude.com/docs/en/agent-sdk/subagents" }
    ]
  },
  {
    de: 8, n: 22, total: 60, sub: "1.2", subName: "Điều phối coordinator–subagent", scen: "S1",
    answer: "BD",
    ask: "For every request, even a simple refund, the coordinator launches three investigation subagents, each told only “investigate the issue.” In one dispute, two of them repeated the same order lookup and none checked the subscription plan change that actually caused the charge. Dispute causes differ from case to case, and simple refunds must stay fast and cheap. Which TWO changes address the root causes? (Select TWO.)",
    scene: [
      "Coordinator gặp yêu cầu nào cũng spawn ba subagent điều tra, kể cả một ca hoàn tiền đơn giản.",
      "Cả ba nhận cùng một lời giao việc: “investigate the issue” (điều tra vấn đề này).",
      "Trong một vụ tranh chấp: hai subagent cùng tra lại đơn hàng, không ai kiểm việc đổi gói thuê bao, trong khi đó mới là lý do khách bị trừ tiền.",
      "Ràng buộc: nguyên nhân tranh chấp mỗi ca một khác, và ca hoàn tiền đơn giản phải “fast and cheap” (nhanh và rẻ). Chỗ khó: có hai gốc lỗi, nên cần hai thay đổi, mỗi thay đổi sửa một gốc."
    ],
    asks: [
      "Hai thay đổi nào sửa được gốc của vấn đề?",
      "Tức là: một thay đổi để các subagent chia việc không trùng, không sót; một thay đổi để ca đơn giản không phải chạy ba subagent.",
      "Soi từng phương án: nó sửa gốc nào, và có hợp với chuyện nguyên nhân mỗi ca một khác không?"
    ],
    facts: [
      "Coordinator làm bốn việc: chia việc, chọn subagent cần cho yêu cầu này, giao việc, gom kết quả. Guide gọi việc chọn là dynamic selection (chọn động): yêu cầu đơn giản thì không chạy đủ mọi subagent.",
      "Lời giao việc tốt có bốn phần: mục tiêu, định dạng đầu ra, nên dùng tool hay nguồn nào, ranh giới (không làm gì). Thiếu ranh giới thì các subagent lấn việc nhau. Các mảng gộp lại phải phủ đủ yêu cầu và không chồng nhau.",
      "Mỗi subagent có context cô lập, chỉ biết những gì coordinator viết vào lời giao việc. Các subagent chạy song song không thấy nhau đang làm gì.",
      "Chia việc theo các bước định sẵn hợp với việc đoán trước được. Việc mà mỗi ca cần một kiểu khác thì phải nhìn ca cụ thể rồi mới chia (guide gọi là dynamic adaptive decomposition, chia việc thích ứng)."
    ],
    opts: [
      { k: "A", gist: "Pass the coordinator's full conversation history into every subagent prompt, so each subagent can see what the others are investigating and avoid duplicate work.",
        why: [
          "Sai ở giả định: bản lịch sử chép lúc spawn không chứa việc các subagent khác đang làm lúc đó (ý 3). Ba subagent chạy song song vẫn không thấy nhau.",
          "Context của mỗi subagent đầy thêm thứ không liên quan, còn lời giao việc vẫn mơ hồ như cũ. Gốc chồng việc vẫn còn nguyên.",
          "Dễ bị cuốn vì “đưa thêm context cho subagent” thường là cách sửa đúng (bài 1.3). Nhưng thứ thiếu ở đây là ranh giới việc, không phải lịch sử."
        ] },
      { k: "B", gist: "Scale the number of subagents to each request's complexity: one agent for a simple refund, several only for disputes with multiple aspects.",
        why: [
          "Sửa gốc thứ hai: coordinator chọn số subagent theo từng yêu cầu (ý 1). Ca hoàn tiền đơn giản chỉ cần một agent với vài tool call, nên vẫn nhanh và rẻ.",
          "Ca tranh chấp nhiều mặt thì mới chia cho nhiều subagent, mỗi con một phần."
        ] },
      { k: "C", gist: "Keep a fixed set of three specialist subagents for customer data, orders, and billing, and make each one's standing prompt more specific to its own area.",
        why: [
          "Ba chuyên gia cố định với prompt rõ hơn thì bớt chồng việc. Nhưng cách chia được chốt trước khi yêu cầu tới (ý 4), trong khi đề nói nguyên nhân mỗi ca một khác.",
          "Ca nào có nguyên nhân không khớp cách chia sẵn thì không ai được giao kiểm. Ca hoàn tiền đơn giản vẫn chạy đủ ba subagent, trái yêu cầu nhanh và rẻ (ý 1).",
          "Dễ bị cuốn vì chuyên môn hóa subagent là thiết kế tốt. Nhưng nó chỉ hợp khi ca nào cũng đụng đúng các mảng biết trước."
        ] },
      { k: "D", gist: "Give each delegation prompt a specific objective, an output format, and task boundaries, so every subagent owns a distinct part of the investigation.",
        why: [
          "Sửa gốc thứ nhất: lời giao việc có đủ mục tiêu, định dạng đầu ra, ranh giới (ý 2), nên mỗi subagent nhận một mảng riêng.",
          "Hết cảnh hai subagent cùng tra một đơn. Coordinator chia việc theo đúng ca này thì có người được giao kiểm việc đổi gói thuê bao."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Biết thêm”: lời giao việc tốt có bốn phần (mục tiêu, định dạng đầu ra, tool/nguồn, ranh giới)", href: NOTES + "#l-1-3" },
      { label: "Bài 1.2: coordinator chọn subagent theo từng yêu cầu (dynamic selection), chia phạm vi không trùng và phủ đủ", href: NOTES + "#l-1-2" },
      { label: "Bài 1.6: pipeline định sẵn cho việc đoán trước được, chia thích ứng cho việc mở", href: NOTES + "#l-1-6" }
    ]
  },
  {
    de: 8, n: 23, total: 60, sub: "1.5", subName: "Hook của Agent SDK: chặn tool call và chuẩn hóa dữ liệu", scen: "S1",
    answer: "B",
    ask: "<code>get_customer</code> returns dates as raw Unix timestamps. To show customers readable dates, the team adds a <code>PostToolUse</code> hook on <code>get_customer</code> that returns a block decision whose reason text lists the dates converted to ISO 8601. Logs confirm the hook runs on every call, yet the agent still reads raw Unix timestamps out to customers. What should the team change?",
    scene: [
      "<code>get_customer</code> trả ngày dạng Unix timestamp thô (số giây kể từ năm 1970, ví dụ <code>1772668800</code>).",
      "Team thêm hook <code>PostToolUse</code> (chạy sau khi tool trả kết quả) cho <code>get_customer</code>. Hook trả <code>decision: \"block\"</code> và ghi các ngày đã đổi sang ISO 8601 (dạng <code>2026-03-05T00:00:00Z</code>) vào <code>reason</code>.",
      "Log cho thấy hook chạy ở mọi lần gọi. Vậy mà agent vẫn đọc số timestamp thô cho khách.",
      "Chỗ khó: hook không hỏng. Nó trả bản quy đổi qua một kênh chỉ thêm ghi chú, còn kết quả gốc vẫn nằm nguyên trước mắt model."
    ],
    asks: [
      "Team nên đổi gì?",
      "Tức là: hook phải trả bản quy đổi qua đường nào để model chỉ còn thấy ngày đã đổi, không còn thấy số thô.",
      "Soi từng phương án: cuối cùng model đọc bản nào, bản gốc, bản đã đổi, hay cả hai?"
    ],
    facts: [
      "<code>PostToolUse</code> chạy sau khi tool trả kết quả, trước khi kết quả được nối vào <code>messages</code> cho Claude đọc. <code>PreToolUse</code> chạy trước khi tool chạy; <code>updatedInput</code> của nó chỉ sửa tham số gửi vào tool.",
      "Docs Hooks: với PostToolUse, <code>decision: \"block\"</code> chỉ thêm <code>reason</code> cạnh kết quả tool. Claude vẫn thấy output gốc; muốn thay thì dùng <code>updatedToolOutput</code>.",
      "<code>updatedToolOutput</code> thay hẳn kết quả tool trước khi Claude đọc, dùng được cho mọi tool. <code>additionalContext</code> chỉ nối thêm một đoạn cạnh kết quả.",
      "Số thô còn nằm trong context thì model vẫn có lúc dùng số thô. Chuẩn hóa dữ liệu muốn chắc chắn thì phải thay kết quả, không phải nhắc thêm."
    ],
    opts: [
      { k: "A", gist: "Rewrite the block decision's reason as structured JSON containing the converted fields, so the model can parse the values reliably.",
        why: [
          "Đổi hình thức, không đổi cơ chế: <code>reason</code> vẫn chỉ được thêm cạnh kết quả, output gốc với số thô vẫn còn (ý 2).",
          "Model thấy hai bản, một JSON gọn và một bản thô, và vẫn có thể chọn bản thô (ý 4). Đúng cái “lúc được lúc không” team cần bỏ."
        ] },
      { k: "B", gist: "Return the converted values in <code>updatedToolOutput</code>, which replaces the result the model receives, and drop the block decision.",
        why: [
          "Đúng trường: <code>updatedToolOutput</code> thay hẳn kết quả tool trước khi Claude đọc (ý 3). Số thô không bao giờ tới model.",
          "Bỏ block vì nó chỉ thêm ghi chú (ý 2). Giữ lại chỉ làm model thấy thêm một bản trùng.",
          "Hook chạy khi tool đã chạy xong, nên trường này chỉ đổi thứ Claude thấy, không đổi việc tool đã làm. Với một lần tra khách thì không sao."
        ] },
      { k: "C", gist: "Move the conversion into a <code>PreToolUse</code> hook that rewrites the call with <code>updatedInput</code>, so the tool receives arguments requesting normalized formats.",
        why: [
          "Sai chỗ: PreToolUse chạy trước khi tool chạy, <code>updatedInput</code> chỉ đổi tham số gửi vào (ý 1).",
          "Timestamp nằm trong thứ tool trả ra. Đề không kể <code>get_customer</code> có tham số nào chọn định dạng ngày, nên sửa lời gọi thì tool vẫn trả số thô."
        ] },
      { k: "D", gist: "Leave the tool result untouched and return the converted values in <code>additionalContext</code>, so the model sees them beside the raw output.",
        why: [
          "<code>additionalContext</code> là trường thật của PostToolUse, nhưng nó chỉ nối thêm cạnh kết quả (ý 3). Số thô vẫn nằm đó.",
          "Đây chính là lỗi team đang gặp với <code>reason</code>, chỉ chuyển sang một kênh nối thêm khác.",
          "Dễ bị cuốn vì “model thấy cả hai thì sẽ chọn bản dễ đọc” nghe hợp lý. Nhưng thấy cả hai thì vẫn có lúc chọn bản thô (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 1.5, mục “Biết thêm”: updatedToolOutput thay hẳn kết quả, additionalContext chỉ nối thêm", href: NOTES + "#l-1-5" },
      { label: "Docs Claude Code Hooks, mục PostToolUse decision control: block chỉ thêm reason, Claude vẫn thấy output gốc", href: "https://code.claude.com/docs/en/hooks" }
    ]
  },
  {
    de: 8, n: 24, total: 60, sub: "1.2", subName: "Điều phối coordinator–subagent", scen: "S1",
    answer: "A",
    ask: "The coordinator calls all three subagents (returns, billing, account issues) on every request, which triples subagent cost even though most requests involve only one area. Customer messages are often vague, and some mix two concerns. How should the coordinator decide which subagents to call?",
    scene: [
      "Coordinator có ba subagent: returns (đổi trả), billing (thanh toán), account issues (vấn đề tài khoản).",
      "Yêu cầu nào nó cũng gọi đủ cả ba, nên chi phí subagent gấp ba, trong khi phần lớn yêu cầu chỉ đụng một mảng.",
      "Chỗ khó: tin nhắn của khách hay mơ hồ, có tin còn trộn hai chuyện. Cách chọn nào chỉ dựa vào chữ khách viết sẽ dễ chọn sai."
    ],
    asks: [
      "Coordinator nên quyết định gọi subagent nào bằng cách nào?",
      "Tức là: cần một cách chọn vừa bớt gọi thừa, vừa hiểu được tin nhắn mơ hồ và tin nhắn có hai chuyện.",
      "Soi từng phương án: nó có bớt số subagent bị gọi không? Gặp tin mơ hồ hay trộn hai chuyện thì có chọn đúng không?"
    ],
    facts: [
      "Coordinator làm bốn việc: chia việc, chọn subagent cần cho yêu cầu này, giao việc, gom kết quả. Guide gọi việc chọn là dynamic selection (chọn động).",
      "Coordinator tạo subagent bằng một tool call (Task; docs mới gọi là <code>Agent</code>). Không phát tool call thì subagent đó không được tạo, không tốn gì.",
      "Nhiều Task call trong cùng một response thì các subagent chạy song song. Song song giảm thời gian chờ, không giảm số subagent phải trả tiền.",
      "Lớp định tuyến theo từ khóa (code đọc tin nhắn rồi chọn thay cho model) bỏ phí khả năng hiểu ngôn ngữ của model, và gãy khi khách nói khác từ khóa. Hook PreToolUse là luật cứng, hợp với luật nghiệp vụ rõ ràng như chặn hoàn tiền trên hạn mức."
    ],
    opts: [
      { k: "A", gist: "Let the coordinator reason about each request and issue Agent tool calls only for the subagents that request needs.",
        why: [
          "Đúng vai của coordinator (ý 1): nó đọc tin nhắn, hiểu khách đang nói chuyện gì, rồi chỉ gọi subagent của mảng đó.",
          "Subagent không cần thì không được tạo, nên chi phí thừa mất từ gốc (ý 2).",
          "Coordinator là model, nên đọc được tin mơ hồ. Tin trộn hai chuyện thì nó gọi hai subagent, chuyện nào có người lo chuyện đó."
        ] },
      { k: "B", gist: "Keep calling all three, but emit the three Agent tool calls in one coordinator response so the subagents run in parallel.",
        why: [
          "Gọi nhiều subagent trong một response đúng là cách chạy song song (ý 3). Thời gian chờ giảm.",
          "Nhưng yêu cầu nào vẫn trả tiền cho cả ba subagent. Đề hỏi chuyện chi phí gấp ba, và chi phí vẫn gấp ba.",
          "Dễ bị cuốn vì đây là kỹ thuật đúng, hay được hỏi. Nhưng nó sửa độ trễ, không sửa chi phí."
        ] },
      { k: "C", gist: "Add a code routing step in front of the coordinator that maps request keywords and identifier formats to a single subagent.",
        why: [
          "Định tuyến bằng code hợp khi yêu cầu có định dạng dễ đoán. Đề nói ngược lại: tin nhắn hay mơ hồ (ý 4).",
          "Khách không gọi đúng tên vấn đề thì chọn sai subagent. Tin trộn hai chuyện chỉ được gửi tới một subagent, chuyện thứ hai bị bỏ."
        ] },
      { k: "D", gist: "Add a <code>PreToolUse</code> hook that denies any Agent tool call for a subagent whose area is not named in the customer's message.",
        why: [
          "Hook là cơ chế đúng cho luật cứng (ý 4). Nhưng “khách có gọi đúng tên mảng không” không phải luật nghiệp vụ, chỉ là một phép so chữ không đáng tin.",
          "Tin mơ hồ hiếm khi ghi rõ “billing” hay “returns”, nên hook chặn cả những lần coordinator giao việc đúng."
        ] }
    ],
    refs: [
      { label: "Bài 1.2: coordinator chọn subagent theo từng yêu cầu (dynamic selection), không chạy đủ mọi subagent", href: NOTES + "#l-1-2" },
      { label: "Bài 1.3: chạy song song là nhiều Task call trong cùng một response", href: NOTES + "#l-1-3" },
      { label: "Bài 2.1: lớp định tuyến theo từ khóa là làm quá và gãy khi khách nói khác từ khóa", href: NOTES + "#l-2-1" }
    ]
  },
  {
    de: 8, n: 25, total: 60, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool", scen: "S1",
    answer: "D",
    ask: "When the email argument passed to <code>get_customer</code> is badly formatted, the tool returns <code>isError: true</code> with <code>errorCategory: \"permission\"</code> and <code>isRetryable: false</code>, and the agent escalates every such case to a human. Log review shows the agent itself usually caused the failure, for example by putting an order number into the email field although the customer had already supplied a valid email. What is the correct fix?",
    scene: [
      "Tham số email gửi vào <code>get_customer</code> sai định dạng thì tool trả lỗi như sau. Ví dụ minh họa, đúng các trường đề nêu:<pre><code>{ \"isError\": true,\n  \"errorCategory\": \"permission\",\n  \"isRetryable\": false }</code></pre>",
      "Agent đọc lỗi đó rồi chuyển mọi ca như vậy cho người thật.",
      "Log cho thấy lỗi thường do chính agent: khách đã đưa email đúng, nhưng agent điền mã đơn hàng vào ô email.",
      "Chỗ khó: lỗi này agent tự sửa được, nhưng tool lại gắn nhãn “permission” (không có quyền), nhãn dành cho việc agent không làm được."
    ],
    asks: [
      "Cách sửa đúng là gì?",
      "Tức là: tool nên báo lỗi thế nào để agent hiểu đây là input sai, tự điền lại cho đúng rồi gọi lại, thay vì chuyển người.",
      "Soi từng phương án: sau thay đổi đó, agent có biết lỗi nằm ở input và biết sửa thế nào không?"
    ],
    facts: [
      "Guide dùng bốn <code>errorCategory</code>, mỗi loại dẫn tới một cách xử lý: transient (tạm thời, như timeout: retry có backoff), validation (input sai: sửa input rồi gọi lại), business (vi phạm luật nghiệp vụ: giải thích cho khách), permission (không có quyền: escalate).",
      "Agent quyết bước tiếp theo bằng thông tin trong kết quả lỗi. Câu mô tả nói rõ định dạng mong đợi thì agent biết sửa tham số thế nào.",
      "<code>isRetryable</code> trả lời một câu: gửi lại y nguyên request đó thì có thành công không? Theo phép thử này, notes ghi validation là <code>false</code> (cùng input). Trường này do ứng dụng tự đặt, spec MCP chỉ chuẩn hóa <code>isError</code>.",
      "Prompt chỉ làm đúng theo xác suất. Prompt nói một đằng, metadata lỗi nói một nẻo thì model thấy hai tín hiệu trái nhau."
    ],
    opts: [
      { k: "A", gist: "Add a system prompt instruction telling the agent to check argument formats and retry <code>get_customer</code> with corrected values whenever a lookup fails.",
        why: [
          "Metadata vẫn ghi đây là lỗi quyền, không retry được, còn prompt bảo cứ sửa rồi thử lại. Model thấy hai tín hiệu trái nhau (ý 4).",
          "Prompt chỉ đúng theo xác suất, nên vẫn có ca bị chuyển người. Chỗ cần sửa là chính metadata lỗi (ý 1)."
        ] },
      { k: "B", gist: "Keep the current metadata and have the agent ask the customer to provide their email address again before calling <code>get_customer</code> once more.",
        why: [
          "Hỏi lại khách hợp khi khách đưa thiếu hoặc mơ hồ. Ở đây khách đã đưa email đúng, chính agent điền nhầm.",
          "Khách phải trả lời thêm một lượt cho lỗi agent tự sửa được, mà metadata vẫn sai nhãn như cũ.",
          "Dễ bị cuốn vì nghe lịch sự và an toàn. Nhưng nó đẩy việc sửa sang khách, và không đụng gì tới gốc là nhãn lỗi sai."
        ] },
      { k: "C", gist: "Catch these failures in the harness and retry the call with exponential backoff, surfacing the error to the agent only after the retries are used up.",
        why: [
          "Backoff dành cho lỗi tạm thời (ý 1). Tham số sai thì gửi lại y nguyên bao nhiêu lần cũng lỗi (ý 3).",
          "Phí mấy lần thử, chậm thêm, và tới lúc agent thấy lỗi thì nó vẫn mang nhãn permission, vẫn bị chuyển người."
        ] },
      { k: "D", gist: "Return <code>errorCategory: \"validation\"</code> with <code>isRetryable: true</code> and a message stating the expected email format, so the agent corrects the argument and retries.",
        why: [
          "Đúng loại: email sai định dạng là input sai, và cách xử của validation là sửa input rồi gọi lại (ý 1).",
          "Câu mô tả nói rõ định dạng email cần có (ý 2), nên agent thấy mình điền nhầm mã đơn, đổi lại email khách đã đưa rồi gọi lại. Ca được giải quyết ngay, không phải chuyển người.",
          "Riêng cờ <code>isRetryable: true</code> thì lệch phép thử trong notes (ý 3): gửi lại y nguyên tham số cũ vẫn lỗi. Phần làm D đúng là loại lỗi cộng câu mô tả. Xem ghi chú đáp án bên dưới."
        ] }
    ],
    dispute: "Đề gốc chấm D, sổ giữ D. Đề gốc ghép lỗi validation với <code>isRetryable: true</code>, vì hiểu “retry” là gọi lại tool sau khi sửa input. Notes hiểu “retry” là gửi lại y nguyên request, nên lỗi validation là <code>false</code> (câu 14 Đề 1 viết theo cách này). Cờ này do team tự đặt, spec MCP chỉ có <code>isError</code>, docs không định nghĩa nó, nên không bên nào sai docs. D đúng nhờ loại lỗi và câu mô tả nói rõ phải sửa gì, không nhờ cờ.",
    refs: [
      { label: "Bài 2.2, mục “Đã sửa 04/11”: isRetryable không có định nghĩa chính thức; notes và đề Udemy hiểu khác nhau ở lỗi validation", href: NOTES + "#fix-29" },
      { label: "Bài 2.2: bảng bốn errorCategory và việc agent nên làm với từng loại; mục “Biết thêm”: phép thử isRetryable", href: NOTES + "#l-2-2" },
      { label: "Cheatsheet D2: dòng “Lỗi này nên đặt isRetryable gì?”", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 8, n: 26, total: 60, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool", scen: "S1",
    answer: "D",
    ask: "When the orders API times out, <code>lookup_order</code> catches the exception and returns an empty list as a successful result, so the agent tells customers they have no orders. Some customers genuinely have none, and outages can last several minutes. How should the tool report these two situations?",
    scene: [
      "Orders API timeout thì <code>lookup_order</code> bắt exception rồi trả một danh sách rỗng, như một lần tra thành công.",
      "Agent đọc danh sách rỗng và nói với khách là họ không có đơn nào, kể cả khi họ có.",
      "Ràng buộc: có khách thật sự không có đơn, và mỗi lần API sập có thể kéo dài vài phút.",
      "Chỗ khó: hai ca cần cách xử lý khác hẳn nhau (một ca báo luôn cho khách, một ca thử lại hoặc chuyển người), mà tool trả giống hệt nhau."
    ],
    asks: [
      "Tool nên báo hai ca này thế nào?",
      "Tức là: mỗi ca phải có một tín hiệu riêng mà agent nhận ra ngay, và tín hiệu phải tới nhanh, vì khách đang chờ.",
      "Soi từng phương án: ca rỗng thật có bị báo sai không? Ca timeout có được đánh dấu lỗi không, và có làm treo cuộc hội thoại không?"
    ],
    facts: [
      "Access failure (không truy cập được): chưa biết nguồn có dữ liệu hay không, ví dụ timeout. Valid empty result (kết quả rỗng hợp lệ): tra xong, thật sự không có gì khớp. Hai ca phải trả về khác nhau: rỗng không phải lỗi, timeout không được giả làm rỗng.",
      "Tool báo chạy thất bại bằng cờ lỗi trong kết quả: <code>isError: true</code> bên MCP, <code>is_error: true</code> trong <code>tool_result</code> của Messages API. Đây là kênh có sẵn của giao thức cho lỗi thực thi.",
      "Các trường tự đặt như <code>errorCategory: \"transient\"</code>, <code>isRetryable: true</code> cho agent biết đây là lỗi tạm thời, gửi lại y hệt có thể thành công. Đây là quy ước riêng của ứng dụng, đặt cạnh cờ lỗi.",
      "Lỗi tạm thời thì retry có backoff 1–2 lần rồi báo lên, không retry vô hạn."
    ],
    opts: [
      { k: "A", gist: "Mark every empty list as a tool execution error, so the agent treats any response without orders as a failure it can retry or escalate.",
        why: [
          "Đảo ngược vấn đề: tra xong mà không có đơn là thành công, gắn cờ lỗi là báo sai (ý 1).",
          "Khách thật sự không có đơn sẽ bị thử lại hay chuyển người vô ích, trong khi câu trả lời đúng đã có từ đầu."
        ] },
      { k: "B", gist: "Return both situations as successes, with a status field in the JSON body set to <code>no_matches</code> or <code>backend_unavailable</code>, so the agent can read which case happened.",
        why: [
          "Trường status đúng là tách được hai ca. Nhưng ca timeout vẫn mang hình hài một lần tra thành công.",
          "Cờ lỗi là kênh giao thức dành cho lỗi thực thi (ý 2). Giấu lỗi trong thân một kết quả thành công thì agent, và mọi logic của harness dựa vào cờ lỗi, phải tự suy ra từ quy ước riêng. Kém chắc hơn.",
          "Dễ bị cuốn vì B là phương án duy nhất ngoài D có tách hai ca. Nhưng tách ca chưa đủ, lỗi còn phải đi đúng kênh báo lỗi."
        ] },
      { k: "C", gist: "Retry the backend call inside the tool with exponential backoff until the orders API responds, so the agent only ever receives real order data or a true empty list.",
        why: [
          "Retry tại chỗ với backoff hợp với trục trặc vài giây. Nhưng “until” (cho tới khi) là thử không giới hạn, trái cách xử lỗi tạm thời: thử 1–2 lần rồi báo lên (ý 4).",
          "API sập vài phút thì tool call treo vài phút, khách ngồi chờ ngay trong cuộc hội thoại. Agent cần một tín hiệu lỗi nhanh để tự quyết: thử lại sau, báo khách, hay chuyển người."
        ] },
      { k: "D", gist: "Flag timeouts as tool execution errors with the error flag plus your own transient and retryable metadata, and keep an empty list as a normal success.",
        why: [
          "Tách đúng hai ca (ý 1): không có đơn là kết quả rỗng bình thường, timeout là lỗi có cờ (ý 2).",
          "Metadata tự đặt cho agent biết lỗi tạm thời, thử lại được (ý 3). Thấy lỗi thì agent thử lại hoặc nói thật với khách là hệ thống đang trục trặc. Thấy rỗng thì báo khách không có đơn, không thử lại."
        ] }
    ],
    refs: [
      { label: "Bài 2.2, cuối mục “Lỗi trong hệ nhiều agent”: access failure và empty result hợp lệ phải trả về khác nhau", href: NOTES + "#l-2-2" },
      { label: "Bài nền tảng Domain 2, mục 4: tool lỗi vẫn trả kết quả, đánh dấu is_error (Messages API) hoặc isError (MCP)", href: NOTES + "#l-2-0" },
      { label: "Cheatsheet D2: dòng “Search trả mảng rỗng”: rỗng không phải lỗi, timeout không được giả làm rỗng", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 8, n: 27, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code", scen: "S1",
    answer: "B",
    ask: "A community MCP server already offers the Zendesk ticket-reading tools the agent needs. The agent must also write resolutions to a separate internal case-notes database, and the team wants to keep receiving the community server's updates without merging any code. What is the right design?",
    scene: [
      "Một MCP server cộng đồng đã có sẵn các tool đọc ticket Zendesk mà agent cần.",
      "Agent còn phải ghi kết quả xử lý vào một cơ sở dữ liệu ghi chú ca (case notes) nội bộ, nằm riêng.",
      "Ràng buộc: team muốn tiếp tục nhận bản cập nhật của server cộng đồng mà không phải tự merge code.",
      "Chỗ khó: một phần đã có sẵn, một phần chỉ team mới có. Phải ghép hai thứ mà không đụng tới phần có sẵn."
    ],
    asks: [
      "Thiết kế đúng là gì?",
      "Tức là: lấy Zendesk từ đâu, lấy tool ghi case notes từ đâu, sao cho phần cộng đồng vẫn nhận cập nhật như thường.",
      "Soi từng phương án: agent có tool ghi vào DB nội bộ không? Team có phải tự bảo trì tích hợp Zendesk không?"
    ],
    facts: [
      "Tích hợp phổ biến như Jira, GitHub, Zendesk đã có MCP server viết sẵn, do nhà cung cấp hoặc cộng đồng bảo trì. Chỉ tự viết server cho workflow đặc thù của team.",
      "Cấu hình nhiều MCP server thì tool của tất cả server được discover (dò ra) lúc kết nối và có sẵn đồng thời cho agent. Không cần gom về một server.",
      "Tool quyết định agent làm được gì. Không có tool nào chạm tới một hệ thì lời dặn trong prompt không đưa dữ liệu vào hệ đó được.",
      "Fork là chép code của server về sửa thành bản riêng. Từ đó mọi thay đổi phía cộng đồng phải tự merge vào bản của mình."
    ],
    opts: [
      { k: "A", gist: "Build one custom MCP server that wraps both the Zendesk API and the case-notes database behind the team's own tool conventions.",
        why: [
          "Sai ở chỗ viết lại tích hợp Zendesk, thứ đã có sẵn (ý 1).",
          "Team thành người bảo trì duy nhất: Zendesk đổi API là tự sửa. Mất luôn cập nhật của server cộng đồng mà đề muốn giữ.",
          "Dễ bị cuốn vì gom một chỗ, một quy ước đặt tên, trông gọn. Nhưng không có gì bắt phải gom (ý 2), và cái giá là ôm thêm việc bảo trì."
        ] },
      { k: "B", gist: "Connect the community server as published, and add a small custom MCP server that exposes only the case-notes tool.",
        why: [
          "Phần Zendesk dùng server cộng đồng nguyên bản (ý 1), nên vẫn nhận cập nhật, không phải merge gì.",
          "Server riêng chỉ lo đúng phần đặc thù là DB case notes. Tool của cả hai server có sẵn cùng lúc cho agent (ý 2)."
        ] },
      { k: "C", gist: "Add system prompt instructions telling the agent to log resolutions through the community server's ticket-comment tool.",
        why: [
          "Sai ở giả định: server Zendesk không có tool nào chạm tới DB case notes nội bộ (ý 3). Prompt không tạo ra được khả năng mà tool không có.",
          "Làm theo thì ghi chú nội bộ thành comment trên ticket Zendesk: dữ liệu nằm sai hệ, còn DB case notes vẫn trống."
        ] },
      { k: "D", gist: "Fork the community server, add a case-notes tool to the fork, and run the fork as the agent's only Zendesk server.",
        why: [
          "Chạy được, agent có đủ tool. Nhưng fork cắt đường cập nhật từ cộng đồng (ý 4): bản cập nhật nào cũng phải tự merge, trái đúng điều team muốn.",
          "Team còn thành người bảo trì một tích hợp chuẩn mà cộng đồng đang bảo trì sẵn."
        ] }
    ],
    refs: [
      { label: "Bài 2.4: tool của mọi server có sẵn đồng thời; tích hợp phổ biến thì dùng community server, chỉ tự viết cho workflow đặc thù", href: NOTES + "#l-2-4" },
      { label: "Cheatsheet D2: dòng “Tích hợp Jira/GitHub chuẩn” → community MCP server", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 8, n: 28, total: 60, sub: "4.6", subName: "Review độc lập và review nhiều lượt", scen: "S1",
    answer: "B",
    ask: "You add a refinement loop: after drafting a resolution, the agent critiques its own draft in the same session before it replies. The critique approves drafts that leave out one of the customer's stated issues, and the conversation history shows the agent had already concluded that issue was handled. Which change catches these gaps most reliably?",
    scene: [
      "Team thêm một vòng tinh chỉnh: agent viết nháp câu trả lời, tự phê bình bản nháp ngay trong cùng phiên, xong mới trả lời khách.",
      "Vòng phê bình vẫn duyệt những bản nháp bỏ sót một vấn đề khách đã nêu.",
      "Lịch sử hội thoại cho thấy agent đã từng kết luận vấn đề đó được lo rồi.",
      "Chỗ khó: agent không phải chưa nghĩ tới. Nó đã nghĩ, kết luận sai, và kết luận đó nằm sẵn trong context của bước phê bình."
    ],
    asks: [
      "Thay đổi nào bắt được các lỗ hổng này chắc nhất?",
      "Tức là: bước kiểm phải đọc bản nháp mà không bị kết luận sai trước đó kéo theo.",
      "Soi từng phương án: bước kiểm chạy trong context nào? Có còn thấy kết luận “đã lo rồi” không?"
    ],
    facts: [
      "Phiên vừa viết bản nháp vẫn giữ lý do lúc viết. Bảo nó tự kiểm thì nó hay bảo vệ quyết định của mình.",
      "Guide: một instance độc lập (lần gọi mới, context sạch), không mang reasoning trước đó, bắt lỗi tinh vi tốt hơn cả lời dặn tự review lẫn extended thinking.",
      "Extended thinking cho Claude nghĩ thêm trước khi trả lời, nhưng vẫn là cùng một context. Chạy lại cùng phép kiểm trên cùng context thì kết quả thường giống nhau.",
      "Subagent khởi động với context mới, chỉ biết những gì coordinator viết vào lời giao việc."
    ],
    opts: [
      { k: "A", gist: "Enable extended thinking for the drafting turn, so the agent reasons more deeply about each stated issue before producing the draft.",
        why: [
          "Extended thinking giúp khi model nghĩ chưa tới. Ở đây nó đã nghĩ tới vấn đề đó và kết luận sai (ý 3).",
          "Nghĩ thêm trong cùng context không xóa được kết luận đã có. Bước phê bình vẫn đọc lại kết luận đó và duyệt."
        ] },
      { k: "B", gist: "Have the coordinator pass the customer's request and the draft to a separate evaluation subagent that cannot see the drafting conversation.",
        why: [
          "Subagent đánh giá có context mới (ý 4). Nó chỉ thấy yêu cầu của khách và bản nháp, không thấy kết luận “đã lo rồi”.",
          "Đó đúng là instance độc lập guide nói tới (ý 2). Nó so từng vấn đề khách nêu với bản nháp như người đọc lần đầu, nên thấy chỗ bị sót.",
          "Phát hiện đó quay về coordinator. Coordinator giao điều tra thêm đúng vấn đề bị sót rồi viết lại câu trả lời."
        ] },
      { k: "C", gist: "Run the self-critique twice and approve the draft only if both passes agree that every stated issue is covered.",
        why: [
          "Hai lượt cùng đọc một hội thoại, cùng thấy kết luận “đã lo rồi” (ý 3). Kết quả hai lượt gần như giống nhau.",
          "Tốn gấp đôi mà không thêm góc nhìn độc lập nào."
        ] },
      { k: "D", gist: "Tighten the self-critique instructions so the agent lists every stated issue and confirms each one is addressed before approving the draft.",
        why: [
          "Checklist từng vấn đề là cải tiến prompt hợp lý. Nhưng bước kiểm vẫn chạy trong context đã sinh ra kết luận sai (ý 1).",
          "Tới vấn đề bị sót, agent đọc lại kết luận cũ và đánh dấu “đã lo”. Guide nói thẳng: instance độc lập tốt hơn lời dặn tự review (ý 2).",
          "Dễ bị cuốn vì liệt kê từng vấn đề nghe đúng là cách không bỏ sót. Nhưng thứ hỏng là chỗ bước kiểm đứng, không phải câu chữ của lời dặn."
        ] }
    ],
    refs: [
      { label: "Bài 4.6: phiên vừa sinh ra bài vẫn giữ lý do lúc viết; instance độc lập tốt hơn tự review và extended thinking", href: NOTES + "#l-4-6" },
      { label: "Bài 1.3: subagent bắt đầu với context trắng, chỉ biết lời giao việc", href: NOTES + "#l-1-3" }
    ]
  },
  {
    de: 8, n: 29, total: 60, sub: "1.5", subName: "Hook của Agent SDK: chặn tool call và chuẩn hóa dữ liệu", scen: "S1",
    answer: "A",
    ask: "Your team enforces the $500 refund limit with an Agent SDK hook. The billing MCP server exposes the refund tool to the agent as <code>mcp__billing__process_refund</code>. Sessions run with no one watching, and when the hook blocks a refund, the agent itself has to call <code>escalate_to_human</code> in the same session. Which hook design satisfies both conditions?",
    scene: [
      "Team chặn hạn mức hoàn tiền $500 bằng hook của Agent SDK. Tool hoàn tiền đến từ MCP server billing, tên đầy đủ là <code>mcp__billing__process_refund</code>.",
      "Điều kiện 1: phiên chạy không có ai ngồi xem.",
      "Điều kiện 2: hook chặn một lần hoàn tiền thì chính agent phải gọi <code>escalate_to_human</code>, ngay trong phiên đó.",
      "Chỗ khó: cả bốn phương án đều nhắm đúng tool. Khác nhau ở lúc hook chạy và quyết định nó trả về."
    ],
    asks: [
      "Thiết kế hook nào chạy được với cả hai điều kiện?",
      "Tức là: hook phải chặn trước khi tiền đi, không cần ai bấm duyệt, và phải cho agent biết lý do để tự chuyển ca.",
      "Soi từng phương án: lúc hook chạy thì tiền đã đi chưa? Quyết định đó cần ai trả lời? Sau đó agent còn được đi tiếp trong phiên không?"
    ],
    facts: [
      "<code>PreToolUse</code> chạy trước khi tool thực thi, nên chặn được hành động. <code>PostToolUse</code> chạy sau khi tool đã chạy thành công, lúc đó tiền đã đi.",
      "<code>matcher</code> chỉ xét tên tool. Tool MCP dùng tên đầy đủ dạng <code>mcp__server__tool</code>. Điều kiện theo số tiền phải kiểm trong thân hook, qua <code>tool_input</code>.",
      "PreToolUse trả một trong bốn <code>permissionDecision</code>: <code>allow</code> (cho chạy), <code>ask</code> (hỏi người dùng), <code>deny</code> (từ chối), <code>defer</code> (hoãn: lượt kết thúc với <code>stop_reason: \"tool_deferred\"</code>, app bên ngoài cho chạy tiếp tool call đó sau).",
      "Ai đọc <code>permissionDecisionReason</code> là tùy quyết định. <code>deny</code>: Claude đọc, để biết vì sao bị chặn. <code>ask</code>: người dùng đọc trong hộp hỏi quyền. <code>allow</code> và <code>defer</code>: chỉ ghi vào debug log."
    ],
    opts: [
      { k: "A", gist: "Add a <code>PreToolUse</code> hook matching <code>mcp__billing__process_refund</code> that denies calls above $500 and returns a <code>permissionDecisionReason</code> telling the agent to call <code>escalate_to_human</code> instead.",
        why: [
          "Chặn đúng lúc: PreToolUse chạy trước khi tiền đi (ý 1). Matcher dùng đúng tên đầy đủ của tool MCP, số tiền kiểm trong thân hook (ý 2).",
          "<code>deny</code> không cần ai bấm duyệt, nên hợp với phiên không người xem. Lý do được đưa cho Claude đọc (ý 4), nên agent biết phải gọi <code>escalate_to_human</code> và làm luôn trong phiên."
        ] },
      { k: "B", gist: "Add a <code>PostToolUse</code> hook matching <code>mcp__billing__process_refund</code> that checks the amount in the result and feeds an escalation instruction back to the agent when it exceeds $500.",
        why: [
          "Sai thời điểm: PostToolUse chạy sau khi tool đã chạy thành công (ý 1). Lúc hook thấy $700 thì $700 đã được hoàn.",
          "Nó ghi log hay nhắc agent escalate được, nhưng không ngăn được đúng việc phải ngăn."
        ] },
      { k: "C", gist: "Add a <code>PreToolUse</code> hook matching <code>mcp__billing__process_refund</code> that returns <code>permissionDecision: \"ask\"</code> for amounts above $500, so each large refund waits for an approval prompt.",
        why: [
          "<code>ask</code> là cách thật để có người duyệt, và lý do hiện cho người duyệt đọc (ý 4). Nhưng phiên này không có ai ngồi xem để trả lời hộp hỏi quyền.",
          "Đề cũng không đòi người duyệt từng lần hoàn tiền. Đề đòi agent tự chuyển ca qua <code>escalate_to_human</code>.",
          "Dễ bị cuốn vì “hoàn tiền lớn thì hỏi người” nghe đúng nghiệp vụ. Nhưng đường lên người ở đây là tool <code>escalate_to_human</code>, không phải hộp hỏi quyền."
        ] },
      { k: "D", gist: "Add a <code>PreToolUse</code> hook matching <code>mcp__billing__process_refund</code> that returns <code>permissionDecision: \"defer\"</code> for amounts above $500, so the pending call waits for an outside decision.",
        why: [
          "<code>defer</code> có chặn tool chạy. Nhưng nó kết thúc lượt với <code>stop_reason: \"tool_deferred\"</code> và trao quyền cho app bên ngoài: app quyết rồi mới cho chạy tiếp (ý 3).",
          "Agent không được đi tiếp trong phiên để tự gọi <code>escalate_to_human</code>, trái điều kiện 2. Lý do của <code>defer</code> cũng chỉ vào debug log, Claude không đọc (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 1.5: PreToolUse chặn process_refund trên $500 rồi chuyển sang escalate_to_human; matcher dùng tên mcp__server__tool", href: NOTES + "#l-1-5" },
      { label: "Bài 1.5, mục “Đã sửa 02/11”: PreToolUse có bốn quyết định, thêm defer", href: NOTES + "#fix-11" },
      { label: "Bài 1.5, mục “Đã sửa 03/11”: ai đọc permissionDecisionReason (deny: Claude; ask: người dùng; allow, defer: debug log)", href: NOTES + "#fix-28" }
    ]
  },
  {
    de: 8, n: 30, total: 60, sub: "1.4", subName: "Workflow nhiều bước có cổng chặn và bàn giao", scen: "S1",
    answer: "B",
    ask: "A support agent receives one message with three concerns: a refund for a damaged item, an address change on a different order, and a loyalty credit. Company policy computes that credit from the final refund amount. Multi-concern cases already run over the response-time target. How should the agent schedule the investigations?",
    scene: [
      "Một tin nhắn, ba việc: hoàn tiền cho món hàng bị hỏng, đổi địa chỉ cho một đơn khác, và một khoản loyalty credit (tiền thưởng cho khách thân thiết).",
      "Chính sách: khoản credit tính từ số tiền hoàn cuối cùng.",
      "Ràng buộc: ca nhiều việc vốn đã chậm hơn mục tiêu thời gian phản hồi.",
      "Chỗ khó: hai việc độc lập với nhau, còn một việc phải chờ kết quả của việc khác. Ví dụ minh họa:<pre><code>hoàn tiền    → ra số tiền hoàn → tính credit\nđổi địa chỉ  (không cần gì từ hai việc kia)</code></pre>"
    ],
    asks: [
      "Agent nên xếp lịch điều tra thế nào?",
      "Tức là: việc nào chạy cùng lúc được, việc nào phải chờ, để vừa nhanh vừa không tính credit trên dữ liệu chưa có.",
      "Soi từng phương án: có việc nào bị bỏ hay đẩy lại cho khách không? Credit có được tính khi đã có số tiền hoàn không? Có việc độc lập nào bị bắt chờ vô ích không?"
    ],
    facts: [
      "Tin nhắn nhiều việc: tách thành từng việc, điều tra song song, rồi trả lời gộp một lần, đủ mọi việc. Đừng để khách phải hỏi lại.",
      "Docs Sub-agents: chạy nhiều subagent song song hợp nhất khi các hướng điều tra không phụ thuộc nhau. Việc nhiều bước thì nối tiếp: bước trước xong, kết quả được chuyển cho bước sau.",
      "Chạy song song thì tổng thời gian bằng việc chậm nhất. Chạy lần lượt thì bằng tổng mọi việc."
    ],
    opts: [
      { k: "A", gist: "Settle the refund now and ask in the reply whether the customer still wants the credit and the address change handled.",
        why: [
          "Bỏ lại hai việc khách đã nói rõ, bắt khách trả lời thêm (ý 1). Ca kéo dài thêm vài lượt, đúng thứ mục tiêu giải quyết ngay lần đầu muốn tránh.",
          "Khách đã nêu cả ba việc, không có gì mơ hồ để phải hỏi lại."
        ] },
      { k: "B", gist: "Run the refund and address-change investigations in parallel, then handle the loyalty credit once the final refund amount is known.",
        why: [
          "Hoàn tiền và đổi địa chỉ không dùng gì của nhau, nên chạy song song (ý 2). Hai việc xong trong thời gian của việc chậm hơn (ý 3).",
          "Credit cần số tiền hoàn cuối cùng, nên chờ hoàn tiền xong rồi mới tính, với đúng số tiền đó.",
          "Chỉ bước phụ thuộc mới phải chờ. Xong cả ba thì trả lời gộp một lần (ý 1)."
        ] },
      { k: "C", gist: "Spawn one subagent per concern in the same turn, so every investigation finishes in the time of the slowest one.",
        why: [
          "Song song toàn phần hợp khi các việc độc lập (ý 2). Nhưng credit tính từ số tiền hoàn cuối cùng, mà lúc spawn thì số đó chưa có.",
          "Subagent tính credit phải làm với số thiếu hoặc số đoán, nên credit có thể sai.",
          "Dễ bị cuốn vì đề nhấn mạnh chuyện chậm, và C nhanh nhất. Nhưng nhanh mà tính sai thì vẫn phải làm lại."
        ] },
      { k: "D", gist: "Investigate the three concerns one after another in the main conversation, so each step can read every earlier finding.",
        why: [
          "An toàn: credit chắc chắn có số tiền hoàn. Nhưng chỉ một việc cần kết quả của việc trước.",
          "Bắt đổi địa chỉ chờ hoàn tiền là chờ vô ích. Tổng thời gian thành tổng ba việc (ý 3), trong khi ca này vốn đã chậm hơn mục tiêu."
        ] }
    ],
    refs: [
      { label: "Bài 1.4, mục “Khi khách hỏi ba việc một lúc”: tách, điều tra song song, trả lời gộp", href: NOTES + "#l-1-4" },
      { label: "Bài 1.3: chạy song song là nhiều Task call trong cùng một response", href: NOTES + "#l-1-3" },
      { label: "Docs Sub-agents, mục Run parallel research và Chain subagents: song song khi các hướng không phụ thuộc nhau, nối tiếp khi bước sau cần kết quả bước trước", href: "https://code.claude.com/docs/en/sub-agents" }
    ]
  },
  {
    de: 8, n: 31, total: 60, sub: "1.3", subName: "Gọi subagent, truyền context", scen: "S1",
    answer: "B",
    ask: "A billing-analysis subagent spent several minutes calling <code>lookup_order</code> and handed the coordinator only a short summary. The customer has now added new details, and the analysis has to continue from the full transaction records that subagent collected. How should the coordinator carry the work forward?",
    scene: [
      "Coordinator giao phân tích billing cho một subagent. Subagent gọi <code>lookup_order</code> mất vài phút, rồi chỉ gửi về một bản tóm tắt ngắn.",
      "Giờ khách bổ sung chi tiết mới. Phân tích phải làm tiếp từ “full transaction records” (toàn bộ dữ liệu giao dịch) mà subagent đã gom.",
      "Chỗ khó: dữ liệu đầy đủ đó không nằm ở coordinator. Nó chỉ có trong context của subagent kia, còn coordinator chỉ cầm bản tóm tắt."
    ],
    asks: [
      "Coordinator nên làm tiếp việc này thế nào?",
      "Tức là: cách nào cho bước phân tích tiếp theo có lại đủ dữ liệu giao dịch, mà khách không phải chờ thêm vài phút tra lại.",
      "Soi từng phương án: bước tiếp theo thật sự nắm được những gì, và có phải tra lại từ đầu không?"
    ],
    facts: [
      "Subagent thường (không phải fork) khởi động với context mới: system prompt của nó, lời giao việc của coordinator, CLAUDE.md và định nghĩa tool. Tool call và kết quả trung gian nằm lại trong subagent, chỉ tin nhắn cuối về tới coordinator.",
      "Mỗi lần gọi subagent tạo một instance mới, không nối tiếp lần trước. Muốn làm tiếp việc cũ thì resume chính subagent đó. Subagent được resume giữ toàn bộ lịch sử của nó: mọi tool call, kết quả và reasoning.",
      "Chạy xong, subagent trả kèm agent ID. Bên gọi dùng ID đó để resume: trong Claude Code là tool <code>SendMessage</code>, trong Agent SDK là resume phiên rồi nêu ID trong prompt.",
      "<code>AgentDefinition</code> là cấu hình tĩnh: description, system prompt, tool, model. Hai lần gọi cùng một loại subagent dùng chung cấu hình, không chung trạng thái."
    ],
    opts: [
      { k: "A", gist: "Spawn a new billing subagent and put the first run's summary in its Agent tool prompt so it starts from those findings.",
        why: [
          "Cách truyền thì đúng: lời giao việc là đường duy nhất đưa dữ liệu xuống subagent mới (ý 1).",
          "Nhưng coordinator chỉ có bản tóm tắt để truyền. Dữ liệu giao dịch đầy đủ nằm lại trong subagent cũ, chưa bao giờ về tới coordinator (ý 1). Subagent mới bắt đầu thiếu đúng thứ đề cần.",
          "Dễ bị cuốn vì “dán kết quả vào lời giao việc” là cách bài 1.3 dạy. Nhưng chỉ dán được cái mình đang cầm."
        ] },
      { k: "B", gist: "Resume the earlier billing subagent, because a resumed subagent keeps its whole conversation history, including earlier tool results.",
        why: [
          "Subagent cũ vẫn giữ mọi kết quả <code>lookup_order</code> trong lịch sử của nó. Resume là làm tiếp với nguyên lịch sử đó (ý 2).",
          "Coordinator chỉ cần gửi chi tiết mới của khách tới đúng subagent đó, qua agent ID nhận được lúc nó chạy xong (ý 3). Không tra lại, khách không phải chờ thêm vài phút.",
          "Docs ghi đúng tình huống này: muốn làm tiếp việc của một subagent thay vì bắt đầu lại thì resume nó."
        ] },
      { k: "C", gist: "Edit the subagent's system prompt in its <code>AgentDefinition</code> so it keeps its findings across invocations of that type.",
        why: [
          "Sai ở giả định: <code>AgentDefinition</code> là cấu hình, không phải trạng thái (ý 4). Lời dặn trong system prompt không tạo ra bộ nhớ giữa các lần gọi.",
          "Lần gọi sau vẫn là instance mới, context mới (ý 2). Nó đọc được câu “retain findings” (giữ lại phát hiện) nhưng không có phát hiện nào để giữ."
        ] },
      { k: "D", gist: "Spawn a new billing subagent and have it re-run the <code>lookup_order</code> calls to rebuild the transaction records before continuing.",
        why: [
          "Chạy được: tra lại thì có lại đủ dữ liệu.",
          "Nhưng lần đầu đã tốn vài phút gọi backend trong lúc khách chờ. Làm lại là gấp đôi thời gian và chi phí, trong khi dữ liệu vẫn còn nguyên trong subagent cũ, resume là lấy lại được (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Chuyện gì đang xảy ra”: subagent bắt đầu với trang giấy trắng, chỉ biết những gì lời giao việc ghi", href: NOTES + "#l-1-3" },
      { label: "Docs “Create custom subagents”, mục Resume subagents: mỗi lần gọi là instance mới; subagent được resume giữ đủ tool call, kết quả, reasoning; resume bằng SendMessage với agent ID", href: "https://code.claude.com/docs/en/sub-agents" },
      { label: "Docs “Subagents in the SDK”, mục What subagents inherit và Resume subagents: chỉ tin nhắn cuối về agent cha; resume phiên kèm agentId", href: "https://code.claude.com/docs/en/agent-sdk/subagents" }
    ]
  },
  {
    de: 8, n: 32, total: 60, sub: "4.1", subName: "Prompt có tiêu chí rõ để giảm false positive", scen: "S6",
    answer: "A",
    ask: "Reviewers have started dismissing every review flag unread, including correct <code>conflict_detected</code> mismatches. The trigger is the <code>formatting_anomaly</code> flag, which is wrong 70% of the time. When it is right, it catches corrupted dates, and all of its false alarms come from one source: valid regional date formats. What is the best first change?",
    scene: [
      "Pipeline trích xuất gắn nhiều loại cờ cho người review. Cờ <code>formatting_anomaly</code> (định dạng bất thường) sai tới 70%.",
      "Hậu quả lan sang các cờ khác: reviewer bỏ qua mọi cờ không đọc, kể cả cờ <code>conflict_detected</code> (số liệu mâu thuẫn) đang báo đúng.",
      "Chỗ khó: đề đã chỉ ra nguyên nhân. Mọi báo nhầm đều đến từ một chỗ: ngày viết theo định dạng vùng miền hợp lệ. Còn khi báo đúng, cờ này bắt được ngày bị hỏng, nên không bỏ hẳn được. Ví dụ minh họa:<pre><code>\"04.11.2026\"   // kiểu Đức, hợp lệ        → đang bị cờ (báo nhầm)\n\"2026-13-45\"   // tháng 13, ngày 45      → hỏng thật, cần cờ</code></pre>"
    ],
    asks: [
      "Thay đổi nào nên làm đầu tiên?",
      "Tức là: làm cờ này hết báo nhầm ở ngày vùng miền mà vẫn bắt được ngày hỏng, để reviewer tin lại các cờ.",
      "Soi từng phương án: nó làm cờ báo đúng hơn, hay chỉ đổi cách cờ hiện ra trước mắt reviewer?"
    ],
    facts: [
      "False positive là cờ báo nhầm. Precision là trong các cờ đã báo, bao nhiêu phần trăm đúng. Cờ này precision chỉ 30%.",
      "Niềm tin sụp theo cụm: một loại cờ báo nhầm nhiều làm người xem bỏ qua cả các loại đang đúng.",
      "Câu dặn mơ hồ, kiểu “flag unusual formatting” (báo định dạng lạ), để model tự đoán ranh giới. Cách sửa của guide là tiêu chí rõ theo loại: liệt kê cái phải báo, cái phải bỏ qua. Model xếp vào loại có sẵn thì tốt, đoán một ngưỡng mơ hồ thì kém.",
      "Confidence model tự chấm hiệu chuẩn kém: nó hay tự tin cả ở chỗ sai."
    ],
    opts: [
      { k: "A", gist: "Rewrite the <code>formatting_anomaly</code> trigger with explicit criteria that list the accepted regional date formats and define what counts as corruption.",
        why: [
          "Đi thẳng vào nguyên nhân đã biết. Định dạng vùng miền hợp lệ vào danh sách bỏ qua, ngày hỏng được định nghĩa cụ thể (ý 3).",
          "Cờ hết báo nhầm ở nguồn duy nhất gây báo nhầm, mà vẫn bắt được ngày hỏng. Precision lên (ý 1), reviewer có lý do để đọc lại cờ (ý 2).",
          "Guide còn cách tạm tắt loại cờ báo nhầm nhiều, sửa riêng rồi bật lại. Ở đây không có phương án đó, và nguyên nhân đã rõ nên sửa tiêu chí là đúng gốc."
        ] },
      { k: "B", gist: "Raise the severity of <code>formatting_anomaly</code> flags so reviewers must read them before any other flags, bringing attention back to the queue.",
        why: [
          "Đổi độ nổi, không đổi độ đúng. 70% vẫn báo nhầm, giờ còn nằm trên đầu mọi lượt review.",
          "Reviewer gặp cờ sai trước tiên, niềm tin càng sụp nhanh (ý 2). Nguyên nhân ngày vùng miền vẫn nguyên.",
          "Dễ bị cuốn vì đề kể reviewer “dismiss without reading” (bỏ qua không đọc), nghe như bệnh là thiếu chú ý. Nhưng họ bỏ qua vì cờ hay sai, ép đọc thì họ chỉ đọc thêm cờ sai."
        ] },
      { k: "C", gist: "Cap <code>formatting_anomaly</code> at a small fixed number of flags per batch so reviewers see less noise from that category.",
        why: [
          "Giới hạn số lượng, không giới hạn tỉ lệ sai. Số cờ còn lại vẫn khoảng 70% báo nhầm (ý 1).",
          "Tệ hơn, cờ bắt ngày hỏng thật có thể bị cắt mất chỉ vì đã đủ suất. Nguyên nhân vẫn chưa sửa."
        ] },
      { k: "D", gist: "Add a self-rated confidence score to each <code>formatting_anomaly</code> flag so reviewers can triage the likely false alarms first.",
        why: [
          "Sai ở giả định: confidence tự chấm hiệu chuẩn kém (ý 4). Xếp theo nó là xếp lại đống báo nhầm, không bớt cái nào.",
          "Reviewer đang bỏ qua cờ không đọc, giờ còn phải đọc thêm một con số. Thứ làm họ mất tin vẫn còn nguyên."
        ] }
    ],
    refs: [
      { label: "Bài 4.1, mục “Chuyện gì đang xảy ra” và “Niềm tin sụp theo cụm”: câu dặn mơ hồ không phải tiêu chí; một loại báo nhầm nhiều kéo cả hệ xuống", href: NOTES + "#l-4-1" },
      { label: "Cheatsheet D4: dòng “Một category báo sai nhiều, dev bỏ qua cả category đúng”", href: NOTES + "#cheat-d4" }
    ]
  },
  {
    de: 8, n: 33, total: 60, sub: "4.6", subName: "Review độc lập và review nhiều lượt", scen: "S6",
    answer: "B",
    ask: "A review pipeline first checks each section of a document on its own. A final pass then reviews the whole document, re-running every per-section check as well as the cross-section checks. Its findings are shallow, uneven in depth, and repeat what the per-section passes already found. The team wants the final pass to report only what the per-section passes cannot find. How should they redesign it?",
    scene: [
      "Pipeline review chạy hai tầng. Tầng 1: mỗi phần (section) của tài liệu được kiểm riêng. Tầng 2: một lượt cuối đọc cả tài liệu.",
      "Lượt cuối đang ôm hai việc: chạy lại mọi phép kiểm của từng phần, cộng thêm phép kiểm xuyên phần (cross-section).",
      "Kết quả: finding nông, chỗ kỹ chỗ sơ, và trùng với finding của tầng 1.",
      "Chỗ khó: team đòi lượt cuối chỉ báo thứ tầng 1 không tìm ra được. Ví dụ: các dòng hàng ở phần thanh toán có cộng khớp với tổng ghi ở phần khác không."
    ],
    asks: [
      "Team nên thiết kế lại lượt cuối thế nào?",
      "Tức là: cho lượt cuối một việc hẹp mà tầng 1 không làm được, và cách để nó không báo lại thứ đã báo.",
      "Soi từng phương án: lượt cuối còn ôm cả tài liệu không, và nó có biết tầng 1 đã báo gì không?"
    ],
    facts: [
      "Attention dilution (loãng chú ý): nhồi quá nhiều việc vào một lượt thì chú ý bị dàn mỏng, chỗ kỹ chỗ qua loa. Context window to hơn không chữa được: nó chứa được nhiều hơn, không chú ý tốt hơn.",
      "Multi-pass của guide: lượt riêng cho từng phần lo lỗi cục bộ, độ sâu đồng đều. Rồi một lượt tích hợp chỉ nhìn quan hệ xuyên phần.",
      "Lượt tích hợp nhận finding của các lượt trước. Ví dụ prompt trong notes: “Given these 14 findings, check cross-file data flow” (cho 14 finding này, kiểm luồng dữ liệu xuyên file).",
      "Chạy nhiều lần rồi chỉ giữ finding lặp lại ở đa số lần nằm ở cột Tệ của notes: lỗi thật chỉ bắt được đôi lúc sẽ bị bỏ."
    ],
    opts: [
      { k: "A", gist: "Run the full-scope final pass three times and keep only findings that show up in at least two of the runs, removing unstable ones.",
        why: [
          "Lượt nào cũng vẫn ôm cả tài liệu, vẫn loãng chú ý như nhau (ý 1). Bỏ phiếu chỉ lọc nhiễu giữa các lần chạy.",
          "Lỗi xuyên phần thật mà lượt nông chỉ bắt được một lần sẽ bị loại (ý 4). Còn finding trùng với tầng 1 thì lần nào cũng có, nên vẫn qua lọc."
        ] },
      { k: "B", gist: "Restrict the final pass to cross-section consistency checks, and give it the per-section findings plus the fields that span sections.",
        why: [
          "Bỏ phần chạy lại phép kiểm từng phần, lượt cuối hết ôm cả tài liệu. Nó còn đúng một việc tầng 1 không làm được: quan hệ giữa các phần (ý 2).",
          "Việc hẹp thì chú ý không bị dàn mỏng, độ sâu đều hơn (ý 1).",
          "Có finding của tầng 1 trong tay, nó biết cái gì đã báo nên không báo lại (ý 3). Đúng yêu cầu chỉ báo thứ tầng 1 không tìm ra."
        ] },
      { k: "C", gist: "Keep the final pass's full scope but move it to a model with a larger context window so every section gets enough attention.",
        why: [
          "Sai ở giả định: context to hơn lo chuyện chứa được, không lo chuyện chú ý (ý 1). Tài liệu vốn không bị cắt.",
          "Lượt cuối vẫn ôm mọi phép kiểm, vẫn nông và vẫn trùng với tầng 1.",
          "Dễ bị cuốn vì triệu chứng “uneven in depth” (chỗ kỹ chỗ sơ) nghe như model không nhìn hết. Nhưng nó nhìn hết, chỉ là chú ý bị chia cho quá nhiều việc."
        ] },
      { k: "D", gist: "Scope the final pass to the fields that span sections, but run it as a fresh instance without the per-section findings so earlier results cannot bias it.",
        why: [
          "Nửa đầu đúng: thu hẹp về các trường xuyên phần là đúng hướng (ý 2).",
          "Nhưng không có finding tầng 1 thì nó không biết lỗi nào trên các trường đó đã được báo, nên báo lại (ý 3). Trái yêu cầu “report only what the per-section passes cannot find” (chỉ báo thứ tầng 1 không tìm ra).",
          "Dễ bị cuốn vì instance mới, context sạch là cách bài 4.6 dạy để review độc lập. Nhưng cách đó chống chuyện tự bênh code mình sinh ra, không chống báo trùng. Ở đây finding tầng 1 là dữ liệu cần có, không phải reasoning cần tránh."
        ] }
    ],
    refs: [
      { label: "Bài 4.6, mục “Cách sửa”: lượt từng file cho lỗi cục bộ, lượt tích hợp cho việc xuyên file; context lớn hơn không sửa được loãng chú ý", href: NOTES + "#l-4-6" },
      { label: "Bài 1.6: ví dụ prompt chaining, lượt tích hợp nhận “these 14 findings”; chạy 3 lần lấy đa số nằm ở cột Tệ", href: NOTES + "#l-1-6" }
    ]
  },
  {
    de: 8, n: 34, total: 60, sub: "5.5", subName: "Review người và hiệu chuẩn confidence", scen: "S6",
    answer: "C",
    ask: "Every extracted field comes with a confidence score the model reports for itself. The plan is to let fields scored 0.9 or above skip human review, yet in a pilot several fields scored 0.95 turned out to be wrong. What should the team do before relying on this routing rule?",
    scene: [
      "Mỗi trường trích ra kèm một điểm confidence do chính model tự báo.",
      "Kế hoạch: trường từ 0.9 trở lên thì khỏi qua người review.",
      "Chạy thử (pilot): vài trường được chấm 0.95 mà vẫn sai.",
      "Chỗ khó: chưa ai biết 0.95 thực ra ứng với bao nhiêu phần trăm đúng. Luật route (chia đường: tự duyệt hay đưa người) đang dựa trên một con số chưa được đo."
    ],
    asks: [
      "Trước khi tin luật route này, team phải làm gì?",
      "Tức là: kiểm xem mỗi mức điểm thật sự đúng bao nhiêu, rồi đặt ngưỡng theo số đo đó.",
      "Soi từng phương án: nó cho team biết điểm số có khớp với đúng sai thật không, hay chỉ đổi một thứ khác?"
    ],
    facts: [
      "Confidence tự báo chưa hiệu chuẩn: 0.9 không có nghĩa là đúng 90%. Nó chỉ là một giá trị model viết vào schema, như mọi trường khác.",
      "Calibration (hiệu chuẩn): đối chiếu điểm với đúng sai thật trên labeled validation set (bộ mẫu đã có đáp án do người gán), để biết mỗi khoảng điểm thực sự đúng bao nhiêu phần trăm, rồi mới chọn ngưỡng route. Ví dụ minh họa trong notes:<pre><code>Điểm model báo   Số mẫu   Đúng thật\n0.90 – 1.00        400     392 (98%)\n0.70 – 0.90        300     231 (77%)</code></pre>",
      "Schema validation chỉ kiểm hình dạng: JSON hợp lệ, đủ trường, đúng kiểu. Giá trị sai mà đúng kiểu vẫn qua.",
      "Câu dặn mơ hồ như “chấm thận trọng hơn” không cho model quy tắc nào để làm theo."
    ],
    opts: [
      { k: "A", gist: "Add few-shot examples of correct extractions for the error-prone fields so the model makes fewer mistakes at every confidence level.",
        why: [
          "Few-shot có thể làm trích xuất đúng hơn. Nhưng chuyện của đề là điểm không khớp với đúng sai, không phải tỉ lệ sai cao hay thấp (ý 1).",
          "Sửa xong, team vẫn không biết 0.9 mới ứng với bao nhiêu phần trăm đúng. Luật route vẫn chưa được kiểm (ý 2).",
          "Dễ bị cuốn vì làm model ít sai hơn nghe như gỡ đúng triệu chứng “0.95 mà sai”. Nhưng câu hỏi là có tin được con số không, và chỉ đo mới trả lời được."
        ] },
      { k: "B", gist: "Rely on JSON schema validation to gate auto-acceptance, since values that pass the schema have met the system's quality checks.",
        why: [
          "Sai ở giả định: schema chỉ kiểm hình dạng (ý 3). Trường 0.95 mà sai trong pilot vẫn đúng kiểu, vẫn qua schema.",
          "Lỗi ở đây là sai nghĩa, nên schema không phân được trường nào an toàn để tự duyệt."
        ] },
      { k: "C", gist: "Measure accuracy within each confidence band on a labeled sample, and set the auto-accept threshold where measured accuracy is high.",
        why: [
          "Đúng bước hiệu chuẩn (ý 2): chia mẫu có nhãn theo khoảng điểm, đo tỉ lệ đúng thật của từng khoảng.",
          "Khoảng nào đo ra đủ cao thì đặt ngưỡng ở đó. Đo ra 0.9–1.0 chỉ đúng 80% thì phải dời ngưỡng hoặc thêm bước kiểm. Ngưỡng giờ dựa vào số đo, không dựa vào mặt chữ của con số (ý 1).",
          "Notes dặn thêm: chia tiếp theo loại tài liệu và theo trường, vì một con số chung có thể che một nhóm sai nhiều."
        ] },
      { k: "D", gist: "Instruct the model to assign confidence more conservatively so uncertain fields stop getting scores above the 0.9 cutoff.",
        why: [
          "Sai ở giả định: câu dặn “thận trọng hơn” không có quy tắc nào để làm theo (ý 4). Điểm dịch đi một cách khó đoán, không thành ra đã hiệu chuẩn.",
          "Team vẫn không biết 0.9 sau khi dặn ứng với bao nhiêu phần trăm đúng (ý 2). Thứ luật route cần biết vẫn chưa có."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D5, mục 4: hiệu chuẩn là gì, bảng điểm theo khoảng so với tỉ lệ đúng thật", href: NOTES + "#l-5-0" },
      { label: "Bài 5.5, mục “Chuyện gì đang xảy ra”: confidence 0.9 không có nghĩa đúng 90%; phải có labeled validation set rồi mới route", href: NOTES + "#l-5-5" }
    ]
  },
  {
    de: 8, n: 35, total: 60, sub: "5.5", subName: "Review người và hiệu chuẩn confidence", scen: "S6",
    answer: "B",
    ask: "High-confidence extractions bypass human review. The team puts their error rate at 0.4%, counting only the mistakes that downstream teams report back. Before automation is expanded, leadership wants an error rate for this automated stream that can be trusted. How should the team measure it?",
    scene: [
      "Extraction có confidence cao đi thẳng, không qua người review.",
      "Team ước error rate (tỉ lệ lỗi) của luồng này là 0.4%. Cách đếm: chỉ tính lỗi mà các team phía sau báo ngược lại.",
      "Lãnh đạo muốn một con số đáng tin trước khi mở rộng tự động hóa.",
      "Chỗ khó: lỗi chỉ được đếm khi có người tình cờ thấy và chịu báo lại. Giá trị sai mà không ai soi thì không bao giờ vào con số 0.4%."
    ],
    asks: [
      "Team nên đo error rate thế nào?",
      "Tức là: đo trên đúng luồng không ai kiểm, bằng cách không phụ thuộc vào chuyện có ai phát hiện lỗi hay không.",
      "Soi từng phương án: nó đo đúng nhóm dữ liệu chưa? Và đo bằng đáp án thật do người kiểm, hay bằng một thứ thay thế?"
    ],
    facts: [
      "Human review sampling: lấy mẫu một phần kết quả tự động cho người kiểm, để đo tỉ lệ lỗi thật và phát hiện kiểu lỗi mới.",
      "Với phần đã tự động, guide 5.5 đòi stratified random sampling định kỳ: chia theo tầng (loại tài liệu, trường) rồi lấy ngẫu nhiên trong từng tầng, để nhóm nhỏ cũng chắc được kiểm.",
      "Confidence tự báo chưa hiệu chuẩn: model có thể tự tin mà sai. Lấy điểm trung bình đổi ra tỉ lệ lỗi là con số chưa đối chiếu với đáp án thật nào.",
      "Schema validation chỉ kiểm hình dạng (JSON hợp lệ, đủ trường, đúng kiểu), không kiểm giá trị có khớp tài liệu gốc không."
    ],
    opts: [
      { k: "A", gist: "Report one minus the average self-reported confidence across the auto-processed extractions as the error rate.",
        why: [
          "Sai ở giả định: coi confidence tự báo là xác suất đúng đã hiệu chuẩn (ý 3).",
          "Luồng này toàn điểm cao, nên con số ra rất đẹp. Nhưng nó không được so với đáp án thật nào, và trường sai mà tự tin vẫn kéo trung bình lên."
        ] },
      { k: "B", gist: "Have reviewers check a stratified random sample drawn every week from the auto-processed extractions, and compute the error rate from it.",
        why: [
          "Mẫu lấy thẳng từ luồng tự động, tức đúng nhóm không ai đang kiểm (ý 1).",
          "Chọn ngẫu nhiên nên không phụ thuộc chuyện có ai phát hiện lỗi hay không. Lỗi âm thầm cũng có cơ hội vào mẫu như lỗi bị báo.",
          "Chia tầng giữ cho loại tài liệu hiếm không chìm trong trung bình (ý 2). Lấy hằng tuần thì bắt được cả kiểu lỗi mới khi dữ liệu đầu vào đổi."
        ] },
      { k: "C", gist: "Track the share of auto-processed extractions that pass JSON schema validation and report that pass rate as accuracy.",
        why: [
          "Sai ở giả định: qua schema nghĩa là đúng hình dạng, không phải đúng giá trị (ý 4).",
          "Giá trị nằm nhầm trường hay số không khớp tài liệu vẫn qua schema. Tỉ lệ qua sẽ gần 100%, thổi phồng độ chính xác."
        ] },
      { k: "D", gist: "Compute the error rate from the low-confidence queue that reviewers already label, since every extraction there has a verified outcome.",
        why: [
          "Đáp án thật thì có, nhưng đo sai nhóm. Đề hỏi tỉ lệ lỗi của luồng confidence cao, luồng bỏ qua review.",
          "Hàng chờ confidence thấp là những ca model thấy khó nhất. Tỉ lệ lỗi ở đó không nói gì về luồng tự động.",
          "Dễ bị cuốn vì tận dụng được nhãn sẵn có, đỡ tốn công. Nhưng nhóm đã có nhãn và nhóm cần đo khác nhau ngay từ cách chia."
        ] }
    ],
    refs: [
      { label: "Bài 5.5, mục “Vì sao phải stratified”: lấy mẫu phân tầng từ phần tự động để đo error rate thật và bắt kiểu lỗi mới", href: NOTES + "#l-5-5" },
      { label: "Bài Nền tảng D5, mục 4: định nghĩa human review sampling", href: NOTES + "#l-5-0" }
    ]
  },
  {
    de: 8, n: 36, total: 60, sub: "4.2", subName: "Few-shot cho output ổn định", scen: "S6",
    answer: "B",
    ask: "The prompt asks the model to flag extracted payment terms as non-standard, and it includes six clear-cut few-shot examples: three standard, three non-standard. Almost all false positives are borderline wordings, such as a standard clause with one added sentence offering an early-payment discount. Which change to the examples cuts false positives the most?",
    scene: [
      "Prompt bảo model gắn cờ non-standard (không chuẩn) cho điều khoản thanh toán trích ra.",
      "Prompt có 6 ví dụ few-shot, đều rõ ràng: 3 chuẩn, 3 không chuẩn.",
      "Gần như mọi báo nhầm rơi vào câu chữ lưng chừng. Ví dụ: điều khoản chuẩn, chỉ thêm một câu giảm giá nếu trả sớm.",
      "Chỗ khó: 6 ví dụ đều nằm xa ranh giới, nên chỉ xác nhận những gì model đã làm đúng. Chỗ sai thì không ví dụ nào chạm tới. Ví dụ minh họa:<pre><code>\"Net 30 days.\"                         → chuẩn (có ví dụ)\n\"Net 30 days. 2% off if paid in 10 days.\" → chuẩn, nhưng không ví dụ nào giống, đang bị cờ nhầm</code></pre>"
    ],
    asks: [
      "Đổi ví dụ thế nào để giảm báo nhầm nhiều nhất?",
      "Tức là: cho model thấy ranh giới giữa chuẩn và không chuẩn nằm ở đâu, đúng chỗ nó đang sai.",
      "Soi từng phương án: nó có đưa vào ví dụ sát ranh giới không, hay chỉ thêm số lượng, thêm lời dặn, thêm ép định dạng?"
    ],
    facts: [
      "Few-shot dạy ranh giới quyết định, không chỉ dạy định dạng. Guide khuyên 2–4 ví dụ nhắm đúng ca mơ hồ, kèm lý do, để model khái quát sang ca mới.",
      "Một cặp ví dụ “cái này chấp nhận được, không báo” và “cái kia mới là lỗi thật, báo” giảm false positive (báo nhầm) mà vẫn giữ khả năng khái quát.",
      "Câu dặn kiểu “only when highly confident” (chỉ khi rất chắc) bắt model tự chấm độ tự tin, mà con số đó hiệu chuẩn kém. Nó không phải tiêu chí.",
      "<code>tool_choice</code> ép model gọi tool, schema ép hình dạng output. Cờ sai vẫn là một boolean đúng kiểu."
    ],
    opts: [
      { k: "A", gist: "Add more labeled examples from additional contract families, still keeping them clearly standard or clearly non-standard.",
        why: [
          "Thêm dạng hợp đồng giúp khi model bám vào hình thức bề ngoài của một nguồn tài liệu. Đề không kể chuyện đó: báo nhầm nằm ở câu chữ lưng chừng của điều khoản quen.",
          "Ví dụ mới vẫn rõ ràng, vẫn xa ranh giới, nên không chỉ ra được ranh giới nằm đâu (ý 1). Thêm số lượng, không thêm phán đoán.",
          "Dễ bị cuốn vì “thêm ví dụ, đa dạng hơn” nghe đúng tinh thần few-shot. Nhưng đa dạng phải đúng chiều: chiều đang thiếu là sát ranh giới, không phải nhiều loại hợp đồng."
        ] },
      { k: "B", gist: "Replace some of the clear-cut examples with labeled near-boundary clauses, both standard and non-standard.",
        why: [
          "Đặt tín hiệu dạy vào đúng chỗ đang sai. Ví dụ “điều khoản chuẩn + câu giảm giá trả sớm → vẫn chuẩn” cho model thấy thẳng ranh giới (ý 1, ý 2).",
          "Có cả ca sát ranh giới mà đúng là không chuẩn, nên model không lật sang bỏ sót. Kèm lý do thì nó khái quát được sang các câu chữ tương tự (ý 1).",
          "Thay bớt ví dụ rõ ràng chứ không cộng thêm, nên prompt không phình ra."
        ] },
      { k: "C", gist: "Add an instruction to set the non-standard flag only when the model is highly confident the term deviates.",
        why: [
          "Sai ở giả định: “highly confident” không có định nghĩa, lại dựa vào điểm tự chấm hiệu chuẩn kém (ý 3).",
          "Model không có quy tắc kiểm được nào cho ca lưng chừng. Ranh giới dịch đi khó đoán, có khi bỏ sót cả ca không chuẩn thật."
        ] },
      { k: "D", gist: "Force the extraction tool with <code>tool_choice</code> so every document yields a structured extraction containing the flag field.",
        why: [
          "Sai chỗ: ép tool chỉ bảo đảm model gọi tool và trả đủ trường (ý 4). Lỗi ở đây là giá trị của cờ, không phải hình dạng.",
          "Cờ sai vẫn đến đủ, đúng kiểu boolean. Phán đoán đằng sau giá trị không đổi."
        ] }
    ],
    refs: [
      { label: "Bài 4.2, mục “Bốn chỗ few-shot phát huy”: ca mơ hồ, và cặp ví dụ “chấp nhận được vs lỗi thật” giảm false positive", href: NOTES + "#l-4-2" },
      { label: "Bài 4.1, mục “Chuyện gì đang xảy ra”: “only high-confidence” không phải tiêu chí, confidence tự chấm lệch xa độ đúng thật", href: NOTES + "#l-4-1" },
      { label: "Docs “Prompting best practices”, mục Use examples effectively: ví dụ phải sát ca thật và phủ cả ca biên", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
    ]
  },
  {
    de: 8, n: 37, total: 60, sub: "4.4", subName: "Validate, retry kèm lỗi và vòng phản hồi", scen: "S6",
    answer: "B",
    ask: "The extraction schema has <code>stated_total</code>, <code>calculated_total</code> and a <code>conflict_detected</code> flag. Spot checks confirm the flagged extractions are accurate: those invoices really do state a total that differs from the sum of their line items. How should the pipeline handle the flagged records?",
    scene: [
      "Schema trích xuất có ba trường: <code>stated_total</code> (tổng in trên hóa đơn), <code>calculated_total</code> (tổng các dòng hàng do model tự cộng) và cờ <code>conflict_detected</code> (phát hiện mâu thuẫn).",
      "Spot check (kiểm ngẫu nhiên vài bản) cho thấy bản ghi bị cờ đều trích đúng. Chính các hóa đơn đó in một tổng khác với tổng các dòng hàng.",
      "Chỗ khó: lỗi không nằm ở Claude mà nằm ở tờ hóa đơn. Ví dụ minh họa:<pre><code>{ \"stated_total\": 1420.00,\n  \"calculated_total\": 1240.00,\n  \"conflict_detected\": true }   // giấy in 1.420, các dòng cộng ra 1.240</code></pre>"
    ],
    asks: [
      "Pipeline nên xử lý các bản ghi bị cờ thế nào?",
      "Tức là: tài liệu tự mâu thuẫn, Claude đọc đúng, thì đưa bản ghi đi đâu.",
      "Soi từng phương án: nó coi mâu thuẫn là lỗi trích xuất cần sửa, hay là sự thật về tài liệu cần người phân xử?"
    ],
    facts: [
      "Trích cả <code>calculated_total</code> bên cạnh <code>stated_total</code> để validator có cái mà so. Hai số lệch là thấy ngay.",
      "<code>conflict_detected</code> là <code>true</code> nghĩa là lỗi nằm ở tờ giấy, không phải ở Claude: đưa người, không gọi lại.",
      "Retry kèm lỗi (gửi lại tài liệu, output cũ, câu lỗi) sửa được lỗi định dạng và lỗi trích xuất. Lỗi nằm ở nguồn thì gọi lại bao nhiêu lần cũng ra lại đúng hai con số đó.",
      "Schema chỉ bảo đảm hình dạng. Chuyện các con số có khớp nhau không là việc của validator và luồng xử lý quanh nó."
    ],
    opts: [
      { k: "A", gist: "Instruct the model to overwrite <code>stated_total</code> with <code>calculated_total</code> when they differ, so downstream systems get consistent values.",
        why: [
          "Ghi đè là làm sai lệch điều tài liệu thật sự in. Hệ thống phía sau nhận số “khớp” mà không biết tờ hóa đơn có vấn đề.",
          "Mất luôn bằng chứng mâu thuẫn mà hai trường được thiết kế ra để giữ (ý 1). Lỗi tính tiền ở nguồn bị che đi.",
          "Dễ bị cuốn vì “consistent values” (số nhất quán) nghe như dữ liệu sạch. Nhưng là sạch giả: khớp trong DB, lệch so với giấy."
        ] },
      { k: "B", gist: "Send each flagged invoice to a human review queue with both totals attached, since the contradiction lives in the document itself.",
        why: [
          "Đúng nghĩa của cờ: <code>true</code> là tài liệu tự mâu thuẫn, đưa người (ý 2).",
          "Kèm cả hai tổng thì người xem thấy ngay lệch bao nhiêu, đi đối chiếu với nhà cung cấp hay chứng từ khác. Phân xử là việc của người, không phải của model.",
          "Cờ đã được kiểm là chính xác, nên hàng chờ này toàn ca thật sự cần người."
        ] },
      { k: "C", gist: "Re-run each flagged extraction with the original document and the numeric discrepancy in the retry prompt, so the model can correct the totals.",
        why: [
          "Retry kèm lỗi làm đúng kỹ thuật, nhưng nó chỉ sửa lỗi của model (ý 3). Ở đây model đã đọc đúng.",
          "Gọi lại thì model đọc lại đúng hai con số trên giấy, cờ vẫn bật. Tệ hơn, bị câu lỗi thúc, nó có thể sửa một con số cho khớp, tức là bịa.",
          "Dễ bị cuốn vì đây là pattern bài 4.4 dạy cho ca “cộng không ra tổng”. Nhưng pattern đó dành cho ca Claude đọc nhầm, mà spot check đã loại khả năng đó."
        ] },
      { k: "D", gist: "Drop <code>stated_total</code> from the schema and keep only <code>calculated_total</code>, so conflicting values never reach downstream systems.",
        why: [
          "Bỏ tổng in trên giấy là mất luôn khả năng phát hiện tài liệu tự mâu thuẫn (ý 1).",
          "Giữ mỗi tổng tự cộng là tin mù các dòng hàng. Dòng hàng in sai mà tổng in đúng thì giờ cũng không ai biết."
        ] }
    ],
    refs: [
      { label: "Bài 4.4, mục “Cho schema tự lộ chỗ sai”: calculated_total cạnh stated_total; conflict_detected true là lỗi ở tờ giấy, đưa người, không gọi lại", href: NOTES + "#l-4-4" },
      { label: "Cheatsheet D4: dòng “Tổng lệch, hỏi retry hay chuyển người”", href: NOTES + "#cheat-d4" }
    ]
  },
  {
    de: 8, n: 38, total: 60, sub: "5.6", subName: "Giữ nguồn và xử lý mâu thuẫn khi tổng hợp", scen: "S6",
    answer: "AC",
    ask: "A first pass condenses each 60-page contract into a short summary, and a second pass pulls every obligation's quoted clause and <code>source_page</code> out of that summary. Auditors often find the quote is not on the cited page, and retries that resend the summary along with the error do not help. Which TWO changes fix the attribution errors? (Select TWO.)",
    scene: [
      "Lượt 1 nén mỗi hợp đồng 60 trang thành một bản tóm tắt ngắn.",
      "Lượt 2 đọc bản tóm tắt đó, trích từng nghĩa vụ (obligation) kèm câu trích nguyên văn và <code>source_page</code> (trang nguồn).",
      "Kiểm toán hay thấy câu trích không nằm ở trang được ghi. Retry gửi lại bản tóm tắt kèm lỗi cũng không khá hơn.",
      "Chỗ khó: lượt 2 không bao giờ thấy hợp đồng gốc. Số trang đã rơi mất ở bước nén, nên số trang nó ghi là nhớ lơ mơ hoặc đoán. Ví dụ minh họa:<pre><code>hợp đồng gốc:  trang 37 “Supplier shall deliver within 14 days…”\nbản tóm tắt:   “Giao hàng trong 14 ngày.”   // không còn số trang\nlượt 2 ghi:    source_page: 12              // đoán</code></pre>"
    ],
    asks: [
      "Hai thay đổi nào sửa được lỗi ghi nguồn?",
      "Tức là: một thay đổi cho lượt trích có lại thông tin trang, và một thay đổi bắt được câu trích lệch trang trước khi bản ghi đi tiếp.",
      "Soi từng phương án: thông tin trang có nằm trong input của lượt trích không? Và có gì so output với tài liệu gốc không?"
    ],
    facts: [
      "Attribution (ghi nguồn) mất trong bước tóm tắt: bản tóm tắt giữ kết luận, không giữ claim nằm ở trang nào. Bước sau chỉ còn bản tóm tắt thì không lấy lại được nguồn.",
      "Retry kèm lỗi chỉ sửa được khi thông tin cần có trong input. Thông tin vắng thì gọi lại bao nhiêu lần cũng không moi ra được. Phải đưa tài liệu có thông tin đó vào.",
      "Schema bảo đảm cú pháp, không bảo đảm nghĩa: <code>source_page</code> là một số nguyên hợp lệ không có nghĩa câu trích nằm ở trang đó. Muốn bắt lỗi nghĩa thì cần validator so output với nguồn.",
      "Trường required mà input không có thông tin thì model điền đại cho đủ."
    ],
    opts: [
      { k: "A", gist: "Add an automated check that each extracted quote actually appears on its stated page in the original contract.",
        why: [
          "Đây là validator ngữ nghĩa (ý 3): lấy câu trích, tìm trên đúng trang ghi trong hợp đồng gốc. Không thấy là lỗi.",
          "Bắt được lỗi ghi nguồn trước khi bản ghi tới hệ thống phía sau. Schema không làm được việc này.",
          "Đi cặp với C: check này bắt lỗi, C cho lần chạy lại có đủ dữ kiện để sửa."
        ] },
      { k: "B", gist: "Add few-shot examples of correct quote and page pairs to the second-pass prompt so the model sees the expected attribution pattern.",
        why: [
          "Few-shot dạy định dạng và ranh giới quyết định. Ở đây model không thiếu hiểu biết về cách ghi, nó thiếu dữ kiện: bản tóm tắt không còn số trang (ý 1).",
          "Ví dụ không tạo ra được thông tin vắng trong input (ý 2). Cùng lý do mà retry trên bản tóm tắt đã thất bại.",
          "Dễ bị cuốn vì few-shot là cách quen để output ổn định hơn. Nhưng ổn định ở hình dạng, còn số trang vẫn là đoán."
        ] },
      { k: "C", gist: "Re-run failed extractions on the original contract instead of the summary, because the summary no longer holds the page information.",
        why: [
          "Đúng chỗ retry đang hỏng: thông tin trang không có trong bản tóm tắt, nên retry trên đó vô ích (ý 2).",
          "Hợp đồng gốc có đủ trang và câu nguyên văn. Lần chạy lại có dữ kiện thật để ghi nguồn đúng (ý 1)."
        ] },
      { k: "D", gist: "Make <code>source_page</code> a required field in the JSON schema so validation rejects any record that omits the page number.",
        why: [
          "Sai bệnh: required chặn chuyện bỏ trống, mà ở đây trường đã được điền, chỉ là điền sai (ý 3).",
          "Input không có số trang mà ép phải có thì model càng bịa (ý 4). Lỗi ghi nguồn có khi tăng chứ không giảm."
        ] }
    ],
    refs: [
      { label: "Bài 5.6, mục “Chuyện gì đang xảy ra”: attribution mất trong bước tóm tắt; mỗi claim phải đi kèm nguồn và trích đoạn", href: NOTES + "#l-5-6" },
      { label: "Bài 4.4, mục “Chuyện gì đang xảy ra”: retry vô ích khi thông tin vắng ở input; đưa thêm tài liệu có thông tin", href: NOTES + "#l-4-4" }
    ]
  },
  {
    de: 8, n: 39, total: 60, sub: "4.5", subName: "Xử lý theo lô (Batch)", scen: "S6",
    answer: "A",
    ask: "An overnight extraction batch of 5,000 documents finishes with 150 errored results. Every error object shows <code>invalid_request_error</code>, because the affected contracts are larger than the model's context window. What is the correct recovery workflow?",
    scene: [
      "Một batch trích xuất qua đêm gồm 5.000 tài liệu. Xong, có 150 kết quả lỗi.",
      "Lỗi nào cũng là <code>invalid_request_error</code>, vì các hợp đồng đó vượt context window của model.",
      "Chỗ khó: phải làm đúng hai việc. Tìm đúng 150 tài liệu lỗi trong file kết quả, và sửa request trước khi gửi lại, vì lỗi nằm ở chính request."
    ],
    asks: [
      "Quy trình phục hồi đúng là gì?",
      "Tức là: nhận diện đúng tài liệu lỗi, sửa cho nó vừa context, và chỉ gửi lại phần đó.",
      "Soi từng phương án: nó tìm tài liệu lỗi bằng gì, và request gửi lại có khác request cũ không?"
    ],
    facts: [
      "Mỗi request trong batch mang một <code>custom_id</code> do mày đặt. Kết quả có thể không về theo thứ tự gửi, nên ghép kết quả với tài liệu bằng <code>custom_id</code>, không bằng vị trí dòng.",
      "Docs: request <code>errored</code> do <code>invalid_request_error</code> thì phải sửa request trước khi gửi lại. Lỗi loại khác (lỗi phía server) thì gửi lại thẳng được.",
      "Context window là giới hạn của model, không phải của đường gọi. Tài liệu vượt context thì gọi batch hay gọi thường đều lỗi. Sửa bằng chunking: cắt tài liệu thành nhiều phần, mỗi phần một request.",
      "Batch có request lỗi: lọc phần lỗi theo <code>custom_id</code>, chunk rồi nộp riêng trong một batch mới. Không nộp lại cả lô."
    ],
    opts: [
      { k: "A", gist: "Gather the <code>custom_id</code> values of the errored requests, split those contracts into smaller chunks, and submit a new batch holding only the fixed requests.",
        why: [
          "Lọc theo <code>custom_id</code> ra đúng 150 tài liệu lỗi (ý 1). 4.850 kết quả tốt giữ nguyên, không trả tiền chạy lại.",
          "Chunk từng hợp đồng cho vừa context là sửa đúng chỗ gây lỗi (ý 2, ý 3). Request mới khác request cũ, nên lần này chạy được.",
          "Nộp riêng một batch mới chỉ chứa phần đã sửa, vẫn được giá batch (ý 4)."
        ] },
      { k: "B", gist: "Submit a new batch that resends the 150 failed requests unchanged, since errored batch requests often succeed on a plain retry.",
        why: [
          "Gửi lại y nguyên chỉ hợp với lỗi phía server (ý 2). Đây là <code>invalid_request_error</code>.",
          "Hợp đồng vẫn vượt context, nên 150 request lỗi lại y như cũ (ý 3).",
          "Dễ bị cuốn vì đúng là có loại lỗi batch gửi lại thẳng được. Nhưng đề đã nói rõ loại lỗi và nguyên nhân, cả hai đều chỉ ra phải sửa request."
        ] },
      { k: "C", gist: "Locate the failed documents by their line position in the results file, which mirrors submission order, and resubmit corrected requests.",
        why: [
          "Sai ở giả định: kết quả có thể không về theo thứ tự gửi (ý 1). Dòng thứ N chưa chắc là tài liệu thứ N.",
          "Sửa đúng cách mà sửa nhầm tài liệu: có hợp đồng lỗi bị bỏ sót, có hợp đồng đã xong bị chạy lại."
        ] },
      { k: "D", gist: "Send the 150 failed contracts unchanged through the synchronous Messages API, where the batch processing limits do not apply.",
        why: [
          "Sai ở giả định: context window là của model, không phải của Batch API (ý 3). Gọi thường thì hợp đồng vẫn vượt context.",
          "Lỗi y như cũ, còn mất phần giảm 50% của batch."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Khi batch có request lỗi”: lọc theo custom_id, chunk, chỉ nộp lại phần lỗi", href: NOTES + "#l-4-5" },
      { label: "Cheatsheet D4: dòng “12/500 request batch lỗi”: resubmit chỉ các custom_id đó, chunk nhỏ", href: NOTES + "#cheat-d4" },
      { label: "Docs Batch processing: kết quả có thể không theo thứ tự, ghép bằng custom_id; invalid_request_error thì sửa request trước khi gửi lại", href: "https://platform.claude.com/docs/en/build-with-claude/batch-processing" }
    ]
  },
  {
    de: 8, n: 40, total: 60, sub: "4.2", subName: "Few-shot cho output ổn định", scen: "S6",
    answer: "AB",
    ask: "All three few-shot examples in the prompt come from a single vendor's invoice layout. On documents with new layouts, the model places values in the wrong fields, yet every output still passes schema validation. Which TWO changes best help the model generalize to layouts the examples do not cover? (Select TWO.)",
    scene: [
      "Prompt có 3 ví dụ few-shot, cả 3 lấy từ hóa đơn của một nhà cung cấp, cùng một bố cục (layout).",
      "Gặp hóa đơn bố cục mới, model đặt giá trị vào nhầm trường. Output nào cũng vẫn qua schema.",
      "Chỗ khó: định dạng output đã đúng. Cái sai là chọn giá trị nào cho trường nào, và chính bộ ví dụ đang dạy lệch. Ví dụ minh họa:<pre><code>3 ví dụ mẫu:   tổng tiền luôn ở góc dưới bên phải\nhóa đơn mới:   góc dưới bên phải là số tài khoản ngân hàng\n→ model đưa số tài khoản vào total, JSON vẫn hợp lệ</code></pre>"
    ],
    asks: [
      "Hai thay đổi nào giúp model khái quát tốt nhất sang bố cục chưa có trong ví dụ?",
      "Tức là: dạy model quy tắc ghép giá trị vào trường, thứ không phụ thuộc bố cục, thay vì bắt chước vị trí trên một mẫu giấy.",
      "Soi từng phương án: nó dạy quy tắc hay chỉ thêm khuôn để khớp? Và nó nhắm vào nghĩa hay vào hình dạng output?"
    ],
    facts: [
      "Docs: ví dụ phải “diverse” (đa dạng), phủ ca biên và khác nhau đủ để Claude không nhặt phải pattern ngoài ý muốn. Ba ví dụ cùng một bố cục thì chính bố cục là pattern ngoài ý muốn.",
      "Guide: ví dụ kèm lý do vì sao chọn cách này thay vì cách kia thì model mới khái quát sang ca mới, thay vì chỉ khớp y hệt ví dụ.",
      "Cấu trúc tài liệu đa dạng là một trong bốn chỗ notes nêu few-shot phát huy, ví dụ paper có mục Methods riêng và paper lồng phương pháp trong phần kết quả.",
      "Schema và ví dụ về định dạng lo hình dạng output. Output đã qua schema thì lỗi nằm ở nghĩa: giá trị nào vào trường nào."
    ],
    opts: [
      { k: "A", gist: "Replace the three examples with ones taken from several different document structures that all map to the same target fields.",
        why: [
          "Phá đúng pattern ngoài ý muốn: mỗi ví dụ một bố cục thì vị trí trên giấy không còn là thứ để bắt chước (ý 1).",
          "Model thấy cùng một quy tắc ghép trường đúng trên nhiều cấu trúc, nên áp được sang bố cục chưa gặp (ý 3)."
        ] },
      { k: "B", gist: "Add a short rationale to each example explaining why each value was assigned to its field.",
        why: [
          "Lý do biến ví dụ thành bài giải mẫu: không chỉ input ra output, mà vì sao giá trị này thuộc trường này (ý 2).",
          "Hiểu được vì sao thì model áp được cùng phán đoán lên tài liệu trông khác hẳn ví dụ.",
          "Đi cặp với A: A cho nhiều cấu trúc, B cho cách nghĩ dùng chung cho mọi cấu trúc."
        ] },
      { k: "C", gist: "Add two or three examples that demonstrate the exact output format, including correct field names and value types for every entry.",
        why: [
          "Ví dụ định dạng hợp khi output lộn xộn, sai cấu trúc. Đề nói output nào cũng qua schema, tức định dạng đã đúng (ý 4).",
          "Lỗi nằm ở chọn giá trị cho trường, ví dụ định dạng không chạm tới.",
          "Dễ bị cuốn vì “thêm few-shot cho format” là bài quen của 4.2. Nhưng đó là thuốc cho output lệch hình dạng, không phải cho bệnh này."
        ] },
      { k: "D", gist: "Add a new example for every vendor layout as it shows up in production, so each future document has a close match in the prompt.",
        why: [
          "Liệt kê bố cục chỉ cứu được bố cục đã gặp. Hóa đơn đầu tiên của mỗi bố cục mới vẫn sai, trái đúng yêu cầu “layouts the examples do not cover” (bố cục ví dụ chưa có).",
          "Prompt phình mãi theo số nhà cung cấp. Đó là thêm khuôn cho từng ca, không phải dạy quy tắc (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 4.2, mục “Chuyện gì đang xảy ra” và “Bốn chỗ few-shot phát huy”: ví dụ kèm lý do để khái quát; ví dụ cho cấu trúc tài liệu đa dạng", href: NOTES + "#l-4-2" },
      { label: "Docs “Prompting best practices”, mục Use examples effectively: Relevant, Diverse (không để Claude nhặt pattern ngoài ý muốn), Structured", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
    ]
  },
  {
    de: 8, n: 41, total: 60, sub: "4.5", subName: "Xử lý theo lô (Batch)", scen: "S6",
    answer: "D",
    ask: "All 20,000 documents for the week are in by Friday at 6 p.m., and the extracted results are due Monday at 8 a.m. The team wants to keep the 50% batch discount. Which submission plan reliably meets the deadline?",
    scene: [
      "Cả tuần dồn lại 20.000 tài liệu, đến đủ trước 18 giờ thứ Sáu. Kết quả trích xuất phải có trước 8 giờ sáng thứ Hai.",
      "Team muốn giữ mức giảm 50% của Batch.",
      "Chỗ khó: đề hỏi “reliably” (chắc chắn kịp). Thời gian batch thường chạy không tính, phải tính theo trường hợp xấu nhất."
    ],
    asks: [
      "Kế hoạch nộp nào chắc chắn kịp hạn?",
      "Tức là: vừa giữ giá Batch, vừa kịp hạn kể cả khi batch chạy hết thời gian tối đa.",
      "Soi từng phương án hai điều: thời gian xấu nhất có lọt hạn không, và còn được giảm 50% không."
    ],
    facts: [
      "Message Batches API rẻ hơn 50% so với gọi Messages API đồng bộ. Đổi lại, một batch có thể mất tới 24 giờ và không có cam kết thời gian (SLA). Docs nói đa số batch xong trong một giờ, nhưng “đa số” không phải cam kết.",
      "Tính hạn theo trường hợp xấu nhất: giờ nộp + 24 giờ phải trước hạn. Hạn 8 giờ sáng thứ Hai thì nộp muộn nhất 8 giờ sáng Chủ nhật. Nộp sớm hơn thì dư thêm.",
      "Batch không nhận <code>stream: true</code>. Kết quả về một lần, dạng file <code>.jsonl</code>, khi <code>processing_status</code> chuyển sang <code>ended</code>. Mày poll (hỏi lại định kỳ) để biết lúc xong, rồi ghép từng kết quả với tài liệu bằng <code>custom_id</code>, vì kết quả không về theo thứ tự gửi."
    ],
    opts: [
      { k: "A", gist: "Submit the batch Friday evening with streaming turned on, so results trickle in over the weekend.",
        why: [
          "Sai ở giả định: batch không nhận <code>stream: true</code> (ý 3). Request bị từ chối ngay.",
          "Kết quả batch chỉ về một lần khi cả lô xong, nên không có chuyện “nhận dần” qua cuối tuần."
        ] },
      { k: "B", gist: "Submit a single batch Sunday evening, so the extracted data is ready just before the Monday review.",
        why: [
          "Sai ở chỗ tính theo thời gian thường gặp. Nộp tối Chủ nhật, batch chạy đủ 24 giờ thì tới tối thứ Hai mới xong, trễ hạn 8 giờ sáng (ý 1, ý 2).",
          "Dễ bị cuốn vì đa số batch xong trong một giờ, nộp tối Chủ nhật thường vẫn kịp. Nhưng “thường kịp” không phải “reliably” (chắc chắn kịp) như đề đòi."
        ] },
      { k: "C", gist: "Process the documents with synchronous API calls on a Saturday schedule, which makes the finish time predictable.",
        why: [
          "Gọi đồng bộ thì chắc kịp, nhưng trả đủ giá cho 20.000 request, mất mức giảm 50% team muốn giữ (ý 1).",
          "Gọi đồng bộ chỉ đáng khi hạn chặt hơn 24 giờ. Ở đây từ tối thứ Sáu tới sáng thứ Hai còn dư xa, nên trả thêm tiền mà không được gì."
        ] },
      { k: "D", gist: "Submit one batch Friday evening, as soon as the whole document set is in.",
        why: [
          "Nộp lúc 18 giờ thứ Sáu, xấu nhất batch chạy đủ 24 giờ thì 18 giờ thứ Bảy xong (ý 1). Còn dư hơn một ngày rưỡi trước hạn (ý 2).",
          "Mọi request đều được giảm 50%, đúng điều team muốn giữ.",
          "Xong thì poll thấy <code>ended</code>, lấy file kết quả, ghép theo <code>custom_id</code> (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Chuyện gì đang xảy ra”: batch rẻ 50%, tối đa 24 giờ, không cam kết thời gian", href: NOTES + "#l-4-5" },
      { label: "Cheatsheet D4: các dòng về Batch (tối đa 24h, không SLA, nhịp submit tính từ hạn)", href: NOTES + "#cheat-d4" },
      { label: "Docs “Batch processing”: thời hạn 24 giờ, tham số không hỗ trợ (stream), cách poll và lấy kết quả", href: "https://platform.claude.com/docs/en/build-with-claude/batch-processing" }
    ]
  },
  {
    de: 8, n: 42, total: 60, sub: "4.2", subName: "Few-shot cho output ổn định", scen: "S6",
    answer: "D",
    ask: "To handle ambiguous invoice layouts, the team put three worked examples in the prompt, directly above the target document, with nothing marking where one section ends and the next begins. Some extractions now return vendor names that exist only in the example excerpts. What is the most reliable fix?",
    scene: [
      "Để xử lý hóa đơn có bố cục mơ hồ, team thêm ba ví dụ mẫu có sẵn lời giải vào prompt.",
      "Ba ví dụ dán ngay trên tài liệu cần trích, không có gì đánh dấu chỗ hết phần này, sang phần kia.",
      "Triệu chứng: có lần kết quả trả về tên nhà cung cấp chỉ có trong ví dụ, không có trong tài liệu thật.",
      "Chỗ khó: ví dụ và tài liệu thật trông y hệt nhau, cùng có tên nhà cung cấp, tổng tiền, ngày, cùng định dạng."
    ],
    asks: [
      "Cách sửa nào chắc nhất?",
      "Tức là: làm sao cho model biết chắc đoạn nào là ví dụ để học, đoạn nào là tài liệu phải trích.",
      "Soi từng phương án: nó cho model ranh giới rõ, hay chỉ bớt ví dụ, làm ví dụ kém thật đi, hoặc dặn bằng lời?"
    ],
    facts: [
      "XML tag là thẻ tự đặt như <code>&lt;example&gt;</code>, <code>&lt;document&gt;</code>. Thẻ không phải lệnh đặc biệt, chỉ giúp Claude tách đâu là dữ liệu, đâu là chỉ dẫn, đâu là ví dụ.",
      "Docs Prompting best practices: bọc từng ví dụ trong <code>&lt;example&gt;</code>, nhiều ví dụ thì gom trong <code>&lt;examples&gt;</code>, để Claude phân biệt ví dụ với chỉ dẫn. Prompt trộn chỉ dẫn, ngữ cảnh, ví dụ và input thì mỗi loại một thẻ riêng.",
      "Ví dụ tốt có bốn tính chất: relevant (sát ca thật), diverse (đa dạng), structured (bọc trong thẻ), few &amp; targeted (ít và nhắm đích). Ví dụ giống tài liệu thật mới dạy được model."
    ],
    opts: [
      { k: "A", gist: "Cut the prompt down to one worked example, so there is less example text the model could mistake for the input document.",
        why: [
          "Ít chữ ví dụ hơn nhưng vẫn không có ranh giới. Ví dụ còn lại vẫn nằm sát tài liệu thật, vẫn trông y như nó (ý 1).",
          "Còn mất luôn phần ví dụ cho các bố cục mơ hồ, là lý do team thêm ví dụ từ đầu (ý 3)."
        ] },
      { k: "B", gist: "Add an instruction at the top saying extraction must use only the last document in the prompt and ignore everything above it.",
        why: [
          "Lời dặn này cần model biết tài liệu cuối bắt đầu từ đâu. Prompt không có gì đánh dấu chỗ đó, nên model vẫn phải đoán.",
          "Dễ bị cuốn vì nó nói thẳng điều mày muốn, lại không đụng tới ví dụ. Nhưng chỉ dẫn và ranh giới đi cùng nhau, không thay nhau được. Thiếu ranh giới thì “chỉ lấy phần cuối” cũng không biết áp vào đâu."
        ] },
      { k: "C", gist: "Swap the realistic values in the examples for obvious placeholders such as <code>VENDOR_NAME</code>, so example data can't pass as real extractions.",
        why: [
          "Giá trị rò ra dễ thấy hơn, nhưng gốc vẫn còn: không có ranh giới giữa ví dụ và tài liệu (ý 1).",
          "Ví dụ mất chất thật nên dạy kém đi (ý 3). Model vẫn có thể lấy nhầm từ phần ví dụ, chỉ là giờ trả về <code>VENDOR_NAME</code>."
        ] },
      { k: "D", gist: "Wrap each example in an <code>example</code> tag, group them inside an <code>examples</code> tag, and put the input document in its own <code>document</code> tag.",
        why: [
          "Sửa đúng gốc: mỗi phần có thẻ riêng, model biết đoạn nào là ví dụ, đoạn nào là tài liệu phải trích (ý 1, ý 2). Ví dụ minh họa:<pre><code>&lt;examples&gt;\n  &lt;example&gt;hóa đơn mẫu 1 + kết quả&lt;/example&gt;\n  &lt;example&gt;hóa đơn mẫu 2 + kết quả&lt;/example&gt;\n  &lt;example&gt;hóa đơn mẫu 3 + kết quả&lt;/example&gt;\n&lt;/examples&gt;\n&lt;document&gt;\nhóa đơn cần trích\n&lt;/document&gt;</code></pre>",
          "Ví dụ vẫn đủ ba cái, vẫn giống hóa đơn thật, nên vẫn dạy được các bố cục mơ hồ (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D4, mục 4 “Ba cách chỉnh lời dặn”: XML tag giúp Claude tách dữ liệu, chỉ dẫn và ví dụ", href: NOTES + "#l-4-0" },
      { label: "Bài 4.2, khung “Khái niệm của bài”: thẻ example bọc từng ví dụ để Claude biết đâu là ví dụ", href: NOTES + "#l-4-2" },
      { label: "Docs “Prompting best practices”, mục Use examples effectively và Structure prompts with XML tags", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
    ]
  },
  {
    de: 8, n: 43, total: 60, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema", scen: "S6",
    answer: "B",
    ask: "The extraction request forces <code>extract_metadata</code> by name through <code>tool_choice</code>. After a developer turns on extended thinking for this request, it fails with a 400 error. The cost budget allows one API request per document, and every document must still get a guaranteed <code>extract_metadata</code> call. What is the correct fix?",
    scene: [
      "Request trích xuất ép gọi <code>extract_metadata</code> bằng <code>tool_choice</code> dạng ép đúng tool: <code>{\"type\": \"tool\", \"name\": \"extract_metadata\"}</code>.",
      "Dev bật extended thinking (cho Claude nghĩ thêm trong các block thinking trước khi trả lời) cho request này. Từ đó request báo lỗi 400 (request không hợp lệ).",
      "Hai ràng buộc: mỗi tài liệu chỉ được một request API, và tài liệu nào cũng phải chắc chắn có lần gọi <code>extract_metadata</code>.",
      "Chỗ khó: có cách sửa hợp lệ với API nhưng phạm một trong hai ràng buộc."
    ],
    asks: [
      "Sửa thế nào cho đúng?",
      "Tức là: hết lỗi 400 mà vẫn giữ cả hai ràng buộc, một request mỗi tài liệu và chắc chắn có tool call.",
      "Soi từng phương án: request còn lỗi 400 không? Còn bảo đảm gọi tool không? Có quá một request không?"
    ],
    facts: [
      "<code>tool_choice</code> có các mức: <code>auto</code> (Claude tự quyết có gọi tool không), <code>any</code> (bắt buộc gọi một tool nào đó), <code>tool</code> (bắt buộc gọi đúng tool có tên đó), và <code>none</code>. Chỉ <code>any</code> và <code>tool</code> mới bảo đảm có tool call.",
      "Bật extended thinking thủ công (<code>thinking: {type: \"enabled\"}</code>) thì chỉ dùng được <code>auto</code> và <code>none</code>. Gửi <code>any</code> hay <code>tool</code> thì lỗi. Lý do: ép tool thì API điền sẵn lượt assistant cho nó mở đầu ngay bằng <code>tool_use</code>, không còn chỗ cho block thinking.",
      "<code>strict: true</code> trên một tool chỉ buộc input Claude điền phải khớp schema của tool đó. Nó không chọn tool nào được gọi.",
      "Lời dặn trong prompt là xác suất: tỉ lệ gọi tool tăng, nhưng không thành bảo đảm."
    ],
    opts: [
      { k: "A", gist: "Add <code>strict: true</code> to the <code>extract_metadata</code> definition, so the API enforces the extraction call.",
        why: [
          "Sai ở giả định: <code>strict</code> lo input khớp schema, không lo tool nào được gọi (ý 3).",
          "Request vẫn có thinking thủ công đi cùng <code>tool_choice</code> ép tool, nên vẫn lỗi 400 (ý 2)."
        ] },
      { k: "B", gist: "Remove extended thinking from this request and keep <code>tool_choice</code> forcing <code>extract_metadata</code> by name.",
        why: [
          "Gỡ thinking là gỡ đúng thứ xung đột với ép tool (ý 2). Request hết lỗi 400.",
          "<code>tool_choice</code> ép đúng tên vẫn còn, nên tài liệu nào cũng chắc có lần gọi <code>extract_metadata</code> (ý 1). Vẫn một request mỗi tài liệu, giữ được cả hai ràng buộc.",
          "Biết thêm: notes ghi vài model mới nhất (Opus 5.5, Sonnet 5.5, Fable 5.1, Mythos 5.1) trả 400 với <code>any</code>/<code>tool</code> kể cả không bật thinking. Đề kể lỗi chỉ xuất hiện sau khi bật thinking, nên model ở đây không thuộc nhóm đó."
        ] },
      { k: "C", gist: "Keep extended thinking on and switch <code>tool_choice</code> to <code>auto</code>, adding a prompt instruction to always call <code>extract_metadata</code>.",
        why: [
          "Hết lỗi 400 thật, vì thinking thủ công đi được với <code>auto</code> (ý 2).",
          "Nhưng <code>auto</code> cho Claude quyền trả lời bằng chữ, không gọi tool (ý 1). Lời dặn “always call” (luôn gọi) chỉ tăng xác suất (ý 4), phạm ràng buộc “guaranteed” (bảo đảm).",
          "Dễ bị cuốn vì nó giữ được thinking mà request lại hợp lệ. Nhưng đề đòi bảo đảm có tool call, không đòi giữ thinking."
        ] },
      { k: "D", gist: "Split the step into two requests per document: a forced <code>extract_metadata</code> call without thinking, then a thinking-enabled request that refines the result.",
        why: [
          "Thiết kế này chạy được: lượt đầu ép tool không thinking, lượt sau bật thinking với <code>auto</code> (ý 2).",
          "Nhưng mỗi tài liệu tốn hai request, phạm ngân sách “one API request per document” (một request mỗi tài liệu) đề cho."
        ] }
    ],
    refs: [
      { label: "Bài 2.3, mục “Đã sửa 01/11”: bật extended thinking thủ công thì tool_choice chỉ còn auto/none", href: NOTES + "#fix-2" },
      { label: "Bài 4.3, mục “Biết thêm”: ép tool thì response mở đầu ngay bằng tool_use, không có thinking; strict chỉ ép input khớp schema", href: NOTES + "#l-4-3" }
    ]
  },
  {
    de: 8, n: 44, total: 60, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema", scen: "S6",
    answer: "AC",
    ask: "The extraction prompt tells the model to assign a document category only when it is confident, yet outputs still contain invented category names and wrong labels on ambiguous documents. The category field is a free-text string, and downstream routing needs a recognized category value on every document. Which two changes most improve category quality? (Choose two.)",
    scene: [
      "Prompt dặn model chỉ gán category (loại tài liệu) khi “confident” (chắc chắn).",
      "Output vẫn có hai lỗi: tên category tự bịa, và nhãn sai ở tài liệu mơ hồ.",
      "Trường category là chuỗi tự do. Bước định tuyến phía sau cần một giá trị nó nhận ra được, trên mọi tài liệu.",
      "Chỗ khó: hai lỗi có hai gốc khác nhau, nên đề bắt chọn hai thay đổi. Và không được để tài liệu nào thiếu category."
    ],
    asks: [
      "Hai thay đổi nào cải thiện chất lượng category nhiều nhất?",
      "Tức là: một cách chặn tên bịa, một cách cho tài liệu mơ hồ chỗ đi trung thực. Cả hai vẫn phải ra giá trị máy định tuyến nhận được.",
      "Soi từng phương án: nó sửa lỗi nào, sửa bằng cấu trúc hay bằng lời dặn, và có để tài liệu nào không có category không."
    ],
    facts: [
      "Enum là danh sách giá trị được phép, Claude chỉ được chọn trong đó. Docs Prompting best practices: việc phân loại thì dùng tool có trường enum chứa các nhãn hợp lệ, hoặc structured outputs.",
      "Guide 4.3: category thêm <code>\"other\"</code> đi kèm một trường <code>detail</code> dạng chuỗi để mở rộng, và <code>\"unclear\"</code> cho ca mơ hồ. Không có lối thoát trung thực thì model đoán bừa cho đủ.",
      "Confidence model tự báo chưa được hiệu chuẩn: 0.9 không có nghĩa đúng 90%. Muốn dùng ngưỡng thì phải đo trên bộ mẫu có đáp án trước.",
      "Chỉ dẫn mơ hồ như “chỉ khi chắc chắn” cho kết quả không đều. Nói mạnh hơn chỉ tăng độ nhấn, không thêm tiêu chí nào."
    ],
    opts: [
      { k: "A", gist: "Add <code>\"unclear\"</code> as an allowed category value, so the model can honestly label documents it cannot confidently classify.",
        why: [
          "Sửa lỗi nhãn sai ở tài liệu mơ hồ. Model có chỗ đi trung thực thay vì đoán bừa (ý 2).",
          "<code>\"unclear\"</code> vẫn là giá trị máy nhận ra, nên bước định tuyến vẫn chạy. Code phía sau gom các ca này đưa người xem."
        ] },
      { k: "B", gist: "Have the model output a numeric confidence score with each label, and drop any label scoring below 0.8 before routing.",
        why: [
          "Sai ở giả định: điểm tự báo chưa hiệu chuẩn, ngưỡng 0.8 đặt bừa không tách được nhãn đúng với nhãn sai (ý 3).",
          "Bỏ nhãn dưới ngưỡng thì tài liệu đó không còn category, trái yêu cầu “recognized category value on every document” (mọi tài liệu đều có category nhận ra được). Tên bịa mà model tự tin thì vẫn lọt.",
          "Dễ bị cuốn vì confidence + ngưỡng là kỹ thuật thật, có trong bài 5.5. Nhưng ở đó điểm phải được hiệu chuẩn trước, và dùng để đưa người review chứ không để vứt nhãn."
        ] },
      { k: "C", gist: "Constrain the category field to an enum of valid labels, with an <code>\"other\"</code> value plus a detail string for documents outside the list.",
        why: [
          "Sửa lỗi tên bịa. Enum chỉ cho chọn trong danh sách, model hết đường tự đặt tên (ý 1).",
          "<code>\"other\"</code> kèm <code>detail</code> cho tài liệu ngoài danh sách chỗ đi, thay vì bị ép vào nhãn gần nhất (ý 2). Vẫn là giá trị máy nhận ra."
        ] },
      { k: "D", gist: "Move the confidence instruction to the top of the prompt and reword it as “never invent category names under any circumstances”.",
        why: [
          "Vẫn là lời dặn, chỉ to hơn. Model vẫn không có tiêu chí nào để biết lúc nào là “chắc” (ý 4).",
          "Trường vẫn là chuỗi tự do, nên về cấu trúc không có gì chặn tên bịa (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, mục “Thiết kế schema để model không bịa”: enum thêm other kèm detail, unclear cho ca mơ hồ", href: NOTES + "#l-4-3" },
      { label: "Bài 5.5, mục “Chuyện gì đang xảy ra”: confidence tự báo chưa hiệu chuẩn, phải đo trên labeled validation set", href: NOTES + "#l-5-5" },
      { label: "Docs “Prompting best practices”: việc phân loại dùng tool có trường enum các nhãn hợp lệ, hoặc structured outputs", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
    ]
  },
  {
    de: 8, n: 45, total: 60, sub: "4.2", subName: "Few-shot cho output ổn định", scen: "S6",
    answer: "D",
    ask: "The extraction schema makes <code>invoice_date</code> nullable because a few documents really have no date. On purchase orders that put the date inside a header table, the model returns null even though the date is there. Prose instructions listing where dates can appear have not helped. Which change most reliably fixes these false nulls?",
    scene: [
      "Schema trích xuất để <code>invoice_date</code> (ngày hóa đơn) nullable, vì vài tài liệu thật sự không có ngày.",
      "Với đơn đặt hàng (purchase order) ghi ngày trong bảng ở đầu trang, model trả null dù ngày nằm ngay đó.",
      "Đã thử dặn bằng lời các chỗ ngày có thể nằm. Không ăn thua.",
      "Chỗ khó: null ở đây là null sai, nhưng vẫn hợp lệ với schema. Và vẫn phải giữ null đúng cho tài liệu thật sự không có ngày."
    ],
    asks: [
      "Đổi gì để hết các null sai này chắc nhất?",
      "Tức là: dạy model nhận ra ngày ở bố cục lạ, mà không ép nó bịa ngày ở tài liệu thật sự không có.",
      "Soi từng phương án: nó cho model thấy cách làm, hay chỉ ép hình dạng, gọi lại, hoặc ép gọi tool?"
    ],
    facts: [
      "Few-shot là đặt vài ví dụ mẫu input → output vào prompt để Claude bắt chước. Guide: khi chỉ dẫn chi tiết vẫn cho kết quả không nhất quán, few-shot là kỹ thuật hiệu quả nhất. Một chỗ nó phát huy là cấu trúc tài liệu đa dạng.",
      "Trường nullable là để model trả null trung thực khi tài liệu không có. Bắt buộc một trường mà tài liệu có thể không có thì model bịa cho đủ.",
      "Retry kèm lỗi chỉ chạy khi validator báo lỗi. Null trong trường nullable là hợp lệ với schema, nên không có lỗi nào để retry.",
      "<code>tool_choice</code> ép tool chỉ bảo đảm có kết quả có cấu trúc. Nó không quyết giá trị bên trong từng trường."
    ],
    opts: [
      { k: "A", gist: "Add a validation-retry loop that re-prompts with the failed extraction and its schema errors so the model can correct it.",
        why: [
          "Sai ở chỗ vòng retry chỉ chạy khi có lỗi validate. Null trong trường nullable qua schema bình thường, nên vòng này không bao giờ chạy với đúng các tài liệu đang hỏng (ý 3).",
          "Mà có gọi lại thì model đọc cùng tài liệu, cùng chỉ dẫn, dễ null y như cũ."
        ] },
      { k: "B", gist: "Force the extraction tool with <code>tool_choice</code>, so every document is guaranteed to produce a structured result.",
        why: [
          "Hệ thống đã ra kết quả có cấu trúc rồi. Lỗi nằm ở giá trị null bên trong một kết quả hợp lệ (ý 4).",
          "Ép tool không đổi được giá trị đó."
        ] },
      { k: "C", gist: "Mark <code>invoice_date</code> as required in the schema, so the model must return a date for every document.",
        why: [
          "Hết null sai, nhưng đổi lấy lỗi khác: tài liệu thật sự không có ngày giờ buộc phải có ngày, model bịa cho đủ (ý 2).",
          "Null nhìn thấy được biến thành ngày bịa không ai thấy. Tệ hơn lỗi ban đầu.",
          "Dễ bị cuốn vì “bắt buộc bằng schema” nghe chắc hơn lời dặn. Nhưng lỗi ở đây là model không nhận ra giá trị, không phải output sai hình dạng."
        ] },
      { k: "D", gist: "Add a few-shot example for each document layout, showing the date correctly extracted from that format.",
        why: [
          "Đúng ca cấu trúc tài liệu đa dạng (ý 1): mỗi bố cục một ví dụ, trong đó có ví dụ lấy ngày từ bảng đầu trang của đơn đặt hàng.",
          "Lời dặn đã mô tả chỗ ngày nằm mà model vẫn không làm được. Ví dụ cho nó thấy tận mắt cách lấy, rồi nó khái quát sang tài liệu cùng kiểu.",
          "Trường vẫn nullable, nên tài liệu không có ngày vẫn trả null trung thực (ý 2). Thêm một ví dụ cho ra null để model không học nhầm là lúc nào cũng có ngày."
        ] }
    ],
    refs: [
      { label: "Bài 4.2, mục “Bốn chỗ few-shot phát huy”: ví dụ theo cấu trúc tài liệu đa dạng sửa ca trường trả null", href: NOTES + "#l-4-2" },
      { label: "Bài 4.3, mục “Thiết kế schema để model không bịa”: trường có thể vắng thì để nullable, required thì model bịa", href: NOTES + "#l-4-3" },
      { label: "Bài 4.4: retry kèm lỗi chỉ chạy khi validator báo sai", href: NOTES + "#l-4-4" }
    ]
  },
  {
    de: 8, n: 46, total: 60, sub: "3.2", subName: "Slash command và skill", scen: "S2",
    answer: "D",
    ask: "The <code>/analyze-module</code> skill sets <code>context: fork</code> so its long exploration output stays out of the main session, and the team wants to keep that isolation. After several turns discussing the payments service, a developer runs the skill with no arguments, and the fork analyzes an unrelated module. What fixes this?",
    scene: [
      "Skill <code>/analyze-module</code> khai <code>context: fork</code> để phần khám phá dài dòng không đổ vào phiên chính. Team muốn giữ sự cô lập này.",
      "Dev bàn về payments service (dịch vụ thanh toán) mấy lượt, rồi gọi skill mà không truyền tham số.",
      "Kết quả: subagent đi phân tích một module chẳng liên quan.",
      "Chỗ khó: dev tưởng skill “biết” đang nói về module nào, vì nó vừa được bàn ngay trong phiên."
    ],
    asks: [
      "Sửa gì?",
      "Tức là: làm sao subagent biết phải phân tích payments service, mà output dài vẫn không vào phiên chính.",
      "Soi từng phương án: nó có đưa được tên module vào subagent không, và còn giữ cô lập không."
    ],
    facts: [
      "<code>context: fork</code> cho skill chạy trong một subagent mới. Subagent nhận nội dung skill làm prompt và không thấy lịch sử hội thoại, nên chỉ dẫn của skill phải tự đủ. Docs: dù tên là fork, nó không phải fork hội thoại hiện tại.",
      "Tham số gõ sau tên skill đi vào nội dung skill qua <code>$ARGUMENTS</code>. Không có chỗ nào nhận thì Claude Code nối <code>ARGUMENTS: &lt;giá trị&gt;</code> vào cuối nội dung skill. Vậy tham số theo nội dung skill vào được subagent.",
      "<code>agent</code> chọn loại subagent chạy skill fork (<code>Explore</code>, <code>Plan</code>, <code>general-purpose</code> hoặc subagent tự định nghĩa), tức là chọn tool và system prompt. Không khai thì dùng <code>general-purpose</code>.",
      "<code>background</code> chỉ áp khi có <code>context: fork</code>. Mặc định <code>true</code>: subagent chạy nền, kết quả về sau. Đặt <code>false</code> thì chờ kết quả ngay trong lượt gọi skill. Nó đổi lúc nào có kết quả, không đổi subagent biết gì."
    ],
    opts: [
      { k: "A", gist: "Add <code>agent: Explore</code> to the frontmatter, so the fork runs as a subagent type with tools built for codebase exploration.",
        why: [
          "<code>agent: Explore</code> đúng là cặp hay đi với <code>context: fork</code> khi khám phá codebase. Nhưng nó chỉ chọn loại subagent và tool (ý 3).",
          "Subagent Explore vẫn không thấy cuộc bàn về payments service (ý 1), vẫn không biết phân tích module nào.",
          "Dễ bị cuốn vì notes ghi <code>context: fork</code> thường đi kèm <code>agent: Explore</code>, nghe như mảnh còn thiếu. Nhưng subagent ở đây thiếu thông tin, không thiếu tool."
        ] },
      { k: "B", gist: "Set <code>background: false</code> in the frontmatter, so the main session waits for the fork and stays synchronized with it.",
        why: [
          "<code>background: false</code> chỉ làm phiên chính chờ kết quả trong lượt gọi skill (ý 4).",
          "Chờ hay không thì subagent vẫn không nhận lịch sử hội thoại (ý 1). “Synchronized” (đồng bộ) ở đây chỉ là thời điểm, không phải chia sẻ context."
        ] },
      { k: "C", gist: "Remove <code>context: fork</code> from the frontmatter, so the skill runs in the main session and can see the earlier discussion.",
        why: [
          "Chạy ngay trong phiên chính thì skill thấy cuộc bàn về payments service, nên phân tích đúng module.",
          "Nhưng phần khám phá dài dòng đổ lại vào phiên chính, trái điều team muốn giữ."
        ] },
      { k: "D", gist: "Invoke the skill with the payments service named as an argument, because the fork never receives the conversation history.",
        why: [
          "Subagent fork chỉ nhận nội dung skill làm prompt, không thấy hội thoại (ý 1). Tên module phải đi vào bằng đường khác.",
          "Tham số gõ lúc gọi đi theo nội dung skill vào subagent (ý 2). Gọi <code>/analyze-module payments-service</code> là subagent biết phân tích gì, mà output dài vẫn nằm lại bên nó."
        ] }
    ],
    refs: [
      { label: "Bài 3.2: khung “Context cô lập (context: fork)” và mục “Biết thêm”: context: fork hay đi kèm agent: Explore, body skill thành prompt của subagent", href: NOTES + "#l-3-2" },
      { label: "Docs “Skills”, mục Run skills in a subagent: subagent không thấy lịch sử hội thoại; trường agent, background; cách truyền $ARGUMENTS", href: "https://code.claude.com/docs/en/skills" }
    ]
  },
  {
    de: 8, n: 47, total: 60, sub: "3.3", subName: "Rule theo đường dẫn trong .claude/rules", scen: "S2",
    answer: "C",
    ask: "The team put a <code>paths</code> field with test-file globs in the frontmatter of <code>.claude/rules/testing.md</code>, so the rule should load only when Claude works with test files. Yet <code>/context</code> shows the rule loaded at the start of every session, before Claude has run any tool. What should the team do?",
    scene: [
      "Team viết <code>.claude/rules/testing.md</code>, frontmatter có <code>paths</code> chứa glob cho file test. Ý là rule chỉ nạp khi Claude đụng file test.",
      "Nhưng <code>/context</code> (lệnh xem cái gì đang nằm trong context) cho thấy rule đã nạp ngay đầu mỗi phiên, trước khi Claude chạy tool nào.",
      "Chỗ khó: chi tiết “before Claude has run any tool” (trước khi chạy tool nào) loại luôn cách nạp hợp lệ của rule có <code>paths</code>."
    ],
    asks: [
      "Team nên làm gì?",
      "Tức là: vì sao rule có <code>paths</code> lại cư xử như rule không có <code>paths</code>, và sửa chỗ nào.",
      "Soi từng phương án: cách giải thích của nó có khớp với chi tiết “chưa chạy tool nào” không."
    ],
    facts: [
      "Rule có <code>paths</code> hợp lệ chỉ nạp khi Claude dùng Read, Write hoặc Edit trên file khớp glob, hoặc xem file đó bằng lệnh Bash kiểu đọc như <code>cat</code>. Rule không có <code>paths</code> nạp ngay lúc mở phiên, cùng mức ưu tiên với CLAUDE.md.",
      "<code>paths</code> là trường duy nhất Claude Code đọc trong frontmatter của rule. Docs: YAML giữa hai dòng <code>---</code> không parse được (không đọc được) thì Claude Code bỏ qua frontmatter và nạp rule như không có <code>paths</code>, không báo lỗi gì. Chạy <code>claude --debug</code> để thấy lỗi parse.",
      "Mọi file <code>.md</code> trong <code>.claude/rules/</code> đều được tìm, kể cả trong thư mục con. Thư mục con chỉ để sắp xếp, không giới hạn lúc nạp."
    ],
    opts: [
      { k: "A", gist: "Check whether Claude reads a matching test file at startup, since path-scoped rules load when Claude reads matching files.",
        why: [
          "Cơ chế có thật: rule có <code>paths</code> nạp khi Claude đọc file khớp (ý 1).",
          "Nhưng đề kể rule đã nạp trước khi Claude chạy tool nào. Không có lần đọc file nào để tìm, nên điều tra này không ra gì.",
          "Dễ bị cuốn vì nó nhắm đúng cơ chế nạp của <code>paths</code>, nghe như cách debug cẩn thận. Nhưng đề đã cài sẵn chi tiết “before any tool” để loại nó."
        ] },
      { k: "B", gist: "Leave the file as it is, because <code>paths</code> only raises a rule's priority for matching files, so loading at launch is expected.",
        why: [
          "Sai ở giả định: <code>paths</code> không phải mức ưu tiên. Nó là điều kiện có nạp hay không (ý 1).",
          "Rule có <code>paths</code> hợp lệ mà nạp lúc mở phiên là dấu hiệu hỏng thật. Để nguyên là chấp nhận quy ước test chiếm context ở mọi phiên."
        ] },
      { k: "C", gist: "Validate and fix the YAML frontmatter, since a parse failure makes Claude Code ignore <code>paths</code> and load the rule at launch.",
        why: [
          "YAML hỏng thì Claude Code lặng lẽ bỏ frontmatter, rule thành không có <code>paths</code>, nên nạp ngay lúc mở phiên (ý 2). Khớp đúng triệu chứng: nạp trước khi chạy tool nào.",
          "Soát lại hai dòng <code>---</code> mở và đóng, cú pháp danh sách glob, hoặc chạy <code>claude --debug</code> để thấy lỗi parse. Sửa xong thì rule lại chỉ nạp khi đụng file test."
        ] },
      { k: "D", gist: "Move the file into a <code>tests</code> subfolder of <code>.claude/rules/</code>, since scoping follows the folder a rule sits in.",
        why: [
          "Sai ở giả định: thư mục con trong <code>.claude/rules/</code> chỉ để sắp xếp, không gắn điều kiện nạp (ý 3).",
          "Chuyển file vào <code>.claude/rules/tests/</code> thì frontmatter vẫn hỏng như cũ, rule vẫn nạp lúc mở phiên."
        ] }
    ],
    refs: [
      { label: "Bài 3.3: paths là trường frontmatter duy nhất của rule; có paths thì chỉ nạp khi đụng file khớp", href: NOTES + "#l-3-3" },
      { label: "Docs “How Claude remembers your project”, mục Rule frontmatter reference: YAML không parse được thì rule nạp như không có paths; claude --debug để xem lỗi", href: "https://code.claude.com/docs/en/memory" }
    ]
  },
  {
    de: 8, n: 48, total: 60, sub: "5.4", subName: "Quản lý context khi khám phá codebase lớn", scen: "S2",
    answer: "B",
    ask: "The discovery phase of a large refactor has filled the context with long file reads, and the session is close to the point where auto-compaction kicks in. The engineer needs the discovery conclusions during implementation and does not want compaction to interrupt the edits. What should the engineer do?",
    scene: [
      "Pha khám phá của một đợt refactor lớn đọc nhiều file dài, context gần đầy.",
      "Phiên sắp chạm ngưỡng auto-compaction (Claude Code tự nén lịch sử khi context gần đầy).",
      "Kỹ sư cần giữ kết luận của pha khám phá cho lúc sửa code, và không muốn compact tự chạy chen vào giữa lúc đang sửa.",
      "Chỗ khó: vừa phải giữ kết luận, vừa phải tự chọn được lúc nén."
    ],
    asks: [
      "Kỹ sư nên làm gì?",
      "Tức là: nén ngay ranh giới giữa khám phá và sửa code, do mình chọn lúc, mà bản tóm tắt vẫn giữ kết luận.",
      "Soi từng phương án: context có thật sự được giải phóng không, ai chọn lúc nén, và kết luận còn hay mất."
    ],
    facts: [
      "Claude Code tự compact khi context gần đầy: nén lịch sử cũ thành bản tóm tắt. Chạm ngưỡng là nó chạy, không chờ mày xong việc đang làm.",
      "<code>/compact [chỉ dẫn]</code> nén ngay lúc mày gõ. Thêm chỉ dẫn được, ví dụ <code>/compact focus on the refactor plan</code>, để bản tóm tắt giữ đúng thứ mày chọn.",
      "<code>/clear</code> mở hội thoại mới với context trống. Dùng khi chuyển sang việc khác hẳn, không dùng để tiếp tục việc đang dở.",
      "<code>/autocompact</code> đặt mức context được đầy tới đâu thì tự compact. Nó chỉ dời thời điểm tự compact, không giải phóng chỗ nào."
    ],
    opts: [
      { k: "A", gist: "Raise the auto-compact window with <code>/autocompact</code>, delaying summarization until more of the context is used.",
        why: [
          "Sai việc: nâng ngưỡng không dọn chỗ nào, cũng không tạo bản tóm tắt ở ranh giới pha (ý 4).",
          "Lần tự compact chỉ bị hoãn, rồi vẫn có thể chạy giữa lúc đang sửa, đúng điều kỹ sư muốn tránh."
        ] },
      { k: "B", gist: "Run <code>/compact</code> with focus instructions at the phase boundary, so the summary keeps the discovery conclusions before the edits begin.",
        why: [
          "Kỹ sư tự chọn lúc nén: khám phá vừa xong, chưa sửa file nào (ý 2). Bản tóm tắt chứa một bộ kết luận đã chốt, không phải cuộc điều tra dở dang.",
          "Chỉ dẫn focus bảo bản tóm tắt phải giữ kế hoạch refactor và kết luận khám phá.",
          "Context được dọn ngay đầu pha sửa, nên khó chạm ngưỡng tự compact sớm. Pha sửa đọc thêm nhiều file thì sau đó vẫn có thể tự compact lại, nhưng không rơi vào lúc vừa bắt đầu."
        ] },
      { k: "C", gist: "Keep working and let auto-compaction run, since it fires near the limit and summarizes the same way <code>/compact</code> does.",
        why: [
          "Tự compact cũng nén thành bản tóm tắt, nên kết luận có thể còn (ý 1).",
          "Nhưng context đã gần ngưỡng, lần tự compact gần như chắc sẽ rơi vào giữa lúc đang sửa, đúng điều kỹ sư không muốn. Bản tóm tắt cũng không được dặn giữ gì.",
          "Dễ bị cuốn vì đây là mặc định hợp lý ở nhiều phiên. Nhưng đề đòi chọn được lúc nén, mà tự compact thì không ai chọn."
        ] },
      { k: "D", gist: "Run <code>/clear</code> before implementation, so the edits start with an empty context and full room for new file reads.",
        why: [
          "Dọn được nhiều chỗ nhất, nhưng xóa luôn kết luận khám phá (ý 3). Pha sửa cần đúng mấy kết luận đó.",
          "<code>/clear</code> là cho việc khác hẳn, không cho hai pha nối nhau của cùng một việc."
        ] }
    ],
    refs: [
      { label: "Bài 5.4, mục “Biết thêm”: /compact focus giữ thứ mày chọn, /clear chỉ cho việc khác hẳn", href: NOTES + "#l-5-4" },
      { label: "Docs “Commands”: /compact [instructions], /clear, /autocompact", href: "https://code.claude.com/docs/en/commands" }
    ]
  },
  {
    de: 8, n: 49, total: 60, sub: "3.5", subName: "Tinh chỉnh lặp: ví dụ input/output, test trước, interview", scen: "S2",
    answer: "B",
    ask: "Claude interviewed the developer about a large feature, then wrote a complete, self-contained spec to <code>SPEC.md</code> that names the files involved and includes an end-to-end verification step. The conversation now holds dozens of question-and-answer exchanges. How should the developer move on to implementation?",
    scene: [
      "Claude interview dev (hỏi lần lượt từng câu) về một tính năng lớn, rồi viết spec ra <code>SPEC.md</code>.",
      "Spec “complete, self-contained” (đầy đủ, tự đủ): nêu các file liên quan và có bước kiểm end-to-end (kiểm từ đầu tới cuối).",
      "Hội thoại giờ chứa vài chục lượt hỏi đáp.",
      "Chỗ khó: thứ cần cho pha code đã nằm trong file. Câu hỏi là phần hỏi đáp còn trong phiên có đáng mang theo không."
    ],
    asks: [
      "Dev chuyển sang code thế nào?",
      "Tức là: phiên code nên bắt đầu với context nào.",
      "Soi từng phương án: phiên code có mang theo vài chục lượt hỏi đáp (nguyên bản hay tóm tắt) không, và có làm lại việc đã xong không."
    ],
    facts: [
      "Docs Best practices: có <code>SPEC.md</code> rồi thì mở phiên mới để build từ nó. Phiên build bắt đầu với context sạch và một định nghĩa “xong” bằng văn bản.",
      "Spec tự đủ đã chứa các quyết định đã chốt. Phần hỏi đáp còn lại trong phiên chủ yếu là các ý đã bỏ và các lần hỏi lại.",
      "<code>/compact</code> nén lịch sử thành bản tóm tắt. Bản tóm tắt có thể rụng chi tiết chính xác.",
      "Plan mode là chế độ chỉ đọc: Claude đọc code, viết kế hoạch, chưa sửa file nào. Nó hợp khi việc lớn và còn nhiều cách làm."
    ],
    opts: [
      { k: "A", gist: "Run <code>/compact</code> to summarize the interview, then implement in the compacted session.",
        why: [
          "Bớt nhiễu thật, nhưng thay bằng bản tóm tắt có thể rụng chi tiết (ý 3).",
          "Mà cũng không cần: mọi quyết định đã nằm trong <code>SPEC.md</code> (ý 2). Phiên mới đọc spec sạch hơn một phiên đã nén mà vẫn mang bản tóm tắt cuộc interview."
        ] },
      { k: "B", gist: "Start a fresh session and have Claude implement the feature from <code>SPEC.md</code>.",
        why: [
          "Đúng quy trình docs: interview ra spec, rồi build trong phiên mới (ý 1).",
          "Phiên mới chỉ có spec và code nó đụng tới. Vài chục lượt hỏi đáp không còn chiếm context, vì thứ quan trọng đã nằm trong file (ý 2).",
          "Bước kiểm end-to-end trong spec cho phiên build biết lúc nào là xong."
        ] },
      { k: "C", gist: "Switch the same session to plan mode so Claude proposes an implementation plan before editing files.",
        why: [
          "Plan mode hợp khi còn nhiều cách làm (ý 4). Ở đây interview đã chốt thiết kế và ghi ra <code>SPEC.md</code>, lên kế hoạch lại là làm lại việc đã xong.",
          "Phiên vẫn mang nguyên vài chục lượt hỏi đáp, nên không giải quyết chuyện context."
        ] },
      { k: "D", gist: "Continue in the same session, since it still holds the reasoning behind every decision in the spec.",
        why: [
          "Giữ lý do của từng quyết định nghe có ích. Nhưng đề nói spec đầy đủ, tự đủ: lý do cần đã nằm trong đó (ý 2).",
          "Mang vài chục lượt hỏi đáp vào pha code là để context đầy những thứ model không cần nữa, đúng điều phiên mới tránh được (ý 1).",
          "Dễ bị cuốn vì “holds the reasoning behind every decision” (còn giữ lý do của mọi quyết định) nghe an toàn hơn. Nhưng thứ cần giữ đã được ghi ra file rồi."
        ] }
    ],
    refs: [
      { label: "Bài 3.5, mục “Biết thêm” (đã sửa 02/11): interview xong thì viết SPEC.md, build trong phiên mới", href: NOTES + "#fix-21" },
      { label: "Bài 3.4, khung “Khái niệm của bài”: plan mode chỉ đọc, viết kế hoạch trước khi sửa", href: NOTES + "#l-3-4" },
      { label: "Docs “Best practices for Claude Code”: có SPEC.md thì mở phiên mới để build, context sạch và định nghĩa “xong” bằng văn bản", href: "https://code.claude.com/docs/en/best-practices" }
    ]
  },
  {
    de: 8, n: 50, total: 60, sub: "5.5", subName: "Review người và hiệu chuẩn confidence", scen: "S2",
    answer: "C",
    ask: "Claude Code applies a bulk refactor across the codebase and reports a single overall confidence score per changeset. Reviewers can check only about 15% of the changes. Errors keep turning up in individual functions inside changesets that scored high overall. What should the team change?",
    scene: [
      "Claude Code refactor hàng loạt trên cả codebase. Mỗi changeset (một cụm thay đổi đưa đi review) có một điểm confidence chung.",
      "Reviewer chỉ kiểm được khoảng 15% số thay đổi.",
      "Lỗi cứ xuất hiện ở từng hàm riêng lẻ, nằm trong các changeset được chấm điểm cao.",
      "Chỗ khó: lỗi ở cấp hàm, mà điểm lại ở cấp changeset. Ví dụ minh họa:<pre><code>changeset #42   confidence 0.94\n  parse_date()       ổn\n  format_total()     ổn\n  apply_discount()   sai   ← bị che trong điểm chung</code></pre>"
    ],
    asks: [
      "Team nên đổi gì?",
      "Tức là: làm sao 15% sức review rơi đúng vào các hàm dễ sai nhất.",
      "Soi từng phương án: tín hiệu có ở đúng cấp hàm không, có được hiệu chuẩn không, và có vừa sức review không."
    ],
    facts: [
      "Confidence model tự báo chưa được hiệu chuẩn: 0.9 không có nghĩa đúng 90%. Hiệu chuẩn là đối chiếu điểm với đúng/sai thật trên bộ mẫu đã có đáp án do người gán, rồi đặt ngưỡng từ đó.",
      "Điểm phải ở đúng cấp lỗi xảy ra. Bài 5.5 dùng field-level confidence (điểm cho từng trường) thay vì một điểm cho cả tài liệu, vì con số chung che phần kém.",
      "Sức reviewer có hạn. Mục tiêu của routing (định tuyến) là đưa người vào đúng chỗ rủi ro cao.",
      "CLAUDE.md là chỉ dẫn: Claude làm theo phần lớn thời gian, nhưng vẫn là xác suất. Nó không đo được gì."
    ],
    opts: [
      { k: "A", gist: "Add a CLAUDE.md rule telling Claude to skip any edit it isn't fully confident about while applying the refactor.",
        why: [
          "Dựa vào đúng cái điểm tự báo chưa hiệu chuẩn đang hỏng (ý 1). Lỗi lọt qua chính là chỗ Claude tự tin mà sai, nên nó sẽ không bỏ qua chỗ đó.",
          "Chỗ nào Claude ngần ngừ thì refactor dở dang. Reviewer vẫn không có tín hiệu nào để tìm lỗi thật (ý 4)."
        ] },
      { k: "B", gist: "Lower the changeset-level review threshold, so more of the high-scoring changesets enter the human review queue.",
        why: [
          "Sức review cố định ở khoảng 15% (ý 3). Thêm changeset vào hàng chờ là vượt sức, hoặc mỗi changeset bị đọc qua loa hơn.",
          "Tín hiệu vẫn ở cấp changeset (ý 2). Reviewer đọc cả cụm mà phần lớn hàm đều ổn, hàm sai vẫn dễ lọt.",
          "Dễ bị cuốn vì chỉnh ngưỡng review là việc hợp lý thường ngày. Nhưng đổi ngưỡng không đổi được cấp của tín hiệu."
        ] },
      { k: "C", gist: "Score confidence per edited function, calibrate it on labeled review outcomes, and route low-scoring edits to review.",
        why: [
          "Lỗi ở cấp hàm thì điểm cũng phải ở cấp hàm (ý 2). Hàm sai không còn bị che trong điểm chung.",
          "Hiệu chuẩn trên các thay đổi cũ đã được người gán đúng/sai thì ngưỡng mới có nghĩa (ý 1). Dưới ngưỡng thì đưa người.",
          "15% sức review rơi đúng vào các hàm dễ sai nhất (ý 3)."
        ] },
      { k: "D", gist: "Run a second Claude instance without the refactoring context to re-check every changeset before reviewers see it.",
        why: [
          "Instance độc lập là kỹ thuật thật, bắt được lỗi phiên sinh code bỏ sót. Nhưng nó không cho reviewer biết nên xem hàm nào (ý 3).",
          "Nó vẫn kiểm ở cấp changeset, đúng cấp đang che lỗi (ý 2). Bài toán ở đây là chia 15% sức người, không phải thêm một lượt model."
        ] }
    ],
    refs: [
      { label: "Bài 5.5, khung “Tốt”: field-level confidence, hiệu chuẩn ngưỡng bằng labeled set, đưa ca điểm thấp cho người", href: NOTES + "#l-5-5" },
      { label: "Bài Nền tảng D5, khung “Khái niệm”: calibration là đối chiếu điểm với đúng/sai thật trên labeled validation set", href: NOTES + "#l-5-0" }
    ]
  },
  {
    de: 8, n: 51, total: 60, sub: "5.6", subName: "Giữ nguồn và xử lý mâu thuẫn khi tổng hợp", scen: "S2",
    answer: "BD",
    ask: "Claude Code is drafting performance documentation for an API. Two credible benchmark reports give different p99 latency numbers for the same endpoint, and Claude quietly writes down the lower one. Which two changes make Claude handle this disagreement correctly? (Choose two.)",
    scene: [
      "Claude Code đang viết tài liệu hiệu năng cho API của team.",
      "Hai báo cáo benchmark (đo hiệu năng), cả hai đều đáng tin, cho hai con số p99 latency khác nhau trên cùng một endpoint. p99 latency là mức độ trễ mà 99% request nằm dưới.",
      "Claude lặng lẽ ghi con số thấp hơn. Con số kia biến mất, người đọc không biết là từng có hai số.",
      "Chỗ khó: mấy cách sửa nghe đều có lý (lấy bản mới hơn, lấy bản đáng tin hơn). Phải soi xem cách nào rốt cuộc vẫn là Claude tự chọn hộ người đọc."
    ],
    asks: [
      "Hai thay đổi nào giúp Claude xử lý đúng chỗ hai con số vênh nhau?",
      "Tức là: Claude không tự phân xử, và người review có đủ dữ kiện để tự phân xử.",
      "Soi từng phương án: sau khi đổi, người đọc tài liệu còn biết là có hai con số không? Có biết mỗi số từ đâu ra, đo lúc nào không?"
    ],
    facts: [
      "Hai nguồn uy tín cho số liệu khác nhau thì không tự chọn, không lấy trung bình, không chọn nguồn mới hơn. Giữ cả hai giá trị, mỗi số ghi rõ nguồn (attribution), đánh dấu là đang mâu thuẫn (conflict annotation), rồi để người có đủ bối cảnh quyết.",
      "Hai số “mâu thuẫn” rất hay chỉ là hai thời điểm đo khác nhau. Vì vậy mỗi con số phải đi kèm ngày đo (hoặc ngày công bố). Không có ngày thì người đọc không phân biệt được mâu thuẫn thật với thay đổi theo thời gian.",
      "Điểm do model tự chấm chưa được hiệu chuẩn: không có gì bảo đảm nó khớp với đúng sai thật."
    ],
    opts: [
      { k: "A", gist: "Add a CLAUDE.md rule telling Claude to take the figure from the more recent benchmark, on the grounds that newer measurements reflect the current system.",
        why: [
          "Sai ở giả định “mới hơn là đúng hơn”. Notes ghi rõ không chọn nguồn mới hơn (ý 1). Hai báo cáo có thể khác nhau về tải thử hay cách đo, không chỉ khác ngày.",
          "Claude vẫn bỏ một con số đáng tin mà không ai hay. Người review không bao giờ thấy là từng có mâu thuẫn, đúng cái lỗi team đang gặp.",
          "Dễ bị cuốn vì luật nằm trong CLAUDE.md, nghe có hệ thống. Nhưng nó chỉ đổi tiêu chí chọn (từ “thấp hơn” sang “mới hơn”), vẫn là tự chọn."
        ] },
      { k: "B", gist: "Have Claude put both figures in the draft, each tagged with the report it came from, and flag the disagreement for a reviewer to resolve.",
        why: [
          "Đúng cách guide chỉ: giữ cả hai giá trị, mỗi số kèm nguồn, đánh dấu mâu thuẫn (ý 1).",
          "Quyết định chuyển cho người review, người có đủ bối cảnh để xem hai báo cáo đo khác nhau ở đâu. Claude không có thẩm quyền chọn đâu là sự thật."
        ] },
      { k: "C", gist: "Have Claude rate each report's credibility while drafting and keep only the number from the report it rates higher.",
        why: [
          "Vẫn là tự chọn, chỉ thêm một con số điểm cho có vẻ chặt chẽ (ý 1).",
          "Điểm do model tự chấm chưa được hiệu chuẩn (ý 3). Mà đề đã nói cả hai báo cáo đều đáng tin, nên bỏ một bên theo điểm tự chấm là giấu mâu thuẫn đi.",
          "Dễ bị cuốn vì “đánh giá độ tin cậy của nguồn” nghe như việc người làm nghiên cứu cẩn thận vẫn làm. Nhưng kết quả cuối vẫn là một con số biến mất, người review không biết."
        ] },
      { k: "D", gist: "Require each benchmark's measurement date to appear next to its figure, so a difference over time is not mistaken for a contradiction.",
        why: [
          "Lo nửa còn lại: đọc đúng hai con số (ý 2). Ví dụ một số đo tháng 6, một số đo tháng 10: có thể cả hai đều đúng, hệ thống đã đổi ở giữa.",
          "Có ngày đi kèm, người review phân biệt được mâu thuẫn thật với chuyện hiệu năng tốt lên hay tệ đi theo thời gian.",
          "B giữ cả hai số và đẩy quyết định lên người, D cho người đó dữ kiện để quyết cho đúng."
        ] }
    ],
    refs: [
      { label: "Bài 5.6, mục “Chuyện gì đang xảy ra”: hai nguồn uy tín mâu thuẫn thì giữ cả hai kèm nguồn, không chọn, không lấy trung bình, không chọn nguồn mới hơn", href: NOTES + "#l-5-6" },
      { label: "Bài 5.6, mục “Ngày tháng và cách trình bày” và “Khi đi thi” dạng 3: gọi là mâu thuẫn, hóa ra khác năm", href: NOTES + "#l-5-6" },
      { label: "Cheatsheet D5: hai thống kê bị coi là mâu thuẫn nhưng khác năm → bắt buộc kèm ngày", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 8, n: 52, total: 60, sub: "3.1", subName: "Cấp của CLAUDE.md và chia sẻ cho team", scen: "S2",
    answer: "B",
    ask: "In the monorepo, the root CLAUDE.md holds standards shared by every package. The payments package also has stricter currency-handling conventions. The team wants Claude to pick up those conventions automatically, but only when it works on payments files, not in every session. Where should the conventions be placed?",
    scene: [
      "Monorepo có CLAUDE.md gốc, chứa chuẩn chung cho mọi package.",
      "Riêng package payments có thêm quy ước chặt hơn về xử lý tiền tệ.",
      "Team muốn hai điều: Claude tự nạp quy ước này khi làm với file payments (không ai phải nhắc), và không nạp ở các phiên khác.",
      "Chỗ khó: bốn phương án đều là cơ chế có thật. Phải soi xem mỗi cái nạp lúc nào, có tự nạp không, và ai nhận được."
    ],
    asks: [
      "Nên đặt quy ước của payments ở đâu?",
      "Tức là: chỗ vừa tự nạp đúng lúc Claude đụng tới payments, vừa không nạp lúc khác, vừa tới được cả team.",
      "Soi từng phương án theo ba câu: nạp lúc nào, có tự nạp không, ai nhận được?"
    ],
    facts: [
      "CLAUDE.md có ba cấp: user (<code>~/.claude/CLAUDE.md</code>, của riêng một người, áp cho mọi project của người đó, không đi theo git), project (gốc repo, commit cho cả team), directory (CLAUDE.md trong thư mục con, cũng commit trong repo).",
      "Lúc khởi động, Claude Code nạp CLAUDE.md ở thư mục đang đứng và mọi thư mục cha. CLAUDE.md ở thư mục con chỉ nạp khi Claude đọc, ghi hoặc sửa một file trong thư mục đó.",
      "File kéo vào bằng <code>@import</code> nạp cùng lúc với CLAUDE.md chứa nó. Nó giúp chia file cho gọn, không làm nhỏ context.",
      "Slash command là prompt dựng sẵn, chỉ chạy khi có người gõ lệnh."
    ],
    opts: [
      { k: "A", gist: "Put them in a <code>/payments-conventions</code> slash command under <code>.claude/commands/</code> that developers run whenever they touch payments code.",
        why: [
          "Sai ở cách nạp: command chỉ chạy khi có người gõ (ý 4). Đề đòi “automatically” (tự động).",
          "Ai quên gõ thì Claude sửa code payments mà không có quy ước tiền tệ. Một quy ước phải áp cho mọi lần sửa payments lại phụ thuộc vào trí nhớ của dev."
        ] },
      { k: "B", gist: "Put them in a CLAUDE.md inside the payments package directory and commit it to the repository.",
        why: [
          "CLAUDE.md thư mục con chỉ nạp khi Claude đọc, ghi hoặc sửa file trong payments (ý 2). Làm package khác thì quy ước không chiếm context. Đụng tới payments thì tự nạp, không ai phải nhắc.",
          "File commit trong repo nên cả team nhận được (ý 1). Nó cộng thêm vào CLAUDE.md gốc, không thay, nên khi sửa payments Claude có cả chuẩn chung lẫn quy ước tiền tệ."
        ] },
      { k: "C", gist: "Put them in the <code>~/.claude/CLAUDE.md</code> of each developer who works on payments, so the rules follow them across sessions.",
        why: [
          "Sai cấp: file cấp user không đi theo git (ý 1). Người mới vào, hay ai quên chép, thì không có quy ước.",
          "Còn ngược ý đề: file này nạp ở mọi phiên, mọi project của người đó. Quy ước payments theo họ sang cả project không liên quan."
        ] },
      { k: "D", gist: "Put them in a separate file that the root CLAUDE.md pulls in through an <code>@import</code> reference.",
        why: [
          "Sai ở giả định: tách ra file riêng không có nghĩa là nạp khi cần. File import nạp cùng CLAUDE.md gốc, tức là ngay lúc khởi động (ý 3).",
          "Phiên nào cũng gánh quy ước payments, đúng điều team muốn tránh.",
          "Dễ bị cuốn vì <code>@import</code> đúng là cách chia nhỏ CLAUDE.md. Nhưng chia là để sắp xếp, không phải để giảm context."
        ] }
    ],
    refs: [
      { label: "Bài 3.1, mục “Biết thêm”: CLAUDE.md thư mục con chỉ nạp khi Claude đụng file trong đó; @import không làm nhỏ context", href: NOTES + "#l-3-1" },
      { label: "Cheatsheet D3: muốn giảm context bằng @import thì không được, dùng rule paths hoặc CLAUDE.md thư mục con", href: NOTES + "#cheat-d3" },
      { label: "Docs “How Claude remembers your project”, mục How CLAUDE.md files load: CLAUDE.md thư mục con nạp khi Claude đọc, ghi hoặc sửa file trong thư mục đó", href: "https://code.claude.com/docs/en/memory" }
    ]
  },
  {
    de: 8, n: 53, total: 60, sub: "3.2", subName: "Slash command và skill", scen: "S2",
    answer: "A",
    ask: "The team keeps always-relevant coding conventions in <code>.claude/rules/</code> files. It now has to add a long migration review procedure that engineers run roughly once a month, mostly by running CLI commands against a staging database. Where should this procedure go?",
    scene: [
      "<code>.claude/rules/</code> của team đang chứa các quy ước code áp dụng mọi lúc.",
      "Giờ cần thêm một quy trình review migration dài. Kỹ sư chạy nó khoảng một lần mỗi tháng.",
      "Quy trình này chủ yếu là chạy lệnh CLI vào database staging (môi trường thử trước production), ít khi mở file code.",
      "Chỗ khó: rule có <code>paths</code> nghe như nạp đúng lúc cần. Nhưng nó nạp theo file được đụng tới, mà việc này lại ít đụng file."
    ],
    asks: [
      "Quy trình này nên nằm ở đâu?",
      "Tức là: chỗ không chiếm context ở các phiên không cần nó, mà vẫn chắc chắn có mặt đúng lúc làm review migration.",
      "Soi từng phương án: cái gì làm nó được nạp, và cái đó có xảy ra đúng lúc chạy quy trình không?"
    ],
    facts: [
      "Skill là thư mục có <code>SKILL.md</code> trong <code>.claude/skills/</code>. Đầu phiên Claude chỉ thấy <code>description</code>; nội dung đầy đủ chỉ nạp khi gọi <code>/tên-skill</code> hoặc khi Claude thấy việc đang làm khớp mô tả. Docs khuyên: thứ gì là quy trình nhiều bước thì đưa vào skill, đừng để trong CLAUDE.md.",
      "Rule trong <code>.claude/rules/</code> không có <code>paths</code> nạp lúc khởi động, như CLAUDE.md. Rule có <code>paths</code> chỉ nạp khi Claude đọc hoặc sửa một file khớp glob.",
      "File kéo vào bằng <code>@path</code> import nạp cùng CLAUDE.md chứa nó, ngay lúc khởi động. Nó làm file chính gọn đi, không làm nhỏ context."
    ],
    opts: [
      { k: "A", gist: "Package the procedure as a skill in <code>.claude/skills/</code>, so its full instructions load only when the skill is used.",
        why: [
          "Quy trình dài, theo việc, một tháng mới dùng một lần: đúng thứ skill sinh ra để chứa (ý 1). Phiên không liên quan chỉ tốn một dòng mô tả.",
          "Skill được nạp theo việc đang làm (gõ <code>/tên-skill</code>, hoặc Claude thấy việc khớp mô tả), không phụ thuộc có mở file nào. Chỉ chạy lệnh CLI vào staging thì vẫn gọi được.",
          "Skill commit trong repo nên cả team dùng chung."
        ] },
      { k: "B", gist: "Put it in <code>.claude/rules/</code> with a <code>paths</code> glob matching the migrations directory, so it loads only for related work.",
        why: [
          "Rule có <code>paths</code> chỉ nạp khi Claude đụng file khớp glob (ý 2). Quy trình này chủ yếu chạy lệnh CLI, ít khi đọc hay sửa file trong thư mục migrations.",
          "Kết quả: đúng lúc làm review thì rule có thể chưa nạp, Claude làm mà không có quy trình trong tay.",
          "Dễ bị cuốn vì nó nạp có điều kiện, nghe tiết kiệm context. Nhưng điều kiện của nó là file, còn việc ở đây là một chuỗi lệnh."
        ] },
      { k: "C", gist: "Keep it in a separate file referenced from CLAUDE.md through an <code>@path</code> import, so the main file stays short.",
        why: [
          "Sai ở giả định: file import vẫn nạp lúc khởi động (ý 3).",
          "CLAUDE.md trông ngắn, nhưng mọi phiên vẫn gánh cả quy trình dài cho một việc một tháng mới làm một lần."
        ] },
      { k: "D", gist: "Save it as <code>migration-review.md</code> in <code>.claude/rules/</code> with no <code>paths</code> frontmatter, the same way the other rule files are stored.",
        why: [
          "Rule không có <code>paths</code> nạp lúc khởi động, ở mọi phiên (ý 2).",
          "Thư mục xếp gọn, nhưng quy trình dài chiếm context ở mọi phiên, chen với các quy ước code luôn cần."
        ] }
    ],
    refs: [
      { label: "Bài 3.2, mục “Skill hay CLAUDE.md?”: CLAUDE.md luôn nạp cho chuẩn chung; skill gọi theo việc cho workflow cụ thể", href: NOTES + "#l-3-2" },
      { label: "Bài 3.3, “Khái niệm của bài”: rule không có paths nạp mỗi phiên; có paths thì chỉ nạp khi Claude đọc hoặc sửa file khớp", href: NOTES + "#l-3-3" },
      { label: "Docs “How Claude remembers your project”: quy trình nhiều bước thì đưa vào skill; skill chỉ nạp khi gọi hoặc khi Claude thấy nó liên quan", href: "https://code.claude.com/docs/en/memory" }
    ]
  },
  {
    de: 8, n: 54, total: 60, sub: "3.5", subName: "Tinh chỉnh lặp: ví dụ input/output, test trước, interview", scen: "S2",
    answer: "C",
    ask: "While debugging a request pipeline, a developer finds three bugs. Fixing the timeout handling changes what the retry logic has to do, and that retry change in turn alters the error messages users see. How should the developer hand these issues to Claude Code?",
    scene: [
      "Dev gỡ lỗi một pipeline xử lý request và tìm ra ba bug.",
      "Ba bug móc vào nhau thành chuỗi: sửa phần xử lý timeout thì logic retry phải làm khác đi; sửa retry thì thông báo lỗi người dùng thấy cũng đổi theo.",
      "Chỗ khó: ba phương án sai đều là thói quen tốt (sửa từng cái, <code>/clear</code>, subagent song song). Chúng chỉ sai vì ba bug này không độc lập."
    ],
    asks: [
      "Nên đưa ba bug này cho Claude Code thế nào?",
      "Tức là: giao việc sao cho Claude thấy cả chuỗi phụ thuộc trước khi sửa bất cứ chỗ nào.",
      "Soi từng phương án: lúc sửa bug đầu, Claude có biết hai bug sau sẽ đòi gì không?"
    ],
    facts: [
      "Guide 3.5: các lỗi ảnh hưởng nhau (sửa cái này thì cách sửa cái kia phải đổi theo) thì gộp vào một message chi tiết, để Claude sửa đồng bộ. Lỗi độc lập mới sửa tuần tự, mỗi lần một lỗi.",
      "<code>/clear</code> xóa sạch hội thoại. Nó dành cho lúc chuyển sang việc khác hẳn, không dành cho việc đang làm dở.",
      "Subagent thường (không phải fork) khởi động với context trống, không thấy hội thoại chính, cũng không thấy subagent khác đang làm gì. Docs khuyên giữ việc ở hội thoại chính khi các phần việc dùng chung nhiều context."
    ],
    opts: [
      { k: "A", gist: "Run <code>/clear</code> after every fix and describe the next issue in a fresh session, so earlier context can never interfere.",
        why: [
          "<code>/clear</code> dành cho việc khác hẳn (ý 2). Ở đây bug sau phụ thuộc đúng vào cách đã sửa bug trước.",
          "Xóa context sau mỗi lần sửa là xóa luôn thứ lần sửa tiếp theo cần biết. Claude sửa retry mà không biết timeout vừa đổi thế nào."
        ] },
      { k: "B", gist: "Report the issues one per message, in order, checking each fix before telling Claude about the next one.",
        why: [
          "Sửa tuần tự hợp với lỗi độc lập (ý 1). Ba bug này dính nhau.",
          "Claude sửa timeout mà không biết retry và thông báo lỗi sẽ phải theo. Tới lượt sau, bản sửa trước có thể phải làm lại.",
          "Dễ bị cuốn vì “sửa xong kiểm rồi mới sang cái sau” nghe chắc ăn. Nhưng nó chỉ chắc khi các lỗi không đụng nhau."
        ] },
      { k: "C", gist: "Describe all three issues in one detailed message, so Claude can design fixes that take their interactions into account.",
        why: [
          "Đúng ca guide nêu: lỗi ảnh hưởng nhau thì gộp vào một message chi tiết (ý 1).",
          "Claude thấy cả chuỗi timeout → retry → thông báo lỗi trước khi sửa, nên ra một bản sửa khớp nhau, không có bản sau lật bản trước."
        ] },
      { k: "D", gist: "Spawn three parallel subagents, one per issue, so each fix is developed in its own isolated context.",
        why: [
          "Mỗi subagent khởi động trống và không thấy hai con kia (ý 3). Ba con cùng sửa một pipeline mà không biết nhau đang đổi gì.",
          "Ra ba bản sửa đá nhau. Docs khuyên giữ việc ở hội thoại chính đúng vào lúc các phần việc dùng chung nhiều context, như ở đây."
        ] }
    ],
    refs: [
      { label: "Bài 3.5, mục “Một message hay nhiều message?”: lỗi phụ thuộc nhau thì gộp, lỗi độc lập thì sửa tuần tự", href: NOTES + "#l-3-5" },
      { label: "Bài 5.4, mục “Biết thêm”: /clear là cho việc khác hẳn, không dùng để tiếp tục việc đang dở", href: NOTES + "#l-5-4" },
      { label: "Docs “Subagents”, mục Choose between subagents and main conversation: giữ ở hội thoại chính khi các phần việc dùng chung nhiều context", href: "https://code.claude.com/docs/en/sub-agents" }
    ]
  },
  {
    de: 8, n: 55, total: 60, sub: "4.6", subName: "Review độc lập và review nhiều lượt", scen: "S2",
    answer: "A",
    ask: "A long Claude Code session has just built a billing feature across several files. You want to delegate the review in a way that keeps the reasoning behind the code out of the reviewer's context. Which approach achieves this?",
    scene: [
      "Một phiên Claude Code dài vừa làm xong tính năng billing, sửa nhiều file.",
      "Bạn muốn giao việc review đi chỗ khác, sao cho context của bên review không chứa reasoning (mạch suy nghĩ) đã sinh ra code.",
      "Chỗ khó: hai phương án đều dùng subagent, chỉ khác nhau chữ “fork”. Phải biết mỗi loại subagent khởi động với cái gì trong context."
    ],
    asks: [
      "Cách nào làm được điều đó?",
      "Tức là: bên review phải bắt đầu từ một context không có lý lẽ lúc viết code, chứ không chỉ là một agent khác.",
      "Soi từng phương án: lúc bắt đầu review, context của bên review có chứa reasoning của phiên sinh code không?"
    ],
    facts: [
      "Self-review: phiên vừa sinh code vẫn giữ lý do lúc viết, nên hay bảo vệ quyết định của mình. Guide 4.6: instance độc lập (context sạch, không thấy reasoning lúc sinh code) bắt lỗi tinh vi tốt hơn cả lời dặn tự review lẫn extended thinking.",
      "Subagent thường (không phải fork) khởi động với context mới: không thấy lịch sử hội thoại, các skill đã gọi, hay các file phiên chính đã đọc. Nó làm việc từ lời giao việc.",
      "Fork là subagent nhận toàn bộ hội thoại tới lúc đó thay vì khởi động mới. Docs ghi rõ: fork bỏ đi sự cô lập đầu vào mà subagent thường có.",
      "<code>/compact</code> nén lịch sử của chính phiên đang chạy thành một bản tóm tắt. Bản tóm tắt vẫn nằm trong phiên đó."
    ],
    opts: [
      { k: "A", gist: "Spawn a regular, non-fork review subagent and give it the diff and the paths of the changed files.",
        why: [
          "Subagent thường khởi động với context mới, không thấy hội thoại lúc viết code (ý 2). Reasoning của phiên sinh code không lọt vào context của nó.",
          "Nó đọc code như người lạ, đúng kiểu instance độc lập guide nói (ý 1).",
          "Diff và đường dẫn file phải nằm trong lời giao việc, vì đó là thứ duy nhất nó nhận."
        ] },
      { k: "B", gist: "Enable extended thinking and ask the same session to review its own diff, so it reasons more deeply about each change.",
        why: [
          "Nghĩ kỹ hơn vẫn trong cùng context, vẫn là tự review (ý 1). Lý lẽ lúc viết code vẫn nằm nguyên đó.",
          "Không có gì bị đưa ra khỏi context, nên không đáp được điều đề đòi."
        ] },
      { k: "C", gist: "Run <code>/compact</code> first and then ask for the review, so a condensed summary replaces the long implementation history.",
        why: [
          "Bản tóm tắt vẫn ở trong chính phiên đó (ý 4), và nó giữ lại các quyết định cùng lý do lúc viết code.",
          "Bên review vẫn là phiên đã sinh code, chỉ với lịch sử ngắn hơn. Vẫn là tự chấm bài mình."
        ] },
      { k: "D", gist: "Spawn a fork subagent for the review, so a separate agent examines the changes alongside the main session.",
        why: [
          "Fork nhận toàn bộ hội thoại tới lúc đó, kể cả mọi lý lẽ lúc viết code (ý 3). Đúng thứ đề muốn loại ra.",
          "Chạy như một agent riêng không làm nó độc lập. Độc lập nằm ở context nó mang theo, không nằm ở chuyện nó là agent nào.",
          "Dễ bị cuốn vì “a separate agent” (một agent riêng) nghe khớp với chữ “delegate”. Nhưng fork là ngoại lệ: chỉ subagent thường mới khởi động trống."
        ] }
    ],
    refs: [
      { label: "Bài 4.6, mục “Chuyện gì đang xảy ra”: instance độc lập bắt lỗi tốt hơn tự review và extended thinking", href: NOTES + "#l-4-6" },
      { label: "Bài 1.3: subagent bắt đầu với trang giấy trắng, chỉ biết những gì lời giao việc ghi", href: NOTES + "#l-1-3" },
      { label: "Docs “Subagents”, mục What loads at startup và How forks differ from other subagents: subagent thường không thấy hội thoại, fork nhận toàn bộ hội thoại", href: "https://code.claude.com/docs/en/sub-agents" }
    ]
  },
  {
    de: 8, n: 56, total: 60, sub: "5.5", subName: "Review người và hiệu chuẩn confidence", scen: "S2",
    answer: "B",
    ask: "Claude's automated CI reviews produce valid findings and false positives mixed together within the same pull request. The team has labeled hundreds of past findings as genuine or false. Which design cuts false positives while keeping the filter adjustable over time?",
    scene: [
      "Bot review của Claude chạy trong CI. Trong cùng một PR, finding đúng và false positive (báo nhầm chỗ không phải lỗi) lẫn với nhau.",
      "Team đã có vài trăm finding cũ được người gán nhãn: đúng là lỗi, hay báo nhầm.",
      "Đề đòi hai thứ: giảm báo nhầm, và bộ lọc phải chỉnh được về sau.",
      "Chỗ khó: đúng và sai nằm chung một review, nên việc lọc phải tới từng finding, không phải cả review."
    ],
    asks: [
      "Thiết kế nào giảm false positive mà vẫn chỉnh bộ lọc được theo thời gian?",
      "Tức là: một bộ lọc tác động lên từng finding, có một nút chỉnh rõ ràng, và đo được bằng bộ nhãn team đã có.",
      "Soi từng phương án: lọc ở mức nào (từng finding hay cả review)? Có con số nào để chỉnh không? Bộ nhãn có dùng được để đo không?"
    ],
    facts: [
      "Confidence (độ tự tin) do model tự báo chưa được hiệu chuẩn: 0.9 không có nghĩa đúng 90%. Hiệu chuẩn là so điểm với đúng sai thật trên labeled validation set (bộ mẫu đã có đáp án do người gán), rồi chọn ngưỡng có tỉ lệ sai chấp nhận được.",
      "Cách guide chỉ cho review: lượt tìm lỗi báo hết, kèm confidence cho từng finding. Việc lọc để ở một bước riêng phía sau.",
      "Dặn “chỉ báo khi chắc chắn” ngay trong prompt review thì Claude thấy lỗi nhưng im với lỗi dưới mức nó tự đặt. Recall giảm, false positive không chắc giảm, và không ai biết finding nào đã bị giấu.",
      "Confidence phải gắn ở đúng đơn vị cần lọc. Notes lấy ví dụ trích xuất: điểm cho từng trường, không phải một điểm cho cả tài liệu."
    ],
    opts: [
      { k: "A", gist: "Run each review twice with the same prompt and post only the findings that appear in both runs, using agreement as the signal.",
        why: [
          "Khớp hay không khớp chỉ là có hoặc không, không có ngưỡng nào để chỉnh. Bộ nhãn của team không có chỗ dùng để tinh chỉnh.",
          "Hai lần chạy cùng prompt vẫn có thể cùng báo nhầm một chỗ, mà chi phí review gấp đôi.",
          "Dễ bị cuốn vì “hai lần cùng thấy” nghe như kiểm chéo. Nhưng đề đòi bộ lọc chỉnh được, cách này thì không."
        ] },
      { k: "B", gist: "Have Claude attach a confidence score to each finding, report all findings, and filter downstream with a threshold tuned on the labeled findings.",
        why: [
          "Confidence gắn với từng finding, nên bộ lọc tách được finding đúng và báo nhầm trong cùng một PR (ý 4).",
          "Báo hết rồi mới lọc ở bước sau (ý 2). Ngưỡng được chọn bằng cách so điểm với vài trăm finding đã gán nhãn (ý 1), nên biết ở mỗi ngưỡng tỉ lệ báo nhầm là bao nhiêu.",
          "Ngưỡng là một con số nằm ngoài prompt. Muốn chặt hay lỏng hơn thì đổi số rồi đo lại trên bộ nhãn, không phải sửa prompt review."
        ] },
      { k: "C", gist: "Rewrite the review prompt so Claude reports only issues it is confident are genuine, keeping uncertain findings away from developers.",
        why: [
          "Lọc ngay trong lượt tìm lỗi, bằng một mức “chắc chắn” mơ hồ (ý 3). Recall giảm, báo nhầm chưa chắc giảm.",
          "Finding bị giấu không được ghi lại, nên không đo được đã mất gì, cũng không có nút nào để chỉnh độ chặt.",
          "Dễ bị cuốn vì nó nhắm thẳng vào chữ “false positive”. Nhưng chỉnh bằng câu chữ trong prompt thì không đo được, cũng không chỉnh lại được."
        ] },
      { k: "D", gist: "Have Claude output a single overall confidence score for each review and route whole reviews below a threshold to a human before posting.",
        why: [
          "Sai đơn vị: đề nói đúng và sai nằm chung trong một review (ý 4). Một điểm cho cả review không tách được chúng.",
          "Review trên ngưỡng thì báo nhầm vẫn lọt. Review dưới ngưỡng thì finding đúng cũng bị giữ lại theo."
        ] }
    ],
    refs: [
      { label: "Bài 5.5, mục “Chuyện gì đang xảy ra”: confidence tự báo chưa hiệu chuẩn; chọn ngưỡng bằng labeled validation set", href: NOTES + "#l-5-5" },
      { label: "Bài 4.6, “Khi đi thi” dạng 3: lượt tìm lỗi báo hết kèm confidence, lọc ở lượt kiểm chứng riêng", href: NOTES + "#l-4-6" },
      { label: "Bài 4.1, mục “Biết thêm”: “only high-confidence” làm giảm recall chứ không giảm false positive", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 8, n: 57, total: 60, sub: "3.1", subName: "Cấp của CLAUDE.md và chia sẻ cho team", scen: "S2",
    answer: "D",
    ask: "A developer's personal style preferences sit in the committed project CLAUDE.md, so teammates' sessions load them as well. The developer wants these preferences applied automatically in every repository they work in, but only for themselves. Where should the preferences live?",
    scene: [
      "Một dev để sở thích code riêng của mình (style preferences) trong CLAUDE.md của project, file đã commit.",
      "Hệ quả: phiên của cả team cũng nạp những sở thích đó.",
      "Dev muốn hai điều: sở thích tự áp ở mọi repo mình làm, và chỉ áp cho mình.",
      "Chỗ khó: vài phương án đúng một nửa. Có cái đúng phạm vi (chỉ mình) mà sai loại file, có cái riêng tư mà chỉ áp cho một repo."
    ],
    asks: [
      "Nên đặt các sở thích này ở đâu?",
      "Tức là: chỗ vừa chỉ mình dev nhận, vừa áp cho mọi project, vừa tự nạp không cần gọi.",
      "Soi từng phương án theo ba câu: ai nhận được, áp cho bao nhiêu project, có tự nạp không?"
    ],
    facts: [
      "<code>~/.claude/CLAUDE.md</code> là CLAUDE.md cấp user: nằm trong thư mục home, không đi theo git, nạp ở mọi project của người đó trên máy. Docs ghi mục đích của nó: “Personal preferences for all projects” (sở thích cá nhân cho mọi project).",
      "<code>CLAUDE.local.md</code> ở gốc repo cũng riêng tư (bị gitignore), nhưng chỉ áp cho đúng project đó.",
      "<code>settings.json</code> là các khóa JSON chỉnh hành vi của Claude Code: model, quyền chạy tool, giao diện. Docs dặn: muốn đưa chỉ dẫn thường trực cho Claude thì dùng CLAUDE.md.",
      "Slash command chỉ chạy khi có người gõ lệnh."
    ],
    opts: [
      { k: "A", gist: "In <code>~/.claude/settings.json</code>, which applies to that user in every project on the machine.",
        why: [
          "Đúng phạm vi (chỉ mình dev, mọi project), nhưng sai loại file (ý 3).",
          "settings.json chứa cấu hình như model, quyền, giao diện, không phải chỗ viết chỉ dẫn bằng lời cho Claude. Sở thích style là chỉ dẫn, nên phải nằm trong CLAUDE.md.",
          "Dễ bị cuốn vì nó cũng nằm trong <code>~/.claude/</code>, cùng phạm vi với đáp án đúng. Nhưng chung chỗ không có nghĩa chung vai."
        ] },
      { k: "B", gist: "In a personal slash command under <code>~/.claude/commands/</code> that the developer runs at the start of each session.",
        why: [
          "Đúng phạm vi, nhưng phải gõ mới chạy (ý 4). Đề đòi “automatically” (tự động).",
          "Phiên nào quên gõ thì Claude không biết sở thích nào của dev."
        ] },
      { k: "C", gist: "In a <code>CLAUDE.local.md</code> at each repository root, added to <code>.gitignore</code> so teammates never load it.",
        why: [
          "Riêng tư thì đúng, team không nạp (ý 2). Nhưng nó chỉ áp cho một project.",
          "Dev phải tạo và giữ một bản ở mọi repo, repo mới lại quên. Trái ý “every repository” (mọi repo)."
        ] },
      { k: "D", gist: "In <code>~/.claude/CLAUDE.md</code>, which loads for that user alone in every project on the machine.",
        why: [
          "Đúng cả ba: chỉ dev nhận, áp mọi project, tự nạp mỗi phiên (ý 1).",
          "File nằm trong home nên không bao giờ đi theo git. Chuyển xong thì xóa phần đó khỏi CLAUDE.md của project, team hết phải nạp sở thích của dev này."
        ] }
    ],
    refs: [
      { label: "Bài 3.1, mục “Chuyện gì đang xảy ra” và Quy tắc: quy ước của team nằm trong repo, của riêng bạn nằm trong home", href: NOTES + "#l-3-1" },
      { label: "Docs “How Claude remembers your project”, mục Choose where to put CLAUDE.md files: ~/.claude/CLAUDE.md cho sở thích cá nhân ở mọi project, CLAUDE.local.md cho riêng một project", href: "https://code.claude.com/docs/en/memory" },
      { label: "Docs “Settings files and precedence”: settings là khóa JSON chỉnh hành vi; chỉ dẫn thường trực thì dùng CLAUDE.md", href: "https://code.claude.com/docs/en/settings" }
    ]
  },
  {
    de: 8, n: 58, total: 60, sub: "3.4", subName: "Plan mode hay làm thẳng", scen: "S2",
    answer: "D",
    ask: "A developer used plan mode to investigate a library migration that touches 40 files, and the approved plan breaks the work into clear, mechanical edits. A teammate suggests planning again before each file is changed. How should the implementation proceed?",
    scene: [
      "Dev đã dùng plan mode để tìm hiểu việc migrate (chuyển) một thư viện, đụng 40 file.",
      "Kế hoạch đã được duyệt. Nó chia việc thành các chỗ sửa rõ ràng, máy móc (mechanical: lặp lại một kiểu sửa, không cần quyết gì thêm).",
      "Một đồng đội đề xuất lên kế hoạch lại trước mỗi file.",
      "Chỗ khó: các phương án sai đều dùng công cụ có thật (<code>/plan</code>, phiên mới, Explore subagent). Phải soi xem phần việc còn lại có cần tới chúng không."
    ],
    asks: [
      "Phần làm còn lại nên đi thế nào?",
      "Tức là: kế hoạch đã chốt, từng bước đã rõ, thì còn cần lên kế hoạch nữa không.",
      "Soi từng phương án: nó giải quyết vấn đề gì, và phần việc còn lại có vấn đề đó không?"
    ],
    facts: [
      "Plan mode đáng dùng khi thay đổi lớn nhiều file, có nhiều cách làm phải chọn, hoặc phải quyết kiến trúc. Direct execution (làm thẳng) hợp với thay đổi rõ ràng, một cách làm hiển nhiên.",
      "Cách bài 3.4 chỉ cho việc lớn: hai pha, hai chế độ. Plan mode để khám phá và chốt cách làm, rồi chuyển sang direct execution để làm theo kế hoạch đã chốt.",
      "Duyệt kế hoạch thì phiên ra khỏi plan mode và Claude bắt đầu sửa. Muốn lên kế hoạch lại thì bấm Shift+Tab, hoặc gõ <code>/plan</code> ở đầu một prompt để riêng prompt đó vào plan mode.",
      "Explore subagent đọc codebase trong context riêng và chỉ gửi về bản tóm tắt. Nó dùng cho pha khám phá dài, không phải để sửa code."
    ],
    opts: [
      { k: "A", gist: "Prefix each file's edit with <code>/plan</code> so Claude proposes and reviews that single change before writing it.",
        why: [
          "<code>/plan</code> là cách có thật để vào plan mode cho một prompt (ý 3). Nhưng plan mode dùng khi chưa rõ cách làm (ý 1).",
          "Ở đây kế hoạch đã chốt từng chỗ sửa. Lên kế hoạch lại 40 lần là làm lại việc đã xong, migration chậm hẳn mà không bớt rủi ro nào.",
          "Dễ bị cuốn vì “xem trước từng thay đổi” nghe cẩn thận. Nhưng các quyết định đáng xem đã được xem lúc duyệt kế hoạch."
        ] },
      { k: "B", gist: "Start a new session for each file with a pasted summary of its plan step, so stale context never accumulates.",
        why: [
          "Mỗi file một phiên mới thì mất context chung của cả cuộc migration: Claude đã đọc những gì, các file liên quan nhau ra sao.",
          "40 chỗ sửa liên quan nhau dễ lệch nhau. Phiên mới kèm tóm tắt dành cho lúc kết quả cũ đã lỗi thời hay sai, không phải ca này."
        ] },
      { k: "C", gist: "Hand the remaining edits to the Explore subagent so its verbose output stays out of the main conversation.",
        why: [
          "Sai vai: Explore subagent dùng cho pha khám phá và chỉ gửi về tóm tắt (ý 4). Nó không phải chỗ làm phần sửa code.",
          "Pha khám phá của migration này đã xong. Không còn output khám phá dài nào cần cách ly."
        ] },
      { k: "D", gist: "Switch to direct execution for the remaining edits, and return to plan mode only if a step turns out to be complex.",
        why: [
          "Đúng mô hình hai pha (ý 2): plan mode đã chốt cách làm, giờ làm thẳng theo kế hoạch.",
          "Mỗi chỗ sửa còn lại rõ ràng và máy móc, đúng ca direct execution (ý 1). Lên kế hoạch thêm chỉ thêm một vòng duyệt, không đổi gì trong code được viết ra.",
          "Đừng lẫn với ô “Tệ” của bài 3.4 (“cứ làm thẳng, gặp phức tạp thì chuyển sang plan mode sau”). Ở đó việc phức tạp mà chưa hề plan. Ở đây plan đã xong, quay lại plan mode chỉ là lối thoát cho bước nào bất ngờ khó hơn kế hoạch tính (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, mục “Chuyện gì đang xảy ra”: bảng plan mode hay làm thẳng; hai pha, hai chế độ", href: NOTES + "#l-3-4" },
      { label: "Docs “Permission modes”, mục Plan mode: duyệt kế hoạch thì ra khỏi plan mode; gõ /plan ở đầu prompt để lên kế hoạch lại", href: "https://code.claude.com/docs/en/permission-modes" }
    ]
  },
  {
    de: 8, n: 59, total: 60, sub: "5.2", subName: "Escalate và xử lý chỗ mơ hồ", scen: "S2",
    answer: "C",
    ask: "The team is using Claude Code to write the system prompt for a support chatbot. A customer writes “This broke again, I am very frustrated,” and the fix is a standard warranty replacement that the chatbot can complete itself. What behavior should the prompt specify?",
    scene: [
      "Team dùng Claude Code viết system prompt cho một chatbot hỗ trợ khách hàng.",
      "Khách nhắn: “This broke again, I am very frustrated” (Lại hỏng nữa rồi, tôi bực lắm).",
      "Cách xử lý là đổi hàng bảo hành theo quy trình chuẩn, nằm trong khả năng của chatbot. Khách chưa hề đòi gặp người.",
      "Chỗ khó: phải tách hai tín hiệu. Khách bực là chuyện cảm xúc. Ca có vượt khả năng chatbot không là chuyện khác."
    ],
    asks: [
      "Prompt nên quy định chatbot làm gì?",
      "Tức là: khách bực mà ca vẫn tự xử được thì chatbot làm gì, và tới lúc nào mới chuyển người.",
      "Soi từng phương án: nó lấy gì làm tín hiệu chuyển người? Có ghi nhận cảm xúc của khách không? Có giải quyết xong ca mà khỏi chuyển không?"
    ],
    facts: [
      "Guide chỉ có 3 trigger escalate: (1) khách yêu cầu gặp người; (2) policy không có hoặc mơ hồ; (3) agent không thể tiến triển. Khách bực mà chưa đòi người không phải trigger.",
      "Khách bực nhưng ca trong khả năng: ghi nhận cảm xúc, đề xuất giải pháp. Khách nhắc lại đòi gặp người thì mới chuyển, tức là quay về trigger (1).",
      "Sentiment analysis (chấm mức tiêu cực trong lời khách) đo tâm trạng, không đo độ khó của ca. Khách bực có thể là ca dễ, khách lịch sự có thể là ca khó.",
      "First-contact resolution (FCR): tỉ lệ ca xong ngay trong lần liên hệ đầu. Escalate thừa làm FCR giảm."
    ],
    opts: [
      { k: "A", gist: "Run sentiment analysis on every message and escalate once the frustration score passes a set threshold, so unhappy customers reach a person automatically.",
        why: [
          "Lấy cảm xúc làm trigger (ý 3), trong khi bực không nằm trong 3 trigger (ý 1).",
          "Ca đổi bảo hành dễ này bị đẩy lên người, FCR giảm (ý 4). Còn khách lịch sự có ca khó thật thì lọt qua ngưỡng.",
          "Dễ bị cuốn vì “tự động đưa khách đang bực tới người” nghe chu đáo. Nhưng tâm trạng không nói được ca có cần người hay không."
        ] },
      { k: "B", gist: "Proactively offer a handoff to a human agent, since the product has failed before and a person can investigate the recurring fault.",
        why: [
          "Khách không đòi gặp người, policy không thiếu, chatbot không bí (ý 1). Không trigger nào xảy ra.",
          "Chuyển một ca chatbot làm xong được là escalate thừa, FCR giảm (ý 4).",
          "Dễ bị cuốn vì “hỏng lần nữa” nghe như ca đặc biệt. Nhưng đề đã nói rõ cách xử lý là đổi bảo hành theo quy trình chuẩn."
        ] },
      { k: "C", gist: "Acknowledge the frustration, offer the warranty replacement, and escalate only if the customer then insists on a human.",
        why: [
          "Đúng mẫu guide: khách bực nhưng ca trong khả năng thì ghi nhận cảm xúc rồi đề xuất giải pháp (ý 2).",
          "Chỉ chuyển khi khách từ chối và nhắc lại đòi gặp người. Lúc đó là trigger (1), không phải vì cảm xúc (ý 1).",
          "Ca dễ xong ngay lần đầu (ý 4), mà khách vẫn thấy mình được lắng nghe."
        ] },
      { k: "D", gist: "Reply only with the warranty replacement offer, short and focused on the fix, because a fast resolution is what restores satisfaction.",
        why: [
          "Đúng ở chỗ không chuyển người, nhưng bỏ mất bước ghi nhận cảm xúc mà mẫu của guide có (ý 2).",
          "Khách vừa nói thẳng là bực. Trả lời cụt vào việc thì ca có thể xong mà khách vẫn khó chịu hơn."
        ] }
    ],
    refs: [
      { label: "Bài 5.2, mục “Ba tình huống hay bị nhầm khi escalate” (đã sửa 01/11): 3 trigger; khách bực mà giải quyết được thì ghi nhận, đề xuất; khách nhắc lại mới chuyển", href: NOTES + "#fix-9" },
      { label: "Cheatsheet D5: dòng “Khách bực nhưng vấn đề trong policy” → ghi nhận cảm xúc, đề xuất giải pháp; bực không có nghĩa là phức tạp", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 8, n: 60, total: 60, sub: "3.4", subName: "Plan mode hay làm thẳng", scen: "S2",
    answer: "C",
    ask: "A developer used plan mode to investigate a library migration and has just approved the resulting plan. The implementation will edit dozens of files, and the developer wants those edits applied without a prompt for each one. However, Claude must still ask before running the repository's deploy script. Which mode should the implementation phase use?",
    scene: [
      "Dev dùng plan mode tìm hiểu một cuộc migrate thư viện, vừa duyệt kế hoạch.",
      "Phần làm sẽ sửa hàng chục file. Dev không muốn bị hỏi quyền ở từng lần sửa.",
      "Nhưng Claude vẫn phải hỏi trước khi chạy script deploy của repo.",
      "Chỗ khó: cần một mode nới đúng một loại việc (sửa file), còn lệnh shell khác vẫn phải hỏi. Mode nới quá tay hay siết quá tay đều trượt."
    ],
    asks: [
      "Pha làm nên dùng permission mode nào?",
      "Tức là: mode tự duyệt việc sửa file, nhưng vẫn hỏi trước các lệnh Bash như script deploy.",
      "Soi từng phương án: sửa file có bị hỏi không? Script deploy thì được hỏi, chạy luôn, hay bị từ chối?"
    ],
    facts: [
      "<code>acceptEdits</code>: tự duyệt việc sửa file và các lệnh file thông dụng (<code>mkdir</code>, <code>touch</code>, <code>mv</code>, <code>cp</code>…) trong thư mục làm việc. Các lệnh Bash khác vẫn hỏi như thường.",
      "<code>bypassPermissions</code>: bỏ hỏi quyền và các bước kiểm an toàn, tool chạy ngay. Chỉ nên dùng trong container hay VM cách ly.",
      "<code>dontAsk</code>: tự từ chối mọi thứ lẽ ra phải hỏi, chỉ chạy những tool đã được duyệt sẵn. Phiên không bao giờ chờ người, hợp với CI.",
      "Plan mode: Claude đọc, khám phá, viết kế hoạch, không sửa code. Duyệt kế hoạch thì phiên ra khỏi plan mode, sang một mode thực thi."
    ],
    opts: [
      { k: "A", gist: "Stay in plan mode and approve each proposed edit one at a time, so every change is reviewed before it lands.",
        why: [
          "Plan mode không sửa code (ý 4). Ở lại đó thì không có edit nào để mà duyệt.",
          "Duyệt kế hoạch chính là cửa ra khỏi plan mode. Pha làm phải chạy ở một mode thực thi.",
          "Mà kể cả làm được, duyệt từng edit là đúng thứ dev muốn tránh."
        ] },
      { k: "B", gist: "Switch to <code>bypassPermissions</code> so every edit and command runs immediately and the large migration never stalls on approvals.",
        why: [
          "Bỏ hỏi quyền cho mọi thứ (ý 2), nên script deploy cũng chạy luôn, không hỏi. Trái điều kiện “must still ask” (vẫn phải hỏi).",
          "Mode này còn chỉ nên dùng trong môi trường cách ly, không phải máy dev đang nối tới hạ tầng thật.",
          "Dễ bị cuốn vì nó giải quyết đúng chuyện bị hỏi quá nhiều. Nhưng nó gỡ luôn cái chốt duy nhất đề đòi giữ."
        ] },
      { k: "C", gist: "Switch to <code>acceptEdits</code>, which auto-approves file edits and common filesystem commands while other shell commands still prompt.",
        why: [
          "Hàng chục lần sửa file tự được duyệt, migration chạy một mạch (ý 1).",
          "Script deploy là lệnh Bash ngoài nhóm lệnh file thông dụng, nên vẫn hỏi như thường. Đáp đúng cả hai điều đề đòi."
        ] },
      { k: "D", gist: "Restart with <code>--permission-mode dontAsk</code> so only pre-approved tools run and the session never waits for input.",
        why: [
          "Ngược chiều: mọi thứ lẽ ra phải hỏi đều bị từ chối luôn (ý 3). Sửa file chưa được duyệt sẵn thì bị chặn, migration đứng.",
          "Script deploy cũng bị từ chối chứ không được hỏi. Đề đòi Claude hỏi, không phải cấm.",
          "Mode này hợp với CI không có người ngồi trước máy, không hợp với một pha làm có dev đang theo dõi."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, mục “Biết thêm”: plan là một permission mode; danh sách mode default / acceptEdits / plan / auto / dontAsk / bypassPermissions", href: NOTES + "#l-3-4" },
      { label: "Bài 3.6, mục “Biết thêm”: dontAsk nghĩa là từ chối mọi thứ lẽ ra phải hỏi", href: NOTES + "#l-3-6" },
      { label: "Docs “Permission modes”, mục Auto-approve file edits with acceptEdits mode: tự duyệt sửa file và lệnh file thông dụng, các lệnh Bash khác vẫn hỏi", href: "https://code.claude.com/docs/en/permission-modes" }
    ]
  }
);
