import { Link, useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { SEOMeta } from "@/components/SEOMeta";
import { GeneratedCover, coverThemeFor } from "@/components/GeneratedCover";
import { READING_PATHS as CANONICAL_PATHS, availableCount } from "@/lib/readingPaths";

interface PathArticle {
  title: string;
  slug: string;
  description: string;
  readTime: string;
}

interface ReadingPath {
  id: number;
  title: string;
  introduction: string;
  estimatedTime: string;
  articles: PathArticle[];
}

const READING_PATHS: ReadingPath[] = [
  {
    id: 1,
    title: "When Your Marriage Is Drifting",
    introduction:
      "This path is for the person who has not given up but who has noticed the distance — the silence at dinner, the resentment that calcified so slowly neither of you can name when it started. These essays will not fix your marriage. They will name what is actually happening, which is where repair begins.",
    estimatedTime: "45 minutes of reading that could change the next 40 years",
    articles: [
      {
        title: "Why Do Married Couples Slowly Drift Apart?",
        slug: "the-slow-drift-that-ends-marriages",
        description:
          "No one signs the divorce papers because of a single Tuesday.",
        readTime: "10 min read",
      },
      {
        title: "What Silence Actually Costs a Marriage",
        slug: "what-silence-costs-a-marriage",
        description:
          "The marriage rarely dies in the fight.",
        readTime: "11 min read",
      },
      {
        title: "What the Resentment in Your Marriage Is Telling You",
        slug: "the-resentment-in-your-marriage",
        description:
          "Resentment is not the rot in your marriage.",
        readTime: "10 min read",
      },
      {
        title: "How Do You Forgive Without Pretending It Didn't Happen?",
        slug: "forgiveness-without-pretending",
        description:
          "Most of what we call forgiveness in marriage is pretending.",
        readTime: "10 min read",
      },
    ],
  },
  {
    id: 2,
    title: "Faith in Crisis — A Path Through Doubt",
    introduction:
      "You are not losing your faith. You are losing a version of it that could no longer hold the weight of your actual life. That process is disorienting and sometimes terrifying, but it is not the same as abandonment — and these essays refuse to treat it as though it is.",
    estimatedTime: "50 minutes that take the questions seriously",
    articles: [
      {
        title: "What If Christianity Is Wrong?",
        slug: "what-if-we-are-wrong",
        description:
          "The question arrives uninvited, usually at night: what if the whole thing is a story we told ourselves?",
        readTime: "10 min read",
      },
      {
        title: "When God Stops Making Sense",
        slug: "when-god-doesnt-make-sense",
        description:
          "We were sold a God who would add up.",
        readTime: "10 min read",
      },
      {
        title: "What to Do When God Feels Absent",
        slug: "dark-night-god-feels-absent",
        description:
          "The silence is not punishment and it is not your failure.",
        readTime: "10 min read",
      },
      {
        title: "How Does the Church Tell the Truth in a Post-Truth Age?",
        slug: "truth-in-post-truth-world",
        description:
          "Two members of the same church now carry two contradictory sets of facts about the same week.",
        readTime: "11 min read",
      },
      {
        title: "What Comes After Deconstruction of Your Faith?",
        slug: "excavation-not-demolition",
        description:
          "Demolition and excavation use the same tools, the pry bar, the shovel, the refusal to respect a wall just because it is standing.",
        readTime: "16 min read",
      },
    ],
  },
  {
    id: 3,
    title: "The Pastor Nobody Sees",
    introduction:
      "You preach every Sunday. Nobody preaches to you. These essays are written from inside the room, not from a safe distance — for the pastor carrying weight that the congregation will never know about.",
    estimatedTime: "40 minutes for the shepherd who needs shepherding",
    articles: [
      {
        title: "Why Are Pastors So Lonely in a Full Church?",
        slug: "the-loneliest-room-in-the-church",
        description:
          "The fullest building in town has one room where a man sits alone with everything he is not allowed to say.",
        readTime: "10 min read",
      },
      {
        title: "Who Pastors the Pastor When No One Checks In?",
        slug: "the-pastor-nobody-checks-on",
        description:
          "We built a vocation where the man who asks everyone how they are gets asked by no one.",
        readTime: "10 min read",
      },
      {
        title: "Why Do Pastors Treat Exhaustion as Faithfulness?",
        slug: "burnout-is-not-a-badge",
        description:
          "We turned exhaustion into a virtue and then wondered why our best men kept collapsing.",
        readTime: "10 min read",
      },
      {
        title: "When Ministry Is Quietly Killing Your Marriage",
        slug: "protecting-marriage-in-ministry",
        description:
          "The work that destroys a pastor's marriage looks exactly like faithfulness.",
        readTime: "10 min read",
      },
    ],
  },
  {
    id: 4,
    title: "Raising Children Who Think Theologically",
    introduction:
      "Every parent carries the same fear: that the faith you are trying to hand your children will not survive contact with the world they are inheriting. These essays do not promise a formula. They name what is at stake and what faithfulness looks like when you cannot control the outcome.",
    estimatedTime: "35 minutes for the parent who prays more than they plan",
    articles: [
      {
        title: "How Do You Raise Kids Who Think About Their Faith?",
        slug: "raising-kids-who-think",
        description:
          "We trained a generation to give the right answer and called it faith.",
        readTime: "10 min read",
      },
      {
        title: "How Do You Talk to Your Kids About Doubt?",
        slug: "teaching-kids-about-doubt",
        description:
          "You are waiting for your child to bring you their doubts.",
        readTime: "10 min read",
      },
      {
        title: "When Your Teenager Says They Don't Believe Anymore",
        slug: "teenager-losing-faith",
        description:
          "Your first instinct will be to win the argument.",
        readTime: "11 min read",
      },
      {
        title: "How a Father Shapes the Way a Child Sees God",
        slug: "the-father-wound-and-the-god-question",
        description:
          "Before your child can hear the word Father about God, they will have learned what the word means from you.",
        readTime: "11 min read",
      },
    ],
  },
  {
    id: 5,
    title: "Justice and the Kingdom — Where Faith Meets the World",
    introduction:
      "The church has been silent. These essays name what the silence cost. They trace the prophetic tradition from Amos to the present and refuse to let justice remain an abstraction.",
    estimatedTime: "55 minutes that will not let you look away",
    articles: [
      {
        title: "Where the Church Was Silent",
        slug: "where-church-was-silent",
        description:
          "The hardest case against the church is not an argument.",
        readTime: "11 min read",
      },
      {
        title: "Is Justice a Political Issue or a Theological One?",
        slug: "justice-not-political-theological",
        description:
          "Say the word \"justice\" in a mixed room and both tribes reach for it before anyone thinks about God.",
        readTime: "10 min read",
      },
      {
        title: "What Does the Bible Say About the Church and the Poor?",
        slug: "poor-not-ministry-category",
        description:
          "James grades the worship service at the door, Isaiah grades the fast by the hungry, and the one requirement Jerusalem attached to Paul's gospel was the poor.",
        readTime: "12 min read",
      },
      {
        title: "Why Does Charity Treat Symptoms and Not Causes?",
        slug: "symptoms-without-causes-charity",
        description:
          "We are good at the Saturday.",
        readTime: "12 min read",
      },
      {
        title: "Can a System Sin?",
        slug: "individual-sin-systemic-sin-2",
        description:
          "Say \"systemic sin\" in a deacons' meeting and count to three.",
        readTime: "12 min read",
      },
    ],
  },
];

export default function ReadingPaths() {
  const [, navigate] = useLocation();

  const scrollToPath = (id: number) => {
    const el = document.getElementById(`path-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <SEOMeta
        title="Reading Paths — LiveWell by James Bell"
        description="Five curated reading paths through marriage, doubt, pastoral life, parenting, and prophetic justice. Start where the weight is heaviest."
        keywords="reading paths, curated essays, marriage, doubt, pastoral burnout, parenting, justice, theology"
      />

      {/* HERO */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "6rem 1.5rem 5rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--U)",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--mustard)",
              marginBottom: "1.5rem",
            }}
          >
            READING PATHS
          </div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--charcoal-fg)",
              marginBottom: "1.5rem",
            }}
          >
            Start where the weight is heaviest
          </h1>
          <p
            style={{
              fontFamily: "var(--U)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "var(--charcoal-fg)",
              opacity: 0.6,
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            Curated sequences of essays — each one built for a specific
            season, a specific question, a specific kind of reader. Choose the
            path that names your situation. Read in order.
          </p>
        </div>
      </section>

      {/* PATH CARDS OVERVIEW */}
      <section style={{ background: "var(--bone)", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "1.75rem",
              fontWeight: 400,
              color: "var(--ink)",
              marginBottom: "2.5rem",
              textAlign: "center",
            }}
          >
            Choose your path
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
              gap: "1.25rem",
            }}
          >
            {READING_PATHS.map((path) => (
              <button
                key={path.id}
                onClick={() => scrollToPath(path.id)}
                style={{
                  background: "var(--card)",
                  border: "1px solid rgba(26, 26, 26, 0.08)",
                  borderRadius: "2px",
                  overflow: "hidden",
                  padding: 0,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  display: "flex",
                  gap: "1.25rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--mustard)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(26, 26, 26, 0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(26, 26, 26, 0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: "92px",
                    flexShrink: 0,
                    alignSelf: "flex-start",
                    aspectRatio: "3 / 4",
                    overflow: "hidden",
                  }}
                >
                  <GeneratedCover
                    title={path.title}
                    eyebrow="Reading Path"
                    variant={
                      coverThemeFor(`${path.title} ${path.introduction}`)
                        .variant
                    }
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    padding: "1.75rem 1.75rem 1.75rem 0",
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--U)",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--mustard-text)",
                    }}
                  >
                    PATH {path.id}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--F)",
                      fontSize: "1.25rem",
                      fontWeight: 400,
                      color: "var(--ink)",
                      lineHeight: 1.25,
                      margin: 0,
                    }}
                  >
                    {path.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--U)",
                      fontSize: "0.8rem",
                      color: "var(--ink-muted)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {path.articles.length} essays &middot; {path.estimatedTime}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* THE SIX PILLAR PATHS — the canonical ordered arcs through the library
          (lib/readingPaths.ts). Each links to its own page at
          /reading-paths/:slug; the themed collections below remain as they are. */}
      <section style={{ background: "var(--charcoal)", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--U)",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--mustard)",
              marginBottom: "1rem",
            }}
          >
            The pillar paths
          </div>
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "var(--charcoal-fg)",
              marginBottom: "0.9rem",
            }}
          >
            Six ordered arcs through the whole argument
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--charcoal-fg)", opacity: 0.7, maxWidth: "62ch", marginBottom: "2rem" }}>
            The themed collections below gather essays by subject. These six are different — each is a sequence, built to be read in order, tracing one pillar of the site's spine from diagnosis to formation.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.75rem" }}>
            {CANONICAL_PATHS.map((p) => (
              <Link
                key={p.slug}
                href={p.externalHref || `/reading-paths/${p.slug}`}
                style={{
                  display: "block",
                  padding: "1.1rem 1.2rem",
                  border: "1px solid rgba(244,241,234,0.16)",
                  textDecoration: "none",
                }}
              >
                <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "1.1rem", fontWeight: 400, color: "var(--charcoal-fg)", marginBottom: "0.3rem" }}>
                  {p.title}
                  <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle", marginLeft: "0.45rem", color: "var(--mustard)" }} />
                </span>
                <span style={{ display: "block", fontFamily: "var(--U)", fontSize: "0.75rem", letterSpacing: "0.06em", color: "var(--charcoal-fg)", opacity: 0.55 }}>
                  {p.externalHref ? "The book, in order" : `${availableCount(p)} essays in order`}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INDIVIDUAL PATH SECTIONS */}
      {READING_PATHS.map((path, index) => {
        const isAlternate = index % 2 === 1;
        return (
          <section
            key={path.id}
            id={`path-${path.id}`}
            style={{
              background: isAlternate
                ? "var(--bone-warm)"
                : "var(--bone)",
              padding: "5rem 1.5rem",
              scrollMarginTop: "2rem",
            }}
          >
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
              {/* Path number */}
              <div
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--mustard-text)",
                  marginBottom: "1rem",
                }}
              >
                PATH {path.id}
              </div>

              {/* Title */}
              <h2
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  marginBottom: "1.25rem",
                }}
              >
                {path.title}
              </h2>

              {/* Introduction */}
              <p
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  color: "var(--ink)",
                  maxWidth: "68ch",
                  marginBottom: "0.75rem",
                }}
              >
                {path.introduction}
              </p>

              {/* Estimated time */}
              <p
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "0.8rem",
                  color: "var(--ink-muted)",
                  marginBottom: "2.5rem",
                  fontStyle: "italic",
                }}
              >
                {path.estimatedTime}
              </p>

              {/* Article list */}
              <ol
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0",
                }}
              >
                {path.articles.map((article, i) => (
                  <li
                    key={article.slug}
                    style={{
                      borderTop:
                        i === 0
                          ? "1px solid rgba(26, 26, 26, 0.1)"
                          : "none",
                      borderBottom: "1px solid rgba(26, 26, 26, 0.1)",
                    }}
                  >
                    <a
                      href={`/writing/${article.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/writing/${article.slug}`);
                      }}
                      style={{
                        display: "flex",
                        gap: "1.25rem",
                        alignItems: "flex-start",
                        padding: "1.25rem 0",
                        textDecoration: "none",
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "0.75";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
                    >
                      {/* Number */}
                      <span
                        style={{
                          fontFamily: "var(--F)",
                          fontSize: "1.5rem",
                          fontWeight: 400,
                          color: "var(--mustard-text)",
                          lineHeight: 1,
                          minWidth: "1.75rem",
                          paddingTop: "0.15rem",
                        }}
                      >
                        {i + 1}
                      </span>

                      {/* Content */}
                      <div style={{ flex: 1 }}>
                        <h4
                          style={{
                            fontFamily: "var(--F)",
                            fontSize: "1.1rem",
                            fontWeight: 400,
                            color: "var(--ink)",
                            lineHeight: 1.3,
                            margin: "0 0 0.35rem 0",
                          }}
                        >
                          {article.title}
                        </h4>
                        <p
                          style={{
                            fontFamily: "var(--U)",
                            fontSize: "0.85rem",
                            color: "var(--ink-muted)",
                            lineHeight: 1.6,
                            margin: 0,
                          }}
                        >
                          {article.description}
                        </p>
                      </div>

                      {/* Read time */}
                      <span
                        style={{
                          fontFamily: "var(--U)",
                          fontSize: "0.7rem",
                          color: "var(--ink-muted)",
                          whiteSpace: "nowrap",
                          paddingTop: "0.25rem",
                        }}
                      >
                        {article.readTime}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>

              {/* Begin CTA */}
              <div style={{ marginTop: "2rem" }}>
                <a
                  href={`/writing/${path.articles[0].slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/writing/${path.articles[0].slug}`);
                  }}
                  style={{
                    display: "inline-block",
                    padding: "0.85rem 2rem",
                    background: "var(--charcoal)",
                    color: "var(--charcoal-fg)",
                    fontFamily: "var(--U)",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    borderRadius: "2px",
                    textDecoration: "none",
                    transition: "background 0.2s",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--charcoal-soft)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--charcoal)";
                  }}
                >
                  Begin this path
                </a>
              </div>
            </div>
          </section>
        );
      })}

      {/* CLOSING SECTION */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "4rem 1.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "1.5rem",
              fontWeight: 400,
              color: "var(--charcoal-fg)",
              marginBottom: "1rem",
            }}
          >
            Not sure where to begin?
          </h2>
          <p
            style={{
              fontFamily: "var(--U)",
              fontSize: "0.875rem",
              color: "var(--charcoal-fg)",
              opacity: 0.5,
              marginBottom: "2rem",
              lineHeight: 1.7,
            }}
          >
            Start with the path that names the thing you are already carrying.
            There is no wrong door.
          </p>
          <a
            href="/writing"
            onClick={(e) => {
              e.preventDefault();
              navigate("/writing");
            }}
            style={{
              display: "inline-block",
              padding: "0.85rem 2rem",
              background: "var(--bone)",
              color: "var(--ink)",
              fontFamily: "var(--U)",
              fontSize: "0.85rem",
              fontWeight: 500,
              borderRadius: "2px",
              textDecoration: "none",
              transition: "opacity 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.85";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            Browse all essays
          </a>
        </div>
      </section>
    </>
  );
}
