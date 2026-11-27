/**
 * The Essays panel in the menu: the essay shelf's public sections as
 * pictures, each opening /writing at that section. Its own chunk, loaded when
 * the panel opens, so the header itself never carries the shelf.
 */
import { Link } from "wouter";
import Plate from "../art/Plate";
import { liveSections, sectionHref } from "@/lib/shelf";
import { SECTION_PICTURE } from "./navPictures";

export default function EssaysWays({ onNavigate, variant = "bar" }: { onNavigate: () => void; variant?: "bar" | "sheet" }) {
  const sections = liveSections();
  if (variant === "sheet")
    return (
      <>
        {sections.map((s) => (
          <li key={s.slug}>
            <Link href={sectionHref(s)} className="sn-sheet-room" onClick={onNavigate}>
              <span className="sn-sheet-room__art" aria-hidden="true">
                <Plate name={SECTION_PICTURE[s.slug] ?? "quill"} decorative />
              </span>
              {s.name}
            </Link>
          </li>
        ))}
      </>
    );
  return (
    <>
      {sections.map((s) => (
        <li key={s.slug}>
          <Link href={sectionHref(s)} className="sn-way" onClick={onNavigate}>
            <span className="sn-way__art" aria-hidden="true">
              <Plate name={SECTION_PICTURE[s.slug] ?? "quill"} decorative />
            </span>
            <span>
              <span className="sn-room__name">{s.name}</span>
              <span className="sn-room__line">{s.description}</span>
            </span>
          </Link>
        </li>
      ))}
    </>
  );
}
