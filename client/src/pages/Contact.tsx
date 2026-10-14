/**
 * /contact: a direct line to James. The same form as /speaking (posting to
 * /api/contact, which exists only in api/index.ts), his email, and his city.
 * A message form is not crisis care, so the way to real help sits beside it.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import ContactForm, { CONTACT_EMAIL } from "@/components/ContactForm";

const gutter = "clamp(16px, 4vw, var(--s-4))";

const p = { fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "var(--ink-muted)", margin: "0 0 var(--s-2)" } as const;
const link = { color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "1px" } as const;

export default function Contact() {
  return (
    <Layout>
      <SEOMeta
        title="Contact James Bell"
        description="Write to James Bell directly. A message here reaches him. To ask him to speak or preach, see the speaking page."
        url="https://www.livewellbyjamesbell.co/contact"
      />

      <section aria-labelledby="contact-title" style={{ background: "var(--bone)", padding: `var(--s-6) ${gutter}` }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }} className="contact-grid">
          <div style={{ maxWidth: "44ch" }}>
            <h1
              id="contact-title"
              style={{
                fontFamily: "var(--F)",
                fontSize: "clamp(40px, 5.4vw, 64px)",
                fontWeight: 400,
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                margin: "0 0 var(--s-3)",
              }}
            >
              Write to James
            </h1>
            <p style={p}>A message here reaches James directly.</p>
            <p style={p}>
              Email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={link}>
                {CONTACT_EMAIL}
              </a>
              <br />
              Fenton, Michigan
            </p>
            <p style={p}>
              Asking James to speak or preach?{" "}
              <Link href="/speaking" style={link}>
                The speaking page
              </Link>{" "}
              has the details.
            </p>
            <div style={{ marginTop: "var(--s-4)", paddingTop: "var(--s-3)", borderTop: "1px solid var(--border)" }}>
              <p style={{ ...p, color: "var(--ink)", margin: 0 }}>
                If you are in crisis or thinking about ending your life, do not wait on a reply here. In the US, call
                or text 988 for the Suicide and Crisis Lifeline.{" "}
                <Link href="/help" style={link}>
                  Find Help
                </Link>{" "}
                has more.
              </p>
            </div>
          </div>
          <div>
            <ContactForm idPrefix="contact" />
          </div>
        </div>
      </section>

      <style>{`.contact-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:var(--s-5);align-items:start}@media (max-width:860px){.contact-grid{grid-template-columns:minmax(0,1fr)}}`}</style>
    </Layout>
  );
}
