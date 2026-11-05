// Sổ ôn certsafari, Đề 4. Trang so-on-certsafari.html nạp file này trước script render.
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
DE[4] = "Udemy · Practice Test 1 · 60 câu · 04/11/2026";
ENTRIES.push(
  {
    de: 4, n: 1, total: 60, sub: "3.3", subName: "Rule theo đường dẫn trong .claude/rules", scen: "S2",
    first: "BD", answer: "BD",
    ask: "A team has Terraform conventions that should be in context only while Claude edits files under <code>terraform/</code>. The team also needs a guarantee that <code>terraform apply</code> is never executed from a Claude Code session. Which two steps achieve both goals? (Choose two.)",
    scene: [
      "Team có bộ quy ước Terraform (cách viết code hạ tầng). Đề đòi hai việc khác loại nhau.",
      "Việc 1: quy ước chỉ nạp khi Claude sửa file trong <code>terraform/</code>. Làm việc khác thì nó không chiếm context.",
      "Việc 2: “must guarantee” (phải bảo đảm) <code>terraform apply</code> không bao giờ chạy từ một phiên Claude Code. Lệnh này đẩy thay đổi lên hạ tầng thật, khó rút lại.",
      "Chỗ khó: một việc là chỉ dẫn nạp có điều kiện, việc kia là lệnh cấm tuyệt đối. Không chỗ đặt nào lo được cả hai, nên đề bắt chọn hai bước, mỗi bước lo một việc."
    ],
    asks: [
      "Hai bước nào cùng đạt cả hai mục tiêu?",
      "Tức là: một cách để quy ước nạp theo đường dẫn, và một cách chặn lệnh chắc chắn, không dựa vào việc Claude nhớ lời dặn.",
      "Soi từng phương án: nó lo việc nào, và lo có tới nơi không (nạp đúng lúc? chặn chắc chắn?)."
    ],
    facts: [
      "Rule trong <code>.claude/rules/</code> có frontmatter <code>paths</code> (khối YAML ở đầu file) chỉ nạp khi Claude đọc, ghi hoặc sửa file khớp glob. <code>terraform/**/*</code> khớp mọi file ở mọi cấp trong <code>terraform/</code>.",
      "Rule không có <code>paths</code> nạp ngay lúc mở phiên, y như CLAUDE.md. Thư mục con trong <code>.claude/rules/</code> chỉ để sắp xếp: Claude Code tìm mọi file <code>.md</code> trong đó, kể cả trong thư mục con, và tên thư mục không giới hạn việc nạp.",
      "CLAUDE.md và rule là chỉ dẫn: Claude làm theo phần lớn thời gian, nhưng vẫn là xác suất. Viết IMPORTANT hay in hoa chỉ làm câu đó nổi hơn các câu xung quanh, không biến nó thành bảo đảm.",
      "Hook <code>PreToolUse</code> là code chạy trước khi tool thực thi. Nó đọc lệnh Bash sắp chạy và chặn được ngay, bất kể Claude quyết định gì. Docs ghi thẳng: muốn chặn một hành động bất kể Claude quyết định thế nào thì dùng hook PreToolUse."
    ],
    opts: [
      { k: "A", gist: "Put the conventions in <code>.claude/rules/terraform/</code> without any frontmatter, counting on the subfolder to limit when they load.",
        why: [
          "Sai ở giả định: thư mục con không giới hạn việc nạp (ý 2).",
          "File không có <code>paths</code> nên nạp ở mọi phiên, kể cả lúc chỉ sửa CSS. Trái việc 1, và cũng không đụng gì tới việc 2.",
          "Dễ bị cuốn vì CLAUDE.md đặt trong thư mục con của code thì đúng là nạp lười theo vị trí. Nhưng rule trong <code>.claude/rules/</code> không theo vị trí, chỉ <code>paths</code> mới gắn điều kiện."
        ] },
      { k: "B", gist: "Add a <code>PreToolUse</code> hook in settings that blocks Bash commands containing <code>terraform apply</code>.",
        why: [
          "Lo việc 2. Hook chạy trước khi Bash thực thi, thấy lệnh chứa <code>terraform apply</code> thì chặn, lệnh không bao giờ chạy (ý 4).",
          "Đây là cơ chế chắc chắn: không phụ thuộc Claude có nhớ hay có làm theo lời dặn không (ý 3). Đúng chữ “guarantee” đề đòi.",
          "Luật <code>deny</code> trong permissions cũng chặn chắc chắn như vậy, nhưng đề chỉ đưa hook."
        ] },
      { k: "C", gist: "Put both the conventions and the <code>apply</code> ban in the root <code>CLAUDE.md</code>, marked IMPORTANT so they are reliably followed.",
        why: [
          "Hỏng cả hai việc.",
          "Việc 1: CLAUDE.md gốc nạp ở mọi phiên, nên quy ước Terraform chiếm context cả khi không ai đụng tới hạ tầng (ý 2).",
          "Việc 2: lệnh cấm vẫn chỉ là chỉ dẫn, IMPORTANT không biến nó thành bảo đảm (ý 3). Vẫn có lúc Claude chạy <code>apply</code>.",
          "Dễ bị cuốn vì gom một chỗ, lại có chữ “reliably” (đáng tin). Nhưng chỉ dẫn viết mạnh tới đâu vẫn là xác suất."
        ] },
      { k: "D", gist: "Create a file in <code>.claude/rules/</code> whose frontmatter is <code>paths: [\"terraform/**/*\"]</code> and that holds the Terraform conventions.",
        why: [
          "Lo việc 1. Rule chỉ nạp khi Claude đọc, ghi hoặc sửa file trong <code>terraform/</code> (ý 1).",
          "Làm việc khác thì quy ước không nằm trong context. Đụng tới file hạ tầng thì tự nạp, không ai phải nhắc."
        ] }
    ],
    refs: [
      { label: "Bài 3.3: rule có paths chỉ nạp khi đụng file khớp, có ví dụ terraform/**/*", href: NOTES + "#l-3-3" },
      { label: "Bài 3.0: quy ước thì viết vào chỉ dẫn, thứ bắt buộc phải chặn thì đặt ở settings (deny hoặc hook)", href: NOTES + "#l-3-0" },
      { label: "Docs “How Claude remembers your project”, mục Set up rules: file .md trong .claude/rules/ được tìm cả trong thư mục con; rule không có paths nạp lúc mở phiên", href: "https://code.claude.com/docs/en/memory" }
    ]
  },
  {
    de: 4, n: 2, total: 60, sub: "3.3", subName: "Rule theo đường dẫn trong .claude/rules", scen: "S2",
    first: "D", answer: "D",
    ask: "A team broke a large <code>CLAUDE.md</code> into three files under <code>.claude/rules/</code>: one for migrations, one for React components, one for API handlers. All three still load at the start of every session, even when only API code is being changed. What change makes each file load only when Claude works with files it matches?",
    scene: [
      "Team tách CLAUDE.md dài thành ba file trong <code>.claude/rules/</code>: migration, React component, API handler.",
      "Vấn đề: phiên nào cũng nạp đủ ba file ngay lúc mở, kể cả khi chỉ sửa code API.",
      "Chỗ khó: tách file thì đã làm, nhưng tách file chỉ là sắp xếp. Cái quyết định lúc nào nạp là thứ khác."
    ],
    asks: [
      "Đổi gì để mỗi file chỉ nạp khi Claude làm việc với file khớp?",
      "Tức là: cơ chế nào gắn điều kiện nạp cho một rule.",
      "Soi từng phương án: nó có làm rule thôi nạp lúc mở phiên không, hay chỉ đổi chỗ để file?"
    ],
    facts: [
      "Rule không có <code>paths</code> nạp lúc mở phiên, y như CLAUDE.md. Đây đúng là điều team đang thấy.",
      "Thêm frontmatter <code>paths</code> chứa glob (vd <code>src/api/**/*</code>) thì rule chỉ nạp khi Claude đọc, ghi hoặc sửa file khớp.",
      "Claude Code tìm mọi file <code>.md</code> trong <code>.claude/rules/</code>, kể cả trong thư mục con. Thư mục con chỉ để sắp xếp, không gắn điều kiện nạp.",
      "<code>@import</code> trong CLAUDE.md bung nội dung file được import và nạp cùng lúc với CLAUDE.md, nên không giảm context. <code>/compact</code> nén lịch sử hội thoại thành bản tóm tắt, không quyết định rule nào được nạp."
    ],
    opts: [
      { k: "A", gist: "Run <code>/compact</code> at the start of every session, instructing it to keep only the rules that matter.",
        why: [
          "Sai công cụ: <code>/compact</code> nén lịch sử phiên đã có, không chọn file nào được nạp (ý 4).",
          "Ba rule vẫn nạp đủ lúc mở phiên. Compact xong còn có thể rụng chi tiết, và phiên nào cũng phải nhớ tự chạy."
        ] },
      { k: "B", gist: "Move each rule file into a subfolder of <code>.claude/rules/</code> named after the code area it covers.",
        why: [
          "Sai ở giả định: thư mục con không gắn điều kiện nạp (ý 3).",
          "Rule trong thư mục con mà không có <code>paths</code> vẫn nạp lúc mở phiên (ý 1). Team đổi chỗ file mà không đổi được gì.",
          "Dễ bị cuốn vì CLAUDE.md đặt trong thư mục con của code thì đúng là nạp lười. Nhưng đó là thư mục code, không phải thư mục con trong <code>.claude/rules/</code>."
        ] },
      { k: "C", gist: "Pull each rule file in from the root <code>CLAUDE.md</code> with <code>@</code> imports instead of keeping it in <code>.claude/rules/</code>.",
        why: [
          "Sai ở giả định: <code>@import</code> không giảm context (ý 4).",
          "File import nạp ngay lúc mở phiên cùng CLAUDE.md gốc. Kết quả y như hiện tại, chỉ đổi chỗ để file."
        ] },
      { k: "D", gist: "Add YAML frontmatter with a <code>paths</code> field of glob patterns to each rule file.",
        why: [
          "Mỗi rule khai <code>paths</code> riêng. Ví dụ minh họa cho rule API:<pre><code>---\npaths:\n  - \"src/api/**/*\"\n---\n# Quy ước API handler</code></pre>",
          "Rule chỉ nạp khi Claude đụng file khớp (ý 2). Sửa code API thì chỉ rule API vào context, rule migration và React nằm ngoài."
        ] }
    ],
    refs: [
      { label: "Bài 3.3, khung định nghĩa “Rule”: rule không gắn điều kiện nạp mỗi phiên, paths mới gắn điều kiện", href: NOTES + "#l-3-3" },
      { label: "Bài 3.1, mục “Biết thêm”: @import không làm nhỏ context", href: NOTES + "#l-3-1" },
      { label: "Docs “How Claude remembers your project”, mục Set up rules: rule được tìm cả trong thư mục con; rule không có paths nạp lúc mở phiên", href: "https://code.claude.com/docs/en/memory" }
    ]
  },
  {
    de: 4, n: 3, total: 60, sub: "5.3", subName: "Báo lỗi giữa các agent", scen: "S2",
    first: "CD", answer: "AD",
    ask: "During a refactor, a custom subagent runs the test suite. When the suite times out midway, the subagent only reports “tests could not be run”, and the main session cannot decide what to do next. Which TWO changes to the subagent's report make recovery possible? (Select TWO.)",
    scene: [
      "Trong lúc refactor, một subagent tự tạo chạy bộ test cho phiên chính.",
      "Bộ test chạy được một phần thì timeout (quá thời gian). Subagent chỉ báo về đúng một câu “tests could not be run” (không chạy được test).",
      "Phiên chính kẹt: không biết nên chạy lại, đổi lệnh, hay đi tiếp.",
      "Chỗ khó: hai phương án sai nghe như “cho gọn” hoặc “để phiên chính khỏi bị ngắt”. Phải soi xem báo cáo mới có cho phiên chính đủ thông tin để quyết không."
    ],
    asks: [
      "Hai thay đổi nào trong báo cáo giúp phiên chính gỡ được tình huống?",
      "Tức là: subagent phải gửi về những gì để phiên chính chọn được bước tiếp (chạy lại, đổi lệnh, hay đi tiếp).",
      "Soi từng phương án: báo cáo mới thêm thông tin thật, bớt thông tin đi, hay nói sai sự thật?"
    ],
    facts: [
      "Phiên chính (coordinator, agent điều phối) chỉ quyết đúng được bằng thông tin subagent gửi về. Guide gọi cách báo đúng là structured error context (lỗi có cấu trúc): loại lỗi, đã thử gì, kết quả một phần, hướng thay thế.",
      "Partial results (kết quả một phần) là phần đã làm xong trước khi lỗi xảy ra. Gửi kèm thì cấp trên không phải làm lại từ đầu.",
      "Guide nêu hai cách báo sai điển hình. Generic status: gom mọi lỗi vào một trạng thái chung chung, mất hết context. Nuốt lỗi: báo như thành công khi việc chưa xong, cấp trên tưởng đã đủ.",
      "Timeout là lỗi transient (tạm thời): chạy lại, hoặc chạy phạm vi hẹp hơn, có thể qua. Test đỏ thật là chuyện khác hẳn: phải sửa code. Hai trường hợp cần hai bước tiếp khác nhau."
    ],
    opts: [
      { k: "A", gist: "Have the subagent state the failure type and the exact command it tried to run.",
        why: [
          "Loại lỗi cho phiên chính biết đây là timeout chứ không phải test đỏ (ý 4). Lệnh đã chạy cho biết cần chạy lại cái gì, hay đổi lệnh nào (ý 1).",
          "Có hai thứ này thì phiên chính chọn được: chạy lại, đổi lệnh, hay đi tiếp. Câu “could not be run” giấu đúng hai thứ đó."
        ] },
      { k: "B", gist: "Have the subagent collapse every error into one “tests unavailable” status to keep handling simple.",
        why: [
          "Sai: đây chính là generic status (ý 3), cùng vấn đề team đang gặp, chỉ đổi chữ.",
          "Mất loại lỗi, lệnh đã thử, phần đã chạy xong. Phiên chính vẫn không biết nên chạy lại, đổi cách hay dừng."
        ] },
      { k: "C", gist: "Have the subagent return a passing result on timeout so the main session can continue without interruption.",
        why: [
          "Sai: đây là nuốt lỗi (ý 3). Bộ test chưa chạy xong mà báo xanh.",
          "Phiên chính tưởng bản refactor đã được kiểm, đi tiếp với code có thể đang hỏng. Lỗi không bao giờ được báo thành thành công.",
          "Dễ bị cuốn vì đề kể phiên chính đang kẹt, và “continue without interruption” (chạy tiếp không bị ngắt) nghe như gỡ được kẹt. Nhưng gỡ bằng thông tin sai còn tệ hơn kẹt: phiên chính quyết sai mà không biết."
        ] },
      { k: "D", gist: "Have the subagent include the results of the tests that did finish, plus a suggested narrower rerun.",
        why: [
          "Kết quả của phần test đã chạy xong giữ lại việc đã làm (ý 2). Phiên chính không phải chạy lại tất cả, cũng không phải coi cả lần chạy là không biết gì.",
          "Gợi ý chạy hẹp hơn, ví dụ chỉ module đang refactor, là hướng thay thế (ý 1). Timeout là lỗi tạm thời, chạy phạm vi nhỏ hơn có thể qua (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 5.3: structured error context (loại lỗi, đã thử gì, kết quả một phần, hướng thay thế) và các cách báo sai", href: NOTES + "#l-5-3" },
      { label: "Bài 2.2: timeout là lỗi transient; subagent tự thử lại, không được thì báo lên kèm partial results", href: NOTES + "#l-2-2" }
    ]
  },
  {
    de: 4, n: 4, total: 60, sub: "5.1", subName: "Giữ thông tin quan trọng trong hội thoại dài", scen: "S2",
    first: "B", answer: "A",
    ask: "A developer is several hours into a database migration session that has been compacted many times. Claude now cites the wrong migration version, port number and agreed timeout, and the compacted summaries mention these only as “connection settings were discussed”. Which change fixes this most reliably?",
    scene: [
      "Dev làm migration database (đổi cấu trúc DB) trong một phiên dài mấy tiếng. Phiên đã bị compact (tóm tắt phần lịch sử cũ cho gọn) nhiều lần.",
      "Giờ Claude nói sai ba thứ: phiên bản migration, số port, timeout đã chốt.",
      "Bản tóm tắt chỉ còn một câu chung chung: “connection settings were discussed” (đã bàn về cấu hình kết nối). Con số cụ thể rơi mất.",
      "Chỗ khó: ba phương án sai đều chữa quanh bản tóm tắt (tóm muộn hơn, tóm kỹ hơn, hỏi lại khi không chắc). Gốc lỗi là con số chỉ sống trong phần sẽ bị tóm."
    ],
    asks: [
      "Thay đổi nào sửa chuyện này chắc chắn nhất?",
      "Tức là: để con số chính xác ở đâu thì compact bao nhiêu lần cũng không mất.",
      "Soi từng phương án: con số còn nằm trong phần bị tóm tắt không? Còn thì sớm muộn nó vẫn có thể bị viết lại."
    ],
    facts: [
      "Compaction (tóm tắt lịch sử) là nén có mất mát: thứ mất đầu tiên là chi tiết chính xác như số, mã, phiên bản. Compact càng nhiều lần, chi tiết càng dễ thành câu chung chung.",
      "Cách chữa của guide: dữ kiện phải chính xác thì giữ ở một khối có cấu trúc riêng (case facts block, file ghi chú, file state), nằm ngoài phần lịch sử bị tóm tắt, và đưa vào context ở mỗi lượt.",
      "<code>/compact</code> nhận thêm lời dặn (focus instructions) để bản tóm tắt tập trung vào thứ cần giữ. Nhưng bản tóm tắt vẫn do model viết lại, nên vẫn là xác suất.",
      "Confidence tự báo (con số Claude tự chấm xem mình chắc bao nhiêu) lệch so với độ đúng thật. Claude hay tự tin cả ở chỗ nó sai, nhất là khi dữ kiện gốc không còn trong context."
    ],
    opts: [
      { k: "A", gist: "Store the exact values in a structured facts file that Claude reads every turn, kept outside the history that gets compacted.",
        why: [
          "Đúng cách guide nêu (ý 2): phiên bản, port, timeout nằm trong file riêng, không thuộc phần lịch sử bị tóm tắt.",
          "Compact bao nhiêu lần cũng không đụng tới file. Lượt nào Claude cũng đọc lại, nên con số chính xác luôn có trong context, không phải trông vào bản tóm tắt (ý 1)."
        ] },
      { k: "B", gist: "Run <code>/compact</code> less often, so the session builds up many more turns before any history is summarized.",
        why: [
          "Sai ở chỗ chỉ hoãn: tóm muộn hơn thì con số vẫn bị tóm, chỉ là muộn hơn (ý 1).",
          "Trong lúc chờ, context đầy output dài dòng, câu trả lời có thể kém đi trước cả lúc compact.",
          "Dễ bị cuốn vì đề kể phiên bị compact nhiều lần, nên nghĩ ít compact thì ít mất. Nhưng phiên dài mấy tiếng kiểu gì cũng phải compact. Gốc lỗi là con số chỉ sống trong phần bị tóm, không phải số lần tóm."
        ] },
      { k: "C", gist: "Have Claude score its confidence in each value it quotes and ask you to confirm whenever the score is low.",
        why: [
          "Sai ở giả định: confidence tự báo không đáng tin (ý 4). Claude có thể nói sai port mà vẫn tự chấm điểm cao.",
          "Có hỏi lại thì cũng chỉ thêm lượt ngắt. Con số đúng vẫn không có trong context, mày phải tự nhớ để trả lời."
        ] },
      { k: "D", gist: "Give <code>/compact</code> a custom instruction to keep every number and identifier word for word in its summary of older turns.",
        why: [
          "Có ích một phần: bản tóm tắt giữ được nhiều số hơn (ý 3).",
          "Nhưng bản tóm tắt vẫn do model viết lại; qua nhiều lần compact, một con số vẫn có thể rơi hoặc bị đổi. Con số vẫn chỉ sống trong phần bị viết lại, gốc lỗi còn nguyên (ý 1).",
          "Đề hỏi “most reliably” (chắc chắn nhất): A đưa con số ra khỏi phần bị tóm, D chỉ làm việc tóm bớt mất."
        ] }
    ],
    refs: [
      { label: "Bài 5.1, khung định nghĩa “Case facts block”: dữ kiện chính xác nằm ngoài phần lịch sử bị tóm tắt, đưa vào mỗi request", href: NOTES + "#l-5-1" },
      { label: "Bài 5.0, bảng cách làm: tóm tắt làm mất số liệu chính xác; khối cấu trúc riêng giữ chi tiết ngoài phần bị nén", href: NOTES + "#l-5-0" },
      { label: "Bài 4.1, khung định nghĩa “Confidence tự báo”: lệch so với độ đúng thật", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 4, n: 5, total: 60, sub: "3.5", subName: "Tinh chỉnh lặp: ví dụ input/output, test trước, interview", scen: "S2",
    first: "D", answer: "D",
    ask: "A developer has Claude Code build a date-normalization helper with several tricky edge cases. Every time the developer describes a new failing case in words, Claude's fix breaks a case that used to work. Which workflow change best breaks this cycle?",
    scene: [
      "Dev nhờ Claude Code viết hàm chuẩn hóa ngày tháng (đưa các kiểu viết ngày khác nhau về một dạng). Hàm có vài edge case (trường hợp biên) khó.",
      "Vòng lặp: dev tả bằng lời một case đang sai, Claude sửa, rồi một case trước đó đang đúng lại hỏng.",
      "Chỗ khó: mỗi vòng Claude chỉ nhìn đúng case vừa được tả. Không có gì kiểm lại các case cũ sau mỗi lần sửa."
    ],
    asks: [
      "Đổi cách làm thế nào để chặn vòng lặp này?",
      "Tức là: cần thứ gì để mỗi lần sửa được kiểm trên mọi case, không chỉ case vừa tả.",
      "Soi từng phương án: sau mỗi lần sửa, có gì tự phát hiện một case cũ bị hỏng không?"
    ],
    facts: [
      "Test-driven iteration (lặp dựa trên test): viết test suite trước, phủ các edge case. “Xong” nghĩa là test xanh. Mỗi vòng đưa test đang fail cho Claude sửa.",
      "Test chạy lại được sau mỗi lần sửa. Case cũ bị hỏng (regression, lỗi quay lại) thì test của nó đỏ ngay, không phải đợi người phát hiện.",
      "Plan mode hợp với thay đổi lớn, nhiều file, hoặc có nhiều cách làm phải chọn. Một hàm với các case đã biết thì không cần lên kế hoạch trước.",
      "<code>/compact</code> tóm tắt lịch sử cho gọn context. Tóm tắt có thể làm rơi chi tiết, như input chính xác của các case cũ."
    ],
    opts: [
      { k: "A", gist: "Rewrite the request as a longer prose spec that lists every edge case and its expected output up front.",
        why: [
          "Đỡ hơn tả từng case, nhưng vẫn là văn xuôi: vẫn trông vào Claude hiểu đúng và nhớ đủ mọi dòng mỗi lần sửa.",
          "Không có gì chạy để kiểm (ý 2), nên lần sửa cho case này làm hỏng case kia vẫn lọt, y như hiện tại.",
          "Dễ bị cuốn vì liệt kê đủ edge case kèm kết quả mong đợi nghe gần giống test. Nhưng danh sách trên giấy không tự chạy. Cùng nội dung đó viết thành test thì mới bắt được lỗi quay lại."
        ] },
      { k: "B", gist: "Switch to plan mode so Claude designs the helper's approach before writing any code.",
        why: [
          "Sai công cụ: plan mode để chọn hướng làm cho thay đổi lớn (ý 3). Đây là một hàm, các case đã biết.",
          "Có kế hoạch rồi thì lúc sửa vẫn không có gì kiểm lại case cũ. Vấn đề nằm ở khâu kiểm trong lúc lặp, kế hoạch không lo khâu đó."
        ] },
      { k: "C", gist: "Run <code>/compact</code> after every round so earlier fixes stay in context and are not forgotten.",
        why: [
          "Sai ở giả định: compact là tóm tắt, có thể làm rơi input chính xác của các case cũ (ý 4), ngược với mục đích “không quên”.",
          "Kể cả Claude nhớ hết các lần sửa cũ, vẫn không có gì xác nhận chúng còn chạy đúng sau lần sửa mới (ý 2)."
        ] },
      { k: "D", gist: "Have Claude write a test suite covering the edge cases first, then iterate on the failures until everything passes.",
        why: [
          "Đúng test-driven iteration (ý 1): mỗi edge case thành một test chạy được.",
          "Mỗi lần sửa được chấm trên cả bộ test, không chỉ case vừa tả. Case cũ bị hỏng thì đỏ ngay (ý 2), Claude thấy và sửa trong cùng vòng.",
          "Đưa kết quả test fail cho Claude là phản hồi cụ thể, chạy lại được, rõ hơn tả bằng lời."
        ] }
    ],
    refs: [
      { label: "Bài 3.5: định nghĩa test-driven iteration và bảng chọn kỹ thuật", href: NOTES + "#l-3-5" },
      { label: "Bài 3.4: bảng plan mode hay làm thẳng, nhìn độ lớn và số cách làm", href: NOTES + "#l-3-4" }
    ]
  },
  {
    de: 4, n: 6, total: 60, sub: "3.2", subName: "Slash command và skill", scen: "S2",
    first: "C", answer: "B",
    ask: "A developer is adding <code>context: fork</code> to the team's skills. One skill, <code>/license-audit</code>, scans every dependency and prints a long transcript of findings before a short verdict. Another, <code>/api-style</code>, only lists conventions to follow while editing the current file. How should <code>context: fork</code> be applied?",
    scene: [
      "Dev định thêm <code>context: fork</code> cho các skill của team.",
      "<code>/license-audit</code>: quét mọi dependency (gói phụ thuộc), in một bản ghi dài các phát hiện, cuối cùng mới tới kết luận ngắn.",
      "<code>/api-style</code>: chỉ liệt kê quy ước cần theo khi sửa file đang mở.",
      "Chỗ khó: hai skill khác hẳn nhau. Một cái là việc cần làm và nói nhiều, một cái là chỉ dẫn phải có mặt ngay chỗ đang sửa code."
    ],
    asks: [
      "Nên đặt <code>context: fork</code> thế nào?",
      "Tức là: skill nào cần tách ra chạy trong subagent riêng, skill nào phải ở lại hội thoại chính.",
      "Soi từng phương án: fork xong thì output dài đi đâu, và quy ước có còn tới được chỗ Claude đang sửa code không?"
    ],
    facts: [
      "<code>context: fork</code> cho skill chạy trong một subagent riêng. Output dài nằm lại trong context của subagent; phiên chính chỉ nhận kết quả gọn.",
      "Subagent fork nhận nội dung skill làm prompt và không thấy lịch sử hội thoại. Docs dặn: <code>context: fork</code> chỉ hợp với skill có việc cụ thể. Skill chỉ có chỉ dẫn kiểu “dùng các quy ước API này” thì subagent nhận chỉ dẫn mà không có việc gì để làm, trả về chẳng được gì.",
      "Skill chạy inline (ngay trong hội thoại chính) thì nội dung skill vào context của phiên chính. Quy ước cần đúng điều này: nó phải nằm cạnh việc sửa code để định hướng việc đó.",
      "<code>allowed-tools</code> là danh sách tool được duyệt sẵn trong lượt gọi skill. Nó không đổi lượng output, cũng không đổi output đi đâu."
    ],
    opts: [
      { k: "A", gist: "Limit <code>allowed-tools</code> on <code>/license-audit</code> to read-only tools so the audit prints a shorter transcript.",
        why: [
          "Sai công cụ: <code>allowed-tools</code> lo quyền dùng tool, không lo output dài hay ngắn (ý 4).",
          "Audit vẫn đổ nguyên bản ghi dài vào hội thoại chính. Phương án này cũng không trả lời câu hỏi đặt <code>context: fork</code> ở đâu."
        ] },
      { k: "B", gist: "Set <code>context: fork</code> on <code>/license-audit</code> only, and keep <code>/api-style</code> running inline in the main conversation.",
        why: [
          "<code>/license-audit</code> là việc cụ thể, lại nói nhiều. Fork thì bản ghi dài nằm lại trong subagent, phiên chính chỉ nhận kết luận (ý 1).",
          "<code>/api-style</code> là chỉ dẫn, phải có mặt chỗ đang sửa file. Để inline thì quy ước vào thẳng context nơi Claude sửa code (ý 3)."
        ] },
      { k: "C", gist: "Set <code>context: fork</code> on <code>/api-style</code> only, because a list of conventions is reference material rather than a task.",
        why: [
          "Ngược cơ chế. Chính vì là tài liệu tham khảo nên <code>/api-style</code> phải ở lại inline để định hướng việc sửa (ý 3). Fork nó thì subagent nhận quy ước mà không có việc gì để làm (ý 2).",
          "Còn <code>/license-audit</code>, skill thật sự cần cô lập, vẫn đổ bản ghi dài vào phiên chính.",
          "Dễ bị cuốn vì lý do “reference material rather than a task” (tài liệu tham khảo chứ không phải việc) nghe hợp lý. Nhưng đó là lý do để <b>không</b> fork: docs nói fork chỉ hợp với skill có việc cụ thể."
        ] },
      { k: "D", gist: "Set <code>context: fork</code> on both skills so neither one's content takes up room in the main conversation.",
        why: [
          "Đúng một nửa: fork <code>/license-audit</code> là đúng (ý 1).",
          "Nhưng fork <code>/api-style</code> thì quy ước không bao giờ tới được chỗ đang sửa code: subagent không thấy hội thoại (ý 2), phiên chính lại không có quy ước (ý 3).",
          "Mục tiêu không phải làm phiên chính trống nhất có thể, mà để thứ cần có mặt đúng chỗ."
        ] }
    ],
    refs: [
      { label: "Bài 3.2: khung “Context cô lập (context: fork)”: output dài nằm lại trong subagent, phiên chính nhận kết quả gọn", href: NOTES + "#l-3-2" },
      { label: "Docs Skills, mục Run skills in a subagent: subagent không thấy lịch sử hội thoại; skill chỉ có chỉ dẫn mà không có việc thì không nên fork", href: "https://code.claude.com/docs/en/skills" }
    ]
  },
  {
    de: 4, n: 7, total: 60, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool", scen: "S2",
    first: "C", answer: "C",
    ask: "A developer on this team exposed the internal code search service to Claude Code as an MCP tool. When the search backend times out, the tool returns the same plain “no results” message it uses for queries that truly match nothing. Claude then concludes the helper does not exist and writes a duplicate. What change to the tool fixes this?",
    scene: [
      "Dev bọc dịch vụ tìm code nội bộ thành một tool MCP cho Claude Code dùng.",
      "Backend timeout (hết giờ chờ) thì tool trả đúng câu “no results” (không có kết quả), giống hệt khi query thật sự không khớp gì. Claude tin là helper chưa có, viết thêm một bản trùng.",
      "Chỗ khó: hai chuyện khác nhau đi chung một câu trả lời. Ví dụ minh họa:<pre><code>backend timeout          → \"no results\"\ntìm xong, không khớp gì  → \"no results\"</code></pre>Claude chỉ thấy chữ, không cách nào biết mình đang nhận ca nào."
    ],
    asks: [
      "Sửa tool thế nào để hết chuyện này?",
      "Tức là: tool phải cho Claude thấy “chưa tìm được” (lỗi) khác với “tìm rồi, không có” (kết quả hợp lệ).",
      "Soi từng phương án: sau khi sửa, nhìn một lần trả về, Claude có phân biệt được hai ca không?"
    ],
    facts: [
      "Access failure (không truy cập được): chưa biết nguồn có dữ liệu hay không, vd timeout, lỗi 503. Valid empty result (kết quả rỗng hợp lệ): query chạy xong và thật sự không có gì khớp. Hai ca phải trả về khác nhau.",
      "Tool MCP báo thất bại bằng cờ <code>isError: true</code> trong kết quả tool, kèm câu mô tả lỗi. Agent chọn bước tiếp theo dựa trên kết quả của đúng lần gọi đó: đọc được lỗi thì tự quyết thử lại, hỏi người, hay đi tiếp.",
      "Lỗi tạm thời (transient) như timeout: tool retry tại chỗ 1–2 lần là hợp lý, nhưng hết lượt thì vẫn phải báo lỗi ra ngoài, không được giấu.",
      "CLAUDE.md là chỉ dẫn Claude đọc và thường làm theo. Nó không thêm được thông tin gì vào kết quả tool."
    ],
    opts: [
      { k: "A", gist: "Add a CLAUDE.md rule telling Claude to always re-run any search that comes back empty before it writes a new helper function.",
        why: [
          "Sai chỗ sửa: tool vẫn trả một câu cho hai chuyện khác nhau (ý 1). Lời dặn trong CLAUDE.md không làm kết quả tool rõ thêm chút nào (ý 4).",
          "Chạy được, nhưng mọi lần tìm rỗng thật cũng phải chạy hai lần, tốn gấp đôi. Lần thứ hai mà lại timeout thì Claude vẫn nhận “no results” và vẫn viết bản trùng.",
          "Dễ bị cuốn vì nó nhắm đúng hậu quả (helper bị viết trùng). Nhưng đó là vá triệu chứng; gốc là tín hiệu sai ở tool."
        ] },
      { k: "B", gist: "Raise the tool's internal retry count on backend timeouts so timeouts reach Claude less often.",
        why: [
          "Retry tại chỗ cho lỗi tạm thời là bước đầu hợp lý (ý 3).",
          "Nhưng hết lượt retry thì tool vẫn gộp lỗi thành “no results”. Tín hiệu sai chỉ xuất hiện ít hơn, không mất đi; lần nào lọt ra thì Claude vẫn viết bản trùng (ý 1).",
          "Dễ bị cuốn vì nó sửa ở tool, đúng tầng. Nhưng đề cần Claude phân biệt được hai ca, không phải giảm số lần gặp ca lỗi."
        ] },
      { k: "C", gist: "Return backend timeouts with <code>isError: true</code> and a message saying the search timed out; return an empty list only when the query genuinely matched nothing.",
        why: [
          "Đúng cách tách access failure khỏi valid empty result (ý 1): timeout thành lỗi có cờ <code>isError</code> và câu mô tả, không khớp thành danh sách rỗng.",
          "Claude đọc lỗi timeout thì biết lần tìm này chưa chạy được, tự quyết thử lại hay hỏi trước khi viết code (ý 2).",
          "Danh sách rỗng giờ chỉ còn một nghĩa: tìm rồi, không có. Đó mới là tín hiệu đáng tin để viết helper mới."
        ] },
      { k: "D", gist: "Attach the search backend's recent success-rate percentage to every result so Claude can judge how trustworthy each empty answer is.",
        why: [
          "Sai thông tin: tỉ lệ thành công nói về backend nói chung, không nói lần gọi này có timeout hay không. Claude cần kết quả của đúng lần gọi (ý 2).",
          "Backend thành công 98% thì lần này vẫn có thể rơi vào 2% timeout. Claude vẫn phải đoán, chỉ là đoán kèm một con số."
        ] }
    ],
    refs: [
      { label: "Bài 2.2, cuối mục “Lỗi trong hệ nhiều agent”: access failure và empty result hợp lệ phải trả về khác nhau", href: NOTES + "#l-2-2" },
      { label: "Cheatsheet D2: dòng “Search trả mảng rỗng”: rỗng không phải lỗi, timeout không được giả làm rỗng", href: NOTES + "#cheat-d2" },
      { label: "Spec MCP 2025-11-25, mục Error Handling: lỗi thực thi tool trả trong kết quả với isError: true", href: "https://modelcontextprotocol.io/specification/2025-11-25/server/tools#error-handling" }
    ]
  },
  {
    de: 4, n: 8, total: 60, sub: "1.5", subName: "Hook của Agent SDK: chặn tool call và chuẩn hóa dữ liệu", scen: "S2",
    first: "B", answer: "B",
    ask: "The team's project CLAUDE.md says Claude must never push directly to the main branch, yet in two sessions this month Claude pushed to main anyway. How should the team stop this from happening again?",
    scene: [
      "CLAUDE.md của project ghi rõ: Claude “must never” (không bao giờ được) push thẳng lên nhánh main.",
      "Vậy mà tháng này đã có hai phiên Claude vẫn push lên main.",
      "Chỗ khó: luật đã viết rõ mà vẫn lọt. Đề cần chặn để không lặp lại, tức là cần bảo đảm, không phải nhắc thêm."
    ],
    asks: [
      "Team nên làm gì để chuyện này không lặp lại?",
      "Tức là: đưa luật từ chỗ Claude đọc rồi tự giác làm theo sang chỗ chương trình tự chặn, chặn trước khi lệnh chạy.",
      "Soi từng phương án: nó chạy lúc nào (trước hay sau lệnh push), và ai thi hành (Claude tự giác hay Claude Code tự chặn)?"
    ],
    facts: [
      "CLAUDE.md, rule, skill là chỉ dẫn: Claude đọc và thường làm theo, nhưng theo xác suất. Chúng không phải cấu hình được thi hành.",
      "Hook là lệnh shell khai báo trong settings, Claude Code tự chạy mỗi khi có sự kiện khớp. Hook là deterministic (chắc chắn): chạy mọi lần, không phụ thuộc Claude nhớ hay muốn.",
      "Hook <code>PreToolUse</code> chạy sau khi Claude soạn xong tham số tool, trước khi tool chạy. Nó chặn được lệnh: trả <code>permissionDecision: \"deny\"</code> hoặc thoát với exit code 2.",
      "Hook <code>PostToolUse</code> chạy sau khi tool đã chạy xong. Hợp với việc làm sau (format code, đưa kết quả cho Claude), không chặn được lệnh đã chạy."
    ],
    opts: [
      { k: "A", gist: "Add a <code>PostToolUse</code> hook on Bash that detects pushes to main and reports the violation to Claude.",
        why: [
          "Sai thời điểm: <code>PostToolUse</code> chạy khi lệnh đã chạy xong (ý 4). Hook phát hiện ra thì code đã lên main rồi.",
          "Báo cho Claude chỉ giúp nó biết mình vừa làm sai, không làm lệnh push biến mất.",
          "Dễ bị cuốn vì có chữ “hook”, trông như chặn bằng code. Nhưng muốn chặn thì hook phải chạy <b>trước</b> lệnh."
        ] },
      { k: "B", gist: "Add a <code>PreToolUse</code> hook that matches Bash and denies any push targeting the main branch.",
        why: [
          "<code>PreToolUse</code> chạy trước khi lệnh Bash thực thi (ý 3). Hook đọc lệnh sắp chạy, thấy push lên main thì trả deny hoặc exit code 2, lệnh không chạy.",
          "Hook do Claude Code chạy mọi lần có lệnh Bash (ý 2), nên chặn được cả khi Claude quên hay bỏ qua luật trong CLAUDE.md. Đúng điều đề đòi: bảo đảm không lặp lại."
        ] },
      { k: "C", gist: "Move the rule to the top of CLAUDE.md and mark it IMPORTANT so it gets priority.",
        why: [
          "Vẫn là chỉ dẫn (ý 1). Nhấn mạnh làm Claude dễ làm theo hơn, nhưng xác suất sai không về 0.",
          "Đề đã cho thấy luật viết rõ vẫn lọt hai lần. Với thao tác khó đảo ngược như push lên main, viết mạnh tay hơn không đủ bảo đảm."
        ] },
      { k: "D", gist: "Move the rule into an Agent Skill that loads whenever Claude works with git commands.",
        why: [
          "Skill vẫn là chỉ dẫn Claude đọc rồi tự quyết làm theo (ý 1). Đổi chỗ để chữ không đổi tính chất.",
          "Thêm một lỗ: skill chỉ nạp khi Claude thấy mô tả khớp. Không nạp thì luật còn không có mặt; nạp rồi cũng không ngăn được Claude chạy lệnh push."
        ] }
    ],
    refs: [
      { label: "Bài 1.5: hook là deterministic, prompt là probabilistic; PreToolUse chạy trước tool, PostToolUse chạy sau", href: NOTES + "#l-1-5" },
      { label: "Bài 3.0, đoạn ngay sau bảng CLAUDE.md / rule / skill / settings.json: quy ước viết vào chỉ dẫn, thứ bắt buộc chặn đặt ở settings (deny, hook)", href: NOTES + "#l-3-0" },
      { label: "Docs Hooks: PreToolUse chạy trước tool, chặn bằng deny hoặc exit code 2", href: "https://code.claude.com/docs/en/hooks" }
    ]
  },
  {
    de: 4, n: 9, total: 60, sub: "3.3", subName: "Rule theo đường dẫn trong .claude/rules", scen: "S2",
    first: "B", answer: "B",
    ask: "This team's monorepo has 14 service directories, each with its own <code>migrations/</code> folder, and the same migration-writing conventions should apply whenever Claude edits any migration file. Which configuration is the most maintainable?",
    scene: [
      "Monorepo có 14 thư mục service, mỗi service có một thư mục <code>migrations/</code> riêng.",
      "Cùng một bộ quy ước viết migration phải áp dụng mỗi khi Claude sửa bất kỳ file migration nào.",
      "Chỗ khó: quy ước chỉ có một, nhưng file nó áp vào rải ở 14 chỗ. Ví dụ minh họa:<pre><code>services/billing/migrations/\nservices/orders/migrations/\n… (14 thư mục như vậy)</code></pre>"
    ],
    asks: [
      "Cấu hình nào dễ bảo trì nhất?",
      "Tức là: quy ước nằm ở một chỗ duy nhất, mà vẫn tự có mặt đúng lúc Claude sửa file migration, ở service nào cũng vậy.",
      "Soi từng phương án: phải giữ mấy bản quy ước, và nó nạp lúc nào (mọi phiên, khi vào thư mục, hay khi có người gọi)?"
    ],
    facts: [
      "Rule trong <code>.claude/rules/</code> có frontmatter <code>paths</code> chứa glob: rule chỉ nạp khi Claude đọc hoặc sửa file khớp. Glob khớp theo mẫu đường dẫn, nên một glob kiểu <code>**/migrations/**</code> phủ cả 14 thư mục.",
      "CLAUDE.md gốc nạp mọi phiên, bất kể đang làm gì. Chỉ dẫn chỉ cần cho một phần codebase mà để ở đây thì chiếm context cả khi làm frontend hay viết tài liệu.",
      "CLAUDE.md trong thư mục con nạp khi Claude đọc file trong thư mục đó. Nó buộc vào thư mục, nên quy ước rải nhiều thư mục thì phải chép nhiều bản.",
      "Skill nạp nội dung khi người dùng gọi, hoặc khi Claude tự thấy mô tả hợp với việc đang làm. Nạp hay không là do phán đoán, không gắn với việc sửa file nào."
    ],
    opts: [
      { k: "A", gist: "Add the conventions to the root CLAUDE.md so they are present in every session regardless of task.",
        why: [
          "Chạy được, lại chỉ một bản. Nhưng quy ước chiếm context mọi phiên, kể cả khi làm frontend hay viết tài liệu, chẳng dính gì tới migration (ý 2).",
          "CLAUDE.md gốc càng phình càng khó giữ gọn, chỉ dẫn quan trọng dễ bị chìm. Quy ước chỉ cần cho một phần codebase thì đúng chỗ là rule theo đường dẫn (ý 1)."
        ] },
      { k: "B", gist: "Add one rule file under <code>.claude/rules/</code> with a <code>paths</code> glob that matches every migrations directory.",
        why: [
          "Một file, một bản quy ước: sửa một chỗ là cả 14 service theo (ý 1).",
          "Glob khớp mọi thư mục migrations, nên rule tự nạp đúng lúc Claude đọc hoặc sửa file migration; làm việc khác thì không tốn context. Service mới thêm sau cũng tự dính, không phải nhớ chép gì."
        ] },
      { k: "C", gist: "Copy a migrations-specific CLAUDE.md into each service's migrations directory so it loads there.",
        why: [
          "Chạy được: CLAUDE.md thư mục con nạp khi Claude làm việc trong thư mục đó (ý 3).",
          "Nhưng là 14 bản giống nhau. Mỗi lần đổi quy ước phải sửa 14 chỗ, lâu dần các bản lệch nhau; service mới tạo lại dễ quên chép.",
          "Dễ bị cuốn vì nó nạp đúng lúc, không tốn context thừa. Nhưng đề hỏi dễ bảo trì nhất. CLAUDE.md thư mục hợp với quy ước của riêng một thư mục, không hợp với một quy ước trải khắp cây thư mục."
        ] },
      { k: "D", gist: "Package the conventions as a skill in <code>.claude/skills/</code> that developers invoke on demand before editing migrations.",
        why: [
          "Sai loại công cụ: skill nạp khi được gọi hoặc khi Claude tự thấy hợp (ý 4). Đây là quy ước phải áp mọi lần sửa file migration.",
          "Gọi tay thì trông vào dev nhớ gọi trước mỗi lần sửa; quên một lần là migration viết sai quy ước. Rule theo đường dẫn tự nạp, không cần ai nhớ (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 3.3, mục “Chuyện gì đang xảy ra”: CLAUDE.md theo thư mục bị buộc vào thư mục; rule có paths khớp theo glob nên file ở đâu cũng dính", href: NOTES + "#l-3-3" },
      { label: "Bài 3.0, bảng CLAUDE.md / rule / skill / settings.json: mỗi thứ nạp khi nào", href: NOTES + "#l-3-0" },
      { label: "Docs “How Claude remembers your project”: CLAUDE.md thư mục con nạp khi Claude đọc file trong thư mục đó; rule có paths nạp khi đụng file khớp", href: "https://code.claude.com/docs/en/memory" }
    ]
  },
  {
    de: 4, n: 10, total: 60, sub: "5.6", subName: "Giữ nguồn và xử lý mâu thuẫn khi tổng hợp", scen: "S2",
    first: "A", answer: "A",
    ask: "The team's <code>/sprint-summary</code> command combines benchmark numbers, the rationale for a database migration, and dependency audit findings. Its prompt formats everything as bulleted lists, and reviewers find the benchmarks and the migration rationale hard to follow. What should the team change?",
    scene: [
      "Lệnh <code>/sprint-summary</code> gộp ba loại nội dung: số đo benchmark (đo hiệu năng), lý do chọn một migration database, và các phát hiện khi audit dependency.",
      "Prompt của lệnh ép mọi thứ thành gạch đầu dòng. Người review thấy phần benchmark và phần lý do migration khó theo dõi.",
      "Chỗ khó: ba loại nội dung khác nhau chịu chung một format. Số đo cần so với nhau, lý do cần mạch lập luận, chỉ phát hiện audit là hợp gạch đầu dòng."
    ],
    asks: [
      "Team nên đổi gì?",
      "Tức là: mỗi loại nội dung trình bày bằng format nào, và nói điều đó cho Claude ra sao để lần nào chạy lệnh cũng ra đúng.",
      "Soi từng phương án: còn ép một format cho mọi thứ không, và format được nói rõ trong prompt hay để Claude tự đoán?"
    ],
    facts: [
      "Guide 5.6: render theo loại nội dung. Dữ liệu tài chính thành bảng, tin tức thành văn xuôi, phát hiện kỹ thuật thành danh sách có cấu trúc. Ép tất cả về một format làm mất thông tin và khó đọc.",
      "Nội dung file của slash command chính là prompt gửi cho Claude. Muốn output trình bày thế nào thì viết thẳng vào đó.",
      "Chỉ dẫn chung chung không phải tiêu chí: Claude không biết “tốt” nghĩa là gì với team bạn, nên mỗi lần làm một kiểu. Nói rõ muốn gì thì output mới ổn định."
    ],
    opts: [
      { k: "A", gist: "Specify a format per section in the command prompt: a table for benchmarks, prose for the migration rationale, a list for audit findings.",
        why: [
          "Mỗi loại nội dung một format hợp với nó (ý 1): benchmark là số để so nên thành bảng, lý do migration là chuỗi lập luận nên thành văn xuôi, phát hiện audit là các mục rời nên giữ danh sách.",
          "Viết thẳng vào prompt của lệnh (ý 2), nói rõ từng phần (ý 3), nên lần nào chạy cũng ra cùng bố cục. Vẫn là một lệnh, một bản tổng kết."
        ] },
      { k: "B", gist: "Keep the single-list rule but mark it IMPORTANT and add that every list must be easy to scan and complete.",
        why: [
          "Giữ nguyên gốc lỗi: vẫn ép mọi thứ thành danh sách (ý 1). Viết danh sách cẩn thận đến mấy thì số đo benchmark vẫn khó so, lập luận migration vẫn bị bẻ vụn.",
          "IMPORTANT chỉ làm Claude bám lời dặn chặt hơn; lời dặn sai thì bám chặt hơn vẫn sai. “Easy to scan” (dễ lướt) cũng là chữ chung chung (ý 3)."
        ] },
      { k: "C", gist: "Replace the list rule with an instruction to choose whichever layout reads best for each section, and leave the decision to Claude's judgment.",
        why: [
          "Bỏ được ràng buộc có hại, nhưng thay bằng chỉ dẫn mơ hồ (ý 3). “Reads best” (đọc tốt nhất) không có định nghĩa; mỗi lần chạy Claude có thể chọn một kiểu, bản tổng kết sprint này khác sprint trước.",
          "Dễ bị cuốn vì Claude thường chọn format khá hợp lý, nghe như tin model. Nhưng team đã biết rõ phần nào cần format gì, nên viết luôn ra thay vì để Claude đoán."
        ] },
      { k: "D", gist: "Split the command into three separate slash commands, one per content type, and have developers merge the outputs by hand.",
        why: [
          "Thêm việc tay: dev phải chạy ba lệnh rồi tự ghép, mất đúng cái tiện mà lệnh tổng kết sinh ra để làm.",
          "Không cần thiết: format từng phần nói được ngay trong một prompt (ý 2). Tách lệnh cũng không tự sửa format; mỗi lệnh con vẫn phải nói rõ format của nó."
        ] }
    ],
    refs: [
      { label: "Bài 5.6, mục “Ngày tháng và cách trình bày”: render theo loại nội dung, đừng ép tất cả về một format", href: NOTES + "#l-5-6" },
      { label: "Cheatsheet D5: dòng “Báo cáo ép mọi nội dung thành một format” → bảng cho tài chính, văn xuôi cho tin tức, danh sách cho kỹ thuật", href: NOTES + "#cheat-d5" },
      { label: "Bài 4.1, mục “Chuyện gì đang xảy ra”: chỉ dẫn chung chung như “be conservative” không phải tiêu chí, phải viết rõ", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 4, n: 11, total: 60, sub: "3.1", subName: "Cấp của CLAUDE.md và chia sẻ cho team", scen: "S2",
    first: "D", answer: "D",
    ask: "This team's monorepo keeps shared standards files in a top-level <code>standards/</code> directory, and each package has its own CLAUDE.md owned by that package's maintainers, who know which standards apply to their code. How should each package's CLAUDE.md pick up only the standards that apply to it?",
    scene: [
      "Monorepo để các file chuẩn dùng chung trong thư mục <code>standards/</code> ở gốc.",
      "Mỗi package có CLAUDE.md riêng, do maintainer (người phụ trách) của package giữ. Họ biết chuẩn nào áp cho code của mình.",
      "Chỗ khó: chuẩn phải nằm một chỗ cho cả team, nhưng mỗi package chỉ lấy đúng phần mình cần, và người chọn là maintainer. Ví dụ minh họa:<pre><code>standards/api.md\nstandards/frontend.md\nstandards/infra.md\npackages/payments/CLAUDE.md   ← chỉ cần api.md</code></pre>"
    ],
    asks: [
      "CLAUDE.md của mỗi package nên lấy riêng những chuẩn áp cho nó bằng cách nào?",
      "Tức là: giữ một bản chuẩn duy nhất trong repo, mà mỗi package chọn được đúng file mình cần.",
      "Soi từng phương án: chuẩn có mấy bản, có đi theo git cho cả team không, và package có phải gánh chuẩn không liên quan không?"
    ],
    facts: [
      "<code>@import</code>: viết <code>@đường/dẫn.md</code> trong CLAUDE.md để kéo nội dung file khác vào. File được import nạp lúc khởi động, cùng với CLAUDE.md gọi nó. Guide dùng đúng cách này: mỗi package import đúng file chuẩn mình cần, do maintainer chọn.",
      "CLAUDE.md gốc nạp ở mọi phiên trong repo: mọi thứ để ở đây vào context của mọi package, liên quan hay không. File càng dài thì model tuân thủ từng chỉ dẫn càng kém (notes khuyên dưới khoảng 200 dòng).",
      "<code>~/.claude/CLAUDE.md</code> là file cấp user: của riêng một người, áp cho mọi project của người đó, không đi theo git."
    ],
    opts: [
      { k: "A", gist: "Move every standards file's content into the root CLAUDE.md so that all packages inherit the complete set at launch.",
        why: [
          "Không chọn lọc: CLAUDE.md gốc nạp mọi phiên (ý 2), nên chuẩn API, frontend, hạ tầng đổ vào context của mọi package, bất kể có liên quan không.",
          "File gốc phình to thì Claude bám từng chỉ dẫn kém hơn (ý 2). Đề lại muốn mỗi package chỉ lấy phần áp cho nó, do maintainer chọn."
        ] },
      { k: "B", gist: "Have each maintainer copy the full text of the applicable standards files into their package's CLAUDE.md so it is self-contained.",
        why: [
          "Chạy được ngày đầu: package nào cũng có đúng chuẩn của mình.",
          "Nhưng sinh ra nhiều bản chép. Chuẩn chung đổi thì phải sửa tay từng CLAUDE.md; package nào sót thì lặng lẽ lệch khỏi quy ước của team.",
          "Dễ bị cuốn vì nó giữ được ý “maintainer chọn chuẩn”. Nhưng chọn bằng cách chép thì mất nguồn duy nhất; <code>@import</code> chọn mà không chép (ý 1)."
        ] },
      { k: "C", gist: "Ask the developers working on each package to add the applicable standards to their own <code>~/.claude/CLAUDE.md</code> files.",
        why: [
          "Sai cấp: <code>~/.claude/CLAUDE.md</code> là của riêng từng người, không đi theo git (ý 3). Người mới vào team không nhận được gì; chuẩn phụ thuộc máy từng người.",
          "File cấp user áp cho mọi project của người đó, nên chuẩn của package này còn đi theo họ sang cả package không liên quan."
        ] },
      { k: "D", gist: "Have each package's CLAUDE.md pull in only the applicable files with <code>@path</code> imports from the shared standards directory.",
        why: [
          "Chuẩn nằm một chỗ trong <code>standards/</code>, có trong git. CLAUDE.md của mỗi package viết vài dòng import trỏ tới đúng file mình cần, vd <code>@../../standards/api.md</code> (đường dẫn tương đối tính từ file đang import) (ý 1).",
          "Maintainer là người chọn import file nào, đúng như đề đặt. Sửa chuẩn một chỗ là mọi package import nó đều theo.",
          "Lưu ý: file import vẫn nạp lúc khởi động, nên <code>@import</code> giúp chọn đúng chuẩn chứ không để tiết kiệm context. Câu này chỉ đòi chọn đúng, nên vậy là đủ."
        ] }
    ],
    refs: [
      { label: "Bài 3.1, mục “Khi file bắt đầu phình to”: @import để mỗi package kéo đúng chuẩn mình cần, do maintainer chọn", href: NOTES + "#l-3-1" },
      { label: "Cheatsheet D3: dòng “CLAUDE.md quá dài, mỗi package chuẩn riêng”", href: NOTES + "#cheat-d3" },
      { label: "Docs “How Claude remembers your project”, mục Import additional files: cú pháp @path, đường dẫn tương đối tính từ file chứa import", href: "https://code.claude.com/docs/en/memory" }
    ]
  },
  {
    de: 4, n: 12, total: 60, sub: "3.2", subName: "Slash command và skill", scen: "S2",
    first: "B", answer: "B",
    ask: "This team's project CLAUDE.md now contains a 70-line step-by-step dependency upgrade procedure that developers run only a few times a month, and Claude has started overlooking shorter coding rules placed below it. How should the team reorganize this content?",
    scene: [
      "CLAUDE.md của project giờ có một quy trình nâng cấp dependency 70 dòng, từng bước một. Dev chỉ chạy nó vài lần mỗi tháng.",
      "Claude bắt đầu bỏ sót các rule code ngắn nằm bên dưới quy trình đó.",
      "Chỗ khó: hai loại nội dung chung một file. Rule code cần có mặt mọi phiên; quy trình 70 dòng chỉ cần vài lần một tháng, nhưng phiên nào cũng gánh và che lấp rule."
    ],
    asks: [
      "Team nên sắp xếp lại nội dung này thế nào?",
      "Tức là: đưa quy trình hiếm dùng ra khỏi chỗ nạp mọi phiên mà vẫn có sẵn khi cần; rule code thì giữ ở chỗ luôn nạp.",
      "Soi từng phương án: sau khi đổi, 70 dòng còn nạp mọi phiên không, và cả team có còn dùng chung được không?"
    ],
    facts: [
      "CLAUDE.md luôn nạp, hợp với chuẩn chung áp dụng mọi lúc. File càng dài, càng nhiều thứ không dính tới việc đang làm, thì model tuân thủ từng chỉ dẫn càng kém (notes khuyên dưới khoảng 200 dòng).",
      "Skill là thư mục có <code>SKILL.md</code> trong <code>.claude/skills/</code>. Đầu phiên Claude chỉ thấy <code>description</code>; nội dung đầy đủ chỉ nạp khi gọi <code>/tên-skill</code> hoặc khi việc đang làm khớp mô tả. Skill commit trong repo thì cả team dùng chung.",
      "File kéo vào bằng <code>@import</code> nạp lúc khởi động, cộng thẳng vào context. Nó làm file chính gọn đi, không làm nhỏ context.",
      "<code>~/.claude/CLAUDE.md</code> là file cấp user: của riêng một người, không đi theo git, và vẫn nạp ở mọi phiên của người đó."
    ],
    opts: [
      { k: "A", gist: "Keep the procedure in CLAUDE.md and prefix the coding rules with IMPORTANT so they are prioritized.",
        why: [
          "Không gỡ gốc lỗi: 70 dòng quy trình vẫn nạp mọi phiên, vẫn tranh sự chú ý với rule (ý 1).",
          "IMPORTANT chỉ nâng một chỉ dẫn lên so với phần xung quanh; dùng tràn lan thì hiệu quả loãng dần. Viết mạnh tay hơn không đưa khối quy trình ra khỏi context.",
          "Dễ bị cuốn vì nó nhắm đúng triệu chứng (rule bị bỏ sót). Nhưng triệu chứng đến từ khối 70 dòng nằm sai chỗ."
        ] },
      { k: "B", gist: "Move the upgrade procedure into a skill in <code>.claude/skills/</code> and keep the coding rules in CLAUDE.md.",
        why: [
          "Quy trình nhiều bước, vài lần một tháng mới dùng, đúng là thứ skill sinh ra để chứa: nội dung chỉ nạp khi gọi hoặc khi việc khớp mô tả (ý 2). Phiên không liên quan chỉ tốn một dòng mô tả.",
          "Rule code chung ở lại CLAUDE.md, nạp mọi phiên (ý 1). File gọn đi thì từng rule còn lại dễ được tuân thủ hơn. Skill commit trong repo nên cả team vẫn dùng chung."
        ] },
      { k: "C", gist: "Move the procedure into each developer's <code>~/.claude/CLAUDE.md</code> so the project file stays shorter.",
        why: [
          "Sai cấp: file cấp user không đi theo git (ý 4). Quy trình của team thành nhiều bản riêng, lệch nhau dần, người mới không có.",
          "Context cũng không đỡ: file cấp user vẫn nạp mọi phiên của từng dev (ý 4), 70 dòng vẫn nằm đó."
        ] },
      { k: "D", gist: "Keep the procedure in CLAUDE.md but split it into a separate file pulled in with an <code>@path</code> import.",
        why: [
          "Sai ở giả định: tách ra file riêng không có nghĩa là nạp khi cần. File <code>@import</code> nạp lúc khởi động, cộng thẳng vào context (ý 3).",
          "CLAUDE.md trông gọn hơn, nhưng mỗi phiên vẫn gánh đủ 70 dòng, rule vẫn bị che như cũ.",
          "Dễ bị cuốn vì <code>@import</code> đúng là cách chia nhỏ CLAUDE.md (câu 11). Nhưng chia nhỏ là để sắp xếp, không để giảm context."
        ] }
    ],
    refs: [
      { label: "Bài 3.2, mục “Skill hay CLAUDE.md?”: CLAUDE.md luôn nạp cho chuẩn chung, skill gọi theo việc cho workflow cụ thể", href: NOTES + "#l-3-2" },
      { label: "Bài 3.1, mục “Biết thêm”: @import không làm nhỏ context; giữ mỗi CLAUDE.md dưới khoảng 200 dòng", href: NOTES + "#l-3-1" }
    ]
  },
  {
    de: 4, n: 13, total: 60, sub: "2.3", subName: "Chia tool cho agent và tool_choice", scen: "S2",
    first: "BD", answer: "AC",
    ask: "This team's documentation subagent in <code>.claude/agents/</code> has <code>tools: Write</code> only. It often stops to ask the main agent for function signatures, and once in a while it also asks the main agent to run the test suite. Which TWO choices give the subagent the access it needs without giving it more than it needs? (Select TWO.)",
    scene: [
      "Subagent viết tài liệu, định nghĩa trong <code>.claude/agents/</code>, chỉ có <code>tools: Write</code>.",
      "Nó hay phải dừng để xin agent chính chữ ký hàm (function signature: tên hàm, tham số, kiểu trả về). Thỉnh thoảng nó còn nhờ agent chính chạy bộ test.",
      "Chỗ khó: hai nhu cầu khác hẳn nhau. Tra chữ ký hàm thì thường xuyên và chỉ cần đọc; chạy test thì hiếm và cần quyền chạy lệnh."
    ],
    asks: [
      "Hai lựa chọn nào cho subagent đủ quyền nó cần, mà không cho thừa?",
      "Tức là: mỗi nhu cầu cấp tool đúng mức. Nhu cầu thường xuyên, rủi ro thấp thì cấp tool hẹp; nhu cầu hiếm, tác động lớn thì để agent chính lo.",
      "Soi từng phương án: tool thêm vào có hợp vai trò viết tài liệu không, và có mở thêm quyền chạy lệnh không?"
    ],
    facts: [
      "Trường <code>tools</code> trong file subagent liệt kê đúng những tool subagent có. Bỏ hẳn trường này thì subagent nhận toàn bộ tool của hội thoại chính.",
      "Scoped tool access: mỗi agent chỉ có tool đúng vai trò. Guide nói 18 tool thay vì 4–5 làm độ tin cậy chọn tool giảm, và agent có tool ngoài chuyên môn thì hay dùng sai.",
      "Ngoại lệ: nhu cầu ngoài vai trò mà lặp lại thường xuyên thì cấp một tool hẹp cho đúng việc đó (mẫu <code>verify_fact</code> cho synthesis agent). Ca hiếm hoặc phức tạp vẫn đi qua coordinator.",
      "<code>Read</code>, <code>Grep</code> chỉ đọc và tìm trong file, không sửa được gì. <code>Bash</code> chạy được mọi lệnh shell: tìm code, chạy test, mà cũng xóa file, push code."
    ],
    opts: [
      { k: "A", gist: "Leave the rare test-suite runs with the main agent instead of adding Bash to the subagent.",
        why: [
          "Chạy test là việc hiếm, tác động lớn hơn, nằm ngoài vai trò viết tài liệu. Để agent chính lo là đúng nửa còn lại của mẫu: ca hiếm đi qua coordinator (ý 3).",
          "Khỏi phải cấp <code>Bash</code>, một tool chạy lệnh đa năng (ý 4), chỉ vì thỉnh thoảng mới cần. Lệnh chạy ở agent chính thì dễ theo dõi và kiểm soát hơn."
        ] },
      { k: "B", gist: "Remove the <code>tools</code> field so the subagent inherits every tool the main agent has.",
        why: [
          "Chạy được: bỏ trường thì subagent nhận đủ tool (ý 1), hết phải hỏi.",
          "Nhưng sửa quá tay, từ thiếu tool thành thừa tool. Danh sách tool dài thì chọn tool kém tin cậy hơn, và agent viết tài liệu cầm <code>Edit</code>, <code>Bash</code> dễ dùng chúng ngoài việc của mình (ý 2).",
          "Dễ bị cuốn vì một dòng giải quyết cả hai nhu cầu. Nhưng đề đòi “without giving it more than it needs” (không cho thừa)."
        ] },
      { k: "C", gist: "Add <code>Read</code> and <code>Grep</code> to the subagent's <code>tools</code> list so it can look up signatures itself.",
        why: [
          "Tra chữ ký hàm là nhu cầu thường xuyên, rủi ro thấp: đúng chỗ cấp tool hẹp (ý 3). Subagent tự tìm, hết những vòng hỏi qua lại agent chính.",
          "<code>Read</code>, <code>Grep</code> chỉ đọc, không chạy lệnh, không sửa code (ý 4). Subagent vẫn chỉ đọc code và viết tài liệu, đúng vai trò."
        ] },
      { k: "D", gist: "Add <code>Bash</code> to the subagent's <code>tools</code> list so it can search code and run the test suite itself.",
        why: [
          "Chạy được: <code>Bash</code> tìm được code, chạy được test. Nhưng đó là tool chạy lệnh đa năng (ý 4), trao cho một agent mà nhu cầu thường xuyên chỉ là đọc.",
          "Tra chữ ký thì <code>Read</code>, <code>Grep</code> là đủ; chạy test thỉnh thoảng thì để agent chính (ý 3). Cấp <code>Bash</code> là cho thừa, đúng điều đề cấm.",
          "Dễ bị cuốn vì một tool lo được cả hai nhu cầu, nghe gọn. Nhưng ít tool không có nghĩa là hẹp quyền."
        ] }
    ],
    refs: [
      { label: "Bài 2.3: scoped tool access, 18 tool thay vì 4–5, ngoại lệ tool hẹp verify_fact cho nhu cầu thường xuyên", href: NOTES + "#l-2-3" },
      { label: "Bài 1.3: bỏ trống tools thì subagent dùng toàn bộ tool của agent cha", href: NOTES + "#l-1-3" },
      { label: "Docs Subagents, mục Supported frontmatter fields: tools bỏ trống thì kế thừa mọi tool", href: "https://code.claude.com/docs/en/sub-agents" }
    ]
  },
  {
    de: 4, n: 14, total: 60, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool", scen: "S6",
    first: "A", answer: "A",
    ask: "In this extraction pipeline, a custom <code>lookup_vendor</code> tool returns an empty result both when the vendor database times out and when no vendor matches the extracted name. Records are being finalized with blank vendor fields in both cases. What change should the tool make?",
    scene: [
      "Pipeline trích xuất có tool tự viết <code>lookup_vendor</code>: tra nhà cung cấp theo cái tên vừa trích ra từ tài liệu.",
      "Database nhà cung cấp timeout, hay tra xong mà không ai khớp, tool đều trả kết quả rỗng. Cả hai ca, bản ghi đều bị chốt với trường vendor để trống.",
      "Chỗ khó: một bên là chưa tra được, một bên là dữ liệu đúng (thật sự không có nhà cung cấp đó), mà tool trả như nhau."
    ],
    asks: [
      "Tool nên đổi gì?",
      "Tức là: cho Claude và tầng điều phối thấy timeout khác với không khớp, để mỗi ca xử lý một kiểu.",
      "Soi từng phương án: tín hiệu phân biệt hai ca đến từ đâu (từ tool, hay model đoán), và ca không khớp thật có bị xử lý sai không?"
    ],
    facts: [
      "Access failure (không truy cập được): chưa biết nguồn có dữ liệu hay không, vd timeout. Valid empty result (kết quả rỗng hợp lệ): tra xong, thật sự không có gì khớp. Hai ca phải trả về khác nhau.",
      "Messages API: code trả kết quả tool bằng khối <code>tool_result</code>; đặt <code>is_error: true</code> để báo tool chạy thất bại, kèm nội dung mô tả lỗi cho Claude đọc. Bên MCP, cờ tương ứng là <code>isError</code>.",
      "Confidence tự báo của model lệch xa độ đúng thật. Model cũng không biết được một lần gọi database có timeout hay không: thông tin đó chỉ tool có.",
      "Retry hợp với lỗi tạm thời (transient) như timeout. Muốn retry đúng ca thì tool phải nói trước ca nào là lỗi."
    ],
    opts: [
      { k: "A", gist: "Return a tool result with <code>is_error</code> set to true on timeout, and plain empty content when no vendor matches.",
        why: [
          "Tách đúng hai ca (ý 1): timeout thành lỗi có cờ <code>is_error</code> (ý 2), không khớp thành kết quả rỗng bình thường.",
          "Thấy lỗi thì Claude và tầng điều phối quyết định thử lại hay giữ bản ghi lại, không chốt vội. Kết quả rỗng giờ chỉ còn nghĩa “thật sự không có nhà cung cấp”, chốt trường trống là đúng."
        ] },
      { k: "B", gist: "Have the model rate its confidence that the vendor exists, and finalize the record only above a threshold.",
        why: [
          "Sai nguồn tín hiệu: database có timeout hay không là chuyện ở tầng chạy tool. Model không thấy được, chỉ đoán (ý 3).",
          "Confidence tự báo lại lệch, nên đặt ngưỡng nào cũng có lúc chặn nhầm, có lúc cho lọt."
        ] },
      { k: "C", gist: "Add a system prompt instruction telling Claude to ask a reviewer whenever the vendor field comes back empty.",
        why: [
          "Hai ca vẫn trả giống hệt nhau (ý 1). Lời dặn trong prompt không thêm được thông tin mà tool không đưa ra.",
          "Mọi ca không khớp thật cũng bị đẩy sang người duyệt, tốn công review vô ích.",
          "Dễ bị cuốn vì nó chặn được việc chốt vội. Nhưng nó chặn cả ca đúng; gốc lỗi vẫn là tool trả mơ hồ."
        ] },
      { k: "D", gist: "Retry every empty lookup up to three times, and treat the result as a genuine no-match only after that.",
        why: [
          "Vẫn gộp hai ca: ca không khớp thật bị tra lại ba lần vô ích (ý 4).",
          "Database sập lâu hơn ba lần thử thì cuối cùng vẫn bị ghi thành “không có nhà cung cấp”, sai mà không ai hay. Retry chỉ đúng khi tool đã nói ca nào là lỗi."
        ] }
    ],
    refs: [
      { label: "Bài 2.2, cuối mục “Lỗi trong hệ nhiều agent”: access failure và empty result hợp lệ phải trả về khác nhau", href: NOTES + "#l-2-2" },
      { label: "Bài nền tảng Domain 2, mục 4: tool lỗi vẫn trả kết quả, đánh dấu is_error (Messages API) hoặc isError (MCP)", href: NOTES + "#l-2-0" },
      { label: "Cheatsheet D2: dòng “Search trả mảng rỗng”: rỗng không phải lỗi, timeout không được giả làm rỗng", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 4, n: 15, total: 60, sub: "4.5", subName: "Xử lý theo lô (Batch)", scen: "S6",
    first: "BC", answer: "AB",
    ask: "This team has two extraction workloads: real-time intake, where operators wait for the results, and an overnight backlog of archived documents. The team wants to move work to the Message Batches API to cut cost. Which TWO actions are correct? (Select TWO.)",
    scene: [
      "Team có hai luồng trích xuất: nhận tài liệu thời gian thực, có operator ngồi chờ kết quả; và một đống tài liệu lưu trữ tồn đọng, xử lý qua đêm.",
      "Team muốn chuyển việc sang Message Batches API để giảm chi phí.",
      "Chỗ khó: batch rẻ nhưng không hứa thời gian. Phải chọn luồng nào chịu được chờ, và dùng batch rồi thì phải lo thêm gì."
    ],
    asks: [
      "Hai việc nào đúng?",
      "Tức là: chọn đúng luồng đưa sang batch, và làm đúng những việc đi kèm khi dùng batch (hạn chót, ghép kết quả).",
      "Soi từng phương án: có ai đang chờ kết quả không, và phương án dựa vào điều batch cam kết hay chỉ là điều thường thấy?"
    ],
    facts: [
      "Message Batches API: gửi cả lô request, xử lý bất đồng bộ (không đứng chờ, quay lại lấy kết quả sau), giá rẻ 50%.",
      "Batch không có SLA latency (không cam kết thời gian): tối đa 24 giờ. Docs nói đa số batch xong trong một giờ, nhưng “đa số” không phải cam kết.",
      "Kết quả batch không về theo thứ tự gửi. Mỗi request mang một <code>custom_id</code> do bạn đặt; ghép kết quả với tài liệu gốc bằng mã này.",
      "Luồng có người đang chờ (operator, dev chờ merge) phải dùng API gọi thường, dù mất phần giảm giá."
    ],
    opts: [
      { k: "A", gist: "Plan downstream deadlines around a window of up to 24 hours, because batch completion time is not guaranteed.",
        why: [
          "Batch có thể mất tới 24 giờ, không hứa thời gian (ý 2). Hệ thống phía sau dùng kết quả batch phải chịu được khung đó.",
          "Hạn chót tính ngược từ mốc 24 giờ tối đa, không tính theo thời gian thường thấy (khoảng một giờ)."
        ] },
      { k: "B", gist: "Move the overnight archive backlog to batch processing, since no one is waiting on those results.",
        why: [
          "Đống lưu trữ qua đêm không ai ngồi chờ, chịu được trễ: đúng loại việc batch sinh ra để làm (ý 1, ý 4).",
          "Lấy được giảm giá 50% mà không ảnh hưởng ai đang chờ kết quả."
        ] },
      { k: "C", gist: "Batch the real-time intake too, since most batches finish within an hour and the discount applies there as well.",
        why: [
          "Sai ở chỗ dựa vào điều thường thấy: “đa số xong trong một giờ” không phải cam kết, batch có thể chậm khi tải cao hoặc kéo tới 24 giờ (ý 2).",
          "Operator đang ngồi chờ thì không chịu nổi độ bất định đó. Luồng này ở lại API gọi thường, dù mất giảm giá (ý 4).",
          "Dễ bị cuốn vì cả hai lý do đều đúng về dữ kiện: đa số batch xong trong một giờ, và giảm giá áp cho mọi request. Nhưng có người chờ thì cần cam kết thời gian, mà batch không có."
        ] },
      { k: "D", gist: "Match each extraction result back to its source document by its position in the batch output file.",
        why: [
          "Sai giả định: kết quả batch không về theo thứ tự gửi (ý 3). Ghép theo vị trí sẽ lặng lẽ gắn kết quả trích xuất vào nhầm tài liệu.",
          "Cách đúng là ghép theo <code>custom_id</code> của từng request."
        ] }
    ],
    refs: [
      { label: "Bài 4.5: rẻ 50%, tối đa 24 giờ không SLA, “đa số xong trong một giờ” không phải cam kết, ghép bằng custom_id vì kết quả không về theo thứ tự", href: NOTES + "#l-4-5" },
      { label: "Docs Batch processing: giảm 50%, đa số batch xong dưới một giờ, kết quả có thể không theo thứ tự, dùng custom_id", href: "https://platform.claude.com/docs/en/build-with-claude/batch-processing" }
    ]
  },
  {
    de: 4, n: 16, total: 60, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema", scen: "S6",
    first: "B", answer: "B",
    ask: "The team defines an extraction tool whose <code>input_schema</code> matches the target record and leaves <code>tool_choice</code> at <code>\"auto\"</code>. Their code parses the first content block as text with <code>JSON.parse</code>, which fails intermittently. How should the code read the extraction instead?",
    scene: [
      "Team định nghĩa một tool trích xuất, <code>input_schema</code> chính là hình dạng bản ghi cần lấy; <code>tool_choice</code> để <code>auto</code>.",
      "Code lấy content block đầu tiên, coi là text rồi <code>JSON.parse</code>. Lúc được lúc hỏng.",
      "Chỗ khó: lỗi không nằm ở Claude điền sai, mà ở code đọc nhầm chỗ. Ví dụ minh họa một response có câu dẫn trước tool call:<pre><code>content: [\n  { type: \"text\", text: \"I'll extract the invoice fields.\" },\n  { type: \"tool_use\", name: \"extract_invoice\",\n    input: { vendor: \"Acme\", total: 120 } }\n]</code></pre>"
    ],
    asks: [
      "Code nên đọc kết quả trích xuất thế nào?",
      "Tức là: dữ liệu có cấu trúc nằm ở block nào trong response, và đọc ra sao cho chắc.",
      "Soi từng phương án: nó sửa chỗ đọc, hay chỉ vá để text dễ parse hơn?"
    ],
    facts: [
      "Khi Claude gọi tool, <code>content</code> của response là mảng nhiều block. Dữ liệu nằm ở block <code>type: \"tool_use\"</code>, trong trường <code>input</code>: đã là object JSON điền theo <code>input_schema</code>.",
      "Trước block <code>tool_use</code> có thể có block <code>text</code> (câu dẫn). Block đầu tiên chưa chắc là block chứa dữ liệu.",
      "<code>tool_choice: auto</code> để Claude tự quyết có gọi tool không. Dùng <code>any</code> hoặc ép đúng tool theo tên thì Claude phải gọi tool ngay, không có câu dẫn phía trước. Thêm <code>strict: true</code> trên tool thì <code>input</code> khớp schema tuyệt đối.",
      "Lời dặn trong prompt (vd “đừng viết gì trước JSON”) chỉ là xác suất. Retry hợp với lỗi do output sinh sai, không sửa được code đọc sai chỗ."
    ],
    opts: [
      { k: "A", gist: "Retry the request until the first content block parses as valid JSON, up to three attempts.",
        why: [
          "Sai chỗ sửa: retry dành cho output sinh sai định dạng (ý 4). Ở đây dữ liệu đúng đã có trong block <code>tool_use</code>; code chỉ đọc nhầm block.",
          "Gọi lại tốn thời gian và token, lần nào có câu dẫn thì vẫn hỏng; hết ba lần vẫn có thể fail."
        ] },
      { k: "B", gist: "Select the content block whose <code>type</code> is <code>\"tool_use\"</code> and read its <code>input</code> object.",
        why: [
          "Đúng cách docs chỉ: duyệt các block, chọn block <code>tool_use</code>, đọc <code>input</code>. Đó đã là object theo <code>input_schema</code>, không cần <code>JSON.parse</code> (ý 1).",
          "Chạy đúng dù trước tool call có câu dẫn hay không (ý 2).",
          "Nên làm thêm: với <code>auto</code>, Claude có thể không gọi tool; muốn chắc có tool call thì đổi <code>tool_choice</code> sang <code>any</code> hoặc ép tool (ý 3). Nhưng đề hỏi cách đọc, và đọc thì phải như B."
        ] },
      { k: "C", gist: "Instruct the model in the system prompt to emit no text before the JSON so the first block always parses.",
        why: [
          "Lời dặn chỉ giảm khả năng có câu dẫn, không bảo đảm (ý 4).",
          "Gốc hơn: dữ liệu nằm trong <code>input</code> của block <code>tool_use</code> (ý 1). Đem block nào parse như text cũng là đọc sai kênh, thứ tự block thế nào cũng vậy.",
          "Dễ bị cuốn vì nó nhắm đúng lúc lỗi xảy ra (khi có câu dẫn). Nhưng bỏ được câu dẫn thì block đầu là <code>tool_use</code>, mà parse nó như text vẫn sai."
        ] },
      { k: "D", gist: "Run a regex over the text block to isolate the JSON object before calling <code>JSON.parse</code>.",
        why: [
          "Vá triệu chứng: đi lục JSON trong văn xuôi, đúng cái mong manh mà tool use sinh ra để bỏ.",
          "Dữ liệu đúng schema đã có sẵn dạng object trong block <code>tool_use</code> (ý 1), không cần sửa text."
        ] }
    ],
    refs: [
      { label: "Bài 4.3: định nghĩa tool có input_schema rồi đọc kết quả từ block tool_use; tool_choice auto, any, ép tool; strict: true", href: NOTES + "#l-4-3" },
      { label: "Docs Tool use, mục Forcing tool use: any hoặc ép tool thì không có câu dẫn text trước block tool_use", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/implement-tool-use" }
    ]
  },
  {
    de: 4, n: 17, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S6",
    first: "A", answer: "A",
    ask: "An engineer on this team has used one long Agent SDK session to catalog layout variations across 200 sample invoices. They now want to try two competing extraction schema designs, each starting from that analysis without influencing the other. Which approach fits?",
    scene: [
      "Kỹ sư đã dùng một phiên Agent SDK dài để lập danh mục các kiểu bố cục của 200 hóa đơn mẫu.",
      "Giờ muốn thử hai thiết kế schema trích xuất cạnh tranh nhau. Cả hai cùng xuất phát từ bản phân tích đó, và không được ảnh hưởng nhau.",
      "Chỗ khó: vừa phải giữ trọn bản phân tích cho cả hai, vừa phải tách hai hướng. Ví dụ minh họa:<pre><code>phiên phân tích 200 hóa đơn (giữ nguyên)\n ├─ nhánh 1: schema A\n └─ nhánh 2: schema B</code></pre>"
    ],
    asks: [
      "Cách nào hợp?",
      "Tức là: hai phiên mới, mỗi phiên mang sẵn toàn bộ bản phân tích, rồi đi tiếp độc lập.",
      "Soi từng phương án: bản phân tích có được giữ trọn không, và hai thiết kế có thấy việc của nhau không?"
    ],
    facts: [
      "Resume mở lại đúng phiên cũ, nạp lại lịch sử và ghi tiếp vào chính phiên đó.",
      "Fork (Agent SDK: <code>fork_session</code>, đặt cùng resume) sao chép lịch sử phiên sang một phiên mới có ID riêng rồi đi tiếp độc lập. Phiên gốc không bị đụng tới.",
      "Tóm tắt viết tay là bản rút gọn: chi tiết như biến thể của trường, case biên phát hiện lúc phân tích dễ rơi mất.",
      "Context của phiên không quên theo yêu cầu: lời dặn “bỏ qua phần trước” không xóa được prompt, output, tool result đã nằm trong lịch sử."
    ],
    opts: [
      { k: "A", gist: "Call <code>fork_session</code> on the baseline session and develop each schema design in its own fork.",
        why: [
          "Mỗi lần fork sao chép trọn lịch sử phân tích sang một phiên mới (ý 2). Fork hai lần là có hai nhánh cùng gốc.",
          "Nhánh này không ghi vào nhánh kia, phiên gốc cũng còn nguyên. Không phải phân tích lại 200 hóa đơn."
        ] },
      { k: "B", gist: "Open two fresh sessions and paste a written summary of the layout catalog into each.",
        why: [
          "Hai nhánh tách nhau thật, nhưng bản tóm tắt viết tay làm rơi chi tiết (ý 3). Hai thiết kế không còn xuất phát từ trọn bản phân tích.",
          "Thêm việc: phải viết tóm tắt rồi dán hai lần, trong khi fork tự mang cả bản phân tích sang hai nhánh.",
          "Dễ bị cuốn vì phiên mới kèm tóm tắt là cách đúng khi phiên cũ đã lỗi thời hoặc context đầy. Ở đây phiên gốc vẫn dùng tốt, nên fork giữ được nhiều hơn."
        ] },
      { k: "C", gist: "Resume the baseline session concurrently in two processes without forking, and run one design in each.",
        why: [
          "Resume không fork thì cả hai tiến trình cùng ghi tiếp vào đúng phiên gốc (ý 1). Hai thiết kế ghi lượt của mình vào chung một lịch sử, thấy việc của nhau, đúng điều đề muốn tránh.",
          "Phiên phân tích gốc cũng bị ghi thêm, không còn là gốc sạch.",
          "Dễ bị cuốn vì resume đúng là mang theo toàn bộ bản phân tích. Nhưng C và A chỉ khác nhau ở chỗ có fork hay không, và đó là cả câu hỏi."
        ] },
      { k: "D", gist: "Run both designs in sequence in the same session, telling the agent to disregard the first.",
        why: [
          "Lời dặn “disregard” (bỏ qua) không xóa được gì (ý 4). Prompt, output, tool result của thiết kế đầu vẫn nằm trong lịch sử và ảnh hưởng thiết kế sau.",
          "Đó chính là việc lẫn vào nhau mà kỹ sư muốn tránh."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Ba cách nối lại công việc”: resume, fork, phiên mới kèm tóm tắt", href: NOTES + "#l-1-7" },
      { label: "Cheatsheet D1: dòng “So sánh hai hướng từ cùng một bản phân tích” → fork_session", href: NOTES + "#cheat-d1" },
      { label: "Docs Agent SDK Sessions: fork tạo phiên mới từ lịch sử phiên cũ, phiên gốc giữ nguyên", href: "https://code.claude.com/docs/en/agent-sdk/sessions" }
    ]
  },
  {
    de: 4, n: 18, total: 60, sub: "5.1", subName: "Giữ thông tin quan trọng trong hội thoại dài", scen: "S6",
    first: "BD", answer: "AC",
    ask: "In this system, the first-pass extraction stage sends each result to a reconciliation stage. Each result includes the full source passages and a long step-by-step reasoning narrative. The reconciliation stage has a tight context budget, and it now drops or misquotes fields. Which TWO changes address this? (Select TWO.)",
    scene: [
      "Stage trích xuất lượt đầu gửi từng kết quả sang stage đối chiếu (reconciliation: so, gộp và kiểm các giá trị đã trích).",
      "Mỗi kết quả mang theo cả các đoạn văn nguồn đầy đủ và một bài suy luận từng bước dài. Stage đối chiếu có ngân sách context hẹp, và giờ bắt đầu bỏ sót hoặc trích sai trường.",
      "Chỗ khó: thông tin đúng có đủ, chỉ bị chôn trong một khối dài. Phải chọn sửa ở đầu ra của stage trước, hay ở sức chứa của stage sau."
    ],
    asks: [
      "Hai thay đổi nào giải quyết được chuyện này?",
      "Tức là: làm cho thứ stage đối chiếu nhận được gọn lại mà vẫn đủ để kiểm từng trường.",
      "Soi từng phương án: nó bớt phần thừa ngay ở nguồn, hay chỉ nới chỗ chứa, hay thêm một bước rút gọn làm mất độ chính xác?"
    ],
    facts: [
      "Guide 5.1: agent phía sau có ngân sách context hẹp thì sửa agent phía trước để trả dữ liệu có cấu trúc (key facts, citation, relevance score), thay vì cả bài văn kèm chuỗi suy luận.",
      "Input càng dài, thông tin quan trọng càng dễ bị bỏ sót, nhất là phần nằm giữa (lost in the middle). Context lớn hơn chỉ hoãn lúc ngập, không bỏ được phần thừa.",
      "Kèm câu trích ngắn và vị trí nguồn (số trang) cho từng giá trị là cách giữ nguồn gốc dữ liệu: stage sau kiểm và dẫn nguồn được mà không cần mang cả đoạn văn gốc.",
      "Tóm tắt bằng văn xuôi làm mất chi tiết chính xác: con số, số trang, liên kết giữa giá trị và bằng chứng dễ bị nhòe đi."
    ],
    opts: [
      { k: "A", gist: "Remove the step-by-step reasoning field from the first-pass output and keep a per-field confidence score instead.",
        why: [
          "Bài suy luận dài là phần tốn token nhất mà stage sau ít cần nhất. Bỏ nó là đúng hướng guide: thay chuỗi suy luận bằng dữ liệu gọn (ý 1).",
          "Điểm confidence từng trường giữ lại tín hiệu có ích (extractor chắc tới đâu) chỉ trong vài token, và dùng được để đẩy trường đáng ngờ sang review. Muốn định tuyến bằng điểm này thì nên hiệu chuẩn nó với tập có nhãn (bài 5.5)."
        ] },
      { k: "B", gist: "Move the reconciliation stage to a model with a larger context window and keep passing the full upstream output unchanged.",
        why: [
          "Chỉ hoãn lỗi (ý 2): đoạn nguồn dài và bài suy luận vẫn chen với các trường cần kiểm; input càng dài, trường quan trọng càng dễ bị sót.",
          "Gốc lỗi là hình dạng output của stage trước, không phải sức chứa của stage sau.",
          "Dễ bị cuốn vì đề nói “tight context budget” (ngân sách context hẹp), nghe như chỉ cần nới ra. Nhưng “model to hơn, context lớn hơn” gần như luôn là phương án không chạm nguyên nhân."
        ] },
      { k: "C", gist: "Define a JSON schema for the first-pass output containing extracted values, short evidence quotes, and page references.",
        why: [
          "Sửa tận nguồn: schema ép stage trước chỉ trả giá trị, một câu trích ngắn làm bằng chứng, và số trang nơi tìm thấy (ý 1, ý 3).",
          "Stage đối chiếu nhận đủ thứ để kiểm và dẫn nguồn từng trường mà không phải gánh cả đoạn văn gốc, nên ngân sách hẹp dồn hết vào dữ liệu cần."
        ] },
      { k: "D", gist: "Insert a prose summarization step that condenses each first-pass result before the reconciliation stage receives it.",
        why: [
          "Rút gọn bằng văn xuôi làm mất đúng thứ pipeline trích xuất không được mất: giá trị chính xác, số trang, liên kết giữa giá trị và bằng chứng (ý 4).",
          "Thêm một lượt gọi model là thêm chi phí và độ trễ, trong khi stage trước tự trả dữ liệu gọn được ngay từ đầu (phương án C).",
          "Dễ bị cuốn vì nó làm input ngắn đi thật. Nhưng ngắn mà nhòe thì stage đối chiếu vẫn trích sai."
        ] }
    ],
    refs: [
      { label: "Bài 5.1, mục “Bộ kỹ thuật đi kèm”: downstream có ngân sách context hẹp thì sửa upstream trả dữ liệu có cấu trúc thay vì văn và chuỗi suy luận", href: NOTES + "#l-5-1" },
      { label: "Cheatsheet D5: dòng “Agent downstream có ngân sách context hẹp”", href: NOTES + "#cheat-d5" },
      { label: "Bài 5.6: giữ nguồn qua các bước tổng hợp, mỗi claim đi kèm nguồn của nó", href: NOTES + "#l-5-6" }
    ]
  },
  {
    de: 4, n: 19, total: 60, sub: "5.5", subName: "Review người và hiệu chuẩn confidence", scen: "S6",
    first: "A", answer: "A",
    ask: "Reviewers for this system can manually check only one fifth of extracted documents. Today those documents are picked at random, so most field errors reach downstream systems unnoticed. How should the team decide which extractions get human review?",
    scene: [
      "Người review chỉ kiểm tay được một phần năm số tài liệu đã trích xuất.",
      "Hiện tài liệu được chọn ngẫu nhiên, nên phần lớn lỗi ở các trường lọt sang hệ thống phía sau mà không ai thấy.",
      "Chỗ khó: công review có hạn. Vấn đề không phải review nhiều hơn, mà dồn đúng 20% công đó vào chỗ dễ sai nhất."
    ],
    asks: [
      "Team nên quyết định extraction nào được người review thế nào?",
      "Tức là: cần một tín hiệu cho từng trường, chỉ ra chỗ nào dễ sai, để chọn có chủ đích thay vì chọn bừa.",
      "Soi từng phương án: nó có cho ra tín hiệu để định tuyến review không, hay làm việc khác (bỏ trường, sửa format, đoán theo độ dài)?"
    ],
    facts: [
      "Field-level confidence: model xuất điểm tự tin cho từng trường trích xuất, thay vì một điểm cho cả tài liệu. Trường điểm thấp và tài liệu mơ hồ, mâu thuẫn thì đẩy sang người.",
      "Confidence tự báo chưa hiệu chuẩn: 0.9 không có nghĩa đúng 90%. Phải đối chiếu với labeled validation set (bộ mẫu đã có đáp án do người gán) để chọn ngưỡng.",
      "Phần đi thẳng không qua người vẫn cần lấy mẫu ngẫu nhiên phân tầng (stratified random sampling) định kỳ, để đo tỉ lệ lỗi và bắt kiểu lỗi mới.",
      "Validation-retry chỉ sửa lỗi format và cấu trúc. Output đúng schema, đủ trường, đúng kiểu vẫn có thể chứa giá trị sai."
    ],
    opts: [
      { k: "A", gist: "Add a per-field confidence value to the extraction schema and route low-confidence extractions to reviewers.",
        why: [
          "Đổi mẫu ngẫu nhiên thành mẫu có chủ đích: công review dồn vào những trường chính model báo là không chắc (ý 1).",
          "Điểm này do model tự báo, nên team phải hiệu chuẩn ngưỡng trên labeled validation set (ý 2), và vẫn lấy mẫu phân tầng phần điểm cao (ý 3). Nhưng nó cho một tín hiệu định tuyến được, thứ mà chọn ngẫu nhiên không bao giờ có."
        ] },
      { k: "B", gist: "Instruct the model to omit any field it is not highly confident about, so only certain values ship downstream.",
        why: [
          "Không định tuyến gì cả, chỉ cắt dữ liệu: giá trị chưa chắc mà người review sửa được thì bị bỏ luôn.",
          "“Highly confident” (rất chắc) là lời dặn mơ hồ, mỗi tài liệu model hiểu một kiểu; điểm tự báo lại chưa hiệu chuẩn (ý 2). Hướng đúng là ngược lại: trả mọi trường kèm mức confidence, để một bước riêng quyết định lọc hay đẩy sang người.",
          "Dễ bị cuốn vì nghe như chặn được lỗi trước khi xuống hệ thống sau. Nhưng thiếu trường cũng là lỗi với hệ thống sau, và đề hỏi cách chọn thứ để review."
        ] },
      { k: "C", gist: "Add a validation-retry loop that resends schema errors to the model until every extraction passes validation.",
        why: [
          "Sửa sai chỗ: retry kèm lỗi validation sửa format và cấu trúc (ý 4). Tài liệu đủ trường, đúng kiểu vẫn có thể sai giá trị.",
          "Qua được schema không nói gì về trường nào sai nghĩa, nên không đổi được cách chọn một phần năm để review."
        ] },
      { k: "D", gist: "Route the longest documents to reviewers, since lengthy source material produces the most extraction errors.",
        why: [
          "Độ dài là thước đo chưa được kiểm chứng, không nói model thật sự vấp ở đâu. Hóa đơn ngắn mà mơ hồ có thể dễ sai hơn một hợp đồng dài nhưng rõ ràng.",
          "Định tuyến theo dấu hiệu bề mặt thay vì tín hiệu từng trường (ý 1) thì phần lớn lỗi vẫn lọt như khi chọn ngẫu nhiên."
        ] }
    ],
    refs: [
      { label: "Bài 5.5, khung “Tốt”: field-level confidence, hiệu chuẩn ngưỡng bằng labeled set, đẩy ca điểm thấp cho người, lấy mẫu phân tầng phần tự động", href: NOTES + "#l-5-5" },
      { label: "Bài nền tảng Domain 5, mục 4: hiệu chuẩn confidence trên labeled validation set", href: NOTES + "#l-5-0" }
    ]
  },
  {
    de: 4, n: 20, total: 60, sub: "1.6", subName: "Chia việc lớn", scen: "S6",
    first: "C", answer: "C",
    ask: "Claude reviews a 16-file pull request to the extraction pipeline in a single pass. Comments are thorough on the document parsers, shallow on the schema validators, and a null-handling pattern is flagged in one file but accepted unchanged in another. How should this team restructure the review?",
    scene: [
      "Claude review một PR 16 file của pipeline trích xuất trong một lượt.",
      "Comment kỹ ở phần parser tài liệu, nông ở phần validator schema. Một cách xử lý null bị bắt lỗi ở file này, nhưng y hệt ở file khác lại cho qua.",
      "Chỗ khó: hai triệu chứng (chỗ kỹ chỗ nông, phán xét lệch nhau) cùng một gốc: một lượt phải ôm quá nhiều file."
    ],
    asks: [
      "Team nên tổ chức lại việc review thế nào?",
      "Tức là: sửa cấu trúc lượt review để file nào cũng được soi đều và theo cùng tiêu chí, mà vẫn bắt được lỗi giữa các file.",
      "Soi từng phương án: nó đổi cấu trúc lượt review, hay chỉ lọc kết quả, chạy lặp, hoặc nới chỗ chứa?"
    ],
    facts: [
      "Attention dilution (loãng chú ý): nhồi quá nhiều file vào một lượt thì chú ý của model bị dàn mỏng; phần đầu kỹ, phần sau qua loa, và không có chuẩn nhất quán để đối chiếu giữa các file.",
      "Cách guide chỉ: chia thành lượt riêng cho từng file để soi lỗi cục bộ, rồi một lượt tích hợp riêng soi luồng dữ liệu giữa các file.",
      "Context window lớn hơn không chữa loãng chú ý: vấn đề không phải thiếu chỗ chứa mà là chú ý bị chia mỏng.",
      "Confidence tự báo của model hiệu chuẩn kém. Lọc finding bằng nó, hay bằng luật đồng thuận qua nhiều lần chạy, chỉ bớt kết quả hiển thị chứ không làm lượt nào kỹ hơn."
    ],
    opts: [
      { k: "A", gist: "Ask Claude to rate its confidence on each finding and discard those below a fixed threshold.",
        why: [
          "Lọc ở đầu ra không chạm nguyên nhân: file bị soi nông vẫn nông, lỗi null vẫn bị phán hai kiểu (ý 1).",
          "Confidence tự báo hiệu chuẩn kém (ý 4), lọc bằng ngưỡng cố định còn có thể bỏ cả finding đúng. Vẫn là một lượt bị loãng, chỉ ít comment hơn."
        ] },
      { k: "B", gist: "Run the single-pass review three times and keep only findings that appear in at least two runs.",
        why: [
          "Lặp lại một lượt thiếu tập trung không làm lượt nào kỹ hơn (ý 1). Lỗi thật chỉ hiện ở một lần chạy sẽ bị luật đồng thuận loại mất.",
          "Tốn gấp ba mà chỉ bớt finding, không sửa lý do review không nhất quán.",
          "Dễ bị cuốn vì “chạy nhiều lần lấy phần chung” nghe như tăng độ tin cậy. Nhưng nó lọc kết quả, không đổi cấu trúc review."
        ] },
      { k: "C", gist: "Review each file separately for local issues, then run a distinct pass over cross-file data flows.",
        why: [
          "Đúng cách chia của guide (ý 2): mỗi file một lượt riêng, tập trung, nên file nào cũng được soi cùng độ sâu, và một kiểu phán xét (như xử lý null) được áp cùng tiêu chí mỗi lần.",
          "Lượt tích hợp riêng nhận kết quả các lượt từng file rồi soi cách parser, validator và các module khác nối với nhau: đúng phần mà một lượt chật chội bỏ sót."
        ] },
      { k: "D", gist: "Move the review to a model with a larger context window so all 16 files fit comfortably.",
        why: [
          "Vừa chỗ không phải vấn đề đề kể. Lệch nhau là do một lượt phải áp tiêu chí cho mọi thứ cùng lúc (ý 1).",
          "Context lớn hơn chỉ đổi sức chứa, giữ nguyên cấu trúc (ý 3): không file nào được soi riêng, cũng không có bước riêng cho lỗi giữa các file."
        ] }
    ],
    refs: [
      { label: "Bài 1.6: vì sao 14 file một lượt bị nông (attention dilution), chia lượt từng file rồi lượt tích hợp", href: NOTES + "#l-1-6" },
      { label: "Bài 4.6: review nhiều lượt, lượt từng file và lượt tích hợp giữa các file", href: NOTES + "#l-4-6" }
    ]
  },
  {
    de: 4, n: 21, total: 60, sub: "4.2", subName: "Few-shot cho output ổn định", scen: "S6",
    answer: "C",
    ask: "The extraction tool's schema lets <code>source</code> be either a string or null, and the prompt already explains both citation styles. Some documents cite through a numbered bibliography instead of inline. For those documents <code>source</code> always comes back null, even though the reference list holds the value. Which change fixes this most reliably?",
    scene: [
      "Tool trích xuất khai trường <code>source</code> (nguồn) là chuỗi hoặc null. Prompt đã mô tả cả hai kiểu trích dẫn.",
      "Có tài liệu trích dẫn inline (ghi nguồn ngay trong câu), có tài liệu dùng bibliography đánh số (trong câu chỉ có số, nguồn nằm ở danh mục cuối bài). Ví dụ minh họa:<pre><code>Inline:        ... theo khảo sát (Nguyen, 2021).\n\nBibliography:  ... theo khảo sát [3].\n               Tài liệu tham khảo\n               3. Nguyen, T. (2021). ...</code></pre>",
      "Với kiểu bibliography, <code>source</code> lần nào cũng null, dù nguồn nằm ngay trong danh mục.",
      "Chỗ khó: prompt đã mô tả đủ hai kiểu. Thông tin có trong tài liệu, model chỉ không nhận ra nó nằm ở đâu."
    ],
    asks: [
      "Đổi gì để sửa lỗi này chắc nhất?",
      "Tức là: dạy model bước nối số [3] trong câu với mục 3 trong danh mục, mà không ép nó bịa ở tài liệu thật sự không có nguồn.",
      "Soi từng phương án: nó cho model thấy cách làm, hay chỉ ép hình dạng, gọi lại, hoặc nói to hơn?"
    ],
    facts: [
      "Few-shot là đặt vài ví dụ mẫu input → output vào prompt để Claude bắt chước. Guide: khi chỉ dẫn chi tiết vẫn cho kết quả không nhất quán, few-shot là kỹ thuật hiệu quả nhất.",
      "Một chỗ few-shot phát huy là “varied document structures” (cấu trúc tài liệu đa dạng), ví dụ paper trích dẫn inline và paper dùng bibliography. Loại ví dụ này sửa ca trường trả null dù thông tin có trong tài liệu.",
      "Schema lo hình dạng, không dạy model tìm giá trị ở đâu. Trường nullable là để model trả null trung thực khi tài liệu không có. Bỏ null đi thì ở ca đó model bịa cho đủ.",
      "Retry kèm lỗi sửa được lỗi định dạng và lỗi trích xuất, khi câu lỗi chỉ ra sai ở đâu. Khi nguồn thật sự không có thông tin, null là đáp án đúng và gọi lại là vô ích."
    ],
    opts: [
      { k: "A", gist: "Drop null from the allowed types of <code>source</code>, so the schema demands a value for every document.",
        why: [
          "Sai chỗ: schema chỉ ép hình dạng, không chỉ cho model tìm nguồn trong danh mục (ý 3).",
          "Tài liệu bibliography: model vẫn không biết lấy gì, giờ buộc phải điền nên dễ điền đại. Tài liệu thật sự không có nguồn: model buộc phải bịa. Null nhìn thấy được biến thành dữ liệu bịa không ai thấy.",
          "Dễ bị cuốn vì “bắt buộc bằng schema” nghe chắc hơn lời dặn. Nhưng lỗi ở đây là model không nhận ra giá trị, không phải output sai hình dạng."
        ] },
      { k: "B", gist: "Send every null <code>source</code> back to Claude as a validation error and have it retry the extraction.",
        why: [
          "Câu lỗi “source is null” không cho thêm gì về chỗ nguồn nằm. Lượt sau model đọc cùng tài liệu, cùng chỉ dẫn, nên dễ null y như cũ (ý 4).",
          "Coi mọi null là lỗi còn phạt luôn tài liệu thật sự không có nguồn. Bị hỏi lại mãi, model dễ đoán cho xong."
        ] },
      { k: "C", gist: "Add few-shot examples that show <code>source</code> being extracted from an inline-citation document and from a bibliography-style document.",
        why: [
          "Đúng ca “varied document structures” (ý 2): mỗi kiểu trích dẫn một ví dụ, đặt cạnh nhau.",
          "Ví dụ kiểu bibliography cho model thấy bước nối số [3] với mục 3 trong danh mục. Đây đúng là bước prompt đã mô tả bằng lời mà model chưa làm được (ý 1).",
          "Trường vẫn nullable, nên tài liệu không có nguồn vẫn trả null trung thực."
        ] },
      { k: "D", gist: "Add a forceful instruction saying <code>source</code> must always be taken from the document's reference list.",
        why: [
          "Prompt đã mô tả hai kiểu. Nói mạnh hơn chỉ tăng độ nhấn, không thêm thông tin về cách nối số trong câu với mục trong danh mục (ý 1).",
          "“Always” (luôn luôn) lấy từ danh mục còn sai với tài liệu inline: nguồn nằm ngay trong câu, có khi tài liệu không có danh mục nào."
        ] }
    ],
    refs: [
      { label: "Bài 4.2, mục “Bốn chỗ few-shot phát huy”: ví dụ trích từ paper inline và bibliography sửa ca trả null", href: NOTES + "#l-4-2" },
      { label: "Bài 4.3, mục “Thiết kế schema để model không bịa”: trường có thể vắng thì để nullable", href: NOTES + "#l-4-3" },
      { label: "Bài 4.4, mục “Chuyện gì đang xảy ra”: retry có ích với lỗi trích xuất, vô ích khi nguồn không có thông tin", href: NOTES + "#l-4-4" }
    ]
  },
  {
    de: 4, n: 22, total: 60, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema", scen: "S6",
    answer: "D",
    ask: "Three extraction tools are defined, one each for invoices, receipts and purchase orders, and <code>tool_choice</code> is left at its default. Assume the model and its settings accept every <code>tool_choice</code> option. Documents arrive without a type label, and roughly one response in twenty is a short text description of the document instead of a tool call, which breaks the downstream parser. Which change guarantees a structured extraction for every document while still letting Claude pick the schema?",
    scene: [
      "Pipeline khai ba tool trích xuất: hóa đơn (invoice), biên lai (receipt), đơn đặt hàng (purchase order). <code>tool_choice</code> để mặc định.",
      "Tài liệu đến không có nhãn loại. Khoảng 1/20 response là một đoạn text tả tài liệu thay vì tool call, và parser (bộ đọc kết quả) phía sau hỏng.",
      "Đề cho trước: model và cấu hình nhận mọi giá trị <code>tool_choice</code>. Tức là không phải lo chuyện model mới trả lỗi 400 với <code>any</code> hay ép tool.",
      "Chỗ khó: đề đòi hai thứ cùng lúc. “Guarantees” (bảo đảm) mọi tài liệu ra tool call, và “still letting Claude pick the schema” (Claude vẫn tự chọn schema)."
    ],
    asks: [
      "Đổi gì để mọi tài liệu đều ra kết quả có cấu trúc mà Claude vẫn tự chọn schema?",
      "Tức là: cần một cấu hình bắt buộc gọi tool nhưng không chỉ định tool nào.",
      "Soi từng phương án: có bảo đảm tool call không, hay chỉ tăng xác suất? Có để Claude chọn đúng schema cho từng loại không?"
    ],
    facts: [
      "<code>tool_choice</code> mặc định là <code>auto</code>: Claude tự quyết gọi tool hay trả text. Đoạn text 1/20 lần là hành vi bình thường của <code>auto</code>, không phải lỗi prompt.",
      "<code>{\"type\": \"any\"}</code>: bắt buộc gọi một tool nào đó, Claude tự chọn tool nào. Guide dùng đúng ca này: nhiều schema trích xuất, chưa biết loại tài liệu.",
      "<code>{\"type\": \"tool\", \"name\": …}</code>: bắt buộc gọi đúng tool có tên đó. Dùng khi một bước cụ thể phải chạy trước.",
      "Với <code>any</code> hoặc ép tool, API prefill (điền sẵn) lượt assistant, nên response mở đầu ngay bằng <code>tool_use</code>, không có câu dẫn. Lời dặn trong prompt hay gửi lại thì chỉ là xác suất."
    ],
    opts: [
      { k: "A", gist: "Leave <code>tool_choice</code> at its default and resend any document whose response comes back as text instead of a tool call.",
        why: [
          "Chạy được, nhưng gốc vẫn là <code>auto</code> (ý 1). Lượt gửi lại vẫn có thể ra text, mỗi lần lại tốn thêm thời gian và tiền.",
          "Có sẵn một cấu hình chặn text ngay từ request (ý 4), nên vòng gửi lại là sửa sai tầng."
        ] },
      { k: "B", gist: "Force <code>tool_choice</code> to the invoice tool, because invoices are the most common type in the stream.",
        why: [
          "Bảo đảm có tool call, nhưng mọi tài liệu đều bị ép vào schema hóa đơn (ý 3).",
          "Biên lai và đơn đặt hàng bị nhét vào sai trường. Parser hết hỏng, nhưng dữ liệu sai lặng lẽ, khó phát hiện hơn.",
          "Dễ bị cuốn vì ép tool là cách “chắc chắn” quen thuộc nhất. Nhưng đề đòi Claude vẫn chọn schema, mà ép tên tool là bỏ đúng quyền chọn đó."
        ] },
      { k: "C", gist: "Leave <code>tool_choice</code> at its default and make the system prompt insist that every document gets a tool call.",
        why: [
          "Vẫn là <code>auto</code>, Claude vẫn được quyền trả text (ý 1). Lời dặn mạnh hơn chỉ hạ tỉ lệ 1/20, không đưa nó về 0 (ý 4).",
          "Đề đòi “guarantees” (bảo đảm). Lời dặn không cho được bảo đảm."
        ] },
      { k: "D", gist: "Set <code>tool_choice</code> to <code>{\"type\": \"any\"}</code>, so a tool call is required but Claude still decides which extraction tool to use.",
        why: [
          "<code>any</code> bắt buộc gọi một trong ba tool và để Claude tự chọn tool (ý 2). Thỏa cả hai điều đề đòi.",
          "API prefill lượt assistant nên không còn đoạn text tả tài liệu (ý 4). Đúng chỗ parser đang hỏng.",
          "Claude vừa phân loại vừa trích xuất trong một bước: đọc tài liệu, chọn tool hợp, điền schema."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, “Khi đi thi” Dạng 3 và mục “Biết thêm”: nhiều schema chưa biết loại thì dùng any; ép tool thì API prefill; model mới trả 400 với any/tool", href: NOTES + "#l-4-3" },
      { label: "Bài 2.3, mục “tool_choice: để model chọn, bắt nó chọn, hay chỉ định luôn”", href: NOTES + "#l-2-3" },
      { label: "Docs Define tools: các giá trị tool_choice và giới hạn theo model", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools" }
    ]
  },
  {
    de: 4, n: 23, total: 60, sub: "4.5", subName: "Xử lý theo lô (Batch)", scen: "S6",
    answer: "D",
    ask: "This team runs two extraction workloads: an upload screen where a user stays on the page to confirm the extracted fields, and a nightly backfill of 40,000 archived documents that feeds a dashboard refreshed each morning. How should they use the Message Batches API to lower API cost?",
    scene: [
      "Team có hai luồng trích xuất.",
      "Luồng 1: màn hình upload. Người dùng ngồi chờ trên trang để xác nhận các trường vừa trích.",
      "Luồng 2: mỗi đêm chạy bù 40.000 tài liệu lưu trữ, nuôi một dashboard làm mới mỗi sáng.",
      "Chỗ khó: batch rẻ nhưng không hứa thời gian. Ba phương án sai hoặc cố nhét luồng có người chờ vào batch, hoặc bỏ batch luôn."
    ],
    asks: [
      "Áp Message Batches API thế nào để giảm chi phí?",
      "Tức là: luồng nào chịu được chờ thì đưa sang batch, luồng nào có người chờ thì giữ gọi thường.",
      "Soi từng phương án: có ai đang bị chặn chờ kết quả không, và phương án có lấy được giảm giá ở luồng lớn không?"
    ],
    facts: [
      "Message Batches API: gửi cả lô request, xử lý bất đồng bộ (không đứng chờ, quay lại lấy kết quả sau), giá rẻ 50%.",
      "Batch không có SLA latency (không cam kết thời gian): tối đa 24 giờ. Docs nói đa số batch xong trong một giờ, nhưng “đa số” không phải cam kết.",
      "Luồng có người đang chờ phải dùng API gọi thường (gọi xong có kết quả ngay trong response), dù mất phần giảm giá."
    ],
    opts: [
      { k: "A", gist: "Send both workloads as batches and poll for completion every few seconds so upload users get their results quickly.",
        why: [
          "Sai ở giả định: poll dày chỉ hỏi API nhiều lần hơn “xong chưa”, không làm lô xử lý nhanh hơn (ý 2).",
          "Lô có thể mất nhiều giờ. Người dùng ngồi trên màn hình upload không chờ nổi, hỏi bao nhiêu lần cũng vậy (ý 3)."
        ] },
      { k: "B", gist: "Keep both workloads synchronous and extract fewer fields per document to cut token usage.",
        why: [
          "Bớt trường chỉ giảm chút token output, lại làm hệ thống trích xuất kém đi ở đúng việc của nó.",
          "Luồng 40.000 tài liệu vẫn trả giá đầy đủ. Đây đúng loại việc lớn, không ai chờ, mà batch sinh ra để làm rẻ đi (ý 1)."
        ] },
      { k: "C", gist: "Send both workloads as batches and fall back to a synchronous call whenever a batch hasn't finished within a minute.",
        why: [
          "Batch không hứa xong trong một phút (ý 2), nên với màn hình upload nhánh dự phòng sẽ chạy gần như mọi lần.",
          "Kết quả: trả tiền hai lần cho cùng tài liệu, người dùng vẫn chờ đủ một phút, code thêm một nhánh rẽ.",
          "Dễ bị cuốn vì nghe như vừa được giảm giá vừa có lưới an toàn. Nhưng giảm giá ở luồng này gần như không bao giờ tới, còn chi phí và độ trễ thì tăng."
        ] },
      { k: "D", gist: "Run the nightly archive backfill as batches and keep the interactive upload screen on synchronous Messages API calls.",
        why: [
          "Luồng đêm: 40.000 tài liệu, sáng mới cần, không ai bị chặn chờ. Hợp mô hình bất đồng bộ, được giảm 50% trên khối lượng lớn nhất (ý 1).",
          "Màn hình upload có người chờ, batch có thể mất tới 24 giờ, nên giữ gọi thường (ý 2, ý 3).",
          "Team vẫn phải tính cho dashboard chịu được lô về muộn, vì 24 giờ mới là mốc tối đa (ý 2). Đó là việc cần lo khi dùng batch, không phải lý do bỏ batch."
        ] }
    ],
    refs: [
      { label: "Bài 4.5: rẻ 50%, tối đa 24 giờ, không SLA; việc có người chờ thì không đưa vào batch", href: NOTES + "#l-4-5" },
      { label: "Bài Nền tảng D4: bảng so sánh gọi thường và Message Batches API", href: NOTES + "#l-4-0" }
    ]
  },
  {
    de: 4, n: 24, total: 60, sub: "4.4", subName: "Validate, retry kèm lỗi và vòng phản hồi", scen: "S6",
    answer: "B",
    ask: "The validation-retry loop resends each invoice together with its specific validation error. Date-format failures clear after one retry, but <code>vendor_tax_id</code> failures survive three retries, because that ID exists only in a separate vendor registry that is never sent to Claude. What should the team do about these failures?",
    scene: [
      "Pipeline có vòng validate rồi retry: hóa đơn sai thì gửi lại kèm câu lỗi cụ thể.",
      "Lỗi định dạng ngày hết sau một lần gọi lại.",
      "Lỗi <code>vendor_tax_id</code> (mã số thuế nhà cung cấp) vẫn còn sau ba lần. Lý do: mã đó chỉ nằm trong một registry (sổ đăng ký) nhà cung cấp riêng, chưa bao giờ được gửi cho Claude.",
      "Chỗ khó: hai loại lỗi đi qua cùng một vòng retry, nhưng chỉ một loại sửa được bằng cách gọi lại."
    ],
    asks: [
      "Team nên làm gì với các lỗi <code>vendor_tax_id</code>?",
      "Tức là: khi giá trị không hề có trong thứ Claude được thấy, cách nào mới cho ra được giá trị đúng?",
      "Soi từng phương án: nó đưa thêm thông tin cho Claude, hay chỉ gọi lại, nói mạnh hơn, cho ví dụ trên cùng dữ liệu cũ?"
    ],
    facts: [
      "Retry kèm lỗi (gửi lại tài liệu gốc, JSON vừa trả, câu lỗi cụ thể) sửa được lỗi định dạng và lỗi trích xuất: thông tin có trong tài liệu, Claude chỉ viết sai hay đặt nhầm chỗ.",
      "Retry vô ích khi thông tin vắng ở tài liệu nguồn: gọi bao nhiêu lần cũng không moi ra thứ không có. Việc cần làm là đưa thêm tài liệu có thông tin, hoặc chuyển người.",
      "Few-shot giúp model nhận ra giá trị nằm ở đâu khi tài liệu có cấu trúc khác nhau. Nó không tạo ra giá trị không có trong input.",
      "Ép một trường phải có giá trị khi tài liệu không có thì model bịa cho đủ. Mã bịa vẫn qua được schema, nên còn tệ hơn để trống."
    ],
    opts: [
      { k: "A", gist: "Add few-shot examples showing tax IDs correctly pulled from several invoices with different layouts.",
        why: [
          "Sai chỗ: few-shot dạy tìm giá trị đang có trong tài liệu (ý 3). Mã số thuế không có trên hóa đơn.",
          "Thêm ví dụ thì lần sau vẫn không có gì để trích, lỗi y như cũ.",
          "Dễ bị cuốn vì few-shot là cách sửa quen của ca “trường cứ trả null”. Nhưng ca đó là thông tin có mà model không nhận ra. Ở đây thông tin không có."
        ] },
      { k: "B", gist: "Stop retrying those invoices and include the matching vendor registry record in the extraction prompt.",
        why: [
          "Đúng loại lỗi: thông tin vắng ở nguồn (ý 2). Gọi lại không sửa được, nên dừng retry.",
          "Đưa bản ghi registry vào prompt là đưa thêm tài liệu có thông tin. Claude có nguồn để lấy mã, lỗi mới có thể hết.",
          "Một tool tra registry cho Claude gọi cũng đạt cùng mục đích: cho Claude thấy nguồn còn thiếu."
        ] },
      { k: "C", gist: "Make the retry instruction stronger, saying the tax ID is mandatory and must never be left blank.",
        why: [
          "Lời dặn mạnh hơn không tạo ra dữ liệu không có (ý 2).",
          "“Must never be left blank” (không bao giờ được để trống) đẩy model bịa một mã nhìn hợp lệ. Mã đó qua được validator rồi đi thẳng vào hệ thống phía sau (ý 4)."
        ] },
      { k: "D", gist: "Raise the retry limit from three to six and include the previous wrong extraction in every retry.",
        why: [
          "Thêm lượt không đổi thứ Claude được thấy. Mã không có ở lượt 1 thì lượt 6 cũng không có (ý 2).",
          "Chỉ tốn thêm tiền và thời gian, lại tăng khả năng tới một lượt nào đó model bịa đại cho qua validator (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 4.4, mục “Chuyện gì đang xảy ra”: retry có ích với lỗi trích xuất, vô ích khi nguồn không có thông tin; khi đó đưa thêm tài liệu hoặc chuyển người", href: NOTES + "#l-4-4" },
      { label: "Bài 4.2, mục “Bốn chỗ few-shot phát huy”: ví dụ cho cấu trúc tài liệu đa dạng, khi thông tin có trong tài liệu", href: NOTES + "#l-4-2" }
    ]
  },
  {
    de: 4, n: 25, total: 60, sub: "5.3", subName: "Báo lỗi giữa các agent", scen: "S6",
    answer: "C",
    ask: "A coordinator gives each 50-document batch to an extraction subagent. When the document fetch tool times out on a single file, the subagent throws away the extractions it already finished and returns only “batch failed”, so the coordinator reruns the whole batch. Which change addresses this best?",
    scene: [
      "Coordinator (agent điều phối) giao mỗi lô 50 tài liệu cho một subagent trích xuất. “Batch” ở đây là lô việc giao cho subagent, không phải Message Batches API.",
      "Tool lấy tài liệu bị timeout (quá thời gian) ở một file. Subagent bỏ luôn các kết quả đã trích xong và chỉ báo về “batch failed” (lô hỏng).",
      "Coordinator không biết file nào hỏng, đành chạy lại cả 50 tài liệu để cứu một.",
      "Chỗ khó: các phương án sai đều nghe như xử lý lỗi: thử lại tới khi được, bỏ qua cho êm, hay đẩy hết lên coordinator."
    ],
    asks: [
      "Đổi gì là tốt nhất?",
      "Tức là: ai xử lý timeout, và khi không xử lý được thì báo lên cái gì để coordinator chỉ làm lại đúng phần hỏng.",
      "Soi từng phương án: lỗi tạm thời có được thử lại ở đúng tầng, có giới hạn không? Việc đã xong có được giữ không? Lỗi còn lại có được báo thật không?"
    ],
    facts: [
      "Timeout là lỗi transient (tạm thời): thử lại sau một chút thường được. Subagent tự thử lại trước (1–2 lần, backoff là giãn cách tăng dần), có giới hạn, rồi mới đẩy lên những gì nó không tự gỡ được.",
      "Cách báo đúng là structured error context (lỗi có cấu trúc): loại lỗi, đã thử gì, kết quả một phần (partial results), hướng thay thế. Coordinator đọc xong là biết làm gì tiếp.",
      "Guide gọi tên hai cách báo sai. Generic status: một chuỗi chung chung như “batch failed”, giấu hết context. Nuốt lỗi: báo thành công khi việc chưa xong, phía sau tưởng đủ.",
      "Coordinator chỉ biết những gì subagent trả về. Báo cáo không mang kết quả đã xong thì với coordinator, phần việc đó coi như mất."
    ],
    opts: [
      { k: "A", gist: "Have the subagent keep retrying the fetch until the document store answers, so the coordinator never sees transient errors.",
        why: [
          "Thử lại ở subagent là đúng tầng, nhưng thử lại không giới hạn là sai (ý 1).",
          "Kho tài liệu sập lâu thì subagent kẹt mãi, các tài liệu đã trích xong nằm đó không được báo về.",
          "Dễ bị cuốn vì nó đặt việc thử lại đúng chỗ. Nhưng guide đòi thử lại có giới hạn, rồi báo lên phần không tự gỡ được."
        ] },
      { k: "B", gist: "Have the subagent skip the unreachable file and report the whole batch as successful, so one document never interrupts downstream processing.",
        why: [
          "Đây là nuốt lỗi (ý 3): một tài liệu chưa hề được xử lý mà báo cả lô thành công.",
          "Coordinator và hệ thống phía sau tưởng đủ 50. Chỗ hổng chỉ lộ ra khi có người tình cờ đi tìm bản ghi bị thiếu."
        ] },
      { k: "C", gist: "Have the subagent retry the timed-out fetch with backoff, then return the finished extractions plus structured details for any file that still fails.",
        why: [
          "Timeout là lỗi tạm thời, subagent thử lại có giãn cách và có giới hạn trước (ý 1). Phần lớn lần sẽ qua mà coordinator không phải dính vào.",
          "Vẫn không lấy được thì báo về các kết quả đã xong cùng lỗi có cấu trúc: file nào, đã thử gì, loại lỗi gì (ý 2, ý 4).",
          "Coordinator chỉ phải lo một file: thử lại sau, đổi đường lấy, hoặc đi tiếp và ghi chú chỗ thiếu. Không còn chạy lại cả lô."
        ] },
      { k: "D", gist: "Move every retry decision to the coordinator by having the subagent return “batch failed” immediately on any tool error.",
        why: [
          "Giữ nguyên generic status (ý 3): coordinator vẫn không biết file nào hỏng, hỏng vì sao.",
          "Subagent vẫn bỏ việc đã xong, nên coordinator vẫn phải chạy lại cả lô (ý 4).",
          "Còn đẩy lỗi tạm thời lên tầng không cầm file, không cầm trạng thái lô, là tầng kém nhất để thử lại một lần lấy file (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 5.3: subagent tự recover lỗi transient trước, rồi báo structured error context; ba cách báo sai; Dạng 1 của “Khi đi thi”", href: NOTES + "#l-5-3" },
      { label: "Bài 2.2: timeout là lỗi transient; subagent tự thử lại, không được thì báo lên kèm partial results", href: NOTES + "#l-2-2" }
    ]
  },
  {
    de: 4, n: 26, total: 60, sub: "3.4", subName: "Plan mode hay làm thẳng", scen: "S5",
    answer: "D",
    ask: "The pipeline's review step reports that a handler function accepts an empty email string, and a failing unit test points at the exact line. A developer asks Claude Code to add the missing check. How should this change be carried out?",
    scene: [
      "Bước review trong pipeline CI báo: một hàm handler (hàm xử lý request) nhận cả chuỗi email rỗng.",
      "Một unit test đang đỏ chỉ đúng dòng có lỗi.",
      "Dev nhờ Claude Code thêm đoạn kiểm còn thiếu.",
      "Chỗ khó: ba phương án sai đều là công cụ thật, nghe cẩn thận: plan mode, Explore subagent, fork phiên. Phải soi xem việc này có cần tới chúng không."
    ],
    asks: [
      "Nên làm thay đổi này theo cách nào?",
      "Tức là: việc nhỏ, đã biết chỗ, một cách sửa hiển nhiên thì nên plan trước hay làm thẳng.",
      "Soi từng phương án: công cụ đó giải quyết vấn đề gì, và việc này có vấn đề đó không?"
    ],
    facts: [
      "Plan mode là chế độ chỉ đọc: Claude đọc code, khám phá, viết kế hoạch, không sửa file cho tới khi bạn duyệt. Đáng dùng khi thay đổi lớn nhiều file, có nhiều cách làm hợp lệ, hoặc phải quyết kiến trúc.",
      "Direct execution (làm thẳng) hợp với thay đổi nhỏ, phạm vi rõ, một cách làm hiển nhiên. Bài 3.4 nêu đúng ví dụ: thêm một điều kiện validate, fix bug có stack trace chỉ đúng dòng.",
      "Explore subagent đọc codebase trong context riêng và chỉ gửi về bản tóm tắt. Nó dùng cho pha khám phá dài, để output đọc file không làm đầy phiên chính.",
      "Fork phiên (<code>--fork-session</code>, hay <code>/branch</code> trong phiên) tách nhánh từ cùng một bản phân tích để thử hai hướng khác nhau, mỗi nhánh đi độc lập."
    ],
    opts: [
      { k: "A", gist: "Switch to plan mode first, so Claude maps every caller of the handler before proposing the single check.",
        why: [
          "Plan mode đáng tiền khi chưa rõ cách làm, đụng nhiều file, hoặc code lạ (ý 1). Việc này không có điều nào: một hàm, một chỗ, một cách sửa.",
          "Thêm vòng nghiên cứu rồi duyệt kế hoạch chỉ là thủ tục, không đổi kết quả.",
          "Dễ bị cuốn vì “dò hết chỗ gọi trước” nghe như cẩn thận. Nhưng plan mode dành cho lúc chưa biết phải làm gì, còn ở đây test đã chỉ ra hết."
        ] },
      { k: "B", gist: "Hand the work to an Explore subagent so the discovery output stays out of the main context.",
        why: [
          "Explore subagent dùng để cách ly output khám phá dài (ý 3). Việc này không có pha khám phá: test đã chỉ đúng dòng.",
          "Không có output dài nào để cách ly. Khởi động một subagent bắt đầu từ trang trắng chỉ thêm độ trễ cho một chỗ sửa nhỏ."
        ] },
      { k: "C", gist: "Fork the session into two branches and compare alternative validation approaches before committing.",
        why: [
          "Fork dùng khi có hai hướng thật sự khác nhau đáng so (ý 4).",
          "Chặn chuỗi email rỗng trong một hàm chỉ có một cách hiển nhiên. So hai nhánh là tốn công cho một quyết định không tồn tại."
        ] },
      { k: "D", gist: "Make it a direct execution request that names the file, the function and the failing test.",
        why: [
          "Một đoạn kiểm trong một hàm, chỗ đã biết, cách sửa hiển nhiên: đúng ca làm thẳng (ý 2).",
          "Nêu tên file, hàm và test đang đỏ giúp Claude sửa đúng chỗ và biết lúc nào là xong: test xanh. Không cần thêm vòng nghiên cứu và duyệt."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, mục “Chuyện gì đang xảy ra”: bảng chọn plan mode hay làm thẳng (fix bug có stack trace thì làm thẳng); Explore subagent cho pha khám phá dài", href: NOTES + "#l-3-4" },
      { label: "Bài 1.7: fork tách nhánh từ cùng một gốc để so hai hướng", href: NOTES + "#l-1-7" }
    ]
  },
  {
    de: 4, n: 27, total: 60, sub: "3.4", subName: "Plan mode hay làm thẳng", scen: "S5",
    answer: "A",
    ask: "A developer on this team has to restructure how review findings travel from the JSON output into inline PR comments. The change spans dozens of files, several designs are viable, and the developer doesn't know that part of the code. How should they proceed?",
    scene: [
      "Dev cần cấu trúc lại đường đi của finding: từ output JSON của bước review sang comment inline trên PR.",
      "Ba dữ kiện: đụng hàng chục file; có nhiều cách thiết kế đều hợp lệ; dev chưa quen phần code này.",
      "Chỗ khó: các phương án sai đều có lý do nghe được: dặn thật kỹ, cho chạy tự động, hay cứ làm rồi tính."
    ],
    asks: [
      "Dev nên làm thế nào?",
      "Tức là: việc lớn, nhiều cách làm, code lạ thì hiểu và chốt thiết kế trước, hay sửa ngay.",
      "Soi từng phương án: có cho dev thấy và duyệt thiết kế trước khi file bị sửa không?"
    ],
    facts: [
      "Plan mode là chế độ chỉ đọc: Claude đọc file, chạy lệnh khám phá, viết kế hoạch, không sửa file cho tới khi bạn duyệt.",
      "Chọn plan mode khi thay đổi lớn nhiều file, khi có nhiều cách làm hợp lệ phải chọn, khi phải quyết kiến trúc. Plan mode tồn tại để nhìn thấy quyết định trước khi trả giá cho nó.",
      "Độ phức tạp đã lộ rõ trong yêu cầu thì plan ngay. Bài 3.4 xếp “làm thẳng trước, gặp phức tạp mới chuyển sang plan” vào cột tệ, vì tới lúc gặp thì đã phải làm lại.",
      "Cờ <code>-p</code> (<code>--print</code>) chạy Claude Code không tương tác: nhận một prompt, chạy tới khi xong, in kết quả rồi thoát. Hợp với job tự động trong CI, không có bước người duyệt."
    ],
    opts: [
      { k: "A", gist: "Use plan mode so Claude explores the code and proposes a plan for approval before making any edits.",
        why: [
          "Việc này chạm đủ ba dấu hiệu cần plan: hàng chục file, nhiều thiết kế hợp lệ, code lạ (ý 2).",
          "Plan mode cho Claude đọc code và đề xuất cách làm mà chưa sửa file nào (ý 1). Dev đọc, sửa, chốt thiết kế rồi mới cho sửa.",
          "Chốt xong thì chuyển sang làm thẳng để thực hiện kế hoạch."
        ] },
      { k: "B", gist: "Use direct execution with detailed upfront instructions that spell out the intended file structure.",
        why: [
          "Dặn chi tiết cấu trúc file nghĩa là dev đã biết thiết kế đúng. Đề nói ngược lại: nhiều cách làm, dev chưa quen code.",
          "Lời dặn viết khi chưa hiểu code dễ chọn sai hướng, tới khi sửa nhiều file rồi mới lộ (ý 3)."
        ] },
      { k: "C", gist: "Run the restructuring unattended with <code>claude -p</code> so the pipeline applies it without review.",
        why: [
          "<code>-p</code> đúng cho job tự động như review hay sinh test trong CI (ý 4). Nhưng nó không có bước người duyệt thiết kế.",
          "Chạy không người thì Claude tự chọn một trong nhiều thiết kế và sửa hàng chục file trước khi ai kịp xem."
        ] },
      { k: "D", gist: "Start with direct execution in small steps and switch to plan mode once complexity shows up.",
        why: [
          "Đây đúng câu bài 3.4 ghi vào cột tệ (ý 3). Độ phức tạp đã lộ ngay trong đề: hàng chục file, nhiều thiết kế.",
          "Tới lúc “gặp” phức tạp thì nhiều file đã bị sửa theo một hướng có thể phải bỏ. Đó là rework (làm lại).",
          "Dễ bị cuốn vì nghe linh hoạt: hóa ra dễ thì khỏi mất công plan. Nhưng đề đã cho biết việc không dễ, nên đợi gặp là đợi làm lại."
        ] }
    ],
    refs: [
      { label: "Bài 3.4: bảng plan mode hay làm thẳng, và khung “Tệ / Tốt” (đừng làm thẳng rồi gặp phức tạp mới plan)", href: NOTES + "#l-3-4" },
      { label: "Bài 3.6: claude -p chạy không tương tác trong CI", href: NOTES + "#l-3-6" }
    ]
  },
  {
    de: 4, n: 28, total: 60, sub: "1.1", subName: "Vòng lặp agent", scen: "S5",
    answer: "B",
    ask: "This team's review service calls the Messages API with a <code>fetch_file</code> tool, so Claude can ask for imports and tests in the middle of a review. Once the service has retrieved a requested file, how must it hand the contents back so Claude can keep analyzing?",
    scene: [
      "Dịch vụ review gọi thẳng Messages API, khai một tool <code>fetch_file</code>. Đang review, Claude xin file import hay file test qua tool này.",
      "Dịch vụ đã lấy được file Claude xin. Giờ phải đưa nội dung cho Claude.",
      "Chỗ khó: bốn phương án là bốn đường đưa dữ liệu. Chỉ một đường đúng định dạng API chấp nhận."
    ],
    asks: [
      "Dịch vụ phải đưa nội dung file về thế nào để Claude phân tích tiếp?",
      "Tức là: kết quả tool đi vào hội thoại ở đâu, mang gì để khớp với lời xin, và gửi kèm những gì.",
      "Soi từng phương án: API có nhớ lượt trước không, có vai “tool” không, và block <code>tool_use</code> đang chờ có được trả lời không?"
    ],
    facts: [
      "API không có trí nhớ (stateless). Mỗi lần gọi phải gửi lại toàn bộ lịch sử trong <code>messages</code>. <code>messages</code> là bộ nhớ duy nhất của Claude.",
      "Claude không tự chạy tool. Nó trả block <code>tool_use</code> (tên tool, tham số, một <code>id</code>) với <code>stop_reason: \"tool_use\"</code>, rồi chờ code của bạn chạy.",
      "Kết quả đi trong block <code>tool_result</code>, nằm trong một message <code>role: \"user\"</code>, mang <code>tool_use_id</code> trùng <code>id</code> của lời xin. Mỗi <code>tool_use</code> có đúng một <code>tool_result</code>.",
      "API chỉ có hai vai: <code>assistant</code> là thứ Claude viết, <code>user</code> là mọi thứ đi vào từ bên ngoài. Docs ghi: <code>tool_result</code> phải đứng ngay sau message chứa <code>tool_use</code>; thiếu thì API báo lỗi “tool_use ids were found without tool_result blocks immediately after” (có tool_use mà không có tool_result ngay sau)."
    ],
    opts: [
      { k: "A", gist: "Put the fetched file contents into the <code>fetch_file</code> tool's description, so Claude reads them on its next pass.",
        why: [
          "Sai chỗ: khai báo tool nói tool làm gì, nhận tham số gì. Nó là phần cố định, không phải kênh chở kết quả.",
          "Block <code>tool_use</code> đang chờ vẫn không có <code>tool_result</code> nào trả lời, nên API báo lỗi (ý 3, ý 4). Nội dung file còn bị gửi lặp ở mọi request sau, vì khai báo tool đi kèm mỗi lần gọi."
        ] },
      { k: "B", gist: "Append a user message holding a <code>tool_result</code> block whose <code>tool_use_id</code> matches the request, then send the full history again.",
        why: [
          "Đúng định dạng: <code>tool_result</code> trong message <code>role: \"user\"</code>, <code>tool_use_id</code> khớp lời xin (ý 3).",
          "Gửi lại cả lịch sử (message assistant có <code>tool_use</code>, rồi message user có <code>tool_result</code>) vì API không nhớ gì (ý 1). Lúc đó Claude mới thấy file và quyết bước tiếp: xin file khác, hay viết finding."
        ] },
      { k: "C", gist: "Send the file contents as a plain user text message in a new request, since the API keeps earlier turns on the server.",
        why: [
          "Sai ở giả định: API không giữ lượt cũ trên server (ý 1). Request mới chỉ có một tin text thì Claude không biết đang review gì.",
          "Text thường cũng không trả lời block <code>tool_use</code> đang chờ. Nếu có gửi kèm lịch sử, API báo lỗi vì <code>tool_use</code> thiếu <code>tool_result</code> ngay sau (ý 4)."
        ] },
      { k: "D", gist: "Add a message with a dedicated <code>tool</code> role carrying the file contents, so the API routes it to the pending request.",
        why: [
          "Sai ở giả định: API của Anthropic chỉ có <code>user</code> và <code>assistant</code>, không có vai <code>tool</code> (ý 4).",
          "Kết quả khớp với lời xin bằng <code>tool_use_id</code>, không phải bằng vai.",
          "Dễ bị cuốn vì API của vài nhà cung cấp khác có vai <code>tool</code> hay <code>function</code> riêng. Docs Anthropic ghi rõ: tool nằm ngay trong cấu trúc message <code>user</code> / <code>assistant</code>."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D1, mục 4: sáu bộ phận của vòng lặp; tool_result nằm ở vai user, mang tool_use_id", href: NOTES + "#l-1-0" },
      { label: "Bài 1.1, mục “Vòng lặp chuẩn, từng dòng”: nối nguyên response, mỗi tool_use đúng một tool_result", href: NOTES + "#l-1-1" },
      { label: "Docs Handle tool calls: tool_result phải đứng ngay sau tool_use và đứng đầu content; không có vai tool riêng", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls" }
    ]
  },
  {
    de: 4, n: 29, total: 60, sub: "4.2", subName: "Few-shot cho output ổn định", scen: "S5",
    answer: "BD",
    ask: "This team's review prompt describes the required finding format in detail, yet findings keep alternating between concrete fixes and vague notes. Which two changes best restore consistent, actionable output? (Select TWO.)",
    scene: [
      "Prompt review của team mô tả rất kỹ format bắt buộc của mỗi finding.",
      "Vậy mà finding lúc có cách sửa cụ thể, lúc chỉ là ghi chú mơ hồ.",
      "Chỗ khó: mô tả đã chi tiết rồi, thêm chữ hay nói to hơn không đổi được gì. Đề chọn hai, nên phải thấy hai phương án đúng bổ sung cho nhau thế nào."
    ],
    asks: [
      "Hai thay đổi nào đưa output về ổn định và dùng được?",
      "Tức là: khi mô tả bằng lời đã kỹ mà output vẫn lệch, phải cho model thứ gì khác lời mô tả.",
      "Soi từng phương án: nó làm từng finding được viết đúng khuôn, hay chỉ lọc bớt, hay chỉ nhấn mạnh?"
    ],
    facts: [
      "Guide: khi chỉ dẫn chi tiết vẫn cho kết quả không nhất quán, few-shot (đặt vài ví dụ input → output vào prompt) là kỹ thuật hiệu quả nhất. Một ví dụ finding đầy đủ đáng giá hơn ba đoạn mô tả, vì model bắt chước hình dạng rất tốt.",
      "Guide khuyên 2–4 ví dụ nhắm đúng ca mơ hồ, mỗi ví dụ kèm lý do. Có lý do, model mới khái quát (áp sang ca mới chưa thấy) thay vì chỉ khớp y hệt ví dụ.",
      "Ví dụ tốt có bốn tính chất: relevant (sát ca thật), diverse (đa dạng), structured (bọc trong thẻ <code>&lt;example&gt;</code>), few &amp; targeted (ít và nhắm đích).",
      "Viết hoa, ALWAYS hay NEVER chỉ làm câu đó nổi hơn, không thêm thông tin. Confidence model tự chấm hiệu chuẩn kém; guide chỉ dùng nó để sắp ưu tiên finding nào đưa người xem, không phải để quy định finding được viết ra sao."
    ],
    opts: [
      { k: "A", gist: "Have the model attach a self-rated confidence score to every finding and drop anything below a fixed threshold.",
        why: [
          "Sai chỗ: confidence là để chọn finding nào cần người xem, không đụng tới cách một finding được viết (ý 4).",
          "Lọc theo ngưỡng chỉ giấu bớt một số finding. Những cái còn lại vẫn lúc cụ thể lúc mơ hồ y như cũ, lại có thể mất bug thật."
        ] },
      { k: "B", gist: "Add two to four examples showing the exact finding layout: file location, issue, severity and a concrete fix.",
        why: [
          "Đúng bước sau mô tả: chỉ dẫn đã kỹ mà output vẫn lệch thì cho ví dụ (ý 1).",
          "Ví dụ đủ bốn phần cho model một khuôn để bắt chước, không còn phải tự hiểu lời mô tả. Finding nào cũng có cách sửa cụ thể như mẫu.",
          "Hai tới bốn ví dụ, đúng số guide khuyên (ý 2)."
        ] },
      { k: "C", gist: "Rewrite the format rules in capital letters with words like ALWAYS and NEVER so they outrank other guidance.",
        why: [
          "Chỉ dẫn đã chi tiết. Viết hoa chỉ nhấn mạnh, không thêm thông tin gì về khuôn cần theo (ý 4).",
          "Model vẫn phải tự hiểu lời mô tả như trước, nên vẫn lúc cụ thể lúc mơ hồ.",
          "Dễ bị cuốn vì nghe như sửa đúng bệnh: model “không chịu theo” format. Nhưng vấn đề là lời mô tả để model tự suy diễn, mà nói to hơn không bớt được chỗ suy diễn."
        ] },
      { k: "D", gist: "Take real cases from the codebase as examples, ambiguous ones included, and show the reasoning behind each verdict.",
        why: [
          "Ví dụ lấy từ code thật là relevant (sát ca thật). Có cả ca mơ hồ, đúng chỗ reviewer đang chao đảo (ý 2, ý 3).",
          "Lý do kèm mỗi kết luận dạy model cách phán đoán, nên nó khái quát sang finding mới thay vì chỉ chép mẫu (ý 2).",
          "B lo khuôn của finding, D lo nội dung bên trong khuôn. Hai cái bổ sung cho nhau."
        ] }
    ],
    refs: [
      { label: "Bài 4.2, “Khi đi thi” Dạng 2 và mục “Biết thêm”: format lúc đủ lúc thiếu thì cho ví dụ đúng khuôn; bốn tính chất của ví dụ tốt", href: NOTES + "#l-4-2" },
      { label: "Bài 4.1: confidence tự chấm hiệu chuẩn kém, không dùng làm bộ lọc chính", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 4, n: 30, total: 60, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema", scen: "S5",
    answer: "C",
    ask: "The structured review findings this team produces carry a <code>category</code> enum limited to <code>bug</code>, <code>security</code>, <code>performance</code> and <code>style</code>. Licensing and accessibility findings are being pushed into <code>style</code> and sent to the wrong reviewers. Which schema change best handles findings that fall outside the listed categories?",
    scene: [
      "Finding có cấu trúc của team có trường <code>category</code> là enum bốn giá trị: <code>bug</code>, <code>security</code>, <code>performance</code>, <code>style</code>.",
      "Finding về license (giấy phép phần mềm) và accessibility (khả năng tiếp cận cho người khuyết tật) không thuộc loại nào, nên bị nhét vào <code>style</code>.",
      "Hậu quả: các finding đó bị chuyển tới sai người review.",
      "Chỗ khó: schema chặt nên output luôn hợp lệ. Lỗi nằm ở danh sách thiếu chỗ cho giá trị đúng, không phải ở model không tuân thủ."
    ],
    asks: [
      "Đổi schema thế nào để xử lý finding nằm ngoài danh sách?",
      "Tức là: cho finding lạc loại một chỗ đi trung thực, mà vẫn giữ bốn loại cũ chặt để định tuyến tự động.",
      "Soi từng phương án: còn giữ được enum không? Finding lạc loại có nhãn rõ và có mô tả không?"
    ],
    facts: [
      "Enum là danh sách giá trị được phép, Claude chỉ được chọn trong đó. Danh sách thiếu giá trị đúng thì model buộc phải chọn giá trị gần nhất, tức là chọn sai.",
      "Guide 4.3: category thêm <code>\"other\"</code> đi kèm một trường <code>detail</code> dạng chuỗi để mở rộng, và <code>\"unclear\"</code> cho ca mơ hồ.",
      "Optional / nullable dành cho thông tin tài liệu có thể không có. Mục đích là chống bịa cho đủ trường.",
      "Lời dặn trong prompt là xác suất, và không sửa được một schema không có đáp án đúng cho một số input."
    ],
    opts: [
      { k: "A", gist: "Make <code>category</code> optional so the model can leave it empty whenever no listed value fits.",
        why: [
          "Sai đòn bẩy: optional dành cho thông tin có thể vắng (ý 3). Finding nào cũng có loại, chỉ là loại đó chưa có trong danh sách.",
          "Để trống thì mất thông tin, bước định tuyến không biết chuyển finding cho ai."
        ] },
      { k: "B", gist: "Replace the enum with an unconstrained string so the model can label each finding with any category it likes.",
        why: [
          "Bỏ enum là đổi lỗi nhãn sai lấy lỗi nhãn không đều: cùng một loại có thể ra “Security”, “sec”, “vulnerability”.",
          "Định tuyến cần tập giá trị đóng, đoán trước được. Chuỗi tự do làm hỏng luôn bốn loại đang chạy tốt (ý 1)."
        ] },
      { k: "C", gist: "Add an <code>\"other\"</code> value to the category enum along with a free-text field that describes the uncategorized finding.",
        why: [
          "Đúng mẫu guide: enum thêm <code>\"other\"</code> kèm trường mô tả dạng chuỗi (ý 2).",
          "Bốn loại cũ vẫn là giá trị chặt, máy định tuyến được. Finding license hay accessibility có chỗ đi trung thực, không bị ép vào <code>style</code>.",
          "Trường mô tả ghi lại finding đó là gì, để người chuyển tay đúng chỗ. Loại nào hay xuất hiện thì sau này nâng thành giá trị enum riêng."
        ] },
      { k: "D", gist: "Add a prompt instruction telling the model to pick the closest existing category whenever a finding doesn't fit cleanly.",
        why: [
          "Lời dặn này biến đúng cái hành vi đang gây chuyển sai thành luật. Loại gần nhất của một finding license vẫn là loại sai (ý 1).",
          "Prompt không sửa được schema không có đáp án đúng (ý 4). Phải sửa chính schema.",
          "Dễ bị cuốn vì nghe như cho model một quy tắc rõ ràng thay vì để nó tự đoán. Nhưng quy tắc rõ mà dẫn tới nhãn sai thì vẫn là nhãn sai."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, mục “Thiết kế schema để model không bịa”: enum thêm other kèm detail, unclear; nullable cho thông tin có thể vắng", href: NOTES + "#l-4-3" },
      { label: "Bài Nền tảng D4, bảng từ khóa schema: enum thêm other kèm trường mô tả", href: NOTES + "#l-4-0" }
    ]
  },
  {
    de: 4, n: 31, total: 60, sub: "3.2", subName: "Slash command và skill", scen: "S5",
    answer: "C",
    ask: "A developer wants to try a stricter version of the team's shared <code>/pr-review</code> skill in their own local sessions, running it next to the team version to compare results. Teammates and the pipeline must not see any change. How should the stricter variant be set up?",
    scene: [
      "Team có skill <code>/pr-review</code> dùng chung, nằm trong repo. Một dev muốn thử một bản chặt hơn trên máy mình.",
      "Hai ràng buộc: chạy được hai bản song song trong cùng phiên để so kết quả, và “without changing what teammates or the pipeline see” (không đổi gì với đồng đội và pipeline).",
      "Chỗ khó: chỗ đặt quyết định ai thấy skill, còn tên quyết định bản nào chạy khi trùng. Phải đúng cả hai."
    ],
    asks: [
      "Bản chặt hơn nên đặt ở đâu, đặt tên gì?",
      "Tức là: một chỗ chỉ máy dev có, và một cái tên không đụng bản của team, để gọi được cả hai.",
      "Soi từng phương án bằng hai câu: đồng đội hay pipeline có nhận được không? Trên máy dev còn gọi được bản của team không?"
    ],
    facts: [
      "Skill project nằm ở <code>.claude/skills/&lt;tên&gt;/SKILL.md</code> trong repo. Commit lên thì ai pull cũng có, kể cả pipeline checkout repo.",
      "Skill cá nhân nằm ở <code>~/.claude/skills/&lt;tên&gt;/SKILL.md</code>, trong thư mục home. Nó chỉ có trên máy đó, dùng được ở mọi project, không bao giờ đi theo git.",
      "Hai skill trùng tên ở hai cấp thì chỉ một bản chạy. Docs ghi rõ: bản cá nhân thắng bản project. Bản project bị che trên máy đó mà không báo gì.",
      "CLAUDE.md, kể cả <code>~/.claude/CLAUDE.md</code>, nạp ở mọi phiên, dành cho chuẩn áp dụng mọi lúc. Skill thì gọi theo việc, bằng <code>/tên</code> hoặc khi việc đang làm khớp mô tả."
    ],
    opts: [
      { k: "A", gist: "Commit the stricter variant as <code>pr-review-strict</code> in the repository's <code>.claude/skills/</code> folder.",
        why: [
          "Tên khác nên không che bản của team. Nhưng sai chỗ đặt: <code>.claude/skills/</code> trong repo là skill project (ý 1).",
          "Commit xong, lần pull sau đồng đội thấy thêm <code>/pr-review-strict</code> trong menu, pipeline cũng có. Trái ràng buộc không đổi gì với team.",
          "Đây là bước đúng khi thử xong và team đồng ý dùng bản chặt, chưa phải lúc đang thử."
        ] },
      { k: "B", gist: "Put the stricter review rules into the developer's <code>~/.claude/CLAUDE.md</code> so every local session applies them.",
        why: [
          "Không đụng tới team, vì <code>~/.claude/CLAUDE.md</code> chỉ có trên máy dev. Nhưng file này nạp ở mọi phiên (ý 4), không phải một skill để gọi lúc cần.",
          "Luật chặt trộn luôn vào lần chạy <code>/pr-review</code> của team. Cả hai kết quả đều bị luật chặt chi phối, không còn so sánh sạch được."
        ] },
      { k: "C", gist: "Create the stricter variant in <code>~/.claude/skills/</code> under a different name, for example <code>pr-review-strict</code>.",
        why: [
          "Đặt trong home nên chỉ máy dev có. Đồng đội và pipeline không nhận gì (ý 2).",
          "Tên khác nên không che bản của team (ý 3). Trong cùng một phiên, dev gọi được cả <code>/pr-review</code> lẫn <code>/pr-review-strict</code> để so.",
          "Docs: trường <code>name</code> trong frontmatter cũng đặt tên lệnh hiện trong menu <code>/</code>. Nên ở đó cũng ghi tên mới, đừng chép nguyên <code>name: pr-review</code> của bản gốc."
        ] },
      { k: "D", gist: "Create the stricter variant at <code>~/.claude/skills/pr-review/</code>, so it loads only in the developer's own sessions.",
        why: [
          "Đúng chỗ đặt, sai tên. Trùng tên <code>pr-review</code> thì bản cá nhân thắng, bản của team bị che trên máy dev (ý 3).",
          "Gõ <code>/pr-review</code> giờ chỉ chạy bản chặt. Dev mất bản của team trên máy mình, nên không chạy song song được.",
          "Dễ bị cuốn vì nó đúng là chỉ nằm trên máy dev, không ai khác bị ảnh hưởng. Nhưng đề đòi thêm chạy song song, mà trùng tên thì chỉ còn một bản."
        ] }
    ],
    refs: [
      { label: "Bài 3.2, khung Tệ/Tốt và “Khi đi thi”: bản skill riêng đặt ở ~/.claude/skills/ với tên khác; cùng tên thì đè skill project", href: NOTES + "#l-3-2" },
      { label: "Cheatsheet D3: dòng “Muốn bản skill riêng, không ảnh hưởng team”", href: NOTES + "#cheat-d3" },
      { label: "Docs Skills, mục “Resolve skills that share a name”: trùng tên thì enterprise thắng personal, personal thắng project", href: "https://code.claude.com/docs/en/skills" }
    ]
  },
  {
    de: 4, n: 32, total: 60, sub: "3.1", subName: "Cấp của CLAUDE.md và chia sẻ cho team", scen: "S5",
    answer: "A",
    ask: "A developer reports that the team's review prompt produces far fewer style findings in their local Claude Code session than in the CI job, even though both run the identical prompt against the same repository checkout. What is the best first diagnostic step?",
    scene: [
      "Cùng prompt review, cùng một bản checkout của repo. Chạy trên máy dev thì ra ít lỗi style (cách trình bày code) hơn hẳn lúc chạy trong CI.",
      "Chỗ khó: code và prompt giống nhau mà kết quả lệch đều đặn. Thứ khác nhau phải nằm ở thứ mỗi bên nạp thêm, không nằm trong repo.",
      "Đề hỏi bước chẩn đoán đầu tiên, chưa hỏi cách sửa."
    ],
    asks: [
      "Bước chẩn đoán đầu tiên tốt nhất là gì?",
      "Tức là: làm sao nhìn thấy máy dev đang nạp chỉ dẫn gì mà CI không có.",
      "Soi từng phương án: nó cho thấy chỗ khác nhau, hay đoán rồi sửa luôn?"
    ],
    facts: [
      "<code>~/.claude/CLAUDE.md</code> (cấp user) và <code>CLAUDE.local.md</code> (thường để trong <code>.gitignore</code>) chỉ có trên máy dev. CI clone repo chỉ nhận memory file đã commit, như <code>./CLAUDE.md</code> hay <code>./.claude/CLAUDE.md</code>.",
      "Memory file các cấp không đè nhau mà được nối hết vào context. Một file cá nhân dặn “bỏ qua lỗi style vặt” sẽ lặng lẽ cộng thêm vào chỉ dẫn của team ở mọi phiên trên máy đó.",
      "Docs: gõ <code>/context</code> (đầy đủ là <code>/context all</code>) để xem danh sách file đã nạp ở mục “Memory files”. <code>/memory</code> liệt kê các memory file và mở ra sửa. Notes (theo guide) dùng <code>/memory</code> cho cùng việc chẩn đoán này.",
      "Settings (<code>settings.json</code>) lo quyền dùng tool, hook, biến môi trường. Nội dung của nó không đi vào context, nên không phải chỗ chứa chỉ dẫn review."
    ],
    opts: [
      { k: "A", gist: "Run <code>/context</code> in the developer's local session and compare its Memory files list with what CI loads.",
        why: [
          "Đúng bước đầu: <code>/context</code> cho thấy phiên local đã nạp những memory file nào (ý 3).",
          "So với các file đã commit mà CI nhận (ý 1). Thấy dôi ra <code>~/.claude/CLAUDE.md</code> hay <code>CLAUDE.local.md</code> có dòng về style là ra nguyên nhân (ý 2).",
          "Tìm ra rồi mới sửa: phần nào team cần thì chuyển vào CLAUDE.md của project, để CI và đồng đội cùng thấy."
        ] },
      { k: "B", gist: "Re-run the CI job several times and keep whichever run's findings match the local results.",
        why: [
          "Sai ở giả định: coi chỗ lệch là ngẫu nhiên. Hai môi trường lệch đều đặn trên cùng checkout là do cấu hình khác nhau, không phải do may rủi.",
          "Chọn lần chạy hợp ý chỉ giấu vấn đề. PR sau, CI vẫn lệch y như cũ."
        ] },
      { k: "C", gist: "Run <code>claude doctor</code> on the CI runner to list any settings entries that were rejected when the job started.",
        why: [
          "Sai tầng: lệnh này soi settings, mà settings lo quyền, hook, biến môi trường (ý 4). Chỉ dẫn review nằm ở memory file.",
          "Còn soi nhầm phía: CI đang nạp đúng bản của team. Thứ dôi ra nằm trên máy dev (ý 1).",
          "Dễ bị cuốn vì “doctor” nghe như lệnh chẩn đoán chung. Nhưng chỗ lệch là chỉ dẫn được nạp, soi settings không thấy được."
        ] },
      { k: "D", gist: "Add stronger wording to the project <code>CLAUDE.md</code> telling Claude to ignore style issues during review.",
        why: [
          "Sửa khi chưa biết nguyên nhân. Đề hỏi bước chẩn đoán đầu tiên, phương án này nhảy thẳng sang sửa.",
          "Chưa ai biết bên nào mới đúng ý team. Viết thêm lệnh mạnh vào file chung là đoán mò, và có thể kéo CI lệch khỏi thứ team cần."
        ] }
    ],
    refs: [
      { label: "Bài 3.1: ba cấp CLAUDE.md, cấp user không đi theo git; hành vi lệch giữa các máy thì xem đang nạp file nào", href: NOTES + "#l-3-1" },
      { label: "Cheatsheet D3: dòng “Hành vi không nhất quán giữa các phiên”", href: NOTES + "#cheat-d3" },
      { label: "Docs “How Claude remembers your project”, mục Troubleshoot: /context all, xem danh sách Memory files; các file được nối vào nhau, không đè nhau", href: "https://code.claude.com/docs/en/memory" }
    ]
  },
  {
    de: 4, n: 33, total: 60, sub: "3.6", subName: "Đưa Claude Code vào CI/CD", scen: "S5",
    answer: "B",
    ask: "This team's pipeline step launches the <code>claude</code> command with the review prompt passed as an argument. Every job sits idle until the runner's timeout kills it, and no review is ever produced. What change fixes the step?",
    scene: [
      "Bước pipeline gọi <code>claude</code> kèm prompt review. Job nào cũng đứng yên tới khi runner hết giờ và giết job. Không ra review nào.",
      "Ví dụ minh họa:<pre><code>claude \"Review this PR\"      → phiên tương tác, chờ người gõ tiếp\nclaude -p \"Review this PR\"   → chạy xong, in ra stdout, thoát</code></pre>",
      "Chỗ khó: ba phương án sai đều là thứ có thật và hay đi cùng CI (permission mode, output JSON, timeout). Chỉ một cái đổi được loại phiên."
    ],
    asks: [
      "Sửa bước này thế nào?",
      "Tức là: làm sao cho Claude Code chạy không cần người, xong việc thì tự thoát.",
      "Soi từng phương án: nó có biến phiên tương tác thành phiên không tương tác không?"
    ],
    facts: [
      "<code>claude \"query\"</code> mở phiên tương tác kèm prompt đầu. Làm xong lượt đó, nó chờ người gõ tiếp. CI không có ai gõ, nên job đứng tới timeout.",
      "Cờ <code>-p</code> (<code>--print</code>) chạy không tương tác (headless): nhận prompt, chạy vòng lặp tới khi xong, in kết quả ra stdout rồi thoát.",
      "<code>--output-format</code> chỉ chọn định dạng in cho chế độ <code>-p</code> (<code>text</code>, <code>json</code>, <code>stream-json</code>). Nó không tự bật chế độ đó.",
      "Permission mode (vd <code>acceptEdits</code>) và <code>--allowedTools</code> quyết định tool nào được chạy không cần hỏi. Chạy <code>-p</code> trong CI thường cần thêm chúng, nhưng chúng không đổi loại phiên."
    ],
    opts: [
      { k: "A", gist: "Set <code>--permission-mode acceptEdits</code> so the run never pauses to wait for approval of file edits.",
        why: [
          "Sai chỗ: permission mode lo việc duyệt tool (ý 4). Phiên vẫn là phiên tương tác, vẫn chờ người gõ (ý 1).",
          "Dễ bị cuốn vì chạy <code>-p</code> trong CI đúng là hay phải cho phép tool, không thì bị từ chối. Nhưng đó là bước sau, khi phiên đã không tương tác."
        ] },
      { k: "B", gist: "Run the command with the <code>-p</code> flag so it processes the prompt, prints the result, and exits.",
        why: [
          "Đúng cờ: <code>-p</code> chuyển sang chạy không tương tác, xong thì in kết quả ra stdout và thoát (ý 2).",
          "Job không còn chờ ai, review chạy xong là bước kết thúc. Muốn script đọc kết quả thì thêm <code>--output-format json</code> sau đó (ý 3)."
        ] },
      { k: "C", gist: "Add <code>--output-format json</code> so the result comes out as machine-readable output the pipeline can parse.",
        why: [
          "Sai ở giả định: <code>--output-format</code> chỉ đổi cách in của chế độ <code>-p</code>, không tự bật chế độ đó (ý 3).",
          "Thiếu <code>-p</code> thì vẫn là phiên tương tác, job vẫn đứng. Có <code>-p</code> rồi thì thêm cờ này là đúng, để đăng finding thành comment."
        ] },
      { k: "D", gist: "Raise the pipeline step's timeout so the review has enough time to finish before the runner kills it.",
        why: [
          "Sai ở giả định: coi job là chậm. Thật ra nó đang chờ người gõ (ý 1), chờ bao lâu cũng không xong.",
          "Chỉ làm job hỏng muộn hơn, và tốn thêm phút chạy runner."
        ] }
    ],
    refs: [
      { label: "Bài 3.6, mục “Chuyện gì đang xảy ra”: không có -p thì job chờ nhập liệu tới timeout; -p xử lý prompt, in ra stdout, thoát", href: NOTES + "#l-3-6" },
      { label: "Docs CLI reference: claude \"query\" mở phiên tương tác; -p in kết quả không vào chế độ tương tác; --output-format chỉ cho print mode", href: "https://code.claude.com/docs/en/cli-reference" }
    ]
  },
  {
    de: 4, n: 34, total: 60, sub: "1.5", subName: "Hook của Agent SDK: chặn tool call và chuẩn hóa dữ liệu", scen: "S5",
    answer: "C",
    ask: "The review agent in this pipeline reads CI results from three MCP servers, two of them third-party. They return mixed formats: Unix timestamps, ISO 8601 dates and numeric build states. The agent sometimes reports a failed build as passing in PR comments. What is the most maintainable fix?",
    scene: [
      "Agent review đọc kết quả CI từ ba MCP server. Hai cái là của bên thứ ba, team không sửa được.",
      "Dữ liệu trả về lộn xộn: ngày giờ lúc là Unix timestamp (số giây kể từ năm 1970), lúc là chuỗi ISO 8601; trạng thái build là con số. Ví dụ minh họa:<pre><code>server 1: { \"finished\": 1772668800, \"state\": 2 }\nserver 2: { \"finished\": \"2026-03-05T00:00:00Z\", \"state\": \"failed\" }</code></pre>",
      "Hậu quả: thỉnh thoảng agent báo build hỏng thành build qua trong comment PR.",
      "Chỗ khó: cả bốn phương án đều nhắm đúng chuyện chuẩn hóa. Đề hỏi cách “most maintainable” (dễ bảo trì nhất), nên phải so chỗ đặt và độ chắc chắn."
    ],
    asks: [
      "Cách sửa nào dễ bảo trì nhất?",
      "Tức là: một chỗ duy nhất, chạy bằng code, đổi mọi kết quả về một định dạng trước khi Claude đọc, và làm được với cả server của bên thứ ba.",
      "Soi từng phương án: chuẩn hóa có chắc chắn không (code hay lời dặn)? Có phải viết lại ở nhiều chỗ không?"
    ],
    facts: [
      "<code>PostToolUse</code> là hook chạy sau khi tool trả kết quả, trước khi kết quả được nối vào <code>messages</code> cho Claude đọc. Đây là chỗ chuẩn hóa dữ liệu: ngày giờ về ISO 8601, trạng thái về một bộ giá trị cố định.",
      "Trong kết quả của PostToolUse, <code>updatedToolOutput</code> thay hẳn kết quả tool. Hook chọn tool bằng <code>matcher</code>; tool MCP có tên dạng <code>mcp__server__tool</code>.",
      "Hook là code, chạy ở mọi lần gọi khớp matcher. CLAUDE.md và lời dặn trong prompt thì Claude làm theo phần lớn thời gian, vẫn là xác suất.",
      "Hook nằm ở phía agent, nên chặn được kết quả của cả server bên thứ ba mà không phải đụng tới server."
    ],
    opts: [
      { k: "A", gist: "Expose a custom <code>normalize_result</code> MCP tool and instruct the agent to call it after every CI data fetch.",
        why: [
          "Sai ở chỗ dựa vào Claude nhớ gọi: dặn gọi tool chuẩn hóa sau mỗi lần lấy dữ liệu vẫn là lời dặn, vẫn xác suất (ý 3).",
          "Kết quả lộn xộn đã vào context trước khi được chuẩn hóa. Mỗi lần lấy dữ liệu tốn thêm một lượt gọi, và thêm một tool phải bảo trì.",
          "Dễ bị cuốn vì logic chuẩn hóa cũng nằm trong code. Nhưng code đó chỉ chạy khi Claude chịu gọi. Hook thì tự chạy."
        ] },
      { k: "B", gist: "Document each server's timestamp and build-state conventions in the project <code>CLAUDE.md</code> so the agent interprets them.",
        why: [
          "CLAUDE.md là chỉ dẫn, không phải bước biến đổi dữ liệu (ý 3). Claude vẫn phải tự quy đổi, nên vẫn có lần đọc nhầm mã trạng thái.",
          "Lỗi “build hỏng báo thành qua” vẫn còn, chỉ hiếm hơn."
        ] },
      { k: "C", gist: "Register a <code>PostToolUse</code> hook matched to those tools that rewrites each result into one consistent format.",
        why: [
          "Hook chạy sau khi tool trả kết quả, trước khi Claude đọc (ý 1). Nó trả <code>updatedToolOutput</code>, thay hẳn kết quả bằng bản một định dạng (ý 2).",
          "Matcher gắn đúng tên <code>mcp__…</code> của ba server, tool khác không bị đụng. Hook là code nên chạy mọi lần (ý 3), và dùng được với server bên thứ ba (ý 4).",
          "Thêm nguồn mới chỉ phải sửa một chỗ. Vì vậy nó dễ bảo trì nhất."
        ] },
      { k: "D", gist: "Build proxy MCP servers around the third-party ones that reformat their responses before returning them.",
        why: [
          "Chạy được: proxy là code, đổi dữ liệu chắc chắn. Nhưng mỗi server một proxy, logic chuẩn hóa bị chép ra nhiều chỗ.",
          "Thêm nguồn mới là thêm một proxy phải dựng và nuôi. Hook làm cùng việc đó ở một chỗ trong vòng lặp agent (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 1.5: PostToolUse chuẩn hóa ngày giờ, mã trạng thái trước khi Claude đọc; mục “Biết thêm”: updatedToolOutput thay hẳn kết quả", href: NOTES + "#l-1-5" },
      { label: "Cheatsheet D1: dòng “Các tool trả ngày giờ / trạng thái nhiều định dạng”", href: NOTES + "#cheat-d1" }
    ]
  },
  {
    de: 4, n: 35, total: 60, sub: "4.4", subName: "Validate, retry kèm lỗi và vòng phản hồi", scen: "S5",
    answer: "C",
    ask: "The review step in this pipeline outputs its findings as JSON. A validator rejects roughly one run in ten because a finding's <code>line</code> value falls outside the pull request diff. The team wants the step to recover automatically on the next attempt. What should the retry request contain?",
    scene: [
      "Bước review xuất finding dạng JSON. Validator (code kiểm nội dung của team) loại khoảng một lần chạy trong mười.",
      "Lý do: một finding có <code>line</code> (số dòng) nằm ngoài phần diff của PR. Ví dụ minh họa:<pre><code>diff của invoice.ts: dòng 40–95\nfinding 3: invoice.ts, line 212   ← validator loại</code></pre>",
      "Chỗ khó: JSON vẫn đúng hình dạng, chỉ sai nội dung. Lỗi này Claude sửa được, vì diff nằm ngay trong input.",
      "Team muốn lần chạy sau tự sửa được, không cần người."
    ],
    asks: [
      "Request của lần retry nên chứa gì?",
      "Tức là: gửi gì để Claude biết mình sai ở đâu và sửa đúng chỗ đó.",
      "Soi từng phương án: request có đủ ba thứ không, gồm input gốc, output vừa sai và câu lỗi cụ thể?"
    ],
    facts: [
      "Mỗi lần gọi là độc lập, Claude không nhớ lượt trước. Muốn nó đối chiếu thì phải gửi lại input gốc, ở đây là diff.",
      "Retry kèm lỗi (retry with error feedback): request lượt sau chứa input gốc, output vừa sai, và câu lỗi cụ thể do validator sinh ra. Gửi lại y nguyên rồi cầu may thì Claude dễ sai y hệt.",
      "Schema chỉ bảo đảm hình dạng và kiểu. Số dòng có nằm trong diff không là lỗi ngữ nghĩa, phải có validator bằng code kiểm.",
      "Retry có ích khi thông tin để sửa nằm trong input. Gọi lại 1–2 lần vẫn sai thì đưa người xem, không gọi tiếp."
    ],
    opts: [
      { k: "A", gist: "Send the original diff plus a general note that the previous attempt was invalid and must be regenerated.",
        why: [
          "Thiếu hai thứ: output vừa sai và câu lỗi cụ thể (ý 2). Claude chỉ biết là có chỗ sai, không biết finding nào, trường nào.",
          "Lần sau gần như là một lần chạy mới. Có thể lại ra số dòng ngoài diff, hoặc làm hỏng chỗ khác.",
          "Dễ bị cuốn vì có gửi diff gốc và có báo là sai, nghe như đủ. Nhưng “sai rồi” không phải câu lỗi: validator biết đúng chỗ sai mà không nói ra."
        ] },
      { k: "B", gist: "Resubmit the same prompt unchanged and rely on a fresh sample to land every line inside the diff.",
        why: [
          "Sai ở giả định: coi lỗi là nhiễu ngẫu nhiên. Request y nguyên thì Claude không có thêm thông tin nào, dễ sai y hệt (ý 2).",
          "Mỗi lần retry tốn một lượt review đầy đủ, mà tỉ lệ hỏng lần sau vẫn gần như lần đầu."
        ] },
      { k: "C", gist: "Send the original diff, the rejected output, and the exact validation error that identifies the out-of-range finding.",
        why: [
          "Đủ ba thứ của retry kèm lỗi (ý 2): diff để đối chiếu (ý 1), JSON vừa sai để biết mình đã viết gì, câu lỗi để biết sai ở finding nào.",
          "Ví dụ minh họa câu lỗi: “finding 3 cites invoice.ts:212, but the diff for that file only covers lines 40 to 95” (finding 3 trỏ dòng 212, nhưng diff của file chỉ có dòng 40 tới 95). Claude soi lại diff và sửa đúng finding đó.",
          "Lỗi này sửa được vì diff có sẵn trong input (ý 4). Giới hạn 1–2 lần, vẫn sai thì đưa người xem."
        ] },
      { k: "D", gist: "Resend the original prompt with stronger wording insisting that every cited line number must fall inside the diff.",
        why: [
          "Prompt gốc vốn đã đòi finding phải nằm trong diff. Nhấn mạnh thêm không cho Claude biết lần trước sai ở finding nào (ý 2).",
          "Validator đã biết chính xác chỗ sai. Không gửi câu lỗi đó mà chỉ viết lệnh gắt hơn là bỏ phí đúng thông tin có ích nhất."
        ] }
    ],
    refs: [
      { label: "Bài 4.4, mục “Gọi lại cho đúng cách”: request retry chứa tài liệu gốc, output vừa trả, câu lỗi cụ thể; 1–2 lần vẫn sai thì đưa người", href: NOTES + "#l-4-4" },
      { label: "Cheatsheet D4: dòng “Validation fail, hỏi cách retry”", href: NOTES + "#cheat-d4" }
    ]
  },
  {
    de: 4, n: 36, total: 60, sub: "4.2", subName: "Few-shot cho output ổn định", scen: "S5",
    answer: "C",
    ask: "The pipeline's test generator receives the existing tests for each changed file. When those tests cover only one branch of a conditional, the generator is inconsistent: sometimes it proposes a test for the other branch, sometimes it says the function is already covered. Detailed coverage instructions have not helped. What addition most reliably fixes this inconsistency?",
    scene: [
      "Bộ sinh test nhận các test hiện có của từng file bị sửa.",
      "Khi test cũ chỉ đi qua một nhánh của câu điều kiện, nó lúc đề xuất test cho nhánh còn lại, lúc bảo hàm đã được cover (đã có test phủ). Ví dụ minh họa:<pre><code>function discount(user) {\n  if (user.isVip) return 0.2;   ← test cũ chỉ đi nhánh này\n  return 0;\n}</code></pre>",
      "Chỗ khó: chỉ dẫn coverage đã viết rất chi tiết mà không ăn thua. Model biết luật, nhưng phán đoán ca nào là thiếu test thì lúc thế này lúc thế khác."
    ],
    asks: [
      "Thêm gì vào prompt để sửa chỗ không nhất quán này chắc nhất?",
      "Tức là: khi lời mô tả đã kỹ mà phán đoán vẫn chao, phải cho model thứ gì khác lời mô tả.",
      "Soi từng phương án: nó dạy model cách phán đoán, hay chỉ thêm dữ liệu, thêm luật, hoặc lọc kết quả?"
    ],
    facts: [
      "Guide: khi chỉ dẫn chi tiết vẫn cho kết quả không nhất quán, few-shot (đặt vài ví dụ input → output vào prompt) là kỹ thuật hiệu quả nhất. Coverage thiếu ở mức nhánh hay không là đúng loại ca mơ hồ notes nêu.",
      "Guide khuyên 2–4 ví dụ nhắm đúng ca mơ hồ, mỗi ví dụ kèm lý do vì sao chọn cách này thay vì cách kia. Có lý do, model mới khái quát (áp sang ca mới chưa thấy).",
      "Nhồi thêm context không liên quan làm chú ý của model bị dàn mỏng. Ở đây model đã có test của đúng file đang xét.",
      "Chạy nhiều lần rồi lấy phần chung chỉ lọc kết quả. Nó không dạy model phán đoán, và loại mất cái đúng chỉ hiện ở một lần chạy."
    ],
    opts: [
      { k: "A", gist: "Include the project's entire test suite in the prompt so the model has complete coverage context.",
        why: [
          "Sai ở giả định: model thiếu thông tin. Nó đã có test của file đang xét. Thứ thiếu là cách phán đoán ca nào là thiếu test.",
          "Thêm cả bộ test của project chỉ làm chú ý dàn mỏng (ý 3), chỗ chao đảo vẫn còn nguyên."
        ] },
      { k: "B", gist: "Run the generator three times per changed file and keep only the tests proposed in at least two runs.",
        why: [
          "Lọc kết quả, không sửa cách phán đoán (ý 4). Lấy đa số trên một phán đoán chao đảo thì kết quả vẫn chao.",
          "Test đúng cho nhánh còn lại mà chỉ hiện ở một lần chạy sẽ bị loại. Còn tốn gấp ba.",
          "Dễ bị cuốn vì “chạy nhiều lần lấy phần chung” nghe như tăng độ tin cậy. Nhưng nó chỉ bớt kết quả, model vẫn không biết khi nào nên đề xuất test."
        ] },
      { k: "C", gist: "Add two or three examples of partly tested functions that show whether to test the other branch, and why.",
        why: [
          "Đúng bước sau mô tả: chỉ dẫn đã kỹ mà vẫn lệch thì cho ví dụ (ý 1).",
          "Mỗi ví dụ gồm hàm, test hiện có, quyết định và lý do. Ví dụ minh họa: “test cũ chỉ tới nhánh <code>isVip</code>, nhánh <code>return 0</code> chưa có ca nào, nên đề xuất thêm”. Model thấy được ranh giới phán đoán, áp được sang hàm mới (ý 2).",
          "Hai tới ba ví dụ, nằm trong số guide khuyên."
        ] },
      { k: "D", gist: "Add an explicit rule that every untested conditional branch must always receive a new test.",
        why: [
          "Đề đã nói chỉ dẫn chi tiết không ăn thua. Thêm một luật nữa là dùng lại đúng công cụ đã hỏng (ý 1).",
          "Chỗ khó không nằm ở luật mà ở phán đoán: nhánh này thật sự chưa có test, hay đã được đi qua gián tiếp? Luật không trả lời được câu đó, ví dụ kèm lý do mới làm được (ý 2).",
          "Dễ bị cuốn vì luật “always” (luôn luôn) nghe rõ ràng, dứt khoát. Nhưng nó chỉ nói lại mục tiêu, không chỉ cách nhận ra ca nào là thiếu test."
        ] }
    ],
    refs: [
      { label: "Bài 4.2, mục “Bốn chỗ few-shot phát huy”: ca mơ hồ như coverage thiếu ở mức nhánh, cho ví dụ kèm lý do quyết định", href: NOTES + "#l-4-2" },
      { label: "Bài 3.6: sinh test trong CI thì đưa test hiện có vào context để không đề xuất trùng", href: NOTES + "#l-3-6" }
    ]
  },
  {
    de: 4, n: 37, total: 60, sub: "4.2", subName: "Few-shot cho output ổn định", scen: "S5",
    answer: "C",
    ask: "When a changed function depends on a helper defined in another file, the automated reviewer is inconsistent: it flags a bug without reading the helper, reads the helper and still flags correct code, or skips the case entirely. Prose rules describing when to read, flag or skip have not fixed this. What addition is most effective?",
    scene: [
      "Hàm bị sửa gọi một helper (hàm phụ) nằm ở file khác.",
      "Reviewer xử lý ca này ba kiểu: báo bug mà không đọc helper; đọc helper rồi vẫn báo nhầm code đúng; hoặc bỏ qua luôn.",
      "Đã viết luật bằng lời về khi nào đọc, khi nào báo, khi nào bỏ qua. Không ăn thua.",
      "Chỗ khó: hai phương án đều là cho ví dụ, khác nhau ở số lượng và cách chọn ví dụ."
    ],
    asks: [
      "Thêm gì là hiệu quả nhất?",
      "Tức là: dạy reviewer chọn đúng một trong ba việc (đọc, báo, bỏ qua) ở ca giữa hai file, khi lời mô tả không dạy được.",
      "Soi từng phương án: nó dạy cách phán đoán, hay chỉ nhấn mạnh luật, lọc kết quả, hoặc nhồi ví dụ?"
    ],
    facts: [
      "Guide: khi chỉ dẫn chi tiết vẫn cho kết quả không nhất quán, few-shot là kỹ thuật hiệu quả nhất. Ví dụ ở ca mơ hồ dạy cách phán đoán, chỗ mà lời mô tả để model tự suy diễn.",
      "Guide khuyên 2–4 ví dụ nhắm đúng ca mơ hồ, mỗi ví dụ kèm lý do vì sao chọn cách này thay vì cách kia. Few-shot không phải nhồi càng nhiều ví dụ càng tốt.",
      "Ví dụ tốt có bốn tính chất: relevant (sát ca thật), diverse (đa dạng), structured (bọc trong thẻ <code>&lt;example&gt;</code>), few &amp; targeted (ít và nhắm đích).",
      "Confidence model tự chấm hiệu chuẩn kém: nó hay tự tin ở đúng chỗ nó sai. Lấy nó làm bộ lọc chính thì không đáng tin."
    ],
    opts: [
      { k: "A", gist: "Add an emphatic rule that the reviewer must read every imported file before reporting any finding on a pull request.",
        why: [
          "Vẫn là luật bằng lời, chỉ gắt hơn, mà luật bằng lời đã hỏng (ý 1).",
          "Còn quá rộng: nhiều finding chẳng dính gì tới import. Và nó không sửa ca đọc helper rồi vẫn báo nhầm, vì ca đó sai ở phán đoán chứ không phải thiếu bước đọc."
        ] },
      { k: "B", gist: "Ask the reviewer to rate its confidence on each cross-file finding and drop any finding below a fixed threshold.",
        why: [
          "Sai chỗ: confidence tự chấm hiệu chuẩn kém (ý 4), và lọc không đổi cách reviewer quyết định đọc, báo hay bỏ qua.",
          "Lọc theo ngưỡng giấu bớt vài finding sai nhưng giấu luôn cả finding đúng. Chỗ không nhất quán vẫn nguyên."
        ] },
      { k: "C", gist: "Add two to four examples of ambiguous cross-file cases, each showing the action taken and why it beat the alternatives.",
        why: [
          "Đúng bước sau mô tả: luật bằng lời đã hỏng thì cho ví dụ (ý 1).",
          "Hai tới bốn ví dụ đặt đúng ở ranh giới mơ hồ, mỗi ví dụ nói vì sao việc đã chọn hơn hai việc kia (ý 2). Ví dụ minh họa: helper trả kiểu khó đoán thì đọc; helper quen thuộc thì khỏi đọc; đọc helper thấy code đúng thì không báo.",
          "Model học được cách phán đoán, áp sang ca giữa hai file chưa từng gặp."
        ] },
      { k: "D", gist: "Add twenty or more examples covering every import pattern in the codebase so no cross-file case is left out.",
        why: [
          "Sai ở giả định: càng nhiều ví dụ càng tốt. Guide khuyên ít và nhắm đích (ý 2, ý 3).",
          "Hơn hai mươi ví dụ làm prompt phình ra, mấy ca nằm đúng ranh giới mơ hồ bị chìm giữa đống ca dễ. Few-shot dạy cách phán đoán để khái quát, không phải liệt kê mọi tình huống.",
          "Dễ bị cuốn vì nó cũng là few-shot, lại “phủ hết”. Nhưng chỗ khác với C chính là số lượng và cách chọn: nhiều mà không nhắm đích thì tín hiệu loãng."
        ] }
    ],
    refs: [
      { label: "Bài 4.2, mục “Chuyện gì đang xảy ra”: 2–4 ví dụ nhắm đúng ca mơ hồ, kèm lý do; không phải càng nhiều càng tốt", href: NOTES + "#l-4-2" },
      { label: "Bài 4.1: confidence tự chấm hiệu chuẩn kém, không dùng làm bộ lọc chính", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 4, n: 38, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code", scen: "S3",
    answer: "BD",
    ask: "The document analysis subagent keeps running the built-in Grep over downloaded files instead of calling its MCP tool <code>search_corpus</code>. That tool returns ranked passages with source citations and page numbers, but its description says only “Searches research documents.” Which TWO changes most directly fix this preference? (Select TWO.)",
    scene: [
      "Subagent phân tích tài liệu có hai cách tìm: Grep built-in (tool có sẵn của Claude Code) chạy trên file đã tải về, và tool MCP <code>search_corpus</code>.",
      "<code>search_corpus</code> mạnh hơn: trả đoạn văn đã xếp hạng, kèm nguồn trích dẫn và số trang. Nhưng description chỉ ghi “Searches research documents” (tìm trong tài liệu nghiên cứu).",
      "Kết quả: subagent cứ dùng Grep.",
      "Chỗ khó: đề hỏi cách sửa “most directly” (trực tiếp nhất) sự ưu tiên này, trong khi cả hai tool vẫn còn đó. Đề chọn hai."
    ],
    asks: [
      "Hai thay đổi nào sửa trực tiếp nhất việc subagent ưu tiên Grep?",
      "Tức là: sửa đúng thứ Claude dựa vào để chọn tool, để nó thấy lý do chọn <code>search_corpus</code>.",
      "Soi từng phương án: nó cho Claude thêm thông tin lúc chọn tool, hay chỉ ra lệnh, hay làm hai tool giống nhau hơn?"
    ],
    facts: [
      "Claude chọn tool chỉ dựa vào <code>name</code>, <code>description</code> và schema. Guide: description là cơ chế chính để chọn tool. Description sơ sài thì lựa chọn không đáng tin.",
      "Grep built-in có mô tả đầy đủ. Tool MCP mô tả một dòng thì với model, Grep là lựa chọn rõ ràng hơn. Cách sửa của notes: mô tả tool MCP chi tiết, gồm tìm được gì, trả về gì, khi nào dùng thay vì grep.",
      "Description tốt có ranh giới: khi nào dùng tool này thay vì tool kia.",
      "Hai tool có tên hay mô tả gần giống nhau gọi là chồng lấn (overlap), và chồng lấn làm Claude chọn nhầm. Guide sửa bằng cách đổi tên cho rõ chức năng, không phải cho giống nhau."
    ],
    opts: [
      { k: "A", gist: "Add a rule to the subagent's system prompt saying it must always call <code>search_corpus</code> instead of Grep for every lookup.",
        why: [
          "Ra lệnh mà không cho thông tin: description vẫn một dòng, Claude vẫn không biết tool trả gì (ý 1). Lời dặn trong prompt cũng chỉ là xác suất.",
          "Còn quá tay: “every lookup” (mọi lần tra) ép cả những lần tìm đúng một chuỗi trong file, việc mà Grep hợp hơn.",
          "Dễ bị cuốn vì đây là cách nhanh nhất để đổi hành vi. Nhưng đề hỏi sửa trực tiếp sự ưu tiên, mà ưu tiên đến từ description (ý 2)."
        ] },
      { k: "B", gist: "Add text to the tool's description saying when to use it instead of plain text search over the files.",
        why: [
          "Thêm ranh giới vào description (ý 3). Ví dụ minh họa: câu hỏi theo chủ đề, cần nguồn thì dùng <code>search_corpus</code>; tìm đúng một chuỗi trong file thì để Grep.",
          "Claude đọc ranh giới đó đúng lúc chọn tool (ý 1), nên đi đúng đường thay vì mặc định Grep."
        ] },
      { k: "C", gist: "Rename the tool to <code>grep_corpus</code> so the agent associates it with the built-in search tool it already favors.",
        why: [
          "Làm ngược: tên giống Grep tạo chồng lấn (ý 4), Claude càng khó phân biệt hai tool.",
          "Description vẫn một dòng, nên vẫn không có lý do gì để chọn tool MCP (ý 1)."
        ] },
      { k: "D", gist: "Expand the description to list the ranked passages, source citations and page numbers it returns, which Grep cannot provide.",
        why: [
          "Nói rõ tool trả về gì (ý 2): đoạn văn xếp hạng, nguồn trích dẫn, số trang. Grep chỉ trả tên file, số chỗ khớp hoặc dòng khớp, không có mấy thứ đó.",
          "Hệ research cần trích dẫn, nên Claude có lý do rõ ràng để chọn tool MCP ở đúng chỗ cần.",
          "B nói khi nào dùng, D nói dùng thì được gì. Cả hai cùng sửa description và bổ sung cho nhau."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, mục “Vì sao agent thích Grep hơn MCP tool”: mô tả tool MCP tìm được gì, trả về gì, khi nào dùng thay vì grep", href: NOTES + "#l-2-4" },
      { label: "Bài 2.1: description là cơ chế chính để chọn tool; description tốt có ranh giới; tool chồng lấn thì đổi tên cho rõ chức năng", href: NOTES + "#l-2-1" },
      { label: "Cheatsheet D2: dòng “Agent dùng Grep thay vì MCP tool mạnh hơn”", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 4, n: 39, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code", scen: "S3",
    answer: "AB",
    ask: "The team's shared MCP configuration must give every teammate the search API key and the hosted document service's bearer token, without committing either secret to the repository. Which TWO practices achieve this? (Select TWO.)",
    scene: [
      "Hệ research có hai MCP server cần secret. Server tìm kiếm chạy trên máy (stdio) cần API key. Dịch vụ tài liệu chạy từ xa (HTTP) cần bearer token (mã truy cập gửi trong header).",
      "Cấu hình MCP phải dùng chung cho cả team, tức là phải nằm trong repo.",
      "Chỗ khó: hai yêu cầu kéo hai hướng. Ai cũng phải có cấu hình (nằm trong repo), nhưng secret không được commit (không nằm trong repo)."
    ],
    asks: [
      "Hai cách nào đạt được cả hai yêu cầu?",
      "Tức là: file cấu hình commit được, còn secret thật nằm trên máy từng người.",
      "Soi từng phương án: team có nhận được cấu hình không? Secret có lọt vào repo không?"
    ],
    facts: [
      "<code>.mcp.json</code> ở gốc repo là scope project. Docs dặn commit file này để cả team có cùng MCP server.",
      "Trong <code>.mcp.json</code>, <code>${VAR}</code> được thay bằng giá trị biến môi trường <code>VAR</code> trên máy đang chạy. Docs: thay được trong <code>command</code>, <code>args</code>, <code>env</code>, <code>url</code>, <code>headers</code>. File chỉ chứa tên biến, giá trị thật không rời máy.",
      "<code>${VAR:-default}</code> dùng giá trị mặc định khi biến chưa đặt. Giá trị mặc định nằm ngay trong file.",
      "Server stdio là một tiến trình chạy trên máy, secret thường truyền qua <code>env</code>. Server HTTP từ xa thì token đi qua <code>headers</code>."
    ],
    opts: [
      { k: "A", gist: "Set the document service entry's <code>headers</code> field to <code>Authorization: Bearer ${DOCS_API_TOKEN}</code> so the token expands at runtime.",
        why: [
          "<code>headers</code> là một trong các trường được thay biến (ý 2). File commit chỉ có chữ <code>${DOCS_API_TOKEN}</code>.",
          "Mỗi máy tự đặt biến <code>DOCS_API_TOKEN</code>. Lúc kết nối, Claude Code thay vào header, token không bao giờ vào repo.",
          "Notes có đúng ví dụ này với GitHub: <code>\"Authorization\": \"Bearer ${GITHUB_TOKEN}\"</code>."
        ] },
      { k: "B", gist: "Reference the search key as <code>${SEARCH_API_KEY}</code> in the stdio server's <code>env</code> field so it expands from each developer's shell.",
        why: [
          "<code>env</code> cũng là trường được thay biến (ý 2). Server tìm kiếm nhận key từ biến môi trường trên máy từng dev.",
          "File <code>.mcp.json</code> vẫn commit và chia sẻ được (ý 1), còn secret thì không đi theo.",
          "A lo server HTTP, B lo server stdio (ý 4). Cùng một cơ chế, mỗi cái một server."
        ] },
      { k: "C", gist: "Write the literal secrets into <code>.mcp.json</code> at the project root and add that file to <code>.gitignore</code> so the keys never reach the remote.",
        why: [
          "Giữ được secret, nhưng mất phần chia sẻ: file bị ignore thì đồng đội clone về không có cấu hình server nào (ý 1).",
          "Mỗi người lại phải tự dựng cấu hình bằng tay, đúng chuyện scope project sinh ra để tránh.",
          "Dễ bị cuốn vì “keys never reach the remote” (key không bao giờ lên remote) nghe đúng yêu cầu. Nhưng đề đòi cả hai: không lộ secret, và ai cũng có cấu hình."
        ] },
      { k: "D", gist: "Put the real key as the fallback in <code>${SEARCH_API_KEY:-sk-live-9f3a}</code> so the configuration works before anyone sets a shell variable.",
        why: [
          "Cú pháp có thật (ý 3), nhưng giá trị mặc định nằm ngay trong file. Commit file là commit luôn key thật.",
          "Giá trị mặc định hợp với thứ không nhạy cảm, như URL gốc hay đường dẫn. Không dùng cho secret."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, mục “Ba phạm vi, hai file”: .mcp.json commit được, secret đưa vào bằng ${GITHUB_TOKEN}", href: NOTES + "#l-2-4" },
      { label: "Cheatsheet D2: dòng ba scope MCP và secret ${GITHUB_TOKEN}, ${VAR:-default}", href: NOTES + "#cheat-d2" },
      { label: "Docs MCP, mục “Environment variable expansion in .mcp.json”: ${VAR} và ${VAR:-default} dùng được trong command, args, env, url, headers", href: "https://code.claude.com/docs/en/mcp" }
    ]
  },
  {
    de: 4, n: 40, total: 60, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool", scen: "S3",
    answer: "C",
    ask: "The web search subagent's MCP search tool sets <code>isError</code> to true whenever its result list is empty, so the coordinator retries zero-match queries as if the search service were down. How should the tool report a query that legitimately matches no sources?",
    scene: [
      "Tool tìm kiếm MCP của subagent web cứ gặp danh sách kết quả rỗng là đặt <code>isError: true</code>.",
      "Coordinator thấy cờ lỗi thì tưởng dịch vụ tìm kiếm sập, nên gọi lại đúng query đó.",
      "Chỗ khó: query chạy xong, chỉ là thật sự không có nguồn nào khớp. Gửi lại bao nhiêu lần cũng rỗng."
    ],
    asks: [
      "Tool nên báo một query hợp lệ mà không khớp nguồn nào thế nào?",
      "Tức là: cho coordinator thấy “tìm xong, không có gì” khác với “không tìm được”, để nó không retry vô ích.",
      "Soi từng phương án: nó có giữ đúng sự thật là tool đã chạy đúng và kết quả rỗng không?"
    ],
    facts: [
      "Valid empty result (kết quả rỗng hợp lệ): query chạy xong, thật sự không khớp gì. Access failure (không truy cập được): chưa biết nguồn có dữ liệu hay không, vd timeout. Hai ca phải trả về khác nhau, không thì coordinator retry vô ích chỗ này và bỏ qua lỗi thật chỗ kia.",
      "<code>isError: true</code> dành cho lần tool chạy hỏng: input sai, dịch vụ phía sau hỏng, vi phạm policy. Tìm xong mà rỗng là tool chạy đúng, không phải lỗi.",
      "MCP có hai kênh lỗi. Lỗi giao thức JSON-RPC dành cho tool không tồn tại, request sai schema của <code>tools/call</code>, server sập. Spec chỉ ghi client MAY (có thể) đưa lỗi này cho model, nên đừng trông vào nó để model đọc.",
      "<code>errorCategory: transient</code> (lỗi tạm thời) nghĩa là gửi lại y hệt request có thể thành công, như timeout hay 503."
    ],
    opts: [
      { k: "A", gist: "Silently retry the search with broader terms until at least one source can be returned.",
        why: [
          "Đổi query mà không báo: coordinator nhận nguồn của một câu hỏi khác, lại tưởng là kết quả của query gốc.",
          "Mất luôn tín hiệu “query này không khớp gì” (ý 1), thứ coordinator cần để đổi hướng tìm hoặc ghi lại chỗ thiếu nguồn.",
          "Hệ research phải trích dẫn bằng chứng. Đưa nguồn lạc đề ra như câu trả lời còn tệ hơn trả rỗng thật thà."
        ] },
      { k: "B", gist: "Return a JSON-RPC protocol error so the MCP host handles the condition instead of the model.",
        why: [
          "Sai kênh: lỗi giao thức dành cho tool không tồn tại, request hỏng, server sập (ý 3). Rỗng hợp lệ còn không phải lỗi (ý 2).",
          "Spec không bảo đảm client đưa lỗi giao thức cho model, nên coordinator có thể không thấy gì. Một câu trả lời hợp lệ bị biến thành sự cố."
        ] },
      { k: "C", gist: "Return a normal result with <code>isError</code> false and content stating that no sources matched the query.",
        why: [
          "Đúng ca valid empty result (ý 1): tool đã chạy đúng nên <code>isError</code> là false (ý 2), nội dung nói rõ không có nguồn nào khớp.",
          "Coordinator phân biệt được rỗng với sự cố. Nó biết dịch vụ vẫn chạy, nên đổi cách đặt query hoặc ghi nhận chủ đề ít nguồn, thay vì gọi lại y hệt."
        ] },
      { k: "D", gist: "Return <code>isError</code> true with an <code>errorCategory</code> of transient so the coordinator knows to retry later.",
        why: [
          "Sai ở giả định: transient nghĩa là gửi lại y hệt có thể thành công (ý 4). Query không khớp gì thì gửi lại bao nhiêu lần cũng rỗng.",
          "Giữ nguyên đúng vòng retry team đang muốn bỏ, lại gắn nhãn lỗi cho một kết quả thành công (ý 2).",
          "Dễ bị cuốn vì có lỗi có cấu trúc (<code>errorCategory</code>), đúng thứ guide khen. Nhưng cấu trúc lỗi chỉ đúng khi thật sự có lỗi, mà ở đây không có."
        ] }
    ],
    refs: [
      { label: "Cheatsheet D2: dòng “Search trả mảng rỗng”: rỗng không phải lỗi, timeout không được giả làm rỗng", href: NOTES + "#cheat-d2" },
      { label: "Bài 2.2, mục “Đã sửa 02/11”: MCP có hai kênh lỗi; isError cho lỗi thực thi, lỗi giao thức cho tool không tồn tại, request hỏng", href: NOTES + "#fix-13" },
      { label: "Bài 5.3: valid empty result và access failure cần hai quyết định khác nhau", href: NOTES + "#l-5-3" }
    ]
  },
  {
    de: 4, n: 41, total: 60, sub: "1.2", subName: "Điều phối coordinator–subagent", scen: "S3",
    answer: "A",
    ask: "Reports often come out with thin sections even though the initial decomposition was sound. A report on grid storage, for example, covered batteries in depth but gave hydrogen only two sentences. The team wants gaps like this closed automatically before the report is generated. Which design does this?",
    scene: [
      "Coordinator chia đề tài đúng ngay từ đầu: mảng nào cũng có người tìm.",
      "Nhưng báo cáo hay có mảng quá mỏng. Ví dụ đề tài lưu trữ điện cho lưới (grid storage): pin được viết rất kỹ, còn hydrogen chỉ có hai câu.",
      "Đề đòi lấp các chỗ mỏng “automatically before report generation” (tự động, trước khi viết báo cáo).",
      "Chỗ khó: lỗi không nằm ở bước chia việc, nên không sửa ở đó được. Phải có một vòng sau khi đã có bản tổng hợp."
    ],
    asks: [
      "Thiết kế nào lấp được các mảng mỏng?",
      "Tức là: ai phát hiện mảng mỏng, và lấy đâu ra dữ liệu mới để viết dày lên, trước khi báo cáo ra.",
      "Soi từng phương án: nó có thêm nguồn thật cho mảng mỏng không, hay chỉ viết lại, ghi chú? Và việc đó có đi qua coordinator không?"
    ],
    facts: [
      "Hub-and-spoke (trục và nan hoa): coordinator giao việc, gom kết quả, xử lý lỗi. Nó giữ kế hoạch nghiên cứu, nên nó biết mảng nào phải có và mảng nào đang mỏng.",
      "Iterative refinement (tinh chỉnh nhiều vòng): coordinator đọc bản tổng hợp, thấy mảng nào mỏng thì giao tìm thêm đúng mảng đó, rồi chạy tổng hợp lại. Lặp đến khi đủ. Vòng này cần tiêu chí “thế nào là đủ” và trần cứng (số vòng tối đa, <code>max_budget_usd</code> của Agent SDK).",
      "Synthesis chỉ viết được từ kết quả nó nhận. Chưa ai tìm thêm về hydrogen thì nó không có gì để viết dày lên.",
      "Docs Agent SDK hiện tại: subagent có thể tự tạo subagent con (mặc định tối đa 3 tầng dưới agent chính). Khi đó việc tìm thêm diễn ra ngoài tầm nhìn của coordinator."
    ],
    opts: [
      { k: "A", gist: "The coordinator checks the synthesis output for gaps, sends targeted searches for the thin areas, and runs synthesis again.",
        why: [
          "Đúng vòng iterative refinement (ý 2): coordinator so bản tổng hợp với kế hoạch của nó, thấy hydrogen mỏng, giao search và analysis tìm đúng mảng đó, rồi chạy synthesis lại với kết quả mới.",
          "Mảng mỏng được lấp bằng nguồn thật (ý 3), và xong trước bước viết báo cáo, đúng điều đề đòi.",
          "Coordinator là trục (ý 1), nên tìm thêm gì, bao nhiêu vòng, tốn bao nhiêu đều nằm trong tầm nhìn của nó."
        ] },
      { k: "B", gist: "Allow the synthesis subagent to launch its own search subagent whenever it notices a thin section.",
        why: [
          "Chạy được: docs cho subagent tự tạo subagent con (ý 4), và mảng mỏng có thể được lấp thật.",
          "Nhưng việc lấp chỗ thiếu rời khỏi coordinator (ý 1). Coordinator không thấy synthesis đã tìm thêm gì, khó giữ một tiêu chí “đủ” chung, khó chặn số vòng và chi phí.",
          "Synthesis chỉ biết kế hoạch nghiên cứu tới mức coordinator ghi vào lời giao việc. Nó không phải bên nắm đủ để phán mảng nào mỏng.",
          "Dễ bị cuốn vì nghe nhanh, bớt một vòng về coordinator. Nhưng hệ này dựa vào trục giữ vòng điều khiển."
        ] },
      { k: "C", gist: "Have the report generation subagent mark thin sections as known coverage limitations in the report.",
        why: [
          "Ghi chú chỗ thiếu là cách đúng khi nguồn thật sự không có, để người đọc biết chỗ nào chưa chắc.",
          "Ở đây nguồn có, và đề đòi lấp trước khi viết báo cáo. Ghi chú chỉ thừa nhận lỗ hổng, không lấp (ý 2)."
        ] },
      { k: "D", gist: "Make the synthesis subagent's prompt demand thorough, balanced coverage of every subtopic.",
        why: [
          "Sai chỗ sửa: synthesis không có thêm kết quả nào về hydrogen (ý 3). Prompt mạnh tới đâu cũng không tạo ra nguồn chưa ai tìm.",
          "Ép “balanced” (cân đối) thì nó dễ viết độn hoặc suy đoán không nguồn, trái với yêu cầu báo cáo có trích nguồn."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, Khi đi thi dạng 3: báo cáo đủ mảng nhưng có mảng mỏng → giao tìm thêm đúng mảng đó rồi tổng hợp lại; mục Biết thêm: vòng tinh chỉnh phải có điểm dừng", href: NOTES + "#l-1-2" },
      { label: "Docs Agent SDK Subagents, mục Cap subagent depth, concurrency, and spend: subagent tự tạo subagent con, giới hạn độ sâu và ngân sách", href: "https://code.claude.com/docs/en/agent-sdk/subagents" }
    ]
  },
  {
    de: 4, n: 42, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S3",
    answer: "C",
    ask: "Yesterday a document analysis session named <code>corpus-review</code> worked through 40 source PDFs for an upcoming report. Overnight a teammate swapped three of those PDFs for corrected versions. How should the team continue the analysis today?",
    scene: [
      "Hôm qua phiên <code>corpus-review</code> đã phân tích 40 file PDF nguồn cho một báo cáo sắp ra.",
      "Qua đêm, một đồng nghiệp thay 3 trong 40 file bằng bản đã sửa.",
      "Chỗ khó: 37 file vẫn y nguyên, phân tích hôm qua của chúng vẫn đúng. Chỉ phần của 3 file là đã sai."
    ],
    asks: [
      "Hôm nay team nên làm tiếp thế nào?",
      "Tức là: giữ phần phân tích còn đúng, chỉ làm lại đúng phần đã lỗi thời.",
      "Soi từng phương án: nó có giữ được 37 file đã xong không, và agent có biết 3 file nào đã đổi không?"
    ],
    facts: [
      "Resume (<code>claude --resume corpus-review</code>) nạp lại toàn bộ lịch sử phiên, kể cả kết quả tool. Agent nhớ mọi thứ đã thấy, nhưng là bản cũ: nó không tự đọc lại file trên đĩa, cũng không tự biết file nào đã đổi.",
      "Stale (lỗi thời): kết quả tool trong lịch sử phản ánh nội dung cũ của một file đã bị thay sau đó. Agent vẫn tin nó là đúng.",
      "Notes chốt: phần lớn ngữ cảnh còn đúng thì resume và nói rõ file nào đã đổi. Phần lớn đã lỗi thời thì mở phiên mới kèm bản tóm tắt có cấu trúc.",
      "<code>/compact</code> nén lịch sử thành bản tóm tắt để giải phóng context. Nó không phát hiện file nào đã đổi."
    ],
    opts: [
      { k: "A", gist: "Open a brand-new session with no earlier context and have the agent read all 40 PDFs again from the start.",
        why: [
          "Chạy được, kết quả chắc chắn mới. Nhưng vứt đi phân tích của 37 file vẫn đúng, tốn token làm lại việc đã xong.",
          "Phiên mới chỉ đáng chọn khi phần lớn kết quả cũ đã lỗi thời (ý 3). Ở đây chỉ 3 trên 40."
        ] },
      { k: "B", gist: "Resume <code>corpus-review</code> and run <code>/compact</code> first, so a summary replaces any stale tool results, then continue.",
        why: [
          "Sai ở giả định: <code>/compact</code> chỉ nén, không biết file nào đã đổi (ý 4). Phân tích cũ của 3 file bị nén vào bản tóm tắt, vẫn sai.",
          "Nén còn dễ làm rụng con số, trích dẫn chính xác mà báo cáo cần.",
          "Dễ bị cuốn vì “a summary replaces any stale tool results” (bản tóm tắt thay cho kết quả lỗi thời) nghe như dọn sạch dữ liệu cũ. Nhưng bản tóm tắt được làm từ chính dữ liệu cũ đó."
        ] },
      { k: "C", gist: "Resume <code>corpus-review</code> and open by naming the three replaced PDFs, asking for re-analysis of only those files.",
        why: [
          "Resume giữ nguyên phân tích của 37 file còn đúng (ý 1).",
          "Nói rõ 3 file nào đã đổi thì agent đọc lại đúng 3 file đó và sửa kết luận. Không phải đoán kết quả nào lỗi thời, không khám phá lại cả bộ (ý 3)."
        ] },
      { k: "D", gist: "Resume <code>corpus-review</code> and go straight to synthesis, since the restored history already holds the analysis of all 40 PDFs.",
        why: [
          "Sai ở giả định: lịch sử nạp lại là bản cũ, resume không đọc lại file (ý 1). Phân tích của 3 file đã thay là stale (ý 2).",
          "Agent không có tín hiệu nào báo file đã đổi, nên báo cáo dựng trên nội dung cũ."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Ba cách nối lại công việc”: resume và nói rõ file nào đã đổi; phiên mới + tóm tắt khi phần lớn đã lỗi thời", href: NOTES + "#l-1-7" },
      { label: "Cheatsheet D1: dòng “Tiếp tục cuộc điều tra hôm qua”: --resume, nói rõ file đã đổi", href: NOTES + "#cheat-d1" }
    ]
  },
  {
    de: 4, n: 43, total: 60, sub: "2.3", subName: "Chia tool cho agent và tool_choice", scen: "S3",
    answer: "D",
    ask: "The document analysis subagent has three tools: <code>extract_metadata</code>, <code>enrich_citations</code> and <code>summarize_section</code>. In some runs it calls <code>enrich_citations</code> first, and the citations come out without dates. The team needs <code>extract_metadata</code> guaranteed as the first call on every document. Which configuration does this?",
    scene: [
      "Subagent phân tích tài liệu có ba tool: <code>extract_metadata</code> (trích metadata của tài liệu, trong đó có ngày), <code>enrich_citations</code> (làm giàu trích dẫn), <code>summarize_section</code> (tóm tắt từng phần).",
      "Có lần nó gọi <code>enrich_citations</code> trước khi có metadata, nên trích dẫn thiếu ngày.",
      "Chỗ khó: đề đòi “guaranteed” (bảo đảm) và “every document” (mọi tài liệu). “Thường thì đúng” là chưa đủ."
    ],
    asks: [
      "Cấu hình nào bảo đảm lần gọi đầu tiên luôn là <code>extract_metadata</code>?",
      "Tức là: ở lượt đầu của mỗi tài liệu, không còn đường nào để gọi tool khác trước.",
      "Soi từng phương án: nó ép đúng tool đó, chỉ ép gọi một tool nào đó, hay chỉ là gợi ý?"
    ],
    facts: [
      "<code>tool_choice</code> có ba mức chính. <code>{\"type\": \"auto\"}</code> (mặc định): Claude tự quyết có gọi tool không. <code>{\"type\": \"any\"}</code>: bắt buộc gọi một tool, nhưng Claude vẫn tự chọn tool nào.",
      "<code>{\"type\": \"tool\", \"name\": \"extract_metadata\"}</code> là ép đúng một tool (forced tool selection): lượt đó bắt buộc gọi tool có tên ấy. Guide dùng chính ví dụ này: ép <code>extract_metadata</code> chạy trước, enrichment để các lượt sau.",
      "<code>strict: true</code> trên một tool chỉ buộc tham số Claude điền phải khớp schema của tool đó. Nó không đụng tới việc chọn tool nào, lúc nào.",
      "Lời dặn trong system prompt chỉ là gợi ý: tỉ lệ sai giảm, không về 0."
    ],
    opts: [
      { k: "A", gist: "Set <code>tool_choice</code> to type <code>any</code>, so the subagent has to start with a tool call rather than text.",
        why: [
          "Sai ở chỗ <code>any</code> chỉ bắt gọi một tool nào đó, Claude vẫn tự chọn tool (ý 1). Nó vẫn có thể gọi <code>enrich_citations</code> trước, đúng lỗi đang gặp.",
          "Nó giải bài “phải gọi tool thay vì trả chữ”, không giải bài thứ tự.",
          "Dễ bị cuốn vì “must begin with a tool call” (phải mở đầu bằng tool call) nghe gần với “gọi đúng tool trước”. Nhưng bắt gọi tool khác với chỉ định tool."
        ] },
      { k: "B", gist: "Set <code>strict</code> to true on the <code>extract_metadata</code> definition, so its schema is enforced before the other tools run.",
        why: [
          "Sai ở giả định: <code>strict</code> chỉ ép tham số khớp schema (ý 3), không có chuyện “chạy trước các tool khác”.",
          "Subagent vẫn có thể gọi <code>enrich_citations</code> trước, với tham số hoàn toàn hợp lệ."
        ] },
      { k: "C", gist: "Add a system prompt rule saying metadata extraction must always come before citation enrichment.",
        why: [
          "Lời dặn chỉ là gợi ý (ý 4). Tỉ lệ gọi sai thứ tự giảm, nhưng vẫn có lần sai, đúng cái đang xảy ra.",
          "Đề đòi “guaranteed” (bảo đảm), mà API có sẵn nút ép đúng tool (ý 2)."
        ] },
      { k: "D", gist: "Set <code>tool_choice</code> to type <code>tool</code> naming <code>extract_metadata</code> on the first request for each document.",
        why: [
          "Lượt đầu của mỗi tài liệu, Claude bắt buộc gọi <code>extract_metadata</code> (ý 2). Không còn đường gọi <code>enrich_citations</code> trước.",
          "Có metadata rồi thì các lượt sau trả về <code>auto</code> hoặc <code>any</code> để subagent tự chọn tool tiếp (ý 1).",
          "Biết thêm: docs ghi khi bật extended thinking thủ công thì chỉ dùng được <code>auto</code>/<code>none</code>, và vài model mới nhất trả lỗi 400 với <code>any</code>/<code>tool</code>. Đề vẫn chấm theo guide: ép tool là cách bảo đảm."
        ] }
    ],
    refs: [
      { label: "Bài 2.3: bảng tool_choice, dòng extract_metadata chạy trước enrichment", href: NOTES + "#l-2-3" },
      { label: "Bài 2.3, mục “Đã sửa 01/11”: lúc nào không ép tool được (extended thinking thủ công, vài model mới)", href: NOTES + "#fix-2" },
      { label: "Bài 4.3: strict: true ép tham số khớp schema, không chọn tool", href: NOTES + "#l-4-3" }
    ]
  },
  {
    de: 4, n: 44, total: 60, sub: "5.5", subName: "Review người và hiệu chuẩn confidence", scen: "S3",
    answer: "C",
    ask: "The document analysis subagent outputs structured records with claim, quote, source and publication date fields, and a human currently checks every record. Overall accuracy is 97%. What should the team do before dropping human review for high-confidence records?",
    scene: [
      "Subagent phân tích tài liệu xuất bản ghi có cấu trúc, mỗi bản ghi bốn trường: claim (khẳng định), quote (trích đoạn), source (nguồn), publication date (ngày đăng).",
      "Hiện người xem từng bản ghi. Accuracy (tỉ lệ đúng) tổng là 97%.",
      "Team muốn bỏ người cho bản ghi high-confidence (model tự báo rất chắc). Chỗ khó: 97% nghe đã đủ cao để bỏ."
    ],
    asks: [
      "Trước khi bỏ review cho bản ghi high-confidence, team nên làm gì?",
      "Tức là: cần bằng chứng gì để biết chỗ nào bỏ người là an toàn.",
      "Soi từng phương án: nó có đo độ đúng thật theo từng phần nhỏ của dữ liệu không, hay chỉ dựa vào số tổng, confidence tự báo, hay kiểm hình dạng?"
    ],
    facts: [
      "Aggregate accuracy (tỉ lệ đúng tổng) là trung bình trên mọi bản ghi. 97% có thể gồm 99% ở loại tài liệu phổ biến và 40% ở một loại hiếm hoặc một trường cụ thể.",
      "Guide yêu cầu đo accuracy theo document type (loại tài liệu) và theo field (từng trường) trước khi tự động hóa. Chỉ tự động phần đã chứng minh ổn định ở mọi phân khúc.",
      "Confidence model tự báo chưa được hiệu chuẩn: 0.9 không có nghĩa đúng 90%. Phải so với labeled validation set (bộ có đáp án do người gán) rồi mới chọn ngưỡng.",
      "Schema và vòng validate rồi retry bắt lỗi hình dạng: thiếu trường, sai kiểu, JSON hỏng. Lỗi ngữ nghĩa như ngày sai, nguồn ghi nhầm thì schema không thấy."
    ],
    opts: [
      { k: "A", gist: "Have the synthesis subagent flag records whose figures look odd next to other sources.",
        why: [
          "Đây là cách bắt số liệu mâu thuẫn giữa các nguồn, không phải đo độ đúng của bước trích xuất (ý 2).",
          "Ngày đăng sai, nguồn ghi nhầm, hay giá trị sai mà trông hợp lý đều lọt qua. Nó không cho biết phần nào an toàn để bỏ người."
        ] },
      { k: "B", gist: "Drop review for every record the model rates high-confidence, because 97% is already above the target.",
        why: [
          "Dựa vào hai thứ chưa được kiểm: số tổng (ý 1) và confidence tự báo (ý 3).",
          "Model có thể rất chắc mà vẫn sai, đúng ở loại tài liệu nó yếu nhất. Bỏ người kiểu này là bỏ đúng chỗ cần người nhất.",
          "Dễ bị cuốn vì 97% vượt mục tiêu, nghe như đủ bằng chứng. Nhưng con số trung bình che phân khúc kém."
        ] },
      { k: "C", gist: "Measure accuracy separately for each document type and each extracted field before relying on the overall number.",
        why: [
          "Đúng điều guide yêu cầu (ý 2): tách accuracy theo loại tài liệu và theo trường (claim, quote, source, date).",
          "Cách này lộ ra chỗ kém mà 97% đang che (ý 1), ví dụ một trường ở một loại tài liệu ít gặp. Phân khúc nào ổn định mới bỏ người, còn lại giữ review."
        ] },
      { k: "D", gist: "Add a validation-retry loop so schema violations are fixed before records reach reviewers.",
        why: [
          "Vòng này sửa lỗi hình dạng (ý 4). Đề không có dấu hiệu lỗi kiểu đó.",
          "3% sai là bản ghi đúng hình dạng mà giá trị sai. Retry theo schema không thấy, cũng không sửa được."
        ] }
    ],
    refs: [
      { label: "Bài 5.5: số tổng che phân khúc kém, đo theo document type × field, hiệu chuẩn confidence bằng labeled set", href: NOTES + "#l-5-5" },
      { label: "Cheatsheet D5: dòng “97% accuracy tổng, muốn bỏ review cho high-confidence”", href: NOTES + "#cheat-d5" },
      { label: "Bài 4.0, mục lỗi cú pháp và lỗi ngữ nghĩa: schema chỉ biết hình dạng, không biết đúng sai", href: NOTES + "#l-4-0" }
    ]
  },
  {
    de: 4, n: 45, total: 60, sub: "1.2", subName: "Điều phối coordinator–subagent", scen: "S3",
    answer: "B",
    ask: "A team is designing the coordinator's control flow. Research requests differ widely: some need only web search, while others need document analysis that then reveals gaps calling for a second search round. How should the coordinator decide which subagent to call next?",
    scene: [
      "Team đang thiết kế luồng điều khiển của coordinator.",
      "Yêu cầu nghiên cứu mỗi cái một kiểu. Có cái chỉ cần tìm web. Có cái cần phân tích tài liệu, và chính bước phân tích mới lộ ra chỗ thiếu, phải tìm thêm vòng hai.",
      "Chỗ khó: có cần vòng hai hay không thì chỉ biết sau khi phân tích chạy xong. Lúc mới nhận yêu cầu chưa ai biết."
    ],
    asks: [
      "Coordinator nên quyết gọi subagent nào tiếp theo bằng cách nào?",
      "Tức là: quyết định phải đến lúc đã có kết quả giữa chừng, và do bên đọc được kết quả đó đưa ra.",
      "Soi từng phương án: ai chọn bước tiếp, và chọn lúc nào: trước khi chạy, hay sau khi thấy kết quả?"
    ],
    facts: [
      "Agent: Claude tự quyết gọi tool nào, theo thứ tự nào, dựa trên kết quả vừa thấy. Guide gọi đây là model-driven decision-making (model tự ra quyết định), đối lập với decision tree (cây quyết định) viết cứng trong code.",
      "Workflow: code của bạn vạch sẵn đường đi. Hợp với việc biết trước các bước, rẻ và dễ kiểm soát.",
      "Dynamic selection (chọn động): coordinator xem từng yêu cầu rồi chỉ gọi subagent cần thiết. Câu đơn giản không phải chạy cả bốn subagent.",
      "Hook <code>PreToolUse</code> là code chạy trước mỗi tool call, dùng để chặn hay sửa tham số (<code>updatedInput</code>) cho những luật bắt buộc phải giữ."
    ],
    opts: [
      { k: "A", gist: "Add a keyword classifier that maps each request to a fixed subagent sequence before the run starts.",
        why: [
          "Chọn đường một lần, từ chữ trong yêu cầu, trước khi có kết quả nào. Đó là decision tree đội lốt (ý 1).",
          "Nó không thấy bước phân tích tìm ra gì, nên không thể tự thêm vòng search thứ hai.",
          "Dễ bị cuốn vì trông thông minh hơn chuỗi cố định: có chọn theo từng yêu cầu. Nhưng nó chọn lúc chưa có thông tin cần để chọn."
        ] },
      { k: "B", gist: "Give the coordinator the research goal in its prompt and let it choose each next subagent from the intermediate results.",
        why: [
          "Model-driven decision-making (ý 1): coordinator đọc kết quả subagent vừa trả về rồi chọn bước tiếp.",
          "Yêu cầu đơn giản thì dừng sau search (ý 3). Phân tích lộ chỗ thiếu thì coordinator tự giao thêm vòng search hai. Team không phải đoán trước mọi nhánh trong code.",
          "Việc của team là ghi rõ mục tiêu, tiêu chí chất lượng, và mô tả từng subagent đủ rõ để coordinator phân biệt."
        ] },
      { k: "C", gist: "Add a <code>PreToolUse</code> hook that rewrites every delegation to the next subagent in a fixed order.",
        why: [
          "Về kỹ thuật làm được, vì hook sửa được tham số tool call (ý 4).",
          "Nhưng ghi đè lựa chọn của coordinator thì hệ thành chuỗi cố định (ý 2), mất đúng khả năng thích nghi mà yêu cầu đa dạng cần.",
          "Hook để giữ luật không được phá, không để vạch đường đi thay agent."
        ] },
      { k: "D", gist: "Hard-code the search, analysis, synthesis and report subagent calls as a fixed sequence in application code.",
        why: [
          "Đây là workflow (ý 2), hợp khi mọi yêu cầu đi cùng một chuỗi bước. Ở đây không phải vậy.",
          "Yêu cầu đơn giản vẫn chạy đủ bốn bước, tốn tiền vô ích. Yêu cầu cần vòng search hai thì chuỗi cố định không bao giờ thêm được."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D1, mục “Agent là gì”: agent và workflow, model-driven decision-making đối lập decision tree", href: NOTES + "#l-1-0" },
      { label: "Bài 1.2: coordinator chọn subagent theo từng yêu cầu (dynamic selection), Khi đi thi dạng 2", href: NOTES + "#l-1-2" }
    ]
  },
  {
    de: 4, n: 46, total: 60, sub: "2.5", subName: "Chọn built-in tool đúng việc", scen: "S3",
    answer: "BC",
    ask: "Asked to trace how citations move from the search subagent to the report generator in this system's codebase, an agent with Read, Grep and Glob reads every file under <code>src/</code> and runs out of context. Which TWO instructions fix its exploration strategy? (Select TWO.)",
    scene: [
      "Agent được nhờ lần theo đường đi của citation (trích dẫn nguồn) trong code: từ subagent search tới subagent viết báo cáo.",
      "Nó có Read, Grep, Glob. Nó Read mọi file trong <code>src/</code> và hết context trước khi lần ra gì.",
      "Đề bắt chọn hai chỉ dẫn. Hai cái đúng là hai bước của cùng một cách khám phá."
    ],
    asks: [
      "Hai chỉ dẫn nào sửa được cách khám phá của agent?",
      "Tức là: chỉ nạp những file liên quan tới luồng citation, theo đúng thứ tự luồng đi qua.",
      "Soi từng phương án: nó có bớt số file phải đọc không, và có giữ được bức tranh nối liền giữa các file không?"
    ],
    facts: [
      "Grep tìm chữ bên trong file. Mặc định nó chỉ trả đường dẫn file có khớp (<code>files_with_matches</code>); muốn xem dòng thì dùng <code>content</code>. Glob tìm theo tên file, không nhìn nội dung.",
      "Khám phá tăng dần theo guide: Grep tìm entry point (file nơi luồng bắt đầu), Read đúng file đó, theo import để sang file kế, Grep tiếp khi cần. Mỗi bước chỉ nạp thứ liên quan.",
      "Đọc dồn nhiều file làm cạn context, và làm model mất dấu câu hỏi ban đầu: câu trả lời bắt đầu chung chung.",
      "Subagent chạy trong context riêng và chỉ trả bản báo cáo cuối về agent cha."
    ],
    opts: [
      { k: "A", gist: "Read every file under the source directory first, so nothing is missed before reasoning starts.",
        why: [
          "Đây chính là việc vừa làm cạn context. Lặp lại thì cạn lại (ý 3).",
          "Nó tiêu context theo thư mục, không theo mức liên quan."
        ] },
      { k: "B", gist: "Grep for citation-related identifiers to find likely entry points and call sites.",
        why: [
          "Bước đầu của khám phá tăng dần (ý 2). Grep nội dung tìm ra chỗ code đụng tới citation, kể cả khi chưa biết tên hàm cụ thể (ý 1).",
          "Kết quả là danh sách file ngắn, tốn rất ít context, làm điểm xuất phát cho bước đọc."
        ] },
      { k: "C", gist: "Read the files Grep returned, then follow their imports to the next files in the trace.",
        why: [
          "Bước kế của cùng cách đó (ý 2): Read đúng file Grep đưa ra, import trong file chỉ ra chặng tiếp theo của luồng.",
          "Lặp tìm, đọc, theo import thì hiểu dần cả luồng mà không phải nạp cả repo.",
          "B và C là hai nửa của một vòng: B tìm điểm vào, C đi theo luồng từ đó."
        ] },
      { k: "D", gist: "Spawn one subagent per source file so each file is read in its own isolated context.",
        why: [
          "Mỗi subagent chỉ thấy một file và chỉ trả báo cáo cuối về (ý 4). Không ai giữ đường đi nối các file, mà lần luồng cần đúng thứ đó.",
          "Còn tốn thêm một subagent cho mỗi file, trong khi một lần Grep đã đủ tìm điểm vào.",
          "Dễ bị cuốn vì subagent đúng là cách giữ context chính gọn. Nhưng chia theo từng file làm vỡ bức tranh cần nối liền."
        ] }
    ],
    refs: [
      { label: "Bài 2.5, mục “Khám phá tăng dần, không đọc hết”: Grep entry point → Read → theo import", href: NOTES + "#l-2-5" },
      { label: "Docs Tools reference, mục Grep tool behavior: ba output mode, files_with_matches là mặc định", href: "https://code.claude.com/docs/en/tools-reference" }
    ]
  },
  {
    de: 4, n: 47, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code", scen: "S3",
    answer: "A",
    ask: "While building this system in Claude Code, a developer wants to try an MCP server that searches academic papers, used with the web search subagent, before proposing it to the team. Teammates should not see it yet. Where should the server be configured?",
    scene: [
      "Dev đang làm hệ này trong Claude Code, muốn thử một MCP server tìm bài báo học thuật cho subagent search web.",
      "Đây là thử nghiệm: chưa đề xuất cho team, và “teammates should not see it yet” (đồng đội chưa được thấy).",
      "Chỗ khó: cả bốn phương án đều là file có thật, nhưng chỉ file Claude Code đọc cấu hình MCP mới làm server chạy."
    ],
    asks: [
      "Cấu hình server ở đâu?",
      "Tức là: một chỗ Claude Code thật sự đọc cấu hình MCP, và chỉ máy của dev này thấy.",
      "Soi từng phương án hai câu: Claude Code có nạp server từ chỗ đó không? Đồng đội có thấy không?"
    ],
    facts: [
      "MCP có ba scope (phạm vi). Project: <code>.mcp.json</code> ở gốc repo, commit vào git, ai clone cũng có. User: <code>~/.claude.json</code>, chỉ bạn, ở mọi repo. Local (mặc định của <code>claude mcp add</code>): cũng trong <code>~/.claude.json</code>, chỉ bạn, chỉ repo này.",
      "Claude Code chỉ đọc cấu hình MCP server từ <code>.mcp.json</code> và <code>~/.claude.json</code>. File khác, chỗ khác thì không đọc.",
      "<code>.claude/settings.local.json</code> là file settings riêng của bạn (bị gitignore), không phải nơi khai MCP server. Docs nhắc riêng: “local scope” của MCP nằm trong <code>~/.claude.json</code>, khác với file settings local.",
      "CLAUDE.md là chữ hướng dẫn Claude đọc, không phải cơ chế cấu hình. Ghi lệnh khởi động server vào đó không làm server chạy."
    ],
    opts: [
      { k: "A", gist: "Add the server at user scope in the developer's own <code>~/.claude.json</code>.",
        why: [
          "Đúng chỗ cho server cá nhân, thử nghiệm (ý 1). File nằm trong home của dev, không vào repo, đồng đội không thấy.",
          "Claude Code đọc file này (ý 2), nên server chạy thật và subagent dùng thử được.",
          "Local scope cũng riêng tư như vậy. Thử ổn rồi mới chuyển sang <code>.mcp.json</code> cho cả team."
        ] },
      { k: "B", gist: "Write the server's launch command into the project's <code>CLAUDE.md</code> so Claude starts it when needed.",
        why: [
          "Sai ở giả định: CLAUDE.md không khai hay khởi động MCP server (ý 4). Server không bao giờ kết nối.",
          "CLAUDE.md thường được commit, nên đồng đội còn thấy dòng đó."
        ] },
      { k: "C", gist: "Add the server to the project's <code>.mcp.json</code> and tell teammates to ignore its tools for now.",
        why: [
          "Server chạy được, nhưng <code>.mcp.json</code> là file dùng chung, commit vào git (ý 1). Ai pull về cũng thấy, và được hỏi duyệt server mới.",
          "Dặn đồng đội “ignore” (lờ đi) không làm tool biến khỏi danh sách tool của họ. Trái thẳng yêu cầu chưa cho ai thấy.",
          "Dễ bị cuốn vì đây đúng là chỗ server sẽ nằm nếu team dùng. Nhưng đó là sau khi thử xong."
        ] },
      { k: "D", gist: "Register the server in <code>.claude/settings.local.json</code>, since that file is kept out of version control.",
        why: [
          "Đúng là file này không vào git. Nhưng nó là file settings, không phải nơi Claude Code đọc MCP server (ý 2, ý 3). Server không được nạp.",
          "Dễ bị cuốn vì chữ “local” và gitignore nghe đúng ý riêng tư. Nhưng MCP scope local cũng nằm trong <code>~/.claude.json</code>, không nằm ở file này."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, mục “Ba phạm vi, hai file”: project, user, local", href: NOTES + "#l-2-4" },
      { label: "Cheatsheet D2: dòng “Server cá nhân, thử nghiệm, không ảnh hưởng team”", href: NOTES + "#cheat-d2" },
      { label: "Docs MCP, mục MCP installation scopes: local và user lưu trong ~/.claude.json, khác .claude/settings.local.json", href: "https://code.claude.com/docs/en/mcp" }
    ]
  },
  {
    de: 4, n: 48, total: 60, sub: "1.2", subName: "Điều phối coordinator–subagent", scen: "S3",
    answer: "BC",
    ask: "A teammate proposes letting the document analysis subagent pass its findings straight to the synthesis subagent. Which two design choices keep the system consistent with the hub-and-spoke pattern? (Select two.)",
    scene: [
      "Đồng đội đề xuất: subagent phân tích tài liệu đưa kết quả thẳng cho subagent tổng hợp, khỏi vòng qua coordinator.",
      "Đề không hỏi đề xuất đó hay hay dở. Đề hỏi hai lựa chọn thiết kế giữ đúng mô hình hub-and-spoke.",
      "Chỗ khó: hai đáp án đúng lo hai việc khác nhau của trục. Một là chuyển thông tin, một là xử lý lỗi."
    ],
    asks: [
      "Hai lựa chọn nào giữ hệ đúng hub-and-spoke?",
      "Tức là: mọi thông tin và mọi lỗi đều đi qua coordinator, và subagent chỉ biết những gì coordinator ghi vào lời giao việc.",
      "Soi từng phương án: thông tin có đi qua trục không, và subagent nhận có thật sự có dữ liệu không?"
    ],
    facts: [
      "Hub-and-spoke (trục và nan hoa): coordinator là trục. Nó giao việc, subagent trả kết quả về nó, lỗi cũng báo về nó. Subagent không nói chuyện trực tiếp với nhau. Lợi ích: nhìn một chỗ là thấy hết, xử lý lỗi một kiểu, biết thông tin chảy đi đâu.",
      "Subagent thường (không phải fork) bắt đầu với context mới: có system prompt riêng và lời giao việc, không có lịch sử hội thoại, kết quả tool hay system prompt của coordinator. Chỉ bản báo cáo cuối của nó trả về coordinator.",
      "Vì thế muốn synthesis dùng kết quả phân tích, coordinator phải dán nguyên kết quả đó vào lời giao việc, tách nội dung và metadata nguồn (URL, tài liệu, trang) để không mất trích nguồn."
    ],
    opts: [
      { k: "A", gist: "Rely on the synthesis subagent inheriting the coordinator's conversation history instead of passing the findings explicitly.",
        why: [
          "Sai ở giả định: subagent thường không kế thừa lịch sử của coordinator (ý 2).",
          "Synthesis chạy mà không có kết quả search hay phân tích nào, chỉ viết được kiến thức chung, không nguồn.",
          "Dễ bị cuốn vì fork thì đúng là sao chép hội thoại. Nhưng subagent mặc định không phải fork."
        ] },
      { k: "B", gist: "Keep error handling in the coordinator, so it sees every subagent failure and decides recovery in one place.",
        why: [
          "Đúng vai trò trục (ý 1): mọi kết quả và lỗi đổ về coordinator.",
          "Một chỗ quyết thử lại, giao cho subagent khác, hay đi tiếp với kết quả thiếu và ghi rõ chỗ thiếu. Không để mỗi subagent tự xử một kiểu."
        ] },
      { k: "C", gist: "Return the analysis results to the coordinator, which places them explicitly in the synthesis subagent's prompt.",
        why: [
          "Đúng đường đi của hub-and-spoke: kết quả về trục, trục quyết subagent kế cần gì (ý 1).",
          "Synthesis bắt đầu với context mới, nên kết quả phải nằm trong lời giao việc thì mới tồn tại với nó (ý 2, ý 3)."
        ] },
      { k: "D", gist: "Let the analysis subagent send its findings directly to the synthesis subagent to cut out a coordinator hop.",
        why: [
          "Phá mô hình: subagent nói chuyện trực tiếp với nhau, trục không thấy gì đã được chuyển (ý 1).",
          "Lỗi hay chỗ thiếu trong đoạn chuyển đó khó bị phát hiện và khó sửa. Notes xếp “subagent gửi kết quả thẳng cho nhau cho nhanh” vào cột Tệ.",
          "Dễ bị cuốn vì bớt một chặng nghe nhanh hơn. Nhưng đề hỏi giữ đúng mô hình, không hỏi cách nhanh nhất."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, mục “Chuyện gì đang xảy ra”: hub-and-spoke, mọi thứ đi qua coordinator, subagent không nói chuyện trực tiếp", href: NOTES + "#l-1-2" },
      { label: "Bài 1.3: subagent bắt đầu với trang giấy trắng, phải dán nguyên kết quả vào lời giao việc", href: NOTES + "#l-1-3" },
      { label: "Docs Agent SDK Subagents, mục What subagents inherit: subagent không nhận lịch sử hay kết quả tool của agent cha", href: "https://code.claude.com/docs/en/agent-sdk/subagents" }
    ]
  },
  {
    de: 4, n: 49, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code", scen: "S3",
    answer: "A",
    ask: "The document analysis subagent has the built-in Read tool and an MCP tool <code>fetch_source_document</code>, described only as “Retrieves a document”, which returns the text along with its source URL and page anchors. The subagent keeps calling Read on local copies of the files, so findings reach synthesis without citation metadata. What is the most effective fix?",
    scene: [
      "Subagent phân tích tài liệu có hai tool đọc tài liệu: Read có sẵn, và tool MCP <code>fetch_source_document</code>.",
      "Tool MCP trả văn bản kèm URL nguồn và page anchor (mốc trang), đúng thứ báo cáo cần để trích nguồn. Nhưng description của nó chỉ có “Retrieves a document” (lấy một tài liệu).",
      "Subagent cứ dùng Read trên bản sao local, nên kết quả tới synthesis không có metadata trích nguồn."
    ],
    asks: [
      "Cách sửa hiệu quả nhất là gì?",
      "Tức là: vì sao subagent chọn Read, và sửa đúng chỗ khiến nó chọn sai.",
      "Soi từng phương án: nó sửa nguyên nhân chọn sai, hay chỉ nhắc, chỉ làm mẫu, hay vá ở bước sau?"
    ],
    facts: [
      "Claude chọn tool chủ yếu dựa vào description. Hai tool trông như làm cùng một việc thì nó nghiêng về tool mô tả rõ hơn, thường là built-in.",
      "Guide gọi cách sửa là enhancing MCP tool descriptions (làm giàu mô tả tool MCP): nói rõ nó làm được gì, trả về gì, khi nào nên dùng thay built-in tool. Không tắt built-in tool.",
      "Lời dặn trong system prompt hay few-shot chỉ là gợi ý thêm. Chúng không sửa chỗ mô tả mập mờ.",
      "Mỗi subagent cầm tool đúng vai trò. Việc của synthesis là tổng hợp, không phải đi lấy lại tài liệu."
    ],
    opts: [
      { k: "A", gist: "Expand the MCP tool's description to stress the source URL and page anchors that Read cannot provide.",
        why: [
          "Sửa đúng thứ model dựa vào để chọn (ý 1). Mô tả ghi rõ tool trả URL nguồn và page anchor mà Read không có, và nên dùng cho mọi tài liệu sẽ được trích nguồn (ý 2).",
          "Với model, hai tool hết trùng nhau. Subagent chọn <code>fetch_source_document</code>, metadata vào luồng ngay từ đầu."
        ] },
      { k: "B", gist: "Add a system prompt rule telling the subagent to always prefer MCP tools over built-in ones.",
        why: [
          "Chỉ là gợi ý (ý 3). Mô tả “Retrieves a document” vẫn mập mờ, nên vẫn có lần chọn Read.",
          "Luật “luôn ưu tiên MCP” còn quá rộng: file thật sự nằm trong workspace thì Read mới là tool đúng.",
          "Dễ bị cuốn vì viết một câu là xong. Nhưng câu đó không cho model biết tool MCP hơn ở đâu."
        ] },
      { k: "C", gist: "Have the synthesis subagent re-fetch every document after analysis to rebuild the missing citations.",
        why: [
          "Vá ở bước sau: thêm tool call, làm lại việc lẽ ra đúng từ đầu, trong khi chỗ chọn sai ở subagent phân tích vẫn còn.",
          "Đẩy việc lấy tài liệu sang synthesis, trái vai trò của nó (ý 4)."
        ] },
      { k: "D", gist: "Add few-shot examples to the subagent prompt that show it calling <code>fetch_source_document</code> first.",
        why: [
          "Few-shot cho thấy một kiểu làm, nhưng không nói vì sao tool MCP đúng hơn (ý 3). Gặp ca khác ví dụ thì vẫn có thể chọn Read.",
          "Tốn thêm token, trong khi chỗ sửa có tác dụng nhất là description (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 2.4: agent dùng Grep built-in thay vì search_issues của MCP → làm giàu description của tool MCP (Khi đi thi)", href: NOTES + "#l-2-4" },
      { label: "Bài 2.1: description là thứ chính model dựa vào để chọn tool", href: NOTES + "#l-2-1" }
    ]
  },
  {
    de: 4, n: 50, total: 60, sub: "2.5", subName: "Chọn built-in tool đúng việc", scen: "S3",
    answer: "BC",
    ask: "The report-generation subagent must replace one of nine identical <code>Source: pending</code> markers in a drafted Markdown report, and its Edit call fails because the target text is not unique. Which TWO approaches reliably complete the change? (Select TWO.)",
    scene: [
      "Bản nháp báo cáo Markdown có chín chỗ y hệt nhau: <code>Source: pending</code> (nguồn: đang chờ).",
      "Subagent viết báo cáo cần thay đúng một chỗ trong chín. Edit báo lỗi vì đoạn cần thay không duy nhất.",
      "Ví dụ minh họa:<pre><code>## Battery costs\nPrices fell sharply. Source: pending\n\n## Hydrogen storage\nEfficiency is low. Source: pending</code></pre>"
    ],
    asks: [
      "Hai cách nào chắc chắn làm xong việc thay đó?",
      "Tức là: đổi đúng một marker, tám cái còn lại và phần còn lại của báo cáo giữ nguyên.",
      "Soi từng phương án: tool có làm được điều phương án giả định không? Nếu làm được, có đúng một chỗ đổi không?"
    ],
    facts: [
      "Edit tìm <code>old_string</code> đúng nguyên văn, không regex. <code>old_string</code> phải xuất hiện đúng một lần; khớp nhiều chỗ thì Edit báo lỗi và không sửa gì.",
      "Khớp nhiều chỗ: kéo dài <code>old_string</code> thêm vài dòng xung quanh cho thành duy nhất. Không làm được thì Read + Write.",
      "<code>replace_all: true</code> đổi mọi chỗ khớp. Chỉ dùng khi thật sự muốn đổi tất cả.",
      "Write tạo file mới hoặc ghi đè toàn bộ file bằng nội dung được đưa. Nó không nối thêm, không trộn."
    ],
    opts: [
      { k: "A", gist: "Write only the corrected section and count on Write to merge it into the existing report.",
        why: [
          "Sai ở giả định: Write không trộn (ý 4).",
          "Ghi mỗi đoạn đã sửa thì cả báo cáo bị thay bằng đúng đoạn đó. Phần còn lại của bản nháp mất sạch."
        ] },
      { k: "B", gist: "Retry Edit with an <code>old_string</code> that takes in enough surrounding lines to match only the intended marker.",
        why: [
          "Đúng cách chữa lỗi khớp nhiều chỗ (ý 2). Thêm câu ngay trước marker cần sửa, như <code>Efficiency is low. Source: pending</code> trong ví dụ, thì đoạn đó chỉ có ở một chỗ.",
          "Edit khớp đúng một chỗ (ý 1) và chỉ sửa chỗ đó, không phải ghi lại cả file."
        ] },
      { k: "C", gist: "Read the full report, then Write the complete contents back with only the intended marker changed.",
        why: [
          "Đường lui khi Edit không có anchor duy nhất (ý 2). Read lấy đủ nội dung hiện tại, sửa đúng một marker, Write ghi lại cả file.",
          "Write ghi đè toàn bộ (ý 4), nên subagent nắm từng chữ ghi xuống. Tám marker kia giữ nguyên vì nó chép lại y nguyên.",
          "Docs: model cũ bắt buộc Read trước khi ghi đè file có sẵn, model mới thì tùy trường hợp. Nhưng dù sao cũng phải Read mới có đủ nội dung để viết lại."
        ] },
      { k: "D", gist: "Retry Edit with <code>replace_all</code> set to true, so the uniqueness rule stops blocking the call.",
        why: [
          "Lần này Edit chạy được, không báo lỗi.",
          "Nhưng nó đổi cả chín marker (ý 3). Tám chỗ kia bị điền cùng một nguồn, sai.",
          "Dễ bị cuốn vì nó gỡ đúng cái lỗi đang chặn. Nhưng đề cần đổi một chỗ, không phải gỡ lỗi bằng mọi giá."
        ] }
    ],
    refs: [
      { label: "Bài 2.5, mục “Đã sửa 01/11”: Edit khớp nhiều chỗ thì kéo dài old_string, không được thì Read + Write", href: NOTES + "#fix-3" },
      { label: "Bài 2.5: anchor (old_string) phải xuất hiện đúng một lần; Write là đường lui", href: NOTES + "#l-2-5" },
      { label: "Docs Tools reference, mục Edit tool behavior và Write tool behavior", href: "https://code.claude.com/docs/en/tools-reference" }
    ]
  },
  {
    de: 4, n: 51, total: 60, sub: "1.6", subName: "Chia việc lớn", scen: "S3",
    answer: "AB",
    ask: "The coordinator is handed an open-ended research topic, and which subtopics matter cannot be known ahead of time. Which two practices should it use when breaking the work down? (Choose two.)",
    scene: [
      "Coordinator nhận một đề tài research mở: chưa ai biết trước đề tài có những mảng con nào đáng tìm.",
      "Chỗ khó: chia việc thì cần một danh sách việc con, mà danh sách đó chưa thể viết ra lúc bắt đầu.",
      "Đề bắt chọn hai cách làm. Mỗi phương án đúng phải trả lời được: chưa biết hình dạng đề tài thì lấy đâu ra danh sách việc con?"
    ],
    asks: [
      "Hai cách nào coordinator nên dùng khi chia việc?",
      "Tức là: đề tài chưa rõ hình dạng thì chia thế nào để không sót mảng.",
      "Soi từng phương án: danh sách việc con được chốt từ đầu hay sinh ra từ những gì tìm được? Nó có lấp được mảng chưa ai được giao không?"
    ],
    facts: [
      "Prompt chaining (chuỗi bước định sẵn): các bước biết trước, viết sẵn trong code. Hợp với việc đoán trước được, ví dụ review PR: mỗi file một lượt rồi một lượt tích hợp.",
      "Dynamic adaptive decomposition (chia việc thích ứng): bước sau chưa biết trước. Agent làm bước khám phá, nhìn kết quả rồi mới quyết bước sau, và sửa kế hoạch khi phát hiện điều mới.",
      "Việc mở thì đi theo thứ tự: vẽ bản đồ (đề tài có những mảng nào), tìm mảng ảnh hưởng cao, lập kế hoạch ưu tiên, rồi sửa kế hoạch khi lộ ra điều mới.",
      "Narrow decomposition (chia việc quá hẹp): coordinator chia thiếu mảng, nên mảng đó không ai tìm. Subagent chỉ thấy đúng mảng được giao, nó không biết mảng nào bị bỏ sót."
    ],
    opts: [
      { k: "A", gist: "Spawn follow-up subtasks based on what earlier subagents turn up, instead of locking in the whole task list at the start.",
        why: [
          "Đây là chia việc thích ứng (ý 2): mỗi lượt kết quả trả về là đầu vào cho lượt giao việc sau.",
          "Subagent lộ ra một mảng hay một phụ thuộc chưa ai tính tới thì coordinator thêm việc con cho đúng chỗ đó. Kế hoạch đầy dần theo những gì tìm được, không bị đóng băng ở lần đoán đầu."
        ] },
      { k: "B", gist: "Do a broad scoping pass first to map the topic's major areas, and only then hand out detailed subagent tasks.",
        why: [
          "Đây là bước “vẽ bản đồ” của việc mở (ý 3): biết đề tài có những mảng nào, mảng nào nặng ký, rồi mới giao việc chi tiết.",
          "Nó chặn đúng lỗi chia quá hẹp (ý 4). Chưa nhìn toàn cảnh mà đã chốt vài mảng con thì cả một mảng lớn có thể không ai tìm."
        ] },
      { k: "C", gist: "Fix the complete list of subagent assignments up front, so every run follows the same reproducible pipeline.",
        why: [
          "Sai ở giả định: danh sách cố định là prompt chaining (ý 1), hợp với việc biết trước các bước. Đề nói rõ mảng con không biết trước được.",
          "Chốt danh sách trước khi khám phá thì chỗ hổng của lần đoán đầu bị đóng băng. Lần chạy nào cũng sót đúng những mảng đó.",
          "Dễ bị cuốn vì “reproducible” (chạy lại ra giống nhau) nghe như ưu điểm. Nhưng lặp lại ổn định một kế hoạch thiếu mảng thì chỉ là sót đều đặn."
        ] },
      { k: "D", gist: "Ask each subagent to score its confidence that its area is fully covered, and re-run only the low scorers.",
        why: [
          "Sai chỗ sửa: chỗ hổng nằm ở mảng chưa ai được giao (ý 4). Subagent chỉ chấm được mảng của nó, không biết mảng nào không có trong danh sách.",
          "Chạy lại đúng việc cũ không sinh ra việc con mới, nên mảng bị sót vẫn sót.",
          "Thêm nữa, điểm tự tin model tự chấm chưa được đối chiếu với kết quả thật, không dùng làm thước đo độ phủ được."
        ] }
    ],
    refs: [
      { label: "Bài 1.6, mục “Chuyện gì đang xảy ra”: prompt chaining cho việc đoán trước được; việc mở thì vẽ bản đồ, ưu tiên, sửa kế hoạch dần", href: NOTES + "#l-1-6" },
      { label: "Bài 1.2, mục “Lỗi trong tình huống nằm ở đâu”: narrow decomposition, báo cáo thiếu mảng thì lỗi ở người chia việc", href: NOTES + "#l-1-2" }
    ]
  },
  {
    de: 4, n: 52, total: 60, sub: "1.2", subName: "Điều phối coordinator–subagent", scen: "S3",
    answer: "AB",
    ask: "Logs show the web search subagent and the document analysis subagent repeatedly researching the same subtopics, nearly doubling token spend without widening the research. Which two changes cut this duplication most effectively? (Choose two.)",
    scene: [
      "Log cho thấy web search subagent (tìm web) và document analysis subagent (phân tích tài liệu) cứ tìm trùng những mảng con giống nhau.",
      "Token gần gấp đôi, mà phạm vi research không rộng thêm chút nào.",
      "Chỗ khó: trùng việc sinh ra lúc giao việc, nhưng triệu chứng lại hiện ở báo cáo và hóa đơn token. Sửa ở đâu thì mới cắt được token?"
    ],
    asks: [
      "Hai thay đổi nào cắt trùng lặp hiệu quả nhất?",
      "Tức là: làm sao để mỗi subagent biết mảng nào là của mình, trước khi token bị đốt.",
      "Soi từng phương án: nó chặn trùng trước khi subagent chạy, hay dọn sau khi token đã tiêu? Ai giữ ranh giới: coordinator, hay các subagent tự lo với nhau?"
    ],
    facts: [
      "Hub-and-spoke (trục và nan hoa): coordinator là trục, việc giao, kết quả, lỗi đều đi qua nó. Subagent không nói chuyện trực tiếp với nhau.",
      "Subagent có context cô lập: nó chỉ biết những gì coordinator viết vào lời giao việc. Ranh giới mà coordinator không viết ra thì subagent không biết.",
      "Partition scope (chia phạm vi): mỗi subagent nhận một mảng hoặc một loại nguồn riêng. Các mảng gộp lại phải phủ đủ câu hỏi và không chồng lên nhau. Chồng nhau thì tốn token.",
      "Một lời giao việc tốt có bốn phần: mục tiêu, định dạng đầu ra, nên dùng nguồn nào, và ranh giới (không làm gì). Thiếu ranh giới thì các subagent lấn việc nhau."
    ],
    opts: [
      { k: "A", gist: "Have the coordinator spell out, in each delegation prompt, which subtopics that subagent must leave alone.",
        why: [
          "Đây là phần “ranh giới” của lời giao việc (ý 4): ghi rõ mảng nào thuộc subagent kia, không được đụng vào.",
          "Subagent chỉ biết những gì có trong lời giao việc (ý 2), nên ranh giới phải viết ra mới có tác dụng. Viết trước khi subagent chạy, nên token không bị đốt vào việc trùng."
        ] },
      { k: "B", gist: "Have the coordinator split the topic into distinct subtopics and give each subagent its own set.",
        why: [
          "Đây là partition scope (ý 3): chia đề tài thành các mảng không chồng nhau, mỗi subagent một phần.",
          "Sửa đúng gốc: trùng việc sinh ra lúc chia việc. Hai subagent vẫn chạy song song, chỉ là không còn tìm chung một chỗ."
        ] },
      { k: "C", gist: "Set up a shared log where each subagent records its current focus so the other one can stay away from it.",
        why: [
          "Sai ở giả định: đẩy việc chia ranh giới xuống cho các subagent tự lo với nhau trong lúc chạy, vòng qua coordinator (ý 1).",
          "Phải dựng thêm một cơ chế riêng và thêm một nguồn sự thật thứ hai, trong khi chia việc vốn là việc coordinator đã nắm sẵn ở lời giao việc.",
          "Dễ bị cuốn vì nghe như phối hợp thông minh. Nhưng ranh giới đặt một lần ở lời giao việc thì đơn giản và chắc hơn."
        ] },
      { k: "D", gist: "Let both subagents cover the whole topic, then have the coordinator deduplicate the overlapping findings.",
        why: [
          "Dọn sau chứ không chặn trước: lúc coordinator gộp trùng thì cả hai subagent đã tìm xong, token đã tiêu.",
          "Báo cáo gọn hơn, nhưng hóa đơn token vẫn gấp đôi. Đề đòi giảm trùng ở việc tìm, không phải ở chữ trong báo cáo.",
          "Dễ bị cuốn vì gộp trùng là việc coordinator vẫn làm lúc tổng hợp. Nhưng nó chữa triệu chứng ở đầu ra, gốc nằm ở lúc giao việc."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, mục “Lỗi trong tình huống nằm ở đâu”: partition scope, mỗi subagent một mảng, không chồng nhau", href: NOTES + "#l-1-2" },
      { label: "Bài 1.3, “Biết thêm”: lời giao việc có bốn phần, thiếu ranh giới thì subagent lấn việc nhau", href: NOTES + "#l-1-3" },
      { label: "Cheatsheet D1: dòng “Hai subagent trả kết quả trùng nhau” → chia phạm vi", href: NOTES + "#cheat-d1" }
    ]
  },
  {
    de: 4, n: 53, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S3",
    answer: "B",
    ask: "The coordinator session has finished gathering and aggregating findings on a topic, a costly phase the team does not want to repeat. They now want to try two different report structures from that same aggregated baseline, with neither attempt seeing the other's output. How should they proceed?",
    scene: [
      "Phiên coordinator đã gom và tổng hợp xong findings của một đề tài. Đây là phần đắt, team không muốn làm lại.",
      "Giờ team muốn thử hai cấu trúc báo cáo khác nhau, cùng xuất phát từ bản tổng hợp đó.",
      "Chỗ khó: hai lần thử phải mang trọn bản tổng hợp, mà lại không được thấy output của nhau. Ví dụ minh họa:<pre><code>phiên coordinator (đã gom xong, giữ nguyên)\n ├─ nhánh 1: báo cáo cấu trúc A\n └─ nhánh 2: báo cáo cấu trúc B</code></pre>"
    ],
    asks: [
      "Team nên làm thế nào?",
      "Tức là: có hai phiên mới, mỗi phiên mang sẵn toàn bộ lịch sử gom findings, rồi đi tiếp độc lập.",
      "Soi từng phương án: bản tổng hợp có được giữ trọn không, và hai lần thử có nằm chung một lịch sử không?"
    ],
    facts: [
      "Resume mở lại đúng phiên cũ, nạp lại lịch sử và ghi tiếp vào chính phiên đó.",
      "Fork (Agent SDK: <code>fork_session</code>, đặt cùng <code>resume</code>) sao chép lịch sử phiên sang một phiên mới có ID riêng rồi đi tiếp độc lập. Phiên gốc không bị đụng tới.",
      "Tóm tắt viết tay là bản rút gọn: con số, nguồn, sắc thái của findings dễ rơi mất.",
      "Context không quên theo yêu cầu: lời dặn “bỏ qua phần trước” không xóa được output đã nằm trong lịch sử."
    ],
    opts: [
      { k: "A", gist: "Open two fresh sessions and seed each with a hand-written summary of the aggregated findings as the first message.",
        why: [
          "Hai nhánh tách nhau thật, nhưng bản tóm tắt viết tay làm rơi chi tiết (ý 3). Hai báo cáo không còn xuất phát từ trọn bản tổng hợp.",
          "Còn tốn công viết tóm tắt rồi dán hai lần, trong khi fork mang nguyên lịch sử sang cả hai nhánh.",
          "Dễ bị cuốn vì phiên mới kèm tóm tắt là cách đúng khi lịch sử cũ đã lỗi thời. Ở đây bản tổng hợp vẫn đúng, nên fork giữ được nhiều hơn."
        ] },
      { k: "B", gist: "Resume the coordinator session twice with <code>fork_session</code> enabled, giving each report structure its own branch off the baseline.",
        why: [
          "Mỗi lần resume kèm <code>fork_session</code> tạo một phiên mới có ID riêng, chứa trọn lịch sử gom findings (ý 2). Làm hai lần là có hai nhánh cùng gốc.",
          "Nhánh này không ghi vào nhánh kia, phiên gốc vẫn nguyên. Không phải gom lại findings."
        ] },
      { k: "C", gist: "Resume the session once and ask the coordinator to draft both report structures in the same turn for comparison.",
        why: [
          "Hai bản nằm trong cùng một context: bản thứ hai được viết khi bản thứ nhất nằm ngay đó. Hai lần thử không còn độc lập, trái điều đề đòi.",
          "Một context phải chứa hai báo cáo đầy đủ, thay vì mỗi nhánh một báo cáo."
        ] },
      { k: "D", gist: "Resume the same session ID twice in a row, telling the second run to ignore the first report structure it wrote.",
        why: [
          "Resume không fork thì cả hai lần đều ghi tiếp vào cùng một lịch sử (ý 1). Lần thứ hai thấy nguyên cấu trúc thứ nhất.",
          "Lời dặn “ignore” (bỏ qua) không xóa được gì (ý 4). Cấu trúc đầu vẫn ảnh hưởng cấu trúc sau.",
          "Dễ bị cuốn vì resume đúng là mang theo toàn bộ bản tổng hợp. Nhưng B và D chỉ khác nhau ở cờ fork, và đó là cả câu hỏi."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Ba cách nối lại công việc”: resume, fork, phiên mới kèm tóm tắt", href: NOTES + "#l-1-7" },
      { label: "Cheatsheet D1: dòng “So sánh hai hướng từ cùng một bản phân tích” → fork_session", href: NOTES + "#cheat-d1" },
      { label: "Docs Agent SDK Sessions, mục Fork to explore alternatives: fork có session ID riêng, phiên gốc giữ nguyên", href: "https://code.claude.com/docs/en/agent-sdk/sessions" }
    ]
  },
  {
    de: 4, n: 54, total: 60, sub: "1.3", subName: "Gọi subagent, truyền context", scen: "S3",
    answer: "AD",
    ask: "The coordinator's system prompt lays out the required citation format, yet the document analysis subagent returns findings without citations and sometimes asks which document it is supposed to analyze. Which two changes correct this? (Choose two.)",
    scene: [
      "System prompt của coordinator ghi rõ định dạng trích dẫn bắt buộc.",
      "Vậy mà document analysis subagent trả findings không có trích dẫn, và đôi khi còn hỏi lại nó phải phân tích tài liệu nào.",
      "Chỗ khó: hai triệu chứng nhìn khác nhau, nhưng cùng một gốc. Thứ coordinator biết không tự chảy xuống subagent."
    ],
    asks: [
      "Hai thay đổi nào sửa được chuyện này?",
      "Tức là: luật trích dẫn và tài liệu cần phân tích phải nằm ở đâu thì subagent mới thật sự thấy.",
      "Soi từng phương án: thứ nó thêm vào có nằm trong context của subagent không?"
    ],
    facts: [
      "Subagent không phải fork thì khởi động với context mới. Nó không nhận lịch sử hội thoại, kết quả tool, hay system prompt của coordinator.",
      "Subagent nhận hai lớp prompt. Lớp một là <code>prompt</code> trong <code>AgentDefinition</code>, cố định, đóng vai system prompt riêng của nó. Lớp hai là lời giao việc của từng lần gọi. Thứ lần nào cũng cần thì đặt ở lớp một.",
      "Lời giao việc là kênh duy nhất đưa nội dung của từng lần gọi từ coordinator xuống: tài liệu, câu hỏi, đường dẫn, quyết định đã chốt đều phải viết thẳng vào đó.",
      "Fork là ngoại lệ: nó sao chép cả hội thoại của bên gọi. Subagent thường thì không, dù được gọi sớm hay muộn."
    ],
    opts: [
      { k: "A", gist: "Put the citation format rules into the document analysis subagent's own system prompt in its <code>AgentDefinition</code>.",
        why: [
          "Đặt luật vào lớp một (ý 2): <code>prompt</code> của <code>AgentDefinition</code> là system prompt riêng của subagent, nạp ở mọi lần gọi.",
          "Định dạng trích dẫn là thứ lần nào cũng cần, nên đây là chỗ đúng. Subagent thấy luật ngay từ đầu, không phụ thuộc coordinator có nhớ dặn hay không."
        ] },
      { k: "B", gist: "Make the coordinator's system prompt more forceful, stating that every subagent has to apply the citation format.",
        why: [
          "Sai ở giả định: system prompt của coordinator không chép xuống subagent (ý 1). Viết mạnh tới đâu thì luật vẫn nằm ở chỗ subagent không đọc.",
          "Dễ bị cuốn vì đề kể luật đã nằm trong system prompt của coordinator, nên tưởng chỉ cần nói mạnh hơn. Nhưng luật không yếu, luật đặt sai chỗ."
        ] },
      { k: "C", gist: "Start the subagent only after the coordinator has discussed the document, so that discussion is already in its history.",
        why: [
          "Sai ở giả định: subagent thường không nhận lịch sử của coordinator, gọi sớm hay muộn cũng vậy (ý 1, ý 4). Context của nó vẫn trắng.",
          "Coordinator bàn kỹ tới đâu thì subagent cũng không thấy, nên vẫn hỏi lại phải phân tích tài liệu nào."
        ] },
      { k: "D", gist: "Include the full document text and the research question directly in each delegation prompt.",
        why: [
          "Đặt tài liệu và câu hỏi vào lớp hai (ý 3): thứ đổi theo từng lần gọi thì đi qua lời giao việc.",
          "Subagent có sẵn đúng tài liệu và đúng câu hỏi, nên hết hỏi lại “phân tích tài liệu nào”."
        ] }
    ],
    refs: [
      { label: "Bài 1.3: subagent bắt đầu với trang giấy trắng; “Biết thêm”: hai lớp prompt, thứ lần nào cũng cần đặt ở prompt của AgentDefinition", href: NOTES + "#l-1-3" },
      { label: "Cheatsheet D1: dòng “Synthesis bỏ qua kết quả search” → dán đủ vào lời giao việc", href: NOTES + "#cheat-d1" },
      { label: "Docs Subagents in the SDK, mục What subagents inherit: subagent nhận prompt riêng và lời giao việc, không nhận lịch sử hay system prompt của bên gọi", href: "https://code.claude.com/docs/en/agent-sdk/subagents" }
    ]
  },
  {
    de: 4, n: 55, total: 60, sub: "1.4", subName: "Workflow nhiều bước có cổng chặn và bàn giao", scen: "S3",
    answer: "AC",
    ask: "Mid-research, the coordinator escalates to a human editor because two credible sources disagree materially on a key statistic. The editor has no access to the agent transcript. Which two elements should the handoff include? (Choose two.)",
    scene: [
      "Đang research thì coordinator escalate (chuyển ca) cho một biên tập viên, vì hai nguồn uy tín đưa ra một con số quan trọng khác hẳn nhau.",
      "Biên tập viên không đọc được transcript (toàn bộ hội thoại) của agent.",
      "Chỗ khó: thứ duy nhất biên tập viên có là gói bàn giao. Gói đó phải đủ để quyết định, mà không biến thành một đống dữ liệu thô bắt họ làm lại từ đầu."
    ],
    asks: [
      "Gói bàn giao nên có hai thứ nào?",
      "Tức là: đọc một lần là biên tập viên biết ca này là gì và quyết được nên làm gì.",
      "Soi từng phương án: nó đưa dữ kiện cụ thể và đề xuất, hay một con số chung chung, hay dữ liệu thô chưa xử lý?"
    ],
    facts: [
      "Escalate là chuyển ca từ agent sang người. Handoff là gói thông tin đi kèm. Người nhận không đọc được hội thoại, nên gói phải tự đủ: mã yêu cầu, vấn đề, việc đã làm, lý do chuyển, đề xuất xử lý.",
      "Hai nguồn uy tín mâu thuẫn thì agent không tự chọn, mà giữ cả hai giá trị kèm nguồn. Hai số “mâu thuẫn” rất hay chỉ là hai năm khác nhau, nên mỗi claim phải đi kèm ngày xuất bản.",
      "Self-reported confidence (điểm tự tin model tự chấm) chưa được đối chiếu với kết quả thật, không phải tín hiệu đáng tin."
    ],
    opts: [
      { k: "A", gist: "Add the coordinator's recommended resolution and its reasoning, so the editor can approve or override it.",
        why: [
          "Đề xuất kèm lý do là một phần của gói tự đủ (ý 1). Ca chuyển thành một quyết định đọc một lần là xong: duyệt, bác, hay trả lại kèm chỉ dẫn.",
          "Không trái chuyện “agent không tự chọn” (ý 2): agent chỉ đề xuất, người mới chốt. Biên tập viên giữ quyền quyết mà không phải dựng lại phân tích từ đầu."
        ] },
      { k: "B", gist: "Add a self-rated confidence score for the whole draft report so the editor can quickly judge whether to step in.",
        why: [
          "Sai hai chỗ: điểm tự chấm không đáng tin (ý 3), và một điểm cho cả bản nháp không nói gì về đúng con số đang mâu thuẫn.",
          "Biên tập viên vẫn không có giá trị nào, nguồn nào, đề xuất nào để làm việc. Gói không tự đủ (ý 1).",
          "Dễ bị cuốn vì nó gọn, đọc nhanh. Nhưng nhanh mà không có dữ kiện thì vẫn phải đi hỏi lại."
        ] },
      { k: "C", gist: "Include the request ID, the conflicting values with their sources and dates, and what is still unresearched.",
        why: [
          "Đây là phần dữ kiện của gói tự đủ (ý 1): ca nào, giá trị nào lệch, mỗi giá trị từ nguồn nào, còn mảng nào chưa tìm.",
          "Có ngày, biên tập viên phân biệt được mâu thuẫn thật với hai mốc thời gian khác nhau (ý 2). Không có transcript thì đây là thứ duy nhất giúp họ làm tiếp mà không phải điều tra lại."
        ] },
      { k: "D", gist: "Include every raw search result and document excerpt the subagents collected, so the editor can rebuild the analysis.",
        why: [
          "Đẩy dữ liệu thô sang người: biên tập viên phải tự lọc và làm lại phần tổng hợp mà hệ thống đã làm xong.",
          "Gói bàn giao cần kết luận đã chắt lọc, có ghi nguồn (ý 1). Bằng chứng thô thì dẫn theo nguồn là đủ, không dán nguyên.",
          "Dễ bị cuốn vì “đưa hết cho chắc” nghe an toàn. Nhưng nhiều hơn không làm gói đủ hơn, chỉ làm nó khó đọc."
        ] }
    ],
    refs: [
      { label: "Bài 1.4, mục “Khi phải chuyển cho người thật”: structured handoff, gói bàn giao tự đủ", href: NOTES + "#l-1-4" },
      { label: "Bài 5.6: hai nguồn mâu thuẫn thì giữ cả hai kèm nguồn; claim phải có ngày xuất bản", href: NOTES + "#l-5-6" },
      { label: "Bài 5.2, khung định nghĩa “Self-reported confidence”: điểm tự chấm chưa đối chiếu với kết quả thật", href: NOTES + "#l-5-2" }
    ]
  },
  {
    de: 4, n: 56, total: 60, sub: "1.6", subName: "Chia việc lớn", scen: "S3",
    answer: "BD",
    ask: "The document analysis subagent receives all twelve source documents in a single prompt. It analyzes some in depth and others only briefly, and it judges similar claims in contradictory ways. Which two changes to its pipeline address this most directly? (Choose two.)",
    scene: [
      "Document analysis subagent nhận cả 12 tài liệu nguồn trong một prompt.",
      "Kết quả: tài liệu thì phân tích kỹ, tài liệu thì lướt qua. Những claim (khẳng định) giống nhau lại bị đánh giá trái ngược nhau.",
      "Chỗ khó: 12 tài liệu vẫn vừa trong context. Vấn đề không phải thiếu chỗ chứa."
    ],
    asks: [
      "Hai thay đổi nào xử lý trực tiếp nhất?",
      "Tức là: làm sao để tài liệu nào cũng được phân tích cùng độ sâu, và chỗ lệch nhau giữa các tài liệu được đối chiếu thật sự.",
      "Soi từng phương án: nó đổi cấu trúc lượt phân tích, hay chỉ nới chỗ chứa, chạy lặp, lọc kết quả?"
    ],
    facts: [
      "Attention dilution (loãng chú ý): nhồi nhiều thứ vào một lần gọi thì chú ý của model bị dàn mỏng. Phần này kỹ, phần kia qua loa, và không có chuẩn chung để đối chiếu.",
      "Cách chia của guide: mỗi đơn vị (file, tài liệu) một lượt riêng để phân tích cục bộ, rồi một lượt tích hợp riêng để nhìn quan hệ giữa các đơn vị.",
      "Context window lớn hơn không chữa loãng chú ý: nó tăng sức chứa, không làm chú ý tốt hơn.",
      "Chạy cả lượt nhiều lần rồi chỉ giữ finding xuất hiện ít nhất hai lần: notes xếp vào cách làm tệ. Lỗi thật chỉ bắt được ở một lần chạy sẽ bị loại."
    ],
    opts: [
      { k: "A", gist: "Move the subagent to a model with a larger context window so all twelve documents fit comfortably in one pass.",
        why: [
          "Sai ở giả định: tài liệu đã vừa rồi. Đây là loãng chú ý, không phải thiếu chỗ (ý 1, ý 3).",
          "Context to hơn vẫn là một lượt cho 12 tài liệu, nên chỗ kỹ chỗ lướt và phán xét lệch nhau vẫn còn.",
          "Dễ bị cuốn vì “nhiều tài liệu quá” nghe như chuyện sức chứa. Nhưng đề đã nói tài liệu vừa trong prompt."
        ] },
      { k: "B", gist: "Run a separate analysis pass for each document that outputs structured per-document findings.",
        why: [
          "Đây là lượt cục bộ (ý 2): mỗi tài liệu một lượt riêng, không phải tranh chú ý với 11 tài liệu khác, nên độ sâu đều nhau.",
          "Findings ra dạng có cấu trúc thì lượt sau nhận được bản ghi claim và nguồn rõ ràng, không phải đào trong văn xuôi."
        ] },
      { k: "C", gist: "Run the full twelve-document analysis three times and keep only findings that appear in at least two runs.",
        why: [
          "Lặp lại một lượt đang loãng không làm lượt nào kỹ hơn (ý 1). Finding thật chỉ hiện ở một lần chạy bị luật đồng thuận loại mất (ý 4).",
          "Tốn gấp ba, mà gốc lỗi (12 tài liệu chung một prompt) vẫn nguyên.",
          "Dễ bị cuốn vì “chạy nhiều lần lấy phần chung” nghe như tăng độ tin cậy. Nhưng nó chỉ lọc đầu ra, không đổi cấu trúc."
        ] },
      { k: "D", gist: "Add a second integration pass that reconciles the per-document findings and flags cross-document contradictions.",
        why: [
          "Đây là lượt tích hợp (ý 2): nhận findings của từng tài liệu, đối chiếu các claim chồng nhau, chỉ ra mâu thuẫn kèm nguồn.",
          "Việc so giữa các tài liệu làm ở một chỗ, theo một chuẩn. Claim giống nhau không còn bị phán kiểu này ở tài liệu này, kiểu khác ở tài liệu kia mà không ai thấy."
        ] }
    ],
    refs: [
      { label: "Bài 1.6: attention dilution; mỗi file một pass rồi một pass tích hợp; context to hơn không chữa được", href: NOTES + "#l-1-6" },
      { label: "Bài 4.6: review nhiều lượt, lượt từng file và lượt tích hợp giữa các file", href: NOTES + "#l-4-6" }
    ]
  },
  {
    de: 4, n: 57, total: 60, sub: "5.4", subName: "Quản lý context khi khám phá codebase lớn", scen: "S3",
    answer: "A",
    ask: "The coordinator runs multi-hour research tasks that go through several context compactions. After each compaction it re-dispatches subtopics that subagents already finished and misquotes figures they returned earlier. Which change best preserves this information across compactions?",
    scene: [
      "Coordinator chạy những đợt research kéo dài nhiều giờ. Context bị compact (tóm tắt lịch sử cho gọn) nhiều lần.",
      "Sau mỗi lần compact, nó giao lại những mảng con mà subagent đã làm xong, và trích sai những con số subagent đã trả về.",
      "Chỗ khó: hai thứ bị mất (mảng nào xong rồi, con số chính xác) đều chỉ sống trong lịch sử hội thoại, đúng phần bị tóm tắt."
    ],
    asks: [
      "Thay đổi nào giữ thông tin này qua các lần compact tốt nhất?",
      "Tức là: để trạng thái công việc và con số chính xác ở đâu thì compact bao nhiêu lần cũng không mất.",
      "Soi từng phương án: thông tin còn nằm trong phần bị tóm tắt không? Còn thì sớm muộn vẫn bị viết lại."
    ],
    facts: [
      "Compaction (tóm tắt tự động phần lịch sử cũ khi context gần đầy) là nén có mất mát. Thứ mất đầu tiên là chi tiết chính xác: con số, mã, việc nào đã xong.",
      "Scratchpad file: file ghi chú agent tự viết findings vào và đọc lại khi cần. File nằm trên đĩa nên không mất khi context bị nén.",
      "Scratchpad phải được đọc lại. Sau compact, nội dung file không tự quay về context: agent phải chủ động đọc trước khi làm tiếp.",
      "Subagent khởi động với context mới và chỉ trả kết quả cuối về coordinator. Nó không phải chỗ giữ trạng thái cho coordinator."
    ],
    opts: [
      { k: "A", gist: "Have the coordinator append each subagent's findings and task status to a scratchpad file that it re-reads after compaction.",
        why: [
          "Đưa thông tin ra khỏi phần bị tóm tắt (ý 1, ý 2): mỗi lần subagent trả về, con số và trạng thái việc được ghi xuống đĩa.",
          "Có bước đọc lại sau compact (ý 3), nên coordinator lấy lại đúng con số và biết mảng nào đã xong, không giao lại."
        ] },
      { k: "B", gist: "Add a system prompt instruction telling the coordinator to retain every completed subtopic and returned figure across compactions.",
        why: [
          "Sai ở giả định: lời dặn không giữ được thứ compaction đã nén mất (ý 1). Coordinator chỉ nhớ được cái còn nằm trong context.",
          "Con số đã thành một câu tóm tắt mơ hồ thì dặn kiểu gì cũng không lấy lại được.",
          "Dễ bị cuốn vì nó nhắm đúng thứ bị mất. Nhưng lời nhắc không thay được chỗ lưu."
        ] },
      { k: "C", gist: "Put the coordinator's full conversation history into every subagent prompt, so completed findings stay in subagent context.",
        why: [
          "Sai kiến trúc: subagent chỉ trả kết quả cuối về (ý 4). Nhồi lịch sử cho subagent không trả lại cho coordinator thứ nó đã mất.",
          "Lời giao việc còn phình to bằng nội dung không liên quan tới việc hẹp của từng subagent."
        ] },
      { k: "D", gist: "Raise the compaction threshold so the coordinator's conversation is summarized less often during long research runs.",
        why: [
          "Chỉ hoãn: compact ít hơn thì vẫn compact. Chạy nhiều giờ kiểu gì cũng chạm ngưỡng (ý 1).",
          "Con số vẫn chỉ sống trong lịch sử, lần compact nào tới thì lại mất.",
          "Dễ bị cuốn vì đề kể compact nhiều lần, nên tưởng ít compact thì ít mất. Gốc lỗi là thông tin chỉ nằm trong phần bị tóm, không phải số lần tóm."
        ] }
    ],
    refs: [
      { label: "Bài 5.4, khung định nghĩa và “Biết thêm”: scratchpad file nằm trên đĩa, phải đọc lại sau compact", href: NOTES + "#l-5-4" },
      { label: "Bài 5.0, bảng cách làm: compaction làm mất số liệu chính xác; khối cấu trúc riêng giữ chi tiết ngoài phần bị nén", href: NOTES + "#l-5-0" }
    ]
  },
  {
    de: 4, n: 58, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S3",
    answer: "D",
    ask: "After the coordinator completes a costly analysis of a large document corpus in one session, the team wants to compare a chronological synthesis with a thematic synthesis, each starting from that analysis without influencing the other. What should they do?",
    scene: [
      "Coordinator đã phân tích xong một kho tài liệu lớn trong một phiên. Phân tích này tốn kém.",
      "Team muốn so hai cách tổng hợp: theo thời gian (chronological) và theo chủ đề (thematic). Cả hai cùng xuất phát từ bản phân tích, không được ảnh hưởng nhau.",
      "Chỗ khó: lần này có phương án chạy hai lần resume cùng lúc. Nhìn như hai nhánh song song, nhưng có thật là hai nhánh không?"
    ],
    asks: [
      "Team nên làm gì?",
      "Tức là: có hai phiên riêng, mỗi phiên mang trọn bản phân tích, không phiên nào thấy lượt của phiên kia.",
      "Soi từng phương án: bản phân tích có được giữ trọn không, và hai cách tổng hợp có ghi chung một transcript không?"
    ],
    facts: [
      "Resume mở lại đúng phiên cũ và ghi lượt mới vào chính transcript đó. Resume cùng một phiên ở hai nơi mà không fork thì message của cả hai xen kẽ vào một transcript.",
      "Fork (Agent SDK: <code>fork_session</code>, đặt cùng <code>resume</code>) tạo phiên mới bắt đầu từ bản sao lịch sử phiên gốc. Fork có ID riêng, phiên gốc giữ nguyên, và mỗi nhánh resume riêng về sau được.",
      "Tóm tắt viết tay là bản rút gọn: con số, nguồn, lập luận giữa chừng dễ rơi mất.",
      "Context không quên theo yêu cầu: lời dặn “bỏ đi phần trước” không xóa được lượt cũ khỏi lịch sử."
    ],
    opts: [
      { k: "A", gist: "Open two new sessions and paste a written summary of the finished analysis into each as the opening prompt.",
        why: [
          "Hai nhánh tách nhau thật, nhưng bản tóm tắt làm rơi chi tiết (ý 3). Hai cách tổng hợp không còn xuất phát từ trọn bản phân tích.",
          "Còn phải dựng gốc hai lần, trong khi fork mang nguyên lịch sử sang cả hai nhánh."
        ] },
      { k: "B", gist: "Run the first strategy in the original session, then tell the agent to discard it before running the second.",
        why: [
          "Lời dặn “discard” (bỏ đi) không xóa được gì (ý 4). Bản tổng hợp thứ nhất vẫn nằm trong transcript và ảnh hưởng bản thứ hai.",
          "Chạy lần lượt trong một phiên còn ghi thêm vào phiên phân tích gốc, mất luôn cái gốc sạch để so sánh."
        ] },
      { k: "C", gist: "Resume the analysis session ID in two concurrent runs, giving each run a different synthesis instruction.",
        why: [
          "Thiếu fork: cả hai lần chạy cùng ghi vào một transcript, message xen kẽ nhau (ý 1). Cách tổng hợp này thấy lượt của cách kia.",
          "Phiên phân tích gốc cũng bị ghi thêm lượt của cả hai thí nghiệm, không còn là gốc sạch.",
          "Dễ bị cuốn vì “concurrent” (chạy cùng lúc) nghe như hai nhánh song song. Nhưng chạy cùng lúc không phải là tách nhánh. Chỉ fork mới tạo phiên mới."
        ] },
      { k: "D", gist: "Resume the analysis session twice with <code>fork_session</code> enabled, running each synthesis strategy in its own fork.",
        why: [
          "Mỗi lần resume kèm <code>fork_session</code> tạo một phiên mới mang trọn bản phân tích (ý 2). Làm hai lần là có hai nhánh cùng gốc, không phải phân tích lại.",
          "Hai nhánh có ID riêng, lượt của nhánh này không lọt sang nhánh kia. Cách tổng hợp nào thắng thì resume tiếp đúng nhánh đó."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Ba cách nối lại công việc”: resume, fork, phiên mới kèm tóm tắt", href: NOTES + "#l-1-7" },
      { label: "Cheatsheet D1: dòng “So sánh hai hướng từ cùng một bản phân tích” → fork_session", href: NOTES + "#cheat-d1" },
      { label: "Docs Manage sessions, mục Branch a session: resume cùng một phiên ở hai terminal mà không fork thì message xen kẽ vào một transcript", href: "https://code.claude.com/docs/en/sessions" }
    ]
  },
  {
    de: 4, n: 59, total: 60, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool", scen: "S3",
    answer: "D",
    ask: "The <code>load_document</code> tool used by the document analysis subagent returns “Document could not be loaded” for every kind of failure. Logs show the subagent retrying paywalled documents again and again, yet abandoning documents that hit a single timeout. Which change to the tool's response best corrects this?",
    scene: [
      "Tool <code>load_document</code> của document analysis subagent trả đúng một câu cho mọi sự cố: “Document could not be loaded” (không tải được tài liệu).",
      "Log cho thấy subagent làm ngược cả hai chiều: tài liệu bị paywall (phải trả phí mới đọc được) thì thử lại mãi, tài liệu chỉ timeout một lần thì bỏ luôn.",
      "Chỗ khó: một câu báo lỗi cho hai chuyện khác hẳn nhau. Ví dụ minh họa:<pre><code>paywall        → \"Document could not be loaded\"\ntimeout 1 lần  → \"Document could not be loaded\"</code></pre>Subagent chỉ thấy chữ, không biết lần này thử lại có ích hay không."
    ],
    asks: [
      "Đổi phản hồi của tool thế nào để sửa chuyện này?",
      "Tức là: tool phải cho subagent biết lỗi thuộc loại nào, và thử lại có ích không.",
      "Soi từng phương án: sau khi đổi, subagent có thêm thông tin để phân biệt hai ca không, hay chỉ đổi số lần thử?"
    ],
    facts: [
      "Tool MCP báo thất bại bằng cờ <code>isError: true</code> trong kết quả tool. Nhưng cờ đó chỉ nói “hỏng”, không nói hỏng kiểu gì.",
      "Lỗi có cấu trúc theo guide có ba thứ tối thiểu: <code>errorCategory</code> (loại lỗi), <code>isRetryable</code> (gửi lại y nguyên có khả năng thành công không), và một câu mô tả dễ hiểu.",
      "Bốn loại lỗi, mỗi loại một cách xử: transient (tạm thời, vd timeout) thì retry có backoff; validation (input sai) thì sửa input; business (vi phạm luật nghiệp vụ) thì giải thích; permission (không có quyền) thì escalate, không retry.",
      "Subagent tự xử lỗi transient tại chỗ (retry 1–2 lần). Lỗi nó không tự giải quyết được mới đẩy lên coordinator, và báo cáo cuối ghi rõ mảng nào thiếu nguồn, thiếu vì sao."
    ],
    opts: [
      { k: "A", gist: "Raise the subagent's maximum turn budget so repeated load attempts have room to finish before it gives up.",
        why: [
          "Chỉ trả thêm tiền cho việc thử lại vô ích: paywall thử bao nhiêu lượt cũng không ra nội dung.",
          "Chiều ngược lại vẫn hỏng: subagent vẫn không biết timeout là lỗi thử lại được (ý 3), nên vẫn có thể bỏ sau một lần."
        ] },
      { k: "B", gist: "Add a system prompt rule telling the subagent to retry every failed load exactly once before moving on.",
        why: [
          "Một luật cứng cho mọi lỗi: paywall vẫn bị thử thêm một lần vô ích, còn timeout cần thử nhiều hơn một lần thì vẫn có thể bị bỏ.",
          "Subagent vẫn không phân biệt được hai ca, vì kết quả tool vẫn chỉ có một câu chung (ý 1).",
          "Dễ bị cuốn vì nó giảm được kiểu phí công tệ nhất. Nhưng nó đặt luật theo số lần, không theo loại lỗi (ý 3)."
        ] },
      { k: "C", gist: "Have the coordinator intercept load failures and retry them centrally before the subagent sees any result.",
        why: [
          "Dời chỗ retry không thêm được thông tin nào về lý do lỗi. Coordinator gặp đúng câu “could not be loaded” và phải đoán như subagent (ý 1).",
          "Còn trái thứ tự xử lỗi (ý 4): lỗi transient nên để subagent tự xử tại chỗ. Lỗi paywall bị nuốt ở tầng giữa thì báo cáo cuối không ghi được tài liệu nào thiếu."
        ] },
      { k: "D", gist: "Return <code>isError: true</code> together with an error category, a retryable flag, and a readable message.",
        why: [
          "Đúng lỗi có cấu trúc (ý 2): paywall là permission, không retry được; timeout là transient, retry được (ý 3).",
          "Subagent đọc là biết: ngừng thử tài liệu paywall và báo lên như một chỗ thiếu nguồn, còn timeout thì thử lại. Lượt thử chỉ tiêu vào chỗ có thể thành công."
        ] }
    ],
    refs: [
      { label: "Bài 2.2: errorCategory, isRetryable, bảng bốn loại lỗi và cách xử từng loại", href: NOTES + "#l-2-2" },
      { label: "Bài 5.3: subagent tự xử lỗi transient, chỉ đẩy lên lỗi không tự giải quyết được; coverage annotation", href: NOTES + "#l-5-3" }
    ]
  },
  {
    de: 4, n: 60, total: 60, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool", scen: "S3",
    answer: "B",
    ask: "The document analysis subagent's <code>load_document</code> tool fails when the requested file sits in a repository its service account cannot read. The tool currently labels this a transient error, so the subagent retries repeatedly before giving up. How should the tool report this failure instead?",
    scene: [
      "Tool <code>load_document</code> lỗi khi file nằm trong một repo mà service account (tài khoản tool dùng để truy cập) không có quyền đọc.",
      "Tool đang gắn nhãn lỗi này là transient (tạm thời). Subagent tin nhãn, thử lại nhiều lần rồi mới bỏ.",
      "Chỗ khó: tool đã báo lỗi có cấu trúc, chỉ là gắn sai loại. File có thật, đường dẫn đúng, chỉ thiếu quyền. Thử lại bao nhiêu lần cũng ra cùng một kết quả cho tới khi có người cấp quyền."
    ],
    asks: [
      "Tool nên báo lỗi này thế nào?",
      "Tức là: chọn đúng loại lỗi để subagent làm đúng việc tiếp theo.",
      "Soi từng phương án: nhãn đó dẫn subagent tới hành động nào (thử lại, sửa input, đi tiếp, hay báo lên), và hành động đó có hợp với lỗi thiếu quyền không?"
    ],
    facts: [
      "Bốn loại lỗi, mỗi loại một cách xử: transient (timeout, 503) thì retry có backoff; validation (input sai) thì sửa input rồi gọi lại; business (vi phạm luật nghiệp vụ) thì giải thích, không retry; permission (không có quyền) thì escalate, không retry.",
      "Tool MCP báo thất bại bằng <code>isError: true</code> trong kết quả tool, kèm các trường có cấu trúc như <code>errorCategory</code>, <code>isRetryable</code> và câu mô tả.",
      "Lỗi subagent không tự giải quyết được thì đẩy lên coordinator, kèm loại lỗi và những gì đã thử. Coordinator quyết đi vòng hay chuyển người, và báo cáo ghi rõ chỗ thiếu.",
      "Trả lỗi thành kết quả thành công rỗng là nuốt lỗi (empty-as-success): báo cáo thiếu mà trông như đủ."
    ],
    opts: [
      { k: "A", gist: "Keep the <code>errorCategory</code> as transient, but raise the retry limit and add exponential backoff between attempts.",
        why: [
          "Retry có backoff là cách xử của lỗi transient (ý 1). Thiếu quyền không phải lỗi tạm thời: kết quả không đổi cho tới khi có người cấp quyền.",
          "Chỉnh retry chỉ làm subagent mất thêm thời gian cho một lần gọi chắc chắn thất bại.",
          "Dễ bị cuốn vì backoff là kỹ thuật đúng, nghe chuyên nghiệp. Nhưng đúng kỹ thuật cho sai loại lỗi."
        ] },
      { k: "B", gist: "Return an <code>isError: true</code> result whose metadata marks a non-retryable permission failure for the subagent to escalate.",
        why: [
          "Đúng loại: thiếu quyền là permission, không retry, cách xử là báo lên (ý 1). Cờ <code>isError</code> kèm trường có cấu trúc (ý 2).",
          "Subagent ngừng thử ngay, đẩy lỗi lên coordinator kèm loại lỗi (ý 3). Coordinator quyết đi vòng hay nhờ người cấp quyền, và báo cáo ghi rõ tài liệu này chưa được phân tích."
        ] },
      { k: "C", gist: "Return an <code>isError: true</code> result whose metadata labels it a validation failure, with a hint to fix the identifier.",
        why: [
          "Sai loại: validation nghĩa là input sai, sửa input là được (ý 1). Ở đây định danh đúng, file có thật, chỉ thiếu quyền.",
          "Subagent sẽ đi sửa một định danh vốn đúng, tốn lượt mà lần nào cũng bị từ chối."
        ] },
      { k: "D", gist: "Return a successful result with empty content so the subagent continues without the document.",
        why: [
          "Nuốt lỗi (ý 4): coordinator tưởng tài liệu đã được phân tích và không có gì đáng nói.",
          "Lỗi thiếu quyền biến thành thông tin sai trong báo cáo, và không còn ai biết để báo lên xin quyền."
        ] }
    ],
    refs: [
      { label: "Bài 2.2, bảng bốn loại lỗi: permission thì escalate, không retry", href: NOTES + "#l-2-2" },
      { label: "Bài 5.3: nuốt lỗi (empty-as-success) là cách làm tệ; đẩy lỗi lên kèm context có cấu trúc", href: NOTES + "#l-5-3" },
      { label: "Cheatsheet D2: subagent tự xử lỗi transient, lỗi không tự giải quyết được thì đẩy lên", href: NOTES + "#cheat-d2" }
    ]
  }
);
