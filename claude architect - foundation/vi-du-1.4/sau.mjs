// App agent CSKH — SAU KHI SỬA.
// Prompt giữ nguyên; luật được đưa vào code tool. Chạy: node sau.mjs

// ───── Dữ liệu (DB giả) ─────
const CUSTOMERS = [
  { id: "C-001", name: "Nguyen Van A", email: "a@example.com" },
  { id: "C-002", name: "Nguyen Van A", email: "a2@example.com" }, // trùng tên với C-001
];
const ORDERS = [
  { id: "#55120", customerId: "C-001", total: 84.5, date: "2026-10-18" },
  { id: "#60001", customerId: "C-002", total: 120, date: "2026-10-20" },
];

// ───── Prompt (Claude đọc, chỉ làm theo theo xác suất) ─────
const SYSTEM = "Bạn là agent CSKH. Luôn gọi get_customer trước khi tra đơn hay hoàn tiền.";

// ───── Code tool của app ─────
const session = {};
const refunded = [];
const fail = (errorCategory, message) => ({ isError: true, errorCategory, message });
const latestOrderOf = (ids) =>
  ORDERS.filter((o) => ids.includes(o.customerId)).sort((a, b) => b.date.localeCompare(a.date))[0];
// [SỬA 1] Prerequisite gate: chưa có khách đã xác minh thì không cho làm gì với đơn.
const notVerified = () => (session.customerId ? null : fail("prerequisite", "Chưa xác minh khách. Gọi get_customer trước."));

const TOOLS = {
  get_customer({ email }) {
    // [SỬA 2] Chỉ xác minh bằng email. Tên có thể trùng nên không dùng để định danh.
    const c = CUSTOMERS.find((x) => x.email === email);
    if (!c) return fail("validation", "Không tìm thấy khách.");
    session.customerId = c.id;
    return { customer_id: c.id };
  },
  lookup_order() {
    const blocked = notVerified();
    if (blocked) return blocked;
    // [SỬA 3] Tra theo khách đã xác minh, bỏ qua tên khách tự khai.
    const o = latestOrderOf([session.customerId]);
    if (!o) return fail("validation", "Không có đơn.");
    return { order_id: o.id, customer_id: o.customerId, total: o.total };
  },
  process_refund({ order_id, amount }) {
    const blocked = notVerified();
    if (blocked) return blocked;
    // [SỬA 4] Đơn phải thuộc đúng khách đã xác minh.
    const o = ORDERS.find((x) => x.id === order_id);
    if (!o || o.customerId !== session.customerId) return fail("permission", "Đơn không thuộc khách đã xác minh.");
    refunded.push(order_id);
    return { status: "refunded", order_id, amount };
  },
};

// ───── Model giả: hành xử đúng như log (12% ca) ─────
// Không đọc SYSTEM: bỏ qua get_customer, tra đơn bằng tên khách tự khai.
// Gặp lỗi "prerequisite" thì làm theo hướng dẫn trong lỗi (model thật cũng làm vậy).
let seq = 0;
const useTool = (name, input) => ({ stop_reason: "tool_use", content: [{ type: "tool_use", id: `t${++seq}`, name, input }] });
const endTurn = (text) => ({ stop_reason: "end_turn", content: [{ type: "text", text }] });
function lastResult(messages) {
  const m = messages.at(-1);
  if (!Array.isArray(m.content)) return null;
  const r = m.content[0];
  const call = messages.at(-2).content.find((b) => b.id === r.tool_use_id);
  return { name: call.name, out: JSON.parse(r.content) };
}
function fakeModel(messages) {
  const last = lastResult(messages);
  if (!last) return useTool("lookup_order", { customer_name: "Nguyen Van A" });
  if (last.out.errorCategory === "prerequisite") return useTool("get_customer", { email: "a@example.com" });
  if (last.name === "get_customer") return useTool("lookup_order", { customer_name: "Nguyen Van A" });
  if (last.name === "lookup_order" && !last.out.isError)
    return useTool("process_refund", { order_id: last.out.order_id, amount: last.out.total });
  return endTurn(last.out.isError ? `Không xử lý được: ${last.out.message}` : `Đã hoàn $${last.out.amount} cho đơn ${last.out.order_id}.`);
}

// ───── Vòng lặp agent ─────
const messages = [{ role: "user", content: "Tôi là Nguyen Van A, email a@example.com. Đơn gần nhất của tôi bị lỗi, hoàn tiền giúp tôi." }];
console.log(`Khách đang chat (thật ra là C-001): ${messages[0].content}\n`);
for (let turn = 1; turn <= 10; turn++) {
  const res = fakeModel(messages);
  messages.push({ role: "assistant", content: res.content });
  if (res.stop_reason !== "tool_use") {
    console.log(`Agent: ${res.content[0].text}`);
    break;
  }
  const call = res.content[0];
  const out = TOOLS[call.name](call.input);
  console.log(`Vòng ${turn}: gọi ${call.name} ${JSON.stringify(call.input)}\n   ${out.isError ? "✖" : "✔"} ${JSON.stringify(out)}`);
  messages.push({ role: "user", content: [{ type: "tool_result", tool_use_id: call.id, content: JSON.stringify(out), is_error: !!out.isError }] });
}

// ───── Kiểm: tiền về đúng người không? ─────
const wrong = refunded.map((id) => ORDERS.find((o) => o.id === id)).filter((o) => o.customerId !== "C-001");
console.log(
  wrong.length
    ? `\n❗ HOÀN NHẦM NGƯỜI: tiền đơn ${wrong[0].id} về khách ${wrong[0].customerId}, người đang chat là C-001.`
    : `\n✔ Tiền về đúng người đang chat (C-001).`,
);
