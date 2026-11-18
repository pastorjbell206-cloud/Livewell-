/**
 * "Go deeper": the pages on this site that treat a Bible chapter, grouped by
 * kind with an icon each, at most three to a kind until the reader asks for
 * the rest. Read from the passage index (lib/passageIndex.ts). It is its own
 * chunk with its own CSS, loaded when the block nears the screen
 * (GoDeeperSlot in pages/study-bible/ChapterNotes.tsx), and it draws nothing
 * at all when the chapter has nothing.
 *
 * `GoDeeperList` is the list alone, used again as the next steps of the
 * guided study (pages/study-bible/ChapterWalk.tsx).
 */
import { useEffect, useId, useState } from "react";
import { Link } from "wouter";
import { BookMarked, Baby, ChevronDown, Feather, FileText, Landmark, LifeBuoy, Lightbulb, Map as MapIcon, MessageCircleQuestion, Milestone, Moon, Users, type LucideIcon } from "lucide-react";

import { fetchChapterIndex, groupRows, type PassageKind, type PassageRow } from "@/lib/passageIndex";
import "./go-deeper.css";

/** The same icon each library has in the site's menus (lib/siteCatalog.ts). */
const ICONS: Record<PassageKind, LucideIcon> = {
  question: MessageCircleQuestion,
  doctrine: Lightbulb,
  history: Landmark,
  background: MapIcon,
  guide: Users,
  devotion: Moon,
  catechism: Baby,
  care: LifeBuoy,
  plan: Milestone,
  wisdom: BookMarked,
  essay: Feather,
  tool: FileText,
};

/** How many of a kind show before "See all". */
export const PER_KIND = 3;

/** The rows for a chapter: undefined while loading, [] for none or on any failure. */
export function useChapterIndex(slug: string, chapter: number): PassageRow[] | undefined {
  const key = `${slug}/${chapter}`;
  const [got, setGot] = useState<{ key: string; rows: PassageRow[] } | null>(null);
  useEffect(() => {
    let stale = false;
    fetchChapterIndex(slug, chapter)
      .then((rows) => { if (!stale) setGot({ key: `${slug}/${chapter}`, rows }); })
      // The block is a quiet extra: a failed fetch shows nothing rather than an error.
      .catch(() => { if (!stale) setGot({ key: `${slug}/${chapter}`, rows: [] }); });
    return () => { stale = true; };
  }, [slug, chapter]);
  return got?.key === key ? got.rows : undefined;
}

function KindGroup({ k, name, rows, chapterLabel }: { k: PassageKind; name: string; rows: PassageRow[]; chapterLabel: string }) {
  const [all, setAll] = useState(false);
  const listId = useId();
  const Icon = ICONS[k];
  const shown = all ? rows : rows.slice(0, PER_KIND);
  return (
    <section className="gd__group" aria-label={name}>
      <h3 className="eyebrow gd__kind">
        <span className="gd__icon" aria-hidden><Icon size={18} strokeWidth={1.75} /></span>
        <span>{name}</span>
      </h3>
      <ul className="gd__rows" id={listId}>
        {shown.map((r) => (
          <li key={`${r.h}|${r.t}`}>
            <Link href={r.h} className="gd__row">
              <span className="gd__t">{r.t}</span>
              {r.p !== chapterLabel && <span className="gd__p">{r.p}</span>}
            </Link>
          </li>
        ))}
      </ul>
      {rows.length > PER_KIND && (
        <button type="button" className="gd__all" aria-expanded={all} aria-controls={listId} onClick={() => setAll((a) => !a)}>
          {all ? "Show fewer" : `See all ${rows.length}`}
          <ChevronDown size={16} strokeWidth={1.75} aria-hidden style={{ transform: all ? "rotate(180deg)" : undefined }} />
        </button>
      )}
    </section>
  );
}

/** The groups alone, for a chapter's rows. Nothing when there are no rows. */
export function GoDeeperList({ rows, chapterLabel }: { rows: PassageRow[]; chapterLabel: string }) {
  const groups = groupRows(rows);
  if (!groups.length) return null;
  return (
    <div className="gd__groups">
      {groups.map((g) => <KindGroup key={g.k} {...g} chapterLabel={chapterLabel} />)}
    </div>
  );
}

/** The block under a chapter's questions. */
export default function GoDeeper({ slug, chapter, label }: { slug: string; chapter: number; label: string }) {
  const rows = useChapterIndex(slug, chapter);
  const headId = useId();
  if (rows === undefined) return <div className="gd gd--wait" aria-hidden />;
  if (!rows.length) return null;
  return (
    <section className="gd" aria-labelledby={headId}>
      <h2 className="gd__title" id={headId}>Go deeper</h2>
      <p className="gd__line">Pages on LiveWell that study {label} or a passage in it.</p>
      <GoDeeperList rows={rows} chapterLabel={label} />
    </section>
  );
}
