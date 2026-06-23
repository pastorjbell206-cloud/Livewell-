/**
 * What the Bible Says About (/tools/bible-on) — a topical guide to Scripture
 * for the arenas of ordinary life. Pick a topic and get a short framing in the
 * LiveWell voice and a curated set of passages, with the references and the
 * heart of each verse. All content is static; texts are brief paraphrase-level
 * renderings pointing the reader to open their own Bible. Pairs with
 * /life/wisdom-for-all-of-life.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useState } from "react";
import { Link } from "wouter";
import { Copy, Check } from "lucide-react";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Verse {
  ref: string;
  text: string;
}
interface Topic {
  id: string;
  label: string;
  framing: string;
  verses: Verse[];
}

const TOPICS: Topic[] = [
  {
    id: "money",
    label: "Money",
    framing: "Scripture is not squeamish about money. It treats it as a matter of the heart, where the treasure is, there the heart will be also, and it warns that the love of it, not the thing itself, is a root of every kind of evil.",
    verses: [
      { ref: "Matthew 6:21", text: "Where your treasure is, there your heart will be also." },
      { ref: "1 Timothy 6:10", text: "The love of money is a root of all kinds of evil." },
      { ref: "Proverbs 13:11", text: "Wealth gained hastily will dwindle, but whoever gathers little by little will increase it." },
      { ref: "Proverbs 22:7", text: "The borrower is the slave of the lender." },
      { ref: "Hebrews 13:5", text: "Keep your life free from love of money, and be content with what you have." },
      { ref: "Luke 12:15", text: "A person's life does not consist in the abundance of possessions." },
    ],
  },
  {
    id: "tongue",
    label: "The Tongue and Words",
    framing: "Most relationships are not destroyed by a knife but by a sentence. Scripture treats the tongue as a small thing with the power of life and death, and it teaches you to weigh your words the way a jeweler weighs gold.",
    verses: [
      { ref: "Proverbs 18:21", text: "Death and life are in the power of the tongue." },
      { ref: "Proverbs 15:1", text: "A soft answer turns away wrath, but a harsh word stirs up anger." },
      { ref: "James 1:19", text: "Be quick to hear, slow to speak, slow to anger." },
      { ref: "Ephesians 4:29", text: "Let no corrupting talk come out of your mouths, but only such as builds up." },
      { ref: "Proverbs 17:28", text: "Even a fool who keeps silent is considered wise." },
      { ref: "James 3:5", text: "How great a forest is set ablaze by such a small fire." },
    ],
  },
  {
    id: "anger",
    label: "Anger",
    framing: "Scripture does not forbid all anger, but it puts a clock on it and a guard around it. The aim is not a person who never burns, but one who rules his own spirit, which it ranks higher than taking a city.",
    verses: [
      { ref: "Ephesians 4:26", text: "Be angry and do not sin. Do not let the sun go down on your anger." },
      { ref: "Proverbs 16:32", text: "Whoever is slow to anger is better than the mighty." },
      { ref: "James 1:20", text: "The anger of man does not produce the righteousness of God." },
      { ref: "Proverbs 29:11", text: "A fool gives full vent to his spirit, but a wise man quietly holds it back." },
      { ref: "Proverbs 15:18", text: "A hot-tempered man stirs up strife, but he who is slow to anger quiets contention." },
    ],
  },
  {
    id: "anxiety",
    label: "Anxiety and Worry",
    framing: "The command not to be anxious is never a verdict against the fearful. It is an invitation to bring everything, and a promise of a peace that stands guard over the mind. Scripture meets the anxious with presence, not a scolding.",
    verses: [
      { ref: "Philippians 4:6-7", text: "Do not be anxious about anything, but in everything by prayer let your requests be made known to God." },
      { ref: "1 Peter 5:7", text: "Cast all your anxieties on him, because he cares for you." },
      { ref: "Matthew 6:34", text: "Do not be anxious about tomorrow, for tomorrow will be anxious for itself." },
      { ref: "Isaiah 41:10", text: "Fear not, for I am with you. Be not dismayed, for I am your God." },
      { ref: "Psalm 94:19", text: "When the cares of my heart are many, your consolations cheer my soul." },
    ],
  },
  {
    id: "work",
    label: "Work and Calling",
    framing: "Work is older than the fall. God gave it as a calling before sin made it hard, and Scripture dignifies it as something done for the Lord, whatever your hands find to do.",
    verses: [
      { ref: "Colossians 3:23", text: "Whatever you do, work heartily, as for the Lord and not for men." },
      { ref: "Genesis 2:15", text: "The Lord God took the man and put him in the garden to work it and keep it." },
      { ref: "Proverbs 14:23", text: "In all toil there is profit, but mere talk tends only to poverty." },
      { ref: "Ecclesiastes 3:13", text: "Everyone should eat and drink and take pleasure in all his toil. This is God's gift." },
      { ref: "1 Corinthians 10:31", text: "Whether you eat or drink, do all to the glory of God." },
    ],
  },
  {
    id: "marriage",
    label: "Marriage",
    framing: "Scripture frames marriage as covenant, not contract, a one-flesh union that pictures the love of Christ for the church. It aims the heaviest command not at the wife but at the husband, to love as Christ loved, who gave himself up.",
    verses: [
      { ref: "Genesis 2:24", text: "A man shall hold fast to his wife, and they shall become one flesh." },
      { ref: "Ephesians 5:25", text: "Husbands, love your wives, as Christ loved the church and gave himself up for her." },
      { ref: "1 Corinthians 13:4-5", text: "Love is patient and kind. It is not irritable or resentful." },
      { ref: "Ecclesiastes 4:9", text: "Two are better than one, because they have a good reward for their toil." },
      { ref: "Colossians 3:13", text: "Bear with each other and forgive one another, as the Lord has forgiven you." },
    ],
  },
  {
    id: "friendship",
    label: "Friendship",
    framing: "Scripture knows you become the average of the people you keep close. It honors the friend who wounds faithfully over the enemy who flatters, and it says a brother is born for the hard day.",
    verses: [
      { ref: "Proverbs 17:17", text: "A friend loves at all times, and a brother is born for adversity." },
      { ref: "Proverbs 27:6", text: "Faithful are the wounds of a friend, profuse are the kisses of an enemy." },
      { ref: "Proverbs 27:17", text: "Iron sharpens iron, and one man sharpens another." },
      { ref: "Proverbs 13:20", text: "Whoever walks with the wise becomes wise, but the companion of fools will suffer harm." },
      { ref: "Ecclesiastes 4:10", text: "If they fall, one will lift up his fellow. But woe to him who is alone when he falls." },
    ],
  },
  {
    id: "generosity",
    label: "Generosity and Giving",
    framing: "Giving is the cure Scripture prescribes for the grip of greed. It ties the open hand to joy and calls the cheerful giver the one God loves, because generosity is how a heart proves it trusts the Giver.",
    verses: [
      { ref: "2 Corinthians 9:7", text: "God loves a cheerful giver." },
      { ref: "Proverbs 11:25", text: "Whoever brings blessing will be enriched, and one who waters will himself be watered." },
      { ref: "Acts 20:35", text: "It is more blessed to give than to receive." },
      { ref: "Proverbs 19:17", text: "Whoever is generous to the poor lends to the Lord." },
      { ref: "Luke 6:38", text: "Give, and it will be given to you, good measure, pressed down, running over." },
    ],
  },
  {
    id: "suffering",
    label: "Suffering",
    framing: "Scripture never tells the suffering to pretend. It gives them a third of the Psalms as lament, walks them to Gethsemane where the sinless Son sweated blood, and promises not the absence of the valley but a presence in it.",
    verses: [
      { ref: "Psalm 34:18", text: "The Lord is near to the brokenhearted and saves the crushed in spirit." },
      { ref: "Romans 8:18", text: "The sufferings of this present time are not worth comparing with the glory to be revealed." },
      { ref: "2 Corinthians 1:3-4", text: "The God of all comfort, who comforts us in all our affliction." },
      { ref: "Psalm 23:4", text: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me." },
      { ref: "Romans 5:3-4", text: "Suffering produces endurance, and endurance produces character, and character produces hope." },
    ],
  },
  {
    id: "wisdom",
    label: "Wisdom",
    framing: "Wisdom in Scripture is not raw intelligence but the skill of living well, and it begins not with technique but with a posture, the fear of the Lord. Strip that out and you get cleverness, which is folly that has learned to dress well.",
    verses: [
      { ref: "Proverbs 9:10", text: "The fear of the Lord is the beginning of wisdom." },
      { ref: "James 1:5", text: "If any of you lacks wisdom, let him ask God, who gives generously." },
      { ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart, and do not lean on your own understanding." },
      { ref: "Proverbs 4:7", text: "The beginning of wisdom is this: Get wisdom, and whatever you get, get insight." },
      { ref: "Colossians 2:3", text: "In Christ are hidden all the treasures of wisdom and knowledge." },
    ],
  },
  {
    id: "forgiveness",
    label: "Forgiveness",
    framing: "Scripture sets the standard for forgiving not at what the other person deserves but at what you have been given. Forgive as God in Christ forgave you, which is to say freely, fully, and before it was earned.",
    verses: [
      { ref: "Ephesians 4:32", text: "Forgiving one another, as God in Christ forgave you." },
      { ref: "Colossians 3:13", text: "As the Lord has forgiven you, so you also must forgive." },
      { ref: "Matthew 6:14", text: "If you forgive others their trespasses, your heavenly Father will also forgive you." },
      { ref: "Matthew 18:21-22", text: "Not seven times, but seventy-seven times." },
      { ref: "Mark 11:25", text: "Whenever you stand praying, forgive, if you have anything against anyone." },
    ],
  },
  {
    id: "contentment",
    label: "Contentment",
    framing: "Contentment, Scripture insists, is learned, not felt. Paul says he learned the secret in plenty and in hunger, and it was never about having more but about being held by One who will never leave.",
    verses: [
      { ref: "Philippians 4:11-12", text: "I have learned in whatever situation I am to be content." },
      { ref: "1 Timothy 6:6", text: "Godliness with contentment is great gain." },
      { ref: "Hebrews 13:5", text: "Be content with what you have, for he has said, I will never leave you nor forsake you." },
      { ref: "Psalm 23:1", text: "The Lord is my shepherd. I shall not want." },
      { ref: "Proverbs 30:8", text: "Give me neither poverty nor riches. Feed me with the food that is needful for me." },
    ],
  },
  {
    id: "fear",
    label: "Fear and Courage",
    framing: "The biblical fear not is almost never a demand to feel brave. It is a presence promise, fear not, for I am with you, and the courage it produces is borrowed from the One who goes ahead.",
    verses: [
      { ref: "Joshua 1:9", text: "Be strong and courageous. Do not be frightened, for the Lord your God is with you." },
      { ref: "Psalm 27:1", text: "The Lord is my light and my salvation. Whom shall I fear." },
      { ref: "Isaiah 43:1", text: "Fear not, for I have redeemed you. I have called you by name, you are mine." },
      { ref: "2 Timothy 1:7", text: "God gave us a spirit not of fear but of power and love and self-control." },
      { ref: "Psalm 56:3", text: "When I am afraid, I put my trust in you." },
    ],
  },
  {
    id: "humility",
    label: "Pride and Humility",
    framing: "Scripture names pride as the root that goes before a fall and humility as the soil grace grows in. The pattern is the descent of Christ, who did not grasp, but emptied himself, and was lifted up.",
    verses: [
      { ref: "Proverbs 16:18", text: "Pride goes before destruction, and a haughty spirit before a fall." },
      { ref: "James 4:6", text: "God opposes the proud but gives grace to the humble." },
      { ref: "Philippians 2:3", text: "In humility count others more significant than yourselves." },
      { ref: "1 Peter 5:6", text: "Humble yourselves under the mighty hand of God, so that he may exalt you." },
      { ref: "Micah 6:8", text: "Do justice, love kindness, and walk humbly with your God." },
    ],
  },
];

export default function BibleOnTopic() {
  const initial = (() => {
    if (typeof window === "undefined") return TOPICS[0].id;
    const q = new URLSearchParams(window.location.search).get("topic");
    return q && TOPICS.some((t) => t.id === q) ? q : TOPICS[0].id;
  })();
  const [topicId, setTopicId] = useState<string>(initial);
  const [copied, setCopied] = useState(false);
  const topic = TOPICS.find((t) => t.id === topicId) || TOPICS[0];

  async function copyTopic() {
    const text = [
      `WHAT THE BIBLE SAYS ABOUT ${topic.label.toUpperCase()}`,
      "",
      topic.framing,
      "",
      ...topic.verses.map((v) => `${v.ref}\n${v.text}\n`),
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <Layout>
      <SEOMeta
        title="What the Bible Says About — A Topical Scripture Guide for Life"
        description="What does Scripture actually say about money, the tongue, anger, anxiety, work, marriage, friendship, suffering, forgiveness, and more. A topical guide with the heart of each passage, in the LiveWell voice."
        url="https://www.livewellbyjamesbell.co/tools/bible-on"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>A tool · Integrated Life</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 5vw, 50px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            What the Bible says about
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "62ch" }}>
            Most of life is lived in the place no single command reaches. Pick an arena of life below and see what Scripture actually says, the heart of the passages worth knowing by heart, so you can open your own Bible and read them in full.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          {/* topic chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "var(--s-4)" }}>
            {TOPICS.map((t) => {
              const on = t.id === topicId;
              return (
                <button
                  key={t.id}
                  onClick={() => { setTopicId(t.id); setCopied(false); }}
                  style={{
                    cursor: "pointer", padding: "8px 14px",
                    background: on ? "var(--mustard)" : "#FFFFFF",
                    color: on ? "var(--charcoal)" : "var(--ink)",
                    border: "1px solid rgba(20,17,12,0.12)",
                    fontFamily: "var(--U)", fontWeight: 600, fontSize: "13.5px",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          <div style={{ maxWidth: "720px", borderTop: "2px solid var(--mustard)", paddingTop: "var(--s-4)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "var(--s-3)" }}>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)" }}>{topic.label}</h2>
              <button onClick={copyTopic} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 16px", background: "var(--charcoal)", color: "var(--bone)", border: "none", fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px" }}>
                {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.75, color: "var(--ink)", marginBottom: "var(--s-4)" }}>{topic.framing}</p>

            <div style={{ display: "grid", gap: "10px" }}>
              {topic.verses.map((v) => (
                <div key={v.ref} style={{ background: "#FFFFFF", borderLeft: "3px solid var(--mustard)", padding: "var(--s-3)" }}>
                  <div style={{ fontFamily: "var(--U)", fontSize: "12.5px", fontWeight: 600, letterSpacing: "0.06em", color: "var(--mustard-text)", marginBottom: "6px" }}>{v.ref}</div>
                  <div style={{ fontFamily: "var(--B)", fontSize: "16.5px", lineHeight: 1.65, color: "var(--ink)" }}>{v.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "var(--s-5)", borderTop: "1px solid rgba(20,17,12,0.1)", paddingTop: "var(--s-3)", display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
            <Link href="/life/wisdom-for-all-of-life" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Read: Wisdom for All of Life</Link>
            <Link href="/life" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>The Integrated Life</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
