#!/usr/bin/env node
// Kiểm tra và đóng gói "Sổ ôn" (trang HTML + file dữ liệu từng đề nạp bằng <script src>).
//   check   <page.html> <notes.html>             kiểm schema, anchor notes, trùng số câu; in tình trạng từng đề
//   build   <page.html> <notes.html> <out.html>  check sạch thì ghi bản artifact (bỏ vỏ doctype/head/body), in map files
//   compare <a> <b>                              so hai bản trang hoặc file dữ liệu, bỏ qua vỏ HTML artifact tự thêm
import fs from "fs";
import path from "path";
import vm from "vm";

const fail = (msg) => { console.error("LỖI: " + msg); process.exit(1); };
const nonEmpty = (s) => typeof s === "string" && s.trim() !== "";
const nonEmptyList = (a) => Array.isArray(a) && a.length > 0 && a.every(nonEmpty);
const asList = (v) => (Array.isArray(v) ? v : v === undefined ? [] : [v]);

function loadBank(pagePath) {
  const html = fs.readFileSync(pagePath, "utf8");
  const notesUrl = (/var NOTES = "([^"]+)"/.exec(html) || [])[1];
  if (!notesUrl) fail("trang không khai báo var NOTES");
  // Mọi file trang nạp đều phải publish kèm; chỉ file dữ liệu (*-de-N.js) được chạy thử, app/stats cần trình duyệt.
  const files = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]);
  const dataFiles = files.filter((f) => /-de-\d+\.js$/.test(f));
  const ctx = vm.createContext({ NOTES: notesUrl, DE: {}, ENTRIES: [] });
  for (const f of files) {
    if (!fs.existsSync(path.join(path.dirname(pagePath), f))) fail(`trang nạp ${f} nhưng file không tồn tại`);
  }
  // Khối cấu hình inline của trang (NOTES, DOMAINS, SCENARIOS, DE, ENTRIES) chạy trước file dữ liệu, như trên trình duyệt.
  for (const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    try { vm.runInContext(m[1], ctx, { filename: "page-inline" }); }
    catch (e) { fail(`script inline của trang: ${e.message}`); }
  }
  for (const f of dataFiles) {
    const p = path.join(path.dirname(pagePath), f);
    try { vm.runInContext(fs.readFileSync(p, "utf8"), ctx, { filename: p }); }
    catch (e) { fail(`${f}: ${e.stack.split("\n").slice(0, 3).join(" | ")}`); }
  }
  return { html, notesUrl, files, dataFiles, DE: ctx.DE, ENTRIES: ctx.ENTRIES, SCENARIOS: ctx.SCENARIOS || {} };
}

// Mọi chuỗi hiển thị của một câu, kèm tên trường để báo lỗi.
function textFields(x) {
  const out = [["ask", x.ask], ["dispute", x.dispute]];
  for (const f of ["scene", "asks", "facts"]) asList(x[f]).forEach((s, i) => out.push([`${f}[${i}]`, s]));
  (x.opts || []).forEach((o) => {
    out.push([`opts.${o.k}.gist`, o.gist]);
    asList(o.why).forEach((s, i) => out.push([`opts.${o.k}.why[${i}]`, s]));
  });
  (x.refs || []).forEach((r, i) => out.push([`refs[${i}].label`, r.label]));
  return out.filter(([, s]) => typeof s === "string");
}

function ranges(nums) {
  const parts = [];
  for (let i = 0; i < nums.length; i++) {
    let j = i;
    while (j + 1 < nums.length && nums[j + 1] === nums[j] + 1) j++;
    parts.push(i === j ? `${nums[i]}` : `${nums[i]}–${nums[j]}`);
    i = j;
  }
  return parts.join(", ");
}

function checkEntry(x, bank, ids, seen, errors, warns) {
  const at = `Đề ${x.de} câu ${x.n}`;
  const err = (m) => errors.push(`${at}: ${m}`);
  if (!bank.DE[x.de]) err(`de ${x.de} chưa khai báo DE[${x.de}]`);
  if (!Number.isInteger(x.n) || !Number.isInteger(x.total) || x.n < 1 || x.n > x.total) err("n/total sai");
  const key = `${x.de}-${x.n}`;
  if (seen.has(key)) err("trùng số câu trong đề");
  seen.add(key);
  if (!/^\d\.\d+$/.test(x.sub || "")) err('sub phải có dạng "X.Y"');
  else if (!ids.has("l-" + x.sub.replace(".", "-"))) warns.push(`${at}: notes không có bài l-${x.sub.replace(".", "-")}`);
  for (const f of ["subName", "ask", "answer"]) if (!nonEmpty(x[f])) err(`thiếu ${f}`);
  // Phần giải thích: phân tích đề (scene/asks/facts) rồi why dạng mảng cho từng phương án; trap, tip đã bỏ (03/11/2026).
  for (const f of ["scene", "asks"]) if (!nonEmpty(x[f]) && !nonEmptyList(x[f])) err(`thiếu ${f}`);
  if (!nonEmptyList(x.facts)) err("facts phải là mảng chuỗi, không rỗng");
  for (const f of ["trap", "tip"]) if (x[f] !== undefined) err(`${f} đã bỏ khỏi sổ: ý “dễ bị cuốn” viết vào why của phương án đó`);

  const ks = (x.opts || []).map((o) => o.k);
  if (ks.length < 2 || new Set(ks).size !== ks.length) err("opts thiếu hoặc trùng chữ cái");
  (x.opts || []).forEach((o) => {
    if (!nonEmpty(o.gist)) err(`phương án ${o.k} thiếu gist`);
    if (!nonEmptyList(o.why)) err(`phương án ${o.k}: why phải là mảng gạch đầu dòng`);
  });
  // answer/first: chữ cái có trong opts, xếp tăng dần, không trùng ("D", hoặc "BD" cho câu chọn hai); trang so nguyên chuỗi.
  const letters = (s) => typeof s === "string" && s.length > 0 && s.length < ks.length &&
    [...s].every((k, i) => ks.includes(k) && (i === 0 || k > s[i - 1]));
  if (!letters(x.answer)) err(`answer "${x.answer}" phải là chữ cái trong opts, xếp tăng dần, không trùng`);
  if (x.first !== undefined && !(letters(x.first) && x.first.length === x.answer.length))
    err(`first "${x.first}" phải là chữ cái trong opts, xếp tăng dần, cùng số phương án với answer`);
  const sc = bank.SCENARIOS[x.scen];
  if (x.scen !== undefined && !(sc && ["name", "en", "vi"].every((f) => nonEmpty(sc[f]))))
    err(`scen "${x.scen}" chưa khai báo đủ (name, en, vi) trong SCENARIOS của trang`);
  if (x.dispute !== undefined && !nonEmpty(x.dispute)) err("dispute rỗng (bỏ trường nếu không dùng)");

  let notesRefs = 0;
  for (const r of x.refs || []) {
    if (!nonEmpty(r.label) || !nonEmpty(r.href)) { err("ref thiếu label hoặc href"); continue; }
    if (r.href.startsWith(bank.notesUrl + "#")) {
      notesRefs++;
      const id = r.href.slice(bank.notesUrl.length + 1);
      if (!ids.has(id)) err(`anchor #${id} không có trong notes`);
    } else if (!r.href.startsWith("https://")) err(`href lạ: ${r.href}`);
  }
  if (!notesRefs) err("cần ít nhất 1 ref trỏ vào notes (NOTES + \"#id\")");

  for (const [name, s] of textFields(x)) {
    for (const t of ["code", "b", "i", "pre"]) {
      const open = (s.match(new RegExp(`<${t}>`, "g")) || []).length;
      const close = (s.match(new RegExp(`</${t}>`, "g")) || []).length;
      if (open !== close) err(`${name}: <${t}> mở ${open}, đóng ${close}`);
    }
  }
}

function check(pagePath, notesPath) {
  const bank = loadBank(pagePath);
  const notes = fs.readFileSync(notesPath, "utf8");
  const ids = new Set([...notes.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const errors = [], warns = [], seen = new Set();
  for (const x of bank.ENTRIES) checkEntry(x, bank, ids, seen, errors, warns);

  for (const de of Object.keys(bank.DE).map(Number)) {
    const items = bank.ENTRIES.filter((x) => x.de === de);
    const ns = items.map((x) => x.n);
    if (ns.some((n, i) => i > 0 && n < ns[i - 1])) warns.push(`Đề ${de}: câu chưa xếp tăng dần theo n`);
    const total = items.length ? items[0].total : 0;
    if (items.some((x) => x.total !== total)) warns.push(`Đề ${de}: total không đồng nhất`);
    const missing = [];
    for (let n = 1; n <= total; n++) if (!ns.includes(n)) missing.push(n);
    const disputed = items.filter((x) => x.dispute).map((x) => x.n);
    console.log(`Đề ${de} · ${bank.DE[de]} · có ${items.length}${total ? "/" + total : ""} câu` +
      (missing.length ? ` · còn thiếu ${ranges(missing)}` : "") +
      (disputed.length ? ` · có ghi chú đáp án gốc: câu ${disputed.join(", ")}` : ""));
  }
  warns.forEach((w) => console.log("Cảnh báo: " + w));
  errors.forEach((e) => console.log("LỖI: " + e));
  console.log(errors.length ? `${errors.length} lỗi.` : `Sạch: ${bank.ENTRIES.length} câu, ${bank.dataFiles.length} file dữ liệu.`);
  return { ok: errors.length === 0, bank };
}

// Bỏ vỏ HTML: artifact tự thêm doctype/head/body nên bản publish bắt đầu từ <title>.
function stripShell(html) {
  let s = html.replace(/\r\n/g, "\n");
  const t = s.indexOf("<title>");
  if (t < 0) return s.trim();
  s = s.slice(t).replace(/<\/head>\s*<body>\s*/, "").replace(/\s*<\/body>\s*<\/html>\s*$/, "");
  return s.trim();
}

const [cmd, ...args] = process.argv.slice(2);
if (cmd === "check" && args.length === 2) {
  process.exit(check(args[0], args[1]).ok ? 0 : 1);
} else if (cmd === "build" && args.length === 3) {
  const { ok, bank } = check(args[0], args[1]);
  if (!ok) fail("check chưa sạch, không build.");
  fs.writeFileSync(args[2], stripShell(bank.html) + "\n");
  const files = Object.fromEntries(bank.files.map((f) => [f, path.resolve(path.dirname(args[0]), f)]));
  console.log(`Đã ghi ${args[2]}\nfiles = ${JSON.stringify(files, null, 2)}`);
} else if (cmd === "compare" && args.length === 2) {
  // Bỏ dòng trống và khoảng trắng cuối dòng: bản publish cũ để lại dòng trống ở chỗ bỏ </head><body>.
  const [a, b] = args.map((p) => stripShell(fs.readFileSync(p, "utf8")).split("\n").map((l) => l.trimEnd()).filter(Boolean));
  const i = a.findIndex((line, k) => line !== b[k]);
  if (i < 0 && a.length === b.length) console.log("GIỐNG");
  else {
    const k = i < 0 ? Math.min(a.length, b.length) : i;
    console.log(`KHÁC từ dòng không trống thứ ${k + 1} (sau khi bỏ vỏ HTML). ${a.length} dòng / ${b.length} dòng`);
    console.log("  A: " + (a[k] ?? "<hết file>").slice(0, 200));
    console.log("  B: " + (b[k] ?? "<hết file>").slice(0, 200));
    process.exit(2);
  }
} else {
  fail("cách dùng: check <page> <notes> | build <page> <notes> <out> | compare <a> <b>");
}
