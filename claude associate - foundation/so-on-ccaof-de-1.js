// Sổ ôn CCAO-F, Đề 1. Trang so-on-ccaof.html nạp file này trước script render.
// Nguồn: quiz certsafari CCAO-F 60 câu, phân bổ theo trọng số domain của guide, làm ngày 14/11/2026.
// Mỗi câu một phần tử, xếp theo n. Các trường:
//   de, n, total        số đề trong sổ; số thứ tự câu trong đề gốc; tổng số câu của đề gốc
//   sub, subName        task statement của guide (vd "2.4") và tên bài bằng tiếng Việt
//   answer              đáp án đúng, đã kiểm bằng notes CCAO-F hoặc docs chính thức
//   dispute             (tùy chọn) ghi chú khi đáp án đề gốc khác answer, hoặc đề mơ hồ
//   ask, opts[].gist    tiếng Anh, viết lại bằng lời riêng (không chép nguyên văn)
//   scene, asks, facts  phân tích đề: đề kể gì, đề hỏi gì, cần biết trước (tiếng Việt)
//   opts[].why          vì sao phương án đúng hay sai, dạng mảng gạch đầu dòng (tiếng Việt)
//   refs[]              { label, href: NOTES + "#<id có trong notes>" }
DE[1] = "Certsafari · 60 câu · 14/11/2026";
ENTRIES.push(
  {
    de: 1, n: 1, total: 60, sub: "1.2", subName: "Chia việc lớn thành chuỗi bước",
    answer: "D",
    ask: "A policy officer has to work through a 180-page regulatory guidance document, which is too long to handle well in a single request. How should she split it up?",
    scene: [
      "Một chuyên viên chính sách phải xử lý một văn bản hướng dẫn quy định dài 180 trang. Đưa cả văn bản trong một yêu cầu thì không làm tốt được.",
      "Chia là chắc chắn. Chỗ khó là chia theo cái gì: theo số trang, chỉ lấy đầu và cuối, cắt càng nhỏ càng tốt, hay theo cấu trúc của chính văn bản.",
      "Văn bản quy định hay đặt định nghĩa, phạm vi ở một chỗ, còn quy định dùng chúng ở chỗ khác. Ví dụ minh họa:<pre><code>Trang 29: “Cơ sở nhỏ” là cơ sở dưới 50 nhân viên.\nTrang 31: Cơ sở nhỏ được miễn báo cáo quý.</code></pre>Cắt ở trang 30 thì phần sau có quy định mà không có định nghĩa."
    ],
    asks: [
      "Nên chia văn bản 180 trang này thế nào?",
      "Tức là: chọn đường cắt sao cho mỗi phần tự đứng được, đọc riêng vẫn hiểu đúng, và không phần nào của văn bản bị bỏ.",
      "Soi từng phương án: đường cắt có cắt ngang một chủ đề không, có bỏ phần nào chưa đọc không, số phần có hợp lý không."
    ],
    facts: [
      "Chia việc (task decomposition) là tách việc lớn thành các phần. Phần độc lập thì làm riêng được rồi gộp lại. Các phần dính chặt vào nhau mà bị tách thì phần nào cũng thiếu thông tin.",
      "Đầu vào lớn mà tự chia nhóm được (báo cáo theo khu vực, ý kiến theo chủ đề) là ca nên chia. Tài liệu quá dài thì đưa theo từng phần, hoặc chỉ đưa những đoạn việc đó cần.",
      "Phần bị thiếu không để lại câu nào kỳ lạ trong output. Đọc lướt bắt được chỗ sai, không bắt được chỗ thiếu.",
      "Chia cũng có giá: thêm lượt chat, thêm thời gian, thêm hạn mức. Chia ở chỗ cần, không chia cho thật nhiều."
    ],
    opts: [
      { k: "A", gist: "Cut it into equal 30-page blocks, so every part of the work is the same size and easy to plan around.",
        why: [
          "Sai ở đường cắt: trang 30, 60, 90 không trùng chỗ một chủ đề kết thúc. Khối nào cũng có thể nhận một quy định mà định nghĩa hay phạm vi của nó nằm ở khối trước (ý 1).",
          "Khối đó tóm tắt riêng sẽ hiểu sai quy định, mà output vẫn đọc rất trôi.",
          "Dễ bị cuốn vì khối đều nhau nghe gọn, dễ chia việc. Nhưng đề cần mỗi phần hiểu đúng, không cần mỗi phần bằng nhau."
        ] },
      { k: "B", gist: "Take only the first fifty and the last fifty pages, on the assumption that the middle is mostly detail.",
        why: [
          "Sai ở giả định: quyết rằng phần giữa không quan trọng khi chưa đọc nó. 80 trang bị bỏ hẳn.",
          "Phần thân văn bản hướng dẫn thường là chỗ chứa quy định chi tiết. Phần thiếu không để lại dấu vết trong output, nên chị sẽ không biết mình đã sót gì (ý 3)."
        ] },
      { k: "C", gist: "Cut it into as many small pieces as possible, so each request stays short and every piece is handled thoroughly.",
        why: [
          "Sai ở chỗ coi càng nhỏ càng tốt. Mảnh càng nhỏ càng dễ tách một quy định khỏi điều kiện đi kèm nó (ý 1).",
          "Số mảnh tăng thì số lần gộp, số lượt chat, hạn mức cũng tăng (ý 4), mà không thêm chỗ kiểm nào có ích."
        ] },
      { k: "D", gist: "Split it along the document's own chapters, so each part covers one complete topic and makes sense on its own.",
        why: [
          "Chương là ranh giới chủ đề do chính người soạn văn bản đặt. Mỗi phần là một chủ đề trọn vẹn, mang theo định nghĩa của nó, đọc riêng vẫn hiểu (ý 1, 2).",
          "Không trang nào bị bỏ (ý 3), và số phần theo đúng cấu trúc văn bản, không cắt thừa (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, bảng “Khi nào nên chia, khi nào giữ một prompt”: phần độc lập tách được, phần dính chặt tách ra thì thiếu thông tin", href: NOTES + "#l-1-2" },
      { label: "Bài 2.1, mục “Đo độ đủ”: phần bị thiếu không để lại dấu vết, đọc lướt không bắt được", href: NOTES + "#l-2-1" },
      { label: "Bài 3.4: tài liệu vượt giới hạn độ dài thì đưa theo từng phần hoặc chỉ đoạn cần", href: NOTES + "#l-3-4" }
    ]
  },
  {
    de: 1, n: 2, total: 60, sub: "1.2", subName: "Chia việc lớn thành chuỗi bước",
    answer: "A",
    ask: "An analyst splits a market review into six stages and passes each stage's output straight into the next one, reviewing nothing until the final report is written. What is the biggest risk?",
    scene: [
      "Một chuyên viên phân tích chia bản đánh giá thị trường thành sáu bước. Output bước trước đưa thẳng vào bước sau.",
      "Chỗ khó: “reviewing nothing until the final report is written” (không duyệt gì cho tới khi báo cáo cuối viết xong).",
      "Chia bước thì đúng hướng. Cái thiếu là điểm kiểm giữa chừng."
    ],
    asks: [
      "Rủi ro lớn nhất của cách làm này là gì?",
      "Tức là: khi các bước nối nhau mà không kiểm giữa chừng, thứ gì hỏng nặng nhất?",
      "Soi từng phương án: nó là rủi ro về chuyện kết luận đúng hay sai, hay chỉ là chi phí và hình thức?"
    ],
    facts: [
      "Nối chuỗi prompt (prompt chaining): chạy các bước theo thứ tự, output <b>đã kiểm</b> của bước trước làm đầu vào bước sau.",
      "Lỗi ở bước đầu chảy xuống mọi bước sau. Chỉ kiểm ở cuối thì phải lần ngược qua cả chuỗi.",
      "Điểm kiểm đặt ở output mà nhiều bước sau dựa vào và khó sửa về sau: bảng số liệu trích ra, dàn ý, bản nháp đầu.",
      "Độ dài và câu chữ là chuyện hình thức: dặn độ dài hay rà lại một lượt là sửa được. Chúng không quyết định kết luận đúng hay sai."
    ],
    opts: [
      { k: "A", gist: "A mistake in an early stage is carried into every later stage, and the final report ends up built on it.",
        why: [
          "Đúng cơ chế của chuỗi không kiểm: bước nào cũng coi output bước trước là đã đúng. Một con số đọc sai ở bước 2 được bước 3, 4, 5, 6 dùng tiếp (ý 1, 2).",
          "Tới báo cáo cuối, lỗi đã thấm vào mọi kết luận, và phải lần ngược cả sáu bước mới tìm ra gốc.",
          "Cách chặn: kiểm ở output mà các bước sau dựa vào (ý 3), không đợi tới cuối."
        ] },
      { k: "B", gist: "The six stages will take longer in total than asking for the whole review in one request.",
        why: [
          "Đúng là chia bước tốn thêm lượt và thời gian. Nhưng đó là cái giá biết trước của cách làm, không phải rủi ro.",
          "Đề hỏi “biggest risk” (rủi ro lớn nhất). Chậm hơn vài lượt nhẹ hơn nhiều so với một báo cáo sai được đem ra dùng.",
          "Dễ bị cuốn vì chia việc đúng là thêm lượt, thêm thời gian, thêm hạn mức. Nhưng đó là lý do để đừng chia việc đơn giản, không phải chỗ hỏng của chuỗi này."
        ] },
      { k: "C", gist: "Later stages will repeat wording from earlier ones, so the finished report reads somewhat repetitive.",
        why: [
          "Lặp chữ là chuyện hình thức, rà lại một lượt là xong (ý 4).",
          "Nó không đụng tới câu hỏi kết luận có đúng không."
        ] },
      { k: "D", gist: "The final report will be longer than the audience wants, because every stage adds its own material.",
        why: [
          "Độ dài chỉnh được bằng một lời dặn độ dài, định dạng (ý 4).",
          "Báo cáo dài mà đúng vẫn dùng được. Báo cáo sai mới là rủi ro thật."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, mục “Đặt điểm kiểm ở đâu”: lỗi bước đầu chảy xuống mọi bước sau, kiểm ở output mà các bước sau dựa vào", href: NOTES + "#l-1-2" },
      { label: "Bài 0.3, luật 3: sửa hình thức không sửa được nội dung", href: NOTES + "#l-0-3" }
    ]
  },
  {
    de: 1, n: 3, total: 60, sub: "5.2", subName: "File tải lên và connector",
    answer: "A",
    ask: "A team member worries that connecting Google Drive to Claude will let colleagues read files they are not allowed to open. Which statement is accurate?",
    scene: [
      "Nhóm định nối Google Drive vào Claude qua connector (kết nối Claude với một ứng dụng khác).",
      "Một thành viên lo: nối xong thì đồng nghiệp đọc được cả những file họ vốn không được mở.",
      "Chỗ khó: bốn phương án tả bốn cơ chế quyền khác nhau. Phải biết connector đọc dữ liệu theo quyền của ai."
    ],
    asks: [
      "Câu nào mô tả đúng?",
      "Tức là: connector có làm ai thấy thêm file nào so với quyền họ đang có trên Drive không?"
    ],
    facts: [
      "Connector cho Claude vào một ứng dụng khác để tìm, đọc, làm việc thay bạn. Claude kế thừa đúng quyền của tài khoản bạn ở ứng dụng đó.",
      "Mỗi người tự đăng nhập tài khoản của mình. Owner bật connector cho tổ chức (Team, Enterprise) chỉ làm nó có sẵn để dùng, chưa cấp quyền vào dữ liệu của ai.",
      "Quyền ở dịch vụ gốc là trần. File bạn không mở được trên Google, Claude cũng không mở được, dù công cụ đặt Always allow (luôn cho).",
      "Connector lấy dữ liệu đúng lúc hỏi. Dữ liệu lấy về được lưu cùng chat đã dùng nó, xóa chat thì xóa theo."
    ],
    opts: [
      { k: "A", gist: "A connector follows each person's existing permissions, so files someone cannot open in Drive stay out of their reach.",
        why: [
          "Đúng cơ chế: Claude đọc Drive bằng tài khoản của chính người đang hỏi (ý 1, 2).",
          "Quyền trên Drive là trần (ý 3). Đồng nghiệp không mở được file nào trên Drive thì qua Claude cũng không mở được. Nỗi lo kia không xảy ra."
        ] },
      { k: "B", gist: "A connector gives everyone in the workspace one shared view, so Drive file permissions no longer apply inside Claude.",
        why: [
          "Sai ở giả định: connector không gộp quyền của mọi người thành một. Mỗi người đăng nhập tài khoản riêng, Claude chỉ thấy theo tài khoản đó (ý 2).",
          "Quyền gốc vẫn là trần, không bị ghi đè (ý 3).",
          "Dễ bị cuốn vì Owner bật connector cho cả tổ chức, nghe như cả tổ chức nhìn chung một kho. Nhưng bật chỉ làm connector có sẵn, không cấp quyền gì."
        ] },
      { k: "C", gist: "A connector copies the files into a shared store, so anyone in the organisation can search them later.",
        why: [
          "Sai ở cơ chế: connector không chép file ra kho chung. Nó lấy dữ liệu lúc hỏi, và phần lấy về nằm trong đúng chat đã dùng nó (ý 4).",
          "Có thể nhầm với file tải lên, vốn là bản chụp tại lúc tải. Connector thì khác: đọc theo quyền của người hỏi, đúng lúc hỏi."
        ] },
      { k: "D", gist: "A connector requires every file to be made public in Drive before Claude can read any of them.",
        why: [
          "Sai: connector đọc bằng tài khoản đã đăng nhập, nên đọc được đúng những file tài khoản đó vốn mở được (ý 1). Không cần đổi cách chia sẻ file nào.",
          "Bắt mọi file thành công khai còn mở rộng quyền ra ngoài, ngược hẳn với nỗi lo trong đề."
        ] }
    ],
    refs: [
      { label: "Bài 5.2, mục “Ai bật, ai được thấy: bốn lớp quyền”: Owner bật, từng người đăng nhập, quyền gốc là trần", href: NOTES + "#l-5-2" },
      { label: "Help center “Use connectors”: Claude kế thừa quyền của từng người ở dịch vụ đã nối", href: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities" }
    ]
  },
  {
    de: 1, n: 4, total: 60, sub: "6.4", subName: "Đạo đức khi dùng AI",
    answer: "A",
    ask: "A council service team intends to use a priority list produced by Claude to decide which residents get home-adaptation grants first. Claude built the list from the council's historical case records. What should the team do first?",
    scene: [
      "Một nhóm dịch vụ của chính quyền địa phương định dùng danh sách ưu tiên do Claude làm, để quyết cư dân nào được nhận trợ cấp cải tạo nhà trước.",
      "Danh sách dựng từ hồ sơ các ca cũ của chính quyền.",
      "Chỗ khó: output này quyết chuyện của người thật. Hồ sơ cũ chỉ có những ai đã từng nộp đơn. Nhóm nào trước đây ít nộp thì cũng ít xuất hiện trong dữ liệu."
    ],
    asks: [
      "Nhóm nên làm gì “first” (trước tiên)?",
      "Tức là: trước khi danh sách được dùng để chia trợ cấp cho người, phải chặn rủi ro nào?",
      "Soi từng phương án: nó có kiểm được độ lệch của dữ liệu trước khi quyết định xảy ra không?"
    ],
    facts: [
      "Bias (thiên lệch) là một độ lệch lặp lại theo một hướng. Một dạng là thiếu góc nhìn: mọi câu đều đúng, nhưng nhóm bị ảnh hưởng không xuất hiện. Kiểm từng câu không bắt được, phải hỏi “ai đang vắng mặt?”.",
      "Claude chỉ biết những gì có trong context. Danh sách dựng từ hồ sơ cũ chỉ phản ánh những người đã có hồ sơ.",
      "Khi output xếp hạng hay quyết định về người, phần đạo đức là hỏi trước: nó ảnh hưởng tới ai, nhóm nào bị thiệt nếu nó nghiêng. Coi nó là một nguồn tham khảo, xem có khuôn mẫu theo nhóm không, và để người quyết.",
      "Độ tự tin hay điểm Claude tự chấm không phải bằng chứng. Kiểm thật là so với nguồn ngoài Claude."
    ],
    opts: [
      { k: "A", gist: "Check whether the historical records under-represent groups that applied less often.",
        why: [
          "Đi thẳng vào gốc: danh sách kế thừa độ lệch của hồ sơ cũ (ý 2). Nhóm từng ít nộp đơn sẽ bị xếp thấp, dù nhu cầu không thấp.",
          "Đây chính là câu “ai đang vắng mặt?” (ý 1), hỏi trước khi danh sách đụng tới quyết định về người (ý 3)."
        ] },
      { k: "B", gist: "Publish the priority list so residents can see how the ordering was reached.",
        why: [
          "Công khai làm danh sách minh bạch hơn, không làm nó công bằng hơn.",
          "Độ lệch trong dữ liệu vẫn nguyên đó (ý 1). Cư dân bị xếp sai vẫn bị xếp sai, chỉ là giờ ai cũng thấy.",
          "Dễ bị cuốn vì nói rõ cho người bị ảnh hưởng là một phần trách nhiệm khi dùng AI. Nhưng công khai không thay được bước kiểm."
        ] },
      { k: "C", gist: "Ask Claude to say whether its own priority list contains any unfair bias.",
        why: [
          "Claude chấm Claude (ý 4). Câu “không có thiên lệch” nghe yên tâm nhưng không phải bằng chứng.",
          "Claude cũng không biết những người chưa từng nộp đơn, vì họ không có trong hồ sơ được đưa vào (ý 2). Thứ cần kiểm nằm ngoài những gì Claude thấy."
        ] },
      { k: "D", gist: "Use the list for this year, then compare the outcomes with last year's decisions.",
        why: [
          "Sửa sau thay vì chặn trước. Cả một năm trợ cấp đã được chia theo một thứ tự có thể lệch.",
          "So với quyết định năm ngoái cũng là so với chính kiểu dữ liệu đang bị nghi lệch."
        ] }
    ],
    refs: [
      { label: "Bài 6.4, mục “Bias và công bằng”: hỏi trước output ảnh hưởng tới ai, nhóm nào bị thiệt; xếp hạng người thì người quyết", href: NOTES + "#l-6-4" },
      { label: "Bài 2.2, mục “Bias: thường là thiếu hoặc lệch”: dạng thiếu góc nhìn, cách soi “ai đang vắng mặt?”", href: NOTES + "#l-2-2" },
      { label: "Bài 0.3, luật 1: độ tự tin và tự chấm của Claude không phải bằng chứng", href: NOTES + "#l-0-3" }
    ]
  },
  {
    de: 1, n: 5, total: 60, sub: "4.1", subName: "Phân tích use case",
    answer: "B",
    ask: "A team is in the requirements-analysis phase for a new time-management app and wants Claude's help with that analysis work. Which task fits that phase best?",
    scene: [
      "Một nhóm sắp làm ứng dụng quản lý thời gian, đang ở giai đoạn phân tích yêu cầu (requirements analysis).",
      "Nhóm muốn Claude giúp đúng phần phân tích đó.",
      "Chỗ khó: cả bốn phương án đều là việc Claude làm được. Câu hỏi là việc nào thuộc giai đoạn này."
    ],
    asks: [
      "Việc nào hợp nhất với giai đoạn phân tích yêu cầu?",
      "Tức là: việc nào giúp nhóm hiểu ai dùng app, họ cần gì, để từ đó định app phải làm gì.",
      "Soi từng phương án: nó thuộc giai đoạn nào (phân tích, làm sản phẩm, quảng bá), và có bám vào người dùng của chính app này không."
    ],
    facts: [
      "Phân tích use case bắt đầu từ vấn đề (problem-first): ai dùng, họ cần kết quả gì, ràng buộc là gì. Rồi mới nghĩ tới giải pháp.",
      "Use case (ca sử dụng) là một nhu cầu cụ thể cần giải quyết. Persona (chân dung người dùng) là mô tả một kiểu người dùng tiêu biểu: họ là ai, cần gì.",
      "Claude giúp nhiều nhất lúc yêu cầu còn là bản nháp, khi sửa còn rẻ. Claude soạn, người duyệt và quyết.",
      "Đợi làm xong sản phẩm rồi mới suy ngược ra yêu cầu là quá muộn."
    ],
    opts: [
      { k: "A", gist: "Ask Claude to start writing the software code for the time-management app.",
        why: [
          "Sai giai đoạn: viết code là bước làm sản phẩm, đến sau phân tích.",
          "Làm trước khi biết người dùng cần gì là đặt ngược thứ tự (ý 1, 4). Tính năng làm ra có thể không giải vấn đề nào."
        ] },
      { k: "B", gist: "Describe the app to Claude and ask it to draft user personas and high-level use cases.",
        why: [
          "Đúng việc của giai đoạn này: persona trả lời “ai dùng”, use case trả lời “họ cần làm gì” (ý 1, 2).",
          "Claude soạn bản nháp, nhóm đọc, tìm chỗ hổng, sửa (ý 3). Bản đã duyệt thành đầu vào để định tính năng."
        ] },
      { k: "C", gist: "Ask Claude to create a marketing plan, with user personas, for the app.",
        why: [
          "Sai giai đoạn: kế hoạch marketing là việc quảng bá, đưa ra thị trường. Persona trong đó phục vụ chuyện bán, không phục vụ chuyện định app phải làm gì.",
          "Dễ bị cuốn vì có chữ “user personas” giống B. Nhưng đề hỏi việc của giai đoạn phân tích yêu cầu, không hỏi việc nào có persona."
        ] },
      { k: "D", gist: "Ask Claude for formal definitions and explanations of key time-management concepts.",
        why: [
          "Đây là kiến thức nền chung, không nói gì về người dùng của app này (ý 1).",
          "Hiểu khái niệm không cho nhóm biết app cần tính năng gì, cho ai."
        ] }
    ],
    refs: [
      { label: "Bài 4.1, mục “Bắt đầu từ vấn đề, không từ công cụ”: ai dùng, cần gì, ràng buộc, cách đơn giản nhất", href: NOTES + "#l-4-1" },
      { label: "Bài Nền tảng D4: use case là gì, một use case chứa nhiều việc nhỏ", href: NOTES + "#l-4-0" }
    ]
  },
  {
    de: 1, n: 6, total: 60, sub: "4.3", subName: "Làm giải pháp cùng Claude",
    answer: "A",
    ask: "A marketing team has always written its weekly client status note by hand. It is moving to a new setup in which Claude drafts the note each week and an account manager edits it before sending. Before the first Claude-drafted note under the new setup reaches a client, what should the team do first?",
    scene: [
      "Đội marketing xưa nay viết tay bản cập nhật tình hình gửi khách mỗi tuần.",
      "Cách mới: Claude soạn nháp, account manager (người phụ trách khách hàng) sửa rồi gửi.",
      "Chỗ khó: chưa ai thử cách mới. Đề hỏi việc làm “first” (trước tiên), trước khi bản đầu tiên tới tay khách.",
      "Nhóm có sẵn một thứ quý: các bản viết tay đã gửi khách thật trong những tuần trước, cùng đầu vào đã dùng để viết chúng."
    ],
    asks: [
      "Trước khi bản nháp đầu tiên của Claude tới khách, nhóm nên làm gì trước tiên?",
      "Tức là: làm sao biết bản nháp của Claude đạt tới đâu, trước khi khách là người phát hiện ra.",
      "Soi từng phương án: nó có so output của Claude với một kết quả đúng đã biết, nằm ngoài Claude, không?"
    ],
    facts: [
      "Mẫu việc thật (real work sample): dữ liệu cũ lấy từ công việc thật, đủ cả ca lộn xộn, dùng để thử trước khi mở rộng.",
      "Phép kiểm chạy được (runnable check): bộ đầu vào kèm kết quả đúng, ai kiểm cũng ra cùng kết luận.",
      "Tự chấm có điểm mù: người làm ra kết quả không phải người kiểm tốt nhất. Claude tự kiểm bản của mình vẫn là Claude chấm Claude.",
      "Chạy thử (pilot): tiêu chí đạt hay trượt viết trước, giữ nguyên bước duyệt, đạt rồi mới mở rộng."
    ],
    opts: [
      { k: "A", gist: "Run Claude on a past month's inputs and compare its drafts with the hand-written notes that were actually sent to clients that month.",
        why: [
          "Một tháng đã qua có sẵn cả đầu vào lẫn “đáp án”: bản viết tay đã gửi khách thật (ý 1, 2).",
          "So từng bản nháp với bản đã gửi, nhóm thấy Claude hụt ở đâu: sót việc, sai số, lệch giọng. Tất cả trước khi khách nhận bản nào (ý 4)."
        ] },
      { k: "B", gist: "Send the first Claude-drafted note straight to the client, with a short note saying Claude helped produce it.",
        why: [
          "Công khai là việc tốt, nhưng không kiểm được gì. Khách thành người thử đầu tiên của một cách làm chưa ai thử.",
          "Báo “có dùng AI” không làm một bản cập nhật sai thành chấp nhận được."
        ] },
      { k: "C", gist: "Ask Claude to check its own draft against the account manager's usual style before it goes to the client.",
        why: [
          "Claude chấm Claude (ý 3). Cùng cách hiểu đã sinh ra bản nháp giờ đi kiểm bản nháp.",
          "Kiểm giọng văn cũng chỉ là hình thức. Sót một việc, sai một con số thì bản nháp vẫn “đúng giọng”.",
          "Dễ bị cuốn vì nghe như thêm một bước kiểm. Nhưng không có kết quả đúng nào nằm ngoài Claude để so."
        ] },
      { k: "D", gist: "Agree in advance exactly how many minutes of editing per note the account manager should expect to spend each week.",
        why: [
          "Đo công sức, không đo chất lượng. Hạn mức phút sửa chỉ có nghĩa khi đã biết bản nháp dùng được tới đâu.",
          "Đặt trước còn có thể ép account manager sửa ít hơn mức bản nháp thật sự cần."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, vòng plan → verify → judge → refine: phép kiểm là bộ đầu vào kèm kết quả đúng; tự chấm có điểm mù", href: NOTES + "#l-4-3" },
      { label: "Bài 4.1, mục “Thử trên mẫu việc thật”: thử trên việc thật của kỳ trước trước khi mở rộng", href: NOTES + "#l-4-1" },
      { label: "Bài 4.4, mục “Chạy thử một việc thật trước khi mở rộng”: tiêu chí viết trước, giữ bước duyệt", href: NOTES + "#l-4-4" }
    ]
  },
  {
    de: 1, n: 7, total: 60, sub: "2.3", subName: "Kiểm từng khẳng định",
    answer: "AC",
    ask: "A press officer has forty minutes to check a 900-word briefing drafted by Claude before it is released. Which two kinds of claim should be verified first? (Select two.)",
    scene: [
      "Một cán bộ báo chí có 40 phút để kiểm bản thông tin (briefing) 900 chữ do Claude soạn, trước khi phát đi.",
      "Chỗ khó: không đủ thời gian kiểm mọi câu. Phải chọn kiểm cái gì trước.",
      "Đề đòi chọn hai. Hai phương án đúng nhìn rủi ro từ hai phía khác nhau."
    ],
    asks: [
      "Hai loại khẳng định nào nên kiểm trước?",
      "Tức là: xếp thứ tự kiểm theo rủi ro, khi thời gian có hạn.",
      "Soi từng phương án: nó chọn câu theo khả năng sai và thiệt hại nếu sai, hay theo vị trí, cảm giác, ý kiến sẵn có?"
    ],
    facts: [
      "Kiểm theo rủi ro (verification triage): xếp từng khẳng định theo hai trục, khả năng sai và thiệt hại nếu sai. Kiểm trước chỗ cả hai đều cao. Hỏi mình: quyết định nào dựa vào câu này?",
      "Xếp theo hệ quả, không đi theo thứ tự trong bài, không chọn câu dễ tra trước.",
      "Con số chính xác, câu trích có tên người nói là loại nội dung dễ sai. Chi tiết bịa thường nghe rất chuyên nghiệp, nên “nghe lạ” là bộ lọc kém.",
      "Output càng ra ngoài, càng khó rút lại (bài đã đăng công khai, email đã gửi) thì sai càng đắt."
    ],
    opts: [
      { k: "A", gist: "The figures that the briefing's central recommendation actually depends on.",
        why: [
          "Đúng trục “quyết định nào dựa vào câu này?” (ý 1). Sai một con số ở đây là khuyến nghị đổ.",
          "Con số chính xác cũng là loại dễ sai (ý 3). Vừa dễ sai vừa thiệt nhiều: kiểm trước."
        ] },
      { k: "B", gist: "The claims that appear earliest, on the grounds that readers reach them first.",
        why: [
          "Sai ở tiêu chí: vị trí trong bài không nói gì về rủi ro (ý 2).",
          "Một con số sai ở đoạn cuối hại y như ở câu đầu."
        ] },
      { k: "C", gist: "The statements that will be quoted publicly and would be costly to retract.",
        why: [
          "Nhìn từ phía hậu quả: câu ra khỏi tổ chức và khó rút lại thì sai rất đắt (ý 4), dù nó không phải trụ của lập luận.",
          "A và C bổ sung nhau. A canh câu mà kết luận dựa vào, C canh câu mà sai thì không gỡ được."
        ] },
      { k: "D", gist: "The sentences whose phrasing reads a little unusually compared with the rest.",
        why: [
          "“Nghe lạ” là bộ lọc kém (ý 3). Câu viết lạ có thể chỉ là văn phong.",
          "Chi tiết bịa thường nghe rất trơn tru, nên lọc theo cảm giác sẽ bỏ qua đúng chỗ cần kiểm.",
          "Dễ bị cuốn vì nghe như đọc kỹ. Nhưng 40 phút cần dồn vào câu có hậu quả, không vào câu có giọng lạ."
        ] },
      { k: "E", gist: "The points the team already believes, so the briefing agrees with their view.",
        why: [
          "Đây là xác nhận điều mình muốn tin, không phải kiểm. “agrees with their view” (khớp với quan điểm của nhóm) không phải mục tiêu của bước kiểm.",
          "Câu khớp ý người đọc càng dễ lọt qua mắt, nên càng phải soi kỹ, chứ không phải đem ra để xác nhận."
        ] }
    ],
    refs: [
      { label: "Bài 2.1, mục “Kiểm theo rủi ro: chỗ nào trước”: hai trục khả năng sai và thiệt hại, “nghe lạ” là bộ lọc kém", href: NOTES + "#l-2-1" },
      { label: "Bài 2.3, mục “Sau khi Claude viết”: xếp theo hệ quả, không theo thứ tự trong bài", href: NOTES + "#l-2-3" },
      { label: "Bài 2.4: khó rút lại (bài đăng công khai, email đã gửi) là tín hiệu nâng mức kiểm", href: NOTES + "#l-2-4" }
    ]
  },
  {
    de: 1, n: 8, total: 60, sub: "5.1", subName: "Dựng Project: instructions và knowledge",
    answer: "A",
    ask: "A marketer discusses a campaign brief with Claude in Chat A inside a project. When she opens a new Chat B in the same project, Claude does not recall those details. What most likely explains this?",
    scene: [
      "Một nhân viên marketing bàn bản brief (bản tóm tắt yêu cầu) chiến dịch với Claude ở chat A, trong một Project.",
      "Mở chat B mới trong cùng Project, Claude không nhớ gì về brief đó.",
      "Chỗ khó: cùng một Project, nên dễ nghĩ mọi chat trong đó dùng chung trí nhớ."
    ],
    asks: [
      "Lý do nhiều khả năng nhất là gì?",
      "Tức là: trong một Project, thứ gì chat nào cũng thấy, thứ gì chỉ nằm trong một chat?"
    ],
    facts: [
      "Mọi chat trong Project đều thấy project instructions và project knowledge. Nội dung một chat thì chỉ nằm trong chat đó, chat khác không tự thấy.",
      "Quyết định đã chốt trong một chat (giá, phạm vi, tên chiến dịch) mà các chat sau cần thì viết thành tài liệu ngắn, đưa vào knowledge.",
      "Project instructions là lời dặn cách làm do người dùng viết. Nó không chứa nội dung các chat.",
      "App hiện có memory riêng cho từng Project (nếu memory đang bật), và gói trả phí có chat search: Claude tìm lại chat cũ khi được nhờ, không vượt ranh giới Project. Hai thứ này có thể mang một phần sang, nhưng không bảo đảm giữ đủ chi tiết."
    ],
    opts: [
      { k: "A", gist: "The brief was only discussed in Chat A and was never added to the project's shared knowledge base.",
        why: [
          "Đúng cơ chế: brief chỉ nằm trong context của chat A (ý 1). Chat B chỉ chắc chắn thấy instructions và knowledge, mà brief không có ở đó.",
          "Cách sửa đi kèm: viết brief thành tài liệu ngắn, đưa vào knowledge (ý 2). Từ đó chat nào trong Project cũng thấy."
        ] },
      { k: "B", gist: "The project has already hit its maximum number of chats for the current billing cycle.",
        why: [
          "Mâu thuẫn với chính đề kể: nếu đã chạm giới hạn số chat thì chị không mở được chat B. Chị mở được, chỉ là Claude không nhớ.",
          "Triệu chứng là thiếu thông tin trong chat, không phải bị chặn mở chat."
        ] },
      { k: "C", gist: "The marketer's current plan does not allow more than one chat in each project.",
        why: [
          "Cũng mâu thuẫn với đề kể: chị đã có chat A và chat B trong cùng Project.",
          "Project dựng ra chính để nhiều chat dùng chung instructions và knowledge (ý 1)."
        ] },
      { k: "D", gist: "Project instructions must be re-saved before a new chat can access earlier chat conversations.",
        why: [
          "Sai ở giả định: instructions không chứa nội dung chat nào (ý 3). Lưu lại bao nhiêu lần, chat B vẫn không thấy chat A.",
          "Dễ bị cuốn vì instructions đúng là thứ mọi chat đều đọc. Nhưng thứ cần đưa vào là bản brief, và chỗ của nó là knowledge (ý 2)."
        ] }
    ],
    dispute: "Đề gốc chấm A, sổ giữ A. Nhưng lời giải gốc nói hơi tuyệt đối: “Context is not shared across chats in a project unless it has been added to the project knowledge base” (context không được chia sẻ giữa các chat trong project, trừ khi đã đưa vào knowledge). App hiện nay có memory riêng cho từng Project, và gói trả phí có chat search tìm lại chat cũ trong cùng Project khi được nhờ (help center “Use Claude’s chat search and memory”). Nên đôi khi chat B vẫn nhớ hoặc tìm lại được vài ý của chat A. Hai thứ đó không bảo đảm đủ chi tiết, nên ý chính của đáp án vẫn đúng: muốn mọi chat chắc chắn thấy thì đưa vào knowledge.",
    refs: [
      { label: "Bài 5.1, bảng “Instructions hay knowledge”: quyết định chốt trong một chat thì viết thành tài liệu ngắn đưa vào knowledge, vì chat sau không thấy chat trước", href: NOTES + "#l-5-1" },
      { label: "Bài 3.4, mục “Memory, tìm chat cũ, chat ẩn danh”: memory riêng của Project, chat search chỉ chạy khi được nhờ", href: NOTES + "#l-3-4" },
      { label: "Help center: chat search và memory, ranh giới Project", href: "https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context" }
    ]
  },
  {
    de: 1, n: 9, total: 60, sub: "4.5", subName: "Nói với stakeholder về giá trị và giới hạn",
    answer: "A",
    ask: "A stakeholder is confused that Claude gave two slightly different summaries of the same document on two separate runs, and asks whether the model is broken. What is the best explanation to give?",
    scene: [
      "Một stakeholder (người có liên quan tới dự án, thường là sếp hay phòng ban khác) thấy Claude tóm tắt cùng một tài liệu ở hai lần chạy riêng.",
      "Hai bản tóm tắt hơi khác nhau. Người đó hỏi: model hỏng à?",
      "Chỗ khó: phải giải thích đúng bản chất, không làm người ta lo vô cớ, cũng không hứa Claude lần nào cũng ra y hệt."
    ],
    asks: [
      "Lời giải thích nào tốt nhất?",
      "Tức là: vì sao hai lần chạy ra hai bản khác chữ, và đó có phải lỗi không."
    ],
    facts: [
      "Claude sinh chữ bằng cách đoán phần chữ tiếp theo. Hỏi cùng một câu hai lần có thể ra hai câu trả lời khác chữ. Đó là thiết kế, không phải hỏng (run-to-run variation, biến thiên giữa các lần chạy).",
      "Tách chữ với nội dung. Khác cách viết mà cùng sự kiện thì không sao. Khác một con số thì kiểm con số đó với nguồn.",
      "Context window (cửa sổ ngữ cảnh) là lượng chữ tối đa Claude xem được trong một lần trả lời. Tài liệu quá dài là chuyện khác, xử lý bằng chia nhỏ, tóm tắt, Project hoặc chat mới.",
      "Nói với stakeholder: giải thích theo đặc tính và cách bù, không nói “AI không đáng tin”, cũng không hứa hoàn hảo."
    ],
    opts: [
      { k: "A", gist: "Explain that Claude's responses are not perfectly deterministic, so minor wording variation between runs is normal and expected.",
        why: [
          "Đúng bản chất (ý 1). “not perfectly deterministic” (không cố định hoàn toàn) nghĩa là cùng đầu vào chưa chắc ra cùng câu chữ.",
          "Đúng tầm cho stakeholder: bình thường, không phải hỏng (ý 4). Nếu hai bản lệch nhau ở một con số hay sự kiện thì lúc đó mới kiểm với tài liệu gốc (ý 2)."
        ] },
      { k: "B", gist: "Explain that the second summary is correct and the first should be treated as a bug for support to investigate right away.",
        why: [
          "Sai ở giả định: khác chữ không có nghĩa một bản đúng, một bản lỗi (ý 1). Chọn bản thứ hai là đúng cũng không có căn cứ nào.",
          "Gọi đây là bug là bắt support đi tìm một lỗi không tồn tại."
        ] },
      { k: "C", gist: "Explain that document summaries always fail after the first request, so each summary attempt needs a new conversation.",
        why: [
          "Bịa ra một quy luật: tóm tắt không hỏng sau lần đầu.",
          "Mở chat mới cũng không làm hai lần chạy ra cùng câu chữ (ý 1)."
        ] },
      { k: "D", gist: "Explain that variation happens only when a document exceeds the context window, so shortening the document fixes it.",
        why: [
          "Nhầm hai chuyện. Context window là giới hạn độ dài (ý 3). Khác chữ giữa các lần chạy thì có cả với tài liệu ngắn (ý 1).",
          "Rút ngắn tài liệu không làm hai bản tóm tắt giống nhau từng chữ.",
          "Dễ bị cuốn vì context window là giới hạn có thật, và tài liệu quá dài đúng là làm câu trả lời kém đi. Nhưng đề kể hai bản chỉ “slightly different” (khác nhau chút ít), không bản nào bị mất phần."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Sai mà nghe rất trôi, và hai lần hỏi ra hai bản”: khác chữ là bình thường, khác số thì kiểm", href: NOTES + "#l-4-5" },
      { label: "Bài 3.4, mục “Hai giới hạn, hai cách xử lý”: giới hạn độ dài do context window, xử lý bằng chat mới hoặc Project", href: NOTES + "#l-3-4" }
    ]
  },
  {
    de: 1, n: 10, total: 60, sub: "3.3", subName: "Chọn model theo chi phí, tốc độ, chất lượng",
    answer: "C",
    ask: "A team runs two workloads that are similar in volume and subject matter. One is edited line by line by a specialist before use; the other is published automatically without anyone reading it. Which consideration should weigh most heavily when choosing a model tier for each?",
    scene: [
      "Một nhóm có hai lô việc, giống nhau về số lượng và chủ đề.",
      "Lô thứ nhất: chuyên gia sửa từng dòng trước khi dùng. Lô thứ hai: đăng tự động, không ai đọc.",
      "Chỗ khó: hai lô giống nhau gần hết. Chỗ khác duy nhất là có người kiểm ở cuối hay không."
    ],
    asks: [
      "Khi chọn tầng model (Haiku, Sonnet, Opus) cho từng lô, yếu tố nào nặng ký nhất?",
      "Tức là: tìm yếu tố làm hai lô cần hai mức chất lượng khác nhau.",
      "Soi từng phương án: yếu tố đó có khác nhau giữa hai lô không, và có quyết định cái giá của một kết quả sai không?"
    ],
    facts: [
      "Bốn câu trước khi chọn model: việc khó cỡ nào, cần nhanh cỡ nào, làm bao nhiêu lần, sai thì mất gì. Câu “sai thì mất gì” thường quyết định.",
      "Cần bao nhiêu chất lượng là do cái giá của một kết quả sai. Cùng một loại việc, bản nháp có người sửa và thứ đi thẳng ra ngoài đòi hai mức khác nhau.",
      "Output càng ra ngoài, càng khó rút lại, mà không ai duyệt trước khi dùng, thì sai càng đắt.",
      "Tầng nhẹ hợp việc nhiều, cần nhanh và rẻ. Tầng mạnh, hoặc effort cao hơn, để dành cho chỗ sai thì tốn kém."
    ],
    opts: [
      { k: "A", gist: "The subject matter the workloads share, since comparable material should be handled the same way for consistent output.",
        why: [
          "Chủ đề giống nhau ở cả hai lô, nên nó không giúp phân biệt gì (ý 1).",
          "Nhất quán cho đẹp mà bỏ qua chuyện một lô không ai kiểm là chọn sai tiêu chí (ý 2)."
        ] },
      { k: "B", gist: "The volume of the workloads, since equal volumes mean equal throughput needs and so the same speed-cost balance.",
        why: [
          "Số lượng đúng là một trong bốn câu (ý 1), và hai lô cần tốc độ như nhau.",
          "Nhưng chính vì bằng nhau, nó không tách được hai lô. Chỗ khác nhau là cái giá khi sai.",
          "Dễ bị cuốn vì nhìn khối lượng là phản xạ quen khi chọn model. Nhưng yếu tố nặng ký nhất ở đây phải là thứ làm hai lô khác nhau."
        ] },
      { k: "C", gist: "How much a downstream human check would catch, since the unchecked workload must carry its own quality with no safety net.",
        why: [
          "Đúng câu “sai thì mất gì” (ý 1, 2). Lô có chuyên gia sửa từng dòng thì lỗi bị bắt trước khi dùng. Lô đăng tự động thì lỗi đi thẳng ra ngoài (ý 3).",
          "Nên lô không ai đọc xứng đáng tầng mạnh hơn hay effort cao hơn. Lô có người sửa có thể nghiêng về tầng nhanh, nhẹ, đỡ tốn hạn mức (ý 4)."
        ] },
      { k: "D", gist: "The seniority of each workload's owner, since the more senior owner is accountable for the more visible workload.",
        why: [
          "Cấp bậc người phụ trách nói ai chịu trách nhiệm khi có lỗi, không nói lỗi dễ xảy ra hay dễ lọt tới đâu.",
          "Nó không dính gì tới việc model nào làm tốt việc này (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 3.3, mục “Bốn câu hỏi trước khi chọn”: câu “sai thì mất gì” thường quyết định", href: NOTES + "#l-3-3" },
      { label: "Bài 2.4: output ra ngoài, khó rút lại thì cần người duyệt trước khi gửi; không ai duyệt thì model phải tự gánh chất lượng", href: NOTES + "#l-2-4" }
    ]
  },
  {
    de: 1, n: 11, total: 60, sub: "2.4", subName: "Khi nào cần người duyệt",
    answer: "D",
    ask: "A team runs every Claude-assisted output through the same single sign-off step, whether it is internal meeting notes or a statement that will be filed with a regulator. What is the greatest risk of this approach?",
    scene: [
      "Một team cho mọi output có Claude hỗ trợ đi qua đúng một bước ký duyệt, giống hệt nhau.",
      "Hai đầu của dải output rất khác nhau: biên bản họp nội bộ, và một văn bản sẽ nộp cho cơ quan quản lý.",
      "Chỗ khó: cả bốn phương án đều là chuyện có thể xảy ra thật. Đề hỏi “greatest risk” (rủi ro lớn nhất), nên phải cân cái nào thiệt hại nặng nhất."
    ],
    asks: [
      "Cho mọi output qua cùng một bước duyệt thì rủi ro lớn nhất là gì?",
      "Tức là: quy trình duyệt “một cỡ cho tất cả” hỏng nặng nhất ở chỗ nào.",
      "Soi từng phương án: nó là một cái giá khó chịu nhưng sửa được, hay là lỗi lọt ra ngoài mà không rút lại được?"
    ],
    facts: [
      "Mức duyệt đi theo tín hiệu: mức hệ trọng, người nhận, rút lại được không, loại nội dung, lĩnh vực được quản lý. Output càng hệ trọng, càng ra ngoài, càng khó rút lại thì càng cần người có chuyên môn duyệt kỹ trước khi gửi.",
      "Văn bản nộp cơ quan quản lý chạm gần đủ tín hiệu đỏ: người nhận bên ngoài, nộp rồi không rút lại được, lĩnh vực được quản lý. Biên bản họp nội bộ thì sai cứ sửa lại.",
      "Duyệt theo rủi ro có hai chiều. Bỏ qua người duyệt ở ca hệ trọng là liều. Bắt việc nhẹ qua chuyên gia là làm quá tay, tốn thời gian của người có chuyên môn."
    ],
    opts: [
      { k: "A", gist: "Reviewers will push back on the extra workload, so the sign-off step will be dropped within a few weeks.",
        why: [
          "Đây là đoán chuyện người duyệt sẽ phản ứng ra sao. Đề không cho dữ kiện nào về việc đó.",
          "Kể cả khi bước duyệt bị bỏ, cái hại thật vẫn là văn bản nộp cơ quan quản lý không được kiểm đủ kỹ (ý 2). A chỉ là một đường dẫn tới đúng cái hại mà D nói thẳng ra."
        ] },
      { k: "B", gist: "Every output takes equally long to clear, which noticeably slows down the team's routine work.",
        why: [
          "Đúng là một cái giá: biên bản họp phải chờ y như văn bản pháp lý. Notes gọi chiều này là làm quá tay (ý 3).",
          "Nhưng chậm là thiệt về hiệu suất, ai cũng thấy và sửa được. Nó không làm văn bản sai nào tới tay người nhận.",
          "Dễ bị cuốn vì đây là cái team cảm thấy ngay mỗi ngày. Nhưng đề hỏi rủi ro lớn nhất, và rủi ro nặng nằm ở đầu kia: văn bản nộp cơ quan quản lý."
        ] },
      { k: "C", gist: "Reviewers will start leaning on Claude's wording, and their comments will get shorter over time.",
        why: [
          "Phương án này nói người duyệt dần dựa vào câu chữ của Claude. Chuyện đó có thể xảy ra ở bất kỳ quy trình duyệt nào, không riêng kiểu duyệt đồng loạt.",
          "Nó cũng chỉ là hệ quả. Gốc vấn đề là quy trình không phân biệt việc hệ trọng với việc thường (ý 1)."
        ] },
      { k: "D", gist: "Irreversible, externally visible work gets no more scrutiny than notes that nobody will ever act on.",
        why: [
          "Đúng. Một bước duyệt chung cho tất cả thì văn bản nộp cơ quan quản lý chỉ được soi kỹ ngang biên bản họp.",
          "Văn bản đó có đủ tín hiệu nâng mức duyệt: ra ngoài, không rút lại được, lĩnh vực được quản lý (ý 1, 2). Lỗi lọt qua là lỗi tới thẳng cơ quan quản lý.",
          "Đây là chiều nguy hiểm của việc duyệt không theo rủi ro (ý 3): ca hệ trọng không được người có chuyên môn kiểm đủ sâu."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, bảng năm tín hiệu nâng mức duyệt, và đoạn “duyệt theo rủi ro có hai chiều”", href: NOTES + "#l-2-4" },
      { label: "Cheatsheet D2, nhóm 2.4: ca hệ trọng thì người có chuyên môn duyệt trước khi gửi, ca nhẹ tự đọc là đủ", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 1, n: 12, total: 60, sub: "7.3", subName: "Tối ưu quy trình",
    answer: "B",
    ask: "Someone adds a workaround to the instructions of a shared project but does not record why it is there. Over time, what is the greatest risk?",
    scene: [
      "Một project dùng chung, nhiều người cùng dựa vào instructions của nó.",
      "Có người thêm một workaround (cách chữa tạm cho một lỗi) vào instructions, nhưng không ghi vì sao thêm.",
      "Chỗ khó: đề hỏi rủi ro “over time” (về lâu dài), không phải hôm nay. Hôm nay dòng đó vẫn chạy tốt."
    ],
    asks: [
      "Về lâu dài, rủi ro lớn nhất của một dòng instructions không ghi lý do là gì?",
      "Tức là: khi hoàn cảnh đổi, dòng đó sẽ thành vấn đề theo kiểu nào.",
      "Soi từng phương án: nó là chuyện hình thức, hay làm hỏng việc giữ instructions còn đúng?"
    ],
    facts: [
      "Instructions áp cho mọi chat trong project. Một dòng đã hết thời vẫn định hình mọi câu trả lời, của mọi người, cho tới khi có người gỡ.",
      "Instructions cũng cũ đi: đổi model hay đổi chính sách thì câu dặn từng cần có khi không còn cần, hoặc thành sai. Bảo trì là rà định kỳ, xóa quy tắc hết hạn, sửa chỗ mâu thuẫn.",
      "Muốn biết một quy tắc đã hết hạn chưa thì phải biết nó sinh ra để làm gì. Lý do của một bước thường không được viết ra, nên người sau chỉ thấy bước đó mà không biết nó đang giữ cái gì."
    ],
    opts: [
      { k: "A", gist: "Colleagues may add more workarounds next to it, making the order of the instructions harder to follow.",
        why: [
          "Có thể xảy ra, nhưng đó là triệu chứng của cùng một bệnh: không ai ghi lý do, nên ai cũng vá thêm chứ không ai dám gỡ.",
          "Khó đọc hơn chưa phải cái hại lớn nhất. Cái hại là các dòng đã hết thời vẫn ở lại và lái câu trả lời (ý 1).",
          "Dễ bị cuốn vì nghe đúng kiểu rủi ro “về lâu dài”: instructions phình dần. Nhưng phình ra chỉ là hệ quả. Gốc là không ai phán được dòng nào còn cần (ý 3)."
        ] },
      { k: "B", gist: "It stays long after its reason has disappeared, and nobody feels able to decide whether to remove it.",
        why: [
          "Đúng. Không ghi lý do thì không ai biết nó chữa cái gì, nên cũng không ai biết gỡ đi có làm hỏng gì không (ý 3).",
          "Khi model hay chính sách đổi, workaround có thể thành thừa hoặc thành sai (ý 2). Nó vẫn áp cho mọi chat (ý 1), còn việc rà soát định kỳ thì bế tắc vì không ai đánh giá được nó."
        ] },
      { k: "C", gist: "The instructions grow slightly longer, so colleagues need a little more time to read them.",
        why: [
          "Notes có khuyên giữ instructions ngắn. Nhưng một dòng thêm vào không phải rủi ro lớn, và đọc lâu hơn chút không làm câu trả lời sai.",
          "Chỗ hỏng thật không nằm ở độ dài, mà ở chỗ dòng đó không ai đánh giá được."
        ] },
      { k: "D", gist: "The workaround may be worded in a different style from the instructions already there.",
        why: [
          "Khác giọng văn là chuyện hình thức. Nó không đổi chuyện dòng đó còn cần hay không.",
          "Sửa giọng mất vài phút. Dòng không ai dám gỡ thì ở lại mãi."
        ] }
    ],
    refs: [
      { label: "Bài 5.4, mục “Instructions cũng cũ đi”: xóa quy tắc hết hạn, sửa chỗ mâu thuẫn, ghi thay đổi ở chỗ người dùng thấy", href: NOTES + "#l-5-4" },
      { label: "Bài 7.2, mục “Đặt cách sửa ở đâu”: xem lại định kỳ, vì câu dặn từng cần có khi thành thừa hoặc sai", href: NOTES + "#l-7-2" },
      { label: "Bài 4.2, dạng 2 phần Khi đi thi: lý do của một bước thường không được viết ra, hỏi người hiểu nó trước khi bỏ", href: NOTES + "#l-4-2" }
    ]
  },
  {
    de: 1, n: 13, total: 60, sub: "4.3", subName: "Làm giải pháp cùng Claude",
    answer: "C",
    ask: "A team built its Claude-assisted case-note process around a single unusually clean example case, and on that case it worked perfectly. They now plan to run every type of case through it. What is the greatest risk?",
    scene: [
      "Một team dựng cách dùng Claude để viết case note (ghi chú hồ sơ của từng ca).",
      "Cả thiết kế được chỉnh trên đúng một ca mẫu, mà ca đó lại “unusually clean” (gọn gàng khác thường). Trên ca đó nó chạy hoàn hảo.",
      "Giờ team định cho mọi loại ca đi qua nó.",
      "Chỗ khó: “worked perfectly” (chạy hoàn hảo) nghe như đã kiểm xong. Nhưng mới kiểm trên một ca, lại là ca dễ nhất."
    ],
    asks: [
      "Mở rộng ra mọi loại ca thì rủi ro lớn nhất là gì?",
      "Tức là: một thiết kế mới thử trên một ca sạch sẽ hỏng ở đâu khi gặp ca thật.",
      "Soi từng phương án: nó là cái giá hiện rõ và sửa được, hay là lỗi âm thầm nằm trong chính các case note?"
    ],
    facts: [
      "Overfit (khớp quá): prompt hay cách làm chỉnh mãi trên một đầu vào thì chạy rất tốt với nó, gặp đầu vào khác thì hỏng.",
      "Trước khi dùng lâu dài hay dùng chung, thử trên vài đầu vào thật, khác nhau, có cả ca khó: thiếu dữ liệu, rất dài, mơ hồ. Ví dụ tự chọn thường quá sạch.",
      "Làm giải pháp cùng Claude đi theo vòng plan → verify → judge → refine (lên kế hoạch, kiểm, đánh giá, sửa). Ca biên phải nằm trong điều kiện xong, và chạy thử nhỏ trước rồi mới mở rộng."
    ],
    opts: [
      { k: "A", gist: "The team will go over its weekly usage allowance within the first fortnight.",
        why: [
          "Đề không cho dữ kiện nào về hạn mức. Đây là đoán.",
          "Kể cả khi xảy ra, chạm hạn mức là chuyện hiện rõ: Claude báo, team thấy ngay và xử lý được. Nó không làm ra case note sai.",
          "Dễ bị cuốn vì đưa mọi loại ca vào nghe như sẽ tốn hạn mức hơn nhiều. Nhưng tốn hạn mức không phải rủi ro lớn nhất. Rủi ro lớn nhất là output sai mà không ai biết (ý 1)."
        ] },
      { k: "B", gist: "Colleagues will find the written instructions too long to read before using the process.",
        why: [
          "Hướng dẫn dài là phiền, nhưng thấy ngay và rút gọn được.",
          "Nó không đụng tới chuyện thiết kế có chạy đúng trên ca thật hay không."
        ] },
      { k: "C", gist: "The process was tuned on a case that does not represent the messy real ones.",
        why: [
          "Đúng. Đây là overfit (ý 1): cả thiết kế khớp với ca dễ nhất nó từng gặp.",
          "Các ca thiếu dữ liệu, mơ hồ, có tranh chấp thì chưa ca nào được thử (ý 2). Chính chúng là chỗ thiết kế hỏng, và hỏng âm thầm trong case note.",
          "Cách đúng: thử trên một bộ ca thật có ca khó, đưa ca biên vào điều kiện xong, chạy thử nhỏ rồi mới mở rộng (ý 3)."
        ] },
      { k: "D", gist: "Claude will write case notes that are noticeably longer than the previous ones.",
        why: [
          "Dài hơn là chuyện định dạng. Người duyệt thấy ngay, và chỉ cần ghi rõ độ dài trong prompt.",
          "Nó không nói gì về chuyện case note có đúng với các ca khó hay không."
        ] }
    ],
    refs: [
      { label: "Bài 4.3: vòng plan → verify → judge → refine, ca biên trong điều kiện xong, chạy thử rồi mới mở rộng", href: NOTES + "#l-4-3" },
      { label: "Bài 1.3, phần khái niệm: overfit, và bộ đầu vào thử có cả ca khó", href: NOTES + "#l-1-3" },
      { label: "Cheatsheet D4: prompt đúng trên ví dụ dùng để viết nó thì thử trên việc thật đủ ca khó, vì ví dụ tự chọn quá sạch", href: NOTES + "#cheat-d4" }
    ]
  },
  {
    de: 1, n: 14, total: 60, sub: "2.4", subName: "Khi nào cần người duyệt",
    answer: "AE",
    ask: "A programme office is writing a policy on how much scrutiny Claude-generated work should receive. Which two factors increase the level of human review that is needed? (Select two.)",
    scene: [
      "Một văn phòng điều phối chương trình đang viết chính sách: output do Claude làm thì soi kỹ tới đâu.",
      "Đề đưa năm yếu tố. Phải chọn hai yếu tố làm tăng mức người duyệt.",
      "Chỗ khó: ba yếu tố còn lại nghe như “có gì đó khác thường” (prompt dài, làm nhanh, định dạng lạ). Nhưng khác thường không có nghĩa là sai thì thiệt hơn."
    ],
    asks: [
      "Hai yếu tố nào làm tăng mức người duyệt cần có?",
      "Tức là: yếu tố nào làm cái giá của một lỗi lớn hơn.",
      "Soi từng yếu tố: nó đổi hậu quả khi output sai, hay chỉ tả cách output được làm ra?"
    ],
    facts: [
      "Mức duyệt đi theo năm tín hiệu: mức hệ trọng, người nhận, rút lại được không, loại nội dung, lĩnh vực được quản lý.",
      "Irreversible (không rút lại được): sai rồi không gỡ được, như email đã gửi khách, hợp đồng đã ký, bài đã đăng, tiền đã chuyển. Loại này phải duyệt trước khi làm, vì “gửi trước, ai báo sai thì sửa” là quá muộn.",
      "Người nhận càng rộng thì càng phải duyệt kỹ: từ chính bạn, nhóm của bạn, tới khách hàng, công chúng. Thông báo gửi toàn bộ khách hàng phải kiểm từng chi tiết và có người phụ trách duyệt trước khi gửi.",
      "Các tín hiệu này đều nói về hậu quả khi output sai. Cách output được làm ra (prompt dài hay ngắn, nhanh hay chậm) không nằm trong danh sách."
    ],
    opts: [
      { k: "A", gist: "The action taken on the basis of the output would be hard to reverse once done.",
        why: [
          "Đúng. Đây là tín hiệu “rút lại được không” (ý 1, 2).",
          "Sai mà không gỡ được thì không có cơ hội sửa sau. Bước kiểm phải đặt trước hành động, và phải kỹ hơn."
        ] },
      { k: "B", gist: "The prompt behind the output was long and included pasted background material.",
        why: [
          "Độ dài prompt không phải tín hiệu nào trong năm (ý 1, 4). Nó không đổi hậu quả khi output sai.",
          "Prompt đủ bối cảnh còn giúp Claude bớt phải đoán. Nó không phải lý do để soi kỹ hơn."
        ] },
      { k: "C", gist: "The output was produced faster than the same work would have taken by hand.",
        why: [
          "Làm nhanh hay chậm không đổi chuyện sai thì thiệt tới đâu (ý 4).",
          "Output nào của Claude cũng nhanh hơn làm tay. Nếu đây là tín hiệu thì cái gì cũng phải duyệt kỹ, mất luôn ý nghĩa của duyệt theo rủi ro."
        ] },
      { k: "D", gist: "The output came in a document format the team has seldom used before.",
        why: [
          "Định dạng lạ là chuyện thao tác của team: mở file, quen cách trình bày. Nội dung bên trong không vì thế mà sai thì thiệt hơn (ý 4).",
          "Dễ bị cuốn vì notes có tín hiệu “chủ đề mới hay ngách” ở mục loại nội dung. Nhưng đó là nội dung mới, chỗ Claude dễ bịa. Còn đây là định dạng file mới với team, nội dung không có gì mới."
        ] },
      { k: "E", gist: "Many people would be affected if the output turned out to be wrong.",
        why: [
          "Đúng. Đây là tín hiệu “người nhận”: sai mà tới nhiều người thì thiệt lớn (ý 1, 3).",
          "Nó độc lập với A. Một lỗi dễ sửa vẫn có thể tới tay rất nhiều người trước khi có ai phát hiện."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, bảng năm tín hiệu nâng mức duyệt, nhất là hai dòng “người nhận” và “rút lại được không”", href: NOTES + "#l-2-4" },
      { label: "Cheatsheet D2, nhóm 2.4: gửi ra ngoài, không rút lại được thì người có chuyên môn duyệt trước khi gửi", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 1, n: 15, total: 60, sub: "2.3", subName: "Kiểm từng khẳng định",
    answer: "C",
    ask: "A supplier manager has a Claude answer that names a specific waste-handling regulation and states its effective date. Web search was off for the entire conversation, so no sources were consulted. What should she do first?",
    scene: [
      "Một quản lý nhà cung cấp nhận câu trả lời của Claude: có tên một quy định cụ thể về xử lý chất thải, và ngày quy định đó có hiệu lực.",
      "Web search tắt suốt cuộc chat. Claude không tra nguồn nào, câu trả lời cũng không kèm trích dẫn nào.",
      "Chỗ khó: tên quy định và ngày hiệu lực đúng là loại chi tiết hay bịa, mà trong chat không có gì để đối chiếu."
    ],
    asks: [
      "Việc chị nên làm “first” (trước tiên) là gì?",
      "Tức là: bước nào thật sự kiểm được tên và ngày đó.",
      "Soi từng phương án: nó so khẳng định với một nguồn nằm ngoài Claude, hay chỉ hỏi lại Claude theo cách khác?"
    ],
    facts: [
      "Chi tiết cụ thể là chỗ hay bịa: tên văn bản, số điều, ngày tháng, con số. Chúng trông rất thật dù có thể là hallucination (thông tin bịa).",
      "Câu trả lời cụ thể, chắc chắn về quy định mà không bật công cụ nào thì coi là chưa kiểm: có thể đã cũ, hoặc bị điền cho đủ.",
      "Kiểm là so khẳng định với nguồn có thẩm quyền nằm ngoài Claude. Với quy định, đó là văn bản quy định chính thức.",
      "Những thứ trông giống kiểm mà không phải: hỏi lại ra cùng đáp án, câu trả lời đọc thấy trơn tru, có chú thích nguồn mà chưa mở ra đọc."
    ],
    opts: [
      { k: "A", gist: "Ask Claude to list the sources for the regulation and its date, then check the few items it returns.",
        why: [
          "Sai ở giả định: câu trả lời không dựa trên nguồn nào, vì web search tắt. Danh sách nguồn xin sau là Claude viết thêm để đỡ cho một câu đã viết rồi.",
          "Danh sách đó cũng là chi tiết cụ thể, cũng có thể bịa (ý 1). Chị lại phải kiểm từng nguồn trong đó: thêm một bước mà không chắc hơn."
        ] },
      { k: "B", gist: "Judge the claim by how well it fits the rest of the answer, which was right on every point she already knew.",
        why: [
          "Sai: khớp với phần còn lại không phải bằng chứng (ý 4). Câu đúng và câu bịa đi ra từ cùng một cách Claude viết, nên câu bịa nằm rất vừa cạnh câu đúng.",
          "Mấy điểm chị đã biết là đúng không nói gì về tên quy định và ngày hiệu lực, là hai điểm chị chưa biết."
        ] },
      { k: "C", gist: "Treat both the regulation and its date as unverified and look them up herself in the official register of legislation.",
        why: [
          "Đúng. Web search tắt thì không có nguồn nào đứng sau câu trả lời. Tên và ngày đều là chưa kiểm (ý 2).",
          "Tra trong danh mục văn bản quy định chính thức là so với nguồn có thẩm quyền ngoài Claude (ý 3). Đó là bước kiểm thật, và kiểm cả hai chi tiết."
        ] },
      { k: "D", gist: "Turn web search on, ask the same question again, and accept the second answer if it repeats exactly the same date.",
        why: [
          "Bật web search thì hợp lý, notes cũng gợi ý bật để tìm nguồn hiện tại. Nhưng phương án này chấp nhận vì hai lần trả lời trùng nhau, không phải vì đã mở nguồn ra đọc.",
          "Hai lần cùng một ngày chỉ là hai lần Claude viết giống nhau (ý 4). Các lần giống nhau vẫn có thể cùng sai.",
          "Dễ bị cuốn vì có bước bật web search, nghe như đã đi tìm nguồn. Nhưng tiêu chí chấp nhận là “trùng ngày”, nên Claude vẫn là nguồn duy nhất cho một khẳng định về quy định."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D2, mục 4: kiểm là so với nguồn có thẩm quyền ngoài Claude; bảng “trông giống kiểm, nhưng không phải”", href: NOTES + "#l-2-0" },
      { label: "Bài 2.3, mục “Đối chiếu chéo”: chạy lại không bắt được các lần giống nhau mà cùng sai; quy định mới mà không bật công cụ thì coi là có thể bịa", href: NOTES + "#l-2-3" }
    ]
  },
  {
    de: 1, n: 16, total: 60, sub: "2.5", subName: "Sửa output cho đúng người đọc",
    answer: "A",
    ask: "A support lead finds a Claude-drafted troubleshooting article accurate, but pitched at a reading level too advanced for the average customer. Which follow-up instruction best refines the draft without giving up accuracy?",
    scene: [
      "Trưởng nhóm hỗ trợ có một bài hướng dẫn xử lý sự cố do Claude soạn.",
      "Nội dung đúng. Vấn đề là mức chữ quá cao so với khách hàng bình thường.",
      "Chỗ khó: đề đòi hai thứ cùng lúc: dễ đọc hơn, và “without sacrificing accuracy” (không đánh đổi độ chính xác)."
    ],
    asks: [
      "Lời dặn tiếp theo nào sửa bản nháp tốt nhất mà vẫn giữ đúng?",
      "Tức là: đổi cách viết cho hợp người đọc, giữ nguyên nội dung.",
      "Soi từng phương án: nó đổi mức chữ hay đổi nội dung? Và đi về phía người đọc hay ra xa họ?"
    ],
    facts: [
      "Register (giọng, cấp độ ngôn ngữ): mức trang trọng và mức chuyên môn của câu chữ. Hướng dẫn cho kỹ sư khác hướng dẫn cho khách.",
      "Cắt ngắn không sửa được chuyện sai mức từ ngữ. Bản ngắn mà đầy thuật ngữ vẫn khó hiểu.",
      "Độ chính xác áp cho mọi bản. Bản cho người mới được đổi cách giải thích, không được đổi sự thật hay bỏ bớt điều kiện.",
      "Yêu cầu sửa phải làm theo được: nói cụ thể đổi cái gì, không chỉ dùng tính từ."
    ],
    opts: [
      { k: "A", gist: "Rewrite the article with shorter sentences and everyday words, keeping every step accurate.",
        why: [
          "Đúng. Câu ngắn và từ thường ngày là đổi register cho hợp khách (ý 1). Lời dặn cụ thể, Claude làm theo được (ý 4).",
          "“Keeping every step accurate” (giữ mọi bước chính xác) khóa phần nội dung lại (ý 3). Bài dễ đọc hơn mà không mất bước nào."
        ] },
      { k: "B", gist: "Drop the least common troubleshooting steps so the article reads a bit shorter.",
        why: [
          "Sai hướng: vấn đề là mức chữ, không phải độ dài (ý 2). Bỏ bước đi thì các bước còn lại vẫn khó đọc như cũ.",
          "Còn tệ hơn: khách gặp đúng ca hiếm sẽ không có bước để làm theo. Đó là đổi nội dung, trái điều kiện giữ chính xác (ý 3).",
          "Dễ bị cuốn vì ngắn hơn nghe như dễ đọc hơn. Nhưng ngắn và dễ đọc là hai chuyện khác nhau."
        ] },
      { k: "C", gist: "Add more technical detail so customers fully understand the underlying cause.",
        why: [
          "Đi ngược hướng: thêm chi tiết kỹ thuật làm mức chữ còn cao hơn (ý 1).",
          "Khách cần làm theo được các bước, không cần hiểu hết nguyên nhân bên dưới."
        ] },
      { k: "D", gist: "Convert the article into the formal specification format the engineering team uses.",
        why: [
          "Đổi sang register của kỹ sư, tức là viết cho sai hẳn người đọc (ý 1).",
          "Khách bình thường còn khó đọc hơn bản hiện tại."
        ] }
    ],
    refs: [
      { label: "Bài 2.5, mục “Một nội dung, nhiều người đọc”: cắt ngắn không sửa được sai mức từ ngữ, độ chính xác áp cho mọi bản", href: NOTES + "#l-2-5" },
      { label: "Cheatsheet D2, nhóm 2.5: bản nháp lệch người đọc thì nêu thay đổi cụ thể", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 1, n: 17, total: 60, sub: "7.3", subName: "Tối ưu quy trình",
    answer: "CD",
    ask: "For every query, an HR adviser opens a new chat, pastes in the same forty-page benefits manual, and then retypes the same house-style preamble. Which two changes give the biggest gain? (Select two.)",
    scene: [
      "Một chuyên viên tư vấn nhân sự, câu hỏi nào cũng mở một chat mới.",
      "Lần nào cũng dán lại cùng một sổ tay phúc lợi 40 trang, rồi gõ lại cùng một đoạn dặn về văn phong của công ty.",
      "Hai thứ lặp lại ở đây khác loại nhau: sổ tay là tư liệu để tra, đoạn dặn văn phong là cách làm."
    ],
    asks: [
      "Hai thay đổi nào cho lợi lớn nhất?",
      "Tức là: bỏ hẳn hai việc lặp lại, mà Claude vẫn có đủ sổ tay và đủ lời dặn.",
      "Soi từng phương án: nó bỏ được việc lặp lại, chỉ làm việc đó nhẹ đi, hay đổi một thứ không liên quan?"
    ],
    facts: [
      "Project knowledge là tư liệu Claude dùng để trả lời: sổ tay, bảng giá, mẫu văn bản. Project instructions là chỉ dẫn cách làm: giọng, định dạng, người đọc. Cả hai áp cho mọi chat trong Project.",
      "Tải cùng file vào mỗi chat mới là một thứ làm hao hạn mức. Đưa vào project knowledge một lần thì hết lặp lại, và nội dung Project được lưu đệm nên dùng lại tính ít hơn.",
      "“Tiết kiệm” bằng cách cắt bớt tài liệu hay hạ model thì đỡ hạn mức, nhưng output kém đi phải làm lại thì còn tốn hơn.",
      "Một chat kéo qua nhiều việc không liên quan thì lẫn việc. Context rot (context “mục” dần): lịch sử càng dài, Claude nhớ và trích lại càng kém. Chat dài còn tốn hạn mức hơn."
    ],
    opts: [
      { k: "A", gist: "Have Claude condense the manual, then paste that shorter summary in each time instead.",
        why: [
          "Vẫn dán mỗi lần, chỉ dán ít hơn. Việc lặp lại vẫn còn nguyên.",
          "Bản tóm tắt bỏ mất chi tiết. Câu hỏi nào cần đúng đoạn bị bỏ thì Claude không có đoạn đó (ý 3).",
          "Dễ bị cuốn vì nó có vẻ giảm hạn mức ngay. Nhưng đó là tiết kiệm bằng cách bớt thông tin, trong khi Project giữ đủ 40 trang mà không phải dán lại (ý 2)."
        ] },
      { k: "B", gist: "Keep one very long conversation open permanently so the manual always stays in view.",
        why: [
          "Một chat cho mọi câu hỏi không liên quan nhau là lẫn việc (ý 4).",
          "Chat càng dài thì Claude nhớ và trích càng kém, mỗi tin nhắn lại càng tốn hạn mức. Cách này đổi việc dán lại lấy một vấn đề khác."
        ] },
      { k: "C", gist: "Upload the manual once as knowledge in a project used for all of these queries.",
        why: [
          "Đúng. Sổ tay là tư liệu, chỗ của nó là project knowledge (ý 1).",
          "Tải một lần, mọi chat trong Project đều thấy. Hết dán lại, và nội dung Project được lưu đệm (ý 2)."
        ] },
      { k: "D", gist: "Put the house-style preamble into that project's instructions instead of retyping it.",
        why: [
          "Đúng, vì một lý do khác với C. Đoạn dặn văn phong là cách làm, chỗ của nó là project instructions (ý 1).",
          "Viết một lần, áp cho mọi chat. Không còn chuyện quên dặn ở một chat nào đó."
        ] },
      { k: "E", gist: "Switch the queries to a faster model tier so each answer arrives sooner.",
        why: [
          "Câu trả lời tới nhanh hơn, nhưng việc dán sổ tay và gõ lại lời dặn vẫn y nguyên.",
          "Chọn model là chuyện theo độ khó của việc. Ở đây không có dấu hiệu model đang là vấn đề."
        ] }
    ],
    refs: [
      { label: "Bài 7.3, bảng “Cái gì làm hao hạn mức”: tải cùng file vào mỗi chat mới thì đưa vào project knowledge", href: NOTES + "#l-7-3" },
      { label: "Bài 5.1, bảng “Instructions hay knowledge”: cách làm vào instructions, tư liệu vào knowledge", href: NOTES + "#l-5-1" },
      { label: "Bài 3.1: tuần nào cũng dán lại cùng tài liệu, cùng lời dặn thì chuyển sang Project", href: NOTES + "#l-3-1" }
    ]
  },
  {
    de: 1, n: 18, total: 60, sub: "1.2", subName: "Chia việc lớn thành chuỗi bước",
    answer: "D",
    ask: "A researcher has fifteen sets of interview notes and needs to produce the findings section of a report. In which order should she carry out the stages?",
    scene: [
      "Một nhà nghiên cứu có 15 bộ ghi chép phỏng vấn, cần viết phần kết quả (findings) cho báo cáo.",
      "Có bốn chặng: trích đoạn liên quan từ từng bộ ghi chép, gom đoạn trích thành chủ đề, đối chiếu từng chủ đề với ghi chép, viết phần kết quả.",
      "Bốn phương án là bốn cách xếp thứ tự bốn chặng đó."
    ],
    asks: [
      "Nên làm bốn chặng theo thứ tự nào?",
      "Tức là: chặng nào cần output của chặng nào, và bước kiểm đặt ở đâu.",
      "Soi từng phương án: mỗi chặng có đủ đầu vào lúc nó chạy không? Bước kiểm có đứng trước bước viết không?"
    ],
    facts: [
      "Nối chuỗi prompt: chạy các bước theo thứ tự, output đã kiểm của bước trước làm đầu vào của bước sau.",
      "Phần phụ thuộc cần kết quả của phần trước nên phải làm sau. Gom chủ đề cần có đoạn trích. Đối chiếu chủ đề cần có chủ đề.",
      "Lỗi ở bước đầu chảy xuống mọi bước sau. Đặt điểm kiểm ở output trung gian mà nhiều bước sau dựa vào, trước khi đi tiếp."
    ],
    opts: [
      { k: "A", gist: "Write the findings; group extracts into themes; pull extracts from each set of notes; check each theme against the notes.",
        why: [
          "Viết phần kết quả khi chưa có đoạn trích nào, tức là viết kết luận rồi mới đi tìm bằng chứng (ý 2).",
          "Bước kiểm tới sau khi đã viết xong. Lỗi đã nằm trong bản viết, phải lần ngược lại (ý 3).",
          "Dễ bị cuốn vì phương án có đủ bước kiểm ở cuối, nghe chặt chẽ. Nhưng kiểm sau cùng là kiểm muộn nhất, không phải chặt nhất."
        ] },
      { k: "B", gist: "Group extracts into themes; check each theme against the notes; write the findings; pull extracts from each set of notes.",
        why: [
          "Gom chủ đề ở chặng đầu khi chưa có đoạn trích nào để gom (ý 2).",
          "Trích đoạn lại đứng cuối, sau khi đã viết xong. Chặng đó không còn phục vụ gì."
        ] },
      { k: "C", gist: "Check each theme against the notes; pull extracts from each set of notes; write the findings; group extracts into themes.",
        why: [
          "Đối chiếu chủ đề ở chặng đầu khi chưa có chủ đề nào (ý 2).",
          "Gom chủ đề đứng sau cùng, nên phần kết quả được viết khi chưa có chủ đề nào làm nền."
        ] },
      { k: "D", gist: "Pull extracts from each set of notes; group them into themes; check each theme against the notes; write the findings.",
        why: [
          "Đúng. Mỗi chặng nhận đủ đầu vào từ chặng trước (ý 1, 2): đoạn trích → chủ đề → chủ đề đã kiểm → phần kết quả.",
          "Bước kiểm đặt ở output trung gian là các chủ đề, trước khi chúng thành khẳng định trong báo cáo (ý 3). Phần kết quả viết sau cùng, từ chất liệu đã kiểm."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, mục “Một chuỗi trong chat, từng bước” và “Đặt điểm kiểm ở đâu”: phần phụ thuộc làm sau, kiểm output trung gian trước khi đi tiếp", href: NOTES + "#l-1-2" }
    ]
  },
  {
    de: 1, n: 19, total: 60, sub: "5.4", subName: "Giữ cấu hình còn đúng",
    answer: "D",
    ask: "A project owner has received the replacement version of a document that is already in the project's knowledge. Which sequence of steps is correct?",
    scene: [
      "Chủ một project nhận bản mới của một tài liệu đang nằm trong project knowledge.",
      "Có bốn việc: xác định tài liệu cũ, tải bản mới lên, gỡ bản bị thay, hỏi thử một câu mà đáp án đã đổi.",
      "Bốn phương án là bốn cách xếp bốn việc đó."
    ],
    asks: [
      "Thứ tự nào đúng?",
      "Tức là: làm xong thì knowledge chỉ còn bản mới, và có một phép thử xác nhận Claude đang dùng đúng bản mới.",
      "Soi từng phương án: lúc hỏi thử, knowledge đang chứa gì? Có việc nào làm khi chưa đủ thông tin để làm không?"
    ],
    facts: [
      "Tải bản mới lên không làm bản cũ biến mất. Project không tự đánh dấu bản cũ là hết hiệu lực, cũng không từ chối file trùng.",
      "Hai bản cùng chủ đề cùng nằm trong knowledge thì Claude có thể trích bản nào cũng được.",
      "Notes ghi bốn bước thay tài liệu: gỡ bản cũ, tải bản mới, rà instructions xem còn nhắc bản cũ không, rồi hỏi thử một câu mà đáp án đã đổi. Đề không đưa bước rà instructions vào phương án nào."
    ],
    opts: [
      { k: "A", gist: "Upload the replacement; test a question whose answer has changed; identify the outdated document; remove the superseded file.",
        why: [
          "Hỏi thử khi knowledge đang có cả hai bản (ý 1). Claude có thể trích bản nào cũng được (ý 2), nên kết quả thử không nói lên gì.",
          "Gỡ bản cũ sau khi thử, nên trạng thái cuối cùng chưa ai thử.",
          "Dễ bị cuốn vì có bản mới trong tay thì tải lên ngay nghe rất tự nhiên. Nhưng tải lên chưa phải là thay: bản cũ vẫn nằm đó."
        ] },
      { k: "B", gist: "Remove the superseded file; identify the outdated document; test a question whose answer has changed; upload the replacement.",
        why: [
          "Gỡ file trước khi xác định đó là file nào. Dễ gỡ nhầm.",
          "Hỏi thử khi chưa tải bản mới, nên knowledge không còn bản nào về chủ đề đó. Thử như vậy không xác nhận được gì về bản mới."
        ] },
      { k: "C", gist: "Test a question whose answer has changed; remove the superseded file; upload the replacement; identify the outdated document.",
        why: [
          "Thử trước khi sửa gì, nên chỉ thấy lại lỗi cũ.",
          "Xác định tài liệu cũ lại đứng cuối, sau khi đã gỡ. Không biết đã gỡ đúng file chưa."
        ] },
      { k: "D", gist: "Identify the outdated document; upload the replacement; remove the superseded file; test a question whose answer has changed.",
        why: [
          "Đúng. Biết rõ file nào cũ, đưa bản mới vào, gỡ bản cũ để không còn hai bản (ý 1, 2), rồi mới thử.",
          "Thử đặt cuối, khi knowledge chỉ còn bản mới. Câu có đáp án đã đổi cho thấy ngay Claude đang theo bản nào (ý 3).",
          "Notes ghi gỡ trước rồi tải; phương án này tải trước rồi gỡ. Chỗ chấm không nằm ở thứ tự hai bước giữa, mà ở chỗ xác định trước và thử sau cùng, khi chỉ còn một bản."
        ] }
    ],
    refs: [
      { label: "Bài 5.4, mục “Thay một tài liệu: bốn bước”: gỡ bản cũ, tải bản mới, rà instructions, hỏi thử câu có đáp án đã đổi", href: NOTES + "#l-5-4" }
    ]
  },
  {
    de: 1, n: 20, total: 60, sub: "3.1", subName: "Chọn tính năng: chat, Project, Research, artifact",
    answer: "A",
    ask: "A data analyst asks Claude to build a single-page HTML dashboard with an embedded chart of quarterly revenue, and wants to download the finished HTML file. Which feature is designed to produce and export this kind of standalone content?",
    scene: [
      "Một chuyên viên dữ liệu nhờ Claude làm một bảng điều khiển (dashboard) HTML một trang, có biểu đồ doanh thu theo quý.",
      "Làm xong chị muốn tải file HTML đó về.",
      "Chỗ khó: phương án nào cũng là tính năng có thật của Claude. Phải chọn cái được làm ra cho đúng việc này."
    ],
    asks: [
      "Tính năng nào được làm ra để tạo và xuất loại nội dung đứng riêng này?",
      "Tức là: kết quả là một sản phẩm tự đứng được, cần xem, sửa và tải về. Tính năng nào lo việc đó?"
    ],
    facts: [
      "Artifact: nội dung đáng kể, đứng riêng được (thường trên 15 dòng). Claude mở nó ở khung bên cạnh chat để bạn sửa, xem lại, xuất file hoặc chia sẻ.",
      "Help Center liệt kê các loại artifact, trong đó có trang web một trang và bảng điều khiển. Artifact xuất được ra file: Docs ra Word, PDF; Slides ra PowerPoint; mẫu Design xuất được cả HTML.",
      "Project instructions là lời dặn cách làm, áp cho mọi chat trong Project. Research (guide gọi là “research mode”) chạy nhiều lượt tìm trên web và công cụ đã kết nối, rồi viết bản tổng hợp."
    ],
    opts: [
      { k: "A", gist: "Artifacts, which render self-contained content such as HTML pages and let you export or download it.",
        why: [
          "Đúng. Dashboard HTML một trang là nội dung đứng riêng, đáng kể, sẽ xem và dùng tiếp: đúng loại Claude làm thành artifact (ý 1, 2).",
          "Artifact mở ở khung bên cạnh chat để xem, sửa, rồi xuất ra file để tải về."
        ] },
      { k: "B", gist: "A Project's custom instructions, which set Claude's tone for later chats.",
        why: [
          "Instructions là lời dặn cách làm cho các chat trong Project (ý 3). Nó không tạo ra file nào để xem hay tải.",
          "Đề cần một sản phẩm, không cần lời dặn dùng lâu dài."
        ] },
      { k: "C", gist: "Research mode, which searches external sites for existing revenue dashboards.",
        why: [
          "Research đi tìm và tổng hợp thông tin từ nhiều nguồn (ý 3). Đề không cần tìm gì: số liệu là của chị, việc là làm ra một trang HTML.",
          "Tìm dashboard có sẵn trên web cũng không cho chị một file chứa doanh thu của chính công ty mình.",
          "Dễ bị cuốn vì “research mode” là tính năng lớn, có tên trong guide, nghe mạnh. Nhưng nó mạnh ở việc tìm và so nguồn, không phải ở việc tạo và xuất file. Trong app hiện tại tính năng này tên là Research."
        ] },
      { k: "D", gist: "The chat history sidebar, which lists past conversations by date.",
        why: [
          "Đây là chỗ tìm lại các chat cũ.",
          "Đề hỏi tính năng tạo và xuất một file. Danh sách chat cũ không làm việc nào trong hai việc đó."
        ] }
    ],
    refs: [
      { label: "Bài 3.1, mục “Artifact: khi kết quả là sản phẩm để dùng tiếp”: sửa ở khung bên, xuất file, chia sẻ", href: NOTES + "#l-3-1" },
      { label: "Bài 2.6: các loại artifact, có trang web một trang và bảng điều khiển", href: NOTES + "#l-2-6" },
      { label: "Help Center “What are artifacts”: các loại artifact và cách xuất file", href: "https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them" }
    ]
  },
  {
    de: 1, n: 21, total: 60, sub: "6.1", subName: "Việc nào giao cho Claude được",
    answer: "A",
    ask: "As part of everyday development, a software team has Claude review pull requests, propose bug fixes and write unit tests. Engineers review every suggested change before anything is merged. Is this an appropriate use of Claude?",
    scene: [
      "Một team phần mềm dùng Claude trong việc hằng ngày: review pull request (yêu cầu gộp code), gợi ý sửa bug, viết unit test (kiểm thử đơn vị).",
      "Kỹ sư đọc mọi đoạn code Claude gợi ý trước khi merge (gộp vào nhánh chính).",
      "Chỗ khó: hai phương án “No” (không) và một phương án “Yes, but only if” (có, nhưng chỉ khi) viện tới những luật nghe rất cụ thể. Phải biết luật nào có thật."
    ],
    asks: [
      "Dùng Claude như vậy có phù hợp không?",
      "Tức là: việc này thuộc vùng nào trong ba vùng, và có điều kiện bắt buộc nào kèm theo không.",
      "Soi từng phương án: luật hay điều kiện nó viện ra có thật trong Usage Policy không?"
    ],
    facts: [
      "Notes chia việc thành ba vùng. Xanh: dùng bình thường, kiểm như mọi output. Vàng: rủi ro cao, tức lời khuyên hay quyết định về một người cụ thể trong pháp lý, y tế, tài chính, nhà ở, việc làm… Đỏ: Usage Policy cấm.",
      "Phép thử “kiểm được, sửa được”: việc hợp với Claude khi người đủ chuyên môn thấy lỗi trước khi output được dùng, và lỗi lọt qua thì gỡ được với chi phí thấp.",
      "Nhóm việc bị cấm dính tới code là tấn công hệ thống khi không được phép: mã độc, xâm nhập. Còn viết code là việc hằng ngày: hướng dẫn chọn model của Anthropic xếp nó vào nhóm việc của Sonnet.",
      "Help Center khuyên cân nhắc kỹ trước khi đưa mật khẩu và thông tin đăng nhập vào chat. Đây là lời khuyên về dữ liệu đưa vào (bài 6.2), không phải điều kiện để một loại việc được phép."
    ],
    opts: [
      { k: "A", gist: "Yes: reviewing code and generating tests are routine development work, and engineers sign off before anything merges.",
        why: [
          "Đúng. Không có quyết định nào về một người cụ thể, cũng không chạm nhóm bị cấm (ý 1, 3). Đây là vùng xanh.",
          "Kỹ sư đọc từng gợi ý trước khi merge: lỗi được người có chuyên môn thấy trước khi dùng, và chưa merge thì sửa rất rẻ (ý 2)."
        ] },
      { k: "B", gist: "No: the Usage Policy allows AI-assisted code review only for engineering teams that Anthropic has certified.",
        why: [
          "Bịa luật. Usage Policy không có điều kiện “Anthropic-certified” (được Anthropic chứng nhận) nào cho việc review code.",
          "Usage Policy chia việc theo vùng cấm và ca rủi ro cao (ý 1). Nó không cấp phép theo từng team."
        ] },
      { k: "C", gist: "Yes, but only if Claude is turned off for every file that involves production credentials.",
        why: [
          "Gắn thêm một điều kiện bắt buộc không có trong luật. Việc này đã phù hợp đúng như đề kể (ý 1, 2).",
          "Dễ bị cuốn vì nghe rất cẩn thận, và Help Center đúng là khuyên cân nhắc trước khi đưa thông tin đăng nhập vào chat (ý 4). Nhưng đó là cách giữ dữ liệu, không phải điều kiện để review code được phép. Câu trả lời cho đề là “có”, không kèm “only if” (chỉ khi)."
        ] },
      { k: "D", gist: "No: generated unit tests fall outside the development activities that the Usage Policy permits.",
        why: [
          "Bịa luật. Usage Policy không có danh sách “việc lập trình được phép” để loại unit test ra.",
          "Thứ dính tới code mà Usage Policy cấm là tấn công hệ thống khi không được phép (ý 3). Viết test để kiểm code của chính team thì ngược hẳn."
        ] }
    ],
    refs: [
      { label: "Bài 6.1, bảng “Ba vùng, mỗi vùng một câu hỏi” và phép thử “kiểm được, sửa được”", href: NOTES + "#l-6-1" },
      { label: "Usage Policy: danh sách việc bị cấm và yêu cầu cho ca rủi ro cao", href: "https://www.anthropic.com/legal/aup" }
    ]
  },
  {
    de: 1, n: 22, total: 60, sub: "4.5", subName: "Nói với stakeholder về giá trị và giới hạn",
    answer: "A",
    ask: "A stakeholder wants to know why, on the same model, a complex multi-step reasoning task takes longer and costs more than a simple lookup. Which tradeoff should you explain?",
    scene: [
      "Cùng một model, hai việc: một việc lập luận nhiều bước, phức tạp; một việc tra cứu đơn giản.",
      "Việc phức tạp chạy lâu hơn và tốn hơn. Một stakeholder (bên liên quan) hỏi vì sao.",
      "Chỗ khó: đề đã khóa biến model bằng chữ “same model” (cùng model). Lý do không nằm ở tầng model, mà ở lượng suy nghĩ chính việc đó cần."
    ],
    asks: [
      "Nên giải thích sự đánh đổi nào?",
      "Tức là: cái gì làm chi phí và thời gian tăng theo độ khó của việc, trên cùng một model.",
      "Soi từng phương án: nó nói đúng cơ chế, hay đổ cho sự cố, cho may rủi?"
    ],
    facts: [
      "Token là mẩu chữ nhỏ model đọc và viết. Độ dài chat, file, hạn mức đều đo bằng token. Trên API, chi phí là tiền trả theo token; trong app, chi phí là hạn mức bị trừ.",
      "Claude suy nghĩ trước khi trả lời (thinking). Mức effort (Low, Medium, High, Extra high, Max) chỉnh độ kỹ. Help Center: mức cao hơn thì kỹ hơn, chậm hơn, tốn nhiều token và hạn mức hơn.",
      "Help Center liệt kê những thứ làm hao hạn mức, trong đó có mức effort và việc nhiều bước.",
      "Guide không nêu tên tính năng suy nghĩ sâu. Notes chốt cách hiểu khi thi: việc khó thì cho suy nghĩ nhiều hơn, việc dễ thì không cần."
    ],
    opts: [
      { k: "A", gist: "Deeper reasoning uses more tokens and more time, so the settings that lift quality on hard tasks also raise cost.",
        why: [
          "Đúng cơ chế: việc nhiều bước cần suy nghĩ nhiều hơn, tức là sinh nhiều token hơn và chạy lâu hơn (ý 1, 2).",
          "Nói được cả mặt kia của đánh đổi: tăng effort cho việc khó thì chất lượng lên, kèm chi phí và thời gian chờ (ý 2, 3). Stakeholder hiểu vì sao không bật mức cao nhất cho mọi việc."
        ] },
      { k: "B", gist: "Every task costs the same whatever its complexity, so the gap has to come from a network outage.",
        why: [
          "Sai tiền đề: chi phí đi theo lượng token, mà việc phức tạp dùng nhiều token hơn (ý 1, 3).",
          "Đổ cho sự cố mạng là giải thích sai một hành vi bình thường. Lần sau việc khó vẫn tốn hơn, và stakeholder mất lòng tin vào lời giải thích của mày."
        ] },
      { k: "C", gist: "Complex reasoning is always cheaper, because it produces fewer output tokens than a simple lookup.",
        why: [
          "Ngược thực tế: suy nghĩ sâu hơn là sinh nhiều token hơn, không ít hơn (ý 2).",
          "Nó còn mâu thuẫn ngay với dữ kiện đề kể: việc phức tạp đang tốn hơn."
        ] },
      { k: "D", gist: "Latency differences are random and unrelated to how much reasoning a request needs.",
        why: [
          "Sai: effort cao hơn thì chậm hơn (ý 2). Độ trễ (thời gian chờ) đi theo lượng suy nghĩ, không ngẫu nhiên.",
          "Dễ bị cuốn vì notes có nói hỏi hai lần ra hai bản khác chữ là bình thường. Nhưng đó là chuyện câu chữ khác nhau. Việc khó lần nào cũng lâu hơn việc dễ là chênh lệch có hệ thống, có nguyên nhân rõ."
        ] }
    ],
    refs: [
      { label: "Bài 3.3, định nghĩa Effort và mục “Chỉnh effort trước, đổi tầng sau”: mức cao hơn kỹ hơn, chậm hơn, tốn hơn", href: NOTES + "#l-3-3" },
      { label: "Bài 8.3, dòng “Suy nghĩ sâu”: guide không nêu tên, app gọi là thinking và effort", href: NOTES + "#l-8-3" },
      { label: "Help Center, Using extended thinking: các mức effort và cái giá của từng mức", href: "https://support.claude.com/en/articles/10574485-using-extended-thinking" }
    ]
  },
  {
    de: 1, n: 23, total: 60, sub: "3.4", subName: "Context có hạn: chat mới, tóm tắt, lưu lại",
    answer: "D",
    ask: "A project lead sees that three colleagues each re-explain the same programme background to Claude, every week, in their own separate chats. What should she do first?",
    scene: [
      "Ba đồng nghiệp, mỗi người chat riêng với Claude. Tuần nào cũng gõ lại cùng một phần bối cảnh của chương trình (programme).",
      "Trưởng dự án thấy cảnh lặp này và muốn sửa.",
      "Chỗ khó: đề hỏi “first” (trước tiên). Cách sửa quen thuộc là dựng Project dùng chung, nhưng không phương án nào nói thế. Phải tìm bước cần làm trước bước đó."
    ],
    asks: [
      "Việc chị nên làm trước tiên là gì?",
      "Tức là: bối cảnh dùng chung phải được lưu ở chỗ chat của cả nhóm đều thấy, và muốn lưu thì trước hết phải có một bản để lưu.",
      "Soi từng phương án: nó đưa bối cảnh tới chat của cả ba người, hay vẫn kẹt trong chat của từng người?"
    ],
    facts: [
      "Chat sau không thấy chat trước, chat người này không thấy chat người kia. Chỉ thứ đã lưu ra ngoài chat mới đi theo: project knowledge, project instructions, Instructions for Claude, memory.",
      "Tuần nào cũng gõ lại cùng một thứ là dấu hiệu phải lưu. Tài liệu mọi chat của một việc đều cần thì đưa vào project knowledge, chỉ bản hiện hành, đã duyệt. Team và Enterprise chia sẻ được Project trong tổ chức.",
      "Memory ghi các ý về bạn, theo tài khoản của bạn. Notes: memory hợp với ý ngắn về bạn, không phải chỗ đặt thứ cả nhóm phải dùng.",
      "Chat dài được tự tóm tắt, chi tiết đầu chat có thể bị nén. Chat càng dài, mỗi tin nhắn càng tốn hạn mức."
    ],
    opts: [
      { k: "A", gist: "Have each colleague keep a single, very long chat open so their own context builds up over time.",
        why: [
          "Bối cảnh vẫn nằm riêng trong chat của từng người (ý 1). Ba người vẫn là ba bản riêng.",
          "Chat càng dài càng tốn hạn mức, và khi tự tóm tắt thì chi tiết đầu chat có thể bị nén (ý 4). Bối cảnh gõ từ tuần đầu lại là thứ dễ mất nhất."
        ] },
      { k: "B", gist: "Have each colleague summarise their chats every week and send those summaries around by email.",
        why: [
          "Thêm việc tay mỗi tuần mà Claude vẫn không thấy gì: email không nằm trong chat nào (ý 1).",
          "Ba bản tóm tắt của ba người còn dễ lệch nhau, ngược với mục tiêu có một bối cảnh chung."
        ] },
      { k: "C", gist: "Ask Claude to remember the programme background so that nobody has to provide it again.",
        why: [
          "Memory gắn với một tài khoản, ghi ý về chính người đó (ý 3). Nhờ nhớ trong chat của trưởng dự án thì ba đồng nghiệp không được gì.",
          "Dễ bị cuốn vì “nhớ cái này” đúng là một cách lưu có thật trong app. Nhưng thứ cả nhóm cần dùng chung thì phải lưu ở chỗ cả nhóm cùng thấy (ý 2), không phải trong memory của một người."
        ] },
      { k: "D", gist: "Collect the background the team keeps repeating into one agreed set of reference documents.",
        why: [
          "Đúng bước đầu. Muốn lưu bối cảnh chung (ý 2) thì trước hết phải có một bản cả nhóm đồng ý là đúng. Ba người đang kể theo ba kiểu.",
          "Bộ tài liệu này là thứ sẽ đưa vào knowledge của một Project dùng chung. Từ đó chat của ai cũng thấy, không ai phải gõ lại (ý 1, 2)."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, bảng “Mở chat mới, tóm tắt, hay lưu lại”: tài liệu mọi chat đều cần thì lưu vào Project", href: NOTES + "#l-3-4" },
      { label: "Bài 5.1, mục “Chọn tài liệu và đặt tên” và “Chia sẻ với team”: chỉ đưa bản hiện hành, đã duyệt", href: NOTES + "#l-5-1" },
      { label: "Bài 7.2, mục “Đặt cách sửa ở đâu”: memory không phải chỗ đặt thứ cả nhóm dùng", href: NOTES + "#l-7-2" }
    ]
  },
  {
    de: 1, n: 24, total: 60, sub: "4.5", subName: "Nói với stakeholder về giá trị và giới hạn",
    answer: "A",
    ask: "A customer support director needs to justify a Claude-based ticket triage pilot to executives and asks how to frame its value. What is the best way to present the business case?",
    scene: [
      "Giám đốc chăm sóc khách hàng muốn chạy thử (pilot) Claude để phân loại ticket (phiếu yêu cầu hỗ trợ).",
      "Chị phải thuyết phục ban điều hành, và hỏi nên trình bày giá trị của đợt thử thế nào.",
      "Chỗ khó: người nghe là lãnh đạo, họ dựa vào bản trình bày để quyết có làm không. Hứa quá tay hay nói sai trọng tâm đều làm hỏng quyết định đó."
    ],
    asks: [
      "Trình bày business case (lý do kinh doanh) thế nào là tốt nhất?",
      "Tức là: đưa cho lãnh đạo thứ gì để họ quyết được, mà không hứa quá.",
      "Soi từng phương án: nó có đo được không, có so được với cách làm hiện tại không, có hứa điều không ai bảo đảm được không?"
    ],
    facts: [
      "Tiêu chí thành công phải cụ thể, đo được, viết trước khi chạy thử. Người lạ đọc vào chấm được đạt hay trượt.",
      "Báo cáo chạy thử cho lãnh đạo cần số đo trên toàn bộ output, kể cả lỗi: cả giá trị đo được (giờ tiết kiệm) lẫn chi phí giám sát thật (giờ người duyệt).",
      "Hứa biện pháp, không hứa hoàn hảo. Bán cho đúng: người làm cùng Claude, không phải Claude thay người.",
      "Viết cho đúng người đọc. Lãnh đạo ở đây là người duyệt ngân sách và quyết có mở rộng không."
    ],
    opts: [
      { k: "A", gist: "Show concrete metrics, such as average handling time and ticket deflection rate, set against the current process.",
        why: [
          "Đúng. Con số đo được (ý 1) là thứ lãnh đạo dùng để quyết. “Average handling time” (thời gian xử lý trung bình) và “deflection rate” (tỉ lệ ticket được giải quyết mà không phải tới tay nhân viên) là thước đo của chính việc hỗ trợ.",
          "“Compared against the current process” (so với quy trình hiện tại) cho lãnh đạo thấy chênh lệch thật, không phải một con số đứng một mình.",
          "Bản đầy đủ nên kèm thêm tỉ lệ lỗi và giờ người duyệt (ý 2). A mới nêu ví dụ phía giá trị, nhưng đúng hướng: đo được, có mốc để so."
        ] },
      { k: "B", gist: "Present the pilot as certain to remove the whole support team's workload within its first month.",
        why: [
          "Hứa hoàn hảo, và hứa Claude thay người (ý 3). Không ai bảo đảm được điều đó.",
          "Khi lỗi lọt qua hay khối việc không biến mất, lãnh đạo mất lòng tin vào cả dự án, kể cả phần giá trị có thật."
        ] },
      { k: "C", gist: "Present only the model's technical architecture, since executives mostly judge proposals on implementation details.",
        why: [
          "Sai người đọc (ý 4). Lãnh đạo cần biết việc này đem lại gì và tốn gì để quyết, không cần biết model chạy thế nào.",
          "Dễ bị cuốn vì bản trình bày nhiều chi tiết kỹ thuật trông kỹ lưỡng. Nhưng chữ “only” (chỉ) bỏ hẳn phần giá trị đo được (ý 1), đúng thứ đề hỏi."
        ] },
      { k: "D", gist: "Claim the pilot needs no evaluation period, because Claude's output quality never has to be measured.",
        why: [
          "Ngược với chính khái niệm chạy thử: chạy thử là để đo theo tiêu chí viết trước (ý 1).",
          "Không đo thì không có bằng chứng giá trị, cũng không biết phải giữ bao nhiêu giờ người duyệt khi mở rộng (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Báo cáo chạy thử cho trung thực” và “Hứa biện pháp, không hứa hoàn hảo”", href: NOTES + "#l-4-5" },
      { label: "Bài 4.1, bảng bốn tính chất của tiêu chí thành công: cụ thể, đo được, làm được, đúng trọng tâm", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 1, n: 25, total: 60, sub: "3.2", subName: "Haiku, Sonnet, Opus khác nhau ở đâu",
    answer: "BC",
    ask: "A support operations lead has to classify a large daily backlog of short incoming messages, and separately needs one in-depth analysis of a tangled contract dispute. Which two choices fit? (Select two.)",
    scene: [
      "Một trưởng nhóm vận hành hỗ trợ có hai việc khác hẳn nhau.",
      "Việc 1: ngày nào cũng phân loại một đống lớn tin nhắn ngắn gửi tới. Nhiều, đơn giản, cần nhanh.",
      "Việc 2: phân tích sâu một vụ tranh chấp hợp đồng rối rắm, chỉ một lần. Khó, nhiều ràng buộc.",
      "Chỗ khó: đề bắt chọn hai. Hai cái đúng là hai nửa của cùng một cách chia: mỗi việc một tầng."
    ],
    asks: [
      "Hai lựa chọn nào hợp?",
      "Tức là: chọn tầng model theo độ khó và khối lượng của từng việc, không chọn một tầng cho tất cả.",
      "Soi từng phương án: tầng nó chọn có hợp với việc nó gán không, và lý do nó đưa có đúng không?"
    ],
    facts: [
      "Haiku, Sonnet, Opus là ba tầng của cùng một họ model. Lên tầng thì lập luận sâu hơn, nhưng chậm hơn và tốn hạn mức hơn. Haiku nhanh và nhẹ nhất. Opus sâu nhất, chậm và nặng nhất trong ba tầng guide nêu.",
      "Việc đơn giản như phân loại: ba tầng thường cho kết quả gần như nhau. Khác biệt lộ ra ở việc khó: nhiều bước, lập luận dài, nhiều ràng buộc.",
      "Hướng dẫn chọn model của Anthropic: “Using Opus on a task Haiku could handle costs you tokens for no gain and slows you down in the process” (dùng Opus cho việc Haiku làm được là tốn token mà không được gì, lại còn chậm hơn).",
      "Lô việc lẫn lộn thì tách ra: việc dễ cho tầng nhẹ, việc khó cho tầng mạnh."
    ],
    opts: [
      { k: "A", gist: "Use whichever tier the team already has open, because the tier seldom changes what comes back.",
        why: [
          "Gần đúng với việc dễ (ý 2), nhưng sai ở việc khó: vụ tranh chấp chính là chỗ các tầng khác nhau.",
          "Còn bỏ qua tốc độ và hạn mức (ý 1). Tầng đang mở là Opus thì đống phân loại hằng ngày đốt hạn mức. Là Haiku thì vụ tranh chấp thiếu độ sâu."
        ] },
      { k: "B", gist: "Use the deepest-reasoning tier for the contract dispute and accept the larger quota it consumes.",
        why: [
          "Đúng. Vụ tranh chấp rối, nhiều ràng buộc: đúng loại việc mà khác biệt giữa các tầng lộ ra (ý 2).",
          "Tốn hạn mức hơn (ý 1), nhưng chỉ một lần, và phân tích sai thì thiệt nặng. Đáng đổi.",
          "Guide nói ba tầng, nên tầng sâu nhất là Opus. App hiện có thêm Fable 5.1 ở trên Opus; khi thi nghĩ theo ba tầng."
        ] },
      { k: "C", gist: "Use the fastest, cheapest tier for the high-volume classification, where throughput is what matters.",
        why: [
          "Đúng. Nhiều, ngắn, đơn giản, ngày nào cũng có: tầng nhanh, nhẹ làm đủ tốt (ý 2) và đỡ hạn mức (ý 1).",
          "B và C là hai nửa của một cách chia (ý 4): mỗi việc một tầng."
        ] },
      { k: "D", gist: "Use the fastest, cheapest tier for both jobs, since the tiers mostly differ in how quickly they reply.",
        why: [
          "Sai lý do: các tầng khác nhau ở độ sâu lập luận, không chỉ ở tốc độ (ý 1).",
          "Hậu quả: việc khó nhất được giao cho tầng nhẹ nhất. Vụ tranh chấp rối là chỗ tầng nhẹ dễ hụt (ý 2)."
        ] },
      { k: "E", gist: "Use the deepest-reasoning tier for both jobs, since the strongest option is never a bad choice.",
        why: [
          "Phân loại hằng ngày không cần lập luận sâu. Dồn lên tầng nặng là tốn token và chậm hơn mà không được gì (ý 3).",
          "Dễ bị cuốn vì “dùng cái mạnh nhất cho chắc” nghe an toàn. Nhưng hạn mức có hạn: đốt vào việc dễ thì tới lúc cần cho việc khó có khi đã cạn."
        ] }
    ],
    refs: [
      { label: "Bài 3.2, bảng ba tầng và mục “Khoảng cách lộ ra ở việc khó”", href: NOTES + "#l-3-2" },
      { label: "Bài 3.3, mục “Lô việc lẫn lộn: tách theo độ khó”", href: NOTES + "#l-3-3" },
      { label: "Academy, Choosing the right Claude model: chọn tầng cho người dùng app", href: "https://academy.claude.com/tutorials/choosing-the-right-claude-model" }
    ]
  },
  {
    de: 1, n: 26, total: 60, sub: "6.4", subName: "Đạo đức khi dùng AI",
    answer: "C",
    ask: "To cut processing time, a team is considering letting Claude fully automate final housing loan approval decisions, with no human involved at any stage. What is the main ethical risk of this design?",
    scene: [
      "Một team muốn để Claude tự ra quyết định cuối cho hồ sơ vay mua nhà, không có người ở bất kỳ khâu nào.",
      "Mục tiêu là rút ngắn thời gian xử lý.",
      "Chỗ khó: “approval decisions” (quyết định duyệt vay) nghe như chỉ có kết quả tốt. Thật ra hệ thống quyết cả hồ sơ được duyệt lẫn hồ sơ bị từ chối, và mỗi hồ sơ là một người cụ thể."
    ],
    asks: [
      "Rủi ro đạo đức chính của thiết kế này là gì?",
      "Tức là: bỏ hẳn người khỏi một quyết định hệ trọng về từng người thì ai bị hại, và hại thế nào.",
      "Soi từng phương án: nó gọi đúng cái hại chính, hay gọi một chuyện phụ, hay nói là không có hại?"
    ],
    facts: [
      "Usage Policy liệt kê các lĩnh vực rủi ro cao, trong đó có tài chính, tín dụng và nhà ở. Output là quyết định về một người cụ thể trong các lĩnh vực này thì có hai điều kiện bắt buộc.",
      "Hai điều kiện: người có chuyên môn duyệt trước khi quyết định tới người bị ảnh hưởng, có quyền sửa, chịu trách nhiệm; và báo cho người đó là có dùng AI.",
      "Model học từ dữ liệu của con người nên có thể lặp lại khuôn mẫu (bias, thiên lệch). Khi Claude đánh giá người, Claude là một nguồn tham khảo, người quyết.",
      "Bản Usage Policy mới (hiệu lực 12/11/2026) chỉ miễn duyệt trước cho quyết định có lợi hoàn toàn, nơi luật cho phép. Duyệt một phần hay có điều kiện thì không tính."
    ],
    opts: [
      { k: "A", gist: "There is no meaningful risk, because housing loans are not a high-risk category under the policy.",
        why: [
          "Sai sự thật: nhà ở và tín dụng đều nằm trong danh sách rủi ro cao (ý 1).",
          "Dễ bị cuốn vì chữ “approval” (duyệt) gợi tới quyết định có lợi, mà bản Usage Policy mới miễn người duyệt trước cho quyết định có lợi hoàn toàn (ý 4). Nhưng hệ thống này quyết cả ca từ chối, và miễn trừ đó không làm nhà ở thôi là lĩnh vực rủi ro cao."
        ] },
      { k: "B", gist: "The only real risk is slightly higher latency than a workflow with human review.",
        why: [
          "Ngược chiều: tự động hoàn toàn làm nhanh hơn, không chậm hơn. Đó chính là lý do team muốn làm.",
          "Còn bỏ qua cái hại thật: quyết định sai về từng người mà không ai chặn (ý 2)."
        ] },
      { k: "C", gist: "Taking review out of a high-impact decision such as housing lets harm to applicants go unchecked.",
        why: [
          "Đúng. Đây là ca rủi ro cao về từng người (ý 1). Bỏ người duyệt là bỏ đúng điều kiện bắt buộc (ý 2).",
          "Quyết định sai hay thiên lệch (ý 3) tới thẳng người nộp hồ sơ. Không ai thấy lỗi trước khi nó thành thiệt hại, ví dụ một người bị từ chối vay oan."
        ] },
      { k: "D", gist: "The risk is purely a storage question about how long applicant records are retained.",
        why: [
          "Lưu hồ sơ bao lâu là chuyện riêng tư dữ liệu, có thật nhưng là chủ đề khác (bài 6.2).",
          "Chữ “purely” (chỉ thuần là) gạt mất cái hại chính: quyết định hệ trọng không ai duyệt (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 6.1, mục “Vùng vàng: Claude gợi ý, người có chuyên môn quyết” và phần Biết thêm về bản Usage Policy 2026", href: NOTES + "#l-6-1" },
      { label: "Bài 6.4, mục “Bias và công bằng”: khi Claude đánh giá người, người quyết", href: NOTES + "#l-6-4" },
      { label: "Usage Policy, phần yêu cầu cho ca rủi ro cao", href: "https://www.anthropic.com/legal/aup" }
    ]
  },
  {
    de: 1, n: 27, total: 60, sub: "6.4", subName: "Đạo đức khi dùng AI",
    answer: "B",
    ask: "A fintech startup wants Claude to help loan officers draft explanations of credit decisions, which are then sent to applicants. Under Anthropic's Usage Policy, what must the company do to use Claude responsibly in this high-risk setting?",
    scene: [
      "Một startup fintech (công nghệ tài chính) cho Claude giúp cán bộ tín dụng soạn thư giải thích quyết định tín dụng.",
      "Thư này sẽ gửi tới người nộp hồ sơ. Đề đã nói sẵn đây là ca “high-risk” (rủi ro cao).",
      "Chỗ khó: ba phương án sai đều có một bước nghe có trách nhiệm: câu miễn trừ, giữ nội bộ, lưu log rồi kiểm định kỳ."
    ],
    asks: [
      "Theo Usage Policy, công ty phải làm gì?",
      "Tức là: ca rủi ro cao bắt buộc những gì, và phương án nào có đủ.",
      "Soi từng phương án: có người có chuyên môn duyệt từng thư trước khi gửi không, và người nhận có được báo là có dùng AI không?"
    ],
    facts: [
      "Tín dụng và tài chính thuộc nhóm rủi ro cao. Thư giải thích quyết định gửi cho một người nộp hồ sơ là output về một người cụ thể.",
      "Hai điều kiện bắt buộc: người có chuyên môn duyệt từng ca trước khi tới người nhận, có quyền sửa, chịu trách nhiệm; và báo rõ cho người nhận là có dùng AI.",
      "Một điều kiện không thay được điều kiện kia. Nhãn “do AI tạo” không thay người duyệt. Kiểm mẫu sau khi đã gửi không tính là duyệt trước.",
      "Nằm ngoài diện này chỉ có nháp và tóm tắt nội bộ chưa phải khuyến nghị cuối. Thứ đã gửi tới người nộp thì không còn là nội bộ."
    ],
    opts: [
      { k: "A", gist: "Put a disclaimer in the system prompt and skip further review, since the disclaimer meets the policy's obligations.",
        why: [
          "Có thể coi là một kiểu công khai, nhưng không ai duyệt (ý 2). Công khai không thay được người duyệt (ý 3).",
          "Câu miễn trừ cũng không chuyển trách nhiệm đi đâu. Thư sai vẫn tới tay người nộp."
        ] },
      { k: "B", gist: "Have a loan officer review every explanation before it goes out, and tell applicants that AI helped draft it.",
        why: [
          "Đúng, đủ cả hai điều kiện (ý 2). Cán bộ tín dụng là người có chuyên môn, duyệt từng thư trước khi gửi.",
          "Người nộp được biết có dùng AI. Claude vẫn làm phần soạn, nên vẫn nhanh hơn viết tay."
        ] },
      { k: "C", gist: "Keep Claude's drafts internal and leave AI involvement out of every customer-facing message.",
        why: [
          "Tự mâu thuẫn: thư được gửi tới người nộp, nên không còn là nháp nội bộ (ý 4).",
          "Giấu chuyện dùng AI là trái thẳng điều kiện công khai (ý 2). Phương án cũng không nói ai duyệt."
        ] },
      { k: "D", gist: "Log every generated explanation for six months and rely on periodic audits instead of reviewing each decision.",
        why: [
          "Kiểm định kỳ là kiểm sau khi thư đã tới người nộp (ý 3). Lỗi đã thành hại rồi mới bị phát hiện. Phương án cũng không có bước báo cho người nộp.",
          "Dễ bị cuốn vì lưu log và kiểm định kỳ nghe rất bài bản, giống quy trình tuân thủ. Nhưng Usage Policy đòi duyệt từng ca trước khi gửi, không phải soát lại sau."
        ] }
    ],
    refs: [
      { label: "Bài 6.1, bảng “Bốn cách duyệt thư từ chối bồi thường”: chỉ cách duyệt trước, có chuyên môn, có công khai là đạt", href: NOTES + "#l-6-1" },
      { label: "Bài 6.4, bảng “Khi nào phải nói là có dùng AI”", href: NOTES + "#l-6-4" },
      { label: "Usage Policy, phần yêu cầu cho ca rủi ro cao", href: "https://www.anthropic.com/legal/aup" }
    ]
  },
  {
    de: 1, n: 28, total: 60, sub: "4.4", subName: "Đưa Claude vào quy trình đang chạy",
    answer: "BC",
    ask: "A research team spends a large share of every week copying findings by hand between four separate documents. Which two responses fit this situation best? (Select two.)",
    scene: [
      "Một nhóm nghiên cứu mất nhiều thời gian mỗi tuần chép tay kết quả qua lại giữa bốn tài liệu.",
      "Cùng một kết quả nằm ở bốn chỗ, tuần nào cũng phải chép cho khớp.",
      "Chỗ khó: ba phương án sai đều cho Claude làm gì đó để nhanh hơn. Đề đòi nhìn ra chính việc chép là thứ thừa."
    ],
    asks: [
      "Hai cách phản hồi nào hợp nhất?",
      "Tức là: nên augment (bổ trợ, làm nhanh bước đang có) hay redesign (thiết kế lại quy trình).",
      "Soi từng phương án: nó bỏ được việc chép, hay chỉ làm việc chép nhanh hơn?"
    ],
    facts: [
      "Augment khi cấu trúc có lý do: chuỗi duyệt do luật bắt, checklist đội đang dựa vào. Khi đó làm nhanh phần nuôi bước ấy, giữ nguyên cấu trúc.",
      "Redesign khi chính các bước là lãng phí, ví dụ chép cùng một kết quả sang bốn tài liệu. Sửa quy trình sinh ra output, không sửa từng output.",
      "Chọn cách đơn giản nhất chạy được. Khóa Workflow Integration của Anthropic: “when the wrong steps are automated, it can backfire” (tự động hóa nhầm bước thì có thể gây hại ngược)."
    ],
    opts: [
      { k: "A", gist: "Add a fifth document in which Claude records each week what it copied into the other four.",
        why: [
          "Thêm một tài liệu nữa phải giữ. Lãng phí tăng chứ không giảm (ý 2).",
          "Việc chép vẫn còn nguyên, chỉ có thêm cuốn sổ ghi lại việc chép."
        ] },
      { k: "B", gist: "Treat the copying itself as the thing to redesign, instead of just speeding it up as it is.",
        why: [
          "Đúng. Chép cùng một kết quả sang bốn chỗ là đúng ví dụ notes dùng cho redesign (ý 2).",
          "Đề không nói luật hay lý do nào bắt giữ bốn bản (ý 1), nên không có cấu trúc nào đáng giữ để augment."
        ] },
      { k: "C", gist: "Have Claude merge the four documents into one source that the team then maintains together.",
        why: [
          "Đúng. Đây là redesign cụ thể: chỉ còn một nguồn thì không còn gì để chép (ý 2).",
          "Claude làm phần gộp một lần. Nhóm giữ một tài liệu, không phải bốn.",
          "B là nguyên tắc, C là cách làm theo nguyên tắc đó."
        ] },
      { k: "D", gist: "Keep all four documents and have Claude update each of them twice as fast.",
        why: [
          "Augment một bước không đáng giữ (ý 1, 2). Bốn bản vẫn còn, vẫn có thể lệch nhau.",
          "Làm nhanh một việc thừa thì vẫn là việc thừa."
        ] },
      { k: "E", gist: "Have Claude carry out the copying between all four documents for the team every week.",
        why: [
          "Tự động hóa đúng bước lãng phí (ý 3). Bốn bản vẫn còn, Claude chép sai một chỗ là các bản lệch nhau mà không ai thấy.",
          "Dễ bị cuốn vì nhóm được giải phóng khỏi việc chép ngay lập tức. Nhưng đó vẫn là làm nhanh từng output, không sửa quy trình sinh ra output (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 4.4, mục “Bổ trợ hay thiết kế lại quy trình” và bảng ví dụ phòng nghiên cứu chép tay vào bốn báo cáo", href: NOTES + "#l-4-4" },
      { label: "Bài Nền tảng D4: augment và redesign là gì", href: NOTES + "#l-4-0" }
    ]
  },
  {
    de: 1, n: 29, total: 60, sub: "2.3", subName: "Kiểm từng khẳng định",
    answer: "B",
    ask: "A teacher wants her students to be able to check, on their own, the claims made in a study guide that Claude helped draft. What should she build into the guide?",
    scene: [
      "Một giáo viên có bản tài liệu ôn tập do Claude soạn nháp.",
      "Cô muốn học sinh tự kiểm được từng điều tài liệu nói.",
      "Chỗ khó: cả bốn phương án đều thêm thứ nghe như minh bạch: ghi chú có dùng AI, danh mục nguồn, điểm tự tin. Chỉ một cái cho học sinh kiểm được một câu cụ thể."
    ],
    asks: [
      "Cô nên đưa gì vào tài liệu?",
      "Tức là: thứ gì cho người đọc tự mở nguồn ra và đối chiếu được từng khẳng định.",
      "Soi từng phương án: học sinh cầm một câu trong tài liệu, có biết phải xem ở đâu để kiểm câu đó không?"
    ],
    facts: [
      "Claim (khẳng định) là một câu nói một điều có thể đúng hoặc sai. Kiểm là tách từng khẳng định, so với nguồn, và ghi nguồn của từng khẳng định để người khác kiểm lại được.",
      "Citation (trích dẫn nguồn) là con trỏ tới một chỗ trong nguồn: link, số trang, đoạn văn. Nó cho biết xem ở đâu.",
      "Độ tự tin Claude tự báo “is not a reliable accuracy signal” (không phải tín hiệu đáng tin về độ chính xác).",
      "Báo là có dùng AI là chuyện thành thật với người cần biết (Transparency Diligence). Nó không phải một cách kiểm."
    ],
    opts: [
      { k: "A", gist: "A note at the front stating that parts of the guide were drafted with Claude's help.",
        why: [
          "Thành thật, nên làm (ý 4). Nhưng không giúp kiểm câu nào.",
          "Học sinh biết có AI tham gia, vẫn không biết câu nào đúng, phải xem ở đâu."
        ] },
      { k: "B", gist: "Each claim paired with the exact source and page where a student can find it.",
        why: [
          "Đúng. Mỗi khẳng định kèm nguồn và số trang (ý 1, 2). Học sinh mở đúng trang đó ra là đối chiếu được.",
          "Kiểm ở cấp từng khẳng định, đúng thứ đề đòi: “check the claims … for themselves” (tự kiểm các khẳng định)."
        ] },
      { k: "C", gist: "A list at the back of every source that was consulted while the guide was written.",
        why: [
          "Có nguồn thật, nhưng không gắn với câu nào (ý 1). Học sinh không biết nguồn nào ủng hộ câu nào, hay câu nào chẳng có nguồn.",
          "Dễ bị cuốn vì danh mục tài liệu tham khảo trông giống “đã ghi nguồn”. Nhưng nó trỏ tới cả cuốn sách, không trỏ tới chỗ ủng hộ một câu cụ thể (ý 2)."
        ] },
      { k: "D", gist: "A confidence rating beside each claim showing how sure Claude was when it wrote that claim.",
        why: [
          "Vẫn là Claude tự chấm Claude (ý 3). Học sinh không có gì bên ngoài để đối chiếu điểm đó.",
          "Câu sai vẫn có thể nghe rất chắc chắn, nên điểm cao không chứng minh gì."
        ] }
    ],
    refs: [
      { label: "Bài 2.3, khái niệm Citation và mục “Sau khi Claude viết: kiểm từng khẳng định”", href: NOTES + "#l-2-3" },
      { label: "Bài 0.3, luật 1: độ tự tin của Claude không phải bằng chứng", href: NOTES + "#l-0-3" }
    ]
  },
  {
    de: 1, n: 30, total: 60, sub: "7.2", subName: "Chỉnh theo phản hồi",
    answer: "A",
    ask: "A team has made three changes in a row to a shared instruction. Output is now clearly worse than before those changes, and no one knows which change caused it. What is the most appropriate response?",
    scene: [
      "Một nhóm sửa một chỉ dẫn dùng chung ba lần liên tiếp.",
      "Giờ output tệ hẳn so với trước khi sửa, và không ai biết lần sửa nào gây ra.",
      "Chỗ khó: ba thay đổi chồng lên nhau, nên đứng ở bản hiện tại thì không tách được thủ phạm."
    ],
    asks: [
      "Cách phản hồi phù hợp nhất là gì?",
      "Tức là: vừa lấy lại chất lượng, vừa tìm ra thay đổi nào gây hỏng.",
      "Soi từng phương án: nó bớt biến số, hay thêm biến số?"
    ],
    facts: [
      "Vòng chẩn đoán: mỗi vòng đổi đúng một thứ, chạy lại cùng input, không tốt hơn thì hoàn tác. Đổi một thứ thì khi output khác đi, biết ngay vì sao.",
      "Chất lượng tụt ngay sau một thay đổi đã biết gọi là hồi quy (regression). Cách xác nhận rẻ nhất: khôi phục bản cũ, chạy lại cùng việc.",
      "Chồng thêm chỉ dẫn lên chỗ đáng ngờ dễ tạo ra hai luật cãi nhau. Giữ lại một thay đổi vô ích là cộng thêm một biến số.",
      "Claude không biết bản trước tốt hơn ở đâu. Đừng chỉ hỏi Claude bản nào tốt hơn; so trên input thật với chuẩn đạt."
    ],
    opts: [
      { k: "A", gist: "Go back to the last version that worked, then bring the changes back one at a time.",
        why: [
          "Đúng. Khôi phục bản tốt gần nhất là lấy lại chất lượng ngay (ý 2).",
          "Đưa lại từng thay đổi một, chạy lại cùng input sau mỗi lần (ý 1). Lần nào làm tụt thì đó là thủ phạm."
        ] },
      { k: "B", gist: "Add a fourth change designed to cancel out whatever the first three did.",
        why: [
          "Thêm biến số thứ tư khi ba cái cũ còn chưa tách được (ý 3).",
          "May mà sửa được triệu chứng thì chỉ dẫn càng rối hơn, lần sau hỏng nữa càng khó tìm."
        ] },
      { k: "C", gist: "Keep the current version and have reviewers correct the output by hand.",
        why: [
          "Gánh hậu quả mãi: chỉ dẫn hỏng vẫn nằm đó, áp cho mọi người dùng chung.",
          "Không tìm gốc, không sửa gốc. Mỗi output là thêm một lần sửa tay."
        ] },
      { k: "D", gist: "Ask Claude which of the three changes it believes did the most damage to the output.",
        why: [
          "Claude không biết output trước đây tốt hơn ở đâu với việc của nhóm này (ý 4). Câu trả lời chỉ là đoán.",
          "Dễ bị cuốn vì nghe nhanh, khỏi phải chạy lại. Nhưng chỉ chạy lại từng thay đổi trên cùng input mới cho bằng chứng (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 7.2, bảng “Khớp cần gạt với bằng chứng” và dạng 2 “chất lượng tụt sau một chỉnh sửa”", href: NOTES + "#l-7-2" },
      { label: "Bài Nền tảng D7, mục 4 “Vòng chẩn đoán: đổi một thứ, chạy lại cùng input”", href: NOTES + "#l-7-0" }
    ]
  },
  {
    de: 1, n: 31, total: 60, sub: "1.4", subName: "Đổi cách prompt theo loại việc",
    answer: "A",
    ask: "An engineer wants Claude to work out why a distributed system drops requests now and then. Getting to the answer means tracing several causes that interact with each other before any conclusion can be drawn. Which approach suits this analytical task best?",
    scene: [
      "Một kỹ sư nhờ Claude tìm lý do hệ thống phân tán thỉnh thoảng làm rơi request.",
      "“Intermittently” (lúc có lúc không): lỗi không lặp lại đều, nên không có một dấu vết rõ để chỉ thẳng vào.",
      "Chỗ khó: đề nói rõ có nhiều nguyên nhân tác động qua lại. Muốn kết luận phải đi qua nhiều bước, nối từng nguyên nhân với triệu chứng."
    ],
    asks: [
      "Cách nào hợp nhất với việc phân tích này?",
      "Tức là: loại việc này cần Claude làm gì trước khi đưa câu trả lời cuối.",
      "Soi từng phương án: nó cho Claude đi hết chuỗi nhân quả, hay cắt ngang chuỗi đó?"
    ],
    facts: [
      "Việc phân tích đòi kết luận nào cũng trỏ về được chứng cứ. Hỏng hay gặp là kết luận mà dữ liệu không đỡ được (bài 1.4).",
      "Thinking (suy nghĩ) cho Claude chia nhỏ vấn đề, lên kế hoạch, thử vài hướng rồi mới trả lời. Help Center ghi nó giúp nhiều nhất ở việc khó, ví dụ “Detailed document analysis” (phân tích tài liệu chi tiết) và “Multi-step technical problems” (bài toán kỹ thuật nhiều bước). Guide không gọi tên tính năng này; ý của guide là việc khó thì cho Claude suy nghĩ nhiều hơn.",
      "Phân tích nhiều bước mà sai ở giữa là dấu hiệu việc cần lập luận sâu hơn hoặc cần chia bước. Cách sửa: chia bước, hoặc tăng effort (mức suy nghĩ kỹ) (bài 7.1)."
    ],
    opts: [
      { k: "A", gist: "Let Claude work through the multi-step causal reasoning before it gives its final answer.",
        why: [
          "Cho Claude đi hết chuỗi: từng nguyên nhân, chúng tác động nhau ra sao, rồi mới kết luận. Đây đúng là loại việc thinking giúp nhiều nhất (ý 2).",
          "Kết luận cuối nối được với từng bước lập luận, nên kỹ sư kiểm lại được từng mắt xích (ý 1). Kết luận sai thì mở phần tóm tắt suy nghĩ để tìm bước sai (ý 3)."
        ] },
      { k: "B", gist: "Ask for a one-sentence answer, with no reasoning about any of the causes.",
        why: [
          "Sai: bắt Claude bỏ đúng phần việc đề cần, là lần qua nhiều nguyên nhân tác động nhau (ý 2).",
          "Một câu kết luận không kèm lập luận thì kỹ sư không có gì để kiểm (ý 1). Nhanh, nhưng vô dụng với một lỗi lúc có lúc không."
        ] },
      { k: "C", gist: "Ask Claude to guess the single most likely cause without looking at how the causes interact.",
        why: [
          "Sai ở giả định: đề đã nói lỗi đến từ nhiều nguyên nhân tác động nhau. Đoán một nguyên nhân là bỏ qua đúng phần tác động đó.",
          "Kết quả là một kết luận dữ liệu không đỡ được, kiểu hỏng điển hình của việc phân tích (ý 1). Sửa theo nó có thể không hết lỗi, vì lỗi chỉ hiện khi vài điều kiện gặp nhau."
        ] },
      { k: "D", gist: "Ask Claude to list every possible cause without connecting any of them to the symptom.",
        why: [
          "Sai: danh sách nguyên nhân chưa phải phân tích. Nó không nói nguyên nhân nào gây ra triệu chứng này, và chúng gặp nhau thế nào (ý 1).",
          "Kỹ sư vẫn phải tự làm phần khó nhất: nối nguyên nhân với triệu chứng.",
          "Dễ bị cuốn vì “every possible cause” (mọi nguyên nhân có thể) nghe kỹ và đủ. Nhưng rộng không thay được việc lập luận từng bước mà đề đòi."
        ] }
    ],
    refs: [
      { label: "Bài 1.4: việc phân tích cần kết luận trỏ về chứng cứ; mỗi loại việc nhấn một phần khác nhau", href: NOTES + "#l-1-4" },
      { label: "Bài 7.1, bảng triệu chứng: phân tích nhiều bước sai ở giữa thì cần lập luận sâu hơn, chia bước, tăng effort", href: NOTES + "#l-7-1" },
      { label: "Help Center “Using extended thinking”: thinking cho Claude chia nhỏ vấn đề trước khi trả lời, giúp nhiều nhất ở việc nhiều bước", href: "https://support.claude.com/en/articles/10574485-using-extended-thinking" }
    ]
  },
  {
    de: 1, n: 32, total: 60, sub: "1.3", subName: "Lặp prompt: chẩn đoán, đổi một chỗ, thử lại",
    answer: "BE",
    ask: "A communications officer gets a first draft from Claude that is accurate but much too shallow for the briefing it is meant for. Which two follow-up actions are most likely to make the second attempt better? (Select two.)",
    scene: [
      "Một cán bộ truyền thông nhờ Claude soạn bản briefing (bản tóm lược để báo cáo).",
      "Bản nháp đầu đúng, nhưng nông quá so với buổi briefing cần.",
      "Chỗ khó: bản nháp không sai chỗ nào. Nó thiếu độ sâu. Phải đoán đúng vì sao nó nông thì mới sửa trúng."
    ],
    asks: [
      "Hai việc nào nhiều khả năng làm bản thứ hai tốt hơn?",
      "Tức là: hai thay đổi nào đưa thêm cho Claude đúng thứ nó đang thiếu để viết sâu hơn.",
      "Soi từng phương án: nó thêm thông tin mới vào prompt, hay chỉ đổi chữ, thêm nhấn mạnh, gửi lại?"
    ],
    facts: [
      "Output chung chung, nông thường do prompt thiếu bối cảnh cụ thể và không nói cần sâu tới đâu. Cách sửa: thêm chi tiết của bạn, nói rõ độ sâu, thêm ví dụ (bài 1.3).",
      "Gõ lại y nguyên hay “viết hay hơn đi” không sửa gì: điều kiện gây ra bản yếu vẫn còn nguyên. Viết hoa, thêm chữ nhấn mạnh cũng chỉ thêm nhấn mạnh, không thêm thông tin.",
      "Với việc soạn thảo, mẫu thật đáng tin hơn tả bằng tính từ. Dữ kiện thật (số liệu, tên, ngày) là thứ chỉ người viết có (bài 1.4).",
      "Chê chung kiểu “chưa đúng, làm lại đi” bắt Claude đoán sai ở đâu. Phản hồi dùng được phải nói rõ chỗ sai (bài 7.2)."
    ],
    opts: [
      { k: "A", gist: "Resend exactly the same prompt and hope the next try comes out stronger.",
        why: [
          "Sai: prompt không đổi thì điều kiện gây ra bản nông vẫn nguyên (ý 2).",
          "Bản sau có thể khác chữ, nhưng vẫn thiếu đúng những số liệu, chi tiết mà briefing cần. Có tốt lên thì cũng do may."
        ] },
      { k: "B", gist: "Provide the figures and case details the briefing must cover, which the original prompt left out.",
        why: [
          "Gốc của bản nông là thiếu chất liệu: Claude không viết sâu được về số liệu và vụ việc nó chưa được đưa (ý 1, 3).",
          "Thêm đúng những dữ kiện đó là sửa thẳng vào nguyên nhân. Bản thứ hai có cái để đi sâu."
        ] },
      { k: "C", gist: "Tack “be thorough and detailed” onto the end of the original request.",
        why: [
          "Sai: chỉ thêm chữ nhấn mạnh, không thêm thông tin (ý 2). “Thorough” (kỹ lưỡng) không nói sâu tới đâu, sâu về cái gì.",
          "Claude vẫn không có số liệu, vụ việc nào mới. Bản sau có thể dài hơn, nhưng dài bằng chữ chung chung.",
          "Dễ bị cuốn vì notes cũng dặn nói rõ độ sâu (ý 1). Nhưng nói độ sâu là chỉ ra mức cụ thể, hoặc đưa một mẫu. Một tính từ chung chung thì không phải."
        ] },
      { k: "D", gist: "Tell Claude the draft was disappointing and ask it to try much harder.",
        why: [
          "Sai: chê chung, không nói chỗ nào nông, thiếu cái gì (ý 4).",
          "Claude phải đoán, nên bản sau đổi lung tung chứ không sâu hơn theo hướng cần."
        ] },
      { k: "E", gist: "Share a passage from last quarter's briefing as an example of the depth expected.",
        why: [
          "Mẫu thật cho Claude thấy “sâu” trông thế nào, điều mà tính từ không làm được (ý 1, 3).",
          "Cách này dùng được cả khi người viết khó tả mức độ sâu bằng lời."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, bảng triệu chứng: chung chung, nông thì thêm chi tiết, nói rõ độ sâu, thêm ví dụ; gõ lại hay viết hoa không phải là sửa", href: NOTES + "#l-1-3" },
      { label: "Bài 1.4, phần soạn thảo: dán bài cũ làm mẫu, đưa dữ kiện thật chỉ bạn có", href: NOTES + "#l-1-4" }
    ]
  },
  {
    de: 1, n: 33, total: 60, sub: "3.2", subName: "Haiku, Sonnet, Opus khác nhau ở đâu",
    answer: "C",
    ask: "A new team member wants to know how the Claude model tiers differ, as experienced by someone using the Claude app. Which description is accurate?",
    scene: [
      "Một người mới vào hỏi các tầng model Claude khác nhau thế nào.",
      "Góc nhìn là người dùng app: không bàn giá API, chỉ bàn trả lời sâu hay nông, nhanh hay chậm, tốn hạn mức cỡ nào.",
      "Chỗ khó: cả bốn phương án đều nhắc đủ ba tầng. Chỗ sai nằm ở chỗ xếp tầng nào sâu, tầng nào nhanh, hoặc gán cho một tầng việc nó không chuyên."
    ],
    asks: [
      "Mô tả nào đúng?",
      "Tức là: ghép đúng từng tầng với vị trí của nó trên trục sâu, nhanh, tốn hạn mức."
    ],
    facts: [
      "Ba tầng là ba cỡ của cùng một họ model, trên cùng một trục: lên tầng thì lập luận sâu hơn nhưng chậm hơn, tốn hạn mức hơn.",
      "Haiku nhanh nhất, nhẹ hạn mức nhất. Sonnet là tầng giữa, dùng hằng ngày; Anthropic khuyên chọn Sonnet khi chưa biết chọn gì. Opus lập luận sâu nhất trong ba tầng guide nêu, chậm hơn và tốn hạn mức hơn.",
      "Ba tầng cùng nhận chữ và ảnh, cùng dùng tool. Không tầng nào chuyên một ngành hay một loại đầu vào.",
      "Việc đơn giản thì ba tầng cho kết quả gần như nhau. Khác biệt lộ ra ở việc khó: nhiều bước, lập luận dài."
    ],
    opts: [
      { k: "A", gist: "Haiku reasons most deeply, Sonnet is the quickest, and Opus is meant for routine bulk work.",
        why: [
          "Sai: đảo ngược cả trục (ý 1, 2). Haiku là tầng nhanh, nhẹ; Opus mới là tầng lập luận sâu.",
          "Làm theo mô tả này thì việc dễ, số lượng lớn sẽ chạy trên Opus, đốt hạn mức nhanh nhất cho việc không cần."
        ] },
      { k: "B", gist: "All tiers give the same answers and differ only in how quickly the answer comes back.",
        why: [
          "Sai: tốc độ chỉ là một trục. Độ sâu lập luận khác nhau thật (ý 1).",
          "Dễ bị cuốn vì với việc đơn giản, ba tầng ra gần như nhau thật (ý 4). Nhưng ở việc khó thì khoảng cách lộ ra, và đó chính là lý do phải chọn tầng."
        ] },
      { k: "C", gist: "Opus reasons most deeply and draws more of the usage allowance, Sonnet is the capable default, and Haiku is the fastest.",
        why: [
          "Đúng cả ba vị trí trên trục (ý 1, 2): Opus sâu nhất và tốn hạn mức hơn, Sonnet cân bằng làm mặc định, Haiku nhanh nhất.",
          "Mô tả bằng đúng những thứ người dùng app cảm nhận được: độ sâu, tốc độ, hạn mức bị trừ."
        ] },
      { k: "D", gist: "Sonnet reasons most deeply, Opus is the everyday default, and Haiku only handles images.",
        why: [
          "Sai: đổi chỗ Sonnet và Opus (ý 2).",
          "Haiku không phải model riêng cho ảnh. Ba tầng cùng nhận chữ và ảnh (ý 3); Haiku là model nhanh cho việc đơn giản nói chung."
        ] }
    ],
    dispute: "Đề gốc chấm C, giữ nguyên. Lưu ý: app hiện có thêm Fable 5.1 ở trên Opus, nên “Opus reasons most deeply” (Opus lập luận sâu nhất) chỉ đúng trong ba tầng guide v1.0 nêu. Khi thi nghĩ theo ba tầng của guide.",
    refs: [
      { label: "Bài 3.2: ba tầng trên cùng một trục sâu, nhanh, hạn mức; cái giống nhau không giúp chọn", href: NOTES + "#l-3-2" },
      { label: "Bài 8.3: guide có ba tầng, app có thêm Fable; khi thi trả lời theo guide", href: NOTES + "#l-8-3" }
    ]
  },
  {
    de: 1, n: 34, total: 60, sub: "7.2", subName: "Chỉnh theo phản hồi",
    answer: "C",
    ask: "A change made to a shared project's instructions has clearly produced better results over several weeks. What most reliably keeps that improvement in place for everyone on the team?",
    scene: [
      "Một team dùng chung một Project. Có người sửa project instructions, và kết quả tốt lên rõ suốt mấy tuần.",
      "Cách sửa đã nằm sẵn trong instructions, nên đang áp cho mọi chat của mọi người.",
      "Chỗ khó: đề không hỏi “áp cho cả team thế nào”, mà hỏi “giữ cho nó còn ở đó”. Rủi ro là về sau có người sửa lại, gỡ đi mà không biết vì sao nó có mặt."
    ],
    asks: [
      "Cách nào giữ cải thiện đó bền nhất cho cả team?",
      "Tức là: làm sao để thay đổi không bị mất khi đổi người, đổi người phụ trách, hay khi có người rà lại instructions.",
      "Soi từng phương án: nó giữ lại chính thay đổi kèm lý do, hay chỉ giữ kết quả, hoặc bắt người dùng làm tay?"
    ],
    facts: [
      "Project instructions áp cho mọi chat trong Project, của mọi người trong Project. Lời dặn phải gõ lại ở mọi chat là dấu hiệu nó cần được lưu vào đó (bài 7.2).",
      "Instructions cũng được rà lại định kỳ: xóa quy tắc hết hạn, sửa chỗ mâu thuẫn (bài 5.4).",
      "Notes bài 5.4 dặn ghi thay đổi ở chỗ người dùng thấy, ví dụ phần mô tả Project: người dùng đọc được, Claude không đọc nên không lẫn vào câu trả lời. Mỗi mảng có một người phụ trách."
    ],
    opts: [
      { k: "A", gist: "Let the colleague who first reported the problem know that it has been fixed.",
        why: [
          "Báo lại cho người báo lỗi là việc nên làm, nhưng không giữ được gì.",
          "Thay đổi vẫn chỉ nằm trong instructions, không ai khác biết nó có mặt vì sao. Người rà lần sau có thể gỡ nó (ý 2)."
        ] },
      { k: "B", gist: "Keep a copy of the improved output to show anyone who asks about it.",
        why: [
          "Sai: bản output cho thấy kết quả, không ghi cái gì đã tạo ra kết quả đó.",
          "Ai đó sửa instructions làm mất dòng đã thêm thì bản lưu này không giúp khôi phục."
        ] },
      { k: "C", gist: "Record the change and the reason behind it somewhere the whole team can see.",
        why: [
          "Ghi ở chỗ cả team thấy là đúng cách notes dạy để giữ cấu hình còn đúng (ý 3).",
          "Có lý do đi kèm thì người rà sau biết dòng đó giải quyết chuyện gì, nên không gỡ nhầm khi dọn instructions (ý 2). Đổi người phụ trách, người mới vẫn đọc được.",
          "Thay đổi vẫn tự áp cho mọi chat qua instructions (ý 1); ghi chú giữ cho nó ở lại."
        ] },
      { k: "D", gist: "Remind people in every chat to phrase their requests the improved way.",
        why: [
          "Sai: biến một cách sửa đã tự áp thành việc làm tay ở từng chat (ý 1).",
          "Dựa vào trí nhớ từng người, ai quên là mất. Lời nhắc cũng không nói vì sao instructions có thay đổi đó.",
          "Dễ bị cuốn vì nghe như đang phổ biến cách làm tốt cho cả team. Nhưng phổ biến bằng lời nhắc là đi lùi so với chỗ đã lưu sẵn."
        ] }
    ],
    refs: [
      { label: "Bài 5.4, mục “Người phụ trách, lịch rà soát, báo cho người dùng”: ghi thay đổi ở chỗ người dùng thấy", href: NOTES + "#l-5-4" },
      { label: "Bài 7.2, mục “Đặt cách sửa ở đâu để không phải dặn lại”: instructions áp cho mọi chat, mọi người", href: NOTES + "#l-7-2" }
    ]
  },
  {
    de: 1, n: 35, total: 60, sub: "5.2", subName: "File tải lên và connector",
    answer: "A",
    ask: "A user has turned on the Gmail connector and asks Claude to answer a client's email. Once Claude has drafted the reply, what happens next?",
    scene: [
      "Người dùng đã nối Gmail connector và nhờ Claude trả lời thư của một khách.",
      "Claude đã soạn xong thư trả lời. Đề hỏi bước ngay sau đó.",
      "Chỗ khó: bốn phương án là bốn mức quyền khác nhau, từ “chỉ được soạn nháp” tới “gửi luôn”. Phải nhớ đúng Gmail connector làm được gì, và gửi đi thì ai duyệt."
    ],
    asks: [
      "Soạn xong thì chuyện gì xảy ra?",
      "Tức là: Gmail connector có gửi được không; nếu được thì có cần duyệt không, và ai duyệt."
    ],
    facts: [
      "Gmail connector tìm, đọc, soạn nháp thư. Nó cũng gửi, trả lời, chuyển tiếp được.",
      "Gửi, trả lời, chuyển tiếp: mặc định phải chính người dùng duyệt trước khi thư đi.",
      "Connector cho Claude vào ứng dụng khác để làm việc thay bạn, theo đúng quyền tài khoản của bạn. Nối connector không có nghĩa là giao toàn quyền tự làm.",
      "Trên Team, Enterprise: Owner bật connector cho tổ chức và đặt quyền từng công cụ: Always allow (luôn cho), Needs approval (cần người dùng duyệt), Blocked (chặn). Đó là luật đặt trước, Owner không duyệt từng thư."
    ],
    opts: [
      { k: "A", gist: "Claude can send it, but by default it asks the user to approve before the message goes out.",
        why: [
          "Gửi là thao tác Gmail connector làm được (ý 1), và mặc định cần người dùng duyệt (ý 2).",
          "Người dùng giữ quyền quyết thư nào rời hộp thư, mà không phải chép bản nháp ra gửi tay."
        ] },
      { k: "B", gist: "Claude sends it at once, because authorising a connector authorises every action it offers.",
        why: [
          "Sai ở giả định: nối connector không phải giao quyền tự làm mọi thứ (ý 3).",
          "Gửi, trả lời, chuyển tiếp mặc định có bước duyệt (ý 2). Thư không tự rời hộp thư khi người dùng chưa đồng ý."
        ] },
      { k: "C", gist: "Claude can only leave a draft, because a mail connector is limited to searching and reading.",
        why: [
          "Sai: Gmail connector không chỉ đọc. Nó gửi, trả lời, chuyển tiếp được (ý 1).",
          "Hiểu thế này thì người dùng tự chép bản nháp ra gửi tay, làm thừa một bước."
        ] },
      { k: "D", gist: "Claude holds the message until a workspace administrator approves it.",
        why: [
          "Sai vai: người duyệt là chính người đang nhờ, không phải admin (ý 2).",
          "Dễ bị cuốn vì trên Team, Enterprise, Owner đúng là đặt quyền cho từng công cụ (ý 4). Nhưng đó là đặt luật từ trước. Lúc gửi, hộp duyệt hiện ra cho người dùng, không đi qua admin."
        ] }
    ],
    refs: [
      { label: "Bài 5.2, bảng connector Google Workspace: Gmail gửi được, mặc định phải bạn duyệt; bốn lớp quyền", href: NOTES + "#l-5-2" },
      { label: "Help Center “Use Google Workspace connectors”: gửi, trả lời, chuyển tiếp cần duyệt theo mặc định", href: "https://support.claude.com/en/articles/10166901-use-google-workspace-connectors" }
    ]
  },
  {
    de: 1, n: 36, total: 60, sub: "7.1", subName: "Chẩn đoán output kém",
    answer: "D",
    ask: "A supervisor decides that his team's weak summaries come from a limitation of the model and asks for budget to move everyone to the most capable tier. He has never looked at the instruction the team uses. What is the biggest risk?",
    scene: [
      "Team của một trưởng nhóm dùng Claude tóm tắt, và bản tóm tắt kém.",
      "Anh kết luận lỗi do model, xin ngân sách chuyển cả team lên tầng mạnh nhất.",
      "Chỗ khó: anh chưa từng xem lời yêu cầu team đang dùng. Tức là chưa chẩn đoán gì đã chọn cần gạt đắt nhất."
    ],
    asks: [
      "Rủi ro lớn nhất là gì?",
      "Tức là: hậu quả nặng nhất của việc đổi model trước khi tìm nguyên nhân.",
      "Soi từng phương án: rủi ro đó có thật không, và có phải chuyện lớn nhất không?"
    ],
    facts: [
      "Output chung chung, mỏng thường do prompt thiếu bối cảnh, người đọc, tiêu chí. Kiểm bằng phép thử đồng nghiệp: đưa prompt cho người không biết gì về việc; họ phải hỏi lại thì Claude cũng phải đoán.",
      "Bản nháp mơ hồ vì yêu cầu viết mơ hồ thì sửa prompt; đổi model không chữa được. Model là cần gạt sau cùng.",
      "Tầng mạnh hơn lập luận sâu hơn, nhưng chậm hơn và tốn hạn mức hơn. Trên Enterprise tính theo lượng dùng, chọn tầng là chọn tiền thật.",
      "Đổi model giữa chat được, áp từ câu trả lời kế tiếp. Lịch sử chat cũ vẫn còn."
    ],
    opts: [
      { k: "A", gist: "The stronger model will refuse to work with the team's current instruction.",
        why: [
          "Sai: model mạnh hơn chạy cùng lời yêu cầu như thường. Không có chuyện từ chối vì prompt viết sơ sài.",
          "Rủi ro này không có thật, nên không thể là rủi ro lớn nhất."
        ] },
      { k: "B", gist: "Summaries will become much shorter than the team actually needs.",
        why: [
          "Sai: không có lý do để tầng lập luận sâu hơn tự viết ngắn đi (ý 3). Độ dài là thứ nói được trong prompt.",
          "Dễ bị cuốn vì hay nghĩ mỗi model có độ dài “quen tay” riêng. Nhưng dài hay ngắn do lời yêu cầu quyết, và lời yêu cầu ở đây chưa ai đụng tới."
        ] },
      { k: "C", gist: "The team will lose the record of summaries produced by the earlier model.",
        why: [
          "Sai: đổi model không xóa chat cũ (ý 4). Các bản tóm tắt cũ vẫn nằm trong lịch sử.",
          "Có mất thật thì cũng không phải hậu quả nặng của quyết định này."
        ] },
      { k: "D", gist: "Paying for a stronger model while the under-specified request stays exactly as it is.",
        why: [
          "Gốc nhiều khả năng nằm ở lời yêu cầu thiếu bối cảnh, tiêu chí (ý 1). Đổi model không chữa gốc đó (ý 2).",
          "Tiền và hạn mức tăng (ý 3), bản tóm tắt vẫn kém. Tệ hơn, team tưởng đã thử hết cách, nên không ai quay lại sửa prompt."
        ] }
    ],
    refs: [
      { label: "Bài 7.1, bảng triệu chứng và tình huống anh Minh: phép thử đồng nghiệp trước, model sau cùng", href: NOTES + "#l-7-1" },
      { label: "Bài 3.3, bảng “Chỉnh effort trước, đổi tầng sau”: bản nháp mơ hồ vì yêu cầu mơ hồ thì sửa prompt", href: NOTES + "#l-3-3" }
    ]
  },
  {
    de: 1, n: 37, total: 60, sub: "4.5", subName: "Nói với stakeholder về giá trị và giới hạn",
    answer: "C",
    ask: "To win backing for a new Claude-assisted way of drafting proposals, a team shows the sponsors the single best output out of roughly twenty attempts and says nothing about the other nineteen. What is the biggest risk?",
    scene: [
      "Một team muốn được duyệt cách soạn đề xuất (proposal) có Claude hỗ trợ.",
      "Họ chạy khoảng 20 lần, chỉ trình cho sponsor (người bảo trợ, duyệt tiền) bản đẹp nhất, không nhắc 19 bản còn lại.",
      "Chỗ khó: bản đem trình là output thật, không bịa. Cái sai nằm ở chỗ nó được chọn ra, nên không đại diện cho output thường ngày."
    ],
    asks: [
      "Rủi ro lớn nhất là gì?",
      "Tức là: buổi demo này làm người quyết hiểu sai điều gì, và hậu quả của hiểu sai đó."
    ],
    facts: [
      "Chỉ trình vài bản đẹp nhất thì lãnh đạo sẽ coi trường hợp tốt nhất là bình thường (bài 4.5).",
      "Báo cáo chạy thử trung thực chấm trên nhiều output, kể cả bản hỏng, và nói cả chi phí giám sát thật (giờ người duyệt).",
      "Ví dụ trong notes: trình ba bản FAQ đẹp nhất, ban giám đốc duyệt mở rộng và cắt luôn giờ người duyệt. Tuần đầu một FAQ sai đã tới tay khách.",
      "Cùng một yêu cầu chạy hai lần có thể ra hai bản khác nhau. Đó là thiết kế, không phải hỏng."
    ],
    opts: [
      { k: "A", gist: "The team will have to repeat the demo for other departments that were not present.",
        why: [
          "Chạy lại demo cho phòng khác chỉ tốn chút thời gian, và là chuyện bình thường khi nhiều nơi quan tâm.",
          "Nó không đụng tới câu hỏi chính: demo có cho người quyết một kỳ vọng đúng không (ý 1)."
        ] },
      { k: "B", gist: "The twenty attempts used up usage the team had set aside for its normal client work.",
        why: [
          "Hạn mức tốn cho 20 lần thử là chi phí thật, nhưng nhỏ và chỉ một lần.",
          "Nó đụng tới ngân sách của chính team, không đụng tới quyết định sponsor sắp đưa ra.",
          "Dễ bị cuốn vì đây là chi phí duy nhất thấy ngay trong đề. Nhưng rủi ro lớn nằm ở chỗ khác: điều sponsor tin về output thường ngày."
        ] },
      { k: "C", gist: "Sponsors fund the arrangement expecting a standard that everyday output does not reach.",
        why: [
          "Bản đẹp nhất trong khoảng 20 lần bị coi là mức bình thường (ý 1). Các lần chạy vốn ra kết quả khác nhau (ý 4), nên mức thường ngày thấp hơn bản được chọn.",
          "Ngân sách, nhân sự, giờ duyệt được lên kế hoạch theo một mức không có thật (ý 2, 3). Khi output thường ngày lộ ra, team mất uy tín."
        ] },
      { k: "D", gist: "The demo may run past the time slot the sponsors set aside in the meeting agenda.",
        why: [
          "Quá giờ họp là phiền cho người chủ trì, không phải rủi ro của quyết định.",
          "Nó không liên quan tới chuyện demo nói đúng hay sai về chất lượng thường ngày."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Báo cáo chạy thử cho trung thực”: chấm trên nhiều output, kể cả bản hỏng; trình bản đẹp nhất làm lãnh đạo coi đó là bình thường", href: NOTES + "#l-4-5" }
    ]
  },
  {
    de: 1, n: 38, total: 60, sub: "1.3", subName: "Lặp prompt: chẩn đoán, đổi một chỗ, thử lại",
    answer: "A",
    ask: "A team rewrote an instruction to say “write in flowing prose, avoid bullet points”, yet some of Claude's replies still drift back to bulleted lists. They notice that their own prompt is laid out with bullet points and headers throughout. Which further iteration is most likely to help?",
    scene: [
      "Team đã sửa lời dặn: viết thành đoạn văn liền mạch, tránh gạch đầu dòng.",
      "Một số câu trả lời vẫn quay về danh sách gạch đầu dòng.",
      "Chỗ khó: lời dặn đã có, và đã nói rõ điều muốn có. Manh mối nằm ở chi tiết cuối: chính prompt viết toàn gạch đầu dòng và tiêu đề."
    ],
    asks: [
      "Vòng sửa tiếp theo nào nhiều khả năng giúp nhất?",
      "Tức là: tìm thứ gì trong prompt đang kéo output về gạch đầu dòng, rồi đổi đúng thứ đó."
    ],
    facts: [
      "Kiểu viết của prompt kéo theo kiểu viết của output. Docs: bỏ markdown khỏi prompt thì output bớt markdown. Prompt đầy tiêu đề và gạch đầu dòng mà dặn “trả lời bằng đoạn văn” thì hay hỏng (bài 1.1).",
      "Định dạng lệch thì đưa mẫu, và viết prompt giống output muốn có (bài 1.3).",
      "Viết hoa, nhắc lại chỉ thêm nhấn mạnh, không thêm thông tin.",
      "Temperature (độ ngẫu nhiên) là tham số khi gọi API. Người dùng app không có nút này, và nó cũng không làm Claude theo lời dặn tốt hơn."
    ],
    opts: [
      { k: "A", gist: "Remove the bullet points and headers from the prompt itself, so the prompt's own style matches the flowing prose wanted in the output.",
        why: [
          "Đổi đúng thứ đang kéo output về gạch đầu dòng: kiểu viết của chính prompt (ý 1, 2).",
          "Lời dặn và kiểu viết của prompt giờ cùng một hướng, không còn kéo hai chiều."
        ] },
      { k: "B", gist: "Add even more bullet points, perhaps numbered lists, so the no-bullets rule becomes impossible for Claude to miss.",
        why: [
          "Sai: thêm gạch đầu dòng là thêm đúng thứ đang kéo output về gạch đầu dòng (ý 1).",
          "Nhấn mạnh lời dặn bằng chính định dạng nó cấm thì càng mâu thuẫn. Mà nhấn mạnh cũng không thêm thông tin (ý 3)."
        ] },
      { k: "C", gist: "Move the no-bullets instruction into a separate, later user turn right before the final request, so it is the most recent thing Claude reads.",
        why: [
          "Sai chỗ: lời dặn không thiếu, cũng không bị lạc. Thứ kéo output là kiểu viết của cả prompt (ý 1), và nó vẫn nằm nguyên đó.",
          "Dễ bị cuốn vì “đặt lời dặn sát câu hỏi” nghe như một kỹ thuật thật. Nhưng đề đã cho manh mối: chính prompt viết toàn gạch đầu dòng. Dời một dòng không đổi được điều đó."
        ] },
      { k: "D", gist: "Raise the temperature parameter so Claude's output gets more random and less rigidly structured.",
        why: [
          "Sai: temperature là tham số API, người dùng app không có (ý 4).",
          "Nó cũng không làm Claude theo lời dặn tốt hơn. Gốc là kiểu viết của prompt, và temperature không đụng tới gốc đó."
        ] }
    ],
    refs: [
      { label: "Bài 1.1, phần định dạng: nói cái muốn có, và để prompt trông giống output", href: NOTES + "#l-1-1" },
      { label: "Bài 1.3, bảng triệu chứng: định dạng lệch thì đưa mẫu, viết prompt giống output muốn có", href: NOTES + "#l-1-3" }
    ]
  },
  {
    de: 1, n: 39, total: 60, sub: "5.2", subName: "File tải lên và connector",
    answer: "AE",
    ask: "A policy team keeps a handbook in a Drive folder that is updated every week, plus one annual report that will never change. Which two set-ups suit this best? (Select two.)",
    scene: [
      "Một team chính sách có hai loại tài liệu.",
      "Sổ tay (handbook) nằm trong một thư mục Drive, sửa mỗi tuần.",
      "Báo cáo năm: một file, không bao giờ đổi.",
      "Chỗ khó: hai tài liệu cần hai cách đưa khác nhau. Mỗi phương án chỉ hợp với một loại, hoặc không hợp loại nào."
    ],
    asks: [
      "Hai cách thiết lập nào hợp nhất?",
      "Tức là: chọn cho mỗi tài liệu một cách đưa cho Claude, hợp với chuyện nó có đổi hay không."
    ],
    facts: [
      "File tải lên là bản chụp tại lúc tải. Sửa file gốc sau đó, Claude không thấy. Hợp với văn bản đã chốt.",
      "Connector lấy dữ liệu đúng lúc bạn hỏi, theo quyền tài khoản của bạn. Google Doc thêm từ Drive thì tự đồng bộ bản mới nhất. Cả hai hợp với tài liệu còn sửa.",
      "Project knowledge là tài liệu đã tải vào Project; mọi chat trong Project đều đọc được.",
      "Quy tắc trong notes: tài liệu đã chốt thì tải lên, tài liệu còn sửa thì đồng bộ từ Drive, dữ liệu sống thì dùng connector."
    ],
    opts: [
      { k: "A", gist: "Connect the Drive folder, so the weekly handbook edits are picked up straight from the source.",
        why: [
          "Sổ tay đổi hằng tuần, nên cần cách đọc từ nguồn đang sống (ý 2, 4).",
          "Đọc thẳng từ thư mục Drive thì lần hỏi nào Claude cũng thấy bản đang có, không ai phải cập nhật tay."
        ] },
      { k: "B", gist: "Connect the annual report and delete it from Drive, so only one copy ever exists.",
        why: [
          "Sai: xóa file gốc trên Drive là xóa luôn thứ connector đọc (ý 2). Không còn gì để nối tới.",
          "Báo cáo năm không đổi, nên chẳng được gì khi chỉ giữ một bản. Chỉ thêm rủi ro mất bản gốc."
        ] },
      { k: "C", gist: "Upload one copy of the handbook and rely on that copy for the rest of the year.",
        why: [
          "Sai: bản tải lên đứng yên tại lúc tải (ý 1). Sổ tay đổi mỗi tuần, nên chỉ vài tuần là bản trong Project đã cũ.",
          "Claude sẽ trả lời tự tin theo quy định cũ, và người hỏi không có cách nào nhận ra.",
          "Dễ bị cuốn vì tải lên đúng là cách hợp với báo cáo năm (E). Nhưng sổ tay là tài liệu còn sửa, một cách không dùng chung cho cả hai được."
        ] },
      { k: "D", gist: "Paste the whole handbook into every new chat so the newest version is always present.",
        why: [
          "Chạy được, nhưng là việc tay ở mọi chat. Project knowledge và connector có mặt chính để khỏi làm việc này (ý 2, 3).",
          "Quên dán, hay dán nhầm bản cũ, là Claude trả lời theo bản sai."
        ] },
      { k: "E", gist: "Upload the unchanging annual report into Project knowledge, since its content will never change.",
        why: [
          "Báo cáo năm đã chốt, nên bản chụp không bao giờ cũ (ý 1, 4).",
          "Đặt vào Project knowledge thì mọi chat trong Project đọc được, tải một lần là xong (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 5.2, bảng “Bản chụp, bản đồng bộ, hay lấy lúc hỏi”: tài liệu chốt thì tải lên, tài liệu còn sửa thì đồng bộ hoặc dùng connector", href: NOTES + "#l-5-2" },
      { label: "Bài 5.4: tải bản mới không xóa bản cũ; tài liệu sửa thường xuyên thì để tự đồng bộ", href: NOTES + "#l-5-4" }
    ]
  },
  {
    de: 1, n: 40, total: 60, sub: "3.2", subName: "Haiku, Sonnet, Opus khác nhau ở đâu",
    answer: "D",
    ask: "A project lead is setting up a new piece of work that will recur, and she is unsure which Claude model to use for it. What should she do first?",
    scene: [
      "Một trưởng dự án sắp dựng một việc sẽ làm đi làm lại.",
      "Chị chưa biết chọn model nào.",
      "Chỗ khó: bốn phương án đều nghe hợp lý. Ba cái chọn theo một luật cố định hoặc nhờ người khác chọn hộ. Chỉ một cái bắt đầu từ chính việc cần làm."
    ],
    asks: [
      "Chị nên làm gì “first” (trước tiên)?",
      "Tức là: bước đầu của việc chọn tầng là gì."
    ],
    facts: [
      "Các tầng khác nhau ở độ sâu lập luận, tốc độ, hạn mức. Việc nhiều bước, lập luận qua nhiều nguồn, nhiều ràng buộc thì kéo lên tầng (bài 3.2).",
      "Trước khi chọn, hỏi bốn câu: việc khó cỡ nào, cần nhanh cỡ nào, làm bao nhiêu lần, sai thì mất gì (bài 3.3).",
      "Dùng tầng nặng cho việc tầng nhẹ làm được là tốn hạn mức mà không được gì. Chưa chắc thì Sonnet; Sonnet chật vật thì lên Opus.",
      "Hỏi Claude “Haiku có làm được không?” không phải phép thử. Lời đoán của Claude không thay được thử trên việc thật."
    ],
    opts: [
      { k: "A", gist: "Choose the deepest-reasoning model, because starting with the strongest option is always the safest.",
        why: [
          "Sai: chọn theo luật cố định, chưa xem việc. Việc lặp lại mà chạy trên tầng nặng thì từng chút hạn mức cộng lại thành nhiều (ý 2, 3).",
          "Dễ bị cuốn vì “mạnh nhất cho chắc” nghe an toàn. Nhưng lời giải câu mẫu của guide chê đúng kiểu này: dùng model mạnh nhất cho mọi việc là phí chi phí và thời gian chờ."
        ] },
      { k: "B", gist: "Choose the fastest, cheapest model, since a lighter model can always be upgraded later.",
        why: [
          "Sai theo chiều ngược lại: vẫn chọn theo luật cố định, chưa xem việc khó cỡ nào (ý 1).",
          "Docs API có cách “đi từ nhẹ lên”, nhưng đi kèm thử kỹ trên việc thật. Chọn nhẹ mà không xem việc thì output thiếu chất lượng có thể không ai để ý."
        ] },
      { k: "C", gist: "Ask Claude which of the available models it would recommend for the work she describes.",
        why: [
          "Sai: câu trả lời của Claude dựa trên mô tả chung chung, không dựa trên chuẩn chất lượng và ràng buộc thật của chị (ý 4).",
          "Lời đoán không phải bằng chứng. Chị vẫn phải tự xét việc khó cỡ nào."
        ] },
      { k: "D", gist: "Work out how much reasoning depth the task really needs, since that is what sets the tiers apart.",
        why: [
          "Độ sâu lập luận là thứ chính phân biệt các tầng (ý 1), nên chọn tầng bắt đầu từ chỗ việc khó cỡ nào (ý 2).",
          "Bốn câu của bài 3.3 còn hỏi tốc độ, số lần, cái giá khi sai. Nhưng trong bốn phương án, chỉ D bắt đầu từ chính việc. Xét xong mới biết nên ở Haiku, Sonnet hay Opus, và có cần thử hai tầng trên việc thật không."
        ] }
    ],
    refs: [
      { label: "Bài 3.2: các tầng khác nhau ở độ sâu, tốc độ, hạn mức; hai câu tự hỏi để đặt việc vào tầng", href: NOTES + "#l-3-2" },
      { label: "Bài 3.3, mục “Bốn câu hỏi trước khi chọn”: khó cỡ nào, nhanh cỡ nào, bao nhiêu lần, sai thì mất gì", href: NOTES + "#l-3-3" }
    ]
  },
  {
    de: 1, n: 41, total: 60, sub: "4.5", subName: "Nói với stakeholder về giá trị và giới hạn",
    answer: "A",
    ask: "After a two-week Claude pilot, an operations director reports the results to the executive team by showing only the three best outputs the team produced. What is the greatest risk of presenting the results this way?",
    scene: [
      "Team chạy thử Claude hai tuần. Giám đốc vận hành báo cáo kết quả cho ban giám đốc.",
      "Ông chỉ trình ba output đẹp nhất. Các bản còn lại, kể cả bản phải sửa nhiều, không ai thấy.",
      "Chỗ khó: ba phương án sai đều kể một hậu quả nghe như có thể xảy ra (đổi nhà cung cấp, làm lại output, chạy thử lại). Phải tìm hậu quả đi thẳng từ chuyện chỉ chọn mẫu đẹp."
    ],
    asks: [
      "Báo cáo kiểu này có rủi ro lớn nhất là gì?",
      "Tức là: chỉ cho xem ba bản tốt nhất thì lãnh đạo sẽ hiểu sai điều gì, và cái hiểu sai đó gây hại ở đâu.",
      "Soi từng phương án: hậu quả nó kể có đi ra từ việc chọn mẫu không đại diện không, hay là một quy định tự đặt ra?"
    ],
    facts: [
      "Chỉ đưa vài bản đẹp nhất của đợt chạy thử thì lãnh đạo sẽ coi trường hợp tốt nhất là bình thường.",
      "Báo cáo chạy thử trung thực chấm trên nhiều output, kể cả bản hỏng, và nói cả giá trị đo được lẫn chi phí giám sát thật (giờ người duyệt).",
      "Chỉ kể điểm mạnh là dọn sẵn chỗ cho thất vọng. Lỗi lộ ra sau khi đã mở rộng thì mất luôn lòng tin."
    ],
    opts: [
      { k: "A", gist: "Executives build their expectations on unrepresentative examples, then are surprised when everyday output still needs editing.",
        why: [
          "Ba bản đẹp nhất không đại diện cho output thường ngày. Lãnh đạo lấy trường hợp tốt nhất làm mức bình thường (ý 1).",
          "Khi mở rộng, bản nháp thường ngày vẫn cần sửa. Lúc đó họ mới thấy khoảng cách, và mất lòng tin vào cả việc dùng Claude (ý 3).",
          "Rủi ro này đi thẳng từ cách báo cáo. Cách chữa là chấm trên toàn bộ output, kể cả bản hỏng (ý 2)."
        ] },
      { k: "B", gist: "Executives will conclude the pilot used the wrong tool and ask for a different vendor to be evaluated.",
        why: [
          "Sai chiều hậu quả: ba bản đẹp làm lãnh đạo tin quá mức, không làm họ nghi công cụ (ý 1).",
          "Đòi đổi nhà cung cấp là phản ứng với kết quả kém. Báo cáo này lại chỉ cho thấy kết quả tốt."
        ] },
      { k: "C", gist: "The pilot's outputs can no longer be reused, because anything shown to executives has to be generated again.",
        why: [
          "Đây là một ràng buộc tự đặt ra. Không có quy định nào bắt sinh lại output chỉ vì nó đã được trình cho lãnh đạo.",
          "Nó cũng không dính gì tới chuyện chọn mẫu đẹp, là điều đề đang hỏi."
        ] },
      { k: "D", gist: "The team will be required to rerun the whole pilot from the start before any rollout decision is made.",
        why: [
          "Không có gì bắt chạy thử lại. Ngược lại, lãnh đạo có thể quyết mở rộng ngay dựa trên ba bản đẹp, và đó mới là chỗ nguy hiểm (ý 1).",
          "Dễ bị cuốn vì báo cáo thiếu sót nghe như sẽ bị bắt làm lại cho đủ. Nhưng rủi ro thật nằm ở chiều kia: không ai đòi làm lại, lãnh đạo tin luôn và quyết trên kỳ vọng sai."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Báo cáo chạy thử cho trung thực”: trình ba bản đẹp nhất thì lãnh đạo coi trường hợp tốt nhất là bình thường, và báo cáo tốt cần có gì", href: NOTES + "#l-4-5" }
    ]
  },
  {
    de: 1, n: 42, total: 60, sub: "4.2", subName: "Research, lập kế hoạch, tối ưu quy trình",
    answer: "B",
    ask: "A policy officer must prepare a short evidence review for a decision meeting later this week. Which sequence of steps is correct?",
    scene: [
      "Một chuyên viên chính sách cần một bản “evidence review” (tổng hợp bằng chứng) ngắn cho buổi họp ra quyết định cuối tuần.",
      "Bốn phương án có cùng bốn bước, chỉ khác thứ tự. Bốn bước đó: nêu câu hỏi và thế nào là câu trả lời dùng được, chỉ cho Claude nguồn nào được tính là bằng chứng, để Claude soạn kèm dẫn tới đoạn nguồn, kiểm các “load-bearing claims” (khẳng định mà kết luận dựa vào) trước khi phát.",
      "Chỗ khó: bước nào cũng đúng. Phải xét bước nào cần đầu ra của bước nào."
    ],
    asks: [
      "Bốn bước nên đi theo thứ tự nào?",
      "Tức là: mỗi bước cần có sẵn gì từ bước trước thì mới làm được.",
      "Soi từng phương án: có bước nào chạy khi thứ nó cần chưa có không?"
    ],
    facts: [
      "Nói rõ “xong” trước khi giao: câu hỏi cần trả lời và output thế nào là dùng được. Không có cái này, Claude không biết bản tổng hợp phục vụ quyết định nào.",
      "Nguồn quyết định chất lượng kết luận. Lập luận chặt đến đâu cũng không sửa được đầu vào sai hay một chiều.",
      "Bắt mỗi ý kèm trích dẫn tới đoạn nguồn thì output kiểm được: biết mở chỗ nào ra đối chiếu.",
      "Ít thời gian thì kiểm trước những khẳng định mà quyết định dựa vào, và kiểm trước khi gửi đi."
    ],
    opts: [
      { k: "A", gist: "Have Claude draft the review with passage references → state the question and what a usable answer must cover → point Claude at the sources that count as evidence → check the load-bearing claims before circulating.",
        why: [
          "Sai thứ tự: Claude soạn khi chưa biết câu hỏi (ý 1) và chưa có nguồn đã thống nhất (ý 2).",
          "Bản nháp không nhắm vào quyết định nào. Nguồn tới sau bản nháp lẽ ra phải dựa trên nó, nên bản nháp phải làm lại.",
          "Dễ bị cuốn vì có bản nháp sớm nghe như tiết kiệm thời gian khi cuối tuần đã họp. Nhưng soạn trước khi có câu hỏi và nguồn là soạn hai lần."
        ] },
      { k: "B", gist: "State the question and what a usable answer must cover → point Claude at the sources that count as evidence → have Claude draft the review with passage references → check the load-bearing claims before circulating.",
        why: [
          "Câu hỏi và tiêu chí đi đầu, nên biết bản tổng hợp phải trả lời gì (ý 1). Rồi chốt nguồn, nên chỉ thứ được tính là bằng chứng mới vào bản nháp (ý 2).",
          "Bản nháp kèm dẫn đoạn nên từng khẳng định truy được về nguồn (ý 3).",
          "Bước kiểm cuối nhắm vào khẳng định mà quyết định dựa vào, làm trước khi phát, lúc còn kịp sửa (ý 4)."
        ] },
      { k: "C", gist: "Point Claude at the sources that count as evidence → check the load-bearing claims before circulating → state the question and what a usable answer must cover → have Claude draft the review with passage references.",
        why: [
          "Kiểm khẳng định khi chưa có bản nháp nào: không có gì để kiểm (ý 4).",
          "Nguồn được chọn trước khi biết câu hỏi (ý 1), nên có thể chọn trượt thứ cần."
        ] },
      { k: "D", gist: "Check the load-bearing claims before circulating → have Claude draft the review with passage references → state the question and what a usable answer must cover → point Claude at the sources that count as evidence.",
        why: [
          "Đảo ngược cả quy trình: kiểm đầu tiên khi chưa có gì để kiểm (ý 4), soạn khi chưa có câu hỏi và nguồn.",
          "Câu hỏi được nêu sau khi bản tổng hợp đã viết xong, nên nó không định hướng được gì nữa (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 4.2, mục “Lập kế hoạch: Claude soạn, người duyệt” và phần kiểm nguồn: nói rõ “xong” trước khi giao, đầu vào một chiều thì kết luận hỏng", href: NOTES + "#l-4-2" },
      { label: "Bài 2.3, mục “Sau khi Claude viết”: ít thời gian thì kiểm trước khẳng định mà quyết định dựa vào", href: NOTES + "#l-2-3" }
    ]
  },
  {
    de: 1, n: 43, total: 60, sub: "6.3", subName: "Làm việc trong chính sách AI của công ty",
    answer: "B",
    ask: "A fintech company's product uses Claude to approve or deny small business loan applications automatically, with no human involved. To comply with the Usage Policy's high-risk use case requirements for financial services, what must the company do?",
    scene: [
      "Một công ty fintech (công nghệ tài chính) dùng Claude để tự duyệt hoặc từ chối hồ sơ vay của doanh nghiệp nhỏ.",
      "Không có người nào nhúng tay: Claude quyết, kết quả đi thẳng tới người nộp hồ sơ.",
      "Chỗ khó: ba phương án sai đều đưa ra một cách “lách” nghe có vẻ hợp lý: giữ log, chuyển phần từ chối sang hệ thống khác, bớt thời gian lưu hồ sơ. Phải xem cái nào thật sự đáp ứng yêu cầu."
    ],
    asks: [
      "Theo Usage Policy (chính sách sử dụng của Anthropic), công ty phải làm gì để đạt yêu cầu của ca rủi ro cao trong tài chính?",
      "Tức là: gọi đúng các điều kiện Usage Policy đặt cho quyết định tín dụng về người nộp hồ sơ.",
      "Soi từng phương án: nó thực hiện điều kiện, hay tìm cách khỏi phải thực hiện?"
    ],
    facts: [
      "Usage Policy xếp tài chính, tín dụng vào lĩnh vực rủi ro cao. Quyết định cho vay hay không là quyết định về người nộp hồ sơ, nên thuộc diện này.",
      "Ca rủi ro cao có hai điều kiện bắt buộc. Một: người có chuyên môn duyệt output trước khi nó tới người bị ảnh hưởng, có quyền sửa, và chịu trách nhiệm. Hai: người bị quyết định được báo rõ là có dùng AI.",
      "Một điều kiện không thay được điều kiện kia. Kiểm sau khi đã gửi không tính là duyệt trước.",
      "Usage Policy bản mới (hiệu lực 12/11/2026): nơi luật cho phép, quyết định có lợi hoàn toàn không cần người duyệt trước, nhưng công khai vẫn có thể áp dụng. Quyết định bất lợi như từ chối cho vay vẫn cần người duyệt trước."
    ],
    opts: [
      { k: "A", gist: "Skip telling applicants about AI, provided every underwriting input and output Claude produces is fully logged for compliance audits.",
        why: [
          "Sai: log là hồ sơ cho kiểm toán, không phải lời báo cho người nộp (ý 2). Cũng không có ai duyệt trước. Thiếu cả hai điều kiện.",
          "Dễ bị cuốn vì giữ log nghe rất “tuân thủ”, và bài 6.3 có dạy audit log (nhật ký kiểm toán) là bằng chứng tuân thủ. Nhưng log chỉ ghi lại chuyện đã xảy ra, không thay được người duyệt hay lời báo cho người bị quyết định."
        ] },
      { k: "B", gist: "Disclose Claude's involvement to applicants, and have a qualified human review the model's output before any adverse lending decision is finalized.",
        why: [
          "Đủ cả hai điều kiện: người nộp được báo là có dùng AI, và người có chuyên môn duyệt trước khi quyết định bất lợi được chốt (ý 2).",
          "Duyệt trước, không phải kiểm sau (ý 3). Nhắm vào quyết định bất lợi cũng khớp với bản Usage Policy mới (ý 4)."
        ] },
      { k: "C", gist: "Send every denial through a separate rules engine so that only approvals come from Claude, which removes any need for human review.",
        why: [
          "Sai ở mục đích: đây là cách né, không phải cách tuân thủ. Quyết định cho vay về người nộp vẫn là ca rủi ro cao (ý 1).",
          "Người nộp vẫn không được báo là có dùng AI (ý 2). Bản mới chỉ miễn duyệt trước cho quyết định có lợi hoàn toàn, nơi luật cho phép, và vẫn có thể phải công khai (ý 4). Không có chỗ nào cho bỏ hẳn người duyệt bằng cách dời phần từ chối sang hệ thống khác."
        ] },
      { k: "D", gist: "Shorten how long loan application records are kept, so AI-made decisions cannot be inspected later in compliance audits.",
        why: [
          "Sai hoàn toàn: đây là xóa dấu vết để né kiểm toán, ngược với tuân thủ.",
          "Không thêm người duyệt, không báo người nộp (ý 2). Khi cơ quan quản lý hỏi “quyết định này ra sao”, công ty lại không còn gì để trả lời."
        ] }
    ],
    refs: [
      { label: "Bài 6.1, mục “Vùng vàng” và “Biết thêm”: hai điều kiện của ca rủi ro cao, quyết định có lợi hoàn toàn theo bản Usage Policy mới", href: NOTES + "#l-6-1" },
      { label: "Bài 6.3, mục “Ba tầng, tầng trong chỉ được chặt hơn”: Usage Policy là sàn, công ty không được nới", href: NOTES + "#l-6-3" },
      { label: "Usage Policy của Anthropic: yêu cầu người duyệt và công khai cho ca rủi ro cao", href: "https://www.anthropic.com/legal/aup" }
    ]
  },
  {
    de: 1, n: 44, total: 60, sub: "5.4", subName: "Giữ cấu hình còn đúng",
    answer: "C",
    ask: "A team uploads the new travel policy to a project but also leaves last year's version in the knowledge base. What is the greatest risk?",
    scene: [
      "Team tải chính sách công tác mới vào knowledge của project.",
      "Bản năm ngoái vẫn để nguyên. Giờ knowledge có hai bản cùng chủ đề, nói hai mức khác nhau.",
      "Chỗ khó: ba phương án sai đều kể một việc project “tự làm”: tự lưu trữ, tự chuyển chế độ, tự từ chối file. Phải biết project thật sự làm gì với hai file trùng chủ đề."
    ],
    asks: [
      "Rủi ro lớn nhất là gì?",
      "Tức là: hai bản cùng nằm trong knowledge thì Claude sẽ trả lời ra sao, và ai nhận ra chuyện đó."
    ],
    facts: [
      "Knowledge được nạp vào mọi chat của project. File hết hiệu lực vẫn định hình câu trả lời như thường.",
      "Không có gì tự đánh dấu file cũ là hết hiệu lực. Project không tự lưu trữ bản cũ, cũng không từ chối file trùng.",
      "Hai bản cùng chủ đề thì Claude có thể trích bản nào cũng được. Triệu chứng: lúc ra số này, lúc ra số kia.",
      "RAG (tìm rồi mới đọc): khi knowledge gần chạm giới hạn context window, gói trả phí tự chuyển sang tìm đoạn liên quan rồi đọc các đoạn đó. Nó bật theo dung lượng, không theo chuyện có file trùng."
    ],
    opts: [
      { k: "A", gist: "The older file gets archived automatically, so the team loses its record of the previous rules.",
        why: [
          "Sai ở giả định: project không tự lưu trữ hay gỡ file nào (ý 2). Gỡ bản cũ là việc của người phụ trách.",
          "Rủi ro thật nằm ở chiều ngược lại: bản cũ vẫn nằm đó và vẫn được dùng (ý 1)."
        ] },
      { k: "B", gist: "The project switches into retrieval mode, which stops Claude from quoting either policy directly.",
        why: [
          "Sai hai chỗ. RAG bật vì knowledge gần chạm giới hạn context, không vì có hai file cùng chủ đề (ý 4). Và dưới RAG, Claude vẫn đọc các đoạn tìm được, nên vẫn trích được tài liệu.",
          "Dễ bị cuốn vì RAG là tính năng có thật của project. Nhưng nó chỉ đổi cách Claude đọc knowledge, không chặn trích dẫn, và chẳng liên quan tới bản trùng."
        ] },
      { k: "C", gist: "Both versions are available, so Claude may cite the superseded rules without anyone noticing the conflict.",
        why: [
          "Cả hai bản đều được nạp như nhau (ý 1). Không có gì đánh dấu bản cũ đã bị thay (ý 2).",
          "Claude có thể trả lời theo bản năm ngoái, nghe đáng tin y như khi trả lời theo bản mới (ý 3). Người hỏi không biết có hai bản, nên không ai thấy mâu thuẫn.",
          "Cách chữa: gỡ bản cũ, giữ một bản hiện hành, rồi hỏi thử một câu mà đáp án đã đổi."
        ] },
      { k: "D", gist: "The project rejects the newer file right away, because two documents cannot cover the same subject at once.",
        why: [
          "Sai: project không từ chối file trùng chủ đề (ý 2). File mới tải lên bình thường.",
          "Chính vì không có gì chặn nên mới có rủi ro hai bản cùng sống trong knowledge."
        ] }
    ],
    refs: [
      { label: "Bài 5.4, mục “Thay một tài liệu: bốn bước”: tải bản mới không làm bản cũ biến mất, không có gì tự đánh dấu file cũ", href: NOTES + "#l-5-4" },
      { label: "Bài Nền tảng Domain 5, mục “Knowledge đến tay Claude bằng cách nào”: RAG bật khi nào, Claude đọc gì", href: NOTES + "#l-5-0" }
    ]
  },
  {
    de: 1, n: 45, total: 60, sub: "6.1", subName: "Việc nào giao cho Claude được",
    answer: "B",
    ask: "A retail brand puts a Claude-powered chatbot on its website. Internal testing shows many users believe they are chatting with a live human agent, and the company decides not to add any disclosure. Is this an appropriate use of Claude?",
    scene: [
      "Một thương hiệu bán lẻ đặt chatbot chạy bằng Claude trên website cho khách.",
      "Thử nội bộ thấy nhiều người tưởng đang chat với nhân viên thật. Công ty biết vậy mà vẫn quyết không báo là AI.",
      "Chỗ khó: hai phương án “Yes” đưa ra lý do nghe được (giọng thân thiện, có ghi trong điều khoản). Một phương án “No” đúng kết luận nhưng sai lý do."
    ],
    asks: [
      "Dùng Claude như vậy có hợp không?",
      "Tức là: Usage Policy đòi gì ở chatbot nói chuyện với khách, và cách làm này có đạt không.",
      "Soi cả kết luận (Yes/No) lẫn lý do. Đúng kết luận mà sai lý do vẫn là phương án sai."
    ],
    facts: [
      "Usage Policy bắt chatbot hay agent nói chuyện trực tiếp với người tiêu dùng phải cho người dùng biết họ đang nói chuyện với AI, ít nhất ở đầu mỗi phiên hoặc ngay trên giao diện.",
      "Công khai đạt là thông báo rõ, đặt ở chỗ người ta thấy ngay. Một dòng giấu trong điều khoản sử dụng, chỉ nói khi bị hỏi, hay để chatbot xưng là nhân viên thật thì không đạt."
    ],
    opts: [
      { k: "A", gist: "Yes, because a friendly conversational tone on its own does not trigger any disclosure duty under the Usage Policy.",
        why: [
          "Sai: nghĩa vụ công khai gắn với việc chatbot nói chuyện với khách, không gắn với giọng (ý 1).",
          "Ở đây thử nội bộ đã cho thấy khách nhầm là người thật. Đó đúng là chuyện yêu cầu công khai muốn chặn."
        ] },
      { k: "B", gist: "No, because the Usage Policy requires consumer-facing chatbots to tell users they are interacting with AI.",
        why: [
          "Chatbot trên website cho khách là chatbot hướng tới người tiêu dùng. Usage Policy bắt nó báo là AI (ý 1).",
          "Công ty biết khách đang nhầm mà vẫn không báo. Vậy là không đạt, dùng như vậy không hợp."
        ] },
      { k: "C", gist: "Yes, as long as the site's terms-of-service page mentions AI use somewhere outside the chat window.",
        why: [
          "Sai: một dòng giấu trong điều khoản sử dụng là công khai không đạt (ý 2). Khách đang chat không đọc trang đó.",
          "Dễ bị cuốn vì có ghi ở đâu đó nghe như đã công khai. Nhưng Usage Policy đòi báo ở đầu phiên hoặc trên giao diện, chỗ khách thấy ngay khi chat (ý 1)."
        ] },
      { k: "D", gist: "No, but only because the brand did not obtain explicit opt-in consent before each chat started.",
        why: [
          "Đúng kết luận, sai lý do. Thứ thiếu là lời báo “bạn đang chat với AI” (ý 1), không phải sự đồng ý trước (opt-in) của khách.",
          "Khách bấm đồng ý xong mà vẫn tưởng đang nói với người thật thì vẫn không đạt."
        ] }
    ],
    refs: [
      { label: "Bài 6.4, mục “Khi nào phải nói là có dùng AI”: chatbot cho khách phải nói là AI ở đầu phiên hoặc trên giao diện, và thế nào là công khai không đạt", href: NOTES + "#l-6-4" },
      { label: "Usage Policy của Anthropic: yêu cầu công khai với chatbot hướng tới người tiêu dùng", href: "https://www.anthropic.com/legal/aup" }
    ]
  },
  {
    de: 1, n: 46, total: 60, sub: "2.5", subName: "Sửa output cho đúng người đọc",
    answer: "A",
    ask: "A teacher asks Claude to explain photosynthesis for a group of 8-year-olds and, separately, for high school biology students. What is the best approach to getting output suited to each group?",
    scene: [
      "Một giáo viên cần giải thích quang hợp cho hai nhóm: trẻ 8 tuổi, và học sinh cấp ba học môn sinh.",
      "Hai nhóm khác hẳn về vốn từ và độ sâu cần có.",
      "Chỗ khó: phương án B nghe như tiết kiệm công mà vẫn chiều được cả hai: một bản “ở giữa”."
    ],
    asks: [
      "Cách nào cho ra output hợp từng nhóm nhất?",
      "Tức là: một nội dung, hai nhóm người đọc khác nền, thì chia bản thế nào."
    ],
    facts: [
      "Hai nhóm người đọc khác nền thì xin hai bản, mỗi bản đúng mức của nhóm đó.",
      "Fit (độ hợp người đọc) là output có đúng thứ người đọc cần, ở đúng mức họ hiểu. Hai bản đúng như nhau có thể hợp người đọc rất khác nhau.",
      "Độ chính xác áp cho mọi bản. Bản cho người mới được đổi cách giải thích, không được đổi sự thật."
    ],
    opts: [
      { k: "A", gist: "Ask for two explanations: simple analogies for the younger group and precise terminology for the older group.",
        why: [
          "Mỗi bản viết cho đúng một nhóm người đọc (ý 1). Trẻ 8 tuổi có ví von dễ hiểu, học sinh cấp ba có thuật ngữ chính xác.",
          "Hai bản cùng một sự thật về quang hợp, chỉ khác cách giải thích và độ sâu (ý 3)."
        ] },
      { k: "B", gist: "Use a single explanation at an intermediate level that mixes simple analogies for the children with key terms for the older students.",
        why: [
          "Bản ở giữa không hợp nhóm nào (ý 2): thuật ngữ vẫn quá khó với trẻ 8 tuổi, còn học sinh cấp ba lại thiếu độ chính xác và độ sâu.",
          "Dễ bị cuốn vì nghe như một bản phục vụ được cả hai, đỡ một lượt hỏi. Nhưng thỏa hiệp về mức từ ngữ thì cả hai nhóm đều phải tự bù phần thiếu."
        ] },
      { k: "C", gist: "Give both groups the high-school explanation, since its detailed terms also convey the basics to the younger children.",
        why: [
          "Sai: có đủ “cơ bản” trong đó không giúp được khi từ ngữ vượt vốn từ của trẻ 8 tuổi (ý 1).",
          "Bản đúng cho học sinh cấp ba vẫn là bản sai cho trẻ nhỏ (ý 2)."
        ] },
      { k: "D", gist: "Give both groups the child-friendly explanation so nothing exceeds what the 8-year-olds can understand.",
        why: [
          "Sai: học sinh cấp ba mất thuật ngữ chính xác và độ sâu mà môn học đòi (ý 1).",
          "Bản dễ hiểu hợp trẻ 8 tuổi, nhưng hợp nhóm này không có nghĩa là hợp nhóm kia (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 2.5, mục “Một nội dung, nhiều người đọc”: hai nhóm khác nền thì xin hai bản, đổi cách giải thích chứ không đổi sự thật", href: NOTES + "#l-2-5" }
    ]
  },
  {
    de: 1, n: 47, total: 60, sub: "2.3", subName: "Kiểm từng khẳng định",
    answer: "B",
    ask: "A policy officer has one hour before a board meeting and a Claude-written briefing with about twenty factual claims. She cannot check all of them. What should she do first?",
    scene: [
      "Một chuyên viên chính sách còn một tiếng trước cuộc họp hội đồng quản trị.",
      "Bản tóm tắt do Claude viết có khoảng 20 khẳng định về sự thật. Một tiếng không đủ kiểm hết.",
      "Chỗ khó: phải chọn kiểm cái nào trước. Ba phương án sai đều có một cách xếp nghe hợp lý: theo thứ tự trong bài, theo lời Claude, theo câu dễ tra."
    ],
    asks: [
      "Việc cần làm “first” (trước tiên) là gì?",
      "Tức là: thời gian kiểm có hạn thì dùng tiêu chí gì để chọn khẳng định nào kiểm trước."
    ],
    facts: [
      "Tách bản nháp thành từng khẳng định. Ít thời gian thì xếp theo hệ quả: kiểm trước những khẳng định mà quyết định dựa vào.",
      "Không đi theo thứ tự trong bài, không chọn câu dễ tra trước.",
      "Hỏi Claude khẳng định nào của nó kém tin nhất là bắt chính nguồn đang bị kiểm tự chấm mình. Thứ tự ưu tiên lấy từ hệ quả của quyết định, không lấy từ Claude."
    ],
    opts: [
      { k: "A", gist: "Work through the claims in the order they appear until her hour runs out.",
        why: [
          "Sai: thứ tự trong bài không nói lên khẳng định nào quan trọng (ý 2).",
          "Hết giờ ở giữa bài thì khẳng định mà quyết định dựa vào có thể nằm đúng ở phần chưa kiểm."
        ] },
      { k: "B", gist: "Identify the few claims the board's decision actually rests on and verify those first.",
        why: [
          "Đúng cách xếp theo hệ quả (ý 1): một giờ có hạn thì dồn vào chỗ mà nếu sai sẽ làm đổi quyết định.",
          "Bước chọn này đi trước mọi bước kiểm, nên đúng là việc làm “first” (trước tiên)."
        ] },
      { k: "C", gist: "Ask Claude which claims in the briefing are the most likely to be wrong.",
        why: [
          "Sai: bắt chính nguồn đang bị kiểm tự chấm mình (ý 3). Bảng xếp hạng đó được sinh ra theo đúng cách các khẳng định được sinh ra.",
          "Dễ bị cuốn vì nghe như khoanh vùng thông minh, lại nhanh. Nhưng Claude không có góc nhìn độc lập về câu nào của nó thiếu căn cứ. Và câu kém tin nhất chưa chắc là câu quyết định dựa vào."
        ] },
      { k: "D", gist: "Check the claims that are easiest to look up, so the largest number get covered.",
        why: [
          "Sai: tối ưu số lượng thay vì hệ quả (ý 2). Câu dễ tra thường là câu ít quan trọng.",
          "Kiểm được 15/20 câu vẫn vô ích nếu câu quyết định dựa vào nằm trong 5 câu còn lại."
        ] }
    ],
    refs: [
      { label: "Bài 2.3, mục “Sau khi Claude viết: kiểm từng khẳng định”: xếp theo hệ quả, và vì sao không hỏi Claude câu nào của nó yếu nhất", href: NOTES + "#l-2-3" }
    ]
  },
  {
    de: 1, n: 48, total: 60, sub: "2.6", subName: "Chọn định dạng output",
    answer: "A",
    ask: "A team records every decision it makes only in chat messages, spread across many separate conversations. What is the greatest risk?",
    scene: [
      "Team chốt quyết định nào cũng chỉ ghi trong tin nhắn chat.",
      "Các tin nhắn đó nằm rải trong rất nhiều cuộc chat riêng. Không có chỗ nào gom lại.",
      "Chỗ khó: ba phương án sai đều là phiền thật (chat đầy, tốn hạn mức, giọng văn lệch). Phải chọn cái nguy hiểm nhất."
    ],
    asks: [
      "Rủi ro lớn nhất là gì?",
      "Tức là: quyết định không có một chỗ chính thức thì hậu quả nặng nhất là gì."
    ],
    facts: [
      "Quyết định nằm rải trong nhiều cuộc chat thì khó tìm, và dễ bị một câu trả lời sau nói ngược lại.",
      "Thông tin cần giữ lâu thì gom về một chỗ, ví dụ một tài liệu artifact: bỏ trùng, giữ quyết định cuối, ghi người chốt và ngày.",
      "Giới hạn độ dài (length limit) là giới hạn của từng chat. Chat đầy thì mở chat mới hoặc dùng Project.",
      "Claude không mang ngữ cảnh từ chat này sang chat khác. Chỉ thứ đã lưu (knowledge, instructions, memory) mới đi theo."
    ],
    opts: [
      { k: "A", gist: "There is no single current version, so different people act on different versions of a decision.",
        why: [
          "Không có bản chính thức nên mỗi người tìm được tin nhắn nào thì làm theo tin nhắn đó (ý 1).",
          "Quyết định đã bị thay ở chat sau vẫn nằm nguyên ở chat trước. Ai đọc nhầm bản cũ thì làm sai mà không biết.",
          "Cách chữa: gom về một tài liệu artifact, giữ quyết định cuối, ghi người chốt và ngày (ý 2)."
        ] },
      { k: "B", gist: "Each conversation will hit its length limit, forcing the team to start new ones often.",
        why: [
          "Phiền thật, nhưng chỉ là phiền: chat đầy thì mở chat mới (ý 3).",
          "Dễ bị cuốn vì giới hạn độ dài là chuyện có thật. Nhưng mở chat mới thì quyết định cũ không theo sang (ý 4), tức là quay về đúng rủi ro ở A. Gốc vẫn là không có chỗ chính thức cho quyết định."
        ] },
      { k: "C", gist: "The team will spend more of its usage allowance rereading conversations than chatting saves.",
        why: [
          "Sai trọng tâm: chi phí không phải thứ làm quyết định rải rác trở nên nguy hiểm.",
          "Kể cả không tốn thêm gì, team vẫn có thể làm sai vì đọc nhầm bản cũ. Rủi ro thật nằm ở đó."
        ] },
      { k: "D", gist: "Decisions will be phrased inconsistently, so the team's writing style will vary a lot.",
        why: [
          "Giọng văn lệch là chuyện hình thức.",
          "So với chuyện đồng nghiệp làm theo hai bản khác nhau của cùng một quyết định (ý 1), nó gần như không gây hại gì."
        ] }
    ],
    refs: [
      { label: "Bài 2.6, mục “Gom thông tin cần giữ lâu về một chỗ”: quyết định rải trong nhiều chat thì khó tìm và dễ bị nói ngược", href: NOTES + "#l-2-6" },
      { label: "Bài 3.4, mục “Hai giới hạn, hai cách xử lý”: giới hạn độ dài là của từng chat, xử lý bằng chat mới hoặc Project", href: NOTES + "#l-3-4" }
    ]
  },
  {
    de: 1, n: 49, total: 60, sub: "5.4", subName: "Giữ cấu hình còn đúng",
    answer: "B",
    ask: "A shared project supports a process that changes every quarter. Which practice best keeps the project trustworthy over time?",
    scene: [
      "Một project dùng chung phục vụ một quy trình đổi mỗi quý.",
      "Knowledge và instructions phải đổi theo quy trình. Không đổi thì Claude cứ trả lời theo quy trình cũ.",
      "Chỗ khó: phương án nào cũng có một nhịp làm hay một người làm. Phải xem cái nào thật sự phát hiện và sửa được chỗ đã cũ."
    ],
    asks: [
      "Cách làm nào giữ project đáng tin lâu dài nhất?",
      "Tức là: cần cơ chế gì để mỗi lần quy trình đổi thì knowledge và instructions đổi theo."
    ],
    facts: [
      "Mỗi mảng một người phụ trách có quyền Can edit. Tránh cảnh nhiều người cùng tải nhiều bản.",
      "Lịch rà soát có hai loại: định kỳ (ví dụ đầu mỗi quý), và ngay khi nguồn đổi. Tài liệu đổi thì rà cả instructions đi kèm.",
      "Người chỉ có quyền Can view thấy sai thì báo người phụ trách. Họ không tự sửa được knowledge hay instructions.",
      "Lời sửa trong chat không sang chat khác. Chỉ thứ đã lưu vào knowledge hay instructions mới đi theo mọi chat."
    ],
    opts: [
      { k: "A", gist: "Re-upload every document once a week so the knowledge base gets refreshed whether or not anything changed.",
        why: [
          "Sai: tải lại file y nguyên không phát hiện được gì đã đổi. File cũ tải lại vẫn là file cũ.",
          "Không ai được giao xem quy trình mới khác gì, cũng không ai rà instructions (ý 2).",
          "Dễ bị cuốn vì có nhịp đều đặn, nghe giống lịch rà soát. Nhưng rà soát là kiểm nội dung còn đúng không, còn tải lại chỉ là lặp một thao tác."
        ] },
      { k: "B", gist: "Name an owner and a review date so the instructions and documents are checked every quarter.",
        why: [
          "Có người chịu trách nhiệm (ý 1) và có lịch rà soát khớp nhịp đổi của quy trình (ý 2).",
          "Rà cả instructions lẫn tài liệu, nên không còn dòng instructions nào nhắc quy trình cũ."
        ] },
      { k: "C", gist: "Ask anyone who spots an error to fix the knowledge base themselves whenever they happen to notice it.",
        why: [
          "Sai: ai thấy thì sửa, nên chỗ không ai để ý thì cứ sai mãi, còn thay đổi thì không ai ghi lại.",
          "Nhiều người cùng sửa dễ thành nhiều bản (ý 1). Người chỉ có Can view còn không sửa được (ý 3)."
        ] },
      { k: "D", gist: "Rely on members to state in their prompts which parts of the documents are now out of date.",
        why: [
          "Sai: giả định ai cũng biết cái gì đã đổi. Người cần hỏi Claude thường chính là người không biết.",
          "Lời dặn trong prompt chỉ sống trong chat đó (ý 4). Knowledge vẫn cũ cho mọi chat khác."
        ] }
    ],
    refs: [
      { label: "Bài 5.4, mục “Người phụ trách, lịch rà soát, báo cho người dùng”: mỗi mảng một người Can edit, rà theo lịch và khi nguồn đổi", href: NOTES + "#l-5-4" }
    ]
  },
  {
    de: 1, n: 50, total: 60, sub: "1.1", subName: "Viết prompt rõ yêu cầu, lý do, nguồn, mẫu",
    answer: "AC",
    ask: "An operations manager is writing a prompt for a weekly incident summary that the executive team reads every Monday; a partner firm also receives the same summary. Which two elements should the prompt include so the output is usable without rework? (Select two.)",
    scene: [
      "Một quản lý vận hành viết prompt cho bản tóm tắt sự cố hàng tuần.",
      "Hai nhóm đọc: ban giám đốc đọc mỗi thứ Hai, và một công ty đối tác bên ngoài cũng nhận đúng bản đó.",
      "Đề đòi “usable without rework” (dùng được ngay, không phải sửa lại). Chỗ khó: năm phương án đều là thứ người ta hay viết vào prompt, nhưng chỉ vài thứ thật sự đổi được output."
    ],
    asks: [
      "Hai thứ nào nên có trong prompt để output dùng được ngay?",
      "Tức là: những gì đang nằm trong đầu người viết mà Claude cần biết, để khỏi phải cắt, sắp lại hay xóa thông tin nhạy cảm sau.",
      "Soi từng phương án: nó cho Claude một yêu cầu kiểm được, hay chỉ thêm chữ?"
    ],
    facts: [
      "Prompt yếu vì những gì người viết biết không được viết ra: việc và độ sâu, người đọc, định dạng, ràng buộc, nguồn. Giới hạn viết vào lời yêu cầu ngay từ đầu, đừng để lúc duyệt mới cắt.",
      "Lời dặn có kèm lý do thì Claude suy rộng được, áp cho cả những ca bạn chưa kể.",
      "Câu nào không thêm thông tin về output (kiểu viết hoa, nhắc lại, thêm dấu chấm than) chỉ làm prompt dài hơn, không làm output tốt hơn.",
      "Dặn “viết giọng chuyên gia, chắc chắn hơn” không làm giảm bịa. Nó chỉ đổi cách trình bày một câu đoán."
    ],
    opts: [
      { k: "A", gist: "The output shape she needs: one page, three headed sections, and no more than six bullets.",
        why: [
          "Định dạng và giới hạn nói ngay từ đầu (ý 1), nên bản ra không phải cắt hay sắp lại.",
          "“One page, three sections, six bullets” (một trang, ba mục, tối đa sáu gạch) kiểm được, khác hẳn “viết ngắn thôi”."
        ] },
      { k: "B", gist: "A note that she is short of time this week and would appreciate a quick turnaround.",
        why: [
          "Sai: Claude không viết khác đi vì người hỏi đang vội.",
          "Câu này thêm chữ vào prompt mà không thêm yêu cầu nào để chấm bản nháp (ý 3)."
        ] },
      { k: "C", gist: "The reason customer names must be excluded: a partner firm also reads the summary.",
        why: [
          "Ràng buộc kèm lý do (ý 2). Biết có đối tác bên ngoài đọc, Claude tự cẩn thận cả với những thông tin nội bộ khác mà prompt chưa kể tên.",
          "Thiếu câu này thì bản gửi đối tác phải xóa tên khách bằng tay, tức là phải sửa lại."
        ] },
      { k: "D", gist: "An instruction telling Claude to use its own judgment about what executives care about.",
        why: [
          "Sai: giao ngược phần mô tả cho Claude. Claude không biết ban giám đốc này cần gì, nên sẽ đoán ra một bản nghe hợp lý (ý 1).",
          "Đây là điều ngược với viết ra những gì đang nằm trong đầu mình."
        ] },
      { k: "E", gist: "A request that the summary be written to sound authoritative and well informed.",
        why: [
          "Sai: giọng chắc chắn đổi cách nghe, không đổi nội dung (ý 4). Nó còn có thể đẩy Claude viết chắc hơn mức sự thật trong tuần cho phép.",
          "Dễ bị cuốn vì người đọc là ban giám đốc, giọng uy tín nghe rất hợp. Nhưng thứ làm bản tóm tắt dùng được ngay là định dạng và ràng buộc rõ, không phải giọng."
        ] }
    ],
    refs: [
      { label: "Bài 1.1, mục “Viết ra những gì đang nằm trong đầu bạn” và “Nói lý do”: định dạng, giới hạn nói từ đầu, lời dặn kèm lý do thì Claude suy rộng được", href: NOTES + "#l-1-1" },
      { label: "Bài 2.3, mục “Trước khi Claude viết”: dặn giọng chắc chắn không làm giảm bịa", href: NOTES + "#l-2-3" }
    ]
  },
  {
    de: 1, n: 51, total: 60, sub: "6.3", subName: "Làm việc trong chính sách AI của công ty",
    answer: "C",
    ask: "A hospital puts a Claude-powered chatbot on its patient portal to answer questions about medication side effects. Under Anthropic's Usage Policy rules for high-risk, consumer-facing use, what is the hospital required to do before patients rely on the chatbot's answers?",
    scene: [
      "Bệnh viện đặt một chatbot chạy bằng Claude trên cổng thông tin cho bệnh nhân. Chatbot trả lời câu hỏi về tác dụng phụ của thuốc.",
      "Người hỏi là bệnh nhân, tức người tiêu dùng nói chuyện thẳng với AI. Chủ đề là y tế, lĩnh vực Usage Policy (chính sách sử dụng của Anthropic) xếp vào rủi ro cao.",
      "Chỗ khó: phương án nào cũng nghe như một biện pháp cẩn thận cho bệnh nhân. Đề hỏi điều Usage Policy bắt buộc, không hỏi biện pháp nào nghe an toàn nhất."
    ],
    asks: [
      "Theo Usage Policy, bệnh viện bắt buộc phải làm gì trước khi bệnh nhân dựa vào câu trả lời của chatbot?",
      "Tức là: gọi đúng nghĩa vụ Usage Policy đặt cho chatbot hướng tới người tiêu dùng trong lĩnh vực rủi ro cao, không phải một biện pháp tự nghĩ ra.",
      "Soi từng phương án: nó thực hiện nghĩa vụ đó, hay chỉ né nó, hay lo một chuyện khác?"
    ],
    facts: [
      "Usage Policy bắt chatbot hay agent nói chuyện trực tiếp với người tiêu dùng phải cho họ biết họ đang nói chuyện với AI, ít nhất ở đầu mỗi phiên chat hoặc ngay trên giao diện.",
      "Ca rủi ro cao (y tế, pháp lý, tài chính, việc làm…): lời khuyên về một người cụ thể cần người có chuyên môn duyệt trước, và người nhận phải được báo rõ là có dùng AI. Báo rõ có dùng AI là đủ, không bắt buộc nêu tên Anthropic hay Claude.",
      "Một câu miễn trừ kiểu “nội dung do AI tạo, có thể sai” không chuyển được trách nhiệm đi đâu. Công khai đạt là thông báo rõ, đặt ở chỗ người ta thấy ngay.",
      "Đáp án né vấn đề (chặn hẳn, bỏ việc) là sai khi đã có cách làm hợp lệ."
    ],
    opts: [
      { k: "A", gist: "Have patients sign a liability waiver that acknowledges the chatbot's limits before it gives any answer about medication.",
        why: [
          "Sai ở mục đích: giấy miễn trừ trách nhiệm là để chuyển rủi ro pháp lý, không phải để báo cho bệnh nhân biết họ đang nói chuyện với AI (ý 1).",
          "Usage Policy không cho thay việc công khai bằng giấy miễn trừ. Bệnh viện vẫn chịu trách nhiệm với câu trả lời (ý 3).",
          "Dễ bị cuốn vì giấy có ghi “giới hạn của chatbot”, nghe gần giống công khai. Nhưng đó là thủ tục pháp lý bắt bệnh nhân ký, không phải lời báo rõ “bạn đang nói chuyện với AI” ở đầu phiên."
        ] },
      { k: "B", gist: "Configure the chatbot to send every patient to phone their pharmacist instead of answering any medication question.",
        why: [
          "Sai vì né việc: chatbot không trả lời gì nữa, nghĩa vụ công khai không được thực hiện mà chỉ bị tránh đi (ý 4).",
          "Usage Policy cho dùng Claude ở lĩnh vực y tế khi đủ điều kiện. Đề hỏi điều “must” (bắt buộc) làm, không hỏi cách khỏi phải làm."
        ] },
      { k: "C", gist: "Clearly tell patients they are talking to an AI system before they receive any medical guidance from the chatbot.",
        why: [
          "Đúng nghĩa vụ của chatbot cho người tiêu dùng: báo rõ đây là AI, ngay từ đầu phiên (ý 1).",
          "Cũng là điều kiện công khai của ca rủi ro cao: người nhận lời khuyên y tế phải biết có dùng AI (ý 2). Báo trước khi nhận hướng dẫn, nên bệnh nhân biết mà cân nhắc trước khi làm theo."
        ] },
      { k: "D", gist: "Limit replies to word-for-word excerpts from public FDA drug labels so the chatbot never generates original text.",
        why: [
          "Lo chuyện nguồn nội dung (nhãn thuốc công khai của FDA, cơ quan quản lý thuốc Mỹ), không đụng tới chuyện công khai (ý 1). Bệnh nhân vẫn không biết mình đang nói chuyện với AI.",
          "Usage Policy không đòi chỉ được trích nguyên văn. Đoạn trích vẫn do một chatbot AI đưa ra, vẫn phải báo là AI."
        ] }
    ],
    refs: [
      { label: "Bài 6.4, mục “Khi nào phải nói là có dùng AI”: chatbot cho khách phải nói là AI ở đầu phiên hoặc trên giao diện", href: NOTES + "#l-6-4" },
      { label: "Bài 6.1, mục “Vùng vàng”: hai điều kiện của ca rủi ro cao, người có chuyên môn duyệt và công khai", href: NOTES + "#l-6-1" },
      { label: "Usage Policy của Anthropic: yêu cầu cho ca rủi ro cao và yêu cầu công khai với chatbot", href: "https://www.anthropic.com/legal/aup" }
    ]
  },
  {
    de: 1, n: 52, total: 60, sub: "2.5", subName: "Sửa output cho đúng người đọc",
    answer: "A",
    ask: "A technical writer has two drafts of an API integration guide: one for experienced developers, one for users of a low-code platform. Before publishing, the writer wants to check the two drafts for consistency. What should the writer confirm?",
    scene: [
      "Người viết tài liệu có hai bản hướng dẫn tích hợp API (giao diện để hai hệ thống gọi nhau). Một bản cho lập trình viên có kinh nghiệm, một bản cho người dùng nền tảng low-code (kéo thả, gần như không viết code).",
      "Trước khi đăng, cần kiểm hai bản có “consistency” (nhất quán) không.",
      "Chỗ khó: hai bản phải khác nhau để hợp hai nhóm người đọc, mà vẫn phải nhất quán. Câu hỏi là nhất quán ở phần nào, được khác ở phần nào."
    ],
    asks: [
      "Người viết nên xác nhận điều gì khi so hai bản?",
      "Tức là: tách phần bắt buộc giống nhau (các bước, kết quả, sự thật) khỏi phần được phép khác (từ ngữ, độ sâu, cách trình bày)."
    ],
    facts: [
      "Hai nhóm người đọc khác nền thì làm hai bản, mỗi bản đúng mức của nhóm đó.",
      "Độ chính xác áp cho mọi bản. Bản cho người ít chuyên môn được đổi cách giải thích, không được đổi sự thật, không được bỏ điều kiện bắt buộc.",
      "Fit (độ hợp người đọc) khác độ chính xác: hai bản đúng như nhau vẫn có thể hợp người đọc rất khác nhau."
    ],
    opts: [
      { k: "A", gist: "Confirm that both drafts describe the same steps and the same results, differing only in wording and depth.",
        why: [
          "Đúng chỗ phải giống: cùng các bước, cùng kết quả. Đó là phần sự thật, áp cho mọi bản (ý 2).",
          "Đúng chỗ được khác: từ ngữ và độ sâu, để mỗi bản hợp nhóm người đọc của nó (ý 1, ý 3)."
        ] },
      { k: "B", gist: "Check that both drafts carry identical code samples so they stay uniform.",
        why: [
          "Sai ở chỗ coi nhất quán là giống hệt. Người dùng low-code thường không viết code, nên code mẫu cho lập trình viên không hợp với họ (ý 1).",
          "Nhất quán cần ở các bước và kết quả, không ở hình thức trình bày (ý 2).",
          "Dễ bị cuốn vì “identical” (giống hệt) nghe như mức nhất quán cao nhất. Nhưng ép giống hệt là bỏ luôn lý do phải làm hai bản."
        ] },
      { k: "C", gist: "Leave authentication out of the low-code draft, because low-code users only need the base URL.",
        why: [
          "Sai vì bỏ một bước bắt buộc. Không có bước xác thực (authentication: chứng minh mình được phép gọi API) thì người dùng low-code không gọi được API.",
          "Bản cho người ít chuyên môn được giải thích đơn giản hơn, không được bỏ điều kiện thật (ý 2)."
        ] },
      { k: "D", gist: "Make the developer draft essentially a condensed version of the low-code guide.",
        why: [
          "Sai vì coi bản cho lập trình viên chỉ là bản rút gọn. Hai nhóm cần độ sâu và cách trình bày khác nhau: lập trình viên cần chi tiết kỹ thuật và code mẫu, không phải ít chữ hơn (ý 1).",
          "Đề cũng không hỏi cách viết từng bản. Đề hỏi khi so hai bản thì phải xác nhận điều gì."
        ] }
    ],
    refs: [
      { label: "Bài 2.5, mục “Một nội dung, nhiều người đọc”: mỗi nhóm một bản, đổi cách giải thích nhưng không đổi sự thật", href: NOTES + "#l-2-5" }
    ]
  },
  {
    de: 1, n: 53, total: 60, sub: "6.2", subName: "Dữ liệu nhạy cảm và quy định",
    answer: "B",
    ask: "A consultant wants to paste a client's confidential strategy deck into Claude to get a summary. Before doing that, what matters most?",
    scene: [
      "Một tư vấn viên muốn dán bộ slide chiến lược mật của khách vào Claude để tóm tắt.",
      "Tài liệu không phải của tư vấn viên. Đó là tài liệu mật khách giao, thường đi kèm điều khoản bảo mật trong hợp đồng.",
      "Chỗ khó: bốn phương án đều là câu hỏi có thật. Đề hỏi câu “matters most” (quan trọng nhất), tức câu phải trả lời trước khi bấm gửi."
    ],
    asks: [
      "Trước khi dán bộ slide vào, điều gì quan trọng nhất?",
      "Tức là: tìm câu hỏi quyết định có được đưa tài liệu này vào Claude hay không. Các câu khác chỉ có nghĩa khi câu đó đã là “được”."
    ],
    facts: [
      "Tài liệu mật của doanh nghiệp (hợp đồng khách, kế hoạch, chiến lược) bị ràng buộc bởi hợp đồng bảo mật (NDA). Help Center khuyên cân nhắc kỹ trước khi đưa tài liệu mật vào chat.",
      "Dữ liệu khách giao cho bạn thì làm theo hợp đồng và chính sách công ty. Phân vân thì hỏi bộ phận tuân thủ trước khi gửi.",
      "Mọi quyết định nằm trước lúc bấm gửi. Đã gửi thì dữ liệu nằm trong chat, theo luật lưu trữ của tài khoản; xóa chat chỉ giảm được, không gỡ hết.",
      "Project mở cho cả tổ chức thì ai trong tổ chức cũng xem được knowledge. Đây là chuyện đặt dữ liệu ở đâu, sau khi đã được phép đưa vào."
    ],
    opts: [
      { k: "A", gist: "Whether Claude's summary will be accurate enough to send to the client with no further editing.",
        why: [
          "Đây là chuyện chất lượng output. Nó không trả lời được chuyện có được đưa tài liệu vào hay không (ý 1).",
          "Tóm tắt hay tới đâu mà hợp đồng không cho đưa tài liệu vào công cụ bên ngoài thì vẫn là vi phạm, và đã gửi thì không rút lại được (ý 3)."
        ] },
      { k: "B", gist: "Whether the client's contract allows their material to be processed in a third-party tool at all.",
        why: [
          "Đây là câu chặn cửa: tài liệu mật của khách chịu điều khoản bảo mật, và hợp đồng quyết có được đưa vào công cụ của bên thứ ba như Claude không (ý 1, ý 2).",
          "Phải trả lời trước khi bấm gửi, vì sau đó chỉ còn giảm thiệt hại (ý 3). Hợp đồng cho phép rồi mới tới chuyện dùng tài khoản nào, chia sẻ cho ai, tóm tắt có đạt không."
        ] },
      { k: "C", gist: "Whether the deck is short enough to fit into a single conversation without being split.",
        why: [
          "Độ dài là chuyện kỹ thuật, không cho biết tài liệu có được phép đưa vào không.",
          "Bộ slide dài thì chia ra hoặc dùng Project là xong. Còn hợp đồng cấm thì chia nhỏ vẫn là đưa tài liệu mật vào (ý 1)."
        ] },
      { k: "D", gist: "Whether the consultant's colleagues will be able to see the summary in a shared project workspace.",
        why: [
          "Đây là rủi ro có thật: Project mở cho cả tổ chức thì ai cũng xem được (ý 4). Nhưng câu này chỉ đặt ra sau khi đã được phép đưa tài liệu vào.",
          "Dễ bị cuốn vì nó nghe đúng chất Domain 6: ai thấy được dữ liệu. Nhưng chưa biết có được dán hay không thì bàn chuyện ai xem là quá sớm."
        ] }
    ],
    refs: [
      { label: "Bài 6.2, mục “Quy định: GDPR, HIPAA và luật nơi bạn làm”: tài liệu mật khách giao thì theo hợp đồng và chính sách, phân vân thì hỏi trước khi gửi", href: NOTES + "#l-6-2" },
      { label: "Bài Nền tảng Domain 6, mục “Dữ liệu nào là nhạy cảm”: mật doanh nghiệp bị ràng buộc bởi NDA", href: NOTES + "#l-6-0" }
    ]
  },
  {
    de: 1, n: 54, total: 60, sub: "2.5", subName: "Sửa output cho đúng người đọc",
    answer: "A",
    ask: "A customer success manager asks Claude to rewrite a churn-risk analysis, first written for data scientists, so it can go to account executives who need to know which accounts to prioritize and what actions to take. Which change best reflects an effective refinement?",
    scene: [
      "Bản phân tích nguy cơ khách rời bỏ (churn risk) viết cho nhóm khoa học dữ liệu: nặng phần phương pháp, mô hình.",
      "Giờ phải gửi cho account executive (người phụ trách bán hàng cho từng tài khoản khách). Họ cần biết ưu tiên tài khoản nào, và làm gì.",
      "Chỗ khó: nội dung đã đúng. Cái cần đổi là bản này có hợp người đọc mới không."
    ],
    asks: [
      "Thay đổi nào thể hiện đúng một lần chỉnh hiệu quả?",
      "Tức là: sắp lại bản phân tích theo đúng việc người đọc mới phải làm sau khi đọc: chọn tài khoản và hành động.",
      "Soi từng phương án: nó đưa thứ người đọc cần lên trước, hay chỉ đổi bề mặt, hay thêm thứ họ không dùng, hay bỏ mất thứ họ cần?"
    ],
    facts: [
      "Người đọc đích: họ biết gì rồi, cần gì, đọc xong phải làm gì. Fit (độ hợp người đọc) khác độ chính xác.",
      "Điều quan trọng nhất với người đọc phải đứng đầu. Đổi từ ngữ hay cắt ngắn mà giữ thứ tự cũ thì vẫn đúng chữ, sai ý.",
      "Bản cho người đọc khác được đổi cách trình bày, không được bỏ sự thật người đọc cần."
    ],
    opts: [
      { k: "A", gist: "Reorganize around the prioritized accounts and the recommended actions, and move the methodology to an appendix.",
        why: [
          "Đưa thứ account executive cần làm lên đầu: tài khoản nào trước, hành động gì (ý 1, ý 2).",
          "Phương pháp vẫn còn ở phụ lục, ai cần kiểm thì mở. Không mất sự thật nào, chỉ đổi thứ tự cho hợp người đọc (ý 3)."
        ] },
      { k: "B", gist: "Keep the same structure and only swap the word “churn” for “account attrition” throughout.",
        why: [
          "Chỉ đổi một từ, khung bài vẫn là của nhóm khoa học dữ liệu: phương pháp trước, việc cần làm chôn ở sau (ý 2).",
          "Dễ bị cuốn vì nó có vẻ “chỉnh cho người đọc”. Nhưng người đọc không khổ vì một từ, họ khổ vì không thấy ngay phải làm gì."
        ] },
      { k: "C", gist: "Add more detail on the model's feature weights so the executives fully understand the scoring.",
        why: [
          "Đi ngược người đọc: account executive cần ưu tiên và hành động, không cần trọng số của mô hình (ý 1).",
          "Thêm chi tiết kỹ thuật làm phần cần đọc bị chôn sâu hơn nữa."
        ] },
      { k: "D", gist: "Remove every account name so the analysis focuses only on aggregate customer trends.",
        why: [
          "Bỏ đúng thứ người đọc cần: không có tên tài khoản thì không biết ưu tiên ai (ý 1, ý 3).",
          "Nghe như tối thiểu hóa dữ liệu, nhưng đó là chuyện đưa gì vào Claude. Ở đây người đọc là nhân viên nội bộ cần đúng các tài khoản đó để làm việc."
        ] }
    ],
    refs: [
      { label: "Bài 2.5, mục “Đúng chữ, sai ý”: nói mục đích, đưa điều người đọc cần lên đầu", href: NOTES + "#l-2-5" }
    ]
  },
  {
    de: 1, n: 55, total: 60, sub: "1.3", subName: "Lặp prompt: chẩn đoán, đổi một chỗ, thử lại",
    answer: "CD",
    ask: "After five rounds of corrections, a policy draft keeps bringing back problems that had already been fixed, and the chat has become hard to follow. Which two steps should the author take? (Select two.)",
    scene: [
      "Một bản nháp chính sách đã qua năm vòng sửa trong cùng một chat.",
      "Lỗi đã sửa lại quay về: sửa chỗ này thì chỗ đã ổn hỏng lại. Chat dài, rối, khó theo dõi.",
      "Chỗ khó: vòng nào cũng sửa được một lỗi thật, nên dễ tưởng là đang tiến. Thật ra chính vòng lặp đang sinh lỗi."
    ],
    asks: [
      "Hai bước nào tác giả nên làm?",
      "Tức là: cắt đúng hai nguyên nhân. Một: các lời sửa nằm rải rác qua nhiều lượt, có khi chọi nhau. Hai: Claude không biết phần nào đã chốt, nên cứ đụng vào."
    ],
    facts: [
      "Claude đọc cả các lượt trước, kể cả bản nháp hỏng và lời sửa cũ. Sửa nhiều vòng trong một chat mà output vẫn mang lỗi cũ thì bắt đầu lại: mở chat mới với một prompt đã gom mọi điều chỉnh.",
      "Chat càng dài, Claude càng khó nhớ chính xác những gì nằm trong đó (context rot: context bị mục). Chat dài còn có thể bị tự tóm tắt, chi tiết cũ bị nén.",
      "Giới hạn mà người giao việc biết thì viết thẳng vào lời yêu cầu, không để Claude đoán.",
      "Sửa mà không đổi điều kiện gây ra lỗi thì chỉ nhận một bản khác, không chắc tốt hơn."
    ],
    opts: [
      { k: "A", gist: "Ask Claude to look back over the chat and remember every correction made so far.",
        why: [
          "Vẫn để Claude tự đọc lại chính đống lượt rối đã gây ra lỗi (ý 1, ý 2). Lời sửa vẫn rải rác, cái nào chọi cái nào vẫn không ai gỡ.",
          "Dễ bị cuốn vì nó nhắm đúng triệu chứng “quên lời sửa”. Nhưng nhờ Claude nhớ không thay được việc tự gom yêu cầu về một chỗ."
        ] },
      { k: "B", gist: "Keep going with more rounds, since each round has fixed at least one real issue.",
        why: [
          "Sửa một chỗ, hỏng lại một chỗ thì không phải tiến. Điều kiện gây lỗi (chat rối, yêu cầu rải rác) vẫn nguyên (ý 4).",
          "Thêm vòng là thêm lượt vào chính cái chat đang làm lỗi quay lại (ý 2)."
        ] },
      { k: "C", gist: "Start again with one prompt that gathers every agreed requirement in one place.",
        why: [
          "Đúng bước “bắt đầu lại” của bài 1.3: gom mọi điều chỉnh đã thống nhất vào một prompt, làm trong chat mới (ý 1).",
          "Gom lại thì lời sửa chọi nhau lộ ra và được chốt một lần. Chat mới không còn bản nháp hỏng và lời sửa cũ kéo Claude về lỗi cũ."
        ] },
      { k: "D", gist: "State plainly which parts of the current draft are settled and must be left untouched.",
        why: [
          "Phần đã chốt là một ràng buộc. Không nói ra thì Claude không biết, và mỗi lần sửa có thể viết lại luôn chỗ đã ổn (ý 3).",
          "Bước này khác C: C gom yêu cầu về một chỗ, D khóa phạm vi được đổi. Khóa lại thì lỗi đã sửa không quay về nữa."
        ] },
      { k: "E", gist: "Switch to a different topic for a while and then come back, to give the draft a fresh start.",
        why: [
          "Đổi chủ đề trong cùng chat không làm mới gì. Mọi lượt cũ vẫn nằm đó, lại thêm nội dung không liên quan vào context (ý 2).",
          "“Fresh start” (bắt đầu mới) thật sự là mở chat mới với prompt đã gom, tức là phương án C."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Dừng, bắt đầu lại, hay lưu”: sửa nhiều vòng mà lỗi cũ còn thì mở chat mới với prompt đã gom mọi điều chỉnh", href: NOTES + "#l-1-3" },
      { label: "Bài 3.4: context rot, chat dài bị tự tóm tắt làm chi tiết cũ bị nén", href: NOTES + "#l-3-4" },
      { label: "Cheatsheet D1: giới hạn người giao việc biết thì viết thẳng vào yêu cầu", href: NOTES + "#cheat-d1" }
    ]
  },
  {
    de: 1, n: 56, total: 60, sub: "3.4", subName: "Context có hạn: chat mới, tóm tắt, lưu lại",
    answer: "C",
    ask: "An operations manager hits her usage limit before lunch on nearly every working day and is frustrated by the interruptions. What should she do first?",
    scene: [
      "Chị quản lý vận hành gần như ngày nào cũng chạm usage limit (hạn mức dùng) trước giờ trưa.",
      "Chị chưa biết vì sao hạn mức cạn nhanh: do chat dài, do dùng model nặng cho mọi việc, do bật nhiều connector, hay do khối lượng việc thật sự lớn.",
      "Chỗ khó: đề hỏi “first” (trước tiên). Mấy phương án là cách xử lý có thể đúng ở ca nào đó, nhưng chưa biết nguyên nhân thì chọn cách nào cũng là đoán."
    ],
    asks: [
      "Chị nên làm gì trước tiên?",
      "Tức là: trước khi đổi cách làm hay trả thêm tiền, phải biết hạn mức đang bị tiêu vào đâu."
    ],
    facts: [
      "Usage limit (hạn mức dùng) tính chung trên mọi chat, theo phiên 5 giờ và theo tuần. Length limit (giới hạn độ dài) là độ dài của một chat, do context window của model quyết. Hai giới hạn khác nhau, cách xử lý khác nhau.",
      "Hạn mức đã dùng xem ở Settings → Usage. Claude trên web, Desktop và Claude Code trừ chung một hạn mức.",
      "Nhiều thứ làm hạn mức cạn nhanh: chat dài (mỗi tin nhắn tốn hơn), tầng model nặng, connector và web search đang bật, effort cao.",
      "Hết hạn mức thì chờ reset, nâng gói (áp ngay) hoặc dùng usage credits. Mở chat mới không gỡ được hạn mức đã hết."
    ],
    opts: [
      { k: "A", gist: "Move all her work into brand-new chats every morning so each conversation starts with an empty window.",
        why: [
          "Nhắm sai giới hạn: “empty window” (context trống) là cách xử lý giới hạn độ dài. Hạn mức dùng tính chung trên mọi chat, chat mới vẫn trừ vào cùng một hạn mức (ý 1, ý 4).",
          "Chat dài có làm tốn hạn mức hơn thật (ý 3). Nhưng chưa xem số liệu thì chưa biết chat dài có phải nguyên nhân của chị không."
        ] },
      { k: "B", gist: "Switch every task to the deepest-reasoning model so fewer follow-up messages are needed to finish.",
        why: [
          "Ngược hướng: tầng lập luận sâu nhất tiêu hạn mức nhanh nhất (ý 3). Chạy cả việc dễ trên tầng nặng thì hạn mức cạn còn sớm hơn.",
          "Bớt vài tin nhắn hỏi lại không bù được mức tiêu của tầng nặng trên mọi việc."
        ] },
      { k: "C", gist: "Check the usage view in her settings to see what her recent sessions actually used, before changing anything.",
        why: [
          "Chẩn đoán trước khi sửa: Settings → Usage cho thấy hạn mức phiên và tuần đã đi bao nhiêu (ý 2).",
          "Biết hạn mức cạn vì đâu rồi mới chọn đúng cách xử lý (ý 3): chuyển việc dễ xuống tầng nhẹ, tắt connector không cần, mở chat mới cho việc mới, hay mới tính tới nâng gói."
        ] },
      { k: "D", gist: "Upgrade right away to the highest plan tier so the daily interruptions simply stop.",
        why: [
          "Nâng gói có giúp với hạn mức dùng, và áp ngay (ý 4). Nhưng đó là trả tiền khi chưa biết hạn mức đang bị tiêu vào đâu.",
          "Nếu nguyên nhân là chạy mọi việc trên model nặng hay bật connector thừa, đổi cách dùng là đủ, không cần trả thêm.",
          "Dễ bị cuốn vì đây là cách chắc chắn làm hạn mức to ra. Nhưng đề hỏi “first” (trước tiên), và bước đầu là xem số liệu."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, mục “Hai giới hạn, hai cách xử lý”: hạn mức dùng khác giới hạn độ dài, xem ở Settings → Usage", href: NOTES + "#l-3-4" },
      { label: "Bài 3.2, mục “Hạn mức: tầng nặng tiêu nhanh hơn”", href: NOTES + "#l-3-2" },
      { label: "Help Center: hạn mức dùng và giới hạn độ dài hoạt động thế nào", href: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work" }
    ]
  },
  {
    de: 1, n: 57, total: 60, sub: "6.1", subName: "Việc nào giao cho Claude được",
    answer: "AC",
    ask: "A logistics company proposes a workflow in which Claude reads supplier refund disputes and sends its final decision straight to the supplier, with no review. Which two features of the proposal make it inappropriate? (Select two.)",
    scene: [
      "Công ty logistics đề xuất: Claude đọc các vụ tranh chấp hoàn tiền với nhà cung cấp, ra quyết định cuối, rồi gửi thẳng cho nhà cung cấp.",
      "Không ai xem trước khi gửi.",
      "Chỗ khó: năm phương án đều nói về một điểm có thật của đề xuất. Chỉ hai điểm là lý do việc này không nên giao cho Claude theo cách đó."
    ],
    asks: [
      "Hai đặc điểm nào làm đề xuất này không phù hợp?",
      "Tức là: xét theo phép thử “kiểm được, sửa được” và câu hỏi ai chịu trách nhiệm, không xét Claude có làm nổi hay có đáng tiền không."
    ],
    facts: [
      "Phép thử “kiểm được, sửa được”: việc hợp với Claude khi lỗi được phát hiện và sửa trước khi gây hại. Kiểm được là có người đủ chuyên môn xem output trước khi dùng. Sửa được là lỗi lọt qua thì gỡ lại rẻ.",
      "Irreversible (không rút lại được): email đã gửi, quyết định đã báo cho đối tác, khoản tiền đã chuyển. Người duyệt chỉ cứu được khi đứng trước lúc gây hại.",
      "Accountability (trách nhiệm giải trình): người dùng output là người chịu trách nhiệm. Người duyệt phải là người trả lời khi kết quả sai.",
      "Soạn email, tóm tắt, đọc tài liệu là việc vùng xanh: dùng bình thường, rồi kiểm như mọi output."
    ],
    opts: [
      { k: "A", gist: "Once the decision reaches the supplier it has already taken effect, so a wrong outcome cannot quietly be undone.",
        why: [
          "Trượt vế “sửa được”: quyết định tới tay nhà cung cấp là đã có hiệu lực, sai thì không gỡ lặng lẽ được (ý 1, ý 2).",
          "Hành động càng khó gỡ, càng phải có người xem trước khi nó xảy ra."
        ] },
      { k: "B", gist: "Disputes come in as long email threads, and Claude is far less reliable with threads than with structured forms.",
        why: [
          "Sai ở giả định: đọc và tóm tắt chuỗi email là việc dùng bình thường của Claude (ý 4).",
          "Định dạng đầu vào không phải lý do đề xuất này sai. Đổi sang biểu mẫu mà vẫn gửi thẳng, không ai xem, thì vẫn sai y như cũ.",
          "Dễ bị cuốn vì nó nghe như một giới hạn kỹ thuật có thật. Nhưng vấn đề nằm ở khâu sau: quyết định đi thẳng ra ngoài, không ai xem, không ai chịu."
        ] },
      { k: "C", gist: "No one at the firm is answerable for any individual decision, because no person sees a case before it is sent.",
        why: [
          "Trượt vế “kiểm được”, và không ai chịu trách nhiệm cho từng quyết định (ý 1, ý 3).",
          "Đây là vấn đề riêng, khác A: kể cả quyết định gỡ được, vẫn phải có một người đứng ra trả lời cho từng ca."
        ] },
      { k: "D", gist: "Refund thresholds are revised every quarter, so the standing instructions would need updating several times a year.",
        why: [
          "Cập nhật chỉ dẫn định kỳ là việc bảo trì bình thường. Quy trình nào cũng có, có người duyệt hay không.",
          "Nó không làm việc giao cho Claude thành sai. Chỉ cần một quy trình giữ cấu hình luôn đúng."
        ] },
      { k: "E", gist: "The firm gets too few disputes each month for automation to save any meaningful staff time.",
        why: [
          "Đây là chuyện có đáng làm hay không về kinh doanh. Không phải lý do việc này không hợp để giao cho Claude.",
          "Số vụ nhiều gấp chục lần mà vẫn gửi thẳng, không ai xem, thì vẫn sai như cũ."
        ] }
    ],
    refs: [
      { label: "Bài 6.1, mục “Phép thử kiểm được, sửa được”: báo số tiền hoàn cho khách, gửi thẳng, không ai đọc là không hợp", href: NOTES + "#l-6-1" },
      { label: "Bài 2.4: không rút lại được là tín hiệu nâng mức duyệt; người duyệt là người chịu trách nhiệm", href: NOTES + "#l-2-4" },
      { label: "Bài 6.4, mục “Bạn gửi thì bạn chịu”: trách nhiệm giải trình", href: NOTES + "#l-6-4" }
    ]
  },
  {
    de: 1, n: 58, total: 60, sub: "3.4", subName: "Context có hạn: chat mới, tóm tắt, lưu lại",
    answer: "AB",
    ask: "A researcher's chat is nearing its context limit, and Claude starts condensing the earlier messages in that conversation. Which two statements about this are accurate? (Select two.)",
    scene: [
      "Chat của một nhà nghiên cứu sắp chạm giới hạn context.",
      "Claude bắt đầu “condensing” (cô đọng lại) các tin nhắn cũ trong chat đó.",
      "Chỗ khó: cô đọng dễ bị hiểu thành xóa, thành context được nới to, hay thành báo hết hạn mức."
    ],
    asks: [
      "Hai câu nào đúng về việc này?",
      "Tức là: hiểu đúng automatic context management (Claude tự quản lý context): nó làm gì, giữ gì, và không làm gì."
    ],
    facts: [
      "Trên gói trả phí có bật code execution, khi chat gần chạm giới hạn, Claude tự tóm tắt các tin nhắn cũ để có chỗ cho nội dung mới, rồi chat tiếp.",
      "Toàn bộ lịch sử chat vẫn được giữ, Claude vẫn tham chiếu được. Model không đổi.",
      "Context window là của model. Không có cách làm nó to ra cho một chat, nâng gói cũng không.",
      "Hạn mức dùng (usage limit) khác giới hạn độ dài (length limit). Tự tóm tắt có tốn hạn mức hơn, nhưng nó không phải tín hiệu hết hạn mức.",
      "Rủi ro: bản tóm tắt nén chi tiết. Một con số chốt từ đầu có thể mất khỏi phần Claude đang dựa vào."
    ],
    opts: [
      { k: "A", gist: "Claude condenses the earlier messages so the conversation can carry on past that point.",
        why: [
          "Đúng mục đích của tự quản lý context: nén phần cũ để có chỗ, chat đi tiếp thay vì dừng (ý 1)."
        ] },
      { k: "B", gist: "The full chat history stays available to her even after the earlier messages are condensed.",
        why: [
          "Đúng: tóm tắt chỉ đổi thứ Claude đang giữ trong context. Lịch sử chat vẫn còn đủ (ý 2)."
        ] },
      { k: "C", gist: "Condensing raises that one chat's context window up to the next available size.",
        why: [
          "Sai: context window là của model, cô đọng không làm nó to ra (ý 3).",
          "Cô đọng là xếp lại cho vừa trong cùng một window, chính vì window không to ra được."
        ] },
      { k: "D", gist: "Condensing is a signal that her account has used up its usage allowance for the period.",
        why: [
          "Lẫn hai giới hạn: chat gần chạm giới hạn độ dài không nói gì về hạn mức dùng của tài khoản (ý 4).",
          "Tự tóm tắt có tốn hạn mức hơn, nhưng đó là cái giá, không phải dấu hiệu đã hết."
        ] },
      { k: "E", gist: "Condensing permanently erases those earlier messages from the conversation history.",
        why: [
          "Sai: không gì bị xóa, lịch sử chat vẫn nguyên (ý 2).",
          "Dễ bị cuốn vì có một phần đúng: chi tiết cũ bị nén trong phần Claude đang dựa vào, có thể mất một con số (ý 5). Nhưng đó là Claude nhớ kém đi, không phải tin nhắn bị xóa khỏi lịch sử."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, mục “Chat dài trên gói trả phí: Claude tự tóm tắt”: điều kiện, cái giá, rủi ro, lịch sử vẫn giữ", href: NOTES + "#l-3-4" },
      { label: "Help Center: context window trên gói trả phí và tự quản lý context", href: "https://support.claude.com/en/articles/8606394-how-large-is-the-context-window-on-paid-claude-plans" }
    ]
  },
  {
    de: 1, n: 59, total: 60, sub: "2.4", subName: "Khi nào cần người duyệt",
    answer: "A",
    ask: "An operations manager is getting ready to let her team use Claude-drafted replies across a busy customer queue. She has not yet decided who checks what. What should she do first?",
    scene: [
      "Chị quản lý vận hành sắp cho cả nhóm dùng thư trả lời do Claude soạn, cho một hàng đợi khách rất đông.",
      "Chị chưa quyết ai kiểm cái gì.",
      "Chỗ khó: các phương án đều là cách sắp xếp khâu kiểm. Đề hỏi “first” (trước tiên), tức bước phải có trước khi chọn cách kiểm nào."
    ],
    asks: [
      "Chị nên làm gì trước tiên?",
      "Tức là: muốn biết ai kiểm, kiểm gì, kiểm sâu tới đâu, trước hết phải có thứ để kiểm theo."
    ],
    facts: [
      "Duyệt theo rủi ro: trước khi duyệt, hỏi tín hiệu nào đang có (mức hệ trọng, người nhận, rút lại được không, loại nội dung, lĩnh vực được quản lý), và vì vậy ai phải kiểm.",
      "Duyệt theo rủi ro có hai chiều. Bỏ người duyệt ở ca hệ trọng là liều. Bắt mọi thứ qua duyệt kỹ là quá tay, tốn người vào chỗ không cần.",
      "Độ tự tin Claude tự báo không phải tín hiệu đáng tin về độ chính xác. Nhờ Claude tự chấm vẫn là Claude chấm Claude.",
      "Duyệt trước khi gửi. “Gửi trước, ai báo sai thì sửa” là quá muộn.",
      "Chuẩn đạt (success criteria): mô tả cụ thể thế nào là một output “được”. Có chuẩn rồi mới chấm được."
    ],
    opts: [
      { k: "A", gist: "Agree on what a good reply looks like and which mistakes would actually be costly to the business.",
        why: [
          "Đây là thước đo cho mọi khâu kiểm sau: thư thế nào là đạt, lỗi nào gây thiệt thật (ý 5).",
          "Có nó rồi mới chia được mức kiểm theo rủi ro: ca nào kiểm kỹ, ca nào đọc nhanh, ai đủ chuyên môn kiểm (ý 1, ý 2)."
        ] },
      { k: "B", gist: "Ask Claude to flag the replies it is least certain about so those can be sent for checking.",
        why: [
          "Dựa vào độ tự tin Claude tự báo, mà thứ đó không phải tín hiệu đáng tin (ý 3). Thư sai mà Claude rất tự tin sẽ lọt qua.",
          "Cũng chưa trả lời được người kiểm sẽ kiểm theo tiêu chí gì."
        ] },
      { k: "C", gist: "Have two colleagues read every reply, so nothing at all reaches a customer unchecked.",
        why: [
          "Quá tay: hàng đợi đông mà thư nào cũng hai người đọc thì tốn người, chậm, và không dồn sức vào chỗ rủi ro (ý 2).",
          "Người đọc cũng chưa biết phải tìm lỗi gì, vì chưa ai nói thư đạt là thế nào.",
          "Dễ bị cuốn vì nghe cẩn thận nhất. Nhưng đây là chọn cách kiểm khi chưa có thước đo, còn đề hỏi bước đầu tiên."
        ] },
      { k: "D", gist: "Send the replies out and collect complaints, so the team learns which cases were handled badly.",
        why: [
          "Để khách gánh lỗi: thư đã gửi thì không rút lại được (ý 4).",
          "Khâu duyệt có ra là để chặn đúng chuyện này."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, mục “Output nào cũng được xem, nhưng sâu tới đâu thì tùy tín hiệu”: năm tín hiệu, duyệt theo rủi ro hai chiều", href: NOTES + "#l-2-4" },
      { label: "Bài mở đầu “Khẩu vị chọn đáp án”, luật 1: độ tự tin Claude tự báo không phải bằng chứng", href: NOTES + "#l-0-3" },
      { label: "Bài 7.2, mục “Ý kiến trái chiều: thống nhất chuẩn đạt trước”", href: NOTES + "#l-7-2" }
    ]
  },
  {
    de: 1, n: 60, total: 60, sub: "5.2", subName: "File tải lên và connector",
    answer: "BD",
    ask: "A team is about to connect a shared Google Drive to Claude for the first time. Which two considerations matter most before they do it? (Select two.)",
    scene: [
      "Một nhóm sắp nối một Google Drive dùng chung vào Claude, lần đầu.",
      "Drive dùng chung thường chứa nhiều thứ ngoài việc đang cần: hợp đồng, dữ liệu khách, hồ sơ nhân sự.",
      "Chỗ khó: đề hỏi điều quan trọng nhất trước khi nối. Mấy phương án còn lại là hiểu lầm về chuyện connector làm gì."
    ],
    asks: [
      "Hai điều nào quan trọng nhất trước khi nối?",
      "Tức là: connector là quyết định về quyền truy cập dữ liệu. Trước khi nối, cần rõ Claude sẽ với tới đâu, và công ty có cho nối không."
    ],
    facts: [
      "Connector cho Claude vào một ứng dụng khác để tìm, đọc và làm việc thay bạn. Claude kế thừa đúng quyền của tài khoản đã kết nối: tài khoản mở được gì, Claude mở được nấy.",
      "Trên Team, Enterprise: Owner bật connector cho tổ chức, từng người tự đăng nhập, Owner đặt quyền từng công cụ (Always allow, Needs approval, Blocked). Các giới hạn này chỉ thu hẹp quyền.",
      "Chính sách AI của công ty quyết công cụ và connector nào được dùng. Chính sách không nhắc tới là chưa được duyệt, không phải được phép: hỏi người phụ trách trước.",
      "Connector tốn nhiều token, tức là chiếm chỗ trong context và tốn hạn mức. Nó không làm context window to ra; window là của model."
    ],
    opts: [
      { k: "A", gist: "Whether connecting a drive also turns the files in it into Project instructions.",
        why: [
          "Sai ở khái niệm: file lấy qua connector là nguồn kiến thức Claude đọc khi cần. Project instructions là chỉ dẫn do người viết, nằm riêng.",
          "Nối Drive không biến file nào thành chỉ dẫn."
        ] },
      { k: "B", gist: "What the connection actually lets Claude see, so the scope can be narrowed beforehand.",
        why: [
          "Claude thấy đúng những gì tài khoản kết nối thấy (ý 1). Drive dùng chung thì phạm vi đó có thể rộng hơn nhiều so với việc cần làm.",
          "Biết trước để thu hẹp: chọn tài khoản kết nối, quyền trên Drive, quyền từng công cụ (ý 2)."
        ] },
      { k: "C", gist: "Whether the connector removes the need to review answers drawn from those files.",
        why: [
          "Sai: nội dung lấy qua connector vẫn chỉ là nguồn, câu trả lời dựa trên nó vẫn phải kiểm như mọi output.",
          "Connector đổi chỗ Claude lấy dữ liệu, không đổi chuyện Claude có thể đọc sai, tóm sai."
        ] },
      { k: "D", gist: "Whether company policy requires an approval before any data source is connected.",
        why: [
          "Nối một nguồn dữ liệu vào công cụ AI là việc chính sách AI của công ty quyết (ý 3).",
          "Chưa rõ thì hỏi người phụ trách trước, rồi mới tới bước kỹ thuật. Trên Team, Enterprise, connector còn phải được Owner bật trước (ý 2)."
        ] },
      { k: "E", gist: "Whether connecting the drive will permanently increase the size of the context window in use.",
        why: [
          "Sai: context window là của model, connector không làm nó to ra (ý 4).",
          "Dễ bị cuốn vì có một phần đúng: connector tốn nhiều token, có ảnh hưởng tới context thật. Nhưng là chiếm chỗ trong context, không phải nới rộng nó."
        ] }
    ],
    refs: [
      { label: "Bài 5.2, mục “Ai bật, ai được thấy: bốn lớp quyền”: Claude không bao giờ thấy nhiều hơn tài khoản đang kết nối", href: NOTES + "#l-5-2" },
      { label: "Bài 6.3, mục “Bị chặn, hay chính sách không nhắc tới”: chưa nhắc tới là chưa được duyệt", href: NOTES + "#l-6-3" }
    ]
  }
);
