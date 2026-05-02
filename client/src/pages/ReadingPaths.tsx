import { useLocation } from "wouter";
import { SEOMeta } from "@/components/SEOMeta";
import Layout from "@/components/Layout";

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
        title: "Your Marriage Is a Ministry Too",
        slug: "your-marriage-is-ministry-too",
        description:
          "Why the covenant you made before God is not secondary to the work you do for God.",
        readTime: "7 min read",
      },
      {
        title: "Protecting Your Marriage When Ministry Demands Everything",
        slug: "protecting-marriage-ministry-demands",
        description:
          "The pastor's marriage is the first casualty of an unexamined theology of availability.",
        readTime: "9 min read",
      },
      {
        title: "What Your Spouse Wishes You Knew About Life in the Parsonage",
        slug: "spouse-wishes-knew-parsonage",
        description:
          "The perspective your partner carries but rarely voices — and what they need from you.",
        readTime: "8 min read",
      },
      {
        title: "How to Be Present at Home When Your Mind Never Leaves the Church",
        slug: "present-at-home-mind-never-leaves",
        description:
          "The challenge of mental disengagement and practical rhythms for genuine presence.",
        readTime: "8 min read",
      },
      {
        title: "Conflict Is Not Failure",
        slug: "conflict-is-not-failure",
        description:
          "What every couple misreads about disagreement — and what repair actually requires.",
        readTime: "6 min read",
      },
      {
        title: "The Examined Life",
        slug: "the-examined-life",
        description:
          "Before you can be honest with another person, you must be honest with yourself.",
        readTime: "7 min read",
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
        title: "The Monster in the Mirror",
        slug: "the-monster-in-the-mirror",
        description:
          "Why every generation gets the Bible wrong, why yours is no different, and what to do about it.",
        readTime: "9 min read",
      },
      {
        title: "You Are Not the Exception",
        slug: "you-are-not-the-exception",
        description:
          "Understanding biblical interpretation — and the humility it demands of every reader.",
        readTime: "9 min read",
      },
      {
        title: "Truth in a Post-Truth World",
        slug: "truth-in-post-truth-world",
        description:
          "What happens to faith when the culture no longer agrees that truth is even possible.",
        readTime: "7 min read",
      },
      {
        title: "The Holy Spirit Is Not a Feeling",
        slug: "holy-spirit-not-feeling",
        description:
          "Separating the work of God from the emotional experiences we have confused with it.",
        readTime: "8 min read",
      },
      {
        title: "The Incarnation Changes Everything",
        slug: "incarnation-changes-everything",
        description:
          "Why God became human — and why that fact remakes every category you thought you understood.",
        readTime: "8 min read",
      },
      {
        title: "The Hope of Resurrection",
        slug: "hope-of-resurrection",
        description:
          "Not a metaphor. Not a feeling. The claim that makes Christianity either true or absurd.",
        readTime: "8 min read",
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
        title: "Why Pastors Quit (And How to Stay)",
        slug: "why-pastors-quit-and-how-to-stay",
        description:
          "The real reasons pastors leave — and what structures keep them in ministry long-term.",
        readTime: "9 min read",
      },
      {
        title: "The Slow Burn: How Ministry Exhaustion Sneaks Up on You",
        slug: "slow-burn-ministry-exhaustion",
        description:
          "Burnout is not a moment. It is a process — invisible, cumulative, and nearly always denied until too late.",
        readTime: "9 min read",
      },
      {
        title: "The Hidden Pain of the Successful Pastor",
        slug: "hidden-pain-successful-pastor",
        description:
          "Success in ministry creates a peculiar kind of isolation that no one warns you about.",
        readTime: "8 min read",
      },
      {
        title: "The Danger of Pastoral Isolation",
        slug: "danger-pastoral-isolation",
        description:
          "What happens when the person everyone leans on has no one to lean on.",
        readTime: "7 min read",
      },
      {
        title: "It's Okay to See a Counselor",
        slug: "okay-to-see-counselor",
        description:
          "Why professional help is not a failure of faith — and why pastors resist it anyway.",
        readTime: "8 min read",
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
        title: "The Pastor's Kids Are Watching — What Are They Seeing?",
        slug: "pastors-kids-watching-what-seeing",
        description:
          "Pastoral children inherit both the gifts and the wounds of their parent's calling.",
        readTime: "8 min read",
      },
      {
        title: "The Kingdom of God Is Not What You Think It Is",
        slug: "kingdom-of-god-not-what-you-think",
        description:
          "Teaching children a kingdom vision that outlasts the culture wars.",
        readTime: "7 min read",
      },
      {
        title: "The Psalms as Prayer — Not Just Poetry",
        slug: "psalms-as-prayer-not-poetry",
        description:
          "How to give your children a prayer language that includes lament, rage, and wonder.",
        readTime: "6 min read",
      },
      {
        title: "Eschatology Matters — Why the End Shapes How We Live Now",
        slug: "eschatology-matters-end-shapes-now",
        description:
          "What you believe about the future shapes the children you raise for it.",
        readTime: "7 min read",
      },
      {
        title: "Sabbath Is Resistance",
        slug: "sabbath-is-resistance",
        description:
          "Teaching rest as a theological act in a culture that measures worth by productivity.",
        readTime: "7 min read",
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
          "A reckoning with the history the church would rather not own.",
        readTime: "8 min read",
      },
      {
        title: "Justice Is Not a Political Category: It Is a Theological One",
        slug: "justice-not-political-theological",
        description:
          "How the word that appears four hundred times in Scripture became a partisan signal.",
        readTime: "7 min read",
      },
      {
        title: "Complicity Is Not Innocence",
        slug: "complicity-not-innocence",
        description:
          "What silence costs the witness — and the people the silence abandons.",
        readTime: "6 min read",
      },
      {
        title: "Mishpat and Tsedaqah",
        slug: "mishpat-tsedaqah",
        description:
          "Two Hebrew words that capture the fullness of biblical justice. The church has flattened both.",
        readTime: "5 min read",
      },
      {
        title: "The Prophetic Pastor",
        slug: "prophetic-pastor",
        description:
          "The pastor is called to name injustice and advocate for the vulnerable. This is not optional.",
        readTime: "8 min read",
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
              color: "var(--bone)",
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
              color: "var(--bone)",
              opacity: 0.6,
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            Five curated sequences of essays — each one built for a specific
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
              color: "var(--charcoal)",
              marginBottom: "2.5rem",
              textAlign: "center",
            }}
          >
            Choose your path
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {READING_PATHS.map((path) => (
              <button
                key={path.id}
                onClick={() => scrollToPath(path.id)}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(26, 26, 26, 0.08)",
                  borderRadius: "2px",
                  padding: "1.75rem",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
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
                    fontFamily: "var(--U)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--mustard)",
                  }}
                >
                  PATH {path.id}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--F)",
                    fontSize: "1.25rem",
                    fontWeight: 400,
                    color: "var(--charcoal)",
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
              </button>
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
                  color: "var(--mustard)",
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
                  color: "var(--charcoal)",
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
                          color: "var(--mustard)",
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
                            color: "var(--charcoal)",
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
                    color: "var(--bone)",
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
              color: "var(--bone)",
              marginBottom: "1rem",
            }}
          >
            Not sure where to begin?
          </h2>
          <p
            style={{
              fontFamily: "var(--U)",
              fontSize: "0.875rem",
              color: "var(--bone)",
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
              color: "var(--charcoal)",
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
