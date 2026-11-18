// Sổ ôn CCAO-F, Đề 3. Trang so-on-ccaof.html nạp file này trước script render.
// Nguồn: freecram Anthropic.CCAO-F.v2026-10-10.q75 (75 câu, mỗi câu kèm đáp án và lời giải), lấy ngày 18/11/2026.
// Giữ đủ 75 câu, n theo số câu gốc. Câu 42 trùng câu 12 (cùng đề, phương án xáo thứ tự): giải thích chép từ câu 12, chữ cái đổi theo thứ tự của câu 42.
// Đáp án đề gốc đã kiểm lại bằng notes CCAO-F và docs chính thức; lời giải freecram chỉ để tham khảo. Bản nguồn: nguon/freecram-ccaof-raw.json (không đưa lên git).
// Mỗi câu một phần tử, xếp theo n. Các trường:
//   de, n, total        số đề trong sổ; số thứ tự câu trong đề gốc; tổng số câu của đề gốc
//   sub, subName        task statement của guide (vd "2.4") và tên bài bằng tiếng Việt
//   answer              đáp án đúng, đã kiểm bằng notes CCAO-F hoặc docs chính thức ("AD" với câu chọn hai)
//   dispute             (tùy chọn) ghi chú khi đáp án đề gốc khác answer, hoặc đề mơ hồ
//   ask, opts[].gist    tiếng Anh, viết lại bằng lời riêng (không chép nguyên văn)
//   scene, asks, facts  phân tích đề: đề kể gì, đề hỏi gì, cần biết trước (tiếng Việt)
//   opts[].why          vì sao phương án đúng hay sai, dạng mảng gạch đầu dòng (tiếng Việt)
//   refs[]              { label, href: NOTES + "#<id có trong notes>" }
DE[3] = "Freecram · 75 câu · 18/11/2026";
ENTRIES.push(
  {
    de: 3, n: 1, total: 75, sub: "4.2", subName: "Research, lập kế hoạch, tối ưu quy trình",
    answer: "AD",
    ask: "An operations lead is ranking research tasks that Claude could take on by how much value each one delivers. In a typical analysis workflow, which two tasks give the highest value? (Select two.)",
    scene: [
      "Một trưởng nhóm vận hành xếp các việc research giao cho Claude theo mức giá trị mang lại.",
      "Năm phương án đều là việc Claude làm được. Chỗ khó: đề không hỏi việc nào làm được, mà hỏi việc nào đáng giá nhất trong một quy trình phân tích.",
      "Một phương án nghe như tiết kiệm công, nhưng thật ra là nhờ Claude viết ra bằng chứng: “representative customer quotes” (câu trích khách hàng “tiêu biểu”) do model tự nghĩ."
    ],
    asks: [
      "Hai việc research nào mang lại giá trị cao nhất?",
      "Tức là: việc nào dùng đúng chỗ Claude mạnh (đọc nhiều chữ, nhiều nguồn, tìm điểm chung, so sánh) và ra kết quả người phân tích dùng tiếp được.",
      "Soi từng phương án: nó cho ra hiểu biết mới, hay chỉ đổi hình thức? Kết quả có dựa trên nguồn thật không?"
    ],
    facts: [
      "Research (loại việc): gom thông tin từ nhiều nguồn để trả lời một câu hỏi. Claude làm việc này bằng cách tìm, so sánh, tổng hợp, kèm nguồn.",
      "Việc hợp Claude: nhiều chữ, mô tả rõ được, đầu ra kiểm được, như tóm tắt, phân loại phản hồi. Định dạng lại cũng hợp và ít rủi ro, nhưng chỉ đổi hình thức, không cho ra kết luận nào.",
      "Hallucination (bịa): nội dung không có cơ sở trong nguồn nào, đọc lên trơn tru như thật. Câu trích nguyên văn là một trong những chỗ bịa hay nằm.",
      "Kết quả tổng hợp phải trỏ về nguồn để kiểm: mỗi chủ đề kèm đoạn trích thật, mỗi khẳng định kèm link. Tài liệu do chính người bán viết thì đối chiếu thêm nguồn độc lập."
    ],
    opts: [
      { k: "A", gist: "Pull together the recurring themes across a big collection of customer interview transcripts.",
        why: [
          "Đúng chỗ Claude mạnh: nhiều bản ghi, nhiều chữ, việc là tìm điểm chung và gom theo chủ đề (ý 1, 2). Làm tay thì mất nhiều ngày, mà mỗi bản lại dễ được gom theo một kiểu.",
          "Đầu ra kiểm được: mỗi chủ đề kèm câu trích thật từ bản ghi, người phân tích mở bản gốc ra soát (ý 4)."
        ] },
      { k: "B", gist: "Tidy up a finished research deck by adjusting its spacing, fonts and slide layout.",
        why: [
          "Claude làm được, nhưng đây là đổi hình thức (ý 2). Bộ slide đã xong, không có kết luận nào mới.",
          "Dễ bị cuốn vì nó tiết kiệm được chút công thật. Nhưng đề hỏi giá trị cao nhất trong quy trình phân tích, mà chỉnh khoảng cách, phông chữ không đụng tới phần phân tích."
        ] },
      { k: "C", gist: "Turn recorded interview audio notes into a transcript laid out as a structured document.",
        why: [
          "Đây là chép lại rồi sắp xếp: chuyển nội dung từ dạng này sang dạng khác, chưa phân tích gì (ý 2).",
          "Bản ghi có cấu trúc chỉ là đầu vào cho bước tổng hợp như A. Giá trị nằm ở bước tổng hợp, không nằm ở bước chép."
        ] },
      { k: "D", gist: "Write a side-by-side summary of competing solutions using publicly available material.",
        why: [
          "Research đúng nghĩa: tìm, so, tổng hợp nhiều nguồn theo cùng một khung (ý 1). Claude xếp tính năng, giá công bố, điểm mạnh yếu của từng bên vào một bảng so sánh.",
          "Người phân tích dành thời gian kiểm nguồn và rút ra ý nghĩa, thay vì gom tay. Tài liệu công khai phần lớn do chính các bên viết, nên đây là bản so sánh để kiểm tiếp, chưa phải khuyến nghị (ý 4)."
        ] },
      { k: "E", gist: "Have Claude write representative customer quotes based on the general themes of the research.",
        why: [
          "Sai ở chỗ nhờ Claude viết ra bằng chứng. Câu trích “tiêu biểu” do model nghĩ ra không phải lời của khách nào cả: đúng kiểu nội dung không có nguồn mà đọc như thật (ý 3).",
          "Đặt vào báo cáo, người đọc sẽ tưởng đó là lời khách thật, rồi quyết định dựa trên dữ liệu không tồn tại. Cách đúng là trích nguyên văn từ bản ghi thật (ý 4).",
          "Dễ bị cuốn vì nó nghe giống A: cũng xoay quanh chủ đề, cũng có câu trích. Nhưng A trích từ nguồn, còn E viết ra nguồn."
        ] }
    ],
    refs: [
      { label: "Bài 4.2: research là tìm, so, tổng hợp nhiều nguồn; tài liệu của người bán thì đối chiếu nguồn độc lập", href: NOTES + "#l-4-2" },
      { label: "Bài 4.1, bảng “Việc nào hợp Claude, việc nào chưa, việc nào cần người”", href: NOTES + "#l-4-1" },
      { label: "Bài 2.2, mục “Hallucination hay nằm ở đâu”: câu trích nguyên văn là chỗ hay bịa", href: NOTES + "#l-2-2" }
    ]
  },
  {
    de: 3, n: 2, total: 75, sub: "6.2", subName: "Dữ liệu nhạy cảm và quy định",
    answer: "AB",
    ask: "As an HR specialist, you are checking a list of data items someone wants to place in a Claude prompt. For a routine task, which two items are appropriate to include? (Select two.)",
    scene: [
      "Một chuyên viên nhân sự soát danh sách dữ liệu định đưa vào prompt cho Claude.",
      "Chữ quan trọng: “routine task” (việc thường ngày). Năm phương án đều gắn với một việc cụ thể, và việc nào nghe cũng có lý do.",
      "Chỗ khó: C ghi rõ dữ liệu đó “needed” (cần cho việc). Cần cho việc chưa có nghĩa là được đưa vào một prompt thường ngày."
    ],
    asks: [
      "Hai mục dữ liệu nào phù hợp để đưa vào prompt cho một việc thường ngày?",
      "Tức là: mục nào đã được bớt tới mức việc vẫn xong mà không lộ thông tin về một người cụ thể.",
      "Soi từng phương án: dữ liệu thuộc nhóm nào, đã bỏ hay ẩn định danh chưa, việc có thật cần chi tiết đó không."
    ],
    facts: [
      "Data minimization (tối thiểu hóa dữ liệu): chỉ đưa cho Claude phần dữ liệu mà việc đó thật sự cần. Redact (che) và anonymize (ẩn danh) là hai cách bớt trước khi gửi.",
      "Các nhóm dữ liệu nhạy cảm: định danh cá nhân, tài chính (bảng lương), sức khỏe, nhân sự (đánh giá, kỷ luật, hồ sơ), đăng nhập, mật doanh nghiệp.",
      "PII (thông tin định danh cá nhân): thông tin chỉ ra được một người cụ thể, một mình hoặc khi ghép với thông tin khác. Mã nhân viên ghép với ngày vào làm là đủ chỉ ra từng người.",
      "Gặp dữ liệu sức khỏe hay dữ liệu được quản lý thì theo chính sách công ty, hỏi bộ phận tuân thủ trước khi gửi. Đó không phải dữ liệu cho việc thường ngày."
    ],
    opts: [
      { k: "A", gist: "A job description with sensitive details already redacted, which Claude will rework into a job posting.",
        why: [
          "Đã che phần nhạy cảm trước khi gửi (ý 1). Thứ còn lại là nội dung công việc, đúng cái việc viết tin tuyển dụng cần.",
          "Không chứa thông tin về một nhân viên cụ thể nào, nên hợp với một việc thường ngày."
        ] },
      { k: "B", gist: "An anonymized summary of an HR policy, which Claude will reword.",
        why: [
          "Việc là viết lại câu chữ của chính sách. Phần cần là nội dung chính sách, không cần biết ai (ý 1).",
          "Bản tóm tắt đã ẩn danh, nên không còn gì chỉ ra một người thật (ý 3)."
        ] },
      { k: "C", gist: "Notes on an employee's accommodation request, taken from their HR file, used to draft a memo adjusting their role.",
        why: [
          "Sai ở nhóm dữ liệu: yêu cầu điều chỉnh công việc thường gắn với sức khỏe hay khuyết tật của một người cụ thể, lại lấy từ hồ sơ nhân sự (ý 2).",
          "Loại này phải theo chính sách công ty và hỏi bộ phận tuân thủ trước khi đưa vào bất cứ công cụ nào (ý 4).",
          "Dễ bị cuốn vì đề ghi “needed” (cần cho việc). Nhưng cần cho việc không biến dữ liệu sức khỏe của một người thành dữ liệu thường. Đề hỏi việc thường ngày, và C không còn là việc thường ngày."
        ] },
      { k: "D", gist: "A summary of one team's pay bands that lists each employee by name alongside their current salary.",
        why: [
          "Bảng lương có tên là dữ liệu tài chính và nhân sự gắn với từng người (ý 2).",
          "Nếu việc chỉ cần khung lương thì gửi số đã gộp theo bậc, không tên, là đủ (ý 1). Gộp là một trong ba cách bớt dữ liệu mà việc vẫn xong."
        ] },
      { k: "E", gist: "Each team member's employee ID number and start date, added so Claude can personalize onboarding messages.",
        why: [
          "Sai ở lý do: thư chào mừng cá nhân hóa không cần mã nhân viên. Mã nhân viên ghép với ngày vào làm chỉ ra đúng từng người (ý 3).",
          "Đưa định danh vào chỉ vì “tiện” là trái tối thiểu hóa (ý 1). Phần cá nhân hóa thì để chỗ trống như [Tên], điền lúc gửi."
        ] }
    ],
    refs: [
      { label: "Bài 6.2, mục “Ba cách bớt dữ liệu mà việc vẫn xong”: bỏ, đổi mã hoặc che, gộp", href: NOTES + "#l-6-2" },
      { label: "Bài 6.0, mục 3 “Dữ liệu nào là nhạy cảm”: định nghĩa PII và sáu nhóm dữ liệu", href: NOTES + "#l-6-0" }
    ]
  },
  {
    de: 3, n: 3, total: 75, sub: "2.6", subName: "Chọn định dạng output",
    answer: "D",
    ask: "An analyst must calculate summary statistics from a sales data file she has uploaded and include a chart in a weekly report. Which output approach suits this task best?",
    scene: [
      "Một chuyên viên phân tích có file dữ liệu bán hàng đã tải lên. Báo cáo tuần cần hai thứ: các số thống kê tóm tắt và một biểu đồ.",
      "Chỗ khó: ba phương án sai đều ra một thứ trông giống output (con số, đoạn mô tả, chỗ giữ biểu đồ). Chỉ một phương án ra đúng hai thứ báo cáo cần, và ra bằng phép tính thật.",
      "Ví dụ minh họa:<pre><code>20 dòng đầu: giá trị đơn trung bình khoảng 1,2 triệu\nCả 48.000 dòng: giá trị đơn trung bình 0,87 triệu</code></pre>Số ước từ vài dòng đầu có thể lệch xa số tính trên cả file."
    ],
    asks: [
      "Cách làm output nào hợp nhất với việc này?",
      "Tức là: cách nào ra được số thống kê đúng trên toàn bộ dữ liệu, cộng một biểu đồ thật, đủ để đưa vào báo cáo.",
      "Soi từng phương án: con số được tính hay được đoán? Báo cáo có nhận đủ thứ nó cần không?"
    ],
    facts: [
      "Code execution (cài đặt mới tên “Create and edit files”): Claude chạy code trong môi trường cách ly để phân tích file CSV bạn tải lên, tạo biểu đồ PNG, tạo file Excel.",
      "Phép tính chính xác là chỗ Claude hụt nếu chỉ “đọc” số. Tính sai mà giọng rất chắc là vì con số được đoán chứ không được tính. Cách bù: cho Claude chạy code để tính.",
      "Định dạng đi theo nơi nhận: ai nhận output và họ làm gì tiếp. Báo cáo tuần cần con số và biểu đồ, không cần đoạn văn tả dữ liệu.",
      "Đúng khuôn chưa phải đúng nội dung. Bảng số gọn gàng vẫn có thể sai. Kiểm vài giá trị với dữ liệu gốc trước khi gửi."
    ],
    opts: [
      { k: "A", gist: "Have Claude estimate the statistics from a quick look at part of the file, and accept the figures without running the calculation on the full dataset.",
        why: [
          "Sai ở chỗ con số được đoán, không được tính (ý 2). Vài dòng đầu không đại diện cho cả file, nên số ước có thể lệch xa số thật.",
          "“Accepting unverified figures” (chấp nhận số chưa kiểm) rồi đưa vào báo cáo tuần là gửi đi con số chưa ai kiểm (ý 4).",
          "Dễ bị cuốn vì nó nhanh và vẫn ra con số trông chính xác. Nhưng trông chính xác chưa phải là đúng."
        ] },
      { k: "B", gist: "Put a written placeholder in the chat reply where the chart would go, without producing the chart itself.",
        why: [
          "Báo cáo cần biểu đồ thật (ý 3). Một dòng “biểu đồ ở đây” không thay được biểu đồ.",
          "Claude tạo được biểu đồ bằng code execution (ý 1), nên không có lý do gì để bỏ trống."
        ] },
      { k: "C", gist: "Ask for a prose description of the data in the chat, computing no values, so neither the statistics nor the chart get produced.",
        why: [
          "Sai định dạng: báo cáo cần số và biểu đồ, C đưa đoạn văn (ý 3).",
          "Không tính giá trị nào thì thiếu cả hai thứ báo cáo đòi."
        ] },
      { k: "D", gist: "Run the calculations and build the chart with Code Execution, then check the computed results against the source data before sharing.",
        why: [
          "Code execution tính trên toàn bộ file và vẽ biểu đồ thật (ý 1). Con số được tính, không được đoán (ý 2).",
          "Ra đúng hai thứ báo cáo tuần cần (ý 3), cộng bước kiểm vài giá trị với dữ liệu gốc trước khi gửi (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 3.0, định nghĩa Code execution: phân tích CSV tải lên, tạo biểu đồ PNG", href: NOTES + "#l-3-0" },
      { label: "Bài 4.5, bảng bốn đặc tính: tính sai mà giọng rất chắc thì cho Claude chạy code để tính", href: NOTES + "#l-4-5" },
      { label: "Bài 2.6, mục “Đúng khuôn chưa phải đúng nội dung”: kiểm vài dòng với nguồn trước khi dùng", href: NOTES + "#l-2-6" }
    ]
  },
  {
    de: 3, n: 4, total: 75, sub: "1.1", subName: "Viết prompt rõ yêu cầu, lý do, nguồn, mẫu",
    answer: "A",
    ask: "A business analyst will use Claude to pull requirements out of the transcript of a recorded stakeholder interview. The transcript covers about 90 minutes and moves across several topics. Which approach is most likely to give a structured output she can actually use?",
    scene: [
      "Một chuyên viên phân tích nghiệp vụ cần rút yêu cầu từ bản ghi lời một buổi phỏng vấn stakeholder (bên liên quan).",
      "Bản ghi dài khoảng 90 phút, nói qua nhiều chủ đề. Một buổi nói chuyện như vậy có yêu cầu bắt buộc, điều muốn có, câu còn bỏ ngỏ, và chỗ hai người nói ngược nhau.",
      "Chỗ khó: cả bốn phương án đều đưa bản ghi gốc cho Claude. Chúng khác nhau ở chỗ có nói cho Claude output phải trông thế nào không."
    ],
    asks: [
      "Cách nào dễ cho ra output có cấu trúc dùng được nhất?",
      "Tức là: prompt nào nói rõ hình dạng output, để bản yêu cầu dùng được ngay mà không mất chi tiết.",
      "Soi từng phương án: các loại thông tin khác nhau có được tách ra không? Có bước nào làm rơi chi tiết không?"
    ],
    facts: [
      "Một prompt tốt nói rõ định dạng output: ra hình dạng gì, chia mục ra sao. Thiếu phần này thì Claude dùng định dạng mặc định.",
      "Output sẽ dùng tiếp thì đưa khung mẫu, ghi tên mục hay tên cột đúng thứ tự.",
      "Tóm tắt bỏ mất con số và chữ gốc, đúng thứ bước sau hay cần. Bước sau nên nhận tài liệu thật hoặc đoạn trích nguyên văn, không nhận bản tóm tắt.",
      "Requirement (yêu cầu): một câu nói giải pháp phải làm được gì. Yêu cầu tốt thì người lạ đọc vào chấm được đạt hay không đạt."
    ],
    opts: [
      { k: "A", gist: "Give Claude the transcript plus a structured prompt asking for separate sections: must-haves, nice-to-haves, open questions and conflicts.",
        why: [
          "Prompt nói rõ hình dạng output: bốn mục, mỗi mục một loại thông tin (ý 1, 2).",
          "Câu còn bỏ ngỏ và chỗ hai người nói ngược nhau có chỗ riêng, không bị trộn vào danh sách yêu cầu. Đó là hai thứ người phân tích phải mang đi hỏi lại stakeholder.",
          "Claude đọc thẳng bản ghi gốc, không qua bản tóm tắt nào (ý 3)."
        ] },
      { k: "B", gist: "Give Claude the transcript and ask for one ranked list of requirements, because a single list is easier for stakeholders to review than several sections.",
        why: [
          "Sai ở chỗ dồn mọi thứ vào một danh sách. Yêu cầu bắt buộc, điều muốn có, câu bỏ ngỏ, chỗ mâu thuẫn bị xếp chung một hàng.",
          "Câu bỏ ngỏ và chỗ mâu thuẫn không phải yêu cầu (ý 4), nên hoặc bị bỏ, hoặc bị xếp hạng như thể đã chốt.",
          "Dễ bị cuốn vì một danh sách nghe gọn cho người duyệt. Nhưng gọn mà mất phân loại thì người duyệt không biết dòng nào đã chốt, dòng nào còn phải hỏi."
        ] },
      { k: "C", gist: "Give Claude the transcript and ask for a summary, then extract requirements from that summary in a second pass, on the idea that two passes catch more.",
        why: [
          "Sai ở đầu vào của bước hai: bước đó đọc bản tóm tắt, không đọc bản ghi (ý 3).",
          "Chi tiết rơi ở bước tóm tắt thì bước trích không bao giờ thấy lại. Hai lượt ở đây chồng thêm chỗ mất, không bắt thêm được gì.",
          "Dễ bị cuốn vì chia bước nghe cẩn thận. Nhưng chia đúng là mỗi bước nhận tài liệu thật hoặc đoạn trích nguyên văn, không nhận bản đã nén."
        ] },
      { k: "D", gist: "Give Claude the transcript and ask for a time-ordered list of every statement containing a verb, then have it label each one as a requirement or not.",
        why: [
          "Sai ở tiêu chí lọc: gần như câu nào cũng có động từ. Danh sách ra dài gần bằng bản ghi.",
          "Có động từ không nói gì về chuyện câu đó có phải yêu cầu không (ý 4). Bước gắn nhãn sau đó phải làm trên một khối chữ khổng lồ, và vẫn không tách câu bỏ ngỏ hay chỗ mâu thuẫn."
        ] }
    ],
    refs: [
      { label: "Bài 1.0, mục 4 “Các phần của một prompt tốt”: thiếu định dạng output thì Claude dùng mặc định", href: NOTES + "#l-1-0" },
      { label: "Bài 1.1, mục “Đưa một ví dụ thay cho đoạn tả dài”: output dùng tiếp thì đưa khung mẫu", href: NOTES + "#l-1-1" },
      { label: "Bài 1.2, mục “Bước sau cần nhận gì”: tóm tắt bỏ mất chữ gốc", href: NOTES + "#l-1-2" }
    ]
  },
  {
    de: 3, n: 5, total: 75, sub: "2.4", subName: "Khi nào cần người duyệt",
    answer: "B",
    ask: "A project manager is assessing a proposal for Claude to approve refunds above a set threshold on its own, with no human review. Volume is high (about 2,000 refunds a week), the average refund is moderate, and past audits found that a small share of refunds needed correcting. The team has to cut cycle time. What is the most appropriate response?",
    scene: [
      "Đề xuất: Claude tự duyệt các khoản hoàn tiền trên một ngưỡng, không ai xem. Tức là chính những khoản lớn hơn lại được giao hẳn cho Claude.",
      "Bốn dữ kiện kéo hai hướng: khoảng 2.000 khoản mỗi tuần, số tiền trung bình vừa phải, kiểm toán cũ thấy một phần nhỏ phải sửa, và đội cần giảm thời gian xử lý.",
      "Chỗ khó: “a small percentage required correction” (một phần nhỏ phải sửa) nghĩa là không thể tin đều mọi khoản. Nhưng 2.000 khoản mỗi tuần mà khoản nào cũng chờ người duyệt thì thời gian không giảm được bao nhiêu."
    ],
    asks: [
      "Phản hồi đề xuất này thế nào là phù hợp nhất?",
      "Tức là: thiết kế nào vừa giảm được thời gian xử lý, vừa giữ người duyệt ở đúng những khoản sai thì thiệt.",
      "Soi từng phương án: người kiểm đứng trước hay sau lúc tiền đi ra? Mức duyệt có đi theo rủi ro của từng khoản không?"
    ],
    facts: [
      "Mức duyệt đi theo tín hiệu: mức hệ trọng, người nhận, rút lại được không, loại nội dung, lĩnh vực. Duyệt theo rủi ro có hai chiều: bỏ người duyệt ở ca hệ trọng là liều, bắt ca nhẹ qua người là làm quá tay.",
      "Kiểm ngẫu nhiên sau khi đã gửi không phải duyệt trước. Người duyệt chỉ cứu được khi đứng trước lúc gây hại.",
      "Redesign (thiết kế lại quy trình): với khối việc lớn theo luật rõ, vai người đổi từ làm từng đơn vị việc sang viết luật, viết tiêu chí, kiểm mẫu.",
      "Giao phần làm, giữ phần quyết: ca có hậu quả lớn, cần cân nhắc, thì Claude chuẩn bị, người quyết."
    ],
    opts: [
      { k: "A", gist: "Accept the proposal but cap autonomous approvals at the level the team already audits, relying on the existing audit sample to catch errors after they happen.",
        why: [
          "Sai ở thời điểm kiểm: mẫu kiểm toán bắt lỗi sau khi tiền đã hoàn (ý 2). Khoản sai vẫn đi ra, chỉ là phát hiện muộn.",
          "Vẫn giữ khung tự duyệt không ai xem trước, chỉ đổi con số ngưỡng. Không khoản nào được xét theo rủi ro riêng của nó (ý 1)."
        ] },
      { k: "B", gist: "Turn down the autonomous design and have Claude sort refunds into three lanes: auto-approve for low risk, human approval for standard cases, and escalation to a supervisor for high risk.",
        why: [
          "Mức duyệt đi theo rủi ro của từng khoản (ý 1). Khoản nhỏ, rõ, trong chính sách đi nhanh. Khoản thường có người duyệt. Khoản rủi ro cao lên tới người có thẩm quyền.",
          "Người vẫn đứng trước lúc tiền ra ở những khoản sai thì thiệt (ý 2, 4). Làn tự duyệt chỉ nhận những khoản mà lỗi rẻ, và luật xếp làn do người viết, kiểm trên dữ liệu thật (ý 3).",
          "Giải đúng hai đòi hỏi của đề: giảm thời gian ở khối lớn các khoản dễ, mà không buông những loại khoản kiểm toán từng phải sửa."
        ] },
      { k: "C", gist: "Accept the proposal and replace human review with a daily audit of a random sample of Claude's approvals, correcting any errors found.",
        why: [
          "Sai: thay duyệt trước bằng kiểm sau (ý 2). Kiểm ngẫu nhiên có thể thấy xu hướng lỗi, nhưng không chặn được một khoản sai trước khi tiền đi.",
          "Dễ bị cuốn vì “kiểm mỗi ngày” và “có hành động sửa” nghe rất có trách nhiệm. Nhưng sửa sau khi đã hoàn tiền là đi đòi lại tiền, không phải chặn lỗi."
        ] },
      { k: "D", gist: "Turn down the autonomous design and have Claude pre-fill each refund decision and its rationale, with a human approver finalizing every refund before it is issued.",
        why: [
          "An toàn: mọi khoản đều có người duyệt trước. Nhưng không dùng tới rủi ro của từng khoản. Khoản nhỏ, rõ ràng vẫn phải chờ người như khoản khó (ý 1).",
          "Với 2.000 khoản mỗi tuần, bước duyệt từng khoản vẫn là chỗ nghẽn. Đề đòi giảm thời gian xử lý, D chỉ rút ngắn được phần soạn.",
          "Dễ bị cuốn vì nó đúng luật “Claude soạn, người quyết” (ý 4). Nhưng đề cho dữ kiện để tách khoản dễ khỏi khoản khó, và D bỏ qua dữ kiện đó."
        ] }
    ],
    dispute: "Đề gốc chấm B, sổ giữ B. Chỗ mơ hồ: D bảo vệ được nếu bám chặt luật “Claude soạn, người ký” ở bài 4.4, và bài 2.4 có câu “không có output nào được dùng mà không ai đọc”, trong khi làn tự duyệt của B không có người xem từng khoản. Đề nghiêng về B vì hai dữ kiện: đội phải giảm thời gian xử lý, và lỗi chỉ nằm ở một phần nhỏ. Đó là tình huống duyệt theo rủi ro, không phải duyệt đều mọi khoản.",
    refs: [
      { label: "Bài 2.4, bảng năm tín hiệu và đoạn “duyệt theo rủi ro có hai chiều”", href: NOTES + "#l-2-4" },
      { label: "Bài 6.1, bảng bốn cách duyệt thư từ chối bồi thường: kiểm ngẫu nhiên sau khi gửi là không đạt", href: NOTES + "#l-6-1" },
      { label: "Bài 4.0, mục 5 “Bổ trợ hay thiết kế lại”: khối việc lớn thì người viết luật, kiểm mẫu", href: NOTES + "#l-4-0" }
    ]
  },
  {
    de: 3, n: 6, total: 75, sub: "1.1", subName: "Viết prompt rõ yêu cầu, lý do, nguồn, mẫu",
    answer: "AB",
    ask: "As a business analyst, you are reviewing prompt drafts your teammates wrote. Which two elements belong in a well-structured prompt for a business task? (Select two.)",
    scene: [
      "Một chuyên viên phân tích nghiệp vụ soát các bản prompt nháp của đồng nghiệp.",
      "Đề hỏi phần nào thuộc về một prompt có cấu trúc tốt cho việc kinh doanh. Năm phương án đều là thứ người ta hay viết vào prompt.",
      "Chỗ khó: có phương án nghe như thêm bối cảnh (danh sách mọi sản phẩm), có phương án nghe như làm prompt dễ chịu hơn (giọng thân thiện, chuyện cá nhân). Thêm chữ không có nghĩa là thêm thông tin Claude cần."
    ],
    asks: [
      "Hai phần nào nên có trong một prompt có cấu trúc tốt cho việc kinh doanh?",
      "Tức là: phần nào trả lời câu hỏi mà Claude không tự biết được: làm gì, cho ai, để làm gì.",
      "Soi từng phương án: thiếu nó thì output tệ đi, hay chỉ làm prompt ngắn lại?"
    ],
    facts: [
      "Các phần của prompt tốt: việc, bối cảnh (người đọc, mục tiêu), ràng buộc kèm lý do, nguồn, ví dụ, định dạng output, vai (tùy chọn). Không phải prompt nào cũng cần đủ, nhưng việc và bối cảnh là phần nền.",
      "Claude chỉ làm việc với những gì nằm trong context. Chỗ nào bỏ trống, Claude đoán theo kiểu câu trả lời phổ biến nhất. Thiếu người đọc thì Claude viết cho một người đọc chung chung.",
      "Câu nào không thêm thông tin về output chỉ làm prompt dài hơn. Một đoạn thêm vào mà thử không thấy khác thì bỏ: tốn context và hạn mức.",
      "Tài liệu nền chỉ đưa những phần việc đó cần, không đưa cả kho."
    ],
    opts: [
      { k: "A", gist: "A plain statement of the task Claude has to carry out.",
        why: [
          "Phần đầu tiên của prompt: làm gì, sâu tới đâu thì xong (ý 1). Thiếu nó thì Claude làm một việc gần giống.",
          "Nói thẳng hành động (tóm tắt, so sánh, soạn, phân loại) để Claude không phải đoán bạn muốn gợi ý hay muốn bản làm xong."
        ] },
      { k: "B", gist: "The context that matters for the task, such as who the audience is and what the task is for.",
        why: [
          "Người đọc và mục tiêu là thứ nằm trong đầu người viết, Claude không tự biết (ý 2).",
          "Cùng một thông tin, viết cho giám đốc khác hẳn viết cho khách hay đội kỹ thuật. Thiếu phần này thì output chung chung."
        ] },
      { k: "C", gist: "An instruction to use a warm, chatty tone so replies come across as more approachable.",
        why: [
          "Giọng văn là thứ chọn theo việc, không gắn sẵn vào mọi prompt. Báo cáo cho ban giám đốc hay thư gửi cơ quan quản lý không cần giọng “dễ gần”.",
          "Dễ bị cuốn vì giọng văn đúng là thứ prompt có thể dặn. Nhưng đề hỏi phần nền của một prompt có cấu trúc, và giọng thân thiện không phải phần nền."
        ] },
      { k: "D", gist: "A full list of every product and service the company offers, to give Claude business background.",
        why: [
          "Sai ở chữ “comprehensive” (đầy đủ hết). Bối cảnh tốt là bối cảnh liên quan tới việc, không phải mọi thứ công ty có (ý 4).",
          "Danh sách dài thêm chữ mà phần lớn không dính tới việc, Claude phải tự lọc xem cái nào liên quan (ý 3)."
        ] },
      { k: "E", gist: "A brief personal story to make the prompt read more conversationally.",
        why: [
          "Câu chuyện cá nhân không nói gì về việc, người đọc hay output (ý 3). Nó chỉ làm prompt dài thêm.",
          "Claude không viết tốt hơn vì prompt nghe thân mật. Thứ đổi được output là thông tin, không phải không khí."
        ] }
    ],
    refs: [
      { label: "Bài 1.0, mục 4 “Các phần của một prompt tốt”: việc, bối cảnh, thiếu thì Claude làm gì", href: NOTES + "#l-1-0" },
      { label: "Bài 1.1, mục “Viết ra những gì đang nằm trong đầu bạn”: việc và độ sâu, người đọc và mục tiêu", href: NOTES + "#l-1-1" }
    ]
  },
  {
    de: 3, n: 7, total: 75, sub: "4.4", subName: "Đưa Claude vào quy trình đang chạy",
    answer: "C",
    ask: "A project manager is ranking workflow steps by how much leverage bringing Claude into them would provide. In a knowledge-work team, which step usually offers the most leverage?",
    scene: [
      "Một quản lý dự án cân các bước trong quy trình theo mức “leverage” (đòn bẩy: công bỏ ra ít mà kết quả thu về nhiều) khi đưa Claude vào.",
      "Ba phương án là bước quyết hoặc cam kết thay công ty: duyệt bản cuối để đăng ra ngoài, đàm phán hợp đồng, quyết định nhân sự. Một phương án là bước soạn và tổng hợp, có người duyệt phía sau.",
      "Chỗ khó: ba bước kia là những bước nặng và quan trọng nhất, nên dễ nghĩ giao chúng cho Claude là được lợi nhiều nhất."
    ],
    asks: [
      "Bước nào thường cho đòn bẩy lớn nhất khi đưa Claude vào?",
      "Tức là: bước nào Claude làm nhanh hơn người nhiều, đầu ra kiểm được, và trách nhiệm vẫn ở lại với người.",
      "Soi từng phương án: đó là phần làm hay phần quyết? Sai thì có người chặn trước không?"
    ],
    facts: [
      "Giao phần làm, giữ phần quyết. Phần làm: mô tả rõ được, đầu ra kiểm được, như soạn nháp, tóm tắt, trích dữ liệu. Phần quyết: có hậu quả cho người khác, phải có người chịu trách nhiệm.",
      "Soạn từ ngữ cảnh có sẵn thì giao Claude làm bản nháp, người xem trước khi gửi. Ký duyệt cuối mà một người phải đứng tên thì người giữ, Claude chuẩn bị tài liệu.",
      "Claude hợp với việc nhiều chữ, nhiều nguồn: tìm, so sánh, tổng hợp.",
      "Quyết định về việc làm của một người là ca rủi ro cao theo Usage Policy: người có chuyên môn duyệt trước, người bị ảnh hưởng được báo là có dùng AI."
    ],
    opts: [
      { k: "A", gist: "Signing off final deliverables for external publication with no further review.",
        why: [
          "Đây là bước ký duyệt cuối, đúng phần quyết mà một người phải đứng tên (ý 1, 2).",
          "Bỏ người duyệt ở bước cuối thì lỗi đi thẳng ra ngoài, đăng rồi không rút lại được. Không còn ai chặn trước."
        ] },
      { k: "B", gist: "Negotiating contract terms with outside parties on the company's behalf.",
        why: [
          "Đàm phán là cam kết thay công ty với bên ngoài. Đó là phần quyết, cần người có thẩm quyền và chịu trách nhiệm (ý 1).",
          "Claude có thể soạn phương án, tóm tắt điều khoản để người đàm phán chuẩn bị. Nhưng giao cả bước đàm phán là giao luôn quyền cam kết."
        ] },
      { k: "C", gist: "Drafting and synthesizing material from many sources for a reviewer further down the line.",
        why: [
          "Đúng phần làm: nhiều chữ, nhiều nguồn, đầu ra kiểm được (ý 1, 3). Đây là chỗ Claude rút ngắn công nhiều nhất.",
          "Có người duyệt phía sau, nên quyết định và trách nhiệm vẫn ở người (ý 2). Đòn bẩy lớn mà rủi ro vẫn được chặn."
        ] },
      { k: "D", gist: "Making the final call on hiring, promotion or dismissal.",
        why: [
          "Quyết định nhân sự về một người là phần quyết, lại là ca rủi ro cao (ý 1, 4). Người phải quyết và chịu trách nhiệm.",
          "Dễ bị cuốn vì đây là việc nặng, nhiều hồ sơ. Nhưng phần Claude giúp được là tóm tắt hồ sơ, còn quyết định vẫn là của người."
        ] }
    ],
    refs: [
      { label: "Bài 4.4, bảng “Bước nào giao, bước nào giữ”", href: NOTES + "#l-4-4" },
      { label: "Bài 4.0, mục 4 “Giao phần làm, giữ phần quyết”", href: NOTES + "#l-4-0" },
      { label: "Bài 6.1, mục “Vùng vàng”: quyết định về việc làm của một người là ca rủi ro cao", href: NOTES + "#l-6-1" }
    ]
  },
  {
    de: 3, n: 8, total: 75, sub: "6.2", subName: "Dữ liệu nhạy cảm và quy định",
    answer: "C",
    ask: "A customer-success associate is writing a prompt that asks Claude to summarize a customer's issue from the case file. The file holds the customer's full government ID number, home address, name, account number and the issue description. She only needs a summary of the issue. Which approach is most appropriate?",
    scene: [
      "Một nhân viên chăm sóc khách muốn Claude tóm tắt vấn đề của khách từ hồ sơ vụ việc.",
      "Hồ sơ có năm thứ: số giấy tờ tùy thân do nhà nước cấp, địa chỉ nhà, tên, số tài khoản, mô tả vấn đề. Bản tóm tắt chỉ cần nói về vấn đề.",
      "Chỗ khó: bốn phương án xử lý dữ liệu theo bốn kiểu: dặn Claude, tráo trường, che trường, chỉ gửi một phần. Phải xem kiểu nào bớt dữ liệu trước khi gửi, với đúng lý do."
    ],
    asks: [
      "Cách nào phù hợp nhất?",
      "Tức là: bớt dữ liệu nhạy cảm mà việc tóm tắt không cần, và bớt trước khi gửi.",
      "Soi từng phương án: dữ liệu có thật sự không rời tay mình không, hay chỉ bị dặn đừng nhắc? Lý do bỏ hay giữ một trường có đúng không?"
    ],
    facts: [
      "Data minimization (tối thiểu hóa dữ liệu): chỉ đưa phần việc thật sự cần. Redact (che): xóa hay bôi đen phần nhạy cảm như số CCCD, số tài khoản, địa chỉ trước khi đưa vào.",
      "Lời dặn trong prompt không phải biện pháp kiểm soát. Dữ liệu đã gửi là đã nằm trong chat, dù Claude không nhắc lại.",
      "PII (thông tin định danh cá nhân): họ tên, email, số điện thoại, số CCCD, số tài khoản, địa chỉ.",
      "Câu hỏi để quyết giữ hay bỏ một trường: việc này có cần nó không. Tóm tắt một vấn đề thường không cần biết khách là ai."
    ],
    opts: [
      { k: "A", gist: "Send the whole case file and tell Claude not to mention the government ID or the home address in its summary.",
        why: [
          "Sai ở chỗ dặn sau thay vì bớt trước (ý 2). Số giấy tờ và địa chỉ vẫn được gửi đi, vẫn nằm trong chat.",
          "Lời dặn chỉ đổi câu trả lời. Nó không đổi chuyện dữ liệu đã rời tay mình.",
          "Dễ bị cuốn vì bản tóm tắt ra đúng là sạch. Nhưng chỗ cần sạch là thứ gửi đi, không phải thứ trả về."
        ] },
      { k: "B", gist: "Swap the government ID for the customer's name and the home address for the account number, on the grounds that those are less sensitive.",
        why: [
          "Sai ở cả cách làm lẫn lý do. Tên và số tài khoản cũng là định danh (ý 3), tráo trường không bớt được gì.",
          "Việc tóm tắt vấn đề không cần trường nào trong bốn trường đó (ý 4). Đổi chỗ chúng chỉ làm hồ sơ rối thêm."
        ] },
      { k: "C", gist: "Remove or redact the government ID and the home address before sending, because a summary of the issue needs neither.",
        why: [
          "Bớt trước khi gửi, với đúng lý do: việc không cần hai trường đó (ý 1, 4). Số giấy tờ tùy thân và địa chỉ nhà không bao giờ rời tay mình.",
          "Phần mô tả vấn đề còn nguyên, nên bản tóm tắt vẫn làm được."
        ] },
      { k: "D", gist: "Send only the issue description and add the customer's name for context, since those two together are enough for a summary.",
        why: [
          "Gửi ít hơn C thật: không có số tài khoản. Nhưng lý do sai: tên khách không thêm gì cho bản tóm tắt vấn đề, mà phương án lại cố ý thêm nó vào “for context” (cho có ngữ cảnh) (ý 3, 4).",
          "Dễ bị cuốn vì nó gửi ít trường nhất. Nhưng nó đưa vào một định danh với lý do không đúng, trong khi C áp đúng phép thử “việc có cần trường này không”."
        ] }
    ],
    dispute: "Đề gốc chấm C, sổ giữ C. Chỗ mơ hồ: xét riêng lượng dữ liệu, D gửi ít hơn C (C vẫn để tên và số tài khoản). Cách tốt nhất là chỉ gửi phần mô tả, nhưng không phương án nào ghi vậy. C được chọn vì lý do của nó đúng phép thử “việc có cần trường này không”, còn D cố ý thêm tên với lý do “cho có ngữ cảnh”, mà tên không giúp gì cho bản tóm tắt vấn đề.",
    refs: [
      { label: "Bài 6.2, mục “Ba cách bớt dữ liệu” và “Dặn Claude đừng nhớ không phải biện pháp kiểm soát”", href: NOTES + "#l-6-2" },
      { label: "Bài 0.3, luật 6: dữ liệu nhạy cảm xử lý trước khi đưa vào, đừng dặn sau", href: NOTES + "#l-0-3" }
    ]
  },
  {
    de: 3, n: 9, total: 75, sub: "1.2", subName: "Chia việc lớn thành chuỗi bước",
    answer: "BD",
    ask: "You are using Claude to redesign how new employees are onboarded, and the high-level decomposition has to be finished before any detailed artifacts are specified. Which two decomposition steps must be done BEFORE the exact email content and the schedule are written? (Select two.)",
    scene: [
      "Dùng Claude thiết kế lại quy trình đón nhân viên mới (onboarding).",
      "Đề đặt sẵn thứ tự: phần chia việc ở cấp cao phải xong trước, rồi mới tới chi tiết như nội dung từng email và lịch gửi.",
      "Chỗ khó: năm phương án đều là việc có thật trong một dự án onboarding. Nhưng có việc đứng trước chi tiết, có việc đứng sau, có việc không thuộc chuyện chia việc."
    ],
    asks: [
      "Hai bước chia việc nào phải xong TRƯỚC khi viết nội dung email và lịch cụ thể?",
      "Tức là: nội dung email và lịch phụ thuộc vào những quyết định nào ở cấp trên.",
      "Soi từng phương án: nó là đầu vào của bước viết chi tiết, hay nó cần chi tiết đã có rồi mới làm được?"
    ],
    facts: [
      "Chia việc (task decomposition): tách việc lớn thành các bước nhỏ. Phần phụ thuộc cần kết quả của phần trước nên phải làm sau.",
      "Bước sau cần nhận mục tiêu gốc, để không lạc hướng.",
      "Chạy thử rồi mới mở rộng: một nhóm nhỏ, tiêu chí viết trước, đạt rồi mới mở cho mọi người. Cả hai việc này cần sản phẩm đã có.",
      "Sửa một kế hoạch thì rẻ, gỡ một sản phẩm sai đã lan khắp nơi thì đắt."
    ],
    opts: [
      { k: "A", gist: "Run the onboarding workflow as a pilot with a small group of new hires.",
        why: [
          "Sai thứ tự: chạy thử cần có email và lịch để chạy (ý 3). Nó đứng sau bước viết chi tiết, không đứng trước.",
          "Dễ bị cuốn vì chạy thử là bước cẩn thận nên làm. Nhưng nó đúng chỗ ở sau khi có sản phẩm, trước khi mở rộng."
        ] },
      { k: "B", gist: "Lay out the main phases that make up the onboarding experience.",
        why: [
          "Các giai đoạn (ví dụ: trước ngày đầu, ngày đầu, tuần đầu) là khung để xếp email và lịch vào. Chưa có khung thì không biết email nào thuộc chỗ nào, gửi lúc nào (ý 1).",
          "Đây là phần mà mọi chi tiết phía dưới phụ thuộc vào, nên phải xong trước."
        ] },
      { k: "C", gist: "Agree the onboarding budget with the finance department.",
        why: [
          "Thương lượng ngân sách là việc quản lý dự án, không phải một bước chia việc của quy trình (ý 1).",
          "Nội dung email và lịch không chờ cuộc thương lượng đó. Đề hỏi bước chia việc đứng trước chi tiết."
        ] },
      { k: "D", gist: "Set out the overall goal of the onboarding experience.",
        why: [
          "Mục tiêu là gốc của cả cây việc: nhân viên mới cần đạt gì sau onboarding. Giai đoạn và từng email đều được chọn để phục vụ mục tiêu đó (ý 1, 2).",
          "Viết chi tiết trước khi có mục tiêu thì chỗ sửa rẻ (kế hoạch) biến thành chỗ sửa đắt (email đã viết xong) (ý 4)."
        ] },
      { k: "E", gist: "Launch the onboarding workflow for every new hire across the company.",
        why: [
          "Sai thứ tự, còn xa hơn A: triển khai toàn công ty là bước cuối, sau khi đã viết chi tiết và chạy thử đạt (ý 3).",
          "Nó không phải bước chia việc, mà là bước đưa ra dùng."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, mục “Bước sau cần nhận gì”: mục tiêu gốc, phần phụ thuộc làm sau", href: NOTES + "#l-1-2" },
      { label: "Bài 4.4, mục “Chạy thử một việc thật trước khi mở rộng”", href: NOTES + "#l-4-4" },
      { label: "Bài 4.3, vòng plan → verify → judge → refine: sửa kế hoạch rẻ hơn gỡ sản phẩm", href: NOTES + "#l-4-3" }
    ]
  },
  {
    de: 3, n: 10, total: 75, sub: "1.3", subName: "Lặp prompt: chẩn đoán, đổi một chỗ, thử lại",
    answer: "D",
    ask: "A Claude output has fallen short of what was expected. Of the following refinement steps, which one should come first?",
    scene: [
      "Một output của Claude chưa đạt kỳ vọng, cần sửa qua vài vòng.",
      "Bốn phương án là bốn bước của cùng một vòng lặp: tìm chỗ yếu, sửa prompt, chạy lại, so kết quả với tiêu chí.",
      "Chỗ khó: bước nào cũng đúng, cũng phải làm. Đề chỉ hỏi bước nào đứng đầu."
    ],
    asks: [
      "Khi sửa một output chưa đạt, bước nào làm trước tiên?",
      "Tức là: vòng lặp prompt mở đầu bằng gì, trước khi đụng vào prompt.",
      "Soi từng phương án: lúc bước đó chạy, nó đã có đủ thứ nó cần chưa?"
    ],
    facts: [
      "Lặp prompt (iterate) là vòng: chẩn đoán → đổi một chỗ → thử lại → giữ cái có tác dụng, cho tới khi đạt tiêu chí.",
      "Chẩn đoán là đọc output yếu, gọi tên nó yếu ở đâu, rồi tìm phần nào của prompt gây ra. Mỗi triệu chứng một nguyên nhân, một cách sửa.",
      "Sửa khi chưa biết sửa gì thì chỉ ra một bản khác, không chắc tốt hơn. Gõ lại, viết dài hơn, viết hoa không phải là sửa.",
      "Tiêu chí thành công đặt trước khi sửa. So output mới với tiêu chí là bước chấm cuối mỗi vòng, không phải bước mở đầu."
    ],
    opts: [
      { k: "A", gist: "Run the revised prompt and record the output it produces.",
        why: [
          "Sai thứ tự: chạy “the revised prompt” (prompt đã sửa) tức là đã có bản sửa. Mà muốn sửa thì phải biết sửa chỗ nào (ý 1).",
          "Đặt bước này đầu tiên thì chưa có prompt đã sửa nào để chạy. Chạy lại prompt cũ thì chỉ ra một bản khác, không chắc tốt hơn (ý 3)."
        ] },
      { k: "B", gist: "Check the new output against the criteria set at the start.",
        why: [
          "Đây là bước cuối vòng: chấm “the new output” (output mới) theo tiêu chí ban đầu (ý 4).",
          "Output mới chỉ có sau khi đã sửa prompt và chạy lại. Đứng đầu thì chưa có gì để so.",
          "Dễ bị cuốn vì có cụm “original criteria” (tiêu chí ban đầu), nghe như bước đặt tiêu chí, mà tiêu chí thì đúng là phải có trước. Nhưng phương án nói so output mới, không nói đặt tiêu chí."
        ] },
      { k: "C", gist: "Rewrite the prompt so that it fixes each weakness that was found.",
        why: [
          "Sửa prompt là bước thứ hai. Cụm “each identified weakness” (từng điểm yếu đã tìm ra) cho thấy nó cần danh sách điểm yếu làm đầu vào (ý 1).",
          "Sửa trước khi chẩn đoán là sửa mò: không biết triệu chứng nào, nguyên nhân nào, nên dễ đổi nhiều thứ một lúc mà không biết cái nào có tác dụng (ý 2, 3).",
          "Dễ bị cuốn vì sửa prompt là việc chính của cả vòng, nghe như chỗ bắt tay vào. Nhưng chính chữ “identified” (đã tìm ra) báo rằng có một bước đứng trước nó."
        ] },
      { k: "D", gist: "Pin down exactly where the current output falls short.",
        why: [
          "Đúng. Đây là bước chẩn đoán, mở đầu vòng lặp (ý 1, 2): gọi tên output yếu ở đâu, rồi mới tìm phần prompt gây ra.",
          "Danh sách điểm yếu là đầu vào cho các bước sau. Thứ tự cả vòng: tìm điểm yếu → sửa prompt theo từng điểm → chạy lại → so output mới với tiêu chí."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Đọc triệu chứng, tìm phần của prompt gây ra” và Khi đi thi dạng 1: bước đầu tiên khi output yếu là chẩn đoán", href: NOTES + "#l-1-3" },
      { label: "Bài Nền tảng D7, mục 4 “Vòng chẩn đoán”: ghi lại triệu chứng là bước một, đổi đúng một thứ, chạy lại cùng input", href: NOTES + "#l-7-0" }
    ]
  },
  {
    de: 3, n: 11, total: 75, sub: "1.2", subName: "Chia việc lớn thành chuỗi bước",
    answer: "A",
    ask: "A senior project coordinator must use Claude to produce a year-end report on finance, operations and customer outcomes. Each of the three areas has its own data owner and its own source documents. Which way of breaking up the work is most likely to give a strong report?",
    scene: [
      "Một điều phối viên dự án cấp cao dùng Claude viết báo cáo cuối năm gồm ba mảng: tài chính, vận hành, kết quả với khách hàng.",
      "Mỗi mảng có người nắm dữ liệu riêng và tài liệu nguồn riêng. Tức là ba phần độc lập về đầu vào.",
      "Chỗ khó: còn một phần phụ thuộc cả ba, là bản tóm tắt cho lãnh đạo (executive summary). Phương án nào cũng có chia, khác nhau ở chỗ tóm tắt viết lúc nào, và có bước tổng hợp hay không."
    ],
    asks: [
      "Cách chia việc nào dễ cho ra báo cáo tốt nhất?",
      "Tức là: xếp đúng phần độc lập với phần phụ thuộc. Ba mảng làm riêng, còn tóm tắt phải đi sau, dựa trên ba mảng đã viết.",
      "Soi từng phương án: lúc tóm tắt được viết, nó đã có nguyên liệu thật chưa? Ba mảng có được gộp thành một báo cáo thống nhất không?"
    ],
    facts: [
      "Phần độc lập làm riêng được rồi gộp lại. Phần phụ thuộc cần kết quả của phần trước nên phải làm sau, và nhận output đã kiểm của phần đó.",
      "Đầu vào lớn mà tự chia nhóm được (báo cáo theo khu vực, theo mảng) là ca nên chia. Mỗi bước nhận mục tiêu gốc, lời dặn riêng, và tài liệu thật bước đó cần.",
      "Một prompt phải lo nhiều thứ cạnh tranh nhau thì nên chia. Gộp hết vào một lượt làm mất điểm kiểm giữa chừng.",
      "Điểm kiểm đặt ở output mà nhiều bước sau dựa vào. Ở đây là ba phần đã viết, vì tóm tắt dựa trên cả ba."
    ],
    opts: [
      { k: "A", gist: "Set the report's goals, collect the inputs for each section, draft every section in its own prompt, then build the executive summary from those drafts.",
        why: [
          "Đúng. Mục tiêu chung đặt trước, nên ba phần không lạc hướng nhau (ý 2). Ba mảng là phần độc lập, mỗi mảng một prompt với đúng tài liệu của nó (ý 1, 2).",
          "Tóm tắt là phần phụ thuộc, nên viết sau cùng, từ ba phần đã có (ý 1). Ba bản nháp là chỗ kiểm được trước khi tóm tắt dựa vào chúng (ý 4)."
        ] },
      { k: "B", gist: "Write the executive summary first to set the report's story, then draft each section so that it backs up the summary already written.",
        why: [
          "Sai ở thứ tự: tóm tắt là phần phụ thuộc mà lại viết trước khi có phần nào (ý 1). Kết luận được viết khi chưa có số liệu.",
          "Các phần sau bị viết để “support the summary” (ủng hộ bản tóm tắt). Số liệu tài chính không khớp câu chuyện đã chốt thì dễ bị lờ đi hay uốn theo.",
          "Dễ bị cuốn vì “anchor the narrative” (neo câu chuyện) nghe như có định hướng. Nhưng định hướng là mục tiêu của báo cáo, không phải kết luận viết trước khi có dữ liệu."
        ] },
      { k: "C", gist: "Draft the three sections in parallel with a prompt for each, then join the outputs together and lightly edit them into the final report.",
        why: [
          "Đúng một nửa: ba mảng làm riêng là hợp (ý 1). Nhưng không có bước đặt mục tiêu chung, nên ba phần có thể đi ba hướng (ý 2).",
          "Cũng không có bước tổng hợp: “concatenate” (nối liền) rồi sửa nhẹ chỉ cho ra ba bài đặt cạnh nhau, không có bản tóm tắt rút ra từ cả ba. Báo cáo cuối năm cần chỗ nối ba mảng thành một bức tranh."
        ] },
      { k: "D", gist: "Give Claude every source document in one prompt and ask for the whole report, summary included, in a single pass.",
        why: [
          "Sai ở chỗ không chia: một prompt phải lo ba mảng với ba bộ tài liệu, cộng phần tóm tắt (ý 3).",
          "Không có chỗ nào để kiểm giữa chừng. Một con số tài chính đọc sai sẽ đi thẳng vào tóm tắt mà không ai thấy (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, bảng “Khi nào nên chia” và mục “Một chuỗi trong chat, từng bước”: phần độc lập làm riêng, phần phụ thuộc chờ output đã kiểm", href: NOTES + "#l-1-2" },
      { label: "Bài 1.2, mục “Bước sau cần nhận gì” và “Đặt điểm kiểm ở đâu”: mục tiêu gốc, tài liệu thật, kiểm ở output nhiều bước dựa vào", href: NOTES + "#l-1-2" }
    ]
  },
  {
    de: 3, n: 12, total: 75, sub: "5.1", subName: "Dựng Project: instructions và knowledge",
    answer: "BC",
    ask: "A marketing manager is choosing what goes into the custom instructions of a Project used for writing work. Which two items belong in those instructions? (Select two.)",
    scene: [
      "Một quản lý marketing dựng Project cho việc viết, đang chọn thứ gì đưa vào custom instructions (chỉ dẫn riêng của Project).",
      "Các thứ được đưa ra gồm: độ dài ưa thích cho tin nhắn nội bộ, khung và độ dài chuẩn của sản phẩm viết, giọng thương hiệu, văn phong ưa thích của người duyệt, một bài viết mẫu từ trước.",
      "Chỗ khó: thứ nào cũng có ích theo một cách. Nhưng instructions chỉ nên giữ cách làm áp cho mọi chat của Project, và là chuẩn của cả nhóm."
    ],
    asks: [
      "Hai thứ nào thuộc về custom instructions của Project?",
      "Tức là: lọc ra thứ là cách làm, áp cho mọi bài viết của Project, và là chuẩn chung chứ không phải ý riêng một người.",
      "Soi từng phương án: đây là cách làm hay tư liệu? Áp cho việc của Project hay việc khác? Chuẩn chung hay sở thích riêng?"
    ],
    facts: [
      "Project instructions là chỉ dẫn cách làm, áp cho mọi chat trong Project: vai, giọng, người đọc, định dạng, quy trình. Project knowledge là tư liệu Claude dùng để tra: sổ tay, báo cáo, bảng giá, mẫu văn bản.",
      "Phép thử: hỏi “đây là cách làm, hay là tư liệu?”. Tư liệu lớn như sổ tay thương hiệu để trong knowledge, kèm một dòng trong instructions nói phải viết theo nó.",
      "Thứ đáng đặt sẵn là thứ lặp lại ở mọi chat: người đọc, giọng, định dạng chuẩn, ràng buộc lâu dài. Đưa nhầm một thứ vào instructions là đổi mọi output sau đó, của mọi người dùng Project.",
      "Đặt quy tắc ở tầng hẹp nhất đủ phủ. Thói quen riêng của một người ở mọi việc thuộc Instructions for Claude của tài khoản người đó, không thuộc Project dùng chung."
    ],
    opts: [
      { k: "A", gist: "How long the prompt author likes replies to internal messages to be, which has nothing to do with the external deliverables.",
        why: [
          "Sai ở phạm vi: tin nhắn nội bộ không phải việc của Project này, vốn để viết sản phẩm gửi ra ngoài. Đề còn nói thẳng “unrelated” (không liên quan).",
          "Lại là ý thích riêng của người viết prompt (ý 4). Đưa vào instructions thì mọi bài viết của mọi người trong Project bị kéo theo một luật không dành cho chúng (ý 3)."
        ] },
      { k: "B", gist: "The usual structure and expected length of the team's standard deliverables.",
        why: [
          "Đúng. Khung và độ dài chuẩn là định dạng, một loại cách làm (ý 1).",
          "Nó lặp lại ở gần như mọi bài viết của Project, nên đặt sẵn một lần thay vì dặn lại mỗi chat (ý 3)."
        ] },
      { k: "C", gist: "The brand voice and tone that every piece of writing has to follow.",
        why: [
          "Đúng. Giọng là cách làm, và là chuẩn của thương hiệu, không phải của riêng ai (ý 1).",
          "Mọi bài viết của Project đều phải theo, nên đây đúng là thứ đặt sẵn cho mọi chat (ý 3). Sổ tay thương hiệu dài, nếu có, vẫn để trong knowledge, còn instructions nói phải viết theo nó (ý 2)."
        ] },
      { k: "D", gist: "The writing style personally preferred by the marketing manager who reviews every final deliverable.",
        why: [
          "Sai ở chỗ đây là sở thích riêng của một người, dù người đó duyệt mọi bài (ý 4). Chuẩn của cả nhóm là giọng thương hiệu.",
          "Đưa vào instructions thì sở thích đó thành luật cho mọi bài của mọi người, và có thể va với giọng thương hiệu (ý 3). Người duyệt muốn đổi gì thì sửa ở chuẩn chung, có thống nhất.",
          "Dễ bị cuốn vì người này duyệt mọi bài, viết theo ý họ nghe như đỡ phải sửa. Nhưng instructions ghi chuẩn chung, không ghi khẩu vị của người chấm."
        ] },
      { k: "E", gist: "A typical piece of earlier writing that shows the style and structure the team prefers.",
        why: [
          "Sai chỗ đặt: một bài viết cũ là tư liệu, chỗ của nó là project knowledge (ý 1, 2). Instructions chỉ cần một dòng: viết theo giọng và khung của bài mẫu trong knowledge.",
          "Dễ bị cuốn vì ví dụ giúp Claude viết đúng kiểu, và bài 5.3 có khuyên đưa vài ví dụ ngắn vào chỉ dẫn. Nhưng đề hỏi thứ “belong in the custom instructions” (thuộc về instructions). Một bài viết hoàn chỉnh là tài liệu tham khảo, đúng loại “mẫu văn bản” mà bài 5.1 xếp vào knowledge."
        ] }
    ],
    refs: [
      { label: "Bài 5.1, bảng “Instructions hay knowledge”: cách làm vào instructions, tư liệu (kể cả mẫu văn bản) vào knowledge", href: NOTES + "#l-5-1" },
      { label: "Bài 5.3, bảng “Cái gì đáng thành chỉ dẫn”: giọng, định dạng chuẩn, ràng buộc lâu dài thì đặt sẵn; việc riêng một lần thì nói trong tin nhắn", href: NOTES + "#l-5-3" }
    ]
  },
  {
    de: 3, n: 13, total: 75, sub: "2.1", subName: "Đúng và đủ: kiểm chỗ dễ sai trước",
    answer: "B",
    ask: "A business analyst is checking a Claude-written business case against the acceptance criteria that were agreed. What is the right order for these steps? (1) Compare the business case with the source data and the required topics. (2) Record gaps and errors for follow-up or correction. (3) Restate the acceptance criteria for the business case. (4) Decide whether to use it, iterate, or escalate. (5) Read the whole business case once to form a first impression.",
    scene: [
      "Một chuyên viên phân tích nghiệp vụ chấm một business case (đề xuất kinh doanh) do Claude viết, theo tiêu chí nghiệm thu (acceptance criteria) đã thống nhất.",
      "Năm bước: (1) so với dữ liệu nguồn và các mục bắt buộc, (2) ghi lại chỗ thiếu, chỗ sai, (3) nhắc lại tiêu chí nghiệm thu, (4) quyết dùng, sửa tiếp hay chuyển lên, (5) đọc một lượt từ đầu tới cuối để có ấn tượng ban đầu.",
      "Chỗ khó: bốn phương án đều kết thúc bằng 2 rồi 4. Khác nhau ở ba bước đầu: tiêu chí, đọc một lượt, và so chi tiết đứng thứ tự nào."
    ],
    asks: [
      "Năm bước nên làm theo thứ tự nào?",
      "Tức là: chấm theo cái gì phải rõ trước khi chấm, và muốn so chi tiết thì phải đọc qua tài liệu trước.",
      "Soi từng phương án: lúc so chi tiết, đã có thước đo chưa, đã đọc tài liệu chưa?"
    ],
    facts: [
      "Độ đầy đủ đo bằng yêu cầu, không đo bằng chủ đề. Trước khi đọc output, chép yêu cầu thành danh sách: mỗi phần phải có là một dòng.",
      "Notes ghi thứ tự chấm: viết danh sách yêu cầu → đọc output, đánh dấu dòng nào đã có → rồi mới kiểm độ chính xác → ghi lại phần thiếu và chỗ sai để đưa vào lần sửa.",
      "Kiểm là so khẳng định với nguồn có thẩm quyền. Ở đây là dữ liệu nguồn của business case.",
      "Quyết định dùng, sửa tiếp hay chuyển lên phải dựa trên các phát hiện đã ghi, nên đứng cuối."
    ],
    opts: [
      { k: "A", gist: "3, 1, 5, 2, 4: restate the criteria, compare with the sources, read it through, record gaps, decide.",
        why: [
          "Tiêu chí đứng đầu là đúng. Nhưng so chi tiết với nguồn khi chưa đọc qua tài liệu một lượt (ý 2).",
          "Đọc toàn bài sau khi đã so chi tiết thì không còn tác dụng mở đường. Bước đọc một lượt là để nắm lập luận, phạm vi, ý nào nằm ở đâu trước khi soi từng dòng.",
          "Dễ bị cuốn vì nó chỉ đổi chỗ hai bước giữa so với thứ tự đúng, và nghe như “đi thẳng vào kiểm”. Nhưng chưa đọc qua thì phần so chi tiết thành dò từng đoạn mà không thấy bức tranh chung."
        ] },
      { k: "B", gist: "3, 5, 1, 2, 4: restate the criteria, read it through, compare with the sources, record gaps, decide.",
        why: [
          "Đúng. Nhắc lại tiêu chí trước, để có thước đo trước khi đọc (ý 1).",
          "Đọc một lượt để nắm bố cục và lập luận, rồi mới so với dữ liệu nguồn và các mục bắt buộc (ý 2, 3). Phát hiện được ghi lại, và quyết định cuối dựa trên chúng (ý 4)."
        ] },
      { k: "C", gist: "5, 3, 1, 2, 4: read it through, restate the criteria, compare with the sources, record gaps, decide.",
        why: [
          "Đọc trước khi có thước đo: ấn tượng ban đầu hình thành khi chưa nhắc lại tiêu chí (ý 1).",
          "Bài viết trơn tru dễ tạo ấn tượng tốt, rồi tiêu chí bị đọc theo ấn tượng đó. Phần thiếu không để lại câu nào kỳ lạ, nên đọc mà không có danh sách trước thì khó thấy."
        ] },
      { k: "D", gist: "1, 3, 5, 2, 4: compare with the sources, restate the criteria, read it through, record gaps, decide.",
        why: [
          "So chi tiết ngay bước đầu, khi chưa nhắc lại tiêu chí và chưa đọc tài liệu (ý 1, 2). So mà không biết so theo cái gì.",
          "Đọc toàn bài lại đứng sau bước so, nên không giúp gì cho bước so."
        ] }
    ],
    refs: [
      { label: "Bài 2.1, mục “Đo độ đủ bằng một danh sách viết trước”: chép yêu cầu thành danh sách, đọc, rồi mới kiểm chính xác, ghi lại chỗ thiếu", href: NOTES + "#l-2-1" },
      { label: "Bài Nền tảng D2, mục 4: kiểm là so với nguồn có thẩm quyền nằm ngoài Claude", href: NOTES + "#l-2-0" }
    ]
  },
  {
    de: 3, n: 14, total: 75, sub: "2.2", subName: "Gọi đúng tên lỗi: bịa, mâu thuẫn, thiên lệch",
    answer: "D",
    ask: "While reviewing a Claude output, you suspect that part of it is hallucinated. What should you do first?",
    scene: [
      "Mày đang xem một output của Claude và nghi có chỗ bịa (hallucination).",
      "Mới là nghi: chưa biết câu nào, chưa biết có thật bịa không.",
      "Chỗ khó: ba phương án sai đều là việc có thể làm về sau (làm lại, ghi sổ rủi ro, báo cho người dùng). Đề hỏi việc “first” (trước tiên)."
    ],
    asks: [
      "Nghi có bịa thì làm gì trước tiên?",
      "Tức là: trước khi xử lý gì, phải biết đúng chỗ nào đáng nghi để còn kiểm.",
      "Soi từng phương án: nó có cần biết trước câu nào bị bịa không? Nếu cần thì nó không thể đứng đầu."
    ],
    facts: [
      "Hallucination là nội dung không có cơ sở trong thứ bạn đưa hay kiểm được: trích dẫn không tồn tại, con số không có nguồn. Nó hay nằm ở chi tiết chính xác: tên, ngày, số liệu, trích dẫn, link.",
      "Luật phân loại: gọi theo cái quan sát được. Chưa biết câu nào sai thì chưa gọi là bịa. Một trích dẫn tra không ra mới là bịa.",
      "Kiểm sau khi Claude viết: tách bản nháp thành từng khẳng định, rồi so với nguồn đang nắm sự thật đó. Mỗi khẳng định đạt hay trượt riêng.",
      "Cách xử lý tùy kiểu lỗi: câu bịa thì bỏ hoặc thay bằng nguồn thật. Phải biết câu nào và lỗi gì thì mới chọn được cách xử lý."
    ],
    opts: [
      { k: "A", gist: "Throw out the whole output and generate a fresh one from a new prompt.",
        why: [
          "Sai: bỏ cả output khi chưa biết câu nào có vấn đề (ý 2). Phần đúng cũng bị bỏ theo.",
          "Bản mới đi ra từ cùng một cơ chế. Chưa biết nguyên nhân thì có thể bịa lại đúng chỗ đó, và lại phải kiểm bản mới từ đầu.",
          "Dễ bị cuốn vì làm lại nghe dứt khoát, sạch sẽ. Nhưng đó là đổi một bản chưa kiểm lấy một bản chưa kiểm khác."
        ] },
      { k: "B", gist: "Log the hallucination pattern in the team's risk register for later reference.",
        why: [
          "Ghi sổ rủi ro có ích về sau, nhưng đó là ghi một lỗi đã xác nhận. Lúc này mới là nghi, chưa biết câu nào, cũng chưa chắc có bịa (ý 2).",
          "Ghi vào sổ không gỡ được câu sai đang nằm trong output."
        ] },
      { k: "C", gist: "Tell the user community that the output contains a hallucinated claim.",
        why: [
          "Báo cho cả cộng đồng người dùng khi chưa xác nhận có lỗi, chưa biết lỗi ở đâu (ý 2). Báo nhầm còn làm người ta mất tin cả vào những phần đúng.",
          "Thông báo, nếu cần, đi sau khi đã khoanh và kiểm được câu sai."
        ] },
      { k: "D", gist: "Identify the exact claim that does not seem to be backed by the available evidence.",
        why: [
          "Đúng. Khoanh đúng khẳng định đáng nghi là bước đầu (ý 3). Có nó mới so được với nguồn, để biết là bịa thật, chỉ là suy luận chưa có căn cứ, hay vẫn đúng.",
          "Biết câu nào và lỗi gì rồi mới chọn cách xử lý: bỏ câu đó hay thay bằng nguồn thật (ý 4). Ghi sổ rủi ro hay thông báo, nếu cần, đều đi sau bước này."
        ] }
    ],
    refs: [
      { label: "Bài 2.2, bảng “Ba kiểu lỗi” và luật phân loại: gọi theo cái quan sát được, chưa biết câu nào sai thì chưa gọi là bịa", href: NOTES + "#l-2-2" },
      { label: "Bài 2.3, mục “Sau khi Claude viết: kiểm từng khẳng định”: tách thành từng khẳng định rồi so với nguồn", href: NOTES + "#l-2-3" }
    ]
  },
  {
    de: 3, n: 15, total: 75, sub: "6.1", subName: "Việc nào giao cho Claude được",
    answer: "C",
    ask: "A bank manager receives a proposal to make Claude the sole decision-maker for approving customer credit lines. What is the most appropriate response?",
    scene: [
      "Một quản lý ngân hàng nhận đề xuất để Claude là người quyết duy nhất (sole decision-maker) cho việc duyệt hạn mức tín dụng của khách.",
      "Mỗi quyết định rơi vào một khách cụ thể, chạm thẳng tới chuyện họ có được cấp tín dụng hay không.",
      "Chỗ khó: ba phương án sai đều có một lý do nghe ổn: nhanh hơn, chạy thử trước, làm trọn quy trình cho gọn."
    ],
    asks: [
      "Phản hồi nào hợp nhất?",
      "Tức là: việc này giao cho Claude tới đâu thì được, và ai phải giữ quyền quyết.",
      "Soi từng phương án: trước khi quyết định tới khách, có người có chuyên môn duyệt không?"
    ],
    facts: [
      "Usage Policy liệt kê các lĩnh vực rủi ro cao, trong đó có tài chính và tín dụng. Lời khuyên hay quyết định về một người cụ thể trong các lĩnh vực này được làm, nhưng có hai điều kiện bắt buộc.",
      "Hai điều kiện: người có chuyên môn duyệt trước khi output tới người bị ảnh hưởng, có quyền sửa và chịu trách nhiệm; và báo cho người đó là có dùng AI.",
      "Vùng vàng: Claude soạn, gợi ý; người có chuyên môn quyết. Phép thử “kiểm được, sửa được”: lỗi phải được thấy và sửa trước khi gây hại cho ai.",
      "Thêm người duyệt chỉ cứu được khi người đó đứng trước thời điểm gây hại. Kiểm lại sau khi quyết định đã tới khách thì không cứu được."
    ],
    opts: [
      { k: "A", gist: "Approve the sole-decision-maker setup, since Claude can handle applications faster than a human review team.",
        why: [
          "Sai ở lý do: nhanh không phải câu hỏi. Câu hỏi là nếu Claude sai thì ai thấy, sửa có kịp không (ý 3).",
          "Bỏ người duyệt là bỏ đúng điều kiện bắt buộc của ca rủi ro cao (ý 1, 2). Một khách bị từ chối oan không ai chặn được."
        ] },
      { k: "B", gist: "Roll the setup out as a pilot and bring in compliance only if problems show up during production use.",
        why: [
          "Sai ở thời điểm: “only if issues arise” (chỉ khi có sự cố) là gọi compliance sau khi quyết định đã tới khách (ý 4).",
          "Chạy thử trên khách thật vẫn là quyết định thật về người thật, và vẫn không có người duyệt trước (ý 2).",
          "Dễ bị cuốn vì “pilot” (chạy thử) nghe thận trọng, có kiểm soát. Nhưng thận trọng thật là có người duyệt trước mỗi quyết định, không phải đợi sự cố."
        ] },
      { k: "C", gist: "Turn down the sole-decision-maker setup and suggest Claude support analysts who keep the authority to decide.",
        why: [
          "Đúng. Claude làm phần hợp với nó: tóm tắt hồ sơ, kiểm đủ giấy tờ, nêu ca cần xem kỹ. Chuyên viên tín dụng giữ quyền quyết (ý 3).",
          "Người có chuyên môn đứng trước mỗi quyết định, có quyền sửa, chịu trách nhiệm (ý 2). Từ chối thiết kế cũ nhưng vẫn đưa ra một cách dùng Claude hợp lệ."
        ] },
      { k: "D", gist: "Widen the setup so that Claude both assesses applications and sends final approval notices to customers itself.",
        why: [
          "Sai, và còn nặng hơn đề xuất gốc: Claude vừa quyết vừa gửi thẳng cho khách. Không còn chỗ nào để người thấy lỗi trước khi nó tới khách (ý 2, 3).",
          "Bản Usage Policy mới (hiệu lực 12/11/2026) miễn duyệt trước cho quyết định có lợi hoàn toàn, nơi luật cho phép. Nhưng hệ thống này chấm mọi hồ sơ, kể cả ca từ chối hay duyệt một phần, nên miễn trừ đó không phủ được nó."
        ] }
    ],
    refs: [
      { label: "Bài 6.1, mục “Vùng vàng: Claude gợi ý, người có chuyên môn quyết” và phép thử “kiểm được, sửa được”", href: NOTES + "#l-6-1" },
      { label: "Usage Policy của Anthropic: yêu cầu người duyệt và công khai cho ca rủi ro cao", href: "https://www.anthropic.com/legal/aup" }
    ]
  },
  {
    de: 3, n: 16, total: 75, sub: "7.2", subName: "Chỉnh theo phản hồi",
    answer: "C",
    ask: "You run a weekly cycle of feedback and adjustment. What is the right order for these steps? (1) Turn the feedback into one or two targeted changes for the next cycle. (2) Run the next cycle and compare its results with the previous cycle. (3) Capture the specific feedback given during the review. (4) Record what changed, what effect it had, and what problems remain. (5) Decide whether to keep iterating, change approach, or escalate.",
    scene: [
      "Mày chạy một vòng phản hồi và điều chỉnh mỗi tuần.",
      "Năm bước: (1) đổi phản hồi thành một hai điều chỉnh có đích cho vòng sau, (2) chạy vòng sau và so với vòng trước, (3) ghi lại phản hồi cụ thể nhận được trong buổi rà, (4) ghi lại đã đổi gì, ra tác dụng gì, còn vấn đề gì, (5) quyết lặp tiếp, đổi cách hay chuyển lên.",
      "Chỗ khó: bốn phương án đều kết thúc bằng 4 rồi 5. Khác nhau ở ba bước đầu: ghi phản hồi, đổi thành điều chỉnh, chạy vòng sau."
    ],
    asks: [
      "Năm bước nên theo thứ tự nào?",
      "Tức là: mỗi bước cần đầu vào từ bước nào, để vòng sau so được với vòng trước và biết thay đổi nào có tác dụng.",
      "Soi từng phương án: lúc chạy vòng sau, đã có điều chỉnh nào chưa? Lúc điều chỉnh, đã có phản hồi trong tay chưa?"
    ],
    facts: [
      "Phản hồi là triệu chứng, không phải đơn thuốc. Ghi lại phản hồi cụ thể trước, rồi mới tìm gốc và chọn chỗ cần sửa.",
      "Vòng chẩn đoán: ghi lại triệu chứng → đoán cần gạt → đổi đúng một thứ → chạy lại cùng input → tốt hơn không? Không thì hoàn tác, thử cần gạt khác.",
      "Đổi nhiều thứ cùng lúc mà output tốt hơn thì không biết thứ nào có tác dụng. Ghi lại mỗi vòng: đổi gì, output ra sao.",
      "Sau một vòng: đạt tiêu chí ổn định hoặc không cải thiện thêm thì dừng, đi sai hướng từ đầu thì bắt đầu lại, đã qua thử thì lưu cho bền. Việc vượt chuyên môn của mình thì chuyển lên đúng người."
    ],
    opts: [
      { k: "A", gist: "2, 3, 1, 4, 5: run the next cycle, capture feedback, turn it into changes, record, decide.",
        why: [
          "Chạy vòng sau trước khi có phản hồi hay điều chỉnh nào. Vòng đó chạy y như vòng trước, so với vòng trước chẳng thấy gì (ý 2).",
          "Điều chỉnh làm ra sau đó lại không được chạy thử trước khi ghi lại và quyết định. Bước 4 ghi “đã đổi gì, ra tác dụng gì” mà chưa đo tác dụng nào (ý 3)."
        ] },
      { k: "B", gist: "1, 3, 2, 4, 5: turn feedback into changes, capture feedback, run and compare, record, decide.",
        why: [
          "Đổi phản hồi thành điều chỉnh khi chưa ghi lại phản hồi nào (ý 1). Điều chỉnh lúc đó dựa vào trí nhớ hay cảm giác.",
          "Dễ bị cuốn vì phương án chỉ đổi chỗ hai bước đầu so với thứ tự đúng, và cụm “translate feedback” (đổi phản hồi) nghe như phản hồi đã có sẵn. Nhưng phản hồi cụ thể chỉ có sau bước ghi lại."
        ] },
      { k: "C", gist: "3, 1, 2, 4, 5: capture feedback, turn it into one or two changes, run and compare, record, decide.",
        why: [
          "Đúng. Ghi phản hồi cụ thể trước (ý 1), đổi thành một hai điều chỉnh có đích (ý 2), rồi chạy vòng sau và so với vòng trước.",
          "Chỉ một hai điều chỉnh thì so hai vòng còn biết thay đổi nào có tác dụng (ý 3). Ghi lại kết quả rồi mới quyết lặp tiếp, đổi cách hay chuyển lên (ý 4)."
        ] },
      { k: "D", gist: "3, 2, 1, 4, 5: capture feedback, run the next cycle, turn feedback into changes, record, decide.",
        why: [
          "Ghi phản hồi đầu tiên là đúng. Nhưng chạy vòng sau trước khi đổi phản hồi thành điều chỉnh, nên vòng sau chưa có gì mới để so (ý 2).",
          "Điều chỉnh làm ra sau đó không được chạy thử. Bước ghi tác dụng không có gì để ghi (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D7, mục 4 “Vòng chẩn đoán”: ghi lại triệu chứng → đổi đúng một thứ → chạy lại cùng input", href: NOTES + "#l-7-0" },
      { label: "Bài 7.2, mục “Đọc phản hồi để tìm gốc”: phản hồi là triệu chứng, không phải đơn thuốc", href: NOTES + "#l-7-2" },
      { label: "Bài 7.1, mục “Vì sao chỉ đổi một thứ”: ghi lại mỗi vòng đổi gì, output ra sao", href: NOTES + "#l-7-1" }
    ]
  },
  {
    de: 3, n: 17, total: 75, sub: "5.2", subName: "File tải lên và connector",
    answer: "AB",
    ask: "A Claude associate is deciding whether to turn on a Skill supplied by a third party they do not know. Which two checks best support a sound decision about trusting it? (Select two.)",
    scene: [
      "Một người dùng Claude đang cân nhắc có bật một Skill do một bên thứ ba lạ cung cấp không.",
      "Skill là thư mục chứa hướng dẫn, script và tài nguyên, Claude tự nạp khi việc cần tới. Nó có thể khiến Claude chạy code hay kết nối ra ngoài.",
      "Chỗ khó: ba phương án sai đều lấy một thứ bên ngoài thay cho bước kiểm: có trong danh sách công khai, được đánh giá tốt, hay giả định “Skill không vượt được quy trình”."
    ],
    asks: [
      "Hai bước kiểm nào giúp quyết định tin hay không cho đúng?",
      "Tức là: một bước xác nhận nguồn gốc và việc công ty có cho dùng không, một bước xem Skill làm gì, đòi với tới đâu.",
      "Cần chọn hai. Soi từng phương án: nó kiểm thật, hay lấy danh tiếng, giả định thay cho kiểm?"
    ],
    facts: [
      "Skills là các thư mục chứa hướng dẫn, script và tài nguyên. Skill cần code execution (“Create and edit files”), và có thể kèm gói phần mềm bên thứ ba hay bảo Claude cài phần mềm.",
      "Help Center nêu hai rủi ro lớn nhất: prompt injection (bị cài lệnh khiến Claude làm việc ngoài ý muốn) và data exfiltration (rò dữ liệu ra ngoài). Lời khuyên: chỉ cài Skill từ nguồn tin cậy.",
      "Help Center: Skill từ nguồn kém tin cậy hơn, kể cả do đồng nghiệp gửi, thì xem kỹ trước khi bật. Đọc các file trong Skill để hiểu nó làm gì, chú ý phụ thuộc, script, và lệnh bảo Claude kết nối tới mạng ngoài không tin cậy.",
      "Chính sách AI của công ty quyết công cụ nào được dùng. Chính sách không nhắc tới là chưa được duyệt, không phải được phép. Trên Team, Enterprise, Owner có thể đưa Skill lên cho cả tổ chức, và nếu tổ chức bắt duyệt thì Skill được kiểm trước khi chia sẻ cho người khác."
    ],
    opts: [
      { k: "A", gist: "Check the Skill's source against the organization's list of approved Skills before enabling it in Claude.ai or in any Project the team works in.",
        why: [
          "Đúng. Đây là bước kiểm nguồn gốc và kiểm việc công ty có cho dùng không (ý 4). Một bên thứ ba lạ thì chưa phải nguồn tin cậy (ý 2).",
          "Kiểm trước khi bật, ở mọi chỗ nhóm dùng. Không có trong danh sách được duyệt thì là chưa được duyệt: hỏi người phụ trách trước."
        ] },
      { k: "B", gist: "Look at the permissions and capabilities the Skill asks for and confirm that this access fits the task the Skill is meant to do.",
        why: [
          "Đúng, và bổ sung cho bước kiểm nguồn. Nguồn ổn chưa nói Skill làm gì. Với Skill, cách xem nó với tới đâu là đọc các file bên trong: chạy script gì, kéo phụ thuộc gì, có kết nối ra ngoài không (ý 3).",
          "Đòi nhiều hơn việc cần là dấu hiệu nguy hiểm: chỗ thừa đó là đường cho rò dữ liệu hay làm việc ngoài ý muốn (ý 2)."
        ] },
      { k: "C", gist: "Take the Skill's presence in a public listing as enough validation, without confirming its source, its permissions, or the approved-Skill list.",
        why: [
          "Sai: có mặt trong danh sách công khai không chứng minh gì về nội dung Skill. Help Center vẫn bảo xem kỹ Skill từ nguồn kém tin cậy (ý 3).",
          "Bỏ qua cả nguồn, quyền và danh sách được duyệt, tức là bỏ cả hai bước kiểm thật (ý 4)."
        ] },
      { k: "D", gist: "Turn the Skill on straight away because of strong outside reviews, although its source has not been validated and its permissions are still unchecked.",
        why: [
          "Sai: đánh giá tốt là danh tiếng, không phải kiểm. Một Skill được khen vẫn có thể kèm script hay lệnh kết nối ra ngoài (ý 1, 2).",
          "Bật trước, kiểm sau là ngược điều Help Center dặn: xem trước khi bật (ý 3).",
          "Dễ bị cuốn vì nhiều người khen nghe như đã có người kiểm giùm. Nhưng không ai trong số đó kiểm theo chính sách của công ty mày (ý 4)."
        ] },
      { k: "E", gist: "Skip the permission review on the assumption that the Skill cannot go beyond the workflow, even though Skills can ask for access the task does not need.",
        why: [
          "Sai ở giả định: chính phương án thừa nhận Skill có thể đòi quyền mà việc không cần. Skill có script, có thể khiến Claude chạy code và kết nối ra ngoài (ý 1).",
          "“Không vượt được quy trình” là niềm tin, không phải một lớp chặn. Prompt injection chính là làm Claude đi ra ngoài việc được giao (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 5.2, mục connector tự thêm: Anthropic không kiểm định, chỉ dùng máy chủ tin cậy. Skill bên thứ ba theo cùng cách nghĩ", href: NOTES + "#l-5-2" },
      { label: "Bài 6.3, khái niệm “công cụ được duyệt”: chính sách không nhắc tới là chưa được duyệt", href: NOTES + "#l-6-3" },
      { label: "Help Center “Use skills in Claude”, phần bảo mật: chỉ cài từ nguồn tin cậy, đọc file trong Skill trước khi bật", href: "https://support.claude.com/en/articles/12512180-using-skills-in-claude" }
    ]
  },
  {
    de: 3, n: 18, total: 75, sub: "4.5", subName: "Nói với stakeholder về giá trị và giới hạn",
    answer: "C",
    ask: "A senior manager is preparing to brief stakeholders on a proposed Claude use case and is applying the Description competency of the AI Fluency Framework. Which framing best fits Description principles for this communication?",
    scene: [
      "Một quản lý cấp cao chuẩn bị trình bày với stakeholder (những người có quyền lợi hay quyền quyết trong việc này) về một use case dùng Claude.",
      "Đề bảo anh ấy áp năng lực Description của khung AI Fluency.",
      "Chỗ khó: ba phương án sai tự nói luôn chỗ sai của mình bằng cụm “even though Description principles require…” (dù nguyên tắc Description đòi…). Câu này thật ra hỏi: nói đúng mức là nói thế nào."
    ],
    asks: [
      "Cách trình bày nào hợp nhất với nguyên tắc Description khi nói với stakeholder?",
      "Tức là: mô tả đúng Claude làm được gì, không được gì, và người vẫn giữ phần nào, ở mức người nghe hiểu được.",
      "Soi từng phương án: nó nói đúng cả hai chiều chưa, hay phóng to, thu nhỏ, giấu một phần?"
    ],
    facts: [
      "Description trong khung 4D là mô tả mục tiêu đủ rõ để AI cư xử đúng và cho ra kết quả dùng được. Gồm Product (đầu ra), Process (cách làm), Performance (cách cư xử).",
      "Nói với stakeholder: cho họ một cách hiểu Claude vừa đủ dùng, mạnh ở đâu, hụt ở đâu, bù thế nào. Không có cách hiểu đó thì họ rơi vào hai cực: thấy bản đẹp là tin hết, gặp một lỗi là không tin gì nữa.",
      "Bán cho đúng: người làm cùng Claude, không phải Claude thay người. Chỉ kể điểm mạnh là dọn sẵn chỗ cho thất vọng. Hứa biện pháp, không hứa hoàn hảo.",
      "Transparency Diligence: trung thực về vai trò của AI với người cần biết. Phần người duyệt, người quyết là thứ stakeholder cần biết."
    ],
    opts: [
      { k: "A", gist: "Leave out the human oversight that will stay in place, although Description requires expectations that match the use case's real capability limits.",
        why: [
          "Sai: giấu phần người giám sát làm stakeholder tưởng Claude tự chạy hết (ý 3, 4).",
          "Họ sẽ đánh giá rủi ro và chi phí sai: không tính giờ người duyệt, hoặc lo quá mức vì tưởng không ai kiểm."
        ] },
      { k: "B", gist: "Play down what Claude can do so stakeholder expectations stay low, although Description requires accuracy in both directions rather than routine understatement.",
        why: [
          "Sai: nói thấp cũng là nói sai, chỉ là sai theo chiều ngược lại. Chính phương án ghi “accuracy in both directions” (chính xác cả hai chiều).",
          "Stakeholder có thể bỏ một use case có giá trị thật, hoặc cấp thiếu nguồn lực vì tưởng nó không đáng (ý 2).",
          "Dễ bị cuốn vì hứa ít làm nhiều nghe an toàn, có trách nhiệm. Nhưng mục tiêu là cho họ một cách hiểu đúng để quyết, không phải để họ bất ngờ vui."
        ] },
      { k: "C", gist: "Explain what Claude can reliably produce, its known limits, and the human oversight that will remain, pitched to how familiar the audience is with AI.",
        why: [
          "Đúng. Đủ ba phần stakeholder cần: làm được gì, hụt ở đâu, người giữ phần nào (ý 2, 3, 4).",
          "Chỉnh theo mức hiểu AI của người nghe là đúng tinh thần mô tả cho rõ: nói sao cho người nhận dùng được điều mình nói (ý 1)."
        ] },
      { k: "D", gist: "Overstate what Claude can do to win stakeholder backing, although Description requires an accurate picture of what Claude can and cannot reliably produce.",
        why: [
          "Sai: phóng đại để được duyệt là hứa quá (ý 3). Output đầu tiên có lỗi là mất niềm tin, cả với phần Claude làm tốt.",
          "Stakeholder quyết dựa trên bức tranh sai, có thể cắt luôn phần người duyệt."
        ] }
    ],
    dispute: "Đáp án giữ C, không có gì để cãi. Chỉ lưu ý cách đề dùng chữ: trong khung AI Fluency, Description là mô tả cho AI (Product, Process, Performance), không phải trình bày với stakeholder. Đề mượn tên này để hỏi chuyện nói đúng mức về giá trị và giới hạn, vốn là nội dung bài 4.5 và Transparency Diligence. Gặp câu tương tự thì chọn phương án nói đúng cả hai chiều và có nêu phần người giữ.",
    refs: [
      { label: "Bài 4.5, mục “Cho stakeholder một cách hiểu Claude vừa đủ dùng” và “Bán cho đúng”: nói cả mạnh lẫn hụt, người làm cùng Claude", href: NOTES + "#l-4-5" },
      { label: "Bài Nền tảng D4, mục 2: định nghĩa Description và Transparency Diligence trong khung 4D", href: NOTES + "#l-4-0" }
    ]
  },
  {
    de: 3, n: 19, total: 75, sub: "3.4", subName: "Context có hạn: chat mới, tóm tắt, lưu lại",
    answer: "BC",
    ask: "A project manager is working through a long planning conversation with Claude that keeps growing, and wants it to stay productive. Which two practices help keep a long planning conversation on track? (Select two.)",
    scene: [
      "Một quản lý dự án lên kế hoạch với Claude trong một cuộc chat dài, và chat còn dài thêm.",
      "Đây là “planning conversation” (cuộc chat lên kế hoạch): cùng một mạch việc, có những quyết định đã chốt mà các phần sau cần.",
      "Chỗ khó: năm phương án là năm thói quen quản lý chat. Có cái nghe rất gọn gàng mà lại làm mất mạch việc."
    ],
    asks: [
      "Hai thói quen nào giữ cho một cuộc chat lên kế hoạch dài vẫn làm việc tốt?",
      "Tức là: chat dài ra rồi, làm sao để mục tiêu, ràng buộc và các quyết định đã chốt vẫn nằm trong tầm mắt của Claude, mà mạch việc không bị đứt.",
      "Soi từng phương án: nó giữ lại thứ quan trọng, hay làm mất nó (vì cắt mạch, vì trộn việc, vì để chat phình mãi)?"
    ],
    facts: [
      "Context rot (context bị mục): token trong context càng nhiều, Claude nhớ và trích lại thông tin trong đó càng kém chính xác. Context nhiều hơn chưa chắc tốt hơn.",
      "Chat dài hay lệch hướng: quên yêu cầu đầu chat, lẫn chi tiết việc khác. Cách giữ: nhắc lại con số, ràng buộc, quyết định quan trọng trong tin nhắn tiếp theo.",
      "Cùng một mạch việc mà chat đã dài thì tóm tắt: liệt kê các quyết định, con số, ràng buộc, việc còn mở. Tự liệt kê, hoặc nhờ Claude liệt kê rồi tự kiểm.",
      "Mở chat mới là cho việc không liên quan. Chat mới thì trống: chưa lưu gì mà bỏ chat là bỏ luôn các quyết định trong đó."
    ],
    opts: [
      { k: "A", gist: "Start a fresh thread for every small follow-up question so that no thread grows long.",
        why: [
          "Sai ở giả định: chat mới là cho việc không liên quan (ý 4). Câu hỏi nhỏ tiếp theo vẫn thuộc cùng kế hoạch, và cần các quyết định đã chốt.",
          "Chat mới nào cũng trống, nên hoặc phải dán lại bối cảnh, hoặc Claude trả lời mà không biết những gì đã chốt. Kế hoạch bị xé ra nhiều chat, quyết định rải rác, dễ nói ngược nhau.",
          "Dễ bị cuốn vì “chat ngắn thì đỡ context rot” nghe có lý. Nhưng chat ngắn mà thiếu bối cảnh còn tệ hơn chat dài có bối cảnh."
        ] },
      { k: "B", gist: "Restate the goals and constraints whenever the discussion moves on to a new subtopic.",
        why: [
          "Đúng. Chat dài thì những gì nói từ đầu dễ bị nhớ kém (ý 1). Nhắc lại mục tiêu và ràng buộc đưa chúng về sát phần đang làm (ý 2).",
          "Lúc chuyển sang một chủ đề con mới là lúc dễ lạc hướng nhất, nên nhắc đúng lúc đó là đúng chỗ."
        ] },
      { k: "C", gist: "Every so often, summarize the decisions reached so far to condense the state of the work.",
        why: [
          "Đúng. Bản tóm tắt quyết định nén mạch việc lại: những gì đã chốt gom về một chỗ, gọn, không phải lục lại cả chat (ý 3).",
          "Bản đó dùng tiếp ngay trong chat, hoặc mang sang chat mới khi chat này đầy. Nhớ tự kiểm bản tóm tắt, vì tóm tắt có thể làm rơi một con số."
        ] },
      { k: "D", gist: "Jump freely between unrelated planning topics within the same thread.",
        why: [
          "Sai: việc không liên quan thì nên ở chat riêng (ý 4). Trộn nhiều chủ đề trong một chat sinh ra đúng triệu chứng “lẫn chi tiết của việc khác” (ý 2).",
          "Chat vừa dài nhanh hơn, vừa đầy thứ không dính tới phần đang làm (ý 1)."
        ] },
      { k: "E", gist: "Never summarize, so that Claude keeps every word it originally wrote.",
        why: [
          "Sai ở giả định: giữ mọi chữ trong chat không có nghĩa là Claude nhớ mọi chữ. Chat càng dài, Claude trích lại càng kém (ý 1).",
          "Chat phình mãi thì mỗi tin nhắn càng tốn hạn mức, rồi cũng chạm giới hạn độ dài. Tới lúc phải mở chat mới thì không có bản gọn nào để mang theo."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, mục “Context chứa gì, và vì sao nhiều hơn chưa chắc tốt hơn” và bảng “Mở chat mới, tóm tắt, hay lưu lại”: context rot, chat mới cho việc không liên quan, chat dài thì tóm tắt quyết định", href: NOTES + "#l-3-4" },
      { label: "Bài 7.0, mục “Sáu cần gạt”: cần gạt hội thoại, chat quá dài thì quên yêu cầu đầu chat, lẫn chi tiết việc khác", href: NOTES + "#l-7-0" }
    ]
  },
  {
    de: 3, n: 20, total: 75, sub: "1.2", subName: "Chia việc lớn thành chuỗi bước",
    answer: "A",
    ask: "You are breaking a request to “build a customer journey map” into steps: (1) list the touchpoints the customer meets in each stage; (2) define the persona and the scope of the journey to be mapped; (3) record pain points and opportunities at each touchpoint; (4) pull the findings together into the final journey map; (5) list the major stages the persona goes through. Which order of steps is correct?",
    scene: [
      "Yêu cầu “build a customer journey map” (vẽ bản đồ hành trình khách hàng) được chia thành năm bước, đánh số 1–5 không theo thứ tự làm.",
      "Bốn phương án là bốn cách xếp năm số đó.",
      "Chỗ khó: các bước lồng vào nhau. Touchpoint (điểm chạm: chỗ khách gặp doanh nghiệp, như trang web, tổng đài) nằm trong từng giai đoạn. Pain point (điểm khó chịu của khách) lại gắn vào từng điểm chạm. Phải nhìn ra cái nào chứa cái nào."
    ],
    asks: [
      "Năm bước nên làm theo thứ tự nào?",
      "Tức là: bước nào cần output của bước nào. Khung bao ngoài phải có trước, chi tiết bên trong đi sau, gộp lại để cuối.",
      "Soi từng phương án: lúc mỗi bước chạy, thứ nó cần đã có chưa?"
    ],
    facts: [
      "Phần phụ thuộc cần kết quả của phần trước nên phải làm sau. Nối chuỗi prompt: output đã kiểm của bước trước làm đầu vào bước sau.",
      "Bước nào cũng cần mục tiêu gốc để không lạc hướng. Ở đây mục tiêu gốc là persona (chân dung khách tiêu biểu) và phạm vi hành trình: vẽ cho ai, từ đâu tới đâu.",
      "Quan hệ chứa nhau trong đề: hành trình → các giai đoạn → điểm chạm trong mỗi giai đoạn → điểm khó chịu và cơ hội tại mỗi điểm chạm. Bản đồ cuối gộp tất cả."
    ],
    opts: [
      { k: "A", gist: "2 → 5 → 1 → 3 → 4: persona and scope, then the stages, then the touchpoints, then pain points and opportunities, then the final map.",
        why: [
          "Đúng. Đi từ khung ra chi tiết: persona và phạm vi (2) → giai đoạn (5) → điểm chạm trong từng giai đoạn (1) → điểm khó chịu tại từng điểm chạm (3) → gộp thành bản đồ (4) (ý 2, 3).",
          "Mỗi bước nhận đủ thứ nó cần từ bước trước (ý 1). Bước gộp đứng cuối, nên chỉ làm trên chất liệu đã có và đã kiểm."
        ] },
      { k: "B", gist: "4 → 3 → 2 → 1 → 5: the final map first, then pain points, then persona and scope, then touchpoints, then the stages.",
        why: [
          "Gộp thành bản đồ cuối (4) ngay bước đầu, khi chưa có giai đoạn, điểm chạm hay điểm khó chịu nào để gộp (ý 1).",
          "Điểm khó chịu (3) đứng trước cả persona lẫn điểm chạm, tức là ghi lỗi khi chưa biết của ai, ở chỗ nào."
        ] },
      { k: "C", gist: "5 → 2 → 1 → 3 → 4: the stages first, then persona and scope, then touchpoints, then pain points, then the final map.",
        why: [
          "Liệt kê giai đoạn (5) trước khi có persona và phạm vi (2). Giai đoạn của ai, hành trình bắt đầu và dừng ở đâu còn chưa rõ (ý 2).",
          "Persona đổi thì giai đoạn có thể đổi theo, nên bước 5 có khi phải làm lại.",
          "Dễ bị cuốn vì ba bước cuối (1, 3, 4) giống hệt đáp án đúng. Nhưng chỉ cần đảo hai bước đầu là cả chuỗi đứng trên một cái khung chưa đặt."
        ] },
      { k: "D", gist: "2 → 1 → 5 → 3 → 4: persona and scope, then touchpoints, then the stages, then pain points, then the final map.",
        why: [
          "Liệt kê điểm chạm “in each stage” (trong mỗi giai đoạn) (1) khi chưa có giai đoạn nào (5) (ý 3).",
          "Điểm chạm không có giai đoạn để xếp vào, tới bước 5 lại phải chia lại."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, khái niệm “Phần độc lập, phần phụ thuộc” và mục “Bước sau cần nhận gì”: phần phụ thuộc làm sau, bước nào cũng cần mục tiêu gốc", href: NOTES + "#l-1-2" }
    ]
  },
  {
    de: 3, n: 21, total: 75, sub: "7.1", subName: "Chẩn đoán output kém",
    answer: "D",
    ask: "While troubleshooting, you find that a Claude response includes facts that appear nowhere in the source material it was given. Which root cause does this point to most directly?",
    scene: [
      "Một câu trả lời của Claude có những dữ kiện không hề có trong tài liệu nguồn đã đưa.",
      "Chỗ khó: cả bốn phương án đều là “prompt có vấn đề”, và vài cái nghe rất hợp lý: đòi viết đầy đủ, dàn sẵn tiêu đề.",
      "Đề hỏi “most directly indicated” (chỉ ra trực tiếp nhất), tức nguyên nhân khớp thẳng với triệu chứng, không phải thứ có thể góp thêm."
    ],
    asks: [
      "Triệu chứng này chỉ thẳng tới nguyên nhân gốc nào?",
      "Tức là: dữ kiện ngoài nguồn lọt vào được vì prompt thiếu cái gì. Sửa đúng cái đó thì triệu chứng hết.",
      "Soi từng phương án: nó giải thích trọn chuyện dữ kiện ngoài nguồn, hay chỉ là yếu tố phụ?"
    ],
    facts: [
      "Triệu chứng là cái thấy ở output. Nguyên nhân gốc là chỗ thật sự gây ra nó. Sửa đúng cần gạt thì hết bệnh, sửa sai cần gạt chỉ tốn công.",
      "Triệu chứng “trôi chảy mà có chi tiết không có căn cứ” thuộc cần gạt kiến thức. Sửa đầu tiên: dặn chỉ dùng tài liệu được đưa, và cho phép nói “không đủ thông tin”.",
      "Không bị giới hạn vào nguồn, cũng không có lối thoát, thì Claude lấp chỗ trống bằng thứ nghe hợp lý, lấy từ hiểu biết chung, không truy được nguồn.",
      "External knowledge restriction (chỉ dùng tài liệu): “chỉ dùng thông tin trong các file này, không dùng hiểu biết chung”. Đây là cách chặt nhất khi cần truy được nguồn của từng câu."
    ],
    opts: [
      { k: "A", gist: "The prompt asked for a comprehensive answer, so Claude filled perceived gaps with believable details it had not verified.",
        why: [
          "Sai ở chỗ nhầm yếu tố góp thêm thành nguyên nhân gốc. Đòi “comprehensive” (đầy đủ) không cho phép bịa. Bản đầy đủ mà có câu “chỉ dùng tài liệu này” vẫn bám nguồn (ý 4).",
          "Bỏ chữ “đầy đủ” mà vẫn không giới hạn nguồn thì Claude vẫn có thể thêm dữ kiện ngoài, chỉ là ít hơn.",
          "Dễ bị cuốn vì nó tả rất đúng cơ chế lấp chỗ trống (ý 3). Nhưng câu hỏi là vì sao chỗ trống được lấp bằng thứ ngoài nguồn, và câu trả lời là không có gì cấm điều đó."
        ] },
      { k: "B", gist: "The prompt cast Claude as a researcher instead of a writer.",
        why: [
          "Sai: vai không quyết định Claude được dùng nguồn nào. Vai “researcher” (nhà nghiên cứu) mà có dặn chỉ dùng tài liệu đã đưa thì vẫn bám nguồn (ý 4).",
          "Đổi vai sang “writer” (người viết) mà không giới hạn nguồn thì triệu chứng vẫn còn."
        ] },
      { k: "C", gist: "The prompt's heading-based layout pushed Claude to put filler content under every heading, even where the source says nothing.",
        why: [
          "Sai ở chỗ coi khung tiêu đề là gốc. Tiêu đề chỉ tạo ra chỗ trống. Thứ làm chỗ trống bị lấp bằng dữ kiện ngoài nguồn là prompt không cấm, và không cho ghi “nguồn không nói” (ý 2, 3).",
          "Đề cũng không hề nói prompt có dàn tiêu đề. Chọn C là thêm một giả định đề không cho."
        ] },
      { k: "D", gist: "The prompt never limited Claude to facts that appear in the supplied source.",
        why: [
          "Đúng. Dữ kiện ngoài nguồn khớp thẳng với chỗ thiếu này: không ai bảo Claude chỉ dùng tài liệu đã đưa (ý 2, 4).",
          "Sửa đúng cần gạt: thêm câu “chỉ dùng tài liệu được đưa, nguồn không nói thì ghi rõ là không có”. Có thể bắt trích câu nguồn cho từng ý, để lộ ra câu nào không có căn cứ."
        ] }
    ],
    refs: [
      { label: "Bài 7.1, bảng “Từ triệu chứng tới nguyên nhân”: trôi chảy mà sai chi tiết thì dặn chỉ dùng tài liệu được đưa, cho phép nói “không đủ thông tin”", href: NOTES + "#l-7-1" },
      { label: "Bài 7.0, mục “Sáu cần gạt”: triệu chứng khác nguyên nhân gốc, cần gạt kiến thức", href: NOTES + "#l-7-0" },
      { label: "Bài 2.3: external knowledge restriction, chỉ dùng tài liệu được đưa", href: NOTES + "#l-2-3" }
    ]
  },
  {
    de: 3, n: 22, total: 75, sub: "5.3", subName: "Viết chỉ dẫn cấp hệ thống",
    answer: "C",
    ask: "A marketing associate is writing the custom instructions for a Project used as a brand-voice writing workspace. Several writers will use it, and outputs must stay consistent across writers and across chats. Which approach is most likely to produce consistent outputs over many chats?",
    scene: [
      "Một chuyên viên marketing viết custom instructions (chỉ dẫn riêng) cho một Project dùng để viết theo giọng thương hiệu.",
      "Nhiều người viết cùng dùng. Output phải đồng đều giữa các người viết và giữa các chat.",
      "Chỗ khó: bốn phương án đều mở bằng vai của Claude và giọng thương hiệu. Chúng khác nhau ở chỗ người đọc, giới hạn về giọng và thuật ngữ nằm ở đâu: trong instructions, trong từng tin nhắn, trong knowledge, hay thay bằng một bài mẫu."
    ],
    asks: [
      "Cách nào dễ cho output đồng đều nhất qua nhiều chat?",
      "Tức là: những gì phải giống nhau ở mọi chat thì đặt ở đâu, để chat nào, người viết nào cũng nhận đủ.",
      "Soi từng phương án: còn thứ gì để từng người tự nhớ, hay để Claude có thể không đọc tới?"
    ],
    facts: [
      "Project instructions áp cho mọi chat trong Project. Thứ lặp lại ở mọi chat (người đọc, giọng, định dạng chuẩn, ràng buộc lâu dài) đặt sẵn ở đây. Tin nhắn chỉ để nói việc riêng của lần đó.",
      "Bộ khung chỉ dẫn gồm vai, việc và phạm vi, người đọc, định dạng, nguồn, khi không chắc, ưu tiên. Viết cụ thể tới mức một đồng nghiệp mới đọc vào là làm được.",
      "Knowledge là tư liệu để tra. Sổ tay thương hiệu đặt trong knowledge thì cần một dòng instructions nói phải viết theo nó. Khi RAG bật, Claude chỉ lấy phần liên quan, nên có lúc một file không được đọc tới.",
      "Một ví dụ cho thấy giọng nhanh hơn ba đoạn mô tả, nhưng Claude bám rất sát chi tiết của ví dụ. Docs nói 3–5 ví dụ đa dạng cho kết quả tốt nhất."
    ],
    opts: [
      { k: "A", gist: "State Claude's role and include one approved sample of brand-voice writing, on the view that a single strong example conveys the voice better than written rules.",
        why: [
          "Sai ở chỗ dùng một bài mẫu thay cho quy tắc. Mẫu cho thấy giọng, nhưng không nói người đọc là ai, giọng nào bị cấm, từ nào phải dùng (ý 2).",
          "Chỉ một bài thì Claude dễ bám theo cả những nét riêng của bài đó: độ dài, bố cục, chủ đề (ý 4). Output sẽ giống bài mẫu hơn là đúng với từng việc.",
          "Dễ bị cuốn vì notes và docs đều khen ví dụ. Nhưng ví dụ là để thêm vào quy tắc, không phải để thay quy tắc."
        ] },
      { k: "B", gist: "State the role and the brand-voice attributes, and let each writer supply the audience, tone limits, and terminology rules in each chat to keep the setup flexible.",
        why: [
          "Sai: người đọc, giới hạn giọng, thuật ngữ là thứ lặp lại ở mọi chat, nên phải nằm trong instructions (ý 1).",
          "Để mỗi người tự gõ thì mỗi người gõ một kiểu, có người quên. Output khác nhau giữa các người viết, đúng cái đề muốn tránh."
        ] },
      { k: "C", gist: "State the role, summarize the brand-voice attributes, name the audience, list the tone constraints, and require use of the brand's terminology.",
        why: [
          "Đúng. Mọi thứ phải giống nhau ở mọi chat đều nằm trong instructions: vai, giọng, người đọc, giới hạn giọng, thuật ngữ (ý 1, 2).",
          "Chat nào, người viết nào cũng bắt đầu từ cùng một bộ yêu cầu, nên output đồng đều. Bảng thuật ngữ chi tiết vẫn để được trong knowledge, vì instructions đã bắt phải theo nó (ý 3)."
        ] },
      { k: "D", gist: "State the role, the brand-voice attributes, and the audience, but leave terminology to a glossary in the Project knowledge instead of the custom instructions.",
        why: [
          "Sai ở chỗ bỏ hẳn thuật ngữ khỏi instructions. Glossary (bảng thuật ngữ) trong knowledge chỉ là tư liệu để tra. Không có dòng instructions bắt theo nó thì không gì bảo đảm Claude dùng (ý 3).",
          "Phương án này còn thiếu giới hạn về giọng, nên vẫn hở một chỗ cho output lệch nhau."
        ] }
    ],
    refs: [
      { label: "Bài 5.3, mục “Cái gì đáng thành chỉ dẫn, cái gì để trong tin nhắn” và “Bộ khung bảy phần”", href: NOTES + "#l-5-3" },
      { label: "Bài 5.1, bảng “Instructions hay knowledge”: sổ tay thương hiệu vào knowledge, kèm một dòng instructions bắt viết theo nó", href: NOTES + "#l-5-1" },
      { label: "Bài 1.1, mục “Đưa một ví dụ thay cho đoạn tả dài”: Claude bám sát ví dụ, 3–5 ví dụ đa dạng", href: NOTES + "#l-1-1" }
    ]
  },
  {
    de: 3, n: 23, total: 75, sub: "6.4", subName: "Đạo đức khi dùng AI",
    answer: "D",
    ask: "A senior manager is preparing an AI-assisted deliverable to send outside the organization and is applying the Diligence competency of the AI Fluency Framework. Which step best reflects Diligence?",
    scene: [
      "Một quản lý cấp cao chuẩn bị gửi ra ngoài một sản phẩm có Claude hỗ trợ làm.",
      "Anh áp dụng Diligence (cẩn trọng, chịu trách nhiệm), chữ D thứ tư trong khung AI Fluency 4D.",
      "Đề hơi lạ: ba phương án sai tự ghi luôn là chúng trái với Diligence. Câu này chỉ kiểm mày có nắm Diligence nghĩa là gì."
    ],
    asks: [
      "Bước nào thể hiện đúng nhất tinh thần Diligence?",
      "Tức là: trước khi gửi ra ngoài, ai chịu trách nhiệm cho sản phẩm, và trách nhiệm đó thành việc cụ thể gì."
    ],
    facts: [
      "Diligence: “taking responsibility for what we do with AI and how we do it” (chịu trách nhiệm về những gì ta làm với AI và cách ta làm). Gồm ba phần: Creation, Transparency, Deployment Diligence.",
      "Deployment Diligence: kiểm và đứng ra bảo đảm cho output bạn dùng hoặc chia sẻ. “Claude viết” không chuyển trách nhiệm sang công cụ. Bạn gửi thì bạn chịu.",
      "Chịu trách nhiệm nghĩa là đã kiểm những chi tiết gây hại nếu sai: số liệu, trích dẫn, tên người, điều khoản.",
      "Văn trôi chảy, giọng tự tin không phải bằng chứng là đúng."
    ],
    opts: [
      { k: "A", gist: "Hand accountability for the deliverable over to Claude instead of keeping it as a human duty, against the Diligence principle that people stay accountable for AI-assisted work.",
        why: [
          "Sai: trách nhiệm không chuyển được sang công cụ (ý 2). Phương án tự nhận là trái với Diligence.",
          "Sản phẩm sai thì khách hỏi tới người gửi, không hỏi tới Claude."
        ] },
      { k: "B", gist: "Send the deliverable without independent checking, on the grounds that AI help moves accountability away from the person, even though Diligence keeps the person fully accountable.",
        why: [
          "Sai ở giả định: dùng AI không làm trách nhiệm dời đi đâu cả (ý 2).",
          "Gửi ra ngoài mà không kiểm là bỏ đúng phần Deployment Diligence đòi. Lỗi tới tay người nhận rồi thì không thu hồi được."
        ] },
      { k: "C", gist: "Skip checking any part, assuming fluent output must be accurate, even though Diligence requires checking and correcting AI output before anyone acts on it.",
        why: [
          "Sai: văn trôi chảy không phải bằng chứng (ý 4). Câu sai của Claude cũng trôi chảy y như câu đúng.",
          "Dễ bị cuốn hơn A, B vì nó không nói chuyện đẩy trách nhiệm, chỉ nói “trông ổn”. Nhưng tin vào vẻ ngoài vẫn là bỏ bước kiểm (ý 3)."
        ] },
      { k: "D", gist: "Identify which parts of the deliverable need independent checking or correction before it goes out, and own those checks as a matter of professional accountability.",
        why: [
          "Đúng. Người quản lý giữ trách nhiệm (ý 1, 2), và biến nó thành việc cụ thể: chọn ra chỗ phải kiểm, như số liệu, trích dẫn, điều khoản, rồi tự đứng ra kiểm (ý 3).",
          "Đây đúng là Deployment Diligence: kiểm và bảo đảm trước khi output rời tay mình."
        ] }
    ],
    refs: [
      { label: "Bài 6.4, mục “Diligence gồm ba phần” và “Bạn gửi thì bạn chịu”", href: NOTES + "#l-6-4" },
      { label: "Bài 4.0: khung 4D, Diligence và ba phần của nó", href: NOTES + "#l-4-0" },
      { label: "Bài mở đầu “Khẩu vị chọn đáp án”, luật 1: độ tự tin không phải bằng chứng", href: NOTES + "#l-0-3" }
    ]
  },
  {
    de: 3, n: 24, total: 75, sub: "2.6", subName: "Chọn định dạng output",
    answer: "D",
    ask: "A knowledge worker has asked Claude for a one-page operating procedure. The team will edit it, reuse it over several onboarding cycles, and update it whenever the underlying process changes. Which output format is most appropriate?",
    scene: [
      "Một nhân viên nhờ Claude soạn quy trình vận hành dài một trang.",
      "Nhóm sẽ sửa nó, dùng lại qua nhiều đợt onboarding (đón nhân viên mới), và cập nhật mỗi khi quy trình thật thay đổi.",
      "Chỗ khó: ba phương án đầu đều chạy được theo kiểu nào đó. Đề hỏi định dạng “most appropriate” (phù hợp nhất) cho một tài liệu sống lâu, nhiều người sửa."
    ],
    asks: [
      "Định dạng output nào phù hợp nhất?",
      "Tức là: nơi nhận là cả nhóm, việc tiếp theo là sửa, dùng lại, cập nhật nhiều lần. Định dạng nào hợp với việc đó?"
    ],
    facts: [
      "Chọn định dạng bằng hai câu hỏi: ai nhận output, và họ làm gì với nó tiếp theo. Đọc một lần rồi thôi thì trả lời ngay trong chat. Sẽ sửa, dùng lại, đưa cho người khác thì làm artifact.",
      "Artifact: nội dung đáng kể, đứng riêng được (thường trên 15 dòng), đọc hiểu được mà không cần cuộc chat xung quanh. Lưu ở tab Artifacts, mở lại từ bất kỳ chat nào. Mới tạo là riêng tư, muốn người khác mở thì chỉnh quyền chia sẻ.",
      "Sửa một tin nhắn cũ trong chat tạo ra một nhánh chat riêng. Muốn giữ một bản duy nhất thì sửa thẳng trên artifact. Tài liệu Docs xuất được ra Word, PDF, Markdown, Google Docs."
    ],
    opts: [
      { k: "A", gist: "Get the procedure as a chat reply and paste the text into the team's document store after each revision.",
        why: [
          "Chạy được, nhưng mỗi lần sửa lại phải chép tay một lần. Chép nhầm bản cũ hay sót một đoạn là kho tài liệu sai mà không ai biết.",
          "Trong chat, bản mới nhất nằm đâu đó giữa các lượt trao đổi, không phải một tài liệu đứng riêng (ý 3).",
          "Dễ bị cuốn vì kho tài liệu của nhóm nghe rất đúng chỗ để lưu. Nhưng đề hỏi định dạng output, và thứ sẽ sửa, dùng lại nhiều lần là đúng ca làm artifact (ý 1)."
        ] },
      { k: "B", gist: "Get the procedure as a chat reply and save the entire chat transcript to the team's document store as the working document.",
        why: [
          "Sai: bản ghi cả chat lẫn lời hỏi, các bản nháp cũ, lời giải thích. Người mới không biết đâu là quy trình hiện hành.",
          "Tài liệu dùng lâu phải đọc hiểu được mà không cần cuộc chat xung quanh (ý 2). Bản ghi chat thì ngược lại."
        ] },
      { k: "C", gist: "Get the procedure as numbered steps in the chat and treat that chat as the reference for future edits.",
        why: [
          "Đúng hình thức (quy trình thì nên đánh số bước), sai chỗ đặt. Chat không phải chỗ cho một tài liệu nhiều người sửa qua nhiều đợt (ý 1).",
          "Mỗi lần sửa lại thêm lượt chat hoặc thêm nhánh (ý 3), nên “bản tham chiếu” bị rải ra, khó biết bản nào mới nhất."
        ] },
      { k: "D", gist: "Get the procedure as an Artifact that the team can open, edit, and keep as a stable reference.",
        why: [
          "Đúng. Quy trình một trang là nội dung đáng kể, đứng riêng, sẽ sửa và dùng lại: đúng tiêu chí làm artifact (ý 1, 2).",
          "Artifact là một bản duy nhất, sửa thẳng trên đó, mở lại được, chia sẻ được, xuất ra Word hay Google Docs khi cần (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 2.6, mục “Định dạng đi theo nơi nhận” và “Trả lời ngay hay làm artifact”", href: NOTES + "#l-2-6" },
      { label: "Bài 3.1, mục “Artifact: khi kết quả là sản phẩm để dùng tiếp”: lưu ở tab Artifacts, mới tạo là riêng tư", href: NOTES + "#l-3-1" },
      { label: "Help Center “What are artifacts”: khi nào Claude tạo artifact", href: "https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them" }
    ]
  },
  {
    de: 3, n: 25, total: 75, sub: "1.3", subName: "Lặp prompt: chẩn đoán, đổi một chỗ, thử lại",
    answer: "A",
    ask: "A knowledge worker is iterating on a prompt that has produced a response that is only partly acceptable. Which refinement practice yields the strongest learning from one iteration to the next?",
    scene: [
      "Một nhân viên đang lặp prompt. Câu trả lời mới đạt một phần.",
      "Đề hỏi cách nào cho “the strongest learning across iterations” (học được nhiều nhất qua các vòng), không chỉ cách nào ra một bản tốt.",
      "Chỗ khó: C nghe rất hợp lý, vì các thay đổi cùng nhắm một chỗ yếu, lại có đường lui khi hỏng."
    ],
    asks: [
      "Cách lặp nào giúp học được nhiều nhất qua các vòng?",
      "Tức là: sau mỗi vòng, mày phải biết chắc thay đổi nào gây ra khác biệt nào, để giữ cái có tác dụng và bỏ cái không."
    ],
    facts: [
      "Lặp prompt là vòng chẩn đoán → đổi một chỗ → thử lại → giữ cái có tác dụng, cho tới khi đạt tiêu chí.",
      "Đổi nhiều thứ một lúc thì output tốt lên hay tệ đi cũng không biết vì đâu. Một thay đổi có thể sửa chỗ này và làm hỏng chỗ kia, đổi từng thứ mới thấy.",
      "So có và không có thay đổi trên cùng đầu vào. Ghi lại mỗi vòng: đổi gì, output ra sao.",
      "Tạo lại hay gõ lại mà không sửa gì thì điều kiện gây ra output yếu vẫn còn nguyên. Bạn nhận một bản khác, không chắc tốt hơn."
    ],
    opts: [
      { k: "A", gist: "Change one identifiable element per round, record the change and its effect, and only move on to another element once the first is settled.",
        why: [
          "Đúng. Mỗi vòng một biến, nên khác biệt ở output gắn được với đúng thay đổi đó (ý 1, 2).",
          "Ghi lại đổi gì, ra sao (ý 3) biến mỗi vòng thành một bài học giữ được: biết dòng nào trong prompt đang có tác dụng, dòng nào thừa."
        ] },
      { k: "B", gist: "Start from a brand-new prompt every round so earlier wording cannot bias the next try, then pick the best response at the end.",
        why: [
          "Sai: mỗi vòng làm lại từ đầu thì không có gì được giữ lại từ vòng trước. Prompt mới khác prompt cũ ở cả chục chỗ, nên không biết vì sao bản này hơn bản kia (ý 2).",
          "Chọn bản tốt nhất ở cuối là chọn may, giống bấm tạo lại nhiều lần (ý 4). Gặp đầu vào khác, mày không biết phải viết prompt thế nào."
        ] },
      { k: "C", gist: "Make several related changes in one round when they target the same weakness, and undo the whole set if the combined result gets worse.",
        why: [
          "Sai ở giả định: cùng nhắm một chỗ yếu không làm chúng thành một thay đổi. Output tốt lên thì không biết thay đổi nào có tác dụng, cái nào thừa (ý 2).",
          "Hoàn tác cả lô khi hỏng thì có thể vứt luôn một thay đổi tốt đang bị một thay đổi xấu che mất.",
          "Dễ bị cuốn vì nghe vừa nhanh vừa có đường lui. Nhưng đề hỏi học được nhiều nhất, và gộp thay đổi là bỏ đúng điều đó."
        ] },
      { k: "D", gist: "Fix every weakness the response showed in a single revision, then compare the new output with the previous one.",
        why: [
          "Sai: sửa mọi chỗ trong một lần là đổi nhiều thứ nhất có thể trong một vòng (ý 2). So hai bản chỉ biết tổng thể khá hơn hay kém hơn, không biết vì đâu.",
          "Đây là ca chị Mai trong notes: prompt dài gấp ba, output khá hơn, nhưng tuần sau dùng cho chiến dịch khác thì hỏng mà không biết gỡ chỗ nào."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Mỗi vòng đổi một chỗ”: đổi nhiều thứ một lúc thì không biết vì đâu, so trên cùng đầu vào", href: NOTES + "#l-1-3" },
      { label: "Bài 7.1, mục “Vì sao chỉ đổi một thứ, và chạy lại cùng input”: ghi lại mỗi vòng đổi gì, ra sao", href: NOTES + "#l-7-1" }
    ]
  },
  {
    de: 3, n: 26, total: 75, sub: "2.4", subName: "Khi nào cần người duyệt",
    answer: "D",
    ask: "A customer-success manager is deciding whether to escalate a Claude-generated response. Which factor raises the output's impact the most and supports escalating it before it is used externally?",
    scene: [
      "Một quản lý chăm sóc khách hàng (customer success) đang cân nhắc có chuyển một output của Claude lên cho người duyệt hay không.",
      "Bốn phương án là bốn loại output. Ba cái là việc nội bộ, một cái gửi khách trả tiền và có cam kết mức dịch vụ.",
      "Chỗ khó nhỏ: A có chữ “customer call” (cuộc gọi với khách), nghe như dính tới khách. Đọc kỹ thì đó là ghi chú cho riêng mình đọc."
    ],
    asks: [
      "Yếu tố nào làm output hệ trọng nhất, và vì vậy nên chuyển lên duyệt trước khi dùng ra ngoài?",
      "Tức là: áp các tín hiệu nâng mức duyệt (mức hệ trọng, người nhận, rút lại được không, loại nội dung) vào từng phương án, xem cái nào bật nhiều tín hiệu nhất."
    ],
    facts: [
      "Năm tín hiệu nâng mức duyệt: mức hệ trọng, người nhận, rút lại được không, loại nội dung, lĩnh vực được quản lý. Cách nhớ: nháp thoải mái, gửi đi có chọn lọc.",
      "Người nhận là khách hàng, đối tác, cơ quan quản lý thì duyệt kỹ. Người nhận là chính mình, nhóm mình thì duyệt nhẹ.",
      "Cam kết pháp lý là một dạng hệ trọng. Con số, điều khoản là loại nội dung cần duyệt kỹ. Email đã gửi khách thì không rút lại được.",
      "Duyệt theo rủi ro có hai chiều. Bắt bản nháp nội bộ phải qua duyệt kỹ là làm quá tay."
    ],
    opts: [
      { k: "A", gist: "The response is an internal draft that summarizes the associate's own notes from a customer call, for personal reference.",
        why: [
          "Sai: người đọc là chính người viết, bản nháp nội bộ, sai thì tự sửa (ý 2, 4).",
          "Dễ bị cuốn vì có chữ “customer” (khách). Nhưng khách không đọc bản này, nó không rời khỏi tay người viết."
        ] },
      { k: "B", gist: "The response is a casual rewording of an internal team status update.",
        why: [
          "Sai: nội bộ, chỉ đổi câu chữ, sai thì sửa dễ (ý 2, 4). Không bật tín hiệu nào."
        ] },
      { k: "C", gist: "The response is a short internal notice about an upcoming team all-hands meeting.",
        why: [
          "Sai: thông báo nội bộ, rủi ro thấp. Nhầm giờ họp thì gửi đính chính là xong (ý 4)."
        ] },
      { k: "D", gist: "The response is an unedited draft for a paying customer and contains a service-level commitment.",
        why: [
          "Đúng. Bật cùng lúc nhiều tín hiệu: người nhận là khách trả tiền, nội dung là một cam kết mức dịch vụ, và gửi rồi không rút lại được (ý 1, 2, 3).",
          "“Unchanged” (chưa ai sửa) nghĩa là chưa người nào kiểm. Một cam kết sai có thể ràng buộc công ty, nên phải có người đủ thẩm quyền duyệt trước khi gửi."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, mục “Output nào cũng được xem, nhưng sâu tới đâu thì tùy tín hiệu”: năm tín hiệu, nháp thoải mái, gửi đi có chọn lọc", href: NOTES + "#l-2-4" },
      { label: "Bài mở đầu “Khẩu vị chọn đáp án”, luật 2: chi tiết cụ thể như con số, điều khoản là chỗ hay sai", href: NOTES + "#l-0-3" }
    ]
  },
  {
    de: 3, n: 27, total: 75, sub: "4.4", subName: "Đưa Claude vào quy trình đang chạy",
    answer: "A",
    ask: "An operations lead is bringing Claude into a workflow shared by several people. Which integration step should be done first?",
    scene: [
      "Một trưởng nhóm vận hành đưa Claude vào một quy trình nhiều người cùng làm.",
      "Bốn phương án là bốn bước tích hợp: xác định chỗ Claude làm và chỗ chuyển cho người, chạy thử, chỉnh theo kết quả chạy thử, viết tài liệu và hướng dẫn cả nhóm.",
      "Chỗ khó: cả bốn đều là bước đúng. Đề chỉ hỏi bước nào phải đi trước."
    ],
    asks: [
      "Bước tích hợp nào phải làm đầu tiên?",
      "Tức là: bước nào là đầu vào của các bước còn lại. Không có nó thì chạy thử cái gì, chỉnh cái gì, viết tài liệu về cái gì?"
    ],
    facts: [
      "Đưa Claude vào quy trình là quyết theo từng bước, không theo cả quy trình: bước nào Claude làm, bước nào người giữ, bước nào chia ra. Luật chung: giao phần làm, giữ phần quyết.",
      "Human-in-the-loop (có người trong vòng): Claude đưa đề xuất, người có thẩm quyền duyệt trước khi nó thành hành động. Ai trong quy trình cũng phải biết bước nào do Claude làm, chỗ nào người vẫn duyệt.",
      "Chạy thử theo thứ tự: chọn một quy trình và chỉ những bước đã quyết là giao được → viết tiêu chí đạt hay trượt → chạy thử → chỉ mở rộng khi đạt chuẩn.",
      "Tự động hóa nhầm bước thì có thể gây hại ngược."
    ],
    opts: [
      { k: "A", gist: "Work out where Claude adds value and where each handoff to a person takes place.",
        why: [
          "Đúng. Đây là bước quyết theo từng bước: Claude làm phần nào, chỗ nào chuyển cho người duyệt hay quyết (ý 1, 2).",
          "Mọi bước sau đều cần nó: chạy thử phải biết thử những bước nào (ý 3), tài liệu phải ghi ai làm gì. Làm sai bước này thì càng mở rộng càng hỏng (ý 4)."
        ] },
      { k: "B", gist: "Pilot the integrated workflow with a small group on representative work.",
        why: [
          "Bước đúng, nhưng là bước thứ hai. Chạy thử khi chưa quyết Claude làm bước nào thì không biết đang thử cái gì (ý 3).",
          "Chưa rõ chỗ chuyển giao thì trong lúc thử cũng không ai biết mình phải duyệt chỗ nào (ý 2).",
          "Dễ bị cuốn vì “chạy thử nhỏ trước khi mở rộng” là lời khuyên rất đúng. Nhưng chạy thử là để kiểm một thiết kế, mà thiết kế chưa có."
        ] },
      { k: "C", gist: "Adjust the integrated workflow based on what the pilot found.",
        why: [
          "Sai thứ tự: bước này cần kết quả chạy thử, mà chạy thử chưa diễn ra (ý 3)."
        ] },
      { k: "D", gist: "Document the integrated workflow and bring the rest of the team onto it.",
        why: [
          "Sai thứ tự: đây là bước mở rộng, chỉ làm khi chạy thử đã đạt chuẩn (ý 3).",
          "Viết tài liệu và hướng dẫn cả nhóm theo một quy trình chưa thiết kế, chưa thử là đem lỗi nhân ra cho mọi người."
        ] }
    ],
    refs: [
      { label: "Bài 4.4, mục “Quyết theo từng bước, không theo cả quy trình” và “Chạy thử một việc thật trước khi mở rộng”", href: NOTES + "#l-4-4" },
      { label: "Bài 4.1: chia thành từng việc, rồi mới quyết Claude làm phần nào", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 3, n: 28, total: 75, sub: "7.3", subName: "Tối ưu quy trình",
    answer: "BD",
    ask: "A team wants to improve a Claude workflow it runs over and over, and it must finish the diagnostic work before touching the workflow. Which two diagnostic steps belong before any change is made? (Select two.)",
    scene: [
      "Một nhóm muốn tối ưu một quy trình dùng Claude chạy đi chạy lại, kiểu báo cáo tuần hay trả lời khách.",
      "Đề chốt sẵn thứ tự: chẩn đoán xong mới được đổi quy trình.",
      "Chỗ khó: năm phương án đều là việc có ích ở đâu đó trong một đợt tối ưu. Đề chỉ hỏi những việc thuộc pha chẩn đoán, tức là đứng trước lúc đổi."
    ],
    asks: [
      "Hai bước chẩn đoán nào phải xong trước khi đổi quy trình?",
      "Tức là: trước khi đụng vào quy trình, cần biết gì về chính nó?",
      "Soi từng phương án: nó cho mày thông tin về quy trình hiện tại, hay nó là việc làm sau khi đã đổi?"
    ],
    facts: [
      "Đo trước khi đổi: xem việc nào đang ngốn thời gian, hạn mức, rồi mới đổi thói quen hay nâng gói. Đổi trước khi biết chỗ hao là chữa trước khi chẩn đoán.",
      "Sau khi đổi, đo hai thứ: thời gian tiết kiệm (tính cả thời gian sửa) và chất lượng giữ được (tỉ lệ output dùng được, số lỗi người duyệt bắt được). Muốn so thì phải có số của bản cũ.",
      "Tối ưu là bớt lặp, bớt làm lại, bớt công cụ thừa, không bớt chất lượng. Nên phải biết chất lượng hiện tại thì mới giữ được nó.",
      "Nhân rộng cho cả nhóm đi sau cùng: ghi lại các bước đã chạy tốt, thử trên vài ca thật, rồi mới phổ biến và theo dõi tiếp."
    ],
    opts: [
      { k: "A", gist: "Tell senior leadership how much the optimization is expected to save.",
        why: [
          "Sai ở thứ tự: chưa đo gì thì con số tiết kiệm chỉ là đoán (ý 1, 2).",
          "Đây cũng không phải bước chẩn đoán. Nó không cho thêm thông tin nào về chỗ quy trình đang hao."
        ] },
      { k: "B", gist: "Pin down which steps account for most of the time, cost, or quality problems.",
        why: [
          "Đúng: đây là tìm chỗ hao trước khi sửa (ý 1). Biết bước nào ngốn nhất thì sửa đúng bước đó, không sửa lan man.",
          "Nó cũng cho biết bước nào đang giữ chất lượng, để lúc tối ưu không cắt vào đó (ý 3)."
        ] },
      { k: "C", gist: "Roll the revised workflow out to the team and watch for adoption problems.",
        why: [
          "Đây là đổi quy trình, đúng thứ đề bảo phải chờ. Nó là bước cuối của đợt tối ưu (ý 4), không phải bước chẩn đoán.",
          "Dễ bị cuốn vì có chữ “monitor” (theo dõi), nghe như đang đo. Nhưng theo dõi nhóm có chịu dùng không khác với đo quy trình cũ tốn bao nhiêu, và nó diễn ra sau khi đã đổi."
        ] },
      { k: "D", gist: "Record the current workflow's quality, time, and cost over its recent runs.",
        why: [
          "Đúng: đây là số “trước” (ý 1, 2). Không có nó thì sau khi đổi không biết mình tiết kiệm được bao nhiêu, hay có làm chất lượng tụt không.",
          "Đo trên nhiều lần chạy gần đây, không phải một lần, nên số đủ tin để so."
        ] },
      { k: "E", gist: "Write up the revised steps and update the team's standard operating procedures.",
        why: [
          "Ghi lại quy trình đã sửa là việc sau khi đổi và đã thử thấy tốt (ý 4).",
          "Chưa chẩn đoán mà đã viết quy trình chuẩn mới là viết chuẩn cho một thay đổi chưa biết có đúng không."
        ] }
    ],
    refs: [
      { label: "Bài 7.3, mục “Đo trước khi đổi, đo sau khi đổi”: tìm chỗ hao trước, rồi đo thời gian tiết kiệm và chất lượng giữ được", href: NOTES + "#l-7-3" },
      { label: "Bài Nền tảng D7: tìm đúng cần gạt trước khi sửa, sửa sai chỗ chỉ tốn công và hạn mức", href: NOTES + "#l-7-0" }
    ]
  },
  {
    de: 3, n: 29, total: 75, sub: "4.1", subName: "Phân tích use case",
    answer: "C",
    ask: "An account manager has Claude pull requirements out of stakeholder meeting notes. Three of them clash: two stakeholders asked for workflow steps that rule each other out, and a third requirement depends on a result the first two would block. What is the most appropriate next step?",
    scene: [
      "Một quản lý khách hàng nhờ Claude rút yêu cầu từ ghi chép của các stakeholder (bên liên quan).",
      "Ba yêu cầu va nhau. Hai stakeholder đòi hai bước quy trình loại trừ nhau. Yêu cầu thứ ba lại giả định một kết quả mà hai yêu cầu kia chặn mất.",
      "Chỗ khó: phương án nào cũng “xử lý” được mâu thuẫn trên giấy. Khác nhau ở chỗ ai là người quyết bên nào thắng."
    ],
    asks: [
      "Bước nào phù hợp nhất?",
      "Tức là: yêu cầu của các bên mâu thuẫn nhau thì ai giải, còn Claude và người quản lý khách hàng làm phần nào?",
      "Soi từng phương án: ai đang chốt cách giải, người đó có quyền chốt không, và bản yêu cầu còn lần ngược về được nguồn không."
    ],
    facts: [
      "Claude giúp nhiều nhất lúc yêu cầu còn là bản nháp: chỉ ra chỗ mơ hồ, chỗ không kiểm được, chỗ mâu thuẫn, rồi đặt câu hỏi làm rõ. Lúc đó sửa còn rẻ.",
      "Chia vai: Claude đặt câu hỏi, gắn nhãn. Người trả lời câu hỏi cùng stakeholder và ra quyết định cuối. Để Claude tự giải chỗ mơ hồ rồi chốt luôn bản yêu cầu là cách dùng sai.",
      "Giao phần làm, giữ phần quyết. Cắt một yêu cầu hay chấp nhận một đánh đổi là phần quyết: Claude chuẩn bị, người có thẩm quyền quyết.",
      "Đợi làm xong rồi mới suy ngược ra yêu cầu là quá muộn. Phần thiết kế phía sau đã dựng trên những giả định không thể cùng đúng."
    ],
    opts: [
      { k: "A", gist: "List all three clashing requirements as alternatives in the document and leave the choice to the project's decision process later on.",
        why: [
          "Giữ đủ ba yêu cầu thì đúng, nhưng hoãn việc giải là sai (ý 4). Các bước sau sẽ dựng trên những yêu cầu không thể cùng đúng.",
          "Ba yêu cầu cũng không phải ba phương án ngang hàng: yêu cầu thứ ba phụ thuộc kết quả mà hai cái kia chặn. Ghi thành “chọn một trong ba” là tả sai quan hệ giữa chúng.",
          "Dễ bị cuốn vì nghe trung lập, không bỏ ý ai. Nhưng không ai được giao việc quyết, nên mâu thuẫn chỉ bị dời đi."
        ] },
      { k: "B", gist: "Have Claude draft compromise wording for each conflict and send that compromise to the stakeholders as the proposed resolution.",
        why: [
          "Để Claude tự giải chỗ mâu thuẫn rồi đưa ra làm lời giải (ý 2). Câu dung hòa có thể không phải ý của bên nào.",
          "Chọn đánh đổi giữa hai bước loại trừ nhau là phần quyết (ý 3). Claude giúp soạn câu hỏi được, không soạn sẵn câu trả lời thay họ.",
          "Dễ bị cuốn vì stakeholder vẫn được hỏi tới. Nhưng họ nhận một hướng Claude đã chốt, không phải câu hỏi để chính họ quyết."
        ] },
      { k: "C", gist: "Mark the conflicts in the requirements document, record where each side came from, and send them back to the stakeholders who raised them to resolve.",
        why: [
          "Đúng vai (ý 1, 2): Claude và người quản lý khách hàng tìm ra mâu thuẫn, ghi rõ nguồn của từng bên. Người đưa ra yêu cầu là người quyết (ý 3).",
          "Ghi nguồn giúp lần ngược được: ai nói gì, ở ghi chép nào. Stakeholder thấy đúng chỗ va, không phải đọc lại cả xấp ghi chép.",
          "Giải ngay khi yêu cầu còn là nháp, trước khi ai dựng tiếp lên đó (ý 4)."
        ] },
      { k: "D", gist: "Pick the requirement with the strongest business case in the notes, put the conflicting ones aside, and move ahead with the chosen one.",
        why: [
          "Cắt yêu cầu của người khác là phần quyết (ý 3). Người quản lý khách hàng chỉ đang rút yêu cầu từ ghi chép, không phải người có quyền chốt.",
          "Lý lẽ “mạnh nhất” trong ghi chép chỉ là lý lẽ được viết rõ nhất, chưa chắc là ưu tiên thật của dự án. Hai stakeholder bị gạt sẽ phát hiện ra khi đã muộn (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 4.1, mục “Dùng Claude soát yêu cầu khi còn là bản nháp”: Claude đặt câu hỏi, gắn nhãn; người trả lời cùng stakeholder và quyết", href: NOTES + "#l-4-1" },
      { label: "Bài Nền tảng D4, mục “Giao phần làm, giữ phần quyết”: cắt một yêu cầu là phần quyết, Claude chuẩn bị, người quyết", href: NOTES + "#l-4-0" }
    ]
  },
  {
    de: 3, n: 30, total: 75, sub: "4.4", subName: "Đưa Claude vào quy trình đang chạy",
    answer: "B",
    ask: "A workflow analyst is setting up the hand-off from Claude to a human reviewer inside a process that already runs. The reviewer needs to know what to check and what falls within their review. Which hand-off design fits best?",
    scene: [
      "Một quy trình đang chạy có thêm một chỗ chuyển giao: Claude làm xong phần của mình thì chuyển cho một người duyệt.",
      "Đề nói rõ nhu cầu: người duyệt cần biết phải kiểm gì, và cái gì thuộc phạm vi duyệt của họ.",
      "Chỗ khó: các phương án khác nhau ở chỗ ai viết tiêu chí kiểm (không ai, từng người duyệt, Claude, hay chính quy trình), và tiêu chí đó có cố định, có ghi lại không."
    ],
    asks: [
      "Thiết kế chuyển giao nào phù hợp nhất?",
      "Tức là: làm sao để mỗi lần nhận việc từ Claude, người duyệt biết chắc Claude đã làm phần nào và mình phải chặn những lỗi nào trước khi duyệt?"
    ],
    facts: [
      "Giao việc theo bước: với mỗi bước, quyết riêng Claude làm, người giữ, hay chia ra. Điểm duyệt của người là chỗ một người có thẩm quyền xem và quyết trước khi kết quả đi tiếp.",
      "Transparency Diligence (minh bạch về vai trò của AI): người dựa vào quy trình phải biết bước nào giờ do Claude làm và chỗ nào người vẫn duyệt. Đó là điều kiện để người duyệt duyệt cho đúng.",
      "Tiêu chí đạt viết trước, cụ thể tới mức người ngoài nhìn vào chấm được đạt hay không. Mỗi người một thước đo thì kết quả duyệt không so được với nhau.",
      "Claude kiểm Claude không thay được người duyệt. Một lượt Claude thứ hai có cùng kiểu lỗi với lượt thứ nhất."
    ],
    opts: [
      { k: "A", gist: "Let every reviewer decide what to check from their own experience, because reviewers know their domain best.",
        why: [
          "Sai ở chỗ không có tiêu chí chung (ý 3). Người này soát số liệu, người kia chỉ đọc giọng văn, cùng một loại lỗi lúc bị chặn lúc lọt.",
          "Không ghi lại thì cũng không ai biết bước duyệt đã chặn những gì, nên không sửa quy trình được.",
          "Dễ bị cuốn vì tôn trọng chuyên môn của người duyệt. Nhưng chuyên môn là phần thêm vào trên một mức kiểm tối thiểu đã ghi rõ, không thay cho mức đó."
        ] },
      { k: "B", gist: "Spell out what Claude must deliver and what the reviewer has to verify before approving, and write both into the workflow.",
        why: [
          "Đúng: cả hai phía của chỗ chuyển giao đều được viết ra (ý 1, 2). Người duyệt biết Claude đã làm phần nào, và mình phải kiểm gì trước khi duyệt.",
          "Tiêu chí ghi trong quy trình nên mọi người duyệt dùng cùng một thước đo (ý 3), và sau này có chỗ để chỉnh khi thấy lỗi lọt."
        ] },
      { k: "C", gist: "Spell out what Claude must deliver, but leave the reviewer's checks undefined so they can use their judgment freely.",
        why: [
          "Làm được một nửa: phía Claude rõ, phía người duyệt bỏ trống. Mà phía bỏ trống lại đúng là thứ đề nói người duyệt cần (ý 2).",
          "Không ai nói phải kiểm gì thì điểm duyệt không có nội dung rõ ràng (ý 1). Lỗi lọt qua cũng không biết lọt ở khâu nào.",
          "Dễ bị cuốn vì “judgment without constraint” (phán đoán không bị bó) nghe như tin người duyệt. Nhưng không có khung thì phán đoán thành mỗi lần một kiểu (ý 3)."
        ] },
      { k: "D", gist: "Give the reviewer a checklist to complete for every output, with Claude writing that checklist from the content of each output.",
        why: [
          "Có checklist, nhưng Claude là bên đặt tiêu chí kiểm cho chính output của nó (ý 4). Lỗi nào Claude không thấy lúc viết thì cũng dễ vắng mặt trong checklist.",
          "Checklist đổi theo từng output nên không có mức kiểm chung (ý 3). Checklist cố định, do người duyệt và chủ quy trình chốt, mới là thứ dùng được."
        ] }
    ],
    refs: [
      { label: "Bài 4.4, mục “Chạy thử một việc thật trước khi mở rộng”: tiêu chí viết trước, nói rõ bước nào Claude làm, chỗ nào người duyệt", href: NOTES + "#l-4-4" },
      { label: "Bài Nền tảng D4: giao phần làm, giữ phần quyết; định nghĩa điểm duyệt của người", href: NOTES + "#l-4-0" },
      { label: "Bài 2.4, mục “Kiểm bằng model không thay được người duyệt”", href: NOTES + "#l-2-4" }
    ]
  },
  {
    de: 3, n: 31, total: 75, sub: "7.1", subName: "Chẩn đoán output kém",
    answer: "A",
    ask: "You are putting together, for your team, a summary of the usual ways prompts go wrong. Which pattern is most often behind output that is vague or misses the point?",
    scene: [
      "Mày đang tổng hợp cho cả nhóm những kiểu prompt hay hỏng.",
      "Triệu chứng đề nêu: output “vague or off-target” (chung chung, hoặc lệch khỏi cái cần).",
      "Chỗ khó: ba phương án là thói quen tốt, chỉ một phương án tả một prompt thiếu thứ. Ví dụ minh họa:<pre><code>Prompt: “Chính sách nghỉ phép”\nClaude phải tự đoán: tóm tắt, giải thích hay soạn thông báo? Cho ai đọc? Dài bao nhiêu?</code></pre>"
    ],
    asks: [
      "Kiểu prompt nào hay sinh ra output chung chung, lệch mục tiêu nhất?",
      "Tức là: triệu chứng “chung chung” thường bắt nguồn từ chỗ nào trong prompt?"
    ],
    facts: [
      "Prompt yếu hiếm khi yếu vì câu chữ. Nó yếu vì những gì người viết biết mà không viết ra. Trước khi gửi, soát năm thứ: việc và độ sâu, người đọc và mục tiêu, định dạng, ràng buộc, nguồn.",
      "Prompt bỏ trống chỗ nào thì Claude lấp chỗ đó bằng thứ nghe hợp lý, kiểu bài nào cùng loại cũng có. Kết quả trơn tru mà không trúng việc.",
      "Bảng triệu chứng của D7: output chung chung, mỏng, công ty nào cũng dùng được thì nguyên nhân hay gặp là prompt thiếu bối cảnh, người đọc, tiêu chí. Kiểm nhanh bằng phép thử đồng nghiệp: người không biết gì về việc mà phải đoán thì Claude cũng đoán.",
      "Ví dụ mẫu và ràng buộc tường minh (độ dài, giọng) là cách sửa: chúng bớt chỗ Claude phải đoán."
    ],
    opts: [
      { k: "A", gist: "A prompt that names a subject but gives no task, no audience, and no required output structure.",
        why: [
          "Đúng: chỉ có chủ đề thì Claude phải tự chọn làm gì, cho ai, theo hình gì (ý 1). Cả ba quyết định đều bị đoán.",
          "Đoán thì ra bản “trung bình” của chủ đề đó (ý 2). Đây đúng là output chung chung, công ty nào cũng dùng được (ý 3)."
        ] },
      { k: "B", gist: "A prompt that states the role, the task, the audience, and the output format outright.",
        why: [
          "Đây là prompt đã điền đủ những chỗ hay bị bỏ trống (ý 1). Nó là cách sửa, không phải kiểu hỏng."
        ] },
      { k: "C", gist: "A prompt that includes a typical example of the output wanted.",
        why: [
          "Một ví dụ cho thấy giọng, độ dài, cấu trúc nhanh hơn ba đoạn tả (ý 4). Nó làm output trúng hơn, không mơ hồ hơn.",
          "Rủi ro của ví dụ là Claude bám quá sát chi tiết của nó. Đó là chép mẫu, ngược hẳn với chung chung."
        ] },
      { k: "D", gist: "A prompt that sets clear limits on length and tone.",
        why: [
          "Ràng buộc viết thẳng ra thì Claude khỏi phải đoán (ý 4). Không viết ra thì Claude mới không biết.",
          "Nó không làm output lệch mục tiêu."
        ] }
    ],
    refs: [
      { label: "Bài 1.1, mục “Viết ra những gì đang nằm trong đầu bạn”: năm thứ phải soát trước khi gửi", href: NOTES + "#l-1-1" },
      { label: "Bài 7.1, bảng “Từ triệu chứng tới nguyên nhân”: chung chung, mỏng thì nghi prompt thiếu bối cảnh, người đọc, tiêu chí; phép thử đồng nghiệp", href: NOTES + "#l-7-1" }
    ]
  },
  {
    de: 3, n: 32, total: 75, sub: "5.3", subName: "Viết chỉ dẫn cấp hệ thống",
    answer: "A",
    ask: "A learning specialist is setting up a Project for designing courses. The organization has its own instructional-design standard and a preferred layout for lesson outlines. Which set of custom instructions supports this work best?",
    scene: [
      "Một chuyên viên đào tạo dựng Project cho việc thiết kế khóa học.",
      "Tổ chức có sẵn hai thứ cố định: một chuẩn thiết kế bài giảng nội bộ, và một cấu trúc dàn ý bài học ưa dùng.",
      "Chỗ khó: bốn phương án là bốn cách chia ba thứ (vai, chuẩn, cấu trúc) giữa instructions của Project và từng tin nhắn. Mỗi phương án sai bỏ đi, hoặc đẩy ra ngoài, ít nhất một thứ."
    ],
    asks: [
      "Bộ instructions nào hợp nhất cho việc này?",
      "Tức là: trong vai, chuẩn và cấu trúc, cái nào lặp lại ở mọi chat và vì vậy phải nằm sẵn trong instructions?"
    ],
    facts: [
      "Project instructions áp cho mọi chat trong Project. Thứ lặp lại ở mọi chat (vai, người đọc, định dạng chuẩn, ràng buộc lâu dài) để trong instructions. Thứ riêng một lần (việc hôm nay, dữ liệu của yêu cầu này) để trong tin nhắn.",
      "Bộ khung bảy phần của chỉ dẫn cấp hệ thống: vai, việc và phạm vi, người đọc, định dạng, nguồn, khi không chắc, ưu tiên.",
      "Claude không biết quy trình, chuẩn nội bộ của tổ chức. Muốn bám chuẩn thì đưa tài liệu chuẩn vào knowledge, kèm một dòng instructions nói phải theo nó.",
      "Đẩy thứ lặp lại sang từng tin nhắn thì ai quên dặn là output lệch, và mỗi người dặn một kiểu."
    ],
    opts: [
      { k: "A", gist: "State Claude's role as a course designer, require it to follow the organization's instructional-design standard, and lay down the preferred lesson-outline structure.",
        why: [
          "Đủ ba thứ lặp lại ở mọi chat, đặt đúng chỗ (ý 1, 2): vai cho góc nhìn, chuẩn cho cách làm, cấu trúc cho hình dạng output.",
          "Tin nhắn từng chat chỉ còn phải nói phần riêng của bài đó: chủ đề, mục tiêu, người học.",
          "Bộ chuẩn dài thì đưa file chuẩn vào knowledge, để dòng instructions trỏ tới nó (ý 3)."
        ] },
      { k: "B", gist: "State the course-designer role and require the instructional-design standard, but let Claude choose the outline structure lesson by lesson.",
        why: [
          "Bỏ ra ngoài một thứ tổ chức đã chốt sẵn: cấu trúc dàn ý (ý 1). Để Claude chọn theo từng bài thì mỗi dàn ý một kiểu.",
          "Dễ bị cuốn vì “tùy chủ đề” nghe linh hoạt. Nhưng đề nói tổ chức đã có cấu trúc ưa dùng, nên không có gì để Claude chọn."
        ] },
      { k: "C", gist: "Give only the preferred outline structure, on the grounds that the structure already implies the standard and naming a role adds nothing.",
        why: [
          "Sai ở giả định: cấu trúc chỉ là hình dạng output, không chứa cách làm của chuẩn (ý 3). Claude điền đúng ô mà nội dung vẫn không theo chuẩn.",
          "Bỏ luôn vai, phần đầu tiên của bộ khung (ý 2). Không có vai thì Claude viết theo góc nhìn chung chung, không theo góc nhìn người thiết kế khóa học."
        ] },
      { k: "D", gist: "State only the course-designer role, and leave the standard and the outline structure to each chat's prompt, because lessons vary so much.",
        why: [
          "Đẩy hai thứ lặp lại ở mọi chat sang từng tin nhắn (ý 1, 4). Mất đúng cái lợi của Project: viết một lần, mọi chat theo.",
          "Bài học khác nhau ở chủ đề, mục tiêu. Chuẩn và cấu trúc thì vẫn là một. Chỉ phần khác nhau mới để trong tin nhắn."
        ] }
    ],
    refs: [
      { label: "Bài 5.3, bảng “Cái gì đáng thành chỉ dẫn, cái gì để trong tin nhắn” và bộ khung bảy phần", href: NOTES + "#l-5-3" },
      { label: "Bài 5.1, bảng “Instructions hay knowledge”: tài liệu chuẩn vào knowledge, kèm một dòng instructions nói phải theo nó", href: NOTES + "#l-5-1" }
    ]
  },
  {
    de: 3, n: 33, total: 75, sub: "2.5", subName: "Sửa output cho đúng người đọc",
    answer: "A",
    ask: "A project manager is turning a Claude draft into a finished board memo. Board members read it ahead of the meeting and expect it to be easy to scan, factually checked, and in line with the organization's standard terminology. Which set of refinements fits best?",
    scene: [
      "Một quản lý dự án chỉnh bản nháp Claude viết thành memo gửi hội đồng quản trị.",
      "Hội đồng đặt sẵn ba đòi hỏi: “scannable” (đọc lướt được), “factually verified” (sự thật đã kiểm), và đúng thuật ngữ chuẩn của tổ chức.",
      "Chỗ khó: mỗi phương án sai làm được vài việc đúng, nhưng thiếu một trong ba đòi hỏi, hoặc làm ngược một đòi hỏi."
    ],
    asks: [
      "Bộ chỉnh sửa nào phù hợp nhất?",
      "Tức là: phương án nào đáp đủ cả ba đòi hỏi của người đọc, mà không làm hỏng cái nào?",
      "Soi từng phương án: gạch ba đòi hỏi ra, xem phương án bỏ sót hay làm ngược cái nào."
    ],
    facts: [
      "Fit (độ hợp người đọc): output có đúng thứ người đọc cần, ở đúng mức họ hiểu, theo đúng thứ tự họ quan tâm không. Tiêu chí lấy từ người đọc, từ điều họ đã nói là ưu tiên.",
      "Độ chính xác là một bước kiểm riêng, bắt buộc. Kiểm thật là so với nguồn bên ngoài: dữ liệu gốc, văn bản gốc.",
      "Nhờ Claude tự kiểm vẫn là Claude chấm Claude. Bản nháp làm từ dữ liệu gốc chưa có nghĩa là từng con số khớp dữ liệu gốc.",
      "Sửa hình thức (tiêu đề, câu chữ, thuật ngữ) không sửa được nội dung. Kiểm sự thật cũng không làm memo dễ đọc hơn. Hai việc khác nhau, phải làm cả hai."
    ],
    opts: [
      { k: "A", gist: "Use consistent headings, tighten the wording so executives can scan it, match terminology to the organization's standards, and check every fact against the source data.",
        why: [
          "Đáp đủ ba đòi hỏi (ý 1): tiêu đề nhất quán và câu gọn cho đọc lướt, thuật ngữ theo chuẩn, từng sự thật kiểm với dữ liệu gốc (ý 2).",
          "Làm cả phần hình thức lẫn phần sự thật, không để cái này thay cái kia (ý 4)."
        ] },
      { k: "B", gist: "Use consistent headings, expand each section so the board has the full context, and match terminology to the organization's standards.",
        why: [
          "Làm ngược đòi hỏi đọc lướt: mở rộng mọi mục làm memo dài ra, việc cần quyết bị chôn sâu hơn (ý 1).",
          "Bỏ hẳn bước kiểm sự thật (ý 2), trong khi hội đồng đòi rõ “factually verified” (sự thật đã kiểm).",
          "Dễ bị cuốn vì “đủ bối cảnh” nghe chu đáo. Nhưng hội đồng đọc trước buổi họp, cần thấy nhanh điều quan trọng, không cần đọc nhiều hơn."
        ] },
      { k: "C", gist: "Tighten the wording for scanning and check every fact against the source data, but leave headings and terminology as drafted to keep the draft's voice.",
        why: [
          "Thiếu đòi hỏi thứ ba: thuật ngữ vẫn như Claude viết, không theo chuẩn của tổ chức (ý 1).",
          "Giữ giọng của bản nháp không phải mục tiêu của người đọc. Bản nháp là của Claude, người đọc là hội đồng."
        ] },
      { k: "D", gist: "Use consistent headings and match terminology to the organization's standards, and trust Claude's own fact-checking because the draft was built from the source data.",
        why: [
          "Giao bước kiểm sự thật cho chính Claude (ý 3). Viết từ dữ liệu gốc không bảo đảm không đọc sai, không bịa con số.",
          "Phần còn lại chỉ là sửa hình thức (ý 4). Memo đẹp, đúng thuật ngữ mà sai số liệu thì vẫn sai trước hội đồng.",
          "Dễ bị cuốn vì đề cho chi tiết “generated from the source data” (làm từ dữ liệu gốc), nghe như đã có căn cứ. Nhưng có nguồn là kiểm được, chưa phải đã kiểm."
        ] }
    ],
    refs: [
      { label: "Bài 2.5, mục “So bản nháp bằng tiêu chí viết trước”: tiêu chí lấy từ người đọc; độ chính xác là bước kiểm riêng, bắt buộc", href: NOTES + "#l-2-5" },
      { label: "Bài mở đầu “Khẩu vị chọn đáp án”, luật 1 và 3: Claude tự kiểm không phải bằng chứng; sửa hình thức không sửa được nội dung", href: NOTES + "#l-0-3" }
    ]
  },
  {
    de: 3, n: 34, total: 75, sub: "6.4", subName: "Đạo đức khi dùng AI",
    answer: "B",
    ask: "A Claude associate is checking customer-segment descriptions that Claude drafted for an internal marketing brief. One of them makes a sweeping claim about how a demographic group buys, and the claim does not hold for individual customers in that segment. What is the most appropriate response?",
    scene: [
      "Claude soạn mô tả các phân khúc khách hàng cho một bản brief marketing dùng nội bộ.",
      "Một mô tả gán cho cả một nhóm nhân khẩu học (tuổi, giới, vùng…) một kiểu mua hàng. Khách cụ thể trong phân khúc thì không như vậy.",
      "Chỗ khó: các phương án sai đều có lý do nghe ổn: “chỉ dùng nội bộ”, “bỏ hết cho an toàn”, “thêm dòng lưu ý”. Ví dụ minh họa:<pre><code>Bản nháp: “Khách trên 55 tuổi ngại mua online.”\nDữ liệu thật: nhiều đơn online của phân khúc này đến từ khách trên 55.</code></pre>"
    ],
    asks: [
      "Cách xử lý nào phù hợp nhất?",
      "Tức là: một câu khái quát theo khuôn mẫu đã lọt vào bản nháp, sửa thế nào cho đúng mà bản brief vẫn dùng được?",
      "Soi từng phương án: câu khuôn mẫu còn nằm đó không, và có bỏ luôn phần còn dùng được không."
    ],
    facts: [
      "Bias (thiên lệch): output nghiêng về một nhóm người theo khuôn mẫu. Model học từ dữ liệu của con người nên có thể lặp lại khuôn mẫu, ví dụ chân dung khách hàng theo định kiến.",
      "Phần đạo đức là hỏi trước: output này ảnh hưởng tới ai? Có dùng tới tuổi, giới tính, dân tộc không, và nếu có thì vì sao cần?",
      "Người dùng output chịu trách nhiệm về nó. Một câu miễn trừ kiểu “có thể không đúng với mọi người” không chuyển trách nhiệm đi đâu, và không làm câu sai thành đúng.",
      "Đáp án né vấn đề là sai: bỏ hẳn việc khi đã có cách làm an toàn. Cách đúng thường là bước sửa vừa đủ, rồi kiểm với nguồn bên ngoài."
    ],
    opts: [
      { k: "A", gist: "Leave the description unchanged, since an internal brief carries less risk than publishing demographic generalizations externally.",
        why: [
          "Sai ở giả định: nội bộ thì ít hại. Bản brief nội bộ vẫn quyết nhắm ai, bỏ ai, chi tiền vào đâu (ý 2). Khách bị gạt vì khuôn mẫu là thiệt hại thật.",
          "Câu khuôn mẫu vẫn nằm nguyên, người dùng brief sẽ coi nó là sự thật về khách (ý 3).",
          "Dễ bị cuốn vì “internal use” (dùng nội bộ) nghe như đã khoanh vùng rủi ro. Nhưng rủi ro nằm ở quyết định dựa trên brief, không ở chỗ ai đọc được nó."
        ] },
      { k: "B", gist: "Rewrite the description around observed customer behaviour instead of claims about people, and check the rewrite against real customer data.",
        why: [
          "Đúng: bỏ chỗ khuôn mẫu, giữ phân khúc (ý 1, 4). Mô tả dựa trên hành vi đã thấy: mua bao lâu một lần, qua kênh nào, mua gì.",
          "Kiểm bản mới với dữ liệu khách hàng thật, tức là kiểm với nguồn bên ngoài, không tin câu viết mới chỉ vì nó nghe trung tính (ý 4)."
        ] },
      { k: "C", gist: "Drop the whole segment description from the brief, since any segmentation involving demographics is likely to cause the same problem.",
        why: [
          "Bỏ cả phần việc khi có cách sửa an toàn (ý 4). Lỗi nằm ở một câu khái quát, không nằm ở việc phân khúc.",
          "Phân khúc dựa trên dữ liệu và tiêu chí liên quan tới việc mua vẫn làm được (ý 2). Bỏ hết là mất phần brief cần mà không sửa được thói quen nào."
        ] },
      { k: "D", gist: "Add a note saying the generalization may not apply to everyone in the segment, and keep the description itself as it is.",
        why: [
          "Dòng lưu ý không sửa câu sai, cũng không chuyển trách nhiệm (ý 3). Người đọc vẫn dùng câu khuôn mẫu, chỉ có thêm một dòng nhỏ để bỏ qua.",
          "Dễ bị cuốn vì nghe minh bạch, có trách nhiệm. Nhưng đã biết câu đó không đúng mà vẫn giữ là cố ý để lại thiên lệch."
        ] }
    ],
    refs: [
      { label: "Bài 6.4, mục “Bias và công bằng” và “Bạn gửi thì bạn chịu”: hỏi output ảnh hưởng tới ai; câu miễn trừ không chuyển được trách nhiệm", href: NOTES + "#l-6-4" },
      { label: "Bài 2.2, mục “Bias: thường là thiếu hoặc lệch, không phải câu sai”: mặc định lệch và cách soi", href: NOTES + "#l-2-2" },
      { label: "Bài mở đầu “Khẩu vị chọn đáp án”, luật 5 và 7: không bỏ việc khi có cách làm an toàn", href: NOTES + "#l-0-3" }
    ]
  },
  {
    de: 3, n: 35, total: 75, sub: "1.2", subName: "Chia việc lớn thành chuỗi bước",
    answer: "A",
    ask: "You are a procurement associate breaking a vendor-evaluation task into parts. Which order of dependencies is sound?",
    scene: [
      "Một chuyên viên mua hàng chia việc đánh giá nhà cung cấp thành các bước.",
      "Có ba loại bước: đặt tiêu chí đánh giá, thu dữ liệu về nhà cung cấp, chấm điểm và xếp hạng.",
      "Chỗ khó: đề không kể gì thêm. Câu này kiểm đúng một ý: bước nào cần kết quả của bước nào."
    ],
    asks: [
      "Thứ tự phụ thuộc nào hợp lý?",
      "Tức là: mỗi bước có đủ đầu vào lúc nó chạy không?"
    ],
    facts: [
      "Phần phụ thuộc cần kết quả của phần trước nên phải làm sau. Chấm điểm cần tiêu chí và dữ liệu. Thu dữ liệu cho đều tay thì cần biết thu theo tiêu chí nào.",
      "Tiêu chí viết trước khi thấy kết quả. Viết sau thì nó chỉ mô tả lại cái vừa nhận, tức là chọn trước rồi mới tìm lý do.",
      "Claude không được đưa thông tin nào thì lấp chỗ trống bằng thứ nghe hợp lý. Output trơn tru mà không dựa trên gì."
    ],
    opts: [
      { k: "A", gist: "Set the evaluation criteria first, collect vendor data against them, then score and rank the vendors.",
        why: [
          "Đúng: mỗi bước nhận đủ đầu vào từ bước trước (ý 1). Tiêu chí → dữ liệu thu theo tiêu chí → điểm và thứ hạng.",
          "Tiêu chí có trước khi thấy nhà cung cấp nào điểm cao (ý 2), nên thứ hạng bảo vệ được: ai hỏi vì sao, chỉ ra được tiêu chí và dữ liệu."
        ] },
      { k: "B", gist: "Skip criteria entirely and have Claude recommend a vendor with no inputs at all.",
        why: [
          "Không tiêu chí, không dữ liệu, Claude chỉ còn cách viết ra một khuyến nghị nghe hợp lý (ý 3).",
          "Không ai kiểm được khuyến nghị đó dựa vào đâu."
        ] },
      { k: "C", gist: "Score the vendors first and settle the criteria afterwards.",
        why: [
          "Chấm điểm khi chưa có thước đo (ý 1).",
          "Tiêu chí đặt sau sẽ bị kéo cho khớp điểm đã chấm (ý 2). Thứ hạng thành ra là ý thích, có thêm lý do khoác vào.",
          "Dễ bị cuốn vì có đủ cả hai bước, chỉ đảo thứ tự. Nhưng chính thứ tự mới quyết đánh giá có công bằng không."
        ] },
      { k: "D", gist: "Rank the vendors before any data has been gathered.",
        why: [
          "Xếp hạng khi chưa có gì để so (ý 1). Thứ hạng không dựa vào đâu.",
          "Dữ liệu thu về sau chỉ còn để biện minh cho thứ hạng đã có."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, khái niệm “Phần độc lập, phần phụ thuộc” và mục “Một chuỗi trong chat, từng bước”: phần cần kết quả của phần trước thì làm sau", href: NOTES + "#l-1-2" },
      { label: "Bài 4.1, mục “Viết tiêu chí thành công trước khi giao”: tiêu chí viết sau chỉ mô tả lại cái vừa nhận", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 3, n: 36, total: 75, sub: "5.3", subName: "Viết chỉ dẫn cấp hệ thống",
    answer: "C",
    ask: "You are drafting system-level instructions for a Project that handles recurring writing work. Which step should come first?",
    scene: [
      "Mày viết chỉ dẫn cấp hệ thống (system-level instructions) cho một Project phục vụ việc viết lặp lại.",
      "Bốn phương án là bốn bước trong vòng đời một bản instructions: định nghĩa, thử, sửa, phổ biến.",
      "Chỗ khó: thử và sửa nghe rất đúng tinh thần “kiểm trước khi dùng”. Nhưng đề hỏi “first” (trước tiên)."
    ],
    asks: [
      "Bước nào làm đầu tiên khi viết system-level instructions?",
      "Tức là: trong chuỗi định nghĩa → viết → thử → sửa → phổ biến, bước nào không cần gì từ bước khác?"
    ],
    facts: [
      "System-level instructions: chỉ dẫn đặt một lần, áp cho mọi chat trong một phạm vi. Trong app là project instructions, Instructions for Claude, organization instructions.",
      "Bộ khung bảy phần bắt đầu bằng vai và việc, phạm vi: Claude là ai ở đây, làm gì, không làm gì. Scope (phạm vi) chính là ranh giới đó.",
      "Thử trước khi giao: lưu bản instructions, mở chat mới, hỏi một loạt câu lấy từ việc thật, so với câu trả lời mong đợi viết sẵn. Sai ở đâu sửa đúng dòng đó, chạy lại cả loạt, rồi mới giao cho mọi người.",
      "Phần phụ thuộc làm sau: thử cần có bản nháp, sửa cần kết quả thử, phổ biến cần bản đã sửa."
    ],
    opts: [
      { k: "A", gist: "Revise the draft instructions based on the gaps that validation runs revealed.",
        why: [
          "Sửa cần có kết quả thử, mà thử cần có bản nháp (ý 4). Bước này đứng thứ tư trong chuỗi.",
          "Chưa có mục đích và phạm vi thì cũng không biết “lỗ hổng” là hổng so với cái gì."
        ] },
      { k: "B", gist: "Check the draft instructions against representative requests for the Project.",
        why: [
          "Thử cần một bản nháp, và cần câu trả lời mong đợi để so (ý 3). Cả hai đều dựa vào việc đã biết Project để làm gì, phạm vi tới đâu.",
          "Dễ bị cuốn vì thử bằng câu hỏi thật đúng là bước quan trọng. Nhưng nó là bước kiểm, đứng sau bước định nghĩa và bước viết."
        ] },
      { k: "C", gist: "Define what the Project is for and the boundaries the instructions have to stay within.",
        why: [
          "Đúng: đây là bước không phụ thuộc bước nào (ý 4). Mọi phần sau của bộ khung dựa vào nó: vai, người đọc, định dạng, khi nào phải nói không chắc (ý 2).",
          "Có mục đích và phạm vi rồi mới chọn được câu hỏi thử và câu trả lời mong đợi (ý 3)."
        ] },
      { k: "D", gist: "Share the finished instructions with the Project's collaborators.",
        why: [
          "Phổ biến là bước cuối, sau khi đã thử và sửa (ý 3). Giao bản chưa thử là để mọi chat của mọi người gánh lỗi."
        ] }
    ],
    refs: [
      { label: "Bài 5.3, bộ khung bảy phần và mục “Thử bằng câu hỏi thật trước khi giao cho mọi người”: định vai, phạm vi trước, thử rồi mới giao", href: NOTES + "#l-5-3" },
      { label: "Bài 1.2, khái niệm “Phần độc lập, phần phụ thuộc”: phần cần kết quả của phần trước thì làm sau", href: NOTES + "#l-1-2" }
    ]
  },
  {
    de: 3, n: 37, total: 75, sub: "3.2", subName: "Haiku, Sonnet, Opus khác nhau ở đâu",
    answer: "B",
    ask: "A knowledge worker is walking a colleague through how cost, speed and quality trade off across the Claude models. Which general statement describes that trade-off correctly?",
    scene: [
      "Một nhân viên văn phòng giải thích cho đồng nghiệp chuyện đánh đổi chi phí, tốc độ, chất lượng giữa các model Claude.",
      "Đề hỏi một câu khái quát (generalization), không hỏi chọn model cho một việc cụ thể.",
      "Chỗ khó: mỗi phương án tự gắn một lý do nghe có lý, như “suy luận hiệu quả hơn” hay “phải chạy nhiều lượt”. Phải soi lý do đó có đúng không, và chữ “always” (luôn luôn) có quá tay không."
    ],
    asks: [
      "Câu khái quát nào mô tả đúng sự đánh đổi giữa các model?",
      "Tức là: đặt đúng tầng mạnh và tầng nhẹ lên trục năng lực, tốc độ, mức tốn.",
      "Soi từng phương án: nó xếp tầng mạnh, tầng nhẹ ở đâu trên trục tốc độ và mức tốn, và có biến một ca riêng thành quy luật chung không."
    ],
    facts: [
      "Haiku, Sonnet, Opus là ba cỡ của cùng một họ model, nằm trên cùng một trục: lên tầng thì lập luận sâu hơn nhưng chậm hơn, tốn hơn. Xuống tầng thì nhanh hơn, nhẹ hơn.",
      "Haiku nhanh nhất, nhẹ hạn mức nhất. Opus chậm hơn hai tầng kia, và với cùng một lượng việc thì trừ hạn mức nhanh hơn, vì nó suy nghĩ nhiều hơn. Giá API cũng theo trục đó: mỗi token Opus đắt gấp đôi Sonnet, Haiku rẻ hơn nhiều lần.",
      "Chi phí cho một việc xong (tính cả lần chạy lại, thời gian sửa tay) khác giá mỗi lượt. Ở việc khó, tầng nhẹ phải chạy lại nhiều lần thì chưa chắc rẻ. Còn ở việc đơn giản, ba tầng cho kết quả gần như nhau ngay lượt đầu."
    ],
    opts: [
      { k: "A", gist: "Stronger models usually use up less of the usage limit, since they reason more efficiently, although they respond more slowly than lighter ones.",
        why: [
          "Sai ở giả định: tầng mạnh tiêu ít hạn mức hơn. Ngược lại, cùng một lượng việc thì tầng nặng trừ hạn mức nhanh hơn (ý 2).",
          "Nửa sau “run more slowly” (chạy chậm hơn) thì đúng. Một nửa đúng làm cả câu nghe đáng tin.",
          "Dễ bị cuốn vì có lúc tầng mạnh làm xong một việc khó với ít lượt hơn, nên chi phí cho việc xong thấp hơn (ý 3). Nhưng đó là ca riêng ở việc khó, không phải quy luật chung mà đề hỏi."
        ] },
      { k: "B", gist: "Stronger models usually use more resources and respond more slowly, whereas lighter models tend to be quicker and cheaper.",
        why: [
          "Đúng trục đánh đổi (ý 1, 2): lên tầng thì tốn hơn, chậm hơn; xuống tầng thì nhanh hơn, rẻ hơn.",
          "Chữ “generally” (nói chung) và “usually” (thường) giữ đúng mức của một câu khái quát. Nó chừa chỗ cho ca riêng ở ý 3, nên vẫn đúng khi có ngoại lệ.",
          "Phần chất lượng nằm sẵn trong chữ “more capable” (mạnh hơn): cái đổi lại cho việc tốn hơn, chậm hơn là lập luận sâu hơn."
        ] },
      { k: "C", gist: "Lighter models use more resources per request than stronger ones, because they always need several passes to reach the stronger model's quality.",
        why: [
          "Sai ở chữ “always” (luôn luôn). Việc đơn giản như phân loại, tóm tắt email thì ba tầng cho kết quả gần như nhau, một lượt là xong (ý 3).",
          "Còn tính trên từng yêu cầu thì tầng nhẹ rẻ hơn (ý 2). Câu này đảo ngược cả trục."
        ] },
      { k: "D", gist: "Capability has nothing to do with speed or resource use; Haiku, Sonnet and Opus differ only in how deeply they reason.",
        why: [
          "Sai ở chữ “alone” (chỉ riêng). Ba tầng khác nhau ở cả tốc độ và mức tốn, không riêng độ sâu (ý 1).",
          "Haiku nhanh nhất, Opus chậm hơn hai tầng kia (ý 2). Tin câu này thì sẽ chạy việc dễ, số lượng lớn trên Opus mà không hiểu vì sao hạn mức cạn sớm."
        ] }
    ],
    refs: [
      { label: "Bài 3.2, bảng “Ba tầng của cùng một họ model”: càng lên cao càng sâu, càng chậm, càng tốn", href: NOTES + "#l-3-2" },
      { label: "Bài 3.3, mục “Thử trên việc thật trước khi đổi tầng”: so chi phí cho một việc xong, không so giá mỗi token", href: NOTES + "#l-3-3" }
    ]
  },
  {
    de: 3, n: 38, total: 75, sub: "4.5", subName: "Nói với stakeholder về giá trị và giới hạn",
    answer: "A",
    ask: "A senior sales manager is explaining Claude's part in a project to an executive sponsor with no technical background, who will decide whether to keep funding it on the strength of this presentation. Which framing balances value and limitations best?",
    scene: [
      "Một quản lý kinh doanh cấp cao trình bày vai trò của Claude trong một dự án cho nhà tài trợ dự án (executive sponsor), người không rành kỹ thuật.",
      "Người nghe sẽ dựa vào bài trình bày để quyết có rót tiền tiếp hay không.",
      "Chỗ khó: cả bốn phương án đều nói tới giá trị hoặc giới hạn. Khác nhau ở thứ tự, liều lượng, và có nối với điều người tài trợ quan tâm không."
    ],
    asks: [
      "Cách trình bày nào cân được giá trị và giới hạn tốt nhất?",
      "Tức là: cho người tài trợ đủ thông tin thật để quyết, cả cái Claude làm tốt lẫn cái người vẫn phải giữ, nói bằng ngôn ngữ của kết quả dự án.",
      "Soi từng phương án: có nói giá trị không, có nói giới hạn kèm cách bù không, có nối với kết quả người tài trợ cần không, có giấu gì tới sau buổi quyết không."
    ],
    facts: [
      "Bán cho đúng: Claude mang tới tốc độ và quy mô, người mang tới phán đoán và giám sát. Chỉ kể điểm mạnh là dọn sẵn chỗ cho thất vọng.",
      "Nói giới hạn theo kiểu “chỗ này Claude hụt, nên ta bù bằng…”, thay cho “AI không đáng tin”. Hứa biện pháp như người duyệt, không hứa hoàn hảo.",
      "Viết cho đúng người đọc. Người tài trợ quyết ngân sách, nên cần biết dự án được gì, rủi ro gì, ai kiểm soát. Họ không cần biết model chạy ra sao.",
      "Lãnh đạo chỉ được xem phần đẹp thì coi trường hợp tốt nhất là bình thường, rồi duyệt mở rộng và cắt luôn giờ người duyệt. Giới hạn và chỗ người vẫn kiểm là một phần của chính quyết định đầu tư."
    ],
    opts: [
      { k: "A", gist: "Explain what Claude is good at, name the limitations the team will cover through human review, and link both to the project results the sponsor cares about.",
        why: [
          "Đủ cả hai vế: giá trị thật và giới hạn thật, mỗi giới hạn có cách bù là người duyệt (ý 1, 2).",
          "Nối với “project outcomes the sponsor cares about” (kết quả dự án mà người tài trợ quan tâm), nên người không rành kỹ thuật vẫn dùng được để quyết (ý 3).",
          "Người tài trợ nghe đủ mọi thứ cần biết ngay trong buổi quyết (ý 4)."
        ] },
      { k: "B", gist: "Open with the limitations to manage expectations, then show how the team gets around each one to reach the project results in spite of them.",
        why: [
          "Có nhắc giới hạn và cách bù, nhưng cả bài xoay quanh giới hạn. Claude làm tốt cái gì, đem lại gì cho dự án thì không ai nói (ý 1).",
          "Chữ “despite them” (bất chấp chúng) biến Claude thành vấn đề phải lách, không phải thứ đáng đầu tư. Người tài trợ khó thấy lý do để rót tiền tiếp.",
          "Dễ bị cuốn vì nói giới hạn trước nghe thành thật, cẩn trọng. Nhưng đề đòi cân giá trị và giới hạn, B nặng hẳn về một bên."
        ] },
      { k: "C", gist: "Describe Claude's capabilities in technical language so the sponsor understands the model, and leave the sponsor to work out the value and limitations alone.",
        why: [
          "Sai người đọc: người tài trợ không rành kỹ thuật (ý 3). Thuật ngữ về model không cho họ biết dự án được gì.",
          "Để người nghe “draw their own conclusions” (tự rút kết luận) là đẩy việc của người trình bày sang cho họ. Giới hạn nào quan trọng, ai kiểm soát, họ không tự suy ra được."
        ] },
      { k: "D", gist: "Explain Claude's strengths and connect them to project results, but push the limitations to a later conversation so the approval meeting stays focused.",
        why: [
          "Chỉ có giá trị. Giới hạn bị dời tới sau buổi duyệt, tức là người tài trợ quyết trên một bức tranh thiếu (ý 4).",
          "Khi lỗi đầu tiên lọt qua, người tài trợ biết mình đã không được báo trước. Mất lòng tin vào cả dự án, kể cả phần giá trị có thật (ý 1).",
          "Dễ bị cuốn vì “keep the approval discussion focused” (giữ buổi duyệt tập trung) nghe gọn. Nhưng giới hạn và cách kiểm soát nằm trong chính điều đang được duyệt."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Bán cho đúng” và “Hứa biện pháp, không hứa hoàn hảo”: nói cả giá trị lẫn chỗ người vẫn kiểm", href: NOTES + "#l-4-5" },
      { label: "Bài 2.5, mục “Một nội dung, nhiều người đọc”: viết cho đúng người sẽ dùng nội dung đó", href: NOTES + "#l-2-5" }
    ]
  },
  {
    de: 3, n: 39, total: 75, sub: "3.1", subName: "Chọn tính năng: chat, Project, Research, artifact",
    answer: "C",
    ask: "As a product manager, you want Claude to build an interactive prototype of a small landing-page mockup that the team will keep refining and pass around. Which Claude feature fits this output best?",
    scene: [
      "Một quản lý sản phẩm (product manager) nhờ Claude dựng bản mẫu có tương tác (interactive prototype) cho một trang đích (landing page) nhỏ.",
      "Hai chi tiết quyết định: cả nhóm sẽ “iterate on” (sửa đi sửa lại) và “share” (chia sẻ) nó.",
      "Bốn phương án là bốn tính năng có thật. Câu hỏi là tính năng nào làm ra đúng loại output này."
    ],
    asks: [
      "Tính năng nào hợp nhất với output này?",
      "Tức là: kết quả là một sản phẩm đứng riêng, sẽ sửa nhiều vòng và gửi người khác. Chọn chỗ chứa nó.",
      "Soi từng phương án: nó làm ra chính bản mẫu, hay làm một việc khác bên cạnh?"
    ],
    facts: [
      "Bắt đầu từ chat, chỉ đổi khi chat thiếu một thứ. Lặp lại trên cùng tài liệu thì Project. Tìm, so nhiều nguồn thì Research. Kết quả là sản phẩm sẽ sửa tiếp, dùng lại, gửi người khác thì artifact.",
      "Artifact là nội dung đáng kể, đứng riêng được, Claude mở ở khung bên cạnh chat để sửa, xem lại, xuất file hoặc chia sẻ. Nó có thể là tài liệu, code, trang web một trang, sơ đồ, công cụ nhỏ.",
      "Artifact lưu ở tab Artifacts, mở lại được từ chat khác. Mới tạo là riêng tư; muốn người khác mở thì chỉnh quyền chia sẻ.",
      "Research chạy nhiều lượt tìm nối tiếp rồi viết bản tổng hợp có nguồn. Project là không gian làm việc có knowledge và instructions dùng chung cho mọi chat. Cả hai đều không phải chỗ chứa một sản phẩm đang làm."
    ],
    opts: [
      { k: "A", gist: "A Research run that writes a lengthy survey of competitors' websites from outside sources.",
        why: [
          "Sai việc: Research để tìm và tổng hợp nhiều nguồn (ý 4). Output là một bản khảo sát đối thủ, không phải bản mẫu trang đích.",
          "Xem trang đối thủ có thể là bước chuẩn bị. Nhưng đề hỏi tính năng làm ra bản mẫu."
        ] },
      { k: "B", gist: "A brief conversational answer placed inline within the chat thread.",
        why: [
          "Trả lời ngay trong chat hợp với nội dung ngắn, mang tính trò chuyện. Bản mẫu trang đích là nội dung đáng kể, đứng riêng (ý 2).",
          "Nằm lẫn trong lịch sử chat thì mỗi vòng sửa lại chìm thêm một đoạn, không có khung để xem trước, không có chỗ gọn để gửi cả nhóm."
        ] },
      { k: "C", gist: "An Artifact, which shows standalone, editable content in its own side panel where it can be refined.",
        why: [
          "Đúng loại output: đứng riêng, sẽ sửa nhiều vòng, sẽ chia sẻ (ý 1). Trang web một trang có tương tác nằm trong những thứ artifact làm được (ý 2).",
          "Sửa ở khung bên, mở lại từ chat khác, chỉnh quyền chia sẻ để cả nhóm xem (ý 3). Khớp đúng hai chữ “iterate on” và “share” của đề."
        ] },
      { k: "D", gist: "A new Project holding nothing but the team's earlier meeting notes.",
        why: [
          "Project giữ tài liệu và lời dặn cho nhiều chat (ý 4). Nó là nơi làm việc, không phải hình dạng của output.",
          "Dễ bị cuốn vì Project nghe như chỗ cả nhóm cộng tác. Nhưng một Project chỉ có biên bản họp cũ không làm ra bản mẫu nào. Làm trong Project thì bản mẫu vẫn là một artifact."
        ] }
    ],
    refs: [
      { label: "Bài 3.1, bảng “Bắt đầu từ chat, chỉ đổi khi chat thiếu một thứ” và mục “Artifact: khi kết quả là sản phẩm để dùng tiếp”", href: NOTES + "#l-3-1" },
      { label: "Bài 2.6, mục “Trả lời ngay hay làm artifact”: artifact có thể là trang web một trang, công cụ nhỏ", href: NOTES + "#l-2-6" }
    ]
  },
  {
    de: 3, n: 40, total: 75, sub: "4.4", subName: "Đưa Claude vào quy trình đang chạy",
    answer: "AE",
    ask: "An operations assistant is rebuilding one step of a recurring data-processing workflow so that it runs on Code Execution. Which two design choices do most to make the integration reliable? (Select two.)",
    scene: [
      "Một trợ lý vận hành thiết kế lại một bước trong quy trình xử lý dữ liệu chạy hằng tuần, cho bước đó chạy bằng Code Execution (Claude chạy code trong môi trường cách ly).",
      "Output của bước này đi tiếp xuống các bên dùng phía sau (downstream consumers).",
      "Chỗ khó: D nghe rất hợp lý, “môi trường cách ly đã xác nhận code chạy không lỗi”. Phải tách “chạy không lỗi” khỏi “kết quả đúng”."
    ],
    asks: [
      "Hai lựa chọn thiết kế nào giúp phần tích hợp chạy ổn định nhất?",
      "Tức là: tuần nào cũng ra kết quả so được với nhau, và kết quả sai bị chặn trước khi tới tay bên dùng.",
      "Soi từng phương án: nó làm đầu vào, đầu ra ổn định hơn hay lộn xộn hơn, và nó thêm hay bỏ một điểm kiểm trước khi kết quả đi tiếp."
    ],
    facts: [
      "Code execution (giao diện mới gọi là “Create and edit files”): Claude chạy code trong môi trường cách ly để phân tích file, tính toán, tạo file. Cách ly để code chạy an toàn, không phải để kiểm kết quả đúng hay sai.",
      "Đúng khuôn chưa phải đúng nội dung: một con số nằm đúng cột, đúng kiểu vẫn có thể sai. Chạy không lỗi cũng vậy, nó chỉ cho biết code đã chạy xong.",
      "Output đi vào bảng tính hay hệ thống khác thì phải nói rõ tên và thứ tự cột, giá trị được phép. Nơi nhận chỉ đọc đúng thứ có khuôn cố định, và khuôn cố định thì kết quả các lần chạy mới so được với nhau.",
      "Đưa Claude vào quy trình: giao phần làm, giữ điểm duyệt. Thử vài ca ổn rồi bỏ bước duyệt là cách làm tệ."
    ],
    opts: [
      { k: "A", gist: "Fix one input file format for the step, so every Code Execution run gets consistent input and gives output that can be compared and checked week after week.",
        why: [
          "Đầu vào cùng khuôn thì code đọc đúng cột mỗi tuần, không phải đoán lại cách đọc. Kết quả tuần này so được với tuần trước (ý 3).",
          "So được thì mới kiểm được: một con số lệch hẳn so với mọi tuần là dấu hiệu để dừng lại xem."
        ] },
      { k: "B", gist: "Let the input file format change from run to run to suit whichever source systems send data that week.",
        why: [
          "Ngược với A. Mỗi tuần một khuôn thì code phải đoán lại cột nào là cột nào, dễ đọc nhầm cột ngày thành cột tiền.",
          "Kết quả các tuần không còn so được với nhau, nên mất luôn cách phát hiện tuần nào lệch (ý 3). Nhiều nguồn khác nhau thì chuẩn hóa về một khuôn trước bước này."
        ] },
      { k: "C", gist: "Insert the Code Execution step into the workflow without writing down what output format or fields it produces.",
        why: [
          "Bên dùng phía sau không biết bước này trả ra trường nào, kiểu gì (ý 3). Mỗi người tự đoán, và một thay đổi nhỏ ở output làm hỏng bước sau mà không ai biết vì sao.",
          "Không có mô tả output thì cũng không có gì để soát output có đúng khuôn không."
        ] },
      { k: "D", gist: "Remove the human review that comes after Code Execution, because the sandbox already confirms the code ran without errors.",
        why: [
          "Sai ở giả định: chạy không lỗi là đã đúng. Môi trường cách ly chỉ cho biết code chạy xong (ý 1). Nó không biết dữ liệu nguồn có sai không, công thức có đúng yêu cầu không.",
          "Một công thức cộng nhầm cột vẫn chạy trơn tru, ra con số trông rất gọn (ý 2), rồi đi thẳng xuống bên dùng.",
          "Dễ bị cuốn vì “sandboxed” (cách ly) nghe như đã có một lớp kiểm. Nhưng đó là lớp an toàn cho việc chạy code, không phải lớp kiểm kết quả, và bỏ điểm duyệt là đúng cách làm tệ ở ý 4."
        ] },
      { k: "E", gist: "Add a short verification step where a person checks the computed result against an expected range or a sanity check before it moves on to downstream users.",
        why: [
          "Giữ một điểm duyệt ở đúng chỗ: sau khi tính, trước khi kết quả tới bên dùng (ý 4). Lỗi bị chặn khi sửa còn rẻ.",
          "So với một khoảng hợp lý hay một phép thử nhanh (tổng có khớp không, có số âm vô lý không) bắt được loại lỗi mà “chạy không lỗi” không bắt (ý 1, 2).",
          "Bước này ngắn, nên không làm mất cái lợi của việc tự động hóa."
        ] }
    ],
    refs: [
      { label: "Bài 4.4, mục “Bước nào giao, bước nào giữ” và bảng Tệ/Tốt: giao phần làm, giữ điểm duyệt, đừng bỏ bước duyệt vì vài ca ổn", href: NOTES + "#l-4-4" },
      { label: "Bài 2.6, mục “Khi nơi nhận là bảng tính hay phần mềm” và “Đúng khuôn chưa phải đúng nội dung”", href: NOTES + "#l-2-6" },
      { label: "Bài Nền tảng D3, mục 3: code execution là gì, tên mới “Create and edit files”", href: NOTES + "#l-3-0" }
    ]
  },
  {
    de: 3, n: 41, total: 75, sub: "6.3", subName: "Làm việc trong chính sách AI của công ty",
    answer: "A",
    ask: "A Claude associate is putting the Diligence competency of the AI Fluency Framework into practice in ongoing Claude use. In a governance setting, which practice reflects Diligence best?",
    scene: [
      "Một associate áp dụng năng lực Diligence của khung AI Fluency vào việc dùng Claude hằng ngày.",
      "Bối cảnh là governance (quản trị việc dùng AI): chính sách AI của công ty, ai áp dụng, áp dụng lúc nào.",
      "Chỗ khó: cả bốn phương án đều nói “apply organizational AI policies” (áp dụng chính sách AI của tổ chức). Khác nhau ở chỗ áp dụng lúc nào, bao lâu, và ai chịu trách nhiệm."
    ],
    asks: [
      "Cách làm nào thể hiện Diligence rõ nhất trong bối cảnh governance?",
      "Tức là: ai chịu trách nhiệm về việc mình dùng AI, và trách nhiệm đó kéo dài tới đâu.",
      "Soi từng phương án: chính sách được áp dụng mọi lúc hay chỉ lúc có người nhìn, một lần hay liên tục, do chính người dùng hay đẩy cho người khác."
    ],
    facts: [
      "Diligence là chữ D thứ tư của khung AI Fluency 4D: “Taking responsibility for what we do with AI and how we do it” (chịu trách nhiệm về những gì ta làm với AI và cách ta làm). Kết quả cuối là của mày, dù AI góp bao nhiêu.",
      "Diligence có ba phần: Creation (chọn hệ AI nào và dùng thế nào, như dùng tài khoản được duyệt), Transparency (nói rõ vai trò của AI), Deployment (kiểm và đứng ra bảo đảm output). Cả ba nằm ở từng lần dùng, không phải làm một lần là xong.",
      "Một quy định chỉ nằm trên giấy thì phụ thuộc vào trí nhớ từng người. Governance tốt cần hồ sơ cho thấy quy định <b>đã được tuân thủ</b>, không chỉ cho thấy mọi người đã đọc nó.",
      "Người phụ trách AI (governance owner) trả lời câu hỏi về chính sách và cấp ngoại lệ. Trách nhiệm về từng lần dùng vẫn nằm ở người dùng: mày gửi thì mày chịu."
    ],
    opts: [
      { k: "A", gist: "Treat applying the organization's AI policies as a steady professional habit, spot where real usage drifts from those policies, and fix those gaps over time.",
        why: [
          "Đúng nghĩa Diligence: tự mình chịu trách nhiệm về cách mình dùng AI (ý 1), và làm ở từng lần dùng chứ không phải một lần (ý 2).",
          "“Identify gaps … take corrective action” (tìm chỗ lệch giữa cách dùng thật và chính sách, rồi sửa) là phần làm cho chính sách chạy thật, không nằm yên trên giấy (ý 3)."
        ] },
      { k: "B", gist: "Apply the policies only in visible situations, where others are likely to watch or review how Claude is used.",
        why: [
          "Sai ở chữ “only” (chỉ). Chính sách áp dụng cho mọi lần dùng, có ai nhìn hay không (ý 1).",
          "Phần không ai nhìn mới là chỗ rủi ro nằm: dữ liệu khách đưa vào tài khoản cá nhân, output gửi đi không kiểm. Áp dụng có chọn lọc là tuân thủ để đối phó, ngược với tự chịu trách nhiệm."
        ] },
      { k: "C", gist: "Cover the policies once during onboarding as basic training, record that each associate has read them, and use that record as proof of continuing compliance.",
        why: [
          "Sai ở vế cuối: bản ghi “đã đọc” chỉ chứng minh đã đọc, không chứng minh đã làm theo (ý 3).",
          "Đào tạo lúc mới vào là bước tốt. Nhưng Diligence nằm ở từng lần dùng sau đó (ý 2), và chính sách còn đổi theo công cụ, rủi ro mới.",
          "Dễ bị cuốn vì có đào tạo, có hồ sơ, nghe rất bài bản. Nhưng chữ “ongoing” (liên tục) là chỗ hỏng: một lần ký tên không thành bằng chứng cho cả những năm sau."
        ] },
      { k: "D", gist: "Hand all policy application to a central compliance team and regard individual usage as outside one's own responsibility.",
        why: [
          "Sai ở chỗ đẩy trách nhiệm đi. Diligence nói thẳng là chịu trách nhiệm về việc chính mình làm với AI (ý 1).",
          "Nhóm tuân thủ đặt luật và giám sát, nhưng không ngồi cạnh từng người lúc họ dán dữ liệu vào Claude hay gửi output đi (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 6.4, “Khái niệm của bài” và mục “Diligence gồm ba phần”: chịu trách nhiệm về việc mình làm với AI", href: NOTES + "#l-6-4" },
      { label: "Bài Nền tảng D6, mục 4 “Chính sách AI của tổ chức và governance”: quy định trên giấy cần hồ sơ cho thấy đã tuân thủ", href: NOTES + "#l-6-0" },
      { label: "Bài 6.3: biến chính sách thành cài đặt và hồ sơ; người phụ trách AI trả lời câu hỏi, cấp ngoại lệ", href: NOTES + "#l-6-3" }
    ]
  },
  {
    de: 3, n: 42, total: 75, sub: "5.1", subName: "Dựng Project: instructions và knowledge",
    answer: "DE",
    ask: "A marketing manager is choosing what goes into the custom instructions of a Project used for writing work. Which two items belong in those instructions? (Select two.)",
    scene: [
      "Một quản lý marketing dựng Project cho việc viết, đang chọn thứ gì đưa vào custom instructions (chỉ dẫn riêng của Project).",
      "Các thứ được đưa ra gồm: độ dài ưa thích cho tin nhắn nội bộ, khung và độ dài chuẩn của sản phẩm viết, giọng thương hiệu, văn phong ưa thích của người duyệt, một bài viết mẫu từ trước.",
      "Chỗ khó: thứ nào cũng có ích theo một cách. Nhưng instructions chỉ nên giữ cách làm áp cho mọi chat của Project, và là chuẩn của cả nhóm."
    ],
    asks: [
      "Hai thứ nào thuộc về custom instructions của Project?",
      "Tức là: lọc ra thứ là cách làm, áp cho mọi bài viết của Project, và là chuẩn chung chứ không phải ý riêng một người.",
      "Soi từng phương án: đây là cách làm hay tư liệu? Áp cho việc của Project hay việc khác? Chuẩn chung hay sở thích riêng?"
    ],
    facts: [
      "Project instructions là chỉ dẫn cách làm, áp cho mọi chat trong Project: vai, giọng, người đọc, định dạng, quy trình. Project knowledge là tư liệu Claude dùng để tra: sổ tay, báo cáo, bảng giá, mẫu văn bản.",
      "Phép thử: hỏi “đây là cách làm, hay là tư liệu?”. Tư liệu lớn như sổ tay thương hiệu để trong knowledge, kèm một dòng trong instructions nói phải viết theo nó.",
      "Thứ đáng đặt sẵn là thứ lặp lại ở mọi chat: người đọc, giọng, định dạng chuẩn, ràng buộc lâu dài. Đưa nhầm một thứ vào instructions là đổi mọi output sau đó, của mọi người dùng Project.",
      "Đặt quy tắc ở tầng hẹp nhất đủ phủ. Thói quen riêng của một người ở mọi việc thuộc Instructions for Claude của tài khoản người đó, không thuộc Project dùng chung."
    ],
    opts: [
      { k: "A", gist: "A typical piece of earlier writing that shows the style and structure the team prefers.",
        why: [
          "Sai chỗ đặt: một bài viết cũ là tư liệu, chỗ của nó là project knowledge (ý 1, 2). Instructions chỉ cần một dòng: viết theo giọng và khung của bài mẫu trong knowledge.",
          "Dễ bị cuốn vì ví dụ giúp Claude viết đúng kiểu, và bài 5.3 có khuyên đưa vài ví dụ ngắn vào chỉ dẫn. Nhưng đề hỏi thứ “belong in the custom instructions” (thuộc về instructions). Một bài viết hoàn chỉnh là tài liệu tham khảo, đúng loại “mẫu văn bản” mà bài 5.1 xếp vào knowledge."
        ] },
      { k: "B", gist: "How long the prompt author likes replies to internal messages to be, which has nothing to do with the external deliverables.",
        why: [
          "Sai ở phạm vi: tin nhắn nội bộ không phải việc của Project này, vốn để viết sản phẩm gửi ra ngoài. Đề còn nói thẳng “unrelated” (không liên quan).",
          "Lại là ý thích riêng của người viết prompt (ý 4). Đưa vào instructions thì mọi bài viết của mọi người trong Project bị kéo theo một luật không dành cho chúng (ý 3)."
        ] },
      { k: "C", gist: "The writing style personally preferred by the marketing manager who reviews every final deliverable.",
        why: [
          "Sai ở chỗ đây là sở thích riêng của một người, dù người đó duyệt mọi bài (ý 4). Chuẩn của cả nhóm là giọng thương hiệu.",
          "Đưa vào instructions thì sở thích đó thành luật cho mọi bài của mọi người, và có thể va với giọng thương hiệu (ý 3). Người duyệt muốn đổi gì thì sửa ở chuẩn chung, có thống nhất.",
          "Dễ bị cuốn vì người này duyệt mọi bài, viết theo ý họ nghe như đỡ phải sửa. Nhưng instructions ghi chuẩn chung, không ghi khẩu vị của người chấm."
        ] },
      { k: "D", gist: "The usual structure and expected length of the team's standard deliverables.",
        why: [
          "Đúng. Khung và độ dài chuẩn là định dạng, một loại cách làm (ý 1).",
          "Nó lặp lại ở gần như mọi bài viết của Project, nên đặt sẵn một lần thay vì dặn lại mỗi chat (ý 3)."
        ] },
      { k: "E", gist: "The brand voice and tone that every piece of writing has to follow.",
        why: [
          "Đúng. Giọng là cách làm, và là chuẩn của thương hiệu, không phải của riêng ai (ý 1).",
          "Mọi bài viết của Project đều phải theo, nên đây đúng là thứ đặt sẵn cho mọi chat (ý 3). Sổ tay thương hiệu dài, nếu có, vẫn để trong knowledge, còn instructions nói phải viết theo nó (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 5.1, bảng “Instructions hay knowledge”: cách làm vào instructions, tư liệu (kể cả mẫu văn bản) vào knowledge", href: NOTES + "#l-5-1" },
      { label: "Bài 5.3, bảng “Cái gì đáng thành chỉ dẫn”: giọng, định dạng chuẩn, ràng buộc lâu dài thì đặt sẵn; việc riêng một lần thì nói trong tin nhắn", href: NOTES + "#l-5-3" }
    ]
  },
  {
    de: 3, n: 43, total: 75, sub: "1.4", subName: "Đổi cách prompt theo loại việc",
    answer: "AD",
    ask: "As a marketing manager, you are using Claude to come up with campaign concepts, and certain framing has to be in place before any concepts are generated. Which two framing steps must be done BEFORE you ask Claude for concepts? (Select two.)",
    scene: [
      "Một quản lý marketing dùng Claude để nghĩ ý tưởng (concept) cho một chiến dịch.",
      "Đề nhấn chữ “BEFORE” (trước khi): phải xong phần đặt khung (framing) rồi mới bảo Claude nghĩ ý.",
      "Chỗ khó: năm phương án đều là việc có thật của một chiến dịch. Phải xếp chúng theo thời gian: cái nào làm trước khi có ý tưởng, cái nào chỉ làm được khi đã có."
    ],
    asks: [
      "Hai bước đặt khung nào phải làm trước khi nhờ Claude nghĩ concept?",
      "Tức là: Claude cần biết những gì để ý tưởng nghĩ ra đi đúng hướng.",
      "Soi từng phương án: nó là đầu vào cho việc nghĩ ý, hay là việc chỉ làm được sau khi đã có ý?"
    ],
    facts: [
      "Prompt tốt nói rõ việc, bối cảnh (cho ai, để làm gì), ràng buộc và lý do. Thiếu bối cảnh thì Claude viết cho một người đọc chung chung.",
      "Brainstorm cần ràng buộc như người dùng, ngân sách, thời hạn để khoanh vùng cho ý, rồi đòi nhiều ý khác nhau. Ràng buộc chỉ khoanh vùng, không loại ý nào.",
      "Chấm và chọn ý là bước riêng, làm sau khi đã có ý, với tiêu chí rõ. Đòi “5 ý hay nhất” ngay từ đầu là tự cắt mất độ rộng.",
      "Tiêu chí thành công viết trước, không viết sau khi thấy output. Viết sau thì nó chỉ mô tả lại cái vừa nhận."
    ],
    opts: [
      { k: "A", gist: "Set out the campaign's goal and how its success will be measured.",
        why: [
          "Mục tiêu là phần “để làm gì” của bối cảnh (ý 1). Thiếu nó, ý tưởng có thể hay mà phục vụ sai mục đích, ví dụ nâng nhận diện thương hiệu trong khi cần tăng lượt đăng ký.",
          "Chỉ số thành công đặt trước là sẵn tiêu chí cho bước chọn ý về sau (ý 3, 4). Chọn ý sẽ dựa vào tiêu chí, không dựa vào cảm tính."
        ] },
      { k: "B", gist: "Pick a finalist concept and get it ready for stakeholders to approve.",
        why: [
          "Sai thứ tự: chưa có concept nào thì không có gì để chọn (ý 3).",
          "Đây là bước cuối của vòng ý tưởng, đến sau cả việc nghĩ ý lẫn việc chấm ý."
        ] },
      { k: "C", gist: "Go through the concepts Claude produced and keep the two strongest for further work.",
        why: [
          "Sai thứ tự: “Claude-generated concepts” (concept Claude đã tạo) nghĩa là việc nghĩ ý đã xong. Đây là bước chấm ý (ý 3), đến sau.",
          "Dễ bị cuốn vì có chữ “two” khớp với “(Select two.)” và nghe như một bước đúng của quy trình. Nhưng đề hỏi bước làm trước khi có concept."
        ] },
      { k: "D", gist: "Set out the brand voice and the audience the concepts are meant for.",
        why: [
          "Người xem là phần “cho ai” của bối cảnh (ý 1), cũng là ràng buộc khoanh vùng cho brainstorm (ý 2). Concept cho sinh viên và cho giám đốc tài chính khác hẳn nhau.",
          "Giọng thương hiệu giữ cho các ý tưởng nghe giống công ty mình, không lệch giọng rồi phải bỏ."
        ] },
      { k: "E", gist: "Agree launch and rollout dates for the campaign with the agency.",
        why: [
          "Sai loại việc: đặt lịch ra mắt là việc triển khai, làm khi đã chọn và duyệt concept. Nó không cho Claude biết ý tưởng phải hướng về đâu.",
          "Dễ bị cuốn vì thời hạn là một ràng buộc của brainstorm (ý 2). Nhưng ràng buộc đó chỉ cần một dòng trong prompt, không cần chốt lịch với agency trước."
        ] }
    ],
    refs: [
      { label: "Bài 1.4, bảng “Bốn loại việc, bốn kiểu hỏng” và mục “Brainstorm: đòi độ rộng, chấm ở bước sau”", href: NOTES + "#l-1-4" },
      { label: "Bài Nền tảng D1, mục 4 “Các phần của một prompt tốt”: việc, bối cảnh (cho ai, để làm gì), ràng buộc", href: NOTES + "#l-1-0" },
      { label: "Bài 4.1, mục “Viết tiêu chí thành công trước khi giao”", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 3, n: 44, total: 75, sub: "6.1", subName: "Việc nào giao cho Claude được",
    answer: "DE",
    ask: "As a project manager, you are reviewing the ways teammates have proposed to use Claude in a project workflow. Which two workflow steps suit Claude support well? (Select two.)",
    scene: [
      "Một quản lý dự án xem lại các đề xuất của đồng đội về chỗ dùng Claude trong quy trình dự án.",
      "Năm bước: duyệt thông cáo báo chí mà không ai xem lại, đưa ra cam kết hợp đồng thay công ty, quyết thăng chức chỉ theo Claude, tổng hợp tài liệu nghiên cứu, soạn báo cáo tình hình từ biên bản họp.",
      "Chỗ khó không nằm ở chuyện Claude có viết được không. Ba bước đầu Claude cũng viết được. Chỗ khó là sai thì ai thấy, và gỡ có kịp không."
    ],
    asks: [
      "Hai bước nào hợp để Claude hỗ trợ?",
      "Tức là: ở bước nào, lỗi của Claude được người đọc thấy và sửa trước khi gây hại?",
      "Soi từng phương án: output có qua người duyệt không, có tạo ra cam kết hay quyết định về một người không, có gỡ lại được không."
    ],
    facts: [
      "Phép thử “kiểm được, sửa được”: một việc hợp với Claude khi lỗi của nó được phát hiện và sửa trước khi gây hại cho ai. Câu hỏi không phải “Claude có giỏi việc này không”.",
      "Vùng xanh: soạn email, tóm tắt cuộc họp, viết nháp báo cáo. Dùng bình thường, rồi kiểm như mọi output.",
      "Việc làm là lĩnh vực rủi ro cao. Quyết định về một người cụ thể ở đó cần người có chuyên môn duyệt từng ca, và báo cho người đó là có dùng AI.",
      "Việc phải có người đứng tên (ký, cam kết, gửi ra ngoài) là phần quyết, người giữ. Trách nhiệm không chuyển sang công cụ khi Claude viết xong."
    ],
    opts: [
      { k: "A", gist: "Approving a final external press release with no human looking at it.",
        why: [
          "Không kiểm được, không sửa được (ý 1). Thông cáo đã phát ra ngoài thì không thu lại được.",
          "Soạn nháp thông cáo thì hợp Claude. Chữ “approving … without any human review” (duyệt mà không ai xem lại) mới là chỗ hỏng: phần quyết bị giao luôn cho công cụ (ý 4)."
        ] },
      { k: "B", gist: "Making legally binding contract commitments on the company's behalf.",
        why: [
          "Cam kết hợp đồng là phần quyết, phải có người có thẩm quyền đứng tên (ý 4). Cam kết rồi thì công ty bị ràng buộc, không gỡ rẻ được (ý 1).",
          "Claude có thể soạn nháp điều khoản cho pháp chế đọc. Nhưng “issuing” (đưa ra cam kết) là hành động, không phải bản nháp."
        ] },
      { k: "C", gist: "Settling staff promotions purely on the model's judgment.",
        why: [
          "Thăng chức là quyết định về một người cụ thể trong lĩnh vực việc làm, thuộc vùng rủi ro cao (ý 3). Cần người có chuyên môn quyết, không phải “solely” (chỉ dựa vào) model.",
          "Model có thể mang thiên lệch từ dữ liệu, và không có ai đọc lại để bắt nó trước khi sự nghiệp của một người bị ảnh hưởng (ý 1)."
        ] },
      { k: "D", gist: "Pulling together a literature review from many uploaded research documents.",
        why: [
          "Tổng hợp nhiều tài liệu là việc nhiều chữ, mô tả rõ được, Claude làm nhanh, giống nhóm việc ở vùng xanh (ý 2).",
          "Kiểm được: tài liệu nằm ngay đó, đòi trích nguồn cho từng ý rồi đối chiếu. Sai thì sửa trong bản tổng hợp trước khi ai dùng nó (ý 1)."
        ] },
      { k: "E", gist: "Writing a structured project status update from a collection of meeting notes.",
        why: [
          "Đúng ví dụ vùng xanh: tóm tắt cuộc họp, viết nháp báo cáo (ý 2).",
          "Người quản lý dự án đọc bản nháp, đối chiếu với biên bản trước khi gửi. Lỗi bị bắt khi sửa còn rẻ (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 6.1, bảng ba vùng xanh, vàng, đỏ và phép thử “kiểm được, sửa được”", href: NOTES + "#l-6-1" },
      { label: "Bài 4.1, bảng “Việc nào hợp Claude, việc nào chưa, việc nào cần người”", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 3, n: 45, total: 75, sub: "4.1", subName: "Phân tích use case",
    answer: "C",
    ask: "A project manager is working out how Claude can help with requirements analysis on an upcoming engagement. During discovery the team will interview stakeholders and go through the existing process documents. Which activity fits this area?",
    scene: [
      "Một quản lý dự án định cách dùng Claude cho phần phân tích yêu cầu (requirements analysis) của một dự án sắp làm.",
      "Đề cho sẵn đầu vào của giai đoạn khảo sát (discovery): phỏng vấn stakeholder và tài liệu quy trình hiện có.",
      "Chỗ khó: cả bốn phương án đều có Claude làm gì đó với yêu cầu. Khác ở chỗ yêu cầu lấy từ đâu, và ai giữ phần nói chuyện với stakeholder."
    ],
    asks: [
      "Việc nào hợp với phần phân tích yêu cầu?",
      "Tức là: Claude giúp ở chỗ nào mà vẫn bám vào đầu vào thật của dự án, và người duyệt kiểm lại được.",
      "Soi từng phương án: yêu cầu đến từ stakeholder và tài liệu thật, hay từ chỗ khác? Có truy ngược về nguồn được không? Phần nào vẫn do người giữ?"
    ],
    facts: [
      "Bắt đầu từ vấn đề (problem-first): ai dùng, cần kết quả gì, ràng buộc gì. Yêu cầu phải đến từ những người đang làm việc và cách việc đang được làm thật, không đến từ tên dự án.",
      "Việc hợp Claude: nhiều chữ, mô tả rõ, đầu ra kiểm được. Gom ghi chép phỏng vấn và tài liệu quy trình thành một danh sách có khuôn là đúng loại này.",
      "Muốn kiểm từng ý thì bảo Claude chỉ dùng tài liệu được đưa và trích nguồn cho từng ý. Ý nào không có nguồn thì rút lại. Mỗi kết luận truy được về một đoạn.",
      "Chia vai: Claude đặt câu hỏi, gắn nhãn, chấm điểm. Người trả lời câu hỏi cùng stakeholder và ra quyết định cuối."
    ],
    opts: [
      { k: "A", gist: "Have Claude produce a full requirements list from just the project name and a short description, on the grounds that similar engagements have mostly standard requirements.",
        why: [
          "Sai ở nguồn: tên dự án và vài dòng mô tả không chứa stakeholder, ràng buộc hay cách việc đang làm (ý 1). Claude sẽ điền bằng kiến thức chung.",
          "Danh sách ra trông đầy đủ, nhưng không dòng nào truy về được một người hay một tài liệu (ý 3). Nó bỏ qua luôn buổi phỏng vấn và tài liệu mà đề nói nhóm sẽ có."
        ] },
      { k: "B", gist: "Have Claude rank the requirements the team has already collected, and keep the gathering itself as manual analyst work because ranking takes more time.",
        why: [
          "Xếp ưu tiên theo tiêu chí của mình là một cách dùng Claude tốt. Nhưng B bỏ đúng phần nhiều chữ nhất của giai đoạn này: gom phỏng vấn và tài liệu (ý 2).",
          "Lý do “prioritization is more time-consuming” (xếp ưu tiên tốn thời gian hơn) là một giả định tự đặt, đề không cho dữ kiện nào như vậy.",
          "Dễ bị cuốn vì B để người làm phần thu thập, nghe an toàn. Nhưng C cũng giữ người ở phần kiểm và quyết (ý 4), mà còn dùng đúng đầu vào khảo sát đề cho."
        ] },
      { k: "C", gist: "Have Claude combine the stakeholder input and current process documents into a structured requirements list, with each item traced back to its source.",
        why: [
          "Bám đúng đầu vào thật của giai đoạn khảo sát (ý 1), và là loại việc Claude làm tốt: nhiều chữ, gom về một khuôn (ý 2).",
          "“Traceability to each source” (truy được về từng nguồn) làm danh sách kiểm được: người phân tích mở đúng đoạn phỏng vấn để đối chiếu, ý nào không có nguồn thì bỏ (ý 3).",
          "Người vẫn giữ phần quyết: hỏi lại stakeholder chỗ mơ hồ, chốt danh sách (ý 4)."
        ] },
      { k: "D", gist: "Have Claude run the stakeholder interviews itself, with the analyst listening to the recordings afterwards to confirm what Claude extracted.",
        why: [
          "Sai vai: nói chuyện với stakeholder, hỏi dồn khi câu trả lời mơ hồ, nhận ra điều họ ngại nói là phần của người (ý 4).",
          "Người phân tích chỉ nghe lại sau, nên mất cơ hội hỏi tiếp đúng lúc. Phần hiểu biết đáng giá nhất của buổi phỏng vấn bị bỏ lỡ."
        ] }
    ],
    refs: [
      { label: "Bài 4.1, mục “Bắt đầu từ vấn đề” và “Dùng Claude soát yêu cầu khi còn là bản nháp”: Claude đặt câu hỏi, gắn nhãn; người hỏi stakeholder và quyết", href: NOTES + "#l-4-1" },
      { label: "Bài 2.3, mục “Trước khi Claude viết: xin một output kiểm được”: chỉ dùng tài liệu được đưa, trích nguồn cho từng ý", href: NOTES + "#l-2-3" }
    ]
  },
  {
    de: 3, n: 46, total: 75, sub: "1.2", subName: "Chia việc lớn thành chuỗi bước",
    answer: "B",
    ask: "You are judging whether a “redesign new-hire onboarding” request should be broken into parts before you prompt Claude. Which characteristic of the request is the strongest sign that breaking it up will help?",
    scene: [
      "Một yêu cầu: “thiết kế lại quy trình hội nhập nhân viên mới” (redesign new-hire onboarding).",
      "Trước khi gõ prompt, phải quyết có nên chia nhỏ (decompose) không.",
      "Chỗ khó: ba phương án nói gần cùng một ý bằng ba cách (việc quen, một tài liệu, một output rõ). Chỉ một phương án khác hẳn."
    ],
    asks: [
      "Đặc điểm nào của yêu cầu cho thấy rõ nhất là chia nhỏ sẽ giúp ích?",
      "Tức là: dấu hiệu nào nói một prompt không đủ, cần nhiều bước.",
      "Soi từng phương án: nó mô tả một output hay nhiều output khác loại, và các phần có phụ thuộc nhau không."
    ],
    facts: [
      "Nên chia khi một prompt phải lo nhiều thứ cạnh tranh nhau, khi cần kiểm một kết quả giữa chừng trước khi đi tiếp, hoặc khi đầu vào tự chia nhóm được.",
      "Giữ một prompt khi việc đơn giản, một output, đã chạy tốt. Chia lúc đó chỉ thêm lượt chat, thêm thời gian, thêm hạn mức, mà không thêm chỗ nào cần kiểm.",
      "Phần độc lập làm riêng được rồi gộp lại. Phần phụ thuộc cần kết quả của phần trước nên chạy sau, nhận output đã kiểm của phần trước.",
      "Docs của Anthropic: chia chuỗi “useful when you need to inspect intermediate outputs” (có ích khi cần kiểm các output trung gian). Chia khi cần kiểm, không chia theo thói quen."
    ],
    opts: [
      { k: "A", gist: "The request covers content the associate has written many times and knows a single well-built prompt can handle.",
        why: [
          "Đây là dấu hiệu giữ một prompt: việc quen, đã chạy tốt (ý 2).",
          "Chia việc này chỉ thêm lượt và hạn mức, không thêm chỗ nào cần kiểm."
        ] },
      { k: "B", gist: "The request calls for several distinct deliverables: a process map, supporting materials and a measurement plan.",
        why: [
          "Ba sản phẩm khác loại, mỗi cái cần đầu vào, cách làm, tiêu chí chấm riêng. Gộp vào một prompt là bắt nó lo nhiều thứ cạnh tranh nhau (ý 1).",
          "Chúng còn phụ thuộc nhau (ý 3): tài liệu hỗ trợ và kế hoạch đo lường phải dựa vào quy trình mới. Chia ra thì kiểm sơ đồ quy trình trước, rồi mới làm hai phần sau từ bản đã kiểm (ý 4)."
        ] },
      { k: "C", gist: "The request is for one structured document that one prompt can produce from a single set of inputs.",
        why: [
          "Một tài liệu, một bộ đầu vào, một prompt: đúng dấu hiệu giữ một prompt (ý 2).",
          "Không có kết quả giữa chừng nào cần kiểm trước khi đi tiếp (ý 4)."
        ] },
      { k: "D", gist: "The request has one clearly defined output, a clear input and a familiar format.",
        why: [
          "Cùng ý với C: một output rõ, đầu vào rõ, khuôn quen (ý 2).",
          "Dễ bị cuốn vì “well-defined” (xác định rõ) nghe như điều kiện tốt để chia việc. Nhưng việc đã rõ và gọn thì viết một prompt rõ là đủ."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, bảng “Khi nào nên chia, khi nào giữ một prompt”: nhiều thứ cạnh tranh nhau, cần kiểm giữa chừng thì chia", href: NOTES + "#l-1-2" },
      { label: "Bài 1.4, mục “Yêu cầu trộn nhiều loại việc”: tách ở chỗ loại việc thay đổi, kiểm ở chỗ nối", href: NOTES + "#l-1-4" }
    ]
  },
  {
    de: 3, n: 47, total: 75, sub: "2.2", subName: "Gọi đúng tên lỗi: bịa, mâu thuẫn, thiên lệch",
    answer: "D",
    ask: "Claude drafted a recommendation to merge a company's two regional warehouses into one. It cites three sources that estimate the cost savings and one source confirming the merger is operationally feasible. Two of the source documents also contain estimates of one-time transition costs and a stakeholder concern about regional service levels, and neither of these appears in the recommendation. Which concern is most warranted?",
    scene: [
      "Một quản lý chiến lược đang duyệt khuyến nghị Claude soạn: gộp hai kho khu vực thành một.",
      "Khuyến nghị dẫn ba nguồn ước tính khoản tiết kiệm và một nguồn xác nhận gộp kho làm được. Nguồn nào được dẫn cũng ủng hộ gộp.",
      "Chỗ khó: chính bộ tài liệu nguồn còn có ước tính chi phí chuyển đổi một lần, và lo ngại của một bên liên quan về chất lượng phục vụ ở từng khu vực. Hai thứ này không có trong khuyến nghị. Từng câu được viết ra có thể đều đúng, cái sai nằm ở chỗ chọn đưa cái gì vào."
    ],
    asks: [
      "Mối lo nào có cơ sở nhất?",
      "Tức là: gọi đúng tên vấn đề của một khuyến nghị chỉ dùng phần nguồn ủng hộ kết luận, và chọn đúng cách xử lý trước khi đem dùng.",
      "Soi từng phương án: nó chỉ nhìn thứ được dẫn, hay nhìn cả thứ bị bỏ ra?"
    ],
    facts: [
      "Bias (thiên lệch) là độ lệch lặp lại theo một hướng. Một dạng là thiếu góc nhìn: câu nào cũng đúng, nhưng phần bất lợi hay nhóm bị ảnh hưởng không xuất hiện. Kiểm từng câu không bắt được dạng này, vì nó nằm ở cả bức tranh.",
      "Bỏ sót (omission) là kiểu lỗi khó thấy nhất: phần bị thiếu không để lại câu nào kỳ lạ để mình để ý.",
      "Đọc kết quả như biên tập viên: số nào cũ, góc nhìn nào thiếu, câu nào cần kiểm. Câu hỏi tiếp theo nhắm đúng vào các lỗ đó.",
      "Phát hiện khi kiểm thì đổi thành yêu cầu cụ thể cho lần chạy sau, rồi kiểm lại bản mới. Một chỗ đáng ngờ không có nghĩa phải vứt cả output."
    ],
    opts: [
      { k: "A", gist: "Accept it as a first pass and put the missing material in a separate appendix instead of re-prompting the original output.",
        why: [
          "Sai ở chỗ coi phần bị bỏ là tài liệu thêm. Chi phí chuyển đổi và rủi ro phục vụ đụng thẳng vào câu “có nên gộp không”, nên phải được cân ngay trong phần lập luận (ý 3).",
          "Đặt vào phụ lục thì kết luận vẫn là kết luận viết khi chưa cân hai thứ đó. Người đọc phần chính vẫn chỉ thấy lợi.",
          "Dễ bị cuốn vì nghe như vừa giữ được bản nháp vừa bổ sung đủ. Nhưng cái thiếu ở đây không phải thiếu trang, mà là kết luận chưa tính tới phần bất lợi."
        ] },
      { k: "B", gist: "Reject it outright, because four sources are too few for a decision of this size.",
        why: [
          "Sai ở thước đo: vấn đề không nằm ở số nguồn, mà ở cách dùng nguồn. Bộ tài liệu đã có thông tin bất lợi, khuyến nghị bỏ qua nó (ý 1).",
          "Thêm mười nguồn mà vẫn chỉ chọn câu ủng hộ thì vẫn lệch y như cũ. Ngưỡng “bao nhiêu nguồn là đủ” là con số tự đặt ra.",
          "Bỏ hẳn cũng là làm quá tay: phần tiết kiệm có thể vẫn đúng, chỉ cần cân thêm phần đang thiếu (ý 4)."
        ] },
      { k: "C", gist: "It is sound, since every source it cites backs the consolidation.",
        why: [
          "Sai ở chỗ chỉ nhìn thứ được dẫn. Chỉ chọn nguồn ủng hộ thì nguồn được dẫn đương nhiên ủng hộ kết luận (ý 1).",
          "Kiểm từng câu thấy đúng không chứng minh được cả bản cân bằng. Phần bị bỏ không để lại dấu vết nào trong bản nháp (ý 2)."
        ] },
      { k: "D", gist: "It uses the source documents selectively and should be re-prompted to deal with the transition costs and the service-level concern before anyone relies on it.",
        why: [
          "Gọi đúng tên: khuyến nghị lấy phần nguồn ủng hộ, bỏ phần bất lợi nằm ngay trong cùng bộ tài liệu. Đây là lệch theo một hướng, dạng thiếu góc nhìn (ý 1, 2).",
          "Xử lý đúng: đổi phát hiện thành yêu cầu cụ thể, bảo Claude đưa chi phí chuyển đổi và lo ngại về chất lượng phục vụ vào phần cân nhắc, rồi kiểm lại bản mới trước khi dùng (ý 3, 4)."
        ] }
    ],
    refs: [
      { label: "Bài 2.2, mục “Bias: thường là thiếu hoặc lệch, không phải câu sai”: từng câu đúng mà cả bản vẫn lệch", href: NOTES + "#l-2-2" },
      { label: "Bài 2.0, mục “Sáu kiểu lỗi hay gặp”: bỏ sót là kiểu khó thấy nhất", href: NOTES + "#l-2-0" },
      { label: "Bài 4.2, mục “Kiểm nguồn trước khi tin kết luận”: đọc như biên tập viên, tìm góc nhìn đang thiếu", href: NOTES + "#l-4-2" }
    ]
  },
  {
    de: 3, n: 48, total: 75, sub: "3.2", subName: "Haiku, Sonnet, Opus khác nhau ở đâu",
    answer: "C",
    ask: "An operations manager is putting together a quick-reference card for her team. Which description gives an accurate general picture of the three Claude model tiers?",
    scene: [
      "Một quản lý vận hành làm thẻ tra nhanh cho nhóm, cần một câu tả đúng ba tầng model Claude.",
      "“In general terms” (nói chung): không cần thông số hay giá, chỉ cần vị trí của từng tầng.",
      "Chỗ khó: các phương án dùng cùng mấy chữ “nhanh”, “sâu”, “mặc định”, nhưng gán cho sai tầng, hoặc cho rằng các tầng chỉ khác nhau về tốc độ và giá."
    ],
    asks: [
      "Mô tả nào đúng về ba tầng model?",
      "Tức là: ghép đúng từng tầng với vị trí của nó trên trục sâu, nhanh, tốn."
    ],
    facts: [
      "Ba tầng là ba cỡ của cùng một họ model, trên cùng một trục: lên tầng thì lập luận sâu hơn nhưng chậm hơn, tốn hơn.",
      "Haiku nhanh nhất, nhẹ hạn mức nhất. Sonnet là tầng giữa, dùng hằng ngày; Anthropic khuyên chọn Sonnet khi chưa biết chọn gì. Opus lập luận sâu nhất trong ba tầng guide nêu, chậm hơn và tốn hạn mức hơn.",
      "Docs API xếp độ trễ: Haiku nhanh nhất, Sonnet nhanh, Opus chậm hơn hai tầng kia.",
      "Việc đơn giản thì ba tầng cho kết quả gần như nhau. Khác biệt lộ ra ở việc khó: nhiều bước, lập luận dài."
    ],
    opts: [
      { k: "A", gist: "Haiku is the deepest reasoner of the three, and Opus is the light model for quick answers.",
        why: [
          "Sai: đảo ngược cả trục (ý 1, 2). Haiku là tầng nhanh, nhẹ; Opus mới là tầng lập luận sâu.",
          "Nhóm làm theo thẻ này sẽ đưa việc khó cho Haiku và chạy việc vặt trên Opus, vừa kém vừa tốn."
        ] },
      { k: "B", gist: "All three reason equally deeply; they differ only in speed and cost.",
        why: [
          "Sai: tốc độ và chi phí chỉ là một nửa của trục. Độ sâu lập luận khác nhau thật (ý 1).",
          "Dễ bị cuốn vì với việc đơn giản, ba tầng ra gần như nhau thật (ý 4). Nhưng ở việc khó thì khoảng cách lộ ra, và đó chính là lý do phải chọn tầng."
        ] },
      { k: "C", gist: "Haiku is quick and light, Sonnet is the balanced default for most daily work, and Opus is the most capable for hard reasoning, at more latency and cost.",
        why: [
          "Đúng cả ba vị trí trên trục (ý 1, 2, 3): Haiku nhanh, nhẹ; Sonnet cân bằng, làm mặc định; Opus mạnh nhất, đổi lại chậm hơn và tốn hơn.",
          "Câu này nói luôn cái giá của Opus, nên thẻ tra nhanh không vô tình khuyên dùng Opus cho mọi việc."
        ] },
      { k: "D", gist: "Sonnet is the fastest tier, because its design favors speed over reasoning depth.",
        why: [
          "Sai: tầng nhanh nhất là Haiku (ý 2, 3). Sonnet là tầng giữa, không phải tầng tốc độ.",
          "Vế “its design favors speed” (thiết kế của nó ưu tiên tốc độ) là lý do bịa ra để đỡ một khẳng định đã sai."
        ] }
    ],
    dispute: "Đề gốc chấm C, giữ nguyên. Lưu ý: app hiện có thêm Fable 5.1 ở trên Opus, nên “Opus is the most capable” (Opus mạnh nhất) chỉ đúng trong ba tầng guide v1.0 nêu. Khi thi nghĩ theo ba tầng của guide.",
    refs: [
      { label: "Bài 3.2: ba tầng trên cùng một trục sâu, nhanh, hạn mức; cái giống nhau không giúp chọn", href: NOTES + "#l-3-2" },
      { label: "Bài 8.3: guide có ba tầng, app có thêm Fable; khi thi trả lời theo guide", href: NOTES + "#l-8-3" }
    ]
  },
  {
    de: 3, n: 49, total: 75, sub: "6.3", subName: "Làm việc trong chính sách AI của công ty",
    answer: "B",
    ask: "An HR associate is about to use Claude on a sensitive personnel matter. Her organization's AI policy states explicitly that information connected to ongoing investigations must not be entered into AI tools. Which response best fits the policy?",
    scene: [
      "Một chuyên viên nhân sự sắp dùng Claude cho một vụ việc nhân sự nhạy cảm.",
      "Chính sách AI của công ty ghi rõ: thông tin liên quan tới cuộc điều tra đang diễn ra không được nhập vào công cụ AI.",
      "Chỗ khó: ba phương án tìm cách vẫn nhập được: chờ điều tra xong, dùng chat ẩn danh, diễn đạt lại và bỏ chi tiết định danh. Cách nào cũng kèm một lý do nghe xuôi tai."
    ],
    asks: [
      "Cách nào hợp với chính sách nhất?",
      "Tức là: khi chính sách cấm thẳng một loại thông tin, làm sao vẫn xử lý được vụ việc mà không lách.",
      "Soi từng phương án: nó chỉ đổi cách nhập, hay thật sự không nhập loại thông tin bị cấm?"
    ],
    facts: [
      "Khi chính sách và việc cần làm va nhau: dừng phần vi phạm, đưa cách làm hợp lệ, chuyển lên đúng kênh nếu cần ngoại lệ. Không làm trước rồi hỏi sau.",
      "Chat ẩn danh (incognito) không vào lịch sử, không vào memory, không dùng để train. Nhưng nó vẫn được giữ 30 ngày theo mặc định, và trên Team, Enterprise vẫn có trong bản xuất dữ liệu và Compliance API. Ẩn danh không phải cách lách chính sách dữ liệu.",
      "Bỏ định danh đáp ứng chính sách cấm dữ liệu định danh, như đáp án câu mẫu 3 của guide. Ẩn danh nửa vời vẫn lần ra được người: bỏ tên nhưng giữ chức danh hiếm, thời điểm, nơi làm.",
      "Đáp án né vấn đề là sai khi còn đường hợp lệ. Lý do riêng hay sự tiện tay cũng không đổi được chính sách."
    ],
    opts: [
      { k: "A", gist: "Wait until the investigation is closed and enter the information then, since the policy only covers the investigation period.",
        why: [
          "Không giúp gì cho việc trước mắt: vụ việc cần xử lý bây giờ, đúng lúc chính sách cấm (ý 1).",
          "Nó còn tự diễn giải phạm vi chính sách. Hồ sơ điều tra đã đóng vẫn là dữ liệu nhân sự nhạy cảm. Có được nhập hay không là câu hỏi cho người phụ trách chính sách, không phải để tự suy."
        ] },
      { k: "B", gist: "Keep investigation-related information out of Claude and ask HR leadership for an approved alternative way to handle the matter.",
        why: [
          "Đúng thứ tự khi chính sách va với việc cần làm: dừng phần bị cấm, rồi tìm cách làm hợp lệ qua đúng kênh (ý 1).",
          "Không phải bỏ việc: vụ việc vẫn được xử lý, theo cách lãnh đạo nhân sự đã duyệt (ý 4)."
        ] },
      { k: "C", gist: "Enter the information in an incognito chat, reasoning that incognito chats are not retained and therefore fall outside what the policy is aiming at.",
        why: [
          "Sai ở giả định: chat ẩn danh vẫn được giữ 30 ngày, trên Team, Enterprise vẫn nằm trong bản xuất và Compliance API (ý 2).",
          "Mà kể cả không lưu gì, chính sách cấm việc nhập vào công cụ AI. Gõ vào chat ẩn danh vẫn là nhập."
        ] },
      { k: "D", gist: "Enter a paraphrased version with the identifying details stripped out, on the grounds that this respects the spirit of the policy.",
        why: [
          "Sai ở chỗ nhầm loại bị cấm. Chính sách cấm thông tin về cuộc điều tra, không chỉ tên người. Bỏ tên thì nội dung vụ việc vẫn còn nguyên (ý 3).",
          "Trong vụ nhân sự, bối cảnh như phòng ban, thời điểm, hành vi bị tố thường đủ để lần ra người (ý 3).",
          "Dễ bị cuốn vì giống đáp án câu mẫu 3 của guide: bỏ định danh rồi mới tải lên. Nhưng ở câu mẫu, chính sách cấm dữ liệu cá nhân, còn ở đây chính sách cấm cả một loại thông tin."
        ] }
    ],
    refs: [
      { label: "Bài 6.3, mục “Khi chính sách và yêu cầu va nhau”: dừng phần vi phạm, đưa cách hợp lệ, chuyển lên đúng kênh", href: NOTES + "#l-6-3" },
      { label: "Bài 6.2: incognito không phải “không để lại dấu”, và cẩn thận với ẩn danh nửa vời", href: NOTES + "#l-6-2" }
    ]
  },
  {
    de: 3, n: 50, total: 75, sub: "1.4", subName: "Đổi cách prompt theo loại việc",
    answer: "C",
    ask: "Someone asks you to “look at our pricing.” Discovery confirms the real goal: a structured summary of competitor pricing that the team can act on, not fresh pricing ideas. Which strategy best fits this clarified task?",
    scene: [
      "Yêu cầu ban đầu rất mơ hồ: “look at our pricing” (xem giúp giá của mình).",
      "Sau bước tìm hiểu, mục tiêu đã rõ: một bản tóm tắt có cấu trúc về giá của các đối thủ, nhóm dùng được để hành động. Đề nói thẳng: không cần ý tưởng giá mới.",
      "Chỗ khó: bốn phương án là bốn kiểu làm khác nhau: brainstorm, phân tích so sánh, research, trò chuyện mở. Phải nhận ra việc này thuộc loại nào."
    ],
    asks: [
      "Chiến lược nào hợp nhất với việc đã làm rõ?",
      "Tức là: gom thông tin có thật về giá đối thủ từ nhiều nguồn, theo một khung cố định, để nhóm tin được và dùng được."
    ],
    facts: [
      "Nhận ra loại việc trước, rồi nhấn đúng phần nó cần: dữ liệu cho phân tích, phạm vi cho research, mẫu giọng cho soạn thảo, độ rộng cho brainstorm.",
      "research (loại việc) là gom thông tin từ nhiều nguồn để trả lời một câu hỏi. Cần kiểm chéo nhiều nguồn, ghi nguồn, và ghi mức tin cậy khi kết luận chưa chắc. Hỏng hay gặp: rộng, chung chung, hoặc dựa vào một nguồn.",
      "Brainstorm là nghĩ ra thật nhiều ý khác nhau, chưa chấm điểm. Nó tạo ý, không gom sự kiện.",
      "Đã biết output phải trông thế nào thì nói định dạng ngay trong prompt."
    ],
    opts: [
      { k: "A", gist: "Brainstorm divergently to produce many possible observations about competitor pricing, then narrow down to the likeliest ones.",
        why: [
          "Sai loại việc: brainstorm tạo ý, không gom sự kiện (ý 3). Đề nói rõ không cần ý mới.",
          "“Most likely” (khả năng cao nhất) nghĩa là đoán. Giá đối thủ là sự kiện phải lấy từ nguồn, không phải chọn ra từ một danh sách phỏng đoán."
        ] },
      { k: "B", gist: "Run a comparative analysis of the company's pricing against one named competitor, since a pairwise comparison reads most clearly.",
        why: [
          "Sai ở phạm vi: nhóm cần bức tranh giá của các đối thủ. Thu về một đối thủ là tự cắt mất phần lớn câu trả lời.",
          "Nhóm sẽ hành động dựa trên một góc nhìn hẹp, đúng kiểu hỏng “dựa vào một nguồn” của research (ý 2).",
          "Dễ bị cuốn vì “comparative analysis” (phân tích so sánh) nghe chặt chẽ và gọn. Nhưng dễ đọc không bù được thiếu, và cấu trúc phải theo nhu cầu của nhóm, không theo cái dễ trình bày."
        ] },
      { k: "C", gist: "Use a research approach that collects structured information on competitor pricing, cites its sources, and states how confident it is in each finding.",
        why: [
          "Đúng loại việc: gom thông tin có thật từ nhiều nguồn (ý 1, 2). Chữ “structured” (có cấu trúc) khớp đúng thứ nhóm cần (ý 4).",
          "Ghi nguồn để nhóm kiểm được từng con số. Ghi mức tin cậy để biết chỗ nào còn yếu trước khi quyết (ý 2)."
        ] },
      { k: "D", gist: "Explore competitor pricing in an open-ended conversation over several prompts and let a structure emerge along the way.",
        why: [
          "Sai ở chỗ để cấu trúc tự hiện ra, trong khi đầu ra đã được định rõ là bản tóm tắt có cấu trúc (ý 4).",
          "Không có khung từ đầu thì mỗi lượt gom một kiểu, khó so, và nhóm phải tự sắp lại trước khi dùng. Trò chuyện mở hợp với lúc mục tiêu còn mờ, mà bước tìm hiểu đã làm rõ rồi."
        ] }
    ],
    refs: [
      { label: "Bài 1.4, bảng “Bốn loại việc, bốn kiểu hỏng” và phần research: phạm vi rõ, kiểm chéo nhiều nguồn, ghi mức tin cậy", href: NOTES + "#l-1-4" },
      { label: "Bài 1.1: nói định dạng muốn có ngay trong prompt", href: NOTES + "#l-1-1" }
    ]
  },
  {
    de: 3, n: 51, total: 75, sub: "7.2", subName: "Chỉnh theo phản hồi",
    answer: "A",
    ask: "A knowledge worker is describing how to use feedback to make Claude-supported work better over time. Which description is most accurate?",
    scene: [
      "Một người làm văn phòng giải thích cách dùng phản hồi để việc làm cùng Claude tốt dần lên.",
      "Bốn phương án khác nhau ở ba chỗ: thu phản hồi lúc nào, thu cụ thể hay chung chung, và sửa khoanh vùng hay viết lại cả loạt.",
      "Chỗ khó: phương án sai nào cũng có một lý do nghe hợp lý: đợi đủ nhiều thì thấy xu hướng, điểm tổng thì gọn, viết lại rộng thì phủ được nhiều lỗi."
    ],
    asks: [
      "Mô tả nào chính xác nhất?",
      "Tức là: vòng phản hồi nào cho biết phải sửa chỗ nào, và cho biết cách sửa đó có tác dụng không."
    ],
    facts: [
      "Phản hồi là triệu chứng, không phải đơn thuốc. Phản hồi dùng được phải nói rõ chỗ sai. “Chưa đúng, làm lại đi” bắt Claude đoán.",
      "Phản hồi càng sớm càng rẻ. Thấy lệch thì nói ngay, đừng đợi.",
      "Lặp: chẩn đoán → đổi một chỗ → thử lại → giữ cái có tác dụng. Đổi nhiều thứ một lúc thì không biết cái nào làm output tốt lên hay tệ đi.",
      "Khớp cần gạt với bằng chứng: thiếu kiến thức, instructions sai, prompt mơ hồ, chat quá dài, hay việc quá sức, mỗi gốc một cách sửa. Không biết lỗi cụ thể thì không chọn được cần gạt."
    ],
    opts: [
      { k: "A", gist: "Record specific feedback after every run, turn it into targeted changes to the prompt or workflow, and check whether later runs get better.",
        why: [
          "Đủ ba khâu của vòng lặp: phản hồi cụ thể (ý 1), sửa khoanh vùng đúng chỗ (ý 3, 4), rồi xem các lần chạy sau có tốt lên không.",
          "Ghi ngay sau mỗi lần chạy nên lỗi được ghi khi còn rõ, và được sửa sớm (ý 2)."
        ] },
      { k: "B", gist: "Hold off on recording feedback until several runs are done, so patterns show up from the volume, and base changes on those patterns rather than on any single run.",
        why: [
          "Sai ở chỗ hoãn: lỗi cụ thể của từng lần bị quên hoặc nhòe đi, và vài lần chạy tiếp theo vẫn mang lỗi đã biết (ý 2).",
          "Dễ bị cuốn vì notes cũng dặn đừng tin một bản đẹp trên một đầu vào. Nhưng đó là chuyện xác nhận cách sửa trên vài đầu vào trước khi lưu, không phải chuyện hoãn ghi phản hồi."
        ] },
      { k: "C", gist: "Record one overall quality score per run, since a score shows whether quality is rising without needing detail on individual problems.",
        why: [
          "Sai ở vế “without requiring detail” (không cần chi tiết): điểm tổng cho biết tốt lên hay tệ đi, không cho biết phải sửa chỗ nào (ý 1, 4).",
          "Thang điểm có ích khi mỗi mức có mô tả và đi kèm ghi chú lỗi cụ thể. Một con số trần thì không chỉ ra cần gạt nào."
        ] },
      { k: "D", gist: "Note general impressions after each run and answer them with broad prompt rewrites, since sweeping rewrites cover more possible issues than targeted fixes.",
        why: [
          "Sai hai chỗ: ấn tượng chung không nói rõ chỗ sai (ý 1), và viết lại rộng là đổi nhiều thứ một lúc (ý 3).",
          "Output có tốt lên cũng không biết nhờ thay đổi nào. Tệ đi thì không biết phải gỡ cái gì."
        ] }
    ],
    refs: [
      { label: "Bài 7.2, mục “Đọc phản hồi để tìm gốc” và “Sửa giữa chừng: nói chẩn đoán, đừng chỉ chê”", href: NOTES + "#l-7-2" },
      { label: "Bài 1.3, mục “Mỗi vòng đổi một chỗ”: đổi nhiều thứ một lúc thì không biết vì đâu", href: NOTES + "#l-1-3" }
    ]
  },
  {
    de: 3, n: 52, total: 75, sub: "3.4", subName: "Context có hạn: chat mới, tóm tắt, lưu lại",
    answer: "C",
    ask: "A conversation with Claude has grown long, and its outputs have become inconsistent. Which context-management step should come first?",
    scene: [
      "Chat đã dài, và output bắt đầu không nhất quán: lần này theo một hướng, lần sau theo hướng khác.",
      "Đề không nói có việc mới. Đây là cùng một mạch việc bị kéo dài.",
      "Chỗ khó: đề hỏi “first” (trước tiên). Mở chat mới là hướng đúng, nhưng mở khi chưa biết phải mang gì theo là bỏ luôn những gì đã chốt."
    ],
    asks: [
      "Bước quản lý context nào phải làm trước?",
      "Tức là: trước khi rời chat hay đổi gì, phải có trong tay bản hiện trạng: quyết định đã chốt, con số, ràng buộc, việc còn mở."
    ],
    facts: [
      "Context rot (context bị mục): token trong context càng nhiều, Claude nhớ chính xác thông tin trong đó càng kém. Chat dài còn bị tự tóm tắt, chi tiết đầu chat có thể bị nén.",
      "Cùng một mạch việc, chat đã dài, câu trả lời bắt đầu lệch thì tóm tắt: tự liệt kê (hoặc nhờ Claude liệt kê rồi tự kiểm) các quyết định, con số, ràng buộc, việc còn mở, rồi mang bản đó sang chat mới.",
      "Mở chat mới chỉ “miễn phí” khi thứ quan trọng đã được giữ lại. Chưa giữ mà bỏ chat là bỏ luôn các quyết định trong đó.",
      "Haiku 5.5, Sonnet 5.5, Opus 5.5 cùng context 1M token. Context to hơn cũng không chữa được context rot."
    ],
    opts: [
      { k: "A", gist: "Move to a different model in the hope that it copes better with long context.",
        why: [
          "Sai ở giả định: đổi model không bớt được thứ đang làm loãng context. Các model cùng context 1M token, mà context to hơn cũng không chữa context rot (ý 1, 4).",
          "Đổi model ngay trong chat đó thì model mới vẫn đọc đúng phần lịch sử dài và lẫn lộn ấy."
        ] },
      { k: "B", gist: "Keep going in the same conversation and hope it becomes consistent again.",
        why: [
          "Không làm gì cả: chat càng dài thì càng loãng (ý 1).",
          "Thứ gây lệch vẫn đang tăng lên, nên không có lý do gì để lệch tự hết."
        ] },
      { k: "C", gist: "Condense the conversation so far into a short statement of where things currently stand.",
        why: [
          "Đúng bước đầu: gom hiện trạng thành một bản ngắn gồm quyết định, con số, ràng buộc, việc còn mở (ý 2).",
          "Nhờ Claude soạn thì mày phải tự kiểm lại với những gì đã chốt, vì bản tóm tắt dựa trên chính phần lịch sử đang lẫn. Bản đã kiểm này là thứ mang sang chat mới (ý 3)."
        ] },
      { k: "D", gist: "Open a new conversation and paste back in only the essential earlier context.",
        why: [
          "Đúng hướng, nhưng là bước sau. “Only the essential” (chỉ phần thiết yếu) đòi mày đã biết phần nào thiết yếu, và đó chính là việc của bản tóm tắt (ý 2).",
          "Làm ngay khi chưa gom hiện trạng thì chọn theo trí nhớ, dễ sót một quyết định hay ràng buộc (ý 3).",
          "Dễ bị cuốn vì “mở chat mới” là lời khuyên quen cho chat dài. Nhưng đề hỏi “first” (trước tiên), và bước đầu là có bản để mang theo."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, bảng “Mở chat mới, tóm tắt, hay lưu lại”: chat dài bắt đầu lệch thì tự liệt kê rồi mang sang chat mới", href: NOTES + "#l-3-4" },
      { label: "Bài 7.2, bảng “Khớp cần gạt với bằng chứng”: chat dài càng về sau càng lệch thì bắt đầu lại, chỉ mang theo những gì còn cần", href: NOTES + "#l-7-2" }
    ]
  },
  {
    de: 3, n: 53, total: 75, sub: "4.4", subName: "Đưa Claude vào quy trình đang chạy",
    answer: "AD",
    ask: "As a process consultant, you are building a ready-made Skill into a team workflow that runs on a regular cycle. Which two practices best support reliable integration? (Select two.)",
    scene: [
      "Một tư vấn quy trình đưa một Skill có sẵn vào một quy trình của nhóm, chạy lặp lại theo chu kỳ.",
      "Skill là gói hướng dẫn cho một loại việc, Claude tự nạp khi việc cần tới.",
      "Chỗ khó: ba phương án sai đều nhằm chạy nhanh hơn hay rộng hơn: dùng Skill ngoài phạm vi, bỏ người duyệt, lấy bản chưa phát hành. Đề hỏi cái gì làm việc tích hợp chạy ổn định, lần nào cũng như lần nào."
    ],
    asks: [
      "Hai cách làm nào giúp tích hợp đáng tin nhất?",
      "Tức là: Skill phải ăn khớp với các bước trước và sau nó, và cả nhóm phải biết bước nào Claude làm, bước nào người vẫn duyệt."
    ],
    facts: [
      "Skill là thư mục hướng dẫn, script, tài nguyên cho một việc chuyên biệt. Mỗi Skill đóng gói một quy trình cho một loại việc.",
      "Quyết theo từng bước: bước nào giao Claude, bước nào người giữ. Trách nhiệm không chuyển sang công cụ khi Claude làm xong. Thử vài ca ổn rồi bỏ bước duyệt là sai.",
      "Công khai vai trò của Claude: người dựa vào quy trình phải biết bước nào giờ do Claude làm và chỗ nào người vẫn duyệt.",
      "Trên Team, Enterprise, Owner của tổ chức cấp Skill cho mọi thành viên. Công cụ dùng với việc công ty phải là thứ công ty đã duyệt; dùng thứ chưa duyệt là AI ngoài luồng (shadow AI)."
    ],
    opts: [
      { k: "A", gist: "Spell out the inputs the Skill needs and the outputs the team will use, so every step around it has a clear handoff.",
        why: [
          "Đây là chỗ nối giữa Skill và quy trình: bước trước đưa gì vào, bước sau nhận gì ra. Không quy định thì mỗi lần chạy mỗi kiểu, bước sau phải đoán (ý 1, 2).",
          "Khi có lỗi, ranh giới rõ cho biết lỗi nằm ở đầu vào, ở Skill hay ở bước sau."
        ] },
      { k: "B", gist: "Use the Skill beyond its documented scope so it can cover several unrelated steps in the workflow.",
        why: [
          "Sai: Skill đóng gói một quy trình cho một loại việc (ý 1). Dùng cho việc khác là chạy hướng dẫn không viết cho việc đó.",
          "Kết quả ở các bước ngoài phạm vi không ai bảo đảm, mà nhìn vẫn đúng khuôn nên khó phát hiện."
        ] },
      { k: "C", gist: "Take human review out of every step that calls the Skill and treat its packaged output as final.",
        why: [
          "Sai: trách nhiệm không chuyển sang công cụ (ý 2). Skill đóng gói hướng dẫn, nó không chịu trách nhiệm thay ai.",
          "Dễ bị cuốn vì Skill có sẵn, đóng gói gọn, nghe như đã được kiểm. Nhưng chạy tốt vài lần chưa phải lý do bỏ bước duyệt (ý 2)."
        ] },
      { k: "D", gist: "Record which workflow steps call the Skill and what human review still happens, so accountability and quality checks stay visible across runs.",
        why: [
          "Đúng ý công khai vai trò của Claude: ai dựa vào quy trình cũng biết bước nào Claude làm, chỗ nào người duyệt (ý 3).",
          "Bước duyệt được ghi lại thì qua nhiều chu kỳ không ai lặng lẽ bỏ nó đi, và luôn rõ ai chịu trách nhiệm (ý 2)."
        ] },
      { k: "E", gist: "Skip the published version of the Skill and use an unreleased build obtained from outside the approved distribution channel.",
        why: [
          "Sai: bản lấy ngoài kênh được duyệt là công cụ chưa ai xem xét, đúng kiểu AI ngoài luồng (ý 4).",
          "Quy trình lặp lại cần mỗi lần chạy cùng một bản. Bản chưa phát hành có thể đổi hay hỏng mà không ai báo."
        ] }
    ],
    refs: [
      { label: "Bài 4.4: quyết theo từng bước, giữ bước duyệt, công khai bước nào Claude làm, bước nào người duyệt", href: NOTES + "#l-4-4" },
      { label: "Bài 3.1, định nghĩa Skills: gói hướng dẫn cho một loại việc, Claude chỉ nạp khi cần", href: NOTES + "#l-3-1" },
      { label: "Help Center “What are Skills”: Owner của Team, Enterprise cấp Skill cho mọi thành viên", href: "https://support.claude.com/en/articles/12512176-what-are-skills" }
    ]
  },
  {
    de: 3, n: 54, total: 75, sub: "1.3", subName: "Lặp prompt: chẩn đoán, đổi một chỗ, thử lại",
    answer: "AB",
    ask: "Claude's first output is partly useful, but its tone and level of detail are off. Which two refinements are most likely to produce a clearly better result? (Select two.) Each correct answer is a complete solution.",
    scene: [
      "Output đầu tiên dùng được một phần, nhưng sai giọng và độ chi tiết chưa đúng.",
      "Đề đã gọi tên hai triệu chứng: giọng (tone) và độ chi tiết (detail).",
      "Chỗ khó: ba phương án sai đều là gửi lại theo một cách nào đó: gửi nhiều lần, thêm một câu nhắc, tăng độ ngẫu nhiên. Không cách nào thêm thông tin mới."
    ],
    asks: [
      "Hai cách sửa nào nhiều khả năng cho output tốt hơn rõ rệt?",
      "Tức là: hai thay đổi nào đưa thêm cho Claude đúng thứ nó đang thiếu để chỉnh giọng và độ chi tiết.",
      "Soi từng phương án: nó thêm thông tin vào prompt, hay chỉ gửi lại với điều kiện cũ?"
    ],
    facts: [
      "Output yếu thì gọi tên triệu chứng, tìm phần prompt gây ra. Chung chung, nông thì thêm chi tiết, nói rõ độ sâu, thêm ví dụ. Lệch người đọc thì nêu người đọc và mục đích.",
      "Người đọc quyết định giọng: mức trang trọng, mức chuyên môn, chọn chữ. Tính từ trần như “thân thiện hơn” để Claude tự đoán. Nói người đọc cụ thể, hoặc đưa một mẫu, thì Claude có cái để bám.",
      "Gõ lại y nguyên hay “viết hay hơn đi” không sửa gì: điều kiện gây ra output yếu vẫn còn nguyên.",
      "Temperature (độ ngẫu nhiên): người dùng app không có nút này, và nó không làm Claude theo lời dặn tốt hơn."
    ],
    opts: [
      { k: "A", gist: "Add a precise description of the tone and name a concrete audience in the prompt.",
        why: [
          "Sửa vào gốc của lỗi giọng: Claude chưa biết viết cho ai. Biết người đọc cụ thể thì nó chọn được mức trang trọng, mức chuyên môn, và chi tiết tới đâu (ý 1, 2).",
          "Một tính từ trần thì yếu. Ở đây tính từ đi kèm người đọc cụ thể, nên Claude có thông tin thật để bám (ý 2)."
        ] },
      { k: "B", gist: "Give an example of an output that already meets the standard you want.",
        why: [
          "Mẫu cho Claude thấy giọng và độ chi tiết “đạt” trông thế nào, điều mà mô tả bằng lời khó làm hết (ý 1, 2).",
          "Dùng được cả khi người viết khó tả chuẩn của mình bằng lời."
        ] },
      { k: "C", gist: "Submit the same prompt several times and keep the best response.",
        why: [
          "Sai: prompt không đổi thì điều kiện gây ra lỗi giọng, lỗi chi tiết vẫn nguyên (ý 3).",
          "Có thể gặp một bản khá hơn do may, nhưng lần sau lại phải thử may. Không có gì được sửa.",
          "Dễ bị cuốn vì chọn bản tốt nhất trong vài bản nghe như có kiểm. Nhưng bản nào cũng thiếu cùng một thứ: Claude vẫn không biết viết cho ai."
        ] },
      { k: "D", gist: "Tack “please do better” onto the end of the original prompt.",
        why: [
          "Sai: không nói tốt hơn ở đâu, giọng nào, chi tiết tới mức nào (ý 3).",
          "Claude phải đoán, nên bản sau đổi lung tung chứ không theo hướng cần."
        ] },
      { k: "E", gist: "Turn up the temperature setting and resubmit the prompt unchanged.",
        why: [
          "Sai: người dùng app không có nút temperature, và độ ngẫu nhiên không làm Claude theo lời dặn tốt hơn (ý 4).",
          "Prompt vẫn y nguyên, nên vẫn thiếu đúng thông tin về giọng và độ chi tiết. Output chỉ khác đi, không đúng hơn."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, bảng triệu chứng: chung chung, nông thì thêm chi tiết, nói độ sâu, thêm ví dụ; gõ lại không phải là sửa", href: NOTES + "#l-1-3" },
      { label: "Bài 2.5, mục “Yêu cầu sửa phải làm theo được”: tính từ trần để Claude tự đoán", href: NOTES + "#l-2-5" },
      { label: "Bài 1.1, mục “Biết thêm”: đáp án nhắc chỉnh temperature thì loại", href: NOTES + "#l-1-1" }
    ]
  },
  {
    de: 3, n: 55, total: 75, sub: "1.4", subName: "Đổi cách prompt theo loại việc",
    answer: "C",
    ask: "A product manager is using Claude to come up with options for a new self-service portal. The team wants breadth before narrowing down and will weigh trade-offs across the options in a later, separate session. Which prompting strategy suits this stage?",
    scene: [
      "Một quản lý sản phẩm dùng Claude nghĩ phương án cho một cổng tự phục vụ mới.",
      "Đề nói rõ hai điều: nhóm cần độ rộng trước khi thu hẹp, và việc cân đánh đổi giữa các phương án sẽ làm ở một buổi riêng.",
      "Chỗ khó: ba trong bốn phương án đều xin nhiều phương án. Khác nhau ở chỗ có bảo Claude xếp hạng hay chọn một cái không."
    ],
    asks: [
      "Chiến lược prompt nào hợp với giai đoạn này?",
      "Tức là: giữ độ rộng, cho nhóm đủ chất liệu để cân ở buổi sau, nhưng không để Claude chốt thay nhóm."
    ],
    facts: [
      "Brainstorm phải đòi độ rộng thẳng ra: nhiều ý, khác nhau. Chấm ở bước riêng, với tiêu chí rõ. Chấm ngay lúc nghĩ ý thì ý lạ bị loại trước khi kịp xuất hiện.",
      "Đòi “chỉ những ý chắc chắn hiệu quả” ngay lúc nghĩ ý là tự cắt mất độ rộng. Ý được tin chắc nhất thường là ý quen thuộc.",
      "Giao phần làm, giữ phần quyết. Có nhiều phương án thì đừng bảo Claude chọn: chấm theo tiêu chí nhóm đã thống nhất, người quyết và ghi lý do."
    ],
    opts: [
      { k: "A", gist: "Ask for several distinct options ranked by Claude's own judgment of feasibility, so the team can start with the most feasible ones.",
        why: [
          "Sai ở chỗ chấm sớm: xếp theo độ khả thi là chấm ngay lúc nghĩ ý, theo thước Claude tự chọn (ý 1).",
          "Ý khó làm mà đáng giá bị đẩy xuống cuối trước khi nhóm kịp cân (ý 2). Độ khả thi là một tiêu chí nhóm sẽ dùng ở buổi sau, cùng các tiêu chí khác (ý 3)."
        ] },
      { k: "B", gist: "Ask for a single recommended option with strong reasoning, since one well-argued option is a clearer starting point than several weakly argued ones.",
        why: [
          "Sai: đi ngược đúng điều đề nói, nhóm cần độ rộng (ý 1). Một phương án thì buổi sau không có gì để cân.",
          "Claude chốt thay nhóm ngay từ vòng đầu (ý 3)."
        ] },
      { k: "C", gist: "Ask for several distinct options, each with its trade-offs stated, and hold off on any single recommendation this round.",
        why: [
          "Giữ độ rộng: nhiều phương án, khác nhau (ý 1). Đánh đổi của từng phương án là mô tả được gì, mất gì, không phải xếp hạng. Nó là chất liệu cho buổi cân nhắc sau.",
          "Không chọn phương án nào, nên quyết định vẫn nằm ở nhóm, ở đúng buổi đã định (ý 3)."
        ] },
      { k: "D", gist: "Ask for several distinct options and have Claude recommend the strongest one with reasons, so the team begins from a front-runner.",
        why: [
          "Có độ rộng, nhưng rồi chốt luôn một phương án dẫn đầu. Buổi sau nhóm dễ bàn quanh lựa chọn của Claude thay vì cân đều các phương án (ý 3).",
          "Dễ bị cuốn vì nghe như được cả hai: vừa nhiều phương án vừa có gợi ý. Nhưng đề đã nói việc cân và chọn làm ở buổi riêng. Gợi ý ở vòng này là chấm sớm (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 1.4, phần “Brainstorm: đòi độ rộng, chấm ở bước sau”", href: NOTES + "#l-1-4" },
      { label: "Bài 4.2, mục “Lập kế hoạch: Claude soạn, người duyệt”: có nhiều phương án thì đừng bảo Claude chọn", href: NOTES + "#l-4-2" }
    ]
  },
  {
    de: 3, n: 56, total: 75, sub: "2.1", subName: "Đúng và đủ: kiểm chỗ dễ sai trước",
    answer: "D",
    ask: "A customer-success team member checks a Claude-generated customer health-check report against the agreed list of deliverables. All five required topics are present, but the renewal-risk section names just one risk factor, whereas the specification requires renewal risk to be assessed across pricing, product fit, and stakeholder change. Which conclusion is best supported?",
    scene: [
      "Một nhân viên chăm sóc khách hàng đối chiếu báo cáo sức khỏe khách hàng do Claude soạn với danh sách sản phẩm bàn giao đã thống nhất.",
      "Đủ cả năm chủ đề bắt buộc. Nhưng mục rủi ro gia hạn chỉ nêu một yếu tố, trong khi bản đặc tả đòi xét ba mặt: giá, độ hợp của sản phẩm, và thay đổi người liên quan phía khách (stakeholder change).",
      "Chỗ khó: nhìn theo đề mục thì đủ. Phải nhìn vào bên trong một mục mới thấy thiếu."
    ],
    asks: [
      "Kết luận nào có cơ sở nhất?",
      "Tức là: đánh giá đúng mức độ thiếu, không nói quá, không nói giảm, và chọn đúng việc làm tiếp."
    ],
    facts: [
      "Completeness (độ đầy đủ): output có làm hết những gì yêu cầu đòi không. Đo bằng yêu cầu, không đo bằng chủ đề.",
      "Đo độ đủ: chép yêu cầu thành danh sách, rồi đánh dấu từng dòng là đã trả lời, trả lời một nửa, hay chưa có. Ghi phần thiếu để đưa vào lần yêu cầu sửa.",
      "Đừng chuyển cho người khác “tự xem còn thiếu gì”. Người nhận không có danh sách yêu cầu của bạn, nên khó phát hiện chỗ thiếu hơn bạn."
    ],
    opts: [
      { k: "A", gist: "Completeness can't be judged from the specification alone, so the customer should review the report and say whether the renewal-risk depth is enough.",
        why: [
          "Sai: bản đặc tả nói rõ phải xét ba mặt. Đó chính là thước đo độ đủ (ý 1).",
          "Nó đẩy việc tìm chỗ thiếu sang khách, đúng người không có danh sách và đang chờ một báo cáo dùng được (ý 3)."
        ] },
      { k: "B", gist: "The report fails the specification, because a section that covers only one of three required risk dimensions counts as a missing section.",
        why: [
          "Sai ở cách tính: mục có mặt, trả lời một trong ba mặt là “trả lời một nửa”, không phải “chưa có” (ý 2).",
          "Gọi là thiếu cả mục thì đánh giá sai mức độ, và không chỉ ra chỗ phải sửa: chỉ cần bổ sung hai mặt còn thiếu.",
          "Dễ bị cuốn vì nó đúng ở chỗ báo cáo chưa đạt. Nhưng lý do nó đưa ra sai."
        ] },
      { k: "C", gist: "The report meets the specification, because all five required topics appear and a renewal-risk section is present.",
        why: [
          "Sai: đo độ đủ bằng đề mục, không bằng yêu cầu (ý 1). Có đề mục chưa có nghĩa là đã làm đủ việc mục đó đòi.",
          "Gửi đi như vậy thì khách nhận một mục rủi ro gia hạn thiếu hai trong ba mặt đã thống nhất."
        ] },
      { k: "D", gist: "The report satisfies the topic-level requirements, but the renewal-risk section falls short of the specification and should be expanded before delivery.",
        why: [
          "Đánh giá đúng từng mức: năm chủ đề đã có, mục rủi ro gia hạn mới trả lời một nửa (ý 1, 2).",
          "Bước tiếp đúng: đổi phát hiện thành yêu cầu cụ thể, bổ sung phần giá, độ hợp sản phẩm, thay đổi người liên quan, rồi mới giao (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 2.1, mục “Đo độ đủ bằng một danh sách viết trước”: đã trả lời, trả lời một nửa, hay chưa có", href: NOTES + "#l-2-1" },
      { label: "Bài 2.0, mục “Sáu kiểu lỗi hay gặp”: bỏ sót là kiểu khó thấy nhất", href: NOTES + "#l-2-0" }
    ]
  },
  {
    de: 3, n: 57, total: 75, sub: "4.1", subName: "Phân tích use case",
    answer: "CE",
    ask: "An operations lead is matching production tasks to what Claude does well, so the team's expectations stay realistic. Which two tasks play to Claude's strengths most clearly? (Select two.)",
    scene: [
      "Một trưởng nhóm vận hành đang xếp các việc thật của đội vào chỗ Claude mạnh, để cả đội kỳ vọng cho đúng.",
      "Năm việc rất khác nhau: canh luồng dữ liệu cảm biến theo thời gian thực, ra phán quyết pháp lý, soạn email cho khách, tính giá trị tất toán hợp đồng phái sinh, tổng hợp nhiều tài liệu dài.",
      "Chỗ khó: việc nào nghe cũng như “AI làm được”. Phải tách việc Claude giỏi thật với việc cần thêm công cụ, hay việc phải để người quyết."
    ],
    asks: [
      "Hai việc nào hợp với thế mạnh của Claude rõ nhất?",
      "Tức là: tìm hai việc làm bằng chữ, đầu ra kiểm được, sai thì người kịp sửa.",
      "Soi từng phương án: việc này cần đọc và viết, hay cần số chính xác, dữ liệu đang chạy, hay một người đứng tên chịu trách nhiệm?"
    ],
    facts: [
      "Việc hợp Claude: nhiều chữ, mô tả rõ được, đầu ra kiểm được, sai thì dễ thấy. Ví dụ notes nêu: tóm tắt biên bản họp, soạn nháp email, đổi định dạng tài liệu.",
      "Việc chưa hợp, trừ khi bổ sung: cần dữ liệu mới Claude chưa thấy, hoặc phép tính chính xác. Claude sinh chữ bằng cách đoán chữ tiếp theo, nên con số có thể bị “đoán” chứ không được tính. Phải đưa dữ liệu vào, cho chạy code.",
      "Việc cần người: có hậu quả cho người khác, phải có người đứng tên. Pháp lý còn là lĩnh vực rủi ro cao trong Usage Policy: người có chuyên môn duyệt trước khi output tới người bị ảnh hưởng.",
      "Claude mạnh ở tóm tắt, viết lại, chỉnh giọng cho người đọc. Các model hiện tại có context window (lượng chữ đọc được trong một lần) 1M token, đủ cho nhiều tài liệu dài."
    ],
    opts: [
      { k: "A", gist: "Watch a live stream of sensor readings and raise an alert the moment an anomaly appears.",
        why: [
          "Sai ở chỗ coi Claude là hệ thống canh trực. Việc này đòi theo dõi liên tục một luồng số đo và báo ngay từng lúc, không phải đọc rồi viết.",
          "Nó lại toàn số đo, cần ngưỡng chính xác và dữ liệu đang chảy vào. Đó là nhóm “chưa hợp, trừ khi bổ sung” (ý 2), không phải chỗ Claude mạnh rõ nhất."
        ] },
      { k: "B", gist: "Hand down a legally binding ruling that rests only on Claude's analysis of the case files.",
        why: [
          "Sai ở chữ “binding” (ràng buộc) và “solely” (chỉ dựa vào). Phán quyết pháp lý có hậu quả thật cho người khác và phải có người đứng tên. Đó là việc cần người (ý 3).",
          "Pháp lý còn là lĩnh vực rủi ro cao: người có chuyên môn phải duyệt trước. Ở đây không có ai, Claude quyết luôn.",
          "Dễ bị cuốn vì đọc và phân tích hồ sơ vụ việc đúng là việc Claude làm tốt. Nhưng phần Claude giỏi là soạn bản phân tích, còn phần quyết vẫn là của người."
        ] },
      { k: "C", gist: "Draft an email to a customer, pitched to the audience with the right tone, which a person reviews before it goes out.",
        why: [
          "Đúng việc nhiều chữ, đầu ra kiểm được (ý 1). Chỉnh giọng và mức từ cho người đọc là chỗ Claude mạnh (ý 4).",
          "“under human review” (có người duyệt) giữ nó ở vùng an toàn: sai thì người duyệt sửa trước khi khách đọc."
        ] },
      { k: "D", gist: "Work out the exact settlement value of a derivatives contract from live market data.",
        why: [
          "Sai ở hai chỗ cùng lúc: “precise” (chính xác) và “live market inputs” (dữ liệu thị trường đang chạy). Cả hai đều thuộc nhóm chưa hợp, trừ khi bổ sung (ý 2).",
          "Không chạy code thì con số có thể bị đoán, mà giọng vẫn rất chắc. Không có nguồn dữ liệu trực tiếp thì Claude không có giá đang chạy. Sai một con số tất toán là mất tiền thật."
        ] },
      { k: "E", gist: "Pull many long source documents together into one executive summary.",
        why: [
          "Đúng việc đọc nhiều, viết gọn: tổng hợp và tóm tắt là thế mạnh rõ của Claude (ý 1, 4).",
          "Context window lớn cho Claude đọc nhiều tài liệu dài trong một lần. Đầu ra là chữ, người đọc đối chiếu được với tài liệu gốc."
        ] }
    ],
    refs: [
      { label: "Bài 4.1, bảng “Việc nào hợp Claude, việc nào chưa, việc nào cần người”: nhiều chữ và kiểm được thì hợp, phép tính chính xác và tin mới thì phải bổ sung, việc có hậu quả thì người quyết", href: NOTES + "#l-4-1" },
      { label: "Bài 4.5, bảng bốn đặc tính: mạnh ở tóm tắt, viết lại, hụt ở phép tính chính xác, nên cho Claude chạy code", href: NOTES + "#l-4-5" },
      { label: "Bài 6.1, mục “Vùng vàng”: pháp lý là lĩnh vực rủi ro cao, người có chuyên môn duyệt trước", href: NOTES + "#l-6-1" }
    ]
  },
  {
    de: 3, n: 58, total: 75, sub: "1.3", subName: "Lặp prompt: chẩn đoán, đổi một chỗ, thử lại",
    answer: "C",
    ask: "A prompt has been revised eight times, and over the last four attempts the output quality has stopped improving. What is the most appropriate conclusion?",
    scene: [
      "Một prompt đã sửa tám lần. Bốn lần gần nhất, chất lượng output đứng yên.",
      "Chỗ khó: bốn vòng liền không khá lên nghĩa là đổi chữ trong prompt không còn tác dụng. Câu hỏi là làm gì tiếp: nhận luôn bản hiện tại, bỏ việc, sửa tiếp, hay đổi hướng."
    ],
    asks: [
      "Kết luận nào hợp lý nhất?",
      "Tức là: nhận ra lúc vòng lặp hết tác dụng, và chọn bước tiếp theo vẫn đưa việc tới chỗ đạt.",
      "Soi từng phương án: nó còn giữ tiêu chí chất lượng không, còn báo cho người liên quan không, hay cứ lặp tiếp mà không có lý do?"
    ],
    facts: [
      "Lặp prompt là vòng chẩn đoán → đổi một chỗ → thử lại, cho tới khi output đạt tiêu chí đặt từ trước.",
      "Notes ghi rõ lúc dừng: output đạt tiêu chí ổn định, hoặc vài vòng gần nhất không cải thiện thêm. Sửa nhiều vòng mà output vẫn mang lỗi của hướng ban đầu thì bắt đầu lại theo cách khác.",
      "Đổi cách làm có nhiều đường: chia việc thành bước nhỏ, đưa thêm nguồn, tăng effort, thử model mạnh hơn. Việc rơi đúng vào giới hạn của Claude thì để người làm phần đó.",
      "Gõ lại hay sửa vặt khi điều kiện gây ra output yếu vẫn còn thì chỉ nhận một bản khác, không chắc tốt hơn."
    ],
    opts: [
      { k: "A", gist: "Stop iterating and take the current output as final, whatever problems it still has.",
        why: [
          "Dừng thì đúng, nhưng nhận luôn bản còn lỗi là bỏ tiêu chí (ý 1). Dừng sửa prompt không có nghĩa là thôi đòi output đạt.",
          "Dễ bị cuốn vì bốn vòng không khá lên nghe như đã hết cách. Nhưng chỉ hết cách với kiểu sửa này. Bản còn lỗi đem đi dùng thì lỗi đi theo."
        ] },
      { k: "B", gist: "Stop iterating and drop the task altogether, without telling the stakeholders.",
        why: [
          "Bỏ việc là né vấn đề, trong khi vẫn còn cách làm khác (ý 3).",
          "Im lặng với stakeholder còn tệ hơn: người đang chờ kết quả không biết việc đã dừng, không ai chuẩn bị phương án thay."
        ] },
      { k: "C", gist: "Treat it as diminishing returns: move to human review or try a different approach.",
        why: [
          "Đúng chỗ dừng của vòng lặp: vài vòng gần nhất không cải thiện thì thôi sửa chữ (ý 2). “diminishing returns” (lợi ích giảm dần) là đúng tên hiện tượng này.",
          "Bước tiếp vẫn đưa việc tới đích: người duyệt và sửa nốt phần còn thiếu, hoặc đổi hẳn cách làm như chia bước, thêm nguồn, đổi model (ý 3)."
        ] },
      { k: "D", gist: "Keep iterating without end, since every extra attempt is bound to raise quality.",
        why: [
          "Sai ở giả định “always improve” (lúc nào cũng tốt lên). Bốn vòng vừa rồi đã cho thấy điều ngược lại.",
          "Điều kiện gây ra output yếu vẫn nằm nguyên. Lặp tiếp chỉ ra thêm bản khác, tốn thêm thời gian và hạn mức (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Dừng, bắt đầu lại, hay lưu”: vài vòng gần nhất không cải thiện thì dừng, sửa nhiều vòng mà vẫn mang lỗi cũ thì bắt đầu lại", href: NOTES + "#l-1-3" },
      { label: "Bài 7.2, bảng “Khớp cần gạt với bằng chứng”: đổi cách làm theo đúng chỗ thiếu (nguồn, chia bước, effort, model)", href: NOTES + "#l-7-2" },
      { label: "Bài 4.1: việc rơi vào giới hạn của Claude thì bổ sung, hoặc để người làm", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 3, n: 59, total: 75, sub: "6.2", subName: "Dữ liệu nhạy cảm và quy định",
    answer: "BE",
    ask: "A customer-success associate at Noventra, Ltd. is about to upload a customer file so Claude can analyze it with Code Execution, and reviews the plan first. Which two practices reflect sound data handling? (Select two.)",
    scene: [
      "Một nhân viên chăm sóc khách hàng sắp tải file của khách lên để Claude phân tích bằng Code Execution (tính năng chạy code, nay gọi là “Create and edit files”).",
      "File có thể chứa trường dữ liệu được quản lý, mà chính sách công ty bắt che trước khi đưa vào.",
      "Chỗ khó: ba phương án sai đều dựa vào một lý do nghe có vẻ ổn: “sandboxed” (chạy trong môi trường cách ly), “internal” (dùng nội bộ), “urgency” (đang gấp)."
    ],
    asks: [
      "Hai cách làm nào đúng với xử lý dữ liệu cẩn trọng?",
      "Tức là: trước khi tải lên, phải làm gì với chính sách, và làm gì với chính file đó.",
      "Soi từng phương án: nó kiểm trước khi gửi, hay lấy một lý do để bỏ qua bước kiểm?"
    ],
    facts: [
      "Mọi quyết định về dữ liệu nằm trước lúc gửi. File đã tải lên thì nằm trong chat, theo luật lưu trữ của tài khoản. Xóa chat chỉ giảm được, không gỡ hết.",
      "Trước khi gửi, hỏi: dữ liệu thuộc nhóm nào, chính sách công ty nói gì về nhóm đó? Vượt mức được phép hoặc còn phân vân thì chuyển lên người phụ trách theo đường chuyển lên (escalation path) đã định: tuân thủ, an ninh thông tin, pháp chế.",
      "Tối thiểu hóa dữ liệu (data minimization): chỉ đưa phần việc thật sự cần. Cột không cần thì bỏ, phần nhạy cảm thì che (redact) hoặc đổi mã.",
      "Code execution chạy code trong một môi trường cách ly. Cách ly là chuyện code chạy ở đâu. Nó không làm dữ liệu bớt nhạy cảm, không thay được chính sách. “Chỉ dùng nội bộ” cũng không phải lý do được phá chính sách."
    ],
    opts: [
      { k: "A", gist: "Skip reviewing the upload because the task is urgent, even though the file may hold regulated fields that policy says must be redacted before any Code Execution.",
        why: [
          "Sai ở chỗ để chuyện gấp gạt bước bắt buộc. Chính phương án đã nói: chính sách bắt che các trường đó trước khi chạy code.",
          "Gửi rồi mới biết file có trường được quản lý thì đã muộn, dữ liệu đã nằm trong chat (ý 1)."
        ] },
      { k: "B", gist: "Check that the planned Code Execution task fits the organization's data-classification policy, and escalate to the right contact if the data is more sensitive than approved use allows.",
        why: [
          "Đúng câu hỏi đầu tiên trước khi gửi: dữ liệu này thuộc nhóm nào, chính sách cho làm gì với nó (ý 2).",
          "Vượt mức được phép thì không tự quyết mà chuyển lên đúng người. Việc vẫn đi tiếp được khi người có thẩm quyền đồng ý, không bỏ ngang."
        ] },
      { k: "C", gist: "Upload the whole customer file unredacted and unreviewed, assuming the sandboxed environment means the classification policy no longer applies.",
        why: [
          "Sai ở giả định: môi trường cách ly là nơi code chạy, không phải giấy phép bỏ qua chính sách (ý 4).",
          "Gửi nguyên file là gửi cả những cột việc phân tích không cần (ý 3). Đã tải lên thì không rút lại hết được (ý 1).",
          "Dễ bị cuốn vì “sandboxed” (cách ly) nghe như đã an toàn sẵn. Nhưng an toàn cho hệ thống xung quanh khác với được phép đưa dữ liệu khách vào."
        ] },
      { k: "D", gist: "Bypass the classification policy because the task is internal, treating sandboxed processing as exempt from the review the policy requires before sensitive data is uploaded.",
        why: [
          "Gộp hai lý do sai: “internal” (nội bộ) và “sandboxed” (cách ly). Không cái nào là ngoại lệ mà chính sách cho phép (ý 4).",
          "Chính sách bắt kiểm trước khi tải dữ liệu nhạy cảm lên. Tự cho mình được miễn là phá đúng bước đó."
        ] },
      { k: "E", gist: "Go through the file for sensitive, confidential, or regulated fields before uploading, and remove or redact any that the planned analysis does not need.",
        why: [
          "Đúng tối thiểu hóa dữ liệu: bỏ hoặc che phần việc phân tích không cần, và làm trước khi gửi (ý 1, 3).",
          "Phân tích vẫn chạy được trên phần còn lại. Đây cũng là đáp án câu mẫu 3 của guide: xử lý dữ liệu trước khi tải lên, không bỏ việc."
        ] }
    ],
    refs: [
      { label: "Bài 6.2, mục “Kiểm trước khi gửi” và “Ba cách bớt dữ liệu mà việc vẫn xong”", href: NOTES + "#l-6-2" },
      { label: "Bài Nền tảng Domain 6, mục “Chính sách AI của tổ chức”: phân loại dữ liệu và đường chuyển lên", href: NOTES + "#l-6-0" },
      { label: "Bài Nền tảng Domain 3, định nghĩa Code execution: chạy code trong môi trường cách ly", href: NOTES + "#l-3-0" }
    ]
  },
  {
    de: 3, n: 60, total: 75, sub: "3.3", subName: "Chọn model theo chi phí, tốc độ, chất lượng",
    answer: "C",
    ask: "An operations assistant needs a model for a recurring meeting-summary job. The job doesn't call for deep reasoning and runs at moderate volume. Which choice best balances cost, speed, and quality?",
    scene: [
      "Một trợ lý vận hành chọn model cho việc tóm tắt cuộc họp, lặp lại đều đặn.",
      "Hai dữ kiện quyết định: “does not require deep reasoning” (không cần lập luận sâu) và “moderate volume” (số lượng vừa phải).",
      "Chỗ khó: mỗi phương án gắn một câu mô tả tầng model. Phải soi cả tầng được chọn lẫn câu mô tả đi kèm có đúng không."
    ],
    asks: [
      "Lựa chọn nào cân bằng nhất giữa chi phí, tốc độ và chất lượng?",
      "Tức là: việc hằng ngày, không khó, không quá nhiều, thì tầng nào là điểm cân bằng.",
      "Soi từng phương án: tầng đó có hợp việc không, và câu mô tả tầng đó có đúng với docs không."
    ],
    facts: [
      "Haiku: tầng nhỏ nhất, nhanh nhất, nhẹ hạn mức nhất. Hợp với trả lời nhanh, tóm tắt đơn giản, trích thông tin, phân loại, nhất là khi việc nhiều và cần nhanh.",
      "Sonnet: tầng giữa, cho việc hằng ngày như viết, phân tích, tóm tắt. Anthropic khuyên chọn Sonnet khi chưa chắc.",
      "Opus: lập luận sâu nhất, nhưng chậm hơn và tốn hạn mức hơn. Dùng Opus cho việc tầng nhẹ làm được là tốn mà không được gì.",
      "Người dùng app chọn trong các model có sẵn. Huấn luyện model riêng là việc của developer, nằm ngoài vai người thi Associate."
    ],
    opts: [
      { k: "A", gist: "Haiku, described as appropriate only when the job needs the quickest possible turnaround.",
        why: [
          "Mô tả sai: Haiku không chỉ dành cho lúc cần nhanh nhất. Docs xếp nó cho cả tóm tắt đơn giản, trích thông tin, phân loại (ý 1).",
          "Dễ bị cuốn vì việc không cần lập luận sâu nghe hợp tầng nhẹ. Nhưng đề hỏi điểm cân bằng cho việc hằng ngày, số lượng vừa, không đòi tốc độ tối đa. Đó là chỗ của Sonnet (ý 2)."
        ] },
      { k: "B", gist: "Opus, which favors depth at the price of higher latency and heavier rate-limit use.",
        why: [
          "Mô tả đúng về Opus, nhưng việc này không cần độ sâu đó (ý 3).",
          "Chọn Opus là trả thêm thời gian chờ và hạn mức cho một bản tóm tắt mà tầng nhẹ hơn làm được."
        ] },
      { k: "C", gist: "Sonnet, which gives solid quality with moderate latency and rate-limit use for everyday work.",
        why: [
          "Đúng tầng cân bằng cho việc hằng ngày (ý 2). Việc không khó, không quá nhiều, không đòi nhanh nhất: đúng chỗ của tầng giữa.",
          "Câu mô tả đi kèm cũng khớp docs: chất lượng ổn, thời gian chờ và hạn mức vừa phải."
        ] },
      { k: "D", gist: "A custom model that the Associate-level user would have to build and train alone.",
        why: [
          "Sai vai: người dùng app chọn model có sẵn, không tự huấn luyện model (ý 4).",
          "Một việc tóm tắt cuộc họp càng không cần tới. Ba tầng có sẵn đã phủ đủ việc này."
        ] }
    ],
    refs: [
      { label: "Bài 3.3, bảng “Đề kể / Ưu tiên / Chọn”: việc hằng ngày, chưa chắc thì Sonnet, việc nhiều, đơn giản, cần nhanh thì Haiku", href: NOTES + "#l-3-3" },
      { label: "Bài 3.2, bảng ba tầng: Haiku hợp tóm tắt đơn giản, Sonnet dùng hằng ngày, Opus chậm và tốn hơn", href: NOTES + "#l-3-2" }
    ]
  },
  {
    de: 3, n: 61, total: 75, sub: "2.3", subName: "Kiểm từng khẳng định",
    answer: "A",
    ask: "You are checking a Claude-written report that sounds confident from start to finish. Which question best tells a merely plausible report apart from a verified one?",
    scene: [
      "Một báo cáo Claude viết, giọng chắc chắn từ đầu tới cuối.",
      "Chỗ khó: đề hỏi câu nào tách được “plausibility” (nghe có vẻ đúng) với “verification” (đã kiểm chứng). Ba phương án sai đều là câu hỏi có thật khi biên tập, chỉ là không kiểm được đúng sai."
    ],
    asks: [
      "Câu hỏi nào tách rõ nhất giữa nghe có vẻ đúng và đã kiểm?",
      "Tức là: tìm câu hỏi đem từng điều báo cáo nói ra so với một nguồn nằm ngoài Claude.",
      "Soi từng phương án: nó hỏi về cách trình bày, hay hỏi khẳng định có căn cứ không?"
    ],
    facts: [
      "Claude viết trôi chảy, có cấu trúc, giọng chắc chắn cả khi đúng lẫn khi sai. Giọng tự tin chỉ cho biết cách viết, không cho biết câu đó đúng không.",
      "Kiểm chứng là so một khẳng định với nguồn đang nắm sự thật đó: văn bản gốc, dữ liệu gốc, tài liệu được đưa vào. Rồi ghi lại khớp, không khớp, hay không tìm thấy.",
      "Kiểm theo từng khẳng định: tách bản nháp thành từng câu nói một điều đúng hoặc sai, mỗi câu đạt hay trượt riêng.",
      "Độ dài, bố cục, câu văn hay là chuyện hình thức. Chấm hay sửa hình thức không đụng tới chuyện đúng sai."
    ],
    opts: [
      { k: "A", gist: "Can every specific claim be traced back to a credible source or to the material that was provided?",
        why: [
          "Đúng định nghĩa kiểm chứng: đem từng khẳng định so với nguồn đáng tin hoặc tài liệu đầu vào (ý 2, 3).",
          "Câu nào không truy được về nguồn thì lộ ra ngay, dù viết chắc đến đâu (ý 1). Chỉ câu hỏi này tách được nghe có vẻ đúng với đã kiểm."
        ] },
      { k: "B", gist: "Does the report treat the subject thoroughly, judging by how long it is and how many sections it has?",
        why: [
          "Đo độ đủ bằng độ dài và số mục là đo hình thức (ý 4). Báo cáo dài, nhiều mục vẫn có thể thiếu đúng phần được hỏi.",
          "Dễ bị cuốn vì “comprehensively” (đầy đủ) nghe giống kiểm độ đủ. Nhưng kiểm độ đủ là so với yêu cầu, không phải đếm trang. Và nó không chạm tới chuyện từng câu có căn cứ không."
        ] },
      { k: "C", gist: "Does the report start with a clear, well-framed statement of its main finding?",
        why: [
          "Mở bài rõ là chuyện trình bày (ý 4). Một kết luận sai vẫn có thể được nêu rất rõ ở câu đầu.",
          "Câu mở càng chắc càng dễ làm người đọc tin, đúng cái giọng tự tin mà đề đang nhắc (ý 1)."
        ] },
      { k: "D", gist: "Does the report vary its sentence structure from one section to the next?",
        why: [
          "Câu văn đa dạng là văn phong, không liên quan đúng sai (ý 4).",
          "Báo cáo bịa số liệu vẫn có thể viết câu rất hay."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng Domain 2, mục “Giọng tự tin không phải là bằng chứng” và “Kiểm là so với một nguồn nằm ngoài Claude”", href: NOTES + "#l-2-0" },
      { label: "Bài 2.3, mục “Sau khi Claude viết: kiểm từng khẳng định”", href: NOTES + "#l-2-3" },
      { label: "Bài 0.3, luật 1 và luật 3: độ tự tin không phải bằng chứng, sửa hình thức không sửa được nội dung", href: NOTES + "#l-0-3" }
    ]
  },
  {
    de: 3, n: 62, total: 75, sub: "3.1", subName: "Chọn tính năng: chat, Project, Research, artifact",
    answer: "D",
    ask: "A finance manager needs a Claude feature for work that requires deterministic calculations across a spreadsheet with several tabs. Which choice fits the requirement best?",
    scene: [
      "Một trưởng phòng tài chính cần tính toán trên một bảng tính nhiều tab.",
      "Chỗ khó: “deterministic calculations” (phép tính cố định, cùng đầu vào luôn ra cùng kết quả). Con số phải được tính thật, không phải viết ra cho giống.",
      "Bốn phương án là bốn tính năng có thật. Phải biết tính năng nào thật sự chạy phép tính."
    ],
    asks: [
      "Chọn tính năng nào hợp nhất?",
      "Tức là: tính năng nào cho Claude chạy phép tính trên file tải lên, và để lại thứ người dùng kiểm lại được."
    ],
    facts: [
      "Claude sinh chữ bằng cách đoán chữ tiếp theo. Chỉ “đọc” rồi viết ra con số thì số có thể bị đoán, mà giọng vẫn rất chắc. Cần tính chính xác thì cho Claude chạy code.",
      "Code execution: Claude chạy code trong một môi trường cách ly để tạo file, hoặc phân tích file bạn tải lên. Trong app, cài đặt này nay tên là “Create and edit files”. Đọc file XLSX cũng cần nó.",
      "Research chạy nhiều lượt tìm kiếm trên web và công cụ đã kết nối, rồi viết bản tổng hợp. Nó dùng để tìm và dẫn nguồn, không phải để tính.",
      "Artifact là nội dung đứng riêng, mở ở khung bên cạnh chat để sửa, xuất, chia sẻ. Nó là chỗ trình bày kết quả, và chính nó cũng cần code execution."
    ],
    opts: [
      { k: "A", gist: "Use an ordinary chat prompt, which writes text without running any code and so gives none of the reproducible computed output this multi-tab job needs.",
        why: [
          "Chính phương án đã nói điểm yếu: viết chữ, không chạy code. Con số ra kiểu đó là đoán, không phải tính (ý 1).",
          "Bảng nhiều tab cần cộng, đối chiếu chéo giữa các tab. Một con số đoán sai là cả báo cáo sai."
        ] },
      { k: "B", gist: "Use Research, which collects and synthesizes outside sources and is not meant for deterministic computation on an uploaded spreadsheet.",
        why: [
          "Sai việc: Research để tìm và tổng hợp nguồn bên ngoài (ý 3). Dữ liệu ở đây đã nằm sẵn trong bảng tính.",
          "Dễ bị cuốn vì Research nghe như tính năng mạnh nhất cho việc phân tích. Nhưng phân tích ở đây là tính trên file, không phải đi tìm thông tin."
        ] },
      { k: "C", gist: "Use an Artifact by itself, which gives a stable, editable place for the result but does not carry out the deterministic computation Code Execution would run.",
        why: [
          "Artifact là chỗ đặt kết quả, không phải chỗ chạy phép tính (ý 4).",
          "Kết quả trình bày đẹp ở khung bên vẫn chỉ đúng khi con số đã được tính thật trước đó."
        ] },
      { k: "D", gist: "Use Code Execution, which runs code in a sandbox to do the calculations on the uploaded file and returns results the associate can check.",
        why: [
          "Đúng tính năng chạy phép tính: Claude viết và chạy code trên chính file tải lên, cùng đầu vào thì cùng kết quả (ý 1, 2).",
          "Code và kết quả để lại cho người dùng xem lại, so với vài tổng đã biết. Kiểm được thì mới tin được."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng Domain 3, định nghĩa Code execution: chạy code trong môi trường cách ly, phân tích file tải lên, nay tên “Create and edit files”", href: NOTES + "#l-3-0" },
      { label: "Bài 4.5, bảng bốn đặc tính: tính sai mà giọng rất chắc thì cho Claude chạy code để tính", href: NOTES + "#l-4-5" },
      { label: "Bài 3.1, bảng chọn tính năng: Research để tìm và dẫn nhiều nguồn, artifact cho sản phẩm sẽ sửa và chia sẻ", href: NOTES + "#l-3-1" }
    ]
  },
  {
    de: 3, n: 63, total: 75, sub: "6.1", subName: "Việc nào giao cho Claude được",
    answer: "A",
    ask: "Using the Delegation competency from the AI Fluency Framework, a Claude associate is assessing a proposal for Claude to make final hiring decisions with no human review at all. Which classification best fits Delegation principles?",
    scene: [
      "Có đề xuất để Claude ra quyết định tuyển dụng cuối cùng, không có người duyệt.",
      "Người đánh giá dùng năng lực Delegation (giao việc) trong khung AI Fluency để xếp loại đề xuất này.",
      "Chỗ khó: bốn phương án chia hai cặp. Hai cái nói “phù hợp”, hai cái nói “không phù hợp”. Cặp sau còn phải chọn đúng lý do."
    ],
    asks: [
      "Cách xếp loại nào đúng với nguyên tắc Delegation?",
      "Tức là: việc này có giao trọn cho AI được không, và nếu không thì vì sao.",
      "Soi từng phương án: kết luận có đúng không, và lý do có đúng không."
    ],
    facts: [
      "Delegation là đặt mục tiêu và quyết có dùng AI không, lúc nào, dùng thế nào. Luật dùng xuyên Domain 4: giao phần làm, giữ phần quyết.",
      "Phần quyết là việc có hậu quả cho người khác, cần cân nhắc giá trị, phải có người chịu trách nhiệm. Notes lấy ví dụ đúng việc “loại ứng viên”. Trách nhiệm không chuyển sang công cụ.",
      "Việc làm là lĩnh vực rủi ro cao trong Usage Policy. Quyết định về một người cụ thể cần người có chuyên môn duyệt trước, và báo cho người đó là có dùng AI.",
      "Kiểm ngẫu nhiên vài ca sau khi đã gửi không tính là duyệt trước. Người bị quyết định sai đã nhận kết quả rồi."
    ],
    opts: [
      { k: "A", gist: "Not suitable for full AI delegation: hiring involves human judgment, accountability, and consequences that Delegation keeps under human ownership, not autonomous AI action.",
        why: [
          "Đúng kết luận và đúng lý do. Quyết định tuyển ai là phần quyết: hậu quả thật cho từng ứng viên, phải có người chịu trách nhiệm (ý 1, 2).",
          "Claude vẫn giúp được phần làm: tóm tắt hồ sơ, soạn bảng so sánh theo tiêu chí. Người có chuyên môn duyệt và quyết (ý 3)."
        ] },
      { k: "B", gist: "Suitable, with light human review of only a sample of decisions, even though Delegation keeps final hiring decisions under human ownership rather than after-the-fact sampling.",
        why: [
          "Sai ở chỗ coi kiểm mẫu là đủ. Kiểm mẫu sau khi quyết định đã đi thì phần lớn ứng viên nhận kết quả không ai duyệt (ý 4).",
          "Dễ bị cuốn vì “có người duyệt” nghe như đã có trách nhiệm. Nhưng duyệt phải đứng trước từng quyết định, không phải sau một phần."
        ] },
      { k: "C", gist: "Suitable for full AI delegation, on the view that speed matters more than the judgment, accountability, and consequences Delegation requires for final hiring decisions.",
        why: [
          "Đặt tốc độ lên trên trách nhiệm là ngược với Delegation (ý 1). Nhanh hơn không làm quyết định về con người bớt hệ trọng.",
          "Bỏ hẳn người duyệt ở lĩnh vực rủi ro cao là bỏ đúng điều kiện bắt buộc (ý 3)."
        ] },
      { k: "D", gist: "Not suitable, but only because of reliability concerns rather than accountability, even though Delegation treats final hiring decisions as needing human ownership however well the system performs.",
        why: [
          "Kết luận đúng, lý do sai. Chữ “only” (chỉ vì) gắn việc giữ lại cho người vào độ tin cậy của hệ thống.",
          "Theo lý do đó, hệ thống đủ chính xác là giao được. Nhưng trách nhiệm không chuyển sang công cụ, dù nó chạy tốt đến đâu (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng Domain 4, mục “Giao phần làm, giữ phần quyết”: loại ứng viên là phần quyết, trách nhiệm không chuyển sang công cụ", href: NOTES + "#l-4-0" },
      { label: "Bài 6.1, mục “Vùng vàng”: việc làm là lĩnh vực rủi ro cao, người có chuyên môn duyệt trước từng ca, kiểm mẫu sau khi gửi không đạt", href: NOTES + "#l-6-1" }
    ]
  },
  {
    de: 3, n: 64, total: 75, sub: "5.1", subName: "Dựng Project: instructions và knowledge",
    answer: "A",
    ask: "You are setting up a new Claude Project for one particular recurring workload. Which configuration step should come first?",
    scene: [
      "Bạn dựng một Project mới cho một việc lặp lại cụ thể.",
      "Bốn phương án là bốn bước có thật khi dựng Project: xác định mục đích, thêm tài liệu và chỉ dẫn, chạy thử, mời người dùng.",
      "Chỗ khó: bước nào cũng cần. Đề hỏi bước nào phải làm đầu tiên, tức bước mà các bước khác dựa vào."
    ],
    asks: [
      "Bước cấu hình nào làm trước tiên?",
      "Tức là: tìm bước mà thiếu nó thì không biết đưa tài liệu gì, viết chỉ dẫn gì, thử bằng gì, mời ai."
    ],
    facts: [
      "Project gồm instructions (cách làm, áp cho mọi chat), knowledge (tư liệu để tra) và các chat riêng. Instructions viết theo khung có phần “việc và phạm vi”: Claude làm gì, không làm gì ở đây.",
      "Knowledge chỉ nên giữ bản hiện hành, đã duyệt, và bỏ thứ không cần. File thừa làm nhiễu việc tìm và tốn hạn mức.",
      "Vấn đề trước, công cụ sau: hiểu ai dùng, cần kết quả gì, rồi mới chọn cách làm.",
      "Chia sẻ Project (gói Team, Enterprise) có hai mức quyền: Can view cho người dùng, Can edit cho người bảo trì. Ai được xem gì tùy độ nhạy của tài liệu bên trong."
    ],
    opts: [
      { k: "A", gist: "Pin down what the Project is for and which recurring tasks it has to handle.",
        why: [
          "Đây là bước các bước khác dựa vào. Biết việc và phạm vi thì mới viết được instructions (ý 1, 3).",
          "Biết việc cần gì thì mới chọn đúng tài liệu và bỏ thứ thừa (ý 2). Rồi mới có ca mẫu để thử, và biết nên mời ai với quyền gì (ý 4)."
        ] },
      { k: "B", gist: "Try the configured Project on a typical request from the workload.",
        why: [
          "Thử là bước kiểm sau khi đã cấu hình. Chưa có gì để thử thì chưa thử được.",
          "Muốn chấm kết quả thử cũng phải biết trước Project dùng để làm gì (ý 3)."
        ] },
      { k: "C", gist: "Add the reference materials and instructions the Project will depend on.",
        why: [
          "Đúng là việc phải làm, nhưng đứng sau. Chưa rõ mục đích thì không biết tài liệu nào cần, chỉ dẫn nên nói gì (ý 1, 2).",
          "Dễ bị cuốn vì đây là phần “dựng” thấy rõ nhất của Project. Nhưng tải tài liệu trước rồi mới nghĩ mục đích thì dễ ra knowledge lẫn bản thừa, instructions chung chung."
        ] },
      { k: "D", gist: "Invite collaborators and set the right access levels for them.",
        why: [
          "Mời người khi Project còn trống là để họ dùng một cấu hình chưa xong.",
          "Mức quyền phụ thuộc vào việc Project làm gì và tài liệu nhạy cỡ nào (ý 4). Những thứ đó chưa có."
        ] }
    ],
    refs: [
      { label: "Bài 5.1, bảng instructions hay knowledge và mục “Chọn tài liệu và đặt tên”", href: NOTES + "#l-5-1" },
      { label: "Bài 5.3, bộ khung bảy phần: phần 2 là việc và phạm vi", href: NOTES + "#l-5-3" },
      { label: "Bài 4.1, mục “Bắt đầu từ vấn đề, không từ công cụ”", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 3, n: 65, total: 75, sub: "4.5", subName: "Nói với stakeholder về giá trị và giới hạn",
    answer: "BC",
    ask: "A communications specialist will explain Claude's role in a workflow to several stakeholder groups and has preparation to finish before writing any messages. Which two preparation steps must be done BEFORE drafting the messages? (Select two.)",
    scene: [
      "Một chuyên viên truyền thông sắp giải thích vai trò của Claude trong một quy trình cho nhiều nhóm stakeholder (bên liên quan).",
      "Chữ quyết định: “BEFORE drafting” (trước khi soạn). Đề chỉ hỏi phần chuẩn bị.",
      "Chỗ khó: cả năm phương án đều là việc có thật trong một đợt truyền thông. Ba cái chỉ làm được sau khi đã có bản soạn."
    ],
    asks: [
      "Hai bước chuẩn bị nào phải xong trước khi soạn thông điệp?",
      "Tức là: muốn soạn được thì phải biết nói với ai, và nói điều gì.",
      "Soi từng phương án: nó có cần bản soạn có sẵn mới làm được không?"
    ],
    facts: [
      "Người đọc đích: họ biết gì rồi, cần gì, đọc xong phải làm gì. Nhóm người đọc khác nền thì cần cách viết khác.",
      "Nói với stakeholder phải nói cả giá trị lẫn giới hạn: Claude làm phần nào, chỗ nào người vẫn duyệt. Không hứa “không lỗi”.",
      "Gửi, lưu trữ, tổ chức buổi hỏi đáp đều là việc sau khi đã có thông điệp."
    ],
    opts: [
      { k: "A", gist: "File the drafted messages in the corporate communications archive.",
        why: [
          "Lưu trữ cần bản soạn có sẵn. Chính phương án gọi nó là “drafted messages” (thông điệp đã soạn) (ý 3).",
          "Đây là bước cuối, không phải chuẩn bị."
        ] },
      { k: "B", gist: "Work out who the stakeholder groups are and what each one needs to understand.",
        why: [
          "Đúng bước chuẩn bị thứ nhất: biết nói với ai (ý 1). Lãnh đạo, người dùng hằng ngày, bộ phận tuân thủ: mỗi nhóm cần hiểu một điều khác.",
          "Không có bước này thì chỉ soạn được một bản chung, nhóm nào đọc cũng thiếu."
        ] },
      { k: "C", gist: "Pin down the key facts about Claude's role and the limits that apply to it.",
        why: [
          "Đúng bước chuẩn bị thứ hai: biết nói điều gì (ý 2). Claude làm phần nào, giới hạn ở đâu, chỗ nào người vẫn duyệt.",
          "Chốt trước một bộ sự thật dùng chung thì các bản cho từng nhóm không nói lệch nhau, và không hứa quá."
        ] },
      { k: "D", gist: "Send out the drafted messages and collect feedback to revise them.",
        why: [
          "Gửi và lấy phản hồi chỉ làm được khi đã có bản soạn (ý 3).",
          "Dễ bị cuốn vì lấy phản hồi nghe như bước cẩn thận. Nhưng đó là vòng sửa sau khi soạn, không phải chuẩn bị trước khi soạn."
        ] },
      { k: "E", gist: "Book a follow-up forum to field questions the messages raise.",
        why: [
          "Buổi hỏi đáp để xử lý câu hỏi mà thông điệp gây ra, tức là sau khi đã gửi (ý 3).",
          "Có ích, nhưng nằm ngoài phần đề hỏi."
        ] }
    ],
    refs: [
      { label: "Bài 4.5: nói cả giá trị lẫn giới hạn, hứa biện pháp chứ không hứa không lỗi", href: NOTES + "#l-4-5" },
      { label: "Bài 2.5, mục “Một nội dung, nhiều người đọc”: người đọc đích, mỗi nhóm một bản đúng mức của họ", href: NOTES + "#l-2-5" }
    ]
  },
  {
    de: 3, n: 66, total: 75, sub: "4.2", subName: "Research, lập kế hoạch, tối ưu quy trình",
    answer: "A",
    ask: "A Claude associate is looking for the bottleneck in a content workflow that takes too long to publish. It has five steps (research, drafting, internal review, legal review, publication), and last month's cycle-time data is available for each step. Which signal points to the bottleneck most directly?",
    scene: [
      "Quy trình nội dung có năm bước: nghiên cứu, soạn, duyệt nội bộ, duyệt pháp chế, đăng. Bài ra quá chậm.",
      "Có sẵn số liệu “cycle time” (thời gian xử lý mỗi bài ở từng bước) của tháng trước.",
      "Chỗ khó: đề cho sẵn số liệu cycle time, nên dễ nghĩ đáp án phải dùng nó. Nhưng đề hỏi tín hiệu “most directly” (trực tiếp nhất) chỉ ra nút thắt.",
      "Ví dụ minh họa:<pre><code>Duyệt pháp chế: 3 ngày/bài, 6 người duyệt song song, không bài nào chờ\nDuyệt nội bộ:   1 ngày/bài, 1 người duyệt, 15 bài đang chờ</code></pre>Bước mỗi bài mất lâu nhất chưa chắc là bước làm cả quy trình tắc."
    ],
    asks: [
      "Tín hiệu nào chỉ ra nút thắt trực tiếp nhất?",
      "Tức là: bước nào đang làm cả quy trình chậm lại, và dấu hiệu nào cho thấy điều đó mà không phải đoán.",
      "Soi từng phương án: nó đo thẳng chuyện việc dồn lại, hay đo một thứ khác rồi suy ra?"
    ],
    facts: [
      "Nút thắt cổ chai (bottleneck) là bước có sức xử lý thấp hơn lượng việc đổ tới. Nó quyết định cả quy trình ra được bao nhiêu bài.",
      "Việc tới nhanh hơn một bước xử lý kịp thì việc dồn lại trước bước đó. Hàng chờ dài, kéo dài qua nhiều tuần, là dấu hiệu trực tiếp.",
      "Thời gian xử lý mỗi bài cao chưa chắc là nút thắt: bước đó có thể có nhiều người làm song song, hoặc ít việc tới.",
      "Sơ đồ quy trình (process map) ghi từng bước: ai làm, mất bao lâu, chờ ở đâu. Kết luận về một bước phải dựa trên số đo, và vẫn là giả thuyết cho tới khi người chủ quy trình kiểm."
    ],
    opts: [
      { k: "A", gist: "The step with the longest queue, or the biggest backlog of items waiting to enter it.",
        why: [
          "Đúng dấu hiệu trực tiếp: bài dồn lại trước một bước nghĩa là bước đó không xử lý kịp lượng việc tới (ý 1, 2).",
          "Nó đo đúng hậu quả mà nút thắt gây ra, không suy ra từ một con số khác. Chỉ cần xem hàng chờ đó kéo dài, hay chỉ là một đợt dồn nhất thời."
        ] },
      { k: "B", gist: "The step whose contributors report the heaviest workload in their weekly status updates.",
        why: [
          "Người làm tự báo là cảm nhận, không phải số đo luồng việc (ý 4).",
          "Thấy bận có thể vì việc khó, vì kiêm nhiều việc khác, không phải vì bước đó làm tắc cả quy trình."
        ] },
      { k: "C", gist: "The step with the highest average cycle time per item over last month's runs.",
        why: [
          "Là bằng chứng phụ có ích, nhưng không trực tiếp. Mỗi bài mất lâu chưa chắc là tắc: bước đó có thể có nhiều người làm song song (ý 3).",
          "Ngược lại, một bước mỗi bài chỉ mất ít thời gian vẫn có thể là nút thắt nếu chỉ một người làm mà việc tới dồn dập. Xem ví dụ ở phần Đề kể.",
          "Dễ bị cuốn vì đề cho sẵn đúng loại số liệu này. Nhưng có sẵn số liệu không có nghĩa nó trả lời đúng câu hỏi."
        ] },
      { k: "D", gist: "The step added to the workflow most recently, assuming that process changes cause the most friction.",
        why: [
          "Dựa trên một giả định, không dựa trên số đo (ý 4). Bước mới thêm chưa chắc chậm.",
          "Chọn theo cách này có thể sửa nhầm bước, trong khi nút thắt thật vẫn nằm nguyên."
        ] }
    ],
    dispute: "Đề gốc chấm A, sổ giữ A, nhưng câu có chỗ mơ hồ. Theo cách hiểu thường gặp trong bài toán dây chuyền, mỗi bước một người làm thì bước có thời gian xử lý dài nhất là nút thắt, nên C cũng bảo vệ được. Nếu “cycle time” ở đây tính cả thời gian chờ thì C càng gần A. Đề không nói mỗi bước có mấy người, nên hàng chờ (A) vẫn là tín hiệu trực tiếp hơn. Notes và docs Anthropic không dạy phần nhận ra nút thắt này.",
    refs: [
      { label: "Bài 4.2, mục “Tối ưu quy trình: lời chê của Claude là giả thuyết”: sơ đồ quy trình ghi ai làm, mất bao lâu, chờ ở đâu", href: NOTES + "#l-4-2" }
    ]
  },
  {
    de: 3, n: 67, total: 75, sub: "6.2", subName: "Dữ liệu nhạy cảm và quy định",
    answer: "B",
    ask: "Someone is getting inputs ready for a Claude prompt. Which kind of data most clearly needs extra handling, such as redaction or anonymization, before it goes into the prompt?",
    scene: [
      "Một nhân viên văn phòng đang gom dữ liệu để đưa vào prompt cho Claude.",
      "Bốn loại dữ liệu: thông cáo báo chí đã đăng, chức danh lấy từ sơ đồ tổ chức công khai, mô tả sản phẩm trên trang marketing, và số giấy tờ tùy thân cùng số thẻ thanh toán đầy đủ của từng khách có tên.",
      "Câu này không khó. Ba loại đầu có chung một điểm: đã công khai. Loại cuối vừa chỉ ra người thật, vừa là dữ liệu tài chính."
    ],
    asks: [
      "Loại dữ liệu nào rõ ràng nhất cần xử lý thêm, như che (redaction) hay ẩn danh (anonymization), trước khi đưa vào prompt?",
      "Tức là: loại nào lộ ra thì hại tới người thật, và bị luật hay chính sách ràng buộc?",
      "Soi từng phương án: dữ liệu đó đã công khai chưa, có chỉ ra được một người cụ thể không."
    ],
    facts: [
      "PII (thông tin định danh cá nhân): thông tin chỉ ra được một người cụ thể, một mình hoặc khi ghép với thông tin khác. Ví dụ họ tên, số CCCD, số tài khoản.",
      "Notes chia dữ liệu nhạy cảm thành sáu nhóm. Số thẻ, số tài khoản thuộc nhóm tài chính: dùng được để lừa đảo, thường bị luật và hợp đồng ràng buộc. Help Center của Claude cũng khuyên cân nhắc kỹ trước khi đưa thông tin tài chính vào chat.",
      "Redact (che): xóa hoặc bôi đen phần nhạy cảm trước khi đưa vào. Anonymize (ẩn danh): bỏ hoặc thay thông tin định danh sao cho không lần ra được người thật.",
      "Đã gửi rồi thì dữ liệu nằm trong chat, theo luật lưu trữ của tài khoản đó. Nên phải xử lý trước khi gửi, không phải dặn Claude sau."
    ],
    opts: [
      { k: "A", gist: "Press releases the company has already made public.",
        why: [
          "Đã công khai, ai cũng đọc được. Đưa vào prompt không lộ thêm gì.",
          "Không chỉ ra người thật nào (ý 1), không thuộc nhóm nhạy cảm nào (ý 2)."
        ] },
      { k: "B", gist: "Customers' government ID numbers and full payment-card numbers, each linked to a named person.",
        why: [
          "Đúng. Số giấy tờ tùy thân gắn với tên là PII (ý 1). Số thẻ đầy đủ là dữ liệu tài chính, đúng loại Help Center khuyên cân nhắc kỹ (ý 2).",
          "Lại còn ghép với nhau: tên, số giấy tờ và số thẻ của cùng một người là đủ để mạo danh và lừa đảo.",
          "Cách làm: che hoặc ẩn danh trước khi gửi (ý 3, 4). Hiếm việc nào cần số thẻ đầy đủ. Notes gợi ý che phần số, kiểu “TK ****6789”."
        ] },
      { k: "C", gist: "Job titles copied from the company's public organizational chart.",
        why: [
          "Sơ đồ tổ chức đã công khai, nên chức danh lấy từ đó không lộ thêm gì.",
          "Dễ bị cuốn vì chức danh gắn với người thật, nghe như dữ liệu nhân sự. Nhưng nhóm nhân sự nhạy cảm là đánh giá hiệu suất, kỷ luật, hồ sơ ứng viên (ý 2), không phải chức danh công ty tự đăng lên."
        ] },
      { k: "D", gist: "Generic product descriptions taken from the company's marketing website.",
        why: [
          "Nội dung marketing làm ra để công khai. Không có người thật, không có số liệu tài chính (ý 1, 2).",
          "Đưa vào prompt không cần xử lý gì."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng Domain 6, mục “Dữ liệu nào là nhạy cảm”: định nghĩa PII và bảng sáu nhóm dữ liệu", href: NOTES + "#l-6-0" },
      { label: "Bài 6.2, mục “Ba cách bớt dữ liệu mà việc vẫn xong”: bỏ, đổi mã hoặc che, gộp trước khi gửi", href: NOTES + "#l-6-2" }
    ]
  },
  {
    de: 3, n: 68, total: 75, sub: "3.4", subName: "Context có hạn: chat mới, tóm tắt, lưu lại",
    answer: "A",
    ask: "Someone is leaving a long conversation that has drifted off track and moving into a fresh, focused session. Steps: (1) Open a new chat and paste in the summary as its starting context. (2) Summarize the goals, key decisions and open questions from the long conversation. (3) Work out which references need to persist beyond the current chat. (4) Put those persistent references into a Project's knowledge base, or attach them as needed. (5) Check that the new chat is on task before carrying on. Which order is correct?",
    scene: [
      "Một cuộc chat đã dài và trôi lệch khỏi việc chính. Người dùng muốn chuyển sang một phiên mới, gọn và đúng trọng tâm.",
      "Đề cho năm bước, bắt xếp thứ tự. Hai chỗ chắc chắn: bản tóm tắt phải có trước khi dán sang chat mới, và bước kiểm chat mới đúng hướng nằm cuối.",
      "Chỗ khó: bước 3 (chọn tài liệu cần giữ) và bước 2 (tóm tắt) đều làm trong chat cũ. Phương án A và D chỉ khác nhau ở thứ tự hai bước này."
    ],
    asks: [
      "Thứ tự đúng của các bước chuyển phiên là gì?",
      "Tức là: trước khi rời chat cũ phải mang theo những gì, cất ở đâu, rồi mới mở chat mới.",
      "Soi từng phương án: có mở chat mới khi chưa có bản tóm tắt không, có cất tài liệu khi chưa biết cất cái gì không."
    ],
    facts: [
      "Chat sau không tự thấy chat trước. Mở chat mới chỉ an toàn khi thứ quan trọng đã được lưu. Chưa lưu mà bỏ chat là bỏ luôn các quyết định trong đó.",
      "Cùng mạch việc mà chat đã dài, câu trả lời bắt đầu lệch: tự liệt kê các quyết định, con số, ràng buộc, việc còn mở, rồi mang bản đó sang chat mới.",
      "Tài liệu mà mọi chat của việc này đều cần thì lưu vào Project knowledge. Bản tóm tắt là ghi chú về cuộc chat, không thay được tài liệu gốc.",
      "Bản tóm tắt nén chi tiết. Một con số hay ràng buộc chốt từ đầu có thể bị mất mà câu trả lời vẫn trôi chảy, nên phải kiểm lại trước khi làm tiếp."
    ],
    opts: [
      { k: "A", gist: "3, 2, 4, 1, 5",
        why: [
          "Chọn trước thứ cần giữ lâu (3). Nhờ vậy bản tóm tắt (2) chỉ cần ghi mục tiêu, quyết định, câu hỏi còn mở, không phải chép lại nội dung tài liệu (ý 3).",
          "Cất tài liệu vào Project (4) trước khi rời chat cũ (ý 1). Mở chat mới bằng bản tóm tắt (1), rồi kiểm chat mới đã nắm đúng việc (5) trước khi làm tiếp (ý 4).",
          "Giữ đủ hai chỗ chắc chắn: tóm tắt có trước khi dán, tài liệu đã cất trước khi mở chat mới."
        ] },
      { k: "B", gist: "4, 3, 2, 1, 5",
        why: [
          "Sai ở bước đầu: cất tài liệu (4) khi chưa xác định tài liệu nào cần giữ (3).",
          "Cất theo cảm tính thì hoặc sót tài liệu cần, hoặc nhét cả file thừa vào Project. File thừa làm nhiễu chuyện tìm và tốn hạn mức."
        ] },
      { k: "C", gist: "1, 2, 3, 4, 5",
        why: [
          "Sai ở bước đầu: mở chat mới (1) khi chưa có bản tóm tắt để dán vào. Bước 1 cần output của bước 2.",
          "Rời chat cũ trước khi lưu gì là bỏ luôn các quyết định trong đó (ý 1). Muốn lấy lại thì phải quay về chat dài, đúng chỗ đang muốn thoát.",
          "Dễ bị cuốn vì đây là thứ tự số từ 1 tới 5. Nhưng số của bước trong đề không phải thứ tự làm."
        ] },
      { k: "D", gist: "2, 3, 4, 1, 5",
        why: [
          "Giữ đủ hai chỗ chắc chắn: tóm tắt trước khi dán, cất tài liệu trước khi mở chat mới. Chỉ khác A ở chỗ tóm tắt trước, chọn tài liệu sau.",
          "Đề gốc chấm A: chọn tài liệu cần giữ trước thì bản tóm tắt khỏi chép lại nội dung tài liệu (ý 3). Tóm tắt trước thì dễ lẫn đoạn diễn giải tài liệu vào bản tóm tắt, rồi lại cất tài liệu gốc riêng.",
          "Dễ bị cuốn vì 3 và 4 đứng liền nhau, đọc rất xuôi. Thứ tự này không sai về logic, xem ghi chú đáp án bên dưới."
        ] }
    ],
    dispute: "Đề gốc chấm A, sổ giữ A. Nhưng D cũng bảo vệ được: bước 2 và bước 3 đều làm trong chat cũ, không bước nào cần output của bước kia. Notes (theo Help Center) chỉ chốt hai điều: thứ cần dùng lại phải lưu trước khi rời chat, và chat mới bắt đầu bằng bản tóm tắt. Thứ tự giữa tóm tắt và chọn tài liệu notes không nói, đây là lập luận của người ra đề.",
    refs: [
      { label: "Bài 3.4, bảng “Mở chat mới, tóm tắt, hay lưu lại”: tóm tắt quyết định và việc còn mở, lưu tài liệu vào Project trước khi rời chat", href: NOTES + "#l-3-4" },
      { label: "Bài 3.1, mục “Project: khi việc lặp lại trên cùng tài liệu”: các chat không thấy nhau, thứ mọi chat cần phải nằm trong knowledge", href: NOTES + "#l-3-1" }
    ]
  },
  {
    de: 3, n: 69, total: 75, sub: "6.4", subName: "Đạo đức khi dùng AI",
    answer: "A",
    ask: "A Claude associate is running an ethics review of a deliverable Claude helped produce, before it is published. Steps: (1) Make sure the transparency requirements for the receiving audience are met. (2) Record the outcome of the review and any changes made. (3) Identify who the audience is and how the deliverable could affect them. (4) Make targeted revisions, or escalate when a concern needs more authority to resolve. (5) Check the content for unsupported generalizations, fairness problems and inaccuracies. Which order is correct?",
    scene: [
      "Một sản phẩm có Claude góp phần soạn sắp được công bố. Trước đó phải rà soát về đạo đức.",
      "Năm bước: xác định người nhận và tác động, soi nội dung, kiểm yêu cầu công khai việc dùng AI, sửa hoặc chuyển lên, ghi lại.",
      "Hai bước cuối thì bốn phương án giống nhau: sửa hoặc chuyển lên (4), rồi ghi lại (2). Chỗ khó nằm ở ba bước đầu."
    ],
    asks: [
      "Thứ tự đúng của các bước rà soát là gì?",
      "Tức là: muốn biết sản phẩm này có hại ai không thì phải biết gì trước, kiểm gì sau.",
      "Soi từng phương án: bước đứng trước có cho bước đứng sau thứ nó cần không."
    ],
    facts: [
      "Bias và fairness (thiên lệch và công bằng) tính theo người bị ảnh hưởng. Notes ghi phần đạo đức là hỏi trước: output này ảnh hưởng tới ai, nhóm nào bị thiệt nếu nó nghiêng.",
      "Disclosure (công khai): cho người cần biết biết rằng AI đã tham gia. Bắt buộc hay không tùy người nhận: ca rủi ro cao về một người, chatbot nói chuyện với khách, hoặc chính sách, hợp đồng đòi.",
      "Công khai không thay được việc kiểm nội dung. Một dòng “do AI tạo” không làm bản sai thành đúng, cũng không chuyển trách nhiệm đi đâu.",
      "Diligence (cẩn trọng): người dùng output chịu trách nhiệm về nó. Sửa được thì sửa, vượt quyền thì chuyển lên đúng kênh, và ghi lại quyết định."
    ],
    opts: [
      { k: "A", gist: "3, 5, 1, 4, 2",
        why: [
          "Biết người nhận và tác động trước (3). Có nó mới biết khái quát nào là thiếu căn cứ, nhóm nào có thể bị đối xử không công bằng (ý 1).",
          "Soi nội dung (5) rồi mới kiểm công khai (1): nội dung có vấn đề thì nhãn AI cũng không cứu được (ý 3).",
          "Sau đó sửa hoặc chuyển lên (4), cuối cùng ghi lại kết quả và các chỗ đã sửa (2) (ý 4)."
        ] },
      { k: "B", gist: "3, 1, 5, 4, 2",
        why: [
          "Bước đầu đúng. Sai ở chỗ đưa kiểm công khai (1) lên trước soi nội dung (5).",
          "Công khai là bước cho một sản phẩm đã đúng và công bằng. Làm nó trước dễ thành “đã minh bạch là xong”, trong khi phần nặng nhất còn chưa làm (ý 3).",
          "Dễ bị cuốn vì 3 và 1 cùng nói về người nhận, đặt liền nhau đọc rất xuôi. Nhưng biết người nhận trước là để soi nội dung cho đúng người đó, không chỉ để quyết có ghi nhãn AI hay không."
        ] },
      { k: "C", gist: "5, 3, 1, 4, 2",
        why: [
          "Sai ở bước đầu: soi nội dung (5) khi chưa biết ai nhận và bị ảnh hưởng ra sao (3).",
          "Một khái quát về một nhóm người có thiên lệch hay không, hại tới đâu, tùy nhóm đó có trong số người nhận hay bị nhắc tới không (ý 1). Chưa biết người nhận thì không biết soi tới đâu."
        ] },
      { k: "D", gist: "1, 3, 5, 4, 2",
        why: [
          "Sai ở bước đầu: kiểm yêu cầu công khai cho người nhận (1) khi chưa xác định người nhận là ai (3).",
          "Bắt buộc công khai hay không phụ thuộc chính người nhận (ý 2). Làm bước 1 trước là đoán."
        ] }
    ],
    refs: [
      { label: "Bài 6.4, mục “Bias và công bằng” và “Khi nào phải nói là có dùng AI”: hỏi trước output ảnh hưởng tới ai, công khai tùy người nhận", href: NOTES + "#l-6-4" },
      { label: "Bài 6.1: công khai không thay được người duyệt, ca rủi ro cao cần cả hai", href: NOTES + "#l-6-1" }
    ]
  },
  {
    de: 3, n: 70, total: 75, sub: "2.2", subName: "Gọi đúng tên lỗi: bịa, mâu thuẫn, thiên lệch",
    answer: "D",
    ask: "You are ranking structural defects in Claude's output by how much they hurt clarity. Which defect damages the clarity of the output most?",
    scene: [
      "Đề đưa bốn lỗi cấu trúc trong một output của Claude, bắt chọn lỗi làm người đọc khó hiểu nhất.",
      "Ba lỗi là chuyện bề mặt: một tiêu đề phụ ngắn hơn các tiêu đề khác, lỗi trình bày chữ rải rác nhiều phần, hai đoạn liền nhau nói cùng một ý nhưng gọi tên khác nhau.",
      "Lỗi còn lại đụng tới nội dung: kết luận chính nói ngược với bằng chứng trong thân bài."
    ],
    asks: [
      "Lỗi cấu trúc nào làm hỏng độ rõ ràng của output nặng nhất?",
      "Tức là: lỗi nào khiến người đọc không biết nên tin điều gì, chứ không chỉ đọc thấy khó chịu.",
      "Soi từng phương án: sửa một lượt hình thức có hết lỗi không, hay phải quay lại kiểm nội dung."
    ],
    facts: [
      "Inconsistency (mâu thuẫn): hai khẳng định về cùng một sự việc không khớp nhau. Một kiểu là mâu thuẫn với chính nó trong một câu trả lời, như đoạn trên ghi phòng họp 12 chỗ, đoạn dưới xếp 20 người vào.",
      "Gặp mâu thuẫn thì chưa dùng bên nào, kiểm với nguồn gốc. Chưa biết bên nào sai thì người đọc không dùng được cả hai.",
      "Sửa hình thức không sửa được nội dung. Viết lại, đổi định dạng, làm đẹp không đụng tới chuyện đúng hay sai.",
      "Kết luận là phần người đọc dựa vào để quyết định. Notes xếp câu mà kết luận dựa vào vào nhóm phải kiểm trước."
    ],
    opts: [
      { k: "A", gist: "One subheading is shorter than the other subheadings.",
        why: [
          "Chuyện hình thức thuần túy (ý 3). Tiêu đề ngắn hơn không làm ai hiểu sai nội dung.",
          "Không có gì để sửa ngoài thẩm mỹ."
        ] },
      { k: "B", gist: "Two neighbouring paragraphs give the same information but use inconsistent terms.",
        why: [
          "Có làm người đọc vấp: gặp hai tên khác nhau, họ có thể tưởng là hai thứ khác nhau.",
          "Nhưng thông tin vẫn là một, không có khẳng định nào trái nhau (ý 1). Thống nhất thuật ngữ một lượt là xong (ý 3).",
          "Dễ bị cuốn vì có chữ “inconsistent” (không nhất quán), trùng tên với kiểu lỗi mâu thuẫn. Nhưng ở đây chỉ chữ không khớp, nội dung thì khớp."
        ] },
      { k: "C", gist: "Typographical inconsistencies show up across several sections.",
        why: [
          "Rải ra nhiều phần nghe nặng, nhưng vẫn là lỗi trình bày (ý 3).",
          "Rà lại định dạng một lượt là hết, nội dung không đổi."
        ] },
      { k: "D", gist: "The main conclusion goes against the evidence laid out in the body.",
        why: [
          "Đúng. Kết luận và bằng chứng là hai khẳng định về cùng một việc mà trái nhau: mâu thuẫn ngay trong output (ý 1).",
          "Người đọc không biết tin kết luận hay tin bằng chứng (ý 2). Mà đây lại là phần họ dựa vào để quyết định (ý 4).",
          "Không sửa bằng một lượt rà hình thức được (ý 3). Phải quay lại nguồn xem bên nào đúng, rồi viết lại kết luận hoặc phần lập luận."
        ] }
    ],
    refs: [
      { label: "Bài 2.2, bảng “Ba kiểu mâu thuẫn”: mâu thuẫn với chính nó trong một câu trả lời, chưa dùng giá trị nào", href: NOTES + "#l-2-2" },
      { label: "Bài 0.3, luật 3: sửa hình thức không sửa được nội dung", href: NOTES + "#l-0-3" }
    ]
  },
  {
    de: 3, n: 71, total: 75, sub: "4.5", subName: "Nói với stakeholder về giá trị và giới hạn",
    answer: "D",
    ask: "An executive claims Claude will remove the need for any human review of customer-facing content. This executive also approves the budget for the team's AI tools. How should the associate respond?",
    scene: [
      "Một lãnh đạo tuyên bố Claude sẽ xóa hẳn nhu cầu người duyệt nội dung gửi khách.",
      "Chỗ khó: người này duyệt ngân sách công cụ AI của nhóm. Nói ngược ý họ nghe như rủi ro cho chính nhóm mình.",
      "Bốn phương án là bốn thái độ: chuyển lên người khác, chạy thử ý của lãnh đạo, chiều theo, hay nói thẳng có dẫn chứng."
    ],
    asks: [
      "Cách phản hồi nào phù hợp nhất?",
      "Tức là: nói sao cho lãnh đạo thấy đúng giá trị của Claude mà không hứa quá, và không để nội dung chưa ai duyệt tới tay khách.",
      "Soi từng phương án: nội dung gửi khách có còn người duyệt không, và lãnh đạo có được nghe sự thật về giới hạn không."
    ],
    facts: [
      "Nói với stakeholder: cả giá trị lẫn giới hạn, hứa biện pháp chứ không hứa không lỗi. Chỉ kể điểm mạnh là dọn sẵn chỗ cho thất vọng.",
      "Hallucination (bịa) là đặc tính đã biết, dồn vào chi tiết: tên, ngày, số liệu, trích dẫn. Không biện pháp nào bảo đảm 0 lỗi.",
      "Bán cho đúng: người làm cùng Claude, không phải Claude thay người. Ca trong notes: PM nói có Claude thì khỏi cần pháp chế duyệt. Câu đúng là Claude soạn nhanh hơn nhiều, nhưng người có chuyên môn vẫn đọc trước khi dùng.",
      "Chạy thử thì giữ bước duyệt, đạt tiêu chí rồi mới mở rộng. Notes có ca chạy thử năm thư đúng cả năm, bỏ bước đọc lại, tháng sau một thư ghi sai lương tới tay ứng viên."
    ],
    opts: [
      { k: "A", gist: "Take the executive's claim to a senior leader outside the team before replying directly, because the issue reaches beyond this team.",
        why: [
          "Né việc của chính mình. Nói rõ giá trị và giới hạn với stakeholder là việc của associate (ý 1), và lãnh đạo đang hỏi thẳng associate.",
          "Vượt cấp trước khi nói chuyện thẳng làm hỏng quan hệ với chính người duyệt ngân sách. Mà lãnh đạo vẫn chưa nghe được vì sao cần người duyệt."
        ] },
      { k: "B", gist: "Try the executive's idea on a low-risk slice of customer-facing content first, then use the pilot results to argue for keeping human review on higher-risk content.",
        why: [
          "Chạy thử nghe rất bài bản. Nhưng chạy thử ý của lãnh đạo nghĩa là bỏ người duyệt, nên nội dung chưa ai đọc vẫn tới tay khách thật trong lúc thử.",
          "Notes dạy chạy thử phải giữ bước duyệt (ý 4). Ca năm thư đúng cả năm cho thấy vài kết quả tốt không chứng minh được bỏ duyệt là an toàn.",
          "Dễ bị cuốn vì có chữ “pilot” (chạy thử) và “low-risk” (rủi ro thấp). Nhưng nó lùi việc nói thật về giới hạn, và đem khách ra làm phép thử."
        ] },
      { k: "C", gist: "Defer to the executive's authority, drop the human review step for customer-facing content, and watch the results closely for the first few weeks.",
        why: [
          "Chức vụ không đổi được giới hạn của công cụ. Hallucination vẫn xảy ra dù ai ra quyết định (ý 2).",
          "Theo dõi sau khi gửi là phát hiện lỗi khi khách đã nhận. Nội dung đã gửi khách thì không rút lại được."
        ] },
      { k: "D", gist: "Recognize the productivity gains, then explain with concrete examples why customer-facing content still needs human review because of accuracy and brand risk.",
        why: [
          "Đúng. Nói cả giá trị (năng suất) lẫn giới hạn (độ chính xác, rủi ro thương hiệu) (ý 1).",
          "Ví dụ cụ thể cho lãnh đạo thấy lỗi có thật và nằm ở đâu (ý 2), thay cho câu chung chung “AI không đáng tin”.",
          "Đúng khung “người làm cùng Claude”: Claude soạn nhanh, người duyệt trước khi gửi khách (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Bán cho đúng: người làm cùng Claude” và “Hứa biện pháp, không hứa hoàn hảo”", href: NOTES + "#l-4-5" },
      { label: "Bài 4.4, tình huống thư mời nhận việc: chạy thử đúng năm thư rồi bỏ bước duyệt, tháng sau sai lương", href: NOTES + "#l-4-4" }
    ]
  },
  {
    de: 3, n: 72, total: 75, sub: "6.3", subName: "Làm việc trong chính sách AI của công ty",
    answer: "A",
    ask: "A compliance specialist is applying the organization's policy to a proposed Claude use case. Which step of applying the policy should come first?",
    scene: [
      "Một chuyên viên tuân thủ nhận một đề xuất dùng Claude, phải đối chiếu nó với chính sách của tổ chức.",
      "Bốn phương án là bốn bước của cùng một quy trình: xác định điều khoản nào áp dụng, so đề xuất với các điều khoản đó, duyệt / sửa / từ chối, ghi vào sổ tuân thủ.",
      "Chỗ khó: bước nào cũng phải làm. Đề chỉ hỏi bước đầu tiên."
    ],
    asks: [
      "Bước nào phải làm trước tiên?",
      "Tức là: bước nào không cần output của bước khác, còn các bước khác đều cần output của nó.",
      "Soi từng phương án: bước đó lấy đầu vào từ đâu, đầu vào ấy đã có chưa."
    ],
    facts: [
      "Chính sách AI của tổ chức gồm nhiều phần: công cụ được duyệt, phân loại dữ liệu, cài đặt bắt buộc, việc nào cần người duyệt, khi nào phải công khai, hỏi ai. Một đề xuất cụ thể thường chỉ đụng vài phần.",
      "Phần nào áp dụng tùy chính đề xuất: dùng dữ liệu gì, quyết định về ai, output đi tới đâu. Ví dụ đề xuất có dữ liệu khách thì đụng phần phân loại dữ liệu, có output gửi ra ngoài thì đụng phần công khai.",
      "Thứ tự xử lý trong notes khi chính sách và yêu cầu va nhau kết thúc bằng bước ghi lại quyết định. Ghi lại là ghi một quyết định đã có."
    ],
    opts: [
      { k: "A", gist: "Work out which policy provisions apply to the proposed use case.",
        why: [
          "Đúng. Đây là bước duy nhất chỉ cần đề xuất và văn bản chính sách, hai thứ đã có sẵn (ý 1, 2).",
          "Output của nó, danh sách điều khoản áp dụng, là đầu vào của bước so sánh. Thứ tự đầy đủ: A, rồi D, rồi B, rồi C."
        ] },
      { k: "B", gist: "Approve, change or reject the use case based on the comparison.",
        why: [
          "Chính phương án ghi “based on the comparison” (dựa trên kết quả so sánh). Chưa so thì chưa có gì để dựa vào.",
          "Quyết trước rồi tìm lý do sau là làm ngược, và không giải trình được khi bị hỏi."
        ] },
      { k: "C", gist: "Log the use case and the policy decision in the compliance register.",
        why: [
          "Ghi lại là ghi một quyết định đã có (ý 3). Ở bước đầu thì chưa có quyết định nào để ghi.",
          "Sổ tuân thủ giữ dấu vết cho kiểm toán, không thay được việc phân tích."
        ] },
      { k: "D", gist: "Compare the proposed use case with the applicable policy provisions.",
        why: [
          "Cần “applicable provisions” (các điều khoản áp dụng), tức là output của bước A.",
          "Dễ bị cuốn vì so sánh là phần việc chính, nghe như chỗ bắt đầu. Nhưng chưa biết điều khoản nào áp dụng thì so với cả bộ chính sách, vừa lâu vừa dễ sót phần quan trọng."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng Domain 6, mục “Chính sách AI của tổ chức và governance”: các phần của một chính sách", href: NOTES + "#l-6-0" },
      { label: "Bài 6.3, mục “Khi chính sách và yêu cầu va nhau”: dừng, nói rõ ràng buộc, chuyển lên, ghi lại", href: NOTES + "#l-6-3" }
    ]
  },
  {
    de: 3, n: 73, total: 75, sub: "5.1", subName: "Dựng Project: instructions và knowledge",
    answer: "A",
    ask: "An HR business partner is setting up two separate Projects for two unrelated client engagements. Which setup does the best job of stopping context from one engagement bleeding into the other?",
    scene: [
      "Một chuyên viên nhân sự (HR business partner) làm cho hai khách khác nhau, mỗi khách một Project.",
      "Mục tiêu: thông tin của khách này không lọt sang câu trả lời cho khách kia, tức “context bleed” (ngữ cảnh rò sang nhau).",
      "Ba phương án sai tự nói ra chỗ hỏng: dùng chung một Project, dùng chung memory, bỏ Project để chat thường. Câu này chủ yếu kiểm mày có hiểu ranh giới của Project không."
    ],
    asks: [
      "Cách thiết lập nào ngăn ngữ cảnh rò giữa hai khách tốt nhất?",
      "Tức là: mỗi khách phải có ranh giới riêng cho cả ba thứ Claude đọc: memory, knowledge, instructions.",
      "Soi từng phương án: có thứ nào của khách này nằm ở chỗ chat của khách kia cũng thấy không."
    ],
    facts: [
      "Project có knowledge và instructions riêng. Mọi chat trong Project dùng chung hai thứ đó.",
      "Mỗi Project có memory riêng. Chat trong Project dùng memory của Project đó và memory tài khoản, không dùng memory của Project khác.",
      "Chat ngoài Project dùng chung memory tài khoản. Muốn tách hẳn một Project khỏi memory tài khoản thì tắt “Use account memory” (dùng memory tài khoản) ở trang của Project.",
      "Dựng cấu hình xong thì chạy thử một ca thật trước khi dùng."
    ],
    opts: [
      { k: "A", gist: "Give each Project its own memory, knowledge sources and instructions, then check that nothing from one Project turns up in the other Project's answers.",
        why: [
          "Đúng. Cả ba thứ Claude đọc trong một Project đều tách riêng theo khách (ý 1, 2).",
          "Có bước thử sau khi dựng (ý 4): hỏi trong Project khách này một chuyện chỉ khách kia có, xem có lọt ra không.",
          "Muốn chặt hơn nữa: tắt “Use account memory” ở cả hai Project, để memory tài khoản cũng không thành cầu nối (ý 3)."
        ] },
      { k: "B", gist: "Run both engagements in one shared Project with combined memory, knowledge and instructions, trusting Claude to keep the two clients apart with no setup.",
        why: [
          "Một Project thì mọi chat trong đó cùng đọc knowledge và instructions của cả hai khách (ý 1). Đó chính là rò ngữ cảnh.",
          "Tin Claude tự tách là dựa vào lời hứa, không dựa vào một ranh giới có thật."
        ] },
      { k: "C", gist: "Make both Projects share the same memory context to save setup effort, even though shared memory between unrelated engagements is exactly what causes context bleed.",
        why: [
          "Chính phương án tự nhận đây là cấu hình gây rò.",
          "Memory của Project này vốn không sang Project kia (ý 2). Thứ gần nhất với “dùng chung memory” là để cả hai cùng dùng memory tài khoản (ý 3), và đó đúng là đường rò cần chặn."
        ] },
      { k: "D", gist: "Skip Projects altogether and use ordinary chats for both engagements, with no scoped memory and no structural separation between the clients.",
        why: [
          "Chat ngoài Project dùng chung memory tài khoản (ý 3). Chi tiết của khách này có thể được nhớ rồi dùng lại khi chat cho khách kia.",
          "Không có knowledge riêng thì mỗi lần lại dán tài liệu khách vào chat, càng nhiều chỗ để lẫn."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, bảng “Memory, tìm chat cũ, chat ẩn danh”: ranh giới memory của từng Project", href: NOTES + "#l-3-4" },
      { label: "Bài 5.1, mục “Biết thêm”: mỗi Project có memory riêng, tắt “Use account memory” để tách hẳn", href: NOTES + "#l-5-1" },
      { label: "Help Center: Use chat search and memory to build on previous context", href: "https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context" }
    ]
  },
  {
    de: 3, n: 74, total: 75, sub: "3.1", subName: "Chọn tính năng: chat, Project, Research, artifact",
    answer: "B",
    ask: "An HR business partner is building a long-lived workspace in which a team handbook, a leveling guide and a policies FAQ will be referred to across many separate chats by several team members. Which Claude feature is built for this?",
    scene: [
      "Ba tài liệu: sổ tay nhóm, khung cấp bậc (leveling guide), FAQ chính sách.",
      "Chỗ khó nằm ở hai cụm: “many separate chats” (nhiều chat riêng) và “several team members” (nhiều thành viên). Dùng lâu dài, nhiều người dùng chung.",
      "Bốn phương án đều là tính năng có thật: connector Drive, Project, artifact, đính kèm file. Phải chọn cái được làm ra cho đúng việc này."
    ],
    asks: [
      "Tính năng nào được thiết kế cho trường hợp này?",
      "Tức là: chỗ đặt tài liệu một lần mà mọi chat của mọi thành viên đều thấy, kèm lời dặn chung.",
      "Soi từng phương án: có giữ qua nhiều chat không, có dùng chung cho nhiều người không, có phải làm lại mỗi lần không."
    ],
    facts: [
      "Project: không gian làm việc có knowledge (tài liệu) và instructions (lời dặn) riêng. Mọi chat trong Project dùng chung hai thứ đó.",
      "Team và Enterprise chia sẻ được Project trong tổ chức: Can view để dùng, Can edit để sửa. Cả nhóm cần cùng tài liệu thì dùng một Project chia sẻ, thay cho mỗi người giữ một bản.",
      "Connector cho Claude tìm và đọc trong ứng dụng khác lúc hỏi, theo quyền tài khoản của từng người. Mỗi người tự đăng nhập. Trên Team và Enterprise, connector chỉ dùng được trong Project private.",
      "Artifact là sản phẩm Claude làm ra để sửa, xuất file, chia sẻ. Notes xếp nó vào ca “kết quả là sản phẩm để dùng tiếp”, còn ca “cùng tài liệu dùng đi dùng lại” là của Project."
    ],
    opts: [
      { k: "A", gist: "Connect the team's Google Drive folder that holds the three documents, so the connector brings them into each chat when needed.",
        why: [
          "Connector tìm và đọc file lúc hỏi, theo quyền của từng người (ý 3). Mỗi thành viên phải tự kết nối, và Claude chỉ lôi tài liệu ra khi nó tìm trúng.",
          "Không có lời dặn chung đi kèm, không có một bộ tài liệu đã chốt cho cả nhóm. Trên Team, Enterprise connector còn chỉ chạy trong Project private (ý 3).",
          "Dễ bị cuốn vì tài liệu đang nằm sẵn trên Drive, nối vào nghe nhanh. Nhưng connector hợp với thư mục lớn đổi liên tục, không phải ba tài liệu tham chiếu ổn định cho cả nhóm."
        ] },
      { k: "B", gist: "Create a Project: a persistent workspace with its own knowledge base and custom instructions, shared across chats and members.",
        why: [
          "Đúng. Tài liệu vào knowledge, lời dặn vào instructions, đặt một lần là mọi chat trong Project đều thấy (ý 1).",
          "Chia sẻ cho nhóm (ý 2): thành viên Can view vẫn chat với Project, chỉ người bảo trì có Can edit. Cả nhóm dùng một bản, không ai giữ bản cũ."
        ] },
      { k: "C", gist: "Generate an Artifact holding the three documents, giving the team an editable reference surface that lasts across chats.",
        why: [
          "Artifact là sản phẩm để sửa, xuất, chia sẻ (ý 4). Nó không phải chỗ Claude tra cứu ở mọi chat của cả nhóm.",
          "Còn sinh thêm một bản sao của ba tài liệu, và bản sao nào rồi cũng cũ."
        ] },
      { k: "D", gist: "Attach the three documents to each chat whenever needed, since attachments give that chat direct access with no extra setup.",
        why: [
          "Chạy được, nhưng mỗi chat, mỗi người lại đính kèm một lần. Đúng cảnh lặp lại mà Project sinh ra để bỏ (ý 1).",
          "Có lần quên đính, có người đính bản cũ, và không có lời dặn chung."
        ] }
    ],
    refs: [
      { label: "Bài 3.1, bảng chọn tính năng và mục “Project: khi việc lặp lại trên cùng tài liệu”: cả nhóm cần cùng tài liệu thì Project chia sẻ", href: NOTES + "#l-3-1" },
      { label: "Bài 5.2, bảng “Bản chụp, bản đồng bộ, hay lấy lúc hỏi”: connector lấy lúc hỏi, trên Team và Enterprise chỉ trong Project private", href: NOTES + "#l-5-2" },
      { label: "Help Center: Create and manage projects", href: "https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects" }
    ]
  },
  {
    de: 3, n: 75, total: 75, sub: "3.2", subName: "Haiku, Sonnet, Opus khác nhau ở đâu",
    answer: "C",
    ask: "An analyst has a one-off, complex problem that genuinely needs multi-step reasoning over a long chain of thought. Which model suits this work best?",
    scene: [
      "Một chuyên viên phân tích có một bài toán làm một lần, phức tạp.",
      "Đề nói rõ “genuinely requires multi-step reasoning” (thật sự cần lập luận nhiều bước). Không có ràng buộc nào về tốc độ hay số lượng.",
      "Ba phương án sai đều dựa vào một câu tuyệt đối: “always” (luôn luôn), “does not vary” (không khác nhau), “has no option” (không có lựa chọn nào)."
    ],
    asks: [
      "Model nào hợp nhất với việc này?",
      "Tức là: việc khó, làm một lần, lập luận dài. Tầng nào mạnh nhất ở đúng loại việc đó?"
    ],
    facts: [
      "Haiku, Sonnet, Opus là ba tầng của cùng một họ model. Lên tầng thì lập luận sâu hơn, nhưng chậm hơn và tốn hạn mức hơn.",
      "Việc đơn giản thì ba tầng gần như nhau. Khác biệt lộ ra ở việc khó: nhiều bước, lập luận dài, nhiều ràng buộc.",
      "Hướng dẫn cho người dùng app: Opus hợp với việc phức tạp cần lập luận nâng cao, nghiên cứu sâu. Haiku hợp với việc đơn giản, cần ngay.",
      "Guide v1.0 nói ba tầng. App hiện có thêm Fable 5.1 ở trên Opus. Khi thi nghĩ theo ba tầng của guide."
    ],
    opts: [
      { k: "A", gist: "Haiku, since a lightweight model is always the better choice whatever the complexity.",
        why: [
          "Sai ở chữ “always” (luôn luôn). Haiku nhanh và nhẹ, hợp việc đơn giản (ý 3). Việc khó là chỗ tầng nhẹ dễ hụt (ý 2).",
          "Việc chỉ làm một lần, nên tiết kiệm chút hạn mức không bù được một phân tích sai."
        ] },
      { k: "B", gist: "Any model, since reasoning depth is the same across the lineup.",
        why: [
          "Sai sự thật: các tầng khác nhau ở độ sâu lập luận (ý 1).",
          "Dễ bị cuốn vì ba tầng có cùng context 1M token, cùng mốc kiến thức. Nhưng thông số giới hạn giống nhau không có nghĩa năng lực giống nhau, và việc khó chính là chỗ khác biệt lộ ra (ý 2)."
        ] },
      { k: "C", gist: "Opus, since it is positioned as the most capable model for advanced reasoning on complex, specialized tasks.",
        why: [
          "Đúng. Lập luận nhiều bước, chuỗi suy nghĩ dài là đúng loại việc Opus được khuyên dùng (ý 3), và là chỗ khác biệt giữa các tầng lộ ra (ý 2).",
          "Chậm hơn, tốn hạn mức hơn (ý 1), nhưng chỉ một lần, đáng đổi.",
          "“Specialized” (chuyên sâu) ở đây là độ khó, không phải ngành. Không có tầng nào chuyên một lĩnh vực."
        ] },
      { k: "D", gist: "A model from another vendor, since the Claude lineup offers nothing for complex reasoning.",
        why: [
          "Sai sự thật: chính dòng Claude có tầng dành cho lập luận nâng cao (ý 3).",
          "Đổi nền tảng là né câu hỏi chọn tầng mà đề đặt ra."
        ] }
    ],
    dispute: "Đáp án giữ C. Mô tả “most capable” (mạnh nhất) chỉ đúng trong ba tầng guide nêu. App hiện có Fable 5.1 ở trên Opus (ý 4), nhưng Fable không có trong các phương án. Khi thi chọn theo ba tầng.",
    refs: [
      { label: "Bài 3.2, bảng ba tầng và mục “Khoảng cách lộ ra ở việc khó”", href: NOTES + "#l-3-2" },
      { label: "Bài 0.3, luật 4: khớp model với việc, để model mạnh nhất cho lập luận phức tạp", href: NOTES + "#l-0-3" },
      { label: "Academy, Choosing the right Claude model: chọn tầng cho người dùng app", href: "https://academy.claude.com/tutorials/choosing-the-right-claude-model" }
    ]
  }
);
