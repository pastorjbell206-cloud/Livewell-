/**
 * The seeker's front door (/help). A person arrives carrying a felt need, not
 * a theological category. This page meets that: pick what you are facing and
 * get, in one place, the essay to read, the assessment to take, the tool or
 * practice to try, and a prayer. Every link points to a route that exists.
 *
 * This is the reader-first counterpart to the catalog-first pillar nav: it
 * gathers the assets that were already on the site but scattered across
 * topical pages, the tools hub, and the life domains.
 */
import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { BookOpen, ClipboardCheck, Hand, Heart } from "lucide-react";
import { SKEPTIC_TRACK_LIVE } from "@/lib/skepticTrack";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Help { href: string; label: string; kind: "read" | "assess" | "do" | "pray" }
interface Need {
  id: string;
  title: string;       // felt-need, in the person's own words
  opener: string;      // a short, warm, plain line that names the ache
  helps: Help[];
}

const NEEDS: Need[] = [
  {
    id: "marriage",
    title: "My marriage is in trouble",
    opener: "Not a tune-up. A marriage that needs more than tips, from someone who refuses to hand you tips.",
    helps: [
      { href: "/marriage-crisis", label: "Read: when the marriage itself is the crisis — start here", kind: "read" },
      { href: "/plans/marriage", label: "Do: an eight-week guided plan toward each other", kind: "do" },
      { href: "/marriage", label: "Read: writing on covenant, conflict, and the long middle", kind: "read" },
      { href: "/tools/marriage-assessment", label: "Assess: where your marriage is strong and where it is strained", kind: "assess" },
      { href: "/tools/conflict-guide", label: "Do: a guided path through a real conflict", kind: "do" },
      { href: "/tools/prayer-generator", label: "Pray: a prayer for a marriage under weight", kind: "pray" },
    ],
  },
  {
    id: "anxious",
    title: "I am anxious or overwhelmed",
    opener: "The 3am mind. The body that will not settle. This is not a lack of faith, and you are not the only one.",
    helps: [
      { href: "/plans/anxiety", label: "Do: an eight-week guided plan toward a quieter mind", kind: "do" },
      { href: "/life/the-anxious-mind", label: "Read: faith and the anxious mind, honestly", kind: "read" },
      { href: "/tools/emotional-health", label: "Assess: an honest read on where you are", kind: "assess" },
      { href: "/life/the-body-and-the-rhythms", label: "Do: the body, sleep, and rest as part of the cure", kind: "do" },
      { href: "/tools/prayer-generator", label: "Pray: a prayer when the fear will not lift", kind: "pray" },
    ],
  },
  {
    id: "doubt",
    title: "I believe, but I am full of doubt",
    opener: "Doubt is not the opposite of faith. It is often part of a living one. You do not have to hide it here.",
    helps: [
      { href: "/faith-crisis", label: "Read: for the season when the whole faith feels like it is failing", kind: "read" },
      { href: "/honest-questions", label: "Read: the honest questions, taken seriously", kind: "read" },
      { href: "/doubt", label: "Read: doubt as part of a living faith", kind: "read" },
      { href: "/theology/questions", label: "Read: the hard questions, answered honestly", kind: "read" },
      { href: "/resources/context", label: "Do: read the Bible in its real context, not the caricature", kind: "do" },
      { href: "/tools/prayer-generator", label: "Pray: a prayer for when belief is thin", kind: "pray" },
    ],
  },
  {
    id: "deconstructing",
    title: "I am deconstructing my faith",
    opener: "No panic here, and no shame. Many people are not leaving Jesus. They are leaving a version of him someone sold them. Take the questions seriously, and take your time.",
    helps: [
      { href: "/deconstruction", label: "Read: deconstruction named honestly — grief, anger, and what can be rebuilt", kind: "read" },
      { href: "/church-hurt", label: "Read: when the church itself did the wounding", kind: "read" },
      { href: "/plans/deconstruction", label: "Do: eight weeks of taking your questions seriously", kind: "do" },
      { href: "/resources/context/the-bible-is-not-an-american-book", label: "Read: separating Jesus from the version you were handed", kind: "read" },
      { href: "/disruption", label: "Read: what the church got wrong, said plainly by a pastor", kind: "read" },
      { href: "/theology/compare", label: "Do: see every position side by side, fairly", kind: "do" },
    ],
  },
  {
    id: "skeptic",
    title: "I do not believe, and I am curious",
    opener: "Written for you by a pastor who was an atheist first. No tricks, no ambush, no altar call. Just the material, taken as seriously as you take it.",
    helps: [
      { href: "/post-christian", label: "Read: faith examined from outside the church, no altar call", kind: "read" },
      { href: "/plans/skeptic", label: "Do: eight weeks of reading like an adult", kind: "do" },
      { href: "/skeptic-track", label: "Read: the skeptic track, in argument order", kind: "read" },
      { href: "/resources/context", label: "Read: the Bible in its real history, cited to scholarship", kind: "read" },
      { href: "/theology/questions", label: "Read: the hardest questions, not dodged", kind: "read" },
    ],
  },
  {
    id: "new-believer",
    title: "I am new to faith and do not know what to do next",
    opener: "Welcome. Nobody expects you to know the words yet. Here is how to begin, one small step at a time, with everything explained.",
    helps: [
      { href: "/plans/new-believer", label: "Do: eight weeks of beginnings", kind: "do" },
      { href: "/pathways", label: "Read: the pathway from new believer to mature", kind: "read" },
      { href: "/tools/prayer-generator", label: "Pray: how to pray when you do not know how", kind: "pray" },
      { href: "/start", label: "Assess: find your starting place", kind: "assess" },
    ],
  },
  {
    id: "grief",
    title: "I am grieving a loss",
    opener: "No trite comfort here. Lament is the language faith gives the grieving, and you are allowed to use it.",
    helps: [
      { href: "/plans/grief", label: "Do: an eight-week companion through loss", kind: "do" },
      { href: "/grief", label: "Read: walking through grief without the cliches", kind: "read" },
      { href: "/life/grief-and-loss", label: "Read: loss faced honestly, and where to find help", kind: "read" },
      { href: "/lament", label: "Do: the practice of lament", kind: "do" },
      { href: "/tools/prayer-generator", label: "Pray: a prayer in suffering", kind: "pray" },
    ],
  },
  {
    id: "parenting",
    title: "Parenting is harder than anyone said",
    opener: "From a father of five sons who was raised without a father. Formation over performance, presence over advice.",
    helps: [
      { href: "/parenting-help", label: "Read: for the stretch of parenting nobody warned you about", kind: "read" },
      { href: "/parenting", label: "Read: writing on raising children in the faith", kind: "read" },
      { href: "/tools/parenting-guide", label: "Assess: guidance for your child's stage", kind: "assess" },
      { href: "/tools/family-devotions", label: "Do: build a fifteen-minute family devotion", kind: "do" },
      { href: "/family", label: "Read: the family discipleship hub", kind: "read" },
    ],
  },
  {
    id: "money",
    title: "Money is a weight on me",
    opener: "Debt, fear, the never-enough. This is heart-formation before it is budgeting, and Scripture says more than you think.",
    helps: [
      { href: "/life/money-and-the-heart", label: "Read: money, contentment, and the rival god", kind: "read" },
      { href: "/tools/financial-health", label: "Assess: an honest financial-health check", kind: "assess" },
      { href: "/tools/prayer-generator", label: "Pray: a prayer for provision and freedom from fear", kind: "pray" },
    ],
  },
  {
    id: "burnout",
    title: "I am a leader running on empty",
    opener: "The loneliest job in the room. If you are a pastor near the end of yourself, start here. Seeking help is faith, not failure.",
    helps: [
      { href: "/pastoral-burnout", label: "Read: why pastors leave, and how to stay whole", kind: "read" },
    ],
  },
  {
    id: "grow",
    title: "I just want to grow, and follow well",
    opener: "Not in crisis. You want the whole of life to come under one Lord, on an ordinary Tuesday. Here is the path.",
    helps: [
      { href: "/church-history", label: "Read: the church’s long story as a place to stand", kind: "read" },
      { href: "/plans/whole-life", label: "Do: an eight-week plan toward one undivided life", kind: "do" },
      { href: "/life/assessment", label: "Assess: the Whole-Life Assessment, with a rule of life", kind: "assess" },
      { href: "/pathways", label: "Do: the discipleship pathway, new believer to mature", kind: "do" },
      { href: "/life", label: "Read: the Integrated Life hub", kind: "read" },
      { href: "/start", label: "Assess: find your starting path", kind: "assess" },
    ],
  },
];

const KIND_META: Record<Help["kind"], { label: string; Icon: typeof BookOpen }> = {
  read: { label: "Read", Icon: BookOpen },
  assess: { label: "Assess", Icon: ClipboardCheck },
  do: { label: "Do", Icon: Hand },
  pray: { label: "Pray", Icon: Heart },
};

export default function Help() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Layout>
      <SEOMeta
        title="Find Help for What You Are Facing"
        description="Anxious, grieving, doubting, a marriage in trouble, running on empty? Start here. Honest writing, real assessments, and practices for whatever you are carrying."
        url="https://www.livewellbyjamesbell.co/help"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>Start here</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5.4vw, 56px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "18px", maxWidth: "18ch" }}>
            What are you facing?
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "60ch" }}>
            You did not come here for a category. You came carrying something. Choose what is closest, and you will find the writing, the honest tools, and the prayer for exactly that. No dead ends.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))", gap: "var(--s-3)" }}>
            {NEEDS.map((n) => {
              const isOpen = open === n.id;
              return (
                <div key={n.id} style={{ background: "var(--card)", border: "1px solid rgba(20,17,12,0.08)", borderTop: `2px solid var(--mustard)`, padding: "var(--s-3)" }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : n.id)}
                    aria-expanded={isOpen}
                    style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    <div style={{ fontFamily: "var(--F)", fontSize: "22px", lineHeight: 1.2, color: "var(--ink)", marginBottom: "8px" }}>{n.title}</div>
                    <p style={{ fontFamily: "var(--B)", fontSize: "14.5px", lineHeight: 1.6, color: "var(--ink-muted)", margin: 0 }}>{n.opener}</p>
                    <div style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--mustard-text)", marginTop: "12px" }}>
                      {isOpen ? "Close" : "Show me where to start"}
                    </div>
                  </button>
                  {isOpen && (
                    <div style={{ marginTop: "var(--s-3)", borderTop: "1px solid rgba(20,17,12,0.08)", paddingTop: "var(--s-3)", display: "grid", gap: "10px" }}>
                      {n.helps.filter((h) => SKEPTIC_TRACK_LIVE || h.href !== "/skeptic-track").map((h) => {
                        const meta = KIND_META[h.kind];
                        const Icon = meta.Icon;
                        return (
                          <Link key={h.href + h.label} href={h.href} style={{ display: "flex", gap: "10px", alignItems: "flex-start", textDecoration: "none", padding: "8px", borderRadius: "2px" }}>
                            <span style={{ flexShrink: 0, marginTop: "2px", color: "var(--mustard-text)" }}><Icon size={16} /></span>
                            <span>
                              <span style={{ fontFamily: "var(--U)", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)", display: "block", marginBottom: "2px" }}>{meta.label}</span>
                              <span style={{ fontFamily: "var(--B)", fontSize: "14.5px", lineHeight: 1.5, color: "var(--ink)" }}>{h.label.replace(/^(Read|Assess|Do|Pray): /, "")}</span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", marginTop: "var(--s-4)" }}>
            If you are in crisis or thinking about ending your life, please reach out now. In the US, call or text 988 for the Suicide and Crisis Lifeline, and tell someone who loves you. This site supports the work of doctors, counselors, and pastors. It does not replace them.
          </p>
        </div>
      </section>
    </Layout>
  );
}
