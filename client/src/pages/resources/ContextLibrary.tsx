/**
 * Bible background (/resources/context): guides to the world the Bible was
 * written in. Driven by the manifest at client/public/context/guides-index.json,
 * generated from the guide JSON files by scripts/build-context-index.mjs.
 *
 * The page leads with its seven groups as picture cards (each jumps to its
 * group), then a find box, then each group's guides as a short list of titles.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Compass, Landmark, Map as MapIcon, MessageCircleQuestion, Quote, Scroll, Search, UtensilsCrossed, Vote, Columns3, type LucideIcon } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LoadFailed } from "@/components/LoadFailed";
import PageHead from "@/components/art/PageHead";
import SectionHead from "@/components/art/SectionHead";
import Plate, { type PlateName } from "@/components/art/Plate";
import PlateFrame from "@/components/art/PlateFrame";
import { fetchJson } from "@/lib/fetch-json";
import "../home/home.css";
import "./libraries.css";

interface Entry { slug: string; title: string; blurb: string; group: string }
const isIndex = (x: unknown): x is { guides: Entry[] } => !!x && Array.isArray((x as { guides?: unknown }).guides);

/** The groups in the manifest, in the order of the Bible's own story, with a plain name, a plate and an icon. */
const GROUPS: { group: string; id: string; name: string; plate: PlateName; icon: LucideIcon }[] = [
  { group: "Ancient Near East", id: "old-testament-world", name: "The Old Testament's world", plate: "jar", icon: Landmark },
  { group: "Second Temple Judaism", id: "jesus-jewish-world", name: "Jewish life in Jesus's day", plate: "lantern", icon: Scroll },
  { group: "The Greco-Roman World", id: "roman-world", name: "The Roman world", plate: "arch", icon: Columns3 },
  { group: "Honor, Shame, and Culture", id: "honor-and-shame", name: "Honor, shame and culture", plate: "table", icon: UtensilsCrossed },
  { group: "The Verses Everyone Quotes", id: "verses-everyone-quotes", name: "Verses everyone quotes", plate: "quill", icon: Quote },
  { group: "The Hard Questions", id: "hard-questions", name: "The hard questions", plate: "lens", icon: MessageCircleQuestion },
  { group: "Reading Past Our Politics", id: "past-our-politics", name: "Reading past our politics", plate: "compass", icon: Vote },
];
const known = new Set(GROUPS.map((g) => g.group));
const slugOf = (g: string) => g.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function ContextLibrary() {
  const [items, setItems] = useState<Entry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [q, setQ] = useState("");

  useEffect(() => {
    let live = true;
    fetchJson("/context/guides-index.json", isIndex)
      .then((d) => { if (live) { setItems(d.guides); setFailed(false); } })
      .catch(() => { if (live) setFailed(true); });
    return () => { live = false; };
  }, [nonce]);

  // The known groups first, in story order; any group added later still shows, after them.
  const groups = useMemo(() => {
    const present = new Set((items ?? []).map((i) => i.group));
    const extra = Array.from(present).filter((g) => !known.has(g)).sort().map((g) => ({ group: g, id: slugOf(g), name: g, plate: "book" as PlateName, icon: MapIcon }));
    return GROUPS.filter((g) => present.has(g.group)).concat(extra);
  }, [items]);

  const needle = q.trim().toLowerCase();
  const matches = (i: Entry) => !needle || `${i.title} ${i.blurb} ${i.group}`.toLowerCase().includes(needle);
  const shown = groups.map((g) => ({ ...g, entries: (items ?? []).filter((i) => i.group === g.group && matches(i)) })).filter((g) => g.entries.length > 0);

  return (
    <Layout>
      <SEOMeta
        title="Bible Background: The World Behind the Bible"
        description="Free guides to the world the Bible was written in: the Old Testament's neighbors, Jewish life in Jesus's day, the Roman world, and honor and shame."
        url="https://www.livewellbyjamesbell.co/resources/context"
      />
      {items === null && !failed && <span hidden data-lw-loading />}

      <PageHead
        door="Bible"
        doorHref="/study"
        title="The world the Bible was written in"
        line="The Bible was not written in English, in America, or in this century."
        plate="jar"
      />

      <section className="home-sec lib-sec" aria-labelledby="ctx-worlds-title">
        <div className="home-wrap">
          <SectionHead icon={Compass} label={items ? `${groups.length} groups · ${items.length} guides` : "The guides"} title="Choose a world." id="ctx-worlds-title" />
          {failed ? (
            <LoadFailed what="The background guides" onRetry={() => setNonce((n) => n + 1)} backHref="/study" backLabel="Back to Study the Bible" />
          ) : (
            <ul className="lw-rooms lib-worlds">
              {(items ? groups : GROUPS).map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="lw-door">
                    <PlateFrame>
                      <Plate name={g.plate} decorative />
                    </PlateFrame>
                    <span className="lw-door__text">
                      <span className="lw-door__t">{g.name}</span>
                      <span className="lw-door__f">{items ? `${items.filter((i) => i.group === g.group).length} guides` : " "}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {items && (
        <section className="home-sec home-sec--warm lib-sec" aria-label="Every guide">
          <div className="home-wrap">
            <div className="lib-find">
              <Search aria-hidden="true" size={18} strokeWidth={1.75} />
              <label htmlFor="ctx-find" className="sr-only">Find a guide</label>
              <input id="ctx-find" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a guide" autoComplete="off" />
            </div>
            <p className="sr-only" role="status">{needle ? `${shown.reduce((n, g) => n + g.entries.length, 0)} guides match` : ""}</p>
            {shown.length === 0 ? (
              <p className="lib-none">Nothing matches that. Try a book, a word or a place.</p>
            ) : (
              shown.map((g) => {
                const Icon = g.icon;
                return (
                  <div key={g.id} id={g.id} className="lib-group">
                    <h2 className="lib-group__h">
                      <span className="lib-group__icon" aria-hidden="true"><Icon size={22} strokeWidth={1.75} /></span>
                      {g.name}
                    </h2>
                    <ul className="lib-list">
                      {g.entries.map((e) => (
                        <li key={e.slug}>
                          <Link href={`/resources/context/${e.slug}`}>
                            <span>{e.title}</span>
                            <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })
            )}
          </div>
        </section>
      )}
    </Layout>
  );
}
