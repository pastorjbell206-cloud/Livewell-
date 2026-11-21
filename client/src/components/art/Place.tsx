/**
 * Place: the one line that says where a page sits, read from the map. The
 * door, and the room for a page inside one, each a real link under its
 * catalogue name (lib/pagePlace.ts, trailFor). InnerHead draws it as the
 * label over its title; a page with a top of its own (a care plan, a book, a
 * creed) draws <Place path="…" /> in the same spot, so every inner page
 * answers "where am I" the same way and under the same names.
 *
 * It reads only the committed catalogue, so it is in the first paint and
 * nothing moves when the page's data arrives.
 */
import type { CSSProperties, ReactNode } from "react";
import { Link } from "wouter";
import { trailFor, type PagePlace } from "@/lib/pagePlace";

export function PlaceLabel({ place }: { place: PagePlace }) {
  return (
    <span>
      <Link href={place.door.href}>{place.door.name}</Link>
      {place.room && (
        <>
          {" · "}
          <Link href={place.room.href}>{place.room.name}</Link>
        </>
      )}
    </span>
  );
}

export default function Place({
  path,
  place,
  after,
  dark,
  style,
}: {
  /** The page's own address; the trail is read from it. */
  path: string;
  /** Overrides the trail for a page the map cannot place. */
  place?: PagePlace;
  /** A page's own short label after the trail (a creed's date, "Topic pathway"): words, not a link. */
  after?: ReactNode;
  /** On a charcoal band. */
  dark?: boolean;
  style?: CSSProperties;
}) {
  const where = place ?? trailFor(path);
  if (!where) return null;
  return (
    <nav aria-label="Where this page is" className={`eyebrow lw-place${dark ? " lw-place--dark" : ""}`} style={style}>
      <span>
        <PlaceLabel place={where} />
        {after ? <> · {after}</> : null}
      </span>
    </nav>
  );
}
