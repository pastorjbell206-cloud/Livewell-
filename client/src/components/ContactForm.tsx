/**
 * ContactForm: the one form that reaches James, used by /speaking and
 * /contact. It posts { name, email, subject, message } to /api/contact, the
 * REST handler that exists only in the production runtime (api/index.ts saves
 * each message to contact_messages, read at /admin). `pnpm dev` has no such
 * route, so test a submission on a Vercel preview.
 *
 * The subject values are the ones the old /work-with-james form sent, so the
 * admin inbox reads the same before and after the fold.
 */
import { useState, type CSSProperties, type FormEvent } from "react";

export const CONTACT_EMAIL = "Pastorjbell206@gmail.com";

export const CONTACT_SUBJECTS = [
  { value: "Speaking", label: "Speaking and preaching" },
  { value: "Coaching", label: "Pastoral coaching" },
  { value: "Consulting", label: "Church consulting" },
  { value: "Writing", label: "Writing and ghostwriting" },
  { value: "Partnership", label: "Ministry partnership" },
  { value: "Other", label: "Something else" },
] as const;

type Status = "idle" | "sending" | "sent" | "error";

const label: CSSProperties = {
  display: "block",
  fontFamily: "var(--U)",
  fontSize: "14px",
  fontWeight: 500,
  color: "var(--ink)",
  marginBottom: "6px",
};

const field: CSSProperties = {
  width: "100%",
  minHeight: "46px",
  padding: "11px 14px",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  background: "var(--card)",
  color: "var(--ink)",
  fontFamily: "var(--B)",
  fontSize: "16px",
  lineHeight: 1.5,
  boxSizing: "border-box",
};

const hint: CSSProperties = {
  fontFamily: "var(--B)",
  fontSize: "14px",
  lineHeight: 1.6,
  color: "var(--ink-muted)",
  margin: "6px 0 0",
};

export default function ContactForm({
  idPrefix,
  defaultSubject = "",
  messageHint,
}: {
  /** Keeps field ids unique on the page. */
  idPrefix: string;
  /** One of CONTACT_SUBJECTS' values, preselected. */
  defaultSubject?: string;
  /** One line under the message box: what to include. */
  messageHint?: string;
}) {
  const empty = { name: "", email: "", subject: defaultSubject, message: "" };
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const id = (name: string) => `${idPrefix}-${name}`;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm(empty);
        return;
      }
      const body = (await res.json().catch(() => null)) as { error?: unknown } | null;
      setError(typeof body?.error === "string" ? body.error : "");
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div role="status" style={{ padding: "var(--s-4)", background: "var(--card)", border: "1px solid var(--border)", borderTop: "2px solid var(--mustard)", borderRadius: "var(--radius-sm)" }}>
        <p style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 400, lineHeight: 1.15, color: "var(--ink)", margin: "0 0 8px" }}>
          Message sent
        </p>
        <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", margin: 0 }}>
          Thank you for writing. I read everything and reply as soon as I can.
        </p>
      </div>
    );
  }

  const sending = status === "sending";
  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <div>
        <label htmlFor={id("name")} style={label}>Name</label>
        <input id={id("name")} type="text" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={field} />
      </div>
      <div>
        <label htmlFor={id("email")} style={label}>Email (required)</label>
        <input id={id("email")} type="email" autoComplete="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={field} />
      </div>
      <div>
        <label htmlFor={id("subject")} style={label}>What is it about?</label>
        <select id={id("subject")} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} style={field}>
          <option value="">Choose one</option>
          {CONTACT_SUBJECTS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={id("message")} style={label}>Message (required)</label>
        <textarea
          id={id("message")}
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          aria-describedby={messageHint ? id("message-hint") : undefined}
          style={{ ...field, resize: "vertical" }}
        />
        {messageHint && <p id={id("message-hint")} style={hint}>{messageHint}</p>}
      </div>
      <div>
        <button
          type="submit"
          disabled={sending}
          style={{
            minHeight: "46px",
            padding: "0 24px",
            background: "var(--ink)",
            color: "var(--bone)",
            border: "none",
            borderBottom: "2px solid var(--mustard)",
            borderRadius: "var(--radius-sm)",
            fontFamily: "var(--U)",
            fontSize: "15px",
            fontWeight: 500,
            cursor: sending ? "default" : "pointer",
            opacity: sending ? 0.7 : 1,
          }}
        >
          {sending ? "Sending…" : "Send message"}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--alert)", margin: 0 }}>
          {error || "Your message did not send. Try again."} You can also email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--alert)" }}>{CONTACT_EMAIL}</a>.
        </p>
      )}
    </form>
  );
}
