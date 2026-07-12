/**
 * The Sermon Prep Workbench (/leadership/sermon-prep). A guided, stateless
 * workflow from the text to the pulpit. Everything is saved to the browser
 * (localStorage): one autosaved working slot, plus up to twelve named saved
 * copies (roadmap HS-5) for the weeks that hold more than one sermon. No
 * login. Exportable as plain text.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { copyToClipboard } from "@/lib/clipboard";
import { isArrayOf, readStoredJSON, writeStoredJSON } from "@/lib/storage";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const KEY = "livewell-sermon-workbench";
const SAVES_KEY = "livewell-saves-sermon-workbench";
const MAX_SAVES = 12;

interface Stage { id: string; kicker: string; title: string; prompts: { id: string; q: string; help: string }[]; }

// Saved shape: a title plus prompt-id -> written text. Anything else under the
// key is treated as absent rather than reaching the render.
const isSaved = (x: unknown): x is { title?: unknown; answers?: unknown } => !!x && typeof x === "object";
const isAnswers = (x: unknown): x is Record<string, string> =>
  !!x && typeof x === "object" && !Array.isArray(x) &&
  Object.values(x as Record<string, unknown>).every((v) => typeof v === "string");

// Named saved copies (roadmap HS-5): the autosave above is one working slot; a
// pastor carrying two sermons at once needs more than one. Capped at twelve.
interface SaveRec { id: string; name: string; savedAt: string; data: { title: string; answers: Record<string, string> }; }
const isSaveRec = (x: unknown): x is SaveRec => {
  const r = x as SaveRec;
  return !!r && typeof r === "object" && typeof r.id === "string" && typeof r.name === "string" && typeof r.savedAt === "string" &&
    !!r.data && typeof r.data === "object" && typeof r.data.title === "string" && isAnswers(r.data.answers);
};
const isSaveList = isArrayOf(isSaveRec);

// "Jun 14" — with the year when the copy is not from this year.
const fmtSavedAt = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  if (d.getFullYear() !== new Date().getFullYear()) opts.year = "numeric";
  return d.toLocaleDateString(undefined, opts);
};

const STAGES: Stage[] = [
  { id: "text", kicker: "Day one", title: "Live in the text", prompts: [
    { id: "passage", q: "What is the passage?", help: "Book, chapter, and verses. Read it ten times before you read anyone on it." },
    { id: "observe", q: "What is actually there?", help: "The words, the repetitions, the surprises, the structure. What does the text say before it means anything." },
    { id: "context", q: "What surrounds it?", help: "What comes before and after. The book's argument. The historical moment. Who wrote it, to whom, and why." },
  ]},
  { id: "meaning", kicker: "Day two", title: "Find the point", prompts: [
    { id: "bigidea", q: "What is the one thing this text is doing?", help: "Not three things. One. State the author's main point in a single sentence you could say out loud." },
    { id: "gospel", q: "Where is the cross in this?", help: "How does this text connect to the death and resurrection of Christ. Not a forced add-on. The real line." },
    { id: "tension", q: "What does this text resist in us?", help: "Where does it push against what the room already believes or wants. Name the friction." },
  ]},
  { id: "shape", kicker: "Day three", title: "Shape the sermon", prompts: [
    { id: "claim", q: "What is your sermon's single claim?", help: "The big idea of the text, sharpened into the big idea of the sermon. One sentence the congregation could repeat on Wednesday." },
    { id: "moves", q: "What are the moves?", help: "The two to four movements that get the room from the start to the claim. Each move earns the next." },
    { id: "application", q: "What does this ask of this congregation?", help: "Not generic application. This room, this week. Specific, costly, and inside the indictment with them." },
  ]},
  { id: "land", kicker: "Day four", title: "Land it", prompts: [
    { id: "open", q: "How do you start?", help: "The first ninety seconds. What earns their attention without cheapening the text." },
    { id: "illustrate", q: "Where is the window?", help: "The one or two illustrations that open the text, not decorate it. Cut the rest." },
    { id: "close", q: "How do you end?", help: "The last thing they carry out. Leave weight. Do not tie it in a bow." },
  ]},
];

export default function SermonWorkbench() {
  // Restore saved work in lazy initializers (once, at mount) rather than a
  // synchronous setState in an effect.
  const [title, setTitle] = useState(() => {
    const o = readStoredJSON(KEY, isSaved, {});
    return typeof o.title === "string" ? o.title : "";
  });
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const o = readStoredJSON(KEY, isSaved, {});
    return isAnswers(o.answers) ? o.answers : {};
  });
  const [saved, setSaved] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [persistFailed, setPersistFailed] = useState(false);
  const [copies, setCopies] = useState<SaveRec[]>(() => readStoredJSON(SAVES_KEY, isSaveList, []));
  const [saveName, setSaveName] = useState("");


  useEffect(() => {
    const t = setTimeout(() => {
      // A failed save was silent here — days of sermon prep could vanish in
      // private mode with the page still promising "Saved to this browser."
      const ok = writeStoredJSON(KEY, { title, answers });
      setPersistFailed(!ok);
      if (ok) { setSaved(true); setTimeout(() => setSaved(false), 1200); }
    }, 600);
    return () => clearTimeout(t);
  }, [title, answers]);

  const text = useMemo(() => {
    let out = (title ? title.toUpperCase() : "SERMON") + "\n\n";
    for (const s of STAGES) {
      out += `== ${s.title} ==\n`;
      for (const p of s.prompts) { out += `\n${p.q}\n${answers[p.id] || ""}\n`; }
      out += "\n";
    }
    return out;
  }, [title, answers]);

  // "Copied" only after a copy actually happened (audit 15 H1).
  const copy = async () => {
    const ok = await copyToClipboard(text);
    setCopyStatus(ok ? "copied" : "failed");
    if (ok) setTimeout(() => setCopyStatus("idle"), 2000);
  };
  const clear = () => { if (confirm("Clear this sermon and start over?")) { setTitle(""); setAnswers({}); } };

  // Saved copies live under their own key; the working slot above is untouched.
  // Loading a copy replaces the working state, and the autosave carries it on.
  const atCap = copies.length >= MAX_SAVES;
  const saveCopy = () => {
    const name = saveName.trim();
    if (!name || atCap) return;
    const next = [{ id: Date.now().toString(36), name, savedAt: new Date().toISOString(), data: { title, answers } }, ...copies];
    setCopies(next);
    setSaveName("");
    if (!writeStoredJSON(SAVES_KEY, next)) setPersistFailed(true);
  };
  const loadCopy = (c: SaveRec) => { setTitle(c.data.title); setAnswers(c.data.answers); };
  const deleteCopy = (id: string) => {
    const next = copies.filter((c) => c.id !== id);
    setCopies(next);
    if (!writeStoredJSON(SAVES_KEY, next)) setPersistFailed(true);
  };

  return (
    <Layout>
      <SEOMeta title="The Sermon Prep Workbench — From the Text to the Pulpit" description="A guided workflow for preparing a sermon that honors the text and lands on a Tuesday. The questions worth answering at each stage. Saves to your browser." url="https://www.livewellbyjamesbell.co/leadership/sermon-prep" />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}><Link href="/leadership" style={{ color: "inherit" }}>Leadership Formation</Link> · The sermon workbench</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "16px" }}>From the text to the pulpit.</h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>Four days of questions, in order. Live in the text before you reach for a point. Find the one thing it is doing. Shape it. Then land it. Everything here stays in your browser.</p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={{ ...wrap, maxWidth: "760px" }}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Sermon title or text" placeholder="Sermon title or text (e.g. Luke 15, The Prodigal)"
            style={{ width: "100%", fontFamily: "var(--F)", fontSize: "22px", padding: "12px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)", color: "var(--ink)", marginBottom: "var(--s-4)" }} />

          {STAGES.map((s) => (
            <div key={s.id} style={{ marginBottom: "var(--s-5)" }}>
              <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "4px" }}>{s.kicker}</div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "26px", fontWeight: 500, color: "var(--ink)", marginBottom: "var(--s-3)" }}>{s.title}</h2>
              {s.prompts.map((p) => (
                <div key={p.id} style={{ marginBottom: "var(--s-3)" }}>
                  <label htmlFor={`sermon-${p.id}`} style={{ display: "block", fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", marginBottom: "2px" }}>{p.q}</label>
                  <p style={{ fontFamily: "var(--B)", fontSize: "13px", color: "var(--ink-muted)", marginBottom: "6px", lineHeight: 1.5 }}>{p.help}</p>
                  <textarea id={`sermon-${p.id}`} value={answers[p.id] || ""} onChange={(e) => setAnswers((a) => ({ ...a, [p.id]: e.target.value }))} rows={3}
                    style={{ width: "100%", fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.6, padding: "10px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)", color: "var(--ink)", resize: "vertical" }} />
                </div>
              ))}
            </div>
          ))}

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <button onClick={copy} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", padding: "10px 18px", background: "var(--mustard)", color: "var(--charcoal)", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Copy as text</button>
            <button onClick={clear} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", padding: "10px 18px", background: "none", color: "var(--ink-muted)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Clear</button>
            {copyStatus === "copied" && <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>Copied</span>}
            {copyStatus === "failed" && <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>Copy failed — select and copy manually.</span>}
            {copyStatus === "idle" && <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", opacity: saved ? 1 : 0, transition: "opacity .3s" }}>Saved to this browser</span>}
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
        </div>
      </section>
    </Layout>
  );
}
