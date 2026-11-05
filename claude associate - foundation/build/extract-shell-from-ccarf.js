// One-off: copy the shared CSS and the main page script out of the CCAR-F notes,
// so the CCAO-F notes look and behave the same. Run once; then edit the copies.
const fs = require("fs");
const path = require("path");

const src = path.resolve(__dirname, "../../claude architect - foundation/claude-architect-foundations-notes-drillpark.html");
const lines = fs.readFileSync(src, "utf8").split(/\r?\n/);

const cssStart = lines.indexOf("<style>") + 1;
const cssEnd = lines.findIndex(l => l.includes("Khối \"Trong dự án DrillPark\""));
const jsStart = lines.findIndex((l, i) => i > 9300 && l === "<script>" && lines[i + 1] === "(function(){");
const jsEnd = lines.findIndex((l, i) => i > jsStart && l === "</script>");

if (cssStart < 1 || cssEnd < 0 || jsStart < 0 || jsEnd < 0) throw new Error("markers not found");
fs.writeFileSync(path.join(__dirname, "shell.css"), lines.slice(cssStart, cssEnd).join("\n") + "\n");
fs.writeFileSync(path.join(__dirname, "shell-main.js"), lines.slice(jsStart + 1, jsEnd).join("\n") + "\n");
console.log("css lines", cssEnd - cssStart, "js lines", jsEnd - jsStart - 1);
