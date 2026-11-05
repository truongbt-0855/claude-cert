# Brief chung cho người viết một domain (CCAO-F notes)

Work context: `C:\Users\bui.tuan.truong\Downloads\Projects\Certificate`
Reports: `C:\Users\bui.tuan.truong\Downloads\Projects\Certificate\plans\reports\`
Plans: `C:\Users\bui.tuan.truong\Downloads\Projects\Certificate\plans\`
Mọi đường dẫn dưới đây tính từ work context.

## Đọc trước, đọc hết

1. `claude associate - foundation/build/SPEC.md`: hợp đồng định dạng và giọng văn. Nó thắng mọi thứ khác.
2. `claude associate - foundation/nguon/facts-sheet.md`: nguồn chung cho mọi sự thật về sản phẩm (gói, tính năng,
   giới hạn, model, dữ liệu, chính sách, khung AI Fluency 4D). Không tự nghĩ ra con số.
3. `claude associate - foundation/nguon/ccao-f-exam-guide.pdf`: trang 4–7 (mục tiêu từng domain, 3 câu mẫu, lời giải).
4. Mẫu giọng văn và bố cục, trong chính notes này: `claude associate - foundation/build/p0.html` (3 bài mở đầu) và
   `claude associate - foundation/build/p8.html` (3 qcase đúng định dạng SPEC §5).
5. Mẫu bố cục bài dài, từ notes CCAR-F (chỉ để xem cách dựng bài, **không chép nội dung**):
   `claude architect - foundation/claude-architect-foundations-notes-drillpark.html`, dòng 525–781 (bài Nền tảng),
   783–986 (bài task statement), 2391–2456 (tổng kết + cheatsheet). Bỏ qua các khối tím `details.proj`
   “Trong dự án DrillPark” và khối `qtip` “Mẹo”: notes CCAO-F không có hai thứ đó, và phần giải thích qcase
   dùng định dạng mới của SPEC §5 (Phân tích đề / Cần biết để chọn / Từng đáp án).

## Bài certsafari

Với mỗi task statement của domain, đọc bài certsafari tương ứng (link trong prompt) bằng WebFetch. Hỏi WebFetch trả
**toàn bộ nội dung bài**: mọi mục, mọi ví dụ, mọi câu checkpoint kèm đáp án và giải thích. Bài dài thì gọi nhiều lần
theo từng nửa. Dùng để soát độ phủ: mọi điểm quyết định và bẫy của họ phải có trong bài mình. Viết lại bằng lời mình,
câu hỏi tự viết, không chép.

## File được ghi

Chỉ `claude associate - foundation/build/d{N}.html` và `claude associate - foundation/build/quiz-d{N}.json`.
Không sửa file nào khác (SPEC, checker, facts sheet, fragment của domain khác). Thấy SPEC hay checker có vấn đề thì
ghi trong báo cáo, đừng sửa.

## Xong khi

- `node "claude associate - foundation/build/check-fragments.js" d{N}` in ra `0 lỗi` (sửa mọi ERROR; WARN thì sửa,
  trừ khi có lý do và ghi lý do vào báo cáo).
- Mọi sự thật về sản phẩm đều có trong facts sheet hoặc trong một trang docs chính thức bạn đã mở.
- Đọc lại toàn bộ file một lượt với con mắt người học: có chỗ nào dùng thuật ngữ trước khi định nghĩa, câu tiếng Anh
  thiếu bản dịch, đoạn dài nối bằng chấm phẩy, văn dịch kiểu “Điều này có nghĩa là” không? Sửa hết.

## Báo cáo cuối (tin nhắn cuối cùng của bạn)

```
**Status:** DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
**Summary:** 1–2 câu
Bài: một dòng mỗi bài (id, tiêu đề, phút, chữ cái đáp án các qcase)
Lệch facts sheet: sự thật nào bạn viết khác facts sheet, kèm URL docs chính thức
Bỏ khỏi certsafari: điểm nào cố ý không đưa vào, vì sao
Nghi ngờ: những câu bạn ít chắc nhất
```
