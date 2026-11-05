// Sổ ôn certsafari, Đề 7. Trang so-on-certsafari.html nạp file này trước script render.
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
DE[7] = "Udemy · Practice Test 4 · 60 câu · 04/11/2026";
ENTRIES.push(
  {
    de: 7, n: 1, total: 60, sub: "2.3", subName: "Chia tool cho agent và tool_choice", scen: "S3",
    answer: "B",
    ask: "A document extraction pipeline's first Messages API request forces <code>extract_metadata</code> by name, on a model that supports forced <code>tool_choice</code>. The same request's tools list also carries the enrichment tools used in later turns. On long documents the model sometimes returns three <code>extract_metadata</code> calls in one response, one per section, but the pipeline needs exactly one metadata record before enrichment starts. Which change to the request guarantees exactly one <code>extract_metadata</code> call?",
    scene: [
      "Pipeline trích xuất tài liệu. Request đầu tiên ép gọi <code>extract_metadata</code> theo tên. Đề cho trước model nhận ép tool, nên không phải lo chuyện model mới trả lỗi 400 với <code>any</code> hay ép tool.",
      "Cùng request đó, danh sách <code>tools</code> còn có các tool enrichment (làm giàu dữ liệu) dùng ở các lượt sau.",
      "Chỗ khó: tool đã bị ép mà tài liệu dài vẫn ra ba lệnh gọi <code>extract_metadata</code> trong một response, mỗi phần một lệnh. Ví dụ minh họa:<pre><code>content: [\n  { type: \"tool_use\", name: \"extract_metadata\", input: { section: 1 } },\n  { type: \"tool_use\", name: \"extract_metadata\", input: { section: 2 } },\n  { type: \"tool_use\", name: \"extract_metadata\", input: { section: 3 } }\n]</code></pre>",
      "Pipeline cần đúng một bản ghi metadata trước khi chạy enrichment."
    ],
    asks: [
      "Đổi gì trong request để bảo đảm đúng một lệnh gọi <code>extract_metadata</code>?",
      "Tức là: khóa cùng lúc hai thứ. Tool nào (phải là <code>extract_metadata</code>) và mấy lệnh (đúng một). Lại phải là bảo đảm ở mức API, không phải lời dặn.",
      "Soi từng phương án: nó khóa được thứ nào trong hai, và cờ có đặt đúng chỗ không."
    ],
    facts: [
      "Parallel tool use (gọi nhiều tool trong một lượt) bật sẵn. Một response có thể chứa nhiều block <code>tool_use</code>, kể cả nhiều lệnh gọi cùng một tool.",
      "<code>{\"type\": \"tool\", \"name\": …}</code> ép gọi đúng tool đó. <code>any</code> bắt phải gọi một tool nào đó trong danh sách, Claude tự chọn tool nào. Cả hai chỉ quyết định tool nào, không quyết định gọi mấy lần.",
      "Muốn tắt gọi song song: đặt <code>disable_parallel_tool_use: true</code> bên trong object <code>tool_choice</code>. Docs ghi rõ nó không phải tham số cấp ngoài cùng của request.",
      "Tác dụng của cờ tùy kiểu <code>tool_choice</code>. Với <code>auto</code>: tối đa một tool call, Claude vẫn có thể trả text. Với <code>any</code> hoặc <code>tool</code>: đúng một tool call."
    ],
    opts: [
      { k: "A", gist: "Send <code>disable_parallel_tool_use</code> as a top-level Messages API parameter and leave the forced tool selection as it is.",
        why: [
          "Cờ có thật, nhưng đặt sai chỗ. Nó nằm trong object <code>tool_choice</code>, không phải tham số ngoài cùng (ý 3).",
          "Đặt ở ngoài thì không có gì bảo đảm gọi song song đã tắt. Tài liệu dài vẫn có thể ra ba lệnh gọi.",
          "Dễ bị cuốn vì phần lớn tùy chọn của request (<code>model</code>, <code>max_tokens</code>, <code>tools</code>) đều nằm ở cấp ngoài cùng. Nhưng cờ này thuộc riêng <code>tool_choice</code>."
        ] },
      { k: "B", gist: "Keep <code>tool_choice</code> forcing <code>extract_metadata</code>, and set <code>disable_parallel_tool_use: true</code> inside that <code>tool_choice</code> object.",
        why: [
          "Ép theo tên khóa được tool: lệnh gọi chắc chắn là <code>extract_metadata</code> (ý 2).",
          "Cờ đặt đúng chỗ, trong <code>tool_choice</code> (ý 3). Với kiểu <code>tool</code>, cờ này nghĩa là đúng một tool call (ý 4).",
          "Cộng lại: đúng một lệnh, đúng tool đó. Đây là bảo đảm ở mức API, đúng chữ “guarantees” (bảo đảm) đề đòi."
        ] },
      { k: "C", gist: "Add a system prompt rule saying metadata is extracted once for the whole document, never once per section.",
        why: [
          "Lời dặn trong prompt là xác suất. Phần lớn lần Claude làm theo, nhưng gọi song song vẫn đang bật, nên vẫn có lúc ra ba lệnh (ý 1).",
          "Đề đòi bảo đảm. Pipeline giả định một bản ghi thì thỉnh thoảng vẫn hỏng."
        ] },
      { k: "D", gist: "Switch <code>tool_choice</code> to <code>any</code> and set <code>disable_parallel_tool_use: true</code> inside the <code>tool_choice</code> object.",
        why: [
          "Khóa được số lượng: với <code>any</code>, cờ này nghĩa là đúng một tool call (ý 4).",
          "Nhưng mất khóa tool. <code>any</code> để Claude tự chọn trong cả danh sách (ý 2), mà danh sách có cả tool enrichment. Một lệnh duy nhất đó có thể không phải <code>extract_metadata</code>.",
          "Dễ bị cuốn vì nó có đúng cờ, đặt đúng chỗ, và đúng là ra một lệnh. Nhưng đề cần đúng một lệnh <code>extract_metadata</code>, không phải đúng một lệnh bất kỳ."
        ] }
    ],
    refs: [
      { label: "Bài 2.3, mục “Biết thêm”: disable_parallel_tool_use nằm trong chính object tool_choice", href: NOTES + "#l-2-3" },
      { label: "Cheatsheet D2: các giá trị tool_choice, model nào trả 400 với any/tool", href: NOTES + "#cheat-d2" },
      { label: "Docs Parallel tool use, mục tắt gọi song song: auto thì tối đa một, any/tool thì đúng một", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use" }
    ]
  },
  {
    de: 7, n: 2, total: 60, sub: "5.6", subName: "Giữ nguồn và xử lý mâu thuẫn khi tổng hợp", scen: "S3",
    answer: "D",
    ask: "The synthesis subagent flags a contradiction between two statistics whose sources were published a year apart, when the newer figure actually reflects real growth. Today subagents pass each finding as nothing more than a value and a source name. How should you fix this?",
    scene: [
      "Synthesis subagent báo hai con số thống kê mâu thuẫn nhau.",
      "Thực ra hai nguồn xuất bản cách nhau một năm. Số mới hơn phản ánh tăng trưởng thật, không phải mâu thuẫn.",
      "Chỗ khó: subagent chỉ trả mỗi finding gồm giá trị và tên nguồn. Không có ngày, nên synthesis không có cách nào thấy đây là hai mốc thời gian. Ví dụ minh họa:<pre><code>{ \"value\": \"12%\", \"source\": \"Industry Report\" }\n{ \"value\": \"18%\", \"source\": \"Market Survey\" }</code></pre>"
    ],
    asks: [
      "Sửa thế nào?",
      "Tức là: lỗi nằm ở dữ liệu thiếu (ngày xuất bản) trong gói bàn giao, không nằm ở cách synthesis suy luận. Phải sửa ở chỗ dữ liệu đi vào.",
      "Soi từng phương án: nó bổ sung ngày cho synthesis, hay chỉ bảo synthesis xử lý khác đi trên dữ liệu vẫn thiếu?"
    ],
    facts: [
      "Hai số “mâu thuẫn” rất hay chỉ là hai năm khác nhau. Vì vậy guide bắt subagent kèm ngày xuất bản hoặc ngày thu thập dữ liệu trong output có cấu trúc. Không có ngày, synthesis gọi nhầm chênh lệch thời gian là mâu thuẫn, hoặc ngược lại.",
      "Claim–source mapping: mỗi claim (khẳng định) đi kèm nguồn, trích đoạn và ngày, giữ nguyên qua mọi agent. Nội dung và metadata tách thành trường riêng, không trộn vào văn xuôi.",
      "Mâu thuẫn thật giữa hai nguồn uy tín thì không tự chọn, không lấy nguồn mới hơn. Giữ cả hai giá trị kèm nguồn, ghi chú mâu thuẫn (conflict annotation), để coordinator quyết.",
      "Subagent có context riêng. Thứ gì không có trong output nó trả về thì agent phía sau không có, prompt cũng không tạo ra được."
    ],
    opts: [
      { k: "A", gist: "Tell the synthesis agent in its system prompt that differing statistics may cover different periods and shouldn't be labeled contradictions.",
        why: [
          "Không bù được dữ liệu thiếu. Không có ngày thì synthesis không biết cặp số nào khác kỳ, cặp nào mâu thuẫn thật (ý 1, ý 4).",
          "Hậu quả: nó thôi gắn nhãn mâu thuẫn cho các cặp số lệch nhau, kể cả mâu thuẫn thật đáng phải báo. Đổi lỗi này lấy lỗi khác."
        ] },
      { k: "B", gist: "Have the synthesis agent mark the two values as a conflict with source attribution and hand both to the coordinator to reconcile.",
        why: [
          "Đây là cách đúng cho mâu thuẫn thật (ý 3). Nhưng đề nói rõ chênh lệch ở đây là do thời gian.",
          "Coordinator nhận cùng gói dữ liệu không có ngày, nên cũng mù như synthesis. Mâu thuẫn giả chỉ bị đẩy lên một cấp, không được gỡ.",
          "Dễ bị cuốn vì ghi chú mâu thuẫn kèm nguồn là đúng bài 5.6. Nhưng nó chữa ca mâu thuẫn thật, còn ca này là thiếu ngày."
        ] },
      { k: "C", gist: "Have the synthesis agent keep the value from the newer source and drop the other one, so each report stays internally consistent.",
        why: [
          "Notes ghi thẳng: không tự chọn, không chọn nguồn mới hơn (ý 3).",
          "Bỏ một số là mất luôn xu hướng tăng trưởng, chính là phát hiện đáng giá. Mà gói bàn giao không có ngày, synthesis cũng không biết nguồn nào mới hơn để giữ."
        ] },
      { k: "D", gist: "Require subagents to return the source's publication date as a structured field on every finding, so the two values read as change over time.",
        why: [
          "Sửa đúng gốc: ngày xuất bản thành một trường riêng trong output có cấu trúc (ý 1, ý 2).",
          "Có ngày, synthesis thấy ngay đây là cùng một chỉ số ở hai thời điểm, và viết thành tăng trưởng thay vì mâu thuẫn. Mâu thuẫn thật thì vẫn còn đó để báo."
        ] }
    ],
    refs: [
      { label: "Bài 5.6, mục “Ngày tháng và cách trình bày”: bắt subagent kèm ngày xuất bản để không nhầm khác năm thành mâu thuẫn", href: NOTES + "#l-5-6" },
      { label: "Bài 1.3, mục “Truyền kết quả thế nào để không mất nguồn”: tách nội dung và metadata (URL, ngày đăng)", href: NOTES + "#l-1-3" }
    ]
  },
  {
    de: 7, n: 3, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S3",
    answer: "C",
    ask: "A wrapper script starts the team's overnight research runs with <code>claude -p</code> plus <code>--no-session-persistence</code>, a flag added to keep transcripts off disk. An engineer now wants to reopen one specific overnight run the next morning using <code>--resume</code> with a name. Which change to the wrapper's launch command makes that possible?",
    scene: [
      "Script bọc chạy các lượt research ban đêm bằng <code>claude -p</code> kèm cờ <code>--no-session-persistence</code>. Cờ này được thêm để transcript (bản ghi hội thoại) không nằm trên đĩa.",
      "Sáng hôm sau, một kỹ sư muốn mở lại đúng một lượt chạy đêm qua bằng <code>--resume</code> kèm tên.",
      "Chỗ khó: resume theo tên cần hai điều kiện, phiên phải được lưu và phải có tên. Hiện cả hai đều thiếu. Phương án nào chỉ lo một điều kiện thì vẫn hỏng."
    ],
    asks: [
      "Sửa lệnh khởi chạy thế nào để làm được việc này?",
      "Tức là: lượt chạy đêm phải để lại một transcript trên đĩa, và transcript đó phải mang tên mà <code>--resume</code> tìm được.",
      "Soi từng phương án: sau khi đổi, phiên có được lưu không, có tên không, và có trỏ đúng một lượt chạy không."
    ],
    facts: [
      "Claude Code resume được là vì nó lưu transcript mỗi phiên xuống đĩa. <code>--resume</code> nạp lại một transcript đã lưu, chỉ định bằng ID hoặc tên.",
      "<code>--no-session-persistence</code> tắt việc lưu. Docs CLI ghi phiên khi đó “not saved to disk and cannot be resumed” (không lưu xuống đĩa và không resume được). Cờ này chỉ dùng ở chế độ <code>-p</code>.",
      "Đặt tên phiên bằng <code>--name</code> (hay <code>-n</code>) lúc khởi chạy, hoặc <code>/rename</code> trong phiên. Sau đó <code>claude --resume &lt;tên&gt;</code> mở đúng phiên đó.",
      "<code>--continue</code> mở phiên gần nhất trong thư mục, chọn theo thời điểm chứ không theo tên. Docs ghi <code>claude --continue</code> chạy tương tác thì bỏ qua các phiên tạo bằng <code>claude -p</code>."
    ],
    opts: [
      { k: "A", gist: "Run <code>claude --continue</code> in the same directory the next morning, which reopens the most recent conversation on its own.",
        why: [
          "<code>--continue</code> lấy phiên gần nhất, không phải một lượt chạy chỉ định theo tên. Chạy tương tác thì nó còn bỏ qua phiên tạo bằng <code>claude -p</code> (ý 4).",
          "Quan trọng nhất: cờ <code>--no-session-persistence</code> vẫn còn, phiên không được lưu, không có gì để nối tiếp (ý 2)."
        ] },
      { k: "B", gist: "Pull the session ID from the run's JSON output and resume with that ID, because headless runs can't be resumed by name.",
        why: [
          "Resume bằng ID là cách có thật, nhưng hỏng cùng lý do: phiên không được lưu thì ID không trỏ tới transcript nào (ý 2).",
          "Vế “cannot be resumed by name” (không resume theo tên được) cũng sai. <code>--resume</code> nhận cả ID lẫn tên, phiên chạy bằng <code>-p</code> cũng vậy (ý 1, ý 3)."
        ] },
      { k: "C", gist: "Drop <code>--no-session-persistence</code> and add <code>--name</code> with a run label to each launch, so a saved, named transcript exists for <code>--resume</code>.",
        why: [
          "Bỏ cờ thì phiên lại được lưu xuống đĩa (ý 1, ý 2). Thêm <code>--name</code> thì transcript đó có tên (ý 3).",
          "Đủ cả hai điều kiện, sáng hôm sau <code>claude --resume &lt;tên&gt;</code> mở đúng lượt chạy đêm qua.",
          "Đổi lại, transcript giờ nằm trên đĩa. Team đã thêm cờ để tránh điều này, nên muốn resume thì phải chấp nhận đánh đổi đó."
        ] },
      { k: "D", gist: "Add <code>--name</code> with an investigation label to each launch command, so the next morning's <code>--resume</code> can find the session by that name.",
        why: [
          "Lo được điều kiện có tên (ý 3), nhưng bỏ sót điều kiện được lưu. <code>--no-session-persistence</code> vẫn còn, nên không transcript nào được ghi (ý 2).",
          "Sáng hôm sau <code>--resume</code> theo tên không tìm thấy gì.",
          "Dễ bị cuốn vì <code>--name</code> đúng là cách đặt tên để resume theo tên. Nhưng tên chỉ dán nhãn cho phiên có lưu, không tạo ra transcript."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Biết thêm”: đặt tên phiên bằng --name, --continue khác --resume", href: NOTES + "#l-1-7" },
      { label: "Docs CLI reference: bảng cờ --no-session-persistence, --name, --resume, --continue", href: "https://code.claude.com/docs/en/cli-reference" }
    ]
  },
  {
    de: 7, n: 4, total: 60, sub: "1.5", subName: "Hook của Agent SDK: chặn tool call và chuẩn hóa dữ liệu", scen: "S3",
    answer: "B",
    ask: "Licensing terms forbid retrieving content from several publisher domains. A <code>PreToolUse</code> hook matching <code>WebFetch</code> denies those fetches, yet the search subagent still downloads the pages by running <code>curl</code> through <code>Bash</code>. Which change enforces the policy?",
    scene: [
      "Điều khoản bản quyền cấm lấy nội dung từ vài domain của nhà xuất bản.",
      "Đã có hook <code>PreToolUse</code> với matcher <code>WebFetch</code>, từ chối các lệnh tải từ những domain đó.",
      "Chỗ khó: search subagent vẫn tải được trang, bằng cách chạy <code>curl</code> qua tool <code>Bash</code>. Ví dụ minh họa:<pre><code>WebFetch(\"https://publisher-a.example/article\")    → hook chặn\nBash(\"curl https://publisher-a.example/article\")   → hook không chạy</code></pre>",
      "Điều khoản cấm chính việc lấy nội dung. Lọc sau khi đã lấy về là đã vi phạm rồi."
    ],
    asks: [
      "Đổi gì để chính sách được thực thi?",
      "Tức là: chặn mọi đường dẫn tới việc tải từ domain cấm, và chặn trước khi lệnh chạy.",
      "Soi từng phương án: nó có phủ đường <code>Bash</code> không, chặn trước hay chỉ dọn sau, và có chắc chắn không."
    ],
    facts: [
      "Matcher của hook chỉ so với tên tool. Hook đăng ký cho <code>WebFetch</code> chỉ chạy khi Claude gọi <code>WebFetch</code>. Docs Agent SDK có ví dụ y hệt: hook matcher <code>Write|Edit</code> thì Claude ghi file bằng lệnh Bash, hook không chạy.",
      "<code>PreToolUse</code> chạy trước khi tool thực thi. Trả <code>permissionDecision: \"deny\"</code> thì lệnh không bao giờ chạy. Điều kiện theo tham số (domain nằm trong lệnh) thì kiểm trong thân hook, qua <code>tool_input</code>.",
      "<code>PostToolUse</code> chạy sau khi tool đã chạy xong. Nó sửa hoặc thay được kết quả trước khi Claude đọc, nhưng không rút lại được việc tool đã làm.",
      "Hook là deterministic (chắc chắn), lời dặn trong prompt là probabilistic (xác suất). Quy định có hậu quả pháp lý thì đặt trong code."
    ],
    opts: [
      { k: "A", gist: "Switch the WebFetch hook's <code>permissionDecision</code> from <code>deny</code> to <code>ask</code>, so a person reviews each fetch to a restricted domain.",
        why: [
          "Chỉ đổi cách xử lý trên đường <code>WebFetch</code>, đường vốn đã chặn được. Lỗ hổng nằm ở đường <code>Bash</code>, và hook vẫn không chạy ở đó (ý 1).",
          "<code>curl</code> vẫn tải bình thường. Lại còn nới lỏng đường <code>WebFetch</code>: từ chặn hẳn thành hỏi người."
        ] },
      { k: "B", gist: "Register the deny hook for the <code>Bash</code> tool as well, so commands are checked for the restricted domains before they run.",
        why: [
          "Vá đúng lỗ: hook giờ chạy cả khi Claude gọi <code>Bash</code> (ý 1). Thân hook đọc lệnh trong <code>tool_input</code>, thấy domain cấm thì trả <code>deny</code>, lệnh không chạy (ý 2).",
          "Chặn trước khi tải và chặn bằng code, đúng điều điều khoản đòi (ý 4).",
          "Muốn thực thi một quy định thì phải phủ mọi tool có thể vi phạm nó, không chỉ tool hiển nhiên nhất."
        ] },
      { k: "C", gist: "Put the restricted domain list in the search subagent's system prompt with an explicit instruction never to access those domains.",
        why: [
          "Lời dặn là xác suất (ý 4). Subagent vẫn có lúc chạy <code>curl</code> tới domain cấm.",
          "Quy định có hậu quả pháp lý mà dựa vào việc model nhớ lời dặn là không đủ."
        ] },
      { k: "D", gist: "Add a <code>PostToolUse</code> hook on <code>Bash</code> that strips restricted-domain content from the command output before the model reads it.",
        why: [
          "Phủ đúng tool <code>Bash</code>, nhưng sai thời điểm. <code>PostToolUse</code> chạy khi <code>curl</code> đã tải xong (ý 3).",
          "Lúc hook chạy, nội dung đã được lấy về, vi phạm đã xảy ra. Lọc output không rút lại được.",
          "Dễ bị cuốn vì nó gắn đúng vào <code>Bash</code>, và <code>PostToolUse</code> đúng là chỗ sửa kết quả. Nhưng sửa sau không thay được chặn trước."
        ] }
    ],
    refs: [
      { label: "Bài 1.5: PreToolUse chặn trước khi tool chạy, PostToolUse chỉ sửa kết quả; matcher chỉ xét tên tool", href: NOTES + "#l-1-5" },
      { label: "Docs Agent SDK hooks: ví dụ matcher Write|Edit không bắt được lệnh ghi file qua Bash", href: "https://code.claude.com/docs/en/agent-sdk/hooks" }
    ]
  },
  {
    de: 7, n: 5, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S3",
    answer: "B",
    ask: "The document analysis stage runs headlessly with <code>claude -p</code>. Since its first analysis run, the pipeline has started several unrelated headless sessions in the same project directory, and three source documents have been revised. How should the script run a targeted follow-up analysis?",
    scene: [
      "Bước phân tích tài liệu chạy headless (không giao diện) bằng <code>claude -p</code>.",
      "Từ lượt phân tích đầu tới giờ, pipeline đã chạy thêm vài phiên headless khác, không liên quan, trong cùng thư mục dự án.",
      "Ba tài liệu nguồn đã được sửa. Số còn lại giữ nguyên.",
      "Chỗ khó: có hai dữ kiện. Nhiều phiên chen vào sau làm “phiên gần nhất” không còn là phiên phân tích. Tài liệu đã sửa làm kết quả đọc file cũ trong phiên bị lỗi thời."
    ],
    asks: [
      "Script nên chạy lượt phân tích bổ sung có chủ đích thế nào?",
      "Tức là: nối đúng phiên phân tích cũ (không lấy nhầm phiên khác), và bắt Claude đọc lại đúng ba tài liệu đã sửa (không dùng bản cũ, cũng không đọc lại cả bộ).",
      "Soi từng phương án: chọn phiên bằng gì, và có xử lý ba file đã đổi không."
    ],
    facts: [
      "Chạy <code>claude -p</code> với <code>--output-format json</code> thì kết quả có <code>session_id</code>. Đưa ID đó vào <code>--resume</code> là nạp đúng phiên ấy, dù sau đó có bao nhiêu phiên khác chạy.",
      "<code>--continue</code> mở phiên gần nhất trong thư mục hiện tại, chọn theo thời điểm. Nhiều job dùng chung thư mục thì dễ tiếp nhầm phiên.",
      "Resume nạp lại toàn bộ lịch sử, kể cả kết quả tool cũ. File sửa sau đó thì trong lịch sử vẫn là bản cũ (stale, lỗi thời). Phải nói rõ file nào đã đổi để Claude đọc lại đúng những file đó.",
      "Resume kèm danh sách file đổi hợp khi phần lớn kết quả cũ còn đúng. Phiên mới chỉ đáng khi phần lớn đã lỗi thời."
    ],
    opts: [
      { k: "A", gist: "Resume the saved analysis session with <code>claude -p --resume</code> and ask Claude to carry on with the synthesis, since resuming brings back the earlier tool results it needs.",
        why: [
          "Đúng một nửa: resume nạp lại tin nhắn và kết quả tool cũ (ý 3).",
          "Nhưng chính kết quả tool cũ đó chứa bản cũ của ba tài liệu đã sửa. Không nói file nào đổi thì Claude cứ thế tổng hợp trên nội dung lỗi thời.",
          "Dễ bị cuốn vì “resuming restores the prior tool results” (resume khôi phục kết quả tool cũ) là câu đúng. Nhưng ở đây kết quả cũ là vấn đề, không phải lợi thế."
        ] },
      { k: "B", gist: "Capture <code>session_id</code> from the first run's JSON output, resume it with <code>claude -p --resume</code> and that ID, and name the three revised documents for Claude to re-read.",
        why: [
          "Chọn phiên theo ID nên trúng đúng phiên phân tích, mặc kệ các phiên khác chạy sau (ý 1).",
          "Nêu tên ba tài liệu đã sửa để Claude đọc lại đúng ba file đó, phần còn lại giữ phân tích cũ (ý 3, ý 4).",
          "Giải được cả hai dữ kiện của đề: nhiều phiên chen vào, và ba file đã đổi."
        ] },
      { k: "C", gist: "Run the follow-up with <code>claude --continue -p</code> and a prompt naming the three revised documents, since <code>--continue</code> reopens the most recent session in that directory.",
        why: [
          "Phần prompt nêu ba file là đúng. Phần chọn phiên thì sai.",
          "<code>--continue</code> lấy phiên gần nhất theo thời điểm (ý 2). Sau lượt phân tích đã có vài phiên khác chạy, nên phiên gần nhất là một phiên không liên quan.",
          "Dễ bị cuốn vì pipeline chỉ có một phiên thì cách này chạy tốt. Đề cài sẵn “several unrelated headless sessions” (vài phiên headless không liên quan) để loại nó."
        ] },
      { k: "D", gist: "Start a fresh <code>claude -p</code> run that re-reads the whole document corpus, so every finding reflects the current files.",
        why: [
          "Kết quả đúng, nhưng phí. Chỉ ba tài liệu đổi, mà phải đọc lại cả bộ và làm lại phân tích đã có (ý 4).",
          "Notes xếp “bỏ hết, bắt agent đọc lại toàn bộ” vào cột Tệ. Phiên mới chỉ đáng khi phần lớn kết quả cũ đã lỗi thời."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Ba cách nối lại công việc”: resume và nói rõ file nào đã đổi; “Biết thêm”: --continue khác --resume", href: NOTES + "#l-1-7" },
      { label: "Bài 3.6, mục “Biết thêm”: session_id trong output dùng cho --resume ở lần chạy sau", href: NOTES + "#l-3-6" }
    ]
  },
  {
    de: 7, n: 6, total: 60, sub: "1.1", subName: "Vòng lặp agent", scen: "S3",
    answer: "D",
    ask: "The search subagent runs a manual loop. After each assistant turn that requests tools, it replies with one user message that mixes guidance text with the <code>tool_result</code> blocks. The API rejects the request with an invalid tool-result ordering error. Policy requires the loop to log every tool call before it runs. What is the correct fix?",
    scene: [
      "Search subagent tự viết vòng lặp agent (manual loop) gọi Messages API.",
      "Sau mỗi lượt Claude xin gọi tool, vòng lặp trả lời bằng một message <code>user</code> trộn chữ hướng dẫn với các block <code>tool_result</code>. Ví dụ minh họa:<pre><code>{ role: \"user\", content: [\n  { type: \"text\", text: \"Focus on peer-reviewed sources.\" },\n  { type: \"tool_result\", tool_use_id: \"toolu_01\", ... },\n  { type: \"tool_result\", tool_use_id: \"toolu_02\", ... }\n] }</code></pre>",
      "API từ chối, báo lỗi thứ tự tool result.",
      "Thêm ràng buộc: chính sách bắt vòng lặp ghi log từng tool call trước khi chạy nó."
    ],
    asks: [
      "Sửa thế nào cho đúng?",
      "Tức là: sắp lại message cho đúng định dạng API đòi, mà vẫn giữ chữ hướng dẫn và bước ghi log trước mỗi tool call.",
      "Soi từng phương án: nó có sửa đúng chỗ sai (thứ tự trong message) không, và có giữ được vòng lặp tự viết không."
    ],
    facts: [
      "Message chứa kết quả phải đứng ngay sau message assistant có các block <code>tool_use</code>. Trong message đó, các block <code>tool_result</code> phải đứng đầu mảng <code>content</code>, text nào cũng đứng sau. Text đứng trước thì API trả lỗi 400.",
      "Mỗi <code>tool_use</code> có đúng một <code>tool_result</code>, ghép với nhau bằng <code>tool_use_id</code> trùng <code>id</code> của lời xin. Claude xin nhiều tool một lượt thì mọi kết quả gom chung một message <code>user</code>.",
      "Tool Runner của SDK tự lo vòng lặp: chạy tool, định dạng kết quả, giữ hội thoại. Docs ghi: cần duyệt có người, ghi log riêng hay chạy có điều kiện thì dùng vòng lặp tự viết."
    ],
    opts: [
      { k: "A", gist: "Split the reply so every <code>tool_result</code> block sits in its own user message, letting the API match each <code>tool_use_id</code> one at a time.",
        why: [
          "Đi ngược định dạng docs: mọi kết quả của một lượt gom chung một message <code>user</code> (ý 2). Docs Parallel tool use ghi tách mỗi kết quả một message là cách sai.",
          "Lại không đụng tới chỗ hỏng thật: chữ hướng dẫn vẫn đứng trước <code>tool_result</code> (ý 1)."
        ] },
      { k: "B", gist: "Rewrite the <code>tool_use_id</code> values so the results follow the order in which the tools finished, letting the API pair them with the calls.",
        why: [
          "Sai ở giả định: API ghép kết quả với lời xin bằng <code>tool_use_id</code>, không bằng thứ tự xong trước xong sau (ý 2).",
          "Đổi ID thì kết quả không còn khớp lời xin nào, lỗi nặng thêm. Mà lỗi của đề nằm ở thứ tự text với <code>tool_result</code>, không ở ID."
        ] },
      { k: "C", gist: "Replace the manual loop with the SDK Tool Runner, so it formats the tool results and manages the request cycle automatically.",
        why: [
          "Tool Runner đúng là định dạng kết quả đúng, nhưng nó cũng nhận luôn việc chạy tool (ý 3).",
          "Đề có ràng buộc ghi log từng tool call trước khi chạy. Docs nói đây đúng là loại việc nên giữ vòng lặp tự viết (ý 3).",
          "Dễ bị cuốn vì nó gỡ lỗi định dạng tận gốc. Nhưng gỡ bằng cách bỏ luôn chỗ mày cần kiểm soát, trong khi chỉ cần đổi thứ tự hai khối."
        ] },
      { k: "D", gist: "Move the <code>tool_result</code> blocks to the start of that user message, right after the assistant tool-use turn, and put the guidance text after them.",
        why: [
          "Sửa đúng chỗ sai: <code>tool_result</code> đứng đầu <code>content</code>, chữ hướng dẫn xuống sau (ý 1). Message vẫn đứng ngay sau lượt assistant.",
          "Giữ nguyên nội dung và chữ hướng dẫn. Vòng lặp vẫn tự viết, nên bước ghi log trước mỗi tool call vẫn còn (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 1.1, mục “Vòng lặp chuẩn, từng dòng”: mỗi tool_use một tool_result, gom chung một message user", href: NOTES + "#l-1-1" },
      { label: "Docs Handle tool calls, mục Important formatting requirements: tool_result đứng đầu, text đứng sau", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls" },
      { label: "Docs Tool runner: khi nào dùng vòng lặp tự viết thay cho Tool Runner", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-runner" }
    ]
  },
  {
    de: 7, n: 7, total: 60, sub: "1.2", subName: "Điều phối coordinator–subagent", scen: "S3",
    answer: "B",
    ask: "The coordinator checks each draft for missing subtopics and sends a new search for every gap it finds. For most topics the loop ends with full coverage. But when a subtopic has no published sources at all, the coordinator sends the same search again every round and the run never finishes. What change fixes this?",
    scene: [
      "Coordinator đọc từng bản nháp, tìm mảng con còn thiếu, giao một lượt search mới cho từng mảng thiếu. Đây là vòng tinh chỉnh (iterative refinement).",
      "Với đa số đề tài, vòng này kết thúc khi đủ mảng.",
      "Chỗ khó: có mảng con không có nguồn nào được xuất bản. Search mấy lần cũng trống, mà điều kiện dừng là “đủ mảng”, nên vòng lặp chạy mãi."
    ],
    asks: [
      "Đổi gì để sửa?",
      "Tức là: cho vòng lặp một lối thoát khi mảng thiếu không lấp được, vẫn giữ chuẩn cho đa số đề tài lấp được, và nói thật với người đọc chỗ nào thiếu.",
      "Soi từng phương án: vòng có chắc chắn dừng không, đề tài bình thường có bị hạ chuẩn không, và báo cáo có giấu lỗ hổng không."
    ],
    facts: [
      "Iterative refinement (tinh chỉnh nhiều vòng): coordinator đọc bản tổng hợp, thấy mảng nào mỏng thì giao tìm thêm đúng mảng đó, rồi tổng hợp lại.",
      "Vòng tinh chỉnh phải có điểm dừng: tiêu chí “thế nào là đủ”, cộng một trần cứng (số lần, <code>maxTurns</code> hoặc ngân sách tiền). Không có trần thì vòng chạy tới khi hết tiền.",
      "Coverage annotation: ghi chú trong báo cáo cuối, mảng nào đủ nguồn, mảng nào thiếu và thiếu vì sao. Trung thực hơn một đoạn văn trôi chảy giấu lỗ hổng.",
      "<code>maxTurns</code> trong <code>AgentDefinition</code> giới hạn số vòng của một subagent trong một lần được giao việc. Nó không đụng tới vòng lặp của coordinator."
    ],
    opts: [
      { k: "A", gist: "Have the coordinator broaden each gap query on every round and keep looping until the evaluator reports full coverage.",
        why: [
          "Đổi câu tìm hợp khi mảng thiếu là do câu tìm viết dở. Ở đây nguồn không tồn tại, tìm rộng mấy cũng trống.",
          "Điều kiện dừng vẫn chỉ là “đủ mảng”, không có trần (ý 2). Với đề tài này vòng lặp vẫn không bao giờ dừng."
        ] },
      { k: "B", gist: "Cap the retries per gap, then finalize the report with a coverage annotation marking that subtopic as limited by unavailable sources.",
        why: [
          "Trần số lần thử cho mỗi mảng là lối thoát chắc chắn (ý 2). Hết lượt thì dừng, không đốt tiền vào cùng một lượt search trống.",
          "Coverage annotation ghi rõ mảng đó thiếu vì không có nguồn (ý 3). Người đọc biết chỗ nào mỏng và vì sao, phần còn lại vẫn tin được.",
          "Đề tài bình thường không bị ảnh hưởng: mảng lấp được thì vẫn lấp trong các lượt thử."
        ] },
      { k: "C", gist: "Raise <code>maxTurns</code> in the search subagent's <code>AgentDefinition</code> so each targeted delegation can run more search rounds before returning.",
        why: [
          "<code>maxTurns</code> là trường có thật, nhưng sai tầng: nó giới hạn số vòng bên trong một subagent, không đụng tới vòng lặp của coordinator (ý 4).",
          "Tăng lên chỉ cho subagent tìm lâu hơn mỗi lần. Nguồn không có thì vẫn không có, và coordinator vẫn giao lại mãi.",
          "Dễ bị cuốn vì đề kể chuyện chạy mãi, mà <code>maxTurns</code> là trần quen thuộc nhất. Nhưng phương án này nâng trần lên chứ không đặt trần, lại đặt ở sai vòng lặp."
        ] },
      { k: "D", gist: "Relax the coordinator's coverage criteria so a draft with one unfilled subtopic passes the sufficiency check and ends the loop.",
        why: [
          "Vòng có dừng, nhưng hạ chuẩn cho mọi đề tài. Đa số đề tài có mảng thiếu lấp được bằng một lượt nữa, giờ thì lọt qua luôn.",
          "Báo cáo cũng không ghi gì về mảng bị bỏ (ý 3). Người đọc tưởng báo cáo đủ."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, mục “Biết thêm”: vòng tinh chỉnh phải có tiêu chí đủ và trần cứng", href: NOTES + "#l-1-2" },
      { label: "Bài 5.3: coverage annotation, báo cáo ghi rõ mảng nào thiếu nguồn và vì sao", href: NOTES + "#l-5-3" }
    ]
  },
  {
    de: 7, n: 8, total: 60, sub: "2.5", subName: "Chọn built-in tool đúng việc", scen: "S3",
    answer: "B",
    ask: "Before a refactor, the coordinator has to list every call site of a module's five exported functions, with exact locations. It spawns one search subagent per function name; each run is slow and comes back with a vague summary. What should change?",
    scene: [
      "Trước khi refactor, coordinator cần liệt kê mọi call site (chỗ gọi hàm) của năm hàm mà một module export, kèm vị trí chính xác.",
      "Hiện nó tạo một search subagent cho mỗi tên hàm. Mỗi lượt chạy chậm, và trả về một bản tóm tắt chung chung.",
      "Chỗ khó: hai vấn đề cùng một gốc. Chậm vì phải dựng subagent. Mơ hồ vì subagent trả bản tóm tắt thay cho kết quả tìm gốc."
    ],
    asks: [
      "Nên đổi gì?",
      "Tức là: lấy đủ vị trí chính xác của mọi call site, nhanh, không qua một lớp tóm tắt.",
      "Soi từng phương án: còn chi phí dựng subagent không, có giữ kết quả gốc (file, dòng) không, và tool có tìm trong nội dung file không."
    ],
    facts: [
      "Grep tìm chữ trong nội dung file (theo regex), trả về file và dòng khớp. Glob khớp tên file và đường dẫn theo mẫu như <code>**/*.ts</code>, không đọc nội dung.",
      "Subagent thường khởi động với context trống, phải tự gom lại thông tin, và trả về bản tóm tắt cuối chứ không trả output gốc của tool. Đó là chi phí cố định mỗi lần giao việc.",
      "Giao cho subagent khi output dài, việc tự chứa, hoặc cần giới hạn tool. Việc nhỏ, phạm vi rõ thì Grep/Read thẳng trong phiên chính nhanh hơn và chính xác hơn."
    ],
    opts: [
      { k: "A", gist: "Merge the five searches into one subagent that runs them all and returns a single combined summary of where the functions are used.",
        why: [
          "Bớt được bốn lần dựng subagent, nhưng vẫn trả bản tóm tắt (ý 2).",
          "Đề cần vị trí chính xác của từng call site. Một đoạn văn kể hàm này dùng ở đâu không thay được danh sách file và dòng."
        ] },
      { k: "B", gist: "Run one Grep query per exported name directly in the coordinator, and keep the exact match locations from the tool output.",
        why: [
          "Mỗi tên hàm là một lần tìm trong nội dung file, đúng việc của Grep (ý 1). Năm lần gọi nhanh, không phải dựng subagent nào.",
          "Coordinator thấy thẳng output của Grep: file và dòng của từng chỗ khớp. Không qua lớp tóm tắt nên không mất vị trí (ý 2).",
          "Đây là năm lần tìm chính xác, không phải một cuộc điều tra dài tự chứa, nên giao việc không đáng (ý 3)."
        ] },
      { k: "C", gist: "Keep one subagent per name, but require each to return file paths and line numbers in a structured output block.",
        why: [
          "Sửa được nửa vấn đề: output có cấu trúc kèm path và số dòng thì hết mơ hồ.",
          "Nhưng vẫn dựng năm subagent, nên vẫn chậm (ý 2). Đề kể cả hai vấn đề, phương án này chỉ lo một.",
          "Dễ bị cuốn vì output có cấu trúc là kỹ thuật đúng. Nhưng gốc của chậm là chính việc giao việc, mà Grep thẳng làm xong nhanh hơn."
        ] },
      { k: "D", gist: "Run one Glob query per exported name in the coordinator, since Glob patterns can match the names across the repository.",
        why: [
          "Sai tool: Glob khớp tên file và đường dẫn, không tìm trong nội dung (ý 1).",
          "Call site là chữ nằm trong file. Glob theo tên hàm chỉ ra file nào có tên giống tên hàm, không ra chỗ gọi nào."
        ] }
    ],
    refs: [
      { label: "Bài 2.5: Grep tìm nội dung, Glob tìm tên file", href: NOTES + "#l-2-5" },
      { label: "Bài 5.4, mục “Biết thêm”: không phải lúc nào cũng delegate, việc nhỏ thì Grep/Read trực tiếp", href: NOTES + "#l-5-4" }
    ]
  },
  {
    de: 7, n: 9, total: 60, sub: "5.4", subName: "Quản lý context khi khám phá codebase lớn", scen: "S3",
    answer: "C",
    ask: "An engineer's Claude Code session, spent debugging the synthesis subagent's citation logic, has almost filled the context window. The next task changes report-generator code that depends on decisions made during this debugging. Which command fits this situation best?",
    scene: [
      "Kỹ sư debug phần citation (trích nguồn) của synthesis subagent trong một phiên Claude Code. Context gần đầy.",
      "Việc kế tiếp là sửa code report-generator, mà việc này phụ thuộc các quyết định vừa chốt trong lúc debug.",
      "Chỗ khó: vừa phải dọn chỗ trong context, vừa phải giữ kết luận của phiên. Lệnh nào làm được một mà mất cái kia thì hỏng."
    ],
    asks: [
      "Lệnh nào hợp nhất?",
      "Tức là: giải phóng context mà các quyết định khi debug vẫn còn trong phiên cho việc sau dùng.",
      "Soi từng phương án: context có thật sự được giải phóng không, và quyết định khi debug còn hay mất."
    ],
    facts: [
      "<code>/compact</code> nén lịch sử hội thoại thành bản tóm tắt, phiên chạy tiếp. Thêm chỉ dẫn được, ví dụ <code>/compact focus on &lt;chủ đề&gt;</code>, để bản tóm tắt giữ đúng thứ mày chọn.",
      "<code>/clear</code> xóa context, bắt đầu hội thoại mới. Dùng khi chuyển sang việc khác hẳn, không dùng để tiếp tục việc đang dở.",
      "<code>/rewind</code> lùi về một điểm cũ trong phiên, khôi phục hội thoại (và code) về lúc đó. Mọi thứ sau điểm đó bị bỏ.",
      "<code>autoCompactWindow</code> đặt mức context được đầy tới đâu thì Claude Code tự compact. Nó chỉ dời thời điểm tự compact, không giải phóng chỗ nào. Docs ghi mức này bị chặn ở cửa sổ context của model."
    ],
    opts: [
      { k: "A", gist: "Raise the <code>autoCompactWindow</code> setting so automatic compaction kicks in later and the session keeps its full history.",
        why: [
          "Sai việc: setting này chỉ quyết định lúc nào tự compact, không dọn chỗ trong context đang gần đầy (ý 4).",
          "Cửa sổ context của model là giới hạn cố định. Nâng ngưỡng chỉ hoãn compact, phiên vẫn đầy và vẫn nặng dần."
        ] },
      { k: "B", gist: "Run <code>/clear</code> to empty the context, so the next task starts without any accumulated noise.",
        why: [
          "<code>/clear</code> hợp khi chuyển sang việc khác hẳn (ý 2). Việc sau ở đây lại phụ thuộc quyết định vừa chốt.",
          "Xóa xong, các quyết định khi debug không còn trong context. Việc sửa report-generator chạy mà không biết chúng.",
          "Dễ bị cuốn vì “starts without any accumulated noise” (bắt đầu sạch, không còn rác) nghe như giải pháp cho context đầy. Nhưng đề cài sẵn chữ “depends on decisions” (phụ thuộc các quyết định) để loại nó."
        ] },
      { k: "C", gist: "Run <code>/compact</code>, which summarizes the conversation so the session continues with the debugging decisions still available.",
        why: [
          "<code>/compact</code> nén lịch sử thành bản tóm tắt, giải phóng context mà phiên vẫn chạy tiếp (ý 1).",
          "Các quyết định khi debug đi theo trong bản tóm tắt. Muốn chắc thì thêm chỉ dẫn, kiểu <code>/compact focus on the citation fixes</code>.",
          "Vừa có chỗ, vừa giữ kết luận: đúng hai điều đề đòi."
        ] },
      { k: "D", gist: "Run <code>/rewind</code> to a checkpoint from before the verbose debugging output entered the context.",
        why: [
          "Lùi về checkpoint thì bỏ được đống output dài, nhưng bỏ luôn mọi thứ sau điểm đó, kể cả các quyết định khi debug (ý 3).",
          "<code>/rewind</code> để quay lại khi đi sai hướng, không phải để dọn chỗ mà giữ kết luận."
        ] }
    ],
    refs: [
      { label: "Bài 5.4, mục “Biết thêm”: /compact focus giữ thứ mày chọn, /clear chỉ cho việc khác hẳn", href: NOTES + "#l-5-4" },
      { label: "Bài 1.7, mục “Đã sửa 02/11”: /rewind lùi lại trong cùng phiên", href: NOTES + "#fix-12" },
      { label: "Docs Explore the context window, mục When your context fills up: /compact, /rewind, /autocompact, /clear", href: "https://code.claude.com/docs/en/context-window" }
    ]
  },
  {
    de: 7, n: 10, total: 60, sub: "1.2", subName: "Điều phối coordinator–subagent", scen: "S3",
    answer: "AD",
    ask: "The research system has two problems: (1) synthesis reports never use the search subagent's findings, and (2) a single search timeout recently ended the entire run. Every handoff between subagents must stay visible to the coordinator. Which two changes should the architect make? (Choose two.)",
    scene: [
      "Hệ research có hai vấn đề. Một: báo cáo tổng hợp không bao giờ dùng findings (kết quả tìm được) của search subagent. Hai: mới đây chỉ một lần search bị timeout mà cả lượt chạy dừng.",
      "Ràng buộc: mọi lần bàn giao giữa các subagent phải hiện ra trước mắt coordinator.",
      "Chỗ khó: hai vấn đề khác loại, một là chuyển dữ liệu, một là xử lý lỗi. Đề bắt chọn hai bước, mỗi bước lo một vấn đề, và cả hai phải đi qua coordinator."
    ],
    asks: [
      "Kiến trúc sư nên làm hai thay đổi nào?",
      "Tức là: đưa findings tới synthesis bằng đường đi qua coordinator, và để coordinator quyết khi một lần search lỗi, thay vì cả lượt chạy sập.",
      "Soi từng phương án: nó lo vấn đề nào, và lần bàn giao có đi qua coordinator không."
    ],
    facts: [
      "Hub-and-spoke (trục và nan hoa): coordinator là trục. Nó giao việc, subagent trả kết quả về nó, lỗi cũng báo về nó. Subagent không nói chuyện trực tiếp với nhau.",
      "Subagent thường (không phải fork) bắt đầu với context trống: chỉ có system prompt của nó và lời giao việc. Muốn synthesis dùng kết quả search thì coordinator phải dán nguyên kết quả đó vào lời giao việc.",
      "Vì mọi kết quả và lỗi đổ về coordinator, nó là chỗ quyết thử lại, giao cho subagent khác, hay đi tiếp với kết quả thiếu và ghi rõ chỗ thiếu.",
      "Agent teams là chế độ thử nghiệm (experimental) của Claude Code, tắt sẵn. Trong đó các teammate nhắn tin trực tiếp cho nhau."
    ],
    opts: [
      { k: "A", gist: "Have the coordinator include the search subagent's full findings directly in the synthesis subagent's prompt.",
        why: [
          "Lo vấn đề 1. Synthesis không thấy findings vì chẳng ai đưa chúng vào lời giao việc của nó (ý 2).",
          "Coordinator dán nguyên findings vào prompt thì synthesis có dữ liệu để viết. Lần bàn giao đi qua tay coordinator, đúng ràng buộc của đề (ý 1)."
        ] },
      { k: "B", gist: "Turn on the experimental agent teams mode so the synthesis subagent can message the search subagent directly and ask for findings.",
        why: [
          "Agent teams có thật, nhưng teammate nhắn thẳng cho nhau (ý 4). Lần bàn giao không còn qua coordinator, trái ràng buộc của đề.",
          "Nó còn thay luôn mô hình hub-and-spoke (ý 1), trong khi lỗi chỉ là coordinator chưa truyền findings."
        ] },
      { k: "C", gist: "Have the search subagent write its full findings to a shared file, and tell the synthesis subagent to read that file before writing its report.",
        why: [
          "Cách này chuyển được dữ liệu: subagent có tool đọc ghi file thì dùng chung một file được.",
          "Nhưng dữ liệu đi đường vòng, thẳng từ search sang synthesis, coordinator không thấy gì đã chuyển qua. Trái ràng buộc “visible to the coordinator” (coordinator phải thấy) (ý 1).",
          "Dễ bị cuốn vì nó giải được vấn đề 1 mà không phải sửa coordinator. Nhưng notes xếp “bật một bộ nhớ chung để subagent tự đọc” vào cột Tệ."
        ] },
      { k: "D", gist: "Send each search failure to the coordinator, which decides whether to retry the search or carry on with partial findings.",
        why: [
          "Lo vấn đề 2. Lỗi báo về trục, đúng hub-and-spoke (ý 1).",
          "Coordinator thấy toàn cảnh nên quyết được: thử lại, hay đi tiếp với kết quả thiếu và ghi rõ chỗ thiếu (ý 3). Một lần timeout không còn làm sập cả lượt chạy."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, mục “Chuyện gì đang xảy ra”: hub-and-spoke, mọi thứ kể cả lỗi đi qua coordinator", href: NOTES + "#l-1-2" },
      { label: "Bài 1.3: subagent không biết gì cho đến khi coordinator dán kết quả vào lời giao việc", href: NOTES + "#l-1-3" },
      { label: "Docs Agent teams: chế độ thử nghiệm, teammate nhắn thẳng cho nhau", href: "https://code.claude.com/docs/en/agent-teams" }
    ]
  },
  {
    de: 7, n: 11, total: 60, sub: "2.3", subName: "Chia tool cho agent và tool_choice", scen: "S3",
    answer: "D",
    ask: "Every one of the four subagents is handed the same catalog of 16 tools. The team has already rewritten all the tool descriptions with clear boundary wording, yet the synthesis agent keeps calling web search tools. Which change stops this misuse most reliably?",
    scene: [
      "Hệ research có bốn subagent, đứa nào cũng được cấp cùng một bộ 16 tool.",
      "Team đã viết lại description của mọi tool, có câu ranh giới rõ: tool này dùng khi nào, không dùng khi nào.",
      "Chỗ khó: description sửa rồi mà synthesis agent (agent tổng hợp) vẫn gọi tool web search. Cách sửa hay làm đầu tiên đã thử, và không đủ."
    ],
    asks: [
      "Đổi gì để chặn việc gọi nhầm này chắc nhất?",
      "Tức là: làm sao cho synthesis agent không còn chọn được web search, thay vì chỉ bảo nó đừng chọn.",
      "Soi từng phương án: sau khi đổi, web search còn nằm trong bộ tool của synthesis agent không?"
    ],
    facts: [
      "Scoped tool access: mỗi agent chỉ cầm tool đúng vai trò. Guide nói 18 tool thay vì 4–5 làm độ tin cậy chọn tool giảm, và agent có tool ngoài chuyên môn thì sẽ dùng, thường là dùng sai.",
      "Trường <code>tools</code> trong AgentDefinition là danh sách tool subagent có. Tool không có trong danh sách thì subagent không gọi được. Bỏ trống trường này thì subagent nhận toàn bộ tool.",
      "Docs Agent SDK: <code>allowedTools</code> chỉ duyệt sẵn các tool trong danh sách, cho chạy không cần hỏi. Tool ngoài danh sách vẫn còn, Claude vẫn thấy và vẫn gọi được. Lần gọi nào cần duyệt thì chuyển xuống permission mode xử lý.",
      "Lời dặn trong system prompt là xác suất: tool còn trong bộ thì vẫn có lúc bị gọi. Muốn chặn chắc thì chặn bằng cấu hình."
    ],
    opts: [
      { k: "A", gist: "Lengthen every tool description with sample queries that show which subagent should call it and when it should not.",
        why: [
          "Sai ở chỗ làm lại đúng việc đã làm: description đã có ranh giới rõ mà vẫn gọi nhầm.",
          "Gốc lỗi là synthesis agent đang cầm cả 16 tool, web search nằm trong số đó (ý 1). Viết dài hơn không bớt được lựa chọn nào.",
          "Dễ bị cuốn vì description là thứ model dựa vào để chọn tool, và sửa description thường là bước đầu tiên. Nhưng đề kể bước đó đã làm rồi."
        ] },
      { k: "B", gist: "Set <code>allowedTools</code> in the permission settings so each subagent auto-approves only the tools that fit its role.",
        why: [
          "Sai ở giả định: <code>allowedTools</code> là danh sách duyệt sẵn, không phải danh sách tool được thấy (ý 3).",
          "Web search vẫn nằm trong bộ tool của synthesis agent. Nó vẫn chọn giữa 16 tool, chỉ là lần gọi web search phải qua bước xin quyền.",
          "Dễ bị cuốn vì chữ “allowed” (được phép) nghe như giới hạn tool. Nhưng chính phương án ghi “auto-approval” (tự duyệt): nó quyết tool nào chạy không cần hỏi, không quyết tool nào tồn tại."
        ] },
      { k: "C", gist: "Add a line to each subagent's system prompt that names its permitted tools and tells it to ignore all the others.",
        why: [
          "Chỉ là lời dặn (ý 4). Cả 16 tool vẫn nằm trong context của synthesis agent, nên vẫn có lúc nó gọi web search.",
          "Description có ranh giới rõ cũng là một dạng lời dặn, và đã không đủ. Thêm một lời dặn nữa thì gốc lỗi vẫn còn nguyên."
        ] },
      { k: "D", gist: "In each subagent's AgentDefinition, set the <code>tools</code> field to list only the tools that role needs.",
        why: [
          "Synthesis agent chỉ còn tool tổng hợp. Web search không có trong danh sách thì nó không gọi được (ý 2). Gọi nhầm đổi từ “không nên” thành “không thể”.",
          "Mỗi agent chọn giữa vài tool đúng vai trò thay vì 16, nên chọn tool tin cậy hơn hẳn (ý 1).",
          "Chặn bằng cấu hình nên chắc chắn, không trông vào việc model có nghe lời hay không (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 2.3: scoped tool access, 18 tool thay vì 4–5, synthesis agent có web search thì tự đi search", href: NOTES + "#l-2-3" },
      { label: "Cheatsheet D1: dòng “Subagent không khai tools mà gọi được mọi tool”", href: NOTES + "#cheat-d1" },
      { label: "Docs Agent SDK “Configure permissions”, mục Allow and deny rules: allowedTools chỉ duyệt sẵn, tool ngoài danh sách vẫn còn", href: "https://code.claude.com/docs/en/agent-sdk/permissions" }
    ]
  },
  {
    de: 7, n: 12, total: 60, sub: "2.5", subName: "Chọn built-in tool đúng việc", scen: "S3",
    answer: "BC",
    ask: "The report agent has to rename one citation tag everywhere in <code>findings.md</code>. Its Edit call fails because the tag occurs 14 times. A second Edit reports no match, even though the target text is plainly in the file. Which TWO actions fix these two failures? (Select TWO.)",
    scene: [
      "Report agent cần đổi tên một citation tag (thẻ trích dẫn) ở mọi chỗ trong <code>findings.md</code>.",
      "Lỗi 1: Edit báo lỗi vì tag xuất hiện 14 lần.",
      "Lỗi 2: một lần Edit khác báo không tìm thấy, dù nhìn file thì đoạn đó rõ ràng có. Ví dụ minh họa:<pre><code>trong file:  ····[src-12] Smith 2024   (thụt 4 dấu cách)\nold_string:  ··[src-12] Smith 2024     (thụt 2 dấu cách)</code></pre>",
      "Chỗ khó: hai lỗi, hai cách chữa khác nhau. Lỗi 1 còn có hai cách chữa đều chạy được, chọn cái nào là do ý định “everywhere” (mọi chỗ)."
    ],
    asks: [
      "Hai hành động nào chữa được hai lỗi này?",
      "Tức là: một cách cho Edit đổi cả 14 chỗ, và một cách cho <code>old_string</code> khớp đúng đoạn đang có trong file.",
      "Soi từng phương án: Edit có làm được điều phương án giả định không? Làm được thì kết quả có đúng ý “mọi chỗ” không?"
    ],
    facts: [
      "Edit tìm <code>old_string</code> đúng nguyên văn, từng ký tự. Nó không chạy regex (biểu thức chính quy), không khớp gần đúng. Lệch một dấu cách hay một mức thụt lề là trượt.",
      "<code>old_string</code> phải xuất hiện đúng một lần. Khớp nhiều chỗ thì Edit báo lỗi. Có hai cách gỡ: kéo dài <code>old_string</code> bằng ngữ cảnh xung quanh cho thành duy nhất, hoặc bật <code>replace_all: true</code> để sửa hết.",
      "<code>replace_all</code> đổi mọi chỗ khớp. Dùng khi thật sự muốn đổi tất cả, ví dụ đổi một cái tên trong cả file.",
      "Edit báo không khớp thì Read lại file và chép đúng đoạn đang có vào <code>old_string</code>, đừng gõ lại theo trí nhớ."
    ],
    opts: [
      { k: "A", gist: "For the repeated tag, lengthen <code>old_string</code> with enough surrounding text that it pins down a single occurrence.",
        why: [
          "Chạy được: <code>old_string</code> dài hơn khớp đúng một chỗ, Edit hết báo lỗi (ý 2).",
          "Nhưng chỉ đổi 1 trong 14 chỗ. 13 chỗ còn lại giữ tên cũ, trái ý “everywhere”.",
          "Dễ bị cuốn vì đây đúng là cách notes dạy khi Edit khớp nhiều chỗ, như câu 11 Đề 3. Nhưng câu đó chỉ được sửa một chỗ, còn câu này phải sửa mọi chỗ."
        ] },
      { k: "B", gist: "For the no-match failure, Read the file and copy the exact target text, indentation included, into <code>old_string</code>.",
        why: [
          "Edit so từng ký tự (ý 1). Đoạn “nhìn thấy có” mà vẫn không khớp thì gần như chắc là lệch khoảng trắng hoặc thụt lề so với bản gõ tay.",
          "Read rồi chép nguyên văn thì <code>old_string</code> giống y đoạn trong file, Edit khớp được (ý 4)."
        ] },
      { k: "C", gist: "For the repeated tag, keep the same <code>old_string</code> and set <code>replace_all</code> to true so one call changes every occurrence.",
        why: [
          "<code>replace_all: true</code> là cách Edit cho sửa khi khớp nhiều chỗ (ý 2). Một lần gọi đổi cả 14 chỗ (ý 3).",
          "Đúng ý đề: đổi tên ở mọi chỗ, không phải ở một chỗ."
        ] },
      { k: "D", gist: "For the no-match failure, rewrite <code>old_string</code> as a regular expression that tolerates differences in whitespace.",
        why: [
          "Sai ở giả định: Edit không chạy regex (ý 1).",
          "Chuỗi regex bị tìm nguyên văn, kể cả các ký tự như <code>\\s+</code>. Trong file không có đoạn nào y như vậy, nên Edit vẫn báo không tìm thấy."
        ] }
    ],
    refs: [
      { label: "Bài 2.5, mục “Đã sửa 01/11”: Edit khớp nhiều chỗ thì kéo dài old_string, không khớp thì Read lại", href: NOTES + "#fix-3" },
      { label: "Bài 2.5, “Biết thêm”: replace_all đổi mọi chỗ khớp", href: NOTES + "#l-2-5" },
      { label: "Docs Tools reference, mục Edit tool behavior: khớp nguyên văn, lệch một khoảng trắng là trượt, replace_all để sửa hết", href: "https://code.claude.com/docs/en/tools-reference" }
    ]
  },
  {
    de: 7, n: 13, total: 60, sub: "5.2", subName: "Escalate và xử lý chỗ mơ hồ", scen: "S3",
    answer: "C",
    ask: "Users ask for reports by title. The document search tool often returns several hits that differ only in publisher and edition, and only the requester knows which one is meant. The agent takes the most recently added hit and sometimes analyzes the wrong report. Which fix is most reliable?",
    scene: [
      "Người dùng xin báo cáo theo tên. Tool tìm tài liệu hay trả về nhiều kết quả cùng tên, chỉ khác nhà xuất bản (publisher) và lần xuất bản (edition).",
      "Agent đang chọn kết quả mới thêm vào gần nhất, nên có lúc phân tích nhầm báo cáo.",
      "Chỗ khó: đề nói rõ chi tiết phân biệt chỉ người yêu cầu biết. Trong dữ liệu hệ thống không có gì cho biết họ muốn bản nào."
    ],
    asks: [
      "Sửa thế nào là chắc nhất?",
      "Tức là: khi có nhiều bản khớp, lấy thông tin phân biệt từ đâu để chọn đúng bản.",
      "Soi từng phương án: nó lấy thông tin từ người yêu cầu, hay vẫn đoán bằng thứ hệ thống tự có?"
    ],
    facts: [
      "Guide 5.2: tool trả nhiều kết quả khớp thì hỏi thêm định danh, không chọn theo heuristic (đoán theo dấu hiệu như “mới nhất”, “đầy đủ nhất”).",
      "Ở câu này, thông tin phân biệt nằm ở người yêu cầu. Mọi cách chọn tự động (xếp hạng, ví dụ mẫu, điểm tự tin) chỉ dùng được dữ liệu hệ thống thấy, nên vẫn là đoán.",
      "Self-reported confidence (điểm tự tin model tự chấm) hiệu chuẩn kém. Model có thể tự tin cao mà vẫn sai, nhất là khi không có bằng chứng để biết đúng sai.",
      "Few-shot (ví dụ mẫu trong prompt) dạy model một quy luật lặp lại. Ý định trong đầu người hỏi không phải quy luật học được."
    ],
    opts: [
      { k: "A", gist: "Put few-shot examples in the prompt showing which document to choose for common ambiguous title patterns.",
        why: [
          "Sai ở giả định: có quy luật để học (ý 4). Hai bản cùng tên khác edition, bản nào đúng là do người hỏi muốn gì, không do đặc điểm của tài liệu.",
          "Ví dụ chỉ dạy agent một cách đoán tinh vi hơn. Vẫn là heuristic (ý 1), vẫn có lúc phân tích nhầm."
        ] },
      { k: "B", gist: "Change the search tool to rank the hits and return only the single most likely document, so the agent never gets an ambiguous result.",
        why: [
          "Chỉ dời việc đoán từ agent vào tool. Xếp hạng kiểu gì cũng chỉ dùng được dữ liệu hệ thống có, mà thông tin phân biệt lại nằm ở người hỏi (ý 2).",
          "Tệ hơn: agent không còn thấy có nhiều bản, nên chọn sai cũng không ai hay.",
          "Dễ bị cuốn vì nghe như sửa tận gốc, ở tầng tool. Nhưng giấu chỗ mơ hồ đi không làm nó hết mơ hồ."
        ] },
      { k: "C", gist: "Tell the agent to ask the requester for a distinguishing detail, such as publisher or edition, whenever the search returns more than one match.",
        why: [
          "Đúng guide (ý 1): nhiều kết quả khớp thì hỏi thêm định danh.",
          "Người yêu cầu là người duy nhất biết bản nào (ý 2). Hỏi một câu là chọn đúng chắc chắn, đổi lại chỉ tốn thêm một lượt hỏi."
        ] },
      { k: "D", gist: "Have the agent rate its confidence in each candidate and go ahead on its own whenever the score clears a calibrated threshold.",
        why: [
          "Sai ở giả định: điểm tự tin của model đáng tin (ý 3). Bằng chứng để phân biệt không có trong dữ liệu, nên điểm cao cũng không có nghĩa là chọn đúng.",
          "“Calibrated threshold” (ngưỡng đã hiệu chuẩn) không cứu được: hiệu chuẩn cách nào thì hệ thống vẫn không biết người hỏi muốn edition nào (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 5.2, mục “Ba tình huống hay bị nhầm khi escalate”, đoạn cuối: nhiều kết quả khớp → hỏi thêm định danh", href: NOTES + "#fix-9" },
      { label: "Bài 5.2, khung định nghĩa “Self-reported confidence” và đoạn vì sao confidence tự báo không dùng làm ngưỡng", href: NOTES + "#l-5-2" },
      { label: "Cheatsheet D5: dòng “get_customer trả nhiều khách khớp” → hỏi thêm định danh", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 7, n: 14, total: 60, sub: "5.3", subName: "Báo lỗi giữa các agent", scen: "S3",
    answer: "B",
    ask: "The web-search subagent's search API times out now and then, and logs show most of these timeouts succeed on a quick retry. Right now every timeout is sent up to the coordinator, which re-delegates the search from scratch. How should error handling be split?",
    scene: [
      "API search của subagent web search thỉnh thoảng timeout (quá thời gian chờ). Log cho thấy phần lớn chỉ cần thử lại ngay là qua.",
      "Hiện giờ timeout nào cũng đẩy lên coordinator (agent điều phối), và coordinator giao lại việc search từ đầu.",
      "Chỗ khó: các phương án sai đều nghe như xử lý lỗi hợp lý: thử lại tới khi được, nuốt lỗi cho êm, hay gom hết quyết định về một chỗ."
    ],
    asks: [
      "Chia việc xử lý lỗi thế nào cho đúng?",
      "Tức là: lỗi nào subagent tự xử, lỗi nào đẩy lên, và đẩy lên thì kèm gì.",
      "Soi từng phương án: lỗi tạm thời có được thử lại đúng tầng, có giới hạn không? Lỗi không tự gỡ được có được báo thật, đủ thông tin không?"
    ],
    facts: [
      "Timeout là lỗi transient (tạm thời): thử lại sau một chút thường được. Subagent tự thử lại trước, có backoff (giãn cách tăng dần) và có giới hạn (1–2 lần), rồi mới đẩy lên những gì nó không tự gỡ được.",
      "Đẩy lên thì kèm structured error context (lỗi có cấu trúc): loại lỗi, query đã thử, kết quả một phần, hướng thay thế. Coordinator cần những thứ đó để quyết: đổi query, đổi nguồn, hay đi tiếp với kết quả một phần.",
      "Guide gọi tên các cách báo sai: nuốt lỗi (báo thành công khi việc chưa xong) và generic status (một chuỗi chung chung). Thử lại vô hạn cũng sai: nguồn sập lâu thì kẹt mãi.",
      "Subagent mới khởi động trống, không mang context của lần chạy trước. Giao lại từ đầu là làm lại mọi lần search đã xong."
    ],
    opts: [
      { k: "A", gist: "Have the subagent keep retrying the failed search until it succeeds, so the coordinator only ever gets complete result sets.",
        why: [
          "Thử lại ở subagent là đúng tầng, nhưng thử lại không giới hạn là sai (ý 1, ý 3).",
          "API search sập thật thì subagent kẹt mãi. Coordinator không nhận được gì để đổi nguồn hay đi tiếp với phần đã có.",
          "Dễ bị cuốn vì đề kể phần lớn timeout thử lại là qua. Nhưng “phần lớn” không phải “mọi lần”, nên vẫn cần giới hạn rồi báo lên."
        ] },
      { k: "B", gist: "Retry timed-out calls inside the subagent with backoff, and send unresolved failures to the coordinator along with the queries tried and any partial results.",
        why: [
          "Timeout là lỗi tạm thời, subagent thử lại có giãn cách ngay tại chỗ (ý 1). Phần lớn lần sẽ qua, coordinator không phải dính vào, việc search đang làm dở được giữ.",
          "Lần nào vẫn hỏng thì báo lên kèm query đã thử và kết quả một phần (ý 2). Coordinator đủ thông tin để đổi query, đổi nguồn, hay đi tiếp và ghi chú chỗ thiếu."
        ] },
      { k: "C", gist: "Catch every timeout inside the subagent and return whatever it has gathered so far as a successful result, so the workflow is never interrupted.",
        why: [
          "Đây là nuốt lỗi (ý 3): kết quả thiếu mà báo thành công.",
          "Coordinator không phân biệt được bộ kết quả đủ với bộ bị cắt. Báo cáo cuối trình bày phần thiếu như thể đã đủ, chỗ hổng không ai ghi chú."
        ] },
      { k: "D", gist: "Send each timeout to the coordinator immediately with the failed query and partial results attached, so all recovery decisions stay in one central place.",
        why: [
          "Báo có cấu trúc là đúng, nhưng đẩy cả lỗi tạm thời lên là sai tầng (ý 1).",
          "Mỗi lần đẩy lên, coordinator giao lại cho một subagent mới, mà subagent mới bắt đầu trống (ý 4). Việc search đã làm bị bỏ, trong khi thử lại tại chỗ vài giây là xong.",
          "Dễ bị cuốn vì gom quyết định về một chỗ nghe như thiết kế coordinator gọn gàng, lại có kèm partial results. Nhưng đề nói rõ phần lớn timeout thử lại là qua, nên lần nào cũng đẩy lên là phí."
        ] }
    ],
    refs: [
      { label: "Bài 5.3: subagent tự recover lỗi transient trước, rồi báo structured error context; các cách báo sai", href: NOTES + "#l-5-3" },
      { label: "Bài 2.2, bảng loại lỗi: timeout là transient, retry có backoff 1–2 lần rồi báo lên kèm partial results, không retry vô hạn", href: NOTES + "#l-2-2" },
      { label: "Cheatsheet D5: dòng “Subagent timeout, hỏi cách báo lên coordinator”", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 7, n: 15, total: 60, sub: "2.3", subName: "Chia tool cho agent và tool_choice", scen: "S3",
    answer: "BD",
    ask: "The report generator subagent holds the team's <code>web_search</code> MCP tool, whose description is only “searches the web for information”. Even with a prompt rule against searching, it runs searches instead of citing the findings the coordinator passes in. Which TWO changes fix this most directly? (Select TWO.)",
    scene: [
      "Subagent viết báo cáo (report generator) đang cầm tool MCP <code>web_search</code> của team. Description chỉ có một câu: “searches the web for information” (tìm thông tin trên web).",
      "Việc của nó là trích dẫn findings (kết quả nghiên cứu) coordinator đưa vào. Nhưng nó lại tự đi search.",
      "Chỗ khó: system prompt đã có luật cấm search, và luật đó không giữ được."
    ],
    asks: [
      "Hai thay đổi nào sửa chuyện này trực tiếp nhất?",
      "Tức là: đánh vào hai lý do làm tool bị gọi. Một là tool đang nằm trong tay agent. Hai là description mơ hồ, khớp với mọi yêu cầu kiểu “tìm thông tin”.",
      "Soi từng phương án: nó bỏ tool khỏi tay agent, làm rõ lúc không được dùng tool, hay chỉ dặn thêm và giới hạn số lần?"
    ],
    facts: [
      "Claude chọn tool dựa vào description. Description tối thiểu như “searches the web for information” khớp lỏng với hầu như mọi yêu cầu nghiên cứu. Description tốt nói rõ ranh giới, kể cả lúc KHÔNG được dùng.",
      "Scoped tool access: mỗi agent chỉ cầm tool đúng vai trò. Agent có tool ngoài chuyên môn thì sẽ dùng. Khai danh sách <code>tools</code> riêng cho subagent thì tool không có trong đó không gọi được.",
      "Luật trong prompt là xác suất: tool còn trong tay thì vẫn có lúc bị gọi. Đề kể luật đó đã thất bại.",
      "Giới hạn số lần gọi chỉ đếm số lần, không đổi việc model chọn tool nào."
    ],
    opts: [
      { k: "A", gist: "Keep <code>web_search</code> but cap it at one search per report, so an occasional lookup is still possible.",
        why: [
          "Sai ở giả định: vấn đề là search nhiều quá (ý 4). Vấn đề là có search hay không: báo cáo phải trích findings đã được kiểm, một lần search thôi cũng đưa nội dung web chưa kiểm vào.",
          "Tool vẫn trong tay, description vẫn mơ hồ, nên lần search đầu tiên vẫn xảy ra."
        ] },
      { k: "B", gist: "Define an explicit tools allowlist for the report generator that holds only its report-writing tools.",
        why: [
          "Bỏ <code>web_search</code> khỏi tay report generator (ý 2). Không có tool thì không search được, khỏi phải trông vào luật trong prompt (ý 3).",
          "Đây là chặn bằng cấu hình: gọi nhầm đổi từ “không nên” thành “không thể”."
        ] },
      { k: "C", gist: "Repeat the citation-only rule at the top of the system prompt and again in every delegation prompt.",
        why: [
          "Vẫn là lời dặn (ý 3), chỉ nhắc nhiều lần hơn. Đề kể luật cấm search đã có mà không giữ được.",
          "Tool vẫn trong tay và description vẫn mơ hồ, nên cả hai lý do làm tool bị gọi còn nguyên.",
          "Dễ bị cuốn vì nhắc ở hai chỗ nghe như chắc hơn. Nhưng nhắc bao nhiêu lần thì vẫn là xác suất."
        ] },
      { k: "D", gist: "Rewrite the <code>web_search</code> description to say when it should not be used, for instance when findings have already been supplied.",
        why: [
          "Sửa lý do thứ hai: description một câu khớp với mọi yêu cầu kiểu nghiên cứu (ý 1). Ghi rõ “không dùng khi đã có findings” thì Claude chọn tool chính xác hơn.",
          "Ở chỗ nào tool này còn được cấp, như subagent search, description rõ ranh giới giúp nó được gọi đúng lúc.",
          "Một mình D chưa bảo đảm, vì description vẫn là tín hiệu cho model đọc. Đi cùng B thì đủ: B chặn hẳn ở report generator, D sửa gốc mơ hồ của chính tool."
        ] }
    ],
    refs: [
      { label: "Bài 2.1: description là cơ chế chính để chọn tool; description tốt có ranh giới “Do NOT use”", href: NOTES + "#l-2-1" },
      { label: "Bài 2.3: scoped tool access, agent có tool ngoài chuyên môn thì sẽ dùng", href: NOTES + "#l-2-3" },
      { label: "Bài 1.4 “Quy tắc bắt buộc thì đừng nhờ prompt”: vì sao C không đủ", href: NOTES + "#l-1-4" }
    ]
  },
  {
    de: 7, n: 16, total: 60, sub: "1.5", subName: "Hook của Agent SDK: chặn tool call và chuẩn hóa dữ liệu", scen: "S3",
    answer: "B",
    ask: "A PostToolUse hook turns the numeric status codes returned by a third-party MCP tool into readable labels, but to keep latency down it returns its result asynchronously. Logs show the hook fires on every call and computes the right conversions, yet the model still receives the raw codes. What should the team change?",
    scene: [
      "Một MCP tool bên thứ ba trả mã trạng thái dạng số. Team viết hook <code>PostToolUse</code> đổi mã đó thành nhãn dễ đọc.",
      "Để đỡ độ trễ, hook trả kết quả kiểu async (bất đồng bộ: chạy nền, không bắt agent chờ).",
      "Log cho thấy hook chạy ở mọi lần gọi và đổi đúng. Vậy mà model vẫn nhận mã số thô.",
      "Chỗ khó: hook không hỏng, matcher không sai, phép đổi không sai. Lỗi nằm ở lúc kết quả của hook về tới nơi."
    ],
    asks: [
      "Team nên đổi gì?",
      "Tức là: làm sao cho bản đã đổi nhãn thay được kết quả gốc trước khi model đọc.",
      "Soi từng phương án: nó sửa đúng chỗ hỏng (lúc hook trả kết quả) không, hay sửa một chỗ log đã cho thấy là ổn?"
    ],
    facts: [
      "<code>PostToolUse</code> chạy sau khi tool trả kết quả, trước khi Claude đọc. Hook thay hẳn kết quả bằng <code>updatedToolOutput</code> (trường cũ <code>updatedMCPToolOutput</code> chỉ dùng cho tool MCP).",
      "Mặc định agent chờ hook trả về rồi mới đi tiếp. Hook trả async thì agent đi tiếp ngay. Docs ghi: output async không chặn, không sửa, không chèn được gì vào thao tác, vì agent đã đi qua rồi. Chỉ dùng cho việc phụ như ghi log.",
      "<code>decision: \"block\"</code> ở PostToolUse chỉ đặt <code>reason</code> cạnh kết quả tool. Claude vẫn thấy output gốc. Muốn thay thì dùng <code>updatedToolOutput</code>.",
      "<code>PreToolUse</code> với <code>updatedInput</code> sửa tham số trước khi tool chạy, không đụng tới thứ tool trả về. Tên tool MCP trong matcher có dạng <code>mcp__server__tool</code>."
    ],
    opts: [
      { k: "A", gist: "Rewrite the hook matcher with the tool's full <code>mcp__SERVER__TOOL</code> name so the hook matches the MCP tool's calls.",
        why: [
          "Tên đầy đủ <code>mcp__server__tool</code> là đúng cách viết matcher (ý 4), nhưng sửa nhầm chỗ.",
          "Log đã cho thấy hook chạy ở mọi lần gọi, tức matcher đang khớp. Đổi tên matcher không làm kết quả async về kịp."
        ] },
      { k: "B", gist: "Make the hook finish the conversion and return the replacement output synchronously, before the agent moves on.",
        why: [
          "Hook trả đồng bộ thì agent chờ (ý 2). Bản đã đổi nhãn thay kết quả gốc qua <code>updatedToolOutput</code> trước khi model đọc (ý 1).",
          "Đúng chỗ hỏng: phép đổi vốn đã đúng, chỉ thiếu việc chờ nó xong. Tốn thêm chút độ trễ, đổi lại model nhận đúng dữ liệu đã chuẩn hóa."
        ] },
      { k: "C", gist: "Return a block decision whose reason lists the converted labels, so the correction shows up next to the tool result.",
        why: [
          "Sai ở giả định: block ở PostToolUse thay được kết quả (ý 3). Nó chỉ đặt lý do cạnh kết quả, model vẫn thấy mã số gốc.",
          "Model nhận cả mã thô lẫn nhãn đặt cạnh nhau, phải tự ghép. Đó đúng là việc quy đổi mà hook sinh ra để làm thay.",
          "Dễ bị cuốn vì nhãn đã đổi cũng tới được model. Nhưng tới dưới dạng ghi chú kèm theo, không phải một kết quả đã chuẩn hóa."
        ] },
      { k: "D", gist: "Move the conversion into a PreToolUse hook that rewrites the tool arguments with <code>updatedInput</code>, so the tool runs with corrected values.",
        why: [
          "Sai chỗ: <code>updatedInput</code> sửa thứ đi vào tool (ý 4), còn vấn đề nằm ở thứ tool trả ra.",
          "Server bên thứ ba vẫn trả mã số, tham số đầu vào đổi thế nào cũng vậy."
        ] }
    ],
    refs: [
      { label: "Bài 1.5, “Biết thêm”: updatedToolOutput thay hẳn kết quả, additionalContext chỉ nối thêm; quy tắc chuẩn hóa dữ liệu vào ở PostToolUse", href: NOTES + "#l-1-5" },
      { label: "Docs Agent SDK “Intercept and control agent behavior with hooks”, mục Asynchronous output: output async không chặn, không sửa, không chèn context", href: "https://code.claude.com/docs/en/agent-sdk/hooks" },
      { label: "Docs Hooks reference, mục PostToolUse decision control: block chỉ đặt reason cạnh kết quả, Claude vẫn thấy output gốc", href: "https://code.claude.com/docs/en/hooks" }
    ]
  },
  {
    de: 7, n: 17, total: 60, sub: "3.5", subName: "Tinh chỉnh lặp: ví dụ input/output, test trước, interview", scen: "S2",
    answer: "D",
    ask: "When Claude implements a username-normalization function from a written spec, it often gets the edge cases wrong, and reviewers miss those bugs in the diffs. The team wants Claude to verify its own work before it presents the code. Which approach works best?",
    scene: [
      "Claude Code viết hàm chuẩn hóa username (đưa tên đăng nhập về một dạng thống nhất) theo spec viết bằng lời.",
      "Edge case (trường hợp biên) hay bị xử lý sai, và người review đọc diff cũng bỏ sót.",
      "Chỗ khó: đề đòi Claude “check its own work” (tự kiểm việc của mình) trước khi đưa code ra. Không chỉ là hiểu spec rõ hơn, mà phải có thứ để kiểm."
    ],
    asks: [
      "Cách nào hiệu quả nhất?",
      "Tức là: cho Claude một thứ chạy được để tự biết code đúng hay sai, trước khi code tới tay người review.",
      "Soi từng phương án: nó chỉ giúp Claude hiểu yêu cầu trước khi viết, hay cho Claude kiểm được code sau khi viết?"
    ],
    facts: [
      "Test-driven iteration: viết test trước, có input và kết quả mong đợi cho các edge case. “Xong” nghĩa là test xanh. Claude chạy test, thấy đỏ thì tự sửa.",
      "Ví dụ input/output trong prompt cho Claude thấy phép biến đổi, giúp hiểu đúng hơn. Nhưng không có gì để chạy, nên không kiểm được code đã viết.",
      "Plan mode để duyệt hướng làm trước khi viết code. Kế hoạch đúng không bảo đảm code viết ra khớp kế hoạch.",
      "Interview pattern: Claude hỏi lại bạn trước khi code, để lộ các quyết định chưa ai nghĩ tới. Hợp khi chính yêu cầu còn mờ."
    ],
    opts: [
      { k: "A", gist: "Put several input/output example pairs for the edge cases into the prompt, so Claude sees the expected transformations before coding.",
        why: [
          "Chạy được, và có thể làm Claude xử lý edge case ổn hơn (ý 2).",
          "Nhưng ví dụ chỉ để đọc, không để chạy. Claude vẫn không có cách tự kiểm code trước khi đưa ra, lỗi vẫn dồn về người review.",
          "Dễ bị cuốn vì ví dụ input/output đúng là kỹ thuật của bài 3.5, lại nhắm đúng edge case. Nhưng đề đòi tự kiểm. Cùng các cặp đó viết thành test thì mới kiểm được."
        ] },
      { k: "B", gist: "Run the task in plan mode so Claude sets out its edge-case handling as a plan the team reviews before any code is written.",
        why: [
          "Sai công cụ: plan mode duyệt hướng làm (ý 3), còn lỗi nằm ở code viết ra.",
          "Kế hoạch duyệt xong thì code vẫn có thể lệch kế hoạch. Vẫn trông vào người review, mà người review đang bỏ sót."
        ] },
      { k: "C", gist: "Use the interview pattern, having Claude ask clarifying questions about edge-case handling before it implements the function.",
        why: [
          "Interview làm rõ yêu cầu trước khi code (ý 4). Ở đây spec đã có, chỗ hỏng là code xử lý sai.",
          "Hỏi xong thì vẫn không có gì kiểm code đã viết, edge case sai vẫn lọt."
        ] },
      { k: "D", gist: "First write a test file of sample inputs and expected outputs for the edge cases, then have Claude run it and fix any failures.",
        why: [
          "Đúng test-driven iteration (ý 1). Mỗi edge case thành một test có input và kết quả mong đợi.",
          "Claude viết code, chạy test, thấy đỏ thì tự sửa. Lỗi edge case bị bắt trước khi tới tay người review, đúng điều team muốn.",
          "Test vừa nói rõ yêu cầu như ví dụ mẫu, vừa chạy được để kiểm. Phương án A chỉ làm được nửa đầu."
        ] }
    ],
    refs: [
      { label: "Bài 3.5: định nghĩa test-driven iteration và bảng chọn kỹ thuật (ví dụ, test, interview)", href: NOTES + "#l-3-5" },
      { label: "Bài 3.4: plan mode dùng để chọn hướng làm, không kiểm code", href: NOTES + "#l-3-4" },
      { label: "Docs Claude Code best practices: cho Claude cách tự kiểm việc của nó bằng test", href: "https://code.claude.com/docs/en/best-practices" }
    ]
  },
  {
    de: 7, n: 18, total: 60, sub: "5.3", subName: "Báo lỗi giữa các agent", scen: "S2",
    answer: "D",
    ask: "The team hands documentation searches to a subagent because the verbose results were filling up the main context window. When a search yields nothing usable, the subagent's final report says only “search unavailable”, although the real outcomes include rate limits and valid queries that simply matched nothing. What should you change?",
    scene: [
      "Team giao việc tìm tài liệu cho subagent, vì kết quả search dài dòng làm đầy context của phiên chính.",
      "Search không ra gì dùng được thì báo cáo cuối của subagent chỉ ghi “search unavailable” (không search được).",
      "Thực tế là nhiều chuyện khác nhau: có lần bị rate limit (vượt giới hạn số request), có lần query hợp lệ nhưng thật sự không khớp gì.",
      "Chỗ khó: phiên chính chỉ thấy một nhãn chung, không biết nên thử lại, đổi query, hay đi tiếp."
    ],
    asks: [
      "Nên đổi gì?",
      "Tức là: làm sao cho phiên chính biết đúng chuyện gì đã xảy ra, mà vẫn giữ lợi ích của việc giao cho subagent.",
      "Soi từng phương án: nó thêm thông tin vào báo cáo, bỏ lợi ích của subagent, hay giấu lỗi đi?"
    ],
    facts: [
      "Subagent chạy trong context riêng. Kết quả tool dài ở lại bên đó, phiên chính chỉ nhận báo cáo cuối. Thứ gì không nằm trong báo cáo thì phiên chính không thấy.",
      "Structured error context (lỗi có cấu trúc): loại lỗi, query đã thử, kết quả một phần, hướng thay thế. Mỗi thứ dẫn tới một cách xử lý khác.",
      "Access failure (không truy cập được, như rate limit) khác valid empty result (query chạy xong, thật sự không khớp gì). Rate limit thì chờ rồi thử lại được. Không khớp thì thử lại y hệt là vô ích, phải đổi query hoặc chấp nhận không có.",
      "Guide gọi tên hai cách báo sai: generic status (một nhãn chung giấu hết context) và nuốt lỗi (báo xong khi việc chưa xong)."
    ],
    opts: [
      { k: "A", gist: "Run the documentation searches in the main conversation instead, so every error detail shows up there as it happens.",
        why: [
          "Chạy được: lỗi hiện thẳng trong phiên chính.",
          "Nhưng kéo lại đúng vấn đề team đã tránh: kết quả search dài dòng lại làm đầy context phiên chính (ý 1).",
          "Dễ bị cuốn vì nó làm lỗi hiện rõ ngay. Nhưng chỗ hỏng là báo cáo thiếu thông tin, sửa báo cáo là đủ, không cần bỏ cả subagent."
        ] },
      { k: "B", gist: "Have the main conversation re-spawn the subagent with the same task whenever a report says the search is unavailable.",
        why: [
          "Sai ở giả định: lần nào cũng là lỗi tạm thời, thử lại là qua (ý 3).",
          "Query không khớp gì thì chạy lại y hệt vẫn không khớp. Vừa bị rate limit mà chạy lại ngay thì dễ bị chặn tiếp. Thử lại mù vì báo cáo vẫn giấu loại lỗi (ý 4)."
        ] },
      { k: "C", gist: "Have the subagent report failed searches as complete with empty findings, so the main conversation keeps going without stopping.",
        why: [
          "Đây là nuốt lỗi (ý 4): search hỏng bị báo thành search xong, không có gì.",
          "Phiên chính lẫn access failure với valid empty result (ý 3). Nó kết luận “không có tài liệu” trong khi thật ra chưa search được."
        ] },
      { k: "D", gist: "Update the subagent's instructions so its final report states the failure type, the queries attempted, and any partial findings.",
        why: [
          "Phiên chính chỉ thấy báo cáo cuối (ý 1), nên thông tin để xử lý lỗi phải nằm trong đó.",
          "Loại lỗi, query đã thử, phần tìm được (ý 2) cho phiên chính chọn đúng: rate limit thì chờ rồi thử lại, không khớp thì đổi query, có phần nào thì đi tiếp với phần đó (ý 3).",
          "Search vẫn chạy trong subagent, context phiên chính vẫn gọn."
        ] }
    ],
    refs: [
      { label: "Bài 5.3: structured error context; generic status và nuốt lỗi là hai cách báo sai", href: NOTES + "#l-5-3" },
      { label: "Bài 5.4, khung định nghĩa “Subagent delegation”: output dài ở lại trong subagent, phiên chính chỉ nhận bản tóm tắt", href: NOTES + "#l-5-4" },
      { label: "Cheatsheet D5: error object và access failure khác valid empty result", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 7, n: 19, total: 60, sub: "5.4", subName: "Quản lý context khi khám phá codebase lớn", scen: "S2",
    answer: "D",
    ask: "During a long refactoring session, Claude Code correctly ties each legacy behavior to its file and line. After <code>/compact</code>, it attributes behaviors to the wrong files. Teammates who open new sessions also need these exact file-and-line locations. Which change works best?",
    scene: [
      "Phiên refactor dài. Ban đầu Claude Code chỉ đúng file và dòng của từng hành vi legacy (hành vi của code cũ).",
      "Sau <code>/compact</code> (nén lịch sử phiên thành bản tóm tắt), nó gắn hành vi vào nhầm file.",
      "Chỗ khó: có hai yêu cầu. Vị trí phải còn đúng sau compact, và đồng nghiệp mở phiên mới cũng phải đọc được đúng file, dòng đó."
    ],
    asks: [
      "Đổi gì là tốt nhất?",
      "Tức là: để cặp “hành vi → file:dòng” ở đâu cho nó không mất khi compact, và người khác ở phiên khác cũng đọc được.",
      "Soi từng phương án: thông tin còn nằm trong bản tóm tắt của một phiên, hay đã ra ngoài cuộc hội thoại?"
    ],
    facts: [
      "Compact là nén có mất mát. Bản tóm tắt giữ ý chính, nhưng chi tiết chính xác như path, số dòng dễ rơi. Model sau đó đoán lại vị trí, và đoán sai mà vẫn rất cụ thể.",
      "Scratchpad file: file ghi chú agent tự viết findings vào và đọc lại khi cần. Nó nằm trên đĩa nên không mất khi context bị nén, phiên nào cũng đọc được. Entry phải cụ thể: tên class, path, số dòng.",
      "<code>/compact</code> nhận lời dặn (vd <code>/compact focus on …</code>) để giữ thứ bạn chọn. Nhưng bản tóm tắt chỉ sống trong phiên đó.",
      "CLAUDE.md nạp ở mọi phiên, nhưng là chỉ dẫn chung cho project (quy ước, cấu trúc), không phải phát hiện của một phiên làm việc."
    ],
    opts: [
      { k: "A", gist: "Run <code>/compact</code> earlier and more often, so each summary condenses fewer turns and keeps more of the session's detail.",
        why: [
          "Sai ở giả định: lỗi do mỗi lần tóm quá nhiều lượt. Lỗi là do vị trí chỉ sống trong phần bị tóm (ý 1).",
          "Compact nhiều lần hơn là thêm nhiều lần nén có mất mát, không phải ít đi. Đồng nghiệp ở phiên mới cũng không thấy gì."
        ] },
      { k: "B", gist: "Add the repository's module layout and key file paths to the project CLAUDE.md, so file guidance stays loaded after compaction.",
        why: [
          "CLAUDE.md đúng là còn sau compact và nạp ở mọi phiên (ý 4).",
          "Nhưng thứ bị mất là cặp “hành vi → file:dòng” tìm ra trong phiên này. Sơ đồ module chung không cho biết hành vi nào nằm ở dòng nào.",
          "Dễ bị cuốn vì nó thỏa cả hai yêu cầu về chỗ để: qua được compact, qua được phiên mới. Nhưng nội dung đưa vào lại không phải thứ cần giữ."
        ] },
      { k: "C", gist: "Give <code>/compact</code> explicit instructions so every summary keeps each behavior's file path and line number.",
        why: [
          "Có ích trong phiên này: bản tóm tắt giữ được nhiều vị trí hơn (ý 3).",
          "Nhưng bản tóm tắt chỉ sống trong phiên đó. Đồng nghiệp mở phiên mới không nhận được, nên vẫn thiếu đúng chỗ đề đòi.",
          "Dễ bị cuốn vì nó sửa thẳng lỗi sau compact. Nhưng đề có hai yêu cầu, C chỉ lo được một."
        ] },
      { k: "D", gist: "Have Claude record each behavior's file path and line in a scratchpad file as it works, and read that file from any session.",
        why: [
          "Vị trí được ghi ra file trên đĩa ngay lúc tìm thấy (ý 2). Compact không đụng tới file, nên sau compact Claude đọc lại là có đúng file, dòng.",
          "File nằm ngoài cuộc hội thoại, nên đồng nghiệp mở phiên mới cũng đọc được. Thỏa cả hai yêu cầu.",
          "Nhớ đọc lại file trước khi trả lời câu cần vị trí cũ. Ghi mà không đọc thì vẫn trả lời bằng trí nhớ đã hỏng."
        ] }
    ],
    refs: [
      { label: "Bài 5.4, khung định nghĩa và “Biết thêm”: scratchpad file nằm trên đĩa, phải đọc lại; /compact focus giữ thứ bạn chọn", href: NOTES + "#l-5-4" },
      { label: "Bài 5.0, bảng cách làm: khối cấu trúc riêng (case facts, scratchpad file, manifest) giữ chi tiết ngoài phần bị nén", href: NOTES + "#l-5-0" }
    ]
  },
  {
    de: 7, n: 20, total: 60, sub: "3.6", subName: "Đưa Claude Code vào CI/CD", scen: "S2",
    answer: "D",
    ask: "Your CI review job calls <code>claude -p</code> with <code>--output-format json</code> and <code>--json-schema</code>. Once in a while a run reports subtype <code>success</code> but carries no <code>structured_output</code> field, and the posting step crashes. How should the pipeline check each result before it posts?",
    scene: [
      "Job review trong CI chạy <code>claude -p</code> với <code>--output-format json</code> và <code>--json-schema</code>, rồi bước sau đăng kết quả lên.",
      "Thỉnh thoảng có lần chạy báo subtype <code>success</code> (thành công) mà không có trường <code>structured_output</code>. Bước đăng crash vì thiếu trường.",
      "Chỗ khó: “success” và “có dữ liệu đúng schema” là hai chuyện riêng. Run thành công vẫn có thể không ra dữ liệu."
    ],
    asks: [
      "Pipeline nên kiểm mỗi kết quả thế nào trước khi đăng?",
      "Tức là: dựa vào dấu hiệu nào để biết chắc lần chạy này có dữ liệu đúng schema mà dùng.",
      "Soi từng phương án: dấu hiệu nó dùng có bắt được ca “success mà không có structured_output” không?"
    ],
    facts: [
      "Với <code>--output-format json</code>, câu trả lời dạng text nằm ở <code>result</code>. Có <code>--json-schema</code> thì dữ liệu đúng schema nằm ở <code>structured_output</code>. <code>result</code> là text, không được kiểm theo schema.",
      "Docs: run kết thúc mà không có structured output hợp lệ (vd Claude từ chối yêu cầu) thì response không có trường <code>structured_output</code>. Script phải kiểm trường đó có mặt rồi mới dùng.",
      "Ví dụ trong docs Agent SDK chỉ coi là thành công khi <code>subtype</code> là <code>success</code> <b>và</b> có <code>structured_output</code>. Mọi trường hợp khác xử lý như lỗi.",
      "Claude Code thoát mã 0 khi run thành công, khác 0 khi run lỗi. <code>stream-json</code> chỉ đổi cách giao output thành từng dòng sự kiện."
    ],
    opts: [
      { k: "A", gist: "When <code>structured_output</code> is missing, fall back to parsing the <code>result</code> field, since it holds the text answer.",
        why: [
          "Sai ở giả định: <code>result</code> thay được <code>structured_output</code>. <code>result</code> là text, không được kiểm theo schema (ý 1).",
          "Bước đăng nhận văn xuôi tự do thay vì dữ liệu đúng hình. Parse được thì dễ đăng nội dung sai, parse không được thì lại crash."
        ] },
      { k: "B", gist: "Switch to <code>--output-format stream-json</code> so the schema gets checked on each event as it arrives.",
        why: [
          "Sai ở giả định: <code>stream-json</code> kiểm schema từng sự kiện. Nó chỉ đổi cách giao output thành luồng sự kiện (ý 4).",
          "Lần chạy không ra structured output thì stream cũng không có, bước đăng vẫn gặp đúng ca cũ."
        ] },
      { k: "C", gist: "Branch on the CLI process's exit code, because Claude Code exits non-zero when a run fails.",
        why: [
          "Mã thoát bắt được run lỗi (ý 4). Nhưng ca này run báo <code>success</code>, tức run thành công, nên mã thoát là 0.",
          "Pipeline đi thẳng qua bước kiểm rồi crash ở bước đăng, y như hiện giờ.",
          "Dễ bị cuốn vì kiểm mã thoát là phản xạ chuẩn trong script CI, và câu “exits non-zero when a run fails” (thoát mã khác 0 khi run lỗi) là đúng. Nhưng đề kể ca run không lỗi mà vẫn thiếu dữ liệu."
        ] },
      { k: "D", gist: "Accept a run only when its <code>subtype</code> is <code>success</code> and its <code>structured_output</code> field is present as well.",
        why: [
          "Kiểm cả hai điều kiện, đúng mẫu trong docs (ý 3). Thiếu <code>structured_output</code> thì coi là lỗi, dù subtype là success (ý 2).",
          "Bước đăng chỉ nhận dữ liệu đúng schema. Ca thiếu dữ liệu làm job fail rõ ràng, thay vì crash giữa chừng hay đăng bừa."
        ] }
    ],
    refs: [
      { label: "Bài 3.6, “Biết thêm”: đọc output đúng trường, .result và .structured_output", href: NOTES + "#l-3-6" },
      { label: "Docs “Run Claude Code programmatically”, mục Get structured output: không có structured output hợp lệ thì không có trường structured_output, kiểm trước khi dùng", href: "https://code.claude.com/docs/en/headless" },
      { label: "Docs Agent SDK “Get structured output from agents”, mục Error handling: success mà không có structured_output cũng coi là lỗi", href: "https://code.claude.com/docs/en/agent-sdk/structured-outputs" }
    ]
  },
  {
    de: 7, n: 21, total: 60, sub: "5.2", subName: "Escalate và xử lý chỗ mơ hồ", scen: "S2",
    answer: "B",
    ask: "While refactoring, Claude Code stops to ask the team about trivial renames, yet it changes public API signatures without asking. Both kinds of edit go through the same tools on the same files. The only line in CLAUDE.md is “check before risky changes.” Which change works best?",
    scene: [
      "Trong lúc refactor, Claude Code dừng lại hỏi team cả những lần đổi tên vặt, nhưng lại tự sửa chữ ký (signature) của public API mà không hỏi.",
      "CLAUDE.md chỉ có đúng một dòng: “check before risky changes” (kiểm trước khi sửa chỗ rủi ro).",
      "Chỗ khó: lỗi đi theo hai chiều, hỏi thừa ở việc vặt và hỏi thiếu ở việc lớn. Đề còn chốt một dữ kiện: hai loại sửa dùng cùng tool, trên cùng file."
    ],
    asks: [
      "Thay đổi nào hiệu quả nhất?",
      "Tức là: làm sao để Claude phân biệt được lúc nào cứ làm, lúc nào phải dừng hỏi.",
      "Soi từng phương án: nó có cho Claude biết “risky” (rủi ro) là gì không? Nếu là cơ chế chặn, nó có tách được hai loại sửa không?"
    ],
    facts: [
      "Sai hai chiều (hỏi thừa ca dễ, bỏ qua ca khó) là dấu hiệu agent không có ranh giới quyết định rõ, nên nó đoán. Cách sửa của guide: viết tiêu chí tường minh, kèm few-shot (vài ví dụ mẫu) cho thấy ca nào tự làm, ca nào phải hỏi.",
      "Chữ chung chung như “risky” hay “conservative” không có định nghĩa. Claude làm tốt việc xếp một thay đổi vào loại đã liệt kê sẵn, làm kém việc đoán một ngưỡng mơ hồ.",
      "Viết IMPORTANT hay đưa lên đầu file chỉ làm một dòng nổi hơn. Docs Best practices ghi: Claude cứ lờ một dòng trong CLAUDE.md thì thêm IMPORTANT “probably won't fix it” (chắc là không sửa được).",
      "Hook <code>PreToolUse</code> chặn chắc chắn, nhưng chỉ dựa được vào thứ code kiểm được: tên tool, đường dẫn file, mẫu lệnh. Docs gọi hook là chỗ cho luật “with zero exceptions” (không có ngoại lệ). Nó không hiểu một thay đổi có nghĩa gì với code."
    ],
    opts: [
      { k: "A", gist: "Put the rule at the top of CLAUDE.md and label it IMPORTANT so it stands out from the surrounding guidance.",
        why: [
          "Sai chỗ bệnh: luật không bị lờ đi. Nó bị hiểu mỗi lần một kiểu, vì “risky” chưa được định nghĩa (ý 2).",
          "Làm nổi một chữ mơ hồ thì Claude vẫn phải tự đoán chữ đó (ý 3). Đoán sai thì vẫn sai cả hai chiều như cũ."
        ] },
      { k: "B", gist: "Replace the rule with explicit criteria naming which kinds of change need confirmation, plus contrasting few-shot examples: one case to proceed, one case to ask.",
        why: [
          "Đúng cách sửa của guide cho lỗi hai chiều: tiêu chí tường minh cộng few-shot (ý 1).",
          "Tiêu chí liệt kê theo loại thay đổi. Ví dụ minh họa: đổi tên nội bộ, format thì cứ làm; đổi chữ ký public API, xóa file dùng chung thì hỏi. Claude chỉ còn việc xếp thay đổi vào loại (ý 2).",
          "Hai ví dụ đối nhau, một ca làm luôn và một ca dừng hỏi, dạy đúng đường ranh giới. Sửa được cả hỏi thừa lẫn hỏi thiếu."
        ] },
      { k: "C", gist: "Make plan mode mandatory for every refactoring task, so the team reviews each change set before Claude Code edits anything.",
        why: [
          "Chạy được theo nghĩa không còn sửa API lén nữa, vì cái gì cũng phải duyệt.",
          "Nhưng làm tệ hơn chiều còn lại: team đang khó chịu vì bị hỏi việc vặt, giờ đổi tên một biến cũng phải duyệt kế hoạch. Plan mode hợp với thay đổi lớn, nhiều cách làm, không phải mọi lần refactor.",
          "Claude cũng không học được gì về chỗ nào rủi ro. Bỏ plan mode ra là lại như cũ."
        ] },
      { k: "D", gist: "Add a <code>PreToolUse</code> hook that requires approval for Edit and Write calls on a list of risky file paths, so risky edits are blocked deterministically.",
        why: [
          "Sai ở giả định: có một danh sách đường dẫn tách được chỗ rủi ro. Đề đã chốt hai loại sửa dùng cùng tool, trên cùng file (ý 4).",
          "File nào vào danh sách thì đổi tên vặt trong file đó cũng bị chặn. File nào không vào thì sửa API trong file đó vẫn lọt.",
          "Dễ bị cuốn vì hook là cơ chế chắc chắn, và nhiều câu khác (chặn push lên main chẳng hạn) đáp án đúng là hook. Nhưng hook cần một điều kiện code kiểm được. Ở đây ranh giới nằm ở nghĩa của thay đổi, nên thuộc về prompt."
        ] }
    ],
    refs: [
      { label: "Bài 5.2, mục “Chuyện gì đang xảy ra”: không có ranh giới quyết định thì agent đoán sai cả hai chiều; sửa bằng tiêu chí tường minh kèm few-shot", href: NOTES + "#l-5-2" },
      { label: "Bài 4.1: chữ chung chung như “be conservative” không phải tiêu chí; liệt kê loại cần báo, loại bỏ qua", href: NOTES + "#l-4-1" },
      { label: "Docs Best practices: thêm IMPORTANT vào dòng bị lờ chắc không sửa được; hook dành cho luật không có ngoại lệ", href: "https://code.claude.com/docs/en/best-practices" }
    ]
  },
  {
    de: 7, n: 22, total: 60, sub: "3.1", subName: "Cấp của CLAUDE.md và chia sẻ cho team", scen: "S2",
    answer: "D",
    ask: "A CI review job calls <code>claude -p</code>, but its findings don't follow the team's review criteria. Right now those criteria exist only in a few developers' personal <code>~/.claude/CLAUDE.md</code> files. Which change makes the criteria apply both to CI runs and to every teammate's local sessions?",
    scene: [
      "Job review trong CI chạy <code>claude -p</code> (chế độ không tương tác). Finding nó đưa ra không theo tiêu chí review của team.",
      "Tiêu chí đó đang nằm trong <code>~/.claude/CLAUDE.md</code> cá nhân của vài dev.",
      "Chỗ khó: đề đòi một thay đổi lo cả hai nơi, CI và phiên local của mọi người. Vài phương án chỉ lo được một nơi."
    ],
    asks: [
      "Thay đổi nào áp tiêu chí cho cả CI lẫn phiên local của mọi người trong team?",
      "Tức là: đặt tiêu chí ở đâu để máy nào chạy Claude Code trong repo này cũng nạp được.",
      "Soi từng phương án: nó có đi theo git không, có tới được cả CI lẫn máy dev không, và chỗ đặt đó có phải chỗ cho chỉ dẫn không?"
    ],
    facts: [
      "CLAUDE.md cấp user (<code>~/.claude/CLAUDE.md</code>) nằm trong home của từng người, không đi theo git. CLAUDE.md cấp project (<code>./CLAUDE.md</code> hoặc <code>./.claude/CLAUDE.md</code>) commit cùng code, ai clone cũng có.",
      "Claude trong CI không biết gì về project ngoài những gì nằm trong repo. Notes gọi CLAUDE.md là kênh đưa context cho CI: chuẩn test, fixture, tiêu chí review.",
      "<code>settings.json</code> là thiết lập: quyền dùng tool, hook, biến môi trường. Chương trình Claude Code đọc và thi hành, còn nội dung không đi vào context của Claude."
    ],
    opts: [
      { k: "A", gist: "Write the review criteria into the committed <code>.claude/settings.json</code>, since Claude Code reads that file in CI and in local sessions alike.",
        why: [
          "Đúng là file này đi theo git, và cả CI lẫn máy dev đều đọc.",
          "Nhưng sai chỗ: <code>settings.json</code> chứa quyền, hook, biến môi trường, và nội dung không vào context của Claude (ý 3). Tiêu chí viết bằng lời đặt ở đây thì Claude không bao giờ thấy.",
          "Dễ bị cuốn vì nó thỏa vế “dùng chung, có trong repo”. Nhưng chỉ dẫn cho Claude đọc phải nằm ở CLAUDE.md, rule hoặc skill."
        ] },
      { k: "B", gist: "Put the review criteria into the prompt string that the CI workflow passes to <code>claude -p</code>, so every automated review receives them.",
        why: [
          "Chạy được cho CI: mọi lần review tự động đều nhận tiêu chí.",
          "Nhưng prompt nằm trong file workflow, không tới phiên local của ai (ý 1). Đề đòi một thay đổi lo cả hai nơi.",
          "Tiêu chí còn bị tách thành hai bản, một trong workflow, một trên máy vài dev. Sửa chỗ này dễ quên chỗ kia."
        ] },
      { k: "C", gist: "During the workflow's setup step, copy the criteria into <code>~/.claude/CLAUDE.md</code> on the CI runner so the job loads them.",
        why: [
          "Chạy được cho CI: job đọc file cấp user trên máy runner.",
          "Máy dev khác vẫn không có gì, vì file cấp user không đi theo git (ý 1). Chỉ lo được một nơi.",
          "Lại thêm một bản chép phải giữ đồng bộ. Tiêu chí đổi mà quên sửa bước setup thì CI chạy theo bản cũ."
        ] },
      { k: "D", gist: "Move the review criteria into a CLAUDE.md at the repository root, so every run loads them from version control.",
        why: [
          "CLAUDE.md ở gốc repo là cấp project, commit cùng code (ý 1). Ai clone cũng có, runner CI checkout repo cũng có.",
          "Claude Code nạp file này lúc khởi động, kể cả lần chạy <code>claude -p</code> trong CI (ý 2). CI và phiên local đọc cùng một bản.",
          "Một chỗ, một bản. Sửa tiêu chí một lần là mọi nơi theo."
        ] }
    ],
    refs: [
      { label: "Bài 3.1, mục “Chuyện gì đang xảy ra”: bảng ba cấp CLAUDE.md và ai thấy cấp nào", href: NOTES + "#l-3-1" },
      { label: "Bài 3.6, mục “Claude trong CI biết gì về project của bạn?”: CLAUDE.md là kênh đưa context cho CI", href: NOTES + "#l-3-6" },
      { label: "Bài Nền tảng D3, khái niệm “Thiết lập (settings)”: settings.json do chương trình thi hành, không vào context", href: NOTES + "#l-3-0" }
    ]
  },
  {
    de: 7, n: 23, total: 60, sub: "1.3", subName: "Gọi subagent, truyền context", scen: "S2",
    answer: "B",
    ask: "Earlier in a long session, you and Claude settled on three target modules and a naming rule. The session history also holds a lot of raw file output. You ask a subagent to check coverage for “the modules we discussed,” and it reports on unrelated modules. Which change fixes this?",
    scene: [
      "Phiên làm việc dài. Lúc đầu mày với Claude đã chốt ba module cần làm và một quy tắc đặt tên.",
      "Lịch sử phiên còn chứa rất nhiều output đọc file thô.",
      "Mày nhờ subagent kiểm coverage cho “the modules we discussed” (các module mình đã bàn). Nó báo về những module chẳng liên quan.",
      "Chỗ khó: subagent có chạy, làm đúng loại việc, chỉ sai đối tượng. Lỗi nằm ở thứ nó nhận được lúc bắt đầu."
    ],
    asks: [
      "Thay đổi nào sửa được chuyện này?",
      "Tức là: làm sao để subagent biết đúng ba module và quy tắc đặt tên đã chốt.",
      "Soi từng phương án: subagent nhận hai thông tin đó bằng đường nào, và có phải kéo theo thứ không cần không?"
    ],
    facts: [
      "Subagent thường (không phải fork) bắt đầu với context mới tinh. Nó không thấy lịch sử hội thoại, không thấy file phiên chính đã đọc. Lời giao việc là thông tin duy nhất nó nhận về việc cần làm.",
      "Vì vậy “the modules we discussed” trỏ vào lịch sử mà subagent không có, nên nó đoán. Muốn nó dùng kết quả đã có thì phải ghi thẳng vào lời giao việc.",
      "Fork là ngoại lệ: subagent nhận toàn bộ hội thoại tới lúc đó. Docs khuyên dùng fork khi subagent thường sẽ cần quá nhiều background mới làm được việc.",
      "Gọi subagent bằng tên (@-mention) chỉ quyết định subagent nào chạy. Docs ghi nó không quyết định subagent nhận prompt gì."
    ],
    opts: [
      { k: "A", gist: "Add Grep and Read to the subagent's tools so it can track down the affected modules by itself.",
        why: [
          "Sai chỗ bệnh: subagent không thiếu tool, nó thiếu thông tin (ý 1).",
          "Có Grep, Read thì nó đi khám phá lại, tốn lại công phiên chính đã bỏ ra. Còn quy tắc đặt tên là quyết định trong hội thoại, không nằm trong file nào để tìm.",
          "Notes bài 1.3 xếp đúng kiểu này vào cột “Tệ”: cho subagent tool để tự tìm lại, thay vì đưa kết quả cho nó."
        ] },
      { k: "B", gist: "Write the module paths and the agreed naming rule straight into the subagent's delegation prompt.",
        why: [
          "Lời giao việc là kênh duy nhất vào subagent (ý 1). Ghi thẳng ba đường dẫn và quy tắc đặt tên là nó có đúng thứ cần.",
          "Không còn câu trỏ vào lịch sử nó không thấy (ý 2), nên hết đoán.",
          "Gọn: ba đường dẫn và một quy tắc chỉ mất vài dòng, subagent bắt đầu với context sạch."
        ] },
      { k: "C", gist: "Name the subagent explicitly in the request so Claude sends the coverage check to the right agent.",
        why: [
          "Sai chỗ bệnh: đúng subagent đã chạy rồi, chỉ là nó không biết module nào.",
          "Gọi tên chỉ chọn ai chạy, không đổi prompt nó nhận (ý 4). Lời giao việc vẫn chỉ có “the modules we discussed”."
        ] },
      { k: "D", gist: "Fork the session for the subtask so the subagent inherits the whole conversation, agreed decisions included.",
        why: [
          "Chạy được: fork thấy cả hội thoại, nên biết ba module và quy tắc (ý 3).",
          "Nhưng kéo theo cả đống output đọc file thô mà đề đã nhắc. Subagent bắt đầu trong một context dài, đầy nhiễu, trong khi việc chỉ cần ba đường dẫn và một quy tắc.",
          "Dễ bị cuốn vì fork đúng là cách đưa background cho subagent. Nhưng docs dành fork cho lúc background nhiều quá, kể lại không xuể. Ở đây kể lại chỉ mất vài dòng."
        ] }
    ],
    dispute: "Đề gốc chấm B, khớp. Lời giải gốc loại D vì fork chép cả lịch sử nên tốn token. Docs Subagents ghi fork dùng chung prompt cache với phiên chính, nên “costs less than a fresh subagent for tasks that need the same context” (rẻ hơn subagent mới, với việc cần cùng context). Lý do loại D vững hơn: việc này không cần cùng context, và docs chỉ khuyên fork khi subagent thường cần quá nhiều background.",
    refs: [
      { label: "Bài 1.3, mục “Chuyện gì đang xảy ra”: subagent bắt đầu với trang giấy trắng; muốn nó dùng kết quả thì ghi vào lời giao việc", href: NOTES + "#l-1-3" },
      { label: "Docs Subagents: subagent không thấy lịch sử hội thoại; fork là ngoại lệ, dùng khi subagent thường cần quá nhiều background; @-mention chỉ chọn subagent nào chạy", href: "https://code.claude.com/docs/en/sub-agents" }
    ]
  },
  {
    de: 7, n: 24, total: 60, sub: "5.6", subName: "Giữ nguồn và xử lý mâu thuẫn khi tổng hợp", scen: "S2",
    answer: "C",
    ask: "A research subagent collects framework migration guides written over several years, and the main agent blends outdated steps into its current advice. The source site resets each page's last-updated date whenever the page layout changes, so those dates don't show when a guide was written. Which change lets the main agent tell older guides from current ones?",
    scene: [
      "Subagent nghiên cứu gom các bài hướng dẫn migrate (nâng cấp) framework, viết rải rác qua nhiều năm.",
      "Main agent trộn bước cũ vào lời khuyên hiện tại.",
      "Chỗ khó: trang nguồn đổi ngày “last updated” (cập nhật lần cuối) của mọi trang mỗi khi đổi giao diện. Nên ngày đó không cho biết bài được viết lúc nào."
    ],
    asks: [
      "Thay đổi nào giúp main agent phân biệt bài cũ với bài hiện tại?",
      "Tức là: mỗi finding phải mang theo đúng ngày bài được viết, và yêu cầu đó phải tới được subagent.",
      "Soi từng phương án: ngày lấy từ đâu, có đúng là ngày viết không, và yêu cầu đặt ở chỗ subagent có thấy không?"
    ],
    facts: [
      "Guide bắt subagent kèm ngày xuất bản hoặc ngày thu thập dữ liệu trong output có cấu trúc. Không có ngày, agent tổng hợp đọc nhầm khác biệt về thời gian thành mâu thuẫn, hoặc ngược lại.",
      "Nguồn nói khác nhau thì không tự chọn, không chọn nguồn mới hơn. Giữ cả hai kèm nguồn để bước sau tự cân.",
      "Trong kết quả của web search tool, <code>page_age</code> là “when the site was last updated” (lúc trang được cập nhật lần cuối), không phải ngày bài được viết.",
      "Subagent chỉ nhận system prompt của chính nó và lời giao việc, không nhận system prompt hay lịch sử của main agent. Yêu cầu nào muốn subagent làm theo phải nằm trong định nghĩa subagent hoặc lời giao việc."
    ],
    opts: [
      { k: "A", gist: "Tell the subagent to return only the most recently written guide on each topic and drop the older sources.",
        why: [
          "Sai hướng: giữ bài mới nhất là tự chọn thay cho diễn giải. Guide dặn không chọn nguồn mới hơn, mà giữ cả hai kèm nguồn (ý 2).",
          "Migrate qua nhiều bản thường vẫn cần các bài trung gian. Bỏ đi thì main agent thiếu bước, lại mất luôn bối cảnh thời gian để tự cân.",
          "Còn một lỗ: subagent dựa vào đâu để biết bài nào mới nhất? Ngày trên trang thì đề đã nói là không tin được."
        ] },
      { k: "B", gist: "Add the publication-date requirement to the main agent's system prompt so the subagent inherits it when it is spawned.",
        why: [
          "Sai ở giả định: subagent không thừa hưởng system prompt của main agent (ý 4).",
          "Yêu cầu nằm ở main agent thì subagent không bao giờ thấy. Finding trả về vẫn không có ngày.",
          "Yêu cầu đúng, đặt sai chỗ. Muốn có tác dụng thì ghi vào định nghĩa subagent hoặc lời giao việc."
        ] },
      { k: "C", gist: "Require the subagent to extract each guide's publication date from the guide's own content and attach it to every finding it returns.",
        why: [
          "Ngày lấy từ chính nội dung bài, nên là ngày bài được viết, không dính tới chuyện trang đổi giao diện.",
          "Ngày đi kèm từng finding trong output có cấu trúc (ý 1). Main agent thấy bài nào viết cho thời framework nào, không trộn bước cũ vào lời khuyên mới.",
          "Yêu cầu đặt ở chính subagent, nên nó làm theo được (ý 4)."
        ] },
      { k: "D", gist: "Have the subagent copy each result's <code>page_age</code> from the web search tool into its findings as the guide's publication date.",
        why: [
          "Sai nguồn ngày: <code>page_age</code> là lúc trang được cập nhật lần cuối (ý 3), không phải lúc bài được viết.",
          "Trang nguồn đổi ngày cập nhật mỗi lần đổi giao diện. Bài viết từ mấy năm trước cũng mang ngày gần đây, và main agent tin là bài mới. Tệ hơn cả không có ngày.",
          "Dễ bị cuốn vì <code>page_age</code> là trường có thật, lấy ra không tốn gì. Nhưng đề đã nói trước ngày cập nhật của trang này không đáng tin."
        ] }
    ],
    refs: [
      { label: "Bài 5.6, mục “Ngày tháng và cách trình bày”: subagent phải kèm ngày xuất bản trong output có cấu trúc", href: NOTES + "#l-5-6" },
      { label: "Bài 1.3: subagent bắt đầu với trang giấy trắng, chỉ biết lời giao việc", href: NOTES + "#l-1-3" },
      { label: "Docs Web search tool, mục Search results: page_age là lúc trang được cập nhật lần cuối", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool" }
    ]
  },
  {
    de: 7, n: 25, total: 60, sub: "3.4", subName: "Plan mode hay làm thẳng", scen: "S2",
    answer: "AD",
    ask: "A teammate delegates discovery-only work to the built-in Explore subagent. They expect Explore to follow the project's CLAUDE.md conventions, and they assume its runs don't count toward usage limits. Which two workflow adjustments should they make? (Choose two.)",
    scene: [
      "Một người trong team giao việc chỉ khám phá, không sửa gì, cho Explore subagent có sẵn.",
      "Họ đang tin hai điều: Explore làm theo quy ước trong CLAUDE.md của project, và Explore chạy không tính vào usage limit (hạn mức sử dụng).",
      "Chỗ khó: cả hai niềm tin đều sai. Mỗi phương án đúng sửa một niềm tin. Hai phương án sai thì dựa trên điều sai về Explore, hoặc sửa thứ không cần sửa."
    ],
    asks: [
      "Họ nên điều chỉnh hai điều gì trong cách làm?",
      "Tức là: chỉ ra hai niềm tin sai và cách bù cho từng cái.",
      "Soi từng phương án: điều nó nói về Explore có đúng docs không, và việc chỉ khám phá có cần tới nó không?"
    ],
    facts: [
      "Explore là subagent có sẵn, chỉ đọc: Write và Edit bị cấm. Nó đọc trong context riêng rồi gửi về bản tóm tắt.",
      "Docs: Explore và Plan “start without your CLAUDE.md files” (bắt đầu mà không nạp CLAUDE.md), để nghiên cứu nhanh và rẻ. Subagent khác thì có nạp CLAUDE.md.",
      "Docs: subagent gửi request của riêng nó, và các request đó “count toward the same usage limits as your main conversation” (tính vào cùng hạn mức sử dụng với phiên chính).",
      "Khi gọi Explore, Claude chọn một trong ba mức kỹ: quick (tra nhanh), medium (vừa), very thorough (rất kỹ)."
    ],
    opts: [
      { k: "A", gist: "Spell out the needed search conventions in the Explore task prompt itself, because Explore does not load CLAUDE.md files on its own.",
        why: [
          "Sửa niềm tin thứ nhất. Explore không nạp CLAUDE.md (ý 2), nên quy ước trong đó không tới được nó.",
          "Quy ước nào cần cho lúc khám phá thì ghi thẳng vào lời giao việc. Đây là đường chắc chắn tới được Explore."
        ] },
      { k: "B", gist: "Move discovery to a custom subagent that is allowed Write and Edit, so a run can also apply any small fixes it comes across.",
        why: [
          "Đúng là Explore không sửa được file (ý 1), và subagent tự định nghĩa có thể được cho Write, Edit.",
          "Nhưng việc ở đây chỉ là khám phá. Không ai cần sửa gì, nên chuyện cấm ghi không chặn việc nào.",
          "Đổi sang subagent ghi được còn bỏ mất ranh giới chỉ đọc mà chẳng được gì. Không sửa niềm tin sai nào trong hai cái."
        ] },
      { k: "C", gist: "Define a custom subagent for deeper searches, because the built-in Explore only offers the quick thoroughness level.",
        why: [
          "Sai ở giả định: Explore có ba mức quick, medium, very thorough (ý 4). Cần tìm kỹ thì Claude chọn very thorough.",
          "Không cần dựng subagent mới cho việc Explore làm được.",
          "Dễ bị cuốn vì nghe như một hạn chế có thật của bản có sẵn. Nhưng điều nó khẳng định không đúng docs."
        ] },
      { k: "D", gist: "Budget token spend for discovery runs, because Explore's requests count toward the same usage limits as the main conversation.",
        why: [
          "Sửa niềm tin thứ hai. Explore giữ output dài trong context riêng, nhưng request của nó vẫn tính vào cùng hạn mức với phiên chính (ý 3).",
          "Cô lập context không có nghĩa là miễn phí. Giao nhiều việc khám phá thì phải tính trước chi phí."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, khái niệm “Explore subagent”: subagent có sẵn, chỉ đọc, khám phá trong context riêng rồi gửi tóm tắt", href: NOTES + "#l-3-4" },
      { label: "Docs Subagents, mục Built-in subagents: Explore không nạp CLAUDE.md, ba mức quick / medium / very thorough; request của subagent tính vào cùng usage limit", href: "https://code.claude.com/docs/en/sub-agents" }
    ]
  },
  {
    de: 7, n: 26, total: 60, sub: "3.4", subName: "Plan mode hay làm thẳng", scen: "S2",
    answer: "C",
    ask: "To fix a form-submission bug, you need to add a single date check to a handler function you have already identified. You can state the exact rule and the resulting diff in one sentence. Which workflow fits this change?",
    scene: [
      "Sửa bug gửi form: cần thêm đúng một điều kiện kiểm ngày vào một hàm handler (hàm xử lý request).",
      "Mày đã biết đó là hàm nào, nói được quy tắc và cả diff trong một câu.",
      "Chỗ khó: ba phương án sai đều là công cụ thật: <code>bypassPermissions</code>, plan mode, Explore subagent. Phải soi xem việc này có cần tới chúng không."
    ],
    asks: [
      "Cách làm nào hợp với thay đổi này?",
      "Tức là: việc nhỏ, đã biết chỗ, một cách sửa hiển nhiên thì nên làm thẳng hay plan trước.",
      "Soi từng phương án: công cụ đó giải quyết vấn đề gì, và việc này có vấn đề đó không?"
    ],
    facts: [
      "Plan mode là chế độ chỉ đọc: Claude đọc code, viết kế hoạch, không sửa file cho tới khi mày duyệt. Đáng dùng khi thay đổi lớn nhiều file, có nhiều cách làm, hoặc phải quyết kiến trúc. Việc nhỏ, phạm vi rõ thì làm thẳng (direct execution). Bài 3.4 nêu đúng ví dụ: thêm một điều kiện validate ngày.",
      "Docs Best practices: cho Claude một thứ chạy được, trả về pass hoặc fail (test, build, linter), để nó tự biết việc đã xong thật chưa.",
      "Explore subagent đọc codebase trong context riêng và chỉ gửi về bản tóm tắt. Nó dùng cho pha khám phá dài, để output đọc file không làm đầy phiên chính.",
      "<code>bypassPermissions</code> là permission mode cho tool chạy không hỏi quyền. Notes ghi mode này chỉ dùng trong container hoặc VM. Nó là chuyện quyền, không phải chuyện chọn plan hay làm thẳng."
    ],
    opts: [
      { k: "A", gist: "Start the session in <code>bypassPermissions</code> to cut down approval prompts while Claude edits and runs commands.",
        why: [
          "Sai loại công cụ: <code>bypassPermissions</code> quyết Claude được làm gì mà không hỏi, không quyết cách làm việc (ý 4).",
          "Mode này chỉ dành cho container hoặc VM. Bỏ hết rào chắn quyền để sửa một dòng là đổi rủi ro lớn lấy chút tiện."
        ] },
      { k: "B", gist: "Switch to plan mode first, so Claude explores the code and proposes an implementation plan for your approval before editing anything.",
        why: [
          "Plan mode đáng tiền khi chưa rõ cách làm, đụng nhiều file, hoặc code lạ (ý 1). Việc này không có điều nào: biết hàm, biết quy tắc, diff gói trong một câu.",
          "Thêm vòng nghiên cứu rồi duyệt kế hoạch chỉ là thủ tục, không đổi kết quả.",
          "Dễ bị cuốn vì plan trước nghe cẩn thận. Nhưng plan mode dành cho lúc chưa biết phải làm gì, còn ở đây mày đã biết hết."
        ] },
      { k: "C", gist: "Ask Claude to make the edit directly, naming the handler's file and the validation rule, then have it run the relevant checks.",
        why: [
          "Một điều kiện trong một hàm, chỗ đã biết, cách sửa hiển nhiên: đúng ca làm thẳng (ý 1).",
          "Nêu file và quy tắc giúp Claude sửa đúng chỗ. Bảo nó chạy test, linter liên quan thì nó tự biết lúc nào là xong (ý 2)."
        ] },
      { k: "D", gist: "Send the Explore subagent to map the form-handling code and return a summary before any change is made.",
        why: [
          "Explore dùng để cách ly output khám phá dài (ý 3). Việc này không có pha khám phá: hàm đã biết rồi.",
          "Không có output dài nào để cách ly. Chạy thêm một subagent chỉ thêm độ trễ cho một chỗ sửa nhỏ."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, mục “Chuyện gì đang xảy ra”: bảng chọn plan mode hay làm thẳng (thêm một điều kiện validate ngày thì làm thẳng); Explore cho pha khám phá dài", href: NOTES + "#l-3-4" },
      { label: "Docs Best practices, mục Give Claude a check to run: cho Claude thứ chạy được trả về pass hoặc fail", href: "https://code.claude.com/docs/en/best-practices" }
    ]
  },
  {
    de: 7, n: 27, total: 60, sub: "3.2", subName: "Slash command và skill", scen: "S2",
    answer: "AC",
    ask: "A developer copied the team's shared review skill, full frontmatter included, into <code>~/.claude/skills/my-review/</code>. Typing <code>/review</code> now runs the personal copy instead of the shared skill. Which TWO changes make <code>/review</code> run the shared skill again while keeping the personal copy usable? (Select TWO.)",
    scene: [
      "Một dev chép skill review dùng chung của team sang <code>~/.claude/skills/my-review/</code>, chép nguyên cả frontmatter.",
      "Giờ gõ <code>/review</code> thì chạy bản cá nhân của họ, không chạy skill của team nữa.",
      "Chỗ khó: thư mục đã khác tên (<code>my-review</code>), nhưng frontmatter chép sang vẫn ghi tên cũ. Ví dụ minh họa:<pre><code>~/.claude/skills/my-review/SKILL.md\n---\nname: review      ← chép nguyên từ skill của team\ndescription: ...\n---</code></pre>",
      "Đề đòi hai việc cùng lúc: <code>/review</code> về lại skill của team, và bản cá nhân vẫn gọi được."
    ],
    asks: [
      "Hai thay đổi nào đưa <code>/review</code> về skill của team mà bản cá nhân vẫn dùng được?",
      "Tức là: gỡ chỗ trùng tên giữa bản cá nhân và bản project.",
      "Soi từng phương án: làm xong thì bản cá nhân còn mang tên <code>review</code> không?"
    ],
    facts: [
      "Hai skill trùng tên thì enterprise &gt; personal &gt; project. Skill cá nhân cùng tên che skill của project trên máy mình, không báo lỗi.",
      "Trường <code>name</code> trong frontmatter đặt lệnh mình gõ. Không có <code>name</code> thì lệnh lấy theo tên thư mục chứa skill.",
      "<code>disable-model-invocation: true</code> chỉ cấm Claude tự gọi skill. Người dùng vẫn gõ <code>/tên</code> được như cũ.",
      "Claude Code theo dõi thư mục skill trong lúc chạy phiên, sửa SKILL.md là nhận ngay. <code>/reload-skills</code> chỉ cần khi mày tạo một thư mục skills cấp cao nhất mà lúc mở phiên chưa có."
    ],
    opts: [
      { k: "A", gist: "Delete the <code>name</code> field from the personal copy's frontmatter so its command comes from the directory name.",
        why: [
          "Không có <code>name</code> thì lệnh lấy theo tên thư mục (ý 2). Bản cá nhân thành <code>/my-review</code>.",
          "Hết trùng tên, nên <code>/review</code> chỉ còn skill của team (ý 1). Bản cá nhân vẫn gọi được bằng <code>/my-review</code>."
        ] },
      { k: "B", gist: "Add <code>disable-model-invocation: true</code> to the personal copy so Claude can't invoke it automatically.",
        why: [
          "Sai chỗ: trường này chỉ chặn Claude tự gọi (ý 3), không đổi tên lệnh.",
          "Bản cá nhân vẫn tên <code>review</code>, vẫn thắng skill project (ý 1). Gõ <code>/review</code> vẫn ra bản cá nhân.",
          "Dễ bị cuốn vì nó nghe như “tắt bớt” bản cá nhân. Nhưng chuyện ở đây là người gõ lệnh, không phải Claude tự gọi."
        ] },
      { k: "C", gist: "Change the <code>name</code> field in the personal copy's frontmatter to a name that no project skill uses.",
        why: [
          "Đổi <code>name</code> sang tên chưa ai dùng là gỡ chỗ trùng (ý 1). Đúng lời notes dặn: bản cá nhân của skill team thì đặt tên khác.",
          "<code>/review</code> về lại skill của team, bản cá nhân chạy bằng tên mới (ý 2)."
        ] },
      { k: "D", gist: "Run <code>/reload-skills</code> so the session rereads the project's <code>.claude/skills/</code> directory and its review skill.",
        why: [
          "Sai chỗ bệnh: skill của team đã nạp rồi, không thiếu. Nó thua vì trùng tên với bản cá nhân (ý 1).",
          "Đọc lại thư mục không đổi thứ tự ưu tiên. Reload xong, bản cá nhân vẫn thắng (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 3.2, mục “Biết thêm”: trùng tên thì enterprise > personal > project, skill cá nhân che skill project", href: NOTES + "#fix-4" },
      { label: "Bài 3.2, khối “Tốt” và “Nhớ nhanh”: bản cá nhân của skill team thì đặt tên khác", href: NOTES + "#l-3-2" },
      { label: "Docs Skills: name mặc định là tên thư mục; disable-model-invocation; khi nào cần /reload-skills", href: "https://code.claude.com/docs/en/skills" }
    ]
  },
  {
    de: 7, n: 28, total: 60, sub: "3.4", subName: "Plan mode hay làm thẳng", scen: "S2",
    answer: "A",
    ask: "A refactor calls for a long codebase investigation that runs across several turns, where later searches depend on answers from earlier ones. The exploration output is too verbose to keep in the main conversation. Which subagent design supports this?",
    scene: [
      "Refactor cần một cuộc điều tra codebase dài, kéo qua nhiều lượt.",
      "Lần tìm sau dựa vào câu trả lời của lần trước.",
      "Output khám phá quá dài để đổ vào phiên chính.",
      "Chỗ khó: đề đòi hai thứ cùng lúc, cách ly output dài và giữ được trạng thái giữa các lượt. Vài phương án chỉ lo được một thứ."
    ],
    asks: [
      "Thiết kế subagent nào đáp ứng được?",
      "Tức là: cần một subagent làm trong context riêng, và gọi tiếp được nó với đủ những gì nó đã tìm ra.",
      "Soi từng phương án: output dài nằm ở đâu, và lượt sau còn giữ được chi tiết của lượt trước không?"
    ],
    facts: [
      "Subagent làm việc trong context riêng. Output dài nằm lại ở đó, phiên chính chỉ nhận bản tóm tắt.",
      "Subagent general-purpose hay subagent tự định nghĩa: xong việc thì Claude nhận agent ID. Claude resume nó bằng ID đó, và nó giữ “full conversation history, including all previous tool calls, results, and reasoning” (toàn bộ lịch sử, kể cả tool call, kết quả và lập luận trước đó).",
      "Docs: Explore và Plan là “one-shot and return no agent ID” (chạy một lần, không trả agent ID), nên Claude không resume được. Cần làm tiếp thì dùng general-purpose hoặc subagent tự định nghĩa.",
      "<code>/compact</code> nén lịch sử phiên thành bản tóm tắt. Tóm tắt thì dễ rơi chi tiết chính xác."
    ],
    opts: [
      { k: "A", gist: "Delegate the work to a general-purpose subagent, which can be resumed so later requests build on what it already found.",
        why: [
          "Lo cả hai thứ. Output dài nằm trong context của subagent, phiên chính chỉ nhận tóm tắt (ý 1).",
          "General-purpose trả agent ID, nên lượt sau Claude resume đúng subagent đó. Nó còn nguyên mọi tool call và kết quả cũ (ý 2), lần tìm mới dựa được vào chi tiết lần trước."
        ] },
      { k: "B", gist: "Keep the investigation in the main conversation and run <code>/compact</code> between phases so the context window doesn't fill up.",
        why: [
          "Trái đề ngay từ đầu: output dài đổ vào phiên chính, đúng thứ đề nói là quá dài.",
          "<code>/compact</code> chỉ dọn sau khi output đã vào context, và tóm tắt thì dễ rơi đúng chi tiết lần tìm sau cần (ý 4)."
        ] },
      { k: "C", gist: "Launch a fresh Explore subagent for each phase and pass the previous phase's returned summary in the delegation message.",
        why: [
          "Lo được cách ly: mỗi Explore đọc trong context riêng (ý 1).",
          "Nhưng mỗi lần là một Explore mới, bắt đầu trống. Thứ duy nhất nối các pha là bản tóm tắt, còn tên hàm, đường dẫn, kết quả trung gian thì mất. Explore cũng không resume được (ý 3).",
          "Dễ bị cuốn vì bài 5.4 có dạy tóm tắt pha trước rồi đưa cho subagent pha sau. Cách đó hợp khi các pha tách rời được. Ở đây lần tìm sau cần chi tiết của lần trước, nên cần một subagent giữ được trạng thái."
        ] },
      { k: "D", gist: "Invoke the Explore subagent once at the very thorough level so a single pass covers the questions later phases will raise.",
        why: [
          "Mức very thorough có thật. Nhưng đề nói lần tìm sau phụ thuộc câu trả lời lần trước.",
          "Một lượt chạy không đoán trước được câu hỏi chỉ nảy ra sau khi đọc kết quả. Tới câu hỏi tiếp theo vẫn phải gọi lại, mà Explore không resume được (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, mục “Khi pha khám phá quá dài”: subagent đọc trong context riêng, chỉ gửi về tóm tắt", href: NOTES + "#l-3-4" },
      { label: "Bài 5.4, mục “Bốn công cụ, mỗi cái một việc”: subagent delegation và phase summary", href: NOTES + "#l-5-4" },
      { label: "Docs Subagents: Explore và Plan chạy một lần, không trả agent ID; resume subagent giữ toàn bộ lịch sử", href: "https://code.claude.com/docs/en/sub-agents" }
    ]
  },
  {
    de: 7, n: 29, total: 60, sub: "5.2", subName: "Escalate và xử lý chỗ mơ hồ", scen: "S2",
    answer: "A",
    ask: "The team's <code>/fix-ticket</code> command looks tickets up by title keywords through an MCP tool. Many open tickets have similar titles, so Claude picks the most recently updated match and sometimes fixes the wrong bug. Developers rarely know a ticket's ID: they start from a title and only learn the ID after seeing the candidates. What is the most reliable change?",
    scene: [
      "Lệnh <code>/fix-ticket</code> của team tìm ticket theo từ khóa trong tiêu đề, qua một tool MCP.",
      "Nhiều ticket đang mở có tiêu đề na ná nhau. Claude chọn ticket cập nhật gần nhất, nên có lúc sửa nhầm bug.",
      "Chỗ khó: dev hiếm khi biết ID ticket. Họ bắt đầu từ tiêu đề, xem danh sách ứng viên rồi mới biết ID."
    ],
    asks: [
      "Thay đổi nào đáng tin nhất?",
      "Tức là: khi tìm ra nhiều ticket khớp, làm sao chắc chắn sửa đúng ticket dev đang nghĩ tới.",
      "Soi từng phương án: ai quyết ticket nào (dev, Claude đoán, hay tool đoán), và có hợp với việc dev chưa biết ID lúc đầu không?"
    ],
    facts: [
      "Guide 5.2: tool trả nhiều kết quả khớp thì hỏi thêm định danh, không chọn theo heuristic (đoán theo dấu hiệu, như bản ghi gần nhất).",
      "Ở đây chỉ dev biết mình đang nói ticket nào. Không cách xếp hạng hay truy vấn nào nhìn được ý trong đầu dev.",
      "ID ticket là định danh ổn định: mỗi ID ứng đúng một ticket. Cho dev xem ứng viên kèm ID là đủ để họ chọn trong một lượt."
    ],
    opts: [
      { k: "A", gist: "Have Claude list the matching tickets with their IDs and ask the developer to pick one before changing any code.",
        why: [
          "Đúng cách của guide: nhiều kết quả khớp thì hỏi, không đoán (ý 1).",
          "Dev nhìn danh sách kèm ID là chọn được ngay, dù lúc đầu chỉ nhớ tiêu đề (ý 3). Hợp đúng cách dev đang làm việc.",
          "Hỏi thêm một câu rẻ hơn nhiều so với điều tra và sửa nhầm bug."
        ] },
      { k: "B", gist: "Add example queries to the tool description so Claude writes narrower keyword searches that return just one ticket.",
        why: [
          "Viết description tốt là việc nên làm, nhưng không giải quyết được chuyện ở đây.",
          "Đề nói nhiều ticket thật sự có tiêu đề giống nhau. Từ khóa hẹp đến mấy vẫn có thể ra vài ticket hợp lệ, và Claude vẫn phải đoán (ý 2).",
          "Dễ bị cuốn vì nó nhắm đúng chỗ tìm kiếm trả về nhiều. Nhưng dữ liệu không duy nhất thì truy vấn không tạo ra được chỗ duy nhất."
        ] },
      { k: "C", gist: "Make <code>/fix-ticket</code> require the exact ticket ID as an argument, so title search never runs and no ambiguity can arise.",
        why: [
          "Bắt nhập ID trước thì hết mơ hồ, nhưng trái dữ kiện đề: dev hiếm khi biết ID.",
          "Lệnh trở nên vô dụng ở đúng cách dùng chính của nó. Muốn có ID thì dev lại phải tự đi tìm ở chỗ khác.",
          "Dễ bị cuốn vì hỏi định danh đúng là cách của guide (ý 1). Nhưng hỏi lúc dev chưa có thì vô ích. Cho xem ứng viên rồi mới hỏi thì đúng lúc."
        ] },
      { k: "D", gist: "Change the MCP tool to rank matches by relevance and return only the single highest-scoring ticket to Claude.",
        why: [
          "Vẫn là heuristic (ý 1), chỉ chuyển việc đoán từ Claude sang tool.",
          "Điểm liên quan không biết dev nghĩ tới ticket nào (ý 2). Tệ hơn, Claude không còn thấy có ứng viên khác, nên chọn nhầm lại càng khó phát hiện."
        ] }
    ],
    refs: [
      { label: "Bài 5.2, mục “Ba tình huống hay bị nhầm khi escalate”, đoạn cuối: nhiều kết quả khớp thì hỏi thêm định danh, không chọn theo heuristic", href: NOTES + "#fix-9" },
      { label: "Cheatsheet D5: dòng “get_customer trả nhiều khách khớp” → hỏi thêm định danh", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 7, n: 30, total: 60, sub: "5.4", subName: "Quản lý context khi khám phá codebase lớn", scen: "S2",
    answer: "A",
    ask: "During a long refactor investigation, Claude found specific constraints spread across many files, such as a database column that must stay nullable. After <code>/compact</code> runs, Claude answers with typical patterns instead of those facts. Work continues in a new session tomorrow. How should the team preserve the findings?",
    scene: [
      "Cuộc điều tra refactor dài. Claude tìm ra nhiều ràng buộc cụ thể rải rác qua nhiều file, ví dụ một cột database phải giữ nullable (được phép null).",
      "Sau khi chạy <code>/compact</code>, Claude trả lời bằng “typical patterns” (pattern thông thường) thay vì các sự thật đó.",
      "Mai làm tiếp trong một phiên mới.",
      "Chỗ khó: findings phải sống qua hai ranh giới, lần nén context và việc sang phiên mới."
    ],
    asks: [
      "Team nên giữ các findings này thế nào?",
      "Tức là: đặt findings ở đâu để không phụ thuộc vào hội thoại, rồi phiên sau đọc lại được.",
      "Soi từng phương án: findings nằm ở đâu, còn nguyên chi tiết không, và có đổ thứ chỉ dùng cho việc này vào chỗ dùng chung không?"
    ],
    facts: [
      "Context degradation (context xuống cấp): phát hiện cụ thể bị nén mất, model quay về kiến thức chung. Dấu hiệu là câu trả lời kiểu “thường thì…”.",
      "Scratchpad file: file agent tự ghi findings và đọc lại khi cần. File nằm trên đĩa nên không mất khi context bị nén. Nhưng nó không tự được đọc lại, phải chủ động đọc.",
      "Ngay sau compact, Claude Code đọc lại tối đa năm file Claude đã đọc hoặc sửa trong phiên, ưu tiên file sửa gần nhất. File trên 5.000 token chỉ còn đường dẫn, không có nội dung.",
      "CLAUDE.md nạp vào mọi phiên. Docs Best practices ghi mỗi dòng trong đó chiếm một chút chú ý của Claude ở mọi việc, liên quan hay không."
    ],
    opts: [
      { k: "A", gist: "Have Claude write each finding to a scratchpad file as the investigation goes, then read that file at the start of the new session.",
        why: [
          "Findings nằm trên đĩa, ngoài hội thoại (ý 2). Compact không đụng được, sang phiên mới cũng không mất.",
          "Ghi ngay lúc tìm ra thì còn nguyên chi tiết: tên cột, file, ràng buộc. Phiên mai đọc file là có lại đúng các sự thật đó.",
          "Đúng công cụ bài 5.4 dạy cho context degradation (ý 1)."
        ] },
      { k: "B", gist: "Count on Claude Code rereading recently accessed files after compaction, which restores the constraints with no extra step.",
        why: [
          "Cơ chế có thật nhưng không đủ: chỉ tối đa năm file, file lớn chỉ còn đường dẫn (ý 3).",
          "Quan trọng hơn, findings là kết luận Claude rút ra từ nhiều file. Chúng không nằm sẵn trong file nào để đọc lại.",
          "Cơ chế này cũng chỉ chạy ngay sau compact trong cùng phiên. Mai mở phiên mới thì nó không mang gì sang."
        ] },
      { k: "C", gist: "Append the discovered constraints to the project CLAUDE.md so they load automatically at the start of every session.",
        why: [
          "Chạy được: findings sống qua compact và qua phiên mới.",
          "Nhưng sai chỗ: CLAUDE.md dùng chung cho cả team và nạp vào mọi phiên (ý 4). Findings của một cuộc điều tra sẽ chiếm chú ý ở mọi việc khác, kể cả việc chẳng liên quan.",
          "Dễ bị cuốn vì nó tự nạp, khỏi phải nhớ đọc. Nhưng CLAUDE.md để giữ quy ước lâu dài của project, không phải trạng thái của một việc."
        ] },
      { k: "D", gist: "Run <code>/compact</code> before ending today's session and continue tomorrow with <code>--resume</code>, so the compacted summary carries the investigation forward.",
        why: [
          "Resume mang sang đúng bản tóm tắt đã nén, mà đề cho thấy bản đó đã mất các ràng buộc cụ thể (ý 1).",
          "Tóm tắt không trả lại được thứ nó đã bỏ. Mai Claude vẫn trả lời bằng pattern thông thường."
        ] }
    ],
    refs: [
      { label: "Bài 5.4: context degradation, scratchpad file ghi findings ra đĩa rồi đọc lại", href: NOTES + "#l-5-4" },
      { label: "Docs Context window, mục What survives compaction: đọc lại tối đa năm file, file trên 5.000 token chỉ còn đường dẫn", href: "https://code.claude.com/docs/en/context-window" }
    ]
  },
  {
    de: 7, n: 31, total: 60, sub: "3.1", subName: "Cấp của CLAUDE.md và chia sẻ cho team", scen: "S4",
    answer: "BC",
    ask: "A team moved the content of its large project <code>CLAUDE.md</code> into separate standards files pulled in with <code>@path</code> imports, but per-session token usage did not go down. On top of that, a contributor-guide section of <code>CLAUDE.md</code> shows sample <code>@path</code> lines, and Claude Code imports those files too. Which two changes should the team make? (Choose two.)",
    scene: [
      "Team tách CLAUDE.md to thành nhiều file chuẩn, kéo vào bằng <code>@path</code> (cú pháp import). Mục đích là giảm token mỗi phiên, nhưng token không giảm.",
      "Vấn đề thứ hai: mục hướng dẫn cho người đóng góp (contributor guide) trong CLAUDE.md có mấy dòng <code>@path</code> ghi làm ví dụ, và Claude Code import luôn các file đó. Ví dụ minh họa:<pre><code>## Contributing\nThêm chuẩn mới bằng một dòng như:\n@standards/new-rule.md</code></pre>",
      "Chỗ khó: hai vấn đề khác loại, nên đề bắt chọn hai thay đổi, mỗi cái sửa một vấn đề. Các phương án sai đều là kỹ thuật có thật, chỉ không sửa đúng chỗ."
    ],
    asks: [
      "Team nên làm hai thay đổi nào?",
      "Tức là: một cách để chuẩn chỉ nạp khi cần (giảm token thật), và một cách để dòng <code>@path</code> ví dụ chỉ là chữ, không bị import.",
      "Soi từng phương án: nó sửa vấn đề nào, và trong đúng tình huống này có sửa được không."
    ],
    facts: [
      "File kéo vào bằng <code>@path</code> được bung ra và nạp cùng lúc với CLAUDE.md gọi nó, tức là lúc khởi động. Import giúp sắp xếp file, không làm nhỏ context.",
      "Rule trong <code>.claude/rules/</code> có frontmatter <code>paths</code> (khối YAML đầu file) chỉ nạp khi Claude đọc, ghi hoặc sửa file khớp glob. Đây mới là cách giảm context cho chuẩn chỉ áp dụng một phần codebase.",
      "Bước đọc import bỏ qua code span (chữ bọc backtick) và khối code. Viết <code>`@README`</code> thì chỉ là chữ; <code>@README</code> ngoài backtick thì file bị import.",
      "CLAUDE.md ở thư mục làm việc và mọi thư mục cha nạp lúc khởi động. CLAUDE.md ở thư mục con chỉ nạp khi Claude đụng file trong đó."
    ],
    opts: [
      { k: "A", gist: "Wrap every import path that contains spaces in double quotes, so the full path resolves instead of stopping at the first space.",
        why: [
          "Sai ở giả định: ngoặc kép không giúp đọc trọn đường dẫn. Docs Memory ghi: “A path wrapped in quotes isn't imported at all” (đường dẫn bọc ngoặc kép thì không được import luôn). Đường dẫn có dấu cách phải đặt <code>\\</code> trước mỗi dấu cách.",
          "Lại không đụng vấn đề nào của đề: đề không kể đường dẫn nào có dấu cách. Token vẫn không giảm, dòng ví dụ vẫn bị import."
        ] },
      { k: "B", gist: "Move the standards that apply to only part of the codebase into path-scoped rules under <code>.claude/rules/</code>, so each one loads only for matching files.",
        why: [
          "Sửa vấn đề 1. Rule có <code>paths</code> chỉ nạp khi Claude đụng file khớp (ý 2). Phiên không đụng tới phần đó thì chuẩn đó không chiếm context.",
          "Khác hẳn import: import vẫn nạp hết lúc khởi động (ý 1), nên tách bằng import thì token không đổi."
        ] },
      { k: "C", gist: "Put the sample import paths in the contributor guide inside backticks, so they display as text and are not imported.",
        why: [
          "Sửa vấn đề 2. Bọc trong backtick thì đường dẫn thành code span, bước đọc import bỏ qua nó (ý 3).",
          "Người đọc vẫn thấy dòng ví dụ, còn Claude Code không kéo file đó vào context. Docs ghi đây đúng là cách nhắc đường dẫn mà không import."
        ] },
      { k: "D", gist: "Launch Claude Code from inside each package directory, so the instruction files of unrelated sibling packages stay out of context at startup.",
        why: [
          "Chạy được, và là cách hợp lý trong monorepo khi mỗi package có CLAUDE.md riêng: CLAUDE.md của package bên cạnh không nạp (ý 4).",
          "Nhưng các dòng import nằm trong CLAUDE.md gốc. Mở từ thư mục package thì gốc vẫn là thư mục cha, vẫn nạp lúc khởi động, kéo theo mọi file nó import (ý 4, ý 1). Token không giảm.",
          "Dễ bị cuốn vì nghe đúng bài giảm context cho monorepo. Nhưng nó chỉ bỏ được file của package bên cạnh, không bỏ được thứ CLAUDE.md gốc import."
        ] }
    ],
    refs: [
      { label: "Bài 3.1, mục “Biết thêm”: @import không làm nhỏ context; muốn tiết kiệm thì dùng rule có paths; lúc khởi động nạp CLAUDE.md thư mục làm việc và thư mục cha", href: NOTES + "#l-3-1" },
      { label: "Bài 3.1, mục “Đã sửa 02/11”: bọc đường dẫn trong backtick thì không import", href: NOTES + "#fix-19" },
      { label: "Docs “How Claude remembers your project”, mục Import additional files: import không giảm context, đường dẫn có dấu cách, ngoặc kép, code span", href: "https://code.claude.com/docs/en/memory" }
    ]
  },
  {
    de: 7, n: 32, total: 60, sub: "1.3", subName: "Gọi subagent, truyền context", scen: "S4",
    answer: "CD",
    ask: "A coordinator hands out three tasks: a search for deprecated APIs, a dependency map, and a migration plan that needs the results of the first two. When the coordinator emits several Task calls in one response, one of them occasionally fails to launch. Which two practices correctly handle the task ordering and the failed launch? (Choose two.)",
    scene: [
      "Coordinator giao ba việc: tìm API đã bị khai tử (deprecated), vẽ bản đồ phụ thuộc, và lập kế hoạch migration.",
      "Kế hoạch migration cần kết quả của hai việc đầu. Hai việc đầu thì không cần nhau.",
      "Vấn đề thứ hai: khi coordinator phát nhiều Task call trong một response, thỉnh thoảng có một call không khởi chạy được.",
      "Chỗ khó: lại hai vấn đề khác loại. Một là thứ tự giao việc, một là báo lại call hỏng thế nào."
    ],
    asks: [
      "Hai cách làm nào xử lý đúng thứ tự việc và call khởi chạy hỏng?",
      "Tức là: việc nào gộp chung một response, việc nào phải chờ; và call không chạy được thì trả kết quả cho coordinator ra sao.",
      "Soi từng phương án: nó lo vấn đề nào, và có đúng quy tắc của vòng lặp tool không."
    ],
    facts: [
      "Subagent chỉ biết những gì nằm trong lời giao việc. Muốn nó dùng kết quả của subagent khác thì phải dán kết quả đó vào prompt, tức là kết quả phải có trước đã.",
      "Chạy song song = nhiều Task call trong cùng một response. Docs khuyên chỉ gộp call độc lập: “Only batch tool calls that are independent of each other” (chỉ gộp các tool call không phụ thuộc nhau).",
      "Mỗi <code>tool_use</code> phải có đúng một <code>tool_result</code>, tất cả gửi chung trong user message kế tiếp. Call nào không chạy thì vẫn trả <code>tool_result</code> với <code>is_error: true</code> kèm lời giải thích ngắn.",
      "<code>tool_choice</code> loại <code>any</code> chỉ ép phải gọi một tool nào đó, không ép gọi nhiều tool. Gọi nhiều tool trong một response vốn đã bật sẵn."
    ],
    opts: [
      { k: "A", gist: "Put all three Task calls, the migration plan included, in one coordinator response and let the runtime's scheduler decide the execution order.",
        why: [
          "Sai ở giả định: thứ tự chạy không cứu được dữ liệu chưa có. Subagent lập kế hoạch chỉ thấy prompt của nó (ý 1), mà lúc phát call thì hai kết quả kia chưa tồn tại để dán vào.",
          "Runtime chạy lần lượt hay song song thì prompt đó cũng đã viết xong, thiếu dữ liệu. Kế hoạch ra toàn đoán.",
          "Dễ bị cuốn vì runtime đúng là được tự chọn cách chạy một lô call, nghe như tối ưu. Nhưng docs chỉ khuyên gộp call độc lập (ý 2), mà việc thứ ba phụ thuộc hai việc kia."
        ] },
      { k: "B", gist: "Set <code>tool_choice</code> to <code>any</code> on the coordinator's requests so every response is guaranteed to hold more than one Task call.",
        why: [
          "Sai ở giả định: <code>any</code> chỉ ép gọi ít nhất một tool, không ép nhiều (ý 4).",
          "Cũng không đụng vấn đề nào của đề: không lo thứ tự, không lo call hỏng."
        ] },
      { k: "C", gist: "Emit the two independent investigation Task calls together in one coordinator response, and delegate the migration plan in a later turn after both results come back.",
        why: [
          "Lo thứ tự. Tìm API cũ và vẽ bản đồ phụ thuộc không cần nhau, nên gộp chung một response để chạy song song (ý 2).",
          "Kế hoạch migration giao ở lượt sau, khi đã có hai kết quả để dán vào prompt (ý 1). Subagent lập kế hoạch làm trên dữ liệu thật."
        ] },
      { k: "D", gist: "For the Task call that could not launch, return a <code>tool_result</code> with <code>is_error: true</code> in the same user message as the other results.",
        why: [
          "Lo call hỏng. Mọi <code>tool_use</code> đều cần một <code>tool_result</code>, gửi chung trong user message kế tiếp; call không chạy được thì đánh <code>is_error: true</code> (ý 3).",
          "Coordinator biết call nào hỏng, rồi tự quyết gọi lại hay làm tiếp với phần đã có. Bỏ sót kết quả thì API báo lỗi “tool_use ids were found without tool_result blocks immediately after” (có tool_use mà không có tool_result ngay sau)."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Chạy song song”: nhiều Task call trong một response; subagent chỉ biết điều có trong lời giao việc", href: NOTES + "#l-1-3" },
      { label: "Bài 2.0: tool lỗi vẫn trả tool_result kèm is_error", href: NOTES + "#l-2-0" },
      { label: "Docs “Parallel tool use”: mỗi tool_use một tool_result, gửi chung một message; call không chạy vẫn trả is_error; chỉ gộp call độc lập", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use" }
    ]
  },
  {
    de: 7, n: 33, total: 60, sub: "1.6", subName: "Chia việc lớn", scen: "S4",
    answer: "A",
    ask: "An agent scaffolds API endpoints from a single open-ended prompt. The steps never change: copy a template, write the code and tests, then update a registry. The number of tool calls varies widely from run to run, and the registry update is sometimes skipped. How should the team restructure this task?",
    scene: [
      "Agent dựng khung endpoint (scaffold) từ một prompt mở, để model tự quyết từng bước.",
      "Các bước lần nào cũng y nhau: chép template, viết code và test, cập nhật registry (sổ đăng ký endpoint).",
      "Triệu chứng: số tool call mỗi lần chạy chênh nhau nhiều, và có lần bỏ sót bước cập nhật registry.",
      "Chỗ khó: bước đã biết trước và cố định, mà đang để model tự điều khiển."
    ],
    asks: [
      "Team nên tổ chức lại việc này thế nào?",
      "Tức là: làm sao để đủ bước, đúng thứ tự, lần nào cũng vậy.",
      "Soi từng phương án: bước registry có được bảo đảm chạy không, hay vẫn trông vào model nhớ."
    ],
    facts: [
      "Prompt chaining (chuỗi lời gọi): các bước cố định nằm trong code, mỗi bước một lần gọi, output bước trước là input bước sau. Dùng khi liệt kê được các bước từ trước và bước sau cần bước trước.",
      "Prompt là xác suất, code là đảm bảo. Viết prompt mạnh hơn hay thêm ví dụ mẫu (few-shot) chỉ giảm tỉ lệ sai, không đưa về 0.",
      "Chạy song song (sectioning) chỉ hợp khi các việc con độc lập, không cần kết quả của nhau.",
      "<code>max_turns</code> (TypeScript: <code>maxTurns</code>) là trần số vòng của agent: dây an toàn chống chạy mãi, không quyết định bước nào được chạy."
    ],
    opts: [
      { k: "A", gist: "Rebuild the task as a fixed sequential pipeline with one call per step, so every step runs and runs in order.",
        why: [
          "Đúng mẫu prompt chaining (ý 1): bước biết trước, không đổi, bước sau cần bước trước.",
          "Thứ tự nằm trong code, nên bước registry lần nào cũng chạy (ý 2). Mỗi lần gọi chỉ lo một bước nên đơn giản hơn, số tool call cũng hết chênh lệch."
        ] },
      { k: "B", gist: "Spawn one parallel subagent per step, so the independent work finishes in the time of the slowest step.",
        why: [
          "Sai ở giả định: các bước không độc lập (ý 3). Test cần code đã viết, registry cập nhật sau cùng.",
          "Chạy cùng lúc thì phá luôn thứ tự đề đòi, còn tệ hơn hiện tại."
        ] },
      { k: "C", gist: "Add few-shot examples to the system prompt that show the complete, correct sequence of tool calls for a scaffold.",
        why: [
          "Ví dụ mẫu giúp model làm đúng thường xuyên hơn, nhưng vẫn là prompt, vẫn là xác suất (ý 2).",
          "Thỉnh thoảng bước registry vẫn bị bỏ. Đề đòi đủ bước mọi lần.",
          "Dễ bị cuốn vì few-shot là cách thật để model làm theo mẫu. Nhưng khi bước đã cố định thì đặt thứ tự vào code luôn, khỏi phải mong model làm theo."
        ] },
      { k: "D", gist: "Keep the open-ended loop but set <code>max_turns</code> to cap tool-use round trips, so no run grows unexpectedly long.",
        why: [
          "Chạy được, và đặt trần vòng là việc nên làm cho agent loop. Nhưng nó chỉ chặn lần chạy quá dài (ý 4).",
          "Không làm bước nào chạy chắc chắn. Registry vẫn có lúc bị sót, có khi còn bị cắt ngang vì chạm trần trước bước cuối."
        ] }
    ],
    refs: [
      { label: "Bài 1.6, mục “Biết thêm”: chọn kiểu chia bằng hai câu hỏi; liệt kê được và cần nhau thì prompt chaining", href: NOTES + "#l-1-6" },
      { label: "Bài 1.6, mục “Đã sửa 02/11”: năm mẫu workflow, prompt chaining là chuỗi bước cố định", href: NOTES + "#fix-17" },
      { label: "Bài 1.4: prompt là xác suất, code là đảm bảo", href: NOTES + "#l-1-4" }
    ]
  },
  {
    de: 7, n: 34, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code", scen: "S4",
    answer: "B",
    ask: "An MCP server wraps the team's module library and offers list and describe tools. Teams add new modules every week. The team wants the live inventory available as reference context before the agent makes any tool call. Which change achieves this?",
    scene: [
      "MCP server bọc thư viện module của team, có hai tool: liệt kê (list) và mô tả (describe).",
      "Tuần nào cũng có team thêm module mới, nên danh mục phải là bản đang sống (live), không phải bản chụp.",
      "Chỗ khó: đề đòi danh mục có sẵn làm context tham khảo “before the agent makes any tool calls” (trước khi agent gọi bất kỳ tool nào). Mọi cách dựa vào tool call đều trễ một nhịp."
    ],
    asks: [
      "Thay đổi nào đạt được điều đó?",
      "Tức là: danh mục phải vừa mới (theo kịp module thêm hằng tuần), vừa nằm sẵn trong context lúc agent bắt đầu, không cần agent tự gọi tool.",
      "Soi từng phương án theo hai tiêu chí: danh mục có mới không, và có sẵn trước tool call đầu tiên không."
    ],
    facts: [
      "MCP server phơi ra ba thứ: tools (hành động model tự quyết gọi), resources (dữ liệu tham khảo để đọc), prompts (mẫu). Catalog, schema, cây tài liệu là việc của resources.",
      "Spec MCP: resources là “application-driven” (do ứng dụng điều khiển). Host, tức ứng dụng chạy agent, tự quyết khi nào đọc resource và đưa vào context, không cần model gọi tool.",
      "Client lấy danh sách resource bằng <code>resources/list</code>, đọc nội dung bằng <code>resources/read</code>. Nội dung do server trả về mỗi lần được đọc, nên server dựng nó từ danh sách module hiện tại thì module mới tự có mặt.",
      "Mọi cách lấy dữ liệu bằng tool (ép gọi bằng <code>tool_choice</code>, hay gộp tool cho bớt lượt) vẫn là tool call model thực hiện trong phiên. Dữ liệu chỉ có sau call đó."
    ],
    opts: [
      { k: "A", gist: "Use <code>tool_choice</code> to force the list tool as the first call of every session, so discovery happens before any code is generated.",
        why: [
          "Chạy được: lần nào list cũng chạy đầu tiên, danh mục cũng mới. Nhưng nó vẫn là một tool call model thực hiện trong phiên (ý 4).",
          "Đề đòi danh mục có sẵn trước mọi tool call. Ép tool chạy đầu thì danh mục đến sau tool call đầu tiên, trễ đúng một nhịp.",
          "Dễ bị cuốn vì “first call in every session” (call đầu tiên ở mọi phiên) nghe như đã là “trước”. Nhưng chính nó là một tool call."
        ] },
      { k: "B", gist: "Expose the module catalog as an MCP resource that the host fetches and attaches, instead of having the agent probe with tools.",
        why: [
          "Danh mục module là dữ liệu tham khảo, đúng việc của resource (ý 1).",
          "Host đọc resource rồi gắn vào context lúc mở phiên (ý 2). Agent bắt đầu làm đã biết có những module nào, chưa cần gọi tool nào.",
          "Server dựng resource từ danh sách module hiện tại, nên module thêm tuần này tự có mặt (ý 3)."
        ] },
      { k: "C", gist: "Copy the current module catalog into the agent's system prompt, so every session begins with the full inventory already in context.",
        why: [
          "Đạt một nửa: danh mục có sẵn trong context trước mọi tool call.",
          "Nhưng đó là bản chụp. Tuần sau team thêm module thì system prompt đã cũ, agent làm việc trên danh mục thiếu. Trái yêu cầu “live inventory” (danh mục đang sống).",
          "Dễ bị cuốn vì đưa thông tin tham khảo vào prompt là cách hay dùng. Nhưng thông tin này đổi hằng tuần."
        ] },
      { k: "D", gist: "Merge the list and describe tools into a single discovery tool that returns module names and descriptions in one call.",
        why: [
          "Bớt được lượt gọi, dữ liệu cũng mới. Nhưng danh mục vẫn chỉ đến sau khi agent gọi tool (ý 4).",
          "Vẫn trượt yêu cầu “before any tool calls” (trước mọi tool call)."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, mục “Resource: để agent thấy có gì mà không phải mò”", href: NOTES + "#l-2-4" },
      { label: "Cheatsheet D2: dòng “Agent gọi tool liệt kê nhiều lần để biết có dữ liệu gì”", href: NOTES + "#cheat-d2" },
      { label: "Spec MCP, trang Resources: application-driven, resources/list, resources/read", href: "https://modelcontextprotocol.io/specification/2026-07-28/server/resources" }
    ]
  },
  {
    de: 7, n: 35, total: 60, sub: "1.5", subName: "Hook của Agent SDK: chặn tool call và chuẩn hóa dữ liệu", scen: "S4",
    answer: "B",
    ask: "A developer's PostToolUse hook on the Bash tool removes internal hostnames from command output and returns <code>updatedToolOutput</code> as a plain string. In testing, Claude still sees the original, unredacted output. What should the developer change?",
    scene: [
      "Dev viết hook PostToolUse cho tool Bash: lệnh chạy xong thì xóa tên máy nội bộ (internal hostname) khỏi output.",
      "Hook trả <code>updatedToolOutput</code> là một chuỗi text thường.",
      "Triệu chứng: khi test, Claude vẫn thấy output gốc, còn nguyên hostname. Hook có chạy mà như không.",
      "Chỗ khó: đã dùng đúng trường để thay output, vậy lỗi nằm ở dạng giá trị trả về."
    ],
    asks: [
      "Dev nên sửa gì?",
      "Tức là: vì sao bản thay thế bị bỏ qua, và làm sao để Claude chỉ thấy bản đã xóa hostname.",
      "Soi từng phương án: làm xong, Claude còn thấy output gốc không."
    ],
    facts: [
      "PostToolUse chạy sau khi tool chạy xong, trước khi kết quả tới Claude. <code>updatedToolOutput</code> thay hẳn kết quả tool; <code>additionalContext</code> chỉ nối thêm ghi chú bên cạnh.",
      "Docs Hooks: giá trị thay thế phải khớp hình dạng output của tool. Tool có sẵn (built-in) trả object có cấu trúc, không phải chuỗi: Bash trả object với <code>stdout</code>, <code>stderr</code>, <code>interrupted</code>, <code>isImage</code>. Không khớp schema thì bản thay bị bỏ qua, Claude nhận output gốc.",
      "Trong PostToolUse, <code>decision: \"block\"</code> chỉ thêm <code>reason</code> bên cạnh kết quả. Docs ghi: “Claude still sees the original output” (Claude vẫn thấy output gốc).",
      "PreToolUse chạy trước khi tool chạy. <code>updatedInput</code> sửa tham số đầu vào, tức là sửa lệnh, không sửa được thứ lệnh in ra."
    ],
    opts: [
      { k: "A", gist: "Move the redaction into a PreToolUse hook that returns <code>updatedInput</code>, rewriting each Bash command so it never prints hostnames.",
        why: [
          "Sai chỗ: <code>updatedInput</code> sửa lệnh trước khi chạy (ý 4). Hostname nằm trong thứ lệnh in ra, mà sửa chữ trong lệnh thì không kiểm soát được output.",
          "Lệnh nào cũng có thể in hostname (log, file cấu hình, kết quả ping). Không viết lại được mọi lệnh cho chắc."
        ] },
      { k: "B", gist: "Return the replacement as a structured object that matches the Bash tool's output shape, with the redacted text in the <code>stdout</code> field.",
        why: [
          "Đúng nguyên nhân: Bash là tool có sẵn, output là object (ý 2). Chuỗi thường không khớp schema nên bị bỏ qua, Claude nhận bản gốc. Khớp đúng triệu chứng đề kể.",
          "Trả object đúng hình, ví dụ minh họa:<pre><code>\"updatedToolOutput\": {\n  \"stdout\": \"[redacted]\",\n  \"stderr\": \"\",\n  \"interrupted\": false,\n  \"isImage\": false\n}</code></pre>Lúc này bản thay khớp schema, Claude chỉ thấy bản đã xóa hostname (ý 1).",
          "Docs còn ghi: output của tool MCP không bị kiểm schema. Vì vậy cùng kiểu trả chuỗi có thể chạy với tool MCP mà hỏng với Bash."
        ] },
      { k: "C", gist: "Return <code>decision</code> set to <code>block</code> with the redacted text as the reason, expecting the reason to take the place of the tool output.",
        why: [
          "Sai ở giả định: block trong PostToolUse không thay output, chỉ thêm <code>reason</code> bên cạnh (ý 3).",
          "Claude thấy cả bản đã xóa lẫn bản gốc còn hostname. Hostname vẫn lọt.",
          "Dễ bị cuốn vì “block” nghe như chặn luôn output. Nhưng lúc PostToolUse chạy thì tool đã chạy xong, block chỉ để báo thêm cho Claude."
        ] },
      { k: "D", gist: "Send the redacted text through <code>additionalContext</code>, so Claude receives the clean version next to the result.",
        why: [
          "Sai ở giả định: <code>additionalContext</code> chỉ nối thêm, không xóa hay thay gì (ý 1).",
          "Output gốc còn hostname vẫn tới Claude. Mục tiêu xóa hostname không đạt."
        ] }
    ],
    refs: [
      { label: "Bài 1.5, mục “Biết thêm”: updatedToolOutput thay hẳn kết quả, additionalContext chỉ nối thêm", href: NOTES + "#l-1-5" },
      { label: "Cheatsheet D1: dòng Hook (PreToolUse, PostToolUse, updatedToolOutput)", href: NOTES + "#cheat-d1" },
      { label: "Docs Claude Code Hooks, mục PostToolUse decision control: updatedToolOutput phải khớp hình dạng output của tool; block không thay output", href: "https://code.claude.com/docs/en/hooks" }
    ]
  },
  {
    de: 7, n: 36, total: 60, sub: "3.3", subName: "Rule theo đường dẫn trong .claude/rules", scen: "S4",
    answer: "A",
    ask: "A rule file in <code>.claude/rules/</code> holds architecture conventions and has a <code>paths</code> glob for source files. In long sessions, after compaction, the agent ignores those conventions until it next touches a matching file. The team needs the rule in effect on every turn, including turns that edit no files. What should they change?",
    scene: [
      "Quy ước kiến trúc nằm trong một rule ở <code>.claude/rules/</code>, có glob <code>paths</code> trỏ vào file nguồn.",
      "Phiên dài bị compact (nén lịch sử thành bản tóm tắt). Sau đó agent bỏ qua quy ước, tới khi đụng lại một file khớp glob mới làm theo.",
      "Team cần quy ước có hiệu lực ở mọi lượt, kể cả lượt chỉ bàn bạc, không sửa file nào.",
      "Chỗ khó: rule theo đường dẫn sinh ra để nạp có điều kiện, còn đề lại đòi nó lúc nào cũng có mặt."
    ],
    asks: [
      "Team nên đổi gì?",
      "Tức là: đặt quy ước ở đâu để sau compact nó có mặt ngay, không phải chờ đụng file.",
      "Soi từng phương án: sau compact, ở lượt không đụng file nào, quy ước có nằm trong context không."
    ],
    facts: [
      "Rule có <code>paths</code> chỉ nạp khi Claude đọc, ghi hoặc sửa file khớp glob. Không đụng file thì không nạp, glob rộng tới đâu cũng vậy.",
      "Docs Context window, mục What survives compaction: CLAUDE.md ở gốc project và rule không có <code>paths</code> được đọc lại từ đĩa và đưa vào lại sau compact. Rule có <code>paths</code> chỉ nạp lại khi cần, tức là khi đụng lại file khớp.",
      "Docs ghi thẳng: “If a rule must persist across compaction, drop the <code>paths:</code> frontmatter or move it to the project-root CLAUDE.md” (rule phải còn sau compact thì bỏ <code>paths:</code> hoặc chuyển vào CLAUDE.md gốc).",
      "Hook <code>InstructionsLoaded</code> chạy khi một CLAUDE.md hay file rule được nạp vào context. Nó không quyết định được gì, chỉ dùng để ghi log hay làm việc phụ, không ép được file nào nạp."
    ],
    opts: [
      { k: "A", gist: "Move the rule's content into the project-root <code>CLAUDE.md</code>, which is restored after compaction.",
        why: [
          "CLAUDE.md gốc nạp ở mọi phiên, và sau compact được đọc lại từ đĩa, đưa vào lại (ý 2). Quy ước có mặt ở mọi lượt, kể cả lượt không đụng file.",
          "Đúng cách docs chỉ cho rule phải còn sau compact (ý 3). Đổi lại quy ước chiếm context ở mọi phiên, nhưng đề đã nói nó áp dụng ở mọi lượt."
        ] },
      { k: "B", gist: "Run <code>/compact</code> with an instruction telling the summary to keep the rule's conventions.",
        why: [
          "Chạy được: lời dặn kèm <code>/compact</code> giúp bản tóm tắt giữ thứ mình chọn. Nhưng tóm tắt là nén có mất mát, quy ước bị viết lại gọn hơn, không còn là nguyên rule.",
          "Lời dặn gắn với lần <code>/compact</code> đó. Lần compact sau lại phải dặn, nên không bảo đảm mọi lượt.",
          "Dễ bị cuốn vì nó đánh đúng thời điểm hỏng là lúc compact. Nhưng thứ cần là rule được nạp lại, không phải bản tóm tắt nhắc tới rule."
        ] },
      { k: "C", gist: "Widen the rule's <code>paths</code> glob to <code>**/*</code> so file activity anywhere in the repository reloads it.",
        why: [
          "Sai ở giả định: glob rộng chỉ đổi file nào kích hoạt rule, rule vẫn nạp theo đường dẫn (ý 1).",
          "Lượt ngay sau compact mà không đụng file nào thì rule vẫn vắng mặt. Đúng lỗi team muốn sửa.",
          "Dễ bị cuốn vì <code>**/*</code> nghe như “áp cho mọi thứ”. Nhưng nó vẫn phải đụng file mới nạp; muốn lúc nào cũng có mặt thì bỏ hẳn <code>paths</code> (ý 3)."
        ] },
      { k: "D", gist: "Add an <code>InstructionsLoaded</code> hook with a <code>compact</code> matcher so the rule reloads after each compaction.",
        why: [
          "Sai ở giả định: <code>InstructionsLoaded</code> chỉ báo khi một file đã được nạp, không ép file nào nạp (ý 4).",
          "Rule theo đường dẫn chưa nạp thì hook cũng chẳng có gì để chạy. Lượt không đụng file vẫn thiếu quy ước."
        ] }
    ],
    refs: [
      { label: "Bài 3.3: rule có paths chỉ nạp khi đụng file khớp glob", href: NOTES + "#l-3-3" },
      { label: "Bài 3.1: CLAUDE.md gốc nạp ở mọi phiên", href: NOTES + "#l-3-1" },
      { label: "Docs “Explore the context window”, mục What survives compaction: rule có paths nạp lại khi cần; muốn còn sau compact thì bỏ paths hoặc chuyển vào CLAUDE.md gốc", href: "https://code.claude.com/docs/en/context-window" }
    ]
  },
  {
    de: 7, n: 37, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S4",
    answer: "BC",
    ask: "Yesterday an engineer ran a long codebase exploration session in a repository and never named it. Several unrelated sessions have run in that directory since then. Which two commands reopen that exact exploration session? (Choose two.)",
    scene: [
      "Hôm qua kỹ sư chạy một phiên dài khám phá codebase, không đặt tên cho phiên.",
      "Từ đó tới giờ đã có thêm vài phiên khác, không liên quan, chạy trong cùng thư mục.",
      "Chỗ khó: phiên cần mở không có tên, lại không còn là phiên gần nhất."
    ],
    asks: [
      "Hai lệnh nào mở lại đúng phiên khám phá đó?",
      "Tức là: cách nào chỉ đích danh được một phiên cũ, khi nó không có tên và đã có phiên mới hơn chạy sau.",
      "Soi từng phương án: lệnh đó mở phiên nào, phiên gần nhất, phiên vừa tạo, hay đúng phiên mình chỉ?"
    ],
    facts: [
      "<code>--continue</code> (<code>-c</code>) mở phiên gần nhất trong thư mục hiện tại. Không chọn được phiên cụ thể.",
      "<code>--resume</code> (<code>-r</code>) mở đúng phiên theo ID hoặc tên. Gọi không kèm phiên nào thì hiện danh sách phiên (picker) để chọn.",
      "Phiên nào cũng có session ID, kể cả phiên chưa đặt tên. Tên chỉ là nhãn cho người dễ nhớ.",
      "<code>/rename</code> đổi tên phiên đang mở, tức là phiên mày đang ngồi trong đó. <code>--name</code> (<code>-n</code>) đặt tên cho phiên đang khởi động."
    ],
    opts: [
      { k: "A", gist: "Run <code>claude --continue</code> in the repository, which reopens the previous conversation in that directory.",
        why: [
          "Sai ở giả định: <code>--continue</code> mở phiên gần nhất (ý 1). Sau phiên khám phá đã có vài phiên khác chạy, nên phiên gần nhất là một trong số đó.",
          "Kỹ sư mở nhầm một phiên không liên quan.",
          "Dễ bị cuốn vì <code>--continue</code> là cách nhanh nhất để quay lại việc dở. Nhưng nó chỉ đúng khi chưa có phiên nào chạy sau."
        ] },
      { k: "B", gist: "Run <code>claude --resume</code> with no session argument and choose the exploration session in the interactive picker.",
        why: [
          "<code>--resume</code> không kèm phiên thì hiện picker liệt kê các phiên cũ (ý 2). Kỹ sư nhìn danh sách, chọn đúng phiên khám phá hôm qua.",
          "Không cần tên, không cần nhớ ID."
        ] },
      { k: "C", gist: "Run <code>claude --resume</code> with the exploration session's session ID as the argument.",
        why: [
          "<code>--resume</code> nhận ID để mở đúng một phiên (ý 2). Phiên chưa đặt tên nhưng vẫn có ID (ý 3), nên ID chỉ đích danh nó.",
          "Phiên mới hơn chạy bao nhiêu cũng không ảnh hưởng."
        ] },
      { k: "D", gist: "Start a new session, run <code>/rename</code> with a chosen name, exit, then run <code>claude --resume</code> with that name.",
        why: [
          "Sai ở giả định: <code>/rename</code> đổi tên phiên đang mở (ý 4), ở đây là phiên mới vừa tạo, không phải phiên hôm qua.",
          "<code>--resume</code> với tên đó mở lại phiên mới gần như trống, không phải phiên khám phá.",
          "Dễ bị cuốn vì nghe như “đặt tên rồi resume theo tên”. Nhưng tên phải đặt cho đúng phiên, lúc phiên đó còn đang mở."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Biết thêm”: --continue mở phiên gần nhất, --resume mở đúng phiên theo id hoặc tên; đặt tên bằng --name hoặc /rename", href: NOTES + "#l-1-7" },
      { label: "Cheatsheet D1: dòng Phiên (--resume, --continue, đặt tên bằng -n, --name, /rename)", href: NOTES + "#cheat-d1" },
      { label: "Docs CLI reference: --resume theo ID hoặc tên, không kèm gì thì hiện picker; --continue mở phiên gần nhất trong thư mục", href: "https://code.claude.com/docs/en/cli-reference" }
    ]
  },
  {
    de: 7, n: 38, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S4",
    answer: "CD",
    ask: "Last week an engineer named a dependency investigation session <code>dep-audit</code>. Several unrelated sessions have run in this repository since. Which two actions reopen that specific investigation with its saved context? (Choose two.)",
    scene: [
      "Tuần trước kỹ sư điều tra dependency (gói phụ thuộc) trong một phiên, có đặt tên phiên là <code>dep-audit</code>.",
      "Sau đó repo đã chạy thêm vài phiên khác, không liên quan.",
      "Chỗ khó: lần này phiên có tên, nên các phương án xoay quanh việc dùng tên đó. Có lệnh nhận tên để tìm phiên cũ, có lệnh nhận tên để đặt cho phiên mới."
    ],
    asks: [
      "Hai cách nào mở lại đúng cuộc điều tra đó, còn nguyên context đã lưu?",
      "Tức là: lệnh nào tìm phiên cũ theo tên hoặc cho chọn từ danh sách, thay vì tạo phiên mới hay lấy phiên gần nhất.",
      "Soi từng phương án: lệnh đó đọc tên để tìm phiên cũ, hay để đặt tên cho phiên mới?"
    ],
    facts: [
      "<code>--continue</code> (<code>-c</code>) mở phiên gần nhất trong thư mục hiện tại.",
      "<code>--resume</code> (<code>-r</code>) mở đúng phiên theo ID hoặc tên; không kèm phiên nào thì hiện picker để chọn. Mở lại thì toàn bộ lịch sử phiên được nạp lại.",
      "Trong phiên đang chạy, <code>/resume [session]</code> cũng nhận ID hoặc tên để chuyển sang phiên đó, hoặc mở picker. Không phải thoát CLI.",
      "<code>--name</code> (<code>-n</code>) đặt tên hiển thị cho phiên đang khởi động. Docs: phiên có tên thì mở lại bằng <code>claude --resume &lt;tên&gt;</code>."
    ],
    opts: [
      { k: "A", gist: "Run <code>claude --name dep-audit</code> so Claude Code attaches to the saved session with that name.",
        why: [
          "Sai ở giả định: <code>--name</code> đặt tên cho phiên đang khởi động (ý 4), không đi tìm phiên cũ.",
          "Kết quả là một phiên mới tinh, trùng tên <code>dep-audit</code>, không có chút context nào của cuộc điều tra.",
          "Dễ bị cuốn vì có đúng cái tên. Nhưng tên đi với <code>--name</code> là để đặt, đi với <code>--resume</code> mới là để tìm."
        ] },
      { k: "B", gist: "Run <code>claude --continue</code> in the repository so Claude Code reloads the investigation with its context.",
        why: [
          "Sai ở giả định: <code>--continue</code> mở phiên gần nhất (ý 1). Sau tuần trước đã có vài phiên khác, nên nó mở một phiên trong số đó.",
          "Mở nhầm phiên, cuộc điều tra không quay lại."
        ] },
      { k: "C", gist: "From inside a running Claude Code session, run <code>/resume dep-audit</code> to switch to that saved conversation.",
        why: [
          "<code>/resume</code> trong phiên nhận tên để chuyển sang phiên đó (ý 3). Phiên đã có tên <code>dep-audit</code>, nên trỏ thẳng được.",
          "Không cần thoát CLI, lịch sử cuộc điều tra được nạp lại."
        ] },
      { k: "D", gist: "Run <code>claude --resume</code> with no session argument and pick <code>dep-audit</code> in the interactive session picker.",
        why: [
          "<code>--resume</code> không kèm phiên thì hiện picker (ý 2). Phiên có tên nên dễ nhận ra <code>dep-audit</code> trong danh sách.",
          "Chọn xong là mở đúng phiên với toàn bộ lịch sử đã lưu."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Biết thêm”: --continue khác --resume; đặt tên phiên bằng -n, --name hoặc /rename", href: NOTES + "#l-1-7" },
      { label: "Docs CLI reference: --resume theo ID, tên hoặc picker; --name đặt tên hiển thị cho phiên", href: "https://code.claude.com/docs/en/cli-reference" },
      { label: "Docs Commands: /resume [session] nhận ID hoặc tên, hoặc mở picker", href: "https://code.claude.com/docs/en/commands" }
    ]
  },
  {
    de: 7, n: 39, total: 60, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool", scen: "S4",
    answer: "B",
    ask: "Agents from several teams call the same MCP tool, which denies production schema changes that lack an approved change ticket. The denial sets <code>isError: true</code> plus the team's own <code>retriable: false</code> field, so agents correctly stop retrying. But the error content holds only internal rule IDs, so agents tell engineers that an unknown error occurred. The policy engine adds new rules every month. Which change fixes this?",
    scene: [
      "Một tool MCP dùng chung cho agent của nhiều team. Nó từ chối mọi thay đổi schema production không có change ticket (phiếu thay đổi) đã duyệt.",
      "Phần đã đúng: lỗi có <code>isError: true</code> và trường tự đặt <code>retriable: false</code> (cùng ý <code>isRetryable</code> trong guide), nên agent không thử lại.",
      "Phần hỏng: nội dung lỗi chỉ có mã rule nội bộ. Agent không hiểu, nên báo kỹ sư “unknown error” (lỗi không rõ).",
      "Chỗ khó: policy engine (bộ máy luật) thêm rule mới mỗi tháng, và nhiều agent cùng gọi tool này."
    ],
    asks: [
      "Thay đổi nào sửa được chuyện này?",
      "Tức là: làm sao để agent nào cũng giải thích được vì sao bị từ chối và kỹ sư nên làm gì tiếp, kể cả với rule mới.",
      "Soi từng phương án: sửa ở một chỗ hay phải sửa ở mọi agent; rule mới tháng sau có tự được giải thích không."
    ],
    facts: [
      "Agent quyết bước tiếp theo và câu trả lời cho người dựa vào nội dung tool result. Docs Handle tool calls: lỗi trả về kèm <code>is_error</code> thì Claude đưa lỗi đó vào câu trả lời cho người dùng, và docs khuyên viết lỗi nói rõ chuyện gì sai, nên làm gì tiếp.",
      "Lỗi có cấu trúc theo guide gồm loại lỗi, cờ có thử lại được không, và một câu mô tả dễ hiểu. Lỗi business (vi phạm luật nghiệp vụ) không thử lại, kèm sẵn lời giải thích để agent nói lại.",
      "Lỗi validation (input sai) thì sửa input rồi gọi lại được. Lỗi business thì không: đổi tham số cũng không qua, vì thiếu thứ người phải làm (duyệt ticket).",
      "Nội dung lỗi nằm ở tool, nên mọi agent gọi tool đều đọc cùng một chỗ. Sửa ở prompt thì phải chép ra từng agent và cập nhật mỗi khi có rule mới."
    ],
    opts: [
      { k: "A", gist: "Label the denial as a validation error with a hint naming the missing ticket parameter, so the agent retries with corrected input.",
        why: [
          "Sai loại lỗi: thiếu ticket đã duyệt là chuyện luật nghiệp vụ, không phải input sai (ý 3). Việc duyệt do người làm, đổi tham số nào cũng không qua.",
          "Còn tệ hơn: mời agent thử lại vô ích, mà kỹ sư vẫn không biết phải đi xin duyệt ticket."
        ] },
      { k: "B", gist: "Write a plain-language reason for the denial and the approved next step into the error content, so any agent can relay both.",
        why: [
          "Nội dung lỗi là thứ agent đọc và nói lại với người (ý 1). Ghi rõ “bị chặn vì chưa có change ticket đã duyệt, hãy tạo ticket” thì agent giải thích được và chỉ đúng đường cho kỹ sư.",
          "Đúng phần “câu mô tả dễ hiểu” của lỗi business (ý 2). Sửa ở tool nên mọi agent cùng hưởng, rule mới cũng có câu dễ hiểu ngay từ nguồn (ý 4)."
        ] },
      { k: "C", gist: "Add a table to every agent's system prompt that maps each internal rule ID to a friendly message the agent can show engineers.",
        why: [
          "Chạy được với những mã đã có trong bảng.",
          "Nhưng nhiều agent cùng gọi tool, bảng phải chép vào prompt từng agent (ý 4). Rule mới mỗi tháng thì mã nào chưa kịp thêm lại thành “unknown error” như cũ.",
          "Dễ bị cuốn vì nó dịch được đúng thứ đang thiếu. Nhưng dịch ở sai chỗ: chỗ mọi agent cùng đọc là nội dung lỗi của tool."
        ] },
      { k: "D", gist: "Include the policy engine's full rejection payload, with links to the rule documentation, so the agent loses no detail about the denial.",
        why: [
          "Thêm dữ liệu nội bộ không làm lỗi dễ hiểu hơn. Payload viết cho policy engine đọc, không phải cho kỹ sư.",
          "Vấn đề không phải thiếu chi tiết mà thiếu một câu viết cho người. Agent vẫn không biết nói gì, kỹ sư vẫn không biết làm gì tiếp."
        ] }
    ],
    refs: [
      { label: "Bài 2.2: lỗi có cấu trúc; lỗi business kèm sẵn lời giải thích để agent nói lại với khách", href: NOTES + "#l-2-2" },
      { label: "Cheatsheet D2: bốn errorCategory, cờ isRetryable, isError của MCP", href: NOTES + "#cheat-d2" },
      { label: "Docs “Handle tool calls”, mục Handling errors with is_error: Claude đưa lỗi vào câu trả lời; viết lỗi nói rõ chuyện gì sai và nên làm gì tiếp", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls" }
    ]
  },
  {
    de: 7, n: 40, total: 60, sub: "1.4", subName: "Workflow nhiều bước có cổng chặn và bàn giao", scen: "S4",
    answer: "A",
    ask: "The agent escalates stuck tasks to an on-call engineer through an <code>escalate_to_engineer</code> MCP tool that takes a single free-text <code>message</code> field. The prompt already lists the required details, yet escalations often leave out the files examined and the fixes attempted. What change makes every handoff reliably complete?",
    scene: [
      "Agent gặp việc kẹt thì chuyển cho kỹ sư trực (on-call) qua tool MCP <code>escalate_to_engineer</code>. Tool chỉ có một trường text tự do <code>message</code>.",
      "Prompt đã liệt kê đủ những gì phải ghi, nhưng nhiều lần chuyển vẫn thiếu file đã xem và cách sửa đã thử.",
      "Chỗ khó: cách dặn bằng prompt đã thử rồi và không đủ. Đề đòi “reliably complete” (đủ một cách chắc chắn)."
    ],
    asks: [
      "Thay đổi nào làm mỗi gói bàn giao luôn đủ?",
      "Tức là: đưa yêu cầu “phải có file đã xem, cách đã thử” ra khỏi prompt, đặt vào chỗ ép được.",
      "Soi từng phương án: nó ép hay chỉ dặn; và nó có đưa đúng thứ đang thiếu tới tay kỹ sư không."
    ],
    facts: [
      "Người nhận ca không đọc được phiên của agent. Gói bàn giao (handoff) phải tự đủ: nguyên nhân gốc, việc đã làm, đề xuất xử lý, đọc xong là làm được ngay.",
      "Prompt là xác suất, code là đảm bảo. Thêm lời dặn hay ví dụ mẫu chỉ giảm tỉ lệ sót, không đưa về 0.",
      "<code>input_schema</code> của tool khai các trường và trường nào <code>required</code> (bắt buộc). Claude điền theo schema. Thiếu trường bắt buộc là call không hợp lệ: tool trả lỗi thì Claude gọi lại, điền đủ. Với tool tự khai trên Messages API, bật <code>strict: true</code> thì input luôn khớp schema."
    ],
    opts: [
      { k: "A", gist: "Replace the free-text field with an input schema that requires separate fields for files examined, root cause analysis, fixes attempted, and a recommended action.",
        why: [
          "Đưa yêu cầu từ prompt vào schema của tool (ý 3). Mỗi mục đang hay thiếu thành một trường <code>required</code>, không điền thì call không hợp lệ.",
          "Đó là ép bằng giao diện tool, không còn trông vào model nhớ lời dặn (ý 2). Gói bàn giao nào cũng có file đã xem, cách đã thử, đúng thứ kỹ sư cần để làm tiếp (ý 1)."
        ] },
      { k: "B", gist: "Add few-shot examples of complete escalations to the system prompt, showing the files, analysis, and recommended action each handoff should include.",
        why: [
          "Ví dụ mẫu là cách tốt để định hình output, nhưng vẫn là prompt, vẫn là xác suất (ý 2).",
          "Đề đã kể prompt liệt kê đủ chi tiết mà vẫn sót. Thêm prompt nữa thì sót ít hơn, không hết.",
          "Dễ bị cuốn vì few-shot hay là đáp án đúng khi output lệch định dạng. Nhưng đề đòi “reliably” (chắc chắn), mà prompt đã thất bại, nên phải ép ở chỗ khác."
        ] },
      { k: "C", gist: "Attach the agent's full session transcript and raw tool outputs to every escalation, so the engineer receives every detail the agent gathered.",
        why: [
          "Đủ dữ liệu thô, nhưng không phải gói bàn giao. Kỹ sư phải đọc lại cả phiên mới tìm ra file nào đã xem, cách nào đã thử.",
          "Tức là điều tra lại từ đầu, trái ý gói bàn giao tự đủ, đọc xong là làm được (ý 1)."
        ] },
      { k: "D", gist: "Have the agent add a severity rating and a self-rated confidence score to each escalation, so engineers can triage before investigating.",
        why: [
          "Mức nghiêm trọng và độ tự tin giúp xếp thứ tự ca, nhưng không thêm chi tiết đang thiếu.",
          "Ca được xếp đúng thứ tự vẫn bắt kỹ sư tự tìm lại file đã xem và cách đã thử (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 1.4: gói bàn giao phải tự đủ; luật bắt buộc thì ép bằng code, không nhờ prompt", href: NOTES + "#l-1-4" },
      { label: "Bài 4.0, bảng schema: required là trường bắt buộc; bật strict: true thì chắc đủ trường", href: NOTES + "#l-4-0" },
      { label: "Docs “Handle tool calls”, mục Invalid tool name: thiếu tham số bắt buộc là call không hợp lệ; strict: true để input luôn khớp schema", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls" }
    ]
  },
  {
    de: 7, n: 41, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code", scen: "S4",
    answer: "D",
    ask: "A committed <code>.mcp.json</code> configures a remote HTTP MCP server. Its <code>headers</code> block sets <code>Authorization</code> to <code>Bearer ${ANTHROPIC_AUTH_TOKEN}</code>, since every engineer already exports that variable. Connections fail with HTTP 401, although the variable is set in every shell. Which change fixes authentication?",
    scene: [
      "File <code>.mcp.json</code> commit trong repo khai một MCP server HTTP ở xa. Header <code>Authorization</code> ghi <code>Bearer ${ANTHROPIC_AUTH_TOKEN}</code>.",
      "Team chọn biến này vì máy ai cũng đã export (đặt sẵn) nó, khỏi phải tạo biến mới.",
      "Chỗ khó: biến có giá trị ở mọi shell, cú pháp <code>${VAR}</code> cũng đúng, vậy mà server vẫn trả 401 (từ chối vì thiếu hoặc sai thông tin xác thực). Lỗi không nằm ở cú pháp mà ở chính cái tên biến."
    ],
    asks: [
      "Đổi gì thì xác thực chạy được?",
      "Tức là: vì sao header tới server không mang token dù biến đã đặt, và sửa ở đâu.",
      "Soi từng phương án: sau khi đổi, header gửi tới server có thật sự chứa token không?"
    ],
    facts: [
      "Claude Code thay <code>${VAR}</code> bằng giá trị biến môi trường ở các trường <code>command</code>, <code>args</code>, <code>env</code>, <code>url</code>, <code>headers</code>. Có thêm dạng <code>${VAR:-default}</code>: biến chưa đặt thì lấy giá trị mặc định.",
      "Riêng ở <code>url</code> và <code>headers</code> của server ở xa, Claude Code đọc một nhóm biến chứa credential (thông tin xác thực) thành rỗng, đặt hay chưa đặt cũng vậy, và bỏ qua luôn <code>:-default</code>. Nhóm này gồm credential của chính Claude Code như <code>ANTHROPIC_API_KEY</code>, <code>ANTHROPIC_AUTH_TOKEN</code>. Mục đích: một <code>.mcp.json</code> trong repo không lén gửi credential của mày sang server nó trỏ tới.",
      "Docs nói thẳng: viết <code>Bearer ${ANTHROPIC_AUTH_TOKEN}</code> thì server nhận <code>Bearer </code> trống và thường trả 401. Tên nằm ngoài nhóm đó thì được thay bình thường. Muốn đưa một credential trong nhóm cho server, chép nó sang biến tên khác rồi tham chiếu tên đó.",
      "Server HTTP ở xa nhận xác thực qua <code>headers</code>. Trường <code>env</code> đặt biến môi trường cho tiến trình server mà Claude Code tự chạy trên máy (server stdio), không biến thành header gửi đi."
    ],
    opts: [
      { k: "A", gist: "Have every engineer run <code>claude mcp reset-project-choices</code> so the project-scoped server gets approved again under the current shell environment.",
        why: [
          "Sai cơ chế: server trong <code>.mcp.json</code> phải được từng người duyệt trước khi kết nối, và lệnh này chỉ xóa các lựa chọn duyệt để Claude Code hỏi lại. Duyệt quyết định có kết nối hay không.",
          "401 nghĩa là đã kết nối, request đã tới server và bị từ chối vì credential. Duyệt lại không đổi gì trong header, server vẫn nhận <code>Bearer </code> trống (ý 2)."
        ] },
      { k: "B", gist: "Move the <code>${ANTHROPIC_AUTH_TOKEN}</code> reference out of <code>headers</code> and into the server entry's <code>env</code> block, since expansion works there as well.",
        why: [
          "Đúng là <code>env</code> có thay biến (ý 1), và luật đọc thành rỗng không áp lên <code>env</code>. Nhưng với server ở xa, <code>env</code> không được gửi đi đâu cả (ý 4).",
          "Server HTTP không phải tiến trình Claude Code chạy trên máy. Token chuyển sang <code>env</code> thì header mất luôn <code>Authorization</code>, server vẫn trả 401.",
          "Dễ bị cuốn vì nửa đầu đúng: expansion chạy được ở <code>env</code>. Nhưng thay được biến ở đó không có nghĩa là token tới được server."
        ] },
      { k: "C", gist: "Keep the same variable but write it as <code>${ANTHROPIC_AUTH_TOKEN:-PLACEHOLDER_TOKEN}</code>, so the header gets a fallback whenever expansion comes back empty.",
        why: [
          "Sai ở giả định: với tên trong nhóm credential, <code>:-default</code> bị bỏ qua (ý 2). Header vẫn là <code>Bearer </code> trống.",
          "Mà kể cả lấy được fallback, <code>PLACEHOLDER_TOKEN</code> là chuỗi giả, server vẫn từ chối. Notes còn dặn: đừng đặt giá trị mặc định cho secret."
        ] },
      { k: "D", gist: "Copy the token into a variable with another name, such as <code>MCP_SEARCH_TOKEN</code>, and reference <code>${MCP_SEARCH_TOKEN}</code> in <code>headers</code>.",
        why: [
          "<code>MCP_SEARCH_TOKEN</code> nằm ngoài nhóm credential, nên Claude Code thay đúng giá trị (ý 3). Header thành <code>Bearer &lt;token thật&gt;</code>, server nhận.",
          "Đây đúng cách docs chỉ: chép credential sang biến tên của mình rồi tham chiếu tên đó. File vẫn commit được, token vẫn chỉ nằm trên máy từng người."
        ] }
    ],
    refs: [
      { label: "Bài 2.4: env var expansion trong .mcp.json, secret để đâu", href: NOTES + "#l-2-4" },
      { label: "Bài 2.4, mục “Đã sửa 03/11”: server trong .mcp.json phải được duyệt, reset-project-choices để được hỏi lại", href: NOTES + "#fix-22" },
      { label: "Docs “Connect Claude Code to tools via MCP”, mục Credential variables that read as empty: ANTHROPIC_AUTH_TOKEN trong url/headers đọc thành rỗng, :-default bị bỏ qua", href: "https://code.claude.com/docs/en/mcp" }
    ]
  },
  {
    de: 7, n: 42, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code", scen: "S4",
    answer: "D",
    ask: "The <code>find_references</code> MCP tool ships a generated description of 7,000 characters. Parameter details come first; the part saying what the tool returns and when to pick it over Grep comes last. Claude Code truncates the descriptions of tools loaded at session start to 4,096 characters, and the agent keeps choosing Grep. What is the most direct fix?",
    scene: [
      "Tool MCP <code>find_references</code> có description tự sinh dài 7.000 ký tự.",
      "Thứ tự trong description: chi tiết tham số trước. Đoạn nói tool trả về gì, khi nào nên dùng thay Grep thì nằm cuối.",
      "Claude Code cắt description của tool nạp lúc mở phiên ở 4.096 ký tự. Agent cứ chọn Grep.",
      "Chỗ khó: description không thiếu thông tin. Thông tin có đủ, chỉ là nằm sau chỗ bị cắt, nên Claude không bao giờ đọc tới."
    ],
    asks: [
      "Cách sửa trực tiếp nhất là gì?",
      "Tức là: làm sao cho đoạn giúp Claude chọn tool (làm gì, trả về gì, khi nào hơn Grep) lọt vào phần Claude thấy được.",
      "Soi từng phương án: nó có đưa đoạn đó vào phần Claude đọc không, và sửa ở gốc (server dùng chung) hay chỉ vá trên từng máy?"
    ],
    facts: [
      "Claude chọn tool chủ yếu dựa vào description. MCP tool tả kém thì agent quay về built-in tool nó hiểu rõ hơn, như Grep.",
      "Claude Code cắt description vượt giới hạn, và Claude chỉ thấy phần trước chỗ cắt. Với tool nạp sẵn từ đầu phiên, giới hạn là 4.096 ký tự. Docs dặn đặt chi tiết quan trọng gần đầu.",
      "<code>CLAUDE_CODE_MAX_MCP_DESCRIPTION_LENGTH</code> là biến môi trường đổi giới hạn đó cho các MCP server trong phiên của người đặt biến. Máy nào không đặt thì vẫn cắt ở 4.096.",
      "<code>anthropic/alwaysLoad</code> trong <code>_meta</code> của tool chỉ quyết định tool nạp sẵn từ đầu hay chờ tool search tìm tới. Tool nạp sẵn vẫn chịu giới hạn 4.096."
    ],
    opts: [
      { k: "A", gist: "Have each engineer set the <code>CLAUDE_CODE_MAX_MCP_DESCRIPTION_LENGTH</code> environment variable on their machine to raise the limit.",
        why: [
          "Chạy được: trên máy đã đặt biến, Claude thấy đủ 7.000 ký tự (ý 3).",
          "Nhưng đó là vá trên từng máy. Đồng đội nào chưa đặt, hay máy mới dựng, vẫn bị cắt ở 4.096 và vẫn chọn Grep. Mỗi phiên còn tốn thêm vài nghìn ký tự context cho chi tiết tham số.",
          "Dễ bị cuốn vì nó là cơ chế thật và đánh đúng con số 4.096. Nhưng đề hỏi cách trực tiếp nhất, mà gốc lỗi là thứ tự trong description, không phải giới hạn."
        ] },
      { k: "B", gist: "Set the <code>anthropic/alwaysLoad</code> metadata flag on the tool so its full definition loads at session start.",
        why: [
          "Sai cơ chế: cờ này chỉ quyết định nạp sẵn hay chờ tool search (ý 4). Tool này vốn đã nạp lúc mở phiên.",
          "Nạp sẵn vẫn cắt ở 4.096, nên đoạn hướng dẫn ở cuối vẫn mất."
        ] },
      { k: "C", gist: "Add a <code>CLAUDE.md</code> rule telling the agent to always prefer <code>find_references</code> over Grep when searching code.",
        why: [
          "Chỉ là lời dặn. Claude có thể làm theo, nhưng vẫn không biết tool trả về gì, ranh giới với Grep ở đâu, vì đoạn đó vẫn nằm sau chỗ cắt (ý 2).",
          "“always prefer” (luôn ưu tiên) còn đẩy agent dùng <code>find_references</code> cả ở chỗ Grep hợp hơn, như tìm một chuỗi text. Sửa triệu chứng, không sửa description."
        ] },
      { k: "D", gist: "Rewrite the description so the tool's purpose, the data it returns, and the Grep guidance come before the parameter details.",
        why: [
          "Đoạn giúp chọn tool lên đầu, lọt trong 4.096 ký tự đầu, nên Claude đọc được dù bị cắt (ý 2). Đúng lời docs: chi tiết quan trọng đặt gần đầu.",
          "Claude giờ biết tool làm gì, trả về gì, khi nào hơn Grep, nên có lý do để chọn nó (ý 1).",
          "Sửa ngay ở server, nên mọi người dùng chung đều được, không phụ thuộc máy ai đặt biến gì."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, mục “Vì sao agent thích Grep hơn MCP tool”: sửa bằng description chi tiết", href: NOTES + "#l-2-4" },
      { label: "Bài 2.4, mục “Đã sửa 03/11”: tool search và alwaysLoad", href: NOTES + "#fix-24" },
      { label: "Docs “Connect Claude Code to tools via MCP”, mục For MCP server authors: giới hạn 4.096 ký tự, đặt chi tiết quan trọng ở đầu, CLAUDE_CODE_MAX_MCP_DESCRIPTION_LENGTH", href: "https://code.claude.com/docs/en/mcp" }
    ]
  },
  {
    de: 7, n: 43, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code", scen: "S4",
    answer: "D",
    ask: "The agent needs two new integrations: reading Jira issues for task context, and querying an internal deployment tracker that only this team uses. Integration time is limited. How should the team build or source these integrations?",
    scene: [
      "Agent cần hai tích hợp mới: đọc issue Jira để lấy bối cảnh việc, và truy vấn một hệ theo dõi deploy nội bộ chỉ team này dùng.",
      "Ràng buộc: “integration time is limited” (thời gian làm tích hợp có hạn).",
      "Chỗ khó: hai hệ khác hẳn nhau. Jira là hệ phổ biến, ai cũng dùng. Hệ deploy là đồ riêng, ngoài team không ai biết tới. Một cách làm chung cho cả hai khó mà hợp."
    ],
    asks: [
      "Team nên tự viết hay lấy sẵn hai tích hợp này thế nào?",
      "Tức là: với từng hệ, dùng thứ có sẵn hay tự viết, khi thời gian có hạn.",
      "Soi từng phương án: agent có được tool mô tả rõ không, và có tốn công viết lại thứ đã có không?"
    ],
    facts: [
      "Tích hợp phổ biến như Jira, GitHub, Slack đã có MCP server viết sẵn, do nhà cung cấp hoặc cộng đồng bảo trì. Chỉ tự viết server cho workflow đặc thù của team.",
      "Docs Claude Code trỏ tới Anthropic Directory, nơi liệt kê các connector đã được review, thêm vào bằng <code>claude mcp add</code>.",
      "Tool MCP có tên, description và input schema, nên agent biết khi nào gọi và gọi thế nào. Lỗi trả về có cấu trúc (<code>isError</code>). Gọi REST qua Bash thì không có mấy thứ đó.",
      "<code>create_sdk_mcp_server</code> của Agent SDK tạo MCP server chạy ngay trong tiến trình ứng dụng, để định nghĩa tool riêng của ứng dụng. Muốn nối server ngoài như GitHub, Slack thì docs chỉ sang cách kết nối, thay vì tự viết."
    ],
    opts: [
      { k: "A", gist: "Have the agent call both systems' REST APIs through the Bash tool, so no MCP server needs to be set up.",
        why: [
          "Chạy được về mặt kỹ thuật, nhưng agent mất tool có mô tả, có schema, có lỗi trả về có cấu trúc (ý 3).",
          "Agent phải tự nhớ endpoint, tự ghép lệnh curl, tự đọc lỗi thô. Tiết kiệm được lúc dựng, trả giá bằng những lần gọi kém ổn định về sau."
        ] },
      { k: "B", gist: "Build custom MCP servers for both systems, so every tool's name and description uses the team's own terminology.",
        why: [
          "Sai ở chỗ viết lại server Jira, thứ đã có sẵn (ý 1). Đề nói thời gian có hạn, công đó đáng lẽ dồn cho hệ deploy.",
          "Viết xong còn phải tự bảo trì mỗi lần Jira đổi API.",
          "Dễ bị cuốn vì description đúng là thứ quyết định agent chọn tool, và tự viết thì chỉnh được từng chữ. Nhưng đề không kể connector Jira tả kém. Lợi ích đó không đáng bằng thời gian bỏ ra."
        ] },
      { k: "C", gist: "Define in-process tools for both systems with the Agent SDK's <code>create_sdk_mcp_server</code>, keeping every integration in one codebase.",
        why: [
          "<code>create_sdk_mcp_server</code> là tính năng thật, dành cho tool riêng của ứng dụng (ý 4). Hệ deploy nội bộ thì hợp, Jira thì không.",
          "Viết lại tích hợp Jira trong tiến trình vẫn là tự viết thứ đã có sẵn (ý 1). Tốn đúng thứ đề nói đang thiếu: thời gian."
        ] },
      { k: "D", gist: "Connect an existing, reviewed MCP connector for Jira, and build a custom MCP server only for the internal deployment tracker.",
        why: [
          "Jira là tích hợp phổ biến, đã có connector được review (ý 1, ý 2). Nối vào là dùng được ngay, người khác lo bảo trì.",
          "Hệ deploy chỉ team này dùng, không ai viết sẵn. Đây đúng là ca đáng tự viết server.",
          "Thời gian có hạn dồn hết cho phần không có cách nào khác ngoài tự làm."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, cuối mục “Resource”: tích hợp phổ biến dùng community server, chỉ tự viết server cho workflow đặc thù", href: NOTES + "#l-2-4" },
      { label: "Tóm tắt Domain 2: community server cho tích hợp chuẩn", href: NOTES + "#sum-d2" },
      { label: "Docs “Connect Claude Code to tools via MCP”: Anthropic Directory, và trang hướng dẫn khi muốn tự build server", href: "https://code.claude.com/docs/en/mcp" }
    ]
  },
  {
    de: 7, n: 44, total: 60, sub: "1.3", subName: "Gọi subagent, truyền context", scen: "S4",
    answer: "C",
    ask: "After dozens of tool calls mapping a legacy module's naming and error-handling conventions, the agent spawns a code-generation subagent. The boilerplate that comes back ignores every convention the agent found. The team cannot afford to repeat that exploration. What should you change?",
    scene: [
      "Agent chính bỏ ra hàng chục tool call để dò quy ước đặt tên và cách bắt lỗi của một module cũ.",
      "Xong nó gọi một subagent sinh code. Code mẫu sinh ra bỏ qua mọi quy ước vừa tìm được.",
      "Ràng buộc: “cannot afford to repeat that exploration” (không thể dò lại từ đầu).",
      "Chỗ khó: quy ước đang nằm trong context của agent chính. Nhìn từ ngoài thì tưởng subagent chạy “cùng phiên” nên phải biết. Thật ra nó không thấy gì."
    ],
    asks: [
      "Nên đổi gì?",
      "Tức là: làm sao đưa kết quả dò của agent chính sang subagent, mà không bắt nó dò lại.",
      "Soi từng phương án: thông tin có thật sự tới được subagent không, và có phải dò lại không?"
    ],
    facts: [
      "Subagent khởi động với context trống: chỉ có system prompt của chính nó và lời giao việc. Nó không thấy lịch sử hội thoại, kết quả tool hay system prompt của agent chính.",
      "Lời giao việc (prompt truyền vào tool Agent, guide gọi là Task) là thông tin duy nhất subagent nhận về việc cần làm. Muốn nó dùng thứ agent chính đã tìm được, phải viết thẳng vào đó.",
      "Notes ghi rõ: thứ bên chính đã biết không tự tới subagent. Resume phiên, thêm tool hay sửa system prompt đều không giúp.",
      "Resume là tiếp tục phiên cũ của chính agent đó, với lịch sử của nó. Một subagent mới tạo chưa có phiên cũ nào để tiếp."
    ],
    opts: [
      { k: "A", gist: "Pass the current session ID into the subagent invocation so it resumes with the parent conversation's accumulated history.",
        why: [
          "Sai ở giả định: resume là tiếp phiên cũ của chính agent đó (ý 4). Subagent sinh code này mới tạo, không có phiên cũ.",
          "Session ID không ghép lịch sử của agent chính vào subagent mới. Nó vẫn khởi động trống (ý 1, ý 3)."
        ] },
      { k: "B", gist: "Put the convention summary into the parent agent's system prompt, since subagents receive the parent's system prompt when they start.",
        why: [
          "Sai ở giả định: subagent chạy bằng system prompt của chính nó, không nhận system prompt của agent chính (ý 1).",
          "Bản tóm tắt nằm ở agent chính, subagent vẫn không thấy. Code sinh ra vẫn sai quy ước như cũ.",
          "Dễ bị cuốn vì nghe như đặt quy ước ở “tầng trên” để tầng dưới thừa hưởng. Nhưng subagent không thừa hưởng gì, kể cả system prompt."
        ] },
      { k: "C", gist: "Include a summary of the discovered conventions, with the relevant file paths, in the Agent tool prompt that spawns the subagent.",
        why: [
          "Lời giao việc là kênh duy nhất từ agent chính sang subagent (ý 2). Viết quy ước vào đó thì subagent có ngay, không phải dò.",
          "Kèm đường dẫn file để khi cần xem kỹ, subagent mở đúng chỗ thay vì đi tìm lại cả module.",
          "Thỏa ràng buộc của đề: dùng lại kết quả đã dò, không lặp lại hàng chục tool call."
        ] },
      { k: "D", gist: "Add Read and Grep to the subagent's allowed tools so it can locate and read the convention files in the module on its own.",
        why: [
          "Chạy được: có Read, Grep thì subagent tự dò ra quy ước, sớm muộn gì cũng xong.",
          "Nhưng làm vậy là lặp lại hàng chục tool call agent chính đã làm, trái thẳng ràng buộc “cannot afford to repeat”. Dò lại còn có thể ra kết luận khác.",
          "Dễ bị cuốn vì cho subagent đủ tool là cách làm tốt. Nhưng ở đây thứ nó thiếu là kết quả có sẵn, không phải công cụ để tìm."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, khung khái niệm: subagent khởi động trống, lời giao việc là thông tin duy nhất nó nhận", href: NOTES + "#l-1-3" },
      { label: "Bài 1.2, mục “Biết thêm”: thứ bên chính đã biết không tự tới subagent; resume, thêm tool, sửa system prompt đều không giúp", href: NOTES + "#l-1-2" }
    ]
  },
  {
    de: 7, n: 45, total: 60, sub: "1.6", subName: "Chia việc lớn", scen: "S4",
    answer: "B",
    ask: "A team is building a two-stage audit of legacy modules: a quick scan flags risky modules, then a deep analysis examines the flagged ones. Compliance requires the application to store each stage's output as a separate audit record, and the deep analysis must never run when the scan flags nothing. Which design meets both requirements?",
    scene: [
      "Team làm audit module cũ hai bước: quét nhanh để đánh dấu module rủi ro, rồi phân tích sâu các module bị đánh dấu.",
      "Yêu cầu 1 (compliance, tức quy định tuân thủ): ứng dụng phải lưu output của mỗi bước thành một bản ghi audit riêng.",
      "Yêu cầu 2: bước phân tích sâu “must never run” (không bao giờ được chạy) khi bước quét không đánh dấu gì.",
      "Chỗ khó: cả hai yêu cầu đều là việc ứng dụng làm giữa hai bước, không phải việc model làm. Cách nào để model tự quyết thì không bảo đảm được."
    ],
    asks: [
      "Thiết kế nào thỏa cả hai yêu cầu?",
      "Tức là: ứng dụng phải cầm được output của từng bước, và chính code quyết định có chạy bước hai hay không.",
      "Soi từng phương án: có chỗ nào ứng dụng nhận trọn output bước một không? Ai quyết định bỏ bước hai: code hay model?"
    ],
    facts: [
      "Prompt chaining: nhiều lần gọi model riêng, do code nối lại. Output bước trước thành input bước sau.",
      "Viết “bước 1, bước 2” trong cùng một prompt vẫn chỉ là một lần gọi. Không kiểm được giữa các bước, không ghi log được từng bước.",
      "Giữa hai lần gọi, code chèn được bước kiểm (gate): output không đạt thì dừng, bước sau không chạy.",
      "<code>maxTurns</code> (Python: <code>max_turns</code>) là trần số vòng của agent loop. Chạm trần thì vòng dừng, trả kết quả dở dang. Việc con độc lập thì chạy song song được, việc cần kết quả của nhau thì phải nối thành chuỗi."
    ],
    opts: [
      { k: "A", gist: "Send one request that lists the stages as numbered steps and asks Claude to wrap each stage's output in its own XML-tagged section that the application parses into records.",
        why: [
          "Được yêu cầu 1: tách thẻ XML ra là có hai bản ghi.",
          "Hỏng yêu cầu 2: vẫn là một lần gọi (ý 2), nên bước sâu có chạy hay không là do model quyết trong cùng response. Dặn “quét trống thì dừng” chỉ là xác suất, không phải “never”.",
          "Dễ bị cuốn vì bước đánh số và thẻ XML đều là kỹ thuật prompt đúng. Nhưng ứng dụng không có chỗ nào chen vào giữa hai bước để chặn."
        ] },
      { k: "B", gist: "Split the audit into separate API calls, one per stage, with application code passing the scan's flagged modules into the deep-analysis call.",
        why: [
          "Mỗi bước một lần gọi (ý 1). Output quét về tới code thành một response trọn vẹn, code lưu nó thành bản ghi riêng. Thỏa yêu cầu 1.",
          "Code đọc danh sách bị đánh dấu: trống thì không gọi bước sâu (ý 3). Chặn bằng nhánh <code>if</code> trong code nên chắc chắn, đúng chữ “never”.",
          "Danh sách module bị đánh dấu đi thẳng vào lần gọi thứ hai làm input, bước sâu chỉ xét đúng các module đó."
        ] },
      { k: "C", gist: "Run the audit in the agent loop with <code>max_turns</code> set to one turn per stage, so the loop pauses after each stage and the application can log it.",
        why: [
          "Sai ở giả định: <code>max_turns</code> chỉ là trần số vòng (ý 4). Nó không chia việc thành bước, cũng không dừng ở ranh giới giữa hai bước.",
          "Chạm trần thì vòng bị cắt giữa chừng, trả kết quả dở dang. Ứng dụng không có output sạch của từng bước để lưu, cũng không có chỗ để code quyết có chạy bước hai."
        ] },
      { k: "D", gist: "Spawn one subagent per stage in parallel, so each stage runs in its own isolated context and returns a separate result to the parent agent.",
        why: [
          "Sai ở chỗ hai bước cần nhau: bước sâu cần danh sách mà bước quét đánh dấu. Việc cần nhau thì phải nối chuỗi, không chạy song song (ý 4).",
          "Chạy cùng lúc thì bước sâu bắt đầu khi chưa có input, và không thể bỏ qua dựa vào kết quả quét."
        ] }
    ],
    refs: [
      { label: "Bài 1.6, mục “Biết thêm”: một prompt nhiều bước vẫn là một lần gọi; chuỗi thật là nhiều lần gọi do code nối", href: NOTES + "#l-1-6" },
      { label: "Bài 1.6, mục “Đã sửa 03/11”: bước kiểm (gate) bằng code giữa hai lần gọi", href: NOTES + "#fix-25" }
    ]
  },
  {
    de: 7, n: 46, total: 60, sub: "4.1", subName: "Prompt có tiêu chí rõ để giảm false positive", scen: "S5",
    answer: "B",
    ask: "A nightly security audit reports findings through a tool whose schema restricts severity to four enum values, so every label is valid. Even so, a missing authorization check on a payments endpoint came back as medium, while an outdated comment came back as critical. On-call engineers who triage by severity end up investigating the wrong findings first. What change makes the severity labels dependable for triage?",
    scene: [
      "Job audit bảo mật chạy mỗi đêm, báo finding qua một tool. Schema giới hạn severity (mức nghiêm trọng) trong bốn giá trị enum, nên nhãn nào cũng hợp lệ.",
      "Vậy mà thiếu kiểm quyền ở endpoint thanh toán bị chấm medium, còn một comment lỗi thời bị chấm critical.",
      "Kỹ sư trực (on-call) xử lý theo severity, nên đi điều tra nhầm chỗ trước.",
      "Chỗ khó: output không sai hình dạng. Sai là chọn nhãn nào trong bốn nhãn hợp lệ, tức chuyện phán đoán."
    ],
    asks: [
      "Đổi gì để nhãn severity đáng tin khi xếp thứ tự xử lý?",
      "Tức là: cùng một loại lỗi phải luôn ra cùng một mức, và mức phải phản ánh đúng mức gây hại.",
      "Soi từng phương án: nó sửa hình dạng output hay sửa cách chọn nhãn? Nó có cho model một tiêu chí để đối chiếu không?"
    ],
    facts: [
      "Schema, kể cả enum, chỉ lo cú pháp: giá trị có nằm trong tập cho phép không. Giá trị đó có đúng với finding không là chuyện ngữ nghĩa, schema không biết.",
      "<code>strict: true</code> trên tool buộc tham số khớp schema tuyệt đối. Vẫn là chuyện cú pháp.",
      "Severity gán theo ngưỡng mơ hồ thì mỗi lần một kiểu. Cách sửa của bài 4.1: định nghĩa từng mức bằng tiêu chí rõ, kèm ví dụ code. Ví dụ trong notes: critical = có thể mất hoặc lộ dữ liệu.",
      "Review độc lập dùng một instance có context sạch để bắt chỗ lượt trước bỏ sót. Nó không thêm tiêu chí nào: instance mới đọc cùng prompt với lượt đầu."
    ],
    opts: [
      { k: "A", gist: "Turn on strict mode for the audit tool definition so each severity value is checked against the schema before the finding is accepted.",
        why: [
          "Sai lớp: strict lo cú pháp (ý 2), mà cú pháp đang đúng sẵn. Đề nói rõ nhãn nào cũng là một trong bốn giá trị hợp lệ.",
          "Bật strict xong, thiếu kiểm quyền vẫn có thể ra medium, vì medium là giá trị hợp lệ (ý 1).",
          "Dễ bị cuốn vì strict là tính năng thật, nghe như “chặt hơn”. Nhưng chặt về hình dạng, không chặt về chuyện chọn đúng nhãn."
        ] },
      { k: "B", gist: "Add a written definition of each severity level to the audit prompt, with a concrete code example showing what qualifies for that level.",
        why: [
          "Gốc lỗi là ranh giới giữa các mức chưa ai định nghĩa, nên model tự đoán (ý 3). Định nghĩa từng mức cho model một điều kiện để đối chiếu.",
          "Ví dụ code mỗi mức chỉ rõ chỗ nào chạm ngưỡng. Thiếu kiểm quyền trước dữ liệu thanh toán khớp kiểu ví dụ của critical. Comment lỗi thời rơi xuống mức thấp nhất.",
          "Nhãn bám theo mức gây hại thật, nên kỹ sư trực xử lý đúng thứ tự."
        ] },
      { k: "C", gist: "Run a second independent audit instance without the first pass's context, and report only the severity ratings where both instances agree.",
        why: [
          "Sai ở chỗ không thêm tiêu chí: instance thứ hai đọc cùng chỉ dẫn mơ hồ (ý 4), nên cũng đoán như lượt đầu.",
          "Chỗ hai lượt lệch nhau thì finding bị bỏ, có khi bỏ đúng lỗi nặng. Chỗ hai lượt khớp nhau thì vẫn là hai lần đoán giống nhau, không phải đã chấm đúng."
        ] },
      { k: "D", gist: "Derive severity in a post-processing step from the directory the affected file lives in, so a given path always maps to the same level.",
        why: [
          "Nhất quán thật, nhưng đo sai thứ: đo code nằm ở đâu, không đo lỗi gây hại gì.",
          "Comment lỗi thời trong thư mục payments sẽ xếp trên lỗi thiếu kiểm quyền ở middleware dùng chung. Kỹ sư trực vẫn đi nhầm chỗ."
        ] }
    ],
    refs: [
      { label: "Bài 4.1, mục “Cùng một lỗi, lúc nặng lúc nhẹ”: định nghĩa từng mức severity kèm ví dụ code", href: NOTES + "#l-4-1" },
      { label: "Bài 4.3, khung khái niệm “Cú pháp vs ngữ nghĩa”: schema chỉ lo phần cú pháp", href: NOTES + "#l-4-3" },
      { label: "Cheatsheet D4: dòng “Severity lúc high lúc low cho cùng pattern”", href: NOTES + "#cheat-d4" }
    ]
  },
  {
    de: 7, n: 47, total: 60, sub: "4.2", subName: "Few-shot cho output ổn định", scen: "S5",
    answer: "C",
    ask: "Review findings already come back as schema-valid JSON through a <code>tool_use</code> extraction, but the content of the <code>suggested_fix</code> field varies: some findings give an exact code change, others only say “consider refactoring”. Detailed written rules describing a concrete fix have not reduced the variation. Which change most reliably makes the fixes consistently actionable?",
    scene: [
      "Finding review đã ra JSON đúng schema qua <code>tool_use</code>. Hình dạng không còn lỗi.",
      "Lỗi nằm ở nội dung trường <code>suggested_fix</code>: có finding ghi đúng đoạn code cần đổi, có finding chỉ ghi “consider refactoring” (cân nhắc refactor), đọc xong không biết làm gì.",
      "Chỗ khó: team đã viết luật chi tiết tả thế nào là một bản sửa cụ thể, mà độ lệch không giảm. Viết thêm luật là đi lại đường đã thất bại."
    ],
    asks: [
      "Đổi gì để bản sửa lần nào cũng làm theo được?",
      "Tức là: khi mô tả bằng lời đã hết tác dụng, kỹ thuật nào làm nội dung ổn định.",
      "Soi từng phương án: nó tác động lên nội dung bản sửa, lên hình dạng output, hay chỉ lên việc finding nào được hiện?"
    ],
    facts: [
      "tool_use + schema bảo đảm cú pháp: trường <code>suggested_fix</code> có mặt và là chuỗi. Nó không bảo đảm chuỗi đó cụ thể hay dùng được.",
      "Guide nói thẳng: khi chỉ dẫn chi tiết vẫn cho kết quả không nhất quán, few-shot (đặt vài ví dụ mẫu vào prompt) là kỹ thuật hiệu quả nhất. Notes: một ví dụ finding đầy đủ đáng giá hơn ba đoạn mô tả.",
      "Docs “Increase output consistency” cũng ghi: đưa ví dụ output mong muốn hiệu quả hơn chỉ dẫn trừu tượng.",
      "Confidence tự báo (model tự chấm mình chắc bao nhiêu) lệch xa độ đúng thật. Lọc theo nó chỉ đổi finding nào được hiện, không đổi cách viết bản sửa."
    ],
    opts: [
      { k: "A", gist: "Ask Claude to rate its confidence in each <code>suggested_fix</code> and drop findings rated below a set threshold.",
        why: [
          "Sai đòn bẩy: lọc chỉ quyết finding nào lọt ra, không đổi cách viết bản sửa (ý 4). Bản sửa còn lại vẫn lúc cụ thể lúc chung chung.",
          "Còn mất luôn một số finding, mà con số confidence tự báo cũng không đáng tin để làm ngưỡng."
        ] },
      { k: "B", gist: "Expand the written rules into explicit criteria that define what a concrete fix must contain for each finding category.",
        why: [
          "Sai ở chỗ đi lại đường đã thất bại: đề kể luật viết chi tiết không giảm được độ lệch. Thêm chữ vẫn là mô tả bằng lời (ý 2).",
          "Dễ bị cuốn vì tiêu chí rõ là cách đúng ở bài 4.1. Nhưng khi mô tả đã đủ chi tiết mà output vẫn lệch, bước tiếp theo là cho ví dụ, không phải viết thêm."
        ] },
      { k: "C", gist: "Add a few example findings to the prompt whose <code>suggested_fix</code> shows an exact code change, giving the model concrete patterns to match.",
        why: [
          "Đúng ca guide nêu: chỉ dẫn chi tiết vẫn lệch thì few-shot là kỹ thuật hiệu quả nhất (ý 2, ý 3).",
          "Ví dụ cho model thấy tận mắt một bản sửa cụ thể trông ra sao. Model bắt chước cái nó thấy, thay vì mỗi lần tự hiểu lại một câu luật.",
          "Notes khuyên 2–4 ví dụ nhắm đúng ca hay lệch, kèm lý do, để model khái quát sang finding mới."
        ] },
      { k: "D", gist: "Tighten the tool's input schema so <code>suggested_fix</code> must contain a code block and meet a minimum length, failing vague text at validation.",
        why: [
          "Sai lớp: schema lo hình dạng, không lo nội dung (ý 1). Output vốn đã đúng schema.",
          "Ép có code block và đủ dài thì model viết dài hơn, chèn một đoạn code cho có. Vẫn có thể mơ hồ, chỉ là mơ hồ dài hơn.",
          "Thêm nữa, docs structured outputs ghi <code>minLength</code> không được hỗ trợ khi bật strict tool use, gửi lên là lỗi 400."
        ] }
    ],
    refs: [
      { label: "Bài 4.2, mục “Chuyện gì đang xảy ra”: chỉ dẫn chi tiết vẫn lệch thì few-shot là kỹ thuật hiệu quả nhất", href: NOTES + "#l-4-2" },
      { label: "Bài 4.3, khung khái niệm “Cú pháp vs ngữ nghĩa”: schema chỉ lo phần cú pháp", href: NOTES + "#l-4-3" },
      { label: "Docs “Increase output consistency”, mục Constrain with examples", href: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/increase-consistency" }
    ]
  },
  {
    de: 7, n: 48, total: 60, sub: "4.2", subName: "Few-shot cho output ổn định", scen: "S5",
    answer: "CD",
    ask: "The pipeline parses each review finding into fields (location, issue, severity, suggested fix) to post inline pull request comments. This sprint only the prompt text may change; the parser and the API request configuration are frozen. You are adding few-shot example findings to keep the output consistent. Which TWO practices make these examples effective? (Choose two.)",
    scene: [
      "Pipeline tách mỗi finding thành bốn trường (location, issue, severity, suggested fix) để đăng thành comment ngay trên dòng code của PR.",
      "Ràng buộc sprint này: chỉ được sửa chữ trong prompt. Parser và cấu hình API request bị “frozen” (đóng băng, không được đụng).",
      "Team đang thêm ví dụ finding mẫu (few-shot) để output ổn định.",
      "Chỗ khó: có phương án là kỹ thuật rất tốt nhưng phải đụng tới phần bị đóng băng. Lọc theo ràng buộc trước, rồi mới xét hay dở."
    ],
    asks: [
      "Hai cách làm nào giúp các ví dụ này hiệu quả?",
      "Tức là: trong giới hạn chỉ sửa prompt, ví dụ phải trông thế nào và đi kèm cái gì thì model ra đúng format parser đọc.",
      "Soi từng phương án: có phạm ràng buộc đóng băng không? Có giúp model bắt chước đúng format không?"
    ],
    facts: [
      "Few-shot dạy bằng làm mẫu: model bắt chước hình dạng output rất tốt. Một ví dụ finding đầy đủ (location, issue, severity, suggested fix) đáng giá hơn ba đoạn mô tả.",
      "Docs “Increase output consistency” có hai kỹ thuật đi cùng nhau: định nghĩa chính xác format output, và đưa ví dụ output mong muốn. Notes tóm lại: mô tả cho ca thường, ví dụ cho ca mơ hồ.",
      "Ví dụ tốt phải relevant (sát ca thật), diverse (đa dạng), structured (bọc trong <code>&lt;example&gt;</code>), ít và nhắm đích.",
      "Ép output bằng tool có input schema nghĩa là phải thêm <code>tools</code> vào request, và code phải đọc khối <code>tool_use</code> thay vì đọc text."
    ],
    opts: [
      { k: "A", gist: "Define the finding format as a tool whose input schema lists the four fields, so each finding arrives as schema-validated tool input.",
        why: [
          "Kỹ thuật tốt, nhưng phạm ràng buộc: phải sửa API request (thêm tool) và sửa parser (đọc <code>tool_use</code>), mà cả hai đang bị đóng băng (ý 4).",
          "Nó cũng không làm ví dụ hiệu quả hơn, nó thay hẳn cơ chế. Đề hỏi về ví dụ.",
          "Dễ bị cuốn vì tool + schema là cách tin cậy nhất cho output có cấu trúc. Ở dự án không bị khóa thì đáng làm. Sprint này thì không được đụng."
        ] },
      { k: "B", gist: "Swap the real repository code in the examples for abstract placeholder snippets, so findings don't echo project-specific details.",
        why: [
          "Sai ở chỗ ngược với tính relevant (ý 3): ví dụ phải sát ca thật thì model mới áp được vào PR thật.",
          "Code giả kiểu <code>foo()</code>, <code>bar</code> làm mất đúng cái cụ thể mà model cần để học cách ghi location và suggested fix trên code thật."
        ] },
      { k: "C", gist: "Write every example as a complete finding that uses the exact field names and field order the parser expects.",
        why: [
          "Model bắt chước hình dạng nó thấy (ý 1). Ví dụ đủ bốn trường, đúng tên, đúng thứ tự thì output thật cũng ra như vậy, parser đọc được.",
          "Ví dụ thiếu một trường hay đổi tên trường thì model dễ chép luôn cái sai đó vào finding thật.",
          "Chỉ sửa prompt, đúng ràng buộc."
        ] },
      { k: "D", gist: "Keep the written format specification in the prompt, because the examples demonstrate the format rather than replace the instructions.",
        why: [
          "Mô tả format và ví dụ là hai kỹ thuật đi cùng nhau, không thay nhau (ý 2).",
          "Mô tả nói được luật mà vài ví dụ không phủ hết, ví dụ một trường không có giá trị thì ghi gì. Ví dụ cho thấy luật đó trông ra sao trên finding thật.",
          "Cũng chỉ là chữ trong prompt, đúng ràng buộc."
        ] }
    ],
    refs: [
      { label: "Bài 4.2, mục “Bốn chỗ few-shot phát huy”: ví dụ finding đầy đủ đáng giá hơn mô tả; mục “Biết thêm”: bốn tính chất của ví dụ tốt", href: NOTES + "#l-4-2" },
      { label: "Docs “Increase output consistency”: Specify the output format you want và Constrain with examples", href: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/increase-consistency" }
    ]
  },
  {
    de: 7, n: 49, total: 60, sub: "4.4", subName: "Validate, retry kèm lỗi và vòng phản hồi", scen: "S5",
    answer: "AD",
    ask: "Claude extracts metrics from nightly scan reports into schema-validated JSON. Some reports state a total finding count that does not equal the sum of their own per-category counts. Which TWO design choices handle this correctly? (Choose two.)",
    scene: [
      "Claude trích số liệu từ báo cáo quét mỗi đêm ra JSON đã validate theo schema.",
      "Một số báo cáo tự mâu thuẫn: tổng số finding in trong báo cáo không bằng tổng các số theo từng loại cũng in trong báo cáo đó. Ví dụ minh họa:<pre><code>Total findings: 42\n  security:    10\n  performance: 15\n  style:       12   // cộng lại = 37</code></pre>",
      "Chỗ khó: lỗi nằm ở tài liệu gốc, không phải ở Claude. Claude đọc đúng cả hai con số, mà hai con số vẫn lệch nhau."
    ],
    asks: [
      "Hai thiết kế nào xử lý đúng ca này?",
      "Tức là: làm sao cho chỗ lệch hiện ra để máy thấy và xử lý, thay vì bị giấu đi hay bị ép cho khớp.",
      "Soi từng phương án: nó có giữ nguyên số thật trong báo cáo không? Cơ chế nó dựa vào có làm được việc đó không?"
    ],
    facts: [
      "Schema bảo đảm hình dạng: JSON parse được, đủ trường, đúng kiểu. Các số có khớp nhau không là lỗi ngữ nghĩa, schema không bắt được. Phần đó do validator trong code kiểm.",
      "Trường tự kiểm của bài 4.4: bắt Claude trích cả <code>calculated_total</code> (tự cộng các dòng) bên cạnh <code>stated_total</code> (tổng in trên giấy), thêm <code>conflict_detected</code> (true/false) cho ca tài liệu tự mâu thuẫn.",
      "<code>conflict_detected</code> quyết định đường đi. Tổng lệch mà <code>false</code> là lỗi trích xuất: retry kèm lỗi. <code>true</code> là tài liệu tự mâu thuẫn: retry vô ích, đưa người xem.",
      "Structured outputs không hỗ trợ ràng buộc số như <code>minimum</code>, <code>maximum</code>, <code>multipleOf</code>. Gửi schema có mấy thứ đó lên API là lỗi 400. JSON Schema cũng không có cách nói “trường này phải bằng tổng các trường kia”."
    ],
    opts: [
      { k: "A", gist: "Give the schema <code>stated_total</code>, a <code>calculated_total</code> summed from the per-category counts, and a <code>conflict_detected</code> boolean, so mismatches become machine-visible.",
        why: [
          "Đúng mẫu tự kiểm của bài 4.4 (ý 2). Claude ghi cả số in trên báo cáo lẫn số tự cộng, không chọn hộ bên nào.",
          "<code>conflict_detected: true</code> cho pipeline biết lỗi ở báo cáo, để đưa người xem thay vì gọi lại (ý 3)."
        ] },
      { k: "B", gist: "Encode the rule that <code>stated_total</code> must equal the category sum as a numeric constraint in the JSON schema, so mismatched output is rejected at generation.",
        why: [
          "Sai ở giả định: JSON Schema không diễn tả được luật “bằng tổng các trường kia”, và structured outputs còn không nhận ràng buộc số (ý 4). Gửi lên là lỗi 400.",
          "Mà kể cả chặn được, nó chỉ ép Claude sửa một con số cho khớp. Số thật trong báo cáo bị xóa mất."
        ] },
      { k: "C", gist: "Retry the extraction with the mismatch reported as a validation error until both totals agree, so dashboards only ever receive reconciled numbers.",
        why: [
          "Sai ở chỗ retry dành cho lỗi trích xuất. Ở đây Claude đọc đúng, báo cáo mới là thứ tự mâu thuẫn (ý 3).",
          "Gọi lại tới khi khớp là ép model bịa một con số. Dashboard nhận số “đẹp” nhưng sai sự thật.",
          "Dễ bị cuốn vì retry kèm lỗi cụ thể là cách đúng của bài 4.4. Nhưng nó chỉ đúng khi câu trả lời đúng có trong tài liệu."
        ] },
      { k: "D", gist: "Verify in pipeline code that <code>calculated_total</code> matches <code>stated_total</code>, because schema conformance guarantees structure but not arithmetic.",
        why: [
          "Schema không kiểm số học (ý 1), nên phải có validator trong code so hai tổng.",
          "Cờ <code>conflict_detected</code> do Claude tự đặt chỉ là lời khai. Code so lại mới chắc, rồi chuyển báo cáo lệch sang người xem."
        ] }
    ],
    refs: [
      { label: "Bài 4.4: calculated_total, conflict_detected, và khi nào retry vô ích", href: NOTES + "#l-4-4" },
      { label: "Cheatsheet D4: dòng “Tổng lệch, hỏi retry hay chuyển người”", href: NOTES + "#cheat-d4" },
      { label: "Docs “Structured outputs”, mục JSON Schema limitations: không hỗ trợ minimum, maximum, multipleOf; dùng là lỗi 400", href: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs" }
    ]
  },
  {
    de: 7, n: 50, total: 60, sub: "3.3", subName: "Rule theo đường dẫn trong .claude/rules", scen: "S5",
    answer: "C",
    ask: "The project <code>CLAUDE.md</code> has grown large: API review criteria, conventions for test files (which sit in many folders across the repository), and frontend styling rules. The team wants each convention to load automatically, but only when a CI review touches matching files. What should they do?",
    scene: [
      "CLAUDE.md của project đã phình to, gom ba nhóm: tiêu chí review API, quy ước cho file test, quy tắc style frontend.",
      "File test nằm rải ở nhiều thư mục khắp repo, không gom một chỗ.",
      "Team muốn mỗi quy ước tự nạp, nhưng chỉ khi lượt review trong CI đụng tới file khớp.",
      "Chỗ khó: hai đòi hỏi kéo ngược nhau. “Tự nạp” loại cách phải có ai gọi. “Chỉ khi đụng file khớp” loại cách nạp sẵn mọi lúc. Test lại nằm rải rác nên không buộc theo thư mục được."
    ],
    asks: [
      "Team nên làm gì?",
      "Tức là: cơ chế nào vừa tự nạp, vừa nạp có điều kiện theo file, kể cả file nằm rải rác.",
      "Soi từng phương án: nó nạp lúc nào (mở phiên, khi được gọi, hay khi đụng file)? Điều kiện theo thư mục hay theo tên file?"
    ],
    facts: [
      "Rule trong <code>.claude/rules/</code> có frontmatter <code>paths</code> chứa glob chỉ nạp khi Claude đọc hoặc sửa file khớp. Glob khớp theo tên file, không theo thư mục: <code>**/*.test.ts</code> khớp file test ở mọi cấp.",
      "CLAUDE.md đặt trong thư mục con nạp khi Claude làm việc với file trong thư mục đó. Nó bị buộc vào thư mục: test rải 40 thư mục thì cần 40 file.",
      "<code>@import</code> trong CLAUDE.md nạp file được import ngay lúc khởi động, cộng thẳng vào context. Không giảm context.",
      "Lúc đầu phiên, context chỉ có mô tả của skill. Nội dung đầy đủ nạp khi skill được gọi. Skill dành cho quy trình theo việc. Thứ luôn áp dụng thì để CLAUDE.md hoặc rule."
    ],
    opts: [
      { k: "A", gist: "Add a directory-level <code>CLAUDE.md</code> in <code>src/api</code>, in the test folders, and in the frontend tree, so each convention sits next to the code it governs.",
        why: [
          "Ổn cho API và frontend, vì mỗi nhóm nằm gọn một thư mục (ý 2).",
          "Hỏng ở file test: test rải nhiều thư mục, phải đặt file vào từng chỗ, thư mục test tạo sau lại quên. Quy ước theo loại file thì phải khớp theo tên file (ý 1).",
          "Dễ bị cuốn vì CLAUDE.md thư mục con đúng là nạp có điều kiện. Nhưng điều kiện là thư mục, mà đề đã nói trước test không nằm một chỗ."
        ] },
      { k: "B", gist: "Turn each topic into a skill under <code>.claude/skills/</code> so its guidance enters context only when the skill runs during a review.",
        why: [
          "Sai ở chỗ skill chỉ nạp khi được gọi (ý 4). Lượt review CI không có gì bảo đảm sẽ gọi đúng skill cho từng file, nên quy ước có thể không bao giờ vào context.",
          "Trái chữ “automatically” (tự động) của đề. Quy ước thường trực không phải quy trình theo việc."
        ] },
      { k: "C", gist: "Split the file into topic files under <code>.claude/rules/</code>, each with a <code>paths</code> glob in its frontmatter so it loads only for matching files.",
        why: [
          "Đúng cơ chế đề tả: rule có <code>paths</code> tự nạp khi Claude đụng file khớp, không đụng thì không tốn context (ý 1).",
          "Glob khớp theo tên file nên test ở thư mục nào cũng dính. Ví dụ minh họa:<pre><code># .claude/rules/testing.md\n---\npaths: [\"**/*.test.ts\"]\n---\nQuy ước viết test...</code></pre>",
          "API và frontend làm tương tự, ví dụ <code>src/api/**/*</code> cho rule API."
        ] },
      { k: "D", gist: "Keep a short root <code>CLAUDE.md</code> and use <code>@path</code> imports to pull in one file per topic, keeping each topic in its own maintainable file.",
        why: [
          "Dễ bảo trì hơn, nhưng sai ở giả định nạp có điều kiện: file import nạp ngay lúc khởi động (ý 3). Lượt CI nào cũng gánh đủ ba chủ đề.",
          "Dễ bị cuốn vì tách file nghe như đã chia nhỏ được context. Nhưng tách file chỉ là sắp xếp, không đổi lúc nạp."
        ] }
    ],
    refs: [
      { label: "Bài 3.3: rule có paths chỉ nạp khi đụng file khớp; glob khớp theo tên file nên test rải khắp repo vẫn dính", href: NOTES + "#l-3-3" },
      { label: "Bài 3.1, mục “Biết thêm”: @import không làm nhỏ context", href: NOTES + "#l-3-1" },
      { label: "Bài 3.2, quy tắc cuối bài: luôn áp dụng → CLAUDE.md, gọi theo việc → skill", href: NOTES + "#l-3-2" }
    ]
  },
  {
    de: 7, n: 51, total: 60, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema", scen: "S5",
    answer: "A",
    ask: "In the review step, one request defines <code>extract_pr_metadata</code> together with two enrichment tools. The enrichment tools fail unless the extraction has already run, yet Claude sometimes calls an enrichment tool first. Which design guarantees that extraction happens before enrichment?",
    scene: [
      "Bước review trong CI khai ba tool trong cùng một request: <code>extract_pr_metadata</code> (trích metadata của PR) và hai tool làm giàu dữ liệu (enrichment).",
      "Hai tool enrichment chỉ chạy được khi metadata đã có. Gọi trước là hỏng.",
      "Chỗ khó: Claude thỉnh thoảng gọi enrichment trước. Đề đòi “guarantees” (bảo đảm), nên lời dặn hay xác suất cao đều không đủ."
    ],
    asks: [
      "Thiết kế nào bảo đảm bước trích metadata chạy trước enrichment?",
      "Tức là: ở lượt đầu, phải chắc chắn tool được gọi là <code>extract_pr_metadata</code>, không phải tool nào khác.",
      "Soi từng phương án: nó điều khiển <b>tool nào</b> được gọi, hay chỉ điều khiển chuyện khác (có gọi tool không, gọi mấy tool, input có đúng schema không)?"
    ],
    facts: [
      "<code>tool_choice</code> có ba mức. <code>auto</code>: Claude tự quyết, có thể chỉ trả chữ. <code>any</code>: bắt gọi một tool, nhưng Claude chọn tool nào. <code>{\"type\": \"tool\", \"name\": \"…\"}</code>: bắt gọi đúng tool có tên đó (forced, ép đúng tool).",
      "Ép đúng tool thì response mở đầu bằng block <code>tool_use</code> của tool đó, không có gì chen trước. Guide dùng chính ca này: ép <code>extract_metadata</code> chạy trước, enrichment để lượt sau.",
      "<code>disable_parallel_tool_use</code> là cờ nằm trong object <code>tool_choice</code>. Nó chỉ giới hạn số tool gọi trong một lượt, không chọn tool nào.",
      "<code>strict: true</code> là cờ trên định nghĩa tool. Nó buộc input Claude điền khớp đúng schema của tool đó, mỗi khi tool được gọi. Nó không đụng tới chuyện Claude chọn tool nào."
    ],
    opts: [
      { k: "A", gist: "Force <code>tool_choice</code> to type <code>tool</code> naming <code>extract_pr_metadata</code> on the first request, and run enrichment only after its result has been sent back.",
        why: [
          "Lượt đầu ép đúng <code>extract_pr_metadata</code>: response mở đầu bằng <code>tool_use</code> của tool này, không tool nào chen trước được (ý 1, ý 2).",
          "App chạy tool, gửi <code>tool_result</code> về. Metadata đã nằm trong hội thoại thì lượt sau mới tới enrichment.",
          "Thứ tự giờ do code app nắm, không phụ thuộc Claude tự chọn. Đúng chữ “guarantees” đề đòi. Cùng ý với Đề 2 câu 16 và Đề 3 câu 3."
        ] },
      { k: "B", gist: "Set <code>tool_choice</code> to <code>any</code> on the first request, so Claude has to open the turn by calling one of the defined tools.",
        why: [
          "Sai ở chỗ <code>any</code> chỉ bắt gọi một tool nào đó, Claude vẫn tự chọn tool (ý 1).",
          "Cả ba tool nằm chung request, nên Claude vẫn có thể gọi enrichment trước. Đúng lỗi đang gặp.",
          "Dễ bị cuốn vì <code>any</code> nghe như “bắt buộc dùng tool”, lại là cách quen để ép structured output. Nhưng ép gọi tool khác với ép gọi đúng tool."
        ] },
      { k: "C", gist: "Leave <code>tool_choice</code> on <code>auto</code> with <code>disable_parallel_tool_use</code> set to true inside it, so Claude makes at most one tool call per turn.",
        why: [
          "Cờ này chỉ giới hạn số tool mỗi lượt (ý 3). Với <code>auto</code>, lượt đó vẫn có thể là enrichment, hoặc chỉ trả chữ (ý 1).",
          "Nó lo “gọi mấy tool”, còn đề hỏi “tool nào chạy trước”."
        ] },
      { k: "D", gist: "Add <code>strict: true</code> to the <code>extract_pr_metadata</code> definition, so the API enforces full schema compliance on that tool's input.",
        why: [
          "<code>strict</code> chỉ lo input đúng schema khi tool được gọi (ý 4). Nó không làm tool đó được chọn trước.",
          "Enrichment vẫn có thể chạy trước như cũ. Chỉ khác là lúc <code>extract_pr_metadata</code> được gọi thì input của nó chắc chắn đúng schema."
        ] }
    ],
    refs: [
      { label: "Bài 2.3: bảng tool_choice, dòng extract_metadata chạy trước enrichment; mục “Biết thêm” về disable_parallel_tool_use", href: NOTES + "#l-2-3" },
      { label: "Bài 4.3: strict: true buộc tham số khớp schema; tool_choice ép tool", href: NOTES + "#l-4-3" },
      { label: "Cheatsheet D4: dòng “Một bước phải chạy trước” → tool_choice forced theo tên", href: NOTES + "#cheat-d4" }
    ]
  },
  {
    de: 7, n: 52, total: 60, sub: "4.4", subName: "Validate, retry kèm lỗi và vòng phản hồi", scen: "S5",
    answer: "C",
    ask: "A pipeline step extracts acceptance criteria into JSON, but its prompt carries only the diff and the PR description. The criteria live solely in the linked tracker ticket. Retries that include the validation errors keep failing. What should the team change?",
    scene: [
      "Một bước trong pipeline trích acceptance criteria (tiêu chí nghiệm thu) của PR ra JSON.",
      "Prompt chỉ có diff và mô tả PR. Tiêu chí lại nằm ở ticket trên tracker (hệ thống quản lý công việc) được link tới, không nằm trong hai thứ kia.",
      "Retry kèm lỗi validate cứ fail. Chỗ khó: vòng retry đang chạy đúng kiểu, nhưng gọi lại bao nhiêu lần cũng không ra."
    ],
    asks: [
      "Team nên đổi gì?",
      "Tức là: khi thông tin cần trích không có trong thứ Claude được thấy, cách nào mới cho ra tiêu chí thật.",
      "Soi từng phương án: nó đưa thêm nguồn có tiêu chí cho Claude, hay chỉ gọi lại, ép khuôn trên cùng dữ liệu cũ?"
    ],
    facts: [
      "Retry kèm lỗi (gửi lại tài liệu gốc, JSON vừa trả, câu lỗi cụ thể) sửa được lỗi định dạng và lỗi trích xuất: thông tin có trong nguồn, Claude chỉ viết sai hay đặt nhầm chỗ.",
      "Retry vô ích khi thông tin vắng ở nguồn: gọi bao nhiêu lần cũng không moi ra thứ không có. Việc cần làm là đưa thêm tài liệu có thông tin, hoặc chuyển người.",
      "Tool + JSON schema bảo đảm output đúng hình dạng, không bảo đảm nội dung có thật. Ép một trường phải có giá trị khi nguồn không có thì model bịa cho đủ.",
      "Retry có backoff (chờ tăng dần giữa các lần) dành cho lỗi transient (tạm thời) như timeout. Lỗi do thiếu dữ liệu thì lần nào cũng y như nhau."
    ],
    opts: [
      { k: "A", gist: "Turn the extraction into a tool whose input schema lists the criteria fields, so every response is guaranteed to have that structure.",
        why: [
          "Schema chỉ lo hình dạng (ý 3). Tiêu chí vẫn không có trong diff hay mô tả PR.",
          "Khuôn bắt phải điền thì model dễ bịa ra tiêu chí nghe hợp lý. JSON qua được validate mà nội dung là bịa, còn tệ hơn fail."
        ] },
      { k: "B", gist: "Raise the retry limit and add backoff between attempts, giving the repeated failures more chances to clear.",
        why: [
          "Backoff dành cho lỗi tạm thời (ý 4). Ở đây lần nào Claude cũng thấy đúng một bộ input thiếu tiêu chí.",
          "Thêm lượt chỉ lặp lại cùng một lỗi, tốn thêm tiền (ý 2)."
        ] },
      { k: "C", gist: "Fetch the linked tracker ticket and put its text into the extraction prompt next to the existing PR inputs.",
        why: [
          "Đúng loại lỗi: thông tin vắng ở nguồn (ý 2). Thứ cần sửa là nguồn, không phải cách gọi lại.",
          "Đưa nội dung ticket vào prompt thì Claude có chỗ để trích tiêu chí thật. Có khi lần đầu đã ra, khỏi cần retry.",
          "Cùng ý với Đề 4 câu 24: mã số thuế chỉ có trong registry riêng thì đưa registry vào prompt."
        ] },
      { k: "D", gist: "Put the failed extraction and the full diff into every retry prompt alongside the validation errors, so the model can re-ground its fixes.",
        why: [
          "Đây đúng là retry kèm lỗi chuẩn (ý 1), hợp với lỗi định dạng hay cấu trúc.",
          "Nhưng đối chiếu lại với diff vẫn không ra tiêu chí, vì diff không có (ý 2).",
          "Dễ bị cuốn vì nó giống hệt pattern guide dạy. Nhưng pattern đó chỉ sửa cách chép từ nguồn ra output, không bù được nguồn thiếu."
        ] }
    ],
    refs: [
      { label: "Bài 4.4, mục “Chuyện gì đang xảy ra”: retry có ích với lỗi trích xuất, vô ích khi nguồn không có thông tin; khi đó đưa thêm tài liệu hoặc chuyển người", href: NOTES + "#l-4-4" },
      { label: "Cheatsheet D4: dòng “Retry 3 lần vẫn null” → thông tin không có trong nguồn, ngừng retry", href: NOTES + "#cheat-d4" }
    ]
  },
  {
    de: 7, n: 53, total: 60, sub: "4.2", subName: "Few-shot cho output ổn định", scen: "S5",
    answer: "B",
    ask: "The reviewer's verdicts on swallowed exceptions are inconsistent. A written rule describing the acceptable cases did not help, so the team added four few-shot examples, all drawn from database code. Database verdicts are now consistent, but API handlers and background jobs still get mixed verdicts. Which change to the examples is most effective?",
    scene: [
      "Reviewer phán không đều với swallowed exception (lỗi bị bắt rồi bỏ qua, không log, không ném lại): cùng kiểu code, lúc báo lúc không.",
      "Team viết rule bằng lời, nói rõ khi nào chấp nhận được. Không ăn thua.",
      "Team thêm bốn ví dụ few-shot, cả bốn lấy từ code database. Code database giờ phán đều, còn API handler và background job (tác vụ chạy nền) vẫn lúc này lúc khác.",
      "Chỗ khó: ví dụ rõ ràng có tác dụng. Chỉ là tác dụng dừng ở đúng mảng mà ví dụ được lấy ra."
    ],
    asks: [
      "Đổi bộ ví dụ thế nào là hiệu quả nhất?",
      "Tức là: làm sao để phán đoán model học từ ví dụ áp được sang cả API handler và background job.",
      "Soi từng phương án: nó cho model thấy phán đoán ở các mảng đang lệch, hay chỉ nhắc thêm, bọc lại, thêm ví dụ cùng mảng?"
    ],
    facts: [
      "Khi chỉ dẫn chi tiết vẫn cho kết quả không đều, few-shot là kỹ thuật hiệu quả nhất. Guide khuyên 2–4 ví dụ nhắm đúng ca mơ hồ, mỗi ví dụ kèm lý do để model khái quát (áp sang ca mới chưa thấy).",
      "Model học cả những điểm chung mà mày không cố ý dạy. Notes có ví dụ: toàn ví dụ severity về auth thì model hiểu critical = auth. Ở đây toàn ví dụ database thì model hiểu phán đoán này chỉ dành cho database.",
      "Ví dụ tốt có bốn tính chất: relevant (sát ca thật), diverse (đa dạng), structured (bọc trong thẻ <code>&lt;example&gt;</code>), few &amp; targeted (ít và nhắm đích).",
      "Thẻ XML như <code>&lt;examples&gt;</code> giúp Claude tách đâu là ví dụ, đâu là dữ liệu cần xử lý. Nó không thêm nội dung gì cho phán đoán."
    ],
    opts: [
      { k: "A", gist: "Keep the four database examples and add a prompt instruction to apply the same judgment to API handlers and background jobs.",
        why: [
          "Đây là quay lại lời dặn bằng chữ, mà đề kể rule bằng lời đã thất bại (ý 1).",
          "Câu “apply the same judgment” (áp cùng phán đoán) chỉ nêu mục tiêu. Model vẫn chưa thấy ca API handler hay background job nào được phán ra sao.",
          "Dễ bị cuốn vì nghe như tận dụng ví dụ đang chạy tốt, chỉ cần nối thêm một câu. Nhưng thứ thiếu là ví dụ ở mảng mới, không phải lời nhắc."
        ] },
      { k: "B", gist: "Swap some of the database examples for ones from API handlers and background jobs, keeping a short rationale with each verdict.",
        why: [
          "Sửa đúng gốc: bộ ví dụ chỉ phủ một mảng nên model học nhầm “phán đoán này cho database” (ý 2). Đổi bớt sang API handler và background job là cho bộ ví dụ diverse (ý 3).",
          "Thay chứ không cộng thêm, nên bộ ví dụ vẫn ít và nhắm đích (ý 1, ý 3).",
          "Lý do kèm mỗi kết luận cho model thấy vì sao chấp nhận hay báo, nên nó áp được sang chỗ không có ví dụ y hệt."
        ] },
      { k: "C", gist: "Wrap the four examples in an XML tag named <code>examples</code> so the model can tell them apart from the code under review.",
        why: [
          "Thẻ chỉ tách ví dụ khỏi input (ý 4). Bệnh đó không có ở đây: code database đã phán đều, nghĩa là model đang đọc và làm theo ví dụ.",
          "Bọc lại xong, bộ ví dụ vẫn toàn database. API handler và background job vẫn lệch như cũ."
        ] },
      { k: "D", gist: "Expand the set to ten or more database cases so the decision pattern is firmly established.",
        why: [
          "Thêm ví dụ cùng mảng chỉ củng cố thứ đã chạy tốt (ý 2). Mảng đang lệch vẫn không có ví dụ nào.",
          "Hơn mười ví dụ giống nhau còn trái với “few &amp; targeted” (ý 3), lại tốn thêm token context mà không thêm thông tin."
        ] }
    ],
    refs: [
      { label: "Bài 4.2, mục “Biết thêm”: ví dụ phải đa dạng về hình thức; bốn tính chất relevant, diverse, structured, few and targeted", href: NOTES + "#l-4-2" },
      { label: "Bài 4.1, mục “Biết thêm”: ví dụ severity phải đa dạng, toàn ví dụ auth thì model hiểu critical = auth", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 7, n: 54, total: 60, sub: "4.2", subName: "Few-shot cho output ổn định", scen: "S5",
    answer: "A",
    ask: "The review prompt places few-shot code examples as plain text directly above the PR diff; prose rules on their own had produced inconsistent judgments. Some findings now report issues inside the example snippets rather than in the PR. Which change fixes the root cause?",
    scene: [
      "Prompt review có vài ví dụ few-shot bằng code, dán thẳng dạng chữ trơn ngay trên diff của PR.",
      "Team thêm ví dụ vì rule bằng lời trước đó cho phán đoán không đều.",
      "Giờ có finding báo lỗi nằm trong chính đoạn code ví dụ, không phải trong PR.",
      "Chỗ khó: đề hỏi “root cause” (gốc lỗi). Có cách che được triệu chứng, nhưng gốc nằm ở chỗ khác."
    ],
    asks: [
      "Đổi gì để sửa tận gốc?",
      "Tức là: vì sao model review nhầm code ví dụ, và đổi gì trong prompt để nó hết nhầm.",
      "Soi từng phương án: nó cho model ranh giới rõ giữa ví dụ và input, hay chỉ lọc kết quả, thu nhỏ ví dụ, bỏ ví dụ?"
    ],
    facts: [
      "Code ví dụ và diff cùng là code, cùng dạng chữ trơn, đứng sát nhau. Model không có gì để biết đoạn nào là mẫu để học, đoạn nào là thứ cần review.",
      "XML tag là thẻ tự đặt như <code>&lt;example&gt;</code>, <code>&lt;document&gt;</code>. Thẻ không phải lệnh đặc biệt, chỉ giúp Claude tách đâu là dữ liệu, đâu là chỉ dẫn, đâu là ví dụ. Ví dụ tốt được bọc trong <code>&lt;example&gt;</code>.",
      "Few-shot thắng khi mô tả bằng lời đã kỹ mà output vẫn lệch. Cặp ví dụ “chấp nhận được / lỗi thật” cần đủ ngữ cảnh để cho thấy vì sao."
    ],
    opts: [
      { k: "A", gist: "Wrap the examples in an XML tag named <code>examples</code> and the diff in a tag of its own, so the model can tell demonstration code from input.",
        why: [
          "Sửa đúng gốc: model không phân biệt được ví dụ với input (ý 1). Bọc mỗi phần một thẻ là cho nó ranh giới rõ (ý 2).",
          "Ví dụ vẫn còn, nên phán đoán vẫn đều như lúc team thêm ví dụ (ý 3). Chỉ khác là model biết code nào cần review."
        ] },
      { k: "B", gist: "Add a post-processing filter that drops any finding whose quoted code matches an example snippet, so developers never see those findings.",
        why: [
          "Chỉ che triệu chứng: dev không thấy finding sai, nhưng model vẫn review nhầm code ví dụ (ý 1).",
          "Khớp theo đoạn code trích cũng dễ hỏng: model diễn đạt lại một chút là lọt.",
          "Dễ bị cuốn vì nó dẹp ngay chuyện dev bị làm phiền. Nhưng đề hỏi gốc lỗi, và gốc nằm trong prompt."
        ] },
      { k: "C", gist: "Shrink every example to a single line of code, leaving less example code for the model to confuse with the diff.",
        why: [
          "Ít chữ hơn nhưng vẫn không có ranh giới. Một dòng code trơn vẫn trông như một dòng của diff (ý 1).",
          "Một dòng cũng không đủ ngữ cảnh để cho thấy vì sao pattern này chấp nhận được còn pattern kia là lỗi. Mất luôn giá trị của ví dụ (ý 3)."
        ] },
      { k: "D", gist: "Replace the examples with a more detailed prose description of the acceptable pattern, so no example code remains in the prompt.",
        why: [
          "Hết nhầm thật, vì không còn code ví dụ.",
          "Nhưng đề kể rule bằng lời đã cho phán đoán không đều (ý 3). Bỏ ví dụ là quay lại đúng bệnh cũ."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D4, mục 4 “Ba cách chỉnh lời dặn”: XML tag giúp Claude tách dữ liệu, chỉ dẫn và ví dụ", href: NOTES + "#l-4-0" },
      { label: "Bài 4.2, khung “Khái niệm của bài”: thẻ example bọc từng ví dụ để Claude biết đâu là ví dụ", href: NOTES + "#l-4-2" }
    ]
  },
  {
    de: 7, n: 55, total: 60, sub: "4.4", subName: "Validate, retry kèm lỗi và vòng phản hồi", scen: "S5",
    answer: "C",
    ask: "About 5% of automated review outputs fail Pydantic validation on field errors, such as invalid severity values or location strings that match no line in the reviewed diff. The error messages name the failing fields but not the correct values. The current retry resends the original prompt unchanged and rarely succeeds. What change makes retries most effective?",
    scene: [
      "Khoảng 5% output review fail khi validate bằng Pydantic (thư viện Python khai kiểu dữ liệu và luật kiểm).",
      "Lỗi nằm ở từng trường: severity (mức nghiêm trọng) mang giá trị không hợp lệ, hoặc chuỗi location (vị trí) không khớp dòng nào trong diff.",
      "Câu lỗi chỉ nêu trường nào sai, không nói giá trị đúng là gì.",
      "Retry hiện tại gửi lại y nguyên prompt cũ, hiếm khi thành công."
    ],
    asks: [
      "Đổi gì để retry hiệu quả nhất?",
      "Tức là: request gọi lại cần chứa những gì để Claude sửa đúng trường sai.",
      "Soi từng phương án: Claude có thấy mình đã viết gì, sai ở đâu, và có nguồn để tìm giá trị đúng không?"
    ],
    facts: [
      "Mỗi lần gọi API là độc lập. Claude không nhớ lượt trước, trừ khi mày gửi kèm.",
      "Retry kèm lỗi (retry-with-error-feedback) gửi ba thứ: tài liệu gốc, output vừa sai, câu lỗi cụ thể. Thiếu tài liệu gốc thì Claude không có gì để đối chiếu.",
      "Gửi lại y nguyên request rồi cầu may thì Claude dễ sai y hệt.",
      "Instance độc lập (context sạch, không thấy reasoning lúc sinh output) bắt lỗi tinh vi tốt hơn khi review. Đó là việc review, không phải việc sửa một lỗi validate đã biết."
    ],
    opts: [
      { k: "A", gist: "Send back only the failed output and the exact Pydantic error messages, keeping each retry small and cheap.",
        why: [
          "Có output sai và câu lỗi, nhưng thiếu tài liệu gốc là diff (ý 2).",
          "Câu lỗi không nói giá trị đúng. Location phải khớp một dòng trong diff, mà không có diff thì Claude chỉ đoán (ý 1).",
          "Dễ bị cuốn vì đây đúng là vòng phản hồi lỗi, lại rẻ. Nó đủ khi câu lỗi tự nói cách sửa. Ở đây câu lỗi không nói."
        ] },
      { k: "B", gist: "Add a firm line to the retry prompt saying the previous output was invalid and that the schema must be followed exactly.",
        why: [
          "Nói “đã sai” mà không nói sai ở đâu thì Claude không có gì cụ thể để sửa.",
          "Request vẫn gần y như cũ, nên kết quả cũng gần như gửi lại y nguyên (ý 3)."
        ] },
      { k: "C", gist: "Build the retry from the original diff, the failed output, and the exact Pydantic error messages, so the model can correct the specific fields.",
        why: [
          "Đủ ba thứ của retry kèm lỗi (ý 2): output vừa sai cho biết đã viết gì, câu lỗi chỉ đúng trường hỏng, diff là nguồn để tìm giá trị đúng.",
          "Câu lỗi không nêu giá trị đúng, nên diff là thứ bắt buộc: Claude dò lại diff để lấy location khớp thật.",
          "Gọi lại 1–2 lần vẫn sai thì mới đưa người xem, không gọi tiếp."
        ] },
      { k: "D", gist: "Send each retry to a second, independent Claude instance with no memory of the first attempt, so the new output is not biased by the earlier mistake.",
        why: [
          "Instance độc lập mạnh ở review, không phải ở sửa lỗi validate (ý 4).",
          "Không thấy output sai, không thấy câu lỗi, thì nó chỉ là một lần chạy mới từ đầu. Đề đã cho thấy chạy lại kiểu đó hiếm khi thành công (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 4.4, mục “Gọi lại cho đúng cách”: request gọi lại chứa tài liệu gốc, JSON vừa trả, câu lỗi cụ thể", href: NOTES + "#l-4-4" },
      { label: "Bài 4.6: instance độc lập dùng để review, vì nó không mang reasoning lúc sinh code", href: NOTES + "#l-4-6" }
    ]
  },
  {
    de: 7, n: 56, total: 60, sub: "3.2", subName: "Slash command và skill", scen: "S5",
    answer: "B",
    ask: "A teammate's <code>/review-pr</code> skill has frontmatter with a <code>description</code> and a field written <code>argument_hint</code> set to <code>PR-NUMBER</code>. Claude picks up the skill when it is relevant, but typing <code>/review-pr</code> shows no autocomplete hint, and no error is reported. What is the fix?",
    scene: [
      "Đồng đội viết skill <code>/review-pr</code>. Frontmatter (khối YAML giữa hai dòng <code>---</code> đầu SKILL.md) có <code>description</code> và một trường viết là <code>argument_hint</code>, giá trị <code>PR-NUMBER</code>.",
      "Claude vẫn tự dùng skill khi hợp việc. Nhưng gõ <code>/review-pr</code> thì không thấy gợi ý tham số nào, cũng không có lỗi gì.",
      "Chỗ khó: một phần frontmatter chạy, một phần không, và không có thông báo nào chỉ ra chỗ hỏng."
    ],
    asks: [
      "Sửa thế nào?",
      "Tức là: vì sao <code>description</code> có tác dụng mà gợi ý tham số thì không.",
      "Soi từng phương án: nó có giải thích được cả hai dữ kiện không: description vẫn chạy, và không có lỗi nào hiện ra?"
    ],
    facts: [
      "Trường đúng tên là <code>argument-hint</code>, gạch ngang. Docs: “hint shown during autocomplete to indicate expected arguments” (gợi ý hiện lúc autocomplete, cho biết lệnh nhận tham số gì). Nó chỉ gợi ý, không bắt buộc, không kiểm tra giá trị.",
      "Docs ghi: tên trường phải khớp đúng bảng, kể cả dấu gạch ngang. Claude Code bỏ qua trường nó không nhận ra mà không báo lỗi.",
      "Claude Code chỉ đọc frontmatter khi dòng <code>---</code> mở đầu là dòng đầu tiên của file. Nếu không, cả file bị coi là nội dung skill.",
      "<code>$ARGUMENTS</code> là chỗ thân skill nhận tham số lúc chạy. <code>arguments</code> đặt tên cho tham số theo vị trí để thân skill dùng <code>$tên</code>. Cả hai phục vụ thân skill, không tạo gợi ý autocomplete."
    ],
    opts: [
      { k: "A", gist: "Put a <code>$ARGUMENTS</code> placeholder in the skill body, since the hint only appears when the content actually uses arguments.",
        why: [
          "Sai ở giả định: gợi ý không phụ thuộc thân skill có dùng tham số hay không. Nó chỉ đến từ <code>argument-hint</code> (ý 1, ý 4).",
          "Thêm <code>$ARGUMENTS</code> chỉ đổi chỗ tham số được chèn vào lúc chạy. Menu autocomplete vẫn trống."
        ] },
      { k: "B", gist: "Rename the field to <code>argument-hint</code> with a hyphen, because Claude Code ignores frontmatter fields it does not recognize.",
        why: [
          "<code>argument_hint</code> gạch dưới không phải tên trường nào trong bảng. Claude Code bỏ qua nó mà không báo lỗi (ý 2). Khớp đúng hai triệu chứng: không có gợi ý, không có lỗi.",
          "Đổi thành <code>argument-hint</code> là gợi ý <code>PR-NUMBER</code> hiện ra lúc gõ lệnh (ý 1)."
        ] },
      { k: "C", gist: "Declare the parameter in an <code>arguments</code> frontmatter field, since the autocomplete hint lists the entries from that field.",
        why: [
          "<code>arguments</code> là trường thật, nhưng nó đặt tên tham số cho thân skill (ý 4). Gợi ý autocomplete không lấy từ đó.",
          "Dễ bị cuốn vì có chữ “arguments”, lại đúng là trường có trong docs. Nhưng thứ hiện cho người đang gõ lệnh chỉ có <code>argument-hint</code>."
        ] },
      { k: "D", gist: "Move the opening frontmatter delimiter to the very first line of SKILL.md, since frontmatter is only read from there.",
        why: [
          "Lỗi này có thật (ý 3), nhưng đề đã loại nó: Claude vẫn dùng skill khi hợp việc, tức <code>description</code> trong cùng khối frontmatter đang được đọc.",
          "Frontmatter đã được đọc thì chỉ còn một trường hỏng, là trường viết sai tên.",
          "Dễ bị cuốn vì “frontmatter không được đọc” giải thích được chuyện mất gợi ý. Nhưng nó không giải thích được chuyện description vẫn chạy."
        ] }
    ],
    refs: [
      { label: "Bài 3.2, ô “Đã sửa 01/11” về argument-hint: gợi ý hiện trong autocomplete, không bắt buộc", href: NOTES + "#fix-4b" },
      { label: "Bài 3.2, mục “Biết thêm”: tham số qua $ARGUMENTS, hoặc khai arguments rồi dùng $tên", href: NOTES + "#l-3-2" },
      { label: "Docs Skills, mục frontmatter: tên trường phải khớp đúng kể cả gạch ngang, trường lạ bị bỏ qua không báo lỗi; frontmatter chỉ được đọc khi --- nằm ở dòng đầu", href: "https://code.claude.com/docs/en/skills" }
    ]
  },
  {
    de: 7, n: 57, total: 60, sub: "4.1", subName: "Prompt có tiêu chí rõ để giảm false positive", scen: "S5",
    answer: "A",
    ask: "In the automated review, 55% of documentation findings are false positives, while security findings are accurate. Developers now dismiss every finding without reading it, and improving the documentation prompts will take roughly two weeks. What should the team do during those two weeks?",
    scene: [
      "Bot review có nhiều category (nhóm finding). Category documentation (tài liệu, comment trong code) báo nhầm 55%. Category security thì báo đúng.",
      "Hậu quả lan sang cả bot: dev bỏ qua mọi finding mà không đọc, kể cả finding security.",
      "Sửa prompt cho documentation mất khoảng hai tuần.",
      "Chỗ khó: đề hỏi việc làm trong hai tuần đó, không hỏi sửa prompt thế nào."
    ],
    asks: [
      "Trong hai tuần đó team nên làm gì?",
      "Tức là: trong lúc sửa, làm sao cho finding sai thôi đến tay dev, còn finding đúng được đọc lại.",
      "Soi từng phương án: làm xong, finding documentation sai còn hiện ra cho dev không?"
    ],
    facts: [
      "False positive (báo nhầm): finding không đáng báo, dev bỏ qua. Precision: trong các finding đã báo, bao nhiêu phần trăm là đúng.",
      "Dev không tách “bot sai về mục này” với “bot đúng về mục kia”. Họ chỉ nhớ “bot hay sai”. Một category báo nhầm nhiều kéo cả bot xuống.",
      "Guide khuyên tạm tắt category báo nhầm nhiều để giữ uy tín cho các category đang đúng, sửa tiêu chí của nó riêng, đo lại trên bộ ca đã biết đáp án rồi mới bật lại.",
      "Lời dặn kiểu “only high-confidence” (chỉ báo khi rất chắc) là tiêu chí mơ hồ. Confidence model tự chấm lệch xa độ đúng thật, nên không kéo được precision lên."
    ],
    opts: [
      { k: "A", gist: "Switch off the documentation category in the pipeline while its prompts are reworked offline, and turn it back on once precision recovers.",
        why: [
          "Tắt là cắt ngay nguồn báo nhầm (ý 3). Category security vẫn chạy, nên những gì dev thấy lại đáng tin (ý 2).",
          "Prompt documentation được sửa riêng, không bày ra trước mặt dev. Đo đạt rồi mới bật lại.",
          "Cùng ý với Đề 2 câu 60."
        ] },
      { k: "B", gist: "Keep the documentation category live and improve its prompt with contrasting few-shot examples, tracking precision on each new pull request.",
        why: [
          "Cách sửa thì đúng: cặp ví dụ đối chiếu “chấp nhận được / lỗi thật” giảm báo nhầm, đo precision cũng tốt.",
          "Nhưng sửa mất hai tuần, mà category vẫn chạy. Suốt hai tuần đó dev vẫn thấy finding sai, uy tín của cả bot tiếp tục tụt (ý 2).",
          "Dễ bị cuốn vì đây là phương án duy nhất nói tới cách sửa thật. Nhưng đề hỏi làm gì trong lúc chờ sửa, và vừa sửa vừa đăng thì mỗi lần sai lại mất thêm uy tín."
        ] },
      { k: "C", gist: "Add an instruction telling the reviewer to report only the documentation findings it is highly confident about.",
        why: [
          "Đây là tiêu chí mơ hồ (ý 4). Model hiểu “highly confident” (rất chắc) mỗi lần một kiểu, nên precision không lên chắc chắn.",
          "Muốn giảm báo nhầm phải có tiêu chí rõ hoặc ví dụ, tức vẫn là phần việc hai tuần kia."
        ] },
      { k: "D", gist: "Make documentation findings non-blocking suggestions so they stop gating merges, while every category stays visible to developers.",
        why: [
          "Non-blocking (không chặn merge) chỉ đổi hậu quả của finding, không đổi chuyện dev vẫn thấy nó.",
          "Finding sai vẫn hiện trong mọi lần review, nên dev vẫn bỏ qua cả finding security (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 4.1, mục “Niềm tin sụp theo cụm”: một loại báo nhầm nhiều kéo cả bot xuống; tạm tắt, sửa riêng, đo rồi mới bật lại", href: NOTES + "#l-4-1" },
      { label: "Cheatsheet D4: dòng “Một category báo sai nhiều, dev bỏ qua cả category đúng”", href: NOTES + "#cheat-d4" }
    ]
  },
  {
    de: 7, n: 58, total: 60, sub: "4.1", subName: "Prompt có tiêu chí rõ để giảm false positive", scen: "S5",
    answer: "B",
    ask: "Developers dismissed 70% of the findings carrying one particular <code>detected_pattern</code> value, so the team switched that category off and rewrote its prompt with explicit criteria. Every past finding is stored along with whether it was dismissed. How should the team confirm the revised prompt works before turning the category back on?",
    scene: [
      "Finding có trường <code>detected_pattern</code> (cấu trúc code đã kích hoạt finding). Finding mang một giá trị trong đó bị dev dismiss (bỏ qua) 70%.",
      "Team đã tắt category đó và viết lại prompt với tiêu chí rõ.",
      "Mọi finding cũ đều được lưu kèm kết quả: bị dismiss hay không.",
      "Chỗ khó: phải biết prompt mới có tốt hơn không trước khi bật lại, mà không để dev gánh thêm finding sai."
    ],
    asks: [
      "Team nên kiểm prompt mới thế nào trước khi bật lại?",
      "Tức là: đo được precision của prompt mới mà dev không phải thấy finding nào.",
      "Soi từng phương án: nó đo bằng phán đoán thật của dev, hay bằng thứ khác? Và có phải bật lại cho dev thấy trước khi biết kết quả không?"
    ],
    facts: [
      "Lịch sử finding gắn <code>detected_pattern</code> và kết quả dismiss là một bộ ca đã có đáp án: dev đã chấm từng finding đáng báo hay không.",
      "Guide: bật lại category đã tắt khi tiêu chí mới pass bộ ca có đáp án. Đo precision/recall trên bộ đó, không bật lại chỉ vì “thấy ít comment hơn”.",
      "Category bị tắt là để dev khỏi thấy finding sai. Bật lại khi chưa đo là trả lại đúng thứ đã làm mất niềm tin.",
      "Confidence model tự chấm lệch xa độ đúng thật. Confidence trung bình cao vẫn có thể đi cùng tỉ lệ báo nhầm cao."
    ],
    opts: [
      { k: "A", gist: "Bring the findings back as low-severity suggestions so developers see them with no merge impact, and watch whether dismissals drop.",
        why: [
          "Hạ severity chỉ đổi cách hiện, không đổi finding đúng hay sai.",
          "Dev vẫn thấy và vẫn phải lọc finding sai. Uy tín tiếp tục tụt trong lúc chờ số liệu (ý 3)."
        ] },
      { k: "B", gist: "Re-run the revised prompt on past pull requests that produced findings for this pattern, and measure precision against the recorded dismissals.",
        why: [
          "Dữ liệu dismiss đã lưu là bộ ca có đáp án cho đúng pattern này (ý 1). Chạy lại prompt mới trên các PR cũ rồi so với kết quả dismiss là ra precision.",
          "Đúng cách guide nói: đo trên bộ ca có đáp án rồi mới bật lại (ý 2). Đo xong trước khi dev thấy bất kỳ finding nào."
        ] },
      { k: "C", gist: "Turn the category back on in CI and track its dismissal rate over the next several sprints to confirm precision improved.",
        why: [
          "Theo dõi tỉ lệ dismiss trên dữ liệu thật là vòng phản hồi tốt nói chung.",
          "Nhưng bật lại khi chưa biết prompt mới có tốt không là đưa finding có thể vẫn sai tới tay dev suốt mấy sprint (ý 3).",
          "Dễ bị cuốn vì nó đo đúng thứ cần đo: dev dismiss bao nhiêu. Nhưng con số đó đã có sẵn trong lịch sử, đo offline được ngay (ý 1)."
        ] },
      { k: "D", gist: "Have the model self-rate confidence on each finding and re-enable the category once average confidence passes a set threshold.",
        why: [
          "Confidence tự chấm không đo độ đúng thật (ý 4). Prompt mới có thể làm model tự tin hơn mà vẫn báo nhầm như cũ.",
          "Thứ cần so là phán đoán của dev, và nó đã nằm trong lịch sử dismiss (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 4.1, mục “Biết thêm”: bật lại category đã tắt khi tiêu chí mới pass bộ ca có đáp án, đo precision/recall trên bộ đó", href: NOTES + "#l-4-1" },
      { label: "Bài 4.4, mục “Cùng ý ở hệ thống B”: detected_pattern để gom và phân tích finding bị dismiss", href: NOTES + "#l-4-4" }
    ]
  },
  {
    de: 7, n: 59, total: 60, sub: "4.5", subName: "Xử lý theo lô (Batch)", scen: "S5",
    answer: "D",
    ask: "The team plans a one-time audit of 9,000 source files as a single Message Batches API submission. The audit prompt is a fresh first draft. How should they maximize first-pass success and avoid paying for a large rerun?",
    scene: [
      "Team định audit (rà soát) 9.000 file mã nguồn một lần, nộp cả 9.000 trong một batch.",
      "Prompt audit mới là bản nháp đầu, chưa thử trên file nào.",
      "Chỗ khó: prompt yếu thì cả 9.000 kết quả cùng yếu. Batch có thể mất tới 24 giờ mới biết, và chạy lại là trả tiền cả lô lần nữa."
    ],
    asks: [
      "Làm sao để lần chạy đầu đạt nhiều nhất, khỏi trả tiền chạy lại cả lô?",
      "Tức là: tìm và sửa lỗi của prompt ở đâu thì rẻ và nhanh nhất, trước khi nộp lô lớn.",
      "Soi từng phương án: prompt có được thử thật trước khi nhân lên 9.000 lần không, và vòng thử đó nhanh hay chậm?"
    ],
    facts: [
      "Message Batches API xử lý bất đồng bộ, rẻ 50%, nhưng tối đa 24 giờ và không cam kết thời gian. Mỗi request mang một <code>custom_id</code> để ghép với kết quả.",
      "Guide: trước khi chạy lô lớn, tinh chỉnh prompt trên một mẫu nhỏ bằng gọi thường (đồng bộ, có kết quả ngay). Tỉ lệ thành công lần đầu cao thì đỡ tốn tiền nộp lại.",
      "<code>custom_id</code> giúp tìm và nộp lại đúng request bị lỗi, ví dụ tài liệu vượt context. Kết quả kém chất lượng vẫn về dưới dạng thành công, không có gì đánh dấu là lỗi.",
      "Few-shot là một cách làm prompt ổn định hơn, nhưng thêm ví dụ chưa cho biết prompt có chạy tốt trên đúng bộ code này không."
    ],
    opts: [
      { k: "A", gist: "Submit the whole batch now, then use the <code>custom_id</code> values to find unsatisfactory results and resubmit only those files with a revised prompt.",
        why: [
          "<code>custom_id</code> là để nộp lại request lỗi (ý 3). Prompt nháp yếu thì cả lô yếu, mà kết quả lại về dưới dạng thành công.",
          "Lúc đó gần như phải chạy lại cả 9.000 file, tức trả tiền hai lần.",
          "Dễ bị cuốn vì “chỉ nộp lại phần hỏng theo custom_id” đúng là điều guide dạy. Nhưng đó là cho lỗi của từng request, không phải cho prompt kém."
        ] },
      { k: "B", gist: "Put few-shot examples for every issue category into the prompt, then submit the full batch, since examples are the most reliable consistency technique.",
        why: [
          "Thêm ví dụ có thể giúp, nhưng vẫn chưa ai thử prompt trên file thật (ý 4).",
          "Vẫn nộp cả 9.000 với một prompt chưa kiểm, rủi ro chạy lại y như cũ."
        ] },
      { k: "C", gist: "Split the 9,000 files into several smaller batches, submitting each one only after reviewing the previous batch's output and tuning the prompt.",
        why: [
          "Có vòng học giữa các đợt, nhưng mỗi vòng có thể chờ tới 24 giờ (ý 1).",
          "Mỗi đợt tốn hàng trăm, hàng nghìn request trả tiền để học điều mà một mẫu nhỏ gọi thường cho biết ngay (ý 2)."
        ] },
      { k: "D", gist: "Run the prompt synchronously on a representative sample of files, edge cases included, and refine it until the results are acceptable before submitting the full batch.",
        why: [
          "Đúng lời khuyên của guide: tinh chỉnh trên mẫu nhỏ bằng gọi thường trước khi chạy lô (ý 2).",
          "Gọi thường có kết quả ngay, nên mỗi vòng sửa prompt nhanh và chỉ tốn vài request. Mẫu có cả ca khó thì lỗi lộ ra sớm.",
          "Prompt ổn rồi mới nộp 9.000 file, lần chạy đầu đạt cao, khỏi chạy lại cả lô."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Khi batch có request lỗi”: chỉ nộp lại phần lỗi theo custom_id; trước khi chạy lô lớn, tinh chỉnh prompt trên mẫu nhỏ", href: NOTES + "#l-4-5" },
      { label: "Bài Nền tảng D4, mục 7: Batch rẻ 50%, tối đa 24 giờ, ghép kết quả theo custom_id", href: NOTES + "#l-4-0" }
    ]
  },
  {
    de: 7, n: 60, total: 60, sub: "3.2", subName: "Slash command và skill", scen: "S5",
    answer: "D",
    ask: "A skill posts review findings as pull request comments. Claude sometimes launches it by itself and posts draft findings too early. The team wants the skill to run only from an explicit slash command. Which configuration achieves this?",
    scene: [
      "Có một skill đăng finding review thành comment trên pull request. Việc này có tác động ra ngoài: đăng rồi là ai cũng thấy.",
      "Claude thỉnh thoảng tự gọi skill này và đăng cả finding còn nháp, quá sớm.",
      "Team muốn skill chỉ chạy khi có người gõ lệnh <code>/</code>."
    ],
    asks: [
      "Cấu hình nào làm được điều đó?",
      "Tức là: chặn Claude tự gọi skill, mà người vẫn gõ lệnh được.",
      "Soi từng phương án: nó quyết định <b>ai được gọi skill</b>, hay lo chuyện khác? Và nó là cấu hình Claude Code thi hành, hay chỉ là lời dặn?"
    ],
    facts: [
      "Mặc định, skill chạy được theo hai đường: người gõ <code>/tên</code>, hoặc Claude tự nạp khi <code>description</code> khớp việc đang làm.",
      "<code>disable-model-invocation: true</code>: Claude không tự gọi skill được, chỉ người gõ lệnh. Docs khuyên dùng cho workflow có tác động ra ngoài hoặc cần người quyết lúc chạy, như <code>/commit</code>, <code>/deploy</code>. Claude cố gọi thì Claude Code chặn lại.",
      "<code>user-invocable: false</code> làm ngược lại: giấu skill khỏi menu <code>/</code>, gõ <code>/tên</code> cũng không chạy, chỉ Claude tự gọi.",
      "<code>allowed-tools</code> là danh sách tool được duyệt sẵn, không hỏi quyền trong lượt skill chạy. Nó không quyết định ai được gọi skill. CLAUDE.md là chỉ dẫn Claude làm theo phần lớn thời gian, không phải cấu hình bắt buộc."
    ],
    opts: [
      { k: "A", gist: "Set <code>user-invocable: false</code> in the skill's SKILL.md frontmatter.",
        why: [
          "Ngược hẳn yêu cầu: trường này bỏ đường gõ lệnh, chỉ để lại đường Claude tự gọi (ý 3).",
          "Claude vẫn tự đăng finding sớm, còn dev thì không chạy skill được nữa.",
          "Dễ bị cuốn vì “invocable” (gọi được) nghe đúng chủ đề. Nhưng <code>user-invocable</code> nói về người gọi, và đặt <code>false</code> là cấm người gọi."
        ] },
      { k: "B", gist: "Set <code>allowed-tools</code> in the skill's SKILL.md frontmatter to a list of read-only tools.",
        why: [
          "<code>allowed-tools</code> chỉ lo tool nào được duyệt sẵn khi skill chạy (ý 4). Nó không đụng tới chuyện ai được bắt đầu skill.",
          "Claude vẫn tự gọi skill được như cũ."
        ] },
      { k: "C", gist: "Add a rule to the project CLAUDE.md saying the skill runs only when a developer explicitly asks for it.",
        why: [
          "CLAUDE.md là chỉ dẫn, Claude làm theo phần lớn thời gian chứ không phải mọi lần (ý 4).",
          "<code>description</code> vẫn khớp việc đang làm thì Claude vẫn có lúc tự gọi. Đề đòi “only an explicit slash command” (chỉ khi gõ lệnh), tức cần cơ chế chặn, không phải lời dặn."
        ] },
      { k: "D", gist: "Set <code>disable-model-invocation: true</code> in the skill's SKILL.md frontmatter.",
        why: [
          "Đúng trường quyết định ai được gọi: Claude không tự gọi được nữa, chỉ còn đường gõ lệnh (ý 2).",
          "Claude cố gọi thì Claude Code chặn. Đây là cấu hình được thi hành, không phải lời dặn.",
          "Đúng ca docs nêu: việc có tác động ra ngoài như đăng comment thì để người quyết lúc chạy."
        ] }
    ],
    refs: [
      { label: "Bài 3.2: disable-model-invocation: true, chỉ người gọi được, model không tự kích hoạt", href: NOTES + "#l-3-2" },
      { label: "Docs Skills, mục “Control who invokes a skill”: bảng disable-model-invocation và user-invocable, ai gọi được skill", href: "https://code.claude.com/docs/en/skills" }
    ]
  }
);
