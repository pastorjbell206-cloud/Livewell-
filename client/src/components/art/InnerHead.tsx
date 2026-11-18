/**
 * InnerHead: the kit's PageHead at the inner size, with its label read from
 * the map. Pass the page's own address (`path`); the label names the door, and
 * the room for a page one step inside it, exactly as the catalogue does
 * (lib/pagePlace.ts). Everything else is PageHead's: the plain H1, one short
 * line, an optional action, a small plate.
 *
 * `place` overrides the label for a page the catalogue does not list.
 */
import { Link } from "wouter";
import PageHead, { type PageHeadProps } from "./PageHead";
import { placeFor, type PagePlace } from "@/lib/pagePlace";

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

export default function InnerHead({ path, place, className, ...rest }: Omit<PageHeadProps, "door" | "doorHref" | "size"> & { path: string; place?: PagePlace }) {
  const where = place ?? placeFor(path);
  return <PageHead {...rest} size="inner" className={`lw-inner${className ? ` ${className}` : ""}`} door={where ? <PlaceLabel place={where} /> : undefined} />;
}
