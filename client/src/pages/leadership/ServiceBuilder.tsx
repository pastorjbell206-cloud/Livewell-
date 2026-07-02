/**
 * The Service Builder (/leadership/service/:slug). Assemble an order of service
 * from a library of elements, each with guidance and one or more sample texts
 * you can choose and edit. Drives the Wedding Service Builder and the Funeral
 * Service Builder from client/public/leadership/services/<slug>.json. Saved to
 * the browser, exportable as a clean order of service. Stateless, no login.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import LoadFailed from "@/components/LoadFailed";
import { SEOMeta } from "@/components/SEOMeta";
import { copyToClipboard } from "@/lib/clipboard";
import { fetchJson } from "@/lib/fetch-json";
import { readStoredJSON, writeStoredJSON } from "@/lib/storage";

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
  const KEY = slug ? `livewell-service-${slug}` : "";

  useEffect(() => {
    if (!slug) return;
    // Reset FIRST. Without this, switching services (wedding -> funeral) left
    // the previous service's state live while KEY had already flipped, and the
    // save effect below immediately overwrote the new slug's saved work with
    // the old slug's state — permanently, if the fetch then failed.
    setData(null);
    setSt({ include: {}, pick: {}, text: {} });
    setCopyStatus("idle");
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
                              <button key={i} onClick={() => choose(el, i)} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "12px", padding: "5px 11px", borderRadius: "999px", cursor: "pointer", border: "1px solid " + (st.pick[el.id] === i ? "var(--mustard)" : "var(--border)"), background: st.pick[el.id] === i ? "var(--mustard)" : "var(--bone)", color: st.pick[el.id] === i ? "var(--charcoal)" : "var(--ink-muted)" }}>{sm.label}</button>
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
              {copyStatus === "copied" && <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>Copied</span>}
              {copyStatus === "failed" && <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>Copy failed — select and copy manually.</span>}
            </div>
            {persistFailed && <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", marginTop: "8px" }}>Couldn't save to this browser — your work here will not survive a reload.</p>}
            {data.closing && <p style={{ fontFamily: "var(--B)", fontSize: "15px", fontStyle: "italic", color: "var(--ink-muted)", marginTop: "var(--s-4)", lineHeight: 1.7 }}>{data.closing}</p>}
          </div>
        </section>
      )}
    </Layout>
  );
}
