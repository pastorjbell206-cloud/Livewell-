/**
 * Proverbs in 31 Days (/tools/proverbs-31) — a chapter of Proverbs a day,
 * matched to the date, the way the wisdom tradition has read it for centuries.
 * Each day carries a theme, a couple of verses worth knowing by heart, and a
 * reflection prompt that runs the chapter into a real decision. Defaults to
 * today's date. Static content. Pairs with /life/wisdom-for-all-of-life.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScriptureNote from "@/components/ScriptureNote";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Day {
  day: number;
  theme: string;
  verses: { ref: string; text: string }[];
  prompt: string;
}

const DAYS: Day[] = [
  { day: 1, theme: "The beginning of wisdom", verses: [{ ref: "Proverbs 1:7", text: "The fear of the Lord is the beginning of knowledge." }, { ref: "Proverbs 1:33", text: "Whoever listens to me will dwell secure and be at ease, without dread of disaster." }], prompt: "Where am I leaning on cleverness instead of the fear of the Lord." },
  { day: 2, theme: "The search for wisdom", verses: [{ ref: "Proverbs 2:4-5", text: "If you seek it like silver and search for it as for hidden treasures, then you will understand the fear of the Lord." }, { ref: "Proverbs 2:6", text: "The Lord gives wisdom. From his mouth come knowledge and understanding." }], prompt: "Am I seeking wisdom like treasure, or waiting for it to fall in my lap." },
  { day: 3, theme: "Trust the Lord, not yourself", verses: [{ ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart, and do not lean on your own understanding." }, { ref: "Proverbs 3:9", text: "Honor the Lord with your wealth and with the firstfruits of all your produce." }], prompt: "What decision am I leaning on my own understanding for right now." },
  { day: 4, theme: "Guard your heart", verses: [{ ref: "Proverbs 4:23", text: "Keep your heart with all vigilance, for from it flow the springs of life." }, { ref: "Proverbs 4:7", text: "The beginning of wisdom is this: Get wisdom, and whatever you get, get insight." }], prompt: "What am I letting into my heart that is shaping me without my noticing." },
  { day: 5, theme: "Faithfulness at home", verses: [{ ref: "Proverbs 5:18-19", text: "Rejoice in the wife of your youth. Be intoxicated always in her love." }, { ref: "Proverbs 5:21", text: "A man's ways are before the eyes of the Lord, and he ponders all his paths." }], prompt: "Where do I need to tend faithfulness rather than wander toward what glitters." },
  { day: 6, theme: "The sluggard and the ant", verses: [{ ref: "Proverbs 6:6", text: "Go to the ant, O sluggard. Consider her ways, and be wise." }, { ref: "Proverbs 6:10-11", text: "A little sleep, a little folding of the hands, and poverty will come upon you like a robber." }], prompt: "Where am I telling myself a little more delay will not cost me." },
  { day: 7, theme: "The trap of desire", verses: [{ ref: "Proverbs 7:2-3", text: "Keep my commandments and live. Bind them on your fingers, write them on the tablet of your heart." }, { ref: "Proverbs 7:25", text: "Let not your heart turn aside to her ways. Do not stray into her paths." }], prompt: "What path am I tempted to wander down that I know ends badly." },
  { day: 8, theme: "Wisdom calls aloud", verses: [{ ref: "Proverbs 8:11", text: "Wisdom is better than jewels, and all that you may desire cannot compare with her." }, { ref: "Proverbs 8:35", text: "Whoever finds me finds life and obtains favor from the Lord." }], prompt: "Do I treat wisdom as more valuable than the things I actually chase." },
  { day: 9, theme: "Two invitations", verses: [{ ref: "Proverbs 9:10", text: "The fear of the Lord is the beginning of wisdom, and the knowledge of the Holy One is insight." }, { ref: "Proverbs 9:6", text: "Leave your simple ways, and live, and walk in the way of insight." }], prompt: "Which voice am I answering today, wisdom's or folly's." },
  { day: 10, theme: "The restrained mouth", verses: [{ ref: "Proverbs 10:19", text: "When words are many, transgression is not lacking, but whoever restrains his lips is prudent." }, { ref: "Proverbs 10:12", text: "Hatred stirs up strife, but love covers all offenses." }], prompt: "Where do I need fewer words and more love today." },
  { day: 11, theme: "Generosity enriches", verses: [{ ref: "Proverbs 11:24-25", text: "One gives freely, yet grows all the richer. Whoever brings blessing will be enriched." }, { ref: "Proverbs 11:2", text: "When pride comes, then comes disgrace, but with the humble is wisdom." }], prompt: "Where is my hand closed that God is asking me to open." },
  { day: 12, theme: "Words that heal", verses: [{ ref: "Proverbs 12:18", text: "There is one whose rash words are like sword thrusts, but the tongue of the wise brings healing." }, { ref: "Proverbs 12:25", text: "Anxiety in a man's heart weighs him down, but a good word makes him glad." }], prompt: "Whose heart could a good word from me lift today." },
  { day: 13, theme: "Slow and steady", verses: [{ ref: "Proverbs 13:11", text: "Wealth gained hastily will dwindle, but whoever gathers little by little will increase it." }, { ref: "Proverbs 13:20", text: "Whoever walks with the wise becomes wise, but the companion of fools will suffer harm." }], prompt: "Who am I walking with, and is it making me wiser or not." },
  { day: 14, theme: "The way that seems right", verses: [{ ref: "Proverbs 14:12", text: "There is a way that seems right to a man, but its end is the way to death." }, { ref: "Proverbs 14:29", text: "Whoever is slow to anger has great understanding, but he who has a hasty temper exalts folly." }], prompt: "Where does my gut feel right but might be leading me wrong." },
  { day: 15, theme: "A soft answer", verses: [{ ref: "Proverbs 15:1", text: "A soft answer turns away wrath, but a harsh word stirs up anger." }, { ref: "Proverbs 15:13", text: "A glad heart makes a cheerful face, but by sorrow of heart the spirit is crushed." }], prompt: "In which conversation can I test the soft answer this week." },
  { day: 16, theme: "The Lord directs the steps", verses: [{ ref: "Proverbs 16:9", text: "The heart of man plans his way, but the Lord establishes his steps." }, { ref: "Proverbs 16:32", text: "Whoever is slow to anger is better than the mighty, and he who rules his spirit than he who takes a city." }], prompt: "What plan do I need to hold with an open hand before the Lord." },
  { day: 17, theme: "A friend loves at all times", verses: [{ ref: "Proverbs 17:17", text: "A friend loves at all times, and a brother is born for adversity." }, { ref: "Proverbs 17:22", text: "A joyful heart is good medicine, but a crushed spirit dries up the bones." }], prompt: "Which friend do I need to show up for in their hard season." },
  { day: 18, theme: "The power of the tongue", verses: [{ ref: "Proverbs 18:21", text: "Death and life are in the power of the tongue, and those who love it will eat its fruits." }, { ref: "Proverbs 18:24", text: "There is a friend who sticks closer than a brother." }], prompt: "Are my words this week dealing out more life or more death." },
  { day: 19, theme: "Patience and the poor", verses: [{ ref: "Proverbs 19:11", text: "Good sense makes one slow to anger, and it is his glory to overlook an offense." }, { ref: "Proverbs 19:17", text: "Whoever is generous to the poor lends to the Lord, and he will repay him for his deed." }], prompt: "What offense could I choose to overlook rather than nurse." },
  { day: 20, theme: "Honesty and self-control", verses: [{ ref: "Proverbs 20:1", text: "Wine is a mocker, strong drink a brawler, and whoever is led astray by it is not wise." }, { ref: "Proverbs 20:3", text: "It is an honor for a man to keep aloof from strife, but every fool will be quarreling." }], prompt: "Which appetite or quarrel do I need to keep aloof from." },
  { day: 21, theme: "The Lord weighs the heart", verses: [{ ref: "Proverbs 21:2", text: "Every way of a man is right in his own eyes, but the Lord weighs the heart." }, { ref: "Proverbs 21:3", text: "To do righteousness and justice is more acceptable to the Lord than sacrifice." }], prompt: "Where am I justifying myself when the Lord is weighing my heart." },
  { day: 22, theme: "A good name", verses: [{ ref: "Proverbs 22:1", text: "A good name is to be chosen rather than great riches, and favor is better than silver or gold." }, { ref: "Proverbs 22:6", text: "Train up a child in the way he should go, and when he is old he will not depart from it." }], prompt: "Am I building a good name or just chasing what money can buy." },
  { day: 23, theme: "Do not wear yourself out for wealth", verses: [{ ref: "Proverbs 23:4-5", text: "Do not toil to acquire wealth. When your eyes light on it, it is gone, for it sprouts wings and flies away." }, { ref: "Proverbs 23:17", text: "Let your heart not envy sinners, but continue in the fear of the Lord all the day." }], prompt: "What am I wearing myself out for that will sprout wings and fly away." },
  { day: 24, theme: "Wisdom builds a house", verses: [{ ref: "Proverbs 24:3-4", text: "By wisdom a house is built, and by understanding it is established. By knowledge the rooms are filled with riches." }, { ref: "Proverbs 24:16", text: "The righteous falls seven times and rises again, but the wicked stumble in times of calamity." }], prompt: "Where do I need to get back up rather than stay down after a fall." },
  { day: 25, theme: "Restraint and the right word", verses: [{ ref: "Proverbs 25:11", text: "A word fitly spoken is like apples of gold in a setting of silver." }, { ref: "Proverbs 25:28", text: "A man without self-control is like a city broken into and left without walls." }], prompt: "Where are my walls down, and what self-control needs rebuilding." },
  { day: 26, theme: "The fool and the gossip", verses: [{ ref: "Proverbs 26:11", text: "Like a dog that returns to his vomit is a fool who repeats his folly." }, { ref: "Proverbs 26:20", text: "For lack of wood the fire goes out, and where there is no whisperer, quarreling ceases." }], prompt: "What folly do I keep returning to, and what gossip can I starve of fuel." },
  { day: 27, theme: "Faithful wounds of a friend", verses: [{ ref: "Proverbs 27:6", text: "Faithful are the wounds of a friend. Profuse are the kisses of an enemy." }, { ref: "Proverbs 27:17", text: "Iron sharpens iron, and one man sharpens another." }], prompt: "Whose honest correction have I been avoiding because it stings." },
  { day: 28, theme: "The bold and the honest", verses: [{ ref: "Proverbs 28:13", text: "Whoever conceals his transgressions will not prosper, but he who confesses and forsakes them will obtain mercy." }, { ref: "Proverbs 28:1", text: "The wicked flee when no one pursues, but the righteous are bold as a lion." }], prompt: "What am I concealing that I need to confess and forsake." },
  { day: 29, theme: "The fear of man", verses: [{ ref: "Proverbs 29:25", text: "The fear of man lays a snare, but whoever trusts in the Lord is safe." }, { ref: "Proverbs 29:11", text: "A fool gives full vent to his spirit, but a wise man quietly holds it back." }], prompt: "Whose approval am I afraid of losing more than I fear the Lord." },
  { day: 30, theme: "Agur's prayer for enough", verses: [{ ref: "Proverbs 30:8-9", text: "Give me neither poverty nor riches. Feed me with the food that is needful for me, lest I be full and deny you, or be poor and steal." }, { ref: "Proverbs 30:5", text: "Every word of God proves true. He is a shield to those who take refuge in him." }], prompt: "What is enough for me, and have I ever actually named it." },
  { day: 31, theme: "Wisdom embodied", verses: [{ ref: "Proverbs 31:30", text: "Charm is deceitful, and beauty is vain, but a woman who fears the Lord is to be praised." }, { ref: "Proverbs 31:26", text: "She opens her mouth with wisdom, and the teaching of kindness is on her tongue." }], prompt: "What would it look like for the fear of the Lord to be embodied in my ordinary work this week." },
];

function todayDay(): number {
  const d = new Date().getDate();
  return Math.min(31, Math.max(1, d));
}

export default function Proverbs31() {
  const [day, setDay] = useState<number>(todayDay());
  const entry = DAYS[day - 1];

  return (
    <Layout>
      <SEOMeta
        title="Proverbs in 31 Days — A Chapter a Day for the Wise Life"
        description="A chapter of Proverbs a day, matched to the date, the way the wisdom tradition has read it for centuries. A theme, a verse worth knowing, and a reflection."
        url="https://www.livewellbyjamesbell.co/tools/proverbs-31"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>A tool · Integrated Life</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 5vw, 50px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "16ch" }}>
            Proverbs in 31 days
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "62ch" }}>
            There are thirty-one chapters for a reason. Read one a day, matched to the date, the way the church has read Proverbs for centuries. Do not study it. Live in it, and let one line follow you into the day's decisions.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={{ ...wrap, maxWidth: "720px" }}>
          {/* Day navigator */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--s-4)" }}>
            <button
              onClick={() => setDay((d) => (d > 1 ? d - 1 : 31))}
              aria-label="Previous day"
              style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 14px", background: "var(--card)", border: "1px solid rgba(20,17,12,0.12)", fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--ink)" }}
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", color: "var(--mustard-text)", textTransform: "uppercase" }}>Day {entry.day} of 31</div>
              {day === todayDay() && <div style={{ fontFamily: "var(--U)", fontSize: "11px", color: "var(--ink-muted)" }}>today</div>}
            </div>
            <button
              onClick={() => setDay((d) => (d < 31 ? d + 1 : 1))}
              aria-label="Next day"
              style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 14px", background: "var(--card)", border: "1px solid rgba(20,17,12,0.12)", fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--ink)" }}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>

          {/* The day */}
          <div style={{ borderTop: "2px solid var(--mustard)", paddingTop: "var(--s-4)" }}>
            <div style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", color: "var(--mustard-text)", textTransform: "uppercase", marginBottom: "6px" }}>Proverbs {entry.day}</div>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "var(--s-4)" }}>{entry.theme}</h2>

            <ScriptureNote rendering="unverified" />
            <div style={{ display: "grid", gap: "10px", marginBottom: "var(--s-4)" }}>
              {entry.verses.map((v) => (
                <div key={v.ref} style={{ background: "var(--card)", borderLeft: "3px solid var(--mustard)", padding: "var(--s-3)" }}>
                  <Link href={`/theology/passage?ref=${encodeURIComponent(v.ref)}`} style={{ display: "inline-block", fontFamily: "var(--U)", fontSize: "12.5px", fontWeight: 600, letterSpacing: "0.06em", color: "var(--mustard-text)", marginBottom: "6px", textDecoration: "none", borderBottom: "1px solid var(--mustard)" }}>{v.ref} →</Link>
                  <div style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.65, color: "var(--ink)" }}>{v.text}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "var(--charcoal)", padding: "var(--s-4)", color: "var(--bone)" }}>
              <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "8px" }}>Carry it into the day</div>
              <p style={{ fontFamily: "var(--F)", fontSize: "20px", lineHeight: 1.45, maxWidth: "52ch" }}>{entry.prompt}</p>
            </div>

            <p style={{ fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink-muted)", marginTop: "var(--s-3)" }}>
              Open your Bible to Proverbs {entry.day} and read the whole chapter slowly. These are only the door.
            </p>
          </div>

          <div style={{ marginTop: "var(--s-5)", borderTop: "1px solid rgba(20,17,12,0.1)", paddingTop: "var(--s-3)", display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
            <Link href="/life/wisdom-for-all-of-life" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Read: Wisdom for All of Life</Link>
            <Link href="/tools/bible-on" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>What the Bible says about</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
