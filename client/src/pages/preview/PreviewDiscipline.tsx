/**
 * /preview/explore/<discipline>: a PREVIEW of one discipline's own page, the
 * step after "Eight ways in" on /preview/home (the platform plan's roadmap,
 * step 1). Held like the homepage preview: noindex, in no menu, not in the
 * sitemap or search. Everything on it is read from the site catalogue: the
 * discipline's rooms (pages/PreviewHome DISCIPLINES) and what the catalogue
 * lists inside each room. No page is moved and nothing is written but the
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
import { DISCIPLINES } from "./disciplines";
import "../home/home.css";
import "./preview.css";

const ROOMS = new Map<string, Room>(DOORS.flatMap((d) => d.rooms).map((r) => [r.id, r]));
const count = (e: CatalogEntry) => (e.count ? `${e.count.n} ${e.count.of}` : "");
export const disciplineHref = (id: string) => `/preview/explore/${id}`;

export default function PreviewDiscipline() {
  const { discipline } = useParams<{ discipline: string }>();
  const at = DISCIPLINES.findIndex((d) => d.id === discipline);
  const d = DISCIPLINES[at];
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
        <section className="home-sec">
          <div className="home-wrap">
            <h1 className="home-h2">There is no discipline at this address.</h1>
            <p className="pv-lede">
              <Link href="/preview/home#explore">See the eight disciplines</Link>.
            </p>
          </div>
        </section>
      </Layout>
    );

  const rooms = d.doors.map((id) => ROOMS.get(id) ?? (entryById(id) as Room | undefined)).filter((r): r is Room => !!r);
  const prev = DISCIPLINES[(at - 1 + DISCIPLINES.length) % DISCIPLINES.length];
  const next = DISCIPLINES[(at + 1) % DISCIPLINES.length];

  return (
    <Layout>
      {head}
      <section className="pv-dhead">
        <div className="pv-dhead__in">
          <div>
            <p className="pv-dhead__trail">
              <Link href="/preview/home#explore">Explore</Link>
              <span aria-hidden="true"> / </span>
              {d.name}
            </p>
            <h1 className="pv-dhead__title">{d.name}</h1>
            <p className="pv-dhead__line">{d.line}</p>
            <ul className="pv-dhead__jump" aria-label="On this page">
              {rooms.map((r) => (
                <li key={r.id}>
                  <a href={`#${r.id}`} className="home-chip">
                    {r.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <PlateFrame ratio="4 / 3" className="pv-dhead__art">
            <Plate name={d.plate} decorative />
          </PlateFrame>
        </div>
      </section>

      {rooms.map((r, i) => {
        const Icon = ICONS[r.icon];
        const inside = r.inside ?? [];
        return (
          <section key={r.id} id={r.id} className={`home-sec pv-droom${i % 2 ? " home-sec--warm" : ""}`} aria-labelledby={`pv-d-${r.id}`}>
            <div className="home-wrap pv-droom__in">
              <div className="pv-droom__about">
                <span className="pv-tool__icon">
                  <Icon aria-hidden="true" size={22} strokeWidth={ICON_STROKE} />
                </span>
                <h2 id={`pv-d-${r.id}`} className="pv-droom__name">
                  {r.name}
                </h2>
                {r.count && <p className="pv-paths__meta">{count(r)}</p>}
                <p className="pv-droom__line">{r.line}</p>
                <Link href={r.href} className="home-btn">
                  Open {r.name}
                  <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
                </Link>
              </div>
              {inside.length > 0 && (
                <ul className="pv-atlas__rooms pv-droom__list" aria-label={`Inside ${r.name}`}>
                  {inside.map((p) => {
                    const PIcon = ICONS[p.icon];
                    return (
                      <li key={p.id}>
                        <Link href={p.href} className="pv-room">
                          <PIcon aria-hidden="true" size={20} strokeWidth={ICON_STROKE} className="pv-room__icon" />
                          <span className="pv-room__name">{p.name}</span>
                          <span className="pv-room__line">{p.line}</span>
                          {p.count && <span className="pv-room__count">{count(p)}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </section>
        );
      })}

      <nav className="pv-dturn" aria-label="Other disciplines">
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
