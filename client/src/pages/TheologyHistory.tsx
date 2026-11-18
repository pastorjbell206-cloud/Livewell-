/**
 * /theology/history: the History door (components/art/README.md, "How a
 * door's page is built"; pages/Study.tsx is the model).
 *
 * 1. The page top: PageHead at the door size, with the basilica plate, and
 *    the way into the course: "Start at lesson 1", or "Pick up at lesson N"
 *    when this device remembers the last lesson opened.
 * 2. The one thing to touch first: the seven ages on one line, drawn to
 *    scale (components/history/EraLine). Choosing an age shows its lessons,
 *    who was alive, what was decided, and what happened. The year-by-year
 *    stepper (components/history/HistoryTimeline) opens under it.
 * 3. The rooms, as picture cards: the course, people, creeds and
 *    confessions, Christian traditions.
 * 4. The course: fourteen lessons in order, each with its age's roundel,
 *    and the eight longer essays as "Go deeper".
 * 5. Look it up: the councils and the heresies, every entry with its own
 *    anchor (lib/historyCourse entryId), opened in place.
 *
 * Old links keep working: #course, #timeline, #councils, #heresies, and
 * #council-…, #heresy-… land here; #people and #person-… open the people's
 * own page (/theology/history/people), where the people now live.
 * Content: /theology/church-history-timeline.json, -councils.json,
 * -heresies.json, -figures.json and /history/essays-index.json.
 */
import { lazy, Suspense, useEffect, useMemo, useState, type MouseEvent, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { BookMarked, ChevronDown, Clock, Compass, Library, Search } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import SectionHead from "@/components/art/SectionHead";
import DoorCard from "@/components/art/DoorCard";
import Roundel from "@/components/art/Roundel";
import type { PlateName } from "@/components/art/Plate";
import EraLine from "@/components/history/EraLine";
import { readStoredJSON } from "@/lib/storage";
import { fetchJson } from "@/lib/fetch-json";
import { LoadFailed } from "@/components/LoadFailed";
import { ageOfEssay } from "@/lib/historyAges";
import {
  COURSE_PLACE_KEY, buildNameIndex, courseEssays, deeperEssays, entryId, isCoursePlace, kindOfAnchor, splitNames,
  type Council, type EntryKind, type Era, type Figure, type Heresy, type HistoryEssayEntry,
} from "@/lib/historyCourse";
import "./home/home.css";

const HistoryTimeline = lazy(() => import("@/components/history/HistoryTimeline"));

type Ref = "councils" | "heresies";
const PEOPLE = "/theology/history/people";

/**
 * The places a link may name by its hash (the site catalogue's rooms use
 * them): two sections of this page, the two lists opened in place, and the
 * people, who have their own page now.
 */
const HASHES: Record<string, "section" | "ref" | "people"> = {
  course: "section",
  timeline: "section",
  councils: "ref",
  heresies: "ref",
  people: "people",
};

/** What the address asks for. */
function fromHash(): { section?: "course" | "timeline"; ref?: Ref; target?: string; people?: string } | null {
  if (typeof window === "undefined") return null;
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!id) return null;
  const kind = kindOfAnchor(id);
  if (kind === "person") return { people: id };
  if (kind === "council") return { ref: "councils", target: id };
  if (kind === "heresy") return { ref: "heresies", target: id };
  const place = HASHES[id];
  if (place === "people") return { people: "" };
  if (place === "ref") return { ref: id as Ref, target: id };
  if (place === "section") return { section: id as "course" | "timeline" };
  return null;
}

const cardStyle = { background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" } as const;
const refBlock = { ...cardStyle, padding: "clamp(var(--s-3), 3vw, var(--s-4))" } as const;
const refName = { fontFamily: "var(--F)", fontSize: "clamp(22px, 2.4vw, 26px)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)", margin: 0 } as const;
const refText = { fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)" } as const;
const refNote = { fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink-muted)" } as const;

export default function TheologyHistory() {
  const [, navigate] = useLocation();
  const [eras, setEras] = useState<Era[]>([]);
  const [councils, setCouncils] = useState<Council[]>([]);
  const [heresies, setHeresies] = useState<Heresy[]>([]);
  const [figures, setFigures] = useState<Figure[]>([]);
  const [essays, setEssays] = useState<HistoryEssayEntry[]>([]);
  const [ref, setRef] = useState<Ref | null>(() => fromHash()?.ref ?? null);
  const [target, setTarget] = useState<string | null>(() => fromHash()?.target ?? fromHash()?.section ?? null);
  const [years, setYears] = useState(() => fromHash()?.section === "timeline");
  // Where the reader stopped in the course, kept on this device by the lesson page.
  const [lastSlug] = useState<string | null>(() => readStoredJSON(COURSE_PLACE_KEY, isCoursePlace, null as { slug: string } | null)?.slug ?? null);

  // The people have their own page now; an old link to them goes there.
  useEffect(() => {
    const go = () => {
      const want = fromHash();
      if (!want) return;
      if (want.people !== undefined) {
        navigate(want.people ? `${PEOPLE}#${want.people}` : PEOPLE, { replace: true });
        return;
      }
      if (want.ref) setRef(want.ref);
      if (want.section === "timeline") setYears(true);
      setTarget(want.target ?? want.section ?? null);
    };
    go();
    window.addEventListener("hashchange", go);
    return () => window.removeEventListener("hashchange", go);
  }, [navigate]);

  /** Open a council's or heresy's entry in place, and leave its address in the bar. */
  const openEntry = (kind: EntryKind, name: string) => {
    const id = entryId(kind, name);
    if (kind === "person") return navigate(`${PEOPLE}#${id}`);
    setRef(kind === "council" ? "councils" : "heresies");
    setTarget(id);
    window.history.replaceState(null, "", `#${id}`);
  };
  const toggleRef = (r: Ref) => {
    const next = ref === r ? null : r;
    setRef(next);
    setTarget(null);
    window.history.replaceState(null, "", next ? `#${next}` : window.location.pathname);
  };

  useEffect(() => {
    if (!target) return;
    const el = document.getElementById(target);
    if (!el) return;
    // Jump, do not glide: a glide started while the page is still laying out stops short.
    const frame = requestAnimationFrame(() => {
      el.scrollIntoView({ block: "start", behavior: "instant" });
      if (kindOfAnchor(target)) el.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [target, ref, councils.length, heresies.length, eras.length, essays.length]);

  // A file that does not arrive is said out loud, with a way to try again.
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  useEffect(() => {
    let live = true;
    const get = (f: string) => fetchJson<Record<string, unknown> | null>(f).catch(() => null);
    Promise.all([
      get("/theology/church-history-timeline.json").then((d) => { if (live && Array.isArray(d?.eras)) setEras(d.eras as Era[]); return Array.isArray(d?.eras); }),
      get("/theology/church-history-councils.json").then((d) => { if (live && Array.isArray(d?.councils)) setCouncils(d.councils as Council[]); return Array.isArray(d?.councils); }),
      get("/theology/church-history-heresies.json").then((d) => { if (live && Array.isArray(d?.heresies)) setHeresies(d.heresies as Heresy[]); return Array.isArray(d?.heresies); }),
      get("/theology/church-history-figures.json").then((d) => { if (live && Array.isArray(d?.figures)) setFigures(d.figures as Figure[]); return Array.isArray(d?.figures); }),
      get("/history/essays-index.json").then((d) => { if (live && Array.isArray(d?.essays)) setEssays(d.essays as HistoryEssayEntry[]); return Array.isArray(d?.essays); }),
    ]).then((arrived) => { if (live && arrived.includes(false)) setFailed(true); });
    return () => { live = false; };
  }, [nonce]);

  const course = useMemo(() => courseEssays(essays), [essays]);
  const deeper = useMemo(() => deeperEssays(essays), [essays]);
  const lastRead = lastSlug ? course.find((e) => e.slug === lastSlug) : undefined;
  const startAt = lastRead ?? course[0];
  const startLabel = lastRead ? `Pick up at lesson ${lastRead.course}` : "Start at lesson 1";
  const names = useMemo(() => buildNameIndex(figures, councils), [figures, councils]);
  /** A line of an entry with the people and councils it names linked to their own entries. */
  const withNames = (text: string, self: string): ReactNode =>
    splitNames(text, names, new Set([self])).map((piece, i) => {
      if (typeof piece === "string") return piece;
      const id = piece.href.slice(piece.href.indexOf("#") + 1);
      const kind = kindOfAnchor(id);
      const follow = (ev: MouseEvent) => { if (kind) { ev.preventDefault(); openEntry(kind, piece.name); } };
      return <a key={i} href={piece.href} className="hx-link" onClick={follow}>{piece.text}</a>;
    });
  const entryClass = (id: string) => `hx-entry${target === id ? " is-target" : ""}`;
  const retry = () => { setFailed(false); setNonce((n) => n + 1); };

  const rooms: { title: string; note: string; href: string; plate: PlateName }[] = [
    { title: "The course", note: startAt ? `${course.length} lessons. ${startLabel}` : "Lessons in order", href: startAt ? `/theology/history/${startAt.slug}` : "#course", plate: "arch" },
    { title: "People", note: figures.length ? `${figures.length} lives, A to Z` : "A to Z, and by age", href: PEOPLE, plate: "quill" },
    { title: "Creeds and confessions", note: "What the church confessed", href: "/resources/creeds", plate: "books" },
    { title: "Christian traditions", note: "Catholic to Pentecostal", href: "/theology/traditions", plate: "jars" },
  ];

  return (
    <Layout>
      <SEOMeta
        title="Church History, From the Apostles to Today"
        description="The church across two thousand years: the timeline by era, the councils, the heresies it rejected, and the people who carried the faith."
        url="https://www.livewellbyjamesbell.co/theology/history"
      />
      {/* On a first load the prerendered page stays on screen until the ages
          and the course have arrived (lib/prerender-hold.ts). */}
      {!failed && (eras.length === 0 || essays.length === 0) && <span hidden data-lw-loading />}

      <PageHead
        size="door"
        door="History"
        title="Church history"
        line="Two thousand years, from the apostles to today."
        plate="basilica"
        action={
          startAt ? (
            <Link href={`/theology/history/${startAt.slug}`} className="btn">
              {startLabel}
            </Link>
          ) : undefined
        }
      />

      {/* FIRST: the ages on one line. */}
      <section id="timeline" className="home-sec home-sec--dark hx-door-sec" aria-labelledby="hx-line-title">
        <div className="home-wrap">
          <SectionHead dark icon={Clock} label="The timeline" title="Two thousand years on one line." id="hx-line-title" />
          {failed ? (
            <LoadFailed what="The church history timeline" onRetry={retry} backHref="/study" backLabel="Back to Study" />
          ) : (
            <div className="hl-box">
              <EraLine eras={eras} councils={councils} heresies={heresies} figures={figures} course={course} onEntry={openEntry} />
            </div>
          )}
          {eras.length > 0 && (
            <div className="hl-years">
              <button type="button" className="hl-years__toggle" aria-expanded={years} aria-controls="hl-years" onClick={() => setYears((x) => !x)}>
                Step through year by year
                <ChevronDown aria-hidden="true" size={18} strokeWidth={1.75} />
              </button>
              {years && (
                <div id="hl-years" className="hl-years__panel">
                  <Suspense fallback={null}>
                    <HistoryTimeline eras={eras} councils={councils} figures={figures} essays={essays} onOpen={openEntry} />
                  </Suspense>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* THE ROOMS */}
      <section className="home-sec" aria-labelledby="hx-rooms-title">
        <div className="home-wrap">
          <SectionHead icon={Compass} label="Ways in" title="Where to go." id="hx-rooms-title" />
          <ul className="lw-rooms hx-rooms">
            {rooms.map((r) => (
              <li key={r.title}>
                <DoorCard {...r} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* THE COURSE, and the longer essays */}
      <section id="course" className="home-sec home-sec--warm" aria-labelledby="hx-course-title">
        <div className="home-wrap">
          <SectionHead icon={BookMarked} label="The course" title={course.length ? `${course.length} lessons, in order.` : "The lessons, in order."} id="hx-course-title" />
          {lastRead && (
            <p className="hx-continue">
              You were last reading lesson {lastRead.course}.
              <Link href={`/theology/history/${lastRead.slug}`}>Go back to {lastRead.title}</Link>
            </p>
          )}
          <ol className="hx-lessons">
            {course.map((e) => {
              const age = ageOfEssay(eras, e);
              return (
                <li key={e.slug}>
                  <Link href={`/theology/history/${e.slug}`}>
                    <span className="hx-lessons__mark" aria-hidden="true">{age && <Roundel era={age.id} />}</span>
                    <small>Lesson {e.course}</small>
                    <span className="hx-lessons__t">{e.title}</span>
                    <small className="hx-lessons__d">{e.dateRange.replace(/(\d)-(\d)/g, "$1–$2")}</small>
                  </Link>
                </li>
              );
            })}
          </ol>
          {deeper.length > 0 && (
            <>
              <h3 className="hx-deeper-h">Go deeper</h3>
              <ul className="hx-lessons hx-lessons--deeper">
                {deeper.map((e) => {
                  const age = ageOfEssay(eras, e);
                  return (
                    <li key={e.slug}>
                      <Link href={`/theology/history/${e.slug}`}>
                        <span className="hx-lessons__mark" aria-hidden="true">{age && <Roundel era={age.id} />}</span>
                        <small>Longer essay</small>
                        <span className="hx-lessons__t">{e.title}</span>
                        <small className="hx-lessons__d">{e.dateRange.replace(/(\d)-(\d)/g, "$1–$2")}</small>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </section>

      {/* LOOK IT UP: the councils and the heresies, in place */}
      <section className="home-sec" aria-labelledby="hx-ref-title">
        <div className="home-wrap">
          <SectionHead icon={Search} label="Look it up" title="Councils and heresies." id="hx-ref-title" />
          <div className="hx-refs">
            <button type="button" id="councils" className="hx-tab" aria-expanded={ref === "councils"} aria-controls="hx-councils" onClick={() => toggleRef("councils")}>
              The councils{councils.length ? ` · ${councils.length}` : ""}
            </button>
            <button type="button" id="heresies" className="hx-tab" aria-expanded={ref === "heresies"} aria-controls="hx-heresies" onClick={() => toggleRef("heresies")}>
              The heresies{heresies.length ? ` · ${heresies.length}` : ""}
            </button>
            <Link href={PEOPLE} className="hx-tab">
              The people{figures.length ? ` · ${figures.length}` : ""}
            </Link>
            <Link href="/theology/glossary" className="hx-tab">
              <Library aria-hidden="true" size={16} strokeWidth={1.75} /> Glossary
            </Link>
          </div>

          {ref === "councils" && (
            <div id="hx-councils" className="hx-ref-panel">
              <p className="hx-ref-lede">What each council faced, and what it gave us.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {councils.map((c, i) => (
                  <div key={i} id={entryId("council", c.name)} tabIndex={-1} className={entryClass(entryId("council", c.name))} style={{ ...cardStyle, padding: "var(--s-4)", borderLeft: `3px solid ${c.ecumenical ? "var(--mustard)" : "var(--border)"}` }}>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px", alignItems: "baseline", marginBottom: "10px" }}>
                      <h3 style={{ ...refName, fontSize: "22px" }}>{c.name}</h3>
                      <span style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--mustard-text)" }}>{c.year}{c.place ? ` · ${c.place}` : ""}</span>
                    </div>
                    <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink-muted)", marginBottom: "10px" }}><strong style={{ color: "var(--ink)" }}>The crisis.</strong> {c.calledOver}</p>
                    <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "10px" }}>{c.decided}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                      {c.gaveUs && <div style={{ flex: "1 1 220px" }}><div className="eyebrow" style={{ marginBottom: "4px" }}>What it gave us</div><p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{c.gaveUs}</p></div>}
                      {c.rejected && <div style={{ flex: "1 1 220px" }}><div className="eyebrow" style={{ marginBottom: "4px" }}>What it rejected</div><p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{c.rejected}</p></div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {ref === "heresies" && (
            <div id="hx-heresies" className="hx-ref-panel">
              <p className="hx-ref-lede">What the church could not accept, and why it mattered.</p>
              <div className="ed-split" style={{ gap: "var(--s-3)" }}>
                {heresies.map((h, i) => (
                  <div key={i} id={entryId("heresy", h.name)} tabIndex={-1} className={entryClass(entryId("heresy", h.name))} style={refBlock}>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: "4px 16px", marginBottom: "14px" }}>
                      <h3 style={refName}>{h.name}</h3>
                      <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)" }}>{h.era}</span>
                    </div>
                    <p style={{ ...refText, color: "var(--ink)", fontStyle: "italic", marginBottom: "12px" }}>{h.claim}</p>
                    <p style={{ ...refText, marginBottom: "12px" }}><strong style={{ color: "var(--ink)" }}>Why it appealed.</strong> {h.whyItAppealed}</p>
                    <p style={refText}><strong style={{ color: "var(--ink)" }}>What the church said.</strong> {h.theChurchSaid}</p>
                    <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--border)" }}>
                      {h.answeredBy && <p style={refNote}><strong style={{ color: "var(--ink)" }}>Answered by</strong> {withNames(h.answeredBy, h.name)}</p>}
                    </div>
                    {h.stillSeenAs && <p style={{ ...refNote, marginTop: "10px" }}><strong style={{ color: "var(--ink)" }}>Still seen as.</strong> {h.stillSeenAs}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
