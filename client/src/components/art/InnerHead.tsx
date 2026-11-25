/**
 * InnerHead: the kit's PageHead at the inner size, with its label read from
 * the map. Pass the page's own address (`path`); the label names the door, and
 * the room for a page one step inside it, exactly as the catalogue does
 * (lib/pagePlace.ts, trailFor; the label itself is components/art/Place.tsx). Everything else is PageHead's: the plain H1, one short
 * line, an optional action, a small plate.
 *
 * `place` overrides the label for a page the catalogue does not list.
 *
 * The small plate is a picture beside the words, never the thing a reader
 * came for, so it is asked for only after the page's words have painted: its
 * drawings are their own chunk, and fetching them before the first paint made
 * every inner page paint later. The frame holds its size meanwhile (CSS), so
 * nothing moves when the drawing arrives.
 */
import { useEffect, useState } from "react";
import PageHead, { type PageHeadProps } from "./PageHead";
import Plate, { type PlateName } from "./Plate";
import { PlaceLabel } from "./Place";
import { trailFor, type PagePlace } from "@/lib/pagePlace";

export { PlaceLabel };

/** The plate, drawn once the words above it have painted. */
function LaterPlate({ name }: { name: PlateName }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setReady(true));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, []);
  return ready ? <Plate name={name} decorative /> : <span className="lw-plate-slot" aria-hidden="true" />;
}

export default function InnerHead({ path, place, className, plate, art, ...rest }: Omit<PageHeadProps, "door" | "doorHref" | "size"> & { path: string; place?: PagePlace }) {
  const where = place ?? trailFor(path);
  return (
    <PageHead
      {...rest}
      size="inner"
      className={`lw-inner${className ? ` ${className}` : ""}`}
      door={where ? <PlaceLabel place={where} /> : undefined}
      art={art ?? (plate ? <LaterPlate name={plate} /> : undefined)}
    />
  );
}
