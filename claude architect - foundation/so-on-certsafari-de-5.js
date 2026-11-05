// Sổ ôn certsafari, Đề 5. Trang so-on-certsafari.html nạp file này trước script render.
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
DE[5] = "Udemy · Practice Test 2 · 60 câu · 04/11/2026";
ENTRIES.push(
  {
    de: 5, n: 1, total: 60, sub: "4.2", subName: "Few-shot cho output ổn định", scen: "S2",
    answer: "B",
    ask: "The team's <code>/pr-summary</code> command already tells Claude to show benchmark numbers as a table, the design rationale as prose, and follow-up tasks as a checklist. Across runs, Claude still often turns the table into bullets and the rationale into a list. What is the most effective fix?",
    scene: [
      "Lệnh <code>/pr-summary</code> của team đã dặn rõ từng phần: số benchmark (số đo hiệu năng) thành bảng, lý do thiết kế thành văn xuôi, việc cần làm tiếp thành checklist (danh sách có ô đánh dấu).",
      "Vậy mà qua nhiều lần chạy, Claude vẫn hay biến bảng thành gạch đầu dòng, biến đoạn lý do thành danh sách.",
      "Chỗ khó: chỉ dẫn đã có và đã đúng. Vấn đề là Claude làm theo lúc được lúc không, chứ không phải thiếu chỉ dẫn."
    ],
    asks: [
      "Cách sửa hiệu quả nhất là gì?",
      "Tức là: chỉ dẫn bằng lời đã đủ mà output vẫn lệch, thì phải đưa cho Claude thứ gì khác lời dặn.",
      "Soi từng phương án: nó cho Claude thấy hình dạng output mong muốn, hay chỉ nói to hơn, ép sang dạng khác, hoặc bỏ luôn yêu cầu trình bày theo từng phần?"
    ],
    facts: [
      "Few-shot: đặt vài ví dụ mẫu vào prompt để Claude bắt chước. Guide: khi chỉ dẫn chi tiết vẫn cho kết quả không nhất quán, few-shot là kỹ thuật hiệu quả nhất, vì model bắt chước hình dạng rất tốt. Bọc ví dụ trong thẻ <code>&lt;example&gt;</code> để Claude biết đâu là ví dụ, đâu là chỉ dẫn.",
      "Viết IMPORTANT hay in hoa chỉ làm câu đó nổi hơn các câu xung quanh. Nó không thêm thông tin gì về output phải trông ra sao.",
      "<code>--json-schema</code> (đi với <code>claude -p</code>) ép output thành JSON đúng cấu trúc khai sẵn, để script đọc. Nó dành cho output máy đọc, không phải bản tóm tắt người đọc.",
      "Guide 5.6: render theo loại nội dung. Số liệu để so thì thành bảng, lập luận thành văn xuôi, các mục rời thành danh sách. Ép tất cả về một format làm mất thông tin và khó đọc."
    ],
    opts: [
      { k: "A", gist: "Label the formatting instructions “IMPORTANT” and repeat them at the end of the command prompt.",
        why: [
          "Sai ở chỗ chữa: chỉ dẫn đã có, nói to hơn không thêm thông tin nào về bảng hay đoạn văn phải trông thế nào (ý 2).",
          "Claude vẫn phải tự hiểu lời mô tả như trước, nên vẫn lúc ra bảng lúc ra gạch đầu dòng.",
          "Dễ bị cuốn vì nghe như sửa đúng bệnh “Claude không chịu theo”. Nhưng gốc lỗi là lời dặn còn chỗ để Claude tự suy diễn, và nhắc lại lần hai không bớt được chỗ đó."
        ] },
      { k: "B", gist: "Put a sample summary in the command file that shows every section rendered in its intended format.",
        why: [
          "Đúng bước sau mô tả: chỉ dẫn đã đủ mà output vẫn lệch thì cho ví dụ (ý 1).",
          "Bản mẫu có đủ bảng benchmark, đoạn văn lý do, checklist việc tiếp theo, đúng hình một bản tóm tắt thật. Claude bắt chước hình dạng đó, không còn phải tự hiểu lời dặn.",
          "Mỗi phần vẫn giữ format hợp với loại nội dung của nó (ý 4). Bọc mẫu trong <code>&lt;example&gt;</code> để Claude không lẫn mẫu với chỉ dẫn."
        ] },
      { k: "C", gist: "Run the command through <code>claude -p</code> with <code>--json-schema</code> so every summary is validated against one structure.",
        why: [
          "Sai công cụ: <code>--json-schema</code> cho output JSON để script đọc (ý 3). Bản tóm tắt PR là thứ người đọc.",
          "Ép thành JSON thì bảng và đoạn văn thành chuỗi nằm trong các trường. Mất đúng cách trình bày theo từng phần mà team muốn giữ.",
          "Dễ bị cuốn vì “validated” (được kiểm) nghe như bảo đảm chắc chắn. Nhưng schema chỉ bảo đảm cấu trúc JSON, không bảo đảm người đọc thấy một cái bảng."
        ] },
      { k: "D", gist: "Format all three sections as markdown tables so the layout no longer varies between runs.",
        why: [
          "Ổn định thật, nhưng phạm đúng điều guide 5.6 tránh: ép mọi loại nội dung về một format (ý 4).",
          "Lý do thiết kế là chuỗi lập luận, bẻ vào ô bảng thì khó đọc. Việc cần làm tiếp mất dạng checklist. Lệnh sinh ra để dễ đọc, giờ lại khó đọc hơn."
        ] }
    ],
    refs: [
      { label: "Bài 4.2, mục “Chuyện gì đang xảy ra”: chỉ dẫn chi tiết vẫn lệch thì few-shot là kỹ thuật hiệu quả nhất; mục “Bốn chỗ few-shot phát huy”: format output", href: NOTES + "#l-4-2" },
      { label: "Bài 5.6, mục “Ngày tháng và cách trình bày”: render theo loại nội dung, đừng ép tất cả về một format", href: NOTES + "#l-5-6" },
      { label: "Bài 3.6: --output-format json và --json-schema là để máy đọc output", href: NOTES + "#l-3-6" }
    ]
  },
  {
    de: 5, n: 2, total: 60, sub: "5.5", subName: "Review người và hiệu chuẩn confidence", scen: "S2",
    answer: "D",
    ask: "This team ran Claude Code over 900 legacy modules to pull each module's owner, SLA tier and data classification out of inconsistent header comments into a structured service catalog. Reviewers can check only about 150 entries by hand. How should the team decide which entries get human review?",
    scene: [
      "Team cho Claude Code chạy qua 900 module cũ. Mỗi module lấy ra ba trường từ comment đầu file: owner (người phụ trách), SLA tier (mức cam kết dịch vụ), data classification (mức phân loại dữ liệu). Kết quả gom thành một service catalog (danh mục dịch vụ) có cấu trúc.",
      "Comment đầu file viết không thống nhất, có module còn ghi mâu thuẫn.",
      "Chỗ khó: người review chỉ kiểm tay được khoảng 150 mục, tức một phần sáu. Không kiểm hết được, nên phải chọn kiểm chỗ nào."
    ],
    asks: [
      "Team nên quyết định mục nào được người review thế nào?",
      "Tức là: dồn 150 lượt kiểm vào đúng chỗ dễ sai nhất, thay vì rải đều hay bỏ hẳn.",
      "Soi từng phương án: nó có cho ra tín hiệu chỉ chỗ dễ sai không, và có bỏ người ra khỏi chỗ đang cần người không?"
    ],
    facts: [
      "Field-level confidence: model xuất điểm tự tin cho từng trường trích xuất. Điểm tự báo chưa hiệu chuẩn thì 0.9 không có nghĩa là đúng 90%. Phải đối chiếu với labeled validation set (bộ mẫu đã có đáp án do người gán) để chọn ngưỡng.",
      "Guide 5.5: đẩy sang người các trường điểm thấp, và các tài liệu nguồn mơ hồ hoặc mâu thuẫn.",
      "Aggregate accuracy (tỉ lệ đúng tính trên toàn bộ) có thể che một nhóm sai rất nhiều: 97% chung vẫn có thể gồm 40% ở một loại tài liệu hay một trường. Phải đo theo từng loại và từng trường trước khi tự động hóa.",
      "Lấy mẫu ngẫu nhiên (tốt nhất là phân tầng, stratified) dùng để đo tỉ lệ lỗi của phần đi thẳng và bắt kiểu lỗi mới. Nó đi kèm việc định tuyến, không thay được việc định tuyến."
    ],
    opts: [
      { k: "A", gist: "Measure overall accuracy on a 100-module pilot and auto-accept every entry if the pilot scores above 97 percent.",
        why: [
          "Sai ở thước đo: một con số chung che nhóm kém (ý 3). 97% vẫn có thể đi cùng tỉ lệ sai cao ở trường data classification, hay ở một kiểu header lạ.",
          "Qua ngưỡng là bỏ người ở cả 900 mục, kể cả các module có header mâu thuẫn, đúng chỗ cần người nhất (ý 2).",
          "Dễ bị cuốn vì có pilot, có số đo, nghe rất bài bản. Nhưng đo tổng thì không biết sai nằm ở đâu, và đề hỏi chọn mục nào để review, không hỏi có nên bỏ review không."
        ] },
      { k: "B", gist: "Review a uniformly random 150 entries and auto-accept the rest, since a random sample fairly represents the whole catalog.",
        why: [
          "Ngẫu nhiên là cách đo, không phải cách chọn chỗ dễ sai (ý 4). Phần lớn 150 lượt kiểm rơi vào mục vốn đã đúng.",
          "Các mục mơ hồ, mâu thuẫn mà không trúng mẫu thì đi thẳng vào catalog, không ai xem (ý 2)."
        ] },
      { k: "C", gist: "Tighten the extraction prompt so Claude settles contradictory headers on its own, then auto-accept every result.",
        why: [
          "Sai ở giả định: header mâu thuẫn là nguồn tự mâu thuẫn. Prompt mạnh hơn không tạo ra được thông tin không có, Claude chỉ còn cách đoán.",
          "Rồi nhận hết, tức bỏ người ra khỏi đúng các ca guide bảo phải đẩy sang người (ý 2). Đoán sai mức phân loại dữ liệu là lọt luôn vào catalog."
        ] },
      { k: "D", gist: "Score confidence for each extracted field, calibrate thresholds on a labeled sample, and route low-confidence or contradictory entries to reviewers.",
        why: [
          "Có tín hiệu cho từng trường (ý 1): trường nào model không chắc thì biết ngay, không phải chọn mò.",
          "Ngưỡng được hiệu chuẩn trên mẫu có nhãn, nên “điểm thấp” thật sự đi cùng tỉ lệ sai cao, và chỉnh được cho vừa 150 lượt kiểm (ý 1).",
          "Module có header mâu thuẫn cũng đẩy sang người (ý 2). 150 lượt dồn vào chỗ review đổi được kết quả. Phần đi thẳng vẫn nên lấy mẫu định kỳ để bắt lỗi mới (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 5.5, khung “Tốt”: field-level confidence, hiệu chuẩn ngưỡng bằng labeled set, đẩy ca điểm thấp và nguồn mâu thuẫn cho người, lấy mẫu phân tầng phần tự động", href: NOTES + "#l-5-5" },
      { label: "Cheatsheet D5: dòng “97% accuracy tổng” và dòng “Model xuất confidence, muốn đặt ngưỡng route”", href: NOTES + "#cheat-d5" },
      { label: "Bài Nền tảng D5, mục 4: hiệu chuẩn confidence trên labeled validation set", href: NOTES + "#l-5-0" }
    ]
  },
  {
    de: 5, n: 3, total: 60, sub: "3.1", subName: "Cấp của CLAUDE.md và chia sẻ cho team", scen: "S2",
    answer: "C",
    ask: "A developer on this team put the shared API conventions in <code>CLAUDE.local.md</code> at the repository root. Claude follows them in that developer's sessions, but teammates who pull the repository say Claude ignores them. What is the correct fix?",
    scene: [
      "Một dev viết quy ước API chung của team vào <code>CLAUDE.local.md</code> ở gốc repo.",
      "Trên máy dev đó, Claude theo quy ước rất ngoan. Đồng đội pull repo về thì Claude lờ đi.",
      "Chỗ khó: <code>CLAUDE.local.md</code> nằm ngay cạnh <code>CLAUDE.md</code>, trông như một file của project. Nhưng chạy đúng trên máy người viết, hỏng trên máy người khác là dấu hiệu đặt sai cấp."
    ],
    asks: [
      "Sửa thế nào cho đúng?",
      "Tức là: quy ước chung phải nằm ở file nào để ai pull repo cũng nhận được.",
      "Soi từng phương án: nội dung có đi theo git tới máy đồng đội không, và có được nạp như chỉ dẫn cho Claude không?"
    ],
    facts: [
      "Ba cấp CLAUDE.md của guide: <code>~/.claude/CLAUDE.md</code> (user: chỉ mình bạn, mọi project, không đi theo git), <code>./CLAUDE.md</code> hoặc <code>./.claude/CLAUDE.md</code> (project: commit, ai clone cũng có), và CLAUDE.md trong thư mục con.",
      "<code>CLAUDE.local.md</code> là file riêng của một người cho một project. Docs dặn thêm nó vào <code>.gitignore</code> để không bị commit. Máy nào có file thì máy đó mới nạp.",
      "<code>@path</code> trong CLAUDE.md kéo nội dung một file khác vào context. File đó phải có trên máy đang chạy Claude Code thì mới có gì để kéo.",
      "<code>.claude/settings.json</code> chứa cấu hình cho chương trình: quyền tool, hook, biến môi trường. Chỉ dẫn viết bằng lời đặt ở đây không được nạp như CLAUDE.md."
    ],
    opts: [
      { k: "A", gist: "Move the conventions into <code>.claude/settings.json</code> as a committed project setting that applies to every teammate.",
        why: [
          "Đúng nửa đầu: <code>settings.json</code> được commit, cả team có.",
          "Nhưng đây là chỗ của cấu hình, không phải chỉ dẫn (ý 4). Quy ước API viết vào đây không vào context, nên Claude trên máy đồng đội vẫn không biết.",
          "Dễ bị cuốn vì “committed project setting” (cấu hình project đã commit) nghe đúng cái đang thiếu. Nhưng đi theo git thôi chưa đủ, file còn phải là loại Claude đọc như chỉ dẫn."
        ] },
      { k: "B", gist: "Have each teammate paste the conventions into their own user-level <code>~/.claude/CLAUDE.md</code>.",
        why: [
          "Lặp lại đúng lỗi cũ ở cấp khác: file cấp user cũng là của riêng từng người, không đi theo git (ý 1).",
          "Quy ước đổi một lần là phải nhắn cả team chép lại. Người mới vào không có gì, các máy lệch nhau dần."
        ] },
      { k: "C", gist: "Move the conventions into the committed root <code>CLAUDE.md</code> so every teammate who pulls receives them.",
        why: [
          "Đúng cấp: <code>./CLAUDE.md</code> là file project, được commit, ai clone hay pull cũng có, và nạp lúc mở phiên (ý 1).",
          "Quy ước nằm một chỗ trong git. Sửa một lần, cả team nhận qua lần pull tiếp theo.",
          "Đồng đội mở phiên mới rồi gõ <code>/memory</code> là thấy file này trong danh sách file đang nạp."
        ] },
      { k: "D", gist: "Import <code>CLAUDE.local.md</code> from the root <code>CLAUDE.md</code> with an <code>@</code> path so the committed file pulls it in.",
        why: [
          "Dòng import thì được commit, nhưng file nó trỏ tới thì không. <code>CLAUDE.local.md</code> vẫn là file riêng, không có trên máy đồng đội (ý 2, ý 3).",
          "Trên máy đồng đội, import không kéo được gì. Quy ước vẫn chỉ sống trên máy người viết.",
          "Dễ bị cuốn vì <code>@path</code> là cách thật để ghép file vào CLAUDE.md. Nhưng import chỉ ghép được file có sẵn trên máy, nó không chở file đi theo git."
        ] }
    ],
    refs: [
      { label: "Bài 3.1: ba cấp CLAUDE.md, ai thấy cấp nào; khung “Tốt”: chuyển quy ước sang ./CLAUDE.md và commit", href: NOTES + "#l-3-1" },
      { label: "Bài 3.0, mục 3 “Phạm vi: file nằm ở đâu thì ai thấy”: bảng có dòng Local ./CLAUDE.local.md (chỉ bạn, project này)", href: NOTES + "#l-3-0" },
      { label: "Docs “How Claude remembers your project”: CLAUDE.local.md cho ghi chú riêng từng project, thêm vào .gitignore để không commit", href: "https://code.claude.com/docs/en/memory" }
    ]
  },
  {
    de: 5, n: 4, total: 60, sub: "3.3", subName: "Rule theo đường dẫn trong .claude/rules", scen: "S2",
    answer: "D",
    ask: "Test files sit next to the code they test across many subdirectories, and the team wants testing conventions loaded only when a test file is touched. The rule in <code>.claude/rules/testing.md</code> sets <code>paths</code> to <code>*.test.tsx</code>, yet nothing loads when Claude edits <code>src/components/Button.test.tsx</code>. What should change?",
    scene: [
      "File test nằm cạnh code nó test, rải ở nhiều thư mục con.",
      "Team muốn quy ước test chỉ nạp khi Claude đụng tới file test. Rule <code>.claude/rules/testing.md</code> đặt <code>paths</code> là <code>*.test.tsx</code>.",
      "Đề kể: Claude sửa <code>src/components/Button.test.tsx</code> mà rule không nạp.",
      "Chỗ khó: phải giữ hai thứ cùng lúc. Rule với tới file test ở mọi cấp thư mục, mà vẫn chỉ nạp khi đụng file test."
    ],
    asks: [
      "Nên đổi gì?",
      "Tức là: viết mẫu glob nào để chắc chắn khớp file test ở bất kỳ thư mục nào, mà rule vẫn là rule có điều kiện.",
      "Soi từng phương án: sau khi đổi, rule có nạp khi sửa <code>Button.test.tsx</code> không, có còn chỉ nạp khi đụng file test không, và có phải chép quy ước ra nhiều chỗ không?"
    ],
    facts: [
      "Rule có <code>paths</code> chỉ nạp khi Claude đọc, ghi hoặc sửa một file khớp glob. Bỏ <code>paths</code> thì rule nạp ở mọi phiên, y như CLAUDE.md.",
      "Glob: <code>**</code> khớp qua mọi cấp thư mục. <code>**/*.test.tsx</code> khớp mọi file <code>.test.tsx</code> ở bất kỳ thư mục nào. Đây là dạng notes và docs dùng làm ví dụ.",
      "CLAUDE.md thư mục con bị buộc vào một thư mục. Quy ước đi theo loại file, rải nhiều thư mục, thì rule có <code>paths</code> mới là chỗ đúng.",
      "Skill là quy trình gọi theo việc: nội dung đầy đủ chỉ nạp khi skill được gọi. Phương án C còn ghi rõ dev tự gọi trước khi sửa test, tức quy ước có mặt hay không là tùy người nhớ."
    ],
    opts: [
      { k: "A", gist: "Delete the <code>paths</code> frontmatter so the testing conventions load unconditionally in every session.",
        why: [
          "Rule nạp được thật, vì không có <code>paths</code> thì nạp ở mọi phiên (ý 1).",
          "Nhưng mất đúng thứ team đòi: chỉ nạp khi đụng file test. Sửa CSS, sửa API cũng phải gánh quy ước test.",
          "Dễ bị cuốn vì nó làm triệu chứng “không nạp” biến mất ngay. Nhưng gốc lỗi nằm ở mẫu glob, sửa mẫu thì giữ được điều kiện."
        ] },
      { k: "B", gist: "Put a directory-level <code>CLAUDE.md</code> with the testing conventions in every folder that contains tests.",
        why: [
          "Sai công cụ: CLAUDE.md thư mục con buộc vào thư mục (ý 3). Test rải nhiều thư mục thì phải chép ra nhiều bản.",
          "Sửa quy ước là sửa từng bản. Thư mục test tạo sau thì dễ quên thêm file."
        ] },
      { k: "C", gist: "Turn the testing conventions into a skill under <code>.claude/skills/</code> that developers invoke before editing tests.",
        why: [
          "Sai cơ chế: theo cách C viết, quy ước chỉ có mặt khi dev gọi skill (ý 4). Dev quên gọi là Claude sửa test mà không có quy ước.",
          "Đề muốn quy ước tự nạp mỗi khi đụng file test, không phụ thuộc ai nhớ. Rule có <code>paths</code> làm đúng việc đó, và là chỗ guide chỉ cho quy ước đi theo loại file (ý 1)."
        ] },
      { k: "D", gist: "Change the pattern to <code>**/*.test.tsx</code> so the rule matches test files in any directory.",
        why: [
          "<code>**/</code> cho mẫu đi qua mọi cấp thư mục, nên khớp <code>src/components/Button.test.tsx</code> và mọi file test khác dù nằm sâu tới đâu (ý 2).",
          "Rule vẫn có <code>paths</code>, nên vẫn chỉ nạp khi Claude đọc hay sửa file test (ý 1). Quy ước nằm một file, không phải chép.",
          "Muốn phủ thêm file <code>.test.ts</code> thì thêm mẫu thứ hai, hoặc viết <code>**/*.test.{ts,tsx}</code>."
        ] }
    ],
    dispute: "Đề gốc chấm D, sổ giữ D vì ba phương án kia đều gãy ở yêu cầu khác. Nhưng tiền đề của đề lệch với docs hiện tại. Bảng glob trong docs Memory ghi <code>*.md</code> khớp file .md ở mọi cấp dưới thư mục gốc. Chỉ <code>/*.md</code> mới giới hạn ở gốc, còn <code>src/components/*.tsx</code> chỉ khớp file nằm ngay trong <code>src/components/</code>. Theo docs đó, <code>*.test.tsx</code> (không có dấu <code>/</code>) lẽ ra đã khớp <code>src/components/Button.test.tsx</code>. Đi thi cứ chọn <code>**/*.test.tsx</code>: dạng này khớp ở mọi cấp theo cả hai cách hiểu.",
    refs: [
      { label: "Bài 3.3: rule có paths, ví dụ testing.md với **/*.test.tsx; khung định nghĩa “Glob”", href: NOTES + "#l-3-3" },
      { label: "Cheatsheet D3: dòng “Quy ước cho file rải khắp repo (test cạnh source)” → .claude/rules/ + paths glob", href: NOTES + "#cheat-d3" },
      { label: "Docs “How Claude remembers your project”, mục Path-specific rules: bảng mẫu glob (**/*.ts, *.md, /*.md, src/components/*.tsx)", href: "https://code.claude.com/docs/en/memory" }
    ]
  },
  {
    de: 5, n: 5, total: 60, sub: "3.5", subName: "Tinh chỉnh lặp: ví dụ input/output, test trước, interview", scen: "S2",
    answer: "D",
    ask: "A developer had Claude Code generate a database migration script. It handles ordinary rows but keeps failing on null values. The developer has already described the problem in words twice, and the script still fails. What should the developer provide next?",
    scene: [
      "Claude Code viết script migration database (chuyển dữ liệu sang cấu trúc mới). Dòng dữ liệu bình thường thì chạy ổn, gặp giá trị null thì hỏng.",
      "Dev đã tả vấn đề bằng lời hai lần. Script vẫn hỏng.",
      "Chỗ khó: “null” nghe rõ mà thật ra mơ hồ. Ví dụ minh họa:<pre><code>{\"id\": 1, \"phone\": null}   → ?\n{\"id\": 2, \"phone\": \"\"}     → ?\n{\"id\": 3}                   → ?</code></pre>Lời tả “xử lý null cho đúng” không trả lời được ba dấu hỏi này."
    ],
    asks: [
      "Dev nên đưa gì tiếp cho Claude?",
      "Tức là: tả bằng lời hai lần không ăn thua, thì phải cho Claude thứ gì để nó biết chính xác mỗi ca null phải ra sao.",
      "Soi từng phương án: nó có nói rõ kết quả mong đợi cho từng ca null không, hay chỉ nói to hơn, lập kế hoạch, hoặc đổ thêm dữ liệu?"
    ],
    facts: [
      "Mô tả bằng văn xuôi có nhiều cách hiểu, viết càng dài càng nhiều cách hiểu. Bài 3.5: bị hiểu mỗi lần một kiểu thì dùng ví dụ input → output, 2–3 cặp cụ thể.",
      "Bảng của bài 3.5 có đúng ca này: edge case (trường hợp biên) cụ thể bị hỏng, như null trong migration, thì đưa đúng dòng dữ liệu gây lỗi kèm kết quả mong đợi, không mô tả chung chung.",
      "Viết “RẤT QUAN TRỌNG” hay in hoa chỉ nhấn mạnh, không thêm thông tin. Plan mode hợp với thay đổi lớn, nhiều file, nhiều cách làm phải chọn.",
      "Dán cả khối dữ liệu lớn vào hội thoại làm đầy context bằng dòng không liên quan. Context càng đầy, chi tiết quan trọng càng dễ bị bỏ sót."
    ],
    opts: [
      { k: "A", gist: "Restate the null-handling requirement with stronger emphasis markers so Claude treats it as the top priority.",
        why: [
          "Sai ở chỗ chữa: hai lần trước hỏng vì lời tả mơ hồ, không phải vì Claude coi nhẹ (ý 1). Nói to hơn không thêm thông tin nào về từng ca null (ý 3).",
          "Lần ba vẫn là lời tả cũ, chỉ thêm chữ in hoa. Đây đúng cột “Tệ” của bài 3.5.",
          "Dễ bị cuốn vì “keeps failing on null” (cứ hỏng ở null) nghe như Claude không chịu chú ý. Nhưng Claude có chú ý, nó chỉ không biết chính xác phải làm gì."
        ] },
      { k: "B", gist: "Switch to plan mode so Claude rereads the whole migration script and proposes an approach before editing it again.",
        why: [
          "Sai công cụ: plan mode cho việc lớn, nhiều cách làm (ý 3). Đây là một script, lỗi đã khoanh vùng ở ca null.",
          "Lập kế hoạch kỹ đến mấy, Claude vẫn không biết dòng null phải ra kết quả gì. Thứ thiếu là đặc tả, không phải kế hoạch."
        ] },
      { k: "C", gist: "Paste the full production data export into the conversation so Claude can discover every null variant on its own.",
        why: [
          "Đổ cả khối dữ liệu vào làm đầy context bằng hàng loạt dòng bình thường (ý 4).",
          "Claude thấy được các kiểu null, nhưng vẫn không biết mỗi kiểu phải chuyển thành gì. Vẫn phải đoán, chỉ là đoán trên nhiều dữ liệu hơn."
        ] },
      { k: "D", gist: "Give Claude a few sample rows with null, empty and missing values, each paired with the exact migrated output expected.",
        why: [
          "Đúng kỹ thuật bài 3.5 cho ca này (ý 2): đưa đúng dòng gây lỗi kèm kết quả mong đợi.",
          "Mỗi cặp chốt một kiểu null và kết quả của nó, không còn chỗ để hiểu khác (ý 1).",
          "Các cặp này còn dùng lại làm test: sửa xong chạy lại là biết đã đúng chưa."
        ] }
    ],
    refs: [
      { label: "Bài 3.5: bảng triệu chứng → kỹ thuật, dòng “Edge case cụ thể bị hỏng (null trong migration)”", href: NOTES + "#l-3-5" },
      { label: "Cheatsheet D3: dòng “Mô tả bằng lời bị hiểu lệch → 2–3 ví dụ input/output”", href: NOTES + "#cheat-d3" },
      { label: "Bài 3.4: khi nào cần plan mode, khi nào làm thẳng", href: NOTES + "#l-3-4" }
    ]
  },
  {
    de: 5, n: 6, total: 60, sub: "5.3", subName: "Báo lỗi giữa các agent", scen: "S2",
    answer: "D",
    ask: "A custom discovery subagent locates every call site of a deprecated helper before the main session deletes the helper. When its search errors out partway through the repository, the subagent reports zero call sites and the deletion goes ahead. Which change to the subagent's reporting prevents this?",
    scene: [
      "Một subagent tự tạo đi tìm mọi chỗ gọi (call site) một hàm helper đã lỗi thời. Phiên chính dựa vào kết quả đó để xóa hàm.",
      "Lần này search lỗi giữa chừng, chưa quét hết repo. Subagent vẫn báo “0 call site”, và phiên chính xóa hàm.",
      "Chỗ khó: “không tìm thấy” và “tìm không xong” là hai chuyện khác hẳn, nhưng báo về giống hệt nhau. Phiên chính không có cách nào phân biệt, lại đang làm một việc xóa khó rút lại."
    ],
    asks: [
      "Đổi cách báo cáo thế nào để chặn chuyện này?",
      "Tức là: subagent phải báo lỗi search khác hẳn với kết quả rỗng thật, để phiên chính không coi lỗi là bằng chứng “xóa được rồi”.",
      "Soi từng phương án: sau khi đổi, phiên chính có biết search đã lỗi và lỗi gì không?"
    ],
    facts: [
      "Access failure (không truy cập được, search không chạy xong): chưa biết có call site hay không. Valid empty result (kết quả rỗng hợp lệ): search chạy hết và thật sự không có gì khớp. Hai ca phải trả về khác nhau.",
      "Guide gọi việc báo lỗi thành kết quả rỗng là nuốt lỗi (empty-as-success): báo cáo thiếu mà trông như đủ. Cách đúng là structured error context: loại lỗi, query đã thử, kết quả một phần, hướng thay thế.",
      "Subagent tự retry lỗi transient (tạm thời) 1–2 lần. Không được thì đẩy lên kèm những gì đã thử, không thử mãi.",
      "Giao cho subagent để output dài của search ở lại trong context của nó, phiên chính chỉ nhận bản báo cáo. Confidence model tự chấm thì hiệu chuẩn kém, không thay được thông tin lỗi thật."
    ],
    opts: [
      { k: "A", gist: "Make the subagent keep retrying the failed search until it succeeds before it returns anything to the main session.",
        why: [
          "Sai ở chữ “until it succeeds” (tới khi thành công): guide cho retry 1–2 lần với lỗi tạm thời, rồi phải báo lên (ý 3).",
          "Lỗi không tạm thời, như một thư mục không đọc được, thì thử bao nhiêu lần cũng hỏng. Workflow treo, tốn token, phiên chính không biết chuyện gì đang xảy ra."
        ] },
      { k: "B", gist: "Make the subagent attach a self-rated confidence score describing how complete its empty result is.",
        why: [
          "Vẫn báo “0 call site”, chỉ thêm một con số tự chấm. Con số đó hiệu chuẩn kém (ý 4): search lỗi mà model vẫn có thể chấm cao.",
          "Phiên chính cần sự thật “search lỗi ở đâu, lỗi gì”, không cần một ước đoán chồng lên một kết quả sai.",
          "Dễ bị cuốn vì nghe như thêm thông tin cho phiên chính. Nhưng thông tin thật là lỗi, nó có sẵn, cứ báo thẳng ra thay vì quy thành một điểm số."
        ] },
      { k: "C", gist: "Make the main session rerun the full discovery itself whenever the subagent reports zero call sites.",
        why: [
          "Phá đúng lý do giao cho subagent: output search dài đổ ngược vào context phiên chính (ý 4).",
          "Gốc lỗi vẫn còn: báo cáo của subagent vẫn không phân biệt lỗi với rỗng (ý 1). Phiên chính phải chạy lại cả khi rỗng là thật."
        ] },
      { k: "D", gist: "Make the subagent return a distinct error carrying the underlying failure message instead of a zero-match result.",
        why: [
          "Tách đúng hai ca (ý 1): search lỗi thành báo lỗi riêng. Chỉ khi search chạy hết mà không thấy gì mới là “0 call site”.",
          "Kèm thông báo lỗi gốc là structured error context (ý 2). Phiên chính biết lỗi gì, ở đâu, rồi chọn: chạy lại, thu hẹp phạm vi, hay hoãn việc xóa.",
          "Việc xóa chỉ đi tiếp khi có kết quả rỗng hợp lệ. Lỗi không còn bị đọc thành “an toàn”."
        ] }
    ],
    refs: [
      { label: "Bài 5.3, mục “Empty không phải là lỗi”: valid empty và access failure phải trả về khác nhau; khung “Tệ”: mảng rỗng đánh dấu thành công khi thật ra là timeout", href: NOTES + "#l-5-3" },
      { label: "Bài 2.2, cuối mục “Lỗi trong hệ nhiều agent”: access failure và empty result hợp lệ phải trả về khác nhau", href: NOTES + "#l-2-2" },
      { label: "Cheatsheet D5: dòng “Không phân biệt không có kết quả với không truy cập được”", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 5, n: 7, total: 60, sub: "3.6", subName: "Đưa Claude Code vào CI/CD", scen: "S2",
    answer: "D",
    ask: "A developer asks Claude Code to write unit tests for a payment module, and several of the new cases repeat scenarios that the module's existing spec file already covers. What should the developer change in the next request?",
    scene: [
      "Dev nhờ Claude Code viết unit test cho module thanh toán.",
      "Nhiều case mới lặp lại scenario (kịch bản test) mà file spec hiện có của module đã cover.",
      "Chỗ khó: Claude biết module, nhưng chưa từng thấy file spec. Không thấy test cũ thì không biết case nào đã có."
    ],
    asks: [
      "Lần sau dev nên đổi gì trong yêu cầu?",
      "Tức là: đưa đúng nội dung file spec vào cho Claude, để nó chỉ viết phần còn thiếu.",
      "Soi từng phương án: trước khi viết, Claude có thật sự thấy nội dung các case đã có không?"
    ],
    facts: [
      "Guide 3.6: sinh test thì đưa file test hiện có vào context, để Claude không đề xuất lại scenario đã được cover.",
      "Gõ <code>@</code> kèm đường dẫn một file trong prompt thì nội dung file được đưa vào hội thoại (khi vừa giới hạn token của tool Read, mặc định 25.000 token). <code>@</code> một thư mục thì chỉ ra danh sách file, không có nội dung.",
      "CLAUDE.md là chỉ dẫn chung, nạp ở mọi phiên. Nó hợp với quy ước lâu dài như chạy test bằng lệnh gì, không mang được chuyện file spec này đã có những case nào.",
      "Docs: Claude nhìn các file test hiện có để theo đúng style, framework và cách assert (kiểm kết quả) đang dùng."
    ],
    opts: [
      { k: "A", gist: "Generate the tests, then send a second prompt asking Claude to compare them with the suite and remove overlaps.",
        why: [
          "Dọn sau thay vì chặn trước: tốn một lượt sinh test rồi vứt bớt.",
          "Lượt so sánh vẫn phải có nội dung file spec mới so được (ý 1). Đằng nào cũng phải đưa file spec, đưa ngay từ đầu thì khỏi lượt dọn."
        ] },
      { k: "B", gist: "Add a line to the project <code>CLAUDE.md</code> stating that generated tests must never repeat scenarios already in the suite.",
        why: [
          "Câu dặn đúng ý, nhưng không cho Claude biết file spec này có case nào (ý 3). Không thấy test cũ thì vẫn phải đoán, vẫn trùng.",
          "Dễ bị cuốn vì “must never” (không bao giờ được) nghe như chặn tận gốc. Nhưng lệnh cấm chỉ có tác dụng khi Claude biết đâu là cái bị cấm."
        ] },
      { k: "C", gist: "Reference the tests directory with <code>@</code> so every existing test file is loaded before generation starts.",
        why: [
          "Sai ở giả định: <code>@</code> thư mục chỉ cho danh sách tên file, không có nội dung (ý 2).",
          "Claude biết có file spec, nhưng vẫn không biết bên trong có case nào. Test vẫn trùng.",
          "Dễ bị cuốn vì nghe còn đầy đủ hơn D: cả thư mục chứ không chỉ một file. Nhưng nhiều tên file không bằng một file có nội dung."
        ] },
      { k: "D", gist: "Reference the module's existing spec file with <code>@</code> and ask Claude to add only scenarios it does not already cover.",
        why: [
          "<code>@</code> file spec đưa nội dung thật vào prompt (ý 2). Claude thấy từng case đã có trước khi viết case mới.",
          "Đúng cách guide 3.6 chỉ (ý 1), kèm lời dặn rõ: chỉ thêm scenario chưa cover. Có file làm căn cứ thì lời dặn mới làm theo được.",
          "Nhìn test cũ, Claude còn theo được style và cách assert của suite (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 3.6, mục “Claude trong CI biết gì về project của bạn?”: sinh test thì đưa test file hiện có vào context", href: NOTES + "#l-3-6" },
      { label: "Cheatsheet D3: dòng “Comment trùng sau commit mới / test trùng” → đưa test hiện có vào context", href: NOTES + "#cheat-d3" },
      { label: "Docs “Common workflows”, mục Reference files and directories: @ file đưa nội dung vào, @ thư mục chỉ ra danh sách file", href: "https://code.claude.com/docs/en/common-workflows" }
    ]
  },
  {
    de: 5, n: 8, total: 60, sub: "5.4", subName: "Quản lý context khi khám phá codebase lớn", scen: "S2",
    answer: "D",
    ask: "This team runs a Claude Code coordinator with several subagents to move 60 modules to a new logging library. When the process crashes partway, the restarted coordinator begins again and re-migrates every module. Which design lets a restarted run pick up where the previous one stopped?",
    scene: [
      "Coordinator (agent điều phối) của Claude Code chia việc cho vài subagent, chuyển 60 module sang thư viện logging mới.",
      "Chạy được một phần thì process crash. Khởi động lại, coordinator làm lại từ đầu, migrate lại cả 60 module.",
      "Chỗ khó: tiến độ đang chỉ nằm trong hội thoại. Crash là coordinator mất dấu module nào đã xong."
    ],
    asks: [
      "Thiết kế nào cho lần chạy lại tiếp đúng chỗ lần trước dừng?",
      "Tức là: tiến độ từng module phải ghi ở đâu để crash không mất, và coordinator đọc lại được.",
      "Soi từng phương án: tiến độ sống trên đĩa hay trong context, và lúc khởi động lại coordinator có biết module nào xong rồi không?"
    ],
    facts: [
      "Structured state persistence (lưu trạng thái có cấu trúc): mỗi agent export state ra một vị trí biết trước, coordinator giữ một manifest. Khi resume, coordinator đọc manifest và chỉ giao phần còn lại.",
      "Manifest: file (thường là JSON) ghi việc nào xong, việc nào còn chờ, và file state của từng agent nằm đâu. Nó nằm trên đĩa nên crash không mất.",
      "<code>/compact</code> nén lịch sử phiên thành bản tóm tắt để giải phóng context. Tóm tắt là nén có mất mát: chi tiết chính xác như danh sách module dễ rơi mất.",
      "Subagent chạy trong context riêng, phiên chính chỉ nhận bản báo cáo nó gửi về. Subagent đang chạy dở lúc crash thì chưa kịp gửi gì."
    ],
    opts: [
      { k: "A", gist: "Run <code>/compact</code> before each migration phase so the coordinator's context stays small enough to survive a restart.",
        why: [
          "Sai công cụ: <code>/compact</code> để gọn context, không phải để chạy tiếp sau crash (ý 3).",
          "Context nhỏ thì crash vẫn mất như thường. Bản tóm tắt còn có thể làm rơi đúng danh sách module đã xong."
        ] },
      { k: "B", gist: "Add automatic retries so the coordinator re-spawns every subagent after a crash until all modules finish.",
        why: [
          "Đây chính là chuyện team đang gặp: chạy lại mọi subagent là migrate lại cả 60 module, kể cả module đã xong.",
          "Retry hợp với lỗi tạm thời của một bước. Nó không giữ được tiến độ đã làm (ý 1)."
        ] },
      { k: "C", gist: "Instruct the coordinator to keep a running list of completed modules inside its own conversation context.",
        why: [
          "Danh sách vẫn sống trong context, đúng chỗ crash làm mất. Lại còn có thể bị tóm tắt làm rơi (ý 3).",
          "Danh sách do model tự ghi, chỉ dựa trên báo cáo subagent đã gửi về (ý 4). Nó không nói module nào đã thật sự ghi xong xuống đĩa.",
          "Dễ bị cuốn vì nó có đúng ý “ghi lại module nào đã xong”. Nhưng ghi trong context của coordinator khác hẳn ghi ra file."
        ] },
      { k: "D", gist: "Have each subagent record its finished modules in a shared manifest file that the coordinator reads on restart.",
        why: [
          "Đúng structured state persistence (ý 1): tiến độ từng module ghi ra file trên đĩa, không phụ thuộc hội thoại.",
          "Khởi động lại, coordinator đọc manifest, thấy module nào xong, module nào còn chờ (ý 2). Nó chỉ giao phần còn lại, không migrate lại module đã xong."
        ] }
    ],
    refs: [
      { label: "Bài 5.4, mục “Bốn công cụ, mỗi cái một việc”: crash giữa chừng thì structured state persistence và manifest", href: NOTES + "#l-5-4" },
      { label: "Cheatsheet D5: dòng “Run nhiều agent kéo dài hàng giờ, có thể crash” → mỗi agent export state, coordinator load manifest", href: NOTES + "#cheat-d5" },
      { label: "Bài 5.1, mục “Chuyện gì đang xảy ra”: tóm tắt là nén có mất mát, chi tiết chính xác rơi trước", href: NOTES + "#l-5-1" }
    ]
  },
  {
    de: 5, n: 9, total: 60, sub: "5.1", subName: "Giữ thông tin quan trọng trong hội thoại dài", scen: "S2",
    answer: "A",
    ask: "This team's <code>/audit</code> command joins the raw scan output of four subagents into one long prompt that produces a consolidated report. The report reliably covers the first and last subagents' findings but misses critical issues from the two in the middle. How should the combined input be restructured?",
    scene: [
      "Lệnh <code>/audit</code> nối nguyên output quét của bốn subagent thành một prompt dài, rồi viết ra một báo cáo tổng.",
      "Báo cáo luôn có đủ phát hiện của subagent đầu và subagent cuối. Của hai subagent ở giữa thì sót, kể cả lỗi nghiêm trọng.",
      "Chỗ khó: dữ liệu của hai subagent giữa vẫn nằm trong prompt. Chúng không thiếu, chỉ nằm sai chỗ."
    ],
    asks: [
      "Nên sắp xếp lại input gộp thế nào?",
      "Tức là: lần chạy nào báo cáo cũng phải có đủ phát hiện của cả bốn subagent, mà không phải cắt bớt dữ liệu.",
      "Soi từng phương án: nó có đổi bố cục input để phần giữa hết bị sót không, hay chỉ dặn thêm, xoay vòng, chạy lại?"
    ],
    facts: [
      "Lost in the middle: với input rất dài, model chú ý phần đầu và phần cuối tốt hơn, phần giữa dễ bị bỏ sót.",
      "Cách chữa của guide khi gộp output nhiều subagent: đặt tóm tắt key findings (phát hiện chính) ở đầu, phần chi tiết chia dưới section header (tiêu đề mục) rõ ràng. Không cắt dữ liệu nào.",
      "Chỉ dẫn kiểu “đọc kỹ mọi phần” không đổi được cách model phân bố chú ý.",
      "Lỗi do bố cục thì lần nào chạy cũng lặp lại. Retry hợp với lỗi tạm thời, không chữa được lỗi do vị trí."
    ],
    opts: [
      { k: "A", gist: "Open the input with a key-findings summary and put each subagent's detailed results under its own explicit section heading.",
        why: [
          "Tóm tắt ở đầu đưa phát hiện chính của cả bốn subagent vào vùng model chú ý tốt nhất (ý 1). Lỗi nghiêm trọng của hai subagent giữa giờ nằm ngay đầu.",
          "Header cho mỗi phần chi tiết một mốc rõ để model tìm lại khi cần (ý 2). Không phần dữ liệu nào bị bỏ."
        ] },
      { k: "B", gist: "Add a system prompt instruction stating that every section of the input must be weighted equally.",
        why: [
          "Sai ở giả định: dặn chú ý đều không làm model chú ý đều (ý 3). Phần giữa vẫn nằm giữa.",
          "Dễ bị cuốn vì nó nói đúng điều mình muốn. Nhưng vấn đề nằm ở bố cục input, mà một câu dặn không đổi được bố cục."
        ] },
      { k: "C", gist: "Rotate which subagent's output appears first on each run so that every scanner gets the top position over time.",
        why: [
          "Chỉ đổi nạn nhân: lần nào cũng có hai subagent nằm giữa (ý 1). Báo cáo nào cũng thiếu, chỉ là thiếu phần khác.",
          "Đề cần báo cáo đủ ở mỗi lần chạy, không phải “công bằng” khi tính trung bình qua nhiều lần."
        ] },
      { k: "D", gist: "Run the consolidation prompt a second time and merge the two reports to recover any findings that were dropped.",
        why: [
          "Cùng input, cùng bố cục thì lần hai cũng sót đúng phần giữa đó (ý 4). Gộp hai báo cáo thiếu giống nhau vẫn thiếu.",
          "Tốn gấp đôi chi phí và thời gian, lại thêm việc ghép hai báo cáo."
        ] }
    ],
    refs: [
      { label: "Bài 5.1, mục “Bộ kỹ thuật đi kèm”: gộp output nhiều subagent thì tóm tắt key findings ở đầu, chi tiết dưới section header; “Khi đi thi” Dạng 3", href: NOTES + "#l-5-1" },
      { label: "Cheatsheet D5: dòng “Findings nằm giữa input dài bị bỏ sót” → key findings summary ở đầu + section header rõ", href: NOTES + "#cheat-d5" }
    ]
  },
  {
    de: 5, n: 10, total: 60, sub: "3.2", subName: "Slash command và skill", scen: "S2",
    answer: "B",
    ask: "A developer wants a personal, modified version of the team's shared <code>/gen-tests</code> skill for their own sessions. Teammates must not be affected, and the developer still needs to be able to run the team's original <code>/gen-tests</code> on their machine. How should the variant be set up?",
    scene: [
      "Team có skill chung <code>/gen-tests</code> trong repo. Một dev muốn một bản sửa theo ý riêng.",
      "Hai ràng buộc: đồng đội không bị ảnh hưởng gì, và trên máy mình dev vẫn chạy được bản gốc của team.",
      "Chỗ khó: để bản riêng ngoài repo mới lo được ràng buộc đầu. Còn phải lo chuyện trùng tên, vì hai skill trùng tên thì chỉ một bản chạy."
    ],
    asks: [
      "Nên dựng bản riêng thế nào?",
      "Tức là: đặt ở chỗ chỉ máy mình thấy, và đặt tên sao cho nó nằm cạnh bản của team chứ không che bản đó.",
      "Soi từng phương án theo hai câu: đồng đội có nhận được gì không? Trên máy dev, <code>/gen-tests</code> gốc còn gọi được không?"
    ],
    facts: [
      "Skill có hai chỗ đặt chính. Project: <code>.claude/skills/&lt;tên&gt;/SKILL.md</code>, nằm trong repo, commit lên là cả team có. Cá nhân: <code>~/.claude/skills/</code>, nằm trong home, chỉ mình bạn dùng, ở mọi project.",
      "Tên lệnh lấy theo tên thư mục skill, hoặc theo trường <code>name</code> trong frontmatter nếu có đặt.",
      "Hai skill trùng tên thì enterprise thắng personal, personal thắng project. Không gộp, không báo lỗi: skill cá nhân cùng tên che skill của project trên máy bạn.",
      "<code>skillOverrides</code> trong settings chỉ chỉnh skill hiện ra thế nào: bật, chỉ hiện tên, chỉ người gọi được, hay tắt. Nó không thay nội dung skill, cũng không tạo ra skill thứ hai."
    ],
    opts: [
      { k: "A", gist: "Set <code>skillOverrides</code> in personal settings so that <code>/gen-tests</code> resolves to the modified instructions.",
        why: [
          "Sai ở giả định: <code>skillOverrides</code> chỉ chỉnh skill hiện hay ẩn, gọi được theo cách nào (ý 4). Nó không trỏ <code>/gen-tests</code> sang nội dung khác.",
          "Không có bản riêng nào được tạo ra, nên dev không có biến thể nào để chạy."
        ] },
      { k: "B", gist: "Create the variant under <code>~/.claude/skills/</code> with a distinct skill name such as <code>gen-tests-local</code>.",
        why: [
          "Đặt trong <code>~/.claude/skills/</code> thì chỉ máy dev có, đồng đội không nhận gì (ý 1).",
          "Tên khác (cả tên thư mục lẫn trường <code>name</code> nếu có đặt) nên không trùng với skill của team (ý 2, ý 3). Trên máy dev có cả <code>/gen-tests</code> của team lẫn <code>/gen-tests-local</code>, cần cái nào gọi cái đó."
        ] },
      { k: "C", gist: "Place the variant at <code>~/.claude/skills/gen-tests/SKILL.md</code> so it never enters the repository.",
        why: [
          "Lo được ràng buộc đầu: file ngoài repo, đồng đội không bị gì (ý 1).",
          "Nhưng trùng tên với skill project. Personal thắng project (ý 3), nên trên máy dev mọi lần gõ <code>/gen-tests</code> đều chạy bản sửa. Bản của team không gọi được nữa, mà không có lỗi nào báo.",
          "Dễ bị cuốn vì “never enters the repository” (không bao giờ vào repo) đúng là điều đồng đội cần. Nhưng đề còn ràng buộc thứ hai, và trùng tên là phá ràng buộc đó."
        ] },
      { k: "D", gist: "Commit the variant to the repository's <code>.claude/skills/</code> under a separate name so it stays versioned.",
        why: [
          "Tên riêng nên không che bản gốc, lo được ràng buộc thứ hai.",
          "Nhưng commit vào <code>.claude/skills/</code> là cả team nhận bản sửa ở lần pull tiếp theo (ý 1). Trái thẳng ràng buộc “teammates must not be affected” (đồng đội không được bị ảnh hưởng)."
        ] }
    ],
    refs: [
      { label: "Bài 3.2, khung “Tệ / Tốt”: bản riêng của skill team đặt trong ~/.claude/skills/ với tên khác", href: NOTES + "#l-3-2" },
      { label: "Bài 3.2, mục “Đã sửa 01/11”: trùng tên thì enterprise thắng personal, personal thắng project; skill cá nhân che skill project", href: NOTES + "#fix-4" },
      { label: "Docs Claude Code “Skills”: thứ tự khi trùng tên, tên lệnh lấy từ đâu, skillOverrides chỉ chỉnh skill hiện hay ẩn", href: "https://code.claude.com/docs/en/skills" }
    ]
  },
  {
    de: 5, n: 11, total: 60, sub: "5.2", subName: "Escalate và xử lý chỗ mơ hồ", scen: "S2",
    answer: "AD",
    ask: "A team's <code>/triage</code> command runs through <code>claude -p</code> on incoming bug reports. It passes a bug to an engineer whenever Claude scores its own confidence under 6 or the report reads as frustrated. In practice, simple bugs reported angrily go to engineers, while difficult bugs reported calmly stay with Claude to fix. Which two changes make the hand-off decision reliable? (Select TWO.)",
    scene: [
      "Team có lệnh <code>/triage</code> chạy bằng <code>claude -p</code> (chế độ headless, không ai ngồi gõ) trên mỗi bug report mới.",
      "Luật chuyển cho kỹ sư hiện tại: Claude tự chấm độ tự tin dưới 6, hoặc lời report nghe bực bội.",
      "Kết quả ngược đời: bug dễ mà người báo viết giận dữ thì bị đẩy cho kỹ sư. Bug khó mà viết bình tĩnh thì Claude giữ lại tự sửa.",
      "Chỗ khó: cả hai tín hiệu đều đo sai thứ. Đề chọn hai, nên phải thấy hai phương án đúng bổ sung cho nhau thế nào."
    ],
    asks: [
      "Hai thay đổi nào làm quyết định chuyển kỹ sư đáng tin?",
      "Tức là: quyết định phải dựa vào độ khó thật của bug, không dựa vào tâm trạng người báo hay con số Claude tự chấm.",
      "Soi từng phương án: nó bỏ tín hiệu sai đi, hay chỉ chỉnh lại cách dùng tín hiệu sai?"
    ],
    facts: [
      "Sentiment (mức bực bội trong lời người báo) đo tâm trạng, không đo độ khó của ca. Người bực có thể đang báo một lỗi sửa một dòng.",
      "Self-reported confidence là điểm model tự chấm, chưa đối chiếu với kết quả thật. Nó hiệu chuẩn kém: hay tự tin cao đúng ở những ca khó mà nó làm sai.",
      "Guide 5.2: viết tiêu chí escalate (chuyển người) tường minh vào prompt, kèm few-shot (vài ví dụ mẫu) cho thấy ca nào tự xử, ca nào chuyển.",
      "Guide có ba trigger escalate: người dùng đòi gặp người; policy không có hoặc mơ hồ (policy gap); agent không thể tiến triển sau vài lần thử. Trong đề này, quy ước của repo đóng vai policy."
    ],
    opts: [
      { k: "A", gist: "Pass the bug to an engineer whenever fixing it would need a decision that the repository's conventions don't address.",
        why: [
          "Đây là trigger policy gap (ý 4) đặt vào bối cảnh code: quy ước của repo không nói tới thì Claude không có căn cứ để tự quyết.",
          "Tín hiệu này gắn với chính cái bug, không với giọng người báo. Bug khó vì đụng một quyết định chưa ai chốt sẽ được chuyển, dù report viết bình tĩnh."
        ] },
      { k: "B", gist: "Turn on extended thinking for the triage step so Claude's self-rated confidence score becomes better calibrated.",
        why: [
          "Sai ở giả định: nghĩ thêm không biến điểm tự chấm thành phép đo (ý 2). Con số vẫn là chữ model tự viết về chính nó, chưa so với kết quả thật.",
          "Tín hiệu bực bội vẫn còn nguyên, nên bug dễ viết giận dữ vẫn bị đẩy cho kỹ sư (ý 1).",
          "Dễ bị cuốn vì extended thinking (cho Claude nghĩ thêm trước khi trả lời) nghe như làm mọi thứ chính xác hơn. Nhưng lỗi nằm ở chỗ chọn tín hiệu, không ở chỗ Claude nghĩ ít."
        ] },
      { k: "C", gist: "Move the confidence cutoff from 6 up to 8 so more borderline reports get routed to an engineer.",
        why: [
          "Vẫn dùng con số tự chấm (ý 2), chỉ dời ngưỡng.",
          "Ca khó mà Claude tự tin sai vẫn được chấm cao, vẫn ở lại với Claude. Ngưỡng cao hơn chỉ đẩy thêm bug dễ cho kỹ sư.",
          "Dễ bị cuốn vì “more borderline reports” (thêm nhiều ca lưng chừng) nghe như an toàn hơn. Nhưng thước đã sai thì dời vạch không làm nó đo đúng."
        ] },
      { k: "D", gist: "Drop both signals and replace them with explicit hand-off criteria plus few-shot examples of bugs to fix versus bugs to hand off.",
        why: [
          "Bỏ cả hai tín hiệu sai (ý 1, ý 2) và thay bằng đúng cách guide chỉ: tiêu chí tường minh kèm ví dụ (ý 3).",
          "Ví dụ cho Claude thấy ranh giới: bug thế này thì sửa, bug thế kia thì chuyển, kèm lý do. Quyết định dựa vào việc cái bug cần gì.",
          "A và D bổ sung nhau: D dựng khung tiêu chí và ví dụ, A là một trigger cụ thể nằm trong khung đó."
        ] }
    ],
    refs: [
      { label: "Bài 5.2: sentiment đo tâm trạng, confidence tự báo hiệu chuẩn kém; sửa bằng tiêu chí escalate tường minh kèm few-shot", href: NOTES + "#l-5-2" },
      { label: "Bài 5.2, mục “Đã sửa 01/11”: ba trigger escalate, trong đó có policy gap", href: NOTES + "#fix-9" }
    ]
  },
  {
    de: 5, n: 12, total: 60, sub: "3.4", subName: "Plan mode hay làm thẳng", scen: "S2",
    answer: "C",
    ask: "A developer is swapping scattered print statements for structured logging throughout a large service. Enumerating every call site would fill up the main conversation before the design work even begins, and the design and the implementation must stay consistent with each other. How should the work be organized?",
    scene: [
      "Dev thay các lệnh <code>print</code> rải rác bằng structured logging (log có cấu trúc, ví dụ JSON với các trường cố định) trong một service lớn.",
      "Việc có ba pha: tìm mọi chỗ gọi <code>print</code>, thiết kế cách log, rồi sửa code.",
      "Chỗ khó 1: chỉ riêng việc liệt kê chỗ gọi đã đủ làm đầy hội thoại chính trước khi kịp thiết kế.",
      "Chỗ khó 2: thiết kế và sửa code phải khớp nhau, nên hai pha đó cần chung một mạch suy nghĩ."
    ],
    asks: [
      "Nên tổ chức việc thế nào?",
      "Tức là: đẩy pha tìm kiếm (output dài) ra khỏi context chính, nhưng giữ thiết kế và sửa code chung một hội thoại.",
      "Soi từng phương án: kết quả tìm kiếm thô có vào context chính không? Thiết kế và sửa code có còn chung context không?"
    ],
    facts: [
      "Claude chạy grep hay đọc file ở hội thoại nào thì kết quả tool nằm trong context của hội thoại đó. Dặn “trả lời ngắn” chỉ đổi phần Claude viết ra, không đổi phần kết quả tool đã vào.",
      "Explore subagent: subagent có sẵn trong Claude Code, chỉ được đọc. Nó khám phá trong context riêng rồi chỉ gửi về bản tóm tắt.",
      "Mẫu ở bài 3.4: pha khám phá giao Explore subagent; chốt kế hoạch và sửa code làm ở phiên chính, dựa trên bản tóm tắt nhận về.",
      "<code>/compact</code> nén lịch sử phiên thành bản tóm tắt. Nén sau khi ngập là chữa sau, và bản tóm tắt có thể rụng chi tiết như path, số dòng."
    ],
    opts: [
      { k: "A", gist: "Tell Claude in the prompt to report only the relevant call sites and keep each search result short.",
        why: [
          "Sai ở giả định: lời dặn chỉ đổi câu trả lời của Claude. Kết quả thô của mỗi lần grep, mỗi lần đọc file vẫn vào context chính trước khi Claude kịp tóm tắt (ý 1).",
          "Context chính vẫn đầy, đúng điều đề muốn tránh.",
          "Dễ bị cuốn vì nghe như cắt bớt output tận gốc. Nhưng câu trả lời ngắn khác với cách ly output của tool."
        ] },
      { k: "B", gist: "Open a new session for each phase and write the discovered call sites into CLAUDE.md for the next session to load.",
        why: [
          "CLAUDE.md nạp ở mọi phiên, dành cho quy ước dùng lâu dài. Nhét hàng trăm chỗ gọi của một việc tạm vào đó thì phiên nào cũng gánh, kể cả sau khi việc đã xong.",
          "Mỗi pha một phiên thì thiết kế và sửa code mất chung mạch suy nghĩ, trái yêu cầu “stay consistent” (giữ nhất quán)."
        ] },
      { k: "C", gist: "Hand call-site discovery to the Explore subagent, then do the design and the implementation in the main conversation.",
        why: [
          "Explore subagent grep trong context riêng, chỉ gửi về bản tóm tắt danh sách chỗ gọi (ý 2). Context chính còn chỗ cho hai pha sau.",
          "Thiết kế và sửa code ở chung hội thoại chính, cùng dựa trên bản tóm tắt đó, nên khớp nhau (ý 3)."
        ] },
      { k: "D", gist: "Run discovery in the main conversation and use <code>/compact</code> after each batch of search results to free up space.",
        why: [
          "Chữa sau: mỗi lô kết quả đã chiếm context rồi mới nén (ý 4).",
          "Nén nhiều lần dễ rụng path và số dòng, mà pha sửa code cần đúng những chi tiết đó.",
          "Dễ bị cuốn vì <code>/compact</code> là công cụ giữ context có thật. Nhưng giao việc tìm kiếm đi từ đầu thì không có gì phải dọn."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, mục “Khi pha khám phá quá dài”: Explore subagent đọc trong context riêng, phiên chính giữ chỗ cho chốt kế hoạch và sửa code", href: NOTES + "#l-3-4" },
      { label: "Bài 5.4, mục “Biết thêm”: compact sau khi ngập không bằng giao việc đi từ đầu", href: NOTES + "#l-5-4" }
    ]
  },
  {
    de: 5, n: 13, total: 60, sub: "3.2", subName: "Slash command và skill", scen: "S2",
    answer: "A",
    ask: "A team keeps the rule “use named exports, never default exports” inside a skill under <code>.claude/skills/</code>. Claude obeys it in some sessions and ignores it in others, depending on whether that skill happened to be loaded. What should the team change?",
    scene: [
      "Team viết quy ước “use named exports, never default exports” (dùng named export, không bao giờ dùng default export) vào một skill trong <code>.claude/skills/</code>.",
      "Có phiên Claude theo, có phiên không, tùy skill đó có được nạp hay không.",
      "Chỗ khó: đây là quy ước áp dụng cho mọi file, mọi lúc. Nhưng nó lại nằm trong một cơ chế chỉ nạp khi cần."
    ],
    asks: [
      "Team nên đổi gì?",
      "Tức là: đưa quy ước vào chỗ nạp ở mọi phiên, không phụ thuộc skill có được gọi hay không.",
      "Soi từng phương án: sau khi đổi, quy ước có chắc chắn có mặt ở mọi phiên không?"
    ],
    facts: [
      "CLAUDE.md nạp toàn bộ ngay đầu mọi phiên. Nó dành cho chuẩn chung áp dụng mọi lúc.",
      "Skill: đầu phiên Claude chỉ thấy <code>description</code>. Nội dung <code>SKILL.md</code> chỉ nạp khi có người gõ <code>/tên-skill</code>, hoặc khi Claude thấy việc đang làm khớp mô tả.",
      "<code>./CLAUDE.md</code> ở gốc repo là bản project: commit vào git, ai clone repo cũng có.",
      "<code>context: fork</code> cho skill chạy trong subagent riêng để output dài không đổ vào phiên chính. Nó không đổi chuyện skill có được nạp hay không."
    ],
    opts: [
      { k: "A", gist: "Move the export rule into the project-level CLAUDE.md so it is loaded in every session.",
        why: [
          "CLAUDE.md nạp ở mọi phiên (ý 1), nên quy ước luôn có mặt, không còn phụ thuộc skill có được gọi không.",
          "Bản project commit vào git (ý 3), cả team cùng có. Đúng quy tắc bài 3.2: chuẩn luôn áp dụng thì vào CLAUDE.md, workflow theo việc thì vào skill."
        ] },
      { k: "B", gist: "Have each developer invoke the skill by hand at the start of every session.",
        why: [
          "Chạy được nếu ai cũng nhớ. Nhưng nó biến một chuẩn luôn áp dụng thành một bước tự nguyện, quên một phiên là phiên đó mất quy ước.",
          "Gốc vấn đề vẫn còn: quy ước nằm sai cơ chế (ý 2)."
        ] },
      { k: "C", gist: "Add <code>context: fork</code> to the skill's frontmatter so the rule survives context compaction.",
        why: [
          "Sai công cụ: <code>context: fork</code> lo chuyện output dài, không lo chuyện skill có được nạp (ý 4).",
          "Còn tệ hơn: skill fork chạy trong subagent riêng, nên quy ước không nằm ở hội thoại chính, nơi Claude đang sửa code.",
          "Dễ bị cuốn vì “survives compaction” (sống sót qua compact) nghe như giữ quy ước bền hơn. Nhưng vấn đề ở đây là không được nạp, không phải bị nén mất."
        ] },
      { k: "D", gist: "Rewrite the skill's <code>description</code> with more trigger keywords so Claude loads it more often.",
        why: [
          "Chỉ tăng khả năng Claude thấy skill khớp việc (ý 2). Skill vẫn là thứ nạp khi cần, phiên nào không nạp thì vẫn không có quy ước.",
          "Dễ bị cuốn vì đúng là <code>description</code> quyết định khi nào skill tự nạp. Nhưng chuẩn áp dụng mọi lúc không nên phụ thuộc vào phán đoán “việc này có liên quan không”."
        ] }
    ],
    refs: [
      { label: "Bài 3.2, mục “Skill hay CLAUDE.md?”: CLAUDE.md luôn nạp cho chuẩn chung, skill gọi theo việc", href: NOTES + "#l-3-2" },
      { label: "Bài 3.1: CLAUDE.md cấp project ở gốc repo, commit vào git cho cả team", href: NOTES + "#l-3-1" }
    ]
  },
  {
    de: 5, n: 14, total: 60, sub: "5.4", subName: "Quản lý context khi khám phá codebase lớn", scen: "S2",
    answer: "CD",
    ask: "Across several daily Claude Code sessions, a developer is debugging a legacy billing module that teammates keep committing changes to. In every new session, Claude redoes earlier discovery work and no longer knows what was concluded the day before. Which two practices address this? (Select TWO.)",
    scene: [
      "Dev gỡ lỗi một module billing cũ qua nhiều phiên Claude Code, mỗi ngày một phiên.",
      "Đồng đội vẫn commit thay đổi vào module đó hằng ngày.",
      "Triệu chứng: phiên mới nào Claude cũng khám phá lại từ đầu, không còn biết kết luận của hôm qua.",
      "Chỗ khó: phải mang kết luận sang phiên sau, trong khi code lại đổi mỗi ngày. Đề chọn hai: một việc lúc ghi, một việc lúc mở phiên mới."
    ],
    asks: [
      "Hai cách làm nào giải quyết chuyện này?",
      "Tức là: kết luận phải sống ngoài hội thoại, và phiên mới phải đọc lại nó cùng với những gì đã đổi.",
      "Soi từng phương án: kết luận nằm ở đâu? Phiên sau có thấy nó không, và có biết code đã đổi gì không?"
    ],
    facts: [
      "Phiên mới bắt đầu trống. Kết quả tool và kết luận của phiên cũ chỉ nằm trong lịch sử phiên cũ, không tự sang.",
      "Scratchpad file: file ghi chú agent tự viết findings vào. Nó nằm trên đĩa nên sống qua ranh giới context. Nhưng ghi mà không đọc lại thì vô ích: phải dặn đọc trước khi làm tiếp.",
      "Resume nạp lại toàn bộ lịch sử cũ, kể cả kết quả tool. Code đã đổi thì các kết quả đó stale (lỗi thời), mà agent vẫn tin là đúng.",
      "Docs “Prompting best practices”: khi bắt đầu context window mới, dặn rõ Claude đọc file ghi tiến độ (vd <code>progress.txt</code>) và git log trước. Git là cách tốt để theo dõi trạng thái qua nhiều phiên."
    ],
    opts: [
      { k: "A", gist: "Add each session's findings to the project CLAUDE.md so they load automatically for every developer in every session.",
        why: [
          "Kết luận có sang phiên sau thật, vì CLAUDE.md nạp ở mọi phiên. Nhưng sai chỗ: CLAUDE.md project là quy ước chung của cả team, dùng lâu dài.",
          "Ghi chú gỡ lỗi tạm của một người sẽ nạp vào phiên của mọi người, kể cả người không đụng tới billing. File phình ra, quy ước thật bị loãng.",
          "Dễ bị cuốn vì “load automatically” (tự nạp) giải đúng triệu chứng quên. Nhưng trạng thái của một ca gỡ lỗi thì để ở scratchpad, đọc khi cần (ý 2)."
        ] },
      { k: "B", gist: "Resume the previous day's session with <code>--resume</code> so the tool results it gathered stay available for the next debugging round.",
        why: [
          "Resume mang lại lịch sử, kể cả nội dung file và kết quả grep của hôm qua (ý 3).",
          "Đồng đội commit mỗi ngày, nên các kết quả đó đã stale. Claude suy luận trên code không còn như vậy nữa.",
          "Dễ bị cuốn vì resume đúng là cách “nhớ lại” phiên cũ. Nhưng bài 1.7 nói rõ: kết quả tool cũ đã lỗi thời thì phiên mới kèm bản tóm tắt đáng tin hơn resume."
        ] },
      { k: "C", gist: "Open each new session by telling Claude to read the scratchpad file and the recent git history before exploring any further.",
        why: [
          "Lo nửa lúc mở phiên: scratchpad chỉ có tác dụng khi được đọc lại (ý 2).",
          "Git log cho Claude biết đồng đội đã đổi gì từ lúc ghi chú, để đối chiếu kết luận hôm qua với code hôm nay. Đúng cách docs chỉ khi mở context window mới (ý 4)."
        ] },
      { k: "D", gist: "Have Claude write confirmed findings to a scratchpad file in the repository as it works, not only in the conversation.",
        why: [
          "Lo nửa lúc ghi: kết luận nằm trên đĩa, không mất khi phiên kết thúc (ý 1, ý 2).",
          "C và D không tách được. Ghi mà không ai dặn đọc thì phiên sau vẫn khám phá lại. Dặn đọc mà không ai ghi thì không có gì để đọc."
        ] }
    ],
    refs: [
      { label: "Bài 5.4: scratchpad file giữ findings trên đĩa; mục “Biết thêm”: scratchpad phải được đọc lại", href: NOTES + "#l-5-4" },
      { label: "Bài 1.7, cách 3: kết quả tool cũ đã lỗi thời thì phiên mới kèm tóm tắt đáng tin hơn resume", href: NOTES + "#l-1-7" },
      { label: "Docs “Prompting best practices”, mục Multi-context window workflows: mở context window mới thì đọc progress.txt, tests.json và git log", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
    ]
  },
  {
    de: 5, n: 15, total: 60, sub: "4.2", subName: "Few-shot cho output ổn định", scen: "S5",
    answer: "D",
    ask: "An automated reviewer is inconsistent about catch-all exception handlers. The team added four examples, each a code snippet tagged only “report” or “skip”. Handlers that closely resemble an example are judged correctly, but new variants still get inconsistent verdicts. Which change most effectively improves generalization?",
    scene: [
      "Bot review trong CI chấm không đều các handler bắt mọi exception (ví dụ <code>except Exception:</code>).",
      "Team đã thêm bốn ví dụ. Mỗi ví dụ là một đoạn code kèm đúng một nhãn: “report” (báo) hoặc “skip” (bỏ qua).",
      "Handler giống ví dụ thì chấm đúng. Handler kiểu mới thì vẫn lúc báo lúc không.",
      "Chỗ khó: ví dụ đã có và đã có tác dụng với ca giống. Thứ còn thiếu không phải là số lượng."
    ],
    asks: [
      "Thay đổi nào giúp bot khái quát tốt nhất?",
      "Tức là: làm sao để bot chấm đúng cả handler chưa từng thấy trong ví dụ.",
      "Soi từng phương án: nó dạy bot lý do phân biệt report với skip, hay chỉ thêm mẫu, thêm lời dặn, thêm bộ lọc?"
    ],
    facts: [
      "Ví dụ chỉ có nhãn cho model thấy kết luận, không cho thấy vì sao. Model khớp được ca giống, gặp ca lạ thì đoán.",
      "Guide 4.2: 2–4 ví dụ nhắm đúng ca mơ hồ, mỗi ví dụ kèm lý do. Có lý do, model mới khái quát (áp sang ca mới chưa thấy) thay vì chỉ khớp y hệt ví dụ.",
      "Lời dặn chung như “be conservative” (thận trọng) hay “dùng phán đoán” không phải tiêu chí: model không có gì cụ thể để đối chiếu.",
      "Confidence model tự chấm hiệu chuẩn kém. Lọc theo ngưỡng chỉ giấu bớt output, không làm cách chấm nhất quán hơn."
    ],
    opts: [
      { k: "A", gist: "Make the reviewer give each handler finding a confidence score and discard findings under a threshold.",
        why: [
          "Lọc output chứ không sửa cách chấm (ý 4). Handler kiểu mới vẫn được chấm lúc thế này lúc thế khác, chỉ là bớt hiện ra.",
          "Lại dễ lọc mất finding thật, vì điểm tự chấm không đi theo độ đúng."
        ] },
      { k: "B", gist: "Add an instruction telling the reviewer to use its best judgment on handlers that don't match any example.",
        why: [
          "Không thêm thông tin gì (ý 3). Model vốn đang dùng phán đoán, và chính phán đoán đó đang lệch.",
          "Ca lạ vẫn không có gì để đối chiếu, nên vẫn chấm không đều."
        ] },
      { k: "C", gist: "Grow the example set to twenty or more snippets so that more catch-all variants are covered directly.",
        why: [
          "Vẫn là ví dụ chỉ có nhãn (ý 1). Nhiều mẫu hơn thì khớp được nhiều ca giống hơn, nhưng biến thể kế tiếp nằm ngoài bộ vẫn bị đoán.",
          "Cũng vượt xa số guide khuyên (ý 2). Few-shot không phải nhồi càng nhiều ví dụ càng tốt.",
          "Dễ bị cuốn vì nghe như phủ hết các kiểu handler. Nhưng kiểu handler thì không đếm hết được, còn lý do phân biệt thì áp được cho mọi kiểu."
        ] },
      { k: "D", gist: "Add a brief rationale to every example explaining why reporting or skipping was the right call over the alternative.",
        why: [
          "Lý do biến ví dụ từ mẫu để chép thành quy tắc để áp (ý 2). Ví dụ: “báo vì handler nuốt lỗi im lặng”, “bỏ qua vì handler ghi log rồi ném lại lỗi”.",
          "Gặp handler chưa thấy, bot đối chiếu với lý do chứ không cần giống hình, nên chấm nhất quán hơn."
        ] }
    ],
    refs: [
      { label: "Bài 4.2, mục “Chuyện gì đang xảy ra”: 2–4 ví dụ nhắm ca mơ hồ, mỗi ví dụ kèm lý do để model khái quát", href: NOTES + "#l-4-2" },
      { label: "Bài 4.1: “be conservative” không phải tiêu chí; confidence tự chấm không dùng làm bộ lọc chính", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 5, n: 16, total: 60, sub: "3.5", subName: "Tinh chỉnh lặp: ví dụ input/output, test trước, interview", scen: "S5",
    answer: "CD",
    ask: "The pipeline's review of a pull request returns six findings: three issues inside a shared retry helper that interact with one another, and three unrelated one-line fixes in other places. How should the developer hand these findings to Claude Code? (Select TWO.)",
    scene: [
      "Bot review trong pipeline trả về sáu finding cho một PR.",
      "Ba finding nằm trong cùng một hàm retry dùng chung, và chúng ảnh hưởng lẫn nhau.",
      "Ba finding còn lại là những chỗ sửa một dòng ở nơi khác, không liên quan nhau.",
      "Chỗ khó: hai nhóm cần hai cách giao việc khác nhau. Đề chọn hai, mỗi phương án đúng lo một nhóm."
    ],
    asks: [
      "Nên đưa các finding này cho Claude Code thế nào?",
      "Tức là: chia theo quan hệ giữa các lỗi, không theo số lượng.",
      "Soi từng phương án: khi sửa nhóm phụ thuộc nhau, Claude có thấy đủ ràng buộc không? Lỗi độc lập có kiểm được từng cái không?"
    ],
    facts: [
      "Guide 3.5: các lỗi ảnh hưởng nhau (sửa cái này thì cách sửa cái kia phải đổi theo) thì gộp vào một message chi tiết, để Claude sửa đồng bộ.",
      "Các lỗi độc lập thì sửa tuần tự, mỗi lần một lỗi, kiểm từng bước.",
      "Subagent non-fork khởi động trống. Nó không thấy hội thoại chính, cũng không thấy các subagent khác đang sửa gì."
    ],
    opts: [
      { k: "A", gist: "Give each of the six findings to its own isolated subagent so that all the fixes run in parallel.",
        why: [
          "Ba subagent cùng sửa một hàm retry mà không thấy nhau (ý 3). Bản sửa của con này phá giả định của con kia.",
          "Lỗi phụ thuộc nhau cần được nhìn chung (ý 1). Chạy song song cách ly hợp với việc độc lập, không hợp với việc dùng chung một chỗ code.",
          "Dễ bị cuốn vì song song nghe nhanh. Nhưng ba bản sửa đá nhau thì lại phải gỡ, rốt cuộc chậm hơn."
        ] },
      { k: "B", gist: "Put all six findings into a single message so Claude resolves the entire review in one pass.",
        why: [
          "Gộp thì đúng cho nhóm retry, nhưng sai cho ba lỗi độc lập (ý 2).",
          "Ra một diff lớn trộn đủ thứ. Test đỏ thì khó biết do chỗ sửa nào."
        ] },
      { k: "C", gist: "Work through the three unrelated one-line fixes one at a time, verifying each before moving on.",
        why: [
          "Lo nhóm độc lập: mỗi lần một lỗi, kiểm xong mới sang lỗi sau (ý 2).",
          "Diff nhỏ, hỏng gì là biết ngay do đâu."
        ] },
      { k: "D", gist: "Send the three interacting retry-helper findings together in one message so Claude fixes them jointly.",
        why: [
          "Lo nhóm phụ thuộc: Claude thấy cả ba ràng buộc cùng lúc, nên ra một bản sửa đồng bộ (ý 1).",
          "Đưa từng cái một thì bản sửa lỗi đầu dễ bị lỗi thứ hai lật lại."
        ] }
    ],
    refs: [
      { label: "Bài 3.5, mục “Một message hay nhiều message?”: lỗi phụ thuộc nhau thì gộp, lỗi độc lập thì sửa tuần tự", href: NOTES + "#l-3-5" },
      { label: "Bài 1.3: subagent khởi động trống, không thấy context của ai khác", href: NOTES + "#l-1-3" }
    ]
  },
  {
    de: 5, n: 17, total: 60, sub: "4.6", subName: "Review độc lập và review nhiều lượt", scen: "S5",
    answer: "AB",
    ask: "Once Claude Code produces a fix in the pipeline, the team wants a second instance to review that fix without any access to the generator's reasoning. Which two practices set up this independent review correctly? (Select TWO.)",
    scene: [
      "Trong pipeline, Claude Code sinh một bản sửa lỗi.",
      "Team muốn một instance thứ hai review bản sửa đó mà không thấy reasoning (mạch suy nghĩ) của instance đã sinh ra nó.",
      "Chỗ khó: tách reviewer khỏi generator thì reviewer cũng mất luôn mọi thứ generator đã thấy. Đề chọn hai: một bước tạo sự độc lập, một bước bù phần thông tin bị cắt."
    ],
    asks: [
      "Hai cách làm nào dựng đúng một lượt review độc lập?",
      "Tức là: reviewer phải có context sạch, nhưng vẫn đủ dữ kiện để review.",
      "Soi từng phương án: reviewer có mang theo reasoning của generator không? Nó có đủ diff và tiêu chí để làm việc không?"
    ],
    facts: [
      "Self-review: phiên vừa sinh code vẫn giữ lý do lúc viết, nên hay bảo vệ quyết định của mình. Guide 4.6: instance độc lập (lần gọi hay phiên mới, context sạch) bắt lỗi tinh vi tốt hơn cả lời dặn tự review lẫn extended thinking.",
      "Trong CI, job review chạy như một lần chạy mới, nên độc lập là chuyện tự nhiên.",
      "Instance hay subagent mới khởi động trống. Lời giao việc là thông tin duy nhất nó nhận, nên diff, đường dẫn file, tiêu chí review phải được đưa vào đó.",
      "Resume nạp lại toàn bộ lịch sử phiên cũ, kể cả các lần gọi tool và reasoning."
    ],
    opts: [
      { k: "A", gist: "Explicitly give the reviewer the changed file paths and the diff, because it cannot see the generator's earlier tool results.",
        why: [
          "Bù đúng phần bị cắt: reviewer không thấy các file generator đã đọc, nên diff và path phải nằm trong lời giao việc (ý 3).",
          "Thiếu bước này thì reviewer độc lập nhưng mù, không có gì để soi."
        ] },
      { k: "B", gist: "Run the review as a separate Claude Code invocation that receives only the diff and the review criteria.",
        why: [
          "Tạo sự độc lập: lần chạy riêng có context sạch, không mang những lý lẽ generator đã tự thuyết phục mình (ý 1, ý 2).",
          "Chỉ nhận diff và tiêu chí, nên nó đọc code như người lạ, bắt được chỗ người viết đã bỏ qua.",
          "A và B bổ sung nhau: B lo độc lập, A lo đủ dữ kiện."
        ] },
      { k: "C", gist: "Resume the generation session with a review prompt so the reviewer keeps everything the generator already discovered.",
        why: [
          "Resume mang về toàn bộ reasoning của generator (ý 4), đúng thứ đề muốn loại ra.",
          "Rốt cuộc vẫn là model tự chấm bài mình, với đủ lý lẽ bào chữa đang nằm sẵn trong context (ý 1).",
          "Dễ bị cuốn vì “keeps everything already discovered” (giữ mọi thứ đã tìm ra) nghe như reviewer có nhiều thông tin hơn. Nhưng thông tin đó đi kèm cả thiên kiến của người viết."
        ] },
      { k: "D", gist: "Enable extended thinking during generation so Claude deliberates more carefully before it finalizes the fix.",
        why: [
          "Có thể làm bản sửa đầu tốt hơn. Nhưng nghĩ thêm vẫn trong cùng một context, vẫn là tự review (ý 1).",
          "Không tạo ra instance thứ hai, nên không đáp được điều đề đòi."
        ] }
    ],
    refs: [
      { label: "Bài 4.6: instance độc lập bắt lỗi tốt hơn tự review và extended thinking; trong CI job review là lần chạy mới", href: NOTES + "#l-4-6" },
      { label: "Bài 1.3: lời giao việc là thông tin duy nhất subagent nhận được", href: NOTES + "#l-1-3" }
    ]
  },
  {
    de: 5, n: 18, total: 60, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema", scen: "S5",
    answer: "C",
    ask: "Review findings in the pipeline are emitted through a tool whose <code>category</code> field is an enum of <code>security</code>, <code>correctness</code>, <code>performance</code> and <code>style</code>. Logs show licensing and accessibility issues being squeezed into <code>style</code>, where developers habitually dismiss them. Which schema change best preserves these findings?",
    scene: [
      "Finding của bot review đi qua một tool có trường <code>category</code> là enum bốn giá trị: <code>security</code>, <code>correctness</code>, <code>performance</code>, <code>style</code>.",
      "Finding về license (giấy phép phần mềm) và accessibility (khả năng tiếp cận cho người khuyết tật) không thuộc loại nào, nên bị nhét vào <code>style</code>.",
      "Hậu quả: dev quen tay dismiss (bỏ qua) finding <code>style</code>, nên các vấn đề thật này bị bỏ qua theo.",
      "Chỗ khó: schema chặt nên output luôn hợp lệ. Lỗi nằm ở danh sách thiếu chỗ cho giá trị đúng, không phải ở model không tuân thủ."
    ],
    asks: [
      "Đổi schema thế nào để giữ được các finding này?",
      "Tức là: cho finding lạc loại một nhãn trung thực và ghi lại nó là gì, không ép vào loại sai, cũng không bỏ đi.",
      "Soi từng phương án: finding license còn được báo không? Có nhãn đúng không? Có ghi lại nó thuộc loại gì không?"
    ],
    facts: [
      "Enum là danh sách giá trị được phép, Claude chỉ được chọn trong đó. Danh sách thiếu giá trị đúng thì model buộc phải chọn giá trị gần nhất, tức là chọn sai.",
      "Guide 4.3: category thêm <code>\"other\"</code> đi kèm một trường <code>detail</code> dạng chuỗi để mở rộng, và <code>\"unclear\"</code> cho ca mơ hồ.",
      "Optional / nullable dành cho thông tin tài liệu có thể không có. Mục đích là chống bịa cho đủ trường.",
      "Lời dặn trong prompt là xác suất, và không sửa được một schema không có đáp án đúng cho một số input. Confidence tự chấm thì hiệu chuẩn kém."
    ],
    opts: [
      { k: "A", gist: "Attach a self-rated confidence score to every finding so the poorly categorized ones can be filtered out.",
        why: [
          "Enum vẫn không có nhãn đúng, nên model vẫn chọn sai loại, có khi còn tự tin cao (ý 1, ý 4).",
          "Lọc theo điểm thì finding license có thể bị bỏ hẳn. Vấn đề bị giấu đi chứ không được sửa."
        ] },
      { k: "B", gist: "Add a prompt instruction to report only the findings that clearly fit one of the four categories.",
        why: [
          "Đổi nhãn sai lấy finding mất: vấn đề license và accessibility không còn được báo nữa.",
          "Lại dựa vào lời dặn trong prompt thay vì sửa schema (ý 4).",
          "Dễ bị cuốn vì hết cảnh nhét nhầm vào <code>style</code>. Nhưng đề hỏi cách “preserve” (giữ lại) các finding này, không phải cách bỏ chúng."
        ] },
      { k: "C", gist: "Add an <code>\"other\"</code> value to the enum together with a free-text field that describes the issue type.",
        why: [
          "Đúng mẫu guide: enum thêm <code>\"other\"</code> kèm trường mô tả dạng chuỗi (ý 2).",
          "Finding license hay accessibility có chỗ đi trung thực, không bị trộn vào <code>style</code> rồi bị dismiss. Trường mô tả ghi lại nó là gì.",
          "Loại nào hay xuất hiện trong trường mô tả thì sau này nâng thành giá trị enum riêng."
        ] },
      { k: "D", gist: "Make the <code>category</code> field nullable so Claude can leave it empty when none of the listed values fits.",
        why: [
          "Sai đòn bẩy: nullable dành cho thông tin có thể vắng (ý 3). Finding nào cũng có loại, chỉ là loại đó chưa có trong danh sách.",
          "Để trống thì hết nhãn sai, nhưng mất luôn thông tin finding thuộc loại gì. Không còn gì để định tuyến hay thống kê."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, mục “Thiết kế schema để model không bịa”: enum thêm other kèm detail, unclear; nullable cho thông tin có thể vắng", href: NOTES + "#l-4-3" },
      { label: "Bài Nền tảng D4, bảng từ khóa schema: enum thêm other kèm trường mô tả", href: NOTES + "#l-4-0" }
    ]
  },
  {
    de: 5, n: 19, total: 60, sub: "4.1", subName: "Prompt có tiêu chí rõ để giảm false positive", scen: "S5",
    answer: "D",
    ask: "Metrics on the automated review show that documentation and naming findings are wrong about half the time, while correctness and security findings are seldom wrong. Developers now merge without reading any of the findings. What should the team do first?",
    scene: [
      "Số liệu của bot review: finding về tài liệu (documentation) và đặt tên (naming) sai khoảng một nửa.",
      "Finding về correctness (tính đúng của logic) và security thì hiếm khi sai.",
      "Hậu quả: dev merge mà không đọc finding nào, kể cả finding security.",
      "Chỗ khó: báo nhầm chỉ dồn ở hai loại, nhưng mất niềm tin thì lan ra cả bot."
    ],
    asks: [
      "Team nên làm gì trước tiên?",
      "Tức là: chặn ngay đà mất niềm tin, giữ phần đang đúng, rồi mới sửa phần sai.",
      "Soi từng phương án: hai loại báo nhầm có còn hiện trước mắt dev không? Loại đang đúng có bị ảnh hưởng không?"
    ],
    facts: [
      "Precision: trong các finding đã báo, bao nhiêu phần trăm là đúng. Hai loại documentation và naming đang có precision khoảng 50%.",
      "Niềm tin sụp theo cụm: dev không tách “bot sai về đặt tên” với “bot đúng về SQL injection”, họ chỉ nhớ “bot hay sai”. Một loại báo nhầm nhiều kéo cả bot xuống.",
      "Guide 4.1: tạm tắt loại báo nhầm nhiều để giữ uy tín cho các loại đang đúng, sửa tiêu chí của nó riêng, đo lại trên một bộ mẫu đã biết đáp án rồi mới bật lại.",
      "Lời dặn kiểu “stricter” (khắt khe hơn) hay “be conservative” không phải tiêu chí. Confidence tự chấm hiệu chuẩn kém; ở bài 4.6 nó chỉ dùng để sắp thứ tự cho người xem, không làm bớt finding sai."
    ],
    opts: [
      { k: "A", gist: "Tighten the reporting thresholds equally for every category so the overall false-positive rate falls to an acceptable level.",
        why: [
          "Siết đều thì loại correctness và security, vốn đang đúng, cũng bị cắt bớt finding thật.",
          "Vấn đề chỉ nằm ở hai loại (ý 1). Sửa đều mọi loại là làm yếu đúng phần đang chạy tốt."
        ] },
      { k: "B", gist: "Keep every category on, but attach the model's self-rated confidence to each finding so developers can triage faster.",
        why: [
          "Finding sai vẫn hiện ra như cũ, chỉ có thêm một con số (ý 4).",
          "Dev đã không đọc finding nào nữa. Thêm một trường vào mỗi finding không kéo họ quay lại đọc.",
          "Dễ bị cuốn vì confidence đi kèm finding là cách guide dùng thật ở bài 4.6. Nhưng ở đó nó sắp ưu tiên cho người xem, không chặn được hai loại đang làm mất niềm tin."
        ] },
      { k: "C", gist: "Add an instruction telling the model to judge documentation and naming findings much more strictly before reporting them.",
        why: [
          "“Much more strictly” (khắt khe hơn nhiều) không cho model tiêu chí nào để đối chiếu (ý 4). Kết quả vẫn không đều.",
          "Trong lúc chờ xem lời dặn có tác dụng không, hai loại báo nhầm vẫn chạy, niềm tin tiếp tục rơi."
        ] },
      { k: "D", gist: "Remove the documentation and naming categories from the review prompt for now, and restore them once their criteria are reworked.",
        why: [
          "Đúng bước guide chỉ: tạm tắt hai loại báo nhầm nhiều (ý 3). Finding correctness và security, vốn đúng, lại được dev chú ý (ý 2).",
          "Tắt tạm không phải bỏ hẳn. Sửa tiêu chí của hai loại đó, đo lại trên bộ mẫu đã biết đáp án, rồi mới bật lại."
        ] }
    ],
    refs: [
      { label: "Bài 4.1, mục “Niềm tin sụp theo cụm”: tạm tắt loại báo nhầm nhiều, sửa tiêu chí, đo lại rồi mới bật", href: NOTES + "#l-4-1" },
      { label: "Bài 4.6, mục “Cách sửa”: confidence đi kèm finding để sắp ưu tiên người xem, không làm cổng", href: NOTES + "#l-4-6" }
    ]
  },
  {
    de: 5, n: 20, total: 60, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema", scen: "S5",
    answer: "B",
    ask: "The pipeline's test-generation step emits each suggested test through a tool whose schema lists <code>existing_test_file</code> as required. For modules with no tests yet, Claude fills the field with plausible-looking paths that don't exist, and the pipeline fails when it tries to open them. What change addresses this most directly?",
    scene: [
      "Bước sinh test trong pipeline trả mỗi test gợi ý qua một tool. Schema của tool đặt <code>existing_test_file</code> (file test đang có) là required (bắt buộc).",
      "Module chưa có test nào thì không có file để điền. Claude điền một đường dẫn trông hợp lý nhưng không tồn tại.",
      "Pipeline mở đường dẫn đó và chết.",
      "Chỗ khó: Claude không cố tình sai. Schema đòi một giá trị mà sự thật không có."
    ],
    asks: [
      "Thay đổi nào nhắm thẳng vào lỗi này?",
      "Tức là: cho Claude một cách hợp lệ để nói “không có file test”, để khỏi phải bịa.",
      "Soi từng phương án: sau khi đổi, Claude có còn bị ép điền một đường dẫn không?"
    ],
    facts: [
      "Trường required mà nguồn không có thông tin thì model bịa cho đủ. Guide 4.3: để optional / nullable những trường có thể vắng.",
      "Nullable: trường có mặt nhưng được mang giá trị <code>null</code>, viết <code>type: [\"string\", \"null\"]</code>. Code phía sau rẽ nhánh theo <code>null</code>.",
      "Guide 4.4: retry kèm lỗi có ích với lỗi định dạng và lỗi trích xuất. Retry vô ích khi thông tin không có ở nguồn.",
      "Lời dặn trong prompt là xác suất. Nó không đổi được việc schema vẫn đòi một chuỗi."
    ],
    opts: [
      { k: "A", gist: "Add a validation-retry loop that sends the missing-path error back so Claude can correct the value.",
        why: [
          "Sai đòn bẩy: retry dùng cho lỗi mà model đọc lại nguồn là sửa được. Ở đây file không tồn tại, không có đáp án đúng để sửa theo (ý 3).",
          "Lần thử nào schema cũng vẫn đòi một đường dẫn, nên Claude bịa một đường dẫn khác.",
          "Dễ bị cuốn vì vòng validate-retry là kỹ thuật thật, và lỗi “không tìm thấy file” nghe như lỗi báo lại là sửa được. Nhưng retry chỉ giúp khi đáp án đúng có tồn tại."
        ] },
      { k: "B", gist: "Make <code>existing_test_file</code> optional and nullable so Claude can return null when no test file exists.",
        why: [
          "Cho Claude đường đi trung thực: module chưa có test thì trả <code>null</code> (ý 1, ý 2).",
          "Pipeline rẽ nhánh theo <code>null</code>, ví dụ tạo file test mới, thay vì mở một đường dẫn bịa."
        ] },
      { k: "C", gist: "Add a prompt instruction stating that file paths must never be invented under any circumstances.",
        why: [
          "Lời dặn chống lại schema: schema vẫn đòi một chuỗi, còn prompt bảo đừng bịa (ý 4). Claude vẫn không có cách hợp lệ nào để nói “không có file”.",
          "Kết quả vẫn là xác suất, có lúc vẫn ra đường dẫn bịa."
        ] },
      { k: "D", gist: "Add few-shot examples showing correctly filled paths for modules that already have test files.",
        why: [
          "Ví dụ chỉ dạy ca đang chạy đúng. Ca hỏng là module chưa có test, mà không ví dụ nào chỉ cách xử lý nó.",
          "Schema vẫn bắt điền chuỗi, nên ví dụ không đổi được kết quả ở ca đó (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, mục “Thiết kế schema để model không bịa”: trường có thể vắng thì để nullable", href: NOTES + "#l-4-3" },
      { label: "Bài 4.4: retry có ích với lỗi định dạng, vô ích khi thông tin không có ở nguồn", href: NOTES + "#l-4-4" }
    ]
  },
  {
    de: 5, n: 21, total: 60, sub: "4.1", subName: "Prompt có tiêu chí rõ để giảm false positive", scen: "S5",
    answer: "B",
    ask: "The team's review prompt says Claude should report only findings it is at least 90% confident in. Developers still receive comments about naming, import order and local helper patterns that the team considers fine. Which prompt change best removes this noise?",
    scene: [
      "Prompt review của team dặn Claude chỉ báo finding nào nó “at least 90% sure” (chắc ít nhất 90%).",
      "Dev vẫn nhận comment về đặt tên, thứ tự import, và các helper viết theo kiểu team vẫn dùng. Team coi mấy thứ này là bình thường.",
      "Chỗ khó: ngưỡng 90% nghe như đã lọc chặt. Nhưng Claude rất chắc về mấy góp ý đặt tên đó, nên chúng vẫn qua ngưỡng."
    ],
    asks: [
      "Sửa prompt thế nào để hết đống comment nhiễu này?",
      "Tức là: cho Claude một ranh giới cụ thể giữa thứ đáng báo và thứ phải bỏ, thay cho con số tự tin.",
      "Soi từng phương án: nó có nói cho Claude biết loại nào đáng báo không, hay chỉ xoay quanh độ tự tin?"
    ],
    facts: [
      "Confidence tự báo là con số Claude tự chấm xem nó chắc bao nhiêu. Con số này lệch xa độ đúng thật: Claude hay tự tin cả ở chỗ nó sai, nên không dùng làm bộ lọc chính được.",
      "Explicit categorical criteria (tiêu chí theo loại): liệt kê loại phải báo (bug logic, security, mất dữ liệu) và loại phải bỏ (đặt tên, format, pattern team vẫn dùng). Claude xếp một chỗ code vào loại có sẵn tốt hơn nhiều so với tự đoán một ngưỡng mơ hồ.",
      "Chạy nhiều lần rồi lấy phần chung chỉ bớt nhiễu ngẫu nhiên giữa các lần chạy. Thứ Claude tin là đáng báo thì lần nào nó cũng báo."
    ],
    opts: [
      { k: "A", gist: "Ask Claude to give each finding a self-assessed confidence score, then discard the low-scoring ones in post-processing.",
        why: [
          "Vẫn là lọc bằng confidence tự báo, chỉ dời từ prompt sang code (ý 1).",
          "Claude tin góp ý đặt tên của nó là đúng, nên chấm điểm cao và lọt qua bộ lọc. Comment nhiễu còn nguyên."
        ] },
      { k: "B", gist: "Drop the threshold and give explicit lists of what to report (such as logic and security bugs) and what to skip.",
        why: [
          "Đúng cách sửa của guide: tiêu chí theo loại (ý 2).",
          "Đặt tên, thứ tự import, helper kiểu team nằm thẳng trong danh sách bỏ qua. Claude không cần đoán mình chắc bao nhiêu, chỉ cần xếp finding vào đúng loại.",
          "Bỏ được đúng loại nhiễu đề kể, mà bug logic và security vẫn được báo."
        ] },
      { k: "C", gist: "Review each pull request three times and keep only the findings that appear in all three runs.",
        why: [
          "Sai cơ chế: lấy phần chung chỉ bớt nhiễu ngẫu nhiên (ý 3). Claude tin thứ tự import đáng báo thì cả ba lần đều báo, nên comment đó vẫn qua.",
          "Tốn gấp ba, lại có thể mất bug thật chỉ hiện ở một lần chạy.",
          "Dễ bị cuốn vì “ba lần đều thấy” nghe chắc hơn một lần. Nhưng nó chỉ đo Claude có nhất quán không, không đo finding có đáng báo không."
        ] },
      { k: "D", gist: "Raise the stated threshold to 99% and add that only findings certain to be real defects may be reported.",
        why: [
          "Vẫn là con số tự tin, chỉ nói to hơn (ý 1). Ngưỡng 90% đã không ăn thì 99% cũng không.",
          "“Real defects” (lỗi thật) vẫn không được định nghĩa. Claude vẫn tự quyết đặt tên xấu có phải lỗi không, và nó đang nghĩ là có."
        ] }
    ],
    refs: [
      { label: "Bài 4.1: vì sao “only high-confidence” không lọc được, thay bằng danh sách REPORT / SKIP theo loại", href: NOTES + "#l-4-1" },
      { label: "Cheatsheet D4: dòng “False positive cao, đã thêm be conservative không đỡ”", href: NOTES + "#cheat-d4" }
    ]
  },
  {
    de: 5, n: 22, total: 60, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema", scen: "S5",
    answer: "C",
    ask: "The review job runs with <code>--output-format json</code> and <code>--json-schema</code>, and every finding parses cleanly. But <code>ticket_id</code> comes back as <code>PROJ-482</code>, <code>proj 482</code> or <code>#482</code>, depending on how the PR description wrote it, and the step that builds the issue tracker link then fails. Which change fixes this best?",
    scene: [
      "Job review chạy với <code>--output-format json</code> và <code>--json-schema</code>. Finding nào cũng parse được, đúng schema.",
      "Nhưng trường <code>ticket_id</code> mỗi lần một kiểu: <code>PROJ-482</code>, <code>proj 482</code>, <code>#482</code>, tùy PR description viết sao. Bước tạo link sang issue tracker (hệ thống quản lý ticket) vì thế hỏng.",
      "Chỗ khó: lỗi không nằm ở cú pháp. JSON hợp lệ, trường có đủ, đúng kiểu chuỗi. Cái sai là giá trị bên trong không cùng một dạng."
    ],
    asks: [
      "Đổi gì để sửa lỗi này tốt nhất?",
      "Tức là: làm sao cho <code>ticket_id</code> lần nào cũng ra một dạng chuẩn, mà không mất thông tin (mã project và số ticket).",
      "Soi từng phương án: nó lo cú pháp hay lo nghĩa của giá trị? Kết quả còn đủ mã project không?"
    ],
    facts: [
      "Schema (cả <code>--json-schema</code> của Claude Code lẫn <code>strict: true</code> trên API) chỉ lo cú pháp: JSON đọc được, đủ trường, đúng kiểu. Nó không lo ngữ nghĩa, tức là nội dung có đúng ý không.",
      "Một trường kiểu <code>string</code> nhận cả <code>PROJ-482</code>, <code>proj 482</code> lẫn <code>#482</code>. Với schema, ba cách viết này hợp lệ như nhau.",
      "Quy tắc chuẩn hóa (normalization rules): quy định trong prompt đưa nhiều cách viết về một dạng chung. Guide đòi kèm quy tắc này bên cạnh schema chặt, vì schema không biết hai cách viết là cùng một giá trị."
    ],
    opts: [
      { k: "A", gist: "Tell Claude to copy the ticket reference exactly as it is written in the PR description or commit message.",
        why: [
          "Chép nguyên văn chính là cái đang xảy ra, và là nguyên nhân lỗi. PR viết <code>#482</code> thì ra <code>#482</code>.",
          "Bước tạo link cần một dạng chuẩn, không cần bản sao trung thành của thứ tác giả gõ."
        ] },
      { k: "B", gist: "Add a post-processing step that removes every non-digit character from the ticket string before the link is built.",
        why: [
          "Chạy được, ra cùng một dạng <code>482</code>. Nhưng mất luôn mã project <code>PROJ</code>.",
          "Issue tracker không biết <code>482</code> là ticket của project nào, nên bước tạo link vẫn hỏng, chỉ là hỏng kiểu khác.",
          "Dễ bị cuốn vì làm bằng code nghe chắc hơn dặn trong prompt. Nhưng chuẩn hóa là đưa về dạng đúng, không phải cắt bớt cho giống nhau."
        ] },
      { k: "C", gist: "State the canonical ticket format in the prompt, with rules for converting each variant that shows up in PR text.",
        why: [
          "Schema đã lo xong cú pháp. Phần còn thiếu là nghĩa của giá trị, và đó là việc của prompt (ý 1, ý 3).",
          "Prompt nói rõ dạng chuẩn rồi nói cách đổi từng biến thể. Ví dụ minh họa: mã project viết hoa, gạch nối, rồi số; <code>proj 482</code> → <code>PROJ-482</code>, <code>#482</code> → <code>PROJ-482</code>.",
          "Claude chuẩn hóa ngay lúc sinh output, nên <code>ticket_id</code> tới bước tạo link đã đúng dạng tracker cần."
        ] },
      { k: "D", gist: "Turn on strict schema enforcement so the API rejects any ticket value that is not in canonical form.",
        why: [
          "Sai ở giả định: strict lo hình dạng và kiểu, không hiểu “dạng chuẩn của ticket” là gì (ý 1).",
          "Trường vẫn là <code>string</code>, nên cả ba cách viết đều hợp lệ (ý 2). Không có gì bị từ chối, lỗi y nguyên."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, mục “Thiết kế schema để model không bịa”: kèm quy tắc chuẩn hóa trong prompt bên cạnh schema chặt", href: NOTES + "#l-4-3" },
      { label: "Bài 4.2, khung “Khái niệm của bài”: định nghĩa quy tắc chuẩn hóa và ví dụ khối normalization_rules", href: NOTES + "#l-4-2" }
    ]
  },
  {
    de: 5, n: 23, total: 60, sub: "3.5", subName: "Tinh chỉnh lặp: ví dụ input/output, test trước, interview", scen: "S5",
    answer: "A",
    ask: "The pipeline writes a test suite before implementation and asks Claude to make it pass. When tests fail, the pipeline retries with the prompt “Some tests failed, try again,” and runs rarely converge. Which change would improve this loop the most?",
    scene: [
      "Pipeline viết test suite trước, rồi giao Claude viết code cho test xanh.",
      "Test fail thì pipeline gọi lại Claude với đúng một câu: “Some tests failed, try again” (vài test fail, thử lại đi).",
      "Kết quả: hiếm khi chạy tới được lúc test xanh hết.",
      "Chỗ khó: phần viết test trước đã làm đúng. Cái hỏng là thứ được gửi lại cho Claude mỗi vòng."
    ],
    asks: [
      "Đổi gì để vòng lặp này tốt lên nhiều nhất?",
      "Tức là: mỗi lần gọi lại, Claude cần biết thứ gì để sửa trúng chỗ.",
      "Soi từng phương án: lần gọi sau có thêm thông tin về chỗ đang hỏng không?"
    ],
    facts: [
      "Test-driven iteration: viết test trước, “xong” nghĩa là test xanh, mỗi vòng đưa test đang fail cho Claude sửa. Thứ đưa là chính kết quả fail: tên test, assertion nào sai, giá trị mong đợi và giá trị thật.",
      "Retry kèm lỗi (retry-with-error-feedback): lần gọi sau phải có câu lỗi cụ thể để Claude biết sai ở đâu. Gửi lại y nguyên rồi cầu may thì Claude dễ sai y hệt.",
      "Test đã ghi chính xác hành vi mong đợi. Văn xuôi thì mỗi lần hiểu một kiểu, chính vì vậy mới viết test.",
      "Confidence Claude tự chấm không đáng tin. Kết quả test là tín hiệu khách quan, pipeline có sẵn."
    ],
    opts: [
      { k: "A", gist: "Put the failing test names and their assertion output into every retry prompt so Claude can work on the actual failures.",
        why: [
          "Đúng vòng test-driven iteration (ý 1): Claude thấy test nào fail, sai ở assertion nào, mong đợi gì mà nhận gì.",
          "Đúng pattern retry kèm lỗi (ý 2). Mỗi vòng có thông tin mới về đúng chỗ hỏng, nên vòng sau sửa trúng hơn vòng trước, và vòng lặp mới tới được đích."
        ] },
      { k: "B", gist: "Raise the maximum number of retries per run so Claude gets more attempts to reach a passing implementation.",
        why: [
          "Thêm lượt nhưng lượt nào cũng chỉ nhận “try again”. Lượt sau không biết gì hơn lượt trước (ý 2).",
          "Chỉ tốn thêm tiền và thời gian cho cùng một kiểu đoán mò.",
          "Dễ bị cuốn vì “hiếm khi tới đích” nghe như thiếu lượt. Nhưng cái thiếu là thông tin, không phải số lượt."
        ] },
      { k: "C", gist: "Have Claude rate its confidence that the code is correct before each resubmission, and retry only when the rating is low.",
        why: [
          "Đổi tín hiệu khách quan lấy tín hiệu chủ quan (ý 4). Claude có thể rất tự tin về đoạn code đang fail.",
          "Pipeline đã có kết quả test nói chắc đúng sai. Việc cần làm là đưa kết quả đó cho Claude, không phải hỏi Claude nghĩ sao."
        ] },
      { k: "D", gist: "Rewrite each retry prompt with a more detailed prose description of the behavior the tests already expect.",
        why: [
          "Test đã nói chính xác hành vi mong đợi (ý 3). Viết lại bằng văn xuôi chỉ thêm chữ, vẫn không nói case nào đang hỏng.",
          "Văn xuôi lại bị hiểu mỗi lần một kiểu, đúng thứ mà viết test trước sinh ra để tránh."
        ] }
    ],
    refs: [
      { label: "Bài 3.5, bảng chọn kỹ thuật: test-driven iteration, đưa test fail cho Claude sửa tới khi xanh", href: NOTES + "#l-3-5" },
      { label: "Bài 4.4, mục “Gọi lại cho đúng cách”: lần gọi sau phải kèm câu lỗi cụ thể", href: NOTES + "#l-4-4" }
    ]
  },
  {
    de: 5, n: 24, total: 60, sub: "2.1", subName: "Thiết kế tool: description rõ, ranh giới rõ", scen: "S5",
    answer: "A",
    ask: "The pipeline defines three extraction tools, one each for code diffs, CI failure logs and dependency manifest changes. Because artifacts arrive unlabeled, <code>tool_choice</code> is set to the <code>\"any\"</code> type. Every artifact now yields a tool call, but about one failure log in five is sent to the diff tool. Which change best fixes the misrouting?",
    scene: [
      "Pipeline khai ba tool trích xuất: một cho diff code, một cho log CI bị fail, một cho thay đổi trong file khai dependency (manifest, kiểu <code>package.json</code>).",
      "Artifact (thứ CI sinh ra cần xử lý) đến không có nhãn loại, nên team đặt <code>tool_choice</code> là <code>\"any\"</code>.",
      "Giờ artifact nào cũng ra tool call. Nhưng khoảng 1/5 số log fail bị đưa vào tool diff.",
      "Chỗ khó: phần “có gọi tool không” đã ổn. Còn lại đúng phần “gọi tool nào”."
    ],
    asks: [
      "Đổi gì để hết chọn nhầm tool?",
      "Tức là: tác động vào thứ Claude dựa vào khi chọn giữa ba tool.",
      "Soi từng phương án: nó đụng tới việc chọn tool nào, hay chỉ đụng tới việc có gọi tool không, hay chỉ kiểm sau khi đã chọn?"
    ],
    facts: [
      "<code>tool_choice</code>: <code>auto</code> (mặc định) cho Claude trả text thay vì gọi tool. <code>any</code> bắt buộc gọi một tool nào đó, nhưng Claude tự chọn tool nào. Ép theo tên (<code>{\"type\": \"tool\", \"name\": …}</code>) thì bắt buộc gọi đúng tool đó.",
      "Claude chọn tool chỉ dựa vào <code>name</code>, <code>description</code>, <code>input_schema</code>. Guide: description là cơ chế chính để chọn tool. Description sơ sài hay chồng lấn thì chọn nhầm (misrouting).",
      "Description tốt nói input trông thế nào, ví dụ lúc nào dùng, và ranh giới: khi nào dùng tool này thay vì tool kia.",
      "Retry theo lỗi validation chỉ sửa lỗi hình dạng và cấu trúc. Output đúng schema vẫn có thể sai nghĩa."
    ],
    opts: [
      { k: "A", gist: "Rewrite each tool description to explain what its kind of artifact looks like and when to pick it over the other two.",
        why: [
          "Sửa đúng thứ Claude dựa vào để chọn (ý 2). <code>any</code> đã lo phần có gọi tool, phần chọn tool nào là việc của description (ý 1).",
          "Description nói rõ dấu hiệu nhận ra từng loại và ranh giới với hai tool kia (ý 3). Ví dụ minh họa: log CI có dòng của runner (máy chạy job CI) và mã thoát, diff có header file và các hunk (khúc thay đổi). Log có dính vài dòng code cũng không bị lẫn với diff nữa."
        ] },
      { k: "B", gist: "Add a retry step that resubmits any artifact whose extracted output fails validation against the chosen tool's schema.",
        why: [
          "Retry theo validation chỉ bắt lỗi hình dạng (ý 4). Log bị đưa nhầm vào tool diff vẫn có thể điền ra input đúng schema của tool diff, nên validation qua và retry không chạy.",
          "Kể cả retry có chạy, Claude vẫn chọn tool với cùng description cũ. Lỗi nằm ở bước chọn, trước khi có output để kiểm.",
          "Dễ bị cuốn vì retry kèm validation là cách chuẩn của bài 4.4. Nhưng nó sửa output sai hình dạng, còn ở đây hình dạng đúng mà chọn sai tool."
        ] },
      { k: "C", gist: "Force the diff-extraction tool by name so that every artifact goes through one consistent schema.",
        why: [
          "Ép theo tên thì Claude hết quyền chọn (ý 1). Mọi log fail và manifest đều bị nhét vào schema của diff.",
          "Lỗi 1/5 số log biến thành lỗi chắc chắn cho hai trên ba loại artifact. Ép theo tên hợp khi một bước phải chạy trước (lấy metadata rồi mới làm tiếp), không hợp với artifact lẫn loại."
        ] },
      { k: "D", gist: "Return <code>tool_choice</code> to its default so Claude can answer in text when it is unsure which extraction tool applies.",
        why: [
          "Mặc định là <code>auto</code>: Claude được trả text thay vì gọi tool (ý 1). Text quay lại, parser phía sau không đọc được.",
          "Lần nào Claude vẫn gọi tool thì vẫn chọn bằng description cũ, nên nhầm log với diff vẫn còn."
        ] }
    ],
    refs: [
      { label: "Bài 2.1: description là cơ chế chính để chọn tool; description tốt có ranh giới với tool khác", href: NOTES + "#l-2-1" },
      { label: "Bài 4.3, mục “Ép model gọi tool bằng tool_choice”: auto, any, ép theo tên", href: NOTES + "#l-4-3" }
    ]
  },
  {
    de: 5, n: 25, total: 60, sub: "4.6", subName: "Review độc lập và review nhiều lượt", scen: "S5",
    answer: "AD",
    ask: "The team wants every automated review finding to carry a confidence value, so that a separate verification stage can route findings for a second look. Which TWO practices make that confidence useful for routing? (Select TWO.)",
    scene: [
      "Team muốn mỗi finding của bot review kèm một giá trị confidence (độ tự tin).",
      "Một bước kiểm chứng riêng phía sau dùng giá trị đó để route (định tuyến): finding nào cần được xem lại lần nữa.",
      "Chỗ khó: confidence là con số Claude tự điền. Muốn dùng nó để route thì phải lo hai chuyện: bước sau nhận đủ finding, và con số phải đáng tin."
    ],
    asks: [
      "Hai cách làm nào làm cho confidence dùng được để route?",
      "Tức là: một cách bảo đảm bước kiểm chứng nhận đủ finding, một cách bảo đảm con số confidence khớp với đúng sai thật.",
      "Soi từng phương án: nó giữ đủ finding cho bước sau, hay gắn con số với kết quả thật? Hay chỉ làm con số mượt hơn mà vẫn không biết có đúng không?"
    ],
    facts: [
      "Confidence tự báo chưa hiệu chuẩn: 0.9 không có nghĩa đúng 90%. Muốn đặt ngưỡng route thì phải so con số đó với kết quả thật trên labeled validation set (bộ mẫu đã có đáp án do người gán).",
      "Dặn “chỉ báo khi rất tự tin” ở lượt tìm lỗi thì Claude thấy bug nhưng im với bug dưới ngưỡng. Recall (trong các lỗi thật, bao nhiêu phần trăm được báo) giảm, precision gần như không đổi.",
      "Cách guide chỉ: lượt tìm lỗi cần độ phủ, báo hết, kèm confidence và severity. Lượt kiểm chứng riêng mới lọc và route finding confidence thấp cho người.",
      "Chạy nhiều lần rồi lấy trung bình chỉ giảm dao động giữa các lần chạy. Model tự tin quá mức một cách đều đặn thì trung bình vẫn tự tin quá mức."
    ],
    opts: [
      { k: "A", gist: "Check the reported confidence against a labeled set of findings before using it to set routing thresholds.",
        why: [
          "Lo chuyện con số đáng tin (ý 1). Đối chiếu với các finding dev đã đánh dấu đúng hay sai thì biết ngưỡng nào thật sự tách được finding chắc và finding đáng ngờ.",
          "Không có bước này thì ngưỡng route là chọn bừa, dù con số trông chính xác tới đâu."
        ] },
      { k: "B", gist: "Tell the review prompt to hold back any finding whose confidence is below a fixed threshold before it produces output.",
        why: [
          "Đưa việc lọc ngược về lượt tìm lỗi, đúng chỗ guide bảo đừng lọc (ý 3).",
          "Finding dưới ngưỡng biến mất trước khi tới bước kiểm chứng. Bước đó không còn gì để route, bug thật bị mất (ý 2).",
          "Dễ bị cuốn vì lọc sớm nghe gọn, đỡ việc cho bước sau. Nhưng bước kiểm chứng có ra là để làm đúng việc lọc đó, với đủ dữ liệu."
        ] },
      { k: "C", gist: "Run the review three times and average each finding's confidence so routing works from a smoother signal.",
        why: [
          "Trung bình chỉ giảm dao động, không cho biết con số có khớp đúng sai thật không (ý 4). Ba điểm tự tin quá mức chia trung bình vẫn tự tin quá mức.",
          "Tốn gấp ba, mà ngưỡng route vẫn chưa gắn với kết quả thật nào (ý 1)."
        ] },
      { k: "D", gist: "Have the review report every finding, uncertain ones included, and filter by confidence in a later pass.",
        why: [
          "Lo chuyện đủ finding (ý 3): lượt tìm lỗi báo hết kèm confidence, lượt sau mới lọc và route.",
          "Finding chưa chắc mà là bug thật vẫn tới được bước kiểm chứng, không bị giấu từ đầu (ý 2).",
          "A lo con số có nghĩa, D lo có đủ finding cho con số đó làm việc. Thiếu một trong hai thì route không đáng tin."
        ] }
    ],
    refs: [
      { label: "Bài 4.6, “Khi đi thi” dạng 3: lượt tìm lỗi báo hết kèm confidence, lượt kiểm chứng mới lọc và route", href: NOTES + "#l-4-6" },
      { label: "Bài 5.5: confidence tự báo chưa hiệu chuẩn, đặt ngưỡng bằng labeled validation set", href: NOTES + "#l-5-5" }
    ]
  },
  {
    de: 5, n: 26, total: 60, sub: "4.5", subName: "Xử lý theo lô (Batch)", scen: "S5",
    answer: "B",
    ask: "In a trial, the nightly test-generation job ran through the Message Batches API and every batch finished well under an hour. A developer now proposes sending the pre-merge review check, which must complete before a pull request can merge, through batches too, to save money. How should the team respond?",
    scene: [
      "Team thử chạy job sinh test ban đêm qua Message Batches API. Batch nào cũng xong chưa tới một giờ.",
      "Một dev đề xuất chuyển luôn pre-merge check (bước kiểm trước khi merge) sang batch cho rẻ. Check này phải xong thì PR mới merge được.",
      "Chỗ khó: số liệu thử nghiệm đẹp, nhìn như batch đủ nhanh. Nhưng đó là thứ đã quan sát được, không phải thứ được cam kết."
    ],
    asks: [
      "Team nên trả lời đề xuất này thế nào?",
      "Tức là: việc có người đang chờ kết quả có hợp với batch không, dù batch thường xong nhanh.",
      "Soi từng phương án: dev có còn phải chờ một thứ không có cam kết thời gian không?"
    ],
    facts: [
      "Message Batches API rẻ hơn 50%. Đổi lại, một batch có thể mất tới 24 giờ và không có SLA (cam kết thời gian xử lý). Đa số xong trong một giờ, nhưng “đa số” không phải cam kết.",
      "Batch hợp với việc không ai đang chờ: báo cáo đêm, sinh test ban đêm. Việc đang chặn người, như pre-merge check, giữ gọi API thường (đồng bộ).",
      "Batch không nhận <code>stream: true</code>.",
      "Batch kèm fallback sang gọi thường khi chờ quá lâu là phức tạp vô ích: người vẫn phải chờ, ca chậm còn trả tiền hai lần."
    ],
    opts: [
      { k: "A", gist: "Move the pre-merge check to batches, poll the batch status, and fall back to a synchronous call after one hour.",
        why: [
          "Dev vẫn có thể phải chờ tới một giờ cho mỗi PR trước khi fallback chạy.",
          "Ca chậm thì trả tiền hai lần: lượt batch và lượt gọi thường (ý 4).",
          "Dễ bị cuốn vì nghe như vừa rẻ vừa có lưới an toàn. Nhưng việc đang chặn người thì cứ gọi thường, không cần lưới."
        ] },
      { k: "B", gist: "Keep the pre-merge check on the synchronous Messages API and leave only the nightly job on batches.",
        why: [
          "Pre-merge check chặn merge, có người đang chờ, nên cần gọi thường (ý 2).",
          "Batch xong nhanh trong thử nghiệm chỉ là quan sát. Không có SLA, xấu nhất 24 giờ (ý 1), không làm cổng chặn PR được.",
          "Job ban đêm không ai chờ, nên ở lại batch và vẫn được giảm 50%. Mỗi việc đúng loại API của nó."
        ] },
      { k: "C", gist: "Move the pre-merge check to batches with <code>stream</code> set to true so each result is delivered as soon as its request completes.",
        why: [
          "Sai ở giả định: batch không nhận <code>stream: true</code> (ý 3).",
          "Streaming thuộc về gọi API thường. Nó không biến batch thành thứ trả lời ngay."
        ] },
      { k: "D", gist: "Move the pre-merge check to batches and submit each pull request as its own single-request batch so it is processed faster.",
        why: [
          "Batch nhỏ không đổi cam kết: batch một request vẫn có thể mất tới 24 giờ, vẫn không có SLA (ý 1).",
          "Vẫn là việc bất đồng bộ, nên vẫn không làm cổng merge được."
        ] }
    ],
    refs: [
      { label: "Bài 4.5: Batch rẻ 50%, tối đa 24 giờ, không SLA; pre-merge giữ realtime; mục “Biết thêm”: stream: true bị từ chối", href: NOTES + "#l-4-5" },
      { label: "Cheatsheet D4: dòng “Pre-merge chặn + báo cáo đêm, sếp muốn Batch cả hai”", href: NOTES + "#cheat-d4" }
    ]
  },
  {
    de: 5, n: 27, total: 60, sub: "4.2", subName: "Few-shot cho output ổn định", scen: "S5",
    answer: "D",
    ask: "The reviewer kept flagging intentionally empty catch blocks that carry a best-effort cleanup comment. The team added few-shot examples marking that idiom as acceptable, and now the reviewer also ignores catch blocks that silently swallow real errors. How should the examples be revised?",
    scene: [
      "Reviewer cứ bắt lỗi các catch block (khối bắt lỗi) cố ý để trống, có comment ghi đây là dọn dẹp “best-effort” (làm được thì làm, lỗi cũng không sao).",
      "Team thêm few-shot: các ví dụ ghi kiểu viết này là chấp nhận được.",
      "Giờ reviewer bỏ qua luôn cả catch block nuốt lỗi thật một cách im lặng. Ví dụ minh họa:<pre><code>// cố ý, không báo\ntry { fs.unlinkSync(tmpFile) } catch {} // best-effort cleanup\n\n// bug thật, phải báo\ntry { await saveOrder(order) } catch {}</code></pre>",
      "Chỗ khó: false positive (báo nhầm) hết, nhưng đổi lại sinh false negative (báo sót). Ví dụ mới chỉ nói một phía của ranh giới."
    ],
    asks: [
      "Sửa bộ ví dụ thế nào?",
      "Tức là: dạy Claude chỗ khác nhau giữa catch trống cố ý và catch trống nuốt lỗi thật, không chỉ dạy “catch trống là được”.",
      "Soi từng phương án: nó dạy được ranh giới giữa hai ca, hay chỉ đẩy reviewer sang một phía?"
    ],
    facts: [
      "Few-shot là đặt vài ví dụ input → output vào prompt để Claude bắt chước. Guide khuyên 2–4 ví dụ nhắm đúng ca mơ hồ, mỗi ví dụ kèm lý do. Có lý do, Claude mới khái quát sang ca mới thay vì chỉ khớp bề ngoài.",
      "Một chỗ few-shot phát huy: cặp ví dụ “pattern này team dùng cố ý, không báo” và “pattern kia là bug thật, báo”. Cách này giảm false positive mà vẫn giữ khả năng khái quát.",
      "Docs prompting: ví dụ phải đa dạng, phủ cả edge case, để Claude không học nhầm một pattern ngoài ý muốn.",
      "Confidence chỉ gắn được vào finding đã có. Thứ reviewer đã học là “được” thì không bao giờ thành finding."
    ],
    opts: [
      { k: "A", gist: "Keep the examples as they are and have the reviewer attach a self-rated confidence score to each finding.",
        why: [
          "Catch nuốt lỗi bị coi là bình thường thì không thành finding, nên chẳng có gì để gắn confidence (ý 4).",
          "Confidence giúp sắp xếp finding đã có, không lấy lại được lỗi mà ví dụ đã dạy Claude bỏ qua."
        ] },
      { k: "B", gist: "Remove the examples and tell the reviewer to report every empty catch block as a bug.",
        why: [
          "Quay về false positive ban đầu: catch dọn dẹp cố ý lại bị báo, đúng thứ dev đã kêu.",
          "Đổi lệch phía này sang lệch phía kia, không dạy được chỗ khác nhau giữa hai ca (ý 2)."
        ] },
      { k: "C", gist: "Add more examples of the accepted idiom so the pattern is learned more firmly.",
        why: [
          "Ví dụ nào cũng nói cùng một điều: catch trống là được. Thêm nữa chỉ làm Claude khái quát quá đà mạnh hơn (ý 3).",
          "Số lượng không bù được thông tin còn thiếu: khi nào một ca trông giống lại là lỗi thật.",
          "Dễ bị cuốn vì few-shot đang có tác dụng, thêm thì nghe như tác dụng hơn. Nhưng lỗi nằm ở chỗ ví dụ chỉ có một phía, không phải ở chỗ ít ví dụ."
        ] },
      { k: "D", gist: "Pair each acceptable idiom with a similar-looking genuine defect and state why only one of them is reportable.",
        why: [
          "Đúng kiểu cặp “cố ý, không báo” và “bug thật, báo” (ý 2). Hai ca trông giống nhau nằm cạnh nhau, nên Claude học được ranh giới thay vì học bề ngoài.",
          "Lý do đi kèm cho Claude cách phán đoán (ý 1): catch cố ý có comment ghi rõ việc dọn dẹp làm được thì làm; catch nuốt lỗi làm code phía sau chạy tiếp như thể đã thành công.",
          "Có lý do thì Claude áp được sang biến thể không giống hệt ví dụ."
        ] }
    ],
    refs: [
      { label: "Bài 4.2, mục “Bốn chỗ few-shot phát huy”: cặp ví dụ chấp nhận được và lỗi thật, ví dụ kèm lý do", href: NOTES + "#l-4-2" },
      { label: "Docs “Prompting best practices”, mục ví dụ: đa dạng, phủ edge case, tránh học nhầm pattern", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
    ]
  },
  {
    de: 5, n: 28, total: 60, sub: "3.4", subName: "Plan mode hay làm thẳng", scen: "S5",
    answer: "C",
    ask: "A developer on this team used plan mode to deal with a CI finding that test fixtures are duplicated across 40 modules. Claude proposed a shared fixture design, and the developer agrees with it. What should happen next?",
    scene: [
      "CI báo test fixture (dữ liệu, đối tượng dựng sẵn cho test) bị lặp ở 40 module.",
      "Dev dùng plan mode để xử lý. Claude đã đọc các module, đề xuất thiết kế fixture dùng chung, dev đồng ý.",
      "Chỗ khó: thiết kế đã chốt. Câu hỏi giờ là bước chuyển từ lên kế hoạch sang làm, sao cho không mất những gì Claude vừa tìm hiểu."
    ],
    asks: [
      "Bước tiếp theo nên là gì?",
      "Tức là: cách ra khỏi plan mode để bắt đầu sửa code, mà vẫn giữ hiểu biết về 40 module Claude vừa gom được.",
      "Soi từng phương án: Claude có sửa được file không? Context lúc lập kế hoạch còn không? Có đặt thứ dùng một lần vào chỗ nạp ở mọi phiên không?"
    ],
    facts: [
      "Plan mode: Claude đọc file, chạy lệnh để tìm hiểu, viết kế hoạch, nhưng không sửa code. Edit bị chặn tới khi dev duyệt kế hoạch (ngoại lệ: phiên terminal có sẵn bypass permissions).",
      "Claude trình kế hoạch xong thì hỏi: “Yes, and use auto mode” (duyệt, chạy auto mode), “Yes, manually approve edits” (duyệt, tự xem từng edit), hay “No, keep planning” (ở lại plan mode, sửa tiếp kế hoạch). Duyệt thì phiên ra khỏi plan mode, sang mode đã chọn, và Claude bắt đầu sửa.",
      "Duyệt xong vẫn là phiên đó, nên những gì Claude đọc lúc lập kế hoạch vẫn còn. Chỉ khi bật setting <code>showClearContextOnPlanAccept</code> mới có thêm lựa chọn duyệt kèm xóa context lập kế hoạch.",
      "CLAUDE.md nạp vào mọi phiên, dành cho quy ước dùng lâu dài, không phải kế hoạch của một lần refactor."
    ],
    opts: [
      { k: "A", gist: "Copy the fixture design into the project <code>CLAUDE.md</code> so that future sessions apply it automatically.",
        why: [
          "Sai chỗ đặt: CLAUDE.md nạp vào mọi phiên (ý 4). Kế hoạch dùng một lần thành context thường trực, phiên nào cũng phải gánh.",
          "Mà refactor vẫn chưa được làm. Ghi kế hoạch vào đâu thì 40 module cũng chưa ai sửa."
        ] },
      { k: "B", gist: "Stay in plan mode and tell Claude to start editing each module listed in the plan.",
        why: [
          "Plan mode là để lên kế hoạch, không sửa (ý 1). Kế hoạch chưa được duyệt nên edit vẫn bị chặn.",
          "Bảo Claude sửa trong mode này là đi ngược mục đích của mode, việc sửa không bắt đầu được.",
          "Dễ bị cuốn vì nghe như đi thẳng vào việc chính, đỡ một bước. Nhưng bước duyệt chính là cửa ra khỏi plan mode."
        ] },
      { k: "C", gist: "Approve the plan so that the session leaves plan mode and Claude implements the agreed design.",
        why: [
          "Duyệt kế hoạch là đúng cửa ra: phiên ra khỏi plan mode, sang mode dev chọn (auto hay tự xem từng edit), rồi Claude bắt đầu sửa (ý 2).",
          "Vẫn là phiên đó, nên hiểu biết về import, dependency, fixture của 40 module vẫn còn trong context (ý 3). Code sửa ra khớp với thiết kế vừa chốt."
        ] },
      { k: "D", gist: "Open a new session and paste the plan text in as the first implementation prompt.",
        why: [
          "Phiên mới không còn gì Claude đã đọc ở 40 module. Nó phải tìm hiểu lại các dependency mà kế hoạch đã tính sẵn.",
          "Chạy được, nhưng bỏ mất cái lợi chính của việc lên kế hoạch trước, và dễ phải làm lại."
        ] }
    ],
    refs: [
      { label: "Bài 3.4: plan mode không sửa file tới khi duyệt kế hoạch; hai pha, hai chế độ; mục “Biết thêm”: plan là một permission mode", href: NOTES + "#l-3-4" },
      { label: "Docs “Permission modes”, mục Plan mode: các lựa chọn khi duyệt kế hoạch và mode sau khi duyệt", href: "https://code.claude.com/docs/en/permission-modes" }
    ]
  },
  {
    de: 5, n: 29, total: 60, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema", scen: "S5",
    answer: "C",
    ask: "A CI job asks Claude to return test-case suggestions for each pull request as JSON inside the response text. The step that posts the PR comment sometimes rejects the output as malformed or missing a required field. Which change most reliably eliminates these rejections?",
    scene: [
      "Job CI nhờ Claude gợi ý test case cho mỗi PR, trả về dạng JSON nằm trong phần text của response.",
      "Bước đăng comment lên PR thỉnh thoảng từ chối output: JSON hỏng, hoặc thiếu một trường bắt buộc.",
      "Chỗ khó: đề hỏi “most reliably” (chắc nhất). Cần cách làm cho lỗi không còn chỗ xảy ra, không phải giảm tỉ lệ hay vá sau."
    ],
    asks: [
      "Đổi gì để hết bị từ chối một cách chắc nhất?",
      "Tức là: đưa output ra khỏi kênh text, sang một kênh mà hình dạng JSON được bảo đảm.",
      "Soi từng phương án: Claude vẫn tự viết chữ trông giống JSON, hay đang điền tham số theo một schema được ép?"
    ],
    facts: [
      "Xin JSON trong prompt thì Claude vẫn đang viết văn, chỉ là văn trông giống JSON. Dặn kỹ tới đâu cũng là xác suất: vẫn có lúc hỏng cú pháp, thiếu trường.",
      "Định nghĩa một tool có <code>input_schema</code> đúng hình dạng cần lấy, rồi đọc <code>input</code> của block <code>tool_use</code>. Claude điền tham số cho một hàm chứ không viết văn. Bật thêm <code>strict: true</code> thì input chắc chắn khớp schema: đủ trường bắt buộc, đúng kiểu.",
      "Vẫn phải kiểm <code>stop_reason</code>: là <code>refusal</code> hay <code>max_tokens</code> thì output có thể không hoàn chỉnh. Và schema chỉ lo cú pháp, không lo nội dung có đúng không.",
      "Gọi lại khi hỏng mà không đổi gì chỉ là cầu may: lần sau vẫn ra text, vẫn có thể hỏng."
    ],
    opts: [
      { k: "A", gist: "Rewrite the instruction to demand complete, valid JSON only, listing every required field and forbidding any commentary.",
        why: [
          "Dặn chặt hơn thì đỡ hơn, nhưng output vẫn nằm trong text (ý 1). Thiếu một trường hay lệch một ngoặc vẫn xảy ra được.",
          "Lời dặn cho ra tuân thủ theo xác suất, không bảo đảm hình dạng."
        ] },
      { k: "B", gist: "Wrap the comment-posting step in a retry loop that resends the diff whenever the payload is rejected as malformed or incomplete.",
        why: [
          "Gọi lại thường cũng ra được bản đúng, nhưng chỉ là đổ xúc xắc lại (ý 4). Lần nào lỗi cũng vẫn có chỗ xảy ra.",
          "Thêm độ trễ và chi phí cho một bước dev đang chờ, mà kênh text vẫn không đáng tin hơn."
        ] },
      { k: "C", gist: "Define a test-suggestion tool with <code>strict</code> set to true whose input schema is the payload structure, and read the <code>tool_use</code> input.",
        why: [
          "Đổi kênh: Claude điền tham số theo <code>input_schema</code>, không viết văn (ý 2). <code>strict: true</code> ép input khớp schema, nên JSON không hỏng và không thiếu trường bắt buộc.",
          "Job đọc thẳng <code>input</code> của block <code>tool_use</code>. Tool không chạy gì cả, nó chỉ là cái khuôn để output về đúng hình dạng.",
          "Vẫn kiểm <code>stop_reason</code> cho ca refusal hay <code>max_tokens</code> (ý 3). Còn JSON hỏng hay thiếu trường thì không còn chỗ xảy ra."
        ] },
      { k: "D", gist: "Add a post-processing stage that repairs malformed JSON with a lenient parser and fills missing fields with default values.",
        why: [
          "Vá sau thay vì chặn trước. Parser dễ dãi chỉ vá các kiểu hỏng đã gặp, kiểu hỏng mới lại lọt.",
          "Điền giá trị mặc định cho trường thiếu là bịa dữ liệu: comment trên PR trông đủ, nhưng nội dung không do Claude đưa ra.",
          "Dễ bị cuốn vì cách này không đụng tới prompt hay API, chỉ thêm code. Nhưng đã có cơ chế cho output đúng schema ngay từ đầu thì không cần lớp vá."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, mục “Chuyện gì đang xảy ra”: tool + input_schema, strict: true, nhớ kiểm stop_reason", href: NOTES + "#l-4-3" },
      { label: "Cheatsheet D4: dòng “JSON bọc fence, thừa dấu phẩy, parser crash”: tool_use với input_schema (+ strict)", href: NOTES + "#cheat-d4" }
    ]
  },
  {
    de: 5, n: 30, total: 60, sub: "2.1", subName: "Thiết kế tool: description rõ, ranh giới rõ", scen: "S4",
    answer: "AB",
    ask: "The team's system prompt tells the agent to “search for relevant context before answering.” A connected MCP server provides a <code>search_tickets</code> tool, and logs show the agent calling it for code questions instead of using Grep. Which TWO changes fix this misrouting most directly? (Select TWO.)",
    scene: [
      "System prompt của team dặn agent “search for relevant context before answering” (tìm context liên quan trước khi trả lời).",
      "Một MCP server được nối vào, có tool <code>search_tickets</code> (tìm ticket trong issue tracker).",
      "Log cho thấy với câu hỏi về code, agent gọi <code>search_tickets</code> thay vì Grep.",
      "Chỗ khó: chữ “search” trong system prompt trùng với tên tool. Lời dặn và tên tool kéo nhau, dù không ai cố ý ghép."
    ],
    asks: [
      "Hai thay đổi nào sửa trực tiếp nhất việc chọn nhầm tool này?",
      "Tức là: cắt mối liên tưởng giữa lời dặn “search” và tool <code>search_tickets</code>, từ hai phía: lời dặn và description của tool.",
      "Soi từng phương án: nó đụng tới thứ Claude dựa vào khi chọn tool, hay chỉ ép có gọi tool, hay cấm theo kiểu dễ chặn nhầm?"
    ],
    facts: [
      "Claude chọn tool dựa vào <code>name</code>, <code>description</code>, <code>input_schema</code>. Guide: description là cơ chế chính. Description tốt có ranh giới: khi nào dùng tool này, khi nào không.",
      "System prompt cũng ảnh hưởng: một câu dặn có từ khóa có thể tạo liên tưởng ngoài ý muốn với tool trùng chữ, đè lên description tốt. Debug chọn nhầm tool thì đọc lại cả system prompt.",
      "<code>tool_choice: any</code> bắt buộc gọi một tool nào đó, không quyết định tool nào.",
      "Docs prompting: các model gần đây nhạy với system prompt hơn, lời dặn gắt kiểu “CRITICAL: You MUST use this tool when…” dễ làm phản ứng quá đà. Docs khuyên viết bình thường, kiểu “Use this tool when…” (dùng tool này khi…)."
    ],
    opts: [
      { k: "A", gist: "Reword the instruction to name the intended behavior, such as using Grep to find code, instead of a generic “search” directive.",
        why: [
          "Sửa phía lời dặn (ý 2): bỏ chữ “search” chung chung, nói rõ việc cần làm, ví dụ dùng Grep để tìm code liên quan.",
          "Không còn từ khóa trùng với tên <code>search_tickets</code>, nên lời dặn không kéo agent về tool ticket nữa."
        ] },
      { k: "B", gist: "Add boundary text to the <code>search_tickets</code> description saying it covers issue tracker tickets only, not source code.",
        why: [
          "Sửa phía tool (ý 1): description nói rõ ranh giới, chỉ cho ticket trong issue tracker, không cho source code.",
          "Gặp câu hỏi về code, Claude có lý do rõ để loại <code>search_tickets</code> ra.",
          "A cắt từ khóa gây liên tưởng, B cho ranh giới để loại tool sai. Hai phía của cùng một mối liên tưởng."
        ] },
      { k: "C", gist: "Set <code>tool_choice</code> to <code>\"any\"</code> so the agent must call some tool before answering any code question.",
        why: [
          "<code>any</code> chỉ ép có gọi tool, không chọn tool nào (ý 3).",
          "Agent đã đang gọi tool rồi, chỉ là gọi nhầm. Ép gọi tool không đụng tới vấn đề."
        ] },
      { k: "D", gist: "Add a capitalized rule that the agent MUST NEVER call <code>search_tickets</code> unless the user explicitly mentions a ticket number.",
        why: [
          "Chặn quá tay: hỏi về ticket mà không ghi số ticket cũng bị cấm, dù đó là việc đúng của tool. Ví dụ minh họa: “có ticket nào về lỗi đăng nhập không?”.",
          "Lời dặn “search” chung chung vẫn còn, nên mối liên tưởng gốc vẫn nằm đó. Viết hoa “MUST NEVER” (không bao giờ được) chỉ làm câu cấm nổi hơn, vẫn là chỉ dẫn theo xác suất, và docs còn khuyên bỏ kiểu giọng gắt này (ý 4).",
          "Dễ bị cuốn vì cấm thẳng nghe như chắc ăn nhất. Nhưng nó chặn cả việc đúng và không sửa nguyên nhân."
        ] }
    ],
    refs: [
      { label: "Bài 2.1, mục “Hai bẫy nữa trong cùng chủ đề”: system prompt nhạy từ khóa đè lên description; description có ranh giới", href: NOTES + "#l-2-1" },
      { label: "Bài 4.3, mục “Ép model gọi tool bằng tool_choice”: any chỉ ép có gọi tool", href: NOTES + "#l-4-3" },
      { label: "Docs “Prompting best practices”: bỏ giọng gắt kiểu “CRITICAL: You MUST”, viết “Use this tool when…”", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
    ]
  },
  {
    de: 5, n: 31, total: 60, sub: "3.2", subName: "Slash command và skill", scen: "S4",
    answer: "A",
    ask: "Each time the team's <code>/scaffold-module</code> skill runs, it writes several boilerplate files, and developers get a permission prompt for every one of those writes. The team wants file writes to go through without a prompt, but only while this skill is running. What should the team change?",
    scene: [
      "Skill <code>/scaffold-module</code> của team sinh vài file khung (boilerplate) mỗi lần chạy.",
      "Mỗi lần ghi file, Claude Code lại hỏi quyền. Dev phải bấm duyệt từng file một.",
      "Chỗ khó: team muốn bỏ hỏi quyền cho việc ghi file, nhưng “only while this skill runs” (chỉ trong lúc skill này chạy). Cách nào bỏ hỏi quyền rộng hơn phạm vi đó là trái đề."
    ],
    asks: [
      "Team nên đổi gì?",
      "Tức là: tìm chỗ cấp quyền gắn với đúng skill này, không áp cho cả phiên hay cả project.",
      "Soi từng phương án hai điều: nó có thật sự cấp quyền không, hay chỉ là lời dặn? Phạm vi cấp quyền có vừa đúng lúc skill chạy không?"
    ],
    facts: [
      "<code>allowed-tools</code> trong frontmatter của <code>SKILL.md</code> là danh sách tool được duyệt sẵn: Claude dùng chúng không cần hỏi quyền, trong lượt skill được gọi. Tool ngoài danh sách vẫn theo luật quyền bình thường.",
      "Luật <code>permissions.allow</code> trong <code>.claude/settings.json</code> áp cho mọi phiên của project, không gắn với skill nào.",
      "Quyền dùng tool do Claude Code thực thi. Chữ trong nội dung skill hay CLAUDE.md chỉ là chỉ dẫn cho model, không cấp hay rút quyền được.",
      "Plan mode là chế độ chỉ đọc: Claude khám phá code và viết kế hoạch, không sửa file nào cho đến khi bạn duyệt."
    ],
    opts: [
      { k: "A", gist: "Add an <code>allowed-tools</code> entry that lists Write to the frontmatter of the skill's <code>SKILL.md</code>.",
        why: [
          "Đúng chỗ, đúng phạm vi. <code>allowed-tools: Write</code> duyệt sẵn Write trong lượt gọi skill (ý 1), nên các file khung được ghi mà không hỏi.",
          "Làm việc khác ngoài skill thì Write vẫn hỏi như cũ. Đúng chữ “only while this skill runs”.",
          "Đây là quyền do Claude Code thực thi, không phải lời dặn (ý 3), nên lần nào cũng có hiệu lực."
        ] },
      { k: "B", gist: "Run the skill in plan mode so its file writes go through without prompting.",
        why: [
          "Sai ở giả định: plan mode không làm việc ghi file trơn tru hơn, nó không cho sửa file nào cả (ý 4).",
          "Skill sinh file khung chạy trong plan mode thì chỉ ra được kế hoạch, không ra file nào. Hết hỏi quyền nhưng cũng hết việc."
        ] },
      { k: "C", gist: "Write in the skill's instructions that file writes are pre-approved and need no confirmation.",
        why: [
          "Sai ở giả định: nội dung skill là chỉ dẫn cho model, không cấp quyền được (ý 3).",
          "Claude đọc câu đó rồi vẫn gọi Write, và Claude Code vẫn hiện hộp hỏi quyền như trước. Không có gì thay đổi."
        ] },
      { k: "D", gist: "Add Write to <code>permissions.allow</code> in the project's <code>.claude/settings.json</code>.",
        why: [
          "Chạy được: hết hỏi quyền khi ghi file.",
          "Nhưng rộng quá. Luật này áp cho mọi phiên của project (ý 2), nên mọi lần ghi file, kể cả ngoài skill, đều mất bước duyệt. Trái chữ “only while this skill runs”.",
          "Dễ bị cuốn vì <code>permissions.allow</code> đúng là cách quen để bỏ hỏi quyền. Nhưng đề khoanh phạm vi vào một skill, và chỉ frontmatter của skill mới gắn quyền với đúng lượt skill chạy."
        ] }
    ],
    refs: [
      { label: "Bài 3.2: allowed-tools là danh sách tool duyệt sẵn trong lượt skill chạy", href: NOTES + "#l-3-2" },
      { label: "Bài 3.4: plan mode là chế độ chỉ đọc", href: NOTES + "#l-3-4" },
      { label: "Docs Skills: mục “Pre-approve tools for a skill”", href: "https://code.claude.com/docs/en/skills#pre-approve-tools-for-a-skill" }
    ]
  },
  {
    de: 5, n: 32, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code", scen: "S4",
    answer: "A",
    ask: "The team wants the agent to read GitHub issues and pull requests, and also to query an internal on-call catalog: a service behind a proprietary HTTP API that lists who is on call for each microservice. A developer suggests writing a custom MCP server for each of the two. What should the team do instead?",
    scene: [
      "Agent cần hai nguồn: GitHub (issue và pull request), và catalog trực on-call nội bộ, cho biết ai đang trực cho từng microservice.",
      "Catalog này là service riêng của công ty, gọi qua một HTTP API “proprietary” (của riêng công ty, không theo chuẩn công khai nào).",
      "Một dev đề xuất tự viết MCP server cho cả hai. Chỗ khó: hai hệ khác hẳn nhau. Một bên là tích hợp phổ biến ai cũng dùng, một bên chỉ công ty này có."
    ],
    asks: [
      "Team nên làm gì thay cho đề xuất đó?",
      "Tức là: với từng hệ, dùng server có sẵn hay tự viết, và chọn theo tiêu chí nào.",
      "Soi từng phương án: nó xử từng hệ ra sao? Có tốn công viết lại thứ đã có sẵn không? Có bỏ trống hệ nào không?"
    ],
    facts: [
      "Tích hợp phổ biến như GitHub, Jira, Slack đã có MCP server do nhà cung cấp hoặc cộng đồng viết sẵn và bảo trì. Chỉ tự viết server cho workflow đặc thù của team.",
      "MCP server mang sẵn tool có <code>name</code>, <code>description</code> và schema tham số. Kết nối xong, Claude Code tự lấy danh sách tool của server, và agent chọn tool dựa vào các mô tả đó.",
      "Gắn server nào vào Claude Code cũng chỉ là cấu hình: <code>claude mcp add</code>, hoặc khai trong <code>.mcp.json</code> ở gốc repo (commit được, token để dạng <code>${TÊN_BIẾN}</code>)."
    ],
    opts: [
      { k: "A", gist: "Reuse an existing GitHub MCP server, and write a custom MCP server only for the internal on-call catalog.",
        why: [
          "Mỗi hệ một cách, đúng tiêu chí (ý 1). GitHub là tích hợp phổ biến, đã có server sẵn với tool và mô tả đầy đủ (ý 2). Không cần viết lại.",
          "Catalog on-call chỉ công ty này có, API riêng, nên không có server sẵn. Đây đúng là chỗ đáng tự viết.",
          "Khai cả hai trong <code>.mcp.json</code> (ý 3) là cả team cùng có."
        ] },
      { k: "B", gist: "Hold off on both integrations until the Anthropic Directory lists a reviewed connector for each system.",
        why: [
          "Sai ở giả định: không cần chờ ai liệt kê. Server nào cũng gắn được bằng cấu hình (ý 3), kể cả server team tự viết.",
          "Catalog nội bộ gần như không bao giờ có connector công khai. Chờ là treo việc vô thời hạn, kéo theo cả phần GitHub vốn làm được ngay."
        ] },
      { k: "C", gist: "Have the agent call the GitHub REST API with curl through Bash, without connecting any MCP server.",
        why: [
          "Chạy được, nhưng bỏ mất thứ MCP server mang lại: tool có mô tả và schema rõ để agent chọn (ý 2). Agent phải tự ráp URL, header, tham số cho từng lệnh curl.",
          "Phương án này cũng không nói gì tới catalog on-call. Trong khi server GitHub có sẵn, gắn vào chỉ tốn vài dòng cấu hình."
        ] },
      { k: "D", gist: "Write custom MCP servers for both systems, so the team fully controls tool names and descriptions.",
        why: [
          "Đúng cho catalog, sai cho GitHub. Viết lại server cho tích hợp phổ biến là làm lại thứ đã có, rồi phải tự bảo trì mỗi khi API GitHub đổi (ý 1).",
          "Dễ bị cuốn vì “toàn quyền đặt tên và mô tả tool” nghe như cách chống chọn nhầm tool. Nhưng server GitHub có sẵn đã có mô tả đầy đủ. Quyền đó không đáng công viết và nuôi cả một server."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, đoạn cuối: tích hợp phổ biến dùng server có sẵn, chỉ tự viết server cho workflow đặc thù", href: NOTES + "#l-2-4" },
      { label: "Cheatsheet D2: dòng “Tích hợp Jira/GitHub chuẩn”", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 5, n: 33, total: 60, sub: "3.5", subName: "Tinh chỉnh lặp: ví dụ input/output, test trước, interview", scen: "S4",
    answer: "BC",
    ask: "An engineer wants the agent to add caching to a poorly understood legacy service. The agent's tools list holds only <code>Read</code>, <code>Grep</code>, <code>Glob</code> and <code>Write</code>. Which two steps let the agent apply the interview pattern before it implements anything? (Choose two.)",
    scene: [
      "Kỹ sư nhờ agent thêm cache cho một service cũ (legacy) mà chưa ai nắm rõ.",
      "Agent được cấu hình với danh sách <code>tools</code> chỉ có <code>Read</code>, <code>Grep</code>, <code>Glob</code>, <code>Write</code>.",
      "Chỗ khó: dùng interview pattern cần hai thứ. Một là Claude được dặn hỏi lại người trước khi code. Hai là có đường để câu hỏi tới được người. Danh sách tool kia thiếu thứ hai."
    ],
    asks: [
      "Hai bước nào giúp agent dùng được interview pattern trước khi viết code?",
      "Tức là: một bước để Claude chịu hỏi đúng chỗ khó, một bước để câu hỏi thật sự tới tay kỹ sư.",
      "Soi từng phương án: nó lo vế nào, và vế đó có chạy được thật trong cấu hình này không?"
    ],
    facts: [
      "Interview pattern: bảo Claude đặt câu hỏi cho bạn trước khi viết code, để lộ ra các quyết định bạn chưa nghĩ tới. Hợp nhất khi domain lạ. Ví dụ làm cache: invalidation (khi nào bỏ dữ liệu cache cũ), fail thì sao, TTL bao lâu.",
      "Trong Agent SDK, Claude hỏi người qua tool có sẵn <code>AskUserQuestion</code>, app nhận câu hỏi qua callback <code>canUseTool</code>. Mặc định tool này có sẵn. Nhưng đã khai mảng <code>tools</code> để giới hạn tool thì phải đưa <code>AskUserQuestion</code> vào, không thì Claude không hỏi được.",
      "Docs ghi: <code>AskUserQuestion</code> hiện chưa dùng được trong subagent tạo qua tool Agent.",
      "Độ tự tin model tự chấm (confidence tự báo) lệch xa độ đúng thật. Model hay tự tin đúng ở chỗ nó sai."
    ],
    opts: [
      { k: "A", gist: "Hand the questioning to a subagent spawned through the Agent tool, so the main context stays uncluttered.",
        why: [
          "Sai ở giả định: subagent tạo qua tool Agent không dùng được <code>AskUserQuestion</code> (ý 3). Nó không có đường nào để hỏi kỹ sư.",
          "Cách ly context là lợi ích thật của subagent, nhưng cho việc khám phá dài dòng. Cuộc hỏi đáp cần tới tay người thì không giao cho subagent được."
        ] },
      { k: "B", gist: "Tell the agent to question the engineer about invalidation rules, failure modes and tradeoffs before it writes any code.",
        why: [
          "Đây là phần lõi của interview pattern (ý 1): Claude hỏi về chỗ khó trước khi viết code.",
          "Với cache trên service cũ, quy tắc invalidation và cách xử lý khi fail đúng là những quyết định agent sẽ tự đoán nếu chỉ được bảo “thêm cache đi”.",
          "B lo vế “Claude chịu hỏi”. Vế “câu hỏi tới được người” là việc của C."
        ] },
      { k: "C", gist: "Add <code>AskUserQuestion</code> to the agent's tools list so its clarifying questions can actually reach the engineer.",
        why: [
          "Lo vế còn lại. Danh sách <code>tools</code> đang khai tường minh mà thiếu <code>AskUserQuestion</code>, nên Claude không có tool để hỏi (ý 2).",
          "Thêm vào thì câu hỏi đi qua <code>canUseTool</code>: app hiện cho kỹ sư chọn, rồi trả câu trả lời về cho Claude.",
          "Dễ bỏ sót vì mặc định tool này có sẵn. Nhưng đã khai <code>tools</code> là chỉ còn đúng những gì có trong danh sách."
        ] },
      { k: "D", gist: "Have the agent rate its own confidence in a design and ask questions only when that score drops below a threshold.",
        why: [
          "Sai ở chỗ dựa vào confidence tự báo (ý 4). Trong service lạ, model không biết mình thiếu gì, nên có thể tự chấm cao đúng ở chỗ nó đoán sai.",
          "Interview pattern hỏi ngay từ đầu, không đợi model tự thấy mình chưa chắc. Mà kể cả có ngưỡng, thiếu <code>AskUserQuestion</code> thì vẫn không hỏi được.",
          "Dễ bị cuốn vì nghe tiết kiệm: chỉ hỏi khi cần. Nhưng “khi cần” lại do chính model tự phán, mà đó là thứ không đáng tin."
        ] }
    ],
    refs: [
      { label: "Bài 3.5: interview pattern cho domain lạ, ví dụ làm cache", href: NOTES + "#l-3-5" },
      { label: "Mở đầu, 8 luật chọn đáp án: nghi ngờ confidence tự báo", href: NOTES + "#l-0-3" },
      { label: "Docs Agent SDK “Handle approvals and user input”: thêm AskUserQuestion vào mảng tools; mục Limitations: subagent chưa dùng được AskUserQuestion", href: "https://code.claude.com/docs/en/agent-sdk/user-input" }
    ]
  },
  {
    de: 5, n: 34, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code", scen: "S4",
    answer: "C",
    ask: "The team has connected an MCP server whose <code>search_symbols</code> tool searches a prebuilt index covering dozens of repositories, yet the tool's description reads only “Searches code.” The agent almost always reaches for Grep instead and misses matches outside the current checkout. What should the team change first?",
    scene: [
      "Team gắn một MCP server có tool <code>search_symbols</code>. Tool này tìm trong một index dựng sẵn của hàng chục repo.",
      "Description của tool chỉ ghi “Searches code.” (Tìm code.).",
      "Kết quả: agent gần như luôn dùng Grep built-in, nên bỏ sót các chỗ khớp nằm ngoài bản checkout (code đang có trên máy).",
      "Chỗ khó: đề hỏi “first” (trước tiên), tức bước rẻ nhất mà sửa đúng gốc."
    ],
    asks: [
      "Team nên đổi gì trước tiên?",
      "Tức là: hiểu vì sao agent chọn Grep, rồi sửa đúng chỗ đó.",
      "Soi từng phương án: nó sửa nguyên nhân hay chỉ ép agent chọn? Nó có làm hỏng việc Grep đang làm tốt không?"
    ],
    facts: [
      "Claude chọn tool dựa vào <code>name</code>, <code>description</code>, <code>input_schema</code>. Description là cơ chế chính. Description sơ sài thì chọn giữa các tool na ná nhau sẽ không đáng tin.",
      "Agent hay chọn Grep hơn MCP tool vì Grep có mô tả đầy đủ, còn MCP tool chỉ ghi vài chữ. Cách sửa không phải tắt Grep, mà là mô tả MCP tool chi tiết: tìm được gì, trả về gì, khi nào dùng thay cho Grep.",
      "Hai tool có tên hay mô tả gần giống nhau (chồng lấn) thì Claude càng khó phân biệt. Guide sửa chồng lấn bằng cách đặt tên và viết mô tả cho khác hẳn nhau.",
      "Luật chọn đáp án: sửa đúng gốc với công sức nhỏ nhất. Tool bị chọn nhầm vì description sơ sài thì sửa description trước."
    ],
    opts: [
      { k: "A", gist: "Add a system prompt rule telling the agent to always call <code>search_symbols</code> before falling back to Grep for any code search.",
        why: [
          "Không sửa gốc: description vẫn chỉ là “Searches code.” (ý 1). Prompt chỉ đè thêm một lời dặn, model có thể theo hoặc không.",
          "Còn làm hỏng việc khác: “always” (luôn luôn) ép cả những lần tìm trong vài file ngay trên máy, chỗ Grep vừa nhanh vừa đúng, cũng phải đi qua index."
        ] },
      { k: "B", gist: "Remove Grep from the agent's allowed tools so <code>search_symbols</code> becomes the only way left to search code across the repositories.",
        why: [
          "Ép chọn bằng cách lấy bớt công cụ, không phải bằng cách cho model đủ thông tin để chọn đúng (ý 2).",
          "Agent mất Grep cho việc dò từng bước trong bản checkout, việc chính của một công cụ cho dev.",
          "Dễ bị cuốn vì nó chắc chắn hết cảnh dùng nhầm Grep. Nhưng đề hỏi bước đầu tiên, và gốc nằm ở description, không phải ở chỗ Grep tồn tại."
        ] },
      { k: "C", gist: "Rewrite the <code>search_symbols</code> description to say what it returns, when to use it instead of Grep, and that it covers many repositories.",
        why: [
          "Sửa đúng gốc (ý 1, ý 2). Description mới nói rõ thứ Grep không làm được: index dựng sẵn, phủ hàng chục repo, và trả về gì.",
          "Có ranh giới “khi nào dùng thay cho Grep” thì agent chọn <code>search_symbols</code> cho việc tìm xuyên repo, vẫn giữ Grep cho việc tìm trong bản checkout.",
          "Chỉ sửa một đoạn chữ, rẻ nhất mà trúng nguyên nhân (ý 4). Đúng chữ “first”."
        ] },
      { k: "D", gist: "Rename the tool to <code>grep_symbols</code> so the agent links it with the Grep behavior it already picks reliably.",
        why: [
          "Làm ngược hướng: tên giống Grep thì hai tool càng chồng lấn (ý 3), model càng khó biết khi nào dùng cái nào.",
          "Description vẫn chỉ là “Searches code.” Không chữ nào nói index phủ nhiều repo, nên agent vẫn không có lý do chọn nó cho đúng việc đó."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, mục “Vì sao agent thích Grep hơn MCP tool”", href: NOTES + "#l-2-4" },
      { label: "Bài 2.1: description là cơ chế chính để chọn tool; sửa chồng lấn bằng tên và mô tả khác hẳn nhau", href: NOTES + "#l-2-1" },
      { label: "Mở đầu, 8 luật chọn đáp án: sửa đúng gốc, công sức nhỏ nhất", href: NOTES + "#l-0-3" }
    ]
  },
  {
    de: 5, n: 35, total: 60, sub: "1.3", subName: "Gọi subagent, truyền context", scen: "S4",
    answer: "B",
    ask: "A developer defines <code>codebase-explorer</code> and <code>boilerplate-writer</code> subagents with <code>AgentDefinition</code> and sets the coordinator's <code>allowedTools</code> to Read, Grep, Glob and Bash. In unattended runs, where any tool not on the list is denied, the coordinator never delegates and explores everything itself. What change makes delegation work?",
    scene: [
      "Dev khai hai subagent bằng <code>AgentDefinition</code>: <code>codebase-explorer</code> (dò codebase) và <code>boilerplate-writer</code> (viết code khung).",
      "<code>allowedTools</code> của coordinator: Read, Grep, Glob, Bash.",
      "Lúc chạy không người (unattended), tool nào không có trong danh sách là bị từ chối. Kết quả: coordinator không bao giờ giao việc, tự dò hết mọi thứ.",
      "Chỗ khó: subagent đã khai đủ, nên dễ nghĩ lỗi nằm ở subagent hay ở prompt. Thật ra danh sách kia thiếu đúng một tool."
    ],
    asks: [
      "Đổi gì để coordinator giao việc được?",
      "Tức là: tìm thứ coordinator cần để tạo subagent mà danh sách hiện tại đang thiếu.",
      "Soi từng phương án: nó sửa ở bên gọi (coordinator) hay bên được gọi (subagent)? Nó có gỡ được lệnh từ chối không?"
    ],
    facts: [
      "Coordinator tạo subagent bằng cách gọi Task tool (docs mới gọi là <code>Agent</code>). Gọi subagent cũng là một tool call, chịu cùng luật quyền như Read hay Bash.",
      "Theo guide, <code>allowedTools</code> của coordinator phải có <code>\"Task\"</code>. Thiếu nó thì <code>AgentDefinition</code> khai đủ đến đâu cũng không gọi được. Đề còn nói rõ: tool ngoài danh sách bị từ chối.",
      "Trường <code>tools</code> của subagent chỉ quyết định subagent dùng được gì khi đã chạy. Subagent chỉ cần tool tạo subagent khi chính nó muốn tạo subagent con.",
      "Quy tắc bắt buộc nằm ở cấu hình hoặc code. Prompt chỉ khuyến khích, không gỡ được một lệnh từ chối."
    ],
    opts: [
      { k: "A", gist: "Register each subagent as an MCP server in <code>.mcp.json</code> so it shows up in the coordinator's tool list.",
        why: [
          "Sai công cụ: MCP server để nối hệ bên ngoài (GitHub, Jira, database), không phải cách khai hay gọi subagent của SDK.",
          "Subagent đã khai bằng <code>AgentDefinition</code> rồi. Thứ thiếu là quyền gọi tool tạo subagent (ý 1, ý 2). Bọc lại thành MCP server là thêm cả một lớp mà vẫn không chạm chỗ đó."
        ] },
      { k: "B", gist: "Add <code>\"Task\"</code> (named <code>\"Agent\"</code> in current SDK versions) to the coordinator's <code>allowedTools</code>.",
        why: [
          "Đúng gốc. Giao việc là một tool call (ý 1). Tool đó không có trong <code>allowedTools</code>, nên ở chế độ chạy không người, lần nào gọi cũng bị từ chối (ý 2).",
          "Thêm vào là coordinator gọi được hai subagent ngay, không phải đổi gì trong định nghĩa của chúng."
        ] },
      { k: "C", gist: "Add <code>\"Task\"</code> to each subagent's <code>tools</code> field so the subagents can accept delegated work.",
        why: [
          "Sửa nhầm bên. <code>tools</code> của subagent chỉ lo việc subagent làm gì khi đã chạy (ý 3). Việc tạo subagent là của coordinator.",
          "Coordinator vẫn thiếu tool đó, vẫn bị từ chối như cũ.",
          "Dễ bị cuốn vì đúng tên tool cần thêm. Nhưng thêm nhầm chỗ: luật “cần Task” áp cho bên gọi, không phải bên được gọi."
        ] },
      { k: "D", gist: "Rewrite the coordinator's system prompt to tell it explicitly to delegate exploration to the subagents.",
        why: [
          "Prompt có thể làm coordinator muốn giao việc hơn. Nhưng mỗi lần nó thử gọi, lệnh vẫn bị từ chối vì tool không có trong danh sách (ý 2, ý 4).",
          "Lỗi nằm ở quyền, không nằm ở chỗ coordinator không biết nên giao việc."
        ] }
    ],
    refs: [
      { label: "Bài 1.3: coordinator phải có \"Task\" trong allowedTools mới gọi được subagent", href: NOTES + "#l-1-3" },
      { label: "Cheatsheet D1: dòng “Coordinator không tạo được subagent”", href: NOTES + "#cheat-d1" },
      { label: "Docs “Subagents in the SDK”: Claude gọi subagent qua tool Agent (tên cũ Task)", href: "https://code.claude.com/docs/en/agent-sdk/subagents" }
    ]
  },
  {
    de: 5, n: 36, total: 60, sub: "1.5", subName: "Hook của Agent SDK: chặn tool call và chuẩn hóa dữ liệu", scen: "S4",
    answer: "C",
    ask: "A <code>PreToolUse</code> hook on the agent's migration tool denies every call, to enforce the rule that production migrations must be handed off to a DBA. The tool's <code>target</code> argument selects production or staging, and staging migrations are now blocked too. How should the hook be fixed?",
    scene: [
      "Luật: migration lên production phải giao cho DBA (người quản trị database) chạy, agent không được tự chạy.",
      "Team gắn một hook <code>PreToolUse</code> vào tool migration, và hook từ chối mọi lần gọi.",
      "Tool có tham số <code>target</code> chọn production hay staging. Giờ migration lên staging cũng bị chặn luôn.",
      "Chỗ khó: chặn production vẫn phải chắc chắn, chỉ cần mở lại staging. Ví dụ minh họa:<pre><code>run_migration({ target: \"production\" })  → phải chặn\nrun_migration({ target: \"staging\" })     → phải cho qua</code></pre>"
    ],
    asks: [
      "Sửa hook thế nào?",
      "Tức là: đặt điều kiện “chỉ chặn khi target là production” ở đâu để hook thấy được tham số.",
      "Soi từng phương án: còn chặn chắc chắn không? Điều kiện có nằm ở chỗ thật sự đọc được tham số không?"
    ],
    facts: [
      "Hook <code>PreToolUse</code> chạy trước khi tool thực thi. Nó nhận <code>tool_name</code> và <code>tool_input</code>, rồi cho qua, từ chối kèm lý do, hoặc sửa tham số. Hook là code nên chắc chắn. CLAUDE.md là chỉ dẫn nên chỉ là xác suất.",
      "<code>matcher</code> chỉ xét tên tool, không thấy tham số. Điều kiện theo tham số phải kiểm trong thân hook, qua <code>tool_input</code>.",
      "Từ chối viết là <code>permissionDecision: \"deny\"</code> kèm <code>permissionDecisionReason</code>. Với deny, Claude đọc được lý do. Lý do nên chỉ lối đi khác, để Claude không thử lại y hệt.",
      "Hook trả kết quả async (bất đồng bộ) thì agent đi tiếp ngay, không chờ hook. Docs ghi: kiểu này không chặn, không sửa được thao tác, chỉ dùng cho việc phụ như ghi log."
    ],
    opts: [
      { k: "A", gist: "Remove the hook and add a project <code>CLAUDE.md</code> rule saying the migration tool may only target staging or development, never production.",
        why: [
          "Đổi chặn chắc chắn lấy lời dặn (ý 1). CLAUDE.md thường được làm theo, nhưng không phải lần nào cũng vậy.",
          "Lọt một lần là có một migration production không ai duyệt. Luật bắt buộc như vậy phải nằm trong code."
        ] },
      { k: "B", gist: "Make the hook asynchronous so it logs production attempts for later audit while staging and development migrations run uninterrupted.",
        why: [
          "Sai ở giả định: hook async không chặn được gì (ý 4). Agent đi tiếp ngay, migration production vẫn chạy.",
          "Có log để kiểm sau, nhưng lúc đó migration đã chạy rồi. Đề cần chặn trước, không phải ghi lại sau."
        ] },
      { k: "C", gist: "Keep the matcher on the migration tool, read the <code>target</code> value from <code>tool_input</code>, and deny with a reason naming the DBA handoff only when the target is production.",
        why: [
          "Đúng chỗ đặt điều kiện: matcher vẫn chọn đúng tool, thân hook đọc <code>tool_input.target</code> rồi mới quyết định (ý 2).",
          "Production thì từ chối kèm lý do kiểu “production migrations are run by a DBA; hand off the migration file” (migration production do DBA chạy, hãy bàn giao file migration). Claude đọc lý do đó (ý 3) rồi chuyển sang chuẩn bị bàn giao, thay vì gọi lại.",
          "Staging và development thì hook cho qua. Vẫn là code, nên chặn production chắc chắn (ý 1)."
        ] },
      { k: "D", gist: "Replace the matcher with a pattern that includes the environment, such as <code>mcp__dbops__run_migration:production</code>, so the hook fires only on production calls.",
        why: [
          "Sai ở giả định: matcher chỉ so với tên tool, không thấy tham số (ý 2). Không tool nào tên là <code>mcp__dbops__run_migration:production</code>.",
          "Hậu quả: hook không bao giờ chạy nữa, migration production cũng lọt. Luật bị tắt mà không ai hay.",
          "Dễ bị cuốn vì trông như một chỉnh sửa gọn, chỉ đổi đúng một dòng cấu hình. Nhưng điều kiện theo tham số chỉ kiểm được trong thân hook."
        ] }
    ],
    refs: [
      { label: "Bài 1.5, mục “Biết thêm”: matcher chỉ xét tên tool, điều kiện theo tham số kiểm trong thân hook", href: NOTES + "#l-1-5" },
      { label: "Bài 1.5, mục “Đã sửa 03/11”: với deny, Claude đọc permissionDecisionReason", href: NOTES + "#fix-28" },
      { label: "Docs Agent SDK hooks, mục “Asynchronous output”: hook async không chặn, không sửa được thao tác", href: "https://code.claude.com/docs/en/agent-sdk/hooks" }
    ]
  },
  {
    de: 5, n: 37, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S4",
    answer: "A",
    ask: "Last week an engineer paused a session after the agent had mapped a legacy module's dependencies using Read and Grep. Since then a teammate has merged a refactor that moved and renamed many of those files. How should the engineer continue the work?",
    scene: [
      "Tuần trước agent dùng Read và Grep để vẽ bản đồ dependency (file nào phụ thuộc file nào) của một module cũ. Kỹ sư tạm dừng phiên.",
      "Sau đó đồng nghiệp merge một đợt refactor: nhiều file trong module bị chuyển chỗ và đổi tên.",
      "Chỗ khó: phiên cũ có công sức đáng giữ (bản đồ dependency), nhưng các kết quả Read và Grep trong đó giờ chỉ vào những đường dẫn không còn đúng."
    ],
    asks: [
      "Kỹ sư nên làm tiếp thế nào?",
      "Tức là: giữ lại phần kết luận còn giá trị, mà không để agent suy luận trên kết quả tool đã lỗi thời.",
      "Soi từng phương án theo hai điều: kết quả tool cũ còn nằm trong context không, và phần đã làm được có mang theo không."
    ],
    facts: [
      "Resume mở lại phiên cũ, nạp lại toàn bộ lịch sử, kể cả mọi kết quả tool. Nó không kiểm lại file trên đĩa.",
      "Kết quả tool lỗi thời (stale) phản ánh trạng thái cũ của code. Agent không biết nó đã cũ, vẫn tin là đúng.",
      "Guide: khi phần lớn kết quả tool cũ đã lỗi thời, mở phiên mới kèm bản tóm tắt có cấu trúc (phát hiện chính, file quan trọng, quyết định đã chốt) đáng tin hơn resume.",
      "Compaction (nén lịch sử thành bản tóm tắt) để giải phóng context khi phiên dài. Nó làm context gọn hơn, không làm dữ liệu cũ đúng lại."
    ],
    opts: [
      { k: "A", gist: "Start a new session and inject a structured summary of the earlier findings together with the list of files that changed.",
        why: [
          "Đúng cách thứ ba của bài 1.7 (ý 3). Bản tóm tắt mang theo phần đáng giữ: bản đồ dependency, quyết định đã chốt, câu hỏi còn mở.",
          "Danh sách file đã chuyển chỗ, đổi tên cho agent biết phải đọc lại đúng vùng nào. Không phải dò lại cả module, cũng không kéo kết quả tool cũ vào context (ý 2)."
        ] },
      { k: "B", gist: "Resume the saved session and tell the agent to ignore any earlier tool results that look outdated.",
        why: [
          "Resume nạp lại hết kết quả cũ (ý 1). Lời dặn “bỏ qua cái nào có vẻ cũ” không xóa được chúng khỏi context.",
          "Agent cũng không biết cái nào đã cũ nếu không đọc lại tất cả (ý 2). Đó là một lời dặn chống lại dữ liệu cụ thể nằm ngay trước mắt nó.",
          "Dễ bị cuốn vì bài 1.7 có cách “resume rồi nói rõ file nào đã đổi”. Nhưng cách đó hợp khi chỉ vài file đổi và mình chỉ đích danh từng file. Ở đây nhiều file chuyển chỗ, còn phương án chỉ dặn chung chung."
        ] },
      { k: "C", gist: "Resume the saved session by its session ID so the full history of earlier Read and Grep results is restored.",
        why: [
          "Resume đúng là khôi phục đủ lịch sử (ý 1). Nhưng chính lịch sử đó là vấn đề: nội dung file và kết quả tìm kiếm đều chỉ vào đường dẫn cũ.",
          "Agent thừa hưởng một bản đồ sai về chỗ nằm của code, và tin nó hoàn toàn (ý 2). Resume chỉ hợp khi phần lớn kết quả cũ còn đúng."
        ] },
      { k: "D", gist: "Resume the saved session and run compaction first, so the old tool outputs are condensed before continuing.",
        why: [
          "Sai ở giả định: compaction làm context gọn hơn, không làm dữ liệu cũ đúng lại (ý 4).",
          "Nén kết quả lỗi thời thì ra bản tóm tắt của dữ liệu lỗi thời. Đường dẫn và tên file, đúng phần đã sai, lại là chi tiết dễ bị nhòe khi tóm tắt."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Ba cách nối lại công việc”: cách 3, phiên mới kèm bản tóm tắt khi kết quả tool đã lỗi thời", href: NOTES + "#l-1-7" },
      { label: "Cheatsheet D1: dòng “Kết quả tool cũ đã lỗi thời”", href: NOTES + "#cheat-d1" }
    ]
  },
  {
    de: 5, n: 38, total: 60, sub: "1.3", subName: "Gọi subagent, truyền context", scen: "S4",
    answer: "BC",
    ask: "The main agent in this system has spent twenty turns reading a legacy billing module, and now hands a dependency-tracing subtask to a standard (non-fork) subagent. Which two steps make the delegation work correctly? (Choose two.)",
    scene: [
      "Agent chính đã mất hai mươi lượt đọc một module tính tiền (billing) cũ.",
      "Giờ nó giao việc dò dependency cho một subagent thường, “non-fork” (không phải bản fork sao chép hội thoại).",
      "Chỗ khó: hai mươi lượt kia nằm trong context của agent chính. Subagent không tự thấy chúng, và agent chính cũng không tự thấy những gì subagent đọc."
    ],
    asks: [
      "Hai bước nào làm việc giao này chạy đúng?",
      "Tức là: một bước đưa thông tin từ agent chính sang subagent, một bước đưa kết quả cụ thể từ subagent về.",
      "Soi từng phương án: nó dựa vào một đường chia sẻ context có thật hay không có thật?"
    ],
    facts: [
      "Subagent thường bắt đầu với context mới. Nó nhận system prompt của riêng nó (trong <code>AgentDefinition</code>) và lời giao việc. Nó không nhận lịch sử hội thoại, kết quả tool, hay system prompt của agent cha.",
      "Thứ duy nhất đi từ cha sang subagent là lời giao việc. Đường dẫn file, quyết định đã chốt, phát hiện cần dùng phải viết thẳng vào đó.",
      "Tool call và kết quả trung gian nằm lại trong subagent. Chỉ tin nhắn cuối của nó quay về agent cha.",
      "Fork là ngoại lệ: subagent fork sao chép hội thoại tới lúc đó thay vì bắt đầu mới. Đề đã nói rõ đây không phải fork."
    ],
    opts: [
      { k: "A", gist: "Plan for the main agent to read the subagent's raw Grep and Read results from the subagent's conversation afterwards.",
        why: [
          "Sai ở giả định: kết quả Grep và Read của subagent nằm lại bên subagent, cha chỉ nhận tin nhắn cuối (ý 3).",
          "Agent chính không có cách nào quay lại xem. Cần bằng chứng gì thì subagent phải ghi vào báo cáo cuối, và đó là việc của B."
        ] },
      { k: "B", gist: "Require the subagent to list the file paths and call chains it found in its final report.",
        why: [
          "Lo chiều về. Chỉ tin nhắn cuối quay về cha (ý 3), nên muốn có đường dẫn file và chuỗi gọi hàm (call chain) thì phải đòi ngay trong lời giao việc.",
          "Đây cũng là lợi ích của subagent: phần dò dài dòng nằm lại bên đó, cha chỉ nhận đúng những thứ cụ thể nó cần."
        ] },
      { k: "C", gist: "Put the relevant findings from the twenty earlier turns directly into the subagent's delegation prompt.",
        why: [
          "Lo chiều đi. Subagent thường không thấy hai mươi lượt kia (ý 1). Thứ duy nhất nó nhận từ cha là lời giao việc (ý 2).",
          "Không đưa vào thì subagent phải đọc lại module từ đầu, hoặc dò dependency mà không biết cha đã tìm ra những gì."
        ] },
      { k: "D", gist: "Skip restating the coordinator's conventions for the subagent, relying on it to inherit the main agent's system prompt.",
        why: [
          "Sai ở giả định: subagent thường dùng system prompt của riêng nó, không nhận system prompt của cha (ý 1).",
          "Quy ước nào subagent phải theo thì đặt trong system prompt của nó, hoặc trong lời giao việc.",
          "Dễ bị cuốn vì nghe như subagent là một phần của agent chính. Nhưng nó là một cuộc hội thoại riêng, chỉ biết những gì được viết cho nó."
        ] }
    ],
    refs: [
      { label: "Bài 1.3: subagent bắt đầu với system prompt của nó và lời giao việc; kết quả trả về là câu trả lời cuối", href: NOTES + "#l-1-3" },
      { label: "Docs “Subagents in the SDK”, mục What subagents inherit: bảng subagent nhận gì, không nhận gì", href: "https://code.claude.com/docs/en/agent-sdk/subagents#what-subagents-inherit" }
    ]
  },
  {
    de: 5, n: 39, total: 60, sub: "2.3", subName: "Chia tool cho agent và tool_choice", scen: "S4",
    answer: "CD",
    ask: "Both subagents in this system currently inherit every tool the parent has. The exploration subagent, which should only read and search code, keeps writing files, and the boilerplate subagent keeps calling GitHub MCP tools it never needs. Which two configuration changes fix this correctly? (Choose two.)",
    scene: [
      "Hai subagent đang kế thừa mọi tool của agent cha.",
      "Subagent khám phá chỉ nên đọc và tìm code, nhưng cứ ghi file.",
      "Subagent viết code khung không cần GitHub, nhưng cứ gọi tool của GitHub MCP server.",
      "Chỗ khó: mỗi subagent cần cắt một kiểu. Một bên chỉ giữ vài tool, một bên bỏ cả nhóm tool của một server."
    ],
    asks: [
      "Hai thay đổi cấu hình nào sửa đúng?",
      "Tức là: cắt tool ngay trong định nghĩa của từng subagent, để tool thừa biến mất khỏi subagent đó, không chỉ là bị dặn đừng dùng.",
      "Soi từng phương án: nó gỡ tool thật hay chỉ dặn? Nó áp lên đúng subagent, hay kéo theo cả agent khác?"
    ],
    facts: [
      "Trường <code>tools</code> trong <code>AgentDefinition</code> là danh sách cho phép. Bỏ trống thì subagent kế thừa mọi tool. Khai rồi thì tool ngoài danh sách không có trong phiên của subagent: không hỏi quyền, không báo lỗi, model đơn giản là không thấy nó.",
      "<code>disallowedTools</code> trong <code>AgentDefinition</code> gỡ tool khỏi bộ tool của subagent. Docs ghi nó nhận cả mẫu theo server: <code>mcp__server__*</code> gỡ mọi tool của server đó.",
      "Tool MCP mang tên <code>mcp__&lt;server&gt;__&lt;tool&gt;</code>, ví dụ <code>mcp__github__search_issues</code>.",
      "<code>allowedTools</code> đặt ở query của agent cha. Docs hiện tại: đó là danh sách tool được duyệt sẵn (chạy không hỏi quyền), không gỡ tool nào khỏi bộ tool của subagent."
    ],
    opts: [
      { k: "A", gist: "Add a system prompt rule to each subagent definition listing the tools it is forbidden to use.",
        why: [
          "Chỉ dặn, không gỡ. Tool vẫn nằm trong bộ tool của subagent, model làm theo hay không là chuyện xác suất.",
          "Log đã cho thấy hai subagent này dùng tool ngoài vai. Dặn thêm một câu không đổi được việc tool vẫn nằm đó chờ gọi."
        ] },
      { k: "B", gist: "Set <code>allowedTools</code> to Read, Grep and Glob on the parent's query options so the subagents inherit only those.",
        why: [
          "Sai chỗ đặt: <code>allowedTools</code> của cha là danh sách duyệt sẵn, không gỡ tool nào khỏi subagent (ý 4). Hai subagent vẫn có Write và tool GitHub.",
          "Kể cả hiểu theo nghĩa “giới hạn tool” của guide, đặt ở cha là cắt chung cho tất cả: subagent viết code khung mất luôn Write, chính việc nó phải làm.",
          "Dễ bị cuốn vì tên <code>allowedTools</code> nghe giống <code>tools</code>. Nhưng cắt tool cho từng subagent chỉ nằm trong <code>AgentDefinition</code> của subagent đó."
        ] },
      { k: "C", gist: "Add <code>mcp__github__*</code> to the boilerplate subagent's <code>disallowedTools</code> to remove that server's tools from it.",
        why: [
          "<code>disallowedTools</code> gỡ tool khỏi subagent, và nhận mẫu theo server (ý 2). Tool GitHub đều tên <code>mcp__github__…</code> (ý 3), nên <code>mcp__github__*</code> gỡ hết một lượt.",
          "Subagent viết code khung giữ mọi tool khác nó cần, chỉ mất nhóm GitHub. Subagent nào khác cần GitHub vẫn dùng được."
        ] },
      { k: "D", gist: "Set the exploration subagent's <code>tools</code> allowlist in its <code>AgentDefinition</code> to Read, Grep and Glob only.",
        why: [
          "<code>tools</code> là danh sách cho phép (ý 1). Chỉ còn Read, Grep, Glob thì Write không có trong phiên của subagent khám phá, nên nó không thể ghi file.",
          "Đây là cắt bằng cấu hình: không phải dặn, cũng không phải chặn từng lần gọi. Tool thừa đơn giản là không tồn tại với subagent đó.",
          "C và D dùng hai trường khác nhau vì nhu cầu khác nhau. Khám phá chỉ cần ba tool, nên khai danh sách cho phép. Viết code khung cần gần hết, chỉ bỏ một nhóm, nên khai danh sách gỡ."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Biết thêm”: bỏ trống tools thì dùng hết tool của agent cha; muốn hẹp thì khai tools hoặc dùng disallowedTools", href: NOTES + "#l-1-3" },
      { label: "Bài 2.3, mục “Biết thêm”: giới hạn tool cho subagent bằng tools hoặc disallowedTools trong definition", href: NOTES + "#l-2-3" },
      { label: "Docs “Subagents in the SDK”, bảng AgentDefinition: disallowedTools nhận mẫu mcp__server__*", href: "https://code.claude.com/docs/en/agent-sdk/subagents#agentdefinition-configuration" }
    ]
  },
  {
    de: 5, n: 40, total: 60, sub: "1.2", subName: "Điều phối coordinator–subagent", scen: "S4",
    answer: "D",
    ask: "The coordinator in this system invokes all three of its subagents (<code>dependency-mapper</code>, <code>test-locator</code>, <code>doc-summarizer</code>) on every request, even a simple “where are the tests for the billing module” question, which triples latency and cost. Which change fits the hub-and-spoke pattern best?",
    scene: [
      "Coordinator có ba subagent: <code>dependency-mapper</code> (vẽ dependency), <code>test-locator</code> (tìm test), <code>doc-summarizer</code> (tóm tắt tài liệu).",
      "Câu hỏi nào nó cũng gọi đủ cả ba. Hỏi đơn giản “where are the tests for the billing module” (test của module billing nằm đâu) cũng vậy.",
      "Hậu quả: độ trễ và chi phí gấp ba, trong khi câu đó chỉ cần <code>test-locator</code>."
    ],
    asks: [
      "Đổi gì thì hợp với kiểu hub-and-spoke nhất?",
      "Tức là: việc chọn gọi subagent nào nên nằm ở đâu, và ai làm việc đó.",
      "Soi từng phương án: việc chọn nằm ở coordinator hay bị đẩy xuống subagent? Còn gọi thừa không?"
    ],
    facts: [
      "Hub-and-spoke (trục và nan hoa): coordinator là trục, subagent là nan hoa. Mọi thứ đi qua trục, subagent không nói chuyện trực tiếp với nhau.",
      "Coordinator làm bốn việc: chia việc, chọn subagent cần cho câu hỏi này, giao việc, gom kết quả. Guide gọi việc chọn là dynamic selection (chọn động): câu hỏi đơn giản thì không chạy đủ mọi subagent.",
      "Mỗi lần gọi subagent là một agent riêng, có context riêng và lượt gọi model riêng. Gọi một subagent chỉ để nó báo “không có gì để làm” vẫn tốn tiền và thời gian.",
      "Subagent chuyên môn hóa (prompt riêng, bộ tool hẹp) làm việc ổn định hơn. Gộp lại thành một agent ôm hết thì mất cái đó."
    ],
    opts: [
      { k: "A", gist: "Merge the three subagents into one general-purpose explorer with every tool enabled.",
        why: [
          "Bỏ mất prompt riêng và bộ tool hẹp làm từng subagent đáng tin (ý 4).",
          "Cũng không thêm chút chọn lọc nào: câu hỏi nào vẫn gọi subagent gộp đó, và nó làm luôn cả ba phần việc. Gốc của chuyện tốn kém vẫn còn nguyên."
        ] },
      { k: "B", gist: "Let each subagent read the request itself and return immediately when the task does not concern it.",
        why: [
          "Đẩy việc chọn từ coordinator xuống subagent, ngược với hub-and-spoke (ý 1, ý 2).",
          "Vẫn tạo đủ ba subagent cho mỗi câu hỏi, cái nào cũng tốn một lượt gọi model chỉ để báo “không liên quan” (ý 3).",
          "Dễ bị cuốn vì trông như subagent tự bỏ việc thừa. Nhưng tiền đã tốn ngay lúc tạo nó ra."
        ] },
      { k: "C", gist: "Let the <code>test-locator</code> subagent spawn the other two only when its own findings suggest they are needed.",
        why: [
          "SDK cho subagent tự tạo subagent con, nên cách này chạy được. Nhưng việc chọn lại nằm ở một nan hoa, không nằm ở trục (ý 1, ý 2).",
          "Hai subagent kia giờ phải chờ <code>test-locator</code> xong mới chạy, thay vì coordinator cho chạy song song khi cần cả hai."
        ] },
      { k: "D", gist: "Have the coordinator decide which subagents each request needs and delegate only to those.",
        why: [
          "Đúng vai của trục: coordinator đọc câu hỏi, chọn đúng subagent cần (ý 2). Câu “test nằm đâu” chỉ gọi <code>test-locator</code>.",
          "Hết các lần gọi thừa (ý 3). Câu hỏi cần nhiều subagent thì coordinator vẫn giao song song và gom kết quả ở một chỗ."
        ] }
    ],
    refs: [
      { label: "Bài 1.2: coordinator chọn subagent cần cho từng câu hỏi (dynamic selection), không chạy đủ mọi subagent", href: NOTES + "#l-1-2" },
      { label: "Docs “Subagents in the SDK”, mục Benefits: subagent là agent riêng, có prompt riêng và bộ tool hẹp", href: "https://code.claude.com/docs/en/agent-sdk/subagents" }
    ]
  },
  {
    de: 5, n: 41, total: 60, sub: "1.5", subName: "Hook của Agent SDK: chặn tool call và chuẩn hóa dữ liệu", scen: "S4",
    answer: "B",
    ask: "A <code>PostToolUse</code> hook on the Bash tool is supposed to swap long test-runner output for a short summary before the model reads it. The hook returns <code>decision</code> set to <code>\"block\"</code> with the summary as the <code>reason</code>, yet the model still receives the full raw output. What should the hook do instead?",
    scene: [
      "Team gắn hook <code>PostToolUse</code> vào tool Bash. Lệnh chạy test in ra rất dài, hook có nhiệm vụ thay nó bằng một bản tóm tắt ngắn trước khi model đọc.",
      "Hook trả <code>decision: \"block\"</code> và đặt bản tóm tắt vào <code>reason</code>.",
      "Chỗ khó: model vẫn nhận nguyên output thô. Hook chạy đúng lúc, chỉ trả sai trường."
    ],
    asks: [
      "Hook nên làm gì thay vào đó?",
      "Tức là: trường nào của PostToolUse <b>thay</b> kết quả tool, để model chỉ thấy bản tóm tắt.",
      "Soi từng phương án: hook chạy lúc đã có output chưa? Trường trả về thay hẳn kết quả, hay chỉ đặt thêm chữ cạnh nó?"
    ],
    facts: [
      "<code>PreToolUse</code> chạy trước khi tool thực thi: cho qua, từ chối, hoặc sửa tham số. Lúc đó lệnh chưa chạy nên chưa có output. <code>PostToolUse</code> chạy sau khi tool chạy xong, trước khi Claude đọc kết quả.",
      "Trong kết quả của PostToolUse: <code>updatedToolOutput</code> thay hẳn kết quả tool. <code>additionalContext</code> chỉ nối thêm ghi chú cạnh kết quả.",
      "<code>decision: \"block\"</code> ở PostToolUse không giấu gì cả. Docs hooks ghi: nó đặt <code>reason</code> cạnh kết quả tool, Claude vẫn thấy output gốc; muốn thay thì dùng <code>updatedToolOutput</code>.",
      "Hook chạy nền (<code>async: true</code>) không điều khiển được Claude. Docs ghi: <code>decision</code>, <code>permissionDecision</code>, <code>continue</code> của nó không có tác dụng, vì việc chúng định điều khiển đã xong. Phần ghi chú nó trả về chỉ tới Claude ở lượt sau."
    ],
    opts: [
      { k: "A", gist: "Move the hook to <code>PreToolUse</code> and return the summary before the command runs.",
        why: [
          "Sai thời điểm: PreToolUse chạy trước khi lệnh chạy, lúc đó chưa có output nào để tóm tắt (ý 1).",
          "PreToolUse dùng để chặn hay sửa lệnh trước khi chạy, không dùng để biến đổi kết quả chỉ có sau khi chạy."
        ] },
      { k: "B", gist: "Return the summary in <code>updatedToolOutput</code> so it replaces what the model receives.",
        why: [
          "Đúng hook, đúng trường: <code>updatedToolOutput</code> thay hẳn kết quả trước khi tới Claude (ý 2). Model chỉ thấy bản tóm tắt.",
          "Nó sửa đúng lỗi đề kể: <code>block</code> chỉ đặt <code>reason</code> cạnh output gốc (ý 3), nên model mới thấy cả hai.",
          "Khi làm thật nhớ một điều: Bash trả về một object có <code>stdout</code>, <code>stderr</code>…, nên giá trị thay phải đúng hình đó. Sai hình thì Claude Code bỏ qua và giữ output gốc."
        ] },
      { k: "C", gist: "Return the summary in <code>additionalContext</code> so it is attached to the tool result.",
        why: [
          "Đúng hook, sai trường: <code>additionalContext</code> chỉ nối thêm cạnh kết quả (ý 2).",
          "Model vẫn nhận nguyên output thô, cộng thêm bản tóm tắt. Vẫn đúng triệu chứng đang gặp, chỉ đổi tên trường.",
          "Dễ bị cuốn vì “attached to the tool result” (gắn vào kết quả tool) nghe như đưa bản tóm tắt cho model. Nhưng đề cần thay output, không phải thêm."
        ] },
      { k: "D", gist: "Mark the hook asynchronous so the summary can replace the output without delaying the agent.",
        why: [
          "Sai ở giả định: hook chạy nền không sửa được kết quả của lượt đang chạy (ý 4). Agent không chờ nó, output thô đã tới Claude từ trước.",
          "Chạy nền hợp với việc phụ như ghi log, gửi thông báo. Biến đổi output thì phải là hook chạy đồng bộ."
        ] }
    ],
    refs: [
      { label: "Bài 1.5, mục “Biết thêm”: updatedToolOutput thay hẳn kết quả, additionalContext chỉ nối thêm", href: NOTES + "#l-1-5" },
      { label: "Cheatsheet D1: dòng Hook (PreToolUse, PostToolUse, updatedToolOutput)", href: NOTES + "#cheat-d1" },
      { label: "Docs Claude Code hooks, mục PostToolUse decision control: block chỉ đặt reason cạnh kết quả; updatedToolOutput phải đúng hình output của tool", href: "https://code.claude.com/docs/en/hooks" }
    ]
  },
  {
    de: 5, n: 42, total: 60, sub: "1.2", subName: "Điều phối coordinator–subagent", scen: "S4",
    answer: "B",
    ask: "A coordinator maps a legacy codebase with four parallel subagents, one per module. Logs show that each subagent separately reads and summarizes the same shared core packages that every module depends on. Which change best removes this duplicated work while keeping the parallelism?",
    scene: [
      "Coordinator vẽ bản đồ một codebase cũ bằng bốn subagent chạy song song, mỗi con một module.",
      "Log cho thấy cả bốn đều tự đọc và tóm tắt cùng một bộ core package (gói lõi dùng chung), vì module nào cũng phụ thuộc vào đó.",
      "Chỗ khó: đề đòi hai thứ cùng lúc. Bỏ việc làm trùng, nhưng vẫn giữ “parallelism” (chạy song song)."
    ],
    asks: [
      "Đổi gì để hết làm trùng mà vẫn chạy song song?",
      "Tức là: phần dùng chung phải được xử lý một lần, và kết quả phải tới tay cả bốn subagent trước khi chúng bắt đầu.",
      "Soi từng phương án: việc trùng còn xảy ra không, hay chỉ được dọn ở đầu ra? Còn song song không? Subagent có thật sự nhận được thông tin không?"
    ],
    facts: [
      "Partition scope (chia phạm vi): mỗi subagent nhận một mảng riêng, các mảng gộp lại phủ đủ câu hỏi và không chồng lên nhau. Phần mảng nào cũng cần là chỗ chồng lấn, phải tách thành việc riêng.",
      "Subagent bắt đầu với trang giấy trắng: nó không thấy context của coordinator, cũng không thấy subagent khác đã đọc gì. Thứ nó cần biết phải viết vào lời giao việc (task prompt).",
      "Chạy song song là coordinator đặt nhiều Task call trong cùng một response. Các subagent chạy cùng lúc, mỗi con một context riêng, không có thứ tự con nào xong trước.",
      "Token tốn ngay lúc subagent đọc file. Gộp các bản tóm tắt sau đó chỉ dọn đầu ra, không lấy lại số token đã tiêu."
    ],
    opts: [
      { k: "A", gist: "Have the coordinator merge the overlapping module summaries after all four subagents have returned.",
        why: [
          "Sửa sau thay vì chặn trước: lúc gộp thì cả bốn subagent đã đọc và tóm tắt core package xong (ý 4).",
          "Đầu ra gọn hơn, nhưng lần chạy sau việc trùng vẫn y nguyên. Gốc lỗi nằm ở cách chia phạm vi lúc giao việc (ý 1)."
        ] },
      { k: "B", gist: "Have the coordinator explore the shared core packages once, then put that summary in each module subagent's delegation prompt.",
        why: [
          "Tách phần dùng chung thành một việc riêng, làm một lần trước khi chia ra (ý 1). Bốn subagent sau đó chỉ lo đúng module của mình, phạm vi không còn chồng nhau.",
          "Bản tóm tắt được dán vào lời giao việc của từng subagent. Đây là đường duy nhất để subagent biết nó (ý 2).",
          "Bốn subagent module vẫn chạy song song như cũ (ý 3). Đạt cả hai điều đề đòi."
        ] },
      { k: "C", gist: "Replace the four parallel subagents with a single subagent that explores every module in turn, so each file is read only once.",
        why: [
          "Hết đọc trùng thật, nhưng bỏ luôn chạy song song, trái điều đề muốn giữ.",
          "Cả codebase dồn vào một context, đầy rất nhanh. Các module vốn độc lập với nhau, đúng loại việc nên chia cho nhiều subagent."
        ] },
      { k: "D", gist: "Have each module subagent append its core-package findings to a shared file that the other subagents check first.",
        why: [
          "Sai ở giả định có thứ tự: các subagent chạy cùng lúc (ý 3), không con nào chắc đã ghi xong trước khi con khác mở file. Nhiều con vẫn đọc core package cùng lúc.",
          "Nó còn để subagent tự phối hợp với nhau qua file, vòng qua coordinator. Coordinator mới là chỗ quyết định mỗi subagent nhận gì.",
          "Dễ bị cuốn vì “dùng chung kết quả” nghe đúng tinh thần bỏ trùng. Nhưng dùng chung phải đi qua lời giao việc do coordinator soạn, trước khi subagent chạy (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, mục “Lỗi trong tình huống nằm ở đâu”: partition scope, chia phạm vi không chồng nhau; subagent không gửi kết quả thẳng cho nhau", href: NOTES + "#l-1-2" },
      { label: "Bài 1.3: subagent bắt đầu với trang giấy trắng, thứ gì nó cần biết phải viết vào lời giao việc", href: NOTES + "#l-1-3" }
    ]
  },
  {
    de: 5, n: 43, total: 60, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool", scen: "S4",
    answer: "B",
    ask: "The team's <code>search_issues</code> MCP tool returns an empty list both when no issues match and when the tracker backend times out. As a result, the agent reports “no related issues” during outages and pointlessly retries searches that really are empty. How should the tool's responses be redesigned?",
    scene: [
      "Tool MCP <code>search_issues</code> tìm issue trong hệ thống theo dõi lỗi (tracker) của team.",
      "Không có issue nào khớp, hay backend tracker timeout, tool đều trả một danh sách rỗng.",
      "Hậu quả hai chiều: lúc tracker sập, agent báo “no related issues” (không có issue liên quan). Lúc thật sự không có gì, agent lại thử lại vô ích.",
      "Chỗ khó: hai ca cần cách xử lý ngược nhau (một ca thử lại, một ca chấp nhận), mà tool trả giống hệt nhau."
    ],
    asks: [
      "Nên thiết kế lại response của tool thế nào?",
      "Tức là: tool phải cho agent một tín hiệu rõ, tách “tra được, không có gì” khỏi “không tra được”.",
      "Soi từng phương án: tín hiệu phân biệt đến từ tool hay do model đoán? Ca rỗng thật có bị xử lý sai không?"
    ],
    facts: [
      "Access failure (không truy cập được): chưa biết nguồn có dữ liệu hay không, vd timeout. Valid empty result (kết quả rỗng hợp lệ): tra xong, thật sự không có gì khớp. Hai ca phải trả về khác nhau: rỗng không phải lỗi, timeout không được giả làm rỗng.",
      "Bên MCP, tool báo chạy thất bại bằng cờ <code>isError: true</code> trong kết quả, kèm nội dung mô tả lỗi cho Claude đọc. Messages API có cờ tương ứng là <code>is_error</code>.",
      "Model không biết một lần gọi backend có timeout hay không: thông tin đó chỉ tool có. Confidence tự báo của model cũng lệch xa độ đúng thật.",
      "Retry hợp với lỗi tạm thời (transient) như timeout. Muốn retry đúng ca thì tool phải nói trước ca nào là lỗi."
    ],
    opts: [
      { k: "A", gist: "Have the agent rate its own confidence that the tracker was reachable, and retry whenever that confidence is low.",
        why: [
          "Sai nguồn tín hiệu: tracker có trả lời hay không là chuyện ở tầng chạy tool. Hai ca trả giống hệt nhau, model không có gì để dựa, chỉ đoán (ý 3).",
          "Confidence tự báo lại lệch, nên vẫn có lúc tin nhầm danh sách rỗng khi tracker sập, có lúc thử lại ca rỗng thật."
        ] },
      { k: "B", gist: "Return an ordinary successful empty result when nothing matches, and a response with <code>isError</code> set to true when the backend fails.",
        why: [
          "Tách đúng hai ca (ý 1): không khớp là kết quả rỗng bình thường, timeout là lỗi có cờ <code>isError</code> (ý 2).",
          "Thấy lỗi thì agent thử lại hoặc báo tracker đang sập (ý 4). Thấy rỗng thì chấp nhận “không có issue”, không thử lại.",
          "Muốn chi tiết hơn, tool có thể thêm trường tự đặt như loại lỗi hay có thử lại được không. Đó là quy ước riêng của team, đặt cạnh cờ <code>isError</code>."
        ] },
      { k: "C", gist: "Instruct the agent in its system prompt to retry any empty result up to three times before concluding that nothing matched.",
        why: [
          "Vẫn gộp hai ca (ý 1): ca rỗng thật bị tra lại ba lần vô ích.",
          "Tracker sập lâu hơn ba lần thử thì cuối cùng vẫn báo “no related issues”, sai mà không ai hay. Lời dặn trong prompt không thêm được thông tin mà tool không đưa ra.",
          "Dễ bị cuốn vì retry đúng là cách xử lý timeout. Nhưng retry chỉ đúng khi tool đã nói ca nào là lỗi (ý 4)."
        ] },
      { k: "D", gist: "Flag every empty result set with <code>isError</code> set to true, so the agent always treats it as something to investigate further.",
        why: [
          "Đảo ngược vấn đề: tra xong mà không khớp là thành công, gắn cờ lỗi là báo sai (ý 1).",
          "Agent sẽ thử lại hoặc đổi câu tìm mãi cho những lần tìm vốn đã đúng. Cờ <code>isError</code> dành cho lần chạy tool thất bại (ý 2), không dành cho kết quả rỗng."
        ] }
    ],
    refs: [
      { label: "Bài 2.2, cuối mục “Lỗi trong hệ nhiều agent”: access failure và empty result hợp lệ phải trả về khác nhau", href: NOTES + "#l-2-2" },
      { label: "Bài nền tảng Domain 2, mục 4: tool lỗi vẫn trả kết quả, đánh dấu is_error (Messages API) hoặc isError (MCP)", href: NOTES + "#l-2-0" },
      { label: "Cheatsheet D2: dòng “Search trả mảng rỗng”: rỗng không phải lỗi, timeout không được giả làm rỗng", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 5, n: 44, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code", scen: "S4",
    answer: "D",
    ask: "The team's MCP server wraps a legacy database and an internal wiki. Traces show the agent spends its first several turns running schema-discovery queries and listing wiki pages before it starts the actual task. Which change to the server best removes this overhead?",
    scene: [
      "MCP server của team bọc hai nguồn: một database cũ và một wiki nội bộ.",
      "Trace cho thấy mấy lượt đầu agent toàn chạy query dò schema (cấu trúc bảng) và liệt kê trang wiki, rồi mới bắt tay vào việc thật.",
      "Chỗ khó: đề hỏi thay đổi ở phía server. Agent không làm sai, chỉ là thông tin “có gì ở đâu” hiện chỉ lấy được bằng cách gọi tool dò."
    ],
    asks: [
      "Đổi gì ở server để bỏ khoản tốn kém này?",
      "Tức là: cho agent thấy ngay schema và danh sách trang wiki, không phải tốn lượt gọi tool thăm dò.",
      "Soi từng phương án: nó bỏ được các lượt thăm dò, hay chỉ trả tiền cho chúng? Thông tin có còn đúng khi DB hay wiki thay đổi không?"
    ],
    facts: [
      "MCP server phơi ba loại: tools (hành động), resources (dữ liệu tham khảo để đọc, không thực thi gì), prompts (mẫu).",
      "Resources dùng để phơi catalog nội dung (danh sách issue, cây tài liệu, schema DB) cho agent thấy ngay, không cần exploratory tool call (lượt gọi tool thăm dò).",
      "Tool chỉ chạy khi agent tự quyết định gọi. Thêm một tool thăm dò mới thì vẫn là một lượt gọi, và vẫn tùy agent có gọi hay không."
    ],
    opts: [
      { k: "A", gist: "Paste the current schema and wiki page index into the agent's system prompt so discovery is no longer needed.",
        why: [
          "Lúc đầu thì chạy được, nhưng đó là bản chép tay đứng yên. Đổi một bảng hay thêm một trang wiki là bản trong prompt sai, agent làm theo thông tin cũ.",
          "Cả danh mục còn chiếm context ở mọi request, kể cả việc không cần tới.",
          "Dễ bị cuốn vì nó bỏ được lượt dò ngay. Nhưng đề hỏi thay đổi ở server, và MCP đã có chỗ dành riêng cho loại dữ liệu này (ý 2)."
        ] },
      { k: "B", gist: "Add a <code>describe_system</code> tool that the agent is told to call once at the start of each session.",
        why: [
          "Dựng lại bằng tool một việc mà MCP đã có loại riêng: resources (ý 1, ý 2).",
          "Vẫn là một lượt gọi tool, và vẫn tùy agent nhớ gọi (ý 3). Có phiên agent bỏ qua, có phiên gọi lại nhiều lần."
        ] },
      { k: "C", gist: "Raise the agent's turn limit so the discovery phase no longer cuts into task execution.",
        why: [
          "Vá triệu chứng: thêm lượt chỉ để trả tiền cho các lượt dò, không bỏ được chúng.",
          "Output của các lượt dò vẫn chất đầy context. Phí vẫn còn, chỉ là chịu được hơn."
        ] },
      { k: "D", gist: "Publish the database schema and the wiki page index as MCP resources that the agent can read directly.",
        why: [
          "Schema và danh sách trang là dữ liệu tham khảo, đúng loại MCP dành cho resources (ý 1, ý 2).",
          "Agent thấy catalog ngay từ đầu và đọc thẳng, không tốn lượt gọi tool thăm dò. Nhiều lượt dò thành một lần tra.",
          "Nhớ ranh giới: tools cho hành động, resources cho dữ liệu tham khảo."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, mục “Resource: để agent thấy có gì mà không phải mò”", href: NOTES + "#l-2-4" },
      { label: "Bài nền tảng Domain 2: MCP server phơi tools (hành động), resources (dữ liệu), prompts (mẫu)", href: NOTES + "#l-2-0" },
      { label: "Cheatsheet D2: dòng “Agent gọi tool liệt kê nhiều lần để biết có dữ liệu gì”", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 5, n: 45, total: 60, sub: "1.4", subName: "Workflow nhiều bước có cổng chặn và bàn giao", scen: "S1",
    answer: "D",
    ask: "A compliance review found a small share of sessions where <code>process_refund</code> ran with no prior <code>get_customer</code> call, even though the system prompt already says identity must be verified first. Compliance now requires that an unverified refund can never execute. Which change meets this requirement?",
    scene: [
      "Agent hỗ trợ khách có <code>get_customer</code> (tra và xác minh khách) và <code>process_refund</code> (hoàn tiền). System prompt đã ghi: phải xác minh danh tính trước.",
      "Rà soát tuân thủ vẫn thấy một phần nhỏ phiên gọi <code>process_refund</code> mà không có <code>get_customer</code> trước đó.",
      "Chỗ khó: yêu cầu mới là “can never execute” (không bao giờ được chạy). “Ít khi sai” là chưa đạt."
    ],
    asks: [
      "Đổi gì để đạt yêu cầu này?",
      "Tức là: cần cơ chế bảo đảm hoàn tiền không chạy được khi chưa xác minh, model quyết gì cũng vậy.",
      "Soi từng phương án: nó là prompt (xác suất) hay code (chắc chắn)? Nếu là cơ chế kỹ thuật, nó có kiểm đúng điều kiện “đã xác minh” không?"
    ],
    facts: [
      "Ghi policy vào prompt (system prompt, ví dụ mẫu few-shot, chữ in hoa, đặt lên đầu) là prompt-based guidance: tỉ lệ sai giảm được nhưng không về 0. Muốn bảo đảm thì phải programmatic enforcement, tức ghi policy vào code.",
      "Prerequisite gate (cổng điều kiện trước): khóa <code>process_refund</code> cho đến khi <code>get_customer</code> trả về mã khách đã xác minh. Làm bằng hook <code>PreToolUse</code>: code chạy trước khi tool thực thi, trả <code>deny</code> kèm lý do.",
      "<code>strict: true</code> trên định nghĩa tool buộc tham số Claude điền khớp schema tuyệt đối: đúng kiểu, đủ trường. Nó kiểm hình dạng input, không kiểm điều kiện nghiệp vụ.",
      "Confidence tự báo của model lệch xa độ đúng thật, và ở đây do chính model đang bị rà soát tự chấm."
    ],
    opts: [
      { k: "A", gist: "Have the agent rate its confidence that identity was verified, and skip the refund when that confidence is low.",
        why: [
          "Vẫn để model tự quyết, chỉ thêm một bước tự chấm. Chính model đã bỏ qua xác minh giờ tự xác nhận là mình không bỏ qua (ý 4).",
          "Không có gì bên ngoài model kiểm lời nó. Vẫn là xác suất (ý 1)."
        ] },
      { k: "B", gist: "Move the verification rule to the first line of the system prompt and add few-shot examples of the correct call order.",
        why: [
          "Đặt lên đầu và thêm ví dụ mẫu thì tỉ lệ sai giảm, nhưng vẫn là prompt nên không về 0 (ý 1).",
          "Đề đòi “can never execute”, nên “sai ít hơn” vẫn chưa đạt. Lần rà soát sau vẫn có thể thấy vài ca lọt."
        ] },
      { k: "C", gist: "Set <code>strict</code> to true on the <code>process_refund</code> tool definition so its inputs are grammar-constrained to the schema.",
        why: [
          "Sai loại bảo đảm: <code>strict</code> chỉ bảo đảm input đúng schema (ý 3). Nó không biết khách đã được xác minh hay chưa.",
          "Một lệnh hoàn tiền đúng schema hoàn hảo cho khách chưa xác minh vẫn đi qua.",
          "Dễ bị cuốn vì “grammar-constrained” (ràng buộc bằng ngữ pháp) nghe như cơ chế cứng. Nhưng nó cứng về kiểu dữ liệu, không cứng về điều kiện nghiệp vụ."
        ] },
      { k: "D", gist: "Add a <code>PreToolUse</code> hook that blocks any <code>process_refund</code> call until <code>get_customer</code> has returned a verified customer ID.",
        why: [
          "Đây là prerequisite gate bằng code (ý 2). Hook chạy trước mỗi lần gọi <code>process_refund</code>, chưa có mã khách đã xác minh thì trả <code>deny</code>.",
          "Model quyết gì thì refund cũng không chạy được khi chưa xác minh. Luật chuyển từ xác suất sang chắc chắn, đúng yêu cầu “can never execute” (ý 1).",
          "Claude nhận lý do từ chối, tự gọi <code>get_customer</code> rồi mới đi tiếp."
        ] }
    ],
    refs: [
      { label: "Bài 1.4: prompt-based guidance và programmatic enforcement, prerequisite gate", href: NOTES + "#l-1-4" },
      { label: "Bài 1.5: PreToolUse chạy trước tool và trả về allow / ask / deny", href: NOTES + "#l-1-5" },
      { label: "Bài 4.3, khung “Khái niệm của bài”: strict: true buộc tham số khớp schema", href: NOTES + "#l-4-3" }
    ]
  },
  {
    de: 5, n: 46, total: 60, sub: "1.3", subName: "Gọi subagent, truyền context", scen: "S1",
    answer: "D",
    ask: "The team added a billing-dispute subagent that the main agent delegates to after it has already called <code>get_customer</code> and <code>lookup_order</code>. Logs show the subagent keeps replying that it has no customer record or order details to analyze. What should the team change?",
    scene: [
      "Team thêm một subagent chuyên xử lý tranh chấp thanh toán (billing dispute).",
      "Agent chính gọi <code>get_customer</code> và <code>lookup_order</code> trước, rồi mới giao việc cho subagent.",
      "Chỗ khó: dữ liệu đã có, agent chính đã lấy về. Vậy mà lần nào subagent cũng nói không có hồ sơ khách hay chi tiết đơn để phân tích."
    ],
    asks: [
      "Team nên đổi gì?",
      "Tức là: làm sao cho kết quả agent chính đã lấy tới được tay subagent.",
      "Soi từng phương án: nó có thật sự đưa dữ liệu vào context của subagent không, hay chỉ giả định subagent đã thấy?"
    ],
    facts: [
      "Subagent bắt đầu với trang giấy trắng: <code>messages</code> trống, chỉ có system prompt của nó và lời giao việc. Nó không thấy lịch sử hội thoại hay kết quả tool của agent chính.",
      "Lời giao việc (task prompt) là thông tin duy nhất subagent nhận được về việc cần làm. Thứ gì nó cần biết phải viết vào đó.",
      "Nên truyền dữ liệu dạng có cấu trúc, tách nội dung khỏi metadata (mã đơn, thời điểm), để thông tin không rơi qua các bước."
    ],
    opts: [
      { k: "A", gist: "Add retry logic so the main agent re-invokes the subagent until it returns a complete dispute analysis.",
        why: [
          "Gọi lại với cùng lời giao việc thì subagent lại bắt đầu trắng, lại thiếu đúng dữ liệu đó (ý 1). Lần nào cũng hỏng y vậy.",
          "Retry dành cho lỗi tạm thời. Ở đây thiếu input là lỗi cấu trúc, xảy ra mọi lần."
        ] },
      { k: "B", gist: "Raise the subagent's context window allocation so the main agent's conversation history fits next to its instructions.",
        why: [
          "Sai ở giả định: vấn đề không phải thiếu chỗ. Lịch sử của agent chính không bao giờ được gửi sang subagent, context to tới đâu cũng vậy (ý 1).",
          "To hơn là tăng sức chứa, không đổi thứ được đưa vào."
        ] },
      { k: "C", gist: "State in the subagent's system prompt that it must use the customer record the main agent already retrieved.",
        why: [
          "Câu dặn giả định subagent thấy được kết quả tool của agent chính. Nó không thấy (ý 1).",
          "Bảo nó dùng thứ không có trong context thì nó vẫn không có gì để dùng.",
          "Dễ bị cuốn vì có chữ “must” và nhắc đúng dữ liệu cần. Nhưng lời dặn không chở dữ liệu đi được, chỉ lời giao việc mới chở được (ý 2)."
        ] },
      { k: "D", gist: "Include the full <code>get_customer</code> and <code>lookup_order</code> results in the prompt the main agent sends to the subagent.",
        why: [
          "Lời giao việc là thứ duy nhất đi qua ranh giới sang subagent (ý 2). Dán đủ hai kết quả vào đó là subagent có ngay dữ liệu để phân tích.",
          "Tốt nhất truyền dạng có cấu trúc: hồ sơ khách, chi tiết đơn tách khỏi metadata như mã đơn, thời điểm (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Chuyện gì đang xảy ra”: subagent bắt đầu với trang giấy trắng, phải dán nguyên kết quả vào lời giao việc", href: NOTES + "#l-1-3" },
      { label: "Cheatsheet D1, nhóm 1.3: dán đủ kết quả vào lời giao việc, dạng có cấu trúc", href: NOTES + "#cheat-d1" }
    ]
  },
  {
    de: 5, n: 47, total: 60, sub: "2.1", subName: "Thiết kế tool: description rõ, ranh giới rõ", scen: "S1",
    answer: "C",
    ask: "Logs show the agent calls <code>escalate_to_human</code> on nearly every billing dispute, including ones it could resolve on its own. The <code>escalate_to_human</code> description spells out clear escalation criteria, but the system prompt contains the line “CRITICAL: You MUST involve a human whenever money is disputed.” Which change best fixes this over-escalation?",
    scene: [
      "Agent gọi <code>escalate_to_human</code> (chuyển cho người) ở gần như mọi ca tranh chấp thanh toán, kể cả ca nó tự giải quyết được.",
      "Description của <code>escalate_to_human</code> đã ghi tiêu chí chuyển ca rõ ràng.",
      "Nhưng system prompt có câu “CRITICAL: You MUST involve a human whenever money is disputed” (CỰC KỲ QUAN TRỌNG: BẮT BUỘC đưa người vào mỗi khi có tranh chấp về tiền).",
      "Chỗ khó: tranh chấp thanh toán nào cũng dính tới tiền, nên câu này khớp mọi ca. Lỗi không nằm ở description."
    ],
    asks: [
      "Đổi gì để hết chuyển ca quá tay?",
      "Tức là: tìm chỗ đang kéo agent gọi <code>escalate_to_human</code> và sửa ngay ở đó.",
      "Soi từng phương án: nó xử lý câu lệnh trong system prompt, hay để nguyên câu đó rồi thêm thứ khác bên cạnh?"
    ],
    facts: [
      "Model đọc system prompt và description của tool cùng lúc khi chọn tool. Một câu nhạy keyword (từ khóa) trong system prompt có thể tạo liên tưởng ngoài ý muốn và đè lên description tốt.",
      "Docs prompting best practices: model mới bám system prompt sát hơn, nên câu viết để chống gọi thiếu giờ dễ gây gọi thừa. Cách sửa là bỏ giọng gay gắt: thay “CRITICAL: You MUST use this tool when...” bằng “Use this tool when...” (dùng tool này khi…).",
      "<code>tool_choice</code> ép một tool cụ thể chỉ bảo đảm tool đó được gọi. Nó không ngăn các lần gọi tool sau, và không sửa chỉ dẫn đang lái việc chọn tool."
    ],
    opts: [
      { k: "A", gist: "Add a sentiment check so the agent escalates only when the customer sounds frustrated.",
        why: [
          "Đổi sang tiêu chí không liên quan: khách bực chưa chắc cần người, khách bình tĩnh vẫn có thể rơi vào ca ngoài chính sách.",
          "Câu CRITICAL trong system prompt vẫn còn nguyên, gốc lỗi chưa đụng tới (ý 1)."
        ] },
      { k: "B", gist: "Set <code>tool_choice</code> to force <code>process_refund</code> first, so escalation can only happen after a refund attempt.",
        why: [
          "Sai công cụ: ép tool chỉ bảo đảm <code>process_refund</code> được gọi (ý 3). Ngay sau đó agent vẫn có thể chuyển ca.",
          "Tệ hơn, ca tranh chấp nào cũng bị hoàn tiền trước khi được điều tra."
        ] },
      { k: "C", gist: "Rewrite the system prompt line in plain wording that mirrors the escalation criteria in the tool description.",
        why: [
          "Sửa đúng gốc: câu CRITICAL, MUST là chỉ dẫn nhạy keyword đang đè lên description (ý 1). Chữ “money” (tiền) khớp mọi ca tranh chấp.",
          "Viết lại bằng giọng thường, cùng tiêu chí với description, đúng cách docs khuyên (ý 2). Hết mâu thuẫn thì description quyết định khi nào chuyển ca."
        ] },
      { k: "D", gist: "Expand the <code>escalate_to_human</code> description with extra boundary language so that it takes precedence over the prompt.",
        why: [
          "Description vốn đã rõ. Thêm chữ vào đó không xóa được câu lệnh tuyệt đối trong system prompt, câu đó vẫn khớp mọi ca có tiền (ý 1).",
          "Hai chỉ dẫn vẫn chọi nhau, và không có gì bảo đảm description thắng.",
          "Dễ bị cuốn vì bài 2.1 dạy sửa gọi nhầm tool bằng description. Nhưng ở đây description đã tốt. Notes ghi: description tốt mà vẫn gọi sai thì rà system prompt."
        ] }
    ],
    refs: [
      { label: "Bài 2.1, đoạn “System prompt cũng ảnh hưởng”: câu nhạy keyword đè lên description tốt", href: NOTES + "#l-2-1" },
      { label: "Cheatsheet D2: dòng “Description tốt nhưng vẫn misroute”: rà system prompt tìm chỉ dẫn nhạy keyword", href: NOTES + "#cheat-d2" },
      { label: "Docs Prompting best practices: thay “CRITICAL: You MUST use this tool when...” bằng “Use this tool when...”", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
    ]
  },
  {
    de: 5, n: 48, total: 60, sub: "2.5", subName: "Chọn built-in tool đúng việc", scen: "S1",
    answer: "D",
    ask: "While looking into duplicate refunds in this system, a developer asks Claude Code to find every code path that calls <code>apply_refund_policy</code>. Claude Code has already used Read on the file that defines the function. What should it do next?",
    scene: [
      "Dev đang điều tra lỗi hoàn tiền hai lần, nhờ Claude Code tìm mọi đường code gọi <code>apply_refund_policy</code>.",
      "Claude Code đã Read file định nghĩa hàm đó.",
      "Chỗ khó: đề cần “every” (mọi) chỗ gọi. Các chỗ gọi nằm trong file khác, có thể ở module tên chẳng dính gì tới refund."
    ],
    asks: [
      "Bước tiếp theo là gì?",
      "Tức là: chọn tool tìm đúng loại thông tin, ở đây là chữ bên trong file, không phải tên file.",
      "Soi từng phương án: nó tìm theo nội dung hay theo tên, vị trí file? Có tốn context vô ích không? Có sót chỗ gọi không?"
    ],
    facts: [
      "Grep tìm nội dung trong file theo pattern: mọi chỗ gọi một hàm, một error message, một import. Glob tìm đường dẫn file theo mẫu tên, vd <code>**/*.test.tsx</code>.",
      "Câu hỏi để phân biệt: đang tìm chữ bên trong file hay tên file? “Mọi chỗ gọi hàm X” là nội dung, nên dùng Grep.",
      "Khám phá tăng dần: Grep tìm chỗ liên quan, Read đúng file đó, theo import để lần luồng, Grep tiếp khi cần. Read cả thư mục thì context đầy, model mất dấu câu hỏi ban đầu.",
      "Docs prompting best practices có mẫu prompt: “Never speculate about code you have not opened” (không đoán về code chưa mở ra đọc)."
    ],
    opts: [
      { k: "A", gist: "Answer from the definition file alone, inferring the callers from how refund services are typically structured.",
        why: [
          "Đoán về code chưa mở là điều docs dặn tránh (ý 4). Danh sách caller đoán ra nghe chắc chắn nhưng không kiểm được.",
          "Điều tra hoàn tiền hai lần mà dựa vào danh sách đoán thì yên tâm giả: tưởng đã soát hết mọi chỗ gọi."
        ] },
      { k: "B", gist: "Read every other file in the same directory into context so that no caller gets missed.",
        why: [
          "Read cả thư mục là cách notes xếp vào cột Tệ: context đầy trước khi trả lời được (ý 3).",
          "Nó còn giả định chỗ gọi nằm cạnh file định nghĩa. Chỗ gọi trong module khác vẫn sót."
        ] },
      { k: "C", gist: "Glob for files whose names contain “refund” and Read each matched file in full.",
        why: [
          "Sai công cụ: Glob khớp tên file, không khớp nội dung (ý 1). Một chỗ gọi nằm trong file tên kiểu <code>order_handlers.py</code> sẽ bị sót hẳn.",
          "Nó còn kéo vào các file tên có “refund” mà không hề gọi hàm, tốn context vô ích.",
          "Dễ bị cuốn vì tên hàm có chữ refund nên lọc theo tên nghe hợp lý. Nhưng chỗ gọi là chữ bên trong file (ý 2)."
        ] },
      { k: "D", gist: "Grep file contents for <code>apply_refund_policy</code> to find its call sites, then Read those files.",
        why: [
          "Tìm chỗ gọi là tìm nội dung: tên hàm nằm trong file gọi nó, đúng việc của Grep (ý 1, ý 2).",
          "Grep cho danh sách file, Read đúng mấy file đó. Gặp wrapper thì Grep tiếp tên mới. Đúng vòng khám phá tăng dần (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 2.5, bảng “Mỗi tool một việc”: Grep tìm nội dung, Glob tìm tên file", href: NOTES + "#l-2-5" },
      { label: "Docs Prompting best practices, mẫu prompt investigate_before_answering: không đoán về code chưa mở", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
    ]
  },
  {
    de: 5, n: 49, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S1",
    answer: "D",
    ask: "Yesterday a developer on this team used a named Agent SDK session to trace why some refund escalations were being misrouted. Overnight a teammate rewrote two of the handler files the agent had analyzed. How should the developer continue the investigation today?",
    scene: [
      "Hôm qua dev điều tra trong một phiên Agent SDK có đặt tên: vì sao một số ca chuyển người (escalation) về hoàn tiền bị chuyển nhầm chỗ.",
      "Qua đêm, đồng nghiệp viết lại hai file handler mà agent đã phân tích.",
      "Chỗ khó: phần lớn phân tích hôm qua vẫn đúng, chỉ phần về hai file kia đã lỗi thời. Agent thì không tự biết file đã đổi."
    ],
    asks: [
      "Hôm nay nên tiếp tục thế nào?",
      "Tức là: giữ được phần phân tích còn đúng, và sửa đúng phần đã lỗi thời.",
      "Soi từng phương án: agent có biết hai file đã đổi không? Có phải khám phá lại từ đầu không?"
    ],
    facts: [
      "Phiên lưu hội thoại (prompt, tool call, kết quả tool, câu trả lời), không lưu hệ thống file. Resume thì agent nhớ nội dung file như lúc nó đọc, không biết file đã đổi.",
      "Resume hợp khi phần lớn điều agent biết vẫn đúng. Code đổi một phần thì nói rõ file nào đã đổi để agent đọc lại đúng các file đó. Phần lớn đã lỗi thời thì mở phiên mới kèm bản tóm tắt có cấu trúc.",
      "Fork tạo phiên mới mang bản sao lịch sử, để thử hướng khác mà giữ phiên gốc. Nó sao chép hội thoại, không đọc lại file.",
      "<code>/compact</code> nén lịch sử thành bản tóm tắt để lấy lại chỗ trong context. Nó không biết phát hiện nào đã lỗi thời."
    ],
    opts: [
      { k: "A", gist: "Resume the named session unchanged, because its saved context already reflects the handler files the agent analyzed yesterday.",
        why: [
          "Sai ở giả định: context đã lưu phản ánh hai file lúc agent đọc hôm qua, không phải bây giờ (ý 1).",
          "Không ai báo, agent tiếp tục suy luận trên nội dung file không còn tồn tại. Nó có thể đi giải thích lỗi chuyển nhầm bằng đoạn code đã bị viết lại.",
          "Dễ bị cuốn vì resume đúng là cách tiếp tục một phiên có tên. Nhưng resume mà không nói gì về thay đổi thì agent làm việc trên kết quả tool lỗi thời."
        ] },
      { k: "B", gist: "Resume the session and run <code>/compact</code> first so the summary drops the outdated analysis of the rewritten files.",
        why: [
          "Sai công cụ: <code>/compact</code> nén để lấy chỗ, nó không biết phát hiện nào đã lỗi thời (ý 4). Phân tích cũ về hai file có thể bị nén vào bản tóm tắt như thể vẫn đúng.",
          "Nén còn có thể làm rơi chi tiết chính xác của phần điều tra vẫn còn đúng."
        ] },
      { k: "C", gist: "Fork the session into a new branch so the branch starts from the current contents of the rewritten files.",
        why: [
          "Sai ở giả định: fork sao chép lịch sử hội thoại, không đọc lại file (ý 3). Nhánh mới mang theo y nguyên phân tích cũ về hai file.",
          "Fork dùng để thử hướng khác từ cùng một gốc, không dùng để làm mới dữ liệu."
        ] },
      { k: "D", gist: "Resume the named session and tell the agent which two files changed, so it re-reads them before continuing.",
        why: [
          "Phần lớn phân tích vẫn đúng, nên resume là hợp (ý 2). Agent giữ lại cả buổi điều tra hôm qua.",
          "Nói rõ hai file đã đổi thì agent đọc lại đúng hai file đó, sửa phần lỗi thời (ý 1). Rẻ hơn nhiều so với khám phá lại cả repo."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Ba cách nối lại công việc”: resume và nói rõ file nào đã đổi", href: NOTES + "#l-1-7" },
      { label: "Cheatsheet D1, nhóm 1.7: tiếp tục điều tra hôm qua → --resume, nói rõ file đã đổi", href: NOTES + "#cheat-d1" },
      { label: "Docs Agent SDK “Work with sessions”: phiên lưu hội thoại, không lưu hệ thống file", href: "https://code.claude.com/docs/en/agent-sdk/sessions" }
    ]
  },
  {
    de: 5, n: 50, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S1",
    answer: "D",
    ask: "An engineer ran a long SDK session in which the agent investigated a billing dispute and wrote working notes to a file in the project directory. They fork that session into two branches to compare resolution strategies. The second branch's agent then reads notes that the first branch's agent wrote after the fork. What should they change?",
    scene: [
      "Kỹ sư chạy một phiên SDK dài: agent điều tra một ca tranh chấp thanh toán và ghi chú làm việc ra một file trong thư mục dự án.",
      "Họ fork phiên đó thành hai nhánh để so hai chiến lược giải quyết.",
      "Chỗ khó: nhánh 2 đọc được ghi chú mà nhánh 1 viết <b>sau</b> lúc fork. Hai nhánh tưởng độc lập mà vẫn dẫm lên nhau."
    ],
    asks: [
      "Nên đổi gì?",
      "Tức là: tìm đường mà hai nhánh đang dùng chung, và tách đúng đường đó.",
      "Soi từng phương án: nó tách lịch sử hội thoại hay tách file trên đĩa? Ghi chú nằm ở đâu?"
    ],
    facts: [
      "Fork tạo phiên mới có ID riêng, mang bản sao lịch sử tới lúc tách. Phiên gốc giữ nguyên.",
      "Docs Agent SDK sessions: fork tách nhánh lịch sử hội thoại, không tách hệ thống file. Agent của nhánh nào sửa file thì thay đổi đó là thật, phiên nào làm việc trong cùng thư mục cũng thấy.",
      "<code>fork_session()</code> (Python) có tham số <code>up_to_message_id</code>: chỉ chép transcript tới một message nhất định. Nó chỉ đụng tới hội thoại.",
      "File checkpoint chụp lại và lùi được các file mà agent đã sửa. Docs Python SDK ghi: bản fork không mang checkpoint của phiên gốc, nên không lùi về checkpoint chụp trước lúc fork được."
    ],
    opts: [
      { k: "A", gist: "Resume the original session ID for both strategies instead of forking, so all file edits stay in one transcript.",
        why: [
          "Bỏ luôn mục tiêu hai nhánh độc lập: hai chiến lược trộn vào một cuộc hội thoại.",
          "Thư mục vẫn dùng chung, nên file nhánh này ghi nhánh kia vẫn đọc được (ý 2)."
        ] },
      { k: "B", gist: "Rewind the second fork to the file checkpoint the original session captured before any notes were written.",
        why: [
          "Bản fork không mang checkpoint của phiên gốc (ý 4), nên không có điểm nào để lùi về.",
          "Kể cả có, checkpoint chỉ đưa file về trạng thái cũ. Nó không tách hai nhánh đang chạy: nhánh 1 ghi tiếp là nhánh 2 lại thấy."
        ] },
      { k: "C", gist: "Fork with <code>up_to_message_id</code> set to a message before any notes were written, so the copy leaves them out.",
        why: [
          "Sai lớp: <code>up_to_message_id</code> chỉ cắt bớt phần transcript được chép (ý 3). File ghi chú vẫn nằm trên đĩa, trong thư mục chung (ý 2).",
          "Còn mất luôn một phần buổi điều tra mà fork định dùng lại.",
          "Dễ bị cuốn vì nghe như “fork từ trước lúc có ghi chú”. Nhưng ghi chú không nằm trong transcript, nó nằm trong file."
        ] },
      { k: "D", gist: "Run each fork in a separate working directory, since the fork copies the transcript but not files on disk.",
        why: [
          "Đúng gốc lỗi: fork chỉ chép hội thoại, không chép hay tách file (ý 1, ý 2). Hai nhánh cùng thư mục thì file nhánh này ghi nhánh kia đọc được.",
          "Mỗi nhánh một thư mục làm việc riêng thì ghi chú, bản nháp của chiến lược này không lọt sang chiến lược kia."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, khung “Khái niệm của bài”: fork sao chép lịch sử hội thoại rồi đi tiếp độc lập", href: NOTES + "#l-1-7" },
      { label: "Bài 1.7, mục “Đã sửa 02/11”: checkpoint chỉ theo dõi file Claude sửa bằng tool sửa file", href: NOTES + "#fix-12" },
      { label: "Docs Agent SDK “Work with sessions”, mục Fork to explore alternatives: fork tách nhánh hội thoại, không tách hệ thống file", href: "https://code.claude.com/docs/en/agent-sdk/sessions" }
    ]
  },
  {
    de: 5, n: 51, total: 60, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool", scen: "S1",
    answer: "C",
    ask: "Customers frequently give order numbers without the mandatory <code>ORD-</code> prefix. For such input, <code>lookup_order</code> currently returns <code>isError: true</code> with only the text “Not found”, and the agent then tells the customer that the order does not exist. Which tool response would let the agent recover by itself?",
    scene: [
      "Khách hay đọc mã đơn mà thiếu tiền tố bắt buộc <code>ORD-</code>, ví dụ đọc <code>10482</code> thay vì <code>ORD-10482</code> (ví dụ minh họa).",
      "Gặp mã như vậy, <code>lookup_order</code> trả <code>isError: true</code> kèm đúng một câu “Not found” (không tìm thấy).",
      "Agent hiểu câu đó là đơn không tồn tại và nói y vậy với khách. Thật ra đơn có, chỉ là mã thiếu tiền tố.",
      "Chỗ khó: lỗi nằm ở input, agent hoàn toàn tự sửa được, nhưng tool không cho nó biết điều đó."
    ],
    asks: [
      "Tool nên trả gì để agent tự gỡ được?",
      "Tức là: kết quả lỗi phải cho agent biết đây là lỗi gì và sửa thế nào, để nó thêm <code>ORD-</code> rồi gọi lại, thay vì báo khách là không có đơn.",
      "Soi từng phương án: nhận phản hồi đó xong, agent có biết là phải sửa mã không?"
    ],
    facts: [
      "Agent quyết bước tiếp theo bằng thông tin trong kết quả tool. “Not found” hay “Operation failed” không chứa thông tin gì, nên agent đoán.",
      "Guide muốn lỗi có cấu trúc: <code>errorCategory</code>, <code>isRetryable</code> và một câu mô tả dễ hiểu. Bốn loại: transient (tạm thời, như timeout: retry có backoff), validation (input sai: sửa input rồi gọi lại), business (vi phạm luật nghiệp vụ: giải thích cho khách), permission (không có quyền: escalate).",
      "Lỗi và kết quả rỗng hợp lệ phải trả về khác nhau. Mảng rỗng nghĩa là tra được nhưng không có gì khớp. Dùng nó cho một lỗi là giấu lỗi.",
      "<code>isRetryable</code> trả lời một câu: gửi lại y nguyên request đó thì có thành công không? Theo phép thử này, notes ghi validation là <code>false</code> (cùng input)."
    ],
    opts: [
      { k: "A", gist: "Leave the “Not found” text as it is and add a system prompt rule telling the agent to retry any failed lookup twice before replying.",
        why: [
          "Sai ở chỗ thử lại mà không đổi gì. Agent gửi lại đúng mã thiếu <code>ORD-</code>, tool lại trả “Not found”, lần nào cũng vậy.",
          "Kết quả lỗi vẫn không nói thêm gì (ý 1). Thử xong hai lần, agent vẫn báo khách là không có đơn, chỉ chậm hơn."
        ] },
      { k: "B", gist: "Return a successful result with an empty list of orders, so the agent asks the customer for a different order number.",
        why: [
          "Sai ở chỗ giấu lỗi: input sai mà báo như tra thành công, không có gì khớp (ý 3).",
          "Agent tin mã này không có đơn nên bắt khách đọc mã khác, trong khi mã khách đọc là đúng, chỉ thiếu tiền tố. Khách mất công tìm số mới vô ích."
        ] },
      { k: "C", gist: "Return <code>errorCategory: \"validation\"</code>, <code>isRetryable: true</code>, and a message that states the expected <code>ORD-</code> number format.",
        why: [
          "Đúng loại: mã thiếu tiền tố là input sai, và cách xử của validation là sửa input rồi gọi lại (ý 2).",
          "Câu mô tả nói rõ định dạng <code>ORD-</code>, nên agent biết sửa thế nào: thêm tiền tố rồi gọi lại <code>lookup_order</code>, không báo khách là không có đơn.",
          "Riêng cờ <code>isRetryable: true</code> thì lệch phép thử trong notes (ý 4): gửi lại y nguyên mã cũ vẫn lỗi. Phần làm C đúng là loại lỗi cộng câu mô tả. Xem ghi chú đáp án bên dưới."
        ] },
      { k: "D", gist: "Return <code>errorCategory: \"transient\"</code> with <code>isRetryable: true</code>, so the agent automatically resends the identical lookup.",
        why: [
          "Sai loại: transient là lỗi tạm thời phía hệ thống, chờ rồi gửi lại y hệt là được (ý 2). Mã thiếu tiền tố không tự hết.",
          "Agent gửi lại đúng mã cũ, lần nào cũng lỗi, mà vẫn không biết phải sửa gì.",
          "Dễ bị cuốn vì D cũng có <code>errorCategory</code> và <code>isRetryable</code>, trông giống C. Nhưng gán sai loại thì agent làm sai việc: chờ rồi thử lại, thay vì sửa mã."
        ] }
    ],
    dispute: "Đề gốc chấm C, sổ giữ C. Đề gốc ghép lỗi validation với <code>isRetryable: true</code>, vì hiểu “retry” là gọi lại tool sau khi sửa input. Notes hiểu “retry” là gửi lại y nguyên request, nên lỗi validation là <code>false</code> (câu 14 Đề 1 viết theo cách này). Cờ này do team tự đặt, spec MCP chỉ có <code>isError</code>, docs không định nghĩa nó, nên không bên nào sai docs. C đúng nhờ loại lỗi và câu mô tả nói rõ phải sửa gì, không nhờ cờ.",
    refs: [
      { label: "Bài 2.2, mục “Đã sửa 04/11”: isRetryable không có định nghĩa chính thức; notes và đề Udemy hiểu khác nhau ở lỗi validation", href: NOTES + "#fix-29" },
      { label: "Bài 2.2: bảng bốn errorCategory và việc agent nên làm với từng loại; lỗi truy cập khác kết quả rỗng hợp lệ", href: NOTES + "#l-2-2" },
      { label: "Cheatsheet D2: dòng “Lỗi này nên đặt isRetryable gì?”", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 5, n: 52, total: 60, sub: "2.5", subName: "Chọn built-in tool đúng việc", scen: "S1",
    answer: "A",
    ask: "A developer asks Claude Code to locate every handler file in all packages of the repository. By team convention, handler files are named <code>NAME.handler.ts</code>. Which built-in tool fits this step?",
    scene: [
      "Dev nhờ Claude Code tìm mọi file handler trong tất cả các package của repo.",
      "Team đặt tên file handler theo quy ước <code>NAME.handler.ts</code>, ví dụ <code>refund.handler.ts</code> (ví dụ minh họa).",
      "Chỗ khó: chuỗi “handler.ts” vừa là một phần tên file, vừa có thể nằm trong nội dung file khác (dòng import). Tìm nhầm chỗ là ra danh sách sai."
    ],
    asks: [
      "Built-in tool nào hợp với bước này?",
      "Tức là: việc này tìm theo tên file hay theo chữ trong file?",
      "Soi từng phương án: tool đó nhìn vào tên file, vào nội dung, hay chỉ vào những gì được import?"
    ],
    facts: [
      "Glob tìm đường dẫn file theo mẫu tên. <code>**</code> khớp qua mọi cấp thư mục, nên <code>**/*.handler.ts</code> khớp mọi file đuôi <code>.handler.ts</code> ở mọi package.",
      "Grep tìm chữ bên trong file (regex trên nội dung). Nó không nhìn tên file.",
      "Read đọc nội dung một file đã biết đường dẫn. Nó không liệt kê được trên đĩa đang có những file nào.",
      "Notes khuyên dùng Glob, Grep, Read thay cho Bash <code>find</code>, <code>grep</code>: tool chuyên dụng chỉ đọc, trả kết quả có cấu trúc và không bật hộp hỏi quyền. Bash thì có."
    ],
    opts: [
      { k: "A", gist: "Use Glob with a pattern like <code>**/*.handler.ts</code> to match handler files by name across the whole repository.",
        why: [
          "Quy ước nằm ở tên file, mà tìm theo tên là việc của Glob (ý 1).",
          "<code>**</code> đi qua mọi thư mục, nên một mẫu là phủ hết các package. File handler nào có trên đĩa cũng ra, kể cả file chưa ai import."
        ] },
      { k: "B", gist: "Use Grep with the pattern <code>handler.ts</code> to search file contents for mentions of the handler suffix.",
        why: [
          "Sai tool: Grep tìm trong nội dung, không nhìn tên file (ý 2).",
          "Nó chỉ ra những file có nhắc chuỗi đó trong nội dung, thường là file import handler. File handler không tự nhắc tên mình thì bị sót, còn file import thì lọt vào danh sách.",
          "Dễ bị cuốn vì Grep là tool tìm kiếm quen tay nhất. Nhưng câu hỏi là “file nào tên như vậy”, không phải “file nào chứa chữ đó”."
        ] },
      { k: "C", gist: "Read each package's index file, see which handler modules it imports, and list those.",
        why: [
          "Sai ở giả định: Read chỉ đọc file đã biết, không liệt kê file trên đĩa (ý 3).",
          "Index chỉ cho biết cái gì đã được nối vào. Handler đã tạo mà chưa import thì không hiện, trong khi đề cần mọi file handler đang có."
        ] },
      { k: "D", gist: "Use Bash to run <code>find</code> with a name filter, because shell commands can handle both path and content matching.",
        why: [
          "Chạy được: <code>find</code> lọc theo tên cũng ra đúng file.",
          "Nhưng Glob có sẵn và làm đúng việc này. Notes khuyên dùng tool chuyên dụng thay Bash: kết quả có cấu trúc, chỉ đọc, không bật hộp hỏi quyền (ý 4).",
          "Lý do “làm được cả đường dẫn lẫn nội dung” không liên quan: bước này chỉ cần tên file."
        ] }
    ],
    refs: [
      { label: "Bài 2.5: Grep tìm chữ trong file, Glob tìm tên file; mục “Biết thêm”: dùng Glob, Grep, Read thay Bash find, grep", href: NOTES + "#l-2-5" },
      { label: "Cheatsheet D2: dòng “Tìm mọi file test / Dockerfile” → Glob", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 5, n: 53, total: 60, sub: "1.5", subName: "Hook của Agent SDK: chặn tool call và chuẩn hóa dữ liệu", scen: "S1",
    answer: "AD",
    ask: "In this agent, a <code>PostToolUse</code> hook turns the Unix timestamps returned by <code>get_customer</code> into dates and the numeric status codes from <code>lookup_order</code> into status names. Which two implementation details make sure the model gets the converted values instead of the raw ones? (Select TWO.)",
    scene: [
      "Agent có một hook <code>PostToolUse</code> (chạy sau khi tool trả kết quả) làm hai việc quy đổi.",
      "<code>get_customer</code> trả Unix timestamp (số giây kể từ năm 1970), hook đổi thành ngày. <code>lookup_order</code> trả mã trạng thái dạng số, hook đổi thành tên trạng thái. Ví dụ minh họa:<pre><code>{ \"status\": 2 }  →  { \"status\": \"shipped\" }</code></pre>",
      "Chỗ khó: quy đổi đúng chưa đủ. Bản quy đổi phải thật sự thay bản gốc trước khi model đọc. Có những cách trả về trông giống nhau, nhưng model vẫn thấy bản gốc."
    ],
    asks: [
      "Hai chi tiết cài đặt nào bảo đảm model nhận giá trị đã quy đổi?",
      "Tức là: hook phải trả kết quả qua đúng trường thay output, và phải trả kịp, trước khi agent đi tiếp.",
      "Soi từng phương án: cuối cùng model đọc bản nào, bản gốc hay bản đã đổi?"
    ],
    facts: [
      "<code>PostToolUse</code> chạy sau khi tool trả kết quả, trước khi kết quả được nối vào <code>messages</code> cho Claude đọc. <code>PreToolUse</code> chạy trước khi tool chạy; <code>updatedInput</code> của nó chỉ sửa tham số gửi vào tool.",
      "Trong kết quả của PostToolUse, <code>updatedToolOutput</code> thay hẳn kết quả tool, dùng được cho mọi tool. <code>updatedMCPToolOutput</code> là trường cũ, chỉ cho tool MCP; docs khuyên dùng <code>updatedToolOutput</code>.",
      "Docs Hooks: với PostToolUse, <code>decision: \"block\"</code> chỉ thêm <code>reason</code> cạnh kết quả tool. Claude vẫn thấy output gốc; muốn thay thì dùng <code>updatedToolOutput</code>.",
      "Docs Agent SDK: mặc định agent chờ hook trả về rồi mới đi tiếp. Hook trả async output thì agent đi tiếp ngay, và output async không chặn, không sửa, không chèn context được nữa. Async chỉ dành cho việc phụ như ghi log."
    ],
    opts: [
      { k: "A", gist: "Make the hook complete synchronously and return its result before the agent continues to the next step.",
        why: [
          "Hook đồng bộ thì agent chờ nó trả về (ý 4), nên bản quy đổi kịp thay kết quả gốc trước khi model đọc.",
          "Nếu hook trả async, agent đi tiếp ngay với kết quả gốc. Lúc hook quy đổi xong thì đã muộn, output async không sửa được gì nữa (ý 4)."
        ] },
      { k: "B", gist: "Move the conversion into a <code>PreToolUse</code> hook that rewrites the request through <code>updatedInput</code>.",
        why: [
          "Sai chỗ: PreToolUse chạy trước khi tool chạy, <code>updatedInput</code> chỉ đổi tham số gửi vào (ý 1).",
          "Timestamp và mã số nằm trong thứ tool trả ra. Sửa lời gọi thì tool vẫn trả định dạng gốc, model vẫn đọc số thô."
        ] },
      { k: "C", gist: "Return <code>decision: \"block\"</code> and put the converted values in the hook's <code>reason</code> field.",
        why: [
          "Sai ở giả định: với PostToolUse, block không thay output. <code>reason</code> chỉ được thêm cạnh kết quả, Claude vẫn thấy output gốc (ý 3).",
          "Model đọc cả số thô lẫn bản quy đổi nằm trong một dòng ghi chú, và vẫn có thể dùng số thô. Không có gì bảo đảm.",
          "Dễ bị cuốn vì “block” nghe như chặn bản gốc lại. Nhưng tool đã chạy xong; block ở PostToolUse là cách góp ý cho Claude, không phải cách thay dữ liệu."
        ] },
      { k: "D", gist: "Return the converted result in the hook's <code>updatedToolOutput</code> field so it replaces the raw output.",
        why: [
          "Đúng trường: <code>updatedToolOutput</code> thay hẳn kết quả tool trước khi Claude đọc (ý 2). Model chỉ thấy ngày và tên trạng thái.",
          "Trường này dùng được cho mọi tool, kể cả hai tool MCP của agent này, nên không cần trường cũ <code>updatedMCPToolOutput</code>."
        ] }
    ],
    refs: [
      { label: "Bài 1.5, mục “Biết thêm”: updatedToolOutput thay hẳn kết quả, additionalContext chỉ nối thêm", href: NOTES + "#l-1-5" },
      { label: "Docs Agent SDK hooks, mục Asynchronous output: output async không chặn, không sửa, không chèn context được", href: "https://code.claude.com/docs/en/agent-sdk/hooks" },
      { label: "Docs Claude Code Hooks, mục PostToolUse decision control: block chỉ thêm reason, Claude vẫn thấy output gốc", href: "https://code.claude.com/docs/en/hooks" }
    ]
  },
  {
    de: 5, n: 54, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S1",
    answer: "C",
    ask: "An engineer on this team uses Claude Code to investigate why <code>process_refund</code> sometimes returns validation errors. The work will take several days, and other, unrelated Claude Code sessions run in the same repository in between. How can the engineer reliably get back to this exact investigation each day?",
    scene: [
      "Kỹ sư dùng Claude Code điều tra vì sao <code>process_refund</code> lúc được lúc trả lỗi validation.",
      "Cuộc điều tra kéo dài nhiều ngày. Xen giữa là các phiên Claude Code khác, làm việc khác, trong cùng repo.",
      "Chỗ khó: phiên gần nhất trong repo nhiều khi không phải phiên điều tra. Phải mở lại đúng phiên đó, không phải phiên mới nhất."
    ],
    asks: [
      "Mỗi ngày làm sao quay lại đúng cuộc điều tra này một cách chắc chắn?",
      "Tức là: cần cách chỉ định đúng một phiên cụ thể, không phụ thuộc phiên nào chạy sau cùng.",
      "Soi từng phương án: lệnh đó mở phiên nào, và có mang theo lịch sử điều tra không?"
    ],
    facts: [
      "Phiên (session) là toàn bộ lịch sử làm việc, kể cả kết quả tool, được lưu xuống đĩa. Mỗi phiên có ID và đặt tên được: <code>claude -n &lt;tên&gt;</code> (hay <code>--name</code>), hoặc gõ <code>/rename</code> trong phiên.",
      "<code>--resume &lt;id hoặc tên&gt;</code> mở đúng phiên được chỉ định. <code>--continue</code> mở phiên gần nhất trong thư mục hiện tại, nên dễ tiếp nhầm phiên khi nhiều việc dùng chung một thư mục.",
      "Fork (<code>fork_session</code>) sao chép lịch sử sang một phiên mới để đi tiếp độc lập. Dùng khi muốn thử hai hướng từ cùng một gốc.",
      "CLAUDE.md nạp vào mọi phiên của project. Nó dành cho quy ước ổn định của cả team."
    ],
    opts: [
      { k: "A", gist: "Call <code>fork_session</code> at the end of each day so the next day's work carries on from that branch.",
        why: [
          "Sai việc: fork để tách nhánh, thử hai hướng từ cùng gốc (ý 3). Ở đây chỉ có một cuộc điều tra, cần nối tiếp chứ không cần nhánh.",
          "Ngày nào cũng fork thì sinh ra một chuỗi phiên mới, mỗi ngày một ID. Hôm sau vẫn phải biết mở phiên nào, mà phương án không nói cách tìm."
        ] },
      { k: "B", gist: "Paste the day's key findings into <code>CLAUDE.md</code> so every new session in the repository starts with them.",
        why: [
          "Sai chỗ: CLAUDE.md nạp vào mọi phiên của project (ý 4). Ghi chú điều tra của một người sẽ chen vào phiên của mọi người, kể cả các phiên làm việc khác.",
          "Nó cũng chỉ mang theo vài dòng tóm tắt. Lịch sử hội thoại, kết quả tool, các giả thuyết đã loại đều mất."
        ] },
      { k: "C", gist: "Start the investigation with <code>claude --name refund-trace</code> and later reopen it with <code>claude --resume refund-trace</code>.",
        why: [
          "Đặt tên ngay lúc mở phiên (ý 1), rồi <code>--resume</code> theo tên mở đúng phiên đó (ý 2), dù sau đó trong repo có chạy bao nhiêu phiên khác.",
          "Lịch sử điều tra, kể cả kết quả tool, nạp lại đủ. Kỹ sư làm tiếp từ chỗ dừng hôm trước."
        ] },
      { k: "D", gist: "Run <code>claude --continue</code> every day so Claude Code reloads the latest conversation in the repository.",
        why: [
          "Sai ở giả định: <code>--continue</code> mở phiên gần nhất trong thư mục, không phải phiên mình chọn (ý 2).",
          "Đề nói rõ có phiên khác chạy xen giữa, nên phiên gần nhất nhiều khi là phiên của việc khác. Kỹ sư mở nhầm phiên.",
          "Dễ bị cuốn vì <code>--continue</code> đúng là lệnh nối lại phiên, lại gõ ngắn. Nhưng nó chỉ đúng khi từ lúc dừng tới giờ không có phiên nào khác chạy."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Biết thêm”: --continue lấy phiên gần nhất, --resume theo tên mở đúng phiên; đặt tên bằng --name hoặc /rename", href: NOTES + "#l-1-7" },
      { label: "Cheatsheet D1: dòng “Tiếp tục cuộc điều tra hôm qua (phiên có tên)”", href: NOTES + "#cheat-d1" }
    ]
  },
  {
    de: 5, n: 55, total: 60, sub: "5.1", subName: "Giữ thông tin quan trọng trong hội thoại dài", scen: "S1",
    answer: "D",
    ask: "Transcript review shows that a customer who said early on that they would take only a refund, never store credit, was offered store credit 25 turns later. The summarized history kept just “resolution preference discussed.” Which change prevents this most reliably?",
    scene: [
      "Đầu phiên, khách nói rõ chỉ nhận hoàn tiền, không nhận store credit (tín dụng để mua hàng tại cửa hàng).",
      "25 lượt sau, agent lại đề nghị store credit.",
      "Phần lịch sử đã bị tóm tắt chỉ còn “resolution preference discussed” (đã bàn về cách giải quyết khách muốn). Điều khách đã chốt rơi mất.",
      "Chỗ khó: ba phương án sai đều chữa quanh bản tóm tắt (tóm kỹ hơn, tóm muộn hơn, hỏi người khi không chắc). Gốc lỗi là điều khách chốt chỉ sống trong phần sẽ bị tóm."
    ],
    asks: [
      "Thay đổi nào ngăn chuyện này chắc chắn nhất?",
      "Tức là: để điều khách đã chốt ở đâu thì tóm tắt bao nhiêu lần cũng không mất.",
      "Soi từng phương án: thông tin đó có còn nằm trong phần bị tóm tắt không? Còn thì sớm muộn nó vẫn có thể rơi."
    ],
    facts: [
      "Progressive summarization (tóm tắt dần) là nén có mất mát. Thứ mất đầu tiên là chi tiết chính xác: số tiền, ngày, mã đơn, lời khách nêu rõ. Mỗi lần nén lại mất thêm.",
      "Case facts block: khối dữ liệu có cấu trúc ghi sự kiện của ca (mã khách, mã đơn, số tiền, điều khách đã chốt), đưa nguyên văn vào mọi request và nằm ngoài phần lịch sử bị tóm tắt.",
      "Lời dặn cho bước tóm tắt giúp giữ được nhiều chi tiết hơn. Nhưng bản tóm tắt vẫn do model viết lại, nên vẫn là xác suất.",
      "Confidence tự báo (điểm model tự chấm xem mình chắc bao nhiêu) lệch so với độ đúng thật. Model làm việc từ một bản tóm tắt mơ hồ không biết mình đã mất gì, nên vẫn tự tin."
    ],
    opts: [
      { k: "A", gist: "Have the agent rate how confident it is in the recalled preference and hand off to a human when the rating is low.",
        why: [
          "Sai ở giả định: confidence tự báo không đáng tin (ý 4). Bản tóm tắt không để lại dấu hiệu nào là đã thiếu, nên agent đề nghị store credit mà vẫn tự chấm cao.",
          "Có escalate thì cũng chỉ đẩy sang người những ca agent tự xử được. Điều khách đã chốt vẫn không có trong context."
        ] },
      { k: "B", gist: "Rewrite the summarization prompt so the model keeps every customer preference and amount word for word.",
        why: [
          "Có ích một phần: bản tóm tắt giữ được nhiều chi tiết hơn (ý 3).",
          "Nhưng mỗi lần nén, bản tóm tắt vẫn do model viết lại. Chỉ cần một lần nén mạnh tay là điều khách chốt lại rơi (ý 1).",
          "Dễ bị cuốn vì B sửa đúng chỗ đang hỏng là bản tóm tắt. Nhưng đề hỏi “most reliably” (chắc chắn nhất): D đưa thông tin ra khỏi phần bị tóm, B chỉ làm việc tóm bớt mất."
        ] },
      { k: "C", gist: "Raise the token threshold that triggers summarization so fewer of the early turns get condensed.",
        why: [
          "Sai ở chỗ chỉ hoãn: tới ngưỡng mới thì các lượt đầu vẫn bị tóm, điều khách chốt vẫn rơi (ý 1).",
          "Trong lúc chờ, context dài hơn và tốn hơn. Lượt khách nói rõ ý mình nằm giữa một input rất dài, cũng dễ bị bỏ sót."
        ] },
      { k: "D", gist: "Keep a persistent case-facts block, never summarized, that records what the customer has said they expect.",
        why: [
          "Đúng cách guide nêu (ý 2): “chỉ nhận hoàn tiền” nằm trong case facts block, ngoài phần lịch sử bị tóm tắt.",
          "Khối này đi kèm mọi request, nên ở lượt 25 hay lượt 50 agent vẫn đọc thấy nguyên văn điều khách đã chốt, dù lịch sử bị tóm bao nhiêu lần."
        ] }
    ],
    refs: [
      { label: "Bài 5.1, khung định nghĩa “Case facts block”: sự kiện của ca nằm ngoài phần lịch sử bị tóm tắt, đưa vào mỗi request", href: NOTES + "#l-5-1" },
      { label: "Cheatsheet D5: case facts block nằm ngoài summarized history", href: NOTES + "#cheat-d5" },
      { label: "Bài 4.1, khung định nghĩa “Confidence tự báo”: lệch so với độ đúng thật", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 5, n: 56, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S1",
    answer: "C",
    ask: "A billing dispute was put on hold yesterday after the agent had already called <code>get_customer</code> and <code>lookup_order</code>. During the night, a human agent applied a partial credit and updated the order in the backend. The case reopens today. How should the agent's context be restored?",
    scene: [
      "Hôm qua agent xử lý một ca tranh chấp hóa đơn, đã gọi <code>get_customer</code> và <code>lookup_order</code>, rồi ca bị tạm dừng.",
      "Qua đêm, một nhân viên đã cấp một khoản credit một phần (partial credit) và sửa đơn hàng trong hệ thống.",
      "Hôm nay ca mở lại. Chỗ khó: lịch sử phiên hôm qua vẫn còn nguyên, nhưng số dư và trạng thái đơn trong đó không còn đúng nữa."
    ],
    asks: [
      "Nên khôi phục context cho agent thế nào?",
      "Tức là: giữ được những gì đã biết về ca, nhưng agent phải làm việc trên số liệu hiện tại của hệ thống, không phải bản chụp hôm qua.",
      "Soi từng phương án: khôi phục xong, agent có còn đọc kết quả tool cũ như thể nó đúng không?"
    ],
    facts: [
      "Resume nạp lại toàn bộ lịch sử phiên, kể cả kết quả tool, đúng như lúc ghi. Không tool nào được gọi lại, nên agent không biết hệ thống đã đổi.",
      "Stale (lỗi thời): kết quả tool trong lịch sử phản ánh trạng thái cũ. Agent vẫn tin nó là đúng.",
      "Notes chốt: phần lớn kết quả tool đã lỗi thời thì mở phiên mới kèm bản tóm tắt có cấu trúc, đáng tin hơn resume. Phần lớn còn đúng thì resume và nói rõ cái gì đã đổi.",
      "Compact (nén lịch sử) chỉ tóm lại cái đang có, không làm mới số liệu nào. Lời dặn trong prompt là xác suất: dữ liệu cũ vẫn nằm trong context."
    ],
    opts: [
      { k: "A", gist: "Resume the saved session so the agent picks up directly from the earlier tool results in its transcript.",
        why: [
          "Sai ở giả định: resume nạp lại kết quả tool hôm qua y nguyên, không tra lại (ý 1). Số dư và trạng thái đơn trong đó đã stale (ý 2).",
          "Agent tính hoàn tiền trên số liệu chưa có khoản credit tối qua, có thể hoàn chồng lên khoản đã cấp."
        ] },
      { k: "B", gist: "Resume the saved session and add a system prompt instruction telling the agent not to trust older tool outputs.",
        why: [
          "Lời dặn là xác suất (ý 4). Số liệu cũ vẫn nằm trong context, agent vẫn có thể dựa vào nó.",
          "Agent cũng không được đưa số liệu mới để thay. Nó mang số cũ trong context mà lại bị dặn đừng tin, không có gì để làm tiếp.",
          "Dễ bị cuốn vì B có nhận ra chuyện dữ liệu cũ. Nhưng nó chỉ dặn, không gỡ dữ liệu cũ ra, cũng không lấy dữ liệu mới về."
        ] },
      { k: "C", gist: "Start a new session seeded with a structured case summary, and have the agent query the current backend state again.",
        why: [
          "Kết quả tool chính của ca (số dư, trạng thái đơn) đều đã lỗi thời, đúng trường hợp notes chốt: phiên mới kèm bản tóm tắt có cấu trúc (ý 3).",
          "Bản tóm tắt mang theo những gì không đổi: mã khách, mã đơn, lý do tranh chấp, việc đã làm. Phần đã đổi thì agent gọi tool lại để lấy số mới, nên thấy cả khoản credit tối qua."
        ] },
      { k: "D", gist: "Resume the saved session and compact its history first so the old tool results are condensed before continuing.",
        why: [
          "Sai ở giả định: compact chỉ nén, không làm mới (ý 4). Kết quả tool cũ thành bản tóm tắt cũ.",
          "Nén còn dễ làm rụng số tiền và ngày chính xác, đúng thứ ca tranh chấp hóa đơn cần."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Ba cách nối lại công việc”: kết quả tool đã lỗi thời thì phiên mới + tóm tắt có cấu trúc", href: NOTES + "#l-1-7" },
      { label: "Bài 5.1: tóm tắt mất số tiền, ngày chính xác trước tiên", href: NOTES + "#l-5-1" }
    ]
  },
  {
    de: 5, n: 57, total: 60, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool", scen: "S1",
    answer: "A",
    ask: "In this system, <code>process_refund</code> throws an unhandled exception whenever the requested amount is larger than the order total, and the MCP server reports this as a JSON-RPC protocol error. The agent only learns that the call failed, so it tells customers to try again later. What should the team change?",
    scene: [
      "Khách xin hoàn số tiền lớn hơn tổng giá trị đơn. <code>process_refund</code> ném exception mà không ai bắt.",
      "MCP server biến exception đó thành lỗi giao thức JSON-RPC.",
      "Agent chỉ biết là gọi hỏng, không biết vì sao, nên bảo khách “thử lại sau”. Lỗi này thử lại bao nhiêu lần cũng vậy.",
      "Chỗ khó: lý do thật (vượt tổng đơn) có sẵn, nhưng đi nhầm kênh nên không tới tay agent."
    ],
    asks: [
      "Team nên đổi gì?",
      "Tức là: đưa lý do lỗi vào đúng kênh agent đọc được, để nó giải thích hạn mức cho khách và chọn bước tiếp hợp lý.",
      "Soi từng phương án: lý do lỗi có tới được agent không, và có phải lý do thật không?"
    ],
    facts: [
      "MCP có hai kênh lỗi. Lỗi giao thức JSON-RPC dành cho tool không tồn tại, request sai khung <code>tools/call</code>, server sập.",
      "Lỗi thực thi trả ngay trong kết quả tool với <code>isError: true</code>: input sai, dịch vụ phía sau hỏng, vi phạm luật nghiệp vụ. Hoàn vượt tổng đơn là lỗi nghiệp vụ, thuộc kênh này.",
      "Spec ghi client SHOULD (nên) đưa lỗi thực thi cho model để nó tự sửa, còn lỗi giao thức thì chỉ MAY (có thể). Muốn model đọc được lỗi thì trả qua <code>isError</code>.",
      "Báo một thất bại như thể thành công là giấu lỗi. Agent không có lý do gì để giải thích, có khi còn báo khách là đã hoàn."
    ],
    opts: [
      { k: "A", gist: "Catch the exception inside the tool handler and return a tool result with <code>isError: true</code> that names the violated rule.",
        why: [
          "Bắt exception ngay trong tool rồi trả lỗi thực thi, đúng kênh cho lỗi nghiệp vụ (ý 2). Kênh này là kênh client nên đưa cho model (ý 3).",
          "Câu mô tả nêu luật bị vi phạm (hoàn vượt tổng đơn), nên agent giải thích được cho khách, rồi đề nghị hoàn đúng mức hoặc escalate, thay vì bảo “thử lại sau”."
        ] },
      { k: "B", gist: "Add a system prompt instruction telling the agent to explain the refund limit whenever <code>process_refund</code> fails.",
        why: [
          "Sai ở chỗ đoán thay vì biết: agent vẫn không nhận được lý do thật, prompt chỉ cài sẵn một câu giải thích.",
          "<code>process_refund</code> hỏng vì lý do khác (timeout, không có quyền) thì agent vẫn nói chuyện hạn mức. Sai với khách."
        ] },
      { k: "C", gist: "Keep the JSON-RPC protocol error, but put the explanation of the violated rule into its error message text.",
        why: [
          "Sai kênh: vượt tổng đơn là lỗi nghiệp vụ, thuộc kênh <code>isError</code>, không phải lỗi giao thức (ý 1, ý 2).",
          "Lỗi giao thức thì client chỉ “có thể” đưa cho model (ý 3). Lời giải thích viết hay tới đâu cũng chưa chắc tới tay agent, và đề đã cho thấy agent chỉ biết là gọi hỏng.",
          "Dễ bị cuốn vì C có thêm đúng câu giải thích agent cần. Nhưng chỗ hỏng là kênh, không phải nội dung câu báo lỗi."
        ] },
      { k: "D", gist: "Return a success result containing an empty refund object, so the agent concludes nothing was refunded.",
        why: [
          "Giấu lỗi (ý 4). Agent thấy “thành công” mà không có chút lý do nào về hạn mức.",
          "Agent có thể hiểu sai object rỗng, thậm chí báo khách là đã hoàn tiền."
        ] }
    ],
    refs: [
      { label: "Bài 2.2, ô “Đã sửa 02/11”: hai kênh lỗi MCP; lỗi thực thi trả isError để model đọc được", href: NOTES + "#fix-13" },
      { label: "Bài 2.2, mục “Biết thêm”: input sai thì trả isError, đừng ném lỗi giao thức", href: NOTES + "#l-2-2" },
      { label: "Spec MCP 2026-07-28, mục Error Handling: Protocol Errors và Tool Execution Errors", href: "https://modelcontextprotocol.io/specification/2026-07-28/server/tools" }
    ]
  },
  {
    de: 5, n: 58, total: 60, sub: "1.3", subName: "Gọi subagent, truyền context", scen: "S1",
    answer: "BD",
    ask: "The agent hands policy research to a subagent, which reads several returns-policy documents and sends back a prose summary. The refund explanations that follow cite the wrong policy version. Which two changes keep every claim tied to its source document, from the subagent's input all the way to its report? (Select TWO.)",
    scene: [
      "Agent giao việc tra chính sách cho một subagent. Subagent đọc vài tài liệu chính sách đổi trả, rồi trả về một đoạn văn tóm tắt.",
      "Lời giải thích hoàn tiền sau đó trích nhầm phiên bản chính sách.",
      "Chỗ khó: lúc viết thành văn, các tài liệu bị trộn vào nhau, nên mất dấu câu nào lấy từ tài liệu nào. Đề đòi giữ nguồn ở cả hai đầu: lúc đưa vào subagent và lúc subagent trả ra."
    ],
    asks: [
      "Hai thay đổi nào giữ mỗi khẳng định gắn với tài liệu nguồn của nó, từ đầu vào của subagent tới báo cáo của nó?",
      "Tức là: một bước lo đầu vào (tài liệu đưa vào có nhãn nguồn tách riêng), một bước lo đầu ra (kết quả trả về có chỗ riêng cho nguồn).",
      "Soi từng phương án: nó có tạo chỗ riêng cho nguồn trong dữ liệu không, hay chỉ dặn model nhớ?"
    ],
    facts: [
      "Subagent có context riêng. Mọi thứ nó đọc ở lại trong đó; agent chính chỉ nhận câu trả lời cuối. Cái gì không nằm trong câu trả lời cuối thì agent chính không có.",
      "Khi chuyển tài liệu giữa các agent, tách nội dung (khẳng định, con số, trích đoạn) khỏi metadata (tên tài liệu, phiên bản, mục, ngày). Trộn thành một đoạn văn thì mỗi lần tóm tắt lại rơi bớt nguồn. Guide gọi đây là mất attribution (mất ghi nguồn).",
      "Docs Prompting best practices: có nhiều tài liệu thì bọc mỗi tài liệu trong thẻ <code>&lt;document&gt;</code>, với hai thẻ con <code>&lt;document_content&gt;</code> và <code>&lt;source&gt;</code> tách riêng.",
      "Guide 5.6: claim-source mapping (ánh xạ khẳng định → nguồn) có cấu trúc, mỗi khẳng định đi kèm tài liệu và đoạn trích. Agent phía sau phải giữ ánh xạ đó, không viết lại thành văn xuôi."
    ],
    opts: [
      { k: "A", gist: "Have the subagent give each statement a confidence score so the main agent can discount claims that lack support.",
        why: [
          "Sai thứ cần giữ: điểm confidence nói subagent chắc tới đâu, không nói khẳng định lấy từ tài liệu nào.",
          "Một câu trích nhầm phiên bản vẫn có thể được chấm rất tự tin. Nguồn đã mất thì điểm số không lấy lại được."
        ] },
      { k: "B", gist: "In the subagent's prompt, wrap every policy document in tags that keep its content apart from its source.",
        why: [
          "Lo đầu vào. Mỗi tài liệu có thẻ <code>&lt;source&gt;</code> riêng, tách khỏi <code>&lt;document_content&gt;</code> (ý 2, ý 3). Subagent có nhãn rõ cho từng tài liệu, không phải đoán từ một tiêu đề nằm lẫn trong bài.",
          "Có nhãn rõ ở đầu vào thì subagent mới có cái để ghi lại cạnh từng phát hiện ở đầu ra."
        ] },
      { k: "C", gist: "Add a system prompt instruction telling the subagent to remember which policy document each statement came from.",
        why: [
          "Chỉ là lời dặn, vẫn là xác suất. Đầu ra vẫn là văn xuôi, không có chỗ riêng cho nguồn.",
          "Lúc viết thành văn, nguồn vẫn dễ trộn vào nhau như cũ (ý 2). Agent chính vẫn phải đoán.",
          "Dễ bị cuốn vì C nhắm đúng chuyện cần giữ nguồn. Nhưng giữ nguồn cần một ô riêng trong dữ liệu, không phải một lời nhắc."
        ] },
      { k: "D", gist: "Have the subagent return each finding as a structured record that pairs the claim with its source document and section.",
        why: [
          "Lo đầu ra. Chỉ câu trả lời cuối của subagent tới được agent chính (ý 1), nên nguồn phải nằm trong đó, ở một trường riêng.",
          "Mỗi phát hiện kèm tài liệu và mục (ý 4). Agent chính nêu đúng phiên bản chính sách, không phải đoán từ một đoạn văn đã trộn."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Truyền kết quả thế nào để không mất nguồn”: tách nội dung khỏi metadata", href: NOTES + "#l-1-3" },
      { label: "Bài 5.6: claim-source mapping phải được giữ qua các bước tổng hợp", href: NOTES + "#l-5-6" },
      { label: "Docs Prompting best practices: bọc mỗi tài liệu trong thẻ document, tách document_content và source", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
    ]
  },
  {
    de: 5, n: 59, total: 60, sub: "5.4", subName: "Quản lý context khi khám phá codebase lớn", scen: "S1",
    answer: "B",
    ask: "In billing disputes that cover many orders, the agent's main conversation fills up with dozens of <code>lookup_order</code> results, and later the agent loses track of the customer's original complaint and the established case facts. Which change best keeps the main agent focused on coordinating the case?",
    scene: [
      "Ca tranh chấp hóa đơn liên quan nhiều đơn hàng. Agent gọi <code>lookup_order</code> hàng chục lần ngay trong hội thoại chính.",
      "Hàng chục kết quả đó chiếm dần context. Về sau agent quên lời khiếu nại ban đầu của khách và các sự kiện đã chốt của ca.",
      "Chỗ khó: agent chính đang làm hai việc một lúc, điều phối ca và tra từng đơn. Việc tra đơn dài dòng đè lên việc điều phối."
    ],
    asks: [
      "Thay đổi nào giữ agent chính tập trung vào việc điều phối tốt nhất?",
      "Tức là: đưa mớ kết quả tra đơn ra khỏi context chính, mà con số vẫn chính xác.",
      "Soi từng phương án: hàng chục kết quả <code>lookup_order</code> có còn đổ vào hội thoại chính không?"
    ],
    facts: [
      "Context degradation: context đầy output dài dòng thì thông tin quan trọng bị chôn hoặc bị nén mất. Cách chữa là đưa output dài ra khỏi context, không phải dùng context lớn hơn.",
      "Subagent delegation: giao một việc tra cứu cho subagent. Subagent khởi động với context trống, chỉ có lời giao việc. Output dài ở lại trong context của nó; agent chính chỉ nhận kết quả đã gom gọn.",
      "Tóm tắt là nén có mất mát. Thứ mất đầu tiên là số tiền, ngày, mã đơn.",
      "Lời dặn trong prompt không đổi được thứ đang nằm trong context."
    ],
    opts: [
      { k: "A", gist: "Move to a model with a bigger context window so all the order lookups fit in the conversation.",
        why: [
          "Sai ở giả định: vấn đề không phải thiếu chỗ chứa mà là thứ đang chiếm context (ý 1).",
          "Context lớn hơn thì vẫn chứa hàng chục kết quả tra đơn đè lên lời khiếu nại. Chỉ là hỏng chậm hơn."
        ] },
      { k: "B", gist: "Hand the multi-order investigation to a subagent that returns only a summary of the disputed charges.",
        why: [
          "Hàng chục lần <code>lookup_order</code> chạy trong context của subagent, không vào hội thoại chính (ý 2).",
          "Agent chính chỉ nhận bản gọn các khoản tranh chấp, nên còn chỗ cho lời khiếu nại, sự kiện của ca và quyết định hoàn tiền. Đúng vai điều phối.",
          "Subagent không thấy hội thoại chính, nên lời giao việc phải ghi đủ mã khách, các đơn và các khoản cần kiểm."
        ] },
      { k: "C", gist: "Add a system prompt instruction telling the agent to keep the original complaint in mind for the whole session.",
        why: [
          "Lời dặn không đổi được thứ nằm trong context (ý 4). Lời khiếu nại vẫn bị chôn dưới hàng chục kết quả tra đơn.",
          "Agent vẫn quên như cũ, chỉ có thêm một dòng nhắc."
        ] },
      { k: "D", gist: "Summarize the conversation after every <code>lookup_order</code> call so the accumulated order data stays condensed.",
        why: [
          "Tóm tắt liên tục là mất mát liên tục (ý 3). Số tiền, mã đơn chính xác thành câu chung chung.",
          "Ca tranh chấp hóa đơn cần đúng những con số đó. Đề đã cho thấy agent đang mất sự kiện của ca, D làm chuyện đó nặng hơn.",
          "Dễ bị cuốn vì D làm context gọn thật. Nhưng D gọn bằng cách bỏ chi tiết, còn B gọn bằng cách để chi tiết ở chỗ khác."
        ] }
    ],
    refs: [
      { label: "Bài 5.4, khung định nghĩa “Subagent delegation”: output dài ở lại trong subagent, phiên chính chỉ nhận bản gọn", href: NOTES + "#l-5-4" },
      { label: "Bài 1.3, khung định nghĩa “Spawn”: subagent khởi động trống, chỉ biết lời giao việc", href: NOTES + "#l-1-3" },
      { label: "Bài 5.1: tóm tắt mất số tiền, mã đơn trước tiên", href: NOTES + "#l-5-1" }
    ]
  },
  {
    de: 5, n: 60, total: 60, sub: "1.6", subName: "Chia việc lớn", scen: "S1",
    answer: "A",
    ask: "Draft replies the agent writes for billing disputes sometimes leave out the refund timeline or the policy clause that was applied. Every reply is produced in a single step, so the team cannot tell where the details get lost. Which design change best fixes both problems?",
    scene: [
      "Agent soạn thư trả lời ca tranh chấp hóa đơn. Thỉnh thoảng thư thiếu mốc thời gian hoàn tiền, hoặc thiếu điều khoản chính sách đã áp.",
      "Mỗi thư được viết trong một bước, tức một lần gọi model.",
      "Chỗ khó: đề nêu hai vấn đề. Một: thư thiếu chi tiết. Hai: team không thấy được chi tiết rơi ở đâu. Phương án đúng phải lo cả hai."
    ],
    asks: [
      "Thay đổi thiết kế nào giải quyết cả hai vấn đề tốt nhất?",
      "Tức là: vừa có bước kiểm bắt được thư thiếu chi tiết, vừa có chỗ xem từng bước đã làm ra gì.",
      "Soi từng phương án: nó có kiểm chi tiết thật không, và có cho thấy chi tiết rơi ở bước nào không?"
    ],
    facts: [
      "Prompt chaining: chuỗi nhiều lần gọi model với các bước định sẵn trong code; output bước trước là input bước sau.",
      "Viết “bước 1 làm A, bước 2 làm B” trong một prompt vẫn chỉ là một lần gọi: không kiểm được giữa các bước, không ghi log từng bước. Chuỗi thật là nhiều lần gọi riêng, do code nối lại.",
      "Docs Prompting best practices: tách thành chuỗi lời gọi đáng dùng khi cần xem output trung gian. Mẫu hay gặp nhất là self-correction (tự sửa): viết nháp → Claude chấm bản nháp theo tiêu chí → Claude sửa theo lời chấm. Mỗi bước một lần gọi, nên ghi log, chấm hay rẽ nhánh được ở bất kỳ bước nào.",
      "Few-shot và lời dặn in hoa làm model dễ làm đúng hơn, nhưng vẫn là xác suất, và vẫn nằm trong một bước."
    ],
    opts: [
      { k: "A", gist: "Break the reply into separate draft, checklist-review and refine calls, and log what each stage produces.",
        why: [
          "Đúng mẫu self-correction (ý 3): bước chấm so bản nháp với checklist (có mốc hoàn tiền chưa, có điều khoản chưa), bước sửa bổ sung chỗ thiếu trước khi thư tới khách.",
          "Mỗi bước là một lần gọi riêng (ý 2), nên log cho thấy chi tiết rơi ở đâu: bản nháp đã thiếu từ đầu, hay bước sửa làm rơi.",
          "Lo đủ cả hai vấn đề đề nêu."
        ] },
      { k: "B", gist: "Add few-shot examples of complete billing-dispute replies that show both the timeline and the policy clause.",
        why: [
          "Có ích một phần: ví dụ đầy đủ làm thư dễ có đủ chi tiết hơn (ý 4).",
          "Nhưng thư vẫn viết trong một bước. Không có gì kiểm thư thiếu, cũng không thấy chi tiết rơi ở đâu. Chỉ lo được một nửa vấn đề thứ nhất.",
          "Dễ bị cuốn vì few-shot là cách quen dùng để output ổn định. Nhưng đề đòi cả việc thấy được lỗi rơi ở đâu, mà few-shot không cho thấy gì."
        ] },
      { k: "C", gist: "Regenerate any reply shorter than the median resolution length until it passes a length check.",
        why: [
          "Sai thước đo: độ dài không cho biết thư có mốc hoàn tiền hay điều khoản không.",
          "Thư dài mà thiếu chi tiết vẫn qua, thư ngắn gọn mà đủ lại bị viết lại. Viết lại trong cùng một bước cũng không cho thấy chi tiết rơi ở đâu."
        ] },
      { k: "D", gist: "Repeat the required reply elements in capital letters at the top of the system prompt and on every turn.",
        why: [
          "Viết in hoa, nhắc lại mỗi lượt chỉ làm yêu cầu nổi hơn các câu khác. Vẫn là xác suất (ý 4).",
          "Thư vẫn viết trong một bước kín. Không có bước kiểm, không có log từng bước."
        ] }
    ],
    refs: [
      { label: "Bài 1.6, mục “Biết thêm”: một prompt nhiều bước vẫn là một lần gọi; chuỗi thật là nhiều lần gọi riêng, ghi log được", href: NOTES + "#l-1-6" },
      { label: "Bài 1.6, ô “Đã sửa 02/11”: năm mẫu workflow, trong đó có evaluator-optimizer (một lần gọi viết, một lần gọi chấm)", href: NOTES + "#fix-17" },
      { label: "Docs Prompting best practices, mục Chain complex prompts: mẫu self-correction viết nháp → chấm → sửa", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
    ]
  }
);
