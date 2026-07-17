import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Link } from "wouter";
import { useState, useMemo } from "react";
import { Copy, Check, Search } from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

/**
 * Parenting Bible Verses — a topical lookup of Scripture for the real moments
 * of raising kids, each paired with a short, honest note for the parent.
 * Static and self-contained (no DB). Surfaced on the Family hub and /tools.
 */
interface VerseEntry {
  ref: string;
  text: string;
}
interface VerseTopic {
  id: string;
  label: string;
  note: string; // a short word to the parent
  verses: VerseEntry[];
}

const TOPICS: VerseTopic[] = [
  {
    id: "identity",
    label: "Who they are",
    note: "Before a child can behave well, they need to know whose they are. Identity comes before instruction.",
    verses: [
      { ref: "Psalm 139:13-14", text: "For you formed my inward parts; you knitted me together in my mother's womb. I praise you, for I am fearfully and wonderfully made." },
      { ref: "1 John 3:1", text: "See what kind of love the Father has given to us, that we should be called children of God. And so we are." },
      { ref: "Ephesians 2:10", text: "For we are his workmanship, created in Christ Jesus for good works, which God prepared beforehand." },
    ],
  },
  {
    id: "anxiety",
    label: "Fear and anxiety",
    note: "Do not rush past a child's fear to fix it. Name it, then hand it to a God who is bigger than it.",
    verses: [
      { ref: "Philippians 4:6-7", text: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God." },
      { ref: "Isaiah 41:10", text: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you." },
      { ref: "1 Peter 5:7", text: "Casting all your anxieties on him, because he cares for you." },
    ],
  },
  {
    id: "anger",
    label: "Anger",
    note: "A child needs to learn that anger is not the sin, but what we do with it can be. So do we.",
    verses: [
      { ref: "Ephesians 4:26", text: "Be angry and do not sin; do not let the sun go down on your anger." },
      { ref: "James 1:19-20", text: "Let every person be quick to hear, slow to speak, slow to anger; for the anger of man does not produce the righteousness of God." },
      { ref: "Proverbs 15:1", text: "A soft answer turns away wrath, but a harsh word stirs up anger." },
    ],
  },
  {
    id: "obedience",
    label: "Obedience and the heart",
    note: "The goal is never mere compliance. It is a heart that loves what is good. Aim past the behavior.",
    verses: [
      { ref: "Ephesians 6:1-4", text: "Children, obey your parents in the Lord, for this is right. Fathers, do not provoke your children to anger, but bring them up in the discipline and instruction of the Lord." },
      { ref: "1 Samuel 16:7", text: "The Lord sees not as man sees: man looks on the outward appearance, but the Lord looks on the heart." },
      { ref: "Deuteronomy 6:6-7", text: "These words that I command you today shall be on your heart. You shall teach them diligently to your children." },
    ],
  },
  {
    id: "discipline",
    label: "Discipline and correction",
    note: "Discipline that is not soaked in love is just control. Correct the way you have been corrected by grace.",
    verses: [
      { ref: "Hebrews 12:11", text: "For the moment all discipline seems painful rather than pleasant, but later it yields the peaceful fruit of righteousness." },
      { ref: "Proverbs 22:6", text: "Train up a child in the way he should go; even when he is old he will not depart from it." },
      { ref: "Colossians 3:21", text: "Fathers, do not provoke your children, lest they become discouraged." },
    ],
  },
  {
    id: "screens",
    label: "Screens and attention",
    note: "You are not fighting a device. You are forming what your child loves and gives attention to. Model it first.",
    verses: [
      { ref: "Psalm 119:37", text: "Turn my eyes from looking at worthless things; and give me life in your ways." },
      { ref: "Romans 12:2", text: "Do not be conformed to this world, but be transformed by the renewal of your mind." },
      { ref: "Philippians 4:8", text: "Whatever is true, whatever is honorable, whatever is just, whatever is pure, think about these things." },
    ],
  },
  {
    id: "gratitude",
    label: "Gratitude",
    note: "Thankfulness is learned out loud. A child who hears parents give thanks learns to see gifts everywhere.",
    verses: [
      { ref: "1 Thessalonians 5:18", text: "Give thanks in all circumstances; for this is the will of God in Christ Jesus for you." },
      { ref: "Psalm 100:4", text: "Enter his gates with thanksgiving, and his courts with praise. Give thanks to him; bless his name." },
      { ref: "James 1:17", text: "Every good gift and every perfect gift is from above, coming down from the Father of lights." },
    ],
  },
  {
    id: "kindness",
    label: "Kindness to others",
    note: "Kids learn mercy by being shown it. The first place they meet the kindness of God is usually a parent.",
    verses: [
      { ref: "Ephesians 4:32", text: "Be kind to one another, tenderhearted, forgiving one another, as God in Christ forgave you." },
      { ref: "Luke 6:31", text: "And as you wish that others would do to you, do so to them." },
      { ref: "Philippians 2:3-4", text: "Count others more significant than yourselves. Let each of you look to the interests of others." },
    ],
  },
  {
    id: "doubt",
    label: "Faith and hard questions",
    note: "When your child brings a doubt, treat it as trust, not threat. The question is a door, not a wall.",
    verses: [
      { ref: "Mark 9:24", text: "Immediately the father of the child cried out and said, I believe; help my unbelief." },
      { ref: "1 Peter 3:15", text: "Always being prepared to make a defense to anyone who asks you for a reason for the hope that is in you, yet do it with gentleness and respect." },
      { ref: "Jeremiah 29:13", text: "You will seek me and find me, when you seek me with all your heart." },
    ],
  },
  {
    id: "when-you-fail",
    label: "When you fail as a parent",
    note: "You will get it wrong. The repair matters more than the mistake. A parent who apologizes preaches grace.",
    verses: [
      { ref: "Lamentations 3:22-23", text: "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning." },
      { ref: "2 Corinthians 12:9", text: "My grace is sufficient for you, for my power is made perfect in weakness." },
      { ref: "Psalm 103:13", text: "As a father shows compassion to his children, so the Lord shows compassion to those who fear him." },
    ],
  },
];

export default function ParentingVerses() {
  const [active, setActive] = useState<string>(TOPICS[0].id);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [copyFailed, setCopyFailed] = useState<string | null>(null);

  const topic = TOPICS.find((t) => t.id === active) ?? TOPICS[0];

  const visibleTopics = useMemo(() => {
    if (!query.trim()) return TOPICS;
    const q = query.toLowerCase();
    return TOPICS.filter(
      (t) =>
        t.label.toLowerCase().includes(q) ||
        t.verses.some((v) => v.ref.toLowerCase().includes(q) || v.text.toLowerCase().includes(q))
    );
  }, [query]);

  const copy = async (v: VerseEntry) => {
    const ok = await copyToClipboard(`${v.text} (${v.ref})`);
    if (!ok) {
      setCopyFailed(v.ref);
      return;
    }
    setCopyFailed(null);
    setCopied(v.ref);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <Layout>
      <SEOMeta
        title="Parenting Bible Verses — Scripture for Raising Kids"
        description="Bible verses for the real moments of parenting — fear, anger, identity, obedience, screens, doubt — each with a short, honest note for the parent."
        url="https://www.livewellbyjamesbell.co/tools/parenting-verses"
      />
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>For the home</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px" }}>
            Parenting Bible Verses
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "rgba(245,240,230,0.75)", maxWidth: "60ch" }}>
            Scripture for the moments parenting actually hands you. Pick a topic, read the verses together, and let the short note give you a way in.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) var(--s-7)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "10px 14px", marginBottom: "20px", maxWidth: "420px" }}>
            <Search size={14} aria-hidden style={{ color: "var(--ink-muted)" }} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics or verses…"
              aria-label="Search parenting verses"
              style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink)" }}
            />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
            {visibleTopics.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => { setActive(t.id); setQuery(""); }}
                aria-pressed={active === t.id}
                style={{
                  fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em",
                  padding: "8px 14px", borderRadius: "999px", cursor: "pointer",
                  border: `1px solid ${active === t.id ? "var(--mustard)" : "var(--border)"}`,
                  background: active === t.id ? "var(--bone-warm)" : "transparent", color: "var(--ink)",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "2px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "24px", fontWeight: 500, color: "var(--ink)", marginBottom: "8px" }}>{topic.label}</h2>
            <p style={{ fontFamily: "var(--F)", fontSize: "17px", fontStyle: "italic", lineHeight: 1.6, color: "var(--ink-muted)", marginBottom: "24px", maxWidth: "62ch" }}>{topic.note}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {topic.verses.map((v) => (
                <div key={v.ref} style={{ borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
                  <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "8px" }}>{v.text}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                    <Link href={`/theology/passage?ref=${encodeURIComponent(v.ref)}`} style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--mustard-text)", textDecoration: "none", borderBottom: "1px solid var(--mustard)" }}>{v.ref} →</Link>
                    <button type="button" onClick={() => copy(v)} aria-label={`Copy ${v.ref}`} aria-live="polite" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", color: "var(--ink-muted)", fontFamily: "var(--U)", fontSize: "12px" }}>
                      {copied === v.ref ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                    </button>
                  </div>
                  {copyFailed === v.ref && (
                    <p role="status" style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "8px 0 0" }}>
                      Copy failed — select and copy manually.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
