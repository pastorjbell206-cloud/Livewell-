/**
 * /about: James as the ministry.
 *
 * Every sentence a reader sees here was already on this page in James's own
 * words (or, for the outside channels, in lib/channels.ts); this page only
 * reorders them around the person: who he is, his story, why the work exists,
 * the church and the networks, how the writing works, and how to reach him.
 * It also absorbs /connect, so the outside channels live here now.
 *
 * Standing rule (docs/work/NOTES.md): this page states no title, no number
 * of years in ministry, and no book count until James gives one set of
 * facts. Those numbers were taken out of his paragraphs on 2026-11-17 and
 * nothing else in them was reworded. The Pastors Connection Network is kept
 * off this site at his word of the same day, so the paragraph about it and
 * its link are gone; git history holds his words if he wants them back.
 */
import type { ReactNode } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Figure } from "@/components/Figure";
import { HubGroup, HubStyles, type HubLink } from "@/components/HubGroup";
import { SITE_URL, ogImageUrl } from "@/lib/site";
import { SAME_AS, liveChannels } from "@/lib/channels";
import { HOME_WHY, PORTRAIT_URL } from "@/lib/positioning";
import { isPublicEssay, shelfEntry } from "@/lib/shelf";

const gutter = "var(--gutter)";
const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

/** The long form of James's story, once it is on the essay shelf. */
const STORY_ESSAY = "the-atheist-in-the-pulpit";

const REACH: HubLink[] = [
  { label: "Speaking", href: "/speaking", note: "Conferences, retreats, revivals, and pulpit supply, with a form to ask about a date." },
  { label: "Contact", href: "/contact", note: "A direct line to James, for anything else." },
  { label: "Subscribe on Substack", href: "/subscribe", note: "New essays by email. The sign-up starts here and finishes on Substack." },
  { label: "Find James", href: "/connect", note: "Substack, Facebook, the newest essays, and the ways to write to him, on one page." },
];

/** The channels in lib/channels.ts that live at their own address. */
const ELSEWHERE: HubLink[] = liveChannels().map((c) => ({ label: c.label, href: c.url, note: c.blurb, external: true }));

function Band({
  tone,
  title,
  id,
  children,
}: {
  tone: "bone" | "warm" | "dark";
  title: string;
  id: string;
  children: ReactNode;
}) {
  const bg = tone === "dark" ? "var(--charcoal)" : tone === "warm" ? "var(--bone-warm)" : "var(--bone)";
  return (
    <section
      aria-labelledby={id}
      className={tone === "dark" ? "about-band about-band--dark" : "about-band"}
      style={{ background: bg, padding: `var(--s-6) ${gutter}` }}
    >
      <div style={wrap} className="about-band__grid">
        <h2 id={id} className="about-band__title">
          {title}
        </h2>
        <div className="about-prose">{children}</div>
      </div>
    </section>
  );
}

export default function About() {
  const storyOnShelf = isPublicEssay(STORY_ESSAY);
  const storyTitle = shelfEntry(STORY_ESSAY)?.title;

  return (
    <Layout>
      <SEOMeta
        title="About James Bell"
        description="Who James Bell is and why he writes: his story in his own words, the church he pastors, and how to reach him."
        image={ogImageUrl("About James Bell", "LiveWell")}
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "James Bell",
          url: `${SITE_URL}/about`,
          jobTitle: "Pastor and writer",
          description: "James Bell pastors First Baptist Church of Fenton, Michigan, and writes. He came to faith from atheism, was raised without a father, and has five sons.",
          worksFor: {
            "@type": "Organization",
            name: "First Baptist Church of Fenton",
          },
          sameAs: SAME_AS,
        }}
      />
      <HubStyles />

      {/* WHO HE IS: the portrait, the name, and why the work exists. */}
      <section style={{ background: "var(--charcoal)", padding: `var(--s-6) ${gutter}` }}>
        <div style={wrap} className="about-hero">
          <div className="about-hero__portrait">
            <Figure src={PORTRAIT_URL} alt="James Bell" aspect="4 / 5" priority />
          </div>
          <div>
            <h1
              style={{
                fontFamily: "var(--F)",
                fontSize: "var(--fs-display)",
                fontWeight: 400,
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                color: "var(--charcoal-fg)",
                margin: "0 0 14px",
              }}
            >
              James Bell
            </h1>
            <p style={{ fontFamily: "var(--U)", fontSize: "14px", lineHeight: 1.7, color: "var(--charcoal-fg-muted)", margin: "0 0 var(--s-4)" }}>
              Pastor, First Baptist Church of Fenton, Michigan<br />
              Founder, ENDS, equipping pastors in remote regions<br />
              Host, Following the Way<br />
              Writer
            </p>
            <p
              style={{
                fontFamily: "var(--F)",
                fontSize: "clamp(22px, 2.3vw, 29px)",
                fontWeight: 400,
                lineHeight: 1.4,
                color: "var(--charcoal-fg)",
                margin: "0 0 var(--s-4)",
                maxWidth: "36ch",
              }}
            >
              {HOME_WHY}
            </p>
            <p className="about-hero__links" style={{ margin: 0 }}>
              <Link href="/speaking">Invite James to speak</Link>
              <Link href="/contact">Write to James</Link>
              <Link href="/subscribe">Subscribe on Substack</Link>
            </p>
          </div>
        </div>
      </section>

      {/*
        MY STORY IN MY OWN WORDS. The place for James's story, atheism to
        faith, in his own words. Only James writes it; never generate it.
        These are the paragraphs he already wrote for this page. When the
        long version, the essay "the-atheist-in-the-pulpit", is on the shelf
        (status "live" in client/src/lib/shelf.json, or a rewrite in
        client/public/essays/), the link below appears on its own.
      */}
      <Band tone="bone" title="My story in my own words" id="about-story">
        <p>I pastor a church in Fenton, Michigan, and I write. Most weeks that is the whole job description.</p>
        <p>
          I was an atheist before I was a Christian. I bring it up because it changed how I write and not because I want to build a personality on it. Mostly it means I know what the objections sound like from the inside, and I am not willing to answer them with something thin. If you do not believe any of this, I am not going to pretend your reasons are stupid.
        </p>
        <p>
          The rest is fairly ordinary. I have five sons. I have been at the same church long enough to have buried people I loved and married their children. Almost everything I write started as something I had to figure out for an actual person sitting across from me, usually on a week when I did not feel qualified to answer.
        </p>
        {storyOnShelf && storyTitle && (
          <p>
            <Link href={`/writing/${STORY_ESSAY}`} className="about-more">
              Read the long version: {storyTitle}
            </Link>
          </p>
        )}
      </Band>

      <Band tone="warm" title="The heart behind it" id="about-heart">
        <p>
          LiveWell is for the person whose faith has grown larger than the answers they were handed as a child. It's for the pastor who is quietly running on empty, for the husband and wife still keeping a promise they're no longer sure they understand, and for the skeptic who keeps reading the words of a faith they haven't decided to trust.
        </p>
        <p>
          America isn't the churched country it used to be, and I don't spend much energy grieving that. The old assumptions are gone. Nobody owes Christianity a hearing anymore, which means the faith has to be commended the old way. It has to be argued, lived where people can see it, and offered without pressure. That's the world my sons are inheriting, and the world my church opens its doors into every Sunday, and I'd rather meet it plainly than pretend it's 1955.
        </p>
        <p>
          What I want is simple to say. I want the historic faith (the creed, the cross, the resurrection, the kingdom) held out in ordinary language to people who have every cultural permission to ignore it. I don't mean a Christianity bent to fit American politics, or the self-help shelf, or whatever the culture is anxious about this year. I mean the older thing underneath, what the church has confessed for two thousand years, put back in the same room as a Tuesday afternoon. I want the skeptic to find the argument honest even if they walk away. I want the tired Christian to find something sturdier than the last twenty years of American church life. And I'm trying, unevenly, to be the kind of man who can commend it because it's visibly holding him up, not because it's his product.
        </p>
      </Band>

      <Band tone="dark" title="The church and the ends of the earth" id="about-church">
        <p>
          I pastor First Baptist Church of Fenton, Michigan, and that's the room where everything here gets tested. These essays weren't written in a quiet study with the commentaries open and the whole afternoon free. They were written around hospital visits and budget meetings, after funerals, in the days on either side of the counseling appointments where what a person believes about God either holds or it comes apart. Years in that room will take the abstraction out of almost anyone.
        </p>
        <p>
          I also founded ENDS, which equips pastors in remote regions around the world. The aim isn't to send Americans to do their work for them or to hand them a translated version of our assumptions. It's to put training in the hands of the men already there, who know the language and the terrain and the cost, and who will still be there long after any visitor has gone home.
        </p>
        <p>
          The rest of it is writing. There are books on theology, church history, justice, marriage, parenting, and the slow unglamorous business of following Jesus over a long stretch of time. There are the essays here, the <a href="http://followingthewaypodcast.com/" target="_blank" rel="noopener noreferrer">Following the Way</a> podcast, and the notes I write most days for whoever is reading. It's all one project, really. I'm trying to put theology back in contact with ordinary life.{" "}
          <Link href="/books">The books are here</Link>.
        </p>
      </Band>

      <Band tone="bone" title="How the writing works" id="about-writing">
        {[
          { name: "It starts at the root", def: "Every essay reaches for the beginning of a thing instead of the symptom in front of us. The church's silence on justice did not start in 2020; it goes back much further. The marriage that is drifting did not start with last Tuesday's argument; it started with a vow neither person fully understood when they made it." },
          { name: "The writer is inside it", def: "When a piece names what the church has gotten wrong, I am part of the church that got it wrong. When it names what pastors tend to hide, I am a pastor who has hidden it. I am not pointing from across the room." },
          { name: "It ends on a verdict, not a recap", def: "The last paragraph does not restate the argument. It names what is left once the evidence is on the table, in a few words, and lets you carry it out of the room with you." },
        ].map((v) => (
          <div key={v.name} className="about-prose__item">
            <h3 className="about-prose__h3">{v.name}</h3>
            <p>{v.def}</p>
          </div>
        ))}
        <p>
          LiveWell isn't therapy and it isn't Christian self-help. It won't hand you something to think so you can stop thinking. It's closer to a writing desk, where a pastor with years of mistakes behind him and five sons in front of him tries to think out loud about what it means to follow Jesus in a country that has mostly forgotten what his kingdom was about.
        </p>
      </Band>

      {/* HOW TO REACH HIM, and the work that lives at its own address. */}
      <section style={{ background: "var(--bone-warm)", padding: `var(--s-2) ${gutter}` }}>
        <div style={wrap}>
          <HubGroup id="reach" title="Reach James" links={REACH}>
            Ask him to speak, write to him, or get his essays by email through Substack.
          </HubGroup>
          <HubGroup id="elsewhere" title="Everywhere James is" links={ELSEWHERE}>
            The essays and books live here. ENDS, the podcast, and the daily notes live elsewhere.
            It's the same person in each place.
          </HubGroup>
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ background: "var(--charcoal)", padding: `var(--s-6) ${gutter}` }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2vw, 24px)", lineHeight: 1.55, color: "var(--charcoal-fg)", margin: "0 0 var(--s-4)" }}>
            You may still be deciding whether to trust me. That's the right instinct, and you should keep it. The writing will either hold up for you or it won't, and I'd rather you find that out for yourself than be talked into it.
          </p>
          <Link href="/writing" className="about-more about-more--dark">
            Read the essays
          </Link>
        </div>
      </section>

      <style>{ABOUT_CSS}</style>
    </Layout>
  );
}

const ABOUT_CSS = `
.about-hero{display:grid;grid-template-columns:220px minmax(0,1fr);gap:var(--s-5);align-items:start}
.about-hero__links{display:flex;flex-wrap:wrap;gap:12px 28px;font-family:var(--U);font-size:15px}
.about-hero__links a{color:var(--charcoal-fg);text-decoration:none;border-bottom:1px solid var(--mustard);padding-bottom:2px}
.about-band__grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.9fr);gap:var(--s-3) var(--s-5);align-items:start}
.about-band__title{font-family:var(--F);font-weight:400;font-size:clamp(30px,3.4vw,42px);line-height:1.1;letter-spacing:-0.01em;color:var(--ink);margin:0;max-width:14ch}
.about-band--dark .about-band__title{color:var(--charcoal-fg)}
.about-prose{max-width:68ch}
.about-prose p{font-family:var(--B);font-size:17px;line-height:1.7;color:var(--ink);margin:0 0 var(--s-3)}
.about-prose p:last-child{margin-bottom:0}
.about-band--dark .about-prose p{color:var(--charcoal-fg-muted)}
.about-prose a{color:inherit;text-decoration:underline;text-decoration-color:var(--mustard);text-underline-offset:3px}
.about-prose__item{margin:0 0 var(--s-3)}
.about-prose__h3{font-family:var(--F);font-weight:500;font-size:24px;line-height:1.2;color:var(--ink);margin:0 0 6px}
.about-more,.about-prose a.about-more{font-family:var(--U);font-size:15px;font-weight:500;color:var(--ink);text-decoration:none;border-bottom:1px solid var(--mustard);padding-bottom:2px}
.about-more--dark{color:var(--charcoal-fg)}
@media (max-width:760px){
  .about-hero{grid-template-columns:minmax(0,1fr);gap:var(--s-3)}
  .about-hero__portrait{width:132px}
  .about-band__grid{grid-template-columns:minmax(0,1fr)}
}
`;
