import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useState, useEffect, useCallback } from "react";
import { BookOpen, Check, ChevronRight, Eye, EyeOff } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────── */

interface Verse {
  ref: string;
  text: string;
}

type MemoryMode = "full" | "firstLetter" | "fillBlank" | "recall";

/* ── Data ──────────────────────────────────────────────────────── */

const CATEGORIES: Record<string, Verse[]> = {
  "Anxiety & Peace": [
    {
      ref: "Philippians 4:6-7",
      text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
    },
    {
      ref: "Isaiah 26:3",
      text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
    },
    {
      ref: "1 Peter 5:7",
      text: "Cast all your anxiety on him because he cares for you.",
    },
    {
      ref: "John 14:27",
      text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
    },
    {
      ref: "Psalm 46:10",
      text: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
    },
  ],
  "Marriage & Love": [
    {
      ref: "Ephesians 5:25",
      text: "Husbands, love your wives, just as Christ loved the church and gave himself up for her.",
    },
    {
      ref: "1 Corinthians 13:4-5",
      text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.",
    },
    {
      ref: "Genesis 2:24",
      text: "That is why a man leaves his father and mother and is united to his wife, and they become one flesh.",
    },
    {
      ref: "Colossians 3:14",
      text: "And over all these virtues put on love, which binds them all together in perfect unity.",
    },
    {
      ref: "1 John 4:19",
      text: "We love because he first loved us.",
    },
  ],
  "Faith & Trust": [
    {
      ref: "Hebrews 11:1",
      text: "Now faith is confidence in what we hope for and assurance about what we do not see.",
    },
    {
      ref: "Proverbs 3:5-6",
      text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    },
    {
      ref: "Mark 9:24",
      text: "Immediately the boy's father exclaimed, I do believe; help me overcome my unbelief!",
    },
    {
      ref: "Romans 10:17",
      text: "Consequently, faith comes from hearing the message, and the message is heard through the word about Christ.",
    },
    {
      ref: "2 Corinthians 5:7",
      text: "For we live by faith, not by sight.",
    },
  ],
  "Identity in Christ": [
    {
      ref: "2 Corinthians 5:17",
      text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    },
    {
      ref: "Ephesians 2:10",
      text: "For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
    },
    {
      ref: "Galatians 2:20",
      text: "I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me.",
    },
    {
      ref: "1 Peter 2:9",
      text: "But you are a chosen people, a royal priesthood, a holy nation, God's special possession, that you may declare the praises of him who called you out of darkness into his wonderful light.",
    },
    {
      ref: "Romans 8:1",
      text: "Therefore, there is now no condemnation for those who are in Christ Jesus.",
    },
  ],
  "Suffering & Hope": [
    {
      ref: "Romans 8:28",
      text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    },
    {
      ref: "James 1:2-3",
      text: "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance.",
    },
    {
      ref: "2 Corinthians 4:17",
      text: "For our light and momentary troubles are achieving for us an eternal glory that far outweighs them all.",
    },
    {
      ref: "Psalm 34:18",
      text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
    },
    {
      ref: "Romans 5:3-4",
      text: "Not only so, but we also glory in our sufferings, because we know that suffering produces perseverance; perseverance, character; and character, hope.",
    },
  ],
  "Parenting & Family": [
    {
      ref: "Proverbs 22:6",
      text: "Start children off on the way they should go, and even when they are old they will not turn from it.",
    },
    {
      ref: "Deuteronomy 6:6-7",
      text: "These commandments that I give you today are to be on your hearts. Impress them on your children. Talk about them when you sit at home and when you walk along the road, when you lie down and when you get up.",
    },
    {
      ref: "Psalm 127:3",
      text: "Children are a heritage from the Lord, offspring a reward from him.",
    },
    {
      ref: "Ephesians 6:4",
      text: "Fathers, do not exasperate your children; instead, bring them up in the training and instruction of the Lord.",
    },
    {
      ref: "3 John 1:4",
      text: "I have no greater joy than to hear that my children are walking in the truth.",
    },
  ],
  "Leadership & Wisdom": [
    {
      ref: "James 1:5",
      text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.",
    },
    {
      ref: "Proverbs 9:10",
      text: "The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.",
    },
    {
      ref: "Matthew 20:26-27",
      text: "Not so with you. Instead, whoever wants to become great among you must be your servant, and whoever wants to be first must be your slave.",
    },
    {
      ref: "1 Timothy 4:12",
      text: "Don't let anyone look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity.",
    },
    {
      ref: "Proverbs 11:14",
      text: "For lack of guidance a nation falls, but victory is won through many advisers.",
    },
  ],
  "Forgiveness & Grace": [
    {
      ref: "Ephesians 4:32",
      text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
    },
    {
      ref: "Romans 3:23-24",
      text: "For all have sinned and fall short of the glory of God, and all are justified freely by his grace through the redemption that came by Christ Jesus.",
    },
    {
      ref: "Colossians 3:13",
      text: "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you.",
    },
    {
      ref: "Ephesians 2:8-9",
      text: "For it is by grace you have been saved, through faith -- and this is not from yourselves, it is the gift of God -- not by works, so that no one can boast.",
    },
    {
      ref: "Psalm 103:12",
      text: "As far as the east is from the west, so far has he removed our transgressions from us.",
    },
  ],
};

const CATEGORY_NAMES = Object.keys(CATEGORIES);

const STORAGE_KEY = "livewell-scripture-memorized";

/* ── Helpers ────────────────────────────────────────────────────── */

function toFirstLetters(text: string): string {
  return text
    .split(" ")
    .map((word) => {
      if (!word) return "";
      // Keep punctuation attached to the first letter
      const first = word[0];
      const trailing = word.slice(1).replace(/[a-zA-Z]/g, "_");
      return first + trailing;
    })
    .join(" ");
}

function toFillBlanks(text: string): string {
  const words = text.split(" ");
  // Hide approximately every 3rd important word (skip short words)
  return words
    .map((word, i) => {
      const clean = word.replace(/[^a-zA-Z]/g, "");
      if (clean.length <= 2) return word;
      if (i % 3 === 2) {
        const punctuation = word.replace(/[a-zA-Z]/g, "");
        return "______" + punctuation;
      }
      return word;
    })
    .join(" ");
}

/* ── Component ─────────────────────────────────────────────────── */

export default function ScriptureMemory() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [modes, setModes] = useState<Record<string, MemoryMode>>({});
  const [recallInputs, setRecallInputs] = useState<Record<string, string>>({});
  const [recallResults, setRecallResults] = useState<
    Record<string, boolean | null>
  >({});
  const [memorized, setMemorized] = useState<Set<string>>(new Set());
  const [showAnswer, setShowAnswer] = useState<Record<string, boolean>>({});

  // Load memorized state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setMemorized(new Set(JSON.parse(stored)));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save memorized state to localStorage
  const persistMemorized = useCallback((next: Set<string>) => {
    setMemorized(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
    } catch {
      // Ignore storage errors
    }
  }, []);

  const toggleMemorized = (ref: string) => {
    const next = new Set(memorized);
    if (next.has(ref)) {
      next.delete(ref);
    } else {
      next.add(ref);
    }
    persistMemorized(next);
  };

  const totalVerses = CATEGORY_NAMES.reduce(
    (sum, cat) => sum + CATEGORIES[cat].length,
    0
  );
  const memorizedCount = memorized.size;

  const getMode = (ref: string): MemoryMode => modes[ref] || "full";

  const setMode = (ref: string, mode: MemoryMode) => {
    setModes((prev) => ({ ...prev, [ref]: mode }));
    // Reset recall state when switching modes
    setRecallResults((prev) => ({ ...prev, [ref]: null }));
    setShowAnswer((prev) => ({ ...prev, [ref]: false }));
  };

  const handleRecallInput = (ref: string, value: string) => {
    setRecallInputs((prev) => ({ ...prev, [ref]: value }));
  };

  const checkRecall = (ref: string, original: string) => {
    const input = (recallInputs[ref] || "").trim().toLowerCase();
    const target = original.trim().toLowerCase();
    // Simple similarity check: compare words
    const inputWords = input.split(/\s+/).filter(Boolean);
    const targetWords = target.split(/\s+/).filter(Boolean);
    let matches = 0;
    inputWords.forEach((w, i) => {
      if (targetWords[i] && w === targetWords[i]) matches++;
    });
    const accuracy = targetWords.length > 0 ? matches / targetWords.length : 0;
    setRecallResults((prev) => ({ ...prev, [ref]: accuracy >= 0.75 }));
  };

  const modeLabels: Record<MemoryMode, string> = {
    full: "Full Text",
    firstLetter: "First Letter",
    fillBlank: "Fill in Blank",
    recall: "Full Recall",
  };

  return (
    <Layout>
      <SEOMeta
        title="Scripture Memory System -- Memorize Bible Verses"
        description="Memorize 40 Bible verses across 8 categories using proven techniques: first-letter hints, fill-in-the-blank, and full recall. Track your progress and build Scripture into your life."
        keywords="scripture memory, Bible memorization, memorize Bible verses, scripture memory system, Bible memory techniques"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Scripture Memory System",
          description:
            "Memorize 40 Bible verses across 8 categories using first-letter hints, fill-in-the-blank, and full recall modes. Track your progress.",
          url: "https://www.livewellbyjamesbell.co/tools/scripture-memory",
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
            Scripture Memory{" "}
            <em style={{ fontStyle: "italic", color: "var(--mustard)" }}>
              System
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
            Forty verses across eight categories. Four memorization modes. One
            goal: Scripture that lives in you, not just on a screen.
          </p>

          {/* Progress bar */}
          <div
            style={{
              marginTop: "28px",
              maxWidth: "400px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                fontSize: "13px",
                fontFamily: "var(--U)",
                fontWeight: 600,
              }}
            >
              <span style={{ color: "var(--mustard)" }}>
                {memorizedCount} of {totalVerses} memorized
              </span>
              <span style={{ opacity: 0.5 }}>
                {totalVerses > 0
                  ? Math.round((memorizedCount / totalVerses) * 100)
                  : 0}
                %
              </span>
            </div>
            <div
              style={{
                height: "6px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${totalVerses > 0 ? (memorizedCount / totalVerses) * 100 : 0}%`,
                  background: "var(--mustard)",
                  borderRadius: "3px",
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "48px 32px", background: "var(--bone)" }}>
        <div className="wrap" style={{ maxWidth: "900px" }}>
          {/* Category Grid */}
          {!selectedCategory && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "16px",
              }}
            >
              {CATEGORY_NAMES.map((cat) => {
                const catVerses = CATEGORIES[cat];
                const catMemorized = catVerses.filter((v) =>
                  memorized.has(v.ref)
                ).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: "28px 20px",
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--mustard)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 24px rgba(0,0,0,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <BookOpen
                      size={20}
                      style={{
                        color: "var(--mustard)",
                        marginBottom: "12px",
                        opacity: 0.7,
                      }}
                    />
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: 500,
                        fontFamily: "var(--F)",
                        color: "var(--ink)",
                        marginBottom: "8px",
                        lineHeight: 1.3,
                      }}
                    >
                      {cat}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontFamily: "var(--U)",
                        color: "var(--ink2)",
                        fontWeight: 600,
                      }}
                    >
                      {catMemorized} / {catVerses.length} memorized
                    </div>
                    {/* Mini progress bar */}
                    <div
                      style={{
                        marginTop: "12px",
                        height: "3px",
                        background: "var(--bone)",
                        borderRadius: "2px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${catVerses.length > 0 ? (catMemorized / catVerses.length) * 100 : 0}%`,
                          background: "var(--mustard)",
                          borderRadius: "2px",
                          transition: "width 0.4s ease",
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Category Detail */}
          {selectedCategory && CATEGORIES[selectedCategory] && (
            <div>
              {/* Back button */}
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setRecallInputs({});
                  setRecallResults({});
                  setShowAnswer({});
                }}
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
                  marginBottom: "24px",
                  opacity: 0.7,
                }}
              >
                <ChevronRight
                  size={16}
                  style={{ transform: "rotate(180deg)" }}
                />
                All Categories
              </button>

              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 400,
                  fontFamily: "var(--F)",
                  color: "var(--ink)",
                  marginBottom: "8px",
                  letterSpacing: "-0.02em",
                }}
              >
                {selectedCategory}
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  fontFamily: "var(--U)",
                  color: "var(--ink2)",
                  marginBottom: "32px",
                  fontWeight: 600,
                }}
              >
                {
                  CATEGORIES[selectedCategory].filter((v) =>
                    memorized.has(v.ref)
                  ).length
                }{" "}
                of {CATEGORIES[selectedCategory].length} memorized in this
                category
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {CATEGORIES[selectedCategory].map((verse) => {
                  const mode = getMode(verse.ref);
                  const isMemorized = memorized.has(verse.ref);
                  const recallResult = recallResults[verse.ref];
                  const answerVisible = showAnswer[verse.ref] || false;

                  return (
                    <div
                      key={verse.ref}
                      style={{
                        background: "var(--card)",
                        borderRadius: "8px",
                        padding: "32px",
                        border: isMemorized
                          ? "2px solid var(--mustard)"
                          : "1px solid var(--border)",
                        transition: "border-color 0.3s",
                      }}
                    >
                      {/* Header */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "16px",
                          flexWrap: "wrap",
                          gap: "12px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "var(--mustard)",
                            fontFamily: "var(--U)",
                          }}
                        >
                          {verse.ref}
                        </span>

                        {/* Mark as memorized */}
                        <button
                          onClick={() => toggleMemorized(verse.ref)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "6px 14px",
                            background: isMemorized
                              ? "var(--mustard)"
                              : "var(--bone)",
                            color: isMemorized
                              ? "var(--ink)"
                              : "var(--ink2)",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: 600,
                            fontFamily: "var(--U)",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                        >
                          <Check size={14} />
                          {isMemorized ? "Memorized" : "Mark as Memorized"}
                        </button>
                      </div>

                      {/* Mode selector */}
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          marginBottom: "20px",
                          flexWrap: "wrap",
                        }}
                      >
                        {(
                          [
                            "full",
                            "firstLetter",
                            "fillBlank",
                            "recall",
                          ] as MemoryMode[]
                        ).map((m) => (
                          <button
                            key={m}
                            onClick={() => setMode(verse.ref, m)}
                            style={{
                              padding: "6px 14px",
                              background:
                                mode === m
                                  ? "var(--charcoal)"
                                  : "var(--bone)",
                              color:
                                mode === m
                                  ? "var(--bone)"
                                  : "var(--ink2)",
                              border: "none",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: 600,
                              fontFamily: "var(--U)",
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                          >
                            {modeLabels[m]}
                          </button>
                        ))}
                      </div>

                      {/* Verse display based on mode */}
                      {mode === "full" && (
                        <p
                          style={{
                            fontSize: "17px",
                            lineHeight: 1.9,
                            color: "var(--ink)",
                            fontFamily: "var(--F)",
                            fontStyle: "italic",
                            maxWidth: "68ch",
                            margin: 0,
                          }}
                        >
                          "{verse.text}"
                        </p>
                      )}

                      {mode === "firstLetter" && (
                        <div>
                          <p
                            style={{
                              fontSize: "17px",
                              lineHeight: 1.9,
                              color: "var(--ink)",
                              fontFamily: "var(--U)",
                              maxWidth: "68ch",
                              margin: 0,
                              letterSpacing: "0.02em",
                            }}
                          >
                            {toFirstLetters(verse.text)}
                          </p>
                          <div style={{ marginTop: "16px" }}>
                            <button
                              onClick={() =>
                                setShowAnswer((prev) => ({
                                  ...prev,
                                  [verse.ref]: !prev[verse.ref],
                                }))
                              }
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "6px 14px",
                                background: "var(--bone)",
                                border: "none",
                                borderRadius: "4px",
                                fontSize: "12px",
                                fontWeight: 600,
                                fontFamily: "var(--U)",
                                color: "var(--ink2)",
                                cursor: "pointer",
                              }}
                            >
                              {answerVisible ? (
                                <EyeOff size={14} />
                              ) : (
                                <Eye size={14} />
                              )}
                              {answerVisible ? "Hide Answer" : "Show Answer"}
                            </button>
                            {answerVisible && (
                              <p
                                style={{
                                  fontSize: "15px",
                                  lineHeight: 1.8,
                                  color: "var(--ink2)",
                                  fontFamily: "var(--F)",
                                  fontStyle: "italic",
                                  maxWidth: "68ch",
                                  marginTop: "12px",
                                  marginBottom: 0,
                                  padding: "16px",
                                  background: "var(--bone)",
                                  borderRadius: "6px",
                                }}
                              >
                                "{verse.text}"
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {mode === "fillBlank" && (
                        <div>
                          <p
                            style={{
                              fontSize: "17px",
                              lineHeight: 1.9,
                              color: "var(--ink)",
                              fontFamily: "var(--F)",
                              fontStyle: "italic",
                              maxWidth: "68ch",
                              margin: 0,
                            }}
                          >
                            "{toFillBlanks(verse.text)}"
                          </p>
                          <div style={{ marginTop: "16px" }}>
                            <button
                              onClick={() =>
                                setShowAnswer((prev) => ({
                                  ...prev,
                                  [verse.ref]: !prev[verse.ref],
                                }))
                              }
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "6px 14px",
                                background: "var(--bone)",
                                border: "none",
                                borderRadius: "4px",
                                fontSize: "12px",
                                fontWeight: 600,
                                fontFamily: "var(--U)",
                                color: "var(--ink2)",
                                cursor: "pointer",
                              }}
                            >
                              {answerVisible ? (
                                <EyeOff size={14} />
                              ) : (
                                <Eye size={14} />
                              )}
                              {answerVisible ? "Hide Answer" : "Show Answer"}
                            </button>
                            {answerVisible && (
                              <p
                                style={{
                                  fontSize: "15px",
                                  lineHeight: 1.8,
                                  color: "var(--ink2)",
                                  fontFamily: "var(--F)",
                                  fontStyle: "italic",
                                  maxWidth: "68ch",
                                  marginTop: "12px",
                                  marginBottom: 0,
                                  padding: "16px",
                                  background: "var(--bone)",
                                  borderRadius: "6px",
                                }}
                              >
                                "{verse.text}"
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {mode === "recall" && (
                        <div>
                          <p
                            style={{
                              fontSize: "14px",
                              lineHeight: 1.7,
                              color: "var(--ink2)",
                              fontFamily: "var(--U)",
                              marginBottom: "12px",
                            }}
                          >
                            Type the verse from memory:
                          </p>
                          <textarea
                            value={recallInputs[verse.ref] || ""}
                            onChange={(e) =>
                              handleRecallInput(verse.ref, e.target.value)
                            }
                            placeholder="Type the verse here..."
                            rows={4}
                            style={{
                              width: "100%",
                              padding: "16px",
                              fontSize: "16px",
                              fontFamily: "var(--U)",
                              color: "var(--ink)",
                              background: "var(--bone)",
                              border: "1px solid var(--border)",
                              borderRadius: "6px",
                              outline: "none",
                              resize: "vertical",
                              lineHeight: 1.7,
                              boxSizing: "border-box",
                            }}
                          />
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              marginTop: "12px",
                              flexWrap: "wrap",
                              alignItems: "center",
                            }}
                          >
                            <button
                              onClick={() =>
                                checkRecall(verse.ref, verse.text)
                              }
                              style={{
                                padding: "10px 20px",
                                background: "var(--mustard)",
                                color: "var(--ink)",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "13px",
                                fontWeight: 600,
                                fontFamily: "var(--U)",
                                cursor: "pointer",
                              }}
                            >
                              Check
                            </button>
                            <button
                              onClick={() =>
                                setShowAnswer((prev) => ({
                                  ...prev,
                                  [verse.ref]: !prev[verse.ref],
                                }))
                              }
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "10px 20px",
                                background: "var(--bone)",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "13px",
                                fontWeight: 600,
                                fontFamily: "var(--U)",
                                color: "var(--ink2)",
                                cursor: "pointer",
                              }}
                            >
                              {answerVisible ? (
                                <EyeOff size={14} />
                              ) : (
                                <Eye size={14} />
                              )}
                              {answerVisible
                                ? "Hide Answer"
                                : "Show Answer"}
                            </button>
                            {recallResult !== null &&
                              recallResult !== undefined && (
                                <span
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 700,
                                    fontFamily: "var(--U)",
                                    color: recallResult
                                      ? "var(--mustard)"
                                      : "#c0392b",
                                  }}
                                >
                                  {recallResult
                                    ? "Well done. The word is taking root."
                                    : "Not quite. Keep working at it."}
                                </span>
                              )}
                          </div>
                          {answerVisible && (
                            <p
                              style={{
                                fontSize: "15px",
                                lineHeight: 1.8,
                                color: "var(--ink2)",
                                fontFamily: "var(--F)",
                                fontStyle: "italic",
                                maxWidth: "68ch",
                                marginTop: "12px",
                                marginBottom: 0,
                                padding: "16px",
                                background: "var(--bone)",
                                borderRadius: "6px",
                              }}
                            >
                              "{verse.text}"
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty state for category grid */}
          {!selectedCategory && (
            <div
              style={{
                textAlign: "center",
                padding: "32px",
                color: "var(--ink2)",
                marginTop: "24px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  maxWidth: "50ch",
                  margin: "0 auto",
                }}
              >
                Select a category to begin. Each contains five verses with four
                practice modes: full text, first-letter hints, fill-in-the-blank,
                and full recall from memory.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
