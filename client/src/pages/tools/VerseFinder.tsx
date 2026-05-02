import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useState, useMemo } from "react";
import { BookOpen, Copy, Check, Heart, Search, Share2, Sun } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { Link } from "wouter";

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
  Loneliness: [
    { ref: "Psalm 68:6", text: "God sets the lonely in families, he leads out the prisoners with singing; but the rebellious live in a sun-scorched land." },
    { ref: "Deuteronomy 31:8", text: "The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid; do not be discouraged." },
    { ref: "Psalm 25:16-17", text: "Turn to me and be gracious to me, for I am lonely and afflicted. Relieve the troubles of my heart and free me from my anguish." },
    { ref: "Matthew 28:20", text: "And surely I am with you always, to the very end of the age." },
    { ref: "Psalm 139:7-10", text: "Where can I go from your Spirit? Where can I flee from your presence? If I go up to the heavens, you are there; if I make my bed in the depths, you are there." },
  ],
  Temptation: [
    { ref: "1 Corinthians 10:13", text: "No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear." },
    { ref: "James 1:12", text: "Blessed is the one who perseveres under trial because, having stood the test, that person will receive the crown of life that the Lord has promised to those who love him." },
    { ref: "Hebrews 4:15-16", text: "For we do not have a high priest who is unable to empathize with our weaknesses, but we have one who has been tempted in every way, just as we are — yet he did not sin." },
    { ref: "Matthew 26:41", text: "Watch and pray so that you will not fall into temptation. The spirit is willing, but the flesh is weak." },
    { ref: "James 4:7", text: "Submit yourselves, then, to God. Resist the devil, and he will flee from you." },
  ],
  Identity: [
    { ref: "2 Corinthians 5:17", text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!" },
    { ref: "Ephesians 2:10", text: "For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do." },
    { ref: "1 Peter 2:9", text: "But you are a chosen people, a royal priesthood, a holy nation, God's special possession, that you may declare the praises of him who called you out of darkness into his wonderful light." },
    { ref: "Galatians 2:20", text: "I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me." },
    { ref: "Psalm 139:14", text: "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well." },
  ],
  Purpose: [
    { ref: "Jeremiah 1:5", text: "Before I formed you in the womb I knew you, before you were born I set you apart; I appointed you as a prophet to the nations." },
    { ref: "Ephesians 1:11", text: "In him we were also chosen, having been predestined according to the plan of him who works out everything in conformity with the purpose of his will." },
    { ref: "Philippians 1:6", text: "Being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus." },
    { ref: "Proverbs 19:21", text: "Many are the plans in a person's heart, but it is the Lord's purpose that prevails." },
    { ref: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose." },
  ],
  Anger: [
    { ref: "James 1:19-20", text: "My dear brothers and sisters, take note of this: Everyone should be quick to listen, slow to speak and slow to become angry, because human anger does not produce the righteousness that God desires." },
    { ref: "Proverbs 15:1", text: "A gentle answer turns away wrath, but a harsh word stirs up anger." },
    { ref: "Ephesians 4:26-27", text: "In your anger do not sin: Do not let the sun go down while you are still angry, and do not give the devil a foothold." },
    { ref: "Proverbs 14:29", text: "Whoever is patient has great understanding, but one who is quick-tempered displays folly." },
    { ref: "Psalm 37:8", text: "Refrain from anger and turn from wrath; do not fret — it leads only to evil." },
  ],
  Jealousy: [
    { ref: "Proverbs 14:30", text: "A heart at peace gives life to the body, but envy rots the bones." },
    { ref: "Galatians 5:26", text: "Let us not become conceited, provoking and envying each other." },
    { ref: "James 3:16", text: "For where you have envy and selfish ambition, there you find disorder and every evil practice." },
    { ref: "1 Corinthians 13:4", text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud." },
    { ref: "Psalm 37:1-4", text: "Do not fret because of those who are evil or be envious of those who do wrong. Trust in the Lord and do good; dwell in the land and enjoy safe pasture. Take delight in the Lord, and he will give you the desires of your heart." },
  ],
  Depression: [
    { ref: "Psalm 42:11", text: "Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God." },
    { ref: "Psalm 40:1-2", text: "I waited patiently for the Lord; he turned to me and heard my cry. He lifted me out of the slimy pit, out of the mud and mire; he set my feet on a rock and gave me a firm place to stand." },
    { ref: "Isaiah 61:3", text: "To bestow on them a crown of beauty instead of ashes, the oil of joy instead of mourning, and a garment of praise instead of a spirit of despair." },
    { ref: "Psalm 34:17-18", text: "The righteous cry out, and the Lord hears them; he delivers them from all their troubles. The Lord is close to the brokenhearted and saves those who are crushed in spirit." },
    { ref: "Romans 8:38-39", text: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord." },
  ],
  Parenting: [
    { ref: "Proverbs 22:6", text: "Start children off on the way they should go, and even when they are old they will not turn from it." },
    { ref: "Deuteronomy 6:6-7", text: "These commandments that I give you today are to be on your hearts. Impress them on your children. Talk about them when you sit at home and when you walk along the road, when you lie down and when you get up." },
    { ref: "Psalm 127:3", text: "Children are a heritage from the Lord, offspring a reward from him." },
    { ref: "Ephesians 6:4", text: "Fathers, do not exasperate your children; instead, bring them up in the training and instruction of the Lord." },
    { ref: "3 John 1:4", text: "I have no greater joy than to hear that my children are walking in the truth." },
  ],
  "Work & Vocation": [
    { ref: "Colossians 3:23-24", text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters, since you know that you will receive an inheritance from the Lord as a reward. It is the Lord Christ you are serving." },
    { ref: "Proverbs 16:3", text: "Commit to the Lord whatever you do, and he will establish your plans." },
    { ref: "Genesis 2:15", text: "The Lord God took the man and put him in the Garden of Eden to work it and take care of it." },
    { ref: "Ecclesiastes 9:10", text: "Whatever your hand finds to do, do it with all your might, for in the realm of the dead, where you are going, there is neither working nor planning nor knowledge nor wisdom." },
    { ref: "1 Corinthians 10:31", text: "So whether you eat or drink or whatever you do, do it all for the glory of God." },
  ],
  "End Times": [
    { ref: "Revelation 21:1-2", text: "Then I saw a new heaven and a new earth, for the first heaven and the first earth had passed away, and there was no longer any sea. I saw the Holy City, the new Jerusalem, coming down out of heaven from God, prepared as a bride beautifully dressed for her husband." },
    { ref: "1 Thessalonians 4:16-17", text: "For the Lord himself will come down from heaven, with a loud command, with the voice of the archangel and with the trumpet call of God, and the dead in Christ will rise first. After that, we who are still alive and are left will be caught up together with them in the clouds to meet the Lord in the air." },
    { ref: "Matthew 24:42", text: "Therefore keep watch, because you do not know on what day your Lord will come." },
    { ref: "2 Peter 3:13", text: "But in keeping with his promise we are looking forward to a new heaven and a new earth, where righteousness dwells." },
    { ref: "Revelation 22:12", text: "Look, I am coming soon! My reward is with me, and I will give to each person according to what they have done." },
  ],
};

const TOPICS = Object.keys(VERSES);

export default function VerseFinder() {
  const [selected, setSelected] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [shared, setShared] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState("");
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites("livewell-saved-verses");

  // Daily Verse — cycles through all verses based on day of year
  const dailyVerse = useMemo(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const allVerses = Object.values(VERSES).flat();
    return allVerses[dayOfYear % allVerses.length];
  }, []);

  // Filter topics by search input
  const filteredTopics = useMemo(() => {
    if (!searchFilter.trim()) return TOPICS;
    return TOPICS.filter((t) => t.toLowerCase().includes(searchFilter.toLowerCase()));
  }, [searchFilter]);

  const handleToggleSave = (ref: string, text: string) => {
    const id = `verse-${ref}`;
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite({ id, type: "verse", content: { ref, text } });
    }
  };

  const handleCopy = (ref: string, text: string) => {
    navigator.clipboard.writeText(`${ref} — ${text}`);
    setCopied(ref);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleShare = (ref: string, text: string) => {
    const shareText = `\u{1F4D6} ${ref} — ${text} — via LiveWell by James Bell (livewellbyjamesbell.co/tools/verse-finder)`;
    navigator.clipboard.writeText(shareText);
    setShared(ref);
    setTimeout(() => setShared(null), 2000);
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
          {favorites.length > 0 && (
            <Link
              href="/tools/saved"
              style={{
                display: "inline-block", marginTop: "16px",
                fontSize: "13px", fontWeight: 600, fontFamily: "var(--U)",
                color: "var(--gold)", textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Saved Verses ({favorites.length})
            </Link>
          )}
        </div>
      </section>

      {/* Daily Verse */}
      <section style={{ padding: "36px 32px 0", background: "var(--paper)" }}>
        <div className="wrap" style={{ maxWidth: "900px" }}>
          <div style={{
            padding: "28px 32px",
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            borderLeft: "4px solid var(--gold)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <Sun size={16} style={{ color: "var(--gold)" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", color: "var(--gold)", fontFamily: "var(--U)", textTransform: "uppercase" }}>
                Verse of the Day
              </span>
            </div>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--gold)", fontFamily: "var(--U)", display: "block", marginBottom: "8px" }}>
              {dailyVerse.ref}
            </span>
            <p style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--ink)", fontFamily: "var(--B)", fontStyle: "italic", margin: 0 }}>
              "{dailyVerse.text}"
            </p>
            <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
              <button
                onClick={() => handleCopy(dailyVerse.ref, dailyVerse.text)}
                style={{ display: "flex", alignItems: "center", gap: "4px", padding: "6px 14px", background: "var(--cream)", border: "1px solid var(--border)", borderRadius: "4px", fontSize: "12px", fontFamily: "var(--U)", fontWeight: 600, color: "var(--ink3)", cursor: "pointer" }}
              >
                {copied === dailyVerse.ref ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
              </button>
              <button
                onClick={() => handleShare(dailyVerse.ref, dailyVerse.text)}
                style={{ display: "flex", alignItems: "center", gap: "4px", padding: "6px 14px", background: "var(--cream)", border: "1px solid var(--border)", borderRadius: "4px", fontSize: "12px", fontFamily: "var(--U)", fontWeight: 600, color: "var(--ink3)", cursor: "pointer" }}
              >
                {shared === dailyVerse.ref ? <><Check size={12} /> Copied</> : <><Share2 size={12} /> Share</>}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 32px", background: "var(--paper)" }}>
        <div className="wrap" style={{ maxWidth: "900px" }}>
          {/* Search / Filter */}
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--ink3)", pointerEvents: "none" }} />
            <input
              type="text"
              placeholder="Filter topics..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px 12px 40px",
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                fontSize: "14px",
                fontFamily: "var(--B)",
                color: "var(--ink)",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "12px", marginBottom: "40px" }}>
            {filteredTopics.map((topic) => (
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
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          onClick={() => handleCopy(v.ref, v.text)}
                          style={{ display: "flex", alignItems: "center", gap: "4px", padding: "4px 10px", background: "var(--cream)", border: "1px solid var(--border)", borderRadius: "4px", fontSize: "12px", fontFamily: "var(--U)", fontWeight: 600, color: "var(--ink3)", cursor: "pointer" }}
                        >
                          {copied === v.ref ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                        </button>
                        <button
                          onClick={() => handleShare(v.ref, v.text)}
                          style={{ display: "flex", alignItems: "center", gap: "4px", padding: "4px 10px", background: "var(--cream)", border: "1px solid var(--border)", borderRadius: "4px", fontSize: "12px", fontFamily: "var(--U)", fontWeight: 600, color: "var(--ink3)", cursor: "pointer" }}
                        >
                          {shared === v.ref ? <><Check size={12} /> Copied</> : <><Share2 size={12} /> Share</>}
                        </button>
                        <button
                          onClick={() => handleToggleSave(v.ref, v.text)}
                          style={{
                            display: "flex", alignItems: "center", gap: "4px",
                            padding: "4px 10px", background: isFavorite(`verse-${v.ref}`) ? "var(--gold)" : "var(--cream)",
                            border: `1px solid ${isFavorite(`verse-${v.ref}`) ? "var(--gold)" : "var(--border)"}`,
                            borderRadius: "4px", fontSize: "12px", fontFamily: "var(--U)",
                            fontWeight: 600,
                            color: isFavorite(`verse-${v.ref}`) ? "var(--charcoal)" : "var(--ink3)",
                            cursor: "pointer", transition: "all 0.2s",
                          }}
                          title={isFavorite(`verse-${v.ref}`) ? "Remove from saved" : "Save verse"}
                        >
                          <Heart size={12} fill={isFavorite(`verse-${v.ref}`) ? "var(--charcoal)" : "none"} />
                          {isFavorite(`verse-${v.ref}`) ? "Saved" : "Save"}
                        </button>
                      </div>
                    </div>
                    <p style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--ink)", fontFamily: "var(--B)", fontStyle: "italic" }}>
                      "{v.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!selected && filteredTopics.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--ink3)" }}>
              <Search size={48} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
              <p style={{ fontFamily: "var(--B)", fontSize: "16px" }}>No topics match "{searchFilter}"</p>
            </div>
          )}

          {!selected && filteredTopics.length > 0 && (
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
