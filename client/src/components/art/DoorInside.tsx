/**
 * DoorInside: on a door's own page ("Everything in <door>"), every page that
 * sits one step inside the door's rooms, read from the site catalogue
 * (lib/siteCatalog.ts) and grouped under the room that holds it. The header
 * shows six rooms or fewer; this is where the rest of a door is found, so it
 * is drawn from the same list and can never fall behind it.
 *
 * Each entry is an IconTile under its one name. A room with nothing inside
 * adds nothing; a door with nothing inside any room draws nothing at all.
 */
import IconTile from "./IconTile";
import SectionHead from "./SectionHead";
import { DOORS, type DoorId } from "@/lib/siteCatalog";
import { ICONS } from "@/lib/siteIcons";
import { Link } from "wouter";
import { followHash } from "@/lib/followHash";

/** The rooms of a door, as the catalogue lists them: the page's picture cards read their names and addresses here. */
export function doorRooms(id: DoorId) {
  return DOORS.find((d) => d.id === id)?.rooms ?? [];
}

export default function DoorInside({ door, warm, title = "One step further in." }: { door: DoorId; warm?: boolean; title?: string }) {
  const d = DOORS.find((x) => x.id === door);
  const groups = (d?.rooms ?? []).map((r) => ({ room: r, inside: (r.inside ?? []).filter((i) => !i.external) })).filter((g) => g.inside.length > 0);
  if (!d || !groups.length) return null;
  const id = `door-inside-${door}`;
  return (
    <section className={`home-sec${warm ? " home-sec--warm" : ""} lw-inside`} aria-labelledby={id}>
      <div className="home-wrap">
        <SectionHead label={`Also in ${d.name}`} title={title} id={id} />
        <div className="lw-inside__groups">
        {groups.map(({ room, inside }) => (
          <div key={room.id} className="lw-inside__group">
            <h3 className="eyebrow lw-inside__room">
              <Link href={room.href} onClick={() => followHash(room.href)}>
                {room.name}
              </Link>
            </h3>
            <ul className="lw-tiles">
              {inside.map((e) => (
                <li key={e.id}>
                  <IconTile href={e.href} icon={ICONS[e.icon]} name={e.name} line={e.line} />
                </li>
              ))}
            </ul>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
