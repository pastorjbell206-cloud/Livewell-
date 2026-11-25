import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import { Link } from "wouter";
import { useState, useMemo } from "react";
import { Copy, Check, Search } from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";
import ScriptureNote from "@/components/ScriptureNote";

import FoldedNote from "@/components/FoldedNote";
import NextStep from "@/components/NextStep";
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
      { ref: "Psalm 139:13-14", text: "For You formed my inmost being; You knit me together in my mother’s womb. I praise You, for I am fearfully and wonderfully made. Marvelous are Your works, and I know this very well." },
      { ref: "1 John 3:1", text: "Behold what manner of love the Father has given to us, that we should be called children of God. And that is what we are! The reason the world does not know us is that it did not know Him." },
      { ref: "Ephesians 2:10", text: "For we are God’s workmanship, created in Christ Jesus to do good works, which God prepared in advance as our way of life." },
    ],
  },
  {
    id: "anxiety",
    label: "Fear and anxiety",
    note: "Do not rush past a child's fear to fix it. Name it, then hand it to a God who is bigger than it.",
    verses: [
      { ref: "Philippians 4:6-7", text: "Be anxious for nothing, but in everything, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus." },
      { ref: "Isaiah 41:10", text: "Do not fear, for I am with you; do not be afraid, for I am your God. I will strengthen you; I will surely help you; I will uphold you with My right hand of righteousness." },
      { ref: "1 Peter 5:7", text: "Cast all your anxiety on Him, because He cares for you." },
    ],
  },
  {
    id: "anger",
    label: "Anger",
    note: "A child needs to learn that anger is not the sin, but what we do with it can be. So do we.",
    verses: [
      { ref: "Ephesians 4:26", text: "“Be angry, yet do not sin.” Do not let the sun set upon your anger..." },
      { ref: "James 1:19-20", text: "My beloved brothers, understand this: Everyone should be quick to listen, slow to speak, and slow to anger, for man’s anger does not bring about the righteousness that God desires." },
      { ref: "Proverbs 15:1", text: "A gentle answer turns away wrath, but a harsh word stirs up anger." },
    ],
  },
  {
    id: "obedience",
    label: "Obedience and the heart",
    note: "The goal is never mere compliance. It is a heart that loves what is good. Aim past the behavior.",
    verses: [
      { ref: "Ephesians 6:1-4", text: "Children, obey your parents in the Lord, for this is right. “Honor your father and mother” (which is the first commandment with a promise), “that it may go well with you and that you may have a long life on the earth.” Fathers, do not provoke your children to wrath; instead, bring them up in the discipline and instruction of the Lord." },
      { ref: "1 Samuel 16:7", text: "But the LORD said to Samuel, “Do not consider his appearance or height, for I have rejected him; the LORD does not see as man does. For man sees the outward appearance, but the LORD sees the heart.”" },
      { ref: "Deuteronomy 6:6-7", text: "These words I am commanding you today are to be upon your hearts. And you shall teach them diligently to your children and speak of them when you sit at home and when you walk along the road, when you lie down and when you get up." },
    ],
  },
  {
    id: "discipline",
    label: "Discipline and correction",
    note: "Discipline that is not soaked in love is just control. Correct the way you have been corrected by grace.",
    verses: [
      { ref: "Hebrews 12:11", text: "No discipline seems enjoyable at the time, but painful. Later on, however, it yields a harvest of righteousness and peace to those who have been trained by it." },
      { ref: "Proverbs 22:6", text: "Train up a child in the way he should go, and when he is old he will not depart from it." },
      { ref: "Colossians 3:21", text: "Fathers, do not provoke your children, so they will not become discouraged." },
    ],
  },
  {
    id: "screens",
    label: "Screens and attention",
    note: "You are not fighting a device. You are forming what your child loves and gives attention to. Model it first.",
    verses: [
      { ref: "Psalm 119:37", text: "Turn my eyes away from worthless things; revive me with Your word." },
      { ref: "Romans 12:2", text: "Do not be conformed to this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what is the good, pleasing, and perfect will of God." },
      { ref: "Philippians 4:8", text: "Finally, brothers, whatever is true, whatever is honorable, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think on these things." },
    ],
  },
  {
    id: "gratitude",
    label: "Gratitude",
    note: "Thankfulness is learned out loud. A child who hears parents give thanks learns to see gifts everywhere.",
    verses: [
      { ref: "1 Thessalonians 5:18", text: "Give thanks in every circumstance, for this is God’s will for you in Christ Jesus." },
      { ref: "Psalm 100:4", text: "Enter His gates with thanksgiving and His courts with praise; give thanks to Him and bless His name." },
      { ref: "James 1:17", text: "Every good and perfect gift is from above, coming down from the Father of the heavenly lights, with whom there is no change or shifting shadow." },
    ],
  },
  {
    id: "kindness",
    label: "Kindness to others",
    note: "Kids learn mercy by being shown it. The first place they meet the kindness of God is usually a parent.",
    verses: [
      { ref: "Ephesians 4:32", text: "Be kind and tenderhearted to one another, forgiving each other just as in Christ God forgave you." },
      { ref: "Luke 6:31", text: "Do to others as you would have them do to you." },
      { ref: "Philippians 2:3-4", text: "Do nothing out of selfish ambition or empty pride, but in humility consider others more important than yourselves. Each of you should look not only to your own interests, but also to the interests of others." },
    ],
  },
  {
    id: "doubt",
    label: "Faith and hard questions",
    note: "When your child brings a doubt, treat it as trust, not threat. The question is a door, not a wall.",
    verses: [
      { ref: "Mark 9:24", text: "Immediately the boy’s father cried out, “I do believe; help my unbelief!”" },
      { ref: "1 Peter 3:15", text: "But in your hearts sanctify Christ as Lord. Always be prepared to give a defense to everyone who asks you the reason for the hope that is in you. But respond with gentleness and respect..." },
      { ref: "Jeremiah 29:13", text: "You will seek Me and find Me when you search for Me with all your heart." },
    ],
  },
  {
    id: "when-you-fail",
    label: "When you fail as a parent",
    note: "You will get it wrong. The repair matters more than the mistake. A parent who apologizes preaches grace.",
    verses: [
      { ref: "Lamentations 3:22-23", text: "Because of the loving devotion of the LORD we are not consumed, for His mercies never fail. They are new every morning; great is Your faithfulness!" },
      { ref: "2 Corinthians 12:9", text: "But He said to me, “My grace is sufficient for you, for My power is perfected in weakness.” Therefore I will boast all the more gladly in my weaknesses, so that the power of Christ may rest on me." },
      { ref: "Psalm 103:13", text: "As a father has compassion on his children, so the LORD has compassion on those who fear Him." },
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
        title="Bible Verses for Parents"
        description="Bible verses for the real moments of parenting — fear, anger, identity, obedience, screens, doubt — each with a short, honest note for the parent."
        url="https://www.livewellbyjamesbell.co/tools/parenting-verses"
      />
      <FoldedNote id="parenting-verses" />
      <InnerHead path="/tools/parenting-verses" title="Parenting Bible Verses" line="Scripture for the moments parenting actually hands you. Pick a topic, read the verses together, and let the short note give you a way in." plate="book" />

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
            <ScriptureNote rendering="bsb" />
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
      <div style={{ background: "var(--bone)", padding: "0 var(--s-4) var(--s-6)" }}>
        <NextStep id="parenting-guide" line="What your child needs at their age, and one practice to start this week." />
      </div>
    </Layout>
  );
}
