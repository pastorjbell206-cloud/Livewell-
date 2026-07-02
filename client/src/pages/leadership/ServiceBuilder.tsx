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
import { SEOMeta } from "@/components/SEOMeta";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Sample { label: string; text: string; }
interface Element { id: string; name: string; guidance?: string; optional?: boolean; samples: Sample[]; }
interface Data { slug: string; title: string; subtitle: string; intro: string; elements: Element[]; closing?: string; }
interface State { include: Record<string, boolean>; pick: Record<string, number>; text: Record<string, string>; }

export default function ServiceBuilder() {
  const [, params] = useRoute("/leadership/service/:slug");
  const slug = params?.slug;
  const [data, setData] = useState<Data | null>(null);
  const [st, setSt] = useState<State>({ include: {}, pick: {}, text: {} });
  const KEY = slug ? `livewell-service-${slug}` : "";

  useEffect(() => {
    if (!slug) return;
    let saved: State | null = null;
    try { const raw = localStorage.getItem(`livewell-service-${slug}`); if (raw) saved = JSON.parse(raw); } catch { /* ignore */ }
    fetch(`/leadership/services/${slug}.json`).then((r) => (r.ok ? r.json() : null)).then((d: Data | null) => {
      if (!d) return;
      setData(d);
      if (saved) { setSt(saved); return; }
      const include: Record<string, boolean> = {}, pick: Record<string, number> = {}, text: Record<string, string> = {};
      for (const el of d.elements) { include[el.id] = !el.optional; pick[el.id] = 0; text[el.id] = el.samples[0]?.text ?? ""; }
      setSt({ include, pick, text });
    }).catch(() => {});
  }, [slug]);

  useEffect(() => { if (KEY && data) { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch { /* ignore */ } } }, [st, KEY, data]);

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

  return (
    <Layout>
      {data && <SEOMeta title={`${data.title} — Build the Order of Service`} description={data.subtitle} url={`https://www.livewellbyjamesbell.co/leadership/service/${slug}`} />}

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}><Link href="/leadership" style={{ color: "inherit" }}>Leadership Formation</Link> · Service builder</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "22ch" }}>{data?.title ?? "Loading…"}</h1>
          {data?.subtitle && <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>{data.subtitle}</p>}
        </div>
      </section>

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

            <button onClick={() => navigator.clipboard?.writeText(order)} style={{ marginTop: "var(--s-3)", fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", padding: "10px 18px", background: "var(--mustard)", color: "var(--charcoal)", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Copy the order of service</button>
            {data.closing && <p style={{ fontFamily: "var(--B)", fontSize: "15px", fontStyle: "italic", color: "var(--ink-muted)", marginTop: "var(--s-4)", lineHeight: 1.7 }}>{data.closing}</p>}
          </div>
        </section>
      )}
    </Layout>
  );
}
