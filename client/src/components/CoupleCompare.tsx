/**
 * CoupleCompare: couple mode for the Marriage Health Self-Check.
 *
 * docs/grow/GROW-PROMPT.md 7.2: "Couple mode for marriage: each person
 * answers separately, then they see the gaps together, with a guided
 * conversation." No accounts and no server: each spouse takes the self-check
 * alone, on their own device, and gets a short code that holds only their
 * five area scores (never their answers). Entering the other's code shows the
 * two side by side, and every area where they see the marriage differently,
 * or where both are struggling, opens a short guided conversation.
 *
 * Safety first, because a comparison is dangerous in a marriage with fear in
 * it: the code is shown only after a plain gate, and the gate sends anyone who
 * is afraid of their spouse to the Domestic Violence Hotline instead.
 */
import { useState } from "react";
import { Link } from "wouter";
import { copyToClipboard } from "@/lib/clipboard";

export interface AreaScore {
  name: string;
  /** Raw score for the area (three items, one to five each: 3 to 15). */
  score: number;
}

const MIN = 3;
const MAX = 15;

/** "M1-" and one hexadecimal digit per area (3 to F). Holds scores only. */
export function encodeCode(areas: AreaScore[]): string {
  return "M1-" + areas.map((a) => Math.min(MAX, Math.max(MIN, Math.round(a.score))).toString(16).toUpperCase()).join("");
}

/** The partner's scores in area order, or null if the code is not one of ours. */
export function decodeCode(code: string, count: number): number[] | null {
  const m = code.trim().toUpperCase().replace(/\s+/g, "").match(/^M1-([0-9A-F]+)$/);
  if (!m || m[1].length !== count) return null;
  const scores = m[1].split("").map((ch) => parseInt(ch, 16));
  return scores.every((n) => n >= MIN && n <= MAX) ? scores : null;
}

/** A gap of three or more points, or both partners low, is worth talking about. */
export function needsTalk(mine: number, theirs: number): boolean {
  return Math.abs(mine - theirs) >= 3 || (mine <= 8 && theirs <= 8);
}

/** Three questions per area, asked of each other one at a time. */
const CONVERSATIONS: Record<string, string[]> = {
  Communication: [
    "When do you feel most heard by me, and when least?",
    "What have you stopped telling me because it didn't seem worth the argument?",
    "What would make it easier for you to tell me hard things sooner?",
  ],
  "Intimacy & Connection": [
    "When did you last feel close to me, and what were we doing?",
    "What small, ordinary thing makes you feel wanted?",
    "Is there something about our closeness that is hard to say out loud? You can name it now, or tell me when you'd like to talk about it.",
  ],
  "Trust & Security": [
    "Is there anything that makes it hard for you to trust me right now?",
    "What would keeping my word look like to you this week?",
    "Where do you need me to be more open with you?",
  ],
  "Shared Vision": [
    "Where do you hope we are in five years?",
    "What do you want our home to be known for?",
    "Is there a hope of yours you think I don't know about?",
  ],
  "Conflict Resolution": [
    "What is the argument we keep having, and what do you think it is really about?",
    "What do I do in an argument that makes it harder for you?",
    "How should either of us call a pause, and when do we come back to it?",
  ],
};

const box = { background: "var(--card)", border: "1px solid var(--border)", borderTop: "2px solid var(--mustard)", padding: "var(--s-3)", margin: "var(--s-4) 0" } as const;
const h = { fontFamily: "var(--F)", fontSize: "24px", fontWeight: 400, color: "var(--ink)", margin: "0 0 10px" } as const;
const p = { fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.65, color: "var(--ink)", margin: "0 0 12px" } as const;
const btn = { minHeight: "44px", padding: "10px 18px", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer", background: "var(--charcoal)", color: "var(--charcoal-fg)", fontFamily: "var(--U)", fontSize: "14.5px", fontWeight: 600 } as const;
const quiet = { ...btn, background: "transparent", color: "var(--ink)", border: "1px solid var(--border)" } as const;

export function CoupleCompare({ areas }: { areas: AreaScore[] }) {
  const [stage, setStage] = useState<"closed" | "gate" | "open">("closed");
  const [safe, setSafe] = useState(false);
  const [theirs, setTheirs] = useState("");
  const [result, setResult] = useState<number[] | null>(null);
  const [bad, setBad] = useState(false);
  const [copy, setCopy] = useState<"idle" | "copied" | "failed">("idle");
  const code = encodeCode(areas);

  const compare = () => {
    const scores = decodeCode(theirs, areas.length);
    setBad(!scores);
    setResult(scores);
  };

  return (
    <section aria-labelledby="couple-mode" style={box}>
      <h2 id="couple-mode" style={h}>Compare with your spouse</h2>
      {stage === "closed" && (
        <>
          <p style={p}>
            Couple mode: each of you takes this self-check alone, on your own device, then you compare your results and talk through the places you see your marriage differently. It works only if you are both safe with each other.
          </p>
          <button type="button" style={quiet} onClick={() => setStage("gate")}>Set up couple mode</button>
        </>
      )}

      {stage === "gate" && (
        <>
          <p style={p}>
            Before you compare: if you are afraid of your spouse, if they check your phone or control what you say or where you go, or if honest answers could be used against you, don't use this. Talk alone with the Domestic Violence Hotline first; the lines are on{" "}
            <Link href="/help/marriage" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>Find Help for a marriage in trouble</Link>.
          </p>
          <label style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.5, color: "var(--ink)", margin: "0 0 12px", cursor: "pointer" }}>
            <input type="checkbox" checked={safe} onChange={(e) => setSafe(e.target.checked)} style={{ marginTop: "4px", width: "18px", height: "18px" }} />
            <span>We are both safe with each other, and we both chose to do this.</span>
          </label>
          <button type="button" style={{ ...btn, opacity: safe ? 1 : 0.6 }} disabled={!safe} onClick={() => setStage("open")}>Continue</button>
        </>
      )}

      {stage === "open" && (
        <>
          <p style={p}>
            Your code is <strong style={{ fontFamily: "var(--mono)", letterSpacing: "0.08em" }}>{code}</strong>. It holds only your five area scores, never your answers. Give it to your spouse however you choose; anyone who has it can read those scores.
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
          </div>
          <label htmlFor="couple-code" style={{ display: "block", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink)", margin: "0 0 6px" }}>
            Your spouse's code
          </label>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <input
              id="couple-code"
              type="text"
              value={theirs}
              onChange={(e) => setTheirs(e.target.value)}
              placeholder="M1-..."
              autoComplete="off"
              style={{ fontFamily: "var(--mono)", fontSize: "16px", padding: "10px 12px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)", color: "var(--ink)", minWidth: "160px" }}
            />
            <button type="button" style={btn} onClick={compare}>Compare</button>
          </div>
          {bad && (
            <p role="alert" style={{ ...p, color: "var(--ink-muted)", marginTop: "8px" }}>
              That doesn't look like a code from this self-check. It starts with M1- and has five letters or numbers after it.
            </p>
          )}

          {result && (
            <div style={{ marginTop: "var(--s-3)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink)" }}>
                <caption style={{ textAlign: "left", fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", marginBottom: "6px" }}>
                  Each area is scored from 3 to 15.
                </caption>
                <thead>
                  <tr>
                    <th scope="col" style={{ textAlign: "left", padding: "6px 4px", borderBottom: "1px solid var(--border)" }}>Area</th>
                    <th scope="col" style={{ textAlign: "right", padding: "6px 4px", borderBottom: "1px solid var(--border)" }}>You</th>
                    <th scope="col" style={{ textAlign: "right", padding: "6px 4px", borderBottom: "1px solid var(--border)" }}>Your spouse</th>
                  </tr>
                </thead>
                <tbody>
                  {areas.map((a, i) => (
                    <tr key={a.name}>
                      <th scope="row" style={{ textAlign: "left", fontWeight: 500, padding: "6px 4px", borderBottom: "1px solid var(--border)" }}>{a.name}</th>
                      <td style={{ textAlign: "right", padding: "6px 4px", borderBottom: "1px solid var(--border)" }}>{a.score}</td>
                      <td style={{ textAlign: "right", padding: "6px 4px", borderBottom: "1px solid var(--border)" }}>{result[i]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {areas.some((a, i) => needsTalk(a.score, result[i])) ? (
                <>
                  <h3 style={{ fontFamily: "var(--F)", fontSize: "21px", fontWeight: 500, color: "var(--ink)", margin: "var(--s-3) 0 8px" }}>A conversation for the two of you</h3>
                  <p style={p}>
                    Pick a calm hour, not the end of an argument. Take one area at a time. One of you asks a question and listens without interrupting, then says back what they heard before answering it themselves. If it turns into a fight, stop and come back another day. If anything said makes either of you afraid, stop, and get help.
                  </p>
                  {areas.map((a, i) =>
                    needsTalk(a.score, result[i]) ? (
                      <div key={a.name} style={{ margin: "0 0 var(--s-3)" }}>
                        <p style={{ ...p, fontWeight: 600, margin: "0 0 4px" }}>
                          {a.name}: {Math.abs(a.score - result[i]) >= 3 ? "you see this differently" : "you are both finding this hard"}
                        </p>
                        <ul style={{ margin: 0, paddingLeft: "1.2em", fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.65, color: "var(--ink)" }}>
                          {(CONVERSATIONS[a.name] ?? []).map((q) => <li key={q}>{q}</li>)}
                        </ul>
                      </div>
                    ) : null,
                  )}
                </>
              ) : (
                <p style={{ ...p, marginTop: "var(--s-3)" }}>
                  You see your marriage much the same way, and neither of you marked an area as hard. Keep talking anyway:{" "}
                  <Link href="/how-tos/marriage-how-to-weekly-check-in" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>a weekly check-in</Link> is a good habit for a marriage that is holding.
                </p>
              )}
              <p style={{ ...p, color: "var(--ink-muted)", fontSize: "14px" }}>
                A comparison is a starting place for a conversation, not a verdict on either of you. For the harder places, a licensed marriage counselor helps, as long as you are both safe with each other.
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default CoupleCompare;
