/**
 * Email-gated download. Shows the download as a button; on first use it asks
 * for an email, posts it to /api/subscribe with the given source, then reveals
 * the link and remembers consent in localStorage so a returning leader is not
 * asked again. Free resource, list-building gate.
 */
import { useState } from "react";
import { Download, Loader2, Check } from "lucide-react";

const GATE_KEY = "lw-toolkit-unlocked";

function alreadyUnlocked(): boolean {
  try { return localStorage.getItem(GATE_KEY) === "1"; } catch { return false; }
}

export default function GatedDownload({
  href,
  label,
  source,
}: {
  href: string;
  label: string;
  source: string;
}) {
  const [unlocked, setUnlocked] = useState(alreadyUnlocked);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setBusy(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
    } catch { /* best-effort; never block the download on a failed capture */ }
    try { localStorage.setItem(GATE_KEY, "1"); } catch { /* ignore */ }
    setBusy(false);
    setUnlocked(true);
    setOpen(false);
    window.open(href, "_blank", "noopener");
  };

  if (unlocked) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--bone)", background: "var(--ink)", padding: "11px 18px", textDecoration: "none", borderRadius: "2px" }}
      >
        <Download size={15} /> {label}
      </a>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--bone)", background: "var(--ink)", padding: "11px 18px", border: "none", borderRadius: "2px", cursor: "pointer" }}
      >
        <Download size={15} /> {label}
      </button>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", maxWidth: "440px" }}>
      <input
        type="email"
        required
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-label="Email to receive the toolkit"
        style={{ flex: "1 1 200px", padding: "11px 12px", fontFamily: "var(--B)", fontSize: "16px", border: "1px solid var(--border)", borderRadius: "2px", background: "var(--card)", color: "var(--ink)", outline: "none" }}
      />
      <button
        type="submit"
        disabled={busy}
        style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--bone)", background: "var(--ink)", padding: "11px 16px", border: "none", borderRadius: "2px", cursor: busy ? "default" : "pointer" }}
      >
        {busy ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />} Get the download
      </button>
      <p style={{ flexBasis: "100%", margin: 0, fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink-muted)" }}>
        Free. The download opens right away, and you join the essay list. Unsubscribe anytime.
      </p>
    </form>
  );
}
