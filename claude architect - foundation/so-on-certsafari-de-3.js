// Sổ ôn certsafari, Đề 3. Trang so-on-certsafari.html nạp file này trước script render.
// Mỗi câu một phần tử, xếp theo n. Các trường:
//   de, n, total     số đề trong sổ; số thứ tự câu trong đề gốc; tổng số câu của đề gốc
//   sub, subName     task statement của guide (vd "3.2") và tên bài bằng tiếng Việt
//   first            (tùy chọn) đáp án user chọn lần đầu trên đề gốc
//   answer           đáp án đúng, đã kiểm bằng notes ôn thi hoặc docs chính thức
//   dispute          (tùy chọn) khi đáp án gốc của đề khác answer: vì sao sổ chọn khác
//   ask, opts[].gist tiếng Anh, viết lại bằng lời riêng (không chép nguyên văn)
//   opts[].why, trap, tip, refs[].label  tiếng Việt
//   refs[].href      NOTES + "#<id có trong notes>"
DE[3] = "Certsafari · 60 câu · 03/11/2026";
ENTRIES.push(
  {
    de: 3, n: 1, total: 60, sub: "4.1", subName: "Prompt có tiêu chí rõ để giảm false positive",
    first: "A", answer: "D",
    ask: "A team is drafting the definition of “critical” severity for its code-review prompt. The goal is that reviewers anywhere in the organization land on the same severity whenever they see the same kind of issue. Which definition serves that goal best?",
    scene: [
      "Một team đang viết định nghĩa mức “critical” (nghiêm trọng nhất) cho prompt review code.",
      "Mục tiêu: reviewer ở bất kỳ đâu trong tổ chức, gặp cùng một loại lỗi, đều “land on the same severity” (chấm ra cùng một mức).",
      "Chỗ khó: phương án nào cũng kèm một ví dụ cụ thể, nghe đều hợp lý. Không chọn được nhờ ví dụ, phải soi chính tiêu chí."
    ],
    asks: [
      "Định nghĩa nào phục vụ mục tiêu đó tốt nhất?",
      "Tức là: tìm định nghĩa mà hai người khác nhau đọc cùng một diff sẽ ra cùng một kết luận.",
      "Soi từng phương án: ngưỡng của nó là điều kiện nằm trong thay đổi, là cảm nhận của người đọc, hay là thứ nằm ngoài thay đổi? Và chuyện nó mô tả có đúng là mức nặng nhất không?"
    ],
    facts: [
      "Gán severity (mức nghiêm trọng) theo một ngưỡng mơ hồ, kiểu “theo mức ảnh hưởng”, thì mỗi lần chấm một kiểu: cùng một lỗi, chỗ này critical, chỗ kia low.",
      "Cách sửa của bài 4.1: định nghĩa từng mức bằng tiêu chí rõ, kèm ví dụ code. Tiêu chí rõ là một điều kiện cụ thể đối chiếu được với code, không phải tính từ hay phản ứng của người đọc.",
      "Notes lấy ví dụ: critical = có thể mất hoặc lộ dữ liệu.",
      "Chuyện dễ đọc, dễ bảo trì nằm ở mức thấp nhất (🟢), không phải critical."
    ],
    opts: [
      { k: "A", gist: "Critical: the change contains something a senior engineer would not approve without talking it through first, for example a race condition in a payment function that could leave account data inconsistent.",
        why: [
          "Sai ở chỗ ngưỡng là phản ứng của một người: senior “would not approve without talking it through” (không duyệt nếu chưa bàn kỹ). Đó là cảm nhận, không phải điều kiện trong code (ý 2).",
          "Mức ngần ngại tùy kinh nghiệm và khẩu vị rủi ro của từng senior. Cùng race condition đó, người này chấm critical, người kia chấm high, đúng thứ đề muốn tránh (ý 1).",
          "Dễ bị cuốn vì race condition trong hàm thanh toán nghe rất nặng, và “senior engineer” nghe như một chuẩn chung. Nhưng đổi người đọc là đổi kết quả. Ví dụ hay mấy cũng không cứu được một tiêu chí không kiểm được trên diff."
        ] },
      { k: "B", gist: "Critical: the change is clearly harder to follow than the code around it, for example a refactor whose deeply nested callbacks hide the control flow and slow review down.",
        why: [
          "Sai ở tiêu chí: “clearly harder to follow” (khó theo dõi hơn code xung quanh) là cảm nhận, mỗi người đo một kiểu (ý 2).",
          "Sai cả mức: khó đọc là chuyện bảo trì, thuộc mức thấp nhất (ý 4). Định nghĩa này đẩy hàng loạt refactor vô hại lên mức nặng nhất."
        ] },
      { k: "C", gist: "Critical: the change lands in a component with recent incidents, for example the authentication service, which had three outages last quarter from token validation failures.",
        why: [
          "Sai ở chỗ tiêu chí dựa vào lịch sử của component, không dựa vào lỗi trong thay đổi (ý 2).",
          "Sửa một dòng comment trong auth service cũng thành critical. Còn lỗ hổng thật ở một component chưa từng sự cố thì không. Cùng loại lỗi mà khác chỗ là khác mức, trái mục tiêu của đề."
        ] },
      { k: "D", gist: "Critical: the change lets callers without the required authorization reach protected data, for example a permission check removed ahead of a database query that returns another user's records.",
        why: [
          "Tiêu chí là một điều kiện trên chính thay đổi: người không có quyền chạm được dữ liệu được bảo vệ. Ai đọc diff cũng kiểm được, nên ra cùng kết luận (ý 2).",
          "Ví dụ “xóa check quyền trước query trả bản ghi của người khác” chỉ rõ chỗ nào chạm ngưỡng, đúng kiểu định nghĩa kèm ví dụ code của bài 4.1.",
          "Và đây đúng là chuyện nặng nhất: lộ dữ liệu, thiếu kiểm quyền (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 4.1, mục “Cùng một lỗi, lúc nặng lúc nhẹ”: định nghĩa từng mức severity kèm ví dụ code", href: NOTES + "#l-4-1" },
      { label: "Cheatsheet D4: dòng “Severity lúc high lúc low cho cùng pattern”", href: NOTES + "#cheat-d4" }
    ]
  },
  {
    de: 3, n: 2, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới",
    first: "C", answer: "D",
    ask: "An architect writes a Python build-pipeline script on the Claude Agent SDK. Each prompt the script sends is a self-contained one-shot task, and no later prompt ever needs the context of an earlier one. Following the SDK's session guidance, how much session handling should the script include?",
    scene: [
      "Kiến trúc sư viết script Python cho pipeline build, chạy trên Claude Agent SDK.",
      "Mỗi prompt script gửi đi là một tác vụ một phát (one-shot), tự đủ. Không prompt nào sau cần ngữ cảnh của prompt trước.",
      "Chỗ khó: SDK có cả loạt tùy chọn phiên (continue, resume, fork), dễ nghĩ script nào cũng nên dùng một cái cho chắc."
    ],
    asks: [
      "Theo hướng dẫn về session của SDK, script nên xử lý phiên đến mức nào?",
      "Tức là: tác vụ độc lập, một prompt, không hỏi tiếp thì có cần continue, resume hay fork gì không?",
      "Soi từng phương án: tùy chọn đó giải quyết nhu cầu gì, và đề có nhu cầu đó không?"
    ],
    facts: [
      "Docs Agent SDK, trang Sessions, bảng “Choose an approach” (chọn cách làm): tác vụ một phát, một prompt, không hỏi tiếp → “Nothing extra. One <code>query()</code> call handles it.” (không cần gì thêm, một lần gọi <code>query()</code> là đủ). Trong một lần gọi, agent tự chạy bao nhiêu turn cũng được.",
      "Resume: mở lại một phiên cũ để làm tiếp, lịch sử cũ được nạp lại. Muốn resume thì phải giữ <code>session_id</code> của phiên đó.",
      "Fork: tạo phiên mới bằng cách sao chép lịch sử của một phiên có sẵn, rồi đi tiếp độc lập. Trong SDK nó đặt cùng <code>resume</code>, tức phải có phiên cũ để tách.",
      "<code>continue_conversation=True</code> (dòng lệnh: <code>--continue</code>) nối vào phiên gần nhất trong thư mục."
    ],
    opts: [
      { k: "A", gist: "Pass <code>continue_conversation=True</code> on every call, so a later follow-up could pick up the earlier context.",
        why: [
          "Sai ở nhu cầu: <code>continue_conversation=True</code> nối vào phiên gần nhất (ý 4). Docs dùng nó để đi tiếp sau khi process khởi động lại, không phải cho tác vụ độc lập.",
          "Ở đây mỗi lần gọi sẽ kéo theo lịch sử của tác vụ trước, nhét ngữ cảnh của việc khác vào việc này. Đề đã nói không prompt nào cần thứ đó."
        ] },
      { k: "B", gist: "Set <code>fork_session=True</code> so a parallel branch exists in case a follow-up turns out to be needed.",
        why: [
          "Sai ở nhu cầu: fork dùng để thử hướng khác mà giữ nguyên phiên gốc, và phải có phiên cũ để tách (ý 3).",
          "Không có follow-up nào thì tách nhánh “in case” (phòng khi) chỉ đẻ thêm phiên thừa."
        ] },
      { k: "C", gist: "Read the session ID from each result and pass it to <code>resume</code> on a second call, just to be safe.",
        why: [
          "Sai ở nhu cầu: lấy <code>session_id</code> rồi <code>resume</code> là để quay lại đúng một phiên cũ (ý 2): hỏi tiếp, chạy lại sau khi chạm giới hạn turn hay budget, hoặc khôi phục sau khi process khởi động lại.",
          "Tác vụ một phát không cần việc nào trong số đó. Làm thêm chỉ tốn một lần gọi và thêm state phải giữ.",
          "Dễ bị cuốn vì “just to be safe” (cho chắc) nghe như thói quen tốt. Nhưng đề đã nói không prompt nào cần ngữ cảnh của prompt trước, nên giữ ID để resume là thêm việc cho một nhu cầu không có."
        ] },
      { k: "D", gist: "Nothing extra: one <code>query()</code> call per task, without capturing session IDs or setting continue or resume options.",
        why: [
          "Đúng bảng của docs: tác vụ một phát thì không cần gì thêm, mỗi tác vụ một lần gọi <code>query()</code> (ý 1).",
          "Quản lý phiên chỉ cần khi nhiều prompt phải dùng chung ngữ cảnh. Đề nói rõ không có ca đó, nên continue, resume hay fork thêm vào đều thừa."
        ] }
    ],
    refs: [
      { label: "Bài 1.7: resume, fork và khi nào mở phiên mới", href: NOTES + "#l-1-7" },
      { label: "Docs Agent SDK, trang Sessions: bảng “Choose an approach” (One-shot task → Nothing extra)", href: "https://code.claude.com/docs/en/agent-sdk/sessions#choose-an-approach" }
    ]
  },
  {
    de: 3, n: 3, total: 60, sub: "2.3", subName: "Chia tool cho agent và tool_choice",
    first: "B", answer: "D",
    ask: "A document-processing agent has an <code>extract_metadata</code> tool plus several enrichment tools (<code>add_tags</code>, <code>link_related</code>, <code>generate_summary</code>). The enrichment tools need fields that only <code>extract_metadata</code> produces, yet in early tests the model sometimes calls an enrichment tool first with guessed values. What is the recommended way to guarantee the right order for this first step?",
    scene: [
      "Agent xử lý tài liệu có tool <code>extract_metadata</code> (trích metadata) và vài tool làm giàu dữ liệu (enrichment): <code>add_tags</code>, <code>link_related</code>, <code>generate_summary</code>.",
      "Tool enrichment cần các trường mà chỉ <code>extract_metadata</code> tạo ra.",
      "Chỗ khó: khi test, model thỉnh thoảng gọi tool enrichment trước, với giá trị tự đoán. Đề cần “guarantee” (bảo đảm) đúng thứ tự cho bước đầu, không phải “thường thì đúng”."
    ],
    asks: [
      "Cách được khuyên dùng để bảo đảm đúng thứ tự cho bước đầu là gì?",
      "Tức là: ở lượt cần metadata, phải chắc chắn <code>extract_metadata</code> được gọi.",
      "Soi từng phương án: nó ép đúng tool đó, chỉ ép gọi một tool nào đó, hay chỉ là gợi ý? Và nó có phải cơ chế API có sẵn cho đúng việc này không?"
    ],
    facts: [
      "<code>tool_choice: {\"type\": \"auto\"}</code> là mặc định: model tự quyết có gọi tool không và gọi tool nào, có thể trả lời bằng chữ.",
      "<code>{\"type\": \"any\"}</code> bắt buộc gọi một tool, nhưng model vẫn tự chọn tool nào.",
      "<code>{\"type\": \"tool\", \"name\": \"extract_metadata\"}</code> là ép đúng một tool (forced tool selection): lượt đó bắt buộc gọi tool có tên ấy. Guide dùng chính ví dụ này: ép <code>extract_metadata</code> chạy trước, các bước enrichment xử lý ở lượt sau.",
      "Mô tả tool hay lời dặn trong prompt giúp model chọn đúng hơn, nhưng chỉ là gợi ý: tỉ lệ sai giảm, không về 0."
    ],
    opts: [
      { k: "A", gist: "Set <code>tool_choice</code> to <code>{\"type\": \"any\"}</code> for the whole conversation, so the model must pick some tool every turn and is trusted to choose <code>extract_metadata</code> first when metadata is missing.",
        why: [
          "Sai ở chỗ <code>any</code> chỉ bắt gọi một tool nào đó, Claude vẫn tự chọn tool (ý 2). Nó vẫn có thể gọi <code>add_tags</code> trước với giá trị đoán, đúng lỗi đang gặp.",
          "“Trusted to choose” (tin model tự chọn đúng) không phải bảo đảm. Đặt cho cả hội thoại còn bắt gọi tool cả ở lượt lẽ ra trả lời bằng chữ."
        ] },
      { k: "B", gist: "Leave the enrichment tools out of the tool list on the first turn and offer only <code>extract_metadata</code>, then add <code>add_tags</code>, <code>link_related</code> and <code>generate_summary</code> back once it has returned.",
        why: [
          "Chạy được: chỉ còn một tool thì model không gọi nhầm tool khác.",
          "Nhưng chưa bắt model phải gọi tool: với <code>auto</code>, model vẫn có thể trả lời bằng chữ (ý 1). Và mày phải tự thêm bớt danh sách tool qua từng lượt, trong khi API có sẵn nút ép đúng tool (ý 3).",
          "Dễ bị cuốn vì bỏ bớt tool nghe chắc ăn: không còn gì để gọi nhầm. Nhưng đề hỏi “recommended way” (cách được khuyên dùng), và cách đó là ép tool bằng <code>tool_choice</code>."
        ] },
      { k: "C", gist: "Add to each enrichment tool's description that it needs fields only <code>extract_metadata</code> provides, and keep <code>tool_choice</code> on <code>auto</code> throughout.",
        why: [
          "Sai ở chỗ mô tả tool chỉ là gợi ý (ý 4). Với <code>auto</code>, model vẫn có thể gọi enrichment trước (ý 1).",
          "Đề đòi “guarantee” (bảo đảm), mà lời dặn thì chỉ giảm được tỉ lệ sai."
        ] },
      { k: "D", gist: "Set <code>tool_choice</code> to <code>{\"type\": \"tool\", \"name\": \"extract_metadata\"}</code> on the turn that needs metadata, then let the model choose among the enrichment tools with <code>auto</code> or <code>any</code> on later turns.",
        why: [
          "Lượt cần metadata: <code>tool_choice</code> ép đúng <code>extract_metadata</code>, Claude bắt buộc gọi nó (ý 3). Không còn đường gọi enrichment trước.",
          "Metadata đã nằm trong hội thoại thì đổi về <code>auto</code> hoặc <code>any</code> để model tự chọn tool enrichment (ý 1, ý 2).",
          "Đúng mẫu guide nêu, và khớp Đề 2 câu 16: một bước phải chạy trước thì ép tool theo tên ở lượt đó."
        ] }
    ],
    refs: [
      { label: "Bài 2.3: bảng tool_choice, dòng extract_metadata chạy trước enrichment", href: NOTES + "#l-2-3" },
      { label: "Bài 4.3, mục “Ép model gọi tool bằng tool_choice”: auto, any và ép đúng một tool", href: NOTES + "#l-4-3" },
      { label: "Bài 1.4: prompt-based guidance chỉ giảm tỉ lệ sai, muốn bảo đảm thì phải ép bằng cơ chế", href: NOTES + "#l-1-4" }
    ]
  },
  {
    de: 3, n: 4, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới",
    first: "C", answer: "D",
    ask: "In an interactive Claude Code session chasing a caching bug, the architect wants to explore another hypothesis without losing the current line of reasoning, and wants to stay in the terminal rather than script against the SDK. Which in-session action creates a divergent copy of the conversation and leaves the current one intact?",
    scene: [
      "Kiến trúc sư đang ở trong một phiên Claude Code tương tác, đuổi theo một bug cache.",
      "Họ muốn thử một giả thuyết khác mà không mất mạch suy luận hiện tại.",
      "Chỗ khó: phải làm ngay trong terminal, không viết script gọi SDK. Nên câu trả lời phải là một lệnh gõ trong phiên, không phải tùy chọn <code>fork_session</code> của SDK."
    ],
    asks: [
      "Lệnh nào trong phiên tạo ra một bản sao rẽ nhánh của hội thoại mà vẫn giữ nguyên hội thoại hiện tại?",
      "Tức là: cần cùng lúc hai thứ: một phiên mới mang lịch sử tới giờ, và phiên gốc còn nguyên để quay lại.",
      "Soi từng phương án: lệnh đó có tạo bản sao không? Phiên gốc có còn nguyên không?"
    ],
    facts: [
      "Fork (tách nhánh): tạo phiên mới bằng cách sao chép lịch sử của phiên tới lúc đó, rồi đi tiếp độc lập. Phiên gốc không bị đụng tới. Dòng lệnh có <code>--fork-session</code>, SDK có <code>fork_session</code>.",
      "Ngay trong phiên, <code>/branch [tên]</code> sao chép hội thoại sang một phiên mới có ID riêng rồi chuyển mày sang đó. Phiên gốc giữ nguyên, quay lại bằng <code>/resume</code>.",
      "<code>/compact</code> nén lịch sử của chính phiên đang chạy thành bản tóm tắt. <code>/clear</code> mở hội thoại mới với ngữ cảnh trống, dành cho việc khác hẳn.",
      "<code>/resume</code> mở lại một phiên đã lưu để làm tiếp, không sinh phiên mới."
    ],
    opts: [
      { k: "A", gist: "Run <code>/compact</code> with custom focus instructions, which replaces the history with a condensed summary.",
        why: [
          "Sai ở chỗ <code>/compact</code> làm việc trên chính phiên này (ý 3). Không có bản sao nào được tạo.",
          "Lịch sử còn bị nén thành tóm tắt, chi tiết lập luận mất bớt. Ngược với ý “không mất mạch suy luận”."
        ] },
      { k: "B", gist: "Run <code>/clear</code> and retype the key findings, starting a new session from an empty history.",
        why: [
          "Sai ở chỗ <code>/clear</code> mở hội thoại mới với ngữ cảnh trống (ý 3). Đây là làm lại từ đầu, không phải sao chép.",
          "Gõ lại vài phát hiện chính thì mất hết phần lập luận còn lại, đúng thứ kiến trúc sư muốn giữ."
        ] },
      { k: "C", gist: "Run <code>/resume</code> and pick the session that is already open in the picker, creating a second copy of it.",
        why: [
          "Sai ở giả định: <code>/resume</code> mở lại một phiên đã lưu để làm tiếp (ý 4). Chọn đúng phiên đang mở thì vẫn là phiên đó, không có bản sao nào.",
          "Giả thuyết mới sẽ chạy ngay trong hội thoại hiện tại, làm rối đúng mạch đang muốn giữ.",
          "Dễ bị cuốn vì <code>/resume</code> hay đi cùng fork trong bài 1.7: tách nhánh xong thì dùng nó để quay về phiên gốc. Nhưng resume chỉ mở lại phiên có sẵn. Chỉ fork hoặc branch mới sinh phiên mới mang cùng lịch sử."
        ] },
      { k: "D", gist: "Run <code>/fork</code> with an optional name, switching into a new session that holds the history so far.",
        why: [
          "Đây là phương án duy nhất tạo bản sao: phiên mới mang lịch sử tới lúc đó, phiên gốc giữ nguyên để quay lại (ý 1).",
          "Đúng ý fork của bài 1.7, bản gõ ngay trong phiên của <code>--fork-session</code>.",
          "Docs hiện tại gọi lệnh “tách rồi chuyển sang” là <code>/branch</code> (ý 2). Mô tả <code>/fork</code> trong phương án đã cũ, xem ghi chú đáp án."
        ] }
    ],
    dispute: "Đề gốc chấm D, sổ giữ D vì đây là phương án duy nhất tạo bản sao mà vẫn giữ phiên gốc. Nhưng mô tả trong D đã cũ. Docs Commands hiện tại: <code>/branch [name]</code> tách nhánh rồi chuyển mày sang nhánh mới, phiên gốc quay lại bằng <code>/resume</code>. Còn <code>/fork [prompt]</code> chép hội thoại sang một phiên chạy nền (background session), mày vẫn ở lại phiên hiện tại. Đi thi gặp <code>/fork</code> hay <code>/branch</code> trong vai “tách nhánh, giữ phiên gốc” thì cứ chọn.",
    refs: [
      { label: "Bài 1.7, mục “Đã sửa 02/11”: /rewind lùi trong phiên, /branch tách sang phiên mới", href: NOTES + "#fix-12" },
      { label: "Docs Commands: dòng /branch và /fork", href: "https://code.claude.com/docs/en/commands" },
      { label: "Bài 1.7, khối “Khái niệm của bài”: Resume mở lại phiên cũ, Fork sao chép lịch sử sang phiên mới", href: NOTES + "#l-1-7" }
    ]
  },
  {
    de: 3, n: 5, total: 60, sub: "3.6", subName: "Đưa Claude Code vào CI/CD",
    first: "D", answer: "C",
    ask: "A review bot re-runs on every new commit to a PR. Inline comments it posted earlier about a missing null check keep showing up again as duplicates on each run, even though the author never fixed the issue. Which change to the re-run invocation most directly stops the duplicate postings?",
    scene: [
      "Bot review chạy lại mỗi khi PR có commit mới.",
      "Inline comment (bình luận gắn vào đúng file, đúng dòng) về một chỗ thiếu null check, bot đã đăng từ lần trước, cứ bị đăng lại thành bản trùng ở mỗi lần chạy.",
      "Chỗ khó: tác giả chưa sửa lỗi, nên lần chạy mới thấy nó là đúng. Cái sai là bot không biết lỗi này đã được báo rồi."
    ],
    asks: [
      "Đổi gì trong lệnh chạy lại để chặn việc đăng trùng một cách trực tiếp nhất?",
      "Tức là: làm sao cho lần chạy mới biết lần trước đã báo gì.",
      "Soi từng phương án: nó có đưa được thông tin “đã đăng gì” vào lần chạy mới không?"
    ],
    facts: [
      "Mỗi lần chạy <code>claude -p</code> trong CI là một lần chạy mới, context trống. Claude chỉ biết những gì có trong repo và trong prompt.",
      "Guide 3.6: re-run review sau commit mới thì đưa finding của lần trước vào context, dặn chỉ báo issue mới hoặc chưa được xử lý. Hết comment trùng.",
      "<code>--output-format stream-json</code> chỉ đổi cách in kết quả: từng sự kiện một, thay vì một khối JSON cuối.",
      "<code>--max-turns</code> chỉ giới hạn số lượt agent chạy. <code>--no-session-persistence</code> chỉ tắt việc lưu phiên xuống đĩa. Không cờ nào đưa thêm thông tin vào context."
    ],
    opts: [
      { k: "A", gist: "Switch the re-run's <code>--output-format</code> from <code>json</code> to <code>stream-json</code>, so findings stream out one at a time and already-posted ones are dropped before they reach the PR thread.",
        why: [
          "Sai ở giả định: <code>stream-json</code> chỉ đổi cách xuất kết quả (ý 3). Nó không biết comment nào đã đăng, nên không lọc được gì.",
          "Lần chạy mới vẫn báo lại lỗi null check, chỉ là báo theo kiểu stream."
        ] },
      { k: "B", gist: "Raise <code>--max-turns</code> on the re-run so the bot has enough turns to read back through its own earlier comments on the PR and skip those.",
        why: [
          "Sai ở giả định: thêm turn không thêm thông tin (ý 4). Không ai đưa comment cũ cho bot, nên nó vẫn bắt đầu trắng (ý 1).",
          "Có thêm turn, nó vẫn soi diff như lần đầu và báo lại lỗi null check."
        ] },
      { k: "C", gist: "Feed the PR's earlier review findings into the re-run's context and tell Claude to report only issues not on that list, so the bot skips what it already posted.",
        why: [
          "Gốc của comment trùng: mỗi lần re-run bắt đầu trắng, không biết lần trước đã đăng gì (ý 1).",
          "Phương án này vá đúng gốc đó, theo đúng cách guide 3.6 nêu (ý 2): đưa finding lần trước vào context và dặn chỉ báo issue mới.",
          "Có danh sách đó, Claude thấy lỗi null check đã nằm trên PR nên không đăng comment mới."
        ] },
      { k: "D", gist: "Add <code>--no-session-persistence</code> to the re-run so each run starts without stale session state and stops repeating comments that earlier runs posted.",
        why: [
          "Sai ở chẩn đoán: cờ này chỉ tắt việc lưu phiên (ý 4). Re-run vốn đã không nhận gì từ lần trước (ý 1), và chính điều đó gây comment trùng.",
          "Thêm cờ vẫn không có gì nhắc bot về cái đã đăng, nên lỗi null check vẫn bị báo lại.",
          "Dễ bị cuốn vì “stale session state” (state phiên cũ) nghe như thủ phạm. Nhưng thứ thiếu là trí nhớ về lần trước, không phải thứ thừa."
        ] }
    ],
    refs: [
      { label: "Bài 3.6, mục “Claude trong CI biết gì về project của bạn?”: re-run thì đưa finding cũ vào context", href: NOTES + "#l-3-6" },
      { label: "Cheatsheet D3: dòng “Comment trùng sau commit mới / test trùng”", href: NOTES + "#cheat-d3" }
    ]
  },
  {
    de: 3, n: 6, total: 60, sub: "3.5", subName: "Tinh chỉnh lặp: ví dụ input/output, test trước, interview",
    first: "A", answer: "B",
    ask: "A team uses Claude Code to build a webhook ingestion service. Three tests fail: one checks that duplicate webhook deliveries are deduplicated by an idempotency key, one checks that keys are released correctly when the deduplication window expires, and one checks that a malformed JSON payload returns HTTP 400. The first two failures trace back to the same deduplication-store logic; the third is unrelated. How should feedback on these three failures be structured?",
    scene: [
      "Team dùng Claude Code xây service nhận webhook. Ba test fail.",
      "Hai test về chống trùng: webhook gửi lặp phải bị lọc theo idempotency key (khóa nhận diện request trùng), và khóa phải được nhả đúng khi cửa sổ chống trùng hết hạn. Cả hai cùng gốc ở logic của store chống trùng.",
      "Test thứ ba: payload JSON hỏng phải trả HTTP 400. Lỗi này không dính gì tới hai lỗi kia.",
      "Chỗ khó: đề không hỏi sửa thế nào, mà hỏi chia ba lỗi vào các message phản hồi cho Claude ra sao."
    ],
    asks: [
      "Nên sắp phản hồi về ba lỗi này thế nào?",
      "Tức là: lỗi nào gửi chung một message, lỗi nào gửi riêng.",
      "Tiêu chí soi: phương án gom theo nguyên nhân gốc, hay theo thứ tự chạy, theo điểm vào, hay tách hết?"
    ],
    facts: [
      "Guide 3.5 chia theo quan hệ giữa các lỗi: sửa lỗi này ảnh hưởng lỗi kia thì gộp vào một message chi tiết, để Claude sửa đồng bộ.",
      "Lỗi độc lập thì sửa tuần tự, mỗi lần một lỗi, dễ kiểm tra từng bước.",
      "Lỗi dính nhau mà gửi từng cái riêng thì dễ nhận về các bản sửa đá nhau."
    ],
    opts: [
      { k: "A", gist: "Send all three failures in one message, in the order the tests ran, so the full test output is in one place and one fix plan covers the run, with each failure labeled by its test name.",
        why: [
          "Sai ở chỗ gộp cả lỗi JSON độc lập vào chung với hai lỗi của store (ý 2). Hai nguyên nhân gốc bị trộn vào một kế hoạch sửa.",
          "Lỗi parse giành sự chú ý với việc điều tra store, nên nguyên nhân chung khó lộ ra hơn.",
          "Dễ bị cuốn vì “gửi hết một lần cho đủ ngữ cảnh” nghe hợp lý, và guide cũng khuyên gộp. Nhưng guide chỉ gộp các lỗi liên quan nhau (ý 1)."
        ] },
      { k: "B", gist: "Send the idempotency-key and window-expiry failures together in one message, and the malformed-payload 400 failure in a separate second message, so each message points to one area of the code.",
        why: [
          "Hai lỗi chống trùng cùng gốc ở store, gửi chung một message (ý 1). Claude thấy nguyên nhân chung và sửa một lần cho cả hai.",
          "Lỗi JSON độc lập đi message riêng (ý 2), không làm nhiễu, sửa xong kiểm riêng được.",
          "Mỗi message trỏ vào đúng một vùng code, khớp tiêu chí gom theo nguyên nhân gốc."
        ] },
      { k: "C", gist: "Group the idempotency-key and malformed-payload failures as request-handling issues, and send the window-expiry failure alone, so each message covers tests that hit the same webhook entry point.",
        why: [
          "Sai ở tiêu chí gom: theo điểm vào (entry point), không theo nguyên nhân gốc.",
          "Kết quả: tách đôi hai lỗi cùng gốc ở store (ý 3), rồi ghép một lỗi store với lỗi parse không liên quan (ý 2). Sai cả hai chiều."
        ] },
      { k: "D", gist: "Send each of the three failures in its own message, one per test, so each carries a single assertion, stack trace and error message and can be investigated without waiting on the others.",
        why: [
          "Tách lỗi JSON ra là đúng (ý 2).",
          "Nhưng tách luôn hai lỗi store thì Claude sửa từng cái mà không thấy chúng chung gốc. Dễ ra hai bản vá chồng nhau, hoặc vá cái này làm hỏng cái kia (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 3.5, mục “Một message hay nhiều message?”: lỗi liên quan thì gộp, lỗi độc lập thì tách", href: NOTES + "#l-3-5" }
    ]
  },
  {
    de: 3, n: 7, total: 60, sub: "3.2", subName: "Slash command và skill",
    first: "D", answer: "D",
    ask: "A developer put <code>allowed-tools: Write Edit</code> in a skill's frontmatter, expecting it to stop Claude from ever calling Bash while the skill runs. In a session, Claude still calls Bash after asking the user for approval. Why did this happen, and what should the developer configure instead to remove Bash from the available pool completely while the skill is active?",
    scene: [
      "Dev khai <code>allowed-tools: Write Edit</code> trong frontmatter của một skill, tưởng thế là Claude không bao giờ gọi được Bash khi skill chạy.",
      "Thực tế: Claude vẫn gọi Bash, sau khi hỏi xin quyền và được user duyệt.",
      "Chỗ khó: đề hỏi hai vế: vì sao chuyện đó xảy ra, và phải khai gì để Bash bị gỡ hẳn khỏi bộ tool khi skill đang chạy."
    ],
    asks: [
      "Vì sao Bash vẫn chạy được, và nên cấu hình gì để bỏ hẳn Bash khi skill đang chạy?",
      "Tức là: hiểu đúng <code>allowed-tools</code> làm gì, rồi chọn trường frontmatter thật sự cấm được một tool.",
      "Phương án phải đúng cả hai vế: giải thích đúng cơ chế, và cách sửa dùng một trường có thật làm đúng việc đó."
    ],
    facts: [
      "Docs Skills: <code>allowed-tools</code> cho các tool trong danh sách chạy không cần hỏi quyền, trong lượt skill được gọi. Nó “does not restrict which tools are available” (không giới hạn tool nào được dùng): tool ngoài danh sách vẫn gọi được, chỉ phải qua bước xin quyền.",
      "<code>disallowed-tools</code> gỡ hẳn tool khỏi danh sách Claude được gọi khi skill đang chạy.",
      "<code>context: fork</code> cho skill chạy trong một subagent riêng, để output dài nằm lại ở đó, phiên chính chỉ nhận kết quả gọn. Nó để cô lập output, không để giới hạn tool.",
      "Guide v1.0 tả <code>allowed-tools</code> là “giới hạn tool”. Docs hiện tại chính xác hơn: đó là danh sách duyệt sẵn. Câu này tả đúng hành vi thật (Bash vẫn chạy sau khi duyệt), nên chấm theo docs."
    ],
    opts: [
      { k: "A", gist: "<code>allowed-tools</code> only acts as a restriction with wildcard patterns such as <code>Write*</code> and <code>Edit*</code>, so bare names are not a limit; add a trailing <code>*</code> to each entry.",
        why: [
          "Bịa cơ chế. <code>allowed-tools</code> viết kiểu gì cũng chỉ là danh sách duyệt sẵn, không bao giờ là giới hạn (ý 1).",
          "Thêm <code>*</code> vào cuối không biến nó thành danh sách cấm. Bash vẫn gọi được sau khi user duyệt, y như trước."
        ] },
      { k: "B", gist: "<code>allowed-tools</code> only takes effect after the skill finishes, so it does nothing to Bash calls during the run; set <code>context: fork</code> so the skill runs in an isolated subagent that receives only the listed tools.",
        why: [
          "Sai thời điểm: <code>allowed-tools</code> có hiệu lực ngay trong lượt gọi skill, không phải sau khi skill xong (ý 1).",
          "Sai cả cách sửa: <code>context: fork</code> để cô lập output, không biến <code>allowed-tools</code> thành giới hạn tool (ý 3).",
          "Dễ bị cuốn vì <code>context: fork</code> là từ khóa quen của bài 3.2. Nhưng đề hỏi chuyện chặn tool, không phải chuyện output làm đầy phiên chính. Còn câu “chỉ có hiệu lực sau khi skill xong” là bịa."
        ] },
      { k: "C", gist: "<code>allowed-tools</code> only governs tools the user invokes directly, not ones Claude picks itself; set <code>model: inherit</code> so the skill uses the session's model, which limits Claude's own tool choices to the listed tools.",
        why: [
          "Bịa cả hai vế. <code>allowed-tools</code> áp cho tool Claude gọi trong lượt skill, không phải tool user tự gọi (ý 1).",
          "<code>model</code> chỉ chọn model chạy skill, không dính gì tới việc tool nào được gọi. Bash vẫn còn trong bộ tool."
        ] },
      { k: "D", gist: "<code>allowed-tools</code> only lets the listed tools run without a permission prompt and leaves other tools callable; add <code>disallowed-tools: Bash</code> to the skill so Bash is taken out of the tools Claude can call during the run.",
        why: [
          "Giải thích đúng: <code>allowed-tools</code> chỉ duyệt sẵn, không giới hạn (ý 1). Bash nằm ngoài danh sách nên phải xin quyền, user duyệt thì chạy, đúng như đề tả.",
          "Sửa đúng: <code>disallowed-tools: Bash</code> gỡ hẳn Bash khỏi bộ tool khi skill chạy (ý 2). Không còn bước xin quyền nào để lọt qua.",
          "Gặp câu chỉ hỏi “trường nào để restrict tool” (giới hạn tool) theo đúng chữ của guide thì vẫn chọn <code>allowed-tools</code> (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 3.2: allowed-tools theo guide và theo docs, khi nào dùng disallowed-tools", href: NOTES + "#l-3-2" },
      { label: "Docs Skills: mục “Pre-approve tools for a skill” và dòng disallowed-tools", href: "https://code.claude.com/docs/en/skills#pre-approve-tools-for-a-skill" }
    ]
  },
  {
    de: 3, n: 8, total: 60, sub: "5.5", subName: "Review người và hiệu chuẩn confidence",
    first: "A", answer: "C",
    ask: "A document-extraction pipeline has passed initial validation, and most high-confidence extractions no longer go to human review. The team wants an ongoing quality-monitoring process that catches new failure modes that never appeared in initial testing, without re-reviewing every extraction. Which sampling approach fits best?",
    scene: [
      "Pipeline trích xuất tài liệu đã qua validation ban đầu. Phần lớn extraction có confidence cao giờ không còn qua người review.",
      "Team muốn một quy trình theo dõi chất lượng lâu dài, bắt được kiểu lỗi mới chưa từng xuất hiện lúc test ban đầu.",
      "Chỗ khó: không được review lại mọi extraction. Phải chọn đúng tập để lấy mẫu, và lấy mẫu đúng cách."
    ],
    asks: [
      "Cách lấy mẫu nào hợp nhất?",
      "Tức là: lấy mẫu từ đâu, bằng cách nào, để thấy lỗi mới trong phần không còn ai xem.",
      "Soi hai điều ở từng phương án: tập lấy mẫu có đúng là phần tự duyệt không? Mẫu có ngẫu nhiên, không lệch không?"
    ],
    facts: [
      "Stratified random sampling (lấy mẫu ngẫu nhiên theo tầng): chia dữ liệu theo tầng (loại tài liệu, nhà cung cấp, trường) rồi bốc ngẫu nhiên trong từng tầng, để nhóm nhỏ cũng chắc được kiểm.",
      "Với phần tự động (không qua người), guide khuyên lấy mẫu stratified định kỳ để đo error rate (tỉ lệ lỗi) thật và bắt pattern lỗi mới.",
      "Kiểu lỗi mới thường đến khi dữ liệu đầu vào thay đổi, như mẫu tài liệu mới hay nhà cung cấp mới.",
      "Phần confidence thấp đã được chuyển cho người review, nên lỗi ở đó vốn đã có người bắt."
    ],
    opts: [
      { k: "A", gist: "Each week, randomly sample the extractions already routed to human review, across document types and fields, and compare the reviewed error rate with the rate measured at validation.",
        why: [
          "Sai tập: phần đã chuyển cho người review là phần confidence thấp, và người review đang bắt lỗi ở đó rồi (ý 4).",
          "Lỗi mới trong phần tự duyệt (auto-approved) không bao giờ lọt vào mẫu này. Tỉ lệ lỗi của mẫu cũng không so được với tỉ lệ lúc validation của phần bỏ qua review.",
          "Dễ bị cuốn vì “randomly sample … across document types and fields” (bốc ngẫu nhiên theo loại tài liệu và trường) nghe đúng chuẩn stratified (ý 1). Nhưng bốc từ sai tập. Mẫu phải nhắm vào phần không còn ai xem."
        ] },
      { k: "B", gist: "Each week, re-run a fixed set of documents from the validation set through the pipeline and compare the current error rate by document type with the rate measured at validation.",
        why: [
          "Sai nguồn dữ liệu: bộ tài liệu cố định chỉ kiểm lại những gì đã biết.",
          "Kiểu lỗi mới đến từ dữ liệu thật thay đổi (ý 3), mà bộ cũ không có. Cách này bắt được lỗi cũ quay lại, không bắt được lỗi mới."
        ] },
      { k: "C", gist: "Each week, randomly sample from each document type and field among the auto-approved extractions, and compare the sampled error rate with the rate measured at validation.",
        why: [
          "Lấy mẫu ngẫu nhiên theo tầng, theo loại tài liệu và trường (ý 1), làm trên phần tự duyệt, tức phần không còn người xem (ý 2).",
          "Mỗi tầng có đủ mẫu để thấy lỗi tăng ở một loại hay một trường cụ thể, kể cả nhóm nhỏ.",
          "So với tỉ lệ lúc validation là thấy chất lượng trôi đi và kiểu lỗi mới (ý 3), mà không phải review toàn bộ."
        ] },
      { k: "D", gist: "Each week, sample the auto-approved extractions that downstream users reported as wrong, and compare the reported error rate with the rate measured at validation.",
        why: [
          "Sai ở mẫu lệch: chỉ gồm lỗi đã có người để ý và chịu báo.",
          "Lỗi âm thầm (sai mà trông hợp lý) không bao giờ vào mẫu. Tỉ lệ lỗi tính trên phần bị báo cũng không phải tỉ lệ lỗi thật, nên không so được với validation (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 5.5, mục “Vì sao phải stratified”", href: NOTES + "#l-5-5" },
      { label: "Cheatsheet D5: dòng “97% accuracy tổng, muốn bỏ review cho high-confidence”", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 3, n: 9, total: 60, sub: "3.6", subName: "Đưa Claude Code vào CI/CD",
    first: "C", answer: "B",
    ask: "A team is moving its <code>claude-code-action</code> workflow from beta to v1.0. They used to rely on <code>direct_prompt</code>, <code>custom_instructions</code>, <code>mode</code> and <code>max_turns</code>. Which statement best explains why v1.0 no longer uses these parameters the same way?",
    scene: [
      "Team chuyển workflow <code>claude-code-action</code> (GitHub Action chạy Claude Code) từ bản beta lên v1.0.",
      "Bản beta họ dùng bốn input: <code>direct_prompt</code>, <code>custom_instructions</code>, <code>mode</code>, <code>max_turns</code>.",
      "Chỗ khó: các phương án trộn chỗ đúng với chỗ bịa (tên input mới, file cấu hình). Phải nhớ đúng từng input cũ đi đâu."
    ],
    asks: [
      "Câu nào giải thích đúng nhất vì sao v1.0 không còn dùng các input này như trước?",
      "Tức là: v1.0 gom cấu hình về đâu, và bốn input cũ mỗi cái thành gì.",
      "Phương án phải đúng cả câu. Đúng một vế mà sai vế kia vẫn là sai."
    ],
    facts: [
      "Docs GitHub Actions, mục “Upgrade from beta”: <code>direct_prompt</code> đổi thành <code>prompt</code>.",
      "Input <code>mode</code> bị bỏ. Action tự nhận mode: có <code>prompt</code> thì chạy tự động (automation mode), không có thì chờ người gọi <code>@claude</code> (interactive mode).",
      "Các tùy chọn khác chuyển thành cờ CLI trong input <code>claude_args</code>: <code>max_turns</code> thành <code>--max-turns</code>, <code>model</code> cũng vào đây.",
      "<code>custom_instructions</code> không có cờ cùng tên, nó thành <code>--append-system-prompt</code> trong <code>claude_args</code>."
    ],
    opts: [
      { k: "A", gist: "v1.0 keeps one input per setting, renamed to <code>prompt_text</code>, <code>instructions</code>, <code>execution_mode</code> and <code>max_steps</code>, with unchanged behavior.",
        why: [
          "Bịa tên input. v1.0 không đổi tên từng input một đổi một: <code>prompt_text</code>, <code>instructions</code>, <code>execution_mode</code>, <code>max_steps</code> đều không có.",
          "Thực tế <code>mode</code> bị bỏ hẳn (ý 2), còn <code>max_turns</code> và <code>custom_instructions</code> thành cờ CLI trong <code>claude_args</code> (ý 3, ý 4)."
        ] },
      { k: "B", gist: "v1.0 takes a single <code>prompt</code> input, passes the remaining options as CLI flags in <code>claude_args</code>, and infers the execution mode from whether a prompt is given.",
        why: [
          "Khớp docs: <code>direct_prompt</code> thành <code>prompt</code> (ý 1), các tùy chọn còn lại thành cờ CLI trong <code>claude_args</code> (ý 3, ý 4).",
          "Mode tự suy ra từ việc có <code>prompt</code> hay không (ý 2), nên không cần input <code>mode</code> nữa.",
          "Đúng ý chính của v1.0: một input cho prompt, một chỗ cho cờ CLI, mode tự nhận."
        ] },
      { k: "C", gist: "v1.0 keeps <code>direct_prompt</code> and <code>mode</code> as inputs, but moves <code>custom_instructions</code> and <code>max_turns</code> into a <code>claude_args</code> input as CLI flags.",
        why: [
          "Đúng một nửa: chuyển <code>max_turns</code> và <code>custom_instructions</code> vào <code>claude_args</code> là đúng (ý 3, ý 4).",
          "Nhưng <code>direct_prompt</code> và <code>mode</code> đều không còn: <code>direct_prompt</code> thành <code>prompt</code> (ý 1), <code>mode</code> bị bỏ vì action tự suy ra (ý 2).",
          "Dễ bị cuốn vì vế <code>claude_args</code> đúng. Nhưng đáp án phải đúng cả câu, và giữ <code>mode</code> là sai đúng chỗ đổi lớn nhất của v1.0."
        ] },
      { k: "D", gist: "v1.0 reads the prompt, instructions and turn limit from a <code>config.yml</code> file in the repository root and uses workflow inputs only to pick the mode.",
        why: [
          "Bịa file cấu hình. v1.0 vẫn nhận cấu hình qua input của workflow (<code>prompt</code>, <code>claude_args</code>).",
          "Và chính <code>mode</code> là thứ bị bỏ (ý 2), nên “dùng input chỉ để chọn mode” ngược hẳn với v1.0."
        ] }
    ],
    refs: [
      { label: "Bài 3.6, mục Biết thêm: claude-code-action và claude_args", href: NOTES + "#l-3-6" },
      { label: "Docs GitHub Actions, mục “Upgrade from beta”", href: "https://code.claude.com/docs/en/github-actions#upgrade-from-beta" }
    ]
  },
  {
    de: 3, n: 10, total: 60, sub: "3.5", subName: "Tinh chỉnh lặp: ví dụ input/output, test trước, interview",
    first: "C", answer: "B",
    ask: "A developer wants Claude Code to implement a rate limiter for an internal API and wants fewer correction cycles afterward. Which opening approach best follows a test-driven iteration pattern?",
    scene: [
      "Dev muốn Claude Code viết rate limiter (bộ giới hạn tốc độ gọi) cho một API nội bộ.",
      "Mục tiêu: ít vòng sửa sau khi có code.",
      "Chỗ khó: phương án nào cũng có lặp và phản hồi. Khác nhau ở thứ có trước code: test, tài liệu, hay không có gì."
    ],
    asks: [
      "Cách mở đầu nào theo đúng kiểu test-driven iteration (lặp dựa trên test)?",
      "Tức là: thứ gì phải có trước code để định nghĩa “xong” và dẫn từng vòng sửa.",
      "Soi từng phương án: test viết trước hay sau code? Thứ dùng để kiểm có chạy được không?"
    ],
    facts: [
      "Test-driven iteration: viết test suite trước (hành vi, edge case, hiệu năng). “Xong” nghĩa là test xanh. Mỗi vòng đưa test đang fail cho Claude sửa.",
      "Kết quả mong đợi phải có trước code. Code có trước rồi mới viết test thì test dễ viết theo code, test xanh chỉ chứng minh code khớp cách hiểu của chính nó.",
      "Mỗi test đỏ là một mục tiêu sửa cụ thể, chạy lại được, nên mỗi vòng sửa ngắn và rõ."
    ],
    opts: [
      { k: "A", gist: "Have Claude build the limiter first, then write tests for throttling, burst limits and window resets, and feed each failing result back to refine the code before release.",
        why: [
          "Sai thứ tự: test viết sau code (ý 2). Đây là kiểm thử sau, không phải test-driven.",
          "Test viết theo code vừa có dễ đúng theo luôn cái sai. Vòng sửa dựa trên test đó không bắt được chỗ hiểu sai yêu cầu."
        ] },
      { k: "B", gist: "Have Claude write tests for throttling, burst limits and window resets before the implementation, then build the limiter and feed each failing test result back to refine it.",
        why: [
          "Test cho throttling (chặn khi vượt tốc độ), burst limit (giới hạn đợt gọi dồn) và window reset (reset cửa sổ đếm) có trước code (ý 1). Hành vi mong muốn thành bài kiểm chạy được.",
          "Claude viết limiter rồi sửa theo từng test đỏ. Mỗi test đỏ là một mục tiêu cụ thể (ý 3), nên số vòng sửa giảm, đúng điều đề muốn."
        ] },
      { k: "C", gist: "Have Claude draft a design document for throttle rules, burst limits and reset windows first, then build the limiter and review the code against that document until it matches.",
        why: [
          "Sai ở chỗ tài liệu thiết kế là văn xuôi, không chạy được. So code với nó phải đọc và phán đoán, mỗi lần một kiểu.",
          "Không có test đỏ nào để lặp (ý 1), nên không phải test-driven.",
          "Dễ bị cuốn vì viết thiết kế trước cũng là “làm rõ yêu cầu trước khi code”, nghe giống tinh thần test trước. Nhưng đề hỏi đúng tên “test-driven”: thứ có trước phải là test chạy được."
        ] },
      { k: "D", gist: "Have Claude build the limiter first, then exercise it by hand in the terminal with bursts, retries and rate-limit headers, and report each unexpected result back to refine the code.",
        why: [
          "Sai hai chỗ: thử tay sau khi đã có code, và kết quả tùy lần thử, không lặp lại được.",
          "Không có bộ test nên không có định nghĩa “xong” (ý 1). Mỗi vòng sửa lại phải thử tay lại từ đầu."
        ] }
    ],
    refs: [
      { label: "Bài 3.5: định nghĩa test-driven iteration và bảng chọn kỹ thuật", href: NOTES + "#l-3-5" }
    ]
  },
  {
    de: 3, n: 11, total: 60, sub: "2.5", subName: "Chọn built-in tool đúng việc",
    first: "B", answer: "D",
    ask: "Claude Code must update a version string in a nested JSON field of <code>package.json</code>. The same string also happens to appear as a substring of an unrelated dependency name elsewhere in the file. Claude wants Edit to change only the version field. Which <code>old_string</code> design makes sure the edit lands only at the intended spot?",
    scene: [
      "Claude Code cần đổi số phiên bản trong <code>package.json</code>.",
      "Chỗ khó: chuỗi phiên bản đó tình cờ cũng nằm trong tên một dependency (gói phụ thuộc) ở chỗ khác trong file. Ví dụ minh họa:<pre><code>{\n  \"version\": \"2.1.0\",\n  \"dependencies\": {\n    \"legacy-client-2.1.0-patch\": \"^1.0.0\"\n  }\n}</code></pre>",
      "Chuỗi <code>2.1.0</code> có ở hai chỗ: trường <code>version</code> (cần sửa) và tên dependency (không được đụng)."
    ],
    asks: [
      "Viết <code>old_string</code> thế nào để Edit chỉ sửa trường <code>version</code>?",
      "Tức là: làm sao cho <code>old_string</code> khớp đúng một chỗ, là trường <code>version</code>.",
      "Mỗi phương án soi hai điều: Edit có làm được điều phương án giả định không? Nếu làm được, kết quả có sửa đúng một chỗ không?"
    ],
    facts: [
      "Edit tìm <code>old_string</code> đúng nguyên văn, từng ký tự. Nó không hiểu JSON, cũng không chạy regex (biểu thức chính quy).",
      "<code>old_string</code> phải xuất hiện đúng một lần trong file. Khớp từ hai chỗ trở lên thì Edit báo lỗi và không sửa gì. Không khớp chỗ nào cũng báo lỗi.",
      "Bật <code>replace_all</code> thì Edit sửa mọi chỗ khớp."
    ],
    opts: [
      { k: "A", gist: "Use the bare version value as <code>old_string</code> and rely on Edit reading the JSON structure to pick the match inside the field.",
        why: [
          "Sai ở giả định: Edit không đọc cấu trúc JSON, nó chỉ so chữ (ý 1).",
          "<code>old_string</code> = <code>2.1.0</code> khớp hai chỗ, nên Edit báo lỗi và không sửa gì (ý 2)."
        ] },
      { k: "B", gist: "Write <code>old_string</code> as a regex targeting the version field, so Edit applies the pattern and skips the dependency name.",
        why: [
          "Sai ở giả định: Edit không chạy regex (ý 1).",
          "Chuỗi regex bị tìm nguyên văn, kể cả các ký tự như <code>.*</code> hay <code>\\d+</code>. Trong file không có đoạn nào y hệt vậy, nên Edit báo không tìm thấy.",
          "Dễ bị cuốn vì regex nghe như cách nhắm chính xác nhất. Nhưng regex là của Grep, dùng để tìm. Edit dùng để sửa, và nó không có regex."
        ] },
      { k: "C", gist: "Use the bare version value and turn on <code>replace_all</code>, so every match in <code>package.json</code> is rewritten in one pass.",
        why: [
          "Lần này Edit chạy được, không báo lỗi.",
          "Nhưng nó sửa cả hai chỗ (ý 3), nên tên dependency thành <code>legacy-client-2.2.0-patch</code>. Gói đó không tồn tại, cài đặt sẽ hỏng.",
          "Trái thẳng với yêu cầu “only the version field” (chỉ trường version)."
        ] },
      { k: "D", gist: "Make <code>old_string</code> the version value together with its quoted key and the rest of that line, so the text occurs at exactly one position in the file.",
        why: [
          "<code>old_string</code> = <code>\"version\": \"2.1.0\",</code>. Đoạn này chỉ có ở một chỗ trong file. Tên dependency có chứa <code>2.1.0</code>, nhưng không có <code>\"version\": </code> đứng trước.",
          "Vậy Edit khớp đúng một chỗ (ý 2) và sửa đúng trường cần sửa.",
          "Notes gọi cách này là kéo dài <code>old_string</code> bằng ngữ cảnh xung quanh cho thành duy nhất."
        ] }
    ],
    refs: [
      { label: "Bài 2.5, mục “Đã sửa 01/11”: Edit khớp nhiều chỗ thì kéo dài old_string, không được thì Read + Write", href: NOTES + "#fix-3" },
      { label: "Bài 2.5: anchor (old_string) phải xuất hiện đúng một lần", href: NOTES + "#l-2-5" }
    ]
  }
);
