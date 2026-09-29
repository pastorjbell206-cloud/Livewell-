import { Link } from "wouter";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SEOMeta } from "@/components/SEOMeta";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { readStoredJSON, removeStoredJSON, writeStoredJSON } from "@/lib/storage";
import { SHELF } from "@/lib/shelf";

/*
 * /start: the front door, asked as one question (two for the household).
 *
 * The options run in the audience order CLAUDE.md sets: the skeptic first,
 * then the believer with questions, then the household, then the reader who
 * wants to go deeper. There is no pastor option; pastoral material lives on
 * PCN now. Every destination below is a live route in App.tsx, every essay a
 * live static-library slug that has not been merged away, and every book a
 * title on the current shelf (lib/shelf.ts). start-quiz-titles.test.ts pins
 * all three, so a retitle, a merge or a retired book fails CI by name.
 */

type Stance = "skeptic" | "doubter" | "household" | "deeper";
type Weight = "marriage" | "parenting" | "grief";
type PathKey = Exclude<Stance, "household"> | Weight;

interface Choice<V extends string> {
  value: V;
  label: string;
  detail: string;
}

const STANCES: Choice<Stance>[] = [
  {
    value: "skeptic",
    label: "I don't believe, but I'm curious. Or I have objections.",
    detail: "You want the strongest case, stated honestly, by someone who has sat where you sit.",
  },
  {
    value: "doubter",
    label: "I believe, but I have questions the church didn't answer.",
    detail: "Doubt, deconstruction, or a hurt that came from inside the church itself.",
  },
  {
    value: "household",
    label: "Something at home is heavy.",
    detail: "A marriage, a child, a loss, a season that will not lift.",
  },
  {
    value: "deeper",
    label: "I want to understand the faith more deeply.",
    detail: "The gospel, the Bible read whole, the creeds and the long memory of the church.",
  },
];

const WEIGHTS: Choice<Weight>[] = [
  {
    value: "marriage",
    label: "Our marriage.",
    detail: "Distance, resentment, a spouse you no longer recognize, or something worse.",
  },
  {
    value: "parenting",
    label: "A child.",
    detail: "A teenager walking away from the faith, or the long work of raising them in it.",
  },
  {
    value: "grief",
    label: "A loss, or a darkness that will not lift.",
    detail: "Grief that has outlasted everyone's patience, or a heaviness you cannot name.",
  },
];

interface Destination {
  href: string;
  label: string;
  note: string;
}

export interface StartPath {
  title: string;
  lede: string;
  begin: Destination;
  /** Display copies of real essay titles; the test keeps them from drifting. */
  articles: { title: string; slug: string; note: string }[];
  more: Destination[];
  /** A slug on the current shelf (lib/shelf.ts), or none, with why it fits. */
  book?: string;
  bookNote?: string;
  /** Crisis-leaning paths keep a visible path to real help. */
  care?: boolean;
}

export const READING_PATHS: Record<PathKey, StartPath> = {
  skeptic: {
    title: "For the one who does not believe",
    lede:
      "This site is written toward you first, by a pastor who came to faith from atheism and still remembers how the church's answers sounded from the other side of the room. Nothing here asks you to agree. It asks you to weigh the case at its strongest and keep your objections while you do.",
    begin: {
      href: "/skeptic-track",
      label: "The Skeptic's Track",
      note: "Seven essays in argument order, from the questions that actually matter to what following would cost. Stop whenever you like.",
    },
    articles: [
      {
        title: "The Atheist in the Pulpit: What a Former Atheist Still Hears",
        slug: "the-atheist-in-the-pulpit",
        note: "The atheist's case at its strongest, and what moved one atheist slowly and against his will.",
      },
      {
        title: "Does God Exist? The Best Arguments For and Against",
        slug: "does-god-actually-exist",
        note: "The classical arguments, better than their critics say and weaker than their defenders hope.",
      },
      {
        title: "Did Jesus Really Rise from the Dead? Weighing the Evidence",
        slug: "did-the-resurrection-happen",
        note: "The one event Christianity stakes everything on, set against the strongest skeptical explanations.",
      },
    ],
    more: [
      {
        href: "/tools/test-the-case",
        label: "Test the case",
        note: "Walk the argument for the resurrection and raise the objection you actually hold at every step.",
      },
      {
        href: "/honest-questions",
        label: "Honest questions",
        note: "Ten hard questions about God, the Bible, suffering and the church, answered at length.",
      },
      {
        href: "/plans/skeptic",
        label: "Eight weeks of reading like an adult",
        note: "A guided plan, a week at a time, if you want a shape for the reading.",
      },
    ],
    book: "believe",
    bookNote:
      "Answers to the hardest questions skeptics ask about God, the Bible, the resurrection, suffering and hell, from a pastor who spent years on the other side of the argument.",
  },

  doubter: {
    title: "For the believer with questions",
    lede:
      "Doubt is not unbelief. It is usually a question asked from inside trust, and the church has lost many of its most honest people by treating the two as the same thing. Your questions deserve more than a quick answer. The church has sat in this dark before, and it left a record.",
    begin: {
      href: "/doubt",
      label: "Faith and doubt",
      note: "The essays for the questions that would not go away, gathered in one place.",
    },
    articles: [
      {
        title: "Can You Have Faith and Doubt at the Same Time?",
        slug: "can-you-have-faith-and-doubt",
        note: "Why doubt and unbelief are different things, and what the church lost by confusing them.",
      },
      {
        title: "What If Christianity Is Wrong? Living Honestly With the Question",
        slug: "what-if-we-are-wrong",
        note: "Asking whether it is wrong is not betrayal. The question cuts both ways.",
      },
      {
        title: "What Comes After Deconstruction of Your Faith?",
        slug: "excavation-not-demolition",
        note: "Demolition and excavation use the same tools. The difference is what you are digging for.",
      },
    ],
    more: [
      {
        href: "/deconstruction",
        label: "Deconstruction",
        note: "For the one already taking the inherited faith apart and wondering what is left standing.",
      },
      {
        href: "/church-hurt",
        label: "When the church hurt you",
        note: "Spiritual abuse, religious trauma, and the long road back, taken seriously.",
      },
      {
        href: "/plans/deconstruction",
        label: "Eight weeks of taking your questions seriously",
        note: "A guided plan, a week at a time, for company and a shape through the questions.",
      },
    ],
    book: "believe",
    bookNote:
      "The questions the church too often skipped, the Bible, suffering and hell among them, taken at full weight by a pastor who once asked them as an atheist.",
  },

  marriage: {
    title: "For a marriage under strain",
    lede:
      "Tips will not carry what you are carrying, and nothing here will pretend they can. A marriage is a covenant before it is a contract, and covenants get tested in exactly the room you are standing in. Begin with the essay that sounds most like your house, and read it slowly.",
    begin: {
      href: "/marriage",
      label: "Marriage",
      note: "Essays on covenant, conflict and repair, with a reading path through them.",
    },
    articles: [
      {
        title: "I Don't Recognize My Spouse Anymore. Is the Marriage Over?",
        slug: "when-you-married-someone-you-no-longer-recognize",
        note: "The stranger across the table is not proof the marriage failed.",
      },
      {
        title: "Resentment in Marriage and How to Stop Resenting Your Spouse",
        slug: "the-resentment-in-your-marriage",
        note: "How resentment starts as a true judgment and turns into a lie about the person who owes the debt.",
      },
      {
        title: "How to Forgive Your Spouse, and Why Forgiveness Isn't Trust",
        slug: "forgiveness-in-marriage",
        note: "Forgiveness, reconciliation and trust are three different things. Much misery comes from calling them one.",
      },
    ],
    more: [
      {
        href: "/marriage-crisis",
        label: "When the marriage is in crisis",
        note: "For when it is more than a hard season, including where to find counseling and safety.",
      },
      {
        href: "/plans/marriage",
        label: "Eight weeks toward each other",
        note: "A guided care plan, a week at a time.",
      },
      {
        href: "/tools/marriage-assessment",
        label: "Marriage assessment",
        note: "A private, honest look at where the two of you actually are.",
      },
    ],
    care: true,
  },

  parenting: {
    title: "For the weight of raising a child",
    lede:
      "No parent hands a child certainty. We hand on what we received and the way we carried it, trembling hands included. Whether it is a teenager who says they no longer believe or the long, ordinary work of forming a household, begin here.",
    begin: {
      href: "/parenting",
      label: "Parenting",
      note: "Essays on raising children in the faith, from a father of five sons.",
    },
    articles: [
      {
        title: "When Your Teenager Says They Don't Believe Anymore",
        slug: "teenager-losing-faith",
        note: "Your first instinct will be to win the argument. The argument is not what your teenager is testing.",
      },
      {
        title: "How to Answer Your Kids' Hard Questions About God and Doubt",
        slug: "raising-kids-who-think",
        note: "The faith that lasts belongs to the child who was allowed to ask.",
      },
      {
        title: "How to Raise Kids in the Christian Faith: Rhythms, Not Milestones",
        slug: "parenting-family-rhythms-that-form-faith",
        note: "A checklist measures a child. A rhythm forms a whole household.",
      },
    ],
    more: [
      {
        href: "/parenting-help",
        label: "When parenting is in crisis",
        note: "Where to turn when a child's struggle is past what any essay can carry.",
      },
      {
        href: "/family/catechism",
        label: "The family catechism",
        note: "Fifty-two questions of the historic faith, with answers for adults and children, learned together.",
      },
      {
        href: "/family/devotions",
        label: "Family devotions",
        note: "A year of devotions for the table: a passage, a question, an activity and a prayer.",
      },
    ],
    care: true,
  },

  grief: {
    title: "For a loss, or a season that will not lift",
    lede:
      "Grief that does not end on schedule is usually not a failure of faith. Scripture never asked the grieving to stop; it gave them words to pray while they could not. If what you carry is darker than grief, that is not a spiritual failing either, and it deserves real help alongside anything you read here.",
    begin: {
      href: "/grief",
      label: "Grief",
      note: "Writing for the months after, and where to find people who will sit with you in it.",
    },
    articles: [
      {
        title: "When Grief Doesn't Go Away: A Christian View of Lasting Grief",
        slug: "the-weight-that-stays",
        note: "The stages promised that grief would end. For many faithful people it has not, and that is not failure.",
      },
      {
        title: "Is It Okay to Be Angry at God? What the Psalms of Lament Teach",
        slug: "lament-the-prayer-the-church-forgot",
        note: "Scripture keeps a whole grammar of anger at God, and Jesus died praying it.",
      },
      {
        title: "Is Depression a Lack of Faith? Why 'Just Pray About It' Fails",
        slug: "mental-health-and-the-church-beyond-pray-about-it",
        note: "Depression is not proof of weak faith, and prayer was never meant to be set against medicine.",
      },
    ],
    more: [
      {
        href: "/plans/grief",
        label: "Eight weeks of walking with loss",
        note: "A guided care plan, a week at a time, for the months after.",
      },
      {
        href: "/plans/anxiety",
        label: "Eight weeks toward a quieter mind",
        note: "Small daily practices and prayer for the nights when fear will not lift.",
      },
      {
        href: "/help",
        label: "Find help",
        note: "Every care plan on the site, and where to find a real person.",
      },
    ],
    care: true,
  },

  deeper: {
    title: "For the one who wants to go deeper",
    lede:
      "Most of us were handed a small shelf of the faith and told it was the whole library. Christianity is older than our culture and wiser than our assumptions. Begin with the essays meant to be read first, then go to the Bible read whole, the creeds, and the long memory of the church.",
    begin: {
      href: "/canon",
      label: "The Twelve",
      note: "The essays to read first, in order: the gospel, the kingdom, the Bible read honestly, doubt, and the church after Christendom.",
    },
    articles: [
      {
        title: "What Is the Gospel? What the Good News Actually Means",
        slug: "what-the-gospel-actually-is",
        note: "Not advice about how to be good. News of what God has done.",
      },
      {
        title: "What Is the Kingdom of God? What Jesus Meant by It",
        slug: "what-is-the-kingdom-of-god-and-why-it-changes-everything",
        note: "Neither a place we go when we die nor a society we build, but God's own reign breaking in.",
      },
      {
        title: "How to Read the Bible in Context, and Let It Read You",
        slug: "how-to-read-the-bible-without-making-it-say-what-you-want",
        note: "Its worst misreadings came from readers sure they brought nothing to it.",
      },
    ],
    more: [
      {
        href: "/study/bible",
        label: "The Study Bible",
        note: "The whole story of Scripture, with the Hebrew and Greek underneath.",
      },
      {
        href: "/theology",
        label: "Theology",
        note: "Contested doctrines stated in their strongest voices and sorted by how much they matter.",
      },
      {
        href: "/theology/history",
        label: "Church history",
        note: "Two thousand years by era: the councils, the heresies refused, the people who carried the faith.",
      },
    ],
    book: "the-monster-in-the-mirror",
    bookNote:
      "Every generation reads the Bible with blind spots and is sure it is the one that finally sees clearly. This book asks what our grandchildren will say we missed.",
  },
};

/* Session mirror (roadmap HS-5). One-sitting entry flow: answers, step, and
 * the submitted flag survive an accidental refresh via sessionStorage, and
 * nothing outlives the tab. Answers from the retired three-question quiz fail
 * the shape guard and are dropped. */

const SESSION_KEY = "livewell-session-start-here-quiz";

interface Answers {
  stance?: Stance;
  weight?: Weight;
}

interface SavedSession {
  answers: Answers;
  step: number;
  submitted: boolean;
  savedAt: number;
}

const ALLOWED: Record<string, Set<string>> = {
  stance: new Set(STANCES.map((c) => c.value)),
  weight: new Set(WEIGHTS.map((c) => c.value)),
};

function isSavedSession(x: unknown): x is SavedSession {
  if (typeof x !== "object" || x === null) return false;
  const s = x as Record<string, unknown>;
  if (typeof s.step !== "number" || !Number.isFinite(s.step)) return false;
  if (typeof s.submitted !== "boolean") return false;
  if (typeof s.savedAt !== "number") return false;
  if (typeof s.answers !== "object" || s.answers === null || Array.isArray(s.answers)) return false;
  return Object.entries(s.answers as Record<string, unknown>).every(
    ([id, value]) => typeof value === "string" && ALLOWED[id]?.has(value) === true
  );
}

function readSession(): SavedSession {
  return readStoredJSON(
    SESSION_KEY,
    isSavedSession,
    { answers: {}, step: 0, submitted: false, savedAt: 0 },
    window.sessionStorage
  );
}

function pathKeyFor(answers: Answers): PathKey | null {
  if (!answers.stance) return null;
  if (answers.stance === "household") return answers.weight ?? null;
  return answers.stance;
}

/* Hover and focus live in one scoped sheet (inline styles cannot express
 * them). Tokens only; mustard appears as a 2px rule, never a fill. */
const SCOPED_CSS = `
.start-choice{transition:border-color var(--dur) var(--ease),box-shadow var(--dur) var(--ease)}
.start-choice:hover,.start-choice[aria-pressed="true"]{border-color:var(--ink);box-shadow:inset 2px 0 0 var(--mustard)}
.start-choice:hover .start-arrow,.start-choice[aria-pressed="true"] .start-arrow{color:var(--ink);transform:translateX(3px)}
.start-arrow{transition:transform var(--dur) var(--ease),color var(--dur) var(--ease)}
.start-link:hover .start-link-title{text-decoration:underline;text-decoration-color:var(--mustard);text-decoration-thickness:1px;text-underline-offset:4px}
.start-quiet:hover{color:var(--ink)}
.start-heading:focus,.start-heading:focus-visible{outline:none !important;box-shadow:none !important}
@media (prefers-reduced-motion: reduce){.start-choice,.start-arrow{transition:none}}
`;

const eyebrow: CSSProperties = {
  fontFamily: "var(--U)",
  fontSize: "0.75rem",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  color: "var(--mustard-text)",
  margin: 0,
};

const headline: CSSProperties = {
  fontFamily: "var(--F)",
  fontWeight: 400,
  fontSize: "clamp(2.25rem, 1.4rem + 3.6vw, 3.75rem)",
  lineHeight: 1.06,
  letterSpacing: "-0.02em",
  color: "var(--ink)",
  textWrap: "balance",
  maxWidth: "18ch",
  margin: "18px 0 20px",
};

const lede: CSSProperties = {
  fontFamily: "var(--B)",
  fontSize: "clamp(1rem, 0.95rem + 0.3vw, 1.125rem)",
  lineHeight: 1.7,
  color: "var(--ink-muted)",
  maxWidth: "60ch",
  margin: 0,
  textWrap: "pretty",
};

// Section titles are Cormorant H2s (index.css forces the display face on every
// heading), set small and quiet so the essays under them carry the weight.
const sectionLabel: CSSProperties = {
  fontFamily: "var(--F)",
  fontWeight: 400,
  fontSize: "clamp(1.5rem, 1.35rem + 0.6vw, 1.85rem)",
  lineHeight: 1.2,
  letterSpacing: "-0.01em",
  color: "var(--ink)",
  margin: "0 0 14px",
};

const quietButton: CSSProperties = {
  background: "transparent",
  border: "none",
  padding: "10px 0",
  minHeight: "44px",
  fontFamily: "var(--U)",
  fontSize: "0.9375rem",
  fontWeight: 500,
  color: "var(--ink-muted)",
  cursor: "pointer",
};

function ChoiceList<V extends string>({
  choices,
  selected,
  onPick,
  labelledBy,
}: {
  choices: Choice<V>[];
  selected?: V;
  onPick: (v: V) => void;
  labelledBy: string;
}) {
  return (
    <ul role="list" aria-labelledby={labelledBy} style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "12px" }}>
      {choices.map((c) => (
        <li key={c.value}>
          <button
            type="button"
            className="start-choice"
            aria-pressed={selected === c.value}
            onClick={() => onPick(c.value)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              width: "100%",
              textAlign: "left",
              background: "var(--card)",
              color: "var(--ink)",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius-sm)",
              padding: "clamp(18px, 3vw, 26px) clamp(18px, 3.4vw, 30px)",
              cursor: "pointer",
            }}
          >
            <span style={{ flex: 1, minWidth: 0 }}>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--F)",
                  fontWeight: 500,
                  fontSize: "clamp(1.3rem, 1.1rem + 0.8vw, 1.6rem)",
                  lineHeight: 1.2,
                  color: "var(--ink)",
                  textWrap: "balance",
                }}
              >
                {c.label}
              </span>
              <span
                style={{
                  display: "block",
                  marginTop: "6px",
                  fontFamily: "var(--B)",
                  fontSize: "0.9375rem",
                  lineHeight: 1.6,
                  color: "var(--ink-muted)",
                }}
              >
                {c.detail}
              </span>
            </span>
            <span aria-hidden="true" className="start-arrow" style={{ fontFamily: "var(--U)", fontSize: "1.1rem", color: "var(--ink-muted)" }}>
              →
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

/** The path to real help, for the crisis-leaning paths. Care before content. */
function CareNote() {
  return (
    <aside
      role="note"
      aria-label="Where to find help now"
      style={{
        background: "var(--bone-warm)",
        borderLeft: "2px solid var(--mustard)",
        borderRadius: "var(--radius-sm)",
        padding: "18px 22px",
      }}
    >
      <p style={{ fontFamily: "var(--B)", fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--ink-muted)", margin: 0 }}>
        If you are in danger or thinking about ending your life, please reach out now. In the US, call or text{" "}
        <a href="tel:988" style={{ color: "var(--ink)", fontWeight: 600 }}>988</a> for the Suicide and Crisis Lifeline.
        If someone at home is hurting or threatening you, call the National Domestic Violence Hotline at{" "}
        <a href="tel:18007997233" style={{ color: "var(--ink)", fontWeight: 600, whiteSpace: "nowrap" }}>1-800-799-7233</a>.
        Nothing on this site replaces a doctor, a counselor or a pastor who knows your name.{" "}
        <Link href="/help" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>
          More help
        </Link>
      </p>
    </aside>
  );
}

export default function StartHereQuiz() {
  // Restore a same-sitting session silently. The weight step only exists for
  // the household answer; a result only shows when the answers resolve a path.
  const [restored] = useState(readSession);
  const [answers, setAnswers] = useState<Answers>(restored.answers);
  const [step, setStep] = useState(() =>
    restored.step >= 1 && restored.answers.stance === "household" ? 1 : 0
  );
  const [submitted, setSubmitted] = useState(restored.submitted && pathKeyFor(restored.answers) !== null);

  // Mirror the state on every change. A pristine state writes nothing, which
  // keeps "Start over" genuinely clean; a failed write is fine, the flow simply
  // proceeds unpersisted.
  useEffect(() => {
    if (step === 0 && !submitted && Object.keys(answers).length === 0) return;
    writeStoredJSON(SESSION_KEY, { answers, step, submitted, savedAt: Date.now() }, window.sessionStorage);
  }, [answers, step, submitted]);

  // After the reader moves between views, carry keyboard and screen-reader
  // focus to the new heading. Never on first paint.
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const view = submitted ? "result" : step === 1 ? "weight" : "stance";
  useEffect(() => {
    if (!moved.current) return;
    // Each view starts at the top: the result page is long, and a shorter
    // view would otherwise open scrolled to the footer.
    try {
      window.scrollTo({ top: 0, behavior: "instant" });
    } catch {
      /* no layout (tests) */
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [view]);
  const go = (fn: () => void) => {
    moved.current = true;
    fn();
  };

  const pickStance = (stance: Stance) =>
    go(() => {
      if (stance === "household") {
        setAnswers((a) => ({ ...a, stance }));
        setStep(1);
      } else {
        setAnswers({ stance });
        setStep(0);
        setSubmitted(true);
      }
    });

  const pickWeight = (weight: Weight) =>
    go(() => {
      setAnswers({ stance: "household", weight });
      setSubmitted(true);
    });

  const key = pathKeyFor(answers);
  const path = submitted && key ? READING_PATHS[key] : null;
  const book = path?.book ? SHELF.find((b) => b.slug === path.book) : undefined;

  return (
    <div style={{ background: "var(--bone)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SEOMeta
        title="Start Here | LiveWell by James Bell"
        description="Where are you coming from? Whether you don't believe, believe with questions, carry something heavy at home, or want to go deeper, start with the writing built for you."
        keywords="where to start, skeptic, doubt, deconstruction, marriage, parenting, grief, Christian theology, LiveWell, James Bell"
        url="https://www.livewellbyjamesbell.co/start"
        type="webpage"
      />
      <style>{SCOPED_CSS}</style>

      <MinimalNav />

      {/* This page renders the nav directly rather than through Layout, so it
          declares its own main landmark; the skip link in MinimalNav targets it. */}
      <main id="main" style={{ flex: 1 }}>
        <section
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "clamp(48px, 9vw, 112px) 16px clamp(64px, 10vw, 128px)",
            boxSizing: "content-box",
          }}
        >
          {view === "stance" && (
            <>
              <p style={eyebrow}>Start here</p>
              <h1 id="start-q" ref={headingRef} tabIndex={-1} className="start-heading" style={headline}>
                Where are you coming from?
              </h1>
              <p style={{ ...lede, marginBottom: "clamp(32px, 5vw, 48px)" }}>
                Readers come here from very different rooms. Tell us which one is yours and we'll send you to
                the writing built for it. One question, or two if the weight is at home.
              </p>
              <ChoiceList choices={STANCES} selected={answers.stance} onPick={pickStance} labelledBy="start-q" />
              <p style={{ fontFamily: "var(--B)", fontSize: "0.875rem", lineHeight: 1.7, color: "var(--ink-muted)", margin: "28px 0 0" }}>
                In crisis right now? In the US, call or text{" "}
                <a href="tel:988" style={{ color: "var(--ink)", fontWeight: 600 }}>988</a>, or see{" "}
                <Link href="/help" style={{ color: "var(--ink)", fontWeight: 600 }}>where to find help</Link>.
              </p>
            </>
          )}

          {view === "weight" && (
            <>
              <p style={eyebrow}>Start here · At home</p>
              <h1 id="start-q" ref={headingRef} tabIndex={-1} className="start-heading" style={headline}>
                What is heaviest right now?
              </h1>
              <p style={{ ...lede, marginBottom: "clamp(32px, 5vw, 48px)" }}>
                Pick the one closest to the kitchen table. You can come back and choose another.
              </p>
              <ChoiceList choices={WEIGHTS} selected={answers.weight} onPick={pickWeight} labelledBy="start-q" />
              <div style={{ marginTop: "28px" }}>
                <CareNote />
              </div>
              <button type="button" className="start-quiet" onClick={() => go(() => setStep(0))} style={{ ...quietButton, marginTop: "20px" }}>
                ← Back
              </button>
            </>
          )}

          {view === "result" && path && (
            <>
              <p style={eyebrow}>Where to start</p>
              <h1 ref={headingRef} tabIndex={-1} className="start-heading" style={headline}>
                {path.title}
              </h1>
              <p style={lede}>{path.lede}</p>

              {path.care && (
                <div style={{ marginTop: "32px" }}>
                  <CareNote />
                </div>
              )}

              {/* BEGIN HERE: the one hub that holds this reader's writing. */}
              <Link
                href={path.begin.href}
                className="start-link start-choice"
                style={{
                  display: "block",
                  marginTop: "clamp(36px, 6vw, 56px)",
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius-sm)",
                  padding: "clamp(22px, 4vw, 32px)",
                  textDecoration: "none",
                  color: "var(--ink)",
                }}
              >
                <span style={{ ...eyebrow, display: "block", marginBottom: "10px" }}>Begin here</span>
                <span className="start-link-title" style={{ display: "block", fontFamily: "var(--F)", fontWeight: 500, fontSize: "clamp(1.6rem, 1.3rem + 1.2vw, 2.1rem)", lineHeight: 1.15 }}>
                  {path.begin.label} →
                </span>
                <span style={{ display: "block", marginTop: "8px", fontFamily: "var(--B)", fontSize: "0.9375rem", lineHeight: 1.65, color: "var(--ink-muted)", maxWidth: "58ch" }}>
                  {path.begin.note}
                </span>
              </Link>

              {/* THREE ESSAYS */}
              <div style={{ marginTop: "clamp(44px, 7vw, 64px)" }}>
                <h2 style={sectionLabel}>Three essays to read first</h2>
                <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {path.articles.map((a) => (
                    <li key={a.slug} style={{ borderTop: "1px solid var(--line)" }}>
                      <Link href={`/writing/${a.slug}`} className="start-link" style={{ display: "block", padding: "20px 0", textDecoration: "none", color: "var(--ink)" }}>
                        <span className="start-link-title" style={{ display: "block", fontFamily: "var(--F)", fontWeight: 500, fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)", lineHeight: 1.25, textWrap: "balance" }}>
                          {a.title}
                        </span>
                        <span style={{ display: "block", marginTop: "6px", fontFamily: "var(--B)", fontSize: "0.9375rem", lineHeight: 1.65, color: "var(--ink-muted)" }}>
                          {a.note}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>

              {/* WHEN YOU WANT MORE */}
              <div style={{ marginTop: "clamp(40px, 6vw, 56px)" }}>
                <h2 style={sectionLabel}>When you want more</h2>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {path.more.map((m) => (
                    <li key={m.href} style={{ borderTop: "1px solid var(--line)" }}>
                      <Link href={m.href} className="start-link" style={{ display: "block", padding: "16px 0", textDecoration: "none", color: "var(--ink)" }}>
                        <span className="start-link-title" style={{ fontFamily: "var(--U)", fontWeight: 500, fontSize: "1rem" }}>
                          {m.label}
                        </span>
                        <span style={{ display: "block", marginTop: "4px", fontFamily: "var(--B)", fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--ink-muted)" }}>
                          {m.note}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* THE BOOK: only a title on the current shelf. */}
              {book && (
                <div style={{ marginTop: "clamp(40px, 6vw, 56px)", paddingTop: "28px", borderTop: "1px solid var(--line)" }}>
                  <h2 style={sectionLabel}>Then a book</h2>
                  <Link href={book.href} className="start-link" style={{ display: "block", textDecoration: "none", color: "var(--ink)" }}>
                    <span className="start-link-title" style={{ display: "block", fontFamily: "var(--F)", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(1.35rem, 1.2rem + 0.6vw, 1.6rem)", lineHeight: 1.2 }}>
                      {book.title}
                    </span>
                    <span style={{ display: "block", marginTop: "8px", fontFamily: "var(--B)", fontSize: "0.9375rem", lineHeight: 1.65, color: "var(--ink-muted)", maxWidth: "60ch" }}>
                      {path.bookNote ?? book.kicker}
                    </span>
                    <span style={{ display: "inline-block", marginTop: "12px", fontFamily: "var(--U)", fontSize: "0.9375rem", fontWeight: 500, color: "var(--ink)", borderBottom: "2px solid var(--mustard)", paddingBottom: "2px" }}>
                      Read the opening free →
                    </span>
                  </Link>
                </div>
              )}

              {/* EMAIL CAPTURE */}
              <div style={{ marginTop: "clamp(48px, 8vw, 72px)" }}>
                <NewsletterSignup
                  variant="inline"
                  source="start-here-quiz"
                  title="Want new writing sent to you?"
                  description="The weekly letter, when new pieces land. Nothing else."
                />
              </div>

              {/* CHANGE ANSWERS / START OVER */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 28px", marginTop: "32px", borderTop: "1px solid var(--line)", paddingTop: "12px" }}>
                <button
                  type="button"
                  className="start-quiet"
                  onClick={() =>
                    go(() => {
                      // Non-destructive: back to the question with the answer intact.
                      setSubmitted(false);
                      setStep(answers.stance === "household" ? 1 : 0);
                    })
                  }
                  style={quietButton}
                >
                  ← Change my answers
                </button>
                <button
                  type="button"
                  className="start-quiet"
                  onClick={() =>
                    go(() => {
                      setAnswers({});
                      setStep(0);
                      setSubmitted(false);
                      removeStoredJSON(SESSION_KEY, window.sessionStorage);
                    })
                  }
                  style={quietButton}
                >
                  Start over
                </button>
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
