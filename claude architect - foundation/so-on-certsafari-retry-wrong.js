// Làm lại câu sai của Sổ ôn (route #sai = mọi đề, #sai-N = đề N).
// "Câu sai" = câu mà lần trả lời gần nhất của chính người dùng trong sổ là sai. Chỉ đọc log (mọi lần chọn trên trang),
// bỏ qua first (lần làm trên đề gốc, chép từ ảnh chụp).
// Làm lại không xóa gì: lượt làm lại giữ đáp án riêng trong round.picks; mỗi lần chọn vẫn ghi thêm vào log
// và thay đáp án đang chọn (picks) ở trang đề, giống chọn trên trang đề.

// Danh sách id câu đang sai, theo thứ tự đề rồi số câu. de = số đề, bỏ trống = mọi đề.
function wrongIdsFromLog(entries, log, idOf, de) {
  var last = {};
  log.forEach(function (a) { last[a.id] = a.k; });
  return entries.filter(function (x) {
    var k = last[idOf(x)];
    return (!de || x.de === de) && k && k !== x.answer;
  }).map(idOf);
}

// s = { round: { de, ids, picks }, find(id), idOf, card(x, pick), scenBox(key), DE }
function renderRetry(el, s) {
  var r = s.round, here = "#sai" + (r.de ? "-" + r.de : "");
  var items = r.ids.map(s.find).filter(Boolean);
  var done = items.filter(function (x) { return r.picks[s.idOf(x)]; });
  var right = done.filter(function (x) { return r.picks[s.idOf(x)] === x.answer; }).length;
  var stat = items.length ? "Lượt này " + items.length + " câu · đã làm " + done.length + "/" + items.length + " · đúng " + right +
    (done.length === items.length ? " · xong lượt" : "") : "";

  var prevDe = null, prevScen = null;
  var cards = items.map(function (x) {
    var head = "";
    if (!r.de && x.de !== prevDe) { head = '<h3 class="retry-de">Đề ' + x.de + " · " + s.DE[x.de] + "</h3>"; prevScen = null; }
    prevDe = x.de;
    var box = x.scen && x.scen !== prevScen ? s.scenBox(x.scen) : "";
    prevScen = x.scen;
    return head + box + s.card(x, r.picks[s.idOf(x)]);
  }).join("");

  el.innerHTML = "<h2>Làm lại câu sai" + (r.de ? " · Đề " + r.de : " · mọi đề") + "</h2>" +
    '<p class="muted">Các câu mà lần trả lời gần nhất của bạn trong sổ là sai. Không tính lần làm trên đề gốc (ảnh chụp). ' +
    "Làm lại ở đây không xóa gì: mỗi lần chọn vẫn vào lịch sử thống kê, và đáp án mới thay đáp án cũ ở trang đề. " +
    "Bấm “Lượt mới” để làm tiếp những câu vẫn còn sai.</p>" +
    '<div class="bar">' + (stat ? '<span class="stat">' + stat + "</span>" : "") +
    '<a class="btn" href="' + here + '">Lượt mới</a>' +
    (r.de ? '<a class="btn" href="#sai">Câu sai của mọi đề</a><a class="btn" href="#de-' + r.de + '">Về Đề ' + r.de + "</a>" : "") + "</div>" +
    (cards ? '<div class="list">' + cards + "</div>" :
      '<p class="empty">Không có câu nào đang sai: mọi câu bạn đã làm' + (r.de ? " trong Đề " + r.de : " trong sổ") + " đều đúng ở lần trả lời gần nhất.</p>");
}
