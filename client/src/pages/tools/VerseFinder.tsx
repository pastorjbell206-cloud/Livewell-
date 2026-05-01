import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useState } from "react";
import { BookOpen, Copy, Check } from "lucide-react";

const VERSES: Record<string, { ref: string; text: string }[]> = {
  Anxiety: [
    { ref: "Philippians 4:6-7", text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus." },
    { ref: "1 Peter 5:7", text: "Cast all your anxiety on him because he cares for you." },
    { ref: "Matthew 6:34", text: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own." },
    { ref: "Isaiah 41:10", text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand." },
    { ref: "Psalm 94:19", text: "When anxiety was great within me, your consolation brought me joy." },
  ],
  Hope: [
    { ref: "Romans 15:13", text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit." },
    { ref: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future." },
    { ref: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose." },
    { ref: "Hebrews 11:1", text: "Now faith is confidence in what we hope for and assurance about what we do not see." },
    { ref: "Lamentations 3:22-23", text: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness." },
  ],
  Grief: [
    { ref: "Psalm 34:18", text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit." },
    { ref: "Revelation 21:4", text: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away." },
    { ref: "Matthew 5:4", text: "Blessed are those who mourn, for they will be comforted." },
    { ref: "Psalm 147:3", text: "He heals the brokenhearted and binds up their wounds." },
    { ref: "2 Corinthians 1:3-4", text: "Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort, who comforts us in all our troubles." },
  ],
  Courage: [
    { ref: "Joshua 1:9", text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go." },
    { ref: "Deuteronomy 31:6", text: "Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you; he will never leave you nor forsake you." },
    { ref: "2 Timothy 1:7", text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline." },
    { ref: "Psalm 27:1", text: "The Lord is my light and my salvation — whom shall I fear? The Lord is the stronghold of my life — of whom shall I be afraid?" },
    { ref: "Isaiah 43:2", text: "When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you." },
  ],
  Forgiveness: [
    { ref: "Ephesians 4:32", text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you." },
    { ref: "Colossians 3:13", text: "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you." },
    { ref: "1 John 1:9", text: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness." },
    { ref: "Matthew 6:14-15", text: "For if you forgive other people when they sin against you, your heavenly Father will also forgive you." },
    { ref: "Psalm 103:12", text: "As far as the east is from the west, so far has he removed our transgressions from us." },
  ],
  Strength: [
    { ref: "Philippians 4:13", text: "I can do all this through him who gives me strength." },
    { ref: "Isaiah 40:31", text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint." },
    { ref: "Psalm 46:1", text: "God is our refuge and strength, an ever-present help in trouble." },
    { ref: "2 Corinthians 12:9", text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.'" },
    { ref: "Nehemiah 8:10", text: "Do not grieve, for the joy of the Lord is your strength." },
  ],
  Peace: [
    { ref: "John 14:27", text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid." },
    { ref: "Isaiah 26:3", text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you." },
    { ref: "Psalm 29:11", text: "The Lord gives strength to his people; the Lord blesses his people with peace." },
    { ref: "Romans 8:6", text: "The mind governed by the flesh is death, but the mind governed by the Spirit is life and peace." },
    { ref: "Colossians 3:15", text: "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace." },
  ],
  Wisdom: [
    { ref: "James 1:5", text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you." },
    { ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." },
    { ref: "Proverbs 9:10", text: "The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding." },
    { ref: "Colossians 2:2-3", text: "My goal is that they may be encouraged in heart and united in love, so that they may have the full riches of complete understanding, in order that they may know the mystery of God, namely, Christ, in whom are hidden all the treasures of wisdom and knowledge." },
    { ref: "Psalm 119:105", text: "Your word is a lamp for my feet, a light on my path." },
  ],
  Marriage: [
    { ref: "Ephesians 5:25", text: "Husbands, love your wives, just as Christ loved the church and gave himself up for her." },
    { ref: "1 Corinthians 13:4-7", text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs." },
    { ref: "Ecclesiastes 4:9-10", text: "Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up." },
    { ref: "Genesis 2:24", text: "That is why a man leaves his father and mother and is united to his wife, and they become one flesh." },
    { ref: "Colossians 3:14", text: "And over all these virtues put on love, which binds them all together in perfect unity." },
  ],
  Guidance: [
    { ref: "Proverbs 16:9", text: "In their hearts humans plan their course, but the Lord establishes their steps." },
    { ref: "Psalm 32:8", text: "I will instruct you and teach you in the way you should go; I will counsel you with my loving eye on you." },
    { ref: "Isaiah 30:21", text: "Whether you turn to the right or to the left, your ears will hear a voice behind you, saying, 'This is the way; walk in it.'" },
    { ref: "Psalm 37:5", text: "Commit your way to the Lord; trust in him and he will do this." },
    { ref: "Romans 12:2", text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God's will is." },
  ],
};

const TOPICS = Object.keys(VERSES);

export default function VerseFinder() {
  const [selected, setSelected] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (ref: string, text: string) => {
    navigator.clipboard.writeText(`${ref} — ${text}`);
    setCopied(ref);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Layout>
      <SEOMeta
        title="Bible Verse Finder — Find Scripture for Any Season"
        description="Find Bible verses by topic. Search for Scripture on anxiety, hope, grief, courage, forgiveness, marriage, wisdom, and more."
        keywords="Bible verse finder, scripture by topic, Bible verses for anxiety, Bible verses for hope, topical Bible search"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Bible Verse Finder",
          description: "Find curated Bible verses organized by life topic and emotion.",
          url: "https://www.livewellbyjamesbell.co/tools/verse-finder",
          applicationCategory: "ReligiousApp",
          offers: { "@type": "Offer", price: "0" },
        }}
      />

      <section style={{ background: "var(--forest)", color: "var(--ivory)", padding: "80px 32px 60px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: "700px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", color: "var(--gold)", fontFamily: "var(--U)", marginBottom: "16px" }}>
            FREE TOOL
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 300, fontFamily: "var(--F)", lineHeight: 1.15, marginBottom: "16px" }}>
            Bible Verse <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Finder</em>
          </h1>
          <p style={{ fontSize: "17px", lineHeight: 1.7, opacity: 0.85, fontFamily: "var(--B)" }}>
            Select a topic and find curated Scripture for every season of life.
          </p>
        </div>
      </section>

      <section style={{ padding: "48px 32px", background: "var(--paper)" }}>
        <div className="wrap" style={{ maxWidth: "900px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "12px", marginBottom: "40px" }}>
            {TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelected(topic)}
                style={{
                  padding: "14px 16px",
                  background: selected === topic ? "var(--gold)" : "white",
                  color: selected === topic ? "var(--ink)" : "var(--ink2)",
                  border: `1px solid ${selected === topic ? "var(--gold)" : "var(--border)"}`,
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "var(--U)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {topic}
              </button>
            ))}
          </div>

          {selected && VERSES[selected] && (
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: 600, fontFamily: "var(--F)", color: "var(--ink)", marginBottom: "24px" }}>
                <BookOpen size={20} style={{ display: "inline", marginRight: "8px", color: "var(--gold)" }} />
                Verses on {selected}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {VERSES[selected].map((v) => (
                  <div key={v.ref} style={{ padding: "24px", background: "white", border: "1px solid var(--border)", borderRadius: "8px", borderLeft: "4px solid var(--gold)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--gold)", fontFamily: "var(--U)" }}>{v.ref}</span>
                      <button
                        onClick={() => handleCopy(v.ref, v.text)}
                        style={{ display: "flex", alignItems: "center", gap: "4px", padding: "4px 10px", background: "var(--cream)", border: "1px solid var(--border)", borderRadius: "4px", fontSize: "12px", fontFamily: "var(--U)", fontWeight: 600, color: "var(--ink3)", cursor: "pointer" }}
                      >
                        {copied === v.ref ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                      </button>
                    </div>
                    <p style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--ink)", fontFamily: "var(--B)", fontStyle: "italic" }}>
                      "{v.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!selected && (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--ink3)" }}>
              <BookOpen size={48} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
              <p style={{ fontFamily: "var(--B)", fontSize: "16px" }}>Select a topic above to find verses</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
