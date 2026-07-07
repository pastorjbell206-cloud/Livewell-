/**
 * /faq — the index for the questions people actually type into a search bar
 * (roadmap HS-7). Ten worked FAQ pages and six side-by-side comparisons had
 * zero inbound links from anywhere on the site; this page opens them to
 * readers and to the crawl, and the footer + hard-questions page link here.
 * Copy for each entry mirrors the target page's own head.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta, getFAQPageSchema } from "@/components/SEOMeta";

const QUESTIONS: { href: string; q: string; line: string }[] = [
  { href: "/faq/does-god-exist", q: "Does God exist?", line: "The best arguments for and against, the role of suffering, and the difference between faith and proof." },
  { href: "/faq/can-science-and-faith-coexist", q: "Can science and faith coexist?", line: "Evolution, the Big Bang, miracles, the age of the earth, and the believing scientists." },
  { href: "/faq/is-the-bible-historically-accurate", q: "Is the Bible historically accurate?", line: "Archaeological evidence, manuscript reliability, and the contradictions taken seriously." },
  { href: "/faq/what-do-christians-believe-about-hell", q: "What do Christians believe about hell?", line: "Eternal torment, annihilation, universalism — and who holds each view, honestly stated." },
  { href: "/faq/what-is-deconstruction", q: "What is deconstruction?", line: "What it means, whether it is biblical, and whether you can deconstruct and stay Christian." },
  { href: "/faq/what-is-religious-trauma", q: "What is religious trauma?", line: "Symptoms, causes, healing, and how churches can stop producing it." },
  { href: "/faq/why-are-people-leaving-church", q: "Why are people leaving church?", line: "The statistics, the reasons by age group, and what congregations can actually do." },
  { href: "/faq/why-do-young-people-leave-church", q: "Why do young people leave church?", line: "The top reasons, the age most leave, and whether they come back." },
  { href: "/faq/what-denomination-should-i-join", q: "What denomination should I join?", line: "The main differences, what to look for, and the non-denominational question." },
  { href: "/faq/catholic-vs-protestant", q: "What divides Catholics and Protestants?", line: "The Pope, Mary, the saints, salvation — the eight key differences explained." },
];

const COMPARISONS: { href: string; label: string }[] = [
  { href: "/compare/catholic-vs-protestant", label: "Catholic vs. Protestant" },
  { href: "/compare/calvinism-vs-arminianism", label: "Calvinism vs. Arminianism" },
  { href: "/compare/baptist-vs-methodist", label: "Baptist vs. Methodist" },
  { href: "/compare/evangelical-vs-mainline", label: "Evangelical vs. Mainline" },
  { href: "/compare/orthodox-vs-catholic", label: "Orthodox vs. Catholic" },
  { href: "/compare/liturgical-vs-contemporary", label: "Liturgical vs. Contemporary worship" },
];

// FAQPage JSON-LD for answer engines, built from the indexed questions.
const FAQ_SCHEMA = getFAQPageSchema(
  QUESTIONS.map((item) => ({ question: item.q, answer: item.line }))
);

export default function FaqIndex() {
  return (
    <Layout>
      <SEOMeta
        title="Questions People Ask — Honest Answers"
        description="Does God exist? Why are people leaving church? What is deconstruction? Ten hard questions answered honestly by a pastor who came to faith from atheism, plus six traditions compared side by side."
        url="https://www.livewellbyjamesbell.co/faq"
        structuredData={FAQ_SCHEMA}
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            Questions people ask
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "22ch" }}>
            The questions you would actually type into a search bar.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "60ch" }}>
            Answered plainly, by a pastor who came to faith from atheism and
            has not forgotten what the questions feel like from the outside.
            No question is treated as an attack.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div style={{ display: "grid", gap: "14px" }}>
            {QUESTIONS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "block",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderLeft: "2px solid var(--mustard)",
                  borderRadius: "var(--radius-sm)",
                  padding: "18px 20px",
                  textDecoration: "none",
                }}
              >
                <span style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, color: "var(--ink)", display: "block", marginBottom: "6px", letterSpacing: "-0.01em" }}>
                  {item.q}
                </span>
                <span style={{ fontFamily: "var(--B)", fontSize: "14.5px", lineHeight: 1.6, color: "var(--ink-muted)", display: "block" }}>
                  {item.line}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "12px" }}>
            Side by side
          </div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 400, letterSpacing: "-0.015em", color: "var(--ink)", marginBottom: "8px" }}>
            The traditions, compared fairly.
          </h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", marginBottom: "24px" }}>
            Each comparison states both sides in their strongest voice — a
            reader from either tradition should finish feeling understood.
            For any contested doctrine, the{" "}
            <Link href="/theology/compare" style={{ color: "var(--ink)", borderBottom: "1px solid var(--mustard)", textDecoration: "none" }}>
              full comparison table
            </Link>{" "}
            lays every position in a row.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "12px" }}>
            {COMPARISONS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                style={{
                  display: "block",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                  padding: "14px 16px",
                  fontFamily: "var(--U)",
                  fontSize: "14.5px",
                  fontWeight: 500,
                  color: "var(--ink)",
                  textDecoration: "none",
                }}
              >
                {c.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
