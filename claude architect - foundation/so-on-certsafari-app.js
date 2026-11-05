// Sổ ôn: thẻ câu hỏi, cửa sổ giải thích, menu đề thu gọn được, điều hướng theo hash.
// Hash: #de-N (xem đề N), #deN-qM (nhảy tới câu M của đề N), #stats (thống kê).
// Cần NOTES, DOMAINS, SCENARIOS, DE, ENTRIES (trang + file dữ liệu) và renderStats (so-on-certsafari-stats.js).
// Đáp án là chuỗi chữ cái xếp tăng dần: "D", hoặc "BD" cho câu chọn hai (chọn đủ số phương án mới chấm).
(function () {
  var KEY = "so-on-certsafari-picks", LOG_KEY = "so-on-certsafari-log";
  function load(key) { try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; } }
  function store(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {} }
  var picks = load(KEY) || {};      // id câu → đáp án đang chọn; nút làm lại xóa nó
  var pending = {};                 // câu chọn nhiều: các phương án đã bấm nhưng chưa đủ số, chưa chấm
  var log = load(LOG_KEY);          // mọi lần chọn {id, k, t}; làm lại không xóa, dùng cho thống kê
  if (!Array.isArray(log)) {        // lần đầu có thống kê: lấy các câu đã chọn từ trước làm lịch sử
    log = Object.keys(picks).map(function (id) { return { id: id, k: picks[id], t: 0 }; });
    store(LOG_KEY, log);
  }

  var $ = function (id) { return document.getElementById(id); };
  var deNums = Object.keys(DE).map(Number).sort(function (a, b) { return a - b; });
  var route = { view: "de", de: deNums[0] };
  var openGroups = {};              // đề nào đang mở trong menu; giữ qua các lần vẽ lại
  var fresh = null;                 // id câu vừa chọn: chỉ thẻ và ô số của câu này chạy hiệu ứng khi vẽ lại
  var list = $("list"), onlyMissed = $("only-missed");

  // Chạy lại một animation CSS trên phần tử (bỏ class, ép reflow, gắn lại).
  function replay(el, cls) { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }

  function idOf(x) { return "de" + x.de + "-q" + x.n; }
  function inDe(n) { return ENTRIES.filter(function (x) { return x.de === n; }); }
  function find(id) { return ENTRIES.filter(function (x) { return idOf(x) === id; })[0]; }
  function has(s, k) { return !!s && s.indexOf(k) >= 0; }
  function letters(s) { return s.split("").join(", "); }
  function chip(x, label) {
    var p = picks[idOf(x)];
    var cls = "chip" + (p ? (p === x.answer ? " ok" : " bad") : "") + (idOf(x) === fresh ? " fresh" : "");
    return '<a class="' + cls + '" href="#' + idOf(x) + '" title="Câu ' + x.n + " · " + x.sub + " " + x.subName + '">' + (label || x.n) + "</a>";
  }

  function card(x) {
    var id = idOf(x), p = picks[id], done = !!p, multi = x.answer.length > 1, sel = pending[id] || "";
    var opts = x.opts.map(function (o) {
      var ok = has(x.answer, o.k);
      var cls = "opt" + (done && ok ? " right" : "") + (done && has(p, o.k) ? " chosen" : "") + (!done && has(sel, o.k) ? " picked" : "");
      var mark = !done ? "" : (ok ? "Đáp án đúng" : (has(p, o.k) ? "Bạn chọn" : ""));
      return '<button type="button" class="' + cls + '" data-id="' + id + '" data-k="' + o.k + '"' +
        (done ? " disabled" : multi ? ' aria-pressed="' + has(sel, o.k) + '"' : "") + ">" +
        '<span class="k">' + o.k + '</span><span class="gist">' + o.gist + (mark ? '<span class="mark">' + mark + "</span>" : "") + "</span></button>";
    }).join("");
    var reveal = "";
    if (done) {
      var right = p === x.answer;
      reveal = '<p class="result ' + (right ? "ok" : "bad") + '">' + (right ? "Đúng" : "Sai: đáp án đúng là " + letters(x.answer)) + "</p>" +
        (x.first ? '<p class="first">Lần đầu làm trên đề gốc: chọn ' + letters(x.first) + (x.first === x.answer ? ", đúng." : ", sai.") + "</p>" : "") +
        '<div class="actions"><button type="button" class="explain" data-explain="' + id + '">Giải thích</button>' +
        '<button type="button" class="redo" data-redo="' + id + '">Làm lại câu này</button></div>';
    }
    var head = "<span>Câu " + x.n + "/" + x.total + '</span><span class="sub">' + x.sub + " " + x.subName + "</span>" +
      (x.scen ? '<span class="scen-tag" title="' + SCENARIOS[x.scen].name + '">Scenario ' + x.scen + "</span>" : "") +
      (multi ? '<span class="need">Chọn ' + x.answer.length + "</span>" : "");
    return '<article class="card' + (id === fresh ? " fresh" : "") + '" id="' + id + '"><div class="head">' + head + "</div>" +
      '<p class="ask">' + x.ask + '</p><div class="opts">' + opts + "</div>" + reveal + "</article>";
  }

  // Khung scenario: đứng trước câu đầu của mỗi chuỗi câu liền nhau cùng scenario.
  function scenBox(key) {
    var s = SCENARIOS[key];
    return '<aside class="scen"><p class="scen-name">Scenario ' + key + " · " + s.name + '</p><p class="scen-en">' + s.en + '</p><p class="scen-vi">' + s.vi + "</p></aside>";
  }

  // Cửa sổ giải thích: phân tích đề (scene/asks/facts) rồi từng phương án (why dạng mảng gạch đầu dòng).
  var dlg = $("explain");
  function block(v, tag) {
    if (!v) return "";
    if (!Array.isArray(v)) return "<p>" + v + "</p>";
    return "<" + tag + ">" + v.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</" + tag + ">";
  }
  function section(title, body) { return body ? "<section><h3>" + title + "</h3>" + body + "</section>" : ""; }
  function explain(x) {
    var p = picks[idOf(x)];
    var opts = x.opts.map(function (o) {
      var ok = has(x.answer, o.k);
      var tags = (has(p, o.k) ? '<span class="tag">bạn chọn</span>' : "") + (has(x.first, o.k) ? '<span class="tag">lần đầu chọn</span>' : "");
      return '<div class="xo' + (ok ? " right" : "") + '"><p class="xo-head"><b class="k">' + o.k + '</b><span class="verdict">' +
        (ok ? "✓ Đúng" : "✗ Sai") + "</span>" + tags + '</p><p class="xo-gist">' + o.gist + "</p>" + block(o.why, "ul") + "</div>";
    }).join("");
    var refs = x.refs.map(function (r) { return '<li><a href="' + r.href + '" target="_blank" rel="noopener">' + r.label + "</a></li>"; }).join("");
    $("x-title").textContent = "Câu " + x.n + "/" + x.total + " · " + x.sub + " " + x.subName;
    $("x-body").innerHTML = section("Đề kể gì", block(x.scene, "ul")) + section("Đề hỏi gì", block(x.asks, "ul")) +
      section("Cần biết trước", block(x.facts, "ol")) + section("Từng phương án", opts) +
      (x.dispute ? '<p class="note"><b>Ghi chú về đáp án của đề gốc:</b> ' + x.dispute + "</p>" : "") +
      section("Đọc lại", '<ul class="refs">' + refs + "</ul>");
    clearTimeout(closing); dlg.classList.remove("closing");
    if (dlg.showModal) { if (!dlg.open) dlg.showModal(); } else dlg.setAttribute("open", "");
    $("x-body").scrollTop = 0;   // cuộn về đầu sau khi mở: lúc dialog còn ẩn, trình duyệt bỏ qua lệnh cuộn
  }
  // Đóng có hiệu ứng: gắn class closing, chờ hết animation (.18s trong CSS) rồi mới đóng hẳn.
  var closing = 0;
  function closeExplain() {
    function shut() { dlg.classList.remove("closing"); if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); }
    if (!dlg.open || dlg.classList.contains("closing")) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return shut();
    dlg.classList.add("closing");
    closing = setTimeout(shut, 180);
  }
  dlg.addEventListener("cancel", function (e) { e.preventDefault(); closeExplain(); });   // Esc cũng đóng có hiệu ứng

  function renderMenu() {
    $("menu").innerHTML = deNums.map(function (n) {
      var items = inDe(n), done = items.filter(function (x) { return picks[idOf(x)]; });
      var right = done.filter(function (x) { return picks[idOf(x)] === x.answer; }).length;
      var here = route.view === "de" && route.de === n;
      return '<details class="grp" data-de="' + n + '"' + (openGroups[n] ? " open" : "") + ">" +
        "<summary" + (here ? ' aria-current="true"' : "") + '><span class="grp-name">Đề ' + n + '</span><span class="grp-meta">' +
        items.length + " câu · đúng " + right + "/" + done.length + "</span></summary>" +
        '<a class="grp-label" href="#de-' + n + '">' + DE[n] + "</a>" +
        '<div class="chips">' + items.map(function (x) { return chip(x); }).join("") + "</div></details>";
    }).join("") || '<p class="muted">Chưa có đề nào.</p>';
    $("nav-stats").setAttribute("aria-current", String(route.view === "stats"));
  }

  function renderDe() {
    if (!deNums.length) { list.innerHTML = '<p class="empty">Chưa có đề nào. Gửi ảnh câu quiz để thêm vào.</p>'; return; }
    var items = inDe(route.de);
    var shown = items.filter(function (x) { return !onlyMissed.checked || (x.first && x.first !== x.answer); });
    var answered = items.filter(function (x) { return picks[idOf(x)]; });
    var right = answered.filter(function (x) { return picks[idOf(x)] === x.answer; }).length;
    $("stat").textContent = "Đề " + route.de + " · " + DE[route.de] + " · đã trả lời " + answered.length + "/" + items.length + " · đúng " + right;
    var prev = null;
    list.innerHTML = shown.length ? shown.map(function (x) {
      var box = x.scen && x.scen !== prev ? scenBox(x.scen) : "";
      prev = x.scen;
      return box + card(x);
    }).join("") :
      '<p class="empty">' + (items.length ? "Đề này không có câu nào lần đầu làm sai." : "Đề này chưa có câu nào. Gửi ảnh câu quiz để thêm vào.") + "</p>";
  }

  function render() {
    $("view-de").hidden = route.view !== "de";
    $("view-stats").hidden = route.view !== "stats";
    if (route.view === "stats") {
      renderStats($("view-stats"), { entries: ENTRIES, picks: picks, log: log, domains: DOMAINS, idOf: idOf, chip: chip, multi: deNums.length > 1 });
    } else renderDe();
    renderMenu();
  }

  function closeMenu() { document.body.classList.remove("menu-open"); }

  function readHash() {
    var h = location.hash.slice(1), m, q = null;
    if (h === "stats") route = { view: "stats" };
    else if ((m = /^de(\d+)-q\d+$/.exec(h)) && DE[m[1]]) { route = { view: "de", de: Number(m[1]) }; q = h; }
    else if ((m = /^de-(\d+)$/.exec(h)) && DE[m[1]]) route = { view: "de", de: Number(m[1]) };
    else route = { view: "de", de: deNums[0] };
    if (route.view === "de") openGroups[route.de] = true;
    render();
    if (q && !$(q) && onlyMissed.checked) { onlyMissed.checked = false; render(); }   // bộ lọc đang ẩn câu cần tới
    closeMenu();
    replay(q ? $(q) : $(route.view === "stats" ? "view-stats" : "view-de"), q ? "flash" : "view-in");
    if (q && $(q)) $(q).scrollIntoView({ block: "start" });
    else window.scrollTo(0, 0);
  }

  list.addEventListener("click", function (e) {
    var opt = e.target.closest("button.opt");
    if (opt && !opt.disabled) {
      var id = opt.getAttribute("data-id"), k = opt.getAttribute("data-k"), need = find(id).answer.length;
      if (need > 1) {               // câu chọn nhiều: bấm để đánh dấu hoặc bỏ, đủ số phương án mới chấm
        var s = (has(pending[id], k) ? pending[id].replace(k, "") : (pending[id] || "") + k).split("").sort().join("");
        if (s.length < need) { pending[id] = s; render(); return; }
        delete pending[id]; k = s;
      }
      picks[id] = k;
      log.push({ id: id, k: k, t: Date.now() });
      store(KEY, picks); store(LOG_KEY, log);
      fresh = id; render(); fresh = null; return;
    }
    var ex = e.target.closest("button[data-explain]");
    if (ex) {
      var hit = find(ex.getAttribute("data-explain"));
      if (hit) explain(hit);
      return;
    }
    var redo = e.target.closest("button[data-redo]");
    if (redo) { delete picks[redo.getAttribute("data-redo")]; store(KEY, picks); render(); }
  });
  $("x-close").addEventListener("click", closeExplain);
  dlg.addEventListener("click", function (e) { if (e.target === dlg) closeExplain(); });   // bấm ra ngoài khung thì đóng
  onlyMissed.addEventListener("change", render);
  $("redo-all").addEventListener("click", function () {
    inDe(route.de).forEach(function (x) { delete picks[idOf(x)]; delete pending[idOf(x)]; });
    store(KEY, picks); render();
  });
  $("view-stats").addEventListener("click", function (e) {
    var b = e.target.closest("#stats-clear");
    if (!b) return;
    if (b.getAttribute("data-armed")) { log = []; store(LOG_KEY, log); render(); }
    else { b.setAttribute("data-armed", "1"); b.textContent = "Bấm lần nữa để xóa hẳn lịch sử"; }
  });
  $("menu").addEventListener("toggle", function (e) {
    if (e.target.matches && e.target.matches("details.grp")) openGroups[e.target.getAttribute("data-de")] = e.target.open;
  }, true);
  document.addEventListener("click", function (e) {
    // Bấm lại đúng link đang mở thì hashchange không chạy: tự điều hướng để vẫn cuộn tới câu và đóng menu.
    var a = e.target.closest('a[href^="#"]');
    if (a && a.getAttribute("href") === location.hash) readHash();
    // Mở một nhóm thu gọn (đề trong menu, domain trong thống kê): nội dung trượt vào. Chỉ khi người dùng bấm, không chạy khi vẽ lại.
    var s = e.target.closest("details > summary");
    if (s) requestAnimationFrame(function () { if (s.parentElement.open) replay(s.parentElement, "unfold"); });
  });
  $("menu-open").addEventListener("click", function () { document.body.classList.add("menu-open"); });
  $("menu-close").addEventListener("click", closeMenu);
  $("backdrop").addEventListener("click", closeMenu);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  window.addEventListener("hashchange", readHash);
  readHash();
})();
