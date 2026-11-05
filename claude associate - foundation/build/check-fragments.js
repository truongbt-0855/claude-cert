// Checks a notes fragment against SPEC.md. Usage: node check-fragments.js d3 [d4 …] | all
// Exit code 1 when any ERROR is found; WARN lines are advisory.
const fs = require("fs");
const path = require("path");
const { parseHtml, hasClass, byClass, byTag, findAll, textOf } = require("./mini-html-parser");

const TS_COUNT = { 1: 4, 2: 6, 3: 4, 4: 5, 5: 4, 6: 4, 7: 3 };
const PARTS = ["p0", "p8", "p9"];
const ALLOWED_HOSTS = ["support.claude.com", "claude.com", "www.claude.com", "www.anthropic.com", "anthropic.com", "docs.claude.com", "platform.claude.com", "anthropic.skilljar.com", "anthropic-partners.skilljar.com", "academy.claude.com", "privacy.claude.com", "code.claude.com"];
const PART_HOSTS = ["www.certsafari.com", "home.pearsonvue.com", "www.pearsonvue.com", "pearsonvue.com", "portal.tutorialsdojo.com", "www.udemy.com"];
const GLOBAL_ID = /^(l-\d-\d+|cheat-d\d|sum-d\d|d\d|p\d|top|roadmap)$/;

function checkQcase(q, where, err, warn) {
  const ans = q.attrs["data-answer"];
  if (!/^[A-D]$/.test(ans || "")) err(`${where}: data-answer "${ans}" phải là một chữ A–D`);
  const qt = byClass(q, "qtext")[0];
  if (!qt || !byClass(qt, "en").length || !byClass(qt, "vi").length) err(`${where}: .qtext cần .en và .vi`);
  const opts = byClass(q, "qopt");
  const keys = opts.map(o => o.attrs["data-k"]).join("");
  if (keys !== "ABCD") err(`${where}: cần đúng 4 .qopt A,B,C,D (đang có "${keys}")`);
  opts.forEach(o => { if (!byClass(o, "en").length || !byClass(o, "vi").length) err(`${where}: phương án ${o.attrs["data-k"]} thiếu .en hoặc .vi`); });
  const fb = byClass(q, "qfb")[0], exp = byClass(q, "qexp")[0];
  if (!fb || !("hidden" in fb.attrs)) err(`${where}: thiếu p.qfb hidden`);
  if (!exp || !("hidden" in exp.attrs)) { err(`${where}: thiếu div.qexp hidden`); return ans; }
  const labels = byClass(exp, "lbl").map(textOf).map(s => s.trim());
  ["Phân tích đề", "Cần biết để chọn", "Từng đáp án"].forEach(l => { if (!labels.includes(l)) err(`${where}: .qexp thiếu nhãn "${l}"`); });
  const v = byClass(exp, "verdict")[0];
  const lis = v ? v.children.filter(c => c.tag === "li") : [];
  if (lis.length !== 4) err(`${where}: .verdict cần 4 dòng (đang ${lis.length})`);
  const order = lis.map(li => (textOf(li).trim().match(/^([A-D])\s/) || [])[1] || "?").join("");
  if (lis.length === 4 && order !== "ABCD") err(`${where}: verdict phải theo thứ tự A,B,C,D (đang "${order}")`);
  const oks = lis.filter(li => hasClass(li, "ok"));
  if (oks.length !== 1) err(`${where}: cần đúng một li.ok`);
  else if (!textOf(oks[0]).trim().startsWith(ans + " đúng")) err(`${where}: li.ok phải mở đầu "${ans} đúng"`);
  lis.filter(li => !hasClass(li, "ok")).forEach(li => { if (!/^[A-D] sai/.test(textOf(li).trim())) warn(`${where}: dòng verdict nên mở đầu "X sai."`); });
  if (!byClass(exp, "qreset").length) err(`${where}: thiếu nút .qreset`);
  return ans;
}

function checkLesson(l, n, isPart, err, warn) {
  const id = l.attrs.id, where = id;
  if (l.attrs["data-domain"] !== String(n)) err(`${where}: data-domain phải là "${n}"`);
  if (!l.attrs["data-ts"] || !l.attrs["data-min"]) err(`${where}: thiếu data-ts hoặc data-min`);
  const lh = byClass(l, "lh")[0];
  if (!lh || !byClass(lh, "ts").length || !byTag(lh, "h3").length || !byClass(lh, "rt").length) err(`${where}: header.lh cần .ts, h3, .rt`);
  const done = byClass(l, "done")[0], cb = done && byTag(done, "input")[0];
  if (!cb || cb.attrs["data-lesson"] !== id) err(`${where}: label.done input data-lesson phải là "${id}"`);
  const last = l.children.filter(c => c.tag).slice(-1)[0];
  if (last && !hasClass(last, "done")) warn(`${where}: label.done nên là phần tử cuối`);
  const qcases = byClass(l, "qcase");
  const answers = qcases.map((q, i) => checkQcase(q, `${where} qcase ${i + 1}`, err, warn));
  if (isPart) return answers;
  const kids = l.children.filter(c => c.tag && c.tag !== "header" && !hasClass(c, "need"));
  const isFoundation = id.endsWith("-0");
  if (isFoundation) {
    if (byClass(l, "chk").length < 3) err(`${where}: bài Nền tảng cần ≥ 3 details.chk`);
  } else {
    if (!kids[0] || !hasClass(kids[0], "defs")) err(`${where}: div.defs phải đứng đầu bài (sau p.need)`);
    if (!byTag(l, "h4").some(h => textOf(h).trim() === "Khi đi thi")) err(`${where}: thiếu <h4>Khi đi thi</h4>`);
    if (qcases.length < 2) err(`${where}: cần ≥ 2 qcase (đang ${qcases.length})`);
    ["more", "rule", "remember", "vs", "story"].forEach(c => { if (!byClass(l, c).length) err(`${where}: thiếu div.${c}`); });
  }
  if (!byClass(l, "src").length) err(`${where}: thiếu div.src`);
  if (!byClass(l, "defs").length) err(`${where}: thiếu div.defs`);
  return answers;
}

function checkLinks(root, ids, isPart, err) {
  const hosts = isPart ? ALLOWED_HOSTS.concat(PART_HOSTS) : ALLOWED_HOSTS;
  byTag(root, "a").forEach(a => {
    const href = a.attrs.href || "";
    if (href.startsWith("#")) { const t = href.slice(1); if (!ids.has(t) && !GLOBAL_ID.test(t)) err(`line ${a.line}: link nội bộ ${href} không trỏ tới id nào`); return; }
    let host; try { host = new URL(href).host; } catch (e) { err(`line ${a.line}: href lạ "${href}"`); return; }
    if (!hosts.includes(host)) err(`line ${a.line}: domain không được phép ${host}`);
  });
}

function checkQuiz(file, err, warn) {
  if (!fs.existsSync(file)) { err(`thiếu ${path.basename(file)}`); return; }
  let items; try { items = JSON.parse(fs.readFileSync(file, "utf8")); } catch (e) { err(`${path.basename(file)}: JSON hỏng: ${e.message}`); return; }
  if (!Array.isArray(items) || items.length < 10 || items.length > 12) warn(`${path.basename(file)}: nên có 10–12 câu (đang ${items.length})`);
  let multi = 0;
  items.forEach((it, i) => {
    const w = `${path.basename(file)} câu ${i + 1}`;
    if (typeof it.q !== "string" || !it.q.trim() || typeof it.e !== "string" || !it.e.trim()) err(`${w}: thiếu q hoặc e`);
    if (!Array.isArray(it.o)) { err(`${w}: o phải là mảng`); return; }
    if (Array.isArray(it.a)) {
      multi++;
      if (it.a.length !== 2 || it.o.length !== 5 || it.a.some(x => !Number.isInteger(x) || x < 0 || x > 4) || it.a[0] === it.a[1]) err(`${w}: câu Choose TWO cần 5 phương án và a = [i, j]`);
      if (!/Choose TWO/i.test(it.q)) warn(`${w}: câu nhiều đáp án nên ghi "(Choose TWO.)"`);
    } else if (!Number.isInteger(it.a) || it.a < 0 || it.a >= it.o.length || it.o.length !== 4) err(`${w}: câu một đáp án cần 4 phương án và a là số 0–3`);
    if (/\b(both|all of the above|none of the above)\b/i.test(it.o.join(" "))) warn(`${w}: tránh "both / all of the above" vì phương án bị đảo`);
  });
  if (multi < 2) warn(`${path.basename(file)}: nên có 2 câu Choose TWO (đang ${multi})`);
}

function checkOne(name) {
  const errors = [], warns = [];
  const err = m => errors.push(m), warn = m => warns.push(m);
  const file = path.join(__dirname, name + ".html");
  if (!fs.existsSync(file)) return { errors: [`thiếu ${name}.html`], warns };
  const html = fs.readFileSync(file, "utf8");
  const { root, errors: perr } = parseHtml(html);
  perr.forEach(err);
  const isPart = PARTS.includes(name), n = Number(name.slice(1));
  if (/<script|<style|\son[a-z]+=/i.test(html)) err("không được có <script>, <style> hay on…= trong fragment");
  if (/qtip/.test(html) || /M[eẹ]o\b|\btips?\b/i.test(html.replace(/<[^>]+>/g, " "))) err("có chữ Mẹo/tip/qtip: SPEC cấm khối mẹo");
  if (/\bstem\b|đáp án nhiễu|distractor/i.test(html)) err("dùng chữ stem / đáp án nhiễu / distractor");
  const dashes = (html.match(/—/g) || []).length; if (dashes) warn(`có ${dashes} dấu gạch dài (—); SPEC: dùng dấu chấm, phẩy, hai chấm`);
  const tops = root.children.filter(c => c.tag);
  const sec = tops[0];
  if (tops.length !== 1 || sec.tag !== "section" || sec.attrs.id !== name) err(`file phải chứa đúng một <section id="${name}">`);
  if (!sec) return { errors, warns };
  if (!isPart && (!hasClass(sec, "domain") || sec.attrs["data-domain"] !== String(n))) err(`section cần class="domain" data-domain="${n}"`);
  if (isPart && !hasClass(sec, "part")) err(`section cần class="part"`);
  const all = findAll(root, x => !!x.attrs.id); const ids = new Set();
  all.forEach(x => { if (ids.has(x.attrs.id)) err(`id trùng: ${x.attrs.id}`); ids.add(x.attrs.id); });
  const lessons = byTag(sec, "article").filter(a => hasClass(a, "lesson"));
  if (!isPart) {
    const want = Array.from({ length: TS_COUNT[n] + 1 }, (_, k) => `l-${n}-${k}`).join(",");
    const got = lessons.map(l => l.attrs.id).join(",");
    if (want !== got) err(`bài phải là ${want} (đang ${got})`);
    ["dintro"].forEach(c => { if (!byClass(sec, c).length) err(`thiếu div.${c}`); });
    if (!ids.has(`sum-d${n}`) || !ids.has(`cheat-d${n}`)) err(`thiếu section.summary#sum-d${n} hoặc section.cheat#cheat-d${n}`);
    if (!byClass(sec, "quiz").some(q => q.attrs["data-course"] === name)) err(`thiếu <div class="quiz" data-course="${name}">`);
    checkQuiz(path.join(__dirname, `quiz-${name}.json`), err, warn);
  }
  const answers = [].concat(...lessons.map(l => checkLesson(l, isPart ? Number(l.attrs.id.split("-")[1]) : n, isPart, err, warn)));
  checkLinks(sec, ids, isPart, err);
  const dist = { A: 0, B: 0, C: 0, D: 0 }; answers.forEach(a => { if (dist[a] !== undefined) dist[a]++; });
  return { errors, warns, info: `${lessons.length} bài, ${answers.length} qcase, đáp án đúng A/B/C/D = ${dist.A}/${dist.B}/${dist.C}/${dist.D}` };
}

const args = process.argv.slice(2);
const names = args[0] === "all" ? ["p0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "p8", "p9"].filter(x => fs.existsSync(path.join(__dirname, x + ".html"))) : args;
if (!names.length) { console.log("Usage: node check-fragments.js d3 | all"); process.exit(2); }
let bad = 0;
names.forEach(nm => {
  const r = checkOne(nm);
  console.log(`== ${nm}: ${r.errors.length} lỗi, ${r.warns.length} cảnh báo${r.info ? " · " + r.info : ""}`);
  r.errors.forEach(e => console.log("  ERROR " + e));
  r.warns.forEach(w => console.log("  WARN  " + w));
  bad += r.errors.length;
});
process.exit(bad ? 1 : 0);
