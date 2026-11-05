---
name: ccar-dump-to-bank
description: Thêm câu hỏi dump/quiz CCAR-F (ảnh chụp certsafari hoặc nguồn khác) vào "Sổ ôn certsafari" ở local, tự kiểm lại đáp án bằng notes ôn thi và docs chính thức, viết phân tích đề (đề kể gì, hỏi gì, cần biết gì) rồi vì sao từng phương án đúng/sai, kèm link tới bài cần đọc lại trong notes. Dùng khi user gửi ảnh câu hỏi quiz/dump, nói "thêm câu này vào bộ đề", "clone câu hỏi", "check đáp án", "mở đề mới", hoặc bảo publish sổ ôn.
---

# Ảnh câu dump → Sổ ôn CCAR-F

Mỗi ảnh câu hỏi user gửi thành một thẻ câu hỏi trong sổ ôn (file local). Đáp án phải được kiểm lại, không tin mù đáp án của đề gốc. Giải thích dẫn về đúng bài trong notes ôn thi.

**Chỉ sửa file local. Không publish artifact nào trừ khi user bảo** (user dặn 02/11/2026: "khi nào tao cần publish thì mày hẵng publish").

## Đường dẫn

`$DIR` = `C:\Users\bui.tuan.truong\Downloads\Projects\Certificate\claude architect - foundation`
`$TOOL` = `C:/Users/bui.tuan.truong/Downloads/Projects/Certificate/.claude/skills/ccar-dump-to-bank/scripts/check-and-build-bank.mjs` (skill nằm trong project Certificate, không cài ở máy)

| Thứ | Ở đâu |
|---|---|
| Trang sổ ôn | `$DIR/so-on-certsafari.html`: CSS, khung trang, cấu hình (`NOTES`, `DOMAINS`) và các thẻ `<script src>`; mở thẳng bằng trình duyệt được |
| Dữ liệu từng đề | `$DIR/so-on-certsafari-de-<N>.js`: `DE[N] = "nhãn"` rồi `ENTRIES.push({...}, ...)` |
| Giao diện | `$DIR/so-on-certsafari-app.js` (thẻ câu, cửa sổ “Giải thích”, menu đề, điều hướng `#de-N` / `#deN-qM` / `#stats`) và `$DIR/so-on-certsafari-stats.js` (thống kê câu/domain hay sai). Thẻ câu chỉ hiện đề, phương án, đúng/sai; chọn xong mới có nút “Giải thích” mở cửa sổ nổi chứa phân tích đề, từng phương án, ghi chú đáp án gốc, bài đọc lại. Thêm câu không cần sửa hai file này |
| Notes (nguồn kiến thức + anchor) | `$DIR/claude-architect-foundations-notes-drillpark.html`, ~1,1 MB: chỉ Grep, đừng Read cả file |
| Notes trên web | https://claude.ai/artifact/Ca5wyF54DWXiUwH98KPH6D (biến `NOTES` trong trang) |
| Sổ ôn trên web | https://claude.ai/artifact/AojtXbesyoXfDHgfjbZyRM (chỉ đụng tới khi user bảo publish) |
| Cách viết từng trường | `references/entry-writing-guide.md`: đọc trước khi viết câu đầu tiên của phiên |

Lệnh kiểm (dùng ở bước 2 và 6):
```bash
node "$TOOL" check "$DIR/so-on-certsafari.html" "$DIR/claude-architect-foundations-notes-drillpark.html"
```
In ra từng đề có bao nhiêu câu, còn thiếu câu nào, câu nào có ghi chú đáp án gốc (`dispute`); rồi liệt kê lỗi.

## Quy trình cho mỗi lô ảnh

### 1. Đọc ảnh, ghi lại thô
Với từng ảnh (đính kèm trong chat, hoặc đường dẫn file thì Read), ghi nháp:
- Số câu và tổng ("Question 25 of 50"), tên quiz nếu có, domain/task nếu đề gốc có ghi.
- Đề bài và các phương án, **giữ đúng chữ cái và thứ tự trong ảnh**.
- Phương án user đã chọn (ô tô màu, "Your answer") → `first`. Không thấy thì bỏ trống, không đoán.
- Đáp án và lời giải của đề gốc, nếu ảnh có.

Một câu bị cắt qua nhiều ảnh thì ghép lại. Chữ mờ, thiếu phương án → hỏi user, không bịa.

### 2. Xác định đề và số câu
Ảnh của các đề certsafari trông giống hệt nhau (cùng tiêu đề, cùng "Question X of 50"), nên **không đoán đề từ ảnh**. Phiên mới cũng không có nghĩa là đề mới: một đề có thể làm qua nhiều phiên. Quy tắc (user chốt 02/11/2026):
- User nói "đề mới" (có thể kèm tên quiz, ngày) → mở đề mới (mục "Mở đề mới"); mọi ảnh sau đó vào đề này.
- User nói "đề N" → thêm vào đề N đang có.
- User không nói gì → thêm vào đề mới nhất (số đề lớn nhất).
- Ảnh đầu tiên của mỗi lô: chạy lệnh kiểm, rồi báo một dòng "Đang thêm vào Đề N (x/50, còn thiếu …)" trước khi ghi, để user sửa nếu sai.
- Dấu hiệu user quên báo đề mới: số câu `n` đã có trong đề nhưng nội dung khác, hoặc đề mới nhất đã đủ câu. Khi đó dừng lại, hỏi "đề mới hay không?" trước khi ghi. Không tự mở đề.
- `n` đã có và nội dung giống → câu trùng: báo user và bỏ qua.

### 3. Chống trùng giữa các đề
Grep 2–3 cụm đặc trưng của đề bài (tên tool, con số, tình huống) trong `$DIR/so-on-certsafari-de-*.js`. Giống ý một câu ở đề khác thì vẫn thêm, nhưng báo user "giống câu X đề Y" và giữ giải thích nhất quán với câu cũ.

### 4. Kiểm đáp án (bước quan trọng nhất)
Đề dump có thể chấm sai. Không đưa đáp án đề gốc vào `answer` khi chưa kiểm.
1. Xác định task statement `sub` (vd "3.2"). Danh sách bài: Grep `id="l-` trong notes, `data-ts` cho biết số task.
2. Tra notes: Grep từ khóa của câu (tên API, tham số, khái niệm) với `-C` đủ rộng để đọc trọn đoạn; ưu tiên khung khái niệm, "Biết thêm", "Khi đi thi" của bài, và cheatsheet domain. Notes đã đối chiếu với exam guide và docs chính thức nên là nguồn chính.
3. Tự giải trước, theo đúng thứ tự sẽ viết ra: đề kể gì (chỗ nào làm câu khó), đề thật sự hỏi gì, cần biết trước những ý nào; rồi mỗi phương án giả định gì và gãy ở ý nào. Dựa vào dữ kiện trong đề và điều notes nói. Áp "8 luật chọn đáp án" (notes `#l-0-3`).
4. So với đáp án đề gốc:
   - Khớp → `answer` = đáp án đó.
   - Lệch, hoặc notes không nói tới điều câu cần → tra docs chính thức (docs.claude.com, platform.claude.com, code.claude.com, anthropic.com) bằng WebFetch. Lời giải của đề gốc hay trang thứ ba không phải nguồn.
   - Docs ủng hộ mình → `answer` = đáp án của mình, thêm `dispute`: đề gốc chấm gì, sai ở đâu, docs nói gì.
   - Docs ủng hộ đề gốc → sửa lập luận của mình, `answer` = đáp án đề gốc.
   - Vẫn không chắc (đề mơ hồ, hai đáp án đều bảo vệ được) → giữ đáp án đề gốc, `dispute` nêu chỗ mơ hồ, báo user.
5. Câu hỏi cần kiến thức mà notes không có, hoặc notes nói khác docs → ghi vào danh sách "lỗ hổng notes" để báo cuối lô. Không tự sửa notes trong skill này.

### 5. Viết entry
Theo `references/entry-writing-guide.md` (định dạng mới: `scene` / `asks` / `facts`, `why` là mảng gạch đầu dòng; không có `trap`, `tip`, user chốt 03/11/2026). Chèn đúng vị trí theo `n` (file xếp tăng dần): Read vài chục dòng quanh chỗ chèn rồi Edit, không Read cả file dữ liệu.

### 6. Kiểm
Chạy lệnh kiểm. Có lỗi (anchor không tồn tại, thiếu trường, thẻ HTML không đóng, lỗi cú pháp JS, trùng số câu) → sửa tới khi sạch. Có cảnh báo → đọc và xử lý nếu hợp lý.

### 7. Báo user (tiếng Việt, ngắn)
Mỗi câu một khối, cùng thứ tự với phần giải thích (đề trước, phương án sau):
- **Câu 25/50 · 3.4 <tên bài>**: đáp án **C**. Đề gốc chấm C, khớp. (Hoặc: đề gốc chấm B, sai vì … theo docs …)
- Đề hỏi: điều đề thật sự đòi, một câu.
- Mày chọn B: sai ở đâu (một câu, dẫn về ý cần biết). Chọn đúng thì một câu xác nhận vì sao đúng.
- Đọc lại: tên bài + mục trong notes.

Không kèm mẹo hay bẫy. Cuối lô: số câu đã thêm, đề còn thiếu câu nào, lỗ hổng notes (nếu có), và đường dẫn `$DIR/so-on-certsafari.html` để mở xem. Không dán lại toàn bộ giải thích, nó đã nằm trong cửa sổ “Giải thích”.

User muốn xem cách giải thích trước khi ghi (“giải thích đã, đừng ghi vội”) → trình bày đúng các phần của entry trong chat (đề kể gì, hỏi gì, cần biết trước, từng phương án, đọc lại) và chờ user duyệt.

## Viết lại nhiều câu cùng lúc
Khi user bảo viết lại cả đề (đổi cách giải thích, sửa giọng văn…): theo mục “Viết lại câu đã có” trong `references/entry-writing-guide.md`. Chia khoảng 10 câu một agent chạy song song (cách này đã dùng để đổi cả 121 câu sang định dạng phân tích đề ngày 03/11/2026). Mỗi agent ghi một file mảnh trong scratchpad (chỉ các object câu, không bọc `ENTRIES.push`) và tự kiểm bằng `node scripts/check-entry-fragment.mjs <mảnh> <notes> <từ n> <tới n>`. Xong thì ghép: `node scripts/merge-entry-fragments.mjs <file đề> <mảnh>...` (thay câu theo `n`, giữ nguyên câu khác, tự dừng nếu trường phải giữ bị lệch). Rồi chạy lệnh kiểm, và mở nút “Giải thích” của các câu đã đổi trong trình duyệt.

## Mở đề mới
1. Tạo `$DIR/so-on-certsafari-de-<N>.js` (N = số đề lớn nhất + 1): chép khối comment đầu của `so-on-certsafari-de-1.js`, rồi `DE[N] = "<Tên quiz> · <tổng> câu · <dd/mm/yyyy>";` (tên quiz theo lời user, không có thì lấy tiêu đề trong ảnh; ngày là hôm nay) và `ENTRIES.push(` … `);`.
2. Thêm `<script src="so-on-certsafari-de-<N>.js"></script>` vào trang, ngay sau thẻ script dữ liệu cuối cùng, trước `so-on-certsafari-stats.js`. Menu và thống kê tự có đề mới.
3. Chạy lệnh kiểm.

## Câu chọn nhiều đáp án ("Choose TWO", "Select TWO")
Trang chấm được từ 04/11/2026: `answer: "AD"`, `first: "CD"` (chữ cái xếp tăng dần, `first` cùng số chữ với `answer`). Thẻ câu hiện nhãn “Chọn 2”; bấm phương án để đánh dấu hoặc bỏ, đủ số mới chấm. Lệnh kiểm bắt chữ cái sai, trùng hay chưa xếp. Ảnh Udemy không có chữ cái: đặt A, B, C, D theo thứ tự từ trên xuống.

## Đề có scenario (Udemy, format đề thật)
Đề Udemy (từ Đề 4) ghi “Câu hỏi N:” và thanh “N/60”, mỗi câu gồm SCENARIO + QUESTION. Scenario là một trong 6 scenario của exam guide (bảng S1–S6 trong notes, Grep `S2</b> Code Generation`).
- Câu ghi `scen: "S2"`; `ask` chỉ viết lại phần QUESTION, scenario không lặp trong `ask`.
- Nội dung scenario nằm một chỗ: `SCENARIOS` trong trang (`name`, `en` theo đề, `vi` là nghĩa tiếng Việt). Gặp scenario chưa có thì thêm vào đó trước khi thêm câu. Trang tự đặt khung scenario trước mỗi chuỗi câu liền nhau cùng scenario, và gắn nhãn “Scenario S2” vào đầu thẻ câu.

## Publish (chỉ khi user bảo)
1. `Artifact` action `read` với URL sổ ôn, rồi Read hết file trang live mà tool lưu lại; `Artifact` action `list`, `scope: "files"`, cùng URL.
2. `node "$TOOL" compare "$DIR/so-on-certsafari.html" <file trang live>`. Nếu khác ở chỗ không phải do mình sửa → đã có người publish từ nơi khác: gộp thay đổi đó vào local trước. File dữ liệu: so số byte trong listing với file local; lệch thì `read` với `path` rồi compare.
3. `node "$TOOL" build "$DIR/so-on-certsafari.html" "$DIR/claude-architect-foundations-notes-drillpark.html" <scratchpad>/so-on-certsafari.artifact.html` → in ra map `files`.
4. `Artifact` publish: `file_path` = bản build, `url` = URL sổ ôn, `files` = map vừa in (lần đầu gửi đủ; các lần sau chỉ cần file đã đổi). Nguồn trong `files` phải nằm trong thư mục làm việc hoặc scratchpad, nếu không thì copy vào scratchpad trước.

Bản live đã là bản tách file (từ 02/11/2026), trang chỉ ~15 KB. Lần publish 03/11 (Version 32): nút “Giải thích” mở cửa sổ nổi; cả 121 câu có phân tích đề (Đề 1 đủ 50, Đề 2 đủ 60, Đề 3 câu 1–11). Lần publish 04/11 (Version 33): thêm khung scenario, câu chọn hai, Đề 4 Udemy câu 1–20 (141 câu).

Artifact thuộc một tài khoản khác và được share quyền sửa. `read` báo “artifact not found” thì báo user và chờ user share quyền, không publish thành artifact riêng.

Notes sửa trong lúc thêm câu (khi user bảo) thì publish riêng theo ghi nhớ về artifact notes. Bản live ~1,1 MB, nên giao cho một agent phụ làm cả bước so khác biệt lẫn publish, để phiên chính không phải đọc file đó.
