/**
 * The Sermon Prep Workbench (/leadership/sermon-prep). A guided, stateless
 * workflow from the text to the pulpit. Everything is saved to the browser
 * (localStorage) under a named sermon slot. No login. Exportable as plain text.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const KEY = "livewell-sermon-workbench";

interface Stage { id: string; kicker: string; title: string; prompts: { id: string; q: string; help: string }[]; }

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
  const [title, setTitle] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) { const o = JSON.parse(raw); setTitle(o.title || ""); setAnswers(o.answers || {}); }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      try { localStorage.setItem(KEY, JSON.stringify({ title, answers })); setSaved(true); setTimeout(() => setSaved(false), 1200); } catch { /* ignore */ }
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

  const copy = () => { navigator.clipboard?.writeText(text); };
  const clear = () => { if (confirm("Clear this sermon and start over?")) { setTitle(""); setAnswers({}); } };

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
                    style={{ width: "100%", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, padding: "10px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)", color: "var(--ink)", resize: "vertical" }} />
                </div>
              ))}
            </div>
          ))}

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <button onClick={copy} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", padding: "10px 18px", background: "var(--mustard)", color: "var(--charcoal)", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Copy as text</button>
            <button onClick={clear} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", padding: "10px 18px", background: "none", color: "var(--ink-muted)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>Clear</button>
            <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", opacity: saved ? 1 : 0, transition: "opacity .3s" }}>Saved to this browser</span>
          </div>
        </div>
      </section>
    </Layout>
  );
}
