/**
 * /speaking: for people who want James in their room. It absorbs
 * /work-with-james (vercel.json 301s it here; App.tsx keeps a client stub),
 * so the formats and the coaching and consulting descriptions are that
 * page's own words, and the form is the same one, posting to /api/contact.
 *
 * His years in ministry are not stated here: the number awaits his
 * confirmation (see the note at the top of About.tsx).
 *
 * Only what James supplies goes here. He has not yet given a list of topics,
 * a bio for organizers, headshots, or past engagements; add each one only
 * when he does (see docs/ELITE-SITE-PROMPT.md, "Speaking").
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import ContactForm, { CONTACT_EMAIL } from "@/components/ContactForm";

const gutter = "clamp(16px, 4vw, var(--s-4))";
const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

/** The second block: the old page's coaching, consulting, and writing offers. */
const ALONGSIDE = [
  {
    title: "Pastoral coaching",
    desc: "One-on-one with a pastor who is still doing the work. Burnout, a church in conflict, an elder board that has stopped trusting you, the doubts you cannot say from the pulpit.",
  },
  {
    title: "Church consulting",
    desc: "For a church that has stalled, or is quietly dying and has not said so. An honest reading of where it actually is, what has to change, and how to change it without losing the people you are there to serve. A network of pastors who have been through the same.",
  },
  {
    title: "Writing and ghostwriting",
    desc: "Book development, sermon series resources, curriculum writing, and collaborative projects.",
  },
];

export default function Speaking() {
  return (
    <Layout>
      <SEOMeta
        title="Speaking — James Bell"
        description="Invite James Bell to preach or speak: conferences, retreats, revivals, and pulpit supply. Pastoral coaching and church consulting too, with a form that reaches him directly."
        url="https://www.livewellbyjamesbell.co/speaking"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Speaking — James Bell",
          url: "https://www.livewellbyjamesbell.co/speaking",
        }}
      />

      <section style={{ background: "var(--charcoal)", padding: `var(--s-6) ${gutter} var(--s-5)` }}>
        <div style={wrap}>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(40px, 5.6vw, 68px)",
              fontWeight: 400,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: "var(--charcoal-fg)",
              margin: "0 0 18px",
            }}
          >
            Speaking and preaching
          </h1>
          <p style={{ fontFamily: "var(--F)", fontSize: "clamp(21px, 2.2vw, 27px)", lineHeight: 1.45, color: "var(--charcoal-fg)", maxWidth: "40ch", margin: "0 0 var(--s-3)" }}>
            Conferences, retreats, revivals, and pulpit supply. Serious theology, preached like it matters on a Tuesday.
          </p>
          <p style={{ margin: 0, fontFamily: "var(--U)", fontSize: "15px" }}>
            <Link href="/about" style={{ color: "var(--charcoal-fg-muted)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>
              Who James is
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="speaking-ask" style={{ background: "var(--bone)", padding: `var(--s-6) ${gutter}` }}>
        <div style={wrap} className="speak-grid">
          <div style={{ maxWidth: "44ch" }}>
            <h2 id="speaking-ask" className="speak-h2">
              Ask James to speak
            </h2>
            <p className="speak-p">
              Tell him the occasion, the date, and the place. The form reaches James directly.
            </p>
            <p className="speak-p">
              You can also email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="speak-link">
                {CONTACT_EMAIL}
              </a>
              . James is in Fenton, Michigan.
            </p>
          </div>
          <div id="speaking-form">
            <ContactForm
              idPrefix="speaking"
              defaultSubject="Speaking"
              messageHint="The occasion, the date, the place, and roughly how many people will be in the room."
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="speaking-alongside" style={{ background: "var(--bone-warm)", padding: `var(--s-6) ${gutter}` }}>
        <div style={wrap} className="speak-grid">
          <div style={{ maxWidth: "40ch" }}>
            <h2 id="speaking-alongside" className="speak-h2">
              Coaching and consulting
            </h2>
            <p className="speak-p">
              For a pastor, a church, or a project that needs someone alongside for longer than a weekend. Use the
              same form and choose what it is about.
            </p>
          </div>
          <div style={{ maxWidth: "62ch" }}>
            {ALONGSIDE.map((a) => (
              <div key={a.title} className="speak-offer">
                <h3 className="speak-h3">{a.title}</h3>
                <p className="speak-p" style={{ margin: 0 }}>{a.desc}</p>
              </div>
            ))}
            <p style={{ margin: "var(--s-3) 0 0", fontFamily: "var(--U)", fontSize: "15px" }}>
              <a href="#speaking-form" className="speak-link">
                Go to the form
              </a>
            </p>
          </div>
        </div>
      </section>

      <style>{SPEAKING_CSS}</style>
    </Layout>
  );
}

const SPEAKING_CSS = `
.speak-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:var(--s-4) var(--s-5);align-items:start}
.speak-h2{font-family:var(--F);font-weight:400;font-size:clamp(30px,3.4vw,42px);line-height:1.1;letter-spacing:-0.01em;color:var(--ink);margin:0 0 var(--s-2)}
.speak-h3{font-family:var(--F);font-weight:500;font-size:24px;line-height:1.2;color:var(--ink);margin:0 0 6px}
.speak-p{font-family:var(--B);font-size:17px;line-height:1.7;color:var(--ink-muted);margin:0 0 var(--s-2)}
.speak-link{color:var(--ink);text-decoration:none;border-bottom:1px solid var(--mustard);padding-bottom:1px}
.speak-offer{padding:var(--s-3) 0;border-top:1px solid var(--border)}
.speak-offer:first-child{padding-top:0;border-top:none}
@media (max-width:860px){.speak-grid{grid-template-columns:minmax(0,1fr)}}
`;
