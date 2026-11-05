// Build the public CCAR-F notes: the DrillPark notes minus every "Trong dự án DrillPark" block.
// DrillPark is a private client repo, so its details must not reach the public GitHub Pages site.
// Usage: node tools/build-public-ccarf-notes.mjs [source.html] [out.html]
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dir = resolve(root, "claude architect - foundation");
const src = process.argv[2] || resolve(dir, "claude-architect-foundations-notes-drillpark.html");
const out = process.argv[3] || resolve(dir, "claude-architect-foundations-notes-public.html");

// Remove each element whose opening tag starts with `open`, tracking nested tags of the same name.
function removeElements(html, open, tag) {
  const re = new RegExp(`<${tag}\\b|</${tag}>`, "g");
  let count = 0, start;
  while ((start = html.indexOf(open)) !== -1) {
    re.lastIndex = start;
    let depth = 0, m, end = -1;
    while ((m = re.exec(html))) {
      depth += m[0].startsWith("</") ? -1 : 1;
      if (depth === 0) { end = m.index + m[0].length; break; }
    }
    if (end === -1) throw new Error(`Unclosed <${tag}> at offset ${start}`);
    if (html[end] === "\n") end++;
    html = html.slice(0, start) + html.slice(end);
    count++;
  }
  return { html, count };
}

let html = readFileSync(src, "utf8");
const blocks = removeElements(html, '<details class="proj"', "details");
const note = removeElements(blocks.html, '<div class="newnote">', "div");
html = note.html
  .replaceAll('Khối "Trong dự án DrillPark"', "Khối dự án")
  .replaceAll("chỉ khối DrillPark nhắc", "chỉ khối ví dụ dự án nhắc");

const leaks = html.split("\n")
  .map((line, i) => [i + 1, line])
  .filter(([, line]) => /drillpark|serena|kihondrill/i.test(line));
if (leaks.length) {
  leaks.slice(0, 20).forEach(([n, line]) => console.error(`${n}: ${line.trim().slice(0, 160)}`));
  throw new Error(`${leaks.length} line(s) still mention DrillPark; output not written`);
}

writeFileSync(out, html);
console.log(`Removed ${blocks.count} DrillPark blocks + ${note.count} intro note -> ${out}`);
