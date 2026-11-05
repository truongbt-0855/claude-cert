// Builds ../claude-associate-foundations-notes.html from shell.css, shell-main.js, the fragments
// (p0, d1–d7, p8, p9) and every quiz-<course>.json referenced by a data-course attribute.
// Usage: node assemble-notes.js   (missing fragments are skipped with a warning)
const fs = require("fs");
const path = require("path");
const { parseHtml, byTag, findAll } = require("./mini-html-parser");

const DIR = __dirname;
const OUT = path.join(DIR, "..", "claude-associate-foundations-notes.html");
const ORDER = ["p0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "p8", "p9"];
const read = f => fs.readFileSync(path.join(DIR, f), "utf8");

const parts = ORDER.filter(n => {
  const ok = fs.existsSync(path.join(DIR, n + ".html"));
  if (!ok) console.warn("WARN thiếu " + n + ".html, bỏ qua");
  return ok;
});
const body = parts.map(n => `<!-- ===== ${n} ===== -->\n` + read(n + ".html").trim()).join("\n\n");

// quiz data, keyed by data-course
const quiz = {};
for (const m of body.matchAll(/data-course="([^"]+)"/g)) {
  const f = `quiz-${m[1]}.json`;
  if (!fs.existsSync(path.join(DIR, f))) { console.warn("WARN thiếu " + f); quiz[m[1]] = []; continue; }
  quiz[m[1]] = JSON.parse(read(f));
}
const quizJs = "window.QUIZ = {\n" + Object.entries(quiz).map(([k, v]) =>
  `${JSON.stringify(k)}: [\n` + v.map(it => " " + JSON.stringify(it).replace(/<\/script/gi, "<\\/script")).join(",\n") + "\n]").join(",\n") + "\n};";

const lessonCount = (body.match(/<article class="lesson"/g) || []).length;
const domainCount = (body.match(/<section class="domain"/g) || []).length;

const head = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Ôn thi CCAO-F</title>
<meta name="description" content="Tài liệu tự học Claude Certified Associate – Foundations: 30 bài theo task statement, bài nền tảng mỗi domain, cheatsheet, quiz tiếng Anh, lộ trình và tiến độ.">
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
${read("shell.css")}</style>
</head>
<body>`;

const top = `<header class="top">
  <button class="menu" id="menuBtn" aria-label="Mở mục lục">☰</button>
  <div class="ttl"><b>CCAO-F · Associate Foundations</b><small id="topSub">0/0 bài đã học</small></div>
  <div class="pct" id="topPct">0%</div>
</header>
<div class="pbar"><i id="pbar"></i></div>

<div class="scrim" id="scrim"></div>
<div class="layout">
<nav class="drawer" id="drawer" aria-label="Mục lục">
  <button class="close" id="closeBtn" aria-label="Đóng">✕</button>
  <h2>Mục lục</h2>
  <div class="mode"><button id="modeStudy" class="on">Học</button><button id="modeCheat">Chỉ cheatsheet</button></div>
  <div id="navList"></div>
</nav>

<main>
<div class="cheatbanner">Đang ở chế độ <b>chỉ cheatsheet</b>: hiện tổng kết + cheatsheet của 7 domain để ôn nhanh trước giờ thi. Bấm ☰ → “Học” để quay lại.</div>`;

const hero = fs.existsSync(path.join(DIR, "hero-and-roadmap.html")) ? read("hero-and-roadmap.html").trim() : "";

const tail = `<footer>Tài liệu tự học, tổng hợp từ Exam Guide CCAO-F v1.0 (7/2026), Claude Help Center và docs Anthropic (11/2026). Quiz tiếng Anh theo format đề thật; lời giải tiếng Việt. Tiến độ lưu trên trình duyệt này.</footer>
</main>
</div>

<script>
${quizJs}
</script>
<script>
${read("shell-main.js")}</script>
</body>
</html>
`;

const html = [head, top, hero, body, tail].join("\n\n");

// whole-page checks: tag balance, duplicate ids, internal anchors
const { root, errors } = parseHtml(html);
const ids = new Map();
findAll(root, n => !!n.attrs.id).forEach(n => { const id = n.attrs.id; if (ids.has(id)) errors.push(`id trùng "${id}" (dòng ${ids.get(id)} và ${n.line})`); else ids.set(id, n.line); });
byTag(root, "a").forEach(a => { const h = a.attrs.href || ""; if (h.startsWith("#") && h.length > 1 && !ids.has(h.slice(1))) errors.push(`dòng ${a.line}: link ${h} không có đích`); });
Object.entries(quiz).forEach(([k, v]) => { if (!v.length) errors.push(`quiz "${k}" rỗng`); });

fs.writeFileSync(OUT, html);
console.log(`Đã ghi ${path.relative(process.cwd(), OUT)} · ${parts.length} phần, ${domainCount} domain, ${lessonCount} bài, ${Object.values(quiz).reduce((s, v) => s + v.length, 0)} câu quiz, ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB`);
errors.forEach(e => console.log("  ERROR " + e));
process.exit(errors.length ? 1 : 0);
