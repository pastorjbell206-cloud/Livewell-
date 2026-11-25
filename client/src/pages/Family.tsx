/**
 * /family: the Family door, built the way /study is (components/art/README.md,
 * "How a door's page is built").
 *
 * 1. The page top: PageHead at the door size, with the house plate. Its
 *    one action is tonight's card, straight under it.
 * 2. The one thing to do first: tonight's devotion (TonightCard, with "Done
 *    this week" once this device has it marked), beside the table plate, with
 *    the weekly reminder under it. "A different night?" opens the three-tap
 *    chooser (TonightChooser) in place; a link to /family#choose opens it.
 * 3. The week at a glance (WeekGlance): the week's devotion, the family's
 *    catechism question, today's reading, the season's daily sets. The Advent
 *    card follows it in its window.
 * 4. The rooms as picture cards: All family devotions, The family catechism,
 *    Family reading plans.
 * 5. The "How to" shelf (four groups, every link kept) and the teen years as
 *    tiles; then the rest of the home (a table that looks different,
 *    parenting, marriage, the tools) as four closed rows, every link kept.
 *    The path to help stays open at the foot.
 *
 * The page was fifteen phone screens long. The two pull-quote bands and the
 * long card descriptions are gone; no link and no path to help was removed.
 * Tonight comes from the static year map and the reader's own calendar
 * (lib/familyTable); titles and the week's question from the family index.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  Baby,
  BookHeart,
  CalendarRange,
  ChevronDown,
  Compass,
  HeartHandshake,
  Home as HomeIcon,
  LifeBuoy,
  Lightbulb,
  MessagesSquare,
  Sprout,
  UsersRound,
  Map as MapIcon,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SKEPTIC_TRACK_LIVE } from "@/lib/skepticTrack";
import AdventAtTheTable from "@/components/AdventAtTheTable";
import { RemindMe } from "@/components/RemindMe";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import SectionHead from "@/components/art/SectionHead";
import DoorCard from "@/components/art/DoorCard";
import IconTile from "@/components/art/IconTile";
import PlateFrame from "@/components/art/PlateFrame";
import Plate, { type PlateName } from "@/components/art/Plate";
import { followHash } from "@/lib/followHash";
import { isPublicEssayHref } from "@/lib/shelf";
import { entryById } from "@/lib/siteCatalog";
import { toolName } from "@/lib/toolsList";
import TonightCard from "./family/TonightCard";
import TonightChooser from "./family/TonightChooser";
import TableLooksDifferent from "./family/TableLooksDifferent";
import WeekGlance from "./family/WeekGlance";
import { useFamilyIndex } from "./family/useFamilyData";
import "./home/home.css";

/** Bible Explorer's films, by the name every menu gives them (lib/siteCatalog). */
const WATCH = entryById("bible.explorer-watch") ?? { name: "Watch and learn", href: "/study/explorer#watch" };

/** The rooms of the Family door, after Tonight, in the map's order. */
const ROOMS: { title: string; note: string; href: string; plate: PlateName }[] = [
  { title: "All family devotions", note: "A year of weekly devotions, and the seasons", href: "/family/devotions", plate: "book" },
  { title: "The family catechism", note: "One question and answer at a time", href: "/family/catechism", plate: "quill" },
  { title: "Family reading plans", note: "A passage a day, together", href: "/family/reading-plans", plate: "sundial" },
];

/**
 * The "How to" shelf (audit 2026-11, F8): the first questions a parent asks,
 * each answered by pieces that already exist. Titles are the pieces' own.
 */
const HOW_TO: { title: string; icon: LucideIcon; links: { href: string; label: string }[] }[] = [
  {
    title: "If you've never done this",
    icon: Sprout,
    links: [
      { href: "/how-tos/parenting-how-to-start-family-worship", label: "How to Start Family Worship in Five Minutes" },
      { href: "/how-tos/fam-how-to-start-family-worship", label: "How to Start Family Worship (and Keep It When It Falls Apart)" },
      { href: "/how-tos/fam-how-to-pray-with-your-kids-at-bedtime", label: "How to Pray With Your Kids at Bedtime" },
      { href: "/how-tos/fam-how-to-use-a-family-catechism", label: "How to Use a Family Catechism" },
    ],
  },
  {
    title: "If a child won't sit still",
    icon: Baby,
    links: [
      { href: "/how-tos/fam-how-to-read-the-bible-with-young-children", label: "How to Read the Bible With Young Children" },
      { href: "/help/family-devotions", label: "How do we do family devotions? For little ones, school-age kids, and teens" },
    ],
  },
  {
    title: "If you have a teenager",
    icon: MessagesSquare,
    links: [
      { href: "/how-tos/fam-how-to-disciple-teenagers-at-home", label: "How to Disciple Teenagers at Home" },
      { href: "/how-tos/parenting-how-to-stay-close-to-a-pulling-away-teenager", label: "How to Stay Close to a Teenager Who Is Pulling Away" },
      { href: "/how-tos/parenting-how-to-answer-hard-questions-about-god", label: "How to Answer Your Child's Hard Questions About God" },
    ],
  },
  {
    title: "If your spouse doesn't believe",
    icon: HeartHandshake,
    links: [
      { href: "/help/family-devotions", label: "My spouse isn't a Christian. Can I still do devotions with our kids?" },
      { href: "/study/bible/1-corinthians/7", label: "1 Corinthians 7 in the Study Bible, with notes" },
    ],
  },
];

/** The teen years: the pieces written for them (audit 2026-11, F7). */
const TEENS = [
  { href: "/family/devotions", name: "Older questions on every devotion", line: "Choose Older at the Ask step", icon: MessagesSquare },
  { href: "/tools/parent-teen-conversation", name: toolName("parent-teen"), line: "Answer apart, then talk", icon: UsersRound },
  { href: "/how-tos/fam-how-to-disciple-teenagers-at-home", name: "How to disciple teenagers at home", line: "A guide for parents", icon: Compass },
  { href: "/how-tos/parenting-how-to-stay-close-to-a-pulling-away-teenager", name: "Stay close to a teen pulling away", line: "A guide for parents", icon: HeartHandshake },
  { href: "/tools/family-devotions", name: toolName("family-devotions"), line: "Pick Teens (12-18) and a theme", icon: BookHeart },
  ...(SKEPTIC_TRACK_LIVE ? [{ href: "/skeptic-track", name: "Start here if you're a skeptic", line: "Seven essays, in order", icon: Lightbulb }] : []),
  { href: "/answers", name: "On doubt and hard questions", line: "Read them together", icon: Lightbulb },
];

/** The rest of the home, each a closed row of links. */
const MORE: { title: string; icon: LucideIcon; links: { href: string; label: string }[] }[] = [
  {
    title: "Parenting",
    icon: Baby,
    links: [
      { href: "/wisdom/parenting-struggles", label: "What the Bible says about parenting" },
      { href: "/help/parenting", label: "When parenting is hard" },
      { href: "/tools/parenting-guide", label: toolName("parenting-guide") },
      { href: "/writing/what-fatherhood-requires", label: "What fatherhood requires" },
      { href: "/life/raising-children-in-grace", label: "Raising children in grace" },
      { href: "/life/the-home-and-the-family", label: "The home and the family" },
    ].filter((l) => isPublicEssayHref(l.href)),
  },
  {
    title: "Marriage",
    icon: HeartHandshake,
    links: [
      { href: "/help/marriage", label: "When a marriage is in trouble" },
      { href: "/tools/marriage-assessment", label: toolName("marriage") },
      { href: "/writing/covenant-vs-contract-what-marriage-is", label: "Covenant vs. contract" },
      { href: "/life/marriage-the-long-covenant", label: "Marriage: the long covenant" },
    ].filter((l) => isPublicEssayHref(l.href)),
  },
  {
    title: "Tools for the home",
    icon: Wrench,
    links: [
      { href: "/tools/wisdom-finder", label: toolName("wisdom-finder") },
      { href: "/tools/family-devotions", label: toolName("family-devotions") },
      { href: "/tools/prayer-generator", label: toolName("prayer-generator") },
      { href: "/tools/rule-of-life", label: toolName("rule-of-life") },
      { href: "/tools", label: "Every tool" },
    ],
  },
];

/** "A different night?": the three-tap chooser, opened in place, or by a link to #choose. */
function DifferentNight({ index }: { index: Parameters<typeof TonightChooser>[0]["index"] }) {
  const [open, setOpen] = useState(() => typeof window !== "undefined" && window.location.hash === "#choose");
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === "#choose") setOpen(true);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return (
    <div className="fm-other">
      <button type="button" className="fm-other__btn" aria-expanded={open} aria-controls="fm-choose" onClick={() => setOpen((o) => !o)}>
        <Compass aria-hidden="true" size={20} strokeWidth={1.75} />
        A different night? Choose in three taps
        <ChevronDown aria-hidden="true" size={18} strokeWidth={1.75} className="fm-chev" />
      </button>
      <div id="fm-choose" hidden={!open}>
        {open && <TonightChooser index={index} />}
      </div>
    </div>
  );
}

export default function Family() {
  const { state, retry } = useFamilyIndex();
  const index = state.status === "ready" ? state.value : null;

  return (
    <Layout>
      <SEOMeta
        title="Family Devotions and Discipling Your Kids"
        description="For a family growing in faith together: devotions to do with your kids, a catechism, reading plans, help for teenagers' questions, and marriage."
        url="https://www.livewellbyjamesbell.co/family"
      />

      <PageHead
        size="door"
        door="Family"
        title="Faith at the family table"
        line="A devotion for tonight, a question to learn, a passage to read together."
        plate="house"
      />

      {/* FIRST: tonight's devotion, beside the table plate. */}
      <section className="home-sec home-sec--warm fm-tonight" aria-label="Tonight">
        <div className="home-wrap fm-two">
          <div>
            <TonightCard index={state} retry={retry} />
            {/* A weekly reminder in the family's own calendar, back to tonight's devotion (U21). */}
            <RemindMe
              title="Family devotion"
              details="Tonight's family devotion: a passage, a question to talk about, and a prayer, in about ten minutes."
              href="/family/tonight"
              freq="WEEKLY"
              count={52}
              schedule="once a week for a year"
            />
            <DifferentNight index={index} />
          </div>
          <PlateFrame className="fm-two__art" ratio={null}>
            <Plate name="table" decorative />
          </PlateFrame>
        </div>
      </section>

      {/* THE WEEK AT A GLANCE */}
      {state.status !== "failed" && (
        <section className="home-sec fm-week" aria-labelledby="fm-week-title">
          <div className="home-wrap">
            <SectionHead icon={CalendarRange} label="This week" title="The week at a glance." id="fm-week-title" />
            <WeekGlance index={index} />
          </div>
        </section>
      )}

      {/* ADVENT: from the Sunday before Advent Sunday to Christmas only. */}
      <AdventAtTheTable variant="card" />

      {/* THE ROOMS */}
      <section className="home-sec home-sec--warm" aria-labelledby="fm-rooms-title">
        <div className="home-wrap">
          <SectionHead icon={HomeIcon} label="The rooms" title="Everything for the table." id="fm-rooms-title" />
          <ul className="lw-rooms">
            {ROOMS.map((r) => (
              <li key={r.href}>
                <DoorCard {...r} />
              </li>
            ))}
          </ul>
          <p className="lw-newline">
            <MapIcon aria-hidden="true" size={22} strokeWidth={1.75} />
            <span>
              For ages 7 to 16: <Link href="/study/explorer">Bible Explorer</Link>, the whole Bible as one story on one illustrated map, and{" "}
              {/* Its films sit six phone screens down the map's page, so the line goes straight to them (walk 2026-11, finding 21). */}
              <Link href={WATCH.href} onClick={() => followHash(WATCH.href)}>
                {WATCH.name}
              </Link>
              , its short films to watch together.
            </span>
          </p>
        </div>
      </section>

      {/* HOW TO: the first questions a parent asks, every link kept. */}
      <section className="home-sec" aria-labelledby="fm-howto-title">
        <div className="home-wrap">
          <SectionHead icon={Lightbulb} label="How to" title="Help for the hard parts." id="fm-howto-title" />
          <ul className="fm-howto">
            {HOW_TO.map(({ title, icon: Icon, links }) => (
              <li key={title}>
                <h3 className="fm-howto__title">
                  <span className="lw-tile__icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  {title}
                </h3>
                <ul className="fm-links">
                  {links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="lw-newline">
            <Sprout aria-hidden="true" size={22} strokeWidth={1.75} />
            <span>
              Why it matters: <Link href="/topics/raising-children-in-a-secular-age">How do we hand the faith to our kids in a secular age?</Link>
            </span>
          </p>
        </div>
      </section>

      {/* THE TEEN YEARS */}
      <section className="home-sec home-sec--warm" aria-labelledby="fm-teens-title">
        <div className="home-wrap">
          <SectionHead icon={MessagesSquare} label="For teenagers" title="The teen years." id="fm-teens-title" />
          <ul className="lw-tiles">
            {TEENS.map((t) => (
              <li key={t.name}>
                <IconTile {...t} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* THE REST OF THE HOME, closed until opened; every link kept. Then help. */}
      <section className="home-sec" aria-labelledby="fm-more-title">
        <div className="home-wrap">
          <SectionHead icon={HomeIcon} label="More for the home" title="For every kind of home." id="fm-more-title" />
          <div className="fm-more">
            <details className="fm-fold">
              <summary>
                <span className="lw-tile__icon" aria-hidden="true">
                  <UsersRound size={22} strokeWidth={1.75} />
                </span>
                If your table looks different
                <ChevronDown aria-hidden="true" size={18} strokeWidth={1.75} className="fm-chev" />
              </summary>
              <div className="fm-fold__body">
                <TableLooksDifferent />
              </div>
            </details>
            {MORE.map(({ title, icon: Icon, links }) => (
              <details key={title} className="fm-fold">
                <summary>
                  <span className="lw-tile__icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  {title}
                  <ChevronDown aria-hidden="true" size={18} strokeWidth={1.75} className="fm-chev" />
                </summary>
                <ul className="fm-links fm-fold__body">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
          <p className="lw-newline fm-help">
            <LifeBuoy aria-hidden="true" size={22} strokeWidth={1.75} />
            <span>
              A hard season at home? <Link href="/help">Find help for what you are facing</Link>. If you are afraid of someone at home,{" "}
              <Link href="/help#help-now">the help lines are here</Link>.
            </span>
          </p>
        </div>
      </section>
    </Layout>
  );
}
