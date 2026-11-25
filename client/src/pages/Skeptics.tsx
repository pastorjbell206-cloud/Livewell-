/**
 * /skeptics: one short page for the person who does not believe, made only
 * of what the site already has. Test the Case (data/argumentCases.ts), the
 * first questions (the "Is it true?" group of the Honest Answers,
 * data/questionGroups.ts), the case for the faith (/questions, the library
 * where each objection is taken at full strength, under the catalogue's own
 * name and line), the eight-week plan for the curious skeptic
 * (/plans/skeptic), and the essays on the question that are on the public
 * shelf (lib/shelf isPublicEssay): the stops of the skeptic's track and the
 * essays behind the answers listed here. A section with nothing public is
 * left out. The page's few sentences press for no decision.
 */
import { Link } from "wouter";
import { ArrowRight, BookOpen, CalendarDays, Compass, Library, MessageCircleQuestion, Scale } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import SectionHead from "@/components/art/SectionHead";
import IconTile from "@/components/art/IconTile";
import { ANSWERS } from "@/data/answers";
import { ARGUMENT_CASES } from "@/data/argumentCases";
import { QUESTION_GROUPS } from "@/data/questionGroups";
import { answerHref } from "@/lib/askQuestion";
import { isPublicEssay, overrideMeta, shelfEntry } from "@/lib/shelf";
import { entryById } from "@/lib/siteCatalog";
import { SKEPTIC_STOPS } from "@/lib/skepticTrack";
import "./home/home.css";

/** The case for the faith, under the name and line every menu gives it. */
const CASE = entryById("questions.case");

/** The groups whose questions a skeptic asks first. */
const FIRST_GROUPS = ["true"];

const answersOf = (ids: string[]) =>
  QUESTION_GROUPS.filter((g) => ids.includes(g.id))
    .flatMap((g) => g.answers)
    .map((slug) => ANSWERS.find((a) => a.slug === slug))
    .filter((a): a is (typeof ANSWERS)[number] => !!a);

const FIRST = answersOf(FIRST_GROUPS);
/** The answers whose essays a skeptic may want next: is it true, suffering, other beliefs. */
const ESSAY_SOURCES = answersOf(["true", "evil", "others"]);

/** Public essays on these questions, each once: the track's stops, then the essays behind the answers. */
function publicEssays(): { slug: string; title: string }[] {
  const slugs = [...SKEPTIC_STOPS.map((s) => s.slug).filter((s): s is string => !!s), ...ESSAY_SOURCES.map((a) => a.essaySlug)];
  const seen = new Set<string>();
  return slugs
    .filter((s) => !seen.has(s) && seen.add(s) && isPublicEssay(s))
    .map((slug) => ({ slug, title: overrideMeta(slug)?.title || shelfEntry(slug)?.title || ESSAY_SOURCES.find((a) => a.essaySlug === slug)?.essayTitle || slug }));
}

export default function Skeptics() {
  const essays = publicEssays();
  return (
    <Layout>
      <SEOMeta
        title="For Skeptics: Questions You Can Test"
        description="The case for Christianity one step at a time, short answers to the first questions a skeptic asks, and an eight-week reading plan. Read at your own pace."
        url="https://www.livewellbyjamesbell.co/skeptics"
      />

      <PageHead
        door="Questions"
        doorHref="/topics"
        title="For skeptics"
        line="Weigh the case at your own pace. Push back anywhere."
        plate="lens"
        width="var(--w-default)"
        action={
          <Link href="/tools/test-the-case" className="btn">
            Open Test the Case
          </Link>
        }
      />

      <section className="home-sec home-sec--dark" aria-labelledby="sk-case-title">
        <div className="home-wrap">
          <SectionHead dark icon={Scale} label="Test the Case" title="Argue it one step at a time." id="sk-case-title" />
          <ul className="sk-cases">
            {ARGUMENT_CASES.map((c) => (
              <li key={c.slug}>
                <Link href={`/tools/test-the-case?case=${c.slug}`}>
                  <Scale aria-hidden="true" size={20} strokeWidth={1.75} />
                  <span>{c.title}</span>
                  <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-sec" aria-labelledby="sk-first-title">
        <div className="home-wrap">
          <SectionHead icon={MessageCircleQuestion} label="The first questions" title="Short answers, a page each." id="sk-first-title" link={{ href: "/answers", label: "All of them" }} />
          <ul className="qa-found">
            {FIRST.map((a) => (
              <li key={a.slug}>
                <Link href={answerHref(a.slug)}>
                  <span>{a.question}</span>
                  <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-sec home-sec--warm" aria-labelledby="sk-more-title">
        <div className="home-wrap">
          <SectionHead icon={Compass} label="Further in" title="Take longer." id="sk-more-title" />
          <ul className="lw-tiles">
            {CASE && (
              <li>
                <IconTile href={CASE.href} icon={Library} name={CASE.name} line={CASE.line} />
              </li>
            )}
            <li>
              <IconTile href="/plans/skeptic" icon={CalendarDays} name="Eight Weeks for the Curious Skeptic" line="A reading plan, one week at a time" />
            </li>
            {essays.map((e) => (
              <li key={e.slug}>
                <IconTile href={`/writing/${e.slug}`} icon={BookOpen} name={e.title} line="Essay" />
              </li>
            ))}
            <li>
              <IconTile href="/topics" icon={MessageCircleQuestion} name="Hard questions" line="Ask one in your own words" />
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}
