/**
 * The Service Builder (/leadership/service/:slug). Assemble an order of service
 * from a library of elements, each with guidance and one or more sample texts
 * you can choose and edit. Drives the Wedding Service Builder and the Funeral
 * Service Builder from client/public/leadership/services/<slug>.json. Saved to
 * the browser — one autosaved working copy, plus up to twelve named saved
 * copies per service (roadmap HS-5) so two weddings never overwrite each
 * other. Exportable as a clean order of service. Stateless, no login.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import LoadFailed from "@/components/LoadFailed";
import { SEOMeta } from "@/components/SEOMeta";
import { copyToClipboard } from "@/lib/clipboard";
import { fetchJson } from "@/lib/fetch-json";
import { isArrayOf, readStoredJSON, writeStoredJSON } from "@/lib/storage";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Sample { label: string; text: string; }
interface Element { id: string; name: string; guidance?: string; optional?: boolean; samples: Sample[]; }
interface Data { slug: string; title: string; subtitle: string; intro: string; elements: Element[]; closing?: string; }
interface State { include: Record<string, boolean>; pick: Record<string, number>; text: Record<string, string>; }

// What the render actually needs. A response missing any of it — including an
// empty element list — is a failed load, not a blank service.
const isData = (x: unknown): x is Data => {
  const d = x as Data;
  return !!d && typeof d === "object" && typeof d.title === "string" && typeof d.intro === "string" &&
    Array.isArray(d.elements) && d.elements.length > 0 &&
    d.elements.every((el) => !!el && Array.isArray(el.samples));
};

// Saved-state shape guard: corrupt-but-valid JSON (e.g. "{}") used to reach
// render and crash on st.include[el.id].
const isState = (x: unknown): x is State => {
  const s = x as State;
  return !!s && typeof s === "object" &&
    typeof s.include === "object" && s.include !== null &&
    typeof s.pick === "object" && s.pick !== null &&
    typeof s.text === "object" && s.text !== null;
};

// Named saved copies (roadmap HS-5): the autosave is one working slot per
// service; a pastor holding two weddings needs one per couple. Per-slug key,
// capped at twelve.
interface SaveRec { id: string; name: string; savedAt: string; data: State; }
const savesKey = (slug: string) => `livewell-saves-service-builder-${slug}`;
const isSaveRec = (x: unknown): x is SaveRec => {
  const r = x as SaveRec;
  return !!r && typeof r === "object" && typeof r.id === "string" && typeof r.name === "string" && typeof r.savedAt === "string" && isState(r.data);
};
const isSaveList = isArrayOf(isSaveRec);
const MAX_SAVES = 12;

// "Jun 14" — with the year when the copy is not from this year.
const fmtSavedAt = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  if (d.getFullYear() !== new Date().getFullYear()) opts.year = "numeric";
  return d.toLocaleDateString(undefined, opts);
};

export default function ServiceBuilder() {
  const [, params] = useRoute("/leadership/service/:slug");
  const slug = params?.slug;
  const [data, setData] = useState<Data | null>(null);
  const [st, setSt] = useState<State>({ include: {}, pick: {}, text: {} });
  const [nonce, setNonce] = useState(0);
  // The attempt (slug + retry nonce) that failed. Deriving `error` from it means
  // a slug change or a retry clears the panel without extra state writes.
  const [failedAt, setFailedAt] = useState<string | null>(null);
  const error = failedAt === `${slug}|${nonce}`;
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [persistFailed, setPersistFailed] = useState(false);
  // Keyed by slug at the route, so this remounts per service (wedding, funeral,
  // …). Saved copies restore in a lazy initializer; the fetch sets data/st
  // asynchronously — no synchronous reset effect that could overwrite one
  // service's saved work with another's.
  const [copies, setCopies] = useState<SaveRec[]>(() => (slug ? readStoredJSON(savesKey(slug), isSaveList, []) : []));
  const [saveName, setSaveName] = useState("");
  const KEY = slug ? `livewell-service-${slug}` : "";

  useEffect(() => {
    if (!slug) return;
    let stale = false;
    const saved = readStoredJSON<State | null>(
      `livewell-service-${slug}`,
      (x): x is State | null => isState(x),
      null
    );
    fetchJson<Data>(`/leadership/services/${slug}.json`, isData).then((d) => {
      if (stale) return;
      setData(d);
      if (saved) { setSt(saved); return; }
      const include: Record<string, boolean> = {}, pick: Record<string, number> = {}, text: Record<string, string> = {};
      for (const el of d.elements) { include[el.id] = !el.optional; pick[el.id] = 0; text[el.id] = el.samples[0]?.text ?? ""; }
      setSt({ include, pick, text });
    }).catch(() => { if (!stale) setFailedAt(`${slug}|${nonce}`); });
    return () => { stale = true; };
  }, [slug, nonce]);

  // Safe now: after a slug change, data is null until THIS slug's fetch lands,
  // so nothing can be written under the new key until its own state exists.
  useEffect(() => {
    if (!KEY || !data) return;
    const t = setTimeout(() => setPersistFailed(!writeStoredJSON(KEY, st)), 0);
    return () => clearTimeout(t);
  }, [st, KEY, data]);

  const choose = (el: Element, idx: number) => setSt((s) => ({ ...s, pick: { ...s.pick, [el.id]: idx }, text: { ...s.text, [el.id]: el.samples[idx]?.text ?? "" } }));

  // Saved copies live under their own per-slug key; the working slot above is
  // untouched. Loading a copy replaces the current order of service, and the
  // autosave carries it on.
  const atCap = copies.length >= MAX_SAVES;
  const saveCopy = () => {
    const name = saveName.trim();
    if (!slug || !name || atCap) return;
    const next = [{ id: Date.now().toString(36), name, savedAt: new Date().toISOString(), data: st }, ...copies];
    setCopies(next);
    setSaveName("");
    if (!writeStoredJSON(savesKey(slug), next)) setPersistFailed(true);
  };
  const loadCopy = (c: SaveRec) => setSt(c.data);
  const deleteCopy = (id: string) => {
    if (!slug) return;
    const next = copies.filter((c) => c.id !== id);
    setCopies(next);
    if (!writeStoredJSON(savesKey(slug), next)) setPersistFailed(true);
  };

  const order = useMemo(() => {
    if (!data) return "";
    let out = data.title.toUpperCase() + "\n\n";
    for (const el of data.elements) {
      if (!st.include[el.id]) continue;
      out += `${el.name.toUpperCase()}\n${st.text[el.id] || ""}\n\n`;
    }
    return out;
  }, [data, st]);

  // "Copied" only after a copy actually happened (audit 15 H1).
  const copyOrder = async () => {
    const ok = await copyToClipboard(order);
    setCopyStatus(ok ? "copied" : "failed");
    if (ok) setTimeout(() => setCopyStatus("idle"), 2000);
  };

  return (
    <Layout>
      {data && <SEOMeta title={`${data.title} — Build the Order of Service`} description={data.subtitle} url={`https://www.livewellbyjamesbell.co/leadership/service/${slug}`} />}

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}><Link href="/leadership" style={{ color: "inherit" }}>Leadership Formation</Link> · Service builder</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "22ch" }}>{data?.title ?? (error ? "The service builder" : "Loading…")}</h1>
          {data?.subtitle && <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>{data.subtitle}</p>}
        </div>
      </section>

      {error && (
        <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
          <LoadFailed what="The service builder" onRetry={() => setNonce((n) => n + 1)} backHref="/leadership" backLabel="Back to Leadership" />
        </section>
      )}

      {data && (
        <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
          <div style={{ ...wrap, maxWidth: "780px" }}>
            {data.intro.split("\n\n").map((p, i) => <p key={i} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "12px" }}>{p}</p>)}

            <div style={{ marginTop: "var(--s-4)" }}>
              {data.elements.map((el) => {
                const on = st.include[el.id];
                return (
                  <div key={el.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderLeft: `3px solid ${on ? "var(--mustard)" : "var(--border)"}`, borderRadius: "var(--radius-sm)", padding: "var(--s-3) var(--s-4)", marginBottom: "10px", opacity: on ? 1 : 0.6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                        <input type="checkbox" checked={on} onChange={(e) => setSt((s) => ({ ...s, include: { ...s.include, [el.id]: e.target.checked } }))} />
                        <span style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)" }}>{el.name}</span>
                        {el.optional && <span style={{ fontFamily: "var(--U)", fontSize: "11px", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Optional</span>}
                      </label>
                    </div>
                    {on && (
                      <div style={{ marginTop: "10px" }}>
                        {el.guidance && <p style={{ fontFamily: "var(--B)", fontSize: "13px", color: "var(--ink-muted)", fontStyle: "italic", marginBottom: "8px", lineHeight: 1.5 }}>{el.guidance}</p>}
                        {el.samples.length > 1 && (
                          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                            {el.samples.map((sm, i) => (
                              <button key={i} onClick={() => choose(el, i)} aria-pressed={st.pick[el.id] === i} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "12px", padding: "5px 11px", borderRadius: "999px", cursor: "pointer", border: "1px solid " + (st.pick[el.id] === i ? "var(--mustard)" : "var(--border)"), background: st.pick[el.id] === i ? "var(--mustard)" : "var(--bone)", color: st.pick[el.id] === i ? "var(--charcoal)" : "var(--ink-muted)" }}>{sm.label}</button>
                            ))}
                          </div>
                        )}
                        <textarea value={st.text[el.id] || ""} onChange={(e) => setSt((s) => ({ ...s, text: { ...s.text, [el.id]: e.target.value } }))} aria-label={el.name} rows={el.samples[0]?.text ? 4 : 2}
                          style={{ width: "100%", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, padding: "10px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--bone)", color: "var(--ink)", resize: "vertical" }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", marginTop: "var(--s-3)" }}>
              <button onClick={copyOrder} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", padding: "10px 18px", background: "var(--mustard)", color: "var(--charcoal)", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Copy the order of service</button>
              {copyStatus === "copied" && <span role="status" style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>Copied</span>}
              {copyStatus === "failed" && <span role="status" style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>Copy failed — select and copy manually.</span>}
            </div>
            {persistFailed && <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", marginTop: "8px" }}>Couldn't save to this browser — your work here will not survive a reload.</p>}

            <div style={{ marginTop: "var(--s-4)", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-3) var(--s-4)" }}>
              <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>Saved copies</div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <input value={saveName} onChange={(e) => setSaveName(e.target.value)} aria-label="Name for this copy" placeholder="Name this copy"
                  style={{ flex: "1 1 200px", fontFamily: "var(--B)", fontSize: "14px", padding: "8px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--bone)", color: "var(--ink)" }} />
                <button onClick={saveCopy} disabled={!saveName.trim() || atCap}
                  style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px", padding: "8px 14px", background: !saveName.trim() || atCap ? "var(--border)" : "var(--mustard)", color: !saveName.trim() || atCap ? "var(--ink-muted)" : "var(--charcoal)", border: "none", borderRadius: "var(--radius-sm)", cursor: !saveName.trim() || atCap ? "not-allowed" : "pointer" }}>Save a copy</button>
              </div>
              {atCap && <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "8px 0 0" }}>Twelve copies is the limit — delete one to save another.</p>}
              {copies.length > 0 && (
                <div style={{ marginTop: "10px" }}>
                  {copies.map((c) => (
                    <div key={c.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderTop: "1px solid var(--border)" }}>
                      <span style={{ flex: 1, fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink)", overflowWrap: "anywhere" }}>{c.name}</span>
                      <span style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink-muted)", whiteSpace: "nowrap" }}>{fmtSavedAt(c.savedAt)}</span>
                      <button onClick={() => loadCopy(c)} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "12px", padding: "5px 12px", background: "none", color: "var(--ink)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Load</button>
                      <button onClick={() => deleteCopy(c.id)} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "12px", padding: "5px 12px", background: "none", color: "var(--ink-muted)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Delete</button>
                    </div>
                  ))}
                </div>
              )}
              <p style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink-muted)", margin: "10px 0 0" }}>Saves stay in this browser.</p>
            </div>
            {data.closing && <p style={{ fontFamily: "var(--B)", fontSize: "15px", fontStyle: "italic", color: "var(--ink-muted)", marginTop: "var(--s-4)", lineHeight: 1.7 }}>{data.closing}</p>}
          </div>
        </section>
      )}
    </Layout>
  );
}
