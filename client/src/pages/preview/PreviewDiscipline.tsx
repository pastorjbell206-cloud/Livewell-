/**
 * /preview/explore/<discipline>: a PREVIEW of one discipline's own page, the
 * step after "Eight ways in" on /preview/home (the platform plan's roadmap,
 * step 1). Held like the homepage preview: noindex, in no menu, not in the
 * sitemap or search.
 *
 * One page, four parts, in the order a reader needs them: the eight
 * disciplines as a bar, so any other is one step away; the discipline's rooms
 * as cards; every page the catalogue files inside those rooms, gathered in
 * one place; and six essays to read. Everything is read from the site
 * catalogue (lib/siteCatalog.ts), the Questions library's live areas
 * (useLiveAreas) and the essay shelf; nothing is written here but the
 * discipline's one line.
 */
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import Plate from "@/components/art/Plate";
import PlateFrame from "@/components/art/PlateFrame";
import { DOORS, entryById, type CatalogEntry, type Room } from "@/lib/siteCatalog";
import { ICONS, ICON_STROKE } from "@/lib/siteIcons";
import { useLiveAreas } from "@/lib/siteNav";
import { isPublicEssay, overrideMeta, shelfEntry } from "@/lib/shelf";
import { DISCIPLINES, DISCIPLINE_ESSAYS } from "./disciplines";
import "../home/home.css";
import "./preview.css";

const ROOMS = new Map<string, Room>(DOORS.flatMap((d) => d.rooms).map((r) => [r.id, r]));
const count = (e: CatalogEntry) => (e.count ? `${e.count.n} ${e.count.of}` : "");
export const disciplineHref = (id: string) => `/preview/explore/${id}`;

/** The eight disciplines, the one open marked: every other is one step away. */
function Switcher({ at }: { at: string }) {
  return (
    <nav aria-label="The eight disciplines" className="pv-dswitch">
      <ul className="pv-dswitch__list">
        {DISCIPLINES.map((x) => (
          <li key={x.id}>
            <Link href={disciplineHref(x.id)} aria-current={x.id === at ? "page" : undefined} className="pv-dswitch__link">
              {x.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function PreviewDiscipline() {
  const { discipline } = useParams<{ discipline: string }>();
  const at = DISCIPLINES.findIndex((d) => d.id === discipline);
  const d = DISCIPLINES[at];
  // The Questions library publishes its areas one by one; its rooms carry them once its manifest loads.
  const areas = useLiveAreas(!!d);
  const head = (
    <>
      <SEOMeta
        title="Preview: A Discipline Page on LiveWell"
        description="A preview of one discipline's page on LiveWell, for review. It is not a live page."
        noindex
      />
      <p role="note" className="pv-note">
        This is a preview for review. The live site is unchanged. <Link href="/preview/home">Back to the homepage preview</Link>.
      </p>
    </>
  );

  if (!d)
    return (
      <Layout>
        {head}
        <Switcher at="" />
        <section className="home-sec">
          <div className="home-wrap">
            <h1 className="home-h2">There is no discipline at this address.</h1>
            <p className="pv-lede">Choose one of the eight above.</p>
          </div>
        </section>
      </Layout>
    );

  const rooms = d.doors
    .map((id) => ROOMS.get(id) ?? (entryById(id) as Room | undefined))
    .filter((r): r is Room => !!r)
    .map((r) => (areas ? areas(r) : r));
  // A page that is already one of this discipline's rooms is shown once, as a room.
  const roomHrefs = new Set(rooms.map((r) => r.href));
  const groups = rooms
    .map((r) => ({ room: r, inside: (r.inside ?? []).filter((i) => !i.external && !roomHrefs.has(i.href)) }))
    .filter((g) => g.inside.length > 0);
  const insideCount = groups.reduce((n, g) => n + g.inside.length, 0);
  const essays = (DISCIPLINE_ESSAYS[d.id] ?? [])
    .filter((slug) => isPublicEssay(slug))
    .map((slug) => ({ slug, title: overrideMeta(slug)?.title ?? shelfEntry(slug)?.title ?? slug, excerpt: overrideMeta(slug)?.excerpt || shelfEntry(slug)?.blurb || "" }));
  const prev = DISCIPLINES[(at - 1 + DISCIPLINES.length) % DISCIPLINES.length];
  const next = DISCIPLINES[(at + 1) % DISCIPLINES.length];
  const parts: [string, string][] = [
    ["rooms", `${rooms.length} rooms`],
    ...(insideCount ? ([["inside", `${insideCount} more pages`]] as [string, string][]) : []),
    ...(essays.length ? ([["essays", `${essays.length} essays`]] as [string, string][]) : []),
  ];

  return (
    <Layout>
      {head}
      <Switcher at={d.id} />

      <section className="pv-dhead" aria-labelledby="pv-d-title">
        <div className="pv-dhead__in">
          <div>
            <p className="pv-dhead__trail">
              <Link href="/preview/home#explore">Eight ways in</Link>
              <span aria-hidden="true"> / </span>
              {d.name}
            </p>
            <h1 id="pv-d-title" className="pv-dhead__title">
              {d.name}
            </h1>
            <p className="pv-dhead__line">{d.line}</p>
            <div className="home-row">
              <Link href={rooms[0].href} className="home-btn">
                Start with {rooms[0].name}
                <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
              </Link>
            </div>
            <ul className="pv-dhead__parts" aria-label="On this page">
              {parts.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <PlateFrame ratio="4 / 3" className="pv-dhead__art">
            <Plate name={d.plate} decorative />
          </PlateFrame>
        </div>
      </section>

      <section id="rooms" className="home-sec pv-dsec" aria-labelledby="pv-d-rooms">
        <div className="home-wrap">
          <h2 id="pv-d-rooms" className="pv-dsec__title">
            The rooms
          </h2>
          <ul className="pv-dcards">
            {rooms.map((r) => {
              const Icon = ICONS[r.icon];
              return (
                <li key={r.id}>
                  <Link href={r.href} className="pv-dcard">
                    <span className="pv-tool__icon" aria-hidden="true">
                      <Icon size={22} strokeWidth={ICON_STROKE} />
                    </span>
                    <span className="pv-dcard__name">{r.name}</span>
                    {r.count && <span className="pv-dcard__count">{count(r)}</span>}
                    <span className="pv-dcard__line">{r.line}</span>
                    <span className="pv-dcard__go">
                      Open <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {groups.length > 0 && (
        <section id="inside" className="home-sec home-sec--warm pv-dsec" aria-labelledby="pv-d-inside">
          <div className="home-wrap">
            <h2 id="pv-d-inside" className="pv-dsec__title">
              Everything inside
            </h2>
            <div className="pv-dgroups">
              {groups.map(({ room, inside }) => (
                <div key={room.id} className={`pv-dgroup${groups.length === 1 && inside.length > 5 ? " pv-dgroup--wide" : ""}`}>
                  <h3 className="pv-dgroup__room">
                    <Link href={room.href}>{room.name}</Link>
                  </h3>
                  <ul className="pv-dgroup__list">
                    {inside.map((p) => (
                      <li key={p.id}>
                        <Link href={p.href} className="pv-dgroup__link">
                          <span className="pv-dgroup__name">{p.name}</span>
                          {p.count && <span className="pv-dgroup__count">{count(p)}</span>}
                          <span className="pv-dgroup__line">{p.line}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {essays.length > 0 && (
        <section id="essays" className={`home-sec pv-dsec${groups.length ? "" : " home-sec--warm"}`} aria-labelledby="pv-d-essays">
          <div className="home-wrap">
            <div className="pv-bench__head">
              <h2 id="pv-d-essays" className="pv-dsec__title">
                Essays to read
              </h2>
              <Link href="/writing" className="home-tlink">
                All the essays <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
              </Link>
            </div>
            <ul className="pv-dessays">
              {essays.map((e) => (
                <li key={e.slug}>
                  <Link href={`/writing/${e.slug}`} className="pv-dessay">
                    <span className="pv-dessay__title">{e.title}</span>
                    {e.excerpt && <span className="pv-dessay__line">{e.excerpt}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <nav className="pv-dturn" aria-label="Before and after this discipline">
        <Link href={disciplineHref(prev.id)} className="pv-dturn__link">
          <ArrowLeft aria-hidden="true" size={18} strokeWidth={1.75} />
          <span>
            <small>Before</small>
            {prev.name}
          </span>
        </Link>
        <Link href={disciplineHref(next.id)} className="pv-dturn__link pv-dturn__link--next">
          <span>
            <small>Next</small>
            {next.name}
          </span>
          <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
        </Link>
      </nav>
    </Layout>
  );
}
