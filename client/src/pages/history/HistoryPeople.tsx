/**
 * /theology/history/people: the people of church history in one place, A
 * to Z or by the age they lived in. Each is a card with the roundel of their
 * age (never a portrait or likeness: the site holds no true one), their
 * years, the one line the library gives (role and place), and their entry,
 * opened in place: who they were and why they matter, from
 * /theology/church-history-figures.json, word for word.
 *
 * Every card keeps the address the hub gave it (#person-augustine-of-hippo,
 * lib/historyCourse entryId), so a name linked from a lesson lands on its
 * card here, opened. The hub sends its old #people and #person-… links here.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import Roundel from "@/components/art/Roundel";
import { LoadFailed } from "@/components/LoadFailed";
import { fetchJson } from "@/lib/fetch-json";
import { AGE_SHORT, ageOfPerson, lifeSpan } from "@/lib/historyAges";
import { HISTORY_HUB, entryId, type Era, type Figure } from "@/lib/historyCourse";
import "../home/home.css";

type View = "az" | "age";

/** The name a person is filed under, A to Z: "The Anabaptists" under A. */
const sortName = (n: string) => n.replace(/^The\s+/i, "");

export default function HistoryPeople() {
  const [figures, setFigures] = useState<Figure[]>([]);
  const [eras, setEras] = useState<Era[]>([]);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [view, setView] = useState<View>("az");
  const [open, setOpen] = useState<string | null>(() => (typeof window === "undefined" ? null : decodeURIComponent(window.location.hash.slice(1)) || null));
  const thisYear = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    let live = true;
    Promise.all([fetchJson<{ figures?: Figure[] }>("/theology/church-history-figures.json"), fetchJson<{ eras?: Era[] }>("/theology/church-history-timeline.json")])
      .then(([f, t]) => {
        if (!live) return;
        if (!Array.isArray(f?.figures) || !Array.isArray(t?.eras)) return setFailed(true);
        setFigures(f.figures);
        setEras(t.eras);
      })
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [nonce]);

  useEffect(() => {
    const onHash = () => setOpen(decodeURIComponent(window.location.hash.slice(1)) || null);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // A link to one person lands on their card, opened.
  const landed = useRef(false);
  useEffect(() => {
    if (landed.current || !open || !figures.length) return;
    const el = document.getElementById(open);
    if (!el) return;
    landed.current = true;
    requestAnimationFrame(() => {
      el.scrollIntoView({ block: "start", behavior: "instant" });
      el.focus({ preventScroll: true });
    });
  }, [open, figures.length]);

  const people = useMemo(
    () =>
      figures.map((f) => ({ f, id: entryId("person", f.name), age: ageOfPerson(eras, f, thisYear), life: lifeSpan(f, thisYear) })),
    [figures, eras, thisYear],
  );
  const az = useMemo(() => [...people].sort((a, b) => sortName(a.f.name).localeCompare(sortName(b.f.name))), [people]);
  const letters = useMemo(() => Array.from(new Set(az.map((p) => sortName(p.f.name)[0].toUpperCase()))), [az]);
  const byAge = useMemo(
    () =>
      eras
        .map((e) => ({ era: e, items: people.filter((p) => p.age?.id === e.id).sort((a, b) => (a.life?.start ?? 0) - (b.life?.start ?? 0)) }))
        .filter((g) => g.items.length > 0),
    [eras, people],
  );

  const toggle = (id: string) => {
    const next = open === id ? null : id;
    setOpen(next);
    window.history.replaceState(null, "", next ? `#${next}` : window.location.pathname);
  };

  const card = ({ f, id, age }: (typeof people)[number], letterId?: string, Name: "h3" | "h4" = "h3") => (
    <li key={id} id={id} tabIndex={-1} className={`hp-card${open === id ? " is-open" : ""}`}>
      {letterId && <span id={letterId} className="hp-anchor" aria-hidden="true" />}
      <span className="hp-card__mark" aria-hidden="true">
        {age && <Roundel era={age.id} />}
      </span>
      <div className="hp-card__words">
        <Name className="hp-card__name">{f.name}</Name>
        <p className="hp-card__years">
          {f.dates}
          {age ? <span> · {AGE_SHORT[age.id] ?? age.name}</span> : null}
        </p>
        <p className="hp-card__line">
          {f.role}
          {f.place ? `, ${f.place}` : ""}
        </p>
        <button type="button" className="hp-card__open" aria-expanded={open === id} aria-controls={`${id}-entry`} onClick={() => toggle(id)}>
          {open === id ? "Close" : "Read the entry"}
          <ChevronDown aria-hidden="true" size={16} strokeWidth={1.75} />
        </button>
        {open === id && (
          <div id={`${id}-entry`} className="hp-card__entry">
            <p>{f.summary}</p>
            <p>
              <strong>Why they matter.</strong> {f.whyTheyMatter}
            </p>
          </div>
        )}
      </div>
    </li>
  );

  const firstOf = new Map<string, string>();
  for (const p of az) {
    const l = sortName(p.f.name)[0].toUpperCase();
    if (!firstOf.has(l)) firstOf.set(l, p.id);
  }

  return (
    <Layout>
      <SEOMeta
        title="People of Church History, A to Z"
        description="The people who carried the faith from the apostles to today, A to Z and by the age they lived in: their years, their place, and why they matter."
        url="https://www.livewellbyjamesbell.co/theology/history/people"
      />
      {!failed && figures.length === 0 && <span hidden data-lw-loading />}

      <PageHead
        door="History"
        doorHref={HISTORY_HUB}
        title="People of church history"
        line={figures.length ? `${figures.length} lives, A to Z or by age.` : "A to Z, or by age."}
        plate="quill"
        width="var(--w-default)"
      />

      <section className="home-sec hp-sec" aria-labelledby="hp-list-title">
        <div className="home-wrap">
          <h2 id="hp-list-title" className="sr-only">
            The people
          </h2>
          {failed ? (
            <LoadFailed what="The people of church history" onRetry={() => { setFailed(false); setNonce((n) => n + 1); }} backHref={HISTORY_HUB} backLabel="Back to church history" />
          ) : (
            <>
              <div className="hp-bar">
                <div className="hp-views" role="group" aria-label="Order">
                  <button type="button" className="home-chip" aria-pressed={view === "az"} onClick={() => setView("az")}>
                    A to Z
                  </button>
                  <button type="button" className="home-chip" aria-pressed={view === "age"} onClick={() => setView("age")}>
                    By age
                  </button>
                </div>
                {view === "az" && letters.length > 0 && (
                  <nav className="hp-letters" aria-label="Jump to a letter">
                    {letters.map((l) => (
                      <a key={l} href={`#letter-${l}`}>
                        {l}
                      </a>
                    ))}
                  </nav>
                )}
              </div>

              {view === "az" ? (
                <ul className="hp-grid" aria-label="People, A to Z">
                  {az.map((p) => card(p, firstOf.get(sortName(p.f.name)[0].toUpperCase()) === p.id ? `letter-${sortName(p.f.name)[0].toUpperCase()}` : undefined))}
                </ul>
              ) : (
                byAge.map(({ era, items }) => (
                  <div key={era.id} className="hp-age">
                    <h3 className="hp-age__head">
                      <span aria-hidden="true">
                        <Roundel era={era.id} />
                      </span>
                      {era.name}
                      <small>{era.range}</small>
                    </h3>
                    <ul className="hp-grid">{items.map((p) => card(p, undefined, "h4"))}</ul>
                  </div>
                ))
              )}
              <p className="lw-newline">
                <span>
                  See them on the timeline: <Link href={`${HISTORY_HUB}#timeline`}>two thousand years on one line</Link>.
                </span>
              </p>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
