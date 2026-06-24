/**
 * The Discipleship Pathway (/discipleship). Four stages from new believer to
 * disciple-maker, each a list of concrete steps drawn from the rest of the
 * site. Progress is a checkbox per step, persisted to localStorage under
 * "lw-discipleship-v1". No account. No server. The page remembers where you
 * stopped, and that is all it does.
 */
import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

type StepType = "Read" | "Study" | "Do" | "Tool";

interface Step {
  id: string;
  title: string;
  desc: string;
  href: string | null;
  type: StepType;
}

interface Stage {
  id: string;
  label: string;
  name: string;
  intro: string;
  steps: Step[];
}

const STORAGE_KEY = "lw-discipleship-v1";

const STAGES: Stage[] = [
  {
    id: "begin",
    label: "Stage 1 · New Believer",
    name: "Begin",
    intro:
      "You believed. Now what. Nobody hands you a map at the moment of conversion, so here is the first stretch of road: the Word, prayer, and a people. Do these in any order. Do them slowly.",
    steps: [
      {
        id: "begin-quiz",
        title: "Take the Find Your Path quiz",
        desc: "Three minutes of honest questions that point you to the part of this site written for where you actually are.",
        href: "/start",
        type: "Tool",
      },
      {
        id: "begin-mark",
        title: "Read the Gospel of Mark",
        desc: "Sixteen chapters, one sitting if you can manage it. Mark is the shortest account of Jesus and the fastest. The sermon series library walks through whole books like this one.",
        href: "/leadership/sermon-series",
        type: "Read",
      },
      {
        id: "begin-study",
        title: "Learn how to study the Bible",
        desc: "Not how to feel about it. How to read it: observation, context, meaning, and only then application.",
        href: "/leadership/article/how-to-study-the-bible",
        type: "Study",
      },
      {
        id: "begin-pray",
        title: "Pray your first prayers",
        desc: "Prayer is not a performance and there is no wrong vocabulary. If you need a place to start, start here.",
        href: "/tools/prayer-generator",
        type: "Tool",
      },
      {
        id: "begin-church",
        title: "Find a church and go",
        desc: "Not a podcast. A room with people in it, some of whom you would not have chosen. Visit until one of them becomes yours, then stay.",
        href: null,
        type: "Do",
      },
      {
        id: "begin-membership",
        title: "Read why church membership matters",
        desc: "Belonging to a church is not a subscription you hold lightly. It is a set of people who will know when you are missing.",
        href: "/leadership/article/why-church-membership-matters",
        type: "Read",
      },
      {
        id: "begin-memorize",
        title: "Memorize a first verse",
        desc: "Carry one sentence of Scripture in your head until it is yours. The memory tool will hold you to it.",
        href: "/tools/scripture-memory",
        type: "Tool",
      },
    ],
  },
  {
    id: "root",
    label: "Stage 2 · Growing",
    name: "Take root",
    intro:
      "The first season runs on feeling. The second runs on habit. This is where faith stops being an event that happened to you and starts being the shape of your ordinary week.",
    steps: [
      {
        id: "root-time",
        title: "Set a daily reading time",
        desc: "Pick an hour and a chair. The habit matters more than the length. Ten minutes you keep beats an hour you intend.",
        href: null,
        type: "Do",
      },
      {
        id: "root-path",
        title: "Choose a reading path",
        desc: "A curated sequence through the writing here, built so that one essay leads to the next on purpose.",
        href: "/reading-paths",
        type: "Read",
      },
      {
        id: "root-context",
        title: "Learn what you bring to the text",
        desc: "Every reader carries a culture into Scripture, including you. The first step toward reading well is admitting you have an accent.",
        href: "/resources/context/misreading-with-western-eyes",
        type: "Study",
      },
      {
        id: "root-storyline",
        title: "Trace the storyline of Scripture",
        desc: "Sixty-six books, one plot. Biblical theology shows you how creation, covenant, exile, and Christ hold together.",
        href: "/theology/biblical",
        type: "Study",
      },
      {
        id: "root-genres",
        title: "Learn the genres of the Bible",
        desc: "Law is not poetry and a parable is not a newspaper. Knowing what kind of text you are holding changes what you ask of it.",
        href: "/leadership/article/bible-genres",
        type: "Study",
      },
      {
        id: "root-prayerlist",
        title: "Keep a written prayer list",
        desc: "Names, needs, dates. Write the requests down and pray them daily, so that you notice when God answers and when you stopped asking.",
        href: null,
        type: "Do",
      },
      {
        id: "root-giving",
        title: "Order your money toward giving",
        desc: "Giving is not a tip for services rendered. It is the discipline that loosens the grip money has on you. Take stock of where yours actually goes.",
        href: "/tools/financial-health",
        type: "Tool",
      },
      {
        id: "root-serve",
        title: "Take a serving role in your church",
        desc: "Nursery, parking lot, sound board, meals. Pick something unglamorous and do it for a year before you evaluate it.",
        href: null,
        type: "Do",
      },
    ],
  },
  {
    id: "deep",
    label: "Stage 3 · Maturing",
    name: "Go deep",
    intro:
      "Doctrine, hard questions, money, marriage, children. The faith either reaches the parts of your life you have fenced off, or it stops being faith and becomes a hobby.",
    steps: [
      {
        id: "deep-doctrine",
        title: "Work through the doctrine library",
        desc: "What the church has actually taught about God, Christ, sin, and salvation, with the disagreements left visible instead of smoothed over.",
        href: "/theology",
        type: "Study",
      },
      {
        id: "deep-lenses",
        title: "Read past your politics",
        desc: "Each tribe has a canon within the canon. The verses you underline and the verses you explain away tell the truth about who is holding the pen.",
        href: "/resources/context/left-lens-right-lens",
        type: "Read",
      },
      {
        id: "deep-american",
        title: "Read the Bible as a foreign book",
        desc: "Three languages, a dozen empires, and not one author who ever saw a ballot. The text resists every flag we drape over it, including ours.",
        href: "/resources/context/the-bible-is-not-an-american-book",
        type: "Read",
      },
      {
        id: "deep-questions",
        title: "Face the hard questions",
        desc: "Suffering, hell, the violence in the Old Testament, the silence of God. The questions the church avoids, taken seriously instead of managed.",
        href: "/theology/questions",
        type: "Study",
      },
      {
        id: "deep-money",
        title: "Sit with the money texts",
        desc: "Scripture speaks about wealth and the poor more often than our preaching has ever matched. Read what we have learned not to see.",
        href: "/resources/context/money-texts-we-explain-away",
        type: "Read",
      },
      {
        id: "deep-marriage",
        title: "Treat your marriage as discipleship",
        desc: "Covenant is a school of formation, not an arrangement of convenience. If you are married, this is where most of your sanctification happens.",
        href: "/marriage",
        type: "Read",
      },
      {
        id: "deep-parenting",
        title: "Treat your parenting as discipleship",
        desc: "Your children are the first people you will ever disciple, whether you mean to or not. They are learning your actual theology, not your stated one.",
        href: "/parenting",
        type: "Read",
      },
      {
        id: "deep-audit",
        title: "Audit your whole life",
        desc: "Time, money, attention, rest. A guided inventory of where your life actually goes, set against where you say it goes.",
        href: "/tools/life-audit",
        type: "Tool",
      },
    ],
  },
  {
    id: "pass",
    label: "Stage 4 · Equipped",
    name: "Pass it on",
    intro:
      "You were discipled so that you would disciple. The pathway does not end with you. It ends, if it ever ends, when you hand it to someone else and they keep walking.",
    steps: [
      {
        id: "pass-real",
        title: "Learn what real discipleship looks like",
        desc: "Not a program. A person walking with a person, over years, with the Bible open between them.",
        href: "/leadership/article/what-real-discipleship-looks-like",
        type: "Read",
      },
      {
        id: "pass-one",
        title: "Begin discipling one person",
        desc: "One name. One standing time each week or two. You do not need a curriculum to start. You need a table and a willingness to be known.",
        href: "/leadership/article/discipling-men",
        type: "Do",
      },
      {
        id: "pass-group",
        title: "Lead a small group study",
        desc: "Gather a few people around a book of the Bible and work through it together. Here is how to make the group actually work.",
        href: "/leadership/article/making-small-groups-work",
        type: "Do",
      },
      {
        id: "pass-teach",
        title: "Learn to teach the text",
        desc: "The leadership library holds the whole shelf on handling Scripture in front of other people: preparation, interpretation, delivery.",
        href: "/leadership/library",
        type: "Study",
      },
      {
        id: "pass-hospitality",
        title: "Open your table to strangers",
        desc: "In the biblical world, hospitality was a survival institution, not a dinner party. Recover the older, costlier meaning of the word.",
        href: "/resources/context/hospitality-and-the-stranger",
        type: "Do",
      },
      {
        id: "pass-family",
        title: "Lead devotions in your home",
        desc: "Short, honest, regular. A family that reads and prays together for ten minutes is doing more formation than most programs manage in a year.",
        href: "/family/devotions",
        type: "Do",
      },
      {
        id: "pass-pastors",
        title: "Carry the people who lead you",
        desc: "Pastors are the most under-shepherded people in the church. Learn what they carry, then pray for yours by name.",
        href: "/pastors",
        type: "Read",
      },
    ],
  },
];

const ALL_STEPS: Step[] = STAGES.flatMap((s) => s.steps);

function loadProgress(): Record<string, boolean> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, boolean>;
    }
    return {};
  } catch {
    return {};
  }
}

function saveProgress(progress: Record<string, boolean>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // localStorage unavailable; the page still works, it just forgets.
  }
}

const wrap = { maxWidth: "var(--w-content)", margin: "0 auto" } as const;

const srOnly = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
} as const;

function ProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={done}
      aria-label={`${done} of ${total} steps complete`}
      style={{ height: "4px", background: "rgba(20,17,12,0.12)", borderRadius: "999px", overflow: "hidden" }}
    >
      <div style={{ height: "100%", width: `${pct}%`, background: "var(--mustard)", transition: "width 0.3s ease" }} />
    </div>
  );
}

function TypeChip({ type }: { type: StepType }) {
  return (
    <span
      style={{
        fontFamily: "var(--U)",
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--ink-muted)",
        border: "1px solid var(--border)",
        borderRadius: "999px",
        padding: "2px 8px",
        flexShrink: 0,
      }}
    >
      {type}
    </span>
  );
}

function StepRow({ step, checked, onToggle }: { step: Step; checked: boolean; onToggle: () => void }) {
  const inputId = `pathway-${step.id}`;
  const titleStyle = {
    fontFamily: "var(--F)",
    fontSize: "19px",
    fontWeight: 500,
    lineHeight: 1.25,
    color: checked ? "var(--ink-muted)" : "var(--ink)",
    textDecoration: checked ? "line-through" : "none",
  } as const;

  return (
    <li style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "16px 0", borderBottom: "1px solid var(--border)", listStyle: "none" }}>
      <input
        type="checkbox"
        id={inputId}
        checked={checked}
        onChange={onToggle}
        style={{ width: "18px", height: "18px", marginTop: "3px", flexShrink: 0, accentColor: "var(--mustard)", cursor: "pointer" }}
      />
      <label htmlFor={inputId} style={srOnly}>
        Mark step complete: {step.title}
      </label>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "baseline", flexWrap: "wrap", marginBottom: "4px" }}>
          <TypeChip type={step.type} />
          {step.href ? (
            <Link href={step.href} style={{ ...titleStyle, textDecoration: "none", borderBottom: checked ? "1px solid var(--border)" : "2px solid var(--mustard)" }}>
              <span style={{ textDecoration: checked ? "line-through" : "none" }}>{step.title}</span>
            </Link>
          ) : (
            <span style={titleStyle}>{step.title}</span>
          )}
        </div>
        <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.65, color: "var(--ink-muted)", margin: 0, maxWidth: "62ch" }}>{step.desc}</p>
      </div>
    </li>
  );
}

export default function Discipleship() {
  const [done, setDone] = useState<Record<string, boolean>>(() => loadProgress());

  const toggle = (id: string) => {
    setDone((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      saveProgress(next);
      return next;
    });
  };

  const reset = () => {
    if (!window.confirm("Clear every checked step and start the pathway over?")) return;
    setDone({});
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to clear if storage is unavailable.
    }
  };

  const totalDone = ALL_STEPS.filter((s) => done[s.id]).length;
  const total = ALL_STEPS.length;
  const firstUnchecked = ALL_STEPS.find((s) => !done[s.id]);
  const firstUncheckedStage = firstUnchecked ? STAGES.find((st) => st.steps.some((s) => s.id === firstUnchecked.id)) : undefined;

  let resumeLine: string;
  if (totalDone === 0) {
    resumeLine = "You have not checked anything yet. Begin with Stage 1.";
  } else if (!firstUnchecked || !firstUncheckedStage) {
    resumeLine = "Every step is checked. The list ends here. The walking does not.";
  } else {
    resumeLine = `Pick up where you left off: ${firstUncheckedStage.label}, "${firstUnchecked.title}".`;
  }

  const sectionBg = ["var(--bone-warm)", "var(--bone)", "var(--bone-warm)", "var(--bone)"];

  return (
    <Layout>
      <SEOMeta
        title="The Discipleship Pathway — A Guided Path from New Believer to Disciple-Maker"
        description="A four-stage discipleship pathway with concrete steps: begin with the gospel and prayer, take root in Scripture and the church, go deep into doctrine and hard questions, and pass it on by discipling others. Your progress is saved on this device."
        url="https://www.livewellbyjamesbell.co/discipleship"
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "6rem 1.5rem 5rem" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "1.5rem" }}>The Discipleship Pathway</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2.25rem, 5.5vw, 4rem)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--bone)", marginBottom: "1.5rem", maxWidth: "18ch" }}>
            The long obedience, in order.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "1.125rem", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "62ch", marginBottom: "1.5rem" }}>
            Discipleship is not a class you pass. It is a direction you keep walking for the rest of your life. This page marks the road in four stages, from the first week of belief to the day you are the one walking beside someone else. Check the steps as you go. The page remembers where you stopped.
          </p>
          <p style={{ fontFamily: "var(--F)", fontSize: "1.05rem", fontStyle: "italic", lineHeight: 1.6, color: "rgba(245,240,230,0.6)", maxWidth: "56ch" }}>
            One honest thing before you start. A checklist does not make a disciple. It only keeps you walking.
          </p>
        </div>
      </section>

      {/* OVERALL PROGRESS */}
      <section style={{ background: "var(--bone)", padding: "2.5rem 1.5rem" }}>
        <div style={wrap}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
            <p style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--ink)", margin: 0 }}>
              {totalDone} of {total} steps
            </p>
            <button
              onClick={reset}
              style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)", background: "none", border: "1px solid var(--border)", borderRadius: "999px", padding: "6px 14px", cursor: "pointer" }}
            >
              Reset progress
            </button>
          </div>
          <ProgressBar done={totalDone} total={total} />
          <p style={{ fontFamily: "var(--B)", fontSize: "0.9rem", lineHeight: 1.6, color: "var(--ink-muted)", marginTop: "0.75rem", marginBottom: 0 }}>
            {resumeLine}
          </p>
        </div>
      </section>

      {/* STAGES */}
      {STAGES.map((stage, i) => {
        const stageDone = stage.steps.filter((s) => done[s.id]).length;
        return (
          <section key={stage.id} style={{ background: sectionBg[i], padding: "4rem 1.5rem" }}>
            <div style={wrap}>
              <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "0.75rem" }}>{stage.label}</div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.01em", color: "var(--ink)", marginBottom: "1rem" }}>
                {stage.name}
              </h2>
              <p style={{ fontFamily: "var(--B)", fontSize: "1rem", lineHeight: 1.7, color: "var(--ink)", maxWidth: "62ch", marginBottom: "1.5rem" }}>
                {stage.intro}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "0.5rem" }}>
                <div style={{ flex: 1 }}>
                  <ProgressBar done={stageDone} total={stage.steps.length} />
                </div>
                <span style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, color: "var(--ink-muted)", whiteSpace: "nowrap" }}>
                  {stageDone} of {stage.steps.length}
                </span>
              </div>
              <ul style={{ margin: 0, padding: 0 }}>
                {stage.steps.map((step) => (
                  <StepRow key={step.id} step={step} checked={!!done[step.id]} onToggle={() => toggle(step.id)} />
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      {/* CLOSING */}
      <section style={{ background: "var(--charcoal)", padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div style={{ width: "40px", height: "2px", background: "var(--mustard)", margin: "0 auto 2rem" }} />
          <p style={{ fontFamily: "var(--F)", fontSize: "1.125rem", lineHeight: 1.65, color: "var(--bone)", fontStyle: "italic", margin: 0 }}>
            Thirty steps fit on a page. The life they point to does not. When the last box is checked, you will not be finished. You will be equipped, which is a different thing, and a heavier one.
          </p>
          <div style={{ marginTop: "2rem" }}>
            <Link href="/disciple-making" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>Now go make disciples, around a table</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
