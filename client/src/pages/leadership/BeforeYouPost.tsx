/**
 * Before You Post (/leadership/before-you-post). A short examen for a leader
 * with his thumb over the share button. Not a content filter. A heart filter.
 * The questions are searching on purpose. Stateless, nothing is saved or sent.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Q { id: string; text: string; help: string; goodAnswer: boolean; }

// goodAnswer is the answer that should make you comfortable posting.
const QUESTIONS: Q[] = [
  { id: "true", text: "Do I actually know this is true?", help: "Not likely. Not what someone said. True. Could you stake your name on the facts in a room of people who disagree with you.", goodAnswer: true },
  { id: "mine", text: "Is this mine to say?", help: "Some true things are not yours to publish. A private matter, someone else's story, a confidence, a wound that is not your own.", goodAnswer: false },
  { id: "ego", text: "Am I posting this to be right, or to do good?", help: "Be honest. If the post disappeared and no one knew it was you, would you still feel the need to say it.", goodAnswer: false },
  { id: "kind", text: "Would I say this to the person's face?", help: "In the room. In their kitchen. To the actual human being, not the avatar. If not, you are not being brave, you are being safe.", goodAnswer: true },
  { id: "tribe", text: "Am I being consistent, or only loud against the other side?", help: "Would you say the same thing if your own people had done it. If the answer is no, this is not conviction. It is tribe.", goodAnswer: true },
  { id: "anger", text: "Am I angry right now?", help: "Anger is not always wrong. But anger posts age badly. The thing that feels urgent at 11pm usually keeps until morning.", goodAnswer: false },
  { id: "sheep", text: "Will this help the sheep, or just feed the wolves?", help: "Picture the most fragile person in your congregation reading this. Does it shepherd them, or hand the cynics another reason.", goodAnswer: true },
  { id: "wait", text: "Can it wait a day?", help: "Almost everything can. The post you still want to publish tomorrow is usually the one worth publishing.", goodAnswer: true },
];

export default function BeforeYouPost() {
  const [ans, setAns] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);

  const flags = useMemo(() => QUESTIONS.filter((q) => ans[q.id] !== undefined && ans[q.id] !== q.goodAnswer), [ans]);
  const answered = Object.keys(ans).length;

  return (
    <Layout>
      <SEOMeta title="Before You Post — An Examen for Leaders" description="A short examen for a leader with his thumb over the share button. Not a content filter, a heart filter. The questions are searching on purpose." url="https://www.livewellbyjamesbell.co/leadership/before-you-post" />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}><Link href="/leadership" style={{ color: "inherit" }}>Leadership Formation</Link> · Before you post</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 4.6vw, 48px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px" }}>Before your thumb hits share.</h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "58ch" }}>A leader can lose in thirty seconds online what took thirty years to build. This is not a content filter. It is a heart filter. Answer honestly. No one is watching and nothing is saved.</p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={{ ...wrap, maxWidth: "720px" }}>
          {QUESTIONS.map((q, n) => (
            <div key={q.id} style={{ marginBottom: "var(--s-4)", paddingBottom: "var(--s-3)", borderBottom: "1px solid var(--border)" }}>
              <p style={{ fontFamily: "var(--F)", fontSize: "21px", fontWeight: 500, color: "var(--ink)", marginBottom: "4px" }}>{n + 1}. {q.text}</p>
              <p style={{ fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.6, marginBottom: "10px" }}>{q.help}</p>
              <div style={{ display: "flex", gap: "8px" }}>
                {[true, false].map((v) => (
                  <button key={String(v)} onClick={() => setAns((a) => ({ ...a, [q.id]: v }))} aria-pressed={ans[q.id] === v} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", padding: "8px 22px", borderRadius: "var(--radius-sm)", cursor: "pointer", border: "1px solid " + (ans[q.id] === v ? "var(--mustard)" : "var(--border)"), background: ans[q.id] === v ? "var(--mustard)" : "var(--card)", color: ans[q.id] === v ? "var(--charcoal)" : "var(--ink-muted)" }}>{v ? "Yes" : "No"}</button>
                ))}
              </div>
            </div>
          ))}

          <button disabled={answered < QUESTIONS.length} onClick={() => setDone(true)} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "15px", padding: "12px 22px", background: answered < QUESTIONS.length ? "var(--border)" : "var(--mustard)", color: answered < QUESTIONS.length ? "var(--ink-muted)" : "var(--charcoal)", border: "none", borderRadius: "var(--radius-sm)", cursor: answered < QUESTIONS.length ? "not-allowed" : "pointer" }}>
            {answered < QUESTIONS.length ? `Answer all ${QUESTIONS.length}` : "Weigh it"}
          </button>

          {done && (
            <div role="status" style={{ marginTop: "var(--s-5)", background: "var(--charcoal)", color: "var(--bone)", borderRadius: "var(--radius-sm)", padding: "var(--s-5)", borderTop: `3px solid ${flags.length ? "var(--strain)" : "var(--mustard)"}` }}>
              {flags.length === 0 ? (
                <>
                  <h2 style={{ fontFamily: "var(--F)", fontSize: "26px", fontWeight: 500, color: "var(--mustard)", marginBottom: "12px" }}>It may be worth saying.</h2>
                  <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color: "rgba(245,240,230,0.9)" }}>Nothing here flagged. That does not make it wise, only clear of the obvious traps. Say it plainly, say it once, and be willing to own it in the morning.</p>
                </>
              ) : (
                <>
                  <h2 style={{ fontFamily: "var(--F)", fontSize: "26px", fontWeight: 500, color: "var(--mustard)", marginBottom: "12px" }}>Wait.</h2>
                  <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color: "rgba(245,240,230,0.9)", marginBottom: "var(--s-3)" }}>{flags.length === 1 ? "One answer is worth sitting with before you post." : `${flags.length} answers are worth sitting with before you post.`}</p>
                  <ul style={{ margin: 0, paddingLeft: "18px" }}>
                    {flags.map((q) => <li key={q.id} style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "rgba(245,240,230,0.85)", marginBottom: "6px" }}>{q.text}</li>)}
                  </ul>
                  <p style={{ fontFamily: "var(--B)", fontSize: "15px", fontStyle: "italic", color: "rgba(245,240,230,0.6)", marginTop: "var(--s-3)" }}>None of this means stay silent forever. It means not now, not like this, not from here.</p>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
