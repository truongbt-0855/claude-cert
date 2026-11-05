# Viết một câu (entry) trong sổ ôn

Trước câu đầu tiên của phiên, Read câu mẫu chuẩn: câu 11 Đề 3 trong `so-on-certsafari-de-3.js` (Grep `n: 11,` lấy số dòng rồi Read khoảng 50 dòng). Mọi câu mới viết theo đúng hình đó.

Thẻ câu trên trang chỉ hiện đề, các phương án, đúng/sai. Phần giải thích nằm trong cửa sổ nổi mở bằng nút “Giải thích”, theo thứ tự: **Đề kể gì → Đề hỏi gì → Cần biết trước → Từng phương án → ghi chú đáp án gốc → Đọc lại**. Không có mục mẹo hay bẫy (user dặn 03/11/2026): ý “vì sao phương án này dễ bị chọn” viết thẳng vào `why` của phương án đó.

## Khung

```js
  {
    de: 3, n: 11, total: 60, sub: "2.5", subName: "Chọn built-in tool đúng việc",
    first: "B", answer: "D",
    ask: "...",
    scene: [
      "...",
      "..."
    ],
    asks: [
      "...",
      "..."
    ],
    facts: [
      "...",
      "..."
    ],
    opts: [
      { k: "A", gist: "...",
        why: [
          "...",
          "..."
        ] },
      { k: "B", gist: "...",
        why: [
          "..."
        ] }
    ],
    dispute: "...",
    refs: [
      { label: "Bài 2.5, mục “...”: ...", href: NOTES + "#fix-3" }
    ]
  },
```

- Chuỗi bọc bằng `"`. Trích dẫn trong chuỗi dùng ngoặc kép cong “ ”; trong code thì escape: `<code>stop_reason: \"tool_use\"</code>`.
- HTML được dùng: `<code>` (tên tool, tham số, giá trị, đường dẫn), `<b>`, `<i>`, và `<pre><code>…</code></pre>` cho ví dụ minh họa ngắn (xuống dòng viết `\n`). Mở thẻ nào phải đóng thẻ đó (script kiểm sẽ bắt).
- `first` và `dispute` không có thì bỏ hẳn dòng đó, không để chuỗi rỗng.
- Không có trường `trap`, `tip` (script kiểm báo lỗi nếu có).
- Dấu phẩy giữa các câu: câu cuối trong `ENTRIES.push(` không có dấu phẩy sau `}`.

## Từng trường

| Trường | Ngôn ngữ | Viết thế nào |
|---|---|---|
| `de`, `n`, `total` | | Số đề trong sổ; số câu và tổng số câu như ảnh |
| `sub`, `subName` | VI | Task statement X.Y mà câu kiểm. Sub đã có trong sổ thì dùng lại đúng `subName` cũ (Grep `sub: "X.Y"`); chưa có thì lấy theo tên bài trong notes, ngắn |
| `scen` | | Chỉ với đề có scenario (Udemy): khóa trong `SCENARIOS` của trang, vd `"S2"`. Đề không có scenario thì bỏ |
| `first` | | Phương án user chọn trong ảnh. Câu chọn hai: `"CD"` (xếp tăng dần). Không thấy thì bỏ |
| `answer` | | Đáp án đã kiểm theo bước 4 của SKILL.md, không mặc định theo đề gốc. Câu chọn hai: `"AD"` |
| `ask` | EN | Viết lại đề bài bằng lời riêng, không chép nguyên văn, nhưng giữ đủ mọi dữ kiện đáp án dựa vào: con số, tên tool/tham số, ràng buộc (“must never”, “every time”, “unknown size”), và câu hỏi cuối (giữ cả “(Choose two.)”). Đề có scenario: chỉ phần QUESTION |
| `scene` | VI, mảng | **Đề kể gì.** 2–4 gạch, mỗi gạch một ý: tình huống; chỗ khó (ràng buộc làm câu này không hiển nhiên); ví dụ minh họa ngắn khi nó giúp thấy chỗ khó (một đoạn `<pre>` vài dòng, ghi rõ “ví dụ minh họa”, không bịa thêm dữ kiện ảnh hưởng đáp án) |
| `asks` | VI, mảng | **Đề hỏi gì.** Gạch 1: câu hỏi nói lại bằng tiếng Việt. Gạch 2: “Tức là: …”, điều đề thật sự đòi. Gạch 3 (khi cần): tiêu chí để soi từng phương án |
| `facts` | VI, mảng | **Cần biết trước.** 2–4 ý kiến thức (từ notes hoặc docs chính thức) cần để chấm các phương án. Mỗi ý một câu khẳng định kiểm được. Trang tự đánh số 1, 2, 3; phương án dẫn lại bằng “(ý 2)”. Thuật ngữ lạ định nghĩa ngay ở đây, một mệnh đề ngắn |
| `opts[].gist` | EN | Viết lại phương án, giữ chữ cái và thứ tự như ảnh, giữ đúng chi tiết làm nó đúng hoặc sai |
| `opts[].why` | VI, mảng | 2–3 gạch, xem mục dưới |
| `dispute` | VI | Ghi chú về đáp án đề gốc: “Đề gốc chấm B. Sai vì … Docs (<trang>) ghi …”. Hoặc đáp án giữ nguyên nhưng mô tả trong đề đã cũ / đề mơ hồ: nói rõ chỗ đó |
| `refs` | VI | 1–3 link, ít nhất 1 vào notes. Label nói rõ đọc mục nào, để hiểu điều gì |

## Viết `why` của từng phương án

- **Phương án sai.** Gạch đầu: nó giả định hay làm gì, và sai ở đâu, dẫn về ý trong `facts` (“Sai ở giả định: Edit không chạy regex (ý 1).”). Gạch sau: hậu quả cụ thể trong đúng tình huống của đề (báo lỗi gì, sửa nhầm chỗ nào, trái yêu cầu nào). Nếu nó chạy được mà vẫn sai, nói rõ “chạy được, nhưng…”.
- **Phương án đúng.** Cơ chế thật sự xảy ra, dẫn về các ý trong `facts`, và vì sao nó thỏa đúng điều `asks` nói đề đòi. Gọi đúng tên khái niệm của guide/notes.
- **Phương án bẫy** (cái user chọn sai, hoặc cái dễ cuốn nhất): thêm một gạch “Dễ bị cuốn vì … Nhưng …”. Đây là chỗ thay cho trường `trap` cũ.
- Chỗ sai điển hình: sai công cụ, sai vai, bịa tính năng hoặc con số, đúng hành động nhưng sai lý do, sửa sau thay vì chặn trước, chỉ dặn bằng prompt khi đề đòi bảo đảm.

## Chọn anchor trong notes

| Anchor | Là gì |
|---|---|
| `l-X-Y` | Bài theo task statement X.Y. `l-1-0`…`l-5-0`: bài nền tảng của domain. `l-0-3`: "8 luật chọn đáp án". `l-6-*`, `l-7-*`: ôn tập, thi thử |
| `proj-X-Y` | Khối "Trong dự án DrillPark" của bài X.Y |
| `cheat-dN` | Cheatsheet domain N |
| `fix-N` | Mục "Đã sửa": chỗ notes từng sai, đã sửa theo guide và docs |
| `seq-1-0`, `seq-4-0` | Sơ đồ tuần tự trong bài nền tảng D1, D4 |

Tìm anchor sát nhất: Grep từ khóa trong notes với `-n`, rồi Grep `id="` để biết dòng đó nằm dưới anchor nào gần nhất phía trên. Link vào mục cụ thể (`fix-9`, `seq-1-0`) tốt hơn link cả bài khi mục đó có sẵn.

## Giọng văn (bắt buộc)

- Tiếng Việt tự nhiên, câu ngắn, như người trong ngành nói với nhau; không văn dịch. Xưng "mày" khi cần nói với người đọc, như các câu cũ.
- Hạn chế từ tiếng Anh; cụm tiếng Anh trích từ đề phải có nghĩa tiếng Việt kế bên: “every time” (mọi lần).
- Không dùng "stem", "distractor", "đáp án nhiễu". Nói "đề kể", "phương án bẫy".
- Không bịa con số hay tính năng: giới hạn, giá, thời hạn, tên tham số đều phải có trong notes hoặc docs chính thức.
- Mỗi gạch một ý; không nối một chuỗi dài bằng dấu chấm phẩy.

## Viết lại câu đã có

Từ 03/11/2026 mọi câu trong sổ đều theo khung trên; lệnh kiểm báo lỗi câu nào thiếu `scene`/`asks`/`facts` hay còn `trap`/`tip`. Khi user bảo viết lại một câu hay cả đề: giữ nguyên `de`, `n`, `total`, `sub`, `subName`, `first`, `answer`, `ask`, `opts[].k`, `opts[].gist`, `dispute`; chỉ viết lại `scene`/`asks`/`facts`, `why`, và `refs` nếu cần. Nhiều câu thì theo mục “Viết lại nhiều câu cùng lúc” trong SKILL.md.
