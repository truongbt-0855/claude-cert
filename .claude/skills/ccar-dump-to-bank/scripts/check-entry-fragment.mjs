// Kiểm một mảnh câu viết theo định dạng mới (chỉ các object câu, không bọc ENTRIES.push), dùng khi đổi một đề cũ sang định dạng mới.
// Cách dùng: node check-entry-fragment.mjs <mảnh.js> <notes.html> <từ n> <tới n>
import fs from "fs";

const [frag, notesPath, from, to] = process.argv.slice(2);
const NOTES = "https://claude.ai/artifact/Ca5wyF54DWXiUwH98KPH6D";
const ENTRIES = [];
try { new Function("NOTES", "ENTRIES", "ENTRIES.push(" + fs.readFileSync(frag, "utf8") + ");")(NOTES, ENTRIES); }
catch (e) { console.log("LỖI cú pháp: " + e.message); process.exit(1); }
// notesPath "-" = sổ chưa có notes (vd CCAR-P): refs trỏ thẳng docs chính thức, bỏ kiểm anchor.
const ids = notesPath === "-" ? null : new Set([...fs.readFileSync(notesPath, "utf8").matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const str = (s) => typeof s === "string" && s.trim() !== "";
const list = (a) => Array.isArray(a) && a.length > 0 && a.every(str);
let bad = 0;
const want = []; for (let n = Number(from); n <= Number(to); n++) want.push(n);
if (ENTRIES.map((x) => x.n).join() !== want.join()) { console.log(`LỖI: cần đúng câu ${from}–${to} theo thứ tự, đang có ${ENTRIES.map((x) => x.n).join(",")}`); bad++; }
for (const x of ENTRIES) {
  const e = [];
  for (const f of ["de", "n", "total", "sub", "subName", "answer", "ask"]) if (x[f] === undefined) e.push("thiếu " + f);
  for (const f of ["scene", "asks", "facts"]) if (!list(x[f])) e.push(f + " phải là mảng chuỗi");
  if ("trap" in x || "tip" in x) e.push("còn trap/tip");
  for (const o of x.opts || []) { if (!str(o.gist)) e.push("gist " + o.k); if (!list(o.why)) e.push("why " + o.k + " phải là mảng"); }
  // Câu chọn hai: answer là các chữ cái xếp tăng dần, không trùng, chữ nào cũng phải có trong opts.
  const letters = [...String(x.answer)];
  if (!letters.every((k) => (x.opts || []).some((o) => o.k === k))) e.push("answer không có trong opts");
  if (letters.join() !== [...new Set(letters)].sort().join()) e.push("answer phải xếp tăng dần, không trùng");
  if (ids) {
    for (const r of x.refs || []) if (r.href.startsWith(NOTES + "#") && !ids.has(r.href.slice(NOTES.length + 1))) e.push("anchor không có: " + r.href);
    if (!(x.refs || []).some((r) => r.href.startsWith(NOTES + "#"))) e.push("cần ít nhất 1 ref vào notes");
  } else if (!(x.refs || []).some((r) => /^https:\/\//.test(r.href))) e.push("cần ít nhất 1 ref https vào docs chính thức");
  const texts = [x.ask, ...(x.scene || []), ...(x.asks || []), ...(x.facts || []), ...(x.opts || []).flatMap((o) => [o.gist, ...(o.why || [])]), x.dispute].filter(str);
  for (const s of texts) for (const t of ["code", "b", "i", "pre"]) {
    if ((s.match(new RegExp(`<${t}>`, "g")) || []).length !== (s.match(new RegExp(`</${t}>`, "g")) || []).length) { e.push(`thẻ <${t}> không cân`); break; }
  }
  console.log(`câu ${x.n}: ${e.length ? e.join("; ") : "ok"}`);
  bad += e.length;
}
process.exit(bad ? 1 : 0);
