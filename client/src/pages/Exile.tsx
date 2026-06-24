/**
 * /exile — the cornerstone. The Jeremiah 29 / 1 Peter frame that names the
 * whole project: the church as exiles in a post-Christian world, learning to
 * live well. The four movements (came from / are / how to live / going) link
 * out to the sections that carry each one. This is the story the homepage
 * spine mirrors; it is the room the rest of the house opens off of.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Movement {
  kicker: string;
  title: string;
  body: string;
  href: string;
  cta: string;
}

const MOVEMENTS: Movement[] = [
  {
    kicker: "First",
    title: "Where we came from",
    body: "How the church was handed the center of the West, and how it lost it. The councils that fixed the words, the creeds that carried them, the schisms that broke the house. The family you were born into and were never introduced to.",
    href: "/theology/history",
    cta: "Trace the roots",
  },
  {
    kicker: "Second",
    title: "Where we are",
    body: "A post-Christian country that still keeps the vocabulary and lost the thing. The faith captive to the nation, the market, the tribe — the right baptizing power, the left baptizing the moment, both certain it is the church doing the converting.",
    href: "/disruption",
    cta: "Read the diagnosis",
  },
  {
    kicker: "Third",
    title: "How to live",
    body: "Jeremiah's charge, brought down to a Tuesday. Marriage, children, work, money, the body, the anxious mind. The ordinary faithfulness the exile was commanded to practice in the city that did not want him — and the welfare of that city is bound up with his own.",
    href: "/life",
    cta: "Learn to live well here",
  },
  {
    kicker: "Last",
    title: "Where we're going",
    body: "The city we are actually walking toward, the one with foundations. Not evacuation. Not a better version of Babylon. Resurrection, and a kingdom that comes down. The exile is real. It is also not the end of the sentence.",
    href: "/theology",
    cta: "Lift your eyes",
  },
];

export default function Exile() {
  return (
    <Layout>
      <SEOMeta
        title="Exiles — Living Well in a Post-Christian World"
        description="The church is in exile again, not persecuted but displaced. What Jeremiah 29 and 1 Peter taught God's people about living well in a land they did not choose."
        url="https://www.livewellbyjamesbell.co/exile"
      />

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>The Vision</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 400, lineHeight: 1.03, letterSpacing: "-0.025em", marginBottom: "22px", maxWidth: "16ch" }}>
            We are not home.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "rgba(245,240,230,0.85)", maxWidth: "64ch", marginBottom: "14px" }}>
            In 587 BC the army of Babylon broke Jerusalem open. The temple burned. The people were marched east to a city whose gods had, by every visible measure, won. Then a letter came from the prophet Jeremiah, and it did not say resist, and it did not say wait it out. It said build houses and live in them. Plant gardens and eat what they grow. Marry, have children, give your children in marriage. And seek the welfare of the city where I have sent you into exile, and pray to the LORD on its behalf — for in its welfare you will find your own.
          </p>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "rgba(245,240,230,0.85)", maxWidth: "64ch", marginBottom: "14px" }}>
            Six hundred years later Peter wrote to a scattering of churches and reached for the same word. He called them sojourners and exiles — resident aliens, people with a permanent address in a country that was not theirs. The category was not a crisis. It was the oldest identity the people of God had ever worn.
          </p>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "rgba(245,240,230,0.85)", maxWidth: "64ch" }}>
            The Western church spent sixteen centuries forgetting it. From the Edict of Milan in 313 to the long noon of Christendom, the faith held the center, set the calendar, named the public good. Then the center let go. Charles Taylor charted the unwinding; Lesslie Newbigin came back from a lifetime in India and recognized his own country as a mission field. We did not get persecuted. We got displaced. And we are trying to live here with no memory of how it is done.
          </p>
        </div>
      </section>

      {/* The charge */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
        <div style={wrap}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.15, marginBottom: "18px", maxWidth: "24ch" }}>
            This site is an exile's instruction, not a fortress and not a retreat.
          </h2>
          <div className="article-body prose-section">
            <p>
              There are two reflexes when the ground shifts. Build the walls higher and fight to take the country back. Or pack the soul for heaven and let the city rot. Jeremiah forbids both. He commands the exile to stay, to plant, to raise a family, to work for the good of the very place that broke him — without ever pretending it is home. That is harder than the fortress and harder than the escape. It is also the only thing God ever told his people to do in a land like this one.
            </p>
            <p>
              So there are four questions an exile has to answer, and they come in order. Everything written here lives under one of them.
            </p>
          </div>
        </div>
      </section>

      {/* The four movements */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-5) var(--s-4) var(--s-6)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))", gap: "var(--s-3)" }}>
            {MOVEMENTS.map((m) => (
              <Link
                key={m.href + m.title}
                href={m.href}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "rgba(245,240,230,0.04)",
                  border: "1px solid rgba(245,240,230,0.12)",
                  borderTop: "2px solid var(--mustard)",
                  padding: "var(--s-4)",
                  textDecoration: "none",
                }}
              >
                <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "12px" }}>{m.kicker}</div>
                <div style={{ fontFamily: "var(--F)", fontSize: "26px", lineHeight: 1.15, color: "var(--bone)", marginBottom: "12px" }}>{m.title}</div>
                <div style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "rgba(245,240,230,0.78)", marginBottom: "18px", flexGrow: 1 }}>{m.body}</div>
                <div style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard)", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px", alignSelf: "flex-start" }}>{m.cta} →</div>
              </Link>
            ))}
          </div>

          <p style={{ fontFamily: "var(--B)", fontSize: "14.5px", lineHeight: 1.65, color: "rgba(245,240,230,0.6)", maxWidth: "60ch", marginTop: "var(--s-4)" }}>
            The same exile is also called to seek the welfare of the city — its poor at the gate, its workers, its forgotten. That work has its own room: <Link href="/justice" style={{ color: "var(--mustard)", fontWeight: 600 }}>Justice &amp; the Vulnerable</Link>. And those who lead the scattered church carry a particular weight: <Link href="/leadership" style={{ color: "var(--mustard)", fontWeight: 600 }}>Leadership</Link>.
          </p>
        </div>
      </section>

      {/* Closing — leaves weight */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={wrap}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.12, marginBottom: "18px", maxWidth: "22ch" }}>
            Exile is not the punishment. It is the assignment.
          </h2>
          <div className="article-body prose-section">
            <p>
              We keep waiting for the country to turn back around so the real work can begin. It is not turning back around. And the real work began a long time ago anyway — in 587, in a letter, in a garden somebody planted in soil that belonged to the empire. The faithfulness God asks for is not the faithfulness of people who got the world they wanted. It never was.
            </p>
          </div>
          <p style={{ fontFamily: "var(--B)", fontSize: "19px", lineHeight: 1.6, color: "var(--ink)", maxWidth: "60ch", fontWeight: 500, marginTop: "14px" }}>
            Build the house. Plant the garden. Raise the children. Seek the welfare of the city. We are not home — and we are not leaving.
          </p>

          <div style={{ marginTop: "var(--s-4)", display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
            <Link href="/life" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Start with how to live</Link>
            <Link href="/start" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Get the writing in your inbox</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
