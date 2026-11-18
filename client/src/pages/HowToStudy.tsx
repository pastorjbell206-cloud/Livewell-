/**
 * /study/how-to-study: "How to study the Bible". The page that teaches the
 * method the guided study walks (lib/study-method.ts is the one source for
 * the seven steps, here and in pages/study-bible/ChapterWalk.tsx), then opens
 * that walk on John 3, or on the chapter the reader last opened
 * (lib/bible-desk.ts, livewell-bible-last).
 *
 * The sentences say what to do and why; they make no claim about what any
 * passage means, and each is true of what the tool does.
 */
import { Link } from "wouter";
import { ArrowRight, BookOpen, CircleHelp, Compass, Eye, Footprints, Languages, Link2, Lock } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import SectionHead from "@/components/art/SectionHead";
import { readLastChapter } from "@/lib/bible-desk";
import { KEPT_HERE, STUDY_STEPS, walkHref, type StudyStep } from "@/lib/study-method";

const ICONS: Record<StudyStep["icon"], typeof BookOpen> = { BookOpen, Eye, Compass, Languages, Link2, CircleHelp, Footprints };

export default function HowToStudy() {
  const last = readLastChapter();
  const target = last ?? { slug: "john", chapter: 3, label: "John 3" };
  const href = walkHref(target.slug, target.chapter);

  return (
    <Layout>
      <SEOMeta
        title="How to Study the Bible, in Seven Steps"
        description="A simple way to study any chapter of the Bible in seven steps, with a free guided study that walks you through John 3 one screen at a time."
        url="https://www.livewellbyjamesbell.co/study/how-to-study"
      />

      <PageHead
        door="Bible"
        doorHref="/study"
        title="How to study the Bible"
        line="Seven steps that work on any chapter. Learn them here, then try them on a real one."
        plate="lens"
        action={
          <>
            <Link href={href} className="btn">
              Try it on {target.label}
            </Link>
            <Link href="/study/bible" className="btn btn--quiet">
              Open the Study Bible
            </Link>
          </>
        }
      />

      <section className="hts-sec" aria-labelledby="hts-steps">
        <div className="hts-in">
          <SectionHead icon={Footprints} label="The method" title="Seven steps, in order" id="hts-steps" />
          <ol className="hts-steps">
            {STUDY_STEPS.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <li key={s.id} className="hts-step">
                  <span className="hts-step__icon" aria-hidden>
                    <Icon size={28} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="hts-step__n">Step {i + 1}</p>
                    <h3 className="hts-step__t">{s.title}</h3>
                    <p className="hts-step__p">{s.what}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="hts-note">
            <Lock size={18} strokeWidth={1.75} aria-hidden />
            <span>{KEPT_HERE}</span>
          </p>
        </div>
      </section>

      <section className="hts-sec hts-try" aria-labelledby="hts-try">
        <div className="hts-try__in">
          <div>
            <h2 className="hts-try__t" id="hts-try">Try it on {target.label}</h2>
            <p className="hts-try__p">
              The guided study takes you through all seven steps on one chapter, one screen at a time. Every step shows only what the Study Bible holds: the Berean Standard Bible, the notes on the chapter and its book, and the Hebrew and Greek dictionary. It keeps your place, so you can stop and come back.
            </p>
          </div>
          <div className="hts-try__acts">
            <Link href={href} className="btn">
              Start the guided study <ArrowRight size={18} strokeWidth={1.75} aria-hidden />
            </Link>
            <Link href="/study/bible" className="btn btn--quiet">
              Choose another chapter
            </Link>
          </div>
        </div>
      </section>

      <section className="hts-sec hts-sec--warm" aria-labelledby="hts-any">
        <div className="hts-in">
          <SectionHead icon={BookOpen} label="On any chapter" title="Where to find it" id="hts-any" />
          <p className="hts-step__p" style={{ maxWidth: "62ch" }}>
            Open any chapter in the Study Bible and tap “Study this chapter” at the top. The same seven steps open on the chapter in front of you. To read without the notes, tap “Read” instead.
          </p>
        </div>
      </section>
    </Layout>
  );
}
