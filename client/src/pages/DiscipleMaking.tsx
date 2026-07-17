/**
 * Disciple-Making hub (/disciple-making). Ties together the disciple-making
 * thread of the Integrated Life library and points the ordinary believer to a
 * way of making disciples that needs no program, no degree, and no building:
 * a table, a living room, a few people, and time. Leads into the Start a Table
 * tool (/tools/discipleship-table).
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Link } from "wouter";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface PathItem {
  slug: string;
  title: string;
  blurb: string;
  href: string;
}

// The disciple-making path, in the order a person would actually walk it.
const PATH: PathItem[] = [
  {
    slug: "discipleship-following-jesus",
    title: "Start here: Following Jesus",
    blurb: "Discipleship is a long apprenticeship, not a decision you filed away. Why so many believers stall, and how a person is actually changed.",
    href: "/life/discipleship-following-jesus",
  },
  {
    slug: "consumer-faith-and-the-communal-church",
    title: "How we forgot to make disciples",
    blurb: "American individualism and consumer Christianity made crowds of attenders and few disciples. The ancient church did it another way, and so can you.",
    href: "/life/consumer-faith-and-the-communal-church",
  },
  {
    slug: "the-living-room-and-the-ordinary-disciple",
    title: "You are qualified",
    blurb: "Disciple-making is not for professionals. It happens in living rooms, over coffee, in ordinary conversation. You do not need a curriculum. You need a life to share.",
    href: "/life/the-living-room-and-the-ordinary-disciple",
  },
  {
    slug: "making-disciples-at-the-table",
    title: "Making disciples at the table",
    blurb: "Jesus made disciples over meals, in homes, around tables. The most natural place on earth to form a person in Christ, and how to start one this week.",
    href: "/life/making-disciples-at-the-table",
  },
  {
    slug: "spiritual-friendship-and-the-long-walk",
    title: "One to one, over coffee",
    blurb: "Disciple-making one person at a time, through ordinary spiritual friendship, on a walk, across years. A literal how-to for walking one other person toward Jesus.",
    href: "/life/spiritual-friendship-and-the-long-walk",
  },
  {
    slug: "life-together-the-one-anothers",
    title: "Life together",
    blurb: "The faith is irreducibly communal. The fifty-nine one-another commands need an other, and a private just-me-and-Jesus Christianity cannot make a disciple.",
    href: "/life/life-together-the-one-anothers",
  },
  {
    slug: "the-home-and-the-family",
    title: "The household of faith",
    blurb: "A home is the first church a child attends. The table, family worship, and the open door, and how an ordinary household forms souls.",
    href: "/life/the-home-and-the-family",
  },
  {
    slug: "the-neighbor-and-the-stranger",
    title: "The people God puts in your path",
    blurb: "Who is my neighbor. Loving the outsider across the divisions fracturing the country, and welcoming the stranger to the table.",
    href: "/life/the-neighbor-and-the-stranger",
  },
  {
    slug: "witness-without-weirdness",
    title: "Witness without weirdness",
    blurb: "Evangelism for the non-salesman. The gospel in ordinary friendship and presence, in a land that no longer comes to the church building.",
    href: "/life/witness-without-weirdness",
  },
];

const heroP = {
  fontFamily: "var(--B)",
  fontSize: "17.5px",
  lineHeight: 1.75,
  color: "rgba(245,240,230,0.82)",
  maxWidth: "64ch",
} as const;

export default function DiscipleMaking() {
  return (
    <Layout>
      <SEOMeta
        title="Make Disciples — Around Tables, in Living Rooms, Over Coffee"
        description="Jesus did not run a program. He made disciples over meals, in homes, with ordinary people. Equipping the regular believer to do the same around a table."
        url="https://www.livewellbyjamesbell.co/disciple-making"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>Make Disciples · The ordinary way</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5.2vw, 56px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "18px", maxWidth: "18ch" }}>
            Make disciples around a table
          </h1>
          <p style={{ ...heroP, marginBottom: "12px" }}>
            Jesus did not run a program. He made disciples over meals, in homes, with ordinary people, by sharing his actual life with a few of them over time. The church turned that into a class for professionals, and we have been short of disciples ever since.
          </p>
          <p style={{ ...heroP, marginBottom: "26px" }}>
            You do not need a degree, a gift you do not have, or a building. You need a table, a meal, an open chair, and the willingness to keep coming back to it. This is the way back, simple and at home, and it is the way the church first turned the world upside down.
          </p>
          <Link href="/tools/discipleship-table" style={{ display: "inline-block", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--charcoal)", background: "var(--mustard)", padding: "13px 22px", textDecoration: "none" }}>
            Start a table
          </Link>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "6px" }}>The path</h2>
          <div style={{ width: "36px", height: "2px", background: "var(--mustard)", marginBottom: "var(--s-2)" }} />
          <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink-muted)", maxWidth: "60ch", marginBottom: "var(--s-4)" }}>
            Nine deep guides, in the order you would walk them. Each names the real struggle, sets it in Scripture and the church's tradition, tests the best of modern knowledge against the Bible, and ends with a practice you can begin this week.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "var(--s-3)" }}>
            {PATH.map((item, i) => (
              <Link key={item.slug} href={item.href} style={{ display: "block", background: "var(--card)", border: "1px solid rgba(20,17,12,0.08)", borderTop: "2px solid var(--mustard)", padding: "var(--s-3)", textDecoration: "none" }}>
                <div style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", color: "var(--mustard-text)", marginBottom: "8px" }}>{String(i + 1).padStart(2, "0")}</div>
                <div style={{ fontFamily: "var(--F)", fontSize: "20px", lineHeight: 1.25, color: "var(--ink)", marginBottom: "8px" }}>{item.title}</div>
                <div style={{ fontFamily: "var(--B)", fontSize: "13.5px", lineHeight: 1.55, color: "var(--ink-muted)" }}>{item.blurb}</div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: "var(--s-5)", background: "var(--charcoal)", padding: "var(--s-4)", color: "var(--bone)" }}>
            <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "10px" }}>The tool</div>
            <p style={{ fontFamily: "var(--F)", fontSize: "19px", lineHeight: 1.5, marginBottom: "16px", maxWidth: "56ch" }}>
              Start a Table builds you a complete, reproducing plan for a discipleship table: who to invite, how to ask, a simple weekly rhythm of meal, Scripture, and prayer, and how to multiply it. Made for the regular person with no training.
            </p>
            <Link href="/tools/discipleship-table" style={{ fontFamily: "var(--U)", fontSize: "13.5px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>
              Start a table
            </Link>
          </div>

          <div style={{ marginTop: "var(--s-3)", display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
            <Link href="/discipleship" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>The Discipleship Pathway</Link>
            <Link href="/family" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Family Discipleship</Link>
            <Link href="/life" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>The Integrated Life</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
