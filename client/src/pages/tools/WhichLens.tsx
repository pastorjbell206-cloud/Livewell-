import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { readStoredJSON, removeStoredJSON, writeStoredJSON } from "@/lib/storage";

/**
 * Which Lens Has You? — the flagship diagnostic from the 2026 board audit
 * (program item P8). Thirteen forced choices; five lenses that do a reader's
 * thinking before the reader does: the Flag, the Cause, the Highlighter, the
 * Rearview, the Marketplace. It ends not in a score but in the pillar built
 * to dismantle the lens it found.
 *
 * Scoring is normalized per lens (picked / available) so no lens wins merely
 * by appearing in more items. Mid-flow state survives a reload via
 * sessionStorage (the house pattern: nothing outlives the tab); the result
 * screen offers a non-destructive "Change my answers."
 */

type LensId = "flag" | "cause" | "highlighter" | "rearview" | "marketplace";

interface Option { text: string; lens: LensId }
interface Question { prompt: string; a: Option; b: Option }

const QUESTIONS: Question[] = [
  {
    prompt: "Which worries you more about the church's future?",
    a: { text: "That it will lose its country.", lens: "flag" },
    b: { text: "That it will be on the wrong side of history.", lens: "cause" },
  },
  {
    prompt: "A guest preacher says, plainly, “the kingdom of God is not America.” Your first, honest reaction —",
    a: { text: "A flicker of defensiveness before anything else.", lens: "flag" },
    b: { text: "Wishing he'd said it harder, to the people who really need it.", lens: "cause" },
  },
  {
    prompt: "Which loss would grieve you more?",
    a: { text: "The country my grandparents' church helped build.", lens: "rearview" },
    b: { text: "A church that finally felt like it fit me.", lens: "marketplace" },
  },
  {
    prompt: "When an argument about the faith starts, you reach first for —",
    a: { text: "The verse that settles it.", lens: "highlighter" },
    b: { text: "What the church has always said.", lens: "rearview" },
  },
  {
    prompt: "If you ever left a church, it was (or would be) because —",
    a: { text: "It stopped feeding me.", lens: "marketplace" },
    b: { text: "It changed, and it stopped feeling like the church I grew up in.", lens: "rearview" },
  },
  {
    prompt: "The sermon on money that would bother you most —",
    a: { text: "Gets specific about how much I keep.", lens: "marketplace" },
    b: { text: "Sounds like it was written by a socialist.", lens: "flag" },
  },
  {
    prompt: "“Christian nation.” Your gut says —",
    a: { text: "We were one, and we should be again.", lens: "rearview" },
    b: { text: "We never were one — and saying so out loud feels good.", lens: "cause" },
  },
  {
    prompt: "On religion, your social feed mostly carries —",
    a: { text: "The outrages committed against the church.", lens: "flag" },
    b: { text: "The outrages committed by the church.", lens: "cause" },
  },
  {
    prompt: "A doctrine you dislike turns out to be better supported in Scripture than you hoped. You —",
    a: { text: "Go looking for the verses on the other side.", lens: "highlighter" },
    b: { text: "Assume the traditional reading is culturally conditioned.", lens: "cause" },
  },
  {
    prompt: "Lately, prayer is mostly —",
    a: { text: "Asking God to fix the country.", lens: "flag" },
    b: { text: "Asking God to fix my week.", lens: "marketplace" },
  },
  {
    prompt: "The old hymns, the old liturgy —",
    a: { text: "Are the faith. Losing them is losing it.", lens: "rearview" },
    b: { text: "Are packaging. Whatever connects is fine.", lens: "marketplace" },
  },
  {
    prompt: "When Scripture and your candidate collide —",
    a: { text: "It takes me longer than it should to see the collision.", lens: "flag" },
    b: { text: "My candidate never collides. The other side's always does.", lens: "highlighter" },
  },
  {
    prompt: "You know your Bible best —",
    a: { text: "In the verses that win arguments.", lens: "highlighter" },
    b: { text: "In the passages that comfort.", lens: "marketplace" },
  },
];

const LENSES: Record<LensId, {
  name: string;
  verdict: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  pathHref?: string;
}> = {
  flag: {
    name: "The Flag",
    verdict: "The nation has been doing some of your believing for you.",
    body: "This is not an accusation from across the room — the man who built this site carried the same lens for years without feeling its weight. The Flag reads the gospel through the country: the church's wins are the party's wins, the church's enemies are the nation's enemies, and somewhere along the way defending one started to feel identical to defending the other. Nobody chose it on purpose. It was handed to us, dressed as loyalty. The pillar below exists to take it apart slowly — history first, verdict last.",
    ctaLabel: "Enter the pillar: The Capture by the Right",
    ctaHref: "/capture-by-the-right",
    pathHref: "/reading-paths/capture-by-the-right",
  },
  cause: {
    name: "The Cause",
    verdict: "The critique has been doing some of your believing for you.",
    body: "This lens is harder to catch because its vocabulary sounds like the Sermon on the Mount — justice, compassion, the wounded believed. Those words are Scripture's own. But somewhere the critique of the church quietly became the creed, the platform stopped being negotiable while the doctrines started, and the faith began apologizing for things Jesus never apologized for. The writer of this site has flinched the same way — softened a hard word because the room would have gone cold. The pillar below turns the same instrument the right receives the other way, with the same grief.",
    ctaLabel: "Enter the pillar: The Capture by the Left",
    ctaHref: "/capture-by-the-left",
    pathHref: "/reading-paths/capture-by-the-left",
  },
  highlighter: {
    name: "The Highlighter",
    verdict: "Your Bible has been edited — by your own hand, in your own favor.",
    body: "Verses as ammunition. A canon within the canon — the passages that win arguments bright yellow, the ones that would cost you something left unmarked. Everyone reads this way until someone shows them they are doing it; the man who built this site preached the edited version for years and was discipled by men who did the same. The pillar below is a course in reading again: context before conclusions, the whole arc before the favorite shelf, and the discipline of letting the text say what your side wishes it didn't.",
    ctaLabel: "Enter the pillar: Reading Scripture Past Our Politics",
    ctaHref: "/reading-scripture-past-our-politics",
    pathHref: "/reading-paths/reading-scripture-past-our-politics",
  },
  rearview: {
    name: "The Rearview",
    verdict: "Some of what you are defending is not the faith. It is the memory of its furniture.",
    body: "This lens grieves — and the grief is real, and nothing here mocks it. A world where the culture did half the church's work is gone, and it took the hymns, the assumptions, and the full pews with it. But Christendom and Christianity were never the same thing, and a faith spent guarding the arrangement cannot spend itself on the kingdom. The church has been small before, strange before, unofficial before — and those were not its worst centuries. The pillar below starts with the grief and refuses to stay there.",
    ctaLabel: "Enter the pillar: After Christendom",
    ctaHref: "/after-christendom",
    pathHref: "/reading-paths/the-church-after-christendom",
  },
  marketplace: {
    name: "The Marketplace",
    verdict: "Somewhere along the way, you became the customer — and the customer is always right.",
    body: "This is the lens the culture hands out free at the door: church as service provider, sermon as product, God as a very effective life coach. It is why 'fed' became the test of a congregation and 'fit' became the test of a faith. No one is sneered at here — the entire American religious economy was built to disciple us into this, and it worked on the man writing these words too. The way out is not a better product. It is formation — the slow, unglamorous practices that turn a consumer back into a disciple.",
    ctaLabel: "Enter the formation pillar: Living Well",
    ctaHref: "/living-well",
  },
};

const SESSION_KEY = "livewell-which-lens-session";

interface SessionState { answers: Record<number, "a" | "b">; step: number; savedAt: number }

function readSession(): SessionState {
  if (typeof window === "undefined") return { answers: {}, step: 0, savedAt: 0 };
  return readStoredJSON<SessionState>(
    SESSION_KEY,
    (v): v is SessionState =>
      !!v && typeof v === "object" &&
      typeof (v as SessionState).step === "number" &&
      typeof (v as SessionState).answers === "object",
    { answers: {}, step: 0, savedAt: 0 },
    window.sessionStorage,
  );
}

export default function WhichLens() {
  const [restored] = useState(readSession);
  const [answers, setAnswers] = useState<Record<number, "a" | "b">>(restored.answers);
  const [step, setStep] = useState(() => Math.min(restored.step, QUESTIONS.length));
  const [reviewing, setReviewing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    writeStoredJSON(SESSION_KEY, { answers, step, savedAt: Date.now() }, window.sessionStorage);
  }, [answers, step]);

  const done = Object.keys(answers).length === QUESTIONS.length;

  const result = useMemo(() => {
    if (!done) return null;
    const picked: Record<LensId, number> = { flag: 0, cause: 0, highlighter: 0, rearview: 0, marketplace: 0 };
    const available: Record<LensId, number> = { flag: 0, cause: 0, highlighter: 0, rearview: 0, marketplace: 0 };
    QUESTIONS.forEach((q, i) => {
      available[q.a.lens] += 1;
      available[q.b.lens] += 1;
      const choice = answers[i];
      if (choice) picked[q[choice].lens] += 1;
    });
    const scored = (Object.keys(picked) as LensId[])
      .map((lens) => ({ lens, score: available[lens] ? picked[lens] / available[lens] : 0 }))
      .sort((x, y) => y.score - x.score);
    return { top: scored[0], runnerUp: scored[1], close: scored[0].score - scored[1].score < 0.15 };
  }, [done, answers]);

  const restart = () => {
    if (typeof window !== "undefined") removeStoredJSON(SESSION_KEY, window.sessionStorage);
    setAnswers({});
    setStep(0);
    setReviewing(false);
  };

  const q = QUESTIONS[step];

  return (
    <Layout>
      <SEOMeta
        title="Which Lens Has You? — A Diagnostic"
        description="Thirteen honest choices. Five lenses that do your thinking before you do — the flag, the cause, the highlighter, the rearview, the marketplace. Named, then dismantled."
        url="https://www.livewellbyjamesbell.co/tools/which-lens"
      />

      {/* HEADER */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-3) var(--s-5)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "1.2rem" }}>A diagnostic</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2rem, 4.4vw, 2.9rem)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", color: "var(--bone)", marginBottom: "1rem" }}>
            Which lens has you?
          </h1>
          <p style={{ color: "var(--bone)", opacity: 0.75, fontSize: "1rem", lineHeight: 1.7, maxWidth: "58ch" }}>
            Everyone reads the faith through something. Thirteen choices — none of them comfortable, most of them unfair, all of them honest. Pick the answer that is truer of you, not the one you approve of. Your answers stay in this browser tab and are seen by no one.
          </p>
        </div>
      </section>

      {/* BODY */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-3)", minHeight: "40vh" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          {!done && q && !reviewing && (
            <div>
              <p aria-live="polite" style={{ fontFamily: "var(--U)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "1.4rem" }}>
                {step + 1} of {QUESTIONS.length}
              </p>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.4rem, 3vw, 1.85rem)", fontWeight: 400, lineHeight: 1.25, color: "var(--ink)", marginBottom: "2rem", maxWidth: "34ch" }}>
                {q.prompt}
              </h2>
              {(["a", "b"] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setAnswers((prev) => ({ ...prev, [step]: key }));
                    setStep((s) => Math.min(s + 1, QUESTIONS.length));
                  }}
                  style={{ display: "block", width: "100%", textAlign: "left", background: "#FFFFFF", border: "1px solid rgba(20,17,12,0.15)", padding: "1.2rem 1.4rem", marginBottom: "0.75rem", cursor: "pointer", fontFamily: "var(--F)", fontSize: "1.12rem", lineHeight: 1.5, color: "var(--ink)" }}
                >
                  {q[key].text}
                </button>
              ))}
              {step > 0 && (
                <button onClick={() => setStep((s) => Math.max(0, s - 1))} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--U)", fontSize: "0.8rem", color: "var(--ink-muted)", padding: "0.5rem 0", textDecoration: "underline" }}>
                  Back one question
                </button>
              )}
            </div>
          )}

          {(done || reviewing) && result && !reviewing && (
            <div>
              <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "1rem" }}>The lens</div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 400, lineHeight: 1.1, color: "var(--ink)", marginBottom: "0.9rem" }}>
                {LENSES[result.top.lens].name}
              </h2>
              <p style={{ fontFamily: "var(--F)", fontStyle: "italic", fontSize: "1.2rem", lineHeight: 1.45, color: "var(--ink)", marginBottom: "1.4rem", maxWidth: "44ch" }}>
                {LENSES[result.top.lens].verdict}
              </p>
              <p style={{ fontSize: "0.98rem", lineHeight: 1.75, color: "var(--ink-muted)", maxWidth: "62ch", marginBottom: "1.6rem" }}>
                {LENSES[result.top.lens].body}
              </p>
              {result.close && (
                <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", marginBottom: "1.6rem" }}>
                  A second lens runs close in you — <b style={{ color: "var(--ink)", fontWeight: 500 }}>{LENSES[result.runnerUp.lens].name}</b>. When you finish the first pillar, read {LENSES[result.runnerUp.lens].name === "The Marketplace" ? "the formation pillar" : "its pillar"} too; the two usually feed each other.
                </p>
              )}
              <div style={{ display: "flex", gap: "1.6rem", flexWrap: "wrap", alignItems: "center", marginBottom: "2.2rem" }}>
                <Link href={LENSES[result.top.lens].ctaHref} style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.25rem" }}>
                  {LENSES[result.top.lens].ctaLabel} <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle" }} />
                </Link>
                {LENSES[result.top.lens].pathHref && (
                  <Link href={LENSES[result.top.lens].pathHref!} style={{ fontFamily: "var(--U)", fontSize: "0.85rem", fontWeight: 500, color: "var(--ink-muted)", textDecoration: "none", borderBottom: "1px solid var(--ink-muted)", paddingBottom: "0.25rem" }}>
                    Or start its reading path, in order
                  </Link>
                )}
              </div>
              <div style={{ display: "flex", gap: "1.8rem", flexWrap: "wrap" }}>
                <button onClick={() => setReviewing(true)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--U)", fontSize: "0.8rem", color: "var(--ink-muted)", padding: 0, textDecoration: "underline" }}>
                  Change my answers
                </button>
                <button onClick={restart} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--U)", fontSize: "0.8rem", color: "var(--ink-muted)", padding: 0, textDecoration: "underline" }}>
                  Start over
                </button>
              </div>
            </div>
          )}

          {reviewing && (
            <div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "1.6rem", fontWeight: 400, color: "var(--ink)", marginBottom: "1.6rem" }}>
                Your answers
              </h2>
              {QUESTIONS.map((question, i) => (
                <div key={i} style={{ borderBottom: "1px solid rgba(20,17,12,0.1)", padding: "1.1rem 0" }}>
                  <p style={{ fontSize: "0.9rem", color: "var(--ink-muted)", margin: "0 0 0.6rem" }}>{question.prompt}</p>
                  {(["a", "b"] as const).map((key) => (
                    <button
                      key={key}
                      onClick={() => setAnswers((prev) => ({ ...prev, [i]: key }))}
                      aria-pressed={answers[i] === key}
                      style={{
                        display: "block", width: "100%", textAlign: "left", cursor: "pointer",
                        background: answers[i] === key ? "var(--charcoal)" : "#FFFFFF",
                        color: answers[i] === key ? "var(--bone)" : "var(--ink)",
                        border: "1px solid rgba(20,17,12,0.15)", padding: "0.6rem 0.9rem", marginBottom: "0.4rem",
                        fontFamily: "var(--F)", fontSize: "0.98rem", lineHeight: 1.45,
                      }}
                    >
                      {question[key].text}
                    </button>
                  ))}
                </div>
              ))}
              <button onClick={() => setReviewing(false)} style={{ marginTop: "1.6rem", background: "var(--charcoal)", color: "var(--bone)", border: "none", cursor: "pointer", fontFamily: "var(--U)", fontWeight: 500, fontSize: "0.875rem", padding: "0.85rem 1.6rem" }}>
                See my lens
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
