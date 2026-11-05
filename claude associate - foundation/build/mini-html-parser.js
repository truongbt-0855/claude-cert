// Tiny HTML tree builder for checking the notes fragments. Not a full HTML parser:
// it only needs to handle the markup we write (no raw "<" in text, no unquoted ">" in attributes).
const VOID = new Set(["br", "hr", "img", "input", "meta", "link", "source", "wbr", "col"]);

function parseAttrs(src) {
  const attrs = {};
  const re = /([^\s=\/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let m;
  while ((m = re.exec(src))) attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? "";
  return attrs;
}

function lineAt(html, index) {
  return html.slice(0, index).split("\n").length;
}

// Returns { root, errors }. Each node: { tag, attrs, children, parent, line }. Text nodes: { text }.
function parseHtml(html) {
  const root = { tag: "#root", attrs: {}, children: [], line: 0 };
  const errors = [];
  const stack = [root];
  const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:"[^"]*"|'[^']*'|[^'">])*)>/g;
  let last = 0, m;
  while ((m = re.exec(html))) {
    const top = stack[stack.length - 1];
    if (m.index > last) top.children.push({ text: html.slice(last, m.index) });
    last = re.lastIndex;
    if (m[0].startsWith("<!--")) continue;
    const closing = m[1] === "/", tag = m[2].toLowerCase(), rest = m[3] || "";
    const line = lineAt(html, m.index);
    if (closing) {
      const at = stack.map(n => n.tag).lastIndexOf(tag);
      if (at <= 0) { errors.push(`line ${line}: stray </${tag}>`); continue; }
      for (let i = stack.length - 1; i > at; i--) errors.push(`line ${line}: <${stack[i].tag}> opened at line ${stack[i].line} not closed before </${tag}>`);
      stack.length = at;
      continue;
    }
    const node = { tag, attrs: parseAttrs(rest.replace(/\/\s*$/, "")), children: [], parent: top, line };
    top.children.push(node);
    if (tag === "script" || tag === "style") {
      // raw text: skip to the matching end tag
      const end = html.indexOf(`</${tag}>`, re.lastIndex);
      if (end < 0) { errors.push(`line ${line}: <${tag}> never closed`); break; }
      node.children.push({ text: html.slice(re.lastIndex, end) });
      re.lastIndex = last = end + tag.length + 3;
      continue;
    }
    if (!VOID.has(tag) && !/\/\s*$/.test(rest)) stack.push(node);
  }
  if (last < html.length) stack[stack.length - 1].children.push({ text: html.slice(last) });
  for (let i = stack.length - 1; i > 0; i--) errors.push(`<${stack[i].tag}> opened at line ${stack[i].line} never closed`);
  return { root, errors };
}

const hasClass = (n, c) => !!n.tag && (" " + (n.attrs.class || "") + " ").includes(" " + c + " ");

// Depth-first search; pred(node) → boolean.
function findAll(node, pred, out = []) {
  for (const ch of node.children || []) {
    if (!ch.tag) continue;
    if (pred(ch)) out.push(ch);
    findAll(ch, pred, out);
  }
  return out;
}
const byClass = (node, c) => findAll(node, n => hasClass(n, c));
const byTag = (node, t) => findAll(node, n => n.tag === t);

function textOf(node) {
  if (node.text !== undefined) return node.text;
  return (node.children || []).map(textOf).join("");
}

module.exports = { parseHtml, hasClass, findAll, byClass, byTag, textOf };
