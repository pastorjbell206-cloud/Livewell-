import { Link } from "wouter";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Star, Mail, ChevronRight } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const { user } = useAuth();
  const [emailInput, setEmailInput] = useState("");
  const [devotionalEmail, setDevotionalEmail] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { data: articles } = trpc.posts.listPublished.useQuery();

  const FEATURED_ARTICLES = [
    "The Difference Between Being Tired and Being Done",
    "What Pastors Fear Most (That They Never Say Out Loud)",
    "The Slow Drift That Ends More Marriages Than Dramatic Betrayal Does",
    "When the Church Married Empire",
    "Sabbath as Resistance: Why Resting Is a Radical Act",
    "The Resentment in Your Marriage Is Telling You Something Worth Hearing",
    "What the Bible Actually Says About Submission â and What It Doesn't",
    "When One Spouse Carries the Emotional Labor and the Other Doesn't Know It",
    "How to Pastor a Congregation That Is Politically Divided",
    "What a Consistent Pro-Life Ethic Requires Beyond Opposition to Abortion",
    "When Fear Rewrites Theology",
    "The Dark Night of the Soul â When God Feels Absent and You Still Have to Preach",
    "Protecting Your Marriage When Ministry Demands Everything",
    "Why Pastors Quit (And How to Stay)",
    "The Hidden Pain of the Successful Pastor",
    "When the Church Becomes a Political Brand",
    "The Conversation You Need to Have With Yourself About Money",
    "The Pastor's Kids Are Watching â What Are They Seeing?",
    "When You Married Someone You No Longer Recognize",
    "Your Church Needs You Healthy More Than It Needs You Busy"
  ];

  const filteredArticles = articles?.filter((a: any) => 
    FEATURED_ARTICLES.includes(a.title)
  ) || [];

  const TESTIMONIALS = [
    {
      quote: "I was six months from walking away from ministry entirely. James's writing on pastoral exhaustion named what I was experiencing better than any counsellor had. The essay on the difference between being tired and being done gave me language for something I couldn't articulate. I'm still in the pulpit. That matters.",
      name: "Pastor M.T.",
      role: "Lead Pastor, Midwest",
      rating: 5
    },
    {
      quote: "I've read a lot of Christian leadership content. Most of it is thin. James writes with theological weight and pastoral honesty that I rarely find in the same place. I send his articles to my staff team. They reference them in elder meetings.",
      name: "Rev. D.K.",
      role: "Senior Pastor, Southeast US",
      rating: 5
    },
    {
      quote: "My husband and I were in a season where we were living like roommates and calling it fine. The article on emotional labor in marriage was the first time either of us could name what was actually happening. We talked for three hours after reading it. We're in a completely different place now.",
      name: "S.L.",
      role: "Married 11 years, Pacific Northwest",
      rating: 5
    },
    {
      quote: "We were weeks away from separating. A friend forwarded the article on the slow drift in marriage. We still needed counselling â but this was the first thing that made us both feel understood rather than accused. We're still together and genuinely happy.",
      name: "Anonymous couple",
      role: "Submitted via email",
      rating: 5
    },
    {
      quote: "James writes about justice the way it should be written â Scripture in one hand, honest reckoning in the other. No sloganeering, no tribalism. Just the careful thinking the church desperately needs. I assign his articles to our church leaders.",
      name: "Pastor J.W.",
      role: "Church planter, Urban Northeast",
      rating: 5
    },
    {
      quote: "I found LiveWell during a crisis of faith. I wasn't sure I believed anything anymore. The theological depth here â real engagement with the text, real honesty about doubt â gave me somewhere to stand. I'm still wrestling. But toward something now, not away from it.",
      name: "R.H.",
      role: "Seminary graduate, Texas",
      rating: 5
    }
  ];

  const CATEGORIES = [
    { icon: "ð", name: "Theological Depth", color: "#2D4A3E", description: "Greek, Hebrew, church history, and the hard questions â translated for real life.", count: "80+" },
    { icon: "âï¸", name: "Justice", color: "#8B4545", description: "The places where the church has been silent when it should have spoken.", count: "65+" },
    { icon: "ðï¸", name: "Pastoral Ministry", color: "#6B8E6F", description: "The hidden weight of leading God's people â burnout, preaching, conflict, and the soul beneath the calling.", count: "90+" },
    { icon: "ð", name: "Marriage", color: "#B8963E", description: "Covenant, conflict, intimacy, and the long haul â the conversations most couples never have.", count: "50+" },
    { icon: "ð¨âð©âð§", name: "Parenting", color: "#9B8BA8", description: "Faith formation, discipline, technology, and loving your children well through every season.", count: "40+" },
    { icon: "ð°", name: "Finances & Generosity", color: "#6B9B8B", description: "Biblical stewardship and the theology beneath every financial decision you make.", count: "30+" },
    { icon: "ð¯ï¸", name: "Devotionals", color: "#8B9B6F", description: "Short, substantive daily readings rooted in Scripture â for individuals, couples, and groups.", count: "Daily" }
  ];

  const AUDIENCES = [
    { icon: "ðï¸", name: "Pastors", description: "Burnout, preaching, staff culture, and the soul beneath the calling. For those carrying the weight of leading God's people.", link: "/for-pastors" },
    { icon: "ð§­", name: "Leaders", description: "Vision, character formation, and the interior work that makes leadership worth following. Not management techniques â genuine formation.", link: "/for-leaders" },
    { icon: "ð¡", name: "Families", description: "Marriage, parenting, and finances â theology that actually works at the kitchen table and in the bedroom and in the budget meeting.", link: "/for-families" },
    { icon: "ð", name: "Seekers", description: "For those with questions, doubts, and a growing sense that faith should be more than they've been given so far.", link: "/for-seekers" },
    { icon: "ð¥", name: "Small Groups", description: "Discussion guides, reading paths, and devotionals built to help groups go deeper together.", link: "/for-small-groups" }
  ];

  return (
    <div style={{ background: "#F7F5F0" }}>
      <MinimalNav />

      {/* HERO SECTION */}
      <section style={{
        background: "#2D4A3E",
        color: "#F7F5F0",
        padding: "60px 20px",
        display: "flex",
        alignItems: "center",
        gap: "80px",
        maxWidth: "1400px",
        margin: "0 auto",
        minHeight: "700px"
      }}>
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: "56px",
            fontWeight: "bold",
            lineHeight: "1.2",
            marginBottom: "24px",
            fontFamily: "Georgia, serif"
          }}>
            Connecting the depth of theology to the weight of everyday life.
          </h1>
          <p style={{
            fontSize: "16px",
            lineHeight: "1.8",
            marginBottom: "32px",
            color: "#D1C9BB"
          }}>
            Essays, devotionals, and resources on faith, marriage, justice, parenting, finances, and pastoral ministry â by James Bell, Lead Pastor, author of 25 books, and founder of the Pastors Connection Network.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
            <Link href="/writing" style={{ textDecoration: "none" }}>
              <button style={{
                background: "#B8963E",
                color: "#1A1A1A",
                border: "none",
                padding: "16px 32px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "4px",
                cursor: "pointer",
                width: "100%",
                maxWidth: "300px"
              }}>
                Find Your Starting Point
              </button>
            </Link>
            <Link href="/pillars" style={{ textDecoration: "none" }}>
              <a style={{
                color: "#D4A84F",
                textDecoration: "none",
                fontSize: "14px",
                display: "inline-block"
              }}>
                Explore the 5 Pillars â
              </a>
            </Link>
          </div>
          <div style={{
            display: "flex",
            gap: "40px",
            fontSize: "14px",
            color: "#D1C9BB",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "24px"
          }}>
            <div>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#B8963E" }}>500+</div>
              <div>Articles</div>
            </div>
            <div>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#B8963E" }}>25</div>
              <div>Books</div>
            </div>
            <div>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#B8963E" }}>4,200+</div>
              <div>Weekly Readers</div>
            </div>
            <div>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#B8963E" }}>Free</div>
              <div>to Start</div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: "40px" }}>
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_4533_137f3486.jpeg"
            alt="James Bell"
            style={{
              borderRadius: "8px",
              width: "100%",
              maxWidth: "400px",
              objectFit: "cover",
              objectPosition: "center top",
              aspectRatio: "3/4"
            }}
          />
        </div>
      </section>

      {/* LEAD MAGNET */}
      <section style={{
        background: "#2D4A3E",
        color: "#F7F5F0",
        padding: "60px 20px",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", color: "#B8963E", marginBottom: "12px" }}>
            FREE DOWNLOAD
          </div>
          <h2 style={{
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: "12px",
            fontFamily: "Georgia, serif"
          }}>
            The Complete Guide to the 5 Pillars Framework
          </h2>
          <p style={{
            fontSize: "16px",
            color: "#D1C9BB",
            marginBottom: "32px"
          }}>
            Understand the framework that organises all 500+ articles on LiveWell.
          </p>
          <div style={{ display: "flex", gap: "12px", maxWidth: "500px", margin: "0 auto" }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              style={{
                flex: 1,
                padding: "12px 16px",
                border: "none",
                borderRadius: "4px",
                fontSize: "14px"
              }}
            />
            <button style={{
              background: "#B8963E",
              color: "#1A1A1A",
              border: "none",
              padding: "12px 24px",
              fontSize: "14px",
              fontWeight: "bold",
              borderRadius: "4px",
              cursor: "pointer",
              whiteSpace: "nowrap"
            }}>
              Send Me the Guide â
            </button>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE - 5 CARDS */}
      <section style={{
          background: "linear-gradient(135deg, #2D4A3E 0%, #1A2E22 100%)",
          color: "#F7F5F0",
          padding: "80px 20px"
        }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <h2 style={{
          fontSize: "36px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "60px",
          fontFamily: "Georgia, serif",
          color: "#F7F5F0"
        }}>
          Who We Serve
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "40px"
        }}>
          {AUDIENCES.map((aud, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.08)",
              color: "#F7F5F0",
              padding: "32px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              flexDirection: "column"
            }}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>{aud.icon}</div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "12px",
                color: "#F7F5F0"
              }}>
                {aud.name}
              </h3>
              <p style={{
                fontSize: "14px",
                lineHeight: "1.6",
                color: "#D1C9BB",
                marginBottom: "16px",
                flex: 1
              }}>
                {aud.description}
              </p>
              <Link href={aud.link} style={{ textDecoration: "none" }}>
                <a style={{
                  color: "#B8963E",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "bold"
                }}>
                  Explore â
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
        </section>

      {/* EXPLORE BY TOPIC - 7 CARDS */}
      <section style={{
        background: "#F0EDE5",
        padding: "80px 20px"
      }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: "60px",
            fontFamily: "Georgia, serif"
          }}>
            Explore by Topic
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "32px"
          }}>
            {CATEGORIES.map((cat, i) => (
              <div key={i} style={{
                background: "#FFF",
                borderRadius: "8px",
                overflow: "hidden",
                border: `4px solid ${cat.color}`,
                borderLeft: `8px solid ${cat.color}`,
                padding: "24px"
              }}>
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>{cat.icon}</div>
                <h3 style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "8px",
                  color: "#1A1A1A"
                }}>
                  {cat.name}
                </h3>
                <p style={{
                  fontSize: "13px",
                  lineHeight: "1.6",
                  color: "#6B7280",
                  marginBottom: "12px"
                }}>
                  {cat.description}
                </p>
                <div style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: cat.color
                }}>
                  {cat.count} articles
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLES - TABBED GRID */}
      <section style={{
          background: "#F0EDE6",
          color: "#1C1510",
          padding: "80px 20px"
        }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <h2 style={{
          fontSize: "36px",
          fontWeight: "bold",
          marginBottom: "40px",
          fontFamily: "Georgia, serif",
          color: "#1C1510"
        }}>
          Featured Essays
        </h2>
        
        {/* Tabs */}
        <div style={{
          display: "flex",
          gap: "24px",
          marginBottom: "40px",
          borderBottom: "1px solid #C8BFB0",
          paddingBottom: "16px",
          overflowX: "auto"
        }}>
          {['All', 'Pastoral', 'Marriage', 'Justice', 'Theology', 'Finances'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              style={{
                padding: "8px 0",
                background: "none",
                border: "none",
                borderBottom: activeTab === tab.toLowerCase() ? "3px solid #B8963E" : "none",
                color: activeTab === tab.toLowerCase() ? "#B8963E" : "#1C1510",
                fontWeight: activeTab === tab.toLowerCase() ? "bold" : "normal",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap"
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "32px"
        }}>
          {filteredArticles.slice(0, 20).filter((article: any) => {
            if (activeTab === 'all') return true;
            return article.topic?.toLowerCase() === activeTab;
          }).map((article: any, i: number) => (
            <Link key={i} href={`/writing/${article.slug}`} style={{ textDecoration: "none" }}>
              <div style={{
                background: "#FFF",
                padding: "24px",
                borderRadius: "8px",
                border: "1px solid #E0D9CC",
                cursor: "pointer",
                transition: "all 0.3s",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}>
                <div style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#B8963E",
                  marginBottom: "8px"
                }}>
                  {article.topic?.toUpperCase()}
                </div>
                <h3 style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "8px",
                  color: "#1A1A1A",
                  flex: 1
                }}>
                  {article.title}
                </h3>
                <div style={{
                  fontSize: "12px",
                  color: "#6B7280"
                }}>
                  {article.readTime || "5 min read"}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link href="/writing" style={{ textDecoration: "none" }}>
            <a style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 32px",
              background: "#1A1A1A",
              color: "#F7F5F0",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
              textDecoration: "none"
            }}>
              Browse All Articles â
            </a>
          </Link>
        </div>
      </div>
        </section>

      {/* TESTIMONIALS */}
      <section style={{
        background: "#2D4A3E",
        color: "#F7F5F0",
        padding: "80px 20px"
      }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: "12px",
            textAlign: "center",
            fontFamily: "Georgia, serif"
          }}>
            What readers are saying
          </h2>
          <p style={{
            fontSize: "16px",
            textAlign: "center",
            color: "#D1C9BB",
            marginBottom: "60px"
          }}>
            Pastors, leaders, couples, and seekers from across the community.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px"
          }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.05)",
                padding: "32px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)"
              }}>
                <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={16} fill="#B8963E" color="#B8963E" />
                  ))}
                </div>
                <p style={{
                  fontSize: "14px",
                  lineHeight: "1.8",
                  marginBottom: "16px",
                  fontStyle: "italic"
                }}>
                  "{t.quote}"
                </p>
                <div style={{ fontSize: "12px" }}>
                  <div style={{ fontWeight: "bold" }}>{t.name}</div>
                  <div style={{ color: "#D1C9BB" }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKS PREVIEW */}
      <section style={{
        background: "#1A1A1A",
        color: "#F7F5F0",
        padding: "80px 20px"
      }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: "60px",
            fontFamily: "Georgia, serif"
          }}>
            25 Books by James Bell
          </h2>
          <div style={{
            display: "flex",
            gap: "24px",
            overflowX: "auto",
            paddingBottom: "20px",
            marginBottom: "40px"
          }}>
            {["Dangerous Calling", "The Hidden Life", "The First Flock", "Preach the Word", "The Undershepherd", "The Unfinished Church"].map((book, i) => (
              <div key={i} style={{
                minWidth: "180px",
                background: "#2D4A3E",
                padding: "16px",
                borderRadius: "8px",
                textAlign: "center",
                fontSize: "14px"
              }}>
                {book}
              </div>
            ))}
          </div>
          <Link href="/books" style={{ textDecoration: "none" }}>
            <button style={{
              background: "#B8963E",
              color: "#1A1A1A",
              border: "none",
              padding: "12px 24px",
              fontSize: "14px",
              fontWeight: "bold",
              borderRadius: "4px",
              cursor: "pointer"
            }}>
              View All 25 Books â
            </button>
          </Link>
        </div>
      </section>

      {/* DEVOTIONAL STRIP */}
      <section style={{
        background: "#2D4A3E",
        color: "#F7F5F0",
        padding: "60px 20px",
        display: "flex",
        gap: "60px",
        maxWidth: "1400px",
        margin: "0 auto",
        alignItems: "center"
      }}>
        <div style={{ flex: 1 }}>
          <h2 style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "16px",
            fontFamily: "Georgia, serif"
          }}>
            Start every morning rooted.
          </h2>
          <p style={{
            fontSize: "14px",
            lineHeight: "1.8",
            marginBottom: "24px",
            color: "#D1C9BB"
          }}>
            A short, substantive daily devotional â Scripture, honest reflection, and a prayer. Not inspiration content. Something with actual roots. Free to your inbox every morning.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={devotionalEmail}
              onChange={(e) => setDevotionalEmail(e.target.value)}
              style={{
                flex: 1,
                maxWidth: "300px",
                padding: "12px 16px",
                border: "none",
                borderRadius: "4px",
                fontSize: "14px"
              }}
            />
            <button style={{
              background: "#B8963E",
              color: "#1A1A1A",
              border: "none",
              padding: "12px 24px",
              fontSize: "14px",
              fontWeight: "bold",
              borderRadius: "4px",
              cursor: "pointer",
              whiteSpace: "nowrap"
            }}>
              Subscribe Free
            </button>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            background: "rgba(255,255,255,0.05)",
            padding: "32px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.1)"
          }}>
            <div style={{ fontSize: "12px", color: "#B8963E", fontWeight: "bold", marginBottom: "8px" }}>
              TODAY'S DEVOTIONAL
            </div>
            <h3 style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "12px"
            }}>
              The Weight of Witness
            </h3>
            <p style={{
              fontSize: "13px",
              lineHeight: "1.6",
              color: "#D1C9BB"
            }}>
              "You will receive power when the Holy Spirit comes on you; and you will be my witnesses..." â Acts 1:8
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section style={{
        background: "#F7F5F0",
        padding: "80px 20px",
        display: "flex",
        gap: "80px",
        maxWidth: "1400px",
        margin: "0 auto",
        alignItems: "center",
        minHeight: "600px"
      }}>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_4533_137f3486.jpeg"
            alt="James Bell"
            style={{
              borderRadius: "8px",
              width: "100%",
              maxWidth: "400px",
              objectFit: "cover",
              aspectRatio: "1"
            }}
          />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{
            fontSize: "12px",
            fontWeight: "bold",
            letterSpacing: "2px",
            color: "#B8963E",
            marginBottom: "12px"
          }}>
            ABOUT JAMES BELL
          </div>
          <p style={{
            fontSize: "24px",
            fontStyle: "italic",
            lineHeight: "1.6",
            marginBottom: "24px",
            color: "#1A1A1A",
            fontFamily: "Georgia, serif"
          }}>
            "I write for people who take faith seriously enough to let it cost them something."
          </p>
          <p style={{
            fontSize: "14px",
            lineHeight: "1.8",
            marginBottom: "16px",
            color: "#6B7280"
          }}>
            James Bell is the Lead Teaching Pastor at First Baptist Church of Fenton and founder of the Pastors Connection Network, connecting pastors across denominational lines around the gospel and kingdom advancement. He trains pastors globally, with particular focus on pastors in remote regions and indigenous tribes.
          </p>
          <p style={{
            fontSize: "14px",
            lineHeight: "1.8",
            marginBottom: "32px",
            color: "#6B7280"
          }}>
            His platform, LiveWell by James Bell, is built on a single conviction: American Christianity has domesticated the gospel. His writing exposes the comfortable assumptions, unexamined traditions, and systems that serve institutions more than people. He writes with theological depth, prophetic clarity, and pastoral honesty.
          </p>
          <div style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "32px"
          }}>
            {["Lead Pastor", "Author of 25 Books", "Pastors Network Founder", "Father of Five"].map((badge, i) => (
              <div key={i} style={{
                background: "#2D4A3E",
                color: "#F7F5F0",
                padding: "8px 16px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "bold"
              }}>
                {badge}
              </div>
            ))}
          </div>
          <Link href="/about" style={{ textDecoration: "none" }}>
            <button style={{
              background: "#B8963E",
              color: "#1A1A1A",
              border: "none",
              padding: "12px 24px",
              fontSize: "14px",
              fontWeight: "bold",
              borderRadius: "4px",
              cursor: "pointer",
              width: "fit-content"
            }}>
              Full Story â
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
