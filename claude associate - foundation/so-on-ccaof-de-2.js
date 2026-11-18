// Sổ ôn CCAO-F, Đề 2. Trang so-on-ccaof.html nạp file này trước script render.
// Nguồn: examtopics “Anthropic CCAO-F Actual Exam Questions” (141 câu, cập nhật 07/10/2026), Topic 1, chép từ ảnh ngày 18/11/2026.
// Đáp án examtopics và tỉ lệ bình chọn nằm ở nguon/examtopics-ccaof-de-2-raw.json (không đưa lên git).
// Mỗi câu một phần tử, xếp theo n. Các trường:
//   de, n, total        số đề trong sổ; số thứ tự câu trong đề gốc; tổng số câu của đề gốc
//   sub, subName        task statement của guide (vd "2.4") và tên bài bằng tiếng Việt
//   answer              đáp án đúng, đã kiểm bằng notes CCAO-F hoặc docs chính thức
//   dispute             (tùy chọn) ghi chú khi đáp án đề gốc khác answer, hoặc đề mơ hồ
//   ask, opts[].gist    tiếng Anh, viết lại bằng lời riêng (không chép nguyên văn)
//   scene, asks, facts  phân tích đề: đề kể gì, đề hỏi gì, cần biết trước (tiếng Việt)
//   opts[].why          vì sao phương án đúng hay sai, dạng mảng gạch đầu dòng (tiếng Việt)
//   refs[]              { label, href: NOTES + "#<id có trong notes>" }
DE[2] = "ExamTopics · 141 câu · 18/11/2026";
ENTRIES.push(
  {
    de: 2, n: 1, total: 141, sub: "5.3", subName: "Viết chỉ dẫn cấp hệ thống",
    answer: "D",
    ask: "A learning specialist is setting up a Project for course-design work. The organization has its own internal instructional-design standard and a preferred structure for lesson outlines. Which set of custom instructions supports this use best?",
    scene: [
      "Một chuyên viên đào tạo dựng Project để thiết kế khóa học.",
      "Tổ chức có sẵn hai thứ: một chuẩn thiết kế bài giảng nội bộ (instructional-design standard) và một khung dàn ý bài học ưa dùng.",
      "Bốn phương án là bốn bộ custom instructions (chỉ dẫn đặt sẵn cho Project). Chúng khác nhau ở chỗ: có nêu vai không, có buộc theo chuẩn không, có nêu khung dàn ý không, hay đẩy những thứ đó sang từng chat."
    ],
    asks: [
      "Bộ chỉ dẫn nào hợp nhất với việc này?",
      "Tức là: thứ lặp lại ở mọi bài học phải nằm trong instructions, và không bỏ sót thứ tổ chức đã quyết sẵn.",
      "Soi từng phương án: nó có đủ vai, chuẩn và khung dàn ý không? Có đẩy thứ cố định sang từng chat không?"
    ],
    facts: [
      "Project instructions là chỉ dẫn đặt một lần, áp cho mọi chat trong project. Thứ lặp lại ở mọi chat (người đọc, giọng, định dạng chuẩn, ràng buộc lâu dài) đặt ở đây. Việc riêng của lần này thì nói trong tin nhắn.",
      "Bộ khung bảy phần của một bản chỉ dẫn: vai, việc và phạm vi, người đọc, định dạng, nguồn, khi không chắc, ưu tiên.",
      "Phần nào bỏ trống thì Claude tự lấp. Không nói định dạng thì Claude dùng định dạng mặc định, mỗi lần một kiểu.",
      "Vai cho Claude một góc nhìn, nhưng không thay được các phần khác. Vai không cho Claude biết chuẩn hay khung dàn ý của tổ chức."
    ],
    opts: [
      { k: "A", gist: "Name Claude's role as a course designer, and let each chat's prompt spell out the standards and outline structure for that lesson, because lessons differ a lot.",
        why: [
          "Sai ở chỗ đặt: chuẩn thiết kế và khung dàn ý là thứ cố định của tổ chức, lặp lại ở mọi bài học. Chỗ của chúng là instructions, không phải từng tin nhắn (ý 1).",
          "Để từng chat tự nêu thì có chat quên, có chat nêu mỗi kiểu một khác. Output lệch chuẩn mà không ai biết lệch từ đâu.",
          "Dễ bị cuốn vì “lessons vary widely” (bài học rất khác nhau) nghe hợp lý. Nhưng thứ khác nhau là chủ đề từng bài, nói trong tin nhắn. Chuẩn và khung thì không đổi."
        ] },
      { k: "B", gist: "Name the course-designer role and require alignment with the organization's design standards, but let Claude choose the outline structure from each lesson's topic.",
        why: [
          "Có vai và chuẩn, nhưng bỏ trống định dạng trong khi tổ chức đã có khung dàn ý ưa dùng (ý 2).",
          "Claude sẽ tự chọn cấu trúc, mỗi bài một kiểu (ý 3). Người dùng phải sửa tay cho đúng khung, việc mà một dòng instructions làm thay được."
        ] },
      { k: "C", gist: "Give only the preferred outline structure, on the view that the structure already implies the standards and naming a role adds nothing.",
        why: [
          "Sai ở giả định: khung dàn ý là hình dạng của output, không mang theo nội dung của chuẩn thiết kế. Không ai nói ra thì Claude không biết chuẩn nội bộ là gì (ý 3, 4).",
          "Bỏ cả vai lẫn yêu cầu theo chuẩn. Output đúng khung mà có thể sai chuẩn."
        ] },
      { k: "D", gist: "Name the course-designer role, require alignment with the organization's design standards, and specify the preferred structure for lesson outlines.",
        why: [
          "Đủ ba thứ cố định của việc này: vai, chuẩn phải theo, khung dàn ý (ý 2). Cả ba đặt một lần, áp cho mọi chat (ý 1).",
          "Phần đổi theo từng bài (chủ đề, đối tượng của bài đó) để trong tin nhắn. Claude không phải đoán thứ tổ chức đã quyết sẵn (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 5.3, bảng “Cái gì đáng thành chỉ dẫn, cái gì để trong tin nhắn” và “Bộ khung bảy phần”: thứ lặp lại ở mọi chat đặt trong instructions", href: NOTES + "#l-5-3" },
      { label: "Bài 5.1, mục “Instructions hay knowledge”: instructions là cách làm áp cho mọi chat (vai, giọng, định dạng)", href: NOTES + "#l-5-1" },
      { label: "Bài Nền tảng D1, bảng “Các phần của một prompt tốt”: thiếu định dạng thì Claude dùng mặc định, vai không thay được các phần khác", href: NOTES + "#l-1-0" }
    ]
  },
  {
    de: 2, n: 2, total: 141, sub: "4.5", subName: "Nói với stakeholder về giá trị và giới hạn",
    answer: "DE",
    ask: "As a project manager, you are reviewing messages your teammates drafted for stakeholders about Claude's role in a workflow. Which two messages are appropriate to send? (Select two.)",
    scene: [
      "Mày là quản lý dự án. Đồng đội soạn sẵn mấy thông điệp gửi stakeholder (người có quyền lợi trong việc này) về vai trò của Claude trong một quy trình.",
      "Mày phải chọn hai thông điệp nên gửi.",
      "Ba phương án sai đều cố làm stakeholder yên tâm. Hai phương án đúng nói cả chỗ Claude hụt và chỗ người còn giữ."
    ],
    asks: [
      "Hai thông điệp nào phù hợp để nói với stakeholder về Claude?",
      "Tức là: thông điệp nào cho stakeholder hiểu đúng Claude làm được gì, không làm được gì, và người giữ phần nào.",
      "Soi từng phương án: nó có hứa quá không, có mơ hồ không, có nói giới hạn không?"
    ],
    facts: [
      "Hallucination (bịa thông tin) là đặc tính đã biết, không phải trục trặc ngẫu nhiên. Không biện pháp nào bảo đảm 0 lỗi. Hứa biện pháp, không hứa hoàn hảo.",
      "Bán cho đúng: Claude mang tới tốc độ và quy mô, người mang tới phán đoán và giám sát. Chỉ kể điểm mạnh là dọn sẵn chỗ cho thất vọng.",
      "Transparency Diligence: thành thật về vai trò của AI với mọi người cần biết.",
      "Stakeholder không có cách hiểu nào về Claude thì hay rơi vào một trong hai cực: thấy một bản đẹp là tin hết, gặp một lỗi là không tin gì nữa."
    ],
    opts: [
      { k: "A", gist: "A claim that the model never makes mistakes and needs no quality review.",
        why: [
          "Sai sự thật: bịa thông tin là đặc tính đã biết, không cách nào bảo đảm 0 lỗi (ý 1).",
          "Stakeholder tin câu này sẽ cắt luôn bước duyệt. Lỗi đầu tiên lọt ra là mất lòng tin vào cả quy trình (ý 4)."
        ] },
      { k: "B", gist: "A vague reassurance that “the AI is handling it”, with no further detail.",
        why: [
          "Không nói Claude làm phần nào, người làm phần nào, chỗ nào có thể sai (ý 3). Stakeholder không có gì để dựa vào khi quyết.",
          "Dễ bị cuốn vì nghe nhẹ nhàng, không hứa con số nào. Nhưng mơ hồ cũng là hứa quá: người nghe tự hiểu là “không phải lo gì”."
        ] },
      { k: "C", gist: "A claim that Claude will take care of every task with no human involvement at all.",
        why: [
          "Trái với cách bán đúng: Claude làm cùng người, không thay người (ý 2). Phán đoán và giám sát vẫn là phần của người.",
          "Hứa thế này thì không ai giữ giờ người duyệt. Khi có lỗi, không còn ai đứng chặn."
        ] },
      { k: "D", gist: "A clear statement of the integration's limits and its known failure modes.",
        why: [
          "Đúng. Nói trước giới hạn và các kiểu lỗi đã biết là hứa biện pháp, không hứa hoàn hảo (ý 1).",
          "Khi có lỗi lọt qua, stakeholder đã được báo trước nên vẫn tin người báo. Họ đứng được ở giữa hai cực (ý 4)."
        ] },
      { k: "E", gist: "An honest account of where Claude helps and where people still make the decisions.",
        why: [
          "Đúng. Đây là câu “người làm cùng Claude”: Claude soạn, người quyết (ý 2). Nói rõ vai trò của Claude với người cần biết là Transparency Diligence (ý 3).",
          "D và E bổ sung nhau. D nói Claude có thể sai ở đâu, E nói ai chặn chỗ đó."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Bán cho đúng” và “Hứa biện pháp, không hứa hoàn hảo”: Claude làm cùng người, không biện pháp nào bảo đảm 0 lỗi", href: NOTES + "#l-4-5" },
      { label: "Bài Nền tảng D4: stakeholder và Transparency Diligence", href: NOTES + "#l-4-0" }
    ]
  },
  {
    de: 2, n: 3, total: 141, sub: "2.3", subName: "Kiểm từng khẳng định",
    answer: "D",
    ask: "You are checking a competitor brief drafted by Claude for claims that lack support. What is the right order? <br>(1) Cross-check each specific claim against the supplied source material or trusted outside references.<br>(2) Based on the findings, decide whether to correct, re-prompt or escalate.<br>(3) Record every unsupported or inconsistent claim with its location and severity.<br>(4) Pick out the specific factual claims, statistics and citations in the brief.<br>(5) Read the brief from start to finish and flag any claims that seem surprising.",
    scene: [
      "Claude soạn một bản tóm lược về đối thủ (competitor brief). Mày phải soát nó để tìm khẳng định không có căn cứ.",
      "Đề cho năm bước: đọc hết bài, tách các khẳng định cụ thể, đối chiếu với nguồn, ghi lại, quyết cách xử lý. Bốn phương án là bốn cách xếp.",
      "Bốn phương án đều kết thúc bằng 3 rồi 2. Chỗ khác nhau là thứ tự của 5, 4, 1 ở đầu."
    ],
    asks: [
      "Thứ tự đúng của các bước soát là gì?",
      "Tức là: bước nào cần kết quả của bước nào. Đối chiếu cần có danh sách khẳng định, danh sách cần có lượt đọc toàn bài.",
      "Soi từng phương án: lúc bước (1) chạy, đã có danh sách đầy đủ để kiểm chưa, hay chỉ có mấy câu “nghe lạ”?"
    ],
    facts: [
      "Claim (khẳng định) là một câu nói một điều có thể đúng hoặc sai. Kiểm sau khi Claude viết: tách bản nháp thành từng khẳng định, xếp theo hệ quả, so với nguồn đang nắm sự thật đó, ghi lại nguồn của từng câu.",
      "“Nghe lạ” là bộ lọc kém. Chi tiết bịa thường nghe rất chuyên nghiệp, nên chỉ kiểm câu nghe lạ sẽ bỏ sót đúng chỗ cần kiểm.",
      "Xếp theo hệ quả là kiểm trước những câu mà kết luận dựa vào. Muốn biết kết luận của bài dựa vào câu nào thì phải đọc hết bài.",
      "Con số, thống kê, trích dẫn thuộc loại nội dung dễ sai. Kiểm là so với nguồn nằm ngoài Claude, xong rồi mới quyết sửa, prompt lại hay chuyển lên người có thẩm quyền."
    ],
    opts: [
      { k: "A", gist: "1, 4, 5, 3, 2",
        why: [
          "Làm (1) trước (4): đối chiếu khi chưa tách ra khẳng định nào, chưa biết phải kiểm câu nào (ý 1).",
          "Lượt đọc toàn bài (5) lại đứng sau cả bước kiểm, nên không còn giúp chọn câu nào kiểm trước (ý 3)."
        ] },
      { k: "B", gist: "4, 5, 1, 3, 2",
        why: [
          "Đảo hai bước đầu: tách khẳng định (4) trước khi đọc hết bài (5). Lúc tách chưa biết kết luận của bản tóm lược dựa vào câu nào (ý 3).",
          "Lượt đọc toàn bài đặt sau chỉ còn để đánh dấu câu nghe lạ, thứ không thêm gì cho bước kiểm (ý 2).",
          "Dễ bị cuốn vì nó đưa bước tách khẳng định lên đầu, nghe đúng bài. Nhưng muốn tách cho đủ và biết câu nào nặng thì phải đọc bài trước đã."
        ] },
      { k: "C", gist: "5, 1, 4, 3, 2",
        why: [
          "Làm (1) ngay sau (5): chỉ đối chiếu những câu vừa đánh dấu là nghe lạ, khi chưa có danh sách đầy đủ ở (4).",
          "Đó là lấy “nghe lạ” làm bộ lọc (ý 2). Con số bịa mà nghe trơn tru sẽ lọt qua, và bước (4) tới sau thì đã muộn."
        ] },
      { k: "D", gist: "5, 4, 1, 3, 2",
        why: [
          "Đúng. Đọc hết bài (5) để nắm bản tóm lược kết luận gì, rồi tách mọi khẳng định cụ thể, số liệu, trích dẫn (4), rồi mới đối chiếu từng câu với nguồn (1) (ý 1, 3, 4).",
          "Câu đánh dấu nghe lạ ở (5) chỉ là gợi ý thêm. Bước (4) vẫn kéo mọi khẳng định cụ thể vào danh sách kiểm, nên không câu nào lọt chỉ vì nghe trơn (ý 2).",
          "Ghi lại vị trí và mức nặng (3) trước khi quyết sửa, prompt lại hay chuyển lên (2): quyết dựa trên bức tranh đầy đủ."
        ] }
    ],
    refs: [
      { label: "Bài 2.3, mục “Sau khi Claude viết: kiểm từng khẳng định”: tách khẳng định, xếp theo hệ quả, so với nguồn, ghi nguồn", href: NOTES + "#l-2-3" },
      { label: "Bài 2.1, mục “Kiểm theo rủi ro: chỗ nào trước”: “nghe lạ” là bộ lọc kém, ưu tiên câu mà kết luận dựa vào", href: NOTES + "#l-2-1" }
    ]
  },
  {
    de: 2, n: 4, total: 141, sub: "2.1", subName: "Đúng và đủ",
    answer: "AD",
    ask: "You are building a checklist for evaluating Claude's outputs, and some upstream steps have to be finished before any output is scored. Which two steps must be completed BEFORE an output is scored against the checklist? (Select two.)",
    scene: [
      "Mày đang dựng một bảng kiểm (checklist) để chấm output của Claude.",
      "Đề nhấn chữ “BEFORE” (trước khi): chọn hai bước phải xong trước lúc chấm một output.",
      "Năm phương án trộn bước trước khi chấm với bước sau khi chấm. Ba phương án sai đều là việc chỉ làm được khi đã có điểm."
    ],
    asks: [
      "Hai bước nào phải làm xong trước khi chấm output theo bảng kiểm?",
      "Tức là: muốn chấm thì cần có thước đo. Thước đo đó gồm những gì?",
      "Soi từng phương án: bước này có cần kết quả chấm làm đầu vào không? Cần thì nó đứng sau."
    ],
    facts: [
      "Rubric (bảng tiêu chí chấm) là danh sách tiêu chí viết sẵn, mỗi tiêu chí mô tả rõ từng mức, để hai người chấm cùng một output ra cùng kết quả.",
      "Tiêu chí viết trước khi đọc output. Viết sau khi thấy output thì tiêu chí thường chỉ mô tả lại cái vừa nhận.",
      "Tiêu chí tốt phải đo được (có con số hoặc thang chấm rõ ràng), và mức cần đạt phải có căn cứ: số liệu tham chiếu, kết quả chạy thử, ý kiến chuyên gia, không dựa vào hy vọng."
    ],
    opts: [
      { k: "A", gist: "Define the evaluation criteria that matter for the task in question.",
        why: [
          "Đúng. Không có tiêu chí thì không có gì để chấm. Đây là phần “chấm cái gì” của bảng kiểm (ý 1).",
          "Viết trước khi đọc output, nên tiêu chí không bị kéo theo bản vừa nhận (ý 2)."
        ] },
      { k: "B", gist: "Move the approved output into the downstream production process.",
        why: [
          "Bước sau cùng. Chỉ biết output nào “approved” (đã duyệt) khi đã chấm xong.",
          "Đưa vào sản xuất trước khi chấm là bỏ luôn bước chấm."
        ] },
      { k: "C", gist: "Send outputs judged unacceptable to a senior reviewer for a second look.",
        why: [
          "Cần biết output nào “unacceptable” (không đạt), mà điều đó chỉ có sau khi chấm.",
          "Dễ bị cuốn vì nghe như một lớp kiểm chặt. Nhưng nó là bước xử lý kết quả chấm, đứng sau, không phải bước chuẩn bị."
        ] },
      { k: "D", gist: "Set the threshold that separates acceptable output from unacceptable output.",
        why: [
          "Đúng. Có tiêu chí mà chưa có mức đạt thì chấm xong vẫn không biết qua hay trượt. Đây là phần “bao nhiêu là đủ” của bảng kiểm (ý 1, 3).",
          "A và D bổ sung nhau: A cho biết chấm cái gì, D cho biết điểm nào thì qua. Cả hai phải có trước khi chấm output đầu tiên."
        ] },
      { k: "E", gist: "Record the final score and the reviewer's comments for the audit trail.",
        why: [
          "Điểm cuối cùng chỉ có sau khi chấm, nên ghi lại là bước sau.",
          "Ghi hồ sơ cần thiết cho kiểm toán, nhưng không giúp chấm đúng hơn."
        ] }
    ],
    refs: [
      { label: "Bài 2.1, mục “Chấm trên nhiều tiêu chí, không chỉ đúng sai” và khái niệm rubric: tiêu chí viết sẵn, mỗi mức mô tả rõ", href: NOTES + "#l-2-1" },
      { label: "Bài 2.5, mục “So bản nháp bằng tiêu chí viết trước”: viết tiêu chí trước khi đọc bản nào", href: NOTES + "#l-2-5" },
      { label: "Bài 4.1, mục “Viết tiêu chí thành công trước khi giao”: tiêu chí cụ thể, đo được, mức đạt có căn cứ", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 2, n: 5, total: 141, sub: "3.4", subName: "Context có hạn: chat mới, tóm tắt, lưu lại",
    answer: "DE",
    ask: "As a business analyst, you are deciding which output-formatting and context-window habits to recommend to your teammates. Which two practices make effective use of the context window? (Select two.)",
    scene: [
      "Một chuyên viên phân tích nghiệp vụ chọn vài thói quen về định dạng đầu vào và cách dùng context window để khuyên đồng đội.",
      "Context window là toàn bộ những gì Claude thấy trong một chat tại một lúc, như mặt bàn làm việc.",
      "Chỗ khó: đề hỏi “effective use of the context window” (dùng context window hiệu quả). Có phương án đỡ công cho người dùng, nhưng không làm thứ trên bàn tốt hơn."
    ],
    asks: [
      "Hai cách làm nào là dùng context window hiệu quả?",
      "Tức là: thứ nằm trong context phải liên quan tới yêu cầu, và Claude phải đọc ra phần nào là phần nào.",
      "Soi từng phương án: nó làm context gọn và rõ hơn, hay chỉ nhiều hơn, rối hơn, hoặc chỉ đỡ công cho người gõ?"
    ],
    facts: [
      "Nhiều hơn chưa chắc tốt hơn. Anthropic gọi hiện tượng này là context rot (context bị mục): token trong context càng nhiều, Claude nhớ chính xác thông tin trong đó càng kém.",
      "Dọn context: gỡ file không dùng nữa, tắt connector khi không cần, mở chat mới cho việc không liên quan.",
      "Mỗi tài liệu một khối có tên, bằng thẻ hoặc tiêu đề, ghi rõ nguồn. Claude biết đoạn nào thuộc tài liệu nào, đoạn nào là lời dặn.",
      "Dùng lại tài liệu qua Project giúp đỡ dán lại và đỡ hạn mức, vì nội dung Project được lưu đệm. Đó là chuyện chi phí, không làm phần đang nằm trong context liên quan hơn."
    ],
    opts: [
      { k: "A", gist: "Reuse one context block across many requests so it never has to be rebuilt.",
        why: [
          "Lý do nó nêu là “to avoid rebuilding it each time” (đỡ phải dựng lại mỗi lần): đỡ công cho người dùng, không làm context tốt hơn (ý 4).",
          "Một khối cố định dùng cho nhiều yêu cầu khác nhau sẽ mang theo cả phần không liên quan tới yêu cầu đang làm. Đi ngược đúng điều D làm (ý 1).",
          "Dễ bị cuốn vì dùng lại tài liệu qua Project đúng là thói quen tốt. Nhưng cái lợi đó nằm ở hạn mức và công sức, không ở chất lượng của context."
        ] },
      { k: "B", gist: "Join all source documents end to end with nothing separating them.",
        why: [
          "Trái với “mỗi tài liệu một khối có tên” (ý 3). Claude không biết một đoạn thuộc tài liệu nào.",
          "Hai tài liệu nói khác nhau về cùng một điểm thì Claude dễ trộn lẫn, và không trích được nguồn cho từng ý."
        ] },
      { k: "C", gist: "Paste entire project email threads into the context so the model has the full conversation history.",
        why: [
          "Nhiều hơn chưa chắc tốt hơn (ý 1). Chuỗi email đầy lời chào, đoạn trích lại thư trước, chuyện lạc đề.",
          "Phần việc chính bị lẫn giữa đống chữ thừa. “Complete history” (đủ lịch sử) không phải mục tiêu, đủ phần liên quan mới là mục tiêu (ý 2)."
        ] },
      { k: "D", gist: "Cut out irrelevant material before sending the request, so the context stays focused.",
        why: [
          "Đúng. Đây là dọn context (ý 2). Bớt chữ thừa thì phần liên quan nổi lên, đỡ context rot (ý 1).",
          "Bớt cái không liên quan, không phải cắt tài liệu mà việc cần. Phần cần vẫn ở nguyên."
        ] },
      { k: "E", gist: "Use clear section headers to separate the different parts of the input.",
        why: [
          "Đúng. Mỗi phần một khối có tên (ý 3). Claude tách được tài liệu này với tài liệu kia, tài liệu với lời dặn.",
          "D lo thứ gì nằm trong context, E lo Claude đọc nó thế nào. Hai cái bổ sung nhau."
        ] }
    ],
    dispute: "Examtopics chấm DE. Cộng đồng chia DE 67%, AD 33%. Phe chọn A dựa vào chuyện dùng lại tài liệu qua Project là thói quen tốt. Đúng, nhưng cái lợi đó là đỡ hạn mức và đỡ công dựng lại (bài 7.3). Đề hỏi dùng context window hiệu quả: D và E làm phần nằm trong context gọn và rõ hơn, A thì không.",
    refs: [
      { label: "Bài 3.4, mục “Context chứa gì, và vì sao nhiều hơn chưa chắc tốt hơn”: context rot và cách dọn context", href: NOTES + "#l-3-4" },
      { label: "Bài 1.1, mục “Dán nguồn thật, và tách nó khỏi lời dặn”: mỗi tài liệu một khối có tên, bằng thẻ hoặc tiêu đề", href: NOTES + "#l-1-1" },
      { label: "Bài 7.3, bảng “Cái gì làm hao hạn mức”: dùng lại qua Project là chuyện hạn mức, nội dung Project được lưu đệm", href: NOTES + "#l-7-3" }
    ]
  },
  {
    de: 2, n: 6, total: 141, sub: "6.4", subName: "Đạo đức khi dùng AI",
    answer: "D",
    ask: "A senior manager is preparing an AI-assisted work product for delivery to an outside party and is applying the Diligence competency of the AI Fluency Framework. Which step best reflects Diligence?",
    scene: [
      "Một quản lý cấp cao sắp giao cho bên ngoài một sản phẩm làm có AI hỗ trợ.",
      "Đề gọi thẳng tên khung: năng lực Diligence (cẩn trọng) của khung AI Fluency 4D.",
      "Ba phương án sai tự ghi luôn là chúng trái với Diligence, bằng các cụm “even though” (dù rằng) và “contrary to” (trái với). Đề kiểm xem mày có nắm định nghĩa không."
    ],
    asks: [
      "Bước nào thể hiện đúng nhất tinh thần Diligence?",
      "Tức là: trước khi giao, người dùng AI phải làm gì để chịu trách nhiệm cho output.",
      "Soi từng phương án: trách nhiệm còn ở người không, và có bước kiểm trước khi giao không?"
    ],
    facts: [
      "Diligence là chữ D thứ tư của khung AI Fluency 4D: “Taking responsibility for what we do with AI and how we do it” (chịu trách nhiệm về những gì ta làm với AI và cách ta làm).",
      "Deployment Diligence: chịu trách nhiệm kiểm và bảo đảm cho output mình dùng hoặc chia sẻ. Kiểm trước khi gửi, nhất là những chi tiết gây hại nếu sai: số liệu, trích dẫn, tên người, điều khoản.",
      "Accountability (trách nhiệm giải trình): người dùng output là người chịu trách nhiệm. “Claude viết” không chuyển trách nhiệm sang công cụ.",
      "Giọng tự tin, văn trơn tru không phải bằng chứng là đúng. Chi tiết bịa thường nghe rất chuyên nghiệp."
    ],
    opts: [
      { k: "A", gist: "Deliver without independent checking, on the grounds that AI help moves accountability away from the person, although Diligence keeps the person fully accountable.",
        why: [
          "Sai ở giả định: dùng AI không chuyển trách nhiệm đi đâu cả (ý 3). Chính phương án cũng tự thừa nhận điều đó.",
          "Giao mà không kiểm là bỏ đúng phần Deployment Diligence đòi (ý 2)."
        ] },
      { k: "B", gist: "Hand accountability for the AI-assisted product to Claude itself instead of keeping it as a human duty, contrary to the principle that people stay accountable.",
        why: [
          "Claude không chịu trách nhiệm thay ai được. Người gửi chịu (ý 3).",
          "Không ai đứng tên thì cũng không ai có lý do kiểm trước khi giao."
        ] },
      { k: "C", gist: "Skip checking any part on the assumption that fluent output is accurate, although Diligence requires checking and correcting before the output is used.",
        why: [
          "Sai ở giả định: văn trơn tru không phải bằng chứng (ý 4).",
          "Bỏ kiểm toàn bộ là trái với “kiểm trước khi gửi” của Deployment Diligence (ý 2)."
        ] },
      { k: "D", gist: "Work out which parts of the product must be independently verified or corrected before delivery, and own those checks as a professional obligation.",
        why: [
          "Đúng. Có đủ hai phần của Diligence: kiểm trước khi giao (ý 2) và người tự nhận trách nhiệm (ý 1, 3).",
          "“Identify the elements” (xác định phần nào phải kiểm) cũng là cách làm thật: dồn công kiểm vào chi tiết gây hại nếu sai (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 6.4, mục “Diligence gồm ba phần” và “Bạn gửi thì bạn chịu”: Deployment Diligence là kiểm và bảo đảm output trước khi gửi", href: NOTES + "#l-6-4" },
      { label: "Bài Nền tảng D2, mục “Khung 4D gọi việc này là Discernment”: định nghĩa Deployment Diligence", href: NOTES + "#l-2-0" }
    ]
  },
  {
    de: 2, n: 7, total: 141, sub: "1.3", subName: "Lặp prompt: chẩn đoán, đổi một chỗ, thử lại",
    answer: "BC",
    ask: "You are reviewing claims about prompt iteration that colleagues made during a recent training session. Which two claims are accurate? (Select two.)",
    scene: [
      "Sau một buổi đào tạo, đồng nghiệp đưa ra mấy nhận định về lặp prompt (prompt iteration). Mày phải chọn hai câu đúng.",
      "Ba câu sai đều coi số lần thử là thứ làm output tốt lên. Hai câu đúng nói về cách thử: đổi gì, và đo bằng gì."
    ],
    asks: [
      "Hai nhận định nào về lặp prompt là đúng?",
      "Tức là: một vòng lặp có ích cần những gì, và làm sao biết nó đã có ích.",
      "Soi từng phương án: nó có đổi đúng chỗ gây lỗi không, có thước đo không, hay chỉ thử thêm cho nhiều?"
    ],
    facts: [
      "Lặp prompt (iterate) là vòng chẩn đoán → đổi một chỗ → thử lại → giữ cái có tác dụng, cho tới khi đạt tiêu chí. Chẩn đoán là gọi tên output yếu ở đâu, rồi tìm phần nào của prompt gây ra.",
      "Tiêu chí thành công đặt trước khi sửa. Không có tiêu chí thì chỉ biết output “khác đi”, không biết nó “tốt hơn” chưa.",
      "Gõ lại y nguyên hay “viết hay hơn đi” không sửa gì: điều kiện gây ra output yếu vẫn còn, bạn chỉ nhận một bản khác.",
      "Dừng khi output đạt tiêu chí ổn định, hoặc vài vòng gần nhất không cải thiện thêm. Giữ bản prompt gọn nhất mà vẫn đạt."
    ],
    opts: [
      { k: "A", gist: "Resubmitting the same prompt over and over is the most reliable way to get a better output.",
        why: [
          "Prompt y nguyên thì điều kiện gây lỗi y nguyên (ý 3). Mỗi lần ra một bản khác, không chắc bản nào tốt hơn.",
          "Chọn bản ưng nhất trong mấy lần gõ lại là chọn may. Lần sau dùng lại prompt đó vẫn ra bản yếu."
        ] },
      { k: "B", gist: "Comparing outputs against the original criteria is how you confirm whether an iteration helped.",
        why: [
          "Đúng. Tiêu chí đặt trước là thước đo để biết vòng vừa rồi tốt lên hay chỉ khác đi (ý 2).",
          "So với tiêu chí, không phải hỏi Claude “bản này tốt hơn chưa?”. Hỏi thế không phải phép thử."
        ] },
      { k: "C", gist: "Iteration pays off most when each change targets one specific weakness that has been diagnosed.",
        why: [
          "Đúng. Đây là bước chẩn đoán: gọi tên chỗ yếu, tìm phần của prompt gây ra, rồi đổi đúng phần đó (ý 1).",
          "Mỗi vòng đổi một chỗ thì biết thay đổi nào có tác dụng. B và C bổ sung nhau: C nói đổi gì, B nói đổi xong có ích không."
        ] },
      { k: "D", gist: "Iteration should only stop once every possible alternative wording has been tried.",
        why: [
          "Không có điểm dừng thật, vì cách diễn đạt là vô hạn. Dừng là khi đạt tiêu chí ổn định, hoặc vài vòng không cải thiện (ý 4).",
          "Thử thêm sau lúc đã đạt chỉ tốn context, hạn mức và thời gian."
        ] },
      { k: "E", gist: "More iterations always produce a better output, no matter what was changed.",
        why: [
          "Sai ở cụm “no matter what was changed” (bất kể đổi cái gì). Đổi không trúng chỗ gây lỗi thì không tốt lên, có khi tệ đi (ý 1).",
          "Dễ bị cuốn vì làm nhiều nghe như cẩn thận. Nhưng vòng lặp có ích nhờ chẩn đoán đúng và có thước đo (ý 2), không nhờ số vòng."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Đặt tiêu chí trước khi sửa”, “Mỗi vòng đổi một chỗ” và bảng “Dừng, bắt đầu lại, hay lưu”", href: NOTES + "#l-1-3" },
      { label: "Bài 7.1, mục “Vì sao chỉ đổi một thứ, và chạy lại cùng input”: đổi một thứ mới biết thứ nào có tác dụng", href: NOTES + "#l-7-1" }
    ]
  },
  {
    de: 2, n: 8, total: 141, sub: "6.4", subName: "Đạo đức khi dùng AI",
    answer: "A",
    ask: "You are reviewing a set of customer-segment descriptions that Claude drafted for an internal marketing brief. One description relies on a generalization about a demographic group's buying behavior that does not hold for individual customers in that segment. What is the most appropriate response?",
    scene: [
      "Claude soạn một loạt mô tả phân khúc khách hàng cho tài liệu định hướng marketing dùng nội bộ (marketing brief).",
      "Một mô tả dựa vào khái quát về hành vi mua của cả một nhóm nhân khẩu (theo tuổi, giới, vùng…). Khái quát đó không đúng với từng khách trong phân khúc.",
      "Bốn phương án đi bốn hướng: sửa rồi kiểm, xóa cả phần phân khúc, giữ vì chỉ dùng nội bộ, giữ nguyên và thêm câu lưu ý."
    ],
    asks: [
      "Cách xử lý phù hợp nhất là gì?",
      "Tức là: sửa đúng chỗ lệch, mà vẫn giữ được phần có ích của bản phân khúc.",
      "Soi từng phương án: khái quát sai có còn nằm trong tài liệu không? Việc phân khúc có bị bỏ một cách không cần thiết không?"
    ],
    facts: [
      "Bias (thiên lệch) là độ lệch theo một hướng, như coi một nhóm là mặc định hay dán khuôn mẫu lên cả nhóm. Model học từ dữ liệu của con người nên có thể lặp lại khuôn mẫu, ví dụ chân dung khách hàng theo định kiến.",
      "Kiểm thật là so với nguồn nằm ngoài Claude: văn bản gốc, dữ liệu gốc, chuyên gia. Với mô tả khách hàng, nguồn đó là dữ liệu khách hàng thật.",
      "Sửa hình thức không sửa được nội dung. Câu miễn trừ kiểu “có thể không đúng” không làm câu sai bớt sai, cũng không chuyển trách nhiệm đi đâu.",
      "Đáp án né vấn đề là sai: bỏ hẳn việc khi đã có cách làm an toàn là không cần thiết."
    ],
    opts: [
      { k: "A", gist: "Rewrite the description around observed behaviors instead of generalizations about people, then check the rewrite against actual customer data.",
        why: [
          "Đúng. Sửa đúng gốc: bỏ khuôn mẫu gán cho một nhóm người, mô tả bằng hành vi quan sát được (ý 1).",
          "Kiểm bản sửa với dữ liệu khách hàng thật là so với nguồn ngoài Claude (ý 2). Phân khúc vẫn còn, tài liệu vẫn dùng được."
        ] },
      { k: "B", gist: "Remove the whole customer-segment description from the brief, since any segmentation that uses demographic traits is likely to cause the same problem.",
        why: [
          "Quá tay. Lỗi nằm ở một khái quát, không nằm ở việc phân khúc. Bỏ hết là bỏ việc khi đã có cách sửa (ý 4).",
          "“Any segmentation that uses demographic traits” (mọi phân khúc có dùng đặc điểm nhân khẩu) lại là một khái quát quá tay, đúng kiểu lỗi đang cần sửa."
        ] },
      { k: "C", gist: "Leave the description as written, because internal use carries less risk than publishing demographic generalizations externally.",
        why: [
          "Dùng nội bộ không làm khuôn mẫu đúng hơn. Đội marketing vẫn dựa vào tài liệu này để chọn nhắm tới ai, nói gì với ai.",
          "Khách trong phân khúc vẫn chịu hậu quả của quyết định dựa trên một khái quát sai (ý 1)."
        ] },
      { k: "D", gist: "Add a disclaimer noting that the generalization may not apply to everyone in the segment, and leave the description itself unchanged.",
        why: [
          "Câu lưu ý không sửa nội dung (ý 3). Khái quát sai vẫn nằm nguyên trong tài liệu, người đọc vẫn dùng nó để quyết.",
          "Dễ bị cuốn vì nghe minh bạch, có thừa nhận giới hạn. Nhưng đề kể khái quát này không đúng với từng khách, tức là nội dung sai, và nội dung sai thì phải sửa."
        ] }
    ],
    dispute: "Examtopics chấm A. Cộng đồng chia A 70%, D 30%. D thua vì câu lưu ý chỉ báo trước là có thể sai, còn khái quát sai vẫn ở lại trong tài liệu và vẫn dẫn quyết định marketing. A sửa chính chỗ sai rồi kiểm với dữ liệu thật.",
    refs: [
      { label: "Bài 6.4, mục “Bias và công bằng” và “Bạn gửi thì bạn chịu”: chân dung khách hàng theo định kiến, câu miễn trừ không chuyển được trách nhiệm", href: NOTES + "#l-6-4" },
      { label: "Bài 2.2, mục “Bias: thường là thiếu hoặc lệch, không phải câu sai”: cách soi bias và yêu cầu viết lại cân bằng", href: NOTES + "#l-2-2" },
      { label: "Bài mở đầu “Khẩu vị chọn đáp án”: luật 3 (sửa hình thức không sửa nội dung) và luật 5 (né vấn đề là sai)", href: NOTES + "#l-0-3" }
    ]
  },
  {
    de: 2, n: 9, total: 141, sub: "4.2", subName: "Research, lập kế hoạch, tối ưu quy trình",
    answer: "B",
    ask: "You are running an optimization pass on a workflow that recurs regularly. What is the right order? <br>(1) Apply a targeted fix to the bottleneck step.<br>(2) Roll the improved workflow out to the wider team and document the change.<br>(3) Find the bottleneck step from the measured time per step and the queue length.<br>(4) Map the current steps, their owners and the decision points.<br>(5) Pilot the change with a small group and measure its effect against the earlier baseline.",
    scene: [
      "Mày tối ưu một quy trình chạy định kỳ.",
      "Năm bước: vẽ lại quy trình hiện tại, tìm chỗ thắt cổ chai (bottleneck) bằng số đo, sửa đúng chỗ đó, chạy thử với nhóm nhỏ, rồi mở rộng và ghi lại.",
      "Bốn phương án đều kết thúc bằng 5 rồi 2. Chỗ khác nhau là thứ tự của 4, 3, 1 ở đầu."
    ],
    asks: [
      "Thứ tự đúng của các bước tối ưu là gì?",
      "Tức là: muốn sửa đúng chỗ thì phải biết chỗ nào chậm, muốn biết chỗ nào chậm thì phải có sơ đồ các bước và số đo của từng bước.",
      "Soi từng phương án: lúc bước (1) chạy, đã biết chỗ thắt cổ chai ở đâu chưa? Lúc bước (3) chạy, đã có sơ đồ để đo chưa?"
    ],
    facts: [
      "Sơ đồ quy trình (process map) là danh sách các bước: ai làm, mất bao lâu, chờ ở đâu, chuyển cho ai. Muốn chỉ ra chỗ thắt cổ chai thì phải có sơ đồ này trước.",
      "Đo trước khi đổi: đừng đoán bước nào đang tốn, xem số liệu rồi mới đổi. Sau khi đổi, đo lại thời gian và chất lượng để so với mốc trước.",
      "Chạy thử trên việc thật, đạt chuẩn rồi mới mở rộng. Nhân rộng cho cả nhóm thì ghi lại các bước đã chạy tốt, rồi mới phổ biến."
    ],
    opts: [
      { k: "A", gist: "4, 1, 3, 5, 2",
        why: [
          "Làm (1) trước (3): sửa chỗ thắt cổ chai khi chưa đo xem nó nằm ở đâu (ý 2). Sửa theo đoán thì dễ sửa nhầm bước.",
          "Dễ bị cuốn vì nó vẫn mở đầu bằng vẽ sơ đồ, nghe bài bản. Nhưng sơ đồ chưa nói bước nào chậm, phải có số đo (ý 1, 2)."
        ] },
      { k: "B", gist: "4, 3, 1, 5, 2",
        why: [
          "Đúng. Vẽ sơ đồ hiện tại (4) để có các bước mà đo, đo thời gian từng bước và hàng chờ để tìm chỗ thắt cổ chai (3), rồi mới sửa đúng chỗ đó (1) (ý 1, 2).",
          "Chạy thử với nhóm nhỏ, so với mốc đo trước đó (5), đạt rồi mới mở rộng và ghi lại (2) (ý 2, 3)."
        ] },
      { k: "C", gist: "3, 4, 1, 5, 2",
        why: [
          "Làm (3) trước (4): đo thời gian từng bước khi chưa liệt kê các bước, người phụ trách và điểm quyết định (ý 1).",
          "Không có sơ đồ thì không biết đo bước nào, hàng chờ nằm giữa hai bước nào. Số đo dễ sót bước, và chỗ thắt cổ chai tìm ra có thể sai."
        ] },
      { k: "D", gist: "1, 4, 3, 5, 2",
        why: [
          "Sửa (1) ngay từ đầu, khi chưa có sơ đồ cũng chưa có số đo. Đây là đoán rồi sửa (ý 2).",
          "Sơ đồ và số đo đến sau lại đo quy trình đã bị sửa, nên mất luôn mốc “trước” để bước (5) so sánh."
        ] }
    ],
    refs: [
      { label: "Bài 4.2, mục “Tối ưu quy trình: lời chê của Claude là giả thuyết” và khái niệm sơ đồ quy trình: ai làm, mất bao lâu, chờ ở đâu", href: NOTES + "#l-4-2" },
      { label: "Bài 7.3, mục “Đo trước khi đổi, đo sau khi đổi”: xem số liệu rồi mới đổi, thử trên ca thật rồi mới phổ biến", href: NOTES + "#l-7-3" },
      { label: "Bài 4.4, mục “Chạy thử một việc thật trước khi mở rộng”: đạt chuẩn rồi mới mở rộng, mở theo pha", href: NOTES + "#l-4-4" }
    ]
  },
  {
    de: 2, n: 10, total: 141, sub: "3.3", subName: "Chọn model theo chi phí, tốc độ, chất lượng",
    answer: "B",
    ask: "A customer-success lead runs an interactive workflow in which every turn has to come back fast, and the reasoning needed on each turn is light. Which model choice fits these requirements best?",
    scene: [
      "Một trưởng nhóm chăm sóc khách hàng chạy một quy trình hỏi đáp qua lại, lượt nối lượt.",
      "Đề cho sẵn hai điều kiện: “each turn must respond quickly” (lượt nào cũng phải trả lời nhanh) và “per-turn reasoning is light” (mỗi lượt chỉ cần suy luận nhẹ).",
      "Chỗ dễ trượt: nghĩ model mạnh nhất lúc nào cũng chắc ăn hơn. Ở đây sức mạnh dư ra không đổi được gì, còn độ chậm thì người dùng thấy ở mọi lượt."
    ],
    asks: [
      "Chọn model nào khớp với yêu cầu nhất?",
      "Tức là: đọc hai điều kiện đề cho rồi chọn tầng model khớp cả hai, không chọn theo thói quen hay theo tầng mạnh nhất.",
      "Soi từng phương án: lý do nó đưa ra có đúng về model không, và nó có khớp cả tốc độ lẫn mức suy luận đề nêu không."
    ],
    facts: [
      "Độ trễ (latency) là thời gian chờ tới khi có câu trả lời. Các model khác nhau ở độ trễ: Haiku nhanh nhất, Sonnet nhanh, Opus chậm hơn hai tầng kia.",
      "Haiku là tầng nhỏ nhất: nhanh nhất, nhẹ hạn mức nhất, hợp việc đơn giản, số lượng lớn, cần ngay. Docs API tả Haiku là model cho “high-volume, latency-sensitive tasks” (việc số lượng lớn, cần phản hồi nhanh).",
      "Opus mạnh nhất trong ba nhưng chậm và tốn hơn. Nó đáng dùng khi việc cần suy luận sâu mà tầng nhẹ hơn làm không đạt.",
      "Chọn model là đọc yêu cầu của việc (cần nhanh tới đâu, cần rẻ tới đâu, cần suy luận sâu tới đâu) rồi chọn tầng khớp."
    ],
    opts: [
      { k: "A", gist: "Pick any model, since response time is the same whichever model you use.",
        why: [
          "Sai ở giả định: độ trễ khác nhau giữa các model, Haiku nhanh nhất, Opus chậm nhất trong ba (ý 1).",
          "Chọn bừa có thể rơi vào Opus, và lượt nào cũng chậm hơn mức đề đòi."
        ] },
      { k: "B", gist: "Pick Haiku, because it keeps response time low and handles a light reasoning load efficiently at volume.",
        why: [
          "Đúng. Haiku là tầng nhanh nhất và nhẹ hạn mức nhất, đúng loại việc docs tả cho nó: nhiều lượt, cần phản hồi nhanh (ý 1, 2).",
          "Mỗi lượt chỉ cần suy luận nhẹ nên bỏ sức mạnh của Opus cũng không mất gì. Khớp cả hai điều kiện đề cho (ý 4)."
        ] },
      { k: "C", gist: "Pick Opus to get the deepest reasoning, accepting the slower responses.",
        why: [
          "Sai ở chỗ đổi lấy thứ đề không cần: suy luận sâu. Đề nói rõ mỗi lượt chỉ cần suy luận nhẹ (ý 3).",
          "Cái giá là chậm ở mọi lượt, đúng điều đề muốn tránh, lại tốn hạn mức hơn.",
          "Dễ bị cuốn vì “chọn model mạnh nhất cho chắc” nghe an toàn. Nhưng đề đòi nhanh, và câu trả lời nhẹ không tốt lên bao nhiêu nhờ model mạnh hơn."
        ] },
      { k: "D", gist: "Pick a model according to where its name falls alphabetically.",
        why: [
          "Sai: thứ tự chữ cái của tên không liên quan gì tới tốc độ, chi phí hay chất lượng (ý 4).",
          "Cách chọn này không dựa vào yêu cầu nào của việc."
        ] }
    ],
    refs: [
      { label: "Bài 3.3, bảng chọn model theo việc: nhiều, ngắn, đơn giản, cần nhanh thì chọn tầng nhanh, nhẹ (Haiku)", href: NOTES + "#l-3-3" },
      { label: "Bài 3.2, khái niệm “Độ trễ (latency)” và ba tầng Haiku, Sonnet, Opus", href: NOTES + "#l-3-2" }
    ]
  },
  {
    de: 2, n: 11, total: 141, sub: "4.1", subName: "Phân tích use case",
    answer: "AB",
    ask: "During a workflow redesign, a process analyst is using the Delegation competency of the AI Fluency Framework to decide which steps Claude should take on. Which two criteria bear most directly on those Delegation decisions? (Select two.)",
    scene: [
      "Một chuyên viên quy trình đang thiết kế lại một quy trình làm việc. Anh dùng năng lực Delegation (giao việc) của khung AI Fluency để quyết bước nào giao cho Claude.",
      "Năm phương án là năm thứ có thể đem ra cân: hậu quả khi sai, bước có cần con người không, sơ đồ rối hay gọn, chức vụ người đang làm, quy trình đã chạy bao lâu.",
      "Chỗ khó: phương án nào nghe cũng dính tới rủi ro. Chỉ hai cái nói về chính bước việc."
    ],
    asks: [
      "Hai tiêu chí nào ảnh hưởng trực tiếp nhất tới quyết định giao việc?",
      "Tức là: với từng bước, cái gì cho biết bước đó giao Claude được hay phải giữ cho người.",
      "Soi từng phương án: nó nói về bước việc (sai thì sao, cần gì ở người làm), hay về thứ nằm ngoài bước việc (hình vẽ, chức danh, tuổi quy trình)."
    ],
    facts: [
      "Delegation (giao việc) là “setting goals and deciding whether, when and how to engage with AI” (đặt mục tiêu và quyết có dùng AI không, lúc nào, dùng thế nào). Ba kỹ năng con: Problem Awareness (hiểu vấn đề), Platform Awareness (biết AI làm được gì, hụt ở đâu), Task Delegation (chia việc giữa người và AI).",
      "Quyết theo từng bước. Bước hợp Claude: mô tả rõ được, đầu ra kiểm được, sai thì dễ phát hiện. Bước cần người: cân nhắc giá trị, có hậu quả cho người khác, phải có người đứng tên.",
      "Phép thử “kiểm được, sửa được” hỏi: nếu Claude sai, ai thấy, và sửa có kịp không? Việc khó gỡ, sai thì thiệt nặng thì người phải quyết hoặc duyệt trước.",
      "Những việc không giao: phán đoán cuối cùng, phản hồi nhạy cảm với con người, đánh giá có hệ quả lớn."
    ],
    opts: [
      { k: "A", gist: "How reversible the step is and how costly a mistake would be, which together show whether it is safe to hand to Claude or should stay a human decision.",
        why: [
          "Đúng. Đây là phép thử “kiểm được, sửa được” áp cho từng bước: sai thì gỡ được không, thiệt bao nhiêu (ý 3).",
          "Bước dễ gỡ, sai ít thiệt thì giao rồi kiểm. Bước không rút lại được, sai là thiệt nặng thì người giữ quyết định (ý 2)."
        ] },
      { k: "B", gist: "Whether the step calls for human creativity, empathy or judgment, which shows whether it suits Claude or needs capabilities only a person brings.",
        why: [
          "Đúng. Đây là Platform Awareness đi cùng Task Delegation: biết Claude hụt ở đâu để chia đúng phần cho người (ý 1).",
          "Bước cần cân nhắc giá trị, cần thấu cảm với người thật, hay cần một phán đoán có người đứng tên thì người giữ (ý 2, ý 4)."
        ] },
      { k: "C", gist: "How visually complex the workflow diagram is, since steps with more connections and dependencies are more likely to need human oversight.",
        why: [
          "Sai ở chỗ đo hình vẽ, không đo bước việc. Một bước nhiều mũi tên có thể chỉ là đổi định dạng, việc rất hợp giao Claude (ý 2).",
          "Ngược lại, một bước nằm lẻ một góc sơ đồ có thể là ký duyệt hợp đồng. Số đường nối không nói gì về hậu quả khi sai."
        ] },
      { k: "D", gist: "The seniority of whoever does the step now, since senior roles usually carry higher-stakes work that should stay with people.",
        why: [
          "Sai ở chỗ lấy chức danh thay cho bản chất việc. Người cấp cao vẫn làm nhiều việc mô tả rõ, kiểm được, như tóm tắt hay soạn nháp (ý 2).",
          "Dễ bị cuốn vì nó có dính tới rủi ro thật: việc của người cấp cao thường hệ trọng hơn. Nhưng đó là đoán gián tiếp. Hỏi thẳng bước đó sai thì sao (A) và có cần phán đoán của người không (B) mới là tiêu chí."
        ] },
      { k: "E", gist: "How long the workflow has run in its current form, on the view that long-established processes are proven enough to delegate.",
        why: [
          "Sai ở giả định: quy trình chạy lâu nghĩa là người làm đã quen nó, không nghĩa là Claude làm được bước đó (ý 1).",
          "Tuổi quy trình không đổi hậu quả khi sai, cũng không đổi chuyện bước đó có cần người hay không (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài nền tảng Domain 4, mục “AI Fluency và khung 4D”: định nghĩa Delegation và ba kỹ năng con", href: NOTES + "#l-4-0" },
      { label: "Bài 4.1, bảng “Việc nào hợp Claude, việc nào chưa, việc nào cần người”", href: NOTES + "#l-4-1" },
      { label: "Bài 6.1, mục “Phép thử kiểm được, sửa được”: sai thì ai thấy, sửa có kịp không", href: NOTES + "#l-6-1" }
    ]
  },
  {
    de: 2, n: 12, total: 141, sub: "6.3", subName: "Làm việc trong chính sách AI của công ty",
    answer: "AD",
    ask: "A Claude user is deciding whether to turn on a Skill supplied by a third party they do not know. Which two checks best support a sound decision about trusting it? (Select two.)",
    scene: [
      "Một người dùng Claude đang cân nhắc bật một Skill do một bên thứ ba lạ cung cấp.",
      "Skill không chỉ là lời dặn: nó có thể chứa script, kéo thêm gói phần mềm, và bảo Claude kết nối ra ngoài.",
      "Chỗ khó: ba phương án sai đều bỏ một bước kiểm, thay bằng một lý do nghe yên tâm: có trong danh sách công khai, được khen nhiều, hay “Skill không vượt được phạm vi việc”."
    ],
    asks: [
      "Hai bước kiểm nào giúp quyết định tin hay không tin Skill này cho đúng?",
      "Tức là: trước khi bật, kiểm Skill từ đâu ra (theo chính sách của tổ chức), và kiểm Skill sẽ làm gì, đụng tới gì."
    ],
    facts: [
      "Skill là thư mục chứa hướng dẫn, script và tài nguyên. Nó chạy nhờ code execution, và có thể cài, hoặc bảo Claude cài, gói phần mềm của bên thứ ba.",
      "Help Center dặn chỉ cài skill từ nguồn tin cậy. Skill từ nguồn kém tin cậy hơn, kể cả đồng nghiệp gửi, thì xem kỹ trước khi bật: file kèm theo, script, phụ thuộc, và chỉ dẫn bảo Claude kết nối tới nguồn mạng ngoài không tin cậy.",
      "Help Center nêu hai rủi ro lớn nhất: prompt injection (Claude bị dắt làm việc ngoài ý muốn) và data exfiltration (dữ liệu bị rút ra ngoài).",
      "Trên gói Team và Enterprise, owner cấp sẵn (provision) skill cho cả tổ chức, và có thể đặt chế độ “Requires review” để mỗi skill phải được owner duyệt trước khi chia sẻ. Công cụ chưa được duyệt thì hỏi người phụ trách trước khi dùng."
    ],
    opts: [
      { k: "A", gist: "Check where the Skill comes from against the organisation's list of approved Skills before enabling it in claude.ai or in any of the team's Projects.",
        why: [
          "Đúng. Đây là kiểm nguồn gốc theo chính sách tổ chức: Skill đã được duyệt, hay chưa ai xem xét (ý 4).",
          "Skill lạ không có trong danh sách được duyệt là công cụ chưa được duyệt. Hỏi người phụ trách trước, không tự bật."
        ] },
      { k: "B", gist: "Treat the Skill's presence in a public listing as enough, without checking its source, the access it requests, or the organisation's approved list.",
        why: [
          "Sai: có mặt trong một danh sách công khai không nói ai làm ra Skill, cũng không nói Skill làm gì (ý 2).",
          "Bỏ cả hai bước kiểm đề cần: nguồn gốc theo chính sách tổ chức, và quyền Skill đòi."
        ] },
      { k: "C", gist: "Skip reviewing permissions on the assumption that the Skill cannot go beyond the workflow, even though Skills can ask for access the task does not need.",
        why: [
          "Sai ở giả định: Skill có script, cài được gói, kết nối được ra ngoài, nên nó làm được nhiều hơn việc đang làm (ý 1).",
          "Chính đề đã nói Skill có thể đòi quyền việc không cần. Bỏ bước xem là để ngỏ đúng chỗ rò dữ liệu (ý 3)."
        ] },
      { k: "D", gist: "Look at what access and capabilities the Skill asks for, and confirm that this access fits the task it is meant to do.",
        why: [
          "Đúng. Đây là bước xem kỹ trước khi bật mà Help Center dặn: Skill sẽ chạy script gì, cài gì, kết nối tới đâu (ý 1, ý 2).",
          "Đòi nhiều hơn việc cần, ví dụ Skill định dạng báo cáo mà lại gọi ra mạng ngoài, là dấu hiệu của đúng hai rủi ro prompt injection và rò dữ liệu (ý 3)."
        ] },
      { k: "E", gist: "Turn the Skill on straight away because outside reviews are strong, although its source has not been checked against the approved list and its access is unverified.",
        why: [
          "Sai: lời khen bên ngoài không thay được việc tổ chức duyệt nguồn, cũng không cho biết Skill làm gì với dữ liệu của mày (ý 2, ý 4).",
          "Dễ bị cuốn vì đánh giá tốt nghe như đã có người kiểm. Nhưng người khen không biết chính sách công ty mày, và không ai trong số họ đọc script thay mày."
        ] }
    ],
    dispute: "Examtopics chấm AD, khớp. Lưu ý chữ dùng trong đề: Help Center không có tính năng tên “approved-Skill list”, cũng không có màn hình liệt kê quyền của một Skill. Gần nhất với A là skill do owner cấp cho tổ chức và chế độ “Requires review”. Gần nhất với D là tự đọc script, phụ thuộc và chỉ dẫn kết nối ra ngoài của Skill.",
    refs: [
      { label: "Bài 6.3, bảng “Bị chặn, hay chính sách không nhắc tới”: công cụ chưa được duyệt thì hỏi người phụ trách trước khi dùng", href: NOTES + "#l-6-3" },
      { label: "Bài nền tảng Domain 3, định nghĩa Skills: thư mục hướng dẫn, script, tài nguyên, cần code execution", href: NOTES + "#l-3-0" },
      { label: "Help Center “Use skills in Claude”: chỉ cài skill từ nguồn tin cậy, xem kỹ script và kết nối ra ngoài trước khi bật", href: "https://support.claude.com/en/articles/12512180-use-skills-in-claude" }
    ]
  },
  {
    de: 2, n: 13, total: 141, sub: "3.4", subName: "Context có hạn: chat mới, tóm tắt, lưu lại",
    answer: "C",
    ask: "A research associate is setting up inputs for a long task that draws on two lengthy regulatory documents, of which only certain sections are relevant. Which approach makes the best use of the context window?",
    scene: [
      "Một trợ lý nghiên cứu chuẩn bị đầu vào cho một việc dài. Việc dựa trên hai văn bản quy định rất dài.",
      "Chỉ vài mục trong mỗi văn bản là liên quan.",
      "Chỗ khó: đề hỏi cách giữ chỗ trong context window, không hỏi cách nhồi được nhiều nhất."
    ],
    asks: [
      "Cách nào giữ được nhiều chỗ trong context window nhất?",
      "Tức là: đưa cho Claude đúng phần việc cần. Không thiếu phần cần, không thừa phần không liên quan."
    ],
    facts: [
      "Context window là toàn bộ phần Claude đọc được khi trả lời, đo bằng token (mẩu chữ nhỏ model đọc và viết). Mọi thứ đưa vào đều chiếm chỗ: tin nhắn, file, instructions.",
      "Nhiều hơn chưa chắc tốt hơn. Anthropic gọi hiện tượng này là “context rot” (context bị mục): token trong context càng nhiều, khả năng nhớ chính xác thông tin trong đó càng giảm.",
      "Tài liệu quá dài thì đưa theo từng phần, hoặc chỉ đưa những đoạn việc đó cần.",
      "Phần không được đưa thì Claude tự đoán, và đoán thì dễ bịa (hallucination: thông tin bịa mà trông như thật)."
    ],
    opts: [
      { k: "A", gist: "Leave both documents out and let Claude make up whatever context is missing.",
        why: [
          "Sai: giữ chỗ bằng cách bỏ luôn nguồn. Việc dựa vào hai văn bản, không có chúng thì Claude điền bằng phỏng đoán (ý 4).",
          "Với văn bản quy định, một điều khoản bịa mà đọc trôi chảy là thứ nguy hiểm nhất."
        ] },
      { k: "B", gist: "Break each document into one-character pieces and feed them in one at a time.",
        why: [
          "Sai: cắt thành từng ký tự thì không mảnh nào còn nghĩa. Claude không hiểu được điều khoản nào.",
          "Tổng số chữ đưa vào vẫn y như dán cả văn bản, nên cũng không giữ được chỗ nào (ý 1)."
        ] },
      { k: "C", gist: "Pull out only the relevant sections of each document and include those, leaving out unrelated chapters.",
        why: [
          "Đúng: chỉ đưa đoạn việc cần (ý 3). Context còn chỗ cho phần việc dài phía sau (ý 1).",
          "Ít chữ thừa thì các mục cần không bị lẫn, Claude nhớ đúng hơn (ý 2)."
        ] },
      { k: "D", gist: "Paste the complete text of both documents untrimmed so Claude has as much material as possible.",
        why: [
          "Sai: lấp context bằng các chương không liên quan, việc dài phía sau còn ít chỗ (ý 1).",
          "Dễ bị cuốn vì nghe chắc ăn: đưa hết thì không sót. Nhưng nhiều hơn chưa chắc tốt hơn, các mục cần bị lẫn giữa đống chữ thừa (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, mục “Context chứa gì, và vì sao nhiều hơn chưa chắc tốt hơn”: context rot, dọn context", href: NOTES + "#l-3-4" },
      { label: "Bài nền tảng Domain 3: token và context window", href: NOTES + "#l-3-0" }
    ]
  },
  {
    de: 2, n: 14, total: 141, sub: "1.4", subName: "Đổi cách prompt theo loại việc",
    answer: "A",
    ask: "As project lead, you notice a teammate uses one identical prompt template for every task, whatever kind of task it is. What feedback is most appropriate?",
    scene: [
      "Một thành viên trong nhóm dùng đúng một mẫu prompt cho mọi việc, việc loại nào cũng vậy.",
      "Mày là trưởng dự án, cần góp ý.",
      "Chỗ khó: thói quen này có cái nghe rất hay: nhất quán, đỡ tốn thời gian. Ba phương án sai đều dựa vào cái nghe hay đó."
    ],
    asks: [
      "Góp ý nào đúng nhất?",
      "Tức là: loại việc có làm đổi cách viết prompt không, và một mẫu dùng chung có cho output tốt như nhau ở mọi loại việc không."
    ],
    facts: [
      "Khung chung của một prompt (việc, bối cảnh, ràng buộc, nguồn, ví dụ, định dạng) dùng cho mọi loại việc. Khác nhau ở chỗ phần nào cần nhấn mạnh.",
      "Mỗi loại việc hỏng một kiểu. Phân tích: kết luận mà dữ liệu không đỡ được. research (tìm hiểu): rộng, chung chung, dựa một nguồn. Soạn thảo: giọng chung chung, chi tiết bịa. Brainstorm: vài ý quen thuộc, giống nhau.",
      "Vì vậy mỗi loại đòi một thứ riêng. Phân tích cần quyền nói “không đủ dữ liệu”. research cần phạm vi và kiểm chéo nguồn. Soạn thảo cần mẫu giọng và dữ kiện thật. Brainstorm cần nhiều ý khác nhau, chấm ở bước sau."
    ],
    opts: [
      { k: "A", gist: "Prompting should be adjusted to each task type, because a single template will not give equally strong results across every kind of task.",
        why: [
          "Đúng: mỗi loại việc hỏng một kiểu, nên prompt phải nhấn đúng phần chặn kiểu hỏng đó (ý 2, ý 3).",
          "Mẫu dùng chung vẫn có ích làm khung (ý 1). Góp ý là chỉnh phần nhấn mạnh theo loại việc, không phải bỏ khung."
        ] },
      { k: "B", gist: "The habit is ideal, since one template guarantees the same quality on every type of task.",
        why: [
          "Sai ở chữ “guarantees” (bảo đảm): cùng một mẫu không bảo đảm chất lượng như nhau, vì mỗi loại việc cần thứ khác (ý 3).",
          "Mẫu viết cho soạn thảo không có chỗ cho quyền nói “không đủ dữ liệu”. Đem nó đi phân tích thì dễ ra kết luận dữ liệu không đỡ được (ý 2).",
          "Dễ bị cuốn vì nhất quán nghe như chất lượng. Nhưng đầu vào giống nhau không làm output tốt như nhau khi việc khác nhau."
        ] },
      { k: "C", gist: "Prompting should stay the same between tasks, because adapting it costs time and adds nothing.",
        why: [
          "Sai ở vế “adds no value” (không thêm gì): chỉnh đúng phần, như thêm mẫu giọng cho việc soạn thảo, chặn được đúng kiểu hỏng của loại việc đó (ý 2, ý 3).",
          "Tiết kiệm vài phút viết prompt thì đổi lại phải sửa output lâu hơn."
        ] },
      { k: "D", gist: "The type of task has no bearing on which prompting approach is appropriate.",
        why: [
          "Sai: phủ nhận đúng điều cần nắm. Loại việc quyết phần nào của prompt cần nhấn (ý 1, ý 3).",
          "Brainstorm cần độ rộng, chấm sau. Phân tích cần bám dữ liệu. Hai đòi hỏi đó gần như ngược nhau."
        ] }
    ],
    refs: [
      { label: "Bài 1.4, bảng “Bốn loại việc, bốn kiểu hỏng”: đưa gì, đòi gì, hỏng hay gặp của từng loại", href: NOTES + "#l-1-4" },
      { label: "Bài nền tảng Domain 1, mục “Các phần của một prompt tốt”: khung chung cho mọi việc", href: NOTES + "#l-1-0" }
    ]
  },
  {
    de: 2, n: 15, total: 141, sub: "1.1", subName: "Viết prompt rõ yêu cầu, lý do, nguồn, mẫu",
    answer: "A",
    ask: "A knowledge worker is listing common prompt failure patterns for the team. Which pattern most often leads to vague or off-target output?",
    scene: [
      "Một nhân viên đang tổng hợp các kiểu prompt hỏng hay gặp cho cả nhóm.",
      "Đề hỏi kiểu nào hay dẫn tới output chung chung hoặc lạc đề.",
      "Chỗ khó: ba phương án kia là prompt tốt. Đây là câu hỏi ngược: tìm cái prompt thiếu."
    ],
    asks: [
      "Kiểu prompt nào hay cho output mơ hồ, lệch mục tiêu nhất?",
      "Tức là: nhận ra prompt thiếu phần nào thì Claude phải tự đoán, và đoán thì ra output chung chung."
    ],
    facts: [
      "Claude chỉ làm việc với những gì nằm trong context. Chỗ nào prompt bỏ trống, Claude tự đoán theo kiểu câu trả lời phổ biến nhất, nên output ra chung chung.",
      "Prompt tốt nói rõ: việc (làm gì, sâu tới đâu), bối cảnh (cho ai đọc, để làm gì), ràng buộc, nguồn, ví dụ, định dạng output. Thiếu việc thì Claude làm một việc gần giống. Thiếu người đọc thì viết cho người đọc chung chung. Thiếu định dạng thì dùng định dạng mặc định.",
      "Triệu chứng chỉ về nguyên nhân. Output chung chung thường do thiếu bối cảnh cụ thể. Output lạc đề thường do không nói mục tiêu và người đọc."
    ],
    opts: [
      { k: "A", gist: "A prompt that names a topic but says nothing about the task, the audience or the structure the output needs.",
        why: [
          "Đúng: chỉ có chủ đề thì thiếu đúng ba phần quyết định output: việc, người đọc, định dạng (ý 2).",
          "Claude phải đoán cả ba, theo kiểu phổ biến nhất (ý 1). Ví dụ minh họa: prompt chỉ ghi “khảo sát nhân viên quý 3” có thể ra bài giới thiệu khảo sát, trong khi người viết cần bản tóm tắt ngắn cho ban giám đốc (ý 3)."
        ] },
      { k: "B", gist: "A prompt that sets clear limits on length and tone.",
        why: [
          "Sai: giới hạn độ dài và giọng rõ ràng là thêm thông tin, bớt chỗ Claude phải đoán (ý 2).",
          "Đây là cách sửa output chung chung, không phải nguyên nhân."
        ] },
      { k: "C", gist: "A prompt that states the role, task, audience and required output format explicitly.",
        why: [
          "Sai: đây gần như là prompt đủ phần, bản đối lập của A (ý 2).",
          "Dễ bị cuốn nếu đọc lướt, vì A và C cùng nhắc task, audience, format. Nhưng A nói “does not state” (không nói), còn C nói “explicitly names” (nói rõ)."
        ] },
      { k: "D", gist: "A prompt that includes a representative example of the output wanted.",
        why: [
          "Sai: một mẫu tiêu biểu là cách chặn output chung chung, lệch định dạng (ý 2).",
          "Mẫu cho Claude thấy output trông ra sao, nên nó bớt phải đoán giọng và độ dài."
        ] }
    ],
    refs: [
      { label: "Bài nền tảng Domain 1, bảng “Các phần của một prompt tốt”: thiếu phần nào thì Claude làm gì", href: NOTES + "#l-1-0" },
      { label: "Bài 1.1: nói rõ việc, người đọc, giới hạn; ví dụ bản yếu và bản đủ của lời yêu cầu tóm tắt khảo sát", href: NOTES + "#l-1-1" },
      { label: "Bài 1.3, bảng triệu chứng: chung chung do thiếu bối cảnh, lạc đề do không nói mục tiêu và người đọc", href: NOTES + "#l-1-3" }
    ]
  },
  {
    de: 2, n: 16, total: 141, sub: "6.2", subName: "Dữ liệu nhạy cảm và quy định",
    answer: "AE",
    ask: "An HR specialist is reviewing which data items may go into a Claude prompt for a routine task. Which two items are appropriate to include? (Select two.)",
    scene: [
      "Một chuyên viên nhân sự xem từng món dữ liệu đồng nghiệp định đưa vào prompt cho một việc thường ngày.",
      "Năm phương án là năm món dữ liệu, mỗi món kèm một lý do dùng nghe hợp lý.",
      "Chỗ khó: món nào cũng phục vụ một việc có thật. Phải hỏi món đó có chỉ ra một người cụ thể không, và việc có thật sự cần chi tiết đó không."
    ],
    asks: [
      "Hai món nào đưa vào prompt được cho một việc thường ngày?",
      "Tức là: áp tối thiểu hóa dữ liệu. Món nào việc vẫn xong mà không lộ ra người cụ thể nào thì đưa được."
    ],
    facts: [
      "Data minimization (tối thiểu hóa dữ liệu): chỉ đưa cho Claude phần dữ liệu việc đó thật sự cần. Trước khi gửi, hỏi: dữ liệu thuộc nhóm nào, việc có cần chi tiết định danh không.",
      "Các nhóm phải cẩn thận: định danh cá nhân (thông tin chỉ ra một người, một mình hoặc khi ghép lại), tài chính (bảng lương), sức khỏe, nhân sự (đánh giá, kỷ luật, hồ sơ). Dữ liệu nhân sự còn ảnh hưởng tới sinh kế của người đó.",
      "Anonymize (ẩn danh) là bỏ hoặc thay thông tin định danh để không lần ra người thật. Redact (che) là xóa phần nhạy cảm trước khi đưa vào.",
      "Đã gửi thì dữ liệu nằm trong chat, theo luật lưu trữ của tài khoản. Mọi quyết định nằm ở trước khi bấm gửi."
    ],
    opts: [
      { k: "A", gist: "A job description, already redacted, that Claude will adapt into a job posting.",
        why: [
          "Đúng: mô tả công việc nói về một vị trí, không về một người, lại đã được che (ý 3).",
          "Việc chỉ là viết lại thành tin tuyển dụng, không cần thêm gì ngoài văn bản đó (ý 1)."
        ] },
      { k: "B", gist: "Notes on an employee's accommodation request, taken from their HR file, to draft a memo adjusting their role.",
        why: [
          "Sai: yêu cầu điều chỉnh công việc (accommodation request) thường gắn với sức khỏe, khuyết tật hay hoàn cảnh riêng của một người cụ thể. Đây là dữ liệu sức khỏe và nhân sự cùng lúc (ý 2).",
          "Lấy nguyên ghi chú trong hồ sơ của một người là đưa nhiều hơn việc cần, và đây không phải việc thường ngày (ý 1).",
          "Dễ bị cuốn vì lý do dùng có thật: cần soạn thư điều chỉnh vai trò. Nhưng lý do có thật không làm món dữ liệu bớt nhạy cảm."
        ] },
      { k: "C", gist: "Employee ID numbers and hire dates for the whole team roster, so Claude can personalise onboarding messages.",
        why: [
          "Sai: mã nhân viên là định danh, ghép với ngày vào làm thì chỉ ra đúng từng người (ý 2).",
          "Viết thư chào mừng không cần mã nhân viên. Đưa cả danh sách là đưa thừa so với việc (ý 1).",
          "Dễ bị cuốn vì không có lương, không có bệnh án, trông vô hại. Nhưng định danh nhân viên vẫn là dữ liệu cá nhân, và việc này không cần nó."
        ] },
      { k: "D", gist: "A compensation band summary that lists the employees of one team by name with their current salaries.",
        why: [
          "Sai: tên gắn với mức lương hiện tại là định danh cộng tài chính, hai nhóm nhạy cảm cùng lúc (ý 2).",
          "Chữ “summary” (tóm tắt) không làm nó thành số gộp: vẫn còn tên và lương của từng người. Việc thường ngày không cần tới chi tiết đó (ý 1)."
        ] },
      { k: "E", gist: "An anonymised summary of an HR policy that Claude will rephrase.",
        why: [
          "Đúng: tóm tắt chính sách đã ẩn danh, không chứa thông tin về người cụ thể nào (ý 3).",
          "Việc diễn đạt lại không cần gì thêm. Đây là ca dùng thường ngày điển hình (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 6.2, mục “Kiểm trước khi gửi” và “Ba cách bớt dữ liệu mà việc vẫn xong”: tối thiểu hóa, ẩn danh, che", href: NOTES + "#l-6-2" },
      { label: "Bài nền tảng Domain 6, bảng các nhóm dữ liệu nhạy cảm: định danh, tài chính, sức khỏe, nhân sự", href: NOTES + "#l-6-0" }
    ]
  },
  {
    de: 2, n: 17, total: 141, sub: "6.1", subName: "Việc nào giao cho Claude được",
    answer: "D",
    ask: "Before approving a proposed Claude use case for your team, you run an assessment. What is the right order for these steps? <br>(1) Check the use case against company policy and any relevant regulatory requirements.<br>(2) Record the outcome and the reasoning behind it so it can be traced later.<br>(3) Work out who the outputs are for, what decisions they affect, and whether they can be reversed.<br>(4) Decide whether the use case goes ahead, needs changes, or is turned down.<br>(5) Work out which kinds of data are involved and whether any sensitive data is in play.",
    scene: [
      "Nhóm đề xuất một cách dùng Claude (use case). Mày phải đánh giá trước khi duyệt.",
      "Năm bước: (3) output cho ai, ảnh hưởng quyết định nào, rút lại được không; (5) dữ liệu nào dính vào, có dữ liệu nhạy cảm không; (1) đối chiếu chính sách công ty và quy định; (4) quyết cho làm, sửa, hay từ chối; (2) ghi lại kết quả và lý do.",
      "Cả bốn dãy đều kết thúc bằng 4, 2. Chỗ khó nằm ở ba bước đầu: (3), (5), (1) xếp thế nào."
    ],
    asks: [
      "Thứ tự đúng của các bước đánh giá là gì?",
      "Tức là: bước nào phải có kết quả thì bước sau mới làm được.",
      "Soi từng dãy: (1) đối chiếu chính sách cần biết những gì trước; (5) kiểm dữ liệu có cần biết use case làm gì trước không."
    ],
    facts: [
      "Bắt đầu từ vấn đề: hiểu việc làm ra gì, cho ai, để làm gì, rồi mới tới công cụ và dữ liệu. Xếp rủi ro của một use case dựa vào output: có tới một người cụ thể, ảnh hưởng quyền lợi của họ không; nếu sai, ai thấy và sửa có kịp không.",
      "Tối thiểu hóa dữ liệu hỏi “việc này có cần chi tiết định danh không?”. Câu đó chỉ trả lời được khi đã biết việc làm ra gì, cho ai.",
      "Chính sách công ty và quy định (như GDPR cho dữ liệu cá nhân, HIPAA cho thông tin sức khỏe) áp theo loại dữ liệu và loại việc. Đối chiếu chính sách cần có sẵn cả hai thông tin đó.",
      "Quyết xong thì ghi lại quyết định, để lần sau không phải hỏi lại và có hồ sơ khi ai đó hỏi vì sao."
    ],
    opts: [
      { k: "A", gist: "3, 1, 5, 4, 2",
        why: [
          "Sai ở chỗ làm (1) trước (5): đối chiếu chính sách và quy định khi chưa biết dữ liệu nào dính vào (ý 3).",
          "Quy định nào áp phụ thuộc vào loại dữ liệu. Làm (1) trước thì thấy dữ liệu sức khỏe hay dữ liệu cá nhân ở (5) xong lại phải đối chiếu lần nữa."
        ] },
      { k: "B", gist: "1, 3, 5, 4, 2",
        why: [
          "Sai ở bước đầu: đối chiếu chính sách khi chưa biết use case làm gì, cho ai, dùng dữ liệu gì (ý 1, ý 3).",
          "Chưa có gì để đem so, nên (1) thành đọc chính sách chung chung."
        ] },
      { k: "C", gist: "5, 3, 1, 4, 2",
        why: [
          "Sai ở bước đầu: làm (5) trước (3), kiểm kê dữ liệu khi chưa rõ use case làm ra gì, cho ai (ý 2).",
          "Chưa biết việc thì không biết dữ liệu nào thật sự cần. Dễ kê cả dữ liệu việc không cần, hoặc sót dữ liệu sẽ phải dùng.",
          "Dễ bị cuốn vì dữ liệu nhạy cảm là rủi ro nghe nặng nhất, nên muốn soi đầu tiên. Nhưng D vẫn làm (5) trước (1); chỉ cần biết việc trước đã."
        ] },
      { k: "D", gist: "3, 5, 1, 4, 2",
        why: [
          "Đúng: (3) hiểu use case và mức rủi ro của output trước (ý 1). Rồi (5) xác định dữ liệu việc đó cần, có nhạy cảm không (ý 2).",
          "(1) đối chiếu chính sách khi đã có đủ hai thông tin (ý 3). (4) quyết dựa trên cả ba. (2) ghi lại kết quả và lý do sau cùng (ý 4)."
        ] }
    ],
    dispute: "Examtopics chấm D. Cộng đồng chia D 67%, C 33%. C chỉ khác D ở chỗ đưa (5) lên trước (3). C thua vì dữ liệu nào “dính vào” phụ thuộc vào việc làm gì, cho ai: tối thiểu hóa dữ liệu chỉ trả lời được sau khi hiểu use case. C vẫn giữ (1), (4), (2) đúng chỗ, nên sai nhẹ hơn A và B.",
    refs: [
      { label: "Bài 6.1, bảng “Ba vùng, mỗi vùng một câu hỏi” và phép thử kiểm được, sửa được: xếp use case theo output và hậu quả", href: NOTES + "#l-6-1" },
      { label: "Bài 6.2, mục “Kiểm trước khi gửi”: ba câu hỏi về nhóm dữ liệu và chi tiết định danh", href: NOTES + "#l-6-2" },
      { label: "Bài 6.3, mục “Khi chính sách và yêu cầu va nhau”: ghi lại quyết định ở bước cuối", href: NOTES + "#l-6-3" }
    ]
  },
  {
    de: 2, n: 18, total: 141, sub: "1.3", subName: "Lặp prompt: chẩn đoán, đổi một chỗ, thử lại",
    answer: "AC",
    ask: "Claude's first output is partly usable but has problems with tone and level of detail. Which two refinements are most likely to give a clearly better result? (Select two.)",
    scene: [
      "Output đầu tiên của Claude dùng được một phần.",
      "Còn hai chỗ hỏng: giọng văn, và mức chi tiết.",
      "Chỗ khó: ba phương án sai đều là chạy lại theo cách khác, không thêm thông tin nào vào prompt."
    ],
    asks: [
      "Hai cách chỉnh nào dễ cho ra output tốt hơn rõ rệt nhất?",
      "Tức là: cách nào đổi được điều kiện gây ra giọng sai và chi tiết lệch, chứ không chỉ cho ra một bản khác."
    ],
    facts: [
      "Lặp prompt là đọc triệu chứng, tìm phần prompt gây ra, rồi đổi đúng phần đó. Gõ lại y nguyên hay “viết hay hơn đi” giữ nguyên điều kiện gây lỗi: ra một bản khác, không chắc tốt hơn.",
      "Giọng và độ sâu lệch thường do prompt thiếu người đọc và bối cảnh. Sửa bằng cách nêu người đọc cụ thể, giọng cụ thể, mức sâu cần.",
      "Một mẫu thật đáng tin hơn tả giọng bằng tính từ. Ví dụ cho Claude thấy output đạt chuẩn trông thế nào: giọng, độ dài, độ chi tiết.",
      "Temperature (độ ngẫu nhiên) không có nút trong app, và nó không làm Claude theo lời dặn tốt hơn."
    ],
    opts: [
      { k: "A", gist: "Give an example of output that meets the standard you want.",
        why: [
          "Đúng: ví dụ cho thấy cùng lúc giọng và mức chi tiết cần có, đúng hai chỗ đang hỏng (ý 3).",
          "Đây là thêm thông tin Claude đang thiếu, không phải nhắc lại lời cũ (ý 1)."
        ] },
      { k: "B", gist: "Tack “please do better” onto the end of the original prompt.",
        why: [
          "Sai: “làm tốt hơn đi” không nói tốt hơn ở đâu. Giọng nào, chi tiết tới đâu, Claude vẫn phải đoán (ý 1).",
          "Thêm nhấn mạnh, không thêm thông tin. Bản sau khác bản trước, không chắc tốt hơn."
        ] },
      { k: "C", gist: "Add a specific tone descriptor and a concrete audience to the prompt.",
        why: [
          "Đúng: người đọc cụ thể quyết giọng và độ sâu, giọng cụ thể bớt chỗ phải đoán (ý 2).",
          "Sửa đúng phần prompt gây ra triệu chứng, đúng vòng chẩn đoán, đổi, thử lại (ý 1)."
        ] },
      { k: "D", gist: "Raise the temperature and send the unchanged prompt again.",
        why: [
          "Sai: người dùng app không có nút temperature, và nó không làm Claude theo lời dặn tốt hơn (ý 4).",
          "Prompt giữ nguyên thì điều kiện gây giọng sai vẫn còn. Tăng ngẫu nhiên chỉ làm output lệch theo kiểu khác."
        ] },
      { k: "E", gist: "Send the same prompt several times and keep the best reply.",
        why: [
          "Sai: gõ lại y nguyên giữ nguyên điều kiện gây lỗi. Mỗi lần ra một bản khác, không bản nào được thêm thông tin (ý 1).",
          "Dễ bị cuốn vì có khi bốc được một bản khá hơn. Nhưng đó là may, lần sau gặp việc tương tự lại phải bốc tiếp."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, bảng “Đọc triệu chứng, tìm phần của prompt gây ra” và các cách sửa nghe hợp lý mà không sửa gì", href: NOTES + "#l-1-3" },
      { label: "Bài 1.4, mục “Soạn thảo: đưa mẫu giọng và dữ kiện thật”: mẫu thật đáng tin hơn tả bằng tính từ", href: NOTES + "#l-1-4" },
      { label: "Bài 1.1, mục “Biết thêm”: đáp án nhắc chỉnh temperature thì loại", href: NOTES + "#l-1-1" }
    ]
  },
  {
    de: 2, n: 19, total: 141, sub: "7.2", subName: "Chỉnh theo phản hồi",
    answer: "DE",
    ask: "You are reviewing how colleagues handled feedback on communications that Claude drafted. Which two responses to the feedback are productive? (Select two.)",
    scene: [
      "Đồng nghiệp nhận góp ý cho các văn bản do Claude soạn. Mày xem họ xử lý góp ý thế nào.",
      "Năm cách phản ứng: không sửa vì tin Claude, gộp hết mọi góp ý cùng lúc, hoãn hết, hỏi lại khi góp ý mơ hồ, ghi mỗi góp ý ứng với thay đổi nào.",
      "Chỗ khó: có góp ý mơ hồ, có góp ý trái nhau. Cách nào cũng có một lý do nghe được."
    ],
    asks: [
      "Hai cách phản ứng nào là hiệu quả?",
      "Tức là: cách nào biến góp ý thành thay đổi đúng chỗ, và cho thấy được góp ý đã được xử lý."
    ],
    facts: [
      "Phản hồi là triệu chứng, không phải đơn thuốc. Tìm gốc trước khi sửa. Góp ý mơ hồ (“chưa ổn lắm”) thì xin ví dụ cụ thể: đã ghi gì, lẽ ra ghi gì.",
      "Góp ý trái chiều thì đừng sửa theo bên chê to nhất. Thống nhất chuẩn đạt trước, rồi chấm output theo chuẩn đó.",
      "Mỗi lần đổi một chỗ, để biết thay đổi nào có tác dụng. Phản hồi càng sớm càng rẻ.",
      "Người gửi output là người chịu trách nhiệm, dù Claude soạn bao nhiêu. Giọng tự tin của Claude không chứng minh nó đúng."
    ],
    opts: [
      { k: "A", gist: "Refusing to revise sections Claude wrote, on the grounds that the model's output should be trusted as it is.",
        why: [
          "Sai: phần Claude soạn không được miễn kiểm. Người gửi vẫn là người chịu (ý 4).",
          "Góp ý chỉ ra chỗ hỏng thật. Bỏ qua nó là gửi đi một văn bản đã biết có lỗi."
        ] },
      { k: "B", gist: "Working every piece of feedback, contradictory suggestions included, into the next draft all at once.",
        why: [
          "Sai: góp ý trái nhau thì không làm theo cả hai cùng lúc được. Phải thống nhất chuẩn đạt trước (ý 2).",
          "Đổi mọi thứ một lần thì không biết thay đổi nào sửa được gì, thay đổi nào làm hỏng (ý 3).",
          "Dễ bị cuốn vì nghe như tôn trọng mọi người góp ý. Nhưng bản nháp sau sẽ tự mâu thuẫn, và cả hai bên đều không vừa ý."
        ] },
      { k: "C", gist: "Holding all feedback back for a later revision round so the current draft stays consistent.",
        why: [
          "Sai: phản hồi càng sớm càng rẻ (ý 3). Hoãn hết thì lỗi đã biết vẫn nằm trong bản đang dùng.",
          "Một bản nhất quán mà có lỗi đã biết thì nhất quán không cứu được gì."
        ] },
      { k: "D", gist: "Asking clarifying questions when a piece of feedback is ambiguous, before acting on it.",
        why: [
          "Đúng: góp ý mơ hồ chưa cho biết triệu chứng. Hỏi lại để có ví dụ cụ thể rồi mới biết sửa chỗ nào (ý 1).",
          "Sửa theo phỏng đoán có thể sửa trượt, hoặc phá luôn phần đang tốt."
        ] },
      { k: "E", gist: "Linking each piece of feedback to the specific change it led to in the next draft.",
        why: [
          "Đúng: mỗi góp ý có một thay đổi rõ ràng, nên biết thay đổi nào xử lý góp ý nào (ý 3).",
          "Người góp ý kiểm được ý mình đã được xử lý chưa. Góp ý nào chưa có thay đổi tương ứng cũng lộ ra ngay."
        ] }
    ],
    refs: [
      { label: "Bài 7.2, mục “Đọc phản hồi để tìm gốc” và “Ý kiến trái chiều: thống nhất chuẩn đạt trước”", href: NOTES + "#l-7-2" },
      { label: "Bài 4.3, câu dạng “Phản hồi mơ hồ khi chạy thử”: xin ví dụ cụ thể trước khi đổi gì", href: NOTES + "#l-4-3" },
      { label: "Bài 6.4, mục “Bạn gửi thì bạn chịu”: trách nhiệm với output Claude soạn", href: NOTES + "#l-6-4" }
    ]
  },
  {
    de: 2, n: 20, total: 141, sub: "4.1", subName: "Phân tích use case",
    answer: "C",
    ask: "A project manager is working out how Claude can help with requirements analysis on an upcoming engagement. During discovery, the team will interview stakeholders and go through the existing process documentation. Which activity is a good fit here?",
    scene: [
      "Một PM đang tính dùng Claude vào việc phân tích yêu cầu cho một dự án sắp tới.",
      "Giai đoạn khảo sát (discovery) có hai nguồn: đội tự phỏng vấn stakeholder, và đọc tài liệu quy trình đang có.",
      "Cả bốn phương án đều “dùng Claude”. Chỗ khác nhau là Claude làm phần nào, dựa vào nguồn nào, và người còn giữ phần nào."
    ],
    asks: [
      "Việc nào hợp để Claude làm trong giai đoạn này?",
      "Tức là: chọn chỗ Claude giúp được thật, trên chính nguồn đội thu về, mà người vẫn kiểm và quyết được.",
      "Soi từng phương án: Claude làm trên nguồn thật hay tự nghĩ ra, kết quả có lần ngược về nguồn để kiểm không, và phần cần người (làm việc với stakeholder, chốt) còn ở tay người không."
    ],
    facts: [
      "Việc hợp Claude: nhiều chữ, mô tả rõ được, đầu ra kiểm được. Tóm tắt biên bản, phân loại, đổi định dạng tài liệu là ví dụ điển hình.",
      "Chia vai khi dùng Claude với yêu cầu: Claude đặt câu hỏi làm rõ, gắn nhãn, chỉ chỗ mơ hồ hay mâu thuẫn. Người trả lời câu hỏi cùng stakeholder và ra quyết định cuối.",
      "Bỏ hiểu biết của đội, để Claude nghĩ từ đầu là một cách dùng sai mà notes nêu tên. Không có nguồn thì Claude chỉ đoán, và chỗ đoán có thể là bịa mà trông như thật (hallucination).",
      "Truy vết (traceability) là mỗi yêu cầu ghi rõ nó đến từ nguồn nào. Có nó thì người duyệt so được từng dòng với biên bản hay tài liệu gốc."
    ],
    opts: [
      { k: "A", gist: "Have Claude write a complete requirements list from just the project name and a short description, on the grounds that requirements for similar engagements are mostly standard.",
        why: [
          "Sai ở giả định “yêu cầu của các dự án giống nhau là chuẩn chung”. Claude không có biên bản phỏng vấn hay tài liệu quy trình nào, nên chỉ đoán (ý 3).",
          "Danh sách trông đầy đủ, nhưng không dòng nào lần về được nguồn. Đội khảo sát xong mà kết quả khảo sát không vào được danh sách (ý 4)."
        ] },
      { k: "B", gist: "Have Claude rank the requirements the team has already collected, and keep the collecting itself as manual analyst work, because ranking takes more time.",
        why: [
          "Xếp ưu tiên theo tiêu chí là một cách dùng Claude hợp lệ. Nhưng phương án này đẩy phần nhiều chữ nhất, gom biên bản phỏng vấn và tài liệu thành yêu cầu, về làm tay (ý 1).",
          "Lý do đưa ra cũng không có cơ sở: không có gì cho thấy xếp ưu tiên tốn thời gian hơn. Và đề hỏi việc hợp với giai đoạn khảo sát, không phải bước sau đó.",
          "Dễ bị cuốn vì notes có nhắc Claude xếp ưu tiên được. Nhưng ở đây nó bỏ đúng chỗ Claude giúp nhiều nhất."
        ] },
      { k: "C", gist: "Have Claude synthesize the stakeholder input and the existing process documents into a structured requirements list, with each item traced back to its source.",
        why: [
          "Đúng. Claude làm trên chính nguồn đội thu về: nhiều chữ, gom thành danh sách có cấu trúc, đúng loại việc hợp Claude (ý 1).",
          "Mỗi yêu cầu ghi nguồn, nên người duyệt so được từng dòng với biên bản và tài liệu gốc, bắt được chỗ Claude hiểu sai hay thêm thắt (ý 4).",
          "Người vẫn giữ phần cần người: làm việc với stakeholder, gỡ chỗ mâu thuẫn, chốt bản cuối (ý 2)."
        ] },
      { k: "D", gist: "Have Claude run the stakeholder interviews itself, with the analyst going through the recordings afterwards to confirm what Claude pulled out.",
        why: [
          "Sai ở chia vai: làm việc với stakeholder là phần của người. Claude đặt câu hỏi làm rõ trên bản nháp và xử lý biên bản, người hỏi tiếp khi câu trả lời mơ hồ và chốt (ý 2).",
          "Người phân tích bị đẩy xuống thành người nghe lại sau. Phát hiện thiếu thì cuộc phỏng vấn đã qua, không hỏi thêm được."
        ] }
    ],
    refs: [
      { label: "Bài 4.1, mục “Dùng Claude soát yêu cầu khi còn là bản nháp”: chia vai Claude và người, ba cách dùng sai", href: NOTES + "#l-4-1" },
      { label: "Bài 4.1, bảng “Việc nào hợp Claude, việc nào chưa, việc nào cần người”", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 2, n: 21, total: 141, sub: "4.1", subName: "Phân tích use case",
    answer: "D",
    ask: "An account manager has had Claude pull requirements out of stakeholder notes. Three of them clash: two stakeholders asked for workflow steps that cannot both exist, and a third requirement depends on an outcome those two steps would rule out. What is the most appropriate next step?",
    scene: [
      "Một account manager nhờ Claude trích yêu cầu từ ghi chú của các stakeholder (những người có quyền lợi hay tiếng nói trong dự án).",
      "Ba yêu cầu đá nhau: hai stakeholder đòi hai bước quy trình loại trừ nhau, yêu cầu thứ ba lại giả định một kết quả mà hai bước kia chặn mất.",
      "Chỗ khó: Claude đã làm xong phần trích. Việc còn lại là quyết bên nào nhường, và đó là quyết định về ưu tiên của người khác, không phải việc soạn chữ."
    ],
    asks: [
      "Bước nào hợp nhất lúc này?",
      "Tức là: ai được quyền gỡ một mâu thuẫn giữa các stakeholder, và tài liệu yêu cầu phải ghi gì để họ gỡ được.",
      "Soi từng phương án: ai ra quyết định, mâu thuẫn có được nói rõ không, và mỗi bên có truy được về đúng người nêu không."
    ],
    facts: [
      "Chia vai khi dùng Claude với yêu cầu: Claude đặt câu hỏi, gắn nhãn, chỉ chỗ mơ hồ hay mâu thuẫn. Người trả lời câu hỏi cùng stakeholder và ra quyết định cuối.",
      "Để Claude tự gỡ chỗ mơ hồ rồi chốt luôn bản yêu cầu là một cách dùng sai mà notes nêu tên.",
      "Cắt một yêu cầu khỏi dự án, chấp nhận một đánh đổi là việc cần người có thẩm quyền đứng tên. Claude giúp nhiều nhất lúc yêu cầu còn là nháp, khi sửa còn rẻ.",
      "Yêu cầu tốt là câu mà người lạ đọc vào chấm được đạt hay không đạt. Hai yêu cầu loại trừ nhau thì không bản thiết kế nào đạt cả hai."
    ],
    opts: [
      { k: "A", gist: "List all three conflicting requirements side by side as options in the requirements document and leave the choice to the project's decision process later on.",
        why: [
          "Có nêu cả ba, nhưng không gọi chúng là mâu thuẫn và không giao cho ai gỡ. “Later” (để sau) nghĩa là chưa ai chịu trách nhiệm quyết (ý 1).",
          "Hậu quả: tài liệu yêu cầu chứa ba thứ không thể cùng đạt (ý 4). Đội làm sau sẽ tự chọn một bên, hoặc làm dở cả hai.",
          "Dễ bị cuốn vì nghe trung lập, không tự ý bỏ ai. Nhưng không có người gỡ thì mâu thuẫn chỉ bị đẩy xuống bước sau, nơi sửa đắt hơn (ý 3)."
        ] },
      { k: "B", gist: "Have Claude write compromise wording for each conflict and send that compromise to the stakeholders as the proposed resolution.",
        why: [
          "Sai vai: Claude đang gỡ mâu thuẫn thay người (ý 1, 2). Gửi đi dưới dạng “proposed resolution” (cách giải quyết đề xuất) là đặt sẵn quyết định cho stakeholder.",
          "Hai bước loại trừ nhau không gỡ được bằng câu chữ. Câu thỏa hiệp nghe êm có khi chỉ che mâu thuẫn đi, còn yêu cầu thứ ba vẫn treo."
        ] },
      { k: "C", gist: "Keep the requirement with the strongest business case in the notes, set the others aside, and move ahead with that one.",
        why: [
          "Sai ở người quyết: account manager tự bỏ yêu cầu của hai stakeholder mà không hỏi họ. Cắt yêu cầu là quyết định cần người có thẩm quyền đứng tên (ý 3).",
          "“Strongest business case in the notes” (lý do kinh doanh mạnh nhất trong ghi chú) chỉ đo được cái người ta đã viết ra. Nhiều lý do của tổ chức không bao giờ được viết ra."
        ] },
      { k: "D", gist: "Mark the conflicts in the requirements document, record which source each side came from, and send them back to the stakeholders who raised them to resolve.",
        why: [
          "Đúng chia vai: phần soát và đánh dấu đã xong, quyết định trả về đúng người có quyền (ý 1, 3).",
          "Ghi nguồn từng bên giúp stakeholder thấy ai đòi gì, gỡ trên dữ kiện thật chứ không trên bản tóm tắt. Tài liệu không chốt một bộ yêu cầu không thể cùng đạt (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 4.1, mục “Dùng Claude soát yêu cầu khi còn là bản nháp”: Claude đặt câu hỏi, gắn nhãn; người cùng stakeholder trả lời và chốt", href: NOTES + "#l-4-1" },
      { label: "Bài 4.1, bảng “Việc nào hợp Claude, việc nào chưa, việc nào cần người”: cắt một yêu cầu, chấp nhận đánh đổi là việc của người", href: NOTES + "#l-4-1" },
      { label: "Bài Nền tảng D4, mục 1: use case, workflow, bước, stakeholder", href: NOTES + "#l-4-0" }
    ]
  },
  {
    de: 2, n: 22, total: 141, sub: "3.2", subName: "Haiku, Sonnet, Opus khác nhau ở đâu",
    answer: "B",
    ask: "A knowledge worker is explaining to a colleague how cost, speed and quality trade off across the Claude models. Which general statement describes that trade-off correctly?",
    scene: [
      "Một nhân viên văn phòng giải thích cho đồng nghiệp chuyện đánh đổi chi phí, tốc độ, chất lượng giữa các model Claude.",
      "Đề dùng chữ “rate limit”. Với người dùng app, đó là hạn mức dùng (usage limit): lượng việc được nhờ Claude trong một khoảng thời gian, tính chung trên mọi chat.",
      "Chỗ khó: các phương án sai đều kèm một cơ chế nghe có lý (lập luận hiệu quả hơn, phải chạy nhiều lượt). Phải nắm quy luật chung để không bị cơ chế dắt đi."
    ],
    asks: [
      "Câu khái quát nào mô tả đúng đánh đổi giữa các model?",
      "Tức là: lên tầng thì tốc độ và mức trừ hạn mức đổi theo chiều nào.",
      "Soi từng phương án theo hai trục: nhanh hay chậm, tốn hạn mức nhiều hay ít."
    ],
    facts: [
      "Haiku, Sonnet, Opus là ba tầng của cùng một họ model. Lên tầng thì lập luận sâu hơn, nhưng chậm hơn và tốn hạn mức hơn. Haiku nhanh và nhẹ nhất, Opus sâu nhất và nặng nhất trong ba tầng.",
      "Hướng dẫn chọn model của Anthropic: các model “differ in capability, speed, and how much of your usage limit they use” (khác nhau ở năng lực, tốc độ và mức tiêu hạn mức), và “A less capable model answers faster” (model kém mạnh hơn trả lời nhanh hơn).",
      "Cũng trang đó: “In general, the more capable the model, the more it costs per token” (nói chung model càng mạnh thì mỗi token càng đắt).",
      "Có một ngoại lệ được nêu tên: với việc dài, khó, model mạnh có khi tốn ít hơn tính trên cả việc, vì xong trong ít lượt hơn. Đó là ca riêng của việc khó, không phải quy luật chung."
    ],
    opts: [
      { k: "A", gist: "Speed and usage-limit consumption have nothing to do with capability; Haiku, Sonnet and Opus differ only in how deeply they reason.",
        why: [
          "Sai ở chữ “alone” (duy nhất). Các tầng khác nhau cả ở tốc độ và mức tiêu hạn mức, không chỉ ở độ sâu (ý 1, 2).",
          "Tin câu này thì chạy cả việc dễ trên Opus mà không thấy cái giá, tới giữa tuần hết hạn mức."
        ] },
      { k: "B", gist: "More capable models usually use up more of the limit and respond more slowly; lighter models are quicker and use less of it.",
        why: [
          "Đúng cả hai trục: tầng mạnh chậm hơn và tốn hạn mức hơn, tầng nhẹ nhanh hơn và nhẹ hơn (ý 1, 2, 3).",
          "Chữ “generally” (nói chung) chừa đúng chỗ cho ngoại lệ ở ý 4: đây là quy luật chung, không phải luật tuyệt đối."
        ] },
      { k: "C", gist: "More capable models usually use less of the limit because they reason more efficiently, even though they are slower than lighter models.",
        why: [
          "Đúng nửa về tốc độ, sai nửa về hạn mức. Tính trên mỗi token, model mạnh đắt hơn (ý 3), nên nói chung nó tốn hạn mức hơn (ý 1).",
          "Dễ bị cuốn vì có một ý thật đứng sau: việc dài, khó thì model mạnh có khi tốn ít hơn trên cả việc (ý 4). Nhưng đó là ca riêng, còn phương án biến nó thành quy luật chung bằng chữ “generally”."
        ] },
      { k: "D", gist: "Lighter models use more of the limit per request than stronger ones, because they need several passes to reach heavier-model quality.",
        why: [
          "Sai ở cơ chế: không nguồn nào nói tầng nhẹ phải chạy nhiều lượt cho một yêu cầu. Docs nói ngược lại: mỗi token của tầng nhẹ rẻ hơn (ý 3).",
          "Đảo ngược đúng quy luật ở ý 1. Theo câu này thì nên dồn mọi việc lên Opus cho đỡ hạn mức."
        ] }
    ],
    refs: [
      { label: "Bài 3.2, bảng ba tầng và mục “Hạn mức: tầng nặng tiêu nhanh hơn”", href: NOTES + "#l-3-2" },
      { label: "Bài 3.3, mục “Bốn câu hỏi trước khi chọn”: cân chi phí, tốc độ, chất lượng theo việc", href: NOTES + "#l-3-3" },
      { label: "Academy, Choosing the right Claude model: các model khác nhau ở năng lực, tốc độ và mức tiêu hạn mức", href: "https://academy.claude.com/tutorials/choosing-the-right-claude-model" }
    ]
  },
  {
    de: 2, n: 23, total: 141, sub: "3.1", subName: "Chọn tính năng: chat, Project, Research, artifact",
    answer: "B",
    ask: "A finance manager has to pick a Claude feature for a job that needs deterministic calculations across a spreadsheet with several tabs. Which choice meets that requirement best?",
    scene: [
      "Một quản lý tài chính cần tính toán trên một bảng tính nhiều tab. Đề nhấn chữ “deterministic” (tất định: cùng đầu vào thì luôn ra cùng kết quả).",
      "Bốn phương án là bốn tính năng: artifact, Code Execution, Research, chat thường. Ba phương án sai tự ghi luôn lý do chúng không hợp.",
      "Chỗ khó: tách việc “đặt và sửa một sản phẩm” và việc “gom nguồn” khỏi việc “tính chính xác”. Chỉ một tính năng thật sự chạy phép tính."
    ],
    asks: [
      "Chọn tính năng nào cho việc tính toán này?",
      "Tức là: tính năng nào cho con số được tính bằng code trên chính file đã tải lên, thay vì được sinh ra như chữ."
    ],
    facts: [
      "Code execution: Claude chạy code trong môi trường cách ly (sandbox) để tạo, sửa file và phân tích file dữ liệu tải lên. Đọc được file XLSX cũng nhờ nó.",
      "Tên cài đặt cũ là “Code execution and file creation”, giao diện mới gọi là “Create and edit files” (tạo và sửa file), ở Settings → Capabilities. Guide gọi là Code Execution. Cùng một tính năng.",
      "Chat chỉ đọc số thì hụt ở phép tính chính xác: con số được “đoán” chứ không được tính. Cách bù là cho Claude chạy code.",
      "Artifact là khung bên cạnh chat để xem, sửa, xuất một sản phẩm. Research gom và tổng hợp nhiều nguồn trên web và công cụ đã kết nối, tốn hạn mức nhanh hơn chat thường."
    ],
    opts: [
      { k: "A", gist: "Do the calculations in an artifact alone: it gives a stable, editable place for the result but does not run the deterministic computation that Code Execution would.",
        why: [
          "Artifact là chỗ đặt kết quả để xem, sửa, xuất (ý 4). Chính phương án tự nhận nó không chạy phép tính.",
          "Dễ bị cuốn vì artifact cũng cần code execution bật mới chạy, nghe như cùng một thứ. Nhưng chọn “artifact alone” (chỉ artifact) là chọn chỗ đặt kết quả, không chọn cách tính."
        ] },
      { k: "B", gist: "Use Code Execution, which runs code in a sandbox to calculate on the uploaded file and returns outputs the manager can check.",
        why: [
          "Đúng. Phép tính chạy bằng code trên chính file đã tải lên, cùng đầu vào thì ra cùng kết quả (ý 1, 3).",
          "Code và kết quả là thứ kiểm được: xem code lấy tab nào, cột nào, rồi đối chiếu vài con số với file gốc. Code tính đúng chưa chắc đã đọc đúng tab.",
          "Trong app hiện nay, tìm cài đặt “Create and edit files” (ý 2)."
        ] },
      { k: "C", gist: "Use Research for the calculations: it gathers and synthesizes outside sources, which is not the right tool for exact computation on an uploaded spreadsheet.",
        why: [
          "Research đi tìm và tổng hợp nguồn bên ngoài (ý 4). Việc ở đây là tính trên file đã có, không thiếu nguồn nào.",
          "Còn tốn hạn mức nhanh hơn chat thường mà không thêm phép tính nào (ý 4)."
        ] },
      { k: "D", gist: "Use an ordinary chat prompt, which writes text without running code and so cannot give the verified, exact output this multi-tab task needs.",
        why: [
          "Chat không chạy code thì con số được sinh ra như chữ, không được tính (ý 3). Bảng nhiều tab, nhiều phép cộng là đúng chỗ dễ sai.",
          "Số sai mà giọng rất chắc là triệu chứng điển hình của số “đoán”. Người đọc không thấy chỗ nào để nghi."
        ] }
    ],
    dispute: "Đáp án giữ B. Tên “Code Execution” trong đề là tên guide dùng. Trong app, cài đặt này giờ tên là “Create and edit files” (tên cũ “Code execution and file creation”), cùng một tính năng. Help center (Create and edit files with Claude) ghi nó chạy trong “an isolated, sandboxed container” (một container cách ly) và làm được “advanced analyses on uploaded data” (phân tích nâng cao trên dữ liệu tải lên).",
    refs: [
      { label: "Bài Nền tảng D3, mục định nghĩa Code execution: tên cũ, tên mới, nền của artifact và việc đọc XLSX", href: NOTES + "#l-3-0" },
      { label: "Bài 4.5, bảng bốn đặc tính: phép tính chính xác là chỗ hụt, cách bù là cho Claude chạy code", href: NOTES + "#l-4-5" },
      { label: "Help center, Create and edit files with Claude: sandbox, phân tích dữ liệu tải lên", href: "https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude" }
    ]
  },
  {
    de: 2, n: 24, total: 141, sub: "7.1", subName: "Chẩn đoán output kém",
    answer: "C",
    ask: "A Claude associate is working out why a response answered only one of the three questions a prompt required. The prompt had put all three questions into a single paragraph, separated only by commas. What is the most likely root cause?",
    scene: [
      "Prompt có ba câu hỏi bắt buộc, viết liền trong một đoạn, ngăn nhau bằng dấu phẩy. Claude chỉ trả lời một câu.",
      "Đề cho đúng một dấu hiệu về prompt: cách viết ba câu hỏi. Không nhắc prompt dài, không nhắc người đọc hay giọng văn.",
      "Ví dụ minh họa:<pre><code>Prompt: Tóm tắt doanh số quý 3, so với quý 2, và đề xuất cách tăng doanh số quý 4.\nOutput: (một bản tóm tắt doanh số quý 3 rất tốt, hết)</code></pre>"
    ],
    asks: [
      "Nguyên nhân gốc nào khả năng cao nhất?",
      "Tức là: từ triệu chứng (thiếu hai câu) và dấu hiệu duy nhất trong prompt (ba câu viết liền), suy ra chỗ prompt hỏng.",
      "Soi từng phương án: nguyên nhân nó nêu có dấu hiệu trong đề không, và sửa theo nó có trả về đủ ba câu không."
    ],
    facts: [
      "Docs về prompt của Anthropic: “Provide instructions as sequential steps using numbered lists or bullet points when the order or completeness of steps matters” (đưa chỉ dẫn thành các bước, dùng danh sách đánh số hoặc gạch đầu dòng khi thứ tự hay độ đủ quan trọng).",
      "Chẩn đoán đi từ triệu chứng tới nguyên nhân, dựa trên cái thấy được trong prompt và output. Nguyên nhân không có dấu hiệu nào trong đề là đoán.",
      "Đủ đo bằng danh sách yêu cầu: mỗi câu hỏi một dòng, đánh dấu đã trả lời, trả lời một nửa, hay chưa có. Câu không thấy câu trả lời là chưa có.",
      "Phát hiện “một câu hỏi không được trả lời” đổi thành yêu cầu cụ thể: “Trả lời từng câu thành một mục đánh số”."
    ],
    opts: [
      { k: "A", gist: "The prompt was too long, so Claude concentrated on whichever question was best supported by the surrounding context.",
        why: [
          "Sai ở chẩn đoán: đề không có dấu hiệu nào là prompt dài. Ba câu hỏi trong một đoạn là prompt ngắn (ý 2).",
          "Sửa theo hướng này là cắt bớt prompt. Ba câu hỏi vẫn viết liền, nên lần sau vẫn có thể thiếu.",
          "Dễ bị cuốn vì “prompt dài thì Claude bỏ sót” nghe như kinh nghiệm thật. Nhưng chẩn đoán phải bám dấu hiệu trong đề, không bám kinh nghiệm chung."
        ] },
      { k: "B", gist: "The response did cover all the required questions, just implicitly, even though it never visibly answered each one.",
        why: [
          "Đây không phải nguyên nhân, mà là chối triệu chứng. Câu hỏi không thấy câu trả lời là chưa trả lời (ý 3).",
          "Người đọc không có cách kiểm một câu trả lời “ngầm”. Chấp nhận nó là bỏ qua đúng chỗ thiếu mà đề nêu."
        ] },
      { k: "C", gist: "The task statement did not set out the three required questions explicitly enough for Claude to take them one at a time.",
        why: [
          "Đúng. Ba câu hỏi viết liền bằng dấu phẩy đọc như một câu hỏi có ba vế. Prompt không báo rằng cả ba đều bắt buộc, mỗi câu một phần trả lời (ý 1).",
          "Khớp đúng dấu hiệu duy nhất trong đề (ý 2), và cách sửa đi thẳng vào nó: tách thành danh sách đánh số, dặn trả lời từng câu (ý 4)."
        ] },
      { k: "D", gist: "The audience and tone instructions drowned out the task statement, so Claude put voice ahead of coverage.",
        why: [
          "Đề không nhắc phần người đọc hay giọng văn nào. Nguyên nhân này không có dấu hiệu để đỡ (ý 2).",
          "Giọng văn đổi cách viết, không quyết trả lời mấy câu. Sửa giọng xong, ba câu vẫn nằm liền một đoạn."
        ] }
    ],
    refs: [
      { label: "Bài 7.1, bảng “Từ triệu chứng tới nguyên nhân”: đọc triệu chứng, tìm gốc trong prompt", href: NOTES + "#l-7-1" },
      { label: "Bài 2.1, mục “Đo độ đủ bằng một danh sách viết trước” và bảng đổi phát hiện thành yêu cầu", href: NOTES + "#l-2-1" },
      { label: "Docs, Prompting best practices: dùng danh sách đánh số khi thứ tự hay độ đủ quan trọng", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
    ]
  },
  {
    de: 2, n: 25, total: 141, sub: "4.3", subName: "Làm giải pháp cùng Claude",
    answer: "C",
    ask: "A sales manager is revising a solution prototype built with Claude. A stakeholder review raised two specific concerns and accepted everything else as it stands. Which way of iterating is most likely to give a strong next version?",
    scene: [
      "Một quản lý bán hàng làm một nguyên mẫu giải pháp (prototype) cùng Claude. Stakeholder duyệt xong: hai điểm cần sửa, phần còn lại chấp nhận nguyên văn.",
      "Chỗ khó: ba phương án sai đều sửa nhiều hơn hai điểm, mỗi cái kèm một lý do nghe hợp lý: viết lại cho liền mạch, tiện tay cải thiện thêm, giữ giọng thống nhất."
    ],
    asks: [
      "Cách lặp nào nhiều khả năng cho bản sau tốt nhất?",
      "Tức là: sửa bao nhiêu, ở đâu, để vòng duyệt sau gọn và phần đã được chấp nhận không bị hỏng.",
      "Soi từng phương án: có đụng vào phần đã duyệt không, có thêm thay đổi không ai yêu cầu không, vòng sau có biết đã đổi gì không."
    ],
    facts: [
      "Làm giải pháp đi theo vòng plan → verify → judge → refine (lên kế hoạch, kiểm, đánh giá, sửa). Bước refine sửa đúng chỗ phản hồi chỉ ra, mỗi lần một thay đổi, rồi kiểm lại.",
      "Đổi một thứ rồi kiểm, để biết thay đổi nào gây ra lỗi mới. Đổi nhiều thứ cùng lúc thì không biết cái nào có tác dụng, cái nào làm hỏng.",
      "Ghi lại mỗi vòng: đổi gì, kết quả ra sao. Ba dòng là đủ.",
      "Phần stakeholder đã chấp nhận là phần đã qua bước judge. Sửa nó thì vòng duyệt sau phải xem lại cả phần đó."
    ],
    opts: [
      { k: "A", gist: "Rebuild the prototype from scratch with the two concerns built in, since a fresh start absorbs feedback more cleanly than targeted edits.",
        why: [
          "Vứt bỏ phần đã được chấp nhận (ý 4). Bản viết lại có thể lệch ở những chỗ stakeholder vốn đã đồng ý.",
          "Vòng duyệt sau phải xem lại toàn bộ thay vì hai chỗ. Hai điểm cần sửa chìm giữa mọi thứ khác đã đổi (ý 2)."
        ] },
      { k: "B", gist: "Fix the two concerns and also add a third improvement the manager spotted, since combining review feedback with self-found improvements is more efficient.",
        why: [
          "Thêm một thay đổi không ai yêu cầu vào cùng vòng (ý 2). Có lỗi mới thì không biết do hai chỗ sửa hay do phần thêm.",
          "Dễ bị cuốn vì “tiện tay làm luôn” nghe tiết kiệm. Nhưng cải tiến tự nghĩ ra chưa qua stakeholder; muốn làm thì nêu ra ở vòng duyệt sau, đừng gói lẫn vào."
        ] },
      { k: "C", gist: "Fix the two concerns directly, leave the unrelated parts alone, and record what changed for the next review.",
        why: [
          "Đúng bước refine: sửa đúng hai chỗ phản hồi chỉ ra (ý 1), không đụng phần đã qua duyệt (ý 4).",
          "Ghi lại thay đổi (ý 3) giúp vòng sau chỉ cần xem hai chỗ đó, và nếu có gì hỏng thì biết ngay do thay đổi nào (ý 2)."
        ] },
      { k: "D", gist: "Fix the two concerns and also rework unrelated sections so the voice stays consistent across the prototype after the edits.",
        why: [
          "Sửa cả phần không liên quan, tức phần đã được chấp nhận (ý 4). Nội dung đã duyệt có thể đổi nghĩa khi bị viết lại cho “đều giọng”.",
          "Giọng lệch ở chỗ vừa sửa thì chỉnh chỗ vừa sửa cho khớp phần còn lại. Không làm ngược lại."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, vòng plan → verify → judge → refine và mục “Sửa: mỗi lần một chỗ, phản hồi phải cụ thể”", href: NOTES + "#l-4-3" },
      { label: "Bài 7.1, mục “Vì sao chỉ đổi một thứ, và chạy lại cùng input”: ghi lại mỗi vòng đổi gì", href: NOTES + "#l-7-1" }
    ]
  },
  {
    de: 2, n: 26, total: 141, sub: "1.2", subName: "Chia việc lớn thành chuỗi bước",
    answer: "B",
    ask: "A senior analyst is using Claude to analyse requirements drawn from several stakeholder sources. What is the right order? <br>(1) Group related requirements and flag conflicts or ambiguities for stakeholder review.<br>(2) Check the structured output against the original sources for accuracy and completeness.<br>(3) Give Claude the consolidated inputs with a structured extraction prompt.<br>(4) Collect and label the source materials so every requirement can be traced.<br>(5) Record the final requirement set with source traceability and status.",
    scene: [
      "Một chuyên viên phân tích dùng Claude phân tích yêu cầu từ nhiều nguồn stakeholder. Năm bước, phải xếp thứ tự.",
      "Phần dễ: trong cả bốn dãy, kiểm với nguồn (2) đứng thứ tư và ghi bản cuối (5) đứng cuối. Chỗ khó còn lại: gom nhóm, đánh dấu xung đột (1) đi trước hay sau bước đưa Claude trích (3).",
      "Trước bước trích, yêu cầu còn nằm rải trong biên bản, email, ghi chú của từng người. Sau bước trích mới có một danh sách yêu cầu từng mục."
    ],
    asks: [
      "Thứ tự nào đúng?",
      "Tức là: bước nào cần output của bước nào, và đặt điểm kiểm ở đâu.",
      "Soi từng dãy: có bước nào làm việc trên thứ chưa tồn tại không."
    ],
    facts: [
      "Phần phụ thuộc cần kết quả của phần trước nên phải làm sau. Output trung gian (danh sách trích ra, bảng số liệu) là chỗ kiểm trước khi đi tiếp.",
      "Trích (extraction) là bước biến tài liệu thô thành danh sách yêu cầu từng mục. Gom nhóm và tìm xung đột làm trên danh sách đó.",
      "Khi soát yêu cầu, Claude gắn nhãn, phân loại, chỉ chỗ mơ hồ hay mâu thuẫn. Người cùng stakeholder trả lời và chốt.",
      "Lỗi ở bước đầu chảy xuống mọi bước sau. Mỗi tài liệu đưa vào nên là một khối có tên, ghi rõ nguồn, thì về sau mới kiểm và truy ngược được."
    ],
    opts: [
      { k: "A", gist: "4, 1, 3, 2, 5",
        why: [
          "Làm (1) trước (3): gom nhóm, đánh dấu xung đột khi yêu cầu chưa được trích ra thành từng mục (ý 1, 2). Muốn làm được thì phải tự đọc tay mọi nguồn, tức là làm luôn việc trích thay Claude.",
          "Bước (3) sau đó thành thừa, hoặc ra một danh sách khác với danh sách đã gom tay. Xung đột chỉ lộ ra trong output của Claude thì không được đánh dấu cho stakeholder.",
          "Dễ bị cuốn vì “sắp xếp input trước khi đưa Claude” nghe như chuẩn bị đầu vào kỹ. Nhưng phần chuẩn bị đầu vào là (4). Còn (1) làm việc trên các yêu cầu, mà yêu cầu chỉ có sau (3)."
        ] },
      { k: "B", gist: "4, 3, 1, 2, 5",
        why: [
          "Đúng chiều phụ thuộc: có nguồn đã gắn nhãn (4) → Claude trích thành danh sách (3) → gom nhóm, đánh dấu xung đột trên danh sách đó (1) (ý 1, 2).",
          "Rồi kiểm bản đã trích và đã gom với nguồn gốc (2) trước khi ghi bản cuối (5). Nhãn nguồn từ (4) là thứ cho phép kiểm và truy ngược (ý 4).",
          "Chia vai đúng: Claude trích và gom, xung đột được đánh dấu để stakeholder gỡ (ý 3)."
        ] },
      { k: "C", gist: "1, 4, 3, 2, 5",
        why: [
          "Làm (1) trước cả (4): gom nhóm yêu cầu khi còn chưa gom nguồn. Không có gì để gom (ý 1).",
          "Nhóm lập kiểu này không truy được về nguồn nào, vì nhãn nguồn chỉ có ở bước (4) (ý 4)."
        ] },
      { k: "D", gist: "3, 4, 1, 2, 5",
        why: [
          "Làm (3) trước (4): đưa Claude “consolidated inputs” (đầu vào đã gom) khi chưa gom, chưa gắn nhãn nguồn. Bước (3) đòi đúng thứ mà (4) làm ra (ý 1).",
          "Yêu cầu trích ra không mang nhãn nguồn, nên bước (2) khó đối chiếu và bản cuối (5) không truy được (ý 4)."
        ] }
    ],
    dispute: "Examtopics chấm B, cộng đồng chia B 65% / A 35%. A đặt bước gom nhóm, đánh dấu xung đột (1) trước bước đưa Claude trích (3). Lúc đó chưa có danh sách yêu cầu nào để gom, nên hoặc phải làm tay thay bước trích, hoặc gom trên tài liệu thô. Xung đột phải tìm trên danh sách đã trích. Giữ B.",
    refs: [
      { label: "Bài 1.2, mục “Một chuỗi trong chat, từng bước” và “Đặt điểm kiểm ở đâu”: bước phụ thuộc làm sau, kiểm output trung gian", href: NOTES + "#l-1-2" },
      { label: "Bài 4.1, mục “Dùng Claude soát yêu cầu khi còn là bản nháp”: Claude gắn nhãn, chỉ chỗ mâu thuẫn; người chốt", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 2, n: 27, total: 141, sub: "1.2", subName: "Chia việc lớn thành chuỗi bước",
    answer: "B",
    ask: "You are deciding whether to break a “redesign new-hire onboarding” request into parts before prompting Claude. Which feature of the request points most strongly to decomposition helping?",
    scene: [
      "Yêu cầu: “redesign new-hire onboarding” (thiết kế lại quy trình đón nhân viên mới). Mày phải quyết có chia nhỏ trước khi prompt không.",
      "Bốn phương án là bốn đặc điểm của yêu cầu. Ba cái là dấu hiệu nên giữ một prompt, chỉ một cái là dấu hiệu nên chia.",
      "Chỗ khó: “redesign” nghe lớn, nhưng đề không hỏi việc lớn hay nhỏ. Đề hỏi đặc điểm nào cho thấy chia sẽ có ích."
    ],
    asks: [
      "Đặc điểm nào cho thấy rõ nhất là chia việc sẽ giúp?",
      "Tức là: nhận ra dấu hiệu “nên chia” trong bảng nên chia / giữ một prompt."
    ],
    facts: [
      "Nên chia khi một prompt phải lo nhiều thứ cạnh tranh nhau, hoặc cần kiểm một kết quả giữa chừng trước khi đi tiếp. Giữ một prompt khi việc đơn giản, một output, đã chạy tốt.",
      "Chia cũng có giá: thêm lượt chat, thêm thời gian, thêm hạn mức. Chia ở chỗ cần kiểm, không chia theo thói quen.",
      "Yêu cầu trộn nhiều loại việc thì tách ở chỗ loại việc thay đổi, và kiểm output ở chỗ nối.",
      "Sơ đồ quy trình (process map) là danh sách các bước của một quy trình: ai làm, mất bao lâu, chờ ở đâu, chuyển cho ai."
    ],
    opts: [
      { k: "A", gist: "The request is for one structured document that can come from a single set of inputs in one prompt.",
        why: [
          "Một output, một bộ đầu vào, một prompt: đúng ca giữ một prompt (ý 1). Chia ra chỉ thêm lượt, thêm hạn mức (ý 2).",
          "Dễ bị cuốn vì “structured document” (tài liệu có cấu trúc) nghe như việc to. Nhưng to mà chỉ một output thì vẫn là một việc."
        ] },
      { k: "B", gist: "The request calls for several distinct outputs: a process map, supporting materials, and a measurement plan.",
        why: [
          "Đúng. Ba output khác loại, mỗi cái một tiêu chí xong riêng: sơ đồ quy trình, tài liệu hỗ trợ, kế hoạch đo (ý 1, 3).",
          "Tài liệu hỗ trợ và kế hoạch đo thường dựa vào quy trình mới. Sơ đồ quy trình là output trung gian nên kiểm trước khi làm hai cái kia (ý 1, 4)."
        ] },
      { k: "C", gist: "The request has one clearly defined output, a clear input, and a familiar format.",
        why: [
          "Ca giữ một prompt rõ nhất: một output, đầu vào rõ, định dạng quen (ý 1).",
          "Chia ra không thêm chỗ kiểm nào có ích, chỉ thêm lượt chat (ý 2)."
        ] },
      { k: "D", gist: "The content is something you have produced many times and know works in one well-structured prompt.",
        why: [
          "Việc đã chạy tốt trong một prompt là dấu hiệu giữ nguyên, không phải dấu hiệu chia (ý 1).",
          "Quen tay cũng không phải lý do để chia. Lý do chia là cần kiểm giữa chừng (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, bảng “Khi nào nên chia, khi nào giữ một prompt”", href: NOTES + "#l-1-2" },
      { label: "Bài 1.4, mục “Yêu cầu trộn nhiều loại việc”: tách ở chỗ loại việc thay đổi", href: NOTES + "#l-1-4" }
    ]
  },
  {
    de: 2, n: 28, total: 141, sub: "1.2", subName: "Chia việc lớn thành chuỗi bước",
    answer: "A",
    ask: "You are a procurement associate breaking a vendor-evaluation task into steps. Which ordering of the dependencies is sound?",
    scene: [
      "Một chuyên viên mua hàng chia việc đánh giá nhà cung cấp thành từng bước. Đề hỏi thứ tự đúng theo phụ thuộc giữa các bước.",
      "Các phương án xoay quanh ba bước: đặt tiêu chí, gom dữ liệu, chấm và xếp hạng. Ba phương án sai đảo thứ tự hoặc bỏ hẳn bước.",
      "Câu này dễ. Cái đáng giữ lại là vì sao tiêu chí phải đi trước, kể cả khi người ta muốn “xem dữ liệu rồi tính”."
    ],
    asks: [
      "Thứ tự phụ thuộc nào hợp lý?",
      "Tức là: bước nào cần output của bước nào, xếp sao cho mỗi bước có đủ đầu vào."
    ],
    facts: [
      "Phần phụ thuộc cần kết quả của phần trước nên phải làm sau, và nhận output đã kiểm của phần trước.",
      "Đặt tiêu chí trước khi bảo Claude xếp hạng. Không có tiêu chí thì Claude tự nghĩ ra thước đo, mỗi lần chạy có thể một thước khác.",
      "Tiêu chí viết sau khi thấy kết quả thường chỉ mô tả lại cái vừa nhận.",
      "Claude không có dữ liệu nội bộ của mày. Không được đưa dữ liệu thì nó lấp chỗ trống bằng thứ nghe hợp lý."
    ],
    opts: [
      { k: "A", gist: "Set the evaluation criteria first, collect vendor data against them, then score and rank.",
        why: [
          "Đúng chiều phụ thuộc: tiêu chí quyết cần gom dữ liệu gì, dữ liệu là đầu vào để chấm, điểm là đầu vào để xếp (ý 1).",
          "Tiêu chí có trước nên mọi nhà cung cấp được chấm trên cùng một thước, và thước đó không bị kéo theo kết quả (ý 2, 3)."
        ] },
      { k: "B", gist: "Rank the vendors before any data has been gathered.",
        why: [
          "Xếp hạng khi chưa có dữ liệu thì không có căn cứ nào. Bước sau chạy trước bước nó phụ thuộc (ý 1).",
          "Nhờ Claude làm việc này thì nó xếp theo thứ nghe hợp lý, không theo dữ liệu thật của các nhà cung cấp (ý 4)."
        ] },
      { k: "C", gist: "Score the vendors first and settle the criteria afterwards.",
        why: [
          "Chấm khi chưa có tiêu chí thì chấm theo thước tự nghĩ (ý 2). Tiêu chí đặt sau sẽ tự khớp với điểm đã có (ý 3).",
          "Dễ bị cuốn vì “xem trước rồi mới chọn tiêu chí” nghe linh hoạt. Nhưng lúc đó tiêu chí chỉ hợp thức hóa kết quả, không còn dùng để quyết."
        ] },
      { k: "D", gist: "Skip the criteria and ask Claude for a vendor recommendation with no inputs at all.",
        why: [
          "Không tiêu chí, không dữ liệu: Claude không có gì để dựa, chỉ ra được đề xuất chung chung hoặc bịa (ý 4).",
          "Bỏ luôn cả hai bước mà bước đề xuất phụ thuộc vào (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, mục “Một chuỗi trong chat, từng bước”: phần phụ thuộc làm sau, nhận output đã kiểm", href: NOTES + "#l-1-2" },
      { label: "Bài 4.2, mục “Đặt tiêu chí trước khi bảo Claude xếp hạng”", href: NOTES + "#l-4-2" }
    ]
  },
  {
    de: 2, n: 29, total: 141, sub: "1.4", subName: "Đổi cách prompt theo loại việc",
    answer: "BE",
    ask: "As a marketing manager, you are using Claude to come up with campaign concepts, and the framing has to be done before any concepts are generated. Which two framing steps must be finished BEFORE you ask Claude for concepts? (Select two.)",
    scene: [
      "Một quản lý marketing nhờ Claude nghĩ concept cho chiến dịch. Đề nói rõ: phần khung (framing) phải xong trước khi bảo Claude đưa concept.",
      "Năm phương án là năm việc trong vòng đời chiến dịch. Có việc đi trước bước nghĩ ý, có việc đi sau, có việc thuộc khâu triển khai.",
      "Chỗ khó: chữ “BEFORE” (trước). Một việc đúng của chiến dịch mà nằm sau bước nghĩ ý thì vẫn sai."
    ],
    asks: [
      "Hai bước khung nào phải xong trước khi bảo Claude nghĩ concept?",
      "Tức là: Claude cần biết gì để nghĩ concept đúng hướng, còn việc nào chỉ làm được khi đã có concept.",
      "Soi từng phương án: nó là đầu vào cho bước nghĩ ý, hay là việc làm trên output của bước đó?"
    ],
    facts: [
      "Brainstorm cần ràng buộc khoanh vùng: ngân sách, người dùng, thời hạn. Ràng buộc chỉ khoanh vùng cho ý, không loại ý nào.",
      "Chấm và chọn ý là bước riêng, sau khi đã có ý. Đòi chấm ngay lúc nghĩ là tự cắt mất độ rộng.",
      "Prompt tốt nói rõ người đọc và mục tiêu: ai đọc, đọc xong họ phải làm được gì. Không viết ra thì Claude không biết.",
      "Giọng (voice) là cách một tổ chức viết: chọn chữ, độ dài câu, mức trang trọng."
    ],
    opts: [
      { k: "A", gist: "Pick a finalist concept and get it ready for stakeholder sign-off.",
        why: [
          "Chọn concept cuối là việc làm trên output của bước nghĩ ý (ý 2). Chưa có concept thì chưa có gì để chọn.",
          "Nó nằm cuối chuỗi, sau cả bước chấm, không phải phần khung."
        ] },
      { k: "B", gist: "Define the campaign's goal and the metrics that will show whether it succeeded.",
        why: [
          "Đúng. Mục tiêu và chỉ số thành công cho Claude biết concept phải đạt điều gì (ý 3).",
          "Nó cũng là tiêu chí cho bước chấm sau đó (ý 2). Có trước thì mọi concept được chấm trên cùng một thước."
        ] },
      { k: "C", gist: "Go through the concepts Claude produced and choose the two strongest to develop further.",
        why: [
          "Đây là bước chấm, nằm sau bước nghĩ ý (ý 2). Đề hỏi việc phải xong “BEFORE” (trước) bước đó.",
          "Dễ bị cuốn vì chấm ý là một bước thật và đúng của brainstorm. Nhưng đúng mà sai chỗ: lúc này chưa có concept nào để xem."
        ] },
      { k: "D", gist: "Lock in the launch and rollout dates with the agency.",
        why: [
          "Chốt lịch với agency là việc triển khai, cần đã có concept được duyệt. Nó không cho Claude biết concept phải nói gì, với ai.",
          "Thời hạn có thể là một ràng buộc nêu trong prompt (ý 1). Nhưng phương án là việc chốt lịch với đối tác, không phải bước khung cho concept."
        ] },
      { k: "E", gist: "Define the brand voice and the audience the concepts are meant to reach.",
        why: [
          "Đúng. Người đọc là ràng buộc khoanh vùng cho ý (ý 1, 3). Giọng thương hiệu cho concept nói theo đúng cách của tổ chức (ý 4).",
          "B và E cùng là đầu vào của bước nghĩ ý: B nói concept phải đạt gì, E nói concept nói với ai, bằng giọng nào."
        ] }
    ],
    refs: [
      { label: "Bài 1.4, mục “Brainstorm: đòi độ rộng, chấm ở bước sau” và bảng bốn loại việc", href: NOTES + "#l-1-4" },
      { label: "Bài 1.1, mục “Viết ra những gì đang nằm trong đầu bạn”: người đọc và mục tiêu", href: NOTES + "#l-1-1" }
    ]
  },
  {
    de: 2, n: 30, total: 141, sub: "2.4", subName: "Khi nào cần người duyệt",
    answer: "C",
    ask: "A knowledge worker has to decide whether a Claude-generated output should be escalated. What is the right order of the decision steps? <br>(1) Work out who will receive the output and what happens if it is wrong.<br>(2) Record the decision and the reasoning behind it so it can be traced later.<br>(3) Check the output's risk profile against the organization's escalation criteria.<br>(4) Decide whether to use it, iterate on it further, or escalate it.<br>(5) Assess the output for accuracy, completeness and any claims that have not been verified.",
    scene: [
      "Một nhân viên văn phòng có một output do Claude soạn, phải quyết: dùng luôn, làm thêm vòng nữa, hay chuyển lên người có thẩm quyền.",
      "Đề cho năm bước. Bốn phương án đều kết thúc bằng 4 rồi 2: quyết rồi ghi lại. Chỗ khác nhau là thứ tự của 1, 5, 3 ở đầu.",
      "Chỗ khó là (1) và (5): xác định người nhận và hậu quả trước, hay kiểm nội dung trước. Cộng đồng examtopics cũng chia ở đúng chỗ này."
    ],
    asks: [
      "Thứ tự đúng của các bước quyết định là gì?",
      "Tức là: bước nào cần kết quả của bước nào. So với tiêu chí chuyển lên (3) cần biết cả mức hệ trọng (1) lẫn tình trạng của output (5).",
      "Soi từng phương án: lúc so với tiêu chí ở (3) đã có đủ thông tin chưa, và lúc kiểm ở (5) đã biết cần kiểm sâu tới đâu chưa."
    ],
    facts: [
      "Mức duyệt tùy tín hiệu: mức hệ trọng (sai thì thiệt tới đâu), người nhận (nội bộ hay ra ngoài, có làm theo mà không hỏi lại không), rút lại được không. Tín hiệu càng nặng thì càng phải kiểm kỹ và càng cần người có chuyên môn.",
      "Kiểm theo rủi ro (verification triage): không đủ thời gian kiểm mọi câu, nên kiểm trước câu vừa dễ sai vừa sai thì thiệt nhiều. Muốn biết câu nào thiệt nhiều thì phải biết output tới tay ai, dùng vào việc gì.",
      "Hồ sơ rủi ro (risk profile) của một output gồm hai phần: sai thì hậu quả tới đâu, và output này đáng tin tới đâu (đúng, đủ, còn khẳng định nào chưa kiểm). Phải có cả hai mới so được với tiêu chí chuyển lên.",
      "Escalate (chuyển lên) là đưa việc vượt tầm cho người có chuyên môn hay thẩm quyền. Quyết xong thì ghi lại quyết định và lý do, để sau này lần lại được."
    ],
    opts: [
      { k: "A", gist: "5, 1, 3, 4, 2",
        why: [
          "Kiểm output (5) trước khi biết người nhận và hậu quả (1). Lúc kiểm chưa biết cần kiểm sâu tới đâu, câu nào phải soi trước (ý 1, 2).",
          "Hậu quả: hoặc kiểm nông rồi lọt lỗi ở chỗ hệ trọng, hoặc kiểm kỹ mọi thứ kể cả output nhẹ. Ba bước sau (3, 4, 2) thì đúng chỗ.",
          "Dễ bị cuốn vì “đọc output trước đã” nghe tự nhiên. Nhưng mức hệ trọng quyết định cách kiểm, nên phải có trước."
        ] },
      { k: "B", gist: "3, 1, 5, 4, 2",
        why: [
          "So với tiêu chí chuyển lên (3) ngay bước đầu, khi chưa biết output đi đâu, sai thì sao (1), cũng chưa kiểm nó đúng sai thế nào (5) (ý 3).",
          "Chưa có gì để so, nên bước so chỉ còn là hình thức."
        ] },
      { k: "C", gist: "1, 5, 3, 4, 2",
        why: [
          "Đúng. Xác định người nhận và hậu quả nếu sai (1) trước, để biết cần kiểm sâu tới đâu, soi câu nào trước (ý 1, 2).",
          "Rồi kiểm độ đúng, độ đủ, khẳng định chưa kiểm (5). Lúc này có đủ hai phần của hồ sơ rủi ro để so với tiêu chí chuyển lên (3) (ý 3).",
          "Cuối cùng quyết dùng, làm thêm hay chuyển lên (4), rồi ghi lại quyết định và lý do (2) (ý 4)."
        ] },
      { k: "D", gist: "1, 3, 5, 4, 2",
        why: [
          "So với tiêu chí (3) trước khi kiểm output (5). Hồ sơ rủi ro mới có phần hậu quả, chưa có phần output đáng tin tới đâu (ý 3).",
          "Kết quả kiểm ở (5) tới sau, mà phép so đã làm xong rồi, nên quyết định (4) không dựa trên đủ thông tin."
        ] }
    ],
    dispute: "Examtopics chấm C, cộng đồng chia C 65%, A 35%. A chỉ đảo (1) và (5). C hơn vì người nhận và mức hệ trọng quyết định cần kiểm sâu tới đâu, câu nào kiểm trước (kiểm theo rủi ro, bài 2.1 và 2.4). Chưa biết output đi đâu thì không biết kiểm tới mức nào là đủ.",
    refs: [
      { label: "Bài 2.4, bảng tín hiệu nâng mức duyệt: hệ trọng, người nhận, rút lại được không", href: NOTES + "#l-2-4" },
      { label: "Bài 2.1, mục “Kiểm theo rủi ro: chỗ nào trước”: câu dễ sai và sai thì thiệt nhiều thì kiểm trước", href: NOTES + "#l-2-1" },
      { label: "Bài 0.2, khái niệm “Escalate (chuyển lên)”", href: NOTES + "#l-0-2" }
    ]
  }
);
