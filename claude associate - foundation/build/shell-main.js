(function(){
  var $ = function(s, r){ return (r||document).querySelector(s); };
  var $$ = function(s, r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };
  var DKEY = "ccaof-v1-done", QKEY = "ccaof-v1-quiz", PKEY = "ccaof-v1-plan";
  function load(k, d){ try { return JSON.parse(localStorage.getItem(k)) || d; } catch(e){ return d; } }
  function save(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
  var done = load(DKEY, {}), quizBest = load(QKEY, {}), plan = load(PKEY, {});

  // ----- lessons & groups -----
  var lessons = $$(".lesson");
  var groups = $$("section.domain, section.part");
  function groupTitle(g){ return $(".dhead h2", g).textContent; }

  // ----- drawer nav -----
  function buildNav(){
    var box = $("#navList"); box.innerHTML = "";
    var a0 = document.createElement("a"); a0.href = "#roadmap"; a0.className = "head"; a0.innerHTML = '<span class="ck"></span><span>Lộ trình & tiến độ</span>'; box.appendChild(a0);
    groups.forEach(function(g){
      var gl = $$(".lesson", g);
      var h = document.createElement("div"); h.className = "grp"; h.textContent = groupTitle(g); var hn = document.createElement("span"); hn.className = "n"; hn.dataset.group = g.id; h.appendChild(hn); box.appendChild(h);
      gl.forEach(function(l){
        var a = document.createElement("a"); a.href = "#" + l.id; a.dataset.lesson = l.id;
        var t = $(".lh h3", l).textContent, ts = $(".lh .ts", l).textContent;
        a.innerHTML = '<span class="ck"></span><span></span><span class="sub"></span>';
        a.children[1].textContent = t; a.children[2].textContent = ts;
        a.addEventListener("click", function(){ g.classList.remove("collapsed"); closeNav(); });
        box.appendChild(a);
      });
      if (g.classList.contains("domain")) {
        var c = document.createElement("a"); c.href = "#cheat-d" + g.dataset.domain; c.innerHTML = '<span class="ck" style="border-style:dashed"></span><span>Tổng kết + Cheatsheet</span>';
        c.addEventListener("click", function(){ g.classList.remove("collapsed"); closeNav(); });
        box.appendChild(c);
      }
    });
  }
  function openNav(){ document.body.classList.add("nav-open"); }
  function closeNav(){ document.body.classList.remove("nav-open"); }
  $("#menuBtn").addEventListener("click", openNav);
  $("#closeBtn").addEventListener("click", closeNav);
  $("#scrim").addEventListener("click", closeNav);
  $("#modeStudy").addEventListener("click", function(){ document.body.classList.remove("cheat-mode"); $("#modeStudy").classList.add("on"); $("#modeCheat").classList.remove("on"); closeNav(); window.scrollTo(0,0); });
  $("#modeCheat").addEventListener("click", function(){ document.body.classList.add("cheat-mode"); $("#modeCheat").classList.add("on"); $("#modeStudy").classList.remove("on"); closeNav(); window.scrollTo(0,0); });

  // ----- collapse -----
  groups.forEach(function(g){
    var b = $(".tog", g);
    b.addEventListener("click", function(){ g.classList.toggle("collapsed"); b.textContent = g.classList.contains("collapsed") ? "Mở" : "Thu gọn"; });
  });

  // ----- checkboxes -----
  lessons.forEach(function(l){
    var cb = $("label.done input", l);
    cb.checked = !!done[l.id];
    cb.addEventListener("change", function(){ done[l.id] = cb.checked; save(DKEY, done); render(); });
  });

  // ----- roadmap -----
  // Stages carry lesson ids only; the domain groups are read from the page so the list stays in sync.
  function idsOf(sel){ return $$(sel + " .lesson").map(function(l){ return l.id; }); }
  var WEEKS = [
    { t: "Chặng 1 · Mở đầu + D1 + D2 (35% đề)", ids: idsOf("#p0").concat(idsOf("#d1"), idsOf("#d2")), note: "Prompt tốt và kiểm output là lõi của đề: D2 nặng nhất (21%). Làm quiz D1, D2 đến khi ≥ 80%." },
    { t: "Chặng 2 · D3 + D4 + D5 (40% đề)", ids: idsOf("#d3").concat(idsOf("#d4"), idsOf("#d5")), note: "Tên tính năng, model, Projects và connector. Nếu có tài khoản Claude: tự tạo một Project có instructions + knowledge rồi thử." },
    { t: "Chặng 3 · D6 + D7 + ôn tập (25% đề)", ids: idsOf("#d6").concat(idsOf("#d7"), idsOf("#p8")), note: "Dữ liệu nhạy cảm, chính sách, đạo đức, sửa output kém. Rồi ôn: khẩu vị đáp án, câu mẫu chính thức." },
    { t: "Chặng 4 · Thi thử và thi thật lần 1", ids: idsOf("#p9"), note: "Làm đề luyện ngoài ít nhất 2 lần (≥ 80%), đọc chế độ “Chỉ cheatsheet”, rồi thi.", exam: true },
    { t: "Nếu rớt lần 1", ids: [], note: "Phải chờ 14 ngày. Đọc % theo domain trên phiếu điểm → mở cheatsheet domain yếu → làm lại quiz domain đó → luyện đề lại ≥ 85% rồi thi lần 2.", exam: true }
  ];
  function fmtDate(d){ return d.toLocaleDateString("vi-VN", { weekday: "short", day: "2-digit", month: "2-digit" }); }
  function daysLeft(iso){ if (!iso) return null; var t = new Date(iso + "T00:00:00"); var now = new Date(); now.setHours(0,0,0,0); return Math.round((t - now) / 86400000); }
  function renderPlan(){
    ["dMock","dA1","dA2"].forEach(function(id){
      var inp = $("#"+id); if (plan[id]) inp.value = plan[id];
      var n = daysLeft(inp.value); var lab = $("#l"+id.slice(1));
      lab.textContent = n === null ? "" : (n > 0 ? "còn " + n + " ngày" : (n === 0 ? "hôm nay" : "đã qua " + (-n) + " ngày"));
    });
    var a1 = $("#dA1").value, a2 = $("#dA2").value;
    if (a1 && a2) { var gap = Math.round((new Date(a2) - new Date(a1)) / 86400000); if (gap < 14) $("#lA2").textContent += " · ⚠ phải cách lần 1 ≥ 14 ngày"; }
    // possible exam refresh on 2026-12-07 (unconfirmed): warn when an attempt falls on or after it
    ["dA1","dA2"].forEach(function(id){ var v = $("#"+id).value; if (v && v >= "2026-12-07") $("#l"+id.slice(1)).textContent += " · ⚠ từ 7/12 đề có thể đã đổi"; });
  }
  ["dMock","dA1","dA2"].forEach(function(id){ $("#"+id).addEventListener("change", function(){ plan[id] = $("#"+id).value; save(PKEY, plan); renderPlan(); }); });
  $("#today").textContent = fmtDate(new Date());

  function renderWeeks(){
    var box = $("#weeks"); box.innerHTML = "";
    WEEKS.forEach(function(w){
      var n = w.ids.length, d = w.ids.filter(function(id){ return done[id]; }).length;
      var el = document.createElement("div"); el.className = "week" + (w.exam ? " exam" : "");
      var pct = n ? Math.round(d / n * 100) : 0;
      el.innerHTML = '<div class="wh"><b></b><span></span></div>' + (n ? '<div class="wb"><i style="width:'+pct+'%"></i></div>' : '') + '<ul></ul>';
      $(".wh b", el).textContent = w.t; $(".wh span", el).textContent = n ? d + "/" + n + " bài" : "";
      var ul = $("ul", el);
      var li0 = document.createElement("li"); li0.textContent = w.note; ul.appendChild(li0);
      w.ids.forEach(function(id){ var l = document.getElementById(id); if (!l) return; var li = document.createElement("li"); var a = document.createElement("a"); a.href = "#" + id; a.textContent = (done[id] ? "✓ " : "○ ") + $(".lh h3", l).textContent; a.style.textDecoration = "none"; a.style.color = done[id] ? "var(--ok)" : "var(--ink)"; a.addEventListener("click", function(){ var g = l.closest("section"); if (g) g.classList.remove("collapsed"); }); li.appendChild(a); ul.appendChild(li); });
      box.appendChild(el);
    });
  }

  // ----- render all progress -----
  function render(){
    var n = 0;
    lessons.forEach(function(l){ var d = !!done[l.id]; if (d) n++; l.classList.toggle("isdone", d); var a = $('.drawer a[data-lesson="'+l.id+'"]'); if (a) a.classList.toggle("done", d); });
    var pct = Math.round(n / lessons.length * 100);
    $("#pbar").style.width = pct + "%"; $("#topPct").textContent = pct + "%"; $("#topSub").textContent = n + "/" + lessons.length + " bài đã học";
    groups.forEach(function(g){
      var gl = $$(".lesson", g), gd = gl.filter(function(l){ return done[l.id]; }).length;
      $(".dprog .wb i", g).style.width = (gl.length ? gd / gl.length * 100 : 0) + "%";
      var q = $(".quiz[data-course]", g); var qb = q && quizBest[q.dataset.course];
      $(".dprog span", g).textContent = gd + "/" + gl.length + " bài" + (qb ? " · quiz " + qb.right + "/" + qb.total : "");
      var hn = $('.drawer .grp .n[data-group="' + g.id + '"]'); if (hn) hn.textContent = gd + "/" + gl.length;
    });
    renderWeeks(); renderPlan();
  }

  // ----- quiz -----
  var LETTERS = ["A","B","C","D","E","F"];
  function shuffle(a){ for (var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
  function sameSet(a,b){ if (a.length!==b.length) return false; return a.slice().sort().join(",")===b.slice().sort().join(","); }
  function buildQuiz(box){
    var cid = box.getAttribute("data-course"); var items = (window.QUIZ && window.QUIZ[cid]) || [];
    box.innerHTML = "";
    var h = document.createElement("h4"); h.textContent = (box.dataset.title || "Quiz cuối phần") + " · " + items.length + " câu · tiếng Anh như đề thật"; box.appendChild(h);
    var best = document.createElement("div"); best.className = "best"; var b = quizBest[cid]; best.textContent = b ? "Lần tốt nhất: " + b.right + "/" + b.total + " (" + Math.round(b.right/b.total*100) + "%)" : "Chưa làm. Mục tiêu ≥ 80%."; box.appendChild(best);
    var score = { right: 0, answered: 0 }; var result = document.createElement("div"); result.className = "result";
    items.forEach(function(it, qi){
      var answers = Array.isArray(it.a) ? it.a : [it.a]; var multi = answers.length > 1;
      var q = document.createElement("div"); q.className = "q";
      var p = document.createElement("div"); p.className = "p"; p.textContent = (qi+1) + ". " + it.q;
      if (multi) { var tg = document.createElement("span"); tg.className = "tag"; tg.textContent = "choose " + answers.length; p.appendChild(tg); }
      q.appendChild(p);
      var order = shuffle(it.o.map(function(_, i){ return i; })); var btns = [], picked = [], checkBtn = null;
      function finish(){
        q.classList.add("answered"); score.answered++; if (sameSet(picked, answers)) score.right++;
        btns.forEach(function(bt, pos){ var oi = order[pos]; if (answers.indexOf(oi) >= 0) bt.classList.add("right"); else if (picked.indexOf(oi) >= 0) bt.classList.add("wrong"); bt.classList.remove("sel"); bt.setAttribute("disabled", ""); });
        if (checkBtn) checkBtn.remove();
        if (score.answered === items.length) {
          var pct = Math.round(score.right / items.length * 100);
          if (!quizBest[cid] || score.right > quizBest[cid].right) { quizBest[cid] = { right: score.right, total: items.length }; save(QKEY, quizBest); }
          result.innerHTML = ""; var t = document.createElement("span"); t.textContent = "Kết quả: " + score.right + "/" + items.length + " (" + pct + "%). " + (pct >= 80 ? "Đạt mức an toàn." : "Đọc lại tổng kết + cheatsheet rồi làm lại."); result.appendChild(t);
          var again = document.createElement("button"); again.type = "button"; again.className = "retry"; again.textContent = "Làm lại (đảo đáp án)"; again.addEventListener("click", function(){ buildQuiz(box); render(); }); result.appendChild(again); result.classList.add("show");
          render();
        }
      }
      order.forEach(function(oi, pos){
        var bt = document.createElement("button"); bt.type = "button"; bt.className = "opt"; bt.textContent = LETTERS[pos] + ". " + it.o[oi];
        bt.addEventListener("click", function(){
          if (q.classList.contains("answered")) return;
          if (!multi) { picked = [oi]; finish(); return; }
          var k = picked.indexOf(oi); if (k >= 0) { picked.splice(k,1); bt.classList.remove("sel"); } else if (picked.length < answers.length) { picked.push(oi); bt.classList.add("sel"); }
          checkBtn.disabled = picked.length !== answers.length;
        });
        btns.push(bt); q.appendChild(bt);
      });
      if (multi) { checkBtn = document.createElement("button"); checkBtn.type = "button"; checkBtn.className = "check"; checkBtn.textContent = "Check answer"; checkBtn.disabled = true; checkBtn.addEventListener("click", finish); q.appendChild(checkBtn); }
      var ex = document.createElement("div"); ex.className = "ex"; ex.textContent = it.e; q.appendChild(ex);
      box.appendChild(q);
    });
    box.appendChild(result);
  }
  $$(".quiz[data-course]").forEach(buildQuiz);

  // ----- worked exam questions: pick an answer first, then reveal the explanation -----
  $$(".qcase[data-answer]").forEach(function(c){
    var ans = c.dataset.answer, fb = $(".qfb", c), exp = $(".qexp", c), btns = $$(".qopt", c);
    btns.forEach(function(b){
      b.addEventListener("click", function(){
        if (c.classList.contains("answered")) return;
        c.classList.add("answered");
        var ok = b.dataset.k === ans;
        btns.forEach(function(x){ x.disabled = true; if (x.dataset.k === ans) x.classList.add("right"); });
        if (!ok) b.classList.add("wrong");
        fb.textContent = ok ? "Đúng rồi: đáp án " + ans + "." : "Bạn chọn " + b.dataset.k + ", chưa đúng. Đáp án đúng là " + ans + ".";
        fb.className = "qfb " + (ok ? "ok" : "no");
        fb.hidden = false; exp.hidden = false;
      });
    });
    $(".qreset", c).addEventListener("click", function(){
      c.classList.remove("answered");
      btns.forEach(function(x){ x.disabled = false; x.classList.remove("right", "wrong"); });
      fb.hidden = true; exp.hidden = true;
      btns[0].focus();
    });
  });

  buildNav(); render();

  // ----- scroll-spy: highlight the lesson in view in the menu, keep it visible in the sidebar -----
  var spyTargets = $$(".lesson, .summary, .cheat"), activeId = null, ticking = false;
  function spy(){
    ticking = false;
    var line = (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--top")) || 60) + 40;
    var cur = null;
    for (var i = 0; i < spyTargets.length; i++) { var el = spyTargets[i]; if (el.offsetParent === null) continue; if (el.getBoundingClientRect().top <= line) cur = el; else break; }
    var id = cur ? (cur.classList.contains("lesson") ? cur.id : "cheat-d" + (cur.closest("section.domain") || {dataset:{}}).dataset.domain) : null;
    if (id === activeId) return; activeId = id;
    $$(".drawer a.active, .drawer .grp.active").forEach(function(a){ a.classList.remove("active"); });
    if (!id) return;
    var link = $('.drawer a[data-lesson="' + id + '"]') || $('.drawer a[href="#' + id + '"]');
    if (link) { link.classList.add("active"); var g = link.previousElementSibling; while (g && !g.classList.contains("grp")) g = g.previousElementSibling; if (g) g.classList.add("active");
      var dr = $("#drawer"); var lr = link.getBoundingClientRect(), dd = dr.getBoundingClientRect(); if (lr.top < dd.top + 60 || lr.bottom > dd.bottom - 60) dr.scrollTop += (lr.top - dd.top) - dd.height / 2; }
  }
  window.addEventListener("scroll", function(){ if (!ticking) { ticking = true; requestAnimationFrame(spy); } }, { passive: true });
  window.addEventListener("resize", function(){ if (!ticking) { ticking = true; requestAnimationFrame(spy); } });
  setTimeout(spy, 50);
  window.addEventListener("load", function(){ setTimeout(spy, 100); });
  window.addEventListener("hashchange", function(){ setTimeout(spy, 400); });

  // mobile: collapse every group except the one holding the first unfinished lesson; desktop: keep all open
  if (window.matchMedia("(max-width: 999px)").matches) {
    var firstOpen = null;
    lessons.some(function(l){ if (!done[l.id]) { firstOpen = l.closest("section"); return true; } return false; });
    groups.forEach(function(g){ if (g !== firstOpen) { g.classList.add("collapsed"); $(".tog", g).textContent = "Mở"; } });
  }
  // open the group that holds a link target, so jumps into a collapsed group land
  function openGroupOf(id){ var tgt = id && document.getElementById(id); var g = tgt && tgt.closest("section.domain, section.part"); if (g && g.classList.contains("collapsed")) { g.classList.remove("collapsed"); $(".tog", g).textContent = "Thu gọn"; } }
  if (location.hash) openGroupOf(location.hash.slice(1));
  document.addEventListener("click", function(e){ var a = e.target.closest && e.target.closest('a[href^="#"]'); if (a) openGroupOf(a.getAttribute("href").slice(1)); });
})();
