/**
 * The eight disciplines as picture cards, each opening its page at
 * /explore/<discipline>. On the homepage and on "Everything on LiveWell".
 * Names, lines and plates are the disciplines' own (pages/preview/disciplines.ts).
 */
import { Link } from "wouter";
import Plate from "@/components/art/Plate";
import { DISCIPLINES } from "../preview/disciplines";
import "../preview/preview.css";

export default function DisciplineCards({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <ul className="pv-pcards pv-pcards--4 pv-ways">
      {DISCIPLINES.map((d) => (
        <li key={d.id}>
          <Link href={`/explore/${d.id}`} className="pv-pcard">
            <span className="pv-pcard__art">
              <Plate name={d.plate} decorative />
            </span>
            <span className="pv-pcard__body">
              <H className="pv-pcard__name">{d.name}</H>
              <span className="pv-pcard__line">{d.line}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
