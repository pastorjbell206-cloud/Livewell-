/**
 * The Parent and Teen Conversation (/tools/parent-teen-conversation).
 *
 * docs/grow/GROW-PROMPT.md 7.2 and 7.3 ask for "a parent-and-teen
 * conversation mode for parenting: each person answers separately, then they
 * see the gaps together, with a guided conversation." A parent and a teenager
 * each answer the same twelve statements, worded for their side, on their own
 * device. Each gets a short code that holds only four area scores and which
 * side they answered from (never the answers). Entering the other's code shows
 * where the two of them see home differently, and opens a few questions to ask
 * each other there. It is a way into a conversation, not a test of anyone.
 *
 * Nothing is stored or sent anywhere. A teenager who is not safe at home is
 * told plainly where to go instead.
 */
import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { CrisisBlock } from "@/components/CrisisBlock";
import { copyToClipboard } from "@/lib/clipboard";

export type Side = "parent" | "teen";

interface Item {
  id: string;
  area: string;
  parent: string;
  teen: string;
}

export const AREAS = ["Talking", "Trust", "Rules and freedom", "Time together"] as const;

export const ITEMS: Item[] = [
  { id: "t1", area: "Talking", parent: "My teen tells me what's going on in their life.", teen: "I tell my parent what's going on in my life." },
  { id: "t2", area: "Talking", parent: "I listen without jumping into a lecture.", teen: "My parent listens without jumping into a lecture." },
  { id: "t3", area: "Talking", parent: "We can talk about hard things without it turning into a fight.", teen: "We can talk about hard things without it turning into a fight." },
  { id: "r1", area: "Trust", parent: "I trust my teen with the freedom they have now.", teen: "My parent trusts me with the freedom I have now." },
  { id: "r2", area: "Trust", parent: "My teen could bring me bad news and know I'd help.", teen: "I could bring my parent bad news and know they'd help." },
  { id: "r3", area: "Trust", parent: "I keep my word to my teen.", teen: "My parent keeps their word to me." },
  { id: "f1", area: "Rules and freedom", parent: "Our rules at home are clear.", teen: "The rules at home are clear to me." },
  { id: "f2", area: "Rules and freedom", parent: "Our rules feel fair to both of us.", teen: "The rules at home feel fair to me." },
  { id: "f3", area: "Rules and freedom", parent: "When a rule changes, I explain why.", teen: "When a rule changes, my parent explains why." },
  { id: "g1", area: "Time together", parent: "We spend time together that we both enjoy.", teen: "We spend time together that we both enjoy." },
  { id: "g2", area: "Time together", parent: "Phones and screens rarely get in the way of our time together.", teen: "Phones and screens rarely get in the way of our time together." },
  { id: "g3", area: "Time together", parent: "My teen knows I'm proud of them.", teen: "I know my parent is proud of me." },
];

const SCALE = [
  { value: 1, label: "Not true" },
  { value: 2, label: "A little true" },
  { value: 3, label: "Somewhat true" },
  { value: 4, label: "Mostly true" },
  { value: 5, label: "Very true" },
];

/** Three questions per area, for the two of you to ask each other. */
export const QUESTIONS: Record<string, string[]> = {
  Talking: [
    "What's one thing you wish I asked you about more often?",
    "When do you most want space, and when do you most want me around?",
    "What makes a conversation with me feel like a lecture?",
  ],
  Trust: [
    "What's one freedom you'd like, and what would help the other say yes?",
    "If something went wrong, what would make it easier to tell me?",
    "Is there a time I didn't keep my word that still bothers you?",
  ],
  "Rules and freedom": [
    "Which rule at home makes the most sense to you, and which makes the least?",
    "What should happen when one of us thinks a rule is unfair?",
    "Which rule should we look at again in six months?",
  ],
  "Time together": [
    "What's something we used to enjoy together that we could do again?",
    "When do phones get in the way for you, and when for me?",
    "How do you most like to be told you're appreciated?",
  ],
};

/** Area score: the three answers summed (3 to 15). */
export function areaScores(answers: Record<string, number>): number[] {
  return AREAS.map((a) => ITEMS.filter((i) => i.area === a).reduce((s, i) => s + (answers[i.id] || 0), 0));
}

/** "PT1-" + P or T + one hexadecimal digit per area. Holds scores and side only. */
export function encodePT(side: Side, scores: number[]): string {
  return `PT1-${side === "parent" ? "P" : "T"}${scores.map((n) => Math.min(15, Math.max(3, n)).toString(16).toUpperCase()).join("")}`;
}

export function decodePT(code: string): { side: Side; scores: number[] } | null {
  const m = code.trim().toUpperCase().replace(/\s+/g, "").match(/^PT1-([PT])([0-9A-F]{4})$/);
  if (!m) return null;
  const scores = m[2].split("").map((ch) => parseInt(ch, 16));
  if (!scores.every((n) => n >= 3 && n <= 15)) return null;
  return { side: m[1] === "P" ? "parent" : "teen", scores };
}

const wrap = { maxWidth: "var(--w-prose)", margin: "0 auto" } as const;
const p = { fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.65, color: "var(--ink)", margin: "0 0 12px" } as const;
const btn = { minHeight: "44px", padding: "10px 20px", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer", background: "var(--charcoal)", color: "var(--charcoal-fg)", fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600 } as const;
const quiet = { ...btn, background: "transparent", color: "var(--ink)", border: "1px solid var(--border)" } as const;

export default function ParentTeenConversation() {
  const [side, setSide] = useState<Side | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const [theirs, setTheirs] = useState("");
  const [other, setOther] = useState<{ side: Side; scores: number[] } | null>(null);
  const [bad, setBad] = useState("");
  const [copy, setCopy] = useState<"idle" | "copied" | "failed">("idle");

  const complete = ITEMS.every((i) => answers[i.id]);
  const mine = areaScores(answers);
  const code = side ? encodePT(side, mine) : "";
  const otherName = side === "parent" ? "your teen" : "your parent";

  const compare = () => {
    const d = decodePT(theirs);
    if (!d) { setBad("That doesn't look like a code from this page. It starts with PT1- and has five letters or numbers after it."); setOther(null); return; }
    if (d.side === side) { setBad(`That code was made by another ${side}. Ask ${otherName} for theirs.`); setOther(null); return; }
    setBad("");
    setOther(d);
  };
  const reset = () => { setSide(null); setAnswers({}); setDone(false); setTheirs(""); setOther(null); setBad(""); };

  return (
    <Layout>
      <SEOMeta
        title="The Parent and Teen Conversation: See Home From Both Sides"
        description="A parent and a teenager each answer twelve short statements on their own, compare, and get a guided conversation where they see home differently. Private to your device."
        url="https://www.livewellbyjamesbell.co/tools/parent-teen-conversation"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>
            <Link href="/help/parenting" style={{ color: "inherit" }}>Find help: parenting</Link> · A conversation tool
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5.2vw, 54px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "0 0 16px" }}>
            The Parent and Teen Conversation
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.7, margin: "0 0 12px", maxWidth: "60ch" }}>
            A parent and a teenager each answer twelve short statements about home, on their own and without looking at each other's. Then you swap codes and see where you see things the same and where you don't, with a few questions to ask each other in the places that matter. About five minutes each.
          </p>
          <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, margin: 0, maxWidth: "60ch", opacity: 0.85 }}>
            It isn't a test, and there are no right answers. Nothing is stored or sent anywhere.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
        <div style={wrap}>
          {!side && (
            <>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 32px)", fontWeight: 400, color: "var(--ink)", margin: "0 0 12px" }}>Who is answering?</h2>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", margin: "0 0 var(--s-3)" }}>
                <button type="button" style={btn} onClick={() => setSide("parent")}>I'm the parent</button>
                <button type="button" style={btn} onClick={() => setSide("teen")}>I'm the teen</button>
              </div>
              <p style={{ ...p, color: "var(--ink-muted)", fontSize: "15px" }}>
                If you're a teenager and you're not safe at home, you don't have to use this. Tell a trusted adult, like a teacher, a school counselor, or a relative, and if you're in danger right now, call 911.
              </p>
            </>
          )}

          {side && !done && (
            <form onSubmit={(e) => { e.preventDefault(); if (complete) setDone(true); }}>
              <p style={{ ...p, color: "var(--ink-muted)" }}>
                Answering as the {side}. For each statement, choose how true it is for you right now.{" "}
                <button type="button" onClick={reset} style={{ font: "inherit", color: "var(--mustard-text)", background: "none", border: 0, padding: 0, cursor: "pointer", textDecoration: "underline" }}>Switch</button>
              </p>
              {ITEMS.map((item, n) => (
                <fieldset key={item.id} style={{ border: 0, borderTop: "1px solid var(--border)", padding: "14px 0", margin: 0 }}>
                  <legend style={{ fontFamily: "var(--B)", fontSize: "16.5px", lineHeight: 1.5, color: "var(--ink)", padding: 0, marginBottom: "8px" }}>
                    {n + 1}. {item[side]}
                  </legend>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {SCALE.map((s) => (
                      <label key={s.value} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 10px", border: "1px solid var(--border)", borderRadius: "var(--radius-pill)", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink)", cursor: "pointer", background: answers[item.id] === s.value ? "var(--bone-warm)" : "transparent" }}>
                        <input
                          type="radio"
                          name={item.id}
                          value={s.value}
                          checked={answers[item.id] === s.value}
                          onChange={() => setAnswers({ ...answers, [item.id]: s.value })}
                        />
                        {s.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
              <button type="submit" style={{ ...btn, marginTop: "var(--s-3)", opacity: complete ? 1 : 0.6 }} disabled={!complete}>
                {complete ? "See my code" : `Answer all twelve (${Object.keys(answers).length} of 12)`}
              </button>
            </form>
          )}

          {side && done && (
            <>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 32px)", fontWeight: 400, color: "var(--ink)", margin: "0 0 12px" }}>Your code</h2>
              <p style={p}>
                Your code is <strong style={{ fontFamily: "var(--mono)", letterSpacing: "0.08em" }}>{code}</strong>. It holds only four area totals and that you answered as the {side}, not your answers. Swap codes with {otherName} once you've both finished.
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", margin: "0 0 var(--s-3)" }}>
                <button
                  type="button"
                  style={quiet}
                  onClick={async () => {
                    const ok = await copyToClipboard(code);
                    setCopy(ok ? "copied" : "failed");
                    setTimeout(() => setCopy("idle"), 2000);
                  }}
                >
                  {copy === "copied" ? "Copied" : copy === "failed" ? "Couldn't copy; write it down" : "Copy my code"}
                </button>
                <button type="button" style={quiet} onClick={() => setDone(false)}>Change my answers</button>
              </div>
              <label htmlFor="pt-code" style={{ display: "block", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink)", margin: "0 0 6px" }}>
                The code from {otherName}
              </label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <input
                  id="pt-code"
                  type="text"
                  value={theirs}
                  onChange={(e) => setTheirs(e.target.value)}
                  placeholder="PT1-..."
                  autoComplete="off"
                  style={{ fontFamily: "var(--mono)", fontSize: "16px", padding: "10px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)", color: "var(--ink)", minWidth: "170px" }}
                />
                <button type="button" style={btn} onClick={compare}>Compare</button>
              </div>
              {bad && <p role="alert" style={{ ...p, color: "var(--ink-muted)", marginTop: "8px" }}>{bad}</p>}

              {other && (
                <div style={{ marginTop: "var(--s-4)" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink)" }}>
                    <caption style={{ textAlign: "left", fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", marginBottom: "6px" }}>
                      Each area is a total from 3 to 15. Higher means it feels more true.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={{ textAlign: "left", padding: "6px 4px", borderBottom: "1px solid var(--border)" }}>Area</th>
                        <th scope="col" style={{ textAlign: "right", padding: "6px 4px", borderBottom: "1px solid var(--border)" }}>You</th>
                        <th scope="col" style={{ textAlign: "right", padding: "6px 4px", borderBottom: "1px solid var(--border)" }}>{side === "parent" ? "Your teen" : "Your parent"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {AREAS.map((a, i) => (
                        <tr key={a}>
                          <th scope="row" style={{ textAlign: "left", fontWeight: 500, padding: "6px 4px", borderBottom: "1px solid var(--border)" }}>{a}</th>
                          <td style={{ textAlign: "right", padding: "6px 4px", borderBottom: "1px solid var(--border)" }}>{mine[i]}</td>
                          <td style={{ textAlign: "right", padding: "6px 4px", borderBottom: "1px solid var(--border)" }}>{other.scores[i]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h3 style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, color: "var(--ink)", margin: "var(--s-4) 0 8px" }}>A conversation for the two of you</h3>
                  <p style={p}>
                    Pick an easy moment: a drive, a walk, a late snack, not the middle of an argument. Start where you see things most differently. One asks, the other answers, and the one who asked says back what they heard before giving their own answer. Parents, go first in owning one thing you'd like to do better. If anything said means someone isn't safe, stop and get help.
                  </p>
                  {AREAS.map((a, i) => ({ a, gap: Math.abs(mine[i] - other.scores[i]), i }))
                    .sort((x, y) => y.gap - x.gap)
                    .map(({ a, gap, i }) => (
                      <div key={a} style={{ margin: "0 0 var(--s-3)" }}>
                        <p style={{ ...p, fontWeight: 600, margin: "0 0 4px" }}>
                          {a}: {gap >= 3 ? "you see this differently" : mine[i] <= 8 && other.scores[i] <= 8 ? "you're both finding this hard" : "you see this much the same"}
                        </p>
                        {(gap >= 3 || (mine[i] <= 8 && other.scores[i] <= 8)) && (
                          <ul style={{ margin: 0, paddingLeft: "1.2em", fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.65, color: "var(--ink)" }}>
                            {QUESTIONS[a].map((q) => <li key={q}>{q}</li>)}
                          </ul>
                        )}
                      </div>
                    ))}
                  <p style={{ ...p, color: "var(--ink-muted)", fontSize: "14.5px" }}>
                    For more on the teenage years, read{" "}
                    <Link href="/help/parenting" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>Parenting is harder than anyone said</Link>, and for the rest of the family, the{" "}
                    <Link href="/tools/parenting-guide" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>Parenting Stage Guide</Link>.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <div style={{ background: "var(--bone)", padding: "0 var(--s-4) var(--s-5)" }}>
        <CrisisBlock variant="compact" />
      </div>
    </Layout>
  );
}
