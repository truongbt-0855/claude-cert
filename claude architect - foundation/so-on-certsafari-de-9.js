// Sổ ôn certsafari, Đề 9. Trang so-on-certsafari.html nạp file này trước script render.
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
DE[9] = "Udemy · Practice Test 6 · 60 câu · 04/11/2026";
ENTRIES.push(
  {
    de: 9, n: 1, total: 60, sub: "5.5", subName: "Review người và hiệu chuẩn confidence", scen: "S6",
    answer: "D",
    ask: "The extraction model emits a single confidence score for each whole document. Audits turn up wrong amounts and dates inside documents that scored high enough to skip review, while every other field in those documents is correct. Reviewer capacity is limited. What should the team change?",
    scene: [
      "Model trích xuất cho mỗi tài liệu đúng một điểm confidence (điểm tự tin). Điểm đủ cao thì tài liệu bỏ qua bước người review.",
      "Kiểm tra lại thì thấy số tiền và ngày bị sai, nằm ngay trong những tài liệu điểm cao đó. Các trường còn lại của tài liệu vẫn đúng.",
      "Người review có hạn, không kiểm hết được.",
      "Chỗ khó: lỗi nằm ở từng trường, còn điểm thì tính cho cả tài liệu. Ví dụ minh họa:<pre><code>vendor, invoice_no, ... (11 trường)  đúng\ntotal                                SAI\n→ cả tài liệu vẫn điểm cao, bỏ qua review</code></pre>"
    ],
    asks: [
      "Team nên đổi gì?",
      "Tức là: cần một tín hiệu chỉ ra đúng trường nào dễ sai, để công review ít ỏi dồn vào đó, thay vì duyệt hay bỏ nguyên cả tài liệu.",
      "Soi từng phương án: sau khi đổi, tín hiệu nằm ở mức trường hay vẫn ở mức tài liệu? Và nó đã được đối chiếu với kết quả thật chưa?"
    ],
    facts: [
      "Field-level confidence: model xuất điểm tự tin cho từng trường trích xuất, thay vì một điểm cho cả tài liệu. Một điểm chung cho cả tài liệu che được vài trường sai nằm giữa nhiều trường đúng.",
      "Confidence model tự báo chưa được hiệu chuẩn: 0.9 không có nghĩa là đúng 90%. Phải so với labeled validation set (bộ tài liệu đã có đáp án do người gán) để tìm ngưỡng có tỉ lệ lỗi chấp nhận được, rồi mới dùng ngưỡng đó để chọn chỗ đưa người xem.",
      "Self-review (model tự xem lại bài mình) kém: lượt đó vẫn mang lý lẽ lúc làm, nên thường bênh kết quả cũ.",
      "Structured outputs không hỗ trợ ràng buộc số như <code>minimum</code>, <code>maximum</code>: gửi schema thô có chúng thì API trả lỗi 400, còn SDK helper gỡ chúng ra và chép vào description. Schema chỉ bảo đảm hình dạng output, không bảo đảm giá trị đúng."
    ],
    opts: [
      { k: "A", gist: "Recalibrate the document-level confidence threshold on a labeled validation set, with a separate threshold for each document type.",
        why: [
          "Hiệu chuẩn trên labeled set là đúng bài (ý 2), tách theo loại tài liệu cũng đúng bài. Nhưng điểm vẫn ở mức tài liệu (ý 1).",
          "Trường sai vẫn bị các trường đúng kéo điểm lên, nên tài liệu đó vẫn qua ngưỡng. Hạ ngưỡng xuống thì cả tài liệu sang người, kể cả hơn chục trường đúng: phí công review vốn có hạn.",
          "Dễ bị cuốn vì có đủ chữ của bài 5.5: labeled validation set, chia theo document type. Nhưng sai mức: lỗi ở trường, tín hiệu ở tài liệu."
        ] },
      { k: "B", gist: "Add a second pass in which the model re-reads its own extraction and revises the document-level confidence before routing.",
        why: [
          "Vẫn một điểm cho cả tài liệu (ý 1), nên trường sai vẫn bị che.",
          "Lượt hai là model tự chấm bài mình (ý 3). Điểm mới vẫn là tự báo, chưa đối chiếu với đáp án thật nào (ý 2)."
        ] },
      { k: "C", gist: "Put <code>minimum</code> and <code>maximum</code> bounds on the confidence field in the JSON schema so the API enforces a reliable score range.",
        why: [
          "Sai ở giả định: structured outputs không thi hành hai ràng buộc này (ý 4). Schema thô thì bị lỗi 400, qua SDK thì chúng chỉ còn là dòng chữ trong description.",
          "Kể cả chặn được khoảng, con số nằm trong 0–1 không có nghĩa là đúng. Điểm vẫn tính cho cả tài liệu, trường sai vẫn lọt."
        ] },
      { k: "D", gist: "Have the model emit a confidence score for each field, then calibrate per-field review thresholds on a labeled validation set.",
        why: [
          "Đưa tín hiệu xuống đúng mức của lỗi: mỗi trường một điểm (ý 1). Tổng tiền điểm thấp thì riêng trường đó sang người, các trường đúng đi thẳng.",
          "Điểm thô được hiệu chuẩn trên labeled validation set trước khi dùng (ý 2). Mỗi trường có ngưỡng riêng được, vì sai tổng tiền đắt hơn sai một dòng mô tả.",
          "Người review chỉ nhìn trường dễ sai, hợp với công review có hạn."
        ] }
    ],
    refs: [
      { label: "Bài 5.5, khung “Tốt” và ví dụ code: field-level confidence, ngưỡng hiệu chuẩn theo loại tài liệu × trường", href: NOTES + "#l-5-5" },
      { label: "Bài 4.6: model tự review bài mình thường bênh kết quả cũ", href: NOTES + "#l-4-6" },
      { label: "Docs Structured outputs, mục JSON Schema limitations: không hỗ trợ minimum, maximum; SDK chuyển chúng vào description", href: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs" }
    ]
  },
  {
    de: 9, n: 2, total: 60, sub: "4.5", subName: "Xử lý theo lô (Batch)", scen: "S6",
    answer: "C",
    ask: "A nightly batch of 4,000 extraction requests finishes with 60 errored results. The pipeline decides which documents to resubmit by matching line positions in the results file, and it keeps resubmitting documents that succeeded while missing some that failed. What change makes it resubmit exactly the failed documents?",
    scene: [
      "Mỗi đêm pipeline gửi một batch 4.000 request trích xuất. Xong thì có 60 kết quả lỗi.",
      "Pipeline chọn tài liệu để gửi lại bằng vị trí dòng: dòng thứ N trong file kết quả được coi là tài liệu thứ N lúc gửi.",
      "Hệ quả: tài liệu đã thành công bị gửi lại, còn vài tài liệu lỗi thì bị sót.",
      "Chỗ khó: hỏng ở cách ghép kết quả với tài liệu, không ở số request lỗi."
    ],
    asks: [
      "Đổi gì để pipeline gửi lại đúng các tài liệu lỗi?",
      "Tức là: cần một khóa ghép mỗi dòng kết quả với đúng request gốc, kể cả dòng lỗi.",
      "Soi từng phương án: nó sửa cách ghép, hay làm chuyện khác (chờ lâu hơn, bớt số lỗi)?"
    ],
    facts: [
      "Docs Batch processing: kết quả có thể về theo bất kỳ thứ tự nào, không khớp thứ tự request lúc tạo batch. Muốn ghép kết quả với request thì luôn dùng <code>custom_id</code>.",
      "Mỗi request mang một <code>custom_id</code> do mày đặt, không trùng trong batch. Mỗi dòng của file kết quả <code>.jsonl</code> có <code>custom_id</code> đó cùng result type <code>succeeded</code>, <code>errored</code>, <code>canceled</code> hoặc <code>expired</code>.",
      "Request <code>errored</code> là gặp lỗi và không có message nào được tạo, nên dòng đó không có output của model.",
      "File kết quả chỉ lấy được khi mọi request đã xong, hoặc sau 24 giờ. Chờ xong không làm thứ tự dòng khớp thứ tự gửi."
    ],
    opts: [
      { k: "A", gist: "Download the results file only after <code>request_counts</code> shows nothing still processing, so line positions line up with submission order.",
        why: [
          "Sai ở giả định: batch xong rồi thì kết quả vẫn không theo thứ tự gửi (ý 1, ý 4).",
          "Chờ xong là việc đằng nào cũng phải làm, vì file chỉ có khi batch kết thúc. Nhưng dòng thứ N vẫn chưa chắc là tài liệu thứ N, pipeline vẫn gửi nhầm.",
          "Dễ bị cuốn vì nghe như sửa đúng chỗ “tải file sớm quá”. Nhưng đề không hề nói pipeline tải sớm."
        ] },
      { k: "B", gist: "Add the source document ID to the extraction schema so the model echoes it back, and match failures on that echoed field.",
        why: [
          "Gãy đúng chỗ cần: dòng <code>errored</code> không có message nào (ý 3), nên chẳng có ID nào được nhắc lại trên chính các dòng phải tìm.",
          "Ở dòng thành công thì ID lại phụ thuộc model chép đúng. Trong khi API đã gắn sẵn <code>custom_id</code> trên mọi dòng (ý 2)."
        ] },
      { k: "C", gist: "Match each errored result to its source document through the <code>custom_id</code> on that result line, then resubmit only those documents.",
        why: [
          "Đúng khóa ghép docs chỉ định (ý 1). <code>custom_id</code> có trên mọi dòng, kể cả dòng lỗi (ý 2).",
          "Lọc dòng <code>errored</code>, lấy <code>custom_id</code>, tra ra đúng 60 tài liệu rồi gửi lại trong một batch mới. Tài liệu đã thành công không bị đụng tới."
        ] },
      { k: "D", gist: "Run every document through the Token Count API before submission and chunk any that exceed the context window, so fewer requests error.",
        why: [
          "Đếm token trước để bắt tài liệu quá dài là cách có thật, và có thể bớt số lỗi.",
          "Nhưng đề hỏi cách nhận ra tài liệu nào lỗi. Lỗi nào còn lại vẫn bị ghép theo vị trí dòng, vẫn gửi nhầm y như cũ (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Chuyện gì đang xảy ra” và “Khi batch có request lỗi”: kết quả không về theo thứ tự, ghép và nộp lại theo custom_id", href: NOTES + "#l-4-5" },
      { label: "Cheatsheet D4: dòng “Batch ended nhưng thiếu kết quả”: đọc result type từng dòng", href: NOTES + "#cheat-d4" },
      { label: "Docs Batch processing: kết quả có thể không theo thứ tự, luôn ghép bằng custom_id; errored là không có message nào được tạo", href: "https://platform.claude.com/docs/en/build-with-claude/batch-processing" }
    ]
  },
  {
    de: 9, n: 3, total: 60, sub: "4.1", subName: "Prompt có tiêu chí rõ để giảm false positive", scen: "S6",
    answer: "C",
    ask: "A new <code>duplicate_invoice</code> flag will send documents to human review. In a trial it also fired on legitimate monthly reorders, which repeat the vendor and amount of an earlier invoice. Last year, one flag with many false alarms taught reviewers to dismiss every flag, accurate ones included. How should the team roll out the new flag?",
    scene: [
      "Team thêm cờ <code>duplicate_invoice</code> (hóa đơn trùng). Cờ bật thì tài liệu sang người review.",
      "Chạy thử: cờ bật cả với các đơn đặt lại hằng tháng hợp lệ. Những đơn này lặp lại nhà cung cấp và số tiền của một hóa đơn cũ.",
      "Năm ngoái đã có bài học: một cờ báo nhầm nhiều làm reviewer bỏ qua mọi cờ, kể cả cờ đúng.",
      "Chỗ khó: đây là chuyện niềm tin của người review, không chỉ là độ chính xác của một cờ. Cờ mới ra mắt kèm báo nhầm đã biết thì kéo sập luôn các cờ đang đúng."
    ],
    asks: [
      "Team nên đưa cờ mới vào dùng thế nào?",
      "Tức là: không để reviewer thấy cờ cho tới khi biết chắc nó ít báo nhầm.",
      "Soi từng phương án: báo nhầm đã biết có còn tới tay reviewer không, và có ai đo precision trước không?"
    ],
    facts: [
      "False positive (báo nhầm): cờ bật ở ca không có vấn đề. Precision: trong các lần cờ bật, bao nhiêu phần trăm là đúng.",
      "Niềm tin sụp theo cụm: người review không tách “cờ này hay sai” với “cờ kia đúng”, họ chỉ nhớ “hệ thống hay sai”. Bài 4.1: loại báo nhầm nhiều thì tạm tắt, sửa riêng, đo lại trên bộ mẫu đã có đáp án rồi mới bật.",
      "Lời dặn kiểu “only when highly confident” (chỉ khi rất chắc) không phải tiêu chí: model không có điều kiện cụ thể để đối chiếu, còn confidence tự báo thì lệch xa độ đúng thật."
    ],
    opts: [
      { k: "A", gist: "Gate the flag so it fires only when an invoice repeats an earlier invoice's vendor and amount, then turn it on for all reviewers.",
        why: [
          "Siết điều kiện để tăng precision là hướng đúng, nhưng điều kiện chọn sai. Đơn đặt lại hằng tháng lặp đúng nhà cung cấp và số tiền, nên vẫn lọt qua cổng.",
          "Báo nhầm đã biết vẫn tới tay mọi reviewer, lặp lại chuyện năm ngoái (ý 2).",
          "Dễ bị cuốn vì “siết điều kiện bằng bằng chứng” nghe chặt chẽ. Nhưng bằng chứng đó chính là thứ các đơn hợp lệ cũng có."
        ] },
      { k: "B", gist: "Add a prompt instruction telling the model to raise <code>duplicate_invoice</code> only when it is highly confident.",
        why: [
          "Lời dặn mơ hồ, không phải tiêu chí (ý 3). Model vẫn không biết đơn đặt lại khác đơn trùng ở điểm nào.",
          "Cũng chẳng ai đo xem báo nhầm có giảm không trước khi bật cho reviewer."
        ] },
      { k: "C", gist: "Measure the flag's false-positive rate on a labeled document sample, and expose it to reviewers only once its precision is acceptable.",
        why: [
          "Đo precision trên mẫu đã có đáp án trước (ý 1), trong mẫu có cả đơn đặt lại hợp lệ. Reviewer chưa thấy cờ khi nó còn báo nhầm.",
          "Giữ được niềm tin vào các cờ đang đúng (ý 2): cờ mới chỉ ra mắt khi đã đạt chuẩn. Các ca báo nhầm đo được còn là dữ liệu để viết tiêu chí rõ hơn."
        ] },
      { k: "D", gist: "Turn the flag on for all reviewers now, tag each finding as beta, and attach a self-rated confidence score so reviewers can weigh it.",
        why: [
          "Báo nhầm đã biết vẫn tới tay reviewer, chỉ là có thêm nhãn beta (ý 2). Reviewer từng bị “lừa” một lần sẽ bỏ qua luôn, không ngồi cân từng điểm.",
          "Điểm tự chấm chưa hiệu chuẩn, không đáng tin hơn chính cái cờ (ý 3).",
          "Dễ bị cuốn vì nghe minh bạch: báo trước là bản thử, kèm mức tự tin. Nhưng đề đã cho biết hậu quả khi báo nhầm lọt tới người."
        ] }
    ],
    refs: [
      { label: "Bài 4.1, mục “Niềm tin sụp theo cụm”: loại báo nhầm nhiều thì tạm tắt, đo lại trên bộ mẫu có đáp án rồi mới bật", href: NOTES + "#l-4-1" },
      { label: "Bài 4.1, “Khi đi thi” dạng 2: một category báo sai kéo sập niềm tin vào cả reviewer", href: NOTES + "#fix-7" }
    ]
  },
  {
    de: 9, n: 4, total: 60, sub: "4.2", subName: "Few-shot cho output ổn định", scen: "S6",
    answer: "B",
    ask: "The model kept returning null for the nullable <code>po_number</code> field even when a PO number was on the document. The team fixed that by adding one few-shot example per document layout. Now, on receipts that truly have no PO number, the model makes up values in the standard format. What is the best fix?",
    scene: [
      "Trường <code>po_number</code> (số đơn đặt hàng) cho phép null. Lúc đầu model hay trả null dù tài liệu có in số PO.",
      "Team sửa bằng cách thêm cho mỗi kiểu bố cục tài liệu một ví dụ few-shot. Hết null sai.",
      "Giờ lỗi ngược lại: biên nhận thật sự không có số PO thì model bịa ra một số đúng định dạng chuẩn.",
      "Chỗ khó: ví dụ nào đang có cũng là ca tìm thấy số, nên bộ ví dụ dạy model rằng số PO lúc nào cũng có. Schema đã cho phép null, lỗi không nằm ở schema."
    ],
    asks: [
      "Cách sửa tốt nhất là gì?",
      "Tức là: giữ được phần đã sửa (không trả null sai), đồng thời dạy model khi nào phải trả null.",
      "Soi từng phương án: nó có cho model thấy ca “không có số thì trả null” không, và có giữ lại các ví dụ theo bố cục không?"
    ],
    facts: [
      "Few-shot: model bắt chước khuôn chung của các ví dụ. Ví dụ toàn ca có giá trị chính xác thì dạy model luôn điền giá trị. Bài 4.2: phải kèm ví dụ cho giá trị vắng, output là <code>null</code> hoặc “not specified” (không nêu).",
      "Khi mô tả bằng lời vẫn cho kết quả lệch, ví dụ là cách hiệu quả nhất. Một câu dặn đặt cạnh bộ ví dụ toàn làm ngược lại thì thua bộ ví dụ.",
      "Kiểm định dạng chỉ bắt được giá trị sai hình dạng. Giá trị bịa mà đúng định dạng thì vẫn qua."
    ],
    opts: [
      { k: "A", gist: "Add a firm instruction next to the schema telling the model never to output a PO number it cannot find in the document.",
        why: [
          "Đúng ý nhưng sai công cụ: câu dặn phải chọi với bộ ví dụ mà ví dụ nào cũng có số (ý 2). Model vẫn nghiêng theo khuôn của ví dụ.",
          "Dễ bị cuốn vì “never” (không bao giờ) nghe dứt khoát, đánh thẳng vào chuyện bịa. Nhưng model đang làm theo khuôn ví dụ, không phải quên lời dặn."
        ] },
      { k: "B", gist: "Add a few-shot example of a receipt with no PO number whose expected output is null, so the examples show when not to extract.",
        why: [
          "Sửa đúng gốc: bộ ví dụ giờ có cả hai phía. Có số thì trích, không có thì <code>null</code> (ý 1).",
          "Các ví dụ theo bố cục vẫn giữ nguyên, nên null sai cũ không quay lại. Thêm một ví dụ đối lập là đủ cho model thấy ranh giới."
        ] },
      { k: "C", gist: "Replace the layout examples with detailed prose describing where PO numbers appear in each document format.",
        why: [
          "Bỏ đúng thứ đã sửa được null sai, nên lỗi cũ dễ quay lại (ý 2).",
          "Tả chỗ đặt số PO cũng không nói cho model biết ca không có số thì làm gì. Lỗi bịa số vẫn còn."
        ] },
      { k: "D", gist: "Add a post-processing step that checks each extracted PO number against the standard format and discards values that fail.",
        why: [
          "Sai ở giả định: số bịa đã đúng định dạng chuẩn, nên qua được bộ kiểm (ý 3).",
          "Bộ kiểm chỉ lọc output méo, không ngăn model bịa ra số đẹp."
        ] }
    ],
    refs: [
      { label: "Bài 4.2, mục “Biết thêm”: kèm ví dụ cho giá trị vắng; ví dụ toàn số chính xác dạy model luôn bịa số", href: NOTES + "#l-4-2" },
      { label: "Bài 4.3: trường nullable để model nói “không có” thay vì bịa", href: NOTES + "#l-4-3" }
    ]
  },
  {
    de: 9, n: 5, total: 60, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool", scen: "S6",
    answer: "C",
    ask: "The pipeline's document lookup tool returns one status, “document unavailable”, both when the document store times out and when a query matches no document. Many queries legitimately match nothing, and documents whose lookup timed out end up permanently recorded as containing no data. What should you change?",
    scene: [
      "Tool tra tài liệu của pipeline chỉ có một trạng thái “document unavailable” (không có tài liệu) cho hai chuyện: kho tài liệu timeout (hết giờ chờ), và query không khớp tài liệu nào.",
      "Nhiều query thật sự không khớp gì. Với chúng, “không có” là câu trả lời đúng.",
      "Hậu quả: tài liệu bị timeout lúc tra được ghi luôn là không có dữ liệu, và không bao giờ được trích xuất.",
      "Chỗ khó: hai chuyện khác nhau đi chung một trạng thái. Ví dụ minh họa:<pre><code>kho timeout             → \"document unavailable\"\ntra xong, không khớp gì → \"document unavailable\"</code></pre>Bên nhận không cách nào biết mình đang gặp ca nào."
    ],
    asks: [
      "Nên đổi gì?",
      "Tức là: tool phải trả hai thứ khác nhau cho “chưa tra được” và “tra rồi, không có”, để pipeline chỉ thử lại ca đầu.",
      "Soi từng phương án: sau khi đổi, nhìn một lần trả về có phân biệt được hai ca không?"
    ],
    facts: [
      "Access failure (không truy cập được): chưa biết nguồn có dữ liệu hay không, vd timeout. Cần quyết định có thử lại không. Valid empty result (kết quả rỗng hợp lệ): tra xong và thật sự không có gì khớp, đó là câu trả lời cuối. Hai ca phải trả về khác nhau.",
      "Lỗi tạm thời như timeout thì trả về như lỗi có đánh dấu (vd <code>isError</code>, loại transient), để bên gọi biết là thử lại được. Kết quả rỗng thì trả về như một lần gọi thành công.",
      "Thông tin tool không trả ra thì không ai suy ra được, kể cả Claude. Phải sửa ở đúng chỗ thông tin bị mất: phản hồi của tool."
    ],
    opts: [
      { k: "A", gist: "Retry every “document unavailable” result inside the pipeline with exponential backoff, so timed-out lookups eventually succeed before a document is recorded as empty.",
        why: [
          "Retry kèm backoff (chờ lâu dần giữa các lần thử) hợp với lỗi tạm thời. Nhưng ở đây nó retry cả những query vốn đã có câu trả lời đúng là “không khớp”, mà loại này nhiều.",
          "Hết lượt retry thì vẫn chỉ có một trạng thái (ý 1). Pipeline vẫn không biết là kho sập hay không có tài liệu, vẫn ghi nhầm.",
          "Dễ bị cuốn vì nó nhắm đúng chuyện timeout. Nhưng gốc là tín hiệu bị gộp, retry không tách được hai ca."
        ] },
      { k: "B", gist: "Make the extraction schema's fields nullable, so the model returns null instead of fabricating values when a document lacks information.",
        why: [
          "Nullable là thiết kế tốt cho trường vắng trong tài liệu, nhưng nó tác động ở bước trích xuất.",
          "Lỗi xảy ra sớm hơn, ở bước tra: tài liệu bị timeout chưa từng được lấy về, chưa tới lượt trích xuất (ý 3)."
        ] },
      { k: "C", gist: "Return a transient error for store timeouts and a successful empty result for queries that match nothing, so the pipeline retries only the timeouts.",
        why: [
          "Đúng cách tách access failure khỏi valid empty result (ý 1): timeout thành lỗi tạm thời, không khớp thành kết quả rỗng thành công (ý 2).",
          "Pipeline thử lại đúng các ca timeout, chấp nhận ngay các ca rỗng. Không tài liệu nào bị ghi nhầm là trống."
        ] },
      { k: "D", gist: "Instruct Claude in the system prompt to infer from context whether a “document unavailable” status means a timeout or a missing document.",
        why: [
          "Sai ở giả định: trạng thái gộp không mang tín hiệu gì để suy ra (ý 3). Context không có gì giúp phân biệt.",
          "Claude chỉ còn đoán, mà đoán thì có lúc sai. Thông tin phải có sẵn trong phản hồi của tool."
        ] }
    ],
    refs: [
      { label: "Bài 2.2, cuối mục “Lỗi trong hệ nhiều agent”: access failure và empty result hợp lệ phải trả về khác nhau", href: NOTES + "#l-2-2" },
      { label: "Bài 5.3: valid empty và access failure cần hai quyết định khác nhau", href: NOTES + "#l-5-3" },
      { label: "Cheatsheet D2: dòng “Search trả mảng rỗng”: rỗng không phải lỗi, timeout không được giả làm rỗng", href: NOTES + "#cheat-d2" }
    ]
  },
  {
    de: 9, n: 6, total: 60, sub: "4.4", subName: "Validate, retry kèm lỗi và vòng phản hồi", scen: "S6",
    answer: "CD",
    ask: "Validation failures in the pipeline fall into two groups: dates extracted as MM/DD/YYYY instead of the required ISO 8601 format, and <code>purchase_order_number</code> failures on invoices that contain no purchase order number at all. Which two handling decisions are correct? (Choose two.)",
    scene: [
      "Lỗi validate (bước code kiểm nội dung output) chia làm hai nhóm.",
      "Nhóm 1: ngày bị trích theo dạng MM/DD/YYYY, trong khi schema đòi ISO 8601 (dạng 2026-03-05). Ngày có trong hóa đơn, chỉ viết sai dạng.",
      "Nhóm 2: <code>purchase_order_number</code> (số đơn đặt hàng) lỗi ở những hóa đơn không hề có số này.",
      "Chỗ khó: cùng là lỗi validate, nhưng một nhóm có thông tin trong nguồn, nhóm kia không. Đề bắt chọn hai, mỗi nhóm một cách xử lý."
    ],
    asks: [
      "Hai quyết định xử lý nào đúng?",
      "Tức là: nhóm nào retry thì sửa được, nhóm nào retry vô ích và phải xử lý ở chỗ khác.",
      "Soi từng phương án: thông tin cần có trong tài liệu không? Có thì retry kèm lỗi, không thì để null."
    ],
    facts: [
      "Retry-with-error-feedback (gọi lại kèm lỗi): request lượt sau chứa tài liệu gốc, JSON vừa trả và câu lỗi cụ thể do validator sinh ra. Cách này sửa được lỗi định dạng và lỗi trích xuất.",
      "Retry vô ích khi thông tin không có trong tài liệu nguồn. Gọi bao nhiêu lần cũng không moi ra thứ không có, lại còn dễ ép model bịa.",
      "Trường có thể vắng thì để nullable: model trả <code>null</code> thay vì bịa cho đủ trường required (bắt buộc).",
      "Schema chặt đi kèm quy tắc chuẩn hóa (mọi ngày về ISO 8601) để output đồng nhất cho hệ thống phía sau."
    ],
    opts: [
      { k: "A", gist: "Change the date fields in the schema to plain unconstrained strings, so extractions in either format pass validation.",
        why: [
          "Giấu lỗi chứ không sửa: validate hết báo, nhưng hệ thống phía sau nhận ngày lẫn lộn hai dạng (ý 4).",
          "Ngày có sẵn trong hóa đơn, sửa được bằng một lần retry kèm lỗi (ý 1). Nới schema là bỏ qua một lỗi dễ sửa."
        ] },
      { k: "B", gist: "Retry the <code>purchase_order_number</code> failures with the validation error and an instruction to re-scan the entire invoice.",
        why: [
          "Sai ở giả định: hóa đơn không có số PO, đọc lại bao lần cũng không thấy (ý 2).",
          "Retry còn đẩy model tới chỗ bịa ra một số cho qua validate.",
          "Dễ bị cuốn vì retry kèm lỗi là đúng bài 4.4. Nhưng nó chỉ đúng khi thông tin có trong nguồn."
        ] },
      { k: "C", gist: "Make <code>purchase_order_number</code> nullable in the schema and stop retrying those failures.",
        why: [
          "Đúng cho nhóm 2: số PO không có trong hóa đơn, nên retry vô ích (ý 2).",
          "Nullable cho model trả <code>null</code> một cách hợp lệ, không phải bịa cho đủ trường (ý 3). Hết lỗi validate mà dữ liệu vẫn thật."
        ] },
      { k: "D", gist: "Retry the date-format failures with the original invoice, the failed extraction, and the specific validation error.",
        why: [
          "Đúng cho nhóm 1: ngày có trong hóa đơn, chỉ sai dạng. Đây là loại lỗi retry sửa được (ý 1).",
          "Request có đủ ba thứ: hóa đơn gốc để đối chiếu, output cũ để biết mình đã viết gì, câu lỗi để biết sai ở đâu."
        ] }
    ],
    refs: [
      { label: "Bài 4.4, bảng ở mục “Chuyện gì đang xảy ra” và mục “Gọi lại cho đúng cách”: retry kèm lỗi cho lỗi định dạng, không retry khi thông tin vắng ở nguồn", href: NOTES + "#l-4-4" },
      { label: "Bài 4.3: trường nullable để không bịa cho đủ trường required", href: NOTES + "#l-4-3" }
    ]
  },
  {
    de: 9, n: 7, total: 60, sub: "4.5", subName: "Xử lý theo lô (Batch)", scen: "S6",
    answer: "A",
    ask: "A new document type refers to attachments whose text Claude needs in order to fill several schema fields. Each document is sent as one request in a nightly batch. The daily report must be built from the results of this one batch, which can take up to 24 hours to finish. How should the team handle the attachments?",
    scene: [
      "Loại tài liệu mới có nhắc tới file đính kèm. Claude cần nội dung các file đó mới điền được vài trường trong schema.",
      "Mỗi tài liệu là một request trong batch chạy đêm. Báo cáo hằng ngày phải lấy kết quả từ chính batch này, mà batch có thể mất tới 24 giờ.",
      "Chỗ khó: Claude cần thêm dữ liệu giữa chừng, nhưng trong batch không có ai đứng giữa chạy tool rồi đưa kết quả lại cho model. Còn chia làm hai đợt thì có thể lỡ hạn báo cáo."
    ],
    asks: [
      "Team nên xử lý file đính kèm thế nào?",
      "Tức là: làm sao để mỗi request trong batch tự đủ thông tin, xong trong một lượt, gói gọn trong một đợt batch.",
      "Soi từng phương án: request có xong trong một lượt không, và cả việc có nằm gọn trong một khung 24 giờ không?"
    ],
    facts: [
      "Batch không chạy được vòng lặp tool phía client trong một request. Định nghĩa tool và server tools (như web search) vẫn dùng được, nhưng tool do mày tự viết thì không ai chạy giữa chừng: mỗi request là một lượt, response dừng ở lời gọi tool.",
      "Batch rẻ 50%, đa số xong trong một giờ nhưng có thể tới 24 giờ, không cam kết thời gian. Hai batch nối nhau thì trường hợp xấu nhất là hai khung 24 giờ.",
      "Docs: batch nhận được hội thoại nhiều lượt. Nên code của mày có thể chạy tool, nối kết quả vào hội thoại rồi gửi tiếp ở một batch sau, nhưng đó là một đợt mới."
    ],
    opts: [
      { k: "A", gist: "Fetch the attachments during preprocessing and put their text into each batch request, so every request finishes in a single model turn.",
        why: [
          "Lấy file trước khi gửi, nhét nội dung vào request: model có đủ dữ liệu ngay từ đầu, không cần gọi tool (ý 1).",
          "Mỗi request xong trong một lượt, cả lô nằm gọn trong một khung batch, kịp báo cáo (ý 2). Vẫn giữ được giá giảm 50%."
        ] },
      { k: "B", gist: "Submit the batch, run <code>fetch_attachment</code> for each <code>tool_use</code> response, and continue every conversation in a second batch that carries the tool results.",
        why: [
          "Chạy được: code nối kết quả tool vào hội thoại rồi gửi batch thứ hai (ý 3).",
          "Nhưng batch thứ hai là thêm một khung tới 24 giờ. Xấu nhất một tài liệu mất hai khung, lỡ báo cáo (ý 2).",
          "Dễ bị cuốn vì đây là cách đúng để làm nhiều lượt bằng batch. Nhưng đề đã chốt “this single batch” (chỉ một batch này)."
        ] },
      { k: "C", gist: "Define <code>fetch_attachment</code> in each batch request and let the Batch API run the tool mid-request, since tool use is a supported batch feature.",
        why: [
          "Sai ở giả định: batch nhận định nghĩa tool, nhưng không chạy tool do mày viết rồi đưa kết quả lại cho model (ý 1).",
          "Response dừng ở lời gọi <code>fetch_attachment</code>, các trường cần nội dung file vẫn trống.",
          "Dễ bị cuốn vì docs đúng là ghi batch hỗ trợ tool use. Nhưng hỗ trợ nghĩa là request được có tool, response được có lời gọi tool, chứ batch không tự chạy tool."
        ] },
      { k: "D", gist: "Move all extraction traffic, for every document type, to the synchronous API so the model can call <code>fetch_attachment</code> and continue in real time.",
        why: [
          "Gọi thường thì chạy được vòng tool, nhưng làm quá tay: chỉ loại tài liệu mới cần file đính kèm.",
          "Mọi loại tài liệu khác mất phần giảm 50% của batch mà không được gì thêm (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Chuyện gì đang xảy ra”: batch không chạy vòng lặp tool phía client, mỗi request một lượt; tối đa 24 giờ, không cam kết thời gian", href: NOTES + "#l-4-5" },
      { label: "Cheatsheet D4, mục “Tên và con số phải thuộc”: Batch không có tool loop phía client (server tools vẫn chạy)", href: NOTES + "#cheat-d4" },
      { label: "Docs Batch processing, mục What can be batched và Batch limitations: tool use, hội thoại nhiều lượt; đa số xong trong 1 giờ, tối đa 24 giờ", href: "https://platform.claude.com/docs/en/build-with-claude/batch-processing" }
    ]
  },
  {
    de: 9, n: 8, total: 60, sub: "5.4", subName: "Quản lý context khi khám phá codebase lớn", scen: "S6",
    answer: "B",
    ask: "A long session spent tuning the invoice extraction prompts has nearly filled the context window with verbose test output. The next task, designing a schema for a new contract document type, depends on nothing from this session. Which command should the engineer run before starting that task?",
    scene: [
      "Kỹ sư dùng một phiên Claude Code dài để tinh chỉnh prompt trích xuất hóa đơn. Context gần đầy, phần lớn là output test dài dòng.",
      "Việc kế tiếp: thiết kế schema cho loại tài liệu mới là hợp đồng.",
      "Đề nói rõ việc mới “depends on nothing from this session” (không cần gì từ phiên này). Câu này quyết định đáp án.",
      "Chỗ khó: lệnh nào cũng dọn hoặc dời được chỗ, nhưng chỉ một lệnh không mang gì của việc cũ sang việc mới."
    ],
    asks: [
      "Trước khi bắt đầu việc mới, kỹ sư nên chạy lệnh nào?",
      "Tức là: cho việc mới một context sạch, không kéo theo gì của phiên tinh chỉnh hóa đơn.",
      "Soi từng phương án: sau lệnh đó, việc thiết kế schema còn phải mang theo gì của việc cũ không (toàn bộ lịch sử, hay bản tóm tắt)?"
    ],
    facts: [
      "<code>/compact</code> nén lịch sử thành bản tóm tắt rồi phiên chạy tiếp. Thêm chỉ dẫn được, vd <code>/compact focus on &lt;chủ đề&gt;</code>. Hợp khi việc sau cần thứ của việc trước.",
      "<code>/clear</code> bắt đầu hội thoại mới với context trống. Docs: chạy <code>/clear</code> khi chuyển sang việc không liên quan, vì hội thoại cũ chiếm chỗ của thứ mày cần tiếp và tốn token ở mọi tin nhắn.",
      "Claude Code tự compact khi context gần đầy, và lượt tự động làm y như <code>/compact</code>. <code>/autocompact</code> kèm một số token (vd <code>/autocompact 500k</code>) chỉ đặt mức context đầy tới đâu thì lượt tự động chạy."
    ],
    opts: [
      { k: "A", gist: "Run <code>/compact</code> with a focus instruction naming the schema task, so a summary carries forward into the new work.",
        why: [
          "Compact có focus là cách tốt khi việc sau cần quyết định của việc trước (ý 1). Ở đây việc mới không cần gì.",
          "Bản tóm tắt việc hóa đơn vẫn nằm trong context, chiếm chỗ và tốn token ở mọi tin nhắn sau mà không giúp gì (ý 2).",
          "Dễ bị cuốn vì có “focus instruction” (chỉ dẫn tập trung) nghe chu đáo. Nhưng focus chỉ chọn giữ gì của việc cũ, mà việc mới thì không cần giữ gì."
        ] },
      { k: "B", gist: "Run <code>/clear</code> to start a new conversation with empty context before beginning the schema work.",
        why: [
          "Đúng chỗ dùng <code>/clear</code>: chuyển sang việc không liên quan (ý 2). Việc thiết kế schema bắt đầu với context trống.",
          "Không gì của phiên hóa đơn đi theo, kể cả bản tóm tắt. Đúng điều đề cài sẵn bằng câu “depends on nothing”."
        ] },
      { k: "C", gist: "Stay in the same session and let auto-compaction summarize the history once context reaches the threshold.",
        why: [
          "Lượt tự compact làm y như <code>/compact</code> (ý 3), nên việc mới vẫn mang bản tóm tắt việc hóa đơn.",
          "Lại còn không chọn được lúc nào nén và nén giữ những gì."
        ] },
      { k: "D", gist: "Raise the auto-compact window with <code>/autocompact</code> so the session has more room before summarization triggers.",
        why: [
          "Sai việc: lệnh này chỉ dời lúc tự compact (ý 3), không dọn gì. Toàn bộ lịch sử hóa đơn vẫn nằm nguyên.",
          "Việc mới cần context sạch, không cần thêm chỗ để chứa đồ cũ."
        ] }
    ],
    refs: [
      { label: "Bài 5.4, mục “Biết thêm”: /compact focus giữ thứ mày chọn, /clear chỉ cho việc khác hẳn", href: NOTES + "#l-5-4" },
      { label: "Docs Explore the context window, mục When your context fills up: Clear between tasks, /autocompact, lượt tự compact giống /compact", href: "https://code.claude.com/docs/en/context-window" }
    ]
  },
  {
    de: 9, n: 9, total: 60, sub: "5.1", subName: "Giữ thông tin quan trọng trong hội thoại dài", scen: "S6",
    answer: "AC",
    ask: "In long invoice review sessions, context editing with the <code>clear_tool_uses_20250919</code> strategy removes older tool results. Later, Claude misquotes invoice amounts and statuses it extracted earlier. Which two changes keep those exact values available to Claude? (Choose two.)",
    scene: [
      "Phiên review hóa đơn kéo dài. Team bật context editing với chiến lược <code>clear_tool_uses_20250919</code>: tool result cũ bị xóa khỏi prompt.",
      "Về sau Claude nhắc sai số tiền và trạng thái của các hóa đơn nó đã trích trước đó.",
      "Chỗ khó: các con số chỉ nằm trong tool result cũ. Tool result bị xóa thì con số mất theo. Cần chỗ giữ con số nằm ngoài vùng bị xóa, mà Claude vẫn đọc lại được về sau."
    ],
    asks: [
      "Hai thay đổi nào giữ được đúng các giá trị đó cho Claude?",
      "Tức là: con số phải sống ở chỗ context editing không đụng tới, và quay lại được trước mắt Claude ở các lượt sau.",
      "Soi từng phương án: lưu ở đâu, có nằm ngoài tool result không, và Claude có đọc lại được không?"
    ],
    facts: [
      "Context editing <code>clear_tool_uses_20250919</code>: context vượt ngưỡng thì API xóa các tool result cũ nhất, thay bằng placeholder (chỗ giữ chỗ), giữ lại vài kết quả gần nhất. Mặc định chỉ xóa tool result, không đụng phần khác của request.",
      "Case facts block: khối dữ liệu có cấu trúc ghi các sự kiện (mã, số tiền, trạng thái). App đưa nguyên văn vào mọi request, nằm ngoài phần bị nén hay bị xóa.",
      "Memory tool: Claude ghi và đọc file trong thư mục <code>/memories</code>, còn app của mày chạy thao tác và giữ chỗ lưu. Docs Context editing: dùng chung với memory tool thì khi context gần ngưỡng xóa, Claude nhận cảnh báo để lưu thông tin quan trọng vào memory, rồi tra lại khi cần.",
      "<code>strict: true</code> trên tool bảo đảm input của lời gọi tool khớp schema lúc sinh. Nó không giữ gì lại trong context."
    ],
    opts: [
      { k: "A", gist: "Keep a structured block of confirmed invoice IDs, amounts, and statuses that the application adds to every request, outside the tool results.",
        why: [
          "Đúng case facts block (ý 2). Khối này không phải tool result nên context editing không xóa (ý 1).",
          "App đưa nguyên văn khối vào mọi request, nên con số giữ y nguyên, miễn là app không tự tóm tắt hay cắt bớt nó."
        ] },
      { k: "B", gist: "Turn on strict tool use for the extraction tool so its inputs are grammar-constrained to match the JSON schema exactly.",
        why: [
          "Sai việc: strict chỉ bảo đảm input của lời gọi tool đúng schema lúc gọi (ý 4).",
          "Tool result vẫn bị xóa như cũ, Claude vẫn nhắc sai số."
        ] },
      { k: "C", gist: "Add the Memory tool so Claude saves each confirmed record to memory files before the clearing strategy removes the tool results that held it.",
        why: [
          "Docs ghi đúng cặp này (ý 3): gần ngưỡng xóa thì Claude nhận cảnh báo, ghi các bản ghi đã xác nhận vào memory trước khi tool result bị xóa.",
          "Lượt sau cần thì Claude đọc lại file memory, nên vẫn có đúng con số dù tool result gốc đã mất."
        ] },
      { k: "D", gist: "Define a strict client tool that writes each confirmed record to a database, so the exact values are stored durably as they are extracted.",
        why: [
          "Lưu bền thì có, nhưng chỉ một chiều: dữ liệu vào database, không có đường nào đưa nó lại vào hội thoại.",
          "Tool result bị xóa thì Claude vẫn không thấy con số, vẫn nhắc sai. Memory tool khác ở chỗ Claude tự đọc lại được (ý 3).",
          "Dễ bị cuốn vì nghe chắc nhất: database, strict, lưu ngay lúc trích. Nhưng đề hỏi Claude có thấy con số không, chứ không hỏi dữ liệu có mất không."
        ] }
    ],
    refs: [
      { label: "Bài 5.1, khung “Tốt” và mục “Biết thêm”: case facts block trong mọi request; context editing clear_tool_uses_20250919", href: NOTES + "#l-5-1" },
      { label: "Docs Context editing, mục Using with the memory tool: Claude được cảnh báo trước khi xóa để lưu vào memory, tra lại khi cần", href: "https://platform.claude.com/docs/en/build-with-claude/context-editing" },
      { label: "Docs Memory tool: file trong /memories, app chạy thao tác và giữ chỗ lưu, Claude đọc lại theo nhu cầu", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool" }
    ]
  },
  {
    de: 9, n: 10, total: 60, sub: "5.2", subName: "Escalate và xử lý chỗ mơ hồ", scen: "S6",
    answer: "A",
    ask: "A submitter disputes an extracted invoice total and writes: “Have a person check this; do not run it through the automation again.” The extraction had passed schema validation with high field confidence. How should the workflow respond?",
    scene: [
      "Người gửi tài liệu không đồng ý với tổng tiền đã trích, và viết: “Have a person check this; do not run it through the automation again.” (Cho người kiểm cái này; đừng chạy lại qua hệ thống tự động.)",
      "Bản trích đó đã qua validate schema, confidence của trường cao.",
      "Chỗ khó: mọi tín hiệu tự động đều nói “ổn”, chỉ có con người nói “không”. Và họ đã nói rõ họ muốn gì."
    ],
    asks: [
      "Workflow nên phản hồi thế nào?",
      "Tức là: một yêu cầu rõ ràng muốn người kiểm thì xử lý ra sao, khi các tín hiệu tự động lại đẹp.",
      "Soi từng phương án: có đưa người kiểm ngay không, hay vẫn để automation quyết thêm một bước?"
    ],
    facts: [
      "Ba trigger escalate (chuyển sang người) của guide: người dùng yêu cầu gặp người thật, policy không có hoặc mơ hồ, agent không thể tiến triển. Yêu cầu rõ ràng thì chuyển ngay, không điều tra trước.",
      "Confidence model tự báo hiệu chuẩn kém: model có thể tự tin ở chính chỗ nó sai. Điểm cao không bác được một lời khiếu nại.",
      "Stratified random sampling (lấy mẫu ngẫu nhiên phân tầng) là việc đo tỉ lệ lỗi định kỳ trên cả dòng tài liệu, không phải cách xử lý một ca đang có người chờ.",
      "Retry chủ yếu sửa lỗi định dạng và cấu trúc. Output đúng schema vẫn có thể sai giá trị."
    ],
    opts: [
      { k: "A", gist: "Send the document straight to the human review queue, skipping the automated retry and re-extraction steps.",
        why: [
          "Đúng trigger thứ nhất: người gửi yêu cầu rõ ràng có người kiểm (ý 1). Chuyển ngay, không bắt họ chờ thêm vòng tự động nào.",
          "Họ còn dặn thẳng “do not run it through the automation again” (đừng chạy lại tự động). Bỏ qua retry và trích lại là làm đúng lời đó."
        ] },
      { k: "B", gist: "Check the field's calibrated confidence score and route to human review only if it falls below the review threshold.",
        why: [
          "Điểm đã cao, nên cổng này sẽ từ chối đúng thứ người gửi yêu cầu (ý 1).",
          "Confidence cũng không bắt được ca model tự tin mà sai (ý 2), mà một con số bị khiếu nại có thể chính là ca đó.",
          "Dễ bị cuốn vì route theo confidence đã hiệu chuẩn là đúng bài 5.5. Nhưng đó là cách chia công review cho cả dòng tài liệu, không phải cách trả lời một người đã nói rõ họ muốn gì."
        ] },
      { k: "C", gist: "Add the document to the next stratified sampling audit so the error-rate measurement includes contested cases.",
        why: [
          "Sai việc: lấy mẫu là để đo, không phải để giải quyết một ca (ý 3).",
          "Tài liệu nằm chờ tới đợt audit sau, chưa chắc được xem kỹ. Người gửi không được ai kiểm như họ đã yêu cầu."
        ] },
      { k: "D", gist: "Re-run the extraction with the disputed field named in the prompt, and escalate only if the second pass returns a different total.",
        why: [
          "Trái thẳng lời người gửi: họ đã bảo đừng chạy lại tự động.",
          "Lượt hai ra cùng con số cũng không chứng minh gì: retry chủ yếu sửa lỗi định dạng, còn giá trị đúng schema vẫn có thể sai (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 5.2, mục “Đã sửa 01/11”: ba trigger escalate, yêu cầu gặp người rõ ràng thì chuyển ngay, không điều tra trước", href: NOTES + "#fix-9" },
      { label: "Cheatsheet D5: dòng “Khách nói I want to talk to a human”: escalate ngay", href: NOTES + "#cheat-d5" },
      { label: "Bài 5.5: confidence phải hiệu chuẩn, và chỉ để chia công review cho cả dòng tài liệu", href: NOTES + "#l-5-5" }
    ]
  },
  {
    de: 9, n: 11, total: 60, sub: "4.2", subName: "Few-shot cho output ổn định", scen: "S6",
    answer: "C",
    ask: "Every billing statement the pipeline handles shows three dates: a statement date, a payment due date and a period end date. The prompt already spells out detailed written rules, yet the model sometimes puts the due date into <code>billing_period_end</code>, and every such output still passes the schema. Which change most reliably makes the date choice consistent?",
    scene: [
      "Mỗi bản sao kê có ba ngày: ngày lập sao kê, hạn thanh toán, ngày cuối kỳ. Trường <code>billing_period_end</code> (ngày cuối kỳ) phải lấy đúng ngày thứ ba.",
      "Prompt đã có luật viết bằng lời rất chi tiết. Model vẫn có lúc lấy hạn thanh toán bỏ vào <code>billing_period_end</code>.",
      "Chỗ khó: output sai vẫn qua schema. Ví dụ minh họa:<pre><code>Statement date:  2026-03-01\nPayment due:     2026-03-21\nPeriod end:      2026-02-28\n\n→ billing_period_end: \"2026-03-21\"   (sai, nhưng vẫn là ngày hợp lệ)</code></pre>Cả ba đều là chuỗi ngày đúng định dạng, nên schema không thấy gì bất thường."
    ],
    asks: [
      "Đổi gì để model chọn ngày nhất quán nhất?",
      "Tức là: luật bằng lời đã thử và không đủ. Cần cho model thấy cách chọn đúng ngày trong ba ngày, chứ không phải ép thêm hình dạng.",
      "Soi từng phương án: nó sửa phần hình dạng hay phần chọn đúng giá trị? Và nó có phải lại là thêm lời mô tả không?"
    ],
    facts: [
      "Few-shot là đặt vài ví dụ mẫu input → output vào prompt để Claude bắt chước. Guide: khi chỉ dẫn chi tiết vẫn cho kết quả không nhất quán, few-shot là kỹ thuật hiệu quả nhất.",
      "Ví dụ nên nhắm đúng ca mơ hồ và kèm lý do. Có lý do, model mới khái quát được: áp cách chọn sang tài liệu mới chưa từng thấy, thay vì chỉ khớp y hệt ví dụ.",
      "Schema, kể cả khi bật <code>strict: true</code>, chỉ lo cú pháp: đúng kiểu, đủ trường. Nó không biết giá trị có đúng nghĩa không. Hạn thanh toán vẫn là một ngày hợp lệ.",
      "Vòng validate rồi retry chỉ chạy khi validator bắt được lỗi. Validator theo schema không thấy lỗi ngữ nghĩa, nên không bao giờ gọi lại cho lỗi này."
    ],
    opts: [
      { k: "A", gist: "Turn on strict tool use so the extraction tool's input is grammar-constrained to match the JSON schema exactly.",
        why: [
          "Sai chỗ: strict chỉ ép đúng hình dạng (ý 3). Output hiện giờ đã qua schema rồi.",
          "Hạn thanh toán bỏ vào <code>billing_period_end</code> vẫn là chuỗi ngày hợp lệ. Grammar không có cách nào biết nó sai nghĩa, nên lỗi giữ nguyên."
        ] },
      { k: "B", gist: "Expand the description of the <code>billing_period_end</code> field in the JSON schema with more precise written rules for choosing among the candidate dates.",
        why: [
          "Vẫn là luật viết bằng lời, chỉ dời chỗ đặt từ prompt sang description của trường. Đề đã nói luật lời chi tiết không đủ (ý 1).",
          "Dễ bị cuốn vì description rõ ràng là cách làm tốt cho schema. Nhưng thêm chữ không cho model thấy ranh giới giữa ba ngày trông giống nhau. Ví dụ mới làm được việc đó."
        ] },
      { k: "C", gist: "Add three to five prompt examples, each showing a statement with several dates, the correct <code>billing_period_end</code>, and the evidence for that choice.",
        why: [
          "Đúng ca few-shot: luật bằng lời đã thử mà vẫn lệch, giờ cho model thấy cách chọn (ý 1).",
          "Mỗi ví dụ có đủ ba ngày, đáp án đúng và bằng chứng (dòng nào trên sao kê cho biết đó là ngày cuối kỳ). Có lý do đi kèm, model áp được cách chọn sang sao kê mới (ý 2).",
          "Nó sửa đúng phần ngữ nghĩa, chỗ mà schema và retry không với tới (ý 3, ý 4)."
        ] },
      { k: "D", gist: "Add a validation-retry loop that sends every schema validation failure back to the model so it can correct itself.",
        why: [
          "Vòng này chỉ chạy khi có lỗi validation (ý 4). Output sai ngày vẫn qua schema, nên không có lỗi nào để gửi lại.",
          "Chạy được, nhưng không bao giờ được kích hoạt cho đúng lỗi đang cần sửa."
        ] }
    ],
    refs: [
      { label: "Bài 4.2, mục “Chuyện gì đang xảy ra”: chỉ dẫn chi tiết vẫn lệch thì few-shot là kỹ thuật hiệu quả nhất; ví dụ kèm lý do để khái quát", href: NOTES + "#l-4-2" },
      { label: "Bài 4.3, khung “Khái niệm của bài”: cú pháp vs ngữ nghĩa, schema chỉ lo phần thứ nhất", href: NOTES + "#l-4-3" }
    ]
  },
  {
    de: 9, n: 12, total: 60, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema", scen: "S6",
    answer: "A",
    ask: "Source documents write money amounts in inconsistent formats. To normalize them, an engineer adds two constraints to the raw JSON schema sent in <code>output_config.format</code>: <code>minimum: 0</code> on the amount field and <code>maxLength: 3</code> on the currency field. Since then the API rejects every request with a 400 error. How should the team get normalized amount and currency values?",
    scene: [
      "Tài liệu nguồn ghi tiền mỗi nơi một kiểu. Ví dụ minh họa: “$1,200.50”, “1.200,50 USD”, “twelve hundred dollars”.",
      "Kỹ sư muốn chuẩn hóa bằng schema: thêm <code>minimum: 0</code> (không âm) cho trường số tiền và <code>maxLength: 3</code> (tối đa 3 ký tự) cho trường tiền tệ. Schema gửi qua <code>output_config.format</code>, tức structured outputs, không dùng tool.",
      "Từ đó mọi request đều bị API trả lỗi 400. Không có output nào được sinh ra.",
      "Chỗ khó: ý định đúng (số không âm, mã tiền tệ ba chữ), nhưng đặt sai chỗ."
    ],
    asks: [
      "Team phải làm gì để vẫn có số tiền và mã tiền tệ đã chuẩn hóa?",
      "Tức là: request phải chạy lại được, và quy tắc chuẩn hóa phải nằm ở chỗ Claude đọc và làm theo.",
      "Soi từng phương án: request còn bị 400 không? Nếu hết 400 thì việc chuẩn hóa còn nằm ở bước trích xuất không?"
    ],
    facts: [
      "Structured outputs (<code>output_config.format</code>) và strict tool use (<code>strict: true</code>) cùng compile schema thành grammar, và cùng chịu một bộ giới hạn JSON Schema.",
      "Docs ghi: ràng buộc số (<code>minimum</code>, <code>maximum</code>, <code>multipleOf</code>) và ràng buộc độ dài chuỗi (<code>minLength</code>, <code>maxLength</code>) không được hỗ trợ. Gửi tính năng không hỗ trợ thì nhận lỗi 400.",
      "Schema giữ hình dạng: kiểu, <code>enum</code>, <code>required</code>, <code>additionalProperties: false</code>. Quy tắc chuẩn hóa thì ghi vào prompt và description của trường. SDK helper cũng làm đúng vậy: gỡ ràng buộc không hỗ trợ khỏi schema gửi đi, chép nó vào description.",
      "Retry kèm lỗi cần một output để kiểm. Lỗi 400 nghĩa là request bị từ chối, chưa có output nào."
    ],
    opts: [
      { k: "A", gist: "Remove the <code>minimum</code> and <code>maxLength</code> constraints from the schema and state the normalization rules in the prompt and the field descriptions.",
        why: [
          "Bỏ hai ràng buộc không hỗ trợ thì request hết 400 (ý 2).",
          "Quy tắc chuẩn hóa chuyển sang chỗ Claude đọc khi điền: prompt và description của trường, vd “amount là số không âm, không kèm ký hiệu tiền”, “currency là mã ba chữ như USD” (ý 3). Schema vẫn giữ tên trường, kiểu, trường bắt buộc.",
          "Đây cũng chính là cách SDK helper tự xử lý ràng buộc không hỗ trợ (ý 3)."
        ] },
      { k: "B", gist: "Move the extraction into a tool defined with <code>strict: true</code>, so the API enforces <code>minimum</code> and <code>maxLength</code> on the tool input.",
        why: [
          "Sai ở giả định: strict tool use chịu chung giới hạn schema với structured outputs (ý 1). <code>minimum</code> và <code>maxLength</code> vẫn không được hỗ trợ.",
          "Đổi cơ chế mà giữ nguyên ràng buộc thì vẫn lỗi 400 như cũ (ý 2).",
          "Dễ bị cuốn vì strict nghe như “chặt hơn nữa”. Nhưng chặt ở đây là ép theo grammar, mà grammar không có hai ràng buộc này."
        ] },
      { k: "C", gist: "Turn amount and currency into plain unconstrained strings and let the downstream billing system parse and normalize the values.",
        why: [
          "Request chạy được, nhưng việc chuẩn hóa bị đẩy xuống hệ billing.",
          "Hệ billing nhận lại đúng mớ định dạng lộn xộn ban đầu, phải tự parse cả kiểu số tiền viết bằng chữ. Bước trích xuất bỏ mất đúng việc nó được dựng ra để làm."
        ] },
      { k: "D", gist: "Keep the schema as it is and add a validation-retry loop that sends each validation error back to Claude together with the failing extraction.",
        why: [
          "Sai ở giả định: không có output nào để kiểm (ý 4). API từ chối request trước khi Claude sinh gì.",
          "Gửi lại với cùng schema thì lần nào cũng 400."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, mục “Thiết kế schema để model không bịa”: quy tắc chuẩn hóa đặt trong prompt cạnh schema chặt", href: NOTES + "#l-4-3" },
      { label: "Docs Structured outputs, mục JSON Schema limitations: minimum, maxLength không được hỗ trợ, gửi lên thì lỗi 400; strict tool use chung giới hạn; SDK chép ràng buộc vào description", href: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs" }
    ]
  },
  {
    de: 9, n: 13, total: 60, sub: "4.3", subName: "Ép output có cấu trúc bằng tool_use và JSON schema", scen: "S6",
    answer: "B",
    ask: "The <code>category</code> enum has an <code>\"other\"</code> value plus a string field <code>other_detail</code>. Three months after launch, 30% of documents are labeled <code>\"other\"</code>, and the detail values keep naming the same three new document types that no current category covers. How should the team respond?",
    scene: [
      "Schema phân loại tài liệu có enum <code>category</code>, trong đó có giá trị <code>\"other\"</code> đi kèm trường chuỗi <code>other_detail</code> (mô tả cho ca “khác”).",
      "Ba tháng sau, 30% tài liệu bị gắn <code>\"other\"</code>. Đọc <code>other_detail</code> thì thấy lặp đi lặp lại ba loại tài liệu mới mà danh sách hiện tại không có.",
      "Chỗ khó: model không sai. Ba loại đó đúng là không thuộc loại nào trong danh sách, nên <code>\"other\"</code> là nhãn trung thực. Cái đã cũ là danh sách."
    ],
    asks: [
      "Team nên phản ứng thế nào?",
      "Tức là: dùng tín hiệu trong <code>other_detail</code> để sửa danh sách loại, mà vẫn giữ chỗ cho loại mới về sau.",
      "Soi từng phương án: nó sửa danh sách, hay ép model đổi một nhãn đang đúng thành nhãn sai?"
    ],
    facts: [
      "Enum là danh sách giá trị được phép. Danh sách thiếu giá trị đúng thì model buộc phải chọn giá trị gần nhất, tức là chọn sai.",
      "Guide 4.3: enum thêm <code>\"other\"</code> kèm một trường <code>detail</code> dạng chuỗi để mở rộng. Mở rộng nghĩa là: trường detail ghi lại cái gì đang lọt ra ngoài danh sách, loại nào lặp lại nhiều thì nâng thành giá trị enum riêng.",
      "Few-shot giúp model áp đúng các loại đã có ở ca mơ hồ. Nó không tạo ra được một loại chưa có trong enum.",
      "Retry kèm lỗi sửa được khi output sai so với tài liệu. Khi output đã là câu trả lời trung thực, gọi lại chỉ ép model đổi sang đáp án sai."
    ],
    opts: [
      { k: "A", gist: "Add few-shot examples showing how to map these documents onto the existing named categories.",
        why: [
          "Sai ở giả định: ba loại này không thuộc loại nào hiện có (ý 3). Không có nhãn đúng nào để ví dụ chỉ tới.",
          "Kết quả là đổi nhãn <code>\"other\"</code> trung thực lấy nhãn sai trông tự tin, và tài liệu bị định tuyến nhầm (ý 1).",
          "Dễ bị cuốn vì few-shot hay là đáp án đúng ở Domain 4. Nhưng nó sửa chuyện model áp sai loại có sẵn, còn ở đây loại đó chưa tồn tại."
        ] },
      { k: "B", gist: "Promote the three recurring document types to named enum values, and keep <code>\"other\"</code> with its detail field for future unknowns.",
        why: [
          "Đúng mục đích của cặp <code>\"other\"</code> + detail (ý 2): detail cho biết loại nào đang lọt ra ngoài, loại lặp lại thì nâng thành giá trị enum riêng.",
          "Ba loại mới có nhãn rõ để máy định tuyến. <code>\"other\"</code> vẫn còn để đón loại mới tiếp theo khi nguồn tài liệu đổi."
        ] },
      { k: "C", gist: "Remove <code>\"other\"</code> from the enum so the model has to choose one of the defined categories.",
        why: [
          "Bỏ lối thoát thì mọi tài liệu ngoài danh sách bị ép vào loại gần nhất (ý 1). Đúng lỗi mà <code>\"other\"</code> được thêm vào để tránh.",
          "Còn mất luôn <code>other_detail</code>, tức mất chính tín hiệu vừa cho team biết có ba loại mới."
        ] },
      { k: "D", gist: "Send every extraction labeled <code>\"other\"</code> back through a retry loop with a validation error so the model corrects itself to a named category.",
        why: [
          "Sai ở giả định: <code>\"other\"</code> ở đây không phải lỗi, nó là câu trả lời trung thực (ý 4).",
          "Bị gọi lại kèm câu lỗi, model chỉ còn cách đổi sang một loại có tên nhưng sai. Tốn thêm lượt gọi để ra dữ liệu tệ hơn."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, mục “Thiết kế schema để model không bịa”: enum thêm other kèm trường detail để mở rộng", href: NOTES + "#l-4-3" },
      { label: "Bài 4.2, mục “Bốn chỗ few-shot phát huy”: ví dụ giúp áp đúng loại có sẵn ở ca mơ hồ", href: NOTES + "#l-4-2" }
    ]
  },
  {
    de: 9, n: 14, total: 60, sub: "4.6", subName: "Review độc lập và review nhiều lượt", scen: "S6",
    answer: "B",
    ask: "Extractions pass JSON schema validation, but spot checks turn up subtle errors, such as values taken from a superseded table in the document. The team added a review turn in the same conversation, yet that review approves the original extraction even on cases already known to be wrong. How should the team fix the review step?",
    scene: [
      "Output trích xuất qua schema hết. Kiểm tay ngẫu nhiên (spot check) mới thấy lỗi tinh vi: giá trị lấy từ một bảng đã bị thay thế (superseded: bảng cũ còn nằm trong tài liệu nhưng hết hiệu lực).",
      "Team thêm một lượt review ngay trong cùng cuộc hội thoại vừa trích xuất.",
      "Lượt review đó vẫn xác nhận bản trích xuất, kể cả ở những ca đã biết chắc là sai.",
      "Chỗ khó: lỗi nằm ở nghĩa, schema không bắt được. Và người review lại chính là người vừa làm."
    ],
    asks: [
      "Sửa bước review thế nào?",
      "Tức là: cho người review không mang theo lý do lúc trích xuất, để nó thật sự dò lại từ tài liệu.",
      "Soi từng phương án: sau khi đổi, người review còn thấy hội thoại lúc trích xuất không?"
    ],
    facts: [
      "Self-review là bảo chính phiên vừa sinh kết quả tự kiểm lại. Phiên đó vẫn giữ lý do lúc làm trong context, nên hay bảo vệ quyết định của mình.",
      "Instance độc lập là một lần gọi mới, context sạch, không thấy reasoning lúc sinh. Guide: instance độc lập bắt lỗi tinh vi tốt hơn cả lời dặn tự review lẫn extended thinking.",
      "Schema chỉ lo cú pháp. Giá trị lấy nhầm bảng vẫn đúng kiểu, nên không sinh ra lỗi validation nào."
    ],
    opts: [
      { k: "A", gist: "Rewrite the review turn so Claude must re-read the source document and justify every field before it confirms the extraction.",
        why: [
          "Lời dặn chặt hơn, nhưng vẫn chạy trong cùng hội thoại (ý 1). Model vẫn thấy lý do đã dẫn nó tới bảng cũ, và dễ biện minh lại đúng lý do đó.",
          "Dễ bị cuốn vì “đọc lại tài liệu, giải thích từng trường” nghe rất kỹ. Nhưng gốc lỗi là người review không độc lập, chữ trong lời dặn không gỡ được."
        ] },
      { k: "B", gist: "Send the document and the finished extraction to a second Claude instance that has no access to the generation conversation.",
        why: [
          "Đúng instance độc lập (ý 2): nó chỉ có tài liệu và bản trích xuất, không có lý do lúc trích.",
          "Muốn xác nhận một giá trị, nó phải tự dò lại trong tài liệu. Lúc đó bảng cũ và bảng mới nằm cạnh nhau, lỗi lấy nhầm bảng lộ ra."
        ] },
      { k: "C", gist: "Add few-shot examples to the same-conversation review turn that contrast correct extractions with wrong-table extractions.",
        why: [
          "Ví dụ làm rõ được tiêu chí, nhưng vẫn đặt trong cùng phiên đã mang sẵn lý do lúc trích (ý 1).",
          "Người review vẫn không độc lập, nên vẫn có xu hướng xác nhận kết luận cũ."
        ] },
      { k: "D", gist: "Feed the schema validation errors back in a retry prompt so Claude can fix the fields that failed.",
        why: [
          "Không có lỗi validation nào để gửi lại: output đã qua schema (ý 3).",
          "Lỗi ở đây là lỗi ngữ nghĩa. Retry theo lỗi schema không bao giờ chạm tới nó."
        ] }
    ],
    refs: [
      { label: "Bài 4.6, mục “Chuyện gì đang xảy ra”: phiên vừa sinh giữ lý do lúc viết; instance độc lập bắt lỗi tinh vi tốt hơn", href: NOTES + "#l-4-6" },
      { label: "Bài 4.3, khung “Khái niệm của bài”: cú pháp vs ngữ nghĩa, schema chỉ lo phần thứ nhất", href: NOTES + "#l-4-3" }
    ]
  },
  {
    de: 9, n: 15, total: 60, sub: "4.1", subName: "Prompt có tiêu chí rõ để giảm false positive", scen: "S6",
    answer: "AB",
    ask: "An extraction prompt tells Claude to extract a date only when it is “confident” the date is correct. The extraction runs through a tool whose schema already marks the date field as nullable. Partly legible or unlabeled dates are sometimes extracted and sometimes returned as null, and the team cannot predict which outcome a given document will get. Which two changes most improve consistency? (Choose two.)",
    scene: [
      "Prompt dặn: chỉ trích ngày khi “confident” (chắc chắn) là đúng. Schema của tool đã cho trường ngày là nullable (được để <code>null</code>).",
      "Ngày mờ một phần, hoặc ngày không có nhãn đi kèm: lúc thì được trích, lúc thì ra <code>null</code>. Team không đoán trước được tài liệu nào ra kiểu nào.",
      "Chỗ khó: lối thoát <code>null</code> đã có. Cái thiếu là ranh giới khi nào được dùng nó. “Confident” là cảm giác, không phải điều kiện kiểm được."
    ],
    asks: [
      "Hai thay đổi nào cải thiện độ nhất quán nhiều nhất?",
      "Tức là: biến ranh giới “khi nào trích, khi nào trả null” thành thứ model kiểm được hoặc nhìn thấy được.",
      "Soi từng phương án: nó định nghĩa ranh giới, hay chỉ thêm thứ đã có, hoặc lấy đa số trên một luật mơ hồ?"
    ],
    facts: [
      "Guide 4.1: “be conservative” (thận trọng) hay “only high-confidence” (chỉ khi rất chắc) không phải tiêu chí. Nó bắt Claude tự chấm mình chắc bao nhiêu, mà điểm tự chấm lệch xa độ đúng thật. Sửa bằng điều kiện cụ thể để đối chiếu: “only when …” (chỉ khi …).",
      "Guide 4.2: khi chỉ dẫn vẫn cho kết quả không nhất quán, few-shot là kỹ thuật hiệu quả nhất. Ví dụ nhắm đúng ca mơ hồ, kèm lý do, giúp model khái quát sang tài liệu mới.",
      "Nullable để chống bịa: tài liệu không có thông tin thì model có chỗ trả <code>null</code> trung thực. Nó không nói lúc nào thì nên trả <code>null</code>."
    ],
    opts: [
      { k: "A", gist: "Add contrasting examples, one date that should be extracted and one that should come back null, each with its reasoning.",
        why: [
          "Cặp ví dụ đặt ranh giới ngay trước mắt model: ca này trích, ca kia trả <code>null</code>, và vì sao (ý 2).",
          "Có lý do đi kèm, model áp được ranh giới đó sang những ngày mờ hay thiếu nhãn ở tài liệu mới."
        ] },
      { k: "B", gist: "Replace the confidence wording with a testable rule, such as extracting a date only when a label like “Invoice Date” sits next to it.",
        why: [
          "Đổi cảm giác thành điều kiện kiểm được (ý 1): có nhãn kiểu “Invoice Date” (ngày hóa đơn) cạnh ngày thì trích, không có thì <code>null</code>.",
          "Model không phải tự chấm mình chắc bao nhiêu. Cùng một kiểu ngày thì lần nào cũng ra cùng kết quả."
        ] },
      { k: "C", gist: "Make the date field nullable in the extraction tool's schema, so the model has a legitimate honest answer for missing dates.",
        why: [
          "Đề đã nói trường này nullable rồi, và model đang trả <code>null</code> ở một số tài liệu. Thay đổi này không đổi gì.",
          "Nullable cho model lối thoát, không định nghĩa lúc nào dùng lối thoát (ý 3). Chỗ thiếu là ranh giới.",
          "Dễ bị cuốn vì nullable là cách sửa đúng khi model bịa ngày cho đủ trường. Nhưng đề kể chuyện không nhất quán, không kể chuyện bịa."
        ] },
      { k: "D", gist: "Run every extraction three times at a low temperature and keep the majority value for each date field, so random run-to-run variation cancels out.",
        why: [
          "Lấy đa số chỉ khử dao động ngẫu nhiên giữa các lần chạy. Gốc lỗi ở đây là luật “confident” không có ranh giới (ý 1).",
          "Luật còn mơ hồ thì đa số chỉ là cách hiểu hay gặp nhất của model, chưa chắc là cách team muốn. Lại tốn gấp ba số lần gọi."
        ] }
    ],
    refs: [
      { label: "Bài 4.1, mục “Chuyện gì đang xảy ra”: “only high-confidence” không phải tiêu chí; viết điều kiện cụ thể “only when …”", href: NOTES + "#l-4-1" },
      { label: "Bài 4.2: chỉ dẫn vẫn lệch thì cho ví dụ nhắm ca mơ hồ, kèm lý do", href: NOTES + "#l-4-2" },
      { label: "Bài 4.3, mục “Thiết kế schema để model không bịa”: nullable cho thông tin có thể vắng", href: NOTES + "#l-4-3" }
    ]
  },
  {
    de: 9, n: 16, total: 60, sub: "1.2", subName: "Điều phối coordinator–subagent", scen: "S3",
    answer: "A",
    ask: "After each web search finishes, the coordinator reviews the findings and decides whether to rerun the search, add a document analysis step, or go straight to synthesis. A colleague suggests letting each subagent spawn the next one directly, to save coordinator round trips. Which design should the architect choose?",
    scene: [
      "Sau mỗi lượt web search, coordinator đọc kết quả rồi chọn một trong ba: tìm lại, thêm bước phân tích tài liệu, hay sang thẳng tổng hợp.",
      "Đồng nghiệp đề xuất: subagent này tự gọi subagent kế, khỏi vòng về coordinator cho đỡ tốn round trip (một lượt đi rồi về).",
      "Chỗ khó: bước kế tùy vào kết quả bước trước. Ai nhận kết quả thì người đó mới chọn được. Ví dụ minh họa:<pre><code>Hub-and-spoke:  coordinator → search → coordinator (đọc, chọn) → analysis → coordinator → synthesis\nNối chuỗi:      coordinator → search → analysis → synthesis → … → coordinator</code></pre>"
    ],
    asks: [
      "Kiến trúc sư nên chọn thiết kế nào?",
      "Tức là: giữ cho coordinator đọc được từng kết quả trước khi chọn bước kế.",
      "Soi từng phương án: sau mỗi lượt search, ai nhận kết quả, và bên đó có quyền chọn bước kế không?"
    ],
    facts: [
      "Hub-and-spoke (trục và nan hoa): coordinator là trục. Nó giao việc, subagent trả kết quả về nó. Một việc của coordinator là chọn subagent nào cần cho bước tiếp (dynamic selection, chọn động).",
      "Kết quả cuối của subagent trả về bên đã gọi nó. Tool call và kết quả trung gian ở lại trong subagent.",
      "Agent teams (Claude Code) là mô hình khác: các teammate nhắn trực tiếp cho nhau và tự nhận việc qua một task list chung. Docs ghi nó còn thử nghiệm, tắt mặc định, và không chạy trong phiên không tương tác (<code>-p</code>, kể cả Agent SDK).",
      "Hook <code>SubagentStop</code> là code của app, chạy khi một subagent kết thúc, dùng để theo dõi hay gom kết quả. Nó không trả lại quyền chọn bước kế cho coordinator."
    ],
    opts: [
      { k: "A", gist: "Keep spawning every subagent from the coordinator, which reads each result and picks the next step before delegating again.",
        why: [
          "Đúng hub-and-spoke (ý 1): mỗi kết quả search về coordinator, nó đọc rồi mới chọn tìm lại, phân tích hay tổng hợp.",
          "Tốn thêm vài round trip, nhưng chỉ cách này giữ quyết định chọn bước ở đúng chỗ nhận được kết quả (ý 2)."
        ] },
      { k: "B", gist: "Switch to the agent teams model, letting subagents message each other directly and coordinate through a shared task list.",
        why: [
          "Agent teams bỏ hẳn trục: teammate tự nhắn nhau, tự nhận việc (ý 3). Quyết định chọn bước không còn nằm ở một chỗ.",
          "Còn là tính năng thử nghiệm, tắt mặc định, và không chạy trong Agent SDK. Không nên đặt yêu cầu cốt lõi lên đó."
        ] },
      { k: "C", gist: "Adopt the colleague's chained design, but require each subagent to copy the coordinator's routing criteria into the prompt it writes for the next subagent.",
        why: [
          "Chuyển quyết định chọn bước xuống tay từng subagent. Mỗi subagent chỉ thấy phần việc của nó, không thấy cả bài toán.",
          "Coordinator không nhận kết quả trung gian (ý 2), nên không thể quyết tìm lại một lượt search yếu hay chèn bước phân tích.",
          "Dễ bị cuốn vì truyền tiêu chí qua lời giao việc là cách làm tốt. Nhưng tiêu chí không thay được bên đọc kết quả và chọn bước."
        ] },
      { k: "D", gist: "Accept the colleague's chained design and add a <code>SubagentStop</code> hook so the coordinator is notified whenever a subagent in the chain finishes.",
        why: [
          "Hook chỉ báo tin (ý 4). Lúc có tin thì subagent trước đã tự gọi subagent kế rồi.",
          "Thấy được mà không điều khiển được: không chặn, cũng không đổi hướng kịp."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, mục “Chuyện gì đang xảy ra”: hub-and-spoke, coordinator chọn subagent cho từng bước (dynamic selection)", href: NOTES + "#l-1-2" },
      { label: "Docs Agent teams: teammate nhắn trực tiếp cho nhau; thử nghiệm, tắt mặc định, không chạy với -p và Agent SDK", href: "https://code.claude.com/docs/en/agent-teams" },
      { label: "Docs Agent SDK hooks, bảng Available hooks: SubagentStop chạy khi subagent kết thúc", href: "https://code.claude.com/docs/en/agent-sdk/hooks" }
    ]
  },
  {
    de: 9, n: 17, total: 60, sub: "1.3", subName: "Gọi subagent, truyền context", scen: "S3",
    answer: "D",
    ask: "The search subagent's delegation prompt says only “Research the subtopic thoroughly and return key findings.” Its summaries leave out source URLs, and only that final summary reaches the coordinator, so the reports end up with uncited claims. What change fixes this most reliably?",
    scene: [
      "Lời giao việc cho search subagent chỉ có một câu: “Research the subtopic thoroughly and return key findings” (tìm hiểu kỹ mảng này, trả về các phát hiện chính).",
      "Bản tóm tắt nó trả về không có URL nguồn. Coordinator chỉ nhận được bản tóm tắt đó, nên báo cáo cuối có những khẳng định không trích nguồn.",
      "Chỗ khó: URL có trong tay subagent lúc nó đọc trang, nhưng không ai yêu cầu nó ghi lại. Ra khỏi subagent rồi thì không còn."
    ],
    asks: [
      "Đổi gì để sửa chắc nhất?",
      "Tức là: cho nguồn được ghi ngay lúc subagent còn đang cầm nó, và nằm trong bản báo cáo cuối gửi về.",
      "Soi từng phương án: nó sửa ở chỗ nguồn còn tồn tại, hay ở phía sau khi nguồn đã mất?"
    ],
    facts: [
      "Lời giao việc là thông tin duy nhất subagent nhận về việc cần làm. Nó nên nêu mục tiêu và tiêu chí chất lượng (cần gì, thế nào là đạt), không viết quy trình từng bước. Quy trình cứng làm subagent không xoay xở được khi gặp tình huống bất ngờ.",
      "Chỉ tin nhắn cuối của subagent trả về agent cha. Tool call và kết quả trung gian (trang đã đọc, URL) ở lại trong subagent. Đó là context cô lập: phần khám phá dài dòng không dồn vào context của agent cha.",
      "Giữ nguồn: mỗi khẳng định đi kèm metadata nguồn (URL, tài liệu, trang). Không ghi ngay từ đầu thì qua mỗi lần tóm tắt lại rơi bớt nguồn."
    ],
    opts: [
      { k: "A", gist: "Have the search subagent return the full text of every page it fetched, so the synthesis agent can locate the citations itself.",
        why: [
          "Phá mục đích của context cô lập (ý 2): toàn bộ trang web dồn vào context của agent tổng hợp.",
          "Việc gắn nguồn bị đẩy cho agent không hề làm việc tìm kiếm, phải dò lại từng khẳng định trong đống văn bản thô."
        ] },
      { k: "B", gist: "Add a review subagent that scans each finished report for uncited claims and sends it back to the synthesis agent for correction.",
        why: [
          "Phát hiện được chỗ thiếu nguồn, nhưng không sửa được. URL không nằm trong context của coordinator hay agent tổng hợp (ý 2).",
          "Muốn sửa phải lục lại transcript của search subagent hoặc tìm lại từ đầu. Sửa ở hạ nguồn thay vì chặn ở chỗ phát sinh.",
          "Dễ bị cuốn vì thêm vòng review nghe kỹ càng. Nhưng review không lấy lại được thông tin đã rơi mất."
        ] },
      { k: "C", gist: "Replace the delegation prompt with a numbered list of exact queries to run against a fixed set of approved sources.",
        why: [
          "Quy trình cứng làm subagent không xoay xở được theo từng mảng (ý 1).",
          "Và vẫn không yêu cầu gắn URL vào từng phát hiện. Cái thiếu là tiêu chí chất lượng, không phải các bước."
        ] },
      { k: "D", gist: "Add quality criteria to the delegation prompt: every finding must include its source URL and be verified against at least two sources.",
        why: [
          "Đúng chỗ (ý 1): lời giao việc nói rõ thế nào là một kết quả đạt, gồm cả nguồn.",
          "Subagent ghi URL ngay lúc còn đang mở trang, nên URL nằm trong tin nhắn cuối gửi về coordinator (ý 2, ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Chạy song song”: lời giao việc nêu mục tiêu và tiêu chí chất lượng, không viết quy trình từng bước", href: NOTES + "#l-1-3" },
      { label: "Bài 5.6: claim–source mapping phải đi theo claim qua mọi agent", href: NOTES + "#l-5-6" },
      { label: "Docs Agent SDK Subagents, mục Benefits: chỉ tin nhắn cuối của subagent trả về agent cha", href: "https://code.claude.com/docs/en/agent-sdk/subagents" }
    ]
  },
  {
    de: 9, n: 18, total: 60, sub: "1.5", subName: "Hook của Agent SDK: chặn tool call và chuẩn hóa dữ liệu", scen: "S3",
    answer: "D",
    ask: "A <code>PostToolUse</code> hook is meant to normalize date formats in the results of <code>parse_document</code>, a tool used by the document analysis subagent. The tool comes from an MCP server named <code>docs</code>. With the matcher set to <code>parse_document</code>, the hook never fires. The web search subagent produces hundreds of tool results per run, and those must not trigger the hook. What should the team change?",
    scene: [
      "Hook <code>PostToolUse</code> cần chuẩn hóa ngày trong kết quả của <code>parse_document</code>. Tool này đến từ MCP server tên <code>docs</code>.",
      "Matcher đang ghi <code>parse_document</code>. Hook không chạy lần nào.",
      "Ràng buộc thêm: web search subagent sinh hàng trăm kết quả tool mỗi lượt chạy, và chúng không được kích hoạt hook.",
      "Chỗ khó: logic hook chưa chắc đã sai. Hook chưa từng được gọi, nên lỗi nằm ở chỗ chọn tool."
    ],
    asks: [
      "Team phải đổi gì?",
      "Tức là: cho hook khớp đúng <code>parse_document</code> của server <code>docs</code>, và chỉ tool đó.",
      "Soi từng phương án: sau khi đổi, hook có chạy cho <code>parse_document</code> không? Có chạy cho hàng trăm kết quả search không?"
    ],
    facts: [
      "<code>matcher</code> so với tên tool đã đăng ký. Tool MCP mang tên <code>mcp__&lt;server&gt;__&lt;tool&gt;</code>, ví dụ <code>mcp__crm__lookup_order</code>. Dùng tên đầy đủ này trong matcher.",
      "Không ghi matcher thì hook chạy cho mọi lần sự kiện đó xảy ra. Docs khuyên dùng matcher nhắm đúng tool khi có thể.",
      "<code>PostToolUse</code> chạy sau khi tool trả kết quả, trước khi Claude đọc. <code>PreToolUse</code> chạy trước khi tool chạy, lúc đó chưa có kết quả nào.",
      "Trong <code>PostToolUse</code>: <code>updatedToolOutput</code> thay hẳn kết quả tool, <code>additionalContext</code> chỉ nối thêm ghi chú. Cả hai chỉ có tác dụng khi hook đã chạy."
    ],
    opts: [
      { k: "A", gist: "Return <code>additionalContext</code> instead of <code>updatedToolOutput</code>, so the normalized dates are appended to the result.",
        why: [
          "Đổi trường trả về chỉ có nghĩa khi hook chạy (ý 4). Hook đang không chạy lần nào.",
          "Mà có chạy thì cũng kém hơn: chỉ nối thêm bản ngày đã chuẩn hóa, ngày gốc lộn xộn vẫn nằm đó cho Claude đọc."
        ] },
      { k: "B", gist: "Move the logic into a <code>PreToolUse</code> hook with the same matcher, so the data is adjusted before the result comes back.",
        why: [
          "Sai thời điểm: <code>PreToolUse</code> chạy trước khi tool chạy, chưa có kết quả nào để chuẩn hóa (ý 3).",
          "Matcher vẫn là <code>parse_document</code> trần, nên hook vẫn không bao giờ chạy (ý 1)."
        ] },
      { k: "C", gist: "Remove the matcher so the hook fires on every tool result, then filter on <code>tool_name</code> inside the hook code.",
        why: [
          "Chạy được: không matcher thì hook chạy cho mọi kết quả tool (ý 2), lọc theo <code>tool_name</code> trong code vẫn tới đúng <code>parse_document</code>.",
          "Nhưng trái ràng buộc của đề: hàng trăm kết quả search mỗi lượt đều gọi hook.",
          "Dễ bị cuốn vì đây là cách gỡ rối hay dùng khi không chắc tên tool. Nhưng đề đã cấm đúng hậu quả của nó."
        ] },
      { k: "D", gist: "Set the matcher to <code>mcp__docs__parse_document</code>, since MCP tools are registered under a server-prefixed name.",
        why: [
          "Đúng tên đã đăng ký (ý 1): <code>mcp__</code> + tên server <code>docs</code> + <code>__parse_document</code>.",
          "Hook chạy cho đúng tool này, kết quả search không đụng tới. Việc lọc nằm ở cấu hình, không tốn lần gọi hook nào cho search (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 1.5, mục “Biết thêm”: matcher chỉ xét tên tool; tool MCP dùng tên đầy đủ mcp__server__tool; updatedToolOutput vs additionalContext", href: NOTES + "#l-1-5" },
      { label: "Docs Agent SDK hooks, mục Matchers: không ghi matcher thì hook chạy cho mọi lần sự kiện; tên tool MCP là mcp__server__action", href: "https://code.claude.com/docs/en/agent-sdk/hooks" }
    ]
  },
  {
    de: 9, n: 19, total: 60, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool", scen: "S3",
    answer: "AC",
    ask: "An MCP web-search tool returns “Search failed” both for upstream timeouts and for queries with no matches. The coordinator owns every retry decision because it has to weigh partial results across subagents. It now retries queries that had no matches and gives up on timeouts that a retry would have fixed. Which two response changes fix this? (Choose two.)",
    scene: [
      "Tool web search (MCP) trả cùng một câu “Search failed” (tìm kiếm thất bại) cho hai chuyện khác hẳn nhau: dịch vụ phía trên bị timeout, và query chạy xong mà không có gì khớp.",
      "Coordinator giữ mọi quyết định retry, vì nó phải cân kết quả một phần của nhiều subagent.",
      "Kết quả: ngược cả hai chiều. Query không khớp thì bị thử lại vô ích, timeout đáng thử lại thì bị bỏ.",
      "Chỗ khó: đề đặt luật riêng là coordinator quyết retry. Nên cách sửa phải nằm ở phản hồi của tool, không phải dời chỗ retry."
    ],
    asks: [
      "Hai thay đổi nào ở phản hồi của tool sửa được chuyện này?",
      "Tức là: tách hai ca ra, để coordinator đọc là biết ca nào thử lại, ca nào không.",
      "Soi từng phương án: nó lo ca nào, và có giữ cho coordinator thấy được lỗi không?"
    ],
    facts: [
      "Access failure (không truy cập được, vd timeout) khác empty result hợp lệ (truy cập được, query chạy đúng, không có gì khớp). Mảng rỗng không phải lỗi, và timeout không được trả về như mảng rỗng.",
      "Lỗi có cấu trúc: <code>isError: true</code> kèm <code>errorCategory</code> (loại lỗi) và <code>isRetryable</code> (gửi lại y nguyên có khả năng thành công không). Timeout là transient (tạm thời), retry được.",
      "MCP có hai kênh lỗi. Lỗi thực thi trả trong result với <code>isError</code>, spec ghi client nên đưa nó cho model. Lỗi giao thức JSON-RPC dành cho tool không tồn tại, request hỏng, server sập; client chỉ “có thể” đưa cho model, không bắt buộc."
    ],
    opts: [
      { k: "A", gist: "Return timeouts with <code>isError</code> set to true plus metadata such as an <code>errorCategory</code> of transient and <code>isRetryable</code> set to true.",
        why: [
          "Lo ca timeout (ý 2): coordinator đọc thấy lỗi tạm thời, thử lại được, nên thử lại thay vì bỏ.",
          "Lỗi vẫn đi qua kênh model chắc chắn đọc được, coordinator giữ nguyên quyền quyết (ý 3)."
        ] },
      { k: "B", gist: "Report timeouts as protocol-level errors instead of tool results, so the host application handles the outage directly.",
        why: [
          "Sai kênh (ý 3): lỗi giao thức dành cho request hỏng, tool không tồn tại. Đẩy timeout sang đó thì không có gì bảo đảm coordinator thấy, trong khi nó là bên giữ quyết định retry.",
          "Ca không khớp vẫn trả “Search failed”, nửa còn lại của lỗi giữ nguyên."
        ] },
      { k: "C", gist: "Return queries with no matches as successful results containing an empty list, with no error flag set.",
        why: [
          "Lo ca không khớp (ý 1): query đã chạy đúng, không có gì khớp là câu trả lời hợp lệ, không phải lỗi.",
          "Hết cờ lỗi giả thì coordinator thôi thử lại những lượt tìm đã có câu trả lời."
        ] },
      { k: "D", gist: "Add retry with backoff inside the subagent, so transient timeouts are resolved locally and never reach the coordinator.",
        why: [
          "Trái luật của đề: coordinator giữ mọi quyết định retry. Xử lý rồi giấu timeout trong subagent là lấy mất thứ coordinator cần để cân kết quả một phần.",
          "Ca không khớp vẫn trả “Search failed”, nên coordinator vẫn thử lại vô ích.",
          "Dễ bị cuốn vì notes dặn subagent tự xử lỗi transient tại chỗ. Đó là cách mặc định. Đề này đặt luật khác, và câu hỏi hỏi về phản hồi của tool."
        ] }
    ],
    dispute: "Đề gốc chấm AC, khớp. Lời giải gốc nói lỗi giao thức là thứ model “never sees” (không bao giờ thấy). Nói quá: spec MCP ghi client MAY (có thể) đưa lỗi giao thức cho model, còn lỗi thực thi là SHOULD (nên) đưa (notes, mục “Đã sửa 02/11” của bài 2.2). B vẫn sai, vì không có gì bảo đảm coordinator thấy lỗi, và ca không khớp chưa được sửa.",
    refs: [
      { label: "Bài 2.2, mục “Lỗi trong hệ nhiều agent”: access failure khác empty result hợp lệ; bảng errorCategory, isRetryable", href: NOTES + "#l-2-2" },
      { label: "Bài 2.2, mục “Đã sửa 02/11”: MCP có hai kênh lỗi, chỉ lỗi thực thi chắc chắn tới model", href: NOTES + "#fix-13" },
      { label: "Bài 5.3, mục “Empty không phải là lỗi”: hai ca cần hai quyết định khác nhau", href: NOTES + "#l-5-3" }
    ]
  },
  {
    de: 9, n: 20, total: 60, sub: "1.3", subName: "Gọi subagent, truyền context", scen: "S3",
    answer: "B",
    ask: "For one research task, the user asks the coordinator to exclude two sources. The coordinator spawns the synthesis subagent with only the aggregated findings in its prompt, and the report still cites both excluded sources. What change fixes this?",
    scene: [
      "Ở một đề tài, người dùng dặn coordinator: bỏ hai nguồn này ra.",
      "Coordinator tạo synthesis subagent, lời giao việc chỉ có các phát hiện đã gom. Báo cáo vẫn trích cả hai nguồn bị loại.",
      "Chỗ khó: lời dặn có thật, nhưng nằm trong hội thoại giữa người dùng và coordinator. Subagent không đọc được hội thoại đó."
    ],
    asks: [
      "Đổi gì để sửa?",
      "Tức là: đưa ràng buộc của riêng đề tài này tới subagent, ở đúng chỗ nó nhận thông tin.",
      "Soi từng phương án: sau khi đổi, ràng buộc có nằm trong context của subagent lúc bắt đầu không? Có lan sang các đề tài khác không?"
    ],
    facts: [
      "Subagent thường (không phải fork) bắt đầu với context mới: system prompt riêng (<code>AgentDefinition.prompt</code>) và lời giao việc. Nó không có lịch sử hội thoại, kết quả tool hay system prompt của coordinator.",
      "Docs Agent SDK: thứ duy nhất đi từ agent cha sang subagent là chuỗi prompt của Agent tool, nên đường dẫn, lỗi hay quyết định nào subagent cần thì ghi thẳng vào đó.",
      "Quyết định của người dùng không tự đến được subagent. Ví dụ trong notes: người dùng nói “chỉ xét thị trường EU” ở lượt 3 thì subagent tạo ở lượt 10 không biết, trừ khi coordinator viết vào lời giao việc.",
      "System prompt trong <code>AgentDefinition</code> áp cho mọi lần gọi subagent đó. Chạy foreground (coordinator chờ) hay background (chạy nền) đổi chuyện coordinator có phải chờ không. Kiểu nào subagent cũng bắt đầu với context mới."
    ],
    opts: [
      { k: "A", gist: "Instruct the synthesis subagent to ask the coordinator for any task constraints before it starts writing.",
        why: [
          "Đi đường vòng: chỗ docs chỉ ra để truyền quyết định cho subagent là prompt lúc giao việc (ý 2). Ràng buộc đã nằm sẵn trong tay coordinator.",
          "Thêm một vòng hỏi đáp mỗi lần gọi, và vẫn phụ thuộc subagent có hỏi, coordinator có trả lời đủ không.",
          "Dễ bị cuốn vì nghe như subagent chủ động, cẩn thận. Nhưng ghi thẳng ràng buộc vào lời giao việc thì không cần hỏi gì."
        ] },
      { k: "B", gist: "Pass the exclusion instruction in the synthesis subagent's delegation prompt, together with the aggregated findings.",
        why: [
          "Ràng buộc vào đúng chỗ duy nhất subagent nhận thông tin (ý 2, ý 3).",
          "Subagent bắt đầu với lời giao việc có cả phát hiện lẫn lời dặn bỏ hai nguồn, nên báo cáo không trích chúng nữa. Đề tài khác không dính ràng buộc này."
        ] },
      { k: "C", gist: "Put the exclusion instruction in the synthesis subagent's system prompt through its <code>AgentDefinition</code>, so it applies on every run.",
        why: [
          "Subagent sẽ thấy lời dặn, nhưng sai phạm vi: ràng buộc chỉ cho một đề tài, còn system prompt áp cho mọi lần gọi (ý 4).",
          "Đề tài sau, hai nguồn đó bị loại oan. Mỗi quyết định của người dùng lại phải sửa định nghĩa agent.",
          "Dễ bị cuốn vì đây là cơ chế thật và chắc chắn tới được subagent. Nhưng system prompt dành cho vai trò ổn định (cách tổng hợp, kiểu trích dẫn), không phải lời dặn của một lần chạy."
        ] },
      { k: "D", gist: "Invoke the synthesis subagent in the foreground so it shares the coordinator's active conversation context.",
        why: [
          "Sai ở giả định: foreground chỉ khiến coordinator chờ báo cáo, không cho subagent đọc hội thoại của coordinator (ý 4).",
          "Chạy kiểu nào subagent cũng bắt đầu với context mới (ý 1), lời dặn vẫn không tới."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Biết thêm”: quyết định của người dùng không tự đến được subagent, phải viết vào lời giao việc", href: NOTES + "#l-1-3" },
      { label: "Docs Agent SDK Subagents, mục What subagents inherit: chỉ chuỗi prompt của Agent tool đi từ cha sang con", href: "https://code.claude.com/docs/en/agent-sdk/subagents" },
      { label: "Docs Claude Code Subagents: foreground chặn phiên chính tới khi xong, background chạy song song; kiểu nào cũng bắt đầu với context mới", href: "https://code.claude.com/docs/en/sub-agents" }
    ]
  },
  {
    de: 9, n: 21, total: 60, sub: "1.3", subName: "Gọi subagent, truyền context", scen: "S3",
    answer: "D",
    ask: "A monitoring job counts delegations by scanning archived session transcripts for <code>tool_use</code> blocks named <code>Task</code>. Since an Agent SDK upgrade the count has been zero, yet the system still produces complete reports built from subagent findings. The job can only read archived transcripts and cannot change the running agents. How do you get an accurate delegation count back?",
    scene: [
      "Job giám sát đếm số lần coordinator giao việc cho subagent bằng cách quét transcript (bản ghi phiên) đã lưu, tìm block <code>tool_use</code> tên <code>Task</code>.",
      "Sau khi nâng cấp Agent SDK, số đếm về 0. Nhưng báo cáo vẫn ra đủ, vẫn dựng từ kết quả của subagent. Vậy việc giao vẫn chạy, chỉ có cách đếm là hỏng.",
      "Ví dụ minh họa hai block cùng là một lần giao việc:<pre><code>bản cũ: { \"type\": \"tool_use\", \"name\": \"Task\", ... }\nbản mới: { \"type\": \"tool_use\", \"name\": \"Agent\", ... }</code></pre>",
      "Chỗ khó: job chỉ được đọc transcript đã lưu, không được sửa agent đang chạy. Cách sửa phải nằm trong chính job quét, và phải đếm được cả transcript cũ lẫn mới."
    ],
    asks: [
      "Làm sao để số lần giao việc đếm đúng trở lại?",
      "Tức là: tìm chỗ thay đổi khiến job quét hụt, rồi sửa ở phía job, vì job không đụng được vào agent.",
      "Soi từng phương án: nó có đếm lần gọi thật không? Nó có nằm trong quyền của job (chỉ đọc transcript) không?"
    ],
    facts: [
      "Coordinator giao việc bằng một tool. Guide và SDK bản cũ gọi là <code>Task</code>. Từ Claude Code v2.1.63, block <code>tool_use</code> ghi tên <code>Agent</code>.",
      "Danh sách tool trong message <code>system:init</code> vẫn ghi <code>Task</code>. Message này ra một lần đầu phiên, chỉ liệt kê tool có sẵn, không ghi lần gọi nào. Docs dặn: muốn phát hiện subagent qua nhiều bản SDK thì khớp cả hai tên trong <code>block.name</code>.",
      "<code>allowedTools</code> lo chuyện tool nào được gọi mà không phải hỏi quyền. Nó không quyết định tên ghi vào block <code>tool_use</code>.",
      "Hook <code>SubagentStart</code> chạy mỗi lần một subagent khởi động, nên đếm được số lần giao việc. Nhưng hook là callback đăng ký trong agent đang chạy, và chỉ thấy các phiên chạy sau khi đăng ký."
    ],
    opts: [
      { k: "A", gist: "Put <code>Task</code> back into the coordinator's <code>allowedTools</code> so delegation calls are auto-approved and logged again.",
        why: [
          "Sai ở giả định: coi việc giao đang bị chặn. Báo cáo vẫn ra đủ từ kết quả subagent, nên tool giao việc vẫn được gọi bình thường.",
          "<code>allowedTools</code> không đổi tên ghi vào block <code>tool_use</code> (ý 3). Sửa xong, transcript mới vẫn ghi <code>Agent</code>, job vẫn đếm ra 0.",
          "Còn vướng ràng buộc của đề: đây là sửa cấu hình agent đang chạy, việc job không được làm."
        ] },
      { k: "B", gist: "Count how many times <code>Task</code> shows up in the tools list of each session's <code>system:init</code> message, because that list still uses the old name.",
        why: [
          "Đúng là danh sách đó vẫn ghi <code>Task</code>. Nhưng nó chỉ khai tool có sẵn, mỗi phiên một lần (ý 2).",
          "Đếm ở đó ra số phiên có tool giao việc, không phải số lần coordinator thật sự giao. Phiên giao năm lần và phiên không giao lần nào đều tính là một.",
          "Dễ bị cuốn vì nó bám đúng chỗ còn tên cũ, sửa job ít nhất. Nhưng nó đếm sai thứ: đếm khả năng, không đếm hành động."
        ] },
      { k: "C", gist: "Register a <code>SubagentStart</code> hook on the coordinator that bumps a delegation counter every time a subagent starts.",
        why: [
          "Ở hệ được phép sửa, đây là cách đếm tốt: hook chạy mỗi lần subagent khởi động (ý 4).",
          "Nhưng đề cấm: job chỉ đọc transcript, không sửa agent đang chạy. Đăng ký hook là sửa agent.",
          "Hook cũng chỉ đếm các phiên từ lúc đăng ký trở đi. Transcript đã lưu vẫn không có số."
        ] },
      { k: "D", gist: "Change the scan to match <code>tool_use</code> blocks named <code>Agent</code> as well as <code>Task</code>, so transcripts from both SDK versions are counted.",
        why: [
          "Đúng gốc: sau nâng cấp, block <code>tool_use</code> đổi tên thành <code>Agent</code> (ý 1). Job chỉ tìm <code>Task</code> nên hụt hết.",
          "Khớp cả hai tên là đúng cách docs dặn (ý 2): transcript mới đếm theo <code>Agent</code>, transcript cũ vẫn đếm theo <code>Task</code>.",
          "Sửa nằm trọn trong job quét, đúng quyền đề cho: chỉ đọc transcript."
        ] }
    ],
    refs: [
      { label: "Bài 6.3, bảng guide nói A, docs nói B, dòng “Tool spawn subagent”: Task đổi tên thành Agent từ Claude Code 2.1.63", href: NOTES + "#l-6-3" },
      { label: "Bài 1.3, mục Khái niệm: coordinator giao việc qua Task tool, docs mới gọi là Agent", href: NOTES + "#l-1-3" },
      { label: "Docs “Subagents in the SDK”, mục Detect subagent invocation: tool_use ghi Agent, system:init ghi Task, khớp cả hai tên", href: "https://code.claude.com/docs/en/agent-sdk/subagents" }
    ]
  },
  {
    de: 9, n: 22, total: 60, sub: "2.3", subName: "Chia tool cho agent và tool_choice", scen: "S3",
    answer: "BD",
    ask: "A document analysis subagent holds 15 tools. Three of them are near-identical text extractors for PDF, DOCX and HTML. It also has a generic <code>fetch_url</code> tool, which it needs for frequent document downloads but also misuses for ad hoc web searches. Wrong-tool picks are common. Which two redesigns cut them the most? (Choose two.)",
    scene: [
      "Document analysis subagent cầm 15 tool, và chọn nhầm tool thường xuyên.",
      "Có hai chỗ gây nhầm. Một: ba tool trích text gần như y hệt, chỉ khác loại file (PDF, DOCX, HTML). Hai: tool chung chung <code>fetch_url</code>, subagent cần nó để tải tài liệu rất thường xuyên, nhưng lại hay đem đi tìm kiếm web vặt.",
      "Chỗ khó: không bỏ được việc tải tài liệu, vì đó là việc chính của subagent này. Đề bắt chọn hai cách, mỗi cách lo một chỗ."
    ],
    asks: [
      "Hai cách thiết kế lại nào giảm chọn nhầm tool nhiều nhất?",
      "Tức là: sửa ngay trên bộ tool, sao cho model ít phải chọn giữa những thứ giống nhau, và không dùng được tool vào việc sai.",
      "Soi từng phương án: nó có bớt lựa chọn thừa hay chặn việc dùng sai không? Nó có làm mất khả năng subagent cần không?"
    ],
    facts: [
      "Mỗi tool thêm vào là thêm một lựa chọn model phải cân ở mọi lượt. Guide nói 18 tool thay vì 4–5 làm độ tin cậy chọn tool giảm. Tool chồng nhau càng dễ nhầm.",
      "Docs Define tools dặn gộp các thao tác liên quan vào ít tool hơn: “fewer, more capable tools reduce selection ambiguity” (ít tool hơn mà mỗi tool làm được nhiều hơn thì bớt mơ hồ khi chọn).",
      "Tool hẹp (constrained tool): làm đúng một việc và kiểm input chặt. Ví dụ của guide: <code>fetch_url</code> (tải bất cứ gì) → <code>load_document</code> (chỉ nhận URL tài liệu hợp lệ). Ít tự do hơn, ít sai hơn.",
      "Lời dặn trong prompt là xác suất: model làm theo phần lớn thời gian, không phải lần nào cũng vậy. Nó cũng không bớt được tool nào khỏi danh sách."
    ],
    opts: [
      { k: "A", gist: "Add a system prompt section that lists, for each task type, which of the 15 tools the subagent must not use.",
        why: [
          "Sai chỗ: bộ 15 tool vẫn nguyên, ba tool trích text vẫn chồng nhau (ý 1). Lúc chọn, model vẫn phải cân đủ 15 lựa chọn.",
          "Danh sách cấm chỉ là lời dặn, vẫn có lúc lọt (ý 4). Nó còn dài, chiếm thêm context ở mọi lượt."
        ] },
      { k: "B", gist: "Replace <code>fetch_url</code> with a <code>load_document</code> tool that only accepts URLs pointing to document files.",
        why: [
          "Đúng kiểu tool hẹp của guide (ý 3). Việc tải tài liệu vẫn còn, ngay trong subagent.",
          "Đưa một truy vấn tìm kiếm web vào thì tool không nhận, vì đó không phải URL tài liệu. Việc dùng sai bị chặn ngay ở tool, không trông vào lời dặn.",
          "Một tool chung chung, mơ hồ ra khỏi danh sách, nên bớt một chỗ chọn nhầm."
        ] },
      { k: "C", gist: "Take <code>fetch_url</code> away from this subagent and send every document download through the coordinator to the web search subagent.",
        why: [
          "Chặn được việc dùng sai, vì không còn tool để dùng sai. Hướng này đúng tinh thần cấp ít quyền nhất.",
          "Nhưng đề nói subagent cần tải tài liệu rất thường xuyên. Lần tải nào cũng phải vòng qua coordinator sang subagent khác rồi quay về: thêm lượt đi lượt về, thêm context phải chuyển.",
          "Dễ bị cuốn vì nghe giống bài học “agent không được cầm tool ngoài vai”. Nhưng guide có ca y hệt: synthesis agent cần fact-check rất thường xuyên, vòng qua coordinator làm trễ 40%, nên được cấp tool hẹp <code>verify_fact</code> chứ không bị tước hẳn. Việc cần thường xuyên thì giữ lại bản hẹp (ý 3)."
        ] },
      { k: "D", gist: "Merge the three extraction tools into one <code>extract_document_text</code> tool that detects the file format of its input.",
        why: [
          "Ba tool làm cùng một việc, chỉ khác loại file. Tool tự nhận ra loại file được, nên bắt model chọn giữa ba cái là một lựa chọn vô nghĩa.",
          "Gộp lại đúng hướng docs (ý 2): bớt hai lựa chọn thừa (ý 1), không giấu quyết định thật nào.",
          "Khác với ca phải tách: hai việc có đầu ra khác nhau (tìm issue và lập kế hoạch sửa) thì nên tách. Ở đây đầu ra như nhau, chỉ đầu vào khác."
        ] }
    ],
    refs: [
      { label: "Bài 2.3, mục “Chuyện gì đang xảy ra”: nhiều tool làm giảm độ tin cậy chọn tool; verify_fact cho việc vặt thường xuyên; thay fetch_url bằng load_document", href: NOTES + "#l-2-3" },
      { label: "Cheatsheet D2: dòng “Tool generic fetch_url bị dùng bừa”", href: NOTES + "#cheat-d2" },
      { label: "Docs “Define tools”, mục Best practices for tool definitions: gộp thao tác liên quan vào ít tool hơn", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools" }
    ]
  },
  {
    de: 9, n: 23, total: 60, sub: "1.1", subName: "Vòng lặp agent", scen: "S3",
    answer: "C",
    ask: "The coordinator's harness decides a run is finished when it spots the phrase RESEARCH COMPLETE in streamed assistant text, but that phrase sometimes shows up early inside a subagent's summary. Runs that stop because they hit the configured <code>max_budget_usd</code> cap must be retried, not shipped. What should the harness use to detect completion instead?",
    scene: [
      "Harness (code bọc ngoài, điều khiển coordinator) coi một lượt chạy là xong khi thấy cụm “RESEARCH COMPLETE” trong text Claude stream ra.",
      "Cụm đó có lúc xuất hiện sớm, nằm trong bản tóm tắt của một subagent. Harness dừng khi việc chưa xong.",
      "Ràng buộc thêm: lượt chạy dừng vì chạm trần <code>max_budget_usd</code> (trần chi tiêu) thì phải chạy lại, không được giao báo cáo. Chỗ khó: tín hiệu cần tìm phải tách được “xong thật” với “dừng vì chạm trần”."
    ],
    asks: [
      "Harness nên dựa vào gì để biết lượt chạy đã xong?",
      "Tức là: tìm tín hiệu kết thúc do SDK phát ra, không phải chữ Claude viết, và tín hiệu đó phải phân biệt được thành công với chạm trần.",
      "Soi từng phương án: nó còn đọc chữ không? Nó có phân biệt được chạy xong với chạm trần không?"
    ],
    facts: [
      "Không quyết định dừng bằng cách đọc chữ trong text. Text là lời Claude kể cho người đọc, không phải tín hiệu điều khiển. Claude có thể nhắc cụm đó sớm, viết khác đi, hoặc không viết.",
      "Agent SDK chạy vòng lặp tới khi Claude trả lời mà không gọi tool nào. Lúc đó SDK phát một <code>AssistantMessage</code> cuối, rồi một <code>ResultMessage</code>. Docs: <code>ResultMessage</code> đánh dấu vòng lặp kết thúc, chứa text cuối, token, chi phí, session ID.",
      "Trường <code>subtype</code> của <code>ResultMessage</code> cho biết kết thúc thế nào: <code>success</code> là xong bình thường, <code>error_max_turns</code> là chạm trần số lượt, <code>error_max_budget_usd</code> là chạm trần chi tiêu. Docs gọi <code>subtype</code> là cách chính để kiểm trạng thái kết thúc.",
      "Trần số lượt (<code>max_turns</code>) và trần chi tiêu chỉ là dây an toàn. Chạm trần là bất thường cần xử lý, không phải “xong”."
    ],
    opts: [
      { k: "A", gist: "Set <code>max_turns</code> close to a typical run's length and treat the result the SDK returns when that cap is hit as the signal that the report is finished.",
        why: [
          "Sai ở giả định: coi chạm trần là xong. Chạm <code>max_turns</code> thì SDK trả <code>ResultMessage</code> với subtype <code>error_max_turns</code>, một trạng thái lỗi (ý 3, ý 4).",
          "Lượt nào cần nhiều bước hơn mức “typical” (thường gặp) bị cắt giữa chừng, rồi bị coi là xong và giao đi. Đúng thứ đề cấm."
        ] },
      { k: "B", gist: "Stop reading at the first <code>AssistantMessage</code> whose content has no tool calls, since the agent loop ends once Claude stops asking for tools.",
        why: [
          "Nghe có lý vì vòng lặp đúng là kết thúc khi Claude không gọi tool nữa (ý 2). Cách này cũng không đọc chữ.",
          "Nhưng nó không mang thông tin “thành công hay chạm trần”. Thông tin đó chỉ nằm ở <code>subtype</code> của <code>ResultMessage</code> (ý 3). Lượt chạm trần chi tiêu vẫn có thể bị giao đi.",
          "Còn dễ dừng sớm: docs ghi mỗi <code>AssistantMessage</code> chỉ mang một content block. Một câu text Claude viết trước khi gọi tool cũng là một <code>AssistantMessage</code> không có tool call.",
          "Dễ bị cuốn vì bám đúng cơ chế bên trong vòng lặp. Nhưng đề có thêm yêu cầu chạy lại khi chạm trần, và tín hiệu này không trả lời được."
        ] },
      { k: "C", gist: "Read the message stream until the SDK emits a <code>ResultMessage</code>, then check its <code>subtype</code> to confirm the run succeeded rather than hitting a limit.",
        why: [
          "<code>ResultMessage</code> là tín hiệu kết thúc SDK làm sẵn (ý 2). Nó chỉ đến khi vòng lặp đã dừng, nên tóm tắt của subagent giữa chừng không làm harness dừng sớm.",
          "Kiểm <code>subtype</code>: <code>success</code> thì giao báo cáo; <code>error_max_budget_usd</code> hay <code>error_max_turns</code> thì chạy lại (ý 3). Đúng yêu cầu của đề.",
          "Không còn đọc chữ, nên Claude viết gì trong text cũng không làm harness dừng sai (ý 1)."
        ] },
      { k: "D", gist: "Swap the sentinel for a rarer closing phrase and require it to appear on the last line of the report subagent's output.",
        why: [
          "Vẫn là đọc chữ để quyết định dừng (ý 1). Cụm hiếm hơn chỉ giảm khả năng trùng. Claude vẫn có thể bỏ sót, viết khác, hay nhắc lại nó.",
          "Cũng không lo được vế chạm trần: chữ trong báo cáo không cho biết lượt chạy có chạm trần chi tiêu hay không."
        ] }
    ],
    refs: [
      { label: "Bài 1.1, mục “Ba cách dừng sai mà guide gọi tên”: đọc chữ trong text, lấy trần số vòng làm điều kiện dừng chính", href: NOTES + "#l-1-1" },
      { label: "Docs “How the agent loop works”, mục Handle the result: ResultMessage và các subtype success, error_max_turns, error_max_budget_usd", href: "https://code.claude.com/docs/en/agent-sdk/agent-loop" }
    ]
  },
  {
    de: 9, n: 24, total: 60, sub: "2.1", subName: "Thiết kế tool: description rõ, ranh giới rõ", scen: "S3",
    answer: "D",
    ask: "The report generation subagent has two tools, <code>get_source_summary</code> and <code>get_source_quote</code>, and both are described only as “Returns information from a source”. It needs both tools, but it often calls the summary tool when a citation calls for a verbatim quote. Which change fixes this misrouting most directly?",
    scene: [
      "Report generation subagent có hai tool: <code>get_source_summary</code> (lấy tóm tắt của nguồn) và <code>get_source_quote</code> (lấy trích dẫn nguyên văn).",
      "Description của cả hai chỉ có một câu y hệt: “Returns information from a source” (trả thông tin từ một nguồn).",
      "Subagent cần cả hai, nhưng hay gọi tool tóm tắt khi trích dẫn cần câu nguyên văn. Chỗ khó: đề nói rõ cả hai đều cần, nên không được khóa cứng vào một tool."
    ],
    asks: [
      "Thay đổi nào sửa thẳng nhất việc gọi nhầm này?",
      "Tức là: tìm chỗ model dựa vào để chọn tool, và sửa đúng chỗ đó.",
      "Soi từng phương án: nó sửa việc chọn tool nào, hay sửa chuyện khác (điền tham số, ép một tool, dặn từ xa)?"
    ],
    facts: [
      "Description là cơ chế chính để Claude chọn tool. Hai description giống nhau thì Claude không có gì để phân biệt, nên đoán.",
      "Docs Define tools: description thật chi tiết là yếu tố quan trọng nhất. Nó phải nói tool làm gì, khi nào dùng và khi nào không, trả về gì; nên dài ít nhất 3–4 câu.",
      "<code>tool_choice</code> kiểu <code>tool</code> ép Claude luôn gọi đúng một tool đã chỉ định.",
      "<code>input_examples</code> là các input mẫu, giúp Claude điền tham số đúng cho tool có input phức tạp. Nó không giúp chọn tool nào."
    ],
    opts: [
      { k: "A", gist: "Set <code>tool_choice</code> to force <code>get_source_quote</code> on the subagent's requests so verbatim retrieval is guaranteed.",
        why: [
          "Ép được, nhưng ép là mất quyền chọn (ý 3). Lượt nào cũng phải gọi tool trích dẫn.",
          "Đề nói subagent cần cả hai tool. Phần tổng quan của báo cáo cần tóm tắt thì không gọi được tool tóm tắt nữa."
        ] },
      { k: "B", gist: "Add <code>input_examples</code> to <code>get_source_quote</code> showing well-formed requests for verbatim passages.",
        why: [
          "Sai chỗ bệnh: <code>input_examples</code> giúp điền tham số sau khi đã chọn tool (ý 4). Bệnh ở đây là chọn tool nào.",
          "Hai description vẫn y hệt nhau, Claude vẫn không biết lúc nào dùng tool nào (ý 1).",
          "Dễ bị cuốn vì ví dụ mẫu nghe như cách dạy model. Nhưng ví dụ này dạy cách gọi, không dạy khi nào gọi."
        ] },
      { k: "C", gist: "Have the coordinator name the right tool in every delegation prompt so the subagent follows that instruction.",
        why: [
          "Dời tín hiệu ra xa chỗ chọn. Subagent chọn tool lúc đang viết từng phần báo cáo, dựa vào description (ý 1). Coordinator không biết trước phần nào cần trích dẫn, phần nào cần tóm tắt.",
          "Lời dặn trong prompt cũng chỉ là xác suất, còn hai description mơ hồ vẫn nằm nguyên đó."
        ] },
      { k: "D", gist: "Rewrite both descriptions so each one says what the tool returns and when to use it instead of the other.",
        why: [
          "Sửa đúng chỗ Claude dựa vào để chọn tool (ý 1). Ví dụ minh họa: <code>get_source_quote</code> trả đoạn nguyên văn, dùng khi cần trích dẫn; <code>get_source_summary</code> trả bản tóm gọn, dùng cho phần tổng quan.",
          "Đúng thứ docs dặn: nói tool trả gì, khi nào dùng và khi nào không (ý 2). Có ranh giới giữa hai tool thì Claude hết phải đoán."
        ] }
    ],
    refs: [
      { label: "Bài 2.1, mục “Chuyện gì đang xảy ra”: description là cơ chế chính để chọn tool; description tốt nói rõ khi nào dùng tool này thay vì tool kia", href: NOTES + "#l-2-1" },
      { label: "Cheatsheet D2: dòng “Minimal descriptions”, hai tool giống nhau bị gọi nhầm", href: NOTES + "#cheat-d2" },
      { label: "Docs “Define tools”, mục Best practices for tool definitions: description chi tiết là yếu tố quan trọng nhất; input_examples cho input phức tạp", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools" }
    ]
  },
  {
    de: 9, n: 25, total: 60, sub: "1.5", subName: "Hook của Agent SDK: chặn tool call và chuẩn hóa dữ liệu", scen: "S3",
    answer: "D",
    ask: "Two <code>PreToolUse</code> hooks match the web search subagent's fetch tool. A general hook returns <code>allow</code> so unattended overnight runs never stall. A compliance hook, shipped in a plugin the team cannot modify, returns <code>deny</code> for fetches of restricted sources. The team fears the <code>allow</code> might override the <code>deny</code> when both fire. What should they do?",
    scene: [
      "Hai hook <code>PreToolUse</code> cùng khớp tool fetch của web search subagent.",
      "Hook chung trả <code>allow</code>, để các lượt chạy đêm không người trông không bị kẹt chờ duyệt. Hook tuân thủ trả <code>deny</code> khi fetch nguồn bị hạn chế. Hook này nằm trong một plugin team không sửa được.",
      "Team lo khi cả hai cùng chạy, <code>allow</code> sẽ đè <code>deny</code>. Chỗ khó: đề hỏi “nên làm gì”, và đáp án có thể là không cần làm gì."
    ],
    asks: [
      "Team nên làm gì?",
      "Tức là: khi hai hook trả quyết định ngược nhau, SDK chọn cái nào, và có cần sửa cấu hình không.",
      "Soi từng phương án: nó dựa vào luật thật của SDK hay một luật tưởng tượng? Nó có làm được trong ràng buộc của đề (plugin không sửa được, chạy không người) không?"
    ],
    facts: [
      "Khi một sự kiện xảy ra, mọi hook khớp đều chạy, và chạy song song. Thứ tự xong không cố định, nên không có luật “hook đầu tiên thắng”.",
      "Nhiều hook <code>PreToolUse</code> trả quyết định khác nhau thì cái chặt nhất thắng: <code>deny</code> &gt; <code>defer</code> &gt; <code>ask</code> &gt; <code>allow</code>. Chỉ cần một hook trả <code>deny</code> là lệnh gọi tool bị chặn.",
      "<code>ask</code> dừng lại hỏi người dùng. Lượt chạy đêm không có ai trả lời."
    ],
    opts: [
      { k: "A", gist: "Register the compliance hook before the allow hook so the first matching hook's decision is the one that applies.",
        why: [
          "Sai ở giả định: không có luật hook đầu tiên thắng. Hook khớp chạy song song, quyết định được gộp theo độ chặt (ý 1, ý 2).",
          "Đổi thứ tự không đổi được gì. Nó chỉ để lại cho người đọc sau một lý do sai cho việc hệ đang an toàn."
        ] },
      { k: "B", gist: "Change the team's allow hook to return <code>ask</code> for restricted sources so a person confirms those fetches before they run.",
        why: [
          "Thừa: với nguồn bị hạn chế, hook tuân thủ đã trả <code>deny</code>, và <code>deny</code> chặt hơn <code>ask</code> (ý 2). Lệnh bị chặn luôn, không hiện hộp hỏi nào.",
          "Còn ngược mục đích của hook chung: lượt chạy đêm không người, chỗ nào đổi sang <code>ask</code> là kẹt chờ ở chỗ đó (ý 3)."
        ] },
      { k: "C", gist: "Merge both checks into a single hook callback that returns one decision per fetch so conflicting decisions never happen.",
        why: [
          "Không làm được: hook tuân thủ nằm trong plugin team không sửa được, nên không gộp code của nó vào callback của mình.",
          "Cũng không cần: SDK đã gộp quyết định của các hook theo luật cái chặt nhất thắng (ý 2).",
          "Dễ bị cuốn vì một hook một quyết định nghe gọn, hết xung đột. Nhưng xung đột ở đây đã có luật giải sẵn, và luật đó nghiêng về phía an toàn."
        ] },
      { k: "D", gist: "Leave both hooks registered as they are, because a <code>deny</code> from any matching hook takes precedence over an <code>allow</code>.",
        why: [
          "Đúng luật của SDK: <code>deny</code> &gt; <code>defer</code> &gt; <code>ask</code> &gt; <code>allow</code> (ý 2). Fetch nguồn bị hạn chế luôn bị chặn, hook chung trả gì cũng vậy.",
          "Fetch bình thường thì hook tuân thủ không chặn, hook chung cho qua, lượt chạy đêm vẫn không kẹt. Giữ được cả hai mục tiêu mà không phải sửa gì."
        ] }
    ],
    refs: [
      { label: "Bài 1.5, ô “Đã sửa 02/11”: bốn quyết định của PreToolUse; nhiều hook trả khác nhau thì deny > defer > ask > allow", href: NOTES + "#fix-11" },
      { label: "Cheatsheet D1: dòng Hook, nhiều hook thì cái chặt nhất thắng", href: NOTES + "#cheat-d1" },
      { label: "Docs “Intercept and control agent behavior with hooks”, mục Register multiple hooks: hook khớp chạy song song, quyết định chặt nhất được áp", href: "https://code.claude.com/docs/en/agent-sdk/hooks" }
    ]
  },
  {
    de: 9, n: 26, total: 60, sub: "1.5", subName: "Hook của Agent SDK: chặn tool call và chuẩn hóa dữ liệu", scen: "S3",
    answer: "BC",
    ask: "Policy says no research run may end while the final report still has sections without citations. The report subagent builds the report over many Write calls, and early writes legitimately have no citations yet. Which two approaches enforce this rule deterministically? (Choose two.)",
    scene: [
      "Chính sách: không lượt research nào được kết thúc khi báo cáo cuối còn phần chưa có trích dẫn.",
      "Report subagent viết báo cáo qua nhiều lần gọi Write. Mấy lần đầu chưa có trích dẫn là bình thường, vì nó đang dựng dần.",
      "Chỗ khó: đề đòi “deterministically” (chắc chắn, bằng code), và luật chỉ áp lên trạng thái cuối, không áp lên từng bản nháp. Nên cần cơ chế bằng code, gắn đúng vào lúc kết thúc."
    ],
    asks: [
      "Hai cách nào thi hành luật này một cách chắc chắn?",
      "Tức là: chọn cơ chế chạy bằng code, và gắn nó vào lúc agent định kết thúc, không phải lúc đang viết nháp.",
      "Soi từng phương án: nó là code hay lời dặn? Nó kiểm lúc kết thúc hay kiểm từng lần Write?"
    ],
    facts: [
      "Hook là code SDK tự gọi ở những thời điểm cố định trong vòng lặp, Claude không bỏ qua được. CLAUDE.md và prompt là chỉ dẫn, làm theo theo xác suất. Viết IMPORTANT cũng không biến chỉ dẫn thành bảo đảm.",
      "Hook <code>Stop</code> chạy khi agent sắp kết thúc lượt. Hook <code>SubagentStop</code> chạy khi subagent sắp xong. Cả hai chặn được: chặn thì agent không dừng mà làm tiếp, lý do chặn thành phản hồi cho nó.",
      "Hook <code>PreToolUse</code> chạy trước mỗi lần gọi tool, kể cả từng lần Write."
    ],
    opts: [
      { k: "A", gist: "Add a citation rule marked IMPORTANT to the project CLAUDE.md so every agent in the system loads it at the start of each session.",
        why: [
          "Sai loại cơ chế: CLAUDE.md là chỉ dẫn, không phải cấu hình được thi hành (ý 1). IMPORTANT chỉ làm dòng đó nổi hơn.",
          "Agent vẫn có lúc kết thúc khi còn phần thiếu trích dẫn. Đề đòi chắc chắn, nên lời dặn không đủ."
        ] },
      { k: "B", gist: "Register a <code>Stop</code> hook that checks the finished report for uncited sections and blocks the turn from ending while gaps remain.",
        why: [
          "Đúng loại và đúng chỗ: hook là code (ý 1), và <code>Stop</code> chạy đúng lúc agent định kết thúc (ý 2).",
          "Còn phần thiếu trích dẫn thì hook chặn, đưa danh sách chỗ thiếu làm phản hồi, agent làm tiếp. Bản nháp giữa chừng không bị đụng tới, vì hook chỉ kiểm lúc kết thúc.",
          "Muốn chắc tới cùng, app còn phải coi ca hook hỏng là lượt chạy hỏng. Docs ghi hook <code>Stop</code> quá thời gian thì tính như không quyết định, agent vẫn dừng."
        ] },
      { k: "C", gist: "Register a <code>SubagentStop</code> hook that blocks the report subagent from finishing while its report still has sections without citations.",
        why: [
          "Cũng là code (ý 1), gắn vào lúc report subagent định xong (ý 2). Báo cáo còn thiếu thì subagent bị giữ lại làm tiếp, không trả báo cáo dở về coordinator.",
          "Kiểm ở trạng thái cuối của subagent, nên các lần Write nháp vẫn chạy bình thường.",
          "B và C chặn ở hai tầng: subagent không nộp báo cáo thiếu, và cả lượt research không kết thúc khi báo cáo còn thiếu."
        ] },
      { k: "D", gist: "Register a <code>PreToolUse</code> hook that denies any Write call whose content lacks citations, so an uncited version of the report is never saved.",
        why: [
          "Đúng là chặn chắc chắn bằng code, nhưng chặn sai chỗ. Nó kiểm từng lần Write (ý 3), trong khi đề nói mấy lần Write đầu thiếu trích dẫn là hợp lệ.",
          "Kết quả: subagent không dựng được báo cáo, vì bản nháp nào cũng bị từ chối. Luật chỉ áp lên lúc kết thúc.",
          "Dễ bị cuốn vì PreToolUse deny là đáp án đúng ở rất nhiều câu. Nhưng ở đây luật nói về trạng thái cuối, không nói về từng thao tác."
        ] }
    ],
    refs: [
      { label: "Bài 1.5, mục “Chuyện gì đang xảy ra”: hook là deterministic, prompt là probabilistic", href: NOTES + "#l-1-5" },
      { label: "Bài Nền tảng D3: chỉ dẫn (CLAUDE.md, rule, skill) là xác suất, thứ bắt buộc phải đặt ở chỗ chương trình thi hành", href: NOTES + "#l-3-0" },
      { label: "Docs “Hooks reference”: Stop và SubagentStop chặn được, agent hoặc subagent làm tiếp thay vì dừng", href: "https://code.claude.com/docs/en/hooks" }
    ]
  },
  {
    de: 9, n: 27, total: 60, sub: "5.6", subName: "Giữ nguồn và xử lý mâu thuẫn khi tổng hợp", scen: "S3",
    answer: "A",
    ask: "The search and document analysis subagents already return structured claim-source mappings to the coordinator. When it delegates synthesis, the coordinator writes only a short prose digest into the synthesis subagent's prompt, and the final reports carry no citations. After several research rounds, the coordinator's own history is long. What should you change?",
    scene: [
      "Search subagent và document analysis subagent đã trả về coordinator claim-source mapping (ánh xạ khẳng định → nguồn) có cấu trúc.",
      "Khi giao việc tổng hợp, coordinator chỉ viết một đoạn văn tóm tắt ngắn vào prompt của synthesis subagent. Báo cáo cuối không có trích dẫn nào.",
      "Chỗ khó: nguồn có đủ, chỉ rơi mất ở bước giao việc. Đề còn cài một dữ kiện: sau nhiều vòng research, lịch sử của coordinator đã dài."
    ],
    asks: [
      "Nên đổi gì?",
      "Tức là: làm sao cho nguồn tới được synthesis subagent, mà không kéo theo thứ nó không cần.",
      "Soi từng phương án: nó có đưa đúng mapping gốc tới subagent không? Nó có kéo theo đống lịch sử dài không?"
    ],
    facts: [
      "Subagent không phải fork thì bắt đầu với context mới, không thấy lịch sử của coordinator. Docs: thứ duy nhất truyền từ bên gọi xuống là chuỗi prompt của lời giao việc.",
      "Fork là subagent sao chép cả hội thoại tới lúc đó, thay vì bắt đầu mới. Nó mang theo mọi thứ đã có, kể cả thứ không liên quan.",
      "Guide 5.6 đòi claim-source mapping có cấu trúc: mỗi khẳng định đi kèm nguồn. Agent phía sau phải giữ và gộp mapping đó. Viết lại thành văn trơn là mỗi lần tóm lại rơi bớt nguồn."
    ],
    opts: [
      { k: "A", gist: "Pass the subagents' structured claim-source mappings directly in the synthesis subagent's delegation prompt instead of the prose digest.",
        why: [
          "Đúng kênh: lời giao việc là đường duy nhất đưa dữ liệu xuống subagent (ý 1). Đưa mapping vào đó thì synthesis có đủ nguồn để trích.",
          "Giữ nguyên cấu trúc, không tóm thành văn, nên nguồn không rơi ở bước giao (ý 3).",
          "Mapping gọn, đúng thứ cần. Synthesis vẫn có context sạch, không phải gánh lịch sử dài của coordinator."
        ] },
      { k: "B", gist: "Run the synthesis subagent as a fork so it inherits the coordinator's whole conversation, including every mapping the subagents returned.",
        why: [
          "Chạy được: fork sao chép cả hội thoại, nên mapping cũng sang theo (ý 2).",
          "Nhưng đề nói lịch sử coordinator đã dài sau nhiều vòng. Fork kéo theo cả các lượt lập kế hoạch, báo cáo các vòng cũ, toàn thứ synthesis không cần. Thứ cần chỉ là mấy mapping gọn.",
          "Dễ bị cuốn vì đây là phương án duy nhất ngoài A đưa được nguồn tới nơi. Nhưng fork bỏ mất cái lợi cô lập context, trong khi ở đây truyền thẳng là đủ."
        ] },
      { k: "C", gist: "Add a rule to the synthesis subagent's system prompt that every claim in its output must carry a source URL and document name.",
        why: [
          "Sai chỗ bệnh: synthesis không thiếu luật, nó thiếu dữ liệu. Prompt của nó chỉ có đoạn tóm tắt, không có URL hay tên tài liệu nào (ý 1).",
          "Lời dặn không tạo ra được nguồn mà context không có. Dặn trích dẫn khi không có nguồn thì model hoặc lờ đi, hoặc bịa nguồn. Bịa nguồn còn tệ hơn không có."
        ] },
      { k: "D", gist: "Give the synthesis subagent a web search tool so it can find and attach a source for each finding it synthesizes.",
        why: [
          "Dựng lại nguồn thay vì giữ nguồn. Nguồn tìm lại chưa chắc là nguồn mà khẳng định đó thật sự lấy từ, nên trích dẫn có thể trỏ sai tài liệu (ý 3).",
          "Còn lặp lại việc search subagent đã làm, và cho synthesis một tool ngoài vai của nó."
        ] }
    ],
    refs: [
      { label: "Bài 5.6: claim-source mapping có cấu trúc phải được giữ và gộp, không viết lại thành văn", href: NOTES + "#l-5-6" },
      { label: "Bài 1.3, mục “Truyền kết quả thế nào để không mất nguồn”: subagent chỉ biết thứ có trong lời giao việc; tách nội dung và nguồn", href: NOTES + "#l-1-3" },
      { label: "Docs “Subagents in the SDK”, mục What subagents inherit: chỉ chuỗi prompt của lời giao việc đi từ bên gọi xuống; fork thì sao chép hội thoại", href: "https://code.claude.com/docs/en/agent-sdk/subagents" }
    ]
  },
  {
    de: 9, n: 28, total: 60, sub: "1.5", subName: "Hook của Agent SDK: chặn tool call và chuẩn hóa dữ liệu", scen: "S3",
    answer: "D",
    ask: "Compliance forbids any query containing a confidential project codename from reaching external search engines. The violation happens the moment the web search subagent sends the query. Prompt instructions still let roughly 2% of such queries through. What should you implement?",
    scene: [
      "Quy định tuân thủ: truy vấn có tên mã dự án mật không được tới công cụ tìm kiếm bên ngoài.",
      "Vi phạm xảy ra ngay lúc web search subagent gửi truy vấn đi.",
      "Đã dặn trong prompt, vẫn lọt khoảng 2%. Chỗ khó: phải chặn được trước lúc gửi, và chặn dựa trên nội dung truy vấn."
    ],
    asks: [
      "Nên làm gì?",
      "Tức là: một cơ chế chạy bằng code, chạy trước khi tool gửi truy vấn, và đọc được nội dung truy vấn.",
      "Soi từng phương án: nó chạy trước hay sau lúc gửi? Nó kiểm nội dung hay chỉ kiểm dạng dữ liệu?"
    ],
    facts: [
      "Prompt và description của tool là chỉ dẫn, làm theo theo xác suất. Lọt 2% đúng là phần sai còn lại của cách chỉ dặn.",
      "<code>PreToolUse</code> chạy sau khi Claude xin gọi tool, trước khi tool chạy. Nó đọc tham số rồi trả <code>deny</code> kèm lý do. Với <code>deny</code>, Claude đọc lý do để biết vì sao bị chặn.",
      "<code>PostToolUse</code> chạy khi tool đã chạy xong. Nó sửa được kết quả trước khi Claude đọc, nhưng không rút lại được lệnh gọi đã chạy.",
      "<code>strict: true</code> bảo đảm input của tool khớp JSON schema: đúng kiểu, đủ trường. Nó không kiểm nghĩa của giá trị."
    ],
    opts: [
      { k: "A", gist: "Add a <code>PostToolUse</code> hook that strips flagged codenames from every search result before the model reads it, so no confidential text enters the research context.",
        why: [
          "Sai thời điểm: PostToolUse chạy khi truy vấn đã gửi đi (ý 3). Tên mã đã tới công cụ tìm kiếm ngoài, vi phạm đã xảy ra.",
          "Nó chỉ giữ sạch context của subagent, mà đề không lo chuyện đó.",
          "Dễ bị cuốn vì cũng là hook, cũng là code, và PostToolUse đúng là chỗ để làm sạch kết quả. Nhưng đề định nghĩa vi phạm là lúc gửi, nên phải chặn trước."
        ] },
      { k: "B", gist: "List the flagged codenames in the subagent's system prompt and in the <code>web_search</code> tool description, marking the rule as top priority.",
        why: [
          "Vẫn là chỉ dẫn (ý 1), chỉ viết mạnh hơn. Đề đã cho thấy cách này lọt 2%.",
          "Luật này lọt một lần là vi phạm. Giảm tỉ lệ lọt không đủ, phải về 0."
        ] },
      { k: "C", gist: "Set <code>strict</code> to true on the <code>web_search</code> tool definition so every query input is checked against the tool's JSON schema before it runs.",
        why: [
          "Sai thứ được kiểm: <code>strict</code> chỉ bảo đảm input đúng schema (ý 4). Một chuỗi truy vấn chứa tên mã vẫn là chuỗi hợp lệ.",
          "Schema không biết tên mã nào là mật, nên không chặn được gì."
        ] },
      { k: "D", gist: "Add a <code>PreToolUse</code> hook that denies any <code>web_search</code> call whose query contains a flagged codename, so the subagent gets feedback and retries without it.",
        why: [
          "Đúng thời điểm: hook chạy trước khi truy vấn được gửi (ý 2). Có tên mã thì trả <code>deny</code>, truy vấn không bao giờ rời hệ thống.",
          "Đây là code, chặn mọi lần, không phụ thuộc Claude có nhớ lời dặn hay không (ý 1).",
          "Lý do từ chối về tới subagent. Nó viết lại truy vấn không có tên mã rồi tìm tiếp, việc research vẫn chạy."
        ] }
    ],
    refs: [
      { label: "Bài 1.5: PreToolUse chạy trước khi tool thực thi, PostToolUse chạy sau; hook chắc chắn, prompt xác suất", href: NOTES + "#l-1-5" },
      { label: "Bài 1.5, ô “Đã sửa 03/11”: với deny, Claude đọc permissionDecisionReason", href: NOTES + "#fix-28" },
      { label: "Bài 4.0, ô “Đã sửa 01/11”: strict: true chỉ bảo đảm đúng kiểu, đủ trường", href: NOTES + "#fix-6" }
    ]
  },
  {
    de: 9, n: 29, total: 60, sub: "2.5", subName: "Chọn built-in tool đúng việc", scen: "S3",
    answer: "D",
    ask: "The document analysis subagent searches downloaded Go source files for the literal text <code>interface{}</code>. Its tool list holds only Read, Grep and Glob. Grep rejects the search and returns an error containing a ripgrep diagnostic. What is the correct fix?",
    scene: [
      "Document analysis subagent tìm đúng chuỗi <code>interface{}</code> trong các file Go đã tải về.",
      "Subagent chỉ có ba tool: Read, Grep, Glob.",
      "Grep từ chối và trả lỗi kèm chẩn đoán của ripgrep (công cụ tìm kiếm chạy bên dưới Grep). Chỗ khó: lỗi này nghĩa là ripgrep không nhận pattern, nên vấn đề nằm ở pattern, không nằm ở file."
    ],
    asks: [
      "Sửa thế nào cho đúng?",
      "Tức là: viết pattern ra sao để Grep hiểu <code>{}</code> là chữ thường, và chỉ dùng ba tool đang có.",
      "Soi từng phương án: nó có đổi cách ripgrep đọc dấu ngoặc nhọn không? Tool nó cần có trong danh sách không?"
    ],
    facts: [
      "Grep chạy trên ripgrep và dùng cú pháp regex của ripgrep. Pattern có ký tự đặc biệt của regex thì phải escape (thêm dấu <code>\\</code> phía trước). Docs lấy đúng ví dụ này: tìm <code>interface{}</code> trong code Go thì viết <code>interface\\{\\}</code>.",
      "Trong regex, dấu ngoặc nhọn là ký tự đặc biệt, dùng để ghi số lần lặp (<code>a{3}</code> là ba chữ a liền nhau). Pattern ripgrep không nhận thì Grep trả lỗi kèm chẩn đoán của ripgrep, để Claude sửa input rồi tìm lại.",
      "<code>multiline: true</code> chỉ cho pattern khớp qua nhiều dòng. Nó không đổi cách đọc ký tự đặc biệt.",
      "Subagent chỉ có những tool ghi trong danh sách <code>tools</code> của nó. Tool không có trong danh sách thì không nằm trong phiên của subagent."
    ],
    opts: [
      { k: "A", gist: "Wrap the pattern in quotation marks so Grep treats it as literal text rather than as a pattern.",
        why: [
          "Sai ở giả định: nghĩ regex có lớp dấu nháy như shell. Không có. Dấu nháy chỉ thành ký tự phải tìm, thêm vào pattern.",
          "Dấu ngoặc nhọn bên trong vẫn bị đọc là ký tự đặc biệt (ý 2), nên lỗi y nguyên. Mà trong file cũng không có dấu nháy quanh <code>interface{}</code>."
        ] },
      { k: "B", gist: "Set <code>multiline</code> to true so the braces can match together with the surrounding code.",
        why: [
          "Sai tham số: <code>multiline</code> chỉ cho khớp qua nhiều dòng (ý 3).",
          "Dấu ngoặc nhọn vẫn bị đọc là ký tự đặc biệt, ripgrep vẫn báo lỗi như cũ."
        ] },
      { k: "C", gist: "Run the search through Bash with <code>grep -F</code>, which treats the whole pattern as a fixed literal string.",
        why: [
          "Có Bash thì <code>grep -F</code> (tìm chuỗi cố định, không dùng regex) chạy được.",
          "Nhưng subagent này chỉ có Read, Grep, Glob (ý 4). Không có Bash để gọi.",
          "Dễ bị cuốn vì đây là cách quen tay ngoài terminal. Nhưng bộ tool đã bị giới hạn có chủ ý, và tool đang có làm được việc này nếu dùng đúng."
        ] },
      { k: "D", gist: "Escape the braces so the pattern reads <code>interface\\{\\}</code>, because Grep patterns follow ripgrep regex syntax.",
        why: [
          "Đúng gốc: pattern của Grep là regex của ripgrep (ý 1). Escape hai dấu ngoặc thì ripgrep hiểu đó là chữ thường, tìm đúng <code>interface{}</code>.",
          "Đúng ví dụ docs đưa ra, và chỉ dùng tool subagent đang có."
        ] }
    ],
    refs: [
      { label: "Bài 2.5, mục Khái niệm: pattern của Grep là regex khớp nội dung, ký tự đặc biệt phải escape như ví dụ calculateTax", href: NOTES + "#l-2-5" },
      { label: "Docs “Tools reference”, mục Grep tool behavior: Grep dùng regex của ripgrep; tìm interface{} thì viết interface\\{\\}", href: "https://code.claude.com/docs/en/tools-reference#grep-tool-behavior" }
    ]
  },
  {
    de: 9, n: 30, total: 60, sub: "2.2", subName: "Lỗi có cấu trúc cho MCP tool", scen: "S3",
    answer: "BC",
    ask: "The document analysis subagent must see failure messages so it can recover by itself. Which two failures should its MCP server report in a tool result with <code>isError</code> set to true? (Choose two.)",
    scene: [
      "MCP server của document analysis subagent phải báo lỗi sao cho subagent đọc được và tự xoay xở.",
      "Đề đưa bốn ca lỗi: gọi tên tool server không có; tài liệu vi phạm luật nghiệp vụ (quá số trang cho phép); API lưu trữ phía sau trả lỗi 500; request <code>tools/call</code> thiếu trường tên tool.",
      "Chỗ khó: cả bốn đều là “lỗi”, nhưng MCP chia làm hai kênh, và chỉ một kênh chắc chắn tới tay model."
    ],
    asks: [
      "Hai lỗi nào nên trả trong kết quả tool với <code>isError: true</code>?",
      "Tức là: ca nào là lỗi thực thi (request hợp lệ, tool đã chạy mà hỏng), ca nào là lỗi giao thức (request hỏng, không có lần chạy tool nào)."
    ],
    facts: [
      "MCP có hai kênh lỗi. Lỗi giao thức JSON-RPC dành cho tool không tồn tại, request sai khung <code>tools/call</code> (<code>CallToolRequest</code>), server lỗi.",
      "Lỗi thực thi (Tool Execution Error) trả ngay trong kết quả tool với <code>isError: true</code>: input sai, dịch vụ phía sau hỏng, vi phạm luật nghiệp vụ.",
      "Spec ghi client SHOULD (nên) đưa lỗi thực thi cho model để nó tự sửa, còn lỗi giao thức thì chỉ MAY (có thể). Muốn model đọc được lỗi thì trả qua <code>isError</code>."
    ],
    opts: [
      { k: "A", gist: "When the subagent calls a tool name that the server does not list in its <code>tools/list</code> response.",
        why: [
          "Tool không tồn tại là lỗi giao thức (ý 1). Không có lần chạy tool nào để gắn kết quả vào.",
          "Server trả lỗi JSON-RPC chuẩn, client và host xử lý."
        ] },
      { k: "B", gist: "When a fetched document breaks the tool's business rules, for example by going over the allowed page count.",
        why: [
          "Request hợp lệ, tool đã chạy, chỉ là luật của chính tool từ chối việc này. Đó là lỗi nghiệp vụ, thuộc kênh lỗi thực thi (ý 2).",
          "Trả bằng <code>isError: true</code> thì subagent đọc được lý do, rồi chọn tài liệu khác hoặc báo lại giới hạn (ý 3)."
        ] },
      { k: "C", gist: "When the upstream document storage API returns a 500 error while the tool is fetching a requested file.",
        why: [
          "Dịch vụ phía sau hỏng trong lúc tool chạy là lỗi thực thi, không phải lỗi giao thức (ý 2).",
          "Đi kênh <code>isError: true</code> thì subagent thấy lỗi và tự quyết: thử lại hay đổi hướng (ý 3). Đúng yêu cầu “recover by itself” (tự xoay xở) của đề."
        ] },
      { k: "D", gist: "When an incoming <code>tools/call</code> request is malformed because it lacks the required tool name field.",
        why: [
          "Request thiếu tên tool là sai khung <code>CallToolRequest</code>, tức lỗi giao thức (ý 1).",
          "Dễ bị cuốn vì nghe giống “input sai”, mà input sai thì đi kênh <code>isError</code>. Nhưng input sai là giá trị tham số sai so với schema của tool, request vẫn đúng khung. Ở đây chính khung request hỏng, chưa biết gọi tool nào."
        ] }
    ],
    refs: [
      { label: "Bài 2.2, ô “Đã sửa 02/11”: hai kênh lỗi MCP; lỗi thực thi trả isError, model chắc chắn thấy kênh này", href: NOTES + "#fix-13" },
      { label: "Cheatsheet D2: dòng “Input sai: ném protocol error hay trả isError?”", href: NOTES + "#cheat-d2" },
      { label: "Spec MCP 2025-11-25, mục Error Handling: Protocol Errors và Tool Execution Errors", href: "https://modelcontextprotocol.io/specification/2025-11-25/server/tools#error-handling" }
    ]
  },
  {
    de: 9, n: 31, total: 60, sub: "3.3", subName: "Rule theo đường dẫn trong .claude/rules", scen: "S5",
    answer: "C",
    ask: "Each service directory's <code>CLAUDE.md</code> carries its own copy of the testing conventions, and the copies have drifted apart. The team wants a single maintained version that loads only when a review touches test files. Where should the conventions live?",
    scene: [
      "Quy ước viết test đang được chép vào <code>CLAUDE.md</code> của từng thư mục service. Các bản chép giờ đã lệch nhau.",
      "Team muốn hai thứ: chỉ còn một bản để bảo trì, và bản đó chỉ nạp khi lượt review đụng tới file test.",
      "Chỗ khó: có cách gom về một bản nhưng vẫn nạp mọi lúc, có cách nạp lười nhưng theo thư mục chứ không theo loại file. Phải lo cả hai vế."
    ],
    asks: [
      "Quy ước nên đặt ở đâu?",
      "Tức là: chỗ nào vừa là một file duy nhất, vừa chỉ nạp khi Claude đụng file test.",
      "Soi từng phương án: có hết lệch (một bản) không? Nạp lúc nào: mở phiên, khi được gọi, khi vào thư mục, hay khi đụng file khớp?"
    ],
    facts: [
      "Rule trong <code>.claude/rules/</code> có frontmatter <code>paths</code> (khối YAML ở đầu file) chỉ nạp khi Claude đọc, ghi hoặc sửa file khớp glob. Glob khớp theo tên file, nên <code>**/*.test.ts</code> bắt được file test ở mọi thư mục.",
      "CLAUDE.md đặt trong thư mục con nạp khi Claude đọc file trong thư mục đó. Điều kiện là vị trí, không phải loại file.",
      "File kéo vào bằng <code>@path</code> nạp cùng lúc với CLAUDE.md trỏ tới nó, tức là lúc mở phiên. Import giúp sắp xếp, không giảm context.",
      "Skill: đầu phiên chỉ có mô tả trong context, nội dung đầy đủ nạp khi skill được gọi. Skill hợp với quy trình theo việc. Quy ước thường trực cần tự áp thì để CLAUDE.md hoặc rule."
    ],
    opts: [
      { k: "A", gist: "Put them in a skill under <code>.claude/skills/</code> and have the CI review prompt invoke that skill before it evaluates any tests.",
        why: [
          "Sai ở điều kiện nạp: skill nạp khi prompt gọi nó (ý 4), không phải khi đụng file test. Prompt gọi ở mọi lượt review thì PR không có test cũng gánh quy ước.",
          "Quy ước lại phụ thuộc chuyện prompt có nhớ gọi skill không. Quên một lần là lượt đó không có quy ước."
        ] },
      { k: "B", gist: "Keep them in one shared standards file that the root <code>CLAUDE.md</code> pulls in through an <code>@path</code> import, replacing the copies.",
        why: [
          "Lo được vế một: chỉ còn một file, hết lệch.",
          "Hỏng vế hai: file import nạp ngay lúc mở phiên, cùng CLAUDE.md gốc (ý 3). Review PR không đụng test vẫn mang quy ước test trong context.",
          "Dễ bị cuốn vì nó giải đúng nỗi đau đề kể trước (các bản chép lệch nhau). Nhưng import chỉ sắp xếp, không làm nạp có điều kiện."
        ] },
      { k: "C", gist: "Put them in a single file under <code>.claude/rules/</code> whose <code>paths</code> glob matches the repository's test-file pattern.",
        why: [
          "Lo cả hai vế. Một file duy nhất, commit vào repo, nên không còn bản chép nào để lệch.",
          "Rule chỉ nạp khi Claude đọc, ghi hoặc sửa file khớp glob (ý 1). PR có test thì quy ước vào context, PR không có test thì không tốn gì.",
          "Glob theo tên file nên file test nằm ở service nào cũng khớp. Ví dụ minh họa:<pre><code># .claude/rules/testing.md\n---\npaths: [\"**/*.test.ts\"]\n---\nQuy ước viết test...</code></pre>"
        ] },
      { k: "D", gist: "Put one <code>CLAUDE.md</code> at the top of the source tree so that every service directory below it inherits it.",
        why: [
          "Lo được vế một: một file thay cho nhiều bản chép.",
          "Hỏng vế hai: CLAUDE.md thư mục nạp khi Claude đọc bất kỳ file nào trong cây thư mục đó (ý 2). Sửa file không phải test cũng kéo quy ước test vào.",
          "Dễ bị cuốn vì CLAUDE.md thư mục con đúng là nạp lười. Nhưng điều kiện của nó là vị trí, không diễn tả được “chỉ khi là file test”."
        ] }
    ],
    refs: [
      { label: "Bài 3.3: rule có paths chỉ nạp khi đụng file khớp; copy rule ra nhiều thư mục thì sớm muộn lệch nhau", href: NOTES + "#l-3-3" },
      { label: "Bài 3.1: @import kéo file vào CLAUDE.md, nạp lúc khởi động", href: NOTES + "#l-3-1" },
      { label: "Docs “How Claude remembers your project”: path-scoped rule nạp khi Read/Write/Edit file khớp; import không giảm context", href: "https://code.claude.com/docs/en/memory" }
    ]
  },
  {
    de: 9, n: 32, total: 60, sub: "4.4", subName: "Validate, retry kèm lỗi và vòng phản hồi", scen: "S5",
    answer: "B",
    ask: "A pipeline stage calls the Claude API and asks for review findings as JSON. The failed responses stop partway through the array, and every one of them has <code>stop_reason</code> set to <code>max_tokens</code>. Retrying with the parse error included hasn't fixed them. What should you change?",
    scene: [
      "Một bước trong pipeline gọi Claude API để lấy finding review dạng JSON.",
      "Các response lỗi đều dừng giữa mảng, và <code>stop_reason</code> của chúng đều là <code>max_tokens</code>. Ví dụ minh họa:<pre><code>{\"findings\": [\n  {\"file\": \"a.py\", \"line\": 12, \"issue\": \"...\"},\n  {\"file\": \"b.py\", \"line\": 4</code></pre>",
      "Đã thử retry kèm lỗi parse nhưng không ăn thua.",
      "Chỗ khó: JSON hỏng nghe như lỗi định dạng, nên dễ lao vào sửa prompt hay sửa chuỗi. Nhưng <code>stop_reason</code> đã nói rõ vì sao nó dừng."
    ],
    asks: [
      "Nên đổi gì?",
      "Tức là: đọc đúng nguyên nhân từ <code>stop_reason</code>, rồi chọn cách sửa đúng nguyên nhân đó.",
      "Soi từng phương án: nó sửa chuyện JSON sai hình dạng, hay sửa chuyện output bị cắt vì hết chỗ?"
    ],
    facts: [
      "<code>stop_reason</code> cho biết vì sao Claude ngừng sinh chữ. <code>max_tokens</code> nghĩa là câu trả lời bị cắt giữa chừng vì chạm giới hạn <code>max_tokens</code> mày đặt trong request. Cách xử lý: tăng giới hạn, hoặc gọi tiếp để viết nốt.",
      "Chạm trần thì JSON bị cắt ngang. Docs Structured outputs ghi: output có thể chưa đủ và không khớp schema; “Retry with a higher max_tokens value” (gọi lại với <code>max_tokens</code> cao hơn).",
      "Retry kèm lỗi cụ thể có ích khi model sửa được chỗ sai: sai định dạng, đặt nhầm trường, đọc nhầm số. Nguyên nhân nằm ngoài model thì gọi lại bao nhiêu lần cũng vậy.",
      "Few-shot (ví dụ mẫu trong prompt) dùng khi output không nhất quán về định dạng."
    ],
    opts: [
      { k: "A", gist: "Add few-shot examples of complete findings in the exact JSON format to the review prompt.",
        why: [
          "Sai bệnh: few-shot chữa định dạng lộn xộn (ý 4). Ở đây phần đã viết ra vẫn đúng hình dạng, chỉ là bị cắt.",
          "Ví dụ còn làm prompt dài thêm mà không thêm chút chỗ nào cho output. Response vẫn chạm trần như cũ."
        ] },
      { k: "B", gist: "Raise the <code>max_tokens</code> limit on these requests and rerun them, since the output was cut off before it finished.",
        why: [
          "Đúng nguyên nhân: <code>stop_reason: max_tokens</code> là output chạm trần (ý 1). JSON thiếu chứ không sai.",
          "Docs Structured outputs khuyên đúng việc này: gọi lại với <code>max_tokens</code> cao hơn (ý 2). Có đủ chỗ thì mảng finding viết trọn và parse được."
        ] },
      { k: "C", gist: "Retry each failure with the original diff, the truncated output, and the specific parse error so the model can fix it.",
        why: [
          "Retry kèm lỗi là cách tốt cho lỗi model sửa được (ý 3). Còn ở đây model không viết sai gì, nó chỉ hết chỗ.",
          "Gọi lại với cùng trần <code>max_tokens</code> thì lại bị cắt, chưa kể prompt còn dài thêm vì kèm output cũ. Đúng chuyện đề kể: retry như vậy rồi mà không khỏi.",
          "Dễ bị cuốn vì đây là bài bản của 4.4 (validate rồi retry kèm lỗi). Nhưng phải đọc <code>stop_reason</code> để biết lỗi thuộc loại nào trước khi retry."
        ] },
      { k: "D", gist: "Add a post-processing step that closes any unterminated brackets and quotes so the truncated JSON still parses.",
        why: [
          "Parse được, nhưng các finding bị cắt mất thì vẫn mất. Không đóng ngoặc nào mang chúng về được.",
          "Tệ hơn: pipeline coi một bản review dở dang là bản đầy đủ, lặng lẽ bỏ sót finding. Lỗi lộ ra còn đỡ hơn lỗi bị che."
        ] }
    ],
    refs: [
      { label: "Bài 1.1, bảng các giá trị stop_reason: max_tokens thì tăng giới hạn hoặc gọi tiếp", href: NOTES + "#l-1-1" },
      { label: "Bài 4.4: retry kèm lỗi cho lỗi model sửa được, và khi nào retry vô ích", href: NOTES + "#l-4-4" },
      { label: "Docs Structured outputs, mục Invalid outputs: stop_reason max_tokens thì gọi lại với max_tokens cao hơn", href: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs" }
    ]
  },
  {
    de: 9, n: 33, total: 60, sub: "3.6", subName: "Đưa Claude Code vào CI/CD", scen: "S5",
    answer: "B",
    ask: "The pipeline gets a new job that drafts an implementation plan whenever a pull request is flagged as a large architectural refactor. The job must never modify the checkout, and nobody is available to answer interactive prompts. Which invocation satisfies both requirements?",
    scene: [
      "Pipeline thêm một job: PR nào bị gắn cờ refactor kiến trúc lớn thì Claude soạn kế hoạch triển khai.",
      "Hai ràng buộc: “must never modify the checkout” (không bao giờ được sửa bản checkout), và không có ai trả lời câu hỏi tương tác.",
      "Chỗ khó: một ràng buộc đòi chặn chắc chắn việc sửa file, ràng buộc kia đòi job chạy một mạch rồi thoát. Thiếu một trong hai là hỏng."
    ],
    asks: [
      "Lệnh gọi nào thỏa cả hai?",
      "Tức là: vừa chạy không cần người, vừa có cơ chế do Claude Code thi hành để chặn sửa file.",
      "Soi từng phương án: có <code>-p</code> không? Việc cấm sửa nằm ở permission mode, hay chỉ là lời dặn?"
    ],
    facts: [
      "Plan mode là một permission mode: Claude đọc file, chạy lệnh để khám phá, viết kế hoạch, nhưng không sửa source. Sửa file bị chặn cho tới khi kế hoạch được duyệt. Bật bằng <code>--permission-mode plan</code>.",
      "Docs Permission modes ghi: plan mode giữ nguyên các chặn này cả khi không có terminal tương tác, kể cả lần chạy <code>-p</code>.",
      "<code>-p</code> chạy không tương tác: xử lý prompt, in kết quả ra stdout, thoát. Không có <code>-p</code> thì Claude Code mở phiên tương tác và chờ người gõ, job CI treo tới khi timeout.",
      "<code>acceptEdits</code> cho Claude tạo và sửa file không cần hỏi. CLAUDE.md và lời dặn trong prompt là chỉ dẫn, Claude làm theo phần lớn thời gian, không phải bảo đảm."
    ],
    opts: [
      { k: "A", gist: "Run <code>claude --permission-mode plan</code> without <code>-p</code>, so the session presents the plan for approval.",
        why: [
          "Chọn đúng cơ chế chặn (ý 1), nhưng thiếu <code>-p</code> nên đây là phiên tương tác (ý 3).",
          "Phiên trình kế hoạch rồi chờ người duyệt. Không ai trả lời, job treo.",
          "Dễ bị cuốn vì plan mode đúng là thứ đề cần. Nhưng đề còn ràng buộc “nobody can answer” (không ai trả lời được), và chỉ <code>-p</code> lo vế đó."
        ] },
      { k: "B", gist: "Run <code>claude -p</code> with <code>--permission-mode plan</code>, so the job prints the proposed plan and exits without editing anything.",
        why: [
          "Lo cả hai vế. <code>-p</code> cho job chạy một mạch, in kế hoạch ra stdout rồi thoát (ý 3).",
          "Plan mode chặn sửa file, và giữ chặn cả trong lần chạy <code>-p</code> (ý 1, ý 2). Không có ai duyệt kế hoạch nên không bao giờ tới bước sửa.",
          "Việc cấm sửa nằm ở cấu hình do Claude Code thi hành, không dựa vào việc Claude nghe lời."
        ] },
      { k: "C", gist: "Run <code>claude -p</code> with <code>--permission-mode acceptEdits</code> and add a <code>CLAUDE.md</code> rule forbidding any file changes.",
        why: [
          "Ngược yêu cầu: <code>acceptEdits</code> duyệt sẵn việc sửa file (ý 4). Cửa đã mở toang.",
          "Rule trong CLAUDE.md chỉ là chỉ dẫn, không đóng được cửa mà permission mode đã mở. Có lúc Claude vẫn sửa."
        ] },
      { k: "D", gist: "Run <code>claude -p</code> with a prompt that tells Claude to only propose a plan and never edit files.",
        why: [
          "Lo được vế không cần người, nhưng vế cấm sửa chỉ là lời dặn trong prompt (ý 4).",
          "Lệnh này không khai permission mode nào chặn sửa file. Checkout có bị sửa hay không phụ thuộc Claude có nghe lời, và cấu hình quyền nào đang có sẵn. Đề đòi “never” (không bao giờ), nên phải là cơ chế chặn."
        ] }
    ],
    refs: [
      { label: "Bài 3.6: -p cho job CI không treo; -p không tự trả lời câu hỏi xin quyền", href: NOTES + "#l-3-6" },
      { label: "Bài 3.4: plan mode là chế độ chỉ đọc, bật bằng --permission-mode plan", href: NOTES + "#l-3-4" },
      { label: "Docs Permission modes: plan mode giữ chặn cả trong lần chạy -p; acceptEdits sửa file không hỏi", href: "https://code.claude.com/docs/en/permission-modes" }
    ]
  },
  {
    de: 9, n: 34, total: 60, sub: "3.3", subName: "Rule theo đường dẫn trong .claude/rules", scen: "S5",
    answer: "A",
    ask: "The CI review job looks at each pull request only through <code>git diff</code> output. Reviews of test changes ignore the path-scoped rule in <code>.claude/rules/testing.md</code>. The conventions must load only for pull requests that change test files. What should you change?",
    scene: [
      "Job review trong CI chỉ xem mỗi PR qua output của <code>git diff</code>.",
      "PR có sửa test mà review vẫn bỏ qua rule <code>.claude/rules/testing.md</code>, một rule có <code>paths</code> (nạp theo đường dẫn).",
      "Ràng buộc: quy ước chỉ được nạp cho PR có đổi file test.",
      "Chỗ khó: rule đã đặt đúng chỗ, glob cũng không sai. Cái thiếu nằm ở việc job làm gì với file, chứ không nằm ở bản thân rule."
    ],
    asks: [
      "Nên đổi gì?",
      "Tức là: làm sao cho rule thật sự nạp khi PR đổi test, mà PR không đổi test thì vẫn không nạp.",
      "Soi từng phương án: nó có tạo ra đúng hành động làm rule nạp không? Và có giữ được điều kiện “chỉ PR có test” không?"
    ],
    facts: [
      "Docs Memory: rule có <code>paths</code> nạp khi Claude dùng Read, Write hoặc Edit trên file khớp glob, hoặc xem file khớp bằng một lệnh Bash được tính là đọc, như <code>cat</code> hay <code>head</code> trên một file.",
      "Đề cho thấy luôn: job chỉ xem qua <code>git diff</code> và rule không nạp. Tức là xem diff không nằm trong các thao tác kích hoạt rule. Claude thấy code test qua chữ trong diff, chưa hề mở file test nào.",
      "Glob chỉ quyết định file nào được tính là khớp. Nó không tự kích hoạt rule khi Claude không đụng file nào.",
      "CLAUDE.md gốc và file kéo vào bằng <code>@import</code> đều nạp lúc mở phiên, ở mọi phiên."
    ],
    opts: [
      { k: "A", gist: "Have the review prompt tell Claude to open each changed test file with the Read tool before commenting on it.",
        why: [
          "Read trên file khớp glob đúng là thao tác làm rule nạp (ý 1). PR có đổi test thì Claude mở file test, quy ước vào context.",
          "PR không đổi test thì không có file test nào để mở, rule không nạp. Giữ đúng điều kiện đề đòi.",
          "Thêm một lợi: reviewer thấy cả file, không chỉ mấy dòng trong diff."
        ] },
      { k: "B", gist: "Widen the rule's <code>paths</code> glob to match every file in the repository so it applies in each review session.",
        why: [
          "Sai ở giả định: glob rộng hơn không làm rule nạp khi Claude chẳng đọc file nào (ý 3). Job vẫn chỉ xem diff, rule vẫn nằm ngoài context.",
          "Mà giả sử có nạp thì nó nạp cả cho PR không đụng test, trái ràng buộc của đề."
        ] },
      { k: "C", gist: "Add an <code>@import</code> of the rule file to the project <code>CLAUDE.md</code> so the conventions load along with the main instructions.",
        why: [
          "Nạp được, nhưng nạp vô điều kiện: file import vào context lúc mở phiên, mọi lượt review (ý 4).",
          "PR không đổi test cũng gánh quy ước test. Trái thẳng ràng buộc “only for PRs that change test files” (chỉ cho PR có đổi file test)."
        ] },
      { k: "D", gist: "Move the testing conventions into the project-root <code>CLAUDE.md</code> so they load at launch in every session.",
        why: [
          "Cũng nạp vô điều kiện như C (ý 4). Quy ước có mặt ở mọi lượt review, kể cả PR không có test.",
          "Dễ bị cuốn vì nó chắc chắn làm reviewer thấy quy ước. Nhưng đổi lại mất đúng thứ rule có <code>paths</code> sinh ra để làm: nạp có điều kiện."
        ] }
    ],
    refs: [
      { label: "Bài 3.3: rule có paths chỉ nạp khi Claude đọc hoặc sửa file khớp", href: NOTES + "#l-3-3" },
      { label: "Docs “How Claude remembers your project”, mục Path-specific rules: nạp khi Read/Write/Edit file khớp, hoặc cat/head một file khớp", href: "https://code.claude.com/docs/en/memory" }
    ]
  },
  {
    de: 9, n: 35, total: 60, sub: "3.6", subName: "Đưa Claude Code vào CI/CD", scen: "S5",
    answer: "D",
    ask: "To keep scripted runs minimal, an engineer added <code>--bare</code> to the CI job's <code>claude -p</code> command. The project <code>CLAUDE.md</code> defines the review criteria. Interactive sessions follow them, but the CI reviews ignore them. What is the fix?",
    scene: [
      "Kỹ sư thêm cờ <code>--bare</code> vào lệnh <code>claude -p</code> của job CI, cho lần chạy gọn nhẹ.",
      "Tiêu chí review nằm trong CLAUDE.md của project. Phiên tương tác trên máy dev làm theo, review trong CI thì không.",
      "Chỗ khó: triệu chứng chia đôi rất rõ (local đúng, CI sai), và thứ duy nhất khác nhau là cờ <code>--bare</code>."
    ],
    asks: [
      "Sửa thế nào?",
      "Tức là: biết <code>--bare</code> bỏ qua những gì, rồi chọn cách cho lần chạy CI nhận được tiêu chí trong CLAUDE.md.",
      "Soi từng phương án: sau khi đổi, lần chạy CI có thật sự đọc tiêu chí không, hay vẫn bị <code>--bare</code> chặn?"
    ],
    facts: [
      "Docs Run Claude Code programmatically: <code>--bare</code> bỏ qua việc tự tìm hook, skill, custom command, subagent, plugin, MCP server, auto memory và CLAUDE.md. Không có <code>--bare</code> thì <code>claude -p</code> tìm và nạp chúng y như phiên tương tác.",
      "Docs khuyên dùng <code>--bare</code> cho script và CI, để máy nào chạy cũng ra cùng kết quả. Khi dùng nó, context cần gì phải truyền bằng cờ, ví dụ <code>--append-system-prompt-file</code>.",
      "<code>--output-format json</code> chỉ quyết định kết quả in ra theo dạng nào, không quyết định Claude áp tiêu chí gì.",
      "<code>--resume</code> nối tiếp một phiên cũ, kéo theo toàn bộ lịch sử của phiên đó."
    ],
    opts: [
      { k: "A", gist: "Use <code>--resume</code> with a named session that already has the criteria loaded, so every run inherits them.",
        why: [
          "Sai chỗ bệnh: <code>--bare</code> vẫn còn trong lệnh, nên lần chạy vẫn không đọc CLAUDE.md hiện tại (ý 1). Nó chỉ mượn ngữ cảnh của một phiên cũ.",
          "Mỗi PR lại nối vào cùng một hội thoại, kéo theo lịch sử review các PR trước (ý 4). Context ngày càng nặng và cũ, review không còn độc lập."
        ] },
      { k: "B", gist: "Move the criteria into a review skill under <code>.claude/skills/</code> so they load only when a review runs.",
        why: [
          "Sai ở giả định: <code>--bare</code> bỏ qua cả việc tìm skill (ý 1). Còn cờ đó thì skill cũng không bao giờ được nạp.",
          "Dễ bị cuốn vì đưa thứ theo việc vào skill thường là cách hay để bớt context. Nhưng ở đây vấn đề là CI không thấy gì, không phải thấy quá nhiều."
        ] },
      { k: "C", gist: "Add <code>--output-format json</code> with a findings schema so the output follows the documented structure.",
        why: [
          "Sai chỗ: cờ này lo hình dạng output (ý 3), không đưa tiêu chí vào context.",
          "Kết quả là JSON đẹp, đúng schema, nhưng finding vẫn không theo tiêu chí của team."
        ] },
      { k: "D", gist: "Drop <code>--bare</code> from the command so the run loads <code>CLAUDE.md</code> just as an interactive session does.",
        why: [
          "Gỡ đúng nguyên nhân: không có <code>--bare</code> thì <code>claude -p</code> tự tìm và nạp CLAUDE.md như phiên tương tác (ý 1). CI nhận cùng tiêu chí với local.",
          "Cách còn lại docs nêu là giữ <code>--bare</code> rồi truyền tiêu chí bằng cờ như <code>--append-system-prompt-file</code> (ý 2). Đề không đưa cách đó, nên D là đáp án."
        ] }
    ],
    refs: [
      { label: "Bài 3.6: CLAUDE.md là kênh đưa tiêu chí review cho Claude trong CI", href: NOTES + "#l-3-6" },
      { label: "Docs Run Claude Code programmatically, mục Start faster with bare mode: --bare bỏ qua CLAUDE.md, skill, hook; truyền context bằng cờ", href: "https://code.claude.com/docs/en/headless" }
    ]
  },
  {
    de: 9, n: 36, total: 60, sub: "3.5", subName: "Tinh chỉnh lặp: ví dụ input/output, test trước, interview", scen: "S5",
    answer: "B",
    ask: "Claude Code writes a new parsing module for the pipeline. Its chosen approach is sound, but the code it delivers breaks on boundary inputs and misses a 2-second latency target, even though Claude reported the task as complete. Which workflow change fixes this most reliably?",
    scene: [
      "Claude Code viết module parse mới cho pipeline. Hướng làm nó chọn là ổn.",
      "Nhưng code giao ra hỏng với input biên (edge case: dữ liệu ở rìa như rỗng, rất dài, ký tự lạ) và chậm hơn mục tiêu 2 giây.",
      "Claude vẫn báo là xong.",
      "Chỗ khó: đề nói trước hướng làm đã ổn, nên vấn đề không nằm ở kế hoạch. Vấn đề là Claude không có gì để tự kiểm xem mình xong thật chưa."
    ],
    asks: [
      "Đổi quy trình thế nào cho chắc nhất?",
      "Tức là: cho Claude một thứ chạy được, trả về đạt hay không đạt, để “xong” được chứng minh thay vì tự nhận.",
      "Soi từng phương án: sau khi đổi, Claude có cách nào biết code hỏng ở input biên và chậm quá 2 giây không?"
    ],
    facts: [
      "Test-driven iteration: viết test suite trước, gồm hành vi thường, edge case và hiệu năng. Rồi đưa test đang fail cho Claude sửa tới khi xanh. “Xong” nghĩa là test chạy xanh.",
      "Docs Best practices: Claude dừng khi việc “looks done” (trông như xong). Không có gì để chạy thì “trông như xong” là tất cả nó dựa vào. Có một check trả về đạt/không đạt thì Claude tự khép vòng: sửa, chạy check, đọc output, sửa tiếp.",
      "Plan mode hợp khi hướng làm chưa rõ hoặc thay đổi lớn. Duyệt kế hoạch không chạy code, nên không lộ được lỗi lúc chạy.",
      "Phiên vừa viết code còn giữ dòng lý luận lúc viết, nên tự review hay bỏ sót chính lỗi của nó. Đọc code cũng không đo được thời gian chạy."
    ],
    opts: [
      { k: "A", gist: "Start the task in plan mode so Claude explores the code and presents its implementation plan for review before editing.",
        why: [
          "Sai bệnh: đề đã nói hướng làm ổn. Plan mode chữa chuyện chọn sai hướng (ý 3).",
          "Một bản kế hoạch không cho biết code chạy sai với input biên hay chậm bao nhiêu. Chỉ chạy thử mới biết."
        ] },
      { k: "B", gist: "Write tests for normal behavior, boundary inputs and the latency target first, then have Claude fix failures until the suite passes.",
        why: [
          "Biến yêu cầu thành thứ chạy được (ý 1). Input biên thành test case, mục tiêu 2 giây thành một assert có ngưỡng.",
          "Claude chạy suite, đọc test fail, sửa, chạy lại tới khi xanh (ý 2). “Xong” lúc đó có bằng chứng, không phải tự nhận."
        ] },
      { k: "C", gist: "Ask the same session to review the finished code and report any boundary inputs or performance problems it may have missed.",
        why: [
          "Phiên đã viết code còn giữ lý luận cũ, nên dễ bỏ sót đúng chỗ nó đã bỏ sót lúc viết (ý 4).",
          "Đọc code cũng không đo được độ trễ. Mục tiêu 2 giây chỉ kiểm được bằng cách chạy."
        ] },
      { k: "D", gist: "Spell out the boundary inputs and the latency target as explicit criteria in the prompt so Claude accounts for them while generating.",
        why: [
          "Giúp lần viết đầu tốt hơn, nhưng vẫn chỉ là chỉ dẫn. Claude vẫn không có gì để chạy kiểm (ý 2).",
          "Nên chuyện cũ lặp lại được: code hỏng ở vài input biên mà Claude vẫn báo xong.",
          "Dễ bị cuốn vì ghi rõ tiêu chí nghe như đã giải quyết gốc rễ. Nhưng tiêu chí viết trong prompt khác với tiêu chí chạy được."
        ] }
    ],
    refs: [
      { label: "Bài 3.5: test-driven iteration, viết test suite trước gồm hành vi, edge case, hiệu năng", href: NOTES + "#l-3-5" },
      { label: "Bài 3.6, mục “Ai review code của ai”: phiên viết code tự review hay bỏ sót", href: NOTES + "#l-3-6" },
      { label: "Docs Best practices, mục Give Claude a check to run", href: "https://code.claude.com/docs/en/best-practices" }
    ]
  },
  {
    de: 9, n: 37, total: 60, sub: "3.2", subName: "Slash command và skill", scen: "S5",
    answer: "AD",
    ask: "A team's pull request review criteria have to apply in every Claude Code session. A separate multi-step triage checklist is used only now and then, and it must run only when a developer deliberately starts it. Which two configuration choices are correct? (Select TWO.)",
    scene: [
      "Team có hai thứ cần đặt chỗ.",
      "Một: tiêu chí review PR, phải áp ở mọi phiên Claude Code.",
      "Hai: checklist triage (phân loại sự cố) nhiều bước, thỉnh thoảng mới dùng, và chỉ được chạy khi dev chủ động bắt đầu.",
      "Chỗ khó: hai thứ đòi hai kiểu nạp ngược nhau. Một cái luôn có mặt, một cái chỉ có khi người gọi. Đề bắt chọn hai, mỗi lựa chọn lo một thứ."
    ],
    asks: [
      "Hai cấu hình nào đúng?",
      "Tức là: chỗ đặt nạp ở mọi phiên cho tiêu chí review, và chỗ đặt chỉ chạy khi dev gọi cho checklist.",
      "Soi từng phương án: nó lo thứ nào, nạp lúc nào, và ai được bắt đầu nó?"
    ],
    facts: [
      "CLAUDE.md của project nạp toàn bộ vào context đầu mỗi phiên, và đi theo git tới cả team. Hợp với chuẩn chung áp dụng mọi lúc.",
      "Skill: đầu phiên chỉ có mô tả trong context, nội dung đầy đủ nạp khi skill được dùng. Docs: khác CLAUDE.md, thân skill chỉ nạp khi dùng, nên tài liệu dài gần như không tốn gì cho tới lúc cần.",
      "Mặc định skill chạy theo hai đường: người gõ <code>/tên</code>, hoặc Claude tự gọi khi mô tả khớp việc đang làm. <code>disable-model-invocation: true</code> bỏ đường thứ hai: Claude không tự gọi được, chỉ người gõ lệnh. Mô tả của skill cũng không nằm trong context.",
      "Một câu ghi chú trong CLAUDE.md là chỉ dẫn, Claude làm theo phần lớn thời gian. Nó không phải cơ chế quyết định khi nào quy trình chạy."
    ],
    opts: [
      { k: "A", gist: "Keep the review criteria in the project <code>CLAUDE.md</code>, shared with the team through version control.",
        why: [
          "Lo thứ một. CLAUDE.md nạp đầu mỗi phiên (ý 1), nên tiêu chí luôn có mặt, không cần ai nhớ gọi.",
          "Commit vào repo thì ai clone cũng có cùng tiêu chí."
        ] },
      { k: "B", gist: "Move the review criteria into a skill so their full text uses context only in sessions that invoke it.",
        why: [
          "Sai ở chỗ skill chỉ nạp khi được dùng (ý 2). Phiên nào không gọi skill thì không có tiêu chí, trái chữ “every session” (mọi phiên).",
          "Dễ bị cuốn vì tiết kiệm context nghe hợp lý. Nhưng thứ phải luôn áp mà biến thành thứ phải gọi mới có thì mất đúng điều đề đòi."
        ] },
      { k: "C", gist: "Put the triage checklist in <code>CLAUDE.md</code> with a note to follow it only when a developer asks, so the steps are always available.",
        why: [
          "Checklist nhiều bước nằm trong context ở mọi phiên, dù thỉnh thoảng mới dùng (ý 1).",
          "Câu “chỉ làm khi dev yêu cầu” chỉ là lời dặn (ý 4). CLAUDE.md cũng không có lệnh nào để dev chủ động bắt đầu quy trình."
        ] },
      { k: "D", gist: "Make the triage checklist a skill and set <code>disable-model-invocation: true</code> in its SKILL.md frontmatter.",
        why: [
          "Lo thứ hai. Làm skill thì thân checklist chỉ nạp khi chạy, phiên thường không tốn gì (ý 2).",
          "<code>disable-model-invocation: true</code> chặn Claude tự gọi, nên checklist chỉ chạy khi dev gõ <code>/tên</code> (ý 3). Đúng chữ “deliberately starts it” (chủ động bắt đầu)."
        ] }
    ],
    refs: [
      { label: "Bài 3.2, mục “Skill hay CLAUDE.md?”: CLAUDE.md luôn nạp, skill gọi theo việc", href: NOTES + "#l-3-2" },
      { label: "Docs Skills, mục Control who invokes a skill: bảng disable-model-invocation, ai gọi được và cái gì nạp vào context", href: "https://code.claude.com/docs/en/skills" }
    ]
  },
  {
    de: 9, n: 38, total: 60, sub: "3.5", subName: "Tinh chỉnh lặp: ví dụ input/output, test trước, interview", scen: "S5",
    answer: "B",
    ask: "To design a new test-generation stage, a developer wants Claude to interview them about edge cases and tradeoffs before it writes a spec. To spare the main context, the developer hands the interview to a subagent spawned through the Agent tool. The subagent writes the spec without asking a single question. What is the fix?",
    scene: [
      "Dev muốn thiết kế một bước sinh test mới, và muốn Claude phỏng vấn mình về edge case, đánh đổi trước khi viết spec.",
      "Để đỡ tốn context phiên chính, dev giao cuộc phỏng vấn cho một subagent tạo qua tool Agent.",
      "Subagent viết luôn spec mà không hỏi câu nào.",
      "Chỗ khó: lý do giao cho subagent (giữ context gọn) nghe rất hợp lý. Nhưng phỏng vấn cần một đường nói chuyện thẳng với người."
    ],
    asks: [
      "Sửa thế nào?",
      "Tức là: biết vì sao subagent không hỏi được, rồi đặt cuộc phỏng vấn vào chỗ hỏi được người.",
      "Soi từng phương án: sau khi đổi, câu hỏi của Claude có tới tay dev và chờ dev trả lời không?"
    ],
    facts: [
      "Interview pattern: bảo Claude hỏi mày trước khi code hay viết spec, để lộ ra các quyết định mày chưa nghĩ tới. Docs Best practices: phỏng vấn tới khi đủ để viết spec, ghi ra <code>SPEC.md</code>, rồi mở phiên mới để làm từ spec đó.",
      "Claude hỏi người qua tool có sẵn <code>AskUserQuestion</code>: hiện câu hỏi trắc nghiệm cho người chọn, rồi trả câu trả lời về cho Claude.",
      "Docs ghi: <code>AskUserQuestion</code> hiện chưa dùng được trong subagent tạo qua tool Agent.",
      "Subagent trả kết quả về cho agent chính, không nói chuyện thẳng với người. Plan mode thì lo chuyện chặn sửa file, không đổi tool của subagent."
    ],
    opts: [
      { k: "A", gist: "Add <code>AskUserQuestion</code> to the subagent's allowed tools so it can present its questions.",
        why: [
          "Sai ở giả định: subagent tạo qua tool Agent chưa dùng được <code>AskUserQuestion</code> (ý 3). Cấp quyền cũng không làm có thứ nền tảng chưa hỗ trợ.",
          "Dễ bị cuốn vì đây đúng là cách sửa trong ca khác: agent chính khai mảng <code>tools</code> mà quên <code>AskUserQuestion</code>. Ở subagent thì không phải chuyện thiếu tên trong danh sách."
        ] },
      { k: "B", gist: "Run the interview in the main conversation, where Claude can put its questions to the developer directly.",
        why: [
          "Phiên chính có đường thẳng tới dev, nên <code>AskUserQuestion</code> dùng được và câu hỏi tới tay người (ý 2).",
          "Nỗi lo context giải bằng nửa sau của interview pattern: chốt xong thì ghi spec ra file, mở phiên mới để làm (ý 1)."
        ] },
      { k: "C", gist: "Start the session with <code>claude --permission-mode plan</code> so Claude researches before proposing changes.",
        why: [
          "Plan mode lo chuyện nghiên cứu trước, chặn sửa file (ý 4). Nó không cho subagent thêm đường nào để hỏi người.",
          "Subagent vẫn viết spec mà không hỏi được ai."
        ] },
      { k: "D", gist: "Add an instruction to the subagent's prompt requiring clarifying questions before any spec gets written.",
        why: [
          "Lời dặn không tạo ra tool còn thiếu (ý 3).",
          "Có dặn thì câu hỏi cũng chỉ nằm trong kết quả gửi về agent chính (ý 4). Subagent không dừng lại chờ dev trả lời được."
        ] }
    ],
    refs: [
      { label: "Bài 3.5: interview pattern, để Claude hỏi lại trước khi code", href: NOTES + "#l-3-5" },
      { label: "Docs Agent SDK “Handle approvals and user input”, mục Limitations: AskUserQuestion chưa dùng được trong subagent tạo qua tool Agent", href: "https://code.claude.com/docs/en/agent-sdk/user-input" },
      { label: "Docs Best practices: phỏng vấn tới khi viết được spec, ghi SPEC.md, mở phiên mới để làm", href: "https://code.claude.com/docs/en/best-practices" }
    ]
  },
  {
    de: 9, n: 39, total: 60, sub: "3.2", subName: "Slash command và skill", scen: "S5",
    answer: "AD",
    ask: "A developer improved a test-generation skill in a personal copy under <code>~/.claude/skills/</code>. The CI pipeline runs Claude Code on a clean checkout of the repository and needs that improvement. The personal copy must run only when the developer invokes it manually. Which two actions achieve this? (Select TWO.)",
    scene: [
      "Dev cải tiến skill sinh test trong bản cá nhân ở <code>~/.claude/skills/</code>.",
      "Pipeline CI chạy Claude Code trên một bản checkout sạch của repo, và cần bản cải tiến đó.",
      "Bản cá nhân chỉ được chạy khi chính dev gọi tay.",
      "Chỗ khó: hai đòi hỏi khác loại. Một là chuyện file nằm ở đâu thì CI thấy. Một là chuyện ai được gọi skill. Mỗi lựa chọn lo một việc."
    ],
    asks: [
      "Hai việc nào đạt cả hai yêu cầu?",
      "Tức là: đưa bản cải tiến vào chỗ CI đọc được, và chặn Claude tự gọi bản cá nhân.",
      "Soi từng phương án: nó lo vế nào? Với trường frontmatter, nó chặn đường gọi nào: người gõ lệnh hay Claude tự gọi?"
    ],
    facts: [
      "Skill cá nhân ở <code>~/.claude/skills/</code> dùng được ở mọi project, nhưng chỉ trên máy đó. Skill project ở <code>.claude/skills/</code> trong repo, commit thì ai có repo cũng có. Runner CI là một máy khác, chỉ có những gì nằm trong repo.",
      "Mặc định skill chạy theo hai đường: người gõ <code>/tên</code>, hoặc Claude tự gọi khi mô tả khớp việc đang làm.",
      "<code>disable-model-invocation: true</code>: Claude không tự gọi được, chỉ người gõ lệnh.",
      "<code>user-invocable: false</code> làm ngược lại: giấu skill khỏi menu <code>/</code>, gõ <code>/tên</code> cũng không chạy, chỉ Claude tự gọi."
    ],
    opts: [
      { k: "A", gist: "Add <code>disable-model-invocation: true</code> to the personal copy's SKILL.md frontmatter.",
        why: [
          "Lo vế gọi tay. Trường này bỏ đường Claude tự gọi (ý 3), nên bản cá nhân chỉ chạy khi dev gõ lệnh.",
          "Hợp với một bản còn đang thử nghiệm: không lo Claude tự chạy nó giữa chừng."
        ] },
      { k: "B", gist: "Keep the improved skill only in <code>~/.claude/skills/</code>, since personal skills load in all of the developer's projects.",
        why: [
          "“Mọi project” là thật, nhưng chỉ trên máy của dev (ý 1). Runner CI checkout repo sạch, không bao giờ đọc thư mục home của dev.",
          "Dễ bị cuốn vì “loads in all projects” (nạp ở mọi project) nghe như đi khắp nơi. Nhưng nó vẫn nằm yên trên một máy."
        ] },
      { k: "C", gist: "Set <code>user-invocable: false</code> in the personal copy's SKILL.md frontmatter.",
        why: [
          "Ngược yêu cầu: trường này bỏ đường gõ lệnh, chỉ để Claude tự gọi (ý 4).",
          "Dev không gọi tay được nữa, còn Claude thì vẫn tự chạy bản thử nghiệm.",
          "Dễ bị cuốn vì “invocable” (gọi được) nghe đúng chủ đề. Nhưng <code>user-invocable</code> nói về người gọi, và đặt <code>false</code> là cấm người gọi."
        ] },
      { k: "D", gist: "Commit the improved instructions as a project skill in the repository's <code>.claude/skills/</code> directory.",
        why: [
          "Lo vế CI. Skill project nằm trong repo và đi theo git, nên checkout nào cũng có (ý 1).",
          "Đây là đường duy nhất để bản cải tiến tới được runner CI.",
          "Lưu ý: nếu bản cá nhân và bản project trùng tên thì trên máy dev, bản cá nhân thắng (personal &gt; project). CI không có bản cá nhân nên chạy bản project."
        ] }
    ],
    refs: [
      { label: "Bài 3.2: skill project đi theo git, skill trong ~/.claude/ là của riêng mày; disable-model-invocation", href: NOTES + "#l-3-2" },
      { label: "Bài 3.2, mục “Biết thêm”: trùng tên thì enterprise > personal > project", href: NOTES + "#fix-4" },
      { label: "Docs Skills: chỗ đặt skill personal và project; bảng disable-model-invocation và user-invocable", href: "https://code.claude.com/docs/en/skills" }
    ]
  },
  {
    de: 9, n: 40, total: 60, sub: "3.1", subName: "Cấp của CLAUDE.md và chia sẻ cho team", scen: "S5",
    answer: "C",
    ask: "A developer is trying out stricter severity rules for the review prompt. The rules must load only for this developer and only in this repository, never for teammates and never in other projects. Where should the rules go?",
    scene: [
      "Một dev đang thử bộ quy tắc chấm mức nghiêm trọng (severity) chặt hơn cho prompt review.",
      "Ràng buộc có hai chiều: chỉ dev này (không tới teammate), và chỉ repo này (không tới project khác).",
      "Chỗ khó: mỗi chỗ đặt sai thường đúng được một chiều. Phải tìm chỗ khớp cả “ai thấy” lẫn “project nào”."
    ],
    asks: [
      "Nên đặt quy tắc ở đâu?",
      "Tức là: file chỉ dẫn nào có phạm vi “riêng mình, riêng project này”.",
      "Soi từng phương án theo hai chiều: ai thấy file đó, và nó nạp ở những project nào? Thêm một câu: nó có phải là file chỉ dẫn không?"
    ],
    facts: [
      "Phạm vi do vị trí file quyết định. <code>~/.claude/CLAUDE.md</code>: chỉ mày, mọi project trên máy. <code>./CLAUDE.md</code>: cả team qua git. <code>./CLAUDE.local.md</code>: chỉ mày, chỉ project này. Docs dặn thêm nó vào <code>.gitignore</code>.",
      "CLAUDE.md đã commit thì nạp toàn bộ cho mọi người clone repo. Heading chỉ là chữ cho người đọc, không giới hạn được ai nhận.",
      "<code>settings.json</code> và <code>settings.local.json</code> là cấu hình JSON (quyền tool, hook) do chương trình Claude Code thi hành, không vào context. Chỉ dẫn bằng lời cho Claude thì nằm ở CLAUDE.md, rule, skill."
    ],
    opts: [
      { k: "A", gist: "In the project <code>CLAUDE.md</code>, under a heading with the developer's name so teammates skip it.",
        why: [
          "Sai chiều “ai thấy”: CLAUDE.md của project nạp cho mọi người clone repo (ý 1, ý 2).",
          "Heading không chặn được gì. Phiên của teammate vẫn nạp quy tắc thử nghiệm."
        ] },
      { k: "B", gist: "In <code>.claude/settings.local.json</code>, which Claude Code keeps out of version control.",
        why: [
          "Đúng cả hai chiều về phạm vi, nhưng sai loại file: đây là cấu hình JSON cho quyền và hook, không phải chỗ để chỉ dẫn (ý 3).",
          "Quy tắc chấm severity là lời dặn cho Claude, phải nằm trong file chỉ dẫn mới vào được context.",
          "Dễ bị cuốn vì có chữ “local” và không vào git, khớp đúng phạm vi đề đòi. Nhưng phạm vi đúng mà file sai loại thì Claude vẫn không đọc thấy quy tắc."
        ] },
      { k: "C", gist: "In a <code>CLAUDE.local.md</code> file at the project root, listed in <code>.gitignore</code>.",
        why: [
          "Khớp cả hai chiều: chỉ dev này, chỉ repo này (ý 1).",
          "Nó là file chỉ dẫn, nạp cùng CLAUDE.md của project. Thêm vào <code>.gitignore</code> thì không lọt vào git, teammate không bao giờ nhận."
        ] },
      { k: "D", gist: "In <code>~/.claude/CLAUDE.md</code>, where personal instructions never reach teammates.",
        why: [
          "Đúng chiều “ai thấy”: file trong home không đi theo git.",
          "Sai chiều “project nào”: file cấp user nạp ở mọi project trên máy (ý 1). Quy tắc thử nghiệm sẽ lan sang các repo không liên quan.",
          "Dễ bị cuốn vì “personal” (riêng mình) là nửa đầu của yêu cầu. Nhưng đề còn đòi “only in this repository” (chỉ repo này)."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D3, mục “Phạm vi: file nằm ở đâu thì ai thấy”: user, project, local", href: NOTES + "#l-3-0" },
      { label: "Bài 3.1: thứ của riêng mày áp cho repo này thì để CLAUDE.local.md", href: NOTES + "#l-3-1" },
      { label: "Docs “How Claude remembers your project”: bảng scope, CLAUDE.local.md thêm vào .gitignore", href: "https://code.claude.com/docs/en/memory" }
    ]
  },
  {
    de: 9, n: 41, total: 60, sub: "3.5", subName: "Tinh chỉnh lặp: ví dụ input/output, test trước, interview", scen: "S5",
    answer: "CD",
    ask: "In the CI pipeline, Claude Code is asked to fix failing tests. Two problems keep showing up: Claude often stops after a single attempt, and some recent fixes hardcoded values that only match the test inputs. Which two prompt changes address these problems? (Choose two.)",
    scene: [
      "Pipeline CI giao cho Claude Code sửa các test đang fail.",
      "Lỗi 1: Claude hay dừng sau một lần sửa, chưa biết bản sửa đã đúng hay chưa.",
      "Lỗi 2: vài bản sửa gần đây “hardcoded values” (gắn cứng giá trị) khớp đúng input của test. Ví dụ minh họa:<pre><code>function tax(amount) {\n  if (amount === 100) return 8;  // khớp đúng ca test\n  return 0;\n}</code></pre>",
      "Chỗ khó: hai lỗi khác loại nhau. Một cái là thiếu vòng tự kiểm, một cái là hiểu sai vai trò của test. Không phương án nào lo được cả hai, nên đề bắt chọn hai."
    ],
    asks: [
      "Hai thay đổi nào trong prompt xử lý được hai lỗi này?",
      "Tức là: một thay đổi để Claude tự chạy test và sửa tiếp tới khi xanh, một thay đổi để Claude viết lời giải tổng quát thay vì đi khớp input của test.",
      "Soi từng phương án: nó lo lỗi nào, và có lấy mất thứ Claude cần để sửa không?"
    ],
    facts: [
      "Docs Claude Code: Claude dừng khi việc “looks done” (trông như xong). Không có gì để chạy mà biết đạt hay chưa thì nó chỉ dựa vào cảm giác đó. Có một thứ chạy được, trả về pass hoặc fail (file test, exit code của build, linter), thì nó tự sửa, chạy lại, đọc output lỗi, sửa tiếp.",
      "Cách nhẹ nhất là ghi thẳng vào prompt. Docs có ví dụ: “run the auth tests after, and keep going until they pass” (sửa xong thì chạy test auth, và làm tiếp tới khi qua).",
      "Docs prompting ghi Claude có lúc “focus too heavily on making tests pass” (quá chú tâm cho test chạy qua). Cách chữa: xin lời giải “works correctly for all valid inputs, not just the test cases” (đúng với mọi input hợp lệ, không chỉ các ca test), và nói rõ “Tests are there to verify correctness, not to define the solution” (test để kiểm lời giải, không phải để định nghĩa lời giải).",
      "Docs có ví dụ prompt “write a failing test that reproduces it, then fix it” (viết test fail tái hiện lỗi, rồi mới sửa) cho ca mới chỉ có triệu chứng do người dùng báo, chưa có test nào bắt lỗi đó."
    ],
    opts: [
      { k: "A", gist: "Keep the test files out of Claude's context so it cannot see the expected values and hardcode them into the fix.",
        why: [
          "Sai chỗ sửa: Claude cần đọc test fail và output lỗi mới biết sửa gì (ý 1). Giấu test là bỏ đúng thứ nó dùng để chẩn đoán.",
          "Lỗi dừng sau một lần vẫn còn nguyên. Không thấy test thì càng không có gì để chạy lại mà kiểm.",
          "Dễ bị cuốn vì nghe như cắt tận gốc chuyện gắn cứng: không thấy giá trị thì không chép được. Nhưng cách chữa docs đưa ra là nói rõ vai trò của test (ý 3), không phải giấu test đi."
        ] },
      { k: "B", gist: "Have Claude first write a new failing test that reproduces each bug, and only then attempt a fix.",
        why: [
          "Cách này hợp khi mới có triệu chứng mà chưa có test (ý 4). Ở đây test fail đã có sẵn và đã tái hiện từng lỗi, nên bước này thừa.",
          "Không lo lỗi nào: không bảo Claude chạy lại và sửa tiếp, cũng không ngăn nó gắn cứng theo input của test, kể cả test nó vừa viết thêm.",
          "Dễ bị cuốn vì “viết test trước” là từ khóa quen của bài 3.5. Nhưng viết test trước là để định nghĩa “xong”. Pipeline này đã có định nghĩa đó rồi."
        ] },
      { k: "C", gist: "Tell Claude to implement a general solution that works for all valid inputs, treating the tests as verification rather than as the definition of the task.",
        why: [
          "Lo lỗi 2. Đúng cách docs chỉ: xin lời giải cho mọi input hợp lệ, test chỉ để kiểm (ý 3).",
          "Claude hiểu input trong test chỉ là mẫu của một quy tắc chung, nên viết logic thật thay vì một nhánh <code>if</code> cho từng ca."
        ] },
      { k: "D", gist: "Give Claude the exact test command as a check it can run, and tell it to run that check and keep iterating until the suite passes.",
        why: [
          "Lo lỗi 1. Có lệnh test chạy được, Claude tự kiểm sau mỗi lần sửa: fail thì đọc lỗi, sửa tiếp, chạy lại (ý 1).",
          "Câu “keep going until they pass” (làm tiếp tới khi qua) trong prompt là đúng cách docs đưa ra (ý 2). Claude không còn dừng ở bản sửa đầu tiên trông có vẻ xong."
        ] }
    ],
    refs: [
      { label: "Bài 3.5, mục “Chuyện gì đang xảy ra”: test-driven iteration, đưa test fail cho Claude sửa tới khi xanh", href: NOTES + "#l-3-5" },
      { label: "Docs Best practices for Claude Code, mục “Give Claude a check to run”: cho Claude thứ chạy được, trả pass hoặc fail", href: "https://code.claude.com/docs/en/best-practices" },
      { label: "Docs Prompting best practices, mục “Avoid focusing on passing tests and hardcoding”: xin lời giải tổng quát, test chỉ để kiểm", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
    ]
  },
  {
    de: 9, n: 42, total: 60, sub: "3.4", subName: "Plan mode hay làm thẳng", scen: "S5",
    answer: "B",
    ask: "A developer used plan mode for a large refactor that the pipeline flagged. After a long exploration, Claude's proposed plan is correct except for one step, which edits a frozen module. How should the developer correct the plan and move forward?",
    scene: [
      "Pipeline gắn cờ một chỗ cần refactor lớn. Dev bật plan mode, Claude khám phá codebase rất lâu rồi trình kế hoạch.",
      "Kế hoạch đúng hết, trừ một bước: bước đó sửa một module đang “frozen” (đóng băng, không được đụng).",
      "Chỗ khó: phần tốn công nhất (khám phá, khung kế hoạch) đã xong và đúng. Cần sửa đúng một bước mà không vứt phần còn lại, và không để bước sai kịp chạy."
    ],
    asks: [
      "Dev nên sửa kế hoạch và đi tiếp thế nào?",
      "Tức là: sửa bước sai ngay lúc nó còn là chữ trên kế hoạch, trước khi Claude được phép sửa file.",
      "Soi từng phương án: bước sai có được sửa trước khi duyệt không? Phần khám phá đã làm có giữ được không?"
    ],
    facts: [
      "Plan mode: Claude đọc, tìm hiểu, viết kế hoạch, nhưng không sửa file cho tới khi dev duyệt. Nó tồn tại để dev thấy quyết định trước khi trả giá cho nó: đọc kế hoạch, sửa kế hoạch.",
      "Claude trình kế hoạch xong thì hỏi: “Yes, and use auto mode” (duyệt, chạy auto mode), “Yes, manually approve edits” (duyệt, tự xem từng edit), hay “No, keep planning” (ở lại plan mode và nói Claude cần đổi gì).",
      "Duyệt là ra khỏi plan mode ngay. Phiên chuyển sang mode đã chọn và Claude bắt đầu sửa.",
      "Hook <code>PreToolUse</code> chặn tool call chắc chắn, bằng code. CLAUDE.md là chỉ dẫn nạp vào mọi phiên, hợp với quy ước dùng lâu dài."
    ],
    opts: [
      { k: "A", gist: "Add a <code>PreToolUse</code> hook that denies edits to the frozen module's path, then approve the plan unchanged.",
        why: [
          "Hook chặn được edit thật (ý 4), nên module không bị sửa. Chạy được, nhưng bước sai vẫn nằm trong kế hoạch.",
          "Duyệt xong Claude bắt đầu sửa (ý 3). Tới bước đó thì bị chặn giữa chừng và phải tự xoay cách khác, một cách dev chưa hề xem.",
          "Dễ bị cuốn vì hook là cách chặn chắc chắn, đúng bài. Nhưng đề hỏi sửa kế hoạch. Hook đáng thêm nếu module đóng băng lâu dài, không thay được việc sửa bước sai."
        ] },
      { k: "B", gist: "Reject the plan with feedback that names the frozen module, so Claude revises that step and presents the plan again.",
        why: [
          "Chọn “No, keep planning” (ý 2): phiên vẫn ở plan mode, dev nói rõ module nào không được đụng.",
          "Vẫn là phiên đó nên Claude còn nguyên phần khám phá. Nó chỉ sửa bước sai rồi trình lại, dev duyệt bản đã sửa trước khi có edit nào (ý 1)."
        ] },
      { k: "C", gist: "Write a frozen-module rule into the project <code>CLAUDE.md</code> and start a fresh planning session.",
        why: [
          "Ghi quy ước vào CLAUDE.md có ích về lâu dài (ý 4), nhưng không sửa kế hoạch đang chờ duyệt.",
          "Phiên mới bỏ hết phần khám phá dài và một kế hoạch gần như đúng. Claude phải đi lại từ đầu, tốn đúng phần đắt nhất."
        ] },
      { k: "D", gist: "Approve the plan, then press Escape to stop Claude once it reaches the frozen-module step.",
        why: [
          "Duyệt là ra khỏi plan mode, Claude bắt đầu sửa ngay (ý 3). Giờ an toàn phụ thuộc vào chuyện dev bấm Escape kịp lúc.",
          "Bấm chậm là module đóng băng đã bị sửa. Ngược hẳn mục đích của plan mode: sửa lỗi khi nó còn là chữ, không phải dọn hậu quả (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, mục “Chuyện gì đang xảy ra”: plan mode để đọc và sửa kế hoạch trước khi trả giá cho nó", href: NOTES + "#l-3-4" },
      { label: "Docs “Permission modes”, mục Review and approve a plan: ba lựa chọn khi Claude trình kế hoạch, duyệt là ra khỏi plan mode", href: "https://code.claude.com/docs/en/permission-modes" }
    ]
  },
  {
    de: 9, n: 43, total: 60, sub: "3.2", subName: "Slash command và skill", scen: "S5",
    answer: "D",
    ask: "The team added <code>context: fork</code> to its verbose <code>/generate-tests</code> skill, which removed the noise from the main session. Now the skill asks which module to test, even right after the session discussed that module. What fixes this while keeping the isolation?",
    scene: [
      "Skill <code>/generate-tests</code> nói nhiều, output dài làm rối phiên chính. Team thêm <code>context: fork</code>, phiên chính hết rối.",
      "Lỗi mới: skill hỏi lại “module nào cần test”, kể cả khi phiên vừa bàn đúng module đó.",
      "Chỗ khó: lỗi mới sinh ra từ đúng cái đã sửa lỗi cũ. Phải giữ sự cô lập, mà vẫn đưa được tên module vào skill."
    ],
    asks: [
      "Sửa thế nào mà vẫn giữ cô lập?",
      "Tức là: tên module đi vào subagent bằng đường nào, khi subagent không thấy hội thoại.",
      "Soi từng phương án: nó đưa thông tin (tên module) vào, hay chỉ đổi quyền, đổi loại agent, đổi thời điểm chạy?"
    ],
    facts: [
      "<code>context: fork</code>: Claude Code mở một subagent mới, loại theo trường <code>agent</code>, và đưa nội dung skill làm prompt. Docs: subagent “doesn't see your conversation history” (không thấy lịch sử hội thoại), nên chỉ dẫn của skill phải tự đủ.",
      "Tham số lúc gọi skill đi vào nội dung qua <code>$ARGUMENTS</code> (hoặc <code>$0</code>, hay tên khai trong <code>arguments</code>). Ví dụ minh họa: gõ <code>/generate-tests payments/refund</code> thì <code>$ARGUMENTS</code> trong SKILL.md thành <code>payments/refund</code>.",
      "<code>allowed-tools</code>: các tool Claude dùng không hỏi quyền trong lượt gọi skill. Nó cấp quyền, không cấp thông tin.",
      "<code>background: false</code> chỉ áp khi có <code>context: fork</code>: chờ kết quả subagent ngay trong lượt gọi skill, thay vì để nó chạy nền. Nó đổi thời điểm, không đổi context."
    ],
    opts: [
      { k: "A", gist: "Add Read and Grep to <code>allowed-tools</code> so the forked subagent can open the discussed files without permission prompts.",
        why: [
          "Sai chỗ sửa: <code>allowed-tools</code> lo chuyện quyền (ý 3). Subagent đọc file được, nhưng không biết đọc file nào.",
          "Thiếu là thiếu tên module, không phải thiếu quyền. Skill vẫn hỏi lại."
        ] },
      { k: "B", gist: "Set the <code>agent</code> field to Explore so the subagent gathers the missing context itself before generating tests.",
        why: [
          "Trường <code>agent</code> chỉ chọn loại subagent chạy skill (ý 1). Loại nào thì subagent cũng bắt đầu không có lịch sử hội thoại.",
          "Explore giỏi khám phá codebase, nhưng thứ thiếu nằm trong hội thoại, không nằm trong code. Lục cả repo nó cũng không biết phiên vừa bàn module nào.",
          "Dễ bị cuốn vì notes ghi <code>context: fork</code> hay đi kèm <code>agent: Explore</code>, nghe như cặp chuẩn. Nhưng Explore không tìm ra được thứ chỉ có trong hội thoại."
        ] },
      { k: "C", gist: "Set <code>background: false</code> in the frontmatter so the skill runs within the invoking turn and waits for the result.",
        why: [
          "<code>background: false</code> chỉ đổi thời điểm: phiên chính chờ kết quả thay vì để subagent chạy nền (ý 4).",
          "Subagent vẫn cô lập y như cũ, vẫn không thấy hội thoại (ý 1). Skill vẫn hỏi module nào."
        ] },
      { k: "D", gist: "Pass the target module as an argument when invoking the skill, and write the SKILL.md instructions so they are self-contained.",
        why: [
          "Subagent chỉ biết những gì nằm trong nội dung skill (ý 1). Truyền tên module làm tham số thì <code>$ARGUMENTS</code> đưa nó thẳng vào prompt của subagent (ý 2).",
          "SKILL.md viết tự đủ: mọi thứ subagent cần đều có sẵn trong đó hoặc đi vào qua tham số. Coi skill fork như một hàm có tham số.",
          "Vẫn giữ <code>context: fork</code>, nên output dài vẫn ở lại trong subagent."
        ] }
    ],
    refs: [
      { label: "Bài 3.2: khung “Context cô lập (context: fork)” và mục “Biết thêm”: tham số qua $ARGUMENTS, body skill thành prompt của subagent", href: NOTES + "#l-3-2" },
      { label: "Docs “Skills”, mục Run skills in a subagent: subagent không thấy lịch sử hội thoại; bảng frontmatter có background, agent, allowed-tools", href: "https://code.claude.com/docs/en/skills" }
    ]
  },
  {
    de: 9, n: 44, total: 60, sub: "4.5", subName: "Xử lý theo lô (Batch)", scen: "S5",
    answer: "B",
    ask: "The pipeline's code review blocks every merge, while developers read the nightly test-generation output the next morning. A colleague points out that most batches finish within an hour and suggests moving both workloads to the Message Batches API. What is the correct assignment?",
    scene: [
      "Pipeline có hai việc. Code review chạy trước mỗi lần merge và chặn merge tới khi xong. Sinh test ban đêm thì sáng hôm sau dev mới đọc.",
      "Một đồng nghiệp thấy đa số batch xong trong một giờ, nên đề xuất chuyển cả hai sang Message Batches API cho rẻ.",
      "Chỗ khó: “most batches finish within an hour” (đa số batch xong trong một giờ) là chuyện thường thấy, không phải cam kết. Đề bắt phân biệt hai thứ đó."
    ],
    asks: [
      "Mỗi việc nên chạy bằng API nào?",
      "Tức là: việc nào chịu được trễ tới 24 giờ, việc nào có người đang ngồi chờ.",
      "Soi từng phương án: review có còn phải chờ một thứ không có cam kết thời gian không? Việc ban đêm có được giảm giá không?"
    ],
    facts: [
      "Message Batches API rẻ hơn 50%. Đổi lại, một batch có thể mất tới 24 giờ và không có SLA (cam kết thời gian xử lý). Đa số xong trong một giờ, nhưng “đa số” không phải cam kết.",
      "Docs: kết quả lấy được khi mọi request trong batch đã xong, hoặc sau 24 giờ, tùy cái nào tới trước. Không lấy sớm từng kết quả lẻ được.",
      "Batch hợp với việc không ai đang chờ: báo cáo đêm, sinh test ban đêm. Việc đang chặn người, như review trước merge, giữ gọi Messages API thường (đồng bộ).",
      "Streaming (<code>stream: true</code>) gửi câu trả lời từng phần trong cùng một request đồng bộ. Nó đổi cách nhận kết quả. Mức giảm 50% là của Batch, và Batch không nhận <code>stream: true</code>."
    ],
    opts: [
      { k: "A", gist: "Keep both workloads on the synchronous Messages API and turn on streaming for the nightly job to lower its cost.",
        why: [
          "Sai ở giả định: streaming chỉ đổi cách nhận kết quả (ý 4). Mức giảm giá nằm ở Batch (ý 1), không nằm ở streaming.",
          "Việc ban đêm lại đúng là việc hợp với batch (ý 3). Giữ nó ở gọi thường là bỏ mất 50% giảm giá."
        ] },
      { k: "B", gist: "Move only the nightly test generation to the Message Batches API and keep the merge review on the synchronous Messages API.",
        why: [
          "Review chặn merge, có người đang chờ, nên giữ gọi thường (ý 3). Batch không có SLA, xấu nhất 24 giờ (ý 1), không làm cổng chặn merge được.",
          "Sinh test ban đêm thì sáng mới đọc, chờ 24 giờ vẫn kịp. Chuyển sang batch là được giảm 50% mà không ai phải chờ."
        ] },
      { k: "C", gist: "Move both workloads to batches, and fall back to a synchronous call for any review batch that has not ended after ten minutes.",
        why: [
          "Review chậm nào cũng phải chờ hết mười phút rồi mới bắt đầu gọi thường. Cổng merge chậm đi đúng ở ca xấu.",
          "Batch đó sau vẫn chạy xong, nên ca chậm trả tiền hai lần: lượt batch và lượt gọi thường.",
          "Dễ bị cuốn vì nghe như vừa rẻ vừa có lưới an toàn. Nhưng notes xếp kiểu “batch kèm fallback khi quá lâu” vào cột Tệ: phức tạp vô ích. Việc có người chờ thì gọi thường luôn."
        ] },
      { k: "D", gist: "Move both workloads to batches and have the pipeline poll each review batch so merges go ahead as soon as results arrive.",
        why: [
          "Poll chỉ là hỏi lại xem batch xong chưa. Nó không làm batch xong nhanh hơn.",
          "Kết quả chỉ lấy được khi cả batch xong (ý 2), mà batch có thể mất tới 24 giờ (ý 1). Gặp batch chậm là dev ngồi chờ hàng giờ, merge bị kẹt.",
          "Dễ bị cuốn vì lời đồng nghiệp có số liệu hẳn hoi: đa số xong dưới một giờ. Nhưng cổng chặn merge phải dựa vào cam kết, không dựa vào chuyện thường thấy."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Chuyện gì đang xảy ra”: Batch tối đa 24 giờ, không SLA; pre-merge giữ realtime, báo cáo đêm sang Batch", href: NOTES + "#l-4-5" },
      { label: "Cheatsheet D4: dòng “Pre-merge chặn + báo cáo đêm, sếp muốn Batch cả hai”", href: NOTES + "#cheat-d4" },
      { label: "Docs “Batch processing”: kết quả lấy được khi mọi request xong hoặc sau 24 giờ; không hỗ trợ stream: true", href: "https://platform.claude.com/docs/en/build-with-claude/batch-processing" }
    ]
  },
  {
    de: 9, n: 45, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code", scen: "S1",
    answer: "A",
    ask: "The team is adding an internal ticketing MCP server that only the escalation subagent should use. They also want the server's tool descriptions to stay out of the main conversation's context. How should the server be configured?",
    scene: [
      "Team thêm một MCP server ticketing nội bộ (hệ thống phiếu hỗ trợ).",
      "Chỉ subagent escalation (chuyển ca lên người) được dùng server này.",
      "Thêm một yêu cầu: tool description (mô tả tool) của server không được nằm trong context của hội thoại chính.",
      "Chỗ khó: đề đòi hai thứ. Chặn agent chính gọi tool là một chuyện, không để mô tả tool chiếm context của nó là chuyện khác. Có cách lo được thứ nhất mà hỏng thứ hai."
    ],
    asks: [
      "Cấu hình server thế nào?",
      "Tức là: gắn server vào đâu để chỉ subagent escalation kết nối tới, còn phiên chính không kết nối gì cả.",
      "Soi từng phương án theo hai câu: agent chính còn gọi được tool không? Mô tả tool có còn nạp vào hội thoại chính không?"
    ],
    facts: [
      "Server khai trong <code>.mcp.json</code> (project) hay <code>~/.claude.json</code> (local, user) đều kết nối vào phiên chính. Tool của mọi server có sẵn cùng lúc. Docs: server đã kết nối thêm tên tool và chỉ dẫn vào context “even when you're not using them” (kể cả khi không dùng tới).",
      "Định nghĩa subagent có trường <code>mcpServers</code>. Server khai inline ở đó kết nối khi subagent bắt đầu, ngắt khi subagent xong. Docs: muốn giữ server khỏi hội thoại chính, không để mô tả tool chiếm context ở đó, thì khai inline ở đây thay vì trong <code>.mcp.json</code>: “The subagent gets the tools; the parent conversation doesn't.” (subagent có tool, hội thoại cha thì không).",
      "Luật <code>deny</code> trong permissions chặn tool call chắc chắn, bằng code. <code>mcp__ticketing__*</code> khớp mọi tool của server đó. Nhưng chặn gọi không phải là gỡ server khỏi phiên.",
      "CLAUDE.md là chỉ dẫn: Claude làm theo phần lớn thời gian, nhưng nó không cấp hay thu quyền dùng tool."
    ],
    opts: [
      { k: "A", gist: "Declare the ticketing server in the escalation subagent's <code>mcpServers</code> field, so it is connected only while that subagent runs.",
        why: [
          "Server khai inline trong định nghĩa subagent chỉ kết nối khi subagent chạy (ý 2). Phiên chính không kết nối tới, nên không có tool nào để gọi.",
          "Mô tả tool cũng không bao giờ vào hội thoại chính. Một chỗ đặt lo được cả hai yêu cầu."
        ] },
      { k: "B", gist: "Add the server to the project <code>.mcp.json</code> and set a deny rule for <code>mcp__ticketing__*</code> so the main agent cannot call it.",
        why: [
          "Lo được nửa đầu: luật deny chặn agent chính gọi tool, chắc chắn (ý 3).",
          "Hỏng nửa sau: server trong <code>.mcp.json</code> vẫn kết nối vào phiên chính, mô tả tool vẫn nằm trong context (ý 1).",
          "Dễ bị cuốn vì deny là cơ chế chặn bằng code, đúng kiểu “chặn chắc chắn” hay được chấm đúng. Nhưng đề đòi thêm chuyện context, và deny không gỡ server ra khỏi phiên."
        ] },
      { k: "C", gist: "Add the server to the project <code>.mcp.json</code> and state in <code>CLAUDE.md</code> that only the escalation subagent may use the ticketing tools.",
        why: [
          "Hỏng cả hai: CLAUDE.md chỉ là lời dặn (ý 4), agent chính vẫn gọi được tool.",
          "Server vẫn kết nối vào phiên chính, mô tả tool vẫn chiếm context (ý 1)."
        ] },
      { k: "D", gist: "Configure the server in the user-level <code>~/.claude.json</code> instead of <code>.mcp.json</code>, keeping it apart from the team's shared tooling.",
        why: [
          "Sai trục: chọn <code>.mcp.json</code> hay <code>~/.claude.json</code> là chọn ai dùng chung cấu hình (cả team hay một người), không phải agent nào trong phiên thấy tool.",
          "Server cấp user vẫn kết nối vào phiên chính (ý 1). Agent chính vẫn gọi được, mô tả tool vẫn chiếm context. Đồng đội còn mất luôn server."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, mục “Ba phạm vi, hai file”: .mcp.json cho team, ~/.claude.json cho cá nhân; tool của mọi server có sẵn cùng lúc", href: NOTES + "#l-2-4" },
      { label: "Bài 2.3: scoped tool access, mỗi agent chỉ cầm tool đúng vai trò", href: NOTES + "#l-2-3" },
      { label: "Docs “Subagents”, mục Scope MCP servers to a subagent: server khai inline chỉ kết nối khi subagent chạy, hội thoại cha không có tool", href: "https://code.claude.com/docs/en/sub-agents" }
    ]
  },
  {
    de: 9, n: 46, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code", scen: "S1",
    answer: "A",
    ask: "The team wants the agent to track return shipments. Anthropic's connector directory lists an MCP server for the shipping carrier with a Community label. The server would receive customer order data. How should the team proceed?",
    scene: [
      "Team muốn agent theo dõi hàng trả về. Danh mục connector của Anthropic có sẵn MCP server cho hãng vận chuyển, gắn nhãn “Community”.",
      "Server này sẽ nhận dữ liệu đơn hàng của khách.",
      "Chỗ khó: có sẵn server cho tích hợp chuẩn là tin tốt. Nhưng nhãn Community bảo đảm tới đâu, và mức đó đã đủ để giao dữ liệu khách chưa?"
    ],
    asks: [
      "Team nên làm gì?",
      "Tức là: dùng server có sẵn thế nào cho an toàn, khi biết đúng nhãn Community nói gì.",
      "Soi từng phương án: nó hiểu nhãn Community có đúng không? Có tự làm lại thứ đã có sẵn không?"
    ],
    facts: [
      "Docs về nhãn connector: Community là connector do bên thứ ba viết. Anthropic “screens” (sàng lọc) trước khi đưa vào danh mục, nhưng “hasn't reviewed them in depth” (chưa xem xét kỹ). Anthropic không kiểm soát tool của nó, không bảo đảm nó chạy đúng hay không đổi.",
      "Nhãn chỉ ảnh hưởng cách connector hiện trong danh mục. Kết nối rồi thì Community connector có đủ khả năng và quyền như mọi connector mày cấp.",
      "Docs dặn với connector bên thứ ba: chỉ kết nối tới bên mày tin, xem kỹ phạm vi quyền xin lúc xác thực, để ý tool đổi hành vi bất thường. Bên viết connector đổi tool được bất cứ lúc nào.",
      "Notes bài 2.4: tích hợp phổ biến thì dùng community server có sẵn. Chỉ tự viết server cho workflow đặc thù của team."
    ],
    opts: [
      { k: "A", gist: "Review the server's tools and grant only the access the agent needs, since Community servers get basic screening rather than an in-depth review.",
        why: [
          "Hiểu đúng nhãn: Community chỉ qua sàng lọc, chưa được xem kỹ (ý 1). Kết nối rồi thì nó có đủ quyền như connector khác (ý 2), nên phần kiểm kỹ là việc của team.",
          "Xem tool của server, chỉ cấp đúng quyền agent cần: đúng lời dặn của docs (ý 3) và đúng least privilege (cấp ít quyền nhất đủ để làm việc).",
          "Vẫn dùng server có sẵn cho tích hợp chuẩn (ý 4), không phải tự viết."
        ] },
      { k: "B", gist: "Connect it with the same access as the team's own MCP tools, since a directory listing means Anthropic fully reviewed and operates the connector.",
        why: [
          "Sai ở giả định: được liệt kê không có nghĩa là đã xem kỹ (ý 1). Anthropic cũng không vận hành server của bên thứ ba.",
          "Hậu quả: một server chưa ai trong team kiểm được cấp quyền như tool nhà làm, rồi nhận dữ liệu đơn hàng của khách.",
          "Dễ bị cuốn vì nằm trong danh mục của Anthropic nghe như đã được bảo chứng. Nhưng xem kỹ hơn là mức của nhãn Verified, và docs ghi cả Verified cũng không phải một bản audit bảo mật."
        ] },
      { k: "C", gist: "Fork the server's code and run the team's own copy, so every future update passes through the team's internal code review.",
        why: [
          "Chạy được, nhưng biến một tích hợp có người bảo trì thành codebase riêng team phải tự giữ cho khớp. Bản sửa từ upstream (bản gốc) không tự về nữa.",
          "Cái đề cần là kiểm tool và giới hạn quyền (ý 3), làm ngay trên server có sẵn được. Không cần ôm thêm việc bảo trì."
        ] },
      { k: "D", gist: "Build an in-house MCP server for the carrier API instead, so the team controls every piece of customer data the integration touches.",
        why: [
          "Ngược với notes: tích hợp chuẩn thì dùng server có sẵn, tự viết chỉ dành cho workflow đặc thù (ý 4). Theo dõi hàng của một hãng vận chuyển là tích hợp chuẩn.",
          "Tốn công viết và bảo trì, trong khi nỗi lo dữ liệu xử lý được bằng cách kiểm tool và giới hạn quyền (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, cuối mục “Resource”: tích hợp phổ biến dùng community server, chỉ tự viết server cho workflow đặc thù", href: NOTES + "#l-2-4" },
      { label: "Docs “Connector verification”: nhãn Verified, Community, Custom nghĩa là gì; cách dùng an toàn connector bên thứ ba", href: "https://claude.com/docs/connectors/verification" }
    ]
  },
  {
    de: 9, n: 47, total: 60, sub: "5.3", subName: "Báo lỗi giữa các agent", scen: "S1",
    answer: "B",
    ask: "The coordinator delegates billing investigations to a subagent. When <code>lookup_order</code> times out partway through, the subagent's final message only says that it failed, so the coordinator cannot decide between retrying and escalating. Escalation summaries must combine findings from every subtask, and only the coordinator sees all of them. How should these failures be reported?",
    scene: [
      "Coordinator giao việc điều tra billing (thanh toán) cho một subagent.",
      "Giữa chừng <code>lookup_order</code> bị timeout. Message cuối của subagent chỉ nói “failed” (thất bại), nên coordinator không biết nên thử lại hay chuyển lên người.",
      "Thêm ràng buộc: bản tóm tắt khi escalate (chuyển lên người) phải gộp phát hiện của mọi việc con, và chỉ coordinator thấy đủ các phát hiện đó.",
      "Chỗ khó: có phương án nghe như “nhìn sâu hơn” hay “ghi log kỹ hơn”. Phải hỏi: thông tin đó có tới được chỗ coordinator ra quyết định không?"
    ],
    asks: [
      "Lỗi này nên báo lên thế nào?",
      "Tức là: đưa đủ thông tin về lỗi tới coordinator, qua đúng kênh nó đọc được, để nó tự chọn thử lại hay escalate.",
      "Soi từng phương án: thông tin lỗi đi tới đâu (coordinator, kỹ sư, hay không đâu cả)? Quyết định có còn nằm ở chỗ thấy đủ phát hiện không?"
    ],
    facts: [
      "Docs Agent SDK: subagent (không phải fork) chạy trong hội thoại riêng. Tool call và kết quả trung gian ở lại trong subagent; “only its final message returns to the parent” (chỉ message cuối quay về cha).",
      "Structured error context: lỗi báo lên có trường cố định, gồm loại lỗi, query đã thử, partial results (phần kết quả đã lấy được), hướng thay thế. Chuỗi chung chung như “failed” giấu mất thứ coordinator cần để chọn cách cứu.",
      "Timeout là transient error (lỗi tạm thời), thử lại thường được. Coordinator chỉ phân biệt được lỗi tạm thời với ngõ cụt khi biết loại lỗi.",
      "Hook <code>SubagentStop</code> chạy khi subagent xong, nhận <code>agent_id</code> và đường dẫn transcript của subagent. Nó là code của mày chạy bên ngoài model, hợp với ghi log, theo dõi."
    ],
    opts: [
      { k: "A", gist: "Have the coordinator inspect the subagent's intermediate <code>tool_result</code> blocks in its conversation history to find which backend call failed and why.",
        why: [
          "Sai ở giả định: tool call và kết quả trung gian của subagent không bao giờ vào hội thoại của coordinator (ý 1). Không có block nào để soi.",
          "Coordinator chỉ có message cuối, mà message đó chỉ ghi “failed”. Vẫn kẹt y như cũ."
        ] },
      { k: "B", gist: "Instruct the subagent to put structured failure details in its final message: the failure type, the attempted query, and partial results the coordinator can use to choose a recovery action.",
        why: [
          "Dùng đúng kênh duy nhất coordinator thấy: message cuối (ý 1). Lỗi giờ tới nơi đủ loại lỗi, query đã thử, phần kết quả đã có (ý 2).",
          "Thấy “timeout” thì coordinator biết đây là lỗi tạm thời, thử lại được (ý 3). Phần kết quả đã có cũng không bị vứt.",
          "Quyết định thử lại hay escalate vẫn nằm ở coordinator, chỗ duy nhất thấy phát hiện của mọi việc con. Bản tóm tắt escalate vì vậy đủ."
        ] },
      { k: "C", gist: "Register a <code>SubagentStop</code> hook that records each failure and the subagent's transcript path, giving engineers a durable log of every failed investigation.",
        why: [
          "Hook này ghi log tốt (ý 4), nhưng log đó tới kỹ sư và hệ thống giám sát. Nó không thêm gì vào message coordinator nhận.",
          "Lúc đang chạy, coordinator vẫn chỉ có chữ “failed”, vẫn không chọn được cách cứu.",
          "Dễ bị cuốn vì hook nghe như cách chắc chắn, lại giữ được cả transcript. Nhưng đề hỏi coordinator quyết định thế nào lúc chạy, không hỏi lưu vết cho người xem sau."
        ] },
      { k: "D", gist: "Add <code>escalate_to_human</code> to the subagent's allowed tools so it hands failed investigations to a human itself, removing a coordinator round trip.",
        why: [
          "Trái ràng buộc của đề: bản tóm tắt escalate phải gộp phát hiện của mọi việc con, mà subagent chỉ thấy phần của nó.",
          "Người nhận một bản tóm tắt thiếu. Coordinator cũng mất quyền chọn thử lại, nên một timeout tạm thời (ý 3) cũng bị đẩy lên người."
        ] }
    ],
    refs: [
      { label: "Bài 5.3, mục “Chuyện gì đang xảy ra”: structured error context, ví dụ object partial_failure", href: NOTES + "#l-5-3" },
      { label: "Bài 1.2: subagent có context cô lập, coordinator chỉ biết những gì được báo lên", href: NOTES + "#l-1-2" },
      { label: "Docs “Subagents in the SDK”, mục Benefits: kết quả trung gian ở lại trong subagent, chỉ message cuối về cha", href: "https://code.claude.com/docs/en/agent-sdk/subagents" }
    ]
  },
  {
    de: 9, n: 48, total: 60, sub: "1.6", subName: "Chia việc lớn", scen: "S1",
    answer: "D",
    ask: "Standard returns always need the same four checks in the same order, whereas in billing disputes each next lookup depends on the previous tool result. A single dynamic loop currently handles both and sometimes skips a return check. Auditors also require each return check to run as a separate step whose output is logged and evaluated before the next check starts. How should the team structure these flows?",
    scene: [
      "Hai loại ca. Trả hàng thường: luôn bốn bước kiểm, luôn cùng thứ tự. Tranh chấp billing: lượt tra sau tùy vào kết quả tool lượt trước.",
      "Hiện một vòng lặp động (model tự chọn bước) lo cả hai, và thỉnh thoảng bỏ sót một bước kiểm trả hàng.",
      "Kiểm toán đòi thêm: mỗi bước kiểm trả hàng phải là một bước riêng, output được ghi log và đánh giá xong thì bước sau mới chạy.",
      "Chỗ khó: có phương án sửa được chuyện bỏ sót mà vẫn trượt yêu cầu kiểm toán. Phải đọc cả hai dữ kiện."
    ],
    asks: [
      "Team nên dựng hai luồng này thế nào?",
      "Tức là: luồng biết trước các bước thì dựng thành chuỗi cố định, luồng có bước sau sinh ra từ kết quả thì để model tự chia.",
      "Soi từng phương án theo ba câu: hết bỏ sót không? Mỗi bước kiểm có thành một lần gọi riêng, log được không? Tranh chấp billing còn linh hoạt không?"
    ],
    facts: [
      "Prompt chaining: nhiều lần gọi model với các bước định sẵn trong code, output bước trước thành input bước sau. Hợp với việc biết trước các bước. Bước nào cũng chạy, vì code gọi nó.",
      "Docs prompting: chaining (chia việc thành nhiều lần gọi API nối tiếp) vẫn có ích khi cần “inspect intermediate outputs or enforce a specific pipeline structure” (soi output giữa chừng, hoặc ép đúng cấu trúc pipeline). Mỗi bước là một lần gọi riêng, nên log, đánh giá, rẽ nhánh được ở bất kỳ điểm nào.",
      "Dynamic adaptive decomposition: các bước không biết trước. Agent nhìn kết quả rồi mới quyết bước sau. Hợp với việc mở, như tranh chấp billing.",
      "Lời dặn trong system prompt là xác suất: model làm theo phần lớn thời gian. Hook chặn tool cuối thì chắc chắn, nhưng các bước kiểm vẫn chạy trong cùng một vòng lặp động."
    ],
    opts: [
      { k: "A", gist: "Keep the single dynamic loop for both types and list the four return checks in order in the system prompt so none gets skipped.",
        why: [
          "Lời dặn chỉ là xác suất (ý 4). Vòng lặp động đã có lúc bỏ sót, viết thêm vào prompt vẫn có lúc bỏ sót.",
          "Các bước kiểm vẫn nằm trong một hội thoại thích ứng, không thành bước riêng có log. Trượt yêu cầu kiểm toán."
        ] },
      { k: "B", gist: "Keep the single dynamic loop and add a precondition hook that blocks the final resolution tool until all four return checks have run in order.",
        why: [
          "Hook chặn được thật: thiếu một bước thì không ra quyết định cuối được (ý 4). Chuyện bỏ sót được sửa.",
          "Nhưng bốn bước kiểm vẫn chạy trong một vòng lặp động. Không có lần gọi riêng cho từng bước để log và đánh giá trước khi bước sau chạy (ý 2). Trượt yêu cầu kiểm toán.",
          "Dễ bị cuốn vì hook là cách chặn bằng code, hay được chấm đúng. Nhưng đề có hai dữ kiện, hook chỉ trả lời được một."
        ] },
      { k: "C", gist: "Build one fixed pipeline for both types, writing branches in advance for every billing-dispute pattern the team has seen.",
        why: [
          "Hợp với trả hàng, nhưng hỏng ở tranh chấp billing: lượt tra sau phụ thuộc kết quả lượt trước, không liệt kê trước được (ý 3).",
          "Gặp một ca tranh chấp chưa có nhánh viết sẵn là pipeline gãy. Liệt kê bao nhiêu cũng không đuổi kịp."
        ] },
      { k: "D", gist: "Route standard returns through a fixed sequential chain of the four checks, and keep dynamic decomposition only for billing disputes.",
        why: [
          "Trả hàng biết trước các bước, nên dựng thành chuỗi cố định (ý 1). Bước nào cũng chạy vì code gọi nó, hết bỏ sót.",
          "Mỗi bước kiểm là một lần gọi riêng, output được log và đánh giá trước khi bước sau chạy (ý 2). Đúng yêu cầu kiểm toán.",
          "Tranh chấp billing giữ kiểu model tự chia việc (ý 3), vì bước sau chỉ rõ khi đã thấy kết quả bước trước."
        ] }
    ],
    refs: [
      { label: "Bài 1.6: prompt chaining (bước biết trước) và dynamic adaptive decomposition (bước sinh ra lúc chạy)", href: NOTES + "#l-1-6" },
      { label: "Bài 1.6, mục “Biết thêm” (đã sửa 03/11): bước kiểm bằng code (“gate”) giữa các lần gọi trong prompt chaining", href: NOTES + "#fix-25" },
      { label: "Docs Prompting best practices, đoạn về explicit prompt chaining: tách lần gọi để soi output giữa chừng, log từng bước", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
    ]
  },
  {
    de: 9, n: 49, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S1",
    answer: "A",
    ask: "Yesterday's session investigated a disputed return: it verified the customer and traced the problem to a mis-shipped item. Overnight the warehouse restocked that item and updated shipment statuses, so the saved tool results are now out of date. The team will start a new session instead of resuming. How should they seed the new session?",
    scene: [
      "Hôm qua một phiên điều tra một ca trả hàng bị tranh chấp: đã xác minh khách, đã tìm ra gốc lỗi là giao nhầm hàng.",
      "Qua đêm kho nhập lại món đó và cập nhật trạng thái giao hàng. Kết quả tool lưu trong phiên cũ đã lỗi thời.",
      "Team đã chọn mở phiên mới chứ không resume. Câu hỏi chỉ còn: đưa gì vào phiên mới.",
      "Chỗ khó: phiên cũ có hai loại thứ. Kết luận (khách đã xác minh, gốc lỗi) vẫn đúng. Dữ liệu tool (tồn kho, trạng thái giao) đã cũ. Phải giữ cái này, bỏ cái kia."
    ],
    asks: [
      "Mở đầu phiên mới thế nào?",
      "Tức là: mang sang những kết luận còn đúng, và để agent tự lấy lại dữ liệu đã đổi.",
      "Soi từng phương án: có kéo theo kết quả tool cũ không? Có vứt mất kết luận đã có không? Có đặt dữ liệu của một ca vào chỗ nạp cho mọi phiên không?"
    ],
    facts: [
      "Resume nạp lại toàn bộ lịch sử phiên, gồm cả kết quả tool. Kết quả tool lỗi thời phản ánh trạng thái cũ, và agent không biết nó đã cũ, vẫn tin là đúng.",
      "Guide: khi phần lớn kết quả tool cũ đã lỗi thời, mở phiên mới kèm structured summary (bản tóm tắt có cấu trúc: phát hiện chính, quyết định đã chốt) đáng tin hơn resume.",
      "CLAUDE.md nạp vào mọi phiên, dành cho quy ước dùng lâu dài, không phải dữ liệu của một ca."
    ],
    opts: [
      { k: "A", gist: "Put a structured summary of the case facts, decisions, and identifiers in the first prompt, and let the agent fetch current records itself.",
        why: [
          "Đúng cách 3 của bài 1.7 (ý 2): phiên mới mở bằng bản tóm tắt có cấu trúc.",
          "Mang sang đúng phần còn đúng: khách đã xác minh, gốc lỗi là giao nhầm, các quyết định đã chốt, các mã định danh (mã khách, mã đơn). Không phải điều tra lại.",
          "Dữ liệu tồn kho và trạng thái giao không đi theo. Agent dùng mã định danh gọi tool lấy bản mới, nên suy luận trên dữ liệu hiện tại (ý 1)."
        ] },
      { k: "B", gist: "Provide only the customer ID, so the agent rebuilds the whole case from fresh tool calls with no prior assumptions.",
        why: [
          "Dữ liệu chắc chắn mới, nhưng vứt luôn phần kết luận còn đúng: khách đã xác minh, gốc lỗi đã tìm ra.",
          "Agent phải điều tra lại từ đầu, tốn tool call và chậm xử lý. Thứ đã cũ chỉ là dữ liệu kho và giao hàng, không phải kết luận."
        ] },
      { k: "C", gist: "Write the case facts into the project <code>CLAUDE.md</code> so the new session loads them automatically at startup.",
        why: [
          "Sai chỗ đặt: CLAUDE.md nạp vào mọi phiên (ý 3). Dữ liệu của một khách thành context thường trực, hiện ra cả ở những ca không liên quan.",
          "Dữ liệu một ca thuộc về prompt mở đầu của phiên đó."
        ] },
      { k: "D", gist: "Paste the full transcript of the prior session, with every saved tool result, into the first prompt so no investigation detail is lost.",
        why: [
          "Kết quả tool cũ vào theo transcript, y như resume (ý 1). Tồn kho và trạng thái giao đã đổi qua đêm, nhưng agent vẫn tin bản cũ.",
          "Đúng thứ team mở phiên mới để bỏ lại, giờ lại tự tay đưa vào. Transcript dài còn chiếm chỗ trong context.",
          "Dễ bị cuốn vì “no investigation detail is lost” (không mất chi tiết nào) nghe an toàn. Nhưng ở đây chi tiết cũ chính là thứ gây hại."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Ba cách nối lại công việc”: cách 3, phiên mới kèm bản tóm tắt khi kết quả tool đã lỗi thời", href: NOTES + "#l-1-7" },
      { label: "Cheatsheet D1: dòng “Kết quả tool cũ đã lỗi thời”", href: NOTES + "#cheat-d1" }
    ]
  },
  {
    de: 9, n: 50, total: 60, sub: "1.1", subName: "Vòng lặp agent", scen: "S1",
    answer: "CD",
    ask: "Part of the agent's escalation flow calls the Messages API directly, without the SDK's Tool Runner. Later turns in that flow use <code>lookup_order</code> fields to decide refund eligibility. Which two practices are correct for handling <code>lookup_order</code> results across turns on this path? (Choose two.)",
    scene: [
      "Một phần luồng escalate gọi thẳng Messages API, không qua Tool Runner của SDK.",
      "Các lượt sau trong luồng này cần các trường của <code>lookup_order</code> để quyết khách có được hoàn tiền không.",
      "Chỗ khó: không có Tool Runner thì code của team tự lo phần nối kết quả tool và gửi lại lịch sử. Đề hỏi hai việc đúng khi tự lo phần đó."
    ],
    asks: [
      "Hai cách nào đúng để giữ kết quả <code>lookup_order</code> qua các lượt trên đường này?",
      "Tức là: làm sao cho lượt sau Claude vẫn thấy các trường đơn hàng, và làm vậy mà không tốn token thừa.",
      "Soi từng phương án: nó có dựa vào thứ không có trên đường này không (server nhớ hộ, Tool Runner)?"
    ],
    facts: [
      "Messages API stateless (không có trí nhớ): lần gọi sau không biết lần trước đã nói gì. <code>messages</code> là bộ nhớ duy nhất, mỗi lần gọi code phải gửi lại toàn bộ lịch sử.",
      "<code>tool_use_id</code> trong block <code>tool_result</code> chỉ để ghép kết quả với đúng lời xin <code>tool_use</code> trong lịch sử mày gửi. Nó không phải mã để server lấy lại kết quả.",
      "Tool Runner của SDK tự chạy tool, lo vòng request/response và “manages conversation state” (tự quản lý trạng thái hội thoại). Không dùng nó thì code phải tự làm hết.",
      "Docs tool use: block <code>tool_result</code> trong request được tính vào input token. Trim tool output (cắt kết quả tool chỉ còn trường cần, bằng code, trước khi nối vào <code>messages</code>) chặn dữ liệu thừa từ gốc."
    ],
    opts: [
      { k: "A", gist: "Send each <code>tool_result</code> once, then refer to it by its <code>tool_use_id</code> in later requests instead of resending it, letting the API supply the stored result.",
        why: [
          "Sai ở giả định: API không lưu gì giữa các lần gọi (ý 1). <code>tool_use_id</code> chỉ để ghép cặp trong lịch sử mày gửi (ý 2), không phải mã tra cứu phía server.",
          "Lượt sau không gửi lại kết quả thì Claude không thấy các trường đơn hàng, quyết hoàn tiền trên dữ liệu thiếu.",
          "Dễ bị cuốn vì nghe như cách tiết kiệm token. Nhưng tiết kiệm đúng là cắt bớt trường (D), không phải bỏ hẳn kết quả."
        ] },
      { k: "B", gist: "Rely on the Tool Runner to append the <code>lookup_order</code> result and resend the history automatically, so later turns get the order fields without manual handling.",
        why: [
          "Tool Runner làm được đúng việc đó (ý 3), nhưng đề nói rõ đường này không dùng nó.",
          "Không có Tool Runner thì không ai tự nối và gửi lại. Code của team phải tự làm."
        ] },
      { k: "C", gist: "Resend the full message history, including earlier <code>tool_result</code> blocks, with every request, because the API keeps no conversation state between calls.",
        why: [
          "API stateless (ý 1): Claude chỉ thấy những gì nằm trong request hiện tại.",
          "Gửi lại cả lịch sử, kể cả các block <code>tool_result</code> cũ, thì lượt sau Claude vẫn có các trường đơn hàng để quyết hoàn tiền."
        ] },
      { k: "D", gist: "Trim the <code>lookup_order</code> output to the needed fields before appending it as a <code>tool_result</code>, since that content is resent and billed as input tokens on later requests.",
        why: [
          "Block <code>tool_result</code> tính vào input token (ý 4), mà nó bị gửi lại ở mọi lượt sau (ý 1). Kết quả càng dài, lượt nào cũng tốn thêm.",
          "Cắt còn đúng các trường cần cho quyết định hoàn tiền thì lượt nào cũng rẻ hơn, context gọn hơn, chi tiết quan trọng không bị chôn giữa dữ liệu thừa."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D1: API không có trí nhớ, messages là bộ nhớ duy nhất; tool_result mang tool_use_id khớp lời xin", href: NOTES + "#l-1-0" },
      { label: "Bài 5.1: trim tool output, lookup_order trả 40 trường khi chỉ cần 5", href: NOTES + "#l-5-1" },
      { label: "Docs “Tool use with Claude”, mục Pricing: block tool_result trong request tính vào input token", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview" }
    ]
  },
  {
    de: 9, n: 51, total: 60, sub: "5.2", subName: "Escalate và xử lý chỗ mơ hồ", scen: "S1",
    answer: "A",
    ask: "Logs show the agent escalating simple cases it could handle itself, such as a standard replacement for a damaged item when the customer has sent photo proof. Policy says the agent must escalate immediately whenever a customer explicitly asks for a human. Which change most effectively cuts these premature escalations?",
    scene: [
      "Log cho thấy agent đẩy lên người cả những ca dễ nó tự xử được, ví dụ hàng hỏng có ảnh chụp làm bằng chứng, policy cho đổi mới.",
      "Policy có một luật cứng: khách “explicitly asks for a human” (nói rõ muốn gặp người thật) thì escalate ngay.",
      "Chỗ khó: phải bớt escalate thừa mà không được chặn ca escalate ngay theo luật. Nhìn từ bên ngoài, hai loại ca giống nhau: đều là một lần gọi <code>escalate_to_human</code> rất sớm."
    ],
    asks: [
      "Thay đổi nào giảm được nhiều nhất các lần escalate quá sớm này?",
      "Tức là: dạy agent phân biệt ca nào tự xử, ca nào phải chuyển, mà vẫn giữ được escalate ngay khi khách đòi người.",
      "Soi từng phương án: nó có đưa cho agent ranh giới quyết định không, và nó có chặn nhầm ca khách đòi người không."
    ],
    facts: [
      "Agent escalate sai chiều thường vì không có ranh giới quyết định rõ. Cách sửa trong câu mẫu số 3 của Anthropic: viết tiêu chí escalate tường minh vào system prompt, kèm few-shot cho thấy ca nào tự xử, ca nào chuyển.",
      "Guide có ba trigger escalate: khách yêu cầu gặp người thật; policy không có hoặc mơ hồ (policy gap); agent không thể tiến triển sau vài lần thử hợp lý. Khách đòi người thì chuyển ngay, không điều tra trước.",
      "Hook (<code>PreToolUse</code>, <code>PostToolUse</code>) là code chạy chắc chắn (deterministic) quanh mỗi tool call. Nó hợp với luật cố định không cần cân nhắc, như chặn hoàn tiền trên $500. Code không đọc được sắc thái của hội thoại.",
      "Chữ chèn vào kết quả tool vẫn chỉ là chữ cho Claude đọc. Claude làm theo hay không vẫn là xác suất (probabilistic), y như prompt."
    ],
    opts: [
      { k: "A", gist: "Put explicit escalation criteria into the system prompt, with few-shot examples of which cases to resolve and which to escalate right away.",
        why: [
          "Đánh đúng gốc lỗi: agent thiếu ranh giới quyết định (ý 1). Tiêu chí rõ cộng vài ví dụ đối nhau (hàng hỏng có ảnh → tự đổi; khách đòi người → chuyển ngay) cho agent thấy đường ranh.",
          "Luật escalate ngay vẫn còn nguyên: ca “khách đòi người” nằm luôn trong bộ ví dụ (ý 2).",
          "Prompt vẫn là xác suất, nhưng ở đây chấp nhận được. Escalate thừa là lỗi chất lượng, sửa dần được, không phải chỗ tiền bạc hay pháp lý đòi bảo đảm tuyệt đối."
        ] },
      { k: "B", gist: "Add a <code>PreToolUse</code> hook that denies <code>escalate_to_human</code> until the agent has made at least two investigation tool calls in the session.",
        why: [
          "Hook chặn chắc chắn (ý 3), và chính vì chắc chắn nên nó chặn luôn ca khách đòi người ngay lượt đầu. Trái luật “escalate immediately” (escalate ngay) của policy (ý 2).",
          "Hai lần tra cứu cũng không phải ranh giới đúng. Tra xong hai lần, agent vẫn có thể đẩy ca hàng hỏng có ảnh lên người, vì nó vẫn không biết ca nào tự xử được.",
          "Dễ bị cuốn vì hook là cách bảo đảm hay được khen. Nhưng hook hợp với luật cố định. Escalate lúc nào là việc phải cân nhắc theo từng ca, từng câu khách nói."
        ] },
      { k: "C", gist: "Add a <code>PostToolUse</code> hook that appends a reminder to every tool result, telling the agent to keep working toward resolution before it escalates.",
        why: [
          "Dùng hook để chở một câu nhắc. Câu nhắc vẫn là chữ cho Claude đọc, làm theo hay không vẫn là xác suất (ý 4).",
          "Câu nhắc lặp ở mọi kết quả tool làm rối context, mà vẫn không cho agent tiêu chí nào để biết ca nào tự xử (ý 1).",
          "Còn có thể khiến agent nấn ná khi khách đã đòi người, trái luật chuyển ngay (ý 2)."
        ] },
      { k: "D", gist: "Run a separate classifier on each incoming message that labels it resolve or escalate before the agent starts working on it.",
        why: [
          "Classifier dán nhãn trước khi agent tra cứu gì. Nhưng ca có tự xử được không thường chỉ lộ ra sau khi <code>get_customer</code>, <code>lookup_order</code> trả kết quả: đơn có thật không, còn hạn đổi không.",
          "Thêm một hệ thống phải nuôi mà gốc lỗi vẫn còn: agent không có tiêu chí (ý 1). Notes gọi việc dựng classifier riêng khi chưa thử sửa prompt là làm quá tay (over-engineering)."
        ] }
    ],
    refs: [
      { label: "Bài 5.2, mục “Chuyện gì đang xảy ra”: tiêu chí escalate tường minh + few-shot, vì sao không dựng classifier", href: NOTES + "#l-5-2" },
      { label: "Bài 5.2, mục “Ba tình huống hay bị nhầm khi escalate”: ba trigger, khách đòi người thì chuyển ngay", href: NOTES + "#fix-9" },
      { label: "Bài 1.5, mục “Chuyện gì đang xảy ra”: hook là deterministic, prompt là probabilistic, khi nào cần hook", href: NOTES + "#l-1-5" }
    ]
  },
  {
    de: 9, n: 52, total: 60, sub: "2.1", subName: "Thiết kế tool: description rõ, ranh giới rõ", scen: "S1",
    answer: "A",
    ask: "The agent expects <code>get_customer</code> to return payment details, so it keeps calling the tool again with different parameters, even though every call is well formed and succeeds. Payment records can be reached only through <code>escalate_to_human</code>. Which change most directly stops these wasted retries?",
    scene: [
      "Agent tin rằng <code>get_customer</code> có trả thông tin thanh toán (payment details).",
      "Không thấy thông tin đó, nó gọi lại <code>get_customer</code> nhiều lần, mỗi lần đổi tham số.",
      "Chỗ khó: lần gọi nào cũng đúng cú pháp và thành công. Tool không hỏng. Cái sai là agent hiểu sai tool trả về gì.",
      "Hồ sơ thanh toán chỉ lấy được qua <code>escalate_to_human</code> (chuyển cho người)."
    ],
    asks: [
      "Thay đổi nào chặn thẳng nhất những lần gọi lại vô ích?",
      "Tức là: sửa niềm tin sai của agent về output của <code>get_customer</code>, ở đúng chỗ nó đọc khi quyết định gọi tool.",
      "Soi từng phương án: nó sửa input, sửa output, hay sửa hiểu biết của agent về tool?"
    ],
    facts: [
      "Claude chọn và dùng tool chỉ dựa vào <code>name</code>, <code>description</code>, <code>input_schema</code>. Guide: description là cơ chế chính để LLM chọn tool.",
      "Docs Define tools liệt kê những gì description nên có: tool làm gì, khi nào dùng và khi nào không, từng tham số nghĩa là gì, và các giới hạn quan trọng, ví dụ “what information the tool does not return” (tool không trả thông tin gì).",
      "Ví dụ input (trường <code>input_examples</code>, hay ví dụ query viết trong description) dạy Claude dựng lời gọi cho đúng định dạng. Nó không nói gì về output.",
      "<code>isError</code> (MCP) dùng để báo tool chạy hỏng. Một lần tra thành công mà thiếu trường agent mong đợi vẫn là kết quả hợp lệ, không phải lỗi."
    ],
    opts: [
      { k: "A", gist: "Extend <code>get_customer</code>'s description to say what it returns, state that payment details are not included, and point those requests to <code>escalate_to_human</code>.",
        why: [
          "Sửa đúng chỗ sai: niềm tin của agent về output. Description là chỗ Claude đọc khi quyết định dùng tool thế nào (ý 1).",
          "Ghi rõ “không trả payment details” đúng là mục giới hạn docs khuyên viết (ý 2). Chỉ luôn đường đúng (<code>escalate_to_human</code>) thì agent biết đi đâu, thay vì gọi lại."
        ] },
      { k: "B", gist: "Add example queries to <code>get_customer</code>'s description, showing a valid email lookup and a valid <code>customer_id</code> lookup, so the agent builds its calls correctly.",
        why: [
          "Ví dụ query dạy dựng input (ý 3). Nhưng đề nói mọi lần gọi đã đúng và thành công. Input không phải chỗ hỏng.",
          "Agent đọc ví dụ xong vẫn tin tool có trả thanh toán, vẫn gọi lại.",
          "Dễ bị cuốn vì ví dụ trong description là kỹ thuật thật, được khuyên dùng. Nhưng nó chữa lỗi khác: gọi sai định dạng."
        ] },
      { k: "C", gist: "Return a tool result with the MCP <code>isError</code> flag set whenever a lookup seems aimed at payment details, so the agent treats the call as a failure.",
        why: [
          "Lần tra đó thành công thật, chỉ không có trường thanh toán. Gắn <code>isError</code> là báo sai sự thật (ý 4).",
          "Agent nghe “tool hỏng” thì càng dễ thử lại, hoặc báo khách là hệ thống lỗi. Nó vẫn không biết phải sang <code>escalate_to_human</code>."
        ] },
      { k: "D", gist: "Add a system prompt rule that payment details never come from customer tools, and keep the tool description short and focused.",
        why: [
          "Giúp được phần nào, nhưng đặt chỉ dẫn xa khỏi tool. Lúc quyết định dùng tool, Claude dựa vào description (ý 1), mà description vẫn không nói giới hạn.",
          "“Keep the description short” (giữ description ngắn) đi ngược docs: description phải ghi đủ, kể cả cái tool không trả (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 2.1, mục “Chuyện gì đang xảy ra”: description là cơ chế chính để chọn tool, description tốt phải nói rõ ranh giới", href: NOTES + "#l-2-1" },
      { label: "Bài 2.2, mục “Lỗi trong hệ nhiều agent”: isError để báo hỏng, kết quả hợp lệ không phải lỗi", href: NOTES + "#l-2-2" },
      { label: "Docs “Define tools”, mục Best practices for tool definitions: ghi cả giới hạn, kể cả thông tin tool không trả", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools" }
    ]
  },
  {
    de: 9, n: 53, total: 60, sub: "1.6", subName: "Chia việc lớn", scen: "S1",
    answer: "C",
    ask: "A customer says recurring charges on their account have been wrong for some time, but cannot say which orders or months are affected. The account has several years of order history. How should the agent structure the investigation?",
    scene: [
      "Khách báo khoản thu định kỳ (recurring charges) bị sai đã lâu, nhưng không nói được đơn nào, tháng nào.",
      "Tài khoản có lịch sử đơn hàng mấy năm.",
      "Chỗ khó: chưa biết phạm vi lỗi. Chưa biết đơn nào bị ảnh hưởng thì chưa chia việc cho đúng được."
    ],
    asks: [
      "Agent nên sắp xếp cuộc điều tra thế nào?",
      "Tức là: đây là việc mở, chưa biết trước các bước. Chọn cách chia việc hợp với một bài toán chưa rõ phạm vi.",
      "Soi từng phương án: danh sách việc con được lập trước hay sau khi biết đơn nào lỗi? Nó có bỏ sót phần lịch sử nào không?"
    ],
    facts: [
      "Guide phân biệt hai kiểu chia việc. Prompt chaining: chuỗi bước biết trước, viết sẵn, hợp với việc đoán trước được. Dynamic adaptive decomposition (chia việc thích ứng): làm bước khám phá trước, nhìn kết quả rồi mới sinh bước sau, và sửa kế hoạch khi lộ ra điều mới.",
      "Việc mở thì đi theo kiểu thích ứng: vẽ bản đồ trước, lập kế hoạch từ cái đã thấy, rồi chỉnh dần.",
      "Trong vòng lặp agent, mỗi kết quả tool được nối vào lịch sử trước khi Claude quyết bước tiếp. Vì thế cái bước khám phá tìm ra quyết định có những việc con nào.",
      "Guide có ba trigger escalate: khách đòi gặp người; policy gap; agent không thể tiến triển sau vài lần thử hợp lý. Phạm vi chưa rõ không nằm trong ba cái đó."
    ],
    opts: [
      { k: "A", gist: "Write a structured handoff summary and escalate to a human billing specialist, who can review the whole account history with direct backend access.",
        why: [
          "Escalate khi chưa tra gì. Không trigger nào bật: khách không đòi người, không có policy gap, agent chưa thử gì nên chưa thể gọi là kẹt (ý 4).",
          "Người nhận ca chỉ có một lời kể, không có phát hiện nào. Tra lịch sử đơn là đúng việc tool của agent làm được. Chuyển đi là tụt first-contact resolution (tỉ lệ giải quyết ngay lần liên hệ đầu).",
          "Dễ bị cuốn vì gói bàn giao có cấu trúc là cách làm đúng khi đã phải escalate. Nhưng ở đây chưa tới lúc escalate."
        ] },
      { k: "B", gist: "Launch a wave of parallel subagents, one for each of the last twelve billing months, so the independent audits finish in the time of the slowest one.",
        why: [
          "Kế hoạch lập trước khi biết gì: khung 12 tháng là đoán (ý 1). Tài khoản có lịch sử mấy năm, lỗi cũ hơn 12 tháng bị bỏ sót hoàn toàn.",
          "Tháng không có lỗi vẫn tốn trọn một subagent.",
          "Dễ bị cuốn vì chạy song song nghe nhanh, chia theo tháng nghe hợp lý. Nhưng chạy song song một kế hoạch đoán mò thì vẫn là đoán mò."
        ] },
      { k: "C", gist: "First run a discovery pass over the customer's order history, then create one investigation subtask for each affected order that pass turns up.",
        why: [
          "Đúng kiểu chia việc thích ứng (ý 1, ý 2): khám phá trước để biết phạm vi, rồi mới sinh việc con từ cái tìm thấy.",
          "Kết quả bước khám phá quay về lịch sử và quyết định có bao nhiêu việc con (ý 3). Không bỏ sót năm cũ, không phí công cho đơn không lỗi.",
          "Tra tiếp mà lộ thêm đơn lỗi thì danh sách việc con nới thêm."
        ] },
      { k: "D", gist: "Break the dispute into the team's standard subtask sequence: verify the customer's identity, review the recurring billing records, then calculate the refunds owed.",
        why: [
          "Chuỗi bước cố định là prompt chaining, hợp với việc đoán trước được (ý 1).",
          "Ở đây khách không biết đơn nào, tháng nào. Bước xem hồ sơ thu tiền và bước tính tiền hoàn không có phạm vi. Danh sách việc viết xong trước khi ai biết đơn nào lỗi.",
          "Dễ bị cuốn vì quy trình chuẩn đúng với ca tranh chấp thường. Nhưng ca này chưa rõ phạm vi."
        ] }
    ],
    refs: [
      { label: "Bài 1.6, mục “Chuyện gì đang xảy ra”: prompt chaining cho việc đoán trước được, kế hoạch thích ứng cho việc mở", href: NOTES + "#l-1-6" },
      { label: "Bài 5.2, mục “Ba tình huống hay bị nhầm khi escalate”: ba trigger escalate", href: NOTES + "#fix-9" },
      { label: "Bài Nền tảng D1: vòng lặp agent, kết quả tool nối vào lịch sử rồi Claude quyết bước tiếp", href: NOTES + "#l-1-0" }
    ]
  },
  {
    de: 9, n: 54, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S1",
    answer: "B",
    ask: "A support engineer spent a long session diagnosing a recurring billing dispute, and the session history now holds every customer and order finding. The engineer wants to try two different resolution strategies, each starting from that full history, without either run's messages affecting the other. What should the engineer configure?",
    scene: [
      "Kỹ sư ngồi một phiên dài chẩn đoán một ca tranh chấp thanh toán lặp đi lặp lại. Lịch sử phiên giờ chứa đủ phát hiện về khách và đơn hàng.",
      "Giờ muốn thử hai chiến lược giải quyết, cả hai xuất phát từ trọn lịch sử đó.",
      "Chỗ khó: message của lượt chạy này không được lọt sang lượt chạy kia. Vừa phải giữ trọn gốc, vừa phải tách hai nhánh. Ví dụ minh họa:<pre><code>phiên chẩn đoán (giữ nguyên)\n ├─ nhánh 1: chiến lược A\n └─ nhánh 2: chiến lược B</code></pre>"
    ],
    asks: [
      "Kỹ sư nên cấu hình gì?",
      "Tức là: hai phiên mới, mỗi phiên mang sẵn trọn lịch sử chẩn đoán, rồi đi tiếp độc lập.",
      "Soi từng phương án: lịch sử có được giữ trọn không, và hai lượt chạy có ghi chung vào một phiên không?"
    ],
    facts: [
      "Docs Agent SDK: continue và resume đều mở một phiên có sẵn rồi ghi tiếp vào chính phiên đó. Continue tìm phiên gần nhất trong thư mục hiện tại. Resume nhận một session ID cụ thể.",
      "Fork (<code>resume</code> = ID phiên gốc, kèm <code>fork_session=True</code>; TypeScript là <code>forkSession</code>) tạo phiên mới có ID riêng, mang bản sao lịch sử phiên gốc. Phiên gốc không đổi.",
      "Phiên mới kèm bản tóm tắt là cách đúng khi kết quả tool trong phiên cũ đã lỗi thời (stale). Tóm tắt viết tay là bản rút gọn, dễ rơi chi tiết."
    ],
    opts: [
      { k: "A", gist: "Run each strategy by resuming the diagnostic session's ID in two separate runs without forking, since resume restores the saved history for both.",
        why: [
          "Resume không fork thì cả hai lượt chạy ghi tiếp vào đúng phiên chẩn đoán (ý 1). Message của chiến lược này nằm chung lịch sử với chiến lược kia.",
          "Phiên gốc cũng bị ghi thêm, không còn là gốc sạch.",
          "Dễ bị cuốn vì resume đúng là nạp lại trọn lịch sử. Nhưng A và B chỉ khác nhau ở chỗ có fork hay không, và đó là cả câu hỏi."
        ] },
      { k: "B", gist: "Run each strategy by resuming the diagnostic session's ID with <code>fork_session</code> enabled, so each run branches into its own new session.",
        why: [
          "Mỗi lần fork tạo một phiên mới có ID riêng, mang bản sao trọn lịch sử chẩn đoán (ý 2). Fork hai lần là có hai nhánh cùng gốc.",
          "Nhánh này không ghi vào nhánh kia, phiên gốc còn nguyên. Đúng hai điều đề đòi: trọn lịch sử, và không ảnh hưởng nhau."
        ] },
      { k: "C", gist: "Start two fresh sessions and put a structured summary of the diagnostic findings in each one's first prompt, so both begin from the same baseline.",
        why: [
          "Hai nhánh tách nhau thật, nhưng tóm tắt là bản rút gọn (ý 3). Đề đòi xuất phát từ trọn lịch sử, không phải bản rút gọn.",
          "Còn phải viết tóm tắt rồi dán hai lần, trong khi fork tự mang cả lịch sử sang.",
          "Dễ bị cuốn vì phiên mới kèm tóm tắt là cách đúng khi lịch sử cũ đã lỗi thời. Ở đây lịch sử vẫn đúng, giữ nguyên thì tốt hơn."
        ] },
      { k: "D", gist: "Turn on the continue option in both runs so each one picks up the diagnostic session automatically from the working directory.",
        why: [
          "Continue mở phiên gần nhất trong thư mục và ghi tiếp vào đó (ý 1). Không tách nhánh: hai lượt chạy ghi chung một lịch sử, y như A.",
          "Tệ hơn A một chỗ: nếu từ lúc chẩn đoán xong đã có phiên khác chạy trong thư mục, continue mở nhầm phiên đó."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, mục “Ba cách nối lại công việc”: resume, fork, phiên mới kèm tóm tắt", href: NOTES + "#l-1-7" },
      { label: "Cheatsheet D1: dòng “So sánh hai hướng từ cùng một bản phân tích” → fork_session", href: NOTES + "#cheat-d1" },
      { label: "Docs Agent SDK “Work with sessions”, mục Continue, resume, and fork: continue và resume ghi tiếp vào phiên cũ, fork tạo phiên mới", href: "https://code.claude.com/docs/en/agent-sdk/sessions" }
    ]
  },
  {
    de: 9, n: 55, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code", scen: "S1",
    answer: "B",
    ask: "At the start of every session, the team wants the harness to look up a short summary of the disputed order by its order number and attach it to the agent's context. The store holds millions of orders, and new ones are created every minute. Which MCP resource design supports this?",
    scene: [
      "Đầu mỗi phiên, harness (code bọc quanh agent) tra một bản tóm tắt ngắn của đơn đang tranh chấp theo mã đơn, rồi gắn vào context của agent.",
      "Cửa hàng có hàng triệu đơn, phút nào cũng có đơn mới.",
      "Chỗ khó: harness đã biết mã đơn và chỉ cần đúng một đơn. Nhưng tập dữ liệu thì khổng lồ và đổi liên tục, không liệt kê hết được."
    ],
    asks: [
      "Thiết kế MCP resource nào làm được việc này?",
      "Tức là: cách để harness chỉ thẳng tới đúng một đơn theo mã, không cần một danh mục chứa mọi đơn.",
      "Soi từng phương án: nó cho đọc một đơn theo mã, hay bắt đi qua cả danh mục? Đơn mới tạo phút trước có đọc được ngay không?"
    ],
    facts: [
      "Spec MCP: resource là “application-driven” (do ứng dụng điều khiển). Host tự quyết khi nào đọc resource và đưa vào context, không cần model gọi tool.",
      "Direct resource: mỗi resource có một <code>uri</code> riêng. Client lấy danh sách bằng <code>resources/list</code> (có phân trang), đọc nội dung bằng <code>resources/read</code>.",
      "Resource template: server phơi resource có tham số bằng một mẫu URI, trường <code>uriTemplate</code> theo chuẩn URI Template (RFC 6570), ví dụ <code>orders://{order_id}</code>. Client lấy các mẫu qua <code>resources/templates/list</code>. Điền mã đơn vào biến là ra URI của đúng đơn đó.",
      "Cờ <code>subscribe</code> trong capability <code>resources</code> chỉ nói server có gửi thông báo khi một resource client đang theo dõi thay đổi. Còn <code>listChanged</code> báo khi danh sách resource đổi."
    ],
    opts: [
      { k: "A", gist: "Register each order summary as its own direct resource and rely on pagination in <code>resources/list</code> so clients can page through the catalog.",
        why: [
          "Đúng giao thức: <code>resources/list</code> có phân trang (ý 2). Nhưng danh mục hàng triệu mục, phút nào cũng thêm, nên lúc nào cũng to và lúc nào cũng cũ.",
          "Harness đã biết mã đơn, chỉ cần một đơn. Lật trang qua hàng triệu mục để tìm một mục là thừa.",
          "Dễ bị cuốn vì direct resource kèm phân trang là thiết kế hợp lệ cho danh mục cỡ vừa, ít đổi. Tập dữ liệu này không như vậy."
        ] },
      { k: "B", gist: "Advertise a resource template whose <code>uriTemplate</code> is something like <code>orders://{order_id}</code>, so any order summary can be addressed by URI.",
        why: [
          "Template là đúng công cụ của MCP cho dữ liệu có tham số (ý 3). Điền mã đơn là ra URI của đúng đơn đó, không cần liệt kê từng đơn.",
          "Đơn mới tạo phút trước cũng đọc được ngay, vì mẫu URI không đổi.",
          "Harness đọc resource rồi gắn vào context trước khi agent bắt đầu (ý 1). Agent không phải tốn mấy lượt đầu để tra đơn."
        ] },
      { k: "C", gist: "Declare the <code>resources</code> capability with the <code>subscribe</code> flag so clients are notified whenever an order summary changes.",
        why: [
          "<code>subscribe</code> lo chuyện báo thay đổi cho resource client đang theo dõi (ý 4). Nó không làm đơn nào đọc được theo mã, cũng không đưa tóm tắt vào context.",
          "Nó giải một bài khác: giữ bản đã đọc cho mới. Đề hỏi cách đọc được đúng đơn ngay từ đầu."
        ] },
      { k: "D", gist: "Publish one static resource that bundles every order summary into a single document, which the harness refreshes and attaches.",
        why: [
          "Agent cần một đơn, harness lại phải gắn tóm tắt của hàng triệu đơn. Không vừa context.",
          "Phút nào có đơn mới là tài liệu cũ phút đó. Muốn mới thì phải dựng lại cả khối."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, mục “Resource: để agent thấy có gì mà không phải mò”: tools cho hành động, resources cho dữ liệu tham khảo", href: NOTES + "#l-2-4" },
      { label: "Spec MCP, trang Resources: application-driven, resources/list có phân trang, Resource Templates (uriTemplate, RFC 6570), subscribe và listChanged", href: "https://modelcontextprotocol.io/specification/2026-07-28/server/resources" }
    ]
  },
  {
    de: 9, n: 56, total: 60, sub: "5.3", subName: "Báo lỗi giữa các agent", scen: "S1",
    answer: "A",
    ask: "<code>lookup_order</code> reports backend timeouts with <code>is_error</code> set to true, and reports customers who have no orders as a success with an empty array. Logs show that a single retry clears over 90% of the timeouts. Today the agent escalates both outcomes the same way, which drags down first-contact resolution. How should the agent handle each outcome?",
    scene: [
      "<code>lookup_order</code> đã tách hai trường hợp: backend timeout thì trả <code>is_error: true</code>; khách không có đơn nào thì trả thành công kèm mảng rỗng.",
      "Log cho thấy thử lại một lần là hơn 90% ca timeout qua được.",
      "Vậy mà agent escalate cả hai như nhau, nên first-contact resolution (tỉ lệ giải quyết ngay lần liên hệ đầu) tụt.",
      "Chỗ khó: tool đã làm đúng phần của nó. Việc còn lại nằm ở phía agent: mỗi kiểu kết quả cần một hành động khác."
    ],
    asks: [
      "Agent nên xử lý từng kiểu kết quả thế nào?",
      "Tức là: ghép đúng hành động cho lỗi tạm thời và cho kết quả rỗng hợp lệ, sao cho ít escalate thừa nhất.",
      "Soi từng phương án theo hai nửa: timeout làm gì, mảng rỗng làm gì. Phải đúng cả hai nửa."
    ],
    facts: [
      "Access failure (không truy cập được, chưa biết có dữ liệu hay không) và valid empty result (truy cập được, nguồn thật sự không có gì) là hai thứ khác nhau, cần hai quyết định khác nhau. Mảng rỗng không phải lỗi.",
      "Timeout là lỗi transient (tạm thời). Cách xử lý: tự thử lại tại chỗ 1–2 lần có backoff (giãn thời gian giữa các lần), không được mới báo lên.",
      "Guide có ba trigger escalate: khách đòi gặp người; policy gap; agent không thể tiến triển sau vài lần thử hợp lý.",
      "Generic status (một trạng thái chung cho mọi trường hợp) là anti-pattern: nó giấu đúng thông tin mà bước sau cần để chọn cách xử lý."
    ],
    opts: [
      { k: "A", gist: "After a timeout, retry the lookup and escalate only if the retry fails as well. Treat the empty array as a valid answer and confirm the order details with the customer.",
        why: [
          "Nửa timeout: lỗi tạm thời, thử lại tại chỗ trước (ý 2). Log cho thấy một lần thử lại cứu hơn 90%. Chỉ ca thử rồi vẫn hỏng mới chạm trigger “không thể tiến triển” (ý 3).",
          "Nửa mảng rỗng: câu hỏi đã có câu trả lời, câu trả lời là “không có đơn” (ý 1). Việc tiếp theo là hỏi lại khách: email nào, mã đơn nào. Không cần người.",
          "Cả hai nửa đều giữ ca trong tay agent, nên first-contact resolution lên."
        ] },
      { k: "B", gist: "After a timeout, retry the lookup. Send the empty-array case to <code>escalate_to_human</code> with a handoff summary so a human can check whether the orders exist.",
        why: [
          "Nửa timeout đúng. Nửa mảng rỗng sai: coi một kết quả hợp lệ như chuyện cần người xử (ý 1).",
          "Người nhận ca tra lại cũng chỉ thấy đúng câu trả lời tool đã đưa. Agent tự hỏi lại khách được, chuyển đi là thêm việc bàn giao, tụt first-contact resolution.",
          "Dễ bị cuốn vì đúng một nửa, và “để người kiểm lại” nghe cẩn thận. Nhưng mảng rỗng không bật trigger escalate nào (ý 3)."
        ] },
      { k: "C", gist: "Change the tool so both outcomes come back with a single “orders unavailable” status, and the agent gives one consistent reply either way.",
        why: [
          "Gộp lỗi tạm thời với kết quả rỗng thành một trạng thái là đúng anti-pattern generic status (ý 4).",
          "Agent mất luôn thông tin để chọn: thử lại, hỏi lại khách, hay escalate. Còn lùi so với hiện tại, vì tool đang tách đúng hai trường hợp (ý 1)."
        ] },
      { k: "D", gist: "Escalate timeouts right away with a structured handoff, since the agent cannot move on without order data. Treat the empty array as a valid answer and confirm it with the customer.",
        why: [
          "Nửa mảng rỗng đúng. Nửa timeout sai: escalate ngay khi chưa thử lại lần nào (ý 2).",
          "“Không thể tiến triển” chỉ tính sau vài lần thử hợp lý (ý 3). Một lần thử lại cứu hơn 90% ca, nên escalate ngay là đẩy cho người những ca agent tự xử được.",
          "Dễ bị cuốn vì lý do “thiếu dữ liệu đơn thì không đi tiếp được” nghe đúng trigger. Nhưng trigger đó chưa bật khi còn chưa thử."
        ] }
    ],
    refs: [
      { label: "Bài 5.3, mục “Empty không phải là lỗi”: access failure và valid empty cần hai quyết định khác nhau", href: NOTES + "#l-5-3" },
      { label: "Bài 2.2, bảng errorCategory: transient thì retry có backoff 1–2 lần rồi mới báo lên", href: NOTES + "#l-2-2" },
      { label: "Bài 5.2, mục “Ba tình huống hay bị nhầm khi escalate”: ba trigger escalate", href: NOTES + "#fix-9" }
    ]
  },
  {
    de: 9, n: 57, total: 60, sub: "1.7", subName: "Phiên làm việc: resume, fork, phiên mới", scen: "S1",
    answer: "C",
    ask: "Midway through a billing dispute, the agent misread a refund policy, and every later turn built on that mistake. The team wants a new session that keeps the exact tool results from before that turn, while the original session stays untouched for audit. Which Python Agent SDK approach fits?",
    scene: [
      "Giữa một ca tranh chấp thanh toán, agent đọc sai chính sách hoàn tiền. Mọi lượt sau đều xây trên cái sai đó.",
      "Team muốn một phiên mới giữ nguyên văn các kết quả tool từ trước lượt sai.",
      "Phiên gốc phải còn nguyên để audit (kiểm tra lại về sau).",
      "Chỗ khó: cần một nhánh chỉ mang phần đầu của lịch sử, cắt bỏ từ lượt sai trở đi. Ví dụ minh họa:<pre><code>msg 1–14: tra khách, tra đơn   (đúng, giữ)\nmsg 15:   đọc sai policy hoàn tiền\nmsg 16+:  xây trên cái sai     (bỏ)</code></pre>"
    ],
    asks: [
      "Cách nào trong Python Agent SDK hợp?",
      "Tức là: một phiên mới chứa đúng phần lịch sử tới trước lượt sai, nguyên văn, và không đụng tới phiên gốc.",
      "Soi từng phương án theo ba điều: có bỏ được lượt sai không, có giữ nguyên văn kết quả tool không, phiên gốc có còn sạch không."
    ],
    facts: [
      "Resume kèm <code>fork_session=True</code> tạo phiên mới có ID riêng, mang bản sao <b>trọn</b> lịch sử phiên gốc. Phiên gốc không đổi.",
      "Hàm <code>fork_session()</code> của Python SDK chép transcript của một phiên sang phiên mới. Tham số <code>up_to_message_id</code> chỉ chép tới và gồm message có UUID đó. Hàm trả về <code>ForkSessionResult</code>; lấy <code>session_id</code> trong đó truyền vào <code>resume</code> để làm tiếp trên nhánh. Phiên gốc giữ nguyên.",
      "Phiên mới kèm tóm tắt hợp khi kết quả tool cũ đã lỗi thời. Tóm tắt văn xuôi là bản rút gọn, dễ rơi số tiền, mã đơn, chi tiết xác minh.",
      "Context không quên theo yêu cầu: lời dặn “bỏ qua phần trước” không xóa được gì khỏi lịch sử."
    ],
    opts: [
      { k: "A", gist: "Resume the original session with <code>fork_session</code> set to true, so the new session starts with a copy of the full conversation history.",
        why: [
          "Phiên gốc vẫn sạch, nhưng fork kiểu này chép trọn lịch sử (ý 1). Lượt đọc sai và mọi lượt sau vẫn nằm trong nhánh mới.",
          "Dễ bị cuốn vì fork là đáp án quen của “tách nhánh mà giữ gốc”. Nhưng fork trọn chỉ hợp khi cả lịch sử đáng giữ. Ở đây phải cắt bớt."
        ] },
      { k: "B", gist: "Start a fresh session seeded with a prose summary of the verified facts, so the policy mistake never enters the new context.",
        why: [
          "Tránh được lượt sai, nhưng đề đòi nguyên văn kết quả tool. Tóm tắt văn xuôi là bản rút gọn, dễ rơi số tiền, mã đơn (ý 3).",
          "Kết quả tool phần đầu vẫn đúng, không lỗi thời. Không có lý do bỏ chúng đi để viết lại."
        ] },
      { k: "C", gist: "Call the <code>fork_session()</code> helper with <code>up_to_message_id</code> set to the last correct message, then resume the session ID it returns.",
        why: [
          "<code>up_to_message_id</code> = message đúng cuối cùng, nên nhánh mới chỉ có phần đầu, nguyên văn (ý 2). Lượt đọc sai và mọi lượt sau bị bỏ lại.",
          "Truyền <code>session_id</code> nó trả về vào <code>resume</code> là làm tiếp được trên nhánh. Phiên gốc giữ nguyên cho audit. Đủ cả ba điều đề đòi.",
          "Docs còn có tùy chọn <code>resume_session_at</code> làm cùng việc ngay lúc gọi <code>query()</code>: đặt cùng <code>resume</code>, thường kèm <code>fork_session</code>."
        ] },
      { k: "D", gist: "Resume the original session and tell the agent to disregard its earlier policy reading before it continues the resolution.",
        why: [
          "Lời dặn “disregard” (bỏ qua) không xóa được gì (ý 4). Lượt đọc sai và các lượt xây trên nó vẫn nằm trong context, vẫn có thể kéo agent sai tiếp.",
          "Resume không fork thì ghi tiếp vào chính phiên gốc. Bản audit không còn sạch."
        ] }
    ],
    refs: [
      { label: "Bài 1.7, khung “Khái niệm của bài” và mục “Ba cách nối lại công việc”: resume, fork, phiên mới kèm tóm tắt", href: NOTES + "#l-1-7" },
      { label: "Docs Python Agent SDK reference, mục fork_session(): up_to_message_id, ForkSessionResult; và tùy chọn resume_session_at", href: "https://code.claude.com/docs/en/agent-sdk/python" }
    ]
  },
  {
    de: 9, n: 58, total: 60, sub: "2.3", subName: "Chia tool cho agent và tool_choice", scen: "S1",
    answer: "BC",
    ask: "The harness calls the Messages API directly and sends the same four client-side tools on every request, using a model that supports forced tool use. On every new ticket the agent must call <code>get_customer</code> first to verify identity. Which two steps correctly produce and complete this forced first call? (Choose two.)",
    scene: [
      "Harness gọi thẳng Messages API. Request nào cũng gửi đúng bốn client tool (tool do code của mình chạy).",
      "Đề nói sẵn model nhận forced tool use (ép gọi tool), nên không phải lo lỗi 400 mà vài model mới trả khi ép tool.",
      "Ticket mới nào cũng phải gọi <code>get_customer</code> trước tiên để xác minh danh tính.",
      "Chỗ khó: đề hỏi hai nửa của cùng một lần gọi: ép cho ra lời gọi, và trả kết quả về cho đúng. Danh sách bốn tool không được đổi."
    ],
    asks: [
      "Hai bước nào tạo ra và hoàn tất đúng lần gọi bị ép này?",
      "Tức là: một bước ở request (ép đúng <code>get_customer</code>), một bước ở lượt sau (chạy tool và gửi kết quả về đúng chỗ).",
      "Soi từng phương án: nó lo nửa nào, có giữ nguyên bốn tool không, kết quả có đi đúng vai không."
    ],
    facts: [
      "<code>tool_choice</code>: <code>auto</code> để Claude tự quyết; <code>any</code> bắt gọi một tool nào đó nhưng không chỉ định tool nào; <code>{\"type\": \"tool\", \"name\": \"…\"}</code> bắt gọi đúng tool đó.",
      "Ép tool chỉ làm response mở đầu bằng block <code>tool_use</code>. Với client tool, API không chạy hộ: code của mày phải chạy hàm thật.",
      "Kết quả gửi lại trong message <code>role: \"user\"</code>, dạng block <code>tool_result</code>, mang <code>tool_use_id</code> trùng <code>id</code> của block <code>tool_use</code>."
    ],
    opts: [
      { k: "A", gist: "Return the <code>get_customer</code> output as an assistant message appended to the history, so the model reads its own call's result in order.",
        why: [
          "Sai vai: kết quả tool phải nằm trong message <code>role: \"user\"</code>, dạng <code>tool_result</code> (ý 3), không phải message assistant.",
          "Lời gọi <code>tool_use</code> vẫn không có <code>tool_result</code> nào trả lời, nên lịch sử sai cấu trúc và lượt này không hoàn tất được."
        ] },
      { k: "B", gist: "Send the first request with <code>tool_choice</code> set to <code>{\"type\": \"tool\", \"name\": \"get_customer\"}</code>, keeping <code>get_customer</code> in that request's tools list.",
        why: [
          "Nửa request: ép đúng tên tool (ý 1). Response mở đầu bằng lời gọi <code>get_customer</code>, không thể bắt đầu bằng tool khác.",
          "Tên trong <code>tool_choice</code> phải là một tool có trong request đó. Bốn tool vẫn gửi đủ, không phải sửa danh sách."
        ] },
      { k: "C", gist: "Run <code>get_customer</code> in the harness, then return its output in a <code>tool_result</code> block inside a user message that references the call's <code>tool_use_id</code>.",
        why: [
          "Nửa hoàn tất: ép chỉ cho ra block <code>tool_use</code>, harness phải tự chạy tool (ý 2).",
          "Gửi kết quả trong message user, block <code>tool_result</code> có <code>tool_use_id</code> khớp (ý 3). Có vậy Claude mới đọc được khách đã xác minh và chọn bước tiếp."
        ] },
      { k: "D", gist: "Send the first request with <code>tool_choice</code> set to <code>\"any\"</code> and trim that request's tools list to <code>get_customer</code> alone, so the required call can only target the identity tool.",
        why: [
          "Về kỹ thuật thì ép được: chỉ còn một tool thì “gọi một tool nào đó” thành gọi đúng tool đó. Nhưng phải cắt danh sách tool, trái dữ kiện “same four client-side tools on every request” (cùng bốn tool ở mọi request).",
          "Giữ đủ bốn tool thì <code>any</code> chỉ bảo đảm có tool call, không bảo đảm là tool nào (ý 1). Agent có thể mở đầu bằng <code>lookup_order</code> hay <code>process_refund</code>.",
          "Dễ bị cuốn vì đây là cách có thật, chạy được. Nhưng đề khóa danh sách tool, nên chỉ ép theo tên mới hợp."
        ] }
    ],
    refs: [
      { label: "Bài 2.3, mục “tool_choice: để model chọn, bắt nó chọn, hay chỉ định luôn”: auto, any, ép đúng tool ở lượt đầu", href: NOTES + "#l-2-3" },
      { label: "Bài Nền tảng D1: tool_result gửi lại trong message role user, tool_use_id khớp id của lời xin", href: NOTES + "#l-1-0" },
      { label: "Docs “Define tools”, mục Forcing tool use: bốn giá trị tool_choice và các model không nhận ép tool", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools" }
    ]
  },
  {
    de: 9, n: 59, total: 60, sub: "5.6", subName: "Giữ nguồn và xử lý mâu thuẫn khi tổng hợp", scen: "S1",
    answer: "D",
    ask: "In long sessions the agent condenses the conversation history before it escalates. The handoff summaries copy amounts and order numbers correctly, but they present values the customer merely stated as if a tool had verified them, so human agents approve credits that nothing supports. What change fixes this?",
    scene: [
      "Phiên dài, agent nén lịch sử hội thoại trước khi escalate.",
      "Bản bàn giao chép đúng số tiền, đúng mã đơn.",
      "Nhưng con số khách tự nói lại được trình bày như con số tool đã xác minh. Người nhận ca tin, duyệt những khoản credit không có căn cứ.",
      "Chỗ khó: con số không sai. Cái mất là nguồn của con số. Ví dụ minh họa:<pre><code>trước khi nén:  khách nói “được hứa credit $60”\n                lookup_order: không có credit nào\nsau khi nén:    credit $60      ← mất “ai nói”</code></pre>"
    ],
    asks: [
      "Thay đổi nào sửa được lỗi này?",
      "Tức là: bản tóm tắt phải giữ được mỗi con số đến từ đâu: tool trả về, hay khách tự nói.",
      "Soi từng phương án: nó giữ độ chính xác của con số, hay giữ nguồn của con số? Đề đang thiếu cái nào?"
    ],
    facts: [
      "Provenance là nguồn gốc của một thông tin. Attribution là ghi nguồn đó ngay cạnh thông tin.",
      "Guide: attribution mất trong bước tóm tắt, khi nén mà không giữ ánh xạ claim → source (thông tin nào từ nguồn nào). Cách sửa: claim–source mapping có cấu trúc, đi theo từng thông tin qua mọi lần nén.",
      "Case facts block (khối sự kiện giao dịch nằm ngoài phần bị tóm tắt) và lời dặn giữ nguyên văn con số chữa một lỗi khác: tóm tắt làm mờ hay làm sai chính con số."
    ],
    opts: [
      { k: "A", gist: "Move amounts, dates, and order numbers into a persistent case facts block that is kept outside the summarized history.",
        why: [
          "Chữa lỗi mất độ chính xác (ý 3). Đề nói con số đã chép đúng.",
          "Khối đó vẫn chỉ ghi giá trị, không ghi giá trị do tool trả hay do khách nói. Số khách tự nhận vẫn nằm cạnh số tool trả, không phân biệt.",
          "Dễ bị cuốn vì case facts block là đáp án quen của bài hội thoại dài. Nhưng nó giữ con số, không giữ nguồn."
        ] },
      { k: "B", gist: "Attach the session's complete raw tool results to every escalation handoff so the human can see the original evidence.",
        why: [
          "Bằng chứng có đó, nhưng bản tóm tắt vẫn trình bày lời khách như sự thật đã xác minh. Lỗi gốc còn nguyên.",
          "Người nhận ca phải tự đối chiếu từng câu với cả đống kết quả thô để biết câu nào không có tool nào chống lưng. Đó là việc agent lẽ ra phải làm xong trước khi bàn giao."
        ] },
      { k: "C", gist: "Instruct the summarization step to preserve every amount, date, and order number verbatim through each pass.",
        why: [
          "Cũng chữa lỗi mất độ chính xác (ý 3), mà con số ở đây đã đúng.",
          "Giữ nguyên văn con số không giữ được nguồn của nó. Câu “khách nói được hứa $60” vẫn bị nén thành “credit $60”."
        ] },
      { k: "D", gist: "Require each fact in the summary to carry its origin, marking tool-returned values separately from customer-stated values.",
        why: [
          "Đúng chỗ mất: nguồn, không phải con số (ý 1, ý 2). Mỗi thông tin mang theo nhãn “tool trả” hay “khách nói” qua mọi lần nén.",
          "Người nhận ca duyệt ngay khoản tool đã xác minh, và hỏi lại những khoản chỉ có lời khách."
        ] }
    ],
    refs: [
      { label: "Bài 5.6, mục “Chuyện gì đang xảy ra”: attribution mất trong bước tóm tắt, cần claim–source mapping có cấu trúc", href: NOTES + "#l-5-6" },
      { label: "Bài 5.1, khung “Khái niệm của bài”: case facts block giữ con số, không giữ nguồn", href: NOTES + "#l-5-1" }
    ]
  },
  {
    de: 9, n: 60, total: 60, sub: "2.4", subName: "Gắn MCP server vào Claude Code", scen: "S1",
    answer: "B",
    ask: "The project's <code>.mcp.json</code>, which is checked into version control, defines the <code>support-backend</code> MCP server. New engineers must get a working staging endpoint with no manual setup, while a few engineers run the backend locally. How should the <code>url</code> field be configured?",
    scene: [
      "<code>.mcp.json</code> của dự án khai server <code>support-backend</code>, và file này commit vào git.",
      "Yêu cầu 1: kỹ sư mới clone về là có endpoint staging chạy được, “no manual setup” (không cài đặt tay gì).",
      "Yêu cầu 2: vài kỹ sư chạy backend trên máy mình, cần trỏ <code>url</code> về đó.",
      "Chỗ khó: một file chung, hai giá trị khác nhau tùy máy. Endpoint ở đây không phải secret."
    ],
    asks: [
      "Nên cấu hình trường <code>url</code> thế nào?",
      "Tức là: file commit sẵn một giá trị mặc định chạy được, ai cần thì đổi trên máy mình, không sửa file chung.",
      "Soi từng phương án theo hai yêu cầu: người mới có chạy ngay không, người chạy local có đổi được mà không đụng file chung không."
    ],
    facts: [
      "<code>.mcp.json</code> ở gốc repo là scope project, commit vào git: ai clone cũng có cùng danh sách server. <code>~/.claude.json</code> là file cá nhân, không ai khác thấy.",
      "Trong <code>.mcp.json</code>, Claude Code thay biến môi trường ở các trường <code>command</code>, <code>args</code>, <code>env</code>, <code>url</code>, <code>headers</code>. <code>${VAR}</code> lấy giá trị biến. <code>${VAR:-default}</code> lấy giá trị biến nếu đã đặt, chưa đặt thì lấy <code>default</code>.",
      "Biến chưa đặt mà không có default: server vẫn được nạp, Claude Code báo cảnh báo thiếu biến và giữ nguyên chuỗi <code>${VAR}</code> chưa thay.",
      "Secret thì viết <code>${VAR}</code> không kèm default, vì kèm default là đưa luôn secret vào repo. Giá trị không bí mật mà khác nhau tùy máy thì dùng được <code>${VAR:-default}</code>."
    ],
    opts: [
      { k: "A", gist: "Commit the staging URL as a literal value, and have engineers who run a local backend edit <code>.mcp.json</code> on their machines without committing the change.",
        why: [
          "Người mới chạy được ngay. Nhưng người chạy local phải giữ một chỗ sửa chưa commit trong file git đang theo dõi.",
          "Sớm muộn cũng có người lỡ commit địa chỉ máy mình lên, cả team trỏ nhầm. Lần nào kéo code về cũng vướng file này."
        ] },
      { k: "B", gist: "Set <code>url</code> to <code>${SUPPORT_API_URL:-https://staging.support.internal}</code>, so the staging default applies unless an engineer sets the variable.",
        why: [
          "Máy chưa đặt <code>SUPPORT_API_URL</code> thì <code>url</code> thành địa chỉ staging (ý 2). Người mới clone về là chạy, không phải làm gì.",
          "Người chạy local chỉ cần đặt <code>SUPPORT_API_URL</code> trên máy mình. File chung không đổi, không có gì để lỡ commit.",
          "Endpoint không phải secret, nên để giá trị mặc định nằm trong repo là an toàn (ý 4)."
        ] },
      { k: "C", gist: "Define the server in each engineer's <code>~/.claude.json</code> instead, so everyone controls their own endpoint value independently.",
        why: [
          "<code>~/.claude.json</code> là file cá nhân (ý 1). Server không còn đi theo repo, người mới clone về không có server nào.",
          "Ai cũng phải tự khai lại, trái yêu cầu “no manual setup” (không cài đặt tay).",
          "Dễ bị cuốn vì đúng là mỗi người tự chọn endpoint. Nhưng <code>~/.claude.json</code> dành cho server cá nhân, thử nghiệm, không phải tool chung của team."
        ] },
      { k: "D", gist: "Set <code>url</code> to <code>${SUPPORT_API_URL}</code> and add an onboarding step in which every engineer exports the variable before starting Claude Code.",
        why: [
          "Ai cũng phải đặt biến trước, tức là có một bước cài đặt tay. Trái yêu cầu 1.",
          "Người mới quên bước đó thì server vẫn nạp, nhưng <code>url</code> là chuỗi <code>${SUPPORT_API_URL}</code> chưa thay, kèm cảnh báo thiếu biến (ý 3). Không kết nối được.",
          "Dễ bị cuốn vì <code>${VAR}</code> không default là cách đúng cho secret (ý 4). Endpoint không phải secret, nên không cần khắt khe vậy."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, mục “Ba phạm vi, hai file”: .mcp.json cho team, ~/.claude.json cho cá nhân, env var expansion", href: NOTES + "#l-2-4" },
      { label: "Cheatsheet D2: dòng ba scope MCP và secret ${GITHUB_TOKEN}, ${VAR:-default}", href: NOTES + "#cheat-d2" },
      { label: "Docs “Connect Claude Code to tools via MCP”, mục Environment variable expansion in .mcp.json: ${VAR:-default} dùng được trong url; biến chưa đặt thì báo cảnh báo", href: "https://code.claude.com/docs/en/mcp" }
    ]
  }
);
