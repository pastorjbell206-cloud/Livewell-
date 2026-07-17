/**
 * Servant Leadership — the Leadership Formation pillar's conviction core
 * (/leadership/servant-leadership). The vision, the five principles, and the
 * nine biblical marks of a servant leader: the qualities the church neglected
 * because they cost the leader something. Self-contained content page.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Link } from "wouter";
import { SITE_URL } from "@/lib/site";

const wrap = { maxWidth: "var(--w-content)", margin: "0 auto" } as const;
const prose = { maxWidth: "var(--w-prose)", margin: "0 auto" } as const;
const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.18em", color: "var(--mustard-text)",
};

const PRINCIPLES: [string, string, string][] = [
  ["01", "The Root, Not the Symptom", "The collapse you see on Sunday began in a private decision no one witnessed. Form the root and the fruit follows."],
  ["02", "Towel Before Title", "Jesus handed His disciples a basin, not a corner office. Authority in the kingdom runs downward."],
  ["03", "Character Outpaces Gifting", "The gift will take a man further than his character can keep him. The fall is a character debt on a gifting loan."],
  ["04", "Reproduce, Do Not Retain", "The leader who cannot be replaced has failed at the one thing leaders are for. Build successors, not a following."],
  ["05", "Lead From the Wound, Not the Pedestal", "The leader who hides his failures cannot pastor anyone through theirs. Self-implication is the credential."],
];

interface Mark { n: number; title: string; anchor: string; neglected: string; conviction: string; diagnostic: string; verdict: string }
const MARKS: Mark[] = [
  { n: 1, title: "Serves Before He Leads", anchor: "John 13:3–5", neglected: "We taught leaders to take the head of the table, never the floor under it.", conviction: "Service is not the warm-up to authority. It is the exercise of it. The leader proves his right to lead by the basin in his hands before the title on his door.", diagnostic: "What is the lowly task my position has let me stop doing?", verdict: "The towel comes before the title." },
  { n: 2, title: "Leads by Character, Not Talent", anchor: "1 Timothy 3:1–7", neglected: "We screened resumes when God screened the man.", conviction: "Of twenty qualifications, one is a skill. The rest are character. A servant leader is examined at the level of his marriage, money, temper, and appetite — not his platform.", diagnostic: "Where is my gifting outrunning my character right now?", verdict: "Character is the only credential that lasts." },
  { n: 3, title: "Is a Person of Prayer", anchor: "Acts 6:4", neglected: "We let prayer become a public function and quit it as a private foundation.", conviction: "The servant leader guards prayer the way the apostles did — structurally, at the cost of disappointing legitimate needs. The leader who does not pray runs the church on human fuel, and everyone feels the difference without being able to name it.", diagnostic: "Is my prayer life what I would call adequate in anyone but myself?", verdict: "Lead from your knees or not at all." },
  { n: 4, title: "Shepherds People, Not Programs", anchor: "1 Peter 5:2–3", neglected: "We hired managers and called them shepherds.", conviction: "A servant leader knows the sheep by name, smells the wolf early, and goes after the one. He leads by example, not by domineering — because the flock belongs to God, not to him.", diagnostic: "Whose name and wound do I actually know this week?", verdict: "A crook, not a clipboard." },
  { n: 5, title: "Raises Up Other Leaders", anchor: "2 Timothy 2:2", neglected: "We built ministries that could not survive the man who built them.", conviction: "The servant leader measures success by the chain extending past him — leaders raising leaders he will never meet. The indispensable leader is a bottleneck with a halo.", diagnostic: "Who could carry this if I were removed today?", verdict: "Build successors, not a following." },
  { n: 6, title: "Welcomes Accountability", anchor: "Acts 20:28; Titus 1:5", neglected: "We let one man lead with no one positioned to tell him no.", conviction: "The New Testament never knows a solo elder. Plurality is not bureaucracy; it is protection. The servant leader wants the brothers who can stop him.", diagnostic: "Who has standing permission to tell me I am wrong?", verdict: "The unaccountable leader becomes the wolf." },
  { n: 7, title: "Is Honest About His Weakness", anchor: "2 Corinthians 4:7; 12:9", neglected: "We hid the leader's failures and called it strength.", conviction: "Treasure in jars of clay. The servant leader's honesty about his own brokenness is what lets him pastor others through theirs. The crack is where the treasure shows.", diagnostic: "What failure have I hidden that, named, could free someone?", verdict: "The wound is the credential." },
  { n: 8, title: "Shares Authority Instead of Hoarding It", anchor: "Philippians 2:5–8", neglected: "We accumulated authority when Christ distributed it.", conviction: "Worldly authority gathers; kingdom authority gives away. The servant leader holds power loosely, releases it early, and counts the people he has made unnecessary as the win.", diagnostic: "What power am I holding for my own security?", verdict: "Descent is the route up." },
  { n: 9, title: "Finishes Well", anchor: "Galatians 6:9; 2 Timothy 4:7", neglected: "We celebrated the launch and ignored the finish.", conviction: "A servant leader is built for decades, not seasons. He guards his soul, his marriage, and his pace so that he finishes the race instead of collapsing mid-stride and taking a congregation down with him.", diagnostic: "Am I building at a pace I could sustain for twenty more years?", verdict: "Faithful is the only finish line." },
];

const QUOTES = [
  "A leader is not built in the spotlight. He is built in the years no one was watching.",
  "We assumed the basin and platformed the gift.",
  "The gift will take you where your character cannot keep you.",
  "The towel was the throne the whole time.",
];

export default function ServantLeadership() {
  return (
    <Layout>
      <SEOMeta
        title="Servant Leadership in the Church: The 9 Biblical Marks"
        description="A biblical guide to servant leadership in the church: the nine marks of a servant leader, with Scripture and a diagnostic question for each. Free."
        url={`${SITE_URL}/leadership/servant-leadership`}
        structuredData={{
          "@context": "https://schema.org", "@type": "Article",
          headline: "Servant Leadership in the Church: The 9 Biblical Marks",
          author: { "@type": "Person", name: "James Bell" },
          url: `${SITE_URL}/leadership/servant-leadership`,
        }}
      />

      {/* HERO */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-7) var(--s-4) var(--s-6)" }}>
        <div style={prose}>
          <div style={{ ...eyebrow, color: "var(--mustard)" }}>
            <Link href="/leadership" style={{ color: "inherit", textDecoration: "none" }}>Leadership Formation</Link> · Servant leadership
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.2vw, 58px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", margin: "16px 0 14px", maxWidth: "16ch" }}>
            Developing Servant Leaders
          </h1>
          <p style={{ fontFamily: "var(--F)", fontSize: "21px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 24px" }}>
            Built to be used, not admired.
          </p>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "rgba(245,240,230,.82)", maxWidth: "62ch" }}>
            The church does not lack leaders. It lacks servants who lead. We assumed the basin and platformed the gift, and then acted surprised when the men we elevated could not carry the weight. These marks are not new. They are the ones we neglected because they cost the leader something.
          </p>
        </div>
      </section>

      {/* THESIS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={prose}>
          <p style={{ fontFamily: "var(--F)", fontSize: "26px", lineHeight: 1.4, color: "var(--ink)", margin: 0 }}>
            A servant leader is not a softer kind of boss. He is a different kind of authority — downward, costly, reproducible. He is not built in the spotlight. He is built in the years no one was watching.
          </p>
        </div>
      </section>

      {/* THE CURRICULUM */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div style={{ ...eyebrow, color: "var(--mustard)" }}>The curriculum</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.4vw, 34px)", fontWeight: 400, color: "var(--bone)", margin: "10px 0 8px" }}>A whole course on leading the church</h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "rgba(245,240,230,.8)", maxWidth: "62ch", margin: "0 0 var(--s-4)" }}>
            Read the book, run the guides, measure yourself against the marks. Free, and built to be used.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--s-3)" }}>
            {[
              { href: "/leadership/handbook", k: "The Handbook · a book", t: "The Servant Leadership Handbook", d: "Twelve chapters — from the towel and the throne to raising your replacement." },
              { href: "/leadership/guides", k: "The Lessons · 4 guides", t: "Training Guides", d: "Session-by-session: servant leadership, elders, deacons, developing leaders." },
              { href: "#marks", k: "The Framework", t: "The 9 Marks", d: "A diagnostic for every leader — and the conviction underneath each one." },
            ].map((c) => (
              <a key={c.href} href={c.href} style={{ display: "block", background: "var(--panel, #1d1b15)", border: "1px solid rgba(245,240,230,0.12)", padding: "var(--s-3)", textDecoration: "none" }}>
                <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "8px" }}>{c.k}</div>
                <div style={{ fontFamily: "var(--F)", fontSize: "21px", color: "var(--bone)", lineHeight: 1.2, marginBottom: "6px" }}>{c.t}</div>
                <div style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.55, color: "rgba(245,240,230,0.7)" }}>{c.d}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={wrap}>
          <div style={eyebrow}>The conviction</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.4vw, 34px)", fontWeight: 400, color: "var(--ink)", margin: "10px 0 var(--s-4)" }}>Five principles underneath the marks</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--s-3)" }}>
            {PRINCIPLES.map(([n, name, line]) => (
              <div key={n} style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "2px solid var(--mustard)", padding: "18px 20px" }}>
                <div style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 700, color: "var(--mustard-text)", letterSpacing: "0.1em" }}>{n}</div>
                <h3 style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", margin: "6px 0 8px", lineHeight: 1.2 }}>{name}</h3>
                <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)", margin: 0 }}>{line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE 9 MARKS */}
      <section id="marks" style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-7)", scrollMarginTop: "80px" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div style={eyebrow}>The framework</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", margin: "10px 0 var(--s-5)" }}>
            The nine marks of a servant leader
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-4)" }}>
            {MARKS.map((m) => (
              <article key={m.n} style={{ background: "var(--card)", border: "1px solid var(--border)", borderLeft: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
                <div style={{ display: "flex", gap: "16px", alignItems: "baseline", marginBottom: "10px" }}>
                  <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 700, color: "var(--mustard-text)" }}>{String(m.n).padStart(2, "0")}</span>
                  <h3 style={{ fontFamily: "var(--F)", fontSize: "25px", fontWeight: 500, color: "var(--ink)", margin: 0, lineHeight: 1.15 }}>{m.title}</h3>
                </div>
                <div style={{ fontFamily: "var(--U)", fontSize: "12px", letterSpacing: "0.06em", color: "var(--ink-muted)", marginBottom: "14px" }}>{m.anchor}</div>
                <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", margin: "0 0 12px" }}>{m.conviction}</p>
                <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", fontStyle: "italic", margin: "0 0 14px" }}>What we neglected: {m.neglected}</p>
                <div style={{ background: "var(--bone-warm)", borderRadius: "var(--radius-sm)", padding: "12px 16px", marginBottom: "12px" }}>
                  <span style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--mustard-text)" }}>Ask yourself</span>
                  <p style={{ fontFamily: "var(--F)", fontSize: "18px", fontStyle: "italic", color: "var(--ink)", margin: "4px 0 0", lineHeight: 1.4 }}>{m.diagnostic}</p>
                </div>
                <p style={{ fontFamily: "var(--F)", fontSize: "17px", fontWeight: 500, color: "var(--mustard-text)", margin: 0 }}>{m.verdict}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTES + NEXT STEP */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={prose}>
          <div style={{ display: "grid", gap: "22px", marginBottom: "var(--s-5)" }}>
            {QUOTES.map((q, i) => (
              <p key={i} style={{ fontFamily: "var(--F)", fontSize: "23px", fontStyle: "italic", lineHeight: 1.4, color: "var(--bone)", margin: 0, paddingLeft: "20px", borderLeft: "3px solid var(--mustard)" }}>{q}</p>
            ))}
          </div>
          <p style={{ fontFamily: "var(--F)", fontSize: "24px", color: "var(--mustard)", margin: "0 0 24px" }}>Character is the only competence that lasts.</p>
          <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>
            <Link href="/leadership/guides" style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--bone)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "3px" }}>
              Train your leaders → the free guides
            </Link>
            <Link href="/leadership" style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--bone)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "3px" }}>
              More for pastors → the Leadership Hub
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
