/**
 * Wisdom hub (/wisdom). The front door to wisdom for all of life: the deep
 * Proverbs and Ecclesiastes guide, the topical Scripture tool, the Proverbs in
 * 31 Days reader, and a map of wisdom onto every ordinary arena (money, words,
 * work, anger, anxiety, marriage, friendship, and more). Built so a regular
 * person can land here and find Scripture's wisdom for whatever they face.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { PullQuote, StatementBand } from "@/components/EditorialBlocks";
import { useEffect, useState } from "react";
import { Link } from "wouter";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface TodayVerse { ref: string; text: string }
interface TodayTopic {
  id: string;
  label: string;
  framing: string;
  verses: TodayVerse[];
  related?: { label: string; href: string }[];
}

/** A wisdom topic chosen by the calendar day, stable for the day, rotating daily. */
function WisdomToday() {
  const [topic, setTopic] = useState<TodayTopic | null>(null);

  useEffect(() => {
    fetch("/wisdom/topics.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const topics: TodayTopic[] = (d && d.topics) || [];
        if (!topics.length) return;
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
        setTopic(topics[dayOfYear % topics.length]);
      })
      .catch(() => {});
  }, []);

  if (!topic) return null;
  const verse = topic.verses && topic.verses[0];

  return (
    <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }}>
      <div style={wrap}>
        <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>Wisdom for today</div>
        <div style={{ background: "var(--card)", border: "1px solid rgba(20,17,12,0.08)", borderTop: "2px solid var(--mustard)", padding: "var(--s-4)" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "10px" }}>{topic.label}</h2>
          {verse && (
            <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "var(--ink)", borderLeft: "3px solid var(--mustard)", paddingLeft: "16px", marginBottom: "14px" }}>
              {verse.text} <span style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px", color: "var(--mustard-text)" }}>{verse.ref}</span>
            </p>
          )}
          <p style={{ fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", marginBottom: "16px" }}>{topic.framing}</p>
          <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
            <Link href={`/wisdom/${topic.id}`} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--mustard-text)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>
              Read the full wisdom
            </Link>
            {topic.related && topic.related[0] && (
              <Link href={topic.related[0].href} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--ink-muted)", textDecoration: "none" }}>
                {topic.related[0].label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface Arena {
  label: string;
  topic: string; // matches a topic id in /tools/bible-on
  domain?: string; // an optional deep life-domain to read
}

// Wisdom mapped onto the arenas of an ordinary life. Each opens the quick
// Scripture guide; some also point to a deep guide for that area.
const ARENAS: Arena[] = [
  { label: "Money", topic: "money", domain: "money-and-the-heart" },
  { label: "Words and the tongue", topic: "tongue" },
  { label: "Anger", topic: "anger", domain: "anger-and-the-hot-heart" },
  { label: "Anxiety and worry", topic: "anxiety", domain: "the-anxious-mind" },
  { label: "Work and calling", topic: "work", domain: "work-as-worship" },
  { label: "Marriage", topic: "marriage", domain: "marriage-the-long-covenant" },
  { label: "Friendship", topic: "friendship", domain: "friendship-against-isolation" },
  { label: "Generosity", topic: "generosity", domain: "generosity-and-the-open-hand" },
  { label: "Suffering", topic: "suffering", domain: "suffering-and-the-silence-of-god" },
  { label: "Forgiveness", topic: "forgiveness", domain: "forgiveness-the-hardest-grace" },
  { label: "Contentment", topic: "contentment", domain: "contentment-against-envy" },
  { label: "Fear and courage", topic: "fear" },
  { label: "Pride and humility", topic: "humility", domain: "pride-and-humility" },
  { label: "Wisdom itself", topic: "wisdom", domain: "wisdom-for-all-of-life" },
];

const heroP = { fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "64ch" } as const;

export default function Wisdom() {
  return (
    <Layout>
      <SEOMeta
        title="Wisdom for All of Life — Proverbs, Ecclesiastes, and the Skill of Living"
        description="The Bible has more than commands. It has wisdom, the skill of living well where no rule reaches. A guide to Proverbs and Ecclesiastes, and a topical map."
        url="https://www.livewellbyjamesbell.co/wisdom"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>Wisdom · For all of life</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5.2vw, 56px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "18px", maxWidth: "18ch" }}>
            Wisdom for all of life
          </h1>
          <p style={{ ...heroP, marginBottom: "12px" }}>
            Most of your life is lived in the place no single command reaches. Whether to take the job. How much to give. When to speak and when to hold your peace. The Bible has more than rules for that place. It has wisdom, the hard-won skill of living well in a world that does not come with instructions.
          </p>
          <p style={{ ...heroP, marginBottom: "26px" }}>
            A full third of the Old Testament, Proverbs, Ecclesiastes, and Job, exists for exactly these decisions. Here is the whole of it, gathered in one place, for whatever you are facing.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/tools/wisdom-finder" style={{ display: "inline-block", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--charcoal)", background: "var(--mustard)", padding: "13px 22px", textDecoration: "none" }}>
              Tell us what you are facing
            </Link>
            <Link href="/life/wisdom-for-all-of-life" style={{ display: "inline-block", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--charcoal-fg)", background: "transparent", border: "1px solid rgba(245,240,230,0.4)", padding: "13px 22px", textDecoration: "none" }}>
              Read the guide
            </Link>
          </div>
        </div>
      </section>

      <WisdomToday />

      {/* Wisdom for every arena */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-5)" }}>
        <div style={wrap}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "6px" }}>Wisdom for every arena</h2>
          <div style={{ width: "36px", height: "2px", background: "var(--mustard)", marginBottom: "var(--s-2)" }} />
          <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink-muted)", maxWidth: "62ch", marginBottom: "var(--s-4)" }}>
            Pick the part of life you are standing in. Each opens what Scripture actually says, the verses worth knowing by heart, and points you to a deeper guide where one exists.
          </p>
          <PullQuote>Most of your life is lived in the place no single command reaches.</PullQuote>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))", gap: "var(--s-2)" }}>
            {ARENAS.map((a) => (
              <div key={a.topic} style={{ background: "var(--card)", border: "1px solid rgba(20,17,12,0.08)", borderTop: "2px solid var(--mustard)", padding: "var(--s-3)" }}>
                <div style={{ fontFamily: "var(--F)", fontSize: "19px", lineHeight: 1.2, color: "var(--ink)", marginBottom: "10px" }}>{a.label}</div>
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <Link href={`/tools/bible-on?topic=${a.topic}`} style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", textDecoration: "none" }}>
                    What Scripture says
                  </Link>
                  {a.domain && (
                    <Link href={`/life/${a.domain}`} style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink-muted)", textDecoration: "none" }}>
                      Read the guide
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatementBand tone="dark" width="30ch">
        Wisdom is not more rules — it is the skill of living well where no rule reaches.
      </StatementBand>

      {/* The three ways in */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "6px" }}>Three ways in</h2>
          <div style={{ width: "36px", height: "2px", background: "var(--mustard)", marginBottom: "var(--s-3)" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "var(--s-3)" }}>
            <Link href="/life/wisdom-for-all-of-life" style={{ display: "block", background: "var(--card)", border: "1px solid rgba(20,17,12,0.08)", borderTop: "2px solid var(--mustard)", padding: "var(--s-3)", textDecoration: "none" }}>
              <div style={{ fontFamily: "var(--F)", fontSize: "21px", lineHeight: 1.2, color: "var(--ink)", marginBottom: "8px" }}>The deep guide</div>
              <div style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.55, color: "var(--ink-muted)" }}>An extensive walk through Proverbs, Ecclesiastes, and Job: the fear of the Lord, proverbs as patterns not promises, the honesty of vapor and gift, and Christ as the wisdom of God.</div>
            </Link>
            <Link href="/tools/bible-on" style={{ display: "block", background: "var(--card)", border: "1px solid rgba(20,17,12,0.08)", borderTop: "2px solid var(--mustard)", padding: "var(--s-3)", textDecoration: "none" }}>
              <div style={{ fontFamily: "var(--F)", fontSize: "21px", lineHeight: 1.2, color: "var(--ink)", marginBottom: "8px" }}>What the Bible says about</div>
              <div style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.55, color: "var(--ink-muted)" }}>A topical guide for the arenas of ordinary life, with the heart of the passages worth knowing by heart, ready to copy and carry.</div>
            </Link>
            <Link href="/tools/proverbs-31" style={{ display: "block", background: "var(--card)", border: "1px solid rgba(20,17,12,0.08)", borderTop: "2px solid var(--mustard)", padding: "var(--s-3)", textDecoration: "none" }}>
              <div style={{ fontFamily: "var(--F)", fontSize: "21px", lineHeight: 1.2, color: "var(--ink)", marginBottom: "8px" }}>Proverbs in 31 days</div>
              <div style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.55, color: "var(--ink-muted)" }}>A chapter of Proverbs a day, matched to the date, with the theme and the lines worth carrying into the day's decisions.</div>
            </Link>
          </div>

          <div style={{ marginTop: "var(--s-4)", display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
            <Link href="/life" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>The Integrated Life</Link>
            <Link href="/disciple-making" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Make Disciples</Link>
            <Link href="/tools/rule-of-life" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Build a Rule of Life</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
