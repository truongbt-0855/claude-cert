// Thống kê câu và domain hay sai của Sổ ôn.
// Mỗi câu tính lần làm đầu trên đề gốc (first, nếu có) cộng mọi lần chọn trong sổ (log, giữ cả sau khi bấm làm lại).
// s = { entries, picks, log, domains, idOf, chip(x, label), multi }
function renderStats(el, s) {
  var tries = {};
  s.log.forEach(function (a) { (tries[a.id] = tries[a.id] || []).push(a.k); });
  var rows = s.entries.map(function (x) {
    var all = (x.first ? [x.first] : []).concat(tries[s.idOf(x)] || []);
    return { x: x, all: all, fromFirst: !!x.first, wrong: all.filter(function (k) { return k !== x.answer; }).length };
  });

  function pct(a, b) { return b ? Math.round(100 * a / b) : 0; }
  function tally(list) {
    return list.reduce(function (t, r) { t.t += r.all.length; t.w += r.wrong; return t; }, { t: 0, w: 0 });
  }
  function meter(t) { return '<span class="meter" aria-hidden="true"><span style="width:' + pct(t.w, t.t) + '%"></span></span>'; }
  function label(x) { return s.multi ? "Đ" + x.de + "·" + x.n : String(x.n); }
  function plain(html) { var d = document.createElement("div"); d.innerHTML = html; return d.textContent; }
  function esc(t) { return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function bySub(a, b) { var p = a.split("."), q = b.split("."); return p[0] - q[0] || p[1] - q[1]; }
  function numText(t) { return t.t ? "sai " + t.w + "/" + t.t + " lần · " + pct(t.w, t.t) + "%" : "chưa làm"; }

  // Domain → task statement → câu. Domain có tỉ lệ sai cao lên đầu; domain chưa làm hoặc chưa có câu xuống cuối.
  var doms = {};
  Object.keys(s.domains).forEach(function (d) { doms[d] = []; });
  rows.forEach(function (r) { var d = r.x.sub.split(".")[0]; (doms[d] = doms[d] || []).push(r); });
  var domHtml = Object.keys(doms).map(function (d) {
    var t = tally(doms[d]);
    return { d: d, t: t, rate: doms[d].length ? (t.t ? t.w / t.t : -1) : -2 };
  }).sort(function (a, b) { return b.rate - a.rate || a.d - b.d; }).map(function (g) {
    var info = s.domains[g.d] || { name: "Khác", weight: 0 };
    var subs = {};
    doms[g.d].forEach(function (r) { (subs[r.x.sub] = subs[r.x.sub] || []).push(r); });
    var tsHtml = Object.keys(subs).sort(bySub).map(function (k) {
      var t = tally(subs[k]);
      return '<li class="ts"><span class="ts-name"><span class="sub">' + k + "</span> " + subs[k][0].x.subName + "</span>" +
        '<span class="ts-num">' + numText(t) + "</span>" + meter(t) +
        '<span class="chips">' + subs[k].map(function (r) { return s.chip(r.x, label(r.x)); }).join("") + "</span></li>";
    }).join("");
    return '<details class="dom"><summary><span class="dom-body">' +
      '<span class="dom-row"><span class="dom-name">D' + g.d + " · " + info.name + '</span><span class="dom-num">' + numText(g.t) + "</span></span>" +
      '<span class="dom-row2"><span>' + info.weight + "% đề thi · " + doms[g.d].length + " câu trong sổ</span>" + meter(g.t) + "</span>" +
      "</span></summary>" +
      (tsHtml ? '<ul class="ts-list">' + tsHtml + "</ul>" : '<p class="muted ts-empty">Chưa có câu nào của domain này trong sổ.</p>') +
      "</details>";
  }).join("");

  // Câu sai nhiều lần nhất lên đầu, rồi tới tỉ lệ sai.
  var miss = rows.filter(function (r) { return r.wrong; }).sort(function (a, b) {
    return b.wrong - a.wrong || b.wrong / b.all.length - a.wrong / a.all.length || a.x.de - b.x.de || a.x.n - b.x.n;
  });
  var missHtml = miss.map(function (r) {
    var x = r.x, ask = plain(x.ask);
    var dots = r.all.map(function (k, i) {
      var ok = k === x.answer;
      return '<i class="d ' + (ok ? "ok" : "bad") + '" title="' + (i === 0 && r.fromFirst ? "Đề gốc" : "Trong sổ") + ": chọn " + k + '">' + (ok ? "✓" : "✗") + "</i>";
    }).join("");
    return '<li class="miss">' + s.chip(x, label(x)) +
      '<a class="miss-ask" href="#' + s.idOf(x) + '">' + esc(ask.length > 150 ? ask.slice(0, 147) + "…" : ask) + "</a>" +
      '<span class="miss-meta"><span class="sub">' + x.sub + " " + x.subName + "</span><span>sai " + r.wrong + "/" + r.all.length + " lần</span>" +
      '<span class="dots" aria-label="Lịch sử trả lời">' + dots + "</span></span></li>";
  }).join("");

  var picked = s.entries.filter(function (x) { return s.picks[s.idOf(x)]; });
  var rightNow = picked.filter(function (x) { return s.picks[s.idOf(x)] === x.answer; }).length;
  var total = tally(rows);
  el.innerHTML = '<h2>Thống kê câu và domain hay sai</h2>' +
    '<p class="muted">Mỗi câu tính lần làm đầu trên đề gốc cộng mọi lần chọn trong sổ, kể cả sau khi bấm làm lại. Lịch sử chỉ lưu trong trình duyệt này.</p>' +
    '<p class="sum">Đã làm trong sổ <b>' + picked.length + "/" + s.entries.length + "</b> câu · đúng ở lần chọn gần nhất <b>" + rightNow + "/" + picked.length +
    "</b> · tổng <b>" + total.t + "</b> lần trả lời, sai <b>" + total.w + "</b> (" + pct(total.w, total.t) + "%)</p>" +
    '<h3>Theo domain</h3><p class="muted">Xếp theo tỉ lệ sai, cao nhất lên đầu. Bấm vào một domain để xem từng task statement và các câu của nó.</p>' + domHtml +
    '<h3>Câu hay sai</h3>' + (missHtml ? '<ol class="miss-list">' + missHtml + "</ol>" : '<p class="muted">Chưa có câu nào làm sai.</p>') +
    '<p class="stats-foot"><button type="button" class="redo" id="stats-clear">Xóa lịch sử thống kê</button></p>';
}
