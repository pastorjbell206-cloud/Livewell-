import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useState } from "react";
import { FileText, Clock, ChevronRight } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────── */

interface OutlinePoint {
  title: string;
  scripture: string;
  illustration: string;
  applicationQuestion: string;
}

interface SermonOutline {
  topic: string;
  audience: string;
  titles: [string, string, string];
  bigIdea: string;
  openingHook: string;
  points: [OutlinePoint, OutlinePoint, OutlinePoint];
  closingChallenge: string;
  estimatedMinutes: number;
}

/* ── Data ──────────────────────────────────────────────────────── */

const TOPICS = [
  "Grace",
  "Justice",
  "Faith",
  "Hope",
  "Love",
  "Suffering",
  "Identity",
  "Mission",
  "Wisdom",
  "Family",
] as const;

const AUDIENCES = [
  "Mixed congregation",
  "Youth",
  "Men's group",
  "Women's group",
  "Small group",
  "New believers",
] as const;

const OUTLINES: SermonOutline[] = [
  {
    topic: "Grace",
    audience: "Mixed congregation",
    titles: [
      "The Weight Grace Carries",
      "What We Did Not Earn and Cannot Repay",
      "Grace Is Not Permission -- It Is Power",
    ],
    bigIdea:
      "Grace is not God looking the other way -- it is God looking straight at the worst of us and moving toward us anyway.",
    openingHook:
      "Tell the story of a debt collector who arrives at a house, envelope in hand, and instead of demanding payment, tears the bill in half. The homeowner does not celebrate. She weeps. Not because she is sad, but because she has spent eleven years pretending she could pay. Start there -- with the relief that only comes after the pretending stops.",
    points: [
      {
        title: "Grace exposes before it restores",
        scripture: "Romans 3:23-24",
        illustration:
          "Use the image of a surgeon who must cut before healing. Grace does not skip the diagnosis. It names the disease -- our complete inability to save ourselves -- and then provides the cure at personal cost. Reference Bonhoeffer's distinction between cheap grace and costly grace from The Cost of Discipleship.",
        applicationQuestion:
          "Where in your life are you still pretending you can earn what God has already given freely?",
      },
      {
        title: "Grace creates what it demands",
        scripture: "Ephesians 2:8-10",
        illustration:
          "A father teaching his child to walk does not wait until the child can walk to love her. He holds her hands, absorbs the stumbles, and celebrates the first independent step -- which his support made possible. Grace works the same way. It does not wait for our obedience to arrive. It produces the obedience it requires.",
        applicationQuestion:
          "If grace truly produces obedience rather than requiring it first, how does that change the way you approach your failures this week?",
      },
      {
        title: "Grace received must become grace extended",
        scripture: "Matthew 18:21-35",
        illustration:
          "Walk through the parable of the unforgiving servant. The man forgiven millions refuses to forgive pennies. The point is not that God will punish the ungrateful. The point is that a person who truly understands what they have been forgiven becomes incapable of withholding forgiveness. If you cannot forgive, you may not yet understand what you have received.",
        applicationQuestion:
          "Who in your life are you withholding from the very grace you yourself depend on every morning?",
      },
    ],
    closingChallenge:
      "Grace is not a theology to master. It is a weight to carry -- the weight of knowing you did nothing to deserve the life you have been given and everything to deserve its opposite. That weight does not crush. It humbles. And humility is the only posture from which real life begins. Walk out of this room carrying that.",
    estimatedMinutes: 32,
  },
  {
    topic: "Suffering",
    audience: "Small group",
    titles: [
      "The God Who Does Not Explain",
      "Suffering and the Silence That Is Not Absence",
      "When the Answer Is a Person, Not a Reason",
    ],
    bigIdea:
      "God's response to suffering is not an explanation -- it is a presence, and that presence is enough even when the pain is not resolved.",
    openingHook:
      "Open with the observation that Job's friends sat in silence for seven days before they started talking -- and everything they said after that made things worse. The best theology of suffering in the entire book is those first seven silent days. Ask the group: when was the last time someone sat with you in pain without trying to fix it?",
    points: [
      {
        title: "Suffering is not a punishment to decode",
        scripture: "John 9:1-3",
        illustration:
          "The disciples see a blind man and ask whose sin caused it. Jesus refuses the question entirely. He does not assign blame. He redirects attention from cause to purpose. Most of our theology of suffering is the disciples' question dressed in better vocabulary -- still trying to find the moral math behind the pain.",
        applicationQuestion:
          "When you suffer, is your first instinct to ask 'Why?' or to ask 'Who is with me?' -- and what does that reveal about your operating theology?",
      },
      {
        title: "Lament is the language of faith under pressure",
        scripture: "Psalm 88:1-18",
        illustration:
          "Psalm 88 is the only psalm that ends in darkness. No resolution. No turn to praise. It is in the Bible anyway. That means the editors of Scripture believed that an unanswered cry to God is still worship. Grief that is directed toward God -- even angry grief -- is not faithlessness. It is the most honest form of faith there is.",
        applicationQuestion:
          "What grief or anger toward God have you been suppressing because you thought faithful people were not allowed to feel it?",
      },
      {
        title: "The cross means God is not a spectator of suffering",
        scripture: "Hebrews 4:15-16",
        illustration:
          "A hospital chaplain once said the most common thing people in crisis tell him is not 'I need answers.' It is 'I need someone who understands.' The incarnation means God entered the room. The cross means God entered the worst room in the building. He does not observe suffering from a safe distance. He absorbed it.",
        applicationQuestion:
          "How does knowing that God has suffered -- not theoretically but physically, in a body -- change the way you bring your pain to Him?",
      },
    ],
    closingChallenge:
      "You will not leave this room with an answer to why you are hurting. But you might leave with something better -- the conviction that the God you are crying out to is not embarrassed by your tears, not threatened by your anger, and not absent from your darkest room. He is already in it. That does not make the pain smaller. It makes you less alone in it. And sometimes that is the only sermon that matters.",
    estimatedMinutes: 28,
  },
  {
    topic: "Faith",
    audience: "New believers",
    titles: [
      "Faith Is Not a Feeling -- It Is a Direction",
      "Believing When You Cannot See the Bottom",
      "The Muscle You Did Not Know You Had",
    ],
    bigIdea:
      "Faith is not the absence of doubt -- it is the decision to trust God while the doubt is still talking.",
    openingHook:
      "Ask the room: have you ever sat in a chair without checking whether it could hold your weight? You trusted it before you tested it. That is closer to what faith means than most of us realize. Faith is not certainty about God. It is willingness to sit down before you have all the evidence -- and discovering, after you sit, that the chair holds.",
    points: [
      {
        title: "Faith begins with honesty, not confidence",
        scripture: "Mark 9:24",
        illustration:
          "A father brings his demon-possessed son to Jesus and says the most honest prayer in the New Testament: 'I believe; help my unbelief.' He does not pretend. He does not perform. He holds both realities in the same sentence -- belief and its opposite -- and Jesus does not reject him for it. That father is the patron saint of everyone who has ever prayed while wondering if anyone was listening.",
        applicationQuestion:
          "What would change if you gave yourself permission to bring your honest doubts to God instead of hiding them?",
      },
      {
        title: "Faith grows by use, not by study alone",
        scripture: "James 2:17-18",
        illustration:
          "Compare faith to a muscle. Reading about exercise does not make you stronger -- lifting the weight does. Faith that stays in your head never reaches your hands. James is not contradicting Paul. He is completing the sentence. Paul says faith saves. James says saving faith moves. A faith that does not produce action is not weak faith. It is something else entirely.",
        applicationQuestion:
          "What is one specific act of obedience God has been asking of you that you have been delaying until you feel more ready?",
      },
      {
        title: "Faith is sustained by community, not isolation",
        scripture: "Hebrews 10:24-25",
        illustration:
          "A single coal removed from the fire goes cold. It is not defective -- it simply was not designed to burn alone. Neither were you. The reason the New Testament never describes faith as a solo enterprise is because it cannot survive as one. You need people who will believe for you on the days you cannot believe for yourself.",
        applicationQuestion:
          "Who in your life knows the real state of your faith right now -- not the version you perform on Sunday, but the actual one?",
      },
    ],
    closingChallenge:
      "Faith is not a finish line you cross. It is a direction you face. Some days you walk confidently. Some days you crawl. Some days you stand still and simply refuse to turn around. All of it counts. God is not grading your certainty. He is honoring your direction. Keep facing Him. That is enough.",
    estimatedMinutes: 25,
  },
  {
    topic: "Love",
    audience: "Women's group",
    titles: [
      "Love That Costs Something",
      "Beyond the Feeling -- Love as a Practiced Commitment",
      "The Kind of Love That Rebuilds the Room",
    ],
    bigIdea:
      "Biblical love is not a sentiment you feel but a costly decision you make repeatedly, especially when the feeling has left the room.",
    openingHook:
      "Read 1 Corinthians 13 aloud -- but slowly, replacing every instance of 'love' with your own name. 'Sarah is patient. Sarah is kind. Sarah does not envy.' Let the room sit in the discomfort. Paul did not write this passage as a wedding reading. He wrote it to a church tearing itself apart. Love, in Paul's hands, is not poetry. It is a rebuke.",
    points: [
      {
        title: "Love is defined by sacrifice, not by feeling",
        scripture: "John 15:13",
        illustration:
          "A mother who wakes at 3 a.m. for a crying infant is not feeling love in that moment. She is choosing it. A husband who stays in a hard conversation instead of walking out is not experiencing warmth. He is practicing fidelity. The modern world has confused love with its symptoms. Scripture defines love by its cost -- what you are willing to lose for the sake of another person.",
        applicationQuestion:
          "Where have you been waiting to feel love before you act in love -- and what would it look like to reverse that order?",
      },
      {
        title: "Love sees the person, not the problem",
        scripture: "Luke 7:36-50",
        illustration:
          "When the sinful woman anoints Jesus' feet at Simon's dinner party, Simon sees a category: sinner. Jesus sees a person: someone whose love has outpaced her reputation. The Pharisee loved his standards. The woman loved a person. Jesus makes clear which love God honors. The question is not whether the people in your life deserve your love. It is whether you see them clearly enough to offer it.",
        applicationQuestion:
          "Who in your life have you reduced to a label -- difficult, exhausting, toxic -- and what would it take to see them as a person again?",
      },
      {
        title: "Love is the evidence, not the effort",
        scripture: "1 John 4:19",
        illustration:
          "John says we love because He first loved us. The order matters. We do not love in order to earn God's attention. We love because we have already received it. A woman who knows she is loved by God does not love others out of obligation or performance. She loves because she is full -- and fullness overflows. The effort is real. But the source is grace, not willpower.",
        applicationQuestion:
          "Are you trying to love from an empty cup? Where do you need to receive God's love before you can extend it to others?",
      },
    ],
    closingChallenge:
      "Love is not the easy thing the world makes it. It is the hardest thing Scripture asks of us -- harder than obedience, harder than sacrifice, because it requires both simultaneously and demands that we do it without keeping score. But it is also the thing that outlasts everything else. Faith will give way to sight. Hope will give way to fulfillment. Love remains. Let it remain in you.",
    estimatedMinutes: 30,
  },
  {
    topic: "Justice",
    audience: "Men's group",
    titles: [
      "What God Requires When No One Is Watching",
      "Justice Is Not a Cause -- It Is a Character",
      "The Man Who Stands in the Gap",
    ],
    bigIdea:
      "Biblical justice is not an ideology to adopt but a character to embody -- it begins with how a man treats the people who have no power to repay him.",
    openingHook:
      "Micah 6:8 is eight words long in Hebrew. 'Do justice. Love mercy. Walk humbly with your God.' The prophet does not say understand justice or vote for justice or post about justice. He says do it. That verb changes everything. Justice is not a position. It is a practice. And the men who practice it are not the ones making noise. They are the ones in the room doing the work no one will applaud.",
    points: [
      {
        title: "Justice starts in the household, not the culture war",
        scripture: "Micah 6:8",
        illustration:
          "A man who advocates for justice in public but treats his wife dismissively in private has not understood the word. Justice begins at the dinner table. It begins with how you speak to your children when you are tired, how you divide labor when no one is keeping score, how you use your physical and economic power in the place where only your family can see. The prophets never separated public righteousness from private conduct. Neither should we.",
        applicationQuestion:
          "If your family were the only evidence of your commitment to justice, what verdict would they reach?",
      },
      {
        title: "Justice requires proximity to the people who need it",
        scripture: "Isaiah 1:17",
        illustration:
          "Isaiah does not say think about the orphan and the widow. He says defend them. That verb requires proximity. You cannot defend someone you have never met. The reason most men struggle with justice is not that they lack conviction. It is that they lack contact. They have built lives insulated from the very people God says to protect. Justice begins when you close that distance.",
        applicationQuestion:
          "Who is the most vulnerable person within your actual sphere of influence -- and what are you doing about their situation?",
      },
      {
        title: "Justice and mercy are not opposites -- they are partners",
        scripture: "Zechariah 7:9-10",
        illustration:
          "The world frames justice and mercy as competing values -- one demands accountability, the other demands compassion. Scripture refuses the trade-off. Zechariah says render true judgments and show kindness and mercy in the same breath. A man of justice does not excuse wrong. But he also does not reduce a person to their worst moment. He holds both realities because God holds both realities with us.",
        applicationQuestion:
          "Where in your life have you chosen justice without mercy or mercy without justice -- and what would it look like to hold both?",
      },
    ],
    closingChallenge:
      "The world does not need more men who can articulate justice. It needs men who practice it when the cost is real and the audience is small. In your home. In your workplace. In the quiet decisions no one will ever write about. That is where justice lives or dies. Not in the argument. In the action. Be the man who does it.",
    estimatedMinutes: 30,
  },
  {
    topic: "Hope",
    audience: "Youth",
    titles: [
      "Hope Is Not Optimism -- It Is Harder Than That",
      "The Thing That Refuses to Die",
      "When Everything Falls Apart and You Are Still Standing",
    ],
    bigIdea:
      "Hope is not the belief that everything will turn out fine -- it is the conviction that God is present and working even when nothing looks fine.",
    openingHook:
      "Here is what the world will tell you: stay positive. Think good thoughts. Everything happens for a reason. Here is what Scripture says: the world is broken, you will suffer, and the God who made you has not abandoned you in the wreckage. One of those is optimism. The other is hope. They are not the same thing. Optimism requires good circumstances. Hope survives the absence of them.",
    points: [
      {
        title: "Hope is built on a person, not a prediction",
        scripture: "Romans 8:24-25",
        illustration:
          "Think about the difference between hoping your team wins the game and hoping your father keeps his promise. The first depends on circumstances outside anyone's control. The second depends on the character of a person you know. Biblical hope is the second kind. It is not wishing for a good outcome. It is trusting a person whose track record stretches across centuries of keeping promises others would have abandoned.",
        applicationQuestion:
          "When you say you have hope, are you hoping circumstances improve -- or are you trusting the character of God regardless of what happens next?",
      },
      {
        title: "Hope is honest about the darkness",
        scripture: "Romans 8:18-23",
        illustration:
          "Paul does not pretend the present is painless. He says creation itself is groaning. He says we groan with it. And then -- without dismissing the groaning -- he says the glory coming will make the suffering look small. Real hope does not deny the darkness. It knows the darkness by name. It sits in it. And it says: this is not the final word. That is not denial. That is defiance.",
        applicationQuestion:
          "What pain in your life have you been trying to ignore instead of bringing it honestly before God and trusting Him in the middle of it?",
      },
      {
        title: "Hope produces endurance, not escape",
        scripture: "Romans 5:3-5",
        illustration:
          "A tree that grows in a greenhouse looks healthy, but it cannot survive a storm. A tree that grows in wind develops deep roots. Paul says suffering produces endurance, and endurance produces character, and character produces hope. Notice the order. Hope is not the starting point. It is the product of everything you survived. Every hard thing you have walked through and are still standing after -- that is the raw material of hope.",
        applicationQuestion:
          "What difficulty in your life right now might God be using not to destroy you but to build the kind of endurance that produces real hope?",
      },
    ],
    closingChallenge:
      "You are going to face things that feel like the end of the story. Relationships that break. Dreams that collapse. Seasons that feel like they will never end. Hope does not promise those things will not happen. Hope says: there is a God who is writing a longer story than the chapter you are in. And He has never lost the pen. Hold on to that. Not because it is easy. Because it is true.",
    estimatedMinutes: 25,
  },
];

/* ── Helpers ────────────────────────────────────────────────────── */

function findOutline(topic: string, audience: string): SermonOutline {
  // Try exact match first
  const exact = OUTLINES.find(
    (o) => o.topic === topic && o.audience === audience
  );
  if (exact) return exact;

  // Fall back to closest topic match
  const topicMatch = OUTLINES.find((o) => o.topic === topic);
  if (topicMatch) return topicMatch;

  // Absolute fallback
  return OUTLINES[0];
}

/* ── Component ─────────────────────────────────────────────────── */

export default function SermonOutline() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [scripture, setScripture] = useState("");
  const [outline, setOutline] = useState<SermonOutline | null>(null);

  const handleGenerate = () => {
    if (!topic || !audience) return;
    setOutline(findOutline(topic, audience));
  };

  const handleReset = () => {
    setOutline(null);
    setTopic("");
    setAudience("");
    setScripture("");
  };

  return (
    <Layout>
      <SEOMeta
        title="Sermon Outline Generator -- Structured Outlines for Pastors"
        description="Generate structured sermon outlines with title suggestions, a three-point framework, illustration ideas, and application questions. Built for pastors and teachers who refuse to separate depth from clarity."
        keywords="sermon outline generator, sermon prep tool, preaching outline, sermon structure, pastoral tool, sermon illustrations"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Sermon Outline Generator",
          description:
            "Generate structured sermon outlines with theological depth. Title suggestions, three-point framework, illustrations, and application questions.",
          url: "https://www.livewellbyjamesbell.co/tools/sermon-outline",
          applicationCategory: "ReligiousApp",
          offers: { "@type": "Offer", price: "0" },
        }}
      />

      {/* Hero */}
      <section
        style={{
          background: "var(--charcoal)",
          color: "var(--bone)",
          padding: "80px 32px 60px",
          textAlign: "center",
        }}
      >
        <div className="wrap" style={{ maxWidth: "700px" }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "var(--mustard)",
              fontFamily: "var(--U)",
              marginBottom: "16px",
            }}
          >
            FREE TOOL
          </div>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 300,
              fontFamily: "var(--F)",
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            Sermon Outline{" "}
            <em style={{ fontStyle: "italic", color: "var(--mustard)" }}>
              Generator
            </em>
          </h1>
          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.7,
              opacity: 0.85,
              fontFamily: "var(--U)",
            }}
          >
            Select a topic and audience. Receive a structured outline with title
            options, a three-point framework, illustration suggestions, and
            application questions worth asking.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "48px 32px", background: "var(--bone)" }}>
        <div className="wrap" style={{ maxWidth: "900px" }}>
          {!outline ? (
            /* ── Input Form ── */
            <div
              style={{
                background: "var(--card)",
                borderRadius: "8px",
                padding: "40px 36px",
                borderTop: "4px solid var(--mustard)",
              }}
            >
              <h2
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "var(--mustard)",
                  fontFamily: "var(--U)",
                  marginBottom: "28px",
                }}
              >
                BUILD YOUR OUTLINE
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                {/* Scripture passage */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      fontFamily: "var(--U)",
                      color: "var(--ink)",
                      marginBottom: "8px",
                    }}
                  >
                    Scripture Passage
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Romans 8:28-39, John 15:1-17"
                    value={scripture}
                    onChange={(e) => setScripture(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      fontSize: "16px",
                      fontFamily: "var(--U)",
                      color: "var(--ink)",
                      background: "var(--bone)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Topic dropdown */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      fontFamily: "var(--U)",
                      color: "var(--ink)",
                      marginBottom: "8px",
                    }}
                  >
                    Topic / Theme
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      fontSize: "16px",
                      fontFamily: "var(--U)",
                      color: topic ? "var(--ink)" : "var(--ink2)",
                      background: "var(--bone)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      outline: "none",
                      appearance: "none",
                      boxSizing: "border-box",
                      cursor: "pointer",
                    }}
                  >
                    <option value="">Select a topic</option>
                    {TOPICS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Audience dropdown */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      fontFamily: "var(--U)",
                      color: "var(--ink)",
                      marginBottom: "8px",
                    }}
                  >
                    Audience
                  </label>
                  <select
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      fontSize: "16px",
                      fontFamily: "var(--U)",
                      color: audience ? "var(--ink)" : "var(--ink2)",
                      background: "var(--bone)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      outline: "none",
                      appearance: "none",
                      boxSizing: "border-box",
                      cursor: "pointer",
                    }}
                  >
                    <option value="">Select an audience</option>
                    {AUDIENCES.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Generate button */}
                <button
                  onClick={handleGenerate}
                  disabled={!topic || !audience}
                  style={{
                    padding: "16px 32px",
                    background:
                      topic && audience ? "var(--mustard)" : "var(--bone-warm)",
                    color: topic && audience ? "var(--ink)" : "var(--ink2)",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: 600,
                    fontFamily: "var(--U)",
                    letterSpacing: "0.06em",
                    cursor: topic && audience ? "pointer" : "not-allowed",
                    transition: "all 0.2s",
                    marginTop: "8px",
                  }}
                >
                  Generate Outline
                </button>
              </div>
            </div>
          ) : (
            /* ── Outline Display ── */
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              {/* Back / Reset */}
              <button
                onClick={handleReset}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 0",
                  background: "none",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "var(--U)",
                  color: "var(--ink)",
                  cursor: "pointer",
                  opacity: 0.7,
                }}
              >
                <ChevronRight
                  size={16}
                  style={{ transform: "rotate(180deg)" }}
                />
                New Outline
              </button>

              {/* Header card */}
              <div
                style={{
                  background: "var(--card)",
                  borderRadius: "8px",
                  padding: "40px 36px",
                  borderTop: "4px solid var(--mustard)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      color: "var(--mustard)",
                      fontFamily: "var(--U)",
                      padding: "4px 12px",
                      background: "var(--bone)",
                      borderRadius: "3px",
                    }}
                  >
                    {outline.topic.toUpperCase()}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      color: "var(--ink2)",
                      fontFamily: "var(--U)",
                      padding: "4px 12px",
                      background: "var(--bone)",
                      borderRadius: "3px",
                    }}
                  >
                    {outline.audience.toUpperCase()}
                  </span>
                  {scripture && (
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        color: "var(--ink2)",
                        fontFamily: "var(--U)",
                        padding: "4px 12px",
                        background: "var(--bone)",
                        borderRadius: "3px",
                      }}
                    >
                      {scripture.toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Title suggestions */}
                <h3
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--mustard)",
                    fontFamily: "var(--U)",
                    marginBottom: "16px",
                  }}
                >
                  TITLE OPTIONS
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    marginBottom: "32px",
                  }}
                >
                  {outline.titles.map((title, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "12px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--F)",
                          fontSize: "20px",
                          color: "var(--mustard)",
                          flexShrink: 0,
                          width: "24px",
                          textAlign: "center",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span
                        style={{
                          fontSize: "20px",
                          fontFamily: "var(--F)",
                          fontWeight: 500,
                          color: "var(--ink)",
                          fontStyle: "italic",
                          lineHeight: 1.4,
                        }}
                      >
                        {title}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Big Idea */}
                <h3
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--mustard)",
                    fontFamily: "var(--U)",
                    marginBottom: "12px",
                  }}
                >
                  BIG IDEA
                </h3>
                <p
                  style={{
                    fontSize: "19px",
                    lineHeight: 1.7,
                    fontFamily: "var(--F)",
                    fontWeight: 400,
                    color: "var(--ink)",
                    maxWidth: "68ch",
                    borderLeft: "3px solid var(--mustard)",
                    paddingLeft: "20px",
                    margin: 0,
                  }}
                >
                  {outline.bigIdea}
                </p>
              </div>

              {/* Opening Hook */}
              <div
                style={{
                  background: "var(--card)",
                  borderRadius: "8px",
                  padding: "36px",
                }}
              >
                <h3
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--mustard)",
                    fontFamily: "var(--U)",
                    marginBottom: "16px",
                  }}
                >
                  OPENING HOOK
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.8,
                    color: "var(--ink)",
                    fontFamily: "var(--U)",
                    maxWidth: "68ch",
                    margin: 0,
                  }}
                >
                  {outline.openingHook}
                </p>
              </div>

              {/* Three Points */}
              {outline.points.map((point, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--card)",
                    borderRadius: "8px",
                    padding: "36px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "16px",
                      marginBottom: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--F)",
                        fontSize: "36px",
                        fontWeight: 300,
                        color: "var(--mustard)",
                        lineHeight: 1,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    <h3
                      style={{
                        fontSize: "clamp(22px, 3vw, 28px)",
                        fontWeight: 400,
                        fontFamily: "var(--F)",
                        color: "var(--ink)",
                        lineHeight: 1.25,
                        letterSpacing: "-0.02em",
                        margin: 0,
                      }}
                    >
                      {point.title}
                    </h3>
                  </div>

                  {/* Scripture */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "20px",
                    }}
                  >
                    <FileText
                      size={14}
                      style={{ color: "var(--mustard)", flexShrink: 0 }}
                    />
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        fontFamily: "var(--U)",
                        color: "var(--mustard)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {point.scripture}
                    </span>
                  </div>

                  {/* Illustration */}
                  <div style={{ marginBottom: "20px" }}>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        color: "var(--ink2)",
                        fontFamily: "var(--U)",
                        marginBottom: "8px",
                      }}
                    >
                      ILLUSTRATION
                    </div>
                    <p
                      style={{
                        fontSize: "16px",
                        lineHeight: 1.8,
                        color: "var(--ink)",
                        fontFamily: "var(--U)",
                        maxWidth: "68ch",
                        margin: 0,
                      }}
                    >
                      {point.illustration}
                    </p>
                  </div>

                  {/* Application question */}
                  <div
                    style={{
                      background: "var(--bone)",
                      borderRadius: "6px",
                      padding: "20px 24px",
                      borderLeft: "3px solid var(--mustard)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        color: "var(--mustard)",
                        fontFamily: "var(--U)",
                        marginBottom: "8px",
                      }}
                    >
                      APPLICATION QUESTION
                    </div>
                    <p
                      style={{
                        fontSize: "16px",
                        lineHeight: 1.7,
                        color: "var(--ink)",
                        fontFamily: "var(--F)",
                        fontStyle: "italic",
                        maxWidth: "68ch",
                        margin: 0,
                      }}
                    >
                      {point.applicationQuestion}
                    </p>
                  </div>
                </div>
              ))}

              {/* Closing Challenge */}
              <div
                style={{
                  background: "var(--charcoal)",
                  borderRadius: "8px",
                  padding: "40px 36px",
                  color: "var(--bone)",
                }}
              >
                <h3
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--mustard)",
                    fontFamily: "var(--U)",
                    marginBottom: "16px",
                  }}
                >
                  CLOSING CHALLENGE
                </h3>
                <p
                  style={{
                    fontSize: "17px",
                    lineHeight: 1.9,
                    fontFamily: "var(--U)",
                    maxWidth: "68ch",
                    margin: 0,
                    opacity: 0.9,
                  }}
                >
                  {outline.closingChallenge}
                </p>
              </div>

              {/* Estimated time */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "20px",
                  color: "var(--ink2)",
                  fontFamily: "var(--U)",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                <Clock size={16} />
                Estimated delivery time: {outline.estimatedMinutes} minutes
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
