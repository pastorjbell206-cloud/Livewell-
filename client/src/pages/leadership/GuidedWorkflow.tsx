/**
 * The Guided Workflow engine (/leadership/workflow/:slug). One component drives
 * the multi-session planning tools from client/public/leadership/workflows/
 * <slug>.json: the Premarital Counseling Workflow, the Discipleship Pathway
 * Planner, and the Church Revitalization Planner. Each is a sequence of stages,
 * each stage a set of prompts to work through and write into. Everything is
 * saved to the browser under the workflow slug — one autosaved working copy,
 * plus up to twelve named saved copies per workflow (roadmap HS-5) so two
 * counseled couples never overwrite each other. Stateless, no login, exportable.
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

interface Prompt { id: string; q: string; help?: string; }
interface Stage { id: string; kicker: string; title: string; note?: string; prompts: Prompt[]; }
interface Data { slug: string; title: string; subtitle: string; intro: string; stages: Stage[]; closing?: string; }

// What the render actually needs. A response missing any of it — including an
// empty stage list — is a failed load, not a blank workflow.
const isData = (x: unknown): x is Data => {
  const d = x as Data;
  return !!d && typeof d === "object" && typeof d.title === "string" && typeof d.intro === "string" &&
    Array.isArray(d.stages) && d.stages.length > 0 &&
    d.stages.every((s) => !!s && Array.isArray(s.prompts));
};

// Saved answers are prompt-id -> written text. Anything else under the key is
// treated as absent rather than reaching the render.
const isAnswers = (x: unknown): x is Record<string, string> =>
  !!x && typeof x === "object" && !Array.isArray(x) &&
  Object.values(x as Record<string, unknown>).every((v) => typeof v === "string");

// Named saved copies (roadmap HS-5): the autosave is one working slot per
// workflow; a pastor counseling two couples needs one per couple. Per-slug key,
// capped at twelve.
interface SaveRec { id: string; name: string; savedAt: string; data: Record<string, string>; }
const savesKey = (slug: string) => `livewell-saves-guided-workflow-${slug}`;
const isSaveRec = (x: unknown): x is SaveRec => {
  const r = x as SaveRec;
  return !!r && typeof r === "object" && typeof r.id === "string" && typeof r.name === "string" && typeof r.savedAt === "string" && isAnswers(r.data);
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

export default function GuidedWorkflow() {
  const [, params] = useRoute("/leadership/workflow/:slug");
  const slug = params?.slug;
  // The loaded workflow is tagged with the attempt (slug + retry nonce) that
  // fetched it; `data` is derived per render, so a slug change or retry shows
  // the loading state again without a synchronous setState in the effect.
  const [loaded, setLoaded] = useState<{ attempt: string; data: Data } | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    slug ? readStoredJSON(`livewell-workflow-${slug}`, isAnswers, {}) : {}
  );
  const [open, setOpen] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [nonce, setNonce] = useState(0);
  // The attempt that failed. Deriving `error` from it means a slug change or a
  // retry clears the panel without extra state writes.
  const [failedAt, setFailedAt] = useState<string | null>(null);
  const attempt = `${slug}|${nonce}`;
  const error = failedAt === attempt;
  const data = loaded && loaded.attempt === attempt ? loaded.data : null;
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [persistFailed, setPersistFailed] = useState(false);
  const [copies, setCopies] = useState<SaveRec[]>(() =>
    slug ? readStoredJSON(savesKey(slug), isSaveList, []) : []
  );
  const [saveName, setSaveName] = useState("");

  const KEY = slug ? `livewell-workflow-${slug}` : "";

  // On a new attempt (slug change or retry), re-read the browser saves and
  // reset the per-workflow chrome during render — the documented "state from
  // previous renders" pattern — so the effect below only fetches.
  const [prevAttempt, setPrevAttempt] = useState(attempt);
  if (slug && prevAttempt !== attempt) {
    setPrevAttempt(attempt);
    setCopyStatus("idle");
    setAnswers(readStoredJSON(`livewell-workflow-${slug}`, isAnswers, {}));
    setCopies(readStoredJSON(savesKey(slug), isSaveList, []));
    setSaveName("");
  }

  useEffect(() => {
    if (!slug) return;
    let stale = false;
    fetchJson<Data>(`/leadership/workflows/${slug}.json`, isData)
      .then((d) => { if (!stale) { setLoaded({ attempt: `${slug}|${nonce}`, data: d }); setOpen(d.stages[0]?.id ?? null); } })
      .catch(() => { if (!stale) setFailedAt(`${slug}|${nonce}`); });
    return () => { stale = true; };
  }, [slug, nonce]);

  useEffect(() => {
    if (!KEY) return;
    const t = setTimeout(() => {
      const ok = writeStoredJSON(KEY, answers);
      setPersistFailed(!ok);
      if (ok) { setSaved(true); setTimeout(() => setSaved(false), 1000); }
    }, 500);
    return () => clearTimeout(t);
  }, [answers, KEY]);

  const done = useMemo(() => {
    if (!data) return 0;
    const all = data.stages.flatMap((s) => s.prompts.map((p) => p.id));
    return all.filter((id) => (answers[id] || "").trim()).length;
  }, [data, answers]);
  const totalPrompts = data ? data.stages.flatMap((s) => s.prompts).length : 0;

  // "Copied" only after a copy actually happened (audit 15 H1).
  const runCopy = async (text: string) => {
    const ok = await copyToClipboard(text);
    setCopyStatus(ok ? "copied" : "failed");
    if (ok) setTimeout(() => setCopyStatus("idle"), 2000);
  };

  const copy = () => {
    if (!data) return;
    let out = data.title.toUpperCase() + "\n\n";
    for (const s of data.stages) { out += `== ${s.title} ==\n`; for (const p of s.prompts) out += `\n${p.q}\n${answers[p.id] || ""}\n`; out += "\n"; }
    return runCopy(out);
  };

  // The rescue path: on a failed fetch the questions are gone but the written
  // answers are not. Without the JSON only the prompt ids can label them.
  const savedEntries = Object.entries(answers).filter(([, v]) => v.trim());
  const copyRescue = () =>
    runCopy(savedEntries.map(([id, v]) => `${id}\n${v.trim()}`).join("\n\n"));

  // Saved copies live under their own per-slug key; the working slot above is
  // untouched. Loading a copy replaces the working answers, and the autosave
  // carries it on.
  const atCap = copies.length >= MAX_SAVES;
  const saveCopy = () => {
    const name = saveName.trim();
    if (!slug || !name || atCap) return;
    const next = [{ id: Date.now().toString(36), name, savedAt: new Date().toISOString(), data: answers }, ...copies];
    setCopies(next);
    setSaveName("");
    if (!writeStoredJSON(savesKey(slug), next)) setPersistFailed(true);
  };
  const loadCopy = (c: SaveRec) => setAnswers(c.data);
  const deleteCopy = (id: string) => {
    if (!slug) return;
    const next = copies.filter((c) => c.id !== id);
    setCopies(next);
    if (!writeStoredJSON(savesKey(slug), next)) setPersistFailed(true);
  };

  return (
    <Layout>
      {data && <SEOMeta title={`${data.title} — A Guided Workflow`} description={data.subtitle} url={`https://www.livewellbyjamesbell.co/leadership/workflow/${slug}`} />}

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}><Link href="/leadership" style={{ color: "inherit" }}>Leadership Formation</Link> · Workflow</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "22ch" }}>{data?.title ?? (error ? "The workflow" : "Loading…")}</h1>
          {data?.subtitle && <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>{data.subtitle}</p>}
        </div>
      </section>

      {error && (
        <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
          <LoadFailed what="The workflow" onRetry={() => setNonce((n) => n + 1)} backHref="/leadership" backLabel="Back to Leadership" />
          {savedEntries.length > 0 && (
            <div style={{ maxWidth: "480px", margin: "var(--s-4) auto 0", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.7, color: "var(--ink-muted)", margin: "0 0 12px" }}>
                The answers you wrote here are still saved on this device. You can take a copy with you now.
              </p>
              <button onClick={copyRescue} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", padding: "10px 18px", background: "var(--mustard)", color: "var(--charcoal)", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Copy everything you wrote</button>
              {copyStatus === "copied" && <p role="status" style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "10px 0 0" }}>Copied</p>}
              {copyStatus === "failed" && <p role="status" style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "10px 0 0" }}>Copy failed — select and copy manually.</p>}
            </div>
          )}
        </section>
      )}

      {data && (
        <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
          <div style={{ ...wrap, maxWidth: "780px" }}>
            {data.intro.split("\n\n").map((p, i) => <p key={i} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "12px" }}>{p}</p>)}

            <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "var(--s-3) 0 var(--s-4)" }}>
              <div style={{ flex: 1, height: "6px", background: "var(--border)", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ width: `${totalPrompts ? Math.round((done / totalPrompts) * 100) : 0}%`, height: "100%", background: "var(--mustard)" }} />
              </div>
              <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", whiteSpace: "nowrap" }}>{done} / {totalPrompts}</span>
            </div>

            {data.stages.map((s) => {
              const isOpen = open === s.id;
              const stageDone = s.prompts.filter((p) => (answers[p.id] || "").trim()).length;
              return (
                <div key={s.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "2px solid var(--mustard)", borderRadius: "var(--radius-sm)", marginBottom: "10px", overflow: "hidden" }}>
                  <button onClick={() => setOpen(isOpen ? null : s.id)} aria-expanded={isOpen} style={{ width: "100%", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", padding: "14px var(--s-4)", background: "none", border: "none", cursor: "pointer" }}>
                    <span>
                      <span className="eyebrow" style={{ color: "var(--mustard-text)" }}>{s.kicker}</span>
                      <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "21px", fontWeight: 500, color: "var(--ink)", marginTop: "2px" }}>{s.title}</span>
                    </span>
                    <span style={{ fontFamily: "var(--U)", fontSize: "12px", color: stageDone === s.prompts.length ? "var(--mustard-text)" : "var(--ink-muted)", whiteSpace: "nowrap" }}>{stageDone}/{s.prompts.length}</span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 var(--s-4) var(--s-4)", borderTop: "1px solid var(--border)" }}>
                      {s.note && <p style={{ fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink-muted)", fontStyle: "italic", margin: "14px 0" }}>{s.note}</p>}
                      {s.prompts.map((p) => (
                        <div key={p.id} style={{ marginBottom: "var(--s-3)" }}>
                          <label style={{ display: "block", fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", marginBottom: "2px" }}>{p.q}</label>
                          {p.help && <p style={{ fontFamily: "var(--B)", fontSize: "13px", color: "var(--ink-muted)", marginBottom: "6px", lineHeight: 1.5 }}>{p.help}</p>}
                          <textarea value={answers[p.id] || ""} onChange={(e) => setAnswers((a) => ({ ...a, [p.id]: e.target.value }))} rows={3}
                            style={{ width: "100%", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, padding: "10px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--bone)", color: "var(--ink)", resize: "vertical" }} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", marginTop: "var(--s-3)" }}>
              <button onClick={copy} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", padding: "10px 18px", background: "var(--mustard)", color: "var(--charcoal)", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Copy everything</button>
              {copyStatus === "copied" && <span role="status" style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>Copied</span>}
              {copyStatus === "failed" && <span role="status" style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>Copy failed — select and copy manually.</span>}
              {copyStatus === "idle" && <span role="status" style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", opacity: saved ? 1 : 0, transition: "opacity .3s" }}>Saved to this browser</span>}
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
