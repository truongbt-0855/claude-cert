// Sổ ôn certsafari, Đề 2. Trang so-on-certsafari.html nạp file này trước script render.
// Mỗi câu một phần tử, xếp theo n. Các trường:
//   de, n, total     số đề trong sổ; số thứ tự câu trong đề gốc; tổng số câu của đề gốc
//   sub, subName     task statement của guide (vd "3.2") và tên bài bằng tiếng Việt
//   first            (tùy chọn) đáp án user chọn lần đầu trên đề gốc
//   answer           đáp án đúng, đã kiểm bằng notes ôn thi hoặc docs chính thức
//   dispute          (tùy chọn) khi đáp án gốc của đề khác answer: vì sao sổ chọn khác
//   ask, opts[].gist tiếng Anh, viết lại bằng lời riêng (không chép nguyên văn)
//   opts[].why, trap, tip, refs[].label  tiếng Việt
//   refs[].href      NOTES + "#<id có trong notes>"
DE[2] = "Certsafari · 60 câu · 02/11/2026";
ENTRIES.push(
  {
    de: 2, n: 1, total: 60, sub: "4.5", subName: "Xử lý theo lô (Batch)",
    first: "B", answer: "A",
    ask: "A classification pipeline promises that every record has its finished report within 36 hours of being ingested. Records are processed through the Message Batches API, where a batch can take up to 24 hours in the worst case. After a batch completes, a mandatory formatting step adds another 2 hours before the report is final. To keep the 36-hour promise even when the API uses its full worst-case time, what is the longest allowed interval between the starts of two consecutive batch submissions?",
    scene: [
      "Pipeline phân loại cam kết: mỗi bản ghi có báo cáo hoàn chỉnh trong 36 giờ kể từ lúc được nạp vào (ingested).",
      "Bản ghi đi qua Message Batches API, mỗi batch có thể mất tới 24 giờ. Batch xong còn một bước format bắt buộc, mất thêm 2 giờ.",
      "Chỗ khó: ngoài thời gian xử lý còn thời gian chờ. Bản ghi đến ngay sau một lần nộp phải nằm chờ tới lần nộp kế. Ví dụ minh họa, gọi T là khoảng cách giữa hai lần nộp:<pre><code>giờ 0       vừa nộp batch; bản ghi X đến ngay sau đó\ngiờ T       lần nộp kế, X mới được vào batch\ngiờ T + 24  batch xong (xấu nhất)\ngiờ T + 26  format xong, X có báo cáo</code></pre>"
    ],
    asks: [
      "Khoảng cách dài nhất giữa hai lần nộp batch liên tiếp là bao nhiêu để vẫn giữ cam kết 36 giờ, kể cả khi API dùng hết 24 giờ?",
      "Tức là: với bản ghi xui nhất, thời gian chờ tới lần nộp kế + 24 giờ xử lý + 2 giờ format không được vượt 36 giờ.",
      "Soi từng phương án: lấy con số nó đưa ra, cộng đủ cả ba khoảng (chờ, xử lý, format), xem có quá 36 không."
    ],
    facts: [
      "Message Batches API không hứa thời gian: mỗi batch có thể mất tới 24 giờ, không có SLA về độ trễ. “Đa số xong trong một giờ” không phải cam kết.",
      "SLA (service level agreement) là cam kết thời gian xử lý với người dùng. Bản ghi đến ngay sau một lần nộp phải chờ tới lần nộp kế, nên thời gian chờ xấu nhất bằng đúng khoảng cách giữa hai lần nộp.",
      "Công thức trong notes: khoảng nộp ≤ SLA − 24 giờ. Bước bắt buộc nào nằm giữa batch và kết quả cuối (như bước format ở đây) cũng ăn vào SLA, nên trừ tiếp thời gian của nó."
    ],
    opts: [
      { k: "A", gist: "Submit at least once every 10 hours, counting the wait until the next submission, the 24 hours of processing and the 2 hours of formatting toward the 36 hours.",
        why: [
          "Bản ghi xui nhất chờ trọn một khoảng nộp (ý 2), rồi batch chạy tối đa 24 giờ (ý 1), rồi format 2 giờ. Điều kiện: khoảng nộp + 24 + 2 ≤ 36.",
          "Vậy khoảng nộp tối đa là 36 − 24 − 2 = 10 giờ (ý 3). Xấu nhất: 10 + 24 + 2 = 36, vừa chạm hạn mà không vượt."
        ] },
      { k: "B", gist: "Submit at least once every 26 hours, treating the 24-hour processing plus the 2-hour formatting as one cycle so each batch is finalized before the next one starts.",
        why: [
          "Sai ở chỗ giải bài toán khác: lo cho batch trước xong hẳn rồi mới nộp batch sau. Đề không đòi các batch không chồng nhau, đề đòi từng bản ghi có báo cáo trong 36 giờ.",
          "Bản ghi đến ngay sau lần nộp chờ 26 giờ (ý 2), cộng 24 + 2 thành 52 giờ, trễ 16 giờ.",
          "Dễ bị cuốn vì “xong hẳn rồi mới nộp tiếp” nghe gọn và an toàn. Nhưng khoảng nộp càng dài thì bản ghi đến ngay sau lần nộp càng chờ lâu."
        ] },
      { k: "C", gist: "Submit at least once every 12 hours, counting the wait until the next submission and the 24-hour processing toward the 36 hours, with formatting handled separately.",
        why: [
          "Sai ở chỗ lấy 36 − 24 = 12 rồi để format “handled separately” (tính riêng). Format là bước bắt buộc trước khi báo cáo hoàn chỉnh, nên nằm trong 36 giờ (ý 3).",
          "Xấu nhất: 12 + 24 + 2 = 38 giờ, trễ 2 giờ."
        ] },
      { k: "D", gist: "Submit at least once every 14 hours, counting the wait and the 24-hour processing, with the 2-hour formatting treated as slack.",
        why: [
          "Sai ở dấu: cộng 2 giờ format vào khoảng nộp (36 − 24 + 2 = 14), coi nó là “slack” (phần dư). Format ngốn thêm thời gian, phải trừ ra (ý 3).",
          "Xấu nhất: 14 + 24 + 2 = 40 giờ, trễ 4 giờ."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Tính nhịp submit theo SLA”: công thức khoảng nộp ≤ SLA − 24 giờ", href: NOTES + "#l-4-5" },
      { label: "Bài 4.5, “Khi đi thi” dạng 2 (đã sửa 01/11): SLA 30 giờ → nộp mỗi 4 giờ", href: NOTES + "#fix-8" }
    ]
  },
  {
    de: 2, n: 2, total: 60, sub: "1.3", subName: "Gọi subagent, truyền context",
    first: "A", answer: "A",
    ask: "A coordinator hands review work to a <code>documentation-reviewer</code> subagent, which is meant to read files and leave comments but never change them. In testing, the subagent edits one of the files it was reviewing. Which configuration change stops this from happening?",
    scene: [
      "Coordinator giao việc review cho subagent <code>documentation-reviewer</code>. Subagent này chỉ được đọc file và để lại nhận xét, không bao giờ được sửa file.",
      "Chỗ khó: khi test, nó vẫn sửa một file đang review. Tức là ý “chỉ đọc” mới nằm trong đầu người thiết kế, chưa bị chặn ở đâu cả."
    ],
    asks: [
      "Đổi cấu hình nào để chặn chuyện này?",
      "Tức là: cần một thiết lập làm subagent không thể sửa file, chứ không chỉ dặn nó đừng sửa.",
      "Soi từng phương án: nó lấy bớt tool sửa file đi, hay chỉ đổi chữ mà model đọc?"
    ],
    facts: [
      "Trong AgentDefinition, <code>tools</code> là danh sách tool subagent được dùng. Tool không có trong danh sách thì subagent không gọi được. Bỏ trống <code>tools</code> thì subagent dùng được toàn bộ tool của agent cha.",
      "Các trường khác không đụng tới tool: <code>description</code> cho biết khi nào nên giao việc cho subagent này, <code>prompt</code> là system prompt riêng của nó, <code>model</code> chọn model chạy nó.",
      "Ghi quy tắc vào prompt là prompt-based guidance: tỉ lệ sai giảm được nhưng không bao giờ về 0. Muốn bảo đảm thì phải programmatic enforcement, tức chặn bằng thiết lập hay code của chương trình."
    ],
    opts: [
      { k: "A", gist: "Set the subagent's <code>tools</code> field to a read-only list, Read and Grep, leaving Edit and Write out.",
        why: [
          "<code>tools</code> chỉ có Read và Grep thì Edit và Write không nằm trong danh sách, subagent không gọi được (ý 1).",
          "Model muốn sửa cũng không có cách nào. Chặn bằng cấu hình nên chắc chắn (ý 3), đúng điều đề hỏi: “stops” (chặn hẳn)."
        ] },
      { k: "B", gist: "Change the subagent's <code>description</code> to say it is a read-only reviewer that only handles review tasks.",
        why: [
          "Sai ở giả định: <code>description</code> chỉ giúp coordinator biết khi nào giao việc cho subagent này (ý 2). Nó không lấy bớt tool nào.",
          "Subagent vẫn còn Edit và Write, vẫn sửa file được như lúc test."
        ] },
      { k: "C", gist: "Set the subagent's <code>model</code> field to a smaller tier that follows a narrow review brief more literally.",
        why: [
          "Sai ở giả định: đổi <code>model</code> không bớt tool nào (ý 2). Edit và Write vẫn còn nguyên.",
          "Nói model nhỏ “làm theo sát hơn” là đoán. Mà có sát hơn thì vẫn chỉ là nghe lời, không phải bị chặn (ý 3)."
        ] },
      { k: "D", gist: "Update the subagent's system prompt to say it is a reviewer that comments on files and leaves their contents unchanged.",
        why: [
          "Dặn trong system prompt là prompt-based guidance (ý 3). Model vẫn còn Edit và Write nên vẫn có lúc sửa file, như đã xảy ra khi test.",
          "Dễ bị cuốn vì sửa system prompt là phản xạ đầu tiên khi agent làm sai, và lời dặn nghe rất rõ. Nhưng đề hỏi cách chặn hẳn, còn prompt chỉ là hướng dẫn: tool còn trong danh sách thì vẫn có lúc bị gọi."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Biết thêm”: tools là danh sách tool được dùng, bỏ trống thì dùng hết tool của agent cha", href: NOTES + "#l-1-3" },
      { label: "Bài 1.4 “Quy tắc bắt buộc thì đừng nhờ prompt”: vì sao B và D không đủ", href: NOTES + "#l-1-4" },
      { label: "Cheatsheet D1: các trường của AgentDefinition", href: NOTES + "#cheat-d1" }
    ]
  },
  {
    de: 2, n: 3, total: 60, sub: "4.5", subName: "Xử lý theo lô (Batch)",
    first: "D", answer: "D",
    ask: "A legal-review pipeline commits to returning a result for every contract within 30 hours of the contract arriving. It uses the Message Batches API, whose processing can take up to 24 hours. In the worst case, how often must the pipeline start a new batch submission cycle to keep that commitment?",
    scene: [
      "Pipeline review hợp đồng cam kết: mỗi hợp đồng có kết quả trong 30 giờ kể từ lúc đến.",
      "Pipeline dùng Message Batches API, mỗi batch có thể mất tới 24 giờ.",
      "Chỗ khó: hợp đồng đến liên tục, nên ngoài 24 giờ xử lý còn thời gian chờ tới lần nộp kế."
    ],
    asks: [
      "Trong trường hợp xấu nhất, phải bắt đầu một lần nộp batch mới bao lâu một lần để giữ cam kết?",
      "Tức là: chờ xấu nhất (bằng khoảng nộp) + 24 giờ xử lý ≤ 30 giờ.",
      "Soi từng phương án: lấy khoảng nộp nó đưa ra cộng 24, xem có quá 30 không."
    ],
    facts: [
      "Message Batches API không hứa thời gian: mỗi batch có thể mất tới 24 giờ, không có SLA về độ trễ.",
      "Hợp đồng đến ngay sau một lần nộp phải chờ tới lần nộp kế, nên thời gian chờ xấu nhất bằng đúng khoảng cách giữa hai lần nộp.",
      "Công thức trong notes: khoảng nộp ≤ SLA − 24 giờ, rồi trừ thêm chút dự phòng. Với SLA 30 giờ, guide ghi “4-hour windows” (cửa sổ 4 giờ)."
    ],
    opts: [
      { k: "A", gist: "Start a new cycle at least every 12 hours, so a contract waits at most 12 hours before it goes into a batch.",
        why: [
          "Hợp đồng đến ngay sau một lần nộp chờ 12 giờ (ý 2), cộng tối đa 24 giờ xử lý (ý 1) thành 36 giờ.",
          "Trễ 6 giờ so với cam kết 30 giờ."
        ] },
      { k: "B", gist: "Start a new cycle at least every 30 hours, so a contract waits at most 30 hours before it goes into a batch.",
        why: [
          "Sai ở chỗ lấy cả 30 giờ làm thời gian chờ, quên rằng vào batch rồi còn tới 24 giờ xử lý (ý 1).",
          "Xấu nhất: 30 + 24 = 54 giờ, gần gấp đôi cam kết."
        ] },
      { k: "C", gist: "Start a new cycle at least every 24 hours, so a contract waits at most 24 hours before it goes into a batch.",
        why: [
          "Sai ở chỗ lấy thời gian xử lý tối đa làm nhịp nộp. Đó là hai khoảng khác nhau: chờ trước khi vào batch (ý 2) và batch chạy (ý 1).",
          "Xấu nhất: chờ 24 + xử lý 24 = 48 giờ, trễ 18 giờ.",
          "Dễ bị cuốn vì 24 trùng con số “up to 24 hours” (tới 24 giờ) trong đề, chọn theo phản xạ. Nhưng 24 giờ là thời gian xử lý, không phải khoảng nộp."
        ] },
      { k: "D", gist: "Start a new cycle at least every 6 hours, so a contract waits at most 6 hours before it goes into a batch.",
        why: [
          "Chờ tối đa 6 giờ (ý 2) cộng xử lý tối đa 24 giờ (ý 1) thành 30 giờ, vừa bằng cam kết. Đúng công thức 30 − 24 = 6 (ý 3).",
          "6 giờ chạm đúng SLA, không còn dư; guide chọn 4 giờ để có dự phòng (ý 3). Bốn phương án ở đây không có 4 giờ, và D là phương án duy nhất không vượt 30 giờ."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Tính nhịp submit theo SLA”: công thức khoảng nộp ≤ SLA − 24 giờ", href: NOTES + "#l-4-5" },
      { label: "Bài 4.5, “Khi đi thi” dạng 2 (đã sửa 01/11): cùng ví dụ SLA 30 giờ, vì sao guide ghi 4 giờ", href: NOTES + "#fix-8" }
    ]
  },
  {
    de: 2, n: 4, total: 60, sub: "3.5", subName: "Tinh chỉnh lặp: ví dụ input/output, test trước, interview",
    first: "D", answer: "C",
    ask: "A payments engineer is about to have Claude Code build a discount calculation function and wants as few correction rounds as possible from the start. Order totals must round to the nearest cent with banker's rounding, and stacked discounts must be applied in a particular order that is easy to get wrong. What should the engineer do before Claude writes any implementation code?",
    scene: [
      "Kỹ sư bên thanh toán sắp nhờ Claude Code viết hàm tính giảm giá, và muốn ít vòng sửa nhất ngay từ đầu.",
      "Chỗ khó thứ nhất: tổng đơn phải làm tròn tới xu theo banker's rounding (làm tròn kiểu ngân hàng), chỗ khác biệt nằm ở ca đúng nửa xu.",
      "Chỗ khó thứ hai: nhiều mức giảm giá chồng nhau phải áp theo một thứ tự riêng, đề nói là “easy to get wrong” (dễ làm sai)."
    ],
    asks: [
      "Trước khi Claude viết dòng code nào, kỹ sư nên làm gì?",
      "Tức là: cho Claude một đích “đúng” rõ ràng, chạy kiểm được, và không dựa vào cách Claude tự hiểu quy tắc.",
      "Soi từng phương án: kết quả mong đợi do ai đưa ra, và có kiểm tự động được sau mỗi lần sửa không?"
    ],
    facts: [
      "Test-driven iteration (bài 3.5): viết test suite trước, “xong” nghĩa là test chạy xanh; mỗi vòng đưa test đang fail cho Claude sửa.",
      "Mô tả bằng văn xuôi có nhiều cách hiểu, viết càng dài cách hiểu càng nhiều. Edge case (trường hợp biên) là chỗ code hay hỏng nhất, nên đưa input và kết quả mong đợi cụ thể.",
      "Claude viết cả code lẫn test từ cùng một mô tả thì cả hai mang cùng một cách hiểu. Test xanh chỉ chứng minh code khớp cách hiểu của Claude. Kết quả mong đợi phải đến từ người nắm spec.",
      "Banker's rounding: gặp đúng nửa thì làm tròn về số chẵn gần nhất. Ví dụ 0,125 → 0,12; 0,135 → 0,14."
    ],
    opts: [
      { k: "A", gist: "Have Claude describe its rounding and stacking approach in plain language, approve it, then let Claude implement the function and spot-check a few orders by hand.",
        why: [
          "Sai ở chỗ duyệt một đoạn mô tả bằng lời (ý 2). “Làm tròn kiểu banker” ai đọc cũng gật, nhưng code xử lý ca đúng nửa xu ra sao thì lời mô tả không cho thấy.",
          "Kiểm tay vài đơn sau khi code xong là sửa sau. Claude cũng không có mục tiêu cố định để tự chạy lại mỗi vòng, nên số vòng sửa không giảm."
        ] },
      { k: "B", gist: "Write the banker's rounding rule and the stacking order into <code>CLAUDE.md</code> as a prose specification, then have Claude implement the function and check its output against that file.",
        why: [
          "Sai ở chỗ vẫn là văn xuôi (ý 2), chỉ dời sang file khác. Thứ tự chồng giảm giá vốn dễ làm sai vẫn còn chỗ để hiểu lệch.",
          "“Đối chiếu output với file” nghĩa là có người đọc chữ rồi tự tính, không chạy tự động được. Để trong <code>CLAUDE.md</code> còn làm nó nạp vào context mọi phiên, dù chỉ một hàm cần."
        ] },
      { k: "C", gist: "Write a test suite with concrete cases for banker's rounding and for the stacking order, then have Claude implement the function and rerun the suite until it passes.",
        why: [
          "Đúng test-driven iteration (ý 1): kỹ sư viết test trước, mỗi test là một input kèm kết quả chính xác do chính kỹ sư tính, kể cả ca đúng nửa xu (ý 4) và thứ tự chồng giảm giá.",
          "Kết quả mong đợi đến từ người nắm spec, không từ cách Claude hiểu (ý 3). Claude chạy lại suite sau mỗi lần sửa nên tự thấy chỗ sai, bớt phải qua lại với người."
        ] },
      { k: "D", gist: "Ask Claude to produce the implementation and a matching test suite from the rules as written, then go through the failing cases and adjust the rounding and stacking code.",
        why: [
          "Claude viết cả code lẫn test từ cùng một lần đọc quy tắc (ý 3). Hiểu sai thứ tự giảm giá hay kiểu làm tròn thì sai ở cả hai chỗ, test vẫn xanh mà tổng tiền sai.",
          "Đề còn đòi làm trước khi có code, còn D cho code ra trước rồi mới kiểm.",
          "Dễ bị cuốn vì có test suite nên trông giống test-driven. Nhưng kết quả mong đợi do chính Claude suy ra, nên test chỉ xác nhận lại cách Claude hiểu. Cùng bẫy câu 22 Đề 1."
        ] }
    ],
    refs: [
      { label: "Bài 3.5: bảng chọn kỹ thuật, dòng “Test-driven iteration” và mẹo “Claude viết cả code lẫn test” trong “Khi đi thi”", href: NOTES + "#l-3-5" }
    ]
  },
  {
    de: 2, n: 5, total: 60, sub: "4.6", subName: "Review độc lập và review nhiều lượt",
    first: "A", answer: "A",
    ask: "An engineer runs the code-generation session at a high extended thinking effort and tells the model to reflect carefully on flaws before it hands in its code. Bugs still get past review. Why can't extended thinking stand in for a separate, independent review instance here?",
    scene: [
      "Kỹ sư chạy phiên sinh code với extended thinking ở mức cao, và dặn model suy xét kỹ các lỗi trước khi nộp code.",
      "Chỗ khó: model đã được cho nghĩ nhiều, đã được dặn tự soát, mà bug vẫn lọt qua review."
    ],
    asks: [
      "Vì sao extended thinking không thay được một instance review riêng, độc lập?",
      "Tức là: tìm gốc của việc tự soát bỏ sót, chứ không phải tìm cách cho nghĩ nhiều hơn.",
      "Soi từng phương án: lý do nó nêu có thật không, và nếu sửa đúng lý do đó thì bug có hết lọt không?"
    ],
    facts: [
      "Extended thinking cho Claude “nghĩ” thêm trong các block thinking trước khi trả lời. Nghĩ nhiều hơn vẫn là cùng một context.",
      "Phiên vừa sinh code vẫn giữ nguyên lý do lúc viết. Nó đã “tin” các quyết định đó, nên khi tự review thì hay bảo vệ chúng.",
      "Instance độc lập là một lần gọi hay session mới, context sạch, không thấy reasoning lúc sinh code. Guide: instance độc lập bắt lỗi tinh vi tốt hơn cả lời dặn tự review lẫn extended thinking.",
      "Bật extended thinking không tắt tool. Với thinking bật thủ công, <code>tool_choice</code> vẫn dùng được <code>auto</code> (model tự quyết gọi tool), chỉ không ép được tool."
    ],
    opts: [
      { k: "A", gist: "The reflection happens in the same context that produced the code, so the model leans on the reasoning behind its earlier choices while checking them.",
        why: [
          "Nghĩ thêm vẫn diễn ra trong đúng context đã sinh ra code (ý 1), mang nguyên lý do lúc viết (ý 2).",
          "Model đã tin các quyết định đó nên khi tự soát thì nghiêng về xác nhận lại. Muốn bắt lỗi tinh vi phải tách sang instance khác, không mang reasoning cũ (ý 3)."
        ] },
      { k: "B", gist: "Reflection runs with tool use turned off, so the model cannot reopen the files it wrote and check them against the requirements.",
        why: [
          "Sai ở giả định: bật extended thinking không tắt tool (ý 4).",
          "Mà có mở lại file thì người soát vẫn là cùng model với cùng lập luận (ý 2). Gốc vấn đề không nằm ở tool."
        ] },
      { k: "C", gist: "Reflection raises the reasoning budget but applies the same depth of checking to every issue, so the extra effort adds little scrutiny.",
        why: [
          "Sai ở lý do: guide và notes không nói extended thinking “soát mọi lỗi với cùng độ sâu”. Lý do này nghe kỹ thuật nhưng là tự đặt ra.",
          "Vấn đề không nằm ở độ sâu có chia đều hay không, mà ở chỗ ai đang soát: vẫn là người viết, với cùng niềm tin (ý 2)."
        ] },
      { k: "D", gist: "Reflection is capped by a thinking-token budget that runs out before the model can re-examine all of the generated code.",
        why: [
          "Sai ở chỗ đổ cho ngân sách token, như thể tăng budget là xong. Đề đã cho nghĩ ở mức cao mà lỗi vẫn lọt.",
          "Cho nghĩ nhiều đến đâu thì vẫn là cùng context, cùng thiên lệch (ý 1, ý 2).",
          "Dễ bị cuốn vì thinking đúng là có giới hạn token, nghe hợp lý. Nhưng nó ngầm bảo cách sửa là nghĩ lâu hơn, trong khi phải tách ra instance khác (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 4.6, mục “Chuyện gì đang xảy ra”: extended thinking vẫn là cùng context, instance độc lập thắng cả self-review lẫn extended thinking", href: NOTES + "#l-4-6" },
      { label: "Cheatsheet D4: dòng “Phiên vừa sinh code tự review bỏ sót” → instance review độc lập", href: NOTES + "#cheat-d4" },
      { label: "Bài 2.3, mục “Đã sửa 01/11”: bật extended thinking thủ công thì tool_choice còn auto/none, tool vẫn gọi được", href: NOTES + "#fix-2" }
    ]
  },
  {
    de: 2, n: 6, total: 60, sub: "3.6", subName: "Đưa Claude Code vào CI/CD",
    first: "C", answer: "D",
    ask: "A nightly job runs <code>claude -p \"run the migration script\" --allowedTools \"Bash(npm run migrate*)\"</code>, meaning to allow only the exact migrate command. During the run it also executes an unrelated command, <code>npm run migrate-cleanup</code>, without asking. Why does the rule match more than intended?",
    scene: [
      "Job chạy đêm gọi <code>claude -p \"run the migration script\" --allowedTools \"Bash(npm run migrate*)\"</code>, định chỉ cho phép đúng lệnh migrate.",
      "Chỗ khó: lúc chạy, nó còn chạy cả <code>npm run migrate-cleanup</code>, một lệnh không liên quan, mà không hỏi."
    ],
    asks: [
      "Vì sao rule khớp rộng hơn ý định?",
      "Tức là: chỉ ra đúng cơ chế khớp của rule Bash làm <code>migrate*</code> nuốt luôn <code>migrate-cleanup</code>.",
      "Soi từng phương án: cơ chế nó nêu có thật trong docs không, và có giải thích được đúng lệnh <code>migrate-cleanup</code> không?"
    ],
    facts: [
      "Rule permission của Bash không phải regex. <code>*</code> là ký tự đại diện, khớp mọi chuỗi, kể cả dấu cách.",
      "Dấu cách trước <code>*</code> ở cuối là một phần của rule. <code>Bash(npm run migrate *)</code> khớp lệnh đó và lệnh đó kèm tham số, không khớp <code>migrate-cleanup</code>. <code>Bash(npm run migrate*)</code> khớp mọi lệnh bắt đầu bằng chuỗi đó. <code>Bash(npm run migrate)</code> khớp đúng một lệnh.",
      "<code>acceptEdits</code> là một permission mode, bật bằng <code>--permission-mode</code>, dùng để cho sửa file mà không hỏi. <code>--allowedTools</code> và permission mode là hai thiết lập riêng."
    ],
    opts: [
      { k: "A", gist: "The <code>--bare</code> flag was left off, so Claude Code falls back to a permissive default that widens every <code>--allowedTools</code> prefix match.",
        why: [
          "Sai ở chỗ bịa cơ chế. Rule khớp rộng hay hẹp là do chính chuỗi rule (ý 2); docs không nói cờ nào nới mẫu của <code>--allowedTools</code> ra.",
          "Có thêm <code>--bare</code> thì <code>Bash(npm run migrate*)</code> vẫn khớp <code>migrate-cleanup</code>."
        ] },
      { k: "B", gist: "<code>acceptEdits</code> was turned on implicitly together with <code>--allowedTools</code>, widening matching to any command that contains the word migrate.",
        why: [
          "Sai ở giả định: <code>acceptEdits</code> phải bật bằng <code>--permission-mode</code>, <code>--allowedTools</code> không tự bật nó (ý 3).",
          "Mode này lo việc duyệt sửa file, không biến rule Bash thành khớp theo từ khóa “migrate”."
        ] },
      { k: "C", gist: "<code>--allowedTools</code> patterns are matched as regular expressions with alternation by default, so <code>migrate*</code> matches <code>migrate</code> or any suffix that starts with a letter.",
        why: [
          "Sai ở giả định: rule permission không phải regex (ý 1). Không có cú pháp alternation (chọn một trong nhiều), <code>*</code> cũng không giới hạn ở chữ cái.",
          "Chính lý do của C cũng không giải thích được lệnh bị chạy: hậu tố ở đây bắt đầu bằng dấu gạch (<code>-cleanup</code>), không phải chữ cái.",
          "Dễ bị cuốn vì “khớp thêm hậu tố” tả gần đúng hiện tượng. Nhưng đề hỏi vì sao, nên phải chọn đúng cơ chế: thiếu dấu cách trước <code>*</code>."
        ] },
      { k: "D", gist: "There is no space between migrate and the asterisk, so the rule matches every command that begins with <code>npm run migrate</code>, <code>migrate-cleanup</code> included.",
        why: [
          "Không có dấu cách giữa <code>migrate</code> và <code>*</code>, nên rule khớp mọi lệnh bắt đầu bằng <code>npm run migrate</code>, kể cả <code>migrate-cleanup</code> (ý 2).",
          "Docs lấy ví dụ: <code>Bash(ls *)</code> không khớp <code>lsof</code>, còn <code>Bash(ls*)</code> thì khớp. Muốn đúng một lệnh thì bỏ hẳn dấu sao: <code>Bash(npm run migrate)</code>."
        ] }
    ],
    refs: [
      { label: "Bài 3.6, mục “Biết thêm” (đã sửa 02/11): dấu cách trước * trong rule Bash, bốn cách viết", href: NOTES + "#fix-20" },
      { label: "Docs Permissions, mục Wildcard patterns: dấu cách trước * ở cuối là một phần của rule", href: "https://code.claude.com/docs/en/permissions" }
    ]
  },
  {
    de: 2, n: 7, total: 60, sub: "3.3", subName: "Rule theo đường dẫn trong .claude/rules",
    first: "D", answer: "D",
    ask: "A design-system team wrote a rule scoped with <code>paths: [\"src/components/*.tsx\"]</code> to enforce prop-naming conventions. After a reorganization, components sit in nested folders such as <code>src/components/forms/Input.tsx</code> and <code>src/components/layout/Grid.tsx</code>, and the rule no longer applies to them. What is the cause, and how should they fix it?",
    scene: [
      "Team design system viết một rule giới hạn bằng <code>paths: [\"src/components/*.tsx\"]</code> để ép quy ước đặt tên prop.",
      "Sau đợt sắp xếp lại, component nằm trong thư mục con, ví dụ <code>src/components/forms/Input.tsx</code> và <code>src/components/layout/Grid.tsx</code>. Rule không còn áp cho chúng.",
      "Chỗ khó: rule từng chạy đúng trước khi dời file, nên dễ nghĩ lỗi nằm ở lúc nạp hay ở gốc đường dẫn, chứ không ở chính mẫu glob."
    ],
    asks: [
      "Nguyên nhân là gì, và sửa thế nào?",
      "Tức là: vì sao mẫu cũ không với tới file ở thư mục con, và mẫu nào thì với tới.",
      "Soi từng phương án: cả lý do lẫn cách sửa phải đúng. Cách sửa có làm mẫu khớp <code>forms/Input.tsx</code> không?"
    ],
    facts: [
      "Rule trong <code>.claude/rules/</code> có <code>paths</code> chỉ nạp khi Claude đọc hoặc sửa một file khớp glob trong đó. CLAUDE.md thì khác: nạp vào context đầu mỗi phiên.",
      "Glob: <code>*</code> khớp mọi ký tự nhưng chỉ trong một cấp thư mục. <code>**</code> khớp qua mọi cấp thư mục.",
      "<code>{tsx,jsx}</code> (brace expansion) khớp một trong các đuôi liệt kê, chỉ cần khi muốn nhiều đuôi."
    ],
    opts: [
      { k: "A", gist: "Path-scoped rules are read at session start, so the new layout has not been picked up; restarting Claude Code after the move makes the existing <code>src/components/*.tsx</code> entry apply to the moved files.",
        why: [
          "Sai ở giả định: rule có <code>paths</code> nạp khi Claude làm việc với file khớp mẫu, không phải đọc cây thư mục một lần lúc mở phiên (ý 1).",
          "Mẫu <code>src/components/*.tsx</code> vốn không khớp file ở thư mục con (ý 2), khởi động lại bao nhiêu lần cũng vậy.",
          "Dễ bị cuốn vì CLAUDE.md đúng là nạp lúc mở phiên. Nhưng rule có <code>paths</code> nạp theo file đang làm, và lỗi nằm ở chính mẫu glob."
        ] },
      { k: "B", gist: "The glob skips <code>.tsx</code> files unless the extension is listed through brace expansion; rewriting it as <code>src/components/*.{tsx,jsx}</code> lets it recognize the components.",
        why: [
          "Sai ở giả định: <code>*.tsx</code> khớp file <code>.tsx</code> bình thường, brace expansion chỉ cần khi muốn nhiều đuôi (ý 3).",
          "Bản sửa vẫn chỉ có một <code>*</code> ngay sau <code>src/components/</code>, nên vẫn không với tới thư mục con (ý 2)."
        ] },
      { k: "C", gist: "The entry is resolved from the filesystem root rather than the project root, so it needs a leading slash; <code>/src/components/*.tsx</code> restores matching for the nested files.",
        why: [
          "Sai ở chỗ bịa quy tắc. Trước khi dời file, rule vẫn áp đúng cho file nằm ngay trong <code>src/components/</code>, tức gốc đường dẫn không sai.",
          "Thêm <code>/</code> ở đầu cũng không làm một <code>*</code> đi qua được thư mục con (ý 2)."
        ] },
      { k: "D", gist: "A single <code>*</code> covers one path segment, so files in subfolders of <code>src/components</code> fall outside the pattern; changing it to <code>src/components/**/*.tsx</code> matches them at any depth.",
        why: [
          "<code>src/components/*.tsx</code> chỉ khớp file nằm ngay trong <code>src/components/</code>, vì <code>*</code> chỉ khớp trong một cấp thư mục (ý 2).",
          "<code>src/components/**/*.tsx</code> có <code>**</code> khớp qua mọi cấp, nên khớp cả <code>forms/Input.tsx</code> lẫn <code>layout/Grid.tsx</code>. Rule lại nạp mỗi khi Claude làm việc với các file đó (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 3.3, khung định nghĩa “Glob”: * trong một cấp thư mục, ** qua mọi cấp", href: NOTES + "#l-3-3" },
      { label: "Bài 3.1, khung định nghĩa “CLAUDE.md”: nạp vào context đầu mỗi phiên, khác rule có paths", href: NOTES + "#l-3-1" }
    ]
  },
  {
    de: 2, n: 8, total: 60, sub: "3.1", subName: "Cấp của CLAUDE.md và chia sẻ cho team",
    first: "B", answer: "B",
    ask: "A project <code>CLAUDE.md</code> contains the line <code>See @README for project overview and @package.json for available npm commands.</code> The maintainer also wants to name <code>@docs/legacy-notes.md</code> in a sentence purely as a pointer for human readers, without Claude importing that file's contents into context. How should the second reference be written?",
    scene: [
      "<code>CLAUDE.md</code> của project có dòng <code>See @README for project overview and @package.json for available npm commands.</code> (xem README để biết tổng quan, package.json để biết các lệnh npm). Hai đường dẫn có <code>@</code> này được import.",
      "Người bảo trì muốn nhắc thêm <code>@docs/legacy-notes.md</code> trong một câu, chỉ để người đọc biết chỗ tìm, không để Claude nạp nội dung file đó vào context.",
      "Chỗ khó: viết <code>@đường/dẫn</code> trong CLAUDE.md là import. Cần một cách viết mà người vẫn đọc ra đường dẫn ngay trong câu, còn Claude thì không import."
    ],
    asks: [
      "Viết đường dẫn thứ hai thế nào?",
      "Tức là: tìm cách viết mà bước đọc import bỏ qua, và đường dẫn vẫn nằm trong câu cho người đọc.",
      "Soi từng phương án: cách viết đó có trong docs không, và lý do nó nêu có đúng không?"
    ],
    facts: [
      "<code>@đường/dẫn</code> viết trong CLAUDE.md kéo nội dung file đó vào context, nạp lúc khởi động.",
      "Code span là đoạn chữ bọc trong dấu backtick. Docs Memory: “Import parsing skips Markdown code spans and fenced code blocks” (bước đọc import bỏ qua code span và khối code). Viết <code>`@README`</code> thì chỉ là chữ; <code>@README</code> ngoài backtick thì file được import.",
      "Comment HTML dạng khối (<code>&lt;!-- ghi chú --&gt;</code>) trong CLAUDE.md bị lược bỏ trước khi đưa vào context, dùng để ghi chú cho người bảo trì. Khi xem Markdown đã hiển thị, comment không hiện ra."
    ],
    opts: [
      { k: "A", gist: "Put a space between <code>@</code> and the path, as in <code>@ docs/legacy-notes.md</code>, because only a path written right after <code>@</code> with no space counts as an import.",
        why: [
          "Sai ở chỗ tự suy ra quy tắc: docs không nói gì về dấu cách sau <code>@</code>.",
          "Chuỗi <code>@ docs/legacy-notes.md</code> cũng không còn là đường dẫn gọn cho người đọc. Cách docs ghi rõ cho việc này là bọc trong backtick (ý 2)."
        ] },
      { k: "B", gist: "Wrap the path in backticks so it becomes a Markdown code span, since import parsing skips code spans and leaves the reference as literal text.",
        why: [
          "Bọc trong backtick thì đường dẫn thành code span, và bước đọc import bỏ qua code span (ý 2).",
          "Người đọc vẫn thấy <code>`@docs/legacy-notes.md`</code> ngay trong câu, còn Claude không bị nạp nội dung file. Thỏa cả hai điều đề đòi."
        ] },
      { k: "C", gist: "Prefix it with a double <code>@@</code>, as in <code>@@docs/legacy-notes.md</code>, because a doubled <code>@</code> tells the parser to show the path without importing it.",
        why: [
          "Sai ở chỗ bịa cú pháp: docs không có kiểu thoát bằng <code>@@</code>.",
          "Cách docs ghi rõ để nhắc đường dẫn mà không import là backtick (ý 2)."
        ] },
      { k: "D", gist: "Put it inside an HTML comment, <code>&lt;!-- @docs/legacy-notes.md --&gt;</code>, because HTML comments show up as plain visible text but are left out of imports.",
        why: [
          "Lý do của D sai: comment HTML không hiện thành chữ khi xem Markdown (ý 3), nên người đọc bản hiển thị không thấy câu nhắc.",
          "Comment HTML dạng khối đúng là bị lược khỏi context (ý 3), nhưng khi đó đường dẫn không còn nằm trong câu văn. Cách docs chỉ đích danh cho việc này là backtick (ý 2).",
          "Dễ bị cuốn vì docs đúng là có nói comment HTML bị lược khỏi context và dùng để ghi chú cho người bảo trì. Nhưng D giải thích sai cơ chế, và không giữ đường dẫn trong câu như đề muốn."
        ] }
    ],
    refs: [
      { label: "Bài 3.1, mục “Biết thêm” (đã sửa 02/11): bọc trong backtick thì không import; comment HTML bị lược khỏi context", href: NOTES + "#fix-19" },
      { label: "Bài 3.1, khung định nghĩa “@import”: cú pháp @đường/dẫn kéo file vào, nạp lúc khởi động", href: NOTES + "#l-3-1" },
      { label: "Docs Memory, mục Import additional files: bọc đường dẫn trong backtick thì không import", href: "https://code.claude.com/docs/en/memory" }
    ]
  },
  {
    de: 2, n: 9, total: 60, sub: "1.6", subName: "Chia việc lớn",
    first: "C", answer: "B",
    ask: "An engineering lead wants an agent workflow that drafts an outline for a marketing blog post, expands the outline into full prose, then proofreads the prose for grammar. Each stage's output is always exactly what the next stage needs, and the number of stages never changes. Which architecture fits best?",
    scene: [
      "Trưởng nhóm muốn một workflow cho bài blog marketing: viết dàn ý, mở dàn ý thành bài hoàn chỉnh, rồi soát ngữ pháp.",
      "Output của mỗi bước luôn đúng là thứ bước sau cần, và số bước không bao giờ đổi.",
      "Chỗ khó: bốn phương án là bốn mẫu workflow có thật, mẫu nào nghe cũng hợp lý. Phải nhận ra mẫu qua dấu hiệu đề cho."
    ],
    asks: [
      "Kiến trúc nào hợp nhất?",
      "Tức là: chọn mẫu workflow có dấu hiệu khớp với “bước cố định, output bước trước là input bước sau”.",
      "Soi từng phương án: mẫu đó dùng khi nào, và đề có dấu hiệu đó không?"
    ],
    facts: [
      "Prompt chaining (chuỗi lời gọi): nhiều lần gọi model với các bước định sẵn trong code; output bước trước thành input bước sau. Dấu hiệu: các bước cố định.",
      "Routing (định tuyến): phân loại đầu vào rồi gửi sang nhánh chuyên xử lý loại đó. Dùng khi đầu vào chia thành nhiều loại rõ ràng.",
      "Parallelization (chạy song song): các việc con độc lập chạy cùng lúc, code gộp kết quả.",
      "Orchestrator-workers (điều phối và thợ): một model chia việc lúc chạy, giao cho các lần gọi con rồi tổng hợp. Dùng khi không đoán trước được cần những việc con nào."
    ],
    opts: [
      { k: "A", gist: "A routing workflow: a classifier reads each request and sends it to a specialised outline, drafting or proofreading handler.",
        why: [
          "Sai ở chỗ không có gì để phân loại: routing cần đầu vào thuộc nhiều loại (ý 2), còn bài nào ở đây cũng đi qua đủ ba bước theo thứ tự.",
          "Routing chỉ chọn một handler (nhánh xử lý) cho mỗi yêu cầu, nên còn bỏ mất hai bước kia."
        ] },
      { k: "B", gist: "A prompt chain: an outline call, a drafting call and a proofreading call run in order, each taking the previous output.",
        why: [
          "Đề cho đủ hai dấu hiệu của prompt chaining (ý 1): số bước cố định, và output bước này đúng là input bước sau.",
          "Ba lần gọi nối nhau bằng code: dàn ý → bài viết → bản đã soát. Không cần model nào lập kế hoạch lúc chạy."
        ] },
      { k: "C", gist: "An orchestrator-workers pattern: a lead model plans the post's sections at runtime and hands each one to a worker call.",
        why: [
          "Sai ở chỗ orchestrator-workers dành cho việc không đoán trước được cần những việc con nào (ý 4). Ở đây ba bước và số bước đã biết trước, lập kế hoạch lúc chạy chỉ thêm chi phí và thêm chỗ chạy lệch.",
          "C còn chia việc theo các section (phần) của bài, chứ không theo ba bước dàn ý → viết → soát mà đề mô tả.",
          "Dễ bị cuốn vì “lead model plans the post's sections” (model chính lên kế hoạch các phần) nghe như kiến trúc agent xịn hơn. Nhưng bài 1.6 phân biệt rõ: biết trước các bước thì dùng prompt chaining; chia việc lúc chạy chỉ dành cho việc mở, khi bước sau sinh ra từ cái vừa phát hiện."
        ] },
      { k: "D", gist: "A parallelization workflow: the outline, drafting and proofreading calls start at the same time and a final step merges their results.",
        why: [
          "Sai ở chỗ parallelization cần các việc con độc lập (ý 3). Ở đây bước sau cần output của bước trước.",
          "Chưa có dàn ý thì không viết được bài, chưa có bài thì không soát được. Chạy cùng lúc là làm ngược thứ tự phụ thuộc."
        ] }
    ],
    refs: [
      { label: "Bài 1.6: prompt chaining (bước biết trước) và dynamic adaptive decomposition (bước sinh ra lúc chạy)", href: NOTES + "#l-1-6" },
      { label: "Bài 1.6, mục “Biết thêm” (đã sửa 02/11): năm mẫu workflow và dấu hiệu nhận ra từng mẫu", href: NOTES + "#fix-17" },
      { label: "Anthropic, Building effective agents: prompt chaining, routing, parallelization, orchestrator-workers", href: "https://www.anthropic.com/engineering/building-effective-agents" }
    ]
  },
  {
    de: 2, n: 10, total: 60, sub: "5.1", subName: "Giữ thông tin quan trọng trong hội thoại dài",
    first: "A", answer: "B",
    ask: "A legal-research orchestrator merges the outputs of eight subagents. Each one returns several paragraphs of step-by-step reasoning followed by its conclusion. The merged result is larger than the downstream drafting agent's context budget, so some subagents' findings get dropped entirely before drafting. Which change fixes this?",
    scene: [
      "Orchestrator nghiên cứu pháp lý gộp output của tám subagent. Mỗi subagent trả vài đoạn suy luận từng bước, rồi mới tới kết luận.",
      "Khối gộp lớn hơn ngân sách context của agent soạn thảo phía sau, nên finding (điều tìm được) của vài subagent bị bỏ hẳn trước bước soạn.",
      "Chỗ khó: cái bị tràn là đầu vào của agent phía sau, còn cái làm nó phình là hình dạng output của các agent phía trước."
    ],
    asks: [
      "Thay đổi nào sửa được chuyện này?",
      "Tức là: làm sao để finding của cả tám subagent lọt vừa ngân sách context của agent soạn thảo.",
      "Soi từng phương án: tổng chữ đưa sang agent soạn thảo nhỏ đi hay to ra, và finding nào còn bị mất?"
    ],
    facts: [
      "Guide 5.1: nếu agent phía sau có ngân sách context hẹp, sửa agent phía trước để trả dữ liệu có cấu trúc (key facts: sự kiện chính; citation: trích nguồn; relevance score: điểm liên quan) thay vì cả bài văn kèm chuỗi suy luận.",
      "API không có trạng thái: cái gì không có trong request thì model không biết. Finding bị cắt khỏi đầu vào thì với agent soạn thảo, nó chưa từng tồn tại."
    ],
    opts: [
      { k: "A", gist: "Have the orchestrator split each topic across more subagents, each still returning its full written analysis.",
        why: [
          "Sai ở hướng sửa: chia chủ đề cho nhiều subagent hơn mà cái nào cũng trả cả bài phân tích thì tổng chữ còn tăng.",
          "Agent soạn thảo nhận đầu vào còn to hơn cái đã vượt ngân sách, nên càng nhiều finding bị cắt (ý 2).",
          "Dễ bị cuốn vì chia việc cho nhiều subagent hơn là cách chữa quen khi context quá tải. Nhưng ở đây cái tràn là đầu vào của agent soạn thảo, và A làm nó to thêm. Phải làm gọn output từ phía subagent (ý 1)."
        ] },
      { k: "B", gist: "Have each subagent return a short record of key facts, citations and relevance scores in place of its written analysis.",
        why: [
          "Đúng cách guide nêu (ý 1): mỗi subagent trả bản ghi ngắn gồm key facts, citation, relevance score, bỏ mấy đoạn suy luận từng bước.",
          "Phần agent soạn thảo cần vẫn còn, phần cồng kềnh bỏ đi. Cả tám bản ghi lọt vừa ngân sách, không finding nào bị cắt."
        ] },
      { k: "C", gist: "Have the orchestrator pass along whichever subagent outputs arrive first and drop the rest once the budget is full.",
        why: [
          "Đây chính là lỗi đề đang kể, chỉ đổi cách chọn cái bị bỏ: theo thứ tự về, chẳng liên quan gì tới mức quan trọng.",
          "Finding của subagent về muộn vẫn mất (ý 2), dù có thể là finding quan trọng nhất."
        ] },
      { k: "D", gist: "Have the drafting agent read the combined output in two passes, noting findings on the first pass to reuse on the second.",
        why: [
          "Sai ở giả định: đọc hai lượt không làm đầu vào nhỏ đi. Lượt nào cũng phải đưa cả khối đã vượt ngân sách vào request (ý 2).",
          "Ghi chú ở lượt đầu là tóm tắt sau khi đã quá tải, thay vì làm gọn từ nguồn (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 5.1, mục “Bộ kỹ thuật đi kèm”: agent phía sau ngân sách hẹp thì agent phía trước trả dữ liệu có cấu trúc", href: NOTES + "#l-5-1" }
    ]
  },
  {
    de: 2, n: 11, total: 60, sub: "5.2", subName: "Escalate và xử lý chỗ mơ hồ",
    first: "C", answer: "C",
    ask: "A streaming service's support agent looks up a customer to answer a billing question and gets back two profiles with the same email domain and last name, which looks like a family plan. Usage data shows one profile is much more active than the other. What should the agent do?",
    scene: [
      "Agent hỗ trợ của một dịch vụ xem phim trực tuyến tra khách để trả lời một câu hỏi về thanh toán.",
      "Tool trả về hai hồ sơ trùng email domain (phần tên miền của email) và trùng họ, trông như một gói gia đình.",
      "Chỗ khó: đề cho thêm dữ kiện về mức dùng, một hồ sơ “much more active” (dùng nhiều hơn hẳn) so với hồ sơ kia. Dữ kiện này như mời mày dùng nó để chọn."
    ],
    asks: [
      "Agent nên làm gì?",
      "Tức là: có hai hồ sơ đều có thể là người đang hỏi, agent chốt người gọi là ai bằng cách nào trước khi nói chuyện thanh toán.",
      "Soi từng phương án: nó chọn hồ sơ bằng dấu hiệu để đoán, hay bằng một thông tin chỉ chủ hồ sơ mới biết?"
    ],
    facts: [
      "Nhiều kết quả khớp nghĩa là agent chưa biết đang nói chuyện với ai. Mọi thao tác sau đó đều có thể rơi vào nhầm người.",
      "Guide 5.2: tool trả nhiều khách khớp thì hỏi thêm định danh, không chọn theo heuristic (đoán theo dấu hiệu, như đơn gần nhất hay email trùng domain).",
      "Đoán đúng 80% vẫn là 20% ca sai tài khoản, mà đây là chuyện tiền bạc và dữ liệu cá nhân.",
      "Định danh thêm hay dùng: số điện thoại, mã đơn, bốn số cuối thẻ. Một câu hỏi thêm là đủ để tra ra đúng một hồ sơ."
    ],
    opts: [
      { k: "A", gist: "Open the profile with the earlier creation date and answer from it, treating it as the likely primary account.",
        why: [
          "Sai ở giả định: hồ sơ tạo trước là tài khoản chính, và người gọi là chủ tài khoản chính. Đó là heuristic (ý 2).",
          "Gói gia đình thì người gọi có thể là bất kỳ thành viên nào. Đoán sai là đem chuyện thanh toán của người khác ra nói (ý 3)."
        ] },
      { k: "B", gist: "Review the billing history on both profiles, then answer from whichever record fits the question best.",
        why: [
          "Vẫn là đoán, chỉ đổi dấu hiệu: hồ sơ nào “khớp” câu hỏi hơn (ý 2).",
          "Tệ hơn: agent mở lịch sử thanh toán của cả hai người khi chưa biết ai đang hỏi, tức là đã xem dữ liệu của người không liên quan (ý 1, ý 3)."
        ] },
      { k: "C", gist: "Ask the customer to confirm the last four digits of the card on file, then open the profile that matches.",
        why: [
          "Hỏi thêm một định danh, đúng như guide (ý 2). Bốn số cuối thẻ là thứ chủ hồ sơ biết (ý 4).",
          "Khách trả lời xong thì agent tra ra đúng một hồ sơ rồi mới bàn chuyện thanh toán. Không đoán, không đụng dữ liệu của người kia."
        ] },
      { k: "D", gist: "Open the profile with the higher recent usage and answer from it as the caller's likely account.",
        why: [
          "Cũng là heuristic (ý 2). Hồ sơ dùng nhiều hơn không cho biết ai đang gọi.",
          "Người ít xem có khi lại là người trả tiền, và chính người đó hay hỏi về hóa đơn. Chọn sai là trả lời về khoản phí của người khác (ý 3).",
          "Dễ bị cuốn vì đề cố ý cho dữ kiện “much more active”, càng cụ thể càng dễ tin. Nhưng dùng dữ kiện đó vẫn là đoán người gọi là ai."
        ] }
    ],
    refs: [
      { label: "Bài 5.2, “Khi đi thi” dạng 3: nhiều khách cùng tên → hỏi thêm định danh, không chọn theo heuristic", href: NOTES + "#l-5-2" },
      { label: "Bài 5.2, mục “Ba tình huống hay bị nhầm khi escalate”, đoạn cuối: ba khách cùng tên → hỏi số điện thoại, mã đơn, bốn số cuối thẻ", href: NOTES + "#fix-9" },
      { label: "Cheatsheet D5: dòng “get_customer trả nhiều khách khớp” → hỏi thêm định danh", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 2, n: 12, total: 60, sub: "1.5", subName: "Hook của Agent SDK: chặn tool call và chuẩn hóa dữ liệu",
    first: "B", answer: "B",
    ask: "An architect's agent calls three MCP tools that each return timestamps in a different format: Unix epoch integers, ISO 8601 strings, and numeric status codes mixed in with dates. The model often misreads these inconsistent formats when reasoning about order history. Which hook design normalizes the data before the model ever sees it?",
    scene: [
      "Agent gọi ba MCP tool (tool do MCP server bên ngoài cung cấp). Mỗi tool trả ngày giờ một kiểu: số Unix epoch (số giây kể từ năm 1970), chuỗi ISO 8601, và mã trạng thái dạng số lẫn vào giữa các ngày.",
      "Model hay đọc nhầm các định dạng này khi suy luận về thứ tự lịch sử đơn hàng.",
      "Chỗ khó: cả bốn phương án đều là hook gắn đúng ba tool đó. Chúng khác nhau ở loại hook và trường trả về."
    ],
    asks: [
      "Thiết kế hook nào chuẩn hóa dữ liệu trước khi model thấy nó?",
      "Tức là: phải sửa chính kết quả tool trả về, thay bản lộn xộn bằng bản một định dạng, trước khi kết quả vào <code>messages</code>.",
      "Soi hai điều: hook chạy trước hay sau tool? Trường trả về thay hẳn kết quả, hay chỉ nối thêm?"
    ],
    facts: [
      "<code>PreToolUse</code> chạy trước khi tool thực thi. Nó cho qua, từ chối, hoặc sửa tham số gửi đi qua <code>updatedInput</code>.",
      "<code>PostToolUse</code> chạy sau khi tool trả kết quả, trước khi kết quả được nối vào <code>messages</code> cho Claude đọc. Đây là chỗ chuẩn hóa dữ liệu lộn xộn.",
      "Trong kết quả của PostToolUse: <code>updatedToolOutput</code> thay hẳn kết quả tool, còn <code>additionalContext</code> chỉ nối thêm ghi chú.",
      "Agent SDK có hai điểm chặn quanh mỗi lần gọi tool là <code>PreToolUse</code> và <code>PostToolUse</code>. <code>Notification</code> không phải một trong hai; notes chỉ nhắc nó cùng <code>Stop</code>, dùng để phát âm báo."
    ],
    opts: [
      { k: "A", gist: "Register a PreToolUse hook matched to the three MCP tools that parses each call and returns <code>hookSpecificOutput.updatedInput</code> with the timestamp arguments rewritten into one uniform format for the server.",
        why: [
          "Sai chiều: PreToolUse chạy trước tool, và <code>updatedInput</code> sửa tham số gửi đi (ý 1).",
          "Định dạng lộn xộn nằm ở kết quả tool trả về. Viết lại tham số timestamp gửi cho server không đổi được cách server trả ngày, nên model vẫn nhận ba kiểu."
        ] },
      { k: "B", gist: "Register a PostToolUse hook matched to the three MCP tools that parses each response and returns <code>hookSpecificOutput.updatedToolOutput</code> with the dates rewritten into one uniform format for the model.",
        why: [
          "PostToolUse chạy sau khi tool trả kết quả, trước khi kết quả vào <code>messages</code> (ý 2).",
          "<code>updatedToolOutput</code> thay hẳn kết quả bằng bản đã chuẩn hóa (ý 3), nên model chỉ thấy một định dạng ngày. Đúng yêu cầu “before the model ever sees it” (trước khi model thấy).",
          "Matcher gắn đúng ba tool MCP, nên tool khác không bị đụng tới."
        ] },
      { k: "C", gist: "Register a PostToolUse hook matched to the three MCP tools that parses each response and returns <code>hookSpecificOutput.additionalContext</code> carrying the dates rewritten into one uniform format.",
        why: [
          "Đúng hook, sai trường: <code>additionalContext</code> chỉ nối thêm ghi chú (ý 3).",
          "Kết quả gốc với ba định dạng vẫn nằm nguyên. Model thấy cả bản lộn xộn lẫn bản chuẩn, trái với “before the model ever sees it”.",
          "Dễ bị cuốn vì đúng PostToolUse, đúng matcher, và “đưa thêm dữ liệu sạch cho model” nghe hợp lý. Nhưng bản gốc lộn xộn vẫn còn đó để model đọc nhầm."
        ] },
      { k: "D", gist: "Register a Notification hook matched to the three MCP tools that scans each returned message for date-like substrings and writes them into one uniform format in the transcript.",
        why: [
          "Sai loại hook: Notification không phải điểm chặn quanh tool call (ý 4), nó không chạy sau mỗi lần tool trả kết quả.",
          "Muốn đổi kết quả tool trước khi model đọc thì chỉ có PostToolUse (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 1.5, mục “Biết thêm”: updatedToolOutput thay hẳn kết quả, additionalContext chỉ nối thêm", href: NOTES + "#l-1-5" },
      { label: "Cheatsheet D1: dòng Hook (PreToolUse, PostToolUse, updatedToolOutput)", href: NOTES + "#cheat-d1" }
    ]
  },
  {
    de: 2, n: 13, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới",
    first: "D", answer: "D",
    ask: "An application serves many users at once, each with a long-running investigation conversation against the same repository directory. A backend service has to resume one specific user's conversation on demand, possibly hours after that user's last message, while other users' sessions stay active in the same directory. Which session option should the service use?",
    scene: [
      "Một ứng dụng phục vụ nhiều người dùng cùng lúc. Mỗi người có một cuộc điều tra dài với agent, tất cả chạy trên cùng một thư mục repo.",
      "Backend phải mở lại đúng cuộc trò chuyện của một người khi người đó nhắn tiếp, có khi sau vài giờ.",
      "Chỗ khó: trong lúc đó phiên của những người khác vẫn đang chạy trong cùng thư mục, nên phiên “gần nhất” chưa chắc là của người cần."
    ],
    asks: [
      "Service nên dùng tùy chọn phiên nào?",
      "Tức là: cách nào chỉ đúng một phiên của đúng một người, không cần ai ngồi chọn, và không đụng phiên của người khác.",
      "Soi từng phương án: nó xác định phiên bằng gì, phiên gần nhất trong thư mục, người chọn tay, hay ID?"
    ],
    facts: [
      "Mỗi phiên được lưu xuống đĩa và có ID riêng. <code>--resume &lt;id hoặc tên&gt;</code> mở đúng phiên bạn chỉ định, nên hôm sau vẫn mở lại được.",
      "<code>--continue</code> mở phiên gần nhất trong thư mục hiện tại. Nhiều người hoặc nhiều job dùng chung thư mục thì dễ tiếp nhầm phiên của người khác. Agent SDK Python có tùy chọn tương ứng là <code>continue_conversation=True</code>.",
      "Chạy tự động thì lấy ID phiên từ trường <code>session_id</code> trong kết quả, lưu lại để lần sau resume.",
      "Fork tạo phiên mới bằng cách chép lịch sử của một phiên đã chọn rồi đi tiếp độc lập; nó không tự chọn phiên nào. Session picker của CLI là danh sách phiên để người chọn bằng tay."
    ],
    opts: [
      { k: "A", gist: "Pass <code>continue_conversation=True</code> on each follow-up request and let it reattach to the user's session.",
        why: [
          "Sai ở giả định: <code>continue_conversation</code> nối vào phiên gần nhất trong thư mục, không biết phiên nào của ai (ý 2).",
          "Nhiều người dùng chung thư mục thì phiên gần nhất rất có thể là của người vừa nhắn trước đó. Người dùng này nhận nhầm ngữ cảnh điều tra của người khác.",
          "Dễ bị cuốn vì “continue” nghe đúng ý “tiếp tục cuộc trò chuyện”. Nhưng nó chỉ an toàn khi thư mục đó có đúng một người dùng."
        ] },
      { k: "B", gist: "Call resume without an ID and have the service pick the user's conversation from the session picker.",
        why: [
          "Resume không kèm ID thì phải chọn phiên từ picker, tức danh sách để người chọn bằng tay (ý 4). Backend không có ai ngồi chọn.",
          "Danh sách cũng không cho biết phiên nào thuộc người dùng nào, nên service vẫn phải đoán."
        ] },
      { k: "C", gist: "Pass <code>fork_session=True</code> on each follow-up request to branch off the user's earlier conversation state.",
        why: [
          "Fork tách nhánh từ một phiên đã được chọn (ý 4). Nó không trả lời được câu “phiên nào là của người này”.",
          "Mỗi lần người dùng nhắn tiếp lại sinh thêm một phiên mới, lịch sử bị chia ra nhiều nhánh. Fork dùng khi muốn thử hai hướng từ cùng một gốc."
        ] },
      { k: "D", gist: "Store each user's session ID and pass it to resume when that user sends a follow-up request.",
        why: [
          "Service lưu <code>session_id</code> của từng người (ý 3). Người đó nhắn tiếp thì resume đúng ID ấy (ý 1).",
          "ID chỉ đúng một phiên, nên phiên của người khác trong cùng thư mục không bị đụng. Phiên nằm trên đĩa nên qua vài giờ vẫn mở lại được."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Ba cách nối lại công việc”: resume, fork, phiên mới", href: NOTES + "#l-1-7" },
      { label: "Bài 1.7, mục “Đã sửa 03/11”: session picker tự làm bằng listSessions(); fork chỉ tách nhánh phiên đã chọn", href: NOTES + "#fix-23" },
      { label: "Cheatsheet D1: dòng “Phiên”: --resume, fork_session, --continue (phiên gần nhất), lấy session_id", href: NOTES + "#cheat-d1" }
    ]
  },
  {
    de: 2, n: 14, total: 60, sub: "3.5", subName: "Tinh chỉnh lặp: ví dụ input/output, test trước, interview",
    first: "D", answer: "B",
    ask: "An architect is scoping a new internal search feature and gives Claude Code a one-line prompt: “I want to build a search feature for our support ticket system, interview me in detail using the AskUserQuestion tool.” What is the most effective way for the architect to use the resulting interview before implementation starts?",
    scene: [
      "Kiến trúc sư đang lên phạm vi cho tính năng tìm kiếm trong hệ thống ticket hỗ trợ.",
      "Prompt chỉ một dòng: muốn làm tính năng search, “interview me in detail using the AskUserQuestion tool” (phỏng vấn tôi thật kỹ bằng tool AskUserQuestion).",
      "Chỗ khó: cả bốn phương án đều nghe hợp lý. Chúng khác nhau ở ba chỗ: hỏi tới đâu thì dừng, có ghi spec ra file không, và build trong phiên nào."
    ],
    asks: [
      "Dùng kết quả buổi phỏng vấn thế nào cho hiệu quả nhất trước khi bắt đầu code?",
      "Tức là: đi từ buổi hỏi đáp tới phiên build sao cho phiên build có đủ quyết định và context sạch.",
      "Soi ba điều: các quyết định còn mở (xếp hạng, lọc, xử lý lỗi) đã chốt chưa? Có file spec tự đủ không? Build trong phiên mới hay phiên cũ?"
    ],
    facts: [
      "Interview pattern: bảo Claude hỏi bạn trước khi viết code, để lộ ra các quyết định bạn chưa nghĩ tới. Hợp với domain lạ, khi bạn không biết mình chưa biết gì.",
      "Docs Best practices: trả lời tiếp cho tới khi các quyết định còn mở (ví dụ cách xếp hạng, lọc, xử lý lỗi) đều có câu trả lời, rồi cho Claude ghi thành một file spec tự đủ, ví dụ <code>SPEC.md</code>.",
      "Sau đó build trong một phiên mới nạp file spec. Phiên build bắt đầu với context sạch và một định nghĩa “xong” bằng văn bản, không mang theo mớ hỏi đáp.",
      "File spec còn là thứ reviewer đối chiếu sau này."
    ],
    opts: [
      { k: "A", gist: "Cancel the interview, give Claude the existing ticket schema and sample tickets, have it draft the search spec by inferring ranking, filtering and failure behaviour from field names, types and relationships, then implement from that spec in a fresh session.",
        why: [
          "Sai ở giả định: xếp hạng, lọc, xử lý lỗi suy ra được từ tên trường và kiểu dữ liệu. Đó là quyết định sản phẩm, chỉ kiến trúc sư biết, và chính là thứ buổi phỏng vấn sinh ra để hỏi (ý 1).",
          "Hủy phỏng vấn thì spec dựng trên phỏng đoán. Bước “phiên mới” thì đúng (ý 3), nhưng đầu vào của nó đã sai."
        ] },
      { k: "B", gist: "Keep answering Claude's questions until ranking, filtering and failure handling are settled, then have Claude write a complete, self-contained spec file naming the files and interfaces involved, and start implementing in a fresh session that loads that spec.",
        why: [
          "Hỏi tiếp tới khi ba quyết định còn mở đã chốt, rồi ghi thành một spec tự đủ, nêu rõ file và interface liên quan (ý 2).",
          "Build trong phiên mới nạp spec đó: context sạch, có định nghĩa “xong” bằng văn bản (ý 3). Spec còn là chỗ để review đối chiếu (ý 4)."
        ] },
      { k: "C", gist: "Answer the first few questions on core requirements, then have Claude start implementing in the same session and settle ranking, filtering and schema details as it builds, asking follow-up questions when a decision comes up and noting each choice in code comments.",
        why: [
          "Dừng hỏi sớm, dời các quyết định quan trọng vào giữa lúc code, trong khi docs đòi chốt trước (ý 2). Quyết định đến muộn thì phần đã viết dễ phải làm lại.",
          "Một phiên vừa chứa hỏi đáp vừa chứa code, và không có spec để đối chiếu (ý 3, ý 4). Ghi chú rải trong comment không thay được spec."
        ] },
      { k: "D", gist: "Answer Claude's questions in detail until ranking, filtering and failure handling are settled, then have Claude implement in that same session, using the interview transcript as the record of requirements instead of a separate spec file.",
        why: [
          "Hỏi đủ rồi, nhưng bỏ hai bước cuối: không ghi spec ra file, không mở phiên mới (ý 2, ý 3).",
          "Transcript hỏi đáp lẫn cả phương án đã bỏ và những lần đổi ý. Phiên build phải mang hết mớ đó trong context, và không có gì gọn để review đối chiếu (ý 4).",
          "Dễ bị cuốn vì D đã chốt đủ quyết định, chỉ bớt bước viết spec và mở phiên mới, nghe như tiết kiệm. Nhưng hai bước đó mới biến buổi hỏi đáp thành đầu vào sạch cho phiên build."
        ] }
    ],
    refs: [
      { label: "Bài 3.5, mục “Biết thêm” (đã sửa 02/11): interview xong thì viết SPEC.md, build trong phiên mới", href: NOTES + "#fix-21" },
      { label: "Bài 3.5, khái niệm “Interview pattern”: để Claude hỏi trước, lộ ra quyết định chưa nghĩ tới", href: NOTES + "#l-3-5" },
      { label: "Docs Best practices, mục Brainstorm with Claude first", href: "https://code.claude.com/docs/en/best-practices" }
    ]
  },
  {
    de: 2, n: 15, total: 60, sub: "5.2", subName: "Escalate và xử lý chỗ mơ hồ",
    first: "C", answer: "C",
    ask: "An airline support agent searches by passenger name and flight route to check a baggage claim. The lookup tool returns three passenger records with that same name on that route, each with its own booking reference. What should the agent do?",
    scene: [
      "Agent hỗ trợ của hãng bay tìm theo tên hành khách và chặng bay để xét một khiếu nại hành lý.",
      "Tool tra cứu trả về ba hồ sơ hành khách cùng tên trên cùng chặng, mỗi hồ sơ một mã đặt chỗ (booking reference) riêng.",
      "Chỗ khó: các phương án sai đưa ra cách “xử lý cho xong” mà không phải hỏi lại khách: chọn hồ sơ đầy đủ nhất, gộp cả ba, chọn chuyến gần nhất."
    ],
    asks: [
      "Agent nên làm gì?",
      "Tức là: trước khi xét khiếu nại, agent phải biết chắc người đang hỏi ứng với hồ sơ nào.",
      "Soi từng phương án: nó gắn người hỏi với một hồ sơ bằng thông tin người đó đưa ra, bằng đoán, hay né luôn chuyện chọn?"
    ],
    facts: [
      "Nhiều kết quả khớp nghĩa là agent chưa biết đang nói chuyện với ai. Mọi thao tác sau đó đều có thể rơi vào nhầm người.",
      "Guide 5.2: nhiều kết quả khớp thì hỏi thêm định danh, không chọn theo heuristic (đoán theo dấu hiệu). Đoán sai là đụng tới dữ liệu cá nhân của người khác.",
      "Định danh thêm là thứ như số điện thoại, mã đơn (ở đây là số vé). Một câu hỏi thêm là đủ để tra ra đúng một hồ sơ."
    ],
    opts: [
      { k: "A", gist: "Open the record with the most complete profile, such as saved contact details, and continue the claim review.",
        why: [
          "Sai ở giả định: hồ sơ đầy đủ hơn thì là của người đang hỏi. Đó là heuristic (ý 2).",
          "Đoán sai thì xét khiếu nại hành lý trên vé của người khác, bằng dữ liệu cá nhân của họ (ý 1)."
        ] },
      { k: "B", gist: "Merge the baggage details from the three records into one summary, then continue the claim review.",
        why: [
          "Không đoán, nhưng còn tệ hơn: trộn hành lý của ba người khác nhau vào một hồ sơ khiếu nại (ý 1).",
          "Kết quả sai cho cả ba, lại lộ dữ liệu của hai hành khách không liên quan (ý 2).",
          "Dễ bị cuốn vì nghe như “không bỏ sót gì”, giữ đủ cả ba hồ sơ. Nhưng gộp dữ liệu của ba người khác nhau thì chẳng hồ sơ nào còn đúng."
        ] },
      { k: "C", gist: "Ask the customer for one more identifier, such as a ticket number or phone number, then continue the claim review.",
        why: [
          "Hỏi thêm một định danh, đúng như guide (ý 2). Số vé hay số điện thoại gắn người hỏi với đúng một hồ sơ (ý 3).",
          "Có đúng hồ sơ rồi mới xét khiếu nại, nên không xét nhầm vé, không đụng dữ liệu người khác."
        ] },
      { k: "D", gist: "Open the record with the most recent departure date on that route and continue the claim review.",
        why: [
          "Cũng là heuristic (ý 2). Chuyến bay gần nhất không cho biết ai đang hỏi.",
          "Khiếu nại hành lý có thể là về một chuyến trước đó. Chọn theo chuyến gần nhất là có thể sai cả người lẫn chuyến."
        ] }
    ],
    refs: [
      { label: "Bài 5.2, “Khi đi thi” dạng 3: nhiều khách cùng tên → hỏi thêm định danh, không chọn theo heuristic", href: NOTES + "#l-5-2" },
      { label: "Bài 5.2, mục “Ba tình huống hay bị nhầm khi escalate”, đoạn cuối: ba khách cùng tên → hỏi thêm định danh", href: NOTES + "#fix-9" },
      { label: "Cheatsheet D5: dòng “get_customer trả nhiều khách khớp” → hỏi thêm định danh", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 2, n: 16, total: 60, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema",
    first: "C", answer: "C",
    ask: "A pipeline needs Claude to run <code>extract_metadata</code> on an uploaded document before any enrichment or summarization step. Other tools such as <code>translate_text</code> and <code>summarize_document</code> are registered on the same request, and the team worries Claude might call one of those first. Which <code>tool_choice</code> setting guarantees that <code>extract_metadata</code> runs on this turn?",
    scene: [
      "Pipeline cần Claude chạy <code>extract_metadata</code> trên tài liệu tải lên, trước mọi bước làm giàu dữ liệu (enrichment) hay tóm tắt.",
      "Cùng request còn khai các tool khác như <code>translate_text</code>, <code>summarize_document</code>.",
      "Chỗ khó: team lo Claude gọi một trong các tool kia trước. Đề đòi “guarantees” (bảo đảm), không phải “thường thì đúng”."
    ],
    asks: [
      "Đặt <code>tool_choice</code> thế nào để bảo đảm <code>extract_metadata</code> chạy ở lượt này?",
      "Tức là: cần cấu hình vừa bắt buộc gọi tool, vừa chỉ định đúng tool nào.",
      "Soi hai điều với mỗi giá trị: có bắt buộc gọi tool không? Có ép đúng <code>extract_metadata</code> không?"
    ],
    facts: [
      "<code>{\"type\": \"auto\"}</code> là mặc định: Claude tự quyết có gọi tool không và gọi tool nào, có thể chỉ trả chữ.",
      "<code>{\"type\": \"any\"}</code>: bắt buộc gọi một tool nào đó, nhưng Claude tự chọn tool.",
      "<code>{\"type\": \"tool\", \"name\": \"…\"}</code>: bắt buộc gọi đúng tool có tên đó. Dùng khi một bước phải chạy trước (<code>extract_metadata</code> rồi mới enrichment), các bước sau xử lý ở lượt tiếp.",
      "<code>{\"type\": \"none\"}</code>: cấm gọi tool nào."
    ],
    opts: [
      { k: "A", gist: "<code>tool_choice: {\"type\": \"any\"}</code>",
        why: [
          "<code>any</code> bắt Claude gọi một tool, nhưng Claude vẫn tự chọn tool nào (ý 2).",
          "Nó có thể gọi <code>translate_text</code> hay <code>summarize_document</code>, đúng điều team lo.",
          "Dễ bị cuốn vì <code>any</code> nghe như “bắt buộc dùng tool” nên tưởng là đủ. Nhưng nó chỉ ép gọi một tool bất kỳ, không chỉ định tool nào."
        ] },
      { k: "B", gist: "<code>tool_choice: {\"type\": \"auto\"}</code>",
        why: [
          "<code>auto</code> để Claude tự quyết cả chuyện có gọi tool không lẫn gọi tool nào (ý 1).",
          "Claude có thể chỉ trả chữ, hoặc gọi tool khác trước. Không bảo đảm gì cả."
        ] },
      { k: "C", gist: "<code>tool_choice: {\"type\": \"tool\", \"name\": \"extract_metadata\"}</code>",
        why: [
          "Đây là ép đúng một tool (forced): Claude bắt buộc gọi <code>extract_metadata</code> ở lượt này (ý 3).",
          "Guide dùng chính ca này: ép <code>extract_metadata</code> chạy trước, các bước enrichment để lượt sau."
        ] },
      { k: "D", gist: "<code>tool_choice: {\"type\": \"none\"}</code>",
        why: [
          "<code>none</code> cấm gọi tool nào ở lượt này (ý 4).",
          "<code>extract_metadata</code> cũng không chạy được, ngược hẳn yêu cầu."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, mục “Ép model gọi tool bằng tool_choice”: auto, any và ép đúng một tool", href: NOTES + "#l-4-3" },
      { label: "Bài 2.3: bảng tool_choice, dòng extract_metadata chạy trước enrichment", href: NOTES + "#l-2-3" }
    ]
  },
  {
    de: 2, n: 17, total: 60, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema",
    first: "B", answer: "B",
    ask: "A ticket-classification schema defines a <code>category</code> field as an enum of five known values: billing, technical, shipping, account and refund. After launch, about 8% of real tickets don't fit any of them cleanly, and the model is seen forcing those tickets into the nearest, often wrong, enum value. Which schema change fixes this best?",
    scene: [
      "Schema phân loại ticket có trường <code>category</code> là enum năm giá trị: billing, technical, shipping, account, refund.",
      "Chạy thật thì khoảng 8% ticket không khớp gọn loại nào.",
      "Chỗ khó: model không bỏ trống mà ép các ticket đó vào giá trị gần nhất, thường là sai. Dữ liệu sai nhưng vẫn đúng schema."
    ],
    asks: [
      "Đổi schema thế nào là tốt nhất?",
      "Tức là: cho 8% ticket lạc loại một chỗ đi hợp lệ, mà vẫn giữ <code>category</code> chặt cho 92% ticket còn lại.",
      "Soi từng phương án: còn giữ được enum không? Ticket lạc loại có nhãn rõ và có mô tả không?"
    ],
    facts: [
      "Enum là danh sách giá trị được phép; Claude chỉ được chọn trong đó. Trường bắt buộc mà không có giá trị đúng thì model sẽ bịa cho đủ, ở đây là chọn giá trị gần nhất.",
      "Guide 4.3: category thêm <code>\"other\"</code> đi kèm một trường <code>detail</code> dạng chuỗi để mở rộng, và <code>\"unclear\"</code> cho ca mơ hồ.",
      "Guide để optional / nullable những trường mà tài liệu có thể không có thông tin.",
      "Lời dặn trong prompt hay description là xác suất: model thường làm theo, nhưng có lúc không."
    ],
    opts: [
      { k: "A", gist: "Turn <code>category</code> from an enum into a free-text string and list the five known categories in its description as preferred values.",
        why: [
          "Bỏ enum thì mất ràng buộc cho cả 92% ticket bình thường (ý 1). Năm loại liệt kê trong description chỉ còn là lời dặn (ý 4).",
          "Model có thể viết “Billing”, “billing issue”, “payment” cho cùng một loại. Code phía sau không đếm hay chuyển ticket theo category được nữa."
        ] },
      { k: "B", gist: "Add an <code>\"other\"</code> value to the category enum and a separate free-text detail field where the model describes the ticket in its own words.",
        why: [
          "Thêm <code>\"other\"</code> kèm một trường detail dạng chuỗi, đúng mẫu guide (ý 2).",
          "Ticket lạc loại có chỗ đi hợp lệ nên không còn bị ép vào năm loại thật. Trường detail ghi lại ticket đó nói về gì, còn <code>category</code> vẫn là enum chặt."
        ] },
      { k: "C", gist: "Grow the enum from five to twelve narrower values, picked to cover the edge-case tickets seen in the first weeks after launch.",
        why: [
          "Vẫn là danh sách đóng, chỉ dài hơn. Ticket kiểu mới xuất hiện sau mấy tuần đầu vẫn bị ép vào giá trị gần nhất (ý 1).",
          "Mười hai loại hẹp còn dễ chồng lấn, model càng hay chọn nhầm.",
          "Dễ bị cuốn vì thêm loại nghe như hiểu dữ liệu kỹ hơn. Nhưng nó chỉ đuổi theo các ca đã thấy, mà danh sách đóng nào rồi cũng gặp ca nằm ngoài."
        ] },
      { k: "D", gist: "Take <code>category</code> out of the schema's required list and tell the model in the description to leave it out when no enum value fits.",
        why: [
          "Sai ở giả định: optional dành cho thông tin có thể vắng (ý 3). Ở đây ticket nào cũng có nội dung, chỉ thiếu chỗ để xếp.",
          "Bỏ trống thì ticket lạc loại không có nhãn, không ai biết nó nói về gì. Còn “bỏ trống khi không hợp” chỉ là lời dặn trong description, không chắc được làm theo (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, mục “Thiết kế schema để model không bịa”: other kèm detail, unclear, nullable", href: NOTES + "#l-4-3" },
      { label: "Bài Nền tảng D4, bảng từ khóa schema: enum thêm other kèm trường mô tả", href: NOTES + "#l-4-0" }
    ]
  },
  {
    de: 2, n: 18, total: 60, sub: "5.4", subName: "Quản lý context khi khám phá codebase lớn",
    first: "B", answer: "B",
    ask: "A main agent coordinates exploration of a repository with more than 50,000 files and needs a complete list of every test file before planning a coverage audit. Running the search itself would flood the main conversation with thousands of matching paths it won't need again. What best keeps the main agent's context on high-level coordination while still producing the list?",
    scene: [
      "Agent chính điều phối việc khám phá một repo hơn 50.000 file.",
      "Nó cần danh sách đầy đủ mọi file test để lên kế hoạch audit coverage (kiểm độ phủ của test).",
      "Chỗ khó: tự chạy lệnh tìm thì hàng nghìn path đổ vào hội thoại chính, mà agent chính sẽ không cần đọc lại phần lớn chỗ đó."
    ],
    asks: [
      "Cách nào giữ context của agent chính cho việc điều phối mà vẫn có danh sách?",
      "Tức là: cần cả hai, danh sách đủ (không thiếu path) và context chính không bị ngập.",
      "Soi từng phương án: output tìm kiếm có đi vào context chính không? Danh sách cuối có đủ không?"
    ],
    facts: [
      "Subagent delegation: giao một việc khám phá cho subagent. Output dài ở lại trong context của subagent, phiên chính chỉ nhận kết quả đã gom gọn.",
      "Guide 5.4: agent chính giữ điều phối cấp cao, subagent đi làm những việc như “tìm mọi test file” rồi trả về bản gọn.",
      "<code>/compact</code> nén lịch sử phiên thành bản tóm tắt. Compact sau khi ngập là chữa sau: bản tóm tắt có thể rụng path.",
      "Delegate đáng giá khi output dài, việc tự chứa, hoặc cần giới hạn tool."
    ],
    opts: [
      { k: "A", gist: "Run the search in the main agent with output capped at the first 200 matches, and treat that capped set as the test-file inventory.",
        why: [
          "Đề cần danh sách đầy đủ. Cắt ở 200 kết quả đầu thì thiếu.",
          "Kế hoạch audit coverage dựng trên một danh sách hụt: file test nằm ngoài 200 kết quả đầu bị coi như không có."
        ] },
      { k: "B", gist: "Run the search in a subagent that scans the repository and returns only the matching test-file paths as one consolidated list.",
        why: [
          "Subagent chạy tìm kiếm trong context riêng, nên mớ output không vào phiên chính (ý 1).",
          "Agent chính chỉ nhận một danh sách path đã gom và giữ chỗ cho việc điều phối (ý 2). Đây đúng ca nên delegate: output dài, việc tự chứa (ý 4)."
        ] },
      { k: "C", gist: "Run the search in the main agent one top-level directory at a time, noting each batch of matches before starting the next.",
        why: [
          "Chia theo từng thư mục chỉ chia nhỏ lượt, không làm tổng output nhỏ đi.",
          "Mọi path vẫn đổ vào context chính, chỉ chậm hơn. Đúng thứ đề muốn tránh."
        ] },
      { k: "D", gist: "Run the search in the main agent, then compact the conversation once the paths are back and keep a summary of the test files.",
        why: [
          "Context ngập rồi mới compact là chữa sau (ý 3).",
          "Bản tóm tắt có thể rụng path, trong khi đề cần danh sách đủ.",
          "Dễ bị cuốn vì <code>/compact</code> là công cụ giữ context có thật. Nhưng compact sau khi ngập không bằng giao việc đi từ đầu (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 5.4, mục “Biết thêm”: compact sau khi ngập không bằng delegate từ đầu (đúng ca 50.000 file)", href: NOTES + "#l-5-4" },
      { label: "Bài 3.4: Explore subagent đọc trong context riêng, chỉ trả tóm tắt về phiên chính", href: NOTES + "#l-3-4" }
    ]
  },
  {
    de: 2, n: 19, total: 60, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool",
    first: "C", answer: "C",
    ask: "A subagent that enriches customer records calls an internal <code>lookup_address</code> tool for 50 customers. 47 lookups succeed. For 3, the tool returns <code>isError: true</code> with <code>errorCategory: \"permission\"</code>, because the subagent's credentials don't cover those records' region, and the subagent cannot get broader credentials itself. What should it send back to the coordinator?",
    scene: [
      "Subagent làm giàu hồ sơ khách gọi tool nội bộ <code>lookup_address</code> cho 50 khách.",
      "47 lần thành công. 3 lần tool trả <code>isError: true</code> với <code>errorCategory: \"permission\"</code>, vì credential (thông tin xác thực) của subagent không phủ vùng của mấy hồ sơ đó.",
      "Chỗ khó: subagent không tự xin được credential rộng hơn. Lỗi này nó không tự sửa được."
    ],
    asks: [
      "Subagent nên gửi gì về coordinator?",
      "Tức là: báo phần làm được và phần hỏng thế nào để coordinator đủ dữ kiện quyết bước tiếp.",
      "Soi từng phương án: 47 kết quả tốt có tới tay coordinator không? 3 ca hỏng có được báo rõ không?"
    ],
    facts: [
      "Guide chia lỗi tool thành bốn <code>errorCategory</code>: transient (tạm thời, như timeout), validation (input sai), business (vi phạm luật nghiệp vụ), permission (không có quyền). Lỗi permission thì escalate.",
      "<code>isRetryable</code> trả lời câu: gửi lại y hệt request có thành công không. Permission là <code>false</code>. Retry có backoff chỉ dành cho transient.",
      "Subagent tự xử lý lỗi transient tại chỗ. Lỗi không tự giải quyết được thì đẩy lên coordinator, kèm partial results (phần đã làm được) và những gì đã thử.",
      "Lô 50 món, 47 xong, 3 bị chặn quyền: đừng đánh dấu cả lô là lỗi, cũng đừng lặng lẽ bỏ qua 3 món."
    ],
    opts: [
      { k: "A", gist: "Return the batch after retrying the 3 failed lookups with exponential backoff and the same credentials until the permission error clears.",
        why: [
          "Sai ở giả định: lỗi permission sẽ tự hết. Retry có backoff dành cho transient; permission có <code>isRetryable</code> là <code>false</code> (ý 2).",
          "Cùng credential thì gọi bao nhiêu lần vẫn bị từ chối. Vòng retry không bao giờ xong, và 47 kết quả tốt cũng bị giữ lại theo."
        ] },
      { k: "B", gist: "Return the 47 enriched records as the batch result and leave out the 3 customers whose lookups failed with the permission error.",
        why: [
          "Nuốt lỗi lặng lẽ (ý 4): coordinator tưởng lô đã xong trọn.",
          "Không ai biết 3 khách bị thiếu, nên không ai xử lý tiếp."
        ] },
      { k: "C", gist: "Return the 47 enriched records as partial results, with a report listing the 3 unresolved customers, the permission error and the lookups attempted.",
        why: [
          "Subagent không tự sửa được lỗi quyền, nên đẩy lên coordinator kèm partial results và những gì đã thử (ý 3).",
          "Coordinator có 47 bản ghi để đi tiếp, và biết đúng 3 khách nào hỏng, hỏng vì quyền. Nó đủ dữ kiện để quyết: xin quyền, giao cho agent khác, hay đi tiếp với 47 bản ghi."
        ] },
      { k: "D", gist: "Return <code>isError: true</code> with the permission category for the whole batch, and hold back the 47 records until the 3 lookups are fixed.",
        why: [
          "Ba lỗi kéo đổ cả lô (ý 4): 47 bản ghi đã xong bị giữ lại, coordinator không dùng được gì.",
          "Báo lỗi cả lô còn che mất chuyện chỉ có 3 khách hỏng.",
          "Dễ bị cuốn vì D báo lỗi có cấu trúc, đúng category, trông chuẩn. Nhưng nó gắn lỗi cho cả lô. Báo lỗi đúng là báo đúng phần hỏng."
        ] }
    ],
    refs: [
      { label: "Bài 2.2, “Khi đi thi”: mẹo “47 succeed, 3 fail” → partial results + lỗi có cấu trúc", href: NOTES + "#l-2-2" },
      { label: "Cheatsheet D2: subagent tự xử lý lỗi transient, lỗi không tự giải quyết được thì đẩy lên kèm partial results", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 2, n: 20, total: 60, sub: "4.4", subName: "Validate, retry kèm lỗi và vòng phản hồi",
    first: "B", answer: "B",
    ask: "An employment-contract extractor returns a <code>salary</code> field that matches its declared numeric type and required-field rules, but the value is in the wrong currency: the model misread an ambiguous currency symbol on a multi-currency contract. Schema validation passes without complaint. How should this be characterized?",
    scene: [
      "Bộ trích xuất hợp đồng lao động trả trường <code>salary</code> đúng kiểu số và đủ các trường bắt buộc.",
      "Nhưng giá trị sai loại tiền: hợp đồng có nhiều loại tiền, ký hiệu tiền tệ mơ hồ, và model đọc nhầm.",
      "Chỗ khó: schema validation pass, không báo gì. Nhìn hình dạng thì JSON hoàn toàn ổn."
    ],
    asks: [
      "Nên xếp lỗi này vào loại nào, và sửa ra sao?",
      "Tức là: gọi đúng tên loại lỗi, rồi chọn chỗ bắt lỗi hợp với loại đó.",
      "Soi từng phương án: chẩn đoán có khớp dữ kiện đề cho không (schema pass, con số đầy đủ, model có trả lời)?"
    ],
    facts: [
      "Lỗi cú pháp: JSON hỏng hình thức, sai kiểu, thiếu trường. Tool + schema chặn loại này; bật <code>strict: true</code> thì chắc chắn đúng kiểu và đủ trường.",
      "Lỗi ngữ nghĩa: JSON parse được, đúng schema, nhưng nội dung sai. Schema chỉ biết hình dạng, không biết đúng sai, nên không chặn được.",
      "Lỗi ngữ nghĩa phải bắt bằng validator: code của bạn chạy ngay sau khi nhận JSON, đối chiếu các giá trị với nhau. Sai thì gọi lại Claude kèm câu lỗi cụ thể.",
      "<code>stop_reason</code> là <code>max_tokens</code> khi output bị cắt giữa chừng vì chạm giới hạn. <code>refusal</code> là khi Claude từ chối vì lý do an toàn."
    ],
    opts: [
      { k: "A", gist: "As a schema violation that strict tool use failed to block, fixed by tightening the schema to restrict the currency field.",
        why: [
          "Sai ở chẩn đoán: không có vi phạm schema nào, số đúng kiểu, trường đủ. <code>strict</code> chỉ bảo đảm hình dạng, và nó đã làm đúng việc đó (ý 1).",
          "Siết currency thành enum thì model vẫn có thể chọn nhầm một giá trị hợp lệ. Đó vẫn là lỗi ngữ nghĩa (ý 2).",
          "Dễ bị cuốn vì “siết schema” là phản xạ khi thấy dữ liệu sai. Nhưng schema đã pass; chặt đến đâu nó cũng không biết con số đó là đô hay yên."
        ] },
      { k: "B", gist: "As a semantic error that schema checks cannot catch, fixed with a rule that cross-checks the currency against the amount.",
        why: [
          "Đúng tên: lỗi ngữ nghĩa, JSON đúng schema nhưng nội dung sai (ý 2).",
          "Bắt bằng validator của mình, chạy sau khi nhận JSON (ý 3). Ở đây là luật đối chiếu loại tiền với con số; lệch thì gọi lại kèm câu lỗi cụ thể."
        ] },
      { k: "C", gist: "As a truncation problem caused by the output limit, fixed by raising <code>max_tokens</code> so the full salary value is generated.",
        why: [
          "Sai ở chẩn đoán: bị cắt vì <code>max_tokens</code> thì output dở dang (ý 4).",
          "Ở đây con số đầy đủ, chỉ sai loại tiền. Tăng <code>max_tokens</code> không đổi được việc model đọc nhầm ký hiệu."
        ] },
      { k: "D", gist: "As a model refusal on the ambiguous symbol, fixed by retrying with a prompt that tells the model to commit to an answer.",
        why: [
          "Sai ở chẩn đoán: refusal là Claude từ chối (ý 4). Ở đây model đã trả lời, chỉ trả lời sai.",
          "Ép model “chốt một đáp án” còn làm tệ hơn: ca mơ hồ càng dễ bị đoán bừa, mà vẫn không có gì kiểm lại."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D4, mục 5–6: lỗi ngữ nghĩa qua được schema, phải bắt bằng validator", href: NOTES + "#l-4-0" },
      { label: "Bài 4.4: validator bắt lỗi ngữ nghĩa, gọi lại kèm lỗi", href: NOTES + "#l-4-4" }
    ]
  },
  {
    de: 2, n: 21, total: 60, sub: "3.6", subName: "Đưa Claude Code vào CI/CD",
    first: "A", answer: "A",
    ask: "A CI job asks Claude Code to write new unit tests for a modified module. The generated suite keeps proposing tests that repeat scenarios the module's existing test file already covers. What should the pipeline change to cut this redundant output?",
    scene: [
      "Một job CI gọi Claude Code viết unit test mới cho một module vừa bị sửa.",
      "Chỗ khó: bộ test sinh ra cứ lặp lại các scenario (kịch bản test) mà file test hiện có của module đã cover rồi.",
      "Bốn phương án đều là một thay đổi trong pipeline: thêm context, đổi cờ chạy, hoặc lọc output sau khi sinh."
    ],
    asks: [
      "Pipeline nên đổi gì để bớt test trùng?",
      "Tức là: trị đúng nguyên nhân khiến Claude đề xuất lại scenario đã có, chứ không phải dọn phần trùng sau khi đã sinh.",
      "Soi từng phương án bằng một câu hỏi: nó có cho Claude biết test nào đã tồn tại không?"
    ],
    facts: [
      "Mỗi lần chạy <code>claude -p</code> trong CI là một context trống. Claude chỉ biết những gì có trong repo và những gì pipeline đưa vào prompt.",
      "Guide 3.6: sinh test thì đưa file test hiện có vào context, để Claude không đề xuất lại scenario đã được cover. Cùng kiểu với chống comment trùng: đưa finding lần trước vào context.",
      "<code>--output-format stream-json</code> chỉ đổi cách in output: stream từng sự kiện. Nó không cho Claude thêm thông tin nào.",
      "<code>--max-budget-usd</code> là trần chi phí của lần chạy, chạm mức thì dừng. <code>--no-session-persistence</code> là không lưu phiên ra đĩa. Cả hai không đổi những gì Claude nhìn thấy."
    ],
    opts: [
      { k: "A", gist: "Put the module's current test files into the prompt alongside the modified source, so Claude can see which scenarios already exist before writing new tests.",
        why: [
          "Test trùng vì Claude chưa từng thấy file test hiện có: mỗi lần chạy là context trống (ý 1).",
          "Đưa file test hiện có vào prompt cùng code vừa sửa, Claude thấy scenario nào đã có và chỉ viết phần còn thiếu. Đúng cách guide 3.6 chỉ (ý 2).",
          "Sửa ngay từ lúc sinh, không phải dọn sau."
        ] },
      { k: "B", gist: "Raise <code>--max-budget-usd</code> for the job, so Claude has room to draft a broader suite and trim overlapping cases itself before the run ends.",
        why: [
          "Sai ở giả định: cho thêm ngân sách thì Claude tự cắt phần trùng. Cờ này chỉ là trần chi phí, chạm mức thì dừng lần chạy (ý 4).",
          "Thêm tiền không thêm thông tin. Không thấy file test cũ (ý 1) thì Claude vẫn không biết cái nào trùng để cắt."
        ] },
      { k: "C", gist: "Switch the job to <code>--output-format stream-json</code>, so a script can compare each generated test event with the module's test file and drop the overlapping ones.",
        why: [
          "Chạy được, nhưng dọn hậu quả chứ không sửa nguyên nhân: Claude vẫn sinh test trùng, script chỉ vứt bớt sau đó (ý 3).",
          "So “cùng scenario” bằng script cũng khó: hai test trùng ý có thể khác tên, khác cách viết, nên script dễ sót.",
          "Dễ bị cuốn vì lọc bằng code nghe chắc chắn kiểu “code thì không sai”. Nhưng gốc lỗi là Claude thiếu thông tin, chỉ cần cho nó thấy test cũ là hết trùng từ gốc (ý 2)."
        ] },
      { k: "D", gist: "Run the job with <code>--no-session-persistence</code>, so no earlier CI run state carries over and each generation starts from a clean context instead of reusing stale test patterns.",
        why: [
          "Sai ở giả định: test trùng vì mang state cũ từ lần chạy trước. Mỗi lần chạy <code>-p</code> vốn đã là context trống nếu không <code>--resume</code> hay <code>--continue</code> (ý 1).",
          "Cờ này chỉ không lưu phiên ra đĩa (ý 4). Bật lên thì Claude vẫn không thấy file test hiện có, nên vẫn trùng như cũ."
        ] }
    ],
    refs: [
      { label: "Bài 3.6: sinh test thì đưa file test hiện có vào context; mẹo “suggests tests already covered”", href: NOTES + "#l-3-6" },
      { label: "Cheatsheet D3: dòng “Comment trùng sau commit mới / test trùng” → đưa test hiện có vào context", href: NOTES + "#cheat-d3" }
    ]
  },
  {
    de: 2, n: 22, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code",
    first: "B", answer: "B",
    ask: "A contributor clones a team repository that contains a checked-in <code>.mcp.json</code> defining a <code>deploy-tools</code> server. They open the project in Claude Code for the first time and run <code>claude mcp list</code>. What should they expect to see for <code>deploy-tools</code> before taking any further action?",
    scene: [
      "Một người đóng góp clone repo của team. Repo có sẵn file <code>.mcp.json</code> đã commit, khai một MCP server tên <code>deploy-tools</code>.",
      "Họ mở project trong Claude Code lần đầu rồi chạy <code>claude mcp list</code>, chưa làm gì thêm.",
      "Chỗ khó: server do chính team commit vào repo, nên dễ nghĩ nó được tin sẵn và kết nối luôn."
    ],
    asks: [
      "<code>claude mcp list</code> sẽ hiện <code>deploy-tools</code> thế nào?",
      "Tức là: server project lấy từ <code>.mcp.json</code> của một repo vừa clone, chưa ai duyệt, thì đang ở trạng thái gì."
    ],
    facts: [
      "Server trong <code>.mcp.json</code> chạy lệnh trên máy người mở project. Vì vậy Claude Code bắt từng người duyệt trước khi kết nối; lần đầu mở project ở phiên tương tác, nó hỏi có bật server không.",
      "Chưa duyệt thì <code>claude mcp list</code> vẫn liệt kê server, kèm trạng thái <code>⏸ Pending approval</code> (chờ duyệt), và chưa kết nối.",
      "Repo vừa clone không tự duyệt được server của chính nó: <code>enabledMcpjsonServers</code> commit trong <code>.claude/settings.json</code> của repo bị bỏ qua khi người dùng chưa tin cậy (trust) thư mục đó.",
      "Trùng tên server ở hai scope thì một bản thắng toàn bộ, hai bản không gộp."
    ],
    opts: [
      { k: "A", gist: "It is listed under a suffixed name such as <code>deploy-tools-2</code>, because Claude Code treats a server from a freshly cloned <code>.mcp.json</code> as clashing with an existing entry.",
        why: [
          "Sai ở giả định: có xung đột tên. Repo vừa clone, chỉ có một <code>deploy-tools</code>, không trùng với gì.",
          "Mà có trùng tên giữa các scope thì một bản thắng toàn bộ (ý 4), không có chuyện tự đổi tên thành <code>deploy-tools-2</code>."
        ] },
      { k: "B", gist: "It is listed as pending approval: Claude Code holds off connecting until the contributor reviews the project-scoped server and accepts it.",
        why: [
          "Server project chạy lệnh trên máy người clone, nên Claude Code chờ từng người duyệt rồi mới kết nối (ý 1).",
          "Chưa duyệt thì <code>claude mcp list</code> hiện <code>⏸ Pending approval</code> và chưa kết nối (ý 2). Mở <code>claude</code> ở phiên tương tác để xem rồi chấp nhận."
        ] },
      { k: "C", gist: "It is listed as connected, since Claude Code treats the server as already trusted because the repository owner committed it to the shared <code>.mcp.json</code>.",
        why: [
          "Sai ở giả định: commit vào repo là được tin. Repo vừa clone không tự duyệt được server của nó, kể cả khi commit sẵn <code>enabledMcpjsonServers</code> (ý 3).",
          "Thực tế server đang chờ duyệt, chưa kết nối (ý 2).",
          "Dễ bị cuốn vì <code>.mcp.json</code> sinh ra để chia sẻ cho cả team. Nhưng chia sẻ cấu hình khác với tin cấu hình: server chạy lệnh trên máy mày, nên mày phải tự duyệt (ý 1)."
        ] },
      { k: "D", gist: "It is missing from the output, because <code>claude mcp list</code> only covers user-scoped and local-scoped servers and leaves project-scoped <code>.mcp.json</code> entries out.",
        why: [
          "Sai ở giả định: <code>claude mcp list</code> bỏ qua server project. Server project chưa duyệt vẫn có trong danh sách, kèm trạng thái chờ duyệt (ý 2).",
          "Tin theo D thì người clone sẽ đi tìm một lỗi cấu hình không có thật, trong khi việc cần làm chỉ là duyệt server."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, mục “Biết thêm” (đã sửa 03/11): server .mcp.json phải được duyệt, mcp list hiện Pending approval", href: NOTES + "#fix-22" },
      { label: "Docs MCP, mục Project scope và Server status", href: "https://code.claude.com/docs/en/mcp" }
    ]
  },
  {
    de: 2, n: 23, total: 60, sub: "5.5", subName: "Review người và hiệu chuẩn confidence",
    first: "B", answer: "D",
    ask: "An insurance-claims extraction pipeline handles auto, home and health claims. The team has a labeled evaluation set covering all three types but has only computed one aggregate accuracy figure across the whole set. Before deciding whether to cut human review for health claims specifically, what is the most direct way to proceed?",
    scene: [
      "Pipeline trích dữ liệu hồ sơ bồi thường bảo hiểm, ba loại: xe (auto), nhà (home), sức khỏe (health).",
      "Team có bộ đánh giá đã gán nhãn, đủ cả ba loại, nhưng mới tính một con số accuracy gộp cho cả bộ.",
      "Chỗ khó: quyết định cần đưa ra là riêng cho health, có bớt review người hay không. Con số gộp không nói gì riêng về health."
    ],
    asks: [
      "Trước khi bớt review người cho riêng hồ sơ health, cách đi thẳng nhất là gì?",
      "Tức là: lấy con số nào để quyết cho đúng phân khúc health, và lấy từ đâu.",
      "Soi từng phương án hai điều: nó có đo riêng phân khúc health không? Nó đo accuracy thật (so với nhãn) hay đo thứ khác?"
    ],
    facts: [
      "Accuracy gộp (aggregate accuracy) có thể che một phân khúc làm kém: trung bình đẹp vẫn có thể gồm một loại tài liệu sai rất nhiều. Guide 5.5 đòi đo accuracy theo loại tài liệu và theo trường trước khi tự động hóa phần nào.",
      "Bộ có nhãn (labeled validation set) là tài liệu đã có đáp án đúng do người gán, dùng để đo accuracy thật.",
      "Confidence model tự báo chưa được hiệu chuẩn: model nói 0.9 không có nghĩa là đúng 90%. Hiệu chuẩn là đối chiếu điểm đó với đúng/sai thật trên bộ có nhãn."
    ],
    opts: [
      { k: "A", gist: "Add equal numbers of labeled auto, home and health examples to the evaluation set until the aggregate confidence interval is tight, then reduce review for health claims if its lower bound clears the required bar.",
        why: [
          "Sai ở chỗ vẫn đo con số gộp, chỉ làm nó chắc hơn. Khoảng tin cậy hẹp của cả bộ không nói gì riêng về health: auto và home tốt có thể kéo trung bình lên, che health yếu (ý 1).",
          "Còn tốn công gán nhãn thêm, trong khi bộ hiện có đã có ví dụ health để đo ngay."
        ] },
      { k: "B", gist: "Pull the model's own per-field confidence scores for the health-claims documents in the existing evaluation set, then reduce review for health claims if their average confidence clears the required accuracy bar.",
        why: [
          "Sai ở thước đo: lấy confidence model tự báo thay cho accuracy. Điểm đó chưa hiệu chuẩn (ý 3), đem so với ngưỡng accuracy là so hai thứ khác nhau.",
          "Nhãn đúng cho hồ sơ health đã nằm sẵn trong bộ đánh giá (ý 2). Đo được accuracy thật thì không cần đoán qua confidence.",
          "Dễ bị cuốn vì B đã tách riêng hồ sơ health, nghe như đúng bài “đo theo phân khúc”. Nhưng tách đúng phân khúc mà đo sai thước thì vẫn sai."
        ] },
      { k: "C", gist: "Confirm that the aggregate accuracy on the full labeled set clears the bar, then reduce review for health claims if the pipeline's single prompt and model treat the three claim types alike.",
        why: [
          "Sai ở giả định: cùng prompt, cùng model thì ba loại hồ sơ làm tốt như nhau. Hồ sơ health có thể khó hơn hẳn, ví dụ thuật ngữ y khoa, mã bệnh.",
          "Con số gộp qua ngưỡng vẫn có thể che một phân khúc yếu (ý 1). Bớt review health theo cách này là đúng kiểu sai mà guide 5.5 cảnh báo."
        ] },
      { k: "D", gist: "Filter the existing labeled set down to its health-claims examples, measure accuracy on that slice alone, and reduce review for health claims only if that slice clears the bar.",
        why: [
          "Lọc bộ có nhãn lấy riêng ví dụ health, đo accuracy trên phần đó (ý 2). Đây là đo theo loại tài liệu, đúng điều guide đòi (ý 1).",
          "Có ngay con số cho đúng phân khúc cần quyết, đo bằng nhãn thật chứ không bằng điểm tự báo (ý 3), và không phải gán nhãn thêm.",
          "Chỉ bớt review khi riêng phần health qua ngưỡng."
        ] }
    ],
    refs: [
      { label: "Bài 5.5: đo accuracy theo loại tài liệu × trường trước khi bớt review", href: NOTES + "#l-5-5" },
      { label: "Bài Nền tảng D5, mục 4 “Ai quyết định: escalate, review, và điểm tự tin” (hiệu chuẩn)", href: NOTES + "#l-5-0" }
    ]
  },
  {
    de: 2, n: 24, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới",
    first: "D", answer: "B",
    ask: "An architect is building a custom session picker for an internal tool. It must enumerate every session stored on disk for a repository and read one chosen session's full message history, without shelling out to the interactive CLI picker. Which SDK functions fit?",
    scene: [
      "Kiến trúc sư làm một session picker (màn chọn phiên) riêng cho một tool nội bộ.",
      "Nó cần làm hai việc: liệt kê mọi phiên lưu trên đĩa của một repo, và đọc toàn bộ lịch sử message của một phiên được chọn.",
      "Chỗ khó: không được gọi picker tương tác của CLI, phải dùng hàm của Agent SDK. Bốn phương án đều ghép từ các hàm có chữ “Session”, chỉ khác hàm nào làm việc nào."
    ],
    asks: [
      "Hàm SDK nào để liệt kê phiên, hàm nào để đọc lịch sử một phiên?",
      "Tức là: ghép đúng hàm với đúng việc. Việc 1 trả về danh sách phiên. Việc 2 nhận một session ID và trả về message của phiên đó."
    ],
    facts: [
      "<code>listSessions()</code> (Python: <code>list_sessions()</code>) liệt kê các phiên lưu trên đĩa.",
      "<code>getSessionMessages()</code> (Python: <code>get_session_messages()</code>) nhận một session ID, trả về message của phiên đó. Docs nói hai hàm này dùng để tự làm session picker, dọn dẹp, hay xem transcript (bản ghi hội thoại).",
      "<code>getSessionInfo()</code> chỉ cho thông tin tóm tắt của một phiên, không có lịch sử message.",
      "Fork là tách nhánh một phiên đã chọn thành phiên mới; trong SDK là tùy chọn <code>forkSession: true</code> đặt cùng <code>resume</code>. Fork không liệt kê hay đọc phiên nào."
    ],
    opts: [
      { k: "A", gist: "<code>forkSession()</code> for the session list, <code>listSessions()</code> for one session's transcript.",
        why: [
          "Sai cả hai vế. Fork tạo nhánh mới từ một phiên đã chọn, không liệt kê gì (ý 4).",
          "<code>listSessions()</code> trả về danh sách phiên, không đọc transcript của một phiên (ý 1). Hai việc bị gán ngược."
        ] },
      { k: "B", gist: "<code>listSessions()</code> for the session list, <code>getSessionMessages()</code> for one session's transcript.",
        why: [
          "<code>listSessions()</code> cho danh sách phiên trên đĩa, đúng việc 1 (ý 1).",
          "<code>getSessionMessages()</code> nhận ID của phiên được chọn và trả về message của phiên đó, đúng việc 2 (ý 2).",
          "Docs nêu đúng cặp này cho việc tự làm session picker, không cần gọi picker của CLI."
        ] },
      { k: "C", gist: "<code>getSessionInfo()</code> for the session list, <code>forkSession()</code> for one session's transcript.",
        why: [
          "<code>getSessionInfo()</code> xem thông tin tóm tắt của một phiên, không liệt kê được các phiên (ý 3).",
          "Fork tạo phiên mới chứ không đọc lịch sử để hiển thị (ý 4). Dùng nó trong picker thì mỗi lần xem lại sinh thêm một phiên không ai cần."
        ] },
      { k: "D", gist: "<code>getSessionMessages()</code> for the session list, <code>getSessionInfo()</code> for one session's transcript.",
        why: [
          "Hai hàm có thật nhưng bị đổi việc. <code>getSessionMessages()</code> cần sẵn một session ID và trả về message của đúng phiên đó (ý 2), nên không liệt kê được.",
          "<code>getSessionInfo()</code> chỉ trả thông tin tóm tắt (ý 3), không có lịch sử message, nên picker không hiện được transcript.",
          "Dễ bị cuốn vì cả hai hàm đều có chữ “Session”, nghe hợp với picker. Nhưng nhớ theo tên: <code>list</code> là liệt kê, <code>Messages</code> là nội dung, <code>Info</code> là thông tin tóm tắt."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Biết thêm” (đã sửa 03/11): hàm liệt kê và đọc phiên của Agent SDK", href: NOTES + "#fix-23" },
      { label: "Docs Agent SDK, mục Work with sessions", href: "https://code.claude.com/docs/en/agent-sdk/sessions" }
    ]
  },
  {
    de: 2, n: 25, total: 60, sub: "2.5", subName: "Chọn built-in tool đúng việc",
    first: "B", answer: "B",
    ask: "A newly onboarded architect asks Claude Code to trace how a login request travels from the HTTP route handler down to the database call, in a codebase Claude has not explored yet. What is the best incremental strategy to build that understanding efficiently while keeping context usage low?",
    scene: [
      "Kiến trúc sư mới vào nhờ Claude Code lần theo một request đăng nhập: từ route handler HTTP xuống tới lệnh gọi database.",
      "Claude chưa khám phá codebase này lần nào.",
      "Chỗ khó: đề đòi hai thứ cùng lúc: hiểu đúng luồng, và giữ context ít."
    ],
    asks: [
      "Chiến lược khám phá tăng dần nào tốt nhất?",
      "Tức là: mỗi bước chỉ nạp vào context những file nằm trên chuỗi gọi của luồng login.",
      "Soi từng phương án: nó chọn file để đọc dựa vào đâu? Dựa vào luồng login thật, hay dựa vào đoán (mới sửa, file to, đọc hết)?"
    ],
    facts: [
      "Guide 2.5 mô tả khám phá tăng dần: Grep tìm entry point (file nơi luồng bắt đầu, như route hay handler), Read đúng file đó, theo import để lần luồng, Grep tiếp khi cần.",
      "Repo có <code>CLAUDE.md</code> hay <code>AGENTS.md</code> thì đọc trước khi Grep: có khi đã có sẵn bản đồ thư mục nào làm gì, điểm vào ở đâu.",
      "Read hàng loạt không chỉ tốn token: 40 file đọc liền nhau làm model mất dấu câu hỏi ban đầu, câu trả lời bắt đầu chung chung.",
      "Glob tìm đường dẫn file theo mẫu tên. Nó không biết nội dung file nói về gì."
    ],
    opts: [
      { k: "A", gist: "Use Glob to list every file in the repository sorted by modification time, then read the twenty most recently modified files on the assumption that they relate to login.",
        why: [
          "Sai ở giả định: file mới sửa gần đây thì liên quan tới login. Glob chỉ biết tên và đường dẫn (ý 4), không biết file nào nằm trên luồng login.",
          "File vừa sửa có thể thuộc một tính năng khác. Đọc 20 file theo đoán vừa tốn context (ý 3) vừa dễ sót đúng file trong chuỗi gọi."
        ] },
      { k: "B", gist: "Start with <code>CLAUDE.md</code> or <code>AGENTS.md</code> if present for a high-level architecture view, then use Grep to locate the route handler and its imports, and read files incrementally along the call chain.",
        why: [
          "Đọc bản đồ có sẵn trước nếu repo có (ý 2), rồi Grep tìm route login làm điểm vào, Read lần theo import từng bước (ý 1).",
          "Chỉ những file nằm trên chuỗi gọi từ route xuống database mới vào context. Vừa hiểu đúng luồng, vừa giữ context nhỏ, đúng hai điều đề đòi."
        ] },
      { k: "C", gist: "Use Bash to run a full-text word count across the repository and read the files with the highest counts, assuming the larger files hold the core business logic.",
        why: [
          "Sai ở giả định: file to nhất chứa logic chính. Độ dài file không nói gì về luồng login.",
          "Đọc file to nhất là cách tốn context nhất (ý 3), mà vẫn chưa chắc trúng file nào trên chuỗi gọi."
        ] },
      { k: "D", gist: "Use Read to open every file under <code>src</code> up front to build a complete mental model of the codebase before looking for the login flow.",
        why: [
          "Đọc hết từ đầu là đúng điều guide bảo tránh: context đầy file không liên quan trước khi bắt đầu việc chính (ý 1, ý 3).",
          "Đề đòi giữ context ít, D làm ngược lại. Đọc nhiều file liền còn làm model mất dấu câu hỏi về login.",
          "Dễ bị cuốn vì “hiểu toàn bộ trước rồi mới tìm” nghe kỹ lưỡng. Nhưng với codebase lạ, guide 2.5 chọn khám phá tăng dần: cần đâu đọc đó."
        ] }
    ],
    refs: [
      { label: "Bài 2.5, mục “Khám phá tăng dần, không đọc hết” và “Biết thêm”: đọc CLAUDE.md / AGENTS.md trước khi Grep", href: NOTES + "#l-2-5" }
    ]
  },
  {
    de: 2, n: 26, total: 60, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool",
    first: "A", answer: "A",
    ask: "A <code>submit_refund</code> MCP tool rejects a request because the customer's order is past the 30-day return window. The engineer designing the error response wants the agent to explain the rejection to the customer in plain language and never retry this exact call. Which response body achieves that best?",
    scene: [
      "MCP tool <code>submit_refund</code> từ chối một yêu cầu hoàn tiền vì đơn đã quá hạn đổi trả 30 ngày.",
      "Kỹ sư thiết kế phản hồi lỗi muốn hai điều: agent giải thích lý do cho khách bằng lời thường, và “never retry this exact call” (không bao giờ gọi lại đúng lệnh này).",
      "Chỗ khó: ba phương án đều có <code>errorCategory</code>, chỉ khác loại lỗi và lời mô tả. Phải chọn loại khớp với lý do từ chối thật."
    ],
    asks: [
      "Body phản hồi lỗi nào đạt yêu cầu tốt nhất?",
      "Tức là: lỗi phải nói đúng lý do (luật 30 ngày) để agent giải thích cho khách, và báo rõ gọi lại là vô ích.",
      "Soi từng phương án: category có khớp lý do thật không? Mô tả có dẫn agent tới đúng bước tiếp theo không?"
    ],
    facts: [
      "Agent quyết bước tiếp theo bằng thông tin trong tool result. Lỗi chỉ ghi “failed” thì agent không biết lỗi tạm thời hay vĩnh viễn, nên đoán, và đoán sai cả hai chiều.",
      "Guide muốn lỗi có cấu trúc, tối thiểu ba thứ: <code>errorCategory</code>, <code>isRetryable</code>, và một câu mô tả dễ hiểu.",
      "Bốn errorCategory của guide: <code>transient</code> (timeout, quá tải; thử lại có thể được), <code>validation</code> (input sai; sửa input rồi gọi lại), <code>business</code> (vi phạm luật nghiệp vụ như vượt hạn mức, quá hạn đổi trả; không retry, giải thích cho khách), <code>permission</code> (agent không được phép thao tác; escalate)."
    ],
    opts: [
      { k: "A", gist: "A text block plus structured content with <code>errorCategory: \"business\"</code> and a description saying the order is past the 30-day return window and the call should not be repeated.",
        why: [
          "Quá hạn đổi trả 30 ngày là luật nghiệp vụ, đúng category <code>business</code> (ý 3). Gửi lại y hệt vẫn bị từ chối, nên không retry.",
          "Mô tả nêu đúng lý do để agent nói lại với khách bằng lời thường, và dặn không gọi lại (ý 2). Thỏa cả hai điều kỹ sư muốn."
        ] },
      { k: "B", gist: "A bare text block reading “Refund denied”, with no structured metadata.",
        why: [
          "Lỗi chung chung, đúng kiểu guide bảo tránh: không category, không lý do (ý 1, ý 2).",
          "Agent không biết vì sao bị từ chối, cũng không biết có nên thử lại. Nó không giải thích được cho khách, và có thể gọi lại vô ích."
        ] },
      { k: "C", gist: "A text block plus structured content with <code>errorCategory: \"transient\"</code> and a description saying the service is busy and the call should be resubmitted after 30 seconds.",
        why: [
          "Sai loại lỗi: <code>transient</code> dành cho timeout, quá tải, thử lại có thể được (ý 3). Đơn quá hạn thì thử lại bao nhiêu lần cũng bị từ chối.",
          "Mô tả còn bảo agent gọi lại sau 30 giây, trái thẳng với yêu cầu không gọi lại. Khách thì nghe một lý do sai: hệ thống đang bận."
        ] },
      { k: "D", gist: "A text block plus structured content with <code>errorCategory: \"permission\"</code> and a description saying the account lacks refund rights and an administrator should be contacted.",
        why: [
          "Sai lý do: đề không nói tài khoản thiếu quyền, cái chặn là luật 30 ngày (ý 3).",
          "Agent sẽ nói sai với khách là tài khoản không có quyền, và đẩy việc sang quản trị viên không cần thiết.",
          "Dễ bị cuốn vì <code>permission</code> cũng là loại không retry, nên nghe gần đúng. Nhưng category phải nói đúng lý do, vì agent dựa vào đó để giải thích với khách và chọn bước tiếp (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 2.2: bảng bốn errorCategory và ví dụ lỗi business kèm customerMessage", href: NOTES + "#l-2-2" },
      { label: "Cheatsheet D2: dòng “Lỗi này nên đặt isRetryable gì?”", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 2, n: 27, total: 60, sub: "2.5", subName: "Chọn built-in tool đúng việc",
    first: "D", answer: "D",
    ask: "Claude Code must rename an environment variable from <code>API_TIMEOUT_MS</code> to <code>REQUEST_TIMEOUT_MS</code> everywhere it is referenced in a codebase of several hundred files, and each occurrence sits in different surrounding code. Which approach best discovers the full scope of the change before applying it?",
    scene: [
      "Claude Code phải đổi tên biến môi trường <code>API_TIMEOUT_MS</code> thành <code>REQUEST_TIMEOUT_MS</code> ở mọi chỗ nó được dùng.",
      "Codebase có vài trăm file. Mỗi chỗ dùng biến nằm trong đoạn code xung quanh khác nhau, nên cần xem từng chỗ trước khi sửa.",
      "Chỗ khó: đề hỏi bước tìm phạm vi trước khi sửa, không hỏi cách sửa. Phải tìm đủ, không sót chỗ nào."
    ],
    asks: [
      "Cách nào tìm đủ phạm vi thay đổi trước khi sửa?",
      "Tức là: cần danh sách mọi chỗ chuỗi <code>API_TIMEOUT_MS</code> xuất hiện trong nội dung file ở hiện tại, kèm dòng để xem trước."
    ],
    facts: [
      "Grep tìm nội dung bên trong file theo pattern. Glob tìm đường dẫn và tên file theo mẫu tên, không đọc nội dung.",
      "Grep có <code>output_mode</code>: <code>files_with_matches</code> (file nào có), <code>count</code> (bao nhiêu chỗ), <code>content</code> (dòng nào khớp).",
      "Read theo import từ entry point là cách lần một luồng xử lý, không phải cách tìm mọi chỗ một chuỗi xuất hiện."
    ],
    opts: [
      { k: "A", gist: "Run Glob with the pattern <code>**/*API_TIMEOUT_MS*</code> to find the source files that mention the variable, then edit the files it returns.",
        why: [
          "Sai ở giả định: Glob khớp nội dung. Glob chỉ khớp đường dẫn và tên file (ý 1).",
          "Mẫu này chỉ ra file có tên chứa chuỗi đó. Mọi chỗ dùng biến bên trong code đều bị bỏ qua.",
          "Dễ bị cuốn vì Glob và Grep đều là “tìm”, và mẫu có tên biến nên trông đúng. Nhưng Glob tìm theo tên file, Grep mới tìm trong nội dung."
        ] },
      { k: "B", gist: "Run Read on the application's entry-point and configuration files, then follow their imports to the modules that use the variable.",
        why: [
          "Lần theo import là cách đọc luồng gọi (ý 3), không phải cách tìm mọi chỗ một chuỗi xuất hiện.",
          "Biến môi trường có thể được đọc ở script, test hay file cấu hình không nằm trên chuỗi import nào. Với vài trăm file, cách này vừa chậm vừa tốn context, mà vẫn sót."
        ] },
      { k: "C", gist: "Run Bash with <code>git log -S API_TIMEOUT_MS</code> to find the commit that introduced the variable, then edit the files that commit changed.",
        why: [
          "Sai ở chỗ nhìn lịch sử thay vì hiện trạng: <code>git log -S</code> tìm các commit làm thay đổi số lần chuỗi đó xuất hiện.",
          "Sửa theo các file của commit đã thêm biến thì sót mọi chỗ dùng biến được thêm ở các commit sau."
        ] },
      { k: "D", gist: "Run Grep in <code>content</code> output mode for <code>API_TIMEOUT_MS</code> across the repository, then review the matching lines and their files before editing.",
        why: [
          "Grep tìm trong nội dung file, đúng loại tìm kiếm việc này cần (ý 1).",
          "Chế độ <code>content</code> trả về từng dòng khớp kèm file và số dòng (ý 2). Có đủ danh sách mọi chỗ, xem được từng ngữ cảnh khác nhau trước khi sửa.",
          "Còn <code>files_with_matches</code> chỉ trả tên file, chưa thấy dòng nào."
        ] }
    ],
    refs: [
      { label: "Bài 2.5, mục “Mỗi tool một việc”: Grep tìm nội dung, Glob tìm đường dẫn", href: NOTES + "#l-2-5" },
      { label: "Cheatsheet D2: dòng Built-in, Grep output_mode files_with_matches / count / content", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 2, n: 28, total: 60, sub: "2.1", subName: "Thiết kế tool: description rõ, ranh giới rõ",
    first: "D", answer: "D",
    ask: "A tool called <code>analyze_content</code>, originally built to summarize pasted text, has had its description copied almost word for word onto a newer tool, <code>analyze_document</code>, which is meant for uploaded PDFs. Following the practice of renaming a tool to remove overlap, what should the team do?",
    scene: [
      "Tool <code>analyze_content</code> ban đầu dùng để tóm tắt văn bản người dùng dán vào.",
      "Tool mới <code>analyze_document</code>, dành cho file PDF tải lên, lại được chép description gần như nguyên văn từ <code>analyze_content</code>.",
      "Chỗ khó: hai tool tên chung chung, mô tả gần giống nhau, nên model khó biết khi nào dùng cái nào."
    ],
    asks: [
      "Theo cách “đổi tên tool để hết chồng lấn”, team nên làm gì?",
      "Tức là: làm cho tên và description của hai tool nói rõ mỗi cái nhận loại input nào, để model chọn đúng ngay từ đầu.",
      "Soi từng phương án: model có thấy thay đổi đó lúc chọn tool không? Nó chặn trước khi gọi nhầm, hay chỉ báo sau?"
    ],
    facts: [
      "Claude chọn tool chỉ dựa vào <code>name</code>, <code>description</code>, <code>input_schema</code>. Description là cơ chế chính để chọn tool.",
      "Hai tool có description chồng lấn (overlap) thì model không phân biệt được khi nào dùng cái nào, và gọi nhầm.",
      "Cách sửa của guide: đổi tên cho rõ chức năng và viết lại description. Ví dụ trong guide: <code>analyze_content</code> → <code>extract_web_results</code>, mô tả chuyên về trang web."
    ],
    opts: [
      { k: "A", gist: "Give both tools identical descriptions but different internal function names, so backend routing can tell them apart.",
        why: [
          "Sai ở giả định: model thấy tên hàm nội bộ ở backend. Model chỉ thấy <code>name</code>, <code>description</code>, <code>input_schema</code> (ý 1).",
          "Description vẫn giống hệt nên model vẫn chọn nhầm (ý 2). Backend chỉ chạy đúng cái model đã gọi.",
          "Dễ bị cuốn vì “backend phân biệt được” nghe như đã giải quyết xong. Nhưng model chọn tool trước khi backend chạy."
        ] },
      { k: "B", gist: "Add a disclaimer to each tool's error message saying the wrong tool may have been called, shown after execution fails.",
        why: [
          "Sửa sau thay vì chặn trước: chỉ báo khi đã gọi nhầm và chạy hỏng.",
          "Gốc lỗi là hai description chồng nhau (ý 2) vẫn còn nguyên, nên lần sau model vẫn gọi nhầm."
        ] },
      { k: "C", gist: "Delete <code>analyze_document</code> and require users to always paste document contents as plain text from now on.",
        why: [
          "Hết chồng lấn, nhưng bằng cách bỏ luôn tính năng xử lý PDF và đẩy việc sang người dùng.",
          "Guide sửa chồng lấn bằng đổi tên và viết lại description (ý 3), không phải xóa tool."
        ] },
      { k: "D", gist: "Rename <code>analyze_content</code> to a more specific name such as <code>summarize_pasted_text</code>, limit its description to pasted text only, and leave uploaded PDFs to <code>analyze_document</code>.",
        why: [
          "Đổi <code>analyze_content</code> thành tên nói rõ việc như <code>summarize_pasted_text</code>, giới hạn description vào văn bản dán vào, còn PDF tải lên để cho <code>analyze_document</code>.",
          "Đúng cách của guide (ý 3): tên và description không còn chồng nhau, model đọc là biết tool nào nhận loại input nào (ý 1), nên chọn đúng ngay từ đầu."
        ] }
    ],
    refs: [
      { label: "Bài 2.1, mục “Chuyện gì đang xảy ra”: description chồng lấn, ví dụ analyze_content → extract_web_results", href: NOTES + "#l-2-1" },
      { label: "Cheatsheet D2: các ví dụ đổi tên và tách tool trong guide", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 2, n: 29, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code",
    first: "A", answer: "C",
    ask: "Priya has built a brand-new, still-unstable MCP server while prototyping in one repository on her workstation. She wants Claude Code to load it only in that repository, keep it out of her other projects, and never expose it to teammates. Which MCP installation scope meets all three constraints?",
    scene: [
      "Priya vừa viết một MCP server mới, chưa ổn định, đang thử trong một repo trên máy cô.",
      "Cô đặt ba điều kiện: chỉ nạp trong repo này; không xuất hiện ở các project khác của cô; không lộ cho đồng đội.",
      "Chỗ khó: A và C cùng lưu ở <code>~/.claude.json</code>, chỉ khác là có gắn dưới đường dẫn project hay không."
    ],
    asks: [
      "Scope cài MCP nào thỏa cả ba điều kiện?",
      "Tức là: cần scope vừa cá nhân (chỉ Priya thấy), vừa chỉ nạp ở một repo.",
      "Soi từng phương án hai câu: ai thấy server? Server nạp ở những repo nào?"
    ],
    facts: [
      "Local scope (mặc định của <code>claude mcp add</code>): lưu ở <code>~/.claude.json</code>, ghi dưới mục của project. Chỉ người đó, chỉ repo đó; mở repo khác là không thấy server.",
      "Project scope: <code>.mcp.json</code> ở gốc repo, commit vào git. Ai clone repo cũng có.",
      "User scope: cũng ở <code>~/.claude.json</code>, nhưng là server cá nhân cho mọi repo trên máy.",
      "Cấu hình managed do IT của tổ chức cài, áp cho mọi người trong tổ chức."
    ],
    opts: [
      { k: "A", gist: "User scope, with the entry saved in <code>~/.claude.json</code> and read whenever she works in any project on her machine.",
        why: [
          "User scope cũng lưu ở <code>~/.claude.json</code> và chỉ Priya thấy, nhưng áp cho mọi repo trên máy (ý 3).",
          "Server chưa ổn định sẽ nạp cả ở các repo khác, phạm đúng điều kiện “keep it out of her other projects” (không cho vào các project khác).",
          "Dễ bị cuốn vì user scope là “cá nhân, không ảnh hưởng đồng đội”, khớp hai trên ba điều kiện. Nhưng đề đòi chỉ đúng một repo, và chỉ local vừa cá nhân vừa một repo."
        ] },
      { k: "B", gist: "Managed settings, with the entry deployed through organization policy and applied across the company's machines.",
        why: [
          "Managed do tổ chức cài xuống cho mọi người (ý 4).",
          "Ngược hẳn với “never expose it to teammates” (không bao giờ lộ cho đồng đội), lại còn áp ra mọi project."
        ] },
      { k: "C", gist: "Local scope, with the entry saved in <code>~/.claude.json</code> under the project's path and read when she works in that project.",
        why: [
          "Local scope ghi vào <code>~/.claude.json</code>, dưới mục của đúng repo đó (ý 1). Chỉ Priya thấy, chỉ repo đó nạp; mở repo khác là không có server.",
          "Nằm trong file ở thư mục home không làm nó thành user scope: việc gắn dưới đường dẫn project mới quyết định phạm vi.",
          "Thỏa cả ba điều kiện. Đây cũng là scope <code>claude mcp add</code> dùng khi không ghi <code>--scope</code>."
        ] },
      { k: "D", gist: "Project scope, with the entry saved in <code>.mcp.json</code> at the repository root and shared through version control.",
        why: [
          "<code>.mcp.json</code> commit vào git, ai clone cũng có (ý 2).",
          "Phạm điều kiện không lộ cho đồng đội, lại còn đưa một server chưa ổn định tới cả team."
        ] }
    ],
    refs: [
      { label: "Bài 2.4: bảng ba scope local, project, user và nơi lưu từng scope", href: NOTES + "#l-2-4" }
    ]
  },
  {
    de: 2, n: 30, total: 60, sub: "5.1", subName: "Giữ thông tin quan trọng trong hội thoại dài",
    first: "D", answer: "C",
    ask: "A support team keeps prompts short by repeatedly summarizing long chats, with no separate structured tracking of transactional details. Over many support sessions, what is the most likely outcome for exact figures such as amounts, dates and order numbers mentioned early in a conversation?",
    scene: [
      "Team support giữ prompt ngắn bằng cách tóm tắt hội thoại dài, hết lần này tới lần khác.",
      "Ngoài bản tóm tắt, họ không theo dõi riêng chi tiết giao dịch nào dưới dạng có cấu trúc.",
      "Chỗ khó: đề hỏi hậu quả sau nhiều phiên, không hỏi cách sửa. Vài phương án mô tả một cơ chế giữ số nghe hợp lý; phải soi xem team này có cơ chế đó thật không."
    ],
    asks: [
      "Sau nhiều phiên, các con số chính xác nhắc ở đầu hội thoại (số tiền, ngày, mã đơn) nhiều khả năng sẽ ra sao?",
      "Tức là: tóm tắt lặp đi lặp lại, không có chỗ lưu riêng, thì chi tiết chính xác còn hay mất."
    ],
    facts: [
      "Progressive summarization (tóm tắt dần): các lượt cũ được thay bằng bản tóm tắt, rồi bản tóm tắt lại bị tóm tắt tiếp. Mỗi lần nén mất thêm chi tiết.",
      "Tóm tắt là nén có mất mát. Thứ mất đầu tiên là chi tiết chính xác: số tiền, ngày, mã đơn, trạng thái. Model tóm tắt theo nghĩa, không theo số.",
      "API không có trạng thái: cái gì không có trong request thì model không biết. Bản tóm tắt mất con số thì với model, con số đó chưa từng tồn tại.",
      "Cách chữa của guide là case facts block: khối có cấu trúc ghi sự kiện giao dịch, đưa nguyên văn vào mọi request, nằm ngoài phần lịch sử bị tóm tắt. Khối này phải tự dựng; tóm tắt không tự sinh ra nó."
    ],
    opts: [
      { k: "A", gist: "Exact values stay verbatim in later summaries, and only the narrative wording around them is condensed.",
        why: [
          "Sai ở giả định: tóm tắt giữ nguyên văn con số. Không có gì bảo đảm điều đó; model tóm tắt theo nghĩa, không theo số (ý 2).",
          "Chính các con số hay bị làm tròn hoặc viết chung chung trước tiên."
        ] },
      { k: "B", gist: "Exact values stay intact across passes, because each new summary is rebuilt from the original messages plus the previous summary.",
        why: [
          "Bịa cơ chế. Tóm tắt dần nghĩa là các lượt cũ bị thay bằng bản tóm tắt (ý 1).",
          "Lần sau chỉ còn bản tóm tắt cũ để nén tiếp, tin nhắn gốc không còn trong request để dựng lại (ý 3)."
        ] },
      { k: "C", gist: "Exact values are replaced by vaguer wording in later summaries, and some drop out of the record after several passes.",
        why: [
          "Mỗi lần tóm tắt là một lần nén có mất mát, và chi tiết chính xác mất trước tiên (ý 1, ý 2).",
          "Qua nhiều lượt, “hoàn $84.50 cho đơn #55120” thành “hoàn khoảng $80”, rồi thành “khách muốn hoàn tiền cho một đơn gần đây”. Số nào rơi khỏi bản tóm tắt thì model không còn biết nữa (ý 3).",
          "Team không có chỗ lưu riêng, nên không có gì giữ các con số đó lại."
        ] },
      { k: "D", gist: "Exact values are carried into a persistent memory store that the summarizer maintains, and later sessions read them back from it.",
        why: [
          "Bịa tính năng. Tóm tắt chỉ cho ra một đoạn văn ngắn hơn, không tự tạo kho lưu nào.",
          "Kho lưu riêng cho số liệu (case facts block, ý 4) chính là thứ đề nói team này không có.",
          "Dễ bị cuốn vì D nghe như cách chữa đúng: lưu số ra chỗ riêng. Nhưng đó là việc phải tự làm, và đề hỏi hậu quả của cách team đang làm, không hỏi cách sửa."
        ] }
    ],
    refs: [
      { label: "Bài 5.1, mục “Chuyện gì đang xảy ra”: tóm tắt là nén có mất mát, số mất trước tiên", href: NOTES + "#l-5-1" },
      { label: "Cheatsheet D5: dòng “Tóm tắt mất số trước tiên” → case facts block", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 2, n: 31, total: 60, sub: "1.2", subName: "Điều phối coordinator–subagent",
    first: "A", answer: "A",
    ask: "A coordinator has several custom subagents defined, each with a <code>description</code> field summarizing what it is for. A new query arrives that does not name any subagent. How does the coordinator usually decide which subagent, if any, to invoke?",
    scene: [
      "Coordinator có vài subagent tự định nghĩa. Mỗi cái khai một trường <code>description</code> tóm tắt nó dùng để làm gì.",
      "Một query mới tới, không nhắc tên subagent nào.",
      "Chỗ khó: định nghĩa subagent có mấy thứ nghe như đều dùng để chọn được: tên, <code>description</code>, danh sách <code>tools</code>, thứ tự khai báo."
    ],
    asks: [
      "Coordinator thường dựa vào đâu để quyết gọi subagent nào, hoặc không gọi cái nào?",
      "Tức là: khi người dùng không chỉ định, model đọc thứ gì để giao việc.",
      "Soi từng phương án: trường nó dựa vào được khai ra để làm gì?"
    ],
    facts: [
      "<code>AgentDefinition</code> là “hồ sơ” khai một loại subagent: <code>description</code> nói khi nào nên gọi nó, <code>prompt</code> là system prompt riêng, <code>tools</code> là các tool nó được dùng. <code>description</code> và <code>prompt</code> là trường bắt buộc.",
      "<code>tools</code> là giới hạn quyền: subagent được gọi những tool nào (bỏ trống thì dùng hết). Nó nói subagent <i>được phép</i> làm gì, không nói subagent sinh ra để làm việc gì.",
      "Nhìn từ phía coordinator, gọi subagent giống hệt gọi một tool. Model chọn tool bằng cách đọc tên và <code>description</code>, không đọc phần bên trong. Docs Subagents ghi rõ Claude tự giao việc cho subagent dựa vào description của nó."
    ],
    opts: [
      { k: "A", gist: "It compares each subagent's description with the query and delegates to the one whose stated purpose best fits the request.",
        why: [
          "Query không nêu tên thì coordinator so yêu cầu với <code>description</code> của từng subagent, rồi giao cho cái hợp nhất (ý 1, ý 3).",
          "Không cái nào hợp thì nó tự làm, đúng chữ “if any” (nếu có) trong đề.",
          "Hệ quả: description phải viết rõ “dùng khi nào”. Viết mơ hồ thì giao nhầm, y như tool có description mơ hồ bị gọi nhầm."
        ] },
      { k: "B", gist: "It looks for a subagent's name in the query and delegates to it; otherwise the coordinator handles the query itself.",
        why: [
          "Sai ở giả định: coi tên là tín hiệu duy nhất. Gọi đích danh là một cách, nhưng query không nêu tên thì coordinator vẫn tự giao việc theo <code>description</code> (ý 3).",
          "Theo B thì mọi query không nhắc tên đều rơi về coordinator, và trường <code>description</code> bắt buộc khai (ý 1) thành vô dụng."
        ] },
      { k: "C", gist: "It compares each subagent's tools list with the query and delegates to the one whose tools cover the request best.",
        why: [
          "Sai ở giả định: <code>tools</code> là giới hạn subagent được làm gì, không phải tín hiệu để chọn subagent (ý 2).",
          "Hai subagent có thể cùng bộ <code>Read</code>, <code>Grep</code> mà làm hai việc khác hẳn. Nhìn tools thì không phân biệt được, chỉ description phân biệt được.",
          "Dễ bị cuốn vì tool là thứ subagent dùng để làm việc, nên “tool nào hợp thì gọi” nghe có lý. Nhưng thứ model đọc để giao việc là <code>description</code>, giống cách nó chọn tool qua description của tool (ý 3)."
        ] },
      { k: "D", gist: "It cycles through the subagents in their defined order and hands each new query to the next one in line.",
        why: [
          "Không có cơ chế xoay vòng nào. Thứ tự khai báo không phải thứ model đọc để giao việc (ý 3).",
          "Giao theo lượt thì query nào cũng có thể rơi vào subagent không liên quan, và coordinator mất luôn lựa chọn tự làm khi không cái nào hợp."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, khung định nghĩa AgentDefinition: description cho biết khi nào nên gọi subagent", href: NOTES + "#l-1-3" },
      { label: "Bài Nền tảng D2: description là tài liệu duy nhất Claude đọc để quyết định gọi gì", href: NOTES + "#l-2-0" },
      { label: "Docs Subagents: Claude tự giao việc dựa vào description của subagent", href: "https://code.claude.com/docs/en/sub-agents" }
    ]
  },
  {
    de: 2, n: 32, total: 60, sub: "5.1", subName: "Giữ thông tin quan trọng trong hội thoại dài",
    first: "D", answer: "C",
    ask: "To cut latency, a travel-booking assistant sends only the user's latest message plus a one-sentence rolling summary on each API call, instead of the full prior turns. Ten turns in, the customer says “book the same seat type I mentioned earlier”, but the assistant no longer has that detail because it was dropped from the rolling summary. What is the underlying issue?",
    scene: [
      "Trợ lý đặt vé du lịch muốn giảm độ trễ. Mỗi lần gọi API nó chỉ gửi tin nhắn mới nhất của khách cộng một câu tóm tắt cuốn chiếu (rolling summary), không gửi các lượt cũ.",
      "Tới lượt thứ mười, khách nói “book the same seat type I mentioned earlier” (đặt loại ghế giống loại tôi nói lúc nãy).",
      "Trợ lý không còn biết loại ghế đó, vì chi tiết này đã rơi khỏi câu tóm tắt.",
      "Chỗ khó: phương án nào cũng tả được hiện tượng “mất thông tin”, chỉ khác nhau ở cơ chế gây ra nó."
    ],
    asks: [
      "Vấn đề gốc là gì?",
      "Tức là: vì sao model không biết loại ghế. Phải nói đúng cơ chế, không chỉ tả triệu chứng.",
      "Soi từng phương án: cơ chế nó nêu có thật không, và có khớp với cách request trong đề được dựng không?"
    ],
    facts: [
      "Messages API không có trí nhớ (stateless): lần gọi sau không biết lần gọi trước nói gì. <code>messages</code> gửi kèm mỗi request là bộ nhớ duy nhất của model.",
      "Vì vậy cái gì không có trong request thì với model, nó chưa từng tồn tại.",
      "Tóm tắt là nén có mất mát. Thứ mất đầu tiên là chi tiết chính xác (số, ngày, mã, lựa chọn khách đã nêu), vì model tóm tắt theo nghĩa.",
      "Cách giữ chi tiết qua nhiều lượt là case facts block: khối dữ liệu có cấu trúc, đưa nguyên văn vào mọi request, nằm ngoài phần bị tóm tắt."
    ],
    opts: [
      { k: "A", gist: "The customer should have restated the seat preference in later messages, since a preference given once does not persist.",
        why: [
          "Đổ lỗi cho khách. Khách nói một lần là đủ; giữ chi tiết đó qua các lượt là việc của hệ thống, ví dụ bằng case facts block (ý 4).",
          "Chỗ hỏng là request không mang chi tiết đó theo (ý 2), không phải cách khách nói."
        ] },
      { k: "B", gist: "The conversation outgrew the model's context window by turn ten, so the API cut off the oldest turns, including the seat type.",
        why: [
          "Sai ở giả định: API cắt bớt lượt cũ vì tràn context. Nhưng các lượt cũ có được gửi đi đâu: mỗi request chỉ có tin mới nhất và một câu tóm tắt, rất ngắn.",
          "Chi tiết mất ở bước tóm tắt do chính developer làm (ý 3), không phải do giới hạn context."
        ] },
      { k: "C", gist: "The API is stateless between requests, so the model can use only the turns included in the messages sent with each call.",
        why: [
          "API không có trí nhớ (ý 1): mỗi request đứng riêng, model chỉ thấy đúng những gì có trong <code>messages</code> của request đó.",
          "Request lượt mười chỉ có tin mới nhất và câu tóm tắt đã rơi mất loại ghế (ý 3), nên model không có gì để hiểu “cái tôi nói lúc nãy” (ý 2).",
          "Gọi đúng tên vấn đề thì cách sửa cũng rõ: đưa các chi tiết phải giữ vào mọi request, ví dụ case facts block (ý 4)."
        ] },
      { k: "D", gist: "The model keeps its own memory of a session, but the shortened input made it lose the seat type from earlier turns.",
        why: [
          "Sai ở giả định: model không có trí nhớ phiên riêng giữa các lần gọi (ý 1). Nó chưa từng “giữ” loại ghế rồi đánh mất.",
          "Chi tiết đó đơn giản là không có trong request lượt mười (ý 2).",
          "Dễ bị cuốn vì D tả đúng hiện tượng: input bị rút gọn thì thông tin mất. Nhưng sai cơ chế: không có bộ nhớ phiên nào ở phía model, <code>messages</code> gửi lên là bộ nhớ duy nhất."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D1, mục 1: API không có trí nhớ, messages là bộ nhớ duy nhất", href: NOTES + "#l-1-0" },
      { label: "Bài 5.1: case facts block cho chi tiết phải giữ chính xác qua nhiều lượt", href: NOTES + "#l-5-1" }
    ]
  },
  {
    de: 2, n: 33, total: 60, sub: "2.5", subName: "Chọn built-in tool đúng việc",
    first: "C", answer: "A",
    ask: "A module <code>dateUtils.ts</code> re-exports several functions under different names, for example <code>export { formatDate as fmt, parseDate as pd }</code>. Claude needs to change the parameter list of <code>formatDate</code>, so every call site must be updated, whether it calls the function by its original name or through a re-exported alias such as <code>fmt</code>. Which approach correctly accounts for the re-exports?",
    scene: [
      "Module <code>dateUtils.ts</code> export lại vài hàm dưới tên khác, ví dụ <code>export { formatDate as fmt, parseDate as pd }</code>.",
      "Claude cần đổi danh sách tham số của <code>formatDate</code>, nên phải sửa mọi chỗ gọi, dù gọi bằng tên gốc hay qua tên mới như <code>fmt</code>.",
      "Chỗ khó: chỗ gọi qua tên mới không hề chứa chữ <code>formatDate</code>. Ví dụ minh họa:<pre><code>// report.ts\nimport { fmt } from \"./dateUtils\";\nconst label = fmt(order.createdAt);</code></pre>"
    ],
    asks: [
      "Cách nào tính đủ các tên export lại (re-export)?",
      "Tức là: tìm được mọi chỗ gọi hàm, cả chỗ gọi bằng tên gốc lẫn chỗ gọi qua alias (tên khác).",
      "Soi từng phương án: nó tìm theo những tên nào, và tìm theo nội dung file hay theo tên file?"
    ],
    facts: [
      "Re-export, wrapper module: một file export lại hàm của file khác, có khi dưới tên mới. Caller dùng tên mới thì Grep tên cũ sẽ không thấy.",
      "Cách bài 2.5 dạy: trước hết liệt kê mọi tên export của wrapper, rồi Grep từng tên trên toàn codebase.",
      "Grep tìm chữ bên trong file, ví dụ mọi chỗ gọi một hàm. Glob tìm đường dẫn file theo mẫu tên, ví dụ <code>**/*.test.tsx</code>."
    ],
    opts: [
      { k: "A", gist: "Read <code>dateUtils.ts</code> to list every name <code>formatDate</code> is exported under, then Grep the codebase for each of those names and update the matches.",
        why: [
          "Read <code>dateUtils.ts</code> để thấy dòng export đổi tên, liệt kê đủ <code>formatDate</code> và <code>fmt</code> (ý 2).",
          "Grep từng tên trên toàn codebase thì bắt được cả chỗ gọi tên gốc lẫn chỗ gọi qua <code>fmt</code> (ý 1).",
          "Đúng thứ đề đòi: sửa mọi chỗ gọi, gọi bằng tên nào cũng không sót."
        ] },
      { k: "B", gist: "Grep the codebase for import lines that reference <code>dateUtils</code>, then open each importing file and update the <code>formatDate</code> calls in it.",
        why: [
          "Grep dòng import có <code>dateUtils</code> thì tìm đúng các file dùng module. Nhưng vào từng file lại chỉ sửa lời gọi <code>formatDate</code>.",
          "File import <code>fmt</code> như <code>report.ts</code> có trong kết quả, nhưng lời gọi <code>fmt(...)</code> vẫn giữ tham số cũ, code hỏng.",
          "File nhận hàm qua một module trung gian khác, không import thẳng <code>dateUtils</code>, cũng không hiện ra."
        ] },
      { k: "C", gist: "Read <code>dateUtils.ts</code> to confirm <code>formatDate</code>'s current parameters, then Grep the codebase for <code>formatDate</code> and update the call sites it returns.",
        why: [
          "Đọc file để xem tham số là đúng, nhưng lại bỏ qua chính dòng export đổi tên trong file đó, rồi chỉ Grep một tên <code>formatDate</code>.",
          "Chỗ gọi qua <code>fmt</code> không chứa chữ <code>formatDate</code> (ý 1), nên sót hết. Các lời gọi đó vẫn truyền tham số kiểu cũ.",
          "Dễ bị cuốn vì Read rồi Grep đúng là bộ đôi chuẩn của bài 2.5. Nhưng đề nhấn mạnh có alias, mà gặp re-export thì phải Grep mọi tên (ý 2)."
        ] },
      { k: "D", gist: "Run Glob for <code>**/dateUtils*</code> to locate the module and related files, then read each match and update the <code>formatDate</code> calls it contains.",
        why: [
          "Sai công cụ: Glob tìm theo tên file (ý 3), nên <code>**/dateUtils*</code> chỉ ra <code>dateUtils.ts</code> và các file tên na ná.",
          "Chỗ gọi hàm nằm rải khắp codebase trong những file tên chẳng liên quan. Phải tìm theo nội dung bằng Grep."
        ] }
    ],
    refs: [
      { label: "Bài 2.5: định nghĩa “Re-export, wrapper module” và cách liệt kê tên export rồi Grep từng tên", href: NOTES + "#l-2-5" }
    ]
  },
  {
    de: 2, n: 34, total: 60, sub: "5.6", subName: "Giữ nguồn và xử lý mâu thuẫn khi tổng hợp",
    first: "A", answer: "C",
    ask: "A coordinator receives structured claim-source mappings from four subagents researching the same topic from different angles. While merging, it finds several near-duplicate claims reported by more than one subagent in slightly different wording, and the supporting citations differ across the reports. What is the best way to merge them without losing provenance?",
    scene: [
      "Coordinator nhận claim-source mapping (ánh xạ khẳng định → nguồn) có cấu trúc từ bốn subagent cùng nghiên cứu một chủ đề, mỗi cái một góc.",
      "Lúc gộp, nó thấy vài claim gần trùng nhau: nhiều subagent cùng báo, chỉ khác câu chữ.",
      "Chỗ khó: citation (dẫn nguồn) của các claim đó lại khác nhau giữa các báo cáo. Ví dụ minh họa:<pre><code>Subagent 1: “Doanh thu tăng 20%”     nguồn: báo cáo A\nSubagent 3: “Doanh thu tăng gần 20%” nguồn: bài báo B</code></pre>"
    ],
    asks: [
      "Gộp thế nào cho tốt nhất mà không mất provenance (nguồn gốc của claim)?",
      "Tức là: bỏ được phần lặp chữ, nhưng claim nào cũng vẫn truy được về mọi nguồn đã đỡ cho nó.",
      "Cả bốn phương án đều gộp claim thành một mục. Soi chỗ khác nhau: mỗi phương án giữ lại nguồn nào."
    ],
    facts: [
      "Provenance là nguồn gốc của một claim: tài liệu nào, đoạn nào, ngày nào. Attribution là ghi nguồn đó cạnh claim.",
      "Guide 5.6 đòi structured claim-source mapping: mỗi claim kèm URL, tên tài liệu, trích đoạn. Agent phía sau phải bảo toàn và merge (gộp) ánh xạ đó, không viết lại thành văn trơn.",
      "Synthesis (bước tổng hợp) là chỗ nguồn dễ rơi nhất. Mỗi lần nén mà không giữ ánh xạ claim → nguồn là mất thêm nguồn."
    ],
    opts: [
      { k: "A", gist: "Merge the overlapping claims into one entry and keep the citations from the single most detailed report.",
        why: [
          "Sai ở chỗ coi gộp claim là được bỏ nguồn. Các báo cáo không trích cùng nguồn, giữ citation của một báo cáo là vứt các nguồn chỉ có ở báo cáo khác (ý 2).",
          "Mục gộp trông vẫn có dẫn chứng, nhưng liên kết claim → nguồn của các subagent kia đã mất (ý 3).",
          "Dễ bị cuốn vì “báo cáo chi tiết nhất” nghe như chọn nguồn tốt nhất. Nhưng gộp là để bớt lặp chữ, không phải để bớt nguồn."
        ] },
      { k: "B", gist: "Merge the overlapping claims into one entry and replace the citations with the names of the reporting subagents.",
        why: [
          "Tên subagent không phải nguồn. Người đọc cần biết claim dựa vào tài liệu nào (URL, tên tài liệu, trích đoạn) để kiểm chứng (ý 1).",
          "“Subagent 2 nói vậy” thì không kiểm được gì, mà nguồn thật còn bị thay mất."
        ] },
      { k: "C", gist: "Merge the overlapping claims into one entry and attach the combined citations from all the subagents' reports.",
        why: [
          "Gộp claim trùng thành một mục cho khỏi lặp, đồng thời giữ hợp (gộp chung) mọi citation từ các báo cáo.",
          "Đây đúng là “bảo toàn và merge” ánh xạ claim → nguồn mà guide đòi (ý 2): nguồn nào cũng còn, claim nào cũng truy được.",
          "Thỏa cả hai điều đề hỏi: hết trùng lặp, không mất provenance."
        ] },
      { k: "D", gist: "Merge the overlapping claims into one entry and cite only the source that most reports have in common.",
        why: [
          "Chọn theo đa số là bỏ những nguồn ít được nhắc hơn, mà nguồn đó có thể chính là bằng chứng tốt nhất.",
          "Liên kết claim → nguồn vẫn mất y như A, chỉ khác tiêu chí bỏ (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 5.6, mục “Chuyện gì đang xảy ra”: structured claim-source mapping phải được bảo toàn và merge", href: NOTES + "#l-5-6" },
      { label: "Cheatsheet D5: dòng “Báo cáo mất nguồn sau synthesis”", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 2, n: 35, total: 60, sub: "5.6", subName: "Giữ nguồn và xử lý mâu thuẫn khi tổng hợp",
    first: "A", answer: "B",
    ask: "A synthesis agent is writing a final report that combines one subagent's findings on a company's stock price and revenue trends with another subagent's qualitative summary of recent news coverage about the same company. In the draft, both are turned into the same bulleted-list format. Which change would most improve how this content is presented?",
    scene: [
      "Synthesis agent viết báo cáo cuối về một công ty, gộp hai thứ: số liệu giá cổ phiếu và xu hướng doanh thu từ một subagent, bản tóm tắt định tính về tin tức gần đây từ subagent khác.",
      "Trong bản nháp, cả hai bị đổ chung vào một kiểu gạch đầu dòng.",
      "Chỗ khó: hai loại nội dung khác hẳn nhau. Một bên là số để so qua các kỳ, một bên là mạch kể có sắc thái."
    ],
    asks: [
      "Thay đổi nào cải thiện cách trình bày nhiều nhất?",
      "Tức là: mỗi loại nội dung nên trình bày bằng format nào.",
      "Soi từng phương án: số liệu thành gì, tin tức thành gì, và mỗi cái có hợp với loại nội dung của nó không?"
    ],
    facts: [
      "Synthesis là bước tổng hợp kết quả của nhiều agent thành báo cáo cuối.",
      "Guide 5.6: render theo loại nội dung. Dữ liệu tài chính thành bảng, tin tức thành văn xuôi, phát hiện kỹ thuật thành danh sách có cấu trúc.",
      "Ép tất cả về một format làm mất thông tin và khó đọc."
    ],
    opts: [
      { k: "A", gist: "Present the stock and revenue figures as a table, and the news summary as a table too with one row per article, under separate headings.",
        why: [
          "Nửa số liệu đúng: thành bảng (ý 2).",
          "Nửa tin tức sai: cắt bản tóm tắt thành mỗi bài một dòng là bẻ vụn một mạch kể định tính, mất phần liên kết và sắc thái giữa các tin (ý 3).",
          "Dễ bị cuốn vì nửa đầu đã đúng nên dễ tin cả phương án. Nhưng tin tức vẫn bị ép vào bảng; hai loại nội dung cần hai format khác nhau."
        ] },
      { k: "B", gist: "Present the stock and revenue figures as a table, and the news summary as short prose paragraphs, under separate headings.",
        why: [
          "Số liệu cổ phiếu, doanh thu thành bảng để so qua các kỳ. Tin tức thành vài đoạn văn ngắn để giữ mạch và sắc thái. Đúng bảng phân loại của guide (ý 2).",
          "Mỗi loại một format hợp với nó, dưới tiêu đề riêng, thay cho một kiểu gạch đầu dòng chung làm mất thông tin (ý 3)."
        ] },
      { k: "C", gist: "Present the stock and revenue figures and the news summary together in one table, with a row per quarter and a column per source.",
        why: [
          "Một bảng chung, mỗi dòng một quý, mỗi cột một nguồn: vẫn là ép mọi nội dung về một format, đúng điều guide dặn tránh (ý 3).",
          "Tóm tắt tin tức bị nhét vào từng ô, mất mạch kể và sắc thái."
        ] },
      { k: "D", gist: "Present the stock and revenue figures as prose paragraphs and the news summary as a bulleted list, under separate headings.",
        why: [
          "Đổi format ngược chiều (ý 2): số liệu thành văn xuôi thì khó so qua các kỳ.",
          "Tin tức thành gạch đầu dòng thì vẫn mất mạch kể, đúng cái lỗi của bản nháp."
        ] }
    ],
    refs: [
      { label: "Bài 5.6, mục “Ngày tháng và cách trình bày”: render theo loại nội dung, đừng ép tất cả về một format", href: NOTES + "#l-5-6" },
      { label: "Cheatsheet D5: dòng “Báo cáo ép mọi nội dung thành một format” → bảng cho tài chính, văn xuôi cho tin tức, danh sách cho kỹ thuật", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 2, n: 36, total: 60, sub: "3.6", subName: "Đưa Claude Code vào CI/CD",
    first: "A", answer: "A",
    ask: "A build script pipes a large build-error log into Claude to get a root-cause explanation: <code>cat build-error.txt | claude -p 'explain the root cause' &gt; output.txt</code>. On one especially verbose failure, the job exits at once with an error and no explanation is written. Given how Claude Code handles piped stdin, what is the most likely cause?",
    scene: [
      "Script build pipe (đẩy qua đường ống) một file log lỗi build lớn vào Claude để hỏi nguyên nhân gốc: <code>cat build-error.txt | claude -p 'explain the root cause' &gt; output.txt</code>.",
      "Lệnh này vẫn chạy được với các log khác.",
      "Chỗ khó: với một lần lỗi đặc biệt dài dòng (“especially verbose”), job thoát ngay kèm lỗi, không có lời giải thích nào được ghi ra."
    ],
    asks: [
      "Dựa vào cách Claude Code xử lý stdin được pipe vào, nguyên nhân khả dĩ nhất là gì?",
      "Tức là: lần hỏng này khác các lần khác ở điểm nào, và Claude Code phản ứng với điểm đó ra sao.",
      "Soi từng phương án: cơ chế nó nêu có thật không, và có giải thích được cả hai dấu hiệu “chỉ log dài mới hỏng” và “thoát ngay” không?"
    ],
    facts: [
      "Stdin pipe vào <code>claude -p</code> tối đa 10MB. Vượt mức đó, Claude Code báo lỗi và thoát với mã khác 0, không xử lý input.",
      "Log quá lớn thì ghi ra file rồi đưa đường dẫn file vào prompt, thay vì pipe.",
      "Text nhiều dòng pipe vào bình thường, không cần cờ gì. <code>--input-format stream-json</code> là để gửi message dạng JSON có cấu trúc.",
      "<code>--max-turns</code> là cờ người chạy tự đặt để giới hạn số vòng agent. Chạm giới hạn đó nghĩa là Claude đã chạy được vài vòng rồi."
    ],
    opts: [
      { k: "A", gist: "The log exceeded the 10MB cap on piped stdin, so Claude Code exited with an error instead of processing the input.",
        why: [
          "Log lớn bất thường vượt 10MB, nên Claude Code báo lỗi và thoát với mã khác 0, không xử lý input (ý 1).",
          "Khớp đủ hai dấu hiệu: chỉ hỏng ở log dài bất thường, và hỏng ngay lúc nhận input.",
          "Cách xử lý: ghi log ra file rồi đưa đường dẫn vào prompt, thay vì pipe (ý 2)."
        ] },
      { k: "B", gist: "The log contained non-UTF-8 bytes, which <code>-p</code> mode rejects, so Claude Code exited with an error instead of parsing the input.",
        why: [
          "Cơ chế bịa: docs không nói <code>-p</code> từ chối byte ngoài UTF-8.",
          "Đề nhấn vào độ dài (“especially verbose”, dài dòng bất thường), không phải ký tự lạ."
        ] },
      { k: "C", gist: "The piped log spanned multiple lines, which requires <code>--input-format stream-json</code>, so Claude Code exited with an error instead of reading the input.",
        why: [
          "Sai ở giả định: text nhiều dòng pipe vào <code>-p</code> chạy bình thường, không cần cờ gì (ý 3).",
          "Log build nào cũng nhiều dòng, mà cùng lệnh này vẫn chạy với các log khác, nên số dòng không phải nguyên nhân.",
          "Dễ bị cuốn vì “nhiều dòng cần stream-json” nghe kỹ thuật và có tên cờ thật. Nhưng thứ duy nhất khác ở lần hỏng là độ lớn, nên phải nghĩ tới giới hạn 10MB (ý 1)."
        ] },
      { k: "D", gist: "The run hit the default <code>--max-turns</code> limit for <code>-p</code> mode, so Claude Code exited with an error instead of answering the prompt.",
        why: [
          "Lệnh trong đề không đặt <code>--max-turns</code> (ý 4).",
          "Kể cả có đặt, chạm giới hạn vòng là chuyện xảy ra sau khi Claude đã làm vài vòng, không phải thoát ngay lúc vừa nhận input."
        ] }
    ],
    refs: [
      { label: "Bài 3.6, ô “Đã sửa 02/11”: stdin pipe vào tối đa 10MB, lớn hơn thì ghi ra file", href: NOTES + "#fix-16" },
      { label: "Docs Run Claude Code programmatically, mục “Pipe data through Claude”: giới hạn 10MB", href: "https://code.claude.com/docs/en/headless" }
    ]
  },
  {
    de: 2, n: 37, total: 60, sub: "3.4", subName: "Plan mode hay làm thẳng",
    first: "B", answer: "B",
    ask: "A request asks Claude to rename one internal helper function and update its handful of call sites within a single module, where every call site is already visible in the file the developer has open. Which characteristic of this task best justifies skipping plan mode?",
    scene: [
      "Yêu cầu: đổi tên một hàm helper nội bộ và sửa vài chỗ gọi nó, tất cả trong một module.",
      "Mọi chỗ gọi đều đang hiện sẵn trong file developer đang mở.",
      "Chỗ khó: cả bốn phương án đều đưa ra một lý do nghe hợp lý để bỏ plan mode. Chỉ một lý do đúng tiêu chí."
    ],
    asks: [
      "Đặc điểm nào của việc này là lý do tốt nhất để bỏ qua plan mode?",
      "Tức là: tiêu chí thật để chọn giữa plan mode và làm thẳng là gì, và việc này thỏa tiêu chí đó ở điểm nào.",
      "Soi từng phương án: lý do nó nêu có nằm trong tiêu chí của bài 3.4 không (độ lớn, số cách làm, quyết định kiến trúc)?"
    ],
    facts: [
      "Plan mode là chế độ chỉ đọc: Claude đọc code, khám phá, viết kế hoạch, không sửa file nào cho đến khi bạn duyệt. Direct execution (làm thẳng) là yêu cầu xong Claude đọc và sửa luôn.",
      "Chọn plan mode khi thay đổi lớn, nhiều file; khi có nhiều cách làm hợp lệ phải chọn; khi phải quyết định kiến trúc.",
      "Làm thẳng khi thay đổi nhỏ, phạm vi rõ, chỉ có một cách làm hiển nhiên.",
      "Plan mode tồn tại để nhìn thấy quyết định trước khi trả giá cho nó. Không có gì để khám phá hay quyết thì plan chỉ tốn thời gian."
    ],
    opts: [
      { k: "A", gist: "The rename is cosmetic and leaves runtime behavior unchanged, so a mistake in it could not break anything in the module.",
        why: [
          "Sai sự thật: đổi tên mà sót một chỗ gọi là code hỏng ngay, không phải “không thể làm hỏng gì”.",
          "Mà rủi ro cao hay thấp cũng không phải tiêu chí. Tiêu chí là có cần khám phá hay quyết định gì trước khi sửa không (ý 2, ý 3)."
        ] },
      { k: "B", gist: "The full set of edits is already known and sits in a single module, so nothing needs investigating or deciding first.",
        why: [
          "Mọi chỗ cần sửa đã biết và nằm gọn trong một module: phạm vi rõ, chỉ một cách làm hiển nhiên (ý 3).",
          "Không có gì để khám phá hay quyết trước, nên plan mode không có việc gì để làm (ý 4). Làm thẳng là đúng."
        ] },
      { k: "C", gist: "The developer named the exact rename, so a plan would only repeat an instruction that is already explicit.",
        why: [
          "Sai lý do: lời dặn rõ không thay được bước khám phá. Cùng yêu cầu đổi tên đó mà hàm được gọi ở hàng chục file chưa xem thì vẫn nên plan (ý 2).",
          "Dễ bị cuốn vì “yêu cầu đã rõ thì khỏi plan” nghe hợp lý. Nhưng plan mode không phải để làm rõ lời dặn, mà để khám phá phạm vi và chốt cách làm. Lý do bỏ plan ở đây là phạm vi đã biết và nằm gọn."
        ] },
      { k: "D", gist: "The rename is easy to revert through version control, so a wrong edit would cost little to undo before anyone notices.",
        why: [
          "Sai lý do: dễ hoàn tác không phải tiêu chí. Thay đổi lớn, nhiều file cũng revert được bằng git mà vẫn cần plan (ý 2).",
          "Tiêu chí là độ lớn và số cách làm, không phải chi phí sửa sai."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, mục “Chuyện gì đang xảy ra”: chọn plan mode hay làm thẳng theo độ lớn và số cách làm", href: NOTES + "#l-3-4" }
    ]
  },
  {
    de: 2, n: 38, total: 60, sub: "4.5", subName: "Xử lý theo lô (Batch)",
    first: "C", answer: "C",
    ask: "Every week a compliance team checks all 15,000 vendor contracts and has to publish a findings report two business days after the run starts. Because each cycle covers the full catalog, cost per document is a real concern. How should this recurring job be set up?",
    scene: [
      "Mỗi tuần, team compliance (tuân thủ) rà toàn bộ 15.000 hợp đồng nhà cung cấp.",
      "Báo cáo kết quả phải ra trong hai ngày làm việc kể từ lúc bắt đầu chạy.",
      "Chỗ khó: đợt nào cũng chạy cả danh mục nên chi phí mỗi tài liệu là chuyện thật, mà vẫn phải kịp hạn."
    ],
    asks: [
      "Nên dựng job định kỳ này thế nào?",
      "Tức là: chọn cách gọi rẻ nhất mà vẫn chắc chắn kịp hạn hai ngày làm việc.",
      "Soi từng phương án: giá mỗi request, thời gian trong trường hợp xấu nhất, và có vướng giới hạn nào của batch không."
    ],
    facts: [
      "Message Batches API: gửi cả lô request một lần, xử lý bất đồng bộ. Giá giảm 50%, áp cho mọi usage, và cộng dồn với prompt caching.",
      "Một batch mất tối đa 24 giờ, không có cam kết độ trễ. Nên Batch chỉ hợp với việc không ai đang ngồi chờ.",
      "Mỗi batch chứa tới 100.000 request hoặc 256 MB.",
      "Batch không tính vào rate limit của Messages API. Gọi sync thì trả giá đầy đủ và tự lo rate limit."
    ],
    opts: [
      { k: "A", gist: "Call the synchronous Messages API once per contract with the review rubric cached, then build the report from the responses.",
        why: [
          "Gọi sync thì mỗi request trả giá đầy đủ. Caching chỉ làm rẻ phần rubric lặp lại ở đầu prompt; nội dung từng hợp đồng và output vẫn tính đủ.",
          "Batch giảm 50% cho mọi usage và còn cộng dồn được với caching (ý 1). Nên caching không thay được batch, cùng lắm là đi kèm batch."
        ] },
      { k: "B", gist: "Split the contracts into Message Batches of 1,000 requests and submit them one after another, starting each batch only after the previous one has ended, then build the report.",
        why: [
          "Một batch có thể mất tới 24 giờ (ý 2). Chờ batch trước xong mới gửi batch sau thì 15 batch nối đuôi, trường hợp xấu nhất là 15 × 24 giờ, quá xa hạn hai ngày làm việc.",
          "Cũng chẳng cần chia: 15.000 request nằm gọn trong một batch (ý 3).",
          "Dễ bị cuốn vì chia nhỏ trông cẩn thận. Nhưng chia nhỏ không sai, nối đuôi mới sai. Nếu buộc phải chia, ví dụ vượt 256 MB, thì gửi các batch <b>cùng lúc</b>."
        ] },
      { k: "C", gist: "Put all 15,000 contracts into a single Message Batch when the run starts, collect the results once it has ended, and build the report from them.",
        why: [
          "Hạn hai ngày làm việc dài hơn mức tối đa 24 giờ của một batch (ý 2), và không ai ngồi chờ từng kết quả.",
          "Batch rẻ 50% so với gọi thường (ý 1), đúng điều đề nhấn mạnh: chi phí mỗi tài liệu.",
          "15.000 request nằm gọn trong giới hạn 100.000 request của một batch (ý 3), gửi một lần là xong."
        ] },
      { k: "D", gist: "Call the synchronous Messages API from a pool of parallel workers, gather the responses as they come back, and build the report.",
        why: [
          "Chạy nhanh, nhưng trả giá đầy đủ cho cả 15.000 request, lại phải tự lo rate limit và retry (ý 4).",
          "Đề không cần kết quả tức thì, nên đây là trả tiền cho tốc độ không ai dùng."
        ] }
    ],
    refs: [
      { label: "Bài 4.5: Batch rẻ 50%, tối đa 24 giờ, giới hạn 100.000 request / 256 MB", href: NOTES + "#l-4-5" },
      { label: "Cheatsheet D4: các dòng về Batch (pre-merge vs báo cáo đêm, nhịp submit)", href: NOTES + "#cheat-d4" }
    ]
  },
  {
    de: 2, n: 39, total: 60, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema",
    first: "B", answer: "B",
    ask: "A team is building a pipeline that has Claude read free-form support tickets and return a JSON object with fields such as priority, category and summary. Early prototypes used a prompt asking Claude to “reply with only JSON”, but downstream parsing sometimes failed on malformed brackets and stray commentary. Which approach most reliably eliminates these JSON syntax failures?",
    scene: [
      "Pipeline cho Claude đọc ticket hỗ trợ viết tự do, trả về một object JSON có các trường như priority, category, summary.",
      "Bản thử đầu dùng prompt dặn “reply with only JSON” (chỉ trả về JSON).",
      "Chỗ khó: phía sau thỉnh thoảng parse lỗi vì ngoặc lệch hoặc có lời bình lạc vào. Ví dụ minh họa:<pre><code>Here is the result:\n{\"priority\": \"high\", \"category\": \"billing\",}</code></pre>"
    ],
    asks: [
      "Cách nào loại bỏ lỗi cú pháp JSON này chắc chắn nhất?",
      "Tức là: không phải giảm tỉ lệ lỗi, mà làm cho lỗi cú pháp (ngoặc, dấu phẩy, câu dẫn) không còn chỗ xuất hiện.",
      "Soi từng phương án: model vẫn đang tự viết chữ trông giống JSON, hay đang điền tham số theo schema?"
    ],
    facts: [
      "Xin JSON trong prompt thì model vẫn đang viết văn, chỉ là văn trông giống JSON. Câu dẫn, fence, dấu phẩy thừa, thiếu ngoặc vẫn xảy ra theo xác suất.",
      "Định nghĩa một tool có <code>input_schema</code> đúng hình dạng cần lấy, rồi đọc trường <code>input</code> của block <code>tool_use</code>. Lúc này model điền tham số cho một hàm chứ không viết văn, nên lỗi cú pháp hết. Guide gọi đây là cách tin cậy nhất.",
      "Temperature chỉ chỉnh độ ngẫu nhiên của chữ, không bảo đảm JSON hợp lệ. <code>max_tokens</code> quá thấp thì output bị cắt giữa chừng; nâng nó chỉ chữa chuyện bị cắt.",
      "Prefill là điền sẵn phần đầu lượt trả lời của assistant. Model viết tiếp từ chỗ đó, phần còn lại vẫn là chữ nó tự sinh."
    ],
    opts: [
      { k: "A", gist: "Set temperature to 0 and raise <code>max_tokens</code> above the expected object size, then parse the text completion with a standard JSON parser.",
        why: [
          "Temperature 0 làm output ít ngẫu nhiên hơn, không bảo đảm JSON hợp lệ (ý 3). Câu dẫn hay ngoặc lệch vẫn có thể xuất hiện.",
          "Tăng <code>max_tokens</code> chỉ chữa chuyện bị cắt giữa chừng, không chữa ngoặc lệch hay lời bình lạc vào. Vẫn là parse text như cũ (ý 1)."
        ] },
      { k: "B", gist: "Define an extraction tool whose <code>input_schema</code> covers the ticket fields, then read the arguments from its <code>tool_use</code> block instead of the text reply.",
        why: [
          "Model gọi tool thì điền tham số theo <code>input_schema</code>, không viết văn, nên không còn câu dẫn hay ngoặc lệch (ý 2).",
          "Code đọc thẳng trường <code>input</code> của block <code>tool_use</code>, không phải tự parse text.",
          "Guide 4.3 gọi đây là cách tin cậy nhất để hết lỗi cú pháp JSON, đúng thứ đề đòi."
        ] },
      { k: "C", gist: "Ask Claude to put its reply inside <code>&lt;json&gt;</code> tags, extract the tag contents with a regular expression, and parse the extracted text.",
        why: [
          "Thẻ <code>&lt;json&gt;</code> giúp tách phần JSON khỏi lời bình bên ngoài, nhưng chữ bên trong thẻ vẫn do model tự viết (ý 1).",
          "Ngoặc lệch, dấu phẩy thừa vẫn có thể có, lại thêm một bước regex dễ vỡ."
        ] },
      { k: "D", gist: "Prefill the assistant turn with an opening brace so the reply starts directly as an object, then parse the text Claude returns with a JSON parser.",
        why: [
          "Prefill <code>{</code> chỉ chốt ký tự đầu tiên; phần còn lại vẫn là text tự do (ý 4, ý 1).",
          "Thiếu ngoặc đóng hay có chữ sau dấu đóng vẫn xảy ra được.",
          "Dễ bị cuốn vì prefill <code>{</code> nghe như ép model vào khuôn JSON. Nhưng nó chỉ ép chữ đầu, không ép cả cấu trúc. Thứ ép cả cấu trúc là tool + <code>input_schema</code> (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, “Khi đi thi”: tool use với JSON schema loại bỏ lỗi cú pháp JSON", href: NOTES + "#l-4-3" },
      { label: "Bài Nền tảng D4, mục 5: lỗi cú pháp, hình dạng, ngữ nghĩa với hai cách lấy JSON", href: NOTES + "#l-4-0" }
    ]
  },
  {
    de: 2, n: 40, total: 60, sub: "1.6", subName: "Chia việc lớn",
    first: "D", answer: "B",
    ask: "An architect is reviewing a design where a large code-review agent analyzes every file in a pull request in one combined prompt, then a second prompt asks it to summarize cross-file issues. Stakeholders report that the cross-file summary often misses real integration bugs that are visible when files are compared directly. What is the most likely cause, and what change would fix it?",
    scene: [
      "Kiến trúc sư xem một thiết kế review code: agent phân tích mọi file của pull request trong một prompt gộp, rồi prompt thứ hai yêu cầu tóm tắt các lỗi xuyên file (cross-file).",
      "Stakeholder (các bên liên quan) báo bản tóm tắt xuyên file hay sót lỗi tích hợp thật.",
      "Chỗ khó: những lỗi bị sót lại hiện rõ khi đặt các file cạnh nhau so trực tiếp."
    ],
    asks: [
      "Nguyên nhân khả dĩ nhất là gì, và sửa gì thì hết?",
      "Tức là: tìm đúng bước hỏng trong hai bước, rồi chọn cách sửa chạm đúng bước đó.",
      "Soi từng phương án: nó đổ lỗi cho bước nào, và cách sửa có làm bước đầu xem kỹ từng file hơn không?"
    ],
    facts: [
      "Attention dilution (loãng chú ý): nhồi quá nhiều thứ vào một lần gọi làm sự chú ý của model bị dàn mỏng; phần đầu được xem kỹ, phần sau qua loa.",
      "Context window to hơn không chữa được: nó chứa được nhiều hơn, không chú ý tốt hơn.",
      "Cách guide dạy cho review PR: mỗi file một lượt (per-file pass) tìm lỗi trong file, rồi một lượt tích hợp (integration pass) xem dữ liệu chảy qua các file."
    ],
    opts: [
      { k: "A", gist: "The split between the prompts loses context, so merge them into one prompt that reviews the files and reports cross-file issues in the same pass.",
        why: [
          "Ngược chiều: gộp cả hai việc vào một lượt làm sự chú ý còn mỏng hơn (ý 1).",
          "Vấn đề không phải chia hai bước, mà là bước đầu nhồi cả PR vào một lượt."
        ] },
      { k: "B", gist: "Attention thins out when the whole pull request sits in one first prompt, so analyze each file in its own pass and feed those findings to the cross-file step.",
        why: [
          "Cả PR trong một lượt thì file nào cũng được xem qua loa (ý 1), findings nông, bước tổng hợp không có gì chắc để đối chiếu.",
          "Mỗi file một lượt riêng rồi đưa findings sang bước xuyên file là đúng per-file pass + integration pass (ý 3).",
          "Bước đầu được xem kỹ, nên bước sau có dữ liệu tốt để bắt lỗi tích hợp."
        ] },
      { k: "C", gist: "The pull request exceeds the model's context window, so move to a model with a larger window and keep both prompts and their order as they are.",
        why: [
          "Đề không nói có gì bị cắt, nên “vượt context window” chỉ là đoán.",
          "Context to hơn chứa được nhiều hơn, không chú ý tốt hơn (ý 2). Cả PR trong một lượt vẫn bị dàn mỏng y như cũ."
        ] },
      { k: "D", gist: "The summary prompt gives no definition of an integration bug, so add detailed criteria and examples of cross-file defects to the second prompt's instructions.",
        why: [
          "Sửa nhầm bước: chỗ hỏng là bước đầu. Bước tổng hợp nhận findings nông thì định nghĩa kỹ đến đâu cũng không bù được.",
          "Đề nói lỗi hiện rõ khi so trực tiếp các file, tức model không thiếu định nghĩa lỗi tích hợp, mà thiếu dữ liệu đã xem kỹ (ý 1).",
          "Dễ bị cuốn vì thêm tiêu chí và ví dụ là cách chữa quen của domain 4. Nhưng đầu vào của bước tổng hợp đã nông thì lời dặn nào cũng không cứu được."
        ] }
    ],
    refs: [
      { label: "Bài 1.6: attention dilution, review PR từng file rồi một lượt tích hợp", href: NOTES + "#l-1-6" },
      { label: "Bài 4.6, mục “Chuyện gì đang xảy ra”: per-file pass + integration pass, context to hơn không chữa được", href: NOTES + "#l-4-6" },
      { label: "Bài “8 luật chọn đáp án”, luật 3 và 7: nghi ngờ context lớn hơn, chia nhỏ để chống loãng chú ý", href: NOTES + "#l-0-3" }
    ]
  },
  {
    de: 2, n: 41, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code",
    first: "A", answer: "A",
    ask: "A team has ten MCP servers connected. One small internal server exposes two tools that Claude needs on nearly every turn, and the team has noticed occasional delay while tool search resolves them. What configuration change addresses this for just that one server?",
    scene: [
      "Team đang nối mười MCP server vào Claude Code.",
      "Một server nội bộ nhỏ có hai tool mà gần như lượt nào Claude cũng cần.",
      "Chỗ khó: thỉnh thoảng bị chậm lúc tool search (cơ chế tìm tool) đi tìm hai tool đó. Đề chỉ muốn sửa “for just that one server” (cho đúng server đó), chín server kia giữ nguyên."
    ],
    asks: [
      "Đổi cấu hình gì để hết chậm, chỉ cho một server đó?",
      "Tức là: làm sao cho hai tool của server này có sẵn từ đầu phiên, không phải qua bước tìm, mà không đổi cách nạp tool của chín server còn lại.",
      "Soi từng phương án: nó có đụng tới bước tìm tool không? Nếu có, nó áp cho một server hay cho tất cả?"
    ],
    facts: [
      "Tool search: Claude Code mặc định hoãn nạp tool MCP. Đầu phiên chỉ nạp tên tool và lời dặn của server; định nghĩa đầy đủ được tìm rồi nạp khi Claude cần.",
      "Đặt <code>\"alwaysLoad\": true</code> trong mục của một server thì tool của server đó nạp sẵn từ đầu, không qua bước tìm. Các server khác vẫn hoãn.",
      "<code>ENABLE_TOOL_SEARCH=false</code> tắt tool search cho mọi server: tool MCP nào cũng nạp sẵn, tốn context.",
      "<code>MAX_MCP_OUTPUT_TOKENS</code> là trần số token cho kết quả một tool MCP trả về. <code>enabledMcpjsonServers</code> trong settings là danh sách server trong <code>.mcp.json</code> được duyệt sẵn. Cả hai không đụng tới việc nạp tool."
    ],
    opts: [
      { k: "A", gist: "Set <code>alwaysLoad: true</code> on that server's entry in the MCP configuration, so its two tools are in context when the session starts.",
        why: [
          "Đặt <code>alwaysLoad: true</code> ở mục của server nội bộ thì hai tool của nó nạp sẵn ngay đầu phiên, không qua bước tìm (ý 2). Hết chậm.",
          "Chín server kia vẫn để tool search hoãn nạp như cũ (ý 1), nên context không phình thêm.",
          "Notes ghi đúng ca này: một server có vài tool cần ở gần như mọi lượt thì đặt <code>alwaysLoad</code>. Đúng cả yêu cầu “just that one server”."
        ] },
      { k: "B", gist: "Add that server to <code>enabledMcpjsonServers</code> in the project settings, so its two tools are approved and in context when the session starts.",
        why: [
          "Sai ở giả định: <code>enabledMcpjsonServers</code> chỉ duyệt sẵn server trong <code>.mcp.json</code>, không đổi cách nạp tool (ý 4).",
          "Server này đã kết nối và đang dùng được. Chỗ chậm là bước tìm tool, không phải bước duyệt, nên thêm vào danh sách này thì vẫn chậm y như cũ."
        ] },
      { k: "C", gist: "Raise <code>MAX_MCP_OUTPUT_TOKENS</code> in that server's environment entry, so its two tools return results sooner on each turn of the session.",
        why: [
          "Sai ở giả định: <code>MAX_MCP_OUTPUT_TOKENS</code> là trần cho kết quả tool trả về, không làm tool chạy nhanh hơn (ý 4).",
          "Nó không đụng tới bước tìm tool (ý 1). Chỗ chậm đề kể nằm ở bước tìm, nên vẫn còn."
        ] },
      { k: "D", gist: "Set <code>ENABLE_TOOL_SEARCH=false</code> in the environment settings, so the tools from the connected servers are in context when the session starts.",
        why: [
          "Chạy được: tắt tool search thì hai tool đó có sẵn từ đầu, hết chậm.",
          "Nhưng đây là công tắc chung (ý 3). Tool của cả mười server đều nạp sẵn, tốn context cho hàng loạt tool ít dùng, trái yêu cầu “just that one server”.",
          "Dễ bị cuốn vì D cũng làm hai tool có mặt từ đầu, nghe như giải quyết được. Nhưng đề chỉ sửa một server, mà cấu hình theo từng server là <code>alwaysLoad</code> (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, mục “Biết thêm” (đã sửa 03/11): tool search, alwaysLoad, ENABLE_TOOL_SEARCH, MAX_MCP_OUTPUT_TOKENS", href: NOTES + "#fix-24" },
      { label: "Bài 2.4, mục “Biết thêm” (đã sửa 03/11): duyệt server trong .mcp.json, enabledMcpjsonServers", href: NOTES + "#fix-22" },
      { label: "Docs MCP, mục Scale with MCP tool search", href: "https://code.claude.com/docs/en/mcp" }
    ]
  },
  {
    de: 2, n: 42, total: 60, sub: "5.5", subName: "Review người và hiệu chuẩn confidence",
    first: "A", answer: "A",
    ask: "A reviewer team can manually check only 8% of the extractions a Claude-based intake pipeline produces each day. Extractions vary in model-reported confidence, and some source documents contain contradictory values for the same field on different pages. How should the team decide which extractions get human review?",
    scene: [
      "Pipeline nhận hồ sơ (intake) dùng Claude trích dữ liệu từ tài liệu. Mỗi ngày đội review chỉ kiểm tay được 8% số extraction (kết quả trích).",
      "Các extraction có confidence (độ tự tin) do model tự báo, cao thấp khác nhau.",
      "Một số tài liệu nguồn ghi giá trị mâu thuẫn cho cùng một trường, mỗi trang một kiểu.",
      "Chỗ khó: sức review có hạn, phải chọn ca nào đưa cho người."
    ],
    asks: [
      "Đội nên chọn extraction nào cho người review?",
      "Tức là: chia 8% sức review sao cho bắt được nhiều lỗi nhất, mà vẫn đo được tỉ lệ lỗi ở phần không ai xem.",
      "Soi từng phương án: có dùng tín hiệu rủi ro đang có sẵn (confidence thấp, trang mâu thuẫn) không? Phần còn lại có ai kiểm không?"
    ],
    facts: [
      "Guide 5.5: chuyển cho người các extraction confidence thấp và tài liệu mơ hồ, mâu thuẫn. Năng lực reviewer có hạn, nên routing phải đưa người vào đúng chỗ rủi ro cao.",
      "Confidence model tự báo chưa hiệu chuẩn: 0.9 không có nghĩa là đúng 90%. Ca tự tin cao vẫn có thể sai.",
      "Stratified random sampling (lấy mẫu ngẫu nhiên phân tầng): chia dữ liệu theo tầng (loại tài liệu, nhà cung cấp, trường) rồi lấy mẫu trong từng tầng. Guide dùng nó cho phần không qua người, để đo tỉ lệ lỗi thật và bắt pattern lỗi mới.",
      "Mâu thuẫn giữa các trang nhận ra trực tiếp được: output trích xuất có thể mang cờ, như <code>conflict_detected</code> trong ví dụ của notes."
    ],
    opts: [
      { k: "A", gist: "Review the extractions with the lowest model-reported confidence and those whose values conflict across pages first, then fill the remaining slots with a small random sample of the rest.",
        why: [
          "Dồn người vào hai nhóm rủi ro cao: confidence thấp và trang mâu thuẫn (ý 1). Đúng cách guide chia sức review có hạn.",
          "Chỗ còn lại lấy một mẫu ngẫu nhiên nhỏ từ phần còn lại. Mẫu này đo tỉ lệ lỗi của nhóm tự tin cao và bắt ca model tự tin mà vẫn sai (ý 2, ý 3).",
          "Vừa bắt lỗi ở chỗ dễ sai nhất, vừa không bỏ mù phần không ai xem: thỏa cả hai điều đề đòi."
        ] },
      { k: "B", gist: "Review a random 8% sample of the day's extractions, drawn from each document type so every format is covered, without regard to confidence score or whether a document's pages disagree.",
        why: [
          "Sai ở chỗ bỏ qua tín hiệu rủi ro đang có sẵn: ca confidence thấp và ca trang mâu thuẫn có thể không lọt vào 8% (ý 1).",
          "Sức review bị rải đều lên cả ca ít rủi ro. Những ca dễ sai nhất có thể đi thẳng xuống hệ thống sau mà không ai xem.",
          "Dễ bị cuốn vì “ngẫu nhiên, phân tầng theo loại” nghe đúng chất bài 5.5. Nhưng phân tầng là để đo tỉ lệ lỗi (ý 3), không phải cách chia sức review khi đã biết ca nào rủi ro."
        ] },
      { k: "C", gist: "Review the extractions from the longest documents first, working down to shorter ones until the 8% limit is reached, using page count as a stand-in for contradictory values.",
        why: [
          "Sai ở giả định: lấy số trang làm đại diện cho mâu thuẫn, trong khi mâu thuẫn nhận ra trực tiếp được (ý 4).",
          "Tài liệu dài chưa chắc mâu thuẫn, tài liệu ngắn vẫn có thể mâu thuẫn. Ca confidence thấp ở tài liệu ngắn bị bỏ qua hẳn."
        ] },
      { k: "D", gist: "Review the extractions with the highest confidence first, since they reach downstream systems most often, and send the lower-confidence ones through a second model extraction pass instead of a reviewer.",
        why: [
          "Ngược ưu tiên: dồn người vào nhóm tự tin cao, chỗ ít rủi ro nhất (ý 1).",
          "Ca confidence thấp, chỗ dễ sai nhất, lại giao cho model chạy thêm một lượt. Model chạy lại trên ca mơ hồ không thay được người xem, nên lỗi ở đó vẫn lọt."
        ] }
    ],
    refs: [
      { label: "Bài 5.5, mục “Vì sao phải stratified”: năng lực reviewer có hạn, đưa người vào chỗ rủi ro cao", href: NOTES + "#l-5-5" },
      { label: "Cheatsheet D5: các dòng về review người và hiệu chuẩn", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 2, n: 43, total: 60, sub: "1.6", subName: "Chia việc lớn",
    first: "A", answer: "C",
    ask: "An architect is choosing between prompt chaining and orchestrator-workers for a document pipeline that turns a PDF invoice into a structured JSON record, checks that required fields are present, and stores the record. Every invoice follows the same three-field schema and the steps never branch. What is the strongest argument for choosing prompt chaining here?",
    scene: [
      "Pipeline xử lý hóa đơn PDF có ba bước: đổi hóa đơn thành bản ghi JSON, kiểm đủ các trường bắt buộc, rồi lưu.",
      "Hóa đơn nào cũng theo cùng một schema ba trường, và các bước không bao giờ rẽ nhánh.",
      "Kiến trúc sư phân vân giữa prompt chaining và orchestrator-workers.",
      "Chỗ khó: cả bốn phương án đều chọn chaining, chỉ khác nhau ở lý do."
    ],
    asks: [
      "Lý do mạnh nhất để chọn prompt chaining ở đây là gì?",
      "Tức là: dấu hiệu nào trong đề phân biệt được chaining với orchestrator-workers.",
      "Soi từng lý do: nó có đúng sự thật không? Nếu đúng, nó có phân biệt được hai mẫu không, hay mẫu kia cũng y vậy?"
    ],
    facts: [
      "Prompt chaining: chuỗi lần gọi model với các bước định sẵn trong code, output bước trước là input bước sau. Hợp với việc biết trước các bước.",
      "Orchestrator-workers (điều phối và thợ): một model chia việc lúc chạy, giao cho các lần gọi con, rồi tổng hợp. Dùng khi không đoán trước được cần những việc con nào.",
      "Cả hai mẫu đều làm việc nhiều bước. Cái quyết định là việc con biết trước hay chỉ lộ ra lúc chạy.",
      "JSON đúng cấu trúc đến từ <code>tool_use</code> kèm JSON schema (bài 4.3), không đến từ cách chia bước."
    ],
    opts: [
      { k: "A", gist: "Chaining is the standard pattern for multi-step workflows, so a convert, validate and store pipeline calls for it rather than an orchestrator.",
        why: [
          "Kết luận đúng (chọn chaining), nhưng lý do không phân biệt được hai mẫu: orchestrator-workers cũng làm việc nhiều bước (ý 3).",
          "Theo lý do của A, việc nhiều bước nào cũng phải chaining, kể cả việc mà bước con chỉ lộ ra lúc chạy. Ca đó lại đúng là của orchestrator-workers (ý 2).",
          "Dễ bị cuốn vì kết luận đúng và lý do nghe như định nghĩa sách vở. Nhưng “multi-step” (nhiều bước) không phải dấu hiệu; dấu hiệu là việc con biết trước. Hai phương án cùng kết luận thì chọn cái có lý do bám dữ kiện đề."
        ] },
      { k: "B", gist: "Chaining lets validation run as its own prompt step, a check that orchestrator-workers cannot add, which favours it for this pipeline.",
        why: [
          "Bịa giới hạn: orchestrator-workers vẫn giao được bước kiểm cho một worker (ý 2). Bước kiểm riêng không phải thứ chỉ chaining mới có.",
          "Lý do dựa trên một điều sai thì không thể là lý do mạnh nhất, dù kết luận chọn chaining đúng."
        ] },
      { k: "C", gist: "Chaining suits subtasks that are known up front and run in a set order, so no orchestrator is needed to plan or delegate the work at runtime.",
        why: [
          "Đề cho đủ hai dấu hiệu: mọi hóa đơn cùng schema ba trường, các bước không rẽ nhánh. Việc con biết trước, chạy theo thứ tự cố định: đúng ca prompt chaining (ý 1).",
          "Không có gì phải lập kế hoạch lúc chạy, nên thêm orchestrator chỉ thêm chi phí và thêm chỗ chạy lệch (ý 2).",
          "Đây là lý do duy nhất phân biệt được hai mẫu (ý 3), đúng điều đề hỏi."
        ] },
      { k: "D", gist: "Chaining yields more accurate JSON than orchestrator-workers across task types, so it is the stronger choice for extracting invoice fields too.",
        why: [
          "Bịa quy luật: không có chuyện chaining cho JSON chính xác hơn orchestrator-workers ở mọi loại việc.",
          "Độ đúng của JSON đến từ tool kèm schema (ý 4). Đổi cách chia bước không làm JSON đúng hơn."
        ] }
    ],
    refs: [
      { label: "Bài 1.6: prompt chaining (bước biết trước) và dynamic adaptive decomposition (bước sinh ra lúc chạy)", href: NOTES + "#l-1-6" },
      { label: "Bài 1.6, mục “Biết thêm” (đã sửa 02/11): năm mẫu workflow và dấu hiệu nhận ra từng mẫu", href: NOTES + "#fix-17" }
    ]
  },
  {
    de: 2, n: 44, total: 60, sub: "1.3", subName: "Gọi subagent, truyền context",
    first: "C", answer: "C",
    ask: "A subagent named “test-runner” is defined with its tools set to <code>[\"Bash\", \"Read\", \"Grep\"]</code>. The coordinator that spawns it has a deny rule in <code>settings.local.json</code> that blocks Bash. When the coordinator hands a task to test-runner, will the subagent be able to run Bash commands?",
    scene: [
      "Subagent tên test-runner khai <code>tools: [\"Bash\", \"Read\", \"Grep\"]</code>.",
      "Coordinator (agent điều phối, bên tạo subagent) có một luật deny chặn Bash trong <code>settings.local.json</code>.",
      "Chỗ khó: hai cấu hình chọi nhau. Subagent ghi rõ có Bash, còn settings thì cấm Bash."
    ],
    asks: [
      "Coordinator giao việc cho test-runner, subagent có chạy được lệnh Bash không?",
      "Tức là: <code>tools</code> của subagent và luật deny trong settings, cái nào thắng, và vì sao.",
      "Hai phương án nói “có”, hai nói “không”. Với hai cái nói “không”, soi tiếp lý do."
    ],
    facts: [
      "Field <code>tools</code> của subagent chỉ thu hẹp: subagent chọn trong số tool hội thoại chính đang có, không mở thêm quyền.",
      "Luật <code>permissions.deny</code> trong settings, kể cả <code>settings.local.json</code>, áp cho cả hội thoại chính lẫn subagent.",
      "Claude Code xét luật theo thứ tự deny → ask → allow, nên deny luôn thắng.",
      "Task (bản mới tên <code>Agent</code>) là tool để tạo subagent. Coordinator cần nó; subagent chỉ cần khi muốn tự tạo subagent con."
    ],
    opts: [
      { k: "A", gist: "Yes. The subagent's tools list grants Bash, and that grant overrides the coordinator's deny rule.",
        why: [
          "Sai ở giả định: coi <code>tools</code> là giấy phép vượt luật deny. Thật ra nó chỉ thu hẹp bộ tool subagent nhận từ hội thoại chính (ý 1).",
          "Deny được xét trước allow (ý 3), nên test-runner gọi Bash vẫn bị chặn."
        ] },
      { k: "B", gist: "No. A subagent's tools list only takes effect once Task is also listed in it, so Bash stays unavailable to test-runner.",
        why: [
          "Kết luận đúng, lý do bịa. Subagent không cần Task trong <code>tools</code> mới dùng được Bash, Read, Grep (ý 4).",
          "Bash bị chặn là vì luật deny được kế thừa (ý 2). Theo lý do của B, thêm Task vào <code>tools</code> là Bash chạy được, mà điều đó sai.",
          "Dễ bị cuốn vì kết luận “No” đúng, và lý do nghe quen: bài 1.3 có luật “coordinator cần Task trong allowedTools”. Nhưng luật đó áp cho bên <b>gọi</b> subagent, không phải điều kiện để subagent dùng tool của chính nó."
        ] },
      { k: "C", gist: "No. The subagent inherits the coordinator's deny rules from <code>settings.local.json</code>, so its Bash calls are blocked.",
        why: [
          "Luật deny Bash trong <code>settings.local.json</code> áp cho cả subagent (ý 2).",
          "<code>tools</code> chỉ chọn ra một phần trong số tool đang được phép, không mở lại tool đã bị deny (ý 1). Test-runner liệt kê Bash thì Bash vẫn bị chặn.",
          "Đúng cả kết luận (không chạy được) lẫn lý do (kế thừa luật deny)."
        ] },
      { k: "D", gist: "Yes. Deny rules apply only to the coordinator's own session, so the subagent's Bash calls go through normally.",
        why: [
          "Sai ở giả định: luật deny không chỉ áp cho phiên của coordinator. Docs Claude Code ghi luật deny trong settings “applies to the main conversation and to subagents” (áp cho cả hội thoại chính lẫn subagent) (ý 2).",
          "Subagent chạy trong cùng phiên Claude Code nên chịu cùng bộ luật quyền. Nếu D đúng thì cứ tạo subagent là lách được mọi luật deny."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, ô “Đã sửa 02/11”: tools chỉ thu hẹp, luật deny áp cho cả subagent, subagent không cần Task", href: NOTES + "#fix-10" },
      { label: "Docs Subagents: luật deny trong settings áp cho cả subagent, tools chỉ thu hẹp bộ tool", href: "https://code.claude.com/docs/en/sub-agents" }
    ]
  },
  {
    de: 2, n: 45, total: 60, sub: "3.4", subName: "Plan mode hay làm thẳng",
    first: "B", answer: "A",
    ask: "A team wants Claude to evaluate three candidate caching strategies for a high-traffic API, each needing different changes to the request-handling layer, before any of them is implemented. Once a strategy is chosen, the actual code changes are expected to be small and confined to two files. How should the architect sequence this work?",
    scene: [
      "Team muốn Claude so ba chiến lược cache cho một API nhiều tải, trước khi làm cái nào.",
      "Mỗi chiến lược đòi sửa tầng xử lý request theo một kiểu khác.",
      "Chọn xong thì phần sửa code nhỏ, gọn trong hai file.",
      "Chỗ khó: việc có hai pha ngược tính chất. Pha đầu phải cân nhắc nhiều cách làm, pha sau nhỏ và đã rõ."
    ],
    asks: [
      "Kiến trúc sư nên xếp thứ tự công việc thế nào?",
      "Tức là: mỗi pha dùng chế độ nào, plan mode hay direct execution (làm thẳng).",
      "Soi từng phương án: chế độ đó có làm được việc của pha đó không (plan mode có sửa file không?), và có hợp với độ lớn của pha không?"
    ],
    facts: [
      "Plan mode là chế độ chỉ đọc: Claude đọc code, nghiên cứu, viết kế hoạch, không sửa file nào cho đến khi bạn duyệt kế hoạch.",
      "Direct execution là chế độ thường: bạn yêu cầu, Claude đọc và sửa luôn.",
      "Dùng plan mode khi có nhiều cách làm hợp lệ phải chọn, hoặc thay đổi lớn, nhiều file. Làm thẳng khi thay đổi nhỏ, phạm vi rõ.",
      "Guide gợi ý hai pha, hai chế độ: plan mode để khám phá và chốt cách làm, rồi chuyển sang direct execution để làm theo kế hoạch đã chốt."
    ],
    opts: [
      { k: "A", gist: "Use plan mode to compare the three caching options, then leave plan mode and use direct execution for the two-file edit on the chosen one.",
        why: [
          "Pha một có ba cách làm hợp lệ phải chọn, đúng việc của plan mode (ý 3). So trên kế hoạch, chưa đụng code.",
          "Pha hai nhỏ, gọn trong hai file, phạm vi đã rõ: rời plan mode và làm thẳng (ý 2, ý 3).",
          "Đúng mẫu “hai pha, hai chế độ” của guide (ý 4)."
        ] },
      { k: "B", gist: "Use plan mode to compare the three caching options, then stay in plan mode to carry out the two-file edit on the chosen option.",
        why: [
          "Pha đầu đúng, pha sau sai. Plan mode không sửa file cho tới khi kế hoạch được duyệt (ý 1), nên muốn sửa hai file thì phải rời plan mode.",
          "Ở lại plan mode cho một thay đổi nhỏ đã rõ chỉ thêm bước thừa: Claude lại viết kế hoạch cho việc lẽ ra sửa luôn được.",
          "Dễ bị cuốn vì bắt đầu bằng plan mode là đúng, nên dễ nghĩ ở luôn trong đó cho trọn. Nhưng plan mode chỉ đọc; xong phần so sánh thì chuyển sang làm thẳng (ý 4)."
        ] },
      { k: "C", gist: "Use direct execution to compare the three caching options, then switch to plan mode to carry out the two-file edit once one is chosen.",
        why: [
          "Ngược hẳn: phần cần cân nhắc ba cách làm lại làm thẳng, còn phần nhỏ đã rõ lại đem vào plan mode (ý 3).",
          "Mà plan mode không sửa file (ý 1), nên tới pha hai vẫn chưa có thay đổi nào được làm."
        ] },
      { k: "D", gist: "Use direct execution to prototype each of the three caching options, then stay in direct execution to finalize the two-file edit on the best one.",
        why: [
          "Làm thẳng ba bản thử nghĩa là sửa code ba lần rồi bỏ hai, tốn công và dễ để lại thay đổi rác.",
          "Có nhiều cách làm phải chọn thì so trên kế hoạch trước, chưa đụng code (ý 3). Plan mode có mặt để mày nhìn thấy quyết định trước khi trả giá cho nó."
        ] }
    ],
    refs: [
      { label: "Bài 3.4: khung định nghĩa plan mode (chỉ đọc) và quy tắc plan trước, làm thẳng sau", href: NOTES + "#l-3-4" },
      { label: "Cheatsheet D3: dòng plan mode, direct execution, plan rồi execute", href: NOTES + "#cheat-d3" }
    ]
  },
  {
    de: 2, n: 46, total: 60, sub: "4.6", subName: "Review độc lập và review nhiều lượt",
    first: "B", answer: "D",
    ask: "An architect runs verification passes in which a reviewer instance labels each finding “high confidence” or “low confidence”. A colleague suggests dropping the independent reviewer and having the generator self-report its confidence on its own perceived flaws. What is the flaw in the colleague's proposal?",
    scene: [
      "Kiến trúc sư chạy các lượt kiểm chứng: một instance reviewer (một lần chạy Claude riêng) đọc code và ghi nhãn “high confidence” (tự tin cao) hay “low confidence” (tự tin thấp) cho từng finding (lỗi tìm được).",
      "Đồng nghiệp đề xuất bỏ reviewer độc lập, để chính generator (phiên sinh code) tự báo độ tự tin về những lỗi nó tự thấy.",
      "Chỗ khó: nghe như tiết kiệm được một instance mà nhãn confidence vẫn còn nguyên."
    ],
    asks: [
      "Đề xuất của đồng nghiệp sai ở đâu?",
      "Tức là: bỏ instance độc lập thì mất gì, và vì sao nhãn do generator tự ghi không thay được.",
      "Soi từng phương án: nó nói về tính độc lập của người chấm, hay về chuyện khác (quyền ghi file, phạm vi file, định dạng output)?"
    ],
    facts: [
      "Self-review: bảo chính phiên vừa sinh code tự kiểm lại. Phiên đó vẫn giữ lý do lúc viết, nên hay bênh quyết định của mình.",
      "Instance độc lập là một lần gọi hay session mới, context sạch, không thấy reasoning lúc sinh code. Guide: nó bắt lỗi tinh vi tốt hơn self-review.",
      "Ở pass kiểm chứng, confidence cạnh mỗi finding dùng để sắp ưu tiên người xem: finding tự tin thấp đưa người xem trước.",
      "Chia lượt theo file (multi-pass) là để chú ý của model khỏi bị dàn mỏng, không phải điều kiện để ghi confidence."
    ],
    opts: [
      { k: "A", gist: "The generator would need write access to the codebase to label its findings, so the labelling step would let it edit files and break the read-only review pass.",
        why: [
          "Bịa: ghi nhãn confidence chỉ là thêm một trường vào output, không cần quyền ghi file.",
          "Quyền truy cập cũng không liên quan tới chuyện nhãn có đáng tin hay không. Lỗi thật của đề xuất nằm ở người chấm (ý 1)."
        ] },
      { k: "B", gist: "Labels are calibrated one file at a time, so a generator rating findings across a whole multi-file change would produce scores that cannot be compared.",
        why: [
          "Bịa một luật không có: nhãn confidence không gắn với từng file, một instance vẫn chấm được finding trên cả thay đổi nhiều file.",
          "Chia lượt theo file là có thật trong bài 4.6, nhưng để chú ý khỏi bị dàn mỏng (ý 4), không phải điều kiện để điểm so được với nhau.",
          "Dễ bị cuốn vì mượn đúng ý “mỗi file một lượt” trong bài. Nhưng đề hỏi lỗi của việc bỏ reviewer độc lập, nên đáp án phải nói về tính độc lập (ý 2), không nói về phạm vi file."
        ] },
      { k: "C", gist: "The generator cannot return structured labels in the same response as its code, so each finding would need a second formatting pass before it could be used.",
        why: [
          "Sai: model trả được code kèm dữ liệu có cấu trúc trong cùng một lượt, ví dụ qua <code>tool_use</code> với JSON schema (bài 4.3).",
          "Kể cả phải thêm một lượt định dạng thì cũng chỉ tốn thêm chi phí, không làm nhãn sai. Lỗi thật của đề xuất là nhãn do chính generator ghi (ý 1)."
        ] },
      { k: "D", gist: "The generator labels findings in the same session that wrote the code, so its confidence rests on the same assumptions and shares the blind spots of that session.",
        why: [
          "Generator ghi nhãn ngay trong phiên đã viết code, vẫn giữ lý do lúc viết nên hay bênh quyết định của mình (ý 1).",
          "Lỗi nó không thấy lúc viết thì lúc tự chấm cũng không thấy, và nó vẫn ghi “high confidence”. Nhãn sai chỗ khiến đúng những chỗ cần xem bị xếp sau khi route cho người (ý 3).",
          "Nhãn confidence chỉ có giá trị khi do một instance độc lập, context sạch, ghi ra (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 4.6: khung “Self-review” và “Instance độc lập”, đoạn “Confidence đi kèm, không làm cổng”", href: NOTES + "#l-4-6" },
      { label: "Cheatsheet D4: reviewer độc lập thắng self-review và extended thinking", href: NOTES + "#cheat-d4" }
    ]
  },
  {
    de: 2, n: 47, total: 60, sub: "5.6", subName: "Giữ nguồn và xử lý mâu thuẫn khi tổng hợp",
    first: "B", answer: "B",
    ask: "An architect is designing the output schema for research subagents that feed a downstream synthesis agent writing a due-diligence report. Downstream agents must be able to verify and re-attribute every claim without re-reading the original documents. What should each subagent's structured output include for every extracted claim?",
    scene: [
      "Các subagent nghiên cứu trích claim (khẳng định cụ thể) từ tài liệu, rồi chuyển cho một agent tổng hợp viết báo cáo due diligence (báo cáo thẩm định).",
      "Kiến trúc sư đang thiết kế schema output cho các subagent đó.",
      "Chỗ khó: agent phía sau phải “verify and re-attribute” (kiểm lại và ghi lại nguồn) mọi claim mà không đọc lại tài liệu gốc."
    ],
    asks: [
      "Output có cấu trúc của mỗi subagent phải kèm gì cho từng claim?",
      "Tức là: cần những trường nào để agent sau tự kiểm claim và ghi nguồn, chỉ từ output này.",
      "Soi từng phương án hai câu: có chỉ ra tài liệu cụ thể không (để ghi nguồn)? Có lời gốc không (để kiểm)?"
    ],
    facts: [
      "Claim–source mapping: cấu trúc gắn mỗi claim với nguồn (URL hoặc tên tài liệu), trích đoạn (excerpt) và ngày. Nó phải đi theo claim qua mọi agent, không được viết lại thành văn xuôi trơn.",
      "Provenance là nguồn gốc của claim: tài liệu nào, đoạn nào. Attribution là việc ghi rõ nguồn đó cạnh claim.",
      "Agent ID và timestamp nói ai tạo finding và khi nào, không nói claim từ đâu ra. Notes xếp chúng vào nhóm bẫy."
    ],
    opts: [
      { k: "A", gist: "The claim text, the name of the subagent that extracted it, and the research task the coordinator assigned it.",
        why: [
          "Sai ở chỗ ghi nguồn gốc nội bộ (claim do agent nào, việc nào làm ra), không ghi nguồn tài liệu (ý 3).",
          "Biết subagent nào trích thì agent sau vẫn phải mở lại tài liệu gốc mới kiểm được claim, trái yêu cầu “without re-reading” (không đọc lại)."
        ] },
      { k: "B", gist: "The claim text, the name or URL of the source document, and the passage from that document that backs the claim.",
        why: [
          "Đúng claim–source mapping của bài 5.6 (ý 1).",
          "Tên hoặc URL tài liệu cho biết claim lấy từ đâu, nên agent sau ghi lại nguồn được (ý 2).",
          "Trích đoạn là lời gốc, nên agent sau so được với claim mà không phải mở lại tài liệu. Đủ cả “verify” lẫn “re-attribute”."
        ] },
      { k: "C", gist: "The claim text, a short summary of the surrounding paragraph, and the general subject area of the source.",
        why: [
          "Tóm tắt đoạn xung quanh là lời diễn đạt lại, không phải lời gốc, nên không dùng để kiểm claim được (ý 1).",
          "“General subject area” (lĩnh vực chung) không chỉ ra tài liệu cụ thể nào, nên không ghi lại nguồn được (ý 2)."
        ] },
      { k: "D", gist: "The claim text, a numeric confidence score from the subagent, and its rating of how reliable the source is.",
        why: [
          "Điểm tự tin và đánh giá độ tin của nguồn đều là ý kiến của subagent, không phải bằng chứng.",
          "Agent sau vẫn không biết claim lấy từ tài liệu nào, cũng không có câu gốc để đối chiếu (ý 1).",
          "Dễ bị cuốn vì confidence score nghe có cấu trúc, chuyên nghiệp. Nhưng cả kiểm lại lẫn ghi nguồn đều cần tên tài liệu và câu gốc, không cần điểm số."
        ] }
    ],
    refs: [
      { label: "Bài 5.6: khung “Claim–source mapping”, claim kèm nguồn, trích đoạn và ngày", href: NOTES + "#l-5-6" },
      { label: "Cheatsheet D5: claim-source mapping bảo toàn qua bước tổng hợp", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 2, n: 48, total: 60, sub: "3.2", subName: "Slash command và skill",
    first: "B", answer: "A",
    ask: "A team's <code>explore-alternatives</code> skill asks Claude to brainstorm several competing architecture approaches before settling on a recommendation. The team wants that exploratory back-and-forth kept separate from the main conversation, with only the final recommendation coming back to the user. Which configuration achieves this?",
    scene: [
      "Team có skill <code>explore-alternatives</code>: bảo Claude brainstorm vài hướng kiến trúc cạnh tranh nhau rồi mới chốt một đề xuất.",
      "Phần bàn tới bàn lui đó dài và lan man.",
      "Chỗ khó: team muốn phần đó nằm ngoài hội thoại chính, người dùng chỉ nhận đề xuất cuối."
    ],
    asks: [
      "Cấu hình nào làm được điều này?",
      "Tức là: trường frontmatter nào đổi <b>chỗ skill chạy</b>, để phần trung gian không đổ vào phiên chính.",
      "Soi từng trường: nó đổi chỗ skill chạy, hay chỉ đổi ai gọi skill và khi nào skill được nạp?"
    ],
    facts: [
      "<code>context: fork</code> cho skill chạy trong một subagent riêng. Output dài nằm lại trong context của subagent; phiên chính chỉ nhận kết quả gọn. Notes nêu đúng hai ca dùng: skill nói nhiều và skill lan man (brainstorm phương án).",
      "<code>disable-model-invocation: true</code>: chỉ người gọi được skill, model không tự kích hoạt.",
      "<code>user-invocable: false</code> giấu skill khỏi menu <code>/</code>, chỉ Claude tự gọi. <code>paths</code> cho Claude tự nạp skill khi đang làm với file khớp mẫu.",
      "Ba trường <code>disable-model-invocation</code>, <code>user-invocable: false</code> và <code>paths</code> đều không cô lập context. Chỉ <code>context: fork</code> mới cô lập."
    ],
    opts: [
      { k: "A", gist: "Set <code>context: fork</code> on the skill, so it runs in a subagent with its own context and hands back just its result to the caller.",
        why: [
          "<code>context: fork</code> cho skill chạy trong subagent có context riêng (ý 1).",
          "Phần brainstorm lan man nằm lại trong context đó. Hội thoại chính chỉ nhận đề xuất cuối, đúng điều team muốn.",
          "Đây là trường duy nhất đổi chỗ skill chạy (ý 4)."
        ] },
      { k: "B", gist: "Set <code>user-invocable: false</code> on the skill, so it is hidden from the slash menu and Claude loads it when the topic comes up.",
        why: [
          "Sai ở giả định: <code>user-invocable: false</code> chỉ giấu tên skill khỏi menu <code>/</code> (ý 3). Skill vẫn chạy ngay trong hội thoại chính (ý 4).",
          "Toàn bộ phần brainstorm vẫn hiện trong phiên chính, đúng thứ team muốn tách ra.",
          "Dễ bị cuốn vì “hidden from the slash menu” (giấu khỏi menu) nghe như giấu được phần brainstorm. Nhưng thứ bị giấu là tên skill, không phải output của nó."
        ] },
      { k: "C", gist: "Set <code>disable-model-invocation: true</code> on the skill, so a teammate starts the brainstorm by typing the command and Claude cannot trigger it.",
        why: [
          "Trường này chỉ đổi ai được gọi skill: người gõ lệnh, Claude không tự gọi (ý 2).",
          "Gọi xong thì skill vẫn chạy trong hội thoại chính (ý 4), phần brainstorm vẫn đổ vào đó."
        ] },
      { k: "D", gist: "Set <code>paths: docs/architecture/**</code> on the skill, so it loads when Claude works on files in the architecture folder.",
        why: [
          "<code>paths</code> chỉ quyết định lúc nào Claude tự nạp skill: khi đang làm với file khớp <code>docs/architecture/**</code> (ý 3).",
          "Nó không đổi chỗ skill chạy (ý 4). Nạp xong, skill vẫn brainstorm ngay trong hội thoại chính."
        ] }
    ],
    refs: [
      { label: "Bài 3.2: khung “Context cô lập (context: fork)” và mục “Biết thêm”: ba trường không cô lập context", href: NOTES + "#l-3-2" },
      { label: "Cheatsheet D3: dòng “Skill cho output dài / brainstorm làm bẩn phiên chính” → context: fork", href: NOTES + "#cheat-d3" }
    ]
  },
  {
    de: 2, n: 49, total: 60, sub: "1.6", subName: "Chia việc lớn",
    first: "B", answer: "C",
    ask: "A team is building an automated pipeline that takes a raw customer support transcript, produces a structured summary, then translates that summary into three fixed target languages. The steps and their order never change between runs. Which decomposition strategy fits this workflow best?",
    scene: [
      "Pipeline tự động nhận transcript (bản ghi thô) của một cuộc hỗ trợ khách, viết bản tóm tắt có cấu trúc, rồi dịch bản tóm tắt sang ba ngôn ngữ cố định.",
      "Các bước và thứ tự của chúng không bao giờ đổi giữa các lần chạy.",
      "Chỗ khó: bốn phương án là bốn cách chia việc, có cách nghe xịn hơn mức việc này cần."
    ],
    asks: [
      "Cách chia việc nào hợp nhất với workflow này?",
      "Tức là: chọn mẫu khớp với dấu hiệu “steps and their order never change” (bước và thứ tự không bao giờ đổi).",
      "Soi từng phương án: nó có lập kế hoạch lúc chạy không (thừa khi bước đã biết trước)? Nó có chỗ chặn bản tóm tắt hỏng trước khi đem dịch không?"
    ],
    facts: [
      "Prompt chaining: các bước cố định viết sẵn trong code, output bước trước là input bước sau. Hợp với việc biết trước các bước.",
      "Prompt chaining được chèn bước kiểm bằng code (“gate”) giữa hai lần gọi: không đạt thì dừng, không để lỗi chảy sang bước sau. Thêm bước kiểm vẫn là prompt chaining.",
      "Orchestrator-workers (điều phối và thợ): một model chia việc lúc chạy, giao cho các lần gọi con. Dùng khi không đoán trước được cần những việc con nào.",
      "Dynamic adaptive decomposition (chia việc thích ứng): bước không biết trước, agent xem đầu vào và kết quả khám phá rồi mới quyết bước sau. Hợp với việc mở."
    ],
    opts: [
      { k: "A", gist: "A single agent that reads the transcript and writes the three translations in one pass, folding summarization into it.",
        why: [
          "Gộp tóm tắt và dịch vào một lượt thì không còn chỗ chèn bước kiểm giữa hai việc (ý 2).",
          "Bản tóm tắt sai đi thẳng vào cả ba bản dịch mà không ai thấy. Lỗi một chỗ thành lỗi ở ba thứ tiếng."
        ] },
      { k: "B", gist: "An orchestrator agent that plans the summary and translation subtasks per transcript, then delegates them to workers.",
        why: [
          "Sai ở giả định: cần lập kế hoạch riêng cho từng transcript. Orchestrator-workers dành cho việc không đoán trước được việc con (ý 3), mà ở đây bước và thứ tự không bao giờ đổi.",
          "Lập kế hoạch lại cho mỗi transcript chỉ thêm chi phí và thêm chỗ chạy lệch.",
          "Dễ bị cuốn vì orchestrator nghe như kiến trúc xịn hơn, và “per transcript” (cho từng transcript) nghe linh hoạt. Nhưng đề đã cho dấu hiệu quyết định: bước không bao giờ đổi. B và D đều lập kế hoạch lúc chạy, chỉ khác tên gọi."
        ] },
      { k: "C", gist: "A fixed prompt chain that summarizes the transcript, runs a code-based check on the summary, then translates it.",
        why: [
          "Bước biết trước, thứ tự cố định (tóm tắt rồi dịch): đúng ca prompt chaining (ý 1).",
          "Bước kiểm bằng code giữa hai bước là “gate” (ý 2). Bản tóm tắt hỏng bị chặn lại trước khi bị dịch ra ba thứ tiếng.",
          "Thêm gate vẫn là chaining, không biến thành orchestrator-workers (ý 2)."
        ] },
      { k: "D", gist: "An adaptive agent that inspects the transcript first, then generates the subtasks needed to summarize and translate it.",
        why: [
          "Đây là chia việc thích ứng: việc con sinh ra sau khi xem đầu vào, chỉ hợp với việc mở (ý 4).",
          "Đề nói rõ các bước không bao giờ đổi, nên không có gì để thích ứng. Xem từng transcript rồi mới đặt bước chỉ thêm chi phí và thêm chỗ chạy lệch."
        ] }
    ],
    refs: [
      { label: "Bài 1.6: prompt chaining (bước biết trước) và dynamic adaptive decomposition (bước sinh ra lúc chạy)", href: NOTES + "#l-1-6" },
      { label: "Bài 1.6, mục “Biết thêm” (đã sửa 03/11): bước kiểm bằng code (“gate”) trong prompt chaining", href: NOTES + "#fix-25" },
      { label: "Bài 1.6, mục “Biết thêm” (đã sửa 02/11): năm mẫu workflow và dấu hiệu nhận ra từng mẫu", href: NOTES + "#fix-17" },
      { label: "Anthropic, Building effective agents: prompt chaining và “gate”", href: "https://www.anthropic.com/engineering/building-effective-agents" }
    ]
  },
  {
    de: 2, n: 50, total: 60, sub: "1.1", subName: "Vòng lặp agent",
    first: "C", answer: "C",
    ask: "An architect is building a client-side agent loop against the Messages API for a data-cleanup task. The first response has <code>stop_reason</code> set to <code>\"tool_use\"</code> and contains a <code>tool_use</code> block requesting a file-listing tool. What should the loop do next to correctly continue the agentic execution?",
    scene: [
      "Kiến trúc sư tự viết vòng lặp agent phía client, gọi thẳng Messages API, cho một việc dọn dữ liệu.",
      "Response đầu tiên có <code>stop_reason</code> là <code>\"tool_use\"</code>, kèm một block <code>tool_use</code> xin gọi tool liệt kê file.",
      "Chỗ khó: bốn phương án là tổ hợp của ba lựa chọn: gửi kết quả bằng loại block nào, đặt ở vai nào, có gửi lại lượt <code>tool_use</code> không. Chỉ một tổ hợp đúng cả ba."
    ],
    asks: [
      "Vòng lặp phải làm gì tiếp để chạy đúng?",
      "Tức là: gửi kết quả tool lại cho Claude thế nào để API ghép được với lời xin và Claude đọc được.",
      "Soi từng phương án theo ba điểm: loại block (<code>tool_result</code> hay text thường), vai (<code>user</code> hay <code>assistant</code>), và <code>messages</code> gửi lại có giữ lượt <code>tool_use</code> không."
    ],
    facts: [
      "Block <code>tool_result</code> là cách code gửi kết quả tool lại cho Claude. Nó mang <code>tool_use_id</code> trùng với <code>id</code> của lời xin.",
      "API chỉ có hai vai: <code>assistant</code> là những gì Claude viết, <code>user</code> là mọi thứ đi vào từ bên ngoài. Kết quả tool do code của mày tạo, nên <code>tool_result</code> nằm trong message <code>role: \"user\"</code>.",
      "API không nhớ gì giữa các lần gọi. Mỗi vòng phải gửi lại cả lịch sử trong <code>messages</code>, gồm nguyên response của Claude có block <code>tool_use</code>. Thiếu nó thì <code>tool_result</code> không có gì để khớp, API báo lỗi."
    ],
    opts: [
      { k: "A", gist: "Run the tool, add its output as a <code>tool_result</code> block with the matching <code>tool_use_id</code> in an <code>assistant</code> message, and resend the history without the <code>tool_use</code> turn.",
        why: [
          "Đúng loại block, nhưng sai vai: <code>tool_result</code> phải ở vai <code>user</code>, vì kết quả do code tạo chứ không phải Claude viết (ý 2).",
          "Bỏ lượt <code>tool_use</code> thì <code>tool_result</code> không còn lời xin nào để khớp, API báo lỗi (ý 3).",
          "Dễ bị cuốn vì đúng loại block và đúng <code>tool_use_id</code>, trông gần đúng. Nhưng chỉ đúng một trong ba điểm: sai vai và mất lượt <code>tool_use</code>."
        ] },
      { k: "B", gist: "Run the tool, add its output as a plain text block naming the <code>tool_use_id</code> in a <code>user</code> message, and resend the history without the <code>tool_use</code> turn.",
        why: [
          "Đúng vai <code>user</code>, nhưng dùng text thường thay cho <code>tool_result</code> (ý 1). Ghi tên <code>tool_use_id</code> trong chữ không biến nó thành block <code>tool_result</code>, nên API không ghép được kết quả với lời xin.",
          "Lại bỏ lượt <code>tool_use</code> (ý 3), sai thêm một chỗ nữa."
        ] },
      { k: "C", gist: "Run the tool, add its output as a <code>tool_result</code> block with the matching <code>tool_use_id</code> in a <code>user</code> message, and resend the history with the <code>tool_use</code> turn.",
        why: [
          "Đúng loại block và đúng vai: <code>tool_result</code> mang <code>tool_use_id</code> khớp lời xin (ý 1), nằm trong message vai <code>user</code> (ý 2).",
          "Đúng lịch sử: <code>messages</code> gửi lại giữ nguyên message <code>assistant</code> chứa <code>tool_use</code>, ngay sau là message <code>user</code> chứa <code>tool_result</code> (ý 3). Ví dụ minh họa:<pre><code>user      → \"Dọn thư mục data\"\nassistant → tool_use { id: \"tu_1\", name: \"list_files\" }\nuser      → tool_result { tool_use_id: \"tu_1\", content: \"...\" }</code></pre>",
          "API ghép được kết quả với lời xin; Claude đọc rồi xin tool tiếp hoặc trả lời. Vòng lặp chạy tiếp đúng cách."
        ] },
      { k: "D", gist: "Run the tool, add its output as a plain text block naming the <code>tool_use_id</code> in an <code>assistant</code> message, and resend the history with the <code>tool_use</code> turn.",
        why: [
          "Text thường không phải <code>tool_result</code> (ý 1), nên API không ghép được kết quả với lời xin. Claude chỉ thấy một đoạn chữ.",
          "Đặt ở vai <code>assistant</code> là giả làm Claude tự nói (ý 2). Chỉ đúng mỗi phần giữ lượt <code>tool_use</code>."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D1, mục 5 “Chạy thử một ca thật, từng vòng”: messages vòng 2 và sơ đồ tuần tự", href: NOTES + "#seq-1-0" },
      { label: "Bài Nền tảng D1, đoạn “Vì sao tool_result nằm ở vai user?”", href: NOTES + "#l-1-0" },
      { label: "Bài 1.1 “Vòng lặp agent: khi nào chạy tiếp, khi nào dừng”", href: NOTES + "#l-1-1" }
    ]
  },
  {
    de: 2, n: 51, total: 60, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema",
    first: "C", answer: "B",
    ask: "A financial services firm uses a tool-based schema to extract transaction records from PDF statements, including a required <code>amount</code> field and a required <code>transaction_type</code> field. An audit later finds several cases where deposits were labelled as withdrawals, even though every <code>amount</code> and <code>transaction_type</code> field is present and passes schema validation. What does this best illustrate about JSON schema enforcement via tool use?",
    scene: [
      "Một công ty tài chính dùng tool có <code>input_schema</code> để trích giao dịch từ sao kê PDF. Hai trường bắt buộc: <code>amount</code> (số tiền) và <code>transaction_type</code> (loại giao dịch).",
      "Kiểm toán phát hiện vài khoản tiền vào (deposit) bị ghi thành tiền ra (withdrawal).",
      "Chỗ khó: bản ghi nào cũng đủ hai trường và qua validate schema. Hình dạng đúng hết, chỉ nội dung sai. Ví dụ minh họa:<pre><code>Sao kê gốc:   +2.000.000  (tiền vào)\nJSON trả về:  { \"amount\": 2000000, \"transaction_type\": \"withdrawal\" }</code></pre>"
    ],
    asks: [
      "Chuyện này nói lên điều gì về việc ép JSON schema bằng tool use?",
      "Tức là: schema bảo đảm được gì, và không bảo đảm được gì?",
      "Soi từng phương án: nó có gán cho schema, strict mode hay <code>tool_choice</code> một khả năng mà chúng không có không?"
    ],
    facts: [
      "Tool + <code>input_schema</code> chỉ bảo đảm <b>cú pháp</b>: JSON đọc được, đúng hình dạng, đủ trường bắt buộc, đúng kiểu. Nó không bảo đảm <b>ngữ nghĩa</b>, tức nội dung có đúng với tài liệu gốc không.",
      "<code>strict: true</code> là cờ trên định nghĩa tool, buộc tham số Claude điền phải khớp schema tuyệt đối. Nó compile schema thành grammar và không cho trường ngoài schema, nhưng vẫn chỉ lo hình dạng.",
      "<code>tool_choice</code> chỉ quyết định Claude có bắt buộc gọi tool không: <code>auto</code>, <code>any</code>, hoặc ép đúng một tool theo tên.",
      "Lỗi ngữ nghĩa phải bắt bằng validator: code của app chạy ngay sau khi nhận JSON và đối chiếu nội dung (bài 4.4)."
    ],
    opts: [
      { k: "A", gist: "It proves that without a <code>tool_choice</code> forcing a specific tool, the model may output <code>transaction_type</code> labels that diverge from the source document, causing semantic errors in the extracted data.",
        why: [
          "Sai ở giả định: <code>tool_choice</code> chỉ quyết định có phải gọi tool không, và gọi tool nào (ý 3). Nó không đụng tới giá trị model điền vào.",
          "Ở đây model đã gọi tool và trả đủ trường. Ép tool thì vẫn ra đúng hình dạng đó, nhãn <code>withdrawal</code> sai vẫn sai."
        ] },
      { k: "B", gist: "Schema validation confirms that required fields exist and have the right types, but it cannot verify that the values are semantically correct against the source document, so mislabelling like this can still happen.",
        why: [
          "Schema chỉ biết <code>transaction_type</code> phải có và là chuỗi. Nó không đọc sao kê để biết dòng đó là tiền vào hay tiền ra (ý 1).",
          "Nên bản ghi nhầm nhãn vẫn qua validate: đúng cú pháp, sai ngữ nghĩa. Đây đúng là điều đề muốn minh họa.",
          "Muốn bắt lỗi này thì thêm validator sau khi nhận JSON (ý 4), ví dụ so dấu của số tiền trong sao kê với loại giao dịch."
        ] },
      { k: "C", gist: "This only happens when strict mode is off, because strict mode enforces that field values satisfy the schema's semantic rules, such as <code>transaction_type</code> matching the sign of <code>amount</code>, which prevents mislabelling.",
        why: [
          "Bịa tính năng: strict mode chỉ ép output khớp cấu trúc schema (ý 2). Nó không có “luật ngữ nghĩa” nào, không so <code>transaction_type</code> với dấu của <code>amount</code>.",
          "Bật strict thì model vẫn ghi được <code>withdrawal</code> cho một khoản tiền vào, và bản ghi vẫn hợp lệ.",
          "Dễ bị cuốn vì strict mode có thật và nghe như “chặt hơn nữa”. Nhưng nó chặt về hình dạng, không phải về nội dung."
        ] },
      { k: "D", gist: "The <code>input_schema</code> was probably malformed, since a correctly built JSON schema can apply constraints that check the relationship between <code>amount</code> and <code>transaction_type</code> and prevent this mislabelling.",
        why: [
          "Sai ở giả định: output đã qua validate, nên schema không “hỏng”. Lỗi ở đây là ngữ nghĩa, không phải cú pháp (ý 1).",
          "Kể cả viết thêm ràng buộc giữa hai trường, schema vẫn không biết sao kê gốc ghi gì. Model ghi <code>withdrawal</code> kèm một số tiền hợp lệ thì vẫn qua.",
          "Notes 4.3 có đúng “bẫy ngược” này: schema chặt rồi mà nội dung vẫn sai thì đừng chọn “schema sai”."
        ] }
    ],
    refs: [
      { label: "Bài 4.3: khung “Cú pháp vs ngữ nghĩa” và ô “Bẫy ngược”: đừng chọn “schema sai”", href: NOTES + "#l-4-3" },
      { label: "Bài 4.4: validator bắt lỗi ngữ nghĩa ngay sau khi nhận JSON", href: NOTES + "#l-4-4" },
      { label: "Cheatsheet D4: dòng “Tổng line item ≠ total dù schema chặt”", href: NOTES + "#cheat-d4" }
    ]
  },
  {
    de: 2, n: 52, total: 60, sub: "1.4", subName: "Workflow nhiều bước có cổng chặn và bàn giao",
    first: "A", answer: "C",
    ask: "A team registers three independent PreToolUse hooks for <code>process_refund</code>: one checks identity verification, one checks the fraud score, and one logs the attempt for audit. On one ticket, the verification hook returns <code>\"deny\"</code>, the fraud-score hook returns <code>\"allow\"</code>, and the logging hook returns an empty object. What happens to the tool call?",
    scene: [
      "Team gắn ba hook <code>PreToolUse</code> độc lập cho <code>process_refund</code>: một hook kiểm đã xác minh danh tính chưa, một hook kiểm điểm gian lận (fraud score), một hook ghi log để kiểm toán.",
      "Trên một ticket, ba hook trả ba kiểu khác nhau. Ví dụ minh họa:<pre><code>hook xác minh     → \"deny\"\nhook fraud score  → \"allow\"\nhook ghi log      → {}</code></pre>",
      "Chỗ khó: các hook nói ngược nhau. Phải biết khi đó kết quả được gộp theo luật nào."
    ],
    asks: [
      "Tool call <code>process_refund</code> sẽ ra sao?",
      "Tức là: nhiều hook <code>PreToolUse</code> cùng khớp một tool call mà trả quyết định khác nhau thì luật gộp là gì?",
      "Soi từng phương án: luật nó nêu (theo thứ tự, theo đa số, chuyển sang hỏi, cái chặt nhất thắng) có thật không?"
    ],
    facts: [
      "<code>PreToolUse</code> trả một trong bốn quyết định: <code>allow</code> (cho chạy), <code>ask</code> (hỏi người dùng), <code>deny</code> (từ chối), <code>defer</code> (hoãn, app chạy tiếp tool call đó sau).",
      "Nhiều hook trên cùng một sự kiện chạy song song, không theo thứ tự cố định. Không có hook nào “trả sau cùng” để ghi đè.",
      "Nhiều hook trả khác nhau thì cái chặt nhất thắng: <code>deny</code> &gt; <code>defer</code> &gt; <code>ask</code> &gt; <code>allow</code>.",
      "Hook trả object rỗng <code>{}</code> là không đưa ra quyết định nào, không phải một phiếu cho phép."
    ],
    opts: [
      { k: "A", gist: "The call proceeds, because hooks are applied in order and the last hook to return a decision, the fraud-score hook's allow, takes effect.",
        why: [
          "Sai ở giả định: hook không chạy lần lượt để cái sau ghi đè cái trước. Chúng chạy song song, xong theo thứ tự không cố định (ý 2).",
          "Luật gộp là cái chặt nhất thắng (ý 3). Có một <code>deny</code> thì refund bị chặn, dù hook fraud trả <code>allow</code>.",
          "Dễ bị cuốn vì nghe giống middleware quen thuộc: chạy theo chuỗi, cái sau đè cái trước. Nhưng hook của Claude Code và Agent SDK không có “thứ tự” để mà dựa vào."
        ] },
      { k: "B", gist: "The call proceeds, because the decision follows the majority of hooks and two of the three did not object to the refund.",
        why: [
          "Sai ở giả định: không có bỏ phiếu đa số. Chỉ cần một hook trả <code>deny</code> là đủ chặn (ý 3).",
          "Hook ghi log trả <code>{}</code> là không có ý kiến (ý 4), nên cũng chẳng có “hai trên ba” nào ủng hộ refund."
        ] },
      { k: "C", gist: "The call is blocked, because the strictest result among the hooks takes effect and deny ranks above the other hooks' results.",
        why: [
          "Ba kết quả: một <code>deny</code>, một <code>allow</code>, một hook không quyết gì. <code>deny</code> đứng đầu thứ tự ưu tiên (ý 3), nên tool call bị chặn.",
          "Hook chạy theo thứ tự nào cũng vậy (ý 2): kết quả gộp lần nào cũng như nhau.",
          "Đúng tinh thần cổng chặn: chỉ cần một kiểm tra thất bại là refund không chạy."
        ] },
      { k: "D", gist: "The call pauses for manual approval from the user, because mixed hook decisions are resolved by asking rather than picking a side.",
        why: [
          "Bịa luật: quyết định lẫn lộn không tự chuyển thành <code>ask</code>. Chỉ khi cái chặt nhất là <code>ask</code> thì mới hỏi người dùng (ý 3).",
          "Ở đây có <code>deny</code>, đứng trên <code>ask</code>, nên bị chặn luôn, không hỏi ai."
        ] }
    ],
    refs: [
      { label: "Bài 1.5, ô “Đã sửa 02/11”: bốn quyết định của PreToolUse, nhiều hook thì cái chặt nhất thắng", href: NOTES + "#fix-11" },
      { label: "Bài 1.4, mục “Biết thêm”: nhiều hook trên cùng một sự kiện chạy song song", href: NOTES + "#l-1-4" },
      { label: "Docs Agent SDK hooks: “Register multiple hooks”, cái chặt nhất thắng", href: "https://code.claude.com/docs/en/agent-sdk/hooks" }
    ]
  },
  {
    de: 2, n: 53, total: 60, sub: "1.1", subName: "Vòng lặp agent",
    first: "C", answer: "C",
    ask: "An architect is choosing between two designs for an incident-response agent. Design X lets Claude choose which diagnostic tool to call next based on the evolving conversation. Design Y hardcodes a fixed sequence (check logs, then check metrics, then restart the service) regardless of what earlier tool results reveal. Which statement correctly characterizes the tradeoff?",
    scene: [
      "Kiến trúc sư đang chọn giữa hai thiết kế cho agent xử lý sự cố (incident-response).",
      "Thiết kế X: Claude tự chọn tool chẩn đoán gọi tiếp theo, dựa vào diễn biến cuộc hội thoại.",
      "Thiết kế Y: chuỗi cố định viết sẵn (xem log → xem metric → restart service), chạy “regardless of what earlier tool results reveal” (bất kể kết quả tool trước cho thấy gì).",
      "Chỗ khó: các phương án sai hoặc đảo vai X và Y, hoặc gán cho chúng hành vi mà đề không tả."
    ],
    asks: [
      "Câu nào mô tả đúng sự đánh đổi giữa X và Y?",
      "Tức là: nhận ra X là kiểu agent (model chọn bước tiếp), Y là chuỗi hard-code, rồi chọn câu tả đúng cả hai.",
      "Soi từng phương án: câu đó có khớp với cách đề tả X và Y không, hay nói ngược?"
    ],
    facts: [
      "Agent: Claude + bộ tool + vòng lặp, trong đó Claude tự quyết gọi tool nào, theo thứ tự nào, bao nhiêu lần, khi nào thì xong, dựa trên kết quả vừa thấy. Code không vạch trước các bước, chỉ chạy những gì Claude xin.",
      "Guide gọi kiểu agent là model-driven decision-making (model tự ra quyết định), đối lập với decision tree hard-code (cây quyết định viết chết trong code).",
      "Workflow viết sẵn: code vạch đường đi, tool chạy theo thứ tự cố định. Dễ đoán, nhưng không đổi theo điều vừa phát hiện."
    ],
    opts: [
      { k: "A", gist: "Design X has the model call the full toolset on each turn, which raises cost per incident, while Design Y calls only its three scripted tools.",
        why: [
          "Sai ở giả định: X không gọi cả bộ tool mỗi lượt. Claude chỉ xin gọi tool nó thấy cần, code chỉ chạy những gì Claude xin (ý 1).",
          "Thực tế ngược lại: X có thể dừng sớm khi đã ra nguyên nhân, còn Y lần nào cũng chạy đủ ba bước."
        ] },
      { k: "B", gist: "Design X keeps tool order predictable for auditing across incidents, while Design Y lets the order shift with what the logs and metrics show.",
        why: [
          "Đảo vai: thứ tự cố định, dễ đoán để kiểm toán là Y (ý 3), không phải X.",
          "X mới là thiết kế cho thứ tự đổi theo những gì log và metric cho thấy (ý 1)."
        ] },
      { k: "C", gist: "Design X lets the model pick its next step from the last tool's output, while Design Y runs three scripted steps in the same order each time.",
        why: [
          "X là model-driven decision-making: Claude đọc output của tool vừa chạy rồi tự chọn bước tiếp (ý 1, ý 2).",
          "Y là chuỗi hard-code: lần nào cũng xem log, xem metric, restart, đúng thứ tự đó, kể cả khi log đã chỉ ra nguyên nhân (ý 3).",
          "C tả đúng cả hai, nên nói đúng sự đánh đổi: X thích ứng với điều vừa phát hiện, Y đoán trước được nhưng cứng."
        ] },
      { k: "D", gist: "Design X risks restarting a service before diagnosis, while Design Y avoids needless restarts by gating its restart step on the metrics check.",
        why: [
          "Sai với chính đề: Y chạy đủ chuỗi “regardless of what earlier tool results reveal” (bất kể kết quả trước là gì), nên Y không có cổng nào chặn bước restart.",
          "Lần nào Y cũng restart, nên chính Y mới là cái có thể restart thừa.",
          "Dễ bị cuốn vì agent tự chọn tool nghe có vẻ liều hơn chuỗi cố định. Nhưng D gán cho Y một bước kiểm metric trước khi restart mà đề không hề có."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D1: bảng workflow và agent, đoạn “model-driven decision-making” đối lập với decision tree hard-code", href: NOTES + "#l-1-0" },
      { label: "Bài 1.1 “Vòng lặp agent: khi nào chạy tiếp, khi nào dừng”", href: NOTES + "#l-1-1" }
    ]
  },
  {
    de: 2, n: 54, total: 60, sub: "3.2", subName: "Slash command và skill",
    first: "C", answer: "D",
    ask: "A contractor clones a repository containing a project skill at <code>.claude/skills/publish/SKILL.md</code>, whose frontmatter sets <code>allowed-tools: Bash(npm publish *)</code>. The skill's instructions tell Claude to run <code>npm run build &amp;&amp; npm publish</code> to publish the package. On first opening the project in Claude Code, a workspace trust dialog appears, but the contractor dismisses it without accepting. Invoking the skill still prompts for approval before the build-and-publish command finishes. What is the most likely explanation?",
    scene: [
      "Contractor clone một repo có skill project tại <code>.claude/skills/publish/SKILL.md</code>. Frontmatter khai <code>allowed-tools: Bash(npm publish *)</code>.",
      "Chỉ dẫn trong skill bảo Claude chạy <code>npm run build &amp;&amp; npm publish</code> để publish gói.",
      "Lần đầu mở project, hộp thoại workspace trust (tin thư mục làm việc) hiện ra, contractor đóng đi mà không chấp nhận.",
      "Gọi skill thì lệnh build-và-publish vẫn hỏi duyệt trước khi chạy xong. Chỗ khó: đề cài sẵn hai nghi phạm, hộp thoại trust bị bỏ qua và rule chỉ ghi <code>npm publish</code>."
    ],
    asks: [
      "Giải thích hợp lý nhất cho việc vẫn bị hỏi duyệt là gì?",
      "Tức là: tìm đúng lý do <code>allowed-tools</code> không phủ hết lệnh này.",
      "Soi từng phương án: điều kiện nó gán cho <code>allowed-tools</code> (phải fork, phải trust, phải nằm trong settings, xét từng lệnh con) có thật không?"
    ],
    facts: [
      "<code>allowed-tools</code> trong frontmatter của skill là danh sách tool được duyệt sẵn: Claude dùng chúng không hỏi quyền trong lượt gọi skill. Không có điều kiện phải chạy <code>context: fork</code>.",
      "Workspace trust không chặn trường này: Claude Code áp <code>allowed-tools</code> của skill project kể cả trong thư mục chưa từng chấp nhận trust.",
      "Claude Code nhận ra các dấu nối lệnh <code>&amp;&amp;</code>, <code>||</code>, <code>;</code>, <code>|</code> và tách lệnh ghép thành lệnh con. Lệnh ghép chỉ chạy không hỏi khi mọi lệnh con đều được phép.",
      "<code>context: fork</code> cho skill chạy trong một subagent riêng. Nó lo cô lập context, không lo chuyện quyền."
    ],
    opts: [
      { k: "A", gist: "<code>allowed-tools</code> pre-approves commands only for skills running as a forked subagent via <code>context: fork</code>; this skill runs inline in the main conversation, so its Bash commands follow the default approval rules.",
        why: [
          "Bịa điều kiện: <code>allowed-tools</code> áp cả cho skill chạy ngay trong hội thoại chính, trong lượt gọi skill (ý 1). <code>context: fork</code> chỉ lo cô lập context (ý 4).",
          "Đổi sang fork cũng không hết hỏi: phần <code>npm run build</code> vẫn không khớp rule nào (ý 3)."
        ] },
      { k: "B", gist: "Project skills get their <code>allowed-tools</code> grant only after the workspace is trusted; with the dialog dismissed, Claude Code ignores the frontmatter and Bash commands from the skill follow the default approval rules.",
        why: [
          "Sai với docs: “Workspace trust doesn't gate this field” (workspace trust không chặn trường này) (ý 2). Đóng hộp thoại trust thì <code>allowed-tools</code> vẫn được áp.",
          "Vậy lý do bị hỏi phải nằm ở chỗ khác, chính là lệnh ghép.",
          "Dễ bị cuốn vì đề cố tình kể chi tiết bỏ qua hộp thoại trust, nghe như một chốt an toàn hợp lý. Nhưng đó là mồi nhử: notes còn dặn đọc <code>allowed-tools</code> của repo lạ trước khi chạy, chính vì trust không chặn được nó."
        ] },
      { k: "C", gist: "Pre-approval for <code>npm publish</code> has to come from a <code>permissions.allow</code> rule in <code>.claude/settings.json</code>; the skill's <code>allowed-tools</code> field only lists tools the skill can use, so its Bash commands follow the default approval rules.",
        why: [
          "Sai nửa đầu: <code>allowed-tools</code> có duyệt sẵn, không chỉ “liệt kê tool skill được dùng” (ý 1).",
          "Nửa sau đúng (lệnh vẫn hỏi) nhưng sai lý do. Chuyển rule sang <code>settings.json</code> thì <code>Bash(npm publish *)</code> vẫn chỉ phủ phần publish, phần <code>npm run build</code> vẫn hỏi (ý 3).",
          "Dễ bị cuốn vì guide chấm <code>allowed-tools</code> theo nghĩa “restrict tool access” (giới hạn tool). Nhưng docs hiện tại nói rõ đây là danh sách duyệt sẵn, dùng không hỏi quyền."
        ] },
      { k: "D", gist: "The <code>Bash(npm publish *)</code> pattern covers only the publish command; Claude Code evaluates each part of a chained command separately, so the <code>npm run build</code> part follows the default approval rules.",
        why: [
          "Lệnh <code>npm run build &amp;&amp; npm publish</code> bị tách thành hai lệnh con (ý 3).",
          "<code>npm publish</code> khớp <code>Bash(npm publish *)</code>, còn <code>npm run build</code> không khớp rule nào. Mọi lệnh con phải được phép thì lệnh ghép mới chạy không hỏi, nên Claude Code vẫn hỏi.",
          "Trust (ý 2) và kiểu chạy inline (ý 1) không liên quan: lý do duy nhất là phần build chưa được duyệt."
        ] }
    ],
    refs: [
      { label: "Bài 3.2, mục “Biết thêm” (đã sửa 03/11): lệnh ghép xét từng lệnh con", href: NOTES + "#fix-26" },
      { label: "Bài 3.2, mục “Biết thêm” (đã sửa 03/11): allowed-tools không cần workspace trust", href: NOTES + "#fix-27" },
      { label: "Bài 3.2: allowed-tools là danh sách tool duyệt sẵn trong lượt skill chạy", href: NOTES + "#l-3-2" },
      { label: "Docs Permissions: mục “Compound commands”", href: "https://code.claude.com/docs/en/permissions" }
    ]
  },
  {
    de: 2, n: 55, total: 60, sub: "2.3", subName: "Chia tool cho agent và tool_choice",
    first: "A", answer: "B",
    ask: "A legal-document analysis agent has a single <code>retrieve_clause</code> tool that can pull arbitrary text ranges from any uploaded file by byte offset, which the model frequently misuses to grab unrelated or malformed spans. The team wants to replace it with a constrained alternative that only ever returns whole, well-defined clauses. Which redesign best follows the pattern of replacing a generic tool with a constrained one?",
    scene: [
      "Agent phân tích tài liệu pháp lý chỉ có một tool <code>retrieve_clause</code>: kéo một khoảng chữ bất kỳ từ bất kỳ file nào đã tải lên, theo byte offset (vị trí byte đầu và cuối).",
      "Model hay dùng sai: lấy ra đoạn không liên quan, hoặc đoạn hỏng, cắt ngang một điều khoản.",
      "Chỗ khó: tool thay thế phải “only ever” (lúc nào cũng chỉ) trả về điều khoản trọn vẹn, xác định rõ. “Thường thì đúng” là chưa đủ."
    ],
    asks: [
      "Thiết kế lại thế nào cho đúng kiểu “thay tool generic (làm gì cũng được) bằng tool có ràng buộc”?",
      "Tức là: đổi chính tool sao cho model không còn cách nào xin ra một đoạn cắt dở, thay vì dặn model kỹ hơn hay thêm người kiểm sau.",
      "Soi từng phương án: sau khi đổi, model còn truyền được offset tùy ý không?"
    ],
    facts: [
      "Tool hẹp (constrained tool): làm đúng một việc nhỏ và kiểm input chặt. Ví dụ của guide 2.3: <code>fetch_url</code> (tải bất cứ gì) → <code>load_document</code> (chỉ nhận URL tài liệu hợp lệ). Ít tự do hơn, ít sai hơn.",
      "Quy tắc bắt buộc thì chặn bằng code, không nhờ prompt: prompt chỉ làm tỉ lệ sai giảm, không bao giờ về 0.",
      "Luật chọn đáp án của notes: loại trước đáp án “to hơn” (thêm tầng, thêm model mà không chạm chỗ gây lỗi), rồi chọn cái sửa đúng gốc với ít công sức nhất."
    ],
    opts: [
      { k: "A", gist: "Wrap <code>retrieve_clause</code> in a reviewer subagent, which inspects the returned span and requests a new call when it cuts through a clause.",
        why: [
          "Sửa sau thay vì chặn trước: tool vẫn cho xin đoạn sai, chỉ có thêm người đi sau dọn. Mỗi đoạn lỗi tốn thêm một lần kiểm và một lượt gọi lại, tăng token lẫn độ trễ.",
          "Reviewer cũng là LLM nên vẫn có thể bỏ sót, không đạt “only ever”. Mà đề hỏi cách thiết kế lại tool, A không đổi tool.",
          "Dễ bị cuốn vì thêm subagent kiểm duyệt nghe chắc ăn. Nhưng đó là đáp án “to hơn” (ý 3): thêm một tầng thay vì sửa đúng chỗ gây lỗi."
        ] },
      { k: "B", gist: "Replace <code>retrieve_clause</code> with <code>get_clause_by_id</code>, which only accepts a clause ID from a pre-parsed clause index and returns that clause.",
        why: [
          "Đúng kiểu <code>fetch_url</code> → <code>load_document</code> (ý 1): tool mới không nhận offset nữa, chỉ nhận ID có trong index mà code đã tách sẵn một lần.",
          "ID sai thì tool báo lỗi, ID đúng thì luôn ra trọn một điều khoản. Model không có cách nào xin một đoạn cắt dở.",
          "Lỗi bị chặn ngay ở input của tool, bằng code chứ không trông vào việc model cẩn thận (ý 2). Nên thỏa “only ever”."
        ] },
      { k: "C", gist: "Rewrite the <code>retrieve_clause</code> description to require offsets on clause boundaries, and add worked boundary examples for the model to copy.",
        why: [
          "Chỉ là lời dặn trong description, tool vẫn nhận mọi offset. Ví dụ mẫu giúp model làm đúng phần lớn số lần, không phải mọi lần (ý 2).",
          "Đề cần “only ever”, nên phải chặn bằng cấu trúc của tool, không bằng lời."
        ] },
      { k: "D", gist: "Pair <code>retrieve_clause</code> with a <code>list_sections</code> tool, which returns section start offsets for the model to pass into each call.",
        why: [
          "Tool generic vẫn còn nguyên, vẫn nhận offset bất kỳ. <code>list_sections</code> chỉ cho điểm bắt đầu; model vẫn có thể truyền offset khác, hoặc chọn sai điểm kết thúc.",
          "Thêm một tool và một lượt gọi mà vẫn không bảo đảm “chỉ trả điều khoản trọn vẹn” (ý 1, ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 2.3, mục “Chuyện gì đang xảy ra”: thay fetch_url bằng load_document", href: NOTES + "#l-2-3" },
      { label: "Mở đầu, “8 luật chọn đáp án”: loại đáp án “to hơn”, bắt buộc thì code", href: NOTES + "#l-0-3" },
      { label: "Bài 1.4 “Quy tắc bắt buộc thì đừng nhờ prompt”: vì sao C chưa đủ", href: NOTES + "#l-1-4" }
    ]
  },
  {
    de: 2, n: 56, total: 60, sub: "3.4", subName: "Plan mode hay làm thẳng",
    first: "B", answer: "B",
    ask: "During a multi-phase refactor, Claude needs to grep across hundreds of files to catalog every usage of a deprecated helper function before deciding what to do next. The architect is worried this discovery output will consume most of the main conversation's context window. What should the architect do to prevent this?",
    scene: [
      "Đang refactor nhiều pha. Trước khi quyết bước tiếp, Claude cần grep hàng trăm file để liệt kê mọi chỗ dùng một hàm helper đã deprecated (bị đánh dấu sắp bỏ).",
      "Chỗ khó: kết quả khám phá này rất dài. Kiến trúc sư lo nó chiếm gần hết context window (cửa sổ ngữ cảnh) của phiên chính, trong khi các pha refactor sau còn cần chỗ."
    ],
    asks: [
      "Nên làm gì để chặn chuyện đó?",
      "Tức là: cho việc grep chạy mà kết quả thô không vào context chính, chỉ bản danh sách đã gọn vào thôi.",
      "Soi từng phương án: kết quả grep cuối cùng có vào context chính không? Và nó chặn từ đầu hay dọn sau?"
    ],
    facts: [
      "Lịch sử phiên (<code>messages</code>) chứa cả kết quả tool. Claude chạy grep hay đọc file ở phiên nào thì kết quả nằm trong context của phiên đó.",
      "Explore subagent: subagent có sẵn trong Claude Code, chỉ được đọc. Nó khám phá trong context riêng rồi chỉ gửi về bản tóm tắt.",
      "Plan mode: chế độ chỉ đọc, Claude đọc code và viết kế hoạch, không sửa file cho đến khi được duyệt. Nó là một permission mode của chính phiên đang chạy, không tách context.",
      "<code>/compact</code> nén lịch sử phiên thành bản tóm tắt để giải phóng context. Bản tóm tắt có thể rụng chi tiết."
    ],
    opts: [
      { k: "A", gist: "Redirect the grep output into a scratch file, then have Claude read that file in the main session when it builds the catalog of usages.",
        why: [
          "Ghi ra file chỉ dời chỗ chứa. Khi Claude đọc file đó trong phiên chính để lập danh sách, toàn bộ kết quả grep vẫn vào context chính (ý 1).",
          "Context vẫn đầy y như cũ, chỉ chậm hơn một bước."
        ] },
      { k: "B", gist: "Hand the searches to an Explore subagent, which works in a separate context window and passes back a condensed list of usages to the main session.",
        why: [
          "Explore subagent chạy grep trong context riêng, chỉ đọc (ý 2). Hàng trăm dòng khớp nằm lại bên subagent.",
          "Phiên chính chỉ nhận bản danh sách đã gọn, nên các pha refactor sau còn chỗ. Đúng công cụ guide gọi tên cho “khám phá dài làm cạn context”."
        ] },
      { k: "C", gist: "Switch the session to plan mode, so Claude runs the searches read-only and holds the results while it drafts the plan for the refactor.",
        why: [
          "Sai ở giả định: plan mode chỉ chặn sửa file, không cô lập context (ý 3). Grep chạy trong plan mode vẫn đổ kết quả vào chính hội thoại đó (ý 1).",
          "Context chính vẫn đầy, đúng điều kiến trúc sư lo.",
          "Dễ bị cuốn vì plan mode cũng “chỉ đọc” như Explore subagent. Nhưng chỉ đọc khác với có context riêng: plan mode chạy ngay trong phiên chính."
        ] },
      { k: "D", gist: "Run the greps in the main session and then run <code>/compact</code>, so a short summary replaces the raw matches before the next phase of the refactor begins.",
        why: [
          "Chữa sau: grep chạy trong phiên chính thì context đã bị chiếm rồi mới nén (ý 1, ý 4). Đề hỏi cách chặn trước.",
          "Bản tóm tắt khi compact còn có thể rụng chi tiết từng chỗ dùng, mà đó lại là thứ danh sách cần. Giao subagent từ đầu thì không có gì phải dọn."
        ] }
    ],
    refs: [
      { label: "Bài 3.4: khung “Explore subagent” và quy tắc “khám phá dài → giao Explore subagent”", href: NOTES + "#l-3-4" },
      { label: "Cheatsheet D3: dòng “Khám phá dài làm cạn context” → Explore subagent", href: NOTES + "#cheat-d3" },
      { label: "Bài 5.4, mục “Biết thêm”: compact sau khi ngập không bằng delegate từ đầu", href: NOTES + "#l-5-4" }
    ]
  },
  {
    de: 2, n: 57, total: 60, sub: "1.5", subName: "Hook của Agent SDK: chặn tool call và chuẩn hóa dữ liệu",
    first: "D", answer: "D",
    ask: "For refunds between $500 and $1,000, policy requires the agent to pause and let a human reviewer approve or reject before the refund proceeds, rather than blocking it outright or letting it run automatically. Which PreToolUse <code>hookSpecificOutput</code> configuration matches this requirement?",
    scene: [
      "Policy hoàn tiền: khoản từ $500 đến $1.000 thì agent phải dừng lại, để người duyệt (human reviewer) chấp nhận hoặc từ chối rồi refund mới được chạy.",
      "Chỗ khó: đề loại sẵn hai hướng, “rather than blocking it outright or letting it run automatically” (không chặn hẳn, cũng không cho tự chạy). Cần đúng cái ở giữa."
    ],
    asks: [
      "Cấu hình <code>hookSpecificOutput</code> nào của <code>PreToolUse</code> khớp yêu cầu này?",
      "Tức là: chọn quyết định làm tool call dừng chờ người duyệt trước khi chạy, và người duyệt thấy được thông tin cần để quyết.",
      "Soi từng phương án: quyết định đó chặn hẳn, cho chạy, hay dừng hỏi? Lý do kèm theo đến tay ai?"
    ],
    facts: [
      "<code>PreToolUse</code> trả quyết định qua <code>permissionDecision</code>: <code>allow</code> (cho chạy), <code>ask</code> (hỏi người dùng), <code>deny</code> (từ chối), <code>defer</code> (hoãn).",
      "Ai đọc <code>permissionDecisionReason</code> là tùy quyết định. Với <code>ask</code>: người dùng, ngay trong hộp hỏi quyền. Với <code>deny</code>: Claude. Với <code>allow</code> và <code>defer</code>: chỉ ghi vào debug log.",
      "<code>additionalContext</code> chỉ nối thêm ghi chú vào context, không đổi quyết định cho chạy hay không.",
      "Hook async: agent chạy tiếp ngay, không chờ hook xong. Output async không chặn, không sửa được thao tác, chỉ hợp cho việc phụ như ghi log."
    ],
    opts: [
      { k: "A", gist: "<code>permissionDecision</code> set to <code>\"deny\"</code>, with a <code>permissionDecisionReason</code> telling the model to route the refund to a human reviewer for sign-off.",
        why: [
          "<code>deny</code> là chặn hẳn (ý 1), đúng điều policy không muốn.",
          "Lý do kèm <code>deny</code> là cho Claude đọc, không phải người duyệt (ý 2). Muốn có người duyệt thì Claude phải tự tìm đường khác, không gì bảo đảm.",
          "Dễ bị cuốn vì lý do “route the refund to a human reviewer” (chuyển refund cho người duyệt) nghe đúng ý policy. Nhưng đề nói rõ “rather than blocking it outright” (không chặn hẳn), nên loại A ngay."
        ] },
      { k: "B", gist: "<code>async</code> set to true, with a <code>permissionDecisionReason</code> that alerts the reviewer to the refund while the hook finishes in the background.",
        why: [
          "Hook async thì agent chạy tiếp luôn, không chờ hook (ý 4). Không có gì giữ tool call lại.",
          "Refund chạy trước khi ai kịp duyệt, đúng ca “letting it run automatically” (cho tự chạy) mà policy cấm."
        ] },
      { k: "C", gist: "<code>permissionDecision</code> set to <code>\"allow\"</code>, with an <code>additionalContext</code> note telling the model to flag the refund amount to the reviewer afterward.",
        why: [
          "<code>allow</code> là cho chạy tự động (ý 1), đúng điều policy cấm.",
          "<code>additionalContext</code> chỉ là ghi chú (ý 3). Dặn model báo người duyệt “afterward” (sau đó) thì tiền đã đi rồi."
        ] },
      { k: "D", gist: "<code>permissionDecision</code> set to <code>\"ask\"</code>, with a <code>permissionDecisionReason</code> showing the reviewer the refund amount in the approval prompt.",
        why: [
          "<code>ask</code> dừng tool call và hỏi người trước khi chạy (ý 1): không chặn hẳn, cũng không tự chạy. Người duyệt đồng ý thì refund chạy, từ chối thì thôi.",
          "Với <code>ask</code>, <code>permissionDecisionReason</code> hiện cho người dùng trong hộp hỏi quyền (ý 2), nên người duyệt thấy số tiền ngay lúc quyết."
        ] }
    ],
    refs: [
      { label: "Bài 1.5, ô “Đã sửa 02/11”: bốn quyết định của PreToolUse", href: NOTES + "#fix-11" },
      { label: "Bài 1.5, mục “Biết thêm” (đã sửa 03/11): ai đọc permissionDecisionReason", href: NOTES + "#fix-28" },
      { label: "Docs Hooks: PreToolUse decision control", href: "https://code.claude.com/docs/en/hooks" }
    ]
  },
  {
    de: 2, n: 58, total: 60, sub: "4.5", subName: "Xử lý theo lô (Batch)",
    first: "D", answer: "D",
    ask: "A data pipeline promises stakeholders that classification results for any document will be delivered no later than 48 hours after ingestion. The team plans to route documents through the Message Batches API, which can take up to 24 hours to finish a batch. What is the longest interval the team can wait between batch submission cycles while still meeting the 48-hour promise?",
    scene: [
      "Pipeline cam kết với stakeholder: tài liệu nào cũng có kết quả phân loại “no later than 48 hours after ingestion” (chậm nhất 48 giờ sau khi nhận vào).",
      "Team định chạy qua Message Batches API, mỗi batch có thể mất tới 24 giờ mới xong.",
      "Chỗ khó: tài liệu đến ngay sau một lần nộp phải chờ đợt kế tiếp. Thời gian chờ đó cộng thời gian xử lý mới là tổng thật. Ví dụ minh họa với nhịp nộp 24 giờ:<pre><code>Giờ 0    nộp batch #1\nGiờ 0+   tài liệu X đến, lỡ batch #1\nGiờ 24   nộp batch #2 (có X)\nGiờ 48   batch #2 xong muộn nhất → có kết quả X\n         24 chờ + 24 xử lý = 48 giờ</code></pre>"
    ],
    asks: [
      "Khoảng cách dài nhất giữa hai lần nộp batch là bao nhiêu mà vẫn giữ cam kết 48 giờ?",
      "Tức là: tìm giới hạn trên của nhịp nộp, tính theo ca xấu nhất (chờ trọn một nhịp, rồi xử lý trọn 24 giờ).",
      "Soi từng phương án: chờ tối đa + 24 có ≤ 48 không? Nếu có, nó đã là khoảng dài nhất chưa?"
    ],
    facts: [
      "Message Batches API rẻ 50% nhưng không hứa thời gian: tối đa 24 giờ, không có SLA latency. Đa số batch xong trong một giờ, nhưng “đa số” không phải cam kết.",
      "Tài liệu đến ngay sau một lần nộp phải chờ trọn một nhịp mới vào batch. Thời gian chờ đó cộng thời gian xử lý tối đa phải nằm trong SLA (cam kết thời gian xử lý với người dùng).",
      "Công thức: khoảng nộp ≤ SLA − 24 giờ. Đó là giới hạn trên; trừ thêm dự phòng thì ra nhịp an toàn."
    ],
    opts: [
      { k: "A", gist: "Submit a batch every 48 hours; the 24-hour processing maximum overlaps with the waiting time, so the cycle can use the whole delivery window.",
        why: [
          "Sai ở giả định: thời gian chờ và thời gian xử lý không chồng lên nhau. Tài liệu phải vào batch rồi mới bắt đầu xử lý (ý 2).",
          "Ca xấu nhất: chờ 48 + xử lý 24 = 72 giờ, trễ 24 giờ so với cam kết."
        ] },
      { k: "B", gist: "Submit a batch every 36 hours; a document waits at most one cycle, and most batches finish well within the 24-hour maximum processing time.",
        why: [
          "Sai ở chỗ dựa vào ca thường gặp: “most batches finish well within” (đa số batch xong sớm) không phải cam kết (ý 1). Cam kết phải giữ ở ca xấu nhất.",
          "Ca xấu nhất: 36 + 24 = 60 giờ, trễ 12 giờ."
        ] },
      { k: "C", gist: "Submit a batch every 12 hours; a document waits at most one cycle, and the spare 12 hours cover resubmitting failed requests.",
        why: [
          "Giữ được cam kết: 12 + 24 = 36 giờ, còn dư 12 giờ để gửi lại request lỗi.",
          "Nhưng đề hỏi “longest interval” (khoảng dài nhất). 12 giờ là nhịp có dự phòng, chưa phải giới hạn trên (ý 3).",
          "Dễ bị cuốn vì an toàn hơn, và lý do “chừa thời gian gửi lại request lỗi” nghe chuyên nghiệp. Nhưng câu này chấm giới hạn trên SLA − 24, không chấm nhịp an toàn."
        ] },
      { k: "D", gist: "Submit a batch every 24 hours; a document waits at most one cycle, then needs up to 24 hours of processing before results are available.",
        why: [
          "Tài liệu đến ngay sau một lần nộp chờ trọn 24 giờ, rồi xử lý tối đa 24 giờ: 24 + 24 = 48 giờ, vừa bằng cam kết “no later than 48 hours” (ý 2).",
          "Đúng công thức: khoảng nộp ≤ 48 − 24 = 24 giờ (ý 3). Dài hơn 24 giờ là vỡ cam kết ở ca xấu nhất, nên 24 giờ là khoảng dài nhất."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Tính nhịp submit theo SLA”: công thức khoảng nộp ≤ SLA − 24 giờ", href: NOTES + "#l-4-5" },
      { label: "Bài 4.5, “Khi đi thi” dạng 2 (đã sửa 01/11): giới hạn trên và nhịp có dự phòng", href: NOTES + "#fix-8" }
    ]
  },
  {
    de: 2, n: 59, total: 60, sub: "5.3", subName: "Báo lỗi giữa các agent",
    first: "B", answer: "C",
    ask: "A log-analysis subagent's query to a metrics store fails once with a transient 503, then succeeds on an internal retry a second later. A separate subagent's query to the same store fails repeatedly for two minutes because the store's credentials were rotated and never propagated to the subagent's environment. How should each situation be handled?",
    scene: [
      "Hai subagent cùng truy vấn một kho metrics (metrics store).",
      "Subagent phân tích log gặp lỗi 503 tạm thời (transient) một lần, retry nội bộ sau một giây thì thành công.",
      "Subagent thứ hai lỗi liên tục suốt hai phút, vì credential (thông tin đăng nhập) của kho đã bị đổi mà môi trường của subagent chưa nhận bản mới.",
      "Chỗ khó: cả hai đều là “truy vấn kho bị lỗi”, nhưng một cái tự hết, một cái chờ bao lâu cũng không hết."
    ],
    asks: [
      "Mỗi tình huống nên xử lý thế nào?",
      "Tức là: lỗi nào subagent tự retry tại chỗ, lỗi nào phải báo lên coordinator (agent điều phối)?",
      "Soi từng phương án theo hai nửa, nửa 503 và nửa credential: mỗi nửa đã giao đúng tầng chưa?"
    ],
    facts: [
      "Thứ tự xử lý lỗi của bài 5.3: subagent tự recover lỗi transient trước (retry 1–2 lần), chỉ đẩy lên coordinator những gì nó không tự giải quyết được, kèm những gì đã thử.",
      "Theo <code>error_category</code> của Agent SDK: <code>rate_limit</code>, <code>overloaded</code>, <code>server_error</code> thì subagent tự retry backoff (giãn cách tăng dần) có giới hạn. <code>authentication_failed</code>, <code>cloud_credential_error</code> thì báo lên ngay, vì chờ không sửa được credential.",
      "Báo lên phải có cấu trúc: loại lỗi, những gì đã thử, kết quả một phần, hướng thay thế. Coordinator chỉ biết những gì subagent gửi về."
    ],
    opts: [
      { k: "A", gist: "503: retry in the subagent with backoff; credential failure: keep retrying in the subagent with backoff until it clears.",
        why: [
          "Nửa 503 đúng: lỗi tạm thời thì subagent tự retry (ý 1).",
          "Nửa credential sai: credential đã đổi mà môi trường subagent không nhận được thì chờ bao lâu cũng không tự hết (ý 2). Retry backoff tiếp chỉ đốt thời gian, việc treo đó không ai biết để sửa."
        ] },
      { k: "B", gist: "503: escalate to the coordinator for a retry decision; credential failure: escalate to the coordinator with the attempts logged.",
        why: [
          "Nửa credential đúng: báo lên coordinator kèm các lần đã thử (ý 2, ý 3).",
          "Nửa 503 thừa: lỗi đã hết sau một lần retry nội bộ. Đẩy lên để coordinator quyết retry là bắt nó xử lý một lỗi không còn nữa (ý 1).",
          "Dễ bị cuốn vì báo hết lên coordinator nghe cẩn thận, minh bạch. Nhưng bài 5.3 chỉ đẩy lên những gì subagent không tự xử lý được; đẩy thêm chỉ làm coordinator bận vô ích."
        ] },
      { k: "C", gist: "503: retry in the subagent without the coordinator; credential failure: escalate to the coordinator with the attempts logged.",
        why: [
          "503 là lỗi transient: subagent tự retry tại chỗ, coordinator không cần biết (ý 1). Đề cho thấy retry đã thành công sau một giây.",
          "Credential bị đổi nằm ngoài tầm subagent, retry không sửa được (ý 2). Báo lên coordinator kèm các lần đã thử (ý 3) để nó quyết bước tiếp."
        ] },
      { k: "D", gist: "503: escalate to the coordinator for a retry decision; credential failure: retry in the subagent with backoff until it clears.",
        why: [
          "Ngược cả hai nửa: đẩy lên cái tự hết được (503), giữ lại cái không tự sửa được (credential) (ý 1, ý 2).",
          "Hậu quả: coordinator bận với một lỗi đã hết, còn subagent kia retry mãi một credential sai mà không ai được báo."
        ] }
    ],
    refs: [
      { label: "Bài 5.3, mục “Biết thêm”: error_category quyết định ai xử lý, lỗi credential thì báo lên ngay", href: NOTES + "#l-5-3" },
      { label: "Cheatsheet D5: tự retry transient trước, chỉ đẩy lên những gì không tự xử được", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 2, n: 60, total: 60, sub: "4.1", subName: "Prompt có tiêu chí rõ để giảm false positive",
    first: "B", answer: "B",
    ask: "The “performance suggestions” category in a code-review tool has a 70% false positive rate, and developers have stopped reading any findings from the tool at all, including those from well-performing categories. The team needs to restore trust quickly while a better prompt for that category is developed over the following weeks. What is the recommended immediate action?",
    scene: [
      "Tool review code có category “performance suggestions” (gợi ý hiệu năng) với tỉ lệ false positive (báo nhầm) 70%.",
      "Hậu quả lan rộng: dev bỏ đọc mọi finding của tool, kể cả finding từ các category đang chạy tốt.",
      "Chỗ khó: cần lấy lại niềm tin “quickly” (ngay), trong khi prompt tốt hơn cho category đó phải mất vài tuần mới xong."
    ],
    asks: [
      "Việc nên làm ngay là gì?",
      "Tức là: trong lúc chờ sửa prompt, làm sao cho finding sai thôi đến tay dev, còn finding đúng lại được đọc.",
      "Soi từng phương án: làm xong rồi, 70% finding sai kia còn đến tay dev không?"
    ],
    facts: [
      "False positive (báo nhầm): finding bị dev dismiss vì không đáng báo.",
      "Dev không tách “tool sai về mục này” với “tool đúng về mục kia”; họ chỉ nhớ “tool hay sai”. Một category báo nhầm nhiều kéo cả tool xuống.",
      "Guide khuyên tạm tắt category báo nhầm nhiều để giữ uy tín cho các category đang đúng, sửa prompt của nó riêng, đo lại trên bộ ca đã có đáp án rồi mới bật lại."
    ],
    opts: [
      { k: "A", gist: "Relabel the performance-suggestions findings as low-severity informational notes and keep posting them to developers in the usual review pass, then rework the performance prompt over the following weeks.",
        why: [
          "Đổi nhãn không đổi số finding sai: 70% vẫn sai, vẫn đến tay dev mỗi lần review.",
          "Dev đã bỏ đọc cả tool (ý 2), nên tiếng ồn còn đó thì niềm tin không quay lại.",
          "Dễ bị cuốn vì hạ mức nghiêm trọng nghe như giảm ồn. Nhưng niềm tin sụp theo cụm; chỉ khi bỏ hẳn nguồn ồn thì phần đúng mới được đọc lại."
        ] },
      { k: "B", gist: "Switch off the performance-suggestions category for now and leave the other categories posting their findings to developers in the usual review pass, then rework the performance prompt over the following weeks.",
        why: [
          "Tạm tắt category hiệu năng là cắt ngay nguồn 70% báo nhầm (ý 3). Các category chính xác vẫn chạy, nên finding dev nhận được lại đáng tin.",
          "Prompt hiệu năng sửa riêng trong mấy tuần sau, đo đạt trên bộ ca có đáp án thì bật lại. Đúng cách guide 4.1 khuyên."
        ] },
      { k: "C", gist: "Publish each category's measured precision in the review summary and keep the categories posting their findings to developers as before, then rework the performance prompt over the following weeks.",
        why: [
          "Công khai precision (tỉ lệ báo đúng) là minh bạch, nhưng finding sai vẫn đến tay dev mỗi lần review.",
          "Dev đã không đọc finding nữa thì cũng không đọc bảng precision (ý 2). Niềm tin không lấy lại được ngay."
        ] },
      { k: "D", gist: "Fold the performance-suggestions checks into the correctness category's prompt and post them in a single review pass under one heading, then rework the performance prompt over the following weeks.",
        why: [
          "Tệ hơn: trộn finding hiệu năng sai vào category correctness (tính đúng) đang chính xác, kéo category đó mất uy tín theo (ý 2).",
          "Gộp chung một mục thì dev không còn tách được finding nào đáng tin."
        ] }
    ],
    refs: [
      { label: "Bài 4.1, câu kiểu đề và “Mẹo nhận ra dạng này”: tạm tắt category false positive cao", href: NOTES + "#l-4-1" },
      { label: "Cheatsheet D4: dòng “Một category báo sai nhiều, dev bỏ qua cả category đúng”", href: NOTES + "#cheat-d4" }
    ]
  }
);
