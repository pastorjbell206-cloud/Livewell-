/**
 * The Illustration Library (/leadership/illustrations). A searchable bank of
 * sermon illustrations from client/public/leadership/illustrations.json, each
 * with the point it actually serves. Filter by theme, search by text, save
 * favorites to the browser. Stateless, no login.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Search, Bookmark } from "lucide-react";
import Layout from "@/components/Layout";
import LoadFailed from "@/components/LoadFailed";
import { SEOMeta } from "@/components/SEOMeta";
import { fetchJson } from "@/lib/fetch-json";
import { isArrayOf, readStoredJSON, writeStoredJSON } from "@/lib/storage";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const KEY = "livewell-illustration-saved";

interface Illustration { id: string; title: string; theme: string; text: string; point: string; source?: string; scriptures?: string[]; }

// The file ships as { illustrations: [...] } but a bare array is accepted too.
// Anything else — including an arbitrary object — is a failed load, not data.
type Payload = Illustration[] | { illustrations: Illustration[] };
const isItem = (x: unknown): x is Illustration => {
  const i = x as Illustration;
  return !!i && typeof i === "object" && typeof i.id === "string" &&
    (i.scriptures === undefined || Array.isArray(i.scriptures));
};
const isPayload = (x: unknown): x is Payload =>
  isArrayOf(isItem)(x) ||
  (!!x && typeof x === "object" && isArrayOf(isItem)((x as { illustrations?: unknown }).illustrations));

const isString = (x: unknown): x is string => typeof x === "string";

export default function IllustrationLibrary() {
  // null = not loaded yet. Loading, failed, and loaded-but-empty are three
  // different truths; [] used to stand for two of them. The load is tagged
  // with the retry nonce that fetched it, so `items` derives back to the
  // loading state on retry without a synchronous setState in the effect.
  const [loaded, setLoaded] = useState<{ nonce: number; items: Illustration[] } | null>(null);
  const [q, setQ] = useState("");
  const [theme, setTheme] = useState<string | null>(null);
  const [savedOnly, setSavedOnly] = useState(false);
  const [saved, setSaved] = useState<string[]>(() => readStoredJSON(KEY, isArrayOf(isString), []));
  const [nonce, setNonce] = useState(0);
  const [failedAt, setFailedAt] = useState<number | null>(null);
  const error = failedAt === nonce;
  const items = loaded && loaded.nonce === nonce ? loaded.items : null;
  const [persistFailed, setPersistFailed] = useState(false);

  useEffect(() => {
    let stale = false;
    fetchJson<Payload>("/leadership/illustrations.json", isPayload)
      .then((d) => { if (!stale) setLoaded({ nonce, items: Array.isArray(d) ? d : d.illustrations }); })
      .catch(() => { if (!stale) setFailedAt(nonce); });
    return () => { stale = true; };
  }, [nonce]);

  const toggle = (id: string) => {
    const n = saved.includes(id) ? saved.filter((x) => x !== id) : [...saved, id];
    setSaved(n);
    setPersistFailed(!writeStoredJSON(KEY, n));
  };

  const themes = useMemo(() => Array.from(new Set((items ?? []).map((i) => i.theme))).sort(), [items]);
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return (items ?? []).filter((i) => {
      if (theme && i.theme !== theme) return false;
      if (savedOnly && !saved.includes(i.id)) return false;
      if (!needle) return true;
      return (i.title + " " + i.text + " " + i.point + " " + (i.scriptures || []).join(" ")).toLowerCase().includes(needle);
    });
  }, [items, q, theme, savedOnly, saved]);

  return (
    <Layout>
      <SEOMeta title="The Illustration Library — Sermon Illustrations by Theme and Text" description="A searchable bank of sermon illustrations, sorted by theme and text, each with the point it actually serves. Save the ones you want for later." url="https://www.livewellbyjamesbell.co/leadership/illustrations" />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}><Link href="/leadership" style={{ color: "inherit" }}>Leadership Formation</Link> · The illustration library</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "16px" }}>The window, not the wall.</h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>An illustration is a window that lets light onto the text. Every entry here names the point it serves, so you use it for the truth and not the applause. Search it, filter it, save what you need.</p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          <div style={{ position: "relative", marginBottom: "var(--s-3)" }}>
            <Search size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--ink-muted)" }} aria-hidden />
            <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search illustrations" placeholder="Search by theme, text, or what you are preaching"
              style={{ width: "100%", fontFamily: "var(--B)", fontSize: "16px", padding: "12px 14px 12px 42px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)", color: "var(--ink)" }} />
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "var(--s-4)" }}>
            <Chip active={!theme && !savedOnly} onClick={() => { setTheme(null); setSavedOnly(false); }}>All</Chip>
            <Chip active={savedOnly} onClick={() => { setSavedOnly(true); setTheme(null); }}>Saved ({saved.length})</Chip>
            {themes.map((t) => <Chip key={t} active={theme === t} onClick={() => { setTheme(theme === t ? null : t); setSavedOnly(false); }}>{t}</Chip>)}
          </div>
          {persistFailed && <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "0 0 var(--s-3)" }}>Couldn't save to this browser — your work here will not survive a reload.</p>}

          {!items && !error && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading…</p>}
          {error && <LoadFailed what="The library" onRetry={() => setNonce((n) => n + 1)} backHref="/leadership" backLabel="Back to Leadership" />}
          {items && items.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>The library is empty right now.</p>}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))", gap: "14px" }}>
            {filtered.map((i) => (
              <div key={i.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "2px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                  <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "6px" }}>{i.theme}</div>
                  <button onClick={() => toggle(i.id)} aria-label="Save" aria-pressed={saved.includes(i.id)} style={{ background: "none", border: "none", cursor: "pointer", color: saved.includes(i.id) ? "var(--mustard-text)" : "var(--ink-muted)", padding: 0 }}>
                    <Bookmark size={18} fill={saved.includes(i.id) ? "currentColor" : "none"} />
                  </button>
                </div>
                <h3 style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", marginBottom: "8px", lineHeight: 1.2 }}>{i.title}</h3>
                <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "10px" }}>{i.text}</p>
                <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", borderTop: "1px solid var(--border)", paddingTop: "10px" }}><strong style={{ color: "var(--mustard-text)" }}>The point. </strong>{i.point}</p>
                {(i.scriptures?.length || i.source) ? (
                  <p style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink-muted)", marginTop: "8px" }}>{(i.scriptures || []).join(" · ")}{i.scriptures?.length && i.source ? " · " : ""}{i.source}</p>
                ) : null}
              </div>
            ))}
          </div>
          {items && items.length > 0 && filtered.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Nothing matches that yet.</p>}
        </div>
      </section>
    </Layout>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-pressed={active} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px", padding: "7px 14px", borderRadius: "999px", cursor: "pointer", border: "1px solid " + (active ? "var(--mustard)" : "var(--border)"), background: active ? "var(--mustard)" : "var(--card)", color: active ? "var(--charcoal)" : "var(--ink-muted)" }}>{children}</button>
  );
}
