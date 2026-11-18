/**
 * A portrait of one world the Bible was written in, at
 * /resources/context/world/:id. The portrait is data
 * (client/public/context/worlds/<id>.json, gated by
 * scripts/validate-worlds.mjs and listed in context/worlds-index.json by
 * scripts/build-context-index.mjs), so a new world is a new file.
 *
 * The page: one plate at the top, a contents list of the parts, each part in
 * the reading type with the Gospel passages it opens (quoted from the Berean
 * Standard Bible, each linked to its chapter), the guides filed under the same
 * world, and the sources. On a long read a small bar at the foot of the screen
 * names the part you are in and goes back to the contents.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import {
  ArrowDown, ArrowRight, ArrowUp, BookOpen, Compass, Flame, Home, Landmark, Library, ListOrdered,
  Map as MapIcon, Scroll, Sparkles, Sun, Users, type LucideIcon,
} from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageEndNav from "@/components/PageEndNav";
import PageHead from "@/components/art/PageHead";
import SectionHead from "@/components/art/SectionHead";
import type { PlateName } from "@/components/art/Plate";
import "../home/home.css";
import "./libraries.css";
import "./world.css";

export interface WorldReading { ref: string; href: string; text: string; note: string }
export interface WorldPart { id: string; title: string; line: string; icon: string; body: string[]; read: WorldReading[] }
export interface WorldSource { name: string; note?: string }
/** A book, or with `in` an article or essay (its journal, or "an essay"). */
export interface WorldBook { author: string; title: string; year: number; in?: string }
export interface World {
  id: string; group: string; title: string; seoTitle: string; description: string; line: string; plate: PlateName;
  intro: string[]; parts: WorldPart[]; sources: { ancient: WorldSource[]; modern: WorldBook[] };
}
interface GuideEntry { slug: string; title: string; blurb: string; group: string }

/** The icons a part may name in its file (validate-worlds.mjs holds the same list). */
const ICONS: Record<string, LucideIcon> = {
  map: MapIcon, sun: Sun, landmark: Landmark, scroll: Scroll, users: Users, sparkles: Sparkles, home: Home, flame: Flame, compass: Compass, book: BookOpen,
};

export const isWorld = (x: unknown): x is World => {
  const w = x as World | null;
  return !!w && typeof w.id === "string" && typeof w.title === "string" && Array.isArray(w.parts) && Array.isArray(w.intro) && !!w.sources;
};

/** Words in the portrait (intro, parts and notes), for the reading time. */
export function worldWords(w: World): number {
  const all = [...w.intro, ...w.parts.flatMap((p) => [...p.body, ...p.read.map((r) => r.note)])].join(" ");
  return all.split(/\s+/).filter(Boolean).length;
}

export default function ContextWorld() {
  const [, params] = useRoute("/resources/context/world/:id");
  const id = params?.id;
  const [result, setResult] = useState<{ id: string; data: World | null } | null>(null);
  const [guides, setGuides] = useState<GuideEntry[]>([]);
  const [current, setCurrent] = useState<number>(-1);

  useEffect(() => {
    if (!id) return;
    let live = true;
    fetch(`/context/worlds/${id}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (live) setResult({ id, data: isWorld(d) ? d : null }); })
      .catch(() => { if (live) setResult({ id, data: null }); });
    return () => { live = false; };
  }, [id]);

  const data = result && result.id === id ? result.data : null;
  const missing = !!result && result.id === id && result.data === null;

  useEffect(() => {
    if (!data) return;
    let live = true;
    fetch("/context/guides-index.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { guides?: GuideEntry[] } | null) => {
        if (live && Array.isArray(d?.guides)) setGuides(d.guides.filter((g) => g.group === data.group));
      })
      .catch(() => {});
    return () => { live = false; };
  }, [data]);

  // Which part is on screen, for the bar at the foot of the screen.
  useEffect(() => {
    if (!data || typeof IntersectionObserver === "undefined") return;
    const ids = data.parts.map((p) => p.id);
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) seen.set(e.target.id, e.isIntersecting);
      const on = ids.findIndex((pid) => seen.get(pid));
      setCurrent(on);
    }, { rootMargin: "-45% 0px -50% 0px" });
    for (const pid of ids) { const el = document.getElementById(pid); if (el) io.observe(el); }
    return () => io.disconnect();
  }, [data]);

  const words = useMemo(() => (data ? worldWords(data) : 0), [data]);
  const minutes = Math.round(words / 230);
  const here = data && current >= 0 ? data.parts[current] : null;

  return (
    <Layout>
      {data && (
        <SEOMeta title={data.seoTitle} description={data.description} url={`https://www.livewellbyjamesbell.co/resources/context/world/${data.id}`} />
      )}
      {/* The prerendered portrait stays on screen until this one has arrived (lib/prerender-hold.ts). */}
      {!data && !missing && <span hidden data-lw-loading />}

      <PageHead
        className="wd-head"
        door="Bible background"
        doorHref="/resources/context"
        title={data?.title ?? (missing ? "That world is not here yet." : "Loading the portrait…")}
        line={data?.line}
        plate={data?.plate ?? "lantern"}
        action={data ? (
          <>
            <a className="btn" href={`#${data.parts[0]?.id ?? "wd-contents"}`}>Start reading <ArrowDown aria-hidden="true" size={18} strokeWidth={1.75} /></a>
            <a className="btn btn--quiet" href="#wd-contents">See the parts</a>
          </>
        ) : undefined}
      >
        {missing && (
          <p className="pg-head__lede">It may have moved. Start from <Link href="/resources/context">the world the Bible was written in</Link>.</p>
        )}
        {data && (
          <p className="wd-meta">
            {data.parts.length} parts · about {minutes} minutes to read · {guides.length > 0 ? `${guides.length} guides to go deeper` : "guides to go deeper"}
          </p>
        )}
      </PageHead>

      {data && (
        <>
          <section className="home-sec home-sec--warm wd-sec" aria-labelledby="wd-contents-title" id="wd-contents">
            <div className="home-wrap">
              <SectionHead icon={ListOrdered} label="Contents" title="Read it in order, or jump to a part." id="wd-contents-title" />
              <div className="wd-start">
                <div className="wd-intro">
                  <p className="wd-intro__h">Before you start</p>
                  {data.intro.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                <ol className="wd-toc">
                  {data.parts.map((p, i) => {
                    const Icon = ICONS[p.icon] ?? Compass;
                    return (
                      <li key={p.id}>
                        <a href={`#${p.id}`}>
                          <span className="wd-toc__icon" aria-hidden="true"><Icon size={22} strokeWidth={1.75} /></span>
                          <span className="wd-toc__words">
                            <span className="wd-toc__n">Part {i + 1}</span>
                            <span className="wd-toc__t">{p.title}</span>
                            <span className="wd-toc__l">{p.line}</span>
                          </span>
                          <ArrowRight className="wd-toc__go" aria-hidden="true" size={18} strokeWidth={1.75} />
                        </a>
                      </li>
                    );
                  })}
                  <li>
                    <a href="#wd-sources">
                      <span className="wd-toc__icon" aria-hidden="true"><Library size={22} strokeWidth={1.75} /></span>
                      <span className="wd-toc__words">
                        <span className="wd-toc__n">At the end</span>
                        <span className="wd-toc__t">Sources and further reading</span>
                        <span className="wd-toc__l">Every ancient writer and modern book this portrait draws on.</span>
                      </span>
                      <ArrowRight className="wd-toc__go" aria-hidden="true" size={18} strokeWidth={1.75} />
                    </a>
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {data.parts.map((p, i) => {
            const Icon = ICONS[p.icon] ?? Compass;
            const next = data.parts[i + 1];
            return (
              <section key={p.id} id={p.id} className={`wd-part${i % 2 ? " wd-part--warm" : ""}`} aria-labelledby={`${p.id}-title`}>
                <div className="wd-col">
                  <p className="wd-part__n"><Icon aria-hidden="true" size={18} strokeWidth={1.75} /> Part {i + 1} of {data.parts.length}</p>
                  <h2 id={`${p.id}-title`} className="wd-part__t">{p.title}</h2>
                  <p className="wd-part__l">{p.line}</p>
                  <div className="wd-body">
                    {p.body.map((para, j) => <p key={j}>{para}</p>)}
                  </div>
                  {p.read.length > 0 && (
                    <aside className="wd-read" aria-labelledby={`${p.id}-read`}>
                      <h3 id={`${p.id}-read`} className="wd-read__h"><BookOpen aria-hidden="true" size={18} strokeWidth={1.75} /> How it changes what you read</h3>
                      <ul>
                        {p.read.map((r) => (
                          <li key={r.ref} className="wd-read__item">
                            <blockquote>
                              <p>{r.text}</p>
                              <p className="wd-read__ref"><Link href={r.href}>{r.ref} <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} /></Link></p>
                            </blockquote>
                            <p className="wd-read__note">{r.note}</p>
                          </li>
                        ))}
                      </ul>
                    </aside>
                  )}
                  <nav className="wd-turn" aria-label={`After part ${i + 1}`}>
                    {next ? (
                      <a href={`#${next.id}`} className="wd-turn__next"><span>Next · Part {i + 2}</span><b>{next.title}</b></a>
                    ) : (
                      <a href="#wd-guides" className="wd-turn__next"><span>Next</span><b>Go deeper: the guides</b></a>
                    )}
                    <a href="#wd-contents" className="wd-turn__up"><ArrowUp aria-hidden="true" size={16} strokeWidth={1.75} /> Contents</a>
                  </nav>
                </div>
              </section>
            );
          })}

          <section className="home-sec home-sec--dark wd-sec" aria-labelledby="wd-guides-title" id="wd-guides">
            <div className="home-wrap">
              <SectionHead dark icon={Compass} label="Go deeper" title="The guides to this world" id="wd-guides-title" link={{ href: "/resources/context", label: "Every world" }} />
              {guides.length > 0 ? (
                <ul className="wd-guides">
                  {guides.map((g) => (
                    <li key={g.slug}>
                      <Link href={`/resources/context/${g.slug}`}>
                        <span className="wd-guides__t">{g.title}</span>
                        <span className="wd-guides__b">{g.blurb}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="wd-guides__none">Each guide answers one question about this world. <Link href="/resources/context">See them all</Link>.</p>
              )}
            </div>
          </section>

          <section className="home-sec wd-sec" aria-labelledby="wd-sources-title" id="wd-sources">
            <div className="wd-col">
              <SectionHead icon={Library} label="Check it yourself" title="Sources and further reading" id="wd-sources-title" />
              <h3 className="wd-src__h">Ancient sources</h3>
              <ul className="wd-src">
                {data.sources.ancient.map((s) => (
                  <li key={s.name}><b>{s.name}</b>{s.note ? `. ${s.note}` : ""}</li>
                ))}
              </ul>
              <h3 className="wd-src__h">Modern books</h3>
              <ul className="wd-src">
                {data.sources.modern.map((b) => (
                  <li key={`${b.author}-${b.title}`}>{b.author}, {b.in ? <>“{b.title}”, {b.in === "an essay" ? "an essay" : <i>{b.in}</i>}</> : <i>{b.title}</i>} ({b.year}).</li>
                ))}
              </ul>
              <p className="wd-src__note">Scripture is quoted from the Berean Standard Bible. Each passage opens in the Study Bible.</p>
            </div>
          </section>

          <div className={`wd-bar${here ? " is-on" : ""}`} aria-hidden={here ? undefined : true}>
            <a href="#wd-contents" tabIndex={here ? undefined : -1}>
              <ListOrdered aria-hidden="true" size={18} strokeWidth={1.75} />
              <span className="wd-bar__n">Part {current + 1} of {data.parts.length}</span>
              <span className="wd-bar__t">{here?.title ?? ""}</span>
              <span className="wd-bar__c">Contents</span>
            </a>
          </div>

          <PageEndNav back={{ href: "/resources/context", label: "The world the Bible was written in" }} />
        </>
      )}
    </Layout>
  );
}
