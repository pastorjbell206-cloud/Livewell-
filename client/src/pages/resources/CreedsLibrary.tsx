/**
 * Creeds, Confessions, and Classics (/resources/creeds). The full-text,
 * annotated companion to the survey at /theology/creeds. Driven by
 * client/public/creeds/documents-index.json (scripts/build-creeds-index.mjs).
 *
 * The page leads with the documents on one line of years, AD 100 to 2000,
 * each a mark at the year the manifest gives it, coloured by its group.
 * Touch a group (44px chips under the line) and its marks stand out, its
 * span of years is named, and the cards below show that group alone. A card
 * under the pointer or the keyboard lights its own mark. The cards are
 * grouped as the manifest groups them, oldest first.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpenText, Droplets, History, Landmark, Newspaper, ScrollText, type LucideIcon } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LoadFailed } from "@/components/LoadFailed";
import PageHead from "@/components/art/PageHead";
import SectionHead from "@/components/art/SectionHead";
import { fetchJson } from "@/lib/fetch-json";
import "../home/home.css";
import "./libraries.css";

interface Entry { slug: string; title: string; blurb: string; group: string; date: string }
const isIndex = (x: unknown): x is { documents: Entry[] } => !!x && Array.isArray((x as { documents?: unknown }).documents);

const GROUPS: { group: string; icon: LucideIcon; tone: string }[] = [
  { group: "The Ecumenical Creeds", icon: Landmark, tone: "clay" },
  { group: "Reformation Confessions", icon: BookOpenText, tone: "blue" },
  { group: "Baptist and Free Church", icon: Droplets, tone: "olive" },
  { group: "The Early Classics", icon: ScrollText, tone: "paper" },
  { group: "Modern Confessions", icon: Newspaper, tone: "paper" },
];
const groupOf = (g: string) => GROUPS.find((x) => x.group === g) ?? { group: g, icon: ScrollText, tone: "paper" };

/** The first year the manifest's date names ("AD 325 / 381" is 325; "c. AD 200–700" is 200). */
const yearOf = (date: string) => {
  const m = date.match(/\d{2,4}/);
  return m ? Number(m[0]) : NaN;
};

const FROM = 100;
const TO = 2000;
const TICKS = [100, 500, 1000, 1500, 2000];
const at = (year: number) => ((Math.min(TO, Math.max(FROM, year)) - FROM) / (TO - FROM)) * 100;

export default function CreedsLibrary() {
  const [items, setItems] = useState<Entry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [cur, setCur] = useState<string | null>(null);
  const [only, setOnly] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    fetchJson("/creeds/documents-index.json", isIndex)
      .then((d) => { if (live) { setItems(d.documents); setFailed(false); } })
      .catch(() => { if (live) setFailed(true); });
    return () => { live = false; };
  }, [nonce]);

  const dated = useMemo(() => (items ?? []).filter((i) => Number.isFinite(yearOf(i.date))).sort((a, b) => yearOf(a.date) - yearOf(b.date)), [items]);
  const grouped = useMemo(() => {
    const present = Array.from(new Set((items ?? []).map((i) => i.group)));
    const order = GROUPS.map((g) => g.group).filter((g) => present.includes(g)).concat(present.filter((g) => !GROUPS.some((x) => x.group === g)).sort());
    const byYear = (a: Entry, b: Entry) => (yearOf(a.date) || 9999) - (yearOf(b.date) || 9999);
    return order.map((g) => [g, (items ?? []).filter((i) => i.group === g).sort(byYear)] as const);
  }, [items]);
  const picked = dated.find((d) => d.slug === cur) ?? null;
  const years = dated.filter((d) => d.group === only).map((d) => yearOf(d.date));
  const span = only && years.length ? (years.length === 1 || years[0] === years[years.length - 1] ? `AD ${years[0]}` : `AD ${years[0]} to ${years[years.length - 1]}`) : null;

  return (
    <Layout>
      <SEOMeta
        title="The Creeds and Confessions, With Plain Notes"
        description="The Apostles' and Nicene Creeds, Chalcedon, the Reformation confessions, and the early classics: full public-domain texts with plain-language notes."
        url="https://www.livewellbyjamesbell.co/resources/creeds"
      />
      {items === null && !failed && <span hidden data-lw-loading />}

      <PageHead
        door="History"
        doorHref="/theology/history"
        title="The creeds and confessions of the church"
        line="The full texts, with plain notes on the words that mattered most."
        plate="basilica"
      />

      <section className="home-sec home-sec--dark lib-sec" aria-labelledby="cr-line-title">
        <div className="home-wrap">
          <SectionHead dark icon={History} label="Nineteen centuries" title="When each was written." id="cr-line-title" />
          {failed ? (
            <LoadFailed what="The creeds" onRetry={() => setNonce((n) => n + 1)} backHref="/theology/history" backLabel="Back to church history" />
          ) : (
            <div className="cr-line">
              <div className="cr-axis">
                {TICKS.map((t) => (
                  <span key={t} className="cr-tick" style={{ left: `${at(t)}%` }} aria-hidden="true">
                    <i />
                    <b>AD {t}</b>
                  </span>
                ))}
                {dated.map((d, i) => {
                  const g = groupOf(d.group);
                  const dim = only !== null && d.group !== only;
                  return (
                    <span
                      key={d.slug}
                      aria-hidden="true"
                      className={`cr-mark cr-tone--${g.tone}${dim ? " is-dim" : ""}${cur === d.slug ? " is-picked" : ""}`}
                      style={{ left: `${at(yearOf(d.date))}%`, ["--lift" as string]: `${(i % 4) * 20}px` }}
                    />
                  );
                })}
              </div>
              <div className="cr-groups" role="group" aria-label="Show one group">
                {grouped.map(([g, entries]) => {
                  const { tone } = groupOf(g);
                  return (
                    <button key={g} type="button" className="home-chip" aria-pressed={only === g} onClick={() => setOnly(only === g ? null : g)}>
                      <i className={`cr-dot cr-tone--${tone}`} aria-hidden="true" />
                      {g} <span className="cr-n">{entries.length}</span>
                    </button>
                  );
                })}
              </div>
              <p className="cr-picked" aria-live="polite">
                {picked ? (
                  <>
                    <b>{picked.date}</b>
                    <span>{picked.title}</span>
                  </>
                ) : span ? (
                  <>
                    <b>{span}</b>
                    <span>{only}</span>
                  </>
                ) : (
                  <span>Touch a group to see where it falls.</span>
                )}
              </p>
            </div>
          )}
        </div>
      </section>

      {items && (
        <section className="home-sec lib-sec" aria-label="Every creed and confession">
          <div className="home-wrap">
            {grouped.filter(([g]) => only === null || g === only).map(([g, entries]) => {
              const { icon: Icon, tone } = groupOf(g);
              return (
                <div key={g} className="lib-group">
                  <h2 className="lib-group__h">
                    <span className={`lib-group__icon cr-tone--${tone}`} aria-hidden="true"><Icon size={22} strokeWidth={1.75} /></span>
                    {g}
                  </h2>
                  <ul className="cr-cards">
                    {entries.map((e) => (
                      <li key={e.slug}>
                        <Link href={`/resources/creeds/${e.slug}`} className={`cr-card${cur === e.slug ? " is-picked" : ""}`} onFocus={() => setCur(e.slug)} onBlur={() => setCur(null)} onMouseEnter={() => setCur(e.slug)} onMouseLeave={() => setCur(null)}>
                          <span className="cr-card__date">{e.date}</span>
                          <span className="cr-card__t">{e.title}</span>
                          <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            <p className="lw-newline">
              <ScrollText aria-hidden="true" size={22} strokeWidth={1.75} />
              <span>
                How they fit together: <Link href="/theology/creeds">the confessions, surveyed</Link>.
              </span>
            </p>
          </div>
        </section>
      )}
    </Layout>
  );
}
