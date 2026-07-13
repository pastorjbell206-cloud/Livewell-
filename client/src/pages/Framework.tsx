/**
 * The Unifying Framework (/framework). The one page that names how the five
 * pillars are a single arc rather than five departments: know it, trace it,
 * renounce the idols, do justice, and then live and lead it. The spine of the
 * whole project, stated plainly.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const prose = { maxWidth: "var(--w-prose)", margin: "0 auto" } as const;

const MOVES = [
  {
    n: "01",
    verb: "Know it",
    pillar: "Theological Depth",
    href: "/theology",
    body: "Start with what is true, handled honestly. Not a position handed down to be defended, but the actual questions, every serious view in its strongest voice, traced through the councils and confessions that paid for the words. You cannot live what you have only been told to repeat.",
  },
  {
    n: "02",
    verb: "Trace it",
    pillar: "Biblical Theology",
    href: "/theology/biblical",
    body: "Then watch it move. One story, from a garden to a city, with a cross at the hinge. Kingdom, temple, covenant, exile, sacrifice, all of it bending toward the same person. Doctrine is the skeleton. The storyline is the body that walks.",
  },
  {
    n: "03",
    verb: "Renounce the idols",
    pillar: "Prophetic Disruption",
    href: "/disruption",
    body: "Before the truth can form you, the counterfeits have to die. The nation dressed as the kingdom. The market that has become a god. The platform, the party, the nostalgia. The water we swim in and never named. This is the part that costs you your tribe, and the writer is inside the indictment first.",
  },
  {
    n: "04",
    verb: "Do justice",
    pillar: "Prophetic Justice",
    href: "/justice",
    body: "Truth that does not reach the poor at the gate was never the truth of this God. Mishpat and tsedaqah, the widow and the immigrant and the worker, the church's long silence and the few who broke it. Not a program bolted onto the gospel. The shape of the gospel when it touches the ground.",
  },
  {
    n: "05",
    verb: "Live and lead it",
    pillars: "Leadership Formation and Integrated Life",
    href: "/life",
    body: "And then the whole of it becomes a life. The body, the marriage, the calendar, the bank account, the friendship, the grief. The leaders formed before they are deployed, character before competence. One undivided life, offered whole, on an ordinary Tuesday. This is where all of it was always going.",
  },
];

export default function Framework() {
  return (
    <Layout>
      <SEOMeta
        title="The Framework — How the Library Fits Together"
        description="The one arc through the library's five reference wings: know the truth, trace it through Scripture, renounce the idols, do justice, and live it as one life."
        url="https://www.livewellbyjamesbell.co/framework"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={prose}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>The Framework</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 6vw, 60px)", fontWeight: 400, lineHeight: 1.03, letterSpacing: "-0.025em", marginBottom: "22px" }}>
            Five wings. One arc.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "rgba(245,240,230,0.85)", marginBottom: "16px" }}>
            The library's five reference wings are not five departments. They are one argument with five movements, and they go in an order. You know the truth. You watch it move through the whole of Scripture. You let it kill your idols. You let it reach the poor. And then you let it become an actual life.
          </p>
          <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontStyle: "italic", lineHeight: 1.5, color: "var(--mustard)" }}>
            Theology that does not end in a life was never theology. It was a hobby.
          </p>
          <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.7, color: "rgba(245,240,230,0.55)", marginTop: "16px" }}>
            (This is the arc through the reference shelves. The site's spine — the six pillars, two movements — lives at <Link href="/map" style={{ color: "var(--mustard)" }}>the map</Link>.)
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          {MOVES.map((m, i) => (
            <Link
              key={m.n}
              href={m.href}
              style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: "var(--s-2)", textDecoration: "none", padding: "var(--s-4) 0", borderTop: i === 0 ? "none" : "1px solid rgba(20,17,12,0.12)" }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "16px", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 700, color: "var(--mustard-text)", letterSpacing: "0.1em" }}>{m.n}</span>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.1 }}>{m.verb}</h2>
                <span style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)" }}>{m.pillar ?? m.pillars}</span>
              </div>
              <p style={{ fontFamily: "var(--B)", fontSize: "16.5px", lineHeight: 1.75, color: "var(--ink)", maxWidth: "68ch", margin: 0 }}>{m.body}</p>
              <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)" }}>Enter this wing →</span>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)", color: "var(--bone)", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "19px", fontStyle: "italic", lineHeight: 1.6, color: "rgba(245,240,230,0.9)", marginBottom: "24px" }}>
            You do not have to start at the beginning. You have to start where you actually are.
          </p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/start" style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>Find your path</Link>
            <Link href="/discipleship" style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>Walk the discipleship pathway</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
