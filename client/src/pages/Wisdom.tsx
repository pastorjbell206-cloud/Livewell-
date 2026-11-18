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
import InnerHead from "@/components/art/InnerHead";
import SectionHead from "@/components/art/SectionHead";
import DoorCard from "@/components/art/DoorCard";
import IconTile from "@/components/art/IconTile";
import { BookOpenText, Briefcase, CalendarDays, CloudRain, Compass, Flame, HandHeart, Handshake, HeartHandshake, Hourglass, Lightbulb, MessageCircle, Scale, Shield, Sprout, Sun, Users, Wallet, type LucideIcon } from "lucide-react";
import "@/pages/home/home.css";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import ScriptureNote from "@/components/ScriptureNote";


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
    <section className="home-sec home-sec--warm" aria-label="Wisdom for today">
      <div className="home-wrap">
        <p className="lw-sec-head__label">
          <Sun aria-hidden="true" size={18} strokeWidth={1.75} />
          Wisdom for today
        </p>
        <div style={{ background: "var(--card)", border: "1px solid rgba(20,17,12,0.08)", borderTop: "2px solid var(--mustard)", padding: "var(--s-4)" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "10px" }}>{topic.label}</h2>
          {verse && (
            <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "var(--ink)", borderLeft: "3px solid var(--mustard)", paddingLeft: "16px", marginBottom: "14px" }}>
              {verse.text} <span style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px", color: "var(--mustard-text)" }}>{verse.ref}</span>
            </p>
          )}
          {verse && <ScriptureNote rendering="bsb" />}
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

/** An icon for each arena, by its topic. */
const ARENA_ICON: Record<string, LucideIcon> = {
  money: Wallet,
  tongue: MessageCircle,
  anger: Flame,
  anxiety: CloudRain,
  work: Briefcase,
  marriage: HeartHandshake,
  friendship: Users,
  generosity: HandHeart,
  suffering: Hourglass,
  forgiveness: Handshake,
  contentment: Sun,
  fear: Shield,
  humility: Scale,
  wisdom: Lightbulb,
};

export default function Wisdom() {
  return (
    <Layout>
      <SEOMeta
        title="Bible Wisdom for Money, Work, Anger, Marriage"
        description="A guide to Proverbs, Ecclesiastes, and Job, a map of Scripture on money, work, words, anger, and marriage, and a chapter of Proverbs for each day."
        url="https://www.livewellbyjamesbell.co/wisdom"
      />

      <InnerHead
        path="/wisdom"
        title="What the Bible says, by subject"
        line="Wisdom for all of life"
        plate="books"
        action={
          <>
            <Link href="/tools/wisdom-finder" className="btn">
              Tell us what you are facing
            </Link>
            <Link href="/life/wisdom-for-all-of-life" className="btn btn--quiet">
              Read the guide
            </Link>
          </>
        }
      />

      {/* FIRST: pick the part of life you are standing in. */}
      <section className="home-sec home-sec--dark" aria-labelledby="wisdom-arenas-title">
        <div className="home-wrap">
          <SectionHead dark icon={Compass} label={`${ARENAS.length} arenas`} title="Wisdom for every arena" id="wisdom-arenas-title" />
          <p className="lw-group__line" style={{ color: "var(--charcoal-fg-muted)" }}>
            Pick the part of life you are standing in. Each opens what Scripture actually says, the verses worth knowing by heart, and points you to a deeper guide where one exists.
          </p>
          {/* Two destinations means the card cannot be a single link: the name
              opens what Scripture says, and the deep guide, where one exists,
              is a quiet text link beneath it. */}
          <ul className="lw-arenas" aria-label="Wisdom by arena">
            {ARENAS.map((a) => {
              const Icon = ARENA_ICON[a.topic] ?? Lightbulb;
              return (
                <li key={a.topic}>
                  <Link className="lw-arena" href={`/tools/bible-on?topic=${a.topic}`}>
                    <span className="lw-tile__icon" aria-hidden="true">
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <span className="lw-arena__name">
                      {a.label}
                      <span className="sr-only">: what Scripture says</span>
                    </span>
                  </Link>
                  {a.domain && (
                    <Link className="lw-arena__guide" href={`/life/${a.domain}`}>
                      Read the guide <span className="sr-only">on {a.label.toLowerCase()}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <WisdomToday />

      <StatementBand tone="dark" width="30ch">
        Wisdom is not more rules. It is the skill of living well where no rule reaches.
      </StatementBand>

      {/* The three ways in, as picture cards. */}
      <section className="home-sec" aria-labelledby="wisdom-ways-title">
        <div className="home-wrap">
          <SectionHead icon={BookOpenText} label="Three ways in" title="Read it, look it up, or take it a day at a time." id="wisdom-ways-title" />
          <ul className="lw-rooms">
            <li><DoorCard href="/life/wisdom-for-all-of-life" plate="book" title="The deep guide" note="An extensive walk through Proverbs, Ecclesiastes, and Job: the fear of the Lord, proverbs as patterns not promises, the honesty of vapor and gift, and Christ as the wisdom of God." /></li>
            <li><DoorCard href="/tools/bible-on" plate="lens" title="What the Bible says about" note="A topical guide for the arenas of ordinary life, with the heart of the passages worth knowing by heart, ready to copy and carry." /></li>
            <li><DoorCard href="/tools/proverbs-31" plate="sundial" title="Proverbs in 31 days" note="A chapter of Proverbs a day, matched to the date, with the theme and the lines worth carrying into the day's decisions." /></li>
          </ul>
        </div>
      </section>

      {/* The page's own words on what wisdom is for. */}
      <section className="home-sec home-sec--warm" aria-labelledby="wisdom-why-title">
        <div className="home-wrap">
          <SectionHead icon={Lightbulb} label="Why wisdom" title="Where no single command reaches." id="wisdom-why-title" />
          <div className="lw-prose-band__body">
            <p>
              Most of your life is lived in the place no single command reaches. Whether to take the job. How much to give. When to speak and when to hold your peace. The Bible has more than rules for that place. It has wisdom, the hard-won skill of living well in a world that does not come with instructions.
            </p>
            <p>
              Three whole books of the Old Testament, Proverbs, Ecclesiastes, and Job, were written for exactly this territory. Here it is, gathered in one place, for whatever you are facing.
            </p>
          </div>
          <PullQuote>A proverb is a pattern, not a promise. It tells you how the world usually runs, so you can act wisely inside it.</PullQuote>
          <ul className="lw-tiles" style={{ marginTop: "var(--s-4)" }}>
            <li><IconTile href="/life" icon={Sprout} name="The Integrated Life" line="Every part of life, one guide each" /></li>
            <li><IconTile href="/tools/rule-of-life" icon={CalendarDays} name="Build a Rule of Life" line="A weekly rhythm of prayer and rest" /></li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}
