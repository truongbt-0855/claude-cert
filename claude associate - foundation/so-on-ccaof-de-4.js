// Sổ ôn CCAO-F, Đề 4. Trang so-on-ccaof.html nạp file này trước script render.
// Nguồn: examcademy “CCAO-F: Claude Certified Associate — Foundations” practice exam, 119 câu, lấy ngày 18/11/2026.
// Đề, đáp án và lời giải gốc nằm ở nguon/examcademy-ccaof-raw.json (không đưa lên git).
// Mỗi câu một phần tử, xếp theo n. Các trường:
//   de, n, total        số đề trong sổ; số thứ tự câu trong đề gốc; tổng số câu của đề gốc
//   sub, subName        task statement của guide (vd "2.4") và tên bài bằng tiếng Việt
//   answer              đáp án đúng, đã kiểm bằng notes CCAO-F hoặc docs chính thức
//   dispute             (tùy chọn) ghi chú khi đáp án đề gốc khác answer, hoặc đề mơ hồ
//   ask, opts[].gist    tiếng Anh, viết lại bằng lời riêng (không chép nguyên văn)
//   scene, asks, facts  phân tích đề: đề kể gì, đề hỏi gì, cần biết trước (tiếng Việt)
//   opts[].why          vì sao phương án đúng hay sai, dạng mảng gạch đầu dòng (tiếng Việt)
//   refs[]              { label, href: NOTES + "#<id có trong notes>" }
DE[4] = "Examcademy · 119 câu · 18/11/2026";
ENTRIES.push(
  {
    de: 4, n: 1, total: 119, sub: "2.2", subName: "Gọi đúng tên lỗi: bịa, mâu thuẫn, thiên lệch",
    answer: "B",
    ask: "A strategy manager is reviewing a recommendation Claude wrote: combine the company's two regional warehouses into one site. The recommendation cites three sources that estimate the cost savings and one source showing the move is operationally feasible. Two of the source documents also contain estimates of one-time transition costs and a stakeholder's concern about regional service levels, and the recommendation mentions neither. Which concern is most justified?",
    scene: [
      "Một quản lý chiến lược đang duyệt khuyến nghị Claude soạn: gộp hai kho khu vực thành một.",
      "Khuyến nghị dẫn ba nguồn ước tính khoản tiết kiệm và một nguồn xác nhận gộp kho làm được. Nguồn nào được dẫn cũng ủng hộ gộp.",
      "Chỗ khó: chính bộ tài liệu nguồn còn có ước tính chi phí chuyển đổi một lần, và lo ngại của một bên liên quan về chất lượng phục vụ ở từng khu vực. Hai thứ này không có trong khuyến nghị. Từng câu được viết ra có thể đều đúng. Cái sai nằm ở chỗ chọn đưa cái gì vào."
    ],
    asks: [
      "Mối lo nào có cơ sở nhất?",
      "Tức là: gọi đúng tên vấn đề của một khuyến nghị chỉ dùng phần nguồn ủng hộ kết luận, và chọn đúng cách xử lý trước khi đem dùng.",
      "Soi từng phương án: nó chỉ nhìn thứ được dẫn, hay nhìn cả thứ bị bỏ ra?"
    ],
    facts: [
      "Bias (thiên lệch) là độ lệch lặp lại theo một hướng. Một dạng là thiếu góc nhìn: câu nào cũng đúng, nhưng phần bất lợi, hay nhóm bị ảnh hưởng, không xuất hiện. Kiểm từng câu không bắt được dạng này, vì nó nằm ở cả bức tranh.",
      "Bỏ sót (omission) là kiểu lỗi khó thấy nhất: phần bị thiếu không để lại câu nào kỳ lạ để mình để ý.",
      "Context utilization (dùng ngữ cảnh) là một tiêu chí chấm output: thông tin đã được đưa vào có được dùng không.",
      "Phát hiện khi kiểm thì đổi thành yêu cầu cụ thể cho lần chạy sau, rồi kiểm lại bản mới. Một chỗ thiếu không có nghĩa phải vứt cả output."
    ],
    opts: [
      { k: "A", gist: "Accept it as a first draft, and put the missing material into a separate appendix instead of re-prompting the original output.",
        why: [
          "Sai ở chỗ coi phần bị bỏ là tư liệu đọc thêm. Chi phí chuyển đổi và rủi ro phục vụ đụng thẳng vào câu “có nên gộp kho không”, nên phải được cân trong chính phần lập luận (ý 4).",
          "Để ở phụ lục thì kết luận vẫn là kết luận viết khi chưa tính hai thứ đó. Người đọc phần chính chỉ thấy lợi.",
          "Dễ bị cuốn vì nghe như vừa giữ được bản nháp vừa đủ thông tin. Nhưng cái thiếu ở đây không phải vài trang tài liệu, mà là kết luận chưa cân phần bất lợi."
        ] },
      { k: "B", gist: "It draws on the source documents selectively, and should be re-prompted to deal with the transition costs and the service-level concern before anyone uses it.",
        why: [
          "Gọi đúng tên: khuyến nghị lấy phần nguồn ủng hộ, bỏ phần bất lợi nằm ngay trong cùng bộ tài liệu. Đây là lệch theo một hướng, dạng thiếu góc nhìn (ý 1, 2), và bỏ phí thông tin đã được đưa vào (ý 3).",
          "Xử lý đúng: đổi phát hiện thành yêu cầu cụ thể, bảo Claude đưa chi phí chuyển đổi và lo ngại về chất lượng phục vụ vào phần cân nhắc, rồi kiểm bản mới trước khi dùng (ý 4)."
        ] },
      { k: "C", gist: "Reject it, because four sources are not enough for a decision of this size.",
        why: [
          "Sai ở thước đo: vấn đề không nằm ở số nguồn, mà ở cách dùng nguồn. Bộ tài liệu đã có thông tin bất lợi, khuyến nghị bỏ qua nó (ý 1).",
          "Thêm mười nguồn mà vẫn chỉ chọn câu ủng hộ thì vẫn lệch y như cũ. “Bốn nguồn là ít” là ngưỡng tự đặt ra, đề không cho căn cứ nào.",
          "Bỏ hẳn cũng là quá tay: phần ước tính tiết kiệm có thể vẫn dùng được, chỉ cần cân thêm phần đang thiếu (ý 4)."
        ] },
      { k: "D", gist: "It is sound, because every source it cites supports the consolidation.",
        why: [
          "Sai ở chỗ chỉ nhìn thứ được dẫn. Đã chọn nguồn ủng hộ thì nguồn được dẫn đương nhiên ủng hộ kết luận. Lập luận này đi vòng tròn.",
          "Từng câu khớp nguồn không chứng minh cả bản cân bằng (ý 1). Phần bị bỏ không để lại dấu vết nào trong bản nháp (ý 2).",
          "Dễ bị cuốn vì nghe như đã đối chiếu nguồn kỹ. Nhưng đối chiếu từng câu là kiểm đúng sai, không bắt được lệch."
        ] }
    ],
    refs: [
      { label: "Bài 2.2, mục “Bias: thường là thiếu hoặc lệch, không phải câu sai”: từng câu đúng mà cả bản vẫn lệch", href: NOTES + "#l-2-2" },
      { label: "Bài Nền tảng Domain 2, mục “Sáu kiểu lỗi hay gặp”: bỏ sót là kiểu khó thấy nhất", href: NOTES + "#l-2-0" },
      { label: "Bài 2.1, mục “Chấm trên nhiều tiêu chí” và “Biến điều vừa thấy thành prompt tốt hơn”: dùng ngữ cảnh, đổi phát hiện thành yêu cầu", href: NOTES + "#l-2-1" }
    ]
  },
  {
    de: 4, n: 2, total: 119, sub: "6.1", subName: "Việc nào giao cho Claude được",
    answer: "AE",
    ask: "As an operations lead, you are sorting the Claude use cases your team has proposed by whether the team can take them on. Which two proposed use cases are acceptable for the team to pursue with Claude? (Choose two.)",
    scene: [
      "Một trưởng nhóm vận hành xếp loại các cách dùng Claude mà nhóm đề xuất: cái nào nhóm được làm.",
      "Năm đề xuất chia hai loại. Hai cái làm trên dữ liệu đã duyệt và không nhắm vào ai cụ thể: gom chủ đề từ phản hồi khách, soạn tài liệu đào tạo nội bộ. Ba cái chạm vào lĩnh vực rủi ro cao: thăng chức (việc làm), triệu chứng bệnh (y tế), tóm tắt pháp lý gửi khách (pháp lý).",
      "Chỗ khó: C và D đã có người chuyên môn xem lại (bác sĩ, luật sư), nên nghe như đã đủ an toàn."
    ],
    asks: [
      "Hai đề xuất nào nhóm được làm với Claude?",
      "Tức là: xếp từng đề xuất vào vùng. Việc nào là việc dùng bình thường, một nhóm vận hành làm ngay được mà không cần thêm điều kiện?",
      "Soi từng phương án: output có tới một người cụ thể, ảnh hưởng quyền lợi của họ, trong một lĩnh vực rủi ro cao không?"
    ],
    facts: [
      "Ca rủi ro cao (high-risk use case) là lời khuyên hay quyết định về một người cụ thể trong các lĩnh vực như pháp lý, y tế, tài chính, bảo hiểm, nhà ở, việc làm, giáo dục. Usage Policy không cấm, nhưng bắt hai điều kiện.",
      "Hai điều kiện: người có chuyên môn duyệt trước khi output tới người kia hoặc được dùng để quyết định, có quyền sửa; và người nhận lời khuyên, hay người bị quyết định, được báo rõ là có dùng AI. Một điều kiện không thay được điều kiện kia.",
      "Vùng xanh là việc dùng bình thường: soạn, tóm tắt, tổng hợp tài liệu, không khuyên hay quyết về một người cụ thể. Phép thử “kiểm được, sửa được”: lỗi có người thấy và sửa rẻ trước khi gây hại không.",
      "Gộp (aggregate) là đưa số hay ý tổng hợp thay cho từng dòng dữ liệu cá nhân. Đây là một cách tối thiểu hóa dữ liệu: việc vẫn xong mà không lần ra từng người."
    ],
    opts: [
      { k: "A", gist: "Pulling themes out of approved customer feedback, following the aggregation rules.",
        why: [
          "Phản hồi đã được duyệt cho việc này, lại làm theo luật gộp: output là chủ đề chung, không nhắm vào khách nào (ý 4).",
          "Không khuyên hay quyết về một người cụ thể, nên là vùng xanh (ý 3). Làm, rồi kiểm như mọi output."
        ] },
      { k: "B", gist: "Summarizing a team's performance-review notes to inform a manager's promotion decisions.",
        why: [
          "Bản tóm tắt phục vụ thẳng quyết định thăng chức của từng người. Việc làm là lĩnh vực rủi ro cao (ý 1).",
          "Đề xuất không nói gì về người duyệt hay chuyện báo cho người được xét là có dùng AI (ý 2). Nhận xét hiệu suất của cả nhóm lại là dữ liệu nhân sự nhạy cảm.",
          "Dễ bị cuốn vì quản lý vẫn là người quyết. Nhưng tóm tắt nghiêng chỗ nào thì quyết định dễ nghiêng theo chỗ đó, nên đây không phải việc làm ngay như A, E."
        ] },
      { k: "C", gist: "Drafting a preliminary summary of a patient's symptoms to support a clinician's diagnostic review.",
        why: [
          "Triệu chứng của một người, phục vụ chẩn đoán: lĩnh vực y tế, về một người cụ thể (ý 1).",
          "Có bác sĩ xem lại, nhưng đây là nghiệp vụ lâm sàng, không phải việc của một nhóm vận hành. Dữ liệu sức khỏe gắn với một người còn kéo theo quy định riêng như HIPAA, nên không phải việc nhóm làm ngay được."
        ] },
      { k: "D", gist: "Drafting a legal summary that an attorney reviews and edits before it is shared with a client.",
        why: [
          "Bản tóm tắt pháp lý gửi tới khách là lời khuyên pháp lý cho một bên cụ thể (ý 1).",
          "Luật sư duyệt và sửa trước khi gửi là đủ điều kiện người duyệt. Nhưng đề xuất không nói gì về việc báo khách là có dùng AI, mà một điều kiện không thay được điều kiện kia (ý 2).",
          "Dễ bị cuốn vì có người chuyên môn đứng giữa, nghe như đã an toàn. Nhưng người duyệt mới là một nửa yêu cầu, và đây là nghiệp vụ pháp lý, không phải việc thường ngày của nhóm."
        ] },
      { k: "E", gist: "Drafting an internal training summary from approved internal documentation.",
        why: [
          "Nguồn là tài liệu nội bộ đã duyệt, output là tài liệu đào tạo chung, không về ai cụ thể (ý 3).",
          "Sai chỗ nào thì người soạn hay người học thấy và sửa rẻ. Vùng xanh, làm được ngay."
        ] }
    ],
    dispute: "Đề gốc chấm AE, sổ giữ AE. Chữ “acceptable” (được làm) hơi mơ hồ. Usage Policy hiện hành không cấm B, C, D: ca rủi ro cao được làm khi có người chuyên môn duyệt trước và báo người nhận là có dùng AI. Policy còn loại khỏi diện rủi ro cao “internal drafting, research, summarization, or analysis that is not the ultimate High-risk AI Recommendation delivered” (soạn nháp, tóm tắt, phân tích nội bộ chưa phải khuyến nghị cuối gửi đi). C và D lại đã có bác sĩ, luật sư duyệt. Nên lời giải gốc nói ba việc này không phải việc nhóm được làm là hơi mạnh. Hiểu câu hỏi là: hai việc nào một nhóm vận hành làm ngay, không cần thêm điều kiện nào. Đó là A và E.",
    refs: [
      { label: "Bài 6.1, bảng “Ba vùng, mỗi vùng một câu hỏi” và mục “Vùng vàng”: hai điều kiện của ca rủi ro cao, việc không thuộc diện", href: NOTES + "#l-6-1" },
      { label: "Bài 6.2, mục “Ba cách bớt dữ liệu mà việc vẫn xong”: bỏ, đổi mã, gộp", href: NOTES + "#l-6-2" },
      { label: "Usage Policy của Anthropic: High-risk use case requirements", href: "https://www.anthropic.com/legal/aup" }
    ]
  },
  {
    de: 4, n: 3, total: 119, sub: "3.2", subName: "Haiku, Sonnet, Opus khác nhau ở đâu",
    answer: "B",
    ask: "An analyst is working on a one-time, complex problem that genuinely calls for multi-step reasoning across a long chain of thought. Which model fits this work best?",
    scene: [
      "Một chuyên viên phân tích có một bài toán làm một lần, phức tạp.",
      "Đề nói rõ “genuinely calls for multi-step reasoning” (thật sự cần lập luận nhiều bước). Không có ràng buộc nào về tốc độ hay số lượng.",
      "Ba phương án sai đều dựa vào một câu tuyệt đối: “has nothing” (không có gì), “always” (luôn luôn), “the same” (như nhau)."
    ],
    asks: [
      "Model nào hợp nhất với việc này?",
      "Tức là: việc khó, làm một lần, lập luận dài. Tầng nào mạnh nhất ở đúng loại việc đó?"
    ],
    facts: [
      "Haiku, Sonnet, Opus là ba tầng của cùng một họ model. Lên tầng thì lập luận sâu hơn, nhưng chậm hơn và tốn hạn mức hơn.",
      "Việc đơn giản thì ba tầng cho kết quả gần như nhau. Khác biệt lộ ra ở việc khó: nhiều bước, lập luận dài, nhiều ràng buộc.",
      "Hướng dẫn cho người dùng app: Opus hợp với việc phức tạp cần lập luận nâng cao, nghiên cứu sâu. Haiku hợp với việc đơn giản, cần ngay.",
      "Guide v1.0 nói ba tầng. App hiện có thêm Fable 5.1 ở trên Opus. Khi thi nghĩ theo ba tầng của guide."
    ],
    opts: [
      { k: "A", gist: "A model from another vendor, since the Claude lineup has nothing suited to complex reasoning.",
        why: [
          "Sai sự thật: chính dòng Claude có tầng dành cho lập luận nâng cao (ý 3).",
          "Đổi nền tảng là né câu hỏi chọn tầng mà đề đặt ra."
        ] },
      { k: "B", gist: "Opus, since it is positioned as the most capable tier for advanced reasoning on complex, specialized tasks.",
        why: [
          "Đúng. Lập luận nhiều bước, chuỗi suy nghĩ dài là đúng loại việc Opus được khuyên dùng (ý 3), và là chỗ khác biệt giữa các tầng lộ ra (ý 2).",
          "Chậm hơn, tốn hạn mức hơn (ý 1), nhưng chỉ làm một lần, nên đáng đổi.",
          "“Specialized” (chuyên sâu) ở đây là độ khó, không phải ngành. Không có tầng nào chuyên một lĩnh vực."
        ] },
      { k: "C", gist: "Haiku, since lightweight models are always the better choice whatever the complexity.",
        why: [
          "Sai ở chữ “always” (luôn luôn). Haiku nhanh và nhẹ, hợp việc đơn giản (ý 3). Việc khó là chỗ tầng nhẹ dễ hụt (ý 2).",
          "Việc chỉ làm một lần, nên tiết kiệm chút hạn mức không bù được một phân tích sai."
        ] },
      { k: "D", gist: "Any model, since reasoning depth is the same across the lineup.",
        why: [
          "Sai sự thật: các tầng khác nhau ở độ sâu lập luận (ý 1).",
          "Dễ bị cuốn vì ba tầng có cùng context 1M token, cùng mốc kiến thức. Nhưng thông số giới hạn giống nhau không có nghĩa năng lực giống nhau, và việc khó chính là chỗ khác biệt lộ ra (ý 2)."
        ] }
    ],
    dispute: "Đề gốc chấm B, giữ nguyên. “Most capable” (mạnh nhất) chỉ đúng trong ba tầng guide v1.0 nêu. App hiện có Fable 5.1 ở trên Opus (ý 4), nhưng Fable không có trong các phương án. Khi thi chọn theo ba tầng.",
    refs: [
      { label: "Bài 3.2, bảng ba tầng và mục “Khoảng cách lộ ra ở việc khó”", href: NOTES + "#l-3-2" },
      { label: "Bài 0.3, luật 4: khớp model với việc, để model mạnh nhất cho lập luận phức tạp", href: NOTES + "#l-0-3" },
      { label: "Bài 8.3: guide có ba tầng, app có thêm Fable; khi thi trả lời theo guide", href: NOTES + "#l-8-3" }
    ]
  },
  {
    de: 4, n: 4, total: 119, sub: "6.2", subName: "Dữ liệu nhạy cảm và quy định",
    answer: "AB",
    ask: "A customer-success associate at Noventra, Ltd. is about to upload a customer file so Claude can analyze it with Code Execution, and first reviews the planned task. Which two practices are most in line with sound data handling? (Choose two.)",
    scene: [
      "Một nhân viên chăm sóc khách hàng sắp tải file của khách lên để Claude phân tích bằng Code Execution (tính năng chạy code, nay gọi là “Create and edit files”).",
      "File có thể chứa trường dữ liệu được quản lý, mà chính sách công ty bắt che trước khi chạy code.",
      "Chỗ khó: ba phương án sai đều dựa vào một lý do nghe có vẻ ổn: “urgent” (đang gấp), “internal” (dùng nội bộ), “sandboxed” (chạy trong môi trường cách ly)."
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
      "Code execution chạy code trong một môi trường cách ly. Cách ly là chuyện code chạy ở đâu; nó không làm dữ liệu bớt nhạy cảm, không thay được chính sách. “Chỉ dùng nội bộ” cũng không phải lý do được phá chính sách."
    ],
    opts: [
      { k: "A", gist: "Confirm the planned Code Execution task fits the organization's data-classification policy, and escalate to the right contact if the data is more sensitive than approved use allows.",
        why: [
          "Đúng câu hỏi đầu tiên trước khi gửi: dữ liệu này thuộc nhóm nào, chính sách cho làm gì với nó (ý 2).",
          "Vượt mức được phép thì không tự quyết mà chuyển lên đúng người. Việc vẫn đi tiếp được khi người có thẩm quyền đồng ý, không bỏ ngang."
        ] },
      { k: "B", gist: "Go through the file for sensitive, confidential, or regulated fields before uploading, and remove or redact any that the planned analysis does not need.",
        why: [
          "Đúng tối thiểu hóa dữ liệu: bỏ hoặc che phần việc phân tích không cần, và làm trước khi gửi (ý 1, 3).",
          "Phân tích vẫn chạy được trên phần còn lại. Đây cũng là đáp án câu mẫu 3 của guide: xử lý dữ liệu trước khi tải lên, không bỏ việc."
        ] },
      { k: "C", gist: "Skip reviewing the upload because the work is urgent, even though the file may hold regulated fields that policy says must be redacted before any code runs.",
        why: [
          "Sai ở chỗ để chuyện gấp gạt bước bắt buộc. Chính phương án đã nói: chính sách bắt che các trường đó trước khi chạy code.",
          "Gửi rồi mới biết file có trường được quản lý thì đã muộn, dữ liệu đã nằm trong chat (ý 1)."
        ] },
      { k: "D", gist: "Bypass the classification policy because the task is internal, treating sandboxed processing as exempt from the review the policy requires before sensitive data is uploaded.",
        why: [
          "Gộp hai lý do sai: “internal” (nội bộ) và “sandboxed” (cách ly). Không cái nào là ngoại lệ mà chính sách cho phép (ý 4).",
          "Chính sách bắt kiểm trước khi tải dữ liệu nhạy cảm lên. Tự cho mình được miễn là phá đúng bước đó."
        ] },
      { k: "E", gist: "Upload the whole customer file unreviewed and unredacted, assuming a sandboxed environment removes the need to apply the classification policy.",
        why: [
          "Sai ở giả định: môi trường cách ly là nơi code chạy, không phải giấy phép bỏ qua chính sách (ý 4).",
          "Gửi nguyên file là gửi cả những cột việc phân tích không cần (ý 3). Đã tải lên thì không rút lại hết được (ý 1).",
          "Dễ bị cuốn vì “sandboxed” nghe như đã an toàn sẵn. Nhưng an toàn cho hệ thống xung quanh khác với được phép đưa dữ liệu khách vào."
        ] }
    ],
    refs: [
      { label: "Bài 6.2, mục “Kiểm trước khi gửi” và “Ba cách bớt dữ liệu mà việc vẫn xong”", href: NOTES + "#l-6-2" },
      { label: "Bài Nền tảng Domain 6, mục “Chính sách AI của tổ chức”: phân loại dữ liệu và đường chuyển lên", href: NOTES + "#l-6-0" },
      { label: "Bài Nền tảng Domain 3, định nghĩa Code execution: chạy code trong môi trường cách ly", href: NOTES + "#l-3-0" }
    ]
  },
  {
    de: 4, n: 5, total: 119, sub: "7.3", subName: "Tối ưu quy trình",
    answer: "CE",
    ask: "You are judging proposed changes to a recurring Claude workflow to decide whether each one actually makes the workflow better. Which two changes meaningfully improve the workflow? (Choose two.)",
    scene: [
      "Một quy trình dùng Claude chạy lặp lại. Có năm đề xuất thay đổi, cần chọn hai cái thật sự làm quy trình tốt hơn.",
      "Chỗ khó: ba đề xuất là dọn dẹp tên gọi, nhãn bước, đề mục. Chúng làm tài liệu dễ đọc hơn, nên nghe cũng như cải tiến.",
      "Đề nói “meaningfully improve” (cải thiện thật sự): thay đổi phải làm khác đi cách Claude làm việc, hoặc chất lượng thứ đi ra."
    ],
    asks: [
      "Hai thay đổi nào cải thiện thật sự một quy trình Claude chạy lặp lại?",
      "Tức là: thay đổi nào bớt được công sức, hạn mức ở mỗi lần chạy, hoặc chặn được output kém trước khi nó đi tiếp.",
      "Soi từng phương án: Claude hay output có khác đi không, hay chỉ tài liệu trông gọn hơn?"
    ],
    facts: [
      "Project knowledge là tư liệu dùng chung cho mọi chat trong Project. Tải một lần thì chat nào trong Project cũng dùng được, không phải dán lại.",
      "Tải cùng file vào mỗi chat mới làm hao hạn mức. Cách giảm: đưa vào project knowledge một lần; nội dung Project được lưu đệm (caching), dùng lại thì tính ít hơn vào hạn mức.",
      "Lỗi ở một bước chảy xuống mọi bước sau. Đặt điểm kiểm ở output sắp được bước sau dùng, trước khi đi tiếp.",
      "Tối ưu quy trình đo bằng hai thứ: thời gian tiết kiệm được, và chất lượng giữ được (tỉ lệ output dùng được không phải làm lại, số lỗi bắt được)."
    ],
    opts: [
      { k: "A", gist: "Renaming the team's shared workspace so it matches the new workflow process.",
        why: [
          "Đổi tên chỗ làm việc chung không đổi thứ gì Claude nhận, cũng không đổi output nào đi ra (ý 4).",
          "Thời gian mỗi lần chạy và chất lượng đầu ra vẫn y như cũ."
        ] },
      { k: "B", gist: "Giving each workflow step a descriptive label so new team members can follow it more easily.",
        why: [
          "Nhãn bước rõ giúp người mới đọc dễ hơn. Đó là lợi ích có thật, nhưng là chuyện trình bày tài liệu.",
          "Claude vẫn nhận cùng một đầu vào, output không được kiểm thêm chỗ nào (ý 4).",
          "Dễ bị cuốn vì nghe như cải tiến cho cả nhóm. Nhưng đề hỏi thay đổi làm quy trình tốt hơn đáng kể, không hỏi tài liệu dễ đọc hơn."
        ] },
      { k: "C", gist: "Moving the standard reference material into a Project so it no longer has to be supplied again each time.",
        why: [
          "Tư liệu chuẩn nằm trong project knowledge thì chat nào trong Project cũng dùng được, không phải dán lại mỗi lần (ý 1).",
          "Bớt công sức và hạn mức ở mỗi lần chạy (ý 2). Mọi lần chạy cũng dùng cùng một bản tư liệu, không lệch theo chuyện người dán nhớ dán gì."
        ] },
      { k: "D", gist: "Reordering the section headings of the workflow document so it is easier to navigate.",
        why: [
          "Đề mục gọn giúp tìm trong tài liệu nhanh hơn, nhưng Claude và output không đổi gì (ý 4).",
          "Cùng loại với A, B: dọn dẹp hình thức."
        ] },
      { k: "E", gist: "Adding a quality check on outputs before they enter the downstream process.",
        why: [
          "Đặt điểm kiểm đúng chỗ: trước khi output đi vào bước sau. Output kém bị chặn lại, không lan xuống (ý 3).",
          "Nó giữ chất lượng, một trong hai thước đo của tối ưu quy trình (ý 4). C và E bổ sung nhau: C làm mỗi lần chạy nhẹ hơn, E giữ chất lượng thứ đi ra."
        ] }
    ],
    refs: [
      { label: "Bài 7.3, bảng “Cái gì làm hao hạn mức”: file dùng lại thì đưa vào Project; mục “Đo trước khi đổi, đo sau khi đổi”", href: NOTES + "#l-7-3" },
      { label: "Bài 1.2, mục “Đặt điểm kiểm ở đâu”: lỗi bước trước chảy xuống bước sau", href: NOTES + "#l-1-2" },
      { label: "Help center: tạo và quản lý Project, knowledge dùng chung cho mọi chat", href: "https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects" }
    ]
  },
  {
    de: 4, n: 6, total: 119, sub: "2.3", subName: "Kiểm từng khẳng định",
    answer: "A",
    ask: "You are assessing a report Claude produced that keeps a confident tone from beginning to end. Which question does the most to separate plausibility from verification?",
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
      { k: "A", gist: "Can each specific claim be traced back to a credible source or to the input material that was supplied?",
        why: [
          "Đúng định nghĩa kiểm chứng: đem từng khẳng định so với nguồn đáng tin hoặc tài liệu đầu vào (ý 2, 3).",
          "Câu nào không truy được về nguồn thì lộ ra ngay, dù viết chắc đến đâu (ý 1). Chỉ câu hỏi này tách được nghe có vẻ đúng với đã kiểm."
        ] },
      { k: "B", gist: "Does the report open with a clear, well-framed statement of its main finding?",
        why: [
          "Mở bài rõ là chuyện trình bày (ý 4). Một kết luận sai vẫn có thể được nêu rất rõ ở câu đầu.",
          "Câu mở càng chắc càng dễ làm người đọc tin, đúng cái giọng tự tin mà đề đang nhắc (ý 1)."
        ] },
      { k: "C", gist: "Does the report cover the subject comprehensively, judging by its length and how many sections it has?",
        why: [
          "Đo độ đủ bằng độ dài và số mục là đo hình thức (ý 4). Báo cáo dài, nhiều mục vẫn có thể thiếu đúng phần được hỏi.",
          "Dễ bị cuốn vì “comprehensively” (đầy đủ) nghe giống kiểm độ đủ. Nhưng kiểm độ đủ là so với yêu cầu, không phải đếm trang. Và nó không chạm tới chuyện từng câu có căn cứ không."
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
    de: 4, n: 7, total: 119, sub: "5.1", subName: "Dựng Project: instructions và knowledge",
    answer: "AE",
    ask: "As a marketing manager, you are deciding what to write into the custom instructions of a Project dedicated to writing work. Which two items belong in those custom instructions? (Choose two.)",
    scene: [
      "Một quản lý marketing dựng Project cho việc viết, đang chọn thứ gì đưa vào custom instructions (chỉ dẫn riêng của Project).",
      "Các thứ được đưa ra gồm: giọng thương hiệu, một bài viết mẫu từ trước, độ dài ưa thích cho tin nhắn nội bộ, văn phong ưa thích của người duyệt, khung và độ dài chuẩn của sản phẩm viết.",
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
      { k: "A", gist: "The brand voice and the tone expectations that the writing has to follow.",
        why: [
          "Đúng. Giọng là cách làm, và là chuẩn của thương hiệu, không phải của riêng ai (ý 1).",
          "Mọi bài viết của Project đều phải theo, nên đây đúng là thứ đặt sẵn cho mọi chat (ý 3). Sổ tay thương hiệu dài, nếu có, vẫn để trong knowledge, còn instructions nói phải viết theo nó (ý 2)."
        ] },
      { k: "B", gist: "A representative piece of past writing that shows the team's preferred style and structure.",
        why: [
          "Sai chỗ đặt: một bài viết cũ là tư liệu, chỗ của nó là project knowledge (ý 1, 2). Instructions chỉ cần một dòng: viết theo giọng và khung của bài mẫu trong knowledge.",
          "Dễ bị cuốn vì ví dụ giúp Claude viết đúng kiểu, và bài 5.3 có khuyên đưa vài ví dụ ngắn vào chỉ dẫn. Nhưng đề hỏi thứ thuộc về instructions. Một bài viết hoàn chỉnh là tài liệu tham khảo, đúng loại “mẫu văn bản” mà bài 5.1 xếp vào knowledge."
        ] },
      { k: "C", gist: "The prompt author's preferred reply length for internal messages that have nothing to do with external deliverables.",
        why: [
          "Sai ở phạm vi: tin nhắn nội bộ không phải việc của Project này, vốn để viết sản phẩm gửi ra ngoài. Đề còn nói thẳng “nothing to do with” (không liên quan gì).",
          "Lại là ý thích riêng của người viết prompt (ý 4). Đưa vào instructions thì mọi bài viết của mọi người trong Project bị kéo theo một luật không dành cho chúng (ý 3)."
        ] },
      { k: "D", gist: "The personal writing style of the marketing manager who reviews every final deliverable.",
        why: [
          "Sai ở chỗ đây là sở thích riêng của một người, dù người đó duyệt mọi bài (ý 4). Chuẩn của cả nhóm là giọng thương hiệu.",
          "Đưa vào instructions thì sở thích đó thành luật cho mọi bài của mọi người, và có thể va với giọng thương hiệu (ý 3). Người duyệt muốn đổi gì thì sửa ở chuẩn chung, có thống nhất.",
          "Dễ bị cuốn vì người này duyệt mọi bài, viết theo ý họ nghe như đỡ phải sửa. Nhưng instructions ghi chuẩn chung, không ghi khẩu vị của người chấm."
        ] },
      { k: "E", gist: "The standard structure and expected length of typical deliverables.",
        why: [
          "Đúng. Khung và độ dài chuẩn là định dạng, một loại cách làm (ý 1).",
          "Nó lặp lại ở gần như mọi bài viết của Project, nên đặt sẵn một lần thay vì dặn lại mỗi chat (ý 3)."
        ] }
    ],
    dispute: "Đề gốc chấm AE, sổ giữ AE. Nhưng lời giải gốc dẫn trang trợ giúp của ChatGPT (“Projects in ChatGPT”), không phải của Claude, nên không dùng làm căn cứ. Help center của Claude (trang “What are projects?”) tả project instructions là để “further tailor Claude's responses” (chỉnh thêm cách Claude trả lời), ví dụ dùng giọng trang trọng hơn. Còn knowledge là chỗ tải tài liệu, văn bản, file lên để Claude hiểu bối cảnh. Hai ý đó đủ để chọn A và E.",
    refs: [
      { label: "Bài 5.1, bảng “Instructions hay knowledge”: cách làm vào instructions, tư liệu (kể cả mẫu văn bản) vào knowledge", href: NOTES + "#l-5-1" },
      { label: "Bài 5.3, bảng “Cái gì đáng thành chỉ dẫn”: giọng, định dạng chuẩn, ràng buộc lâu dài thì đặt sẵn", href: NOTES + "#l-5-3" },
      { label: "Help center: What are projects? (instructions chỉnh cách trả lời, knowledge chứa tài liệu)", href: "https://support.claude.com/en/articles/9517075-what-are-projects" }
    ]
  },
  {
    de: 4, n: 8, total: 119, sub: "1.2", subName: "Chia việc lớn thành chuỗi bước",
    answer: "D",
    ask: "A knowledge worker split a request to “draft a board memo” into fifteen small steps and now finds the result reads as disjointed, because related ideas ended up in separate steps. Which adjustment is most appropriate?",
    scene: [
      "Một nhân viên văn phòng chia yêu cầu “draft a board memo” (soạn bản ghi nhớ gửi hội đồng quản trị) thành 15 bước nhỏ.",
      "Kết quả đọc rời rạc: những ý liên quan nhau bị tách sang các bước khác nhau.",
      "Chỗ khó: chia bước vốn là cách đúng cho việc lớn. Cái hỏng ở đây là chia quá nhỏ, cắt ngang chỗ các ý dính vào nhau."
    ],
    asks: [
      "Nên chỉnh thế nào?",
      "Tức là: giữ được lợi ích của việc chia, mà không tách những ý cần đi cùng nhau.",
      "Soi từng phương án: nó sửa đúng chỗ hỏng (ý liên quan bị tách), hay đi ngược hẳn, hay làm nặng thêm?"
    ],
    facts: [
      "Chia việc (task decomposition) là tách việc lớn thành các bước, mỗi bước một việc rõ ràng. Phần độc lập làm riêng được rồi gộp lại.",
      "Các phần dính chặt vào nhau mà bị tách ra thì bước nào cũng thiếu thông tin. Chỗ đó nên giữ chung một bước.",
      "Chia có giá: thêm lượt chat, thêm thời gian, thêm hạn mức. Chia ở chỗ cần kiểm giữa chừng, không chia theo thói quen hay cho thật nhiều.",
      "Phần phụ thuộc cần kết quả của phần trước, nên phải làm sau. Thứ tự các bước là một phần của cách chia."
    ],
    opts: [
      { k: "A", gist: "Fold the original request back into a single unstructured sentence.",
        why: [
          "Đi ngược sang cực kia: bỏ cả cấu trúc lẫn chỗ kiểm giữa chừng (ý 1). Memo cho hội đồng có nhiều phần, dồn vào một câu không cấu trúc thì dễ bỏ sót, dễ rối.",
          "Cái hỏng là chia sai chỗ, không phải chuyện chia. Sửa đường chia, không vứt nó đi.",
          "Dễ bị cuốn vì gộp lại đúng là chữa được chuyện rời rạc. Nhưng gộp thành một câu là mất luôn phần chia có ích."
        ] },
      { k: "B", gist: "Break each small step into ten even smaller steps for extra precision.",
        why: [
          "Làm nặng thêm đúng chỗ hỏng: bước càng nhỏ thì ý liên quan càng bị tách xa nhau (ý 2).",
          "Từ 15 lên 150 bước là gấp mười lần lượt chat, thời gian, hạn mức (ý 3), mà memo càng vụn."
        ] },
      { k: "C", gist: "Drop all sequencing so the steps run in random order.",
        why: [
          "Bỏ thứ tự thì bước sau có thể chạy trước bước nó phụ thuộc (ý 4).",
          "Memo rời rạc vì ý bị tách. Xáo thứ tự không gom ý lại, chỉ làm rối thêm."
        ] },
      { k: "D", gist: "Merge related steps into fewer, cohesive sections that keep naturally connected ideas together.",
        why: [
          "Sửa đúng chỗ hỏng: ý liên quan về chung một phần, nên mỗi phần đủ thông tin để viết mạch lạc (ý 2).",
          "Vẫn giữ cấu trúc của memo và chỗ kiểm giữa các phần (ý 1), lại bớt số lượt (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, bảng “Khi nào nên chia, khi nào giữ một prompt”: phần dính chặt tách ra thì bước nào cũng thiếu thông tin; chia có giá", href: NOTES + "#l-1-2" }
    ]
  },
  {
    de: 4, n: 9, total: 119, sub: "2.3", subName: "Kiểm từng khẳng định",
    answer: "A",
    ask: "A knowledge worker is reviewing a brief Claude wrote. It asserts a “well-known industry standard” but names no source for it. How should this claim be handled?",
    scene: [
      "Một bản brief (bản tóm tắt ngắn) Claude soạn có nhắc tới một “well-known industry standard” (chuẩn ngành ai cũng biết), nhưng không nêu tên chuẩn hay nguồn nào.",
      "Chỗ khó: chữ “well-known” làm câu nghe như khỏi cần kiểm. Ba phương án sai đều dựa vào cách câu nghe ra sao."
    ],
    asks: [
      "Xử lý khẳng định này thế nào?",
      "Tức là: một khẳng định chưa có nguồn thì được coi là gì, và có những lối ra nào.",
      "Soi từng phương án: nó dựa vào nguồn, hay dựa vào giọng văn?"
    ],
    facts: [
      "Kiểm chứng là so một khẳng định với nguồn có thẩm quyền, ở đây là văn bản chuẩn gốc hoặc tổ chức ban hành chuẩn. Chưa so thì khẳng định đó là chưa kiểm.",
      "Rút lại (retraction): khẳng định nào không tìm được căn cứ thì xóa đi, đánh dấu chỗ trống, thay vì để câu văn đẹp che nó.",
      "Giọng tự tin, chữ nghe có thẩm quyền chỉ cho biết cách viết. Yêu cầu viết “chắc chắn hơn” không làm giảm bịa, chỉ đổi cách trình bày một câu đoán.",
      "Khẳng định không truy được nguồn là loại dễ sai. Tra không ra nguồn nào thì coi là bịa: bỏ đi, hoặc tìm nguồn thật thay vào."
    ],
    opts: [
      { k: "A", gist: "Treat it as unverified, and either back it with an authoritative reference or take it out.",
        why: [
          "Đúng trạng thái: chưa có nguồn thì là chưa kiểm (ý 1).",
          "Hai lối ra đều đúng: tìm được chuẩn thật từ nguồn có thẩm quyền thì giữ và ghi nguồn; không tìm được thì rút lại (ý 2, 4)."
        ] },
      { k: "B", gist: "Accept it, because the words “well-known” are reassuring.",
        why: [
          "Sai ở chỗ lấy cảm giác yên tâm làm căn cứ. “Well-known” là chữ trong câu, không phải nguồn (ý 3).",
          "Nếu chuẩn đó không có thật, brief mang một khẳng định bịa ra ngoài, dưới tên người duyệt."
        ] },
      { k: "C", gist: "Republish the brief as it is, because the claim sounds authoritative.",
        why: [
          "Nghe có thẩm quyền không phải bằng chứng (ý 3). Đăng lại nguyên bản là đem một câu chưa kiểm ra ngoài.",
          "Dễ bị cuốn vì câu viết trơn tru, đúng kiểu văn chuyên nghiệp. Nhưng chi tiết bịa cũng đọc lên trơn tru y như câu đúng."
        ] },
      { k: "D", gist: "Make the claim stronger by phrasing it more confidently.",
        why: [
          "Làm ngược: tăng độ chắc của câu mà không thêm căn cứ nào (ý 3).",
          "Nếu câu sai, người đọc càng tin và càng khó nhận ra."
        ] }
    ],
    refs: [
      { label: "Bài 2.3, khái niệm Retraction và mục “Trước khi Claude viết”: không có căn cứ thì rút lại, viết chắc hơn không giảm bịa", href: NOTES + "#l-2-3" },
      { label: "Bài 2.2, bảng “Ba kiểu lỗi”: khẳng định tra không ra nguồn thì bỏ, hoặc tìm nguồn thật thay vào", href: NOTES + "#l-2-2" },
      { label: "Bài Nền tảng Domain 2, mục “Kiểm là so với một nguồn nằm ngoài Claude”", href: NOTES + "#l-2-0" }
    ]
  },
  {
    de: 4, n: 10, total: 119, sub: "1.2", subName: "Chia việc lớn thành chuỗi bước",
    answer: "A",
    ask: "You are decomposing a request to “build a customer journey map” into these steps: (1) identify the touchpoints the customer goes through within each stage; (2) define the persona and the scope of the journey to be mapped; (3) record pain points and opportunities at every touchpoint; (4) combine the findings into the finished journey map; (5) identify the main stages the persona moves through. Which sequence of the decomposed steps is correct?",
    scene: [
      "Yêu cầu “build a customer journey map” (vẽ bản đồ hành trình khách hàng) được chia thành năm bước, đánh số 1–5 không theo thứ tự làm.",
      "Bốn phương án là bốn cách xếp năm số đó. Cả bốn đều để bước 3 và bước 4 ở cuối; chỗ khác nhau là ba bước đầu.",
      "Chỗ khó: các bước lồng vào nhau. Touchpoint (điểm chạm: chỗ khách gặp doanh nghiệp, như trang web, tổng đài) nằm trong từng giai đoạn. Pain point (điểm khó chịu của khách) gắn vào từng điểm chạm. Phải nhìn ra cái nào chứa cái nào."
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
      { k: "A", gist: "2 → 5 → 1 → 3 → 4: persona and scope, then the stages, then the touchpoints, then pain points and opportunities, then the finished map.",
        why: [
          "Đúng. Đi từ khung ra chi tiết: persona và phạm vi (2) → giai đoạn (5) → điểm chạm trong từng giai đoạn (1) → điểm khó chịu tại từng điểm chạm (3) → gộp thành bản đồ (4) (ý 2, 3).",
          "Mỗi bước nhận đủ thứ nó cần từ bước trước (ý 1). Bước gộp đứng cuối, nên chỉ làm trên chất liệu đã có và đã kiểm."
        ] },
      { k: "B", gist: "1 → 2 → 5 → 3 → 4: touchpoints first, then persona and scope, then the stages, then pain points, then the finished map.",
        why: [
          "Liệt kê điểm chạm “within each stage” (trong mỗi giai đoạn) (1) ngay bước đầu, khi chưa có persona, phạm vi hay giai đoạn nào (ý 2, 3).",
          "Điểm chạm của ai, nằm trong giai đoạn nào đều chưa rõ. Tới bước 2 và 5, danh sách đó có khi phải làm lại."
        ] },
      { k: "C", gist: "5 → 2 → 1 → 3 → 4: the stages first, then persona and scope, then touchpoints, then pain points, then the finished map.",
        why: [
          "Liệt kê giai đoạn (5) trước khi có persona và phạm vi (2). Giai đoạn của ai, hành trình bắt đầu và dừng ở đâu còn chưa rõ (ý 2).",
          "Persona đổi thì giai đoạn có thể đổi theo, nên bước 5 có khi phải làm lại.",
          "Dễ bị cuốn vì ba bước cuối (1, 3, 4) giống hệt đáp án đúng. Nhưng chỉ cần đảo hai bước đầu là cả chuỗi đứng trên một cái khung chưa đặt."
        ] },
      { k: "D", gist: "2 → 1 → 5 → 3 → 4: persona and scope, then touchpoints, then the stages, then pain points, then the finished map.",
        why: [
          "Liệt kê điểm chạm “within each stage” (trong mỗi giai đoạn) (1) khi chưa có giai đoạn nào (5) (ý 3).",
          "Điểm chạm không có giai đoạn để xếp vào, tới bước 5 lại phải chia lại."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, khái niệm “Phần độc lập, phần phụ thuộc” và mục “Bước sau cần nhận gì”: phần phụ thuộc làm sau, bước nào cũng cần mục tiêu gốc", href: NOTES + "#l-1-2" }
    ]
  },
  {
    de: 4, n: 11, total: 119, sub: "1.1", subName: "Viết prompt rõ yêu cầu, lý do, nguồn, mẫu",
    answer: "C",
    ask: "A knowledge worker wants to fix a prompt that keeps giving weak results, and decides to apply the Description competency from the AI Fluency Framework. Which revision best reflects what Description calls for?",
    scene: [
      "Một nhân viên văn phòng có một prompt cho kết quả kém. Chị muốn sửa nó theo năng lực Description (mô tả) của khung AI Fluency.",
      "Bốn phương án là bốn cách sửa: bỏ bớt phần mô tả, làm loãng lời dặn, nói rõ thêm, hoặc độn thêm chữ.",
      "Chỗ khó không nằm ở tên khung, mà ở chỗ biết Description đòi mô tả những gì."
    ],
    asks: [
      "Cách sửa nào đúng tinh thần Description nhất?",
      "Tức là: một prompt mô tả tốt phải nói rõ những gì để lần chạy sau ra kết quả dùng được?",
      "Soi từng phương án: nó thêm thông tin Claude cần, bớt đi, hay chỉ làm prompt dài ra?"
    ],
    facts: [
      "AI Fluency là khung năng lực dùng AI do Anthropic soạn, gồm bốn năng lực gọi tắt là 4D: Delegation (giao việc), Description (mô tả), Discernment (đánh giá), Diligence (cẩn trọng, chịu trách nhiệm).",
      "Description: “effectively describing goals to prompt useful AI behaviors and outputs” (mô tả mục tiêu đủ rõ để AI cư xử đúng và cho ra kết quả dùng được). Product Description là mô tả output: định dạng, người đọc, phong cách.",
      "Claude chỉ làm việc với những gì nằm trong context. Chỗ nào prompt bỏ trống, Claude đoán theo kiểu câu trả lời phổ biến nhất, nên output ra chung chung.",
      "Một prompt đủ ý nói rõ: việc và độ sâu, người đọc và mục tiêu, định dạng, ràng buộc, nguồn. Chữ thêm vào mà không mang thông tin nào thì không giúp gì."
    ],
    opts: [
      { k: "A", gist: "Strip out the existing context and send only the bare task, dropping the audience, format and constraint details.",
        why: [
          "Sai hướng: Description đòi nói rõ hơn, phương án này xóa đúng phần mô tả (ý 2).",
          "Không còn người đọc, định dạng, ràng buộc thì Claude phải tự đoán cả ba (ý 3). Output vốn đã kém sẽ còn chung chung hơn."
        ] },
      { k: "B", gist: "Swap the specific instructions for generic wording that widens the scope of the task.",
        why: [
          "Sai hướng: lời dặn cụ thể chính là phần mô tả. Thay bằng chữ chung chung là bỏ nó đi (ý 2).",
          "Phạm vi rộng ra thì Claude càng có nhiều chỗ phải đoán (ý 3), output càng khó ra đúng thứ cần."
        ] },
      { k: "C", gist: "State the task scope, the output format, the audience and the relevant constraints clearly enough that the next run gives a useful, reliable result.",
        why: [
          "Đúng định nghĩa Description: mô tả mục tiêu đủ rõ để ra kết quả dùng được (ý 2). Định dạng và người đọc là phần Product Description; phạm vi và ràng buộc là những giới hạn Claude không tự biết.",
          "Đó cũng là các phần của một prompt đủ ý (ý 4). Chúng lấp đúng những chỗ trước đây Claude phải đoán (ý 3)."
        ] },
      { k: "D", gist: "Make the prompt longer with filler text that adds nothing about scope, format, audience or constraints.",
        why: [
          "Sai ở giả định prompt dài hơn là prompt tốt hơn. Chữ độn không mang thông tin nào (ý 4).",
          "Các chỗ trống cũ vẫn còn nguyên, Claude vẫn đoán như trước (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D1, mục 5 “Ba thứ cần mô tả, theo khung AI Fluency”: Product, Process, Performance Description", href: NOTES + "#l-1-0" },
      { label: "Bài Nền tảng D4, mục 2 “AI Fluency và khung 4D”: định nghĩa Description và ba kỹ năng con", href: NOTES + "#l-4-0" },
      { label: "Bài 1.1, mục “Viết ra những gì đang nằm trong đầu bạn”: việc, người đọc, định dạng, ràng buộc, nguồn", href: NOTES + "#l-1-1" }
    ]
  },
  {
    de: 4, n: 12, total: 119, sub: "3.4", subName: "Context có hạn: chat mới, tóm tắt, lưu lại",
    answer: "B",
    ask: "A knowledge worker is leaving a long conversation that has drifted off course and wants to carry on in a fresh, focused session. The transition steps are: (1) open a new chat and paste in the summary as its starting context; (2) summarize the goals, key decisions and open questions from the long conversation; (3) decide which reference materials need to stay available beyond this chat; (4) put those lasting references into a Project's knowledge, or attach them as needed; (5) check that the new chat is on track before resuming the work. What is the correct order?",
    scene: [
      "Một nhân viên có một chat đã rất dài và trôi lệch khỏi việc chính. Anh muốn chuyển sang một chat mới, gọn.",
      "Năm bước: mở chat mới và dán bản tóm tắt (1), tóm tắt mục tiêu, quyết định, câu hỏi còn mở (2), chọn tài liệu nào cần giữ lâu hơn chat này (3), đưa tài liệu đó vào knowledge của Project hoặc đính kèm (4), kiểm chat mới đã đúng việc chưa (5).",
      "Chỗ khó: bước nào cũng đúng. Phải xét bước nào cần đầu ra của bước nào."
    ],
    asks: [
      "Năm bước nên đi theo thứ tự nào?",
      "Tức là: mỗi bước cần có sẵn gì từ bước trước thì mới làm được.",
      "Soi từng phương án: có bước nào chạy khi thứ nó cần chưa có không?"
    ],
    facts: [
      "Chat đã dài mà câu trả lời bắt đầu lệch thì tóm tắt: liệt kê quyết định, con số, ràng buộc, việc còn mở, rồi mang bản đó sang chat mới.",
      "Chat mới không tự thấy chat cũ. Mở chat mới chỉ “miễn phí” khi thứ quan trọng đã được lưu; chưa lưu mà bỏ chat là bỏ luôn các quyết định trong đó.",
      "Tài liệu mà mọi chat của việc này đều cần thì lưu vào project knowledge: mọi chat trong Project đều thấy. File đính kèm thì chỉ chat đó thấy."
    ],
    opts: [
      { k: "A", gist: "1, 2, 3, 4, 5: open the new chat first, then summarize, then sort out and store the references.",
        why: [
          "Mở chat mới khi chưa có bản tóm tắt để dán vào (ý 1). Chat mới bắt đầu trống, không biết gì về việc cũ (ý 2).",
          "Tài liệu được chọn và lưu sau khi chat mới đã mở, nên chat đó bắt đầu khi chưa có tài liệu nào."
        ] },
      { k: "B", gist: "2, 3, 4, 1, 5: summarize first, decide which references must persist, store them, then open the new chat with the summary and check it.",
        why: [
          "Tóm tắt trước (ý 1). Bản tóm tắt chốt lại mục tiêu và câu hỏi còn mở, tức là phần việc còn lại cần gì. Dựa vào đó mới chọn được tài liệu nào phải giữ.",
          "Chọn xong mới lưu vào Project (ý 3), rồi mới mở chat mới với bản tóm tắt, khi tài liệu đã sẵn (ý 2).",
          "Kiểm chat mới đúng việc đặt cuối, trước khi làm tiếp."
        ] },
      { k: "C", gist: "2, 4, 3, 1, 5: summarize, store references in the Project, then decide which references should persist.",
        why: [
          "Lưu tài liệu vào Project trước khi quyết tài liệu nào cần lưu. Bước 4 cần kết quả của bước 3.",
          "Hậu quả: đưa vào cả tài liệu thừa, hoặc sót tài liệu cần. Tài liệu thừa trong knowledge được nạp vào mọi chat của Project (ý 3), chiếm chỗ vô ích."
        ] },
      { k: "D", gist: "3, 2, 4, 1, 5: decide which references must persist before writing the summary.",
        why: [
          "Chọn tài liệu trước khi tóm tắt. Lúc đó chưa chốt lại phần việc còn lại gồm những gì, nên chưa biết tài liệu nào còn cần.",
          "Dễ bị cuốn vì hai bước chuẩn bị nghe như đổi chỗ được, và D vẫn mở chat mới đúng lúc. Nhưng bước 3 hỏi tài liệu nào cần cho phần sau, mà phần sau gồm gì thì bản tóm tắt mới nói rõ (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, bảng “Mở chat mới, tóm tắt, hay lưu lại”: chat dài lệch hướng thì tóm tắt rồi mang sang chat mới, tài liệu cần lâu thì lưu vào Project", href: NOTES + "#l-3-4" },
      { label: "Bài Nền tảng D5, mục 3 “Ba đường đưa tài liệu cho Claude”: file đính kèm chỉ một chat thấy, knowledge mọi chat thấy", href: NOTES + "#l-5-0" }
    ]
  },
  {
    de: 4, n: 13, total: 119, sub: "4.4", subName: "Đưa Claude vào quy trình đang chạy",
    answer: "BD",
    ask: "An operations assistant is redesigning one step of a weekly, recurring data-processing workflow so that it uses Code Execution. Which two design decisions do most to make this integration reliable? (Choose two.)",
    scene: [
      "Một trợ lý vận hành có quy trình xử lý dữ liệu chạy mỗi tuần. Anh thiết kế lại một bước để dùng Code Execution (Claude chạy code để tính trên file dữ liệu).",
      "Đề hỏi về độ tin cậy: tuần nào cũng chạy, và kết quả đi tiếp tới những người dùng ở bước sau.",
      "Chỗ khó: E nghe có lý vì code chạy trong sandbox (môi trường cách ly) mà không báo lỗi. Phải tách “code chạy xong” với “kết quả đúng”."
    ],
    asks: [
      "Hai quyết định thiết kế nào giúp bước này chạy tin cậy nhất?",
      "Tức là: làm sao để mỗi lần chạy ra kết quả so được, kiểm được, và kết quả sai không lọt xuống bước sau.",
      "Soi từng phương án: nó làm đầu vào, đầu ra ổn định và kiểm được hơn, hay bỏ bớt chỗ kiểm?"
    ],
    facts: [
      "Code execution: Claude chạy code trong môi trường cách ly để tạo file và phân tích file dữ liệu tải lên. Guide gọi là Code Execution; app hiện gọi cài đặt này là “Create and edit files”.",
      "Muốn so kết quả giữa các lần chạy thì đầu vào phải cố định. Đổi input thì không biết output khác đi vì cách làm, hay vì input khác.",
      "Chạy được chưa phải là đúng. Khuôn gọn chỉ cho biết hình dạng output, không cho biết giá trị bên trong có đúng không. Một con số nằm đúng cột vẫn có thể sai.",
      "Đưa Claude vào quy trình thì giao phần làm, giữ phần quyết: giữ bước duyệt, vài lần chạy ổn chưa đủ để bỏ nó. Output đi vào bước khác thì phải nói rõ khuôn và tên trường mà nơi nhận đòi."
    ],
    opts: [
      { k: "A", gist: "Let the input file format change from week to week to suit the different source systems that send the data.",
        why: [
          "Sai ở giả định: đầu vào đổi khuôn mỗi tuần thì kết quả các tuần không so được với nhau (ý 2).",
          "Tuần nào cũng là một ca mới chưa ai thử. Lỗi do khuôn lạ (cột đổi tên, đổi thứ tự) khó phát hiện, vì code có thể vẫn chạy."
        ] },
      { k: "B", gist: "Add a short check in which a human reviewer compares the computed result with an expected range or a sanity check before it goes to downstream users.",
        why: [
          "Lấp đúng chỗ hở: code chạy xong chưa chứng minh kết quả đúng (ý 3). Người duyệt so với khoảng giá trị dự kiến, hoặc một phép thử nhanh xem con số có vô lý không (sanity check).",
          "Đặt trước khi kết quả tới bước sau, đúng lúc còn sửa được, và giữ phần quyết ở người (ý 4)."
        ] },
      { k: "C", gist: "Put the Code Execution step into the workflow without documenting the expected output format or the fields it produces.",
        why: [
          "Sai: không ghi khuôn output và các trường thì bước sau không biết sẽ nhận gì, và không ai kiểm được output có đúng khuôn không (ý 4).",
          "Tuần nào khuôn lệch đi một chút, lỗi trôi xuống bước sau mà không ai thấy."
        ] },
      { k: "D", gist: "Standardize the input format the step expects, so every weekly run gets consistent input and produces output that can be compared and checked across runs.",
        why: [
          "Đầu vào cố định thì lần chạy nào cũng so được với lần trước (ý 2). Con số tuần này lệch hẳn tuần trước là dấu hiệu cần xem, không phải do đổi khuôn.",
          "Đây là nền cho bước kiểm ở B: đầu vào ổn định thì mới đặt được khoảng giá trị dự kiến."
        ] },
      { k: "E", gist: "Drop the human review after Code Execution, because the sandbox already confirms that the code ran without errors.",
        why: [
          "Sai ở giả định: không báo lỗi chỉ cho biết code chạy xong, không cho biết con số đúng với nghiệp vụ (ý 3).",
          "Code có thể chạy trơn tru trên một cột bị đọc nhầm và ra con số sai. Bỏ bước duyệt thì con số đó đi thẳng tới bước sau (ý 4).",
          "Dễ bị cuốn vì “sandboxed” (chạy cách ly) nghe như đã an toàn. Nhưng cách ly là cách chạy code, không phải phép kiểm kết quả."
        ] }
    ],
    refs: [
      { label: "Bài 4.4, mục “Chạy thử một việc thật trước khi mở rộng”: giữ bước duyệt, thử vài ca ổn chưa đủ để bỏ nó", href: NOTES + "#l-4-4" },
      { label: "Bài 4.3, mục “Đánh giá kết quả, không chỉ xem nó chạy”: qua phép kiểm chưa phải là đúng", href: NOTES + "#l-4-3" },
      { label: "Bài Nền tảng D7, mục 4: input thử cố định, đổi input thì không biết output đổi vì đâu", href: NOTES + "#l-7-0" }
    ]
  },
  {
    de: 4, n: 14, total: 119, sub: "2.1", subName: "Đúng và đủ: kiểm chỗ dễ sai trước",
    answer: "AE",
    ask: "You are reviewing a list of proposed criteria for judging a business brief that Claude has written. Which two criteria are valid for evaluating this brief? (Choose two.)",
    scene: [
      "Bạn xét một danh sách tiêu chí đề xuất để chấm một bản brief (bản tóm tắt nghiệp vụ) do Claude viết.",
      "Năm tiêu chí: đúng với tài liệu nguồn đã đưa, giọng văn theo quy chuẩn của tổ chức, số chữ so với chuẩn ngành, có mục tóm tắt cho lãnh đạo hay không, khớp định dạng và độ dài đã yêu cầu.",
      "Chỗ khó: tiêu chí nào cũng đo được. Phải xét nó so output với cái gì, và cái đó có thuộc yêu cầu của việc này không."
    ],
    asks: [
      "Hai tiêu chí nào hợp lệ để chấm bản brief này?",
      "Tức là: tiêu chí nào trả lời đúng hai câu hỏi của việc kiểm: brief có đúng không, và có làm đúng việc được giao không.",
      "Soi từng phương án: tiêu chí so output với nguồn hoặc yêu cầu của chính việc này, hay với một chuẩn ngoài mà đề không nhắc?"
    ],
    facts: [
      "Accuracy (độ chính xác): các khẳng định có khớp nguồn không. Kiểm là so với một nguồn nằm ngoài Claude, ở đây là tài liệu đã đưa.",
      "Task fidelity (làm đúng việc): output có làm đúng việc được giao không. Độ đủ đo bằng chính yêu cầu, kể cả định dạng và độ dài đã dặn.",
      "Docs “Define your success criteria” nêu tiêu chí tốt phải “Relevant” (khớp mục đích của việc và nhu cầu người dùng). Trang đó cũng liệt kê “Tone and style” (giọng, văn phong): output có hợp kỳ vọng và hợp người đọc không.",
      "Tiêu chí lấy chuẩn từ ngoài yêu cầu (chuẩn ngành, một mục không ai đòi) không cho biết brief này có dùng được cho việc này không."
    ],
    opts: [
      { k: "A", gist: "Whether the claims in the brief are factually accurate when checked against the source material that was supplied.",
        why: [
          "Trả lời câu “có đúng không” (ý 1). Brief dựa trên tài liệu đã đưa, nên tài liệu đó là thước để so.",
          "Độ chính xác là mức sàn: brief trôi chảy mà sai một con số thì vẫn hỏng."
        ] },
      { k: "B", gist: "Whether the writing style is consistent with the organization's established tone guidelines.",
        why: [
          "Giọng văn là tiêu chí có thật (ý 3), nên phương án này không vô lý.",
          "Nhưng đề không nói quy chuẩn giọng văn nằm trong yêu cầu hay đã đưa cho Claude. Nó so output với một chuẩn ngoài việc được giao (ý 4), nên yếu hơn A và E, hai tiêu chí bám thẳng vào nguồn và yêu cầu.",
          "Dễ bị cuốn vì công ty nào cũng muốn văn bản đúng giọng. Nhưng chỉ được chọn hai thì chọn hai tiêu chí bắt buộc với mọi bản brief: đúng nguồn, đúng yêu cầu."
        ] },
      { k: "C", gist: "The brief's total word count compared with industry benchmarks for business briefs.",
        why: [
          "Sai ở thước đo: độ dài phải đúng với yêu cầu của việc này (ý 2), không phải với chuẩn ngành (ý 4).",
          "Brief đúng số chữ “chuẩn ngành” vẫn có thể dài gấp đôi mức người đọc cần."
        ] },
      { k: "D", gist: "Whether an executive summary section is present, used as a check of structural completeness.",
        why: [
          "Sai ở chỗ lấy một mục cố định làm thước đo độ đủ. Độ đủ đo bằng yêu cầu (ý 2): yêu cầu không đòi mục tóm tắt thì thiếu nó không phải lỗi.",
          "Có mục tóm tắt cũng không nói gì về chuyện nội dung đúng hay sai."
        ] },
      { k: "E", gist: "Whether the output matches the format and length constraints that were requested.",
        why: [
          "Trả lời câu “có làm đúng việc không” (ý 2). Định dạng và độ dài đã được dặn, nên chấm được rõ ràng.",
          "Cùng với A là đủ hai mặt: đúng với nguồn, đúng với yêu cầu."
        ] }
    ],
    dispute: "Đề gốc chấm AE, sổ giữ AE. Chỗ mơ hồ: trang docs “Define your success criteria” liệt kê “Tone and style” (giọng, văn phong) là một tiêu chí thường dùng, nên B cũng hợp lệ nếu quy chuẩn giọng văn của tổ chức là một phần yêu cầu. Đề không nói điều đó. A và E bám thẳng vào thứ đã cho (nguồn, yêu cầu), nên là hai lựa chọn chắc nhất.",
    refs: [
      { label: "Bài 2.1, mục “Hai câu hỏi tách riêng” và “Chấm trên nhiều tiêu chí”: có đúng không, có làm đúng việc không; bảng tiêu chí của docs", href: NOTES + "#l-2-1" },
      { label: "Docs: Define your success criteria (tiêu chí thường dùng, tiêu chí phải Relevant)", href: "https://platform.claude.com/docs/en/test-and-evaluate/define-success" }
    ]
  },
  {
    de: 4, n: 15, total: 119, sub: "6.2", subName: "Dữ liệu nhạy cảm và quy định",
    answer: "A",
    ask: "An operations team is preparing input so Claude can summarize customer feedback. The feedback file mixes public quotations with customers' personal contact information. What is the most appropriate way to prepare the input?",
    scene: [
      "Nhóm vận hành cần Claude tóm tắt phản hồi của khách.",
      "File phản hồi trộn hai thứ: câu trích công khai của khách, và thông tin liên lạc cá nhân của họ.",
      "Chỗ khó: việc vẫn phải làm xong. Phải chọn cách giữ đủ thứ việc cần, và không gửi thứ việc không cần."
    ],
    asks: [
      "Nên chuẩn bị đầu vào thế nào?",
      "Tức là: bản tóm tắt phản hồi cần phần nào của file, phần nào chỉ là rủi ro?",
      "Soi từng phương án: việc tóm tắt có còn làm được không, và thông tin cá nhân có bị gửi đi khi không cần không?"
    ],
    facts: [
      "Data minimization (tối thiểu hóa dữ liệu): chỉ đưa cho Claude phần dữ liệu mà việc đó thật sự cần.",
      "Trước khi gửi, hỏi: việc này có cần chi tiết định danh không? Phân tích xu hướng, tóm tắt ý kiến thường không cần biết khách là ai.",
      "Anonymize (ẩn danh): bỏ hoặc thay thông tin định danh để không lần ra người thật. Redact (che): xóa phần nhạy cảm trước khi đưa vào.",
      "Đã gửi thì dữ liệu nằm trong chat, theo luật lưu trữ của tài khoản. Mọi quyết định nằm ở trước khi bấm gửi: xử lý dữ liệu trước khi tải lên, không bỏ việc."
    ],
    opts: [
      { k: "A", gist: "Pull out only the feedback text the summary needs, redact or anonymize the personal contact details, and send that trimmed input.",
        why: [
          "Đúng tối thiểu hóa dữ liệu (ý 1): giữ phần phản hồi mà bản tóm tắt cần, bỏ phần bản tóm tắt không cần (ý 2).",
          "Che hoặc ẩn danh thông tin liên lạc trước khi gửi (ý 3, 4). Việc vẫn xong, thông tin cá nhân không đi vào chat."
        ] },
      { k: "B", gist: "Send the whole file unchanged, so Claude has the complete context.",
        why: [
          "Sai ở giả định càng đủ càng tốt. Thông tin liên lạc không giúp gì cho bản tóm tắt (ý 2).",
          "Gửi đi rồi thì nó nằm trong chat, không rút lại được (ý 4).",
          "Dễ bị cuốn vì “complete context” (đủ ngữ cảnh) nghe như làm cho kỹ. Nhưng ngữ cảnh việc này cần là nội dung phản hồi, không phải danh tính người viết."
        ] },
      { k: "C", gist: "Replace the feedback with the contact details and ask Claude to make up the missing feedback.",
        why: [
          "Sai hai lần: vẫn gửi thông tin cá nhân (ý 1), và bảo Claude bịa ra phản hồi.",
          "Bản tóm tắt dựng trên phản hồi bịa không cho biết khách thật nói gì. Nó vô dụng, còn dễ dẫn tới quyết định sai."
        ] },
      { k: "D", gist: "Remove the feedback and send only the personal contact details.",
        why: [
          "Ngược hẳn: bỏ đúng phần việc cần, gửi đúng phần không nên gửi (ý 1, 2).",
          "Không còn phản hồi nào để tóm tắt, còn thông tin cá nhân thì đã gửi đi."
        ] }
    ],
    refs: [
      { label: "Bài 6.2, mục “Ba cách bớt dữ liệu mà việc vẫn xong”: bỏ, đổi mã hoặc che, gộp", href: NOTES + "#l-6-2" },
      { label: "Bài ôn 3 câu mẫu, câu 3 của guide: bỏ hoặc ẩn danh thông tin khách trước khi phân tích", href: NOTES + "#l-8-2" }
    ]
  },
  {
    de: 4, n: 16, total: 119, sub: "5.4", subName: "Giữ cấu hình còn đúng",
    answer: "A",
    ask: "An operations lead notices that a Project's outputs have gradually drifted away from what the team now expects. Which maintenance step should be tried first?",
    scene: [
      "Một trưởng nhóm vận hành thấy output của một Project cứ lệch dần khỏi điều nhóm đang mong đợi.",
      "Chữ quan trọng: “current expectations” (kỳ vọng hiện tại). Chuẩn của nhóm đã đổi theo thời gian, còn cấu hình Project có thể vẫn như ngày dựng.",
      "Chỗ khó: đề hỏi “first” (thử trước tiên). Phải chọn bước rẻ nhất mà nhắm thẳng vào nguyên nhân hay gặp nhất."
    ],
    asks: [
      "Việc bảo trì nào nên thử trước tiên?",
      "Tức là: output lệch ở mọi chat của Project thì thứ gì nhiều khả năng đã cũ, và kiểm nó thế nào?",
      "Soi từng phương án: nó tìm và sửa nguyên nhân, hay đổi thứ khác, hay bỏ qua?"
    ],
    facts: [
      "Project instructions và knowledge được nạp vào mọi chat của Project. Một dòng instructions hay một file đã hết hiệu lực vẫn định hình mọi câu trả lời, nhiều tháng sau khi được đặt vào.",
      "Không có gì tự đánh dấu instructions hay tài liệu là đã cũ. Vì vậy phải rà định kỳ, và rà ngay khi chuẩn hay nguồn thay đổi.",
      "Chẩn đoán đi từ rẻ tới đắt: lời dặn trước, rồi kiến thức (đúng tài liệu, đúng bản mới chưa), model để cuối. Model mạnh hơn không thêm được thông tin bạn chưa đưa; một file cũ vẫn cũ với bất kỳ model nào."
    ],
    opts: [
      { k: "A", gist: "Review the Project's instructions and reference materials against the team's current standards.",
        why: [
          "Nhắm thẳng nguyên nhân hay gặp nhất: instructions và knowledge nạp vào mọi chat (ý 1), mà chuẩn của nhóm đã đổi còn chúng thì không tự đổi theo (ý 2).",
          "Rà là bước rẻ, làm ngay được, và chỉ ra chỗ cần sửa: dòng instructions cũ, file hết hiệu lực, bản trùng (ý 3)."
        ] },
      { k: "B", gist: "Switch the Project to a different Claude model in the hope that it behaves better.",
        why: [
          "Sai thứ tự: model là cần gạt sau cùng (ý 3). Instructions và tài liệu cũ vẫn nằm đó, model nào đọc cũng làm theo chúng.",
          "“in the hope” (với hy vọng) cho thấy đổi khi chưa chẩn đoán. Có thể tốn hạn mức hơn mà output vẫn lệch."
        ] },
      { k: "C", gist: "Keep using the Project and accept the drift as the new baseline.",
        why: [
          "Bỏ hẳn việc bảo trì. Cả nhóm tiếp tục dùng kết quả không còn đúng chuẩn hiện tại.",
          "Nguồn gây lệch vẫn nằm trong mọi chat (ý 1), nên càng để lâu càng lệch xa."
        ] },
      { k: "D", gist: "Retire the Project and rebuild a new one from scratch with fresh content.",
        why: [
          "Quá tay khi chưa biết lệch do đâu. Dựng lại từ đầu là làm lại cả phần cấu hình đang chạy tốt, chỉ vì vài chỗ có thể đã cũ.",
          "Chưa chẩn đoán thì bản mới dễ lặp lại đúng chỗ hổng cũ, rồi cũng cũ đi như bản trước nếu không ai rà (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 5.4, mục “Cấu hình cũ đi thế nào, và nhìn triệu chứng để biết sửa ở đâu”: file cũ, instructions cũ nạp vào mọi chat", href: NOTES + "#l-5-4" },
      { label: "Bài Nền tảng D7, mục 3 “Kiểm theo thứ tự nào: rẻ trước, đắt sau”: model để cuối", href: NOTES + "#l-7-0" }
    ]
  },
  {
    de: 4, n: 17, total: 119, sub: "5.4", subName: "Giữ cấu hình còn đúng",
    answer: "CE",
    ask: "A manager is running a memory-maintenance review for a long-running workflow and deciding what to change. Which two actions best support the quality of Claude's memory over time? (Choose two.)",
    scene: [
      "Một quản lý rà lại memory (những điều Claude ghi nhớ qua các lần chat) cho một quy trình đã chạy lâu.",
      "Đề hỏi giữ chất lượng memory “over time” (theo thời gian), không phải dọn một lần cho xong.",
      "Chỗ khó: ba phương án sai đều xử lý theo kiểu tất cả hoặc không gì: xóa hết, tắt hẳn, để nguyên."
    ],
    asks: [
      "Hai việc nào giữ chất lượng memory tốt nhất theo thời gian?",
      "Tức là: memory phải đúng, còn hợp, đủ thứ quy trình cần, và sửa mà không làm mất thứ còn cần.",
      "Soi từng phương án: nó sửa đúng mục đã cũ, hay xóa luôn cả phần còn đúng?"
    ],
    facts: [
      "Memory: Claude ghi dần các ý thành từng chủ đề trong lúc chat, hoặc khi bạn bảo “nhớ cái này”, rồi dùng lại ở chat sau. Mỗi Project có memory riêng.",
      "Quản lý memory ở Settings → Your Claude: đọc, sửa, xóa từng chủ đề; sửa một chủ đề thì áp cho mọi chat từ đó. Pause giữ memory nhưng ngừng dùng và ngừng ghi. Reset xóa hết, kể cả memory của Project, không hoàn tác được.",
      "Help center ghi có thể “export your Claude memory for backup or migration” (xuất memory ra để sao lưu hoặc chuyển đi): xem memory trong phần Manage, hoặc bảo Claude chép nguyên văn memory, rồi lưu vào một file trên máy. Tính năng nhập, xuất memory còn ở dạng thử nghiệm.",
      "Claude tự cập nhật memory khi chat, nhưng không có gì bảo đảm mục đã cũ tự được sửa. Luật của bài 5.4 áp cho mọi thứ lưu lại: rà định kỳ, sửa đúng chỗ, không đợi có lỗi."
    ],
    opts: [
      { k: "A", gist: "Delete every memory for a clean slate, then let Claude rebuild context naturally over later workflow runs.",
        why: [
          "Xóa cả phần còn đúng cùng phần đã cũ. Reset không hoàn tác được (ý 2).",
          "“rebuild context organically” (tự gây dựng lại dần) nghĩa là các lần chạy tới thiếu thứ quy trình đang cần, và chưa chắc ghi lại đủ như trước."
        ] },
      { k: "B", gist: "Turn Memory off entirely so stale entries can never surface in future runs.",
        why: [
          "Chặn mục cũ bằng cách bỏ luôn memory. Quy trình mất cả những điều đúng đang giúp nó (ý 1).",
          "Đó là né việc bảo trì, không phải giữ chất lượng."
        ] },
      { k: "C", gist: "Find entries that are stale, wrong or no longer relevant and edit or delete them, and add context the workflow still needs that Claude has not captured on its own.",
        why: [
          "Đúng việc bảo trì: sửa hoặc xóa đúng mục cũ, sai, hết liên quan bằng phần quản lý memory (ý 2), giữ nguyên phần còn đúng.",
          "Thêm thứ quy trình vẫn cần mà Claude chưa tự ghi, bằng cách bảo Claude nhớ (ý 1). Memory vừa đúng vừa đủ."
        ] },
      { k: "D", gist: "Leave all memories untouched, since the workflow has run consistently and nobody has reported quality problems.",
        why: [
          "Sai ở giả định chưa ai báo lỗi là chưa có gì cũ. Mục cũ vẫn được dùng như thường cho tới khi có người sửa (ý 4).",
          "Rà định kỳ là để bắt mục cũ trước khi nó thành lỗi output, không đợi có người kêu."
        ] },
      { k: "E", gist: "Export the current memories as a backup before making changes, so earlier context can be restored if an edit removes something the workflow still relies on.",
        why: [
          "Sao lưu trước khi sửa (ý 3): lỡ xóa nhầm một mục quy trình còn dựa vào thì có bản để lấy lại.",
          "Đi cùng C: C sửa cho đúng, E bảo đảm sửa nhầm vẫn gỡ được. Sửa tay nhiều mục dễ lỡ tay, còn Reset thì không hoàn tác được (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, mục “Memory, tìm chat cũ, chat ẩn danh”: đọc, sửa, xóa từng chủ đề; Pause và Reset", href: NOTES + "#l-3-4" },
      { label: "Bài 5.4, mục “Người phụ trách, lịch rà soát”: rà định kỳ và rà ngay khi nguồn đổi", href: NOTES + "#l-5-4" },
      { label: "Help center: Importing and exporting your memory from Claude", href: "https://support.claude.com/en/articles/12123587-importing-and-exporting-your-memory-from-claude" }
    ]
  },
  {
    de: 4, n: 18, total: 119, sub: "3.1", subName: "Chọn tính năng: chat, Project, Research, artifact",
    answer: "C",
    ask: "An HR business partner is setting up a long-lived workspace where a team handbook, a leveling guide and a policies FAQ will be used by several team members across many separate chats. Which Claude feature is designed for this?",
    scene: [
      "Một HR business partner (nhân sự phụ trách một khối) dựng một chỗ làm việc dùng lâu dài.",
      "Ba tài liệu: sổ tay nhóm, khung xếp bậc (leveling guide), FAQ chính sách. Nhiều người trong nhóm dùng chúng qua nhiều chat riêng.",
      "Chỗ khó: phương án nào cũng đưa được tài liệu tới Claude theo một cách. Đề hỏi tính năng được làm ra (“intended”) cho đúng ca này: dùng lâu, nhiều chat, nhiều người."
    ],
    asks: [
      "Tính năng nào được làm ra cho việc này?",
      "Tức là: cùng một bộ tài liệu, dùng đi dùng lại, ở nhiều chat, bởi nhiều người, thì đặt một lần ở đâu để chat nào cũng thấy?",
      "Soi từng phương án: tài liệu có tự có mặt ở mọi chat không, có dùng chung cho cả nhóm không, có phải làm lại mỗi lần không?"
    ],
    facts: [
      "Project: không gian làm việc có lịch sử chat, project knowledge (tài liệu) và project instructions (lời dặn) riêng. Knowledge và instructions áp cho mọi chat trong Project.",
      "Team và Enterprise chia sẻ được Project với hai mức quyền: Can view (xem và chat với Project) và Can edit (sửa instructions, knowledge, quản lý thành viên).",
      "File đính kèm chat: chỉ chat đó thấy. Connector: lấy dữ liệu đúng lúc hỏi, ở chat có bật connector, theo quyền của chính người đang hỏi.",
      "Artifact: nội dung đáng kể, đứng riêng, Claude mở ở khung bên cạnh để sửa, xuất file, chia sẻ. Nó là sản phẩm Claude làm ra, không phải kho tài liệu tự nạp vào các chat."
    ],
    opts: [
      { k: "A", gist: "Connect the team's Google Drive folder that holds the three documents, so the connector brings them into each chat when that chat needs them.",
        why: [
          "Lấy được tài liệu, nhưng không phải tính năng làm ra cho ca này. Connector chạy theo quyền của từng người hỏi, ở chat có bật nó (ý 3); thành viên nào cũng phải tự kết nối và tự có quyền vào thư mục đó.",
          "Không có lời dặn chung cho cả nhóm, cũng không có một chỗ làm việc chung.",
          "Dễ bị cuốn vì tài liệu đã nằm sẵn trên Drive. Nhưng đề cần một chỗ làm việc dùng lâu cho cả nhóm, còn connector chỉ là đường lấy dữ liệu."
        ] },
      { k: "B", gist: "Generate an Artifact containing the three documents, giving the team an editable reference that persists across chats.",
        why: [
          "Sai vai: artifact là sản phẩm Claude làm ra để sửa, xuất, chia sẻ (ý 4). Nó không tự nạp vào mọi chat như knowledge.",
          "Chép ba tài liệu vào artifact là tạo thêm một bản sao, phải giữ cho khớp với bản gốc."
        ] },
      { k: "C", gist: "Create a Project, a persistent workspace with its own knowledge base and custom instructions shared across chats and members.",
        why: [
          "Đúng tính năng: tài liệu vào knowledge, cách làm vào instructions, mọi chat trong Project đều thấy (ý 1).",
          "Chia sẻ Project cho cả nhóm (ý 2): mọi người dùng chung một bộ tài liệu, đặt một lần, không ai phải đính kèm lại."
        ] },
      { k: "D", gist: "Attach the three documents to each chat as needed, since per-chat attachments give that chat direct access without extra setup.",
        why: [
          "File đính kèm chỉ chat đó thấy (ý 3). Chat nào, người nào cũng phải đính kèm lại.",
          "Đó đúng là bước làm tay lặp lại mà Project sinh ra để bỏ. Mỗi người giữ một bản, dễ có người đính kèm bản cũ."
        ] }
    ],
    refs: [
      { label: "Bài 3.1, mục “Project: khi việc lặp lại trên cùng tài liệu”: knowledge và instructions áp cho mọi chat, chia sẻ cho cả nhóm", href: NOTES + "#l-3-1" },
      { label: "Bài Nền tảng D5, mục 3 “Ba đường đưa tài liệu cho Claude”: đính kèm, knowledge, connector khác nhau ở đâu", href: NOTES + "#l-5-0" }
    ]
  },
  {
    de: 4, n: 19, total: 119, sub: "2.3", subName: "Kiểm từng khẳng định",
    answer: "C",
    ask: "An analyst is fact-checking a report written by Claude. Two of the cited sources give different dates for the same event. What is the correct way to handle this?",
    scene: [
      "Một chuyên viên phân tích kiểm dữ kiện trong báo cáo Claude viết.",
      "Hai nguồn được trích ghi hai ngày khác nhau cho cùng một sự kiện.",
      "Chỗ khó: cả hai đều có trích dẫn. Trích dẫn chỉ cho biết xem ở đâu, không cho biết nguồn nào đúng."
    ],
    asks: [
      "Xử lý thế nào là đúng?",
      "Tức là: khi hai nguồn mâu thuẫn, lấy gì làm căn cứ để chốt một ngày?",
      "Soi từng phương án: nó dựa vào một nguồn nắm sự thật đó, hay vào một quy tắc chọn chẳng liên quan tới đúng sai?"
    ],
    facts: [
      "Kiểm chứng (verify): so một khẳng định với nguồn đang thật sự nắm sự thật đó, rồi ghi lại kết quả.",
      "Nguồn có thẩm quyền (authoritative source): nơi gốc của sự thật, như văn bản chính thức, hồ sơ gốc, hoặc người phụ trách mảng đó. Nguồn sơ cấp (primary source) là nguồn từ chính nơi sự việc xảy ra, không qua người kể lại.",
      "Thấy hai giá trị cho cùng một sự việc là thấy mâu thuẫn (inconsistency). Chưa dùng giá trị nào; kiểm với nguồn gốc.",
      "Trích dẫn là con trỏ: cho biết xem ở đâu, chưa cho biết nguồn nói đúng. Còn phải xét nguồn có đáng tin không."
    ],
    opts: [
      { k: "A", gist: "Go with the more recent date, on the basis that newer sources usually reflect updated or corrected information.",
        why: [
          "Sai ở giả định: mới hơn không có nghĩa là đúng hơn. Nguồn sau có thể chép lại lỗi, hoặc tự ghi sai (ý 4).",
          "Chọn theo ngày đăng là chọn bằng quy tắc, chưa so với nơi gốc của sự thật (ý 1).",
          "Dễ bị cuốn vì nghe như lấy bản cập nhật. Nhưng muốn biết nguồn sau có thật là bản đính chính không thì vẫn phải tra nguồn gốc."
        ] },
      { k: "B", gist: "Average the two dates and use the result.",
        why: [
          "Ngày tháng không lấy trung bình được. Ngày trung bình gần như chắc chắn là một ngày không nguồn nào ghi.",
          "Kết quả là một dữ kiện tự đặt ra, sai cả khi một trong hai nguồn đúng."
        ] },
      { k: "C", gist: "Find a primary or authoritative source for the event and use the date that source confirms.",
        why: [
          "Đúng cách xử lý mâu thuẫn: chưa dùng giá trị nào, tra nguồn gốc (ý 3).",
          "Nguồn sơ cấp hay có thẩm quyền là nơi nắm sự thật (ý 2). Lấy ngày theo nó là kiểm chứng thật (ý 1); ghi lại nguồn để người khác kiểm lại được."
        ] },
      { k: "D", gist: "Publish both dates without resolving the conflict and let readers decide.",
        why: [
          "Đẩy việc kiểm sang người đọc, trong khi người đọc có ít thông tin để phân xử hơn người viết.",
          "Mâu thuẫn chưa giải mà đã phát đi là bước kiểm chưa làm xong (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D2, mục 4 “Kiểm là so với một nguồn nằm ngoài Claude”: định nghĩa kiểm chứng và nguồn có thẩm quyền", href: NOTES + "#l-2-0" },
      { label: "Bài 2.2, bảng “Ba kiểu lỗi”: thấy hai giá trị thì chưa dùng giá trị nào, kiểm với nguồn gốc", href: NOTES + "#l-2-2" },
      { label: "Bài 2.3, mục “Trích dẫn là con trỏ, không phải bằng chứng”: mở nguồn, xét nguồn có đáng tin không", href: NOTES + "#l-2-3" }
    ]
  },
  {
    de: 4, n: 20, total: 119, sub: "1.1", subName: "Viết prompt rõ yêu cầu, lý do, nguồn, mẫu",
    answer: "C",
    ask: "A business analyst is turning a stakeholder's request, scribbled on a sticky note, into a structured prompt for Claude. The steps are: (1) confirm who the audience is and what decision the response must support; (2) send the structured prompt to Claude; (3) work out the real task hidden in the sticky-note wording; (4) state the required length, tone and output format; (5) add the facts and constraints that matter for the task. What is the correct order?",
    scene: [
      "Một chuyên viên phân tích nghiệp vụ nhận yêu cầu của một stakeholder (người có liên quan tới việc), viết vội trên giấy nhớ, và phải biến nó thành prompt có cấu trúc.",
      "Năm bước: chốt người đọc và quyết định mà câu trả lời phục vụ (1), gửi prompt (2), tìm ra việc thật nằm sau câu chữ trên giấy nhớ (3), nói rõ độ dài, giọng, định dạng (4), thêm dữ kiện và ràng buộc liên quan (5). Ví dụ minh họa:<pre><code>Giấy nhớ: “Số Q3 miền Nam? Gấp!”\nViệc thật: so doanh thu quý 3 miền Nam với kế hoạch,\nđể giám đốc quyết có tăng ngân sách quảng cáo không.</code></pre>",
      "Chỗ khó: bước 2 rõ ràng đứng cuối. Phải xếp bốn bước còn lại theo chuyện bước nào cần kết quả của bước nào."
    ],
    asks: [
      "Năm bước nên đi theo thứ tự nào?",
      "Tức là: mỗi bước cần biết gì từ bước trước thì mới làm được.",
      "Soi từng phương án: có bước nào làm khi chưa biết việc là gì, hay chưa biết người đọc là ai không?"
    ],
    facts: [
      "Claude chỉ làm việc với những gì nằm trong prompt. Chỗ nào bỏ trống, Claude đoán theo kiểu câu trả lời phổ biến nhất.",
      "Một prompt đủ ý nói rõ: việc và độ sâu, người đọc và mục tiêu (đọc xong họ phải làm được gì), định dạng, ràng buộc, nguồn.",
      "Dữ kiện đáng đưa vào là dữ kiện liên quan tới việc và tới quyết định cần phục vụ. Context nhiều hơn chưa chắc tốt hơn: thứ thừa làm việc chính bị lẫn.",
      "Định dạng đi theo người đọc và nơi nhận: cùng một nội dung, người đọc khác thì độ dài, giọng, cách trình bày khác."
    ],
    opts: [
      { k: "A", gist: "3, 5, 1, 4, 2: find the task, add facts and constraints, then confirm audience and decision, set length, tone and format, send.",
        why: [
          "Thêm dữ kiện trước khi biết người đọc và quyết định cần phục vụ. Chưa biết quyết định là gì thì chưa biết dữ kiện nào liên quan (ý 3).",
          "Hậu quả: đưa thừa hoặc thiếu, rồi phải chọn lại sau khi chốt người đọc.",
          "Dễ bị cuốn vì gom dữ kiện ngay sau khi hiểu việc nghe tự nhiên. Nhưng “relevant” (liên quan) ở đây là liên quan tới quyết định mà người đọc phải đưa ra."
        ] },
      { k: "B", gist: "1, 3, 5, 4, 2: confirm audience and decision first, then find the task, add facts and constraints, set length, tone and format, send.",
        why: [
          "Chốt người đọc và quyết định khi chưa biết việc thật là gì. Câu chữ trên giấy nhớ chưa cho biết đang được nhờ trả lời điều gì, nên chưa có gì để chốt “the decision the response must support” (quyết định mà câu trả lời phục vụ).",
          "Sát đáp án đúng nhất, chỉ đảo bước 1 và 3. Nhưng phải hiểu việc trước, rồi mới hỏi việc đó cho ai và để làm gì."
        ] },
      { k: "C", gist: "3, 1, 5, 4, 2: find the task, confirm audience and decision, add facts and constraints, set length, tone and format, send.",
        why: [
          "Đi đúng chiều phụ thuộc: hiểu việc thật (3), rồi chốt người đọc và quyết định (1), nhờ đó biết dữ kiện nào liên quan (5, ý 3).",
          "Độ dài, giọng, định dạng đặt sau, khi đã biết người đọc (ý 4). Prompt đủ phần rồi mới gửi (2, ý 2)."
        ] },
      { k: "D", gist: "2, 3, 1, 5, 4: send first, then find the task, confirm audience and decision, add facts and constraints, set length, tone and format.",
        why: [
          "Gửi khi prompt chưa có gì ngoài câu chữ giấy nhớ. Claude tự đoán mọi phần còn thiếu (ý 1).",
          "Bốn bước sau chỉnh một prompt đã gửi rồi, nên phải gửi lại lần nữa."
        ] }
    ],
    refs: [
      { label: "Bài 1.1, mục “Viết ra những gì đang nằm trong đầu bạn”: việc, người đọc và mục tiêu, định dạng, ràng buộc, nguồn", href: NOTES + "#l-1-1" },
      { label: "Bài Nền tảng D1, mục 4 “Các phần của một prompt tốt”: thiếu phần nào thì Claude đoán phần đó", href: NOTES + "#l-1-0" }
    ]
  },
  {
    de: 4, n: 21, total: 119, sub: "6.1", subName: "Việc nào giao cho Claude được",
    answer: "D",
    ask: "As a bank manager, you receive a request to make Claude the only decision-maker for approving customers' credit lines. What is the most appropriate response?",
    scene: [
      "Mày là quản lý ngân hàng. Có đề nghị để Claude làm “sole decision-maker” (người quyết định duy nhất) cho việc duyệt hạn mức tín dụng (credit line) của khách.",
      "Duyệt hạn mức tín dụng là quyết định về từng khách cụ thể: cấp hay không, cấp bao nhiêu. Có khách được, có khách bị từ chối.",
      "Chỗ khó: ba phương án sai đều để Claude giữ quyền quyết, chỉ khác lý do: vì nhanh, vì làm luôn phần gửi thông báo, vì chạy thử trước."
    ],
    asks: [
      "Phản hồi nào phù hợp nhất với đề nghị này?",
      "Tức là: tín dụng là ca rủi ro cao, vậy Claude được giữ vai nào, ai giữ quyền quyết cuối.",
      "Soi từng phương án: sau phương án đó, có người có chuyên môn duyệt từng hồ sơ trước khi kết quả tới khách không?"
    ],
    facts: [
      "Ca rủi ro cao (high-risk use case) là lời khuyên hay quyết định về một người cụ thể trong các lĩnh vực Usage Policy liệt kê, trong đó có tài chính và tín dụng. Được dùng Claude, nhưng có hai điều kiện bắt buộc.",
      "Hai điều kiện: người có chuyên môn duyệt output trước khi nó tới người bị ảnh hưởng, có quyền sửa và chịu trách nhiệm. Và người bị quyết định được báo là có dùng AI.",
      "Phép thử “kiểm được, sửa được”: việc hợp với Claude khi lỗi của nó được phát hiện và sửa trước khi gây hại. Kiểm lại sau khi đã gây hại thì không cứu được.",
      "Luật “giao phần làm, giữ phần quyết”: Claude soạn đề xuất cho từng hồ sơ, cán bộ tín dụng duyệt hoặc bác trước khi có hiệu lực. Notes gọi đó là augment (bổ trợ), có người trong vòng (human-in-the-loop)."
    ],
    opts: [
      { k: "A", gist: "Go ahead with Claude as the sole decision-maker, since it can work through applications faster than a team of human reviewers.",
        why: [
          "Sai ở giả định: nhanh hơn là đủ lý do để bỏ người duyệt. Tín dụng là ca rủi ro cao, người có chuyên môn phải duyệt trước (ý 1, 2).",
          "Hồ sơ bị từ chối oan hay cấp sai hạn mức tới thẳng khách, không ai chặn trước (ý 3).",
          "Dễ bị cuốn vì tốc độ là lợi ích thật. Nhưng D vẫn giữ phần lớn tốc độ đó: Claude soạn đánh giá, người chỉ duyệt và quyết."
        ] },
      { k: "B", gist: "Widen the design so that Claude both assesses the applications and sends the final approval notices straight to customers.",
        why: [
          "Sai nặng hơn A: không chỉ quyết thay, Claude còn tự gửi kết quả cho khách. Chỗ cuối cùng có thể chặn lỗi cũng bị bỏ (ý 2, 3).",
          "Thông báo đã tới tay khách thì không rút lại được. Lỗi chỉ lộ ra khi khách khiếu nại."
        ] },
      { k: "C", gist: "Launch the design as a pilot and involve compliance only if problems come up once it is running in production.",
        why: [
          "Sai ở chỗ đổi duyệt trước thành phát hiện sau. Trong lúc chạy thử, quyết định của Claude vẫn tới khách thật mà không ai duyệt (ý 2).",
          "“Only if issues arise” (chỉ khi có vấn đề) nghĩa là chờ khách bị thiệt rồi mới gọi bộ phận tuân thủ. Đó là kiểm sau khi đã gây hại (ý 3).",
          "Dễ bị cuốn vì chạy thử trước khi mở rộng nghe rất bài bản. Nhưng chạy thử là để thử một thiết kế hợp lệ. Thiết kế này thiếu điều kiện bắt buộc ngay từ đầu."
        ] },
      { k: "D", gist: "Turn down the sole-decision-maker design and propose that Claude assist analysts, who keep the authority to decide.",
        why: [
          "Đúng. Từ chối phần không được làm (Claude quyết một mình), và đưa ra cách hợp lệ cho cùng mục tiêu: Claude đánh giá, chuyên viên phân tích duyệt và quyết từng hồ sơ (ý 1, 4).",
          "Người có chuyên môn đứng trước thời điểm kết quả tới khách, nên lỗi của Claude được bắt và sửa kịp (ý 2, 3).",
          "Khi triển khai vẫn phải làm nốt điều kiện thứ hai: báo cho khách là có dùng AI (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 6.1, mục “Vùng vàng: Claude gợi ý, người có chuyên môn quyết”: ca rủi ro cao cần người có chuyên môn duyệt trước và báo là có dùng AI", href: NOTES + "#l-6-1" },
      { label: "Bài 4.4, mục “Bổ trợ hay thiết kế lại quy trình”: ví dụ ngân hàng, cán bộ tín dụng duyệt hoặc bác từng hồ sơ", href: NOTES + "#l-4-4" },
      { label: "Usage Policy, phần yêu cầu cho ca rủi ro cao", href: "https://www.anthropic.com/legal/aup" }
    ]
  },
  {
    de: 4, n: 22, total: 119, sub: "7.3", subName: "Tối ưu quy trình",
    answer: "D",
    ask: "A Claude associate is looking for the bottleneck in a content workflow that takes too long to reach publication. The workflow has five steps (research, drafting, internal review, legal review, publication), and cycle-time figures for each step over the past month are available. Which signal identifies the bottleneck most directly?",
    scene: [
      "Một quy trình làm nội dung chạy quá lâu mới tới lúc đăng. Năm bước nối nhau: nghiên cứu, viết nháp, duyệt nội bộ, duyệt pháp lý, đăng.",
      "Mày phải tìm chỗ thắt cổ chai (bottleneck). Đề cho sẵn số đo cycle time (thời gian chu kỳ) của từng bước trong tháng qua.",
      "Chỗ khó: bốn phương án là bốn tín hiệu: người làm kêu bận, bước mới thêm, hàng chờ dài, thời gian mỗi việc ở từng bước. Hàng chờ dài cũng nghe rất giống chỗ tắc."
    ],
    asks: [
      "Tín hiệu nào chỉ ra chỗ thắt cổ chai trực tiếp nhất?",
      "Tức là: dùng số đo nào để biết bước nào đang giới hạn tốc độ của cả quy trình.",
      "Soi từng phương án: tín hiệu đó đo thẳng tốc độ của bước, hay chỉ là cảm nhận, giả định, hoặc triệu chứng có thể đến từ chỗ khác?"
    ],
    facts: [
      "Chỗ thắt cổ chai (bottleneck) là bước làm chậm nhất, giới hạn tốc độ của cả quy trình. Các bước nối tiếp nhau thì việc không ra khỏi quy trình nhanh hơn bước chậm nhất.",
      "Cycle time (thời gian chu kỳ) của một bước là thời gian bước đó cần để làm xong một việc. Lấy trung bình trên nhiều lượt chạy thì bớt bị vài ca lẻ làm lệch.",
      "Đo trước khi đổi: đừng đoán bước nào đang tốn, xem số liệu rồi mới đổi. Sơ đồ quy trình ghi từng bước ai làm, mất bao lâu, chờ ở đâu.",
      "Hàng chờ (queue) là các việc đang đợi vào một bước. Nó là triệu chứng: có thể do bước đó chậm, cũng có thể do việc dồn về cùng lúc rồi tự vơi."
    ],
    opts: [
      { k: "A", gist: "The step whose contributors say in their weekly status updates that they carry the heaviest workload.",
        why: [
          "Sai ở nguồn tín hiệu: người làm tự kể mức bận là cảm nhận, không phải số đo tốc độ của bước (ý 3).",
          "Bước kêu bận nhất chưa chắc là bước ra việc chậm nhất. Đề đã có số đo cycle time, bỏ số đo để dùng cảm nhận là đi lùi."
        ] },
      { k: "B", gist: "The step that was added to the workflow most recently, on the assumption that process changes cause the most friction.",
        why: [
          "Sai ở chỗ dựa vào giả định thay vì số liệu (ý 3). “Mới thêm thì vướng nhất” chưa ai kiểm.",
          "Bước mới có thể chạy rất nhanh. Sửa nó trong khi bước chậm thật vẫn nằm đó thì quy trình không nhanh lên (ý 1)."
        ] },
      { k: "C", gist: "The step with the longest queue, or the biggest backlog of items waiting to get into it.",
        why: [
          "Có liên quan, nhưng gián tiếp: hàng chờ là triệu chứng, không đo thẳng tốc độ của bước (ý 4).",
          "Hàng chờ có thể dài tạm thời vì việc dồn về một lúc. Nhìn vào một thời điểm thì dễ chỉ nhầm bước.",
          "Dễ bị cuốn vì việc chất đống trước một bước đúng là dấu hiệu hay gặp của chỗ tắc. Nhưng đề hỏi tín hiệu trực tiếp nhất, và đã cho sẵn thời gian từng bước. Hàng chờ dùng để xác nhận, không thay số đo đó."
        ] },
      { k: "D", gist: "The step with the highest average cycle time per item across the past month's runs.",
        why: [
          "Đúng. Cycle time trung bình đo thẳng mỗi bước cần bao lâu cho một việc. Bước lâu nhất là bước giới hạn tốc độ của cả quy trình (ý 1, 2).",
          "Lấy trung bình cả tháng nên không bị vài ngày bất thường làm lệch, và dùng đúng số liệu đề đã cho (ý 3)."
        ] }
    ],
    dispute: "Đề gốc chấm D, sổ giữ D. Notes không dạy cách tìm chỗ thắt cổ chai. Đây là kiến thức quản lý quy trình chung, không riêng gì Claude. Trong thực tế, việc chất đống trước một bước (C) cũng là tín hiệu hay dùng, và câu 9 Đề 2 tìm chỗ thắt cổ chai bằng cả thời gian từng bước lẫn độ dài hàng chờ. Câu này chọn D vì đề hỏi “most directly” (trực tiếp nhất) và đã cho sẵn cycle time của từng bước.",
    refs: [
      { label: "Bài 7.3, mục “Đo trước khi đổi, đo sau khi đổi”: xem số liệu rồi mới đổi, không đoán", href: NOTES + "#l-7-3" },
      { label: "Bài 4.2, mục “Tối ưu quy trình: lời chê của Claude là giả thuyết” và khái niệm sơ đồ quy trình: ai làm, mất bao lâu, chờ ở đâu", href: NOTES + "#l-4-2" }
    ]
  },
  {
    de: 4, n: 23, total: 119, sub: "5.1", subName: "Dựng Project: instructions và knowledge",
    answer: "A",
    ask: "You are setting up a new Claude Project for one specific recurring workload. Which configuration step should be done first?",
    scene: [
      "Mày dựng một Project mới cho một việc lặp lại (recurring workload).",
      "Bốn phương án là bốn bước dựng Project: nói rõ Project để làm gì, mời người và đặt quyền, thêm tài liệu và instructions, chạy thử.",
      "Chỗ khó: bước nào cũng cần làm. Đề hỏi bước nào phải làm trước tiên."
    ],
    asks: [
      "Bước cấu hình nào nên làm đầu tiên?",
      "Tức là: bước nào là đầu vào của mọi bước còn lại.",
      "Soi từng phương án: làm bước đó khi chưa biết Project phục vụ việc gì thì có làm đúng được không?"
    ],
    facts: [
      "Project instructions là lời dặn cách làm, áp cho mọi chat trong Project: vai, việc và phạm vi, người đọc, định dạng, nguồn. Phần “việc và phạm vi” nói Claude làm gì, không làm gì.",
      "Knowledge chỉ nên giữ bản hiện hành, đã duyệt, đúng thứ việc cần. File thừa làm nhiễu chuyện tìm.",
      "Thử instructions bằng một loạt câu hỏi lấy từ việc thật, so với câu trả lời mong đợi viết sẵn.",
      "Chia sẻ Project (gói Team, Enterprise) có hai mức: Can view cho người dùng, Can edit cho người bảo trì. Ai dùng, ai bảo trì tùy vào việc Project phục vụ."
    ],
    opts: [
      { k: "A", gist: "Spell out what the Project is for and which recurring tasks it has to support.",
        why: [
          "Đúng. Mục đích và các việc lặp lại là thước đo cho mọi bước sau: phần “việc và phạm vi” của instructions viết từ đây, tài liệu cho knowledge chọn theo đây (ý 1, 2).",
          "Bước thử cũng cần nó: câu hỏi thử lấy từ chính các việc đã liệt kê (ý 3). Ai cần vào Project, quyền gì, cũng suy ra từ việc (ý 4)."
        ] },
      { k: "B", gist: "Invite the collaborators and make sure each one has the right level of access.",
        why: [
          "Sai thứ tự: chưa biết Project làm gì thì chưa biết ai cần dùng, ai cần sửa (ý 4).",
          "Mời sớm thì người vào gặp một Project chưa có instructions và tài liệu, câu trả lời chung chung. Ấn tượng đầu đó khó gỡ."
        ] },
      { k: "C", gist: "Upload the reference material and write the instructions the Project will depend on.",
        why: [
          "Sai thứ tự: chọn tài liệu và viết instructions cần một thước đo, là Project phục vụ việc gì (ý 1, 2).",
          "Làm trước thì dễ tải cả kho tài liệu “cho đủ” và viết instructions chung chung. Thứ thừa làm nhiễu, thứ việc cần lại có thể thiếu.",
          "Dễ bị cuốn vì instructions và knowledge là phần chính của Project, và đúng là phải làm sớm. Nhưng nó là bước thứ hai, ngay sau khi đã nói rõ Project để làm gì."
        ] },
      { k: "D", gist: "Try the configured Project on a typical request taken from the workload.",
        why: [
          "Bước cuối, không phải bước đầu: chữ “configured” (đã cấu hình) nói rõ Project phải dựng xong mới thử được (ý 3).",
          "Thử cũng cần biết “representative request” (yêu cầu điển hình) là gì, tức là phải có danh sách việc từ bước A."
        ] }
    ],
    refs: [
      { label: "Bài 5.3, bảng “Bộ khung bảy phần” (phần “Việc và phạm vi”) và mục “Thử bằng câu hỏi thật trước khi giao cho mọi người”", href: NOTES + "#l-5-3" },
      { label: "Bài 5.1: chia instructions và knowledge, chỉ đưa bản hiện hành, chia sẻ Can view và Can edit", href: NOTES + "#l-5-1" }
    ]
  },
  {
    de: 4, n: 24, total: 119, sub: "1.1", subName: "Viết prompt rõ yêu cầu, lý do, nguồn, mẫu",
    answer: "DE",
    ask: "As a business analyst, you are reviewing prompt drafts written by your teammates. Which two components belong in a well-structured prompt for a business task? (Choose two.)",
    scene: [
      "Mày là chuyên viên phân tích nghiệp vụ, đang xem các bản prompt đồng đội viết cho việc của công ty.",
      "Đề đòi chọn hai thành phần nên có trong một prompt có cấu trúc tốt.",
      "Chỗ khó: ba phương án sai đều thêm chữ vào prompt (giọng thân thiện, danh sách sản phẩm, chuyện cá nhân), nghe như thêm bối cảnh. Chỉ hai thứ cho Claude biết làm gì, cho ai, để làm gì."
    ],
    asks: [
      "Hai thành phần nào nên có trong prompt cho việc của công ty?",
      "Tức là: thiếu thứ gì thì Claude làm sai việc, hoặc viết cho một người đọc chung chung.",
      "Soi từng phương án: nó cho Claude thông tin việc này cần, hay chỉ làm prompt dài hơn?"
    ],
    facts: [
      "Các phần của một prompt tốt: việc (làm gì, sâu tới đâu), bối cảnh (cho ai đọc, để làm gì), ràng buộc và lý do, nguồn, ví dụ, định dạng output. Vai là tùy chọn.",
      "Thiếu việc thì Claude làm một việc gần giống. Thiếu bối cảnh thì Claude viết cho một người đọc chung chung.",
      "Câu nào không thêm thông tin về output thì chỉ làm prompt dài hơn, không làm output tốt hơn. Context nhiều hơn không tự động tốt hơn: chỉ đưa phần việc này cần.",
      "Giọng văn là một lựa chọn theo người đọc. Nó không thay được việc và bối cảnh."
    ],
    opts: [
      { k: "A", gist: "An instruction to use a friendly, chatty tone so that the replies feel more approachable.",
        why: [
          "Sai: giọng chỉ là chuyện trình bày, không nói Claude phải làm việc gì, cho ai (ý 1, 4).",
          "Giọng thân mật còn có thể sai người đọc, ví dụ báo cáo gửi ban giám đốc. Giọng chọn theo người đọc, mà người đọc nằm ở E."
        ] },
      { k: "B", gist: "A complete list of the company's products and services, to give the model business context.",
        why: [
          "Sai ở chữ “comprehensive” (toàn bộ): đổ cả danh mục vào dù việc có cần hay không. Bối cảnh tốt là bối cảnh việc này cần (ý 3).",
          "Danh sách dài làm prompt nặng thêm, mà vẫn không nói việc là gì, cho ai.",
          "Dễ bị cuốn vì nó tự gọi mình là “business context” (bối cảnh kinh doanh). Nhưng bối cảnh đề đòi là người đọc và mục tiêu, như E."
        ] },
      { k: "C", gist: "A short personal story to make the prompt read more conversationally.",
        why: [
          "Sai: chuyện cá nhân không thêm thông tin nào về output (ý 3).",
          "Nó chỉ làm prompt dài hơn và chen chữ không liên quan vào giữa lời dặn."
        ] },
      { k: "D", gist: "A clear statement of the task the model has to carry out.",
        why: [
          "Đúng. Việc là phần đầu tiên của prompt: làm gì, sâu tới đâu thì xong (ý 1).",
          "Thiếu nó thì Claude làm một việc gần giống, và phải làm lại (ý 2)."
        ] },
      { k: "E", gist: "Relevant context such as who the audience is and what the task is meant to achieve.",
        why: [
          "Đúng. Bối cảnh trả lời “cho ai đọc, để làm gì” (ý 1). Biết người đọc và mục tiêu, Claude chọn được độ sâu, giọng và điều cần nhấn.",
          "D và E bổ sung nhau: D nói làm gì, E nói làm cho ai, để đạt điều gì. Chữ “relevant” (liên quan) cũng là chỗ E khác B."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D1, bảng “Các phần của một prompt tốt”: việc, bối cảnh, ràng buộc, nguồn, ví dụ, định dạng, và thiếu thì Claude làm gì", href: NOTES + "#l-1-0" },
      { label: "Bài 1.1, mục “Viết ra những gì đang nằm trong đầu bạn”: việc và độ sâu, người đọc và mục tiêu", href: NOTES + "#l-1-1" }
    ]
  },
  {
    de: 4, n: 25, total: 119, sub: "2.1", subName: "Đúng và đủ: kiểm chỗ dễ sai trước",
    answer: "B",
    ask: "A project lead is checking a status report drafted by Claude against the project charter. The report will go to a steering committee that expects an accurate update on the committed milestones. Which set of criteria gives the strongest evaluation framework?",
    scene: [
      "Claude soạn báo cáo tình hình dự án (status report). Trưởng dự án chấm nó, đối chiếu với project charter (điều lệ dự án: văn bản chốt mục tiêu, phạm vi, các mốc đã cam kết).",
      "Người nhận là steering committee (ban chỉ đạo). Họ cần một bản cập nhật chính xác về các mốc đã cam kết.",
      "Chỗ khó: bốn phương án là bốn bộ tiêu chí. Ba bộ chấm hình thức (độ dài, giọng, mạch văn, giống bản kỳ trước), chỉ một bộ chấm nội dung."
    ],
    asks: [
      "Bộ tiêu chí nào làm khung đánh giá mạnh nhất?",
      "Tức là: tiêu chí nào trả lời được điều ban chỉ đạo cần: số liệu có đúng không, có đủ các mục phải báo không, có đúng thứ họ cần đọc không.",
      "Soi từng phương án: một báo cáo ghi sai mốc có trượt bộ tiêu chí đó không?"
    ],
    facts: [
      "Chấm output có hai câu hỏi tách riêng. Có đúng không: từng con số, ngày, tên có khớp nguồn không. Có làm đúng việc không: đủ các phần được yêu cầu, đúng người đọc, đúng mục đích.",
      "Độ đủ đo bằng yêu cầu, không đo bằng chủ đề. Cách đo: chép các mục bắt buộc thành danh sách, rồi đánh dấu từng mục trên output. Phần thiếu không để lại câu nào lạ, đọc lướt không thấy.",
      "Văn viết trơn tru không trả lời được câu nào trong hai câu hỏi trên. Sửa hình thức (độ dài, định dạng, giọng) không sửa được nội dung.",
      "Đa số việc cần chấm trên nhiều tiêu chí. Độ chính xác là mức sàn, cộng thêm liên quan, mạch lạc, hợp người đọc."
    ],
    opts: [
      { k: "A", gist: "Length, consistency of formatting, and whether the tone suits a steering-committee audience.",
        why: [
          "Sai: cả ba là hình thức (ý 3). Báo cáo ghi sai ngày xong của một mốc vẫn đạt đủ ba tiêu chí.",
          "Dễ bị cuốn vì có nhắc tới người đọc là ban chỉ đạo. Nhưng ban chỉ đạo cần số đúng trước, giọng hợp sau."
        ] },
      { k: "B", gist: "Factual accuracy against the charter, completeness against the required reporting fields, and relevance to the audience receiving it.",
        why: [
          "Đúng. Đủ cả hai câu hỏi: có đúng không (so với charter, nguồn nắm các mốc đã cam kết), và có làm đúng việc không (đủ mục bắt buộc, đúng thứ ban chỉ đạo cần) (ý 1).",
          "Độ đủ đo bằng danh sách mục bắt buộc, đúng cách đo bằng yêu cầu (ý 2). Thêm tiêu chí liên quan tới người đọc là chấm trên nhiều tiêu chí, với độ chính xác làm sàn (ý 4)."
        ] },
      { k: "C", gist: "Readability, narrative flow, and whether the report tells a coherent story about the project's progress.",
        why: [
          "Sai: một câu chuyện mạch lạc vẫn có thể sai số hoặc thiếu mốc (ý 3).",
          "Báo cáo kể trơn tru còn nguy hiểm hơn, vì người đọc dễ tin mà không soát lại."
        ] },
      { k: "D", gist: "Whether it follows the structure of the previous status report, because the committee expects consistency from one period to the next.",
        why: [
          "Sai: giống khung kỳ trước không nói gì về số liệu kỳ này đúng hay sai (ý 1).",
          "Bản kỳ trước cũng có thể đã thiếu mục. Chép khung của nó là chép luôn chỗ thiếu. Thước đo đúng là các mục bắt buộc, không phải bản cũ (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 2.1, mục “Hai câu hỏi tách riêng” và “Đo độ đủ bằng một danh sách viết trước”", href: NOTES + "#l-2-1" },
      { label: "Bài 0.3, luật 3: sửa hình thức không sửa được nội dung", href: NOTES + "#l-0-3" }
    ]
  },
  {
    de: 4, n: 26, total: 119, sub: "5.4", subName: "Giữ cấu hình còn đúng",
    answer: "C",
    ask: "A senior manager learns that a colleague never updates the team's Project configurations, on the reasoning that “if it works once, it works forever.” What feedback is most appropriate?",
    scene: [
      "Một đồng nghiệp không bao giờ cập nhật cấu hình Project của nhóm (instructions và knowledge), vì nghĩ “if it works once, it works forever” (chạy tốt một lần là chạy tốt mãi).",
      "Mày là quản lý cấp trên, phải góp ý.",
      "Chỗ khó: bốn phương án là bốn nhịp cập nhật: theo lịch dù không có gì đổi, chỉ khi output kém thấy rõ, định kỳ vì nguồn thay đổi, hay để yên rồi sửa trong từng chat."
    ],
    asks: [
      "Góp ý nào phù hợp nhất?",
      "Tức là: cấu hình cũ đi bằng cách nào, và lúc nào phải rà lại.",
      "Soi từng phương án: nó có bắt được chuyện chính sách đã đổi mà output vẫn trông bình thường không?"
    ],
    facts: [
      "Knowledge và instructions được nạp vào mọi chat. File đã hết hiệu lực vẫn định hình mọi câu trả lời, nhiều tháng sau khi tải lên. Không có gì tự đánh dấu file cũ.",
      "Kiến thức cũ cho output trôi chảy, tự tin nhưng sai chi tiết. Người dùng chỉ thấy sai khi đối chiếu với nguồn mới.",
      "Lịch rà soát có hai loại: định kỳ (ví dụ đầu mỗi quý), và ngay khi nguồn đổi: chính sách mới, bảng giá mới, sản phẩm đổi tên. Tài liệu đổi thì rà cả instructions đi kèm, sửa xong chạy lại loạt câu hỏi thử.",
      "Lời sửa trong chat chỉ sống trong chat đó. Phải nhắc cùng một lời sửa lần thứ hai là đang thiếu một dòng instructions."
    ],
    opts: [
      { k: "A", gist: "Update configurations on a fixed timetable whether or not the policies and source documents behind them have changed, since routine upkeep prevents drift.",
        why: [
          "Sai ở chữ “regardless” (bất kể): cập nhật theo lịch mà không xem nguồn có đổi không. Chính sách đổi giữa hai kỳ thì Project vẫn sai tới kỳ sau (ý 3).",
          "Còn khi không có gì đổi, cập nhật cho có chỉ thêm thay đổi không cần, lần nào cũng có thể làm hỏng thứ đang đúng.",
          "Dễ bị cuốn vì có nhịp đều nghe như kỷ luật. Nhưng rà soát là kiểm cấu hình còn khớp nguồn không, không phải đổi cho đúng lịch."
        ] },
      { k: "B", gist: "Update configurations only when output quality visibly declines, because updating ahead of time could break configurations that work.",
        why: [
          "Sai ở giả định: cấu hình cũ sẽ lộ ra bằng output kém thấy rõ. Thực tế output dựa trên nguồn cũ vẫn trôi chảy, tự tin (ý 2).",
          "Chờ tới lúc thấy rõ là chờ người dùng đã làm theo thông tin cũ. Sửa sau khi đã hại thay vì rà trước (ý 1).",
          "Lo sửa làm hỏng là lo có thật. Nhưng cách chặn là chạy lại loạt câu hỏi thử sau khi sửa (ý 3), không phải đừng sửa."
        ] },
      { k: "C", gist: "Review and update configurations periodically, because policies, terminology and source documents change over time, even when output quality has not visibly dropped.",
        why: [
          "Đúng. Gọi đúng lý do cấu hình cũ đi: nguồn đổi, còn file cũ vẫn nằm trong Project và vẫn được nạp (ý 1).",
          "“Even when output quality has not visibly degraded” (kể cả khi output chưa kém thấy rõ) khớp với chuyện sai do nguồn cũ không tự lộ (ý 2). Rà định kỳ, cộng rà ngay khi nguồn đổi, là lịch rà soát của bài 5.4 (ý 3)."
        ] },
      { k: "D", gist: "Leave configurations alone while the team is happy with the outputs, and make any needed changes in individual chats rather than at the Project level.",
        why: [
          "Sai ở vế đầu: nhóm hài lòng với output không có nghĩa output còn đúng (ý 2).",
          "Sai ở vế sau: sửa trong chat thì lời sửa chỉ sống trong chat đó. Chat mới và người khác vẫn nhận cấu hình cũ (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 5.4, mục “Cấu hình cũ đi thế nào” và “Người phụ trách, lịch rà soát, báo cho người dùng”: rà định kỳ và ngay khi nguồn đổi", href: NOTES + "#l-5-4" },
      { label: "Bài Nền tảng D7, cần gạt 2: kiến thức cũ cho output trôi chảy, tự tin nhưng sai chi tiết", href: NOTES + "#l-7-0" }
    ]
  },
  {
    de: 4, n: 27, total: 119, sub: "6.3", subName: "Làm việc trong chính sách AI của công ty",
    answer: "BC",
    ask: "You are organizing the connected data sources for a team, and some planning has to be finished before any connection is authorized. Which two planning steps must be completed BEFORE a new Connector is authorized? (Choose two.)",
    scene: [
      "Mày sắp xếp các nguồn dữ liệu nối vào Claude cho một nhóm. Connector là kết nối cho Claude vào một ứng dụng khác (Drive, Gmail…) để đọc dữ liệu theo quyền của người dùng.",
      "Đề nhấn chữ “BEFORE” (trước khi): chọn hai bước lập kế hoạch phải xong trước lúc cho phép một connector mới.",
      "Chỗ khó: năm phương án đều là việc có ích quanh connector. Ba việc hoặc chỉ làm được sau khi đã nối, hoặc là chuyện khác."
    ],
    asks: [
      "Hai bước nào phải xong trước khi cho phép connector mới?",
      "Tức là: trước khi mở đường cho dữ liệu chảy vào Claude, phải trả lời hai câu: công cụ này có được duyệt không, và dữ liệu này có được phép dùng không.",
      "Soi từng phương án: bước đó có cần connector chạy rồi mới làm được không? Nó có chặn được rủi ro trước khi dữ liệu đi không?"
    ],
    facts: [
      "Chính sách AI của tổ chức trả lời vài câu cố định, trong đó có: được dùng công cụ nào (công cụ được duyệt), và dữ liệu nào được đưa vào (phân loại dữ liệu).",
      "Công cụ được duyệt (approved tool) gồm cả connector mà công ty đã xem xét và cho phép dùng với dữ liệu công việc. Chính sách không nhắc tới thì là chưa được duyệt, không phải được phép.",
      "Trước khi gửi dữ liệu, hỏi: dữ liệu này thuộc nhóm nào (cá nhân, tài chính, sức khỏe, nhân sự, mật doanh nghiệp), chính sách nói gì về nhóm đó. Gửi rồi thì chỉ còn giảm thiệt hại.",
      "Trên Team và Enterprise, Owner bật connector cho tổ chức. Mỗi người tự đăng nhập, và Claude chỉ thấy dữ liệu trong quyền của tài khoản đó."
    ],
    opts: [
      { k: "A", gist: "Move every existing report off the old data source and onto the new Connector.",
        why: [
          "Sai thứ tự: chuyển báo cáo sang connector mới chỉ làm được khi connector đã được cho phép và đang chạy.",
          "Đây là bước triển khai, đứng sau. Nó không trả lời câu được dùng hay không (ý 1)."
        ] },
      { k: "B", gist: "Confirm that the Connector appears on the approved-vendor list kept by IT.",
        why: [
          "Đúng. Đây là câu “dùng công cụ nào” của chính sách AI (ý 1). Connector chưa có trong danh sách thì là chưa được duyệt: phải hỏi trước, không phải nối trước (ý 2).",
          "Kiểm sau khi nối thì dữ liệu đã đi qua một công cụ chưa ai xem xét."
        ] },
      { k: "C", gist: "Confirm how the source's data is classified and that the team is permitted to use it.",
        why: [
          "Đúng. Đây là câu “dữ liệu nào được đưa vào” (ý 1, 3). Nguồn chứa dữ liệu nhân sự hay sức khỏe thì chính sách có thể cấm, hoặc đòi tài khoản và cài đặt riêng.",
          "B và C bổ sung nhau: B hỏi công cụ có được duyệt không, C hỏi dữ liệu có được dùng không. Connector được duyệt vẫn không cho nhóm quyền dùng một nguồn họ không được phép dùng (ý 4)."
        ] },
      { k: "D", gist: "Put every team member through formal training sessions on the new Connector.",
        why: [
          "Không phải điều kiện để cho phép. Đào tạo dạy cách dùng, không trả lời được connector và dữ liệu có được phép không (ý 1).",
          "Chữ “every” và “formal” (mọi người, buổi đào tạo chính thức) còn làm quá tay. Đào tạo làm song song hoặc sau được."
        ] },
      { k: "E", gist: "Retire any unused legacy connectors that may still be authorized.",
        why: [
          "Dọn connector cũ là việc tốt, nhưng là chuyện khác: nó không nói gì về connector mới có được duyệt không, dữ liệu có được dùng không (ý 1).",
          "Dễ bị cuốn vì nó cũng là quản trị connector, nghe rất có trách nhiệm. Nhưng đề hỏi điều kiện trước khi cho phép cái mới."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D6, mục “Chính sách AI của tổ chức và governance”: công cụ được duyệt, phân loại dữ liệu", href: NOTES + "#l-6-0" },
      { label: "Bài 6.3, mục “Bị chặn, hay chính sách không nhắc tới”: chưa nhắc tới là chưa được duyệt", href: NOTES + "#l-6-3" },
      { label: "Bài 6.2, mục “Kiểm trước khi gửi”: dữ liệu thuộc nhóm nào, chính sách nói gì về nhóm đó", href: NOTES + "#l-6-2" }
    ]
  },
  {
    de: 4, n: 28, total: 119, sub: "4.5", subName: "Nói với stakeholder về giá trị và giới hạn",
    answer: "A",
    ask: "A senior manager is preparing a message to stakeholders about a proposed Claude use case and is applying the Description competency of the AI Fluency Framework. Which framing best reflects Description principles for communicating with stakeholders?",
    scene: [
      "Một quản lý cấp cao soạn thông điệp gửi stakeholder (người có quyền lợi trong việc này) về một đề xuất dùng Claude.",
      "Anh áp năng lực Description (mô tả) của khung AI Fluency.",
      "Chỗ khó: ba phương án sai tự ghi luôn là trái với Description (“even though Description principles require…”, dù nguyên tắc Description đòi…). Chỉ một phương án nói đủ: làm được gì, giới hạn gì, người giữ phần nào."
    ],
    asks: [
      "Cách trình bày nào hợp nhất với Description khi nói với stakeholder?",
      "Tức là: mô tả Claude cho người khác sao cho đúng sự thật, không thổi phồng, không hạ thấp, và vừa với mức hiểu AI của họ.",
      "Soi từng phương án: stakeholder nghe xong có hình dung đúng Claude làm được gì, sai ở đâu, ai chặn chỗ sai không?"
    ],
    facts: [
      "Description trong khung AI Fluency 4D: “Effectively describing goals to prompt useful AI behaviors and outputs” (mô tả mục tiêu đủ rõ để AI cư xử đúng và cho ra kết quả dùng được). Mô tả đầu ra gồm cả người đọc là ai.",
      "Stakeholder không có cách hiểu nào về Claude thì hay rơi vào một trong hai cực: thấy một bản đẹp là tin hết, gặp một lỗi là không tin gì nữa.",
      "Bán cho đúng: Claude mang tới tốc độ và quy mô, người mang tới phán đoán và giám sát. Chỉ kể điểm mạnh là dọn sẵn chỗ cho thất vọng.",
      "Hứa biện pháp, không hứa hoàn hảo. Không biện pháp nào bảo đảm 0 lỗi, nên nói trước giới hạn và chỗ người vẫn duyệt."
    ],
    opts: [
      { k: "A", gist: "Describe what Claude can reliably deliver for the use case, its known limitations, and the human oversight that stays in place, pitched to the audience's familiarity with AI.",
        why: [
          "Đúng. Đủ ba thứ stakeholder cần: làm được gì, hụt ở đâu, người giữ phần nào (ý 3, 4). Họ đứng được ở giữa hai cực (ý 2).",
          "“Calibrated to the audience’s familiarity with AI” (vừa với mức hiểu AI của người nghe) là mô tả theo đúng người đọc (ý 1)."
        ] },
      { k: "B", gist: "Overstate what Claude can do in order to win stakeholder support, even though Description principles call for accurate framing of what Claude can and cannot reliably produce.",
        why: [
          "Sai: thổi phồng để được duyệt. Đây là “chỉ kể điểm mạnh”, dọn sẵn chỗ cho thất vọng (ý 3).",
          "Lỗi đầu tiên lọt ra là stakeholder chuyển sang cực “không tin gì nữa” (ý 2)."
        ] },
      { k: "C", gist: "Leave out the human oversight that will stay in place, even though Description principles call for expectations that match the use case's real capability limits.",
        why: [
          "Sai: bỏ phần người giám sát là bỏ một nửa của “người làm cùng Claude” (ý 3).",
          "Stakeholder sẽ tưởng Claude làm một mình, và có thể cắt luôn giờ người duyệt. Khi lỗi tới, không còn ai chặn (ý 4)."
        ] },
      { k: "D", gist: "Understate what Claude can do to keep stakeholder expectations low, even though Description principles call for accuracy in both directions rather than systematic downplaying.",
        why: [
          "Sai: hạ thấp cũng là mô tả sai, chỉ là sai theo chiều ngược lại (ý 1).",
          "Stakeholder hiểu thấp hơn thực tế thì bỏ lỡ giá trị thật, hoặc gạt đi một use case đáng làm.",
          "Dễ bị cuốn vì “hứa ít, làm nhiều” nghe an toàn. Nhưng điều cần là hứa đúng: nói đúng biện pháp và giới hạn, không thêm không bớt (ý 4)."
        ] }
    ],
    dispute: "Đề gốc chấm A, sổ giữ A. Lưu ý về khái niệm: trong khung AI Fluency, Description là mô tả cho AI (mục tiêu, cách làm, cách cư xử). Thành thật với người khác về vai trò của AI là Transparency Diligence, một phần của Diligence. Câu này mượn chữ Description cho việc mô tả với stakeholder. Đáp án không đổi: ba phương án kia tự nhận là trái nguyên tắc ngay trong câu, chỉ A mô tả đúng sự thật.",
    refs: [
      { label: "Bài 4.5, mục “Cho stakeholder một cách hiểu Claude vừa đủ dùng” và “Bán cho đúng”", href: NOTES + "#l-4-5" },
      { label: "Bài Nền tảng D4, mục “AI Fluency và khung 4D”: định nghĩa Description và Transparency Diligence", href: NOTES + "#l-4-0" }
    ]
  },
  {
    de: 4, n: 29, total: 119, sub: "6.4", subName: "Đạo đức khi dùng AI",
    answer: "C",
    ask: "As a Claude associate, you are running an ethics review of a Claude-assisted deliverable before it is published. What is the right order? <br>(1) Check that the transparency requirements are met for the audience who will receive the deliverable.<br>(2) Record the result of the review and any changes made.<br>(3) Identify the audience and the impact the deliverable could have on them.<br>(4) Make targeted revisions, or escalate any concern that needs more authority to resolve.<br>(5) Review the content for unsupported generalizations, fairness concerns and inaccuracies.",
    scene: [
      "Một sản phẩm có Claude hỗ trợ sắp được công bố. Mày rà soát đạo đức (ethics review) trước khi đăng.",
      "Năm bước được đánh số lộn xộn. Cả bốn dãy đều kết thúc bằng 4, 2: sửa hoặc chuyển lên, rồi ghi lại.",
      "Chỗ khó nằm ở ba bước đầu: (3) xác định người nhận, (5) soát nội dung, (1) kiểm yêu cầu công khai, xếp thế nào."
    ],
    asks: [
      "Thứ tự đúng của các bước rà soát đạo đức là gì?",
      "Tức là: bước nào cần kết quả của bước nào. Soát công bằng cần biết ai bị ảnh hưởng. Kiểm công khai cần biết người nhận và nội dung.",
      "Soi từng dãy: lúc làm (5) và (1), đã biết người nhận là ai chưa? Lúc làm (1), đã biết nội dung có gì chưa?"
    ],
    facts: [
      "Phần đạo đức là hỏi trước: output này ảnh hưởng tới ai, nhóm nào bị thiệt nếu nó nghiêng. Bias (thiên lệch) là output nghiêng về một nhóm, theo khuôn mẫu. Fairness (công bằng) là người ở hoàn cảnh như nhau được đối xử như nhau.",
      "Disclosure (công khai) là cho người cần biết biết rằng AI đã tham gia. Có bắt buộc không tùy người nhận và loại nội dung: lời khuyên hay quyết định rủi ro cao về một người, chatbot nói với khách, chính sách công ty. Khi phân vân, hỏi: người nhận có đánh giá sản phẩm khác đi nếu biết AI đã làm phần lớn không?",
      "Soát đủ rồi mới sửa, để mỗi lần sửa nhắm đúng chỗ. Chỗ vượt thẩm quyền của mình thì chuyển lên đúng kênh.",
      "Quyết xong thì ghi lại kết quả và những gì đã sửa, để có hồ sơ khi ai đó hỏi vì sao."
    ],
    opts: [
      { k: "A", gist: "5, 3, 1, 4, 2",
        why: [
          "Sai ở bước đầu: soát công bằng (5) khi chưa biết sản phẩm tới tay ai, ảnh hưởng ai (ý 1).",
          "Một câu khái quát hóa có hại hay không tùy nhóm người đọc và nhóm bị nói tới. Soát trước thì dễ sót đúng chỗ làm thiệt người nhận, xong (3) lại phải soát lần nữa."
        ] },
      { k: "B", gist: "3, 1, 5, 4, 2",
        why: [
          "Sai ở chỗ làm (1) trước (5): chốt yêu cầu công khai khi chưa soát nội dung (ý 2).",
          "Mức công khai cần tùy nội dung: bản có lời khuyên về một người cụ thể, hay phần lớn do AI viết, thì phải nói rõ hơn. Chốt trước thì soát xong có thể phải kiểm lại (1).",
          "Dễ bị cuốn vì công khai nghe như chỉ phụ thuộc người nhận, nên muốn làm ngay sau (3). Nhưng muốn biết phải nói gì với người nhận thì phải biết trong sản phẩm có gì."
        ] },
      { k: "C", gist: "3, 5, 1, 4, 2",
        why: [
          "Đúng. (3) biết người nhận và tác động trước (ý 1). (5) soát nội dung bằng con mắt của đúng người nhận đó.",
          "(1) chốt yêu cầu công khai khi đã biết cả người nhận lẫn nội dung (ý 2). (4) sửa hoặc chuyển lên dựa trên mọi phát hiện (ý 3). (2) ghi lại sau cùng (ý 4)."
        ] },
      { k: "D", gist: "1, 3, 5, 4, 2",
        why: [
          "Sai ở bước đầu: kiểm công khai “for the audience” (cho người nhận) khi chưa xác định người nhận là ai (ý 2).",
          "Bước (1) thành đọc quy định chung chung, chưa có gì để áp vào."
        ] }
    ],
    dispute: "Đề gốc chấm C, sổ giữ C. Chỗ có thể bàn là thứ tự (5) và (1): B chỉ đổi chỗ hai bước này. Notes không có quy trình rà soát đạo đức theo từng bước. Sổ chọn C vì mức công khai cần tùy cả nội dung (có lời khuyên rủi ro cao về một người không, AI làm nhiều hay ít), nên soát nội dung trước rồi mới chốt công khai.",
    refs: [
      { label: "Bài 6.4, mục “Bias và công bằng” và “Khi nào phải nói là có dùng AI”: hỏi trước output ảnh hưởng ai, và công khai tùy người nhận lẫn loại nội dung", href: NOTES + "#l-6-4" },
      { label: "Bài 6.3, mục “Khi chính sách và yêu cầu va nhau”: chuyển lên đúng kênh, ghi lại quyết định", href: NOTES + "#l-6-3" }
    ]
  },
  {
    de: 4, n: 30, total: 119, sub: "2.1", subName: "Đúng và đủ: kiểm chỗ dễ sai trước",
    answer: "D",
    ask: "As a business analyst, you are evaluating a business case drafted by Claude against the agreed acceptance criteria. What is the right order? <br>(1) Compare the business case with the source data and the required topics.<br>(2) Log gaps and inaccuracies for follow-up or correction.<br>(3) Reconfirm the acceptance criteria for the business case.<br>(4) Decide whether to use the business case, iterate on it, or escalate.<br>(5) Read the business case end to end to form a first impression.",
    scene: [
      "Claude soạn một business case (bản lập luận kinh doanh cho một đề xuất). Mày chấm nó theo acceptance criteria (tiêu chí chấp nhận) đã thống nhất.",
      "Năm bước được đánh số lộn xộn. Cả bốn dãy đều kết thúc bằng 2, 4: ghi lại chỗ thiếu, chỗ sai, rồi quyết dùng, làm lại hay chuyển lên.",
      "Chỗ khó nằm ở ba bước đầu: (3) xác nhận lại tiêu chí, (5) đọc hết một lượt, (1) đối chiếu với nguồn, xếp thế nào."
    ],
    asks: [
      "Thứ tự đúng của các bước chấm là gì?",
      "Tức là: muốn chấm thì phải có thước đo trước. Muốn đối chiếu đúng chỗ thì phải nắm cả bản trước.",
      "Soi từng dãy: lúc đọc (5) và đối chiếu (1), đã có tiêu chí trong tay chưa? Lúc đối chiếu, đã biết bản này lập luận thế nào chưa?"
    ],
    facts: [
      "Tiêu chí viết hoặc chốt trước khi đọc output. Đọc trước rồi mới nhìn tiêu chí thì tiêu chí dễ bị kéo theo bản vừa đọc.",
      "Đo độ đủ bằng một danh sách viết trước: chép yêu cầu thành danh sách, đọc output và đánh dấu từng dòng, rồi mới kiểm độ chính xác, cuối cùng ghi lại phần thiếu và chỗ sai.",
      "Kiểm là so với nguồn nằm ngoài Claude. Đọc hết bài trước giúp biết kết luận dựa vào những câu nào, để kiểm các câu đó trước.",
      "Ghi lại các phát hiện rồi mới quyết dùng, sửa prompt làm lại, hay chuyển lên người có thẩm quyền: quyết dựa trên bức tranh đầy đủ."
    ],
    opts: [
      { k: "A", gist: "3, 1, 5, 2, 4",
        why: [
          "Sai ở chỗ làm (1) trước (5): đối chiếu với nguồn khi chưa đọc hết bản, chưa biết kết luận dựa vào câu nào (ý 3).",
          "Lượt đọc toàn bài đặt sau bước đối chiếu thì chỉ còn là đọc cho biết, không giúp chọn chỗ kiểm."
        ] },
      { k: "B", gist: "1, 3, 5, 2, 4",
        why: [
          "Sai ở bước đầu: đối chiếu trước khi xác nhận lại tiêu chí. Chưa chốt “required topics” (các chủ đề bắt buộc) thì chưa biết đang so cái gì (ý 1, 2).",
          "Tiêu chí mà có chỗ đã đổi thì cả bước đối chiếu phải làm lại."
        ] },
      { k: "C", gist: "5, 3, 1, 2, 4",
        why: [
          "Sai ở chỗ đọc (5) trước khi xác nhận tiêu chí (3). Ấn tượng đầu có trước thước đo thì dễ kéo cách hiểu tiêu chí theo bản vừa đọc (ý 1).",
          "Dễ bị cuốn vì đọc hết một lượt trước nghe tự nhiên, và câu 3 Đề 2 cũng mở đầu bằng đọc hết bài. Nhưng ở câu đó tiêu chí không phải một bước trong dãy. Ở đây có, và thước đo phải đứng trước."
        ] },
      { k: "D", gist: "3, 5, 1, 2, 4",
        why: [
          "Đúng. (3) chốt lại tiêu chí trước, để có thước đo không bị bản nháp kéo theo (ý 1). (5) đọc hết để nắm bản này lập luận gì, dựa vào đâu (ý 3).",
          "(1) đối chiếu với nguồn và các chủ đề bắt buộc, (2) ghi lại chỗ thiếu, chỗ sai, rồi (4) mới quyết dùng, làm lại hay chuyển lên (ý 2, 4)."
        ] }
    ],
    refs: [
      { label: "Bài 2.1, mục “Đo độ đủ bằng một danh sách viết trước”: chép yêu cầu thành danh sách trước khi đọc output, ghi lại chỗ thiếu và sai", href: NOTES + "#l-2-1" },
      { label: "Bài 2.5, mục “So bản nháp bằng tiêu chí viết trước”: viết tiêu chí trước khi đọc bản nào", href: NOTES + "#l-2-5" },
      { label: "Bài 2.4, mục “Duyệt sâu tới đâu: tự kiểm thêm hay giao chuyên gia”: khi nào tự sửa, khi nào chuyển người có chuyên môn", href: NOTES + "#l-2-4" }
    ]
  },
  {
    de: 4, n: 31, total: 119, sub: "2.5", subName: "Sửa output cho đúng người đọc",
    answer: "A",
    ask: "A project manager is polishing a Claude-written draft into a memo for the board. Board members read it before the meeting and expect it to be easy to scan, factually verified, and written in the organization's standard terminology. Which set of refinements fits best?",
    scene: [
      "Một quản lý dự án đang chỉnh bản nháp Claude viết thành memo gửi hội đồng quản trị (board).",
      "Hội đồng đọc trước buổi họp và đặt ba đòi hỏi: “scannable” (đọc lướt nắm được ngay), “factually verified” (sự thật đã kiểm), và dùng đúng thuật ngữ chuẩn của tổ chức.",
      "Chỗ khó: phương án nào cũng có vài bước sửa nghe hợp lý. Cái phân biệt là phương án nào đáp đủ cả ba đòi hỏi, mà không làm ngược cái nào."
    ],
    asks: [
      "Bộ chỉnh sửa nào hợp nhất?",
      "Tức là: đặt ba đòi hỏi của hội đồng cạnh từng phương án, xem phương án nào phủ đủ cả ba.",
      "Soi từng phương án: nó bỏ đòi hỏi nào, làm ngược đòi hỏi nào, hay giao bước kiểm cho chính Claude."
    ],
    facts: [
      "Sửa cho người đọc là đổi cụ thể theo người đọc đó: ai đọc, đọc để làm gì. Hội đồng đọc trước họp nên cần tiêu đề nhất quán và câu chữ gọn để nhìn là thấy ý chính.",
      "Sửa hình thức (tiêu đề, câu chữ, thuật ngữ) không sửa được nội dung. Memo đẹp, đúng thuật ngữ không nói gì về chuyện con số đúng hay sai.",
      "Kiểm là so từng khẳng định với nguồn đang nắm sự thật đó, ở đây là dữ liệu gốc. Tin vào bước Claude tự kiểm vẫn là Claude chấm Claude.",
      "Chi tiết cụ thể (con số, tên, ngày) là chỗ hay sai nhất. Đưa nguồn cho Claude giúp bớt bịa, nhưng không biện pháp nào xóa hẳn lỗi."
    ],
    opts: [
      { k: "A", gist: "Make the headings consistent, tighten the wording so executives can scan it, bring terminology in line with the organization's standards, and check every fact against the source data.",
        why: [
          "Phủ đủ ba đòi hỏi: tiêu đề nhất quán và câu gọn cho việc đọc lướt (ý 1), thuật ngữ theo chuẩn tổ chức, từng sự thật so với dữ liệu gốc (ý 3).",
          "Làm cả phần hình thức lẫn phần nội dung, không để cái này thay cái kia (ý 2)."
        ] },
      { k: "B", gist: "Make the headings consistent, expand every section so the board has the full background, and align terminology with the organization's standards.",
        why: [
          "Sai ở “expand each section” (mở rộng từng phần): làm ngược đòi hỏi đọc lướt (ý 1). Memo dài ra, điều cần quyết bị chôn sâu hơn.",
          "Bỏ hẳn bước kiểm sự thật. Tiêu đề và thuật ngữ chỉ là hình thức (ý 2), con số sai vẫn nằm nguyên trong memo.",
          "Dễ bị cuốn vì “full context” (đủ bối cảnh) nghe chu đáo với người ra quyết định. Nhưng đề đã nói rõ hội đồng cần đọc lướt được."
        ] },
      { k: "C", gist: "Tighten the wording for executives and check every fact against the source data, but keep the draft's headings and terminology as they are to preserve its voice.",
        why: [
          "Làm đúng hai việc: câu gọn và kiểm sự thật với dữ liệu gốc (ý 3).",
          "Thiếu đòi hỏi thứ ba: thuật ngữ vẫn là chữ Claude tự chọn, có thể khác cách cả tổ chức gọi, hội đồng đọc dễ hiểu lệch.",
          "“preserve the draft’s voice” (giữ giọng của bản nháp) không phải đòi hỏi của ai. Người đọc là hội đồng, không phải bản nháp."
        ] },
      { k: "D", gist: "Make the headings consistent and align terminology with the organization's standards, and rely on Claude's own fact-checking because the draft was produced from the source data.",
        why: [
          "Sai ở giả định: bản nháp làm từ dữ liệu gốc thì từng con số đã khớp. Có nguồn chỉ giúp bớt sai (ý 4), và tin vào bước kiểm của Claude vẫn là Claude chấm Claude (ý 3).",
          "Phần còn lại chỉ là sửa hình thức (ý 2). Memo đẹp, đúng thuật ngữ mà sai số liệu thì vẫn sai trước hội đồng.",
          "Dễ bị cuốn vì lý do “generated from the source data” (làm từ dữ liệu gốc) nghe như đã có căn cứ. Nhưng có nguồn là kiểm được, chưa phải đã kiểm."
        ] }
    ],
    refs: [
      { label: "Bài 2.5, mục “Một nội dung, nhiều người đọc” và “Bạn quyết, và bạn chịu trách nhiệm”: sửa theo người đọc, người gửi chịu trách nhiệm từng chữ", href: NOTES + "#l-2-5" },
      { label: "Bài 2.3, mục “Sau khi Claude viết: kiểm từng khẳng định”: so với nguồn đang nắm sự thật, không để Claude tự chấm", href: NOTES + "#l-2-3" },
      { label: "Bài mở đầu “Khẩu vị chọn đáp án”, luật 1 và 3: độ tự tin của Claude không phải bằng chứng; sửa hình thức không sửa được nội dung", href: NOTES + "#l-0-3" }
    ]
  },
  {
    de: 4, n: 32, total: 119, sub: "1.4", subName: "Đổi cách prompt theo loại việc",
    answer: "CE",
    ask: "As an operations lead, you are reviewing the prompting approaches teammates have proposed for different kinds of tasks. Which two pairings of strategy and task type are appropriate? (Choose two.)",
    scene: [
      "Một trưởng nhóm vận hành xem lại cách prompt mà đồng nghiệp đề xuất cho từng loại việc.",
      "Có hai kiểu prompt. “Rigid templated prompting” (prompt theo khuôn cứng): đặt sẵn mẫu, các mục và định dạng output phải theo. “Open exploratory prompting” (prompt mở để khám phá): nêu bối cảnh và ràng buộc, để Claude đưa ra nhiều hướng.",
      "Năm phương án ghép một kiểu prompt với một loại việc. Chọn hai cặp ghép đúng."
    ],
    asks: [
      "Hai cặp kiểu prompt và loại việc nào hợp nhau?",
      "Tức là: việc cần độ rộng thì prompt mở; việc mà output phải theo một khuôn cố định thì prompt theo khuôn.",
      "Soi từng phương án: loại việc đó cần độ rộng hay cần khuôn, và kiểu prompt được chọn có cho đúng thứ đó không."
    ],
    facts: [
      "Mỗi loại việc có kiểu hỏng riêng, nên prompt nhấn vào chỗ khác nhau. Brainstorm (nghĩ ý) hỏng khi chỉ ra vài ý quen, na ná nhau. Cách chữa: đòi nhiều ý, khác góc, chấm ở bước sau.",
      "Ràng buộc trong brainstorm (ngân sách, người dùng, thời hạn) chỉ khoanh vùng cho ý, không loại ý nào. Ép khuôn hay đòi “chỉ ý chắc ăn” ngay lúc nghĩ ý là tự cắt mất độ rộng.",
      "Định dạng đi theo nơi nhận. Output phải khớp một khuôn cố định (đúng mục, đúng cột, kỳ nào cũng như nhau) thì prompt phải nói rõ khuôn đó.",
      "Phân tích là đưa dữ liệu thật kèm các điểm cần soi, và đòi mỗi kết luận trỏ về đoạn trích. So một hợp đồng với bộ điều khoản mẫu là việc loại này: cần chính xác và đủ, không cần nhiều hướng."
    ],
    opts: [
      { k: "A", gist: "Rigid templated prompting for early-stage brainstorming of creative names and taglines.",
        why: [
          "Sai: đặt tên, nghĩ khẩu hiệu ở giai đoạn đầu là brainstorm, cần nhiều ý và khác nhau (ý 1).",
          "Khuôn cứng ép mọi ý vào cùng một mẫu, ra đúng kiểu hỏng của brainstorm: vài ý na ná nhau (ý 2)."
        ] },
      { k: "B", gist: "Open exploratory prompting for redlining legal contracts against a library of standard clauses.",
        why: [
          "Sai: redline (đánh dấu chỗ sửa) hợp đồng theo bộ điều khoản mẫu là so với một chuẩn có sẵn. Nó cần chính xác và đủ, không cần nhiều hướng (ý 4).",
          "Prompt mở để Claude tự chọn hướng, dễ sót điều khoản cần soát hoặc bàn sang chuyện ngoài bộ chuẩn. Ở hợp đồng, sót một chỗ lệch là rủi ro thật.",
          "Dễ bị cuốn vì việc pháp lý nghe phức tạp, tưởng cần nghĩ thoáng. Nhưng chính bộ điều khoản mẫu đã là khuôn để so."
        ] },
      { k: "C", gist: "Open exploratory prompting for early-stage strategic brainstorming about entering a new market.",
        why: [
          "Đúng: brainstorm chiến lược ở giai đoạn đầu cần độ rộng. Prompt mở cho nhiều hướng, khác góc, rồi chấm ở bước sau (ý 1).",
          "Bối cảnh thị trường mới là ràng buộc để khoanh vùng, không phải khuôn để ép ý vào (ý 2)."
        ] },
      { k: "D", gist: "Rigid templated prompting for informal summaries of customer feedback where no schema is required.",
        why: [
          "Sai: đề đã nói “no schema” (không có khuôn bắt buộc) và việc chỉ là tóm tắt thoải mái. Không nơi nhận nào đòi khuôn (ý 3).",
          "Khuôn cứng ở đây tốn công dựng mẫu mà không được gì. Nó còn dễ ép những phản hồi lạ vào các mục có sẵn, làm mờ đúng điều đáng chú ý."
        ] },
      { k: "E", gist: "Rigid templated prompting for a monthly compliance report that has to follow a fixed schema.",
        why: [
          "Đúng: báo cáo tuân thủ hằng tháng phải theo một khuôn cố định (ý 3). Mẫu đặt sẵn giữ đúng mục, đúng thứ tự mỗi kỳ, người duyệt so được tháng này với tháng trước.",
          "Việc lặp lại, khuôn không đổi: đúng ca mà khuôn cứng có lợi, chứ không cắt mất gì."
        ] }
    ],
    refs: [
      { label: "Bài 1.4, bảng “Bốn loại việc, bốn kiểu hỏng” và mục “Brainstorm: đòi độ rộng, chấm ở bước sau”", href: NOTES + "#l-1-4" },
      { label: "Bài 2.6, mục “Định dạng đi theo nơi nhận”: output phải vào một khuôn thì prompt nói rõ khuôn đó", href: NOTES + "#l-2-6" }
    ]
  },
  {
    de: 4, n: 33, total: 119, sub: "5.1", subName: "Dựng Project: instructions và knowledge",
    answer: "B",
    ask: "A learning specialist is building a Claude Project for a course-design workflow that comes round again and again. Which setup makes the best use of a Skill together with the Project's other elements?",
    scene: [
      "Một chuyên viên đào tạo dựng Project cho việc thiết kế khóa học, việc lặp đi lặp lại.",
      "Có ba thứ để phối: Skill (gói quy trình cho một loại việc), knowledge (tài liệu nền của Project), và custom instructions (lời dặn áp cho mọi chat trong Project).",
      "Chỗ khó: ba phương án sai tự kể luôn cái hỏng của mình (mâu thuẫn, tắt Skill, thiếu tài liệu). Cái cần biết là mỗi thứ lo phần nào."
    ],
    asks: [
      "Cách cấu hình nào dùng Skill cùng các thành phần khác của Project tốt nhất?",
      "Tức là: ghép đủ ba thứ, mỗi thứ đúng vai, và không để chúng đá nhau."
    ],
    facts: [
      "Skill là thư mục hướng dẫn, script và tài nguyên mà Claude nạp khi việc cần. Hợp với một quy trình cụ thể dùng lại nhiều lần. Skill bật ở Customize → Skills, cần bật tạo và sửa file (code execution).",
      "Project instructions là cách làm, áp cho mọi chat trong Project. Knowledge là tư liệu để tra, chat nào trong Project cũng dùng được. Tư liệu để trong knowledge, kèm một dòng instructions nói khi nào dùng nó.",
      "Hai lời dặn đá nhau thì kết quả lúc thế này lúc thế kia. Không có luật nào cho bên nào thắng, đừng trông Claude tự dung hòa."
    ],
    opts: [
      { k: "A", gist: "Write custom instructions that contradict what the Skill is documented to do, leaving it unclear which guidance Claude should follow in the workflow.",
        why: [
          "Sai: instructions và Skill đá nhau (ý 3). Claude không có luật ổn định để chọn bên nào, mỗi chat ra một kiểu.",
          "Việc lặp lại cần output nhất quán. Mâu thuẫn cài sẵn làm hỏng đúng điều đó."
        ] },
      { k: "B", gist: "Add the relevant Skill to the Project, upload the supporting knowledge sources, and write custom instructions that point to both the Skill and the knowledge.",
        why: [
          "Đúng: mỗi thứ một vai. Skill mang quy trình thiết kế khóa học (ý 1), knowledge mang tư liệu nền, instructions nói cách làm và khi nào dùng Skill, khi nào tra knowledge (ý 2).",
          "Ba thứ trỏ về nhau nên không đá nhau (ý 3), và mọi chat trong Project đều được hưởng mà không ai phải dặn lại."
        ] },
      { k: "C", gist: "Upload the supporting knowledge but switch the relevant Skill off, losing the packaged procedure and making each chat rebuild the steps by hand.",
        why: [
          "Sai: tắt Skill là bỏ đúng phần quy trình đã đóng gói (ý 1). Knowledge chỉ là tư liệu, không chứa cách làm (ý 2).",
          "Mỗi chat phải dặn lại các bước, đúng chuyện mà Project và Skill sinh ra để tránh."
        ] },
      { k: "D", gist: "Add the Skill but leave out the supporting knowledge and any custom instructions, so the Project has neither reference material nor lasting guidance.",
        why: [
          "Sai: Skill lo quy trình, nhưng không thay được tư liệu nền của tổ chức hay lời dặn áp cho mọi chat (ý 1, 2).",
          "Quy trình chạy trên chỗ trống: thiếu chuẩn, thiếu mẫu cũ, thiếu bối cảnh khóa học, nên output chung chung.",
          "Dễ bị cuốn vì Skill nghe như gói trọn mọi thứ. Nhưng Skill là cách làm; tư liệu và lời dặn riêng của Project phải nằm ở chỗ của chúng."
        ] }
    ],
    dispute: "Đề gốc chấm B, sổ giữ B. Lưu ý chữ dùng trong đề: “Add the relevant Skill to the Project” (thêm Skill vào Project). Help Center (“What are skills?”, “Use skills in Claude”) không có bước gắn Skill vào riêng một Project: Skill bật ở Customize → Skills cho cả tài khoản, gói Team và Enterprise thì owner cấp cho tổ chức, và Claude nạp skill khi việc cần. Trang “What are skills?” đặt hai thứ cạnh nhau: Project là tư liệu nền luôn được nạp, Skill là quy trình nạp khi cần. Khi thi hiểu “thêm Skill vào Project” là bật Skill đó và viết instructions trỏ tới nó.",
    refs: [
      { label: "Bài 5.1, bảng “Instructions hay knowledge”: tư liệu vào knowledge, kèm một dòng instructions nói khi nào dùng", href: NOTES + "#l-5-1" },
      { label: "Bài nền tảng Domain 3, mục “Bộ tính năng một associate dùng hằng ngày”: định nghĩa Skills, bảng Project instructions và Skills", href: NOTES + "#l-3-0" },
      { label: "Help Center “What are skills?”: Skill nạp khi cần, Project là tư liệu nền luôn được nạp", href: "https://support.claude.com/en/articles/12512176-what-are-skills" }
    ]
  },
  {
    de: 4, n: 34, total: 119, sub: "4.2", subName: "Research, lập kế hoạch, tối ưu quy trình",
    answer: "C",
    ask: "An operations assistant wants Claude's help improving an intake workflow that is already running, and has the current process documentation plus recent cycle-time data. Which activity uses Claude best for this optimization task?",
    scene: [
      "Một trợ lý vận hành muốn cải thiện quy trình tiếp nhận (intake) đang chạy.",
      "Trong tay có tài liệu mô tả quy trình hiện tại và số liệu cycle time (thời gian một hồ sơ đi hết quy trình) gần đây.",
      "Chỗ khó: bốn phương án đều nghe có ích. Phải xem phương án nào dùng đúng thứ đang có, và để quyết định cuối ở tay ai."
    ],
    asks: [
      "Hoạt động nào tận dụng Claude tốt nhất cho việc tối ưu này?",
      "Tức là: Claude làm được gì với tài liệu và số liệu được đưa, và phần nào phải để người quyết.",
      "Soi từng phương án: nó dựa vào dữ liệu thật hay vào thứ Claude không có, và nó coi output của Claude là đề xuất hay là kết luận."
    ],
    facts: [
      "Tối ưu quy trình với Claude: đưa sơ đồ quy trình, nhờ chỉ chỗ thắt cổ chai (bottleneck, bước làm cả quy trình chậm lại), bước trùng, bước chép tay.",
      "Mỗi đề xuất của Claude là giả thuyết. Bước bị chê là thừa có thể là chữ ký bắt buộc. Người chủ quy trình hỏi lại người đang làm bước đó, rồi chọn thay đổi đơn giản nhất.",
      "Claude chỉ thấy những gì được đưa vào. Dữ liệu nội bộ và lý do riêng của tổ chức không nằm trong dữ liệu huấn luyện. Claude cũng không tự đi nói chuyện với đồng nghiệp: nó làm việc trên chữ và file được đưa vào chat."
    ],
    opts: [
      { k: "A", gist: "Have Claude draft an optimized intake process from industry benchmarks, then compare it with the current process to find gaps.",
        why: [
          "Sai ở điểm xuất phát: bỏ số liệu cycle time thật đang có, đi từ “industry benchmarks” (số chuẩn của ngành) mà Claude không có nguồn chắc chắn (ý 3).",
          "Quy trình mẫu chung chung không biết lý do riêng của tổ chức. Khoảng trống tìm ra là khoảng trống so với một hình mẫu, không phải chỗ đang thật sự chậm."
        ] },
      { k: "B", gist: "Use Claude to forecast how much each proposed change will cut cycle time and rank the changes, so the team implements them in that order.",
        why: [
          "Sai ở chỗ coi dự đoán của Claude là kết luận. Con số tác động là giả thuyết (ý 2), mà phương án lại đem thứ hạng đó đi làm luôn.",
          "Không có bước người chủ quy trình kiểm lại với người đang làm. Bước bị xếp là chậm có thể là bước kiểm bắt buộc.",
          "Dễ bị cuốn vì xếp hạng theo con số nghe rất khoa học. Nhưng con số dự đoán là chữ Claude sinh ra, chưa ai đo."
        ] },
      { k: "C", gist: "Map the current intake process, use the cycle-time data to point out likely bottlenecks, and propose optimization options for people to review.",
        why: [
          "Đúng: dùng đúng hai thứ đang có, tài liệu quy trình và số liệu cycle time, để chỉ chỗ thắt cổ chai (ý 1).",
          "Output là các phương án đưa người duyệt, đúng tinh thần đề xuất là giả thuyết, người chủ việc quyết (ý 2)."
        ] },
      { k: "D", gist: "Use Claude to interview every team member who works on intake and turn the interview output into a redesigned workflow.",
        why: [
          "Sai: Claude không tự đi phỏng vấn đồng nghiệp (ý 3). Nó chỉ làm việc trên những gì được đưa vào.",
          "Phương án còn đi thẳng tới “redesigned workflow” (quy trình thiết kế lại) mà không có bước người duyệt (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 4.2, mục “Tối ưu quy trình: lời chê của Claude là giả thuyết”", href: NOTES + "#l-4-2" },
      { label: "Bài 4.5, mục “Claude biết gì, và không biết gì”: dữ liệu nội bộ phải đưa vào", href: NOTES + "#l-4-5" }
    ]
  },
  {
    de: 4, n: 35, total: 119, sub: "4.5", subName: "Nói với stakeholder về giá trị và giới hạn",
    answer: "D",
    ask: "An executive who approves the team's AI-tools budget says Claude will make human review of customer-facing content unnecessary. How should the associate respond?",
    scene: [
      "Một lãnh đạo tuyên bố Claude sẽ làm cho việc người duyệt nội dung gửi khách không còn cần nữa.",
      "Chỗ khó: người này duyệt ngân sách công cụ AI của team. Nói ngược ý họ nghe như rủi ro cho chính team mình.",
      "Bốn phương án là bốn thái độ: đẩy lên người khác, chạy thử ý của lãnh đạo, chiều theo, hay nói thẳng có dẫn chứng."
    ],
    asks: [
      "Cách trả lời nào hợp nhất?",
      "Tức là: nói sao cho lãnh đạo thấy đúng giá trị của Claude mà không hứa quá, và không để nội dung chưa ai duyệt tới tay khách.",
      "Soi từng phương án: nội dung gửi khách có còn người duyệt không, và lãnh đạo có được nghe sự thật về giới hạn không."
    ],
    facts: [
      "Bán cho đúng: người làm cùng Claude, không phải Claude thay người. Claude mang tốc độ và quy mô; người mang phán đoán và giám sát. Ca trong notes: PM nói có Claude soạn hợp đồng thì khỏi cần pháp chế duyệt. Câu đúng: soạn nhanh hơn nhiều, nhưng người có chuyên môn vẫn đọc trước khi dùng.",
      "Hallucination (bịa) là đặc tính đã biết, dồn vào chi tiết: tên, số liệu, ngày, trích dẫn. Các biện pháp giảm lỗi chứ không xóa hẳn.",
      "Người nhận là khách hàng, và nội dung đã gửi thì không rút lại được: hai tín hiệu nâng mức duyệt.",
      "Chạy thử thì giữ bước duyệt, đạt tiêu chí rồi mới mở rộng. Giải thích lỗi bằng ví dụ cụ thể (“chỗ hụt là X, nên ta làm Y”), thay cho câu chung chung “AI không đáng tin”."
    ],
    opts: [
      { k: "A", gist: "Before replying directly, escalate the executive's claim to a senior leader outside the team, because the issue reaches beyond this team.",
        why: [
          "Sai: chưa nói chuyện thẳng đã đẩy lên trên. Đây là một nhận định sai về sản phẩm, trả lời được ngay bằng sự thật (ý 1, 2).",
          "Vượt cấp làm hỏng quan hệ với chính người duyệt ngân sách, mà lãnh đạo vẫn chưa nghe được vì sao cần người duyệt."
        ] },
      { k: "B", gist: "Pilot the executive's proposal on a low-risk slice of customer-facing content first, then use the results to argue for keeping human review on higher-risk content.",
        why: [
          "Sai ở chỗ đem khách ra thử: “low-risk” (rủi ro thấp) nhưng vẫn là nội dung gửi khách, và chạy thử ý của lãnh đạo nghĩa là không ai duyệt (ý 3). Lỗi lọt qua là tới tay khách, không rút lại được.",
          "Chạy thử đúng cách vẫn giữ bước duyệt (ý 4). Vài tuần không thấy lỗi cũng không chứng minh được bỏ duyệt là an toàn.",
          "Dễ bị cuốn vì “pilot” (chạy thử) nghe bài bản, có số liệu rồi mới bàn. Nhưng nó lùi cuộc nói chuyện cần có ngay: lãnh đạo đang hiểu sai giới hạn của Claude (ý 1)."
        ] },
      { k: "C", gist: "Defer to the executive's authority, remove the human review step for customer-facing content, and monitor the results closely for the first several weeks.",
        why: [
          "Sai: bỏ bước duyệt ở đúng chỗ tín hiệu đỏ, người nhận là khách và đã gửi thì không rút lại (ý 3). Chức vụ của người ra lệnh không làm Claude bớt bịa (ý 2).",
          "“Monitor closely” (theo dõi sát) là gửi trước, sửa sau: lỗi tới tay khách rồi mới biết."
        ] },
      { k: "D", gist: "Acknowledge the productivity gains, then use specific examples to explain why customer-facing content still needs human review because of accuracy and brand risk.",
        why: [
          "Đúng: nói cả giá trị (năng suất) lẫn giới hạn, đúng khung “người làm cùng Claude” (ý 1).",
          "Lý do giữ bước duyệt gắn với đúng tình huống: khách là người nhận, nội dung khó rút lại (ý 3), chi tiết có thể sai mà nghe rất trôi (ý 2). Ví dụ cụ thể giúp lãnh đạo thấy lỗi có thật và nằm ở đâu (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Bán cho đúng: người làm cùng Claude, không phải Claude thay người” và “Hứa biện pháp, không hứa hoàn hảo”", href: NOTES + "#l-4-5" },
      { label: "Bài 2.4, mục “Output nào cũng được xem”: năm tín hiệu nâng mức duyệt, người nhận là khách", href: NOTES + "#l-2-4" },
      { label: "Bài 4.4, mục “Chạy thử một việc thật trước khi mở rộng”: chạy thử vẫn giữ bước duyệt", href: NOTES + "#l-4-4" }
    ]
  },
  {
    de: 4, n: 36, total: 119, sub: "5.3", subName: "Viết chỉ dẫn cấp hệ thống",
    answer: "C",
    ask: "A support rep runs a Project that drafts apology emails to customers after service outages. Its custom instructions read: “be empathetic and casual, keep it short, and offer a goodwill credit.” The customer-service team reports that recent drafts are too short, offer goodwill credits that policy does not allow, and use contractions the brand voice guide forbids. Which change best fits the configuration to the use case?",
    scene: [
      "Một nhân viên hỗ trợ dùng Project soạn email xin lỗi khách sau sự cố dịch vụ.",
      "Instructions hiện tại: “be empathetic and casual, keep it short, and offer a goodwill credit” (đồng cảm và thân mật, viết ngắn, tặng khoản bồi thường thiện chí).",
      "Ba lỗi được báo về: thư quá ngắn, tặng bồi thường cả khi chính sách không cho, và dùng contraction (dạng viết tắt như “we’re”, “don’t”) mà sổ tay giọng thương hiệu cấm.",
      "Chỗ khó: cả ba lỗi đều do chính instructions bảo Claude làm. Claude đang làm đúng chữ được dặn."
    ],
    asks: [
      "Thay đổi nào làm cấu hình khớp với việc nhất?",
      "Tức là: viết lại instructions sao cho cả ba lỗi hết, bằng quy tắc cụ thể, không để lời dặn nào đá nhau.",
      "Soi từng phương án: nó chữa được lỗi nào trong ba lỗi, và có để lại lời dặn cũ đang gây lỗi không."
    ],
    facts: [
      "Chỉ dẫn phải cụ thể. Phép thử của Anthropic: đưa cho một đồng nghiệp chưa biết gì, họ bối rối thì Claude cũng vậy. “Casual”, “keep it short” không nói thư dài cỡ nào, viết theo quy tắc nào.",
      "Bộ khung chỉ dẫn có phần định dạng (độ dài, cấu trúc), nguồn (dựa vào tài liệu nào), và ưu tiên (quy tắc nào thắng khi va nhau).",
      "Knowledge là tư liệu để tra, không phải lời dặn. Tài liệu trong knowledge cần một dòng instructions nói khi nào dùng nó. Khi RAG (chỉ lấy đoạn liên quan tới câu hỏi) bật, có lúc tài liệu không được đọc tới.",
      "Hai lời dặn cùng tầng đá nhau thì kết quả lúc thế này lúc thế kia. Sửa bằng cách nói rõ quy tắc nào áp khi nào, không trông Claude tự dung hòa."
    ],
    opts: [
      { k: "A", gist: "Swap “be empathetic and casual” for “match the brand voice guide”, delete the goodwill-credit instruction, and let each draft settle its own length depending on the incident.",
        why: [
          "Chữa được một phần: bỏ “casual” và bỏ lệnh tặng bồi thường.",
          "Nhưng “let each draft determine its own length” (để từng thư tự quyết độ dài) không chữa lỗi thư quá ngắn, vì không đặt mức nào (ý 1, 2).",
          "Bỏ hẳn chuyện bồi thường lại sai về phía kia: khách đủ điều kiện theo chính sách cũng không được đề xuất. “Match the brand voice guide” cũng chưa nói rõ thuộc tính giọng nào, nhất là quy tắc không viết tắt (ý 1)."
        ] },
      { k: "B", gist: "Put the brand voice guide and the goodwill-credit policy into the Project knowledge and let those documents alone govern tone, length and credits, leaving the custom instructions as they are.",
        why: [
          "Sai: instructions cũ vẫn nguyên, vẫn bảo “casual”, “keep it short”, “offer a goodwill credit”. Lời dặn gây lỗi còn đó thì lỗi còn đó.",
          "Knowledge là tư liệu, không phải lời dặn (ý 3). Không dòng instructions nào bảo dùng nó, còn lời dặn hiện có lại nói ngược với tài liệu: hai bên đá nhau (ý 4).",
          "Dễ bị cuốn vì đưa tài liệu gốc vào nghe rất chuẩn. Nhưng chỗ cấu hình đang sai là instructions, và phương án này không đụng tới nó."
        ] },
      { k: "C", gist: "Spell out the brand voice attributes (empathetic, formal, no contractions), set a minimum length, and tell Claude to recommend a goodwill credit only when the attached eligibility policy allows it.",
        why: [
          "Đúng: chữa đủ ba lỗi bằng quy tắc cụ thể. Giọng trang trọng, không viết tắt chữa lỗi giọng; độ dài tối thiểu chữa lỗi quá ngắn (ý 1, 2).",
          "Bồi thường gắn vào chính sách điều kiện đã đính kèm: instructions nói rõ khi nào dùng tài liệu đó (ý 3). Khách đủ điều kiện vẫn được đề xuất, khách không đủ thì không.",
          "Viết lại thay cho lời dặn cũ, nên không còn hai quy tắc đá nhau (ý 4)."
        ] },
      { k: "D", gist: "Keep the current instructions and add one sentence telling Claude to consult the brand voice guide and the goodwill-credit policy stored in the Project knowledge.",
        why: [
          "Sai: giữ lời dặn cũ là giữ nguyên nguồn gây lỗi. “Casual” đá với sổ tay giọng, “offer a goodwill credit” đá với chính sách (ý 4).",
          "Claude nhận hai lời dặn ngược nhau trong cùng instructions, nên thư lúc theo bên này lúc theo bên kia. Lỗi chỉ bớt, không hết.",
          "Dễ bị cuốn vì nó thêm đúng một dòng instructions trỏ tới knowledge (ý 3). Nhưng thêm mà không gỡ lời dặn sai thì vẫn đá nhau."
        ] }
    ],
    refs: [
      { label: "Bài 5.3, mục “Bộ khung bảy phần” và “Xung đột: cùng tầng và khác tầng”", href: NOTES + "#l-5-3" },
      { label: "Bài 5.1, bảng “Instructions hay knowledge”: tài liệu vào knowledge kèm một dòng instructions nói khi nào dùng", href: NOTES + "#l-5-1" }
    ]
  },
  {
    de: 4, n: 37, total: 119, sub: "3.3", subName: "Chọn model theo chi phí, tốc độ, chất lượng",
    answer: "CE",
    ask: "As an HR specialist, you are reviewing the model choices colleagues made for various tasks. Which two choices match the model to the task appropriately? (Choose two.)",
    scene: [
      "Một chuyên viên nhân sự xem lại cách đồng nghiệp chọn model cho từng việc.",
      "Có hai loại model: “higher-capability” (mạnh hơn, lập luận sâu hơn) và “lighter, faster” (nhẹ, nhanh).",
      "Năm phương án ghép một loại model với một việc. Chọn hai cặp ghép đúng."
    ],
    asks: [
      "Hai lựa chọn nào ghép đúng model với việc?",
      "Tức là: xem việc khó cỡ nào, cần nhanh cỡ nào, làm bao nhiêu lần, sai thì mất gì, rồi xem model được chọn có hợp không."
    ],
    facts: [
      "Bốn câu hỏi trước khi chọn model: việc khó cỡ nào, cần nhanh cỡ nào, làm bao nhiêu lần, sai thì mất gì.",
      "Việc nhiều, ngắn, đơn giản, cần nhanh và rẻ thì chọn tầng nhẹ. Lập luận nhiều bước, nhiều nguồn, sai thì tốn kém thì chọn tầng mạnh.",
      "Khớp model với việc. “Luôn dùng model xịn nhất” là phí tiền và thời gian. Giá không phải tiêu chí chọn.",
      "Việc đơn giản thì các tầng ra gần như nhau. Khác biệt lộ ra ở việc khó."
    ],
    opts: [
      { k: "A", gist: "A higher-capability model chosen only because it is the most expensive option.",
        why: [
          "Sai ở tiêu chí: chọn theo giá, không theo việc (ý 3). Phương án không nói việc gì, nên không trả lời được câu hỏi nào trong bốn câu (ý 1).",
          "Đắt nhất không có nghĩa là hợp nhất. Với việc dễ, nó chỉ chậm hơn và tốn hơn."
        ] },
      { k: "B", gist: "A higher-capability model for one-line keyword extraction run at high volume.",
        why: [
          "Sai: trích từ khóa một dòng là việc đơn giản, làm rất nhiều lần. Đúng ca của tầng nhẹ (ý 2).",
          "Tầng mạnh ở đây cho kết quả gần như tầng nhẹ (ý 4), nhưng mỗi lần chậm và tốn hơn. Nhân với số lượng lớn thành một khoản phí lớn."
        ] },
      { k: "C", gist: "A higher-capability model for complex, multi-step legal reasoning that goes through review.",
        why: [
          "Đúng: lập luận pháp lý nhiều bước là việc khó, sai thì hậu quả thật. Đúng ca của tầng mạnh (ý 1, 2).",
          "“under review” (có người duyệt) không thay cho chọn model đúng. Model mạnh cho bản nháp tốt hơn, còn người có chuyên môn vẫn duyệt trước khi dùng."
        ] },
      { k: "D", gist: "A lighter, faster model for nuanced strategic synthesis across several documents.",
        why: [
          "Sai: tổng hợp chiến lược từ nhiều tài liệu, cần hiểu sắc thái, là việc khó (ý 2). Đó đúng là chỗ khoảng cách giữa các tầng lộ ra (ý 4).",
          "Nhanh và rẻ không bù được một bản tổng hợp chiến lược hời hợt."
        ] },
      { k: "E", gist: "A lighter, faster model for routine FAQ-style replies under a tight latency budget.",
        why: [
          "Đúng: trả lời câu hỏi thường gặp (FAQ) là việc lặp lại, đơn giản, và “tight latency budgets” (thời gian chờ phải ngắn) đặt tốc độ lên trước (ý 1, 2).",
          "Với việc đơn giản, tầng nhẹ cho chất lượng gần như tầng mạnh (ý 4), mà nhanh hơn, tốn ít hơn."
        ] }
    ],
    refs: [
      { label: "Bài 3.3, mục “Bốn câu hỏi trước khi chọn” và bảng chọn tầng theo đề kể", href: NOTES + "#l-3-3" },
      { label: "Bài mở đầu “Khẩu vị chọn đáp án”, luật 4: khớp model với việc, “luôn dùng model xịn nhất” là phí", href: NOTES + "#l-0-3" },
      { label: "Docs “Choosing the right model”: tầng nhẹ cho việc nhiều, đơn giản, cần độ trễ thấp; tầng mạnh cho lập luận phức tạp", href: "https://platform.claude.com/docs/en/about-claude/models/choosing-a-model" }
    ]
  },
  {
    de: 4, n: 38, total: 119, sub: "3.3", subName: "Chọn model theo chi phí, tốc độ, chất lượng",
    answer: "AC",
    ask: "As a project manager at Orinexa, Inc., you are choosing a Claude model for a new production workload and have to finish the requirements steps before you test any candidates. Which two steps must be completed BEFORE testing candidate models on a representative sample? (Choose two.)",
    scene: [
      "Một quản lý dự án chọn model Claude cho một khối việc mới sắp chạy thật (production).",
      "Đề hỏi thứ tự: bước nào phải xong <b>trước</b> khi thử các model ứng viên trên một mẫu việc đại diện.",
      "Chỗ khó: năm phương án đều là bước thật của quy trình chọn model. Ba bước nằm sau bước thử, chỉ hai bước nằm trước."
    ],
    asks: [
      "Hai bước nào phải xong trước khi thử model ứng viên?",
      "Tức là: muốn thử có ý nghĩa thì phải có gì trong tay: thước đo để chấm, và danh sách model để thử.",
      "Soi từng phương án: bước đó có cần kết quả thử làm đầu vào không. Cần thì nó nằm sau."
    ],
    facts: [
      "Bốn câu hỏi trước khi chọn model: việc khó cỡ nào (mức chất lượng), cần nhanh cỡ nào (độ trễ), làm bao nhiêu lần (số lượng), sai thì mất gì.",
      "Docs “Choosing the right model” đi theo thứ tự: đặt tiêu chí (năng lực, tốc độ, chi phí), chọn model để bắt đầu thử, rồi thử bằng prompt và dữ liệu thật.",
      "Thử là so các model trên cùng việc thật theo tiêu chí đã đặt, rồi mới cân với chi phí. Không có tiêu chí thì thử xong cũng không biết model nào đạt.",
      "Đưa lên production, ký duyệt kế hoạch triển khai, thử lại khi có model mới đều cần kết quả thử, nên nằm sau."
    ],
    opts: [
      { k: "A", gist: "Set the quality bar, the acceptable latency and the expected request volume.",
        why: [
          "Đúng: đây là tiêu chí để chấm bước thử (ý 1, 2). Không có nó thì thử xong cũng không biết model nào đạt (ý 3).",
          "Ba thứ này cũng quyết định nên thử tầng nào: độ trễ chặt, số lượng lớn thì nghiêng về tầng nhẹ."
        ] },
      { k: "B", gist: "Re-test the chosen model each time a new model version comes out.",
        why: [
          "Sai thứ tự: thử lại khi có bản mới là việc bảo trì, sau khi đã chọn và đang chạy (ý 4).",
          "Chưa thử lần đầu thì chưa có “selected model” (model đã chọn) để thử lại."
        ] },
      { k: "C", gist: "Shortlist candidate models based on the requirements profile and what each model is known to do well.",
        why: [
          "Đúng: có tiêu chí rồi thì chọn ứng viên, docs gọi là chọn model để bắt đầu (ý 2).",
          "Bước này lấy A làm đầu vào, và là đầu vào của bước thử. Không có danh sách ứng viên thì không có gì để thử."
        ] },
      { k: "D", gist: "Move the selected model onto production traffic for the workload.",
        why: [
          "Sai thứ tự: đưa lên production là bước cuối, chỉ làm khi model đã đạt tiêu chí trong bước thử (ý 4).",
          "Làm trước khi thử là cho khối việc thật chạy trên một model chưa ai kiểm."
        ] },
      { k: "E", gist: "Get the platform and security teams to sign off the production rollout plan.",
        why: [
          "Sai thứ tự: kế hoạch triển khai dựa vào model đã chọn và kết quả thử (ý 4).",
          "Dễ bị cuốn vì ký duyệt với đội bảo mật nghe như việc phải làm sớm. Nhưng đề hỏi bước yêu cầu trước khi thử, không hỏi bước duyệt triển khai."
        ] }
    ],
    refs: [
      { label: "Bài 3.3, mục “Bốn câu hỏi trước khi chọn” và “Thử trên việc thật trước khi đổi tầng”", href: NOTES + "#l-3-3" },
      { label: "Docs “Choosing the right model”: đặt tiêu chí, chọn model bắt đầu, thử bằng prompt và dữ liệu thật", href: "https://platform.claude.com/docs/en/about-claude/models/choosing-a-model" }
    ]
  },
  {
    de: 4, n: 39, total: 119, sub: "4.5", subName: "Nói với stakeholder về giá trị và giới hạn",
    answer: "BC",
    ask: "As a communications specialist, you are getting ready to explain Claude's role in a workflow to several stakeholder groups, and your preparation must be finished before any messages are drafted. Which two preparation activities must be completed BEFORE drafting the stakeholder messages? (Choose two.)",
    scene: [
      "Một chuyên viên truyền thông chuẩn bị giải thích vai trò của Claude trong một quy trình cho nhiều nhóm stakeholder (bên liên quan).",
      "Chữ quyết định: “BEFORE drafting” (trước khi soạn). Đề chỉ hỏi phần chuẩn bị.",
      "Chỗ khó: cả năm phương án đều là việc có thật trong một đợt truyền thông. Ba việc chỉ làm được khi đã có bản soạn."
    ],
    asks: [
      "Hai việc chuẩn bị nào phải xong trước khi soạn thông điệp?",
      "Tức là: muốn soạn được thì phải biết nói với ai, và nói điều gì.",
      "Soi từng phương án: nó có cần bản soạn có sẵn mới làm được không. Cần thì nó nằm sau."
    ],
    facts: [
      "Nhóm người đọc khác nền thì cần bản khác, mỗi bản đúng mức của nhóm đó. Trước khi viết phải biết có những nhóm nào, mỗi nhóm cần hiểu gì.",
      "Nói với stakeholder về Claude phải nói cả giá trị lẫn giới hạn: Claude làm phần nào, chỗ nào người vẫn duyệt. Chỉ kể điểm mạnh là dọn chỗ cho thất vọng.",
      "Độ chính xác áp cho mọi bản. Mỗi bản được đổi cách giải thích, không được đổi sự thật.",
      "Lưu trữ, gửi đi, gom phản hồi, tổ chức buổi hỏi đáp đều cần thông điệp đã soạn xong."
    ],
    opts: [
      { k: "A", gist: "File the drafted messages in the corporate communications repository.",
        why: [
          "Sai thứ tự: lưu trữ cần bản soạn có sẵn (ý 4). Chính phương án gọi nó là “drafted messages” (thông điệp đã soạn).",
          "Đây là việc cuối cùng, không phải chuẩn bị."
        ] },
      { k: "B", gist: "Identify the stakeholder groups and what each one needs to understand.",
        why: [
          "Đúng: biết nói với ai thì mới soạn đúng mức cho từng nhóm (ý 1). Ví dụ: lãnh đạo cần thấy giá trị và rủi ro, người dùng hằng ngày cần biết bước nào đổi.",
          "Không có bước này thì chỉ soạn được một bản chung, nhóm nào đọc cũng thiếu."
        ] },
      { k: "C", gist: "Pin down the key facts about Claude's role and the boundaries that apply to it.",
        why: [
          "Đúng: đây là nội dung của thông điệp. Chốt trước Claude làm gì, giới hạn ở đâu, người vẫn giữ phần nào (ý 2).",
          "Một bộ sự thật chốt chung thì các bản cho từng nhóm không nói lệch nhau, chỉ khác cách giải thích (ý 3)."
        ] },
      { k: "D", gist: "Send the drafted messages out and gather feedback to revise them.",
        why: [
          "Sai thứ tự: gửi và gom phản hồi chỉ làm được khi đã có bản soạn (ý 4).",
          "Dễ bị cuốn vì gom phản hồi nghe như bước tìm hiểu người đọc. Nhưng tìm hiểu người đọc là B, làm trước; phản hồi sau khi gửi là vòng sửa."
        ] },
      { k: "E", gist: "Schedule a follow-up forum to handle the questions the messages raise.",
        why: [
          "Sai thứ tự: câu hỏi chỉ nảy ra sau khi người ta đọc thông điệp (ý 4).",
          "Buổi hỏi đáp có ích, nhưng thuộc bước sau khi gửi."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Cho stakeholder một cách hiểu Claude vừa đủ dùng” và “Bán cho đúng”: nói cả giá trị lẫn giới hạn", href: NOTES + "#l-4-5" },
      { label: "Bài 2.5, mục “Một nội dung, nhiều người đọc”: mỗi nhóm một bản, cùng sự thật đã kiểm", href: NOTES + "#l-2-5" }
    ]
  },
  {
    de: 4, n: 40, total: 119, sub: "3.2", subName: "Haiku, Sonnet, Opus khác nhau ở đâu",
    answer: "C",
    ask: "You are an operations manager making a quick-reference card for your team. Which statement gives an accurate general description of the three Claude model tiers?",
    scene: [
      "Một quản lý vận hành làm thẻ tra nhanh cho team, cần một câu mô tả ba tầng model Claude.",
      "Chỗ khó: các phương án sai mỗi cái lệch một kiểu: đảo ngược tầng, coi ba tầng sâu như nhau, hay gán tốc độ nhầm tầng."
    ],
    asks: [
      "Mô tả nào đúng về ba tầng, nói chung?",
      "Tức là: ghép đúng mỗi tầng với vị trí của nó trên trục sâu, nhanh, tốn."
    ],
    facts: [
      "Ba tầng là ba cỡ của cùng một họ model, trên cùng một trục: lên tầng thì lập luận sâu hơn nhưng chậm hơn, tốn hơn.",
      "Haiku nhanh nhất, nhẹ nhất. Sonnet là tầng giữa, dùng hằng ngày; Anthropic khuyên người dùng app chọn Sonnet khi chưa biết chọn gì. Opus lập luận sâu nhất trong ba tầng guide nêu, chậm hơn và tốn hơn.",
      "Ba tầng giống nhau về thông số giới hạn: cùng context window, cùng nhận chữ và ảnh, cùng dùng tool. Thông số giống nhau không có nghĩa là lập luận sâu như nhau.",
      "Việc đơn giản thì ba tầng cho kết quả gần như nhau. Khác biệt lộ ra ở việc khó."
    ],
    opts: [
      { k: "A", gist: "Haiku is the most capable model for the deepest reasoning, and Opus is the lightweight one for quick replies.",
        why: [
          "Sai: đảo ngược trục (ý 1, 2). Haiku là tầng nhanh, nhẹ; Opus mới là tầng lập luận sâu.",
          "Thẻ tra nhanh ghi thế này thì team đem việc khó cho Haiku, việc vặt cho Opus: hỏng cả hai đầu."
        ] },
      { k: "B", gist: "All three models reason equally deeply and differ only in response speed and cost.",
        why: [
          "Sai: độ sâu lập luận khác nhau thật (ý 1). Tốc độ và chi phí đi kèm với độ sâu, không tách riêng.",
          "Dễ bị cuốn vì ba tầng giống nhau về thông số (ý 3), và việc đơn giản thì ra gần như nhau (ý 4). Nhưng ở việc khó thì khoảng cách lộ ra, và đó là lý do phải chọn tầng."
        ] },
      { k: "C", gist: "Haiku is quick and lightweight, Sonnet is the balanced default for most everyday work, and Opus is the most capable for complex reasoning, at higher latency and cost.",
        why: [
          "Đúng cả ba vị trí trên trục (ý 1, 2): Haiku nhanh, nhẹ; Sonnet cân bằng, làm mặc định; Opus sâu nhất, đổi lại chậm và tốn hơn.",
          "Đủ ngắn cho một thẻ tra nhanh, mà vẫn nói được cái giá của tầng mạnh."
        ] },
      { k: "D", gist: "Sonnet is the fastest of the three, since its architecture is tuned for speed rather than reasoning depth.",
        why: [
          "Sai: tầng nhanh nhất là Haiku, không phải Sonnet (ý 2).",
          "Lý do về kiến trúc cũng không có trong docs. Sonnet là tầng giữa, cân bằng giữa độ sâu và tốc độ."
        ] }
    ],
    dispute: "Đề gốc chấm C, giữ nguyên. Lưu ý: app và docs hiện có thêm tầng Fable ở trên Opus (trang “Choosing the right model” lúc đọc ngày 18/11/2026 ghi Fable 5.2), nên “Opus is the most capable” (Opus mạnh nhất) chỉ đúng trong ba tầng guide v1.0 nêu. Trang đó cũng ghi “Most workloads start with Claude Opus 5.5” (phần lớn khối việc bắt đầu với Opus 5.5), nhưng đó là hướng dẫn cho developer gọi API; bảng của cùng trang vẫn xếp Sonnet cho việc hằng ngày. Khi thi nghĩ theo ba tầng của guide.",
    refs: [
      { label: "Bài 3.2, mục “Ba tầng của cùng một họ model” và “Cái giống nhau không giúp bạn chọn”", href: NOTES + "#l-3-2" },
      { label: "Bài 8.3: guide có ba tầng, app có thêm Fable; khi thi trả lời theo guide", href: NOTES + "#l-8-3" }
    ]
  },
  {
    de: 4, n: 41, total: 119, sub: "3.4", subName: "Context có hạn: chat mới, tóm tắt, lưu lại",
    answer: "BC",
    ask: "A project manager is in a long planning conversation with Claude that keeps growing, and wants it to stay productive. Which two practices help keep a long planning conversation productive? (Choose two.)",
    scene: [
      "Một quản lý dự án lên kế hoạch cùng Claude trong một cuộc hội thoại dài, và nó cứ dài thêm.",
      "Chủ đề chuyển dần: hết phần này sang phần khác của cùng một kế hoạch.",
      "Chỗ khó: chat càng dài, Claude càng dễ quên ràng buộc chốt từ đầu, mà câu trả lời vẫn đọc trôi chảy."
    ],
    asks: [
      "Hai cách nào giữ cho cuộc hội thoại lập kế hoạch dài vẫn hiệu quả?",
      "Tức là: giữ những gì đã chốt (mục tiêu, ràng buộc, quyết định) luôn rõ trước mắt Claude, khi chat dài ra và chủ đề đổi.",
      "Soi từng phương án: nó làm phần đã chốt rõ hơn, hay làm context rối hơn, hay vứt luôn phần đã chốt?"
    ],
    facts: [
      "Context rot (context bị mục): token trong context càng nhiều, Claude nhớ chính xác thông tin trong đó càng kém. Nhiều hơn chưa chắc tốt hơn.",
      "Trên gói trả phí có bật code execution, chat dài được Claude tự tóm tắt. Con số hay ràng buộc chốt từ đầu có thể bị nén mất. Cách giữ: nhắc lại con số, ràng buộc, quyết định quan trọng trong tin nhắn tiếp theo.",
      "Cùng một mạch việc mà chat đã dài: tóm tắt các quyết định, con số, ràng buộc, việc còn mở. Chuyển sang việc không liên quan: mở chat mới.",
      "Mở chat mới chỉ “miễn phí” khi thứ quan trọng đã được lưu. Chưa lưu mà bỏ chat là bỏ luôn các quyết định trong đó."
    ],
    opts: [
      { k: "A", gist: "Start a fresh thread for every small follow-up question so that each thread stays short.",
        why: [
          "Sai ở chỗ dùng chat mới cho câu hỏi nhỏ cùng mạch. Chat mới dành cho việc không liên quan (ý 3).",
          "Chat mới không mang theo mục tiêu, ràng buộc, quyết định đã chốt (ý 4). Kế hoạch bị xé thành nhiều mảnh, câu hỏi nhỏ nào cũng phải dặn lại từ đầu.",
          "Dễ bị cuốn vì chat ngắn đúng là đỡ context rot. Nhưng chat ngắn mà thiếu phần đã chốt thì câu trả lời lệch khỏi kế hoạch."
        ] },
      { k: "B", gist: "When the discussion moves on to a new subtopic, state the goals and constraints again.",
        why: [
          "Đúng cách giữ của bài 3.4: chat đã dài thì nhắc lại ràng buộc, quyết định quan trọng (ý 2).",
          "Lúc chuyển sang chủ đề con là lúc Claude dễ trả lời theo phần mới mà quên khung chung. Nhắc lại thì phần mới vẫn nằm trong mục tiêu và ràng buộc của cả kế hoạch."
        ] },
      { k: "C", gist: "Every so often, summarize the decisions made so far so the working state is kept in compact form.",
        why: [
          "Đúng: tóm tắt các quyết định, con số, việc còn mở là cách xử lý một chat cùng mạch đã dài (ý 3).",
          "Bản tóm tắt gọn nằm ngay trước mắt Claude, không chìm giữa hàng trăm tin nhắn (ý 1). Nó cũng là bản để mang sang chat mới khi cần (ý 4).",
          "B và C bổ sung nhau: B giữ khung khi đổi chủ đề, C gom những gì đã chốt."
        ] },
      { k: "D", gist: "Jump freely back and forth between unrelated planning topics inside the same thread.",
        why: [
          "Sai: việc không liên quan phải sang chat mới (ý 3). Trộn nhiều việc trong một chat là đúng nguyên nhân làm Claude lẫn chi tiết việc này sang việc kia.",
          "Context dài thêm bằng thứ không dính tới phần đang bàn (ý 1)."
        ] },
      { k: "E", gist: "Never summarize, so that the model keeps every original word it has written.",
        why: [
          "Sai ở giả định: giữ nguyên mọi chữ không có nghĩa Claude nhớ đúng mọi chữ. Context càng dài, Claude nhớ càng kém (ý 1).",
          "Trên gói trả phí, chat dài vẫn bị tự tóm tắt (ý 2). Không tự tóm tắt thì phần bị nén do máy chọn, không phải do người lập kế hoạch chọn giữ cái gì."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, mục “Chat dài trên gói trả phí: Claude tự tóm tắt” và bảng “Mở chat mới, tóm tắt, hay lưu lại”: nhắc lại ràng buộc, cùng mạch thì tóm tắt", href: NOTES + "#l-3-4" },
      { label: "Bài nền tảng D7, cần gạt 3 “Hội thoại lệch hướng hoặc quá dài”: lẫn chi tiết việc khác, quên yêu cầu đầu chat", href: NOTES + "#l-7-0" }
    ]
  },
  {
    de: 4, n: 42, total: 119, sub: "6.2", subName: "Dữ liệu nhạy cảm và quy định",
    answer: "BE",
    ask: "A finance manager is about to discuss with Claude a confidential figure that has not yet been publicly announced. Which two settings best reflect sound privacy practice for this conversation? (Choose two.)",
    scene: [
      "Một quản lý tài chính sắp bàn với Claude một con số mật, chưa công bố (pre-announcement: trước ngày công bố chính thức).",
      "Memory (bộ nhớ của Claude) tự ghi các ý từ chat này để dùng ở chat sau, không cần ai dặn “nhớ cái này”.",
      "Chỗ khó: con số chỉ nhắc qua một lần cũng có thể bị ghi lại, rồi hiện ra ở một chat không liên quan về sau."
    ],
    asks: [
      "Hai cài đặt nào đúng cách giữ kín cho cuộc trao đổi này?",
      "Tức là: chặn con số mật khỏi thành bối cảnh lâu dài trong memory, đi theo sang các phiên sau.",
      "Soi từng phương án: nó chặn memory ghi chat này, hay để mặc định, hay còn chủ động bật lên?"
    ],
    facts: [
      "Memory ghi các ý về bạn trong lúc chat rồi dùng ở chat sau. Memory bật sẵn ở các gói Free, Pro, Max, Ultra. Nó ghi theo nội dung chat, không đợi lời dặn “hãy nhớ”.",
      "Tắt memory cho một chat: bấm “+” trong ô nhập, tắt “Memory”, trước tin nhắn đầu tiên. Chat vẫn nằm trong lịch sử. Đang ở trong Project, không có chat ẩn danh, thì dùng cách này.",
      "Chat ẩn danh (Incognito, biểu tượng con ma): không lưu vào lịch sử, không ghi vào memory, không dùng memory cũ. Nó vẫn được giữ 30 ngày theo mặc định, và không dùng được trong Project.",
      "“Dặn Claude đừng nhớ” không phải biện pháp kiểm soát. Kiểm soát thật nằm ở trước khi gửi: bớt dữ liệu, dùng tài khoản được duyệt, chọn đúng cài đặt."
    ],
    opts: [
      { k: "A", gist: "Skip choosing any privacy setting and go with the defaults, since the conversation will never tell Claude to remember the figure.",
        why: [
          "Sai ở giả định: memory ghi theo nội dung chat, không đợi lời dặn “remember” (nhớ) (ý 1). Không dặn nhớ không có nghĩa là không bị ghi.",
          "Dặn hay không dặn trong prompt đều không phải biện pháp kiểm soát (ý 4). Bỏ qua bước chọn cài đặt là bỏ đúng chỗ kiểm soát được.",
          "Dễ bị cuốn vì nghe như cẩn thận vừa đủ. Nhưng con số mật vẫn có thể vào memory rồi hiện ra ở chat khác."
        ] },
      { k: "B", gist: "If Incognito is not being used, turn off Memory for this conversation so the figure does not become lasting context that could resurface in unrelated later sessions.",
        why: [
          "Đúng: tắt memory cho riêng chat này trước tin nhắn đầu, con số không được ghi thành bối cảnh lâu dài (ý 2).",
          "Đây là cách dùng khi không mở được chat ẩn danh, ví dụ đang làm trong Project (ý 2, 3)."
        ] },
      { k: "C", gist: "Keep the default Memory settings, because the figure will only come up briefly and probably won't be retained.",
        why: [
          "Sai: memory không xét câu nói dài hay ngắn (ý 1). Nhắc qua một lần cũng đủ để bị ghi.",
          "“Unlikely to be retained” (chắc không bị giữ) là đoán. Với số tài chính chưa công bố, đoán không phải biện pháp kiểm soát (ý 4)."
        ] },
      { k: "D", gist: "Turn on Memory for this conversation so the context carries over and supports follow-up analysis in later sessions.",
        why: [
          "Ngược mục tiêu: đây chính là đưa con số mật thành bối cảnh lâu dài, đi theo sang các phiên sau (ý 1).",
          "Tiện cho phân tích tiếp không đổi được chuyện dữ liệu mật phải giới hạn chỗ lưu."
        ] },
      { k: "E", gist: "Have the conversation in Incognito mode, which keeps it from feeding Memory and stops the confidential figure being carried across sessions.",
        why: [
          "Đúng: chat ẩn danh không ghi vào memory, không vào lịch sử (ý 3). Con số không đi theo sang phiên sau.",
          "B và E là hai đường cho cùng một mục tiêu: E khi mở chat mới ngoài Project, B khi không dùng được ẩn danh.",
          "Nhớ giới hạn: chat ẩn danh vẫn được giữ 30 ngày theo mặc định (ý 3). Nó lo chuyện memory, không thay được việc dùng đúng tài khoản và chính sách công ty (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, bảng “Memory, tìm chat cũ, chat ẩn danh”: tắt memory cho một chat, chat ẩn danh không ghi memory", href: NOTES + "#l-3-4" },
      { label: "Bài 6.2, mục “Dùng đúng tài khoản và đúng cài đặt” và “Dặn Claude đừng nhớ không phải biện pháp kiểm soát”", href: NOTES + "#l-6-2" },
      { label: "Help Center: chat search và memory (tắt memory cho một chat, chat ẩn danh)", href: "https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context" }
    ]
  },
  {
    de: 4, n: 43, total: 119, sub: "7.2", subName: "Chỉnh theo phản hồi",
    answer: "A",
    ask: "A knowledge worker is describing how feedback can make Claude-supported work better over time. Which description is most accurate?",
    scene: [
      "Một nhân viên văn phòng giải thích cách dùng phản hồi để việc làm cùng Claude tốt dần lên.",
      "Bốn phương án là bốn kiểu vòng phản hồi. Chúng khác nhau ở ba chỗ: thu phản hồi khi nào, cụ thể tới đâu, sửa rộng hay hẹp.",
      "Chỗ khó: phương án nào cũng có một lý do nghe được: đợi đủ mẫu, dùng điểm số, sửa rộng cho chắc."
    ],
    asks: [
      "Mô tả nào đúng nhất?",
      "Tức là: vòng phản hồi nào cho biết sửa chỗ nào, và cho biết lần sửa đó có tác dụng hay không.",
      "Soi từng phương án: phản hồi có đủ cụ thể để tìm gốc không, thay đổi có đủ hẹp để biết nó có tác dụng không, có bước xem lại kết quả không."
    ],
    facts: [
      "Phản hồi là triệu chứng, không phải đơn thuốc. Muốn tìm gốc phải biết cụ thể: output nào, sai ở đâu, lẽ ra phải thế nào.",
      "Mỗi phát hiện đổi thành một yêu cầu cụ thể trong prompt. Sửa prompt, thay vì chỉ sửa tay bản nháp, thì những lần chạy sau cũng tốt lên.",
      "Mỗi vòng đổi một chỗ. Đổi nhiều thứ một lúc thì output tốt lên hay tệ đi cũng không biết vì đâu.",
      "Phản hồi càng sớm càng rẻ. Thấy sai thì nói ngay, đừng để lỗi lặp lại qua nhiều lần chạy."
    ],
    opts: [
      { k: "A", gist: "After each run, record specific feedback, turn it into targeted changes to the prompt or workflow, and check whether the following runs get better.",
        why: [
          "Đủ ba khâu của vòng phản hồi: phản hồi cụ thể để tìm gốc (ý 1), thay đổi nhắm đúng chỗ (ý 2, 3), rồi xem các lần chạy sau có tốt lên không.",
          "Ghi sau mỗi lần chạy thì chi tiết còn mới, và lỗi được chặn trước lần chạy kế tiếp (ý 4)."
        ] },
      { k: "B", gist: "Only gather feedback once several runs have finished so patterns emerge from volume, then change things based on those patterns rather than on any one run.",
        why: [
          "Sai ở chữ “only” (chỉ): đợi nhiều lần chạy mới ghi thì lỗi đã thấy cứ lặp lại suốt mấy lần đó, còn chi tiết từng lần đã quên (ý 4).",
          "Dễ bị cuốn vì nhìn nhiều output cùng lúc đúng là cách tốt để thấy mẫu lỗi. Nhưng mẫu lỗi rút ra từ ghi chép cụ thể của từng lần. Ghi sau mỗi lần (A) vẫn gom lại thành mẫu được; đợi rồi mới ghi thì mất chi tiết."
        ] },
      { k: "C", gist: "Record a single overall quality score for each run, since aggregate scores show whether quality is rising without needing detail on individual issues.",
        why: [
          "Sai ở vế “without requiring detail” (không cần chi tiết). Điểm tụt cho biết có vấn đề, không cho biết vấn đề ở đâu, nên không tìm được gốc (ý 1).",
          "Điểm số dùng được để đo kết quả sau khi sửa. Nó không thay được phản hồi cụ thể để biết sửa gì (ý 2)."
        ] },
      { k: "D", gist: "Note general impressions after each run and apply them as sweeping prompt rewrites, because broad rewrites cover more possible issues than targeted changes.",
        why: [
          "Sai hai chỗ. Ấn tượng chung (“chưa ổn lắm”) không chỉ ra gốc (ý 1). Viết lại cả prompt là đổi nhiều thứ một lúc (ý 3).",
          "Lần sau tốt lên hay tệ đi đều không biết vì thay đổi nào, có khi phá luôn phần đang chạy tốt."
        ] }
    ],
    refs: [
      { label: "Bài 7.2, mục “Đọc phản hồi để tìm gốc” và “Sửa giữa chừng”: phản hồi là triệu chứng, phản hồi càng sớm càng rẻ", href: NOTES + "#l-7-2" },
      { label: "Bài 2.1, mục “Biến điều vừa thấy thành prompt tốt hơn”: mỗi phát hiện thành một yêu cầu cụ thể", href: NOTES + "#l-2-1" },
      { label: "Bài 1.3, mục “Mỗi vòng đổi một chỗ”", href: NOTES + "#l-1-3" }
    ]
  },
  {
    de: 4, n: 44, total: 119, sub: "7.1", subName: "Chẩn đoán output kém",
    answer: "D",
    ask: "A Claude associate is looking into poor output that keeps coming back. Which order of diagnostic steps is correct? <br>(1) Form a hypothesis about which part of the prompt is most likely causing the problem.<br>(2) Make one targeted change and see how it affects the output.<br>(3) Read the whole output and pin down the specific deficiency.<br>(4) Put the deficient output next to the prompt and look for mismatches between input and output.<br>(5) Record the root cause and the fix for future reference.",
    scene: [
      "Một Claude associate điều tra một output kém cứ lặp lại.",
      "Năm bước: đọc output tìm chỗ hỏng cụ thể, đặt output cạnh prompt tìm chỗ lệch, đoán phần prompt gây ra, đổi một chỗ rồi xem, ghi lại nguyên nhân và cách sửa.",
      "Bốn phương án đều kết thúc bằng 2 rồi 5. Chỗ khác nhau là thứ tự của 3, 4, 1 ở đầu."
    ],
    asks: [
      "Thứ tự đúng của các bước chẩn đoán là gì?",
      "Tức là: giả thuyết phải dựa trên bằng chứng. Muốn có bằng chứng thì phải biết output hỏng ở đâu, rồi so chỗ hỏng đó với prompt.",
      "Soi từng phương án: lúc đặt giả thuyết (1), đã biết chỗ hỏng cụ thể (3) và chỗ lệch với prompt (4) chưa?"
    ],
    facts: [
      "Triệu chứng (symptom) là cái nhìn thấy ở output. Nguyên nhân gốc (root cause) là chỗ thật sự gây ra nó. Cùng một triệu chứng có thể đến từ nhiều nguyên nhân.",
      "Vòng chẩn đoán: ghi lại triệu chứng, đoán cần gạt (chỗ chỉnh được để đổi output), đổi đúng một thứ, chạy lại cùng input, so với output cũ.",
      "Trước khi đổi gì, đặt output kém cạnh input của nó: thứ thiếu có nằm trong input không, có trong input mà bị bỏ qua, hay có trong output mà bị chôn?",
      "Ghi lại mỗi vòng: đổi gì, output ra sao. Cách sửa đã xác nhận thì lưu lại để lần sau khỏi dò lại."
    ],
    opts: [
      { k: "A", gist: "1, 3, 4, 2, 5",
        why: [
          "Đặt giả thuyết (1) trước khi đọc output (3): đoán nguyên nhân khi chưa biết triệu chứng cụ thể là gì (ý 1).",
          "Giả thuyết có sẵn dễ kéo việc đọc output theo hướng xác nhận nó, thay vì tìm chỗ hỏng thật."
        ] },
      { k: "B", gist: "4, 3, 1, 2, 5",
        why: [
          "So output với prompt (4) trước khi biết output hỏng ở đâu (3). So mà không biết đang tìm gì thì chỗ lệch nào trông cũng như nhau (ý 3).",
          "Chưa gọi tên chỗ hỏng thì không tách được chỗ lệch nào gây ra nó, chỗ lệch nào vô hại."
        ] },
      { k: "C", gist: "3, 1, 4, 2, 5",
        why: [
          "Gọi tên chỗ hỏng (3) là đúng bước đầu. Nhưng đặt giả thuyết (1) trước khi so với prompt (4): giả thuyết chưa có bằng chứng (ý 2, 3).",
          "Dễ bị cuốn vì chỉ lệch D một bước, và mở đầu đúng. Nhưng chính bước so mới cho biết phần nào của prompt dính tới chỗ hỏng. Đoán trước rồi so sau là so để xác nhận cái đã đoán."
        ] },
      { k: "D", gist: "3, 4, 1, 2, 5",
        why: [
          "Đúng. Đọc hết output, gọi tên chỗ hỏng cụ thể (3), đặt nó cạnh prompt tìm chỗ lệch (4), rồi mới đoán phần prompt gây ra (1) (ý 1, 3).",
          "Đổi đúng một chỗ rồi xem output (2), để biết chắc thay đổi nào có tác dụng (ý 2). Ghi nguyên nhân và cách sửa (5) để lần sau khỏi dò lại (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài nền tảng D7, mục “Vòng chẩn đoán: đổi một thứ, chạy lại cùng input”: ghi triệu chứng, đoán cần gạt, đổi một thứ, so", href: NOTES + "#l-7-0" },
      { label: "Bài 7.1, mục “Từ triệu chứng tới nguyên nhân” và “Vì sao chỉ đổi một thứ”: ghi lại mỗi vòng đổi gì, output ra sao", href: NOTES + "#l-7-1" },
      { label: "Bài 7.2, mục “Đọc phản hồi để tìm gốc”: đặt output kém cạnh input trước khi đổi gì", href: NOTES + "#l-7-2" }
    ]
  },
  {
    de: 4, n: 45, total: 119, sub: "1.3", subName: "Lặp prompt: chẩn đoán, đổi một chỗ, thử lại",
    answer: "C",
    ask: "You have rewritten a Claude prompt eight times, and output quality has stopped improving over the last four attempts. What is the most appropriate conclusion?",
    scene: [
      "Mày đã sửa một prompt tám lần.",
      "Bốn lần gần nhất, chất lượng output đứng yên: plateau (chững lại, không lên thêm).",
      "Chỗ khó: dừng thì dừng thế nào. Chấp nhận output còn lỗi, bỏ việc, hay đổi hướng?"
    ],
    asks: [
      "Kết luận nào hợp lý nhất?",
      "Tức là: khi sửa prompt không còn làm output tốt lên, bước tiếp theo là gì.",
      "Soi từng phương án: nó dừng vòng sửa vô ích, mà vẫn xử lý phần lỗi còn lại không?"
    ],
    facts: [
      "Vài vòng gần nhất không cải thiện thêm thì dừng sửa prompt. Sửa tiếp chỉ ra một bản khác, không chắc tốt hơn, mà vòng nào cũng tốn hạn mức.",
      "Cần gạt (lever) là chỗ chỉnh được để đổi output. Prompt chỉ là một trong sáu cần gạt; còn kiến thức đưa vào, cuộc hội thoại, cách chia việc, model hoặc tính năng, và việc nằm ngoài khả năng của Claude. Sửa sai cần gạt thì chỉ tốn công.",
      "Sửa nhiều vòng trong cùng một chat mà output vẫn mang lỗi của hướng ban đầu thì bắt đầu lại: mở chat mới với một prompt đã gom mọi điều chỉnh.",
      "Việc cần người quyết, hoặc cần dữ liệu Claude không có, thì chia lại phần người làm hoặc chuyển đúng người. Bỏ hẳn việc là né vấn đề, không phải cách xử lý."
    ],
    opts: [
      { k: "A", gist: "Stop iterating and accept the current output exactly as it is, whatever problems remain.",
        why: [
          "Dừng sửa prompt thì đúng (ý 1). Sai ở vế “regardless of remaining issues” (mặc kệ lỗi còn lại): biết còn lỗi mà vẫn đem dùng.",
          "Prompt chững lại chỉ cho thấy cần gạt prompt đã hết tác dụng, không cho thấy output đã đủ dùng (ý 2).",
          "Dễ bị cuốn vì nó có chữ “stop”, đúng tinh thần dừng khi hết cải thiện. Nhưng dừng sửa khác với nhắm mắt chấp nhận."
        ] },
      { k: "B", gist: "Stop iterating and drop the task altogether, without telling stakeholders.",
        why: [
          "Bỏ việc là né vấn đề (ý 4). Vẫn còn đường chưa thử: người duyệt, cần gạt khác, bắt đầu lại (ý 2, 3).",
          "Không báo stakeholder (người có quyền lợi trong việc này) thì họ vẫn chờ một kết quả sẽ không tới. Kết quả, kể cả khi không đạt, phải được nói thật."
        ] },
      { k: "C", gist: "Iteration has hit diminishing returns, so the next step is human review or a different approach.",
        why: [
          "Đúng: bốn vòng không lên là dấu hiệu sửa prompt đã hết tác dụng (ý 1). “Diminishing returns” (lợi ích giảm dần): công bỏ thêm không còn đổi ra chất lượng.",
          "Hướng khác là thử cần gạt khác: thêm nguồn, chia việc, mở chat mới với prompt đã gom (ý 2, 3). Người duyệt lo phần Claude không làm nổi hoặc phần cần người quyết (ý 4)."
        ] },
      { k: "D", gist: "Keep iterating with no limit, because more attempts always raise quality.",
        why: [
          "Sai ở chữ “always” (luôn luôn): chính đề kể bốn lần gần nhất không lên (ý 1).",
          "Sửa tiếp đúng cần gạt đã hết tác dụng thì chỉ tốn công và hạn mức, không chạm tới nguyên nhân thật (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, bảng “Dừng, bắt đầu lại, hay lưu”: vài vòng gần nhất không cải thiện thì dừng; lỗi của hướng ban đầu thì bắt đầu lại", href: NOTES + "#l-1-3" },
      { label: "Bài nền tảng D7, mục “Sáu cần gạt”: prompt không phải cần gạt duy nhất; ngoài khả năng thì chuyển đúng người", href: NOTES + "#l-7-0" },
      { label: "Bài 0.3, luật 5: đáp án né vấn đề (bỏ việc) là sai", href: NOTES + "#l-0-3" }
    ]
  },
  {
    de: 4, n: 46, total: 119, sub: "4.4", subName: "Đưa Claude vào quy trình đang chạy",
    answer: "C",
    ask: "As a project manager, you are ranking workflow steps by how much leverage integrating Claude gives. Which step generally gives a knowledge-work team the most leverage from Claude?",
    scene: [
      "Một quản lý dự án xếp các bước trong quy trình theo mức leverage (đòn bẩy: đưa Claude vào bước đó thì được lợi bao nhiêu).",
      "Bốn bước: duyệt cuối để đăng ra ngoài, đàm phán hợp đồng thay công ty, soạn và tổng hợp từ nhiều nguồn cho người duyệt phía sau, quyết định nhân sự cuối cùng.",
      "Chỗ khó: ba bước kia đều là việc quan trọng, nghe như giao cho AI thì đỡ được nhiều nhất. Nhưng quan trọng không có nghĩa là hợp để giao."
    ],
    asks: [
      "Bước nào thường cho đòn bẩy lớn nhất khi đưa Claude vào?",
      "Tức là: bước nào Claude làm được nhiều nhất, mà output vẫn kiểm được và người vẫn giữ phần quyết.",
      "Soi từng phương án: bước đó là phần làm (thực thi) hay phần quyết (phán quyết)? Có người kiểm phía sau không?"
    ],
    facts: [
      "Giao phần làm, giữ phần quyết. Phần làm: mô tả rõ được, đầu ra kiểm được, giao Claude rồi có người kiểm. Phần quyết: có hậu quả cho người khác, phải có người chịu trách nhiệm. Claude chuẩn bị, người quyết.",
      "Việc hợp Claude: nhiều chữ, mô tả rõ được, đầu ra kiểm được, sai thì dễ phát hiện. Ví dụ tóm tắt, phân loại, soạn nháp.",
      "Soạn từ ngữ cảnh có sẵn: giao Claude làm bản nháp, người xem trước khi gửi. Ký duyệt cuối mà một người phải đứng tên: người giữ, Claude chỉ chuẩn bị tài liệu.",
      "Khuyến nghị rủi ro cao (việc làm, tín dụng, y tế…): Usage Policy bắt người có chuyên môn duyệt trước khi nó tới một cá nhân. Trách nhiệm không chuyển sang công cụ."
    ],
    opts: [
      { k: "A", gist: "Signing off final deliverables for external publication with no further review.",
        why: [
          "Đây là phần quyết: ký duyệt cuối mà một người phải đứng tên (ý 1, 3).",
          "“Without further review” (không ai xem lại) là bỏ luôn lớp kiểm. Đã đăng ra ngoài thì sai khó rút lại."
        ] },
      { k: "B", gist: "Negotiating contract terms with outside parties on the company's behalf.",
        why: [
          "Đàm phán thay công ty là đưa ra cam kết ràng buộc với bên ngoài: phải cân nhắc đánh đổi, có hậu quả, phải có người chịu (ý 1).",
          "Claude giúp được ở khâu chuẩn bị: tóm tắt điều khoản, soạn phương án. Ngồi vào bàn và chốt điều khoản là việc của người."
        ] },
      { k: "C", gist: "Drafting and synthesizing across many sources for a reviewer further down the line.",
        why: [
          "Đúng phần làm mà Claude mạnh: đọc nhiều chữ, gom từ nhiều nguồn, soạn nháp (ý 2). Đây là chỗ tốn nhiều giờ người, nên giao đi được nhiều nhất.",
          "Có người duyệt phía sau giữ phần quyết và kiểm output (ý 1, 3). Claude làm nhanh, người vẫn chịu trách nhiệm."
        ] },
      { k: "D", gist: "Making the final personnel decisions on hiring, promotion or termination.",
        why: [
          "Phần quyết điển hình: hậu quả trực tiếp cho người khác, cần cân nhắc giá trị (ý 1).",
          "Việc làm thuộc nhóm rủi ro cao: Usage Policy bắt người có chuyên môn duyệt khuyến nghị của AI trước khi nó tới một cá nhân (ý 4). Giao quyết định cuối cho Claude là đi ngược yêu cầu đó."
        ] }
    ],
    refs: [
      { label: "Bài 4.4, bảng “Bước nào giao, bước nào giữ”: soạn từ ngữ cảnh có sẵn thì giao làm nháp, ký duyệt cuối thì người giữ", href: NOTES + "#l-4-4" },
      { label: "Bài nền tảng D4, mục “Giao phần làm, giữ phần quyết”", href: NOTES + "#l-4-0" },
      { label: "Bài 4.1, bảng “Việc nào hợp Claude, việc nào chưa, việc nào cần người”", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 4, n: 47, total: 119, sub: "7.2", subName: "Chỉnh theo phản hồi",
    answer: "C",
    ask: "You run a weekly cycle of feedback and adjustment. What is the correct order of the steps? <br>(1) Turn the feedback into one or two focused adjustments for the next cycle.<br>(2) Run the next cycle and compare its results with the previous one.<br>(3) Write down the specific feedback received in the review.<br>(4) Document what was changed, what effect it had, and which issues remain open.<br>(5) Decide whether to keep iterating, switch approach, or escalate.",
    scene: [
      "Mày chạy một vòng nhận phản hồi rồi điều chỉnh, mỗi tuần một lần.",
      "Năm bước: ghi phản hồi, đổi thành một hai điều chỉnh, chạy vòng sau rồi so, ghi lại đổi gì được gì, quyết làm tiếp hay đổi hướng hay chuyển lên trên.",
      "Bốn phương án đều kết thúc bằng 4 rồi 5. Chỗ khác nhau là thứ tự của 3, 1, 2 ở đầu."
    ],
    asks: [
      "Thứ tự đúng của các bước là gì?",
      "Tức là: vòng sau phải chạy với điều chỉnh đã có, và điều chỉnh phải đến từ phản hồi đã ghi.",
      "Soi từng phương án: lúc chạy vòng sau (2), điều chỉnh (1) đã có chưa? Lúc điều chỉnh (1), phản hồi (3) đã được ghi chưa?"
    ],
    facts: [
      "Phản hồi là triệu chứng. Ghi cụ thể trước: output nào, bị chê gì. Rồi mới tìm gốc và chọn cách sửa.",
      "Mỗi vòng đổi ít và có trọng tâm. Đổi nhiều thứ một lúc thì không biết thay đổi nào có tác dụng.",
      "Đổi xong thì chạy lại và so với lần trước. Không so thì không biết thay đổi có tác dụng hay không.",
      "Ghi lại mỗi vòng: đổi gì, output ra sao. Có ghi chép mới quyết được: giữ cách sửa, thử cần gạt khác (chỗ chỉnh khác để đổi output), hay chuyển cho đúng người."
    ],
    opts: [
      { k: "A", gist: "2, 3, 1, 4, 5",
        why: [
          "Chạy vòng sau (2) trước khi ghi phản hồi (3) và điều chỉnh (1). Vòng đó chạy y như cũ, nên so với vòng trước không đo được gì (ý 3).",
          "Điều chỉnh làm ra sau đó chưa chạy thử lần nào, mà bước (4) đã phải ghi “tác dụng” của nó."
        ] },
      { k: "B", gist: "1, 3, 2, 4, 5",
        why: [
          "Điều chỉnh (1) trước khi ghi phản hồi (3): sửa theo ấn tượng, chưa có phản hồi cụ thể để tìm gốc (ý 1).",
          "Phản hồi ghi sau không còn ảnh hưởng gì tới điều chỉnh đã chọn."
        ] },
      { k: "C", gist: "3, 1, 2, 4, 5",
        why: [
          "Đúng. Ghi phản hồi cụ thể (3), đổi thành một hai điều chỉnh có trọng tâm (1), chạy vòng sau và so với vòng trước (2) (ý 1, 2, 3).",
          "Ghi lại đổi gì, được gì, còn gì (4), rồi dựa vào đó mà quyết làm tiếp, đổi hướng hay chuyển lên trên (5) (ý 4)."
        ] },
      { k: "D", gist: "3, 2, 1, 4, 5",
        why: [
          "Ghi phản hồi (3) trước là đúng. Nhưng chạy vòng sau (2) trước khi có điều chỉnh (1): vòng đó vẫn chạy cách cũ (ý 3).",
          "Dễ bị cuốn vì nghe như “chạy thêm một vòng cho chắc rồi mới sửa”. Nhưng phản hồi đã có trong tay; chạy lại cách cũ chỉ mất thêm một tuần, và điều chỉnh làm sau chưa được đo lần nào trước bước (4)."
        ] }
    ],
    refs: [
      { label: "Bài 7.2, mục “Đọc phản hồi để tìm gốc” và “Xác nhận trước, rồi mới làm cho bền”", href: NOTES + "#l-7-2" },
      { label: "Bài nền tảng D7, mục “Vòng chẩn đoán”: đổi một thứ, chạy lại, so; không tốt hơn thì thử cần gạt khác", href: NOTES + "#l-7-0" },
      { label: "Bài 7.1, mục “Vì sao chỉ đổi một thứ”: ghi lại mỗi vòng đổi gì, output ra sao", href: NOTES + "#l-7-1" }
    ]
  },
  {
    de: 4, n: 48, total: 119, sub: "1.3", subName: "Lặp prompt: chẩn đoán, đổi một chỗ, thử lại",
    answer: "D",
    ask: "You create content. Claude's first response is accurate, but its terminology is inconsistent and does not match your organization's glossary. Which iterative revision deals with this most directly?",
    scene: [
      "Một người làm nội dung nhận câu trả lời đầu tiên của Claude. Nội dung đúng.",
      "Nhưng thuật ngữ không nhất quán, và không khớp glossary (bảng thuật ngữ) của tổ chức.",
      "Chỗ khó: Claude chưa từng thấy bảng thuật ngữ đó. Nó không thể tự biết tổ chức gọi một thứ là gì."
    ],
    asks: [
      "Lần sửa prompt nào giải quyết chuyện này trực tiếp nhất?",
      "Tức là: đưa cho Claude đúng thứ nó đang thiếu, nói rõ phải dùng thế nào, mà không phá phần nội dung đã đúng."
    ],
    facts: [
      "Prompt yếu thường vì những gì người viết biết không được viết ra. Bảng thuật ngữ của tổ chức là thông tin chỉ bạn có.",
      "Phát hiện “thiếu thông tin chỉ bạn có” thì dán thông tin đó vào prompt. Thứ bị chê thiếu mà không có trong input thì cần gạt là kiến thức: đưa nguồn vào.",
      "Mỗi vòng đổi một chỗ, nhắm đúng triệu chứng. Viết dài gấp đôi, nhắc lại nhiều lần không thêm thông tin nào.",
      "Đáp án né vấn đề (bỏ hẳn phần việc) là sai."
    ],
    opts: [
      { k: "A", gist: "Ask for a longer response so the inconsistent terms show up more often.",
        why: [
          "Dài hơn không thêm thông tin nào về bảng thuật ngữ (ý 3). Claude vẫn không biết từ nào đúng.",
          "Thuật ngữ lệch xuất hiện nhiều hơn là bệnh nặng thêm, không phải sửa."
        ] },
      { k: "B", gist: "Ask Claude to coin extra terms that have nothing to do with the glossary.",
        why: [
          "Ngược mục tiêu: thêm từ ngoài bảng thuật ngữ là thêm chỗ không khớp.",
          "Nó không đưa cho Claude thứ đang thiếu: chính bảng thuật ngữ (ý 1)."
        ] },
      { k: "C", gist: "Take the topic out of the prompt so the terminology problem never arises.",
        why: [
          "Né vấn đề bằng cách bỏ việc (ý 4). Câu trả lời không còn nói về chủ đề cần viết.",
          "Phần nội dung đang đúng cũng mất theo."
        ] },
      { k: "D", gist: "Supply the organization's glossary and tell Claude to use only those terms throughout.",
        why: [
          "Đúng gốc bệnh: Claude thiếu bảng thuật ngữ (ý 1). Đưa bảng vào là đưa đúng nguồn còn thiếu (ý 2).",
          "Lời dặn “chỉ dùng các từ này, xuyên suốt” biến nó thành ràng buộc rõ, nên phần sau không trôi về từ khác. Một thay đổi, nhắm đúng triệu chứng, không đụng phần nội dung đã đúng (ý 3).",
          "Việc này còn lặp lại thì lưu bảng thuật ngữ vào project knowledge, khỏi dán lại mỗi lần."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Đọc triệu chứng, tìm phần của prompt gây ra”: những cách sửa nghe hợp lý mà không sửa gì", href: NOTES + "#l-1-3" },
      { label: "Bài 2.1, bảng “Biến điều vừa thấy thành prompt tốt hơn”: thiếu thông tin chỉ bạn có thì dán vào prompt", href: NOTES + "#l-2-1" },
      { label: "Bài 7.2, bảng “Đặt cách sửa ở đâu”: tài liệu tham khảo dùng lặp lại thì để trong project knowledge", href: NOTES + "#l-7-2" }
    ]
  },
  {
    de: 4, n: 49, total: 119, sub: "3.4", subName: "Context có hạn: chat mới, tóm tắt, lưu lại",
    answer: "BE",
    ask: "As a knowledge manager, you are arranging source material in the context window for a long evaluation task with Claude. Which two practices make more effective use of the context window? (Choose two.)",
    scene: [
      "Một người quản lý tri thức sắp xếp tài liệu nguồn trong context window cho một việc đánh giá dài với Claude.",
      "Context window là toàn bộ những gì Claude thấy trong một chat tại một lúc, như mặt bàn làm việc.",
      "Chỗ khó: đề hỏi cách bày tài liệu lên bàn, không hỏi cách bày được nhiều nhất."
    ],
    asks: [
      "Hai cách nào dùng context window hiệu quả hơn?",
      "Tức là: Claude phải đọc ra tài liệu nào là tài liệu nào, và phần tham chiếu quan trọng phải nằm ở chỗ Claude dùng tốt nhất.",
      "Soi từng phương án: nó làm context gọn và rõ hơn, hay chỉ nhiều hơn, rối hơn?"
    ],
    facts: [
      "Nhiều hơn chưa chắc tốt hơn. Anthropic gọi hiện tượng này là context rot (context bị mục): token trong context càng nhiều, Claude nhớ chính xác thông tin trong đó càng kém.",
      "Mỗi tài liệu một khối có tên, bằng thẻ hoặc tiêu đề, ghi rõ nguồn. Docs: thẻ XML giúp Claude đọc prompt không nhầm, nhất là khi prompt trộn lời dặn, ngữ cảnh, ví dụ và đầu vào.",
      "Docs về tài liệu dài (từ khoảng 20.000 token): đặt tài liệu dài lên đầu prompt, trên câu hỏi và lời dặn. Câu hỏi để cuối giúp chất lượng tăng tới 30% trong thử nghiệm, nhất là khi có nhiều tài liệu.",
      "Viết hoa, nhắc lại ba lần chỉ làm lời dặn to hơn. Chúng không thêm thông tin nào."
    ],
    opts: [
      { k: "A", gist: "Put every document you have into the context, relevant to the task or not.",
        why: [
          "Nhiều hơn chưa chắc tốt hơn (ý 1). Tài liệu không liên quan lấp chỗ, phần cần bị lẫn giữa đống chữ thừa.",
          "Việc đánh giá dài còn cần chỗ cho phần làm phía sau."
        ] },
      { k: "B", gist: "Mark off each source clearly with delimiters so the model can attribute each claim to the right source.",
        why: [
          "Đúng: mỗi tài liệu một khối có tên (ý 2). Delimiter (dấu phân cách, ví dụ thẻ XML) cho Claude biết đoạn nào thuộc tài liệu nào.",
          "Việc đánh giá cần biết mỗi khẳng định lấy từ nguồn nào. Ranh giới rõ thì Claude trích được nguồn cho từng ý."
        ] },
      { k: "C", gist: "Write the same instruction at the start, in the middle and at the end to reinforce it.",
        why: [
          "Nhắc lại không thêm thông tin, chỉ làm lời dặn to hơn (ý 4).",
          "Ba bản cùng một lời dặn còn chiếm thêm chỗ (ý 1). Một lời dặn rõ, đặt đúng chỗ là đủ."
        ] },
      { k: "D", gist: "Merge all sources into one block so the model can combine them freely.",
        why: [
          "Trái với “mỗi tài liệu một khối có tên” (ý 2). Claude không biết một đoạn thuộc nguồn nào.",
          "Hai nguồn nói khác nhau về cùng một điểm thì Claude dễ trộn lẫn, và không trích được nguồn cho từng ý. Với việc đánh giá thì đó là lỗi nặng.",
          "Dễ bị cuốn vì “synthesize freely” (tổng hợp tự do) nghe như giúp Claude làm tốt hơn. Nhưng tổng hợp tốt cần biết ý nào từ đâu."
        ] },
      { k: "E", gist: "Put the material that matters most for reference close to the start or the end of the context.",
        why: [
          "Đúng hướng docs: tài liệu tham chiếu dài đặt lên đầu prompt, trên câu hỏi và lời dặn; câu hỏi để cuối (ý 3).",
          "B lo Claude đọc ra nguồn nào là nguồn nào, E lo phần quan trọng nằm ở chỗ Claude dùng tốt. Hai cái bổ sung nhau."
        ] }
    ],
    dispute: "Đề gốc chấm BE, sổ giữ BE. Lưu ý chữ của E rộng hơn docs. Docs (Prompting best practices, mục mẹo cho tài liệu dài) nói cụ thể: tài liệu dài đặt lên đầu prompt, câu hỏi để cuối. Docs không nói đặt tài liệu tham chiếu ở cuối. E vẫn là phương án đúng thứ hai, vì A, C, D đều sai rõ.",
    refs: [
      { label: "Bài 1.1, mục “Dán nguồn thật, và tách nó khỏi lời dặn”: tài liệu dài để trước, câu hỏi để cuối; mỗi tài liệu một khối có tên", href: NOTES + "#l-1-1" },
      { label: "Bài 3.4, mục “Context chứa gì, và vì sao nhiều hơn chưa chắc tốt hơn”: context rot", href: NOTES + "#l-3-4" },
      { label: "Docs Anthropic: Prompting best practices, phần thẻ XML và mẹo cho tài liệu dài", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
    ]
  },
  {
    de: 4, n: 50, total: 119, sub: "3.4", subName: "Context có hạn: chat mới, tóm tắt, lưu lại",
    answer: "A",
    ask: "A knowledge worker moves back and forth between Claude and another AI service during a long-running project. Which Claude feature most directly cuts down on re-establishing the same context in every session?",
    scene: [
      "Một nhân viên làm một dự án kéo dài, dùng xen kẽ Claude và một dịch vụ AI khác.",
      "Mỗi phiên mới, anh lại phải kể lại bối cảnh dự án từ đầu.",
      "Chỗ khó: một phần bối cảnh đang nằm ở dịch vụ AI kia. Đề hỏi tính năng nào của Claude cắt được việc kể lại."
    ],
    asks: [
      "Tính năng nào của Claude giảm trực tiếp nhất việc dựng lại bối cảnh ở mỗi phiên?",
      "Tức là: cần một chỗ lưu bối cảnh ra ngoài từng chat, tự đi theo sang chat sau, và nạp được phần đã có ở dịch vụ kia."
    ],
    facts: [
      "Chat sau không tự thấy chat trước. Chỉ thứ đã lưu ra ngoài chat mới đi theo: memory, Instructions for Claude, project knowledge.",
      "Memory ghi các ý về bạn trong lúc chat và dùng ở chat sau. Memory hợp với ý ngắn về bạn; tài liệu đầy đủ của một mảng việc thì để trong project knowledge.",
      "Help center: Claude nhập được memory từ nhà cung cấp AI khác (Settings → Your Claude → Start import), ở các gói Free, Pro, Max, Ultra, Team, Enterprise, trên web và Desktop. Claude rút các ý chính thành từng mục memory. Tính năng còn thử nghiệm, có thể không nhận hết, và có thể bỏ chi tiết cá nhân không liên quan công việc.",
      "Chat ẩn danh không ghi vào memory, không dùng memory cũ."
    ],
    opts: [
      { k: "A", gist: "Turn on Memory and use its import option to bring the relevant context over from the other AI service as a starting point for the project.",
        why: [
          "Đúng: memory giữ bối cảnh ngoài từng chat, chat sau tự dùng (ý 1, 2). Không phải kể lại mỗi phiên.",
          "Phần bối cảnh đã có ở dịch vụ kia thì nhập vào làm điểm xuất phát (ý 3). Nhập xong, mở phần quản lý memory xem Claude đã ghi đúng chưa, vì tính năng còn thử nghiệm.",
          "Tài liệu đầy đủ của dự án thì hợp với project knowledge hơn (ý 2). Nhưng trong bốn phương án, chỉ A cắt được việc kể lại."
        ] },
      { k: "B", gist: "Paste one static Artifact into every chat as the only way of keeping continuity, ignoring Memory, which is built to retain work context across sessions.",
        why: [
          "Dán vào mỗi chat vẫn là dựng lại bối cảnh mỗi phiên, chỉ đổi từ gõ sang dán (ý 1).",
          "“Static” (đứng yên): bản đó không tự cập nhật khi dự án đi tiếp, lâu dần nó cũ."
        ] },
      { k: "C", gist: "Open every session in Incognito, which stops conversations feeding Memory and so removes the cross-session continuity the project would gain.",
        why: [
          "Ngược mục tiêu: chat ẩn danh không ghi memory, không dùng memory cũ (ý 4). Phiên nào cũng bắt đầu trắng.",
          "Ẩn danh dành cho chuyện không muốn lưu, không dành cho dự án cần nối mạch."
        ] },
      { k: "D", gist: "Switch Memory off completely and re-paste the same context paragraphs at the start of every session, even though Memory is meant to keep that context automatically.",
        why: [
          "Đây chính là việc đề muốn bỏ: dán lại cùng một bối cảnh mỗi phiên.",
          "Tắt memory là bỏ chỗ lưu ngoài chat duy nhất có trong các phương án (ý 1, 2)."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, bảng “Memory, tìm chat cũ, chat ẩn danh” và bảng “Mở chat mới, tóm tắt, hay lưu lại”", href: NOTES + "#l-3-4" },
      { label: "Help Center: nhập và xuất memory của Claude (nhập từ nhà cung cấp AI khác)", href: "https://support.claude.com/en/articles/12123587-import-and-export-your-memory-from-claude" },
      { label: "Help Center: chat search và memory", href: "https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context" }
    ]
  },
  {
    de: 4, n: 51, total: 119, sub: "5.1", subName: "Dựng Project: instructions và knowledge",
    answer: "D",
    ask: "An HR business partner is building a new Project to handle the policy questions managers keep asking. Several HR team members will use the Project across many chats. What content belongs in the Project's knowledge base?",
    scene: [
      "Một chuyên viên nhân sự (HR business partner) dựng một Project mới để trả lời các câu hỏi chính sách mà quản lý hỏi đi hỏi lại.",
      "Project dùng cho nhiều chat, và nhiều người trong nhóm HR cùng dùng.",
      "Chỗ khó: cả bốn phương án đều có sổ tay nhân viên bản hiện hành. Khác nhau ở phần đi kèm: thêm bản cũ, thêm email, đính kèm lẻ vào từng chat, hay đúng ba tài liệu tra cứu."
    ],
    asks: [
      "Nội dung nào nên nằm trong knowledge của Project?",
      "Tức là: chọn bộ tài liệu mà chat nào trong Project cũng cần tra, và không làm Claude trích nhầm.",
      "Soi từng phương án: tài liệu đó còn hiệu lực không, có cần cho câu hỏi thường gặp không, và có sẵn cho mọi chat không."
    ],
    facts: [
      "Project knowledge là tư liệu Claude dùng để trả lời trong mọi chat của Project: sổ tay, bảng giá, mẫu văn bản. Tài liệu cần tra lặp lại thì gom lại, tải lên từ đầu, thay vì đính kèm lẻ vào từng chat.",
      "Chỉ đưa bản hiện hành, đã duyệt. Hai bản cùng chủ đề cùng nằm trong knowledge thì Claude có thể trích bản nào cũng được. Không có gì tự đánh dấu bản cũ là hết hiệu lực.",
      "Bỏ thứ không cần: file thừa làm nhiễu chuyện tìm, và docs khuyên gỡ file không dùng để đỡ tốn usage (hạn mức sử dụng).",
      "File đính kèm trong một chat chỉ nằm trong chat đó. Chat khác, người khác không thấy."
    ],
    opts: [
      { k: "A", gist: "The current employee handbook along with every earlier version from the past five years, so Claude can explain how policies have changed.",
        why: [
          "Sai ở giả định: thêm bản cũ thì Claude biết thêm lịch sử. Thật ra năm bản sổ tay cùng chủ đề nằm chung thì Claude có thể trích bản nào cũng được (ý 2).",
          "Quản lý hỏi “được nghỉ phép bao nhiêu ngày” có thể nhận con số của ba năm trước, mà câu trả lời vẫn đọc rất trôi.",
          "Dễ bị cuốn vì “explain how policies have changed” (giải thích chính sách đã đổi thế nào) nghe như thêm giá trị. Nhưng câu quản lý hay hỏi là chính sách đang áp dụng. Cần tra lịch sử thì cất bản cũ ở chỗ lưu trữ ngoài Project."
        ] },
      { k: "B", gist: "The current handbook, the leveling guide, the policies FAQ, plus every policy email the HR team sent over the past year, for extra context.",
        why: [
          "Ba tài liệu đầu đúng. Cái sai là phần thêm: một năm email không cần cho câu hỏi thường gặp (ý 3).",
          "Email nói về chính sách ở từng thời điểm, có thể có câu đã bị thay. Chúng thành thêm nhiều “bản” cùng chủ đề nằm cạnh sổ tay (ý 2), làm nhiễu chuyện tìm và tốn usage (ý 3).",
          "Dễ bị cuốn vì “for additional context” (để có thêm bối cảnh) nghe như càng nhiều càng chắc. Nhưng knowledge cần đúng và gọn, không cần nhiều."
        ] },
      { k: "C", gist: "Only the current handbook goes into knowledge; the leveling guide and the policies FAQ are attached at the start of each chat when its topic calls for them.",
        why: [
          "Sai ở chỗ để tài liệu dùng lặp lại ra ngoài knowledge. File đính kèm chỉ nằm trong chat đó (ý 4), nên chat nào cũng phải đính lại.",
          "Nhiều người cùng dùng: người nhớ đính, người quên, người đính nhầm bản cũ, mà không ai biết. Câu trả lời giữa các chat lệch nhau.",
          "Project dựng ra chính để tài liệu dùng chung có sẵn cho mọi chat (ý 1)."
        ] },
      { k: "D", gist: "The current handbook, the leveling guide, and the policies FAQ, the documents that the Project's chats keep referring to.",
        why: [
          "Đúng. Ba tài liệu hiện hành, đúng thứ quản lý hay hỏi, có sẵn cho mọi chat và mọi người dùng Project (ý 1).",
          "Không có bản cũ để trích nhầm (ý 2), không có email thừa làm nhiễu (ý 3), không ai phải nhớ đính kèm (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 5.1, mục “Chọn tài liệu và đặt tên”: chỉ đưa bản hiện hành, bỏ thứ không cần, gom file liên quan tải lên từ đầu", href: NOTES + "#l-5-1" },
      { label: "Bài 5.4, mục “Thay một tài liệu: bốn bước”: tải bản mới không xóa bản cũ, một chủ đề một bản hiện hành", href: NOTES + "#l-5-4" }
    ]
  },
  {
    de: 4, n: 52, total: 119, sub: "4.5", subName: "Nói với stakeholder về giá trị và giới hạn",
    answer: "B",
    ask: "A knowledge worker is briefing a group of stakeholders on Claude's limitations. They will use Claude for customer-facing work, where errors delivered in a confident tone could cause real harm. Which limitation is most important to get across clearly?",
    scene: [
      "Một nhân viên văn phòng chuẩn bị nói với một nhóm stakeholder (người có quyền lợi, người sẽ dùng kết quả) về giới hạn của Claude.",
      "Nhóm này sẽ dùng Claude cho việc gửi tới khách. Đề nói thẳng mối lo: output nghe chắc chắn mà có lỗi thì gây hại thật.",
      "Chỗ khó: cả bốn phương án đều là giới hạn có thật. Đề hỏi giới hạn nào quan trọng nhất trong đúng hoàn cảnh này."
    ],
    asks: [
      "Giới hạn nào cần nói rõ nhất?",
      "Tức là: giới hạn nào khớp với mối lo đề nêu (sai mà nghe chắc, tới tay khách), và đi kèm biện pháp nào.",
      "Soi từng phương án: nó gọi đúng cơ chế gây ra lỗi nghe chắc chắn không, và cách bù nó đưa ra có chặn được lỗi trước khi tới khách không."
    ],
    facts: [
      "Hallucination (bịa thông tin): Claude nói một điều nghe rất hợp lý nhưng sai, hoặc không có nguồn nào chứng minh. Đây là đặc tính đã biết, không phải trục trặc ngẫu nhiên. Giọng tự tin không phải bằng chứng.",
      "Các biện pháp như cho phép nói “không biết”, bắt mỗi ý kèm trích dẫn chỉ giảm hallucination, không xóa hẳn. Docs của Anthropic dặn luôn kiểm thông tin quan trọng, nhất là với quyết định hệ trọng.",
      "Output càng hệ trọng, càng ra ngoài, càng khó rút lại thì càng cần một người có chuyên môn duyệt trước khi gửi.",
      "Chạy lại nhiều lần rồi so hay lấy số đông không phải kiểm chứng: các lần giống nhau vẫn có thể cùng sai."
    ],
    opts: [
      { k: "A", gist: "Answers to the same prompt vary from run to run, so stakeholders should run each prompt several times and compare before relying on any single answer.",
        why: [
          "Đúng là hai lần chạy có thể ra hai bản. Nhưng cách bù sai: chạy nhiều lần rồi so không phải kiểm chứng (ý 4).",
          "Một chi tiết bịa nghe chắc chắn có thể lặp lại ở cả ba lần chạy, và vẫn tới tay khách. Biện pháp này còn nhân chi phí lên mấy lần mà không chặn được lỗi."
        ] },
      { k: "B", gist: "Claude can sound confident while including unsupported claims, so human review stays essential for high-impact work.",
        why: [
          "Đúng. Gọi đúng cơ chế đề lo: hallucination nghe trôi chảy, giọng tự tin không nói gì về độ đúng (ý 1).",
          "Cách bù cũng đúng tầm: biện pháp kỹ thuật chỉ giảm lỗi (ý 2), nên việc gửi tới khách, sai là hại thật, phải có người duyệt trước (ý 3).",
          "Nói kiểu này là hứa biện pháp, không hứa hoàn hảo: stakeholder biết chỗ nào người vẫn phải kiểm."
        ] },
      { k: "C", gist: "Claude can write long, detailed answers that take time to read, so stakeholders should request shorter output when deadlines are tight.",
        why: [
          "Độ dài là chuyện hình thức, một lời dặn là chỉnh được. Nó không đụng tới chuyện đúng hay sai.",
          "Bản ngắn mà sai vẫn gây hại y như bản dài. Bắt trả lời thật ngắn còn lấy mất chỗ cho câu “chưa chắc”."
        ] },
      { k: "D", gist: "Claude's knowledge stops at a training cutoff, so stakeholders must check any time-sensitive claim against current sources before using it.",
        why: [
          "Giới hạn có thật, lời khuyên cũng đúng: chuyện sau mốc kiến thức (knowledge cutoff, ngày cuối của dữ liệu Claude được học) phải kiểm với nguồn hiện tại. Nhưng nó chỉ phủ một phần mối lo.",
          "Lỗi nghe chắc chắn không chỉ nằm ở chuyện mới: tên, số liệu, trích dẫn về chủ đề cũ cũng có thể bịa (ý 1). Chỉ kiểm câu “time-sensitive” (gắn với thời điểm) thì các lỗi đó lọt qua.",
          "Dễ bị cuốn vì đây là giới hạn hay được nhắc nhất. Nhưng đề tả cái hại là lỗi nghe chắc chắn trong việc gửi khách, và B mới gọi đúng tên nó kèm biện pháp chặn trước khi gửi."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, mục “Sai mà nghe rất trôi, và hai lần hỏi ra hai bản” và “Hứa biện pháp, không hứa hoàn hảo”", href: NOTES + "#l-4-5" },
      { label: "Bài 2.4, mục “Ai duyệt”: output hệ trọng, ra ngoài thì người có chuyên môn duyệt trước khi gửi", href: NOTES + "#l-2-4" },
      { label: "Bài Nền tảng D2, mục 2 “Giọng tự tin không phải là bằng chứng”", href: NOTES + "#l-2-0" }
    ]
  },
  {
    de: 4, n: 53, total: 119, sub: "6.2", subName: "Dữ liệu nhạy cảm và quy định",
    answer: "B",
    ask: "As a knowledge worker getting material ready for a Claude prompt, which type of data most clearly needs extra handling, such as redaction or anonymization, before it is put into the prompt?",
    scene: [
      "Mày chuẩn bị tài liệu để đưa vào prompt cho Claude.",
      "Bốn phương án là bốn loại dữ liệu. Ba loại là thông tin công ty đã công khai. Một loại gắn với từng khách hàng có tên.",
      "Câu này dễ. Cái đáng giữ là vì sao loại đó phải xử lý trước khi gửi, và xử lý thế nào."
    ],
    asks: [
      "Loại dữ liệu nào rõ ràng nhất cần xử lý thêm, như che hoặc ẩn danh, trước khi đưa vào prompt?",
      "Tức là: nhận ra dữ liệu nhạy cảm gắn với người thật, giữa mấy loại thông tin vốn đã công khai."
    ],
    facts: [
      "PII (thông tin định danh cá nhân): thông tin chỉ ra được một người cụ thể, một mình hoặc khi ghép với thông tin khác, như họ tên, số giấy tờ tùy thân, số tài khoản, địa chỉ.",
      "Dữ liệu tài chính (số thẻ, số tài khoản) dùng được để lừa đảo và thường bị luật, hợp đồng ràng buộc. Gắn với tên người thật thì vừa là định danh vừa là tài chính.",
      "Redact (che): xóa hoặc bôi đen phần nhạy cảm trước khi đưa vào. Anonymize (ẩn danh): bỏ hoặc thay thông tin định danh để không lần ra người thật. Cả hai làm trước khi bấm gửi, vì đã gửi thì dữ liệu nằm trong chat.",
      "Thông tin công ty đã công khai (thông cáo đã phát, trang marketing, sơ đồ tổ chức công khai) không thuộc các nhóm trên."
    ],
    opts: [
      { k: "A", gist: "Press releases the company has already made public.",
        why: [
          "Đã công khai, không gắn với người cụ thể nào (ý 4).",
          "Ai cũng đọc được rồi. Che hay ẩn danh nó không bảo vệ thêm được ai."
        ] },
      { k: "B", gist: "Customers' government ID numbers and full payment-card numbers linked to named individuals.",
        why: [
          "Đúng. Số giấy tờ tùy thân là định danh cá nhân, số thẻ là dữ liệu tài chính, lại gắn với tên từng người (ý 1, 2). Hai nhóm nhạy cảm cùng lúc.",
          "Xử lý trước khi gửi (ý 3): bỏ cột việc không cần, che phần số, đổi tên thành mã. Việc vẫn làm được, người thật không bị lộ."
        ] },
      { k: "C", gist: "Job titles taken from the company's public organization chart.",
        why: [
          "Sơ đồ tổ chức đã công khai (ý 4). Chức danh không phải số giấy tờ hay dữ liệu tài chính.",
          "Dễ bị cuốn vì notes có cảnh báo chức danh hiếm, ghép với ngày sinh hay mã bưu chính, vẫn lần ra được người. Nhưng đó là chuyện file đã ẩn danh nửa vời. Ở đây thông tin vốn công khai, và so với B thì rõ ràng không phải loại “most clearly” (rõ nhất) cần xử lý."
        ] },
      { k: "D", gist: "Generic product descriptions already published on the company's marketing site.",
        why: [
          "Thông tin chung, đã đăng công khai, không nói về người nào (ý 4).",
          "Đưa nguyên văn vào prompt không có rủi ro riêng tư."
        ] }
    ],
    refs: [
      { label: "Bài 6.2, mục “Ba cách bớt dữ liệu mà việc vẫn xong”: bỏ, đổi mã hoặc che, gộp; làm trước khi gửi", href: NOTES + "#l-6-2" },
      { label: "Bài Nền tảng D6, mục 3 “Dữ liệu nào là nhạy cảm”: PII, tài chính, sức khỏe, nhân sự", href: NOTES + "#l-6-0" }
    ]
  },
  {
    de: 4, n: 54, total: 119, sub: "4.4", subName: "Đưa Claude vào quy trình đang chạy",
    answer: "A",
    ask: "You are an operations lead bringing Claude into a workflow that several people share. Which integration step should be finished first?",
    scene: [
      "Một trưởng nhóm vận hành đưa Claude vào một quy trình nhiều người cùng làm.",
      "Bốn phương án là bốn bước có thật của việc tích hợp: xác định chỗ Claude giúp và chỗ chuyển cho người, chạy thử với nhóm nhỏ, sửa theo kết quả chạy thử, ghi lại và hướng dẫn cả nhóm.",
      "Chỗ khó: cả bốn đều là việc đúng. Đề hỏi thứ tự, cụ thể là bước “first” (đầu tiên)."
    ],
    asks: [
      "Bước tích hợp nào phải làm trước tiên?",
      "Tức là: bước nào là đầu vào của mọi bước còn lại.",
      "Soi từng phương án: lúc làm bước đó, đã có thứ gì để làm chưa?"
    ],
    facts: [
      "Giao việc theo bước (per-step delegation): với mỗi bước của quy trình, quyết riêng Claude làm, người giữ, hay chia ra. Giao nhầm bước thì phản tác dụng.",
      "Handoff (chỗ chuyển giao): điểm việc chuyển từ Claude sang người, ví dụ người đọc bản nháp trước khi gửi. Bước nào một người phải đứng tên thì người giữ, Claude chuẩn bị tài liệu.",
      "Chạy thử (pilot): một quy trình, chỉ những bước đã quyết là giao được, tiêu chí đạt viết trước, giữ nguyên các bước duyệt.",
      "Chỉ mở rộng khi chạy thử đạt chuẩn và mọi người đã biết cách làm cùng Claude. Ghi lại các bước đã chạy tốt rồi mới phổ biến."
    ],
    opts: [
      { k: "A", gist: "Work out where Claude adds value and where each handoff to a person takes place.",
        why: [
          "Đúng. Đây là bước quyết từng bước: bước nào Claude làm, bước nào người giữ, việc chuyển sang người ở đâu (ý 1, 2).",
          "Nó là đầu vào của mọi bước sau: chạy thử cần biết đang thử những bước nào (ý 3), sửa và hướng dẫn cần một quy trình đã định hình (ý 4)."
        ] },
      { k: "B", gist: "Run a pilot of the integrated workflow with a small group, using typical work.",
        why: [
          "Bước đúng nhưng sai chỗ. Chạy thử là thử những bước đã quyết là giao được (ý 3). Chưa quyết thì chưa có quy trình tích hợp nào để thử.",
          "Dễ bị cuốn vì “chạy thử trước khi mở rộng” là luật hay gặp. Nhưng trước chạy thử còn bước quyết giao gì, giữ gì."
        ] },
      { k: "C", gist: "Refine the integrated workflow based on what the pilot found.",
        why: [
          "Cần kết quả chạy thử, mà chạy thử còn chưa diễn ra (ý 3).",
          "Chưa có phát hiện nào để sửa theo."
        ] },
      { k: "D", gist: "Write up the integrated workflow and bring the rest of the team onto it.",
        why: [
          "Đây là bước cuối: chỉ phổ biến khi chạy thử đã đạt chuẩn (ý 4).",
          "Ghi lại một quy trình chưa định hình là ghi thứ sẽ phải sửa, và cả nhóm học theo một bản chưa kiểm."
        ] }
    ],
    refs: [
      { label: "Bài 4.4, mục “Quyết theo từng bước”, “Bước nào giao, bước nào giữ” và “Chạy thử một việc thật trước khi mở rộng”", href: NOTES + "#l-4-4" },
      { label: "Bài Nền tảng D4, mục 4 “Giao phần làm, giữ phần quyết”", href: NOTES + "#l-4-0" }
    ]
  },
  {
    de: 4, n: 55, total: 119, sub: "6.1", subName: "Việc nào giao cho Claude được",
    answer: "A",
    ask: "A Claude associate uses the Delegation competency of the AI Fluency Framework to assess a proposal in which Claude would make final hiring decisions with no human review at all. Which classification best reflects Delegation principles?",
    scene: [
      "Một đề xuất: để Claude ra quyết định tuyển dụng cuối cùng, không có người duyệt ở khâu nào.",
      "Người đánh giá dùng năng lực Delegation (giao việc) của khung AI Fluency để xếp loại đề xuất này.",
      "Chỗ khó: B, C, D tự ghi luôn chỗ chúng trái với Delegation, qua các cụm “even though” (dù rằng) hay “on the basis that” (với lý do là). Phải đọc cả phần lý do, không chỉ phần kết luận."
    ],
    asks: [
      "Cách xếp loại nào khớp nhất với nguyên tắc Delegation?",
      "Tức là: quyết định tuyển ai có giao hẳn cho Claude được không, và vì sao.",
      "Soi từng phương án: kết luận có đúng không, và lý do có đúng là lý do của Delegation không."
    ],
    facts: [
      "Delegation (giao việc) là “setting goals and deciding whether, when and how to engage with AI” (đặt mục tiêu và quyết có dùng AI không, lúc nào, dùng thế nào). Việc không giao: phán đoán cuối cùng, phản hồi nhạy cảm với con người, đánh giá có hệ quả lớn.",
      "Usage Policy xếp việc làm vào lĩnh vực rủi ro cao. Quyết định về một người cụ thể ở đây cần người có chuyên môn duyệt trước khi tới người đó, và phải báo là có dùng AI. Bản mới (hiệu lực 12/11/2026) chỉ miễn duyệt trước cho quyết định có lợi hoàn toàn, nơi luật cho phép; quyết định tuyển dụng gồm cả ca bị loại.",
      "Accountability (trách nhiệm giải trình): người dùng output chịu trách nhiệm về nó, giải thích được nó. “Claude quyết” không chuyển trách nhiệm sang công cụ.",
      "Người duyệt chỉ cứu được khi đứng trước thời điểm gây hại. Kiểm ngẫu nhiên vài phần trăm sau khi đã gửi thì không đạt."
    ],
    opts: [
      { k: "A", gist: "Not suitable for full AI delegation, because hiring involves human judgment, accountability, and consequences that Delegation keeps under human ownership rather than autonomous AI execution.",
        why: [
          "Đúng cả kết luận lẫn lý do. Quyết định tuyển ai là phán đoán cuối cùng có hệ quả lớn với một người cụ thể (ý 1), và phải có người đứng tên chịu trách nhiệm (ý 3).",
          "Usage Policy nói cùng chiều: việc làm là lĩnh vực rủi ro cao, cần người có chuyên môn duyệt trước (ý 2). Claude vẫn giúp được phần làm, như tóm tắt hồ sơ hay soạn câu hỏi phỏng vấn; phần quyết thì người giữ."
        ] },
      { k: "B", gist: "Suitable with light human review of only a sample of decisions, even though Delegation reserves final hiring decisions for human ownership rather than after-the-fact sampling.",
        why: [
          "Sai ở cách duyệt: xem một mẫu sau khi đã quyết thì đa số ứng viên nhận quyết định mà không ai duyệt (ý 4).",
          "Chính phương án tự ghi là Delegation giữ quyết định cuối cho người. Kết luận “appropriate” (phù hợp) mâu thuẫn với lý do nó nêu.",
          "Dễ bị cuốn vì có người duyệt, nghe như đã cân bằng. Nhưng người duyệt đứng sau thời điểm gây hại thì không cứu được ứng viên bị loại oan."
        ] },
      { k: "C", gist: "Suitable for full AI delegation, on the grounds that processing speed outweighs the human judgment, accountability, and consequences Delegation requires for final hiring decisions.",
        why: [
          "Sai ở lý do: tốc độ không bù được cho phán đoán và trách nhiệm (ý 1, 3). Delegation hỏi việc này có nên giao không, không hỏi giao thì nhanh hơn bao nhiêu.",
          "Bỏ hẳn người duyệt ở lĩnh vực việc làm còn trái với điều kiện bắt buộc của Usage Policy (ý 2)."
        ] },
      { k: "D", gist: "Not suitable, but only because of system reliability rather than accountability, even though Delegation treats final hiring decisions as needing human ownership however well the system performs.",
        why: [
          "Kết luận đúng, lý do sai. Lý do chính là trách nhiệm và hệ quả với người bị quyết định (ý 1, 3), không phải độ tin cậy của hệ thống.",
          "Nếu lý do chỉ là độ tin cậy thì một hệ thống đủ chính xác sẽ được giao hẳn. Nhưng Claude chính xác tới đâu, quyết định tuyển ai vẫn cần một người đứng tên và giải thích được (ý 3).",
          "Dễ bị cuốn vì “inappropriate” (không phù hợp) trùng kết luận với A. Đề hỏi “most accurately” (chính xác nhất), nên phần lý do quyết định."
        ] }
    ],
    refs: [
      { label: "Bài 6.1, mục “Vùng vàng: Claude gợi ý, người có chuyên môn quyết” và bảng bốn cách duyệt: kiểm ngẫu nhiên sau khi gửi là không đạt", href: NOTES + "#l-6-1" },
      { label: "Bài 6.4, mục “Phụ thuộc và mất kỹ năng”: không giao phán đoán cuối cùng, đánh giá có hệ quả lớn; đây là Delegation", href: NOTES + "#l-6-4" },
      { label: "Bài Nền tảng D4, mục 2 “AI Fluency và khung 4D”: định nghĩa Delegation và ba kỹ năng con", href: NOTES + "#l-4-0" }
    ]
  },
  {
    de: 4, n: 56, total: 119, sub: "2.3", subName: "Kiểm từng khẳng định",
    answer: "D",
    ask: "You are reviewing a Claude output that seems to contain hallucinated content. When a hallucination is suspected, which step should come first?",
    scene: [
      "Mày đang xem một output của Claude và nghi trong đó có chỗ bịa.",
      "Mới là nghi: chưa biết chỗ nào, chưa biết chắc có sai không.",
      "Chỗ khó: cả bốn phương án đều là việc có thể làm khi gặp hallucination. Đề hỏi việc “first” (đầu tiên)."
    ],
    asks: [
      "Khi nghi có hallucination, bước đầu tiên là gì?",
      "Tức là: trước khi bỏ, báo hay ghi sổ, phải biết chính xác cái gì đang bị nghi.",
      "Soi từng phương án: lúc làm bước đó, mày đã biết khẳng định nào sai chưa?"
    ],
    facts: [
      "Hallucination (bịa): nội dung không có cơ sở trong thứ gì bạn đưa hay kiểm được, như trích dẫn không tồn tại, con số không có nguồn. Nó hay nằm ở chi tiết chính xác: tên, ngày, số liệu, trích dẫn, link.",
      "Claim (khẳng định): một câu nói một điều có thể đúng hoặc sai. Kiểm sau khi Claude viết bắt đầu bằng tách bản nháp thành từng khẳng định; mỗi khẳng định đạt hay trượt riêng.",
      "Kiểm là so khẳng định với nguồn có thẩm quyền ngoài Claude. Khẳng định không có căn cứ thì bỏ đi hoặc thay bằng nguồn thật; phần còn lại vẫn dùng được.",
      "Gọi tên lỗi theo cái quan sát được. Chưa biết câu nào sai thì chưa gọi là bịa."
    ],
    opts: [
      { k: "A", gist: "Throw away the entire output and generate a new one from a fresh prompt.",
        why: [
          "Bỏ cả phần đúng, trong khi lỗi thường chỉ nằm ở vài chi tiết (ý 1, 3).",
          "Bản mới cũng do cùng một cơ chế viết ra, có thể bịa ở chỗ khác. Mày vẫn chưa biết chỗ nào sai, nên cũng không biết sửa prompt thế nào.",
          "Dễ bị cuốn vì nghe dứt khoát, làm lại cho sạch. Nhưng chưa khoanh được khẳng định nào sai thì làm lại chỉ là đổi một bản chưa kiểm lấy một bản chưa kiểm khác."
        ] },
      { k: "B", gist: "Record the hallucination pattern in the team's risk register for future reference.",
        why: [
          "Ghi nhận là việc đến sau. Chưa biết khẳng định nào bịa thì chưa có “pattern” (kiểu lỗi) nào để ghi (ý 4).",
          "Output đang bị nghi vẫn nằm đó, chưa ai kiểm, và có thể bị dùng tiếp."
        ] },
      { k: "C", gist: "Tell the user community that the output contains a hallucinated claim.",
        why: [
          "Báo khi mới nghi, chưa xác định câu nào, chưa so với nguồn (ý 3, 4). Có thể báo nhầm, và người nghe cũng không biết phải tránh câu nào.",
          "Báo cho người dùng là bước xử lý sau, khi đã biết lỗi ở đâu và đã có bản sửa."
        ] },
      { k: "D", gist: "Pin down the specific claim that does not appear to be supported by the available evidence.",
        why: [
          "Đúng. Khoanh đúng khẳng định bị nghi là bước mở đầu của việc kiểm từng khẳng định (ý 2).",
          "Có khẳng định cụ thể rồi mới so được với nguồn (ý 3): khớp thì giữ, không có căn cứ thì bỏ hay sửa. Làm lại, ghi sổ, báo người dùng (A, B, C) đều cần biết trước câu nào sai."
        ] }
    ],
    refs: [
      { label: "Bài 2.3, mục “Sau khi Claude viết: kiểm từng khẳng định”: tách bản nháp thành từng khẳng định, so với nguồn", href: NOTES + "#l-2-3" },
      { label: "Bài 2.2, bảng “Ba kiểu lỗi”: hallucination là khẳng định không tìm được nguồn, bỏ đi hoặc thay nguồn thật", href: NOTES + "#l-2-2" }
    ]
  },
  {
    de: 4, n: 57, total: 119, sub: "7.3", subName: "Tối ưu quy trình",
    answer: "BD",
    ask: "You are optimizing a recurring Claude workflow, and the diagnostic work has to be done before anything in the workflow is changed. Which two diagnostic steps must be completed BEFORE the recurring workflow is changed? (Choose two.)",
    scene: [
      "Mày tối ưu một quy trình dùng Claude chạy định kỳ.",
      "Đề đặt luật: phần chẩn đoán phải xong trước khi sửa quy trình.",
      "Năm phương án gồm hai bước chẩn đoán, và ba việc nằm phía sau: báo lãnh đạo khoản tiết kiệm, triển khai bản mới, ghi lại quy trình đã sửa."
    ],
    asks: [
      "Hai bước chẩn đoán nào phải xong “BEFORE” (trước) khi sửa quy trình?",
      "Tức là: muốn sửa đúng chỗ thì phải biết hiện giờ quy trình chạy ra sao, và chỗ nào đang tốn nhất.",
      "Soi từng phương án: nó nhìn vào quy trình hiện tại, hay chỉ làm được khi đã có bản mới?"
    ],
    facts: [
      "Đo trước khi đổi: đừng đoán bước nào đang tốn. Xem số liệu (thời gian, hạn mức, chất lượng) rồi mới đổi.",
      "Sau khi đổi, đo lại thời gian tiết kiệm và chất lượng giữ được để so với mốc trước (baseline). Không có mốc trước thì không chứng minh được bản mới tốt hơn.",
      "Sửa đúng chỗ thắt cổ chai (bottleneck: bước làm chậm hay làm tốn cả quy trình), không sửa đại trà.",
      "Nhân rộng: ghi lại các bước đã chạy tốt, thử trên vài ca thật, rồi mới phổ biến cho cả nhóm."
    ],
    opts: [
      { k: "A", gist: "Tell executive leadership how much the optimization is expected to save.",
        why: [
          "Chưa đo hiện trạng thì con số tiết kiệm chỉ là đoán (ý 1, 2).",
          "Đây cũng không phải bước chẩn đoán mà là báo cáo. Báo khi chưa có số đo là hứa trước điều chưa chứng minh."
        ] },
      { k: "B", gist: "Find the steps that contribute most to the time, cost, or quality problems.",
        why: [
          "Đúng. Đây là tìm chỗ thắt cổ chai (ý 3), để thay đổi nhắm đúng bước đang gây tốn.",
          "Nó dựa vào số đo của D: có số của các lần chạy mới chỉ ra được bước nào đóng góp nhiều nhất."
        ] },
      { k: "C", gist: "Roll the updated workflow out to the team and monitor for adoption problems.",
        why: [
          "Đây là triển khai bản đã sửa, tức là xảy ra sau khi đổi. Đề hỏi việc phải xong trước khi đổi.",
          "Mở rộng còn phải chờ thử trên ca thật đạt chuẩn (ý 4)."
        ] },
      { k: "D", gist: "Take measurements of quality, time, and cost for the existing workflow over its recent runs.",
        why: [
          "Đúng. Đây là mốc trước (ý 1, 2). Không có nó thì không biết bản sửa làm tốt lên hay tệ đi.",
          "Đo trên các lần chạy gần đây, không trên một lần, để số đo phản ánh quy trình thật. D đo hiện trạng, B đọc số đo để chọn chỗ sửa: hai bước đi cặp."
        ] },
      { k: "E", gist: "Write down the revised steps and refresh the team's standard operating procedures.",
        why: [
          "Ghi lại quy trình đã sửa là bước cuối, khi bản mới đã chạy tốt (ý 4).",
          "Dễ bị cuốn vì ghi chép nghe như việc chuẩn bị. Nhưng chữ “revised” (đã sửa) cho thấy nó nói về bản sau khi đổi."
        ] }
    ],
    refs: [
      { label: "Bài 7.3, mục “Đo trước khi đổi, đo sau khi đổi”: xem việc nào đang ngốn rồi mới đổi, so thời gian và chất lượng với mốc trước", href: NOTES + "#l-7-3" },
      { label: "Bài 4.2, mục “Tối ưu quy trình: lời chê của Claude là giả thuyết”: sơ đồ quy trình, chỗ thắt cổ chai", href: NOTES + "#l-4-2" }
    ]
  },
  {
    de: 4, n: 58, total: 119, sub: "2.1", subName: "Đúng và đủ: kiểm chỗ dễ sai trước",
    answer: "D",
    ask: "Before sharing a brief that Claude produced, an analyst reviews it using the Discernment competency of the AI Fluency Framework. Which review best reflects Discernment principles?",
    scene: [
      "Một chuyên viên phân tích sắp chia sẻ một bản brief (bản tóm lược) do Claude viết.",
      "Trước đó anh duyệt nó theo năng lực Discernment (phán đoán) của khung AI Fluency.",
      "Chỗ khó: ba phương án sai đều có đọc bản brief, chỉ là đọc theo một tín hiệu thay thế: văn trôi chảy, giọng và mạch lập luận, hay đoạn đầu và đoạn cuối."
    ],
    asks: [
      "Cách duyệt nào thể hiện đúng nhất tinh thần Discernment?",
      "Tức là: đánh giá output dựa trên bằng chứng gì thì mới gọi là phán đoán đúng.",
      "Soi từng phương án: nó so bản brief với thứ nằm ngoài bản brief (yêu cầu, nguồn, chuẩn nghề), hay chỉ dựa vào cảm giác khi đọc?"
    ],
    facts: [
      "Discernment (phán đoán): “accurately assessing the usefulness of AI outputs and behaviors” (đánh giá đúng output và cách làm việc của AI có dùng được không). Phần Product Discernment xét output có đúng, phù hợp, mạch lạc, đúng trọng tâm không.",
      "Hai câu hỏi tách riêng: có đúng không (từng con số, tên, trích dẫn khớp nguồn không), và có làm đúng việc không (đủ các phần yêu cầu, đúng người đọc, đúng mục đích).",
      "Giọng tự tin, văn trôi chảy, trình bày đẹp không phải bằng chứng. Câu đúng và câu sai đi ra từ cùng một cơ chế.",
      "Phần bị thiếu không để lại câu nào kỳ lạ. Lỗi và chỗ thiếu có thể nằm ở bất kỳ đoạn nào, không chỉ ở đầu hay cuối."
    ],
    opts: [
      { k: "A", gist: "Approve the brief because it reads smoothly and its subject matches the analyst's own professional knowledge of the topic.",
        why: [
          "Sai ở tiêu chí: văn trôi chảy không phải bằng chứng (ý 3).",
          "“Aligns with professional knowledge” (khớp với hiểu biết chuyên môn của mình) cũng không phải kiểm. Chỗ bịa thường nghe rất hợp lý với người trong nghề. Con số, trích dẫn phải so với nguồn, không so với trí nhớ (ý 2).",
          "Dễ bị cuốn vì người duyệt có chuyên môn thật. Nhưng chuyên môn dùng để soi output với nguồn và yêu cầu, không phải để gật đầu vì thấy quen."
        ] },
      { k: "B", gist: "Skip checking the source material and use the brief's overall tone and logical flow as stand-ins for factual accuracy.",
        why: [
          "Bỏ đúng bước so với nguồn, là bước duy nhất trả lời câu “có đúng không” (ý 2).",
          "Giọng và mạch lập luận chỉ cho biết bản brief dễ đọc (ý 3). Một con số sai vẫn nằm gọn trong một đoạn lập luận rất mạch lạc."
        ] },
      { k: "C", gist: "Read the opening paragraph and the conclusion, since those parts usually reflect the quality of the whole document.",
        why: [
          "Chỉ đọc hai đoạn thì phần thân không được kiểm. Lỗi và chỗ thiếu có thể nằm ở bất kỳ đoạn nào (ý 4).",
          "Không có gì bảo đảm đoạn đầu tốt thì phần giữa cũng đúng. Đó là đoán chất lượng, không phải phán đoán dựa trên bằng chứng."
        ] },
      { k: "D", gist: "Check the brief systematically against the task requirements, the source material, and professional standards before sharing it.",
        why: [
          "Đúng. So với yêu cầu trả lời câu “có làm đúng việc, đủ chưa”; so với nguồn trả lời câu “có đúng không” (ý 2).",
          "Chuẩn nghề nghiệp phủ phần phù hợp, mạch lạc, đúng trọng tâm của Product Discernment (ý 1). Cả ba thước đo đều nằm ngoài bản brief, nên kết quả duyệt dựa trên bằng chứng, không dựa trên cảm giác (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 2.1, mục “Hai câu hỏi tách riêng” và “Đo độ đủ bằng một danh sách viết trước”", href: NOTES + "#l-2-1" },
      { label: "Bài Nền tảng D2, mục 2 “Giọng tự tin không phải là bằng chứng” và mục 5 “Khung 4D gọi việc này là Discernment”", href: NOTES + "#l-2-0" }
    ]
  },
  {
    de: 4, n: 59, total: 119, sub: "1.2", subName: "Chia việc lớn thành chuỗi bước",
    answer: "BD",
    ask: "You are using Claude to redesign an employee onboarding workflow, and the high-level decomposition has to be finished before any detailed artifacts are defined. Which two decomposition steps must be completed before the exact email content and schedule are specified? (Choose two.)",
    scene: [
      "Mày dùng Claude thiết kế lại quy trình đón nhân viên mới (onboarding).",
      "Đề đặt thứ tự: phần chia việc ở mức tổng thể phải xong trước, rồi mới tới thứ chi tiết như nội dung từng email và lịch gửi.",
      "Năm phương án lẫn ba loại việc: bước chia việc tổng thể, bước triển khai (chạy thử, mở rộng), và một việc nằm ngoài phần thiết kế (thương lượng ngân sách)."
    ],
    asks: [
      "Hai bước chia việc nào phải xong trước khi viết cụ thể nội dung email và lịch gửi?",
      "Tức là: email và lịch gửi phải bám vào cái gì, và cái đó phải có trước.",
      "Soi từng phương án: nó là khung mà phần chi tiết dựa vào, hay là việc làm sau khi đã có chi tiết?"
    ],
    facts: [
      "Chia việc (task decomposition): tách một yêu cầu lớn thành các phần nhỏ, mỗi phần một việc rõ. Phần phụ thuộc cần kết quả của phần trước nên làm sau.",
      "Mỗi bước sau cần nhận mục tiêu gốc để không lạc hướng. Mục tiêu nói rõ cần kết quả gì, trước khi nghĩ tới cách làm.",
      "Kiểm ở output mà nhiều bước sau dựa vào và khó sửa về sau, như dàn ý đã duyệt. Sai hướng ở dàn ý rẻ hơn sai ở bản hoàn chỉnh.",
      "Chạy thử và mở rộng cần một quy trình đã thiết kế xong. Chạy thử đạt chuẩn rồi mới mở rộng."
    ],
    opts: [
      { k: "A", gist: "Try the onboarding workflow out first on a small group of new hires.",
        why: [
          "Chạy thử cần một quy trình đã thiết kế xong, kể cả email và lịch gửi (ý 4). Lúc này chưa có gì để thử.",
          "Đây là bước nằm sau phần chi tiết, không phải bước chia việc đi trước nó."
        ] },
      { k: "B", gist: "Lay out the main stages the onboarding experience moves through.",
        why: [
          "Đúng. Các giai đoạn lớn (ví dụ trước ngày đầu, tuần đầu, tháng đầu) là khung để chia việc (ý 1). Mỗi email thuộc về một giai đoạn, và lịch gửi bám theo các giai đoạn đó.",
          "Đây là output mà nhiều bước sau dựa vào, nên chốt và kiểm trước khi viết chi tiết (ý 3)."
        ] },
      { k: "C", gist: "Hammer out the onboarding budget in negotiation with the finance department.",
        why: [
          "Thương lượng ngân sách với bộ phận tài chính là việc quản lý, không phải bước chia việc của phần thiết kế quy trình.",
          "Ngân sách có thể là một ràng buộc cần biết. Nhưng nội dung một email chào mừng và ngày gửi nó không phụ thuộc vào cuộc thương lượng này.",
          "Dễ bị cuốn vì nghe như việc “phải có trước” của mọi dự án. Nhưng đề hỏi bước chia việc tổng thể, tức là mục tiêu và các giai đoạn."
        ] },
      { k: "D", gist: "Settle what the onboarding experience as a whole is meant to achieve.",
        why: [
          "Đúng. Mục tiêu tổng (ví dụ người mới tự làm được việc cơ bản sau tháng đầu) là thứ mọi bước sau phải nhận để không lạc hướng (ý 2).",
          "Có mục tiêu rồi mới chia được giai đoạn (B), và mới biết mỗi email phải giúp người mới đạt điều gì. B và D cùng là khung; email và lịch gửi đi sau (ý 1)."
        ] },
      { k: "E", gist: "Launch the onboarding workflow for all new hires company-wide.",
        why: [
          "Mở rộng là bước cuối, sau khi chạy thử đạt chuẩn (ý 4).",
          "Triển khai cho cả công ty khi email còn chưa viết là đảo ngược hẳn thứ tự."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, mục “Bước sau cần nhận gì” (mục tiêu gốc) và “Đặt điểm kiểm ở đâu” (dàn ý mà nhiều bước dựa vào)", href: NOTES + "#l-1-2" },
      { label: "Bài 4.1, mục “Bắt đầu từ vấn đề, không từ công cụ”: rõ kết quả cần trước khi làm", href: NOTES + "#l-4-1" },
      { label: "Bài 7.3, mục “Hiệu quả: bớt làm lại”: việc lớn thì duyệt dàn ý trước, sai hướng ở dàn ý rẻ hơn", href: NOTES + "#l-7-3" }
    ]
  },
  {
    de: 4, n: 60, total: 119, sub: "1.3", subName: "Lặp prompt: chẩn đoán, đổi một chỗ, thử lại",
    answer: "C",
    ask: "You are refining a prompt over several iterations, and every change pushes the output further away from the template you asked for. Which step is most appropriate?",
    scene: [
      "Mày sửa một prompt qua nhiều vòng.",
      "Vòng nào output cũng lệch xa thêm khỏi mẫu (template) đã yêu cầu. Tức là các lần sửa đang làm tệ đi, không phải tốt lên.",
      "Chỗ khó: ba phương án sai là ba phản ứng hay gặp khi bực: xóa hết làm lại, sửa mạnh tay hơn, hoặc bỏ cuộc."
    ],
    asks: [
      "Bước nào phù hợp nhất?",
      "Tức là: khi các thay đổi làm output tệ dần, làm sao lấy lại chỗ đã tốt và đi tiếp có kiểm soát.",
      "Soi từng phương án: nó có giữ lại bản đã chạy tốt nhất không, và mỗi lần đổi có biết được tác dụng của thay đổi đó không."
    ],
    facts: [
      "Lặp prompt (iterate): chẩn đoán → đổi một chỗ → thử lại → giữ cái có tác dụng, cho tới khi đạt tiêu chí.",
      "Thay đổi nào làm output không tốt hơn thì hoàn tác trước khi thử thay đổi kế tiếp. Giữ lại một thay đổi vô ích là cộng thêm một biến số.",
      "Đổi nhiều thứ một lúc thì output tốt lên hay tệ đi cũng không biết vì đâu.",
      "Ghi lại mỗi vòng: đổi gì, output ra sao. Trong app, sửa lại một tin nhắn cũ thì app tạo một phiên bản riêng, bản cũ vẫn còn để so."
    ],
    opts: [
      { k: "A", gist: "Throw out all earlier versions and start again with no record of what worked.",
        why: [
          "Mất luôn bản đã gần đạt và mọi điều đã học qua các vòng (ý 4).",
          "Bắt đầu lại ở chat mới có lúc là đúng, nhưng là với một prompt đã gom các điều chỉnh có tác dụng. “No record” (không ghi lại gì) thì vòng mới dễ lặp lại đúng những lỗi cũ."
        ] },
      { k: "B", gist: "Keep making large changes all at once until the output happens to match.",
        why: [
          "Đổi nhiều thứ một lúc thì không biết thay đổi nào có tác dụng (ý 3). Chính cách này có thể đã gây ra độ lệch đang thấy.",
          "Chữ “happens to” (tình cờ) nói hết: có khớp thì cũng là may. Lần sau gặp đầu vào khác mà hỏng thì không biết gỡ chỗ nào."
        ] },
      { k: "C", gist: "Go back to the prompt version that came closest to the template and make adjustments from that baseline.",
        why: [
          "Đúng. Các thay đổi sau bản đó không làm tốt hơn, nên hoàn tác về bản tốt nhất (ý 2). Bản đó thành mốc (baseline) để so.",
          "Từ mốc đó, đổi từng chỗ nhỏ rồi thử lại (ý 1, 3). Thay đổi nào kéo output gần mẫu hơn thì giữ, không thì bỏ."
        ] },
      { k: "D", gist: "Stop iterating and accept the version that is furthest off target.",
        why: [
          "Bỏ cuộc mà còn chọn bản tệ nhất, trong khi đang có một bản gần đạt.",
          "Nếu cần dừng thì giữ bản gọn nhất vẫn đạt tiêu chí, không phải bản lệch xa nhất."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Mỗi vòng đổi một chỗ” và “Dừng, bắt đầu lại, hay lưu”", href: NOTES + "#l-1-3" },
      { label: "Bài Nền tảng D7, mục 4 “Vòng chẩn đoán”: không tốt hơn thì hoàn tác trước khi thử cần gạt khác", href: NOTES + "#l-7-0" },
      { label: "Bài 7.1, mục “Vì sao chỉ đổi một thứ, và chạy lại cùng input”", href: NOTES + "#l-7-1" }
    ]
  },
  {
    de: 4, n: 61, total: 119, sub: "5.1", subName: "Dựng Project: instructions và knowledge",
    answer: "AB",
    ask: "You are deciding which proposed items should go into a Project set up to support writing policy summaries. Which two items belong in that Project? (Choose two.)",
    scene: [
      "Có một Project dùng để viết bản tóm tắt chính sách (policy summary). Mày đang xét năm thứ người ta đề nghị đưa vào.",
      "Năm thứ: yêu cầu về định dạng và người đọc của bản tóm tắt, thư viện chính sách hiện hành, slide một buổi đào tạo về chuẩn giao tiếp nội bộ, hồ sơ vụ việc của khách do một nhóm pháp chế khác giữ, hồ sơ nhận việc của nhân viên dùng trong một quy trình nhân sự khác.",
      "Chỗ khó: thứ nào cũng là tài liệu thật của công ty. Phải hỏi nó có phục vụ đúng việc viết tóm tắt chính sách không, và nếu có thì nó là cách làm hay là tư liệu."
    ],
    asks: [
      "Hai thứ nào nên đưa vào Project này?",
      "Tức là: Project này cần biết viết thế nào (instructions) và viết từ cái gì (knowledge). Thứ gì không thuộc hai loại đó cho việc này thì để ngoài.",
      "Soi từng phương án: nó là cách làm hay tư liệu của chính việc tóm tắt chính sách, hay của một việc khác?"
    ],
    facts: [
      "Project instructions là chỉ dẫn cách làm, áp cho mọi chat trong Project: vai, giọng, người đọc, định dạng, quy trình.",
      "Project knowledge là tư liệu Claude dùng để trả lời: sổ tay, báo cáo, bảng giá, mẫu văn bản. Chỉ đưa bản hiện hành, đã duyệt.",
      "Thứ Project không cần thì bỏ ra. File thừa làm nhiễu chuyện tìm, và docs khuyên gỡ file không dùng để đỡ tốn hạn mức.",
      "Mọi chat trong Project đều đọc được knowledge. Project mở cho cả tổ chức thì ai trong tổ chức cũng mở được knowledge đó, nên kiểm chế độ hiển thị trước khi thêm file nhạy cảm."
    ],
    opts: [
      { k: "A", gist: "The format the summaries must follow and what their audience expects from them.",
        why: [
          "Đúng: định dạng và người đọc là cách làm, chỗ của nó là project instructions (ý 1).",
          "Viết một lần, mọi chat viết tóm tắt trong Project đều theo, không phải dặn lại từng lần."
        ] },
      { k: "B", gist: "The current library of policies that the summaries are written from.",
        why: [
          "Đúng: đây là tư liệu gốc mà bản tóm tắt dựa vào, chỗ của nó là knowledge (ý 2).",
          "Chữ “current” (hiện hành) khớp đúng luật chỉ đưa bản đang áp dụng. Bản cũ nằm chung thì Claude có thể tóm tắt theo quy định đã hết hiệu lực."
        ] },
      { k: "C", gist: "Slides from a recent team training session about internal communication standards.",
        why: [
          "Sai: slide của một buổi đào tạo về giao tiếp nội bộ không phải tư liệu của việc tóm tắt chính sách, cũng không phải yêu cầu đã chốt cho bản tóm tắt (ý 3).",
          "Dễ bị cuốn vì “communication standards” (chuẩn giao tiếp) nghe gần chuyện viết sao cho đúng. Nhưng yêu cầu định dạng và người đọc của chính việc này đã nằm ở A. Thêm slide chỉ thêm một nguồn chung chung để Claude lẫn vào."
        ] },
      { k: "D", gist: "Open client case files kept by a different legal team for another workstream.",
        why: [
          "Sai: hồ sơ của một mảng việc khác, do nhóm khác giữ, không giúp gì cho việc tóm tắt chính sách (ý 3).",
          "Đó còn là tài liệu mật của khách. Đưa vào knowledge thì mọi chat trong Project, và cả người khác nếu Project được chia sẻ, đều đọc được (ý 4)."
        ] },
      { k: "E", gist: "Employee onboarding records that the same team uses in a separate HR workflow.",
        why: [
          "Sai: cùng một nhóm dùng không có nghĩa là cùng một việc. Hồ sơ này thuộc quy trình nhân sự khác (ý 3).",
          "Hồ sơ nhận việc chứa dữ liệu cá nhân của nhân viên. Đưa vào một Project không cần nó là mở thêm chỗ lộ mà không được gì (ý 4)."
        ] }
    ],
    dispute: "Đề gốc chấm AB, sổ giữ AB. Lời giải gốc viết về ChatGPT và dẫn trang help của OpenAI. Ý của nó vẫn áp được cho Project của Claude: instructions giữ cách làm, knowledge giữ tư liệu (help center Claude “What are Projects”).",
    refs: [
      { label: "Bài 5.1, bảng “Instructions hay knowledge” và mục “Chọn tài liệu và đặt tên”: cách làm vào instructions, tư liệu hiện hành vào knowledge, bỏ thứ không cần", href: NOTES + "#l-5-1" },
      { label: "Bài 6.2, mục “Dùng đúng tài khoản và đúng cài đặt”: Project mở cho cả tổ chức thì ai cũng mở được knowledge", href: NOTES + "#l-6-2" },
      { label: "Help center: Project, instructions và knowledge", href: "https://support.claude.com/en/articles/9517075-what-are-projects-and-how-do-i-use-them" }
    ]
  },
  {
    de: 4, n: 62, total: 119, sub: "2.2", subName: "Gọi đúng tên lỗi: bịa, mâu thuẫn, thiên lệch",
    answer: "D",
    ask: "You are ranking structural flaws in a Claude output by how badly each one hurts its clarity. Which flaw damages clarity the most?",
    scene: [
      "Mày đang xếp các lỗi cấu trúc (structural defect) trong một output của Claude theo mức làm output khó hiểu.",
      "Bốn lỗi: một tiêu đề phụ ngắn hơn các tiêu đề khác, hai đoạn liền nhau nói cùng một ý nhưng gọi bằng từ khác nhau, lỗi trình bày chữ rải ở nhiều phần, và kết luận chính trái với bằng chứng trong thân bài.",
      "Chỗ khó: lỗi rải nhiều chỗ nghe nặng hơn lỗi chỉ ở một chỗ. Phải hỏi lỗi đó làm người đọc hiểu sai cái gì, không đếm số chỗ có lỗi."
    ],
    asks: [
      "Lỗi nào làm output khó hiểu nhất?",
      "Tức là: đọc xong, người đọc có còn biết output muốn nói gì và tin được điều nào không?",
      "Soi từng phương án: lỗi nằm ở hình thức, hay nằm ở chính điều output khẳng định?"
    ],
    facts: [
      "Tự mâu thuẫn (internal contradiction): hai chỗ trong cùng một output nói hai điều khác nhau về một việc. Gặp mâu thuẫn thì chưa dùng được bên nào, phải kiểm lại với nguồn.",
      "Mâu thuẫn là hai giá trị, hai khẳng định khác nhau cho cùng một sự việc. Hai cách gọi cho cùng một ý thì chưa phải mâu thuẫn về nội dung.",
      "Định dạng, câu chữ là chuyện hình thức. Sửa hình thức không đụng tới chuyện nội dung đúng hay sai. Ngược lại, lỗi hình thức cũng không đổi điều output khẳng định.",
      "Liên quan, mạch lạc (relevance and coherence) là một tiêu chí chấm output: có trả lời thẳng câu hỏi, các phần có đi theo thứ tự hợp lý không."
    ],
    opts: [
      { k: "A", gist: "One subheading is shorter than all the other subheadings.",
        why: [
          "Sai: độ dài một tiêu đề phụ không đổi điều gì output nói (ý 3).",
          "Tiêu đề ngắn vẫn gọi đúng tên phần của nó. Đây gần như không phải lỗi."
        ] },
      { k: "B", gist: "Two neighbouring paragraphs give the same information but use different terms for it.",
        why: [
          "Có làm khó đọc: người đọc có thể tự hỏi hai từ đó là một thứ hay hai thứ.",
          "Nhưng hai đoạn nói cùng một ý, không có hai khẳng định trái nhau (ý 2). Hai đoạn lại nằm liền nhau, đọc tiếp là nối được.",
          "Dễ bị cuốn vì đề dùng chữ “inconsistent” (không nhất quán), nghe giống mâu thuẫn của bài 2.2. Nhưng ở đây chỉ lệch tên gọi, không lệch nội dung."
        ] },
      { k: "C", gist: "Typographic inconsistencies show up across several sections of the document.",
        why: [
          "Sai: lỗi trình bày chữ là hình thức (ý 3). Rải ở nhiều phần thì trông cẩu thả, nhưng câu nào vẫn nói đúng điều nó nói.",
          "Rộng không có nghĩa là nặng. Mức hại đo bằng chuyện người đọc hiểu sai gì, không đo bằng số chỗ có lỗi."
        ] },
      { k: "D", gist: "The main conclusion conflicts with the evidence laid out in the body.",
        why: [
          "Đúng: kết luận và thân bài là hai khẳng định trái nhau về cùng một việc, tức là tự mâu thuẫn (ý 1).",
          "Người đọc không biết nên tin kết luận hay tin bằng chứng. Mạch từ bằng chứng tới kết luận gãy đúng ở thông điệp chính của cả output (ý 4).",
          "Sửa câu chữ hay định dạng không gỡ được lỗi này. Phải quay lại kiểm bằng chứng với nguồn rồi viết lại kết luận (ý 1, 3)."
        ] }
    ],
    refs: [
      { label: "Bài 2.2, bảng “Ba kiểu mâu thuẫn”: mâu thuẫn với chính nó trong một output, chưa dùng bên nào khi chưa kiểm nguồn", href: NOTES + "#l-2-2" },
      { label: "Bài 0.3, luật 3: sửa hình thức không sửa được nội dung", href: NOTES + "#l-0-3" },
      { label: "Bài 2.1, bảng tiêu chí chấm nhiều chiều: liên quan, mạch lạc", href: NOTES + "#l-2-1" }
    ]
  },
  {
    de: 4, n: 63, total: 119, sub: "2.3", subName: "Kiểm từng khẳng định",
    answer: "C",
    ask: "As a communications manager, you are checking a newsletter Claude drafted. It quotes a specific growth figure for the industry. Three trade-press articles report that figure, but none of them links to the study behind it. Which validation step is appropriate?",
    scene: [
      "Một quản lý truyền thông kiểm bản tin (newsletter) do Claude soạn. Bản tin có một con số tăng trưởng ngành cụ thể.",
      "Con số đó có trong ba bài báo chuyên ngành (trade press: báo, tạp chí viết riêng cho một ngành). Không bài nào dẫn link tới nghiên cứu gốc.",
      "Chỗ khó: ba bài cùng ghi một con số nghe như đã được kiểm ba lần. Phải hỏi ba bài đó có thật là ba lần kiểm độc lập không."
    ],
    asks: [
      "Bước kiểm nào là phù hợp?",
      "Tức là: với một con số thống kê, phải so với cái gì mới gọi là đã kiểm?",
      "Soi từng phương án: nó so con số với nơi gốc của sự thật, hay chỉ đếm số lần con số được nhắc lại, hoặc đổi cách trình bày cho khỏi phải kiểm?"
    ],
    facts: [
      "Kiểm (verify) là so một khẳng định với nguồn có thẩm quyền, tức nơi gốc của sự thật đó, rồi ghi lại: khớp, không khớp, hay không tìm thấy. Với một con số nghiên cứu, nơi gốc là chính bản nghiên cứu.",
      "Lặp lại giống nhau không chứng minh là đúng. Ba bài cùng nhắc một con số mà không bài nào dẫn tới nghiên cứu thì chưa phải ba lần kiểm độc lập: cả ba có thể cùng lấy lại từ một chỗ.",
      "Mở nguồn ra thì xem cả điều kiện, ngày, phạm vi mà bản tóm tắt có thể đã bỏ mất. Trích một nguồn yếu không làm khẳng định mạnh hơn.",
      "Con số chính xác, thống kê là loại nội dung dễ sai. Con số nghiêng về phía điều người đọc muốn nghe càng phải kiểm kỹ."
    ],
    opts: [
      { k: "A", gist: "Accept the figure, since three trade-press articles repeat it.",
        why: [
          "Sai ở giả định: coi số lần được nhắc là bằng chứng. Ba bài không dẫn nguồn có thể cùng chép một con số chưa ai kiểm (ý 2).",
          "Bản tin sẽ phát đi con số đó dưới tên công ty, trong khi chưa ai nhìn thấy nghiên cứu.",
          "Dễ bị cuốn vì ba nguồn nghe chắc hơn một. Nhưng ba nguồn chỉ có giá trị khi mỗi nguồn tự đi tới gốc."
        ] },
      { k: "B", gist: "Drop the source attribution and present the figure as common knowledge.",
        why: [
          "Sai: bỏ ghi nguồn không làm con số đúng hơn, chỉ giấu chuyện nó chưa được kiểm (ý 1).",
          "Một con số tăng trưởng cụ thể không phải hiểu biết chung (ý 4). Người đọc còn mất luôn đường để tự kiểm."
        ] },
      { k: "C", gist: "Find the original study the articles refer to and confirm the figure in that primary source.",
        why: [
          "Đúng: nghiên cứu gốc là nơi gốc của con số (ý 1). Đối chiếu ở đó mới gọi là kiểm.",
          "Mở nghiên cứu ra còn thấy con số đo cái gì, năm nào, phạm vi nào (ý 3). Bài báo nhắc lại rất hay bỏ mất mấy thứ này.",
          "Không tìm thấy nghiên cứu thì ghi “không tìm thấy”, không đưa con số vào bản tin như thể đã kiểm (ý 1)."
        ] },
      { k: "D", gist: "Use the highest figure found across the three articles to make the newsletter more persuasive.",
        why: [
          "Sai: chọn số theo độ hấp dẫn, không theo độ đúng. Đây là nghiêng con số về phía điều người đọc muốn nghe (ý 4).",
          "Nếu ba bài ghi lệch nhau thì càng phải về nghiên cứu gốc để biết số nào đúng (ý 1), không lấy số cao nhất."
        ] }
    ],
    refs: [
      { label: "Bài nền tảng Domain 2, mục “Kiểm là so với một nguồn nằm ngoài Claude”: nguồn có thẩm quyền, lặp lại giống nhau không chứng minh là đúng", href: NOTES + "#l-2-0" },
      { label: "Bài 2.3, mục “Trích dẫn là con trỏ, không phải bằng chứng”: mở nguồn, xem điều kiện, ngày, phạm vi, độ tin của nguồn", href: NOTES + "#l-2-3" },
      { label: "Bài 2.1, mục “Kiểm theo rủi ro”: con số, thống kê dễ sai, nhất là con số nghiêng về điều người đọc muốn nghe", href: NOTES + "#l-2-1" }
    ]
  },
  {
    de: 4, n: 64, total: 119, sub: "6.2", subName: "Dữ liệu nhạy cảm và quy định",
    answer: "B",
    ask: "You are getting a document that mixes sensitive and non-sensitive content ready to use with Claude. Which data-handling step must be done first?",
    scene: [
      "Mày chuẩn bị một tài liệu để dùng với Claude. Tài liệu có phần nhạy cảm lẫn với phần không nhạy cảm (mixed-sensitivity).",
      "Bốn phương án là bốn bước của cùng một quy trình: phân loại nội dung, che trường nhạy cảm, nhờ đồng nghiệp xem lại bản đã che, gửi cho Claude.",
      "Chỗ khó: cả bốn bước đều đúng và đều cần. Đề chỉ hỏi bước nào phải làm trước tiên."
    ],
    asks: [
      "Bước xử lý dữ liệu nào phải làm trước tiên?",
      "Tức là: bước nào là đầu vào của các bước còn lại?",
      "Soi từng phương án: bước đó có làm được không, nếu chưa có kết quả của bước khác?"
    ],
    facts: [
      "Trước khi gửi, câu hỏi đầu tiên là: dữ liệu này thuộc nhóm nào (cá nhân, tài chính, sức khỏe, nhân sự, đăng nhập, mật doanh nghiệp), và chính sách công ty nói gì về nhóm đó.",
      "Phân loại dữ liệu (data classification) là xếp từng phần nội dung vào nhóm theo mức nhạy cảm. Chính sách AI của công ty dùng nó để trả lời câu “dữ liệu nào được đưa vào”.",
      "Redact (che) là xóa hoặc bôi đen phần nhạy cảm trước khi đưa vào: số tài khoản, số CCCD, địa chỉ. Muốn che đúng thì phải biết trước phần nào nhạy cảm.",
      "Đã gửi thì dữ liệu nằm trong chat, theo luật lưu trữ của tài khoản. Mọi bước xử lý phải xong trước khi bấm gửi."
    ],
    opts: [
      { k: "A", gist: "Redact the sensitive fields and put suitable placeholders in their place.",
        why: [
          "Sai thứ tự: che khi chưa xác định trường nào nhạy cảm (ý 3).",
          "Che theo cảm giác thì dễ sót một trường nhạy cảm, hoặc che nhầm phần việc cần dùng.",
          "Dễ bị cuốn vì che là bước bảo vệ thấy rõ nhất. Nhưng nó cần danh sách trường nhạy cảm, mà danh sách đó đến từ bước phân loại (ý 1, 2)."
        ] },
      { k: "B", gist: "Classify the document's content and identify which fields are sensitive.",
        why: [
          "Đúng: đây là câu hỏi đầu tiên trước khi gửi (ý 1). Kết quả của nó là danh sách trường cần xử lý.",
          "Có danh sách rồi thì bước che, bước xem lại, bước gửi mới có cái để bám (ý 2, 3)."
        ] },
      { k: "C", gist: "Send the redacted document to Claude for the task it is meant for.",
        why: [
          "Sai: gửi là bước cuối, sau khi đã che và đã kiểm bản che (ý 4).",
          "Chính phương án ghi “redacted document” (bản đã che), tức là nó cần các bước trước đã xong."
        ] },
      { k: "D", gist: "Have a colleague review the redacted document to confirm the redaction is complete.",
        why: [
          "Sai thứ tự: muốn xem lại bản đã che thì phải có bản đã che trước.",
          "Bước này có ích, nằm giữa che và gửi. Người xem lại cũng cần danh sách trường nhạy cảm từ bước phân loại để biết phải soi chỗ nào (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 6.2, mục “Kiểm trước khi gửi, vì sau đó chỉ còn giảm thiệt hại”: câu hỏi đầu tiên là dữ liệu thuộc nhóm nào", href: NOTES + "#l-6-2" },
      { label: "Bài nền tảng Domain 6, mục “Dữ liệu nào là nhạy cảm” và bảng phần của chính sách AI: phân loại dữ liệu", href: NOTES + "#l-6-0" }
    ]
  },
  {
    de: 4, n: 65, total: 119, sub: "2.5", subName: "Sửa output cho đúng người đọc",
    answer: "C",
    ask: "A finance consultant is reworking a Claude-drafted narrative for a quarterly investor update. The investor call has a fixed time slot, and investors expect the headline result and the forward outlook to be made clear early. Which restructuring best suits this audience?",
    scene: [
      "Một tư vấn tài chính sửa bản tường thuật (narrative) do Claude soạn cho buổi cập nhật nhà đầu tư hằng quý.",
      "Buổi gọi có khung giờ cố định. Nhà đầu tư muốn nghe sớm hai thứ: headline result (kết quả chính của quý) và forward outlook (triển vọng kỳ tới).",
      "Bốn phương án là bốn thứ tự sắp xếp. Chỗ khó: phương án nào cũng có đủ các phần, chỉ khác cái gì đứng đầu và phần giữa dài hay ngắn."
    ],
    asks: [
      "Cách sắp xếp nào hợp nhất với người nghe này?",
      "Tức là: trong thời gian có hạn, nhà đầu tư phải nghe được kết quả chính và triển vọng trước khi hết giờ.",
      "Soi từng phương án: kết quả chính đứng ở đâu, triển vọng tới lúc nào, và có phần nào kéo dài làm hai thứ đó trôi về cuối không?"
    ],
    facts: [
      "Độ hợp người đọc (fit): output có đúng thứ người đọc cần, ở đúng mức họ hiểu, theo đúng thứ tự họ quan tâm không. Hai bản đúng như nhau có thể hợp người đọc rất khác nhau.",
      "Tiêu chí lấy từ người đọc: điều họ đã nói là ưu tiên. Ở đây đề nói rõ hai thứ nhà đầu tư cần sớm.",
      "Một tiêu chí hợp người đọc: điều quan trọng nhất có đứng đầu không. Cách sửa cụ thể kiểu: đưa các phát hiện chính lên đầu, rút phần nền xuống thật gọn.",
      "Drivers (yếu tố tác động) là những nguyên nhân dẫn tới kết quả, ví dụ vì sao doanh thu tăng hay chi phí giảm."
    ],
    opts: [
      { k: "A", gist: "Open with the quarter's operational highlights, put the financial result in the middle as context, and close with the outlook.",
        why: [
          "Sai: kết quả chính bị đẩy xuống giữa, sau phần điểm sáng vận hành (ý 3).",
          "Khung giờ cố định mà mở đầu dài thì kết quả và triển vọng tới muộn, trái điều nhà đầu tư đã nói (ý 2)."
        ] },
      { k: "B", gist: "Open with the outlook, because investors care most about what comes next, then give the headline result and its drivers.",
        why: [
          "Sai ở giả định: đề không nói nhà đầu tư quan tâm triển vọng nhất. Đề nói họ cần cả kết quả chính lẫn triển vọng sớm (ý 2).",
          "Nói triển vọng trước khi nói quý này ra sao thì người nghe chưa có chỗ dựa để đánh giá triển vọng đó.",
          "Dễ bị cuốn vì triển vọng đúng là một trong hai thứ cần sớm. Nhưng đổi chỗ thì kết quả chính lại bị đẩy lùi, và lý do đưa ra là tự đặt thêm, không có trong đề."
        ] },
      { k: "C", gist: "Open with the headline result, cover the key drivers briefly, and close with the forward outlook.",
        why: [
          "Đúng: kết quả chính đứng đầu (ý 3). Phần yếu tố tác động được rút gọn, nên triển vọng tới sớm trong khung giờ (ý 2, 4).",
          "Thứ tự kết quả, vì sao ra kết quả đó, kỳ tới ra sao là thứ tự người nghe dễ theo: mỗi phần dựa vào phần trước (ý 1)."
        ] },
      { k: "D", gist: "Open with a chronological recap of the quarter, reveal the headline result where the recap naturally ends, then give the outlook.",
        why: [
          "Sai: kể theo trình tự thời gian đẩy kết quả chính xuống cuối phần kể (ý 3).",
          "Đây là thứ tự của người viết, không phải thứ tự người nghe cần. Hết giờ trước khi tới kết quả là hỏng đúng điều đề đặt ra (ý 1, 2)."
        ] }
    ],
    refs: [
      { label: "Bài 2.5, khái niệm “Fit” và bảng “Tiêu chí hợp người đọc”: điều quan trọng nhất có đứng đầu không", href: NOTES + "#l-2-5" },
      { label: "Bài 2.5, bảng “Yêu cầu sửa phải làm theo được”: đưa phát hiện chính lên đầu, rút phần nền", href: NOTES + "#l-2-5" },
      { label: "Bài 2.1, tiêu chí “liên quan, mạch lạc”: ví dụ hỏng là kết luận nằm ở cuối, sau ba đoạn nền", href: NOTES + "#l-2-1" }
    ]
  },
  {
    de: 4, n: 66, total: 119, sub: "6.3", subName: "Làm việc trong chính sách AI của công ty",
    answer: "A",
    ask: "A knowledge worker is explaining to a colleague what an organization's AI governance framework is for. Which explanation is most accurate?",
    scene: [
      "Một nhân viên văn phòng giải thích cho đồng nghiệp khung quản trị AI (AI governance framework) của tổ chức dùng để làm gì.",
      "Bốn phương án tả bốn mục đích: dùng AI nhất quán và có người chịu trách nhiệm, chọn công cụ rẻ nhất, quy định khóa đào tạo bắt buộc, hay chỉ ghi lại những gì luật bắt.",
      "Chỗ khó: B, C, D đều tả một thứ có thể có thật trong công ty. Phải hỏi phương án nào tả mục đích của cả khung, không chỉ một mảnh."
    ],
    asks: [
      "Câu mô tả nào chính xác nhất?",
      "Tức là: khung quản trị AI trả lời những câu hỏi gì cho người dùng AI hằng ngày?"
    ],
    facts: [
      "Governance (quản trị AI): toàn bộ những thứ giúp tổ chức dùng AI đúng luật, đúng chính sách: người chịu trách nhiệm, cài đặt do admin khóa, nhật ký để kiểm lại.",
      "Chính sách AI của tổ chức trả lời: được dùng công cụ nào, với loại dữ liệu nào, việc gì phải có người duyệt, khi nào ghi rõ có dùng AI, gặp ca khó thì hỏi ai.",
      "Usage Policy của Anthropic là sàn. Chính sách công ty được chặt hơn, không được lỏng hơn, và nó điều chỉnh việc dùng hằng ngày.",
      "Công cụ được duyệt (approved tool) là công cụ, tài khoản, connector mà công ty đã xem xét và cho phép dùng với dữ liệu công việc."
    ],
    opts: [
      { k: "A", gist: "It sets out the approved tools, the data that may be used, the reviews that are required and the reporting channels, so AI is used consistently and with clear accountability.",
        why: [
          "Đúng: bốn thứ phương án nêu khớp các phần của chính sách AI: công cụ được duyệt, dữ liệu được đưa vào, việc cần người duyệt, kênh hỏi và báo lên (ý 2).",
          "Mục đích “consistently and accountably” (nhất quán và có người chịu trách nhiệm) khớp định nghĩa governance: có người chịu trách nhiệm, có cài đặt, có nhật ký (ý 1)."
        ] },
      { k: "B", gist: "It lists the AI tools the organization licenses and what each one costs, so staff can choose the cheapest tool for each task.",
        why: [
          "Sai: đây là danh sách mua sắm, không nói gì về dữ liệu, việc cần duyệt hay ai chịu trách nhiệm (ý 1, 2).",
          "Công cụ được duyệt là công cụ được phép dùng với dữ liệu công việc (ý 4), không phải công cụ rẻ nhất cho từng việc."
        ] },
      { k: "C", gist: "It defines the training each employee must finish before using AI, with a separate requirement for every licensed tool.",
        why: [
          "Sai: tả một mảnh có thể có, không tả mục đích của cả khung (ý 1).",
          "Học xong khóa, người dùng vẫn chưa biết dữ liệu nào được đưa vào, việc nào cần duyệt, hỏi ai khi chính sách không nhắc tới (ý 2)."
        ] },
      { k: "D", gist: "It records the AI policies the organization is legally obliged to adopt, focusing on regulatory compliance rather than day-to-day use.",
        why: [
          "Sai ở hai chỗ: chính sách công ty được chặt hơn mức luật và Usage Policy bắt, và nó nhắm đúng việc dùng hằng ngày (ý 2, 3).",
          "Dễ bị cuốn vì governance có dính tới tuân thủ luật. Nhưng một khung chỉ ghi luật mà bỏ việc hằng ngày thì người dùng vẫn không biết hôm nay được dùng công cụ nào, với dữ liệu nào."
        ] }
    ],
    refs: [
      { label: "Bài nền tảng Domain 6, mục “Chính sách AI của tổ chức và governance”: sáu phần của một chính sách AI", href: NOTES + "#l-6-0" },
      { label: "Bài 6.3, mục “Chính sách chỉ chạy thật khi thành cài đặt” và “Ba tầng, tầng trong chỉ được chặt hơn”", href: NOTES + "#l-6-3" }
    ]
  },
  {
    de: 4, n: 67, total: 119, sub: "1.2", subName: "Chia việc lớn thành chuỗi bước",
    answer: "A",
    ask: "A senior project coordinator must use Claude to build an end-of-year report spanning finance, operations and customer outcomes. Each of the three areas has its own data owner and its own source documents. Which way of breaking down the work is most likely to produce a strong report?",
    scene: [
      "Một điều phối viên dự án dùng Claude làm báo cáo cuối năm gồm ba mảng: tài chính, vận hành, kết quả khách hàng.",
      "Mỗi mảng có người chủ dữ liệu riêng và bộ tài liệu nguồn riêng.",
      "Báo cáo còn cần executive summary (bản tóm tắt cho lãnh đạo). Chỗ khó: viết phần tóm tắt lúc nào, trước hay sau các phần, và ba mảng làm chung hay làm riêng."
    ],
    asks: [
      "Cách chia việc nào dễ cho ra báo cáo tốt nhất?",
      "Tức là: phần nào làm riêng được, phần nào phải chờ phần khác, và mỗi bước cần nhận gì?",
      "Soi từng phương án: các mảng có được làm riêng với đúng nguồn của nó không, và phần tóm tắt có được rút ra từ các phần đã viết không?"
    ],
    facts: [
      "Phần độc lập làm riêng được rồi gộp lại. Phần phụ thuộc cần kết quả của phần trước nên phải làm sau. Hai phần phụ thuộc mà chạy riêng, mỗi bên tự giả định, thì kết quả mâu thuẫn nhau.",
      "Mỗi bước cần nhận: mục tiêu gốc để không lạc hướng, lời dặn riêng của bước đó, và tài liệu thật bước đó cần.",
      "Nên chia khi một prompt phải lo nhiều thứ cạnh tranh nhau, hoặc khi cần kiểm output trung gian trước khi đi tiếp. Lỗi ở bước đầu chảy xuống mọi bước sau.",
      "Bản tóm tắt cho lãnh đạo nêu các kết quả chính của cả báo cáo. Nó dựa vào các phần, nên là phần phụ thuộc."
    ],
    opts: [
      { k: "A", gist: "Set the report's goals, gather the inputs for each section, draft every section in its own prompt, then build the executive summary from the drafted sections.",
        why: [
          "Đúng: ba mảng có chủ và nguồn riêng là phần độc lập, làm riêng được (ý 1). Mục tiêu đặt trước, nên prompt của phần nào cũng mang mục tiêu gốc (ý 2).",
          "Bản tóm tắt là phần phụ thuộc, viết sau cùng từ các phần đã viết (ý 1, 4). Nó nói đúng điều báo cáo đã tìm ra.",
          "Mỗi phần nháp là một output trung gian, kiểm được với nguồn của mảng đó trước khi bản tóm tắt dựa vào (ý 3)."
        ] },
      { k: "B", gist: "Write the executive summary first to anchor the narrative, then write each section so it supports what the summary already says.",
        why: [
          "Sai thứ tự: làm phần phụ thuộc trước các phần nó dựa vào (ý 1, 4).",
          "Các phần bị viết để khớp câu chuyện có sẵn, không để phản ánh số liệu. Mảng nào có kết quả khác câu chuyện thì dễ bị bẻ cho vừa.",
          "Dễ bị cuốn vì “anchor the narrative” (neo câu chuyện) nghe như có định hướng. Nhưng định hướng đúng là mục tiêu báo cáo đặt từ đầu, không phải kết luận viết trước khi đọc số liệu."
        ] },
      { k: "C", gist: "Draft the three sections in parallel with section-specific prompts, then join the outputs and lightly edit them into the final report.",
        why: [
          "Đúng một nửa: tách ba mảng làm riêng là hợp (ý 1).",
          "Nhưng không đặt mục tiêu chung trước, nên prompt từng phần thiếu mục tiêu gốc và ba phần dễ lệch nhau (ý 2).",
          "Ghép rồi sửa nhẹ là bỏ mất bước tổng hợp: không có bản tóm tắt cho lãnh đạo rút ra từ ba phần (ý 4)."
        ] },
      { k: "D", gist: "Give Claude all the source documents at once and ask for the full report, executive summary included, in a single pass.",
        why: [
          "Sai: một prompt phải lo ba bộ nguồn, ba mảng và phần tóm tắt cùng lúc, đúng ca nên chia (ý 3).",
          "Không có output trung gian để kiểm. Lỗi ở mảng nào cũng chỉ hiện ra ở bản cuối, và phải lần ngược qua cả báo cáo."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, bảng “Khi nào nên chia, khi nào giữ một prompt” và mục “Bước sau cần nhận gì”: phần độc lập, phần phụ thuộc, mục tiêu gốc", href: NOTES + "#l-1-2" },
      { label: "Bài 1.2, mục “Đặt điểm kiểm ở đâu”: lỗi bước đầu chảy xuống mọi bước sau", href: NOTES + "#l-1-2" }
    ]
  },
  {
    de: 4, n: 68, total: 119, sub: "6.2", subName: "Dữ liệu nhạy cảm và quy định",
    answer: "C",
    ask: "A customer-success associate is writing a prompt that asks Claude to summarize a customer issue from a case file. The file holds the customer's full government ID number, home address, name and account number, plus a description of the issue. The associate needs a summary that focuses on the issue. What is the most appropriate approach?",
    scene: [
      "Một nhân viên chăm sóc khách hàng (customer success) nhờ Claude tóm tắt vấn đề của một khách từ hồ sơ vụ việc.",
      "Hồ sơ có số giấy tờ tùy thân do nhà nước cấp (government identifier, như số CCCD), địa chỉ nhà, họ tên, số tài khoản, và phần mô tả vấn đề.",
      "Bản tóm tắt chỉ cần nói về vấn đề. Chỗ khó: bốn phương án xử lý dữ liệu theo bốn cách: gửi hết rồi dặn, đổi trường này lấy trường khác, che hai trường, hay chỉ gửi mô tả kèm tên."
    ],
    asks: [
      "Cách làm nào phù hợp nhất?",
      "Tức là: áp tối thiểu hóa dữ liệu trước khi gửi, mà bản tóm tắt vẫn làm được.",
      "Soi từng phương án: dữ liệu được xử lý trước hay sau khi gửi, và lý do bỏ hay giữ một trường có đúng là “việc này có cần nó không”?"
    ],
    facts: [
      "Data minimization (tối thiểu hóa dữ liệu): chỉ đưa cho Claude phần dữ liệu việc đó thật sự cần. Trước khi gửi, hỏi: việc này có cần chi tiết định danh không.",
      "PII (thông tin định danh cá nhân) là thông tin chỉ ra được một người cụ thể: họ tên, email, số điện thoại, số CCCD, số tài khoản, địa chỉ. Đổi trường này lấy trường kia vẫn là gửi PII.",
      "Lời dặn trong prompt chỉ ảnh hưởng câu trả lời. Dữ liệu đã gửi vẫn nằm trong chat, theo luật lưu trữ của tài khoản. Xử lý trước khi gửi, không dặn sau.",
      "Redact (che) là xóa hoặc bôi đen phần nhạy cảm trước khi đưa vào: số tài khoản, số CCCD, địa chỉ."
    ],
    opts: [
      { k: "A", gist: "Send the whole case file and tell Claude not to mention the government ID or the home address in the summary.",
        why: [
          "Sai: lời dặn chỉ đổi câu trả lời, không đổi chuyện số giấy tờ và địa chỉ đã nằm trong chat (ý 3).",
          "Dễ bị cuốn vì bản tóm tắt cuối trông sạch. Nhưng chỗ phải chặn là đầu vào, và đây đúng kiểu “gửi rồi dặn” mà luật 6 rút từ câu mẫu của guide loại bỏ."
        ] },
      { k: "B", gist: "Swap the government ID for the customer's name and the home address for the account number, since names and account numbers are less sensitive.",
        why: [
          "Sai: họ tên và số tài khoản vẫn là PII (ý 2). Đổi chỗ không làm bớt dữ liệu đi.",
          "Che là bỏ phần việc không cần (ý 4), không phải thay bằng một định danh khác. Hai trường thay vào lại vốn đã có sẵn trong hồ sơ."
        ] },
      { k: "C", gist: "Remove or redact the government ID and the home address before sending the prompt, because a summary of the issue needs neither.",
        why: [
          "Đúng: xử lý trước khi gửi (ý 3), và lý do bỏ đúng tiêu chí tối thiểu hóa: tóm tắt vấn đề không cần hai trường đó (ý 1).",
          "Hai trường bị bỏ chỉ thẳng ra một người thật: giấy tờ tùy thân và nơi ở (ý 2). Che đi rồi, phần mô tả vấn đề vẫn còn nguyên cho việc tóm tắt (ý 4)."
        ] },
      { k: "D", gist: "Send only the description of the issue and add the customer's name for context, since a description plus a name is enough for a summary.",
        why: [
          "Gửi ít trường hơn C. Nhưng phần “add the customer's name for context” (thêm tên để có ngữ cảnh) là đưa một định danh vào với lý do không đúng: tên không nói thêm gì về vấn đề (ý 1, 2).",
          "Phương án chọn trường theo cảm giác “thế là đủ”, không theo câu hỏi việc này cần trường nào. Câu này vẫn mơ hồ, xem ghi chú đáp án gốc bên dưới."
        ] }
    ],
    dispute: "Đề gốc chấm C, sổ giữ C, nhưng câu này mơ hồ. Đếm số trường gửi đi thì D còn ít hơn C: C vẫn gửi họ tên và số tài khoản, D chỉ gửi mô tả và họ tên. Theo đúng lý lẽ của C (“tóm tắt vấn đề không cần”), họ tên và số tài khoản cũng không cần. Sổ giữ C vì C là phương án duy nhất bỏ dữ liệu theo đúng tiêu chí và bỏ trước khi gửi, còn D đưa tên vào với lý do “for context” không đứng được. Notes và docs không có gì phân xử chuyện giữ hay bỏ số tài khoản trong ca này.",
    refs: [
      { label: "Bài 6.2, mục “Kiểm trước khi gửi”, “Ba cách bớt dữ liệu mà việc vẫn xong” và “Dặn Claude đừng nhớ không phải biện pháp kiểm soát”", href: NOTES + "#l-6-2" },
      { label: "Bài 0.3, luật 6: dữ liệu nhạy cảm xử lý trước khi đưa vào, đừng dặn sau", href: NOTES + "#l-0-3" },
      { label: "Bài nền tảng Domain 6, định nghĩa PII: họ tên, số CCCD, số tài khoản, địa chỉ đều là định danh", href: NOTES + "#l-6-0" }
    ]
  },
  {
    de: 4, n: 69, total: 119, sub: "4.4", subName: "Đưa Claude vào quy trình đang chạy",
    answer: "A",
    ask: "You are a process consultant adding Claude to an existing weekly workflow. Which order of integration steps is correct?<br>(1) Pilot the integrated workflow with a small group and gather feedback.<br>(2) Document the current workflow's steps, owners and decision points.<br>(3) Update the documented workflow and roll it out to the wider team.<br>(4) Decide which steps Claude can augment and which must stay with people.<br>(5) Specify the inputs Claude needs, the outputs it delivers, and the hand-offs around each step.",
    scene: [
      "Mày là tư vấn quy trình, đưa Claude vào một quy trình hằng tuần đang chạy.",
      "Năm bước: ghi lại quy trình hiện tại (2), chọn bước nào Claude hỗ trợ, bước nào người giữ (4), định đầu vào, đầu ra và chỗ chuyển tay quanh từng bước (5), chạy thử với nhóm nhỏ (1), cập nhật tài liệu rồi mở cho cả nhóm (3).",
      "A, B, C cùng kết thúc bằng 1 rồi 3, chỉ khác thứ tự của 2, 4, 5. D đưa chạy thử (1) lên đầu."
    ],
    asks: [
      "Thứ tự đúng của các bước tích hợp là gì?",
      "Tức là: mỗi bước cần kết quả của bước nào trước nó?",
      "Soi từng phương án: lúc chọn bước giao Claude, đã có danh sách bước chưa? Lúc định đầu vào, đầu ra, đã biết bước nào là của Claude chưa? Lúc chạy thử, đã có gì để thử chưa?"
    ],
    facts: [
      "Sơ đồ quy trình (process map) là danh sách các bước: ai làm, chờ ở đâu, chuyển cho ai. Muốn quyết bước nào giao Claude thì phải có danh sách này trước.",
      "Quyết theo từng bước, không theo cả quy trình: với mỗi bước, Claude làm, người giữ, hay chia ra. Luật: giao phần làm, giữ phần quyết.",
      "Bước giao cho Claude cần nói rõ nó nhận gì (mục tiêu, lời dặn, tài liệu thật) và trả ra gì cho bước sau. Chỉ định được khi đã biết bước đó là của Claude.",
      "Chạy thử (pilot): một nhóm nhỏ, tiêu chí đạt hay trượt viết trước, giữ các bước duyệt hiện có. Đạt chuẩn rồi mới mở rộng, và người dựa vào quy trình phải biết bước nào giờ do Claude làm."
    ],
    opts: [
      { k: "A", gist: "2, 4, 5, 1, 3",
        why: [
          "Đúng. Ghi lại quy trình hiện tại (2) để có danh sách bước. Chọn trên danh sách đó bước nào Claude hỗ trợ, bước nào người giữ (4) (ý 1, 2).",
          "Biết bước nào của Claude rồi mới định đầu vào, đầu ra và chỗ chuyển tay của nó (5) (ý 3). Chạy thử với nhóm nhỏ (1), đạt rồi mới cập nhật tài liệu và mở cho cả nhóm (3) (ý 4)."
        ] },
      { k: "B", gist: "2, 5, 4, 1, 3",
        why: [
          "Làm (5) trước (4): định đầu vào, đầu ra và chỗ chuyển tay khi chưa biết bước nào giao Claude (ý 3).",
          "Hoặc phải định cho mọi bước, kể cả bước người giữ, hoặc định xong lại sửa sau khi chọn.",
          "Dễ bị cuốn vì nó vẫn mở đầu bằng (2) và kết thúc đúng (1, 3). Nhưng chỗ chuyển tay nằm ở đâu phụ thuộc vào chuyện bước nào là của Claude (ý 2, 3)."
        ] },
      { k: "C", gist: "4, 2, 5, 1, 3",
        why: [
          "Làm (4) trước (2): chọn bước giao Claude khi chưa ghi lại quy trình có những bước nào, ai làm, quyết ở đâu (ý 1).",
          "Dễ chọn nhầm bước, hoặc giao luôn một điểm quyết định mà lẽ ra người phải giữ (ý 2)."
        ] },
      { k: "D", gist: "1, 2, 4, 5, 3",
        why: [
          "Chạy thử (1) ngay từ đầu, khi chưa có quy trình tích hợp nào để thử: chưa chọn bước, chưa định đầu vào, đầu ra, chưa có tiêu chí đạt hay trượt (ý 4).",
          "Phản hồi thu về không gắn với thiết kế nào, nên không biết phải sửa cái gì."
        ] }
    ],
    refs: [
      { label: "Bài 4.4, mục “Quyết theo từng bước” và “Chạy thử một việc thật trước khi mở rộng”", href: NOTES + "#l-4-4" },
      { label: "Bài 4.2, khái niệm sơ đồ quy trình: ai làm, chờ ở đâu, chuyển cho ai", href: NOTES + "#l-4-2" },
      { label: "Bài 1.2, mục “Bước sau cần nhận gì”: mục tiêu gốc, lời dặn riêng, tài liệu thật", href: NOTES + "#l-1-2" }
    ]
  },
  {
    de: 4, n: 70, total: 119, sub: "2.1", subName: "Đúng và đủ: kiểm chỗ dễ sai trước",
    answer: "D",
    ask: "A customer-success team member checks a Claude-written customer health-check report against the agreed list of deliverables. The report covers all five required topics, yet its renewal-risk section names only one risk factor, while the specification says renewal risk must be assessed across pricing, product fit and stakeholder change. Which conclusion is best supported?",
    scene: [
      "Một nhân viên chăm sóc khách hàng đối chiếu báo cáo sức khỏe khách hàng (customer health-check: bản đánh giá tình trạng một khách) do Claude viết với danh sách sản phẩm phải giao (deliverable list) đã thống nhất.",
      "Báo cáo có đủ năm chủ đề bắt buộc. Nhưng phần rủi ro gia hạn (renewal risk: khả năng khách không ký tiếp) chỉ nêu một yếu tố, trong khi bản đặc tả đòi xét đủ ba: giá, độ hợp của sản phẩm, thay đổi người liên quan phía khách (stakeholder change).",
      "Chỗ khó: tính theo chủ đề thì đủ, tính theo yêu cầu chi tiết thì thiếu. Phải nói đúng mức: thiếu tới đâu, và làm gì tiếp."
    ],
    asks: [
      "Kết luận nào có căn cứ nhất?",
      "Tức là: đo độ đủ bằng chính bản đặc tả thì báo cáo này đạt tới đâu?",
      "Soi từng phương án: nó gọi đúng tên chỗ thiếu không, và nó dẫn tới việc sửa đúng chỗ trước khi giao không?"
    ],
    facts: [
      "Completeness (độ đầy đủ): output có làm hết những gì yêu cầu đòi không. Đo bằng yêu cầu, không đo bằng chủ đề.",
      "Đo độ đủ: chép yêu cầu thành danh sách, mỗi phần phải có là một dòng. Đọc output, đánh dấu từng dòng: đã trả lời, trả lời một nửa, hay chưa có. Ghi phần thiếu để đưa vào lần yêu cầu sửa.",
      "Đừng chuyển output cho người khác “tự xem còn thiếu gì”. Người nhận không có danh sách yêu cầu của mày, nên khó phát hiện chỗ thiếu hơn mày.",
      "Deployment Diligence (trách nhiệm khi đem dùng): người giao output chịu trách nhiệm kiểm và bảo đảm cho nó, trước khi nó tới tay người khác."
    ],
    opts: [
      { k: "A", gist: "Completeness can't be judged from the deliverable specification alone; the customer should read the report and confirm whether the renewal-risk depth is enough.",
        why: [
          "Sai: bản đặc tả chính là thước đo độ đủ, và nó đã ghi rõ ba yếu tố (ý 1).",
          "Đẩy cho khách tự xem là đúng điều không nên làm: khách không cầm danh sách yêu cầu như mày (ý 3). Kiểm trước khi giao là việc của người giao (ý 4)."
        ] },
      { k: "B", gist: "The report fails the specification, because a section covering only one of the three required risk dimensions counts as a missing section.",
        why: [
          "Kết luận “chưa đạt” có phần đúng, nhưng gọi sai tên: phần rủi ro gia hạn có mặt, chỉ trả lời một nửa, không phải chưa có (ý 2).",
          "Gọi sai thì sửa sai: coi như mất cả phần thì viết lại từ đầu, trong khi chỉ cần bổ sung hai yếu tố còn thiếu.",
          "Dễ bị cuốn vì nó nghiêm, không cho qua. Nhưng phần thiếu phải ghi đúng thì lần yêu cầu sửa mới trúng chỗ (ý 2)."
        ] },
      { k: "C", gist: "The report meets the specification, because all five topics appear and a renewal-risk section is present.",
        why: [
          "Sai: đo theo chủ đề, không đo theo yêu cầu (ý 1). Có mục “renewal risk” chưa có nghĩa là đã xét đủ ba yếu tố.",
          "Giao như vậy thì khách nhận một đánh giá rủi ro thiếu hai yếu tố mà bản đặc tả đã cam kết."
        ] },
      { k: "D", gist: "The report satisfies the topic-level requirements, but its renewal-risk section is under-scoped against the specification and should be expanded before delivery.",
        why: [
          "Đúng: tách được hai mức. Đủ năm chủ đề là đạt ở mức chủ đề. Phần rủi ro gia hạn mới “trả lời một nửa” so với ba yếu tố bắt buộc (ý 1, 2).",
          "Kết luận dẫn thẳng tới việc cần làm: bổ sung hai yếu tố còn thiếu, rồi mới giao (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 2.1, mục “Đo độ đủ bằng một danh sách viết trước”: đã trả lời, trả lời một nửa, hay chưa có, và đừng đẩy cho người khác tự tìm chỗ thiếu", href: NOTES + "#l-2-1" },
      { label: "Bài nền tảng Domain 2, mục “Khung 4D”: Deployment Diligence, output giao đi mang tên mày", href: NOTES + "#l-2-0" }
    ]
  },
  {
    de: 4, n: 71, total: 119, sub: "3.1", subName: "Chọn tính năng: chat, Project, Research, artifact",
    answer: "D",
    ask: "An analyst has to work out summary statistics from a sales-data file she has uploaded and produce a chart for a weekly report. Which way of producing the output fits this job best?",
    scene: [
      "Một chuyên viên phân tích đã tải lên file dữ liệu bán hàng. Việc cần làm: tính các số thống kê tóm tắt (tổng, trung bình, cao nhất, thấp nhất…) và vẽ một biểu đồ cho báo cáo tuần.",
      "Chỗ khó: ba phương án sai mỗi cái né một phần việc. Hoặc đoán số thay vì tính, hoặc có chữ mà không có biểu đồ, hoặc có lời tả mà không có con số nào.",
      "Báo cáo tuần sẽ tới tay người khác, nên số phải đúng trên toàn bộ file, không chỉ trên vài dòng đầu."
    ],
    asks: [
      "Cách làm ra output nào hợp nhất với việc này?",
      "Tức là: chọn cách cho ra đủ hai thứ báo cáo cần (con số và biểu đồ), mà con số là số được tính thật trên cả file.",
      "Soi từng phương án: có tính trên toàn bộ dữ liệu không, có ra biểu đồ thật không, có bước kiểm trước khi gửi không."
    ],
    facts: [
      "Code execution (chạy code): Claude chạy code trong một môi trường cách ly (sandbox) để phân tích file dữ liệu tải lên như CSV, và tạo file, kể cả biểu đồ dạng ảnh PNG. Guide gọi là Code Execution; trong app hiện nay cài đặt tên là “Create and edit files” (tạo và sửa file).",
      "Chat chỉ đọc số thì hụt ở phép tính chính xác: con số được “đoán” chứ không được tính, mà giọng vẫn rất chắc. Cách bù là cho Claude chạy code.",
      "Con số, thống kê là loại nội dung dễ sai. Kiểm là so với nguồn nằm ngoài Claude, ở đây là chính file dữ liệu gốc, trước khi output rời tay mình.",
      "Output đủ là output có mọi phần yêu cầu đòi. Phần bị thiếu không để lại câu nào kỳ lạ, đọc lướt không thấy, nhưng báo cáo vẫn chưa xong."
    ],
    opts: [
      { k: "A", gist: "Have Claude estimate the statistics from a quick look at a preview of the file, and accept the unverified figures instead of calculating over the full uploaded dataset.",
        why: [
          "Sai ở hai chỗ. Số được ước từ vài dòng xem trước, nên không phải số của cả file. Và con số được “đoán” chứ không được tính (ý 2).",
          "Còn bỏ luôn bước kiểm, dù con số là loại dễ sai (ý 3). Báo cáo tuần mang số sai mà nghe rất chắc.",
          "Dễ bị cuốn vì nhanh, và Claude đưa số rất tự tin. Nhưng giọng tự tin không phải bằng chứng."
        ] },
      { k: "B", gist: "Write a placeholder for the chart in the chat reply instead of actually creating the visualization, so the weekly report goes without the visual it needs.",
        why: [
          "Bỏ hẳn phần biểu đồ, trong khi chạy code tạo được biểu đồ thành file ảnh thật (ý 1).",
          "Báo cáo thiếu một phần đề đòi (ý 4). Dòng giữ chỗ chỉ đẩy việc vẽ sang cho người khác."
        ] },
      { k: "C", gist: "Ask for a narrative description of the data in the chat reply without computing anything, so neither the statistics nor the chart get produced and the report stays incomplete.",
        why: [
          "Lời tả không phải phép tính. Không con số nào được tính, cũng không có biểu đồ (ý 4).",
          "Tả dữ liệu mà không tính còn dễ ra nhận xét nghe hợp lý nhưng file không chứng minh (ý 2)."
        ] },
      { k: "D", gist: "Use Code Execution to run the calculations and build the chart, then check the computed results against the source data before the output is shared.",
        why: [
          "Đúng. Code chạy trên cả file đã tải lên, nên con số được tính chứ không được đoán (ý 1, 2). Cùng lượt đó Claude vẽ biểu đồ thành file ảnh.",
          "Bước kiểm vẫn giữ: đối chiếu vài con số với file gốc (ý 3). Code tính đúng chưa chắc đã đọc đúng cột, lọc đúng tuần.",
          "Ra đủ cả hai thứ báo cáo cần (ý 4)."
        ] }
    ],
    dispute: "Đáp án giữ D. Tên “Code Execution” trong đề là tên guide dùng. Trong app, cài đặt này giờ tên là “Create and edit files” (tên cũ “Code execution and file creation”), cùng một tính năng. Help center (Create and edit files with Claude) ghi nó cho Claude “a sandboxed computing environment” (một môi trường tính toán cách ly), nhận file CSV, TSV “for data analysis and visualization” (để phân tích và trực quan hóa dữ liệu), và tạo biểu đồ dạng ảnh PNG. Trang này cũng dặn có thể phải “review and refine” (xem lại và chỉnh) output, khớp với vế kiểm của D.",
    refs: [
      { label: "Bài Nền tảng D3, định nghĩa Code execution: chạy code cách ly, phân tích CSV, tạo biểu đồ PNG; tên cũ, tên mới", href: NOTES + "#l-3-0" },
      { label: "Bài 4.5, bảng bốn đặc tính: phép tính chính xác là chỗ hụt, cách bù là cho Claude chạy code", href: NOTES + "#l-4-5" },
      { label: "Help center, Create and edit files with Claude: sandbox, phân tích và trực quan hóa dữ liệu tải lên", href: "https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude" }
    ]
  },
  {
    de: 4, n: 72, total: 119, sub: "5.3", subName: "Viết chỉ dẫn cấp hệ thống",
    answer: "C",
    ask: "You are writing the system-level instructions for a Project that handles recurring writing work. When creating those instructions, which step must be completed first?",
    scene: [
      "Mày đang soạn system-level instructions (chỉ dẫn cấp hệ thống: đặt một lần, áp cho mọi chat trong Project) cho một Project chuyên làm các việc viết lặp lại.",
      "Bốn phương án là bốn bước có thật của cùng một quy trình: xác định mục đích, thử, sửa, giao cho đồng nghiệp.",
      "Chỗ khó: bước nào cũng đúng. Đề chỉ hỏi bước nào phải xong trước tiên."
    ],
    asks: [
      "Khi tạo chỉ dẫn cấp hệ thống, việc nào phải xong đầu tiên?",
      "Tức là: tìm bước mà mọi bước khác đều cần kết quả của nó.",
      "Soi từng phương án: nó có cần một thứ chưa tồn tại (bản nháp, kết quả chạy thử) không? Có thì chưa thể đứng đầu."
    ],
    facts: [
      "Bộ khung bảy phần của chỉ dẫn mở đầu bằng vai (Claude là ai ở đây) và phạm vi (làm gì, không làm gì). Người đọc, định dạng, nguồn, cách xử lý khi không chắc, thứ tự ưu tiên viết sau, dựa trên hai phần đó.",
      "Phạm vi (scope) là ranh giới Claude làm việc gì và không làm việc gì trong Project. Chưa có nó thì không biết câu hỏi nào là “ngoài phạm vi”, lời dặn nào thuộc về instructions.",
      "Thử chỉ dẫn là hỏi một loạt câu thật (câu hay gặp, câu ngoài phạm vi, câu tài liệu không có) rồi so với câu trả lời mong đợi viết sẵn. Sai ở đâu sửa đúng dòng đó, rồi chạy lại cả loạt.",
      "Chỉ giao cho cả nhóm sau khi đã thử và sửa. “Lưu xong giao cho cả nhóm, không thử” là cách làm tệ mà notes nêu tên."
    ],
    opts: [
      { k: "A", gist: "Revise the draft instructions to close the gaps that showed up in the test runs.",
        why: [
          "Bước này cần hai thứ có trước: một bản nháp và kết quả chạy thử (ý 3). Đứng đầu thì chưa có gì để sửa.",
          "Nó là bước gần cuối của quy trình, không phải bước một."
        ] },
      { k: "B", gist: "Test the draft instructions against requests that are typical for the Project.",
        why: [
          "Thử cần một bản nháp để thử, và cần biết câu nào trong phạm vi, câu nào ngoài phạm vi (ý 2, 3). Cả hai đều đến từ bước xác định mục đích.",
          "Dễ bị cuốn vì notes nhấn mạnh phải thử trước khi giao. Nhưng “trước khi giao” không có nghĩa là “trước tiên”."
        ] },
      { k: "C", gist: "Set out what the Project is for and the boundaries the instructions have to stay within.",
        why: [
          "Đúng. Mục đích và ranh giới chính là phần vai và phạm vi, hai phần mở đầu của bộ khung (ý 1, 2).",
          "Mọi bước sau dựa vào nó: viết lời dặn nào, thử bằng câu nào, câu trả lời nào được coi là đúng khi so.",
          "Bỏ qua bước này thì chỉ dẫn dễ thành một dòng chung chung kiểu “chuyên nghiệp, hữu ích”, thử cũng không biết thử cái gì."
        ] },
      { k: "D", gist: "Share the finished instructions with the Project's collaborators.",
        why: [
          "Đây là bước cuối, sau khi đã thử và sửa (ý 4).",
          "Đứng đầu là đưa cho cả nhóm một bộ chỉ dẫn chưa ai biết đúng hay sai. Mọi chat của mọi người trong Project đều chịu ảnh hưởng."
        ] }
    ],
    refs: [
      { label: "Bài 5.3, “Bộ khung bảy phần”: vai và phạm vi đứng đầu, các phần sau dựa vào chúng", href: NOTES + "#l-5-3" },
      { label: "Bài 5.3, mục “Thử bằng câu hỏi thật trước khi giao cho mọi người”: viết, thử, sửa từng dòng, rồi mới giao", href: NOTES + "#l-5-3" }
    ]
  },
  {
    de: 4, n: 73, total: 119, sub: "1.1", subName: "Viết prompt rõ yêu cầu, lý do, nguồn, mẫu",
    answer: "A",
    ask: "A business analyst needs Claude to pull requirements out of the transcript of a recorded stakeholder interview. The recording runs about 90 minutes and moves across several topics. Which approach is most likely to produce structured output that can actually be used?",
    scene: [
      "Một chuyên viên phân tích nghiệp vụ (business analyst) có bản ghi chữ (transcript) của một buổi phỏng vấn stakeholder (người có quyền lợi trong dự án), dài khoảng 90 phút, bàn nhiều chủ đề.",
      "Việc: rút ra các yêu cầu. Đề nhấn cụm “usable structured output” (output có cấu trúc, dùng được ngay).",
      "Chỗ khó: cả bốn phương án đều đưa nguyên transcript. Khác nhau ở chỗ prompt đòi output có hình dạng gì."
    ],
    asks: [
      "Cách nào dễ cho ra output có cấu trúc, dùng được nhất?",
      "Tức là: prompt nào nói rõ output chia thành những phần nào, để người phân tích nhận về là dùng được, không phải xử lý lại.",
      "Soi từng phương án: output có giữ được những phân biệt mà phân tích yêu cầu cần không (bắt buộc hay nên có, đã chốt hay còn hỏi, có mâu thuẫn không)?"
    ],
    facts: [
      "Must-have (bắt buộc phải có) và nice-to-have (có thì tốt) là hai mức ưu tiên của yêu cầu. Open question (câu hỏi còn mở) là chỗ chưa chốt. Conflict (mâu thuẫn) là hai yêu cầu không thể cùng đúng.",
      "Prompt tốt nói rõ định dạng output: nói cái muốn có. Prompt không nói thì Claude dùng định dạng mặc định.",
      "Khi soát yêu cầu, một cách dùng Claude tốt là đưa khung phân loại kèm lời dặn, bảo Claude gắn nhãn từng yêu cầu. Chỗ mơ hồ, mâu thuẫn được chỉ ra để người cùng stakeholder trả lời và chốt.",
      "Tóm tắt bỏ mất con số và chữ gốc, đúng thứ bước sau hay cần. Bước trích nên làm trên tài liệu thật, không làm trên bản tóm tắt."
    ],
    opts: [
      { k: "A", gist: "Give Claude the transcript together with a structured prompt that asks for must-haves, nice-to-haves, open questions and conflicts, each in its own section.",
        why: [
          "Đúng. Prompt nói rõ output gồm bốn phần (ý 2). Bốn phần là một khung phân loại, Claude xếp từng ý trong transcript vào đúng phần (ý 3).",
          "Bốn phần giữ đúng những phân biệt mà phân tích yêu cầu cần (ý 1). Câu hỏi mở và mâu thuẫn hiện ra riêng, để người phân tích đem về hỏi stakeholder."
        ] },
      { k: "B", gist: "Give Claude the transcript and ask for one ranked list of requirements, reasoning that a single list is easier for stakeholders to review than separate sections.",
        why: [
          "Gộp hết vào một danh sách là xóa mất các phân biệt: bắt buộc hay nên có, đã chốt hay còn hỏi (ý 1).",
          "Mâu thuẫn bị chìm. Hai yêu cầu loại trừ nhau có thể nằm ở hạng 3 và hạng 7 mà không ai thấy.",
          "Dễ bị cuốn vì “dễ duyệt” nghe như nghĩ cho người đọc. Nhưng output dễ đọc mà mất thông tin thì không dùng được cho việc phân tích."
        ] },
      { k: "C", gist: "Give Claude the transcript and ask for a summary first, then extract requirements from that summary in a second pass, on the grounds that two passes catch more detail.",
        why: [
          "Sai ở giả định “two passes catch more detail” (hai lượt bắt được nhiều chi tiết hơn). Lượt hai làm trên bản tóm tắt, mà tóm tắt bỏ mất chữ gốc (ý 4).",
          "Yêu cầu nhỏ, câu nói lấp lửng của stakeholder thường là thứ rơi mất đầu tiên khi tóm tắt. Lượt hai không tìm lại được thứ đã không còn.",
          "Dễ bị cuốn vì chia hai bước nghe như chia việc đúng cách. Nhưng chia đúng là bước sau nhận tài liệu thật, không nhận bản tóm tắt."
        ] },
      { k: "D", gist: "Give Claude the transcript and ask for a chronological list of every statement that contains a verb, then have each one classified as a requirement or not.",
        why: [
          "Câu có động từ là gần như mọi câu. Output thành một danh sách dài theo thời gian, đầy câu chào hỏi, câu bàn lề.",
          "Nhãn chỉ có “là yêu cầu / không phải” vẫn thiếu các phân biệt cần dùng (ý 1). Người phân tích phải làm lại gần như từ đầu."
        ] }
    ],
    refs: [
      { label: "Bài 1.1, mục “Định dạng: nói cái muốn có, và để prompt trông giống output”", href: NOTES + "#l-1-1" },
      { label: "Bài 4.1, mục “Dùng Claude soát yêu cầu khi còn là bản nháp”: đưa khung phân loại, Claude gắn nhãn, chỉ chỗ mâu thuẫn; người chốt", href: NOTES + "#l-4-1" },
      { label: "Bài 1.2, mục “Bước sau cần nhận gì”: tóm tắt bỏ mất con số và chữ gốc", href: NOTES + "#l-1-2" }
    ]
  },
  {
    de: 4, n: 74, total: 119, sub: "1.4", subName: "Đổi cách prompt theo loại việc",
    answer: "C",
    ask: "You were handed a vague request to “look at our pricing.” After some discovery it is confirmed that the goal is a structured summary of competitor pricing the team can act on, not new pricing ideas. Which strategy suits the clarified task best?",
    scene: [
      "Yêu cầu ban đầu rất mơ hồ: “look at our pricing” (xem giá của mình đi).",
      "Hỏi lại xong thì mục tiêu đã rõ: một bản tóm tắt có cấu trúc về giá của đối thủ, đủ để nhóm hành động. Đề nói thẳng: không phải nghĩ ra ý tưởng giá mới.",
      "Chỗ khó: bốn phương án là bốn kiểu làm việc với Claude (brainstorm, so sánh, research, trò chuyện mở). Phải khớp kiểu làm với loại việc vừa được làm rõ."
    ],
    asks: [
      "Chiến lược nào hợp nhất với việc đã được làm rõ?",
      "Tức là: việc này thuộc loại nào trong bốn loại (phân tích, research, soạn thảo, brainstorm), và loại đó cần prompt đòi gì?",
      "Soi từng phương án: nó cho ra thông tin về đối thủ mà nhóm tin và dùng được, hay ra ý tưởng, ra một góc hẹp, ra một cuộc trò chuyện chưa thành hình?"
    ],
    facts: [
      "research (tìm hiểu) là loại việc gom thông tin từ nhiều nguồn để trả lời một câu hỏi. Hỏng hay gặp: rộng, chung chung, hoặc dựa vào một nguồn.",
      "Prompt cho research cần phạm vi (bạn là ai, cần để quyết định gì, khung thời gian, khu vực), đòi kiểm chéo nhiều nguồn và ghi nguồn. Câu hỏi có nhiều cách hiểu thì bảo Claude ghi mức tin cậy cho từng kết luận.",
      "Brainstorm (động não) là nghĩ ra thật nhiều ý khác nhau, chưa chấm điểm. Nó hợp khi cần ý mới, không hợp khi cần biết sự thật trên thị trường.",
      "Mỗi loại việc đòi một cách prompt riêng. Dùng sai loại thì output hỏng đúng kiểu của loại đó."
    ],
    opts: [
      { k: "A", gist: "Take a divergent brainstorming approach to generate many possible observations about competitor pricing, then narrow them down to the most likely ones.",
        why: [
          "Sai loại việc. Brainstorm sinh ra ý (ý 3), còn ở đây cần sự thật: đối thủ đang bán giá bao nhiêu.",
          "“Most likely” (khả năng cao nhất) vẫn là đoán, không phải dữ kiện có nguồn. Nhóm hành động trên một con số đoán thì rất đắt.",
          "Dễ bị cuốn vì “thu hẹp về cái khả năng nhất” nghe như có bước lọc. Nhưng lọc từ một đống ý đoán vẫn ra ý đoán."
        ] },
      { k: "B", gist: "Run a comparative analysis that sets the company's pricing against a single named competitor, because a pairwise comparison gives the clearest output.",
        why: [
          "Một đối thủ duy nhất là dựa vào một góc quá hẹp (ý 1). Bản tóm tắt về “competitor pricing” (giá của các đối thủ) phải phủ những đối thủ nhóm cần biết.",
          "Gọn hơn chưa chắc đúng việc hơn. Nhóm hành động dựa trên một đối thủ có thể bỏ sót đúng đối thủ đang hút khách nhất."
        ] },
      { k: "C", gist: "Use a research strategy that collects structured information on competitor pricing, names the sources, and records how confident each finding is.",
        why: [
          "Đúng. Việc đã làm rõ là research: gom thông tin về giá đối thủ (ý 1).",
          "Phương án làm đúng những thứ prompt research cần: có cấu trúc, ghi nguồn, ghi mức tin cậy cho từng kết luận (ý 2).",
          "Nguồn và mức tin cậy cho nhóm biết số nào dựa vào được, số nào cần kiểm thêm. Đó là điều làm bản tóm tắt “actionable” (hành động được)."
        ] },
      { k: "D", gist: "Use an open, conversational strategy that explores competitor pricing over several prompts and lets the structure emerge from the conversation.",
        why: [
          "Mục tiêu đã rõ rồi. Để cấu trúc “tự hình thành” là quay về trạng thái mơ hồ lúc đầu.",
          "Phương án không nói gì về nguồn hay mức tin cậy (ý 2). Kết quả là một chuỗi chat dài, mỗi lượt một mẩu, chưa thành bản tóm tắt dùng được."
        ] }
    ],
    refs: [
      { label: "Bài 1.4, bảng “Bốn loại việc, bốn kiểu hỏng” và mục “research: phạm vi là phần quan trọng nhất”: ghi nguồn, kiểm chéo, ghi mức tin cậy", href: NOTES + "#l-1-4" },
      { label: "Bài 1.4, mục “Brainstorm: đòi độ rộng, chấm ở bước sau”", href: NOTES + "#l-1-4" }
    ]
  },
  {
    de: 4, n: 75, total: 119, sub: "2.4", subName: "Khi nào cần người duyệt",
    answer: "D",
    ask: "As a customer-success manager, you are deciding whether a response Claude generated should be escalated. Which factor raises the output's impact the most and calls for escalation before it is used outside the company?",
    scene: [
      "Mày là quản lý chăm sóc khách hàng (customer-success manager). Có một câu trả lời do Claude soạn, mày phải quyết có cần escalate (chuyển lên người có thẩm quyền, có chuyên môn duyệt) trước khi dùng không.",
      "Bốn phương án tả bốn output. Ba cái dùng nội bộ, chỉ một cái đi ra ngoài.",
      "Chỗ khó: đề hỏi yếu tố làm “impact” (mức ảnh hưởng) tăng nhiều nhất, tức là sai thì thiệt tới đâu."
    ],
    asks: [
      "Yếu tố nào làm output hệ trọng nhất, đáng chuyển lên duyệt trước khi dùng ra ngoài?",
      "Tức là: output nào mang nhiều tín hiệu nâng mức duyệt nhất?",
      "Soi từng phương án theo các tín hiệu: người nhận là ai, có rút lại được không, nội dung có cam kết gì không."
    ],
    facts: [
      "Năm tín hiệu nâng mức duyệt: mức hệ trọng, người nhận, rút lại được không, loại nội dung, lĩnh vực được quản lý.",
      "Người nhận là khách hàng, đối tác, cơ quan quản lý thì duyệt kỹ. Người nhận là chính mình hay nhóm mình thì duyệt nhẹ. Cách nhớ: nháp thoải mái, gửi đi có chọn lọc.",
      "Service-level commitment (cam kết mức dịch vụ) là lời hứa với khách về chất lượng dịch vụ, như thời gian phản hồi. Nó thuộc loại nội dung điều khoản, phải soi kỹ. Lỗi đã tới khách thì không thu hồi được, nên duyệt trước khi gửi.",
      "Việc vượt chuyên môn của mình thì chuyển lên đúng người: pháp chế, người phụ trách mảng đó."
    ],
    opts: [
      { k: "A", gist: "An internal draft summarizing the associate's own notes from a customer call, kept for their personal reference.",
        why: [
          "Người nhận là chính người viết (ý 2). Sai thì tự sửa, không ai bên ngoài thấy.",
          "Dễ bị cuốn vì có chữ “customer” (khách hàng). Nhưng đó là nội dung về cuộc gọi với khách, còn người đọc vẫn chỉ là mình."
        ] },
      { k: "B", gist: "A casual rewording of an internal team status update.",
        why: [
          "Nội bộ, chỉ viết lại cách nói, không thêm sự thật mới (ý 1, 2). Sai thì đồng nghiệp hỏi lại là xong."
        ] },
      { k: "C", gist: "A short internal notice about an upcoming all-hands team meeting.",
        why: [
          "Thông báo nội bộ, rút lại dễ: gửi thêm một tin đính chính (ý 1).",
          "Sai giờ họp thì phiền, nhưng không ai bên ngoài chịu hậu quả."
        ] },
      { k: "D", gist: "An unedited draft going to a paying customer that includes a service-level commitment.",
        why: [
          "Đúng. Nhiều tín hiệu cùng lúc: người nhận là khách trả tiền (ý 2), gửi rồi không rút lại được, và nội dung là một cam kết (ý 3).",
          "“Unchanged” (chưa ai sửa) nghĩa là chưa có ai đọc kỹ. Một lời hứa sai sẽ đi thẳng tới khách và thành thứ công ty phải giữ.",
          "Cam kết dịch vụ là việc của người có thẩm quyền về hợp đồng, dịch vụ, nên đây đúng là ca phải chuyển lên (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, bảng năm tín hiệu nâng mức duyệt và mục “Ai duyệt”: duyệt trước khi gửi, chuyển lên đúng người", href: NOTES + "#l-2-4" },
      { label: "Bài 0.2, định nghĩa “escalate” (chuyển lên)", href: NOTES + "#l-0-2" }
    ]
  },
  {
    de: 4, n: 76, total: 119, sub: "6.3", subName: "Làm việc trong chính sách AI của công ty",
    answer: "B",
    ask: "An HR associate is about to use Claude on a sensitive personnel matter. The company's AI policy states plainly that information about ongoing investigations must not be entered into AI tools. Which response follows the policy most closely?",
    scene: [
      "Một nhân viên nhân sự (HR) sắp dùng Claude cho một vụ việc nhân sự nhạy cảm.",
      "Chính sách AI của công ty viết rõ: thông tin về các cuộc điều tra đang diễn ra không được nhập vào công cụ AI.",
      "Chỗ khó: ba phương án sai đều tìm một lối lách nghe có lý: đợi điều tra xong, dùng chat ẩn danh, viết lại cho bớt chi tiết."
    ],
    asks: [
      "Cách xử lý nào theo sát chính sách nhất?",
      "Tức là: khi chính sách cấm hẳn một loại thông tin, làm gì để vụ việc vẫn được giải quyết mà không vi phạm?",
      "Soi từng phương án: thông tin bị cấm có vào Claude không, dưới bất kỳ hình thức nào?"
    ],
    facts: [
      "Khi chính sách và việc cần làm va nhau: dừng phần vi phạm, nói rõ ràng buộc và tìm cách làm hợp lệ, chuyển lên đúng kênh nếu cần ngoại lệ, ghi lại quyết định.",
      "Hai kiểu sai đối xứng: lách để làm cho xong, và bỏ hẳn việc khi vẫn có đường hợp lệ. Chỗ chính sách không nhắc tới là chưa được duyệt, phải hỏi, không phải được phép.",
      "Chat ẩn danh (incognito) không vào lịch sử, không vào memory, không dùng để train. Nhưng nó vẫn được giữ 30 ngày, và trên Team, Enterprise vẫn có trong bản xuất dữ liệu và Compliance API. Ẩn danh không phải cách lách chính sách dữ liệu.",
      "Bỏ tên chỉ giải quyết được khi chính sách cấm dữ liệu định danh. Bỏ tên mà giữ chi tiết đặc thù (chức danh hiếm, chi nhánh, thời điểm) vẫn lần ra được người."
    ],
    opts: [
      { k: "A", gist: "Enter the investigation details into Claude only after the investigation has closed, since the policy applies during the investigation period.",
        why: [
          "Không giúp gì cho việc trước mắt: vụ việc cần xử lý bây giờ, khi điều tra còn đang chạy.",
          "Còn tự diễn giải chính sách. Chính sách nói về “ongoing investigations” (điều tra đang diễn ra), không nói điều tra xong thì được nhập. Chỗ không nhắc tới là phải hỏi, không phải được phép (ý 2)."
        ] },
      { k: "B", gist: "Keep the investigation details out of Claude and ask HR leadership for an approved alternative way to handle the matter.",
        why: [
          "Đúng thứ tự notes nêu: dừng phần vi phạm, rồi tìm cách làm hợp lệ qua đúng kênh (ý 1).",
          "Không bỏ việc (ý 2): vụ việc vẫn được xử lý, theo cách lãnh đạo HR đã duyệt. Đó là người có thẩm quyền với vụ việc và biết công cụ, quy trình nào được dùng cho loại việc này."
        ] },
      { k: "C", gist: "Enter the investigation details in an Incognito chat, since Incognito chats are not retained and so fall outside the policy's intent.",
        why: [
          "Sai ở giả định: chat ẩn danh vẫn được giữ 30 ngày, và trên gói doanh nghiệp vẫn có trong bản xuất dữ liệu (ý 3).",
          "Mà kể cả không lưu gì, chính sách cấm việc nhập thông tin vào công cụ AI. Chat ẩn danh vẫn là nhập vào Claude.",
          "Dễ bị cuốn vì “không lưu lịch sử” nghe như không để lại dấu. Nhưng chính sách cấm hành động nhập, không chỉ cấm việc lưu."
        ] },
      { k: "D", gist: "Enter a paraphrased version of the investigation details with identifying information removed, since paraphrasing honours the spirit of the policy.",
        why: [
          "Sai ở chỗ tự đổi luật: chính sách cấm thông tin về cuộc điều tra, không chỉ cấm tên người. Bỏ tên rồi thì nội dung điều tra vẫn được nhập vào.",
          "Ẩn danh ở đây cũng dễ nửa vời. Trong một công ty, chức danh, phòng ban, thời điểm là đủ đoán ra ai đang bị điều tra (ý 4).",
          "Dễ bị cuốn vì giống câu mẫu 3 của guide, nơi ẩn danh trước khi tải lên là đáp án đúng. Nhưng ở câu đó chính sách cấm dữ liệu cá nhân, nên bỏ dữ liệu cá nhân là đủ. Ở đây cái bị cấm là cả một loại thông tin."
        ] }
    ],
    refs: [
      { label: "Bài 6.3, mục “Khi chính sách và yêu cầu va nhau”: dừng phần vi phạm, tìm cách hợp lệ, chuyển lên đúng kênh", href: NOTES + "#l-6-3" },
      { label: "Bài 6.2, mục “Dùng đúng tài khoản và đúng cài đặt”: incognito vẫn giữ 30 ngày, không phải “không để lại dấu”", href: NOTES + "#l-6-2" },
      { label: "Bài 6.2, mục “Ba cách bớt dữ liệu mà việc vẫn xong” và ghi chú ẩn danh nửa vời; câu mẫu 3 của guide", href: NOTES + "#l-6-2" }
    ]
  },
  {
    de: 4, n: 77, total: 119, sub: "1.3", subName: "Lặp prompt: chẩn đoán, đổi một chỗ, thử lại",
    answer: "A",
    ask: "A knowledge worker is refining a prompt whose response was only partly acceptable. Which refinement practice gives the strongest learning from one iteration to the next?",
    scene: [
      "Một nhân viên văn phòng (knowledge worker) đang sửa một prompt. Output hiện tại dùng được một phần.",
      "Đề không hỏi cách nào nhanh nhất, mà hỏi cách nào cho “the strongest learning across iterations” (rút ra bài học chắc nhất qua các vòng sửa).",
      "Chỗ khó: học được nghĩa là biết thay đổi nào gây ra kết quả nào. Bốn phương án khác nhau ở số thứ đổi trong một vòng."
    ],
    asks: [
      "Cách sửa nào giúp rút ra bài học chắc nhất qua các vòng?",
      "Tức là: cách nào cho mày biết chắc chính thay đổi nào làm output tốt lên hay tệ đi?",
      "Soi từng phương án: sau một vòng, có tách được tác dụng của từng thay đổi không?"
    ],
    facts: [
      "Lặp prompt (iterate) là vòng chẩn đoán → đổi một chỗ → thử lại → giữ cái có tác dụng. Đổi nhiều thứ một lúc thì output tốt lên hay tệ đi cũng không biết vì đâu.",
      "So có và không có thay đổi trên cùng vài đầu vào. Giữ cái có tác dụng, bỏ cái thử rồi không thấy khác, vì mỗi dòng thêm vào đều tốn context và hạn mức.",
      "Tiêu chí đặt trước khi sửa. Không có tiêu chí thì chỉ biết output “khác đi”, không biết nó “tốt hơn” chưa.",
      "Bắt đầu lại bằng chat mới chỉ hợp khi đã sửa nhiều vòng mà output vẫn mang lỗi của hướng ban đầu, hoặc mục tiêu đổi hẳn. Khi đó prompt mới gom mọi điều chỉnh đã học, không vứt chúng đi."
    ],
    opts: [
      { k: "A", gist: "Change one identifiable element per round, record the change and its effect, and adjust a different element only once the first is settled.",
        why: [
          "Đúng. Mỗi vòng một thay đổi thì output khác đi là biết ngay vì đâu (ý 1).",
          "Ghi lại thay đổi và tác dụng là giữ bài học: cái có tác dụng giữ, cái không thì bỏ (ý 2). Đó chính là “learning” (học được) mà đề hỏi.",
          "Chốt xong một chỗ mới sang chỗ khác, nên mỗi vòng so được với tiêu chí trên một nền đã ổn định (ý 3)."
        ] },
      { k: "B", gist: "Start from a brand-new prompt each round so earlier wording cannot bias the next attempt, and pick the strongest response at the end.",
        why: [
          "Mỗi vòng vứt hết những gì vừa học. Bản tốt nhất ở cuối là bản may, không ai biết vì sao nó tốt.",
          "Bắt đầu lại có lúc đúng, nhưng là để gom mọi điều chỉnh đã học vào một prompt mới (ý 4), không phải làm lại từ trang trắng mỗi vòng."
        ] },
      { k: "C", gist: "Bundle several related changes into one round when they target the same weakness, and undo the whole bundle if the combined result is worse.",
        why: [
          "Cùng nhắm một chỗ yếu vẫn là nhiều thay đổi một lúc. Output tốt lên thì không biết thay đổi nào có tác dụng, những cái vô ích vẫn nằm lại tốn context (ý 1, 2).",
          "Output tệ đi thì hoàn tác cả gói, có khi vứt luôn một thay đổi tốt bị cái khác che mất.",
          "Dễ bị cuốn vì gom theo một chỗ yếu nghe có chẩn đoán, có kỷ luật. Nhưng chẩn đoán đúng rồi vẫn phải đổi từng thứ một mới biết thứ nào trúng."
        ] },
      { k: "D", gist: "Fix every weakness the response showed in a single revision, then compare the revised output with the previous version.",
        why: [
          "Đổi mọi thứ trong một vòng là cách có nhiều biến số nhất (ý 1). So bản cũ với bản mới chỉ cho biết tổng thể khác đi, không cho biết từng sửa đổi có ích không.",
          "Một sửa đổi tốt và một sửa đổi làm hỏng có thể triệt tiêu nhau mà không ai thấy."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Mỗi vòng đổi một chỗ” và bảng “Dừng, bắt đầu lại, hay lưu”", href: NOTES + "#l-1-3" },
      { label: "Bài 7.1, mục “Vì sao chỉ đổi một thứ, và chạy lại cùng input”", href: NOTES + "#l-7-1" }
    ]
  },
  {
    de: 4, n: 78, total: 119, sub: "6.2", subName: "Dữ liệu nhạy cảm và quy định",
    answer: "BD",
    ask: "You are reviewing Connector set-ups that colleagues have proposed for various tasks. Which two Connector set-ups are safe and appropriate uses? (Choose two.)",
    scene: [
      "Đồng nghiệp đề xuất năm cách nối connector (kết nối Claude với một ứng dụng khác) cho các việc khác nhau. Mày phải chọn hai cách an toàn và phù hợp.",
      "Chỗ khó: phương án nào cũng gắn với một việc nghe hợp lý (xếp lịch, nộp chi phí). Phải so cái connector mở ra với cái việc đó thật sự cần.",
      "Ba phương án sai hoặc nối vào chỗ chứa dữ liệu nhạy cảm, hoặc cho Claude làm hành động khó gỡ."
    ],
    asks: [
      "Hai cách nối connector nào an toàn và phù hợp?",
      "Tức là: connector nào chỉ mở đúng phần dữ liệu và đúng quyền mà việc cần, không hơn?",
      "Soi từng phương án: hệ thống nối vào chứa loại dữ liệu gì, đã được duyệt chưa, Claude được đọc hay được ghi?"
    ],
    facts: [
      "Connector cho Claude tìm, đọc và làm việc trong một ứng dụng khác, theo quyền của tài khoản đã kết nối: tài khoản mở được gì, Claude mở được nấy. Owner đặt quyền từng công cụ (Always allow, Needs approval, Blocked), chỉ để thu hẹp.",
      "Data minimization (tối thiểu hóa dữ liệu): chỉ đưa cho Claude phần dữ liệu mà việc thật sự cần. Với connector, nối vào cả một hệ thống là mở cả hệ thống đó.",
      "Hồ sơ nhân sự và bảng lương là dữ liệu nhạy cảm: dữ liệu cá nhân, tài chính, ảnh hưởng tới sinh kế của người đó. Tài khoản cá nhân thì nằm ngoài cài đặt và nhật ký của công ty.",
      "Hành động trên hệ thống tài chính thuộc loại tốn kém hoặc khó gỡ. Read-only (chỉ đọc) là Claude chỉ tìm và đọc, không ghi, không gửi gì vào hệ thống."
    ],
    opts: [
      { k: "A", gist: "A Connector into the personnel-records system so team leads can get help with scheduling.",
        why: [
          "Xếp lịch chỉ cần biết ai rảnh lúc nào. Hồ sơ nhân sự chứa đánh giá, kỷ luật, thông tin cá nhân, vượt xa nhu cầu đó (ý 2, 3).",
          "Nối vào là Claude đọc được mọi hồ sơ mà tài khoản trưởng nhóm thấy (ý 1).",
          "Dễ bị cuốn vì việc xếp lịch nghe vô hại. Nhưng độ nhạy nằm ở hệ thống được mở, không nằm ở việc người ta định làm."
        ] },
      { k: "B", gist: "A Connector into the team's project-management workspace, within an approved scope.",
        why: [
          "Đúng. Dữ liệu là việc của chính nhóm, khớp với việc cần làm (ý 2).",
          "“Under approved scope” (trong phạm vi đã được duyệt): đã có người có thẩm quyền xét và khoanh vùng, Claude không thấy gì ngoài vùng đó (ý 1)."
        ] },
      { k: "C", gist: "A Connector into a personal cloud-storage account where team members keep work drafts alongside personal files.",
        why: [
          "Tài khoản cá nhân nằm ngoài cài đặt và nhật ký của công ty (ý 3). Dữ liệu công việc đi qua đó thì công ty không kiểm soát được.",
          "File cá nhân nằm lẫn trong đó cũng bị mở cho Claude, dù việc không cần tới (ý 1, 2)."
        ] },
      { k: "D", gist: "A read-only Connector into the public knowledge base, used for reference content.",
        why: [
          "Đúng. Nội dung đã công khai, không có gì nhạy cảm để lộ (ý 3).",
          "Chỉ đọc là đủ cho việc tra cứu, không mở quyền ghi khi không cần (ý 4). Đúng tinh thần quyền tối thiểu."
        ] },
      { k: "E", gist: "A Connector into the payroll system so team members can submit expense reports there directly.",
        why: [
          "Bảng lương là dữ liệu tài chính, thuộc loại nhạy cảm nhất (ý 3). Connector này còn cho Claude ghi vào hệ thống, là loại hành động khó gỡ (ý 4).",
          "Nộp chi phí không cần mở cả hệ thống lương cho Claude (ý 2).",
          "Dễ bị cuốn vì nộp chi phí là việc thường ngày. Nhưng cái phải xét là quyền connector mở ra, không phải việc nhỏ hay lớn."
        ] }
    ],
    refs: [
      { label: "Bài 6.2, định nghĩa data minimization và mục “Kiểm trước khi gửi”: dữ liệu thuộc nhóm nào, việc có cần không", href: NOTES + "#l-6-2" },
      { label: "Bài 5.2, mục “Ai bật, ai được thấy: bốn lớp quyền”: Claude thấy theo quyền tài khoản, quyền từng công cụ chỉ để thu hẹp", href: NOTES + "#l-5-2" },
      { label: "Bài Nền tảng D6, mục 3 “Dữ liệu nào là nhạy cảm”: nhân sự, tài chính", href: NOTES + "#l-6-0" }
    ]
  },
  {
    de: 4, n: 79, total: 119, sub: "1.1", subName: "Viết prompt rõ yêu cầu, lý do, nguồn, mẫu",
    answer: "D",
    ask: "A communications manager is writing a prompt for Claude to draft a quarterly newsletter for store managers in three regions. The agreed key messages, the regional information, and an earlier newsletter the team liked are all on hand. Which prompt strategy is most likely to produce a usable first draft?",
    scene: [
      "Một quản lý truyền thông cần Claude soạn bản tin quý cho quản lý cửa hàng ở ba khu vực.",
      "Có sẵn ba thứ: các thông điệp chính đã thống nhất, thông tin của từng khu vực, và một bản tin cũ cả nhóm thích.",
      "Chỗ khó: bốn phương án dùng ba thứ đó theo bốn cách. Phải xem prompt nào nói đủ những gì người viết biết, và giao cho bản tin cũ đúng vai."
    ],
    asks: [
      "Cách viết prompt nào dễ cho ra bản nháp đầu dùng được nhất?",
      "Tức là: prompt nào nói rõ người đọc, phạm vi, độ dài, giọng, nội dung bắt buộc, mà không để bản tin cũ lấn vào nội dung mới?"
    ],
    facts: [
      "Prompt yếu thường vì những gì người viết biết không được viết ra. Trước khi gửi, soát năm thứ: việc và độ sâu, người đọc và mục tiêu, định dạng, ràng buộc (độ dài, phạm vi), nguồn.",
      "Một ví dụ cho thấy giọng, độ dài, cấu trúc nhanh hơn ba đoạn mô tả. Nhưng Claude bám rất sát chi tiết của ví dụ.",
      "Vì vậy bọc ví dụ riêng để Claude không nhầm nó với lời dặn, và nói rõ nó là mẫu cho điều gì. Bản tin quý trước mang nội dung của quý trước.",
      "Soạn thảo cần dữ kiện thật chỉ người viết có (thông điệp, thông tin từng nơi) và giới hạn vào dữ kiện đó. Để trống thì Claude điền bằng mặc định chung chung."
    ],
    opts: [
      { k: "A", gist: "Attach the earlier newsletter and ask Claude to match its tone and structure while working in the new key messages for the three named regions.",
        why: [
          "Gần đủ, nhưng thiếu người đọc và độ dài (ý 1). Thông tin riêng của từng khu vực cũng không được đưa vào, chỉ có tên khu vực (ý 4).",
          "Bắt theo cả cấu trúc bản cũ thì nội dung mới phải nhét vào khuôn của quý trước, dù quý này có thể cần khác (ý 2).",
          "Dễ bị cuốn vì nghe dùng đủ cả mẫu lẫn thông điệp. Nhưng D làm được mọi thứ A làm, cộng thêm phần A bỏ trống."
        ] },
      { k: "B", gist: "Attach the earlier newsletter and the agreed key messages, and ask Claude for a similar newsletter for this quarter.",
        why: [
          "“Similar” (tương tự) là để Claude tự đoán giống ở chỗ nào. Claude bám sát chi tiết của ví dụ (ý 2), nên dễ lặp lại cả nội dung của quý trước (ý 3).",
          "Không nói người đọc, không nói ba khu vực, không đưa thông tin khu vực (ý 1, 4)."
        ] },
      { k: "C", gist: "Provide the agreed key messages and the three regions, and let Claude choose a suitable length and tone for store managers.",
        why: [
          "Không dùng bản tin cũ, thứ cho thấy giọng nhanh nhất (ý 2).",
          "Giao cho Claude chọn độ dài và giọng là để trống đúng những thứ người viết đã biết (ý 1, 4). Output ra giọng chung chung, phải sửa nhiều vòng."
        ] },
      { k: "D", gist: "Name the audience, the three regions, the length, the tone and the agreed key messages, and point to the earlier newsletter only as an example of tone.",
        why: [
          "Đúng. Prompt nói đủ người đọc, phạm vi, độ dài, giọng và nội dung bắt buộc (ý 1, 4).",
          "Bản tin cũ được giao đúng một vai: mẫu giọng (ý 2, 3). Claude học cách nói của nó mà không chép lại nội dung quý trước."
        ] }
    ],
    refs: [
      { label: "Bài 1.1, mục “Viết ra những gì đang nằm trong đầu bạn”: soát việc, người đọc, định dạng, ràng buộc, nguồn", href: NOTES + "#l-1-1" },
      { label: "Bài 1.1, mục “Đưa một ví dụ thay cho đoạn tả dài”: Claude bám sát chi tiết của ví dụ, bọc ví dụ riêng", href: NOTES + "#l-1-1" },
      { label: "Bài 1.4, mục “Soạn thảo: đưa mẫu giọng và dữ kiện thật”", href: NOTES + "#l-1-4" }
    ]
  },
  {
    de: 4, n: 80, total: 119, sub: "6.4", subName: "Đạo đức khi dùng AI",
    answer: "AE",
    ask: "As an HR specialist, you are sorting the possible ethical risks in a workflow that Claude supports. Which two risks raise the greatest ethical concern in an HR-related workflow? (Choose two.)",
    scene: [
      "Mày là chuyên viên nhân sự, đang phân loại các rủi ro đạo đức trong một quy trình có Claude hỗ trợ.",
      "Năm phương án trộn hai loại: rủi ro gây hại cho con người, và lỗi hình thức (gõ sai, giọng không đều, kiểu dấu gạch).",
      "Chỗ khó: lỗi hình thức có thật và đáng sửa, nhưng đề hỏi rủi ro “ethical” (về đạo đức) lớn nhất."
    ],
    asks: [
      "Hai rủi ro nào đáng lo nhất về đạo đức trong quy trình gắn với nhân sự?",
      "Tức là: rủi ro nào có thể gây hại thật cho một người hay một nhóm người, hoặc để quyết định hệ trọng không ai chịu trách nhiệm?"
    ],
    facts: [
      "Accountability (trách nhiệm giải trình): người dùng output là người chịu trách nhiệm về nó, giải thích được và gánh hậu quả khi sai. “Claude viết” không chuyển trách nhiệm sang công cụ.",
      "Việc làm nằm trong danh sách lĩnh vực rủi ro cao của Usage Policy. Quyết định về một người cụ thể trong lĩnh vực này cần người có chuyên môn duyệt trước, có quyền sửa và chịu trách nhiệm.",
      "Bias (thiên lệch): output lần nào cũng nghiêng về phía một nhóm người. Fairness (công bằng): người ở hoàn cảnh như nhau được đối xử như nhau. Protected group (nhóm được luật bảo vệ) là nhóm xác định theo đặc điểm như giới tính, tuổi, dân tộc, tôn giáo.",
      "Lỗi hình thức (gõ sai, giọng không đều, kiểu dấu) sửa được và không lấy mất quyền lợi của ai. Đó là chuyện chất lượng, không phải chuyện đạo đức."
    ],
    opts: [
      { k: "A", gist: "Decisions that significantly affect someone's employment being made with no human accountable for them.",
        why: [
          "Đúng. Việc làm là lĩnh vực rủi ro cao (ý 2), sai là ảnh hưởng thẳng tới sinh kế của một người.",
          "Không có người chịu trách nhiệm (ý 1) nghĩa là không ai duyệt trước, không ai giải thích được, không ai sửa khi sai. Người bị thiệt không biết hỏi ai."
        ] },
      { k: "B", gist: "A clerical typo in a routine internal calendar invitation.",
        why: [
          "Lỗi hình thức, sửa bằng một lời mời mới (ý 4). Không ai mất quyền lợi gì."
        ] },
      { k: "C", gist: "Inconsistent tone and formatting across internal HR messages sent to employees.",
        why: [
          "Đây là chuyện chất lượng truyền thông, chỉnh bằng mẫu giọng hay chỉ dẫn chung (ý 4).",
          "Dễ bị cuốn vì có chữ HR và người nhận là nhân viên. Nhưng giọng không đều không đối xử bất công với ai, khác hẳn output nghiêng về một nhóm (ý 3)."
        ] },
      { k: "D", gist: "Inconsistent use of the company's preferred dash style across documents.",
        why: [
          "Lỗi trình bày thuần túy (ý 4). Không có ai bị hại."
        ] },
      { k: "E", gist: "Outputs that systematically disadvantage members of a protected group.",
        why: [
          "Đúng. Đây là bias theo đúng định nghĩa: lần nào cũng nghiêng, và nghiêng về phía làm thiệt một nhóm được luật bảo vệ (ý 3).",
          "“Systematically” (một cách có hệ thống) nghĩa là không phải lỗi lẻ: mỗi lần chạy lại là thêm một lần gây hại cho cả nhóm.",
          "A và E bổ sung nhau. A là thiếu người chịu trách nhiệm cho từng quyết định, E là thiệt hại lặp lại cho cả một nhóm người."
        ] }
    ],
    refs: [
      { label: "Bài 6.4, mục “Bạn gửi thì bạn chịu” và “Bias và công bằng”", href: NOTES + "#l-6-4" },
      { label: "Bài 6.1, mục “Vùng vàng: Claude gợi ý, người có chuyên môn quyết”: việc làm là lĩnh vực rủi ro cao", href: NOTES + "#l-6-1" }
    ]
  },
  {
    de: 4, n: 81, total: 119, sub: "2.6", subName: "Chọn định dạng output",
    answer: "D",
    ask: "As an operations assistant, you want Claude to summarize 200 weekly metric records that cover several regions. Which output format will present this data most clearly?",
    scene: [
      "Mày là trợ lý vận hành. Có 200 bản ghi số liệu theo tuần (weekly metric records), trải trên nhiều khu vực.",
      "Mày nhờ Claude tổng hợp và phải chọn định dạng cho output.",
      "Chỗ khó: ba phương án là chữ (gạch đầu dòng, đoạn văn, mỗi vùng một bản tóm tắt), chỉ một phương án là bảng. 200 bản ghi có cùng một bộ chỉ số, nên người đọc cần so được ngang hàng."
    ],
    asks: [
      "Định dạng nào trình bày dữ liệu này rõ nhất?",
      "Tức là: nhiều bản ghi, cùng bộ chỉ số, nhiều vùng, thì khuôn nào cho người đọc dò, so, lọc nhanh nhất.",
      "Soi từng phương án: các bản ghi có theo cùng một khuôn không, chỉ số có nằm cùng một chỗ ở mọi bản ghi không."
    ],
    facts: [
      "Chọn định dạng bằng hai câu hỏi: ai nhận output này, và họ sẽ làm gì với nó tiếp theo.",
      "Nhiều mục so theo cùng các thuộc tính thì dùng bảng: nhìn ngang là so được ngay.",
      "Đoạn văn hợp với lập luận, giải thích nguyên nhân, vì mối nối “vì… nên…” mang ý. Gạch đầu dòng hợp với các mục rời nhau.",
      "Dữ liệu dạng bảng: mỗi dòng một bản ghi, cột giữ như nhau ở mọi dòng. Đúng khuôn chưa phải đúng nội dung: vẫn đếm dòng và kiểm ngẫu nhiên vài dòng với nguồn."
    ],
    opts: [
      { k: "A", gist: "A bulleted list of observations grouped by region, where the metrics reported change from one entry to the next.",
        why: [
          "Sai ở “without consistent metrics across entries” (chỉ số không đồng nhất giữa các mục). Mục này nêu doanh số, mục kia nêu tỉ lệ trả hàng, nên không so được hai vùng với nhau (ý 2).",
          "Gạch đầu dòng hợp với các mục rời nhau (ý 3). 200 bản ghi cùng một bộ chỉ số không phải các mục rời."
        ] },
      { k: "B", gist: "A narrative summary arranged by region that describes trends and notable records in prose.",
        why: [
          "Văn xuôi hợp với lập luận, không hợp với 200 bản ghi số liệu (ý 3). Muốn tìm một con số, người đọc phải đọc hết cả đoạn.",
          "Chỉ kể “notable records” (bản ghi đáng chú ý) là chọn thay người đọc. Các bản ghi còn lại không hiện ra, nên không ai so được.",
          "Dễ bị cuốn vì “summarize” (tổng hợp) nghe như phải viết thành đoạn tóm tắt. Nhưng đề hỏi định dạng trình bày dữ liệu rõ nhất, không hỏi một bài bình luận."
        ] },
      { k: "C", gist: "A set of narrative briefs, one per region, each describing that region's weekly performance in paragraphs.",
        why: [
          "Có chia theo vùng nhưng vẫn là đoạn văn (ý 3). Muốn so một tuần của vùng này với vùng kia, người đọc phải lật hai bản và tự dò con số.",
          "Càng nhiều vùng thì càng nhiều bản, càng khó so ngang (ý 2)."
        ] },
      { k: "D", gist: "A structured table with one record in each row and one metric in each column, sorted by region.",
        why: [
          "Đúng ca “nhiều mục so theo cùng thuộc tính” (ý 2): mỗi dòng một bản ghi, mỗi cột một chỉ số, xếp theo vùng. Nhìn ngang là so được, nhìn dọc là thấy xu hướng.",
          "Khuôn cố định cũng dễ đưa sang bảng tính để lọc, sắp, tính tiếp (ý 1).",
          "Bảng gọn chưa có nghĩa là số đúng: đếm đủ 200 dòng và kiểm vài dòng với dữ liệu gốc (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 2.6, bảng “Văn xuôi, danh sách hay bảng cho người đọc”: nhiều mục so theo cùng thuộc tính thì dùng bảng; mục “Đúng khuôn chưa phải đúng nội dung”: đếm dòng, kiểm với nguồn", href: NOTES + "#l-2-6" }
    ]
  },
  {
    de: 4, n: 82, total: 119, sub: "2.1", subName: "Đúng và đủ: kiểm chỗ dễ sai trước",
    answer: "D",
    ask: "An analyst is reviewing a Claude response that should have answered three required questions. It answers two and leaves the third out. Which part of the prompt most likely needs strengthening?",
    scene: [
      "Một chuyên viên phân tích đọc lại câu trả lời của Claude. Prompt có ba câu hỏi bắt buộc. Claude trả lời hai câu, bỏ hẳn câu thứ ba.",
      "Bốn phương án là bốn phần của prompt có thể sửa: bối cảnh, định dạng output, vai, và task statement (câu nêu việc phải làm).",
      "Chỗ khó: sửa phần nào cũng “làm prompt tốt hơn”. Phải chọn phần đi thẳng vào triệu chứng thiếu một câu."
    ],
    asks: [
      "Phần nào của prompt nhiều khả năng cần làm chặt hơn?",
      "Tức là: từ triệu chứng (thiếu một câu bắt buộc), tìm phần prompt gây ra, và cách sửa trả về đủ ba câu.",
      "Soi từng phương án: sửa xong, prompt đã nói rõ có ba câu và câu nào cũng phải trả lời chưa?"
    ],
    facts: [
      "Độ đủ (completeness): output có làm hết những gì yêu cầu đòi không. Đo bằng yêu cầu, không đo bằng chủ đề.",
      "Task statement là phần prompt nói Claude phải làm gì. Có mấy câu hỏi, câu nào bắt buộc, là chuyện của phần này.",
      "Docs về prompt của Anthropic: “Provide instructions as sequential steps using numbered lists or bullet points when the order or completeness of steps matters” (dùng danh sách đánh số hoặc gạch đầu dòng khi thứ tự hay độ đủ quan trọng). Phát hiện “một câu không được trả lời” đổi thành yêu cầu: “Trả lời từng câu thành một mục đánh số, kể cả câu 3.”",
      "Vai chỉnh giọng và góc nhìn, không chứa yêu cầu cụ thể nào. Bối cảnh giúp trả lời sâu hơn, không quyết trả lời mấy câu."
    ],
    opts: [
      { k: "A", gist: "Expand the context Claude receives with more background detail on the subject.",
        why: [
          "Sai ở chẩn đoán: thêm nền về chủ đề giúp trả lời sâu hơn, không nói Claude phải trả lời mấy câu (ý 4).",
          "Ba câu hỏi vẫn nằm như cũ trong prompt. Lần sau câu thứ ba vẫn có thể rơi."
        ] },
      { k: "B", gist: "Loosen the output format so that Claude picks the structure for each question's answer itself.",
        why: [
          "Đi ngược hướng cần sửa: lỗi là thiếu ràng buộc về độ đủ, mà phương án này còn bỏ thêm một ràng buộc (ý 3).",
          "Không có khung mỗi câu một mục thì người kiểm càng khó thấy câu nào chưa được trả lời."
        ] },
      { k: "C", gist: "Replace Claude's role with a more specialized expert persona so the answers go deeper.",
        why: [
          "Sai ở giả định: vai đổi giọng và độ sâu, không đổi số câu được trả lời (ý 4). Một chuyên gia vẫn có thể bỏ câu thứ ba.",
          "Dễ bị cuốn vì “chuyên gia” nghe như sẽ làm kỹ hơn. Nhưng lỗi ở đây là thiếu, không phải nông."
        ] },
      { k: "D", gist: "Have the task statement list all three required questions explicitly and require an answer to each one.",
        why: [
          "Đúng chỗ hỏng: độ đủ đo bằng yêu cầu (ý 1), và yêu cầu nằm ở task statement (ý 2). Liệt kê rõ ba câu, dặn trả lời từng câu, thì Claude biết cả ba đều bắt buộc.",
          "Đây đúng là cách đổi phát hiện thành yêu cầu cụ thể (ý 3). Output chia mục theo câu cũng giúp người kiểm thấy ngay câu nào còn trống."
        ] }
    ],
    refs: [
      { label: "Bài 2.1, mục “Đo độ đủ bằng một danh sách viết trước” và bảng “Biến điều vừa thấy thành prompt tốt hơn”: câu không được trả lời thì đòi mỗi câu một mục đánh số", href: NOTES + "#l-2-1" },
      { label: "Bài 7.1, bảng “Từ triệu chứng tới nguyên nhân”: tìm phần prompt gây ra triệu chứng", href: NOTES + "#l-7-1" },
      { label: "Docs, Prompting best practices: dùng danh sách đánh số khi thứ tự hay độ đủ quan trọng", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
    ]
  },
  {
    de: 4, n: 83, total: 119, sub: "6.4", subName: "Đạo đức khi dùng AI",
    answer: "A",
    ask: "An HR team member is checking a set of interview questions that Claude generated for one role. Every candidate will be asked the same questions, in the same order. Which review practice does the most to promote fairness?",
    scene: [
      "Một nhân viên nhân sự rà bộ câu hỏi phỏng vấn do Claude soạn cho một vị trí.",
      "Bộ câu hỏi dùng cho mọi ứng viên, hỏi theo cùng một thứ tự.",
      "Chỗ khó: bốn phương án đều là “rà”, nhưng rà bốn thứ khác nhau: nội dung có công bằng không, độ dài và giọng, câu hỏi riêng theo từng hồ sơ, hay thứ tự câu hỏi."
    ],
    asks: [
      "Cách rà nào giúp công bằng nhất?",
      "Tức là: rà cái gì thì mọi ứng viên được đối xử như nhau, và được hỏi đúng về thứ công việc cần.",
      "Soi từng phương án: nó có soi được bias trong nội dung câu hỏi không, hay chỉ chạm hình thức, hoặc phá luôn cái khung chung?"
    ],
    facts: [
      "Fairness (công bằng): người ở hoàn cảnh như nhau được đối xử như nhau. Bias (thiên lệch): output lần nào cũng nghiêng về một nhóm người, theo khuôn mẫu, hoặc thiếu góc nhìn.",
      "Model học từ dữ liệu của con người nên có thể lặp lại khuôn mẫu, ví dụ mặc định ứng viên là nam, trẻ, không có con nhỏ. Kiểm từng câu không bắt được bias, vì từng câu có thể đều đúng.",
      "Tài liệu tuyển dụng dẫn tới quyết định về con người. Cách sửa bias ở đây: viết lại theo tiêu chí gắn với công việc, áp như nhau cho mọi ứng viên.",
      "Output Claude soạn không mặc định là đúng hay công bằng. Output mày dùng là của mày, nên phải kiểm nội dung, không chỉ câu chữ."
    ],
    opts: [
      { k: "A", gist: "Check that the questions apply equally to every candidate, assume nothing about candidates' backgrounds, and stay on what the role really requires.",
        why: [
          "Rà đúng ba thứ làm nên công bằng: áp như nhau cho mọi người (ý 1), không mặc định gì về xuất thân của ứng viên (ý 2), chỉ hỏi về yêu cầu thật của công việc (ý 3).",
          "Nó soi nội dung câu hỏi, chỗ bias nằm, và giữ nguyên cái khung chung mà đề đặt: cùng câu hỏi, cùng thứ tự cho mọi người."
        ] },
      { k: "B", gist: "Check only the length and tone, since Claude's drafted questions already match the role's requirements and need only stylistic edits.",
        why: [
          "Sai ở giả định “well-aligned to role requirements by default” (mặc định đã khớp yêu cầu vị trí). Không có gì bảo đảm điều đó (ý 4), và bias có thể nằm trong những câu trông rất hợp lý (ý 2).",
          "Chỉ sửa độ dài và giọng thì một câu hỏi ngầm mặc định về hoàn cảnh gia đình vẫn đi nguyên vào buổi phỏng vấn."
        ] },
      { k: "C", gist: "Add follow-up questions tailored to each candidate's resume so every interview can explore that person's specific experience.",
        why: [
          "Phá đúng cái khung làm nên công bằng: mỗi người nhận một bộ câu hỏi khác, nên không còn so các ứng viên trên cùng một thước (ý 1, 3).",
          "Câu hỏi riêng theo hồ sơ cũng mở đường cho câu hỏi dựa vào xuất thân của từng người, đúng chỗ bias hay lọt vào (ý 2).",
          "Dễ bị cuốn vì đào sâu kinh nghiệm từng người nghe như phỏng vấn kỹ hơn. Nhưng đề hỏi cách rà để công bằng, không hỏi cách làm buổi phỏng vấn sâu hơn."
        ] },
      { k: "D", gist: "Rotate the question order between candidates so nobody is always given the hardest questions first.",
        why: [
          "Đổi thứ tự không chạm vào nội dung câu hỏi. Câu nào thiên lệch thì vẫn thiên lệch, đặt ở vị trí nào cũng vậy (ý 2).",
          "Nó còn đi ngược thiết kế của đề: mọi ứng viên nghe cùng câu hỏi, cùng thứ tự. Đổi thứ tự là thêm một chỗ khác nhau giữa các ứng viên (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 6.4, mục “Bias và công bằng”: model có thể lặp lại khuôn mẫu; hỏi trước output ảnh hưởng ai, nhóm nào bị thiệt", href: NOTES + "#l-6-4" },
      { label: "Bài 2.2, mục “Bias: thường là thiếu hoặc lệch, không phải câu sai” và câu luyện về bộ câu hỏi phỏng vấn: viết lại theo tiêu chí gắn với công việc, áp như nhau cho mọi ứng viên", href: NOTES + "#l-2-2" }
    ]
  },
  {
    de: 4, n: 84, total: 119, sub: "1.4", subName: "Đổi cách prompt theo loại việc",
    answer: "D",
    ask: "As a marketing manager, you are using Claude to research a new market segment. Which research step has to be completed first?",
    scene: [
      "Mày là quản lý marketing, dùng Claude tìm hiểu một phân khúc thị trường mới (market segment).",
      "Bốn phương án là bốn bước của một vòng research: đặt câu hỏi, gửi các prompt gom thông tin, kiểm thông tin với nguồn bên ngoài, viết báo cáo cuối.",
      "Chỗ khó: bước nào cũng cần. Đề chỉ hỏi bước nào phải xong trước."
    ],
    asks: [
      "Bước research nào phải làm xong đầu tiên?",
      "Tức là: bước nào cho các bước còn lại biết phải tìm gì, kiểm gì, viết gì.",
      "Soi từng phương án: bước đó có cần kết quả của một bước khác mới làm được không?"
    ],
    facts: [
      "research (viết thường) là loại việc: gom thông tin từ nhiều nguồn để trả lời một câu hỏi. Với loại việc này, phạm vi là phần quan trọng nhất của prompt: bạn là ai, cần để quyết định gì, khung thời gian, khu vực, câu trả lời tốt trông thế nào.",
      "Docs: “Provide clear success criteria” (cho tiêu chí rõ thế nào là một câu trả lời tốt). Thiếu phạm vi thì research hay hỏng theo kiểu rộng, chung chung.",
      "Nói rõ “xong” trước khi giao việc: câu hỏi cần trả lời và output thế nào là dùng được.",
      "Kiểm là so với một nguồn nằm ngoài Claude. Muốn kiểm phải có thông tin để kiểm, và phải biết thông tin đó phục vụ câu hỏi nào."
    ],
    opts: [
      { k: "A", gist: "Write a final research report that pulls together every output Claude has produced.",
        why: [
          "Đây là bước cuối, không phải bước đầu. Chưa gom, chưa kiểm thì không có gì để gộp.",
          "“combining every Claude output” (gộp mọi output của Claude) còn đưa cả phần chưa kiểm vào báo cáo (ý 4)."
        ] },
      { k: "B", gist: "Send Claude a series of prompts to collect information across the segment.",
        why: [
          "Gom thông tin khi chưa có câu hỏi là đúng kiểu hỏng của research: rộng, chung chung (ý 1, 2).",
          "Claude không biết mày cần thông tin để quyết định gì, nên mỗi prompt kéo về một mảng. Gom xong mới thấy thiếu đúng thứ cần, phải hỏi lại.",
          "Dễ bị cuốn vì nghe như bắt tay vào làm ngay. Nhưng các prompt đó chỉ tốt khi đã biết phải trả lời câu hỏi nào."
        ] },
      { k: "C", gist: "Verify the collected information against authoritative external sources.",
        why: [
          "Bước kiểm cần có thông tin đã gom (ý 4). Đặt nó đầu tiên thì chưa có gì để kiểm.",
          "Kiểm cũng cần biết câu hỏi: thông tin đúng mà lạc đề vẫn vô ích."
        ] },
      { k: "D", gist: "Define the specific research questions that the work on this segment must answer.",
        why: [
          "Đúng bước đầu: câu hỏi cụ thể là phạm vi của cả vòng research (ý 1). Nó cho biết phải gom gì, kiểm gì, và báo cáo cuối phải trả lời gì.",
          "Câu hỏi cũng là tiêu chí “xong” (ý 2, 3): biết câu hỏi thì biết khi nào đã đủ, thay vì gom mãi không dừng."
        ] }
    ],
    refs: [
      { label: "Bài 1.4, mục “research: phạm vi là phần quan trọng nhất”: nói rõ cần để quyết định gì, câu trả lời tốt trông thế nào", href: NOTES + "#l-1-4" },
      { label: "Bài 4.2, mục “Lập kế hoạch: Claude soạn, người duyệt”: nói rõ “xong” trước khi giao", href: NOTES + "#l-4-2" }
    ]
  },
  {
    de: 4, n: 85, total: 119, sub: "5.1", subName: "Dựng Project: instructions và knowledge",
    answer: "A",
    ask: "An HR business partner is creating two separate Projects for two different client engagements. Which configuration does the most to stop context from bleeding between the two engagements?",
    scene: [
      "Một chuyên viên đối tác nhân sự (HR business partner) làm cho hai khách hàng khác nhau. Mỗi khách là một engagement (hợp đồng dịch vụ) riêng.",
      "Chị dựng hai Project. Mối lo là context bleed (ngữ cảnh rò từ việc này sang việc kia): thông tin của khách này hiện ra trong câu trả lời cho khách kia.",
      "Chỗ khó: ba phương án sai tự nói luôn chỗ yếu của mình. Câu này kiểm mày có biết Project tách được những gì, và còn chỗ nào dùng chung không."
    ],
    asks: [
      "Cấu hình nào chặn rò ngữ cảnh giữa hai khách tốt nhất?",
      "Tức là: dùng ranh giới của Project để tách hai việc, rồi xác nhận ranh giới đó giữ được.",
      "Soi từng phương án: hai khách có nằm trong hai không gian riêng không, phần nào còn dùng chung?"
    ],
    facts: [
      "Project là không gian làm việc khép kín. Docs: “self-contained workspaces with their own chat histories and knowledge bases” (không gian khép kín, có lịch sử chat và kho tài liệu riêng). Mỗi Project có instructions, knowledge, các chat và memory riêng.",
      "Chat trong một Project dùng memory của Project đó và memory tài khoản, không bao giờ lấy memory của Project khác.",
      "Memory tài khoản vẫn đi vào mọi Project. Muốn tách hẳn một Project khỏi nó thì tắt “Use account memory” (dùng memory tài khoản) ở trang của Project.",
      "Chat thường ngoài Project không có instructions, knowledge, memory riêng cho từng việc."
    ],
    opts: [
      { k: "A", gist: "Give each Project its own memory, knowledge sources, and instructions, then check that nothing from one Project shows up in the other Project's answers.",
        why: [
          "Dùng đúng ranh giới của Project: mỗi khách một bộ instructions, knowledge, chat và memory riêng (ý 1, 2).",
          "Bước kiểm cuối có lý do thật: memory tài khoản vẫn đi vào cả hai Project (ý 3). Thử hỏi ở Project này xem có lộ chi tiết của khách kia không; có thì tắt “Use account memory”."
        ] },
      { k: "B", gist: "Put both engagements in one shared Project with combined memory, knowledge, and instructions, trusting Claude to keep the two clients apart without any configuration.",
        why: [
          "Gộp chung là bỏ đi ranh giới duy nhất có sẵn (ý 1). Tài liệu, instructions, memory của hai khách nằm cùng chỗ, chat nào cũng thấy cả hai.",
          "“on the assumption that Claude will keep… separate” (giả định Claude tự tách được) là trông vào thứ không ai cài đặt. Claude dùng mọi thứ nằm trong context, không biết đoạn nào chỉ dành cho khách nào."
        ] },
      { k: "C", gist: "Make both Projects share one memory context to cut setup effort, even though shared memory between unrelated clients is exactly what produces bleed.",
        why: [
          "Phương án tự nói nó sai: dùng chung memory giữa hai khách không liên quan chính là thứ gây rò.",
          "Nó còn đi ngược cách Project vốn chạy: mỗi Project có memory riêng (ý 2). Đổi rò dữ liệu khách lấy chút công dựng thì không đáng."
        ] },
      { k: "D", gist: "Skip Projects entirely and use ordinary chats for both engagements, with no scoped memory and nothing structural separating the two clients' work.",
        why: [
          "Bỏ Project là bỏ luôn instructions, knowledge, memory riêng cho từng khách (ý 4). Hai việc chỉ còn tách nhau bằng trí nhớ của người dùng.",
          "Mỗi chat mới lại phải dán lại tài liệu của khách, dễ dán nhầm tài liệu khách này vào chat của khách kia."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D5, mục “Project gồm những phần nào”: không gian khép kín; memory của Project không bao giờ lấy memory Project khác", href: NOTES + "#l-5-0" },
      { label: "Bài 3.4, bảng “Memory, tìm chat cũ, chat ẩn danh”: mỗi Project có memory riêng; tắt “Use account memory” để tách hẳn", href: NOTES + "#l-3-4" },
      { label: "Help center: What are projects?", href: "https://support.claude.com/en/articles/9517075-what-are-projects-and-how-do-i-use-them" }
    ]
  },
  {
    de: 4, n: 86, total: 119, sub: "3.3", subName: "Chọn model theo chi phí, tốc độ, chất lượng",
    answer: "C",
    ask: "As an operations assistant, you are choosing a model for a recurring meeting-summary task that needs no deep reasoning and runs at moderate volume. Which choice gives the best balance of cost, speed, and quality?",
    scene: [
      "Mày là trợ lý vận hành, cần chọn model cho việc tóm tắt cuộc họp, lặp lại định kỳ.",
      "Đề cho ba dữ kiện: không cần lập luận sâu, khối lượng vừa phải (moderate volume), và cần “balance” (cân bằng) giữa chi phí, tốc độ, chất lượng.",
      "Chỗ khó: mỗi phương án gắn một model với một lời tả. Phải soi cả lời tả, không chỉ tên model."
    ],
    asks: [
      "Lựa chọn nào cân bằng nhất giữa chi phí, tốc độ và chất lượng?",
      "Tức là: đặt việc vào đúng tầng, không dư sức mà cũng không thiếu, và lời tả tầng đó phải đúng.",
      "Soi từng phương án: việc có cần tới mức sâu đó không, khối lượng có đẩy về tầng nhẹ nhất không, lời tả model có đúng không."
    ],
    facts: [
      "Haiku, Sonnet, Opus là ba tầng của cùng một họ model, trên cùng một trục: Haiku nhanh nhất, nhẹ hạn mức nhất; Sonnet là tầng giữa, dùng hằng ngày; Opus lập luận sâu nhất trong ba tầng nhưng chậm hơn, tốn hạn mức hơn.",
      "Bảng chọn trong notes: nhiều, ngắn, đơn giản, cần nhanh và rẻ thì Haiku; việc hằng ngày, cần cân bằng thì Sonnet; nhiều nguồn mâu thuẫn, sai thì tốn kém thì Opus.",
      "Dùng tầng mạnh cho việc tầng nhẹ hơn làm được là tốn hạn mức mà không được gì, lại còn chậm hơn.",
      "Người dùng app chọn trong các model có sẵn ở model picker. Tự xây, tự huấn luyện model nằm ngoài vai Associate."
    ],
    opts: [
      { k: "A", gist: "Haiku, which is appropriate only when the task needs the quickest possible turnaround.",
        why: [
          "Sai ở lời tả: Haiku không chỉ dành cho việc cần nhanh nhất. Nó hợp việc nhiều, ngắn, đơn giản, cần nhanh và rẻ (ý 1, 2).",
          "Đề cũng không có dữ kiện nào đẩy về Haiku: không đòi xong nhanh nhất có thể, khối lượng chỉ vừa phải.",
          "Dễ bị cuốn vì tóm tắt họp không cần lập luận sâu, nghe như việc của tầng nhẹ. Nhưng đề hỏi lựa chọn cân bằng, và tầng cân bằng cho việc hằng ngày là Sonnet."
        ] },
      { k: "B", gist: "Opus, which puts depth first in exchange for higher latency and heavier rate-limit use.",
        why: [
          "Lời tả Opus đúng, nhưng việc không cần tới nó: đề nói rõ “no deep reasoning” (không cần lập luận sâu).",
          "Dùng Opus ở đây là trả thêm thời gian chờ và hạn mức mà không được gì (ý 3), lặp lại ở mọi cuộc họp."
        ] },
      { k: "C", gist: "Sonnet, which delivers solid quality with moderate latency and rate-limit use for everyday work.",
        why: [
          "Đúng ô “việc hằng ngày, cần cân bằng” (ý 2): chất lượng vững cho một bản tóm tắt người khác sẽ đọc, độ trễ và hạn mức vừa phải.",
          "Khớp đủ ba dữ kiện của đề: việc lặp lại thường ngày, không cần lập luận sâu, khối lượng vừa."
        ] },
      { k: "D", gist: "A custom model, which the Associate-level user would have to build and train on their own.",
        why: [
          "Sai vai: người dùng app chọn trong các model có sẵn, không tự xây hay tự huấn luyện model (ý 4).",
          "Dựng model riêng cho một việc tóm tắt họp không cần lập luận sâu thì tốn hơn mọi phương án khác rất nhiều."
        ] }
    ],
    refs: [
      { label: "Bài 3.3, bảng chọn trong mục “Bốn câu hỏi trước khi chọn”: việc hằng ngày cần cân bằng thì Sonnet", href: NOTES + "#l-3-3" },
      { label: "Bài 3.2, mục “Ba tầng của cùng một họ model”: Haiku nhanh và nhẹ, Sonnet tầng giữa, Opus sâu nhưng chậm", href: NOTES + "#l-3-2" },
      { label: "Bài 0.2, mục “Hệ quả khi chọn đáp án”: tự fine-tune model nằm ngoài vai Associate", href: NOTES + "#l-0-2" }
    ]
  },
  {
    de: 4, n: 87, total: 119, sub: "4.1", subName: "Phân tích use case",
    answer: "DE",
    ask: "As a project manager, you are reviewing ways teammates have proposed to use Claude in a project workflow. Which two workflow steps are appropriate for Claude to support? (Choose two.)",
    scene: [
      "Mày là quản lý dự án. Đồng đội đề xuất năm bước trong quy trình dự án để Claude làm hoặc hỗ trợ.",
      "Mày chọn hai bước hợp với Claude.",
      "Chỗ khó: ba phương án sai đều là việc Claude soạn được chữ (thông cáo, cam kết hợp đồng, kết quả thăng chức). Chỗ sai nằm ở cụm đi kèm: “without any human review” (không ai duyệt), “legally binding” (ràng buộc pháp lý), “solely on the model's judgment” (chỉ dựa vào phán đoán của model)."
    ],
    asks: [
      "Hai bước nào hợp để Claude hỗ trợ?",
      "Tức là: bước nào Claude làm phần soạn, gom, tóm tắt, còn lỗi nếu có thì người thấy và sửa kịp.",
      "Soi từng phương án: output đi thẳng ra ngoài hay qua người? Có phải một quyết định cần người đứng tên không?"
    ],
    facts: [
      "Hợp Claude: nhiều chữ, mô tả rõ được, đầu ra kiểm được, sai thì dễ phát hiện. Ví dụ: tóm tắt biên bản họp, soạn nháp email, đổi định dạng tài liệu.",
      "Cần người: việc cân nhắc giá trị, có hậu quả cho người khác, phải có người đứng tên. Ví dụ: loại ứng viên, ký gửi khách, chấp nhận một đánh đổi. Claude chuẩn bị, người quyết.",
      "Phép thử “kiểm được, sửa được”: việc hợp với Claude khi lỗi được phát hiện và sửa trước khi gây hại. Output ra ngoài và khó rút lại thì phải có người duyệt trước.",
      "Lời khuyên hay quyết định về một người cụ thể trong lĩnh vực việc làm là ca rủi ro cao: Claude soạn, người có chuyên môn duyệt từng ca."
    ],
    opts: [
      { k: "A", gist: "Approving the final version of an external press release with no human review.",
        why: [
          "Sai ở cụm “without any human review” (không ai duyệt). Thông cáo ra ngoài, công khai, khó rút lại, mà không ai đọc trước khi phát (ý 3).",
          "Claude soạn nháp thông cáo thì được. Cái sai là để Claude “approve” (duyệt) bản cuối, tức là giao luôn phần quyết (ý 2)."
        ] },
      { k: "B", gist: "Making legally binding contractual commitments in the company's name.",
        why: [
          "Cam kết ràng buộc pháp lý là phần quyết, phải có người đứng tên và chịu trách nhiệm (ý 2).",
          "Sai một điều khoản là công ty bị ràng buộc theo đúng điều khoản sai đó. Không gỡ lại rẻ được (ý 3)."
        ] },
      { k: "C", gist: "Deciding staff promotion outcomes on the model's judgment alone.",
        why: [
          "Thăng chức là quyết định về một người cụ thể, đụng tới quyền lợi của họ (ý 4). Chỉ dựa vào phán đoán của model là bỏ hẳn người quyết (ý 2).",
          "Claude có thể tóm tắt hồ sơ, gom nhận xét cho người quyết. Nó không thay được người chịu trách nhiệm với kết quả."
        ] },
      { k: "D", gist: "Synthesizing a literature review from many research documents that have been uploaded.",
        why: [
          "Đúng: gom và tổng hợp nhiều tài liệu là việc nhiều chữ, Claude làm nhanh (ý 1).",
          "Đầu ra kiểm được: mở tài liệu gốc ra đối chiếu từng ý, nhất là trích dẫn và con số (ý 3). Người dùng bản tổng hợp vẫn là người chốt kết luận."
        ] },
      { k: "E", gist: "Drafting a structured project status update from a set of meeting notes.",
        why: [
          "Đúng: tóm tắt biên bản họp, soạn nháp báo cáo là ví dụ đúng của nhóm “hợp Claude” (ý 1).",
          "Bản nháp nội bộ, quản lý dự án đọc trước khi gửi: kiểm được, sửa được (ý 3).",
          "D và E cùng là phần làm. Ba phương án sai đều giao cho Claude phần quyết."
        ] }
    ],
    refs: [
      { label: "Bài 4.1, bảng “Việc nào hợp Claude, việc nào chưa, việc nào cần người”", href: NOTES + "#l-4-1" },
      { label: "Bài 6.1, bảng “Ba vùng, mỗi vùng một câu hỏi” và phép thử “kiểm được, sửa được”", href: NOTES + "#l-6-1" },
      { label: "Bài Nền tảng D4, mục “Giao phần làm, giữ phần quyết”", href: NOTES + "#l-4-0" }
    ]
  },
  {
    de: 4, n: 88, total: 119, sub: "4.1", subName: "Phân tích use case",
    answer: "CE",
    ask: "An operations lead is matching production tasks to what Claude's models do well, so that expectations stay realistic. Which two production tasks line up most clearly with Claude's strengths? (Choose two.)",
    scene: [
      "Một trưởng nhóm vận hành xếp các việc sản xuất (production tasks) vào đúng chỗ Claude mạnh, để mọi người không kỳ vọng sai.",
      "Năm phương án: canh luồng dữ liệu cảm biến trực tiếp, ra phán quyết pháp lý, soạn email cho khách, tính giá trị tất toán hợp đồng phái sinh theo giá thị trường đang chạy, tổng hợp nhiều tài liệu dài.",
      "Chỗ khó: phương án nào cũng dính tới đọc và phân tích. Phải tách việc chữ, kiểm được, khỏi việc cần dữ liệu trực tiếp, phép tính chính xác, hay người đứng tên."
    ],
    asks: [
      "Hai việc nào khớp rõ nhất với điểm mạnh của Claude?",
      "Tức là: chọn việc Claude làm tốt ngay, không cần thêm công cụ hay đổi người quyết.",
      "Soi từng phương án: đó là việc chữ hay việc số, có cần dữ liệu trực tiếp không, kết quả có ràng buộc ai không."
    ],
    facts: [
      "Claude sinh chữ bằng cách đoán chữ tiếp theo. Mạnh ở tóm tắt, viết lại, đổi định dạng, soạn theo giọng và người đọc được dặn. Hụt ở chỗ phân biệt đúng với nghe-có-vẻ-đúng, nên cần người kiểm.",
      "Phép tính chính xác là chỗ hụt: con số được “đoán” chứ không được tính. Cách bù là cho Claude chạy code để tính.",
      "Claude chỉ thấy dữ liệu nằm trong cuộc chat, hoặc lấy qua connector lúc được hỏi. Thông tin mới chỉ vào được khi đưa tài liệu hay bật tìm kiếm.",
      "Việc có hậu quả cho người khác và phải có người đứng tên (phán quyết, ký kết) thuộc nhóm cần người: Claude chuẩn bị, người quyết."
    ],
    opts: [
      { k: "A", gist: "Monitoring a live stream of sensor data and flagging anomalies the moment they happen.",
        why: [
          "Sai ở “live” và “in real time” (trực tiếp, theo thời gian thực). Claude làm việc trên dữ liệu đã đưa vào chat hoặc lấy lúc được hỏi (ý 3), không ngồi canh một luồng dữ liệu chạy liên tục.",
          "Canh luồng số và báo ngay khi vượt ngưỡng là việc của hệ thống giám sát chạy liên tục. Claude hợp ở bước sau: đọc một đợt bất thường đã ghi lại và viết giải thích."
        ] },
      { k: "B", gist: "Handing down a binding legal determination based only on Claude's analysis of the case documents.",
        why: [
          "Sai ở “binding” (ràng buộc) và “solely” (chỉ dựa vào). Phán quyết pháp lý là phần quyết, phải có người có chuyên môn đứng tên (ý 4).",
          "Claude tóm tắt hồ sơ vụ việc được. Biến bản phân tích đó thành phán quyết thì không ai chịu trách nhiệm khi nó sai."
        ] },
      { k: "C", gist: "Drafting a customer-facing email that follows a set tone and audience, with a human reviewing it.",
        why: [
          "Đúng: soạn theo giọng và người đọc được dặn là việc chữ, đúng chỗ mạnh (ý 1).",
          "“under human review” (có người duyệt) bù đúng chỗ hụt: người đọc trước khi gửi, sửa chi tiết nghe đúng mà không đúng."
        ] },
      { k: "D", gist: "Working out the precise settlement value of a derivative contract from live market inputs.",
        why: [
          "Dính hai chỗ hụt cùng lúc: phép tính chính xác (ý 2) và dữ liệu thị trường đang chạy (ý 3).",
          "Con số tất toán sai là tiền thật. Việc này cần hệ thống định giá có nguồn dữ liệu chuẩn, không phải con số Claude ước ra.",
          "Dễ bị cuốn vì Claude phân tích được tài liệu tài chính. Nhưng phân tích khác với tính chính xác một giá trị từ giá trực tiếp."
        ] },
      { k: "E", gist: "Synthesizing one executive summary from a large number of long source documents.",
        why: [
          "Đúng: tóm tắt và gom nhiều tài liệu dài là chỗ mạnh nhất của việc sinh chữ (ý 1).",
          "Kết quả kiểm được: mở nguồn ra đối chiếu các con số và kết luận chính trước khi đưa lãnh đạo.",
          "C và E cùng là việc chữ, có người kiểm sau. Ba phương án sai cần dữ liệu trực tiếp, phép tính chính xác, hoặc người đứng tên."
        ] }
    ],
    refs: [
      { label: "Bài 4.5, bảng bốn đặc tính “Mạnh ở / Hụt ở / Cách bù”: tóm tắt, viết lại là chỗ mạnh; phép tính chính xác là chỗ hụt", href: NOTES + "#l-4-5" },
      { label: "Bài 4.1, bảng “Việc nào hợp Claude, việc nào chưa, việc nào cần người”", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 4, n: 89, total: 119, sub: "5.3", subName: "Viết chỉ dẫn cấp hệ thống",
    answer: "D",
    ask: "A learning specialist is configuring a Project for course-design work. The organization already has an internal instructional-design standard and a preferred format for lesson outlines. Which set of custom instructions suits this use case best?",
    scene: [
      "Một chuyên viên đào tạo dựng Project để thiết kế khóa học.",
      "Tổ chức có sẵn hai thứ cố định: chuẩn thiết kế bài giảng nội bộ (instructional-design standard) và khung dàn ý bài học ưa dùng.",
      "Bốn phương án là bốn bộ custom instructions (chỉ dẫn đặt sẵn cho Project). Chúng khác nhau ở chỗ có nêu vai, chuẩn, khung dàn ý không, hay đẩy những thứ đó sang từng chat."
    ],
    asks: [
      "Bộ chỉ dẫn nào hợp nhất với việc này?",
      "Tức là: thứ lặp lại ở mọi bài học phải nằm trong instructions, và không bỏ sót thứ tổ chức đã quyết sẵn.",
      "Soi từng phương án: đủ vai, chuẩn và khung dàn ý chưa? Có thứ cố định nào bị đẩy sang tin nhắn không?"
    ],
    facts: [
      "Project instructions đặt một lần, áp cho mọi chat trong Project. Thứ lặp lại ở mọi chat (người đọc, giọng, định dạng chuẩn, ràng buộc lâu dài) để ở đây. Việc riêng của lần này thì nói trong tin nhắn.",
      "Bộ khung bảy phần của một bản chỉ dẫn: vai, việc và phạm vi, người đọc, định dạng, nguồn, khi không chắc, ưu tiên.",
      "Phần nào bỏ trống thì Claude tự lấp. Không nói định dạng thì Claude dùng định dạng mặc định, mỗi lần một kiểu.",
      "Vai cho Claude một góc nhìn, nhưng không thay được các phần khác. Vai không cho Claude biết chuẩn hay khung dàn ý của tổ chức."
    ],
    opts: [
      { k: "A", gist: "Name Claude's course-designer role and leave each chat's prompt to set the standards and outline structure for that lesson, since lessons differ a great deal.",
        why: [
          "Sai ở chỗ đặt: chuẩn thiết kế và khung dàn ý là thứ cố định của tổ chức, lặp lại ở mọi bài học. Chỗ của chúng là instructions, không phải từng tin nhắn (ý 1).",
          "Để từng chat tự nêu thì có chat quên, có chat nêu mỗi kiểu một khác. Output lệch chuẩn mà không ai biết lệch từ đâu.",
          "Dễ bị cuốn vì “lessons vary widely” (bài học rất khác nhau) nghe hợp lý. Nhưng thứ khác nhau là chủ đề từng bài, nói trong tin nhắn. Chuẩn và khung thì không đổi."
        ] },
      { k: "B", gist: "Name the course-designer role and require alignment with the organization's design standards, but let Claude decide the outline structure from each lesson's topic.",
        why: [
          "Có vai và chuẩn, nhưng bỏ trống phần định dạng trong khi tổ chức đã có khung dàn ý ưa dùng (ý 2).",
          "Claude sẽ tự chọn cấu trúc, mỗi bài một kiểu (ý 3). Người dùng phải sửa tay cho đúng khung, việc mà một dòng instructions làm thay được."
        ] },
      { k: "C", gist: "Give only the preferred lesson-outline structure, on the view that the structure already carries the standards and naming a role adds nothing.",
        why: [
          "Sai ở giả định: khung dàn ý là hình dạng của output, không mang theo nội dung của chuẩn thiết kế. Không ai nói ra thì Claude không biết chuẩn nội bộ là gì (ý 3, 4).",
          "Bỏ cả vai lẫn yêu cầu theo chuẩn. Output đúng khung mà có thể sai chuẩn."
        ] },
      { k: "D", gist: "Name the course-designer role, require alignment with the organization's instructional-design standards, and spell out the preferred lesson-outline structure.",
        why: [
          "Đủ ba thứ cố định của việc này: vai, chuẩn phải theo, khung dàn ý (ý 2). Cả ba đặt một lần, áp cho mọi chat (ý 1).",
          "Phần đổi theo từng bài (chủ đề, đối tượng của bài đó) để trong tin nhắn. Claude không phải đoán thứ tổ chức đã quyết sẵn (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài 5.3, bảng “Cái gì đáng thành chỉ dẫn, cái gì để trong tin nhắn” và “Bộ khung bảy phần”: thứ lặp lại ở mọi chat đặt trong instructions", href: NOTES + "#l-5-3" },
      { label: "Bài 5.1, mục “Instructions hay knowledge”: instructions là cách làm áp cho mọi chat (vai, giọng, định dạng)", href: NOTES + "#l-5-1" }
    ]
  },
  {
    de: 4, n: 90, total: 119, sub: "4.5", subName: "Nói với stakeholder về giá trị và giới hạn",
    answer: "DE",
    ask: "As a project manager, you are assessing messages that teammates drafted for stakeholders about the part Claude plays in a workflow. Which two messages are appropriate to send to stakeholders about Claude? (Choose two.)",
    scene: [
      "Mày là quản lý dự án. Đồng đội soạn sẵn mấy thông điệp gửi stakeholder (người có quyền lợi trong việc này) về vai trò của Claude trong một quy trình.",
      "Mày phải chọn hai thông điệp nên gửi.",
      "Ba phương án sai đều cố làm stakeholder yên tâm. Hai phương án đúng nói cả chỗ Claude có thể sai và chỗ người còn giữ quyền quyết."
    ],
    asks: [
      "Hai thông điệp nào phù hợp để nói với stakeholder về Claude?",
      "Tức là: thông điệp nào cho stakeholder hiểu đúng Claude làm được gì, không làm được gì, và người giữ phần nào.",
      "Soi từng phương án: nó có hứa quá không, có mơ hồ không, có nói giới hạn không?"
    ],
    facts: [
      "Hallucination (bịa thông tin trông như thật) là đặc tính đã biết, không phải trục trặc ngẫu nhiên. Các biện pháp chỉ giảm, không bảo đảm 0 lỗi. Hứa biện pháp, không hứa hoàn hảo.",
      "Bán cho đúng: Claude mang tới tốc độ và quy mô, người mang tới phán đoán và giám sát. Chỉ kể điểm mạnh là dọn sẵn chỗ cho thất vọng.",
      "Transparency Diligence: thành thật về vai trò của AI với mọi người cần biết.",
      "Stakeholder không có cách hiểu nào về Claude thì hay rơi vào một trong hai cực: thấy một bản đẹp là tin hết, gặp một lỗi là không tin gì nữa."
    ],
    opts: [
      { k: "A", gist: "A claim that the model never gets anything wrong and needs no quality review.",
        why: [
          "Sai sự thật: bịa thông tin là đặc tính đã biết, không cách nào bảo đảm 0 lỗi (ý 1).",
          "Stakeholder tin câu này sẽ cắt luôn bước duyệt. Lỗi đầu tiên lọt ra là mất lòng tin vào cả quy trình (ý 4)."
        ] },
      { k: "B", gist: "A vague assurance that “the AI is handling it”, with nothing more specific.",
        why: [
          "Không nói Claude làm phần nào, người làm phần nào, chỗ nào có thể sai (ý 3). Stakeholder không có gì để dựa vào khi quyết.",
          "Dễ bị cuốn vì nghe nhẹ nhàng, không hứa con số nào. Nhưng mơ hồ cũng là hứa quá: người nghe tự hiểu là “không phải lo gì”."
        ] },
      { k: "C", gist: "A claim that Claude will take care of every task without any human involvement.",
        why: [
          "Trái với cách bán đúng: Claude làm cùng người, không thay người (ý 2). Phán đoán và giám sát vẫn là phần của người.",
          "Hứa thế này thì không ai giữ giờ người duyệt. Khi có lỗi, không còn ai đứng chặn."
        ] },
      { k: "D", gist: "A clear account of the integration's limits and its known failure modes.",
        why: [
          "Đúng. Nói trước giới hạn và các kiểu lỗi đã biết là hứa biện pháp, không hứa hoàn hảo (ý 1).",
          "Khi có lỗi lọt qua, stakeholder đã được báo trước nên vẫn tin người báo. Họ đứng được ở giữa hai cực (ý 4)."
        ] },
      { k: "E", gist: "An honest description of where Claude helps and where people keep the decisions.",
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
    de: 4, n: 91, total: 119, sub: "2.3", subName: "Kiểm từng khẳng định",
    answer: "D",
    ask: "You have to check a Claude-drafted competitor brief for claims that have no support. Put these review steps in the right order: <br>(1) Compare each specific claim with the supplied source material or with reliable outside references.<br>(2) Use what you found to decide whether to correct the brief, re-prompt, or escalate.<br>(3) Log every unsupported or inconsistent claim, noting where it sits and how serious it is.<br>(4) List the specific factual claims, statistics and citations the brief contains.<br>(5) Read the whole brief once and mark any claims that look surprising.",
    scene: [
      "Claude soạn một bản tóm lược về đối thủ cạnh tranh (competitor brief). Mày phải soát xem câu nào không có căn cứ.",
      "Đề cho năm bước xếp lộn xộn: đọc toàn bài, liệt kê khẳng định, đối chiếu với nguồn, ghi lại, quyết cách xử lý.",
      "Cả bốn phương án đều chốt bằng 3 rồi 2. Chỗ phân định đúng sai là thứ tự ba bước đầu: 5, 4, 1."
    ],
    asks: [
      "Thứ tự đúng của năm bước soát là gì?",
      "Tức là: bước nào cần đầu ra của bước nào. Muốn đối chiếu thì phải có danh sách khẳng định; muốn lập danh sách cho đủ thì phải đọc hết bài.",
      "Soi từng phương án: lúc bước (1) chạy, trong tay đã có danh sách đầy đủ chưa, hay mới có vài câu “nghe lạ”?"
    ],
    facts: [
      "Claim (khẳng định) là một câu nói ra điều có thể đúng hoặc sai. Kiểm sau khi Claude viết gồm bốn việc: tách bản nháp thành từng khẳng định, xếp theo hệ quả, so với nguồn đang nắm sự thật đó, ghi lại nguồn của từng câu.",
      "Xếp theo hệ quả là kiểm trước câu mà kết luận dựa vào. Muốn biết kết luận dựa vào câu nào thì phải nắm cả bài.",
      "“Nghe lạ” là bộ lọc kém. Chi tiết bịa thường nghe rất chuyên nghiệp, nên chỉ kiểm câu nghe lạ là bỏ sót đúng chỗ cần kiểm.",
      "Con số, thống kê, trích dẫn là loại nội dung dễ sai. Kiểm là so với nguồn ngoài Claude; có kết quả rồi mới quyết sửa, prompt lại hay chuyển lên người có thẩm quyền."
    ],
    opts: [
      { k: "A", gist: "1, 4, 5, 3, 2",
        why: [
          "Sai ở chỗ đối chiếu (1) trước khi tách khẳng định (4): chưa có danh sách thì chưa biết phải kiểm câu nào (ý 1).",
          "Lượt đọc toàn bài (5) bị đẩy ra sau bước kiểm, nên không còn giúp chọn câu nào kiểm trước (ý 2)."
        ] },
      { k: "B", gist: "4, 5, 1, 3, 2",
        why: [
          "Sai ở chỗ tách khẳng định (4) khi chưa đọc hết bài (5). Lúc tách chưa biết bản tóm lược kết luận gì, câu nào là trụ của kết luận (ý 2).",
          "Lượt đọc đặt sau chỉ còn để đánh dấu câu nghe lạ, việc không thêm gì cho bước kiểm (ý 3).",
          "Dễ bị cuốn vì nó đưa bước liệt kê khẳng định lên đầu, nghe đúng quy trình. Nhưng muốn tách cho đủ và biết câu nào nặng thì phải đọc toàn bài trước."
        ] },
      { k: "C", gist: "5, 1, 4, 3, 2",
        why: [
          "Sai ở chỗ đối chiếu (1) ngay sau lượt đọc (5): chỉ kiểm những câu vừa đánh dấu là nghe lạ, khi danh sách đầy đủ ở (4) chưa có.",
          "Đó là lấy “nghe lạ” làm bộ lọc (ý 3). Con số bịa mà nghe trơn tru sẽ lọt, và tới lúc làm (4) thì bước kiểm đã qua."
        ] },
      { k: "D", gist: "5, 4, 1, 3, 2",
        why: [
          "Đúng. Đọc hết bài (5) để biết bản tóm lược kết luận gì. Tách mọi khẳng định, số liệu, trích dẫn (4). Rồi mới đối chiếu từng câu với nguồn (1) (ý 1, 2, 4).",
          "Câu đánh dấu nghe lạ ở (5) chỉ là gợi ý thêm. Bước (4) vẫn kéo mọi khẳng định cụ thể vào danh sách, nên không câu nào lọt chỉ vì nghe trơn (ý 3).",
          "Ghi vị trí và mức nặng (3) trước khi quyết sửa, prompt lại hay chuyển lên (2): quyết dựa trên bức tranh đủ."
        ] }
    ],
    refs: [
      { label: "Bài 2.3, mục “Sau khi Claude viết: kiểm từng khẳng định”: tách khẳng định, xếp theo hệ quả, so với nguồn, ghi nguồn", href: NOTES + "#l-2-3" },
      { label: "Bài 2.1, mục “Kiểm theo rủi ro: chỗ nào trước”: ưu tiên câu mà kết luận dựa vào, “nghe lạ” là bộ lọc kém", href: NOTES + "#l-2-1" }
    ]
  },
  {
    de: 4, n: 92, total: 119, sub: "2.1", subName: "Đúng và đủ: kiểm chỗ dễ sai trước",
    answer: "AD",
    ask: "You are putting together a checklist for judging Claude's outputs, and certain groundwork has to be done before any output gets a score. Which two steps must be finished BEFORE an output is scored against the checklist? (Choose two.)",
    scene: [
      "Mày đang dựng một bảng kiểm (checklist) để chấm output của Claude.",
      "Đề nhấn chữ “BEFORE” (trước khi): tìm hai bước phải xong trước lúc chấm output đầu tiên.",
      "Năm phương án trộn việc chuẩn bị với việc xử lý kết quả. Ba phương án sai chỉ làm được khi đã có điểm."
    ],
    asks: [
      "Hai bước nào phải xong trước khi chấm output theo bảng kiểm?",
      "Tức là: muốn chấm thì phải có thước đo. Thước đo đó gồm những phần nào?",
      "Soi từng phương án: bước này có cần kết quả chấm làm đầu vào không? Cần thì nó đứng sau."
    ],
    facts: [
      "Rubric (bảng tiêu chí chấm) là danh sách tiêu chí viết sẵn, mỗi tiêu chí mô tả rõ từng mức, để hai người chấm cùng một output ra cùng kết quả.",
      "Tiêu chí viết trước khi đọc output. Viết sau khi thấy output thì tiêu chí thường chỉ mô tả lại cái vừa nhận.",
      "Tiêu chí tốt phải đo được: có con số hoặc thang chấm rõ. Mức cần đạt phải có căn cứ (số liệu tham chiếu, kết quả chạy thử, ý kiến chuyên gia), không dựa vào hy vọng."
    ],
    opts: [
      { k: "A", gist: "Decide which evaluation criteria matter for this particular task.",
        why: [
          "Đúng. Không có tiêu chí thì không có gì để chấm. Đây là phần “chấm cái gì” của bảng kiểm (ý 1).",
          "Viết trước khi đọc output nên tiêu chí không bị kéo theo bản vừa nhận (ý 2)."
        ] },
      { k: "B", gist: "Pass the approved output on to the downstream production process.",
        why: [
          "Bước cuối. Chỉ biết output nào “approved” (đã duyệt) khi đã chấm xong.",
          "Đưa vào sản xuất trước khi chấm là bỏ luôn bước chấm."
        ] },
      { k: "C", gist: "Send outputs that fail to a senior reviewer for a second look.",
        why: [
          "Phải biết output nào “unacceptable” (không đạt), mà điều đó chỉ có sau khi chấm.",
          "Dễ bị cuốn vì nghe như thêm một lớp kiểm chặt. Nhưng đây là bước xử lý kết quả chấm, đứng sau, không phải bước chuẩn bị."
        ] },
      { k: "D", gist: "Set the cut-off that separates an acceptable output from an unacceptable one.",
        why: [
          "Đúng. Có tiêu chí mà chưa có mức đạt thì chấm xong vẫn không biết qua hay trượt. Đây là phần “bao nhiêu là đủ” của bảng kiểm (ý 1, 3).",
          "A và D bổ sung nhau: A nói chấm cái gì, D nói điểm nào thì qua. Cả hai phải có trước output đầu tiên."
        ] },
      { k: "E", gist: "Write down the final score and the reviewer's comments for the audit trail.",
        why: [
          "Điểm cuối chỉ có sau khi chấm, nên ghi lại là bước sau.",
          "Audit trail (dấu vết để kiểm lại về sau) cần cho kiểm toán, nhưng không giúp chấm đúng hơn."
        ] }
    ],
    refs: [
      { label: "Bài 2.1, khái niệm rubric và mục “Chấm trên nhiều tiêu chí, không chỉ đúng sai”: tiêu chí viết sẵn, mỗi mức mô tả rõ", href: NOTES + "#l-2-1" },
      { label: "Bài 4.1, mục “Viết tiêu chí thành công trước khi giao”: tiêu chí cụ thể, đo được, mức đạt có căn cứ", href: NOTES + "#l-4-1" },
      { label: "Bài 2.5, mục “So bản nháp bằng tiêu chí viết trước”: viết tiêu chí trước khi đọc bản nào", href: NOTES + "#l-2-5" }
    ]
  },
  {
    de: 4, n: 93, total: 119, sub: "3.4", subName: "Context có hạn: chat mới, tóm tắt, lưu lại",
    answer: "DE",
    ask: "As a business analyst, you are picking which output-formatting and context-window habits to recommend to colleagues. Which two practices use the context window effectively? (Choose two.)",
    scene: [
      "Một chuyên viên phân tích nghiệp vụ chọn vài thói quen về định dạng và cách dùng context window để khuyên đồng đội.",
      "Context window là toàn bộ những gì Claude thấy trong một chat tại một lúc, như mặt bàn làm việc: bàn rộng có hạn.",
      "Chỗ khó: đề hỏi “effective use of the context window” (dùng context window hiệu quả). Có phương án đỡ công cho người gõ, nhưng không làm thứ trên bàn tốt hơn."
    ],
    asks: [
      "Hai cách làm nào là dùng context window hiệu quả?",
      "Tức là: thứ nằm trong context phải liên quan tới yêu cầu, và Claude phải nhận ra phần nào là phần nào.",
      "Soi từng phương án: nó làm context gọn và rõ hơn, hay chỉ nhiều hơn, rối hơn, hoặc chỉ đỡ việc cho người dùng?"
    ],
    facts: [
      "Nhiều hơn chưa chắc tốt hơn. Anthropic gọi hiện tượng này là context rot (context bị mục): token trong context càng nhiều, Claude nhớ chính xác thông tin trong đó càng kém.",
      "Dọn context là gỡ những thứ việc này không cần: file không dùng nữa, connector không cần, chuyện của việc khác (thì mở chat mới).",
      "Mỗi tài liệu một khối có tên, bằng thẻ hoặc tiêu đề, ghi rõ nguồn. Nhờ đó Claude biết đoạn nào thuộc tài liệu nào, đoạn nào là lời dặn.",
      "Dùng lại tài liệu qua Project đỡ công dán lại và đỡ hạn mức, vì nội dung Project được lưu đệm. Đó là chuyện chi phí, không làm phần đang nằm trong context liên quan hơn."
    ],
    opts: [
      { k: "A", gist: "Keep reusing one context block across many requests so you never have to rebuild it.",
        why: [
          "Lý do nó nêu là “avoid rebuilding it each time” (khỏi phải dựng lại mỗi lần): đỡ công cho người dùng, không làm context tốt hơn (ý 4).",
          "Một khối cố định dùng cho nhiều yêu cầu khác nhau sẽ kéo theo cả phần không liên quan tới yêu cầu đang làm. Ngược đúng điều D làm (ý 1).",
          "Dễ bị cuốn vì dùng lại tài liệu qua Project đúng là thói quen tốt. Nhưng lợi ích đó nằm ở hạn mức và công sức, không ở chất lượng của context."
        ] },
      { k: "B", gist: "Paste all the source documents one after another with no separators.",
        why: [
          "Trái với “mỗi tài liệu một khối có tên” (ý 3). Claude không biết một đoạn thuộc tài liệu nào.",
          "Hai tài liệu nói khác nhau về cùng một điểm thì Claude dễ trộn lẫn, và không ghi được nguồn cho từng ý."
        ] },
      { k: "C", gist: "Paste every email thread about the project so the model has the complete conversation history.",
        why: [
          "Nhiều hơn chưa chắc tốt hơn (ý 1). Chuỗi email đầy lời chào, đoạn trích lại thư trước, chuyện lạc đề.",
          "“Complete conversational history” (đủ lịch sử trao đổi) không phải mục tiêu. Đủ phần liên quan mới là mục tiêu (ý 2)."
        ] },
      { k: "D", gist: "Strip out irrelevant material before sending the request, so the context stays focused.",
        why: [
          "Đúng. Đây là dọn context (ý 2). Bớt chữ thừa thì phần liên quan nổi lên, đỡ context rot (ý 1).",
          "Bỏ cái không liên quan, không cắt phần việc cần. Phần cần vẫn nguyên."
        ] },
      { k: "E", gist: "Separate the different parts of the input with clear section headers.",
        why: [
          "Đúng. Mỗi phần một khối có tên (ý 3). Claude tách được tài liệu này với tài liệu kia, tài liệu với lời dặn.",
          "D lo thứ gì nằm trong context, E lo Claude đọc nó thế nào. Hai cái bổ sung nhau."
        ] }
    ],
    dispute: "Đề gốc chấm DE, sổ giữ DE. Hai lưu ý. Một: A có lý một nửa, vì dùng lại tài liệu qua Project là thói quen tốt; nhưng lợi ích đó là đỡ hạn mức, đỡ công dựng lại (bài 7.3), không làm context gọn hay rõ hơn. Hai: link “Learn more” trong lời giải gốc trỏ tới docs của OpenAI, không phải của Anthropic, nên đừng lấy nó làm nguồn ôn.",
    refs: [
      { label: "Bài 3.4, mục “Context chứa gì, và vì sao nhiều hơn chưa chắc tốt hơn”: context rot và cách dọn context", href: NOTES + "#l-3-4" },
      { label: "Bài 1.1, mục “Dán nguồn thật, và tách nó khỏi lời dặn”: mỗi tài liệu một khối có tên, bằng thẻ hoặc tiêu đề", href: NOTES + "#l-1-1" },
      { label: "Bài 7.3, bảng “Cái gì làm hao hạn mức”: dùng lại qua Project là chuyện hạn mức, nội dung Project được lưu đệm", href: NOTES + "#l-7-3" }
    ]
  },
  {
    de: 4, n: 94, total: 119, sub: "2.4", subName: "Khi nào cần người duyệt",
    answer: "D",
    ask: "A senior manager is about to send an AI-assisted work product to an outside party and wants to apply the Diligence competency from the AI Fluency Framework. Which step shows Diligence most clearly?",
    scene: [
      "Một quản lý cấp cao sắp giao cho bên ngoài một sản phẩm có AI hỗ trợ làm ra.",
      "Đề gọi thẳng tên: năng lực Diligence (trách nhiệm) trong khung AI Fluency 4D.",
      "Ba phương án sai tự nói luôn là chúng trái Diligence, bằng các cụm “even though” (dù rằng) và “contrary to” (trái với). Đề kiểm xem mày có nắm định nghĩa không."
    ],
    asks: [
      "Bước nào thể hiện Diligence rõ nhất?",
      "Tức là: trước khi giao ra ngoài, người dùng AI phải làm gì để đứng tên được dưới output.",
      "Soi từng phương án: trách nhiệm còn ở người không, và có bước kiểm trước khi giao không?"
    ],
    facts: [
      "Diligence là chữ D thứ tư của khung AI Fluency 4D: “Taking responsibility for what we do with AI and how we do it” (chịu trách nhiệm về việc mình làm với AI và cách mình làm).",
      "Deployment Diligence (trách nhiệm khi đem dùng): kiểm và đứng ra bảo đảm cho output mình dùng hoặc chia sẻ. Kiểm trước khi gửi, nhất là chi tiết gây hại nếu sai: số liệu, trích dẫn, tên người, điều khoản.",
      "Accountability (trách nhiệm giải trình): người gửi output là người chịu trách nhiệm. “Claude viết” không chuyển trách nhiệm sang công cụ.",
      "Giọng tự tin, văn trơn tru không phải bằng chứng là đúng. Output sắp tới tay đối tác, khách hàng là tín hiệu phải kiểm kỹ, và kiểm trước lúc gửi; gửi rồi thì không thu hồi được."
    ],
    opts: [
      { k: "A", gist: "Send it without independent checking, reasoning that AI help moves accountability off the person, even though Diligence keeps the person fully accountable.",
        why: [
          "Sai ở giả định: dùng AI không đẩy trách nhiệm đi đâu (ý 3). Chính phương án cũng tự thừa nhận điều đó.",
          "Giao ra ngoài mà không kiểm là bỏ đúng việc Deployment Diligence đòi (ý 2)."
        ] },
      { k: "B", gist: "Make Claude itself accountable for the work product instead of keeping that as a human duty, contrary to the principle that people stay accountable.",
        why: [
          "Claude không chịu trách nhiệm thay ai được. Người gửi chịu (ý 3).",
          "Không ai đứng tên thì cũng không ai có lý do kiểm trước khi giao."
        ] },
      { k: "C", gist: "Skip checking any part, assuming fluent output must be accurate, even though Diligence requires verifying and correcting output before it is acted on.",
        why: [
          "Sai ở giả định: văn trơn tru không phải bằng chứng (ý 4).",
          "Bỏ kiểm toàn bộ là trái với “kiểm trước khi gửi” của Deployment Diligence (ý 2). Lỗi tới tay đối tác rồi thì không thu hồi được."
        ] },
      { k: "D", gist: "Work out which parts must be independently verified or corrected before delivery, and own those checks as a professional obligation.",
        why: [
          "Đúng. Đủ hai vế của Diligence: kiểm trước khi giao (ý 2), và chính người đó nhận trách nhiệm (ý 1, 3).",
          "“Identify the elements” (xác định phần nào phải kiểm) cũng là cách làm thật: dồn công kiểm vào chi tiết gây hại nếu sai, trước lúc gửi (ý 2, 4)."
        ] }
    ],
    refs: [
      { label: "Bài 6.4, mục “Diligence gồm ba phần” và “Bạn gửi thì bạn chịu”: Deployment Diligence là kiểm và bảo đảm output trước khi gửi", href: NOTES + "#l-6-4" },
      { label: "Bài Nền tảng D2, mục “Khung 4D gọi việc này là Discernment”: định nghĩa Deployment Diligence, bài 2.4 dựa trên mục này", href: NOTES + "#l-2-0" },
      { label: "Bài 2.4, mục “Ai duyệt: người phán được nội dung và chịu trách nhiệm”: duyệt trước khi gửi, người ký là người trả lời khi sai", href: NOTES + "#l-2-4" }
    ]
  },
  {
    de: 4, n: 95, total: 119, sub: "1.3", subName: "Lặp prompt: chẩn đoán, đổi một chỗ, thử lại",
    answer: "BC",
    ask: "You are reviewing statements about prompt iteration that colleagues brought back from a recent training. Which two of them are accurate? (Choose two.)",
    scene: [
      "Sau một buổi đào tạo, đồng nghiệp đưa ra năm nhận định về lặp prompt (prompt iteration). Mày chọn hai câu đúng.",
      "Ba câu sai đều coi số lần thử là thứ làm output tốt lên. Hai câu đúng nói về cách thử: đổi cái gì, và đo bằng gì."
    ],
    asks: [
      "Hai nhận định nào về lặp prompt là đúng?",
      "Tức là: một vòng lặp có ích cần những gì, và làm sao biết nó đã có ích.",
      "Soi từng phương án: có đổi đúng chỗ gây lỗi không, có thước đo không, hay chỉ thử cho nhiều?"
    ],
    facts: [
      "Lặp prompt (iterate) là vòng chẩn đoán → đổi một chỗ → thử lại → giữ cái có tác dụng, cho tới khi đạt tiêu chí. Chẩn đoán (diagnose) là gọi tên output yếu ở đâu, rồi tìm phần nào của prompt gây ra.",
      "Tiêu chí thành công đặt trước khi sửa. Không có tiêu chí thì chỉ biết output “khác đi”, không biết nó “tốt hơn” chưa.",
      "Gõ lại y nguyên hay “viết hay hơn đi” không sửa gì: điều kiện gây ra output yếu vẫn còn, bạn chỉ nhận một bản khác.",
      "Dừng khi output đạt tiêu chí ổn định, hoặc vài vòng gần nhất không cải thiện thêm. Giữ bản prompt gọn nhất mà vẫn đạt."
    ],
    opts: [
      { k: "A", gist: "Sending the same prompt again and again is the most dependable way to improve the output.",
        why: [
          "Sai: prompt y nguyên thì điều kiện gây lỗi y nguyên (ý 3). Mỗi lần ra một bản khác, không chắc bản nào tốt hơn.",
          "Chọn bản ưng nhất trong mấy lần gõ lại là chọn may. Lần sau dùng prompt đó vẫn ra bản yếu."
        ] },
      { k: "B", gist: "Checking the new output against the original criteria is how you confirm the iteration actually helped.",
        why: [
          "Đúng. Tiêu chí đặt trước là thước đo để biết vòng vừa rồi tốt lên hay chỉ khác đi (ý 2).",
          "So với tiêu chí, không phải hỏi Claude “bản này tốt hơn chưa?”. Hỏi thế không phải phép thử."
        ] },
      { k: "C", gist: "Iteration works best when every change is aimed at one specific weakness that has been diagnosed.",
        why: [
          "Đúng. Đây là bước chẩn đoán: gọi tên chỗ yếu, tìm phần prompt gây ra, rồi đổi đúng phần đó (ý 1).",
          "Mỗi vòng đổi một chỗ thì biết thay đổi nào có tác dụng. C nói đổi gì, B nói đổi xong có ích không; hai câu bổ sung nhau."
        ] },
      { k: "D", gist: "You should keep iterating until every possible alternative wording has been tried.",
        why: [
          "Sai: cách diễn đạt là vô hạn, nên đây không phải điểm dừng. Dừng khi đạt tiêu chí ổn định, hoặc vài vòng không cải thiện (ý 4).",
          "Thử tiếp sau khi đã đạt chỉ tốn context, hạn mức và thời gian."
        ] },
      { k: "E", gist: "More rounds of iteration always give a better output, whatever was changed.",
        why: [
          "Sai ở cụm “regardless of what was changed” (bất kể đổi cái gì). Đổi không trúng chỗ gây lỗi thì không tốt lên, có khi tệ đi (ý 1).",
          "Dễ bị cuốn vì làm nhiều nghe như cẩn thận. Nhưng vòng lặp có ích nhờ chẩn đoán đúng và có thước đo (ý 2), không nhờ số vòng."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, mục “Đặt tiêu chí trước khi sửa”, “Mỗi vòng đổi một chỗ” và bảng “Dừng, bắt đầu lại, hay lưu”", href: NOTES + "#l-1-3" },
      { label: "Bài 7.1, mục “Vì sao chỉ đổi một thứ, và chạy lại cùng input”: đổi một thứ mới biết thứ nào có tác dụng", href: NOTES + "#l-7-1" }
    ]
  },
  {
    de: 4, n: 96, total: 119, sub: "2.2", subName: "Gọi đúng tên lỗi: bịa, mâu thuẫn, thiên lệch",
    answer: "A",
    ask: "A Claude associate is reviewing customer-segment descriptions that Claude drafted for an internal marketing brief. One of them generalizes about how a demographic group buys, and the generalization does not hold for individual customers in that segment. What is the most appropriate response?",
    scene: [
      "Claude soạn các mô tả phân khúc khách hàng cho một bản định hướng marketing dùng nội bộ (marketing brief).",
      "Một mô tả gán hành vi mua cho cả một nhóm nhân khẩu (theo tuổi, giới, vùng…). Khái quát đó không đúng với từng khách trong phân khúc.",
      "Bốn phương án đi bốn hướng: sửa rồi kiểm với dữ liệu, xóa cả phần phân khúc, giữ vì chỉ dùng nội bộ, giữ nguyên và thêm câu lưu ý."
    ],
    asks: [
      "Cách xử lý phù hợp nhất là gì?",
      "Tức là: nhận ra đây là thiên lệch, sửa đúng chỗ lệch, mà vẫn giữ phần có ích của bản phân khúc.",
      "Soi từng phương án: khái quát sai còn nằm trong tài liệu không? Việc phân khúc có bị bỏ một cách không cần thiết không?"
    ],
    facts: [
      "Bias (thiên lệch) là output nghiêng theo một hướng: coi một nhóm là mặc định, hay dán khuôn mẫu lên cả nhóm. Model học từ dữ liệu của con người nên có thể lặp lại khuôn mẫu, ví dụ chân dung khách hàng theo định kiến.",
      "Kiểm thật là so với nguồn nằm ngoài Claude. Với mô tả khách hàng, nguồn đó là dữ liệu khách hàng thật.",
      "Sửa hình thức không sửa được nội dung. Câu miễn trừ kiểu “có thể không đúng với mọi người” không làm câu sai bớt sai, cũng không chuyển trách nhiệm đi đâu.",
      "Né vấn đề là sai: bỏ hẳn phần việc khi đã có cách sửa an toàn là không cần thiết."
    ],
    opts: [
      { k: "A", gist: "Rewrite the description around observed behaviors rather than generalizations about people, then validate the rewrite against real customer data.",
        why: [
          "Đúng. Sửa đúng gốc: bỏ khuôn mẫu gán cho một nhóm người, mô tả bằng hành vi quan sát được (ý 1).",
          "Kiểm bản sửa với dữ liệu khách hàng thật là so với nguồn ngoài Claude (ý 2). Phân khúc vẫn còn, tài liệu vẫn dùng được."
        ] },
      { k: "B", gist: "Take the whole customer-segment description out of the brief, because any segmentation based on demographics will probably cause the same trouble.",
        why: [
          "Quá tay. Lỗi nằm ở một khái quát, không nằm ở việc phân khúc. Bỏ hết là bỏ việc khi đã có cách sửa (ý 4).",
          "“Any segmentation that involves demographic characteristics” (mọi kiểu phân khúc có dùng đặc điểm nhân khẩu) lại là một khái quát quá tay, đúng loại lỗi đang cần sửa."
        ] },
      { k: "C", gist: "Leave the description as it is, since an internal brief carries less risk than publishing demographic generalizations externally.",
        why: [
          "Sai ở giả định: dùng nội bộ không làm khuôn mẫu đúng hơn. Đội marketing vẫn dựa vào tài liệu này để chọn nhắm tới ai, nói gì với ai.",
          "Khách trong phân khúc vẫn chịu hậu quả của quyết định dựa trên một khái quát sai (ý 1)."
        ] },
      { k: "D", gist: "Attach a disclaimer saying the generalization may not fit everyone in the segment, and leave the description itself unchanged.",
        why: [
          "Câu lưu ý không sửa nội dung (ý 3). Khái quát sai vẫn nằm nguyên, người đọc vẫn dùng nó để quyết.",
          "Dễ bị cuốn vì nghe minh bạch, có thừa nhận giới hạn. Nhưng đề kể khái quát này không đúng với từng khách, tức là nội dung sai, và nội dung sai thì phải sửa."
        ] }
    ],
    refs: [
      { label: "Bài 2.2, mục “Bias: thường là thiếu hoặc lệch, không phải câu sai”: mặc định lệch, khuôn mẫu, cách soi bias", href: NOTES + "#l-2-2" },
      { label: "Bài 6.4, mục “Bias và công bằng” và “Bạn gửi thì bạn chịu”: chân dung khách hàng theo định kiến, câu miễn trừ không chuyển được trách nhiệm", href: NOTES + "#l-6-4" },
      { label: "Bài mở đầu “Khẩu vị chọn đáp án”: luật 3 (sửa hình thức không sửa nội dung) và luật 5 (né vấn đề là sai)", href: NOTES + "#l-0-3" }
    ]
  },
  {
    de: 4, n: 97, total: 119, sub: "7.3", subName: "Tối ưu quy trình",
    answer: "B",
    ask: "You are doing an optimization pass on a workflow that runs on a regular cycle. Which order of steps is correct? <br>(1) Make a targeted improvement to the bottleneck step.<br>(2) Roll the improved workflow out to the wider team and document what changed.<br>(3) Find the bottleneck step using measured time per step and queue length.<br>(4) Map the current workflow: its steps, owners and decision points.<br>(5) Pilot the change with a small group and measure the effect against the earlier baseline.",
    scene: [
      "Mày tối ưu một quy trình chạy định kỳ.",
      "Năm bước: vẽ lại quy trình hiện tại, tìm chỗ thắt cổ chai (bottleneck: bước làm cả dòng việc chậm lại) bằng số đo, sửa đúng chỗ đó, chạy thử với nhóm nhỏ, rồi mở rộng và ghi lại.",
      "Bốn phương án đều kết thúc bằng 5 rồi 2. Chỗ khác nhau là thứ tự của 4, 3, 1 ở đầu."
    ],
    asks: [
      "Thứ tự đúng của các bước tối ưu là gì?",
      "Tức là: muốn sửa đúng chỗ thì phải biết chỗ nào chậm; muốn biết chỗ nào chậm thì phải có sơ đồ các bước và số đo từng bước.",
      "Soi từng phương án: lúc bước (1) chạy đã biết chỗ thắt cổ chai chưa? Lúc bước (3) chạy đã có sơ đồ để đo chưa?"
    ],
    facts: [
      "Sơ đồ quy trình (process map) là danh sách các bước: ai làm, mất bao lâu, chờ ở đâu, chuyển cho ai. Có nó rồi mới chỉ ra được chỗ thắt cổ chai.",
      "Đo trước khi đổi: đừng đoán bước nào đang tốn, xem số liệu rồi mới đổi. Đổi xong đo lại thời gian và chất lượng, so với mốc cũ.",
      "Nhân rộng cho cả nhóm: thử trên vài ca thật, đạt chuẩn rồi mới phổ biến, và ghi lại các bước đã chạy tốt."
    ],
    opts: [
      { k: "A", gist: "4, 1, 3, 5, 2",
        why: [
          "Sai ở chỗ sửa (1) trước khi đo (3): sửa chỗ thắt cổ chai khi chưa biết nó nằm đâu (ý 2). Sửa theo đoán thì dễ sửa nhầm bước.",
          "Dễ bị cuốn vì nó vẫn mở đầu bằng vẽ sơ đồ, nghe bài bản. Nhưng sơ đồ chưa nói bước nào chậm; phải có số đo (ý 1, 2)."
        ] },
      { k: "B", gist: "4, 3, 1, 5, 2",
        why: [
          "Đúng. Vẽ sơ đồ hiện tại (4) để có các bước mà đo. Đo thời gian từng bước và hàng chờ để tìm chỗ thắt cổ chai (3). Rồi sửa đúng chỗ đó (1) (ý 1, 2).",
          "Chạy thử với nhóm nhỏ, so với mốc đo trước đó (5). Đạt rồi mới mở rộng và ghi lại (2) (ý 2, 3)."
        ] },
      { k: "C", gist: "3, 4, 1, 5, 2",
        why: [
          "Sai ở chỗ đo (3) trước khi vẽ sơ đồ (4): đo thời gian từng bước khi chưa liệt kê các bước, người phụ trách, điểm quyết định (ý 1).",
          "Không có sơ đồ thì không biết đo bước nào, hàng chờ nằm giữa hai bước nào. Số đo dễ sót bước, và chỗ thắt cổ chai tìm ra có thể sai."
        ] },
      { k: "D", gist: "1, 4, 3, 5, 2",
        why: [
          "Sai ở chỗ sửa (1) ngay từ đầu, khi chưa có sơ đồ cũng chưa có số đo. Đây là đoán rồi sửa (ý 2).",
          "Sơ đồ và số đo đến sau lại đo quy trình đã bị sửa, nên mất luôn mốc “trước” để bước (5) so sánh."
        ] }
    ],
    refs: [
      { label: "Bài 7.3, mục “Đo trước khi đổi, đo sau khi đổi”: xem số liệu rồi mới đổi, thử trên ca thật rồi mới phổ biến", href: NOTES + "#l-7-3" },
      { label: "Bài 4.2, khái niệm sơ đồ quy trình và mục “Tối ưu quy trình: lời chê của Claude là giả thuyết”: ai làm, mất bao lâu, chờ ở đâu", href: NOTES + "#l-4-2" },
      { label: "Bài 4.4, mục “Chạy thử một việc thật trước khi mở rộng”: đạt chuẩn rồi mới mở rộng, mở theo pha", href: NOTES + "#l-4-4" }
    ]
  },
  {
    de: 4, n: 98, total: 119, sub: "3.3", subName: "Chọn model theo chi phí, tốc độ, chất lượng",
    answer: "B",
    ask: "A customer-success lead runs an interactive workflow in which every turn has to come back quickly and needs only light reasoning. Which choice fits these requirements best?",
    scene: [
      "Một trưởng nhóm chăm sóc khách hàng (customer success) chạy một quy trình hỏi đáp qua lại.",
      "Hai ràng buộc: lượt nào cũng phải trả lời nhanh, và mỗi lượt chỉ cần lập luận nhẹ.",
      "Ba phương án sai lộ khá rõ: một cái coi tốc độ như nhau, một cái chọn tầng sâu nhất, một cái chọn theo thứ tự chữ cái."
    ],
    asks: [
      "Lựa chọn nào khớp nhất với yêu cầu này?",
      "Tức là: việc cần nhanh, nhẹ, lặp nhiều lượt thì chọn tầng model nào.",
      "Soi từng phương án theo hai trục đề cho: độ trễ (latency: thời gian chờ tới khi có câu trả lời) và lượng lập luận mỗi lượt cần."
    ],
    facts: [
      "Haiku, Sonnet, Opus là ba tầng của cùng một họ model. Lên tầng thì lập luận sâu hơn, nhưng chậm hơn và tốn hơn. Docs API xếp Haiku nhanh nhất, Sonnet nhanh, Opus chậm hơn hai tầng kia.",
      "Docs API tả Haiku 5.5 là “for high-volume, latency-sensitive tasks such as classification, extraction, and routing” (cho việc số lượng lớn, cần phản hồi nhanh như phân loại, trích xuất, định tuyến).",
      "Bảng chọn của bài 3.3: việc nhiều, ngắn, đơn giản, cần nhanh và rẻ thì ưu tiên tốc độ, chi phí, chọn tầng nhanh, nhẹ (Haiku).",
      "Hướng dẫn chọn model của Anthropic: dùng Opus cho việc Haiku làm được là tốn token mà không được gì, lại còn chậm hơn."
    ],
    opts: [
      { k: "A", gist: "Any model will do, because latency is the same whichever model you pick.",
        why: [
          "Sai tiền đề: tốc độ khác nhau theo tầng, Haiku nhanh nhất, Opus chậm nhất (ý 1).",
          "Tin câu này thì có thể chạy cả quy trình trên Opus, và lượt nào khách cũng phải chờ lâu hơn cần thiết."
        ] },
      { k: "B", gist: "Pick Haiku, to keep latency low and handle the light reasoning load efficiently at scale.",
        why: [
          "Đúng. Cả hai ràng buộc của đề đều trỏ về Haiku: cần nhanh, và việc nhẹ (ý 1, 3).",
          "Đây đúng là loại việc docs mô tả cho Haiku: nhiều lượt, cần phản hồi nhanh (ý 2). Không phải trả thêm thời gian chờ và hạn mức cho độ sâu không dùng tới (ý 4)."
        ] },
      { k: "C", gist: "Pick Opus to get the deepest reasoning, accepting the higher latency.",
        why: [
          "Sai ở chỗ mua đúng thứ đề không cần: mỗi lượt chỉ cần lập luận nhẹ, mà Opus chậm hơn (ý 1).",
          "Dễ bị cuốn vì “mạnh nhất cho chắc” nghe an toàn. Nhưng đề đặt tốc độ là ràng buộc cứng, và Opus cho việc Haiku làm được là chậm, tốn mà không được gì (ý 4)."
        ] },
      { k: "D", gist: "Pick a model according to where its name falls in alphabetical order.",
        why: [
          "Thứ tự chữ cái không nói gì về tốc độ hay độ sâu. Chọn thế này là không xét yêu cầu của việc.",
          "Đề cho hai tiêu chí rõ ràng (ý 3). Bỏ qua chúng là bỏ qua cả câu hỏi."
        ] }
    ],
    refs: [
      { label: "Bài 3.3, mục “Bốn câu hỏi trước khi chọn” và bảng chọn tầng: nhiều, ngắn, cần nhanh thì Haiku", href: NOTES + "#l-3-3" },
      { label: "Bài 3.2, định nghĩa độ trễ và bảng ba tầng: Haiku nhanh nhất, Opus chậm hơn hai tầng kia", href: NOTES + "#l-3-2" },
      { label: "Bài mở đầu “Khẩu vị chọn đáp án”, luật 4: khớp model với việc, “luôn dùng model xịn nhất” là phí tiền và thời gian", href: NOTES + "#l-0-3" }
    ]
  },
  {
    de: 4, n: 99, total: 119, sub: "4.1", subName: "Phân tích use case",
    answer: "AB",
    ask: "In a workflow redesign, a process analyst uses the Delegation competency of the AI Fluency Framework to decide which steps go to Claude. Which two criteria guide those Delegation decisions most directly? (Choose two.)",
    scene: [
      "Một chuyên viên quy trình thiết kế lại một quy trình làm việc. Anh dùng năng lực Delegation (giao việc) của khung AI Fluency để quyết bước nào giao cho Claude.",
      "Năm phương án là năm thứ có thể đem ra cân: sai thì gỡ được không và thiệt bao nhiêu, bước có cần con người không, sơ đồ rối hay gọn, chức danh người đang làm, quy trình đã chạy bao lâu.",
      "Chỗ khó: phương án nào nghe cũng dính tới rủi ro. Chỉ hai cái nói về chính bước việc."
    ],
    asks: [
      "Hai tiêu chí nào chi phối trực tiếp nhất quyết định giao việc?",
      "Tức là: với từng bước, cái gì cho biết bước đó giao Claude được, hay phải giữ cho người.",
      "Soi từng phương án: nó nói về bước việc (sai thì sao, cần gì ở người làm), hay về thứ bên ngoài bước việc (hình vẽ, chức danh, tuổi quy trình)?"
    ],
    facts: [
      "Delegation (giao việc) là “setting goals and deciding whether, when and how to engage with AI” (đặt mục tiêu và quyết có dùng AI không, lúc nào, dùng thế nào). Ba kỹ năng con: Problem Awareness (hiểu vấn đề), Platform Awareness (biết AI làm được gì, hụt ở đâu), Task Delegation (chia việc giữa người và AI).",
      "Quyết theo từng bước. Bước hợp Claude: mô tả rõ được, đầu ra kiểm được, sai thì dễ phát hiện. Bước cần người: cân nhắc giá trị, có hậu quả cho người khác, phải có người đứng tên.",
      "Phép thử “kiểm được, sửa được” hỏi: nếu Claude sai, ai thấy, và sửa có kịp không? Việc không gỡ lại được, sai thì thiệt nặng, thì người quyết hoặc duyệt trước.",
      "Những việc không giao: phán đoán cuối cùng, phản hồi nhạy cảm với con người, đánh giá có hệ quả lớn."
    ],
    opts: [
      { k: "A", gist: "How reversible the step is and how serious an error would be; together these show whether the step is safe to give to Claude or should stay a human decision.",
        why: [
          "Đúng. Đây là phép thử “kiểm được, sửa được” áp cho từng bước: sai thì gỡ được không, thiệt bao nhiêu (ý 3).",
          "Bước dễ gỡ, sai ít thiệt thì giao rồi kiểm. Bước không rút lại được, sai là thiệt nặng thì người giữ quyết định (ý 2)."
        ] },
      { k: "B", gist: "Whether the step needs human creativity, empathy or judgment, which shows whether it suits AI or calls for capabilities Claude cannot supply.",
        why: [
          "Đúng. Đây là Platform Awareness đi cùng Task Delegation: biết Claude hụt ở đâu để chia đúng phần cho người (ý 1).",
          "Bước cần cân nhắc giá trị, cần thấu cảm với người thật, hay cần một phán đoán có người đứng tên thì người giữ (ý 2, 4)."
        ] },
      { k: "C", gist: "How visually complex the workflow diagram is, since steps with more links and dependencies are likelier to need human oversight.",
        why: [
          "Sai ở chỗ đo hình vẽ, không đo bước việc. Một bước nhiều mũi tên có thể chỉ là đổi định dạng, rất hợp giao Claude (ý 2).",
          "Ngược lại, một bước nằm lẻ một góc sơ đồ có thể là ký duyệt hợp đồng. Số đường nối không nói gì về hậu quả khi sai (ý 3)."
        ] },
      { k: "D", gist: "How senior the person currently doing the step is, since senior roles usually carry higher-stakes work that should stay with people.",
        why: [
          "Sai ở chỗ lấy chức danh thay cho bản chất việc. Người cấp cao vẫn làm nhiều việc mô tả rõ, kiểm được, như tóm tắt hay soạn nháp (ý 2).",
          "Dễ bị cuốn vì có dính tới rủi ro thật: việc của người cấp cao thường hệ trọng hơn. Nhưng đó là đoán gián tiếp. Hỏi thẳng bước đó sai thì sao (A) và có cần phán đoán của người không (B) mới là tiêu chí."
        ] },
      { k: "E", gist: "How long the workflow has existed in its current form, on the view that long-established processes are validated enough to delegate to AI.",
        why: [
          "Sai ở giả định: quy trình chạy lâu nghĩa là người làm đã quen nó, không nghĩa là Claude làm được bước đó (ý 1).",
          "Tuổi quy trình không đổi hậu quả khi sai, cũng không đổi chuyện bước đó có cần người hay không (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài Nền tảng D4, mục “AI Fluency và khung 4D”: định nghĩa Delegation và ba kỹ năng con", href: NOTES + "#l-4-0" },
      { label: "Bài 4.1, bảng “Việc nào hợp Claude, việc nào chưa, việc nào cần người”", href: NOTES + "#l-4-1" },
      { label: "Bài 6.1, mục “Phép thử kiểm được, sửa được”: sai thì ai thấy, sửa có kịp không", href: NOTES + "#l-6-1" }
    ]
  },
  {
    de: 4, n: 100, total: 119, sub: "6.3", subName: "Làm việc trong chính sách AI của công ty",
    answer: "AD",
    ask: "A Claude associate is deciding whether to turn on a Skill offered by a third party they do not know. Which two checks best support a sound decision about trusting it? (Choose two.)",
    scene: [
      "Một người dùng Claude cân nhắc bật một Skill do một bên thứ ba lạ cung cấp.",
      "Skill không chỉ là lời dặn: nó có thể chứa script, kéo thêm gói phần mềm, và bảo Claude kết nối ra ngoài.",
      "Chỗ khó: ba phương án sai đều bỏ một bước kiểm, thay bằng một lý do nghe yên tâm: có trong danh sách công khai, được khen nhiều, hay “Skill không vượt được phạm vi việc”."
    ],
    asks: [
      "Hai bước kiểm nào giúp quyết định tin hay không tin Skill này cho đúng?",
      "Tức là: trước khi bật, kiểm Skill từ đâu ra (theo chính sách của tổ chức), và kiểm Skill sẽ làm gì, đụng tới gì."
    ],
    facts: [
      "Skill là thư mục chứa hướng dẫn, script và tài nguyên, Claude nạp khi việc cần. Nó chạy nhờ code execution, và có thể cài gói phần mềm của bên thứ ba.",
      "Help Center dặn chỉ cài skill từ nguồn tin cậy. Skill từ nguồn kém tin cậy hơn, kể cả đồng nghiệp gửi, thì xem kỹ trước khi bật: phụ thuộc, script, tài nguyên đi kèm, và chỉ dẫn bảo Claude kết nối tới nguồn mạng ngoài không tin cậy.",
      "Help Center nêu hai rủi ro lớn nhất: prompt injection (Claude bị dắt làm việc ngoài ý muốn) và data exfiltration (dữ liệu bị rút ra ngoài).",
      "Ở cấp tổ chức, owner có thể cấp sẵn (provision) skill cho mọi người, và có thể bắt skill phải được duyệt trước khi phát hành trong tổ chức. Công cụ chưa được duyệt thì hỏi người phụ trách trước khi dùng."
    ],
    opts: [
      { k: "A", gist: "Check the Skill's source against the organization's list of approved Skills before enabling it in claude.ai or in any of the team's Projects.",
        why: [
          "Đúng. Đây là kiểm nguồn gốc theo chính sách tổ chức: Skill đã được duyệt, hay chưa ai xem xét (ý 4).",
          "Skill lạ không có trong danh sách được duyệt là công cụ chưa được duyệt. Hỏi người phụ trách trước, không tự bật (ý 2, 4)."
        ] },
      { k: "B", gist: "Count the Skill's appearance in a public listing as enough validation, without confirming its source, the access it asks for, or the approved list.",
        why: [
          "Sai: có mặt trong danh sách công khai không nói ai làm ra Skill, cũng không nói Skill làm gì (ý 2).",
          "Bỏ cả hai bước kiểm đề cần: nguồn gốc theo chính sách tổ chức, và quyền Skill đòi."
        ] },
      { k: "C", gist: "Skip the permission review, assuming the Skill can't go beyond the workflow's boundaries, even though Skills can request access the task doesn't need.",
        why: [
          "Sai ở giả định: Skill có script, cài được gói, kết nối được ra ngoài, nên làm được nhiều hơn việc đang làm (ý 1).",
          "Chính đề đã nói Skill có thể đòi quyền việc không cần. Bỏ bước xem là để ngỏ đúng chỗ rò dữ liệu (ý 3)."
        ] },
      { k: "D", gist: "Review the access and capabilities the Skill requests, and confirm they are appropriate for the task the Skill is meant to do.",
        why: [
          "Đúng. Đây là bước xem kỹ trước khi bật mà Help Center dặn: Skill sẽ chạy script gì, cài gì, kết nối tới đâu (ý 1, 2).",
          "Đòi nhiều hơn việc cần, ví dụ Skill định dạng báo cáo mà lại gọi ra mạng ngoài, là dấu hiệu của đúng hai rủi ro prompt injection và rò dữ liệu (ý 3)."
        ] },
      { k: "E", gist: "Enable the Skill right away because outside reviews are strong, even though its source hasn't been checked against the approved list and its access is unverified.",
        why: [
          "Sai: lời khen bên ngoài không thay được việc tổ chức duyệt nguồn, cũng không cho biết Skill làm gì với dữ liệu của mày (ý 2, 4).",
          "Dễ bị cuốn vì đánh giá tốt nghe như đã có người kiểm. Nhưng người khen không biết chính sách công ty mày, và không ai trong số họ đọc script thay mày."
        ] }
    ],
    dispute: "Đề gốc chấm AD, sổ giữ AD. Lưu ý chữ dùng trong đề: Help Center “Use skills in Claude” không có tính năng tên “approved-Skill list” (danh sách skill được duyệt), cũng không có màn hình liệt kê quyền (permissions) của một Skill cho người dùng duyệt. Gần nhất với A là skill do owner cấp sẵn cho tổ chức và quy định duyệt skill trước khi phát hành. Gần nhất với D là tự đọc script, phụ thuộc và chỉ dẫn kết nối ra ngoài của Skill trước khi bật.",
    refs: [
      { label: "Bài 6.3, bảng “Bị chặn, hay chính sách không nhắc tới”: công cụ chưa được duyệt thì hỏi người phụ trách trước khi dùng", href: NOTES + "#l-6-3" },
      { label: "Bài Nền tảng D3, định nghĩa Skills: thư mục hướng dẫn, script, tài nguyên, cần code execution", href: NOTES + "#l-3-0" },
      { label: "Help Center “Use skills in Claude”: chỉ cài skill từ nguồn tin cậy, xem kỹ script và kết nối ra ngoài trước khi bật", href: "https://support.claude.com/en/articles/12512180-use-skills-in-claude" }
    ]
  },
  {
    de: 4, n: 101, total: 119, sub: "3.4", subName: "Context có hạn: chat mới, tóm tắt, lưu lại",
    answer: "C",
    ask: "A research associate is gathering inputs for a long task that refers to two lengthy regulatory documents, of which only particular sections are relevant. Which approach best preserves the capacity of the context window?",
    scene: [
      "Một trợ lý nghiên cứu chuẩn bị đầu vào cho một việc dài. Việc đó dựa trên hai văn bản quy định rất dài.",
      "Mỗi văn bản chỉ có vài mục liên quan tới việc.",
      "Chỗ khó: đề hỏi cách giữ chỗ trống trong context window cho phần việc dài phía sau, không hỏi cách đưa được nhiều tài liệu nhất."
    ],
    asks: [
      "Cách nào giữ được nhiều chỗ trong context window nhất?",
      "Tức là: đưa cho Claude đúng phần việc cần. Không thiếu phần cần, không kèm phần không liên quan.",
      "Soi từng phương án: nó có giữ đủ nguồn cho việc không, và có bớt được chữ thừa không."
    ],
    facts: [
      "Context window là toàn bộ những gì Claude thấy được trong một chat tại một lúc, đo bằng token (mẩu chữ nhỏ model đọc và viết). Tin nhắn, file, instructions đưa vào đều chiếm chỗ.",
      "Nhiều hơn chưa chắc tốt hơn. Anthropic gọi hiện tượng này là “context rot” (context bị mục): token trong context càng nhiều, khả năng nhớ chính xác thông tin trong đó càng giảm.",
      "Tài liệu quá dài thì đưa theo từng phần, hoặc chỉ đưa những đoạn việc đó cần.",
      "Thiếu nguồn thì Claude dùng kiến thức chung, có khi bịa (hallucination: thông tin bịa mà trông như thật)."
    ],
    opts: [
      { k: "A", gist: "Leave both documents out and count on Claude to make up whatever context is missing.",
        why: [
          "Sai ở giả định: giữ chỗ bằng cách bỏ luôn nguồn. Việc dựa vào hai văn bản, thiếu chúng thì Claude điền bằng kiến thức chung, có khi bịa (ý 4).",
          "Với văn bản quy định, một điều khoản bịa mà đọc trôi chảy là thứ khó phát hiện nhất. Chỗ trong context giữ được, nhưng việc hỏng."
        ] },
      { k: "B", gist: "Cut each document into single-character pieces and send them in one at a time.",
        why: [
          "Sai: mảnh một ký tự không còn nghĩa gì. Claude không ráp lại được điều khoản nào từ chúng.",
          "Tổng số chữ đưa vào vẫn bằng dán nguyên hai văn bản, kể cả các chương không liên quan, nên không giữ thêm được chỗ nào (ý 1)."
        ] },
      { k: "C", gist: "Pull out only the relevant sections of each document and include those, leaving the unrelated chapters out.",
        why: [
          "Đúng: chỉ đưa đoạn việc cần (ý 3). Phần chiếm chỗ ít đi, context còn chỗ cho phần việc dài phía sau (ý 1).",
          "Ít chữ thừa thì các mục cần không bị chìm, Claude nhớ và trích chính xác hơn (ý 2). Nguồn cần vẫn còn đủ, nên Claude không phải đoán (ý 4)."
        ] },
      { k: "D", gist: "Paste the full text of both documents, untrimmed, so Claude has as much material as possible.",
        why: [
          "Sai: các chương không liên quan chiếm chỗ, phần việc dài phía sau còn ít chỗ hơn (ý 1).",
          "Dễ bị cuốn vì nghe chắc ăn: đưa hết thì không sót. Nhưng nhiều hơn chưa chắc tốt hơn: các mục cần bị lẫn giữa đống chữ thừa, Claude nhớ kém đi (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài 3.4, mục “Context chứa gì, và vì sao nhiều hơn chưa chắc tốt hơn”: context rot, dọn context", href: NOTES + "#l-3-4" },
      { label: "Bài nền tảng Domain 3: token và context window", href: NOTES + "#l-3-0" },
      { label: "Bài nền tảng Domain 1, bảng “Các phần của một prompt tốt”: thiếu nguồn thì Claude dùng kiến thức chung, có khi bịa", href: NOTES + "#l-1-0" }
    ]
  },
  {
    de: 4, n: 102, total: 119, sub: "1.4", subName: "Đổi cách prompt theo loại việc",
    answer: "A",
    ask: "As project lead, you are looking at a teammate's habit of using one identical prompt template for every task, no matter what kind of task it is. Which feedback is most appropriate?",
    scene: [
      "Một thành viên trong nhóm dùng đúng một mẫu prompt cho mọi việc, việc loại nào cũng vậy.",
      "Mày là trưởng dự án, phải góp ý.",
      "Chỗ khó: thói quen này nghe có lợi: nhất quán, đỡ tốn thời gian. Ba phương án sai đều dựa vào cái lợi nghe được đó."
    ],
    asks: [
      "Góp ý nào hợp nhất?",
      "Tức là: loại việc có làm đổi cách viết prompt không, và một mẫu dùng chung có cho output tốt như nhau ở mọi loại việc không."
    ],
    facts: [
      "Khung chung của một prompt (việc, bối cảnh, ràng buộc, nguồn, ví dụ, định dạng) dùng cho mọi loại việc. Khác nhau ở chỗ phần nào cần nhấn mạnh.",
      "Mỗi loại việc hỏng một kiểu. Phân tích: kết luận mà dữ liệu không đỡ được. research (loại việc tìm hiểu): rộng, chung chung, hoặc dựa vào một nguồn. Soạn thảo: giọng chung chung, chi tiết bịa. Brainstorm: vài ý quen thuộc, giống nhau.",
      "Nên mỗi loại đòi một thứ riêng. Phân tích cần quyền nói “không đủ dữ liệu”. research cần phạm vi và kiểm chéo nguồn. Soạn thảo cần mẫu giọng và dữ kiện thật. Brainstorm cần nhiều ý khác nhau, chấm ở bước riêng."
    ],
    opts: [
      { k: "A", gist: "Prompting should be adapted to each task type, because one template will not give equally strong output on every kind of task.",
        why: [
          "Đúng: mỗi loại việc hỏng một kiểu, nên prompt phải nhấn đúng phần chặn kiểu hỏng đó (ý 2, 3).",
          "Góp ý này không bắt bỏ mẫu. Khung chung vẫn dùng được (ý 1), chỉ chỉnh phần nhấn mạnh theo loại việc."
        ] },
      { k: "B", gist: "The habit is ideal, since a single template guarantees consistent quality on every type of task.",
        why: [
          "Sai ở chữ “guarantees” (bảo đảm). Cùng một mẫu không làm chất lượng như nhau, vì mỗi loại việc cần thứ khác (ý 3).",
          "Ví dụ: mẫu viết cho soạn thảo không có chỗ cho quyền nói “không đủ dữ liệu”. Đem nó đi làm phân tích thì dễ ra kết luận mà dữ liệu không đỡ được (ý 2).",
          "Dễ bị cuốn vì nhất quán nghe như chất lượng. Nhưng đầu vào giống nhau không cho output tốt như nhau khi việc khác nhau."
        ] },
      { k: "C", gist: "The prompting approach should not change between tasks, because adapting it wastes time and adds nothing.",
        why: [
          "Sai ở vế “adds no value” (không thêm giá trị gì). Chỉnh đúng phần, như thêm mẫu giọng cho việc soạn thảo, chặn được đúng kiểu hỏng của loại việc đó (ý 2, 3).",
          "Vài phút đỡ được lúc viết prompt sẽ phải trả lại bằng thời gian sửa output."
        ] },
      { k: "D", gist: "The kind of task has no bearing on which prompting strategy is appropriate.",
        why: [
          "Sai: phủ nhận đúng điều cần nắm. Loại việc quyết phần nào của prompt cần nhấn (ý 1, 3).",
          "Brainstorm cần nhiều ý, chấm sau. Phân tích cần bám dữ liệu, dám nói thiếu. Hai đòi hỏi đó gần như ngược nhau, một mẫu không phục vụ được cả hai."
        ] }
    ],
    refs: [
      { label: "Bài 1.4, bảng “Bốn loại việc, bốn kiểu hỏng”: đưa gì, đòi gì, hỏng hay gặp của từng loại", href: NOTES + "#l-1-4" },
      { label: "Bài nền tảng Domain 1, mục “Các phần của một prompt tốt”: khung chung cho mọi việc", href: NOTES + "#l-1-0" }
    ]
  },
  {
    de: 4, n: 103, total: 119, sub: "1.1", subName: "Viết prompt rõ yêu cầu, lý do, nguồn, mẫu",
    answer: "A",
    ask: "A knowledge worker is writing up common prompt-failure patterns for the team. Which pattern is most likely to lead to vague or off-target output?",
    scene: [
      "Một nhân viên đang tổng hợp các kiểu prompt hỏng hay gặp, để chia sẻ cho nhóm.",
      "Bốn phương án là bốn kiểu prompt. Ba kiểu là prompt tốt, chỉ một kiểu thiếu phần.",
      "Chỗ khó: đây là câu hỏi ngược, phải tìm prompt thiếu chứ không tìm prompt đủ. A và C cùng nhắc task, audience, format, chỉ khác ở chữ “does not state” (không nói) và “explicitly names” (nói rõ)."
    ],
    asks: [
      "Kiểu prompt nào dễ cho output mơ hồ hoặc lệch mục tiêu nhất?",
      "Tức là: prompt thiếu phần nào thì Claude phải tự đoán, và đoán thì ra output chung chung, lạc đề."
    ],
    facts: [
      "Prompt tốt nói rõ các phần: việc (làm gì, sâu tới đâu), bối cảnh (cho ai đọc, để làm gì), ràng buộc, nguồn, ví dụ, định dạng output.",
      "Thiếu phần nào thì Claude tự lấp phần đó. Thiếu việc: làm một việc gần giống. Thiếu người đọc: viết cho một người đọc chung chung. Thiếu định dạng: dùng định dạng mặc định.",
      "Triệu chứng chỉ về nguyên nhân. Output chung chung thường do thiếu bối cảnh cụ thể. Output lạc đề thường do không nói mục tiêu và người đọc.",
      "Ràng buộc rõ và ví dụ mẫu là thêm thông tin. Một ví dụ cho Claude thấy output trông thế nào: giọng, độ dài, định dạng."
    ],
    opts: [
      { k: "A", gist: "A prompt that names a topic but does not say what the task is, who the audience is, or how the output should be structured.",
        why: [
          "Đúng: chỉ có chủ đề thì thiếu đúng ba phần quyết định output: việc, người đọc, định dạng (ý 1).",
          "Claude phải tự lấp cả ba (ý 2). Ví dụ minh họa: prompt chỉ ghi “khảo sát nhân viên quý 3” có thể ra một bài giới thiệu chung, trong khi người viết cần bản tóm tắt ngắn cho ban giám đốc. Đó là lạc đề vì không nói mục tiêu và người đọc (ý 3)."
        ] },
      { k: "B", gist: "A prompt that adds clear limits on length and tone.",
        why: [
          "Sai: giới hạn độ dài và giọng rõ ràng là thêm thông tin, bớt chỗ Claude phải đoán (ý 4).",
          "Đây là một cách chữa output chung chung, không phải nguyên nhân gây ra nó."
        ] },
      { k: "C", gist: "A prompt that explicitly states the role, the task, the audience and the required output format.",
        why: [
          "Sai: đây gần như là prompt đủ phần, bản ngược của A (ý 1).",
          "Dễ bị cuốn nếu đọc lướt, vì A và C cùng nhắc task, audience, format. Nhưng A nói “does not state” (không nói), còn C nói “explicitly names” (nói rõ)."
        ] },
      { k: "D", gist: "A prompt that includes a representative example of the output wanted.",
        why: [
          "Sai: một mẫu tiêu biểu cho Claude thấy output trông ra sao, nên nó bớt phải đoán giọng, độ dài, định dạng (ý 4).",
          "Đây là cách chặn output lệch, không phải nguyên nhân gây ra nó."
        ] }
    ],
    refs: [
      { label: "Bài nền tảng Domain 1, bảng “Các phần của một prompt tốt”: thiếu phần nào thì Claude làm gì", href: NOTES + "#l-1-0" },
      { label: "Bài 1.3, bảng “Đọc triệu chứng, tìm phần của prompt gây ra”: chung chung do thiếu bối cảnh, lạc đề do không nói mục tiêu và người đọc", href: NOTES + "#l-1-3" },
      { label: "Bài 1.1, quy tắc cuối bài: điều gì mày biết mà Claude cần thì viết vào prompt", href: NOTES + "#l-1-1" }
    ]
  },
  {
    de: 4, n: 104, total: 119, sub: "6.2", subName: "Dữ liệu nhạy cảm và quy định",
    answer: "AE",
    ask: "An HR specialist is reviewing data items proposed for a Claude prompt on a routine task. Which two items are suitable to include? (Choose two.)",
    scene: [
      "Một chuyên viên nhân sự xem từng món dữ liệu định đưa vào prompt cho một việc thường ngày.",
      "Năm phương án là năm món dữ liệu, mỗi món đi kèm một mục đích dùng nghe hợp lý.",
      "Chỗ khó: món nào cũng phục vụ một việc có thật. Phải hỏi món đó có chỉ ra một người cụ thể không, và việc có thật sự cần chi tiết đó không."
    ],
    asks: [
      "Hai món nào đưa vào prompt được cho một việc thường ngày?",
      "Tức là: áp tối thiểu hóa dữ liệu. Món nào giúp việc xong mà không lộ ra người cụ thể nào thì đưa được."
    ],
    facts: [
      "Data minimization (tối thiểu hóa dữ liệu): chỉ đưa cho Claude phần dữ liệu việc thật sự cần. Trước khi gửi, hỏi: dữ liệu thuộc nhóm nào, việc có cần chi tiết định danh không.",
      "Các nhóm nhạy cảm: định danh cá nhân, tài chính, sức khỏe, nhân sự, đăng nhập, mật doanh nghiệp. Định danh là thông tin chỉ ra một người, một mình hoặc khi ghép vài cột lại.",
      "Ba cách bớt dữ liệu mà việc vẫn xong: bỏ phần không cần, đổi mã hoặc che (redact), gộp thành số tổng hợp. Anonymize (ẩn danh) là bỏ hoặc thay thông tin định danh để không lần ra người thật.",
      "Đã gửi thì dữ liệu nằm trong chat, theo luật lưu trữ của tài khoản. Xóa chat giảm được, không gỡ được hết. Mọi quyết định nằm ở trước khi bấm gửi."
    ],
    opts: [
      { k: "A", gist: "A job description, already redacted, that Claude will adapt into a job posting.",
        why: [
          "Đúng: mô tả công việc nói về một vị trí, không về một người. Phần nhạy cảm lại đã được che (ý 3).",
          "Viết lại thành tin tuyển dụng không cần gì thêm ngoài chính văn bản đó (ý 1)."
        ] },
      { k: "B", gist: "Notes on an employee's accommodation request, taken from their HR file, to draft a memo adjusting their role.",
        why: [
          "Sai: accommodation request (yêu cầu điều chỉnh công việc cho hợp hoàn cảnh riêng của người lao động) gắn với một người cụ thể, và thường dính tới sức khỏe. Đây là dữ liệu nhân sự, lại có thể là sức khỏe (ý 2).",
          "Lấy nguyên ghi chú trong hồ sơ của một người là đưa nhiều hơn việc cần (ý 1). Gửi rồi thì không gỡ lại được hết (ý 4).",
          "Dễ bị cuốn vì mục đích có thật: cần soạn thư điều chỉnh vai trò. Nhưng mục đích có thật không làm món dữ liệu bớt nhạy cảm."
        ] },
      { k: "C", gist: "Employee ID numbers and hire dates for the team roster, so Claude can personalise onboarding messages.",
        why: [
          "Sai: mã nhân viên là định danh, ghép với ngày vào làm thì chỉ ra đúng từng người (ý 2).",
          "Viết thư chào đón nhân viên mới không cần mã nhân viên. Đưa cả danh sách là thừa so với việc (ý 1).",
          "Dễ bị cuốn vì không có lương, không có bệnh án, trông vô hại. Nhưng định danh nhân viên vẫn là dữ liệu cá nhân, và việc này không cần nó."
        ] },
      { k: "D", gist: "A compensation band summary listing one team's employees by name with their current salaries.",
        why: [
          "Sai: tên gắn với lương hiện tại là định danh cộng tài chính, hai nhóm nhạy cảm cùng lúc (ý 2).",
          "Chữ “summary” (tóm tắt) không biến nó thành số gộp: vẫn còn tên và lương của từng người (ý 3). Việc thường ngày không cần chi tiết đó (ý 1)."
        ] },
      { k: "E", gist: "An anonymised summary of an HR policy that Claude will reword.",
        why: [
          "Đúng: tóm tắt chính sách đã ẩn danh, không chứa thông tin về người cụ thể nào (ý 3).",
          "Diễn đạt lại một chính sách không cần gì thêm. Đây là ca dùng thường ngày điển hình (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 6.2, mục “Kiểm trước khi gửi” và “Ba cách bớt dữ liệu mà việc vẫn xong”: tối thiểu hóa, đổi mã, che, gộp", href: NOTES + "#l-6-2" },
      { label: "Bài nền tảng Domain 6: các nhóm dữ liệu nhạy cảm, gồm cả nhân sự", href: NOTES + "#l-6-0" }
    ]
  },
  {
    de: 4, n: 105, total: 119, sub: "6.1", subName: "Việc nào giao cho Claude được",
    answer: "B",
    ask: "Before approving a proposed Claude use case for your team, you assess it. What is the correct order of the assessment steps?<br>(1) Work out who the outputs are for, what decisions they affect, and whether they can be reversed.<br>(2) Work out which kinds of data are involved and whether sensitive data is in play.<br>(3) Compare the use case with company policy and the relevant regulatory considerations.<br>(4) Decide whether the use case goes ahead, needs changes, or is declined.<br>(5) Record the outcome and the reasoning behind it so it can be traced later.",
    scene: [
      "Nhóm đề xuất một use case (một nhu cầu cụ thể cần Claude giải quyết). Mày phải đánh giá trước khi duyệt.",
      "Năm bước: (1) output cho ai, ảnh hưởng quyết định nào, rút lại được không; (2) dữ liệu nào dính vào, có nhạy cảm không; (3) đối chiếu chính sách công ty và quy định; (4) quyết cho làm, sửa, hay từ chối; (5) ghi lại kết quả và lý do.",
      "Chỗ khó: theo các ý ở phần “Cần biết trước”, thứ tự hợp lý là 1, 2, 3, 4, 5, mà không dãy nào ra như vậy. Cả bốn dãy đều đặt (5) trước (4) và để (2) cuối cùng. Phải chọn dãy ít sai nhất."
    ],
    asks: [
      "Thứ tự đúng của các bước đánh giá là gì?",
      "Tức là: bước nào phải có kết quả thì bước sau mới làm được. Không dãy nào đúng hẳn, nên chọn dãy giữ được nhiều quan hệ trước sau đúng nhất.",
      "Soi từng dãy: bước đầu tiên là gì, và (3) đối chiếu chính sách có đứng sau (1) không."
    ],
    facts: [
      "Đánh giá use case bắt đầu từ việc nó làm ra gì, cho ai. Mức rủi ro xếp theo output: có tới một người cụ thể, ảnh hưởng quyền lợi của họ không; nếu sai thì ai thấy, sửa có kịp không (phép thử “kiểm được, sửa được”). Bước (1) trả lời đúng mấy câu này.",
      "Chính sách và quy định áp theo loại dữ liệu: GDPR cho dữ liệu cá nhân, HIPAA cho thông tin sức khỏe. Câu “dữ liệu này thuộc nhóm nào?” đi trước câu “chính sách nói gì về nhóm đó?”. Nên (2) cần làm trước (3).",
      "Khi chính sách và yêu cầu va nhau, bước cuối là ghi lại quyết định, để lần sau không phải hỏi lại. Chưa quyết thì chưa có gì để ghi, nên (4) đi trước (5)."
    ],
    opts: [
      { k: "A", gist: "3, 1, 5, 4, 2",
        why: [
          "Sai ở bước đầu: đối chiếu chính sách (3) khi chưa biết use case làm ra gì, cho ai, sai thì hậu quả ra sao (ý 1). Chưa có gì cụ thể để đem so.",
          "Còn mắc thêm hai lỗi chung của cả bốn dãy: ghi kết quả (5) trước khi quyết (4) (ý 3), và kiểm dữ liệu (2) sau cùng, sau cả lúc đã đối chiếu chính sách (ý 2)."
        ] },
      { k: "B", gist: "1, 3, 5, 4, 2",
        why: [
          "Dãy ít sai nhất: chỉ dãy này mở đầu bằng (1), hiểu use case và mức rủi ro của output trước (ý 1). Đối chiếu chính sách (3) cũng đứng sau (1).",
          "Vẫn còn hai chỗ sai mà dãy nào cũng mắc: ghi kết quả (5) trước khi quyết (4) (ý 3), và kiểm dữ liệu (2) bị đẩy xuống cuối dù chính sách áp theo loại dữ liệu (ý 2). B không thêm lỗi nào khác, nên chọn B."
        ] },
      { k: "C", gist: "5, 3, 1, 4, 2",
        why: [
          "Sai nặng nhất ở bước đầu: ghi “kết quả và lý do” (5) khi chưa đánh giá gì, chưa quyết gì (ý 3).",
          "Sau đó đối chiếu chính sách (3) trước khi hiểu use case (1) (ý 1), cộng thêm (2) ở cuối như mọi dãy."
        ] },
      { k: "D", gist: "3, 5, 1, 4, 2",
        why: [
          "Sai ở hai bước đầu: đối chiếu chính sách (3) rồi ghi kết quả (5), cả hai đều trước khi biết use case làm ra gì, cho ai (1) (ý 1, 3).",
          "Dễ bị cuốn nếu đã gặp câu này ở bộ đề khác: ở bản đánh số cũ, dãy 3, 5, 1, 4, 2 là đáp án đúng. Ở đây các bước đã được đánh số lại, nên cùng dãy chữ số mang nghĩa khác hẳn."
        ] }
    ],
    dispute: "Đề gốc chấm B, sổ giữ B, nhưng câu này lỗi ở đề. Cùng câu ở Đề 2 câu 17 đánh số bước khác: (1) chính sách, (2) ghi lại, (3) người đọc và hậu quả, (4) quyết, (5) dữ liệu. Ở đó dãy 3, 5, 1, 4, 2 cho đúng thứ tự người đọc → dữ liệu → chính sách → quyết → ghi lại. Bản này đánh số lại các bước nhưng giữ nguyên bốn dãy chữ số, nên không dãy nào ra thứ tự hợp lý 1, 2, 3, 4, 5. B là dãy ít sai nhất. Lời giải gốc cố biện minh cho việc ghi lý do trước khi quyết và kiểm dữ liệu sau cùng, gọi đó là “implementation-level check” (bước kiểm ở mức triển khai). Notes không ủng hộ hai chỗ đó: chính sách áp theo loại dữ liệu nên phải biết dữ liệu trước, và quyết xong mới ghi lại.",
    refs: [
      { label: "Bài 6.1, bảng “Ba vùng, mỗi vùng một câu hỏi” và phép thử “kiểm được, sửa được”: xếp use case theo output và hậu quả", href: NOTES + "#l-6-1" },
      { label: "Bài 6.2, mục “Kiểm trước khi gửi” và “Quy định: GDPR, HIPAA”: biết dữ liệu thuộc nhóm nào rồi mới hỏi chính sách nói gì", href: NOTES + "#l-6-2" },
      { label: "Bài 6.3, mục “Khi chính sách và yêu cầu va nhau”: ghi lại quyết định ở bước cuối", href: NOTES + "#l-6-3" }
    ]
  },
  {
    de: 4, n: 106, total: 119, sub: "1.3", subName: "Lặp prompt: chẩn đoán, đổi một chỗ, thử lại",
    answer: "AC",
    ask: "Claude's first output is partly useful, but its tone and level of detail are off. Which two refinements are most likely to produce a meaningfully better output? (Choose two.)",
    scene: [
      "Output đầu tiên của Claude dùng được một phần.",
      "Còn hai chỗ hỏng: giọng văn, và mức chi tiết.",
      "Chỗ khó: ba phương án sai đều là chạy lại theo một cách khác, không thêm thông tin nào vào prompt."
    ],
    asks: [
      "Hai cách chỉnh nào dễ cho output tốt hơn rõ rệt nhất?",
      "Tức là: cách nào đổi được điều kiện gây ra giọng lệch và chi tiết lệch, chứ không chỉ cho ra một bản khác."
    ],
    facts: [
      "Lặp prompt là đọc triệu chứng, tìm phần prompt gây ra, rồi đổi đúng phần đó. Gõ lại y nguyên hay “viết hay hơn đi” giữ nguyên điều kiện gây lỗi: ra một bản khác, không chắc tốt hơn.",
      "Bối cảnh của prompt là cho ai đọc, để làm gì. Thiếu người đọc thì Claude viết cho một người đọc chung chung. Output nông, chung chung thường do thiếu bối cảnh và không nói cần sâu tới đâu.",
      "Mẫu thật đáng tin hơn tả giọng bằng tính từ. Một ví dụ cho Claude thấy output đạt chuẩn trông thế nào: giọng, độ dài, độ chi tiết.",
      "Temperature (độ ngẫu nhiên) không có nút trong app, và nó cũng không làm Claude theo lời dặn tốt hơn."
    ],
    opts: [
      { k: "A", gist: "Supply an example of output that meets the standard you want.",
        why: [
          "Đúng: một ví dụ cho thấy cùng lúc giọng và mức chi tiết cần có, đúng hai chỗ đang hỏng (ý 3).",
          "Đây là thêm thông tin Claude đang thiếu, không phải nhắc lại lời cũ (ý 1)."
        ] },
      { k: "B", gist: "Add the words “please do better” to the end of the original prompt.",
        why: [
          "Sai: “please do better” (làm tốt hơn đi) không nói tốt hơn ở đâu. Giọng nào, chi tiết tới đâu, Claude vẫn phải đoán (ý 1).",
          "Thêm nhấn mạnh, không thêm thông tin. Bản sau khác bản trước, không chắc tốt hơn."
        ] },
      { k: "C", gist: "Add a specific description of the tone and a concrete audience to the prompt.",
        why: [
          "Đúng: người đọc cụ thể quyết giọng và độ sâu, mô tả giọng cụ thể bớt chỗ Claude phải đoán (ý 2).",
          "Sửa đúng phần prompt gây ra triệu chứng, đúng vòng chẩn đoán, đổi, thử lại (ý 1)."
        ] },
      { k: "D", gist: "Turn the temperature up and resubmit the prompt unchanged.",
        why: [
          "Sai: người dùng app không có nút temperature, và nó không làm Claude theo lời dặn tốt hơn (ý 4).",
          "Prompt giữ nguyên thì điều kiện gây giọng lệch vẫn còn. Tăng ngẫu nhiên chỉ cho output lệch theo kiểu khác."
        ] },
      { k: "E", gist: "Submit the same prompt several times and pick the best reply.",
        why: [
          "Sai: gõ lại y nguyên giữ nguyên điều kiện gây lỗi. Mỗi lần ra một bản khác, không bản nào được thêm thông tin (ý 1).",
          "Dễ bị cuốn vì đôi khi bốc được một bản khá hơn. Nhưng đó là may, lần sau gặp việc tương tự lại phải bốc tiếp."
        ] }
    ],
    refs: [
      { label: "Bài 1.3, bảng “Đọc triệu chứng, tìm phần của prompt gây ra” và các cách sửa nghe hợp lý mà không sửa gì", href: NOTES + "#l-1-3" },
      { label: "Bài 1.4, mục soạn thảo: mẫu thật đáng tin hơn tả giọng bằng tính từ", href: NOTES + "#l-1-4" },
      { label: "Bài 1.1, mục “Biết thêm”: đáp án nhắc chỉnh temperature thì loại", href: NOTES + "#l-1-1" }
    ]
  },
  {
    de: 4, n: 107, total: 119, sub: "7.2", subName: "Chỉnh theo phản hồi",
    answer: "DE",
    ask: "You are reviewing how colleagues responded to feedback on communications that Claude drafted. Which two responses to the feedback are productive? (Choose two.)",
    scene: [
      "Đồng nghiệp nhận góp ý cho các văn bản do Claude soạn. Mày xem họ xử lý góp ý thế nào.",
      "Năm cách phản ứng: không sửa vì tin Claude, gộp mọi góp ý cùng lúc kể cả góp ý trái nhau, hoãn hết, hỏi lại khi góp ý mơ hồ, ghi rõ mỗi góp ý dẫn tới thay đổi nào.",
      "Chỗ khó: cách nào cũng có một lý do nghe được: tin công cụ, tôn trọng mọi người góp ý, giữ bản nháp nhất quán."
    ],
    asks: [
      "Hai cách phản ứng nào là hiệu quả?",
      "Tức là: cách nào biến góp ý thành thay đổi đúng chỗ, và cho thấy góp ý đã được xử lý."
    ],
    facts: [
      "Phản hồi là triệu chứng, không phải đơn thuốc. Đọc để tìm gốc trước khi sửa, đừng làm theo nguyên văn. Góp ý mơ hồ kiểu “chưa ổn lắm” thì xin ví dụ cụ thể: output đã ghi gì, lẽ ra phải ghi gì.",
      "Góp ý trái chiều thì đừng sửa theo bên chê to nhất. Viết chuẩn đạt cụ thể trước, rồi chấm output theo chuẩn đó.",
      "Mỗi vòng đổi một chỗ: đổi nhiều thứ một lúc thì không biết thay đổi nào có tác dụng. Phản hồi càng sớm càng rẻ.",
      "Claude soạn, người gửi quyết và chịu trách nhiệm, dù Claude soạn bao nhiêu."
    ],
    opts: [
      { k: "A", gist: "Refusing to revise the sections Claude generated, on the grounds that the model's output should be trusted as written.",
        why: [
          "Sai: phần Claude soạn không được miễn kiểm. Người gửi vẫn là người chịu trách nhiệm (ý 4).",
          "Góp ý đang chỉ ra một chỗ hỏng thật. Bỏ qua nó là gửi đi một văn bản đã biết có lỗi."
        ] },
      { k: "B", gist: "Folding every piece of feedback, contradictory suggestions included, into the next draft all at once.",
        why: [
          "Sai: góp ý trái nhau thì không làm theo cả hai cùng lúc được. Phải thống nhất chuẩn đạt trước (ý 2).",
          "Đổi mọi thứ một lần thì không biết thay đổi nào sửa được gì, thay đổi nào làm hỏng (ý 3).",
          "Dễ bị cuốn vì nghe như tôn trọng mọi người góp ý. Nhưng bản nháp sau sẽ tự mâu thuẫn, và cả hai bên đều không vừa ý."
        ] },
      { k: "C", gist: "Putting all feedback off to a later revision cycle so the current draft stays consistent.",
        why: [
          "Sai: phản hồi càng sớm càng rẻ (ý 3). Hoãn hết thì lỗi đã biết vẫn nằm trong bản đang dùng.",
          "Một bản nhất quán mà có lỗi đã biết thì cái nhất quán đó không cứu được gì."
        ] },
      { k: "D", gist: "Asking clarifying questions when a piece of feedback is ambiguous, before acting on it.",
        why: [
          "Đúng: góp ý mơ hồ chưa cho biết triệu chứng. Hỏi lại để có ví dụ cụ thể rồi mới biết sửa chỗ nào (ý 1).",
          "Sửa theo phỏng đoán có thể sửa trượt, hoặc phá luôn phần đang tốt."
        ] },
      { k: "E", gist: "Linking each piece of feedback to the specific change it produced in the next draft.",
        why: [
          "Đúng: mỗi góp ý ứng với một thay đổi rõ ràng, nên biết thay đổi nào xử lý góp ý nào (ý 3).",
          "Người góp ý kiểm được ý mình đã được xử lý chưa. Góp ý nào chưa có thay đổi tương ứng cũng lộ ra ngay."
        ] }
    ],
    refs: [
      { label: "Bài 7.2, mục “Đọc phản hồi để tìm gốc” và “Ý kiến trái chiều: thống nhất chuẩn đạt trước”", href: NOTES + "#l-7-2" },
      { label: "Bài 4.3: người dùng chỉ nói “chưa ổn lắm” thì xin ví dụ cụ thể trước khi đổi gì", href: NOTES + "#l-4-3" },
      { label: "Bài 6.4, mục “Bạn gửi thì bạn chịu”: trách nhiệm với output Claude soạn", href: NOTES + "#l-6-4" }
    ]
  },
  {
    de: 4, n: 108, total: 119, sub: "4.1", subName: "Phân tích use case",
    answer: "C",
    ask: "A project manager is working out how Claude can help with requirements analysis on an upcoming engagement. During discovery, the team will interview stakeholders and review the existing process documentation. Which activity is a good fit for this work?",
    scene: [
      "Một quản lý dự án tìm chỗ Claude giúp được trong phân tích yêu cầu (requirements analysis) cho một dự án sắp làm.",
      "Ở giai đoạn discovery (tìm hiểu ban đầu), nhóm sẽ phỏng vấn stakeholder (những người có quyền lợi hay tiếng nói trong dự án) và đọc tài liệu quy trình đang có.",
      "Chỗ khó: cả bốn phương án đều giao cho Claude một việc. Khác nhau ở chỗ Claude làm trên nguồn nào, và ai giữ phần hỏi, phần quyết."
    ],
    asks: [
      "Hoạt động nào hợp với việc phân tích yêu cầu này?",
      "Tức là: dùng Claude ở đâu để tận dụng đúng hai nguồn nhóm sẽ có (biên bản phỏng vấn, tài liệu quy trình), mà kết quả vẫn kiểm được.",
      "Soi từng phương án: Claude làm trên dữ kiện thật hay tự nghĩ ra, kết quả có truy về nguồn được không, người còn giữ phần hỏi và phần quyết không."
    ],
    facts: [
      "Việc hợp Claude: nhiều chữ, mô tả rõ được, đầu ra kiểm được. Gom biên bản và tài liệu thành một danh sách có cấu trúc là đúng kiểu việc này.",
      "Thiếu nguồn thì Claude dùng kiến thức chung, có khi bịa. Yêu cầu của một dự án nằm ở stakeholder và quy trình của chính dự án đó.",
      "Bảo Claude trích nguyên văn, ghi nguồn cho từng ý thì mỗi kết luận truy được về một đoạn, người duyệt kiểm nhanh. Ý không truy được nguồn là chỗ phải nghi.",
      "Chia vai: Claude đặt câu hỏi, gắn nhãn, chỉ chỗ mơ hồ hay mâu thuẫn. Người hỏi những người đang làm việc thật, cùng stakeholder trả lời và ra quyết định cuối."
    ],
    opts: [
      { k: "A", gist: "Have Claude write a complete requirements list from just the project name and a short description, since requirements for similar engagements are mostly standard.",
        why: [
          "Sai ở giả định “largely standard” (phần lớn là chuẩn chung). Yêu cầu nằm ở stakeholder và quy trình của chính dự án này, đúng hai nguồn mà phương án bỏ qua (ý 2).",
          "Claude sẽ điền bằng kiến thức chung: một danh sách đọc rất ổn mà không truy được về ai đòi gì (ý 3). Phần nhóm sắp thu được từ phỏng vấn cũng không dùng tới."
        ] },
      { k: "B", gist: "Have Claude prioritise the requirements the team has already collected, and leave the collecting itself to manual analyst work because prioritising takes more time.",
        why: [
          "Xếp ưu tiên theo tiêu chí người nêu là một cách dùng Claude được. Cái sai là chỗ đặt: phần gom từ phỏng vấn và tài liệu mới là phần nhiều chữ nhất, đúng kiểu việc hợp Claude (ý 1), mà B lại để làm tay.",
          "Lý do “prioritization is more time-consuming” (xếp ưu tiên tốn thời gian hơn) không có căn cứ nào trong đề.",
          "Dễ bị cuốn vì xếp ưu tiên nghe giống phân tích yêu cầu. Nhưng đề kể giai đoạn discovery, nơi việc chính là gom và cấu trúc hóa những gì vừa thu được."
        ] },
      { k: "C", gist: "Have Claude synthesise the stakeholder input and the existing process documents into a structured requirements list, with each item traced back to its source.",
        why: [
          "Đúng: Claude làm phần nhiều chữ, trên đúng hai nguồn thật của dự án (ý 1, 2).",
          "Mỗi yêu cầu ghi nguồn, nên người phân tích dò lại được từng mục, bắt được mục không có căn cứ (ý 3). Người vẫn phỏng vấn, vẫn duyệt và chốt (ý 4)."
        ] },
      { k: "D", gist: "Have Claude carry out the stakeholder interviews itself, with the analyst going through the recordings afterwards to confirm the requirements Claude extracted.",
        why: [
          "Sai vai: phỏng vấn là lúc người phân tích hỏi người đang làm việc thật, nghe ra quyết định ngầm, đường tắt không ai ghi lại, và hỏi tiếp ngay tại chỗ (ý 4). Giao phần đó đi thì người phân tích chỉ còn nghe lại.",
          "Nghe lại bản ghi chỉ xác nhận được những gì đã được hỏi. Câu không ai hỏi thì bản ghi không có, và lúc đó buổi phỏng vấn đã xong."
        ] }
    ],
    refs: [
      { label: "Bài 4.1, mục “Xem việc đang được làm thật thế nào” và bảng “Việc nào hợp Claude, việc nào chưa, việc nào cần người”", href: NOTES + "#l-4-1" },
      { label: "Bài 2.3, bảng cách hỏi giúp kiểm: trích nguyên văn trước, mỗi kết luận truy được về một đoạn", href: NOTES + "#l-2-3" }
    ]
  },
  {
    de: 4, n: 109, total: 119, sub: "4.1", subName: "Phân tích use case",
    answer: "D",
    ask: "An account manager had Claude extract requirements from stakeholder notes. Three of them seem to conflict: two stakeholders asked for workflow steps that rule each other out, and a third requirement assumes an outcome those two steps would prevent. What is the most appropriate action?",
    scene: [
      "Một account manager (người phụ trách khách hàng) nhờ Claude trích yêu cầu từ ghi chú của các stakeholder.",
      "Ba yêu cầu đá nhau: hai stakeholder đòi hai bước quy trình loại trừ nhau, yêu cầu thứ ba lại giả định một kết quả mà hai bước kia chặn mất.",
      "Chỗ khó: Claude đã làm xong phần trích. Việc còn lại là quyết bên nào nhường. Đó là quyết định về ưu tiên của người khác, không phải việc soạn chữ."
    ],
    asks: [
      "Làm gì là hợp nhất?",
      "Tức là: ai có quyền gỡ mâu thuẫn giữa các stakeholder, và tài liệu yêu cầu phải ghi gì để họ gỡ được.",
      "Soi từng phương án: ai ra quyết định, mâu thuẫn có được gọi tên không, mỗi bên có truy về đúng người nêu không."
    ],
    facts: [
      "Chia vai khi dùng Claude với yêu cầu: Claude đặt câu hỏi, gắn nhãn, chỉ chỗ mơ hồ hay mâu thuẫn. Người trả lời câu hỏi cùng stakeholder và ra quyết định cuối.",
      "Để Claude tự giải các chỗ mơ hồ rồi chốt luôn bản yêu cầu là một cách dùng sai mà notes nêu tên.",
      "Cắt một yêu cầu, chấp nhận một đánh đổi là phần quyết: có hậu quả cho người khác, cần người chịu trách nhiệm. Claude chuẩn bị, người quyết. Gỡ lúc yêu cầu còn là nháp thì còn rẻ.",
      "Yêu cầu tốt là câu mà người lạ đọc vào chấm được đạt hay không đạt. Hai yêu cầu loại trừ nhau thì không giải pháp nào đạt cả hai."
    ],
    opts: [
      { k: "A", gist: "Put all three conflicting requirements into the requirements document as alternative options, and leave the choice to the project's decision process later on.",
        why: [
          "Có nêu đủ ba, nhưng không gọi chúng là mâu thuẫn, không ghi ai nêu, không giao cho ai gỡ. “Later” (để sau) nghĩa là chưa ai chịu trách nhiệm quyết (ý 1, 3).",
          "Hậu quả: tài liệu yêu cầu chứa ba thứ không thể cùng đạt (ý 4). Người làm bước sau sẽ tự chọn một bên, hoặc làm dở cả hai.",
          "Dễ bị cuốn vì nghe trung lập, không tự ý bỏ ai. Nhưng không có người gỡ thì mâu thuẫn chỉ bị đẩy xuống bước sau, nơi sửa đắt hơn (ý 3)."
        ] },
      { k: "B", gist: "Use Claude to write compromise wording for each conflict and send that compromise to the stakeholders as the proposed resolution.",
        why: [
          "Sai vai: Claude đang gỡ mâu thuẫn thay người (ý 1, 2). Gửi đi dưới dạng “proposed resolution” (cách giải quyết đề xuất) là đặt sẵn quyết định cho stakeholder.",
          "Hai bước loại trừ nhau không gỡ được bằng câu chữ. Câu thỏa hiệp nghe êm có khi chỉ che mâu thuẫn đi, còn yêu cầu thứ ba vẫn treo (ý 4).",
          "Dễ bị cuốn vì vẫn gửi về stakeholder. Nhưng thứ gửi về là một lời giải Claude soạn sẵn, không phải mâu thuẫn kèm nguồn để họ tự gỡ."
        ] },
      { k: "C", gist: "Pick the requirement with the strongest business justification in the source notes, set the conflicting ones aside, and proceed with the one chosen.",
        why: [
          "Sai người quyết: account manager tự bỏ yêu cầu của hai stakeholder mà không hỏi họ. Cắt yêu cầu là phần quyết, cần người có thẩm quyền đứng tên (ý 3).",
          "“Strongest business justification in the source notes” (lý do kinh doanh mạnh nhất trong ghi chú) chỉ đo được những gì người ta đã viết ra. Lý do không được ghi lại thì bị bỏ qua."
        ] },
      { k: "D", gist: "Flag the conflicts in the requirements document, record the source of each side, and send the conflicts back to the stakeholders who raised them to resolve.",
        why: [
          "Đúng chia vai: phần soát và đánh dấu đã xong, quyết định trả về đúng người có quyền (ý 1, 3).",
          "Ghi nguồn từng bên cho stakeholder thấy ai đòi gì, để gỡ trên dữ kiện thật. Tài liệu không chốt một bộ yêu cầu không thể cùng đạt (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 4.1, mục “Dùng Claude soát yêu cầu khi còn là bản nháp”: Claude đặt câu hỏi, gắn nhãn; người cùng stakeholder trả lời và chốt", href: NOTES + "#l-4-1" },
      { label: "Bài nền tảng Domain 4, mục “Giao phần làm, giữ phần quyết”: cắt một yêu cầu là phần quyết", href: NOTES + "#l-4-0" }
    ]
  },
  {
    de: 4, n: 110, total: 119, sub: "3.2", subName: "Haiku, Sonnet, Opus khác nhau ở đâu",
    answer: "B",
    ask: "A knowledge worker is explaining the cost, speed and quality trade-offs among Claude models to a colleague. Which general statement describes this trade-off accurately?",
    scene: [
      "Một nhân viên văn phòng giải thích cho đồng nghiệp chuyện đánh đổi chi phí, tốc độ, chất lượng giữa các model Claude.",
      "Đề dùng chữ “rate limit” (giới hạn mức dùng). Với người dùng app, ý tương ứng là hạn mức dùng (usage limit): lượng việc được nhờ Claude trong một khoảng thời gian (gói trả phí tính theo phiên 5 giờ và theo tuần), dùng chung cho mọi chat.",
      "Chỗ khó: các phương án sai đều kèm một cơ chế nghe có lý (lập luận hiệu quả hơn, phải chạy nhiều lượt). Phải nắm quy luật chung thì không bị cơ chế dắt đi."
    ],
    asks: [
      "Câu khái quát nào mô tả đúng đánh đổi giữa các model?",
      "Tức là: lên tầng thì tốc độ và mức tiêu hạn mức đổi theo chiều nào.",
      "Soi từng phương án theo hai trục: nhanh hay chậm, tốn hạn mức nhiều hay ít."
    ],
    facts: [
      "Haiku, Sonnet, Opus là ba cỡ của cùng một họ model, nằm trên một trục đánh đổi: càng lên cao càng sâu, càng chậm, càng tốn.",
      "Tốc độ: Haiku nhanh nhất, Sonnet nhanh, Opus chậm hơn hai tầng kia. Hạn mức trong app: Haiku nhẹ nhất, Sonnet vừa, Opus nặng.",
      "Theo giá API (chỉ để so tương đối), mỗi token Opus đắt gấp đôi Sonnet, còn Haiku rẻ hơn nhiều lần. Opus còn suy nghĩ nhiều hơn nên tiêu nhiều token hơn.",
      "Cùng một lượng việc, tầng nặng trừ hạn mức nhanh hơn. Vì vậy việc dễ, nhiều thì để Haiku, giữ Opus cho việc khó."
    ],
    opts: [
      { k: "A", gist: "Speed and rate-limit use have nothing to do with capability; Haiku, Sonnet and Opus differ only in how deeply they reason.",
        why: [
          "Sai ở chữ “alone” (duy nhất). Các tầng khác nhau cả ở tốc độ và mức tiêu hạn mức, không chỉ ở độ sâu (ý 1, 2).",
          "Tin câu này thì chạy cả việc dễ trên Opus mà không thấy cái giá, tới giữa tuần hết hạn mức (ý 4)."
        ] },
      { k: "B", gist: "More capable models generally use more of the rate limit and run more slowly, while lighter models are faster and use less of it.",
        why: [
          "Đúng cả hai trục: tầng mạnh chậm hơn và tốn hạn mức hơn, tầng nhẹ nhanh hơn và nhẹ hơn (ý 1, 2, 3).",
          "Chữ “generally” (nói chung) hợp với một câu khái quát: đây là quy luật để chọn tầng theo việc (ý 4)."
        ] },
      { k: "C", gist: "More capable models generally use less of the rate limit because they reason more efficiently, although they run more slowly than lighter models.",
        why: [
          "Đúng nửa tốc độ, sai nửa hạn mức. Mỗi token của tầng mạnh đắt hơn, và Opus còn suy nghĩ nhiều hơn nên tiêu nhiều token hơn (ý 3).",
          "Dễ bị cuốn vì “reason more efficiently” (lập luận hiệu quả hơn) nghe như làm gọn hơn. Nhưng notes ghi ngược lại: cùng một lượng việc, tầng nặng trừ hạn mức nhanh hơn (ý 4)."
        ] },
      { k: "D", gist: "Lighter models use more of the rate limit per request than more capable ones, because they need several passes to reach heavier-model quality.",
        why: [
          "Sai ở cơ chế: không nguồn nào nói tầng nhẹ phải chạy nhiều lượt cho một yêu cầu. Mỗi token của tầng nhẹ còn rẻ hơn nhiều (ý 3).",
          "Đảo ngược đúng quy luật ở ý 2. Theo câu này thì nên dồn mọi việc lên Opus cho đỡ hạn mức, tức là đúng cách hết hạn mức sớm nhất (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 3.2, bảng “Ba tầng của cùng một họ model” và mục “Hạn mức: tầng nặng tiêu nhanh hơn”", href: NOTES + "#l-3-2" },
      { label: "Bài 3.3, mục “Bốn câu hỏi trước khi chọn”: cân chi phí, tốc độ, chất lượng theo việc", href: NOTES + "#l-3-3" }
    ]
  },
  {
    de: 4, n: 111, total: 119, sub: "3.1", subName: "Chọn tính năng: chat, Project, Research, artifact",
    answer: "B",
    ask: "A finance manager must pick the Claude feature for a task that needs deterministic calculations spanning a spreadsheet with multiple tabs. Which option fits that requirement best?",
    scene: [
      "Một quản lý tài chính cần chạy phép tính trên một bảng tính có nhiều tab. Đề nhấn chữ “deterministic” (tất định: cùng đầu vào thì lần nào cũng ra cùng kết quả).",
      "Bốn phương án là bốn tính năng: artifact, Code Execution, Research, chat thường. Ba phương án sai tự nói luôn vì sao chúng không hợp.",
      "Chỗ khó: artifact và Research đều là tính năng mạnh, nghe như làm được. Nhưng chỉ một tính năng thật sự chạy phép tính trên file."
    ],
    asks: [
      "Chọn tính năng nào cho việc tính toán này?",
      "Tức là: tính năng nào cho con số được tính bằng code trên chính file tải lên, chứ không được viết ra như một đoạn chữ."
    ],
    facts: [
      "Code execution: Claude chạy code trong một môi trường cách ly (sandbox) để tạo, sửa file và phân tích file dữ liệu bạn tải lên. Đọc file XLSX cũng cần nó.",
      "Trong app, cài đặt này tên cũ là “Code execution and file creation”, giao diện mới gọi là “Create and edit files” (tạo và sửa file), ở Settings → Capabilities. Guide gọi là Code Execution. Cùng một tính năng.",
      "Phép tính chính xác là chỗ Claude hụt nếu chỉ “đọc” số: con số được đoán chứ không được tính, mà giọng vẫn rất chắc. Cách bù là cho Claude chạy code.",
      "Artifact là khung bên cạnh chat để xem, sửa, xuất một sản phẩm. Research chạy nhiều lượt tìm trên web và công cụ đã kết nối rồi viết bản tổng hợp, tốn hạn mức nhanh hơn chat thường."
    ],
    opts: [
      { k: "A", gist: "Rely on an artifact by itself: it gives a stable, editable place to hold the result, but it does not run the deterministic computation Code Execution would.",
        why: [
          "Sai ở chỗ nhầm nơi đặt kết quả với cách tính ra kết quả. Artifact là khung để xem, sửa, xuất (ý 4); chính phương án tự nhận nó không chạy phép tính.",
          "Dễ bị cuốn vì artifact cũng cần code execution bật mới chạy, nghe như cùng một thứ. Nhưng “artifact alone” (chỉ artifact) là chọn chỗ để số, không chọn cách tính số."
        ] },
      { k: "B", gist: "Use Code Execution, which runs code in a sandbox against the uploaded file to do the calculations and returns verified results the manager can check.",
        why: [
          "Đúng. Phép tính chạy bằng code trên chính file đã tải lên, cùng đầu vào thì ra cùng kết quả (ý 1, 3). Đó đúng là nghĩa của “deterministic”.",
          "Kết quả kiểm được: xem code lấy tab nào, cột nào, rồi đối chiếu vài con số với file gốc. Code tính đúng mà đọc nhầm tab thì vẫn sai, nên vẫn phải kiểm.",
          "Trong app hiện nay, tìm cài đặt “Create and edit files” (ý 2)."
        ] },
      { k: "C", gist: "Use Research for the calculations: it collects and synthesizes outside sources, which is not the right feature for exact computation on a spreadsheet already uploaded.",
        why: [
          "Sai ở chỗ dùng công cụ tìm nguồn cho một việc không thiếu nguồn. Dữ liệu đã nằm trong file; Research đi gom nguồn bên ngoài (ý 4).",
          "Còn tốn hạn mức nhanh hơn chat thường mà không thêm phép tính nào (ý 4)."
        ] },
      { k: "D", gist: "Use an ordinary chat prompt, which produces text without running code and so cannot give the verified, deterministic output a multi-tab calculation needs.",
        why: [
          "Sai ở giả định chat “đọc” số là đủ. Chat không chạy code thì con số được sinh ra như chữ, không được tính (ý 3).",
          "Bảng nhiều tab, cộng dồn qua nhiều chỗ, là đúng chỗ dễ sai. Số sai mà giọng rất chắc thì người đọc không thấy chỗ nào để nghi."
        ] }
    ],
    dispute: "Đáp án giữ B. “Code Execution” là tên guide dùng. Trong app, cài đặt này giờ tên là “Create and edit files” (tên cũ “Code execution and file creation”), cùng một tính năng. Help center (Create and edit files with Claude) ghi nó chạy trong “an isolated, sandboxed container” (một container cách ly) và cho tải lên “CSV, TSV, and other files for data analysis” (CSV, TSV và các file khác để phân tích dữ liệu).",
    refs: [
      { label: "Bài Nền tảng D3, định nghĩa Code execution: tên cũ, tên mới, nền của artifact và việc đọc XLSX", href: NOTES + "#l-3-0" },
      { label: "Bài 4.5, bảng bốn đặc tính: phép tính chính xác là chỗ hụt, cách bù là cho Claude chạy code", href: NOTES + "#l-4-5" },
      { label: "Help center, Create and edit files with Claude: container cách ly, tải file lên để phân tích", href: "https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude" }
    ]
  },
  {
    de: 4, n: 112, total: 119, sub: "7.1", subName: "Chẩn đoán output kém",
    answer: "C",
    ask: "While investigating a Claude reply, an associate finds that only one of the prompt's three required questions was answered. In the prompt, the three questions sat together in a single paragraph, divided only by commas. What is the most likely root cause?",
    scene: [
      "Prompt có ba câu hỏi bắt buộc, viết liền trong một đoạn, ngăn nhau chỉ bằng dấu phẩy. Claude trả lời đúng một câu.",
      "Đề cho đúng một dấu hiệu về prompt: cách viết ba câu hỏi. Không có chữ nào về độ dài prompt, người đọc hay giọng văn.",
      "Ví dụ minh họa:<pre><code>Prompt: Tóm tắt chi phí tháng 10, so với tháng 9, và đề xuất chỗ cắt giảm cho tháng 11.\nOutput: (một bản tóm tắt chi phí tháng 10 rất gọn, hết)</code></pre>"
    ],
    asks: [
      "Nguyên nhân gốc nào khả năng cao nhất?",
      "Tức là: từ triệu chứng (thiếu hai câu) và dấu hiệu duy nhất trong prompt (ba câu viết liền), chỉ ra chỗ prompt hỏng.",
      "Soi từng phương án: nguyên nhân nó nêu có dấu hiệu trong đề không, và sửa theo nó có trả về đủ ba câu không."
    ],
    facts: [
      "Chẩn đoán đi từ triệu chứng tới nguyên nhân, dựa trên cái thấy được trong prompt và output. Nguyên nhân không có dấu hiệu nào trong đề là đoán.",
      "Docs về prompt của Anthropic: “Provide instructions as sequential steps using numbered lists or bullet points when the order or completeness of steps matters” (đưa chỉ dẫn thành từng bước, dùng danh sách đánh số hoặc gạch đầu dòng khi thứ tự hay độ đủ quan trọng).",
      "Độ đủ đo bằng danh sách yêu cầu: mỗi câu hỏi một dòng, đánh dấu đã trả lời, trả lời một nửa, hay chưa có. Câu không thấy câu trả lời là chưa có.",
      "Phát hiện “một câu hỏi không được trả lời” đổi thành yêu cầu cụ thể: trả lời từng câu thành một mục đánh số."
    ],
    opts: [
      { k: "A", gist: "The prompt ran too long, so Claude locked onto whichever question had the most support in the surrounding context.",
        why: [
          "Sai ở chẩn đoán: đề không có dấu hiệu nào là prompt dài. Ba câu hỏi trong một đoạn là prompt ngắn (ý 1).",
          "Sửa theo hướng này là cắt bớt prompt. Ba câu vẫn viết liền, lần sau vẫn có thể thiếu.",
          "Dễ bị cuốn vì “prompt dài thì Claude bỏ sót” nghe như kinh nghiệm thật. Nhưng chẩn đoán phải bám dấu hiệu trong đề, không bám kinh nghiệm chung."
        ] },
      { k: "B", gist: "All the required questions were in fact covered implicitly across the reply, even though it did not visibly answer each of them.",
        why: [
          "Đây không phải nguyên nhân, mà là chối triệu chứng. Câu hỏi không thấy câu trả lời là chưa trả lời (ý 3).",
          "Người đọc không có cách kiểm một câu trả lời “ngầm”. Chấp nhận nó là bỏ qua đúng chỗ thiếu mà đề nêu."
        ] },
      { k: "C", gist: "The task statement did not list the three required questions explicitly enough for Claude to work through them one by one.",
        why: [
          "Đúng. Ba câu nối bằng dấu phẩy đọc như một câu hỏi có ba vế. Prompt không báo cả ba đều bắt buộc, mỗi câu một phần trả lời (ý 2).",
          "Khớp đúng dấu hiệu duy nhất trong đề (ý 1), và cách sửa đi thẳng vào nó: tách thành danh sách đánh số, dặn trả lời từng câu (ý 4)."
        ] },
      { k: "D", gist: "The audience and tone instructions outweighed the task statement, so Claude favoured voice over coverage.",
        why: [
          "Sai ở chẩn đoán: đề không nhắc chỉ dẫn nào về người đọc hay giọng văn. Nguyên nhân này không có dấu hiệu để đỡ (ý 1).",
          "Giọng văn đổi cách viết, không quyết trả lời mấy câu. Sửa giọng xong, ba câu vẫn nằm liền một đoạn."
        ] }
    ],
    refs: [
      { label: "Bài 7.1, bảng “Từ triệu chứng tới nguyên nhân”: đọc triệu chứng, tìm gốc trong prompt", href: NOTES + "#l-7-1" },
      { label: "Bài 2.1, mục “Đo độ đủ bằng một danh sách viết trước”: câu không được trả lời thì đòi từng câu thành mục đánh số", href: NOTES + "#l-2-1" },
      { label: "Docs, Prompting best practices: dùng danh sách đánh số khi thứ tự hay độ đủ quan trọng", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" }
    ]
  },
  {
    de: 4, n: 113, total: 119, sub: "4.3", subName: "Làm giải pháp cùng Claude",
    answer: "C",
    ask: "A sales manager is revising a solution prototype made with Claude. A stakeholder review flagged two specific concerns and approved the rest exactly as written. Which way of iterating is most likely to yield a strong next version?",
    scene: [
      "Một quản lý bán hàng làm một nguyên mẫu giải pháp (prototype) cùng Claude. Stakeholder duyệt xong: hai điểm cần sửa, phần còn lại “approved as written” (duyệt nguyên văn).",
      "Chỗ khó: ba phương án sai đều sửa nhiều hơn hai điểm, mỗi cái kèm một lý do nghe hợp lý: viết lại cho liền mạch, tiện tay cải thiện thêm, giữ giọng đồng đều."
    ],
    asks: [
      "Cách lặp nào nhiều khả năng cho bản sau tốt nhất?",
      "Tức là: sửa bao nhiêu, ở đâu, để phần đã duyệt không bị hỏng và vòng duyệt sau gọn.",
      "Soi từng phương án: có đụng vào phần đã duyệt không, có thêm thay đổi không ai yêu cầu không, vòng sau có biết đã đổi gì không."
    ],
    facts: [
      "Làm giải pháp đi theo vòng plan → verify → judge → refine (lên kế hoạch, kiểm, đánh giá, sửa). Bước refine sửa đúng chỗ phản hồi chỉ ra, mỗi lần một chỗ, rồi kiểm lại.",
      "Đổi một thứ rồi kiểm, để biết thay đổi nào gây ra lỗi mới. Đổi nhiều thứ cùng lúc thì không biết cái nào có tác dụng, cái nào làm hỏng.",
      "Ghi lại mỗi vòng: đổi gì, kết quả ra sao. Ba dòng là đủ.",
      "Phần stakeholder đã duyệt là phần đã qua bước judge. Đụng vào nó thì vòng sau phải duyệt lại cả phần đó."
    ],
    opts: [
      { k: "A", gist: "Start the prototype over with the two concerns built in, on the view that a fresh version absorbs feedback more cleanly than targeted edits.",
        why: [
          "Sai ở chỗ vứt bỏ phần đã được duyệt (ý 4). Bản viết lại có thể lệch ở những chỗ stakeholder vốn đã đồng ý.",
          "Vòng duyệt sau phải đọc lại toàn bộ thay vì hai chỗ, và hai chỗ cần sửa chìm giữa mọi thứ khác đã đổi (ý 2)."
        ] },
      { k: "B", gist: "Fix the two concerns and add a third improvement the manager noticed, since bundling review feedback with self-identified changes saves effort.",
        why: [
          "Sai ở chỗ gói thêm một thay đổi không ai yêu cầu vào cùng vòng (ý 2). Có lỗi mới thì không biết do hai chỗ sửa hay do phần thêm.",
          "Dễ bị cuốn vì “tiện tay làm luôn” nghe tiết kiệm. Nhưng cải tiến tự nghĩ ra chưa qua stakeholder; muốn làm thì nêu ở vòng duyệt sau, đừng trộn vào."
        ] },
      { k: "C", gist: "Fix the two concerns directly, leave the unrelated parts untouched, and note the changes for the next review.",
        why: [
          "Đúng bước refine: sửa đúng hai chỗ phản hồi chỉ ra (ý 1), không đụng phần đã duyệt (ý 4).",
          "Ghi lại thay đổi (ý 3) để vòng sau chỉ cần xem hai chỗ đó. Có gì hỏng thì biết ngay do thay đổi nào (ý 2)."
        ] },
      { k: "D", gist: "Fix the two concerns and also rework unrelated sections so the voice stays even across the prototype after the edits.",
        why: [
          "Sai ở chỗ sửa cả phần đã duyệt (ý 4). Nội dung đã chốt có thể đổi nghĩa khi bị viết lại cho “đều giọng”.",
          "Chỗ vừa sửa mà lệch giọng thì chỉnh chỗ vừa sửa cho khớp phần còn lại, không làm ngược lại."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, vòng plan → verify → judge → refine và mục “Sửa: mỗi lần một chỗ, phản hồi phải cụ thể”", href: NOTES + "#l-4-3" },
      { label: "Bài 7.1, mục “Vì sao chỉ đổi một thứ, và chạy lại cùng input”: ghi lại mỗi vòng đổi gì", href: NOTES + "#l-7-1" }
    ]
  },
  {
    de: 4, n: 114, total: 119, sub: "1.2", subName: "Chia việc lớn thành chuỗi bước",
    answer: "B",
    ask: "As a senior analyst, you are using Claude to analyse requirements collected from several stakeholder sources. Which order of steps is correct?<br>(1) Group related requirements and flag conflicts or ambiguities for stakeholders to review.<br>(2) Check the structured output against the original sources for accuracy and completeness.<br>(3) Give Claude the consolidated inputs together with a structured extraction prompt.<br>(4) Collect and label the source materials so each requirement can be traced.<br>(5) Record the final requirement set with its source traceability and status.",
    scene: [
      "Một chuyên viên phân tích cấp cao dùng Claude phân tích yêu cầu gom từ nhiều nguồn stakeholder (người có liên quan). Năm bước, phải xếp thứ tự.",
      "Phần dễ: ở cả bốn dãy, đối chiếu với nguồn (2) đứng thứ tư và ghi bản cuối (5) đứng cuối. Chỗ khó còn lại: gom nhóm, đánh dấu xung đột (1) đi trước hay sau bước đưa Claude trích (3).",
      "Trước bước trích, yêu cầu còn nằm rải trong biên bản, email, ghi chú của từng người. Sau bước trích mới có một danh sách yêu cầu từng mục để gom."
    ],
    asks: [
      "Thứ tự nào đúng?",
      "Tức là: bước nào cần output của bước nào, và điểm kiểm đặt ở đâu.",
      "Soi từng dãy: có bước nào làm việc trên thứ chưa tồn tại không."
    ],
    facts: [
      "Phần phụ thuộc cần kết quả của phần trước nên phải làm sau. Output trung gian (danh sách trích ra, bảng số liệu) là chỗ kiểm trước khi đi tiếp.",
      "Trích (extraction) là bước biến tài liệu thô thành danh sách yêu cầu từng mục. Gom nhóm và tìm xung đột làm trên danh sách đó.",
      "Khi soát yêu cầu, Claude gắn nhãn, phân loại, chỉ chỗ mơ hồ hay mâu thuẫn. Người cùng stakeholder trả lời và chốt.",
      "Lỗi ở bước đầu chảy xuống mọi bước sau. Nguồn được gắn nhãn từ đầu thì về sau mới đối chiếu và truy ngược được từng yêu cầu."
    ],
    opts: [
      { k: "A", gist: "4, 1, 3, 2, 5",
        why: [
          "Sai ở chỗ làm (1) trước (3): gom nhóm, đánh dấu xung đột khi yêu cầu chưa được trích thành từng mục (ý 1, 2). Muốn làm thì phải tự đọc tay mọi nguồn, tức là làm luôn việc trích thay Claude.",
          "Bước (3) sau đó thành thừa, hoặc ra một danh sách khác với danh sách đã gom tay. Xung đột chỉ lộ ra trong output của Claude thì không được đánh dấu cho stakeholder.",
          "Dễ bị cuốn vì “sắp xếp input trước khi đưa Claude” nghe như chuẩn bị kỹ. Nhưng phần chuẩn bị đầu vào là (4). Còn (1) làm việc trên các yêu cầu, mà yêu cầu chỉ có sau (3)."
        ] },
      { k: "B", gist: "4, 3, 1, 2, 5",
        why: [
          "Đúng chiều phụ thuộc: nguồn đã gắn nhãn (4) → Claude trích thành danh sách (3) → gom nhóm, đánh dấu xung đột trên danh sách đó (1) (ý 1, 2).",
          "Rồi đối chiếu bản đã trích, đã gom với nguồn gốc (2) trước khi ghi bản cuối (5). Nhãn nguồn từ (4) là thứ cho phép đối chiếu và truy ngược (ý 4).",
          "Chia vai đúng: Claude trích và gom, xung đột được đánh dấu để stakeholder gỡ (ý 3)."
        ] },
      { k: "C", gist: "1, 4, 3, 2, 5",
        why: [
          "Sai ở chỗ làm (1) trước cả (4): gom nhóm yêu cầu khi còn chưa gom nguồn. Không có gì để gom (ý 1).",
          "Nhóm lập kiểu này không truy được về nguồn nào, vì nhãn nguồn chỉ có từ bước (4) (ý 4)."
        ] },
      { k: "D", gist: "3, 4, 1, 2, 5",
        why: [
          "Sai ở chỗ làm (3) trước (4): đưa Claude “consolidated inputs” (đầu vào đã gom) khi chưa gom, chưa gắn nhãn. Bước (3) cần đúng thứ mà (4) làm ra (ý 1).",
          "Yêu cầu trích ra không mang nhãn nguồn, nên bước (2) khó đối chiếu và bản cuối (5) không truy được (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, mục “Một chuỗi trong chat, từng bước” và “Đặt điểm kiểm ở đâu”: bước phụ thuộc làm sau, kiểm output trung gian", href: NOTES + "#l-1-2" },
      { label: "Bài 4.1, mục “Dùng Claude soát yêu cầu khi còn là bản nháp”: Claude gắn nhãn, chỉ chỗ mâu thuẫn; người chốt", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 4, n: 115, total: 119, sub: "1.2", subName: "Chia việc lớn thành chuỗi bước",
    answer: "B",
    ask: "You are judging whether a request to “redesign new-hire onboarding” should be split into parts before you prompt Claude. Which characteristic of the request most strongly indicates that decomposition would help?",
    scene: [
      "Yêu cầu: “redesign new-hire onboarding” (thiết kế lại quy trình đón nhân viên mới). Mày phải quyết có chia nhỏ trước khi prompt hay không.",
      "Bốn phương án là bốn đặc điểm của yêu cầu. Ba cái là dấu hiệu nên giữ một prompt, chỉ một cái là dấu hiệu nên chia.",
      "Chỗ khó: “redesign” nghe lớn. Nhưng đề không hỏi việc lớn hay nhỏ, mà hỏi đặc điểm nào cho thấy chia sẽ có ích."
    ],
    asks: [
      "Đặc điểm nào cho thấy rõ nhất là chia việc sẽ giúp?",
      "Tức là: nhận ra dấu hiệu “nên chia” trong bảng nên chia / giữ một prompt."
    ],
    facts: [
      "Chia việc (task decomposition): tách yêu cầu lớn thành các bước, mỗi bước một việc. Nên chia khi một prompt phải lo nhiều thứ cạnh tranh nhau, hoặc cần kiểm một kết quả giữa chừng trước khi đi tiếp.",
      "Giữ một prompt khi việc đơn giản, một output, đã chạy tốt. Chia cũng có giá: thêm lượt chat, thêm thời gian, thêm hạn mức.",
      "Yêu cầu trộn nhiều loại việc thì tách ở chỗ loại việc thay đổi, và kiểm output ở chỗ nối.",
      "Sơ đồ quy trình (process map) là danh sách các bước của một quy trình: ai làm, mất bao lâu, chờ ở đâu, chuyển cho ai."
    ],
    opts: [
      { k: "A", gist: "It asks for one structured document that can be produced from a single set of inputs in one prompt.",
        why: [
          "Sai ở chỗ coi đây là dấu hiệu chia. Một output, một bộ đầu vào, một prompt là đúng ca giữ một prompt (ý 2).",
          "Dễ bị cuốn vì “structured document” (tài liệu có cấu trúc) nghe như việc to. Nhưng to mà chỉ một output thì vẫn là một việc; chia ra chỉ thêm lượt, thêm hạn mức (ý 2)."
        ] },
      { k: "B", gist: "It calls for several distinct deliverables: a process map, supporting materials, and a measurement plan.",
        why: [
          "Đúng. Ba output khác loại, mỗi cái một tiêu chí xong riêng: sơ đồ quy trình, tài liệu hỗ trợ, kế hoạch đo (ý 1, 3).",
          "Tài liệu hỗ trợ và kế hoạch đo thường dựa vào quy trình mới. Sơ đồ quy trình là output trung gian nên kiểm trước khi làm hai cái kia (ý 1, 4)."
        ] },
      { k: "C", gist: "It involves one clearly defined output with a clear input and a familiar format.",
        why: [
          "Sai ở chỗ coi đây là dấu hiệu chia. Một output, đầu vào rõ, định dạng quen là ca giữ một prompt rõ nhất (ý 2).",
          "Chia ra không thêm chỗ kiểm nào có ích, chỉ thêm lượt chat."
        ] },
      { k: "D", gist: "It covers content you have produced many times and already know works in one well-structured prompt.",
        why: [
          "Sai ở chỗ coi đây là dấu hiệu chia. Việc đã chạy tốt trong một prompt là dấu hiệu giữ nguyên (ý 2).",
          "Quen tay không phải lý do để chia. Lý do chia là có nhiều output khác loại hoặc cần kiểm giữa chừng (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, bảng “Khi nào nên chia, khi nào giữ một prompt”", href: NOTES + "#l-1-2" },
      { label: "Bài 1.4, mục “Yêu cầu trộn nhiều loại việc”: tách ở chỗ loại việc thay đổi, kiểm ở chỗ nối", href: NOTES + "#l-1-4" }
    ]
  },
  {
    de: 4, n: 116, total: 119, sub: "1.2", subName: "Chia việc lớn thành chuỗi bước",
    answer: "A",
    ask: "As a procurement associate, you are breaking a vendor-evaluation task into steps. Which order of dependencies is sound?",
    scene: [
      "Một chuyên viên mua hàng chia việc đánh giá nhà cung cấp thành từng bước. Đề hỏi thứ tự đúng theo phụ thuộc giữa các bước.",
      "Các phương án xoay quanh ba bước: đặt tiêu chí, gom dữ liệu, chấm và xếp hạng. Ba phương án sai đảo thứ tự hoặc bỏ hẳn bước.",
      "Câu này dễ. Cái đáng giữ lại là vì sao tiêu chí phải đi trước, kể cả khi người ta muốn “xem dữ liệu rồi mới tính”."
    ],
    asks: [
      "Thứ tự phụ thuộc nào hợp lý?",
      "Tức là: bước nào cần output của bước nào, xếp sao cho bước nào cũng có đủ đầu vào."
    ],
    facts: [
      "Phần phụ thuộc cần kết quả của phần trước nên phải làm sau, và nhận output đã kiểm của phần trước.",
      "Đặt tiêu chí trước khi bảo Claude xếp hạng. Không có tiêu chí thì Claude tự nghĩ ra thước đo, mỗi lần chạy có thể một thước khác.",
      "Tiêu chí viết sau khi thấy kết quả thường chỉ mô tả lại cái vừa nhận.",
      "Claude không có dữ liệu nội bộ của mày. Không được đưa dữ liệu thì nó lấp chỗ trống bằng thứ nghe hợp lý."
    ],
    opts: [
      { k: "A", gist: "Settle the evaluation criteria first, gather vendor data against them, then score and rank.",
        why: [
          "Đúng chiều phụ thuộc: tiêu chí quyết cần gom dữ liệu gì, dữ liệu là đầu vào để chấm, điểm là đầu vào để xếp hạng (ý 1).",
          "Tiêu chí có trước nên mọi nhà cung cấp được chấm trên cùng một thước, và thước không bị kéo theo kết quả (ý 2, 3)."
        ] },
      { k: "B", gist: "Rank the vendors before collecting any data.",
        why: [
          "Sai ở chỗ bước sau chạy trước bước nó phụ thuộc. Chưa có dữ liệu thì xếp hạng không có căn cứ (ý 1).",
          "Nhờ Claude làm thì nó xếp theo thứ nghe hợp lý, không theo dữ liệu thật của các nhà cung cấp (ý 4)."
        ] },
      { k: "C", gist: "Score the vendors first and decide the criteria later.",
        why: [
          "Sai ở chỗ chấm khi chưa có tiêu chí, tức chấm theo thước tự nghĩ (ý 2). Tiêu chí đặt sau sẽ tự khớp với điểm đã có (ý 3).",
          "Dễ bị cuốn vì “xem trước rồi mới chọn tiêu chí” nghe linh hoạt. Nhưng lúc đó tiêu chí chỉ hợp thức hóa kết quả, không còn dùng để quyết."
        ] },
      { k: "D", gist: "Drop the criteria and ask Claude for a vendor recommendation without giving it any inputs.",
        why: [
          "Sai ở chỗ không đưa gì cho Claude dựa vào: không tiêu chí, không dữ liệu. Nó chỉ ra được đề xuất chung chung hoặc bịa (ý 4).",
          "Bỏ luôn cả hai bước mà bước đề xuất phụ thuộc vào (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài 1.2, mục “Một chuỗi trong chat, từng bước”: phần phụ thuộc làm sau, nhận output đã kiểm", href: NOTES + "#l-1-2" },
      { label: "Bài 4.2, mục “Đặt tiêu chí trước khi bảo Claude xếp hạng”", href: NOTES + "#l-4-2" }
    ]
  },
  {
    de: 4, n: 117, total: 119, sub: "1.4", subName: "Đổi cách prompt theo loại việc",
    answer: "BE",
    ask: "You are a marketing manager using Claude to come up with campaign ideas, and the framing work has to be done before any concepts are generated. Which two framing steps must be finished BEFORE you ask Claude for concepts? (Choose two.)",
    scene: [
      "Một quản lý marketing nhờ Claude nghĩ concept (ý tưởng chủ đạo) cho chiến dịch. Đề nói rõ: phần đóng khung (framing) phải xong trước khi bảo Claude đưa concept.",
      "Năm phương án là năm việc trong vòng đời chiến dịch. Có việc đi trước bước nghĩ ý, có việc đi sau, có việc thuộc khâu triển khai.",
      "Chỗ khó: chữ “BEFORE” (trước). Một việc đúng của chiến dịch mà nằm sau bước nghĩ ý thì vẫn sai."
    ],
    asks: [
      "Hai bước đóng khung nào phải xong trước khi bảo Claude nghĩ concept?",
      "Tức là: Claude cần biết gì để nghĩ concept đúng hướng, còn việc nào chỉ làm được khi đã có concept.",
      "Soi từng phương án: nó là đầu vào cho bước nghĩ ý, hay là việc làm trên output của bước đó?"
    ],
    facts: [
      "Prompt tốt nói rõ người đọc và mục tiêu: ai đọc, đọc xong họ phải làm được gì. Không viết ra thì Claude không biết.",
      "Brainstorm cần ràng buộc khoanh vùng: ngân sách, người dùng, thời hạn. Ràng buộc chỉ khoanh vùng cho ý, không loại ý nào.",
      "Chấm và chọn ý là bước riêng, sau khi đã có ý, với tiêu chí rõ. Tiêu chí thành công (success criteria) viết trước khi giao việc, để có sẵn thước chấm.",
      "Giọng (voice) là cách một tổ chức viết: chọn chữ, độ dài câu, mức trang trọng."
    ],
    opts: [
      { k: "A", gist: "Choose a finalist concept and get it ready for stakeholder approval.",
        why: [
          "Sai ở thứ tự: chọn concept cuối là việc làm trên output của bước nghĩ ý (ý 3). Chưa có concept thì chưa có gì để chọn.",
          "Nó nằm cuối chuỗi, sau cả bước chấm, không phải phần đóng khung."
        ] },
      { k: "B", gist: "Set the campaign's goal and the metrics that will show it succeeded.",
        why: [
          "Đúng. Mục tiêu và chỉ số thành công cho Claude biết concept phải đạt điều gì (ý 1).",
          "Nó cũng là thước cho bước chấm sau đó (ý 3). Có trước thì mọi concept được chấm trên cùng một thước."
        ] },
      { k: "C", gist: "Look over the concepts Claude generated and pick the two strongest to develop.",
        why: [
          "Sai ở thứ tự: đây là bước chấm, nằm sau bước nghĩ ý (ý 3). Đề hỏi việc phải xong “BEFORE” (trước) bước đó.",
          "Dễ bị cuốn vì chấm ý là một bước thật và đúng của brainstorm. Nhưng đúng việc mà sai chỗ: lúc này chưa có concept nào để xem."
        ] },
      { k: "D", gist: "Fix the launch date and rollout schedule with the agency.",
        why: [
          "Sai ở loại việc: chốt lịch với agency là việc triển khai, cần đã có concept được duyệt. Nó không cho Claude biết concept phải nói gì, với ai.",
          "Thời hạn có thể là một ràng buộc nêu trong prompt (ý 2). Nhưng phương án là chốt lịch với đối tác, không phải bước đóng khung cho concept."
        ] },
      { k: "E", gist: "Define the brand voice and the audience the concepts will address.",
        why: [
          "Đúng. Người nhận là ràng buộc khoanh vùng cho ý (ý 1, 2). Giọng thương hiệu cho concept nói đúng cách của tổ chức (ý 4).",
          "B và E cùng là đầu vào của bước nghĩ ý: B nói concept phải đạt gì, E nói concept nói với ai, bằng giọng nào."
        ] }
    ],
    refs: [
      { label: "Bài 1.4, mục “Brainstorm: đòi độ rộng, chấm ở bước sau”: ràng buộc khoanh vùng, chấm ở bước riêng", href: NOTES + "#l-1-4" },
      { label: "Bài 1.1, mục “Viết ra những gì đang nằm trong đầu bạn”: người đọc và mục tiêu", href: NOTES + "#l-1-1" },
      { label: "Bài 4.1, mục “Viết tiêu chí thành công trước khi giao”: viết sau thì tiêu chí chỉ mô tả lại cái vừa nhận", href: NOTES + "#l-4-1" }
    ]
  },
  {
    de: 4, n: 118, total: 119, sub: "2.4", subName: "Khi nào cần người duyệt",
    answer: "C",
    ask: "As a knowledge worker, you are deciding whether a piece of Claude-generated output should be escalated. Which order of decision steps is correct?<br>(1) Work out who the audience is and what the impact would be if the output were wrong.<br>(2) Record the decision and the reasoning behind it so it can be traced.<br>(3) Compare the output's risk profile against the organization's escalation criteria.<br>(4) Decide whether to use the output, keep iterating, or escalate.<br>(5) Assess the output for accuracy, completeness, and any claims that have not been verified.",
    scene: [
      "Một nhân viên văn phòng phải quyết một output của Claude có cần escalate (chuyển lên: đưa cho người có chuyên môn hay thẩm quyền) hay không. Năm bước, phải xếp thứ tự.",
      "Phần dễ: cả bốn dãy đều kết thúc bằng (4) rồi (2): quyết xong mới ghi lại. Chỗ khó là ba bước đầu (1), (5), (3) xếp thế nào.",
      "Bước (3) so “risk profile” (mức rủi ro của output) với tiêu chí chuyển lên của tổ chức. Mức rủi ro đó gồm hai phần: sai thì thiệt tới đâu, và output có dễ sai không."
    ],
    asks: [
      "Thứ tự các bước quyết định nào đúng?",
      "Tức là: muốn so output với tiêu chí chuyển lên thì cần biết những gì trước, và biết theo thứ tự nào.",
      "Soi từng dãy: có bước nào dùng thứ chưa được làm ra không, và lúc kiểm output (5) đã biết phải kiểm sâu tới đâu chưa."
    ],
    facts: [
      "Mức duyệt tùy tín hiệu: mức hệ trọng (sai thì thiệt tới đâu), người nhận, rút lại được không, loại nội dung, lĩnh vực được quản lý. Trước khi duyệt, hỏi tín hiệu nào đang có, và vì vậy ai phải kiểm.",
      "Kiểm theo rủi ro: xếp từng khẳng định theo hai trục, khả năng sai và thiệt hại nếu sai. Thiệt hại tùy output được dùng làm gì, cho ai.",
      "Đánh giá output tách hai câu: có đúng không (accuracy, độ chính xác), có đủ không (completeness, độ đầy đủ). Câu không truy được nguồn là loại dễ sai.",
      "Khi chuyển lên hay xin ngoại lệ, ghi lại quyết định để lần sau không phải hỏi lại."
    ],
    opts: [
      { k: "A", gist: "5, 1, 3, 4, 2",
        why: [
          "Chạy được, nhưng lệch một bước: kiểm output (5) trước khi biết output tới tay ai, sai thì thiệt gì (1). Lúc kiểm chưa biết phải kiểm sâu tới đâu (ý 1, 2).",
          "Hậu quả: hoặc kiểm quá nhẹ một output hệ trọng, hoặc kiểm quá kỹ một bản nháp nội bộ, rồi phải kiểm lại khi bước (1) cho thấy mức hệ trọng khác.",
          "Dễ bị cuốn vì “đọc output trước đã” nghe tự nhiên. Nhưng tín hiệu phải hỏi trước khi duyệt: biết hệ trọng tới đâu rồi mới biết soi kỹ tới đâu (ý 1)."
        ] },
      { k: "B", gist: "3, 1, 5, 4, 2",
        why: [
          "Sai ở chỗ so với tiêu chí chuyển lên (3) đầu tiên, khi chưa có mức rủi ro nào để so. Bước (3) cần kết quả của cả (1) và (5) (ý 2).",
          "So như vậy chỉ là đọc tiêu chí suông, rồi vẫn phải so lại sau khi có (1) và (5)."
        ] },
      { k: "C", gist: "1, 5, 3, 4, 2",
        why: [
          "Đúng. Trước hết biết ai nhận và sai thì thiệt gì (1): đó là trục thiệt hại, và nó quyết phải kiểm sâu tới đâu (ý 1, 2).",
          "Rồi kiểm đúng, đủ, và các câu chưa có nguồn (5): đó là trục khả năng sai (ý 3). Có đủ hai trục mới so được với tiêu chí của tổ chức (3), rồi quyết dùng, sửa tiếp hay chuyển lên (4).",
          "Ghi lại quyết định và lý do (2) ở cuối, vì phải có quyết định rồi mới có cái để ghi (ý 4)."
        ] },
      { k: "D", gist: "1, 3, 5, 4, 2",
        why: [
          "Sai ở chỗ so với tiêu chí (3) khi mới có một nửa mức rủi ro: biết thiệt hại nếu sai (1) nhưng chưa biết output có sai không (5) (ý 2, 3).",
          "Một output gửi khách nhưng kiểm ra sạch, hay một output nội bộ nhưng đầy câu không nguồn, đều dễ bị xếp sai mức nếu so trước khi kiểm."
        ] }
    ],
    refs: [
      { label: "Bài 2.4, mục “Output nào cũng được xem, nhưng sâu tới đâu thì tùy tín hiệu”: hỏi tín hiệu trước khi duyệt", href: NOTES + "#l-2-4" },
      { label: "Bài 2.1, mục “Kiểm theo rủi ro: chỗ nào trước”: hai trục khả năng sai và thiệt hại nếu sai", href: NOTES + "#l-2-1" },
      { label: "Bài 6.3, mục “Khi chính sách và yêu cầu va nhau”: chuyển lên đúng kênh, rồi ghi lại quyết định", href: NOTES + "#l-6-3" }
    ]
  },
  {
    de: 4, n: 119, total: 119, sub: "4.3", subName: "Làm giải pháp cùng Claude",
    answer: "A",
    ask: "As a product designer working through a solution-design exercise with Claude, which step should you complete first?",
    scene: [
      "Một nhà thiết kế sản phẩm làm bài thiết kế giải pháp cùng Claude. Đề hỏi bước nào làm đầu tiên.",
      "Bốn phương án là bốn bước của cùng một chuỗi: nêu bài toán và ràng buộc, nghĩ các concept (phương án ý tưởng), so concept với ràng buộc để chọn, dựng mock-up (bản dựng mẫu giao diện) chi tiết.",
      "Chỗ khó: bước nghĩ concept (D) là bước có Claude rõ nhất, nên dễ tưởng “dùng Claude” thì bắt đầu từ đó."
    ],
    asks: [
      "Bước nào phải xong đầu tiên?",
      "Tức là: xếp bốn bước theo phụ thuộc, bước nào là đầu vào cho mọi bước còn lại."
    ],
    facts: [
      "Làm giải pháp đi theo vòng plan → verify → judge → refine. Trước khi làm, biến lời người dùng thành mô tả kiểm được: giải pháp phải làm gì, cho ai, trong hoàn cảnh nào, lúc nào tính là xong.",
      "Claude chỉ làm được cái được mô tả. Không được nói bài toán và ràng buộc thì Claude lấp chỗ trống bằng thứ nghe hợp lý.",
      "Brainstorm cần ràng buộc khoanh vùng (ngân sách, người dùng, thời hạn). Chấm và chọn ý là bước riêng, sau khi đã có ý, với tiêu chí rõ.",
      "Sửa một kế hoạch thì rẻ. Gỡ một sản phẩm sai đã làm chi tiết thì đắt."
    ],
    opts: [
      { k: "A", gist: "State the problem the solution has to solve and the constraints that apply.",
        why: [
          "Đúng. Bài toán và ràng buộc là đầu vào của mọi bước sau: nghĩ concept trong vùng nào, chấm concept theo thước nào, mock-up phải thỏa điều gì (ý 1, 3).",
          "Đây cũng là chỗ rẻ nhất để sửa. Nêu sai ở đây thì sửa vài dòng; để tới mock-up mới lộ thì làm lại cả chuỗi (ý 4)."
        ] },
      { k: "B", gist: "Weigh the candidate concepts against the constraints and pick a finalist.",
        why: [
          "Sai ở thứ tự: bước này cần hai thứ chưa có, là các concept và các ràng buộc (ý 3).",
          "Nó là bước chấm, đứng thứ ba trong chuỗi."
        ] },
      { k: "C", gist: "Build detailed mock-ups of the selected solution for stakeholder review.",
        why: [
          "Sai ở thứ tự: mock-up chi tiết là bước cuối, làm trên concept đã chọn.",
          "Làm chi tiết trước khi chốt bài toán là đúng chỗ đắt nhất để phát hiện mình hiểu sai nhu cầu (ý 4)."
        ] },
      { k: "D", gist: "Have Claude generate candidate solution concepts across a range of styles.",
        why: [
          "Sai ở thứ tự: nghĩ concept khi chưa nêu bài toán và ràng buộc thì Claude không có vùng để nghĩ (ý 2, 3).",
          "Concept ra nhiều mà lệch nhu cầu, và bước chọn sau đó cũng không có thước để chấm.",
          "Dễ bị cuốn vì đây là bước dùng Claude rõ nhất, và đề nhắc “using Claude” (dùng Claude). Nhưng như mọi lần giao việc, Claude cần được đưa bài toán trước."
        ] }
    ],
    refs: [
      { label: "Bài 4.3, mục “Trước khi làm: biến lời người dùng thành mô tả kiểm được” và vòng plan → verify → judge → refine", href: NOTES + "#l-4-3" },
      { label: "Bài 1.4, mục “Brainstorm: đòi độ rộng, chấm ở bước sau”: ràng buộc khoanh vùng cho ý", href: NOTES + "#l-1-4" }
    ]
  }
);
