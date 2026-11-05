#!/usr/bin/env node
// Ghép các mảnh câu (định dạng mới) vào một file đề: câu nào có trong mảnh thì thay theo số câu n, câu khác giữ nguyên văn bản.
// Trước khi ghi: các trường phải giữ nguyên (de, n, total, sub, subName, first, answer, ask, dispute, opts k/gist) phải khớp bản cũ; lệch là dừng, không ghi.
// Cách dùng: node merge-entry-fragments.mjs <so-on-certsafari-de-N.js> <mảnh-1.js> [<mảnh-2.js> ...]
import fs from "fs";

const [dataPath, ...fragPaths] = process.argv.slice(2);
if (!dataPath || !fragPaths.length) { console.error("cách dùng: merge-entry-fragments.mjs <file đề> <mảnh>..."); process.exit(1); }

const START = /\n  \{\n    de: \d+, n: (\d+),/g;
// Tách phần thân (giữa "ENTRIES.push(" và ");" cuối) thành từng khối văn bản của một câu, theo n.
function chunks(body) {
  const marks = [...("\n" + body).matchAll(START)];
  return marks.map((m, i) => {
    const end = i + 1 < marks.length ? marks[i + 1].index : undefined;
    return { n: Number(m[1]), text: ("\n" + body).slice(m.index + 1, end).trimEnd().replace(/,$/, "") };
  });
}

const src = fs.readFileSync(dataPath, "utf8").replace(/\r\n/g, "\n");
const at = src.indexOf("ENTRIES.push(") + "ENTRIES.push(".length;
const tail = src.lastIndexOf("\n);");
const head = src.slice(0, at), body = src.slice(at, tail);
const old = chunks(body);
const repl = new Map();
for (const p of fragPaths) {
  // Chỉ bỏ dòng trống ở đầu, không trim(): hai dấu cách trước "{" là thứ để nhận ra đầu một câu.
  const frag = chunks(fs.readFileSync(p, "utf8").replace(/\r\n/g, "\n").replace(/^\n+/, "").trimEnd());
  if (!frag.length) { console.log(`KHÔNG GHI: ${p} không có câu nào nhận ra được`); process.exit(1); }
  for (const c of frag) repl.set(c.n, c.text);
}
const out = head + "\n" + old.map((c) => repl.get(c.n) ?? c.text).join(",\n") + "\n);\n";

const load = (code) => { const E = []; new Function("NOTES", "DE", "ENTRIES", code)("N", {}, E); return E; };
const before = load(src), after = load(out);
const keep = (x) => JSON.stringify([x.de, x.n, x.total, x.sub, x.subName, x.first, x.answer, x.ask, x.dispute, x.opts.map((o) => [o.k, o.gist])]);
const problems = [];
if (old.length !== before.length) problems.push(`tách được ${old.length} khối nhưng file có ${before.length} câu`);
const missing = [...repl.keys()].filter((n) => !old.some((c) => c.n === n));
if (missing.length) problems.push(`mảnh có câu không tồn tại trong file: ${missing.join(", ")}`);
before.forEach((x, i) => { if (!after[i] || keep(x) !== keep(after[i])) problems.push(`câu ${x.n} lệch trường phải giữ`); });
if (problems.length) { console.log("KHÔNG GHI: " + problems.join("; ")); process.exit(1); }
fs.writeFileSync(dataPath, out);
console.log(`Đã thay ${repl.size} câu (${[...repl.keys()].sort((a, b) => a - b).join(",")}); file còn ${after.length} câu.`);
