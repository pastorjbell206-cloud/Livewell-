/**
 * /diagnostic: "Where are you with God right now?"
 *
 * A self-check for reflection (docs/grow/GROW-PROMPT.md 7.2), not a test or a
 * diagnosis. Eight questions, two in each of four areas (relational,
 * intellectual, vocational, devotional), each answered 1 to 4. The route and
 * component keep their old names; the reader-facing copy calls it a self-check.
 *
 * The results screen, in order: the safety question; an overall reading keyed
 * to the total; the lowest area as "Start here", with its reading, its next
 * steps, one essay, and one of James's books where one fits; the other three
 * areas with their own readings and steps; history; change, print, start over.
 *
 * Levels. Each area keeps the one threshold it has always had: 5 of 8 and up
 * reads as steady, anything lower as thin. Every area has its own reading and
 * its own steps at each level. The overall reading has three bands on the
 * total out of 32: 0.75 and up, 0.5 to 0.75, and below 0.5. The floor is 0.25,
 * because every answer scores at least 1, so no band sits below it.
 *
 * Every link points at a live page (scripts/lib/site-routes.mjs), and Scripture
 * is referenced and described, never quoted, so no verse text renders here.
 * No new colors; the existing tokens only.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SegmentedSignup } from "@/components/SegmentedSignup";
import { readStoredJSON, removeStoredJSON, writeStoredJSON } from "@/lib/storage";
import { SafetyCheck } from "@/components/SafetyCheck";
import { SelfCheckHistory } from "@/components/SelfCheckHistory";

type Dim = "relational" | "intellectual" | "vocational" | "devotional";

interface Question {
  id: string;
  dim: Dim;
  prompt: string;
  options: { label: string; score: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: "q1",
    dim: "relational",
    prompt: "How often does the way I treat the people closest to me match what I say I believe?",
    options: [
      { label: "Almost never", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Most of the time", score: 3 },
      { label: "Almost always", score: 4 },
    ],
  },
  {
    id: "q2",
    dim: "relational",
    prompt: "When I disagree with someone politically, can I still see them as made in God's image?",
    options: [
      { label: "Honestly, no", score: 1 },
      { label: "I try and fail", score: 2 },
      { label: "Most of the time", score: 3 },
      { label: "Yes", score: 4 },
    ],
  },
  {
    id: "q3",
    dim: "intellectual",
    prompt: "Do my doubts have a place to land, or do I hide them?",
    options: [
      { label: "I hide them", score: 1 },
      { label: "I share with one person", score: 2 },
      { label: "I have a small group", score: 3 },
      { label: "They are out in the open", score: 4 },
    ],
  },
  {
    id: "q4",
    dim: "intellectual",
    prompt: "When was the last time I read a serious theological book, not a devotional?",
    options: [
      { label: "Years", score: 1 },
      { label: "This year", score: 2 },
      { label: "This quarter", score: 3 },
      { label: "I'm reading one now", score: 4 },
    ],
  },
  {
    id: "q5",
    dim: "vocational",
    prompt: "Is the work I do every day shaped by what I claim to believe?",
    options: [
      { label: "It's compartmentalized", score: 1 },
      { label: "Sometimes connected", score: 2 },
      { label: "Often connected", score: 3 },
      { label: "Inseparable", score: 4 },
    ],
  },
  {
    id: "q6",
    dim: "vocational",
    prompt: "How often do I rest in a way that actually restores me?",
    options: [
      { label: "I don't", score: 1 },
      { label: "Rarely", score: 2 },
      { label: "Weekly", score: 3 },
      { label: "Sabbath is a discipline I keep", score: 4 },
    ],
  },
  {
    id: "q7",
    dim: "devotional",
    prompt: "When I pray, am I actually talking to someone, or rehearsing thoughts?",
    options: [
      { label: "I rarely pray", score: 1 },
      { label: "Mostly rehearsal", score: 2 },
      { label: "Sometimes real", score: 3 },
      { label: "Most days, real", score: 4 },
    ],
  },
  {
    id: "q8",
    dim: "devotional",
    prompt: "When did Scripture last surprise me?",
    options: [
      { label: "I can't remember", score: 1 },
      { label: "Long time ago", score: 2 },
      { label: "Recently", score: 3 },
      { label: "This week", score: 4 },
    ],
  },
];

/** Thin: below the threshold. Steady: at or above it. */
type Level = "thin" | "steady";

/** The threshold this self-check has always used: 5 of 8 and up reads as steady. */
const STEADY_AT = 0.625;

const LEVEL_NAME: Record<Level, string> = {
  thin: "Thin right now",
  steady: "Holding steady",
};

interface NextStep {
  href: string;
  label: string;
  note: string;
}

interface PageLink {
  href: string;
  title: string;
}

interface LevelReading {
  /** 80 to 150 words: what this usually means, what it does not, and what to do. */
  reading: string;
  /** Two or three live pages that fit this area at this level. */
  steps: NextStep[];
}

interface DimMeta {
  label: string;
  /** One essay for this area, shown when it is the place to start. */
  essay: PageLink;
  /** One of James's books, only where one genuinely fits this area. */
  book: PageLink | null;
  levels: Record<Level, LevelReading>;
}

interface DimResult {
  dim: Dim;
  label: string;
  score: number;
  max: number;
  level: Level;
  /** The reading for this area at this level. (The name is left over from the one-line version.) */
  diagnosis: string;
  steps: NextStep[];
  essay: PageLink;
  book: PageLink | null;
}

const DIM_META: Record<Dim, DimMeta> = {
  relational: {
    label: "Relational",
    essay: { href: "/writing/the-hardest-thing-jesus-asked", title: "What Did Jesus Mean by Love Your Enemies?" },
    book: { href: "/books/the-monster-in-the-mirror", title: "The Monster in the Mirror" },
    levels: {
      thin: {
        reading:
          "Your answers suggest a gap between what you believe and how you are treating people: the ones closest to you, the ones on the other side of a political line, or both. Seeing that gap is the honest first move, and it doesn't make you a fraud. The letter of James, written to believers, calls hearing the word without doing it a kind of self-deception, like looking in a mirror and walking away having forgotten your own face (James 1:22-24). Its remedy is to keep looking, and to act. The gap usually widens through exhaustion, old family patterns, a hurt that never healed, or a steady diet of outrage. Start small and specific: make one repair this week with someone close, in plain words and without excuses, and pray by name for one person you disagree with.",
        steps: [
          {
            href: "/wisdom/apologizing-well",
            label: "Apologizing Well",
            note: "For the repair: naming a wrong without softening it and owning it without excusing it.",
          },
          {
            href: "/how-tos/world-how-to-disagree-about-politics-with-people-you-love",
            label: "How to Disagree About Politics With People You Love",
            note: "For the gap that opens at the political line: keeping your convictions and keeping your people.",
          },
          {
            href: "/help/cant-forgive",
            label: "I can't forgive them",
            note: "If an old hurt is what keeps you cold toward someone close.",
          },
        ],
      },
      steady: {
        reading:
          "Your answers suggest that what you believe is reaching the way you treat people, at home and across the lines that divide a country. That usually means love has become a practice for you and not only a feeling, and the people near you feel the difference. It doesn't mean you have no blind spots. The people who live with you can see things you can't, and a self-check can't hear their side of it. Jesus told his followers to love their enemies and to pray for the people persecuting them, because that is how the Father treats the world, sending sun and rain on the evil and the good alike (Matthew 5:44-45). The next step is to widen the circle: ask someone close how you are really doing, and look for the neighbor, the stranger, or the opponent you've quietly left outside it.",
        steps: [
          {
            href: "/life/the-neighbor-and-the-stranger",
            label: "Who Is My Neighbor? What Jesus Actually Meant",
            note: "For widening the circle past the people who are easy to love.",
          },
          {
            href: "/how-tos/world-how-to-love-your-enemy",
            label: "How to Love Your Enemy",
            note: "For the one person you actually cannot stand.",
          },
          {
            href: "/studyguides/hospitality",
            label: "Hospitality: A Bible Study on the Open Door",
            note: "A five-session study for opening your table with a few others.",
          },
        ],
      },
    },
  },
  intellectual: {
    label: "Intellectual",
    essay: { href: "/writing/can-you-have-faith-and-doubt", title: "Can You Have Faith and Still Have Doubts?" },
    book: { href: "/books/believe", title: "Believe" },
    levels: {
      thin: {
        reading:
          "Your answers suggest your questions don't have a safe place to land right now, or your mind hasn't been given much to work with, or both. Doubts kept in the dark rarely go away; they tend to grow in private until they feel like verdicts. This doesn't mean you're losing your faith, and you don't need to become a scholar to keep it. The father in Mark 9 told Jesus he believed and asked for help with his unbelief in the same breath, and Jesus didn't send him away (Mark 9:24-27). People land here when questions felt unwelcome at church, when life left no room to read, or when nobody ever handed them a good book. Start by telling one person you trust one real question, and read one serious thing slowly.",
        steps: [
          {
            href: "/help/doubt",
            label: "I'm not sure I believe anymore",
            note: "The care page on doubt: what's happening, what Scripture says, and what to do this week.",
          },
          {
            href: "/help/suffering",
            label: "Why would God let this happen?",
            note: "If your questions began with something that happened to you, not something you read.",
          },
          {
            href: "/studyguides/doubt",
            label: "When Faith Has Questions",
            note: "A five-session study on doubt to work through with the person you told.",
          },
        ],
      },
      steady: {
        reading:
          "Your answers suggest your doubts have somewhere to go and your mind is being fed. That usually means your faith is thinking, and a faith that thinks can take a hard question without panic. It doesn't mean every question is settled, and it doesn't mean reading has made you wise. Paul warned the Corinthians that knowledge can inflate a person while love builds others up (1 Corinthians 8:1), and the risk at this level is a cleverness that has stopped listening. The next step is to let what you're learning serve other people: read the creeds and the long memory of the church alongside newer books, and become a safe place for someone else's questions.",
        steps: [
          {
            href: "/studyguides/the-creeds",
            label: "The Creeds: A Bible Study on What Christians Believe",
            note: "To root your thinking in the faith the church confessed long before any of us arrived.",
          },
          {
            href: "/studyguides/deep-roots",
            label: "Deep Roots: A Bible Study for Faith Beyond Slogans",
            note: "To take a small group deeper with you.",
          },
          {
            href: "/how-tos/dm-how-to-welcome-a-skeptic-to-your-table",
            label: "How to Welcome a Skeptic to Your Table",
            note: "For becoming a safe place for someone else's questions.",
          },
        ],
      },
    },
  },
  vocational: {
    label: "Vocational",
    essay: { href: "/writing/what-the-sabbath-is-and-why-you-need-it", title: "What the Sabbath Is and Why You Need It" },
    book: null,
    levels: {
      thin: {
        reading:
          "Your answers suggest that your work and your faith are living in separate rooms, or that you aren't resting in a way that restores you, or both. Usually that means you're tired in a way a weekend doesn't fix, and work has become either the whole of you or a part of you that faith never reaches. It doesn't mean you're lazy or faithless, and it doesn't mean you need to quit your job. People land here under real pressure: two jobs, small children, a parent who needs care, a workplace that never stops. Jesus said the Sabbath was made for the good of people, not the other way around (Mark 2:27), so rest is a gift before it is a rule. Start with one protected stretch of rest this week, and if the exhaustion has gone on for months, tell a doctor.",
        steps: [
          {
            href: "/how-tos/wm-how-to-rest-when-you-feel-you-cannot-stop",
            label: "How to Rest When You Feel You Cannot Stop",
            note: "For stopping when everything in you insists you can't afford to.",
          },
          {
            href: "/life/the-integrated-life",
            label: "How Do You Live Your Faith on Monday, Not Just Sunday?",
            note: "For the part of your week that faith hasn't reached yet.",
          },
          {
            href: "/help/empty",
            label: "I feel empty, and I don't know why",
            note: "If the tiredness has turned into numbness.",
          },
        ],
      },
      steady: {
        reading:
          "Your answers suggest your work is shaped by what you believe and you have a rhythm of rest that actually restores you. That usually means you've accepted your limits, which is harder than it sounds when so much of life measures worth by output, and your work has become a way to serve people rather than prove yourself. It doesn't mean the balance will hold on its own; a new job, a new baby, or a promotion can undo it within a season. In Deuteronomy the Sabbath command rests on memory: you were slaves in Egypt, and the Lord brought you out (Deuteronomy 5:15). Rest is what freed people are given. The next step is to guard that freedom for others: the people who work for you, the people who live with you, and the ones who can't stop.",
        steps: [
          {
            href: "/studyguides/sabbath",
            label: "Sabbath: A Bible Study on Rest and Hurry",
            note: "A five-session study, to keep the rhythm with others instead of alone.",
          },
          {
            href: "/plans/whole-life",
            label: "Eight Weeks Toward One Undivided Life",
            note: "Prayer, rest, friendship, work, and money gathered into a rule you can keep.",
          },
          {
            href: "/studyguides/work-and-vocation",
            label: "Work and Vocation: A Bible Study on Faith and Your Job",
            note: "For the people beside you whose faith has to survive Monday too.",
          },
        ],
      },
    },
  },
  devotional: {
    label: "Devotional",
    essay: { href: "/writing/praying-when-you-dont-feel-it", title: "Why Does Prayer Feel Dry, and What Do You Do?" },
    book: null,
    levels: {
      thin: {
        reading:
          "Your answers suggest prayer has thinned to rehearsal or stopped, and Scripture hasn't surprised you in a long time. That usually means the conversation with God has stalled, which happens sooner or later to people who pray for years and not weeks. It doesn't mean God has given up on you; dryness is not the same as distance. Psalm 88 is a prayer that ends in darkness with nothing resolved, and it's in the Bible anyway. People land here through busyness, grief, prayers that went unanswered, or habits that were never really their own. If the flatness has spread past prayer into your sleep, appetite, or joy, talk to a doctor. Then start small: one honest sentence to God each day, and one Gospel read slowly.",
        steps: [
          {
            href: "/help/prayer",
            label: "I don't know how to pray",
            note: "Where to start, what to say, and how to keep praying when heaven seems quiet.",
          },
          {
            href: "/plans/prayer",
            label: "Eight Weeks of Learning to Pray",
            note: "Five minutes a day, written for the believer whose prayer has gone quiet.",
          },
          {
            href: "/plans/reading-the-bible",
            label: "Eight Weeks With an Open Bible",
            note: "For coming back to Scripture: Mark first, then the one story, then the Psalms.",
          },
        ],
      },
      steady: {
        reading:
          "Your answers suggest that prayer is mostly real conversation for you and Scripture still surprises you. That usually means you've kept at it long enough for practice to become relationship, and you're reading to listen rather than to confirm what you already think. It doesn't mean every prayer will feel warm, or that the dry seasons are behind you; they come to steady people too. The two disciples on the road to Emmaus said afterward that their hearts had burned as Jesus explained the Scriptures to them (Luke 24:32), and the risk for a steady reader is familiarity, knowing a passage so well that it can no longer reach you. The next step is depth and company: read whole books of the Bible in their context, pray the Psalms, and teach someone else to pray.",
        steps: [
          {
            href: "/study/bible",
            label: "The Study Bible",
            note: "An introduction to every book and notes on every chapter, for reading whole books in context.",
          },
          {
            href: "/studyguides/the-psalms",
            label: "The Psalms: A Bible Study on Honest Prayer",
            note: "To pray the Psalms with others, the honest ones included.",
          },
          {
            href: "/how-tos/dm-how-to-pray-with-people-without-it-being-awkward",
            label: "How to Pray With People Without It Being Awkward",
            note: "For teaching someone else to pray.",
          },
        ],
      },
    },
  },
};

interface OverallBand {
  /** The lowest total / max that lands in this band. */
  min: number;
  name: string;
  /** 150 to 300 words in all: what it usually means, what it does not, why people land here, what to do first. */
  paragraphs: string[];
}

/** Highest first; the first band whose floor the reader reaches is theirs. */
const OVERALL_BANDS: OverallBand[] = [
  {
    min: 0.75,
    name: "Steady in most places",
    paragraphs: [
      "Most of your answers landed high. That usually means your life with God has real traction right now: you pray as if someone is listening, Scripture still has something to say to you, your work and rest have some shape, and the people around you are getting the benefit of what you believe.",
      "It doesn't mean you've arrived, and it doesn't mean you're further along than someone who answered lower. Eight questions can't see everything, and the people who live with you can see what a self-check can't. Seasons change, too. Paul warned the Corinthians that the person who feels most secure is the one who should watch his step (1 Corinthians 10:12), and the usual danger for a steady person is not collapse but coasting. People tend to land here when practices have been kept long enough to carry them through hard weeks, when someone in their life asks them honest questions, or when a hard season drove them toward God instead of away.",
      "The first thing to do is ask one person who knows you well whether these answers match what they see, and listen without defending yourself. Then look at the area marked Start here, since even a steady life has one place with more room. And think about who you could help: teaching someone else to pray or to read the Bible is one of the surest ways to keep doing it yourself.",
    ],
  },
  {
    min: 0.5,
    name: "Steady in some places, thin in others",
    paragraphs: [
      "Your answers landed in the middle: some areas are holding and at least one is thin. That's an ordinary place for an honest person to land, because real lives are uneven. Most of us have one part of our life with God that gets our attention and another that has been quietly left to itself.",
      "It doesn't mean you're half-hearted, and it doesn't mean you've stalled. It also doesn't mean the thin area can wait because the others look fine, since the parts we neglect rarely stay put: prayer left alone shows up sooner or later in how we treat people, and questions with nowhere to go eventually unsettle everything else. People land here for ordinary reasons: a new job or a new baby that ate the margins, a practice that fell away in a hard season and never came back, or a faith formed mostly in one part of life, the mind or the heart or the calendar, that never reached the others.",
      "Start with the area marked Start here below, since it's the lowest of your four, and take one step there before adding anything anywhere else. One change kept for a month will teach you more than four changes dropped in a week. Then come back in a few months and see what has moved.",
    ],
  },
  {
    min: 0,
    name: "Thin in most places right now",
    paragraphs: [
      "Most of your answers landed low. That usually means your life with God feels thin right now: prayer has gone quiet or stiff, Scripture hasn't said anything new in a long while, rest isn't restoring you, and the people closest to you aren't getting the best of what you believe. This describes a season, and seasons change.",
      "It doesn't mean God has left, that your faith was never real, or that you're further from him than someone who scored higher; a self-check can't measure that. Jesus' invitation was to the weary and burdened (Matthew 11:28), not to people who had already recovered. People usually land here for ordinary reasons that pile up: long exhaustion, a grief never said out loud, a church that hurt them, too much weight at work or at home. If you've also lost interest in things you used to enjoy, or your sleep, appetite, or energy have changed for weeks, dryness and depression can feel alike from the inside. This isn't medical advice, and only a doctor or a licensed counselor can help you tell them apart.",
      "So the first step is a person, before any practice. Tell a doctor or a licensed counselor what you've noticed, and tell a pastor or a friend who follows Jesus. You don't need the right words; saying that most of your answers here were low is enough to begin. If any of this has become thoughts of not wanting to be alive, go back to the question at the top of these results for people you can reach today. Then start with the area marked Start here, and take only its first step.",
    ],
  },
];

function overallBand(ratio: number): OverallBand {
  return OVERALL_BANDS.find(b => ratio >= b.min) ?? OVERALL_BANDS[OVERALL_BANDS.length - 1];
}

function scoreByDim(answers: Record<string, number>): DimResult[] {
  const dims: Dim[] = ["relational", "intellectual", "vocational", "devotional"];
  return dims.map(dim => {
    const qs = QUESTIONS.filter(q => q.dim === dim);
    const score = qs.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
    const max = qs.length * 4;
    const meta = DIM_META[dim];
    const level: Level = score / max >= STEADY_AT ? "steady" : "thin";
    return {
      dim,
      label: meta.label,
      score,
      max,
      level,
      diagnosis: meta.levels[level].reading,
      steps: meta.levels[level].steps,
      essay: meta.essay,
      book: meta.book,
    };
  });
}

/** Two or three next steps, each a live page with a line on why it is here. */
function NextSteps({ steps }: { steps: NextStep[] }) {
  return (
    <div style={{ marginTop: "16px" }}>
      <div
        style={{
          fontFamily: "var(--U)",
          fontSize: "12px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--ink-muted)",
          marginBottom: "8px",
        }}
      >
        Next steps
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
        {steps.map(s => (
          <li key={s.href}>
            <Link
              href={s.href}
              style={{
                fontFamily: "var(--U)",
                fontSize: "15px",
                fontWeight: 600,
                color: "var(--ink)",
                textDecoration: "none",
                borderBottom: "1px solid var(--mustard)",
                paddingBottom: "1px",
              }}
            >
              {s.label}
            </Link>
            <div
              style={{
                fontFamily: "var(--B)",
                fontSize: "15px",
                lineHeight: 1.6,
                color: "var(--ink-muted)",
                marginTop: "4px",
              }}
            >
              {s.note}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
 * Session mirror (roadmap HS-5). This is a one-sitting entry flow: answers
 * and step survive an accidental refresh via sessionStorage, and nothing
 * outlives the tab.
 */
const SESSION_KEY = "livewell-session-diagnostic";

interface SavedSession {
  answers: Record<string, number>;
  step: number;
  savedAt: number;
}

const QUESTION_IDS = new Set(QUESTIONS.map(q => q.id));

function isSavedSession(x: unknown): x is SavedSession {
  if (typeof x !== "object" || x === null) return false;
  const s = x as Record<string, unknown>;
  if (typeof s.step !== "number" || !Number.isFinite(s.step)) return false;
  if (typeof s.savedAt !== "number") return false;
  if (typeof s.answers !== "object" || s.answers === null || Array.isArray(s.answers)) return false;
  return Object.entries(s.answers as Record<string, unknown>).every(
    ([id, score]) => QUESTION_IDS.has(id) && typeof score === "number" && Number.isFinite(score)
  );
}

function readSession(): SavedSession {
  return readStoredJSON(
    SESSION_KEY,
    isSavedSession,
    { answers: {}, step: 0, savedAt: 0 },
    window.sessionStorage
  );
}

export default function Diagnostic() {
  // Restore a same-sitting session silently; step is clamped to both the
  // question range and the number of answers actually given.
  const [restored] = useState(readSession);
  const [step, setStep] = useState(() =>
    Math.min(
      Math.max(0, Math.trunc(restored.step)),
      Object.keys(restored.answers).length,
      QUESTIONS.length - 1
    )
  );
  const [answers, setAnswers] = useState<Record<string, number>>(restored.answers);
  // True while a finished reader walks back through the questions from results.
  const [reviewing, setReviewing] = useState(false);
  const isDone = Object.keys(answers).length === QUESTIONS.length;
  const showingResults = isDone && !reviewing;
  const results = showingResults ? scoreByDim(answers) : null;

  // Weakest dimension is the lead recommendation.
  const lead = results
    ? [...results].sort((a, b) => a.score / a.max - b.score / b.max)[0]
    : null;

  // The overall reading is keyed to the total across all eight answers.
  const total = results ? results.reduce((n, r) => n + r.score, 0) : 0;
  const totalMax = results ? results.reduce((n, r) => n + r.max, 0) : 0;
  const overall = results ? overallBand(total / totalMax) : null;

  // Mirror answers/step on every change. A pristine state writes nothing,
  // which keeps "Start over" genuinely clean; a failed write is fine — the
  // quiz simply proceeds unpersisted.
  useEffect(() => {
    if (step === 0 && Object.keys(answers).length === 0) return;
    writeStoredJSON(SESSION_KEY, { answers, step, savedAt: Date.now() }, window.sessionStorage);
  }, [answers, step]);

  const handleAnswer = (qid: string, score: number) => {
    const next = { ...answers, [qid]: score };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      if (reviewing || Object.keys(next).length < QUESTIONS.length) {
        setStep(step + 1);
      }
    } else if (reviewing) {
      // Last question revisited — hand the reader back to the results.
      setReviewing(false);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setReviewing(false);
    removeStoredJSON(SESSION_KEY, window.sessionStorage);
  };

  return (
    <Layout>
      <SEOMeta
        title="Where Are You With God Right Now? An Honest Self-Check"
        description="Eight questions in four areas, for reflection, not a test: how you treat people, handle doubt, work and rest, and pray. Your answers stay on your device."
        url="https://www.livewellbyjamesbell.co/diagnostic"
      />

      {/* HERO */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "var(--s-7) var(--s-4) var(--s-5)",
          color: "var(--charcoal-fg)",
        }}
      >
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "20px", color: "var(--mustard)" }}>
            A self-check
          </div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(36px, 5vw, 52px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
              maxWidth: "22ch",
            }}
          >
            Where are you with God right now?
          </h1>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "rgba(245,240,230,0.7)",
              maxWidth: "60ch",
            }}
          >
            This is a self-check for honest reflection, not a test or a diagnosis,
            and your answers stay on this device. Eight questions about how you
            love, think, work, rest, and pray take about three minutes. At the end
            you'll get a plain reading of your answers and a few specific places
            to go next.
          </p>
        </div>
      </section>

      {/* QUIZ OR RESULTS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          {!showingResults ? (
            <div>
              <div
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "12px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ink-muted)",
                  marginBottom: "12px",
                }}
              >
                Question {step + 1} of {QUESTIONS.length}
              </div>
              <h2
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "clamp(24px, 3.5vw, 32px)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  color: "var(--ink)",
                  lineHeight: 1.3,
                  marginBottom: "var(--s-4)",
                }}
              >
                {QUESTIONS[step].prompt}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {QUESTIONS[step].options.map(opt => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleAnswer(QUESTIONS[step].id, opt.score)}
                    style={{
                      padding: "14px 18px",
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderLeft: "2px solid var(--mustard)",
                      borderRadius: "var(--radius-sm)",
                      fontFamily: "var(--F)",
                      fontSize: "17px",
                      color: "var(--ink)",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "var(--bone-warm)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "var(--card)";
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep(Math.max(0, step - 1))}
                  style={{
                    marginTop: "var(--s-3)",
                    background: "transparent",
                    border: "none",
                    color: "var(--ink-muted)",
                    fontFamily: "var(--U)",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  ← Back
                </button>
              )}
            </div>
          ) : (
            <div>
              <SafetyCheck />
              <div className="eyebrow" style={{ marginBottom: "12px" }}>
                Results
              </div>
              <h2
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "clamp(28px, 4vw, 36px)",
                  fontWeight: 400,
                  letterSpacing: "-0.015em",
                  color: "var(--ink)",
                  marginBottom: "var(--s-4)",
                }}
              >
                What your answers suggest.
              </h2>

              {/* Overall reading, keyed to the total */}
              {overall && (
                <section aria-labelledby="overall-reading" style={{ marginBottom: "var(--s-4)" }}>
                  <div
                    style={{
                      fontFamily: "var(--U)",
                      fontSize: "12px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--ink-muted)",
                      marginBottom: "6px",
                    }}
                  >
                    Overall: {total} of {totalMax}
                  </div>
                  <h3
                    id="overall-reading"
                    style={{
                      fontFamily: "var(--F)",
                      fontSize: "clamp(22px, 3vw, 26px)",
                      fontWeight: 500,
                      lineHeight: 1.25,
                      color: "var(--ink)",
                      margin: "0 0 12px",
                    }}
                  >
                    {overall.name}
                  </h3>
                  {overall.paragraphs.map(p => (
                    <p
                      key={p.slice(0, 32)}
                      style={{
                        fontFamily: "var(--B)",
                        fontSize: "16px",
                        lineHeight: 1.7,
                        color: "var(--ink)",
                        margin: "0 0 14px",
                        maxWidth: "68ch",
                      }}
                    >
                      {p}
                    </p>
                  ))}
                </section>
              )}

              {lead && (
                <div
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderLeft: "2px solid var(--mustard)",
                    padding: "var(--s-4)",
                    borderRadius: "var(--radius-sm)",
                    marginBottom: "var(--s-4)",
                  }}
                >
                  <div className="eyebrow" style={{ marginBottom: "8px" }}>
                    Start here: {lead.label}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--F)",
                      fontSize: "22px",
                      fontWeight: 500,
                      lineHeight: 1.25,
                      color: "var(--ink)",
                      margin: "0 0 10px",
                    }}
                  >
                    {LEVEL_NAME[lead.level]}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--B)",
                      fontSize: "16px",
                      lineHeight: 1.7,
                      color: "var(--ink)",
                      margin: 0,
                      maxWidth: "68ch",
                    }}
                  >
                    {lead.diagnosis}
                  </p>
                  <NextSteps steps={lead.steps} />
                  <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "20px" }}>
                    <Link
                      href={lead.essay.href}
                      style={{
                        fontFamily: "var(--U)",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--ink)",
                        textDecoration: "none",
                        borderBottom: "1px solid var(--mustard)",
                        paddingBottom: "2px",
                      }}
                    >
                      Read the essay: {lead.essay.title} →
                    </Link>
                    {lead.book && (
                      <Link
                        href={lead.book.href}
                        style={{
                          fontFamily: "var(--U)",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "var(--ink-muted)",
                          textDecoration: "none",
                          borderBottom: "1px solid var(--border)",
                          paddingBottom: "2px",
                        }}
                      >
                        Read the book: {lead.book.title}
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Per-dimension breakdown */}
              <div style={{ marginBottom: "var(--s-5)" }}>
                <div className="eyebrow" style={{ marginBottom: "8px" }}>
                  All four areas
                </div>
                {results?.map(r => (
                  <div
                    key={r.dim}
                    style={{
                      padding: "var(--s-3) 0",
                      borderTop: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "6px",
                        fontFamily: "var(--U)",
                        fontSize: "12px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--ink-muted)",
                      }}
                    >
                      <span>{r.label}</span>
                      <span>
                        {r.score} / {r.max}
                      </span>
                    </div>
                    <div
                      style={{
                        height: "4px",
                        background: "var(--border)",
                        borderRadius: "2px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          background: "var(--mustard)",
                          width: `${(r.score / r.max) * 100}%`,
                        }}
                      />
                    </div>
                    {r.dim === lead?.dim ? (
                      <p
                        style={{
                          fontFamily: "var(--B)",
                          fontSize: "15px",
                          lineHeight: 1.6,
                          color: "var(--ink-muted)",
                          margin: "12px 0 0",
                        }}
                      >
                        {LEVEL_NAME[r.level]}. Its reading and next steps are above, under Start here.
                      </p>
                    ) : (
                      <>
                        <h3
                          style={{
                            fontFamily: "var(--F)",
                            fontSize: "20px",
                            fontWeight: 500,
                            lineHeight: 1.25,
                            color: "var(--ink)",
                            margin: "14px 0 8px",
                          }}
                        >
                          {LEVEL_NAME[r.level]}
                        </h3>
                        <p
                          style={{
                            fontFamily: "var(--B)",
                            fontSize: "16px",
                            lineHeight: 1.7,
                            color: "var(--ink)",
                            margin: 0,
                            maxWidth: "68ch",
                          }}
                        >
                          {r.diagnosis}
                        </p>
                        <NextSteps steps={r.steps} />
                      </>
                    )}
                  </div>
                ))}
              </div>

              {results && (
                <SelfCheckHistory
                  id="diagnostic"
                  total={results.reduce((n, r) => n + r.score, 0) / results.reduce((n, r) => n + r.max, 0)}
                  areas={Object.fromEntries(results.map((r) => [r.label, r.score / r.max]))}
                  answersKey={JSON.stringify(answers)}
                />
              )}

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "var(--s-5)" }}>
                <button
                  type="button"
                  onClick={() => {
                    setReviewing(true);
                    setStep(0);
                  }}
                  style={{
                    background: "transparent",
                    border: "1px solid var(--border)",
                    padding: "10px 18px",
                    fontFamily: "var(--U)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--ink)",
                    borderRadius: "var(--radius-sm)",
                    cursor: "pointer",
                  }}
                >
                  Change my answers
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  style={{
                    background: "transparent",
                    border: "1px solid var(--border)",
                    padding: "10px 18px",
                    fontFamily: "var(--U)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--ink)",
                    borderRadius: "var(--radius-sm)",
                    cursor: "pointer",
                  }}
                >
                  Print your results
                </button>
                <button
                  type="button"
                  onClick={reset}
                  style={{
                    background: "transparent",
                    border: "1px solid var(--border)",
                    padding: "10px 18px",
                    fontFamily: "var(--U)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--ink-muted)",
                    borderRadius: "var(--radius-sm)",
                    cursor: "pointer",
                  }}
                >
                  Start over
                </button>
              </div>

              {/* Newsletter signup: the real thing is James's Substack, and no answers go with it */}
              <SegmentedSignup
                title="Want the essays by email?"
                description="James writes a newsletter on Substack. Leave your email and choose who you are, and the sign-up finishes there. Your answers above are not sent."
              />
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
