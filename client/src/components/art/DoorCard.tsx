/**
 * A picture-led door: the plate in its frame, then a small number and the
 * name, then one short line. The whole card is one link. The picture is
 * decorative here, since the link already says where it goes.
 */
import { Link } from "wouter";
import Plate, { type PlateName } from "./Plate";
import PlateFrame from "./PlateFrame";

export default function DoorCard({
  href,
  title,
  note,
  plate,
  number,
  variant,
}: {
  href: string;
  title: string;
  note?: string;
  plate: PlateName;
  number?: string;
  /** "lead": the large first door; "row": a small picture beside the name. */
  variant?: "lead" | "row";
}) {
  return (
    <Link href={href} className={`lw-door${variant ? ` lw-door--${variant}` : ""}`}>
      <PlateFrame>
        <Plate name={plate} decorative />
      </PlateFrame>
      <span className="lw-door__text">
        <span className="lw-door__t">
          {number && <span className="lw-door__n">{number}</span>}
          {title}
        </span>
        {note && <span className="lw-door__f">{note}</span>}
      </span>
    </Link>
  );
}
