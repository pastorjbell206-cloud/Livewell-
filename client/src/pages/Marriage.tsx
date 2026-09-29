import { useState } from "react";
import { Link } from "wouter";
import { SEOMeta } from "@/components/SEOMeta";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import PillarLeadMagnet from "@/components/PillarLeadMagnet";
import { CrisisHelp } from "@/components/CrisisHelp";
import { StatementBand, SectionArt } from "@/components/EditorialBlocks";
import { EditorialIndex } from "@/components/editorial/EditorialIndex";
import { CardGrid } from "@/components/editorial/CardGrid";
import { SectionHead } from "@/components/editorial/SectionHead";
import SubjectShelf from "@/components/SubjectShelf";
import { subjectById } from "@/lib/subjects";
import { getReadEssays } from "@/lib/readProgress";

export default function Marriage() {
  const [readSlugs] = useState<Set<string>>(() => getReadEssays());

  const FEATURED_ARTICLES = [
    {
      title: "Covenant vs. Contract: What Marriage Actually Is",
      slug: "covenant-vs-contract-what-marriage-is",
      topic: "Marriage"
    },
    {
      title: "Communication That Actually Works",
      slug: "marriage-communication-that-works",
      topic: "Marriage"
    },
    {
      title: "Fighting Fair: Conflict Without Casualties",
      slug: "marriage-fighting-fair",
      topic: "Marriage"
    },
    {
      title: "Forgiveness in Marriage: How to Actually Do It",
      slug: "forgiveness-in-marriage",
      topic: "Marriage"
    },
    {
      title: "Money and Marriage",
      slug: "marriage-money-and-marriage",
      topic: "Marriage"
    },
    {
      title: "Protecting Your Marriage From the Demands of Work",
      slug: "protecting-your-marriage-from-work",
      topic: "Marriage"
    }
  ];

  const READING_PATHS = [
    {
      title: "Marriage: Covenant & Roles",
      description: "What covenant means, what you promised, and how two people lead and serve when love feels impossible.",
      href: "/writing?q=covenant"
    },
    {
      title: "Marriage: Communication & Conflict",
      description: "How to fight fair, have the conversations you've been avoiding, and repair after rupture.",
      href: "/writing?q=conflict"
    },
    {
      title: "Marriage: Crisis & Rebuilding",
      description: "Affairs, addiction, divorce, and the long work of starting again when the marriage nearly ended.",
      href: "/writing?q=marriage"
    }
  ];

  return (
    <div style={{ background: "var(--bone)" }}>
      <SEOMeta
        title="Christian Marriage Help | LiveWell by James Bell"
        description="Covenant theology applied to marriage: articles on communication, conflict, and emotional labor, for couples who want more than advice."
        keywords="Christian marriage help, biblical marriage, marriage counseling, marriage conflict, marriage communication, keeping marriage vows"
        url="https://www.livewellbyjamesbell.co/marriage"
        type="webpage"
      />

      <MinimalNav />

      {/* HERO SECTION */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "80px 20px", minHeight: "600px", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "bold", lineHeight: "1.2", marginBottom: "24px", fontFamily: "var(--F)" }}>
            When Your Marriage Needs More Than Advice
          </h1>
          <p style={{ fontSize: "18px", lineHeight: "1.8", marginBottom: "32px", color: "rgba(255,255,255,0.75)" }}>
            Covenant theology applied to the actual experience of marriage — the drift, the conflict, the repair, and the costly love that holds.
          </p>
          <Link href="/tools/marriage-assessment" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--gold)", color: "var(--ink)", border: "none", padding: "16px 40px", fontSize: "16px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}>
              Marriage Health Assessment
            </button>
          </Link>
        </div>
      </section>


      {/* TEACHING — care/orientation before the link grid (depth sweep) */}
      <section style={{ background: "var(--bone-warm)", padding: "72px 20px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.8, color: "var(--ink)", maxWidth: "68ch", marginBottom: "22px" }}>A wedding is a party. A marriage is a promise kept on the days the party is over.</p>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.8, color: "var(--ink)", maxWidth: "68ch", marginBottom: "22px" }}>Somewhere the culture taught us that love is a feeling you fall into and, when it cools, fall out of — and then acted surprised when the promises did not hold. Scripture calls it a covenant, an older and harder word: a bond you keep because you gave your word, until the keeping teaches you a love the feeling never could.</p>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.8, color: "var(--ink)", maxWidth: "68ch", marginBottom: "0" }}>This is not advice for a better marriage. It is a different account of what a marriage is for.</p>
          </div>
      </section>

      {/* FEATURED ARTICLES */}
      <section style={{ background: "var(--bone)", padding: "80px 20px" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionHead title="Essential Reading" />
          <EditorialIndex
            label="Essential Reading"
            items={FEATURED_ARTICLES.map((article) => ({
              href: `/writing/${article.slug}`,
              title: article.title,
              read: readSlugs.has(article.slug),
            }))}
          />
        </div>
      </section>

      <StatementBand tone="dark" eyebrow="Covenant, not contract">
        A covenant is kept on the days the feeling is gone.
      </StatementBand>

      {/* READING PATHS */}
      <section style={{ background: "var(--paper2)", padding: "80px 20px" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionHead
            title="Curated Reading Paths"
            intro="Thematic collections to go deeper on specific areas of your marriage."
          />
          <SectionArt seed="marriage-paths" />
          <CardGrid
            label="Curated Reading Paths"
            items={READING_PATHS.map((path) => ({ href: path.href, title: path.title, dek: path.description }))}
          />
        </div>
      </section>

      {/* LEAD MAGNET — email-gated reading path */}
      <PillarLeadMagnet
        kicker="Free Reading Path"
        title="The Marriage Reading Path"
        blurb="Three studies from inside the room where marriages fall apart and come back together — the covenant under the marriage, the hardest word, and the wounds carried in. A short PDF to read with your spouse or alone."
        slug="marriage"
        downloadLabel="Get the reading path (PDF)"
        source="reading-path-marriage"
      />

      {/* NEWSLETTER STRIP — real form, no silent failures */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <NewsletterSignup
            variant="inline"
            source="marriage"
            title="Marriage essays on Tuesday morning."
            description="Covenant, conflict, repair. One essay a week to your inbox. Written from inside the room where marriages actually fall apart and come back together."
          />
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ background: "var(--bone)", padding: "80px 20px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", fontFamily: "var(--F)", color: "var(--ink)" }}>
            Start with an honest reading of where you are.
          </h2>
          <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "32px", color: "var(--ink3)" }}>
            Start with the Marriage Health Assessment. It takes about ten minutes and will show you where your marriage is strongest and where the repair work begins. If what you are carrying is heavier than a questionnaire can hold, a pastor or a counselor is the right next door, and there is no shame in walking through it.
          </p>
          <Link href="/tools/marriage-assessment" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", border: "none", padding: "16px 40px", fontSize: "16px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}>
              Take the Assessment
            </button>
          </Link>
          <div style={{ marginTop: "20px" }}>
            <Link href="/life/marriage-the-long-covenant" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)", textDecoration: "none" }}>Or read the deep guide: Marriage, the Long Covenant</Link>
          </div>
          <div style={{ marginTop: "12px" }}>
            <Link href="/diagnostic" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)", textDecoration: "none" }}>If the trouble is bigger than the marriage: take the Life Diagnostic</Link>
          </div>
        </div>
      </section>

      {subjectById("marriage") && <SubjectShelf subject={subjectById("marriage")!} />}
      <CrisisHelp />
      <Footer />
    </div>
  );
}
